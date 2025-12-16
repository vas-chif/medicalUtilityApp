<!-- CrClCalculator.vue -->
<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file CrClCalculator.vue
 * @description Creatinine Clearance calculator component using Cockcroft-Gault formula
 *              for drug dosing adjustments in renal impairment.
 *              Supports Italian (current) with i18n-ready props for future English translation.
 *
 * @author Vasile Chifeac
 * @created 2025-11-16
 * @modified 2025-11-16
 *
 * @example
 * <CrClCalculator
 *   calculateButtonText="Calcola CrCl"
 *   resetButtonText="Reset Dati"
 * />
 *
 * @notes
 * - Component extracted from GFRCalculatorPage.vue (architectural refactoring)
 * - NEWS-style documentation (9 sections: Definizione→Riferimenti)
 * - Cockcroft-Gault formula (not BSA-normalized) for drug dosing
 * - Clinical decision support for medication adjustments
 * - Responsive design for mobile/tablet/desktop
 * - Full TypeScript type safety with strict mode
 *
 * @dependencies
 * - useResetForm composable for form state management
 * - Quasar Framework components
 *
 * @medical-references
 * - Cockcroft DW, Gault MH. Nephron. 1976;16(1):31-41
 * - Winter MA, et al. Ann Pharmacother. 2012;46(12):1621-1629 (Obese patients)
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
  /** Calculate button text (IT: "Calcola CrCl", EN: "Calculate CrCl") */
  calculateButtonText?: string;
  /** Reset button text (IT: "Reset Dati", EN: "Reset Data") */
  resetButtonText?: string;
  /** Component title (IT: "Clearance Creatinina", EN: "Creatinine Clearance") */
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  calculateButtonText: 'Calcola CrCl',
  resetButtonText: 'Reset Dati',
  title: 'Clearance Creatinina',
});

/**
 * Component events definition
 */
interface Emits {
  /** Emitted when calculation is performed */
  (event: 'calculated', payload: { crcl: number }): void;
}

const emit = defineEmits<Emits>();

// ============================================================
// TYPES & INTERFACES
// ============================================================

/**
 * CrCl Calculator - Form data interface
 */
interface CrClFormData {
  /** Serum creatinine in mg/dL */
  creatinine: number | null;
  /** Patient age in years */
  age: number | null;
  /** Patient body weight in kilograms */
  weight: number | null;
  /** Patient gender: 'male' | 'female' */
  gender: string | null;
}

/**
 * CrCl Calculator - Result interface
 */
interface CrClResult {
  /** Calculated creatinine clearance in mL/min */
  crcl: number;
}

// ============================================================
// STATE
// ============================================================
const initialFormData: CrClFormData = {
  creatinine: null,
  age: null,
  weight: null,
  gender: null,
};

const initialResult: CrClResult = {
  crcl: 0,
};

const formData = ref<CrClFormData>({ ...initialFormData });
const result = ref<CrClResult>({ ...initialResult });

// Reset form composable
const { resetForm: resetFormData } = useResetForm(formData, result, initialFormData);

const resetForm = () => {
  logger.debug('Resetting CrCl calculator form');
  resetFormData();
  result.value = { ...initialResult };
  logger.debug('Form reset complete');
};

// ============================================================
// OPTIONS DATA
// ============================================================
const genderOptions = [
  { label: 'Maschio', value: 'male' },
  { label: 'Femmina', value: 'female' },
];

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
    formData.value.weight !== null &&
    formData.value.weight > 0 &&
    formData.value.gender !== null
  );
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Calculate Creatinine Clearance using Cockcroft-Gault formula
 * Formula: CrCl (mL/min) = [(140 - Age) × Weight (kg) × (0.85 if female)] / (72 × SCr mg/dL)
 * Reference: Cockcroft DW, Gault MH. Nephron. 1976;16(1):31-41
 */
