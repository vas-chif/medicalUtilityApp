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

            <!-- 1️⃣ Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              label="1️⃣ Definizione e Significato Clinico"
              class="q-mt-sm"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2">
                  L'<strong>APGAR Score</strong> (Virginia Apgar, 1952) valuta rapidamente la
                  vitalità neonatale tramite 5 parametri: <strong>A</strong>ppearance (colorito),
                  <strong>P</strong>ulse (FC), <strong>G</strong>rimace (riflessi),
                  <strong>A</strong>ctivity (tono), <strong>R</strong>espiration (respirazione).
                  Punteggio 0-2 per parametro, totale 0-10. Valutato a 1min (adattamento immediato)
                  e 5min (stabilizzazione). Score 7-10: normale. 4-6: depressione moderata. 0-3:
                  depressione severa, rianimazione urgente.
                </div>
              </q-card>
            </q-expansion-item>

            <!-- Score Salvati -->
            <q-expansion-item
              v-if="savedScores.length > 0"
              icon="history"
              label="Valutazioni Salvate"
              class="q-mt-sm"
              header-class="bg-grey-3 text-grey-9"
            >
              <q-card class="q-pa-md bg-grey-1">
                <q-list dense>
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
              </q-card>
            </q-expansion-item>

            <!-- 2️⃣ Fisiologia e Meccanismi -->
            <q-expansion-item
              icon="science"
              label="2️⃣ Fisiologia Transizione Fetale-Neonatale"
              class="q-mt-sm"
              header-class="bg-green-1 text-green-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm">
                  <strong>Adattamenti Respiratori:</strong> Primo respiro (pressione -40/-60 cmH₂O)
                  espande polmoni, clearance liquido polmonare, attivazione surfactante. FR normale
                  40-60/min. Cianosi periferica (acrocianosi) normale prime 24h.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>Adattamenti Cardiovascolari:</strong> Clampaggio cordone + espansione
                  polmonare → ↓resistenza polmonare, ↑flusso polmoni, chiusura forame ovale e dotto
                  arterioso (10-15h). FC normale 120-160 bpm.
                </div>
                <div class="text-body2">
                  <strong>Vulnerabilità SNC:</strong> Cervello consuma 60% O₂ totale. Asfissia →
                  encefalopatia ipossico-ischemica (HIE) → rischio paralisi cerebrale, epilessia.
                  Neuroprotection: ipotermia terapeutica 33-34°C × 72h riduce mortalità/disabilità
                  ~40%.
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 3️⃣ Come si Calcola -->
            <q-expansion-item
              icon="calculate"
              label="3️⃣ Come si Valuta"
              class="q-mt-sm"
              header-class="bg-amber-1 text-amber-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm">
                  <strong>Timing:</strong> 1 minuto (adattamento immediato), 5 minuti
                  (stabilizzazione/risposta interventi). Se score &lt;7 a 5min → ripetere ogni 5min
                  (10, 15, 20min).
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>Metodi:</strong> Appearance (ispezione colorito), Pulse (auscultazione
                  precordiale 6sec×10 o palpazione cordone), Grimace (aspirazione nasofaringe),
                  Activity (osservare tono/movimenti), Respiration (osservare FR, pianto).
                </div>
                <div class="text-body2">
                  <strong>Operatori:</strong> Ostetrica (parti normali), Pediatra/Neonatologo (parti
                  a rischio, rianimazione). Personale competente rianimazione deve essere
                  disponibile a OGNI nascita (AAP/WHO standards).
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 4️⃣ Formula e Componenti -->
            <q-expansion-item
              icon="functions"
              label="4️⃣ Formula e Componenti"
              class="q-mt-sm"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-weight-bold text-center q-mb-md">
                  Score APGAR = A + P + G + A + R (0-10 punti totali)
                </div>
                <q-list dense separator>
                  <q-item>
                    <q-item-section>
                      <q-item-label>
                        <strong>A - Appearance:</strong> 0=cianosi/pallore, 1=corpo roseo estremità
                        blu, 2=completamente roseo
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>
                        <strong>P - Pulse:</strong> 0=assente, 1=&lt;100 bpm, 2=≥100 bpm
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>
                        <strong>G - Grimace:</strong> 0=nessuna risposta, 1=smorfie,
                        2=tosse/starnuto/pianto
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>
                        <strong>A - Activity:</strong> 0=flaccido, 1=qualche flessione, 2=movimenti
                        attivi
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>
                        <strong>R - Respiration:</strong> 0=assente, 1=debole/irregolare, 2=pianto
                        vigoroso
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </q-expansion-item>

            <!-- 5️⃣ Interpretazione Clinica -->
            <q-expansion-item
              icon="psychology"
              label="5️⃣ Interpretazione Clinica Dettagliata"
              class="q-mt-sm"
              header-class="bg-orange-1 text-orange-9"
            >
              <q-card class="q-pa-md">
                <q-list separator>
                  <q-item class="bg-green-1">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-green-9">
                        Score 7-10: Neonato Normale (Vigorous Infant)
                      </q-item-label>
                      <q-item-label class="q-mt-xs">
                        <strong>Significato:</strong> Adattamento cardio-respiratorio ottimale.
                        Neonato vigile, attivo, pianto forte. Score 8-9 comune (acrocianosi = -1
                        Appearance). <strong>Azione:</strong> Cure standard: asciugare, contatto
                        pelle-pelle con madre, monitoraggio temperatura, allattamento precoce entro
                        1h. Dimissione nido dopo 24-48h se parametri stabili.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-orange-2 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-orange-9">
                        Score 4-6: Depressione Moderata (Moderately Depressed)
                      </q-item-label>
                      <q-item-label class="q-mt-xs">
                        <strong>Significato:</strong> Difficoltà transizione, possibile ipossia
                        lieve, liquido polmonare residuo, prematurità lieve, farmaci materni
                        (oppioidi, solfato magnesio). <strong>Azione:</strong> Stimolazione tattile
                        vigorosa (strofinare schiena), aspirazione vie aeree, O₂ supplementare
                        30-40% con maschera/CPAP, monitoraggio SatO₂. Rivalutare APGAR 5min. Se
                        miglioramento → osservazione. Se persistenza → intensificare supporto.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-red-2 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-red-9">
                        🚨 Score 0-3: Depressione Severa (Severely Depressed)
                      </q-item-label>
                      <q-item-label class="q-mt-xs">
                        <strong>Significato EMERGENZA:</strong> Asfissia perinatale, apnea,
                        bradicardia/arresto cardiaco, shock. Rischio HIE elevato.
                        <strong>Azione IMMEDIATA:</strong> (1) Ventilazione pressione positiva (PPV)
                        con pallone Ambu + maschera O₂ 21-30%, FR 40-60/min, (2) Se FC&lt;60 dopo
                        30sec PPV → intubazione + compressioni toraciche 3:1 (3 compressioni:1
                        ventilazione), (3) Adrenalina IV/intraossea 0.01-0.03 mg/kg se FC&lt;60
                        persistente, (4) Valutare volume expansion se sospetto ipovolemia/shock.
                        APGAR 0-3 a 5min → considerare ipotermia terapeutica se criterio HIE.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </q-expansion-item>

            <!-- 6️⃣ Applicazioni Cliniche -->
            <q-expansion-item
              icon="medical_services"
              label="6️⃣ Applicazioni Cliniche"
              class="q-mt-sm"
              header-class="bg-purple-1 text-purple-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm">
                  <strong>1. Guida Rianimazione:</strong> APGAR 1min identifica neonati che
                  necessitano intervento immediato. Golden Minute: primi 60sec critici per
                  valutazione e inizio rianimazione. Rianimazione non attende APGAR se
                  apnea/bradicardia evidente.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>2. Valutazione Efficacia Interventi:</strong> APGAR 5min misura risposta a
                  rianimazione. Miglioramento 1min→5min (es. 3→8) = rianimazione efficace.
                  Persistenza score basso ≤3 a 5min = prognosi sfavorevole, alto rischio sequele.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>3. Comunicazione Standardizzata:</strong> Linguaggio universale per équipe
                  (ostetrica, pediatra, infermiera). Documentazione medico-legale essenziale.
                  Facilita handover neonato da sala parto a TIN (Terapia Intensiva Neonatale).
                </div>
                <div class="text-body2">
                  <strong>4. Ricerca e Audit:</strong> Database APGAR per analisi outcome
                  perinatali, qualità assistenza, comparazioni internazionali. Screening popolazioni
                  a rischio (diabete gestazionale, pre-eclampsia, parto pretermine).
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 7️⃣ Valori di Riferimento e Alert -->
            <q-expansion-item
              icon="warning"
              label="7️⃣ Valori di Riferimento e Alert"
              class="q-mt-sm"
              header-class="bg-red-1 text-red-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm">
                  <strong>APGAR 1 minuto:</strong> 7-10 (85-90% neonati), 4-6 (8-10%), 0-3 (1-2%).
                  Score basso 1min può essere transitorio, non sempre predice outcome.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>APGAR 5 minuti:</strong> 7-10 (95-98% neonati), 4-6 (2-3%), 0-3 (&lt;1%).
                  <strong>Valore prognostico forte:</strong> Score 5min 0-3 → mortalità neonatale
                  ×20-50, paralisi cerebrale ×10-100 vs score ≥7.
                </div>
                <div class="text-body2 q-mb-sm text-weight-bold text-red-9">
                  <strong>ALERT CRITICI:</strong> Score 5min ≤3 → alto rischio HIE, valutare
                  ipotermia terapeutica entro 6h. Score 0-3 persistente a 10-20min → mortalità ~50%,
                  disabilità maggiore 60-80% sopravviventi.
                </div>
                <div class="text-body2">
                  <strong>Fattori Confondenti:</strong> Prematurità (&lt;37 settimane) → score più
                  bassi normali per immaturità SNC/polmoni. Farmaci materni (oppioidi, solfato Mg) →
                  depressione transitoria. Anomalie congenite (cardiopatie, ernia diaframmatica) →
                  score basso non da asfissia.
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 8️⃣ Documentazione Medica e Linee Guida -->
            <q-expansion-item
              icon="menu_book"
              label="8️⃣ Documentazione e Linee Guida"
              class="q-mt-sm"
              header-class="bg-indigo-1 text-indigo-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm">
                  <strong>AAP/AHA Neonatal Resuscitation Program (NRP) 2020:</strong>
                  Raccomandazioni evidenze-based rianimazione neonatale. APGAR guida intensità
                  interventi ma rianimazione inizia immediatamente se apnea/FC&lt;100 alla nascita.
                  Golden Minute critico: 0-60sec valutazione + inizio PPV se necessaria.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>WHO Essential Newborn Care (2010):</strong> Standard globale assistenza
                  neonatale. APGAR Score obbligatorio a 1 e 5min in tutte nascite. Personale formato
                  rianimazione disponibile sempre. Ipotermia terapeutica per HIE moderata-severa
                  entro 6h (riduce mortalità/disabilità ~40%).
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>ILCOR Consensus (2020):</strong> International Liaison Committee on
                  Resuscitation. Algoritmo rianimazione neonatale: iniziare con aria ambiente (21%
                  O₂), titolare FiO₂ secondo SatO₂ target. Evitare iperossia (danno radicali
                  liberi).
                </div>
                <div class="text-body2">
                  <strong>ACOG Committee Opinion (2015):</strong> APGAR Score non deve essere usato
                  da solo per diagnosi asfissia. Necessari criteri aggiuntivi: pH cordone &lt;7.0,
                  deficit basi ≥12 mmol/L, encefalopatia neonatale, disfunzione multi-organo.
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 9️⃣ Riferimenti Scientifici PMID -->
            <q-expansion-item
              icon="library_books"
              label="9️⃣ Riferimenti Scientifici"
              class="q-mt-sm"
              header-class="bg-teal-1 text-teal-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm">
                  <strong
                    >Apgar V. "A proposal for a new method of evaluation of the newborn
                    infant"</strong
                  >
                  (1953). Curr Res Anesth Analg 32(4):260-267. PMID: 13083014. Studio originale che
                  introduce score. Validato su 2096 neonati, correlazione con mortalità e morbilità.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>Casey BM, et al. "The continuing value of the Apgar score"</strong>
                  (2001). N Engl J Med 344(7):467-471. PMID: 11172187. Large cohort 151,891 neonati.
                  Score 5min 0-3 predittore forte mortalità neonatale (OR 146 vs score 7-10) e
                  paralisi cerebrale (OR 244).
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>Li F, et al. "Apgar score and long-term health outcomes"</strong> (2019).
                  Pediatrics 143(4):e20182846. Meta-analisi 6.7M neonati. Score 5min &lt;7 associato
                  a ↑rischio epilessia (RR 4.8), ADHD (RR 1.9), disturbi spettro autistico (RR 1.5)
                  in follow-up 5-10 anni.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>MSD Manuals - Professional: Neonatal Resuscitation.</strong> Capitolo su
                  valutazione e rianimazione neonato. Include algoritmo AAP/AHA, indicazioni
                  intubazione, farmaci (adrenalina, volume expanders), gestione ipotermia
                  terapeutica.
                </div>
                <div class="text-body2">
                  <strong
                    >ScienceDirect Encyclopedia of Infant and Early Childhood Development
                    (2020):</strong
                  >
                  Capitolo "Apgar Score and Newborn Assessment". Trattazione completa storia,
                  fisiologia transizione neonatale, limitazioni score (prematurità, farmaci,
                  anomalie congenite), integrazione con altri assessment (pH cordone, lactato).
                </div>
              </q-card>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
