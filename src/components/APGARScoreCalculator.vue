<!-- APGARScoreCalculator.vue -->
<script setup lang="ts">
/**
 * @file APGARScoreCalculator.vue
 * @description Componente calcolatore APGAR Score (estratto da APGARScorePage)
 * @author Vasile Chifeac
 * @created 2025-19-01
 * @modified 2025-11-06
 * @description APGAR Score Calculator - Valutazione clinica del neonato alla nascita
 */

import { ref, computed } from 'vue';
import { useResetForm } from 'src/composables/useResetForm';

// ============================================================
// TYPES & INTERFACES
// ============================================================
interface APGARScores {
  appearance: number;
  pulse: number;
  grimace: number;
  activity: number;
  respiration: number;
}

interface SavedAPGAR {
  time: number;
  scores: APGARScores;
  total: number;
  timestamp: Date;
}

// ============================================================
// STATE
// ============================================================
const initialScores: APGARScores = {
  appearance: 0,
  pulse: 0,
  grimace: 0,
  activity: 0,
  respiration: 0,
};

const scores = ref<APGARScores>({ ...initialScores });
const currentTime = ref<number>(1);
const savedScores = ref<SavedAPGAR[]>([]);

const { resetForm: resetScores } = useResetForm(scores, currentTime, initialScores);

const resetForm = () => {
  resetScores();
  currentTime.value = 1;
  savedScores.value = [];
};

const timeOptions = [
  { label: '1 minuto', value: 1 },
  { label: '5 minuti', value: 5 },
  { label: '10 minuti', value: 10 },
];

// ============================================================
// COMPUTED
// ============================================================
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

// ============================================================
// FUNCTIONS
// ============================================================
const saveScore = (): void => {
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

const resetCurrentScores = (): void => {
  scores.value = { ...initialScores };
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
    return 'Neonato in buone condizioni. Cure standard: asciugare, riscaldare, valutazione continua.';
  } else if (score >= 4) {
    return 'Neonato moderatamente depresso. Stimolazione tattile, aspirazione vie aeree, ossigenoterapia.';
  } else {
    return 'Neonato severamente depresso. RIANIMAZIONE URGENTE: ventilazione, compressioni se FC < 60 bpm.';
  }
};
</script>

<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-pink-1 text-pink-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="child_care" color="pink" />
      </template>
      <div class="text-body2">
        <strong>APGAR Score:</strong> Valutazione rapida dello stato clinico del neonato a 1, 5 e 10
        minuti. Acronimo: <strong>A</strong>ppearance, <strong>P</strong>ulse,
        <strong>G</strong>rimace, <strong>A</strong>ctivity, <strong>R</strong>espiration.
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <!-- Tempo valutazione -->
            <q-select
              v-model="currentTime"
              :options="timeOptions"
              label="Tempo di Valutazione"
              outlined
              dense
              class="q-mb-md"
              emit-value
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="schedule" color="blue" size="sm" />
              </template>
            </q-select>

            <q-separator class="q-mb-md" />

            <!-- A - Appearance -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="palette" color="pink" size="xs" class="q-mr-xs" />
                A - Appearance (Colorito)
              </div>
              <q-option-group
                v-model="scores.appearance"
                :options="[
                  { label: 'Blu, pallido', value: 0 },
                  { label: 'Corpo roseo, estremità blu', value: 1 },
                  { label: 'Completamente roseo', value: 2 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- P - Pulse -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="favorite" color="red" size="xs" class="q-mr-xs" />
                P - Pulse (Frequenza Cardiaca)
              </div>
              <q-option-group
                v-model="scores.pulse"
                :options="[
                  { label: 'Assente', value: 0 },
                  { label: '< 100 bpm', value: 1 },
                  { label: '≥ 100 bpm', value: 2 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- G - Grimace -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="sentiment_neutral" color="orange" size="xs" class="q-mr-xs" />
                G - Grimace (Riflessi)
              </div>
              <q-option-group
                v-model="scores.grimace"
                :options="[
                  { label: 'Nessuna risposta', value: 0 },
                  { label: 'Smorfie', value: 1 },
                  { label: 'Tosse, starnuto, pianto', value: 2 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- A - Activity -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="accessibility" color="green" size="xs" class="q-mr-xs" />
                A - Activity (Tono Muscolare)
              </div>
              <q-option-group
                v-model="scores.activity"
                :options="[
                  { label: 'Flaccido', value: 0 },
                  { label: 'Qualche flessione', value: 1 },
                  { label: 'Movimenti attivi', value: 2 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- R - Respiration -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="air" color="cyan" size="xs" class="q-mr-xs" />
                R - Respiration (Respirazione)
              </div>
              <q-option-group
                v-model="scores.respiration"
                :options="[
                  { label: 'Assente', value: 0 },
                  { label: 'Debole, irregolare', value: 1 },
                  { label: 'Buona, pianto vigoroso', value: 2 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- Bottoni -->
            <q-btn
              @click="saveScore"
              color="primary"
              size="md"
              class="full-width q-mb-xs"
              icon="save"
              :disable="!isFormComplete"
            >
              Salva {{ currentTime }} min
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

            <!-- Score Corrente -->
            <div class="text-center q-mb-md">
              <div class="text-h3" :class="`text-${getScoreColor(totalScore)}`">
                {{ totalScore }}
              </div>
              <div class="text-caption text-grey-7">Score Totale / 10</div>
            </div>

            <!-- Interpretazione -->
            <q-chip
              :color="getScoreColor(totalScore)"
              text-color="white"
              class="full-width text-center q-mb-sm"
            >
              {{ getScoreInterpretation(totalScore) }}
            </q-chip>

            <!-- Progress Bar -->
            <q-linear-progress
              :value="totalScore / 10"
              :color="getScoreColor(totalScore)"
              size="12px"
              class="q-mb-md"
            />

            <!-- Azioni Cliniche -->
            <q-expansion-item icon="medical_services" label="Azioni Cliniche" dense default-opened>
              <div class="q-pa-sm bg-grey-1">
                <div class="text-caption text-grey-8">
                  {{ getClinicalActions(totalScore) }}
                </div>
              </div>
            </q-expansion-item>

            <!-- Score Salvati -->
            <q-expansion-item
              v-if="savedScores.length > 0"
              icon="history"
              label="Valutazioni Salvate"
              dense
              class="q-mt-xs"
            >
              <q-list dense class="bg-grey-1">
                <q-item v-for="saved in savedScores" :key="saved.time">
                  <q-item-section avatar>
                    <q-chip :color="getScoreColor(saved.total)" text-color="white" dense>
                      {{ saved.time }}min
                    </q-chip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">
                      Score: {{ saved.total }}/10
                    </q-item-label>
                    <q-item-label caption>
                      {{ getScoreInterpretation(saved.total) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>

            <!-- Interpretazione Valori -->
            <q-expansion-item icon="info" label="Interpretazione Valori" dense class="q-mt-xs">
              <q-list dense class="bg-blue-1">
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="green" name="check_circle" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>7-10:</strong> Neonato normale - cure standard
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="orange" name="warning" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>4-6:</strong> Moderatamente depresso - stimolazione e O₂
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="red" name="dangerous" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>0-3:</strong> Severamente depresso - rianimazione urgente
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
