/** * @file LumenAllocator.vue * @description IV Lumen Allocation Optimizer - Greedy Algorithm for
CVC/PICC lumen optimization * @author Vasile Chifeac * @created 2025-11-21 * @modified 2025-11-21 *
@example * // Usage in DrugCompatibilityPage.vue * import LumenAllocator from
'src/components/Compatibility/LumenAllocator.vue'; * * @notes * - Pattern § 🏗️ ARCHITETTURA
COMPONENTI * - Greedy algorithm for fast (non-optimal) lumen allocation * - Visual allocation chart
with color-coded lumens * - Real-time insufficient lumens alerts * - Optimization recommendations
engine * - User-configurable available lumens (1-6 input) * @dependencies * -
MedicalDocumentationSection.vue * - DrugTypes (MultiDrugAnalysis type) * @algorithm * - Greedy graph
clustering O(N²) complexity * - Compatibility matrix query from analysisResults * - Allocates drugs
to minimum lumens needed * - Generates recommendations if insufficient lumens */

<script setup lang="ts">
/**
 *  <LumenAllocator
 *   :selected-drugs="selectedDrugsPayload"
 *   :analysis-results="analysisResults"
 *   :available-lumens="3"
 *   @allocation-completed="handleAllocationCompleted"
 *   @insufficient-lumens="handleInsufficientLumens"
 * />
 */
// ============================================================
// IMPORTS
// ============================================================
import { ref, computed, watch } from 'vue';
import type { MultiDrugAnalysis } from 'src/types/DrugTypes';
import { DrugCompatibility } from 'src/types/DrugTypes';

// Composables
import { useSecureLogger } from 'src/composables/useSecureLogger';
import { useDrugCompatibilityStore } from 'src/stores/drug-compatibility-store';

// ============================================================
// COMPOSABLES
// ============================================================
const { logger } = useSecureLogger();
const compatibilityStore = useDrugCompatibilityStore();

// ============================================================
// PROPS & EMITS
// ============================================================

/**
 * Lumen allocation data structure
 * Represents one CVC/PICC lumen with allocated drugs
 */
interface LumenAllocation {
  /** Lumen identifier (1-based index) */
  lumenId: number;
  /** Drugs allocated to this lumen */
  drugs: string[];
  /** All drugs in this lumen are mutually compatible */
  isCompatible: boolean;
}

/**
 * Component props definition
 * NOTE: selectedDrugs rimosso - usa compatibilityStore.sortedDrugs
 */
interface Props {
  /** Compatibility analysis results (from CompatibilityResults) */
  analysisResults: MultiDrugAnalysis | null;
  /** Number of available lumens (default: 3 for standard CVC) */
  availableLumens?: number;
}

const props = withDefaults(defineProps<Props>(), {
  availableLumens: 3,
});

/**
 * Component events definition
 */
interface Emits {
  /** Emitted when allocation is successfully completed */
  (event: 'allocation-completed', allocation: LumenAllocation[]): void;
  /** Emitted when available lumens are insufficient */
  (event: 'insufficient-lumens', deficit: number): void;
}

const emit = defineEmits<Emits>();

// ============================================================
// STATE
// ============================================================

/**
 * User-configurable number of available lumens
 * Editable via q-input (1-6 range)
 * Default: 3 (standard CVC triple lumen)
 */
const lumensCount = ref<number>(props.availableLumens);

// ============================================================
// COMPUTED
// ============================================================

/**
 * Optimal lumen allocation using backtracking algorithm v5
 * Recalculates when store.sortedDrugs or analysisResults change
 * @returns Array of lumen allocations (1 per lumen needed)
 */
const lumenAllocation = computed((): LumenAllocation[] => {
  // Guard: No drugs selected
  if (compatibilityStore.sortedDrugs.length === 0) {
    return [];
  }

  // Guard: No analysis results available
  if (!props.analysisResults) {
    return [];
  }

  // Run backtracking allocation algorithm v5
  return optimizeLumenAllocation();
});

/**
 * Check if available lumens are sufficient
 * @returns true if lumenAllocation.length <= lumensCount
 */
const isSufficient = computed((): boolean => {
  return lumenAllocation.value.length <= lumensCount.value;
});

/**
 * Calculate lumen deficit (how many lumens are missing)
 * @returns Number of additional lumens needed (0 if sufficient)
 */
const deficit = computed((): number => {
  return Math.max(0, lumenAllocation.value.length - lumensCount.value);
});

