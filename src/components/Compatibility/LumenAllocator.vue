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
 */
interface Props {
  /** Selected drugs for analysis (from DrugSelector) */
  selectedDrugs: string[];
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
 * Optimal lumen allocation using greedy algorithm
 * Recalculates when selectedDrugs or analysisResults change
 * @returns Array of lumen allocations (1 per lumen needed)
 */
const lumenAllocation = computed((): LumenAllocation[] => {
  // Guard: No drugs selected
  if (props.selectedDrugs.length === 0) {
    return [];
  }

  // Guard: No analysis results available
  if (!props.analysisResults) {
    return [];
  }

  // Run greedy allocation algorithm
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
// FUNCTIONS - GREEDY ALGORITHM
// ============================================================

/**
 * Greedy algorithm for lumen allocation
 * Allocates drugs to minimum number of lumens respecting compatibility
 *
 * ALGORITHM STEPS:
 * 1. Start with empty lumens list
 * 2. For each drug:
 *    - Try to find existing lumen where drug is compatible with ALL drugs in that lumen
 *    - If found: Add drug to that lumen
 *    - If NOT found: Create NEW lumen with this drug
 * 3. Return list of lumens
 *
 * COMPLEXITY: O(N²) where N = number of drugs
 * OPTIMALITY: Not guaranteed optimal (greedy = local best choice)
 *
 * @returns Array of LumenAllocation (1 per lumen needed)
 */
const optimizeLumenAllocation = (): LumenAllocation[] => {
  const lumens: LumenAllocation[] = [];

  // Iterate through each selected drug
  for (const drug of props.selectedDrugs) {
    let allocated = false;

    // Try to find existing lumen where this drug is compatible
    for (const lumen of lumens) {
      // Check if drug is compatible with ALL drugs in this lumen
      const compatibleWithAll = lumen.drugs.every((existingDrug) =>
        canShareLumen(drug, existingDrug),
      );

      if (compatibleWithAll) {
        // Add drug to this lumen
        lumen.drugs.push(drug);
        allocated = true;
        break; // Stop searching, drug allocated
      }
    }

    // If drug couldn't be allocated to any existing lumen, create NEW lumen
    if (!allocated) {
      lumens.push({
        lumenId: lumens.length + 1,
        drugs: [drug],
        isCompatible: true, // Single drug always compatible with itself
      });
    }
  }

  return lumens;
};

/**
 * Check if two drugs can share the same lumen
 * Query compatibility matrix from analysisResults
 *
 * @param drugA - First drug name
 * @param drugB - Second drug name
 * @returns true if compatible (C or Y), false if incompatible (I or unknown)
 */
const canShareLumen = (drugA: string, drugB: string): boolean => {
  // Guard: No analysis results
  if (!props.analysisResults) {
    return false; // Assume incompatible if no data
  }

  // Same drug always compatible with itself
  if (drugA === drugB) {
    return true;
  }

  // Query compatibility matrix (DrugA → DrugB lookup)
  const matrixA = props.analysisResults.compatibilityMatrix[drugA];
  if (matrixA && matrixA[drugB]) {
    const compat = matrixA[drugB];
    // Compatible (C) or Y-site (Y) = can share lumen with flush protocol
    // Incompatible (I) or Conflicting (!) = cannot share lumen
    return (
      compat === DrugCompatibility.COMPATIBLE || compat === DrugCompatibility.COMPATIBLE_ON_TAP
    );
  }

  // Try reverse lookup (DrugB → DrugA) - matrix might be one-directional
  const matrixB = props.analysisResults.compatibilityMatrix[drugB];
  if (matrixB && matrixB[drugA]) {
    const compat = matrixB[drugA];
    return (
      compat === DrugCompatibility.COMPATIBLE || compat === DrugCompatibility.COMPATIBLE_ON_TAP
    );
  }

  // No data found → assume incompatible (safety first in medical context)
  return false;
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
    <q-card v-if="props.selectedDrugs.length === 0" class="bg-grey-3 q-pa-lg text-center">
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
      </q-banner>

      <!-- LUMEN CARDS (1 per lumen) -->
      <div class="row q-gutter-md q-mb-md">
        <q-card
          v-for="lumen in lumenAllocation"
          :key="lumen.lumenId"
          :class="['col-12 col-md-5', lumen.lumenId <= lumensCount ? 'bg-green-1' : 'bg-red-1']"
        >
          <q-card-section>
            <div :class="['text-h6', lumen.lumenId <= lumensCount ? 'text-green-9' : 'text-red-9']">
              <q-icon
                :name="lumen.lumenId <= lumensCount ? 'check_circle' : 'cancel'"
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
