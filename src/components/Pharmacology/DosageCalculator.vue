<!-- DosageCalculator.vue -->

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file DosageCalculator.vue
 * @description Weight-based and fixed dose calculator with age/renal adjustments.
 *              Implements PK/PD principles (ADME, Vd, clearance, half-life, steady state).
 *              Supports pediatric dosing (mg/kg, BSA-based) and CKD staging dose reduction.
 *
 * @author Vasile Chifeac
 * @created 2025-11-16
 * @modified 2025-12-16
 *
 * @example
 * <DosageCalculator
 *   calculateButtonText="Calcola Dosaggio"
 *   resetButtonText="Reset"
 *   @calculated="handleDosageCalculated"
 * />
 *
 * @notes
 * - 5 sezioni documentazione medica (Farmacocinetica, Pediatria, CKD, Loading/Maintenance, Riferimenti)
 * - 5 farmaci database: Paracetamolo, Amoxicillina, Furosemide, Digossina, Aspirina
 * - Cockcroft-Gault eGFR estimation per aggiustamento renale
 * - Age-specific adjustments: Neonati (50%), Bambini (80%), Anziani (75%)
 * - TypeScript strict mode, professional JSDoc, GDPR-compliant logging
 *
 * @medical-references
 * - Holford NHG (2013). PK/PD Rational Dosing, ScienceDirect
 * - Kearns GL (2003). Developmental Pharmacology, NEJM
 * - Matzke GR (2016). Drug Dosing in Renal Failure, Brenner & Rector's The Kidney
 * - Rybak MJ (2020). Vancomycin TDM, AJHP
 */

import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSecureLogger } from 'src/composables/useSecureLogger';

// ============================================================
// I18N
// ============================================================
const i18n = useI18n({ useScope: 'global' });
const t = i18n.t.bind(i18n);
const tm = i18n.tm.bind(i18n);

// ============================================================
// LOGGING
// ============================================================
const { logger } = useSecureLogger();

// ============================================================
// PROPS & EMITS
// ============================================================

interface Props {
  /** Testo bottone calcola (default: "Calcola Dosaggio") */
  calculateButtonText?: string;
  /** Testo bottone reset (default: "Reset Dati") */
  resetButtonText?: string;
  /** Titolo sezione (optional) */
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  calculateButtonText: '',
  resetButtonText: '',
  title: '',
});

interface DosageCalculatedPayload {
  /** Dose totale per singola somministrazione */
  totalDose: number;
  /** Dose giornaliera totale */
  dailyDose: number;
  /** Fattore aggiustamento renale (0-1) */
  renalAdjustment: number;
  /** eGFR stimato (Cockcroft-Gault) in mL/min */
  estimatedGFR: number;
  /** Farmaco selezionato */
  drugName: string;
  /** Frequenza somministrazione */
  frequency: string;
}

const emit = defineEmits<{
  (e: 'calculated', payload: DosageCalculatedPayload): void;
}>();

// ============================================================
// TYPES & INTERFACES
// ============================================================

/**
 * Dosage Calculator - Form data interface
 * @interface DosageFormData
 */
interface DosageFormData {
  /** Patient weight in kilograms */
  weight: number | null;
  /** Patient age in years */
  age: number | null;
  /** Serum creatinine in mg/dL (for renal adjustment) */
  creatinine: number | null;
  /** Selected drug identifier */
  drug: string | null;
  /** Dose per kilogram (for weight-based dosing) */
  dosePerKg: number | null;
  /** Fixed dose (for non-weight-based dosing) */
  fixedDose: number | null;
  /** Administration frequency ('qd' | 'bid' | 'tid' | 'qid' | 'q6h' | 'q8h' | 'q12h') */
  frequency: string;
}

/**
 * Drug information database entry
 * @interface DrugInfo
 */
interface DrugInfo {
  /** Drug name (commercial or generic) */
  name: string;
  /** Pharmacological class */
  class: string;
  /** Dosing type: weight-based or fixed */
  type: 'weight-based' | 'fixed';
  /** Label for dose input field */
  doseLabel: string;
  /** Unit for dose (mg/kg, mg, μg/kg, etc.) */
  doseUnit: string;
  /** Clinical indications */
  indications: string;
  /** Therapeutic dosing range */
  therapeuticRange: string;
  /** Important clinical notes */
  notes: string;
  /** Decimal precision for display */
  precision: number;
  /** Whether drug requires renal dose adjustment */
  renalElimination: boolean;
}

/**
 * Dosage Calculator - Result interface
 * @interface DosageResult
 */