/**
 * Check if there are incompatible drugs forced into same lumen
 * @returns true if any lumen has isCompatible = false
 */
const hasIncompatibleAllocations = computed((): boolean => {
  return lumenAllocation.value.some((lumen) => lumen.isCompatible === false);
});

/**
 * Get list of lumens with incompatibility issues
 * @returns Array of lumen IDs with forced incompatible allocations
 */
const incompatibleLumens = computed((): number[] => {
  return lumenAllocation.value
    .filter((lumen) => lumen.isCompatible === false)
    .map((lumen) => lumen.lumenId);
});

/**
 * Generate optimization recommendations
 * Based on deficit and drug incompatibilities
 * @returns Array of clinical recommendations
 */
const recommendations = computed((): string[] => {
  const recs: string[] = [];

  // No recommendations if sufficient lumens
  if (isSufficient.value) {
    recs.push('✅ Lumi sufficienti per tutti i farmaci selezionati');
    return recs;
  }

  // Recommendations for insufficient lumens
  recs.push(`⚠️ Necessari ${lumenAllocation.value.length} lumi, disponibili ${lumensCount.value}`);
  recs.push(`💉 Aggiungi CVC multi-lumen (4-5 lumi) o PICC line aggiuntiva`);

  // Find incompatible drugs to suggest removal
  if (props.analysisResults) {
    const incompatibleDrugs = props.analysisResults.warnings
      .filter((w) => w.type === 'critical')
      .flatMap((w) => w.drugs || [])
      .filter((drug, index, arr) => arr.indexOf(drug) === index); // Unique

    if (incompatibleDrugs.length > 0) {
      recs.push(`🔴 Considera rimozione farmaci incompatibili: ${incompatibleDrugs.join(', ')}`);
    }
  }

  recs.push('⏰ Valuta somministrazione sequenziale con flush tra farmaci');

  return recs;
});

// ============================================================
// FUNCTIONS - BACKTRACKING ALGORITHM
// ============================================================

/**
 * 🎯 ALGORITMO BACKTRACKING ITERATIVO v9 - COMPATIBILITÀ PROGRESSIVA
 *
 * STRATEGIA: Prova allocazione con N lumi disponibili, aumenta N solo se necessario
 *
 * ALGORITMO:
 * 1. START con N = lumi disponibili dall'utente
 * 2. TENTATIVO A: Alloca con compatibilità SOLO C (continuous)
 *    - Se SUCCESSO → FINE ✅
 *    - Se FALLITO → vai a 3
 * 3. TENTATIVO B: Alloca con compatibilità C + Y (rubinetto)
 *    - Se SUCCESSO → FINE ✅
 *    - Se FALLITO → vai a 4
 * 4. INCREMENTA N = N + 1 (richiedi lume aggiuntivo)
 * 5. RIPETI dal punto 2 con nuovo N
 *
 * VANTAGGI:
 * - Massimizza uso lumi disponibili
 * - Prova PRIMA solo C, POI C+Y
 * - Aumenta lumi solo se necessario
 * - Distribuzione bilanciata con load balancing
 *
 * @returns Array of LumenAllocation con allocazione ottimale
 */
const optimizeLumenAllocation = (): LumenAllocation[] => {
  const drugs = compatibilityStore.sortedDrugs;
  const requestedLumens = lumensCount.value;

  logger.info('[v9] START - Backtracking iterativo', {
    drugs: drugs.length,
    requestedLumens,
  });

  // Ordina farmaci per incompatibilità (più problematici prima)
  const sortedDrugs = sortDrugsByIncompatibility(drugs);

  // ITERAZIONE: Prova con N lumi (partendo dai disponibili)
  for (let numLumens = requestedLumens; numLumens <= drugs.length; numLumens++) {
    logger.debug('[v9] Trying allocation', { numLumens });

    // TENTATIVO A: Solo compatibilità C
    const allocationC = tryAllocateWithCompatibility(sortedDrugs, numLumens, false);
    if (allocationC) {
      logger.info('[v9] SUCCESS with C-only', { numLumens });
      return markDeficitLumens(allocationC, requestedLumens);
    }

    // TENTATIVO B: Compatibilità C + Y
    const allocationCY = tryAllocateWithCompatibility(sortedDrugs, numLumens, true);
    if (allocationCY) {
      logger.info('[v9] SUCCESS with C+Y', { numLumens });
      return markDeficitLumens(allocationCY, requestedLumens);
    }

    logger.warn('[v9] Failed with numLumens', { numLumens });
  }

  // FALLBACK: Non dovrebbe mai arrivare qui
  logger.error('[v9] FAILED - No valid allocation found');
  return [];
};

