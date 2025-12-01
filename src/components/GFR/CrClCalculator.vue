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
  resetFormData();
  result.value = { ...initialResult };
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
  if (!isFormValid.value) return;

  const { creatinine, age, weight, gender } = formData.value;
  if (!creatinine || !age || !weight || !gender) return;

  // Cockcroft-Gault formula
  let crcl = ((140 - age) * weight) / (72 * creatinine);

  // Gender correction (female)
  if (gender === 'female') {
    crcl *= 0.85;
  }

  result.value = {
    crcl: Math.round(crcl * 10) / 10,
  };

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
            <h6 class="text-h6 q-ma-none q-mb-md">💊 Parametri Paziente</h6>
            <p class="text-caption text-grey-7 q-mb-md">
              Formula Cockcroft-Gault per dosaggio farmaci (non normalizzata per BSA)
            </p>

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

            <!-- Peso -->
            <q-input
              v-model.number="formData.weight"
              type="number"
              step="0.1"
              label="Peso Corporeo"
              suffix="kg"
              outlined
              class="q-mb-md"
              :rules="[(val: number) => (val > 0 && val <= 300) || 'Peso tra 1-300 kg']"
            >
              <template v-slot:prepend>
                <q-icon name="monitor_weight" color="green" />
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
            <h6 class="text-h6 q-ma-none q-mb-md">📈 Risultati</h6>

            <!-- Risultato Principale -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 text-primary q-mb-sm">
                {{ result.crcl.toFixed(1) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>mL/min</strong> (Creatinine Clearance)
              </div>
              <div class="text-caption text-grey-6">Formula: Cockcroft-Gault</div>
            </div>

            <q-separator class="q-mb-md" />

            <!-- Note Cliniche -->
            <q-banner class="bg-amber-2 q-mb-md" rounded>
              <template v-slot:avatar>
                <q-icon name="warning" color="amber" />
              </template>
              <div class="text-caption">
                <strong>Uso Clinico:</strong> CrCl per dosaggio farmaci renalmente escreti. eGFR per
                staging CKD.
              </div>
            </q-banner>

            <!-- Interpretazione -->
            <div class="q-mb-md" v-if="result.crcl > 0">
              <div class="text-subtitle2 q-mb-sm">🎯 Interpretazione Dosaggio Farmaci:</div>
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

            <!-- 1️⃣ Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              label="1️⃣ Definizione e Significato Clinico"
              class="q-mt-sm"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 q-mb-sm">
                  <strong>Definizione:</strong> La Creatinine Clearance (CrCl) rappresenta il volume
                  di plasma completamente depurato dalla creatinina per unità di tempo, espresso in
                  mL/min. È una stima della filtrazione glomerulare utilizzata principalmente per il
                  dosaggio dei farmaci.
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>Differenza tra CrCl e eGFR:</strong>
                </p>
                <ul class="text-body2 q-mb-sm">
                  <li>
                    <strong>CrCl (Cockcroft-Gault):</strong> NON normalizzata per BSA (1.73m²),
                    dipende dal peso corporeo → usata per dosaggio farmaci
                  </li>
                  <li>
                    <strong>eGFR (MDRD/CKD-EPI):</strong> Normalizzata per BSA → usata per staging
                    CKD
                  </li>
                </ul>
                <q-banner class="bg-blue-2 text-blue-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="info" color="blue" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Nota Clinica:</strong> La maggior parte dei farmaci ha linee guida di
                    dosaggio basate su CrCl (Cockcroft-Gault), non su eGFR. Usare CrCl per
                    aggiustamenti farmaci.
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 2️⃣ Fisiologia della Clearance Renale -->
            <q-expansion-item
              icon="biotech"
              label="2️⃣ Fisiologia della Clearance Renale"
              class="q-mt-sm"
              header-class="bg-green-1 text-green-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Meccanismo Clearance:</p>
                <p class="text-body2 q-mb-sm">
                  La clearance renale di una sostanza è determinata da tre processi:
                </p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>Filtrazione Glomerulare:</strong> Creatinina filtrata liberamente
                    attraverso glomeruli (~90% della clearance)
                  </li>
                  <li>
                    <strong>Secrezione Tubulare:</strong> ~10% creatinina secreta attivamente nel
                    tubulo prossimale (carrier organici OCT2)
                  </li>
                  <li>
                    <strong>Riassorbimento:</strong> Creatinina NON viene riassorbita (a differenza
                    di urea)
                  </li>
                </ul>
                <p class="text-body2 q-mb-sm">
                  <strong>Equazione Clearance:</strong> C = (U × V) / P
                </p>
                <ul class="text-body2">
                  <li>U = Concentrazione urinaria creatinina (mg/dL)</li>
                  <li>V = Volume urinario per minuto (mL/min)</li>
                  <li>P = Concentrazione plasmatica creatinina (mg/dL)</li>
                </ul>
                <q-banner class="bg-green-2 text-green-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="science" color="green" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Fisiologia:</strong> La secrezione tubulare di creatinina causa
                    sovrastima del GFR di ~10-20% con misurazione CrCl urinaria 24h. Cockcroft-Gault
                    corregge questa discrepanza usando equazione empirica.
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 3️⃣ Come si Calcola CrCl -->
            <q-expansion-item
              icon="speed"
              label="3️⃣ Come si Calcola CrCl"
              class="q-mt-sm"
              header-class="bg-amber-1 text-amber-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Metodi di Calcolo:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>Raccolta Urine 24h (Gold Standard):</strong> C = (U × V) / P - Accurato
                    ma errori frequenti raccolta (incompleta, timing scorretto)
                  </li>
                  <li>
                    <strong>Cockcroft-Gault (Clinico):</strong> Stima CrCl da creatinina sierica,
                    età, peso, sesso - Metodo standard per dosaggio farmaci
                  </li>
                </ul>
                <p class="text-body2 text-weight-bold q-mb-sm">Quando Usare Cockcroft-Gault:</p>
                <ul class="text-body2">
                  <li>Aggiustamento dose farmaci renalmente escreti</li>
                  <li>Pazienti anziani (>65 anni) - più accurata di eGFR</li>
                  <li>Pazienti obesi (usare peso corporeo ideale o aggiustato)</li>
                  <li>Pazienti con massa muscolare ridotta (sarcopenia, amputazioni)</li>
                </ul>
                <q-banner class="bg-amber-2 text-amber-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="tips_and_updates" color="amber" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Best Practice:</strong> Per pazienti obesi (BMI >30), usare peso ideale
                    o aggiustato: ABW = IBW + 0.4 × (Peso Attuale - IBW).
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- 4️⃣ Formula Cockcroft-Gault -->
            <q-expansion-item
              icon="functions"
              label="4️⃣ Formula Cockcroft-Gault"
              class="q-mt-sm"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Formula Classica (1976):</p>
                <p class="text-body2 q-mb-sm">
                  CrCl (mL/min) = [(140 - Età) × Peso (kg) × (0.85 se femmina)] / (72 × Creatinina
                  sierica mg/dL)
                </p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>140 - Età:</strong> Riflette declino funzione renale con invecchiamento
                    (~1 mL/min/anno dopo 40 anni)
                  </li>
                  <li>
                    <strong>Peso (kg):</strong> Massa muscolare correlata a produzione creatinina
                    (NON normalizzato per BSA)
                  </li>
                  <li>
                    <strong>0.85 (femmina):</strong> Donne hanno ~15% meno massa muscolare a parità
                    di peso
                  </li>
                  <li>
                    <strong>72:</strong> Costante empirica derivata da studi originali (conversione
                    unità + fattori fisiologici)
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Limitazioni Formula:</p>
                <ul class="text-body2">
                  <li>
                    <strong>Obesità:</strong> Sovrastima CrCl (peso ≠ massa muscolare). Usare peso
                    ideale/aggiustato
                  </li>
                  <li>
                    <strong>Sarcopenia:</strong> Sottostima CrCl in anziani con ridotta massa
                    muscolare
                  </li>
                  <li><strong>Estremi peso:</strong> Inaffidabile se peso &lt;40 kg o >120 kg</li>
                  <li>
                    <strong>Creatinina variabile:</strong> Influenzata da dieta, farmaci
                    (cimetidina, trimetoprim bloccano secrezione tubulare)
                  </li>
                </ul>

                <q-banner class="bg-cyan-2 text-cyan-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="recommend" color="cyan" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Raccomandazione:</strong> Cockcroft-Gault rimane standard FDA/EMA per
                    dosaggio farmaci, nonostante limitazioni. Equazioni più recenti (CKD-EPI) non
                    validate per farmacocinetica.
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
                  Classificazione Funzione Renale per Dosaggio Farmaci:
                </p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong class="text-green">≥90 mL/min:</strong> Normale - Dosaggio standard
                  </li>
                  <li>
                    <strong class="text-light-green">60-89 mL/min:</strong> Lieve riduzione - Alcuni
                    farmaci richiedono aggiustamento
                  </li>
                  <li>
                    <strong class="text-orange">45-59 mL/min:</strong> Moderata - Aggiustamento
                    necessario per farmaci nefrotossici
                  </li>
                  <li>
                    <strong class="text-deep-orange">30-44 mL/min:</strong> Moderata-severa -
                    Aggiustamento 50-75% dosaggio
                  </li>
                  <li>
                    <strong class="text-red">15-29 mL/min:</strong> Severa - Riduzione drastica
                    25-50%, molti farmaci controindicati
                  </li>
                  <li>
                    <strong class="text-purple">&lt;15 mL/min:</strong> ESRD - Dosaggio basato su
                    dialisi
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Farmaci Critici da Aggiustare:</p>
                <ul class="text-body2">
                  <li>
                    <strong>Antibiotici:</strong> Aminoglicosidi, vancomicina, penicilline,
                    fluoroquinoloni
                  </li>
                  <li>
                    <strong>Anticoagulanti:</strong> Enoxaparina (↓dose 50% se CrCl &lt;30),
                    dabigatran controindicato
                  </li>
                  <li>
                    <strong>Ipoglicemizzanti:</strong> Metformina (evitare se CrCl &lt;30),
                    gliburide (↑rischio ipoglicemia)
                  </li>
                  <li><strong>Altri:</strong> Digoxina, litio, allopurinolo, metotrexato</li>
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
                <p class="text-body2 text-weight-bold q-mb-sm">Uso Primario - Dosaggio Farmaci:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>Schede Tecniche Farmaci:</strong> Dosaggi basati su CrCl
                    (Cockcroft-Gault), NON eGFR
                  </li>
                  <li>
                    <strong>Software Dose Calculator:</strong> Lexicomp, Micromedex usano CrCl per
                    calcoli
                  </li>
                  <li>
                    <strong>Studi Clinici:</strong> Maggior parte trial farmaci usa Cockcroft-Gault
                    per inclusione/esclusione
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Popolazioni Speciali:</p>
                <ul class="text-body2">
                  <li>
                    <strong>Anziani (>75 anni):</strong> CrCl può essere normale nonostante ↓GFR
                    reale (↓massa muscolare). Usare cautela.
                  </li>
                  <li>
                    <strong>Obesi:</strong> Usare peso corporeo aggiustato (ABW) per evitare
                    sovrastima
                  </li>
                  <li>
                    <strong>Chemioterapia:</strong> Carboplatin dose = AUC × (GFR + 25) - Calvert
                    formula usa eGFR, non CrCl
                  </li>
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
                <p class="text-body2 text-weight-bold q-mb-sm">Valori Critici per Farmaci:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong class="text-red">CrCl &lt;30 mL/min:</strong> Evitare FANS, metformina,
                    nitrofurantoina. ↓dose enoxaparina 50%.
                  </li>
                  <li>
                    <strong class="text-red">CrCl &lt;15 mL/min:</strong> Evitare contrasti iodati
                    (rischio AKI). Molti antibiotici controindicati.
                  </li>
                  <li>
                    <strong class="text-orange">CrCl 30-50 mL/min:</strong> ↓dose 50% per
                    aminoglicosidi, fluoroquinoloni. Monitorare TDM.
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Farmaci ad Alto Rischio:</p>
                <ul class="text-body2">
                  <li>
                    <strong>Aminoglicosidi (gentamicina, tobramicina):</strong> Nefrotossici +
                    ototossici. TDM obbligatorio.
                  </li>
                  <li>
                    <strong>Vancomicina:</strong> Livelli trough 15-20 µg/mL (severa infezione).
                    Monitorare creatinina ogni 2-3 giorni.
                  </li>
                  <li>
                    <strong>Litio:</strong> Range terapeutico stretto (0.6-1.2 mEq/L). Tossicità se
                    CrCl ↓improvviso.
                  </li>
                </ul>

                <q-banner class="bg-red-2 text-red-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="emergency" color="red" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>ALERT CLINICO:</strong> Se CrCl &lt;30 mL/min e paziente assume
                    metformina, SOSPENDERE IMMEDIATAMENTE (rischio acidosi lattica fatale).
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
                  Template Documentazione Farmacologica:
                </p>
                <div class="bg-grey-2 q-pa-md rounded-borders text-body2 q-mb-md">
                  <p>
                    <strong>CrCl (Cockcroft-Gault):</strong> [valore] mL/min<br />
                    <strong>Parametri:</strong> Età [X] anni, Peso [Y] kg, Sesso [M/F], Creatinina
                    [Z] mg/dL<br />
                    <strong>Interpretazione:</strong> [Normale/Lieve/Moderata/Severa riduzione]<br />
                    <strong>Aggiustamenti Farmaci:</strong>
                  </p>
                  <ul>
                    <li>[Farmaco]: [Dose aggiustata] (da [dose standard] → [nuova dose])</li>
                    <li>[Farmaco sospeso]: Controindicato con CrCl &lt;[soglia]</li>
                  </ul>
                </div>

                <p class="text-body2 text-weight-bold q-mb-sm">Elementi da Documentare:</p>
                <ul class="text-body2">
                  <li>Peso usato per calcolo (attuale/ideale/aggiustato)</li>
                  <li>Data calcolo CrCl</li>
                  <li>Farmaci aggiustati o sospesi</li>
                  <li>Prossima rivalutazione creatinina (1-7 giorni dipendente da stabilità)</li>
                </ul>
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
                <p class="text-body2 text-weight-bold q-mb-sm">Pubblicazioni Fondamentali:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>Cockcroft DW, Gault MH.</strong> (1976). Prediction of creatinine
                    clearance from serum creatinine. <em>Nephron</em> 16(1):31-41
                  </li>
                  <li>
                    <strong>Winter MA, et al.</strong> (2012). Impact of various body weights and
                    serum creatinine concentrations on the bias and accuracy of the Cockcroft-Gault
                    equation. <em>Ann Pharmacother</em> 46(12):1621-1629
                  </li>
                  <li>
                    <strong>Verhave JC, et al.</strong> (2003). The association between
                    atherosclerotic risk factors and renal function in the general population.
                    <em>Kidney Int</em> 64(5):1681-1687
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Linee Guida Dosaggio:</p>
                <ul class="text-body2">
                  <li>
                    <strong>FDA:</strong> Guidance for Industry - Pharmacokinetics in Patients with
                    Impaired Renal Function
                  </li>
                  <li>
                    <strong>EMA:</strong> Guideline on the evaluation of the pharmacokinetics of
                    medicinal products in patients with decreased renal function
                  </li>
                  <li>
                    <strong>KDIGO:</strong> Clinical Practice Guideline on Acute Kidney Injury
                    (2012)
                  </li>
                </ul>

                <q-banner class="bg-teal-2 text-teal-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="link" color="teal" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Risorse Online:</strong>
                    <a
                      href="https://www.fda.gov/drugs/drug-development-tool-ddt-qualification-programs"
                      target="_blank"
                      class="text-teal-9"
                      >FDA Guidance</a
                    >
                    |
                    <a
                      href="https://www.ema.europa.eu/en/documents/scientific-guideline/guideline-evaluation-pharmacokinetics-medicinal-products-patients-decreased-renal-function_en.pdf"
                      target="_blank"
                      class="text-teal-9"
                      >EMA Guideline</a
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
