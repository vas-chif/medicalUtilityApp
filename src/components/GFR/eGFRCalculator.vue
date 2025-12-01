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
import { ref, computed } from 'vue';

// Composables
import { useResetForm } from 'src/composables/useResetForm';

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
const genderOptions = [
  { label: 'Maschio', value: 'male' },
  { label: 'Femmina', value: 'female' },
];

const raceOptions = [
  { label: 'Altro', value: 'other' },
  { label: 'Afroamericano', value: 'african' },
];

const formulaOptions = [
  { label: 'CKD-EPI (Raccomandato)', value: 'ckdepi' },
  { label: 'MDRD', value: 'mdrd' },
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
              :rules="[(val: number) => (val > 0 && val <= 20) || 'Creatinina tra 0.1-20 mg/dL']"
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
              :rules="[(val: number) => (val > 0 && val <= 120) || 'Età tra 1-120 anni']"
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
              :rules="[(val: string) => val !== null || 'Selezionare il sesso']"
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

      <!-- ===================================================== -->
      <!-- RESULTS PANEL                                         -->
      <!-- ===================================================== -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📈 Risultati</h6>

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

            <div class="q-mb-md" v-if="result.gfr > 0">
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

            <!-- Stadi CKD Quick Reference -->
            <q-expansion-item icon="info" label="Classificazione Stadi CKD" class="q-mt-sm">
              <q-card class="q-pa-md">
                <div class="row q-gutter-sm text-body2">
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
              </q-card>
            </q-expansion-item>

            <!-- ================================================= -->
            <!-- NEWS-STYLE DOCUMENTATION (9 SECTIONS)             -->
            <!-- ================================================= -->

            <!-- 1️⃣ Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              label="1️⃣ Definizione e Significato Clinico"
              class="q-mt-sm"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 q-mb-sm">
                  <strong>Definizione Fisiologica:</strong> Il Glomerular Filtration Rate (GFR)
                  rappresenta il volume di plasma sanguigno filtrato attraverso i glomeruli renali
                  per unità di tempo, espresso in mL/min/1.73m². È il parametro principale per
                  valutare la funzione renale globale.
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>Significato Clinico:</strong> Il GFR è fondamentale per:
                </p>
                <ul class="text-body2 q-mb-sm">
                  <li>
                    <strong>Diagnosi e Stadiazione CKD:</strong> La malattia renale cronica (CKD) è
                    definita da GFR &lt;60 mL/min/1.73m² per ≥3 mesi (KDIGO 2024)
                  </li>
                  <li>
                    <strong>Dosaggio Farmaci:</strong> Aggiustamento dose richiesto quando eGFR
                    &lt;60 mL/min (antibiotici, anticoagulanti, ipoglicemizzanti)
                  </li>
                  <li>
                    <strong>Rischio Cardiovascolare:</strong> Ogni riduzione 10 mL/min del GFR
                    associata a ↑15-20% rischio eventi CV
                  </li>
                  <li>
                    <strong>Terapia Sostitutiva:</strong> eGFR &lt;15 mL/min (stadio 5) indica
                    necessità pianificazione dialisi/trapianto
                  </li>
                </ul>
                <q-banner class="bg-blue-2 text-blue-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="info" color="blue" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Nota Clinica:</strong> Il GFR stimato (eGFR) con equazioni basate su
                    creatinina è il metodo standard per valutazione funzione renale nella pratica
                    clinica.
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 2️⃣ Fisiologia della Filtrazione Glomerulare -->
            <q-expansion-item
              icon="biotech"
              label="2️⃣ Fisiologia della Filtrazione Glomerulare"
              class="q-mt-sm"
              header-class="bg-green-1 text-green-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Anatomia Funzionale del Nefrone:</p>
                <p class="text-body2 q-mb-sm">
                  Ciascun rene contiene ~1 milione di nefroni (unità funzionali). Il glomerulo è una
                  rete di capillari fenestrati avvolti dalla capsula di Bowman, dove avviene
                  l'ultrafiltrazione del plasma.
                </p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>Endotelio fenestrato:</strong> Pori 70-100 nm, impediscono passaggio
                    cellule ematiche
                  </li>
                  <li>
                    <strong>Membrana basale glomerulare (GBM):</strong> Barriera selettività
                    dimensionale e carica
                  </li>
                  <li>
                    <strong>Podociti:</strong> Interdigitazioni formano fessure 25-60 nm collegate
                    da diaframma con nephrina
                  </li>
                </ul>
                <p class="text-body2 text-weight-bold q-mb-sm">Determinanti Emodinamici del GFR:</p>
                <p class="text-body2 q-mb-sm">
                  GFR = K<sub>f</sub> × [(P<sub>GC</sub> - P<sub>BS</sub>) - (π<sub>GC</sub> -
                  π<sub>BS</sub>)]
                </p>
                <q-banner class="bg-orange-2 text-orange-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="warning" color="orange" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Implicazione Clinica:</strong> ACE-inibitori/ARB possono causare ↓acuto
                    GFR (10-30%) in pazienti con stenosi arteria renale bilaterale. Monitorare
                    creatinina 1-2 settimane dopo inizio terapia.
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 3️⃣ Come si Misura/Calcola il GFR -->
            <q-expansion-item
              icon="speed"
              label="3️⃣ Come si Misura/Calcola il GFR"
              class="q-mt-sm"
              header-class="bg-amber-1 text-amber-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Metodi di Misurazione:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>Gold Standard (mGFR):</strong> Clearance inulina/iohexol - accurato ma
                    complesso, riservato a ricerca
                  </li>
                  <li>
                    <strong>eGFR (stimato):</strong> Equazioni basate su creatinina sierica (MDRD,
                    CKD-EPI) - metodo standard clinico
                  </li>
                  <li>
                    <strong>Clearance creatinina:</strong> Misurazione urine 24h - meno affidabile,
                    errori raccolta
                  </li>
                </ul>
                <p class="text-body2 q-mb-sm">
                  <strong>Creatinina come Marker:</strong> La creatinina è prodotto del metabolismo
                  muscolare, filtrata liberamente dal glomerulo e non riassorbita. Limitazioni:
                </p>
                <ul class="text-body2">
                  <li>Influenzata da massa muscolare (↓anziani, ↑atleti)</li>
                  <li>Secrezione tubulare variabile (sovrastima GFR ~10-20%)</li>
                  <li>Dieta ricca proteine può aumentare creatinina</li>
                </ul>
                <q-banner class="bg-amber-2 text-amber-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="tips_and_updates" color="amber" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Best Practice:</strong> Per accuratezza, evitare esercizio intenso 24h
                    prima del prelievo e assicurarsi che il paziente sia a digiuno.
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 4️⃣ Formule di Calcolo -->
            <q-expansion-item
              icon="functions"
              label="4️⃣ Formule di Calcolo"
              class="q-mt-sm"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">MDRD (1999):</p>
                <p class="text-body2 q-mb-sm">
                  eGFR = 175 × SCr<sup>-1.154</sup> × Age<sup>-0.203</sup> × 0.742[se femmina] ×
                  1.212[se afroamericano]
                </p>
                <ul class="text-body2 q-mb-md">
                  <li>Sviluppata su 1628 pazienti con CKD</li>
                  <li>Sottostima GFR quando >60 mL/min</li>
                  <li>Non raccomandata per screening popolazione generale</li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">CKD-EPI (2009, aggiornata 2021):</p>
                <p class="text-body2 q-mb-sm">
                  eGFR = 141 × min(SCr/κ,1)<sup>α</sup> × max(SCr/κ,1)<sup>-1.209</sup> × 0.993<sup
                    >Age</sup
                  >
                  × 1.012[se femmina]
                </p>
                <ul class="text-body2 q-mb-md">
                  <li>κ = 0.7 (femmina), 0.9 (maschio)</li>
                  <li>α = -0.329/-0.411 (SCr bassa), -1.209 (SCr alta)</li>
                  <li>Più accurata di MDRD per eGFR >60 mL/min</li>
                  <li>Equazione 2021 rimuove fattore di correzione razziale</li>
                </ul>

                <q-banner class="bg-cyan-2 text-cyan-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="recommend" color="cyan" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Raccomandazione KDIGO:</strong> CKD-EPI è preferita per la maggior parte
                    delle applicazioni cliniche (maggiore accuratezza in tutto il range di GFR).
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 5️⃣ Interpretazione Risultati -->
            <q-expansion-item
              icon="psychology"
              label="5️⃣ Interpretazione Risultati"
              class="q-mt-sm"
              header-class="bg-orange-1 text-orange-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  Classificazione KDIGO degli Stadi CKD:
                </p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong class="text-green">G1 (≥90):</strong> Funzione renale normale (con
                    evidenza danno renale)
                  </li>
                  <li>
                    <strong class="text-light-green">G2 (60-89):</strong> Lieve riduzione funzione
                    renale
                  </li>
                  <li>
                    <strong class="text-orange">G3a (45-59):</strong> Moderata riduzione funzione
                    renale
                  </li>
                  <li>
                    <strong class="text-deep-orange">G3b (30-44):</strong> Moderata-severa riduzione
                  </li>
                  <li>
                    <strong class="text-red">G4 (15-29):</strong> Severa riduzione funzione renale
                  </li>
                  <li>
                    <strong class="text-purple">G5 (&lt;15):</strong> Insufficienza renale terminale
                    (dialisi/trapianto)
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Azioni Cliniche per Stadio:</p>
                <ul class="text-body2">
                  <li>
                    <strong>G1-G2:</strong> Monitoraggio annuale, controllo fattori di rischio (DM,
                    HTN)
                  </li>
                  <li>
                    <strong>G3a:</strong> Monitoraggio semestrale, riferimento nefrologo se
                    progressione
                  </li>
                  <li>
                    <strong>G3b-G4:</strong> Riferimento nefrologo, aggiustamento farmaci, controllo
                    PTH/vitamina D
                  </li>
                  <li>
                    <strong>G5:</strong> Pianificazione terapia sostitutiva renale
                    (emodialisi/peritoneale/trapianto)
                  </li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- 6️⃣ Applicazioni Cliniche -->
            <q-expansion-item
              icon="local_hospital"
              label="6️⃣ Applicazioni Cliniche"
              class="q-mt-sm"
              header-class="bg-purple-1 text-purple-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Dosaggio Farmaci:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>Antibiotici renali:</strong> Gentamicina, vancomicina, penicilline
                    richiedono riduzione dose se eGFR &lt;60
                  </li>
                  <li>
                    <strong>Anticoagulanti:</strong> Enoxaparina, dabigatran controindicati se eGFR
                    &lt;30
                  </li>
                  <li>
                    <strong>Metformina:</strong> Evitare se eGFR &lt;30, cautela se 30-45 (rischio
                    acidosi lattica)
                  </li>
                  <li>
                    <strong>Chemioterapici:</strong> Carboplatino, metotrexato richiedono
                    aggiustamento dose preciso
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Screening Popolazione:</p>
                <ul class="text-body2">
                  <li>Diabete tipo 1/2 (screening annuale CKD)</li>
                  <li>Ipertensione non controllata</li>
                  <li>Storia familiare malattia renale policistica</li>
                  <li>Età >60 anni con fattori di rischio CV</li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- 7️⃣ Valori Critici e Alert -->
            <q-expansion-item
              icon="warning"
              label="7️⃣ Valori Critici e Alert"
              class="q-mt-sm"
              header-class="bg-red-1 text-red-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Valori Critici Immediati:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong class="text-red">eGFR &lt;15 mL/min:</strong> Urgente riferimento
                    nefrologo, pianificazione dialisi
                  </li>
                  <li>
                    <strong class="text-red">↓GFR >25% in 3-6 mesi:</strong> Progressione rapida
                    CKD, ricerca causa acuta
                  </li>
                  <li>
                    <strong class="text-red">Creatinina >5 mg/dL:</strong> Considerare AKI (Acute
                    Kidney Injury) vs. CKD avanzata
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Complicanze da Monitorare:</p>
                <ul class="text-body2">
                  <li><strong>Anemia:</strong> Ridotta produzione eritropoietina (eGFR &lt;45)</li>
                  <li>
                    <strong>Iperparatiroidismo secondario:</strong> ↑PTH, ↓vitamina D (eGFR &lt;60)
                  </li>
                  <li>
                    <strong>Acidosi metabolica:</strong> Ridotta escrezione H<sup>+</sup> (eGFR
                    &lt;30)
                  </li>
                  <li>
                    <strong>Iperkaliemia:</strong> Ridotta escrezione K<sup>+</sup> (rischio
                    aritmie)
                  </li>
                </ul>

                <q-banner class="bg-red-2 text-red-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="emergency" color="red" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>ALERT CLINICO:</strong> Se eGFR &lt;15 mL/min con sintomi uremici
                    (nausea, confusione, edema polmonare), considerare dialisi urgente.
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 8️⃣ Documentazione Clinica -->
            <q-expansion-item
              icon="menu_book"
              label="8️⃣ Documentazione Clinica"
              class="q-mt-sm"
              header-class="bg-indigo-1 text-indigo-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">
                  Elementi Essenziali da Documentare:
                </p>
                <ul class="text-body2 q-mb-md">
                  <li>Data e ora prelievo creatinina</li>
                  <li>Formula utilizzata (MDRD vs. CKD-EPI)</li>
                  <li>Parametri paziente (età, sesso, etnia se applicabile)</li>
                  <li>Stadio CKD calcolato (G1-G5)</li>
                  <li>Trend eGFR (confronto con valori precedenti)</li>
                  <li>Aggiustamenti farmaci effettuati</li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Template Note Clinica:</p>
                <div class="bg-grey-2 q-pa-md rounded-borders text-body2">
                  <p>
                    <strong>eGFR:</strong> [valore] mL/min/1.73m² (CKD-EPI)<br />
                    <strong>Stadio CKD:</strong> G[1-5] - [descrizione]<br />
                    <strong>Trend:</strong> [stabile/↑/↓] rispetto [data precedente]<br />
                    <strong>Azione:</strong> [monitoraggio/riferimento nefrologo/aggiustamento
                    farmaci]
                  </p>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 9️⃣ Riferimenti Scientifici -->
            <q-expansion-item
              icon="science"
              label="9️⃣ Riferimenti Scientifici"
              class="q-mt-sm"
              header-class="bg-teal-1 text-teal-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Linee Guida Principali:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>KDIGO 2024:</strong> Clinical Practice Guideline for the Evaluation and
                    Management of Chronic Kidney Disease
                  </li>
                  <li><strong>NKF-KDOQI:</strong> National Kidney Foundation Guidelines (USA)</li>
                  <li>
                    <strong>NICE Guidelines:</strong> Chronic kidney disease - assessment and
                    management (UK)
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Pubblicazioni Chiave:</p>
                <ul class="text-body2">
                  <li>
                    Levey AS, et al. (2009). A new equation to estimate glomerular filtration rate.
                    <em>Ann Intern Med</em> 150:604-612
                  </li>
                  <li>
                    Inker LA, et al. (2021). New creatinine- and cystatin C-based equations to
                    estimate GFR without race. <em>N Engl J Med</em> 385:1737-1749
                  </li>
                  <li>
                    Stevens LA, Levey AS. (2009). Measured GFR as a confirmatory test for estimated
                    GFR. <em>J Am Soc Nephrol</em> 20:2305-2313
                  </li>
                  <li>
                    Go AS, et al. (2004). Chronic kidney disease and the risks of death,
                    cardiovascular events, and hospitalization. <em>N Engl J Med</em> 351:1296-1305
                  </li>
                </ul>

                <q-banner class="bg-teal-2 text-teal-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="link" color="teal" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Risorse Online:</strong>
                    <a href="https://kdigo.org/guidelines/" target="_blank" class="text-teal-9"
                      >KDIGO Guidelines</a
                    >
                    |
                    <a
                      href="https://www.kidney.org/professionals/guidelines"
                      target="_blank"
                      class="text-teal-9"
                      >NKF Guidelines</a
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
