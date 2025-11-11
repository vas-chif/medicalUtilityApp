<!-- GCSCalculator.vue -->
<script setup lang="ts">
/**
 * * @file GCSCalculator.vue
 * @description Glasgow Coma Scale Calculator component
 * @author Vasile Chifeac
 * @created 2025-01-06
 * @modified 2025-11-06
 * Glasgow Coma Scale - Valutazione livello di coscienza (Teasdale & Jennett 1974)
 */

import { ref, computed } from 'vue';

// ============================================================
// TYPES & INTERFACES
// ============================================================
interface GCSScores {
  eye: number;
  verbal: number;
  motor: number;
}

// ============================================================
// STATE
// ============================================================
const initialScores: GCSScores = {
  eye: 4,
  verbal: 5,
  motor: 6,
};

const scores = ref<GCSScores>({ ...initialScores });

const resetForm = () => {
  scores.value = { ...initialScores };
};

// ============================================================
// COMPUTED
// ============================================================
/**
 * Calculate total GCS score
 * @returns Total score (3-15)
 */
const totalScore = computed(() => {
  return scores.value.eye + scores.value.verbal + scores.value.motor;
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Get score color based on severity
 * @param score - GCS total score
 * @returns Quasar color name
 */
const getScoreColor = (score: number): string => {
  if (score >= 13) return 'green'; // Mild TBI
  if (score >= 9) return 'orange'; // Moderate TBI
  return 'red'; // Severe TBI / Coma
};

/**
 * Get score interpretation
 * @param score - GCS total score
 * @returns Clinical interpretation string
 */
const getScoreInterpretation = (score: number): string => {
  if (score >= 13) return 'TBI Lieve - Commozione';
  if (score >= 9) return 'TBI Moderato - Letargia';
  return 'TBI Severo - Coma';
};

/**
 * Get TBI severity description
 * @param score - GCS total score
 * @returns Severity description
 */
const getTBISeverity = (score: number): string => {
  if (score === 15) {
    return 'GCS 15: Completamente sveglio e orientato. Nessun deficit neurologico evidente.';
  }
  if (score >= 13) {
    return 'GCS 13-15: Trauma Cranico LIEVE. Commozione cerebrale, possibile perdita memoria breve termine o difficoltà concentrazione. Recupero neurologico completo atteso.';
  }
  if (score >= 9) {
    return 'GCS 9-12: Trauma Cranico MODERATO. Paziente letargico o stuporoso. 10-20% rischio deterioramento in coma. Necessario ricovero e monitoraggio continuo.';
  }
  return 'GCS 3-8: Trauma Cranico SEVERO (COMA). Paziente non apre occhi, non obbedisce comandi, non pronuncia parole. Alta probabilità necessità intubazione e ventilazione meccanica. Massimo rischio mortalità e morbidità.';
};

/**
 * Get clinical actions based on score
 * @param score - GCS total score
 * @returns Clinical action recommendations
 */
const getClinicalActions = (score: number): string => {
  if (score >= 13) {
    return '✅ Osservazione clinica. TC cranio se indicata. Rivalutazioni GCS ogni 15-30 min inizialmente. Istruzioni dimissione se GCS stabile 15.';
  }
  if (score >= 9) {
    return '⚠️ Ricovero obbligatorio. TC cranio urgente. Monitoraggio neurologico ogni 15 min. NON intubazione routinaria se vie aeree protette. Preparazione per possibile deterioramento.';
  }
  if (score >= 3) {
    return '🚨 GESTIONE URGENTE: Intubazione endotracheale immediata. TC cranio emergenza. Monitoraggio PIC (Pressione Intracranica). Ventilazione meccanica. Sedazione e analgesia. Valutare neurochirurgia urgente se ematoma.';
  }
  return 'GCS score impossibile < 3';
};
</script>

<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="psychology" color="blue" />
      </template>
      <div class="text-body2">
        <strong>Glasgow Coma Scale (GCS):</strong> Scala standardizzata per valutazione neurologica
        del livello di coscienza. Range: 3-15 (3=coma profondo, 15=completamente sveglio).
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <!-- Eye Opening (E) -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="visibility" color="blue" size="xs" class="q-mr-xs" />
                E - Eye Opening (Apertura Occhi)
              </div>
              <q-option-group
                v-model="scores.eye"
                :options="[
                  { label: 'Spontanea', value: 4 },
                  { label: 'A stimolo verbale', value: 3 },
                  { label: 'A stimolo doloroso', value: 2 },
                  { label: 'Assente', value: 1 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- Verbal Response (V) -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="record_voice_over" color="green" size="xs" class="q-mr-xs" />
                V - Verbal Response (Risposta Verbale)
              </div>
              <q-option-group
                v-model="scores.verbal"
                :options="[
                  { label: 'Orientato e conversa', value: 5 },
                  { label: 'Confuso / Disorientato', value: 4 },
                  { label: 'Parole inappropriate', value: 3 },
                  { label: 'Suoni incomprensibili', value: 2 },
                  { label: 'Nessuna risposta', value: 1 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- Motor Response (M) -->
            <div class="q-mb-md">
              <div class="text-subtitle2 text-weight-bold q-mb-xs">
                <q-icon name="accessibility_new" color="orange" size="xs" class="q-mr-xs" />
                M - Motor Response (Risposta Motoria)
              </div>
              <q-option-group
                v-model="scores.motor"
                :options="[
                  { label: 'Obbedisce ai comandi', value: 6 },
                  { label: 'Localizza stimolo doloroso', value: 5 },
                  { label: 'Si ritrae dal dolore', value: 4 },
                  { label: 'Flessione anomala (decorticazione)', value: 3 },
                  { label: 'Estensione anomala (decerebrazione)', value: 2 },
                  { label: 'Nessuna risposta', value: 1 },
                ]"
                color="primary"
                size="sm"
                dense
              />
            </div>

            <!-- Bottoni -->
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

            <!-- Score Totale -->
            <div class="text-center q-mb-md">
              <div class="text-h3" :class="`text-${getScoreColor(totalScore)}`">
                {{ totalScore }}
              </div>
              <div class="text-caption text-grey-7">GCS Total Score / 15</div>
              <div class="text-caption text-grey-6 q-mt-xs">
                E{{ scores.eye }} V{{ scores.verbal }} M{{ scores.motor }}
              </div>
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
              :value="(totalScore - 3) / 12"
              :color="getScoreColor(totalScore)"
              size="12px"
              class="q-mb-md"
            />

            <!-- Severità TBI -->
            <q-expansion-item
              icon="local_hospital"
              label="Severità Trauma Cranico"
              dense
              default-opened
            >
              <div class="q-pa-sm bg-grey-1">
                <div class="text-caption text-grey-8">
                  {{ getTBISeverity(totalScore) }}
                </div>
              </div>
            </q-expansion-item>

            <!-- Azioni Cliniche -->
            <q-expansion-item icon="medical_services" label="Azioni Cliniche" dense class="q-mt-xs">
              <div class="q-pa-sm bg-grey-1">
                <div class="text-caption text-grey-8">
                  {{ getClinicalActions(totalScore) }}
                </div>
              </div>
            </q-expansion-item>

            <!-- Guida Interpretazione -->
            <q-expansion-item icon="info" label="Guida Interpretazione" dense class="q-mt-xs">
              <q-list dense class="bg-blue-1">
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="red" name="dangerous" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>3-8:</strong> TBI Severo - Coma, richiede intubazione
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="orange" name="warning" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>9-12:</strong> TBI Moderato - Letargia/stupor
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="green" name="check_circle" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>13-15:</strong> TBI Lieve - Commozione, recupero atteso
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Documentazione Scientifica -->
      <div class="col-12">
        <q-card flat bordered class="q-mt-md">
          <q-card-section>
            <!-- 📊 Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              label="📊 Definizione e Significato Clinico GCS"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Glasgow Coma Scale (GCS):</strong> Sistema di valutazione oggettiva
                  livello di coscienza sviluppato 1974 da Teasdale & Jennett (Glasgow, Scozia).
                  Valuta 3 componenti: <strong>Eye opening (1-4)</strong>,
                  <strong>Verbal response (1-5)</strong>, <strong>Motor response (1-6)</strong>.
                  Punteggio totale 3-15: 13-15 TBI lieve, 9-12 moderato, 3-8 severo/coma. Gold
                  standard mondiale valutazione neurologica acuta (trauma, stroke, coma metabolico).
                </div>
                <div class="text-caption text-grey-8">
                  <strong>Applicazioni:</strong> Triage emergenza, decisioni intubazione,
                  monitoraggio deterioramento neurologico ICU, prognosi outcome TBI (mortalità,
                  disabilità), comunicazione standardizzata équipe, ricerca clinica (inclusion
                  criteria trials).
                </div>
              </div>
            </q-expansion-item>

            <!-- 🔬 Fisiologia Coscienza e SNC -->
            <q-expansion-item
              icon="science"
              label="🔬 Fisiologia della Coscienza e Funzione SNC"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Coscienza:</strong> Stato di consapevolezza sé + ambiente, richiede 2
                  componenti: (1) <strong>Arousal</strong> (veglia) da sistema reticolare attivante
                  ascendente (ARAS) tronco encefalico-talamo, (2) <strong>Awareness</strong>
                  (contenuto) da corteccia cerebrale bilaterale. Lesioni ARAS → coma (assenza
                  arousal). Lesioni corticali diffuse → stato vegetativo (arousal preservato,
                  awareness perso).
                </div>
                <div class="text-caption text-grey-8">
                  <strong>Vie Nervose GCS:</strong> Eye opening: ARAS + nuclei oculomotori tronco.
                  Verbal: corteccia frontale Broca + temporale Wernicke + vie cortico-bulbari
                  motorie laringe. Motor: corteccia motoria primaria + vie
                  piramidale/extrapiramidale + midollo spinale. Lesione qualunque livello → deficit
                  GCS corrispondente.
                </div>
              </div>
            </q-expansion-item>

            <!-- 📏 Come si Valuta -->
            <q-expansion-item
              icon="straighten"
              label="📏 Come si Valuta il GCS"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Timing:</strong> Valutazione iniziale emergenza, ripetere ogni 15-30min in
                  fase acuta, ogni 1-4h in ICU secondo stabilità. Documentare score componenti
                  separati (E4V5M6 = 15) non solo totale.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Stimoli:</strong> Eye: chiamata verbale → se no risposta, stimolo
                  doloroso. Verbal: domande orientamento (nome, luogo, data). Motor: comando ("alza
                  braccia") → se no risposta, stimolo doloroso (pressione letto ungueale, sterno,
                  sovraorbitale). Usare stimolo adeguato crescente intensità.
                </div>
                <div class="text-caption text-grey-8">
                  <strong>Operatori:</strong> Medici emergenza, infermieri ICU, paramedici
                  pre-ospedalieri. Training: riduce variabilità inter-rater (affidabilità
                  κ=0.6-0.8). Notare: GCS_T se intubato, GCS_C se non testabile (edema palpebrale
                  trauma orbitale, barriera linguistica).
                </div>
              </div>
            </q-expansion-item>

            <!-- 🧮 Formula e Componenti -->
            <q-expansion-item
              icon="calculate"
              label="🧮 Formula e Componenti GCS"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-caption text-grey-8 q-mb-sm text-center text-weight-bold">
                  GCS = Eye Opening (E) + Verbal Response (V) + Motor Response (M)
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Eye (E 1-4):</strong> 4=spontaneo, 3=a comando verbale, 2=a dolore,
                  1=assente
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Verbal (V 1-5):</strong> 5=orientato, 4=confuso, 3=parole inappropriate,
                  2=suoni incomprensibili, 1=assente
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Motor (M 1-6):</strong> 6=obbedisce comandi, 5=localizza dolore, 4=ritira
                  a dolore (flessione normale), 3=flessione anomala decorticata, 2=estensione
                  decerebrata, 1=assente
                </div>
                <div class="text-caption text-grey-8">
                  <strong>Range:</strong> Min=3 (E1V1M1 coma profondo/morte cerebrale), Max=15
                  (E4V5M6 normale). Modificatori: T (intubato), C (non testabile es. edema occhi).
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
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>GCS 15 (E4V5M6):</strong> Coscienza normale, completamente sveglio e
                  orientato. Paziente risponde appropriatamente. Esclude grave TBI ma non lesioni
                  minori (fratture cranio, emorragie subdurali piccole).
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>GCS 13-14 (TBI Lieve):</strong> Confusione lieve, amnesia post-traumatica
                  possibile. CT cranio indicato se: perdita coscienza, amnesia, vomito, età &gt;65,
                  cefalea severa, anticoagulanti (NICE Head Injury Guidelines). Prognosi: recupero
                  completo &gt;95% casi. Sindrome post-concussiva 10-20%: cefalea, vertigini,
                  disturbi concentrazione persistenti 3-12 mesi.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>GCS 9-12 (TBI Moderato):</strong> Letargia, obnubilamento, confusione
                  marcata. CT cranio obbligatorio. Indicazioni ICU: deterioramento GCS, lesioni TC
                  (contusioni, ematomi), frattura base cranica. Monitoraggio q1-2h. Prognosi:
                  recupero buono 60-80%, disabilità moderata 10-20%, mortalità ~5-10%.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>GCS 3-8 (TBI Severo/Coma):</strong> Coma, incapacità proteggere vie aeree,
                  riflessi compromessi. <strong>Emergenza:</strong> intubazione immediata
                  (protezione vie aeree, controllo PaCO₂ target 35-40 mmHg), TC cranio urgente,
                  ricovero ICU neurochirurgica. Monitoraggio PIC (pressione intracranica) se GCS ≤8.
                  Prognosi: mortalità 30-50%, stato vegetativo persistente 5-10%, disabilità severa
                  20-30%, recupero buono solo 10-20%.
                </div>
                <div class="text-caption text-grey-8">
                  <strong>GCS 3 (E1V1M1):</strong> Coma profondissimo, prognosi infausta. Possibile
                  morte cerebrale se assenza riflessi tronco (pupillare, corneale, oculocefalico,
                  tosse). Test apnea e EEG per conferma morte cerebrale. Considerare limitazione
                  cure dopo discussione famiglia se prognosi neurologica recupero &lt;1%.
                </div>
              </div>
            </q-expansion-item>

            <!-- 🔬 Applicazioni Cliniche -->
            <q-expansion-item
              icon="medical_services"
              label="🔬 Applicazioni Cliniche del GCS"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>1. Triage Emergenza e Decisioni Immediate:</strong> GCS ≤8 → intubazione
                  emergenza (protezione vie aeree, controllo ventilazione). GCS 9-12 → osservazione
                  stretta, TC cranio, possibile ICU. GCS ≥13 → valutazione completa, TC se indicato,
                  possibile dimissione con istruzioni head injury.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>2. Monitoraggio Deterioramento Neurologico:</strong> ↓GCS ≥2 punti in 1-2h
                  → ALERT deterioramento neurologico. Cause: ematoma espansivo (epidurale,
                  subdurale), edema cerebrale, erniazione transtentoriale, ipertensione
                  intracranica, idrocefalo acuto. Azione: TC cranio urgente, consulenza
                  neurochirurgica, considerare craniotomia decompressiva.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>3. Prognosi Outcome TBI:</strong> GCS 3-8h post-trauma predittore forte
                  outcome 6-12 mesi. GCS 3-5 → mortalità ~70%, recupero favorevole &lt;5%. GCS 6-8 →
                  mortalità ~40%, recupero favorevole ~20%. GCS 9-12 → mortalità ~10%, recupero
                  favorevole ~70%. Integrazione con età, pupille, TC Marshall score migliora
                  predizione.
                </div>
                <div class="text-caption text-grey-8">
                  <strong>4. Ricerca e Standardizzazione:</strong> GCS è criterio
                  inclusione/esclusione trials TBI. Classificazione standardizzata permette
                  comparazione studi internazionali. Database CRASH (Corticosteroid Randomization
                  After Significant Head Injury) 10.000+ pazienti usa GCS come outcome primario.
                </div>
              </div>
            </q-expansion-item>

            <!-- ⚠️ Valori di Riferimento e Alert -->
            <q-expansion-item
              icon="warning"
              label="⚠️ Valori di Riferimento e Alert Critici"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Classificazione TBI WHO/NIH:</strong> Lieve GCS 13-15 (80% casi TBI),
                  Moderato GCS 9-12 (10%), Severo GCS 3-8 (10%). Mortalità: lieve &lt;1%, moderato
                  5-10%, severo 30-50%.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs text-weight-bold text-red-9">
                  <strong>ALERT CRITICI GCS:</strong> (1) GCS ≤8 → intubazione immediata +
                  ventilazione, (2) ↓GCS ≥2 punti → TC cranio urgente + neurochirurgia, (3) GCS 3 +
                  pupille fisse bilaterali → prognosi infausta, morte cerebrale imminente, (4) GCS
                  15 → TC se perdita coscienza anche breve (NICE guidelines).
                </div>
                <div class="text-caption text-grey-8">
                  <strong>Limitazioni GCS:</strong> Pazienti intubati → Verbal score non valutabile
                  (notare GCS_T, max=10). Sedazione/farmaci → altera score (sospendere prima
                  valutazione quando possibile). Edema orbitale → Eye non valutabile (GCS_C). Afasia
                  → Verbal ridotto non per coma. Paralisi → Motor ridotto. Integrazione con pupille,
                  riflessi tronco, imaging necessaria per diagnosi completa.
                </div>
              </div>
            </q-expansion-item>

            <!-- 📚 Documentazione Medica Scientifica -->
            <q-expansion-item
              icon="menu_book"
              label="📚 Documentazione e Linee Guida"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>NICE Head Injury Guidelines (2023):</strong> Raccomandazioni UK
                  evidence-based gestione trauma cranico. Indicazioni CT cranio: GCS &lt;13
                  iniziale, GCS &lt;15 a 2h, sospetta frattura cranica aperta/depressa, segni
                  frattura base cranica, crisi epilettiche post-traumatiche, deficit neurologici
                  focali, &gt;1 episodio vomito, amnesia eventi &gt;30min pre-trauma.
                  Anticoagulanti/antiagreganti → CT sempre anche se GCS 15.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Brain Trauma Foundation Guidelines (2016):</strong> Standard gestione TBI
                  severo USA. GCS ≤8 → monitoraggio PIC (pressione intracranica, target &lt;22
                  mmHg), CPP (pressione perfusione cerebrale 60-70 mmHg), mantenere PaCO₂ 35-40 mmHg
                  (evitare iperventilazione prolungata → ischemia), osmoterapia (mannitolo/salina
                  ipertonica) se ↑PIC, craniotomia decompressiva se PIC refrattaria. Evitare
                  ipotensione (PA sistolica &gt;90 mmHg), ipossia (SatO₂ &gt;90%), ipotermia
                  (normotermia target).
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>WHO Classification TBI Severity (2008):</strong> Lieve (GCS 13-15),
                  Moderato (9-12), Severo (3-8). Include anche durata perdita coscienza (LOC) e
                  amnesia post-traumatica (PTA) come criteri ausiliari. Lieve: LOC 0-30min, PTA
                  &lt;24h. Moderato: LOC 30min-24h, PTA 1-7 giorni. Severo: LOC &gt;24h, PTA &gt;7
                  giorni.
                </div>
                <div class="text-caption text-grey-8">
                  <strong>American College of Surgeons ATLS (2018):</strong> Advanced Trauma Life
                  Support. GCS componente primario triage trauma. Usare GCS motore (M) se totale non
                  disponibile. GCS motor ≤5 → trauma center Level I/II. GCS iniziale Pre-Hospital +
                  GCS ospedaliero a 6-12h combinati predicono meglio outcome che singola
                  misurazione.
                </div>
              </div>
            </q-expansion-item>

            <!-- 📖 Riferimenti Scientifici -->
            <q-expansion-item
              icon="import_contacts"
              label="📖 Riferimenti Scientifici"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong
                    >Teasdale G, Jennett B. "Assessment of coma and impaired consciousness"</strong
                  >
                  (1974). Lancet 2(7872):81-84. PMID: 4136544. Studio originale GCS. Validazione su
                  700 pazienti coma da trauma/stroke/farmaci. Inter-rater reliability κ=0.83.
                  Predizione outcome mortalità/disabilità.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong
                    >Marmarou A, et al. "Impact of ICP instability and hypotension on
                    outcome"</strong
                  >
                  (1991). J Neurosurg 75:S59-S66. Traumatic Coma Data Bank 1030 pazienti TBI severo.
                  GCS ≤8 + ipotensione → mortalità ×2. GCS + PIC + età modello predittivo outcome
                  accuratezza 80%.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>MRC CRASH Trial Collaborators. "Predicting outcome after TBI"</strong>
                  (2008). BMJ 336(7641):425-429. PMID: 18270239. 10.008 pazienti TBI 40 paesi. GCS,
                  età, pupille predittori indipendenti mortalità 14-giorni. Calculator prognostico
                  online validato (crash2.lshtm.ac.uk).
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Reith FC, et al. "Reliability of GCS in TBI"</strong> (2016). Acta
                  Neurochir 158:123-129. Systematic review affidabilità GCS. Inter-rater κ=0.60-0.85
                  (buona). Componente Motor più affidabile (κ=0.85) vs Verbal (κ=0.65). Training
                  migliora concordanza +15-20%.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>MSD Manuals - Professional: Traumatic Brain Injury.</strong> Capitolo
                  gestione TBI. Include GCS, classificazione severity, imaging (CT/MRI), gestione
                  ↑PIC, prognosi, riabilitazione. Algoritmi decisione intubazione, osmoterapia,
                  neurochirurgia.
                </div>
                <div class="text-caption text-grey-8">
                  <strong>ScienceDirect Encyclopedia of the Neurological Sciences (2021):</strong>
                  Capitolo "Glasgow Coma Scale and Consciousness Assessment". Storia GCS,
                  neurofisiologia coscienza (ARAS, corteccia), varianti GCS (pediatrico,
                  semplificato AVPU), limitazioni, alternative (Full Outline UnResponsiveness FOUR
                  score).
                </div>
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- DOCUMENTAZIONE MEDICA COMPLETA ESTESA                   -->
    <!-- ======================================================== -->

    <!-- 1️⃣ DEFINIZIONE E STORIA -->
    <q-expansion-item
      icon="history_edu"
      label="📚 Definizione e Storia del GCS"
      class="q-mt-md"
      header-class="bg-blue-1 text-blue-9"
    >
      <q-card flat class="q-pa-md bg-blue-1">
        <div class="text-body2 q-mb-md">
          <p class="text-weight-bold text-h6 q-mb-sm">Origine Storica</p>
          <p>
            La <strong>Glasgow Coma Scale (GCS)</strong> è stata sviluppata nel
            <strong>1974</strong> da <strong>Graham Teasdale e Bryan Jennett</strong> all'Università
            di Glasgow, Scozia.
          </p>
          <p class="q-mt-md">
            <strong>Obiettivo originale:</strong> Standardizzare le osservazioni del livello di
            coscienza in pazienti con danno cerebrale causato da trauma, insulti vascolari,
            infezioni, disturbi metabolici o overdose farmacologiche.
          </p>
          <p class="q-mt-md">
            <strong>Caratteristiche distintive:</strong>
          </p>
          <ul class="q-ml-md">
            <li>
              ✅ Può essere graduata <strong>rapidamente</strong> senza apparecchiature diagnostiche
            </li>
            <li>
              ✅ Sottoposta a <strong>estensivi test</strong> di affidabilità inter-rater e
              intra-rater
            </li>
            <li>✅ <strong>Accettata universalmente</strong> e utilizzata in tutto il mondo</li>
            <li>✅ Standard method per valutazione neurologica (Jinadasa & Boone 2016)</li>
          </ul>
        </div>

        <q-separator class="q-my-md" />

        <div class="text-body2">
          <p class="text-weight-bold text-h6 q-mb-sm">Sistema di Punteggio: 3 Componenti</p>
          <p>
            Il GCS valuta <strong>3 parametri clinici</strong> indipendenti, con punteggio da
            <strong>3 (minimo) a 15 (massimo)</strong>:
          </p>

          <div class="q-mt-md">
            <p class="text-weight-bold">
              1️⃣ <strong>Eye Opening (E)</strong> - Apertura Occhi (1-4 punti):
            </p>
            <ul class="q-ml-md">
              <li><strong>4:</strong> Spontanea</li>
              <li><strong>3:</strong> A stimolo verbale</li>
              <li><strong>2:</strong> A stimolo doloroso</li>
              <li><strong>1:</strong> Assente</li>
            </ul>
            <p class="q-mt-xs text-grey-8">
              <em>Dimostra attività del tronco encefalico</em>
            </p>
          </div>

          <div class="q-mt-md">
            <p class="text-weight-bold">
              2️⃣ <strong>Verbal Response (V)</strong> - Risposta Verbale (1-5 punti):
            </p>
            <ul class="q-ml-md">
              <li><strong>5:</strong> Orientato e conversa</li>
              <li><strong>4:</strong> Confuso / Disorientato</li>
              <li><strong>3:</strong> Parole inappropriate</li>
              <li><strong>2:</strong> Suoni incomprensibili</li>
              <li><strong>1:</strong> Nessuna risposta</li>
            </ul>
            <p class="q-mt-xs text-grey-8">
              <em>Mostra capacità SNC di integrare informazioni</em>
            </p>
          </div>

          <div class="q-mt-md">
            <p class="text-weight-bold">
              3️⃣ <strong>Motor Response (M)</strong> - Risposta Motoria (1-6 punti):
            </p>
            <ul class="q-ml-md">
              <li><strong>6:</strong> Obbedisce ai comandi</li>
              <li><strong>5:</strong> Localizza stimolo doloroso</li>
              <li><strong>4:</strong> Si ritrae dal dolore (flessione normale)</li>
              <li><strong>3:</strong> Flessione anomala - <strong>Decorticazione</strong></li>
              <li><strong>2:</strong> Estensione anomala - <strong>Decerebrazione</strong></li>
              <li><strong>1:</strong> Nessuna risposta</li>
            </ul>
            <p class="q-mt-xs text-grey-8">
              <em>Valuta livello funzione SNC</em>
            </p>
          </div>

          <q-separator class="q-my-md" />

          <p class="text-weight-bold">📝 Notazione Standard:</p>
          <p class="q-ml-md">
            Il GCS viene sempre espresso come: <strong>GCS = E + V + M</strong><br />
            Esempio: Paziente con E3 V4 M5 = <strong>GCS 12</strong><br />
            <em
              >Importante registrare i punteggi individuali per monitorare cambiamenti specifici</em
            >
          </p>

          <p class="text-weight-bold q-mt-md">🔤 Notazione per Pazienti Intubati:</p>
          <p class="q-ml-md">
            Usa lettera <strong>T</strong> per indicare intubazione: GCS 8T<br />
            <em>Impossibile valutare risposta verbale con tubo endotracheale</em>
          </p>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- 2️⃣ CLASSIFICAZIONE SEVERITÀ TBI -->
    <q-expansion-item
      icon="emergency"
      label="🎯 Classificazione Severità Trauma Cranico (TBI)"
      class="q-mt-sm"
      header-class="bg-orange-1 text-orange-9"
    >
      <q-card flat class="q-pa-md bg-orange-1">
        <div class="text-body2">
          <p class="text-weight-bold text-h6 q-mb-sm">Classificazione Standard TBI per GCS</p>

          <div class="q-mb-lg">
            <q-chip color="green" text-color="white" dense class="q-mb-sm">
              <q-icon name="check_circle" class="q-mr-xs" />
              GCS 13-15: TBI LIEVE
            </q-chip>
            <p class="q-mt-sm">
              <strong>Caratteristiche cliniche:</strong>
            </p>
            <ul class="q-ml-md">
              <li>Usualmente <strong>commozione cerebrale (concussion)</strong></li>
              <li>Possibile perdita memoria a breve termine</li>
              <li>Difficoltà di concentrazione</li>
              <li><strong>Recupero neurologico completo atteso</strong></li>
              <li>Paziente generalmente sveglio e responsivo</li>
            </ul>
            <p class="q-mt-sm">
              <strong>Management:</strong>
            </p>
            <ul class="q-ml-md">
              <li>✅ Osservazione clinica ravvicinata</li>
              <li>✅ TC cranio se indicata clinicamente</li>
              <li>✅ Rivalutazioni GCS frequenti (ogni 15-30 min inizialmente)</li>
              <li>✅ Istruzioni dimissione se GCS stabile 15</li>
            </ul>
          </div>

          <q-separator class="q-my-lg" />

          <div class="q-mb-lg">
            <q-chip color="orange" text-color="white" dense class="q-mb-sm">
              <q-icon name="warning" class="q-mr-xs" />
              GCS 9-12: TBI MODERATO
            </q-chip>
            <p class="q-mt-sm">
              <strong>Caratteristiche cliniche:</strong>
            </p>
            <ul class="q-ml-md">
              <li>Paziente inizialmente <strong>letargico o stuporoso</strong></li>
              <li><strong>10-20% si deteriora</strong> e progredisce in coma</li>
              <li>Risposta confusa o inappropriata</li>
              <li>Possibile deficit neurologico focale</li>
            </ul>
            <p class="q-mt-sm">
              <strong>Management:</strong>
            </p>
            <ul class="q-ml-md">
              <li>⚠️ <strong>Ricovero ospedaliero obbligatorio</strong></li>
              <li>⚠️ TC cranio urgente</li>
              <li>⚠️ Monitoraggio neurologico continuo (ogni 15 min)</li>
              <li>⚠️ <strong>NON intubazione routinaria</strong> se vie aeree protette</li>
              <li>⚠️ Preparazione per possibile deterioramento</li>
            </ul>
            <p class="q-mt-md">
              <q-banner class="bg-orange-2 text-orange-9" dense rounded>
                <template v-slot:avatar>
                  <q-icon name="info" color="orange" />
                </template>
                <strong>ATTENZIONE:</strong> Il timing management lesioni maxillofacciali dipende da
                stabilità GCS - differire se paziente a rischio deterioramento
              </q-banner>
            </p>
          </div>

          <q-separator class="q-my-lg" />

          <div class="q-mb-lg">
            <q-chip color="red" text-color="white" dense class="q-mb-sm">
              <q-icon name="dangerous" class="q-mr-xs" />
              GCS 3-8: TBI SEVERO (COMA)
            </q-chip>
            <p class="q-mt-sm">
              <strong>Definizione di COMA per GCS:</strong>
            </p>
            <ul class="q-ml-md">
              <li>❌ NON apertura occhi</li>
              <li>❌ NON obbedisce comandi</li>
              <li>❌ NON pronuncia parole riconoscibili</li>
            </ul>
            <p class="q-mt-md">
              <strong>Caratteristiche cliniche:</strong>
            </p>
            <ul class="q-ml-md">
              <li>Paziente <strong>comatoso</strong></li>
              <li><strong>Massimo rischio</strong> mortalità e morbidità</li>
              <li>Alta probabilità necessità <strong>ventilazione meccanica</strong></li>
              <li>Spesso lesioni maxillofacciali concomitanti complicano vie aeree</li>
            </ul>
            <p class="q-mt-sm">
              <strong>Management URGENTE:</strong>
            </p>
            <ul class="q-ml-md">
              <li>
                🚨 <strong>Intubazione endotracheale IMMEDIATA</strong> per protezione vie aeree
              </li>
              <li>🚨 <strong>TC cranio emergenza</strong></li>
              <li>
                🚨 <strong>Monitoraggio PIC</strong> (Pressione Intracranica) - difficile valutare
                deterioramento neurologico senza monitor PIC a GCS ≤ 8
              </li>
              <li>🚨 Mantenere PPC (Pressione Perfusione Cerebrale) > 60 mmHg</li>
              <li>🚨 Ventilazione meccanica con target PaCO₂ 35-40 mmHg</li>
              <li>🚨 Sedazione e analgesia (propofol/midazolam + fentanyl)</li>
              <li>🚨 Valutare intervento neurochirurgico urgente se ematoma</li>
            </ul>
          </div>

          <q-separator class="q-my-lg" />

          <p class="text-weight-bold text-h6 q-mb-sm">Valore Prognostico del GCS</p>
          <p>
            Lo <strong>score GCS iniziale dopo rianimazione</strong> fornisce informazioni
            prognostiche su mortalità e outcome funzionale a 6 mesi:
          </p>
          <ul class="q-ml-md">
            <li>
              <strong>Relazione lineare</strong> con outcome povero (morte, stato vegetativo,
              disabilità neurologica severa) nel range GCS 3-9
            </li>
            <li>
              <strong>Eccezioni notevoli:</strong> Pazienti con ematoma epidurale possono mostrare
              "talk and die syndrome" - inizialmente GCS normale (intervallo lucido), poi rapido
              deterioramento con erniazione e morte se non rilevato tempestivamente
            </li>
          </ul>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- 3️⃣ LIMITAZIONI -->
    <q-expansion-item
      icon="report_problem"
      label="⚠️ Limitazioni e Considerazioni Speciali"
      class="q-mt-sm"
      header-class="bg-red-1 text-red-9"
    >
      <q-card flat class="q-pa-md bg-red-1">
        <div class="text-body2">
          <p class="text-weight-bold text-h6 q-mb-sm">Limitazioni del GCS</p>

          <p>
            Nonostante sia lo <strong>score di coscienza più utilizzato al mondo</strong>, il GCS
            presenta diverse limitazioni:
          </p>

          <div class="q-mt-md">
            <p class="text-weight-bold">1️⃣ Pazienti non valutabili accuratamente:</p>
            <ul class="q-ml-md">
              <li>
                <strong>Intubati:</strong> Impossibile valutare risposta verbale (usa notazione
                GCS_T)
              </li>
              <li><strong>Sedati:</strong> Farmaci alterano tutti i parametri GCS</li>
              <li>
                <strong>Paralizzati:</strong> Bloccanti neuromuscolari eliminano risposte motorie
              </li>
              <li>
                <strong>Immobilizzati:</strong> Collari cervicali limitano valutazione movimento
              </li>
              <li>
                <strong>Edema periorbitale significativo:</strong> Impossibile valutare apertura
                occhi
              </li>
            </ul>
          </div>

          <div class="q-mt-md">
            <p class="text-weight-bold">2️⃣ Variabilità inter-rater:</p>
            <ul class="q-ml-md">
              <li><strong>Disaccordo tra valutatori</strong> documentato in letteratura</li>
              <li>
                Necessità <strong>training standardizzato</strong> per migliorare affidabilità
              </li>
              <li>Standard internazionali espliciti e non ambigui ancora mancanti (Cook 2021)</li>
            </ul>
          </div>

          <div class="q-mt-md">
            <p class="text-weight-bold">3️⃣ Manca valutazione riflessi tronco encefalico:</p>
            <ul class="q-ml-md">
              <li>❌ Non incorpora <strong>riflessi pupillari</strong></li>
              <li>❌ Non valuta <strong>riflesso corneale</strong></li>
              <li>❌ Non testa <strong>riflesso oculocefalico/oculovestibolare</strong></li>
              <li>❌ Non valuta <strong>pattern respiratori</strong></li>
            </ul>
            <p class="q-mt-xs text-grey-8">
              <em
                >Questi riflessi forniscono informazioni importanti su funzione tronco encefalico
                che GCS non cattura</em
              >
            </p>
          </div>

          <div class="q-mt-md">
            <p class="text-weight-bold">4️⃣ Fattori confondenti che alterano GCS:</p>
            <ul class="q-ml-md">
              <li>
                <strong>Ipotensi one:</strong> Ipoperfusione cerebrale riduce GCS indipendentemente
                da trauma
              </li>
              <li><strong>Ipossiemia:</strong> PaO₂ basso altera coscienza</li>
              <li>
                <strong>Depressori neurologici:</strong> Alcol, oppiacei, benzodiazepine, anestetici
              </li>
              <li><strong>Ipoglicemia:</strong> Riduce GCS reversibilmente</li>
              <li>
                <strong>Disturbi metabolici:</strong> Ipercapnia, uremia, encefalopatia epatica
              </li>
            </ul>
            <p class="q-mt-md">
              <q-banner class="bg-red-2 text-red-9" dense rounded>
                <template v-slot:avatar>
                  <q-icon name="warning" color="red" />
                </template>
                <strong>IMPORTANTE:</strong> GCS anomalo può essere alterato NON solo dal trauma
                cranico ma anche da ipotenzione, ipossiemia o ingestione sostanze neurotrope.
                <strong>Correggere prima questi fattori</strong> per valutazione accurata.
              </q-banner>
            </p>
          </div>

          <q-separator class="q-my-lg" />

          <p class="text-weight-bold text-h6 q-mb-sm">Scala Pediatrica Modificata</p>
          <p>GCS adulto può essere usato in pazienti <strong>≥ 5 anni</strong>.</p>
          <p class="q-mt-sm">
            Per bambini <strong>&lt; 3 anni</strong>, usare <strong>Children's Coma Score</strong>
            che modifica risposta verbale per tener conto immaturità sistema nervoso:
          </p>
          <ul class="q-ml-md">
            <li><strong>5:</strong> Parole appropriate; tubare o balbettare</li>
            <li><strong>4:</strong> Parole inappropriate; pianto consolabile</li>
            <li><strong>3:</strong> Urla o pianto inconsolabile</li>
            <li><strong>2:</strong> Gemiti o lamenti a stimolo doloroso</li>
            <li><strong>1:</strong> Nessuna risposta</li>
          </ul>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- 4️⃣ MONITORAGGIO E DETERIORAMENTO -->
    <q-expansion-item
      icon="timeline"
      label="📈 Monitoraggio e Rilevamento Deterioramento"
      class="q-mt-sm"
      header-class="bg-green-1 text-green-9"
    >
      <q-card flat class="q-pa-md bg-green-1">
        <div class="text-body2">
          <p class="text-weight-bold text-h6 q-mb-sm">Uso del GCS per Monitoraggio Seriato</p>
          <p>
            Un <strong>vantaggio fondamentale</strong> del GCS è permettere rilevamento rapido di
            <strong>deterioramento neurologico</strong>:
          </p>

          <div class="q-mt-md">
            <p class="text-weight-bold">Frequenza Valutazioni GCS:</p>
            <ul class="q-ml-md">
              <li>
                <strong>GCS 3-8 (Severo):</strong> Ogni 15 minuti inizialmente, poi ogni 30-60 min
                se stabile
              </li>
              <li>
                <strong>GCS 9-12 (Moderato):</strong> Ogni 15-30 minuti prime ore, poi ogni 1-2 ore
              </li>
              <li>
                <strong>GCS 13-15 (Lieve):</strong> Ogni 30-60 minuti prime 4 ore, poi ogni 2-4 ore
              </li>
            </ul>
          </div>

          <div class="q-mt-md">
            <p class="text-weight-bold">Segni di Deterioramento Neurologico:</p>
            <ul class="q-ml-md">
              <li>
                <strong>↓ GCS totale ≥ 2 punti:</strong> Indicatore precoce e consistente
                complicanze intracraniche
              </li>
              <li>
                <strong>↓ Motor score ≥ 1 punto:</strong> Particolarmente significativo (funzione
                SNC superiore)
              </li>
              <li><strong>↓ Eye opening:</strong> Può indicare aumento PIC o ischemia tronco</li>
              <li>
                <strong>Comparsa postura decorticata/decerebrata:</strong> Ematoma espansivo urgente
              </li>
            </ul>
          </div>

          <div class="q-mt-md">
            <p class="text-weight-bold">Cause Deterioramento GCS:</p>
            <ul class="q-ml-md">
              <li>
                🩸 <strong>Ematoma intracranico espansivo</strong> (epidurale, subdurale,
                intracerebrale) → TC urgente, evacuazione chirurgica
              </li>
              <li>
                🧠 <strong>Edema cerebrale progressivo</strong> → Mannitolo, soluzione salina
                ipertonica, craniectomia decompressiva
              </li>
              <li>
                ⬆️ <strong>Aumento PIC</strong> > 20-25 mmHg → Drenaggio LCR, sedazione,
                iperventilazione controllata
              </li>
              <li>
                💊 <strong>Effetto farmaci</strong> (sedativi, analgesici) → Ridurre/sospendere
                temporaneamente
              </li>
              <li>⚡ <strong>Convulsioni non convulsive</strong> → EEG, antiepilettici</li>
            </ul>
          </div>

          <q-separator class="q-my-lg" />

          <p class="text-weight-bold text-h6 q-mb-sm">Documentazione e Comunicazione</p>
          <p>
            <strong>Sempre documentare:</strong>
          </p>
          <ul class="q-ml-md">
            <li>📝 Punteggi individuali <strong>E V M</strong> oltre al totale</li>
            <li>📝 Data e ora valutazione precisa</li>
            <li>📝 Stimoli utilizzati per ottenere risposta</li>
            <li>📝 Eventuali fattori confondenti (sedazione, intubazione, etc.)</li>
            <li>📝 Lateralità deficit motori se presenti</li>
            <li>📝 Nome valutatore</li>
          </ul>

          <p class="q-mt-md">
            <q-banner class="bg-green-2 text-green-9" dense rounded>
              <template v-slot:avatar>
                <q-icon name="tips_and_updates" color="green" />
              </template>
              <strong>BEST PRACTICE:</strong> Un <strong>cambiamento nel GCS</strong> è il segno più
              precoce e consistente che complicanze intracraniche si stanno sviluppando - in
              particolare ematoma. Uso della scala come base per osservazione è parte integrante
              della pratica clinica standard (Teasdale & Jennett 1974, Rajaraman & Jellinek 2010).
            </q-banner>
          </p>
        </div>
      </q-card>
    </q-expansion-item>

    <!-- 5️⃣ RIFERIMENTI SCIENTIFICI -->
    <q-expansion-item
      icon="menu_book"
      label="📖 Riferimenti Scientifici"
      class="q-mt-sm"
      header-class="bg-purple-1 text-purple-9"
    >
      <q-card flat class="q-pa-md bg-purple-1">
        <div class="text-body2">
          <p class="text-weight-bold text-h6 q-mb-sm">Pubblicazioni Fondamentali</p>

          <div class="q-mb-md">
            <p class="text-weight-bold">📄 Teasdale G, Jennett B. (1974)</p>
            <p class="q-ml-md text-grey-8">
              "Assessment of coma and impaired consciousness. A practical scale"<br />
              <em>Lancet</em>, 2(7872): 81-84<br />
              DOI: 10.1016/s0140-6736(74)91639-0<br />
              <strong>Studio originale</strong> che introduce Glasgow Coma Scale
            </p>
          </div>

          <div class="q-mb-md">
            <p class="text-weight-bold">📄 Jinadasa S, Boone MD. (2016)</p>
            <p class="q-ml-md text-grey-8">
              "Advances in Neuroscience in Anesthesia and Critical Care"<br />
              <em>Anesthesiology Clinics</em>, 34(3): 563-581<br />
              ScienceDirect<br />
              Review completa su GCS e neuroscienze in anestesia/terapia intensiva
            </p>
          </div>

          <div class="q-mb-md">
            <p class="text-weight-bold">📄 Cook NF. (2021)</p>
            <p class="q-ml-md text-grey-8">
              "International Perspectives in Critical Care Nursing"<br />
              <em>Critical Care Nursing Clinics of North America</em>, 33(2): 135-148<br />
              Variabilità uso GCS e necessità standard internazionali
            </p>
          </div>

          <div class="q-mb-md">
            <p class="text-weight-bold">📄 Caskey RC, Nance ML. (2014)</p>
            <p class="q-ml-md text-grey-8">
              "Advances in Pediatrics"<br />
              <em>Advances in Pediatrics</em>, 61(1): 247-276<br />
              ScienceDirect<br />
              GCS pediatrico e Children's Coma Score per &lt; 3 anni
            </p>
          </div>

          <div class="q-mb-md">
            <p class="text-weight-bold">📄 Rajaraman CJ, Jellinek DA. (2010)</p>
            <p class="q-ml-md text-grey-8">
              "Head injury" in <em>Medicolegal Reporting in Orthopaedic Trauma (Fourth Edition)</em
              ><br />
              Elsevier, Chapter 21<br />
              ISBN: 978-0-443-06833-1<br />
              Uso clinico GCS in trauma e aspetti medico-legali
            </p>
          </div>

          <div class="q-mb-md">
            <p class="text-weight-bold">📄 Fonseca RJ, et al. (2013)</p>
            <p class="q-ml-md text-grey-8">
              "Initial Assessment and Intensive Care of the Trauma Patient"<br />
              <em>Oral and Maxillofacial Trauma (Fourth Edition)</em><br />
              Elsevier<br />
              GCS in trauma maxillofacciale, intubazione, vie aeree difficili
            </p>
          </div>

          <div class="q-mb-md">
            <p class="text-weight-bold">📄 Marks P. (2016)</p>
            <p class="q-ml-md text-grey-8">
              "Coma: Definitions and Differential Diagnoses – Adult"<br />
              <em>Encyclopedia of Forensic and Legal Medicine (Second Edition)</em><br />
              ScienceDirect<br />
              Definizioni coma e diagnosi differenziale con GCS
            </p>
          </div>

          <q-separator class="q-my-lg" />

          <p class="text-weight-bold text-h6 q-mb-sm">Linee Guida e Consensus</p>

          <div class="q-mb-md">
            <p class="text-weight-bold">📋 Brain Trauma Foundation (2016)</p>
            <p class="q-ml-md text-grey-8">
              "Guidelines for the Management of Severe Traumatic Brain Injury (4th Edition)"<br />
              Raccomandazioni evidence-based per GCS ≤ 8 (TBI severo)
            </p>
          </div>

          <q-separator class="q-my-lg" />

          <p class="text-weight-bold text-h6 q-mb-sm">Risorse Online</p>

          <div class="q-mb-md">
            <p class="text-weight-bold">🌐 ScienceDirect Topics</p>
            <p class="q-ml-md text-grey-8">
              <a
                href="https://www.sciencedirect.com/topics/medicine-and-dentistry/glasgow-coma-scale"
                target="_blank"
                class="text-purple-9"
              >
                https://www.sciencedirect.com/topics/medicine-and-dentistry/glasgow-coma-scale </a
              ><br />
              Database completo articoli, capitoli e review su Glasgow Coma Scale
            </p>
          </div>

          <q-separator class="q-my-lg" />

          <q-banner class="bg-blue-1 text-blue-9" dense rounded>
            <template v-slot:avatar>
              <q-icon name="school" color="blue" />
            </template>
            <strong>Nota educativa:</strong> Queste informazioni sono basate su letteratura
            scientifica peer-reviewed da ScienceDirect e linee guida internazionali. L'applicazione
            clinica deve sempre considerare il contesto specifico del paziente e le linee guida
            locali.
          </q-banner>
        </div>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<style scoped>
.q-expansion-item {
  border-radius: 8px;
  overflow: hidden;
}
</style>
