<template>
  <q-page class="q-pa-md">
    <!-- Header con breadcrumb -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
        <q-breadcrumbs-el label="GFR Calculator" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">🫘 GFR Calculator</h4>
      <p class="text-subtitle1 text-grey-7">
        Calcolo Filtrato Glomerulare Renale (eGFR) - MDRD e CKD-EPI
      </p>
    </div>

    <div class="row q-gutter-lg">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri Paziente</h6>

            <!-- Creatinina Sierica -->
            <q-input
              v-model.number="formData.creatinine"
              type="number"
              step="0.01"
              label="Creatinina Sierica"
              suffix="mg/dL"
              outlined
              class="q-mb-md"
              :rules="[(val) => (val > 0 && val <= 20) || 'Creatinina tra 0.1-20 mg/dL']"
            >
              <template v-slot:prepend>
                <q-icon name="science" color="blue" />
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
              :rules="[(val) => (val > 0 && val <= 120) || 'Età tra 1-120 anni']"
            >
              <template v-slot:prepend>
                <q-icon name="cake" color="orange" />
              </template>
            </q-input>

            <!-- Sesso -->
            <q-select
              v-model="formData.gender"
              :options="genderOptions"
              label="Sesso"
              outlined
              class="q-mb-md"
              emit-value
              map-options
              :rules="[(val) => val !== null || 'Selezionare il sesso']"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="purple" />
              </template>
            </q-select>

            <!-- Razza (per correzione) -->
            <q-select
              v-model="formData.race"
              :options="raceOptions"
              label="Etnia (opzionale per correzione)"
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
              label="Formula di Calcolo"
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
              class="full-width"
              icon="calculate"
              :disable="!isFormValid"
            >
              Calcola eGFR
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">� Risultati</h6>

            <!-- Risultato Principale -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 text-primary q-mb-sm">
                {{ result.gfr.toFixed(1) }}
              </div>
              <div class="text-subtitle1 text-grey-7"><strong>mL/min/1.73m²</strong> (eGFR)</div>
              <div class="text-caption text-grey-6">Formula: {{ getFormulaName() }}</div>
            </div>

            <!-- Classificazione CKD -->
            <q-separator class="q-mb-md" />

            <div class="q-mb-md">
              <div class="text-h6 q-mb-sm">🎯 Stadio Malattia Renale Cronica:</div>
              <q-chip :color="result.color" text-color="white" class="text-weight-bold" size="lg">
                {{ result.stage }}
              </q-chip>
              <div class="text-body2 q-mt-sm">
                {{ result.description }}
              </div>
            </div>

            <!-- Grafico Funzione Renale -->
            <div class="q-mb-lg" v-if="result.gfr > 0">
              <div class="text-subtitle2 q-mb-sm">📊 Livello Funzione Renale:</div>
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
                label="Confronta Formule"
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
            <q-expansion-item icon="info" label="📚 Classificazione Stadi CKD" class="text-primary">
              <div class="q-pa-md bg-grey-1">
                <div class="row q-gutter-sm text-caption">
                  <div class="col-12">
                    <span class="text-weight-bold text-green">Stadio 1:</span> ≥90 - Funzione
                    normale
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-light-green">Stadio 2:</span> 60-89 - Lieve
                    riduzione
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-orange">Stadio 3a:</span> 45-59 - Moderata
                    riduzione
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-deep-orange">Stadio 3b:</span> 30-44 -
                    Moderata-severa
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-red">Stadio 4:</span> 15-29 - Severa
                    riduzione
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-purple">Stadio 5:</span> &lt;15 -
                    Insufficienza renale
                  </div>
                </div>
              </div>
            </q-expansion-item>

            <!-- Formule -->
            <q-expansion-item
              icon="functions"
              label="🧮 Formule Utilizzate"
              class="text-primary q-mt-sm"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="q-mb-md">
                  <strong>MDRD (4-variabili):</strong><br />
                  <small
                    >175 × (SCr)^-1.154 × (Età)^-0.203 × (0.742 se femmina) × (1.212 se
                    afroamericana)</small
                  >
                </div>
                <div>
                  <strong>CKD-EPI:</strong><br />
                  <small
                    >Formula più accurata con diversi coefficienti per range di creatinina</small
                  >
                </div>
              </div>
            </q-expansion-item>

            <!-- Note Cliniche -->
            <q-expansion-item
              icon="medical_services"
              label="💡 Note Cliniche"
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
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Interfaccia per i dati del form
interface GFRFormData {
  creatinine: number | null; // Creatinina sierica (mg/dL)
  age: number | null; // Età (anni)
  gender: string | null; // Sesso
  race: string | null; // Razza (per correzione)
  formula: string; // Formula selezionata
}

// Interfaccia per i risultati
interface GFRResult {
  gfr: number;
  stage: string;
  description: string;
  color: string;
}

