<!-- MechanicalPowerCalculator.vue -->
<script setup lang="ts">
/**
 * @file MechanicalPowerCalculator.vue
 * @description Componente calcolatore Mechanical Power (estratto da MechanicalPowerPage)
 * @author Vasile Chifeac
 * @created 2025-01-06
 * @modified 2025-12-11 (Added i18n integration + scientific references)
 *
 * Mechanical Power Calculator
 * - Energia trasferita dal ventilatore al polmone (predittore VILI)
 *
 * @references
 * - Gattinoni L et al. (2016) Intensive Care Med 42(10):1567-1575. DOI: 10.1007/s00134-016-4505-2
 * - Serpa Neto A et al. (2018) Crit Care 22(1):267. DOI: 10.1186/s13054-018-2247-y
 * - Cressoni M et al. (2016) Anesthesiology 124(5):1100-1108. DOI: 10.1097/ALN.0000000000001056
 */

import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSecureLogger } from 'src/composables/useSecureLogger';
import { usePersistedMechanicalPower } from 'src/composables/usePersistedCalculator';
// import { useCalculatorStore } from 'src/stores/calculator-store';
import { useSavedCalculations } from 'src/composables/useSavedCalculations';
import SavedCalculations from 'src/components/SavedCalculations.vue';

// ============================================================
// I18N & LOGGER
// ============================================================
const { t } = useI18n({ useScope: 'global' });
const { logger } = useSecureLogger();
// const calculatorStore = useCalculatorStore();

// ============================================================
// SAVED CALCULATIONS
// ============================================================
const { savedCalculations, addSavedCalculation, removeSavedCalculation, createSavedCalculation } =
  useSavedCalculations('mp');

// ============================================================
// PERSISTED STATE (localStorage)
// ============================================================
const mp = usePersistedMechanicalPower();

// Input values (linked to localStorage)
const rr = mp.rr.value; // Respiratory Rate (breaths/min)
const picco = mp.picco.value; // Peak Pressure (cmH2O)
const plateau = mp.plateau.value; // Plateau Pressure (cmH2O)
const peep = mp.peep.value; // PEEP (cmH2O)

/**
 * VTe special case: string for auto-fraction (0.xxx)
 * Persists as number, displays as formatted string
 */
const vte = ref<string>(
  mp.vte.value.value !== null && mp.vte.value.value > 0 ? mp.vte.value.value.toString() : '0.',
);

// Watch VTe to sync with localStorage
watch(vte, (newValue) => {
  const numericValue = parseFloat(newValue) || 0;
  mp.vte.value.value = numericValue;
});

// Result (persisted)
const mechanicalPower = mp.result.value;
const showResult = ref(false);
const errorMessage = ref<string>('');

// Save dialog
const showSaveDialog = ref(false);
const patientInitials = ref('');

// ============================================================
// COMPUTED
// ============================================================
/**
 * Validates all inputs for calculation
 */
const isFormValid = computed(() => {
  const vteValue = parseFloat(vte.value) || 0;
  return (
    rr.value !== null &&
    rr.value > 0 &&
    vteValue > 0 &&
    picco.value !== null &&
    picco.value > 0 &&
    plateau.value !== null &&
    plateau.value > 0 &&
    peep.value !== null &&
    peep.value >= 0
  );
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Handles VTe input with auto-fractioning
 * Example: user types "345" → becomes "0.345"
 */
function handleVteInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/[^0-9]/g, ''); // Remove non-digits

  if (value.length > 3) {
    value = value.slice(0, 3);
  }

  if (value.length === 0) {
    vte.value = '0.';
  } else {
    vte.value = '0.' + value;
  }

  input.value = vte.value;
}

/**
 * Gets VTe numeric value for calculation
 */
function getVteValue(): number {
  return parseFloat(vte.value) || 0;
}

/**
 * Validates all input parameters
 */
