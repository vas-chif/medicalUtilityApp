<!-- APGARScoreCalculator.vue -->
<script setup lang="ts">
/**
 * @file APGARScoreCalculator.vue
 * @description APGAR Score Calculator - Clinical assessment of newborn at birth
 * @author Vasile Chifeac
 * @created 2025-01-19
 * @modified 2025-12-12
 *
 * @example
 * <APGARScoreCalculator />
 *
 * @notes
 * - Supports evaluation at 1, 5, and 10 minutes
 * - Bilingual support (IT/EN)
 * - Saves multiple evaluations
 * - Complies with WHO/AAP/AHA standards
 */

import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useResetForm } from 'src/composables/useResetForm';
import { useSecureLogger } from 'src/composables/useSecureLogger';
import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';

// ============================================================
// COMPOSABLES
// ============================================================
const { t } = useI18n({ useScope: 'global' });
const logger = useSecureLogger();
const { config: envConfig } = useSmartEnvironment();

// ============================================================
// TYPES & INTERFACES
// ============================================================
/**
 * APGAR Score parameters interface
 * Represents the 5 parameters evaluated in APGAR score assessment
 * @property {number} appearance - A: Appearance (skin color) - Score 0-2
 * @property {number} pulse - P: Pulse (heart rate) - Score 0-2
 * @property {number} grimace - G: Grimace (reflex irritability) - Score 0-2
 * @property {number} activity - A: Activity (muscle tone) - Score 0-2
 * @property {number} respiration - R: Respiration (breathing effort) - Score 0-2
 * @see {@link https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2770318/ | APGAR Score Original Study}
 */
interface APGARScores {
  appearance: number;
  pulse: number;
  grimace: number;
  activity: number;
  respiration: number;
}

/**
 * Saved APGAR evaluation interface
 * Stores complete APGAR evaluation data for a specific time point
 * @property {number} time - Evaluation time in minutes (1, 5, or 10)
 * @property {APGARScores} scores - Individual parameter scores
 * @property {number} total - Total APGAR score (0-10)
 * @property {Date} timestamp - Timestamp when evaluation was saved
 */
interface SavedAPGAR {
  time: number;
  scores: APGARScores;
  total: number;
  timestamp: Date;
}

// ============================================================
// STATE
// ============================================================
const initialScores: APGARScores = {
  appearance: 0,
  pulse: 0,
  grimace: 0,
  activity: 0,
  respiration: 0,
};

const scores = ref<APGARScores>({ ...initialScores });
const currentTime = ref<number>(1);
const savedScores = ref<SavedAPGAR[]>([]);

const { resetForm: resetScores } = useResetForm(scores, currentTime, initialScores);

/**
 * Reset form to initial state
 * Clears all APGAR scores, resets evaluation time to 1 minute, and removes saved evaluations
 * @example
 * resetForm(); // Clears all data and starts fresh evaluation
 */
const resetForm = () => {
  resetScores();
  currentTime.value = 1;
  savedScores.value = [];
};

const timeOptions = computed(() => [
  { label: t('apgar.evaluationTime.options.min1'), value: 1 },
  { label: t('apgar.evaluationTime.options.min5'), value: 5 },
  { label: t('apgar.evaluationTime.options.min10'), value: 10 },
]);

// ============================================================
// COMPUTED
// ============================================================
/**
 * Calculate total APGAR score
 * Sum of all 5 parameters (Appearance, Pulse, Grimace, Activity, Respiration)
 * @returns Total score (0-10 points)
 * @example
 * // With scores: appearance=2, pulse=2, grimace=2, activity=2, respiration=2
 * totalScore.value; // Returns 10
 */
const totalScore = computed(() => {
  return (
    scores.value.appearance +
    scores.value.pulse +
    scores.value.grimace +
    scores.value.activity +
    scores.value.respiration
  );
});

/**
 * Check if all APGAR parameters have been evaluated
 * @returns True if all scores are within valid range (0-2), false otherwise
 * @example
 * // All parameters scored
 * isFormComplete.value; // Returns true
 * // Some parameters not yet scored (undefined or out of range)
 * isFormComplete.value; // Returns false
 */
