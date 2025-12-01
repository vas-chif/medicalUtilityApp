<!-- DrugDilution.vue -->

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file DrugDilution.vue
 * @description Drug dilution calculator for IV preparations.
 *              Calculates final concentrations, volumes to withdraw from stock solutions,
 *              and dilution ratios for safe drug administration.
 *
 * @author Vasile Chifeac
 * @created 2025-11-16
 * @modified 2025-11-16
 *
 * @example
 * <DrugDilution
 *   calculateButtonText="Calcola Diluizione"
 *   resetButtonText="Reset"
 *   @calculated="handleDilutionCalculated"
 * />
 *
 * @notes
 * - Concentrazione finale = Dose (mg) / Volume finale (mL)
 * - Volume da prelevare = Dose / Concentrazione stock
 * - Rapporto diluizione = Volume finale / Volume prelevato
 * - TypeScript strict mode, professional JSDoc, GDPR-compliant logging
 *
 * @medical-references
 * - ISMP (Institute for Safe Medication Practices) - High-Alert Medications
 * - ASHP Guidelines on Compounding Sterile Preparations
 */

import { ref, computed } from 'vue';
import { useSecureLogger } from 'src/composables/useSecureLogger';

// ============================================================
// LOGGING
// ============================================================
const { logger } = useSecureLogger();

// ============================================================
// PROPS & EMITS
// ============================================================

interface Props {
  /** Testo bottone calcola (default: "Calcola Diluizione") */
  calculateButtonText?: string;
  /** Testo bottone reset (default: "Reset") */
  resetButtonText?: string;
  /** Titolo sezione (optional) */
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  calculateButtonText: 'Calcola Diluizione',
  resetButtonText: 'Reset',
  title: '💧 Drug Dilution Calculator',
});

interface DilutionCalculatedPayload {
  /** Final concentration in mg/mL */
  finalConcentration: number;
  /** Volume to withdraw from stock solution in mL */
  volumeToWithdraw: number;
  /** Dilution ratio (e.g., "1:10") */
  dilutionRatio: string;
  /** Dose in mg */
  dose: number;
  /** Final volume in mL */
  volume: number;
}

const emit = defineEmits<{
  (e: 'calculated', payload: DilutionCalculatedPayload): void;
}>();

// ============================================================
// TYPES & INTERFACES
// ============================================================

/**
 * Drug Dilution Calculator - Form data interface
 * @interface DilutionFormData
 */
interface DilutionFormData {
  /** Drug dose in milligrams */
  dose: number | null;
  /** Final solution volume in milliliters */
  volume: number | null;
  /** Stock solution concentration in mg/mL (optional) */
  stockConcentration: number | null;
  /** Target concentration in mg/mL (optional) */
  targetConcentration: number | null;
}

/**
 * Drug Dilution Calculator - Result interface
 * @interface DilutionResult
 */
interface DilutionResult {
  /** Final concentration after dilution (mg/mL) */
  finalConcentration: number;
  /** Volume to withdraw from stock solution (mL) */
  volumeToWithdraw: number;
  /** Dilution ratio (e.g., "1:10") */
  dilutionRatio: string;
}

// ============================================================
// STATE
// ============================================================

const initialDilutionForm: DilutionFormData = {
  dose: null,
  volume: null,
  stockConcentration: null,
  targetConcentration: null,
};

const initialDilutionResult: DilutionResult = {
  finalConcentration: 0,
  volumeToWithdraw: 0,
  dilutionRatio: '',
};

const dilutionForm = ref<DilutionFormData>({ ...initialDilutionForm });
const dilutionResult = ref<DilutionResult>({ ...initialDilutionResult });

// ============================================================
// COMPUTED
// ============================================================

/**
 * Validate dilution form inputs
 */
const isDilutionFormValid = computed(() => {
  return (
    dilutionForm.value.dose !== null &&
    dilutionForm.value.dose > 0 &&
    dilutionForm.value.volume !== null &&
    dilutionForm.value.volume > 0
  );
});

