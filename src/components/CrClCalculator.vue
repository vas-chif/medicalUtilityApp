/**
 * @file CrClCalculator.vue
 * @description Componente calcolatore Creatinine Clearance (Cockcroft-Gault)
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-11-06
 *
 * Creatinine Clearance Calculator - Cockcroft-Gault formula for drug dosing
 */
<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="info" color="blue" />
      </template>
      <div class="text-body2">
        <strong>{{ $t('crcl.bannerTitle') }}:</strong> {{ $t('crcl.bannerText') }}
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="edit" class="q-mr-xs" />
              {{ $t('crcl.patientParameters') }}
            </div>

            <!-- Creatinina Sierica -->
            <q-input
              v-model.number="formData.creatinine"
              type="number"
              step="0.01"
              :label="$t('crcl.creatinine')"
              suffix="mg/dL"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => (val > 0 && val <= 20) || $t('crcl.creatinineValidation')]"
            >
              <template v-slot:prepend>
                <q-icon name="science" color="blue" size="sm" />
              </template>
            </q-input>

            <!-- Età -->
            <q-input
              v-model.number="formData.age"
              type="number"
              :label="$t('crcl.age')"
              :suffix="$t('common.years')"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => (val > 0 && val <= 120) || $t('crcl.ageValidation')]"
            >
              <template v-slot:prepend>
                <q-icon name="cake" color="orange" size="sm" />
              </template>
            </q-input>

            <!-- Peso -->
            <q-input
              v-model.number="formData.weight"
              type="number"
              step="0.1"
              :label="$t('crcl.weight')"
              :suffix="$t('common.kg')"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => (val > 0 && val <= 500) || $t('crcl.weightValidation')]"
            >
              <template v-slot:prepend>
                <q-icon name="fitness_center" color="purple" size="sm" />
              </template>
            </q-input>

            <!-- Sesso -->
            <q-select
              v-model="formData.gender"
              :options="genderOptions"
              :label="$t('crcl.gender')"
              outlined
              dense
              class="q-mb-md"
              emit-value
              map-options
              :rules="[(val: string) => val !== null || $t('crcl.genderValidation')]"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="green" size="sm" />
              </template>
            </q-select>

            <!-- Bottone Calcola -->
            <q-btn
              @click="calculateCrCl"
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
                {{ result.crCl.toFixed(1) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>mL/min</strong> (CrCl)
              </div>
              <div class="text-caption text-grey-6">{{ $t('crcl.cockcroftGault') }}</div>
            </div>

            <!-- Separatore -->
            <q-separator class="q-mb-md" />

            <!-- Classificazione Funzione Renale -->
            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">🎯 {{ $t('crcl.renalFunction') }}:</div>
              <q-chip :color="result.color" text-color="white" class="text-weight-bold" size="md">
                {{ result.category }}
              </q-chip>
              <div class="text-body2 q-mt-sm">
                {{ result.description }}
              </div>
            </div>

            <!-- Grafico Funzione Renale -->
            <div class="q-mb-lg" v-if="result.crCl > 0">
              <div class="text-subtitle2 q-mb-sm">📊 {{ $t('crcl.visualScale') }}:</div>
              <div class="crcl-scale">
                <div class="crcl-bar">
                  <div class="crcl-indicator" :style="{ left: getCrClPosition() + '%' }"></div>
                </div>
                <div class="crcl-labels row justify-between q-mt-sm">
                  <span class="text-caption">0</span>
                  <span class="text-caption">30</span>
                  <span class="text-caption">60</span>
                  <span class="text-caption">90</span>
                  <span class="text-caption">120+</span>
                </div>
              </div>
            </div>

            <!-- Aggiustamento Dosaggio -->
            <q-expansion-item
              icon="medication"
              :label="$t('crcl.drugDosing')"
              class="text-primary"
              v-if="result.crCl > 0"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="text-body2">
                  {{ getDrugDosingNotes() }}
                </div>
              </div>
            </q-expansion-item>

            <!-- Classificazione Funzione Renale -->
            <q-expansion-item
              icon="info"
              :label="$t('crcl.classification')"
              class="text-primary q-mt-sm"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="row q-gutter-sm text-caption">
                  <div class="col-12">
                    <span class="text-weight-bold text-green">{{ $t('crcl.normal') }}:</span> >90
                    mL/min - {{ $t('crcl.normalDesc') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-orange">{{ $t('crcl.mild') }}:</span> 60-90
                    mL/min - {{ $t('crcl.mildDesc') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-deep-orange">{{ $t('crcl.moderate') }}:</span>
                    30-60 mL/min - {{ $t('crcl.moderateDesc') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-red">{{ $t('crcl.severe') }}:</span> 15-30
                    mL/min - {{ $t('crcl.severeDesc') }}
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-purple">{{ $t('crcl.esrd') }}:</span> &lt;15
                    mL/min - {{ $t('crcl.esrdDesc') }}
                  </div>
                </div>
              </div>
            </q-expansion-item>

            <!-- Formula -->
            <q-expansion-item
              icon="functions"
              :label="$t('crcl.formulaTitle')"
              class="text-primary q-mt-sm"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="text-body2">
                  <strong>{{ $t('crcl.cockcroftGaultFormula') }}:</strong><br />
                  <code class="q-mt-sm q-pa-sm bg-white rounded-borders">
                    CrCl = [(140 - Age) × Weight (kg)] / (72 × SCr mg/dL)<br />
                    × 0.85 {{ $t('crcl.ifFemale') }}
                  </code>
                  <p class="q-mt-sm text-caption">
                    {{ $t('crcl.formulaNote') }}
                  </p>
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
 * Form data interface for CrCl calculation
 */
interface CrClFormData {
  /** Serum creatinine (mg/dL) */
  creatinine: number | null;
  /** Patient age (years) */
  age: number | null;
  /** Patient weight (kg) */
  weight: number | null;
  /** Patient gender */
  gender: string | null;
}

/**
 * CrCl calculation result interface
 */
interface CrClResult {
  /** Calculated CrCl value */
  crCl: number;
  /** Function category */
  category: string;
  /** Category description */
  description: string;
  /** Color for UI display */
  color: string;
}

// ============================================================
// STATE
// ============================================================
/** Initial form data */
const initialFormData: CrClFormData = {
  creatinine: null,
  age: null,
  weight: null,
  gender: null,
};

/** Initial result state */
const initialResult: CrClResult = {
  crCl: 0,
  category: '',
  description: '',
  color: 'grey',
};

/** Form data state */
const formData = ref<CrClFormData>({ ...initialFormData });

/** Result state */
const result = ref<CrClResult>({ ...initialResult });

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
  { label: $t('crcl.male'), value: 'male' },
  { label: $t('crcl.female'), value: 'female' },
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
 * Formula: CrCl = [(140 - Age) × Weight (kg)] / (72 × SCr mg/dL) × 0.85 (if female)
 * Reference: Cockcroft DW, Gault MH (1976). Prediction of creatinine clearance from serum creatinine.
 * Nephron 16(1): 31-41
 *
 * @returns CrCl value in mL/min
 */
const calculateCockcroftGault = (): number => {
  const { creatinine, age, weight, gender } = formData.value;
  if (!creatinine || !age || !weight || !gender) return 0;

  // Calculate CrCl
  let crCl = ((140 - age) * weight) / (72 * creatinine);

  // Gender correction
  if (gender === 'female') {
    crCl *= 0.85;
  }

  return crCl;
};

/**
 * Main calculation function
 */
const calculateCrCl = () => {
  if (!isFormValid.value) return;

  const crCl = calculateCockcroftGault();
  const category = getCrClCategory(crCl);

  result.value = {
    crCl,
    category: category.category,
    description: category.description,
    color: category.color,
  };
};

/**
 * Get CrCl category classification
 *
 * @param crCl - CrCl value
 * @returns Category classification object
 */
const getCrClCategory = (
  crCl: number
): { category: string; description: string; color: string } => {
  if (crCl >= 90)
    return {
      category: $t('crcl.normal'),
      description: $t('crcl.normalDesc'),
      color: 'green',
    };
  if (crCl >= 60)
    return {
      category: $t('crcl.mild'),
      description: $t('crcl.mildDesc'),
      color: 'orange',
    };
  if (crCl >= 30)
    return {
      category: $t('crcl.moderate'),
      description: $t('crcl.moderateDesc'),
      color: 'deep-orange',
    };
  if (crCl >= 15)
    return {
      category: $t('crcl.severe'),
      description: $t('crcl.severeDesc'),
      color: 'red',
    };
  return {
    category: $t('crcl.esrd'),
    description: $t('crcl.esrdDesc'),
    color: 'purple',
  };
};

/**
 * Get CrCl position for visual indicator
 * @returns Position percentage
 */
const getCrClPosition = (): number => {
  const crCl = result.value.crCl;
  if (crCl <= 0) return 0;
  if (crCl >= 120) return 100;
  return (crCl / 120) * 100;
};

/**
 * Get drug dosing notes based on CrCl value
 * @returns Drug dosing notes
 */
const getDrugDosingNotes = (): string => {
  const crCl = result.value.crCl;

  if (crCl >= 90) {
    return $t('crcl.dosingNormal');
  } else if (crCl >= 60) {
    return $t('crcl.dosingMild');
  } else if (crCl >= 30) {
    return $t('crcl.dosingModerate');
  } else if (crCl >= 15) {
    return $t('crcl.dosingSevere');
  } else {
    return $t('crcl.dosingEsrd');
  }
};

/**
 * Reset form to initial state
 */
const resetForm = () => {
  resetFormData();
  result.value = { ...initialResult };
};
</script>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

/* Scala CrCl Visuale */
.crcl-scale {
  position: relative;
  width: 100%;
}

.crcl-bar {
  height: 20px;
  background: linear-gradient(
    to right,
    #9c27b0 0% 12.5%,
    /* ESRD - Purple */ #f44336 12.5% 25%,
    /* Severe - Red */ #ff5722 25% 50%,
    /* Moderate - Deep Orange */ #ff9800 50% 75%,
    /* Mild - Orange */ #4caf50 75% 100% /* Normal - Green */
  );
  border-radius: 10px;
  position: relative;
}

.crcl-indicator {
  position: absolute;
  top: -5px;
  width: 4px;
  height: 30px;
  background-color: #333;
  border-radius: 2px;
  transform: translateX(-50%);
  transition: left 0.3s ease;
}

.crcl-indicator::before {
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

code {
  display: block;
  font-family: monospace;
  font-size: 0.9em;
  line-height: 1.5;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .q-pa-md {
    padding: 8px;
  }
}
</style>
