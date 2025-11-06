<!-- DosageCalculatorPage.vue -->
<script setup lang="ts">
/**
 * @file DosageCalculatorPage.vue
 * @description Comprehensive dosage calculator for weight-based and fixed-dose medications
 *              with automatic age and renal function adjustments. Supports multiple drug
 *              classes with therapeutic ranges and safety guidelines.
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-01-20
 *
 * @notes
 * - Total 781 lines of production-ready medical calculation code
 * - Supports 5 common drugs: Paracetamol, Amoxicillin, Furosemide, Digoxin, Aspirin
 * - Automatic age adjustments: Neonates (<2y): -50%, Children (<12y): -20%, Elderly (≥65y): -25%
 * - Renal adjustment based on Cockcroft-Gault eGFR estimation
 * - Weight-based and fixed-dose calculation modes
 * - Multiple dosing frequencies (QD, BID, TID, QID, Q6H, Q8H, Q12H)
 * - Real-time input validation and error handling
 * - Comprehensive drug information with therapeutic ranges
 * - TypeScript type safety with complete interface definitions
 * - Responsive Quasar components with accessible design
 *
 * @dependencies
 * - Vue 3 Composition API (ref, computed) for reactive state
 * - useResetForm composable for form state management
 * - Quasar Framework for UI components
 *
 * @medical-references
 * - Cockcroft DW, Gault MH (1976) - Creatinine Clearance Estimation
 * - BNF (British National Formulary) - Drug dosing guidelines
 * - Pediatric Dosage Handbook - Age-specific adjustments
 * - Renal Drug Handbook - Dose adjustment in renal impairment
 *
 * @clinical-notes
 * - Paracetamol: Max 4g/day adults, 60mg/kg/day children
 * - Amoxicillin: Adjust in renal impairment (CrCl <30 mL/min)
 * - Furosemide: Monitor electrolytes and renal function
 * - Digoxin: Therapeutic monitoring required (narrow therapeutic index)
 * - Aspirin: Contraindicated in children (Reye's syndrome risk)
 */

import { ref, computed } from 'vue';
import { useResetForm } from 'src/composables/useResetForm';

// ============================================================
// TYPES & INTERFACES
// ============================================================

/**
 * @interface DosageFormData
 * @description Patient parameters for dosage calculation including demographics and drug selection
 */
interface DosageFormData {
  /** Patient body weight in kilograms (1-500 kg) */
  weight: number | null;
  /** Patient age in years (0-120 years) */
  age: number | null;
  /** Serum creatinine in mg/dL (optional, for renal adjustment) */
  creatinine: number | null;
  /** Selected drug identifier from drugs database */
  drug: string | null;
  /** Dose per kilogram of body weight (for weight-based drugs) */
  dosePerKg: number | null;
  /** Fixed dose amount (for fixed-dose drugs) */
  fixedDose: number | null;
  /** Dosing frequency code (qd, bid, tid, qid, q6h, q8h, q12h) */
  frequency: string;
}

/**
 * @interface DrugInfo
 * @description Comprehensive drug information including pharmacological and clinical properties
 */
interface DrugInfo {
  /** Drug generic name */
  name: string;
  /** Pharmacological classification */
  class: string;
  /** Dosing calculation method: weight-based or fixed */
  type: 'weight-based' | 'fixed';
  /** Label for dose input field */
  doseLabel: string;
  /** Unit of measurement for dose (mg/kg, mg, μg/kg, etc.) */
  doseUnit: string;
  /** Primary clinical indications for use */
  indications: string;
  /** Recommended therapeutic dose range */
  therapeuticRange: string;
  /** Important clinical notes and warnings */
  notes: string;
  /** Decimal precision for dose calculations */
  precision: number;
  /** Whether drug requires renal function adjustment */
  renalElimination: boolean;
}

/**
 * @interface DosageResult
 * @description Calculated dosage results with renal and age adjustments
 */
