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
import { useI18n } from 'vue-i18n';
import { useSecureLogger } from 'src/composables/useSecureLogger';

// ============================================================
// I18N
// ============================================================
const { t } = useI18n();

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
  calculateButtonText: '',
  resetButtonText: '',
  title: '',
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
    <div class="text-h5 text-primary q-mb-md">{{ title || t('drugDilution.title') }}</div>
    <p class="text-body2 text-grey-7 q-mb-lg">
      {{ t('drugDilution.subtitle') }}
    </p>

    <div class="row q-gutter-lg">
      <!-- ====================================================== -->
      <!-- DILUTION INPUT PANEL - Dose & Volume Parameters       -->
      <!-- ====================================================== -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">{{ t('drugDilution.form.sectionTitle') }}</h6>

            <!-- Dose Farmaco -->
            <q-input
              v-model.number="dilutionForm.dose"
              type="number"
              step="0.1"
              :label="t('drugDilution.form.dose.label')"
              :suffix="t('drugDilution.form.dose.unit')"
              outlined
              class="q-mb-md"
              :rules="[(val: number) => val > 0 || t('drugDilution.form.dose.validation')]"
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
              :label="t('drugDilution.form.volume.label')"
              :suffix="t('drugDilution.form.volume.unit')"
              outlined
              class="q-mb-md"
              :rules="[(val: number) => val > 0 || t('drugDilution.form.volume.validation')]"
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
              :label="t('drugDilution.form.stockConcentration.label')"
              :suffix="t('drugDilution.form.stockConcentration.unit')"
              outlined
              class="q-mb-md"
              :hint="t('drugDilution.form.stockConcentration.hint')"
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
              :label="t('drugDilution.form.targetConcentration.label')"
              :suffix="t('drugDilution.form.targetConcentration.unit')"
              outlined
              class="q-mb-md"
              :hint="t('drugDilution.form.targetConcentration.hint')"
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
              {{ calculateButtonText || t('drugDilution.buttons.calculate') }}
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
              {{ resetButtonText || t('drugDilution.buttons.reset') }}
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
            <h6 class="text-h6 q-ma-none q-mb-md">{{ t('drugDilution.resultsPanel.title') }}</h6>

            <!-- Results Display -->
            <div v-if="dilutionResult.finalConcentration > 0">
              <!-- Concentrazione Finale -->
              <div class="text-center q-mb-lg">
                <div class="text-h3 text-primary q-mb-sm">
                  {{ dilutionResult.finalConcentration.toFixed(2) }}
                </div>
                <div class="text-subtitle1 text-grey-7">
                  <strong>{{ t('drugDilution.resultsPanel.finalConcentration.label') }}</strong>
                  ({{ t('drugDilution.resultsPanel.finalConcentration.subtitle') }})
                </div>
              </div>

              <q-separator class="q-mb-md" />

              <!-- Dettagli Calcolo -->
              <div class="q-mb-md">
                <q-list bordered separator class="rounded-borders">
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>{{
                        t('drugDilution.resultsPanel.details.totalDose')
                      }}</q-item-label>
                      <q-item-label class="text-h6">{{ dilutionForm.dose }} mg</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>{{
                        t('drugDilution.resultsPanel.details.finalVolume')
                      }}</q-item-label>
                      <q-item-label class="text-h6">{{ dilutionForm.volume }} mL</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="dilutionResult.volumeToWithdraw > 0">
                    <q-item-section>
                      <q-item-label overline>{{
                        t('drugDilution.resultsPanel.details.volumeToWithdraw')
                      }}</q-item-label>
                      <q-item-label class="text-h6 text-orange">
                        {{ dilutionResult.volumeToWithdraw.toFixed(2) }} mL
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="dilutionResult.dilutionRatio">
                    <q-item-section>
                      <q-item-label overline>{{
                        t('drugDilution.resultsPanel.details.dilutionRatio')
                      }}</q-item-label>
                      <q-item-label class="text-h6 text-green">
                        {{ dilutionResult.dilutionRatio }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center text-grey-6 q-pa-xl">
              <q-icon name="info" size="lg" class="q-mb-md" />
              <p class="text-body2">{{ t('drugDilution.emptyState') }}</p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- 9 DOCUMENTATION SECTIONS - ALWAYS VISIBLE -->
    <q-card class="q-pa-md q-mt-md">
      <q-card-section>
        <h6 class="text-h6 q-ma-none q-mb-md">Documentazione Clinica</h6>

        <!-- SECTION 1: DEFINITION -->
        <q-expansion-item
          icon="info"
          :label="t('drugDilution.sections.definition.title')"
          class="q-mb-sm"
          header-class="bg-blue-1 text-blue-9"
        >
          <q-card class="bg-blue-1 q-pa-md">
            <p class="text-weight-bold text-subtitle1 q-mb-sm">
              {{ t('drugDilution.sections.definition.content.mainDefinition.title') }}
            </p>
            <p class="text-body2 q-mb-md">
              {{ t('drugDilution.sections.definition.content.mainDefinition.text') }}
            </p>
            <p class="text-weight-bold text-subtitle1 q-mb-sm">
              {{ t('drugDilution.sections.definition.content.principles.title') }}
            </p>
            <ul>
              <li
                v-for="(item, idx) in 4"
                :key="idx"
                class="text-body2"
                v-html="t(`drugDilution.sections.definition.content.principles.items[${idx}]`)"
              ></li>
            </ul>
          </q-card>
        </q-expansion-item>

        <!-- SECTION 2-9: Placeholders -->
        <q-expansion-item
          icon="science"
          :label="t('drugDilution.sections.physiology.title')"
          class="q-mb-sm"
          header-class="bg-green-1 text-green-9"
        >
          <q-card class="bg-green-1 q-pa-md">
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.physiology.content.pharmacokinetics.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 4"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(
                      `drugDilution.sections.physiology.content.pharmacokinetics.principles[${idx}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.physiology.content.concentration.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 4"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(
                      `drugDilution.sections.physiology.content.concentration.relationships[${idx}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
            <div>
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.physiology.content.osmolarity.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 4"
                  :key="idx"
                  class="text-body2"
                  v-html="
                    t(`drugDilution.sections.physiology.content.osmolarity.considerations[${idx}]`)
                  "
                ></li>
              </ul>
            </div>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          icon="straighten"
          :label="t('drugDilution.sections.measurement.title')"
          class="q-mb-sm"
          header-class="bg-amber-1 text-amber-9"
        >
          <q-card class="bg-amber-1 q-pa-md">
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.measurement.content.equipment.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 4"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="t(`drugDilution.sections.measurement.content.equipment.items[${idx}]`)"
                ></li>
              </ul>
            </div>
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.measurement.content.asepticTechnique.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 4"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(`drugDilution.sections.measurement.content.asepticTechnique.steps[${idx}]`)
                  "
                ></li>
              </ul>
            </div>
            <div>
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.measurement.content.dilutionProcedure.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 7"
                  :key="idx"
                  class="text-body2"
                  v-html="
                    t(
                      `drugDilution.sections.measurement.content.dilutionProcedure.procedure[${idx}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          icon="functions"
          :label="t('drugDilution.sections.formula.title')"
          class="q-mb-sm"
          header-class="bg-cyan-1 text-cyan-9"
        >
          <q-card class="bg-cyan-1 q-pa-md">
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.formula.content.basicFormulas.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 4"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="t(`drugDilution.sections.formula.content.basicFormulas.formulas[${idx}]`)"
                ></li>
              </ul>
            </div>
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.formula.content.advancedFormulas.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 3"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(`drugDilution.sections.formula.content.advancedFormulas.calculations[${idx}]`)
                  "
                ></li>
              </ul>
            </div>
            <div>
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.formula.content.practicalExample.title') }}
              </p>
              <p class="text-body2 text-italic q-mb-md">
                {{ t('drugDilution.sections.formula.content.practicalExample.scenario') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 4"
                  :key="idx"
                  class="text-body2"
                  v-html="t(`drugDilution.sections.formula.content.practicalExample.steps[${idx}]`)"
                ></li>
              </ul>
            </div>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          icon="psychology"
          :label="t('drugDilution.sections.interpretation.title')"
          class="q-mb-sm"
          header-class="bg-orange-1 text-orange-9"
        >
          <q-card class="bg-orange-1 q-pa-md">
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.interpretation.content.concentrationRanges.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 6"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(
                      `drugDilution.sections.interpretation.content.concentrationRanges.drugs[${idx}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.interpretation.content.verificationChecks.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 6"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(
                      `drugDilution.sections.interpretation.content.verificationChecks.checks[${idx}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
            <div>
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.interpretation.content.clinicalGuidance.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 4"
                  :key="idx"
                  class="text-body2"
                  v-html="
                    t(
                      `drugDilution.sections.interpretation.content.clinicalGuidance.guidance[${idx}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          icon="local_hospital"
          :label="t('drugDilution.sections.applications.title')"
          class="q-mb-sm"
          header-class="bg-purple-1 text-purple-9"
        >
          <q-card class="bg-purple-1 q-pa-md">
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.applications.content.pediatrics.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 5"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(
                      `drugDilution.sections.applications.content.pediatrics.considerations[${idx}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.applications.content.criticalCare.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 5"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(`drugDilution.sections.applications.content.criticalCare.protocols[${idx}]`)
                  "
                ></li>
              </ul>
            </div>
            <div>
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.applications.content.oncology.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 4"
                  :key="idx"
                  class="text-body2"
                  v-html="
                    t(`drugDilution.sections.applications.content.oncology.chemotherapy[${idx}]`)
                  "
                ></li>
              </ul>
            </div>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          icon="warning"
          :label="t('drugDilution.sections.alerts.title')"
          class="q-mb-sm"
          header-class="bg-red-1 text-red-9"
        >
          <q-card class="bg-red-1 q-pa-md">
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.alerts.content.highAlertMedications.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 7"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(
                      `drugDilution.sections.alerts.content.highAlertMedications.categories[${idx}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.alerts.content.criticalConcentrations.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 5"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(`drugDilution.sections.alerts.content.criticalConcentrations.limits[${idx}]`)
                  "
                ></li>
              </ul>
            </div>
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.alerts.content.incompatibilities.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 5"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(`drugDilution.sections.alerts.content.incompatibilities.combinations[${idx}]`)
                  "
                ></li>
              </ul>
            </div>
            <div>
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.alerts.content.emergencyProtocols.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 5"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(`drugDilution.sections.alerts.content.emergencyProtocols.procedures[${idx}]`)
                  "
                ></li>
              </ul>
            </div>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          icon="menu_book"
          :label="t('drugDilution.sections.documentation.title')"
          class="q-mb-sm"
          header-class="bg-indigo-1 text-indigo-9"
        >
          <q-card class="bg-indigo-1 q-pa-md">
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.documentation.content.compatibility.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 5"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(`drugDilution.sections.documentation.content.compatibility.solvents[${idx}]`)
                  "
                ></li>
              </ul>
            </div>
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.documentation.content.stabilityData.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 5"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(
                      `drugDilution.sections.documentation.content.stabilityData.categories[${idx}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
            <div>
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.documentation.content.labeling.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 9"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="
                    t(`drugDilution.sections.documentation.content.labeling.requirements[${idx}]`)
                  "
                ></li>
              </ul>
            </div>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          icon="science"
          :label="t('drugDilution.sections.references.title')"
          class="q-mb-sm"
          header-class="bg-teal-1 text-teal-9"
        >
          <q-card class="bg-teal-1 q-pa-md">
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.references.content.guidelines.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 6"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="t(`drugDilution.sections.references.content.guidelines.list[${idx}]`)"
                ></li>
              </ul>
            </div>
            <div class="q-mb-lg">
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.references.content.research.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 5"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="t(`drugDilution.sections.references.content.research.articles[${idx}]`)"
                ></li>
              </ul>
            </div>
            <div>
              <p class="text-weight-bold text-subtitle1 q-mb-sm">
                {{ t('drugDilution.sections.references.content.onlineTools.title') }}
              </p>
              <ul>
                <li
                  v-for="(item, idx) in 5"
                  :key="idx"
                  class="text-body2 q-mb-sm"
                  v-html="t(`drugDilution.sections.references.content.onlineTools.tools[${idx}]`)"
                ></li>
              </ul>
            </div>
          </q-card>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped lang="scss"></style>
