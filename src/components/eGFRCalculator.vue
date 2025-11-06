/**
 * @file eGFRCalculator.vue
 * @description Componente calcolatore eGFR (estimated Glomerular Filtration Rate)
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-11-06
 *
 * Estimated GFR Calculator - MDRD and CKD-EPI formulas for kidney function assessment
 */
<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="info" color="blue" />
      </template>
      <div class="text-body2">
        <strong>{{ $t('egfr.bannerTitle') }}:</strong> {{ $t('egfr.bannerText') }}
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="edit" class="q-mr-xs" />
              {{ $t('egfr.patientParameters') }}
            </div>

            <!-- Creatinina Sierica -->
            <q-input
              v-model.number="formData.creatinine"
              type="number"
              step="0.01"
              :label="$t('egfr.creatinine')"
              suffix="mg/dL"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => (val > 0 && val <= 20) || $t('egfr.creatinineValidation')]"
            >
              <template v-slot:prepend>
                <q-icon name="science" color="blue" size="sm" />
              </template>
            </q-input>

            <!-- Età -->
            <q-input
              v-model.number="formData.age"
              type="number"
              :label="$t('egfr.age')"
              suffix="anni"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => (val > 0 && val <= 120) || $t('egfr.ageValidation')]"
            >
              <template v-slot:prepend>
                <q-icon name="cake" color="orange" size="sm" />
              </template>
            </q-input>

            <!-- Sesso -->
            <q-select
              v-model="formData.gender"
              :options="genderOptions"
              :label="$t('egfr.gender')"
              outlined
              dense
              class="q-mb-sm"
              emit-value
              map-options
              :rules="[(val: string) => val !== null || $t('egfr.genderValidation')]"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="purple" size="sm" />
              </template>
            </q-select>

            <!-- Razza (per correzione) -->
            <q-select
              v-model="formData.race"
              :options="raceOptions"
              :label="$t('egfr.race')"
              outlined
              dense
              class="q-mb-sm"
              emit-value
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="public" color="green" size="sm" />
              </template>
            </q-select>

            <!-- Selezione Formula -->
            <q-select
              v-model="formData.formula"
              :options="formulaOptions"
              :label="$t('egfr.formula')"
              outlined
              dense
              class="q-mb-md"
              emit-value
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="functions" color="cyan" size="sm" />
              </template>
            </q-select>

            <!-- Bottone Calcola -->
            <q-btn
              @click="calculateGFR"
              color="primary"
              size="md"
              class="full-width q-mb-sm"
              icon="calculate"
              :disable="!isFormValid"
            >
              {{ $t('common.calculate') }}
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
              {{ $t('common.reset') }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="assessment" class="q-mr-xs" />
              {{ $t('common.results') }}
            </div>

            <!-- Risultato Principale -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 text-primary q-mb-sm">
                {{ result.gfr.toFixed(1) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>mL/min/1.73m²</strong> (eGFR)
              </div>
              <div class="text-caption text-grey-6">
                {{ $t('egfr.formulaLabel') }}: {{ getFormulaName() }}
              </div>
            </div>

            <!-- Classificazione CKD -->
            <q-separator class="q-mb-md" />

            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">🎯 {{ $t('egfr.ckdStage') }}:</div>
              <q-chip :color="result.color" text-color="white" class="text-weight-bold" size="md">
                {{ result.stage }}
              </q-chip>
              <div class="text-body2 q-mt-sm">
                {{ result.description }}
              </div>
            </div>

            <!-- Grafico Funzione Renale -->
            <div class="q-mb-lg" v-if="result.gfr > 0">
              <div class="text-subtitle2 q-mb-sm">📊 {{ $t('egfr.renalFunction') }}:</div>
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
                :label="$t('egfr.compareFormulas')"
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

            <!-- Stadi CKD -->
            <q-expansion-item
              icon="info"
              :label="$t('egfr.ckdClassification')"
              class="text-primary"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="row q-gutter-sm text-caption">
                  <div class="col-12">
                    <span class="text-weight-bold text-green">{{ $t('egfr.stage1') }}:</span> ≥90 -
                    {{ $t('egfr.stage1Desc') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-light-green">{{ $t('egfr.stage2') }}:</span>
                    60-89 - {{ $t('egfr.stage2Desc') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-orange">{{ $t('egfr.stage3a') }}:</span>
                    45-59 - {{ $t('egfr.stage3aDesc') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-deep-orange">{{ $t('egfr.stage3b') }}:</span>
                    30-44 - {{ $t('egfr.stage3bDesc') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-red">{{ $t('egfr.stage4') }}:</span> 15-29 -
                    {{ $t('egfr.stage4Desc') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-purple">{{ $t('egfr.stage5') }}:</span>
                    &lt;15 - {{ $t('egfr.stage5Desc') }}
                  </div>
                </div>
              </div>
            </q-expansion-item>

            <!-- Note Cliniche -->
            <q-expansion-item
              icon="medical_services"
              :label="$t('egfr.clinicalNotes')"
              class="text-primary q-mt-sm"
              v-if="result.gfr > 0"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="text-body2">
                  {{ getClinicalNotes() }}
                </div>
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ============================================================
// IMPORTS
// ============================================================
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useResetForm } from 'src/composables/useResetForm';

// ============================================================
// I18N
// ============================================================
const { t: $t } = useI18n();

// ============================================================
// TYPES
// ============================================================
/**
 * Form data interface for eGFR calculation
 */
interface GFRFormData {
  /** Serum creatinine (mg/dL) */
  creatinine: number | null;
  /** Patient age (years) */
  age: number | null;
  /** Patient gender */
  gender: string | null;
  /** Patient race/ethnicity */
  race: string | null;
  /** Formula selection */
  formula: string;
}

/**
 * eGFR calculation result interface
 */
interface GFRResult {
  /** Calculated GFR value */
  gfr: number;
  /** CKD stage */
  stage: string;
  /** Stage description */
  description: string;
  /** Color for UI display */
  color: string;
}

// ============================================================
// STATE
// ============================================================
/** Initial form data */
const initialFormData: GFRFormData = {
  creatinine: null,
  age: null,
  gender: null,
  race: 'other',
  formula: 'ckdepi',
};

/** Initial result state */
const initialResult: GFRResult = {
  gfr: 0,
  stage: '',
  description: '',
  color: 'grey',
};

/** Form data state */
const formData = ref<GFRFormData>({ ...initialFormData });

/** Result state */
const result = ref<GFRResult>({ ...initialResult });

/** Show comparison toggle */
const showComparison = ref(false);

// ============================================================
// COMPOSABLES
// ============================================================
const { resetForm: resetFormData } = useResetForm(formData, result, initialFormData);

// ============================================================
// COMPUTED
// ============================================================
/**
 * Gender options for select
 */
const genderOptions = computed(() => [
  { label: $t('egfr.male'), value: 'male' },
  { label: $t('egfr.female'), value: 'female' },
]);

/**
 * Race options for select
 */
const raceOptions = computed(() => [
  { label: $t('egfr.caucasian'), value: 'other' },
  { label: $t('egfr.african'), value: 'african' },
]);

/**
 * Formula options for select
 */
const formulaOptions = computed(() => [
  { label: $t('egfr.ckdepiFormula'), value: 'ckdepi' },
  { label: $t('egfr.mdrdFormula'), value: 'mdrd' },
]);

/**
 * Form validation check
 * @returns true if form is valid
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
 * Calculate MDRD eGFR
 * Formula: 175 × (SCr)^-1.154 × (Age)^-0.203 × (0.742 if female) × (1.212 if African American)
 * Reference: Lamb E (2007). Renal disorders Part 1 of 3. Medicine, Vol 35(3): 120-125
 *
 * @returns MDRD eGFR value
 */
const calculateMDRD = (): number => {
  const { creatinine, age, gender, race } = formData.value;
  if (!creatinine || !age || !gender) return 0;

  let gfr = 175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203);

  // Gender correction
  if (gender === 'female') {
    gfr *= 0.742;
  }

  // Race correction
  if (race === 'african') {
    gfr *= 1.212;
  }

  return gfr;
};

/**
 * Calculate CKD-EPI eGFR
 * Reference: Inker LA, Levey AS (2019). Measurement and Estimation of Kidney Function
 *
 * @returns CKD-EPI eGFR value
 */
const calculateCKDEPI = (): number => {
  const { creatinine, age, gender, race } = formData.value;
  if (!creatinine || !age || !gender) return 0;

  // CKD-EPI constants
  let kappa: number, alpha: number, genderFactor: number;

  if (gender === 'female') {
    kappa = 0.7;
    alpha = creatinine <= 0.7 ? -0.329 : -1.209;
    genderFactor = creatinine <= 0.7 ? 1.018 : 1.018;
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

  // Race correction
  if (race === 'african') {
    gfr *= 1.159;
  }

  return gfr;
};

/**
 * Main calculation function
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
};

/**
 * Get CKD stage classification
 * Reference: Charles C, Ferris AH (2020). Nephrology. Primary Care: Clinics in Office Practice
 *
 * @param gfr - GFR value
 * @returns Stage classification object
 */
const getCKDStage = (gfr: number): { stage: string; description: string; color: string } => {
  if (gfr >= 90)
    return {
      stage: $t('egfr.stage1'),
      description: $t('egfr.stage1Desc'),
      color: 'green',
    };
  if (gfr >= 60)
    return {
      stage: $t('egfr.stage2'),
      description: $t('egfr.stage2Desc'),
      color: 'light-green',
    };
  if (gfr >= 45)
    return {
      stage: $t('egfr.stage3a'),
      description: $t('egfr.stage3aDesc'),
      color: 'orange',
    };
  if (gfr >= 30)
    return {
      stage: $t('egfr.stage3b'),
      description: $t('egfr.stage3bDesc'),
      color: 'deep-orange',
    };
  if (gfr >= 15)
    return {
      stage: $t('egfr.stage4'),
      description: $t('egfr.stage4Desc'),
      color: 'red',
    };
  return {
    stage: $t('egfr.stage5'),
    description: $t('egfr.stage5Desc'),
    color: 'purple',
  };
};

/**
 * Get GFR position for visual indicator
 * @returns Position percentage
 */
const getGFRPosition = (): number => {
  const gfr = result.value.gfr;
  if (gfr <= 0) return 0;
  if (gfr >= 120) return 100;
  return (gfr / 120) * 100;
};

/**
 * Get formula name for display
 * @returns Formula name
 */
const getFormulaName = (): string => {
  return formData.value.formula === 'mdrd' ? 'MDRD' : 'CKD-EPI';
};

/**
 * Get clinical notes based on GFR value and age
 * @returns Clinical notes string
 */
const getClinicalNotes = (): string => {
  const gfr = result.value.gfr;
  const age = formData.value.age || 0;

  let notes = '';

  if (gfr >= 90) {
    notes = $t('egfr.notes90');
  } else if (gfr >= 60) {
    notes = $t('egfr.notes60');
  } else if (gfr >= 45) {
    notes = $t('egfr.notes45');
  } else if (gfr >= 30) {
    notes = $t('egfr.notes30');
  } else if (gfr >= 15) {
    notes = $t('egfr.notes15');
  } else {
    notes = $t('egfr.notes0');
  }

  if (age >= 65) {
    notes += ' ' + $t('egfr.elderlyNote');
  }

  return notes;
};

/**
 * Reset form to initial state
 */
const resetForm = () => {
  resetFormData();
  result.value = { ...initialResult };
  showComparison.value = false;
};
</script>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

/* Scala GFR Visuale */
.gfr-scale {
  position: relative;
  width: 100%;
}

.gfr-bar {
  height: 20px;
  background: linear-gradient(
    to right,
    #9c27b0 0% 12.5%,
    /* Stage 5 - Purple */ #f44336 12.5% 25%,
    /* Stage 4 - Red */ #ff5722 25% 37.5%,
    /* Stage 3b - Deep Orange */ #ff9800 37.5% 50%,
    /* Stage 3a - Orange */ #8bc34a 50% 75%,
    /* Stage 2 - Light Green */ #4caf50 75% 100% /* Stage 1 - Green */
  );
  border-radius: 10px;
  position: relative;
}

.gfr-indicator {
  position: absolute;
  top: -5px;
  width: 4px;
  height: 30px;
  background-color: #333;
  border-radius: 2px;
  transform: translateX(-50%);
  transition: left 0.3s ease;
}

.gfr-indicator::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid #333;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .q-pa-md {
    padding: 8px;
  }
}
</style>
