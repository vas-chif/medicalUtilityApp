<!-- FluidBalanceCalculator.vue -->
<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file FluidBalanceCalculator.vue
 * @description 24-hour Fluid Balance calculator component for volume status assessment
 *              in critically ill patients, CKD, heart failure, and ICU monitoring.
 *              Supports Italian (current) with i18n-ready props for future English translation.
 *
 * @author Vasile Chifeac
 * @created 2025-11-16
 * @modified 2025-11-16
 *
 * @example
 * <FluidBalanceCalculator
 *   calculateButtonText="Calcola Bilancio"
 *   resetButtonText="Reset Dati"
 * />
 *
 * @notes
 * - Component extracted from GFRCalculatorPage.vue (architectural refactoring)
 * - NEWS-style documentation (9 sections: Definizione→Riferimenti)
 * - 24h intake/output monitoring with automated balance calculation
 * - Clinical decision support for euvolemia, hypervolemia, hypovolemia
 * - Responsive design for mobile/tablet/desktop
 * - Full TypeScript type safety with strict mode
 *
 * @dependencies
 * - Quasar Framework components
 *
 * @medical-references
 * - Bouchard J, et al. Crit Care Med. 2009 - Fluid accumulation and outcomes in ICU
 * - Malbrain ML, et al. Intensive Care Med. 2014 - Fluid overload in critically ill
 */

// ============================================================
// IMPORTS
// ============================================================
// Vue core
import { ref, computed } from 'vue';

// ============================================================
// PROPS & EMITS
// ============================================================
/**
 * Component props definition (bilingual-ready)
 */
interface Props {
  /** Calculate button text (IT: "Calcola Bilancio", EN: "Calculate Balance") */
  calculateButtonText?: string;
  /** Reset button text (IT: "Reset Dati", EN: "Reset Data") */
  resetButtonText?: string;
  /** Component title (IT: "Bilancio Idrico 24h", EN: "24h Fluid Balance") */
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  calculateButtonText: 'Calcola Bilancio',
  resetButtonText: 'Reset Dati',
  title: 'Bilancio Idrico 24h',
});

/**
 * Component events definition
 */
interface Emits {
  /** Emitted when calculation is performed */
  (event: 'calculated', payload: { balance: number; status: string }): void;
}

const emit = defineEmits<Emits>();

// ============================================================
// TYPES & INTERFACES
// ============================================================

/**
 * Fluid Balance - Form data interface
 */
interface FluidBalanceData {
  /** Fluid intake sources */
  intake: {
    /** Oral liquids (mL) */
    oral: number;
    /** Water from food (mL) */
    food: number;
    /** IV infusions (mL) */
    iv: number;
  };
  /** Fluid output sources */
  output: {
    /** Urine output (mL) */
    urine: number;
    /** Stool output (mL) */
    stool: number;
    /** Insensible losses - respiration + skin (mL) */
    insensible: number;
  };
}

// ============================================================
// STATE
// ============================================================
const initialFormData: FluidBalanceData = {
  intake: {
    oral: 0,
    food: 0,
    iv: 0,
  },
  output: {
    urine: 0,
    stool: 0,
    insensible: 600, // Default estimate for insensible losses
  },
};

const formData = ref<FluidBalanceData>({ ...initialFormData });

const resetForm = () => {
  formData.value = { ...initialFormData };
};

// ============================================================
// COMPUTED
// ============================================================
/**
 * Calculate total fluid intake (24h)
 */
const totalIntake = computed(() => {
  return formData.value.intake.oral + formData.value.intake.food + formData.value.intake.iv;
});

/**
 * Calculate total fluid output (24h)
 */
const totalOutput = computed(() => {
  return (
    formData.value.output.urine + formData.value.output.stool + formData.value.output.insensible
  );
});

/**
 * Calculate net fluid balance (24h)
 * Positive = Fluid overload, Negative = Depletion
 */
