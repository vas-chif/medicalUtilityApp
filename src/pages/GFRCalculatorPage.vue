/**
 * @file GFRCalculatorPage.vue
 * @description Pagina unificata per i calcoli renali: eGFR, CrCl, Fluid Balance
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-11-06
 *
 * Unified Renal Function Calculator Page with q-tabs for professional interface
 */
<script setup lang="ts">
import { ref } from 'vue';
import eGFRCalculator from 'src/components/eGFRCalculator.vue';
import CrClCalculator from 'src/components/CrClCalculator.vue';
import FluidBalanceCalculator from 'src/components/FluidBalanceCalculator.vue';

// ============================================================
// STATE
// ============================================================
/** Active tab */
const activeTab = ref('egfr');
</script>

<template>
  <q-page class="q-pa-md">
    <!-- Header con breadcrumb -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
        <q-breadcrumbs-el label="Funzione Renale" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">🫘 Calcolatori Funzione Renale</h4>
      <p class="text-subtitle1 text-grey-7">
        eGFR, Clearance Creatinina e Bilancio Idrico - Valutazione completa della funzione renale
      </p>
    </div>

    <!-- Tabs per le tre calcolatrici -->
    <q-card>
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="egfr" icon="science" label="eGFR (MDRD/CKD-EPI)" />
        <q-tab name="crcl" icon="medication" label="CrCl (Cockcroft-Gault)" />
        <q-tab name="fluid" icon="water_drop" label="Bilancio Idrico" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <!-- Tab eGFR -->
        <q-tab-panel name="egfr">
          <eGFRCalculator />
        </q-tab-panel>

        <!-- Tab Creatinine Clearance -->
        <q-tab-panel name="crcl">
          <CrClCalculator />
        </q-tab-panel>

        <!-- Tab Fluid Balance -->
        <q-tab-panel name="fluid">
          <FluidBalanceCalculator />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <!-- Scientific Documentation Section -->
    <q-card class="q-mt-lg">
      <q-card-section>
        <q-expansion-item
          icon="book"
          label="📚 Documentazione Medica Scientifica"
          class="text-primary"
        >
          <div class="q-pa-md bg-grey-1">
            <!-- Sezione 1: Definizione e Fisiologia -->
            <div class="q-mb-lg">
              <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                🧬 Definizione e Fisiologia del GFR
              </h6>
              <p class="text-body2 q-mb-sm">
                <strong>Glomerular Filtration Rate (GFR)</strong> rappresenta il parametro
                principale per descrivere la funzione renale. È il prodotto del tasso medio di
                filtrazione di ogni singolo nefrone (unità filtrante del rene) moltiplicato per il
                numero totale di nefroni presenti in entrambi i reni.
              </p>
              <p class="text-body2 q-mb-sm">
                <strong>Valori Normali:</strong> GFR ~130 mL/min/1.73m² nei giovani maschi, ~120
                mL/min/1.73m² nelle giovani femmine (Inker & Levey 2019). La normalizzazione per
                superficie corporea (1.73m² = area media di giovani adulti) standardizza la
                funzione renale per le differenze di dimensioni corporee.
              </p>
              <p class="text-body2 q-mb-sm">
                <strong>Variabilità Fisiologica:</strong> Il GFR varia considerevolmente secondo
                età, sesso, dimensioni corporee, attività fisica, dieta, terapie farmacologiche e
                stati fisiologici come la gravidanza (↑50% nel primo trimestre). Negli adulti, il
                GFR diminuisce di ~0.75 mL/min/anno dopo i 40 anni, ma con ampia variabilità
                individuale (Stevens & Levey 2010).
              </p>
              <p class="text-body2 q-mb-sm">
                <strong>Riserva Funzionale Renale:</strong> La riduzione del GFR può derivare da
                diminuzione del numero di nefroni o da riduzione del GFR del singolo nefrone
                (SNGFR). Tuttavia, un aumento compensatorio dello SNGFR (dovuto ad aumento della
                pressione capillare glomerulare o ipertrofia glomerulare) può mascherare la perdita
                di nefroni, quindi il GFR può non riflettere immediatamente il danno renale
                (Ronco & Chawla 2019).
              </p>
            </div>

            <!-- Sezione 2: Metodi di Misurazione -->
            <div class="q-mb-lg">
              <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                🔬 Metodi di Misurazione del GFR
              </h6>
              <p class="text-body2 q-mb-sm">
                <strong>Gold Standard - Clearance dell'Inulina:</strong> Il GFR è misurato
                idealmente mediante clearance dell'inulina (polisaccaride del fruttosio liberamente
                filtrato ma non riassorbito né secreto dal tubulo renale): GFR = (U<sub
                  >inulina</sub
                >
                × V) / P<sub>inulina</sub>. Tuttavia, è una procedura complessa, costosa e poco
                pratica per l'uso clinico routinario (Hashim 2024).
              </p>
              <p class="text-body2 q-mb-sm">
                <strong>Clearance della Creatinina:</strong> Meno accurata della clearance
                dell'inulina ma molto più pratica: GFR ≈ (U<sub>creatinina</sub> × V) / P<sub
                  >creatinina</sub
                >. La creatinina è un prodotto del metabolismo muscolare, filtrata liberamente ma
                leggermente secreta dai tubuli renali (sovrastima ~10-20%). La creatinina plasmatica
                aumenta quando il GFR diminuisce, ma è influenzata da massa muscolare, età, sesso e
                dieta (Meltzer 2013).
              </p>
              <p class="text-body2 q-mb-sm">
                <strong>Marcatori Esogeni Alternativi:</strong> Iohexol, ⁵¹Cr-EDTA, ⁹⁹mTc-DTPA per
                studi dinamici con misurazione della clearance plasmatica. Cistatina C sierica è un
                biomarker endogeno alternativo, meno influenzato dalla massa muscolare rispetto alla
                creatinina (Hashim 2024).
              </p>
            </div>

            <!-- Sezione 3: Formule di Stima -->
            <div class="q-mb-lg">
              <h6 class="text-subtitle1 text-weight-bold q-mb-sm">🧮 Formule di Stima eGFR</h6>
              <p class="text-body2 q-mb-sm">
                <strong>MDRD (Modification of Diet in Renal Disease) - 4 variabili (Lamb
                  2007):</strong
                ><br />
                eGFR = 175 × (SCr)<sup>-1.154</sup> × (Età)<sup>-0.203</sup> × (0.742 se femmina) ×
                (1.212 se afroamericana)<br />
                <em
                  >Nota: Le raccomandazioni internazionali suggeriscono di non assegnare un valore
                  numerico per eGFR >60 mL/min/1.73m² poiché l'accuratezza diminuisce verso l'intervallo
                  fisiologico (Lamb 2007). Non utilizzabile nei bambini (esistono equazioni alternative:
                  Counahan-Barratt, Schwartz).</em
                >
              </p>
              <p class="text-body2 q-mb-sm">
                <strong>CKD-EPI (Chronic Kidney Disease Epidemiology Collaboration):</strong><br />
                Formula più recente e accurata con diversi coefficienti per range di creatinina. Utilizza
                κ (kappa: 0.7 per femmine, 0.9 per maschi), α (alpha: variabile in base al confronto
                SCr/κ), e fattori di correzione per genere ed etnia. Migliora la stima soprattutto per
                GFR >60 mL/min/1.73m² rispetto a MDRD (Inker & Levey 2014, 2019).<br />
                <em
                  >Nota: Nel 2021, la formula CKD-EPI è stata aggiornata rimuovendo il fattore di
                  correzione per etnia afroamericana per evitare disparità razziali nell'accesso alle
                  cure (CKD-EPI 2021).</em
                >
              </p>
              <p class="text-body2 q-mb-sm">
                <strong>Cockcroft-Gault:</strong><br />
                Clearance creatinina (mL/min) = [(140 - Età) × Peso (kg) × (0.85 se femmina)] / (72 ×
                SCr mg/dL)<br />
                <em
                  >Utilizzata storicamente per dosaggio farmaci, ma meno accurata di CKD-EPI. Non
                  normalizzata per superficie corporea.</em
                >
              </p>
            </div>

            <!-- Sezione 4: Classificazione CKD (KDIGO) -->
            <div class="q-mb-lg">
              <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                🎯 Classificazione Malattia Renale Cronica (CKD - KDIGO Guidelines)
              </h6>
              <p class="text-body2 q-mb-sm">
                <strong>Definizione CKD (Charles & Ferris 2020):</strong> Malattia renale cronica è
                definita come la presenza di danno renale o ridotta funzione renale per ≥3 mesi,
                indipendentemente dalla causa. La durata di 3 mesi è necessaria per differenziare AKI
                (Acute Kidney Injury) da CKD.
              </p>
              <p class="text-body2 q-mb-sm">
                <strong>Staging K/DOQI (Kidney Disease: Improving Global Outcomes):</strong>
              </p>
              <ul class="text-body2 q-mb-sm">
                <li>
                  <strong class="text-green">Stadio 1 (GFR ≥90):</strong> Funzione renale normale con
                  evidenza di danno renale (proteinuria, anomalie strutturali). Monitoraggio di routine se
                  presenza di fattori di rischio (diabete, ipertensione). Prevalenza ~3% popolazione
                  generale.
                </li>
                <li>
                  <strong class="text-light-green">Stadio 2 (GFR 60-89):</strong> Lieve riduzione
                  funzione renale con danno renale. Valutare fattori di rischio cardiovascolari. Controllo
                  pressorio target &lt;130/80 mmHg. ACE-inibitori/ARB se proteinuria.
                </li>
                <li>
                  <strong class="text-orange">Stadio 3a (GFR 45-59):</strong> Moderata riduzione
                  funzione renale. Riferimento nefrologico raccomandato. Gestione complicanze: anemia
                  (EPO), CKD-MBD (vitamina D, fosforo-leganti), acidosi metabolica (bicarbonato).
                  Restrizione proteica 0.8 g/kg/die.
                </li>
                <li>
                  <strong class="text-deep-orange">Stadio 3b (GFR 30-44):</strong> Moderata-severa
                  riduzione. Preparazione per terapia sostitutiva renale. Screening complicanze
                  cardiovascolari (ecocardiogramma). Vaccinazione HBV. Informazione su dialisi/trapianto.
                </li>
                <li>
                  <strong class="text-red">Stadio 4 (GFR 15-29):</strong> Severa riduzione funzione
                  renale. Preparazione urgente per dialisi o trapianto. Creazione accesso vascolare
                  (fistola arterovenosa). Dieta ipoproteica stretta (0.6 g/kg/die) sotto supervisione
                  nutrizionista.
                </li>
                <li>
                  <strong class="text-purple">Stadio 5 (GFR &lt;15):</strong> Insufficienza renale
                  terminale (ESRD - End-Stage Renal Disease). Terapia sostitutiva renale immediata:
                  emodialisi, dialisi peritoneale o trapianto renale. Sintomi uremici: encefalopatia,
                  pericardite, neuropatia, nausea, prurito.
                </li>
              </ul>
              <p class="text-body2 q-mb-sm">
                <strong>Progressione CKD (Makanjuola & Lapsley 2014):</strong> Una volta iniziata, la
                perdita di nefroni nella CKD contribuisce alla progressione della malattia stessa.
                Meccanismi: ipertensione glomerulare (↑pressione capillare), iperfiltrazione compensatoria
                nei nefroni residui, sclerosi glomerulare, attivazione sistema renina-angiotensina,
                ritenzione fosfato, dislipidemia, fibrosi interstiziale. Il declino del GFR è solitamente
                lineare (~3-5 mL/min/anno in CKD progressiva).
              </p>
            </div>

            <!-- Sezione 5: Gestione Liquidi -->
            <div class="q-mb-lg">
              <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                💧 Bilancio Idrico e Gestione dei Liquidi
              </h6>
              <p class="text-body2 q-mb-sm">
                <strong>Importanza Clinica:</strong> Il monitoraggio del bilancio idrico è cruciale
                nella gestione dei pazienti critici, soprattutto in presenza di disfunzione renale. Un
                bilancio positivo eccessivo è associato ad aumento della mortalità in ICU (Vincent & Weil
                2006).
              </p>
              <p class="text-body2 q-mb-sm">
                <strong>Perdite Insensibili:</strong> Rappresentano le perdite non misurabili di acqua
                attraverso cute e polmoni. Valori normali: ~500-1000 mL/24h. Aumentano con: febbre (+100-150
                mL/°C sopra 37°C), tachipnea, ustioni, sudorazione profusa. Diminuiscono con: ipotermia,
                umidificazione vie aeree.
              </p>
              <p class="text-body2 q-mb-sm">
                <strong>Target di Bilancio:</strong> In pazienti critici stabilizzati, target di
                bilancio neutro o leggermente negativo (-500 a +500 mL/24h) è associato a miglior
                outcome. Nella fase di resuscitazione acuta, bilancio positivo è necessario. Nella
                fase di de-escalation, favorire bilancio negativo con diuretici o ultrafiltrazione.
              </p>
            </div>

            <!-- Sezione 6: Riferimenti Scientifici -->
            <div>
              <h6 class="text-subtitle1 text-weight-bold q-mb-sm">📖 Riferimenti Scientifici</h6>
              <ul class="text-caption">
                <li>
                  <strong>Stevens LA, Levey AS (2010).</strong> "Assessment of Renal Function" in
                  Comprehensive Clinical Nephrology (Fourth Edition). ScienceDirect. Normal GFR values,
                  age-related decline, physiological variation.
                </li>
                <li>
                  <strong>Inker LA, Levey AS (2014).</strong> "Assessment of Glomerular Filtration Rate in
                  Acute and Chronic Settings" in National Kidney Foundation Primer on Kidney Diseases (Sixth
                  Edition). ScienceDirect. GFR measurement methods, eGFR equations, CKD-EPI validation.
                </li>
                <li>
                  <strong>Inker LA, Levey AS (2019).</strong> "Measurement and Estimation of Kidney
                  Function" in Chronic Kidney Disease, Dialysis, and Transplantation (Fourth Edition).
                  ScienceDirect. Updated CKD-EPI 2021 equation, removal of race coefficient.
                </li>
                <li>
                  <strong>Lamb E (2007).</strong> "Renal disorders Part 1 of 3" in Medicine, Vol 35(3):
                  120-125. ScienceDirect. MDRD equation validation, performance deterioration at high GFR,
                  pediatric equations (Counahan-Barratt, Schwartz).
                </li>
                <li>
                  <strong>Cockcroft DW, Gault MH (1976).</strong> "Prediction of creatinine clearance from
                  serum creatinine." Nephron 16(1): 31-41. Original Cockcroft-Gault formula for drug dosing.
                </li>
                <li>
                  <strong>Ronco C, Chawla LS (2019).</strong> "Glomerular Filtration Rate, Renal Functional
                  Reserve, and Kidney Stress Testing" in Critical Care Nephrology (Third Edition).
                  ScienceDirect. GFR regulation mechanisms, renal functional reserve, AKI determination.
                </li>
                <li>
                  <strong>Meltzer J (2013).</strong> "Renal Physiology" in Pharmacology and Physiology for
                  Anesthesia. ScienceDirect. Creatinine clearance formula, filtration fraction, juxtaglomerular
                  apparatus, autoregulation.
                </li>
                <li>
                  <strong>Hashim IA (2024).</strong> "Renal function" in Tutorials in Clinical Chemistry.
                  ScienceDirect. GFR determination clinical importance, cardiovascular disease prediction,
                  early mortality biomarker. Incidence kidney disease US: 10% (1994) → 15% (2021).
                </li>
                <li>
                  <strong>Charles C, Ferris AH (2020).</strong> "Nephrology" in Primary Care: Clinics in
                  Office Practice, Vol 47(4): 551-563. ScienceDirect. CKD definition, diabetes/hypertension
                  as etiologies, primary care management, cardiovascular risk mitigation.
                </li>
                <li>
                  <strong>Makanjuola D, Lapsley M (2014).</strong> "The kidneys, renal function and kidney
                  disease" in Clinical Biochemistry: Metabolic and Clinical Aspects (Third Edition).
                  ScienceDirect. CKD pathogenesis, uraemic syndrome, metabolic disturbances, endocrine
                  abnormalities, renal replacement therapy, K/DOQI staging.
                </li>
                <li>
                  <strong>Vincent JL, Weil MH (2006).</strong> "Fluid challenge revisited." Crit Care Med
                  34(5): 1333-1337. Fluid balance management in critically ill patients, association with
                  mortality.
                </li>
              </ul>
            </div>
          </div>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.q-breadcrumbs-el {
  transition: color 0.3s ease;
}

.q-breadcrumbs-el:hover {
  color: var(--q-primary);
}
</style>
