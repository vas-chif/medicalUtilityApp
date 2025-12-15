<!-- GCSCalculator.vue -->
<script setup lang="ts">
/**
 * @file GCSCalculator.vue
 * @description Calcolatore Glasgow Coma Scale (GCS) - Valutazione neurologica livello coscienza
 * @author Vasile Chifeac
 * @created 2025-01-06
 * @modified 2025-12-13
 *
 * @description
 * Componente per calcolo Glasgow Coma Scale (GCS). Sistema standardizzato valutazione
 * neurologica livello coscienza sviluppato 1974 da Teasdale & Jennett (Glasgow, Scozia).
 * Valuta 3 componenti: Eye opening (1-4), Verbal response (1-5), Motor response (1-6).
 * Punteggio totale 3-15: 13-15 TBI lieve, 9-12 moderato, 3-8 severo/coma.
 * Gold standard mondiale valutazione neurologica acuta (trauma, stroke, coma).
 *
 * @implements {useI18n} Composable per traduzioni bilingue IT/EN
 * @implements {useSecureLogger} Composable GDPR-compliant structured logging
 * @implements {useSmartEnvironment} Composable environment detection (dev/staging/prod)
 *
 * @references
 * - Teasdale G, Jennett B. (1974) "Assessment of coma and impaired consciousness" Lancet 2(7872):81-84. PMID: 4136544
 * - Marmarou A, et al. (1991) "Impact of ICP instability and hypotension on outcome" J Neurosurg 75:S59-S66
 * - MRC CRASH Trial Collaborators. (2008) "Predicting outcome after TBI" BMJ 336(7641):425-429. PMID: 18270239
 * - Reith FC, et al. (2016) "Reliability of GCS in TBI" Acta Neurochir 158:123-129
 */

import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSecureLogger } from 'src/composables/useSecureLogger';
import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';

// ============================================================
// COMPOSABLES
// ============================================================

// i18n translations
const { t } = useI18n({ useScope: 'global' });

// GDPR-compliant logging
const logger = useSecureLogger();

// Environment detection (for future debug/dev-only features)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const env = useSmartEnvironment();

// ============================================================
// TYPES & INTERFACES
// ============================================================
interface GCSScores {
  eye: number;
  verbal: number;
  motor: number;
}

// ============================================================
// STATE
// ============================================================
const initialScores: GCSScores = {
  eye: 4,
  verbal: 5,
  motor: 6,
};

const scores = ref<GCSScores>({ ...initialScores });

/**
 * Reset GCS form to initial values
 *
 * @description
 * Resets all 3 GCS components (Eye/Verbal/Motor) to maximum scores (E4V5M6 = 15).
 * Initial values represent normal consciousness state.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * resetForm(); // Resets to E4V5M6 (GCS 15 - normal consciousness)
 * ```
 */
const resetForm = (): void => {
  logger.info('GCS form reset to initial values', {
    component: 'GCSCalculator',
    action: 'resetForm',
    initialScores,
  });
  scores.value = { ...initialScores };
};

// ============================================================
// COMPUTED
// ============================================================
/**
 * Calculate total GCS score
 * @returns Total score (3-15)
 */
const totalScore = computed(() => {
  return scores.value.eye + scores.value.verbal + scores.value.motor;
});

// ============================================================
// FUNCTIONS
// ============================================================

/**
 * Get score color based on TBI severity (Quasar theme colors)
 *
 * @description
 * Returns Quasar color name for visual indication of TBI severity based on GCS score.
 * Color coding follows international guidelines:
 * - Green (GCS 13-15): Mild TBI - Good prognosis
 * - Orange (GCS 9-12): Moderate TBI - Requires monitoring
 * - Red (GCS 3-8): Severe TBI/Coma - Critical condition
 *
 * @param {number} score - GCS total score (3-15)
 * @returns {string} Quasar color name ('green' | 'orange' | 'red')
 *
 * @example
 * ```typescript
 * getScoreColor(15); // Returns 'green' (Mild TBI)
 * getScoreColor(10); // Returns 'orange' (Moderate TBI)
 * getScoreColor(5);  // Returns 'red' (Severe TBI)
 * ```
 *
 * @see {@link https://quasar.dev/style/color-palette Quasar Color Palette}
 */