interface DosageResult {
  /** Single dose amount after all adjustments */
  totalDose: number;
  /** Total daily dose (single dose × frequency) */
  dailyDose: number;
  /** Renal function adjustment percentage (0-100%) */
  renalAdjustment: number;
  /** Estimated glomerular filtration rate in mL/min/1.73m² */
  estimatedGFR: number;
}

// Dati iniziali
const initialFormData: DosageFormData = {
  weight: null,
  age: null,
  creatinine: null,
  drug: null,
  dosePerKg: null,
  fixedDose: null,
  frequency: 'bid',
};

const initialResult: DosageResult = {
  totalDose: 0,
  dailyDose: 0,
  renalAdjustment: 100,
  estimatedGFR: 0,
};

// Dati reattivi
const formData = ref<DosageFormData>({ ...initialFormData });
const result = ref<DosageResult>({ ...initialResult });

// Reset form composable
const { resetForm: resetFormData } = useResetForm(formData, result, initialFormData);

const resetForm = () => {
  resetFormData();
  result.value = { ...initialResult };
};

// Database farmaci comune
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

// Opzioni select
const drugOptions = Object.keys(drugs).map((key) => ({
  label: drugs[key]?.name || '',
  value: key,
}));

const frequencyOptions = [
  { label: 'Una volta al giorno', value: 'qd' },
  { label: 'Due volte al giorno', value: 'bid' },
  { label: 'Tre volte al giorno', value: 'tid' },
  { label: 'Quattro volte al giorno', value: 'qid' },
  { label: 'Ogni 6 ore', value: 'q6h' },
  { label: 'Ogni 8 ore', value: 'q8h' },
  { label: 'Ogni 12 ore', value: 'q12h' },
];

// Computed
const selectedDrug = computed(() => {
  return formData.value.drug ? drugs[formData.value.drug] : null;
});

const isFormValid = computed(() => {
  return (
    formData.value.weight !== null &&
    formData.value.weight > 0 &&
    formData.value.age !== null &&
    formData.value.age >= 0 &&
    formData.value.drug !== null &&
    ((selectedDrug.value?.type === 'weight-based' &&
      formData.value.dosePerKg !== null &&
      formData.value.dosePerKg > 0) ||
      (selectedDrug.value?.type === 'fixed' &&
        formData.value.fixedDose !== null &&
        formData.value.fixedDose > 0))
  );
});

// Funzioni
const onDrugChange = () => {
  // Reset dosaggi quando cambia farmaco
  formData.value.dosePerKg = null;
  formData.value.fixedDose = null;
};