/**
 * Tenta allocazione con N lumi usando compatibilità specificata
 *
 * @param drugs - Lista farmaci ordinati per incompatibilità
 * @param numLumens - Numero lumi da usare
 * @param useYCompatibility - Se true, usa C+Y; se false, usa solo C
 * @returns Allocazione se successo, null se fallito
 */
const tryAllocateWithCompatibility = (
  drugs: string[],
  numLumens: number,
  useYCompatibility: boolean,
): LumenAllocation[] | null => {
  // Inizializza N lumi vuoti
  const lumens: LumenAllocation[] = Array.from({ length: numLumens }, (_, i) => ({
    lumenId: i + 1,
    drugs: [],
    isCompatible: true,
  }));

  // Prova ad allocare ogni farmaco
  for (const drug of drugs) {
    // Trova lumi compatibili (ordina per carico crescente = load balancing)
    const compatibleLumens = lumens
      .filter((lumen) => {
        if (lumen.drugs.length === 0) return true; // Lume vuoto sempre OK

        // Verifica compatibilità con TUTTI i farmaci nel lume
        return lumen.drugs.every((existingDrug) => {
          if (useYCompatibility) {
            return isCompatibleY(drug, existingDrug); // C o Y
          } else {
            return isCompatibleC(drug, existingDrug); // Solo C
          }
        });
      })
      .sort((a, b) => a.drugs.length - b.drugs.length);

    // Se nessun lume compatibile → FALLIMENTO
    if (compatibleLumens.length === 0) {
      return null;
    }

    // Alloca al lume con meno farmaci (load balancing)
    compatibleLumens[0]!.drugs.push(drug);
  }

  // Rimuovi lumi vuoti
  return lumens.filter((l) => l.drugs.length > 0);
};

/**
 * Marca lumi oltre i disponibili come deficit
 *
 * @param allocation - Allocazione trovata
 * @param requestedLumens - Numero lumi richiesti dall'utente
 * @returns Allocazione con lumi marcati
 */
const markDeficitLumens = (
  allocation: LumenAllocation[],
  requestedLumens: number,
): LumenAllocation[] => {
  return allocation.map((lumen) => ({
    ...lumen,
    isCompatible: lumen.lumenId <= requestedLumens, // false se oltre disponibili
  }));
};

/**
 * Verifica se due farmaci sono C-compatibili (compatibilità diretta)
 */
const isCompatibleC = (drugA: string, drugB: string): boolean => {
  if (drugA === drugB) return true;
  const compat = compatibilityStore.getCompatibility(drugA, drugB);
  return compat === DrugCompatibility.COMPATIBLE;
};

/**
 * Verifica se due farmaci sono C o Y compatibili (diretta o rubinetto)
 */
const isCompatibleY = (drugA: string, drugB: string): boolean => {
  if (drugA === drugB) return true;
  const compat = compatibilityStore.getCompatibility(drugA, drugB);
  return compat === DrugCompatibility.COMPATIBLE || compat === DrugCompatibility.COMPATIBLE_ON_TAP;
};

/**
 * Ordina farmaci per numero di incompatibilità (decrescente)
 * Farmaci più problematici vengono allocati prima
 */
const sortDrugsByIncompatibility = (drugs: string[]): string[] => {
  return drugs
    .map((drug) => {
      let incompatCount = 0;

      if (props.analysisResults) {
        const result = props.analysisResults.results.find((r) => r.drug === drug);
        if (result) {
          incompatCount =
            result.incompatible.length +
            result.conflictingData.length +
            result.noDataAvailable.length;
        }
      }

      return { drug, incompatCount };
    })
    .sort((a, b) => b.incompatCount - a.incompatCount)
    .map((item) => item.drug);
};

// ============================================================
// DEPRECATED FUNCTIONS - Bron-Kerbosch v7 (non più usato)
// ============================================================
/**
 * ⚠️ DEPRECATO - Funzioni Graph Coloring v7 non più usate
 * Algoritmo v8 usa greedy semplice con C+Y invece di cliques
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Trova cliques massimali (Bron-Kerbosch algorithm)
 * @deprecated Sostituito da greedy v8
 */