const getScoreColor = (score: number): string => {
  if (score >= 13) return 'green'; // Mild TBI (GCS 13-15)
  if (score >= 9) return 'orange'; // Moderate TBI (GCS 9-12)
  return 'red'; // Severe TBI / Coma (GCS 3-8)
};

/**
 * Get score interpretation key for i18n translation lookup
 *
 * @description
 * Returns i18n translation key for GCS score interpretation based on TBI severity.
 * Classification follows WHO/NIH TBI severity guidelines:
 * - Mild (GCS 13-15): 80% TBI cases, &lt;1% mortality
 * - Moderate (GCS 9-12): 10% TBI cases, 5-10% mortality
 * - Severe (GCS 3-8): 10% TBI cases, 30-50% mortality
 *
 * @param {number} score - GCS total score (3-15)
 * @returns {string} i18n key for translation lookup ('gcs.interpretation.mild' | 'moderate' | 'severe')
 *
 * @example
 * ```typescript
 * getScoreInterpretation(14); // Returns 'gcs.interpretation.mild'
 * const text = t(getScoreInterpretation(14)); // 'TBI Lieve - Commozione' (IT) or 'Mild TBI - Concussion' (EN)
 * ```
 *
 * @see {@link https://www.who.int/publications WHO TBI Classification}
 */
const getScoreInterpretation = (score: number): string => {
  if (score >= 13) return 'gcs.interpretation.mild';
  if (score >= 9) return 'gcs.interpretation.moderate';
  return 'gcs.interpretation.severe';
};

/**
 * Get TBI severity description key for detailed clinical information
 *
 * @description
 * Returns i18n translation key for detailed TBI severity description based on GCS score.
 * Includes clinical context, prognosis, and management considerations.
 * Maps to 4 severity levels:
 * - GCS 15: Normal consciousness
 * - GCS 13-15: Mild TBI (commozione, complete recovery expected)
 * - GCS 9-12: Moderate TBI (letargia, 10-20% deterioration risk, ICU monitoring)
 * - GCS 3-8: Severe TBI/Coma (intubation required, high mortality/morbidity)
 *
 * @param {number} score - GCS total score (3-15)
 * @returns {string} i18n key for severity description ('gcs.severity.gcs15' | 'mild' | 'moderate' | 'severe')
 *
 * @example
 * ```typescript
 * getTBISeverity(15); // Returns 'gcs.severity.gcs15'
 * const text = t(getTBISeverity(15)); // 'GCS 15: Completamente sveglio e orientato...' (IT)
 * ```
 *
 * @references
 * - Brain Trauma Foundation Guidelines (2016): Severe TBI management
 * - NICE Head Injury Guidelines (2023): CT cranio indications
 */
const getTBISeverity = (score: number): string => {
  if (score === 15) {
    return 'GCS 15: Completamente sveglio e orientato. Nessun deficit neurologico evidente.';
  }
  if (score >= 13) {
    return 'GCS 13-15: Trauma Cranico LIEVE. Commozione cerebrale, possibile perdita memoria breve termine o difficoltà concentrazione. Recupero neurologico completo atteso.';
  }
  if (score >= 9) {
    return 'GCS 9-12: Trauma Cranico MODERATO. Paziente letargico o stuporoso. 10-20% rischio deterioramento in coma. Necessario ricovero e monitoraggio continuo.';
  }
  return 'GCS 3-8: Trauma Cranico SEVERO (COMA). Paziente non apre occhi, non obbedisce comandi, non pronuncia parole. Alta probabilità necessità intubazione e ventilazione meccanica. Massimo rischio mortalità e morbidità.';
};
</script>

