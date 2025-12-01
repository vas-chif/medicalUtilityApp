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

            <!-- Severità TBI (risultato dinamico) -->
            <q-expansion-item
              icon="local_hospital"
              label="Severità Trauma Cranico"
              class="q-mt-sm"
              header-class="bg-grey-3 text-grey-9"
              default-opened
            >
              <q-card class="q-pa-md bg-grey-1">
                <div class="text-body2">
                  {{ getTBISeverity(totalScore) }}
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 1️⃣ Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              label="1️⃣ Definizione e Significato Clinico GCS"
              class="q-mt-sm"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm">
                  <strong>Glasgow Coma Scale (GCS):</strong> Sistema di valutazione oggettiva
                  livello di coscienza sviluppato 1974 da Teasdale & Jennett (Glasgow, Scozia).
                  Valuta 3 componenti: <strong>Eye opening (1-4)</strong>,
                  <strong>Verbal response (1-5)</strong>, <strong>Motor response (1-6)</strong>.
                  Punteggio totale 3-15: 13-15 TBI lieve, 9-12 moderato, 3-8 severo/coma. Gold
                  standard mondiale valutazione neurologica acuta (trauma, stroke, coma metabolico).
                </div>
                <div class="text-body2">
                  <strong>Applicazioni:</strong> Triage emergenza, decisioni intubazione,
                  monitoraggio deterioramento neurologico ICU, prognosi outcome TBI (mortalità,
                  disabilità), comunicazione standardizzata équipe, ricerca clinica (inclusion
                  criteria trials).
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 2️⃣ Fisiologia e Meccanismi -->
            <q-expansion-item
              icon="science"
              label="2️⃣ Fisiologia della Coscienza e Funzione SNC"
              class="q-mt-sm"
              header-class="bg-green-1 text-green-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm">
                  <strong>Coscienza:</strong> Stato di consapevolezza sé + ambiente, richiede 2
                  componenti: (1) <strong>Arousal</strong> (veglia) da sistema reticolare attivante
                  ascendente (ARAS) tronco encefalico-talamo, (2) <strong>Awareness</strong>
                  (contenuto) da corteccia cerebrale bilaterale. Lesioni ARAS → coma (assenza
                  arousal). Lesioni corticali diffuse → stato vegetativo (arousal preservato,
                  awareness perso).
                </div>
                <div class="text-body2">
                  <strong>Vie Nervose GCS:</strong> Eye opening: ARAS + nuclei oculomotori tronco.
                  Verbal: corteccia frontale Broca + temporale Wernicke + vie cortico-bulbari
                  motorie laringe. Motor: corteccia motoria primaria + vie
                  piramidale/extrapiramidale + midollo spinale. Lesione qualunque livello → deficit
                  GCS corrispondente.
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 📏 Come si Valuta -->
                        <!-- 3️⃣ Come si Calcola -->
            <q-expansion-item
              icon="calculate"
              label="3️⃣ Come si Valuta il GCS"
              class="q-mt-sm"
              header-class="bg-amber-1 text-amber-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm">
                  <strong>Timing:</strong> Valutazione iniziale emergenza, ripetere ogni 15-30min in
                  fase acuta, ogni 1-4h in ICU secondo stabilità. Documentare score componenti
                  separati (E4V5M6 = 15) non solo totale.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>Stimoli:</strong> Eye: chiamata verbale → se no risposta, stimolo
                  doloroso. Verbal: domande orientamento (nome, luogo, data). Motor: comando ("alza
                  braccia") → se no risposta, stimolo doloroso (pressione letto ungueale, sterno,
                  sovraorbitale). Usare stimolo adeguato crescente intensità.
                </div>
                <div class="text-body2">
                  <strong>Operatori:</strong> Medici emergenza, infermieri ICU, paramedici
                  pre-ospedalieri. Training: riduce variabilità inter-rater (affidabilità
                  κ=0.75-0.85 con training vs 0.50-0.65 senza). Scale pediatrica GCS-P per &lt;2
                  anni modifica Verbal (pianto, vocalizzazioni).
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 4️⃣ Formula e Componenti -->
            <q-expansion-item
              icon="functions"
              label="4️⃣ Formula e Componenti GCS"
              class="q-mt-sm"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 text-center text-weight-bold q-mb-md">
                  GCS = Eye Opening (E) + Verbal Response (V) + Motor Response (M)
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>Eye (E 1-4):</strong> 4=spontaneo, 3=a comando verbale, 2=a dolore,
                  1=assente
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>Verbal (V 1-5):</strong> 5=orientato, 4=confuso, 3=parole inappropriate,
                  2=suoni incomprensibili, 1=assente
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>Motor (M 1-6):</strong> 6=obbedisce comandi, 5=localizza dolore, 4=ritira
                  a dolore (flessione normale), 3=flessione anomala decorticata, 2=estensione
                  decerebrata, 1=assente
                </div>
                <div class="text-body2">
                  <strong>Range:</strong> Min=3 (E1V1M1 coma profondo/morte cerebrale), Max=15
                  (E4V5M6 normale). Modificatori: T (intubato), C (non testabile es. edema occhi).
                </div>
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
                <div class="text-body2 q-mb-sm">
                  <strong>GCS 15 (E4V5M6):</strong> Coscienza normale, completamente sveglio e
                  orientato. Paziente risponde appropriatamente. Esclude grave TBI ma non lesioni
                  minori (fratture cranio, emorragie subdurali piccole).
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>GCS 13-14 (TBI Lieve):</strong> Confusione lieve, amnesia post-traumatica
                  possibile. CT cranio indicato se: perdita coscienza, amnesia, vomito, età &gt;65,
                  cefalea severa, anticoagulanti (NICE Head Injury Guidelines). Prognosi: recupero
                  completo &gt;95% casi. Sindrome post-concussiva 10-20%: cefalea, vertigini,
                  disturbi concentrazione persistenti 3-12 mesi.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>GCS 9-12 (TBI Moderato):</strong> Letargia, obnubilamento, confusione
                  marcata. CT cranio obbligatorio. Indicazioni ICU: deterioramento GCS, lesioni TC
                  (contusioni, ematomi), frattura base cranica. Monitoraggio q1-2h. Prognosi:
                  recupero buono 60-80%, disabilità moderata 10-20%, mortalità ~5-10%.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>GCS 3-8 (TBI Severo/Coma):</strong> Coma, incapacità proteggere vie aeree,
                  riflessi compromessi. <strong>Emergenza:</strong> intubazione immediata
                  (protezione vie aeree, controllo PaCO₂ target 35-40 mmHg), TC cranio urgente,
                  ricovero ICU neurochirurgica. Monitoraggio PIC (pressione intracranica) se GCS ≤8.
                  Prognosi: mortalità 30-50%, stato vegetativo persistente 5-10%, disabilità severa
                  20-30%, recupero buono solo 10-20%.
                </div>
                <div class="text-body2">
                  <strong>GCS 3 (E1V1M1):</strong> Coma profondissimo, prognosi infausta. Possibile
                  morte cerebrale se assenza riflessi tronco (pupillare, corneale, oculocefalico,
                  tosse). Test apnea e EEG per conferma morte cerebrale. Considerare limitazione
                  cure dopo discussione famiglia se prognosi neurologica recupero &lt;1%.
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 6️⃣ Applicazioni Cliniche -->
            <q-expansion-item
              icon="medical_services"
              label="6️⃣ Applicazioni Cliniche del GCS"
              class="q-mt-sm"
              header-class="bg-purple-1 text-purple-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm">
                  <strong>1. Triage Emergenza e Decisioni Immediate:</strong> GCS ≤8 → intubazione
                  emergenza (protezione vie aeree, controllo ventilazione). GCS 9-12 → osservazione
                  stretta, TC cranio, possibile ICU. GCS ≥13 → valutazione completa, TC se indicato,
                  possibile dimissione con istruzioni head injury.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>2. Monitoraggio Deterioramento Neurologico:</strong> ↓GCS ≥2 punti in 1-2h
                  → ALERT deterioramento neurologico. Cause: ematoma espansivo (epidurale,
                  subdurale), edema cerebrale, erniazione transtentoriale, ipertensione
                  intracranica, idrocefalo acuto. Azione: TC cranio urgente, consulenza
                  neurochirurgica, considerare craniotomia decompressiva.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>3. Prognosi Outcome TBI:</strong> GCS 3-8h post-trauma predittore forte
                  outcome 6-12 mesi. GCS 3-5 → mortalità ~70%, recupero favorevole &lt;5%. GCS 6-8 →
                  mortalità ~40%, recupero favorevole ~20%. GCS 9-12 → mortalità ~10%, recupero
                  favorevole ~70%. Integrazione con età, pupille, TC Marshall score migliora
                  predizione.
                </div>
                <div class="text-body2">
                  <strong>4. Ricerca e Standardizzazione:</strong> GCS è criterio
                  inclusione/esclusione trials TBI. Classificazione standardizzata permette
                  comparazione studi internazionali. Database CRASH (Corticosteroid Randomization
                  After Significant Head Injury) 10.000+ pazienti usa GCS come outcome primario.
                </div>
              </q-card>
            </q-expansion-item>

            <!-- 7️⃣ Valori di Riferimento e Alert -->
            <q-expansion-item
              icon="warning"
              label="7️⃣ Valori di Riferimento e Alert Critici"
              class="q-mt-sm"
              header-class="bg-red-1 text-red-9"
            >
              <q-card class="q-pa-md">
                <div class="text-body2 q-mb-sm">
                  <strong>Classificazione TBI WHO/NIH:</strong> Lieve GCS 13-15 (80% casi TBI),
                  Moderato GCS 9-12 (10%), Severo GCS 3-8 (10%). Mortalità: lieve &lt;1%, moderato
                  5-10%, severo 30-50%.
                </div>
                <div class="text-body2 q-mb-sm text-weight-bold text-red-9">
                  <strong>ALERT CRITICI GCS:</strong> (1) GCS ≤8 → intubazione immediata +
                  ventilazione, (2) ↓GCS ≥2 punti → TC cranio urgente + neurochirurgia, (3) GCS 3 +
                  pupille fisse bilaterali → prognosi infausta, morte cerebrale imminente, (4) GCS
                  15 → TC se perdita coscienza anche breve (NICE guidelines).
                </div>
                <div class="text-body2">
                  <strong>Limitazioni GCS:</strong> Pazienti intubati → Verbal score non valutabile
                  (notare GCS_T, max=10). Sedazione/farmaci → altera score (sospendere prima
                  valutazione quando possibile). Edema orbitale → Eye non valutabile (GCS_C). Afasia
                  → Verbal ridotto non per coma. Paralisi → Motor ridotto. Integrazione con pupille,
                  riflessi tronco, imaging necessaria per diagnosi completa.
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
                  <strong>NICE Head Injury Guidelines (2023):</strong> Raccomandazioni UK
                  evidence-based gestione trauma cranico. Indicazioni CT cranio: GCS &lt;13
                  iniziale, GCS &lt;15 a 2h, sospetta frattura cranica aperta/depressa, segni
                  frattura base cranica, crisi epilettiche post-traumatiche, deficit neurologici
                  focali, &gt;1 episodio vomito, amnesia eventi &gt;30min pre-trauma.
                  Anticoagulanti/antiagreganti → CT sempre anche se GCS 15.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>Brain Trauma Foundation Guidelines (2016):</strong> Standard gestione TBI
                  severo USA. GCS ≤8 → monitoraggio PIC (pressione intracranica, target &lt;22
                  mmHg), CPP (pressione perfusione cerebrale 60-70 mmHg), mantenere PaCO₂ 35-40 mmHg
                  (evitare iperventilazione prolungata → ischemia), osmoterapia (mannitolo/salina
                  ipertonica) se ↑PIC, craniotomia decompressiva se PIC refrattaria. Evitare
                  ipotensione (PA sistolica &gt;90 mmHg), ipossia (SatO₂ &gt;90%), ipotermia
                  (normotermia target).
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>WHO Classification TBI Severity (2008):</strong> Lieve (GCS 13-15),
                  Moderato (9-12), Severo (3-8). Include anche durata perdita coscienza (LOC) e
                  amnesia post-traumatica (PTA) come criteri ausiliari. Lieve: LOC 0-30min, PTA
                  &lt;24h. Moderato: LOC 30min-24h, PTA 1-7 giorni. Severo: LOC &gt;24h, PTA &gt;7
                  giorni.
                </div>
                <div class="text-body2">
                  <strong>American College of Surgeons ATLS (2018):</strong> Advanced Trauma Life
                  Support. GCS componente primario triage trauma. Usare GCS motore (M) se totale non
                  disponibile. GCS motor ≤5 → trauma center Level I/II. GCS iniziale Pre-Hospital +
                  GCS ospedaliero a 6-12h combinati predicono meglio outcome che singola
                  misurazione.
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
                    >Teasdale G, Jennett B. "Assessment of coma and impaired consciousness"</strong
                  >
                  (1974). Lancet 2(7872):81-84. PMID: 4136544. Studio originale GCS. Validazione su
                  700 pazienti coma da trauma/stroke/farmaci. Inter-rater reliability κ=0.83.
                  Predizione outcome mortalità/disabilità.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong
                    >Marmarou A, et al. "Impact of ICP instability and hypotension on
                    outcome"</strong
                  >
                  (1991). J Neurosurg 75:S59-S66. Traumatic Coma Data Bank 1030 pazienti TBI severo.
                  GCS ≤8 + ipotensione → mortalità ×2. GCS + PIC + età modello predittivo outcome
                  accuratezza 80%.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>MRC CRASH Trial Collaborators. "Predicting outcome after TBI"</strong>
                  (2008). BMJ 336(7641):425-429. PMID: 18270239. 10.008 pazienti TBI 40 paesi. GCS,
                  età, pupille predittori indipendenti mortalità 14-giorni. Calculator prognostico
                  online validato (crash2.lshtm.ac.uk).
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>Reith FC, et al. "Reliability of GCS in TBI"</strong> (2016). Acta
                  Neurochir 158:123-129. Systematic review affidabilità GCS. Inter-rater κ=0.60-0.85
                  (buona). Componente Motor più affidabile (κ=0.85) vs Verbal (κ=0.65). Training
                  migliora concordanza +15-20%.
                </div>
                <div class="text-body2 q-mb-sm">
                  <strong>MSD Manuals - Professional: Traumatic Brain Injury.</strong> Capitolo
                  gestione TBI. Include GCS, classificazione severity, imaging (CT/MRI), gestione
                  ↑PIC, prognosi, riabilitazione. Algoritmi decisione intubazione, osmoterapia,
                  neurochirurgia.
                </div>
                <div class="text-body2">
                  <strong>ScienceDirect Encyclopedia of the Neurological Sciences (2021):</strong>
                  Capitolo "Glasgow Coma Scale and Consciousness Assessment". Storia GCS,
                  neurofisiologia coscienza (ARAS, corteccia), varianti GCS (pediatrico,
                  semplificato AVPU), limitazioni, alternative (Full Outline UnResponsiveness FOUR
                  score).
                </div>
              </q-card>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-expansion-item {
  border-radius: 8px;
  overflow: hidden;
}
</style>
