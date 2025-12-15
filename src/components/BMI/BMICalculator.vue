<!-- BMICalculator.vue -->
<script setup lang="ts">
/**
 * @file BMICalculator.vue
 * @description BMI (Body Mass Index) Calculator component con WHO classification
 * @author Vasile Chifeac
 * @created 2025-11-16
 * @modified 2025-11-16
 *
 * @example
 * <BMICalculator />
 *
 * @notes
 * - Componente estratto da BMICalculatorPage.vue Tab 1
 * - WHO BMI classification con age-specific adjustments
 * - Calcolo peso ideale range (BMI 18.5-24.9)
 * - Grafico visuale scala BMI
 * - 9 sezioni NEWS-style documentation
 *
 * @medical-references
 * - WHO BMI Classification Guidelines
 * - WHO Technical Report Series 894 (2000)
 */

// ============================================================
// IMPORTS
// ============================================================
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useResetForm } from 'src/composables/useResetForm';
// import { useSecureLogger } from 'src/composables/useSecureLogger';
// import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';

// ============================================================
// COMPOSABLES
// ============================================================
const { t } = useI18n();
// const { logger } = useSecureLogger();
// const { isDev: isDevelopment } = useSmartEnvironment();

// ============================================================
// TYPES & INTERFACES
// ============================================================

/**
 * BMI Calculator - Form data interface
 */
interface BMIFormData {
  /** Patient weight in kilograms */
  weight: number | null;
  /** Patient height in centimeters */
  height: number | null;
  /** Patient age in years */
  age: number | null;
  /** Patient gender: 'male' | 'female' */
  gender: 'male' | 'female' | null;
}

/**
 * BMI Calculator - Result interface
 */
interface BMIResult {
  /** Calculated BMI value */
  bmi: number;
  /** WHO BMI category classification */
  category: string;
  /** Color code for visual representation */
  color: string;
  /** Ideal weight range for patient height */
  idealWeight: {
    /** Minimum ideal weight (kg) */
    min: number;
    /** Maximum ideal weight (kg) */
    max: number;
  };
  /** Difference from ideal weight midpoint (kg) */
  weightDifference: number;
}

// ============================================================
// STATE
// ============================================================

const initialFormData: BMIFormData = {
  weight: null,
  height: null,
  age: null,
  gender: null,
};

const initialResult: BMIResult = {
  bmi: 0,
  category: '',
  color: 'grey',
  idealWeight: { min: 0, max: 0 },
  weightDifference: 0,
};

const formData = ref<BMIFormData>({ ...initialFormData });
const result = ref<BMIResult>({ ...initialResult });

const genderOptions = computed(() => [
  { label: t('bmi.form.genderOptions.male'), value: 'male' },
  { label: t('bmi.form.genderOptions.female'), value: 'female' },
]);

// ============================================================
// COMPOSABLES
// ============================================================

const { resetForm: resetFormData } = useResetForm(formData, result, initialFormData);

// ============================================================
// COMPUTED
// ============================================================

/**
 * Form validation
 */
const isFormValid = computed(() => {
  return (
    formData.value.weight !== null &&
    formData.value.weight > 0 &&
    formData.value.height !== null &&
    formData.value.height > 0
  );
});

// ============================================================
// FUNCTIONS
// ============================================================

/**
 * Reset form to initial state
 */
const resetForm = () => {
  resetFormData();
  result.value = { ...initialResult };
};

/**
 * Calculate BMI from weight and height
 * Formula: BMI = weight(kg) / height(m)²
 */
const calculateBMI = () => {
  if (!isFormValid.value) return;

  const weight = formData.value.weight!;
  const heightM = formData.value.height! / 100; // Conversione cm -> m

  // Calcolo BMI
  const bmi = weight / (heightM * heightM);

  // Classificazione WHO
  const { category, color } = getBMIClassification(bmi);

  // Peso ideale (BMI 18.5 - 24.9)
  const idealMin = 18.5 * heightM * heightM;
  const idealMax = 24.9 * heightM * heightM;

  // Differenza dal peso ideale
  let weightDiff = 0;
  if (bmi < 18.5) {
    weightDiff = weight - idealMin; // Negativo = deficit
  } else if (bmi > 24.9) {
    weightDiff = weight - idealMax; // Positivo = eccesso
  }

  result.value = {
    bmi,
    category,
    color,
    idealWeight: { min: idealMin, max: idealMax },
    weightDifference: weightDiff,
  };
};

