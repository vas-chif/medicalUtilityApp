<template>
  <q-page class="q-pa-md">
    <!-- Header con breadcrumb -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
        <q-breadcrumbs-el label="BMI Calculator" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">⚖️ BMI Calculator</h4>
      <p class="text-subtitle1 text-grey-7">
        Calcolo Indice di Massa Corporea e classificazione WHO
      </p>
    </div>

    <div class="row q-gutter-lg">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri Antropometrici</h6>

            <!-- Peso -->
            <q-input
              v-model.number="formData.weight"
              type="number"
              step="0.1"
              label="Peso"
              suffix="kg"
              outlined
              class="q-mb-md"
              :rules="[(val) => (val > 0 && val <= 500) || 'Peso tra 1-500 kg']"
            >
              <template v-slot:prepend>
                <q-icon name="fitness_center" color="blue" />
              </template>
            </q-input>

            <!-- Altezza -->
            <q-input
              v-model.number="formData.height"
              type="number"
              label="Altezza"
              suffix="cm"
              outlined
              class="q-mb-md"
              :rules="[(val) => (val > 0 && val <= 300) || 'Altezza tra 1-300 cm']"
            >
              <template v-slot:prepend>
                <q-icon name="height" color="green" />
              </template>
            </q-input>

            <!-- Età (opzionale per contesto) -->
            <q-input
              v-model.number="formData.age"
              type="number"
              label="Età (opzionale)"
              suffix="anni"
              outlined
              class="q-mb-md"
              :rules="[(val) => !val || (val > 0 && val <= 120) || 'Età tra 1-120 anni']"
            >
              <template v-slot:prepend>
                <q-icon name="cake" color="orange" />
              </template>
            </q-input>

            <!-- Sesso (per contesto interpretazione) -->
            <q-select
              v-model="formData.gender"
              :options="genderOptions"
              label="Sesso (opzionale)"
              outlined
              class="q-mb-md"
              emit-value
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="person" color="purple" />
              </template>
            </q-select>

            <!-- Bottone Calcola -->
            <q-btn
              @click="calculateBMI"
              color="primary"
              size="lg"
              class="full-width"
              icon="calculate"
              :disable="!isFormValid"
            >
              Calcola BMI
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
                {{ result.bmi.toFixed(1) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>kg/m²</strong> (Indice di Massa Corporea)
              </div>
            </div>

            <!-- Classificazione WHO -->
            <q-separator class="q-mb-md" />

            <div class="q-mb-md">
              <div class="text-h6 q-mb-sm">🎯 Classificazione WHO:</div>
              <q-chip :color="result.color" text-color="white" class="text-weight-bold" size="lg">
                {{ result.category }}
              </q-chip>
            </div>

            <!-- Grafico Visuale BMI -->
            <div class="q-mb-lg" v-if="result.bmi > 0">
              <div class="text-subtitle2 q-mb-sm">📊 Posizione nella Scala BMI:</div>
              <div class="bmi-scale">
                <div class="bmi-bar">
                  <div class="bmi-indicator" :style="{ left: getBMIPosition() + '%' }"></div>
                </div>
                <div class="bmi-labels row justify-between q-mt-sm">
                  <span class="text-caption">15</span>
                  <span class="text-caption">18.5</span>
                  <span class="text-caption">25</span>
                  <span class="text-caption">30</span>
                  <span class="text-caption">35</span>
                  <span class="text-caption">40+</span>
                </div>
              </div>
            </div>

            <!-- Peso Ideale -->
            <div class="q-mb-md" v-if="result.idealWeight.min > 0">
              <div class="text-h6 q-mb-sm">🎯 Peso Ideale (BMI 18.5-24.9):</div>
              <div class="text-body1">
                <strong
                  >{{ result.idealWeight.min.toFixed(1) }} -
                  {{ result.idealWeight.max.toFixed(1) }} kg</strong
                >
              </div>
              <div class="text-caption text-grey-6" v-if="result.weightDifference !== 0">
                {{ result.weightDifference > 0 ? 'Eccesso:' : 'Deficit:' }}
                {{ Math.abs(result.weightDifference).toFixed(1) }} kg
              </div>
            </div>

            <!-- Classificazioni Dettagliate -->
            <q-expansion-item
              icon="info"
              label="📚 Classificazione Completa WHO"
              class="text-primary"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="row q-gutter-sm text-caption">
                  <div class="col-12">
                    <span class="text-weight-bold text-blue">Sottopeso:</span> &lt; 18.5
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-green">Normopeso:</span> 18.5 - 24.9
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-orange">Sovrappeso:</span> 25.0 - 29.9
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-red">Obesità I:</span> 30.0 - 34.9
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-deep-orange">Obesità II:</span> 35.0 - 39.9
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-purple">Obesità III:</span> ≥ 40.0
                  </div>
                </div>
              </div>
            </q-expansion-item>

            <!-- Formula -->
            <q-expansion-item icon="functions" label="🧮 Formula BMI" class="text-primary q-mt-sm">
              <div class="q-pa-md bg-grey-1">
                <p class="text-body2 q-ma-none">
                  <strong>BMI = Peso (kg) / [Altezza (m)]²</strong>
                </p>
                <p class="text-caption q-mt-sm q-mb-none">
                  Formula standard dell'Organizzazione Mondiale della Sanità (WHO)
                </p>
              </div>
            </q-expansion-item>

            <!-- Suggerimenti Clinici -->
            <q-expansion-item
              icon="medical_services"
              label="💡 Note Cliniche"
              class="text-primary q-mt-sm"
              v-if="result.bmi > 0"
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
interface BMIFormData {
  weight: number | null; // Peso in kg
  height: number | null; // Altezza in cm
  age: number | null; // Età in anni (opzionale)
  gender: string | null; // Sesso (opzionale)
}

// Interfaccia per i risultati
interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  idealWeight: {
    min: number;
    max: number;
  };
  weightDifference: number; // Differenza dal peso ideale
}

// Dati reattivi del form
const formData = ref<BMIFormData>({
  weight: null,
  height: null,
  age: null,
  gender: null,
});

// Opzioni per il sesso
const genderOptions = [
  { label: 'Maschio', value: 'male' },
  { label: 'Femmina', value: 'female' },
];

// Risultato del calcolo
const result = ref<BMIResult>({
  bmi: 0,
  category: '',
  color: 'grey',
  idealWeight: { min: 0, max: 0 },
  weightDifference: 0,
});

// Computed per validazione form
const isFormValid = computed(() => {
  return (
    formData.value.weight !== null &&
    formData.value.weight > 0 &&
    formData.value.height !== null &&
    formData.value.height > 0
  );
});

// Funzione di calcolo BMI
const calculateBMI = () => {
  if (!isFormValid.value) return;

  const weight = formData.value.weight!;
  const heightM = formData.value.height! / 100; // Conversione cm -> m

  // Calcolo BMI
  const bmi = weight / (heightM * heightM);

  // Classificazione WHO
  const { category, color } = getBMIClassification(bmi);

  // Peso ideale (BMI 18.5 - 24.9)
  const idealMin = 18.5 * heightM * heightM;
  const idealMax = 24.9 * heightM * heightM;

  // Differenza dal peso ideale
  let weightDiff = 0;
  if (bmi < 18.5) {
    weightDiff = weight - idealMin; // Negativo = deficit
  } else if (bmi > 24.9) {
    weightDiff = weight - idealMax; // Positivo = eccesso
  }

  result.value = {
    bmi,
    category,
    color,
    idealWeight: { min: idealMin, max: idealMax },
    weightDifference: weightDiff,
  };
};

// Classificazione BMI secondo WHO
const getBMIClassification = (bmi: number): { category: string; color: string } => {
  if (bmi < 18.5) return { category: 'Sottopeso', color: 'blue' };
  if (bmi <= 24.9) return { category: 'Normopeso', color: 'green' };
  if (bmi <= 29.9) return { category: 'Sovrappeso', color: 'orange' };
  if (bmi <= 34.9) return { category: 'Obesità Grado I', color: 'red' };
  if (bmi <= 39.9) return { category: 'Obesità Grado II', color: 'deep-orange' };
  return { category: 'Obesità Grado III', color: 'purple' };
};

// Posizione indicatore nella scala BMI (per grafico)
const getBMIPosition = (): number => {
  const bmi = result.value.bmi;
  if (bmi <= 15) return 0;
  if (bmi <= 18.5) return ((bmi - 15) / 3.5) * 20;
  if (bmi <= 25) return 20 + ((bmi - 18.5) / 6.5) * 25;
  if (bmi <= 30) return 45 + ((bmi - 25) / 5) * 20;
  if (bmi <= 35) return 65 + ((bmi - 30) / 5) * 15;
  if (bmi <= 40) return 80 + ((bmi - 35) / 5) * 15;
  return 95;
};

// Note cliniche basate su BMI e dati aggiuntivi
const getClinicalNotes = (): string => {
  const bmi = result.value.bmi;
  const age = formData.value.age;

  let notes = '';

  if (bmi < 18.5) {
    notes =
      'Il sottopeso può indicare malnutrizione o problemi di salute. Si consiglia valutazione medica.';
  } else if (bmi <= 24.9) {
    notes =
      'BMI nella norma. Mantenere uno stile di vita sano con alimentazione equilibrata e attività fisica regolare.';
  } else if (bmi <= 29.9) {
    notes =
      'Sovrappeso aumenta il rischio di malattie cardiovascolari e diabete. Considerare riduzione del peso.';
  } else if (bmi <= 34.9) {
    notes =
      'Obesità moderata. Forte raccomandazione per perdita di peso sotto supervisione medica.';
  } else if (bmi <= 39.9) {
    notes = 'Obesità severa. Necessaria valutazione medica specialistica e intervento strutturato.';
  } else {
    notes =
      'Obesità estrema. Rischio molto elevato per la salute. Urgente consulto medico specialistico.';
  }

  // Aggiungi note specifiche per età
  if (age && age >= 65) {
    notes += ' Nota: negli anziani, valori BMI leggermente superiori possono essere protettivi.';
  } else if (age && age < 18) {
    notes += ' Nota: per i minori utilizzare percentili BMI specifici per età e sesso.';
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

/* Scala BMI Visuale */
.bmi-scale {
  position: relative;
  width: 100%;
}

.bmi-bar {
  height: 20px;
  background: linear-gradient(
    to right,
    #2196f3 0% 20%,
    /* Sottopeso - Blu */ #4caf50 20% 45%,
    /* Normale - Verde */ #ff9800 45% 65%,
    /* Sovrappeso - Arancione */ #f44336 65% 80%,
    /* Obesità I - Rosso */ #ff5722 80% 95%,
    /* Obesità II - Rosso scuro */ #9c27b0 95% 100% /* Obesità III - Viola */
  );
  border-radius: 10px;
  position: relative;
}

.bmi-indicator {
  position: absolute;
  top: -5px;
  width: 4px;
  height: 30px;
  background-color: #333;
  border-radius: 2px;
  transform: translateX(-50%);
  transition: left 0.3s ease;
}

.bmi-indicator::before {
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

.bmi-labels {
  margin-top: 8px;
}
</style>
