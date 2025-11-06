<template>
  <q-page class="q-pa-md">
    <!-- Header con breadcrumb -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
        <q-breadcrumbs-el label="GFR Calculator" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">🫘 GFR Calculator</h4>
      <p class="text-subtitle1 text-grey-7">
        Calcolo Funzione Renale: eGFR, Creatinina Clearance e Bilancio Idrico
      </p>
    </div>

    <!-- Medical Info Banner -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="info" color="blue" />
      </template>
      <div class="text-body2">
        <strong>Valutazione Funzione Renale:</strong> eGFR per staging CKD (KDIGO), Clearance
        Creatinina per dosaggio farmaci, Bilancio Idrico per gestione volemico-idrica.
      </div>
    </q-banner>

    <!-- Tab System -->
    <q-card>
      <q-tabs
        v-model="activeTab"
        align="justify"
        narrow-indicator
        class="text-primary"
        active-color="primary"
        indicator-color="primary"
      >
        <q-tab name="egfr" icon="science" label="eGFR (MDRD/CKD-EPI)" />
        <q-tab name="crcl" icon="monitor_weight" label="Creatinine Clearance" />
        <q-tab name="fluid" icon="water_drop" label="Fluid Balance" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <!-- ========================================= -->
        <!-- TAB 1: eGFR (MDRD/CKD-EPI) - ESISTENTE -->
        <!-- ========================================= -->
        <q-tab-panel name="egfr">
          <div class="row q-gutter-lg">
            <!-- Pannello Input -->
            <div class="col-12 col-md-5">
              <q-card class="q-pa-md">
                <q-card-section>
                  <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri Paziente</h6>

                  <!-- Creatinina Sierica -->
                  <q-input
                    v-model.number="formData.creatinine"
                    type="number"
                    step="0.01"
                    label="Creatinina Sierica"
                    suffix="mg/dL"
                    outlined
                    class="q-mb-md"
                    :rules="[
                      (val: number) => (val > 0 && val <= 20) || 'Creatinina tra 0.1-20 mg/dL',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="science" color="blue" />
                    </template>
                  </q-input>

                  <!-- Età -->
                  <q-input
                    v-model.number="formData.age"
                    type="number"
                    label="Età"
                    suffix="anni"
                    outlined
                    class="q-mb-md"
                    :rules="[(val: number) => (val > 0 && val <= 120) || 'Età tra 1-120 anni']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="cake" color="orange" />
                    </template>
                  </q-input>

                  <!-- Sesso -->
                  <q-select
                    v-model="formData.gender"
                    :options="genderOptions"
                    label="Sesso"
                    outlined
                    class="q-mb-md"
                    emit-value
                    map-options
                    :rules="[(val: string) => val !== null || 'Selezionare il sesso']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="purple" />
                    </template>
                  </q-select>

                  <!-- Razza (per correzione) -->
                  <q-select
                    v-model="formData.race"
                    :options="raceOptions"
                    label="Etnia (opzionale per correzione)"
                    outlined
                    class="q-mb-md"
                    emit-value
                    map-options
                  >
                    <template v-slot:prepend>
                      <q-icon name="public" color="green" />
                    </template>
                  </q-select>

                  <!-- Selezione Formula -->
                  <q-select
                    v-model="formData.formula"
                    :options="formulaOptions"
                    label="Formula di Calcolo"
                    outlined
                    class="q-mb-md"
                    emit-value
                    map-options
                  >
                    <template v-slot:prepend>
                      <q-icon name="functions" color="cyan" />
                    </template>
                  </q-select>

                  <!-- Bottone Calcola -->
                  <q-btn
                    @click="calculateGFR"
                    color="primary"
                    size="lg"
                    class="full-width q-mb-sm"
                    icon="calculate"
                    :disable="!isFormValid"
                  >
                    Calcola eGFR
                  </q-btn>

                  <!-- Bottone Reset -->
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
                      {{ result.gfr.toFixed(1) }}
                    </div>
                    <div class="text-subtitle1 text-grey-7">
                      <strong>mL/min/1.73m²</strong> (eGFR)
                    </div>
                    <div class="text-caption text-grey-6">Formula: {{ getFormulaName() }}</div>
                  </div>

                  <!-- Classificazione CKD -->
                  <q-separator class="q-mb-md" />

                  <div class="q-mb-md">
                    <div class="text-h6 q-mb-sm">🎯 Stadio Malattia Renale Cronica:</div>
                    <q-chip
                      :color="result.color"
                      text-color="white"
                      class="text-weight-bold"
                      size="lg"
                    >
                      {{ result.stage }}
                    </q-chip>
                    <div class="text-body2 q-mt-sm">
                      {{ result.description }}
                    </div>
                  </div>

                  <!-- Grafico Funzione Renale -->
                  <div class="q-mb-lg" v-if="result.gfr > 0">
                    <div class="text-subtitle2 q-mb-sm">📊 Livello Funzione Renale:</div>
                    <div class="gfr-scale">
                      <div class="gfr-bar">
                        <div class="gfr-indicator" :style="{ left: getGFRPosition() + '%' }"></div>
                      </div>
                      <div class="gfr-labels row justify-between q-mt-sm">
                        <span class="text-caption">0</span>
                        <span class="text-caption">15</span>
                        <span class="text-caption">30</span>
                        <span class="text-caption">60</span>
                        <span class="text-caption">90</span>
                        <span class="text-caption">120+</span>
                      </div>
                    </div>
                  </div>

                  <!-- Comparazione Formule -->
                  <div class="q-mb-md" v-if="result.gfr > 0">
                    <q-btn
                      @click="showComparison = !showComparison"
                      flat
                      color="primary"
                      :icon="showComparison ? 'expand_less' : 'expand_more'"
                      label="Confronta Formule"
                      class="full-width"
                    />
                    <div v-if="showComparison" class="q-mt-md q-pa-md bg-grey-1 rounded-borders">
                      <div class="row q-gutter-sm">
                        <div class="col-12">
                          <strong>MDRD:</strong> {{ calculateMDRD().toFixed(1) }} mL/min/1.73m²
                        </div>
                        <div class="col-12">
                          <strong>CKD-EPI:</strong> {{ calculateCKDEPI().toFixed(1) }} mL/min/1.73m²
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Stadi CKD -->
                  <q-expansion-item
                    icon="info"
                    label="📚 Classificazione Stadi CKD"
                    class="text-primary"
                  >
                    <div class="q-pa-md bg-grey-1">
                      <div class="row q-gutter-sm text-caption">
                        <div class="col-12">
                          <span class="text-weight-bold text-green">Stadio 1:</span> ≥90 - Funzione
                          normale
                        </div>
                        <div class="col-12">
                          <span class="text-weight-bold text-light-green">Stadio 2:</span> 60-89 -
                          Lieve riduzione
                        </div>
                        <div class="col-12">
                          <span class="text-weight-bold text-orange">Stadio 3a:</span> 45-59 -
                          Moderata riduzione
                        </div>
                        <div class="col-12">
                          <span class="text-weight-bold text-deep-orange">Stadio 3b:</span> 30-44 -
                          Moderata-severa
                        </div>
                        <div class="col-12">
                          <span class="text-weight-bold text-red">Stadio 4:</span> 15-29 - Severa
                          riduzione
                        </div>
                        <div class="col-12">
                          <span class="text-weight-bold text-purple">Stadio 5:</span> &lt;15 -
                          Insufficienza renale
                        </div>
                      </div>
                    </div>
                  </q-expansion-item>

                  <!-- Formule -->
                  <q-expansion-item
                    icon="functions"
                    label="🧮 Formule Utilizzate"
                    class="text-primary q-mt-sm"
                  >
                    <div class="q-pa-md bg-grey-1">
                      <div class="q-mb-md">
                        <strong>MDRD (4-variabili):</strong><br />
                        <small
                          >175 × (SCr)^-1.154 × (Età)^-0.203 × (0.742 se femmina) × (1.212 se
                          afroamericana)</small
                        >
                      </div>
                      <div>
                        <strong>CKD-EPI:</strong><br />
                        <small
                          >Formula più accurata con diversi coefficienti per range di
                          creatinina</small
                        >
                      </div>
                    </div>
                  </q-expansion-item>

                  <!-- Note Cliniche -->
                  <q-expansion-item
                    icon="medical_services"
                    label="💡 Note Cliniche"
                    class="text-primary q-mt-sm"
                    v-if="result.gfr > 0"
                  >
                    <div class="q-pa-md bg-grey-1">
                      <div class="text-body2">
                        {{ getClinicalNotes() }}
                      </div>
                    </div>
                  </q-expansion-item>

                  <!-- Documentazione Medica Completa -->
                  <q-expansion-item
                    icon="book"
                    label="📚 Documentazione Medica Scientifica"
                    class="text-primary q-mt-md"
                  >
                    <div class="q-pa-md bg-grey-1">
                      <!-- Sezione 1: Definizione e Fisiologia -->
                      <div class="q-mb-lg">
                        <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                          🧬 Definizione e Fisiologia del GFR
                        </h6>
                        <p class="text-body2 q-mb-sm">
                          <strong>Glomerular Filtration Rate (GFR)</strong> rappresenta il parametro
                          principale per descrivere la funzione renale. È il prodotto del tasso
                          medio di filtrazione di ogni singolo nefrone (unità filtrante del rene)
                          moltiplicato per il numero totale di nefroni presenti in entrambi i reni.
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Valori Normali:</strong> GFR ~130 mL/min/1.73m² nei giovani
                          maschi, ~120 mL/min/1.73m² nelle giovani femmine (Inker & Levey 2019). La
                          normalizzazione per superficie corporea (1.73m² = area media di giovani
                          adulti) standardizza la funzione renale per le differenze di dimensioni
                          corporee.
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Variabilità Fisiologica:</strong> Il GFR varia considerevolmente
                          secondo età, sesso, dimensioni corporee, attività fisica, dieta, terapie
                          farmacologiche e stati fisiologici come la gravidanza (↑50% nel primo
                          trimestre). Negli adulti, il GFR diminuisce di ~0.75 mL/min/anno dopo i 40
                          anni, ma con ampia variabilità individuale (Stevens & Levey 2010).
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Riserva Funzionale Renale:</strong> La riduzione del GFR può
                          derivare da diminuzione del numero di nefroni o da riduzione del GFR del
                          singolo nefrone (SNGFR). Tuttavia, un aumento compensatorio dello SNGFR
                          (dovuto ad aumento della pressione capillare glomerulare o ipertrofia
                          glomerulare) può mascherare la perdita di nefroni, quindi il GFR può non
                          riflettere immediatamente il danno renale (Ronco & Chawla 2019).
                        </p>
                      </div>

                      <!-- Sezione 2: Metodi di Misurazione -->
                      <div class="q-mb-lg">
                        <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                          🔬 Metodi di Misurazione del GFR
                        </h6>
                        <p class="text-body2 q-mb-sm">
                          <strong>Gold Standard - Clearance dell'Inulina:</strong> Il GFR è misurato
                          idealmente mediante clearance dell'inulina (polisaccaride del fruttosio
                          liberamente filtrato ma non riassorbito né secreto dal tubulo renale): GFR
                          = (U<sub>inulina</sub>
                          × V) / P<sub>inulina</sub>. Tuttavia, è una procedura complessa, costosa e
                          poco pratica per l'uso clinico routinario (Hashim 2024).
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Clearance della Creatinina:</strong> Meno accurata della clearance
                          dell'inulina ma molto più pratica: GFR ≈ (U<sub>creatinina</sub> × V) /
                          P<sub>creatinina</sub>. La creatinina è un prodotto del metabolismo
                          muscolare, filtrata liberamente ma leggermente secreta dai tubuli renali
                          (sovrastima ~10-20%). La creatinina plasmatica aumenta quando il GFR
                          diminuisce, ma è influenzata da massa muscolare, età, sesso e dieta
                          (Meltzer 2013).
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Marcatori Esogeni Alternativi:</strong> Iohexol, ⁵¹Cr-EDTA,
                          ⁹⁹mTc-DTPA per studi dinamici con misurazione della clearance plasmatica.
                          Cistatina C sierica è un biomarker endogeno alternativo, meno influenzato
                          dalla massa muscolare rispetto alla creatinina (Hashim 2024).
                        </p>
                      </div>

                      <!-- Sezione 3: Formule di Stima -->
                      <div class="q-mb-lg">
                        <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                          🧮 Formule di Stima eGFR
                        </h6>
                        <p class="text-body2 q-mb-sm">
                          <strong
                            >MDRD (Modification of Diet in Renal Disease) - 4 variabili (Lamb
                            2007):</strong
                          ><br />
                          eGFR = 175 × (SCr)<sup>-1.154</sup> × (Età)<sup>-0.203</sup> × (0.742 se
                          femmina) × (1.212 se afroamericana)<br />
                          <em
                            >Nota: Le raccomandazioni internazionali suggeriscono di non assegnare
                            un valore numerico per eGFR >60 mL/min/1.73m² poiché l'accuratezza
                            diminuisce verso l'intervallo fisiologico (Lamb 2007). Non utilizzabile
                            nei bambini (esistono equazioni alternative: Counahan-Barratt,
                            Schwartz).</em
                          >
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong
                            >CKD-EPI (Chronic Kidney Disease Epidemiology Collaboration):</strong
                          ><br />
                          Formula più recente e accurata con diversi coefficienti per range di
                          creatinina. Utilizza κ (kappa: 0.7 per femmine, 0.9 per maschi), α (alpha:
                          variabile in base al confronto SCr/κ), e fattori di correzione per genere
                          ed etnia. Migliora la stima soprattutto per GFR >60 mL/min/1.73m² rispetto
                          a MDRD (Inker & Levey 2014, 2019).<br />
                          <em
                            >Nota: Nel 2021, la formula CKD-EPI è stata aggiornata rimuovendo il
                            fattore di correzione per etnia afroamericana per evitare disparità
                            razziali nell'accesso alle cure (CKD-EPI 2021).</em
                          >
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Cockcroft-Gault (futura implementazione):</strong><br />
                          Clearance creatinina (mL/min) = [(140 - Età) × Peso (kg) × (0.85 se
                          femmina)] / (72 × SCr mg/dL)<br />
                          <em
                            >Utilizzata storicamente per dosaggio farmaci, ma meno accurata di
                            CKD-EPI. Non normalizzata per superficie corporea.</em
                          >
                        </p>
                      </div>

                      <!-- Sezione 4: Classificazione CKD (KDIGO) -->
                      <div class="q-mb-lg">
                        <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                          🎯 Classificazione Malattia Renale Cronica (CKD - KDIGO Guidelines)
                        </h6>
                        <p class="text-body2 q-mb-sm">
                          <strong>Definizione CKD (Charles & Ferris 2020):</strong> Malattia renale
                          cronica è definita come la presenza di danno renale o ridotta funzione
                          renale per ≥3 mesi, indipendentemente dalla causa. La durata di 3 mesi è
                          necessaria per differenziare AKI (Acute Kidney Injury) da CKD.
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong
                            >Staging K/DOQI (Kidney Disease: Improving Global Outcomes):</strong
                          >
                        </p>
                        <ul class="text-body2 q-mb-sm">
                          <li>
                            <strong class="text-green">Stadio 1 (GFR ≥90):</strong> Funzione renale
                            normale con evidenza di danno renale (proteinuria, anomalie
                            strutturali). Monitoraggio di routine se presenza di fattori di rischio
                            (diabete, ipertensione). Prevalenza ~3% popolazione generale.
                          </li>
                          <li>
                            <strong class="text-light-green">Stadio 2 (GFR 60-89):</strong> Lieve
                            riduzione funzione renale con danno renale. Valutare fattori di rischio
                            cardiovascolari. Controllo pressorio target &lt;130/80 mmHg.
                            ACE-inibitori/ARB se proteinuria.
                          </li>
                          <li>
                            <strong class="text-orange">Stadio 3a (GFR 45-59):</strong> Moderata
                            riduzione funzione renale. Riferimento nefrologico raccomandato.
                            Gestione complicanze: anemia (EPO), CKD-MBD (vitamina D,
                            fosforo-leganti), acidosi metabolica (bicarbonato). Restrizione proteica
                            0.8 g/kg/die.
                          </li>
                          <li>
                            <strong class="text-deep-orange">Stadio 3b (GFR 30-44):</strong>
                            Moderata-severa riduzione. Preparazione per terapia sostitutiva renale.
                            Screening complicanze cardiovascolari (ecocardiogramma). Vaccinazione
                            HBV. Informazione su dialisi/trapianto.
                          </li>
                          <li>
                            <strong class="text-red">Stadio 4 (GFR 15-29):</strong> Severa riduzione
                            funzione renale. Preparazione urgente per dialisi o trapianto. Creazione
                            accesso vascolare (fistola arterovenosa). Dieta ipoproteica stretta (0.6
                            g/kg/die) sotto supervisione nutrizionista.
                          </li>
                          <li>
                            <strong class="text-purple">Stadio 5 (GFR &lt;15):</strong>
                            Insufficienza renale terminale (ESRD - End-Stage Renal Disease). Terapia
                            sostitutiva renale immediata: emodialisi, dialisi peritoneale o
                            trapianto renale. Sintomi uremici: encefalopatia, pericardite,
                            neuropatia, nausea, prurito.
                          </li>
                        </ul>
                        <p class="text-body2 q-mb-sm">
                          <strong>Progressione CKD (Makanjuola & Lapsley 2014):</strong> Una volta
                          iniziata, la perdita di nefroni nella CKD contribuisce alla progressione
                          della malattia stessa. Meccanismi: ipertensione glomerulare (↑pressione
                          capillare), iperfiltrazione compensatoria nei nefroni residui, sclerosi
                          glomerulare, attivazione sistema renina-angiotensina, ritenzione fosfato,
                          dislipidemia, fibrosi interstiziale. Il declino del GFR è solitamente
                          lineare (~3-5 mL/min/anno in CKD progressiva).
                        </p>
                      </div>

                      <!-- Sezione 5: Complicanze CKD -->
                      <div class="q-mb-lg">
                        <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                          ⚠️ Complicanze Metaboliche e Sistemiche
                        </h6>
                        <p class="text-body2 q-mb-sm">
                          <strong>Sindrome Uremica (Makanjuola & Lapsley 2014):</strong>
                          Caratterizzata da ritenzione di "tossine uremiche" (PTH,
                          β₂-microglobulina, indoxyl sulfato, p-cresil solfato, middle molecules) e
                          deficit ormonali (eritropoietina, calcitriolo). Manifestazioni
                          multi-sistemiche:
                        </p>
                        <ul class="text-body2 q-mb-sm">
                          <li>
                            <strong>Cardiovascolari:</strong> Ipertensione (90%), insufficienza
                            cardiaca, aterosclerosi accelerata, pericardite uremica, calcificazione
                            vascolare (rischio CV 10-20× superiore). La CKD è uno dei principali
                            fattori di rischio per mortalità cardiovascolare (Kovesdy 2022).
                          </li>
                          <li>
                            <strong>Neurologiche:</strong> Encefalopatia uremica (confusione,
                            asterixis, convulsioni), neuropatia periferica (sensitivo-motoria,
                            sindrome gambe senza riposo), deficit cognitivi.
                          </li>
                          <li>
                            <strong>CKD-MBD (Mineral and Bone Disorder):</strong> Osteodistrofia
                            renale (osteomalacia, iperparatiroidismo secondario, osteosclerosi,
                            osteopenia). Meccanismo: deficit sintesi calcitriolo (1,25-(OH)₂D₃) →
                            ↓assorbimento Ca²⁺ intestinale → ↑PTH → demineralizzazione ossea.
                            Ritenzione fosfato (GFR &lt;60 mL/min) → ↑FGF-23 → ↓sintesi calcitriolo.
                          </li>
                          <li>
                            <strong>Anemia Normocromica Normocitica:</strong> Deficit relativo di
                            eritropoietina (EPO prodotta dalle cellule interstiziali peritubulari
                            renali). Aggravata da tossine uremiche (soppressione midollo), emorragie
                            (disfunzione piastrinica), emolisi, emodiluizione. Trattamento: EPO
                            ricombinante, supplementazione ferro.
                          </li>
                          <li>
                            <strong>Acidosi Metabolica:</strong> Incapacità di escrezione H⁺ (~40-80
                            mmol/24h). Quando GFR &lt;30 mL/min, si sviluppa acidosi (ridotta
                            escrezione fosfato → ↓buffer urinario, ridotta ammoniogenesi). pH
                            stabilizzato da buffering osseo (demineralizzazione).
                          </li>
                          <li>
                            <strong>Iperkaliemia:</strong> Mantenimento bilancio K⁺ fino a GFR ~5
                            mL/min grazie a adattamento (↑secrezione distale K⁺, ↑escrezione
                            colica). Precipitata da ACE-inibitori, diuretici risparmiatori K⁺,
                            β-bloccanti, acidosi. Complicanza life-threatening (aritmie cardiache).
                          </li>
                          <li>
                            <strong>Disfunzione Endocrina:</strong> Intolleranza glucidica
                            (resistenza insulinica), dislipidemia (↑trigliceridi, ↑VLDL, ↓HDL),
                            iperparatiroidismo secondario/terziario, iperprolattinemia, disfunzione
                            sessuale (impotenza, amenorrea, infertilità), ritardo di crescita nei
                            bambini.
                          </li>
                          <li>
                            <strong>Immunosoppressione:</strong> Deficit immunità cellulare e
                            umorale. ↑suscettibilità infezioni, ↑rischio neoplasie. Utile
                            vaccinazione HBV, influenza, pneumococco.
                          </li>
                        </ul>
                      </div>

                      <!-- Sezione 6: Gestione Terapeutica -->
                      <div class="q-mb-lg">
                        <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                          💊 Gestione Terapeutica e Rallentamento Progressione
                        </h6>
                        <p class="text-body2 q-mb-sm">
                          <strong>Obiettivi Terapeutici (Charles & Ferris 2020):</strong>
                        </p>
                        <ul class="text-body2 q-mb-sm">
                          <li>
                            <strong>Rallentare Progressione CKD:</strong> Controllo pressorio
                            rigoroso (&lt;130/80 mmHg). ACE-inibitori/ARB riducono proteinuria e
                            ipertensione intraglomerulare (riduzione rischio progressione ~20-30%).
                            Controllo glicemico (HbA1c &lt;7%) nel diabete. Restrizione proteica
                            moderata (0.8 g/kg/die stadio 3-4, 0.6 g/kg/die stadio 5 con
                            supervisione) riduce iperfiltrazione e carico metabolico. Restrizione
                            sale (2-3 g Na⁺/die), fosforo (&lt;800-1000 mg/die).
                          </li>
                          <li>
                            <strong>Ridurre Rischio Cardiovascolare:</strong> Statine per
                            dislipidemia (target LDL &lt;100 mg/dL o &lt;70 mg/dL se diabete).
                            Aspirina in prevenzione secondaria. Controllo fattori di rischio: fumo,
                            obesità, sedentarietà.
                          </li>
                          <li>
                            <strong>Prevenire/Trattare Complicanze:</strong> EPO ricombinante per
                            anemia (target Hb 10-12 g/dL, evitare sovracorrezione →↑rischio CV).
                            Calcitriolo (1,25-(OH)₂D₃) o analoghi vitamina D per CKD-MBD.
                            Fosforo-leganti (calcio carbonato, sevelamer, lanthanum) per
                            iperfosfatemia. Calcio-mimetici (cinacalcet) per iperparatiroidismo.
                            Bicarbonato per acidosi.
                          </li>
                          <li>
                            <strong>Evitare Nefrotossine:</strong> FANS, aminoglicosidi, contrasto
                            iodato (se necessario: idratazione pre/post, N-acetilcisteina),
                            ACE-inibitori/ARB in stenosi arteria renale bilaterale.
                          </li>
                        </ul>
                        <p class="text-body2 q-mb-sm">
                          <strong
                            >Terapia Sostitutiva Renale (RRT - Makanjuola & Lapsley 2014):</strong
                          >
                          Indicata quando eGFR &lt;15 mL/min/1.73m² (stadio 5) o presenza di sintomi
                          uremici intrattabili, iperkaliemia persistente, sovraccarico volemico
                          refrattario, pericardite uremica, encefalopatia. Opzioni:
                        </p>
                        <ul class="text-body2 q-mb-sm">
                          <li>
                            <strong>Emodialisi (HD):</strong> Rimozione tossine per diffusione
                            attraverso membrana semipermeabile. Frequenza: 3 sessioni/settimana
                            (12-15h totali). Necessario accesso vascolare (fistola arterovenosa
                            preferita). Adequacy dialisi: Kt/V >1.0 (K=clearance urea, t=tempo,
                            V=volume distribuzione urea).
                          </li>
                          <li>
                            <strong>Dialisi Peritoneale (PD):</strong> Utilizzo membrana peritoneale
                            come filtro. Continuous Ambulatory PD (CAPD): 3-4 scambi/24h. Automated
                            PD (APD): scambi notturni con ciclatore. Perdita proteica dializzato:
                            fino a 40 g/24h (↑fabbisogno proteico 1.2-1.5 g/kg/die).
                          </li>
                          <li>
                            <strong>Trapianto Renale:</strong> Trattamento definitivo preferito.
                            Sopravvivenza graft: >88% da donatore deceduto, >95% da donatore vivente
                            a 1 anno. Immunosoppressione: induzione (anti-IL-2R), mantenimento
                            (inibitori calcineurina: ciclosporina/tacrolimus, agenti
                            antiproliferativi: azatioprina/micofenolato, corticosteroidi).
                            Monitoraggio terapeutico farmaci (TDM) essenziale per prevenire
                            nefrotossicità.
                          </li>
                        </ul>
                      </div>

                      <!-- Sezione 7: Riferimenti Scientifici -->
                      <div>
                        <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                          📖 Riferimenti Scientifici
                        </h6>
                        <ul class="text-caption">
                          <li>
                            <strong>Stevens LA, Levey AS (2010).</strong> "Assessment of Renal
                            Function" in Comprehensive Clinical Nephrology (Fourth Edition).
                            ScienceDirect. Normal GFR values, age-related decline, physiological
                            variation.
                          </li>
                          <li>
                            <strong>Inker LA, Levey AS (2014).</strong> "Assessment of Glomerular
                            Filtration Rate in Acute and Chronic Settings" in National Kidney
                            Foundation Primer on Kidney Diseases (Sixth Edition). ScienceDirect. GFR
                            measurement methods, eGFR equations, CKD-EPI validation.
                          </li>
                          <li>
                            <strong>Inker LA, Levey AS (2019).</strong> "Measurement and Estimation
                            of Kidney Function" in Chronic Kidney Disease, Dialysis, and
                            Transplantation (Fourth Edition). ScienceDirect. Updated CKD-EPI 2021
                            equation, removal of race coefficient.
                          </li>
                          <li>
                            <strong>Lamb E (2007).</strong> "Renal disorders Part 1 of 3" in
                            Medicine, Vol 35(3): 120-125. ScienceDirect. MDRD equation validation,
                            performance deterioration at high GFR, pediatric equations
                            (Counahan-Barratt, Schwartz).
                          </li>
                          <li>
                            <strong>Ronco C, Chawla LS (2019).</strong> "Glomerular Filtration Rate,
                            Renal Functional Reserve, and Kidney Stress Testing" in Critical Care
                            Nephrology (Third Edition). ScienceDirect. GFR regulation mechanisms,
                            renal functional reserve, AKI determination.
                          </li>
                          <li>
                            <strong>Meltzer J (2013).</strong> "Renal Physiology" in Pharmacology
                            and Physiology for Anesthesia. ScienceDirect. Creatinine clearance
                            formula, filtration fraction, juxtaglomerular apparatus, autoregulation.
                          </li>
                          <li>
                            <strong>Hashim IA (2024).</strong> "Renal function" in Tutorials in
                            Clinical Chemistry. ScienceDirect. GFR determination clinical
                            importance, cardiovascular disease prediction, early mortality
                            biomarker. Incidence kidney disease US: 10% (1994) → 15% (2021).
                          </li>
                          <li>
                            <strong>Charles C, Ferris AH (2020).</strong> "Nephrology" in Primary
                            Care: Clinics in Office Practice, Vol 47(4): 551-563. ScienceDirect. CKD
                            definition, diabetes/hypertension as etiologies, primary care
                            management, cardiovascular risk mitigation.
                          </li>
                          <li>
                            <strong>Kovesdy CP (2022).</strong> "Aldosterone and the
                            Mineralocorticoid Receptor: Emerging Therapeutic Paradigms for
                            Cardiorenal Protection" in Kidney International Supplements, Vol 12(1):
                            1-5. ScienceDirect. CKD global burden (>800 million), mortality trends,
                            cardiorenal protection strategies.
                          </li>
                          <li>
                            <strong>Makanjuola D, Lapsley M (2014).</strong> "The kidneys, renal
                            function and kidney disease" in Clinical Biochemistry: Metabolic and
                            Clinical Aspects (Third Edition). ScienceDirect. CKD pathogenesis,
                            uraemic syndrome, metabolic disturbances, endocrine abnormalities, renal
                            replacement therapy, K/DOQI staging.
                          </li>
                          <li>
                            <strong>Cardozo LFMF, Mafra D (2023).</strong> "45th Anniversary of
                            ISRNM" in Journal of Renal Nutrition, Vol 33(6): 443-452. ScienceDirect.
                            CKD cardiovascular risk factors, uremic phenotype, mitochondrial
                            dysfunction, gut dysbiosis, nutritional interventions for kidney-heart
                            axis protection.
                          </li>
                          <li>
                            <strong>Wong CW, Sabanayagam C (2014).</strong> "Kidney and eye
                            diseases: common risk factors, etiological mechanisms, and pathways" in
                            Kidney International, Vol 85(6): 1290-1302. ScienceDirect. CKD-ocular
                            disease associations (AMD, diabetic retinopathy, glaucoma), Common Soil
                            Hypothesis, shared vascular risk factors.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </q-expansion-item>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>

        <!-- ========================================= -->
        <!-- TAB 2: CREATININE CLEARANCE (Cockcroft-Gault) - NUOVO -->
        <!-- ========================================= -->
        <q-tab-panel name="crcl">
          <div class="row q-gutter-lg">
            <!-- Pannello Input CrCl -->
            <div class="col-12 col-md-5">
              <q-card flat bordered class="q-pa-md">
                <q-card-section>
                  <h6 class="text-h6 q-ma-none q-mb-md">💊 Parametri Paziente</h6>
                  <p class="text-caption text-grey-7 q-mb-md">
                    Formula Cockcroft-Gault per dosaggio farmaci (non normalizzata per BSA)
                  </p>

                  <!-- Creatinina Sierica -->
                  <q-input
                    v-model.number="crclForm.creatinine"
                    type="number"
                    step="0.01"
                    label="Creatinina Sierica"
                    suffix="mg/dL"
                    outlined
                    class="q-mb-md"
                    :rules="[
                      (val: number) => (val > 0 && val <= 20) || 'Creatinina tra 0.1-20 mg/dL',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="science" color="blue" />
                    </template>
                  </q-input>

                  <!-- Età -->
                  <q-input
                    v-model.number="crclForm.age"
                    type="number"
                    label="Età"
                    suffix="anni"
                    outlined
                    class="q-mb-md"
                    :rules="[(val: number) => (val > 0 && val <= 120) || 'Età tra 1-120 anni']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="cake" color="orange" />
                    </template>
                  </q-input>

                  <!-- Peso -->
                  <q-input
                    v-model.number="crclForm.weight"
                    type="number"
                    step="0.1"
                    label="Peso Corporeo"
                    suffix="kg"
                    outlined
                    class="q-mb-md"
                    :rules="[(val: number) => (val > 0 && val <= 300) || 'Peso tra 1-300 kg']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="monitor_weight" color="green" />
                    </template>
                  </q-input>

                  <!-- Sesso -->
                  <q-select
                    v-model="crclForm.gender"
                    :options="genderOptions"
                    label="Sesso"
                    outlined
                    class="q-mb-md"
                    emit-value
                    map-options
                    :rules="[(val: string) => val !== null || 'Selezionare il sesso']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="purple" />
                    </template>
                  </q-select>

                  <!-- Bottone Calcola -->
                  <q-btn
                    @click="calculateCrCl"
                    color="primary"
                    size="lg"
                    class="full-width q-mb-sm"
                    icon="calculate"
                    :disable="!isCrClFormValid"
                  >
                    Calcola CrCl
                  </q-btn>

                  <!-- Bottone Reset -->
                  <q-btn
                    @click="resetCrClForm"
                    color="negative"
                    size="md"
                    class="full-width"
                    icon="refresh"
                    outline
                  >
                    Reset Dati
                  </q-btn>
                </q-card-section>
              </q-card>
            </div>

            <!-- Pannello Risultati CrCl -->
            <div class="col-12 col-md-6">
              <q-card flat bordered class="q-pa-md">
                <q-card-section>
                  <h6 class="text-h6 q-ma-none q-mb-md">📈 Risultati</h6>

                  <!-- Risultato Principale -->
                  <div class="text-center q-mb-lg">
                    <div class="text-h3 text-primary q-mb-sm">
                      {{ crclResult.crcl.toFixed(1) }}
                    </div>
                    <div class="text-subtitle1 text-grey-7">
                      <strong>mL/min</strong> (Creatinine Clearance)
                    </div>
                    <div class="text-caption text-grey-6">Formula: Cockcroft-Gault</div>
                  </div>

                  <q-separator class="q-mb-md" />

                  <!-- Note Cliniche -->
                  <q-banner class="bg-amber-1 q-mb-md" rounded dense>
                    <template v-slot:avatar>
                      <q-icon name="warning" color="amber" />
                    </template>
                    <div class="text-caption">
                      <strong>Uso Clinico:</strong> CrCl per dosaggio farmaci renalmente escreti.
                      eGFR per staging CKD.
                    </div>
                  </q-banner>

                  <!-- Interpretazione -->
                  <div class="q-mb-md" v-if="crclResult.crcl > 0">
                    <div class="text-subtitle2 q-mb-sm">🎯 Interpretazione Dosaggio Farmaci:</div>
                    <q-chip
                      :color="getCrClColor(crclResult.crcl)"
                      text-color="white"
                      class="text-weight-bold"
                      size="lg"
                    >
                      {{ getCrClInterpretation(crclResult.crcl) }}
                    </q-chip>
                    <div class="text-body2 q-mt-sm text-grey-8">
                      {{ getCrClClinicalNotes(crclResult.crcl) }}
                    </div>
                  </div>

                  <!-- Formula -->
                  <q-expansion-item
                    icon="functions"
                    label="🧮 Formula Cockcroft-Gault"
                    class="text-primary"
                  >
                    <div class="q-pa-md bg-grey-1">
                      <div class="q-mb-sm">
                        <strong>CrCl (mL/min) =</strong><br />
                        <small
                          >[(140 - Età) × Peso (kg) × (0.85 se femmina)] / (72 × SCr mg/dL)</small
                        >
                      </div>
                      <div class="text-caption text-grey-7">
                        <strong>Nota:</strong> NON normalizzata per superficie corporea (1.73m²).
                        Utilizzata principalmente per aggiustamento dosaggio farmaci renalmente
                        escreti.
                      </div>
                    </div>
                  </q-expansion-item>

                  <!-- Documentazione Scientifica CrCl -->
                  <q-expansion-item
                    icon="book"
                    label="📚 Documentazione Scientifica"
                    class="text-primary q-mt-sm"
                  >
                    <div class="q-pa-md bg-grey-1">
                      <div class="q-mb-md">
                        <h6 class="text-subtitle2 text-weight-bold q-mb-sm">
                          💊 Cockcroft-Gault vs eGFR
                        </h6>
                        <p class="text-body2 q-mb-sm">
                          <strong>Cockcroft-Gault (1976):</strong> Formula storica per stima
                          clearance creatinina, sviluppata su 236 pazienti maschi. Incorpora peso
                          corporeo (massa muscolare proxy) e correzione -15% per femmine (minore
                          massa muscolare). NON normalizzata per BSA 1.73m².
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Uso Clinico:</strong> Dosaggio farmaci renalmente escreti
                          (aminoglicosidi, vancomicina, chemioterapici). FDA e linee guida
                          farmacologiche raccomandano CrCl Cockcroft-Gault per aggiustamento dose,
                          NON eGFR (normalizzato BSA non riflette clearance farmacocinetica reale).
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Limitazioni:</strong> Sovrastima GFR in obesità (peso eccessivo),
                          sottostima in cachessia/amputazioni. Considera Adjusted Body Weight (ABW)
                          in pazienti obesi: ABW = IBW + 0.4×(TBW-IBW).
                        </p>
                      </div>

                      <div class="q-mb-md">
                        <h6 class="text-subtitle2 text-weight-bold q-mb-sm">
                          📖 Riferimenti Scientifici
                        </h6>
                        <ul class="text-caption">
                          <li>
                            <strong>Fox KM, McClung MR (2004).</strong> "Drug dosing in the older
                            patient with chronic kidney disease" in Clinics in Geriatric Medicine,
                            Vol 20(1). ScienceDirect. Cockcroft-Gault formula validation, drug
                            dosing adjustments in elderly CKD, nephrotoxicity prevention.
                          </li>
                          <li>
                            <strong>Stevens & Levey (2010).</strong> GFR estimation equations.
                            ScienceDirect. Comparison CrCl vs eGFR for clinical decision-making.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </q-expansion-item>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>

        <!-- ========================================= -->
        <!-- TAB 3: FLUID BALANCE (Bilancio Idrico) - NUOVO -->
        <!-- ========================================= -->
        <q-tab-panel name="fluid">
          <div class="row q-gutter-lg">
            <!-- Pannello Input Fluid Balance -->
            <div class="col-12 col-md-5">
              <q-card flat bordered class="q-pa-md">
                <q-card-section>
                  <h6 class="text-h6 q-ma-none q-mb-md">💧 Bilancio Idrico (24h)</h6>

                  <!-- ENTRATE (INPUTS) -->
                  <div class="q-mb-lg">
                    <div class="text-subtitle2 text-weight-bold text-green q-mb-sm">
                      ➕ ENTRATE (Inputs)
                    </div>

                    <q-input
                      v-model.number="fluidForm.intake.oral"
                      type="number"
                      step="10"
                      label="Liquidi Orali (bevande)"
                      suffix="mL"
                      outlined
                      dense
                      class="q-mb-sm"
                    >
                      <template v-slot:prepend>
                        <q-icon name="local_drink" color="blue" size="sm" />
                      </template>
                    </q-input>

                    <q-input
                      v-model.number="fluidForm.intake.food"
                      type="number"
                      step="10"
                      label="Acqua da Cibo"
                      suffix="mL"
                      outlined
                      dense
                      class="q-mb-sm"
                    >
                      <template v-slot:prepend>
                        <q-icon name="restaurant" color="orange" size="sm" />
                      </template>
                    </q-input>

                    <q-input
                      v-model.number="fluidForm.intake.iv"
                      type="number"
                      step="10"
                      label="Infusioni IV"
                      suffix="mL"
                      outlined
                      dense
                      class="q-mb-sm"
                    >
                      <template v-slot:prepend>
                        <q-icon name="medical_services" color="red" size="sm" />
                      </template>
                    </q-input>

                    <q-separator class="q-my-sm" />

                    <div class="text-body2 text-weight-bold text-green">
                      Totale Entrate: {{ totalIntake.toFixed(0) }} mL
                    </div>
                  </div>

                  <!-- USCITE (OUTPUTS) -->
                  <div class="q-mb-lg">
                    <div class="text-subtitle2 text-weight-bold text-red q-mb-sm">
                      ➖ USCITE (Outputs)
                    </div>

                    <q-input
                      v-model.number="fluidForm.output.urine"
                      type="number"
                      step="10"
                      label="Diuresi"
                      suffix="mL"
                      outlined
                      dense
                      class="q-mb-sm"
                    >
                      <template v-slot:prepend>
                        <q-icon name="water_drop" color="cyan" size="sm" />
                      </template>
                    </q-input>

                    <q-input
                      v-model.number="fluidForm.output.stool"
                      type="number"
                      step="10"
                      label="Feci"
                      suffix="mL"
                      outlined
                      dense
                      class="q-mb-sm"
                    >
                      <template v-slot:prepend>
                        <q-icon name="masks" color="brown" size="sm" />
                      </template>
                    </q-input>

                    <q-input
                      v-model.number="fluidForm.output.insensible"
                      type="number"
                      step="50"
                      label="Perspiratio Insensibilis (stima 500-800 mL)"
                      suffix="mL"
                      outlined
                      dense
                      class="q-mb-sm"
                      hint="Perdite respiratorie + cutanee"
                    >
                      <template v-slot:prepend>
                        <q-icon name="air" color="grey" size="sm" />
                      </template>
                    </q-input>

                    <q-separator class="q-my-sm" />

                    <div class="text-body2 text-weight-bold text-red">
                      Totale Uscite: {{ totalOutput.toFixed(0) }} mL
                    </div>
                  </div>

                  <!-- Bottone Calcola -->
                  <q-btn
                    @click="calculateFluidBalance"
                    color="primary"
                    size="lg"
                    class="full-width q-mb-sm"
                    icon="calculate"
                  >
                    Calcola Bilancio
                  </q-btn>

                  <!-- Bottone Reset -->
                  <q-btn
                    @click="resetFluidForm"
                    color="negative"
                    size="md"
                    class="full-width"
                    icon="refresh"
                    outline
                  >
                    Reset Dati
                  </q-btn>
                </q-card-section>
              </q-card>
            </div>

            <!-- Pannello Risultati Fluid Balance -->
            <div class="col-12 col-md-6">
              <q-card flat bordered class="q-pa-md">
                <q-card-section>
                  <h6 class="text-h6 q-ma-none q-mb-md">📊 Risultati Bilancio Idrico</h6>

                  <!-- Bilancio Netto -->
                  <div class="text-center q-mb-lg">
                    <div
                      class="text-h3 q-mb-sm"
                      :class="fluidBalance >= 0 ? 'text-blue' : 'text-orange'"
                    >
                      {{ fluidBalance >= 0 ? '+' : '' }}{{ fluidBalance.toFixed(0) }}
                    </div>
                    <div class="text-subtitle1 text-grey-7">
                      <strong>mL</strong> (Bilancio Netto 24h)
                    </div>
                  </div>

                  <q-separator class="q-mb-md" />

                  <!-- Interpretazione -->
                  <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-sm">🎯 Interpretazione Clinica:</div>
                    <q-chip
                      :color="getFluidBalanceColor(fluidBalance)"
                      text-color="white"
                      class="text-weight-bold"
                      size="lg"
                    >
                      {{ getFluidBalanceStatus(fluidBalance) }}
                    </q-chip>
                    <div class="text-body2 q-mt-sm text-grey-8">
                      {{ getFluidBalanceClinicalNotes(fluidBalance) }}
                    </div>
                  </div>

                  <!-- Summary -->
                  <div class="q-mb-md">
                    <q-list dense bordered class="rounded-borders">
                      <q-item>
                        <q-item-section avatar>
                          <q-icon color="green" name="add_circle" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Totale Entrate</q-item-label>
                          <q-item-label caption>{{ totalIntake.toFixed(0) }} mL</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-separator />

                      <q-item>
                        <q-item-section avatar>
                          <q-icon color="red" name="remove_circle" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Totale Uscite</q-item-label>
                          <q-item-label caption>{{ totalOutput.toFixed(0) }} mL</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-separator />

                      <q-item>
                        <q-item-section avatar>
                          <q-icon color="primary" name="balance" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-bold">Bilancio Netto</q-item-label>
                          <q-item-label caption class="text-weight-bold">
                            {{ fluidBalance >= 0 ? '+' : '' }}{{ fluidBalance.toFixed(0) }} mL
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <!-- Note Cliniche -->
                  <q-expansion-item
                    icon="medical_services"
                    label="💡 Note Cliniche"
                    class="text-primary"
                  >
                    <div class="q-pa-md bg-grey-1">
                      <div class="text-body2">
                        <strong>Bilancio Positivo (>+500 mL):</strong> Sovraccarico volemico,
                        rischio edema polmonare in CKD/scompenso cardiaco. Considera restrizione
                        fluidi + diuretici.<br /><br />
                        <strong>Bilancio Negativo (&lt;-500 mL):</strong> Deplezione
                        volemico-idrica, rischio pre-renale AKI. Valuta cause (diuretici, vomito,
                        diarrea) e reintegro fluidi.<br /><br />
                        <strong>Bilancio Neutro (±500 mL):</strong> Stato euvolemico ottimale.
                        Target in pazienti critici e CKD.
                      </div>
                    </div>
                  </q-expansion-item>

                  <!-- Documentazione Scientifica Fluid Balance -->
                  <q-expansion-item
                    icon="book"
                    label="📚 Documentazione Scientifica"
                    class="text-primary q-mt-sm"
                  >
                    <div class="q-pa-md bg-grey-1">
                      <div class="q-mb-md">
                        <h6 class="text-subtitle2 text-weight-bold q-mb-sm">
                          💧 Gestione Bilancio Idrico in CKD
                        </h6>
                        <p class="text-body2 q-mb-sm">
                          <strong>Fisiologia:</strong> In condizioni normali, bilancio neutro con
                          entrate ~2500 mL/24h (liquidi 1500, cibo 700, metabolismo ossidativo 300)
                          e uscite ~2500 mL/24h (urina 1500, feci 100, perspiratio insensibilis
                          900).
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>CKD e Fluid Balance:</strong> Progressiva perdita capacità di
                          concentrazione urinaria (↓responsività ADH). In CKD stadio 4-5, diuresi
                          &lt;500 mL/24h richiede restrizione fluidi &lt;1000 mL/die per prevenire
                          sovraccarico. Monitoraggio giornaliero bilancio + peso corporeo essenziale
                          in dialisi (target dry weight).
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Perspiratio Insensibilis:</strong> ~400-800 mL/24h in condizioni
                          normali. ↑in febbre (+200 mL per °C >37), iperventilazione, ustioni.
                          Spesso sottostimata nei bilanci, causando errori nella valutazione stato
                          volemico.
                        </p>
                      </div>

                      <div class="q-mb-md">
                        <h6 class="text-subtitle2 text-weight-bold q-mb-sm">
                          📖 Riferimenti Scientifici
                        </h6>
                        <ul class="text-caption">
                          <li>
                            <strong>Makanjuola D, Lapsley M (2014).</strong> "The kidneys, renal
                            function and kidney disease" in Clinical Biochemistry: Metabolic and
                            Clinical Aspects (Third Edition). ScienceDirect. Fluid balance
                            management in CKD, uraemic syndrome, dialysis prescription.
                          </li>
                          <li>
                            <strong>Ronco & Chawla (2019).</strong> Critical Care Nephrology.
                            ScienceDirect. Fluid overload in AKI, ultrafiltration strategies,
                            bioimpedance monitoring.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </q-expansion-item>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useResetForm } from 'src/composables/useResetForm';

