<!-- BMICalculator.vue -->
<script setup lang="ts">
/**
 * @file BMICalculator.vue
 * @description BMI (Body Mass Index) Calculator component con WHO classification
 * @author Vasile Chifeac
 * @created 2025-11-16
 * @modified 2025-11-16
 *
 * @example
 * <BMICalculator />
 *
 * @notes
 * - Componente estratto da BMICalculatorPage.vue Tab 1
 * - WHO BMI classification con age-specific adjustments
 * - Calcolo peso ideale range (BMI 18.5-24.9)
 * - Grafico visuale scala BMI
 * - 9 sezioni NEWS-style documentation
 *
 * @medical-references
 * - WHO BMI Classification Guidelines
 * - WHO Technical Report Series 894 (2000)
 */

// ============================================================
// IMPORTS
// ============================================================
import { ref, computed } from 'vue';
import { useResetForm } from 'src/composables/useResetForm';

// ============================================================
// TYPES & INTERFACES
// ============================================================

/**
 * BMI Calculator - Form data interface
 */
interface BMIFormData {
  /** Patient weight in kilograms */
  weight: number | null;
  /** Patient height in centimeters */
  height: number | null;
  /** Patient age in years */
  age: number | null;
  /** Patient gender: 'male' | 'female' */
  gender: 'male' | 'female' | null;
}

/**
 * BMI Calculator - Result interface
 */
interface BMIResult {
  /** Calculated BMI value */
  bmi: number;
  /** WHO BMI category classification */
  category: string;
  /** Color code for visual representation */
  color: string;
  /** Ideal weight range for patient height */
  idealWeight: {
    /** Minimum ideal weight (kg) */
    min: number;
    /** Maximum ideal weight (kg) */
    max: number;
  };
  /** Difference from ideal weight midpoint (kg) */
  weightDifference: number;
}

// ============================================================
// STATE
// ============================================================

const initialFormData: BMIFormData = {
  weight: null,
  height: null,
  age: null,
  gender: null,
};

const initialResult: BMIResult = {
  bmi: 0,
  category: '',
  color: 'grey',
  idealWeight: { min: 0, max: 0 },
  weightDifference: 0,
};

const formData = ref<BMIFormData>({ ...initialFormData });
const result = ref<BMIResult>({ ...initialResult });

const genderOptions = [
  { label: 'Maschio', value: 'male' },
  { label: 'Femmina', value: 'female' },
];

// ============================================================
// COMPOSABLES
// ============================================================

const { resetForm: resetFormData } = useResetForm(formData, result, initialFormData);

// ============================================================
// COMPUTED
// ============================================================

/**
 * Form validation
 */
const isFormValid = computed(() => {
  return (
    formData.value.weight !== null &&
    formData.value.weight > 0 &&
    formData.value.height !== null &&
    formData.value.height > 0
  );
});

// ============================================================
// FUNCTIONS
// ============================================================

/**
 * Reset form to initial state
 */
const resetForm = () => {
  resetFormData();
  result.value = { ...initialResult };
};

/**
 * Calculate BMI from weight and height
 * Formula: BMI = weight(kg) / height(m)²
 */
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

/**
 * Get WHO BMI classification
 */
const getBMIClassification = (bmi: number): { category: string; color: string } => {
  if (bmi < 18.5) return { category: 'Sottopeso', color: 'blue' };
  if (bmi <= 24.9) return { category: 'Normopeso', color: 'green' };
  if (bmi <= 29.9) return { category: 'Sovrappeso', color: 'orange' };
  if (bmi <= 34.9) return { category: 'Obesità Grado I', color: 'red' };
  if (bmi <= 39.9) return { category: 'Obesità Grado II', color: 'deep-orange' };
  return { category: 'Obesità Grado III', color: 'purple' };
};

/**
 * Get BMI position for visual scale (0-100%)
 */
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

/**
 * Get clinical notes based on BMI and age
 */
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