const calculateCrCl = () => {
  if (!isFormValid.value) {
    logger.warn('Calculate CrCl attempted with invalid form data');
    return;
  }

  const { creatinine, age, weight, gender } = formData.value;
  if (!creatinine || !age || !weight || !gender) {
    logger.error('Missing required parameters for CrCl calculation', {
      hasCreatinine: !!creatinine,
      hasAge: !!age,
      hasWeight: !!weight,
      hasGender: !!gender,
    });
    return;
  }

  logger.info('Calculating CrCl', {
    age,
    weight,
    gender,
    creatinine,
  });

  // Cockcroft-Gault formula
  let crcl = ((140 - age) * weight) / (72 * creatinine);

  // Gender correction (female)
  if (gender === 'female') {
    crcl *= 0.85;
  }

  result.value = {
    crcl: Math.round(crcl * 10) / 10,
  };

  logger.info('CrCl calculated successfully', {
    result: result.value.crcl,
    interpretation: getCrClInterpretation(result.value.crcl),
  });

  // Emit calculated event
  emit('calculated', { crcl: result.value.crcl });
};

/**
 * Get color for CrCl interpretation
 */
const getCrClColor = (crcl: number): string => {
  if (crcl >= 90) return 'green';
  if (crcl >= 60) return 'light-green';
  if (crcl >= 45) return 'orange';
  if (crcl >= 30) return 'deep-orange';
  if (crcl >= 15) return 'red';
  return 'purple';
};

/**
 * Get CrCl interpretation text
 */
const getCrClInterpretation = (crcl: number): string => {
  if (crcl >= 90) return 'Funzione Normale';
  if (crcl >= 60) return 'Lieve Riduzione';
  if (crcl >= 45) return 'Riduzione Moderata';
  if (crcl >= 30) return 'Riduzione Moderata-Severa';
  if (crcl >= 15) return 'Riduzione Severa';
  return 'Insufficienza Renale';
};

/**
 * Get clinical notes for CrCl value
 */
const getCrClClinicalNotes = (crcl: number): string => {
  if (crcl >= 90) {
    return 'Clearance normale. Dosaggio farmaci standard (verificare schede tecniche).';
  } else if (crcl >= 60) {
    return 'Lieve riduzione clearance. Alcuni farmaci richiedono aggiustamento (aminoglicosidi, vancomicina). Monitorare livelli terapeutici.';
  } else if (crcl >= 45) {
    return 'Riduzione moderata. Ridurre dose o prolungare intervalli per farmaci nefrotossici. Valutazione farmacologica necessaria.';
  } else if (crcl >= 30) {
    return 'Riduzione moderata-severa. Aggiustamento significativo dosaggi (50-75% dose standard). Evitare FANS e contrasti iodati.';
  } else if (crcl >= 15) {
    return 'Riduzione severa. Riduzione drastica dosaggi (25-50%). Molti farmaci controindicati. Consulenza nefrologica obbligatoria.';
  } else {
    return 'Insufficienza renale terminale. Dialisi-dipendente. Dosaggi basati su timing dialisi. Farmaci eliminati con dialisi richiedono dose supplementare post-trattamento.';
  }
};

// ============================================================
// LIFECYCLE
// ============================================================
onMounted(() => {
  logger.info('CrClCalculator component mounted', {
    environment: isDev.value ? 'development' : 'production',
  });
});
</script>

