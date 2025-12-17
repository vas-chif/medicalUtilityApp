<!-- InfusionRate.vue -->

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file InfusionRate.vue
 * @description Bidirectional infusion rate converter for vasopressors and critical care drugs.
 *              Converts between dose units (mcg/kg/min, mg/h) and flow rate (mL/h).
 *              Includes vasopressor presets and therapeutic range warnings.
 *
 * @author Vasile Chifeac
 * @created 2025-11-16
 * @modified 2025-11-16
 *
 * @example
 * <InfusionRate
 *   calculateButtonText="Calcola"
 *   resetButtonText="Reset"
 *   @calculated="handleInfusionCalculated"
 * />
 *
 * @notes
 * - Formula mcg/kg/min → mL/h: (dose × weight × 60) / (concentration × 1000)
 * - Formula mL/h → mcg/kg/min: (flowRate × concentration × 1000) / (weight × 60)
 * - Vasopressor presets: Noradrenaline, Epinephrine, Dopamine, Dobutamine
 * - Therapeutic range warnings for doses <0.01, 0.01-0.5, >0.5, >1 mcg/kg/min
 * - TypeScript strict mode, professional JSDoc, GDPR-compliant logging
 *
 * @medical-references
 * - Surviving Sepsis Campaign 2021 Guidelines - Vasopressor dosing
 * - ESICM (European Society of Intensive Care Medicine) - Hemodynamic monitoring
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
  /** Testo bottone calcola (default: "Calcola") */
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

interface InfusionCalculatedPayload {
  /** Calculated dose value */
  dose: number;
  /** Dose unit */
  doseUnit: string;
  /** Calculated flow rate in mL/h */
  flowRate: number;
  /** Conversion direction */
  direction: 'dose-to-rate' | 'rate-to-dose';
  /** Therapeutic warning (if any) */
  therapeuticWarning: InfusionResult['therapeuticWarning'];
}

const emit = defineEmits<{
  (e: 'calculated', payload: InfusionCalculatedPayload): void;
}>();

// ============================================================
// TYPES & INTERFACES
// ============================================================

/**
 * Infusion Rate Converter - Form data interface
 * @interface InfusionFormData
 */
interface InfusionFormData {
  /** Patient weight in kilograms */
  weight: number | null;
  /** Drug concentration in mg/mL */
  concentration: number | null;
  /** Dose value (unit depends on doseUnit field) */
  dose: number | null;
  /** Flow rate in mL/h */
  flowRate: number | null;
  /** Dose unit: 'mcg/kg/min' | 'mcg/min' | 'mg/h' | 'Units/h' */
  doseUnit: string;
  /** Conversion direction: dose-to-rate or rate-to-dose */
  direction: 'dose-to-rate' | 'rate-to-dose';
}

/**
 * Infusion Rate Converter - Result interface
 * @interface InfusionResult
 */
interface InfusionResult {
  /** Whether calculation has been performed */
  calculated: boolean;
  /** Main calculated value (either dose or flowRate) */
  mainValue: number;
  /** Unit of main value */
  mainUnit: string;
  /** Formatted dose string */
  dose: string;
  /** Formatted flow rate string */
  flowRate: string;
  /** Therapeutic range warning (if applicable) */
  therapeuticWarning: {
    class: string;
    icon: string;
    warningType: 'veryLow' | 'therapeutic' | 'high' | 'veryHigh';
  } | null;
}

/**
 * Vasopressor preset configuration
 * @interface VasopressorPreset
 */
interface VasopressorPreset {
  /** Drug name (short) */
  name: string;
  /** Standard concentration in mg/mL */
  concentration: number;
  /** Minimum therapeutic range */
  rangeMin: number;
  /** Maximum therapeutic range */
  rangeMax: number;
  /** Dose unit (typically mcg/kg/min) */
  unit: string;
}

// ============================================================
// STATE
// ============================================================

const initialInfusionForm: InfusionFormData = {
  weight: null,
  concentration: null,
  dose: null,
  flowRate: null,
  doseUnit: 'mcg/kg/min',
  direction: 'dose-to-rate',
};

const initialInfusionResult: InfusionResult = {
  calculated: false,
  mainValue: 0,
  mainUnit: '',
  dose: '',
  flowRate: '',
  therapeuticWarning: null,
};