<template>
  <!-- ============================================================ -->
  <!-- BMI CALCULATOR COMPONENT                                     -->
  <!-- ============================================================ -->
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
            class="full-width q-mb-sm"
            icon="calculate"
            :disable="!isFormValid"
          >
            Calcola BMI
          </q-btn>
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

    <!-- Pannello Risultati -->
    <div class="col-12 col-md-6">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">📋 Risultati</h6>

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
              <strong>
                {{ result.idealWeight.min.toFixed(1) }} - {{ result.idealWeight.max.toFixed(1) }} kg
              </strong>
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
            <q-card class="q-pa-md">
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
            </q-card>
          </q-expansion-item>

          <!-- 1️⃣ Definizione e Significato Clinico -->
          <q-expansion-item
            icon="info"
            label="1️⃣ Definizione e Significato Clinico"
            class="q-mt-sm"
            header-class="bg-blue-1 text-blue-9"
          >
            <q-card class="bg-blue-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm">
                  <strong>Definizione:</strong> L'Indice di Massa Corporea (BMI - Body Mass Index) è
                  una misura indiretta dell'adiposità corporea che mette in relazione il peso e
                  l'altezza di un individuo. È il parametro antropometrico standard riconosciuto
                  dall'OMS per classificare lo stato ponderale e valutare il rischio sanitario
                  associato.
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>Significato Clinico:</strong> Il BMI è utilizzato per:
                </p>
                <ul class="text-body2">
                  <li>Screening di malnutrizione o obesità nella popolazione</li>
                  <li>Valutazione del rischio cardiovascolare e metabolico</li>
                  <li>Monitoraggio dell'efficacia di interventi nutrizionali</li>
                  <li>Stratificazione del rischio in contesti clinici e assicurativi</li>
                </ul>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- 2️⃣ Fisiologia e Interpretazione -->
          <q-expansion-item
            icon="science"
            label="2️⃣ Fisiologia e Interpretazione"
            class="q-mt-sm"
            header-class="bg-green-1 text-green-9"
          >
            <q-card class="bg-green-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm">
                  Il BMI fornisce una stima della massa grassa corporea, ma non distingue tra:
                </p>
                <ul class="text-body2 q-mb-sm">
                  <li>
                    <strong>Massa magra vs massa grassa:</strong> Atleti muscolosi possono avere BMI
                    elevato
                  </li>
                  <li>
                    <strong>Distribuzione del grasso:</strong> Grasso viscerale vs sottocutaneo
                  </li>
                  <li><strong>Composizione corporea:</strong> Idratazione, densità ossea</li>
                </ul>
                <p class="text-body2">
                  <strong>Limitazioni:</strong> Il BMI non tiene conto di età, sesso, etnia, massa
                  muscolare. Per valutazioni più precise considerare: circonferenza vita,
                  plicometria, impedenziometria, DEXA.
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- 3️⃣ Come si Misura -->
          <q-expansion-item
            icon="straighten"
            label="3️⃣ Come si Misura"
            class="q-mt-sm"
            header-class="bg-amber-1 text-amber-9"
          >
            <q-card class="bg-amber-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm">
                  <strong>Peso:</strong> Misurare al mattino, a digiuno, senza scarpe, con
                  abbigliamento leggero. Bilancia tarata e certificata.
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>Altezza:</strong> Misurare in posizione eretta, senza scarpe, talloni e
                  schiena contro parete, sguardo parallelo al suolo. Stadiometro calibrato.
                </p>
                <p class="text-body2">
                  <strong>Frequenza:</strong> Monitorare periodicamente (mensile/trimestrale) per
                  valutare trend e efficacia interventi.
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- 4️⃣ Formula di Calcolo -->
          <q-expansion-item
            icon="functions"
            label="4️⃣ Formula di Calcolo"
            class="q-mt-sm"
            header-class="bg-cyan-1 text-cyan-9"
          >
            <q-card class="bg-cyan-1">
              <q-card-section>
                <div class="text-body2 q-mb-sm">
                  <strong>Formula BMI (Quetelet Index):</strong>
                </div>
                <div class="bg-white q-pa-md text-center q-mb-sm">
                  <code class="text-h6">BMI = Peso (kg) / Altezza² (m²)</code>
                </div>
                <p class="text-body2 q-mb-sm">
                  <strong>Esempio:</strong><br />
                  Peso = 70 kg, Altezza = 175 cm = 1.75 m<br />
                  BMI = 70 / (1.75 × 1.75) = 70 / 3.0625 = <strong>22.9 kg/m²</strong> → Normopeso
                </p>
                <p class="text-caption text-grey-8">
                  Formula sviluppata da Adolphe Quetelet nel 1832, standardizzata dall'OMS.
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- 5️⃣ Interpretazione Risultati -->
          <q-expansion-item
            icon="psychology"
            label="5️⃣ Interpretazione Risultati"
            class="q-mt-sm"
            header-class="bg-orange-1 text-orange-9"
          >
            <q-card class="bg-orange-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm">
                  <strong>Classificazione WHO Adulti:</strong>
                </p>
                <ul class="text-body2 q-mb-sm">
                  <li><strong>&lt; 16.0:</strong> Grave magrezza (severe thinness)</li>
                  <li><strong>16.0 - 16.9:</strong> Magrezza moderata (moderate thinness)</li>
                  <li><strong>17.0 - 18.4:</strong> Lieve magrezza (mild thinness)</li>
                  <li><strong>18.5 - 24.9:</strong> ✅ Normopeso (normal range)</li>
                  <li><strong>25.0 - 29.9:</strong> Sovrappeso (pre-obesity)</li>
                  <li><strong>30.0 - 34.9:</strong> Obesità Classe I (obesity class I)</li>
                  <li><strong>35.0 - 39.9:</strong> Obesità Classe II (obesity class II)</li>
                  <li><strong>≥ 40.0:</strong> Obesità Classe III (obesity class III)</li>
                </ul>
                <p class="text-caption text-grey-8">
                  Per età &lt; 18 anni utilizzare percentili specifici CDC/WHO.
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- 6️⃣ Applicazioni Cliniche -->
          <q-expansion-item
            icon="local_hospital"
            label="6️⃣ Applicazioni Cliniche"
            class="q-mt-sm"
            header-class="bg-purple-1 text-purple-9"
          >
            <q-card class="bg-purple-1">
              <q-card-section>
                <ul class="text-body2">
                  <li>
                    <strong>Screening popolazione:</strong> Identificazione precoce
                    malnutrizione/obesità
                  </li>
                  <li>
                    <strong>Rischio cardiovascolare:</strong> BMI ≥25 aumenta rischio ipertensione,
                    diabete tipo 2, dislipidemia
                  </li>
                  <li>
                    <strong>Nutrizione clinica:</strong> Valutazione stato nutrizionale pre/post
                    intervento
                  </li>
                  <li>
                    <strong>Terapia farmacologica:</strong> Alcuni farmaci dosati in base a BMI (es.
                    eparina LMWH, chemioterapici)
                  </li>
                  <li>
                    <strong>Chirurgia bariatrica:</strong> Criteri eleggibilità (BMI ≥40 o ≥35 con
                    comorbidità)
                  </li>
                  <li>
                    <strong>Assicurazioni:</strong> Stratificazione rischio e premi assicurativi
                  </li>
                </ul>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- 7️⃣ Valori di Allerta e Azioni Cliniche -->
          <q-expansion-item
            icon="warning"
            label="7️⃣ Valori di Allerta e Azioni Cliniche"
            class="q-mt-sm"
            header-class="bg-red-1 text-red-9"
          >
            <q-card class="bg-red-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm">
                  <strong>🔴 BMI &lt; 16:</strong> Grave magrezza → Valutazione urgente
                  malnutrizione, disturbi alimentari, malassorbimento
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>🟠 BMI 16-18.4:</strong> Sottopeso → Consulto nutrizionale, screening
                  cause organiche
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>🟢 BMI 18.5-24.9:</strong> Normopeso → Mantenere stile vita sano,
                  follow-up annuale
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>🟡 BMI 25-29.9:</strong> Sovrappeso → Intervento dietetico, aumento
                  attività fisica
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>🔴 BMI 30-34.9:</strong> Obesità I → Programma strutturato perdita peso,
                  screening comorbidità
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>🔴🔴 BMI 35-39.9:</strong> Obesità II → Intervento multidisciplinare,
                  valutazione chirurgia bariatrica
                </p>
                <p class="text-body2">
                  <strong>🔴🔴🔴 BMI ≥40:</strong> Obesità III → Urgente consulto specialistico,
                  candidato chirurgia bariatrica
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- 8️⃣ Note Pratiche -->
          <q-expansion-item
            icon="menu_book"
            label="8️⃣ Note Pratiche e Documentazione"
            class="q-mt-sm"
            header-class="bg-indigo-1 text-indigo-9"
          >
            <q-card class="bg-indigo-1">
              <q-card-section>
                <p class="text-body2 q-mb-sm">
                  <strong>Documentazione Clinica:</strong> Registrare BMI in cartella clinica con
                  data, peso, altezza, trend temporale.
                </p>
                <p class="text-body2 q-mb-sm">
                  <strong>Considerazioni Speciali:</strong>
                </p>
                <ul class="text-body2 q-mb-sm">
                  <li>
                    <strong>Anziani (≥65 anni):</strong> BMI ottimale può essere leggermente
                    superiore (23-28) per protezione da fragilità
                  </li>
                  <li>
                    <strong>Gravidanza:</strong> Non utilizzare BMI standard, usare curve peso
                    gestazionale
                  </li>
                  <li>
                    <strong>Atleti:</strong> BMI può sovrastimare adiposità in presenza alta massa
                    muscolare
                  </li>
                  <li>
                    <strong>Etnie asiatiche:</strong> Cut-off inferiori (sovrappeso ≥23, obesità
                    ≥27.5)
                  </li>
                  <li>
                    <strong>Amputazioni:</strong> Utilizzare formule corrette per peso/BMI stimato
                  </li>
                </ul>
                <p class="text-caption text-grey-8">
                  Consultare sempre il medico per interpretazione contestualizzata.
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- 9️⃣ Riferimenti Scientifici -->
          <q-expansion-item
            icon="science"
            label="9️⃣ Riferimenti Scientifici"
            class="q-mt-sm"
            header-class="bg-teal-1 text-teal-9"
          >
            <q-card class="bg-teal-1">
              <q-card-section>
                <ul class="text-body2">
                  <li>
                    <strong>WHO (2000):</strong> Obesity: preventing and managing the global
                    epidemic. WHO Technical Report Series 894.
                  </li>
                  <li>
                    <strong>Quetelet A (1832):</strong> Research on the law of growth of man.
                    Nouveaux mémoires de l'Académie Royale des Sciences et Belles-Lettres de
                    Bruxelles.
                  </li>
                  <li>
                    <strong>Keys A et al. (1972):</strong> Indices of relative weight and obesity.
                    Journal of Chronic Diseases 25(6):329-343.
                  </li>
                  <li>
                    <strong>WHO Expert Consultation (2004):</strong> Appropriate body-mass index for
                    Asian populations. Lancet 363(9403):157-163.
                  </li>
                  <li>
                    <strong>CDC Growth Charts (2000):</strong> BMI-for-age percentiles for children
                    and adolescents 2-20 years.
                  </li>
                  <li>
                    <strong>NHLBI (1998):</strong> Clinical Guidelines on the Identification,
                    Evaluation, and Treatment of Overweight and Obesity in Adults.
                  </li>
                </ul>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- Note Cliniche Personalizzate -->
          <div class="q-mt-lg" v-if="result.bmi > 0">
            <q-card class="bg-blue-1 q-pa-md">
              <div class="text-subtitle2 q-mb-sm">💡 Note Cliniche:</div>
              <p class="text-body2">{{ getClinicalNotes() }}</p>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================ */
/* BMI VISUAL SCALE STYLES                                      */
/* ============================================================ */

.bmi-scale {
  position: relative;
  width: 100%;
}

.bmi-bar {
  position: relative;
  height: 30px;
  background: linear-gradient(
    to right,
    #2196f3 0%,
    #2196f3 20%,
    #4caf50 20%,
    #4caf50 45%,
    #ff9800 45%,
    #ff9800 65%,
    #f44336 65%,
    #f44336 80%,
    #e91e63 80%,
    #e91e63 100%
  );
  border-radius: 4px;
}

.bmi-indicator {
  position: absolute;
  top: -5px;
  width: 4px;
  height: 40px;
  background-color: #000;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: left 0.3s ease;
}

.bmi-labels {
  font-size: 11px;
  color: #666;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .bmi-bar {
    height: 25px;
  }

  .bmi-indicator {
    height: 35px;
  }
}
</style>