// ============================================================
// INTERFACES
// ============================================================

// Interfaccia per i dati del form eGFR
interface GFRFormData {
  creatinine: number | null; // Creatinina sierica (mg/dL)
  age: number | null; // Età (anni)
  gender: string | null; // Sesso
  race: string | null; // Razza (per correzione)
  formula: string; // Formula selezionata
}

// Interfaccia per i risultati eGFR
interface GFRResult {
  gfr: number;
  stage: string;
  description: string;
  color: string;
}

// Interfaccia per i dati del form Creatinine Clearance
interface CrClFormData {
  creatinine: number | null;
  age: number | null;
  weight: number | null;
  gender: string | null;
}

// Interfaccia per i risultati CrCl
interface CrClResult {
  crcl: number;
}

// Interfaccia per i dati del Fluid Balance
interface FluidBalanceData {
  intake: {
    oral: number;
    food: number;
    iv: number;
  };
  output: {
    urine: number;
    stool: number;
    insensible: number;
  };
}

// ============================================================
// STATE - TAB SYSTEM
// ============================================================
const activeTab = ref<string>('egfr');

// ============================================================
// STATE - eGFR (TAB 1)
// ============================================================
const initialFormData: GFRFormData = {
  creatinine: null,
  age: null,
  gender: null,
  race: 'other',
  formula: 'ckdepi',
};