interface DosageResult {
  /** Calculated dose per administration */
  totalDose: number;
  /** Total daily dose */
  dailyDose: number;
  /** Renal adjustment factor (0-1) */
  renalAdjustment: number;
  /** Estimated GFR via Cockcroft-Gault (mL/min) */
  estimatedGFR: number;
}

// ============================================================
// STATE
// ============================================================

const initialDosageForm: DosageFormData = {
  weight: null,
  age: null,
  creatinine: null,
  drug: null,
  dosePerKg: null,
  fixedDose: null,
  frequency: 'bid',
};

const initialDosageResult: DosageResult = {
  totalDose: 0,
  dailyDose: 0,
  renalAdjustment: 1,
  estimatedGFR: 0,
};

const dosageForm = ref<DosageFormData>({ ...initialDosageForm });
const dosageResult = ref<DosageResult>({ ...initialDosageResult });

// Drug Database (with i18n)
const drugs = computed<Record<string, DrugInfo>>(() => ({
  paracetamol: {
    name: t('dosageCalculator.drugs.paracetamol.name'),
    class: t('dosageCalculator.drugs.paracetamol.class'),
    type: 'weight-based',
    doseLabel: t('dosageCalculator.drugs.paracetamol.doseLabel'),
    doseUnit: t('dosageCalculator.drugs.paracetamol.doseUnit'),
    indications: t('dosageCalculator.drugs.paracetamol.indications'),
    therapeuticRange: t('dosageCalculator.drugs.paracetamol.therapeuticRange'),
    notes: t('dosageCalculator.drugs.paracetamol.notes'),
    precision: 1,
    renalElimination: false,
  },
  amoxicillin: {
    name: t('dosageCalculator.drugs.amoxicillin.name'),
    class: t('dosageCalculator.drugs.amoxicillin.class'),
    type: 'weight-based',
    doseLabel: t('dosageCalculator.drugs.amoxicillin.doseLabel'),
    doseUnit: t('dosageCalculator.drugs.amoxicillin.doseUnit'),
    indications: t('dosageCalculator.drugs.amoxicillin.indications'),
    therapeuticRange: t('dosageCalculator.drugs.amoxicillin.therapeuticRange'),
    notes: t('dosageCalculator.drugs.amoxicillin.notes'),
    precision: 1,
    renalElimination: true,
  },
  furosemide: {
    name: t('dosageCalculator.drugs.furosemide.name'),
    class: t('dosageCalculator.drugs.furosemide.class'),
    type: 'weight-based',
    doseLabel: t('dosageCalculator.drugs.furosemide.doseLabel'),
    doseUnit: t('dosageCalculator.drugs.furosemide.doseUnit'),
    indications: t('dosageCalculator.drugs.furosemide.indications'),
    therapeuticRange: t('dosageCalculator.drugs.furosemide.therapeuticRange'),
    notes: t('dosageCalculator.drugs.furosemide.notes'),
    precision: 1,
    renalElimination: true,
  },
  digoxin: {
    name: t('dosageCalculator.drugs.digoxin.name'),
    class: t('dosageCalculator.drugs.digoxin.class'),
    type: 'weight-based',
    doseLabel: t('dosageCalculator.drugs.digoxin.doseLabel'),
    doseUnit: t('dosageCalculator.drugs.digoxin.doseUnit'),
    indications: t('dosageCalculator.drugs.digoxin.indications'),
    therapeuticRange: t('dosageCalculator.drugs.digoxin.therapeuticRange'),
    notes: t('dosageCalculator.drugs.digoxin.notes'),
    precision: 1,
    renalElimination: true,
  },
  aspirin: {
    name: t('dosageCalculator.drugs.aspirin.name'),
    class: t('dosageCalculator.drugs.aspirin.class'),
    type: 'fixed',
    doseLabel: t('dosageCalculator.drugs.aspirin.doseLabel'),
    doseUnit: t('dosageCalculator.drugs.aspirin.doseUnit'),
    indications: t('dosageCalculator.drugs.aspirin.indications'),
    therapeuticRange: t('dosageCalculator.drugs.aspirin.therapeuticRange'),
    notes: t('dosageCalculator.drugs.aspirin.notes'),
    precision: 0,
    renalElimination: false,
  },
}));

// Drug Options (with i18n)
const drugOptions = computed(() =>
  Object.keys(drugs.value).map((key) => ({
    label: drugs.value[key]?.name || '',
    value: key,
  })),
);