// ============================================================
// METHODS
// ============================================================

/**
 * Calculate Dilution - Main calculation logic
 */
const calculateDilution = () => {
  if (!isDilutionFormValid.value) return;

  const dose = dilutionForm.value.dose!;
  const volume = dilutionForm.value.volume!;
  const stockConc = dilutionForm.value.stockConcentration;

  // Concentrazione finale = Dose / Volume
  const finalConcentration = dose / volume;

  // Volume da prelevare (se stock concentration fornita)
  let volumeToWithdraw = 0;
  if (stockConc && stockConc > 0) {
    // V_prelievo = Dose / C_stock
    volumeToWithdraw = dose / stockConc;
  }

  // Rapporto diluizione (se volume da prelevare calcolato)
  let dilutionRatio = '';
  if (volumeToWithdraw > 0) {
    const ratio = volume / volumeToWithdraw;
    dilutionRatio = `1:${ratio.toFixed(1)}`;
  }

  dilutionResult.value = {
    finalConcentration,
    volumeToWithdraw,
    dilutionRatio,
  };

  // Emit event
  emit('calculated', {
    finalConcentration,
    volumeToWithdraw,
    dilutionRatio,
    dose,
    volume,
  });

  logger.info('Dilution calculated', {
    finalConcentration: finalConcentration.toFixed(2),
    dilutionRatio,
  });
};

/**
 * Reset Dilution Form - Clear all inputs and results
 */
const resetDilutionForm = () => {
  dilutionForm.value = { ...initialDilutionForm };
  dilutionResult.value = { ...initialDilutionResult };
  logger.debug('Dilution form reset');
};
</script>