const findMaximalCliques = (drugs: string[]): string[][] => {
  const cliques: string[][] = [];
  bronKerbosch([], drugs, [], cliques);
  return cliques;
};

/**
 * Bron-Kerbosch algorithm ricorsivo
 * @deprecated Sostituito da greedy v8
 */
const bronKerbosch = (R: string[], P: string[], X: string[], cliques: string[][]): void => {
  if (P.length === 0 && X.length === 0) {
    if (R.length >= 2) {
      cliques.push([...R]);
    }
    return;
  }

  const pivot = [...P, ...X][0];
  const candidates = P.filter((v) => !areFullyCompatibleC(v, pivot!));

  for (const v of candidates) {
    const neighbors = P.filter((u) => areFullyCompatibleC(v, u));
    bronKerbosch(
      [...R, v],
      neighbors,
      X.filter((u) => areFullyCompatibleC(v, u)),
      cliques,
    );
    P = P.filter((u) => u !== v);
    X.push(v);
  }
};

/**
 * @deprecated Sostituito da isCompatibleC() in v8
 */
const areFullyCompatibleC = (drugA: string, drugB: string): boolean => {
  if (drugA === drugB) return true;
  const compat = compatibilityStore.getCompatibility(drugA, drugB);
  return compat === DrugCompatibility.COMPATIBLE;
};

/**
 * @deprecated Non più usato in v8
 */
const findBestLumenForGroup = (
  group: string[],
  lumens: LumenAllocation[],
): LumenAllocation | null => {
  const compatible = lumens.filter((lumen) =>
    group.every((drug) => lumen.drugs.every((existing) => areFullyCompatibleC(drug, existing))),
  );

  if (compatible.length === 0) return null;

  compatible.sort((a, b) => a.drugs.length - b.drugs.length);
  return compatible[0] ?? null;
};

/**
 * @deprecated Non più usato in v8
 */
const findBestLumenForDrug = (drug: string, lumens: LumenAllocation[]): LumenAllocation | null => {
  // Prima prova C-compatibility
  const compatibleC = lumens.filter((lumen) =>
    lumen.drugs.every((existing) => areFullyCompatibleC(drug, existing)),
  );

  if (compatibleC.length > 0) {
    compatibleC.sort((a, b) => a.drugs.length - b.drugs.length);
    return compatibleC[0] ?? null;
  }

  const compatibleY = lumens.filter((lumen) => canAddDrugToLumen(drug, lumen));

  if (compatibleY.length > 0) {
    compatibleY.sort((a, b) => a.drugs.length - b.drugs.length);
    return compatibleY[0] ?? null;
  }

  return null;
};

/* eslint-enable @typescript-eslint/no-unused-vars */

// ============================================================
// ACTIVE HELPER FUNCTIONS
// ============================================================

/**
 * Helper per metadata farmaci (fotosensibilità, CVC)
 * Database temporaneo - TODO: integrare con drugDatabaseService
 */
const getDrugMetadata = (drugName: string) => {
  const metadata: Record<
    string,
    { photosensitive: boolean; cvcRequired: boolean; photosensitiveNote?: string; cvcNote?: string }
  > = {
    ADRENALINA: {
      photosensitive: true,
      cvcRequired: true,
      photosensitiveNote: 'Conservare al riparo dalla luce',
      cvcNote: 'Noto rischio flebite - richiede CVC',
    },
    'NORADRENALINA TARTRATO': {
      photosensitive: true,
      cvcRequired: true,
      photosensitiveNote: 'Fotosensibile - proteggere dalla luce',
      cvcNote: 'Alto rischio flebite - CVC obbligatorio',
    },
    FUROSEMIDE: {
      photosensitive: true,
      cvcRequired: false,
      photosensitiveNote: 'Sensibile alla luce - conservare in siringa scura',
    },
    LINEZOLID: {
      photosensitive: true,
      cvcRequired: false,
      photosensitiveNote: 'Fotosensibile - proteggere dalla luce diretta',
    },
    'IDROCORTISONE EMIS. SODICO': {
      photosensitive: false,
      cvcRequired: false,
    },
    'REMIFENTANIL CLORIDRATO': {
      photosensitive: false,
      cvcRequired: false,
    },
    'INSULINA UMANA': {
      photosensitive: false,
      cvcRequired: false,
    },
  };

  return metadata[drugName] || { photosensitive: false, cvcRequired: false };
};