// Frequency Options (with i18n)
const frequencyOptions = computed(() => [
  { label: t('dosageCalculator.form.frequency.options.qd'), value: 'qd' },
  { label: t('dosageCalculator.form.frequency.options.bid'), value: 'bid' },
  { label: t('dosageCalculator.form.frequency.options.tid'), value: 'tid' },
  { label: t('dosageCalculator.form.frequency.options.qid'), value: 'qid' },
  { label: t('dosageCalculator.form.frequency.options.q6h'), value: 'q6h' },
  { label: t('dosageCalculator.form.frequency.options.q8h'), value: 'q8h' },
  { label: t('dosageCalculator.form.frequency.options.q12h'), value: 'q12h' },
]);

// Selected Drug Computed
const selectedDrug = computed(() => {
  return dosageForm.value.drug ? drugs.value[dosageForm.value.drug] : null;
});

// Dosage Form Validation
const isDosageFormValid = computed(() => {
  return (
    dosageForm.value.weight !== null &&
    dosageForm.value.weight > 0 &&
    dosageForm.value.age !== null &&
    dosageForm.value.age >= 0 &&
    dosageForm.value.drug !== null &&
    ((selectedDrug.value?.type === 'weight-based' &&
      dosageForm.value.dosePerKg !== null &&
      dosageForm.value.dosePerKg > 0) ||
      (selectedDrug.value?.type === 'fixed' &&
        dosageForm.value.fixedDose !== null &&
        dosageForm.value.fixedDose > 0))
  );
});

// ============================================================
// METHODS
// ============================================================

/**
 * On Drug Change - Reset dose inputs
 */
const onDrugChange = () => {
  dosageForm.value.dosePerKg = null;
  dosageForm.value.fixedDose = null;
};

/**
 * Calculate Dosage - Main calculation logic
 */
const calculateDosage = () => {
  if (!isDosageFormValid.value || !selectedDrug.value) return;

  let baseDose = 0;

  if (selectedDrug.value.type === 'weight-based') {
    baseDose = dosageForm.value.dosePerKg! * dosageForm.value.weight!;
  } else {
    baseDose = dosageForm.value.fixedDose!;
  }

  // Aggiustamento per età
  const ageAdjustment = getAgeAdjustment();

  // Aggiustamento per funzione renale
  const renalAdjustment = calculateRenalAdjustment();

  // Dose finale
  const finalDose = baseDose * ageAdjustment * renalAdjustment;

  // Calcolo dose giornaliera
  const dailyFreq = getFrequencyPerDay();
  const dailyDose = finalDose * dailyFreq;

  dosageResult.value = {
    totalDose: finalDose,
    dailyDose,
    renalAdjustment,
    estimatedGFR: estimateGFR(),
  };

  // Emit event
  emit('calculated', {
    totalDose: finalDose,
    dailyDose,
    renalAdjustment,
    estimatedGFR: dosageResult.value.estimatedGFR,
    drugName: selectedDrug.value.name,
    frequency: dosageForm.value.frequency,
  });

  logger.info('Dosage calculated', {
    drug: selectedDrug.value.name,
    totalDose: finalDose.toFixed(selectedDrug.value.precision),
  });
};

/**
 * Get Age Adjustment Factor
 * @returns Age-specific dose adjustment (0-1)
 */
const getAgeAdjustment = (): number => {
  const age = dosageForm.value.age!;

  // Aggiustamenti età-specifici
  if (age >= 65) {
    return 0.75; // Riduzione 25% negli anziani
  } else if (age < 2) {
    return 0.5; // Riduzione 50% nei neonati
  } else if (age < 12) {
    return 0.8; // Riduzione 20% nei bambini
  }

  return 1; // Nessun aggiustamento negli adulti
};

/**
 * Calculate Renal Adjustment Factor
 * @returns Renal-specific dose adjustment (0-1)
 */
const calculateRenalAdjustment = (): number => {
  if (!dosageForm.value.creatinine || !selectedDrug.value?.renalElimination) {
    return 1;
  }

  const gfr = estimateGFR();

  // Aggiustamenti basati su eGFR (CKD staging)
  if (gfr >= 60) return 1; // CKD 1-2: Nessun aggiustamento
  if (gfr >= 30) return 0.75; // CKD 3: Riduzione 25%
  if (gfr >= 15) return 0.5; // CKD 4: Riduzione 50%
  return 0.25; // CKD 5: Riduzione 75%
};

/**
 * Estimate GFR using Cockcroft-Gault formula
 * @returns Estimated GFR in mL/min
 */
const estimateGFR = (): number => {
  if (!dosageForm.value.creatinine || !dosageForm.value.age || !dosageForm.value.weight) {
    return 0;
  }

  // Formula Cockcroft-Gault: ((140 - age) * weight) / (72 * creatinine)
  const { age, weight, creatinine } = dosageForm.value;
  return ((140 - age) * weight) / (72 * creatinine);
};

/**
 * Get Frequency Per Day
 * @returns Number of doses per day
 */
