<template>
  <q-page class="q-pa-md">
    <!-- Header con breadcrumb -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
        <q-breadcrumbs-el label="Quoziente Respiratorio" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">🫁 Quoziente Respiratorio Calculator</h4>
      <p class="text-subtitle1 text-grey-7">Calcolo QR per valutazione scambi gassosi polmonari</p>
    </div>

    <div class="row q-gutter-lg">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri Ematochimici</h6>

            <!-- PvCO2 - CO2 Venosa -->
            <q-input
              v-model.number="formData.PvCO2"
              type="number"
              step="0.1"
              label="PvCO2 (CO2 Venosa)"
              suffix="mmHg"
              outlined
              class="q-mb-md"
              :rules="[(val) => val > 0 || 'Inserire valore positivo']"
            >
              <template v-slot:prepend>
                <q-icon name="bloodtype" color="red" />
              </template>
            </q-input>

            <!-- PaCO2 - CO2 Arteriosa -->
            <q-input
              v-model.number="formData.PaCO2"
              type="number"
              step="0.1"
              label="PaCO2 (CO2 Arteriosa)"
              suffix="mmHg"
              outlined
              class="q-mb-md"
              :rules="[(val) => val > 0 || 'Inserire valore positivo']"
            >
              <template v-slot:prepend>
                <q-icon name="bloodtype" color="blue" />
              </template>
            </q-input>

            <!-- HB - Emoglobina -->
            <q-input
              v-model.number="formData.HB"
              type="number"
              step="0.1"
              label="HB (Emoglobina)"
              suffix="g/dL"
              outlined
              class="q-mb-md"
              :rules="[(val) => val > 0 || 'Inserire valore positivo']"
            >
              <template v-slot:prepend>
                <q-icon name="science" color="purple" />
              </template>
            </q-input>

            <!-- SaO2 - Saturazione Arteriosa -->
            <q-input
              v-model.number="formData.SaO2"
              type="number"
              step="0.1"
              label="SaO2 (Saturazione O2 Arteriosa)"
              suffix="%"
              outlined
              class="q-mb-md"
              :rules="[(val) => (val >= 0 && val <= 100) || 'Valore tra 0-100%']"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="green" />
              </template>
            </q-input>

            <!-- SvO2 - Saturazione Venosa -->
            <q-input
              v-model.number="formData.SvO2"
              type="number"
              step="0.1"
              label="SvO2 (Saturazione O2 Venosa)"
              suffix="%"
              outlined
              class="q-mb-md"
              :rules="[(val) => (val >= 0 && val <= 100) || 'Valore tra 0-100%']"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="orange" />
              </template>
            </q-input>

            <!-- PaO2 - Pressione O2 Arteriosa -->
            <q-input
              v-model.number="formData.PaO2"
              type="number"
              step="0.1"
              label="PaO2 (Pressione O2 Arteriosa)"
              suffix="mmHg"
              outlined
              class="q-mb-md"
              :rules="[(val) => val > 0 || 'Inserire valore positivo']"
            >
              <template v-slot:prepend>
                <q-icon name="device_thermostat" color="cyan" />
              </template>
            </q-input>

            <!-- PvO2 - Pressione O2 Venosa -->
            <q-input
              v-model.number="formData.PvO2"
              type="number"
              step="0.1"
              label="PvO2 (Pressione O2 Venosa)"
              suffix="mmHg"
              outlined
              class="q-mb-md"
              :rules="[(val) => val > 0 || 'Inserire valore positivo']"
            >
              <template v-slot:prepend>
                <q-icon name="device_thermostat" color="teal" />
              </template>
            </q-input>

            <!-- Bottone Calcola -->
            <q-btn
              @click="calculateQR"
              color="primary"
              size="lg"
              class="full-width"
              icon="calculate"
              :disable="!isFormValid"
            >
              Calcola Quoziente Respiratorio
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📈 Risultati</h6>

            <!-- Risultato Principale -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 text-primary q-mb-sm">
                {{ result.toFixed(3) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>QR</strong> (Quoziente Respiratorio)
              </div>
            </div>

            <!-- Interpretazione Clinica -->
            <q-separator class="q-mb-md" />

            <div class="q-mb-md">
              <div class="text-h6 q-mb-sm">🎯 Interpretazione Clinica:</div>
              <q-chip :color="getInterpretationColor()" text-color="white" class="text-weight-bold">
                {{ getInterpretation() }}
              </q-chip>
            </div>

            <!-- Valori di Riferimento -->
            <q-expansion-item icon="info" label="📚 Valori di Riferimento" class="text-primary">
              <div class="q-pa-md bg-grey-1">
                <ul class="q-ma-none">
                  <li><strong>0.7 - 1.0:</strong> Range normale</li>
                  <li><strong>&lt; 0.7:</strong> Possibile ipoventilazione o acidosi metabolica</li>
                  <li><strong>&gt; 1.0:</strong> Possibile iperventilazione o alcalosi</li>
                  <li><strong>~ 0.8:</strong> Valore medio normale a riposo</li>
                </ul>
                <p class="text-caption q-mt-sm q-mb-none">
                  Il QR indica l'efficienza degli scambi respiratori
                </p>
              </div>
            </q-expansion-item>

            <!-- Formula -->
            <q-expansion-item
              icon="functions"
              label="🧮 Formula Utilizzata"
              class="text-primary q-mt-sm"
            >
              <div class="q-pa-md bg-grey-1">
                <p class="text-body2 q-ma-none">
                  <strong
                    >QR = (PvCO2 - PaCO2) / [(HB × 1.36 × (SaO2 - SvO2)) / 100 + (PaO2 - PvO2) ×
                    0.003]</strong
                  >
                </p>
                <p class="text-caption q-mt-sm q-mb-none">
                  Dove 1.36 è la capacità di trasporto O2 dell'Hb e 0.003 è la solubilità dell'O2
                  nel plasma
                </p>
              </div>
            </q-expansion-item>

            <!-- Componenti del Calcolo -->
            <q-expansion-item
              icon="insights"
              label="🔬 Componenti del Calcolo"
              class="text-primary q-mt-sm"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="row q-gutter-sm">
                  <div class="col-12">
                    <strong>Trasporto CO2:</strong>
                    {{ (formData.PvCO2 || 0) - (formData.PaCO2 || 0) }} mmHg
                  </div>
                  <div class="col-12">
                    <strong>Trasporto O2 (Hb):</strong> {{ getO2Transport().toFixed(2) }} ml/dL
                  </div>
                  <div class="col-12">
                    <strong>Trasporto O2 (Plasma):</strong> {{ getPlasmaO2().toFixed(3) }} ml/dL
                  </div>
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
interface QRFormData {
  PvCO2: number | null; // CO2 venosa (mmHg)
  PaCO2: number | null; // CO2 arteriosa (mmHg)
  HB: number | null; // Emoglobina (g/dL)
  SaO2: number | null; // Saturazione O2 arteriosa (%)
  SvO2: number | null; // Saturazione O2 venosa (%)
  PaO2: number | null; // Pressione O2 arteriosa (mmHg)
  PvO2: number | null; // Pressione O2 venosa (mmHg)
}

// Dati reattivi del form
const formData = ref<QRFormData>({
  PvCO2: null,
  PaCO2: null,
  HB: null,
  SaO2: null,
  SvO2: null,
  PaO2: null,
  PvO2: null,
});

// Risultato del calcolo
const result = ref<number>(0);

// Computed per validazione form
const isFormValid = computed(() => {
  return (
    Object.values(formData.value).every((val) => val !== null && val > 0) &&
    formData.value.SaO2! <= 100 &&
    formData.value.SvO2! <= 100
  );
});

// Funzione di calcolo Quoziente Respiratorio
const calculateQR = () => {
  if (!isFormValid.value) return;

  const { PvCO2, PaCO2, HB, SaO2, SvO2, PaO2, PvO2 } = formData.value;

  // Formula: QR = (PvCO2 - PaCO2) / ((HB * 1.36 * (SaO2 - SvO2)) / 100 + (PaO2 - PvO2) * 0.003)
  const numerator = PvCO2! - PaCO2!;
  const hbComponent = (HB! * 1.36 * (SaO2! - SvO2!)) / 100;
  const plasmaComponent = (PaO2! - PvO2!) * 0.003;
  const denominator = hbComponent + plasmaComponent;

  result.value = numerator / denominator;
};

// Funzioni helper per visualizzare componenti
const getO2Transport = () => {
  if (!formData.value.HB || !formData.value.SaO2 || !formData.value.SvO2) return 0;
  return (formData.value.HB * 1.36 * (formData.value.SaO2 - formData.value.SvO2)) / 100;
};

const getPlasmaO2 = () => {
  if (!formData.value.PaO2 || !formData.value.PvO2) return 0;
  return (formData.value.PaO2 - formData.value.PvO2) * 0.003;
};

// Interpretazione clinica del risultato
const getInterpretation = (): string => {
  if (result.value === 0) return 'Inserire i parametri per il calcolo';
  if (result.value >= 0.7 && result.value <= 1.0) return 'Range Normale';
  if (result.value < 0.7) return 'Sotto Norma';
  return 'Sopra Norma';
};

// Colore per l'interpretazione
const getInterpretationColor = (): string => {
  if (result.value === 0) return 'grey';
  if (result.value >= 0.7 && result.value <= 1.0) return 'green';
  return 'orange';
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