const initialResult: GFRResult = {
  gfr: 0,
  stage: '',
  description: '',
  color: 'grey',
};

// Dati reattivi del form eGFR (rinominati per chiarezza con tabs)
const egfrForm = ref<GFRFormData>({ ...initialFormData });
const egfrResult = ref<GFRResult>({ ...initialResult });

// Mantieni compatibilità con vecchi nomi per le funzioni esistenti
const formData = egfrForm;
const result = egfrResult;

// Reset form composable eGFR
const { resetForm: resetFormData } = useResetForm(egfrForm, egfrResult, initialFormData);

const resetForm = () => {
  resetFormData();
  egfrResult.value = { ...initialResult };
};

// ============================================================
// STATE - CREATININE CLEARANCE (TAB 2)
// ============================================================
const initialCrClForm: CrClFormData = {
  creatinine: null,
  age: null,
  weight: null,
  gender: null,
};

const initialCrClResult: CrClResult = {
  crcl: 0,
};

const crclForm = ref<CrClFormData>({ ...initialCrClForm });
const crclResult = ref<CrClResult>({ ...initialCrClResult });

const { resetForm: resetCrClFormData } = useResetForm(crclForm, crclResult, initialCrClForm);

const resetCrClForm = () => {
  resetCrClFormData();
  crclResult.value = { ...initialCrClResult };
};