const infusionForm = ref<InfusionFormData>({ ...initialInfusionForm });
const infusionResult = ref<InfusionResult>({ ...initialInfusionResult });

// Dose Unit Options
const doseUnitOptions = [
  { label: 'mcg/kg/min', value: 'mcg/kg/min' },
  { label: 'mcg/min', value: 'mcg/min' },
  { label: 'mg/h', value: 'mg/h' },
  { label: 'Units/h', value: 'Units/h' },
];

// Vasopressor Presets
const vasopressorPresets: VasopressorPreset[] = [
  {
    name: 'Norad',
    concentration: 0.016, // 4mg/250mL
    rangeMin: 0.01,
    rangeMax: 3,
    unit: 'mcg/kg/min',
  },
  {
    name: 'Adrenal',
    concentration: 0.016, // 4mg/250mL
    rangeMin: 0.01,
    rangeMax: 1,
    unit: 'mcg/kg/min',
  },
  {
    name: 'Dopam',
    concentration: 1.6, // 400mg/250mL
    rangeMin: 2,
    rangeMax: 20,
    unit: 'mcg/kg/min',
  },
  {
    name: 'Dobut',
    concentration: 1.0, // 250mg/250mL
    rangeMin: 2.5,
    rangeMax: 20,
    unit: 'mcg/kg/min',
  },
];

// ============================================================
// COMPUTED
// ============================================================

/**
 * Validate infusion form inputs
 */
const isInfusionFormValid = computed(() => {
  const form = infusionForm.value;
  const hasWeight = form.weight !== null && form.weight > 0;
  const hasConcentration = form.concentration !== null && form.concentration > 0;

  if (form.direction === 'dose-to-rate') {
    return hasWeight && hasConcentration && form.dose !== null && form.dose > 0;
  } else {
    return hasWeight && hasConcentration && form.flowRate !== null && form.flowRate > 0;
  }
});

// ============================================================
// METHODS
// ============================================================

/**
 * Apply Vasopressor Preset
 * @param preset - Vasopressor preset configuration
 */
const applyPreset = (preset: VasopressorPreset) => {
  infusionForm.value.concentration = preset.concentration;
  infusionForm.value.doseUnit = preset.unit;
  infusionForm.value.direction = 'dose-to-rate';
  logger.debug('Vasopressor preset applied', { name: preset.name });
};

/**
 * Calculate Infusion - Main calculation logic
 */
const calculateInfusion = () => {
  if (!isInfusionFormValid.value) return;

  const form = infusionForm.value;
  let calculatedDose = 0;
  let calculatedFlowRate = 0;

  if (form.direction === 'dose-to-rate') {
    // Dose → mL/h
    calculatedDose = form.dose!;
    calculatedFlowRate = convertDoseToFlowRate(
      calculatedDose,
      form.doseUnit,
      form.weight!,
      form.concentration!,
    );

    infusionResult.value = {
      calculated: true,
      mainValue: calculatedFlowRate,
      mainUnit: 'mL/h',
      dose: `${calculatedDose.toFixed(2)} ${form.doseUnit}`,
      flowRate: `${calculatedFlowRate.toFixed(2)} mL/h`,
      therapeuticWarning: checkTherapeuticRange(calculatedDose, form.doseUnit),
    };
  } else {
    // mL/h → Dose
    calculatedFlowRate = form.flowRate!;
    calculatedDose = convertFlowRateToDose(
      calculatedFlowRate,
      form.doseUnit,
      form.weight!,
      form.concentration!,
    );

    infusionResult.value = {
      calculated: true,
      mainValue: calculatedDose,
      mainUnit: form.doseUnit,
      dose: `${calculatedDose.toFixed(2)} ${form.doseUnit}`,
      flowRate: `${calculatedFlowRate.toFixed(2)} mL/h`,
      therapeuticWarning: checkTherapeuticRange(calculatedDose, form.doseUnit),
    };
  }

  // Emit event
  emit('calculated', {
    dose: calculatedDose,
    doseUnit: form.doseUnit,
    flowRate: calculatedFlowRate,
    direction: form.direction,
    therapeuticWarning: infusionResult.value.therapeuticWarning,
  });

  logger.info('Infusion rate calculated', {
    direction: form.direction,
    dose: `${calculatedDose.toFixed(2)} ${form.doseUnit}`,
    flowRate: `${calculatedFlowRate.toFixed(2)} mL/h`,
  });
};

