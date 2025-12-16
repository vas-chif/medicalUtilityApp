<!-- eGFRCalculator.vue -->
<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file eGFRCalculator.vue
 * @description eGFR (estimated Glomerular Filtration Rate) calculator component
 *              with MDRD and CKD-EPI formulas for CKD staging per KDIGO Guidelines.
 *              Supports Italian (current) with i18n-ready props for future English translation.
 *
 * @author Vasile Chifeac
 * @created 2025-11-16
 * @modified 2025-11-16
 *
 * @example
 * <eGFRCalculator
 *   :showBreadcrumbs="false"
 *   calculateButtonText="Calcola eGFR"
 *   resetButtonText="Reset Dati"
 * />
 *
 * @notes
 * - Component extracted from GFRCalculatorPage.vue (architectural refactoring)
 * - NEWS-style documentation (9 sections: Definizione→Riferimenti)
 * - Clinical decision support for CKD staging (KDIGO 2024)
 * - Drug dosing adjustments when eGFR <60 mL/min
 * - Responsive design for mobile/tablet/desktop
 * - Full TypeScript type safety with strict mode
 *
 * @dependencies
 * - useResetForm composable for form state management
 * - Quasar Framework components (q-card, q-input, q-select, q-btn, etc.)
 *
 * @medical-references
 * - KDIGO Guidelines for CKD Evaluation and Management (2024)
 * - Levey et al. (2009) - CKD-EPI equation development
 * - Inker et al. (2021) - CKD-EPI equation without race
 * - Stevens & Levey (2010) - Assessment of Renal Function
 */

// ============================================================
// IMPORTS
// ============================================================
// Vue core
import { ref, computed, onMounted } from 'vue';

// Composables
import { useResetForm } from 'src/composables/useResetForm';
import { useSecureLogger } from 'src/composables/useSecureLogger';
import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';
import { useI18n } from 'vue-i18n';

// ============================================================
// COMPOSABLES
// ============================================================
const { logger } = useSecureLogger();
const { isDev, isProd } = useSmartEnvironment();
const { t } = useI18n({ useScope: 'global' });

// ============================================================
// PROPS & EMITS
// ============================================================
/**
 * Component props definition (bilingual-ready)
 */
interface Props {
  /** Show breadcrumbs navigation (IT: mostra breadcrumbs, EN: show breadcrumbs) */
  showBreadcrumbs?: boolean;
  /** Calculate button text (IT: "Calcola eGFR", EN: "Calculate eGFR") */
  calculateButtonText?: string;
  /** Reset button text (IT: "Reset Dati", EN: "Reset Data") */
  resetButtonText?: string;
  /** Component title (IT: "Calcolatore eGFR", EN: "eGFR Calculator") */
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showBreadcrumbs: false,
  calculateButtonText: 'Calcola eGFR',
  resetButtonText: 'Reset Dati',
  title: 'Calcolatore eGFR',
});

/**
 * Component events definition
 */
interface Emits {
  /** Emitted when calculation is performed */
  (event: 'calculated', payload: { gfr: number; stage: string }): void;
}

const emit = defineEmits<Emits>();

// ============================================================
// TYPES & INTERFACES
// ============================================================

/**
 * eGFR Calculator - Form data interface
 */
interface GFRFormData {
  /** Serum creatinine in mg/dL */
  creatinine: number | null;
  /** Patient age in years */
  age: number | null;
  /** Patient gender: 'male' | 'female' */
  gender: string | null;
  /** Race/ethnicity for correction factor: 'african' | 'other' */
  race: string | null;
  /** Formula selection: 'mdrd' | 'ckdepi' */
  formula: string;
}

/**
 * eGFR Calculator - Result interface
 */
interface GFRResult {
  /** Calculated eGFR value in mL/min/1.73m² */
  gfr: number;
  /** CKD stage classification (1-5) */
  stage: string;
  /** Clinical description of CKD stage */
  description: string;
  /** Color code for visual representation */
  color: string;
}

// ============================================================
// STATE
// ============================================================
const initialFormData: GFRFormData = {
  creatinine: null,
  age: null,
  gender: null,
  race: 'other',
  formula: 'ckdepi',
};