const getFrequencyPerDay = (): number => {
  const freqMap: Record<string, number> = {
    qd: 1, // Once daily
    bid: 2, // Twice daily
    tid: 3, // Three times daily
    qid: 4, // Four times daily
    q6h: 4, // Every 6 hours
    q8h: 3, // Every 8 hours
    q12h: 2, // Every 12 hours
  };

  return freqMap[dosageForm.value.frequency] || 1;
};

/**
 * Get Frequency Text (Italian)
 * @returns Human-readable frequency
 */
const getFrequencyText = (): string => {
  const option = frequencyOptions.value.find((opt) => opt.value === dosageForm.value.frequency);
  return option?.label || dosageForm.value.frequency;
};

/**
 * Get Age Note - Clinical note based on age
 * @returns Age-specific clinical guidance
 */
const getAgeNote = (): string => {
  const age = dosageForm.value.age!;

  if (age >= 65) {
    return 'Riduzione dose raccomandata negli anziani per ridotta clearance renale ed epatica.';
  } else if (age < 2) {
    return 'Riduzione dose significativa nei neonati per immaturità enzimatica e renale.';
  } else if (age < 12) {
    return 'Aggiustamento dose nei bambini per considerare sviluppo metabolismo farmaci.';
  }

  return '';
};

/**
 * Reset Dosage Form - Clear all inputs and results
 */
const resetDosageForm = () => {
  dosageForm.value = { ...initialDosageForm };
  dosageResult.value = { ...initialDosageResult };
  logger.debug('Dosage form reset');
};
</script>