// ============================================================
// STATE - FLUID BALANCE (TAB 3)
// ============================================================
const initialFluidForm: FluidBalanceData = {
  intake: {
    oral: 0,
    food: 0,
    iv: 0,
  },
  output: {
    urine: 0,
    stool: 0,
    insensible: 600, // Default stima perspiratio insensibilis
  },
};

const fluidForm = ref<FluidBalanceData>({ ...initialFluidForm });

const resetFluidForm = () => {
  fluidForm.value = { ...initialFluidForm };
};

// ============================================================
// SHARED OPTIONS
// ============================================================
const genderOptions = [
  { label: 'Maschio', value: 'male' },
  { label: 'Femmina', value: 'female' },
];

const raceOptions = [
  { label: 'Caucasica/Altra', value: 'other' },
  { label: 'Afroamericana', value: 'african' },
];

const formulaOptions = [
  { label: 'CKD-EPI (Raccomandata)', value: 'ckdepi' },
  { label: 'MDRD (4-variabili)', value: 'mdrd' },
];

const showComparison = ref(false);

// ============================================================
// COMPUTED - eGFR (TAB 1)
// ============================================================
const isFormValid = computed(() => {
  return (
    egfrForm.value.creatinine !== null &&
    egfrForm.value.creatinine > 0 &&
    egfrForm.value.age !== null &&
    egfrForm.value.age > 0 &&
    egfrForm.value.gender !== null
  );
});

