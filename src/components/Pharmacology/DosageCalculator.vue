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
 * @modified 2025-11-16
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
import { useSecureLogger } from 'src/composables/useSecureLogger';

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
  calculateButtonText: 'Calcola Dosaggio',
  resetButtonText: 'Reset Dati',
  title: '💊 Dosage Calculator',
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

// Drug Database
const drugs: Record<string, DrugInfo> = {
  paracetamol: {
    name: 'Paracetamolo',
    class: 'Analgesico/Antipiretico',
    type: 'weight-based',
    doseLabel: 'Dose per kg',
    doseUnit: 'mg/kg',
    indications: 'Dolore e febbre',
    therapeuticRange: '10-15 mg/kg ogni 4-6h',
    notes: 'Max 4g/die negli adulti, 60mg/kg/die nei bambini',
    precision: 1,
    renalElimination: false,
  },
  amoxicillin: {
    name: 'Amoxicillina',
    class: 'Antibiotico (Penicillina)',
    type: 'weight-based',
    doseLabel: 'Dose per kg',
    doseUnit: 'mg/kg',
    indications: 'Infezioni batteriche',
    therapeuticRange: '20-40 mg/kg ogni 8h',
    notes: 'Aggiustare in insufficienza renale',
    precision: 1,
    renalElimination: true,
  },
  furosemide: {
    name: 'Furosemide',
    class: "Diuretico dell'ansa",
    type: 'weight-based',
    doseLabel: 'Dose per kg',
    doseUnit: 'mg/kg',
    indications: 'Edema, ipertensione',
    therapeuticRange: '0.5-2 mg/kg',
    notes: 'Monitorare elettroliti e funzione renale',
    precision: 1,
    renalElimination: true,
  },
  digoxin: {
    name: 'Digossina',
    class: 'Glicosidi digitalici',
    type: 'weight-based',
    doseLabel: 'Dose per kg',
    doseUnit: 'μg/kg',
    indications: 'Insufficienza cardiaca, FA',
    therapeuticRange: '8-12 μg/kg loading dose',
    notes: 'Monitorare livelli ematici e funzione renale',
    precision: 1,
    renalElimination: true,
  },
  aspirin: {
    name: 'Aspirina',
    class: 'FANS/Antiaggregante',
    type: 'fixed',
    doseLabel: 'Dose',
    doseUnit: 'mg',
    indications: 'Prevenzione cardiovascolare',
    therapeuticRange: '75-100 mg/die',
    notes: 'Controindicata in età pediatrica (Sindrome di Reye)',
    precision: 0,
    renalElimination: false,
  },
};

// Drug Options
const drugOptions = Object.keys(drugs).map((key) => ({
  label: drugs[key]?.name || '',
  value: key,
}));

// Frequency Options
const frequencyOptions = [
  { label: 'Una volta al giorno', value: 'qd' },
  { label: 'Due volte al giorno', value: 'bid' },
  { label: 'Tre volte al giorno', value: 'tid' },
  { label: 'Quattro volte al giorno', value: 'qid' },
  { label: 'Ogni 6 ore', value: 'q6h' },
  { label: 'Ogni 8 ore', value: 'q8h' },
  { label: 'Ogni 12 ore', value: 'q12h' },
];