<template>
  <div class="drug-dilution">
    <!-- Title & Description -->
    <div class="text-h5 text-primary q-mb-md">{{ title }}</div>
    <p class="text-body2 text-grey-7 q-mb-lg">
      Calcolo diluizioni farmaci, concentrazioni finali e volumi da prelevare
    </p>

    <div class="row q-gutter-lg">
      <!-- ====================================================== -->
      <!-- DILUTION INPUT PANEL - Dose & Volume Parameters       -->
      <!-- ====================================================== -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri Diluizione</h6>

            <!-- Dose Farmaco -->
            <q-input
              v-model.number="dilutionForm.dose"
              type="number"
              step="0.1"
              label="Dose Farmaco"
              suffix="mg"
              outlined
              class="q-mb-md"
              :rules="[(val) => val > 0 || 'Dose deve essere > 0']"
            >
              <template v-slot:prepend>
                <q-icon name="medication" color="red" />
              </template>
            </q-input>

            <!-- Volume Finale -->
            <q-input
              v-model.number="dilutionForm.volume"
              type="number"
              step="1"
              label="Volume Finale Soluzione"
              suffix="mL"
              outlined
              class="q-mb-md"
              :rules="[(val) => val > 0 || 'Volume deve essere > 0']"
            >
              <template v-slot:prepend>
                <q-icon name="local_drink" color="blue" />
              </template>
            </q-input>

            <!-- Concentrazione Stock (opzionale) -->
            <q-input
              v-model.number="dilutionForm.stockConcentration"
              type="number"
              step="0.1"
              label="Concentrazione Stock (opzionale)"
              suffix="mg/mL"
              outlined
              class="q-mb-md"
              hint="Per calcolare volume da prelevare"
            >
              <template v-slot:prepend>
                <q-icon name="science" color="purple" />
              </template>
            </q-input>

            <!-- Concentrazione Desiderata (opzionale) -->
            <q-input
              v-model.number="dilutionForm.targetConcentration"
              type="number"
              step="0.01"
              label="Concentrazione Desiderata (opzionale)"
              suffix="mg/mL"
              outlined
              class="q-mb-md"
              hint="Per calcolare volume finale necessario"
            >
              <template v-slot:prepend>
                <q-icon name="straighten" color="green" />
              </template>
            </q-input>

            <!-- Calculate Button -->
            <q-btn
              @click="calculateDilution"
              color="primary"
              size="lg"
              class="full-width q-mb-sm"
              icon="calculate"
              :disable="!isDilutionFormValid"
            >
              {{ calculateButtonText }}
            </q-btn>

            <!-- Reset Button -->
            <q-btn
              @click="resetDilutionForm"
              color="negative"
              size="lg"
              class="full-width"
              icon="refresh"
              outline
            >
              {{ resetButtonText }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- ====================================================== -->
      <!-- DILUTION RESULTS PANEL                                 -->
      <!-- ====================================================== -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📊 Risultati Diluizione</h6>

            <!-- Results Display -->
            <div v-if="dilutionResult.finalConcentration > 0">
              <!-- Concentrazione Finale -->
              <div class="text-center q-mb-lg">
                <div class="text-h3 text-primary q-mb-sm">
                  {{ dilutionResult.finalConcentration.toFixed(2) }}
                </div>
                <div class="text-subtitle1 text-grey-7">
                  <strong>mg/mL</strong> (Concentrazione Finale)
                </div>
              </div>

              <q-separator class="q-mb-md" />

              <!-- Dettagli Calcolo -->
              <div class="q-mb-md">
                <q-list bordered separator class="rounded-borders">
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Dose Totale</q-item-label>
                      <q-item-label class="text-h6">{{ dilutionForm.dose }} mg</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Volume Finale</q-item-label>
                      <q-item-label class="text-h6">{{ dilutionForm.volume }} mL</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="dilutionResult.volumeToWithdraw > 0">
                    <q-item-section>
                      <q-item-label overline>Volume da Prelevare (da stock)</q-item-label>
                      <q-item-label class="text-h6 text-orange">
                        {{ dilutionResult.volumeToWithdraw.toFixed(2) }} mL
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="dilutionResult.dilutionRatio">
                    <q-item-section>
                      <q-item-label overline>Rapporto Diluizione</q-item-label>
                      <q-item-label class="text-h6 text-green">
                        {{ dilutionResult.dilutionRatio }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- Formula Used -->
              <q-expansion-item icon="functions" label="📐 Formula Utilizzata" class="q-mt-md">
                <q-card class="q-pa-md">
                  <div class="q-mb-sm">
                    <strong>Concentrazione Finale:</strong><br />
                    <small>C = Dose (mg) / Volume (mL)</small>
                  </div>
                  <div class="q-mb-sm" v-if="dilutionResult.volumeToWithdraw > 0">
                    <strong>Volume da Prelevare:</strong><br />
                    <small>V = Dose / Concentrazione Stock</small>
                  </div>
                  <div v-if="dilutionResult.dilutionRatio">
                    <strong>Rapporto Diluizione:</strong><br />
                    <small>Ratio = Volume Finale / Volume Prelevato</small>
                  </div>
                </q-card>
              </q-expansion-item>

              <!-- Safety Guidelines -->
              <q-expansion-item
                icon="warning"
                label="⚠️ Linee Guida Sicurezza"
                class="text-orange q-mt-sm"
              >
                <q-card class="q-pa-md bg-orange-1">
                  <ul class="q-ma-none">
                    <li>Verificare sempre il farmaco e la concentrazione prima della diluizione</li>
                    <li>Utilizzare tecnica asettica per preparazioni sterili</li>
                    <li>Controllare compatibilità farmaco-solvente</li>
                    <li>Etichettare chiaramente la soluzione finale</li>
                    <li>Rispettare tempi di stabilità della soluzione diluita</li>
                    <li>Double-check da parte di due operatori per farmaci ad alto rischio</li>
                  </ul>
                </q-card>
              </q-expansion-item>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center text-grey-6 q-pa-xl">
              <q-icon name="info" size="lg" class="q-mb-md" />
              <p class="text-body2">Inserisci dose e volume per calcolare la diluizione</p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