const calculateDosage = () => {
  if (!isFormValid.value || !selectedDrug.value) return;

  let baseDose = 0;

  if (selectedDrug.value.type === 'weight-based') {
    baseDose = formData.value.dosePerKg! * formData.value.weight!;
  } else {
    baseDose = formData.value.fixedDose!;
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

  result.value = {
    totalDose: finalDose,
    dailyDose,
    renalAdjustment,
    estimatedGFR: estimateGFR(),
  };
};

const getAgeAdjustment = (): number => {
  const age = formData.value.age!;

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

const calculateRenalAdjustment = (): number => {
  if (!formData.value.creatinine || !selectedDrug.value?.renalElimination) {
    return 1;
  }

  const gfr = estimateGFR();

  // Aggiustamenti basati su eGFR
  if (gfr >= 60) return 1; // Nessun aggiustamento
  if (gfr >= 30) return 0.75; // Riduzione 25%
  if (gfr >= 15) return 0.5; // Riduzione 50%
  return 0.25; // Riduzione 75%
};

const estimateGFR = (): number => {
  if (!formData.value.creatinine || !formData.value.age || !formData.value.weight) {
    return 0;
  }

  // Formula Cockcroft-Gault semplificata
  const { age, weight, creatinine } = formData.value;
  return ((140 - age) * weight) / (72 * creatinine);
};

const getFrequencyPerDay = (): number => {
  const freqMap: Record<string, number> = {
    qd: 1,
    bid: 2,
    tid: 3,
    qid: 4,
    q6h: 4,
    q8h: 3,
    q12h: 2,
  };
  return freqMap[formData.value.frequency] || 2;
};

const getFrequencyText = (): string => {
  const freqMap: Record<string, string> = {
    qd: '1x/die',
    bid: '2x/die',
    tid: '3x/die',
    qid: '4x/die',
    q6h: 'Ogni 6h',
    q8h: 'Ogni 8h',
    q12h: 'Ogni 12h',
  };
  return freqMap[formData.value.frequency] || '2x/die';
};

const getAgeNote = (): string => {
  const age = formData.value.age!;
  if (age >= 65) return 'Metabolismo ridotto negli anziani';
  if (age < 2) return 'Immaturità degli organi nei neonati';
  if (age < 12) return 'Metabolismo accelerato nei bambini';
  return '';
};
</script>

<template>
  <!-- ============================================================ -->
  <!-- DOSAGE CALCULATOR PAGE - MAIN CONTAINER                      -->
  <!-- Weight-Based & Fixed-Dose Calculator with Renal Adjustment   -->
  <!-- ============================================================ -->

  <q-page class="q-pa-md">
    <!-- ============================================================ -->
    <!-- PAGE HEADER - Breadcrumbs & Title                           -->
    <!-- ============================================================ -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
        <q-breadcrumbs-el label="Dosage Calculator" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">💊 Dosage Calculator</h4>
      <p class="text-subtitle1 text-grey-7">
        Calcolo dosi farmacologiche per peso, età e funzione renale
      </p>
    </div>

    <!-- ============================================================ -->
    <!-- CALCULATOR MAIN LAYOUT - Input Panel & Results Panel        -->
    <!-- ============================================================ -->
    <div class="row q-gutter-lg">
      <!-- ============================================================ -->
      <!-- INPUT PANEL - Patient Parameters & Drug Selection           -->
      <!-- ============================================================ -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri Paziente</h6>

            <!-- Peso -->
            <q-input
              v-model.number="formData.weight"
              type="number"
              step="0.1"
              label="Peso Corporeo"
              suffix="kg"
              outlined
              class="q-mb-md"
              :rules="[(val) => (val > 0 && val <= 500) || 'Peso tra 1-500 kg']"
            >
              <template v-slot:prepend>
                <q-icon name="fitness_center" color="blue" />
              </template>
            </q-input>

            <!-- Età -->
            <q-input
              v-model.number="formData.age"
              type="number"
              label="Età"
              suffix="anni"
              outlined
              class="q-mb-md"
              :rules="[(val) => (val >= 0 && val <= 120) || 'Età tra 0-120 anni']"
            >
              <template v-slot:prepend>
                <q-icon name="cake" color="orange" />
              </template>
            </q-input>

            <!-- Creatinina (per aggiustamento renale) -->
            <q-input
              v-model.number="formData.creatinine"
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

            <!-- Selezione Farmaco -->
            <q-select
              v-model="formData.drug"
              :options="drugOptions"
              label="Seleziona Farmaco"
              outlined
              class="q-mb-md"
              emit-value
              map-options
              :rules="[(val) => val !== null || 'Selezionare un farmaco']"
              @update:model-value="onDrugChange"
            >
              <template v-slot:prepend>
                <q-icon name="medication" color="red" />
              </template>
            </q-select>

            <!-- Dose per kg (se applicabile) -->
            <q-input
              v-model.number="formData.dosePerKg"
              type="number"
              step="0.01"
              :label="selectedDrug?.doseLabel || 'Dose per kg'"
              :suffix="selectedDrug?.doseUnit || 'mg/kg'"
              outlined
              class="q-mb-md"
              v-if="selectedDrug?.type === 'weight-based'"
              :rules="[(val) => val > 0 || 'Inserire dose positiva']"
            >
              <template v-slot:prepend>
                <q-icon name="straighten" color="green" />
              </template>
            </q-input>

            <!-- Dose fissa (se applicabile) -->
            <q-input
              v-model.number="formData.fixedDose"
              type="number"
              step="0.01"
              :label="selectedDrug?.doseLabel || 'Dose'"
              :suffix="selectedDrug?.doseUnit || 'mg'"
              outlined
              class="q-mb-md"
              v-if="selectedDrug?.type === 'fixed'"
              :rules="[(val) => val > 0 || 'Inserire dose positiva']"
            >
              <template v-slot:prepend>
                <q-icon name="straighten" color="green" />
              </template>
            </q-input>

            <!-- Frequenza -->
            <q-select
              v-model="formData.frequency"
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

            <!-- Bottone Calcola -->
            <q-btn
              @click="calculateDosage"
              color="primary"
              size="lg"
              class="full-width q-mb-sm"
              icon="calculate"
              :disable="!isFormValid"
            >
              Calcola Dosaggio
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
              Reset Dati
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- ============================================================ -->
      <!-- RESULTS PANEL - Calculated Dosages & Adjustments            -->
      <!-- ============================================================ -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📈 Risultati Dosaggio</h6>

            <!-- Dose Calcolata -->
            <div class="text-center q-mb-lg" v-if="result.totalDose > 0">
              <div class="text-h3 text-primary q-mb-sm">
                {{ result.totalDose.toFixed(selectedDrug?.precision || 1) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>{{ selectedDrug?.doseUnit || 'mg' }}</strong> per dose
              </div>
              <div class="text-caption text-grey-6" v-if="selectedDrug?.type === 'weight-based'">
                {{ formData.dosePerKg }}{{ selectedDrug?.doseUnit || 'mg' }}/kg ×
                {{ formData.weight }}kg
              </div>
            </div>

            <!-- Frequenza e Dose Giornaliera -->
            <div class="row q-gutter-md q-mb-lg" v-if="result.totalDose > 0">
              <div class="col">
                <q-card flat bordered class="text-center q-pa-sm">
                  <div class="text-h6 text-primary">{{ getFrequencyText() }}</div>
                  <div class="text-caption">Frequenza</div>
                </q-card>
              </div>
              <div class="col">
                <q-card flat bordered class="text-center q-pa-sm">
                  <div class="text-h6 text-primary">
                    {{ result.dailyDose.toFixed(1) }} {{ selectedDrug?.doseUnit || 'mg' }}
                  </div>
                  <div class="text-caption">Dose Giornaliera</div>
                </q-card>
              </div>
            </div>

            <!-- Aggiustamenti -->
            <q-separator class="q-mb-md" v-if="result.totalDose > 0" />

            <!-- Aggiustamento Età -->
            <div class="q-mb-md" v-if="result.totalDose > 0 && getAgeAdjustment() !== 1">
              <div class="text-subtitle2">👶 Aggiustamento per Età:</div>
              <q-chip color="orange" text-color="white" class="text-weight-bold">
                Riduzione del {{ ((1 - getAgeAdjustment()) * 100).toFixed(0) }}%
              </q-chip>
              <div class="text-caption q-mt-sm">
                {{ getAgeNote() }}
              </div>
            </div>

            <!-- Aggiustamento Renale -->
            <div class="q-mb-md" v-if="result.totalDose > 0 && result.renalAdjustment !== 1">
              <div class="text-subtitle2">🫘 Aggiustamento Funzione Renale:</div>
              <q-chip color="red" text-color="white" class="text-weight-bold">
                Riduzione del {{ ((1 - result.renalAdjustment) * 100).toFixed(0) }}%
              </q-chip>
              <div class="text-caption q-mt-sm">
                eGFR stimato: {{ result.estimatedGFR.toFixed(1) }} mL/min/1.73m²
              </div>
            </div>

            <!-- Informazioni Farmaco -->
            <q-expansion-item
              icon="info"
              label="📋 Informazioni Farmaco"
              class="text-primary"
              v-if="selectedDrug"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="q-mb-sm"><strong>Classe:</strong> {{ selectedDrug.class }}</div>
                <div class="q-mb-sm">
                  <strong>Indicazioni:</strong> {{ selectedDrug.indications }}
                </div>
                <div class="q-mb-sm">
                  <strong>Range terapeutico:</strong> {{ selectedDrug.therapeuticRange }}
                </div>
                <div><strong>Note:</strong> {{ selectedDrug.notes }}</div>
              </div>
            </q-expansion-item>

            <!-- Avvertenze -->
            <q-expansion-item
              icon="warning"
              label="⚠️ Avvertenze Importanti"
              class="text-orange q-mt-sm"
              v-if="result.totalDose > 0"
            >
              <div class="q-pa-md bg-orange-1">
                <ul class="q-ma-none">
                  <li>Questo è solo un calcolo orientativo</li>
                  <li>Consultare sempre le linee guida cliniche</li>
                  <li>Considerare controindicazioni e interazioni</li>
                  <li>Monitorare risposta clinica e effetti collaterali</li>
                  <li>Aggiustare dose in base alla risposta del paziente</li>
                </ul>
              </div>
            </q-expansion-item>

            <!-- Formule -->
            <q-expansion-item
              icon="functions"
              label="🧮 Formule Utilizzate"
              class="text-primary q-mt-sm"
              v-if="result.totalDose > 0"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="q-mb-md" v-if="selectedDrug?.type === 'weight-based'">
                  <strong>Dose Totale:</strong><br />
                  <small>Dose per kg × Peso corporeo × Aggiustamenti</small>
                </div>
                <div class="q-mb-md" v-if="formData.creatinine">
                  <strong>eGFR (Cockcroft-Gault):</strong><br />
                  <small>((140 - età) × peso) / (72 × creatinina)</small>
                </div>
              </div>
            </q-expansion-item>

            <!-- NUOVA SEZIONE: Documentazione Scientifica Farmacologia -->
            <q-expansion-item
              icon="book"
              label="📚 Documentazione Scientifica - Farmacologia Clinica"
              class="text-primary q-mt-md"
            >
              <div class="q-pa-md bg-blue-1">
                <!-- Sezione 1: Farmacocinetica Fondamenti -->
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

                <!-- Sezione 2: Dosaggi Pediatrici -->
                <div class="q-mb-lg">
                  <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                    👶 Dosaggi Pediatrici e Neonatali
                  </h6>
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

                <!-- Sezione 3: Aggiustamento Renale CKD -->
                <div class="q-mb-lg">
                  <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                    🫘 Aggiustamento Dosaggio in Insufficienza Renale (CKD)
                  </h6>
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

                <!-- Sezione 4: Loading vs Maintenance Dose -->
                <div class="q-mb-lg">
                  <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                    ⚡ Loading Dose vs Maintenance Dose
                  </h6>
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

                <!-- Sezione 5: Riferimenti Scientifici -->
                <div class="q-mb-md">
                  <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                    📖 Riferimenti Scientifici ScienceDirect
                  </h6>
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
                      <strong>Mouton JW et al. (2011).</strong> "Pharmacokinetic/Pharmacodynamic
                      Considerations in the Treatment of Hospitalized Patients with Respiratory
                      Tract Infections" in Clinical Microbiology and Infection. ScienceDirect.
                      Time-dependent vs concentration-dependent killing, PK/PD indices (AUC/MIC,
                      Cmax/MIC, T>MIC), dosing optimization in critically ill patients.
                    </li>
                  </ul>
                </div>
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
/* ============================================================ */
/* DOSAGE CALCULATOR PAGE - COMPONENT STYLES                    */
/* Professional styling following CODING_STANDARDS.md           */
/* ============================================================ */

/* ============================================================ */
/* CARD STYLES - Base styling for input and results cards      */
/* ============================================================ */
.q-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ============================================================ */
/* NAVIGATION STYLES - Breadcrumbs transition effects          */
/* ============================================================ */
.q-breadcrumbs-el {
  transition: color 0.3s ease;
}

.q-breadcrumbs-el:hover {
  color: var(--q-primary);
}
</style>
