<!-- NEWSScoreCalculator.vue -->
<script setup lang="ts">
/**
 * @file NEWSScoreCalculator.vue
 * @description NEWS (National Early Warning Score) Calculator - Early detection of patient deterioration
 * @author Vasile Chifeac
 * @created 2025-11-13
 * @modified 2025-12-13
 *
 * @references
 * - Smith GB et al. (2013) "NEWS ability to discriminate at-risk patients" Resuscitation 84(4):465-470. PMID: 23953475
 * - Abbott TEF et al. (2018) "NEWS validation post-operative complications" Anesth Analg 126(6):1936-1945. PMID: 29769354
 * - Keep JW et al. (2016) "NEWS at ED triage for sepsis identification" Emerg Med J 33(1):37-41. PMID: 26868048
 * - Royal College of Physicians (UK) - NEWS Development 2012, NEWS2 Update 2017
 */

import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSecureLogger } from 'src/composables/useSecureLogger';
import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';

// ============================================================
// COMPOSABLES
// ============================================================
const { t } = useI18n({ useScope: 'global' });
const logger = useSecureLogger();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { config: envConfig } = useSmartEnvironment();

// ============================================================
// TYPES & INTERFACES
// ============================================================
/**
 * @interface NEWSScores
 * @description NEWS Score parameters (7 vital signs)
 * @property {number} respiratoryRate - Respiratory Rate score (0-3 points)
 * @property {number} oxygenSaturation - Oxygen Saturation SpO₂ score (0-3 points)
 * @property {number} oxygenTherapy - Supplemental O₂ therapy score (0 or 2 points)
 * @property {number} temperature - Body temperature score (0-3 points)
 * @property {number} systolicBP - Systolic Blood Pressure score (0-3 points)
 * @property {number} heartRate - Heart Rate score (0-3 points)
 * @property {number} consciousness - AVPU consciousness level score (0 or 3 points)
 */
interface NEWSScores {
  respiratoryRate: number;
  oxygenSaturation: number;
  oxygenTherapy: number;
  temperature: number;
  systolicBP: number;
  heartRate: number;
  consciousness: number;
}

// ============================================================
// STATE
// ============================================================
/**
 * @constant initialScores
 * @description Initial state with all scores at 0 (optimal baseline)
 */
const initialScores: NEWSScores = {
  respiratoryRate: 0,
  oxygenSaturation: 0,
  oxygenTherapy: 0,
  temperature: 0,
  systolicBP: 0,
  heartRate: 0,
  consciousness: 0,
};

const scores = ref<NEWSScores>({ ...initialScores });

// ============================================================
// COMPUTED
// ============================================================
/**
 * @computed totalScore
 * @description Calculate NEWS total score (sum of 7 parameters, range 0-20)
 * @returns {number} Total NEWS score
 */
