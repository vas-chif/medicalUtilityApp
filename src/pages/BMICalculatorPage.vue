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

            <!-- Documentazione Medica Scientifica -->
            <q-expansion-item
              icon="book"
              label="📚 Indici Antropometrici - Documentazione Scientifica"
              class="text-primary q-mt-md"
            >
              <div class="q-pa-md bg-grey-1">
                <!-- Body Mass Index (BMI) -->
                <div class="q-mb-lg">
                  <h6 class="text-subtitle1 text-weight-bold q-mb-sm">⚖️ Body Mass Index (BMI)</h6>
                  <p class="text-body2 q-mb-sm">
                    <strong>Definizione (Pande & Cheskin 2003):</strong> Il BMI è l'indice standard
                    per misurare il peso relativo corporeo (peso aggiustato per altezza). Correla
                    significativamente con il contenuto totale di grasso corporeo. Formula: BMI =
                    peso(kg)/[altezza(m)]².
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Classificazione WHO (Eaton-Evans 2005):</strong>
                  </p>
                  <ul class="text-body2 q-mb-sm">
                    <li>
                      <strong>Sottopeso:</strong> BMI &lt;18.5 kg/m² (↑mortalità, malnutrizione)
                    </li>
                    <li>
                      <strong>Normopeso:</strong> BMI 18.5-24.9 kg/m² (peso salutare, minima
                      mortalità)
                    </li>
                    <li>
                      <strong>Sovrappeso:</strong> BMI 25-29.9 kg/m² (↑rischio diabete, malattie
                      cardiovascolari)
                    </li>
                    <li>
                      <strong>Obesità Grado I:</strong> BMI 30-34.9 kg/m² (rischio moderato
                      complicanze metaboliche)
                    </li>
                    <li>
                      <strong>Obesità Grado II:</strong> BMI 35-39.9 kg/m² (rischio severo
                      complicanze metaboliche)
                    </li>
                    <li>
                      <strong>Obesità Grado III:</strong> BMI ≥40 kg/m² (obesità morbigena,
                      ↑mortalità 50-150%)
                    </li>
                  </ul>
                  <p class="text-body2 q-mb-sm">
                    <strong>Limitazioni (Gallagher et al. 2013):</strong> Non distingue tra massa
                    grassa e massa muscolare (atleti classificati erroneamente come sovrappeso).
                    Dipendente da età (↑grasso in anziani), sesso (↑grasso in maschi a parità BMI),
                    etnia (↑grasso in asiatici vs africani/caucasici). Non fornisce informazioni su
                    distribuzione grasso corporeo (girovita come modificatore importante del
                    rischio).
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Implicazioni Cliniche (Marcus 2013):</strong> BMI &gt;25 conferisce
                    ↑rischio per diabete, malattia coronarica, ictus, ipertensione, dislipidemia. La
                    perdita di peso in soggetti sovrappeso/obesi riduce fattori di rischio.
                    Monitoraggio BMI è pratico, rapido, economico per screening e valutazione
                    efficacia trattamento.
                  </p>
                </div>

                <!-- Ideal Body Weight (IBW) -->
                <div class="q-mb-lg">
                  <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                    🎯 Ideal Body Weight (IBW) - Peso Corporeo Ideale
                  </h6>
                  <p class="text-body2 q-mb-sm">
                    <strong>Definizione (Harvey 2006):</strong> IBW è il peso corporeo associato
                    alla minima mortalità per una data altezza, età, sesso e corporatura.
                    Tradizionalmente derivato dalle tabelle Metropolitan Life Insurance (1943,
                    revise 1959, 1983) basate su dati attuariali di americani sani che acquistavano
                    polizze assicurative.
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Formule di Stima:</strong>
                  </p>
                  <ul class="text-body2 q-mb-sm">
                    <li>
                      <strong>Formula Hamwi (anni '60 - Fox & McClung 2004):</strong><br />
                      Maschi: IBW (lb) = 106 + 6 × [pollici sopra 5 piedi] → IBW (kg) = 48 + 2.7 ×
                      [cm sopra 152]<br />
                      Femmine: IBW (lb) = 100 + 5 × [pollici sopra 5 piedi] → IBW (kg) = 45 + 2.25 ×
                      [cm sopra 152]<br />
                      <em>IBW ±10% (Hughes & Yowler 2013)</em>
                    </li>
                    <li>
                      <strong>Formula Robinson (1983 - alternativa):</strong><br />
                      Maschi: IBW (kg) = 52 + 1.9 × [pollici sopra 5 piedi]<br />
                      Femmine: IBW (kg) = 49 + 1.7 × [pollici sopra 5 piedi]
                    </li>
                    <li>
                      <strong>Formula Predicted Body Weight (ARDS, Brower 2002):</strong><br />
                      Maschi: PBW (kg) = 50 + 2.3 × [pollici - 60] = 50 + 0.91 × [cm - 152.4]<br />
                      Femmine: PBW (kg) = 45.5 + 2.3 × [pollici - 60] = 45.5 + 0.91 × [cm -
                      152.4]<br />
                      <em
                        >Utilizzato per calcolo volume tidalico protettivo in ventilazione meccanica
                        (6 mL/kg PBW).</em
                      >
                    </li>
                  </ul>
                  <p class="text-body2 q-mb-sm">
                    <strong>Applicazioni Cliniche (Binkley & Jensen 2005):</strong> IBW utilizzato
                    per: calcolo fabbisogni nutrizionali (energia, proteine), dosaggio farmaci
                    (soprattutto in obesi), ventilazione meccanica (volumi tidalici), valutazione
                    stato nutrizionale (rapporto peso attuale/IBW: &gt;90% lieve malnutrizione,
                    70-85% moderata, &lt;75% severa).
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Limitazioni (Nejat & Pal 2010):</strong> Tabelle Metropolitan Life non
                    adeguate agli estremi di altezza, difficile ottenere range di riferimento
                    desiderato, non forniscono dati per etnie diverse e background socioeconomico
                    basso. BMI ha sostituito IBW come standard per definizione eccesso peso
                    corporeo.
                  </p>
                </div>

                <!-- Adjusted Body Weight (ABW) -->
                <div class="q-mb-lg">
                  <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                    📊 Adjusted Body Weight (ABW) - Peso Corporeo Corretto
                  </h6>
                  <p class="text-body2 q-mb-sm">
                    <strong>Definizione (Binkley & Jensen 2005):</strong> ABW è un peso corretto
                    utilizzato per pazienti obesi (peso attuale significativamente &gt;IBW) per
                    calcoli dosaggio farmaci e fabbisogni nutrizionali. Formula più comune:
                  </p>
                  <p class="text-body2 q-mb-sm text-weight-bold">
                    ABW (kg) = IBW + 0.25 × (peso attuale - IBW)
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Razionale (Harvey 2006):</strong> Pazienti obesi hanno ↑massa magra
                    oltre a ↑massa grassa. ABW considera che ~25% dell'eccesso di peso è massa
                    metabolicamente attiva (richiedente calorie/proteine). Utilizzato per: calcolo
                    calorie, proteine, dosaggio farmaci liposolubili (aminoglicosidi,
                    chemioterapici).
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Formula Pediatrica (Samuels & Sjoblom 2017):</strong><br />
                    Total Body Weight (TBW) = peso reale<br />
                    Ideal Body Weight (IBW) = BMI 50° percentile per età × [altezza(m)]²<br />
                    Low Body Weight (LBW) = IBW + 0.3 × (TBW - IBW)<br />
                    <em
                      >Utilizzato per dosaggio farmaci in obesità pediatrica (propofol, rocuronio,
                      succinilcolina su TBW; altri anestetici su IBW/LBW).</em
                    >
                  </p>
                </div>

                <!-- Body Surface Area (BSA) -->
                <div class="q-mb-lg">
                  <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                    📐 Body Surface Area (BSA) - Superficie Corporea
                  </h6>
                  <p class="text-body2 q-mb-sm">
                    <strong>Definizione:</strong> BSA è la superficie esterna totale del corpo umano
                    espressa in m². Utilizzata per normalizzazione dosaggi farmacologici
                    (chemioterapia, immunosoppressori), calcolo indici fisiologici (GFR, cardiac
                    index), valutazione estensione ustioni (TBSA - Total Body Surface Area).
                  </p>
                  <p class="text-body2 q-mb-sm"><strong>Formule di Stima:</strong></p>
                  <ul class="text-body2 q-mb-sm">
                    <li>
                      <strong>Formula Mosteller (1987 - più semplice, raccomandata):</strong><br />
                      BSA (m²) = √[(altezza(cm) × peso(kg)) / 3600]<br />
                      <em
                        >Esempio: altezza 170cm, peso 70kg → BSA = √(170×70/3600) = √3.31 = 1.82
                        m²</em
                      >
                    </li>
                    <li>
                      <strong>Formula DuBois & DuBois (1916 - storica):</strong><br />
                      BSA (m²) = 0.007184 × [altezza(cm)]<sup>0.725</sup> × [peso(kg)]<sup
                        >0.425</sup
                      ><br />
                      <em>Formula originale ma più complessa computazionalmente.</em>
                    </li>
                    <li>
                      <strong>Formula Haycock (1978 - pediatrica):</strong><br />
                      BSA (m²) = 0.024265 × [altezza(cm)]<sup>0.3964</sup> × [peso(kg)]<sup
                        >0.5378</sup
                      ><br />
                      <em>Più accurata in neonati e bambini piccoli.</em>
                    </li>
                  </ul>
                  <p class="text-body2 q-mb-sm">
                    <strong>Applicazioni Cliniche:</strong>
                  </p>
                  <ul class="text-body2 q-mb-sm">
                    <li>
                      <strong>Oncologia:</strong> Dosaggio chemioterapici basato su BSA (mg/m²) -
                      riduce tossicità ed efficacia ottimizzata. Farmaci: cisplatino, carboplatino,
                      doxorubicina, metotrexate, ciclofosfamide.
                    </li>
                    <li>
                      <strong>Nefrologia:</strong> GFR normalizzato per BSA (mL/min/1.73m²) per
                      confrontabilità tra individui di diverse dimensioni corporee.
                    </li>
                    <li>
                      <strong>Cardiologia:</strong> Cardiac Index (CI) = Cardiac Output / BSA
                      (normale 2.5-4.0 L/min/m²). Stroke Volume Index = SV / BSA.
                    </li>
                    <li>
                      <strong>Chirurgia Plastica/Ustioni:</strong> Calcolo TBSA% (Total Body Surface
                      Area burned) per determinare fabbisogno fluidico (formula Parkland: 4mL ×
                      peso(kg) × TBSA% nelle prime 24h).
                    </li>
                  </ul>
                  <p class="text-body2 q-mb-sm">
                    <strong>Valori Medi:</strong> Adulti: 1.6-2.0 m² (donne ~1.6m², uomini ~1.9m²).
                    Neonati a termine: ~0.25m². Superficie corpo umano ~16000-20000 cm² (1.6-2.0
                    m²).
                  </p>
                </div>

                <!-- Riferimenti Scientifici -->
                <div>
                  <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                    📖 Riferimenti Scientifici
                  </h6>
                  <ul class="text-caption">
                    <li>
                      <strong>Pande H, Cheskin LJ (2003).</strong> "OBESITY | Etiology and
                      Diagnosis" in Encyclopedia of Food Sciences and Nutrition (Second Edition).
                      ScienceDirect. BMI formula, WHO classification, increased mortality risk (BMI
                      ≥30 → +50-150% death risk).
                    </li>
                    <li>
                      <strong>Eaton-Evans J (2005).</strong> "NUTRITIONAL ASSESSMENT |
                      Anthropometry" in Encyclopedia of Human Nutrition (Second Edition).
                      ScienceDirect. BMI screening obesity and underweight, correlation body fat,
                      limitations (muscle vs fat).
                    </li>
                    <li>
                      <strong>Gallagher D, Akram M (2013).</strong> "Body Composition" in
                      Encyclopedia of Human Nutrition (Third Edition). ScienceDirect. BMI
                      age/sex/race dependence, percent body fat prediction variations.
                    </li>
                    <li>
                      <strong>Marcus JB (2013).</strong> "Weight Management: Finding the Healthy
                      Balance" in Culinary Nutrition. ScienceDirect. BMI calculation examples,
                      health risk categories, weight screening tool.
                    </li>
                    <li>
                      <strong>Harvey KS (2006).</strong> "Proceedings of the 4th International
                      Congress on Uremia Research and Toxicity" in Journal of Renal Nutrition, Vol
                      16(3): 267-270. ScienceDirect. IBW vs ABW vs SBW vs BMI comparison,
                      Metropolitan Life Insurance tables history, clinical practice recommendations
                      for CKD patients.
                    </li>
                    <li>
                      <strong>Fox VJ, McClung M (2004).</strong> "Nutrition in Critical Care" in
                      Critical Care Nursing Clinics of North America, Vol 16(4): 469-475.
                      ScienceDirect. IBW formulas (men/women), ±10% range.
                    </li>
                    <li>
                      <strong>Hughes P, Yowler CJ (2013).</strong> "Nutrition for the Oral and
                      Maxillofacial Surgery Patient" in Oral and Maxillofacial Trauma (Fourth
                      Edition). ScienceDirect. IBW formulas with age correction (>50 years +10%),
                      malnutrition staging (actual/IBW ratio).
                    </li>
                    <li>
                      <strong>Brower RG (2002).</strong> "New Management Strategies in ARDS" in
                      Critical Care Clinics, Vol 18(1): 91-104. ScienceDirect. Predicted Body Weight
                      (PBW) for protective mechanical ventilation (6 mL/kg PBW tidal volume).
                    </li>
                    <li>
                      <strong>Binkley J, Jensen GL (2005).</strong> "NUTRITIONAL SUPPORT | Adults,
                      Parenteral" in Encyclopedia of Human Nutrition (Second Edition).
                      ScienceDirect. IBW and ABW formulas for nutritional needs calculation, ABW =
                      IBW + 0.25×(actual - IBW).
                    </li>
                    <li>
                      <strong>Samuels PJ, Sjoblom MD (2017).</strong> "Pediatric Obesity" in Smith's
                      Anesthesia for Infants and Children (Ninth Edition). ScienceDirect.
                      TBW/IBW/LBW definitions for pediatric drug dosing, obesity anesthesia
                      considerations.
                    </li>
                    <li>
                      <strong>Nejat EJ, Pal L (2010).</strong> "Predictors of Chronic Disease at
                      Midlife" in Maturitas, Vol 65(4): 305-309. ScienceDirect. Ideal body weight
                      concept evolution, Metropolitan Life tables limitations, BMI as standard
                      replacement.
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

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useResetForm } from 'src/composables/useResetForm';

// Interfaccia per i dati del form
interface BMIFormData {
  weight: number | null; // Peso in kg
  height: number | null; // Altezza in cm
  age: number | null; // Età in anni
  gender: 'male' | 'female' | null; // Sesso
}

// Interfaccia per il risultato
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

// Stato iniziale
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

// Dati reattivi del form
const formData = ref<BMIFormData>({ ...initialFormData });

// Opzioni per il sesso
const genderOptions = [
  { label: 'Maschio', value: 'male' },
  { label: 'Femmina', value: 'female' },
];

// Risultato del calcolo
const result = ref<BMIResult>({ ...initialResult });

// Reset form composable
const { resetForm: resetFormData } = useResetForm(formData, result, initialFormData);

const resetForm = () => {
  resetFormData();
  result.value = { ...initialResult };
};

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
