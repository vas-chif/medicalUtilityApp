<!-- QuozienteRespiratorioCalculator.vue -->

<script setup lang="ts">
/**
 * @file QuozienteRespiratorioCalculator.vue
 * @description Componente calcolatore Quoziente Respiratorio (RQ = VCO₂/VO₂)
 * @author Vasile Chifeac
 * @created 2025-01-06
 * @modified 2025-11-06
 *
 * @description Respiratory Quotient Calculator - Indicatore metabolico del tipo di substrato energetico utilizzato
 */

import { ref, computed } from 'vue';
import { useResetForm } from 'src/composables/useResetForm';

// ============================================================
// TYPES & INTERFACES
// ============================================================
interface QRFormData {
  PvCO2: number | null;
  PaCO2: number | null;
  HB: number | null;
  SaO2: number | null;
  SvO2: number | null;
  PaO2: number | null;
  PvO2: number | null;
}

// ============================================================
// CONSTANTS
// ============================================================
const MEDICAL_CONSTANTS = {
  HB_O2_BINDING: 1.36, // ml O₂/g Hb - Hüfner constant
  O2_SOLUBILITY: 0.003, // ml O₂/mmHg/dL
} as const;

const RQ_THRESHOLDS = {
  FAT_OXIDATION: 0.7,
  MIXED_DIET_MIN: 0.8,
  MIXED_DIET_MAX: 0.85,
  CARB_OXIDATION: 1.0,
  ANAEROBIC_THRESHOLD: 1.0,
  SHOCK_THRESHOLD: 1.2,
} as const;

// ============================================================
// STATE
// ============================================================
const initialFormData: QRFormData = {
  PvCO2: null,
  PaCO2: null,
  HB: null,
  SaO2: null,
  SvO2: null,
  PaO2: null,
  PvO2: null,
};

const formData = ref<QRFormData>({ ...initialFormData });
const result = ref<number>(0);

const { resetForm } = useResetForm(formData, result, initialFormData);