const isEGFRFormValid = isFormValid;

// ============================================================
// COMPUTED - CREATININE CLEARANCE (TAB 2)
// ============================================================
const isCrClFormValid = computed(() => {
  return (
    crclForm.value.creatinine !== null &&
    crclForm.value.creatinine > 0 &&
    crclForm.value.age !== null &&
    crclForm.value.age > 0 &&
    crclForm.value.weight !== null &&
    crclForm.value.weight > 0 &&
    crclForm.value.gender !== null
  );
});

// ============================================================
// COMPUTED - FLUID BALANCE (TAB 3)
// ============================================================
const totalIntake = computed(() => {
  return fluidForm.value.intake.oral + fluidForm.value.intake.food + fluidForm.value.intake.iv;
});

const totalOutput = computed(() => {
  return (
    fluidForm.value.output.urine + fluidForm.value.output.stool + fluidForm.value.output.insensible
  );
});

const fluidBalance = computed(() => {
  return totalIntake.value - totalOutput.value;
});

// ============================================================
// FUNCTIONS - eGFR (TAB 1) - ESISTENTI
// ============================================================
const calculateGFR = () => {
  if (!isEGFRFormValid.value) return;

  let gfr = 0;

  if (egfrForm.value.formula === 'mdrd') {
    gfr = calculateMDRD();
  } else {
    gfr = calculateCKDEPI();
  }

  const stage = getCKDStage(gfr);
  egfrResult.value = {
    gfr,
    stage: stage.stage,
    description: stage.description,
    color: stage.color,
  };
};