/**
 * Convert Dose to Flow Rate
 * @param dose - Dose value
 * @param unit - Dose unit
 * @param weight - Patient weight in kg
 * @param concentration - Drug concentration in mg/mL
 * @returns Flow rate in mL/h
 */
const convertDoseToFlowRate = (
  dose: number,
  unit: string,
  weight: number,
  concentration: number,
): number => {
  switch (unit) {
    case 'mcg/kg/min':
      // Formula: mL/h = (dose × weight × 60) / (concentration × 1000)
      return (dose * weight * 60) / (concentration * 1000);
    case 'mcg/min':
      return (dose * 60) / (concentration * 1000);
    case 'mg/h':
      return dose / concentration;
    case 'Units/h':
      return dose / concentration;
    default:
      return 0;
  }
};

/**
 * Convert Flow Rate to Dose
 * @param flowRate - Flow rate in mL/h
 * @param unit - Dose unit
 * @param weight - Patient weight in kg
 * @param concentration - Drug concentration in mg/mL
 * @returns Dose value in specified unit
 */
const convertFlowRateToDose = (
  flowRate: number,
  unit: string,
  weight: number,
  concentration: number,
): number => {
  switch (unit) {
    case 'mcg/kg/min':
      // Reverse formula: dose = (flowRate × concentration × 1000) / (weight × 60)
      return (flowRate * concentration * 1000) / (weight * 60);
    case 'mcg/min':
      return (flowRate * concentration * 1000) / 60;
    case 'mg/h':
      return flowRate * concentration;
    case 'Units/h':
      return flowRate * concentration;
    default:
      return 0;
  }
};

/**
 * Check Therapeutic Range - Validate dose against clinical ranges
 * @param dose - Dose value
 * @param unit - Dose unit
 * @returns Therapeutic warning object or null
 */
const checkTherapeuticRange = (
  dose: number,
  unit: string,
): InfusionResult['therapeuticWarning'] => {
  if (unit !== 'mcg/kg/min') return null;

  // Ranges for common vasopressors
  if (dose < 0.01) {
    return {
      class: 'bg-info text-white',
      icon: 'info',
      warningType: 'veryLow',
    };
  } else if (dose >= 0.01 && dose <= 0.5) {
    return {
      class: 'bg-positive text-white',
      icon: 'check_circle',
      warningType: 'therapeutic',
    };
  } else if (dose > 0.5 && dose <= 1) {
    return {
      class: 'bg-warning text-white',
      icon: 'warning',
      warningType: 'high',
    };
  } else {
    return {
      class: 'bg-negative text-white',
      icon: 'error',
      warningType: 'veryHigh',
    };
  }
};

/**
 * Reset Infusion Form - Clear all inputs and results
 */
const resetInfusionForm = () => {
  infusionForm.value = { ...initialInfusionForm };
  infusionResult.value = { ...initialInfusionResult };
  logger.debug('Infusion form reset');
};
</script>