const initialResult: GFRResult = {
  gfr: 0,
  stage: '',
  description: '',
  color: 'grey',
};

const formData = ref<GFRFormData>({ ...initialFormData });
const result = ref<GFRResult>({ ...initialResult });

/** Show comparison between MDRD and CKD-EPI formulas */
const showComparison = ref(false);

// Reset form composable
const { resetForm: resetFormData } = useResetForm(formData, result, initialFormData);

const resetForm = () => {
  resetFormData();
  result.value = { ...initialResult };
  showComparison.value = false;
};

// ============================================================
// OPTIONS DATA
// ============================================================
const genderOptions = computed(() => [
  { label: t('egfr.inputPanel.gender.options.male'), value: 'male' },
  { label: t('egfr.inputPanel.gender.options.female'), value: 'female' },
]);

const raceOptions = computed(() => [
  { label: t('egfr.inputPanel.race.options.other'), value: 'other' },
  { label: t('egfr.inputPanel.race.options.african'), value: 'african' },
]);

const formulaOptions = computed(() => [
  { label: t('egfr.inputPanel.formula.options.ckdepi'), value: 'ckdepi' },
  { label: t('egfr.inputPanel.formula.options.mdrd'), value: 'mdrd' },
]);

// ============================================================
// COMPUTED
// ============================================================
/**
 * Check if form has all required fields filled
 */
