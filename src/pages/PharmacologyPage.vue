<template>
  <q-page class="q-pa-md">
    <!-- Header con breadcrumb -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
        <q-breadcrumbs-el label="Pharmacology" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">💊 Clinical Pharmacology</h4>
      <p class="text-subtitle1 text-grey-7">
        Strumenti professionali per dosaggio, compatibilità, diluizione e velocità infusione farmaci
      </p>
    </div>

    <!-- Banner Informativo -->
    <q-banner class="bg-blue-1 q-mb-md" rounded>
      <template v-slot:avatar>
        <q-icon name="info" color="primary" />
      </template>
      <div class="text-body2">
        <strong>4 Calcolatori Farmacologici Integrati:</strong>
        <ul class="q-ma-sm q-pl-md">
          <li><strong>Dosage:</strong> Calcolo dosi per peso, età e funzione renale</li>
          <li><strong>Compatibility:</strong> Verifica compatibilità IV farmaci Y-site</li>
          <li><strong>Dilution:</strong> Calcolo diluizioni e concentrazioni finali</li>
          <li><strong>Infusion Rate:</strong> Conversioni mcg/kg/min ↔ mL/h per vasopressori</li>
        </ul>
      </div>
    </q-banner>

    <!-- Tab System -->
    <q-tabs
      v-model="activeTab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="dosage" icon="calculate" label="Dosage" />
      <q-tab name="compatibility" icon="science" label="Compatibility" />
      <q-tab name="dilution" icon="opacity" label="Dilution" />
      <q-tab name="infusion" icon="speed" label="Infusion Rate" />
    </q-tabs>

    <q-separator class="q-mb-md" />

    <q-tab-panels v-model="activeTab" animated>
      <!-- ===== TAB 1: DOSAGE CALCULATOR ===== -->
      <q-tab-panel name="dosage">
        <div class="text-h5 text-primary q-mb-md">💊 Dosage Calculator</div>
        <p class="text-body2 text-grey-7 q-mb-lg">
          Calcolo preciso delle dosi farmacologiche basato su peso, età e funzione renale
        </p>

        <div class="row q-gutter-lg">
          <!-- Pannello Input Dosage -->
          <div class="col-12 col-md-5">
            <q-card class="q-pa-md">
              <q-card-section>
                <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri Paziente</h6>

                <!-- Peso -->
                <q-input
                  v-model.number="dosageForm.weight"
                  type="number"
                  step="0.1"
                  label="Peso Corporeo"
                  suffix="kg"
                  outlined
                  class="q-mb-md"
                  :rules="[(val) => (val > 0 && val <= 500) || 'Peso tra 1-500 kg']"
                >
                  <template v-slot:prepend>
                    <q-icon name="fitness_center" color="blue" />
                  </template>
                </q-input>

                <!-- Età -->
                <q-input
                  v-model.number="dosageForm.age"
                  type="number"
                  label="Età"
                  suffix="anni"
                  outlined
                  class="q-mb-md"
                  :rules="[(val) => (val >= 0 && val <= 120) || 'Età tra 0-120 anni']"
                >
                  <template v-slot:prepend>
                    <q-icon name="cake" color="orange" />
                  </template>
                </q-input>

                <!-- Creatinina (per aggiustamento renale) -->
                <q-input
                  v-model.number="dosageForm.creatinine"
                  type="number"
                  step="0.01"
                  label="Creatinina Sierica (opzionale)"
                  suffix="mg/dL"
                  outlined
                  class="q-mb-md"
                  hint="Per aggiustamento in insufficienza renale"
                >
                  <template v-slot:prepend>
                    <q-icon name="science" color="purple" />
                  </template>
                </q-input>

                <q-separator class="q-mb-md" />

                <!-- Selezione Farmaco -->
                <q-select
                  v-model="dosageForm.drug"
                  :options="drugOptions"
                  label="Seleziona Farmaco"
                  outlined
                  class="q-mb-md"
                  emit-value
                  map-options
                  :rules="[(val) => val !== null || 'Selezionare un farmaco']"
                  @update:model-value="onDrugChange"
                >
                  <template v-slot:prepend>
                    <q-icon name="medication" color="red" />
                  </template>
                </q-select>

                <!-- Dose per kg (se applicabile) -->
                <q-input
                  v-model.number="dosageForm.dosePerKg"
                  type="number"
                  step="0.01"
                  :label="selectedDrug?.doseLabel || 'Dose per kg'"
                  :suffix="selectedDrug?.doseUnit || 'mg/kg'"
                  outlined
                  class="q-mb-md"
                  v-if="selectedDrug?.type === 'weight-based'"
                  :rules="[(val) => val > 0 || 'Inserire dose positiva']"
                >
                  <template v-slot:prepend>
                    <q-icon name="straighten" color="green" />
                  </template>
                </q-input>

                <!-- Dose fissa (se applicabile) -->
                <q-input
                  v-model.number="dosageForm.fixedDose"
                  type="number"
                  step="0.01"
                  :label="selectedDrug?.doseLabel || 'Dose'"
                  :suffix="selectedDrug?.doseUnit || 'mg'"
                  outlined
                  class="q-mb-md"
                  v-if="selectedDrug?.type === 'fixed'"
                  :rules="[(val) => val > 0 || 'Inserire dose positiva']"
                >
                  <template v-slot:prepend>
                    <q-icon name="straighten" color="green" />
                  </template>
                </q-input>

                <!-- Frequenza -->
                <q-select
                  v-model="dosageForm.frequency"
                  :options="frequencyOptions"
                  label="Frequenza Somministrazione"
                  outlined
                  class="q-mb-md"
                  emit-value
                  map-options
                >
                  <template v-slot:prepend>
                    <q-icon name="schedule" color="cyan" />
                  </template>
                </q-select>

                <!-- Bottone Calcola -->
                <q-btn
                  @click="calculateDosage"
                  color="primary"
                  size="lg"
                  class="full-width q-mb-sm"
                  icon="calculate"
                  :disable="!isDosageFormValid"
                >
                  Calcola Dosaggio
                </q-btn>

                <!-- Bottone Reset -->
                <q-btn
                  @click="resetDosageForm"
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

          <!-- Pannello Risultati Dosage -->
          <div class="col-12 col-md-6">
            <q-card class="q-pa-md">
              <q-card-section>
                <h6 class="text-h6 q-ma-none q-mb-md">📈 Risultati Dosaggio</h6>

                <!-- Dose Calcolata -->
                <div class="text-center q-mb-lg" v-if="dosageResult.totalDose > 0">
                  <div class="text-h3 text-primary q-mb-sm">
                    {{ dosageResult.totalDose.toFixed(selectedDrug?.precision || 1) }}
                  </div>
                  <div class="text-subtitle1 text-grey-7">
                    <strong>{{ selectedDrug?.doseUnit || 'mg' }}</strong> per dose
                  </div>
                  <div
                    class="text-caption text-grey-6"
                    v-if="selectedDrug?.type === 'weight-based'"
                  >
                    {{ dosageForm.dosePerKg }}{{ selectedDrug?.doseUnit || 'mg' }}/kg ×
                    {{ dosageForm.weight }}kg
                  </div>
                </div>

                <!-- Frequenza e Dose Giornaliera -->
                <div class="row q-gutter-md q-mb-lg" v-if="dosageResult.totalDose > 0">
                  <div class="col">
                    <q-card flat bordered class="text-center q-pa-sm">
                      <div class="text-h6 text-primary">{{ getFrequencyText() }}</div>
                      <div class="text-caption">Frequenza</div>
                    </q-card>
                  </div>
                  <div class="col">
                    <q-card flat bordered class="text-center q-pa-sm">
                      <div class="text-h6 text-primary">
                        {{ dosageResult.dailyDose.toFixed(1) }} {{ selectedDrug?.doseUnit || 'mg' }}
                      </div>
                      <div class="text-caption">Dose Giornaliera</div>
                    </q-card>
                  </div>
                </div>

                <!-- Aggiustamenti -->
                <q-separator class="q-mb-md" v-if="dosageResult.totalDose > 0" />

                <!-- Aggiustamento Età -->
                <div class="q-mb-md" v-if="dosageResult.totalDose > 0 && getAgeAdjustment() !== 1">
                  <div class="text-subtitle2">👶 Aggiustamento per Età:</div>
                  <q-chip color="orange" text-color="white" class="text-weight-bold">
                    Riduzione del {{ ((1 - getAgeAdjustment()) * 100).toFixed(0) }}%
                  </q-chip>
                  <div class="text-caption q-mt-sm">
                    {{ getAgeNote() }}
                  </div>
                </div>

                <!-- Aggiustamento Renale -->
                <div
                  class="q-mb-md"
                  v-if="dosageResult.totalDose > 0 && dosageResult.renalAdjustment !== 1"
                >
                  <div class="text-subtitle2">🫘 Aggiustamento Funzione Renale:</div>
                  <q-chip color="red" text-color="white" class="text-weight-bold">
                    Riduzione del {{ ((1 - dosageResult.renalAdjustment) * 100).toFixed(0) }}%
                  </q-chip>
                  <div class="text-caption q-mt-sm">
                    eGFR stimato: {{ dosageResult.estimatedGFR.toFixed(1) }} mL/min/1.73m²
                  </div>
                </div>

                <!-- Informazioni Farmaco -->
                <q-expansion-item
                  icon="info"
                  label="📋 Informazioni Farmaco"
                  class="text-primary"
                  v-if="selectedDrug"
                >
                  <div class="q-pa-md bg-grey-1">
                    <div class="q-mb-sm"><strong>Classe:</strong> {{ selectedDrug.class }}</div>
                    <div class="q-mb-sm">
                      <strong>Indicazioni:</strong> {{ selectedDrug.indications }}
                    </div>
                    <div class="q-mb-sm">
                      <strong>Range terapeutico:</strong> {{ selectedDrug.therapeuticRange }}
                    </div>
                    <div><strong>Note:</strong> {{ selectedDrug.notes }}</div>
                  </div>
                </q-expansion-item>

                <!-- Avvertenze -->
                <q-expansion-item
                  icon="warning"
                  label="⚠️ Avvertenze Importanti"
                  class="text-orange q-mt-sm"
                  v-if="dosageResult.totalDose > 0"
                >
                  <div class="q-pa-md bg-orange-1">
                    <ul class="q-ma-none">
                      <li>Questo è solo un calcolo orientativo</li>
                      <li>Consultare sempre le linee guida cliniche</li>
                      <li>Considerare controindicazioni e interazioni</li>
                      <li>Monitorare risposta clinica e effetti collaterali</li>
                      <li>Aggiustare dose in base alla risposta del paziente</li>
                    </ul>
                  </div>
                </q-expansion-item>

                <!-- Formule -->
                <q-expansion-item
                  icon="functions"
                  label="🧮 Formule Utilizzate"
                  class="text-primary q-mt-sm"
                  v-if="dosageResult.totalDose > 0"
                >
                  <div class="q-pa-md bg-grey-1">
                    <div class="q-mb-md" v-if="selectedDrug?.type === 'weight-based'">
                      <strong>Dose Totale:</strong><br />
                      <small>Dose per kg × Peso corporeo × Aggiustamenti</small>
                    </div>
                    <div class="q-mb-md" v-if="dosageForm.creatinine">
                      <strong>eGFR (Cockcroft-Gault):</strong><br />
                      <small>((140 - età) × peso) / (72 × creatinina)</small>
                    </div>
                  </div>
                </q-expansion-item>

                <!-- Documentazione Scientifica Farmacologia (from DosageCalculatorPage) -->
                <q-expansion-item
                  icon="book"
                  label="📚 Documentazione Scientifica - Farmacologia Clinica"
                  class="text-primary q-mt-md"
                >
                  <div class="q-pa-md bg-blue-1">
                    <!-- Sezione 1: Farmacocinetica Fondamenti -->
                    <div class="q-mb-lg">
                      <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                        💊 Principi Farmacocinetica (PK/PD)
                      </h6>
                      <p class="text-body2 q-mb-sm">
                        <strong>Farmacocinetica (PK):</strong> Studio di come l'organismo processa
                        il farmaco attraverso 4 fasi - <strong>ADME</strong>: Assorbimento
                        (Absorption), Distribuzione (Distribution), Metabolismo (Metabolism),
                        Eliminazione (Excretion). Determina concentrazioni plasmatiche nel tempo.
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Farmacodinamica (PD):</strong> Studio degli effetti del farmaco
                        sull'organismo. Relazione dose-risposta, recettori, meccanismi d'azione,
                        effetti terapeutici e tossici.
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Volume di Distribuzione (Vd):</strong> Volume teorico in cui il
                        farmaco si distribuisce per ottenere la concentrazione plasmatica osservata.
                        Farmaci lipofili (↑Vd) si distribuiscono nei tessuti, idrofili (↓Vd)
                        rimangono nel compartimento vascolare. Formula: Vd = Dose / Concentrazione
                        plasmatica.
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Clearance (CL):</strong> Volume di plasma depurato dal farmaco per
                        unità di tempo (mL/min). Clearance totale = CL renale + CL epatica + CL
                        altre vie. Determina dose di mantenimento: Dose maint = CL × C<sub>ss</sub>
                        (steady state).
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Emivita (t½):</strong> Tempo necessario affinché la concentrazione
                        plasmatica si riduca del 50%. t½ = 0.693 × Vd / CL. Steady state raggiunto
                        dopo 4-5 emivite. Determina intervallo tra dosi.
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Steady State (C<sub>ss</sub>):</strong> Equilibrio dinamico tra
                        velocità di somministrazione e velocità di eliminazione. Concentrazione
                        terapeutica stabile raggiunta dopo 4-5 emivite. Essenziale per efficacia e
                        sicurezza terapeutica.
                      </p>
                    </div>

                    <!-- Sezione 2: Dosaggi Pediatrici -->
                    <div class="q-mb-lg">
                      <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                        👶 Dosaggi Pediatrici e Neonatali
                      </h6>
                      <p class="text-body2 q-mb-sm">
                        <strong>Dosaggio Weight-Based (mg/kg):</strong> Metodo più comune in
                        pediatria. Considera che neonati e lattanti hanno ↑Vd/kg (maggior acqua
                        corporea totale 70-80% vs 60% adulto), ↓legame proteine plasmatiche
                        (ipoalbuminemia fisiologica), immaturità enzimatica epatica (↓metabolismo) e
                        renale (↓GFR: 20-40 mL/min/1.73m² vs 90-120 adulto).
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Dosaggio BSA-Based (mg/m²):</strong> Utilizzato per chemioterapici e
                        farmaci con finestra terapeutica stretta. BSA correla meglio con GFR,
                        cardiac output e clearance metabolica rispetto al peso. Formula Mosteller:
                        BSA (m²) = √[(altezza cm × peso kg)/3600].
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Età-Specific Dosing:</strong> Neonati (0-28 giorni): riduzione
                        50-75%, immaturità organi. Lattanti (1-12 mesi): riduzione 25-50%, clearance
                        in sviluppo. Bambini (1-12 anni): spesso dose/kg > adulti per ↑metabolismo.
                        Adolescenti (>12 anni): dose adulto se peso >50 kg.
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Farmaci Critici Pediatrici:</strong> Aminoglicosidi (gentamicina
                        5-7.5 mg/kg/die neonati, TDM obbligatorio), Vancomicina (15 mg/kg ogni 6h,
                        target trough 10-20 μg/mL), Paracetamolo (15 mg/kg ogni 6h, max 60
                        mg/kg/die), Antiepilettici (fenobarbital loading 20 mg/kg IV).
                      </p>
                    </div>

                    <!-- Sezione 3: Aggiustamento Renale CKD -->
                    <div class="q-mb-lg">
                      <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                        🫘 Aggiustamento Dosaggio in Insufficienza Renale (CKD)
                      </h6>
                      <p class="text-body2 q-mb-sm">
                        <strong>Principi Generali:</strong> Farmaci renalmente escreti (>50%
                        eliminazione renale) richiedono aggiustamento dose quando CrCl &lt;60
                        mL/min. Utilizzare Cockcroft-Gault (non eGFR CKD-EPI) per dosaggio farmaci.
                        Considerare Active Body Weight (ABW) in obesità.
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Strategie Aggiustamento:</strong><br />
                        • <strong>Riduzione Dose:</strong> Mantenere intervallo, ridurre dose
                        singola (preferibile per farmaci tempo-dipendenti: β-lattamici,
                        vancomicina).<br />
                        • <strong>Prolungamento Intervallo:</strong> Mantenere dose, aumentare
                        intervallo (preferibile per farmaci concentrazione-dipendenti:
                        aminoglicosidi, fluorochinoloni).<br />
                        • <strong>Approccio Combinato:</strong> Ridurre dose E prolungare intervallo
                        (digossina, LMWH).
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>CKD Staging-Based Dose Reduction:</strong><br />
                        • <strong>CrCl 50-80 mL/min (CKD 2):</strong> 75-100% dose standard<br />
                        • <strong>CrCl 30-50 mL/min (CKD 3a-3b):</strong> 50-75% dose<br />
                        • <strong>CrCl 10-30 mL/min (CKD 4):</strong> 25-50% dose<br />
                        • <strong>CrCl &lt;10 mL/min (CKD 5):</strong> 10-25% dose, evitare
                        nefrotossici
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Farmaci Nefrotossici da Evitare/Ridurre:</strong> FANS (↓GFR,
                        nefrite interstiziale), Aminoglicosidi (necrosi tubulare), Contrasti iodati
                        (CIN: Contrast-Induced Nephropathy), Vancomicina (TDM obbligatorio, target
                        trough 15-20 μg/mL), ACE-I/ARB (↓GFR funzionale, monitorare creatinina),
                        Metformina (controindicato CrCl &lt;30, rischio acidosi lattica).
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Dialisi e Dosaggio Farmaci:</strong> Emodialisi (HD) rimuove farmaci
                        piccoli (&lt;500 Da), idrofili, basso Vd, basso legame proteine. Dose
                        supplementare post-HD per: Aminoglicosidi, Vancomicina, β-lattamici,
                        Gabapentin. Dialisi peritoneale (PD) ha minor clearance farmaci vs HD. CRRT
                        (Continuous Renal Replacement Therapy) in ICU richiede dosaggio intermedio
                        HD-funzione normale.
                      </p>
                    </div>

                    <!-- Sezione 4: Loading vs Maintenance Dose -->
                    <div class="q-mb-lg">
                      <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                        ⚡ Loading Dose vs Maintenance Dose
                      </h6>
                      <p class="text-body2 q-mb-sm">
                        <strong>Loading Dose (Dose di Carico):</strong> Dose iniziale elevata per
                        raggiungere rapidamente concentrazioni terapeutiche senza attendere steady
                        state (4-5 emivite). Formula: LD = Vd × C<sub>target</sub>. Indicata per
                        farmaci con lunga emivita (digossina, amiodarone) o emergenze (fenobarbitale
                        nello stato epilettico, antibiotici nelle sepsi gravi).
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Maintenance Dose (Dose di Mantenimento):</strong> Dose ripetuta per
                        mantenere C<sub>ss</sub> nel range terapeutico. Formula: MD = CL × C<sub
                          >target</sub
                        >
                        × τ (intervallo dosaggio). Aggiustare in base a TDM (Therapeutic Drug
                        Monitoring), risposta clinica, funzione renale/epatica.
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Esempi Clinici:</strong><br />
                        • <strong>Digossina:</strong> LD 0.5-1 mg IV → MD 0.125-0.25 mg/die (↓50% se
                        CrCl &lt;50)<br />
                        • <strong>Fenobarbitale (stato epilettico):</strong> LD 20 mg/kg IV lenta
                        (max 60 mg/min) → MD 1-3 mg/kg/die<br />
                        • <strong>Vancomicina:</strong> LD 25-30 mg/kg × 1 → MD 15-20 mg/kg ogni
                        8-12h (TDM-guided)<br />
                        • <strong>Amiodarone:</strong> LD 150 mg IV in 10 min → infusione 1 mg/min
                        6h → 0.5 mg/min 18h
                      </p>
                    </div>

                    <!-- Sezione 5: Riferimenti Scientifici -->
                    <div class="q-mb-md">
                      <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                        📖 Riferimenti Scientifici ScienceDirect
                      </h6>
                      <ul class="text-caption">
                        <li>
                          <strong>Holford NHG (2013).</strong> "Pharmacokinetics & Pharmacodynamics:
                          Rational Dosing & the Time Course of Drug Action" in Basic & Clinical
                          Pharmacology (13th Edition). ScienceDirect. PK/PD principles, Vd,
                          clearance, half-life, steady state, loading vs maintenance dose
                          calculations.
                        </li>
                        <li>
                          <strong>Kearns GL et al. (2003).</strong> "Developmental Pharmacology—Drug
                          Disposition, Action, and Therapy in Infants and Children" in New England
                          Journal of Medicine. ScienceDirect. Pediatric dosing principles, ontogeny
                          of drug metabolism, age-specific pharmacokinetics, BSA vs weight-based
                          dosing.
                        </li>
                        <li>
                          <strong>Matzke GR, Aronoff GR (2016).</strong> "Drug Dosing in Renal
                          Failure" in Brenner & Rector's The Kidney (10th Edition). ScienceDirect.
                          CKD staging-based dose adjustments, dialysis dosing, nephrotoxicity
                          prevention, Cockcroft-Gault use for drug dosing.
                        </li>
                        <li>
                          <strong>Rybak MJ et al. (2020).</strong> "Therapeutic Monitoring of
                          Vancomycin for Serious Methicillin-Resistant Staphylococcus aureus
                          Infections" in American Journal of Health-System Pharmacy. ScienceDirect.
                          TDM strategies, AUC-guided dosing, renal adjustment, loading dose
                          protocols.
                        </li>
                        <li>
                          <strong>Mouton JW et al. (2011).</strong> "Pharmacokinetic/Pharmacodynamic
                          Considerations in the Treatment of Hospitalized Patients with Respiratory
                          Tract Infections" in Clinical Microbiology and Infection. ScienceDirect.
                          Time-dependent vs concentration-dependent killing, PK/PD indices (AUC/MIC,
                          Cmax/MIC, T>MIC), dosing optimization in critically ill patients.
                        </li>
                      </ul>
                    </div>
                  </div>
                </q-expansion-item>

                <div v-if="!dosageResult.totalDose" class="text-center text-grey-6 q-pa-xl">
                  <q-icon name="info" size="lg" class="q-mb-md" />
                  <p class="text-body2">
                    Inserisci parametri paziente e farmaco per calcolare il dosaggio
                  </p>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- ===== TAB 2: DRUG COMPATIBILITY ===== -->
      <q-tab-panel name="compatibility">
        <div class="text-h5 text-primary q-mb-md">🧪 Drug Compatibility</div>
        <p class="text-body2 text-grey-7 q-mb-lg">
          Verifica compatibilità IV tra farmaci per somministrazione Y-site
        </p>

        <div class="row q-gutter-lg">
          <!-- Pannello Selezione Farmaci -->
          <div class="col-12 col-md-5">
            <q-card class="q-pa-md">
              <q-card-section>
                <h6 class="text-h6 q-ma-none q-mb-md">🔍 Seleziona Farmaci</h6>

                <!-- Barra di ricerca -->
                <q-input
                  v-model="compatSearchQuery"
                  placeholder="Cerca farmaco..."
                  outlined
                  dense
                  clearable
                  class="q-mb-md"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" color="primary" />
                  </template>
                </q-input>

                <!-- Lista farmaci disponibili -->
                <div class="drugs-list q-mb-md" style="max-height: 400px; overflow-y: auto">
                  <q-list bordered separator>
                    <q-item
                      v-for="drug in compatFilteredDrugs"
                      :key="drug.id"
                      clickable
                      @click="compatAddDrug(drug.name)"
                      :disable="compatSelectedDrugs.includes(drug.name)"
                      class="drug-item"
                    >
                      <q-item-section avatar>
                        <q-icon :name="compatGetCategoryIcon(drug.category)" size="md" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ drug.name }}</q-item-label>
                        <q-item-label caption>{{ drug.activeIngredient }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-chip
                          size="sm"
                          :color="compatSelectedDrugs.includes(drug.name) ? 'positive' : 'grey-3'"
                          :text-color="
                            compatSelectedDrugs.includes(drug.name) ? 'white' : 'grey-7'
                          "
                        >
                          {{ compatSelectedDrugs.includes(drug.name) ? 'Selezionato' : 'Aggiungi' }}
                        </q-chip>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>

                <!-- Farmaci selezionati -->
                <div v-if="compatSelectedDrugs.length > 0" class="selected-drugs q-mb-md">
                  <div class="text-subtitle2 text-primary q-mb-sm">
                    📋 Farmaci selezionati ({{ compatSelectedDrugs.length }}):
                  </div>
                  <div class="row q-gutter-sm">
                    <q-chip
                      v-for="drug in compatSelectedDrugs"
                      :key="drug"
                      removable
                      @remove="compatRemoveDrug(drug)"
                      color="primary"
                      text-color="white"
                      icon="medication"
                    >
                      {{ drug }}
                    </q-chip>
                  </div>
                </div>

                <!-- Bottoni azione -->
                <div class="row q-gutter-sm">
                  <q-btn
                    @click="compatAnalyzeCompatibility"
                    color="primary"
                    size="lg"
                    class="col"
                    icon="analytics"
                    :disable="compatSelectedDrugs.length < 2"
                    :loading="compatIsLoading"
                  >
                    Analizza Compatibilità
                  </q-btn>
                  <q-btn
                    @click="compatClearSelection"
                    color="negative"
                    outline
                    size="lg"
                    icon="clear"
                    :disable="compatSelectedDrugs.length === 0"
                  >
                    Pulisci
                  </q-btn>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Pannello Risultati -->
          <div class="col-12 col-md-6">
            <q-card class="q-pa-md">
              <q-card-section>
                <h6 class="text-h6 q-ma-none q-mb-md">📊 Risultati Analisi</h6>

                <!-- Placeholder quando nessuna analisi -->
                <div v-if="!compatAnalysisResults" class="text-center q-pa-xl">
                  <q-icon name="science" size="5rem" color="grey-4" class="q-mb-md" />
                  <p class="text-h6 text-grey-6">Seleziona almeno 2 farmaci</p>
                  <p class="text-body2 text-grey-5">
                    L'analisi mostrerà le compatibilità e incompatibilità tra i farmaci selezionati
                  </p>
                </div>

                <!-- Risultati analisi -->
                <div v-else>
                  <!-- Warnings Critici -->
                  <template v-if="compatCriticalWarnings.length > 0">
                    <div
                      v-for="warning in compatCriticalWarnings"
                      :key="warning.message"
                      class="q-mb-md"
                    >
                      <q-banner class="bg-negative text-white" rounded>
                        <template v-slot:avatar>
                          <q-icon name="warning" size="md" />
                        </template>
                        <div class="text-weight-bold">INCOMPATIBILITÀ CRITICA</div>
                        <div class="text-body2">
                          {{ warning.drugs[0] }} ⚠️ {{ warning.drugs[1] }}
                        </div>
                        <div class="text-caption q-mt-sm">{{ warning.message }}</div>
                        <div class="text-caption q-mt-xs">
                          <strong>Azione:</strong> {{ warning.action }}
                        </div>
                      </q-banner>
                    </div>
                  </template>

                  <!-- Warnings -->
                  <template v-if="compatNormalWarnings.length > 0">
                    <div
                      v-for="warning in compatNormalWarnings"
                      :key="warning.message"
                      class="q-mb-md"
                    >
                      <q-banner class="bg-warning text-white" rounded>
                        <template v-slot:avatar>
                          <q-icon name="info" size="md" />
                        </template>
                        <div class="text-weight-bold">ATTENZIONE</div>
                        <div class="text-body2">
                          {{ warning.drugs[0] }} ⚠️ {{ warning.drugs[1] }}
                        </div>
                        <div class="text-caption q-mt-sm">{{ warning.message }}</div>
                        <div class="text-caption q-mt-xs" v-if="warning.action">
                          <strong>Azione:</strong> {{ warning.action }}
                        </div>
                      </q-banner>
                    </div>
                  </template>

                  <!-- Info -->
                  <template v-if="compatInfoWarnings.length > 0">
                    <div v-for="warning in compatInfoWarnings" :key="warning.message" class="q-mb-md">
                      <q-banner class="bg-info text-white" rounded>
                        <template v-slot:avatar>
                          <q-icon name="check_circle" size="md" />
                        </template>
                        <div class="text-body2">{{ warning.message }}</div>
                        <div class="text-caption q-mt-xs" v-if="warning.action">
                          {{ warning.action }}
                        </div>
                      </q-banner>
                    </div>
                  </template>

                  <!-- Raccomandazioni -->
                  <div class="q-mt-lg">
                    <div class="text-subtitle2 text-primary q-mb-sm">💡 Raccomandazioni:</div>
                    <q-list bordered separator>
                      <q-item
                        v-for="(recommendation, index) in compatAnalysisResults.recommendations"
                        :key="index"
                      >
                        <q-item-section>
                          <q-item-label>{{ recommendation }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <!-- Dettagli per farmaco -->
                  <div class="q-mt-lg">
                    <q-expansion-item
                      v-for="result in compatAnalysisResults.results"
                      :key="result.drug"
                      :label="`Dettagli ${result.drug}`"
                      icon="medication"
                      header-class="bg-grey-2"
                    >
                      <q-card>
                        <q-card-section>
                          <div class="text-body2">
                            <div v-if="result.compatible.length > 0" class="q-mb-sm">
                              <strong class="text-positive">✅ Compatibile con:</strong>
                              {{ compatFormatDrugList(result.compatible) }}
                            </div>
                            <div v-if="result.compatibleOnTap.length > 0" class="q-mb-sm">
                              <strong class="text-info">🔀 Compatibile via Y-site con:</strong>
                              {{ compatFormatDrugList(result.compatibleOnTap) }}
                            </div>
                            <div v-if="result.incompatible.length > 0" class="q-mb-sm">
                              <strong class="text-negative">❌ Incompatibile con:</strong>
                              {{ compatFormatDrugList(result.incompatible) }}
                            </div>
                            <div v-if="result.conflictingData.length > 0" class="q-mb-sm">
                              <strong class="text-warning">⚠️ Dati contrastanti con:</strong>
                              {{ compatFormatDrugList(result.conflictingData) }}
                            </div>
                            <div v-if="result.noDataAvailable.length > 0">
                              <strong class="text-grey-7">❓ Nessun dato per:</strong>
                              {{ compatFormatDrugList(result.noDataAvailable) }}
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                </div>

                <!-- Documentazione Scientifica Drug Compatibility (from DrugCompatibilityPage) -->
                <div class="q-mt-lg">
                  <q-expansion-item
                    icon="book"
                    label="📚 Documentazione Scientifica - Compatibilità IV Farmaci"
                    header-class="bg-blue-2 text-primary"
                  >
                    <q-card>
                      <q-card-section class="bg-blue-1">
                        <!-- Sezione 1: Principi Compatibilità IV -->
                        <div class="q-mb-lg">
                          <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                            🧪 Principi Fisico-Chimici Compatibilità IV
                          </h6>
                          <p class="text-body2 q-mb-sm">
                            <strong>Incompatibilità Fisica:</strong> Alterazioni visibili
                            (precipitazione, cambio colore, torbidità, formazione gas) dovute a
                            interazioni fisiche tra farmaci o con solventi/contenitori. Causa: pH
                            incompatibile, forza ionica elevata, insolubilità in mezzo acquoso.
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>Incompatibilità Chimica:</strong> Degradazione molecolare
                            (ossidazione, idrolisi, decomposizione) non sempre visibile ma che riduce
                            potenza terapeutica o genera metaboliti tossici. Esempio: β-lattamici con
                            aminoglicosidi (inattivazione covalente reciproca).
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>pH e Precipitazione:</strong> pH soluzione IV critico per
                            stabilità. Farmaci acidi (pH 3-5: Fenitoina, Vancomicina) incompatibili
                            con basici (pH 8-10: Tiopentale, Fenitoina sodica). Variazioni pH ±2 unità
                            possono causare precipitazione immediata. Esempio: Fenitoina (pH 12) +
                            Destrosio 5% (pH 4.5) → precipitazione cristalli.
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>Fotosensibilità:</strong> Farmaci fotolabili (Nitroprusside,
                            Amfotericina B, Furosemide) richiedono protezione da luce (sacche
                            alluminio, tubicini opachi). Degradazione foto-ossidativa genera composti
                            inattivi/tossici.
                          </p>
                        </div>

                        <!-- Sezione 2: Y-Site Administration -->
                        <div class="q-mb-lg">
                          <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                            💉 Y-Site Administration e Best Practices
                          </h6>
                          <p class="text-body2 q-mb-sm">
                            <strong>Y-Site Compatibility:</strong> Compatibilità farmaci miscelati
                            brevemente nel sito Y del set infusionale prima di entrare nel paziente.
                            Tempo contatto breve (&lt;10 min) permette combinazioni altrimenti
                            incompatibili in miscelazione diretta prolungata (&gt;24h).
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>Regole Y-Site:</strong><br />
                            • <strong>Linee multiple:</strong> Preferibile per farmaci critici
                            incompatibili (vasopressori, inotropi, sedativi)<br />
                            • <strong>Lumen dedicati CVC:</strong> Triplo/Quadruplo lume per
                            separazione fisica<br />
                            • <strong>Flush policies:</strong> 10-20 mL NS/D5W tra farmaci
                            incompatibili stesso lumen<br />
                            • <strong>Sequenza amministrazione:</strong> pH-neutri prima,
                            acidi/basici con flush intermedio
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>Flush Protocols:</strong> Normal Saline (NS 0.9%) preferibile per
                            la maggioranza farmaci. Destrosio 5% (D5W) per farmaci incompatibili con
                            cloruro (Anfotericina B liposomiale). Heparin lock 10-100 U/mL per CVC
                            non-utilizzati (controverso, trend verso NS only). Volume flush: 2× volume
                            dead space lumen (tipicamente 10-20 mL).
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>Casi Speciali ICU:</strong> Vasopressori (Noradrenalina,
                            Adrenalina, Vasopressina) - lumen dedicato, NO miscelazione. Propofol -
                            emulsione lipidica, incompatibile con la maggior parte farmaci, lumen
                            esclusivo. Nutrizione Parenterale (TPN) - lumen dedicato, NO Y-site, alto
                            rischio precipitazione calcio-fosfato.
                          </p>
                        </div>

                        <!-- Sezione 3: Stabilità e Shelf-Life -->
                        <div class="q-mb-lg">
                          <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                            ⏱️ Stabilità Farmaci Ricostituiti e Diluiti
                          </h6>
                          <p class="text-body2 q-mb-sm">
                            <strong>Shelf-Life dopo Ricostituzione:</strong> Tempo in cui il farmaco
                            mantiene ≥90% potenza originale. Variabile per ogni farmaco e condizione
                            storage (temperatura, luce, contenitore).
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>Esempi Stabilità:</strong><br />
                            • <strong>Vancomicina:</strong> 14 giorni refrigerato (2-8°C), 96h room
                            temperature<br />
                            • <strong>Ceftriaxone:</strong> 24h room temp, 3 giorni refrigerato<br />
                            • <strong>Piperacillina/Tazobactam:</strong> 24h room temp, 7 giorni
                            refrigerato<br />
                            • <strong>Meropenem:</strong> 4h room temp (altamente instabile!), 24h
                            refrigerato<br />
                            • <strong>Amfotericina B liposomiale:</strong> 24h dopo ricostituzione
                            (protected from light)
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>Temperatura Storage:</strong> Room temperature (20-25°C) per
                            infusioni immediate (&lt;24h). Refrigerazione (2-8°C) per prolungare
                            stabilità antibiotici β-lattamici, glicopeptidi. Congelamento (-20°C) per
                            stock preparazioni batch (alcuni farmaci solo, verificare datasheet).
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>Contenitori e Adsorbimento:</strong> PVC bags adsorb farmaci
                            lipofili (Insulina, Nitroglicerina, Amiodarone) - perdita dose fino 50%.
                            Preferire sacche poliolefine/polipropilene non-PVC, vetro. Tubicini
                            PVC-free per Insulina infusione continua (adsorb 20-80% in PVC standard).
                          </p>
                        </div>

                        <!-- Sezione 4: Database e Risorse -->
                        <div class="q-mb-lg">
                          <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                            📊 Database Compatibilità Farmaci
                          </h6>
                          <p class="text-body2 q-mb-sm">
                            <strong>Micromedex IV Compatibility:</strong> Gold standard database,
                            aggiornamenti continui, peer-reviewed. Oltre 6000 farmaci, 200,000
                            interazioni. Include Y-site data, stabilità, pH solutions.
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>Trissel's Handbook on Injectable Drugs:</strong> Riferimento
                            cartaceo/digitale completo, 18th edition. Monografie dettagliate ogni
                            farmaco: pH, osmolarità, compatibilità diretta, Y-site, shelf-life,
                            filtrazione.
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>King Guide to Parenteral Admixtures:</strong> Quick reference
                            tables, color-coded compatibility charts. Focus pratico per farmacisti
                            ospedalieri e ICU nursing.
                          </p>
                          <p class="text-body2 q-mb-sm">
                            <strong>Stability.io / GlobalRPh:</strong> Risorse online free per
                            compatibilità base e calcoli diluizione. Non sostituti database
                            professionali per decisioni critiche.
                          </p>
                        </div>

                        <!-- Sezione 5: Riferimenti Scientifici -->
                        <div class="q-mb-md">
                          <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                            📖 Riferimenti Scientifici ScienceDirect
                          </h6>
                          <ul class="text-caption">
                            <li>
                              <strong>Newton DW (2009).</strong> "Drug Incompatibility Chemistry" in
                              American Journal of Health-System Pharmacy. ScienceDirect.
                              Physico-chemical mechanisms of drug incompatibility, pH-precipitation
                              relationships, oxidation-reduction reactions, complex formation.
                            </li>
                            <li>
                              <strong>Kanji S et al. (2010).</strong> "Systematic Review of Physical
                              and Chemical Compatibility of Commonly Used Medications Administered by
                              Continuous Infusion in Intensive Care Units" in Critical Care Medicine.
                              ScienceDirect. ICU drug Y-site compatibility, vasopressor/inotrope
                              stability, sedation combinations, multi-lumen CVC management.
                            </li>
                            <li>
                              <strong>Trissel LA (2013).</strong> "Avoiding Common Flaws in Stability
                              and Compatibility Studies of Injectable Drugs" in American Journal of
                              Health-System Pharmacy. ScienceDirect. Methodology for stability
                              testing, HPLC analysis, visual inspection limitations, temperature
                              effects on degradation kinetics.
                            </li>
                            <li>
                              <strong>Staven V et al. (2017).</strong> "Development and Evaluation of
                              a Prediction Model for Physical Incompatibility of Drug Infusions in
                              Intensive Care Units" in British Journal of Clinical Pharmacology.
                              ScienceDirect. pH-based prediction models, machine learning for
                              compatibility screening, risk stratification ICU polypharmacy.
                            </li>
                            <li>
                              <strong>Hansel TT, Barnes PJ (2013).</strong> "IV Drug Compatibility in
                              Critical Care" in Respiratory Medicine. ScienceDirect. Bronchodilator
                              stability, corticosteroid interactions, antibiotic Y-site protocols,
                              ventilated patient management.
                            </li>
                          </ul>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Disclaimer -->
        <div class="q-mt-lg">
          <q-banner class="bg-grey-2" rounded>
            <template v-slot:avatar>
              <q-icon name="warning_amber" color="warning" />
            </template>
            <div class="text-caption">
              <strong>DISCLAIMER MEDICO:</strong> Questo strumento è a scopo
              educativo/informativo. Per decisioni cliniche verificare sempre con fonti ufficiali
              (Micromedex, Trissel's Handbook) e consulenza farmaceutica professionale.
            </div>
          </q-banner>
        </div>
      </q-tab-panel>

      <!-- ===== TAB 3: DRUG DILUTION (NUOVO) ===== -->
      <q-tab-panel name="dilution">
        <div class="text-h5 text-primary q-mb-md">💧 Drug Dilution Calculator</div>
        <p class="text-body2 text-grey-7 q-mb-lg">
          Calcolo diluizioni farmaci, concentrazioni finali e volumi da prelevare
        </p>

        <div class="row q-gutter-lg">
          <!-- Pannello Input Dilution -->
          <div class="col-12 col-md-5">
            <q-card class="q-pa-md">
              <q-card-section>
                <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri Diluizione</h6>

                <!-- Dose Farmaco -->
                <q-input
                  v-model.number="dilutionForm.dose"
                  type="number"
                  step="0.1"
                  label="Dose Farmaco"
                  suffix="mg"
                  outlined
                  class="q-mb-md"
                  :rules="[(val) => val > 0 || 'Dose deve essere > 0']"
                >
                  <template v-slot:prepend>
                    <q-icon name="medication" color="red" />
                  </template>
                </q-input>

                <!-- Volume Finale -->
                <q-input
                  v-model.number="dilutionForm.volume"
                  type="number"
                  step="1"
                  label="Volume Finale Soluzione"
                  suffix="mL"
                  outlined
                  class="q-mb-md"
                  :rules="[(val) => val > 0 || 'Volume deve essere > 0']"
                >
                  <template v-slot:prepend>
                    <q-icon name="local_drink" color="blue" />
                  </template>
                </q-input>

                <!-- Concentrazione Stock (opzionale) -->
                <q-input
                  v-model.number="dilutionForm.stockConcentration"
                  type="number"
                  step="0.1"
                  label="Concentrazione Stock (opzionale)"
                  suffix="mg/mL"
                  outlined
                  class="q-mb-md"
                  hint="Per calcolare volume da prelevare"
                >
                  <template v-slot:prepend>
                    <q-icon name="science" color="purple" />
                  </template>
                </q-input>

                <!-- Concentrazione Desiderata (opzionale) -->
                <q-input
                  v-model.number="dilutionForm.targetConcentration"
                  type="number"
                  step="0.01"
                  label="Concentrazione Desiderata (opzionale)"
                  suffix="mg/mL"
                  outlined
                  class="q-mb-md"
                  hint="Per calcolare volume finale necessario"
                >
                  <template v-slot:prepend>
                    <q-icon name="straighten" color="green" />
                  </template>
                </q-input>

                <!-- Bottoni -->
                <q-btn
                  @click="calculateDilution"
                  color="primary"
                  size="lg"
                  class="full-width q-mb-sm"
                  icon="calculate"
                  :disable="!isDilutionFormValid"
                >
                  Calcola Diluizione
                </q-btn>
                <q-btn
                  @click="resetDilutionForm"
                  color="negative"
                  size="lg"
                  class="full-width"
                  icon="refresh"
                  outline
                >
                  Reset
                </q-btn>
              </q-card-section>
            </q-card>
          </div>

          <!-- Pannello Risultati Dilution -->
          <div class="col-12 col-md-6">
            <q-card class="q-pa-md">
              <q-card-section>
                <h6 class="text-h6 q-ma-none q-mb-md">📊 Risultati Diluizione</h6>

                <div v-if="dilutionResult.finalConcentration > 0">
                  <!-- Concentrazione Finale -->
                  <div class="text-center q-mb-lg">
                    <div class="text-h3 text-primary q-mb-sm">
                      {{ dilutionResult.finalConcentration.toFixed(2) }}
                    </div>
                    <div class="text-subtitle1 text-grey-7">
                      <strong>mg/mL</strong> (Concentrazione Finale)
                    </div>
                  </div>

                  <q-separator class="q-mb-md" />

                  <!-- Dettagli Calcolo -->
                  <div class="q-mb-md">
                    <q-list bordered separator class="rounded-borders">
                      <q-item>
                        <q-item-section>
                          <q-item-label overline>Dose Totale</q-item-label>
                          <q-item-label class="text-h6">{{ dilutionForm.dose }} mg</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label overline>Volume Finale</q-item-label>
                          <q-item-label class="text-h6">{{ dilutionForm.volume }} mL</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-if="dilutionResult.volumeToWithdraw > 0">
                        <q-item-section>
                          <q-item-label overline>Volume da Prelevare (da stock)</q-item-label>
                          <q-item-label class="text-h6 text-orange">
                            {{ dilutionResult.volumeToWithdraw.toFixed(2) }} mL
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-if="dilutionResult.dilutionRatio">
                        <q-item-section>
                          <q-item-label overline>Rapporto Diluizione</q-item-label>
                          <q-item-label class="text-h6 text-green">
                            {{ dilutionResult.dilutionRatio }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <!-- Istruzioni Preparazione -->
                  <q-banner class="bg-blue-1 q-mb-md" rounded dense>
                    <template v-slot:avatar>
                      <q-icon name="info" color="primary" />
                    </template>
                    <div class="text-body2">
                      <strong>Istruzioni Preparazione:</strong><br />
                      <span v-if="dilutionResult.volumeToWithdraw > 0">
                        1. Prelevare
                        <strong>{{ dilutionResult.volumeToWithdraw.toFixed(2) }} mL</strong> dalla
                        soluzione stock<br />
                        2. Diluire fino a volume finale di
                        <strong>{{ dilutionForm.volume }} mL</strong><br />
                      </span>
                      <span v-else>
                        Aggiungere <strong>{{ dilutionForm.dose }} mg</strong> di farmaco a
                        <strong>{{ dilutionForm.volume }} mL</strong> di solvente
                      </span>
                    </div>
                  </q-banner>

                  <!-- Note Sicurezza -->
                  <q-expansion-item icon="warning" label="⚠️ Note di Sicurezza" class="text-orange">
                    <div class="q-pa-md bg-grey-1">
                      <ul class="text-body2 q-mb-none">
                        <li class="q-mb-sm">
                          <strong>Asepsi:</strong> Effettuare la preparazione in ambiente sterile
                          (cappa a flusso laminare se disponibile)
                        </li>
                        <li class="q-mb-sm">
                          <strong>Stabilità:</strong> Verificare tempo di stabilità del farmaco
                          diluito (alcune soluzioni degradano rapidamente)
                        </li>
                        <li class="q-mb-sm">
                          <strong>Solvente:</strong> Utilizzare solo solventi compatibili (NaCl
                          0.9%, D5W, acqua per preparazioni iniettabili)
                        </li>
                        <li class="q-mb-sm">
                          <strong>Conservazione:</strong> Etichettare con nome farmaco,
                          concentrazione, data/ora preparazione, scadenza
                        </li>
                        <li class="q-mb-sm">
                          <strong>Incompatibilità:</strong> Alcuni farmaci precipitano con solventi
                          specifici (es. fenitoina con destrosio)
                        </li>
                      </ul>
                    </div>
                  </q-expansion-item>

                  <!-- Formula -->
                  <q-expansion-item
                    icon="functions"
                    label="🧮 Formule Utilizzate"
                    class="text-primary q-mt-sm"
                  >
                    <div class="q-pa-md bg-grey-1">
                      <p class="text-body2 q-mb-sm">
                        <strong>Concentrazione Finale:</strong><br />
                        C<sub>finale</sub> (mg/mL) = Dose (mg) / Volume (mL)
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Volume da Prelevare:</strong><br />
                        V<sub>prelievo</sub> (mL) = (C<sub>desiderata</sub> × V<sub>finale</sub>) /
                        C<sub>stock</sub>
                      </p>
                      <p class="text-body2 q-mb-none">
                        <strong>Rapporto Diluizione:</strong><br />
                        Rapporto = 1 : (V<sub>finale</sub> / V<sub>prelievo</sub>)
                      </p>
                    </div>
                  </q-expansion-item>
                </div>

                <div v-else class="text-center text-grey-6 q-pa-xl">
                  <q-icon name="info" size="lg" class="q-mb-md" />
                  <p class="text-body2">Inserisci dose e volume per calcolare la diluizione</p>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- ===== TAB 4: INFUSION RATE CONVERTER (NUOVO) ===== -->
      <q-tab-panel name="infusion">
        <div class="text-h5 text-primary q-mb-md">⚡ Infusion Rate Converter</div>
        <p class="text-body2 text-grey-7 q-mb-lg">
          Conversioni velocità infusione: mcg/kg/min ↔ mL/h per vasopressori e altri farmaci
        </p>

        <div class="row q-gutter-lg">
          <!-- Pannello Input Infusion -->
          <div class="col-12 col-md-5">
            <q-card class="q-pa-md">
              <q-card-section>
                <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri Infusione</h6>

                <!-- Peso Paziente -->
                <q-input
                  v-model.number="infusionForm.weight"
                  type="number"
                  step="0.1"
                  label="Peso Corporeo"
                  suffix="kg"
                  outlined
                  class="q-mb-md"
                  :rules="[(val) => (val > 0 && val <= 500) || 'Peso tra 1-500 kg']"
                >
                  <template v-slot:prepend>
                    <q-icon name="fitness_center" color="blue" />
                  </template>
                </q-input>

                <!-- Concentrazione Soluzione -->
                <q-input
                  v-model.number="infusionForm.concentration"
                  type="number"
                  step="0.001"
                  label="Concentrazione Soluzione"
                  suffix="mg/mL"
                  outlined
                  class="q-mb-md"
                  hint="Concentrazione farmaco nella sacca/siringa"
                  :rules="[(val) => val > 0 || 'Concentrazione deve essere > 0']"
                >
                  <template v-slot:prepend>
                    <q-icon name="science" color="purple" />
                  </template>
                </q-input>

                <q-separator class="q-mb-md" />

                <!-- Direzione Conversione -->
                <div class="q-mb-md">
                  <div class="text-subtitle2 q-mb-sm">Direzione Conversione:</div>
                  <q-btn-toggle
                    v-model="infusionForm.direction"
                    spread
                    toggle-color="primary"
                    :options="[
                      { label: 'Dose → mL/h', value: 'dose-to-rate' },
                      { label: 'mL/h → Dose', value: 'rate-to-dose' },
                    ]"
                  />
                </div>

                <q-separator class="q-mb-md" />

                <!-- Input Dose (se dose-to-rate) -->
                <div v-if="infusionForm.direction === 'dose-to-rate'">
                  <q-input
                    v-model.number="infusionForm.dose"
                    type="number"
                    step="0.01"
                    label="Dose"
                    :suffix="infusionForm.doseUnit"
                    outlined
                    class="q-mb-md"
                    :rules="[(val) => val > 0 || 'Dose deve essere > 0']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="medication" color="red" />
                    </template>
                  </q-input>

                  <!-- Unità Dose -->
                  <q-select
                    v-model="infusionForm.doseUnit"
                    :options="doseUnitOptions"
                    label="Unità Dose"
                    outlined
                    class="q-mb-md"
                    emit-value
                    map-options
                  >
                    <template v-slot:prepend>
                      <q-icon name="straighten" color="green" />
                    </template>
                  </q-select>
                </div>

                <!-- Input Flow Rate (se rate-to-dose) -->
                <div v-if="infusionForm.direction === 'rate-to-dose'">
                  <q-input
                    v-model.number="infusionForm.flowRate"
                    type="number"
                    step="0.1"
                    label="Velocità Infusione"
                    suffix="mL/h"
                    outlined
                    class="q-mb-md"
                    :rules="[(val) => val > 0 || 'Flow rate deve essere > 0']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="speed" color="orange" />
                    </template>
                  </q-input>

                  <!-- Unità Dose Output Desiderata -->
                  <q-select
                    v-model="infusionForm.doseUnit"
                    :options="doseUnitOptions"
                    label="Unità Dose Output"
                    outlined
                    class="q-mb-md"
                    emit-value
                    map-options
                  >
                    <template v-slot:prepend>
                      <q-icon name="straighten" color="green" />
                    </template>
                  </q-select>
                </div>

                <!-- Preset Vasopressori -->
                <div class="q-mb-md">
                  <div class="text-subtitle2 q-mb-sm">⚡ Preset Vasopressori:</div>
                  <div class="row q-gutter-sm">
                    <q-btn
                      v-for="preset in vasopressorPresets"
                      :key="preset.name"
                      @click="applyPreset(preset)"
                      :label="preset.name"
                      size="sm"
                      outline
                      color="primary"
                      class="col"
                    >
                      <q-tooltip>
                        Concentrazione: {{ preset.concentration }} mg/mL<br />
                        Range: {{ preset.rangeMin }}-{{ preset.rangeMax }}
                        {{ preset.unit }}
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>

                <!-- Bottoni -->
                <q-btn
                  @click="calculateInfusion"
                  color="primary"
                  size="lg"
                  class="full-width q-mb-sm"
                  icon="calculate"
                  :disable="!isInfusionFormValid"
                >
                  Calcola Conversione
                </q-btn>
                <q-btn
                  @click="resetInfusionForm"
                  color="negative"
                  size="lg"
                  class="full-width"
                  icon="refresh"
                  outline
                >
                  Reset
                </q-btn>
              </q-card-section>
            </q-card>
          </div>

          <!-- Pannello Risultati Infusion -->
          <div class="col-12 col-md-6">
            <q-card class="q-pa-md">
              <q-card-section>
                <h6 class="text-h6 q-ma-none q-mb-md">📈 Risultati Conversione</h6>

                <div v-if="infusionResult.calculated">
                  <!-- Risultato Principale -->
                  <div class="text-center q-mb-lg">
                    <div class="text-h3 text-primary q-mb-sm">
                      {{ infusionResult.mainValue.toFixed(2) }}
                    </div>
                    <div class="text-subtitle1 text-grey-7">
                      <strong>{{ infusionResult.mainUnit }}</strong>
                    </div>
                  </div>

                  <q-separator class="q-mb-md" />

                  <!-- Dettagli Calcolo -->
                  <div class="q-mb-md">
                    <q-list bordered separator class="rounded-borders">
                      <q-item>
                        <q-item-section>
                          <q-item-label overline>Peso Paziente</q-item-label>
                          <q-item-label class="text-h6">
                            {{ infusionForm.weight }} kg
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label overline>Concentrazione</q-item-label>
                          <q-item-label class="text-h6">
                            {{ infusionForm.concentration }} mg/mL
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label overline>Dose</q-item-label>
                          <q-item-label class="text-h6 text-orange">
                            {{ infusionResult.dose }} {{ infusionForm.doseUnit }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label overline>Velocità Infusione</q-item-label>
                          <q-item-label class="text-h6 text-green">
                            {{ infusionResult.flowRate }} mL/h
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <!-- Range Terapeutico Warning -->
                  <div v-if="infusionResult.therapeuticWarning" class="q-mb-md">
                    <q-banner :class="infusionResult.therapeuticWarning.class" rounded dense>
                      <template v-slot:avatar>
                        <q-icon :name="infusionResult.therapeuticWarning.icon" />
                      </template>
                      <div class="text-body2">
                        <strong>{{ infusionResult.therapeuticWarning.title }}</strong
                        ><br />
                        {{ infusionResult.therapeuticWarning.message }}
                      </div>
                    </q-banner>
                  </div>

                  <!-- Istruzioni Pompa -->
                  <q-banner class="bg-blue-1 q-mb-md" rounded dense>
                    <template v-slot:avatar>
                      <q-icon name="settings" color="primary" />
                    </template>
                    <div class="text-body2">
                      <strong>Impostazioni Pompa Infusionale:</strong><br />
                      Programmare velocità: <strong>{{ infusionResult.flowRate }} mL/h</strong
                      ><br />
                      Dose erogata:
                      <strong>{{ infusionResult.dose }} {{ infusionForm.doseUnit }}</strong>
                    </div>
                  </q-banner>

                  <!-- Note Sicurezza Infusioni -->
                  <q-expansion-item
                    icon="warning"
                    label="⚠️ Note di Sicurezza Infusioni"
                    class="text-orange"
                  >
                    <div class="q-pa-md bg-grey-1">
                      <ul class="text-body2 q-mb-none">
                        <li class="q-mb-sm">
                          <strong>Doppia Verifica:</strong> Controllare sempre calcolo dose e
                          velocità con secondo operatore (farmaci ad alto rischio)
                        </li>
                        <li class="q-mb-sm">
                          <strong>Linea Dedicata:</strong> Vasopressori richiedono accesso venoso
                          centrale (CVC) e linea dedicata senza Y-site
                        </li>
                        <li class="q-mb-sm">
                          <strong>Titolazione:</strong> Iniziare dose minima range terapeutico,
                          aumentare gradualmente monitorando emodinamica
                        </li>
                        <li class="q-mb-sm">
                          <strong>Monitoraggio:</strong> Pressione arteriosa continua (arterial
                          line), ECG, diuresi oraria, lattati, perfusione periferica
                        </li>
                        <li class="q-mb-sm">
                          <strong>Tapering:</strong> NON sospendere bruscamente vasopressori -
                          riduzione graduale 10-20% ogni 15-30 min monitorando PA
                        </li>
                      </ul>
                    </div>
                  </q-expansion-item>

                  <!-- Formula -->
                  <q-expansion-item
                    icon="functions"
                    label="🧮 Formule di Conversione"
                    class="text-primary q-mt-sm"
                  >
                    <div class="q-pa-md bg-grey-1">
                      <p class="text-body2 q-mb-sm">
                        <strong>Da mcg/kg/min a mL/h:</strong><br />
                        mL/h = (Dose mcg/kg/min × Peso kg × 60 min) / (Concentrazione mg/mL × 1000)
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Da mcg/min a mL/h:</strong><br />
                        mL/h = (Dose mcg/min × 60 min) / (Concentrazione mg/mL × 1000)
                      </p>
                      <p class="text-body2 q-mb-sm">
                        <strong>Da mg/h a mL/h:</strong><br />
                        mL/h = Dose mg/h / Concentrazione mg/mL
                      </p>
                      <p class="text-body2 q-mb-none">
                        <strong>Da Units/h a mL/h:</strong><br />
                        mL/h = Dose Units/h / Concentrazione Units/mL
                      </p>
                    </div>
                  </q-expansion-item>

                  <!-- Documentazione Scientifica Vasopressori -->
                  <q-expansion-item
                    icon="book"
                    label="📚 Documentazione Scientifica - Vasopressori e Inotropi"
                    class="text-primary q-mt-md"
                  >
                    <div class="q-pa-md bg-blue-1">
                      <!-- Sezione 1: Farmacologia Vasopressori -->
                      <div class="q-mb-lg">
                        <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                          💉 Farmacologia Vasopressori/Inotropi
                        </h6>
                        <p class="text-body2 q-mb-sm">
                          <strong>Noradrenalina (Norepinephrine):</strong> Agonista α1 &gt;&gt; β1.
                          Vasocostrizione arteriosa/venosa (↑SVR) + modesto inotropo positivo.
                          First-line shock settico. Range: 0.01-3 mcg/kg/min (tipico 0.05-0.5).
                          Concentrazione standard: 4 mg/250 mL (16 mcg/mL).
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Adrenalina (Epinephrine):</strong> Agonista α1=β1=β2.
                          Inotropo+cronotropo+vasocostrittore. Shock settico refrattario,
                          anafilassi, ROSC post-arrest. Range: 0.01-1 mcg/kg/min. ⚠️ Aritmie, ↑
                          lattati (shunt metabolico), ↑consumo O₂ miocardico.
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Dopamina:</strong> Agonista dose-dipendente. Basse dosi (2-5
                          mcg/kg/min): recettori dopaminergici (↑flusso renale/splancnico). Medie
                          dosi (5-10): β1 (inotropo). Alte dosi (>10): α1 (vasocostrittore). ⚠️
                          Aritmogena, evitare in shock settico (SOAP II trial: ↑mortalità vs
                          noradrenalina).
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Dobutamina:</strong> Agonista β1 &gt;&gt; β2, α1. Inotropo puro
                          (↑contrattilità) con vasodilatazione periferica (↓SVR). Shock cardiogeno,
                          low cardiac output syndrome. Range: 2.5-20 mcg/kg/min. ⚠️ Può ↓PA se
                          ipovolemia, tachicardia dose-dipendente.
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Vasopressina (ADH):</strong> Agonista V1 (vasocostrizione
                          non-adrenergica). Add-on shock settico refrattario (VASST trial). Dose
                          FISSA: 0.03-0.04 Units/min (NON titolare). ↓ noradrenalina requirement. ⚠️
                          Ischemia digitale/mesenterica se dose elevate.
                        </p>
                      </div>

                      <!-- Sezione 2: Gestione Shock Settico -->
                      <div class="q-mb-lg">
                        <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                          🩺 Gestione Emodinamica Shock Settico
                        </h6>
                        <p class="text-body2 q-mb-sm">
                          <strong>Surviving Sepsis Campaign 2021:</strong> Algoritmo Bundle
                          Hour-1:<br />
                          1. <strong>Fluid Resuscitation:</strong> 30 mL/kg cristalloidi entro 3h<br />
                          2. <strong>Vasopressor Start:</strong> Target MAP ≥65 mmHg. Noradrenalina
                          first-line via CVC<br />
                          3. <strong>Lactate Clearance:</strong> Rimisurare lattati se iniziali >2
                          mmol/L, target ↓ 10-20%/h<br />
                          4. <strong>Antibiotics:</strong> Broad-spectrum entro 1h da riconoscimento
                          sepsi
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Escalation Vasopressori:</strong><br />
                          • <strong>Step 1:</strong> Noradrenalina 0.05-0.5 mcg/kg/min → target MAP
                          65 mmHg<br />
                          • <strong>Step 2:</strong> Se Norad >0.5 mcg/kg/min → aggiungere
                          Vasopressina 0.03 U/min<br />
                          • <strong>Step 3:</strong> Se ancora MAP bassa → Adrenalina 0.05-0.5
                          mcg/kg/min (alternativa: Fenilefrina)<br />
                          • <strong>Step 4:</strong> Corticosteroidi (Idrocortisone 200 mg/die) se
                          shock refrattario
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Monitoraggio Avanzato:</strong> Pressione arteriosa invasiva
                          (arterial line A-line) OBBLIGATORIA per vasopressori. Cardiac output
                          monitoring (PiCCO, Swan-Ganz) se shock misto cardiogeno+distributivo.
                          ScvO₂ ≥70%, lactate clearance &gt;10%/h, UO &gt;0.5 mL/kg/h, perfusione
                          periferica (CRT &lt;3 sec, mottling score).
                        </p>
                      </div>

                      <!-- Sezione 3: Errori Comuni Infusioni -->
                      <div class="q-mb-lg">
                        <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                          ⚠️ Errori Comuni Calcolo Infusioni
                        </h6>
                        <p class="text-body2 q-mb-sm">
                          <strong>Errore Conversione Unità:</strong> mcg vs mg (1000×), mL vs L
                          (1000×), min vs h (60×). Esempio fatale: 10 mg Adrenalina invece 10 mcg
                          (overdose 1000×) → arresto cardiaco.
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Peso Corporeo:</strong> Utilizzare
                          <strong>Actual Body Weight (ABW)</strong> per vasopressori/inotropi, NON
                          Ideal/Adjusted. Pazienti obesi richiedono dose assoluta maggiore per
                          mantenere PA target.
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Concentrazione Errata:</strong> Verificare SEMPRE concentrazione
                          finale sacca dopo diluizione. Esempio: 4 mg Norad + 250 mL NS = 16 mcg/mL
                          (NON 4 mg/250 mL confuso con 4 mcg/mL).
                        </p>
                        <p class="text-body2 q-mb-sm">
                          <strong>Pompa Infusionale:</strong> Verificare velocità programmata (mL/h)
                          corrisponda a dose desiderata. Test: calcolare al contrario mL/h → dose,
                          confrontare con prescrizione. Smart pumps con drug libraries riducono
                          errori 50%.
                        </p>
                      </div>

                      <!-- Sezione 4: Riferimenti Scientifici -->
                      <div class="q-mb-md">
                        <h6 class="text-subtitle1 text-weight-bold q-mb-sm">
                          📖 Riferimenti Scientifici ScienceDirect
                        </h6>
                        <ul class="text-caption">
                          <li>
                            <strong>Evans L et al. (2021).</strong> "Surviving Sepsis Campaign:
                            International Guidelines for Management of Sepsis and Septic Shock 2021"
                            in Intensive Care Medicine. ScienceDirect. Algoritmi vasopressor
                            escalation, target MAP, fluid resuscitation bundles, early antibiotics.
                          </li>
                          <li>
                            <strong>De Backer D et al. (2010).</strong> "Comparison of Dopamine and
                            Norepinephrine in the Treatment of Shock (SOAP II)" in New England
                            Journal of Medicine. ScienceDirect. RCT 1679 pazienti: Noradrenalina
                            ↓mortalità vs Dopamina, specialmente shock cardiogeno.
                          </li>
                          <li>
                            <strong>Russell JA et al. (2008).</strong> "Vasopressin versus
                            Norepinephrine Infusion in Patients with Septic Shock (VASST)" in New
                            England Journal of Medicine. ScienceDirect. Vasopressina low-dose (0.03
                            U/min) add-on riduce norad requirement, trend ↓mortalità sepsi meno
                            grave.
                          </li>
                          <li>
                            <strong>Bellomo R et al. (2018).</strong> "Inotropes and Vasopressors:
                            More Than Cardiovascular Pharmacology" in British Journal of
                            Anaesthesia. ScienceDirect. PK/PD vasopressori, effetti
                            extra-cardiovascolari (immunomodulazione, metabolismo), adverse events.
                          </li>
                          <li>
                            <strong>Keers RN et al. (2013).</strong> "Prevalence and Nature of
                            Medication Administration Errors in Health Care Settings: A Systematic
                            Review" in Drug Safety. ScienceDirect. Analisi 19 studi: 8-25% errori
                            infusioni IV, farmaci high-alert (insulina, eparina, vasopressori) 35%
                            eventi avversi.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </q-expansion-item>
                </div>

                <div v-else class="text-center text-grey-6 q-pa-xl">
                  <q-icon name="info" size="lg" class="q-mb-md" />
                  <p class="text-body2">
                    Inserisci peso, concentrazione e dose/flow rate per calcolare la conversione
                  </p>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDrugCompatibility } from 'src/composables/useDrugCompatibility';

// ========== INTERFACES ==========

// Dilution Calculator
interface DilutionFormData {
  dose: number | null; // mg
  volume: number | null; // mL
  stockConcentration: number | null; // mg/mL
  targetConcentration: number | null; // mg/mL
}

interface DilutionResult {
  finalConcentration: number; // mg/mL
  volumeToWithdraw: number; // mL
  dilutionRatio: string; // es. "1:10"
}

// Infusion Rate Converter
interface InfusionFormData {
  weight: number | null; // kg
  concentration: number | null; // mg/mL
  dose: number | null; // valore dose
  flowRate: number | null; // mL/h
  doseUnit: string; // 'mcg/kg/min' | 'mcg/min' | 'mg/h' | 'Units/h'
  direction: 'dose-to-rate' | 'rate-to-dose';
}

interface InfusionResult {
  calculated: boolean;
  mainValue: number;
  mainUnit: string;
  dose: string;
  flowRate: string;
  therapeuticWarning: {
    class: string;
    icon: string;
    title: string;
    message: string;
  } | null;
}

interface VasopressorPreset {
  name: string;
  concentration: number; // mg/mL
  rangeMin: number;
  rangeMax: number;
  unit: string;
}

// Dosage Calculator
interface DosageFormData {
  weight: number | null;
  age: number | null;
  creatinine: number | null;
  drug: string | null;
  dosePerKg: number | null;
  fixedDose: number | null;
  frequency: string;
}

interface DrugInfo {
  name: string;
  class: string;
  type: 'weight-based' | 'fixed';
  doseLabel: string;
  doseUnit: string;
  indications: string;
  therapeuticRange: string;
  notes: string;
  precision: number;
  renalElimination: boolean;
}

interface DosageResult {
  totalDose: number;
  dailyDose: number;
  renalAdjustment: number;
  estimatedGFR: number;
}

// ========== STATE ==========

// Active Tab
const activeTab = ref<string>('dosage');

// Dilution Calculator State
const initialDilutionForm: DilutionFormData = {
  dose: null,
  volume: null,
  stockConcentration: null,
  targetConcentration: null,
};

const initialDilutionResult: DilutionResult = {
  finalConcentration: 0,
  volumeToWithdraw: 0,
  dilutionRatio: '',
};

const dilutionForm = ref<DilutionFormData>({ ...initialDilutionForm });
const dilutionResult = ref<DilutionResult>({ ...initialDilutionResult });

// Infusion Rate Converter State
const initialInfusionForm: InfusionFormData = {
  weight: null,
  concentration: null,
  dose: null,
  flowRate: null,
  doseUnit: 'mcg/kg/min',
  direction: 'dose-to-rate',
};

const initialInfusionResult: InfusionResult = {
  calculated: false,
  mainValue: 0,
  mainUnit: '',
  dose: '',
  flowRate: '',
  therapeuticWarning: null,
};

const infusionForm = ref<InfusionFormData>({ ...initialInfusionForm });
const infusionResult = ref<InfusionResult>({ ...initialInfusionResult });

// Dose Unit Options
const doseUnitOptions = [
  { label: 'mcg/kg/min', value: 'mcg/kg/min' },
  { label: 'mcg/min', value: 'mcg/min' },
  { label: 'mg/h', value: 'mg/h' },
  { label: 'Units/h', value: 'Units/h' },
];

// Vasopressor Presets
const vasopressorPresets: VasopressorPreset[] = [
  {
    name: 'Norad',
    concentration: 0.016, // 4mg/250mL
    rangeMin: 0.01,
    rangeMax: 3,
    unit: 'mcg/kg/min',
  },
  {
    name: 'Adrenal',
    concentration: 0.016, // 4mg/250mL
    rangeMin: 0.01,
    rangeMax: 1,
    unit: 'mcg/kg/min',
  },
  {
    name: 'Dopam',
    concentration: 1.6, // 400mg/250mL
    rangeMin: 2,
    rangeMax: 20,
    unit: 'mcg/kg/min',
  },
  {
    name: 'Dobut',
    concentration: 1.0, // 250mg/250mL
    rangeMin: 2.5,
    rangeMax: 20,
    unit: 'mcg/kg/min',
  },
];

// ========== DOSAGE CALCULATOR STATE & DATA ==========

// Dosage Form State
const initialDosageForm: DosageFormData = {
  weight: null,
  age: null,
  creatinine: null,
  drug: null,
  dosePerKg: null,
  fixedDose: null,
  frequency: 'bid',
};

const initialDosageResult: DosageResult = {
  totalDose: 0,
  dailyDose: 0,
  renalAdjustment: 1,
  estimatedGFR: 0,
};

const dosageForm = ref<DosageFormData>({ ...initialDosageForm });
const dosageResult = ref<DosageResult>({ ...initialDosageResult });

// Drug Database
const drugs: Record<string, DrugInfo> = {
  paracetamol: {
    name: 'Paracetamolo',
    class: 'Analgesico/Antipiretico',
    type: 'weight-based',
    doseLabel: 'Dose per kg',
    doseUnit: 'mg/kg',
    indications: 'Dolore e febbre',
    therapeuticRange: '10-15 mg/kg ogni 4-6h',
    notes: 'Max 4g/die negli adulti, 60mg/kg/die nei bambini',
    precision: 1,
    renalElimination: false,
  },
  amoxicillin: {
    name: 'Amoxicillina',
    class: 'Antibiotico (Penicillina)',
    type: 'weight-based',
    doseLabel: 'Dose per kg',
    doseUnit: 'mg/kg',
    indications: 'Infezioni batteriche',
    therapeuticRange: '20-40 mg/kg ogni 8h',
    notes: 'Aggiustare in insufficienza renale',
    precision: 1,
    renalElimination: true,
  },
  furosemide: {
    name: 'Furosemide',
    class: "Diuretico dell'ansa",
    type: 'weight-based',
    doseLabel: 'Dose per kg',
    doseUnit: 'mg/kg',
    indications: 'Edema, ipertensione',
    therapeuticRange: '0.5-2 mg/kg',
    notes: 'Monitorare elettroliti e funzione renale',
    precision: 1,
    renalElimination: true,
  },
  digoxin: {
    name: 'Digossina',
    class: 'Glicosidi digitalici',
    type: 'weight-based',
    doseLabel: 'Dose per kg',
    doseUnit: 'μg/kg',
    indications: 'Insufficienza cardiaca, FA',
    therapeuticRange: '8-12 μg/kg loading dose',
    notes: 'Monitorare livelli ematici e funzione renale',
    precision: 1,
    renalElimination: true,
  },
  aspirin: {
    name: 'Aspirina',
    class: 'FANS/Antiaggregante',
    type: 'fixed',
    doseLabel: 'Dose',
    doseUnit: 'mg',
    indications: 'Prevenzione cardiovascolare',
    therapeuticRange: '75-100 mg/die',
    notes: 'Controindicata in età pediatrica (Sindrome di Reye)',
    precision: 0,
    renalElimination: false,
  },
};

// Drug Options
const drugOptions = Object.keys(drugs).map((key) => ({
  label: drugs[key]?.name || '',
  value: key,
}));

// Frequency Options
const frequencyOptions = [
  { label: 'Una volta al giorno', value: 'qd' },
  { label: 'Due volte al giorno', value: 'bid' },
  { label: 'Tre volte al giorno', value: 'tid' },
  { label: 'Quattro volte al giorno', value: 'qid' },
  { label: 'Ogni 6 ore', value: 'q6h' },
  { label: 'Ogni 8 ore', value: 'q8h' },
  { label: 'Ogni 12 ore', value: 'q12h' },
];

// Selected Drug Computed
const selectedDrug = computed(() => {
  return dosageForm.value.drug ? drugs[dosageForm.value.drug] : null;
});

// Dosage Form Validation
const isDosageFormValid = computed(() => {
  return (
    dosageForm.value.weight !== null &&
    dosageForm.value.weight > 0 &&
    dosageForm.value.age !== null &&
    dosageForm.value.age >= 0 &&
    dosageForm.value.drug !== null &&
    ((selectedDrug.value?.type === 'weight-based' &&
      dosageForm.value.dosePerKg !== null &&
      dosageForm.value.dosePerKg > 0) ||
      (selectedDrug.value?.type === 'fixed' &&
        dosageForm.value.fixedDose !== null &&
        dosageForm.value.fixedDose > 0))
  );
});

// ========== END DOSAGE STATE ==========

// ========== DRUG COMPATIBILITY STATE (from composable) ==========

// Composable Drug Compatibility
const {
  filteredDrugs: compatFilteredDrugs,
  selectedDrugs: compatSelectedDrugs,
  searchQuery: compatSearchQuery,
  isLoading: compatIsLoading,
  analyzeMultipleDrugs: compatAnalyzeMultipleDrugs,
  formatDrugList: compatFormatDrugList,
  addDrug: compatAddDrug,
  removeDrug: compatRemoveDrug,
  clearSelection: compatClearSelection,
  getCategoryIcon: compatGetCategoryIcon,
} = useDrugCompatibility();

// Compatibility Analysis Results
const compatAnalysisResults = ref<ReturnType<typeof compatAnalyzeMultipleDrugs> | null>(null);

// Computed Warnings
const compatCriticalWarnings = computed(() => {
  return compatAnalysisResults.value?.warnings.filter((w) => w.type === 'critical') || [];
});

const compatNormalWarnings = computed(() => {
  return compatAnalysisResults.value?.warnings.filter((w) => w.type === 'warning') || [];
});

const compatInfoWarnings = computed(() => {
  return compatAnalysisResults.value?.warnings.filter((w) => w.type === 'info') || [];
});

// Analyze Compatibility Method
const compatAnalyzeCompatibility = () => {
  compatIsLoading.value = true;

  // Simula loading
  setTimeout(() => {
    compatAnalysisResults.value = compatAnalyzeMultipleDrugs(compatSelectedDrugs.value);
    compatIsLoading.value = false;
  }, 500);
};

// ========== END DRUG COMPATIBILITY STATE ==========

// ========== DILUTION CALCULATOR FUNCTIONS ==========

// Validation
const isDilutionFormValid = computed(() => {
  return (
    dilutionForm.value.dose !== null &&
    dilutionForm.value.dose > 0 &&
    dilutionForm.value.volume !== null &&
    dilutionForm.value.volume > 0
  );
});

// Calculate Dilution
const calculateDilution = () => {
  if (!isDilutionFormValid.value) return;

  const dose = dilutionForm.value.dose!;
  const volume = dilutionForm.value.volume!;
  const stockConc = dilutionForm.value.stockConcentration;

  // Concentrazione finale = Dose / Volume
  const finalConcentration = dose / volume;

  // Volume da prelevare (se stock concentration fornita)
  let volumeToWithdraw = 0;
  if (stockConc && stockConc > 0) {
    // V_prelievo = Dose / C_stock
    volumeToWithdraw = dose / stockConc;
  }

  // Rapporto diluizione (se volume da prelevare calcolato)
  let dilutionRatio = '';
  if (volumeToWithdraw > 0) {
    const ratio = volume / volumeToWithdraw;
    dilutionRatio = `1:${ratio.toFixed(1)}`;
  }

  dilutionResult.value = {
    finalConcentration,
    volumeToWithdraw,
    dilutionRatio,
  };
};

// Reset Dilution Form
const resetDilutionForm = () => {
  dilutionForm.value = { ...initialDilutionForm };
  dilutionResult.value = { ...initialDilutionResult };
};

// ========== DOSAGE CALCULATOR FUNCTIONS ==========

// On Drug Change
const onDrugChange = () => {
  // Reset dosaggi quando cambia farmaco
  dosageForm.value.dosePerKg = null;
  dosageForm.value.fixedDose = null;
};

// Calculate Dosage
const calculateDosage = () => {
  if (!isDosageFormValid.value || !selectedDrug.value) return;

  let baseDose = 0;

  if (selectedDrug.value.type === 'weight-based') {
    baseDose = dosageForm.value.dosePerKg! * dosageForm.value.weight!;
  } else {
    baseDose = dosageForm.value.fixedDose!;
  }

  // Aggiustamento per età
  const ageAdjustment = getAgeAdjustment();

  // Aggiustamento per funzione renale
  const renalAdjustment = calculateRenalAdjustment();

  // Dose finale
  const finalDose = baseDose * ageAdjustment * renalAdjustment;

  // Calcolo dose giornaliera
  const dailyFreq = getFrequencyPerDay();
  const dailyDose = finalDose * dailyFreq;

  dosageResult.value = {
    totalDose: finalDose,
    dailyDose,
    renalAdjustment,
    estimatedGFR: estimateGFR(),
  };
};

// Get Age Adjustment
const getAgeAdjustment = (): number => {
  const age = dosageForm.value.age!;

  // Aggiustamenti età-specifici
  if (age >= 65) {
    return 0.75; // Riduzione 25% negli anziani
  } else if (age < 2) {
    return 0.5; // Riduzione 50% nei neonati
  } else if (age < 12) {
    return 0.8; // Riduzione 20% nei bambini
  }

  return 1; // Nessun aggiustamento negli adulti
};

// Calculate Renal Adjustment
const calculateRenalAdjustment = (): number => {
  if (!dosageForm.value.creatinine || !selectedDrug.value?.renalElimination) {
    return 1;
  }

  const gfr = estimateGFR();

  // Aggiustamenti basati su eGFR
  if (gfr >= 60) return 1; // Nessun aggiustamento
  if (gfr >= 30) return 0.75; // Riduzione 25%
  if (gfr >= 15) return 0.5; // Riduzione 50%
  return 0.25; // Riduzione 75%
};

// Estimate GFR
const estimateGFR = (): number => {
  if (!dosageForm.value.creatinine || !dosageForm.value.age || !dosageForm.value.weight) {
    return 0;
  }

  // Formula Cockcroft-Gault semplificata
  const { age, weight, creatinine } = dosageForm.value;
  return ((140 - age) * weight) / (72 * creatinine);
};

// Get Frequency Per Day
const getFrequencyPerDay = (): number => {
  const freqMap: Record<string, number> = {
    qd: 1,
    bid: 2,
    tid: 3,
    qid: 4,
    q6h: 4,
    q8h: 3,
    q12h: 2,
  };
  return freqMap[dosageForm.value.frequency] || 2;
};

// Get Frequency Text
const getFrequencyText = (): string => {
  const freqMap: Record<string, string> = {
    qd: '1x/die',
    bid: '2x/die',
    tid: '3x/die',
    qid: '4x/die',
    q6h: 'Ogni 6h',
    q8h: 'Ogni 8h',
    q12h: 'Ogni 12h',
  };
  return freqMap[dosageForm.value.frequency] || '2x/die';
};

// Get Age Note
const getAgeNote = (): string => {
  const age = dosageForm.value.age!;
  if (age >= 65) return 'Metabolismo ridotto negli anziani';
  if (age < 2) return 'Immaturità degli organi nei neonati';
  if (age < 12) return 'Metabolismo accelerato nei bambini';
  return '';
};

// Reset Dosage Form
const resetDosageForm = () => {
  dosageForm.value = { ...initialDosageForm };
  dosageResult.value = { ...initialDosageResult };
};

// ========== INFUSION RATE CONVERTER FUNCTIONS ==========

// Validation
const isInfusionFormValid = computed(() => {
  const form = infusionForm.value;
  const hasWeight = form.weight !== null && form.weight > 0;
  const hasConcentration = form.concentration !== null && form.concentration > 0;

  if (form.direction === 'dose-to-rate') {
    return hasWeight && hasConcentration && form.dose !== null && form.dose > 0;
  } else {
    return hasWeight && hasConcentration && form.flowRate !== null && form.flowRate > 0;
  }
});

// Apply Preset
const applyPreset = (preset: VasopressorPreset) => {
  infusionForm.value.concentration = preset.concentration;
  infusionForm.value.doseUnit = preset.unit;
  infusionForm.value.direction = 'dose-to-rate';
};

// Calculate Infusion
const calculateInfusion = () => {
  if (!isInfusionFormValid.value) return;

  const form = infusionForm.value;
  let calculatedDose = 0;
  let calculatedFlowRate = 0;

  if (form.direction === 'dose-to-rate') {
    // Dose → mL/h
    calculatedDose = form.dose!;
    calculatedFlowRate = convertDoseToFlowRate(
      calculatedDose,
      form.doseUnit,
      form.weight!,
      form.concentration!,
    );

    infusionResult.value = {
      calculated: true,
      mainValue: calculatedFlowRate,
      mainUnit: 'mL/h',
      dose: `${calculatedDose.toFixed(2)} ${form.doseUnit}`,
      flowRate: `${calculatedFlowRate.toFixed(2)} mL/h`,
      therapeuticWarning: checkTherapeuticRange(calculatedDose, form.doseUnit),
    };
  } else {
    // mL/h → Dose
    calculatedFlowRate = form.flowRate!;
    calculatedDose = convertFlowRateToDose(
      calculatedFlowRate,
      form.doseUnit,
      form.weight!,
      form.concentration!,
    );

    infusionResult.value = {
      calculated: true,
      mainValue: calculatedDose,
      mainUnit: form.doseUnit,
      dose: `${calculatedDose.toFixed(2)} ${form.doseUnit}`,
      flowRate: `${calculatedFlowRate.toFixed(2)} mL/h`,
      therapeuticWarning: checkTherapeuticRange(calculatedDose, form.doseUnit),
    };
  }
};

// Convert Dose to Flow Rate
const convertDoseToFlowRate = (
  dose: number,
  unit: string,
  weight: number,
  concentration: number,
): number => {
  // Concentration in mg/mL
  // Formula: mL/h = (dose × weight × 60) / (concentration × 1000) for mcg/kg/min
  switch (unit) {
    case 'mcg/kg/min':
      return (dose * weight * 60) / (concentration * 1000);
    case 'mcg/min':
      return (dose * 60) / (concentration * 1000);
    case 'mg/h':
      return dose / concentration;
    case 'Units/h':
      return dose / concentration;
    default:
      return 0;
  }
};

// Convert Flow Rate to Dose
const convertFlowRateToDose = (
  flowRate: number,
  unit: string,
  weight: number,
  concentration: number,
): number => {
  // Reverse formulas
  switch (unit) {
    case 'mcg/kg/min':
      return (flowRate * concentration * 1000) / (weight * 60);
    case 'mcg/min':
      return (flowRate * concentration * 1000) / 60;
    case 'mg/h':
      return flowRate * concentration;
    case 'Units/h':
      return flowRate * concentration;
    default:
      return 0;
  }
};

// Check Therapeutic Range
const checkTherapeuticRange = (
  dose: number,
  unit: string,
): InfusionResult['therapeuticWarning'] => {
  if (unit !== 'mcg/kg/min') return null;

  // Ranges for common vasopressors
  if (dose < 0.01) {
    return {
      class: 'bg-info text-white',
      icon: 'info',
      title: 'Dose Bassa',
      message:
        'Dose inferiore al range terapeutico standard (0.01-0.5 mcg/kg/min). Verificare prescrizione.',
    };
  } else if (dose >= 0.01 && dose <= 0.5) {
    return {
      class: 'bg-positive text-white',
      icon: 'check_circle',
      title: 'Range Terapeutico',
      message: 'Dose nel range standard per vasopressori (0.01-0.5 mcg/kg/min).',
    };
  } else if (dose > 0.5 && dose <= 1) {
    return {
      class: 'bg-warning text-white',
      icon: 'warning',
      title: 'Dose Elevata',
      message: 'Dose superiore al range standard. Monitoraggio emodinamico intensivo richiesto.',
    };
  } else {
    return {
      class: 'bg-negative text-white',
      icon: 'error',
      title: 'Dose Molto Elevata',
      message:
        'Dose >1 mcg/kg/min indica shock refrattario. Considerare secondo vasopressore (vasopressina/adrenalina) e corticosteroidi.',
    };
  }
};

// Reset Infusion Form
const resetInfusionForm = () => {
  infusionForm.value = { ...initialInfusionForm };
  infusionResult.value = { ...initialInfusionResult };
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
</style>