// ============================================================
// COMPUTED
// ============================================================
const isFormValid = computed(() => {
  return (
    Object.values(formData.value).every((val) => val !== null && val > 0) &&
    formData.value.SaO2! <= 100 &&
    formData.value.SvO2! <= 100
  );
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * @function calculateQR
 * @description Calcola il Quoziente Respiratorio (RQ = VCO₂ / VO₂)
 * @returns {void}
 */
const calculateQR = (): void => {
  if (!isFormValid.value) return;

  const { PvCO2, PaCO2, HB, SaO2, SvO2, PaO2, PvO2 } = formData.value;

  // CO₂ production
  const vco2 = PvCO2! - PaCO2!;

  // O₂ consumption via hemoglobin
  const vo2_hemoglobin = (HB! * MEDICAL_CONSTANTS.HB_O2_BINDING * (SaO2! - SvO2!)) / 100;

  // O₂ consumption via plasma
  const vo2_plasma = (PaO2! - PvO2!) * MEDICAL_CONSTANTS.O2_SOLUBILITY;

  // Total VO₂
  const vo2_total = vo2_hemoglobin + vo2_plasma;

  // RQ = VCO₂ / VO₂
  result.value = vco2 / vo2_total;
};

/**
 * @function getO2Transport
 * @description Calcola il trasporto di O₂ via emoglobina
 * @returns {number} Trasporto O₂ in ml/dL
 */
const getO2Transport = (): number => {
  if (!formData.value.HB || !formData.value.SaO2 || !formData.value.SvO2) return 0;
  return (
    (formData.value.HB *
      MEDICAL_CONSTANTS.HB_O2_BINDING *
      (formData.value.SaO2 - formData.value.SvO2)) /
    100
  );
};

/**
 * @function getPlasmaO2
 * @description Calcola il trasporto di O₂ via plasma
 * @returns {number} Trasporto O₂ in ml/dL
 */
const getPlasmaO2 = (): number => {
  if (!formData.value.PaO2 || !formData.value.PvO2) return 0;
  return (formData.value.PaO2 - formData.value.PvO2) * MEDICAL_CONSTANTS.O2_SOLUBILITY;
};

/**
 * @function getInterpretation
 * @description Restituisce interpretazione clinica del QR
 * @returns {string} Interpretazione testuale
 */
const getInterpretation = (): string => {
  if (result.value === 0) return 'Inserire i parametri';

  if (result.value > RQ_THRESHOLDS.SHOCK_THRESHOLD) {
    return 'Metabolismo Anaerobico Severo';
  }
  if (result.value > RQ_THRESHOLDS.ANAEROBIC_THRESHOLD) {
    return 'Metabolismo Anaerobico / Lipogenesi';
  }
  if (result.value >= 0.95 && result.value <= RQ_THRESHOLDS.CARB_OXIDATION) {
    return 'Metabolismo Glucidico Prevalente';
  }
  if (result.value >= RQ_THRESHOLDS.MIXED_DIET_MIN && result.value < 0.95) {
    return 'Range Normale - Dieta Mista';
  }
  if (result.value >= RQ_THRESHOLDS.FAT_OXIDATION && result.value < RQ_THRESHOLDS.MIXED_DIET_MIN) {
    return 'Metabolismo Lipidico Prevalente';
  }
  if (result.value < RQ_THRESHOLDS.FAT_OXIDATION) {
    return 'Chetosi / Digiuno Prolungato';
  }

  return 'Valore Non Standard';
};

/**
 * @function getInterpretationColor
 * @description Restituisce colore Quasar per interpretazione
 * @returns {string} Nome colore Quasar
 */
const getInterpretationColor = (): string => {
  if (result.value === 0) return 'grey';
  if (result.value > RQ_THRESHOLDS.SHOCK_THRESHOLD) return 'red';
  if (result.value > RQ_THRESHOLDS.ANAEROBIC_THRESHOLD) return 'orange';
  if (result.value >= RQ_THRESHOLDS.MIXED_DIET_MIN && result.value <= RQ_THRESHOLDS.CARB_OXIDATION)
    return 'green';
  if (result.value >= RQ_THRESHOLDS.FAT_OXIDATION) return 'blue';
  return 'purple';
};
</script>

<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="info" color="blue" />
      </template>
      <div class="text-body2">
        <strong>Cosa misura il QR:</strong> Indica il <strong>tipo di substrato energetico</strong>
        utilizzato (carboidrati, grassi, proteine), NON l'efficienza respiratoria.
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="edit" class="q-mr-xs" />
              Parametri Ematochimici
            </div>

            <!-- PvCO2 -->
            <q-input
              v-model.number="formData.PvCO2"
              type="number"
              step="0.1"
              label="PvCO2 (CO2 Venosa)"
              suffix="mmHg"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="bloodtype" color="red" size="sm" />
              </template>
            </q-input>

            <!-- PaCO2 -->
            <q-input
              v-model.number="formData.PaCO2"
              type="number"
              step="0.1"
              label="PaCO2 (CO2 Arteriosa)"
              suffix="mmHg"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="bloodtype" color="blue" size="sm" />
              </template>
            </q-input>

            <!-- HB -->
            <q-input
              v-model.number="formData.HB"
              type="number"
              step="0.1"
              label="HB (Emoglobina)"
              suffix="g/dL"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="science" color="purple" size="sm" />
              </template>
            </q-input>

            <!-- SaO2 -->
            <q-input
              v-model.number="formData.SaO2"
              type="number"
              step="0.1"
              label="SaO2 (Saturazione O2 Arteriosa)"
              suffix="%"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val) => (val >= 0 && val <= 100) || 'Valore 0-100%']"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="green" size="sm" />
              </template>
            </q-input>

            <!-- SvO2 -->
            <q-input
              v-model.number="formData.SvO2"
              type="number"
              step="0.1"
              label="SvO2 (Saturazione O2 Venosa)"
              suffix="%"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val) => (val >= 0 && val <= 100) || 'Valore 0-100%']"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="orange" size="sm" />
              </template>
            </q-input>

            <!-- PaO2 -->
            <q-input
              v-model.number="formData.PaO2"
              type="number"
              step="0.1"
              label="PaO2 (Pressione O2 Arteriosa)"
              suffix="mmHg"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="device_thermostat" color="cyan" size="sm" />
              </template>
            </q-input>

            <!-- PvO2 -->
            <q-input
              v-model.number="formData.PvO2"
              type="number"
              step="0.1"
              label="PvO2 (Pressione O2 Venosa)"
              suffix="mmHg"
              outlined
              dense
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="device_thermostat" color="teal" size="sm" />
              </template>
            </q-input>

            <!-- Bottoni -->
            <q-btn
              @click="calculateQR"
              color="primary"
              size="md"
              class="full-width q-mb-xs"
              icon="calculate"
              :disable="!isFormValid"
            >
              Calcola QR
            </q-btn>

            <q-btn
              @click="resetForm"
              color="negative"
              size="sm"
              class="full-width"
              icon="refresh"
              outline
            >
              Reset
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="analytics" class="q-mr-xs" />
              Risultati
            </div>

            <!-- Risultato -->
            <div class="text-center q-mb-md">
              <div class="text-h4 text-primary">
                {{ result.toFixed(3) }}
              </div>
              <div class="text-caption text-grey-7">Quoziente Respiratorio (RQ)</div>
            </div>

            <!-- Interpretazione -->
            <div class="q-mb-sm">
              <q-chip
                :color="getInterpretationColor()"
                text-color="white"
                class="full-width text-center"
              >
                {{ getInterpretation() }}
              </q-chip>
            </div>

            <!-- Alert critici -->
            <q-banner v-if="result > 1.2" class="bg-red-1 text-red-9 q-mb-xs" rounded dense>
              <template v-slot:avatar>
                <q-icon name="warning" color="red" size="sm" />
              </template>
              <div class="text-caption">
                <strong>ATTENZIONE:</strong> QR &gt; 1.2 → Metabolismo anaerobico. Verificare
                lattato e perfusione.
              </div>
            </q-banner>

            <q-banner
              v-if="result < 0.7 && result > 0"
              class="bg-orange-1 text-orange-9"
              rounded
              dense
            >
              <template v-slot:avatar>
                <q-icon name="info" color="orange" size="sm" />
              </template>
              <div class="text-caption">
                <strong>NOTA:</strong> QR &lt; 0.7 → Utilizzo prevalente grassi/chetoni.
              </div>
            </q-banner>

            <!-- Definizione e Significato Clinico -->
            <q-expansion-item
              icon="school"
              label="Definizione e Significato Clinico"
              dense
              default-opened
              class="q-mt-xs text-primary text-weight-bold"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">
                  Cos'è il Quoziente Respiratorio (QR)?
                </div>
                <div class="text-caption text-grey-8 q-mb-sm">
                  Il QR è il
                  <strong
                    >rapporto tra l'anidride carbonica (CO₂) prodotta e l'ossigeno (O₂)
                    consumato</strong
                  >, spesso calcolato come <strong>VCO₂/VO₂</strong>. Questo valore indica il
                  <strong>tipo di metabolismo energetico</strong> in atto nell'organismo, fornendo
                  informazioni <strong>indirette sul tipo di metabolismo</strong> (aerobico o
                  anaerobico).
                </div>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  📊 Valori Fisiologici Normali:
                </div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>VO₂ (consumo O₂):</strong> ~250 ml/min a riposo
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>VCO₂ (produzione CO₂):</strong> ~200 ml/min a riposo
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>QR normale:</strong> 0.7 - 1.0 in condizioni di aerobiosi
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-xs">
                  🔬 Interpretazione dei Valori:
                </div>
                <div class="row q-gutter-xs">
                  <div class="col-12 bg-green-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">QR = 1.0</div>
                    <div class="text-caption text-grey-8">
                      Metabolismo prevalentemente <strong>glucidico</strong> (carboidrati)
                    </div>
                  </div>
                  <div class="col-12 bg-amber-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">QR = 0.7</div>
                    <div class="text-caption text-grey-8">
                      Metabolismo prevalentemente <strong>lipidico</strong> (grassi)
                    </div>
                  </div>
                  <div class="col-12 bg-blue-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">QR = 0.8</div>
                    <div class="text-caption text-grey-8">
                      Dieta mista - valore <strong>normale a riposo</strong>
                    </div>
                  </div>
                  <div class="col-12 bg-purple-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">QR = 0.85</div>
                    <div class="text-caption text-grey-8">
                      Valore medio in <strong>condizioni standard</strong>
                    </div>
                  </div>
                </div>
              </div>
            </q-expansion-item>

            <!-- Metabolismo Aerobico vs Anaerobico -->
            <q-expansion-item
              icon="biotech"
              label="Metabolismo Aerobico vs Anaerobico"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold text-positive q-mb-sm">
                  ✅ Metabolismo Aerobico (QR: 0.7 - 1.0)
                </div>
                <div class="text-caption text-grey-8 q-mb-sm">
                  In condizioni di <strong>metabolismo aerobico</strong>, l'ossidazione dei
                  nutrienti avviene in presenza di ossigeno e il QR rimane compreso tra 0.7 e 1.0,
                  in funzione del tipo di substrati energetici metabolizzati.
                </div>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold text-negative q-mb-sm">
                  ⚠️ Metabolismo Anaerobico (QR > 1.0)
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  In situazioni di <strong>metabolismo anaerobico</strong>, come in caso di:
                </div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Ipossia tissutale</strong>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Stress metabolico</strong>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Insufficiente apporto di ossigeno</strong>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Shock</strong>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-caption text-grey-8 q-mb-sm">
                  ...la produzione di energia prosegue attivando la
                  <strong>glicolisi anaerobica</strong>, che ha come prodotti finali
                  <strong>lattato</strong> (che ritroviamo in circolo) e <strong>H⁺</strong>. Il
                  tamponamento del lattato genera un <strong>eccesso di CO₂</strong>, che può
                  determinare un <strong>innalzamento del QR oltre 1.0</strong>.
                </div>

                <q-banner class="bg-red-1 text-red-9" dense rounded>
                  <template v-slot:avatar>
                    <q-icon name="warning" color="red" size="xs" />
                  </template>
                  <div class="text-caption">
                    <strong>SHOCK - Monitoraggio in Tempo Reale:</strong><br />
                    La <strong>modificazione del VCO₂/VO₂</strong> segue le variazioni di
                    <strong>ipoperfusione tissutale</strong> in maniera più tempestiva della
                    variazione del lattato. Il QR potrebbe quindi essere l'indicatore che consente
                    di <strong>seguire quasi in tempo reale l'evoluzione dello shock</strong>.
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- Come si Misura il VCO2/VO2 -->
            <q-expansion-item
              icon="science"
              label="Come si Misura il VCO2/VO2"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">Metodi di Misurazione:</div>

                <div class="q-mb-sm">
                  <div class="text-body2 text-weight-bold text-positive">
                    1️⃣ Calorimetria Indiretta (Gold Standard)
                  </div>
                  <div class="text-caption text-grey-8">
                    VCO₂ e VO₂ possono essere misurati in condizioni ideali dalla
                    <strong>calorimetria indiretta</strong>, analizzando i gas respiratori
                    (concentrazioni di O₂ e CO₂ nell'aria inspirata ed espirata). Questo metodo
                    fornisce misurazioni accurate del dispendio energetico basale e totale.
                  </div>
                </div>

                <q-separator class="q-my-sm" />

                <div class="q-mb-sm">
                  <div class="text-body2 text-weight-bold text-primary">
                    2️⃣ Emogasanalisi Arteriosa e Venosa Mista (Metodo Alternativo)
                  </div>
                  <div class="text-caption text-grey-8 q-mb-xs">
                    In alternativa, VCO₂ e VO₂ possono essere
                    <strong>calcolati dall'emogasanalisi arteriosa e venosa mista</strong>. Questo è
                    il metodo utilizzato da questo calcolatore.
                  </div>

                  <div class="bg-blue-1 q-pa-xs q-mb-xs rounded-borders">
                    <div class="text-caption text-weight-bold q-mb-xs">
                      📐 Calcolo del Consumo di Ossigeno (VO₂):
                    </div>
                    <div class="text-caption text-grey-8 q-mb-xs">
                      Il consumo di ossigeno è ricavato come la <strong>differenza</strong> tra la
                      quantità O₂ che il sangue trasporta ai tessuti (sangue
                      <strong>arterioso</strong>) e la quantità di O₂ presente nel sangue che ha
                      abbandonato i tessuti (<strong>sangue venoso misto</strong>
                      da atrio destro o arteria polmonare).
                    </div>
                    <div class="text-caption text-grey-7">
                      <strong>Formula:</strong> VO₂ = (O₂ arterioso) - (O₂ venoso misto)<br />
                      Dove O₂ = (HB × 1.36 × SatO₂/100) + (PO₂ × 0.003)
                    </div>
                  </div>

                  <div class="bg-orange-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold q-mb-xs">
                      📐 Calcolo della Produzione di CO₂ (VCO₂):
                    </div>
                    <div class="text-caption text-grey-8 q-mb-xs">
                      Analogamente, la <strong>produzione di CO₂</strong> è calcolata come
                      differenza tra CO₂ venoso e arterioso, riflettendo metabolismo e perfusione
                      tissutale.
                    </div>
                    <div class="text-caption text-grey-7">
                      <strong>Formula:</strong> VCO₂ = (CO₂ venoso) - (CO₂ arterioso)
                    </div>
                  </div>
                </div>

                <q-banner class="bg-amber-1 text-amber-9" dense rounded>
                  <template v-slot:avatar>
                    <q-icon name="info" color="amber" size="xs" />
                  </template>
                  <div class="text-caption">
                    <strong>Nota:</strong> Questo calcolatore utilizza il metodo dell'emogasanalisi
                    artero-venosa. Per misurazioni precise del dispendio energetico, si raccomanda
                    la calorimetria indiretta.
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- 📊 Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              label="📊 Definizione e Significato Clinico"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <p class="text-caption q-mb-sm">
                  <strong>Definizione Fisiologica:</strong> Il Quoziente Respiratorio (RQ o
                  Respiratory Quotient) è il rapporto molare tra la quantità di CO₂ prodotta (VCO₂)
                  e la quantità di O₂ consumata (VO₂) a livello sistemico:
                  <strong>RQ = VCO₂ / VO₂</strong>. Riflette il tipo di substrato energetico
                  ossidato dall'organismo a livello cellulare (carboidrati, lipidi, proteine) e lo
                  stato metabolico generale.
                </p>
                <p class="text-caption q-mb-sm">
                  <strong>Significato Clinico - Indicatore Metabolico Multiplo:</strong>
                </p>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="battery_charging_full" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>Tipo di Substrato Energetico:</strong> RQ 0.7 = ossidazione lipidi
                        (efficienza energetica), RQ 0.85 = dieta mista, RQ 1.0 = ossidazione
                        carboidrati (consumo O₂ maggiore)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="monitor_heart" color="red" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>Soglia Anaerobica:</strong> RQ &gt;1.0 indica metabolismo anaerobico
                        (produzione lattato, acidosi). Marcatore precoce di insufficienza
                        circolatoria in shock/sepsi (precede ↑lattato)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="restaurant" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>Valutazione Nutrizionale ICU:</strong> Monitoraggio equilibrio
                        nutrizionale in pazienti critici (overfeeding → RQ &gt;1.0 → lipogenesi,
                        accumulo CO₂, difficoltà svezzamento ventilatore)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="fitness_center" color="green" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>Fisiologia Esercizio:</strong> Shift metabolico da lipidi (riposo,
                        esercizio leggero) a carboidrati (esercizio intenso). RQ crossover point
                        ~60% VO₂max
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="science" color="purple" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>Calcolo Dispendio Energetico:</strong> Calorimetria indiretta
                        utilizza VO₂ + RQ per calcolare REE (Resting Energy Expenditure) con
                        equazione Weir: REE = [3.9(VO₂) + 1.1(VCO₂)] × 1.44
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-banner class="bg-blue-1 text-blue-9" dense rounded>
                  <template v-slot:avatar>
                    <q-icon name="info" color="blue" size="xs" />
                  </template>
                  <div class="text-caption">
                    <strong>Nota Pratica:</strong> Il RQ misurato rappresenta il rapporto sistemico
                    (polmonare), non il rapporto tissutale (RER - Respiratory Exchange Ratio). In
                    condizioni steady-state (riposo, esercizio submassimale), RQ ≈ RER. In
                    condizioni non-steady-state (esercizio massimale, iperventilazione, acidosi), RQ
                    può essere &gt;1.0 anche senza anaerobiosi (compenso respiratorio acidosi).
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- 🔬 Fisiologia del Metabolismo Aerobico vs Anaerobico -->
            <q-expansion-item
              icon="biotech"
              label="🔬 Fisiologia: Metabolismo Aerobico vs Anaerobico"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <p class="text-caption text-weight-bold q-mb-xs">
                  Ossidazione Substrati Energetici - Stechiometria:
                </p>
                <div class="q-mb-sm">
                  <p class="text-caption">
                    <strong>1. Ossidazione Carboidrati (Glucosio):</strong>
                  </p>
                  <div class="bg-blue-1 q-pa-xs rounded-borders q-mb-xs">
                    <p class="text-caption text-center">
                      C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + 686 kcal
                    </p>
                    <p class="text-caption text-center text-weight-bold">RQ = 6 CO₂ / 6 O₂ = 1.0</p>
                  </div>
                  <q-list dense class="q-pl-md">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          • Consumo O₂: 1 mole O₂ per 1 mole CO₂ prodotta<br />
                          • Resa energetica: 5.05 kcal/L O₂ (massima efficienza)<br />
                          • Situazioni: Post-prandiale carboidrati, esercizio alta intensità
                          (glicogenolisi), nutrizione parenterale glucosio elevato
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="q-mb-sm">
                  <p class="text-caption">
                    <strong>2. Ossidazione Lipidi (Acido Palmitico C₁₆):</strong>
                  </p>
                  <div class="bg-orange-1 q-pa-xs rounded-borders q-mb-xs">
                    <p class="text-caption text-center">
                      C₁₆H₃₂O₂ + 23 O₂ → 16 CO₂ + 16 H₂O + 2340 kcal
                    </p>
                    <p class="text-caption text-center text-weight-bold">
                      RQ = 16 CO₂ / 23 O₂ = 0.7
                    </p>
                  </div>
                  <q-list dense class="q-pl-md">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          • Consumo O₂: 1.44 moli O₂ per 1 mole CO₂ (↑O₂ richiesto per ossidare
                          H)<br />
                          • Resa energetica: 4.69 kcal/L O₂ (minor efficienza ma ↑densità
                          calorica)<br />
                          • Situazioni: Digiuno, esercizio leggero-moderato (&lt;60% VO₂max),
                          adattamento chetogenico, nutrizione lipidica
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="q-mb-sm">
                  <p class="text-caption">
                    <strong>3. Ossidazione Proteine (Leucina esempio):</strong>
                  </p>
                  <div class="bg-purple-1 q-pa-xs rounded-borders q-mb-xs">
                    <p class="text-caption text-center text-weight-bold">RQ = ~0.8</p>
                  </div>
                  <q-list dense class="q-pl-md">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          • Contributo metabolico: ~10-15% REE in dieta normale<br />
                          • Situazioni: Catabolismo (trauma, sepsi, digiuno prolungato), nutrizione
                          iperproteica
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <p class="text-caption text-weight-bold q-mb-xs q-mt-sm">
                  Metabolismo Anaerobico - Glicolisi Anaerobica:
                </p>
                <div class="bg-red-1 q-pa-xs rounded-borders q-mb-xs">
                  <p class="text-caption text-center">
                    C₆H₁₂O₆ → 2 Lattato + 2 H⁺ (netta produzione CO₂ da buffering HCO₃⁻)
                  </p>
                  <p class="text-caption text-center text-weight-bold">RQ &gt; 1.0</p>
                </div>
                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>Meccanismo RQ elevato:</strong> Lattato + acidosi → buffering con
                        HCO₃⁻ → produzione CO₂ non ossidativo (H⁺ + HCO₃⁻ → H₂O + CO₂ ↑). VCO₂
                        include sia CO₂ metabolico che CO₂ da buffering → RQ sovrastimato
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>Condizioni cliniche RQ &gt;1.0:</strong> Shock settico/cardiogeno
                        (ipoperfusione tissutale), esercizio massimale (&gt;85% VO₂max),
                        insufficienza respiratoria (ipossia tissutale), overfeeding (lipogenesi de
                        novo: glucosio → lipidi, RQ ~8.0 teorico)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-banner class="bg-orange-1 text-orange-9 q-mt-sm" dense rounded>
                  <template v-slot:avatar>
                    <q-icon name="warning" color="orange" size="xs" />
                  </template>
                  <div class="text-caption">
                    <strong>Implicazione Clinica:</strong> In shock, RQ &gt;1.0 può precedere
                    ↑lattato (sensibilità diagnostica precoce). In ICU, RQ &gt;1.0 persistente con
                    nutrizione adeguata suggerisce overfeeding → ridurre apporto glucidico (target
                    RQ 0.85-0.95). In ventilazione meccanica, RQ &gt;1.0 → ↑VCO₂ → difficoltà
                    svezzamento (↑drive respiratorio).
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- 📏 Come si Misura il RQ -->
            <q-expansion-item
              icon="speed"
              label="📏 Come si Misura il Quoziente Respiratorio"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <p class="text-caption text-weight-bold q-mb-xs">Metodi di Misurazione Diretta:</p>
                <div class="q-mb-sm">
                  <p class="text-caption">
                    <strong>1. Calorimetria Indiretta (Gold Standard):</strong>
                  </p>
                  <q-list dense class="q-pl-md">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>Principio:</strong> Misura continua gas respiratori inspiratori ed
                          espiratori con sistema metabolic cart. Calcolo VO₂ = (FiO₂ × VE_insp) -
                          (FeO₂ × VE_exp), VCO₂ = (FeCO₂ × VE_exp) - (FiCO₂ × VE_insp)
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>Equipaggiamento:</strong> Analizzatori O₂ (paramagnetico o fuel
                          cell), analizzatore CO₂ (infrarosso), pneumotacografo (misura flusso),
                          canopy/maschera (raccolto aria espirata)
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>Condizioni Ottimali:</strong> Paziente a riposo (30 min), digiuno
                          ≥4h, temperatura neutra, no fumo 2h prima, no esercizio 12h prima,
                          steady-state (VO₂/VCO₂ stabili ±10% per 5 min)
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>Applicazioni:</strong> Calcolo REE (equazione Weir), prescrizione
                          nutrizionale ICU, valutazione performance atleti, diagnosi disordini
                          metabolici
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="q-mb-sm">
                  <p class="text-caption">
                    <strong>2. Stima da Emogasanalisi Artero-Venosa (Metodo Utilizzato):</strong>
                  </p>
                  <q-list dense class="q-pl-md">
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>Campionamento:</strong> Prelievo arterioso (a. radiale/femorale) +
                          venoso centrale (catetere venoso centrale in atrio destro/vena cava
                          superiore)
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>Parametri Misurati:</strong> PaCO₂, PvCO₂ (pressioni parziali
                          CO₂), PaO₂, PvO₂ (pressioni parziali O₂), SaO₂, SvO₂ (saturazioni O₂), Hb
                          (emoglobina)
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>Calcolo VCO₂:</strong> Differenza artero-venosa PCO₂ (PvCO₂ -
                          PaCO₂). Normale ~5-6 mmHg
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>Calcolo VO₂:</strong> Contenuto O₂ arterioso - venoso. CaO₂ = (Hb
                          × 1.36 × SaO₂/100) + (PaO₂ × 0.003), CvO₂ = (Hb × 1.36 × SvO₂/100) + (PvO₂
                          × 0.003). Differenza artero-venosa O₂ normale 4-5 mL/dL
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>
                          <strong>Limitazioni:</strong> Stima approssimativa (non misura diretta
                          flussi), richiede condizioni steady-state, influenzato da gittata
                          cardiaca, shunt, spazio morto. Accuratezza ±15-20% vs calorimetria
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <q-banner class="bg-cyan-1 text-cyan-9" dense rounded>
                  <template v-slot:avatar>
                    <q-icon name="science" color="cyan" size="xs" />
                  </template>
                  <div class="text-caption">
                    <strong>Raccomandazione Clinica:</strong> Per valutazione nutrizionale accurata
                    in ICU, preferire calorimetria indiretta (misura VO₂, VCO₂, REE diretti). Stima
                    da emogasanalisi utile come screening rapido o quando calorimetria non
                    disponibile, ma validare con trend clinici (bilancio azotato, peso, albumina).
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- Formula Utilizzata -->
            <q-expansion-item icon="functions" label="🧮 Formula Utilizzata" dense class="q-mt-xs">
              <div class="bg-grey-1 q-pa-sm">
                <div class="bg-primary text-white q-pa-sm q-mb-sm">
                  <div class="text-body2 text-center">
                    QR = (PvCO2 - PaCO2) / [(HB × 1.36 × (SaO2 - SvO2)) / 100 + (PaO2 - PvO2) ×
                    0.003]
                  </div>
                </div>

                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Dove:</strong>
                </div>
                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="blue" text-color="white" dense>1.36</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Costante di Hüfner - capacità di trasporto O₂ dell'emoglobina (ml O₂/g Hb)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="orange" text-color="white" dense>0.003</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Coefficiente di solubilità dell'O₂ nel plasma (ml/mmHg/dL)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-expansion-item>

            <!-- Analisi Dettagliata e Applicazioni Cliniche -->
            <q-expansion-item
              icon="insights"
              label="🔬 Analisi Dettagliata e Applicazioni"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">Componenti del Calcolo:</div>
                <div class="row q-gutter-xs q-mb-sm">
                  <div class="col-12 bg-blue-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      Produzione CO₂ (VCO₂):
                      <span class="text-primary q-ml-xs">
                        {{ ((formData.PvCO2 || 0) - (formData.PaCO2 || 0)).toFixed(1) }} mmHg
                      </span>
                    </div>
                    <div class="text-caption text-grey-7">
                      Differenza artero-venosa di CO₂ (normale ~200 ml/min)
                    </div>
                  </div>
                  <div class="col-12 bg-green-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      Consumo O₂ - Trasporto via Emoglobina:
                      <span class="text-primary q-ml-xs"
                        >{{ getO2Transport().toFixed(2) }} ml/dL</span
                      >
                    </div>
                    <div class="text-caption text-grey-7">
                      Formula: HB × 1.36 × (SaO₂ - SvO₂) / 100
                    </div>
                  </div>
                  <div class="col-12 bg-orange-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      Consumo O₂ - Trasporto via Plasma:
                      <span class="text-primary q-ml-xs">{{ getPlasmaO2().toFixed(3) }} ml/dL</span>
                    </div>
                    <div class="text-caption text-grey-7">Formula: (PaO₂ - PvO₂) × 0.003</div>
                  </div>
                </div>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-xs">📊 Applicazioni Cliniche:</div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Calorimetria Indiretta:</strong> Valutazione del dispendio
                        energetico in pazienti critici
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Nutrizione Artificiale:</strong> Ottimizzazione del rapporto
                        carboidrati/grassi (evitare overfeeding)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Monitoraggio Shock:</strong> Marker precoce di metabolismo
                        anaerobico e ipoperfusione
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Weaning Ventilatorio:</strong> QR elevato può indicare eccessiva
                        produzione CO₂ (difficoltà svezzamento)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Valutazione Metabolica:</strong> Identificazione del substrato
                        energetico prevalente
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs">⚠️ Limiti e Considerazioni:</div>
                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Il QR rappresenta il rapporto VCO₂/VO₂ <strong>sistemico</strong>, non
                        tissutale
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        In condizioni di shock, l'aumento del QR può precedere l'aumento del lattato
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        La misurazione accurata richiede calorimetria indiretta in condizioni
                        stabili
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Questo calcolo è una <strong>stima approssimativa</strong> basata su
                        emogasanalisi artero-venosa
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-caption text-grey-7 q-mt-sm">
                  <strong>Riferimenti:</strong> La formula utilizzata stima VCO₂ e VO₂ dalla
                  differenza artero-venosa. Per misurazioni precise, preferire calorimetria
                  indiretta con analisi dei gas respiratori (Encyclopedia of Respiratory Medicine,
                  ScienceDirect Medical Literature).
                </div>
              </div>
            </q-expansion-item>

            <!-- 🎯 Interpretazione Clinica Dettagliata -->
            <q-expansion-item
              icon="psychology"
              label="🎯 Interpretazione Clinica Dettagliata"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  Range di Valori e Significato Clinico
                </div>

                <q-list dense bordered class="q-mb-md">
                  <q-item class="bg-purple-1">
                    <q-item-section>
                      <q-item-label class="text-weight-bold"
                        >QR 0.7 - Ossidazione Lipidica Pura</q-item-label
                      >
                      <q-item-label caption class="q-mt-xs">
                        <strong>Situazione clinica:</strong> Digiuno prolungato (>12h), esercizio
                        fisico a bassa intensità (&lt;50% VO₂max), dieta chetogenica, fase
                        post-assorbitiva notturna
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato metabolico:</strong> Prevalente utilizzo di acidi grassi
                        come substrato energetico. Massima efficienza energetica da lipidi (9
                        kcal/g). Risparmio di glicogeno muscolare/epatico. Stato catabolico
                        proteico-lipidico se prolungato
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-purple-9">
                        <strong>Azione clinica:</strong> Normale in condizioni di digiuno notturno.
                        Se persistente in paziente ICU nutrito → valutare adeguatezza apporto
                        calorico e glucidico (possibile sottonutrizione)
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-green-1 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold"
                        >QR 0.8-0.85 - Dieta Mista Equilibrata (TARGET ICU)</q-item-label
                      >
                      <q-item-label caption class="q-mt-xs">
                        <strong>Situazione clinica:</strong> Dieta bilanciata con mix
                        carboidrati/lipidi/proteine, condizione di riposo metabolico, paziente ICU
                        con nutrizione artificiale ottimale
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato metabolico:</strong> Ossidazione bilanciata di tutti i
                        macronutrienti. QR medio teorico dieta europea standard ~0.82. Target ideale
                        per nutrizione enterale/parenterale in terapia intensiva secondo linee guida
                        ESPEN
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-green-9">
                        <strong>Azione clinica:</strong> ESPEN Guidelines ICU 2019 raccomandano
                        target QR 0.85-0.95 per nutrizione ottimale. Mantenere equilibrio
                        macronutrienti: carboidrati 50-60%, lipidi 30-35%, proteine 15-20% delle
                        calorie totali. Evitare sia sovralimentazione che sottonutrizione
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-blue-1 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold"
                        >QR 0.9-1.0 - Predominanza Carboidrati</q-item-label
                      >
                      <q-item-label caption class="q-mt-xs">
                        <strong>Situazione clinica:</strong> Periodo post-prandiale dopo pasto ricco
                        di carboidrati, esercizio fisico moderato-intenso (60-85% VO₂max), dieta
                        iperglucidica (atleti pre-gara)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato metabolico:</strong> Prevalente ossidazione glucosio.
                        Crossover point nell'esercizio fisico (switch lipidi→carboidrati). Normale
                        risposta metabolica post-prandiale con insulina elevata che favorisce uptake
                        glucosio
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-blue-9">
                        <strong>Azione clinica:</strong> Normale dopo pasti o durante esercizio. In
                        paziente ICU con QR persistente ~1.0 → monitorare per possibile inizio
                        overfeeding glucidico. Se accompagnato da iperglicemia → ottimizzare
                        controllo glicemico
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-orange-2 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-orange-9">
                        ⚠️ QR 1.0-1.2 - Lipogenesi de novo (Overfeeding)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Situazione clinica:</strong> Eccesso di apporto glucidico rispetto
                        al fabbisogno, nutrizione parenterale/enterale ipercalorica con alto
                        contenuto di glucosio, lipogenesi de novo epatica da carboidrati in eccesso
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato metabolico:</strong> Conversione glucosio → acidi grassi
                        (lipogenesi). Processo inefficiente che produce CO₂ in eccesso NON da
                        ossidazione ma da reazioni di condensazione. QR teorico lipogenesi massima
                        ~8.0, ma in vivo 1.0-1.2 più comune
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>⚠️ PROBLEMA ICU CRITICO:</strong> ↑VCO₂ da lipogenesi → aumento
                        minute ventilation richiesta → difficoltà weaning dal ventilatore meccanico.
                        Steatosi epatica, iperglicemia, aumento lavoro respiratorio
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-orange-10">
                        <strong>Azione clinica URGENTE:</strong> Ridurre apporto glucidico (target
                        3-4 g/kg/die max), aumentare quota lipidica (30-50% calorie non-proteiche),
                        mantenere apporto proteico (1.2-1.5 g/kg/die). Rivalutare fabbisogno
                        calorico con calorimetria indiretta. Monitorare glicemia e funzionalità
                        epatica
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-red-2 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-red-9">
                        🚨 QR &gt;1.2 - Metabolismo Anaerobico (ALERT CRITICO)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Situazione clinica:</strong> Shock settico/cardiogeno/ipovolemico,
                        esercizio massimale sopra soglia anaerobica, insufficienza circolatoria
                        acuta, ipoperfusione tissutale severa
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato metabolico:</strong> Glicolisi anaerobica → produzione
                        lattato + H⁺. Buffering con HCO₃⁻ → CO₂ "non metabolica" (non da ossidazione
                        substrati). ↑VCO₂ sproporzionato rispetto a VO₂. Marker precoce di
                        metabolismo anaerobico che precede l'aumento del lattato sierico
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>🚨 INDICATORE PROGNOSTICO:</strong> QR &gt;1.2 in shock → predittore
                        indipendente di mortalità. Indica insufficiente delivery O₂ tissutale (DO₂
                        &lt; richiesta). Possibile precursore di disfunzione multi-organo (MOF)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-red-10">
                        <strong>Azione clinica EMERGENZA:</strong> Valutazione emodinamica urgente
                        (PA, FC, CVP, ScvO₂). Resuscitazione volemica guidata (fluid challenge,
                        targeting CVP 8-12 mmHg). Supporto inotropo se necessario (noradrenalina
                        target MAP ≥65 mmHg, dobutamina se bassa gittata). Ricerca e trattamento
                        fonte sepsi. Monitoraggio lattato arterioso (target &lt;2 mmol/L).
                        Considerare monitoraggio avanzato (PiCCO, Swan-Ganz) per ottimizzare DO₂
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner dense class="bg-indigo-1 text-indigo-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="lightbulb" color="indigo" />
                  </template>
                  <div class="text-caption">
                    <strong>Nota Clinica Importante:</strong> Il QR fornisce informazioni
                    <strong>integrative</strong> ad altri parametri metabolici/emodinamici (lattato,
                    ScvO₂, gap CO₂, BE). Non interpretare mai il QR isolatamente. In ICU, l'utilizzo
                    combinato di QR + calorimetria indiretta + lattato + ScvO₂ permette
                    ottimizzazione simultanea di nutrizione artificiale e supporto emodinamico.
                    Target ideale ICU: QR 0.85-0.95 + normoglicemia + lattato &lt;2 mmol/L + ScvO₂
                    &gt;70%.
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- ⚠️ Valori di Riferimento e Alert Critici -->
            <q-expansion-item
              icon="warning"
              label="⚠️ Valori di Riferimento e Alert Critici"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  Range di Riferimento per Condizione Fisiologica
                </div>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  1️⃣ Condizioni a Riposo (Post-Assorbitivo):
                </div>
                <q-list dense bordered class="q-mb-md bg-grey-1">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="purple" name="bedtime" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>QR 0.70-0.85</strong> - Riposo post-assorbitivo (digiuno notturno
                        8-12h)
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        Ossidazione mista lipidi (50-70%) + carboidrati (30-50%). Normale variazione
                        circadiana: QR più basso al mattino (↑oxidazione lipidica), più alto sera
                        (↑carboidrati)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="purple" name="nights_stay" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>QR 0.70-0.75</strong> - Digiuno prolungato (&gt;12-24h) o dieta
                        chetogenica
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        Prevalente oxidazione acidi grassi e corpi chetonici. Massimo risparmio
                        glicogeno. Comune in pazienti con low-carb diet, diabete tipo 1 scompensato
                        (chetoacidosi), digiuno terapeutico
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs">2️⃣ Stato Post-Prandiale:</div>
                <q-list dense bordered class="q-mb-md bg-grey-1">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="blue" name="restaurant" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>QR 0.85-1.00</strong> - Post-prandiale pasto misto (2-4h dopo pasto)
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        Aumento temporaneo QR per ossidazione preferenziale glucosio post-prandiale.
                        Insulina elevata → uptake glucosio muscolare/adiposo. Durata: picco a 1-2h,
                        ritorno baseline 3-4h
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="blue" name="cake" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>QR 1.00-1.10</strong> - Post-prandiale pasto ad alto contenuto
                        carboidrati (pasta, pane, dolci)
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        Ossidazione quasi esclusiva glucosio. Normale risposta metabolica a carico
                        glicemico elevato (high glycemic load meal). Attenzione: se QR &gt;1.05
                        persistente oltre 4-6h → possibile inizio lipogenesi
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs">3️⃣ Durante Esercizio Fisico:</div>
                <q-list dense bordered class="q-mb-md bg-grey-1">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="directions_walk" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>QR 0.70-0.85</strong> - Esercizio bassa intensità (&lt;50% VO₂max)
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        Zona aerobica lipidica. Prevalente oxidazione acidi grassi. Frequenza
                        cardiaca: 50-65% FCmax. Applicazioni: allenamento fat-burning, recupero
                        attivo, sport endurance lunga durata
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="directions_run" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>QR 0.85-0.95</strong> - Esercizio moderato (50-75% VO₂max)
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        Zona aerobica mista. Crossover point: transizione da lipidi a carboidrati
                        come substrato preferenziale. Frequenza cardiaca: 65-80% FCmax. Zona di
                        massima efficienza aerobica
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="orange" name="flash_on" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>QR 0.95-1.05</strong> - Esercizio intenso (75-90% VO₂max)
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        Zona aerobica glucidica. Prevalente oxidazione glucosio/glicogeno. Frequenza
                        cardiaca: 80-90% FCmax. Vicino alla soglia anaerobica (lactate threshold).
                        Sostenibile 20-60 minuti
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="red" name="whatshot" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>QR &gt;1.05-1.15</strong> - Esercizio massimale (&gt;90% VO₂max)
                        sopra soglia anaerobica
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        Zona anaerobica. Glicolisi anaerobica con accumulo lattato. CO₂
                        "non-metabolica" da buffering bicarbonato. Frequenza cardiaca: &gt;90%
                        FCmax. Sostenibile solo 2-10 minuti. Utilizzato in test da sforzo
                        cardiopolmonare (CPET) per determinare VO₂max e soglia anaerobica
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs text-red-9">
                  🚨 ALERT CRITICI - Thresholds di Intervento:
                </div>
                <q-list dense bordered class="bg-red-1">
                  <q-item class="bg-orange-2">
                    <q-item-section avatar>
                      <q-icon color="orange" name="warning" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-orange-9">
                        ⚠️ QR &gt;1.0 persistente in paziente ICU nutrito (oltre 6-12h)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato:</strong> Probabile overfeeding glucidico con lipogenesi
                        de novo. ↑VCO₂ → aumento minute ventilation → difficoltà weaning ventilatore
                      </q-item-label>
                      <q-item-label caption class="text-weight-medium text-orange-10 q-mt-xs">
                        <strong>Azione:</strong> Ridurre apporto glucosio (max 3-4 g/kg/die).
                        Aumentare quota lipidica a 30-50% calorie non-proteiche. Rivalutare
                        fabbisogno con calorimetria indiretta. Target QR 0.85-0.95
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-red-2 q-mt-sm">
                    <q-item-section avatar>
                      <q-icon color="red" name="emergency" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-red-9">
                        🚨 QR &gt;1.2 in paziente critico (ICU, shock, sepsi)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato:</strong> Metabolismo anaerobico da ipoperfusione
                        tissutale. Insufficiente delivery O₂ (DO₂ &lt; consumo). Marker precoce di
                        shock che precede ↑lattato. Predittore indipendente di mortalità
                      </q-item-label>
                      <q-item-label caption class="text-weight-medium text-red-10 q-mt-xs">
                        <strong>Azione URGENTE:</strong> Valutazione emodinamica completa (PA, CVP,
                        ScvO₂, lattato). Resuscitazione volemica guidata (fluid challenge).
                        Noradrenalina target MAP ≥65 mmHg. Dobutamina se bassa gittata cardiaca.
                        Ricerca/trattamento fonte sepsi. Considerare monitoraggio invasivo (PiCCO,
                        Swan-Ganz) per ottimizzare DO₂. Target: ScvO₂ &gt;70%, lattato &lt;2 mmol/L,
                        QR progressivo ritorno verso 0.85-0.95
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-purple-2 q-mt-sm">
                    <q-item-section avatar>
                      <q-icon color="purple" name="health_and_safety" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-purple-9">
                        ℹ️ QR &lt;0.70 prolungato in paziente ICU
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato:</strong> Possibile sottonutrizione calorica/glucidica.
                        Eccessiva ossidazione lipidica da insufficiente apporto energetico. Rischio
                        catabolismo proteico, perdita massa magra, ritardata guarigione
                      </q-item-label>
                      <q-item-label caption class="text-weight-medium text-purple-9 q-mt-xs">
                        <strong>Azione:</strong> Rivalutare fabbisogno calorico (target 20-25
                        kcal/kg/die in fase acuta, 25-30 kcal/kg/die in recovery). Aumentare apporto
                        glucidico (min 2 g/kg/die) mantenendo quota lipidica. Monitorare bilancio
                        azotato e marker nutrizionali (albumina, prealbumina). Target QR 0.80-0.90
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner dense class="bg-blue-grey-1 text-blue-grey-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="science" color="blue-grey" />
                  </template>
                  <div class="text-caption">
                    <strong>Variabilità Individuale e Fattori Confondenti:</strong> I valori di
                    riferimento sono indicativi e soggetti a variabilità inter-individuale (età,
                    sesso, composizione corporea, stato di allenamento). Fattori che influenzano il
                    QR: temperatura corporea (febbre → ↑QR), stato acido-base (acidosi metabolica →
                    buffering → ↑VCO₂ → ↑QR), iperventilazione (↑VCO₂ polmonare non riflette
                    produzione tissutale), farmaci (catecolamine → ↑glicogenolisi → ↑QR). Per
                    valutazione accurata: condizioni di steady-state, calorimetria indiretta con
                    apparecchiatura calibrata, integrazione con altri parametri metabolici
                    (glicemia, lattato, corpi chetonici, ScvO₂).
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- 📚 Documentazione Medica Scientifica -->
            <q-expansion-item
              icon="menu_book"
              label="📚 Documentazione Medica Scientifica"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  Linee Guida Internazionali e Protocolli Clinici
                </div>

                <q-list dense class="q-mb-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        ESPEN Guidelines on Nutrition in the ICU (2019)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Raccomandazioni:</strong> Utilizzo di calorimetria indiretta come
                        gold standard per determinazione del fabbisogno energetico in paziente
                        critico. Target QR ottimale 0.85-0.95 per nutrizione bilanciata. Evitare
                        overfeeding (QR &gt;1.0 persistente) per prevenire complicanze:
                        iperglicemia, steatosi epatica, aumento produzione CO₂ con difficoltà
                        weaning ventilatore, aumentato rischio infettivo
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        European Society for Clinical Nutrition and Metabolism - Intensive Care
                        Medicine Guidelines
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        ASPEN Clinical Guidelines: Nutrition Support Therapy (2016)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Raccomandazioni:</strong> Calorimetria indiretta preferita rispetto
                        a formule predittive (Harris-Benedict, Penn State) per accuratezza
                        misurazione REE (Resting Energy Expenditure). QR fornisce informazioni su
                        substrato ossidato e adeguatezza mix macronutrienti. Evitare sottostima
                        fabbisogno (catabolismo) e sovrastima (overfeeding lipogenesi)
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        American Society for Parenteral and Enteral Nutrition - Guidelines for
                        Provision and Assessment of Nutrition Support
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        ATS/ACCP Statement on Cardiopulmonary Exercise Testing (2003)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Raccomandazioni:</strong> In test da sforzo cardiopolmonare (CPET),
                        il QR (denominato RER - Respiratory Exchange Ratio durante esercizio) è
                        utilizzato per: determinare soglia anaerobica (RER ~1.0), confermare
                        raggiungimento VO₂max (RER &gt;1.10-1.15 a picco sforzo), valutare
                        compliance paziente allo sforzo massimale. Criterio validità test: RER picco
                        &gt;1.10
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        American Thoracic Society / American College of Chest Physicians - Official
                        Statement CPET
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="settings" color="indigo" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Metabolic Cart Standardization and Quality Control Protocols
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Requisiti tecnici:</strong> Calibrazione quotidiana con gas standard
                        certificati (O₂ 15-21%, CO₂ 4-6%). Verifica linearità sensori. Test con
                        methanol burning (combustione metanolo CH₃OH → RQ teorico 0.667 per
                        validazione accuratezza). Condizioni di misurazione: paziente a riposo ≥30
                        min, digiuno ≥4h, steady-state metabolico (variabilità VO₂/VCO₂ &lt;10% su 5
                        min consecutivi)
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        International Standards for Indirect Calorimetry Measurements - Quality
                        Assurance Protocols
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="medical_services" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Weaning from Mechanical Ventilation - Role of RQ Monitoring
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Applicazione clinica:</strong> RQ &gt;1.0 in paziente in weaning →
                        aumento produzione CO₂ da overfeeding → aumento minute ventilation richiesta
                        → fallimento weaning per aumentato carico respiratorio. Protocollo: misurare
                        RQ con calorimetria indiretta prima di trial di respiro spontaneo (SBT). Se
                        RQ &gt;1.0 → ottimizzare nutrizione riducendo glucosio, ripetere SBT dopo
                        24-48h. Target: RQ 0.80-0.95 prima di tentativo estubazione
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        Evidence-Based Guidelines for Weaning and Discontinuing Ventilatory Support
                        - Nutritional Optimization
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner dense class="bg-amber-1 text-amber-9">
                  <template v-slot:avatar>
                    <q-icon name="policy" color="amber-9" />
                  </template>
                  <div class="text-caption">
                    <strong>Nota sull'Applicazione Clinica delle Linee Guida:</strong> Le
                    raccomandazioni ESPEN/ASPEN enfatizzano che la misurazione del QR tramite
                    calorimetria indiretta dovrebbe essere standard of care in ICU per
                    ottimizzazione nutrizione artificiale, ma nella pratica clinica l'utilizzo
                    rimane limitato per costi apparecchiatura e necessità personale formato. In
                    assenza di calorimetro, utilizzo di equazioni predittive (25 kcal/kg/die fase
                    acuta) con monitoraggio clinico: glicemia, bilancio azotato, parametri
                    antropometrici, marker infiammatori (PCR). Il QR stimato da emogasanalisi (come
                    in questo calcolatore) ha accuratezza inferiore (±15-20%) ma può fornire
                    indicazioni orientative su stato metabolico e adeguatezza nutrizione.
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- 📖 Riferimenti Scientifici -->
            <q-expansion-item
              icon="import_contacts"
              label="📖 Riferimenti Scientifici e Bibliografia"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  Letteratura Scientifica Peer-Reviewed e Risorse Autorevoli
                </div>

                <q-list dense class="q-mb-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Weir JB. "New methods for calculating metabolic rate with special reference
                        to protein metabolism" (1949)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Journal of Physiology</strong> 109(1-2):1-9 - PMID: 15394301
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        Studio fondamentale che ha derivato l'equazione di Weir per calcolo del
                        dispendio energetico (REE) da VO₂ e VCO₂: REE (kcal/die) = 1.44 × [(3.941 ×
                        VO₂) + (1.106 × VCO₂)]. Permette stima accurata del metabolismo basale senza
                        necessità di analisi dell'azoto urinario. Equazione ancora oggi gold
                        standard in calorimetria indiretta
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        McClave SA et al. "Guidelines for the Provision and Assessment of Nutrition
                        Support Therapy in the Adult Critically Ill Patient" (2016)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Journal of Parenteral and Enteral Nutrition</strong> 40(2):159-211 -
                        PMID: 26773077
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        Linee guida ASPEN per nutrizione in ICU. Raccomandazione forte (grado A) per
                        utilizzo di calorimetria indiretta quando disponibile, preferita rispetto a
                        formule predittive. Target calorico: evitare sia underfeeding (↑mortalità,
                        ↑infezioni) che overfeeding (QR &gt;1.0 → iperglicemia, steatosi, difficoltà
                        weaning). Protocollo: nutrizione enterale precoce (entro 24-48h), target
                        calorico 80-100% fabbisogno misurato
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Singer P et al. "ESPEN guideline on clinical nutrition in the intensive care
                        unit" (2019)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Clinical Nutrition</strong> 38(1):48-79 - PMID: 30348463
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        Linee guida ESPEN aggiornate per ICU. Enfasi su individualizzazione
                        nutrizione tramite calorimetria indiretta. Target RQ: 0.85-0.95 indica
                        bilanciamento ottimale macronutrienti. Evidenze: overfeeding con RQ &gt;1.0
                        associato a ↑durata ventilazione meccanica (studio osservazionale 203
                        pazienti: RQ &gt;1.0 → +3.2 giorni ventilazione, p&lt;0.01).
                        Raccomandazione: ridurre glucosio se RQ &gt;1.0, aumentare lipidi a 30-50%
                        calorie
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Brooks GA, Mercier J. "Balance of carbohydrate and lipid utilization during
                        exercise: the crossover concept" (1994)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Journal of Applied Physiology</strong> 76(6):2253-2261 - PMID:
                        8088548
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        Teoria del "crossover point": punto di intensità esercizio (~50-60% VO₂max,
                        RER ~0.85) in cui c'è transizione da prevalente oxidazione lipidica (bassa
                        intensità) a glucidica (alta intensità). Meccanismi: ↑catecolamine →
                        ↑glicogenolisi, reclutamento fibre muscolari tipo II glicolitiche,
                        limitazione disponibilità O₂ per beta-oxidazione acidi grassi. Applicazione:
                        training zones per atleti endurance
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="book" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        ScienceDirect - Encyclopedia of Respiratory Medicine (2006)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        Capitolo: "Respiratory Quotient and Gas Exchange"
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        Trattazione completa della fisiologia del quoziente respiratorio. Include:
                        stoichiometria reazioni di ossidazione substrati energetici (carboidrati RQ
                        1.0, lipidi RQ 0.7, proteine RQ 0.8, etanolo RQ 0.67), differenze tra RQ
                        tissutale e RER polmonare, fattori che influenzano misurazione (stato
                        acido-base, iperventilazione, febbre), applicazioni cliniche (calorimetria,
                        nutrizione, test da sforzo)
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="book" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        MSD Manuals - Professional Version: Metabolism Section
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        Capitolo: "Overview of Carbohydrate, Lipid and Protein Metabolism"
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        Manuale clinico autorevole (Merck Sharp & Dohme). Sezione metabolismo copre:
                        pathways ossidativi macronutrienti, ciclo di Krebs, catena respiratoria,
                        regolazione ormonale (insulina/glucagone) del substrato ossidato. RQ come
                        indicatore funzionale del metabolismo energetico. Applicazioni diagnostiche:
                        diabete (chetoacidosi → ↓RQ), overfeeding (lipogenesi → ↑RQ), shock
                        (anaerobiosi → ↑↑RQ)
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Mtaweh H et al. "Indirect calorimetry: history, technology, and application"
                        (2018)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Frontiers in Pediatrics</strong> 6:257 - PMID: 30271762
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        Review completa su storia e applicazioni della calorimetria indiretta.
                        Tecnologie: analyzers O₂ (fuel cell, paramagnetico, elettrochimico), CO₂
                        (infrarosso NDIR), pneumotacografi. Accuratezza: ±3-5% per VO₂/VCO₂ con
                        calibrazione corretta. Limitazioni: costi (15.000-50.000€), necessità
                        personale formato, condizioni di steady-state. Comparazione con formule
                        predittive: calorimetria superiore con errore medio assoluto 10-15% vs
                        20-30% equazioni
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Simonson DC, DeFronzo RA. "Indirect calorimetry: methodological and
                        interpretative problems" (1990)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>American Journal of Physiology</strong> 258(3):E399-E412 - PMID:
                        2180318
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        Analisi critica delle limitazioni metodologiche della calorimetria.
                        Problemi: effetto hood vs mask vs ventilatore (differenze ±5-10% VO₂),
                        variabilità temporale (necessità misurazioni ≥20-30 min), effetti termici
                        del cibo (↑REE 10-15% post-prandiale durata 3-6h), stato di allenamento
                        (atleti: ↑efficienza mitocondriale → ↓VO₂ relativo). Raccomandazioni
                        standardizzazione: condizioni controllate, riposo 30 min, digiuno 4-12h,
                        temperatura ambiente 20-25°C
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner dense class="bg-indigo-1 text-indigo-9">
                  <template v-slot:avatar>
                    <q-icon name="verified" color="indigo" />
                  </template>
                  <div class="text-caption">
                    <strong>Nota sulla Qualità delle Fonti:</strong> Tutti i riferimenti citati sono
                    stati selezionati da letteratura peer-reviewed pubblicata su riviste
                    scientifiche indicizzate (PubMed/MEDLINE) o da fonti autorevoli di medicina
                    basata sull'evidenza (linee guida ESPEN/ASPEN, statement società scientifiche
                    ATS/ACCP, manuali clinici MSD). La gerarchia dell'evidenza include: linee guida
                    basate su revisioni sistematiche e consensus di esperti (ESPEN/ASPEN - livello
                    massimo), studi originali pubblicati su riviste ad alto impact factor (J Appl
                    Physiol, Clin Nutr - evidenza primaria), review e capitoli di testo da fonti
                    validate (Encyclopedia Respiratory Medicine, MSD Manuals - sintesi consolidata).
                    Per approfondimenti, consultare database PubMed con PMID forniti.
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
