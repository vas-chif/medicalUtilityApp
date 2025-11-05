<template>
  <q-page class="q-pa-md">
    <!-- Header con breadcrumb -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
        <q-breadcrumbs-el label="APGAR Score" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">👶 APGAR Score Calculator</h4>
      <p class="text-subtitle1 text-grey-7">Valutazione clinica del neonato alla nascita</p>
    </div>

    <div class="row q-gutter-lg">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri APGAR</h6>

            <!-- Tempo valutazione -->
            <q-select
              v-model="currentTime"
              :options="timeOptions"
              label="Tempo di Valutazione"
              outlined
              class="q-mb-md"
              emit-value
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="schedule" color="blue" />
              </template>
            </q-select>

            <q-separator class="q-mb-md" />

            <!-- A - Appearance (Colorito) -->
            <div class="q-mb-lg">
              <div class="text-h6 q-mb-sm">
                <q-icon name="palette" color="pink" class="q-mr-sm" />
                A - Appearance (Colorito)
              </div>
              <q-radio
                v-model="scores.appearance"
                :val="0"
                label="Blu, pallido"
                class="q-mb-sm full-width"
                color="primary"
              />
              <q-radio
                v-model="scores.appearance"
                :val="1"
                label="Corpo roseo, estremità blu (acrocianosi)"
                class="q-mb-sm full-width"
                color="primary"
              />
              <q-radio
                v-model="scores.appearance"
                :val="2"
                label="Completamente roseo"
                class="full-width"
                color="primary"
              />
            </div>

            <!-- P - Pulse (Frequenza Cardiaca) -->
            <div class="q-mb-lg">
              <div class="text-h6 q-mb-sm">
                <q-icon name="favorite" color="red" class="q-mr-sm" />
                P - Pulse (Frequenza Cardiaca)
              </div>
              <q-radio
                v-model="scores.pulse"
                :val="0"
                label="Assente"
                class="q-mb-sm full-width"
                color="primary"
              />
              <q-radio
                v-model="scores.pulse"
                :val="1"
                label="< 100 bpm"
                class="q-mb-sm full-width"
                color="primary"
              />
              <q-radio
                v-model="scores.pulse"
                :val="2"
                label="≥ 100 bpm"
                class="full-width"
                color="primary"
              />
            </div>

            <!-- G - Grimace (Riflessi/Irritabilità) -->
            <div class="q-mb-lg">
              <div class="text-h6 q-mb-sm">
                <q-icon name="sentiment_neutral" color="orange" class="q-mr-sm" />
                G - Grimace (Riflessi)
              </div>
              <q-radio
                v-model="scores.grimace"
                :val="0"
                label="Nessuna risposta"
                class="q-mb-sm full-width"
                color="primary"
              />
              <q-radio
                v-model="scores.grimace"
                :val="1"
                label="Smorfie"
                class="q-mb-sm full-width"
                color="primary"
              />
              <q-radio
                v-model="scores.grimace"
                :val="2"
                label="Tosse, starnuto, pianto"
                class="full-width"
                color="primary"
              />
            </div>

            <!-- A - Activity (Tono Muscolare) -->
            <div class="q-mb-lg">
              <div class="text-h6 q-mb-sm">
                <q-icon name="accessibility" color="green" class="q-mr-sm" />
                A - Activity (Tono Muscolare)
              </div>
              <q-radio
                v-model="scores.activity"
                :val="0"
                label="Flaccido"
                class="q-mb-sm full-width"
                color="primary"
              />
              <q-radio
                v-model="scores.activity"
                :val="1"
                label="Qualche flessione"
                class="q-mb-sm full-width"
                color="primary"
              />
              <q-radio
                v-model="scores.activity"
                :val="2"
                label="Movimenti attivi"
                class="full-width"
                color="primary"
              />
            </div>

            <!-- R - Respiration (Respirazione) -->
            <div class="q-mb-lg">
              <div class="text-h6 q-mb-sm">
                <q-icon name="air" color="cyan" class="q-mr-sm" />
                R - Respiration (Respirazione)
              </div>
              <q-radio
                v-model="scores.respiration"
                :val="0"
                label="Assente"
                class="q-mb-sm full-width"
                color="primary"
              />
              <q-radio
                v-model="scores.respiration"
                :val="1"
                label="Debole, irregolare"
                class="q-mb-sm full-width"
                color="primary"
              />
              <q-radio
                v-model="scores.respiration"
                :val="2"
                label="Buona, pianto vigoroso"
                class="full-width"
                color="primary"
              />
            </div>

            <!-- Bottone Salva -->
            <q-btn
              @click="saveScore"
              color="primary"
              size="lg"
              class="full-width"
              icon="save"
              :disable="!isFormComplete"
            >
              Salva Valutazione {{ currentTime }} min
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📈 Risultati APGAR</h6>

            <!-- Score Corrente -->
            <div class="text-center q-mb-lg">
              <div class="text-h2 text-primary q-mb-sm">
                {{ totalScore }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>APGAR Score</strong> ({{ currentTime }} min)
              </div>
              <q-chip
                :color="getScoreColor(totalScore)"
                text-color="white"
                class="text-weight-bold q-mt-sm"
                size="lg"
              >
                {{ getScoreInterpretation(totalScore) }}
              </q-chip>
            </div>

            <!-- Breakdown Score -->
            <div class="q-mb-lg" v-if="totalScore > 0">
              <div class="text-h6 q-mb-sm">📊 Dettaglio Valutazione:</div>
              <div class="row q-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-linear-progress
                    :value="scores.appearance / 2"
                    color="pink"
                    class="q-mb-xs"
                    size="lg"
                  />
                  <div class="text-caption">Appearance: {{ scores.appearance }}/2</div>
                </div>
                <div class="col-12 col-sm-6">
                  <q-linear-progress
                    :value="scores.pulse / 2"
                    color="red"
                    class="q-mb-xs"
                    size="lg"
                  />
                  <div class="text-caption">Pulse: {{ scores.pulse }}/2</div>
                </div>
                <div class="col-12 col-sm-6">
                  <q-linear-progress
                    :value="scores.grimace / 2"
                    color="orange"
                    class="q-mb-xs"
                    size="lg"
                  />
                  <div class="text-caption">Grimace: {{ scores.grimace }}/2</div>
                </div>
                <div class="col-12 col-sm-6">
                  <q-linear-progress
                    :value="scores.activity / 2"
                    color="green"
                    class="q-mb-xs"
                    size="lg"
                  />
                  <div class="text-caption">Activity: {{ scores.activity }}/2</div>
                </div>
                <div class="col-12">
                  <q-linear-progress
                    :value="scores.respiration / 2"
                    color="cyan"
                    class="q-mb-xs"
                    size="lg"
                  />
                  <div class="text-caption">Respiration: {{ scores.respiration }}/2</div>
                </div>
              </div>
            </div>

            <!-- Storico Valutazioni -->
            <div class="q-mb-lg" v-if="savedScores.length > 0">
              <div class="text-h6 q-mb-sm">📋 Storico Valutazioni:</div>
              <q-timeline>
                <q-timeline-entry
                  v-for="score in savedScores"
                  :key="score.time"
                  :title="`${score.time} minuto/i`"
                  :subtitle="`APGAR: ${score.total}`"
                  :color="getScoreColor(score.total)"
                  icon="child_care"
                >
                  <div class="text-caption">
                    A:{{ score.scores.appearance }} P:{{ score.scores.pulse }} G:{{
                      score.scores.grimace
                    }}
                    A:{{ score.scores.activity }} R:{{ score.scores.respiration }}
                  </div>
                  <q-chip :color="getScoreColor(score.total)" text-color="white" size="sm">
                    {{ getScoreInterpretation(score.total) }}
                  </q-chip>
                </q-timeline-entry>
              </q-timeline>
            </div>

            <!-- Interpretazione Clinica -->
            <q-expansion-item icon="info" label="📚 Interpretazione APGAR" class="text-primary">
              <div class="q-pa-md bg-grey-1">
                <div class="row q-gutter-sm text-caption">
                  <div class="col-12">
                    <span class="text-weight-bold text-green">7-10:</span> Normale - Neonato in
                    buone condizioni
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-orange">4-6:</span> Moderatamente depresso -
                    Necessita assistenza
                  </div>
                  <div class="col-12">
                    <span class="text-weight-bold text-red">0-3:</span> Severamente depresso -
                    Rianimazione urgente
                  </div>
                </div>
                <div class="q-mt-md text-body2">
                  <strong>Nota:</strong> APGAR non predice outcome neurologico a lungo termine. È
                  uno strumento di valutazione immediata per guidare la rianimazione neonatale.
                </div>
              </div>
            </q-expansion-item>

            <!-- Azioni Cliniche -->
            <q-expansion-item
              icon="medical_services"
              label="🚨 Azioni Cliniche Suggerite"
              class="text-primary q-mt-sm"
              v-if="totalScore > 0"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="text-body2">
                  {{ getClinicalActions(totalScore) }}
                </div>
              </div>
            </q-expansion-item>

            <!-- Reset -->
            <q-btn
              @click="resetForm"
              color="negative"
              outline
              class="full-width q-mt-md"
              icon="refresh"
              label="Reset Valutazione"
              v-if="savedScores.length > 0"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Interfacce
interface APGARScores {
  appearance: number; // 0-2
  pulse: number; // 0-2
  grimace: number; // 0-2
  activity: number; // 0-2
  respiration: number; // 0-2
}

interface SavedAPGAR {
  time: number;
  scores: APGARScores;
  total: number;
  timestamp: Date;
}

// Dati reattivi
const currentTime = ref<number>(1);
const scores = ref<APGARScores>({
  appearance: 0,
  pulse: 0,
  grimace: 0,
  activity: 0,
  respiration: 0,
});

const savedScores = ref<SavedAPGAR[]>([]);

// Opzioni
const timeOptions = [
  { label: '1 minuto', value: 1 },
  { label: '5 minuti', value: 5 },
  { label: '10 minuti', value: 10 },
];

// Computed
const totalScore = computed(() => {
  return (
    scores.value.appearance +
    scores.value.pulse +
    scores.value.grimace +
    scores.value.activity +
    scores.value.respiration
  );
});

const isFormComplete = computed(() => {
  return Object.values(scores.value).every((score) => score >= 0 && score <= 2);
});

// Funzioni
const saveScore = () => {
  if (!isFormComplete.value) return;

  const newScore: SavedAPGAR = {
    time: currentTime.value,
    scores: { ...scores.value },
    total: totalScore.value,
    timestamp: new Date(),
  };

  // Rimuovi score esistente per questo tempo
  savedScores.value = savedScores.value.filter((s) => s.time !== currentTime.value);

  // Aggiungi nuovo score
  savedScores.value.push(newScore);

  // Ordina per tempo
  savedScores.value.sort((a, b) => a.time - b.time);

  // Avanza al prossimo tempo di valutazione
  if (currentTime.value === 1) {
    currentTime.value = 5;
    resetCurrentScores();
  } else if (currentTime.value === 5) {
    currentTime.value = 10;
    resetCurrentScores();
  }
};

const resetCurrentScores = () => {
  scores.value = {
    appearance: 0,
    pulse: 0,
    grimace: 0,
    activity: 0,
    respiration: 0,
  };
};

const resetForm = () => {
  savedScores.value = [];
  currentTime.value = 1;
  resetCurrentScores();
};

const getScoreColor = (score: number): string => {
  if (score >= 7) return 'green';
  if (score >= 4) return 'orange';
  return 'red';
};

const getScoreInterpretation = (score: number): string => {
  if (score >= 7) return 'Normale';
  if (score >= 4) return 'Moderatamente Depresso';
  return 'Severamente Depresso';
};

const getClinicalActions = (score: number): string => {
  if (score >= 7) {
    return 'Neonato in buone condizioni. Proseguire con cure standard: asciugare, riscaldare, valutazione continua. Supporto ai genitori per bonding e allattamento.';
  } else if (score >= 4) {
    return 'Neonato moderatamente depresso. Azioni necessarie: stimolazione tattile, aspirazione vie aeree se necessario, ossigenoterapia. Rivalutazione frequente ogni 30 secondi.';
  } else {
    return 'Neonato severamente depresso. RIANIMAZIONE URGENTE: ventilazione a pressione positiva, compressioni toraciche se FC < 60 bpm, considerare intubazione e farmaci. Allertare team di rianimazione neonatale.';
  }
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

.q-radio {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  transition: border-color 0.3s ease;
}

.q-radio:hover {
  border-color: var(--q-primary);
}

.q-radio.q-radio--checked {
  border-color: var(--q-primary);
  background-color: rgba(25, 118, 210, 0.1);
}

.q-linear-progress {
  border-radius: 4px;
}

.q-timeline {
  max-height: 300px;
  overflow-y: auto;
}
</style>