const totalScore = computed(() => {
  return (
    scores.value.respiratoryRate +
    scores.value.oxygenSaturation +
    scores.value.oxygenTherapy +
    scores.value.temperature +
    scores.value.systolicBP +
    scores.value.heartRate +
    scores.value.consciousness
  );
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * @function getScoreColor
 * @description Determine color based on NEWS risk stratification
 * @param {number} score - Total NEWS score (0-20)
 * @returns {string} Quasar color: 'green' (0), 'yellow' (1-4), 'orange' (5-6), 'red' (≥7)
 * @see {@link https://www.rcplondon.ac.uk/projects/outputs/national-early-warning-score-news-2}
 *
 * @example
 * getScoreColor(0) // returns 'green' (Low Risk)
 * getScoreColor(3) // returns 'yellow' (Low-Medium Risk)
 * getScoreColor(5) // returns 'orange' (Medium Risk)
 * getScoreColor(8) // returns 'red' (High Risk - Emergency)
 */
const getScoreColor = (score: number): string => {
  if (score === 0) return 'green';
  if (score >= 1 && score <= 4) return 'yellow';
  if (score >= 5 && score <= 6) return 'orange';
  return 'red';
};

/**
 * @function getScoreInterpretationKey
 * @description Get i18n translation key for NEWS risk level interpretation
 * @param {number} score - Total NEWS score (0-20)
 * @returns {string} Translation key for NEWS interpretation
 * @see I18N_SETUP_GUIDE.md - STEP 4: Returns key string (not translated text)
 *
 * @example
 * getScoreInterpretationKey(0) // returns 'news.interpretation.lowRisk'
 * getScoreInterpretationKey(3) // returns 'news.interpretation.lowMediumRisk'
 * getScoreInterpretationKey(5) // returns 'news.interpretation.mediumRisk'
 * getScoreInterpretationKey(9) // returns 'news.interpretation.highRisk'
 */
const getScoreInterpretationKey = (score: number): string => {
  if (score === 0) return 'news.interpretation.lowRisk';
  if (score >= 1 && score <= 4) return 'news.interpretation.lowMediumRisk';
  if (score >= 5 && score <= 6) return 'news.interpretation.mediumRisk';
  return 'news.interpretation.highRisk';
};

/**
 * @function getClinicalActionsKey
 * @description Get i18n translation key for clinical actions guidance
 * @param {number} score - Total NEWS score (0-20)
 * @returns {string} Translation key for clinical actions
 * @see I18N_SETUP_GUIDE.md - STEP 4: Returns key string for template t() call
 *
 * @example
 * getClinicalActionsKey(0) // returns 'news.clinicalActions.score0'
 * getClinicalActionsKey(2) // returns 'news.clinicalActions.score1_4'
 * getClinicalActionsKey(6) // returns 'news.clinicalActions.score5_6'
 * getClinicalActionsKey(9) // returns 'news.clinicalActions.score7plus'
 */
const getClinicalActionsKey = (score: number): string => {
  if (score === 0) return 'news.clinicalActions.score0';
  if (score >= 1 && score <= 4) return 'news.clinicalActions.score1_4';
  if (score >= 5 && score <= 6) return 'news.clinicalActions.score5_6';
  return 'news.clinicalActions.score7plus';
};

/**
 * @function resetForm
 * @description Reset all NEWS scores to initial state (all zeros)
 * @returns {void}
 *
 * @example
 * resetForm(); // Resets all scores to 0, logs action to secure logger
 */
const resetForm = (): void => {
  scores.value = { ...initialScores };
  logger.info('NEWS form reset', {
    component: 'NEWSScoreCalculator',
    action: 'resetForm',
    timestamp: new Date().toISOString(),
  });
};
</script>

<template>
  <!-- Breadcrumbs -->
  <div class="q-mb-lg">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
      <q-breadcrumbs-el :label="t('news.breadcrumbs.newsScore')" />
    </q-breadcrumbs>
    <h4 class="text-h4 text-primary q-mt-md q-mb-none">{{ t('news.header.title') }}</h4>
    <p class="text-subtitle1 text-grey-7">{{ t('news.header.subtitle') }}</p>
  </div>

  <div class="row q-col-gutter-md">
    <!-- Left Column: Input Form -->
    <div class="col-12 col-md-6">
      <q-card>
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ t('news.form.sectionTitle') }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <!-- Respiratory Rate -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">{{ t('news.form.respiratoryRate.label') }}</div>
            <q-btn-toggle
              v-model="scores.respiratoryRate"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: t('news.form.respiratoryRate.options.le8'), value: 3 },
                { label: t('news.form.respiratoryRate.options.range9_11'), value: 1 },
                { label: t('news.form.respiratoryRate.options.range12_20'), value: 0 },
                { label: t('news.form.respiratoryRate.options.range21_24'), value: 2 },
                { label: t('news.form.respiratoryRate.options.ge25'), value: 3 },
              ]"
            />
          </div>

          <!-- Oxygen Saturation -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">{{ t('news.form.oxygenSaturation.label') }}</div>
            <q-btn-toggle
              v-model="scores.oxygenSaturation"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: t('news.form.oxygenSaturation.options.le91'), value: 3 },
                { label: t('news.form.oxygenSaturation.options.range92_93'), value: 2 },
                { label: t('news.form.oxygenSaturation.options.range94_95'), value: 1 },
                { label: t('news.form.oxygenSaturation.options.ge96'), value: 0 },
              ]"
            />
          </div>

          <!-- Supplemental Oxygen -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">{{ t('news.form.oxygenTherapy.label') }}</div>
            <q-btn-toggle
              v-model="scores.oxygenTherapy"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: t('news.form.oxygenTherapy.options.no'), value: 0 },
                { label: t('news.form.oxygenTherapy.options.yes'), value: 2 },
              ]"
            />
          </div>

          <!-- Temperature -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">{{ t('news.form.temperature.label') }}</div>
            <q-btn-toggle
              v-model="scores.temperature"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: t('news.form.temperature.options.le35'), value: 3 },
                { label: t('news.form.temperature.options.range35_1_36'), value: 1 },
                { label: t('news.form.temperature.options.range36_1_38'), value: 0 },
                { label: t('news.form.temperature.options.range38_1_39'), value: 1 },
                { label: t('news.form.temperature.options.ge39_1'), value: 2 },
              ]"
            />
          </div>

          <!-- Systolic BP -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">{{ t('news.form.systolicBP.label') }}</div>
            <q-btn-toggle
              v-model="scores.systolicBP"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: t('news.form.systolicBP.options.le90'), value: 3 },
                { label: t('news.form.systolicBP.options.range91_100'), value: 2 },
                { label: t('news.form.systolicBP.options.range101_110'), value: 1 },
                { label: t('news.form.systolicBP.options.range111_219'), value: 0 },
                { label: t('news.form.systolicBP.options.ge220'), value: 3 },
              ]"
            />
          </div>

          <!-- Heart Rate -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">{{ t('news.form.heartRate.label') }}</div>
            <q-btn-toggle
              v-model="scores.heartRate"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: t('news.form.heartRate.options.le40'), value: 3 },
                { label: t('news.form.heartRate.options.range41_50'), value: 1 },
                { label: t('news.form.heartRate.options.range51_90'), value: 0 },
                { label: t('news.form.heartRate.options.range91_110'), value: 1 },
                { label: t('news.form.heartRate.options.range111_130'), value: 2 },
                { label: t('news.form.heartRate.options.ge131'), value: 3 },
              ]"
            />
          </div>

          <!-- Level of Consciousness -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">{{ t('news.form.consciousness.label') }}</div>
            <q-btn-toggle
              v-model="scores.consciousness"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: t('news.form.consciousness.options.alert'), value: 0 },
                { label: t('news.form.consciousness.options.vpu'), value: 3 },
              ]"
            />
          </div>

          <!-- Reset Button -->
          <div class="q-mt-lg">
            <q-btn
              @click="resetForm"
              :label="t('news.buttons.reset')"
              icon="refresh"
              color="negative"
              outline
              class="full-width"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Right Column: Results -->
    <div class="col-12 col-md-6">
      <q-card>
        <q-card-section :class="`bg-${getScoreColor(totalScore)} text-white`">
          <div class="text-h3 text-center">{{ totalScore }}</div>
          <div class="text-h6 text-center">{{ t(getScoreInterpretationKey(totalScore)) }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('news.results.clinicalActionsTitle') }}</div>
          <q-banner class="bg-grey-2" rounded>
            <template v-slot:avatar>
              <q-icon name="medical_services" :color="getScoreColor(totalScore)" />
            </template>
            <div class="text-body2">{{ t(getClinicalActionsKey(totalScore)) }}</div>
          </q-banner>

          <!-- Score Breakdown -->
          <q-expansion-item
            icon="bar_chart"
            :label="t('news.breakdown.title')"
            class="text-primary q-mt-md"
          >
            <div class="q-pa-md bg-grey-1">
              <div class="row q-gutter-sm">
                <div class="col-12">
                  <q-linear-progress
                    :value="scores.respiratoryRate / 3"
                    color="cyan"
                    class="q-mb-xs"
                  />
                  <div class="text-caption">
                    {{ t('news.breakdown.respiratoryRate', { score: scores.respiratoryRate }) }}
                  </div>
                </div>
                <div class="col-12">
                  <q-linear-progress
                    :value="scores.oxygenSaturation / 3"
                    color="red"
                    class="q-mb-xs"
                  />
                  <div class="text-caption">
                    {{ t('news.breakdown.oxygenSaturation', { score: scores.oxygenSaturation }) }}
                  </div>
                </div>
                <div class="col-12">
                  <q-linear-progress
                    :value="scores.oxygenTherapy / 2"
                    color="blue"
                    class="q-mb-xs"
                  />
                  <div class="text-caption">
                    {{ t('news.breakdown.oxygenTherapy', { score: scores.oxygenTherapy }) }}
                  </div>
                </div>
                <div class="col-12">
                  <q-linear-progress
                    :value="scores.temperature / 3"
                    color="orange"
                    class="q-mb-xs"
                  />
                  <div class="text-caption">
                    {{ t('news.breakdown.temperature', { score: scores.temperature }) }}
                  </div>
                </div>
                <div class="col-12">
                  <q-linear-progress :value="scores.systolicBP / 3" color="red" class="q-mb-xs" />
                  <div class="text-caption">
                    {{ t('news.breakdown.systolicBP', { score: scores.systolicBP }) }}
                  </div>
                </div>
                <div class="col-12">
                  <q-linear-progress :value="scores.heartRate / 3" color="pink" class="q-mb-xs" />
                  <div class="text-caption">
                    {{ t('news.breakdown.heartRate', { score: scores.heartRate }) }}
                  </div>
                </div>
                <div class="col-12">
                  <q-linear-progress
                    :value="scores.consciousness / 3"
                    color="purple"
                    class="q-mb-xs"
                  />
                  <div class="text-caption">
                    {{ t('news.breakdown.consciousness', { score: scores.consciousness }) }}
                  </div>
                </div>
              </div>
            </div>
          </q-expansion-item>

          <!-- Monitoring Frequency -->
          <q-expansion-item
            icon="schedule"
            :label="t('news.monitoring.title')"
            class="text-primary q-mt-sm"
          >
            <div class="q-pa-md bg-blue-1">
              <ul class="q-ma-none text-body2">
                <li>{{ t('news.monitoring.score0') }}</li>
                <li>{{ t('news.monitoring.score1_4') }}</li>
                <li>{{ t('news.monitoring.score5_6') }}</li>
                <li>{{ t('news.monitoring.score7plus') }}</li>
              </ul>
            </div>
          </q-expansion-item>

          <!-- ============================================================ -->
          <!-- PROFESSIONAL DOCUMENTATION: 9 EXPANSION SECTIONS -->
          <!-- ============================================================ -->

          <!-- DEFINITION AND CLINICAL SIGNIFICANCE -->
          <q-expansion-item
            icon="info"
            :label="t('news.sections.definition.title')"
            header-class="bg-blue-1 text-primary"
            class="q-mt-md"
          >
            <q-card flat class="q-pa-md bg-blue-1">
              <div class="text-body2">
                <p class="q-mb-sm" v-html="t('news.sections.definition.newsDefinition')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.definition.objectives')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.definition.whenToUse')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.definition.whenNotToUse')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.definition.limitations')"></p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- PHYSIOLOGY OF VITAL SIGNS -->
          <q-expansion-item
            icon="science"
            :label="t('news.sections.physiology.title')"
            header-class="bg-green-1 text-green-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-green-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  {{ t('news.sections.physiology.title') }}
                </p>
                <p class="q-mb-sm" v-html="t('news.sections.physiology.respiratoryRate')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.physiology.oxygenSaturation')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.physiology.supplementalOxygen')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.physiology.temperature')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.physiology.systolicBP')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.physiology.heartRate')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.physiology.consciousness')"></p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- HOW TO CALCULATE NEWS -->
          <q-expansion-item
            icon="calculate"
            :label="t('news.sections.evaluation.title')"
            header-class="bg-amber-1 text-amber-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-amber-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  {{ t('news.sections.evaluation.title') }}
                </p>
                <p class="q-mb-sm" v-html="t('news.sections.evaluation.requiredParameters')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.evaluation.step1')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.evaluation.step2')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.evaluation.step3')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.evaluation.step4')"></p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- FORMULA AND SCORING TABLES -->
          <q-expansion-item
            icon="table_chart"
            :label="t('news.sections.formula.title')"
            header-class="bg-cyan-1 text-cyan-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-cyan-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  {{ t('news.sections.formula.title') }}
                </p>
                <p class="q-mb-sm">
                  <strong>{{ t('news.sections.formula.mainFormula') }}</strong>
                </p>
                <p class="q-mb-sm">{{ t('news.sections.formula.explanation') }}</p>
                <ul class="q-pl-md">
                  <li>{{ t('news.sections.formula.respiratoryRate') }}</li>
                  <li>{{ t('news.sections.formula.oxygenSaturation') }}</li>
                  <li>{{ t('news.sections.formula.oxygenTherapy') }}</li>
                  <li>{{ t('news.sections.formula.temperature') }}</li>
                  <li>{{ t('news.sections.formula.systolicBP') }}</li>
                  <li>{{ t('news.sections.formula.heartRate') }}</li>
                  <li>{{ t('news.sections.formula.consciousness') }}</li>
                </ul>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- CLINICAL INTERPRETATION -->
          <q-expansion-item
            icon="assignment"
            :label="t('news.sections.clinicalInterpretation.title')"
            header-class="bg-orange-1 text-orange-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-orange-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  {{ t('news.sections.clinicalInterpretation.title') }}
                </p>
                <p class="q-mb-sm" v-html="t('news.sections.clinicalInterpretation.score0')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.clinicalInterpretation.score1_4')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.clinicalInterpretation.score5_6')"></p>
                <p
                  class="q-mb-sm"
                  v-html="t('news.sections.clinicalInterpretation.score7plus')"
                ></p>
                <p class="q-mb-sm" v-html="t('news.sections.clinicalInterpretation.redFlags')"></p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- CLINICAL APPLICATIONS -->
          <q-expansion-item
            icon="medical_services"
            :label="t('news.sections.clinicalApplications.title')"
            header-class="bg-purple-1 text-purple-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-purple-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  {{ t('news.sections.clinicalApplications.title') }}
                </p>
                <p class="q-mb-sm" v-html="t('news.sections.clinicalApplications.sepsis')"></p>
                <p
                  class="q-mb-sm"
                  v-html="t('news.sections.clinicalApplications.postOperative')"
                ></p>
                <p
                  class="q-mb-sm"
                  v-html="t('news.sections.clinicalApplications.emergencyDepartment')"
                ></p>
                <p
                  class="q-mb-sm"
                  v-html="t('news.sections.clinicalApplications.rapidResponse')"
                ></p>
                <p class="q-mb-sm" v-html="t('news.sections.clinicalApplications.covid19')"></p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- REFERENCE VALUES AND ALERTS -->
          <q-expansion-item
            icon="warning"
            :label="t('news.sections.referenceValues.title')"
            header-class="bg-red-1 text-red-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-red-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  {{ t('news.sections.referenceValues.title') }}
                </p>
                <p class="q-mb-sm" v-html="t('news.sections.referenceValues.normalRanges')"></p>
                <p
                  class="q-mb-sm"
                  v-html="t('news.sections.referenceValues.criticalThresholds')"
                ></p>
                <p
                  class="q-mb-sm"
                  v-html="t('news.sections.referenceValues.specialPopulations')"
                ></p>
                <p class="q-mb-sm" v-html="t('news.sections.referenceValues.monitoringTiming')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.referenceValues.criticalAlerts')"></p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- MEDICAL DOCUMENTATION AND GUIDELINES -->
          <q-expansion-item
            icon="description"
            :label="t('news.sections.documentation.title')"
            header-class="bg-indigo-1 text-indigo-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-indigo-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  {{ t('news.sections.documentation.title') }}
                </p>
                <p class="q-mb-sm" v-html="t('news.sections.documentation.royalCollege')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.documentation.news2')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.documentation.nice')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.documentation.survivingSepsis')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.documentation.nhs')"></p>
                <p class="q-mb-sm" v-html="t('news.sections.documentation.erc')"></p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- SCIENTIFIC REFERENCES (PMID) -->
          <q-expansion-item
            icon="menu_book"
            :label="t('news.sections.bibliography.title')"
            header-class="bg-teal-1 text-teal-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-teal-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  {{ t('news.sections.bibliography.title') }}
                </p>
                <ul class="q-pl-md">
                  <li class="q-mb-sm" v-html="t('news.sections.bibliography.smith2013')"></li>
                  <li class="q-mb-sm" v-html="t('news.sections.bibliography.abbott2018')"></li>
                  <li class="q-mb-sm" v-html="t('news.sections.bibliography.keep2016')"></li>
                  <li class="q-mb-sm" v-html="t('news.sections.bibliography.pimentel2019')"></li>
                  <li class="q-mb-sm" v-html="t('news.sections.bibliography.churpek2016')"></li>
                  <li class="q-mb-sm" v-html="t('news.sections.bibliography.subbe2017')"></li>
                </ul>
              </div>
            </q-card>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <!-- Clinical Disclaimer -->
  <div class="q-mt-lg">
    <q-banner class="bg-orange-1" rounded>
      <template v-slot:avatar>
        <q-icon name="warning" color="warning" />
      </template>
      <div class="text-caption">
        <strong>{{ t('news.disclaimer.title') }}</strong> {{ t('news.disclaimer.text') }}
      </div>
    </q-banner>
  </div>
</template>

<style scoped>
.q-linear-progress {
  height: 8px;
  border-radius: 4px;
}
</style>