// Calcolo MDRD
const calculateMDRD = (): number => {
  const { creatinine, age, gender, race } = formData.value;
  if (!creatinine || !age || !gender) return 0;

  let gfr = 175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203);

  // Correzione per sesso femminile
  if (gender === 'female') {
    gfr *= 0.742;
  }

  // Correzione per razza afroamericana
  if (race === 'african') {
    gfr *= 1.212;
  }

  return gfr;
};

// Calcolo CKD-EPI
const calculateCKDEPI = (): number => {
  const { creatinine, age, gender, race } = formData.value;
  if (!creatinine || !age || !gender) return 0;

  // Costanti CKD-EPI
  let kappa: number, alpha: number, genderFactor: number;

  if (gender === 'female') {
    kappa = 0.7;
    alpha = creatinine <= 0.7 ? -0.329 : -1.209;
    genderFactor = creatinine <= 0.7 ? 1.018 : 1.018;
  } else {
    kappa = 0.9;
    alpha = creatinine <= 0.9 ? -0.411 : -1.209;
    genderFactor = 1.0;
  }

  let gfr =
    141 *
    Math.pow(Math.min(creatinine / kappa, 1), alpha) *
    Math.pow(Math.max(creatinine / kappa, 1), -1.209) *
    Math.pow(0.993, age) *
    genderFactor;

  // Correzione per razza afroamericana
  if (race === 'african') {
    gfr *= 1.159;
  }

  return gfr;
};

