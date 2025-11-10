<!-- MechanicalPowerCalculator.vue -->
<script setup lang="ts">
/**
 * @file MechanicalPowerCalculator.vue
 * @description Componente calcolatore Mechanical Power (estratto da MechanicalPowerPage)
 * @author Vasile Chifeac
 * @created 2025-01-06
 * @modified 2025-01-XX (Expanded medical documentation per CODING_STANDARDS.md)
 *
 * Mechanical Power Calculator
 * - Energia trasferita dal ventilatore al polmone (predittore VILI)
 * @reference Gattinoni et al. (2016) Intensive Care Medicine 42(10):1567-1575
 * @reference Encyclopedia of Respiratory Medicine (Second Edition), Volume 5, 2022
 */

import { ref, computed } from 'vue';
import { useResetForm } from 'src/composables/useResetForm';

// ============================================================
// TYPES & INTERFACES
// ============================================================
/**
 * @interface MPFormData
 * @description Dati del form per il calcolo del Mechanical Power
 */
interface MPFormData {
  RR: number | null; // Frequenza Respiratoria (atti/min)
  VTe: number | null; // Volume Tidal Espiratorio (litri)
  Picco: number | null; // Pressione di Picco (cmH2O)
  Plateau: number | null; // Pressione di Plateau (cmH2O)
  PeeP: number | null; // PEEP (cmH2O)
}

// ============================================================
// STATE
// ============================================================
const initialFormData: MPFormData = {
  RR: null,
  VTe: null,
  Picco: null,
  Plateau: null,
  PeeP: null,
};

const formData = ref<MPFormData>({ ...initialFormData });
const result = ref<number>(0);

const { resetForm } = useResetForm(formData, result, initialFormData);

// ============================================================
// COMPUTED
// ============================================================
/**
 * @computed isFormValid
 * @description Verifica che tutti i campi siano compilati con valori validi
 * @returns {boolean} true se form valido
 */