const fluidBalance = computed(() => {
  return totalIntake.value - totalOutput.value;
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Calculate fluid balance (automatic via computed properties)
 */
const calculateFluidBalance = () => {
  // Calculation is automatic via computed properties
  // Emit event for parent component
  emit('calculated', {
    balance: fluidBalance.value,
    status: getFluidBalanceStatus(fluidBalance.value),
  });
};

/**
 * Get color for fluid balance status
 */
const getFluidBalanceColor = (balance: number): string => {
  if (Math.abs(balance) <= 500) return 'green'; // Euvolemic
  if (balance > 500 && balance <= 1000) return 'light-blue'; // Mild overload
  if (balance > 1000) return 'red'; // Significant overload
  if (balance < -500 && balance >= -1000) return 'orange'; // Mild depletion
  return 'deep-orange'; // Significant depletion
};

/**
 * Get fluid balance status interpretation
 */
const getFluidBalanceStatus = (balance: number): string => {
  if (Math.abs(balance) <= 500) return 'Euvolemico (Bilancio Neutro)';
  if (balance > 500 && balance <= 1000) return 'Lieve Sovraccarico Volemico';
  if (balance > 1000) return 'Sovraccarico Volemico Significativo';
  if (balance < -500 && balance >= -1000) return 'Lieve Deplezione Volemico-Idrica';
  return 'Deplezione Volemico-Idrica Significativa';
};

/**
 * Get clinical notes for fluid balance value
 */
const getFluidBalanceClinicalNotes = (balance: number): string => {
  if (Math.abs(balance) <= 500) {
    return 'Bilancio idrico ottimale. Stato euvolemico mantenuto. Continuare monitoraggio giornaliero.';
  } else if (balance > 500 && balance <= 1000) {
    return 'Lieve bilancio positivo. Monitorare segni di sovraccarico (edema, dispnea). Considerare restrizione fluidi se CKD/scompenso.';
  } else if (balance > 1000) {
    return 'Sovraccarico volemico. RISCHIO EDEMA POLMONARE. Restrizione fluidi <1000 mL/die + diuretici (furosemide 40-80 mg IV). Peso giornaliero. Target perdita 0.5-1 kg/die.';
  } else if (balance < -500 && balance >= -1000) {
    return 'Lieve deplezione. Valutare cause (diuretici, febbre, vomito, diarrea). Reintegro fluidi orali/IV se persistente.';
  } else {
    return 'Deplezione significativa. RISCHIO AKI PRE-RENALE. Reintegro urgente fluidi IV (cristalloidi 500-1000 mL/h fino a euvolemia). Monitorare diuresi, pressione arteriosa, elettroliti.';
  }
};
</script>

<template>
  <!-- ======================================================== -->
  <!-- FLUID BALANCE CALCULATOR COMPONENT                       -->
  <!-- ======================================================== -->

  <div class="fluid-balance-calculator">
    <div class="row q-gutter-lg">
      <!-- ===================================================== -->
      <!-- INPUT PANEL                                           -->
      <!-- ===================================================== -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">💧 Bilancio Idrico (24h)</h6>

            <!-- ENTRATE (INPUTS) -->
            <div class="q-mb-lg">
              <div class="text-subtitle2 text-weight-bold text-green q-mb-sm">
                ➕ ENTRATE (Inputs)
              </div>

              <q-input
                v-model.number="formData.intake.oral"
                type="number"
                step="10"
                label="Liquidi Orali (bevande)"
                suffix="mL"
                outlined
                class="q-mb-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="local_drink" color="blue" size="sm" />
                </template>
              </q-input>

              <q-input
                v-model.number="formData.intake.food"
                type="number"
                step="10"
                label="Acqua da Cibo"
                suffix="mL"
                outlined
                class="q-mb-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="restaurant" color="orange" size="sm" />
                </template>
              </q-input>

              <q-input
                v-model.number="formData.intake.iv"
                type="number"
                step="10"
                label="Infusioni IV"
                suffix="mL"
                outlined
                class="q-mb-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="medical_services" color="red" size="sm" />
                </template>
              </q-input>

              <q-separator class="q-my-sm" />

              <div class="text-body2 text-weight-bold text-green">
                Totale Entrate: {{ totalIntake.toFixed(0) }} mL
              </div>
            </div>

            <!-- USCITE (OUTPUTS) -->
            <div class="q-mb-lg">
              <div class="text-subtitle2 text-weight-bold text-red q-mb-sm">
                ➖ USCITE (Outputs)
              </div>

              <q-input
                v-model.number="formData.output.urine"
                type="number"
                step="10"
                label="Diuresi"
                suffix="mL"
                outlined
                class="q-mb-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="water_drop" color="cyan" size="sm" />
                </template>
              </q-input>

              <q-input
                v-model.number="formData.output.stool"
                type="number"
                step="10"
                label="Feci"
                suffix="mL"
                outlined
                class="q-mb-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="masks" color="brown" size="sm" />
                </template>
              </q-input>

              <q-input
                v-model.number="formData.output.insensible"
                type="number"
                step="50"
                label="Perspiratio Insensibilis (stima 500-800 mL)"
                suffix="mL"
                outlined
                class="q-mb-sm"
                hint="Perdite respiratorie + cutanee"
              >
                <template v-slot:prepend>
                  <q-icon name="air" color="grey" size="sm" />
                </template>
              </q-input>

              <q-separator class="q-my-sm" />

              <div class="text-body2 text-weight-bold text-red">
                Totale Uscite: {{ totalOutput.toFixed(0) }} mL
              </div>
            </div>

            <!-- Bottone Calcola -->
            <q-btn
              @click="calculateFluidBalance"
              color="primary"
              size="lg"
              class="full-width q-mb-sm"
              icon="calculate"
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
            <h6 class="text-h6 q-ma-none q-mb-md">📊 Risultati Bilancio</h6>

            <!-- Risultato Principale -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 q-mb-sm" :class="fluidBalance >= 0 ? 'text-red' : 'text-orange'">
                {{ fluidBalance > 0 ? '+' : '' }}{{ fluidBalance.toFixed(0) }}
              </div>
              <div class="text-subtitle1 text-grey-7"><strong>mL</strong> (Bilancio Netto 24h)</div>
              <div class="text-caption text-grey-6">Entrate - Uscite</div>
            </div>

            <q-separator class="q-mb-md" />

            <!-- Interpretazione -->
            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">💧 Stato Volemico:</div>
              <q-chip
                :color="getFluidBalanceColor(fluidBalance)"
                text-color="white"
                class="text-weight-bold"
                size="lg"
              >
                {{ getFluidBalanceStatus(fluidBalance) }}
              </q-chip>
              <div class="text-body2 q-mt-sm text-grey-8">
                {{ getFluidBalanceClinicalNotes(fluidBalance) }}
              </div>
            </div>

            <!-- Balance Bar Visualization -->
            <div class="q-mb-lg">
              <div class="text-subtitle2 q-mb-sm">📊 Visualizzazione Bilancio:</div>
              <div class="balance-bar-container">
                <div class="balance-bar">
                  <div
                    class="balance-indicator"
                    :style="{
                      width: Math.abs((fluidBalance / 3000) * 50) + '%',
                      left: fluidBalance >= 0 ? '50%' : 'auto',
                      right: fluidBalance < 0 ? '50%' : 'auto',
                      backgroundColor: fluidBalance >= 0 ? 'var(--q-negative)' : 'var(--q-warning)',
                    }"
                  ></div>
                  <div class="balance-center"></div>
                </div>
                <div class="balance-labels row justify-between q-mt-xs">
                  <span class="text-caption text-orange">-3000</span>
                  <span class="text-caption text-green">0</span>
                  <span class="text-caption text-red">+3000</span>
                </div>
              </div>
            </div>

            <!-- ================================================= -->
            <!-- NEWS-STYLE DOCUMENTATION (9 SECTIONS)             -->
            <!-- ================================================= -->

            <!-- Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              label="Definizione e Significato Clinico"
              class="q-mt-sm"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 q-mb-sm">
                  <strong>Definizione:</strong> Il bilancio idrico rappresenta la differenza tra
                  entrate (intake) e uscite (output) di fluidi nelle 24 ore. È fondamentale per
                  valutare lo stato volemico del paziente.
                </p>
                <p class="text-body2 q-mb-sm"><strong>Interpretazione:</strong></p>
                <ul class="text-body2 q-mb-sm">
                  <li>
                    <strong>Bilancio Positivo (+):</strong> Entrate > Uscite → Sovraccarico
                    volemico, edema, rischio insufficienza cardiaca/edema polmonare
                  </li>
                  <li>
                    <strong>Bilancio Negativo (-):</strong> Entrate &lt; Uscite → Deplezione
                    volemica, disidratazione, rischio AKI pre-renale
                  </li>
                  <li><strong>Bilancio Neutro (±500 mL):</strong> Euvolemia - stato ottimale</li>
                </ul>
                <q-banner class="bg-blue-2 text-blue-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="info" color="blue" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Nota Clinica:</strong> Il bilancio idrico è critico in ICU, CKD,
                    scompenso cardiaco, sepsi, post-operatorio. Monitoraggio giornaliero
                    obbligatorio.
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Fisiologia del Bilancio Idrico -->
            <q-expansion-item
              icon="biotech"
              label="Fisiologia del Bilancio Idrico"
              class="q-mt-sm"
              header-class="bg-green-1 text-green-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Distribuzione Acqua Corporea:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>Totale Acqua Corporea:</strong> ~60% peso corporeo uomo, ~50% donna
                    (↓grasso ha meno acqua)
                  </li>
                  <li><strong>Liquido Intracellulare (ICF):</strong> ~40% peso corporeo</li>
                  <li>
                    <strong>Liquido Extracellulare (ECF):</strong> ~20% peso corporeo (plasma 5% +
                    interstizio 15%)
                  </li>
                </ul>
                <p class="text-body2 text-weight-bold q-mb-sm">Regolazione Bilancio:</p>
                <ul class="text-body2">
                  <li>
                    <strong>ADH (Ormone Antidiuretico):</strong> ↑riassorbimento acqua tubulo
                    collettore (ritenzione acqua)
                  </li>
                  <li>
                    <strong>Sistema Renina-Angiotensina-Aldosterone:</strong> ↑riassorbimento Na⁺ +
                    acqua (espansione volume)
                  </li>
                  <li>
                    <strong>Peptide Natriuretico (ANP/BNP):</strong> ↑escrezione Na⁺ + acqua
                    (riduzione sovraccarico)
                  </li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- Come si Misura -->
            <q-expansion-item
              icon="speed"
              label="Come si Misura"
              class="q-mt-sm"
              header-class="bg-amber-1 text-amber-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Entrate (Inputs):</p>
                <ul class="text-body2 q-mb-md">
                  <li><strong>Liquidi Orali:</strong> Acqua, succhi, tè, caffè, latte</li>
                  <li><strong>Acqua da Cibo:</strong> ~700-1000 mL/die (frutta, verdura, zuppe)</li>
                  <li>
                    <strong>Infusioni IV:</strong> Cristalloidi, colloidi, nutrizione parenterale
                  </li>
                  <li>
                    <strong>Acqua Metabolica:</strong> ~300 mL/die (ossidazione carboidrati/grassi)
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Uscite (Outputs):</p>
                <ul class="text-body2">
                  <li>
                    <strong>Diuresi:</strong> ~1500-2000 mL/die (catetere vescicale per accuratezza)
                  </li>
                  <li><strong>Feci:</strong> ~100-200 mL/die (↑↑ in diarrea fino a 5000 mL/die)</li>
                  <li>
                    <strong>Perspiratio Insensibilis:</strong> ~500-800 mL/die (↑febbre +10%/°C,
                    ↑tachipnea, ↑sudorazione)
                  </li>
                  <li>
                    <strong>Perdite Anomale:</strong> Vomito, sondino nasogastrico, drenaggi
                    chirurgici, ustioni
                  </li>
                </ul>
                <q-banner class="bg-amber-2 text-amber-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="tips_and_updates" color="amber" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Best Practice:</strong> Usare catetere vescicale per diuresi accurata in
                    ICU. Pesare pannolini per pazienti incontinenti. Aggiornare bilancio ogni 8-12h.
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Formula di Calcolo -->
            <q-expansion-item
              icon="functions"
              label="Formula di Calcolo"
              class="q-mt-sm"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Formula Bilancio Idrico:</p>
                <p class="text-body2 q-mb-md">
                  <strong
                    >Bilancio (mL) = Σ Entrate (Orali + Cibo + IV) - Σ Uscite (Diuresi + Feci +
                    Insensibili)</strong
                  >
                </p>

                <p class="text-body2 text-weight-bold q-mb-sm">Stima Perdite Insensibili:</p>
                <ul class="text-body2 q-mb-md">
                  <li><strong>Baseline:</strong> 10-15 mL/kg/die (~600-800 mL/70 kg)</li>
                  <li><strong>Febbre:</strong> +10% per ogni °C >37°C</li>
                  <li><strong>Tachipnea:</strong> +50-100 mL per ogni 10 atti/min >20</li>
                  <li><strong>Ustioni:</strong> Formula di Parkland (4 mL/kg/%BSA nelle 24h)</li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Esempio Calcolo ICU:</p>
                <div class="bg-grey-2 q-pa-md rounded-borders text-body2">
                  <p>
                    <strong>Entrate:</strong> IV 2000 mL + Orali 500 mL = 2500 mL<br />
                    <strong>Uscite:</strong> Diuresi 1800 mL + Feci 200 mL + Insensibili 700 mL =
                    2700 mL<br />
                    <strong>Bilancio:</strong> 2500 - 2700 =
                    <strong class="text-orange">-200 mL</strong> (lieve deplezione)
                  </p>
                </div>
              </q-card>
            </q-expansion-item>

            <!-- Interpretazione Risultati -->
            <q-expansion-item
              icon="psychology"
              label="Interpretazione Risultati"
              class="q-mt-sm"
              header-class="bg-orange-1 text-orange-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Classificazione:</p>
                <ul class="text-body2 q-mb-md">
                  <li><strong class="text-green">±500 mL:</strong> Euvolemico - Ottimale</li>
                  <li>
                    <strong class="text-light-blue">+500 a +1000 mL:</strong> Lieve sovraccarico -
                    Monitorare
                  </li>
                  <li>
                    <strong class="text-red">&gt;+1000 mL:</strong> Sovraccarico significativo -
                    Intervento urgente
                  </li>
                  <li>
                    <strong class="text-orange">-500 a -1000 mL:</strong> Lieve deplezione -
                    Reintegro
                  </li>
                  <li>
                    <strong class="text-deep-orange">&lt;-1000 mL:</strong> Deplezione severa -
                    Rischio AKI
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Azioni Cliniche:</p>
                <ul class="text-body2">
                  <li>
                    <strong>Sovraccarico:</strong> Restrizione fluidi (&lt;1000 mL/die) + Furosemide
                    40-80 mg IV + Peso giornaliero
                  </li>
                  <li>
                    <strong>Deplezione:</strong> Reintegro cristalloidi 500-1000 mL/h + Monitorare
                    PA, diuresi
                  </li>
                  <li>
                    <strong>Euvolemia:</strong> Mantenere bilancio neutro, continuare monitoraggio
                  </li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- Applicazioni Cliniche -->
            <q-expansion-item
              icon="local_hospital"
              label="Applicazioni Cliniche"
              class="q-mt-sm"
              header-class="bg-purple-1 text-purple-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Indicazioni Monitoraggio:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>ICU/UTI:</strong> Sepsi, shock settico, ARDS, post-operatorio maggiore
                  </li>
                  <li><strong>Cardiologia:</strong> Scompenso cardiaco acuto, edema polmonare</li>
                  <li><strong>Nefrologia:</strong> AKI, CKD stadio 4-5, dialisi</li>
                  <li><strong>Chirurgia:</strong> Post-laparotomia, ustioni, trapianti</li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Target Bilancio per Patologia:</p>
                <ul class="text-body2">
                  <li><strong>Sepsi (prime 6h):</strong> +2000-3000 mL (resuscitation fluidi)</li>
                  <li>
                    <strong>Sepsi (dopo 24h):</strong> Bilancio neutro/negativo (de-resuscitation)
                  </li>
                  <li>
                    <strong>Scompenso Cardiaco:</strong> -500 a -1000 mL/die (diuresi forzata)
                  </li>
                  <li><strong>CKD/Dialisi:</strong> Bilancio neutro (evitare overload)</li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- Valori Critici e Alert -->
            <q-expansion-item
              icon="warning"
              label="Valori Critici e Alert"
              class="q-mt-sm"
              header-class="bg-red-1 text-red-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Valori Critici:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong class="text-red">&gt;+2000 mL/24h:</strong> Sovraccarico severo -
                    Rischio edema polmonare acuto
                  </li>
                  <li>
                    <strong class="text-red">&lt;-1500 mL/24h:</strong> Deplezione severa - Rischio
                    AKI pre-renale
                  </li>
                  <li>
                    <strong class="text-red">Diuresi &lt;0.5 mL/kg/h per >6h:</strong> Oliguria -
                    CRITERIO AKI (KDIGO)
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Segni Clinici Sovraccarico:</p>
                <ul class="text-body2 q-mb-md">
                  <li>Dispnea, tachipnea, ortopnea</li>
                  <li>Edema declive, sacrale, ascite</li>
                  <li>Turgore giugulare, reflusso epato-giugulare</li>
                  <li>Aumento peso corporeo (>2 kg in 24h)</li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Segni Clinici Deplezione:</p>
                <ul class="text-body2">
                  <li>Ipotensione, tachicardia, ipotensione ortostatica</li>
                  <li>Cute secca, mucose asciutte, ↓turgore cutaneo</li>
                  <li>Oliguria (&lt;400 mL/24h)</li>
                  <li>↑creatinina, ↑urea (AKI pre-renale)</li>
                </ul>

                <q-banner class="bg-red-2 text-red-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="emergency" color="red" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>ALERT CLINICO:</strong> Bilancio >+3000 mL con dispnea/crepitii → EDEMA
                    POLMONARE. Ossigeno, Furosemide 80-120 mg IV, Nitroglicerina, posizione seduta,
                    considerare CPAP/BiPAP.
                  </div>
                </q-banner>
              </q-card>
            </q-expansion-item>

            <!-- Documentazione Clinica -->
            <q-expansion-item
              icon="menu_book"
              label="Documentazione Clinica"
              class="q-mt-sm"
              header-class="bg-indigo-1 text-indigo-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Template Bilancio Idrico 24h:</p>
                <div class="bg-grey-2 q-pa-md rounded-borders text-body2 q-mb-md">
                  <p>
                    <strong>DATA:</strong> [gg/mm/aaaa]<br />
                    <strong>ENTRATE:</strong><br />
                    - Orali: [X] mL<br />
                    - Cibo: [Y] mL<br />
                    - IV: [Z] mL<br />
                    <strong>Totale Entrate:</strong> [TOT] mL<br /><br />
                    <strong>USCITE:</strong><br />
                    - Diuresi: [A] mL<br />
                    - Feci: [B] mL<br />
                    - Insensibili: [C] mL<br />
                    <strong>Totale Uscite:</strong> [TOT] mL<br /><br />
                    <strong>BILANCIO NETTO:</strong> [+/-XXX] mL<br />
                    <strong>STATO VOLEMICO:</strong> [Euvolemico/Sovraccarico/Deplezione]<br />
                    <strong>PESO:</strong> [XX.X] kg (Δ peso: [+/-X.X] kg)<br />
                    <strong>AZIONE:</strong> [Mantenere/Restrizione fluidi/Reintegro]
                  </p>
                </div>

                <p class="text-body2 text-weight-bold q-mb-sm">Frequenza Aggiornamenti:</p>
                <ul class="text-body2">
                  <li><strong>ICU:</strong> Ogni 8h (turni infermieristici)</li>
                  <li><strong>Ward:</strong> Ogni 24h</li>
                  <li><strong>Instabilità:</strong> Ogni 1-2h (sepsi, edema polmonare)</li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- Riferimenti Scientifici -->
            <q-expansion-item
              icon="science"
              label="Riferimenti Scientifici"
              class="q-mt-sm"
              header-class="bg-teal-1 text-teal-9"
            >
              <q-card class="q-pa-md">
                <p class="text-body2 text-weight-bold q-mb-sm">Pubblicazioni Chiave:</p>
                <ul class="text-body2 q-mb-md">
                  <li>
                    <strong>Bouchard J, et al.</strong> (2009). Fluid accumulation, survival and
                    recovery of kidney function in critically ill patients with acute kidney injury.
                    <em>Kidney Int</em> 76(4):422-427
                  </li>
                  <li>
                    <strong>Malbrain ML, et al.</strong> (2014). Fluid overload, de-resuscitation,
                    and outcomes in critically ill or injured patients: a systematic review.
                    <em>Crit Care Med</em> 42(8):1835-1854
                  </li>
                  <li>
                    <strong>Marik PE, et al.</strong> (2017). Fluid administration in severe sepsis
                    and septic shock, patterns and outcomes: an analysis of a large national
                    database. <em>Intensive Care Med</em> 43(5):625-632
                  </li>
                </ul>

                <p class="text-body2 text-weight-bold q-mb-sm">Linee Guida:</p>
                <ul class="text-body2">
                  <li>
                    <strong>Surviving Sepsis Campaign 2021:</strong> Early goal-directed fluid
                    resuscitation
                  </li>
                  <li>
                    <strong>KDIGO AKI Guidelines:</strong> Fluid management in acute kidney injury
                  </li>
                  <li>
                    <strong>ESC Heart Failure Guidelines:</strong> Diuretic therapy and fluid
                    management
                  </li>
                </ul>

                <q-banner class="bg-teal-2 text-teal-9 q-mt-md" rounded>
                  <template v-slot:avatar>
                    <q-icon name="link" color="teal" size="sm" />
                  </template>
                  <div class="text-caption">
                    <strong>Risorse Online:</strong>
                    <a
                      href="https://www.sccm.org/SurvivingSepsisCampaign"
                      target="_blank"
                      class="text-teal-9"
                      >Surviving Sepsis Campaign</a
                    >
                    |
                    <a
                      href="https://kdigo.org/guidelines/acute-kidney-injury/"
                      target="_blank"
                      class="text-teal-9"
                      >KDIGO AKI</a
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

.fluid-balance-calculator {
  width: 100%;
}

/* Balance Bar Visualization */
.balance-bar-container {
  width: 100%;
}

.balance-bar {
  position: relative;
  height: 30px;
  background: linear-gradient(to right, #ff9800 0%, #ff9800 50%, #f44336 50%, #f44336 100%);
  border-radius: 15px;
  overflow: hidden;
}

.balance-indicator {
  position: absolute;
  top: 0;
  height: 100%;
  transition:
    width 0.3s ease,
    left 0.3s ease,
    right 0.3s ease;
  opacity: 0.8;
}

.balance-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background-color: #4caf50;
  z-index: 2;
}

.balance-labels {
  font-size: 11px;
  color: #666;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .fluid-balance-calculator .row {
    flex-direction: column;
  }

  .balance-bar {
    height: 25px;
  }
}
</style>