// Classificazione stadi CKD
const getCKDStage = (gfr: number): { stage: string; description: string; color: string } => {
  if (gfr >= 90)
    return { stage: 'Stadio 1', description: 'Funzione renale normale', color: 'green' };
  if (gfr >= 60)
    return {
      stage: 'Stadio 2',
      description: 'Lieve riduzione funzione renale',
      color: 'light-green',
    };
  if (gfr >= 45)
    return {
      stage: 'Stadio 3a',
      description: 'Moderata riduzione funzione renale',
      color: 'orange',
    };
  if (gfr >= 30)
    return { stage: 'Stadio 3b', description: 'Moderata-severa riduzione', color: 'deep-orange' };
  if (gfr >= 15)
    return { stage: 'Stadio 4', description: 'Severa riduzione funzione renale', color: 'red' };
  return { stage: 'Stadio 5', description: 'Insufficienza renale terminale', color: 'purple' };
};

// Posizione indicatore nel grafico
const getGFRPosition = (): number => {
  const gfr = result.value.gfr;
  if (gfr <= 0) return 0;
  if (gfr >= 120) return 100;
  return (gfr / 120) * 100;
};

// Nome formula selezionata
const getFormulaName = (): string => {
  return formData.value.formula === 'mdrd' ? 'MDRD' : 'CKD-EPI';
};