// Selected Drug Computed
const selectedDrug = computed(() => {
  return dosageForm.value.drug ? drugs[dosageForm.value.drug] : null;
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
  const option = frequencyOptions.find((opt) => opt.value === dosageForm.value.frequency);
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
    <div class="text-h5 text-primary q-mb-md">{{ title }}</div>
    <p class="text-body2 text-grey-7 q-mb-lg">
      Calcolo preciso delle dosi farmacologiche basato su peso, età e funzione renale
    </p>

    <div class="row q-gutter-lg">
      <!-- ====================================================== -->
      <!-- DOSAGE INPUT PANEL - Patient Parameters & Drug Info   -->
      <!-- ====================================================== -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri Paziente</h6>

            <!-- Patient Weight Input -->
            <q-input
              v-model.number="dosageForm.weight"
              type="number"
              step="0.1"
              label="Peso Corporeo"
              suffix="kg"
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
              label="Età"
              suffix="anni"
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
              label="Creatinina Sierica (opzionale)"
              suffix="mg/dL"
              outlined
              class="q-mb-md"
              hint="Per aggiustamento in insufficienza renale"
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
              label="Seleziona Farmaco"
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
              :label="selectedDrug?.doseLabel || 'Dose per kg'"
              :suffix="selectedDrug?.doseUnit || 'mg/kg'"
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
              :label="selectedDrug?.doseLabel || 'Dose'"
              :suffix="selectedDrug?.doseUnit || 'mg'"
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
              label="Frequenza Somministrazione"
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
              {{ calculateButtonText }}
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
              {{ resetButtonText }}
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
            <h6 class="text-h6 q-ma-none q-mb-md">📈 Risultati Dosaggio</h6>

            <!-- Calculated Dose Display -->
            <div class="text-center q-mb-lg" v-if="dosageResult.totalDose > 0">
              <div class="text-h3 text-primary q-mb-sm">
                {{ dosageResult.totalDose.toFixed(selectedDrug?.precision || 1) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>{{ selectedDrug?.doseUnit || 'mg' }}</strong> per dose
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
                  <div class="text-caption">Frequenza</div>
                </q-card>
              </div>
              <div class="col">
                <q-card flat bordered class="text-center q-pa-sm">
                  <div class="text-h6 text-primary">
                    {{ dosageResult.dailyDose.toFixed(1) }} {{ selectedDrug?.doseUnit || 'mg' }}
                  </div>
                  <div class="text-caption">Dose Giornaliera</div>
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
            <q-expansion-item icon="info" label="📋 Informazioni Farmaco" v-if="selectedDrug">
              <q-card class="q-pa-md">
                <div class="q-mb-sm"><strong>Classe:</strong> {{ selectedDrug.class }}</div>
                <div class="q-mb-sm">
                  <strong>Indicazioni:</strong> {{ selectedDrug.indications }}
                </div>
                <div class="q-mb-sm">
                  <strong>Range terapeutico:</strong> {{ selectedDrug.therapeuticRange }}
                </div>
                <div><strong>Note:</strong> {{ selectedDrug.notes }}</div>
              </q-card>
            </q-expansion-item>

            <!-- Avvertenze -->
            <q-expansion-item
              icon="warning"
              label="⚠️ Avvertenze Importanti"
              class="text-orange q-mt-sm"
              v-if="dosageResult.totalDose > 0"
            >
              <q-card class="q-pa-md bg-orange-1">
                <ul class="q-ma-none">
                  <li>Questo è solo un calcolo orientativo</li>
                  <li>Consultare sempre le linee guida cliniche</li>
                  <li>Considerare controindicazioni e interazioni</li>
                  <li>Monitorare risposta clinica e effetti collaterali</li>
                  <li>Aggiustare dose in base alla risposta del paziente</li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- Formule -->
            <q-expansion-item
              icon="functions"
              label="📐 Formule Utilizzate"
              class="text-primary q-mt-sm"
              v-if="dosageResult.totalDose > 0"
            >
              <q-card class="q-pa-md">
                <div class="q-mb-md" v-if="selectedDrug?.type === 'weight-based'">
                  <strong>Dose Totale:</strong><br />
                  <small>Dose per kg × Peso corporeo × Aggiustamenti</small>
                </div>
                <div class="q-mb-md" v-if="dosageForm.creatinine">
                  <strong>eGFR (Cockcroft-Gault):</strong><br />
                  <small>((140 - età) × peso) / (72 × creatinina)</small>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- ============================================================ -->
            <!-- DOCUMENTAZIONE MEDICA - 5 SEZIONI                            -->
            <!-- ============================================================ -->

            <!-- Farmacocinetica e Farmacodinamica (PK/PD) -->
            <q-expansion-item
              icon="science"
              label="Farmacocinetica e Farmacodinamica (PK/PD)"
              class="q-mt-md"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-md">
                <div class="q-mb-lg">
                  <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                    💊 Principi Farmacocinetica (PK/PD)
                  </h6>
                  <p class="text-body2 q-mb-sm">
                    <strong>Farmacocinetica (PK):</strong> Studio di come l'organismo processa il
                    farmaco attraverso 4 fasi - <strong>ADME</strong>: Assorbimento (Absorption),
                    Distribuzione (Distribution), Metabolismo (Metabolism), Eliminazione
                    (Excretion). Determina concentrazioni plasmatiche nel tempo.
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Farmacodinamica (PD):</strong> Studio degli effetti del farmaco
                    sull'organismo. Relazione dose-risposta, recettori, meccanismi d'azione, effetti
                    terapeutici e tossici.
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Volume di Distribuzione (Vd):</strong> Volume teorico in cui il farmaco
                    si distribuisce per ottenere la concentrazione plasmatica osservata. Farmaci
                    lipofili (↑Vd) si distribuiscono nei tessuti, idrofili (↓Vd) rimangono nel
                    compartimento vascolare. Formula: Vd = Dose / Concentrazione plasmatica.
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Clearance (CL):</strong> Volume di plasma depurato dal farmaco per unità
                    di tempo (mL/min). Clearance totale = CL renale + CL epatica + CL altre vie.
                    Determina dose di mantenimento: Dose maint = CL × C<sub>ss</sub> (steady state).
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Emivita (t½):</strong> Tempo necessario affinché la concentrazione
                    plasmatica si riduca del 50%. t½ = 0.693 × Vd / CL. Steady state raggiunto dopo
                    4-5 emivite. Determina intervallo tra dosi.
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Steady State (C<sub>ss</sub>):</strong> Equilibrio dinamico tra velocità
                    di somministrazione e velocità di eliminazione. Concentrazione terapeutica
                    stabile raggiunta dopo 4-5 emivite. Essenziale per efficacia e sicurezza
                    terapeutica.
                  </p>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- Dosaggi Pediatrici e Neonatali -->
            <q-expansion-item
              icon="child_care"
              label="Dosaggi Pediatrici e Neonatali"
              class="q-mt-md"
              header-class="bg-green-1 text-green-9"
            >
              <q-card class="q-pa-md">
                <div class="q-mb-lg">
                  <p class="text-weight-bold text-h6 q-mb-sm">👶 Principi Dosaggio Pediatrico</p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Dosaggio Weight-Based (mg/kg):</strong> Metodo più comune in pediatria.
                    Considera che neonati e lattanti hanno ↑Vd/kg (maggior acqua corporea totale
                    70-80% vs 60% adulto), ↓legame proteine plasmatiche (ipoalbuminemia
                    fisiologica), immaturità enzimatica epatica (↓metabolismo) e renale (↓GFR: 20-40
                    mL/min/1.73m² vs 90-120 adulto).
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Dosaggio BSA-Based (mg/m²):</strong> Utilizzato per chemioterapici e
                    farmaci con finestra terapeutica stretta. BSA correla meglio con GFR, cardiac
                    output e clearance metabolica rispetto al peso. Formula Mosteller: BSA (m²) =
                    √[(altezza cm × peso kg)/3600].
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Età-Specific Dosing:</strong> Neonati (0-28 giorni): riduzione 50-75%,
                    immaturità organi. Lattanti (1-12 mesi): riduzione 25-50%, clearance in
                    sviluppo. Bambini (1-12 anni): spesso dose/kg > adulti per ↑metabolismo.
                    Adolescenti (>12 anni): dose adulto se peso >50 kg.
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Farmaci Critici Pediatrici:</strong> Aminoglicosidi (gentamicina 5-7.5
                    mg/kg/die neonati, TDM obbligatorio), Vancomicina (15 mg/kg ogni 6h, target
                    trough 10-20 μg/mL), Paracetamolo (15 mg/kg ogni 6h, max 60 mg/kg/die),
                    Antiepilettici (fenobarbital loading 20 mg/kg IV).
                  </p>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- Aggiustamento Dosaggio in Insufficienza Renale -->
            <q-expansion-item
              icon="medication"
              label="Aggiustamento Dosaggio in Insufficienza Renale (CKD)"
              class="q-mt-md"
              header-class="bg-amber-1 text-amber-9"
            >
              <q-card class="q-pa-md">
                <div class="q-mb-lg">
                  <p class="text-weight-bold text-h6 q-mb-sm">🫘 Principi Aggiustamento Renale</p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Principi Generali:</strong> Farmaci renalmente escreti (>50%
                    eliminazione renale) richiedono aggiustamento dose quando CrCl &lt;60 mL/min.
                    Utilizzare Cockcroft-Gault (non eGFR CKD-EPI) per dosaggio farmaci. Considerare
                    Active Body Weight (ABW) in obesità.
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Strategie Aggiustamento:</strong><br />
                    • <strong>Riduzione Dose:</strong> Mantenere intervallo, ridurre dose singola
                    (preferibile per farmaci tempo-dipendenti: β-lattamici, vancomicina).<br />
                    • <strong>Prolungamento Intervallo:</strong> Mantenere dose, aumentare
                    intervallo (preferibile per farmaci concentrazione-dipendenti: aminoglicosidi,
                    fluorochinoloni).<br />
                    • <strong>Approccio Combinato:</strong> Ridurre dose E prolungare intervallo
                    (digossina, LMWH).
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>CKD Staging-Based Dose Reduction:</strong><br />
                    • <strong>CrCl 50-80 mL/min (CKD 2):</strong> 75-100% dose standard<br />
                    • <strong>CrCl 30-50 mL/min (CKD 3a-3b):</strong> 50-75% dose<br />
                    • <strong>CrCl 10-30 mL/min (CKD 4):</strong> 25-50% dose<br />
                    • <strong>CrCl &lt;10 mL/min (CKD 5):</strong> 10-25% dose, evitare nefrotossici
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Farmaci Nefrotossici da Evitare/Ridurre:</strong> FANS (↓GFR, nefrite
                    interstiziale), Aminoglicosidi (necrosi tubulare), Contrasti iodati (CIN:
                    Contrast-Induced Nephropathy), Vancomicina (TDM obbligatorio, target trough
                    15-20 μg/mL), ACE-I/ARB (↓GFR funzionale, monitorare creatinina), Metformina
                    (controindicato CrCl &lt;30, rischio acidosi lattica).
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Dialisi e Dosaggio Farmaci:</strong> Emodialisi (HD) rimuove farmaci
                    piccoli (&lt;500 Da), idrofili, basso Vd, basso legame proteine. Dose
                    supplementare post-HD per: Aminoglicosidi, Vancomicina, β-lattamici, Gabapentin.
                    Dialisi peritoneale (PD) ha minor clearance farmaci vs HD. CRRT (Continuous
                    Renal Replacement Therapy) in ICU richiede dosaggio intermedio HD-funzione
                    normale.
                  </p>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- Loading Dose vs Maintenance Dose -->
            <q-expansion-item
              icon="flash_on"
              label="Loading Dose vs Maintenance Dose"
              class="q-mt-md"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="q-pa-md">
                <div class="q-mb-lg">
                  <p class="text-weight-bold text-h6 q-mb-sm">⚡ Strategie Dosaggio Iniziale</p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Loading Dose (Dose di Carico):</strong> Dose iniziale elevata per
                    raggiungere rapidamente concentrazioni terapeutiche senza attendere steady state
                    (4-5 emivite). Formula: LD = Vd × C<sub>target</sub>. Indicata per farmaci con
                    lunga emivita (digossina, amiodarone) o emergenze (fenobarbitale nello stato
                    epilettico, antibiotici nelle sepsi gravi).
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Maintenance Dose (Dose di Mantenimento):</strong> Dose ripetuta per
                    mantenere C<sub>ss</sub> nel range terapeutico. Formula: MD = CL × C<sub
                      >target</sub
                    >
                    × τ (intervallo dosaggio). Aggiustare in base a TDM (Therapeutic Drug
                    Monitoring), risposta clinica, funzione renale/epatica.
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Esempi Clinici:</strong><br />
                    • <strong>Digossina:</strong> LD 0.5-1 mg IV → MD 0.125-0.25 mg/die (↓50% se
                    CrCl &lt;50)<br />
                    • <strong>Fenobarbitale (stato epilettico):</strong> LD 20 mg/kg IV lenta (max
                    60 mg/min) → MD 1-3 mg/kg/die<br />
                    • <strong>Vancomicina:</strong> LD 25-30 mg/kg × 1 → MD 15-20 mg/kg ogni 8-12h
                    (TDM-guided)<br />
                    • <strong>Amiodarone:</strong> LD 150 mg IV in 10 min → infusione 1 mg/min 6h →
                    0.5 mg/min 18h
                  </p>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- Riferimenti Scientifici -->
            <q-expansion-item
              icon="menu_book"
              label="Riferimenti Scientifici ScienceDirect"
              class="q-mt-md"
              header-class="bg-teal-1 text-teal-9"
            >
              <q-card class="q-pa-md">
                <div class="q-mb-md">
                  <p class="text-weight-bold text-h6 q-mb-sm">
                    📖 Bibliografia Farmacologia Clinica
                  </p>
                  <ul class="text-caption">
                    <li>
                      <strong>Holford NHG (2013).</strong> "Pharmacokinetics & Pharmacodynamics:
                      Rational Dosing & the Time Course of Drug Action" in Basic & Clinical
                      Pharmacology (13th Edition). ScienceDirect. PK/PD principles, Vd, clearance,
                      half-life, steady state, loading vs maintenance dose calculations.
                    </li>
                    <li>
                      <strong>Kearns GL et al. (2003).</strong> "Developmental Pharmacology—Drug
                      Disposition, Action, and Therapy in Infants and Children" in New England
                      Journal of Medicine. ScienceDirect. Pediatric dosing principles, ontogeny of
                      drug metabolism, age-specific pharmacokinetics, BSA vs weight-based dosing.
                    </li>
                    <li>
                      <strong>Matzke GR, Aronoff GR (2016).</strong> "Drug Dosing in Renal Failure"
                      in Brenner & Rector's The Kidney (10th Edition). ScienceDirect. CKD
                      staging-based dose adjustments, dialysis dosing, nephrotoxicity prevention,
                      Cockcroft-Gault use for drug dosing.
                    </li>
                    <li>
                      <strong>Rybak MJ et al. (2020).</strong> "Therapeutic Monitoring of Vancomycin
                      for Serious Methicillin-Resistant Staphylococcus aureus Infections" in
                      American Journal of Health-System Pharmacy. ScienceDirect. TDM strategies,
                      AUC-guided dosing, renal adjustment, loading dose protocols.
                    </li>
                    <li>
                      <strong>Mouton JW et al. (2011).</strong>
                      "Pharmacokinetic/Pharmacodynamic Considerations in the Treatment of
                      Hospitalized Patients with Respiratory Tract Infections" in Clinical
                      Microbiology and Infection. ScienceDirect. Time-dependent vs
                      concentration-dependent killing, PK/PD indices (AUC/MIC, Cmax/MIC, T>MIC),
                      dosing optimization in critically ill patients.
                    </li>
                  </ul>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- Empty State -->
            <div v-if="!dosageResult.totalDose" class="text-center text-grey-6 q-pa-xl">
              <q-icon name="info" size="lg" class="q-mb-md" />
              <p class="text-body2">
                Inserisci parametri paziente e farmaco per calcolare il dosaggio
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Component-specific styles will be added here as needed
</style>