/**
 * Get WHO BMI classification
 */
const getBMIClassification = (bmi: number): { category: string; color: string } => {
  if (bmi < 18.5) return { category: t('bmi.results.categories.underweight'), color: 'blue' };
  if (bmi <= 24.9) return { category: t('bmi.results.categories.normal'), color: 'green' };
  if (bmi <= 29.9) return { category: t('bmi.results.categories.overweight'), color: 'orange' };
  if (bmi <= 34.9) return { category: t('bmi.results.categories.obese1'), color: 'red' };
  if (bmi <= 39.9) return { category: t('bmi.results.categories.obese2'), color: 'deep-orange' };
  return { category: t('bmi.results.categories.obese3'), color: 'purple' };
};

/**
 * Get BMI position for visual scale (0-100%)
 */
const getBMIPosition = (): number => {
  const bmi = result.value.bmi;
  if (bmi <= 15) return 0;
  if (bmi <= 18.5) return ((bmi - 15) / 3.5) * 20;
  if (bmi <= 25) return 20 + ((bmi - 18.5) / 6.5) * 25;
  if (bmi <= 30) return 45 + ((bmi - 25) / 5) * 20;
  if (bmi <= 35) return 65 + ((bmi - 30) / 5) * 15;
  if (bmi <= 40) return 80 + ((bmi - 35) / 5) * 15;
  return 95;
};
</script>