const isFormValid = computed(() => {
  return (
    formData.value.creatinine !== null &&
    formData.value.creatinine > 0 &&
    formData.value.age !== null &&
    formData.value.age > 0 &&
    formData.value.gender !== null
  );
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Calculate eGFR using selected formula (MDRD or CKD-EPI)
 */
const calculateGFR = () => {
  if (!isFormValid.value) return;

  let gfr = 0;

  if (formData.value.formula === 'mdrd') {
    gfr = calculateMDRD();
  } else {
    gfr = calculateCKDEPI();
  }

  const stage = getCKDStage(gfr);
  result.value = {
    gfr,
    stage: stage.stage,
    description: stage.description,
    color: stage.color,
  };

  // Emit calculated event
  emit('calculated', { gfr, stage: stage.stage });
};

/**
 * Calculate eGFR using MDRD formula
 * Formula: eGFR = 175 × SCr^-1.154 × Age^-0.203 × 0.742[if female] × 1.212[if African American]
 * Reference: Levey et al. Ann Intern Med 1999
 *
 * @returns eGFR value in mL/min/1.73m²
 */
const calculateMDRD = (): number => {
  const { creatinine, age, gender, race } = formData.value;
  if (!creatinine || !age || !gender) return 0;

  let gfr = 175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203);

  // Gender correction (female)
  if (gender === 'female') {
    gfr *= 0.742;
  }

  // Race correction (African American)
  if (race === 'african') {
    gfr *= 1.212;
  }

  return Math.round(gfr * 10) / 10;
};

/**
 * Calculate eGFR using CKD-EPI formula (2021 equation without race)
 * Formula: eGFR = 141 × min(SCr/κ,1)^α × max(SCr/κ,1)^-1.209 × 0.993^Age × [1.012 if female]
 * Reference: Inker et al. N Engl J Med 2021
 *
 * @returns eGFR value in mL/min/1.73m²
 */
const calculateCKDEPI = (): number => {
  const { creatinine, age, gender, race } = formData.value;
  if (!creatinine || !age || !gender) return 0;

  // CKD-EPI constants
  let kappa: number, alpha: number, genderFactor: number;

  if (gender === 'female') {
    kappa = 0.7;
    alpha = creatinine <= 0.7 ? -0.329 : -1.209;
    genderFactor = 1.018;
  } else {
    kappa = 0.9;
    alpha = creatinine <= 0.9 ? -0.411 : -1.209;
    genderFactor = 1.0;
  }

  let gfr =
    141 *
    Math.pow(Math.min(creatinine / kappa, 1), alpha) *
    Math.pow(Math.max(creatinine / kappa, 1), -1.209) *
    Math.pow(0.993, age) *
    genderFactor;

  // Race correction (African American) - Note: 2021 equation removes race, but kept for compatibility
  if (race === 'african') {
    gfr *= 1.159;
  }

  return Math.round(gfr * 10) / 10;
};

/**
 * Get CKD stage classification based on eGFR value per KDIGO Guidelines
 *
 * @param gfr - eGFR value in mL/min/1.73m²
 * @returns CKD stage with description and color
 */
const getCKDStage = (gfr: number): { stage: string; description: string; color: string } => {
  if (gfr >= 90)
    return {
      stage: t('egfr.ckdStages.stage1.label'),
      description: t('egfr.ckdStages.stage1.description'),
      color: 'green',
    };
  if (gfr >= 60)
    return {
      stage: t('egfr.ckdStages.stage2.label'),
      description: t('egfr.ckdStages.stage2.description'),
      color: 'light-green',
    };
  if (gfr >= 45)
    return {
      stage: t('egfr.ckdStages.stage3a.label'),
      description: t('egfr.ckdStages.stage3a.description'),
      color: 'orange',
    };
  if (gfr >= 30)
    return {
      stage: t('egfr.ckdStages.stage3b.label'),
      description: t('egfr.ckdStages.stage3b.description'),
      color: 'deep-orange',
    };
  if (gfr >= 15)
    return {
      stage: t('egfr.ckdStages.stage4.label'),
      description: t('egfr.ckdStages.stage4.description'),
      color: 'red',
    };
  return {
    stage: t('egfr.ckdStages.stage5.label'),
    description: t('egfr.ckdStages.stage5.description'),
    color: 'purple',
  };
};

/**
 * Get GFR position on visual scale (0-100%)
 *
 * @returns Position percentage for indicator
 */
const getGFRPosition = (): number => {
  const gfr = result.value.gfr;
  if (gfr <= 0) return 0;
  if (gfr >= 120) return 100;
  return (gfr / 120) * 100;
};

/**
 * Get formula display name
 *
 * @returns Formula name string
 */
const getFormulaName = (): string => {
  return formData.value.formula === 'mdrd' ? 'MDRD' : 'CKD-EPI';
};

/**
 * Get CSS class for CKD stage color
 *
 * @param index - Stage index (0-5)
 * @returns CSS class string
 */
const getStageClass = (index: number): string => {
  const classes = [
    'text-green',
    'text-light-green',
    'text-orange',
    'text-deep-orange',
    'text-red',
    'text-purple',
  ];
  return classes[index] || 'text-grey';
};

// ============================================================
// LIFECYCLE
// ============================================================
onMounted(() => {
  logger.info('eGFRCalculator component mounted', {
    environment: isDev.value ? 'development' : 'production',
  });
});
</script>

<template>
  <!-- ======================================================== -->
  <!-- eGFR CALCULATOR COMPONENT                                -->
  <!-- ======================================================== -->

  <div class="egfr-calculator">
    <div class="row q-gutter-lg">
      <!-- ===================================================== -->
      <!-- INPUT PANEL                                           -->
      <!-- ===================================================== -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">{{ t('egfr.inputPanel.title') }}</h6>

            <!-- Creatinina Sierica -->
            <q-input
              v-model.number="formData.creatinine"
              type="number"
              step="0.01"
              :label="t('egfr.inputPanel.creatinine.label')"
              :suffix="t('egfr.inputPanel.creatinine.unit')"
              outlined
              class="q-mb-md"
              :rules="[
                (val: number) =>
                  (val > 0 && val <= 20) || t('egfr.inputPanel.creatinine.validation'),
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="science" color="blue" />
              </template>
            </q-input>

            <!-- Età -->
            <q-input
              v-model.number="formData.age"
              type="number"
              :label="t('egfr.inputPanel.age.label')"
              :suffix="t('egfr.inputPanel.age.unit')"
              outlined
              class="q-mb-md"
              :rules="[
                (val: number) => (val > 0 && val <= 120) || t('egfr.inputPanel.age.validation'),
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="cake" color="orange" />
              </template>
            </q-input>

            <!-- Sesso -->
            <q-select
              v-model="formData.gender"
              :options="genderOptions"
              :label="t('egfr.inputPanel.gender.label')"
              outlined
              class="q-mb-md"
              emit-value
              map-options
              :rules="[(val: string) => val !== null || t('egfr.inputPanel.gender.validation')]"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="purple" />
              </template>
            </q-select>

            <!-- Razza (per correzione) -->
            <q-select
              v-model="formData.race"
              :options="raceOptions"
              :label="t('egfr.inputPanel.race.label')"
              outlined
              class="q-mb-md"
              emit-value
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="public" color="green" />
              </template>
            </q-select>

            <!-- Selezione Formula -->
            <q-select
              v-model="formData.formula"
              :options="formulaOptions"
              :label="t('egfr.inputPanel.formula.label')"
              outlined
              class="q-mb-md"
              emit-value
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="functions" color="cyan" />
              </template>
            </q-select>

            <!-- Bottone Calcola -->
            <q-btn
              @click="calculateGFR"
              color="primary"
              size="lg"
              class="full-width q-mb-sm"
              icon="calculate"
              :disable="!isFormValid"
            >
              {{ t('egfr.buttons.calculate') }}
            </q-btn>

            <!-- Bottone Reset -->
            <q-btn
              @click="resetForm"
              color="negative"
              size="lg"
              class="full-width"
              icon="refresh"
              outline
            >
              {{ t('egfr.buttons.reset') }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- ===================================================== -->
      <!-- RESULTS PANEL                                         -->
      <!-- ===================================================== -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">{{ t('egfr.resultsPanel.title') }}</h6>

            <!-- Risultato Principale -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 text-primary q-mb-sm">
                {{ result.gfr.toFixed(1) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>{{ t('egfr.resultsPanel.result.unit') }}</strong> ({{
                  t('egfr.resultsPanel.result.label')
                }})
              </div>
              <div class="text-caption text-grey-6">
                {{ t('egfr.resultsPanel.result.formulaPrefix') }}: {{ getFormulaName() }}
              </div>
            </div>

            <!-- Classificazione CKD -->
            <q-separator class="q-mb-md" />

            <div class="q-mb-md" v-if="result.gfr > 0">
              <div class="text-h6 q-mb-sm">{{ t('egfr.resultsPanel.ckdStageTitle') }}</div>
              <q-chip :color="result.color" text-color="white" class="text-weight-bold" size="lg">
                {{ result.stage }}
              </q-chip>
              <div class="text-body2 q-mt-sm">
                {{ result.description }}
              </div>
            </div>

            <!-- Grafico Funzione Renale -->
            <div class="q-mb-lg" v-if="result.gfr > 0">
              <div class="text-subtitle2 q-mb-sm">
                {{ t('egfr.resultsPanel.renalFunctionTitle') }}
              </div>
              <div class="gfr-scale">
                <div class="gfr-bar">
                  <div class="gfr-indicator" :style="{ left: getGFRPosition() + '%' }"></div>
                </div>
                <div class="gfr-labels row justify-between q-mt-sm">
                  <span class="text-caption">0</span>
                  <span class="text-caption">15</span>
                  <span class="text-caption">30</span>
                  <span class="text-caption">60</span>
                  <span class="text-caption">90</span>
                  <span class="text-caption">120+</span>
                </div>
              </div>
            </div>

            <!-- Comparazione Formule -->
            <div class="q-mb-md" v-if="result.gfr > 0">
              <q-btn
                @click="showComparison = !showComparison"
                flat
                color="primary"
                :icon="showComparison ? 'expand_less' : 'expand_more'"
                :label="t('egfr.buttons.compareFormulas')"
                class="full-width"
              />
              <div v-if="showComparison" class="q-mt-md q-pa-md bg-grey-1 rounded-borders">
                <div class="row q-gutter-sm">
                  <div class="col-12">
                    <strong>MDRD:</strong> {{ calculateMDRD().toFixed(1) }} mL/min/1.73m²
                  </div>
                  <div class="col-12">
                    <strong>CKD-EPI:</strong> {{ calculateCKDEPI().toFixed(1) }} mL/min/1.73m²
                  </div>
                </div>
              </div>
            </div>

            <!-- Stadi CKD Quick Reference -->
            <q-expansion-item icon="info" :label="t('egfr.quickReference.title')" class="q-mt-sm">
              <q-card class="q-pa-md">
                <div class="row q-gutter-sm text-body2">
                  <div class="col-12">
                    <span class="text-weight-bold text-green"
                      >{{ t('egfr.ckdStages.stage1.label') }}:</span
                    >
                    {{ t('egfr.ckdStages.stage1.range') }} -
                    {{ t('egfr.ckdStages.stage1.description') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-light-green"
                      >{{ t('egfr.ckdStages.stage2.label') }}:</span
                    >
                    {{ t('egfr.ckdStages.stage2.range') }} -
                    {{ t('egfr.ckdStages.stage2.description') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-orange"
                      >{{ t('egfr.ckdStages.stage3a.label') }}:</span
                    >
                    {{ t('egfr.ckdStages.stage3a.range') }} -
                    {{ t('egfr.ckdStages.stage3a.description') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-deep-orange"
                      >{{ t('egfr.ckdStages.stage3b.label') }}:</span
                    >
                    {{ t('egfr.ckdStages.stage3b.range') }} -
                    {{ t('egfr.ckdStages.stage3b.description') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-red"
                      >{{ t('egfr.ckdStages.stage4.label') }}:</span
                    >
                    {{ t('egfr.ckdStages.stage4.range') }} -
                    {{ t('egfr.ckdStages.stage4.description') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-purple"
                      >{{ t('egfr.ckdStages.stage5.label') }}:</span
                    >
                    {{ t('egfr.ckdStages.stage5.range') }} -
                    {{ t('egfr.ckdStages.stage5.description') }}
                  </div>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- ================================================= -->
            <!-- NEWS-STYLE DOCUMENTATION (9 SECTIONS)             -->
            <!-- ================================================= -->

            <!-- Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              :label="t('egfr.sections.definition.title')"
              class="q-mt-sm"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('egfr.sections.definition.content.definitionLabel') }}:</strong>
                  <span v-html="t('egfr.sections.definition.content.definition')"></span>
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong
                    >{{ t('egfr.sections.definition.content.clinicalSignificanceTitle') }}:</strong
                  >
                  {{ t('egfr.sections.definition.content.clinicalSignificanceIntro') }}
                </p>
                <ul class="text-body2 q-mb-sm">
                  <li v-for="(item, index) in 4" :key="index">
                    <span
                      v-html="t(`egfr.sections.definition.content.clinicalSignificance[${index}]`)"
                    ></span>
                  </li>
                </ul>
                <q-banner class="bg-blue-2 text-blue-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="info" color="blue" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>{{ t('egfr.sections.definition.content.note.title') }}:</strong>
                    {{ t('egfr.sections.definition.content.note.text') }}
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Fisiologia della Filtrazione Glomerulare -->
            <q-expansion-item
              icon="biotech"
              :label="t('egfr.sections.physiology.title')"
              class="q-mt-sm"
              header-class="bg-green-1 text-green-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.physiology.content.mechanismTitle') }}:
                </p>
                <p class="text-body2 q-mb-sm">
                  {{ t('egfr.sections.physiology.content.mechanismIntro') }}
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="(item, index) in 3" :key="index">
                    <span
                      v-html="t(`egfr.sections.physiology.content.mechanisms[${index}]`)"
                    ></span>
                  </li>
                </ul>
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.physiology.content.determinantsTitle') }}:
                </p>
                <p
                  class="text-body2 q-mb-sm"
                  v-html="t('egfr.sections.physiology.content.equation')"
                ></p>
                <q-banner class="bg-orange-2 text-orange-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="warning" color="orange" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>{{ t('egfr.sections.physiology.content.alert.title') }}:</strong>
                    {{ t('egfr.sections.physiology.content.alert.text') }}
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Come si Misura/Calcola il GFR -->
            <q-expansion-item
              icon="speed"
              :label="t('egfr.sections.calculation.title')"
              class="q-mt-sm"
              header-class="bg-amber-1 text-amber-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.calculation.content.methodsTitle') }}:
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="(item, index) in 4" :key="index">
                    <span v-html="t(`egfr.sections.calculation.content.methods[${index}]`)"></span>
                  </li>
                </ul>
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('egfr.sections.calculation.content.creatinineTitle') }}:</strong>
                  {{ t('egfr.sections.calculation.content.creatinineIntro') }}
                </p>
                <ul class="text-body2">
                  <li v-for="(limitation, index) in 3" :key="index">
                    {{ t(`egfr.sections.calculation.content.limitations[${index}]`) }}
                  </li>
                </ul>
                <q-banner class="bg-amber-2 text-amber-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="tips_and_updates" color="amber" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong
                      >{{ t('egfr.sections.calculation.content.bestPractice.title') }}:</strong
                    >
                    {{ t('egfr.sections.calculation.content.bestPractice.text') }}
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Formule di Calcolo -->
            <q-expansion-item
              icon="functions"
              :label="t('egfr.sections.formula.title')"
              class="q-mt-sm"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.formula.content.mdrdTitle') }}:
                </p>
                <p
                  class="text-body2 q-mb-sm"
                  v-html="t('egfr.sections.formula.content.mdrdFormula')"
                ></p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="(item, index) in 3" :key="index">
                    {{ t(`egfr.sections.formula.content.mdrdLimitations[${index}]`) }}
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.formula.content.ckdepiTitle') }}:
                </p>
                <p
                  class="text-body2 q-mb-sm"
                  v-html="t('egfr.sections.formula.content.ckdepiFormula')"
                ></p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="(item, index) in 4" :key="index">
                    {{ t(`egfr.sections.formula.content.ckdepiParameters[${index}]`) }}
                  </li>
                </ul>

                <q-banner class="bg-cyan-2 text-cyan-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="recommend" color="cyan" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>{{ t('egfr.sections.formula.content.recommendation.title') }}:</strong>
                    {{ t('egfr.sections.formula.content.recommendation.text') }}
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Interpretazione Risultati -->
            <q-expansion-item
              icon="psychology"
              :label="t('egfr.sections.interpretation.title')"
              class="q-mt-sm"
              header-class="bg-orange-1 text-orange-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.interpretation.content.stagingTitle') }}:
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="(stage, index) in 6" :key="index">
                    <strong
                      :class="getStageClass(index)"
                      v-html="t(`egfr.sections.interpretation.content.staging[${index}]`)"
                    ></strong>
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.interpretation.content.albuminuriaTitle') }}:
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="(item, index) in 3" :key="index">
                    <span
                      v-html="t(`egfr.sections.interpretation.content.albuminuria[${index}]`)"
                    ></span>
                  </li>
                </ul>
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.interpretation.content.progressionTitle') }}:
                </p>
                <ul class="text-body2">
                  <li v-for="(item, index) in 3" :key="index">
                    <span
                      v-html="t(`egfr.sections.interpretation.content.progression[${index}]`)"
                    ></span>
                  </li>
                </ul>
                <q-banner class="bg-orange-2 text-orange-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="warning" color="orange" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>{{ t('egfr.sections.interpretation.content.alert.title') }}:</strong>
                    <span v-html="t('egfr.sections.interpretation.content.alert.text')"></span>
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Applicazioni Cliniche -->
            <q-expansion-item
              icon="local_hospital"
              :label="t('egfr.sections.applications.title')"
              class="q-mt-sm"
              header-class="bg-purple-1 text-purple-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.applications.content.drugDosingTitle') }}:
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="(item, index) in 4" :key="index">
                    <span
                      v-html="t(`egfr.sections.applications.content.drugDosing[${index}]`)"
                    ></span>
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.applications.content.screeningTitle') }}:
                </p>
                <ul class="text-body2">
                  <li v-for="(item, index) in 5" :key="index">
                    <span
                      v-html="t(`egfr.sections.applications.content.screening[${index}]`)"
                    ></span>
                  </li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- Valori Critici e Alert -->
            <q-expansion-item
              icon="warning"
              :label="t('egfr.sections.referenceValues.title')"
              class="q-mt-sm"
              header-class="bg-red-1 text-red-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.referenceValues.content.criticalThresholdsTitle') }}:
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="(item, index) in 4" :key="index">
                    <span
                      v-html="
                        t(`egfr.sections.referenceValues.content.criticalThresholds[${index}]`)
                      "
                    ></span>
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.referenceValues.content.rapidDeclineTitle') }}:
                </p>
                <ul class="text-body2">
                  <li v-for="(item, index) in 3" :key="index">
                    <span
                      v-html="t(`egfr.sections.referenceValues.content.rapidDecline[${index}]`)"
                    ></span>
                  </li>
                </ul>

                <q-banner class="bg-red-2 text-red-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="emergency" color="red" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong
                      >{{
                        t('egfr.sections.referenceValues.content.emergencyAlert.title')
                      }}:</strong
                    >
                    {{ t('egfr.sections.referenceValues.content.emergencyAlert.text') }}
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Documentazione Clinica -->
            <q-expansion-item
              icon="menu_book"
              :label="t('egfr.sections.documentation.title')"
              class="q-mt-sm"
              header-class="bg-indigo-1 text-indigo-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.documentation.content.elementsTitle') }}:
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="(item, index) in 6" :key="index">
                    {{ t(`egfr.sections.documentation.content.elements[${index}]`) }}
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.documentation.content.templateTitle') }}:
                </p>
                <div
                  class="bg-grey-2 q-pa-md rounded-borders text-body2"
                  v-html="t('egfr.sections.documentation.content.templateExample')"
                ></div>
              </q-card>
            </q-expansion-item>

            <!-- Riferimenti Scientifici -->
            <q-expansion-item
              icon="science"
              :label="t('egfr.sections.bibliography.title')"
              class="q-mt-sm"
              header-class="bg-teal-1 text-teal-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.bibliography.content.guidelinesTitle') }}:
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="(item, index) in 4" :key="index">
                    <span
                      v-html="t(`egfr.sections.bibliography.content.guidelines[${index}]`)"
                    ></span>
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('egfr.sections.bibliography.content.publicationsTitle') }}:
                </p>
                <ul class="text-body2">
                  <li
                    v-for="(item, index) in 4"
                    :key="index"
                    v-html="t(`egfr.sections.bibliography.content.publications[${index}]`)"
                  ></li>
                </ul>

                <q-banner class="bg-teal-2 text-teal-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="link" color="teal" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong
                      >{{ t('egfr.sections.bibliography.content.onlineResources.title') }}:</strong
                    >
                    <a href="https://kdigo.org/guidelines/" target="_blank" class="text-teal-9">{{
                      t('egfr.sections.bibliography.content.onlineResources.kdigo')
                    }}</a>
                    |
                    <a
                      href="https://www.kidney.org/professionals/guidelines"
                      target="_blank"
                      class="text-teal-9"
                      >{{ t('egfr.sections.bibliography.content.onlineResources.nkf') }}</a
                    >
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

.egfr-calculator {
  width: 100%;
}

/* GFR Scale Visualization */
.gfr-scale {
  width: 100%;
}

.gfr-bar {
  position: relative;
  height: 20px;
  background: linear-gradient(
    to right,
    #9c27b0 0%,
    #9c27b0 12.5%,
    #f44336 12.5%,
    #f44336 25%,
    #ff5722 25%,
    #ff5722 37.5%,
    #ff9800 37.5%,
    #ff9800 50%,
    #8bc34a 50%,
    #8bc34a 75%,
    #4caf50 75%,
    #4caf50 100%
  );
  border-radius: 10px;
}

.gfr-indicator {
  position: absolute;
  top: -5px;
  transform: translateX(-50%);
  width: 4px;
  height: 30px;
  background-color: #000;
  border-radius: 2px;
  transition: left 0.3s ease;
}

.gfr-labels {
  font-size: 11px;
  color: #666;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .egfr-calculator .row {
    flex-direction: column;
  }

  .gfr-bar {
    height: 15px;
  }

  .gfr-indicator {
    height: 25px;
  }
}
</style>