// Note cliniche
const getClinicalNotes = (): string => {
  const gfr = result.value.gfr;
  const age = formData.value.age || 0;

  let notes = '';

  if (gfr >= 90) {
    notes = 'Funzione renale normale. Monitoraggio di routine se presenza di fattori di rischio.';
  } else if (gfr >= 60) {
    notes =
      'Lieve riduzione della funzione renale. Valutare presenza di danno renale e fattori di rischio.';
  } else if (gfr >= 45) {
    notes =
      'Moderata riduzione della funzione renale. Necessaria valutazione nefrologica e gestione complicanze.';
  } else if (gfr >= 30) {
    notes =
      'Moderata-severa riduzione. Prepararsi per terapia sostitutiva renale. Controllo complicanze CKD.';
  } else if (gfr >= 15) {
    notes = 'Severa riduzione della funzione renale. Preparazione urgente per dialisi o trapianto.';
  } else {
    notes =
      'Insufficienza renale terminale. Necessaria terapia sostitutiva renale immediata (dialisi/trapianto).';
  }

  if (age >= 65) {
    notes += ' Nota: negli anziani considerare il declino fisiologico della funzione renale.';
  }

  return notes;
};

// ============================================================
// FUNCTIONS - CREATININE CLEARANCE (TAB 2) - NUOVE
// ============================================================

const calculateCrCl = () => {
  if (!isCrClFormValid.value) return;

  const { creatinine, age, weight, gender } = crclForm.value;
  if (!creatinine || !age || !weight || !gender) return;

  // Formula Cockcroft-Gault
  // CrCl (mL/min) = [(140 - Age) × Weight (kg) × (0.85 if female)] / (72 × SCr mg/dL)
  let crcl = ((140 - age) * weight) / (72 * creatinine);

  // Correzione per sesso femminile
  if (gender === 'female') {
    crcl *= 0.85;
  }

  crclResult.value = {
    crcl,
  };
};

const getCrClColor = (crcl: number): string => {
  if (crcl >= 90) return 'green';
  if (crcl >= 60) return 'light-green';
  if (crcl >= 45) return 'orange';
  if (crcl >= 30) return 'deep-orange';
  if (crcl >= 15) return 'red';
  return 'purple';
};

const getCrClInterpretation = (crcl: number): string => {
  if (crcl >= 90) return 'Funzione Normale';
  if (crcl >= 60) return 'Lieve Riduzione';
  if (crcl >= 45) return 'Riduzione Moderata';
  if (crcl >= 30) return 'Riduzione Moderata-Severa';
  if (crcl >= 15) return 'Riduzione Severa';
  return 'Insufficienza Renale';
};

const getCrClClinicalNotes = (crcl: number): string => {
  if (crcl >= 90) {
    return 'Clearance normale. Dosaggio farmaci standard (verificare schede tecniche).';
  } else if (crcl >= 60) {
    return 'Lieve riduzione clearance. Alcuni farmaci richiedono aggiustamento (aminoglicosidi, vancomicina). Monitorare livelli terapeutici.';
  } else if (crcl >= 45) {
    return 'Riduzione moderata. Ridurre dose o prolungare intervalli per farmaci nefrotossici. Valutazione farmacologica necessaria.';
  } else if (crcl >= 30) {
    return 'Riduzione moderata-severa. Aggiustamento significativo dosaggi (50-75% dose standard). Evitare FANS e contrasti iodati.';
  } else if (crcl >= 15) {
    return 'Riduzione severa. Riduzione drastica dosaggi (25-50%). Molti farmaci controindicati. Consulenza nefrologica obbligatoria.';
  } else {
    return 'Insufficienza renale terminale. Dialisi-dipendente. Dosaggi basati su timing dialisi. Farmaci eliminati con dialisi richiedono dose supplementare post-trattamento.';
  }
};

// ============================================================
// FUNCTIONS - FLUID BALANCE (TAB 3) - NUOVE
// ============================================================

const calculateFluidBalance = () => {
  // Calcolo automatico con computed properties totalIntake, totalOutput, fluidBalance
  // Nessuna azione specifica necessaria, i computed si aggiornano automaticamente
};

const getFluidBalanceColor = (balance: number): string => {
  if (Math.abs(balance) <= 500) return 'green'; // Euvolemico
  if (balance > 500 && balance <= 1000) return 'light-blue'; // Lieve sovraccarico
  if (balance > 1000) return 'red'; // Sovraccarico significativo
  if (balance < -500 && balance >= -1000) return 'orange'; // Lieve deplezione
  return 'deep-orange'; // Deplezione significativa
};

const getFluidBalanceStatus = (balance: number): string => {
  if (Math.abs(balance) <= 500) return 'Euvolemico (Bilancio Neutro)';
  if (balance > 500 && balance <= 1000) return 'Lieve Sovraccarico Volemico';
  if (balance > 1000) return 'Sovraccarico Volemico Significativo';
  if (balance < -500 && balance >= -1000) return 'Lieve Deplezione Volemico-Idrica';
  return 'Deplezione Volemico-Idrica Significativa';
};

const getFluidBalanceClinicalNotes = (balance: number): string => {
  if (Math.abs(balance) <= 500) {
    return 'Bilancio idrico ottimale. Stato euvolemico mantenuto. Continuare monitoraggio giornaliero.';
  } else if (balance > 500 && balance <= 1000) {
    return 'Lieve bilancio positivo. Monitorare segni di sovraccarico (edema, dispnea). Considerare restrizione fluidi se CKD/scompenso.';
  } else if (balance > 1000) {
    return 'Sovraccarico volemico. RISCHIO EDEMA POLMONARE. Restrizione fluidi <1000 mL/die + diuretici (furosemide 40-80 mg IV). Peso giornaliero. Target perdita 0.5-1 kg/die.';
  } else if (balance < -500 && balance >= -1000) {
    return 'Lieve deplezione. Valutare cause (diuretici, febbre, vomito, diarrea). Reintegro fluidi orali/IV se persistente.';
  } else {
    return 'Deplezione significativa. RISCHIO AKI PRE-RENALE. Reintegro urgente fluidi IV (cristalloidi 500-1000 mL/h fino a euvolemia). Monitorare diuresi, pressione arteriosa, elettroliti.';
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

/* Scala GFR Visuale */
.gfr-scale {
  position: relative;
  width: 100%;
}

.gfr-bar {
  height: 20px;
  background: linear-gradient(
    to right,
    #9c27b0 0% 12.5%,
    /* Stadio 5 - Viola */ #f44336 12.5% 25%,
    /* Stadio 4 - Rosso */ #ff5722 25% 37.5%,
    /* Stadio 3b - Rosso scuro */ #ff9800 37.5% 50%,
    /* Stadio 3a - Arancione */ #8bc34a 50% 75%,
    /* Stadio 2 - Verde chiaro */ #4caf50 75% 100% /* Stadio 1 - Verde */
  );
  border-radius: 10px;
  position: relative;
}

.gfr-indicator {
  position: absolute;
  top: -5px;
  width: 4px;
  height: 30px;
  background-color: #333;
  border-radius: 2px;
  transform: translateX(-50%);
  transition: left 0.3s ease;
}

.gfr-indicator::before {
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
</style>