<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="psychology" color="blue" />
      </template>
      <div class="text-body2">
        <strong>{{ t('gcs.banner.title') }}</strong> {{ t('gcs.banner.description') }}
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <!-- Eye Opening (E) -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="visibility" color="blue" size="xs" class="q-mr-xs" />
                {{ t('gcs.parameters.eye.title') }}
              </div>
              <q-option-group
                v-model="scores.eye"
                :options="[
                  { label: t('gcs.parameters.eye.options.score4'), value: 4 },
                  { label: t('gcs.parameters.eye.options.score3'), value: 3 },
                  { label: t('gcs.parameters.eye.options.score2'), value: 2 },
                  { label: t('gcs.parameters.eye.options.score1'), value: 1 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- Verbal Response (V) -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="record_voice_over" color="green" size="xs" class="q-mr-xs" />
                {{ t('gcs.parameters.verbal.title') }}
              </div>
              <q-option-group
                v-model="scores.verbal"
                :options="[
                  { label: t('gcs.parameters.verbal.options.score5'), value: 5 },
                  { label: t('gcs.parameters.verbal.options.score4'), value: 4 },
                  { label: t('gcs.parameters.verbal.options.score3'), value: 3 },
                  { label: t('gcs.parameters.verbal.options.score2'), value: 2 },
                  { label: t('gcs.parameters.verbal.options.score1'), value: 1 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- Motor Response (M) -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="accessibility_new" color="orange" size="xs" class="q-mr-xs" />
                {{ t('gcs.parameters.motor.title') }}
              </div>
              <q-option-group
                v-model="scores.motor"
                :options="[
                  { label: t('gcs.parameters.motor.options.score6'), value: 6 },
                  { label: t('gcs.parameters.motor.options.score5'), value: 5 },
                  { label: t('gcs.parameters.motor.options.score4'), value: 4 },
                  { label: t('gcs.parameters.motor.options.score3'), value: 3 },
                  { label: t('gcs.parameters.motor.options.score2'), value: 2 },
                  { label: t('gcs.parameters.motor.options.score1'), value: 1 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- Bottoni -->
            <q-btn
              @click="resetForm"
              color="negative"
              size="sm"
              class="full-width"
              icon="refresh"
              outline
            >
              {{ t('gcs.buttons.reset') }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="analytics" class="q-mr-xs" />
              {{ t('gcs.results.title') }}
            </div>

            <!-- Score Totale -->
            <div class="text-center q-mb-md">
              <div class="text-h3" :class="`text-${getScoreColor(totalScore)}`">
                {{ totalScore }}
              </div>
              <div class="text-caption text-grey-7">{{ t('gcs.results.totalScore') }}</div>
              <div class="text-caption text-grey-6 q-mt-xs">
                E{{ scores.eye }} V{{ scores.verbal }} M{{ scores.motor }}
              </div>
            </div>

            <!-- Interpretazione -->
            <q-chip
              :color="getScoreColor(totalScore)"
              text-color="white"
              class="full-width text-center q-mb-sm"
            >
              {{ t(getScoreInterpretation(totalScore)) }}
            </q-chip>

            <!-- Progress Bar -->
            <q-linear-progress
              :value="(totalScore - 3) / 12"
              :color="getScoreColor(totalScore)"
              size="12px"
              class="q-mb-md"
            />

            <!-- Severità TBI (risultato dinamico) -->
            <q-expansion-item
              icon="local_hospital"
              :label="t('gcs.sections.severityTBI.title')"
              class="q-mt-sm"
              header-class="bg-grey-3 text-grey-9"
              default-opened
            >
              <q-card class="q-pa-md bg-grey-1">
                <div class="text-body2">
                  {{ t(getTBISeverity(totalScore)) }}
                </div>
              </q-card>
            </q-expansion-item>

            <!-- Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              :label="t('gcs.sections.definition.title')"
              class="q-mt-sm"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-md">
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.definition.mainText')"
                ></div>
                <div class="text-body2" v-html="t('gcs.sections.definition.applications')"></div>
              </q-card>
            </q-expansion-item>

            <!-- Fisiologia e Meccanismi -->
            <q-expansion-item
              icon="science"
              :label="t('gcs.sections.physiology.title')"
              class="q-mt-sm"
              header-class="bg-green-1 text-green-9"
            >
              <q-card class="q-pa-md">
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.physiology.consciousness')"
                ></div>
                <div class="text-body2" v-html="t('gcs.sections.physiology.neuralPathways')"></div>
              </q-card>
            </q-expansion-item>

            <!-- Come si Valuta -->
            <q-expansion-item
              icon="calculate"
              :label="t('gcs.sections.evaluation.title')"
              class="q-mt-sm"
              header-class="bg-amber-1 text-amber-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm" v-html="t('gcs.sections.evaluation.timing')"></div>
                <div class="text-body2 q-mb-sm" v-html="t('gcs.sections.evaluation.stimuli')"></div>
                <div class="text-body2" v-html="t('gcs.sections.evaluation.operators')"></div>
              </q-card>
            </q-expansion-item>

            <!-- Formula e Componenti -->
            <q-expansion-item
              icon="functions"
              :label="t('gcs.sections.formula.title')"
              class="q-mt-sm"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-center text-weight-bold q-mb-md">
                  {{ t('gcs.sections.formula.mainFormula') }}
                </div>
                <div class="text-body2 q-mb-sm" v-html="t('gcs.sections.formula.eye')"></div>
                <div class="text-body2 q-mb-sm" v-html="t('gcs.sections.formula.verbal')"></div>
                <div class="text-body2 q-mb-sm" v-html="t('gcs.sections.formula.motor')"></div>
                <div class="text-body2" v-html="t('gcs.sections.formula.range')"></div>
              </q-card>
            </q-expansion-item>

            <!-- Interpretazione Clinica -->
            <q-expansion-item
              icon="psychology"
              :label="t('gcs.sections.clinicalInterpretation.title')"
              class="q-mt-sm"
              header-class="bg-orange-1 text-orange-9"
            >
              <q-card class="q-pa-md">
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.clinicalInterpretation.gcs15')"
                ></div>
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.clinicalInterpretation.mild')"
                ></div>
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.clinicalInterpretation.moderate')"
                ></div>
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.clinicalInterpretation.severe')"
                ></div>
                <div
                  class="text-body2"
                  v-html="t('gcs.sections.clinicalInterpretation.gcs3')"
                ></div>
              </q-card>
            </q-expansion-item>

            <!-- Applicazioni Cliniche -->
            <q-expansion-item
              icon="medical_services"
              :label="t('gcs.sections.clinicalApplications.title')"
              class="q-mt-sm"
              header-class="bg-purple-1 text-purple-9"
            >
              <q-card class="q-pa-md">
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.clinicalApplications.triage')"
                ></div>
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.clinicalApplications.monitoring')"
                ></div>
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.clinicalApplications.prognosis')"
                ></div>
                <div
                  class="text-body2"
                  v-html="t('gcs.sections.clinicalApplications.research')"
                ></div>
              </q-card>
            </q-expansion-item>

            <!-- Valori di Riferimento e Alert -->
            <q-expansion-item
              icon="warning"
              :label="t('gcs.sections.referenceValues.title')"
              class="q-mt-sm"
              header-class="bg-red-1 text-red-9"
            >
              <q-card class="q-pa-md">
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.referenceValues.classification')"
                ></div>
                <div
                  class="text-body2 q-mb-sm text-weight-bold text-red-9"
                  v-html="t('gcs.sections.referenceValues.criticalAlerts')"
                ></div>
                <div
                  class="text-body2"
                  v-html="t('gcs.sections.referenceValues.limitations')"
                ></div>
              </q-card>
            </q-expansion-item>

            <!-- Documentazione Medica e Linee Guida -->
            <q-expansion-item
              icon="menu_book"
              :label="t('gcs.sections.documentation.title')"
              class="q-mt-sm"
              header-class="bg-indigo-1 text-indigo-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm" v-html="t('gcs.sections.documentation.nice')"></div>
                <div class="text-body2 q-mb-sm" v-html="t('gcs.sections.documentation.btf')"></div>
                <div class="text-body2 q-mb-sm" v-html="t('gcs.sections.documentation.who')"></div>
                <div class="text-body2" v-html="t('gcs.sections.documentation.atls')"></div>
              </q-card>
            </q-expansion-item>

            <!-- Riferimenti Scientifici PMID -->
            <q-expansion-item
              icon="library_books"
              :label="t('gcs.sections.bibliography.title')"
              class="q-mt-sm"
              header-class="bg-teal-1 text-teal-9"
            >
              <q-card class="q-pa-md">
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.bibliography.teasdale')"
                ></div>
                <div
                  class="text-body2 q-mb-sm"
                  v-html="t('gcs.sections.bibliography.marmarou')"
                ></div>
                <div class="text-body2 q-mb-sm" v-html="t('gcs.sections.bibliography.crash')"></div>
                <div class="text-body2 q-mb-sm" v-html="t('gcs.sections.bibliography.reith')"></div>
                <div class="text-body2 q-mb-sm" v-html="t('gcs.sections.bibliography.msd')"></div>
                <div class="text-body2" v-html="t('gcs.sections.bibliography.sciencedirect')"></div>
              </q-card>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-expansion-item {
  border-radius: 8px;
  overflow: hidden;
}
</style>