const isFormComplete = computed(() => {
  return Object.values(scores.value).every((score) => score >= 0 && score <= 2);
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Save current APGAR score evaluation
 * Records score for current time point and advances to next evaluation time
 */
const saveScore = (): void => {
  if (!isFormComplete.value) {
    logger.warn('Attempted to save incomplete APGAR score', {
      currentTime: currentTime.value,
      scores: scores.value,
    });
    return;
  }

  const newScore: SavedAPGAR = {
    time: currentTime.value,
    scores: { ...scores.value },
    total: totalScore.value,
    timestamp: new Date(),
  };

  // Remove existing score for this time point
  savedScores.value = savedScores.value.filter((s) => s.time !== currentTime.value);

  // Add new score
  savedScores.value.push(newScore);

  // Sort by time
  savedScores.value.sort((a, b) => a.time - b.time);

  logger.info('APGAR score saved', {
    time: currentTime.value,
    total: totalScore.value,
    interpretation: getScoreInterpretation(totalScore.value),
    isDevelopment: envConfig.isDevelopment,
  });

  // Advance to next evaluation time
  if (currentTime.value === 1) {
    currentTime.value = 5;
    resetCurrentScores();
  } else if (currentTime.value === 5) {
    currentTime.value = 10;
    resetCurrentScores();
  }
};

/**
 * Reset current scores to initial state
 * Used when advancing to next evaluation time
 */
const resetCurrentScores = (): void => {
  scores.value = { ...initialScores };
  logger.debug('APGAR scores reset', { time: currentTime.value });
};

/**
 * Get color code for APGAR score visualization
 * @param score - Total APGAR score (0-10)
 * @returns Color name for Quasar components
 */
const getScoreColor = (score: number): string => {
  if (score >= 7) return 'green';
  if (score >= 4) return 'orange';
  return 'red';
};

/**
 * Get clinical interpretation for APGAR score
 * @param score - Total APGAR score (0-10)
 * @returns Clinical interpretation text
 * @see {@link https://www.who.int/maternal_child_adolescent/documents/newborn-care-toolkit/en/ | WHO Newborn Care Toolkit}
 */
const getScoreInterpretation = (score: number): string => {
  if (score >= 7) return t('apgar.interpretation.normal');
  if (score >= 4) return t('apgar.interpretation.moderate');
  return t('apgar.interpretation.severe');
};
</script>

<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-pink-1 text-pink-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="child_care" color="pink" />
      </template>
      <div class="text-body2">
        <strong>{{ t('apgar.banner.title') }}</strong> {{ t('apgar.banner.description') }}
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <!-- Tempo valutazione -->
            <q-select
              v-model="currentTime"
              :options="timeOptions"
              :label="t('apgar.evaluationTime.label')"
              outlined
              dense
              class="q-mb-md"
              emit-value
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="schedule" color="blue" size="sm" />
              </template>
            </q-select>

            <q-separator class="q-mb-md" />

            <!-- A - Appearance -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="palette" color="pink" size="xs" class="q-mr-xs" />
                {{ t('apgar.parameters.appearance.title') }}
              </div>
              <q-option-group
                v-model="scores.appearance"
                :options="[
                  { label: t('apgar.parameters.appearance.score0'), value: 0 },
                  { label: t('apgar.parameters.appearance.score1'), value: 1 },
                  { label: t('apgar.parameters.appearance.score2'), value: 2 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- P - Pulse -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="favorite" color="red" size="xs" class="q-mr-xs" />
                {{ t('apgar.parameters.pulse.title') }}
              </div>
              <q-option-group
                v-model="scores.pulse"
                :options="[
                  { label: t('apgar.parameters.pulse.score0'), value: 0 },
                  { label: t('apgar.parameters.pulse.score1'), value: 1 },
                  { label: t('apgar.parameters.pulse.score2'), value: 2 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- G - Grimace -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="sentiment_neutral" color="orange" size="xs" class="q-mr-xs" />
                {{ t('apgar.parameters.grimace.title') }}
              </div>
              <q-option-group
                v-model="scores.grimace"
                :options="[
                  { label: t('apgar.parameters.grimace.score0'), value: 0 },
                  { label: t('apgar.parameters.grimace.score1'), value: 1 },
                  { label: t('apgar.parameters.grimace.score2'), value: 2 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- A - Activity -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="accessibility" color="green" size="xs" class="q-mr-xs" />
                {{ t('apgar.parameters.activity.title') }}
              </div>
              <q-option-group
                v-model="scores.activity"
                :options="[
                  { label: t('apgar.parameters.activity.score0'), value: 0 },
                  { label: t('apgar.parameters.activity.score1'), value: 1 },
                  { label: t('apgar.parameters.activity.score2'), value: 2 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- R - Respiration -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="air" color="cyan" size="xs" class="q-mr-xs" />
                {{ t('apgar.parameters.respiration.title') }}
              </div>
              <q-option-group
                v-model="scores.respiration"
                :options="[
                  { label: t('apgar.parameters.respiration.score0'), value: 0 },
                  { label: t('apgar.parameters.respiration.score1'), value: 1 },
                  { label: t('apgar.parameters.respiration.score2'), value: 2 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- Bottoni -->
            <q-btn
              @click="saveScore"
              color="primary"
              :size="$q.screen.xs ? 'sm' : 'md'"
              class="full-width q-mb-xs"
              icon="save"
              :disable="!isFormComplete"
            >
              {{ t('apgar.buttons.save', { time: currentTime }) }}
            </q-btn>

            <q-btn
              @click="resetForm"
              color="negative"
              size="sm"
              class="full-width"
              icon="refresh"
              outline
            >
              {{ t('apgar.buttons.reset') }}
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
              {{ t('apgar.results.title') }}
            </div>

            <!-- Score Corrente -->
            <div class="text-center q-mb-md">
              <div class="text-h3" :class="`text-${getScoreColor(totalScore)}`">
                {{ totalScore }}
              </div>
              <div class="text-caption text-grey-7">{{ t('apgar.results.totalScore') }}</div>
            </div>

            <!-- Interpretazione -->
            <q-chip
              :color="getScoreColor(totalScore)"
              text-color="white"
              class="full-width text-center q-mb-sm"
            >
              {{ getScoreInterpretation(totalScore) }}
            </q-chip>

            <!-- Progress Bar -->
            <q-linear-progress
              :value="totalScore / 10"
              :color="getScoreColor(totalScore)"
              size="12px"
              class="q-mb-md"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- Definizione e Significato Clinico -->
    <q-expansion-item
      icon="info"
      :label="t('apgar.sections.definition.title')"
      class="q-mt-sm"
      header-class="bg-blue-1 text-blue-9"
    >
      <q-card class="bg-blue-1 q-pa-md">
        <div class="text-body2" v-html="t('apgar.sections.definition.content')"></div>
      </q-card>
    </q-expansion-item>

    <!-- Score Salvati -->
    <q-expansion-item
      v-if="savedScores.length > 0"
      icon="history"
      :label="t('apgar.sections.savedEvaluations.title')"
      class="q-mt-sm"
      header-class="bg-grey-3 text-grey-9"
    >
      <q-card class="q-pa-md bg-grey-1">
        <q-list dense>
          <q-item v-for="saved in savedScores" :key="saved.time">
            <q-item-section avatar>
              <q-chip :color="getScoreColor(saved.total)" text-color="white" dense>
                {{ t('apgar.sections.savedEvaluations.timeLabel', { time: saved.time }) }}
              </q-chip>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">
                {{ t('apgar.sections.savedEvaluations.scoreLabel', { score: saved.total }) }}
              </q-item-label>
              <q-item-label caption>
                {{ getScoreInterpretation(saved.total) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-expansion-item>

    <!-- Fisiologia e Meccanismi -->
    <q-expansion-item
      icon="science"
      :label="t('apgar.sections.physiology.title')"
      class="q-mt-sm"
      header-class="bg-green-1 text-green-9"
    >
      <q-card class="bg-green-1 q-pa-md">
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.physiology.respiratory.title') }}</strong>
          {{ t('apgar.sections.physiology.respiratory.text') }}
        </div>
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.physiology.cardiovascular.title') }}</strong>
          {{ t('apgar.sections.physiology.cardiovascular.text') }}
        </div>
        <div class="text-body2">
          <strong>{{ t('apgar.sections.physiology.cns.title') }}</strong>
          {{ t('apgar.sections.physiology.cns.text') }}
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Come si Calcola -->
    <q-expansion-item
      icon="calculate"
      :label="t('apgar.sections.evaluation.title')"
      class="q-mt-sm"
      header-class="bg-amber-1 text-amber-9"
    >
      <q-card class="bg-amber-1 q-pa-md">
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.evaluation.timing.title') }}</strong>
          {{ t('apgar.sections.evaluation.timing.text') }}
        </div>
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.evaluation.methods.title') }}</strong>
          {{ t('apgar.sections.evaluation.methods.text') }}
        </div>
        <div class="text-body2">
          <strong>{{ t('apgar.sections.evaluation.operators.title') }}</strong>
          {{ t('apgar.sections.evaluation.operators.text') }}
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Formula e Componenti -->
    <q-expansion-item
      icon="functions"
      :label="t('apgar.sections.formula.title')"
      class="q-mt-sm"
      header-class="bg-cyan-1 text-cyan-9"
    >
      <q-card class="bg-cyan-1 q-pa-md">
        <div class="text-body2 text-weight-bold text-center q-mb-md">
          {{ t('apgar.sections.formula.mainFormula') }}
        </div>
        <q-list dense separator>
          <q-item>
            <q-item-section>
              <q-item-label
                ><div v-html="t('apgar.sections.formula.appearance')"></div
              ></q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label><div v-html="t('apgar.sections.formula.pulse')"></div></q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label><div v-html="t('apgar.sections.formula.grimace')"></div></q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label><div v-html="t('apgar.sections.formula.activity')"></div></q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label
                ><div v-html="t('apgar.sections.formula.respiration')"></div
              ></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-expansion-item>

    <!-- Interpretazione Clinica -->
    <q-expansion-item
      icon="psychology"
      :label="t('apgar.sections.clinicalInterpretation.title')"
      class="q-mt-sm"
      header-class="bg-orange-1 text-orange-9"
    >
      <q-card class="bg-orange-1 q-pa-md">
        <q-list separator>
          <q-item class="bg-green-1">
            <q-item-section>
              <q-item-label class="text-weight-bold text-green-9">
                {{ t('apgar.sections.clinicalInterpretation.normal.title') }}
              </q-item-label>
              <q-item-label class="q-mt-xs">
                <div
                  v-html="
                    t('apgar.sections.clinicalInterpretation.normal.significance') +
                    ' ' +
                    t('apgar.sections.clinicalInterpretation.normal.action')
                  "
                ></div>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="bg-orange-2 q-mt-sm">
            <q-item-section>
              <q-item-label class="text-weight-bold text-orange-9">
                {{ t('apgar.sections.clinicalInterpretation.moderate.title') }}
              </q-item-label>
              <q-item-label class="q-mt-xs">
                <div
                  v-html="
                    t('apgar.sections.clinicalInterpretation.moderate.significance') +
                    ' ' +
                    t('apgar.sections.clinicalInterpretation.moderate.action')
                  "
                ></div>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="bg-red-2 q-mt-sm">
            <q-item-section>
              <q-item-label class="text-weight-bold text-red-9">
                {{ t('apgar.sections.clinicalInterpretation.severe.title') }}
              </q-item-label>
              <q-item-label class="q-mt-xs">
                <div
                  v-html="
                    t('apgar.sections.clinicalInterpretation.severe.significance') +
                    ' ' +
                    t('apgar.sections.clinicalInterpretation.severe.action')
                  "
                ></div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-expansion-item>

    <!-- Applicazioni Cliniche -->
    <q-expansion-item
      icon="medical_services"
      :label="t('apgar.sections.clinicalApplications.title')"
      class="q-mt-sm"
      header-class="bg-purple-1 text-purple-9"
    >
      <q-card class="bg-purple-1 q-pa-md">
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.clinicalApplications.resuscitation.title') }}</strong>
          {{ t('apgar.sections.clinicalApplications.resuscitation.text') }}
        </div>
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.clinicalApplications.effectiveness.title') }}</strong>
          {{ t('apgar.sections.clinicalApplications.effectiveness.text') }}
        </div>
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.clinicalApplications.communication.title') }}</strong>
          {{ t('apgar.sections.clinicalApplications.communication.text') }}
        </div>
        <div class="text-body2">
          <strong>{{ t('apgar.sections.clinicalApplications.research.title') }}</strong>
          {{ t('apgar.sections.clinicalApplications.research.text') }}
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Valori di Riferimento e Alert -->
    <q-expansion-item
      icon="warning"
      :label="t('apgar.sections.referenceValues.title')"
      class="q-mt-sm"
      header-class="bg-red-1 text-red-9"
    >
      <q-card class="bg-red-1 q-pa-md">
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.referenceValues.min1.title') }}</strong>
          {{ t('apgar.sections.referenceValues.min1.text') }}
        </div>
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.referenceValues.min5.title') }}</strong>
          {{ t('apgar.sections.referenceValues.min5.text') }}
        </div>
        <div class="text-body2 q-mb-sm text-weight-bold text-red-9">
          <strong>{{ t('apgar.sections.referenceValues.alerts.title') }}</strong>
          {{ t('apgar.sections.referenceValues.alerts.text') }}
        </div>
        <div class="text-body2">
          <strong>{{ t('apgar.sections.referenceValues.confounders.title') }}</strong>
          {{ t('apgar.sections.referenceValues.confounders.text') }}
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Documentazione Medica e Linee Guida -->
    <q-expansion-item
      icon="menu_book"
      :label="t('apgar.sections.documentation.title')"
      class="q-mt-sm"
      header-class="bg-indigo-1 text-indigo-9"
    >
      <q-card class="bg-indigo-1 q-pa-md">
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.documentation.aap.title') }}</strong>
          {{ t('apgar.sections.documentation.aap.text') }}
        </div>
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.documentation.who.title') }}</strong>
          {{ t('apgar.sections.documentation.who.text') }}
        </div>
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.documentation.ilcor.title') }}</strong>
          {{ t('apgar.sections.documentation.ilcor.text') }}
        </div>
        <div class="text-body2">
          <strong>{{ t('apgar.sections.documentation.acog.title') }}</strong>
          {{ t('apgar.sections.documentation.acog.text') }}
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Riferimenti Scientifici PMID -->
    <q-expansion-item
      icon="library_books"
      :label="t('apgar.sections.bibliography.title')"
      class="q-mt-sm"
      header-class="bg-teal-1 text-teal-9"
    >
      <q-card class="bg-teal-1 q-pa-md">
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.bibliography.apgar1953.title') }}</strong>
          {{ t('apgar.sections.bibliography.apgar1953.details') }}
        </div>
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.bibliography.casey2001.title') }}</strong>
          {{ t('apgar.sections.bibliography.casey2001.details') }}
        </div>
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.bibliography.li2019.title') }}</strong>
          {{ t('apgar.sections.bibliography.li2019.details') }}
        </div>
        <div class="text-body2 q-mb-sm">
          <strong>{{ t('apgar.sections.bibliography.msd.title') }}</strong>
          {{ t('apgar.sections.bibliography.msd.details') }}
        </div>
        <div class="text-body2">
          <strong>{{ t('apgar.sections.bibliography.sciencedirect.title') }}</strong>
          {{ t('apgar.sections.bibliography.sciencedirect.details') }}
        </div>
      </q-card>
    </q-expansion-item>
  </div>
</template>
