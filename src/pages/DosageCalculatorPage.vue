<template>
  <q-page class="q-pa-md">
    <!-- Header con breadcrumb -->
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

    <div class="row q-gutter-lg">
      <!-- Pannello Input -->
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
              class="full-width"
              icon="calculate"
              :disable="!isFormValid"
            >
              Calcola Dosaggio
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
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
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Interfacce
interface DosageFormData {
  weight: number | null;
  age: number | null;
  creatinine: number | null;
  drug: string | null;
  dosePerKg: number | null;
  fixedDose: number | null;
  frequency: string;
}

interface DrugInfo {
  name: string;
  class: string;
  type: 'weight-based' | 'fixed';
  doseLabel: string;
  doseUnit: string;
  indications: string;
  therapeuticRange: string;
  notes: string;
  precision: number;
  renalElimination: boolean;
}

interface DosageResult {
  totalDose: number;
  dailyDose: number;
  renalAdjustment: number;
  estimatedGFR: number;
}

// Dati reattivi
const formData = ref<DosageFormData>({
  weight: null,
  age: null,
  creatinine: null,
  drug: null,
  dosePerKg: null,
  fixedDose: null,
  frequency: 'bid',
});

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

// Stato
const result = ref<DosageResult>({
  totalDose: 0,
  dailyDose: 0,
  renalAdjustment: 1,
  estimatedGFR: 0,
});

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

<style scoped>
.q-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.q-breadcrumbs-el {
  transition: color 0.3s ease;
}

.q-breadcrumbs-el:hover {
  color: var(--q-primary);
}
</style>