function validateInputs(): boolean {
  errorMessage.value = '';

  // Check all fields filled
  if (rr.value === null || picco.value === null || plateau.value === null || peep.value === null) {
    errorMessage.value = t('errors.missingParameters');
    return false;
  }

  const vteValue = getVteValue();
  if (rr.value < 0 || vteValue <= 0 || picco.value < 0 || plateau.value < 0 || peep.value < 0) {
    errorMessage.value = t('validation.noNegativeNumbers');
    logger.warn('⚠️ Negative value detected', {
      rr: rr.value,
      vte: vteValue,
      picco: picco.value,
      plateau: plateau.value,
      peep: peep.value,
    });
    return false;
  }

  if (rr.value === 0 || vteValue === 0 || picco.value === 0 || plateau.value === 0) {
    errorMessage.value = t('validation.mustBePositive');
    return false;
  }

  // Physiological ranges
  if (rr.value > 99) {
    errorMessage.value = `${t('validation.outOfRange')}: RR max 99 ${t('calculators.mechanicalPower.rrUnit')}`;
    return false;
  }

  if (vteValue > 2) {
    errorMessage.value = `${t('validation.outOfRange')}: VTe > 2L`;
    return false;
  }

  if (picco.value > 99 || plateau.value > 99 || peep.value > 99) {
    errorMessage.value = `${t('validation.outOfRange')}: Pressure max 99 cmH₂O`;
    return false;
  }

  // Optional physiological validations
  // Uncomment and implement calculatorStore if needed for physiological validations
  // Example physiological checks (currently disabled):
  // - Plateau pressure should be less than peak pressure
  // - PEEP should be less than plateau pressure

  return true;
}

/**
 * Calculates mechanical power using standard formula
 * MP = 0.098 × RR × VTe × (Picco - 0.5 × (Plateau - PEEP))
 */
function calculateMP(): void {
  const vteNumeric = getVteValue();
  logger.debug('🔍 MP calculation started', {
    rr: rr.value,
    vte: vteNumeric,
    picco: picco.value,
    plateau: plateau.value,
    peep: peep.value,
  });

  if (!validateInputs()) {
    logger.warn('⚠️ MP validation failed', { error: errorMessage.value });
    showResult.value = false;
    return;
  }

  const rrValue = rr.value!;
  const vteValue = vteNumeric;
  const piccoValue = picco.value!;
  const plateauValue = plateau.value!;
  const peepValue = peep.value!;

  const mp = 0.098 * rrValue * vteValue * (piccoValue - 0.5 * (plateauValue - peepValue));
  mechanicalPower.value = Math.round(mp * 100) / 100;
  showResult.value = true;
  errorMessage.value = '';

  const status =
    mechanicalPower.value < 12 ? 'NORMAL' : mechanicalPower.value <= 15 ? 'WARNING' : 'CRITICAL';
  logger.info(`✅ MP calculation completed - Status: ${status}`, {
    result: mechanicalPower.value,
    status,
    inputs: {
      rr: rrValue,
      vte: vteValue,
      picco: piccoValue,
      plateau: plateauValue,
      peep: peepValue,
    },
  });

  if (status === 'CRITICAL') {
    logger.warn('🚨 CRITICAL MP value (>15)!', { mp: mechanicalPower.value });
  }
}

/**
 * Opens save dialog
 */
function saveCalculation(): void {
  if (!showResult.value || mechanicalPower.value === 0) {
    logger.warn('⚠️ Save attempted without valid result');
    return;
  }
  showSaveDialog.value = true;
  logger.info('💾 Save dialog opened');
}

/**
 * Confirms and saves calculation
 */
function confirmSave(): void {
  const trimmed = patientInitials.value.trim();

  if (trimmed.length === 0) {
    logger.warn('⚠️ Empty patient initials');
    return;
  }

  const calculation = createSavedCalculation(trimmed, mechanicalPower.value ?? 0);
  addSavedCalculation(calculation);

  showSaveDialog.value = false;
  patientInitials.value = '';

  logger.info(`✅ Calculation saved: ${calculation.initials} - ${calculation.result} J/min`);
}

/**
 * Resets all fields and clears localStorage
 */
function resetForm(): void {
  logger.info('🔄 MP Calculator full reset (localStorage cleared)');

  mp.resetAll();
  vte.value = '0.';
  showResult.value = false;
  errorMessage.value = '';
}

/**
 * @function getInterpretation
 * @description Returns MP interpretation based on thresholds
 * @returns {string} Interpretation text
 */
const getInterpretation = (): string => {
  const mp = mechanicalPower.value ?? 0;
  if (mp === 0) return t('mp.results.noCalculation');
  if (mp < 12) return t('mp.results.safe');
  if (mp <= 17) return t('mp.results.attention');
  return t('mp.results.dangerous');
};

/**
 * @function getInterpretationColor
 * @description Returns Quasar color for interpretation
 * @returns {string} Quasar color name
 */
const getInterpretationColor = (): string => {
  const mp = mechanicalPower.value ?? 0;
  if (mp === 0) return 'grey';
  if (mp < 12) return 'green';
  if (mp <= 17) return 'orange';
  return 'red';
};
</script>