/**
 * Verifica se farmaco può essere aggiunto a lume
 * Usa store.getCompatibility() per check veloce
 */
const canAddDrugToLumen = (drug: string, lumen: LumenAllocation): boolean => {
  // Lume vuoto → sempre OK
  if (lumen.drugs.length === 0) {
    return true;
  }

  // Verifica compatibilità con TUTTI i farmaci nel lume
  return lumen.drugs.every((existingDrug) => {
    const compat = compatibilityStore.getCompatibility(drug, existingDrug);
    // Compatibile se C o Y (rubinetto)
    return (
      compat === DrugCompatibility.COMPATIBLE || compat === DrugCompatibility.COMPATIBLE_ON_TAP
    );
  });
};

// ============================================================
// WATCHERS
// ============================================================

/**
 * Watch lumen allocation changes and emit events
 * Emit allocation-completed when allocation is calculated
 * Emit insufficient-lumens if deficit exists
 */
watch(
  lumenAllocation,
  (newAllocation) => {
    // Only emit if there are drugs allocated
    if (newAllocation.length > 0) {
      // Always emit allocation completed
      emit('allocation-completed', newAllocation);

      // Emit insufficient lumens if deficit exists
      if (deficit.value > 0) {
        emit('insufficient-lumens', deficit.value);
      }
    }
  },
  { deep: true }, // Watch nested array changes
);
</script>

