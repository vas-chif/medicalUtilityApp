<!-- QuozienteRespiratorioCalculator.vue -->

<script setup lang="ts">
/**
 * @file QuozienteRespiratorioCalculator.vue
 * @description Componente calcolatore Quoziente Respiratorio (RQ = VCO₂/VO₂)
 * @author Vasile Chifeac
 * @created 2025-01-06
 * @modified 2025-12-12
 *
 * @description Respiratory Quotient Calculator - Indicatore metabolico del tipo di substrato energetico utilizzato
 */

import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSecureLogger } from 'src/composables/useSecureLogger';
// import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';
import { usePersistedRespiratoryQuotient } from 'src/composables/usePersistedCalculator';
import { useSavedCalculations } from 'src/composables/useSavedCalculations';
import SavedCalculations from 'src/components/SavedCalculations.vue';

// i18n
const { t } = useI18n({ useScope: 'global' });

// Secure Logger
const { logger } = useSecureLogger();

// Smart Environment
// const { isDevelopment } = useSmartEnvironment();

// Salvataggio Calcoli QR
const { savedCalculations, addSavedCalculation, removeSavedCalculation, createSavedCalculation } =
  useSavedCalculations('qr');

/**
 * Persistenza Dati QR Calculator
 * - 7 campi persistiti in localStorage
 * - Auto-save ogni modifica
 * - Reset esplicito con button
 * - Dati sopravvivono a navigazioni
 */
const qr = usePersistedRespiratoryQuotient();

// Input values persistiti (collegati a localStorage)
const PvCO2 = qr.pvco2.value;
const PaCO2 = qr.paco2.value;
const HB = qr.hb.value;
const SaO2 = qr.sao2.value;
const SvO2 = qr.svo2.value;
const PaO2 = qr.pao2.value;
const PvO2 = qr.pvo2.value;

// Result (persistito in localStorage)
const result = qr.result.value;
const showResult = ref(false);

// Dialog Salvataggio
// Dialog Salvataggio
const showSaveDialog = ref(false);
const patientInitials = ref('');

// ============================================================
// CONSTANTS
// ============================================================
const MEDICAL_CONSTANTS = {
  HB_O2_BINDING: 1.36, // ml O₂/g Hb - Hüfner constant
  O2_SOLUBILITY: 0.003, // ml O₂/mmHg/dL
} as const;

const RQ_THRESHOLDS = {
  FAT_OXIDATION: 0.7,
  MIXED_DIET_MIN: 0.8,
  MIXED_DIET_MAX: 0.85,
  CARB_OXIDATION: 1.0,
  ANAEROBIC_THRESHOLD: 1.0,
  SHOCK_THRESHOLD: 1.2,
} as const;

