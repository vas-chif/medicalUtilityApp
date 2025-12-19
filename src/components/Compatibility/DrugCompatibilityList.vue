<script setup lang="ts">
/**
 * @file DrugCompatibilityList.vue
 * @description Visualizzazione dettagliata compatibilità farmaci con colori codificati
 * @author Vasile Chifeac
 * @created 2025-12-09
 *
 * @notes
 * - Pattern § 🏗️ ARCHITETTURA COMPONENTI
 * - Colori codificati:
 *   - VERDE (#c8e6c9): Compatibile (C)
 *   - ARANCIONE (#ffe0b2): Compatibile al rubinetto/Y-site (Y)
 *   - GRIGIO (#e0e0e0): Dati contrastanti (!)
 *   - ROSSO (#e97f89): Incompatibile (I)
 *   - Dati non disponibili: omesso dalla visualizzazione
 * - Visualizza farmaci in lista verticale con sub-liste colorate
 */

import { computed } from 'vue';
import type { MultiDrugAnalysis } from 'src/types/DrugTypes';
import { useI18n } from 'vue-i18n';

// COMPOSABLES
const { t } = useI18n();

// Helper per metadata farmaci (fotosensibilità, CVC)
const getDrugMetadata = (drugName: string) => {
  // Database temporaneo - TODO: integrare con drugDatabaseService
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

// ============================================================
// PROPS
// ============================================================
interface Props {
  /** Analysis results from compatibility check */
  analysisResults: MultiDrugAnalysis | null;
}

const props = defineProps<Props>();

// ============================================================
// COMPUTED
// ============================================================

/**
 * Preparazione dati visualizzazione compatibilità per ogni farmaco
 */
const compatibilityData = computed(() => {
  if (!props.analysisResults) return [];

  return props.analysisResults.results.map((result) => ({
    name: result.drug,
    compatible: result.compatible,
    compatibleOnTap: result.compatibleOnTap,
    conflictingData: result.conflictingData,
    incompatible: result.incompatible,
    // Omit noDataAvailable come richiesto
  }));
});

/**
 * Verifica se ci sono risultati da mostrare
 */
const hasResults = computed(() => {
  return props.analysisResults !== null && compatibilityData.value.length > 0;
});
</script>

<template>
  <div class="drug-compatibility-list">
    <!-- ============================================================ -->
    <!-- PLACEHOLDER (No analysis yet)                               -->
    <!-- ============================================================ -->
    <q-card v-if="!hasResults" class="bg-grey-3 q-pa-lg text-center">
      <q-icon name="pending" size="64px" color="grey-6" class="q-mb-md" />
      <div class="text-h6 text-grey-7 q-mb-sm">
        {{ t('drugCompatibility.compatibilityList.pending') }}
      </div>
      <div class="text-body2 text-grey-6">
        {{ t('drugCompatibility.compatibilityList.selectDrugsHint') }}
      </div>
    </q-card>

    <!-- ============================================================ -->
    <!-- COMPATIBILITY LIST                                          -->
    <!-- ============================================================ -->
    <q-card v-else class="compatibility-card">
      <q-card-section>
        <div class="text-h6 text-weight-bold q-mb-md">
          <q-icon name="medication" class="q-mr-sm" />
          📊 {{ t('drugCompatibility.compatibilityList.title') }}
        </div>

        <!-- Lista farmaci -->
        <div v-for="(drug, index) in compatibilityData" :key="index" class="drug-item q-mb-md">
          <!-- Nome farmaco principale -->
          <div class="text-h6 text-weight-bold drug-name q-mb-sm">
            {{ index + 1 }}. {{ drug.name }}
          </div>

          <!-- Sub-lista compatibilità -->
          <div class="compatibility-details q-pl-md">
            <!-- Compatibili (VERDE) -->
            <div v-if="drug.compatible.length > 0" class="compatibility-row q-mb-xs">
              <span class="label">{{ t('drugCompatibility.compatibilityList.compatible') }}:</span>
              <div class="drugs-list">
                <q-chip
                  v-for="(compatDrug, idx) in drug.compatible"
                  :key="idx"
                  class="compatible-chip"
                  dense
                  square
                >
                  {{ compatDrug }}
                  <q-icon
                    v-if="getDrugMetadata(compatDrug).photosensitive"
                    name="light_mode"
                    color="orange"
                    size="14px"
                    class="q-ml-xs"
                  >
                    <q-tooltip>{{
                      getDrugMetadata(compatDrug).photosensitiveNote ||
                      t('drugCompatibility.lumenAllocator.legend.photosensitive')
                    }}</q-tooltip>
                  </q-icon>
                  <q-icon
                    v-if="getDrugMetadata(compatDrug).cvcRequired"
                    name="place"
                    color="red"
                    size="14px"
                    class="q-ml-xs"
                  >
                    <q-tooltip>{{
                      getDrugMetadata(compatDrug).cvcNote ||
                      t('drugCompatibility.lumenAllocator.legend.cvcRequired')
                    }}</q-tooltip>
                  </q-icon>
                </q-chip>
              </div>
            </div>

            <!-- Compatibili al rubinetto (ARANCIONE) -->
            <div v-if="drug.compatibleOnTap.length > 0" class="compatibility-row q-mb-xs">
              <span class="label"
                >{{ t('drugCompatibility.compatibilityList.compatibleYSite') }}:</span
              >
              <div class="drugs-list">
                <q-chip
                  v-for="(tapDrug, idx) in drug.compatibleOnTap"
                  :key="idx"
                  class="compatible-tap-chip"
                  dense
                  square
                >
                  {{ tapDrug }}
                  <q-icon
                    v-if="getDrugMetadata(tapDrug).photosensitive"
                    name="light_mode"
                    color="orange"
                    size="14px"
                    class="q-ml-xs"
                  >
                    <q-tooltip>{{
                      getDrugMetadata(tapDrug).photosensitiveNote ||
                      t('drugCompatibility.lumenAllocator.legend.photosensitive')
                    }}</q-tooltip>
                  </q-icon>
                  <q-icon
                    v-if="getDrugMetadata(tapDrug).cvcRequired"
                    name="place"
                    color="red"
                    size="14px"
                    class="q-ml-xs"
                  >
                    <q-tooltip>{{
                      getDrugMetadata(tapDrug).cvcNote ||
                      t('drugCompatibility.lumenAllocator.legend.cvcRequired')
                    }}</q-tooltip>
                  </q-icon>
                </q-chip>
              </div>
            </div>

            <!-- Dati contrastanti (GIALLO) -->
            <div v-if="drug.conflictingData.length > 0" class="compatibility-row q-mb-xs">
              <span class="label">DATI CONTRASTANTI:</span>
              <div class="drugs-list">
                <q-chip
                  v-for="(conflictDrug, idx) in drug.conflictingData"
                  :key="idx"
                  class="conflicting-chip"
                  dense
                  square
                >
                  {{ conflictDrug }}
                  <q-icon
                    v-if="getDrugMetadata(conflictDrug).photosensitive"
                    name="light_mode"
                    color="orange"
                    size="14px"
                    class="q-ml-xs"
                  >
                    <q-tooltip>{{
                      getDrugMetadata(conflictDrug).photosensitiveNote ||
                      t('drugCompatibility.lumenAllocator.legend.photosensitive')
                    }}</q-tooltip>
                  </q-icon>
                  <q-icon
                    v-if="getDrugMetadata(conflictDrug).cvcRequired"
                    name="place"
                    color="red"
                    size="14px"
                    class="q-ml-xs"
                  >
                    <q-tooltip>{{
                      getDrugMetadata(conflictDrug).cvcNote ||
                      t('drugCompatibility.lumenAllocator.legend.cvcRequired')
                    }}</q-tooltip>
                  </q-icon>
                </q-chip>
              </div>
            </div>

            <!-- Incompatibili (ROSSO) -->
            <div v-if="drug.incompatible.length > 0" class="compatibility-row q-mb-xs">
              <span class="label"
                >{{ t('drugCompatibility.compatibilityList.incompatible') }}:</span
              >
              <div class="drugs-list">
                <q-chip
                  v-for="(incompDrug, idx) in drug.incompatible"
                  :key="idx"
                  class="incompatible-chip"
                  dense
                  square
                >
                  {{ incompDrug }}
                  <q-icon
                    v-if="getDrugMetadata(incompDrug).photosensitive"
                    name="light_mode"
                    color="orange"
                    size="14px"
                    class="q-ml-xs"
                  >
                    <q-tooltip>{{
                      getDrugMetadata(incompDrug).photosensitiveNote ||
                      t('drugCompatibility.lumenAllocator.legend.photosensitive')
                    }}</q-tooltip>
                  </q-icon>
                  <q-icon
                    v-if="getDrugMetadata(incompDrug).cvcRequired"
                    name="place"
                    color="red"
                    size="14px"
                    class="q-ml-xs"
                  >
                    <q-tooltip>{{
                      getDrugMetadata(incompDrug).cvcNote ||
                      t('drugCompatibility.lumenAllocator.legend.cvcRequired')
                    }}</q-tooltip>
                  </q-icon>
                </q-chip>
              </div>
            </div>

            <!-- Messaggio se tutto vuoto (solo dati non disponibili) -->
            <div
              v-if="
                drug.compatible.length === 0 &&
                drug.compatibleOnTap.length === 0 &&
                drug.conflictingData.length === 0 &&
                drug.incompatible.length === 0
              "
              class="text-grey-6 text-caption"
            >
              Nessun dato di compatibilità disponibile
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

.compatibility-card {
  border-left: 4px solid #1976d2;
}

.drug-item {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 12px;
}

.drug-item:last-child {
  border-bottom: none;
}

.drug-name {
  color: #1976d2;
  font-size: 1.1rem;
}

.compatibility-details {
  margin-left: 16px;
}

.compatibility-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-weight: 600;
  font-size: 0.875rem;
  color: #424242;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.drugs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* Chip styles con colori specifici richiesti */
.compatible-chip {
  background-color: #c8e6c9 !important; /* VERDE */
  color: #1b5e20 !important;
  font-weight: 500;
}

.compatible-tap-chip {
  background-color: #ffe0b2 !important; /* ARANCIONE */
  color: #e65100 !important;
  font-weight: 500;
}

.conflicting-chip {
  background-color: #e0e0e0 !important; /* GRIGIO */
  color: #424242 !important;
  font-weight: 500;
}

.incompatible-chip {
  background-color: #e97f89 !important; /* ROSSO */
  color: #ffffff !important;
  font-weight: 600;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .drug-name {
    font-size: 1rem;
  }

  .compatibility-details {
    margin-left: 8px;
  }

  .label {
    font-size: 0.75rem;
  }
}
</style>