<template>
  <div class="lumen-allocator-container" style="min-width: 100%">
    <!-- ============================================================ -->
    <!-- HEADER SECTION                                               -->
    <!-- ============================================================ -->
    <q-card class="bg-indigo-1 q-mb-xs">
      <q-card-section>
        <div class="text-h6 text-indigo-9">
          <q-icon name="hub" class="q-mr-xs" />
          💉 Lumen Allocation Optimizer
        </div>
        <div class="text-caption text-grey-7">
          Algoritmo greedy per ottimizzazione allocazione lumi CVC/PICC
        </div>

        <!-- Legenda icone -->
        <div class="q-mt-sm q-gutter-xs row items-center">
          <div class="text-caption"><strong>Legenda:</strong></div>
          <q-chip size="sm" color="orange-2" icon="light_mode">
            <span style="color: #e65100">Fotosensibile</span>
          </q-chip>
          <q-chip size="sm" color="red-2" icon="place">
            <span style="color: #c62828">CVC Richiesto</span>
          </q-chip>
        </div>
      </q-card-section>
    </q-card>

    <!-- ============================================================ -->
    <!-- INPUT LUMENS AVAILABLE                                       -->
    <!-- ============================================================ -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row items-center q-gutter-md">
          <div class="col-12 col-md-6">
            <q-input
              v-model.number="lumensCount"
              type="number"
              label="💉 Lumi CVC/PICC disponibili"
              :min="1"
              :max="6"
              outlined
              hint="Tipico CVC: 3-4 lumi | PICC: 1-2 lumi"
            >
              <template #prepend>
                <q-icon name="medical_services" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-5">
            <q-chip
              v-if="lumenAllocation.length > 0"
              :color="isSufficient ? 'positive' : 'negative'"
              text-color="white"
              icon="info"
              size="lg"
            >
              <strong>
                {{ isSufficient ? '✅ Sufficienti' : '❌ Insufficienti' }}
              </strong>
              <q-tooltip>
                Necessari: {{ lumenAllocation.length }} | Disponibili: {{ lumensCount }}
              </q-tooltip>
            </q-chip>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- ============================================================ -->
    <!-- PLACEHOLDER (No drugs selected)                             -->
    <!-- ============================================================ -->
    <q-card
      v-if="compatibilityStore.sortedDrugs.length === 0"
      class="bg-grey-3 q-pa-lg text-center"
    >
      <q-icon name="pending_actions" size="64px" color="grey-6" class="q-mb-md" />
      <div class="text-h6 text-grey-7 q-mb-sm">Nessun farmaco selezionato</div>
      <div class="text-body2 text-grey-6">
        Seleziona almeno 2 farmaci per visualizzare l'allocazione lumi
      </div>
    </q-card>

    <!-- ============================================================ -->
    <!-- ALLOCATION CHART (Visual lumen allocation)                  -->
    <!-- ============================================================ -->
    <div v-else>
      <!-- INSUFFICIENT LUMENS ALERT -->
      <q-banner v-if="!isSufficient" class="bg-negative text-white q-mb-md" rounded>
        <template #avatar>
          <q-icon name="warning" size="32px" />
        </template>
        <div class="text-h6 q-mb-sm">⚠️ Lumi Insufficienti - Rischio Allocazione</div>
        <div class="text-body1">
          <strong
            >Necessari {{ lumenAllocation.length }} lumi, disponibili {{ lumensCount }}</strong
          >
        </div>
        <div class="text-body2 q-mt-sm">
          Deficit: <strong>{{ deficit }} {{ deficit === 1 ? 'lume' : 'lumi' }}</strong> mancante/i
        </div>
        <div
          v-if="hasIncompatibleAllocations"
          class="text-body2 q-mt-sm bg-red-10 q-pa-sm rounded-borders"
        >
          <q-icon name="error" size="sm" class="q-mr-xs" />
          <strong>ATTENZIONE:</strong> Farmaci incompatibili rilevati in
          {{ incompatibleLumens.length === 1 ? 'lume' : 'lumi' }}
          {{ incompatibleLumens.join(', ') }}
          <br />
          <strong>Raccomandazione:</strong> Aggiungere {{ deficit }}
          {{ deficit === 1 ? 'lume' : 'lumi' }} aggiuntivo/i per evitare incompatibilità
        </div>
      </q-banner>

      <!-- LUMEN CARDS (1 per lumen) -->
      <div class="row q-gutter-md q-mb-md">
        <q-card
          v-for="lumen in lumenAllocation"
          :key="lumen.lumenId"
          :class="[
            'col-12 col-md-5',
            lumen.lumenId <= lumensCount && lumen.isCompatible !== false
              ? 'bg-green-1'
              : 'bg-red-1',
          ]"
        >
          <q-card-section>
            <div
              :class="[
                'text-h6',
                lumen.lumenId <= lumensCount && lumen.isCompatible !== false
                  ? 'text-green-9'
                  : 'text-red-9',
              ]"
            >
              <q-icon
                :name="
                  lumen.lumenId <= lumensCount && lumen.isCompatible !== false
                    ? 'check_circle'
                    : 'cancel'
                "
                class="q-mr-sm"
              />
              Lumen {{ lumen.lumenId }}
              <q-chip
                v-if="lumen.lumenId > lumensCount"
                color="negative"
                text-color="white"
                size="sm"
                class="q-ml-sm"
              >
                NON DISPONIBILE
              </q-chip>
              <q-chip
                v-else-if="lumen.isCompatible === false"
                color="negative"
                text-color="white"
                size="sm"
                class="q-ml-sm"
              >
                ⚠️ INCOMPATIBILITÀ
              </q-chip>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="q-gutter-xs">
              <q-chip
                v-for="drug in lumen.drugs"
                :key="drug"
                color="primary"
                text-color="white"
                icon="medication"
              >
                {{ drug }}
                <q-icon
                  v-if="getDrugMetadata(drug).photosensitive"
                  name="light_mode"
                  color="orange"
                  size="sm"
                  class="q-ml-xs"
                >
                  <q-tooltip>{{
                    getDrugMetadata(drug).photosensitiveNote || 'Fotosensibile'
                  }}</q-tooltip>
                </q-icon>
                <q-icon
                  v-if="getDrugMetadata(drug).cvcRequired"
                  name="place"
                  color="red"
                  size="sm"
                  class="q-ml-xs"
                >
                  <q-tooltip>{{ getDrugMetadata(drug).cvcNote || 'CVC Richiesto' }}</q-tooltip>
                </q-icon>
              </q-chip>
            </div>
            <div class="text-caption text-grey-7 q-mt-sm">
              {{ lumen.drugs.length }}
              {{ lumen.drugs.length === 1 ? 'farmaco' : 'farmaci' }} allocato/i
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- RECOMMENDATIONS LIST -->
      <q-card v-if="recommendations.length > 0" class="bg-purple-1 q-mb-md">
        <q-card-section>
          <div class="text-h6 text-purple-9">
            <q-icon name="lightbulb" class="q-mr-sm" />
            💡 Raccomandazioni Ottimizzazione
          </div>
        </q-card-section>
        <q-separator />
        <q-list>
          <q-item v-for="(rec, index) in recommendations" :key="index">
            <q-item-section avatar>
              <q-icon name="arrow_right" color="purple" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ rec }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

.lumen-allocator-container {
  max-width: 1000px;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .lumen-allocator-container {
    padding: 8px;
  }
}
</style>