// ============================================================
// COMPUTED
// ============================================================
const isFormValid = computed(() => {
  return (
    PvCO2.value !== null &&
    PaCO2.value !== null &&
    HB.value !== null &&
    SaO2.value !== null &&
    SvO2.value !== null &&
    PaO2.value !== null &&
    PvO2.value !== null &&
    PvCO2.value > 0 &&
    PaCO2.value > 0 &&
    HB.value > 0 &&
    SaO2.value > 0 &&
    SvO2.value > 0 &&
    PaO2.value > 0 &&
    PvO2.value > 0 &&
    SaO2.value <= 100 &&
    SvO2.value <= 100
  );
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * @function calculateQR
 * @description Calcola il Quoziente Respiratorio (RQ = VCO₂ / VO₂)
 * @returns {void}
 */
const calculateQR = (): void => {
  logger.debug('🔍 Respiratory Quotient calculation started', {
    pvco2: PvCO2.value,
    paco2: PaCO2.value,
    hb: HB.value,
    sao2: SaO2.value,
    svo2: SvO2.value,
    pao2: PaO2.value,
    pvo2: PvO2.value,
  });

  if (!isFormValid.value) {
    logger.warn('⚠️ QR validation failed');
    showResult.value = false;
    return;
  }

  const pvco2Value = PvCO2.value!;
  const paco2Value = PaCO2.value!;
  const hbValue = HB.value!;
  const sao2Value = SaO2.value!;
  const svo2Value = SvO2.value!;
  const pao2Value = PaO2.value!;
  const pvo2Value = PvO2.value!;

  // CO₂ production
  const vco2 = pvco2Value - paco2Value;

  // Validazione VCO₂ negativo
  if (vco2 < 0) {
    logger.error('❌ QR calculation failed: VCO₂ negativo (PaCO2 > PvCO2)');
    logger.warn('⚠️ Verifica valori: PvCO2 deve essere > PaCO2', {
      pvco2: pvco2Value,
      paco2: paco2Value,
      vco2: vco2,
    });
    showResult.value = false;
    result.value = 0;
    return;
  }

  // O₂ consumption via hemoglobin
  const vo2_hemoglobin =
    (hbValue * MEDICAL_CONSTANTS.HB_O2_BINDING * (sao2Value - svo2Value)) / 100;

  // O₂ consumption via plasma
  const vo2_plasma = (pao2Value - pvo2Value) * MEDICAL_CONSTANTS.O2_SOLUBILITY;

  // Total VO₂
  const vo2_total = vo2_hemoglobin + vo2_plasma;

  // Validazione VO₂ negativo o zero
  if (vo2_total <= 0) {
    logger.error('❌ QR calculation failed: VO₂ negativo o zero');
    logger.warn('⚠️ Verifica valori: SaO2 deve essere > SvO2 e PaO2 > PvO2', {
      vo2_hemoglobin,
      vo2_plasma,
      vo2_total,
    });
    showResult.value = false;
    result.value = 0;
    return;
  }

  // RQ = VCO₂ / VO₂
  const calculatedQR = vco2 / vo2_total;

  // Validazione risultato negativo
  if (calculatedQR < 0) {
    logger.error('❌ QR calculation failed: Risultato negativo');
    showResult.value = false;
    result.value = 0;
    return;
  }

  result.value = Math.round(calculatedQR * 1000) / 1000;
  showResult.value = true;

  const isNormal = result.value >= 0.7 && result.value <= 1.0;
  const metabolicType =
    result.value < 0.7
      ? 'Fat metabolism (aerobic)'
      : result.value <= 0.85
        ? 'Mixed metabolism'
        : result.value <= 1.0
          ? 'Carbohydrate metabolism (aerobic)'
          : 'Anaerobic metabolism';

  logger.info(`✅ QR calculation completed - ${metabolicType}`, {
    result: result.value,
    metabolicType,
    isNormal,
  });

  if (!isNormal) {
    logger.warn('⚠️ QR value outside normal range (0.7-1.0)', { qr: result.value });
  }
};

/**
 * Salvataggio Calcoli
 */
function saveCalculation(): void {
  if (!showResult.value || result.value === 0) {
    logger.warn('⚠️ Tentativo salvataggio senza risultato valido');
    return;
  }
  showSaveDialog.value = true;
  logger.info('💾 Apertura dialog salvataggio calcolo QR');
}

function confirmSave(): void {
  const trimmed = patientInitials.value.trim();

  if (trimmed.length === 0) {
    logger.warn('⚠️ Iniziali paziente vuote');
    return;
  }

  const calculation = createSavedCalculation(trimmed, result.value ?? 0);
  addSavedCalculation(calculation);

  showSaveDialog.value = false;
  patientInitials.value = '';

  logger.info(`✅ Calcolo QR salvato: ${calculation.initials} - ${calculation.result}`);
}

/**
 * Reset completo form e localStorage
 */
function resetForm(): void {
  logger.info('🔄 Reset completo Respiratory Quotient Calculator (localStorage cleared)');

  // Reset persistenza localStorage (include result)
  qr.resetAll();

  // Reset UI flags
  showResult.value = false;
}

/**
 * @function getO2Transport
 * @description Calcola il trasporto di O₂ via emoglobina
 * @returns {number} Trasporto O₂ in ml/dL
 */
const getO2Transport = (): number => {
  if (!HB.value || !SaO2.value || !SvO2.value) return 0;
  return (HB.value * MEDICAL_CONSTANTS.HB_O2_BINDING * (SaO2.value - SvO2.value)) / 100;
};

/**
 * @function getPlasmaO2
 * @description Calcola il trasporto di O₂ via plasma
 * @returns {number} Trasporto O₂ in ml/dL
 */
const getPlasmaO2 = (): number => {
  if (!PaO2.value || !PvO2.value) return 0;
  return (PaO2.value - PvO2.value) * MEDICAL_CONSTANTS.O2_SOLUBILITY;
};

/**
 * @function getInterpretation
 * @description Restituisce interpretazione clinica del QR
 * @returns {string} Interpretazione testuale
 */
const getInterpretation = (): string => {
  if (result.value === 0) return t('qr.interpretation.default');

  if (result.value > RQ_THRESHOLDS.SHOCK_THRESHOLD) {
    return t('qr.interpretation.severeAnaerobic');
  }
  if (result.value > RQ_THRESHOLDS.ANAEROBIC_THRESHOLD) {
    return t('qr.interpretation.anaerobicLipogenesis');
  }
  if (result.value >= 0.95 && result.value <= RQ_THRESHOLDS.CARB_OXIDATION) {
    return t('qr.interpretation.carbMetabolism');
  }
  if (result.value >= RQ_THRESHOLDS.MIXED_DIET_MIN && result.value < 0.95) {
    return t('qr.interpretation.normalRange');
  }
  if (result.value >= RQ_THRESHOLDS.FAT_OXIDATION && result.value < RQ_THRESHOLDS.MIXED_DIET_MIN) {
    return t('qr.interpretation.fatMetabolism');
  }
  if (result.value < RQ_THRESHOLDS.FAT_OXIDATION) {
    return t('qr.interpretation.ketosis');
  }

  return t('qr.interpretation.nonStandard');
};

/**
 * @function getInterpretationColor
 * @description Restituisce colore Quasar per interpretazione
 * @returns {string} Nome colore Quasar
 */
const getInterpretationColor = (): string => {
  if (result.value === 0) return 'grey';
  if (result.value > RQ_THRESHOLDS.SHOCK_THRESHOLD) return 'red';
  if (result.value > RQ_THRESHOLDS.ANAEROBIC_THRESHOLD) return 'orange';
  if (result.value >= RQ_THRESHOLDS.MIXED_DIET_MIN && result.value <= RQ_THRESHOLDS.CARB_OXIDATION)
    return 'green';
  if (result.value >= RQ_THRESHOLDS.FAT_OXIDATION) return 'blue';
  return 'purple';
};
</script>

<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-md" rounded>
      <template v-slot:avatar>
        <q-icon name="info" color="blue" />
      </template>
      <div class="text-body2" v-html="t('qr.header.mainInfo')"></div>
    </q-banner>

    <div class="row justify-center q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="edit" class="q-mr-xs" />
              {{ t('qr.form.sectionTitle') }}
            </div>

            <!-- Alert per valori invertiti -->
            <q-banner
              v-if="PvCO2 !== null && PaCO2 !== null && PvCO2 < PaCO2"
              class="bg-red-1 text-red-9 q-mb-md"
              rounded
              dense
            >
              <template v-slot:avatar>
                <q-icon name="error" color="red" size="sm" />
              </template>
              <div class="text-caption">
                <strong>⚠️ Errore:</strong> PvCO2 ({{ PvCO2 }}) deve essere maggiore di PaCO2 ({{
                  PaCO2
                }})
              </div>
            </q-banner>

            <q-banner
              v-if="
                (SaO2 !== null && SvO2 !== null && SaO2 < SvO2) ||
                (PaO2 !== null && PvO2 !== null && PaO2 < PvO2)
              "
              class="bg-red-1 text-red-9 q-mb-md"
              rounded
              dense
            >
              <template v-slot:avatar>
                <q-icon name="error" color="red" size="sm" />
              </template>
              <div class="text-caption">
                <strong>{{ t('qr.validationErrors.title') }}</strong
                ><br />
                <span v-if="SaO2 !== null && SvO2 !== null && SaO2 < SvO2">
                  {{ t('qr.validationErrors.sao2Error', { sao2: SaO2, svo2: SvO2 }) }}<br />
                </span>
                <span v-if="PaO2 !== null && PvO2 !== null && PaO2 < PvO2">
                  {{ t('qr.validationErrors.pao2Error', { pao2: PaO2, pvo2: PvO2 }) }}
                </span>
              </div>
            </q-banner>

            <!-- PvCO2 -->
            <q-input
              v-model.number="PvCO2"
              type="number"
              step="0.1"
              :label="t('qr.form.pvco2Label')"
              :suffix="t('qr.form.pvco2Unit')"
              outlined
              dense
              class="q-mb-sm"
              :error="PvCO2 !== null && PaCO2 !== null && PvCO2 < PaCO2"
            >
              <template v-slot:prepend>
                <q-icon name="bloodtype" color="red" size="sm" />
              </template>
            </q-input>

            <!-- PaCO2 -->
            <q-input
              v-model.number="PaCO2"
              type="number"
              step="0.1"
              :label="t('qr.form.paco2Label')"
              :suffix="t('qr.form.paco2Unit')"
              outlined
              dense
              class="q-mb-sm"
              :error="PvCO2 !== null && PaCO2 !== null && PvCO2 < PaCO2"
            >
              <template v-slot:prepend>
                <q-icon name="bloodtype" color="blue" size="sm" />
              </template>
            </q-input>

            <!-- HB -->
            <q-input
              v-model.number="HB"
              type="number"
              step="0.1"
              :label="t('qr.form.hbLabel')"
              :suffix="t('qr.form.hbUnit')"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="science" color="purple" size="sm" />
              </template>
            </q-input>

            <!-- SaO2 -->
            <q-input
              v-model.number="SaO2"
              type="number"
              step="0.1"
              :label="t('qr.form.sao2Label')"
              :suffix="t('qr.form.sao2Unit')"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val) => (val >= 0 && val <= 100) || 'Valore 0-100%']"
              :error="SaO2 !== null && SvO2 !== null && SaO2 < SvO2"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="green" size="sm" />
              </template>
            </q-input>

            <!-- SvO2 -->
            <q-input
              v-model.number="SvO2"
              type="number"
              step="0.1"
              :label="t('qr.form.svo2Label')"
              :suffix="t('qr.form.svo2Unit')"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val) => (val >= 0 && val <= 100) || 'Valore 0-100%']"
              :error="SaO2 !== null && SvO2 !== null && SaO2 < SvO2"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="orange" size="sm" />
              </template>
            </q-input>

            <!-- PaO2 -->
            <q-input
              v-model.number="PaO2"
              type="number"
              step="0.1"
              :label="t('qr.form.pao2Label')"
              :suffix="t('qr.form.pao2Unit')"
              outlined
              dense
              class="q-mb-sm"
              :error="PaO2 !== null && PvO2 !== null && PaO2 < PvO2"
            >
              <template v-slot:prepend>
                <q-icon name="device_thermostat" color="cyan" size="sm" />
              </template>
            </q-input>

            <!-- PvO2 -->
            <q-input
              v-model.number="PvO2"
              type="number"
              step="0.1"
              :label="t('qr.form.pvo2Label')"
              :suffix="t('qr.form.pvo2Unit')"
              outlined
              dense
              class="q-mb-md"
              :error="PaO2 !== null && PvO2 !== null && PaO2 < PvO2"
            >
              <template v-slot:prepend>
                <q-icon name="device_thermostat" color="teal" size="sm" />
              </template>
            </q-input>

            <!-- Bottoni -->
            <div class="row no-wrap q-gutter-xs justify-center">
              <q-btn
                @click="calculateQR"
                color="primary"
                :size="$q.screen.xs ? 'xs' : 'md'"
                class="full-width q-pa-xs"
                icon="calculate"
                :disable="!isFormValid"
              >
                {{ t('qr.buttons.calculate') }}
              </q-btn>
              <q-space />
              <q-btn
                @click="saveCalculation"
                color="positive"
                :size="$q.screen.xs ? 'xs' : 'md'"
                class="full-width q-pa-xs"
                icon="save"
                :disable="!showResult || result === 0"
                outline
              >
                {{ t('qr.buttons.save') }}
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
                {{ t('qr.buttons.reset') }}
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati - Full Width -->
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="analytics" class="q-mr-xs" />
              {{ t('qr.results.title') }}
            </div>

            <!-- Placeholder quando non ci sono risultati -->
            <div v-if="!showResult || result === 0" class="text-center q-pa-xl">
              <q-icon name="calculate" size="4rem" color="grey-4" />
              <div class="text-body2 text-grey-6 q-mt-md">
                {{ t('qr.results.noResults') }}
              </div>
            </div>

            <!-- Risultato -->
            <div v-if="showResult && result > 0" class="text-center q-mb-md">
              <div class="text-h4 text-primary">
                {{ result.toFixed(3) }}
              </div>
              <div class="text-caption text-grey-7">{{ t('qr.results.unit') }}</div>
            </div>

            <!-- Interpretazione -->
            <div v-if="showResult && result > 0" class="q-mb-sm">
              <q-chip
                :color="getInterpretationColor()"
                text-color="white"
                class="full-width text-center"
              >
                {{ getInterpretation() }}
              </q-chip>
            </div>

            <!-- Alert critici -->
            <q-banner v-if="showResult && result > 1.2" class="bg-red-1 text-red-9 q-mb-xs" rounded>
              <template v-slot:avatar>
                <q-icon name="warning" color="red" size="sm" />
              </template>
              <div class="text-caption">
                <strong>{{ t('qr.alerts.criticalHigh.title') }}</strong>
                <span v-html="t('qr.alerts.criticalHigh.text')"></span>
              </div>
            </q-banner>

            <q-banner
              v-if="showResult && result < 0.7 && result > 0"
              class="bg-orange-1 text-orange-9"
              rounded
            >
              <template v-slot:avatar>
                <q-icon name="info" color="orange" size="sm" />
              </template>
              <div class="text-caption">
                <strong>{{ t('qr.alerts.ketosisWarning.title') }}</strong>
                <span v-html="t('qr.alerts.ketosisWarning.text')"></span>
              </div>
            </q-banner>
            <!-- Saved Calculations Table -->
            <SavedCalculations
              calculator-type="qr"
              :calculations="savedCalculations"
              @remove="removeSavedCalculation"
            />
            <!-- Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              :label="t('qr.definition.title')"
              default-opened
              class="q-mt-md"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('qr.definition.mainTitle') }}
                </div>
                <div
                  class="text-caption text-grey-8 q-mb-sm"
                  v-html="t('qr.definition.mainText')"
                ></div>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('qr.definition.clinicalSignificanceTitle') }}
                </div>
                <q-list class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <div
                          class="text-grey-8"
                          v-html="t('qr.definition.clinicalSignificance.metabolicType.title')"
                        ></div>
                        <div
                          class="text-grey-8"
                          v-html="t('qr.definition.clinicalSignificance.metabolicType.text')"
                        ></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <div
                          class="text-grey-8"
                          v-html="t('qr.definition.clinicalSignificance.metabolicState.title')"
                        ></div>
                        <div
                          class="text-grey-8"
                          v-html="t('qr.definition.clinicalSignificance.metabolicState.text')"
                        ></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <div
                          class="text-grey-8"
                          v-html="t('qr.definition.clinicalSignificance.normalRange.title')"
                        ></div>
                        <div
                          class="text-grey-8"
                          v-html="t('qr.definition.clinicalSignificance.normalRange.text')"
                        ></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('qr.definition.interpretationValuesTitle') }}
                </div>
                <div class="row q-gutter-xs">
                  <div class="col-12 bg-green-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      {{ t('qr.definition.interpretationValues.qr1_0.value') }}
                    </div>
                    <div
                      class="text-caption text-grey-8"
                      v-html="t('qr.definition.interpretationValues.qr1_0.meaning')"
                    ></div>
                  </div>
                  <div class="col-12 bg-amber-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      {{ t('qr.definition.interpretationValues.qr0_7.value') }}
                    </div>
                    <div
                      class="text-caption text-grey-8"
                      v-html="t('qr.definition.interpretationValues.qr0_7.meaning')"
                    ></div>
                  </div>
                  <div class="col-12 bg-blue-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      {{ t('qr.definition.interpretationValues.qr0_8.value') }}
                    </div>
                    <div
                      class="text-caption text-grey-8"
                      v-html="t('qr.definition.interpretationValues.qr0_8.meaning')"
                    ></div>
                  </div>
                  <div class="col-12 bg-purple-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      {{ t('qr.definition.interpretationValues.qr0_85.value') }}
                    </div>
                    <div
                      class="text-caption text-grey-8"
                      v-html="t('qr.definition.interpretationValues.qr0_85.meaning')"
                    ></div>
                  </div>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- Metabolismo Aerobico vs Anaerobico -->
            <q-expansion-item
              icon="biotech"
              :label="t('qr.metabolism.title')"
              class="q-mt-md"
              header-class="bg-green-2 text-green-10"
            >
              <q-card class="q-pa-sm">
                <div class="text-body2 text-weight-bold text-positive q-mb-sm">
                  {{ t('qr.metabolism.aerobicTitle') }}
                </div>
                <div
                  class="text-caption text-grey-8 q-mb-sm"
                  v-html="t('qr.metabolism.aerobicText')"
                ></div>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold text-negative q-mb-sm">
                  {{ t('qr.metabolism.anaerobicTitle') }}
                </div>
                <div
                  class="text-caption text-grey-8 q-mb-xs"
                  v-html="t('qr.metabolism.anaerobicText')"
                ></div>
                <q-list class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <div
                          class="text-grey-8"
                          v-html="t('qr.metabolism.anaerobicConditions.hypoxia.text')"
                        ></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <div
                          class="text-grey-8"
                          v-html="t('qr.metabolism.anaerobicConditions.stress.text')"
                        ></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <div
                          class="text-grey-8"
                          v-html="t('qr.metabolism.anaerobicConditions.oxygenLack.text')"
                        ></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <div
                          class="text-grey-8"
                          v-html="t('qr.metabolism.anaerobicConditions.shock.text')"
                        ></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div
                  class="text-caption text-grey-8 q-mb-sm"
                  v-html="t('qr.metabolism.qrElevationMechanism')"
                ></div>

                <q-banner class="bg-red-1 text-red-9" rounded>
                  <template v-slot:avatar>
                    <q-icon name="warning" color="red" size="xs" />
                  </template>
                  <div class="text-caption" v-html="t('qr.metabolism.clinicalCorrelation')"></div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Come si Misura il VCO2/VO2 -->
            <q-expansion-item
              icon="science"
              :label="t('qr.measurement.title')"
              class="q-mt-md"
              header-class="bg-amber-2 text-amber-10"
            >
              <q-card class="q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('qr.measurement.methodsTitle') }}
                </div>

                <div class="q-mb-sm">
                  <div class="text-body2 text-weight-bold text-positive">
                    {{ t('qr.measurement.indirectCalorimetry.title') }}
                  </div>
                  <div
                    class="text-caption text-grey-8"
                    v-html="t('qr.measurement.indirectCalorimetry.text')"
                  ></div>
                </div>

                <q-separator class="q-my-sm" />

                <div class="q-mb-sm">
                  <div class="text-body2 text-weight-bold text-primary">
                    {{ t('qr.measurement.formulaMethod.title') }}
                  </div>
                  <div
                    class="text-caption text-grey-8 q-mb-xs"
                    v-html="t('qr.measurement.formulaMethod.intro')"
                  ></div>

                  <div class="bg-blue-1 q-pa-xs q-mb-xs rounded-borders">
                    <div class="text-caption text-weight-bold q-mb-xs">
                      {{ t('qr.measurement.formulaMethod.vo2CalcTitle') }}
                    </div>
                    <div
                      class="text-caption text-grey-8 q-mb-xs"
                      v-html="t('qr.measurement.formulaMethod.vo2CalcText')"
                    ></div>
                    <div
                      class="text-caption text-grey-7"
                      v-html="t('qr.measurement.formulaMethod.vo2Formula')"
                    ></div>
                  </div>

                  <div class="bg-orange-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold q-mb-xs">
                      {{ t('qr.measurement.formulaMethod.vco2CalcTitle') }}
                    </div>
                    <div
                      class="text-caption text-grey-8 q-mb-xs"
                      v-html="t('qr.measurement.formulaMethod.vco2CalcText')"
                    ></div>
                    <div
                      class="text-caption text-grey-7"
                      v-html="t('qr.measurement.formulaMethod.vco2Formula')"
                    ></div>
                  </div>
                </div>

                <q-banner class="bg-amber-1 text-amber-9" rounded>
                  <template v-slot:avatar>
                    <q-icon name="info" color="amber" size="xs" />
                  </template>
                  <div class="text-caption" v-html="t('qr.measurement.practicalNote')"></div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 🔬 Fisiologia del Metabolismo Aerobico vs Anaerobico -->
            <q-expansion-item
              icon="science"
              :label="t('qr.physiology.title')"
              class="q-mt-md"
              header-class="bg-green-1 text-green-9"
            >
              <q-card class="q-pa-sm">
                <p class="text-caption text-weight-bold q-mb-xs">
                  {{ t('qr.physiology.substratesTitle') }}
                </p>
                <div class="q-mb-sm">
                  <p class="text-caption">
                    <strong>{{ t('qr.physiology.carbohydrates.title') }}</strong>
                  </p>
                  <div class="bg-blue-1 q-pa-xs rounded-borders q-mb-xs">
                    <p class="text-caption text-center">
                      {{ t('qr.physiology.carbohydrates.equation') }}
                    </p>
                    <p class="text-caption text-center text-weight-bold">
                      {{ t('qr.physiology.carbohydrates.rq') }}
                    </p>
                  </div>
                  <q-list class="q-pl-md">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <div v-html="t('qr.physiology.carbohydrates.details')"></div>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="q-mb-sm">
                  <p class="text-caption">
                    <strong>{{ t('qr.physiology.lipids.title') }}</strong>
                  </p>
                  <div class="bg-orange-1 q-pa-xs rounded-borders q-mb-xs">
                    <p class="text-caption text-center">
                      {{ t('qr.physiology.lipids.equation') }}
                    </p>
                    <p class="text-caption text-center text-weight-bold">
                      {{ t('qr.physiology.lipids.rq') }}
                    </p>
                  </div>
                  <q-list class="q-pl-md">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <div v-html="t('qr.physiology.lipids.details')"></div>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="q-mb-sm">
                  <p class="text-caption">
                    <strong>{{ t('qr.physiology.proteins.title') }}</strong>
                  </p>
                  <div class="bg-purple-1 q-pa-xs rounded-borders q-mb-xs">
                    <p class="text-caption text-center text-weight-bold">
                      {{ t('qr.physiology.proteins.rq') }}
                    </p>
                  </div>
                  <q-list class="q-pl-md">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <div v-html="t('qr.physiology.proteins.details')"></div>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <p class="text-caption text-weight-bold q-mb-xs q-mt-sm">
                  {{ t('qr.physiology.anaerobicTitle') }}
                </p>
                <div class="bg-red-1 q-pa-xs rounded-borders q-mb-xs">
                  <p class="text-caption text-center">
                    {{ t('qr.physiology.anaerobicEquation') }}
                  </p>
                  <p
                    class="text-caption text-center text-weight-bold"
                    v-html="t('qr.physiology.anaerobicRQ')"
                  ></p>
                </div>
                <q-list class="q-pl-md">
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        <div v-html="t('qr.physiology.anaerobicMechanism')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        <div v-html="t('qr.physiology.anaerobicClinical')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-banner class="bg-orange-1 text-orange-9 q-mt-sm" rounded>
                  <template v-slot:avatar>
                    <q-icon name="warning" color="orange" size="xs" />
                  </template>
                  <div class="text-caption" v-html="t('qr.physiology.clinicalImplication')"></div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 📏 Come si Misura il RQ -->
            <q-expansion-item
              icon="straighten"
              :label="t('qr.rqMeasurement.title')"
              class="q-mt-md"
              header-class="bg-amber-1 text-amber-9"
            >
              <q-card class="q-pa-sm">
                <p class="text-caption text-weight-bold q-mb-xs">
                  {{ t('qr.rqMeasurement.directMethodsTitle') }}
                </p>
                <div class="q-mb-sm">
                  <p class="text-caption">
                    <strong>{{ t('qr.rqMeasurement.method1.title') }}</strong>
                  </p>
                  <q-list class="q-pl-md">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>{{ t('qr.rqMeasurement.method1.principle.label') }}</strong>
                          {{ t('qr.rqMeasurement.method1.principle.text') }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>{{ t('qr.rqMeasurement.method1.equipment.label') }}</strong>
                          {{ t('qr.rqMeasurement.method1.equipment.text') }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>{{ t('qr.rqMeasurement.method1.conditions.label') }}</strong>
                          {{ t('qr.rqMeasurement.method1.conditions.text') }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>{{ t('qr.rqMeasurement.method1.applications.label') }}</strong>
                          {{ t('qr.rqMeasurement.method1.applications.text') }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="q-mb-sm">
                  <p class="text-caption">
                    <strong>{{ t('qr.rqMeasurement.method2.title') }}</strong>
                  </p>
                  <q-list class="q-pl-md">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>{{ t('qr.rqMeasurement.method2.sampling.label') }}</strong>
                          {{ t('qr.rqMeasurement.method2.sampling.text') }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>{{ t('qr.rqMeasurement.method2.parameters.label') }}</strong>
                          {{ t('qr.rqMeasurement.method2.parameters.text') }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>{{ t('qr.rqMeasurement.method2.vco2Calc.label') }}</strong>
                          {{ t('qr.rqMeasurement.method2.vco2Calc.text') }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>{{ t('qr.rqMeasurement.method2.vo2Calc.label') }}</strong>
                          {{ t('qr.rqMeasurement.method2.vo2Calc.text') }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>{{ t('qr.rqMeasurement.method2.limitations.label') }}</strong>
                          {{ t('qr.rqMeasurement.method2.limitations.text') }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <q-banner class="bg-cyan-1 text-cyan-9" rounded>
                  <template v-slot:avatar>
                    <q-icon name="science" color="cyan" size="xs" />
                  </template>
                  <div
                    class="text-caption"
                    v-html="t('qr.rqMeasurement.clinicalRecommendation')"
                  ></div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Formula Utilizzata -->
            <q-expansion-item
              icon="functions"
              :label="t('qr.formula.title')"
              class="q-mt-md"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="q-pa-sm">
                <div class="bg-primary text-white q-pa-sm q-mb-sm">
                  <div class="text-body2 text-center">
                    {{ t('qr.formula.mainFormula') }}
                  </div>
                </div>

                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>{{ t('qr.formula.whereTitle') }}</strong>
                </div>
                <q-list class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="blue" text-color="white">1.36</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('qr.formula.components.constant1_36')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="orange" text-color="white">0.003</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('qr.formula.components.constant0_003')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </q-expansion-item>

            <!-- Analisi Dettagliata e Applicazioni Cliniche -->
            <q-expansion-item
              icon="local_hospital"
              :label="t('qr.detailedAnalysis.title')"
              class="q-mt-md"
              header-class="bg-purple-1 text-purple-9"
            >
              <q-card class="q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('qr.detailedAnalysis.componentsTitle') }}
                </div>
                <div class="row q-gutter-xs q-mb-sm">
                  <div class="col-12 bg-blue-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      {{ t('qr.detailedAnalysis.vco2Production') }}
                      <span class="text-primary q-ml-xs">
                        {{ ((PvCO2 || 0) - (PaCO2 || 0)).toFixed(1) }} mmHg
                      </span>
                    </div>
                    <div class="text-caption text-grey-7">
                      {{ t('qr.detailedAnalysis.vco2Description') }}
                    </div>
                  </div>
                  <div class="col-12 bg-green-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      {{ t('qr.detailedAnalysis.vo2Hemoglobin') }}
                      <span class="text-primary q-ml-xs"
                        >{{ getO2Transport().toFixed(2) }} ml/dL</span
                      >
                    </div>
                    <div class="text-caption text-grey-7">
                      {{ t('qr.detailedAnalysis.vo2HemoglobinFormula') }}
                    </div>
                  </div>
                  <div class="col-12 bg-orange-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      {{ t('qr.detailedAnalysis.vo2Plasma') }}
                      <span class="text-primary q-ml-xs">{{ getPlasmaO2().toFixed(3) }} ml/dL</span>
                    </div>
                    <div class="text-caption text-grey-7">
                      {{ t('qr.detailedAnalysis.vo2PlasmaFormula') }}
                    </div>
                  </div>
                </div>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('qr.detailedAnalysis.clinicalApplicationsTitle') }}
                </div>
                <q-list class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('qr.detailedAnalysis.applications.calorimetry')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('qr.detailedAnalysis.applications.nutrition')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('qr.detailedAnalysis.applications.shock')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('qr.detailedAnalysis.applications.weaning')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('qr.detailedAnalysis.applications.metabolic')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('qr.detailedAnalysis.limitationsTitle') }}
                </div>
                <q-list class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('qr.detailedAnalysis.limitations.systemic')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('qr.detailedAnalysis.limitations.shock') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        {{ t('qr.detailedAnalysis.limitations.accuracy') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <div v-html="t('qr.detailedAnalysis.limitations.estimation')"></div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div
                  class="text-caption text-grey-7 q-mt-sm"
                  v-html="t('qr.detailedAnalysis.references')"
                ></div>
              </q-card>
            </q-expansion-item>

            <!-- 🎯 Interpretazione Clinica Dettagliata -->
            <q-expansion-item
              icon="psychology"
              :label="t('qr.clinicalInterpretation.title')"
              class="q-mt-md"
              header-class="bg-orange-1 text-orange-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  {{ t('qr.clinicalInterpretation.rangeTitle') }}
                </div>

                <q-list bordered class="q-mb-md">
                  <q-item class="bg-purple-1">
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.clinicalInterpretation.qr07.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>{{ t('qr.clinicalInterpretation.qr07.clinical.label') }}:</strong>
                        {{ t('qr.clinicalInterpretation.qr07.clinical.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>{{ t('qr.clinicalInterpretation.qr07.metabolic.label') }}:</strong>
                        {{ t('qr.clinicalInterpretation.qr07.metabolic.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-purple-9">
                        <strong>{{ t('qr.clinicalInterpretation.qr07.action.label') }}:</strong>
                        {{ t('qr.clinicalInterpretation.qr07.action.text') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-green-1 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.clinicalInterpretation.qr0885.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>{{ t('qr.clinicalInterpretation.qr0885.clinical.label') }}:</strong>
                        {{ t('qr.clinicalInterpretation.qr0885.clinical.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong
                          >{{ t('qr.clinicalInterpretation.qr0885.metabolic.label') }}:</strong
                        >
                        {{ t('qr.clinicalInterpretation.qr0885.metabolic.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-green-9">
                        <strong>{{ t('qr.clinicalInterpretation.qr0885.action.label') }}:</strong>
                        {{ t('qr.clinicalInterpretation.qr0885.action.text') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-blue-1 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.clinicalInterpretation.qr0910.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>{{ t('qr.clinicalInterpretation.qr0910.clinical.label') }}:</strong>
                        {{ t('qr.clinicalInterpretation.qr0910.clinical.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong
                          >{{ t('qr.clinicalInterpretation.qr0910.metabolic.label') }}:</strong
                        >
                        {{ t('qr.clinicalInterpretation.qr0910.metabolic.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-blue-9">
                        <strong>{{ t('qr.clinicalInterpretation.qr0910.action.label') }}:</strong>
                        {{ t('qr.clinicalInterpretation.qr0910.action.text') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-orange-2 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-orange-9">
                        {{ t('qr.clinicalInterpretation.qr1012.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>{{ t('qr.clinicalInterpretation.qr1012.clinical.label') }}:</strong>
                        {{ t('qr.clinicalInterpretation.qr1012.clinical.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong
                          >{{ t('qr.clinicalInterpretation.qr1012.metabolic.label') }}:</strong
                        >
                        {{ t('qr.clinicalInterpretation.qr1012.metabolic.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>{{ t('qr.clinicalInterpretation.qr1012.problem.label') }}:</strong>
                        {{ t('qr.clinicalInterpretation.qr1012.problem.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-orange-10">
                        <strong>{{ t('qr.clinicalInterpretation.qr1012.action.label') }}:</strong>
                        {{ t('qr.clinicalInterpretation.qr1012.action.text') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-red-2 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-red-9">
                        {{ t('qr.clinicalInterpretation.qrAbove12.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong
                          >{{ t('qr.clinicalInterpretation.qrAbove12.clinical.label') }}:</strong
                        >
                        {{ t('qr.clinicalInterpretation.qrAbove12.clinical.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong
                          >{{ t('qr.clinicalInterpretation.qrAbove12.metabolic.label') }}:</strong
                        >
                        {{ t('qr.clinicalInterpretation.qrAbove12.metabolic.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong
                          >{{ t('qr.clinicalInterpretation.qrAbove12.prognostic.label') }}:</strong
                        >
                        {{ t('qr.clinicalInterpretation.qrAbove12.prognostic.text') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-red-10">
                        <strong
                          >{{ t('qr.clinicalInterpretation.qrAbove12.action.label') }}:</strong
                        >
                        {{ t('qr.clinicalInterpretation.qrAbove12.action.text') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner class="bg-indigo-1 text-indigo-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="lightbulb" color="indigo" />
                  </template>
                  <div class="text-caption">
                    {{ t('qr.clinicalInterpretation.clinicalNote') }}
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- ⚠️ Valori di Riferimento e Alert Critici -->
            <q-expansion-item
              icon="warning"
              :label="t('qr.referenceValues.title')"
              class="q-mt-md"
              header-class="bg-red-1 text-red-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  {{ t('qr.referenceValues.rangeTitle') }}
                </div>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('qr.referenceValues.restingTitle') }}
                </div>
                <q-list bordered class="q-mb-md bg-grey-1">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="purple" name="bedtime" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>{{ t('qr.referenceValues.resting.item1.range') }}</strong> -
                        {{ t('qr.referenceValues.resting.item1.condition') }}
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.referenceValues.resting.item1.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="purple" name="nights_stay" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>{{ t('qr.referenceValues.resting.item2.range') }}</strong> -
                        {{ t('qr.referenceValues.resting.item2.condition') }}
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.referenceValues.resting.item2.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('qr.referenceValues.postprandialTitle') }}
                </div>
                <q-list bordered class="q-mb-md bg-grey-1">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="blue" name="restaurant" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>{{ t('qr.referenceValues.postprandial.item1.range') }}</strong> -
                        {{ t('qr.referenceValues.postprandial.item1.condition') }}
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.referenceValues.postprandial.item1.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="blue" name="cake" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>{{ t('qr.referenceValues.postprandial.item2.range') }}</strong> -
                        {{ t('qr.referenceValues.postprandial.item2.condition') }}
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.referenceValues.postprandial.item2.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  {{ t('qr.referenceValues.exerciseTitle') }}
                </div>
                <q-list bordered class="q-mb-md bg-grey-1">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="directions_walk" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>{{ t('qr.referenceValues.exercise.item1.range') }}</strong> -
                        {{ t('qr.referenceValues.exercise.item1.condition') }}
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.referenceValues.exercise.item1.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="directions_run" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>{{ t('qr.referenceValues.exercise.item2.range') }}</strong> -
                        {{ t('qr.referenceValues.exercise.item2.condition') }}
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.referenceValues.exercise.item2.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="orange" name="flash_on" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>{{ t('qr.referenceValues.exercise.item3.range') }}</strong> -
                        {{ t('qr.referenceValues.exercise.item3.condition') }}
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.referenceValues.exercise.item3.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="red" name="whatshot" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>{{ t('qr.referenceValues.exercise.item4.range') }}</strong> -
                        {{ t('qr.referenceValues.exercise.item4.condition') }}
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.referenceValues.exercise.item4.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs text-red-9">
                  {{ t('qr.referenceValues.alertsTitle') }}
                </div>
                <q-list bordered class="bg-red-1">
                  <q-item class="bg-orange-2">
                    <q-item-section avatar>
                      <q-icon
                        :color="t('qr.referenceValues.alerts.item1.iconColor')"
                        :name="t('qr.referenceValues.alerts.item1.icon')"
                        size="sm"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-orange-9">
                        {{ t('qr.referenceValues.alerts.item1.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span v-html="t('qr.referenceValues.alerts.item1.meaning')" />
                      </q-item-label>
                      <q-item-label caption class="text-weight-medium text-orange-10 q-mt-xs">
                        <span v-html="t('qr.referenceValues.alerts.item1.action')" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-red-2 q-mt-sm">
                    <q-item-section avatar>
                      <q-icon
                        :color="t('qr.referenceValues.alerts.item2.iconColor')"
                        :name="t('qr.referenceValues.alerts.item2.icon')"
                        size="sm"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-red-9">
                        {{ t('qr.referenceValues.alerts.item2.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span v-html="t('qr.referenceValues.alerts.item2.meaning')" />
                      </q-item-label>
                      <q-item-label caption class="text-weight-medium text-red-10 q-mt-xs">
                        <span v-html="t('qr.referenceValues.alerts.item2.action')" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-purple-2 q-mt-sm">
                    <q-item-section avatar>
                      <q-icon
                        :color="t('qr.referenceValues.alerts.item3.iconColor')"
                        :name="t('qr.referenceValues.alerts.item3.icon')"
                        size="sm"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-purple-9">
                        {{ t('qr.referenceValues.alerts.item3.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span v-html="t('qr.referenceValues.alerts.item3.meaning')" />
                      </q-item-label>
                      <q-item-label caption class="text-weight-medium text-purple-9 q-mt-xs">
                        <span v-html="t('qr.referenceValues.alerts.item3.action')" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner class="bg-blue-grey-1 text-blue-grey-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="science" color="blue-grey" />
                  </template>
                  <div class="text-caption" v-html="t('qr.referenceValues.variability')"></div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 📚 Documentazione Medica Scientifica -->
            <q-expansion-item
              icon="menu_book"
              :label="t('qr.scientificDocumentation.title')"
              class="q-mt-md"
              header-class="bg-indigo-1 text-indigo-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  {{ t('qr.scientificDocumentation.guidelinesTitle') }}
                </div>

                <q-list class="q-mb-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.scientificDocumentation.guidelines.espen2019.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span
                          v-html="
                            t('qr.scientificDocumentation.guidelines.espen2019.recommendations')
                          "
                        />
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.scientificDocumentation.guidelines.espen2019.source') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.scientificDocumentation.guidelines.aspen2016.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span
                          v-html="
                            t('qr.scientificDocumentation.guidelines.aspen2016.recommendations')
                          "
                        />
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.scientificDocumentation.guidelines.aspen2016.source') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.scientificDocumentation.guidelines.atsaccp2003.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span
                          v-html="
                            t('qr.scientificDocumentation.guidelines.atsaccp2003.recommendations')
                          "
                        />
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.scientificDocumentation.guidelines.atsaccp2003.source') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="settings" color="indigo" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.scientificDocumentation.guidelines.metabolicCart.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span
                          v-html="
                            t('qr.scientificDocumentation.guidelines.metabolicCart.recommendations')
                          "
                        />
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.scientificDocumentation.guidelines.metabolicCart.source') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="medical_services" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.scientificDocumentation.guidelines.weaning.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span
                          v-html="
                            t('qr.scientificDocumentation.guidelines.weaning.recommendations')
                          "
                        />
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        {{ t('qr.scientificDocumentation.guidelines.weaning.source') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner class="bg-amber-1 text-amber-9">
                  <template v-slot:avatar>
                    <q-icon name="policy" color="amber-9" />
                  </template>
                  <div
                    class="text-caption"
                    v-html="t('qr.scientificDocumentation.clinicalNote')"
                  ></div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 📖 Riferimenti Scientifici -->
            <q-expansion-item
              icon="import_contacts"
              :label="t('qr.bibliography.title')"
              class="q-mt-md"
              header-class="bg-teal-1 text-teal-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  {{ t('qr.bibliography.literatureTitle') }}
                </div>

                <q-list class="q-mb-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.bibliography.citations.weir1949.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span v-html="t('qr.bibliography.citations.weir1949.journal')" />
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        {{ t('qr.bibliography.citations.weir1949.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.bibliography.citations.mcclave2016.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span v-html="t('qr.bibliography.citations.mcclave2016.journal')" />
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        {{ t('qr.bibliography.citations.mcclave2016.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.bibliography.citations.singer2019.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span v-html="t('qr.bibliography.citations.singer2019.journal')" />
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        {{ t('qr.bibliography.citations.singer2019.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.bibliography.citations.brooks1994.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span v-html="t('qr.bibliography.citations.brooks1994.journal')" />
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        {{ t('qr.bibliography.citations.brooks1994.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="book" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.bibliography.citations.sciencedirect.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        {{ t('qr.bibliography.citations.sciencedirect.journal') }}
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        {{ t('qr.bibliography.citations.sciencedirect.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="book" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.bibliography.citations.msdmanuals.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        {{ t('qr.bibliography.citations.msdmanuals.journal') }}
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        {{ t('qr.bibliography.citations.msdmanuals.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.bibliography.citations.mtaweh2018.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span v-html="t('qr.bibliography.citations.mtaweh2018.journal')" />
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        {{ t('qr.bibliography.citations.mtaweh2018.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ t('qr.bibliography.citations.simonson1990.title') }}
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <span v-html="t('qr.bibliography.citations.simonson1990.journal')" />
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        {{ t('qr.bibliography.citations.simonson1990.description') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner class="bg-indigo-1 text-indigo-9">
                  <template v-slot:avatar>
                    <q-icon name="verified" color="indigo" />
                  </template>
                  <div class="text-caption" v-html="t('qr.bibliography.qualityNote')"></div>
                </q-banner>
              </q-card>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Save Dialog -->
    <q-dialog v-model="showSaveDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ t('qr.saveDialog.title') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="patientInitials"
            :label="t('qr.saveDialog.patientInitialsLabel')"
            dense
            autofocus
            maxlength="2"
            @keyup.enter="confirmSave"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="t('qr.saveDialog.cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="t('qr.saveDialog.save')"
            color="positive"
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