<template>
  <!-- ============================================================ -->
  <!-- BMI CALCULATOR COMPONENT                                     -->
  <!-- ============================================================ -->
  <div class="row q-gutter-lg">
    <!-- Pannello Input -->
    <div class="col-12 col-md-5">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">{{ t('bmi.subtitle') }}</h6>

          <!-- Peso -->
          <q-input
            v-model.number="formData.weight"
            type="number"
            step="0.1"
            :label="t('bmi.form.weightLabel')"
            :suffix="t('bmi.form.weightSuffix')"
            outlined
            class="q-mb-md"
            :rules="[(val) => (val > 0 && val <= 500) || t('bmi.form.weightRule')]"
          >
            <template v-slot:prepend>
              <q-icon :name="t('bmi.form.weightIcon')" color="blue" />
            </template>
          </q-input>

          <!-- Altezza -->
          <q-input
            v-model.number="formData.height"
            type="number"
            :label="t('bmi.form.heightLabel')"
            :suffix="t('bmi.form.heightSuffix')"
            outlined
            class="q-mb-md"
            :rules="[(val) => (val > 0 && val <= 300) || t('bmi.form.heightRule')]"
          >
            <template v-slot:prepend>
              <q-icon :name="t('bmi.form.heightIcon')" color="green" />
            </template>
          </q-input>

          <!-- Età (opzionale per contesto) -->
          <q-input
            v-model.number="formData.age"
            type="number"
            :label="t('bmi.form.ageLabel')"
            :suffix="t('bmi.form.ageSuffix')"
            outlined
            class="q-mb-md"
            :rules="[(val) => !val || (val > 0 && val <= 120) || t('bmi.form.ageRule')]"
          >
            <template v-slot:prepend>
              <q-icon :name="t('bmi.form.ageIcon')" color="orange" />
            </template>
          </q-input>

          <!-- Sesso (per contesto interpretazione) -->
          <q-select
            v-model="formData.gender"
            :options="genderOptions"
            :label="t('bmi.form.genderLabel')"
            outlined
            class="q-mb-md"
            emit-value
            map-options
          >
            <template v-slot:prepend>
              <q-icon :name="t('bmi.form.genderIcon')" color="purple" />
            </template>
          </q-select>

          <!-- Bottone Calcola -->
          <q-btn
            @click="calculateBMI"
            color="primary"
            size="lg"
            class="full-width q-mb-sm"
            icon="calculate"
            :disable="!isFormValid"
          >
            {{ t('bmi.buttons.calculate') }}
          </q-btn>
          <q-btn
            @click="resetForm"
            color="negative"
            size="lg"
            class="full-width"
            icon="refresh"
            outline
          >
            {{ t('bmi.buttons.reset') }}
          </q-btn>
        </q-card-section>
      </q-card>
    </div>

    <!-- Pannello Risultati -->
    <div class="col-12 col-md-6">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">{{ t('bmi.results.title') }}</h6>

          <!-- Risultato Principale -->
          <div class="text-center q-mb-lg">
            <div class="text-h3 text-primary q-mb-sm">
              {{ result.bmi.toFixed(1) }}
            </div>
            <div class="text-subtitle1 text-grey-7">
              <strong>{{ t('bmi.results.bmiValue') }}</strong> ({{ t('bmi.results.bmiSubtitle') }})
            </div>
          </div>

          <!-- Classificazione WHO -->
          <q-separator class="q-mb-md" />

          <div class="q-mb-md">
            <div class="text-h6 q-mb-sm">{{ t('bmi.results.classification') }}</div>
            <q-chip :color="result.color" text-color="white" class="text-weight-bold" size="lg">
              {{ result.category }}
            </q-chip>
          </div>

          <!-- Grafico Visuale BMI -->
          <div class="q-mb-lg" v-if="result.bmi > 0">
            <div class="text-subtitle2 q-mb-sm">{{ t('bmi.results.scaleTitle') }}</div>
            <div class="bmi-scale">
              <div class="bmi-bar">
                <div class="bmi-indicator" :style="{ left: getBMIPosition() + '%' }"></div>
              </div>
              <div class="bmi-labels row justify-between q-mt-sm">
                <span class="text-caption">{{ t('bmi.results.scaleLabels.underweight') }}</span>
                <span class="text-caption">{{ t('bmi.results.scaleLabels.normal1') }}</span>
                <span class="text-caption">{{ t('bmi.results.scaleLabels.normal2') }}</span>
                <span class="text-caption">{{ t('bmi.results.scaleLabels.overweight') }}</span>
                <span class="text-caption">{{ t('bmi.results.scaleLabels.obese1') }}</span>
                <span class="text-caption">{{ t('bmi.results.scaleLabels.obese2') }}</span>
              </div>
            </div>
          </div>

          <!-- Peso Ideale -->
          <div class="q-mb-md" v-if="result.idealWeight.min > 0">
            <div class="text-h6 q-mb-sm">{{ t('bmi.results.idealWeight') }}</div>
            <div class="text-body1">
              <strong>
                {{ result.idealWeight.min.toFixed(1) }} - {{ result.idealWeight.max.toFixed(1) }} kg
              </strong>
            </div>
            <div class="text-caption text-grey-6" v-if="result.weightDifference !== 0">
              {{
                result.weightDifference > 0
                  ? t('bmi.results.weightDifference.excess')
                  : t('bmi.results.weightDifference.deficit')
              }}
              {{ Math.abs(result.weightDifference).toFixed(1) }} kg
            </div>
          </div>

          <!-- Classificazioni Dettagliate -->
          <q-expansion-item
            :icon="t('bmi.sections.classification.icon')"
            :label="t('bmi.sections.classification.title')"
            class="text-primary"
          >
            <q-card class="q-pa-md">
              <div class="row q-gutter-sm text-caption">
                <div
                  class="col-12"
                  v-html="t('bmi.sections.classification.items.underweight')"
                ></div>
                <div class="col-12" v-html="t('bmi.sections.classification.items.normal')"></div>
                <div
                  class="col-12"
                  v-html="t('bmi.sections.classification.items.overweight')"
                ></div>
                <div class="col-12" v-html="t('bmi.sections.classification.items.obese1')"></div>
                <div class="col-12" v-html="t('bmi.sections.classification.items.obese2')"></div>
                <div class="col-12" v-html="t('bmi.sections.classification.items.obese3')"></div>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- Definizione e Significato Clinico -->
          <q-expansion-item
            :icon="t('bmi.sections.definition.icon')"
            :label="t('bmi.sections.definition.title')"
            class="q-mt-sm"
            header-class="bg-blue-1 text-blue-9"
          >
            <q-card class="bg-blue-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('bmi.sections.definition.whatIs.title') }}</strong>
                  {{ t('bmi.sections.definition.whatIs.text') }}
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('bmi.sections.definition.clinicalSignificance.title') }}</strong>
                  {{ t('bmi.sections.definition.clinicalSignificance.intro') }}
                </p>
                <ul class="text-body2">
                  <li v-for="(item, index) in 4" :key="index">
                    {{ t(`bmi.sections.definition.clinicalSignificance.items[${index}]`) }}
                  </li>
                </ul>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- Fisiologia e Interpretazione -->
          <q-expansion-item
            :icon="t('bmi.sections.physiology.icon')"
            :label="t('bmi.sections.physiology.title')"
            class="q-mt-sm"
            header-class="bg-green-1 text-green-9"
          >
            <q-card class="bg-green-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm">
                  {{ t('bmi.sections.physiology.intro') }}
                </p>
                <ul class="text-body2 q-mb-sm">
                  <li
                    v-for="(item, index) in 3"
                    :key="index"
                    v-html="t(`bmi.sections.physiology.limitations[${index}]`)"
                  ></li>
                </ul>
                <p class="text-body2">
                  <strong>{{ t('bmi.sections.physiology.conclusion.title') }}</strong>
                  {{ t('bmi.sections.physiology.conclusion.text') }}
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- Come si Misura -->
          <q-expansion-item
            :icon="t('bmi.sections.measurement.icon')"
            :label="t('bmi.sections.measurement.title')"
            class="q-mt-sm"
            header-class="bg-amber-1 text-amber-9"
          >
            <q-card class="bg-amber-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('bmi.sections.measurement.weight.title') }}</strong>
                  {{ t('bmi.sections.measurement.weight.text') }}
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('bmi.sections.measurement.height.title') }}</strong>
                  {{ t('bmi.sections.measurement.height.text') }}
                </p>
                <p class="text-body2">
                  <strong>{{ t('bmi.sections.measurement.frequency.title') }}</strong>
                  {{ t('bmi.sections.measurement.frequency.text') }}
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- Formula di Calcolo -->
          <q-expansion-item
            :icon="t('bmi.sections.formula.icon')"
            :label="t('bmi.sections.formula.title')"
            class="q-mt-sm"
            header-class="bg-cyan-1 text-cyan-9"
          >
            <q-card class="bg-cyan-1">
              <q-card-section>
                <div class="text-body2 q-mb-sm">
                  <strong>{{ t('bmi.sections.formula.formulaTitle') }}</strong>
                </div>
                <div class="bg-white q-pa-md text-center q-mb-sm">
                  <code class="text-h6">{{ t('bmi.sections.formula.formulaText') }}</code>
                </div>
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('bmi.sections.formula.example.title') }}</strong
                  ><br />
                  {{ t('bmi.sections.formula.example.calculation') }}<br />
                  {{ t('bmi.sections.formula.example.result') }}
                </p>
                <p class="text-caption text-grey-8">
                  {{ t('bmi.sections.formula.note') }}
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- Interpretazione Risultati -->
          <q-expansion-item
            :icon="t('bmi.sections.interpretation.icon')"
            :label="t('bmi.sections.interpretation.title')"
            class="q-mt-sm"
            header-class="bg-orange-1 text-orange-9"
          >
            <q-card class="bg-orange-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm">
                  {{ t('bmi.sections.interpretation.intro') }}
                </p>
                <ul class="text-body2 q-mb-sm">
                  <li
                    v-for="(item, index) in 6"
                    :key="index"
                    v-html="t(`bmi.sections.interpretation.categories[${index}]`)"
                  ></li>
                </ul>
                <p class="text-caption text-grey-8">
                  {{ t('bmi.sections.interpretation.note') }}
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- Applicazioni Cliniche -->
          <q-expansion-item
            :icon="t('bmi.sections.clinicalApplications.icon')"
            :label="t('bmi.sections.clinicalApplications.title')"
            class="q-mt-sm"
            header-class="bg-purple-1 text-purple-9"
          >
            <q-card class="bg-purple-1">
              <q-card-section>
                <ul class="text-body2">
                  <li v-for="(app, index) in 4" :key="index">
                    <strong>{{
                      t(`bmi.sections.clinicalApplications.applications[${index}].title`)
                    }}</strong>
                    {{ t(`bmi.sections.clinicalApplications.applications[${index}].text`) }}
                  </li>
                </ul>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- Valori di Allerta e Azioni Cliniche -->
          <q-expansion-item
            :icon="t('bmi.sections.alerts.icon')"
            :label="t('bmi.sections.alerts.title')"
            class="q-mt-sm"
            header-class="bg-red-1 text-red-9"
          >
            <q-card class="bg-red-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('bmi.sections.alerts.critical.title') }}</strong>
                </p>
                <p
                  class="text-body2 q-mb-sm"
                  v-for="(item, index) in 2"
                  :key="'crit-' + index"
                  v-html="t(`bmi.sections.alerts.critical.items[${index}]`)"
                ></p>
                <p class="text-body2 q-mb-sm">
                  <strong>{{ t('bmi.sections.alerts.monitoring.title') }}</strong>
                </p>
                <p
                  class="text-body2 q-mb-sm"
                  v-for="(item, index) in 3"
                  :key="'mon-' + index"
                  v-html="t(`bmi.sections.alerts.monitoring.items[${index}]`)"
                ></p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- Note Pratiche -->
          <q-expansion-item
            :icon="t('bmi.sections.documentation.icon')"
            :label="t('bmi.sections.documentation.title')"
            class="q-mt-sm"
            header-class="bg-indigo-1 text-indigo-9"
          >
            <q-card class="bg-indigo-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm" v-for="(guideline, index) in 4" :key="index">
                  <strong>{{ t(`bmi.sections.documentation.guidelines[${index}].title`) }}</strong>
                  {{ t(`bmi.sections.documentation.guidelines[${index}].text`) }}
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- Riferimenti Scientifici -->
          <q-expansion-item
            :icon="t('bmi.sections.bibliography.icon')"
            :label="t('bmi.sections.bibliography.title')"
            class="q-mt-sm"
            header-class="bg-teal-1 text-teal-9"
          >
            <q-card class="bg-teal-1">
              <q-card-section>
                <ul class="text-body2">
                  <li v-for="(ref, index) in 4" :key="index">
                    <strong>{{ t(`bmi.sections.bibliography.references[${index}].title`) }}</strong>
                    {{ t(`bmi.sections.bibliography.references[${index}].text`) }}
                    <span
                      v-if="
                        t(
                          `bmi.sections.bibliography.references[${index}].link`,
                          {},
                          { missingWarn: false },
                        )
                      "
                      class="text-blue"
                    >
                      ({{ t(`bmi.sections.bibliography.references[${index}].link`) }})</span
                    >
                    <span
                      v-if="
                        t(
                          `bmi.sections.bibliography.references[${index}].doi`,
                          {},
                          { missingWarn: false },
                        )
                      "
                    >
                      {{ t(`bmi.sections.bibliography.references[${index}].doi`) }}</span
                    >
                    <span
                      v-if="
                        t(
                          `bmi.sections.bibliography.references[${index}].note`,
                          {},
                          { missingWarn: false },
                        )
                      "
                      class="text-caption"
                    >
                      ({{ t(`bmi.sections.bibliography.references[${index}].note`) }})</span
                    >
                  </li>
                </ul>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================ */
/* BMI VISUAL SCALE STYLES                                      */
/* ============================================================ */

.bmi-scale {
  position: relative;
  width: 100%;
}

.bmi-bar {
  position: relative;
  height: 30px;
  background: linear-gradient(
    to right,
    #2196f3 0%,
    #2196f3 20%,
    #4caf50 20%,
    #4caf50 45%,
    #ff9800 45%,
    #ff9800 65%,
    #f44336 65%,
    #f44336 80%,
    #e91e63 80%,
    #e91e63 100%
  );
  border-radius: 4px;
}

.bmi-indicator {
  position: absolute;
  top: -5px;
  width: 4px;
  height: 40px;
  background-color: #000;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: left 0.3s ease;
}

.bmi-labels {
  font-size: 11px;
  color: #666;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .bmi-bar {
    height: 25px;
  }

  .bmi-indicator {
    height: 35px;
  }
}
</style>