<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-orange-1 text-orange-9 q-mb-md" rounded>
      <template v-slot:avatar>
        <q-icon name="warning" color="orange" />
      </template>
      <div class="text-body2">
        <strong>{{ t('mp.banner.title') }}</strong> {{ t('mp.banner.description') }}
      </div>
    </q-banner>

    <div class="row justify-center q-gutter-md">
      <!-- Pannello Input - Centrato -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="edit" class="q-mr-xs" />
              {{ t('mp.titles.ventilatorParameters') }}
            </div>

            <!-- RR -->
            <q-input
              v-model.number="rr"
              type="number"
              :label="t('mp.parameters.rr.label')"
              :suffix="t('mp.parameters.rr.unit')"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="speed" color="blue" size="sm" />
              </template>
            </q-input>

            <!-- VTe -->
            <q-input
              v-model="vte"
              @input="handleVteInput"
              inputmode="numeric"
              :label="t('mp.parameters.vte.label')"
              :suffix="t('mp.parameters.vte.unit')"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="green" size="sm" />
              </template>
            </q-input>

            <!-- P.Picco -->
            <q-input
              v-model.number="picco"
              type="number"
              :label="t('mp.parameters.picco.label')"
              :suffix="t('mp.parameters.picco.unit')"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="trending_up" color="orange" size="sm" />
              </template>
            </q-input>

            <!-- P.Plateau -->
            <q-input
              v-model.number="plateau"
              type="number"
              :label="t('mp.parameters.plateau.label')"
              :suffix="t('mp.parameters.plateau.unit')"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="horizontal_rule" color="purple" size="sm" />
              </template>
            </q-input>

            <!-- PEEP -->
            <q-input
              v-model.number="peep"
              type="number"
              :label="t('mp.parameters.peep.label')"
              :suffix="t('mp.parameters.peep.unit')"
              outlined
              dense
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="trending_down" color="red" size="sm" />
              </template>
            </q-input>

            <!-- Error Banner -->
            <q-banner v-if="errorMessage" dense rounded class="bg-negative text-white q-mb-md">
              <template v-slot:avatar>
                <q-icon name="warning" color="white" />
              </template>
              {{ errorMessage }}
            </q-banner>

            <!-- Bottoni -->
            <div class="row no-wrap q-gutter-xs justify-center">
              <q-btn
                @click="calculateMP"
                color="primary"
                :size="$q.screen.xs ? 'xs' : 'md'"
                class="full-width q-pa-xs"
                icon="calculate"
                :disable="!isFormValid"
              >
                {{ t('mp.actions.calculate') }}
              </q-btn>
              <q-space />
              <q-btn
                @click="saveCalculation"
                color="positive"
                :size="$q.screen.xs ? 'xs' : 'md'"
                class="full-width q-pa-xs"
                icon="save"
                :disable="!showResult || mechanicalPower === 0"
                outline
              >
                {{ t('mp.actions.save') }}
              </q-btn>
              <q-space />
              <q-btn
                @click="resetForm"
                color="negative"
                :size="$q.screen.xs ? 'xs' : 'md'"
                class="full-width q-pa-xs"
                icon="refresh"
                outline
              >
                {{ t('mp.actions.reset') }}
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Pannello Risultati - Full Width sotto parametri -->
    <div class="row q-mt-md">
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="speed" class="q-mr-xs" />
              {{ t('mp.titles.results') }}
            </div>

            <!-- Risultato -->
            <div v-if="showResult" class="text-center q-mb-md">
              <div class="text-h3 text-primary">
                {{ mechanicalPower.toFixed(2) }}
              </div>
              <div class="text-h6 text-grey-7">{{ t('mp.results.unit') }}</div>
            </div>

            <!-- Interpretazione -->
            <div v-if="showResult" class="q-mb-sm row justify-center">
              <q-chip
                :color="getInterpretationColor()"
                text-color="white"
                class="text-h6 q-pa-xs"
                style="min-width: 300px"
              >
                {{ getInterpretation() }}
              </q-chip>
            </div>

            <!-- Saved Calculations Component -->
            <SavedCalculations
              calculator-type="mp"
              :calculations="savedCalculations"
              @remove="removeSavedCalculation"
            />

            <!-- 📊 Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              :label="t('mp.definition.title')"
              class="q-mt-md"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-none">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  {{ t('mp.definition.mainTitle') }}
                </div>

                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.definition.physicalDef.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.definition.physicalDef.text')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-grey-7">
                        <div v-html="t('mp.definition.physicalDef.formula')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs q-mt-md">
                  {{ t('mp.definition.clinicalSignificance.title') }}
                </div>
                <q-list>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="coronavirus" color="red" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.definition.clinicalSignificance.viliPredictor.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div
                          v-html="t('mp.definition.clinicalSignificance.viliPredictor.text')"
                        ></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_up" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.definition.clinicalSignificance.prognosticValue.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div
                          v-html="t('mp.definition.clinicalSignificance.prognosticValue.text')"
                        ></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="tune" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.definition.clinicalSignificance.optimization.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div
                          v-html="t('mp.definition.clinicalSignificance.optimization.text')"
                        ></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="compare_arrows" color="purple" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.definition.clinicalSignificance.comparison.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.definition.clinicalSignificance.comparison.text')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="biotech" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.definition.clinicalSignificance.biomarkers.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.definition.clinicalSignificance.biomarkers.text')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner class="bg-blue-1 text-blue-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="lightbulb" color="blue" />
                  </template>
                  <div class="text-caption">
                    <div v-html="t('mp.definition.keyConcept.text')"></div>
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 🔬 Fisiologia e Meccanismi di Danno Polmonare (VILI) -->
            <q-expansion-item
              icon="science"
              :label="t('mp.physiology.title')"
              class="q-mt-md"
              header-class="bg-green-1 text-green-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  {{ t('mp.physiology.mainTitle') }}
                </div>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('mp.physiology.mechanicsTitle') }}
                </div>
                <q-list class="q-mb-md">
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        <div v-html="t('mp.physiology.healthyLung')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.physiology.ardsLung')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs text-red-9">
                  {{ t('mp.physiology.viliMechanismsTitle') }}
                </div>

                <q-list bordered class="q-mb-md">
                  <q-item class="bg-red-1">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-red-9">
                        {{ t('mp.physiology.volutrauma.title') }}
                      </q-item-label>
                      <q-item-label caption>
                        <div v-html="t('mp.physiology.volutrauma.text')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.physiology.volutrauma.mechanicalStrain')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.physiology.volutrauma.clinicalTarget')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-orange-1 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-orange-9">
                        {{ t('mp.physiology.barotrauma.title') }}
                      </q-item-label>
                      <q-item-label caption>
                        <div v-html="t('mp.physiology.barotrauma.text')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.physiology.barotrauma.drivingPressure')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.physiology.barotrauma.clinicalTarget')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-purple-1 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-purple-9">
                        {{ t('mp.physiology.atelectrauma.title') }}
                      </q-item-label>
                      <q-item-label caption>
                        <div v-html="t('mp.physiology.atelectrauma.text')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.physiology.atelectrauma.peepRole')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.physiology.atelectrauma.clinicalTarget')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-amber-2 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-amber-9">
                        {{ t('mp.physiology.biotrauma.title') }}
                      </q-item-label>
                      <q-item-label caption>
                        <div v-html="t('mp.physiology.biotrauma.text')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.physiology.biotrauma.mechanotransduction')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.physiology.biotrauma.clinicalTarget')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('mp.physiology.unifyingParameterTitle') }}
                </div>
                <q-banner class="bg-indigo-1 text-indigo-9">
                  <template v-slot:avatar>
                    <q-icon name="calculate" color="indigo" />
                  </template>
                  <div class="text-caption">
                    <div v-html="t('mp.physiology.unifyingParameterText')"></div>
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 📏 Come si Misura il Mechanical Power -->
            <q-expansion-item
              icon="straighten"
              :label="t('mp.measurement.title')"
              class="q-mt-md"
              header-class="bg-amber-1 text-amber-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  {{ t('mp.measurement.mainTitle') }}
                </div>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('mp.measurement.intro') }}
                </div>
                <q-list class="q-mb-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="speed" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.measurement.rr.title') }}
                      </q-item-label>
                      <q-item-label caption>
                        <div v-html="t('mp.measurement.rr.definition')"></div>
                        <div v-html="t('mp.measurement.rr.measurement')" class="q-mt-xs"></div>
                        <div v-html="t('mp.measurement.rr.normalRange')" class="q-mt-xs"></div>
                        <div v-html="t('mp.measurement.rr.clinicalNote')" class="q-mt-xs"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="air" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.measurement.vt.title') }}
                      </q-item-label>
                      <q-item-label caption>
                        <div v-html="t('mp.measurement.vt.definition')"></div>
                        <div v-html="t('mp.measurement.vt.measurement')" class="q-mt-xs"></div>
                        <div v-html="t('mp.measurement.vt.normalRange')" class="q-mt-xs"></div>
                        <div v-html="t('mp.measurement.vt.clinicalNote')" class="q-mt-xs"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="compress" color="purple" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.measurement.ppeak.title') }}
                      </q-item-label>
                      <q-item-label caption>
                        <div v-html="t('mp.measurement.ppeak.definition')"></div>
                        <div v-html="t('mp.measurement.ppeak.measurement')" class="q-mt-xs"></div>
                        <div v-html="t('mp.measurement.ppeak.normalRange')" class="q-mt-xs"></div>
                        <div v-html="t('mp.measurement.ppeak.clinicalNote')" class="q-mt-xs"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="pause" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.measurement.pplateau.title') }}
                      </q-item-label>
                      <q-item-label caption>
                        <div v-html="t('mp.measurement.pplateau.definition')"></div>
                        <div
                          v-html="t('mp.measurement.pplateau.measurement')"
                          class="q-mt-xs"
                        ></div>
                        <div
                          v-html="t('mp.measurement.pplateau.normalRange')"
                          class="q-mt-xs"
                        ></div>
                        <div
                          v-html="t('mp.measurement.pplateau.clinicalNote')"
                          class="q-mt-xs"
                        ></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_down" color="green" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.measurement.peep.title') }}
                      </q-item-label>
                      <q-item-label caption>
                        <div v-html="t('mp.measurement.peep.definition')"></div>
                        <div v-html="t('mp.measurement.peep.measurement')" class="q-mt-xs"></div>
                        <div v-html="t('mp.measurement.peep.normalRange')" class="q-mt-xs"></div>
                        <div v-html="t('mp.measurement.peep.clinicalNote')" class="q-mt-xs"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs q-mt-md">
                  {{ t('mp.measurement.methods.title') }}
                </div>
                <q-list bordered class="q-mb-md bg-grey-1">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="monitor" color="indigo" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.measurement.methods.direct.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.measurement.methods.direct.text')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="calculate" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.measurement.methods.automatic.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.measurement.methods.automatic.text')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="integration_instructions" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ t('mp.measurement.methods.integration.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.measurement.methods.integration.text')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner class="bg-amber-1 text-amber-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="warning" color="amber-9" />
                  </template>
                  <div class="text-caption">
                    <strong>{{ t('mp.measurement.practicalConsiderations.title') }}</strong> (1)
                    <div
                      v-html="t('mp.measurement.practicalConsiderations.breathVariability')"
                    ></div>
                    (2)
                    <div v-html="t('mp.measurement.practicalConsiderations.peepIntrinsic')"></div>
                    (3)
                    <div v-html="t('mp.measurement.practicalConsiderations.chestWall')"></div>
                    (4)
                    <div v-html="t('mp.measurement.practicalConsiderations.formulaAccuracy')"></div>
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 🎯 Interpretazione Clinica Dettagliata -->
            <q-expansion-item
              icon="warning"
              :label="t('mp.interpretation.title')"
              default-opened
              class="q-mt-md"
              header-class="bg-orange-1 text-orange-9"
            >
              <q-list class="bg-grey-1">
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="green" name="check_circle" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <div v-html="t('mp.interpretation.greenZone.title')"></div>
                    </q-item-label>
                    <q-item-label caption>
                      <div v-html="t('mp.interpretation.greenZone.risk')" class="q-mt-xs"></div>
                      <div
                        v-html="t('mp.interpretation.greenZone.mortality')"
                        class="q-mt-xs"
                      ></div>
                      <div v-html="t('mp.interpretation.greenZone.meaning')" class="q-mt-xs"></div>
                      <div
                        v-html="t('mp.interpretation.greenZone.clinicalAction')"
                        class="q-mt-xs"
                      ></div>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon color="orange" name="warning" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <div v-html="t('mp.interpretation.orangeZone.title')"></div>
                    </q-item-label>
                    <q-item-label caption>
                      <div v-html="t('mp.interpretation.orangeZone.risk')" class="q-mt-xs"></div>
                      <div
                        v-html="t('mp.interpretation.orangeZone.mortality')"
                        class="q-mt-xs"
                      ></div>
                      <div v-html="t('mp.interpretation.orangeZone.meaning')" class="q-mt-xs"></div>
                      <div
                        v-html="t('mp.interpretation.orangeZone.clinicalAction')"
                        class="q-mt-xs"
                      ></div>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon color="red" name="dangerous" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <div v-html="t('mp.interpretation.redZone.title')"></div>
                    </q-item-label>
                    <q-item-label caption>
                      <div v-html="t('mp.interpretation.redZone.risk')" class="q-mt-xs"></div>
                      <div v-html="t('mp.interpretation.redZone.mortality')" class="q-mt-xs"></div>
                      <div v-html="t('mp.interpretation.redZone.meaning')" class="q-mt-xs"></div>
                      <div
                        v-html="t('mp.interpretation.redZone.clinicalAction')"
                        class="q-mt-xs"
                      ></div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>

            <!-- 🧮 Formula Dettagliata -->
            <q-expansion-item
              icon="functions"
              :label="t('mp.formula.title')"
              class="q-mt-md"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm text-center">
                  {{ t('mp.formula.headerTitle') }}
                </div>

                <div class="bg-primary text-white q-pa-sm q-mb-sm">
                  <div class="text-body1 text-center">
                    MP = 0.098 × RR × VT<sub>e</sub> × (P<sub>picco</sub> - 0.5 × ΔP)
                  </div>
                </div>

                <div class="text-caption text-grey-8 q-mb-sm">
                  <strong>{{ t('mp.formula.breakdownTitle') }}</strong>
                </div>

                <q-list class="q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="blue" text-color="white">RR</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>{{ t('mp.formula.rr.title') }}</strong>
                        {{ t('mp.formula.rr.text') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="green" text-color="white">VTe</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>{{ t('mp.formula.vte.title') }}</strong>
                        {{ t('mp.formula.vte.text') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="orange" text-color="white">P<sub>picco</sub></q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>{{ t('mp.formula.ppeak.title') }}</strong>
                        <div v-html="t('mp.formula.ppeak.text')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="purple" text-color="white">ΔP</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>{{ t('mp.formula.deltaPressure.title') }}</strong>
                        <div v-html="t('mp.formula.deltaPressure.text')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="grey-7" text-color="white">0.098</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>{{ t('mp.formula.coefficient.title') }}</strong
                        >{{ t('mp.formula.coefficient.text') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('mp.formula.exampleTitle') }}
                </div>

                <div class="bg-white q-pa-sm q-mb-xs">
                  <div class="text-caption text-grey-8">
                    <strong>{{ t('mp.formula.exampleScenario') }}</strong>
                  </div>
                  <q-list class="q-pl-md">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>{{ t('mp.formula.exampleParams.rr') }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption
                          ><div v-html="t('mp.formula.exampleParams.vte')"></div
                        ></q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption
                          ><div v-html="t('mp.formula.exampleParams.ppeak')"></div
                        ></q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption
                          ><div v-html="t('mp.formula.exampleParams.pplateau')"></div
                        ></q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>{{
                          t('mp.formula.exampleParams.peep')
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>

                  <div class="text-caption text-grey-8 q-mt-xs">
                    <strong>Step 1</strong>:
                    <div v-html="t('mp.formula.exampleSteps.step1')"></div>
                  </div>
                  <div class="text-caption text-grey-8">
                    <strong>Step 2</strong>: {{ t('mp.formula.exampleSteps.step2') }}
                  </div>
                  <div class="text-caption text-grey-8">
                    <strong>Step 3</strong>: {{ t('mp.formula.exampleSteps.step3') }}
                  </div>
                  <div class="text-caption text-grey-8">
                    <strong>Step 4</strong>: {{ t('mp.formula.exampleSteps.step4') }}
                  </div>
                  <div class="text-caption text-grey-8 text-weight-bold">
                    <strong>Risultato</strong>:
                    <div v-html="t('mp.formula.exampleSteps.result')"></div>
                  </div>
                </div>

                <div class="text-caption text-grey-7 q-mt-sm">
                  <div v-html="t('mp.formula.exampleAction')"></div>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 🔬 Analisi Dettagliata e Applicazioni Cliniche -->
            <q-expansion-item
              icon="science"
              :label="t('mp.applications.title')"
              class="q-mt-md"
              header-class="bg-purple-1 text-purple-9"
            >
              <q-card class="q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('mp.applications.clinicalUseTitle') }}
                </div>
                <q-separator class="q-my-md" />

                <!-- Ventilazione Protettiva vs Dannosa -->
                <div class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('mp.applications.protectiveVsHarmfulTitle') }}
                </div>

                <div class="text-body2 text-weight-bold text-positive q-mb-sm">
                  {{ t('mp.applications.protective.title') }}
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  {{ t('mp.applications.protective.intro') }}
                </div>
                <q-list class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.protective.tidalVolume')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.protective.drivingPressure')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.protective.plateauPressure')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.protective.peepOptimal')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.protective.permissiveHypercapnia')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold text-negative q-mb-sm">
                  {{ t('mp.applications.harmful.title') }}
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  {{ t('mp.applications.harmful.intro') }}
                </div>
                <q-list class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.harmful.tidalVolumeHigh')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.harmful.drivingPressureHigh')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.harmful.respiratoryRateHigh')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.harmful.peepInadequate')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.harmful.inflammatoryResponse')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-caption text-grey-7">
                  <div v-html="t('mp.applications.keyConcept')"></div>
                </div>

                <!-- ARDS/ALI -->
                <div class="text-body2 text-weight-bold text-primary q-mb-xs">
                  {{ t('mp.applications.ards.title') }}
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <div v-html="t('mp.applications.ards.context')"></div>
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <div v-html="t('mp.applications.ards.targetMP')"></div>
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <div v-html="t('mp.applications.ards.strategyTitle')"></div>
                </div>
                <q-list class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.ards.vt') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.ards.pplateau') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.ards.drivingPressure') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.ards.hypercapnia') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.ards.peep') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <!-- Svezzamento -->
                <div class="text-body2 text-weight-bold text-primary q-mb-xs">
                  {{ t('mp.applications.weaning.title') }}
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <div v-html="t('mp.applications.weaning.context')"></div>
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <div v-html="t('mp.applications.weaning.indicatorsTitle')"></div>
                </div>
                <q-list class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_down" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.weaning.mpReduction') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_down" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.weaning.rrReduction') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_down" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.weaning.complianceImprovement') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="text-caption text-grey-8 q-mb-sm">
                  <div v-html="t('mp.applications.weaning.protocol')"></div>
                </div>

                <q-separator class="q-my-sm" />

                <!-- Monitoraggio Continuo -->
                <div class="text-body2 text-weight-bold text-primary q-mb-xs">
                  {{ t('mp.applications.monitoring.title') }}
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  {{ t('mp.applications.monitoring.intro') }}
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <div v-html="t('mp.applications.monitoring.whenTitle')"></div>
                </div>
                <q-list class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.monitoring.afterChanges') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.monitoring.oxygenation') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.monitoring.pressures') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('mp.applications.monitoring.maneuvers') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="text-caption text-grey-8 q-mb-sm">
                  <div v-html="t('mp.applications.monitoring.integration')"></div>
                </div>

                <q-separator class="q-my-sm" />

                <!-- Limitazioni -->
                <div class="text-body2 text-weight-bold text-negative q-mb-xs">
                  {{ t('mp.applications.limitations.title') }}
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  {{ t('mp.applications.limitations.intro') }}
                </div>
                <q-list class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.limitations.notNormalized')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.limitations.linearityAssumption')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.limitations.regionalHeterogeneity')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.limitations.empiricalThresholds')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-caption text-grey-7">
                  <div v-html="t('mp.applications.futurePerspectives')"></div>
                </div>

                <q-separator class="q-my-sm" />

                <!-- Riferimenti -->
                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('mp.applications.scientificReferences.title') }}
                </div>
                <q-list class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.scientificReferences.gattinoni')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.scientificReferences.amato')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.scientificReferences.encyclopedia1')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('mp.applications.scientificReferences.encyclopedia2')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </q-expansion-item>

            <!-- ⚠️ Valori di Riferimento e Alert Critici -->
            <q-expansion-item
              icon="warning"
              :label="t('mp.referenceValues.title')"
              class="q-mt-md"
              header-class="bg-red-1 text-red-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  {{ t('mp.referenceValues.mainTitle') }}
                </div>

                <q-list bordered class="q-mb-md">
                  <q-item class="bg-green-1">
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="green" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-green-9">
                        {{ t('mp.referenceValues.greenZone.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.referenceValues.greenZone.meaning')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-green-10">
                        <div v-html="t('mp.referenceValues.greenZone.action')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-blue-1 q-mt-sm">
                    <q-item-section avatar>
                      <q-icon name="info" color="blue" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-blue-9">
                        {{ t('mp.referenceValues.blueZone.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.referenceValues.blueZone.meaning')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-blue-10">
                        <div v-html="t('mp.referenceValues.blueZone.action')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-orange-2 q-mt-sm">
                    <q-item-section avatar>
                      <q-icon name="report_problem" color="orange" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-orange-9">
                        {{ t('mp.referenceValues.orangeZone.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.referenceValues.orangeZone.meaning')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-orange-10">
                        <div v-html="t('mp.referenceValues.orangeZone.action')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-red-2 q-mt-sm">
                    <q-item-section avatar>
                      <q-icon name="emergency" color="red" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-red-9">
                        {{ t('mp.referenceValues.redZone.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.referenceValues.redZone.meaning')"></div>
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-red-10">
                        <div v-html="t('mp.referenceValues.redZone.action')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs q-mt-md">
                  {{ t('mp.referenceValues.normalization.title') }}
                </div>
                <q-banner class="bg-indigo-1 text-indigo-9 q-mb-md">
                  <template v-slot:avatar>
                    <q-icon name="calculate" color="indigo" />
                  </template>
                  <div class="text-caption">
                    <div v-html="t('mp.referenceValues.normalization.text')"></div>
                  </div>
                </q-banner>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('mp.referenceValues.scientificEvidence.title') }}
                </div>
                <q-list class="bg-grey-1">
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        <div v-html="t('mp.referenceValues.scientificEvidence.serpa')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        <div v-html="t('mp.referenceValues.scientificEvidence.coppola')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </q-expansion-item>

            <!-- 📚 Documentazione Medica Scientifica -->
            <q-expansion-item
              icon="menu_book"
              :label="t('mp.documentation.title')"
              class="q-mt-md"
              header-class="bg-indigo-1 text-indigo-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  {{ t('mp.documentation.mainTitle') }}
                </div>

                <q-list>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.documentation.ardsNetwork.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.documentation.ardsNetwork.study')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('mp.documentation.ardsNetwork.pmid') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.documentation.drivingPressure.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.documentation.drivingPressure.study')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('mp.documentation.drivingPressure.pmid') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.documentation.proseva.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.documentation.proseva.study')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('mp.documentation.proseva.pmid') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.documentation.eolia.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.documentation.eolia.study')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('mp.documentation.eolia.pmid') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="book" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.documentation.survivingSepsis.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.documentation.survivingSepsis.recommendations')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('mp.documentation.survivingSepsis.source') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner class="bg-amber-1 text-amber-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="info" color="amber-9" />
                  </template>
                  <div class="text-caption">
                    <strong>{{ t('mp.documentation.currentStatus.title') }}</strong>
                    {{ t('mp.documentation.currentStatus.text') }}
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 📖 Riferimenti Scientifici e Bibliografia -->
            <q-expansion-item
              icon="import_contacts"
              :label="t('mp.bibliography.title')"
              class="q-mt-md"
              header-class="bg-teal-1 text-teal-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  {{ t('mp.bibliography.mainTitle') }}
                </div>

                <q-list>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.bibliography.gattinoni.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.bibliography.gattinoni.journal')"></div>
                        <br />
                        <div v-html="t('mp.bibliography.gattinoni.links')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <div v-html="t('mp.bibliography.gattinoni.description')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.bibliography.serpa.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.bibliography.serpa.journal')"></div>
                        <br />
                        <div v-html="t('mp.bibliography.serpa.links')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <div v-html="t('mp.bibliography.serpa.description')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.bibliography.coppola.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.bibliography.coppola.journal')"></div>
                        <br />
                        <div v-html="t('mp.bibliography.coppola.links')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <div v-html="t('mp.bibliography.coppola.description')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.bibliography.zhang.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.bibliography.zhang.journal')"></div>
                        <br />
                        <div v-html="t('mp.bibliography.zhang.links')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <div v-html="t('mp.bibliography.zhang.description')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.bibliography.arma.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <div v-html="t('mp.bibliography.arma.journal')"></div>
                        <br />
                        <div v-html="t('mp.bibliography.arma.links')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <div v-html="t('mp.bibliography.arma.description')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="book" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.bibliography.encyclopedia.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        {{ t('mp.bibliography.encyclopedia.subtitle') }}<br />
                        <div v-html="t('mp.bibliography.encyclopedia.link')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <div v-html="t('mp.bibliography.encyclopedia.description')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="book" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('mp.bibliography.msd.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        {{ t('mp.bibliography.msd.subtitle') }}<br />
                        <div v-html="t('mp.bibliography.msd.link')"></div>
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <div v-html="t('mp.bibliography.msd.description')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner class="bg-indigo-1 text-indigo-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="verified" color="indigo" />
                  </template>
                  <div class="text-caption">
                    <strong>{{ t('mp.bibliography.sourceQuality.title') }}</strong>
                    {{ t('mp.bibliography.sourceQuality.text') }}
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Save Calculation Dialog -->
    <q-dialog v-model="showSaveDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ t('mp.saved.title') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="patientInitials"
            :label="t('mp.saved.patientInitials')"
            outlined
            dense
            autofocus
            @keyup.enter="confirmSave"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="t('mp.actions.cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="t('mp.actions.save')"
            color="primary"
            @click="confirmSave"
            :disable="patientInitials.trim().length === 0"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped lang="scss">
// Responsive font sizes for Results section on desktop
@media (min-width: 1024px) {
  .text-h3 {
    font-size: 4rem !important;
  }

  .text-h6 {
    font-size: 1.5rem !important;
  }

  .q-chip.text-h6 {
    font-size: 1.25rem !important;
    padding: 16px 24px !important;
  }
}
</style>