// Dati reattivi del form
const formData = ref<GFRFormData>({
  creatinine: null,
  age: null,
  gender: null,
  race: 'other',
  formula: 'ckdepi',
});

// Opzioni select
const genderOptions = [
  { label: 'Maschio', value: 'male' },
  { label: 'Femmina', value: 'female' },
];

const raceOptions = [
  { label: 'Caucasica/Altra', value: 'other' },
  { label: 'Afroamericana', value: 'african' },
];

const formulaOptions = [
  { label: 'CKD-EPI (Raccomandata)', value: 'ckdepi' },
  { label: 'MDRD (4-variabili)', value: 'mdrd' },
];

// Stato risultati
const result = ref<GFRResult>({
  gfr: 0,
  stage: '',
  description: '',
  color: 'grey',
});

const showComparison = ref(false);

// Computed per validazione form
const isFormValid = computed(() => {
  return (
    formData.value.creatinine !== null &&
    formData.value.creatinine > 0 &&
    formData.value.age !== null &&
    formData.value.age > 0 &&
    formData.value.gender !== null
  );
});

// Funzione principale di calcolo
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

// Calcolo MDRD
const calculateMDRD = (): number => {
  const { creatinine, age, gender, race } = formData.value;
  if (!creatinine || !age || !gender) return 0;

  let gfr = 175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203);

  // Correzione per sesso femminile
  if (gender === 'female') {
    gfr *= 0.742;
  }

  // Correzione per razza afroamericana
  if (race === 'african') {
    gfr *= 1.212;
  }

  return gfr;
};

// Calcolo CKD-EPI
const calculateCKDEPI = (): number => {
  const { creatinine, age, gender, race } = formData.value;
  if (!creatinine || !age || !gender) return 0;

  // Costanti CKD-EPI
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

  // Correzione per razza afroamericana
  if (race === 'african') {
    gfr *= 1.159;
  }

  return gfr;
};

// Classificazione stadi CKD
const getCKDStage = (gfr: number): { stage: string; description: string; color: string } => {
  if (gfr >= 90)
    return { stage: 'Stadio 1', description: 'Funzione renale normale', color: 'green' };
  if (gfr >= 60)
    return {
      stage: 'Stadio 2',
      description: 'Lieve riduzione funzione renale',
      color: 'light-green',
    };
  if (gfr >= 45)
    return {
      stage: 'Stadio 3a',
      description: 'Moderata riduzione funzione renale',
      color: 'orange',
    };
  if (gfr >= 30)
    return { stage: 'Stadio 3b', description: 'Moderata-severa riduzione', color: 'deep-orange' };
  if (gfr >= 15)
    return { stage: 'Stadio 4', description: 'Severa riduzione funzione renale', color: 'red' };
  return { stage: 'Stadio 5', description: 'Insufficienza renale terminale', color: 'purple' };
};

// Posizione indicatore nel grafico
const getGFRPosition = (): number => {
  const gfr = result.value.gfr;
  if (gfr <= 0) return 0;
  if (gfr >= 120) return 100;
  return (gfr / 120) * 100;
};

// Nome formula selezionata
const getFormulaName = (): string => {
  return formData.value.formula === 'mdrd' ? 'MDRD' : 'CKD-EPI';
};

// Note cliniche
const getClinicalNotes = (): string => {
  const gfr = result.value.gfr;
  const age = formData.value.age || 0;

  let notes = '';

  if (gfr >= 90) {
    notes = 'Funzione renale normale. Monitoraggio di routine se presenza di fattori di rischio.';
  } else if (gfr >= 60) {
    notes =
      'Lieve riduzione della funzione renale. Valutare presenza di danno renale e fattori di rischio.';
  } else if (gfr >= 45) {
    notes =
      'Moderata riduzione della funzione renale. Necessaria valutazione nefrologica e gestione complicanze.';
  } else if (gfr >= 30) {
    notes =
      'Moderata-severa riduzione. Prepararsi per terapia sostitutiva renale. Controllo complicanze CKD.';
  } else if (gfr >= 15) {
    notes = 'Severa riduzione della funzione renale. Preparazione urgente per dialisi o trapianto.';
  } else {
    notes =
      'Insufficienza renale terminale. Necessaria terapia sostitutiva renale immediata (dialisi/trapianto).';
  }

  if (age >= 65) {
    notes += ' Nota: negli anziani considerare il declino fisiologico della funzione renale.';
  }

  return notes;
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
    /* Stadio 5 - Viola */ #f44336 12.5% 25%,
    /* Stadio 4 - Rosso */ #ff5722 25% 37.5%,
    /* Stadio 3b - Rosso scuro */ #ff9800 37.5% 50%,
    /* Stadio 3a - Arancione */ #8bc34a 50% 75%,
    /* Stadio 2 - Verde chiaro */ #4caf50 75% 100% /* Stadio 1 - Verde */
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
</style>