<template>
  <!-- ======================================================== -->
  <!-- CREATININE CLEARANCE CALCULATOR COMPONENT                -->
  <!-- ======================================================== -->

  <div class="crcl-calculator">
    <div class="row q-gutter-lg">
      <!-- ===================================================== -->
      <!-- INPUT PANEL                                           -->
      <!-- ===================================================== -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">{{ t('crcl.inputPanel.title') }}</h6>
            <p class="text-caption text-grey-7 q-mb-md">
              {{ t('crcl.inputPanel.description') }}
            </p>

            <!-- Creatinina Sierica -->
            <q-input
              v-model.number="formData.creatinine"
              type="number"
              step="0.01"
              :label="t('crcl.inputPanel.creatinine.label')"
              :suffix="t('crcl.inputPanel.creatinine.unit')"
              outlined
              class="q-mb-md"
              :rules="[
                (val: number) =>
                  (val > 0 && val <= 20) || t('crcl.inputPanel.creatinine.validation'),
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
              :label="t('crcl.inputPanel.age.label')"
              :suffix="t('crcl.inputPanel.age.unit')"
              outlined
              class="q-mb-md"
              :rules="[
                (val: number) => (val > 0 && val <= 120) || t('crcl.inputPanel.age.validation'),
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="cake" color="orange" />
              </template>
            </q-input>

            <!-- Peso -->
            <q-input
              v-model.number="formData.weight"
              type="number"
              step="0.1"
              :label="t('crcl.inputPanel.weight.label')"
              :suffix="t('crcl.inputPanel.weight.unit')"
              outlined
              class="q-mb-md"
              :rules="[
                (val: number) => (val > 0 && val <= 300) || t('crcl.inputPanel.weight.validation'),
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="monitor_weight" color="green" />
              </template>
            </q-input>

            <!-- Sesso -->
            <q-select
              v-model="formData.gender"
              :options="genderOptions"
              :label="t('crcl.inputPanel.gender.label')"
              outlined
              class="q-mb-md"
              emit-value
              map-options
              :rules="[(val: string) => val !== null || t('crcl.inputPanel.gender.validation')]"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="purple" />
              </template>
            </q-select>

            <!-- Bottone Calcola -->
            <q-btn
              @click="calculateCrCl"
              color="primary"
              size="lg"
              class="full-width q-mb-sm"
              icon="calculate"
              :disable="!isFormValid"
            >
              {{ calculateButtonText }}
            </q-btn>

            <!-- Bottone Reset -->
            <q-btn
              @click="resetForm"
              color="negative"
              size="md"
              class="full-width"
              icon="refresh"
              outline
            >
              {{ resetButtonText }}
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
            <h6 class="text-h6 q-ma-none q-mb-md">{{ t('crcl.resultsPanel.title') }}</h6>

            <!-- Risultato Principale -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 text-primary q-mb-sm">
                {{ result.crcl.toFixed(1) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>{{ t('crcl.resultsPanel.result.unit') }}</strong> ({{
                  t('crcl.resultsPanel.result.label')
                }})
              </div>
              <div class="text-caption text-grey-6">
                {{ t('crcl.resultsPanel.result.formula') }}
              </div>
            </div>

            <q-separator class="q-mb-md" />

            <!-- Note Cliniche -->
            <q-banner class="bg-amber-2 q-mb-md" rounded>
              <template v-slot:avatar>
                <q-icon name="warning" color="amber" />
              </template>
              <div class="text-caption">
                <strong>{{ t('crcl.resultsPanel.clinicalUse.title') }}</strong>
                {{ t('crcl.resultsPanel.clinicalUse.text') }}
              </div>
            </q-banner>

            <!-- Interpretazione -->
            <div class="q-mb-md" v-if="result.crcl > 0">
              <div class="text-subtitle2 q-mb-sm">
                {{ t('crcl.resultsPanel.interpretation.title') }}
              </div>
              <q-chip
                :color="getCrClColor(result.crcl)"
                text-color="white"
                class="text-weight-bold"
                size="lg"
              >
                {{ getCrClInterpretation(result.crcl) }}
              </q-chip>
              <div class="text-body2 q-mt-sm text-grey-8">
                {{ getCrClClinicalNotes(result.crcl) }}
              </div>
            </div>

            <!-- ================================================= -->
            <!-- NEWS-STYLE DOCUMENTATION (9 SECTIONS)             -->
            <!-- ================================================= -->

            <!-- Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              :label="t('crcl.sections.definition.title')"
              class="q-mt-sm"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('crcl.sections.definition.content.definitionLabel') }}</strong>
                  <span v-html="t('crcl.sections.definition.content.definition')"></span>
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('crcl.sections.definition.content.differenceLabel') }}</strong>
                </p>
                <ul class="text-body2 q-mb-sm">
                  <li v-for="idx in 2" :key="idx">
                    <span
                      v-html="t(`crcl.sections.definition.content.differences[${idx - 1}]`)"
                    ></span>
                  </li>
                </ul>
                <q-banner class="bg-blue-2 text-blue-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="info" color="blue" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>{{ t('crcl.sections.definition.content.note.title') }}</strong>
                    <span v-html="t('crcl.sections.definition.content.note.text')"></span>
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Fisiologia della Clearance Renale -->
            <q-expansion-item
              icon="biotech"
              :label="t('crcl.sections.physiology.title')"
              class="q-mt-sm"
              header-class="bg-green-1 text-green-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.physiology.content.mechanismTitle') }}
                </p>
                <p class="text-body2 q-mb-sm">
                  {{ t('crcl.sections.physiology.content.mechanismIntro') }}
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="idx in 3" :key="idx">
                    <span
                      v-html="t(`crcl.sections.physiology.content.mechanisms[${idx - 1}]`)"
                    ></span>
                  </li>
                </ul>
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('crcl.sections.physiology.content.equationLabel') }}</strong>
                  {{ t('crcl.sections.physiology.content.equation') }}
                </p>
                <ul class="text-body2">
                  <li v-for="idx in 3" :key="idx">
                    {{ t(`crcl.sections.physiology.content.equationParams[${idx - 1}]`) }}
                  </li>
                </ul>
                <q-banner class="bg-green-2 text-green-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="science" color="green" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>{{ t('crcl.sections.physiology.content.note.title') }}</strong>
                    <span v-html="t('crcl.sections.physiology.content.note.text')"></span>
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Come si Calcola CrCl -->
            <q-expansion-item
              icon="speed"
              :label="t('crcl.sections.calculation.title')"
              class="q-mt-sm"
              header-class="bg-amber-1 text-amber-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.calculation.content.methodsTitle') }}
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="idx in 2" :key="idx">
                    <span
                      v-html="t(`crcl.sections.calculation.content.methods[${idx - 1}]`)"
                    ></span>
                  </li>
                </ul>
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.calculation.content.whenToUseTitle') }}
                </p>
                <ul class="text-body2">
                  <li v-for="idx in 4" :key="idx">
                    {{ t(`crcl.sections.calculation.content.whenToUse[${idx - 1}]`) }}
                  </li>
                </ul>
                <q-banner class="bg-amber-2 text-amber-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="tips_and_updates" color="amber" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>{{ t('crcl.sections.calculation.content.bestPractice.title') }}</strong>
                    <span v-html="t('crcl.sections.calculation.content.bestPractice.text')"></span>
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Formula Cockcroft-Gault -->
            <q-expansion-item
              icon="functions"
              :label="t('crcl.sections.formula.title')"
              class="q-mt-sm"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.formula.content.classicTitle') }}
                </p>
                <p class="text-body2 q-mb-sm">
                  {{ t('crcl.sections.formula.content.formulaText') }}
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="idx in 4" :key="idx">
                    <span v-html="t(`crcl.sections.formula.content.parameters[${idx - 1}]`)"></span>
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.formula.content.limitationsTitle') }}
                </p>
                <ul class="text-body2">
                  <li v-for="idx in 4" :key="idx">
                    <span v-html="t(`crcl.sections.formula.limitations.items[${idx - 1}]`)"></span>
                  </li>
                </ul>

                <q-banner class="bg-cyan-2 text-cyan-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="recommend" color="cyan" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>{{ t('crcl.sections.formula.content.recommendation.title') }}</strong>
                    <span v-html="t('crcl.sections.formula.content.recommendation.text')"></span>
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Interpretazione Risultati -->
            <q-expansion-item
              icon="psychology"
              :label="t('crcl.sections.interpretation.title')"
              class="q-mt-sm"
              header-class="bg-orange-1 text-orange-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.interpretation.content.classificationTitle') }}
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="idx in 6" :key="idx">
                    <span
                      v-html="t(`crcl.sections.interpretation.content.classification[${idx - 1}]`)"
                    ></span>
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.interpretation.content.criticalDrugsTitle') }}
                </p>
                <ul class="text-body2">
                  <li v-for="idx in 4" :key="idx">
                    <span
                      v-html="t(`crcl.sections.interpretation.content.criticalDrugs[${idx - 1}]`)"
                    ></span>
                  </li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- Applicazioni Cliniche -->
            <q-expansion-item
              icon="local_hospital"
              :label="t('crcl.sections.applications.title')"
              class="q-mt-sm"
              header-class="bg-purple-1 text-purple-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.applications.content.primaryUseTitle') }}
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="idx in 3" :key="idx">
                    <span
                      v-html="t(`crcl.sections.applications.content.primaryUse[${idx - 1}]`)"
                    ></span>
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.applications.content.specialPopulationsTitle') }}
                </p>
                <ul class="text-body2">
                  <li v-for="idx in 3" :key="idx">
                    <span
                      v-html="
                        t(`crcl.sections.applications.content.specialPopulations[${idx - 1}]`)
                      "
                    ></span>
                  </li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- Valori Critici e Alert -->
            <q-expansion-item
              icon="warning"
              :label="t('crcl.sections.referenceValues.title')"
              class="q-mt-sm"
              header-class="bg-red-1 text-red-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.referenceValues.content.criticalValuesTitle') }}
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="idx in 3" :key="idx">
                    <span
                      v-html="t(`crcl.sections.referenceValues.content.criticalValues[${idx - 1}]`)"
                    ></span>
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.referenceValues.content.highRiskDrugsTitle') }}
                </p>
                <ul class="text-body2">
                  <li v-for="idx in 3" :key="idx">
                    <span
                      v-html="t(`crcl.sections.referenceValues.content.highRiskDrugs[${idx - 1}]`)"
                    ></span>
                  </li>
                </ul>

                <q-banner class="bg-red-2 text-red-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="emergency" color="red" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>{{
                      t('crcl.sections.referenceValues.content.clinicalAlert.title')
                    }}</strong>
                    <span
                      v-html="t('crcl.sections.referenceValues.content.clinicalAlert.text')"
                    ></span>
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Documentazione Clinica -->
            <q-expansion-item
              icon="menu_book"
              :label="t('crcl.sections.documentation.title')"
              class="q-mt-sm"
              header-class="bg-indigo-1 text-indigo-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.documentation.content.templateTitle') }}
                </p>
                <div class="bg-grey-2 q-pa-md rounded-borders text-body2 q-mb-md">
                  <p v-html="t('crcl.sections.documentation.content.templateExample')"></p>
                </div>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.documentation.content.elementsTitle') }}
                </p>
                <ul class="text-body2">
                  <li v-for="idx in 4" :key="idx">
                    {{ t(`crcl.sections.documentation.content.elements[${idx - 1}]`) }}
                  </li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- Riferimenti Scientifici -->
            <q-expansion-item
              icon="science"
              :label="t('crcl.sections.bibliography.title')"
              class="q-mt-sm"
              header-class="bg-teal-1 text-teal-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.bibliography.content.publicationsTitle') }}
                </p>
                <ul class="text-body2 q-mb-md">
                  <li v-for="idx in 3" :key="idx">
                    <span
                      v-html="t(`crcl.sections.bibliography.content.publications[${idx - 1}]`)"
                    ></span>
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">
                  {{ t('crcl.sections.bibliography.content.guidelinesTitle') }}
                </p>
                <ul class="text-body2">
                  <li v-for="idx in 3" :key="idx">
                    <span
                      v-html="t(`crcl.sections.bibliography.content.guidelines[${idx - 1}]`)"
                    ></span>
                  </li>
                </ul>

                <q-banner class="bg-teal-2 text-teal-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="link" color="teal" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>{{
                      t('crcl.sections.bibliography.content.onlineResources.title')
                    }}</strong>
                    <a
                      href="https://www.fda.gov/drugs/drug-development-tool-ddt-qualification-programs"
                      target="_blank"
                      class="text-teal-9"
                      >{{ t('crcl.sections.bibliography.content.onlineResources.fdaLink') }}</a
                    >
                    |
                    <a
                      href="https://www.ema.europa.eu/en/documents/scientific-guideline/guideline-evaluation-pharmacokinetics-medicinal-products-patients-decreased-renal-function_en.pdf"
                      target="_blank"
                      class="text-teal-9"
                      >{{ t('crcl.sections.bibliography.content.onlineResources.emaLink') }}</a
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

.crcl-calculator {
  width: 100%;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .crcl-calculator .row {
    flex-direction: column;
  }
}
</style>