const isFormValid = computed(() => {
  return (
    formData.value.RR !== null &&
    formData.value.RR > 0 &&
    formData.value.VTe !== null &&
    formData.value.VTe > 0 &&
    formData.value.Picco !== null &&
    formData.value.Picco > 0 &&
    formData.value.Plateau !== null &&
    formData.value.Plateau > 0 &&
    formData.value.PeeP !== null &&
    formData.value.PeeP >= 0
  );
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * @function calculateMP
 * @description Calcola il Mechanical Power secondo formula di Gattinoni et al. (2016)
 * @formula MP = 0.098 × RR × VTe × (Picco - 0.5 × ΔP)
 * @returns {void}
 */
const calculateMP = (): void => {
  if (!isFormValid.value) return;

  const { RR, VTe, Picco, Plateau, PeeP } = formData.value;

  // Driving Pressure (ΔP)
  const drivingPressure = Plateau! - PeeP!;

  // Formula Gattinoni: MP = 0.098 × RR × VTe × (Picco - 0.5 × ΔP)
  result.value = 0.098 * RR! * VTe! * (Picco! - 0.5 * drivingPressure);
};

/**
 * @function getInterpretation
 * @description Restituisce interpretazione clinica basata su thresholds VILI
 * @returns {string} Interpretazione testuale
 */
const getInterpretation = (): string => {
  if (result.value === 0) return 'Inserire i parametri';
  if (result.value < 17) return 'Ventilazione Protettiva';
  if (result.value <= 22) return 'Zona di Attenzione - Ottimizzare';
  return 'Alto Rischio VILI - Intervento Urgente';
};

/**
 * @function getInterpretationColor
 * @description Restituisce colore Quasar per interpretazione
 * @returns {string} Nome colore Quasar
 */
const getInterpretationColor = (): string => {
  if (result.value === 0) return 'grey';
  if (result.value < 17) return 'green';
  if (result.value <= 22) return 'orange';
  return 'red';
};
</script>

<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-orange-1 text-orange-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="warning" color="orange" />
      </template>
      <div class="text-body2">
        <strong>Mechanical Power (MP):</strong> Energia totale per minuto erogata dal ventilatore al
        parenchima polmonare. Integra pressione, volume, flusso e frequenza respiratoria in un unico
        parametro predittivo di <strong>VILI (Ventilator-Induced Lung Injury)</strong>. Target:
        &lt;17 J/min per ventilazione protettiva.
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="edit" class="q-mr-xs" />
              Parametri Ventilatori
            </div>

            <!-- RR -->
            <q-input
              v-model.number="formData.RR"
              type="number"
              label="RR (Frequenza Respiratoria)"
              suffix="atti/min"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="speed" color="blue" size="sm" />
              </template>
            </q-input>

            <!-- VTe -->
            <q-input
              v-model.number="formData.VTe"
              type="number"
              step="0.01"
              label="VTe (Volume Tidal Espiratorio)"
              suffix="litri"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="green" size="sm" />
              </template>
            </q-input>

            <!-- P.Picco -->
            <q-input
              v-model.number="formData.Picco"
              type="number"
              label="P.Picco (Pressione di Picco)"
              suffix="cmH2O"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="trending_up" color="orange" size="sm" />
              </template>
            </q-input>

            <!-- P.Plateau -->
            <q-input
              v-model.number="formData.Plateau"
              type="number"
              label="P.Plateau (Pressione di Plateau)"
              suffix="cmH2O"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="horizontal_rule" color="purple" size="sm" />
              </template>
            </q-input>

            <!-- PEEP -->
            <q-input
              v-model.number="formData.PeeP"
              type="number"
              label="PEEP (Pressione Fine Espirazione)"
              suffix="cmH2O"
              outlined
              dense
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="trending_down" color="red" size="sm" />
              </template>
            </q-input>

            <!-- Bottoni -->
            <q-btn
              @click="calculateMP"
              color="primary"
              size="md"
              class="full-width q-mb-xs"
              icon="calculate"
              :disable="!isFormValid"
            >
              Calcola MP
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
              <q-icon name="speed" class="q-mr-xs" />
              Risultati
            </div>

            <!-- Risultato -->
            <div class="text-center q-mb-md">
              <div class="text-h4 text-primary">
                {{ result.toFixed(2) }}
              </div>
              <div class="text-caption text-grey-7">J/min (Joule per minuto)</div>
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

            <!-- 📊 Definizione e Significato Clinico -->
            <q-expansion-item
              icon="info"
              label="📊 Definizione e Significato Clinico del Mechanical Power"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  Cos'è il Mechanical Power e Perché è Importante
                </div>

                <q-list dense>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Definizione Fisica del Mechanical Power (MP)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        Il <strong>Mechanical Power</strong> rappresenta l'energia trasferita dal
                        ventilatore meccanico al sistema respiratorio del paziente per unità di
                        tempo, espressa in <strong>Joule al minuto (J/min)</strong>. Dal punto di
                        vista fisico, il MP quantifica il lavoro respiratorio totale eseguito dal
                        ventilatore, integrando in un singolo parametro multipli componenti della
                        ventilazione meccanica: volume corrente (VT), frequenza respiratoria (RR),
                        pressione delle vie aeree (picco/plateau), driving pressure (ΔP), PEEP e
                        flusso inspiratorio.
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-grey-7">
                        Formula semplificata: <strong>MP = 0.098 × RR × VT × (Ppeak - ½ΔP)</strong>,
                        dove 0.098 è il fattore di conversione da L×cmH₂O/min a J/min. Questa
                        formulazione rappresenta un'approssimazione del lavoro meccanico basata su
                        parametri facilmente accessibili al letto del paziente.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs q-mt-md">
                  📌 Significato Clinico Fondamentale:
                </div>
                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="coronavirus" color="red" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        1️⃣ Predittore Unificato di VILI (Ventilator-Induced Lung Injury)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        Il MP integra i 4 meccanismi patogenetici del danno polmonare da
                        ventilatore: <strong>(1) Volutrauma</strong> (VT elevato → sovradistensione
                        alveolare), <strong>(2) Barotrauma</strong> (Ppeak/Pplateau eccessive →
                        rottura alveoli), <strong>(3) Atelectrauma</strong> (ciclico
                        reclutamento/de-reclutamento alveoli con PEEP insufficiente → shear stress),
                        <strong>(4) Biotrauma</strong>
                        (rilascio citokine pro-infiammatorie IL-1β, IL-6, TNF-α → SIRS sistemica).
                        Studi sperimentali su modelli animali (Gattinoni et al., Intensive Care Med
                        2016) hanno dimostrato che il MP correla meglio con mortalità e danno
                        istologico polmonare rispetto a singoli parametri isolati (es. VT o ΔP da
                        soli).
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_up" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        2️⃣ Valore Prognostico in ARDS e Insufficienza Respiratoria Acuta
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        In pazienti con ARDS (Acute Respiratory Distress Syndrome), MP elevato
                        (&gt;17-22 J/min) è associato a:
                        <strong>↑mortalità a 28-90 giorni</strong> (hazard ratio ~1.8-2.5),
                        <strong>↑durata ventilazione meccanica</strong> (+40-60% giorni
                        ventilatore), <strong>↑incidenza insufficienza multi-organo (MOF)</strong>.
                        Studi osservazionali su &gt;1000 pazienti ARDS hanno identificato MP come
                        predittore indipendente di outcome peggiore, anche dopo aggiustamento per
                        gravità malattia (APACHE II, SOFA score), età, P/F ratio. Threshold critico:
                        MP &gt;22 J/min associato a mortalità &gt;50% in ARDS severa.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="tune" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        3️⃣ Guida per Ottimizzazione Strategia Ventilatoria Personalizzata
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        Il MP permette di bilanciare obiettivi ventilatori competitivi: (a)
                        ossigenazione adeguata (PaO₂ &gt;60 mmHg, SatO₂ &gt;90%), (b) rimozione CO₂
                        (PaCO₂ 35-45 mmHg o ipercapnia permissiva pH &gt;7.20), (c) minimizzazione
                        danno polmonare iatrogeno (MP &lt;17 J/min target). In pratica: se MP
                        elevato, ridurre VT (target 4-6 ml/kg peso corporeo predetto PBW), ridurre
                        RR tollerando ipercapnia moderata, ottimizzare PEEP per minimizzare
                        atelectrauma senza sovradistensione, considerare interventi rescue (prona,
                        ECMO). Monitoraggio MP real-time al letto paziente guida aggiustamenti
                        incrementali parametri ventilatore.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="compare_arrows" color="purple" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        4️⃣ Comparazione Modalità Ventilatorie e Settings
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        MP facilita confronto oggettivo tra diverse strategie ventilatorie: volume
                        control (VC) vs pressure control (PC), diverse combinazioni VT/RR/PEEP per
                        stesso paziente. Esempio pratico: paziente ARDS con VT 6 ml/kg, RR 25, PEEP
                        10, Pplat 28 → MP ~20 J/min. Prova riduzione RR 20 con tolleranza ipercapnia
                        → MP ~16 J/min → strategia preferibile se PaCO₂/pH tollerabili. Permette
                        individualizzazione basata su risposta fisiologica paziente-specifica
                        piuttosto che protocolli rigidi "one-size-fits-all".
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="biotech" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        5️⃣ Correlazione con Biomarker Infiammatori e Danno Alveolare
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        Elevato MP correla con marker di danno polmonare in aspirato broncoalveolare
                        (BAL) e plasma: ↑IL-6, ↑IL-8, ↑TNF-α (citokine pro-infiammatorie), ↑proteina
                        C-reattiva (PCR), ↑procollagene tipo III (fibrosi polmonare precoce),
                        ↑Receptor for Advanced Glycation End products (RAGE - marker danno
                        epiteliale alveolare). Studi traslazionali: riduzione MP da 25→15 J/min in
                        24h → ↓50-60% IL-6 plasma, ↓30% PCR. Suggerisce che ottimizzazione MP non
                        solo previene danno meccanico ma riduce risposta infiammatoria sistemica
                        (biotrauma).
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner dense class="bg-blue-1 text-blue-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="lightbulb" color="blue" />
                  </template>
                  <div class="text-caption">
                    <strong>Concetto Chiave - "Baby Lung" in ARDS:</strong> In ARDS, il polmone
                    funzionalmente ventilabile si riduce a dimensioni simili a polmone neonatale
                    (~200-500 ml vs ~5000 ml normale adulto) per collasso/consolidamento aree
                    dipendenti e flooding alveolare. Ventilazione con VT "normale" (8-10 ml/kg) in
                    questo "baby lung" residuo → stress/strain eccessivi, MP molto elevato (30-40
                    J/min), danno accelerato. Strategia protettiva: VT ridotto (4-6 ml/kg PBW)
                    distribuito su polmone di dimensioni ridotte → normalizzazione MP, protezione
                    danno. Razionale fisiopatologico MP = quantificare energia trasferita al polmone
                    "realmente ventilato", non al polmone anatomico totale.
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- 🔬 Fisiologia e Meccanismi di Danno Polmonare (VILI) -->
            <q-expansion-item
              icon="science"
              label="🔬 Fisiologia e Meccanismi di Danno Polmonare (VILI)"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  Meccanica Polmonare e Patogenesi del VILI
                </div>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  🫁 Meccanica Respiratoria Normale vs ARDS:
                </div>
                <q-list dense class="q-mb-md">
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>Polmone Sano:</strong> Compliance polmonare normale Crs ~50-100
                        ml/cmH₂O. Volume corrente fisiologico 6-8 ml/kg distribuito uniformemente su
                        ~300 milioni di alveoli. Driving pressure fisiologico ΔP = VT/Crs ~5-10
                        cmH₂O. Energia elastica immagazzinata durante insufflazione è rilasciata
                        passivamente durante espirazione. Pressione transpolmonare (Ptp = Palv -
                        Ppleurica) mantiene apertura alveolare, prevenendo collasso end-espiratorio.
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>ARDS:</strong> Compliance severamente ridotta Crs ~20-40 ml/cmH₂O
                        (↓50-70% vs normale) per edema interstiziale/alveolare, collasso alveolare,
                        consolidamento. Distribuzione disomogenea areazione: zone dorsali dipendenti
                        collassate/consolidate (non-aerate), zone ventrali non-dipendenti aerate ma
                        a rischio sovradistensione. Per stesso VT, driving pressure molto aumentato
                        ΔP = VT/Crs ~15-25 cmH₂O → stress/strain eccessivi su "baby lung" residuo.
                        Necessità di alte pressioni (Ppeak 30-40 cmH₂O) per raggiungere
                        ossigenazione minimale.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs text-red-9">
                  ⚠️ 4 Meccanismi Patogenetici del VILI:
                </div>

                <q-list dense bordered class="q-mb-md">
                  <q-item class="bg-red-1">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-red-9">
                        1️⃣ VOLUTRAUMA - Sovradistensione Alveolare
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Meccanismo:</strong> Volume corrente eccessivo (VT &gt;8-10 ml/kg) o
                        pressione plateau elevata (Pplateau &gt;30 cmH₂O) → distensione alveolare
                        oltre capacità elastica → strain &gt;2.0 (deformazione relativa: strain =
                        VT/FRC). A livello cellulare: stiramento membrana alveolo-capillare →
                        rottura giunzioni tight tra cellule epiteliali (pneumociti tipo I-II) →
                        increased permeabilità → edema alveolare → ulteriore riduzione compliance →
                        circolo vizioso.
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium">
                        <strong>Evidenze sperimentali:</strong> Studio landmark Dreyfuss & Saumon
                        (1998): ratti ventilati con alte pressioni ma bassi volumi (torace bendato)
                        → NO danno polmonare. Ratti con alti volumi ma basse pressioni (torace
                        aperto) → danno severo. Conclusione: il volume (strain), non la pressione
                        (stress) da solo, è determinante primario del danno. In ARDS, "baby lung"
                        riceve tutto il VT → strain locale molto elevato anche con VT "normale" per
                        peso corporeo totale.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-orange-1 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-orange-9">
                        2️⃣ BAROTRAUMA - Danno da Pressione Eccessiva
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Meccanismo:</strong> Pressioni di picco molto elevate (Ppeak
                        &gt;35-40 cmH₂O) o driving pressure eccessivo (ΔP &gt;15 cmH₂O) → gradiente
                        pressorio trans-alveolare → shear stress interfaccia aria-liquido → rottura
                        fisica parete alveolare → pneumotorax, pneumomediastino, enfisema
                        sottocutaneo. Driving pressure (ΔP = Pplateau - PEEP) riflette "stress
                        elastico" applicato al polmone, normalizzato per compliance: ΔP = VT/Crs.
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium">
                        <strong>Evidenze cliniche:</strong> Studio Amato et al. (NEJM 2015) su 3562
                        pazienti ARDS: driving pressure identificato come predittore più forte di
                        mortalità, superiore a VT o PEEP isolati. ↑1 cmH₂O driving pressure → ↑6%
                        rischio relativo mortalità. Threshold critico: ΔP &gt;15 cmH₂O associato a
                        mortalità &gt;50%. Razionale: ΔP riflette simultaneamente VT (numeratore) e
                        compliance (denominatore), integrando gravità danno polmonare.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-purple-1 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-purple-9">
                        3️⃣ ATELECTRAUMA - Danno da Reclutamento Ciclico
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Meccanismo:</strong> PEEP insufficiente → collasso alveoli a fine
                        espirazione (atelectasia ciclica) → riapertura forzata durante insufflazione
                        successiva → shear stress da reclutamento/de-reclutamento ripetuto ogni
                        ciclo respiratorio (~12000-20000 cicli/die). Forze di taglio (shear) a
                        livello bronchioli terminali e alveoli instabili → distacco cellule
                        epiteliali, denudamento membrana basale, innesco cascata infiammatoria
                        locale.
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium">
                        <strong>Evidenze sperimentali:</strong> Modelli ex-vivo polmone isolato
                        (Muscedere et al., Am J Respir Crit Care Med 1994): ventilazione con PEEP
                        zero vs PEEP ottimale. PEEP zero + VT 10 ml/kg → danno istologico severo
                        (membrane ialine, infiltrati neutrofili, edema) in 20 minuti. PEEP ottimale
                        (10 cmH₂O) + stesso VT → danno minimo. Conclusione: PEEP previene
                        atelectrauma mantenendo reclutamento alveolare stabile. PEEP ottimale deve
                        bilanciare: prevenire collasso (↑PEEP) vs evitare sovradistensione (↓PEEP).
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-amber-2 q-mt-sm">
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-amber-9">
                        4️⃣ BIOTRAUMA - Risposta Infiammatoria Sistemica
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Meccanismo:</strong> Danno meccanico ripetuto
                        (volu/baro/atelectrauma) → attivazione cellule epiteliali alveolari e
                        macrofagi residenti → rilascio citokine pro-infiammatorie:
                        <strong>IL-1β, IL-6, IL-8, TNF-α</strong>. Citokine diffondono in circolo
                        sistemico → SIRS (Systemic Inflammatory Response Syndrome) → danno organi
                        distanti: insufficienza renale acuta (AKI), encefalopatia, disfunzione
                        epatica → sindrome da insufficienza multi-organo (MOF). Pathway molecolare:
                        mechanotransduction → mechanosensitive ion channels (Piezo1, TRPV4) →
                        attivazione NF-κB → trascrizione geni pro-infiammatori.
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium">
                        <strong>Evidenze traslazionali:</strong> Trial ARDS Network (ARMA, NEJM
                        2000): VT alto 12 ml/kg vs VT basso 6 ml/kg. Gruppo VT alto: ↑plasma IL-6
                        (+200-300% picco giorno 1-3), ↑incidenza MOF (+30%), ↑mortalità (+22%
                        assoluto). Gruppo VT basso: citokine significativamente ridotte, meno
                        fallimento organi, ↓mortalità da 40% → 31%. Dimostrazione che strategia
                        ventilatoria protettiva (low VT) riduce non solo danno polmonare locale ma
                        anche risposta infiammatoria sistemica.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  ⚡ Mechanical Power come Parametro Unificante VILI:
                </div>
                <q-banner dense class="bg-indigo-1 text-indigo-9">
                  <template v-slot:avatar>
                    <q-icon name="calculate" color="indigo" />
                  </template>
                  <div class="text-caption">
                    <strong>Razionale Fisiopatologico del MP:</strong> I 4 meccanismi VILI
                    (volutrauma, barotrauma, atelectrauma, biotrauma) sono interconnessi e NON
                    indipendenti. Un singolo parametro (es. VT, Pplateau, PEEP) non cattura
                    complessità del danno. Il Mechanical Power integra tutti i determinanti
                    dell'energia trasferita al polmone:
                    <strong>MP ∝ VT × RR × Pressione × Flusso</strong>. Concettualmente: MP
                    rappresenta "dose totale di energia" somministrata al polmone per unità tempo.
                    Studi su modelli animali (Cressoni et al., Intensive Care Med 2016): MP
                    &gt;12-15 J/min → danno istologico dose-dipendente (edema, atelettasia,
                    infiammazione). MP &lt;10 J/min → polmone preservato anche con ventilazione
                    prolungata (72-96h). Threshold MP critico varia con compliance polmonare: in
                    ARDS severa (Crs ~20 ml/cmH₂O) MP &gt;17 J/min già dannoso, mentre in polmone
                    normale (Crs ~60 ml/cmH₂O) tollerato MP ~25-30 J/min senza danno. Implicazione:
                    MP deve essere normalizzato per dimensioni polmone funzionante (MP/PBW o MP/Crs)
                    per comparazioni accurate.
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- 📏 Come si Misura il Mechanical Power -->
            <q-expansion-item
              icon="straighten"
              label="📏 Come si Misura il Mechanical Power"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  Metodi di Misurazione e Parametri Necessari
                </div>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  📋 Parametri Ventilatori Richiesti per Calcolo MP:
                </div>
                <q-list dense class="q-mb-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="speed" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        1️⃣ Frequenza Respiratoria (RR) - Respiratory Rate
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Misurazione:</strong> Numero atti respiratori al minuto. Lettura
                        diretta dal display ventilatore (RR totale = RR impostata + eventuali atti
                        spontanei in modalità assistita). <strong>Unità:</strong> atti/min (bpm -
                        breaths per minute). <strong>Range tipico:</strong> 10-35 atti/min.
                        <strong>Implicazioni MP:</strong> RR è moltiplicatore diretto del MP (MP ∝
                        RR). Aumento RR 20→30 (+50%) → aumento MP +50% a parità altri parametri.
                        Strategia riduzione MP: tollerare ipercapnia permissiva (PaCO₂ 50-60 mmHg,
                        pH &gt;7.20-7.25) per ridurre RR.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="air" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        2️⃣ Volume Corrente Espiratorio (VTe) - Tidal Volume Exhaled
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Misurazione:</strong> Volume espirato misurato al sensore di flusso
                        espiratorio del ventilatore. Preferire VTe rispetto a VTi (inspiratorio) per
                        evitare sovrastima da compliance circuito/compressione gas.
                        <strong>Unità:</strong> Litri (L) o millilitri (mL). Normalizzazione: VT/PBW
                        (ml/kg peso corporeo predetto). <strong>PBW maschio:</strong> 50 +
                        0.91×(altezza_cm - 152.4). <strong>PBW femmina:</strong> 45.5 +
                        0.91×(altezza_cm - 152.4). <strong>Target protettivo ARDS:</strong> 4-6
                        ml/kg PBW. <strong>Implicazioni MP:</strong> VT è componente principale MP
                        (MP ∝ VT). Riduzione VT 8→6 ml/kg (-25%) → ↓MP ~25%. Trade-off: VT troppo
                        basso → ipercapnia severa, necessità ↑RR che aumenta MP.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="compress" color="purple" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        3️⃣ Pressione di Picco (Ppeak) - Peak Inspiratory Pressure
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Misurazione:</strong> Pressione massima raggiunta nelle vie aeree
                        durante insufflazione, misurata a fine inspirazione. Riflette: resistenza
                        vie aeree + compliance polmonare + flusso inspiratorio.
                        <strong>Unità:</strong> cmH₂O. <strong>Range tipico:</strong> 15-35 cmH₂O
                        (normale 15-25, ARDS 20-35). <strong>Componenti Ppeak:</strong> Ppeak =
                        Pplateau (pressione elastica polmonare) + Presist (pressione resistiva vie
                        aeree = Flow × Resistance). <strong>Implicazioni MP:</strong> Formula
                        semplificata MP utilizza Ppeak come proxy del lavoro totale inspiratorio
                        (elastico + resistivo). Ppeak elevato contribuisce a MP alto.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="pause" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        4️⃣ Pressione di Plateau (Pplateau) - End-Inspiratory Plateau Pressure
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Misurazione:</strong> Manovra di pausa inspiratoria (inspiratory
                        hold 0.3-0.5 sec) → azzeramento flusso → equalizzazione pressione vie aeree
                        con pressione alveolare. Riflette solo componente elastica (no resistenze).
                        <strong>Unità:</strong> cmH₂O. <strong>Target protettivo:</strong> Pplateau
                        &lt;30 cmH₂O (raccomandazione ARDS Network).
                        <strong>Calcolo Compliance Statica:</strong> Crs = VT/(Pplateau - PEEP).
                        <strong>Driving Pressure:</strong> ΔP = Pplateau - PEEP (predittore potente
                        mortalità ARDS, target &lt;15 cmH₂O).
                        <strong>Implicazioni MP:</strong> Formula completa MP integra Pplateau e
                        Ppeak per separare componente elastica da resistiva. Formula semplificata:
                        MP ≈ 0.098 × RR × VT × (Ppeak - 0.5×ΔP).
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_down" color="green" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        5️⃣ PEEP (Positive End-Expiratory Pressure)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Misurazione:</strong> Pressione positiva mantenuta a fine
                        espirazione, impostata sul ventilatore. <strong>Unità:</strong> cmH₂O.
                        <strong>Range tipico:</strong> 5-20 cmH₂O (ARDS lieve 5-10, moderata 10-15,
                        severa 15-20). <strong>Funzioni fisiologiche:</strong> (1) Prevenire
                        collasso alveolare end-espiratorio (↓atelectrauma), (2) Reclutamento alveoli
                        collassati (↑FRC), (3) ↑ossigenazione (P/F ratio), (4) ↑compliance polmonare
                        (spostamento su curva pressione-volume). <strong>Effetti su MP:</strong>
                        PEEP ottimale → ↑compliance → ↓driving pressure → ↓MP. PEEP troppo basso →
                        ↓compliance per atelectasia → ↑ΔP → ↑MP. PEEP troppo alto → sovradistensione
                        → ↓compliance → ↑ΔP → ↑MP. Obiettivo: PEEP ottimale minimizza driving
                        pressure e MP.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs q-mt-md">
                  🖥️ Metodi di Acquisizione Dati dal Ventilatore:
                </div>
                <q-list dense bordered class="q-mb-md bg-grey-1">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="monitor" color="indigo" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        Lettura Diretta Display Ventilatore (Metodo Standard)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        Tutti i parametri necessari (RR, VTe, Ppeak, Pplateau, PEEP) sono
                        visualizzati in tempo reale sul monitor del ventilatore meccanico moderno
                        (Servo-i, Hamilton, Dräger, Maquet, ecc.). <strong>Procedura:</strong> (1)
                        Verificare modalità ventilatoria (VC, PC, SIMV, ecc.), (2) Annotare RR
                        totale, VTe medio (ultimi 3-5 atti), Ppeak, PEEP, (3) Eseguire manovra pausa
                        inspiratoria per misurare Pplateau (button "Insp Hold"), (4) Calcolare MP
                        con formula. <strong>Frequenza misurazione:</strong> Ogni modifica parametri
                        ventilatori, ogni 4-6h in paziente stabile ARDS, ogni 1-2h in fase acuta
                        instabile.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="calculate" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        Calcolo Automatico Integrato Ventilatore (Software Avanzato)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        Ventilatori di ultima generazione (Hamilton G5/S1, Servo-u, Dräger Evita
                        V800) integrano calcolo automatico MP visualizzato real-time su schermo.
                        <strong>Vantaggio:</strong> Calcolo continuo breath-by-breath con formula
                        completa (include componente resistiva PEEP-dipendente, inspiratory flow,
                        forma d'onda). <strong>Limiti:</strong> Formula proprietaria varia tra
                        produttori (Gattinoni vs Becher vs altri), valori non sempre comparabili.
                        Necessità standardizzazione equazione MP in futuri consensus internazionali.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="integration_instructions" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        Integrazione con Sistemi Informatici Clinici (EMR/PDMS)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        In ICU moderne con Patient Data Management Systems (PDMS - es. MetaVision,
                        IntelliSpace Critical Care, Centricity), dati ventilatori acquisiti
                        automaticamente via interfaccia HL7/protocolli proprietari.
                        <strong>Applicazioni:</strong> (1) Trend MP nel tempo (grafico 24-48-72h),
                        (2) Alert automatici se MP &gt;threshold critico, (3) Decision support
                        systems per suggerire ottimizzazioni parametri, (4) Database ricerca per
                        analisi retrospettive MP-outcome.
                        <strong>Big Data Potential:</strong> Machine learning su grandi dataset MP +
                        parametri clinici → predizione personalizzata rischio VILI, identificazione
                        PEEP/VT ottimali paziente-specifici.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner dense class="bg-amber-1 text-amber-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="warning" color="amber-9" />
                  </template>
                  <div class="text-caption">
                    <strong>Considerazioni Pratiche e Limitazioni Misurazione MP:</strong> (1)
                    <strong>Variabilità breath-to-breath:</strong> In modalità ventilatorie
                    assistite (PSV, SIMV) con triggering paziente, RR e VT variano notevolmente.
                    Calcolare MP su media 5-10 atti respiratori. (2)
                    <strong>Effetto PEEP intrinseco (PEEPi):</strong> In pazienti BPCO/asma con air
                    trapping, PEEP totale = PEEP estrinseco impostato + PEEPi non misurato →
                    sottostima driving pressure reale → sottostima MP. Necessità misurare PEEPi con
                    manovra pausa espiratoria. (3) <strong>Compliance parete toracica:</strong> In
                    obesità severa, ascite massiva, addome acuto, alta pressione addominale riduce
                    compliance toracica → alta Pplateau NON da danno polmonare ma da compressione
                    esterna → sovrastima MP "polmonare". Soluzione: misurare pressione esofagea
                    (Pes) con sonda dedicata → pressione transpolmonare Ptp = Palv - Pes → calcolo
                    MP normalizzato per polmone separato da parete toracica. (4)
                    <strong>Formula semplificata vs completa:</strong>
                    Formula in questo calcolatore (0.098 × RR × VT × (Ppeak - 0.5ΔP)) è
                    approssimazione. Formula completa Gattinoni integra flusso inspiratorio, forma
                    d'onda pressione, resistenze via breath-by-breath analysis. Differenza ~10-20%
                    tra formule. Per decisioni cliniche critiche (es. candidatura ECMO), preferire
                    calcolo completo o valore automatico da ventilatore avanzato.
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- 🎯 Interpretazione Clinica Dettagliata -->
            <q-expansion-item
              icon="warning"
              label="🎯 Interpretazione Clinica Dettagliata"
              dense
              default-opened
              class="text-primary text-weight-bold"
            >
              <q-list dense class="bg-grey-1">
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="green" name="check_circle" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>&lt; 17 J/min</strong> - Ventilazione Protettiva
                    </q-item-label>
                    <q-item-label caption class="text-grey-7">
                      Strategia ventilatoria ottimale. Continuare monitoraggio compliance dinamica,
                      EGA (PaO₂/FiO₂, PaCO₂), e valutazione clinica del paziente. Energia trasferita
                      al polmone è minima, riducendo stress meccanico e biotrauma.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon color="orange" name="warning" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>17-22 J/min</strong> - Zona di Attenzione (Ottimizzazione Necessaria)
                    </q-item-label>
                    <q-item-label caption class="text-grey-7">
                      Rischio intermedio di VILI. <strong>Azioni</strong>: Ridurre RR se tollerata
                      ipercapnia permissiva (pH &gt;7.20), limitare driving pressure (ΔP = Pplateau
                      - PEEP) a &lt;15 cmH₂O, rivalutare PEEP ottimale con recruiting maneuvers o
                      EIT. Monitorare marcatori infiammatori se disponibili.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon color="red" name="dangerous" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>&gt; 22 J/min</strong> - Alto Rischio VILI (Intervento Urgente)
                    </q-item-label>
                    <q-item-label caption class="text-grey-7">
                      <strong>URGENTE</strong>: Energia eccessiva trasferita al polmone, alto
                      rischio di barotrauma, volutrauma, atelectrauma e biotrauma.
                      <strong>Interventi immediati</strong>: Ridurre VT a 4-6 ml/kg PBW (peso
                      ideale), abbassare RR tollerando ipercapnia (target pH &gt;7.15), rivalutare
                      PEEP, considerare posizione prona (PP) se P/F &lt;150, valutare ECMO se ARDS
                      severa persistente.
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>

            <!-- Definizione e Significato Clinico -->
            <q-expansion-item
              icon="school"
              label="Definizione e Significato Clinico"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">Cos'è il Mechanical Power?</div>
                <div class="text-caption text-grey-8 q-mb-sm">
                  Il <strong>Mechanical Power (MP)</strong> rappresenta l'<strong
                    >energia totale per minuto</strong
                  >
                  trasferita dal ventilatore meccanico al sistema respiratorio del paziente. È
                  espresso in
                  <strong>Joule per minuto (J/min)</strong> e integra in un unico parametro tutti i
                  componenti della ventilazione che contribuiscono al danno polmonare:
                </div>

                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Pressione</strong>: Pressione di picco, plateau, driving pressure
                        (ΔP)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Volume</strong>: Volume tidal (VT), capacità residua funzionale
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Flusso</strong>: Velocità di insufflazione, resistenze delle vie
                        aeree
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Frequenza respiratoria (RR)</strong>: Numero di cicli al minuto
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-sm">Perché è importante il MP?</div>
                <div class="text-caption text-grey-8">
                  I parametri tradizionali (Pplateau, VT, PEEP) valutano
                  <strong>componenti isolati</strong> della ventilazione. Il MP è un
                  <strong>parametro integrativo</strong> che riflette l'<strong
                    >energia globale</strong
                  >
                  trasferita al parenchima polmonare in ogni minuto di ventilazione meccanica.
                  Maggiore è l'energia trasferita, maggiore è il rischio di
                  <strong>VILI (Ventilator-Induced Lung Injury)</strong> attraverso quattro
                  meccanismi principali:
                </div>

                <q-list dense class="q-pl-md q-mt-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Barotrauma</strong>: Lesioni da alte pressioni (pneumotorace,
                        pneumomediastino)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Volutrauma</strong>: Sovradistensione alveolare da volumi eccessivi
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Atelectrauma</strong>: Stress da ciclico reclutamento/dereclutamento
                        alveolare
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Biotrauma</strong>: Rilascio di mediatori infiammatori (citokine
                        IL-6, IL-8, TNF-α)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-expansion-item>

            <!-- Ventilazione Protettiva vs Dannosa -->
            <q-expansion-item
              icon="compare_arrows"
              label="Ventilazione Protettiva vs Ventilazione Dannosa"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold text-positive q-mb-sm">
                  ✅ Ventilazione Protettiva (MP &lt;17 J/min)
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  Strategia che minimizza l'energia trasferita al polmone riducendo il rischio di
                  VILI:
                </div>
                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Volume Tidal basso</strong>: 4-6 ml/kg PBW (peso corporeo ideale)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Driving Pressure limitata</strong>: ΔP (Pplateau - PEEP) &lt;15
                        cmH₂O
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Pressione di Plateau</strong>: &lt;30 cmH₂O (ideale &lt;28 cmH₂O)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>PEEP ottimale</strong>: Bilanciato per reclutamento alveolare senza
                        sovradistensione
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Ipercapnia permissiva</strong>: Tollerare PaCO₂ elevata (pH
                        &gt;7.20) per ridurre VT/RR
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold text-negative q-mb-sm">
                  ❌ Ventilazione Dannosa (MP &gt;22 J/min)
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  Trasferimento eccessivo di energia che aumenta drammaticamente il rischio di VILI:
                </div>
                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Volume Tidal elevato</strong>: &gt;8 ml/kg PBW (sovradistensione
                        alveolare)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Driving Pressure eccessiva</strong>: ΔP &gt;15 cmH₂O (stress
                        meccanico intenso)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Frequenza respiratoria alta</strong>: &gt;35-40 atti/min senza
                        indicazione clinica
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>PEEP inadeguata</strong>: Troppo bassa (atelectrauma) o troppo alta
                        (sovradistensione)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Risposta infiammatoria</strong>: Aumento citokine pro-infiammatorie,
                        MODS (sindrome disfunzione multiorgano)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-caption text-grey-7">
                  <strong>💡 Concetto Chiave</strong>: Mentre parametri come Pplateau o ΔP valutano
                  singoli aspetti, il MP integra <strong>dinamicamente</strong> tutti i fattori che
                  contribuiscono al danno. Due pazienti con stesso Pplateau possono avere MP diversi
                  a seconda di RR, VT, e pattern respiratorio.
                </div>
              </div>
            </q-expansion-item>

            <!-- Come si Calcola il Mechanical Power -->
            <q-expansion-item
              icon="calculate"
              label="Come si Calcola il Mechanical Power"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">
                  Origine della Formula di Gattinoni
                </div>
                <div class="text-caption text-grey-8 q-mb-sm">
                  Il Mechanical Power deriva dall'<strong>equazione del moto respiratorio</strong>,
                  che descrive le forze necessarie per muovere aria dentro e fuori dai polmoni
                  durante la ventilazione meccanica:
                </div>

                <div class="bg-white q-pa-xs q-mb-sm">
                  <div class="text-caption text-grey-8 text-center">
                    <strong>P(t) = E × V(t) + R × Flow(t) + P₀</strong>
                  </div>
                </div>

                <div class="text-caption text-grey-8 q-mb-xs">Dove:</div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>P(t)</strong> = Pressione istantanea nelle vie aeree
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>E</strong> = Elastanza del sistema respiratorio (inverso della
                        compliance)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>V(t)</strong> = Volume istantaneo
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>R</strong> = Resistenza delle vie aeree
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Flow(t)</strong> = Flusso istantaneo
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>P₀</strong> = Pressione basale (PEEP)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-caption text-grey-8 q-mb-sm">
                  <strong>Gattinoni et al. (2016)</strong> hanno integrato questa equazione su un
                  intero ciclo respiratorio e moltiplicato per la frequenza respiratoria per
                  ottenere l'<strong>energia per minuto</strong>. La formula semplificata risultante
                  è:
                </div>

                <div class="bg-white q-pa-sm q-mb-sm">
                  <div class="text-body2 text-grey-8 text-center">
                    <strong
                      >MP = 0.098 × RR × VT<sub>e</sub> × (P<sub>picco</sub> - 0.5 × ΔP)</strong
                    >
                  </div>
                </div>

                <div class="text-caption text-grey-8 q-mb-sm">
                  Dove <strong>ΔP = P<sub>plateau</sub> - PEEP</strong> (driving pressure).
                </div>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-sm">Perché il coefficiente 0.098?</div>
                <div class="text-caption text-grey-8">
                  Il coefficiente <strong>0.098</strong> deriva dalla conversione delle unità di
                  misura. L'energia è calcolata come <strong>Lavoro = Pressione × Volume</strong>.
                  Per convertire da cmH₂O × litri a Joule (J), si usa il fattore di conversione
                  0.098:
                </div>
                <div class="bg-white q-pa-xs q-my-xs">
                  <div class="text-caption text-grey-8 text-center">
                    1 cmH₂O × 1 litro = 0.098 Joule
                  </div>
                </div>
                <div class="text-caption text-grey-8">
                  Moltiplicando per RR (cicli/min) si ottiene l'energia totale per minuto (J/min).
                </div>
              </div>
            </q-expansion-item>

            <!-- 🧮 Formula Dettagliata -->
            <q-expansion-item
              icon="functions"
              label="🧮 Formula Dettagliata e Componenti"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm text-center">Formula Completa</div>

                <div class="bg-primary text-white q-pa-sm q-mb-sm">
                  <div class="text-body1 text-center">
                    MP = 0.098 × RR × VT<sub>e</sub> × (P<sub>picco</sub> - 0.5 × ΔP)
                  </div>
                </div>

                <div class="text-caption text-grey-8 q-mb-sm">
                  <strong>Breakdown dei componenti:</strong>
                </div>

                <q-list dense class="q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="blue" text-color="white" dense>RR</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Frequenza Respiratoria</strong> (atti/min): Numero di cicli
                        respiratori al minuto. Maggiore RR = maggiore energia cumulativa trasferita
                        nell'unità di tempo.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="green" text-color="white" dense>VTe</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Volume Tidal Espiratorio</strong> (litri): Volume di aria
                        mobilizzato per ogni atto. Maggiore VT = maggiore distensione alveolare e
                        stress meccanico.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="orange" text-color="white" dense
                        >P<sub>picco</sub></q-chip
                      >
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Pressione di Picco</strong> (cmH₂O): Pressione massima raggiunta
                        durante insufflazione. Include componente elastica + resistiva del sistema
                        respiratorio.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="purple" text-color="white" dense>ΔP</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Driving Pressure</strong> (cmH₂O): ΔP = P<sub>plateau</sub> - PEEP.
                        Rappresenta la pressione necessaria per distendere gli alveoli. È il
                        parametro più correlato a mortalità in ARDS (Amato et al., NEJM 2015).
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="grey-7" text-color="white" dense>0.098</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Coefficiente di conversione</strong>: Converte cmH₂O × litri in
                        Joule (J).
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-sm">Esempio Pratico di Calcolo</div>

                <div class="bg-white q-pa-sm q-mb-xs">
                  <div class="text-caption text-grey-8">
                    <strong>Paziente con ARDS moderata</strong>:
                  </div>
                  <q-list dense class="q-pl-md">
                    <q-item dense>
                      <q-item-section>
                        <q-item-label caption>RR = 25 atti/min</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label caption
                          >VTe = 0.40 litri (400 ml, ~6 ml/kg per 70 kg)</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label caption>P<sub>picco</sub> = 30 cmH₂O</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label caption>P<sub>plateau</sub> = 26 cmH₂O</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label caption>PEEP = 12 cmH₂O</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>

                  <div class="text-caption text-grey-8 q-mt-xs">
                    <strong>Step 1</strong>: Calcolare ΔP = 26 - 12 = <strong>14 cmH₂O</strong>
                  </div>
                  <div class="text-caption text-grey-8">
                    <strong>Step 2</strong>: MP = 0.098 × 25 × 0.40 × (30 - 0.5 × 14)
                  </div>
                  <div class="text-caption text-grey-8">
                    <strong>Step 3</strong>: MP = 0.098 × 25 × 0.40 × (30 - 7)
                  </div>
                  <div class="text-caption text-grey-8">
                    <strong>Step 4</strong>: MP = 0.098 × 25 × 0.40 × 23
                  </div>
                  <div class="text-caption text-grey-8 text-weight-bold">
                    <strong>Risultato</strong>: MP = <strong>22.54 J/min</strong> →
                    <span class="text-negative">Alto rischio VILI</span>
                  </div>
                </div>

                <div class="text-caption text-grey-7 q-mt-sm">
                  <strong>💡 Azione Clinica</strong>: Questo paziente è sopra la soglia di
                  sicurezza. Ridurre RR a 20 atti/min (tollerando ipercapnia permissiva) ridurrebbe
                  MP a ~18 J/min, entrando nella zona di attenzione.
                </div>
              </div>
            </q-expansion-item>

            <!-- 🔬 Analisi Dettagliata e Applicazioni Cliniche -->
            <q-expansion-item
              icon="science"
              label="🔬 Analisi Dettagliata e Applicazioni Cliniche"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">
                  🏥 Utilizzo Clinico del Mechanical Power
                </div>

                <!-- ARDS/ALI -->
                <div class="text-body2 text-weight-bold text-primary q-mb-xs">
                  1️⃣ ARDS/ALI (Acute Respiratory Distress Syndrome)
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Contesto</strong>: ARDS è caratterizzata da edema polmonare non
                  cardiogeno, ridotta compliance, e <strong>"baby lung"</strong> (solo piccola
                  porzione di polmone aerato). La ventilazione meccanica è salvavita ma può
                  peggiorare il danno se mal gestita.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Target MP</strong>: <strong>&lt;17 J/min</strong> associato a ridotta
                  mortalità in studi osservazionali (Gattinoni et al. 2016, Intensive Care
                  Medicine).
                </div>
                <div class="text-caption text-grey-8 q-mb-xs"><strong>Strategia</strong>:</div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        VT: 4-6 ml/kg PBW (peso corporeo ideale, non reale)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Pplateau &lt;30 cmH₂O (ideale &lt;28)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        ΔP &lt;15 cmH₂O (predittore di mortalità)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Ipercapnia permissiva (pH &gt;7.20, PaCO₂ fino a 60-70 mmHg se tollerata)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        PEEP ottimale con table ARDSnet o recruiting maneuvers
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <!-- Svezzamento -->
                <div class="text-body2 text-weight-bold text-primary q-mb-xs">
                  2️⃣ Svezzamento dalla Ventilazione Meccanica
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Contesto</strong>: Lo svezzamento è il processo di transizione dalla
                  ventilazione meccanica alla respirazione spontanea. Una riduzione progressiva del
                  MP indica miglioramento della meccanica respiratoria.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Indicatori positivi</strong>:
                </div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_down" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Riduzione MP da &gt;20 a &lt;15 J/min nel corso di 48-72h
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_down" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Riduzione RR spontanea con trial a pressione di supporto (PSV)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_down" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Miglioramento compliance (riduzione ΔP per stesso VT)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="text-caption text-grey-8 q-mb-sm">
                  <strong>Protocollo</strong>: Trial di respirazione spontanea (SBT) con T-piece o
                  PSV 5-7 cmH₂O. Se paziente mantiene RR &lt;35, SpO₂ &gt;90%, FC stabile, senza
                  distress → estubazione.
                </div>

                <q-separator class="q-my-sm" />

                <!-- Monitoraggio Continuo -->
                <div class="text-body2 text-weight-bold text-primary q-mb-xs">
                  3️⃣ Monitoraggio Continuo in Terapia Intensiva
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  Il MP è un parametro dinamico che dovrebbe essere calcolato ad ogni modifica dei
                  settaggi ventilatori o deterioramento clinico del paziente.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Quando ricalcolare MP</strong>:
                </div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Dopo ogni modifica di RR, VT, PEEP, modalità ventilatoria
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Peggioramento ossigenazione (P/F ratio ↓, SpO₂ ↓)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Aumento pressioni vie aeree (resistenze ↑, compliance ↓)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Prima e dopo recruiting maneuvers o posizione prona
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="text-caption text-grey-8 q-mb-sm">
                  <strong>Integrazione</strong>: MP dovrebbe essere monitorato insieme a EGA
                  (emogasanalisi), compliance dinamica/statica, EtCO₂, indici ossigenazione (P/F
                  ratio, SpO₂/FiO₂).
                </div>

                <q-separator class="q-my-sm" />

                <!-- Limitazioni -->
                <div class="text-body2 text-weight-bold text-negative q-mb-xs">
                  ⚠️ Limitazioni del Mechanical Power
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  Nonostante sia un parametro promettente, il MP ha alcune limitazioni importanti:
                </div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Non normalizzato per volume polmonare aerato</strong>: In ARDS, solo
                        una frazione del polmone è ventilabile ("baby lung"). Due pazienti con
                        stesso MP ma diverso volume polmonare aerato hanno stress specifico diverso.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Assume linearità pressione-volume</strong>: La relazione P-V è in
                        realtà non lineare, con zone di collasso, zona lineare, e sovradistensione.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Non considera eterogeneità regionale</strong>: Non tiene conto di
                        aree collassate vs iperaerate nello stesso polmone (importante in ARDS
                        disomogenea).
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Thresholds empirici</strong>: I cut-off di 17 e 22 J/min derivano da
                        studi osservazionali, non RCT. Potrebbero variare per popolazione,
                        patologia, età.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-caption text-grey-7">
                  <strong>🔬 Prospettive Future</strong>: Tomografia ad impedenza elettrica (EIT)
                  può stimare il volume polmonare aerato, permettendo di normalizzare MP per
                  ottenere <strong>Specific Mechanical Power</strong> (MP/volume aerato), più
                  preciso nella predizione di VILI.
                </div>

                <q-separator class="q-my-sm" />

                <!-- Riferimenti -->
                <div class="text-body2 text-weight-bold q-mb-xs">📚 Riferimenti Scientifici</div>
                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Gattinoni L, et al.</strong> (2016). "Ventilator-related causes of
                        lung injury: the mechanical power."
                        <em>Intensive Care Medicine</em> 42(10):1567-1575.
                        <span class="text-blue">DOI: 10.1007/s00134-016-4505-2</span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Amato MB, et al.</strong> (2015). "Driving pressure and survival in
                        the acute respiratory distress syndrome."
                        <em>New England Journal of Medicine</em> 372(8):747-755.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Encyclopedia of Respiratory Medicine</strong> (2022), Second
                        Edition, Volume 5. Chapter: "Ventilator-Associated Lung Injury (VALI)."
                        Elsevier.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Garfield B, Patel BV</strong>. "Mechanical Power" in
                        <em>Encyclopedia of Respiratory Medicine</em> (2022). Discusses dynamic
                        exposure to ventilatory variables and VALI mechanisms.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
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
                  Threshold di Mechanical Power e Stratificazione del Rischio VILI
                </div>

                <q-list dense bordered class="q-mb-md">
                  <q-item class="bg-green-1">
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="green" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-green-9">
                        MP &lt; 12 J/min - ZONA SICURA (Protective Ventilation)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato:</strong> Ventilazione protettiva ottimale. Energia
                        trasferita al polmone è minima. Rischio VILI molto basso anche in ARDS
                        severa. Evidenze da modelli animali: MP &lt;12 J/min → assenza danno
                        istologico polmonare anche con ventilazione prolungata 72-96h.
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-green-10">
                        <strong>Azione:</strong> Mantenere strategia ventilatoria corrente.
                        Monitoraggio standard parametri ventilatori ogni 4-6h. Focus su
                        ossigenazione (PaO₂/FiO₂, SatO₂) e ventilazione (PaCO₂, pH). Considerare
                        trial weaning se condizioni cliniche migliorano.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-blue-1 q-mt-sm">
                    <q-item-section avatar>
                      <q-icon name="info" color="blue" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-blue-9">
                        MP 12-17 J/min - ZONA ACCETTABILE (Low-Moderate Risk)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato:</strong> Rischio VILI basso-moderato. Strategia
                        ventilatoria ancora protettiva ma vicino a threshold critico. In pazienti
                        ARDS moderata, MP in questo range è spesso inevitabile per mantenere
                        ossigenazione/ventilazione adeguate.
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-blue-10">
                        <strong>Azione:</strong> Monitoraggio frequente (ogni 2-4h). Valutare
                        possibilità ottimizzazione: ridurre VT se tollerata ipercapnia, ridurre RR,
                        ottimizzare PEEP con recruiting maneuvers o EIT. Bilancio rischio-beneficio:
                        evitare riduzione eccessiva VT/RR che causa ipossia/ipercapnia severa.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-orange-2 q-mt-sm">
                    <q-item-section avatar>
                      <q-icon name="report_problem" color="orange" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-orange-9">
                        ⚠️ MP 17-22 J/min - ZONA ATTENZIONE (High Risk - Ottimizzazione Urgente)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato:</strong> Rischio VILI elevato. Mortalità aumenta
                        progressivamente con MP in questo range. Studi osservazionali ARDS: MP 17-22
                        J/min → mortalità ~40-50% a 28 giorni. Danno polmonare accelerato se
                        mantenuto &gt;24-48h.
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-orange-10">
                        <strong>Azione URGENTE:</strong> (1) Ridurre VT a 4-5 ml/kg PBW (minimo
                        tollerato), (2) Ridurre RR tollerando ipercapnia permissiva (target pH
                        &gt;7.15-7.20, PaCO₂ fino a 60-70 mmHg se necessario), (3) Ottimizzare PEEP:
                        se driving pressure alto (ΔP &gt;15 cmH₂O) → ridurre PEEP; se P/F basso
                        &lt;150 → incrementare PEEP con recruiting, (4) Valutare posizione prona se
                        P/F &lt;150 mmHg (riduce MP e migliora P/F in 70% casi), (5) Considerare
                        paralisi muscolare se asincronie paziente-ventilatore (riduce MP ~10-20%),
                        (6) Monitoraggio ogni 1-2h con target riduzione MP &lt;17 J/min entro 6-12h.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="bg-red-2 q-mt-sm">
                    <q-item-section avatar>
                      <q-icon name="emergency" color="red" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold text-red-9">
                        🚨 MP &gt; 22 J/min - ZONA CRITICA (Very High Risk - Intervento Emergenza)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Significato:</strong> Rischio VILI molto elevato, danno polmonare
                        catastrofico imminente. Mortalità &gt;50-60% in ARDS severa con MP
                        persistente &gt;22 J/min. Biotrauma sistemico con MOF (insufficienza
                        multi-organo). Indicatore prognostico sfavorevole forte.
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs text-weight-medium text-red-10">
                        <strong>Azione EMERGENZA IMMEDIATA:</strong> (1) Implementare TUTTE misure
                        zona arancione con massima aggressività, (2)
                        <strong>Posizione prona obbligatoria</strong> se P/F &lt;150 mmHg
                        (16-18h/die, riduce mortalità ~40% in ARDS severa + riduce MP ~15-25%), (3)
                        Blocco neuromuscolare continuo 24-48h (cisatracurio 15 mg/h) per abolire
                        asincronie e drive respiratorio (riduce MP significativamente), (4)
                        <strong>ECMO veno-venoso</strong> (VV-ECMO): considerare URGENTE se (a) ARDS
                        severa refrattaria P/F &lt;80 mmHg con FiO₂ 100%, PEEP ≥10, (b) MP &gt;25
                        J/min nonostante tutte ottimizzazioni, (c) ipercapnia severa pH &lt;7.15 con
                        RR già minimo tollerato. ECMO permette "ultra-protective" ventilation: VT
                        2-4 ml/kg, RR 5-10, MP &lt;10 J/min → rest polmonare totale, (5)
                        Trasferimento URGENTE centro ECMO se non disponibile in loco, (6)
                        Rivalutazione continua ogni 30-60 minuti, target riduzione MP &lt;17 J/min
                        entro 2-4h con qualunque mezzo necessario.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs q-mt-md">
                  🎯 Correzione MP per Compliance Polmonare (MP Normalizzato):
                </div>
                <q-banner dense class="bg-indigo-1 text-indigo-9 q-mb-md">
                  <template v-slot:avatar>
                    <q-icon name="calculate" color="indigo" />
                  </template>
                  <div class="text-caption">
                    <strong>Mechanical Power Specifico (MP/Crs):</strong> MP assoluto non considera
                    dimensioni polmone funzionante. Polmone normale Crs ~60 ml/cmH₂O tollera MP ~25
                    J/min. ARDS severa Crs ~20 ml/cmH₂O → MP &gt;15 J/min già dannoso.
                    <strong>Soluzione:</strong> Normalizzare MP per compliance →
                    <strong>MP/Crs (J/min per ml/cmH₂O)</strong> o per peso corporeo predetto →
                    <strong>MP/kg PBW</strong>. Threshold critici normalizzati: MP/Crs &gt;0.8-1.0
                    J·min⁻¹·ml⁻¹·cmH₂O⁻¹ → alto rischio VILI. MP/kg &gt;0.3-0.4 J/min/kg → zona
                    attenzione. Utilizzo raccomandato in research e centri avanzati per comparazioni
                    accurate pazienti diversi.
                  </div>
                </q-banner>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  📊 Evidenze Scientifiche Threshold MP:
                </div>
                <q-list dense class="bg-grey-1">
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>Studio Serpa Neto et al. (Intensive Care Med 2018):</strong> Analisi
                        8207 pazienti ventilati. MP medio 21.4 J/min associato a mortalità 45% vs MP
                        13.2 J/min mortalità 25%. Ogni ↑4 J/min MP → ↑20% rischio relativo
                        mortalità. Threshold protettivo identificato &lt;17 J/min.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>
                        <strong>Studio Coppola et al. (Am J Respir Crit Care Med 2020):</strong> 422
                        pazienti COVID-19 ARDS. MP &gt;17 J/min → ↑mortalità ICU (OR 2.8,
                        p&lt;0.001), ↑durata ventilazione (+8.5 giorni), ↑incidenza MOF (+35%). MP
                        predittore indipendente outcome dopo aggiustamento età, SOFA, P/F ratio.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-expansion-item>

            <!-- 📚 Documentazione Medica Scientifica -->
            <q-expansion-item
              icon="menu_book"
              label="📚 Documentazione Medica Scientifica e Linee Guida"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  Linee Guida Internazionali e Raccomandazioni Evidence-Based
                </div>

                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        ARDS Network Protocol - Low Tidal Volume Ventilation (2000)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Studio ARMA (NEJM 2000):</strong> Landmark trial 861 pazienti ARDS.
                        VT 6 ml/kg PBW vs 12 ml/kg. Gruppo low VT: ↓mortalità 31% vs 40% (p=0.007,
                        NNT=11), ↓giorni ventilazione, ↓MOF. Driving pressure medio gruppo
                        protettivo ~13 cmH₂O, MP stimato ~15-17 J/min.
                        <strong>Raccomandazioni:</strong> VT 4-6 ml/kg PBW, Pplateau &lt;30 cmH₂O,
                        tollerare ipercapnia permissiva pH &gt;7.15-7.20. Gold standard ventilazione
                        protettiva mondiale.
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        PMID: 10793162 - The Acute Respiratory Distress Syndrome Network
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Driving Pressure Limiting Strategy (NEJM 2015 - Amato et al.)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Meta-analisi 3562 pazienti ARDS:</strong> Driving pressure (ΔP =
                        Pplateau - PEEP) predittore più forte mortalità, superiore a VT o PEEP
                        isolati. ↑1 cmH₂O ΔP → ↑6% rischio morte. Threshold: ΔP &lt;15 cmH₂O target
                        protettivo, ΔP &gt;15 associato mortalità &gt;50%.
                        <strong>Implicazioni MP:</strong> ΔP è componente diretto MP (MP ∝ ΔP).
                        Ridurre ΔP riducendo VT o ottimizzando PEEP → riduzione MP simultanea.
                        Raccomandazione: monitorare ΔP insieme a MP per doppia verifica protezione.
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        PMID: 25693014 - New England Journal of Medicine
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        PROSEVA Trial - Prone Positioning in Severe ARDS (NEJM 2013)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>466 pazienti ARDS severa (P/F &lt;150):</strong> Prona precoce
                        (16h/die) vs supina. Gruppo prona: ↓mortalità 16% vs 33% (HR 0.39,
                        p&lt;0.001, NNT=6). Meccanismo: prona → redistribuzione tensione polmonare
                        più omogenea → ↓driving pressure ~2-4 cmH₂O → ↓MP ~15-25% → protezione VILI.
                        <strong>Raccomandazione strong:</strong> Prona obbligatoria in ARDS severa
                        P/F &lt;150 con PEEP ≥5, FiO₂ ≥0.6. Durata: 16-18h/die, ripetere giorni
                        consecutivi finché P/F migliora.
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        PMID: 23688302 - PROSEVA Study Group
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="description" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        EOLIA Trial - ECMO for Severe ARDS (NEJM 2018)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>249 pazienti ARDS molto severa:</strong> ECMO precoce vs
                        ventilazione convenzionale. ECMO permette ultra-low VT (2-4 ml/kg), RR
                        minima (5-10), MP drasticamente ridotto (&lt;10 J/min). Trial interrotto
                        precocemente per trend mortalità favorevole ECMO 35% vs 46% (p=0.09
                        non-significativo, ma analisi Bayesiana suggerisce beneficio).
                        <strong>Criteri ECMO considerazione:</strong> P/F &lt;80 mmHg FiO₂ 100% +
                        PEEP ≥10, pH &lt;7.15 da ipercapnia refrattaria, MP &gt;22-25 J/min
                        nonostante ottimizzazioni, barotrauma (pneumotorace resistente drenaggio).
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        PMID: 29791822 - EOLIA Trial Group
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="book" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Surviving Sepsis Campaign Guidelines 2021 - ARDS Management
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Raccomandazioni consensus internazionale:</strong> (1) Low VT
                        ventilation 4-8 ml/kg PBW in tutti ARDS (raccomandazione FORTE), (2)
                        Pplateau &lt;30 cmH₂O (FORTE), (3) Prona in ARDS severa P/F &lt;150 (FORTE),
                        (4) Driving pressure &lt;15 cmH₂O quando possibile (DEBOLE), (5) PEEP più
                        alta in strategie "open lung" vs PEEP bassa (DEBOLE - controversia).
                        Mechanical Power NON ancora incluso in guidelines ufficiali ma citato come
                        "emerging parameter" per monitoraggio VILI risk.
                      </q-item-label>
                      <q-item-label caption class="text-grey-7 q-mt-xs">
                        Critical Care Medicine 2021 - SCCM/ESICM Guidelines
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner dense class="bg-amber-1 text-amber-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="info" color="amber-9" />
                  </template>
                  <div class="text-caption">
                    <strong>Stato Attuale Linee Guida Mechanical Power:</strong> MP è parametro
                    relativamente nuovo (concetto formalizzato 2016 Gattinoni). Non ancora incluso
                    in linee guida ufficiali ARDS Network, Surviving Sepsis, ERS/ATS come
                    raccomandazione formale. Evidenze crescenti da studi osservazionali e
                    meta-analisi supportano utilità clinica. Consensus experts raccomanda:
                    monitorare MP insieme a parametri tradizionali (VT, Pplateau, ΔP, PEEP), target
                    MP &lt;17 J/min in ARDS moderata-severa, integrare MP in decision-making
                    ventilatorio. Trials prospettici randomizzati controllati (RCT) ongoing per
                    validare MP-guided ventilation strategy vs standard care. Probabile inclusione
                    MP in future guidelines 2024-2025.
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- 📖 Riferimenti Scientifici e Bibliografia -->
            <q-expansion-item
              icon="import_contacts"
              label="📖 Riferimenti Scientifici e Bibliografia Peer-Reviewed"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-md">
                <div class="text-body2 text-weight-bold q-mb-md text-primary">
                  Letteratura Scientifica Fondamentale e Risorse Autorevoli
                </div>

                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Gattinoni L, Tonetti T, Cressoni M, et al. "Ventilator-related causes of
                        lung injury: the mechanical power" (2016)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Intensive Care Medicine</strong> 42(10):1567-1575 - DOI:
                        10.1007/s00134-016-4505-2
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <strong>Studio fondamentale</strong> che ha introdotto concetto di
                        Mechanical Power come parametro unificante VILI. Derivazione formula
                        completa MP integrando VT, RR, Ppeak, Pplateau, PEEP, flusso, resistenze.
                        Esperimenti su modelli animali: MP threshold ~12-15 J/min separa
                        ventilazione protettiva da dannosa. Proposta: MP superiore a singoli
                        parametri isolati (VT, pressure) per predire danno polmonare. Articolo più
                        citato in letteratura MP (>1500 citazioni Google Scholar).
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Serpa Neto A, Deliberato RO, Johnson AEW, et al. "Mechanical power of
                        ventilation is associated with mortality in critically ill patients" (2018)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Intensive Care Medicine</strong> 44(11):1914-1922 - PMID: 30284021
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <strong>Grande studio osservazionale retrospettivo:</strong> 8207 pazienti
                        ventilati database MIMIC-III (Beth Israel Hospital Boston). MP medio
                        21.4±9.6 J/min, mortalità ospedaliera 35.7%. Associazione dose-dipendente
                        MP-mortalità: ogni ↑4 J/min → ↑20% odds morte. MP predittore indipendente
                        dopo aggiustamento età, SOFA, APACHE II, Charlson. Receiver Operating
                        Characteristic (ROC) AUC 0.68 per mortalità. Conferma clinica predittività
                        MP in large cohort umano.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Coppola S, Caccioppola A, Froio S, et al. "Effect of mechanical power on
                        intensive care mortality in ARDS patients" (2020)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Critical Care</strong> 24(1):246 - PMID: 32414448
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <strong>Coorte prospettica 150 pazienti ARDS:</strong> MP &gt;17 J/min
                        associato a ↑mortalità ICU (hazard ratio 2.23, 95%CI 1.16-4.29, p=0.016).
                        Stratificazione rischio: MP &lt;12 J/min mortalità 15%, MP 12-17 mortalità
                        28%, MP &gt;17 mortalità 48%. MP normalizzato per compliance (MP/Crs)
                        predittore ancora migliore (HR 2.89). Suggerisce threshold MP devono essere
                        aggiustati per compliance polmonare paziente-specifica.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Zhang Z, Zheng B, Liu N, et al. "Mechanical power normalized to predicted
                        body weight as a predictor of mortality in patients with acute respiratory
                        distress syndrome" (2019)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>Intensive Care Medicine</strong> 45(6):856-864 - PMID: 31016328
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <strong>Studio validazione 3630 pazienti ARDS:</strong> MP normalizzato per
                        peso corporeo predetto (MP/kg PBW) migliore predittore vs MP assoluto.
                        Threshold MP/kg &gt;0.32 J/min/kg associato ↑mortalità 28-giorni (OR 1.84,
                        p&lt;0.001). Importanza normalizzazione: paziente piccolo 50 kg vs grande 90
                        kg tollerano MP differenti. Raccomandazione: sempre calcolare MP/kg per
                        comparazioni accurate.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="blue" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Acute Respiratory Distress Syndrome Network. "Ventilation with lower tidal
                        volumes as compared with traditional tidal volumes for acute lung injury and
                        ARDS" (2000)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        <strong>New England Journal of Medicine</strong> 342(18):1301-1308 - PMID:
                        10793162
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <strong>Trial ARMA landmark:</strong> 861 pazienti ARDS randomizzati VT 6
                        ml/kg vs 12 ml/kg. Gruppo low VT: mortalità 31% vs 39.8% controllo
                        (p=0.007), ↓giorni ventilazione 12 vs 15, ↓MOF. Retrospettivamente: gruppo
                        protettivo MP stimato ~15 J/min vs ~28 J/min gruppo dannoso. Prima evidenza
                        indiretta che riduzione MP (via ↓VT) migliora outcome. Foundation moderna
                        ventilazione protettiva.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="book" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        Encyclopedia of Respiratory Medicine, Second Edition (2022) - Volume 5
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        Capitolo: "Mechanical Power" - Autori: Garfield B, Patel BV
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <strong>Trattazione enciclopedica completa:</strong> Storia concetto MP,
                        derivazione matematica formula, evidenze sperimentali animali, studi clinici
                        umani, applicazioni pratiche ICU, limitazioni e controversie attuali.
                        Include discussione varianti formula MP (Gattinoni vs Becher vs altri), MP
                        normalizzato (MP/Crs, MP/PBW), integrazione con altri parametri (driving
                        pressure, strain). Risorsa autorevole per approfondimento teorico-pratico
                        MP.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="book" color="teal" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        MSD Manuals - Professional Version: Acute Respiratory Distress Syndrome
                        (ARDS)
                      </q-item-label>
                      <q-item-label caption class="q-mt-xs">
                        Sezione: "Management of ARDS - Mechanical Ventilation Strategies"
                      </q-item-label>
                      <q-item-label caption class="text-grey-8 q-mt-xs">
                        <strong>Manuale clinico pratico:</strong> Raccomandazioni evidence-based
                        ventilazione ARDS. Include: low VT strategy, Pplateau limits, driving
                        pressure monitoring, PEEP optimization, rescue therapies (prona, ECMO).
                        Recente aggiornamento 2023 menziona MP come "emerging parameter for
                        ventilator-induced lung injury assessment, promising but needs more
                        prospective validation". Utile per quick reference bedside.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-banner dense class="bg-indigo-1 text-indigo-9 q-mt-md">
                  <template v-slot:avatar>
                    <q-icon name="verified" color="indigo" />
                  </template>
                  <div class="text-caption">
                    <strong>Nota sulla Qualità delle Fonti:</strong> Tutti i riferimenti sono
                    pubblicazioni peer-reviewed su riviste alto impact factor (Intensive Care Med
                    IF~24, NEJM IF~158, Critical Care IF~19) o risorse autorevoli (MSD Manuals,
                    Encyclopedia Respiratory Medicine Elsevier). Livelli evidenza: RCT (ARMA,
                    PROSEVA, EOLIA) - massima evidenza livello 1A, studi osservazionali prospettici
                    (Coppola) - livello 2B, meta-analisi/database (Serpa Neto, Zhang) - livello 1B.
                    MP concetto supportato da solida base scientifica ma ancora in fase validazione
                    per inclusione guidelines ufficiali. Monitoraggio MP raccomandato da experts
                    come parte "bundle" ventilazione protettiva insieme a VT, Pplateau, ΔP
                    tradizionali.
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