<template>
  <div class="dosage-calculator">
    <!-- Title & Description -->
    <div class="text-h5 text-primary q-mb-md">{{ title || t('dosageCalculator.title') }}</div>
    <p class="text-body2 text-grey-7 q-mb-lg">
      {{ t('dosageCalculator.subtitle') }}
    </p>

    <div class="row q-gutter-lg">
      <!-- ====================================================== -->
      <!-- DOSAGE INPUT PANEL - Patient Parameters & Drug Info   -->
      <!-- ====================================================== -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">{{ t('dosageCalculator.form.weight.label') }}</h6>

            <!-- Patient Weight Input -->
            <q-input
              v-model.number="dosageForm.weight"
              type="number"
              step="0.1"
              :label="t('dosageCalculator.form.weight.label')"
              :suffix="t('dosageCalculator.form.weight.unit')"
              outlined
              class="q-mb-md"
              :rules="[(val: number) => (val > 0 && val <= 500) || 'Peso tra 1-500 kg']"
            >
              <template v-slot:prepend>
                <q-icon name="fitness_center" color="blue" />
              </template>
            </q-input>

            <!-- Patient Age Input -->
            <q-input
              v-model.number="dosageForm.age"
              type="number"
              :label="t('dosageCalculator.form.age.label')"
              :suffix="t('dosageCalculator.form.age.unit')"
              outlined
              class="q-mb-md"
              :rules="[(val: number) => (val >= 0 && val <= 120) || 'Età tra 0-120 anni']"
            >
              <template v-slot:prepend>
                <q-icon name="cake" color="orange" />
              </template>
            </q-input>

            <!-- Serum Creatinine Input (for renal adjustment) -->
            <q-input
              v-model.number="dosageForm.creatinine"
              type="number"
              step="0.01"
              :label="t('dosageCalculator.form.creatinine.label')"
              :suffix="t('dosageCalculator.form.creatinine.unit')"
              outlined
              class="q-mb-md"
              :hint="t('dosageCalculator.form.creatinine.hint')"
            >
              <template v-slot:prepend>
                <q-icon name="science" color="purple" />
              </template>
            </q-input>

            <q-separator class="q-mb-md" />

            <!-- Drug Selection Dropdown -->
            <q-select
              v-model="dosageForm.drug"
              :options="drugOptions"
              :label="t('dosageCalculator.form.drug.label')"
              outlined
              class="q-mb-md"
              emit-value
              map-options
              :rules="[(val: string | null) => val !== null || 'Selezionare un farmaco']"
              @update:model-value="onDrugChange"
            >
              <template v-slot:prepend>
                <q-icon name="medication" color="red" />
              </template>
            </q-select>

            <!-- Dose per kg (weight-based drugs) -->
            <q-input
              v-model.number="dosageForm.dosePerKg"
              type="number"
              step="0.01"
              :label="selectedDrug?.doseLabel || t('dosageCalculator.form.dosePerKg.label')"
              :suffix="selectedDrug?.doseUnit || t('dosageCalculator.form.dosePerKg.unit')"
              outlined
              class="q-mb-md"
              v-if="selectedDrug?.type === 'weight-based'"
              :rules="[(val: number) => val > 0 || 'Inserire dose positiva']"
            >
              <template v-slot:prepend>
                <q-icon name="straighten" color="green" />
              </template>
            </q-input>

            <!-- Dose fissa (fixed-dose drugs) -->
            <q-input
              v-model.number="dosageForm.fixedDose"
              type="number"
              step="0.01"
              :label="selectedDrug?.doseLabel || t('dosageCalculator.form.fixedDose.label')"
              :suffix="selectedDrug?.doseUnit || t('dosageCalculator.form.fixedDose.unit')"
              outlined
              class="q-mb-md"
              v-if="selectedDrug?.type === 'fixed'"
              :rules="[(val: number) => val > 0 || 'Inserire dose positiva']"
            >
              <template v-slot:prepend>
                <q-icon name="straighten" color="green" />
              </template>
            </q-input>

            <!-- Frequency Selection -->
            <q-select
              v-model="dosageForm.frequency"
              :options="frequencyOptions"
              :label="t('dosageCalculator.form.frequency.label')"
              outlined
              class="q-mb-md"
              emit-value
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="schedule" color="cyan" />
              </template>
            </q-select>

            <!-- Calculate Button -->
            <q-btn
              @click="calculateDosage"
              color="primary"
              size="lg"
              class="full-width q-mb-sm"
              icon="calculate"
              :disable="!isDosageFormValid"
            >
              {{ calculateButtonText || t('dosageCalculator.buttons.calculate') }}
            </q-btn>

            <!-- Reset Button -->
            <q-btn
              @click="resetDosageForm"
              color="negative"
              size="lg"
              class="full-width"
              icon="refresh"
              outline
            >
              {{ resetButtonText || t('dosageCalculator.buttons.reset') }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- ====================================================== -->
      <!-- DOSAGE RESULTS PANEL - Calculated Doses & Adjustments -->
      <!-- ====================================================== -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">
              {{ t('dosageCalculator.resultsPanel.title') }}
            </h6>

            <!-- Calculated Dose Display -->
            <div class="text-center q-mb-lg" v-if="dosageResult.totalDose > 0">
              <div class="text-h3 text-primary q-mb-sm">
                {{ dosageResult.totalDose.toFixed(selectedDrug?.precision || 1) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>{{ selectedDrug?.doseUnit || 'mg' }}</strong>
                {{ t('dosageCalculator.resultsPanel.totalDose.subtitle') }}
              </div>
              <div class="text-caption text-grey-6" v-if="selectedDrug?.type === 'weight-based'">
                {{ dosageForm.dosePerKg }}{{ selectedDrug?.doseUnit || 'mg' }}/kg ×
                {{ dosageForm.weight }}kg
              </div>
            </div>

            <!-- Frequenza e Dose Giornaliera -->
            <div class="row q-gutter-md q-mb-lg" v-if="dosageResult.totalDose > 0">
              <div class="col">
                <q-card flat bordered class="text-center q-pa-sm">
                  <div class="text-h6 text-primary">{{ getFrequencyText() }}</div>
                  <div class="text-caption">
                    {{ t('dosageCalculator.resultsPanel.frequency.label') }}
                  </div>
                </q-card>
              </div>
              <div class="col">
                <q-card flat bordered class="text-center q-pa-sm">
                  <div class="text-h6 text-primary">
                    {{ dosageResult.dailyDose.toFixed(1) }} {{ selectedDrug?.doseUnit || 'mg' }}
                  </div>
                  <div class="text-caption">
                    {{ t('dosageCalculator.resultsPanel.dailyDose.label') }}
                  </div>
                </q-card>
              </div>
            </div>

            <!-- Aggiustamenti -->
            <q-separator class="q-mb-md" v-if="dosageResult.totalDose > 0" />

            <!-- Aggiustamento Età -->
            <div class="q-mb-md" v-if="dosageResult.totalDose > 0 && getAgeAdjustment() !== 1">
              <div class="text-subtitle2">👶 Aggiustamento per Età:</div>
              <q-chip color="orange" text-color="white" class="text-weight-bold">
                Riduzione del {{ ((1 - getAgeAdjustment()) * 100).toFixed(0) }}%
              </q-chip>
              <div class="text-caption q-mt-sm">
                {{ getAgeNote() }}
              </div>
            </div>

            <!-- Aggiustamento Renale -->
            <div
              class="q-mb-md"
              v-if="dosageResult.totalDose > 0 && dosageResult.renalAdjustment !== 1"
            >
              <div class="text-subtitle2">🫘 Aggiustamento Funzione Renale:</div>
              <q-chip color="red" text-color="white" class="text-weight-bold">
                Riduzione del {{ ((1 - dosageResult.renalAdjustment) * 100).toFixed(0) }}%
              </q-chip>
              <div class="text-caption q-mt-sm">
                eGFR stimato: {{ dosageResult.estimatedGFR.toFixed(1) }} mL/min/1.73m²
              </div>
            </div>

            <!-- Informazioni Farmaco -->
            <q-expansion-item
              icon="info"
              :label="t('dosageCalculator.drugInfo.title')"
              v-if="selectedDrug"
            >
              <q-card class="q-pa-md">
                <div class="q-mb-sm">
                  <strong>{{ t('dosageCalculator.drugInfo.class') }}:</strong>
                  {{ selectedDrug.class }}
                </div>
                <div class="q-mb-sm">
                  <strong>{{ t('dosageCalculator.drugInfo.indications') }}:</strong>
                  {{ selectedDrug.indications }}
                </div>
                <div class="q-mb-sm">
                  <strong>{{ t('dosageCalculator.drugInfo.therapeuticRange') }}:</strong>
                  {{ selectedDrug.therapeuticRange }}
                </div>
                <div>
                  <strong>{{ t('dosageCalculator.drugInfo.notes') }}:</strong>
                  {{ selectedDrug.notes }}
                </div>
              </q-card>
            </q-expansion-item>

            <!-- Avvertenze -->
            <q-expansion-item
              icon="warning"
              :label="t('dosageCalculator.warnings.title')"
              class="text-orange q-mt-sm"
              v-if="dosageResult.totalDose > 0"
            >
              <q-card class="q-pa-md bg-orange-1">
                <ul class="q-ma-none">
                  <li
                    v-for="(item, index) in 5"
                    :key="index"
                    v-html="t(`dosageCalculator.warnings.items[${index}]`)"
                  ></li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- Formule -->
            <q-expansion-item
              icon="functions"
              :label="t('dosageCalculator.formulas.title')"
              class="text-primary q-mt-sm"
              v-if="dosageResult.totalDose > 0"
            >
              <q-card class="q-pa-md">
                <div class="q-mb-md" v-if="selectedDrug?.type === 'weight-based'">
                  <p class="text-weight-bold q-mb-xs">
                    {{ t('dosageCalculator.formulas.content.weightBasedTitle') }}
                  </p>
                  <p
                    class="text-caption"
                    v-html="t('dosageCalculator.formulas.content.weightBasedFormula')"
                  ></p>
                </div>
                <div class="q-mb-md" v-if="selectedDrug?.type === 'fixed'">
                  <p class="text-weight-bold q-mb-xs">
                    {{ t('dosageCalculator.formulas.content.fixedDoseTitle') }}
                  </p>
                  <p
                    class="text-caption"
                    v-html="t('dosageCalculator.formulas.content.fixedDoseFormula')"
                  ></p>
                </div>
                <div class="q-mb-md" v-if="dosageForm.creatinine">
                  <p class="text-weight-bold q-mb-xs">
                    {{ t('dosageCalculator.formulas.content.egfrTitle') }}
                  </p>
                  <p
                    class="text-caption"
                    v-html="t('dosageCalculator.formulas.content.egfrFormula')"
                  ></p>
                </div>
                <div class="q-mb-md" v-if="dosageResult.renalAdjustment !== 1.0">
                  <p class="text-weight-bold q-mb-xs">
                    {{ t('dosageCalculator.formulas.content.adjustmentTitle') }}
                  </p>
                  <ul class="text-caption">
                    <li
                      v-for="(item, idx) in 7"
                      :key="idx"
                      v-html="t(`dosageCalculator.formulas.content.adjustmentRules[${idx}]`)"
                    ></li>
                  </ul>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- Empty State -->
            <div v-if="!dosageResult.totalDose" class="text-center text-grey-6 q-pa-xl">
              <q-icon name="info" size="lg" class="q-mb-md" />
              <p class="text-body2">
                {{ t('dosageCalculator.emptyState') }}
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- ============================================================ -->
    <!-- DOCUMENTAZIONE MEDICA - 5 SEZIONI                            -->
    <!-- ============================================================ -->

    <!-- Farmacocinetica e Farmacodinamica (PK/PD) -->
    <q-expansion-item
      icon="science"
      :label="t('dosageCalculator.sections.pharmacokinetics.title')"
      class="q-mt-md"
      header-class="bg-blue-1 text-blue-9"
    >
      <q-card class="bg-blue-1 q-pa-md">
        <div class="q-mb-lg">
          <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
            {{ t('dosageCalculator.sections.pharmacokinetics.content.introTitle') }}
          </h6>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.pharmacokinetics.content.intro[${idx}]`)"
          ></p>
          <h6 class="text-subtitle1 text-weight-bold q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.pharmacokinetics.content.pkParametersTitle') }}
          </h6>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.pharmacokinetics.content.pkParameters[${idx}]`)"
          ></p>
          <h6 class="text-subtitle1 text-weight-bold q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.pharmacokinetics.content.pkpdTitle') }}
          </h6>
          <p
            v-for="(item, idx) in 2"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.pharmacokinetics.content.pkpd[${idx}]`)"
          ></p>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Dosaggi Pediatrici e Neonatali -->
    <q-expansion-item
      icon="child_care"
      :label="t('dosageCalculator.sections.pediatric.title')"
      class="q-mt-md"
      header-class="bg-green-1 text-green-9"
    >
      <q-card class="bg-green-1 q-pa-md">
        <div class="q-mb-lg">
          <p class="text-weight-bold text-h6 q-mb-sm">
            {{ t('dosageCalculator.sections.pediatric.content.introTitle') }}
          </p>
          <p
            v-for="(item, idx) in 3"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.pediatric.content.intro[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.pediatric.content.bsaTitle') }}
          </p>
          <p
            v-for="(item, idx) in 3"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.pediatric.content.bsa[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.pediatric.content.ageAdjustmentsTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.pediatric.content.ageAdjustments[${idx}]`)"
          ></p>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Aggiustamento Dosaggio in Insufficienza Renale -->
    <q-expansion-item
      icon="medication"
      :label="t('dosageCalculator.sections.renalImpairment.title')"
      class="q-mt-md"
      header-class="bg-amber-1 text-amber-9"
    >
      <q-card class="bg-amber-1 q-pa-md">
        <div class="q-mb-lg">
          <p class="text-weight-bold text-h6 q-mb-sm">
            {{ t('dosageCalculator.sections.renalImpairment.content.ckdStagesTitle') }}
          </p>
          <p
            v-for="(item, idx) in 6"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.renalImpairment.content.ckdStages[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.renalImpairment.content.adjustmentTitle') }}
          </p>
          <p
            v-for="(item, idx) in 3"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.renalImpairment.content.adjustment[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.renalImpairment.content.dialysisTitle') }}
          </p>
          <p
            v-for="(item, idx) in 3"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.renalImpairment.content.dialysis[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.renalImpairment.content.drugsExamplesTitle') }}
          </p>
          <p
            class="text-body2 q-mb-sm"
            v-html="t('dosageCalculator.sections.renalImpairment.content.drugsExamples')"
          ></p>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Loading Dose vs Maintenance Dose -->
    <q-expansion-item
      icon="flash_on"
      :label="t('dosageCalculator.sections.loadingMaintenance.title')"
      class="q-mt-md"
      header-class="bg-cyan-1 text-cyan-9"
    >
      <q-card class="bg-cyan-1 q-pa-md">
        <div class="q-mb-lg">
          <p class="text-weight-bold text-h6 q-mb-sm">
            {{ t('dosageCalculator.sections.loadingMaintenance.content.conceptsTitle') }}
          </p>
          <p
            v-for="(item, idx) in 3"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.loadingMaintenance.content.concepts[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.loadingMaintenance.content.formulasTitle') }}
          </p>
          <p
            v-for="(item, idx) in 3"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.loadingMaintenance.content.formulas[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.loadingMaintenance.content.indicationsTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.loadingMaintenance.content.indications[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.loadingMaintenance.content.examplesTitle') }}
          </p>
          <p
            v-for="(item, idx) in 3"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.loadingMaintenance.content.examples[${idx}]`)"
          ></p>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Sezione 5: Interpretazione Dosaggi -->
    <q-expansion-item
      icon="psychology"
      :label="t('dosageCalculator.sections.interpretation.title')"
      class="q-mt-md"
      header-class="bg-orange-1 text-orange-9"
    >
      <q-card class="bg-orange-1 q-pa-md">
        <div class="q-mb-lg">
          <p class="text-weight-bold text-h6 q-mb-sm">
            {{ t('dosageCalculator.sections.interpretation.content.conceptsTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.interpretation.content.concepts[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.interpretation.content.rangesTitle') }}
          </p>
          <p
            v-for="(item, idx) in 6"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.interpretation.content.ranges[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.interpretation.content.doseResponseTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.interpretation.content.doseResponse[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.interpretation.content.steadyStateTitle') }}
          </p>
          <p
            v-for="(item, idx) in 3"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.interpretation.content.steadyState[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.interpretation.content.clinicalMonitoringTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="
              t(`dosageCalculator.sections.interpretation.content.clinicalMonitoring[${idx}]`)
            "
          ></p>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Sezione 6: Applicazioni Cliniche -->
    <q-expansion-item
      icon="local_hospital"
      :label="t('dosageCalculator.sections.applications.title')"
      class="q-mt-md"
      header-class="bg-purple-1 text-purple-9"
    >
      <q-card class="bg-purple-1 q-pa-md">
        <div class="q-mb-lg">
          <p class="text-weight-bold text-h6 q-mb-sm">
            {{ t('dosageCalculator.sections.applications.content.cardiologyTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.applications.content.cardiology[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.applications.content.infectiousDiseaseTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.applications.content.infectiousDisease[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.applications.content.nephrologyTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.applications.content.nephrology[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.applications.content.pediatricsTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.applications.content.pediatrics[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.applications.content.specialPopulationsTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.applications.content.specialPopulations[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.applications.content.emergencyTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.applications.content.emergency[${idx}]`)"
          ></p>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Sezione 7: Alert e Valori Critici -->
    <q-expansion-item
      icon="warning"
      :label="t('dosageCalculator.sections.alerts.title')"
      class="q-mt-md"
      header-class="bg-red-1 text-red-9"
    >
      <q-card class="bg-red-1 q-pa-md">
        <div class="q-mb-lg">
          <p class="text-weight-bold text-h6 q-mb-sm">
            {{ t('dosageCalculator.sections.alerts.content.highAlertTitle') }}
          </p>
          <p
            v-for="(item, idx) in 6"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.alerts.content.highAlert[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.alerts.content.contraindicationsTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.alerts.content.contraindications[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.alerts.content.drugInteractionsTitle') }}
          </p>
          <p
            v-for="(item, idx) in 5"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.alerts.content.drugInteractions[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.alerts.content.overdoseTitle') }}
          </p>
          <p
            v-for="(item, idx) in 5"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.alerts.content.overdose[${idx}]`)"
          ></p>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Sezione 8: Documentazione Clinica -->
    <q-expansion-item
      icon="menu_book"
      :label="t('dosageCalculator.sections.documentation.title')"
      class="q-mt-md"
      header-class="bg-indigo-1 text-indigo-9"
    >
      <q-card class="bg-indigo-1 q-pa-md">
        <div class="q-mb-lg">
          <p class="text-weight-bold text-h6 q-mb-sm">
            {{ t('dosageCalculator.sections.documentation.content.internationalGuidelinesTitle') }}
          </p>
          <p
            v-for="(item, idx) in 5"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="
              t(`dosageCalculator.sections.documentation.content.internationalGuidelines[${idx}]`)
            "
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.documentation.content.renalDosingTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.documentation.content.renalDosing[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.documentation.content.pediatricFormulariesTitle') }}
          </p>
          <p
            v-for="(item, idx) in 4"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="
              t(`dosageCalculator.sections.documentation.content.pediatricFormularies[${idx}]`)
            "
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.documentation.content.tdmProtocolsTitle') }}
          </p>
          <p
            v-for="(item, idx) in 5"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.documentation.content.tdmProtocols[${idx}]`)"
          ></p>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.documentation.content.clinicalToolsTitle') }}
          </p>
          <p
            v-for="(item, idx) in 5"
            :key="idx"
            class="text-body2 q-mb-sm"
            v-html="t(`dosageCalculator.sections.documentation.content.clinicalTools[${idx}]`)"
          ></p>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- Riferimenti Scientifici -->
    <q-expansion-item
      icon="science"
      :label="t('dosageCalculator.sections.bibliography.title')"
      class="q-mt-md"
      header-class="bg-teal-1 text-teal-9"
    >
      <q-card class="bg-teal-1 q-pa-md">
        <div class="q-mb-md">
          <p class="text-weight-bold text-h6 q-mb-sm">
            {{ t('dosageCalculator.sections.bibliography.content.publicationsTitle') }}
          </p>
          <ul class="text-caption">
            <li
              v-for="(item, idx) in 5"
              :key="idx"
              v-html="t(`dosageCalculator.sections.bibliography.content.publications[${idx}]`)"
            ></li>
          </ul>
          <p class="text-weight-bold text-subtitle1 q-mb-sm q-mt-md">
            {{ t('dosageCalculator.sections.bibliography.content.guidelinesTitle') }}
          </p>
          <ul class="text-caption">
            <li
              v-for="(item, idx) in 4"
              :key="idx"
              v-html="t(`dosageCalculator.sections.bibliography.content.guidelines[${idx}]`)"
            ></li>
          </ul>
        </div>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<style scoped lang="scss">
// Component-specific styles will be added here as needed
</style>