<template>
  <div class="infusion-rate">
    <!-- Title & Description -->
    <div class="text-h5 text-primary q-mb-md">{{ title || t('infusionRate.title') }}</div>
    <p class="text-body2 text-grey-7 q-mb-lg">
      {{ t('infusionRate.subtitle') }}
    </p>

    <div class="row q-gutter-lg">
      <!-- ====================================================== -->
      <!-- INFUSION INPUT PANEL - Patient & Solution Parameters  -->
      <!-- ====================================================== -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">{{ t('infusionRate.form.sectionTitle') }}</h6>

            <!-- Patient Weight Input -->
            <q-input
              v-model.number="infusionForm.weight"
              type="number"
              step="0.1"
              :label="t('infusionRate.form.weight.label')"
              :suffix="t('infusionRate.form.weight.unit')"
              outlined
              class="q-mb-md"
              :rules="[
                (val: number) =>
                  (val > 0 && val <= 500) || t('infusionRate.form.weight.validation'),
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="fitness_center" color="blue" />
              </template>
            </q-input>

            <!-- Concentrazione Soluzione -->
            <q-input
              v-model.number="infusionForm.concentration"
              type="number"
              step="0.001"
              :label="t('infusionRate.form.concentration.label')"
              :suffix="t('infusionRate.form.concentration.unit')"
              outlined
              class="q-mb-md"
              :hint="t('infusionRate.form.concentration.hint')"
              :rules="[(val: number) => val > 0 || t('infusionRate.form.concentration.validation')]"
            >
              <template v-slot:prepend>
                <q-icon name="science" color="purple" />
              </template>
            </q-input>

            <q-separator class="q-mb-md" />

            <!-- Direzione Conversione -->
            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">{{ t('infusionRate.form.direction.label') }}</div>
              <q-btn-toggle
                v-model="infusionForm.direction"
                spread
                toggle-color="primary"
                :options="[
                  { label: t('infusionRate.form.direction.doseToRate'), value: 'dose-to-rate' },
                  { label: t('infusionRate.form.direction.rateToDose'), value: 'rate-to-dose' },
                ]"
              />
            </div>

            <q-separator class="q-mb-md" />

            <!-- Input Dose (se dose-to-rate) -->
            <div v-if="infusionForm.direction === 'dose-to-rate'">
              <q-input
                v-model.number="infusionForm.dose"
                type="number"
                step="0.01"
                :label="t('infusionRate.form.dose.label')"
                :suffix="infusionForm.doseUnit"
                outlined
                class="q-mb-md"
                :rules="[(val: number) => val > 0 || t('infusionRate.form.dose.validation')]"
              >
                <template v-slot:prepend>
                  <q-icon name="medication" color="red" />
                </template>
              </q-input>

              <!-- Unità Dose -->
              <q-select
                v-model="infusionForm.doseUnit"
                :options="doseUnitOptions"
                :label="t('infusionRate.form.doseUnit.label')"
                outlined
                class="q-mb-md"
                emit-value
                map-options
              >
                <template v-slot:prepend>
                  <q-icon name="straighten" color="green" />
                </template>
              </q-select>
            </div>

            <!-- Input Flow Rate (se rate-to-dose) -->
            <div v-if="infusionForm.direction === 'rate-to-dose'">
              <q-input
                v-model.number="infusionForm.flowRate"
                type="number"
                step="0.1"
                :label="t('infusionRate.form.flowRate.label')"
                :suffix="t('infusionRate.form.flowRate.unit')"
                outlined
                class="q-mb-md"
                :rules="[(val: number) => val > 0 || t('infusionRate.form.flowRate.validation')]"
              >
                <template v-slot:prepend>
                  <q-icon name="speed" color="orange" />
                </template>
              </q-input>

              <!-- Unità Dose Output Desiderata -->
              <q-select
                v-model="infusionForm.doseUnit"
                :options="doseUnitOptions"
                :label="t('infusionRate.form.doseOutputUnit.label')"
                outlined
                class="q-mb-md"
                emit-value
                map-options
              >
                <template v-slot:prepend>
                  <q-icon name="straighten" color="green" />
                </template>
              </q-select>
            </div>

            <!-- Preset Vasopressori -->
            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">{{ t('infusionRate.form.presets.title') }}</div>
              <div class="row q-gutter-sm">
                <q-btn
                  v-for="preset in vasopressorPresets"
                  :key="preset.name"
                  @click="applyPreset(preset)"
                  :label="preset.name"
                  size="sm"
                  outline
                  color="primary"
                  class="col"
                >
                  <q-tooltip>
                    {{ t('infusionRate.form.presets.tooltipConcentration') }}:
                    {{ preset.concentration }} mg/mL<br />
                    {{ t('infusionRate.form.presets.tooltipRange') }}: {{ preset.rangeMin }}-{{
                      preset.rangeMax
                    }}
                    {{ preset.unit }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>

            <!-- Calculate Button -->
            <q-btn
              @click="calculateInfusion"
              color="primary"
              size="lg"
              class="full-width q-mb-sm"
              icon="calculate"
              :disable="!isInfusionFormValid"
            >
              {{ calculateButtonText || t('infusionRate.buttons.calculate') }}
            </q-btn>

            <!-- Reset Button -->
            <q-btn
              @click="resetInfusionForm"
              color="negative"
              size="lg"
              class="full-width"
              icon="refresh"
              outline
            >
              {{ resetButtonText || t('infusionRate.buttons.reset') }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- ====================================================== -->
      <!-- INFUSION RESULTS PANEL                                 -->
      <!-- ====================================================== -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">{{ t('infusionRate.resultsPanel.title') }}</h6>

            <!-- Results Display -->
            <div v-if="infusionResult.calculated">
              <!-- Main Result -->
              <div class="text-center q-mb-lg">
                <div class="text-h3 text-primary q-mb-sm">
                  {{ infusionResult.mainValue.toFixed(2) }}
                </div>
                <div class="text-subtitle1 text-grey-7">
                  <strong>{{ infusionResult.mainUnit }}</strong>
                </div>
              </div>

              <!-- Therapeutic Warning (if any) -->
              <q-banner
                v-if="infusionResult.therapeuticWarning"
                :class="infusionResult.therapeuticWarning.class"
                class="q-mb-md rounded-borders"
              >
                <template v-slot:avatar>
                  <q-icon :name="infusionResult.therapeuticWarning.icon" />
                </template>
                <div class="text-weight-bold">
                  {{
                    t(
                      `infusionRate.therapeuticWarnings.${infusionResult.therapeuticWarning.warningType}.title`,
                    )
                  }}
                </div>
                <div class="text-caption">
                  {{
                    t(
                      `infusionRate.therapeuticWarnings.${infusionResult.therapeuticWarning.warningType}.message`,
                    )
                  }}
                </div>
              </q-banner>

              <q-separator class="q-mb-md" />

              <!-- Conversion Details -->
              <div class="q-mb-md">
                <q-list bordered separator class="rounded-borders">
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>{{
                        t('infusionRate.resultsPanel.details.dose')
                      }}</q-item-label>
                      <q-item-label class="text-h6">{{ infusionResult.dose }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>{{
                        t('infusionRate.resultsPanel.details.flowRate')
                      }}</q-item-label>
                      <q-item-label class="text-h6 text-primary">
                        {{ infusionResult.flowRate }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>{{
                        t('infusionRate.resultsPanel.details.patientWeight')
                      }}</q-item-label>
                      <q-item-label>{{ infusionForm.weight }} kg</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>{{
                        t('infusionRate.resultsPanel.details.solutionConcentration')
                      }}</q-item-label>
                      <q-item-label>{{ infusionForm.concentration }} mg/mL</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- Formula Used -->
              <q-expansion-item
                icon="functions"
                :label="t('infusionRate.formula.title')"
                class="q-mt-md"
              >
                <q-card class="q-pa-md">
                  <div v-if="infusionForm.direction === 'dose-to-rate'">
                    <strong>{{ t('infusionRate.formula.doseToRate.title') }}</strong
                    ><br />
                    <small v-if="infusionForm.doseUnit === 'mcg/kg/min'">
                      {{ t('infusionRate.formula.doseToRate.mcgKgMin') }}
                    </small>
                    <small v-else-if="infusionForm.doseUnit === 'mcg/min'">
                      {{ t('infusionRate.formula.doseToRate.mcgMin') }}
                    </small>
                    <small v-else-if="infusionForm.doseUnit === 'mg/h'">
                      {{ t('infusionRate.formula.doseToRate.mgH') }}
                    </small>
                  </div>
                  <div v-else>
                    <strong>{{ t('infusionRate.formula.rateToDose.title') }}</strong
                    ><br />
                    <small v-if="infusionForm.doseUnit === 'mcg/kg/min'">
                      {{ t('infusionRate.formula.rateToDose.mcgKgMin') }}
                    </small>
                    <small v-else-if="infusionForm.doseUnit === 'mcg/min'">
                      {{ t('infusionRate.formula.rateToDose.mcgMin') }}
                    </small>
                    <small v-else-if="infusionForm.doseUnit === 'mg/h'">
                      {{ t('infusionRate.formula.rateToDose.mgH') }}
                    </small>
                  </div>
                </q-card>
              </q-expansion-item>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center text-grey-6 q-pa-xl">
              <q-icon name="info" size="lg" class="q-mb-md" />
              <p class="text-body2">
                {{ t('infusionRate.emptyState') }}
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Component-specific styles will be added here as needed
</style>
