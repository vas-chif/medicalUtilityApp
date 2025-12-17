/**
 * @file it-IT/dosageCalculator.ts
 * @description Traduzioni italiane per Dosage Calculator (Weight-based & Fixed)
 * @author Vasile Chifeac
 * @created 2025-12-16
 *
 * @references
 * - Holford NHG (2013). "A pharmacokinetic standard for babies and adults"
 *   J Pharm Sci 102(9):2941-2952. PMID: 23650116
 * - Kearns GL, et al. (2003). "Developmental pharmacology - Drug disposition, action, and therapy in infants and children"
 *   N Engl J Med 349(12):1157-1167. PMID: 13679531
 * - Matzke GR, et al. (2016). "Drug Dosing Consideration in Patients with Acute and Chronic Kidney Disease"
 *   Brenner & Rector's The Kidney, 10th Edition
 */

export default {
  // 1. TITOLI PRINCIPALI
  title: 'Dosage Calculator',
  subtitle: 'Calcolo Dosaggio Farmaci (Peso-Dipendente e Fisso)',

  // 2. FORM INPUT
  form: {
    weight: {
      label: 'Peso Corporeo',
      unit: 'kg',
      hint: 'Peso attuale del paziente',
    },
    age: {
      label: 'Età',
      unit: 'anni',
      hint: 'Età del paziente per aggiustamenti',
    },
    creatinine: {
      label: 'Creatinina Sierica (opzionale)',
      unit: 'mg/dL',
      hint: 'Per calcolo eGFR (Cockcroft-Gault)',
    },
    drug: {
      label: 'Seleziona Farmaco',
      placeholder: 'Scegli un farmaco...',
    },
    dosePerKg: {
      label: 'Dose per kg',
      unit: 'mg/kg',
      hint: 'Dose unitaria per kg di peso corporeo',
    },
    fixedDose: {
      label: 'Dose',
      unit: 'mg',
      hint: 'Dose fissa indipendente dal peso',
    },
    frequency: {
      label: 'Frequenza Somministrazione',
      options: {
        qd: 'Una volta al giorno',
        bid: 'Due volte al giorno',
        tid: 'Tre volte al giorno',
        qid: 'Quattro volte al giorno',
        q6h: 'Ogni 6 ore',
        q8h: 'Ogni 8 ore',
        q12h: 'Ogni 12 ore',
      },
    },
  },

  // 3. PULSANTI
  buttons: {
    calculate: 'Calcola Dosaggio',
    reset: 'Reset Dati',
  },

  // 4. DATABASE FARMACI
  drugs: {
    paracetamol: {
      name: 'Paracetamolo',
      class: 'Analgesico/Antipiretico',
      doseLabel: 'Dose per kg',
      doseUnit: 'mg/kg',
      indications: 'Dolore e febbre',
      therapeuticRange: '10-15 mg/kg ogni 4-6h',
      notes: 'Max 4g/die negli adulti, 60mg/kg/die nei bambini',
    },
    amoxicillin: {
      name: 'Amoxicillina',
      class: 'Antibiotico (Penicillina)',
      doseLabel: 'Dose per kg',
      doseUnit: 'mg/kg',
      indications: 'Infezioni batteriche',
      therapeuticRange: '20-40 mg/kg ogni 8h',
      notes: 'Aggiustare in insufficienza renale',
    },
    furosemide: {
      name: 'Furosemide',
      class: "Diuretico dell'ansa",
      doseLabel: 'Dose per kg',
      doseUnit: 'mg/kg',
      indications: 'Edema, ipertensione',
      therapeuticRange: '0.5-2 mg/kg',
      notes: 'Monitorare elettroliti e funzione renale',
    },
    digoxin: {
      name: 'Digossina',
      class: 'Glicosidi digitalici',
      doseLabel: 'Dose per kg',
      doseUnit: 'μg/kg',
      indications: 'Insufficienza cardiaca, FA',
      therapeuticRange: '8-12 μg/kg loading dose',
      notes: 'Monitorare livelli ematici e funzione renale',
    },
    aspirin: {
      name: 'Aspirina',
      class: 'FANS/Antiaggregante',
      doseLabel: 'Dose',
      doseUnit: 'mg',
      indications: 'Prevenzione cardiovascolare',
      therapeuticRange: '75-100 mg/die',
      notes: 'Controindicata in età pediatrica (Sindrome di Reye)',
    },
  },

  // 5. PANNELLO RISULTATI
  resultsPanel: {
    title: 'Risultati Dosaggio',
    totalDose: {
      label: 'Dose Singola',
      subtitle: 'per somministrazione',
    },
    dailyDose: {
      label: 'Dose Giornaliera',
      subtitle: 'totale 24h',
    },
    frequency: {
      label: 'Frequenza',
    },
    renalAdjustment: {
      label: 'Aggiustamento Renale',
      subtitle: 'fattore moltiplicativo',
    },
    estimatedGFR: {
      label: 'eGFR Stimato',
      subtitle: '(Cockcroft-Gault)',
      unit: 'mL/min',
    },
  },

  // 6. INFORMAZIONI FARMACO
  drugInfo: {
    title: 'Informazioni Farmaco',
    class: 'Classe Farmacologica',
    indications: 'Indicazioni Cliniche',
    therapeuticRange: 'Range Terapeutico',
    notes: 'Note Cliniche',
  },

  // 7. AVVERTENZE
  warnings: {
    title: 'Avvertenze Importanti',
    items: [
      '<strong>Dosaggio stimato:</strong> Questo calcolatore fornisce una <strong>stima iniziale</strong>. Consulta sempre le linee guida ufficiali (RCP/Summaries of Product Characteristics) e la letteratura clinica.',
      '<strong>Variabilità individuale:</strong> Fattori come funzione renale/epatica, interazioni farmacologiche, comorbidità, età estremi (neonati/anziani) richiedono personalizzazione.',
      '<strong>TDM (Therapeutic Drug Monitoring):</strong> Per farmaci a stretto indice terapeutico (digossina, aminoglicosidi, vancomicina, antiepilettici), il TDM è OBBLIGATORIO.',
      '<strong>Pediatria:</strong> Dosaggi neonatali/pediatrici richiedono calcoli BSA-based (Dubois/Mosteller) e aggiustamenti ontogenetici per clearance immaturo.',
      '<strong>Insufficienza renale:</strong> Aggiustamento eGFR-based è approssimativo. Formula Cockcroft-Gault è preferibile, ma in CKD stadio 4-5 considera dialisi/consulto nefrologico.',
    ],
  },

  // 8. FORMULE
  formulas: {
    title: 'Formule Utilizzate',
    content: {
      weightBasedTitle: 'Dosaggio Peso-Dipendente:',
      weightBasedFormula:
        '<strong>Dose Singola (mg) = Dose per kg (mg/kg) × Peso (kg) × Fattore Aggiustamento</strong><br/>' +
        '<strong>Dose Giornaliera (mg) = Dose Singola (mg) × Numero Somministrazioni/die</strong>',
      fixedDoseTitle: 'Dosaggio Fisso:',
      fixedDoseFormula:
        '<strong>Dose Singola (mg) = Dose Prescritta (mg)</strong><br/>' +
        '<strong>Dose Giornaliera (mg) = Dose Singola (mg) × Numero Somministrazioni/die</strong>',
      egfrTitle: 'eGFR (Cockcroft-Gault):',
      egfrFormula:
        '<strong>eGFR (mL/min) = [(140 - Età) × Peso (kg)] / [72 × Creatinina (mg/dL)]</strong><br/>' +
        '<em>Note:</em> Moltiplicare per 0.85 se donna. Formula validata per adulti (18-80 anni).',
      adjustmentTitle: 'Fattori Aggiustamento:',
      adjustmentRules: [
        '<strong>eGFR > 60 mL/min:</strong> Fattore 1.0 (dose piena)',
        '<strong>eGFR 30-60 mL/min (CKD 3):</strong> Fattore 0.75 (riduzione 25%)',
        '<strong>eGFR 15-30 mL/min (CKD 4):</strong> Fattore 0.50 (riduzione 50%)',
        '<strong>eGFR < 15 mL/min (CKD 5):</strong> Fattore 0.25 (riduzione 75%)',
        '<strong>Età < 1 anno (neonati):</strong> Fattore 0.50 (clearance renale immatura)',
        '<strong>Età 1-12 anni (bambini):</strong> Fattore 0.80 (clearance in sviluppo)',
        '<strong>Età > 65 anni (anziani):</strong> Fattore 0.75 (declino fisiologico)',
      ],
    },
  },

  // 9. SEZIONI DOCUMENTAZIONE
  sections: {
    // SEZIONE 1: Definizione (bg-blue-1) - Farmacocinetica
    pharmacokinetics: {
      title: 'Definizione: Farmacocinetica e Farmacodinamica (PK/PD)',
      content: {
        introTitle: 'Principi ADME (Assorbimento, Distribuzione, Metabolismo, Escrezione):',
        intro: [
          '<strong>Assorbimento:</strong> Biodisponibilità orale variabile (F = 0-100%). Primo passaggio epatico riduce F (morfina 30%, propranololo 25%). Via EV bypassa assorbimento (F = 100%).',
          '<strong>Distribuzione:</strong> Volume di distribuzione (Vd) determina concentrazione plasmatica. Farmaci idrofili (Vd piccolo, es. aminoglicosidi 0.25 L/kg) vs lipofili (Vd grande, es. amiodarone 60 L/kg).',
          '<strong>Metabolismo:</strong> Clearance epatica (CYP450, glucuronidazione). Induttori enzimatici (rifampicina, fenitoina) ↑clearance. Inibitori (ketoconazolo, eritromicina) ↓clearance → tossicità.',
          '<strong>Escrezione:</strong> Clearance renale dominante per farmaci idrofili (penicilline, aminoglicosidi, digossina). eGFR-based adjustment obbligatorio in CKD.',
        ],
        pkParametersTitle: 'Parametri PK Chiave:',
        pkParameters: [
          '<strong>Emivita (t½):</strong> Tempo per ↓50% concentrazione plasmatica. Guida frequenza somministrazione. 5 emivite = steady state. Digossina t½ = 36-48h → QD. Penicillina t½ = 30 min → Q4-6h.',
          '<strong>Clearance (CL):</strong> Volume plasma completamente depurato/unità tempo (L/h). CL totale = CL renale + CL epatica. CKD → ↓CL renale → accumulo farmaci eliminati renalmente.',
          '<strong>AUC (Area Under Curve):</strong> Esposizione totale farmaco. Dose = CL × AUC target. Vancomicina AUC₀₋₂₄ target 400-600 mg·h/L (vs MRSA).',
          '<strong>Cmax, Cmin:</strong> Picco e valle concentrazione. Aminoglicosidi: Cmax/MIC > 8-10 (efficacia), Cmin < 1 mg/L (nefrotossicità).',
        ],
        pkpdTitle: 'Relazione PK/PD:',
        pkpd: [
          '<strong>Farmaci tempo-dipendenti (TDD):</strong> Beta-lattamici, vancomicina. Efficacia dipende da T > MIC (tempo sopra MIC). Target: T > MIC 40-70% intervallo dosaggio. Infusione continua/prolungata ottimale.',
          '<strong>Farmaci concentrazione-dipendenti (CDD):</strong> Aminoglicosidi, fluorochinoloni. Efficacia dipende da Cmax/MIC o AUC/MIC. Target: Cmax/MIC > 8-10, AUC₀₋₂₄/MIC > 125. Dosaggio singolo alta dose + intervallo lungo.',
        ],
      },
    },

    // SEZIONE 2: Dosaggi Pediatrici
    pediatric: {
      title: 'Dosaggi Pediatrici e Neonatali',
      content: {
        introTitle: 'Farmacocinetica Ontogenetica:',
        intro: [
          '<strong>Neonati (0-28 giorni):</strong> Clearance renale/epatica immatura (30-50% adulto). GFR neonatale ~20-40 mL/min/1.73m². Metabolismo CYP450 ridotto. t½ prolungata (gentamicina neonato t½ = 5-10h vs adulto 2h). Vd aumentato (↑acqua corporea totale 75% vs adulto 60%).',
          '<strong>Lattanti/Bambini (1 mese-12 anni):</strong> Clearance progressivamente ↑. A 6 mesi: GFR ~60% adulto. A 1 anno: GFR ~80-90% adulto. Metabolismo CYP450 maturo a 2-3 anni. Dosaggio mg/kg spesso > adulti per compensare ↑clearance e ↑Vd.',
          '<strong>Adolescenti (12-18 anni):</strong> PK simile adulti, ma variabilità pubertà (cambiamenti ormonali, massa corporea).',
        ],
        bsaTitle: 'Dosaggio BSA-Based (Body Surface Area):',
        bsa: [
          '<strong>Formula Mosteller:</strong> BSA (m²) = √[(Peso kg × Altezza cm) / 3600]. Preferita per semplicità.',
          '<strong>Formula Dubois:</strong> BSA (m²) = 0.007184 × Peso⁰·⁴²⁵ × Altezza⁰·⁷²⁵. Più accurata, ma complessa.',
          '<strong>Indicazioni BSA-based:</strong> Chemioterapici (stretto indice terapeutico), alcuni antibiotici ad alta potenza. Dose pediatrica (mg) = Dose adulta (mg/m²) × BSA paziente (m²).',
        ],
        ageAdjustmentsTitle: 'Aggiustamenti Age-Specific:',
        ageAdjustments: [
          '<strong>Prematurità:</strong> Riduzione dosaggio 50-75% + intervalli prolungati (↓↓clearance). Monitoraggio TDM obbligatorio.',
          '<strong>Neonati a termine:</strong> Riduzione dosaggio 25-50%. Gentamicina neonato: 2.5 mg/kg q12-18h vs adulto 5 mg/kg q24h.',
          '<strong>Bambini (1-12 anni):</strong> Dosaggio mg/kg spesso simile/superiore adulti. Amoxicillina bambino: 40-90 mg/kg/die vs adulto 25-50 mg/kg/die.',
          '<strong>Adolescenti:</strong> Transizione graduale a dosaggi adulti (peso > 50 kg e sviluppo puberale completo).',
        ],
      },
    },

    // SEZIONE 3: Insufficienza Renale
    renalImpairment: {
      title: 'Aggiustamento Dosaggio in Insufficienza Renale (CKD)',
      content: {
        ckdStagesTitle: 'Stadi CKD (KDIGO 2012):',
        ckdStages: [
          '<strong>CKD 1:</strong> eGFR ≥ 90 mL/min + danno renale. Dose piena.',
          '<strong>CKD 2:</strong> eGFR 60-89 mL/min. Dose piena, monitoraggio.',
          '<strong>CKD 3a:</strong> eGFR 45-59 mL/min. Riduzione dose 25% o ↑intervallo.',
          '<strong>CKD 3b:</strong> eGFR 30-44 mL/min. Riduzione dose 50% o ↑↑intervallo.',
          '<strong>CKD 4:</strong> eGFR 15-29 mL/min. Riduzione dose 50-75%. Consulto nefrologico.',
          '<strong>CKD 5:</strong> eGFR < 15 mL/min. Riduzione dose 75% o dialisi-based adjustment. TDM obbligatorio.',
        ],
        adjustmentTitle: 'Metodi Aggiustamento:',
        adjustment: [
          '<strong>Riduzione dose, intervallo fisso:</strong> Mantenere concentrazione costante. Es: Amoxicillina adulto 500 mg TID → CKD 3: 250 mg TID.',
          '<strong>Dose fissa, ↑intervallo:</strong> Mantenere Cmax, ma ↑tempo sotto MIC. Es: Gentamicina 5 mg/kg q24h → CKD 4: 5 mg/kg q48h.',
          '<strong>Riduzione dose + ↑intervallo:</strong> Per farmaci con stretto indice terapeutico. Es: Digossina 0.25 mg QD → CKD 4: 0.125 mg ogni 48h.',
        ],
        dialysisTitle: 'Dialisi e Supplementazione:',
        dialysis: [
          '<strong>Emodialisi (HD):</strong> Rimuove farmaci idrofili, basso peso molecolare, bassa legame proteine. Aminoglicosidi, vancomicina, beta-lattamici → supplementazione post-HD obbligatoria.',
          '<strong>Dialisi peritoneale (PD):</strong> Clearance continua ma inferiore HD. Supplementazione meno frequente.',
          '<strong>CRRT (Continuous Renal Replacement Therapy):</strong> Clearance continua simile eGFR 20-40 mL/min. Dosaggio intermedio tra CKD 3-4.',
        ],
        drugsExamplesTitle: 'Esempi Farmaci Eliminati Renalmente:',
        drugsExamples:
          'Penicilline, Aminoglicosidi, Vancomicina, Digossina, Gabapentin, Metformina, Allopurinolo, ACE-inibitori, Enoxaparina. Tutti richiedono aggiustamento CKD-based.',
      },
    },

    // SEZIONE 4: Loading vs Maintenance
    loadingMaintenance: {
      title: 'Loading Dose vs Maintenance Dose',
      content: {
        conceptsTitle: 'Concetti Fondamentali:',
        concepts: [
          '<strong>Loading Dose (LD):</strong> Dose iniziale elevata per raggiungere rapidamente concentrazione terapeutica (Css target). Bypass tempo steady state (5 emivite).',
          '<strong>Maintenance Dose (MD):</strong> Dose regolare per mantenere Css. Compensa clearance continua.',
          '<strong>Steady State (Css):</strong> Equilibrio tra input (dose) e output (clearance). Raggiunto dopo 5 emivite. Prima di Css: accumulo progressivo.',
        ],
        formulasTitle: 'Formule Calcolo:',
        formulas: [
          '<strong>Loading Dose:</strong> LD (mg) = Vd (L/kg) × Peso (kg) × Css target (mg/L) / Biodisponibilità (F).',
          '<strong>Maintenance Dose:</strong> MD (mg) = CL (L/h) × Css target (mg/L) × τ (intervallo ore) / F.',
          '<strong>Tempo Steady State:</strong> t(ss) = 5 × t½. Digossina t½ = 40h → t(ss) = 200h (8 giorni).',
        ],
        indicationsTitle: 'Indicazioni Loading Dose:',
        indications: [
          '<strong>Farmaci con lunga t½:</strong> Digossina (t½ 36-48h), Amiodarone (t½ 40-60 giorni). Senza LD: steady state settimane/mesi → inaccettabile in urgenza.',
          '<strong>Infezioni severe:</strong> Vancomicina (MRSA sepsi), Aminoglicosidi (Pseudomonas sepsi). Raggiungere Cmax/MIC target entro 2-4h critico per outcome.',
          '<strong>Aritmie acute:</strong> Digossina (FA rapida), Amiodarone (TV), Flecainide. Controllo ritmo urgente richiede LD.',
          '<strong>Crisi epilettiche:</strong> Fenitoina, Valproato, Levetiracetam. Status epilepticus richiede LD EV rapida.',
        ],
        examplesTitle: 'Esempi Clinici:',
        examples: [
          '<strong>Digossina (insufficienza cardiaca acuta):</strong> LD = 8-12 μg/kg (totale 0.5-1 mg) in 24h (diviso TID). MD = 0.125-0.25 mg QD (basato eGFR).',
          '<strong>Vancomicina (MRSA sepsi):</strong> LD = 25-30 mg/kg EV (max 3g) dose singola. MD = 15-20 mg/kg q8-12h (basato eGFR). Target AUC₀₋₂₄ 400-600 mg·h/L.',
          '<strong>Fenitoina (status epilepticus):</strong> LD = 15-20 mg/kg EV lento (max 50 mg/min). MD = 4-6 mg/kg/die (diviso BID/TID). Target 10-20 mg/L.',
        ],
      },
    },

    // SEZIONE 5: Interpretazione Dosaggi
    interpretation: {
      title: 'Interpretazione Dosaggi e Range Terapeutici',
      content: {
        conceptsTitle: 'Principi Fondamentali TDM (Therapeutic Drug Monitoring):',
        concepts: [
          '<strong>Indice Terapeutico:</strong> Rapporto tra dose tossica e dose efficace. IT stretto (< 2) richiede TDM obbligatorio (digossina IT = 1.5, litio IT = 2, warfarin IT = 2).',
          '<strong>Variabilità Farmacocinetica:</strong> Variabilità inter-individuale PK può essere 10-20 volte (CYP2D6 metabolizzatori lenti vs rapidi). TDM compensa variabilità genetica, età, comorbidità, interazioni.',
          '<strong>Timing Prelievo:</strong> Cmin (valle, pre-dose) riflette steady state. Cmax (picco, 1-2h post-dose PO, fine infusione EV) per farmaci CDD. Timing errato → interpretazione invalida.',
          '<strong>Steady State:</strong> TDM valido solo a steady state (5 emivite). Digossina: attendere 7-10 giorni post-inizio. Fenitoina: attendere 7-14 giorni.',
        ],
        rangesTitle: 'Range Terapeutici Principali Farmaci:',
        ranges: [
          '<strong>Digossina:</strong> 0.8-2.0 ng/mL (insufficienza cardiaca), 0.5-1.0 ng/mL (fibrillazione atriale). Tossicità > 2.5 ng/mL (nausea, aritmie, xantopsia). PMID: 16470885 (JACC 2006).',
          '<strong>Vancomicina:</strong> AUC₀₋₂₄ target 400-600 mg·h/L (infezioni MRSA). Cmin 15-20 mg/L obsoleto (nefrotossicità). TDM AUC-based riduce AKI 30% vs Cmin-based. PMID: 32191793 (AJHP 2020).',
          '<strong>Gentamicina:</strong> Cmax 20-30 mg/L (infezioni gravi), Cmin < 1 mg/L (prevenzione nefrotossicità). Extended-interval dosing (5-7 mg/kg q24h) preferito. PMID: 9483199 (CID 1998).',
          '<strong>Fenitoina:</strong> 10-20 mg/L (adulti), 8-15 mg/L (bambini). Tossicità > 20 mg/L (atassia, nistagmo, sedazione). Cinetica Michaelis-Menten (saturabile) → piccoli ↑dose → grandi ↑concentrazione. PMID: 29383720 (Epilepsia 2018).',
          '<strong>Litio:</strong> 0.6-1.2 mEq/L (mania acuta 0.8-1.2, mantenimento 0.6-0.8). Tossicità > 1.5 mEq/L (tremore, poliuria, confusione). Prelievo 12h post-dose obbligatorio. PMID: 31046916 (Aust Prescr 2019).',
          '<strong>Teofillina:</strong> 5-15 mg/L (asma, BPCO). Tossicità > 20 mg/L (tachicardia, convulsioni). TDM essenziale (interazioni CYP1A2: fumo ↑clearance, fluorochinoloni ↓clearance). PMID: 7516885 (Ann Pharmacother 1994).',
        ],
        doseResponseTitle: 'Relazioni Dose-Risposta PK/PD:',
        doseResponse: [
          '<strong>Relazione Lineare:</strong> Maggioranza farmaci. ↑dose 2x → ↑concentrazione 2x. Dose adjustment proporzionale. Es: Amoxicillina, Paracetamolo (range sub-epatico).',
          '<strong>Cinetica Saturabile (Michaelis-Menten):</strong> Fenitoina, Acido Valproico alte dosi, Etanolo. ↑dose → ↑↑↑concentrazione (non-proporzionale). Piccoli aggiustamenti dose (10-20%) obbligatori. TDM frequente necessario.',
          '<strong>Farmaci Pro-drug:</strong> Clopidogrel, Codeine, Enalapril. Variabilità metabolismo CYP (CYP2C19, CYP2D6) → efficacia variabile. Genotipizzazione utile per non-responder (clopidogrel CYP2C19*2 *3 = poor metabolizer).',
          '<strong>Tolleranza/Tachifilassi:</strong> Nitrati (tolleranza 24h), Benzodiazepine (tolleranza settimane). Dose-escalation progressiva necessaria, ma rischio dipendenza/tossicità. Finestre drug-free (nitrati notturni) riducono tolleranza.',
        ],
        steadyStateTitle: 'Tempo Raggiungimento Steady State:',
        steadyState: [
          '<strong>Regola 5 Emivite:</strong> 97% steady state raggiunto dopo 5 × t½. Amoxicillina t½ = 1h → steady state 5h. Digossina t½ = 40h → steady state 8-10 giorni.',
          '<strong>Frazione Steady State:</strong> 1 t½ = 50%, 2 t½ = 75%, 3 t½ = 87.5%, 4 t½ = 93.75%, 5 t½ = 96.875%. TDM prima 5 t½ = interpretazione invalida (accumulo incompleto).',
          '<strong>Loading Dose Bypass:</strong> LD salta accumulo graduale. Raggiungimento Css immediato (1-2h post-infusione). Essenziale per farmaci lunga t½ in setting urgente (digossina FA rapida, vancomicina sepsi).',
        ],
        clinicalMonitoringTitle: 'Monitoraggio Clinico Integrato:',
        clinicalMonitoring: [
          '<strong>Efficacia Terapeutica:</strong> Non basare decisioni solo su livelli plasmatici. Valutare outcome clinici: risoluzione infezione (vancomicina), controllo ritmo (digossina), controllo crisi (fenitoina), stabilizzazione umore (litio).',
          '<strong>Tossicità:</strong> Sintomi tossicità spesso precedono livelli critici o insorgono anche in range terapeutico (hypersensitivity). Digossina: nausea, bradicardia, aritmie. Fenitoina: nistagmo, atassia, diplopia. Litio: tremore, poliuria, confusione.',
          '<strong>Comorbidità Impatto:</strong> Insufficienza renale (↓clearance aminoglicosidi, digossina, litio), insufficienza epatica (↓clearance fenitoina, teofillina), ipoalbuminemia (↑frazione libera fenitoina/valproico → tossicità anche se livello totale in range).',
          '<strong>Interazioni Farmacologiche:</strong> Inibitori/Induttori CYP450 alterano clearance. Farmaci nefrotossici (FANS, ACE-I) potenziano tossicità renale aminoglicosidi. TDM frequente con nuovi farmaci concomitanti.',
        ],
      },
    },

    // SEZIONE 6: Applicazioni Cliniche
    applications: {
      title: 'Applicazioni Cliniche e Scenari Speciali',
      content: {
        cardiologyTitle: 'Cardiologia:',
        cardiology: [
          '<strong>Digossina (Insufficienza Cardiaca/FA):</strong> Dosaggio: 0.125-0.25 mg QD PO. Aggiustamento renale obbligatorio (escrezione renale 60-70%). CKD 3: 0.125 mg QD. CKD 4-5: 0.0625-0.125 mg ogni 48h. TDM target 0.5-1.0 ng/mL (FA), 0.8-2.0 ng/mL (HF). Loading dose: 0.5-1 mg diviso 24h (0.5 mg → 0.25 mg 4-6h → 0.25 mg 4-6h). PMID: 31324494 (ESC 2019).',
          '<strong>Beta-Bloccanti (Post-IMA, HF):</strong> Metoprololo: 25-100 mg BID PO, target FC 55-70 bpm. Carvedilolo: 3.125 mg BID, up-titration bisettimanale a 25 mg BID (HF). Non aggiustamento renale necessario (metabolismo epatico). Cautela bradicardia/ipotensione. PMID: 28304219 (JACC 2017).',
          '<strong>Anticoagulanti Orali:</strong> Warfarin: target INR 2-3 (FA, TVP), 2.5-3.5 (valvole meccaniche). Dosaggio individualizzato (CYP2C9, VKORC1 polimorfismi). DOACs (Rivaroxaban, Apixaban, Edoxaban): aggiustamento CrCl-based. Rivaroxaban FA: 20 mg QD (CrCl > 50), 15 mg QD (CrCl 15-50). PMID: 29136338 (NEJM 2017).',
          '<strong>Diuretici (Edema, Ipertensione):</strong> Furosemide: 20-80 mg QD-BID PO, max 600 mg/die (edema refrattario). Risposta dose-dipendente ma ceiling effect (CKD avanzato richiede alte dosi). Monitorare K⁺, Na⁺, Mg²⁺. Tiazidici inefficaci eGFR < 30 mL/min. PMID: 21073363 (Circulation 2010).',
        ],
        infectiousDiseaseTitle: 'Malattie Infettive:',
        infectiousDisease: [
          '<strong>Beta-Lattamici (Infezioni Polmonari, Urinarie):</strong> Amoxicillina: 500-1000 mg TID PO. Amoxicillina-Clavulanato: 875/125 mg BID (comunità), 1000/125 mg TID (ospedalizzati). Piperacillina-Tazobactam: 4.5g Q6-8h EV (infezioni gravi), infusione prolungata 3-4h migliora T > MIC. CKD adjustment: ↓dose 25-50% o ↑intervallo Q12h. PMID: 30016777 (Lancet ID 2018).',
          '<strong>Vancomicina (MRSA):</strong> Dosaggio: 15-20 mg/kg Q8-12h EV (basato funzione renale). Loading dose: 25-30 mg/kg (max 3g) se sepsi/meningite. Target AUC₀₋₂₄ 400-600 mg·h/L (calcolato Bayesian modeling). CKD: Q24-48h basato Cmin. TDM obbligatorio (giorno 2-3). PMID: 32191793 (AJHP 2020).',
          '<strong>Aminoglicosidi (Pseudomonas, Gram-negativi MDR):</strong> Gentamicina/Tobramicina: 5-7 mg/kg Q24h EV (Extended-Interval Dosing). Amikacina: 15-20 mg/kg Q24h EV. Target Cmax/MIC > 8-10, Cmin < 1 mg/L. CKD: ↓dose 30-50% + intervallo Q36-48h. TDM obbligatorio. Riduce nefrotossicità vs dosaggio tradizionale Q8h. PMID: 25712872 (Int J Antimicrob Agents 2015).',
          '<strong>Fluorochinoloni (Infezioni Complicate):</strong> Levofloxacina: 500-750 mg QD PO/EV. Ciprofloxacina: 400 mg Q8-12h EV, 500-750 mg BID PO. Moxifloxacina: 400 mg QD PO/EV (no aggiustamento renale, eliminazione epatica/biliare). AUC/MIC > 125 target efficacia. Cautela: tendinopatie, QTc-prolongation, neuropatie. PMID: 22387849 (CID 2012).',
        ],
        nephrologyTitle: 'Nefrologia (CKD-Specific):',
        nephrology: [
          '<strong>Allopurinolo (Iperuricemia, Gotta):</strong> Dosaggio CKD-adjusted: eGFR > 60: 300 mg QD. eGFR 30-60: 200 mg QD. eGFR 15-30: 100 mg QD. eGFR < 15: 100 mg ogni 2-3 giorni. Metabolita attivo (ossipurinolo) eliminato renalmente → accumulo. Rischio DRESS syndrome aumentato CKD + HLA-B*5801 (Asiatici). PMID: 23992557 (Ann Rheum Dis 2014).',
          '<strong>Gabapentin (Dolore Neuropatico):</strong> Escrezione renale 100%. Aggiustamento obbligatorio: eGFR > 60: 300-600 mg TID. eGFR 30-60: 300 mg BID. eGFR 15-30: 300 mg QD. eGFR < 15: 300 mg ogni 48h. Post-dialisi supplementazione: 200-300 mg. PMID: 10348340 (Epilepsia 1999).',
          '<strong>Metformina (Diabete T2):</strong> Controindicato eGFR < 30 mL/min (rischio acidosi lattica). Cautela eGFR 30-45 (monitoraggio trimestrale renale). Dose max eGFR 30-45: 1000 mg/die. Sospendere temporaneamente pre-imaging contrasto (rischio AKI). PMID: 27585891 (Diabetes Care 2017).',
          '<strong>ACE-Inibitori/ARBs (CKD Proteinurica):</strong> Nefroprotettivi (↓proteinuria, ↓progressione CKD). Enalapril: 5-20 mg QD. Ramipril: 2.5-10 mg QD. Attesi ↑creatinina 20-30% post-inizio (accettabile). Sospendere se ↑creatinina > 30% o K⁺ > 5.5 mEq/L. Monitorare creatinina/K⁺ a 1-2 settimane post-inizio. PMID: 11794185 (NEJM 2001).',
        ],
        pediatricsTitle: 'Pediatria:',
        pediatrics: [
          '<strong>Paracetamolo (Febbre, Dolore):</strong> Neonati: 10-15 mg/kg Q6-8h PO/EV (max 60 mg/kg/die). Bambini: 15 mg/kg Q4-6h PO (max 75 mg/kg/die, max assoluto 4g/die). Adolescenti: 500-1000 mg Q4-6h PO (max 4g/die). Via rettale: assorbimento variabile (↑dose 30%). Epatotossicità dose-dipendente (↓glutatione epatico). PMID: 25898459 (Arch Dis Child 2016).',
          '<strong>Amoxicillina (Otite, Faringite, Polmonite):</strong> Dosaggio standard: 40-50 mg/kg/die diviso TID PO. Alte dosi (otite resistente, polmonite): 80-90 mg/kg/die diviso TID (max 3g/die). Neonati: 20-30 mg/kg/die diviso Q8-12h (clearance ridotta). Aggiustamento CrCl < 30: Q12h. PMID: 23995667 (Pediatrics 2013).',
          '<strong>Ibuprofene (Febbre, Dolore, Flogosi):</strong> Bambini > 6 mesi: 5-10 mg/kg Q6-8h PO (max 40 mg/kg/die, max assoluto 2400 mg/die). Controindicato < 6 mesi, disidratazione, CKD (rischio AKI). Cautela asma (broncocostrizione FANS-induced 10-20%). PMID: 27456082 (Pediatrics 2016).',
          '<strong>Caffeina Citrato (Apnea Prematurità):</strong> Loading dose: 20 mg/kg EV/PO (equivale 10 mg/kg caffeina base). Maintenance: 5-10 mg/kg QD. TDM target: 5-25 mg/L. Effetti: stimolazione centro respiratorio, ↑sensibilità CO₂, ↓apnee. Clearance ridotta neonati (t½ 100h neonati vs 5h adulti). PMID: 16818558 (Cochrane 2010).',
        ],
        specialPopulationsTitle: 'Popolazioni Speciali:',
        specialPopulations: [
          '<strong>Gravidanza:</strong> Categorie FDA abolite 2015 → sostituito da PLLR (Pregnancy Lactation Labeling Rule). Farmaci sicuri: Paracetamolo, Amoxicillina, Metildopa, Insulina. Farmaci controindicati: ACE-I/ARBs (teratogenicità renale), Warfarin (teratogenicità SNC), Isotretinoina (malformazioni cranio-facciali). PK modificata gravidanza: ↑Vd (↑acqua corporea), ↑clearance (↑GFR, ↑metabolismo CYP2D6/3A4). PMID: 25629635 (Obstet Gynecol 2015).',
          '<strong>Allattamento:</strong> Categorie Hale (L1-L5): L1 = sicuro, L5 = controindicato. Farmaci sicuri (L1-L2): Paracetamolo, Ibuprofene, Amoxicillina, Metformina, Insulina. Farmaci da evitare: Cloramfenicolo, Ergotamina, Litio (tossicità neonatale), Radiocontrasti (sospensione temporanea 24h). Rapporto latte/plasma farmaco-dipendente: farmaci lipofili, basso peso molecolare, non ionizzati concentrano in latte. PMID: 18348889 (Pediatrics 2013).',
          '<strong>Obesità (BMI > 30):</strong> Farmaci idrofili: dosaggio Total Body Weight (TBW). Farmaci lipofili: dosaggio Ideal Body Weight (IBW) o Adjusted Body Weight (ABW = IBW + 0.4 × [TBW - IBW]). Vancomicina: TBW-based (15-20 mg/kg TBW). Aminoglicosidi: ABW-based. Propofol: TBW-based (↑Vd adiposo). Enoxaparina profilassi: 40 mg QD (BMI < 40), 0.5 mg/kg QD (BMI > 40). PMID: 22386834 (Obes Surg 2013).',
          '<strong>Anziani (> 65 anni):</strong> ↓massa magra, ↓acqua corporea, ↑grasso → ↑Vd farmaci lipofili. ↓GFR (↓1 mL/min/anno post-40 anni), ↓clearance epatica (↓flusso, ↓CYP450). ↓albumina → ↑frazione libera farmaci legati proteine. Regola START/STOPP: iniziare basso, titolare lento ("start low, go slow"). Rischio polifarmacoterapia: cascata prescrittiva, interazioni, ADR. PMID: 31589804 (Age Ageing 2019).',
        ],
        emergencyTitle: 'Protocolli Emergenza:',
        emergency: [
          '<strong>Arresto Cardiaco (ACLS):</strong> Adrenalina: 1 mg EV Q3-5min (diluire 1:10000). Amiodarone: 300 mg EV bolo (FV/TV refrattaria), poi 150 mg EV. Atropina: 0.5-1 mg EV Q3-5min (bradicardia, max 3 mg). Lidocaina: 1-1.5 mg/kg EV bolo (TV stabile), infusione 1-4 mg/min. PMID: 29114008 (Circulation 2018).',
          '<strong>Anafilassi:</strong> Adrenalina: 0.3-0.5 mg IM (1:1000, coscia anterolaterale), ripetibile Q5-15min. Pediatrico: 0.01 mg/kg IM (max 0.3 mg < 30kg, 0.5 mg > 30kg). Corticosteroidi: Metilprednisolone 1-2 mg/kg EV. Antistaminici: Difenidramina 25-50 mg EV. Broncodilatatori: Salbutamolo 2.5-5 mg nebulizzato. PMID: 32492920 (JACI 2020).',
          '<strong>Status Epilepticus:</strong> Fase 1 (0-5 min): Benzodiazepine: Lorazepam 0.1 mg/kg EV (max 4 mg), o Diazepam 0.15-0.2 mg/kg EV, o Midazolam 10 mg IM. Fase 2 (5-20 min): Fenitoina 20 mg/kg EV (max 50 mg/min), o Valproato 40 mg/kg EV, o Levetiracetam 60 mg/kg EV. Fase 3 (> 20 min): Anestesia generale (Propofol, Midazolam, Pentobarbital). PMID: 27980175 (Lancet 2016).',
          '<strong>Overdose Paracetamolo:</strong> N-Acetilcisteina (NAC): protocollo 21h. Bolo: 150 mg/kg in 200 mL D5% EV 15-60 min. Infusione: 50 mg/kg in 500 mL D5% 4h, poi 100 mg/kg in 1000 mL D5% 16h. Nomogramma Rumack-Matthew: trattare se livello > 150 μg/mL (4h post-ingestion) o > 75 μg/mL (8h). NAC efficace fino 24-48h post-ingestion. PMID: 29211971 (Hepatology 2018).',
        ],
      },
    },

    // SEZIONE 7: Alert e Valori Critici
    alerts: {
      title: 'Alert Sicurezza e Valori Critici',
      content: {
        highAlertTitle: 'Farmaci High-Alert ISMP:',
        highAlert: [
          '<strong>Definizione ISMP:</strong> Farmaci con rischio aumentato di causare danni significativi/fatali se usati in errore. Richiedono doppio controllo infermieristico, protocolli standardizzati, TDM obbligatorio.',
          '<strong>Insulina:</strong> Errori dosaggio (UI vs mL), via somministrazione (EV vs SC), timing (prandiale vs basale). Ipoglicemia severa (< 40 mg/dL): convulsioni, coma, morte. Doppio controllo dose, uso pompe intelligenti, educazione paziente. PMID: 25411088 (Diabetes Care 2015).',
          '<strong>Eparina/EBPM:</strong> Errori dosaggio (unità vs mg), confusione eparina sodica (5000 UI/mL) vs eparina calcica (25000 UI/5mL). Sanguinamento maggiore 2-5%. Monitorare aPTT (eparina), anti-Xa (EBPM in obesità/CKD), piastrine (HIT). Antidoto: Protamina 1 mg/100 UI eparina. PMID: 28242155 (Chest 2016).',
          '<strong>Oppioidi:</strong> Depressione respiratoria dose-dipendente. Fentanyl 100 volte più potente morfina. Conversione oppioidi errata → overdose. Naloxone disponibile (0.4-2 mg EV/IM/SC, ripetibile Q2-3min). Cautela tolleranza (escalation dose) vs dipendenza. PMID: 29121001 (Cochrane 2017).',
          '<strong>Chemioterapici:</strong> Errori via somministrazione (vincristina intratecale = fatale), dose (mg vs mg/m²), frequenza. Tossicità ematologica (neutropenia, trombocitopenia), epatica, renale, cardiaca. Doppio controllo farmacista-oncologo, consenso informato, educazione effetti avversi. PMID: 31010833 (JCO 2019).',
          '<strong>Sedativi EV (Propofol, Midazolam, Dexmedetomidina):</strong> Depressione respiratoria, ipotensione, bradicardia. Propofol: dosaggio TBW-based, rischio PRIS (Propofol Infusion Syndrome: rabdomiolisi, acidosi, shock) se > 4 mg/kg/h > 48h. Monitoraggio continuo SpO₂, ECG, PA. Antidoti: Flumazenil (benzos 0.2 mg EV), supporto ventilatorio. PMID: 22281831 (Crit Care Med 2012).',
        ],
        contraindicationsTitle: 'Controindicazioni per Funzione Organo:',
        contraindications: [
          '<strong>CKD Severo (eGFR < 30):</strong> Controindicati: Metformina (acidosi lattica), Tiazidici (inefficaci), FANS (↑↑AKI), Nitrofurantoina (inefficace + neuropatia), Dabigatran (accumulo, sanguinamento). Cautela: Digossina (↑tossicità), Gabapentin (sedazione), Enoxaparina (sanguinamento). PMID: 26597926 (AJKD 2016).',
          '<strong>Insufficienza Epatica (Child-Pugh B-C):</strong> Evitare: Paracetamolo > 2g/die (epatotossicità), Clorpromazina (colestasi), Ketoconazolo (epatotossicità). Ridurre 50-75%: Propranololo, Morfina, Midazolam (↓clearance epatica, ↑encefalopatia). Cautela anticoagulanti: ↓sintesi fattori coagulazione → INR elevato anche senza farmaci. PMID: 23160978 (Hepatology 2014).',
          '<strong>Età Estremi (Neonati < 28 giorni):</strong> Evitare: Cloramfenicolo (Grey Baby Syndrome: collasso CV, morte), Tetracicline (discromia dentaria), Fluorochinoloni (artropatia sperimentale animale, ma usati off-label per MDR). ↓clearance renale/epatica → riduzione dose 50-75%, ↑intervallo Q12-24h. PMID: 24819451 (Neonatology 2014).',
          '<strong>Anziani > 75 anni (Criteri STOPP):</strong> Evitare: Benzodiazepine (cadute, delirium), Anticolinergici (confusione, ritenzione urinaria), FANS (GI bleeding, AKI), Antipsicotici (↑mortalità demenza). Preferire: Farmaci breve t½, basso potenziale anticolinergico. Regola "start low, go slow". PMID: 25324330 (Age Ageing 2015).',
        ],
        drugInteractionsTitle: 'Interazioni Farmacologiche Maggiori:',
        drugInteractions: [
          '<strong>Inibitori CYP450:</strong> Ketoconazolo, Eritromicina, Ritonavir, Fluconazolo, Diltiazem, Succo Pompelmo. ↓clearance substrati → accumulo, tossicità. Es: Simvastatina + Ketoconazolo → rabdomiolisi (↑40x concentrazione). Warfarin + Eritromicina → sanguinamento. Richiedere ↓dose substrato 50% o switch farmaco. PMID: 21677198 (Clin Pharmacokinet 2011).',
          '<strong>Induttori CYP450:</strong> Rifampicina, Fenitoina, Carbamazepina, Fenobarbital, Erba S.Giovanni. ↑clearance substrati → sottodosaggio, fallimento terapeutico. Es: Contraccettivi orali + Rifampicina → gravidanze indesiderate. Warfarin + Carbamazepina → ↓INR, trombosi. Richiedere ↑dose substrato 100-200% o switch. PMID: 12814450 (Drug Metab Rev 2003).',
          '<strong>QTc-Prolungation Drugs:</strong> Combinazione rischio Torsades de Pointes (aritmia ventricolare fatale). Farmaci alto rischio: Antiaritmici (Amiodarone, Sotalolo), Antipsicotici (Aloperidolo, Ziprasidone), Antibiotici (Macrolidi, Fluorochinoloni), Metadone. Evitare combinazione. Monitorare ECG (QTc > 500 msec = alto rischio). Correggere K⁺, Mg²⁺ (ipokaliemia/ipomagnesemia peggiorano). PMID: 29102187 (JACC 2017).',
          '<strong>Serotonina Syndrome:</strong> Combinazione farmaci serotoninergici: SSRI, SNRI, Tramadolo, Linezolid, IMAO, Triptani, Meperidina, Erba S.Giovanni. Sintomi: agitazione, tremore, ipertermia, ipertensione, mioclono, diarrea. Severo: rigidità, rabdomiolisi, convulsioni, DIC. Trattamento: sospensione farmaci, Ciproeptadina (antagonista 5-HT), supporto. Mortalità 2-12%. PMID: 24994558 (CNS Drugs 2014).',
          '<strong>Nefrotossicità Sinergica:</strong> Combinazioni rischio AKI: Aminoglicosidi + Vancomicina (↑↑nefrotossicità 30% vs singolo), FANS + ACE-I/ARBs + Diuretici ("tripla nefrotossicità"), Anfotericina + Ciclosporina. Monitorare creatinina daily in combinazioni. Idratazione adeguata, evitare ipovolemia. PMID: 27257005 (CJASN 2016).',
        ],
        overdoseTitle: 'Gestione Overdose Farmaci Comuni:',
        overdose: [
          '<strong>Paracetamolo:</strong> Sintomi: fase 1 (0-24h) nausea/vomito, fase 2 (24-72h) dolore ipocondrio destro/↑transaminasi, fase 3 (72-96h) insufficienza epatica fulminante. Trattamento: NAC obbligatorio (vedi protocollo 21h sezione Applicazioni). Nomogramma Rumack-Matthew guida trattamento. Epatotossicità dose-dipendente (> 150 mg/kg = rischio). Fattori rischio: alcolismo, CYP2E1 inducers, digiuno. PMID: 29211971 (Hepatology 2018).',
          '<strong>Oppioidi:</strong> Sintomi: triade depressione respiratoria (FR < 10), miosi puntiforme, depressione coscienza (GCS < 8). Trattamento: Naloxone 0.4-2 mg EV/IM/SC, ripetibile Q2-3min (max 10 mg). Infusione continua se necessario (2/3 dose risveglio/h). Attenzione: t½ naloxone (30-60 min) < t½ oppioidi (morfina 2-4h, metadone 15-60h) → ricaduta. Monitorare 4-6h post-naloxone. PMID: 24598215 (Cochrane 2014).',
          '<strong>Benzodiazepine:</strong> Sintomi: sedazione, confusione, atassia, depressione respiratoria (raro se monoterapia). Trattamento: Flumazenil 0.2 mg EV 30 sec, ripetibile Q1min (max 1 mg). Cautela: precipita convulsioni in dipendenti cronici o overdose mista (triciklici + benzos). Preferire supporto ventilatorio vs flumazenil in overdose miste. PMID: 22071849 (Cochrane 2011).',
          '<strong>Digossina:</strong> Sintomi: GI (nausea, vomito, anoressia), CV (bradicardia, BAV, aritmie ventricolari, bigeminismo), neurologici (confusione, xantopsia). Trattamento: Digoxin-Fab (Digibind): 1 fiala (40 mg) lega 0.6 mg digossina. Dose: (Livello ng/mL × Peso kg × 5.6) / 1000 = fiale. Indicazioni Fab: K⁺ > 5 mEq/L, aritmie minacciose, livello > 10 ng/mL. PMID: 19451409 (Heart 2009).',
          '<strong>Anticoagulanti:</strong> Warfarin: INR critico > 9 (sanguinamento maggiore). Trattamento: Vitamina K 10 mg EV lento (correzione 12-24h), PCC (Prothrombin Complex Concentrate, correzione immediata), plasma fresco congelato. DOACs (Rivaroxaban, Apixaban, Dabigatran): Antidoti specifici: Idarucizumab (Dabigatran, 5g EV), Andexanet alfa (anti-Xa DOACs, 400-800 mg EV). PMID: 26095746 (NEJM 2015).',
        ],
      },
    },

    // SEZIONE 8: Documentazione Clinica
    documentation: {
      title: 'Documentazione e Linee Guida',
      content: {
        internationalGuidelinesTitle: 'Linee Guida Internazionali:',
        internationalGuidelines: [
          '<strong>AIFA (Agenzia Italiana del Farmaco):</strong> Autorità regolatoria italiana. RCP (Riassunto Caratteristiche Prodotto) italiano, note AIFA (limiti prescrizione), determinazioni AIFA (approvazioni/revoche). Database: <em>https://farmaci.agenziafarmaco.gov.it</em>. Riferimento obbligatorio prescrizione Italia.',
          '<strong>EMA (European Medicines Agency):</strong> Agenzia europea farmaci. EPAR (European Public Assessment Report) per farmaci approvati UE. Linee guida PK pediatrica, geriatrica, CKD. Database: <em>https://www.ema.europa.eu</em>. Standard UE prescrizione, sperimentazione clinica.',
          '<strong>FDA (Food and Drug Administration):</strong> Agenzia USA farmaci. Prescribing Information (PI) dettagliato, Black Box Warnings, Safety Communications. MedWatch (farmacovigilanza). Database: <em>https://www.fda.gov/drugs</em>. Riferimento mondiale farmacologia clinica.',
          '<strong>BNF (British National Formulary):</strong> Formulario UK (NICE). Dosaggi adulti/pediatrici, aggiustamenti CKD/epatica, interazioni. Database: <em>https://bnf.nice.org.uk</em>. Aggiornamenti bimestrali, app disponibile. Standard UK prescrizione.',
          '<strong>WHO Essential Medicines List 2023:</strong> Lista OMS farmaci essenziali (core + complementary). Criteri: efficacia provata, sicurezza accettabile, costo-efficacia. Guida procurement paesi in via sviluppo. Database: <em>https://www.who.int/medicines/publications/essentialmedicines</em>.',
        ],
        renalDosingTitle: 'Database Aggiustamento Renale:',
        renalDosing: [
          '<strong>Kidney Disease Drug Database (NKF):</strong> Database completo aggiustamenti CKD/dialisi. Oltre 1000 farmaci. Categorie eGFR-based. Accesso: <em>https://www.kidney.org/professionals/kdoqi</em>. Subscription richiesta.',
          '<strong>GlobalRPH Renal Dosing:</strong> Calcolatori online gratuiti eGFR (CKD-EPI, MDRD, Cockcroft-Gault), aggiustamenti renali. Database: <em>https://globalrph.com/medcalcs/renal-dosing-calculator</em>. Molto utilizzato clinicamente.',
          '<strong>Lexicomp Renal Dosing:</strong> Database commerciale completo (subscription). Integrato EHR (Epic, Cerner). Aggiornamenti real-time, interazioni farmacologiche, compatibilità EV. Standard ospedaliero USA.',
          '<strong>UpToDate Drug Interactions/Dosing:</strong> Riferimento evidence-based. Monografie farmaci complete, dosaggi special populations. Peer-reviewed, aggiornamenti mensili. Subscription richiesta. Standard gold clinico worldwide.',
        ],
        pediatricFormulariesTitle: 'Formulari Pediatrici:',
        pediatricFormularies: [
          '<strong>Harriet Lane Handbook (Johns Hopkins):</strong> Manuale tascabile pediatria. Dosaggi farmaci età-based (neonati, lattanti, bambini, adolescenti). Formule cliniche, valori normali laboratorio. Edizione annuale. ISBN: 978-0323876988 (32nd ed, 2023).',
          '<strong>Pediatric Dosage Handbook (Lexicomp):</strong> Riferimento completo dosaggi pediatrici. Oltre 1000 farmaci, dosaggi mg/kg, aggiustamenti renali/epatici pediatrici. Edizione annuale. ISBN: 978-1591954071 (29th ed, 2023).',
          '<strong>Neofax (Neonatal Medications):</strong> Formulario neonatale (0-28 giorni). Dosaggi prematuri/neonati, diluizioni EV, compatibilità, farmacocinetica ontogenetica. Edizione annuale. ISBN: 978-1944453565 (2023 ed).',
          '<strong>BNF for Children (BNFC):</strong> Formulario pediatrico UK (NICE). Dosaggi età-based, unlicensed uses, interazioni. Database online: <em>https://bnfc.nice.org.uk</em>. Gratuito, app disponibile.',
        ],
        tdmProtocolsTitle: 'Protocolli TDM (Therapeutic Drug Monitoring):',
        tdmProtocols: [
          '<strong>Vancomycin AUC-based TDM:</strong> Consensus ASHP/IDSA/PIDS 2020. Target AUC₀₋₂₄ 400-600 mg·h/L. Bayesian modeling (software: InsightRx, DoseMeRx). Prelievi: 2 livelli (1 ora post-infusione + 1 pre-dose). Calcolo AUC via software. Riduce nefrotossicità 30% vs Cmin-based. PMID: 32191793.',
          '<strong>Aminoglicosides Hartford Nomogram:</strong> Extended-Interval Dosing (EID). Gentamicina/Tobramicina: 5-7 mg/kg Q24h. Amikacina: 15-20 mg/kg Q24h. Prelievo singolo (6-14h post-dose) → Hartford nomogram → Q24/Q36/Q48h. ↓nefrotossicità vs traditional Q8h. PMID: 9483199.',
          '<strong>Digoxin TDM:</strong> Prelievo: 6-8h post-dose (steady state dopo 7-10 giorni). Target: 0.5-1.0 ng/mL (FA), 0.8-2.0 ng/mL (HF). Interpretazione: considerare K⁺ (ipokaliemia ↑tossicità), funzione renale (accumulo CKD), interazioni (amiodarone, verapamil, chinidina ↑livelli 50-100%). PMID: 16470885.',
          '<strong>Phenytoin TDM:</strong> Prelievo: Cmin (pre-dose) a steady state (7-14 giorni). Target: 10-20 mg/L (totale), 1-2 mg/L (libero). Ipoalbuminemia: misurare livello libero (livello totale sottostima). Michaelis-Menten: aggiustamenti piccoli (25-50 mg). Calcolo dose: formula Mullen. PMID: 29383720.',
          '<strong>Lithium TDM:</strong> Prelievo: 12h post-dose obbligatorio (standardizzazione). Target: 0.6-1.2 mEq/L (acuto 0.8-1.2, mantenimento 0.6-0.8). Fattori confondenti: disidratazione, FANS, ACE-I, diuretici tiazidici (↑livelli). Monitorare creatinina, TSH (ipotiroidismo indotto litio), ECG (QTc). PMID: 31046916.',
        ],
        clinicalToolsTitle: 'Strumenti Clinici Decisionali:',
        clinicalTools: [
          '<strong>ClinCalc DrugStats:</strong> Database prescrizioni USA (Medicare). Top farmaci per categoria, dosaggi medi, costi. Calcolatori eGFR, dosaggi pediatrici, interazioni. Gratuito: <em>https://clincalc.com</em>.',
          '<strong>Medscape Drug Interaction Checker:</strong> Database interazioni gratuito. Input multipli farmaci → analisi interazioni (major, moderate, minor). Meccanismi (CYP450, PK/PD), raccomandazioni gestione. App mobile disponibile: <em>https://reference.medscape.com/drug-interactionchecker</em>.',
          '<strong>Epocrates:</strong> App mobile prescrizione (iOS/Android). Dosaggi adulti/pediatrici, aggiustamenti renali, interazioni, identificazione pillola. Versione free/paid. Standard USA prescrizione mobile.',
          '<strong>Micromedex (IBM Watson Health):</strong> Database evidence-based completo. Tossicologia, TDM, interazioni, aggiustamenti. Integrato EHR. Subscription richiesta. Standard ospedaliero worldwide.',
          '<strong>Lexicomp:</strong> Suite completa drug information. Database interazioni, compatibilità IV, dosaggi pediatrici/adulti, TDM. App mobile integrata EHR. Subscription richiesta. Standard clinico USA.',
        ],
      },
    },

    // SEZIONE 9: Riferimenti Scientifici
    bibliography: {
      title: 'Riferimenti Scientifici',
      content: {
        publicationsTitle: 'Pubblicazioni Fondamentali:',
        publications: [
          '<strong>Holford NHG, Anderson BJ.</strong> (2013). "A pharmacokinetic standard for babies and adults". <em>Journal of Pharmaceutical Sciences</em> 102(9):2941-2952. PMID: 23650116. Standard PK neonatale/pediatrico basato su maturazione allometrica.',
          '<strong>Kearns GL, et al.</strong> (2003). "Developmental pharmacology—drug disposition, action, and therapy in infants and children". <em>New England Journal of Medicine</em> 349(12):1157-1167. PMID: 13679531. Review completo farmacocinetica pediatrica ontogenetica.',
          '<strong>Matzke GR, Aronoff GR, et al.</strong> (2011). "Drug dosing consideration in patients with acute and chronic kidney disease—a clinical update from Kidney Disease: Improving Global Outcomes (KDIGO)". <em>Kidney International</em> 80(11):1122-1137. PMID: 21918498. Linee guida KDIGO aggiustamento dosaggio CKD.',
          '<strong>Rybak MJ, et al.</strong> (2020). "Therapeutic monitoring of vancomycin for serious methicillin-resistant Staphylococcus aureus infections: A revised consensus guideline". <em>American Journal of Health-System Pharmacy</em> 77(11):835-864. PMID: 32191793. Consensus TDM vancomicina AUC-based.',
          '<strong>Roberts JA, et al.</strong> (2014). "Individualised antibiotic dosing for patients who are critically ill: challenges and potential solutions". <em>The Lancet Infectious Diseases</em> 14(6):498-509. PMID: 24768475. PK/PD antibiotici in terapia intensiva.',
        ],
        guidelinesTitle: 'Linee Guida Internazionali:',
        guidelines: [
          '<strong>KDIGO 2012:</strong> Clinical Practice Guideline for Acute Kidney Injury. Aggiustamento dosaggio farmaci in AKI/CKD.',
          '<strong>FDA Guidance 2020:</strong> Pharmacokinetics in Patients with Impaired Renal Function. Standard regolatori farmacocinetica CKD.',
          '<strong>British National Formulary (BNF) 2023:</strong> Prescribing in Renal Impairment. Database completo aggiustamenti renali UK.',
          '<strong>Pediatric Dosage Handbook (Lexicomp) 2023:</strong> Dosaggi pediatrici evidence-based con riferimenti clinici.',
        ],
        onlineResources: {
          title: 'Risorse Online Affidabili:',
          kdigo: 'KDIGO Guidelines',
          fda: 'FDA Renal Impairment Guidance',
          bnf: 'British National Formulary',
          lexicomp: 'Pediatric Dosage Handbook',
        },
      },
    },
  },

  // 9. EMPTY STATE
  emptyState: 'Inserisci parametri paziente e farmaco per calcolare il dosaggio',

  // 10. DISCLAIMER
  disclaimer: {
    title: 'Disclaimer Medico-Legale:',
    text: 'Questo calcolatore fornisce stime iniziali basate su formule standardizzate. Le decisioni cliniche finali richiedono valutazione completa del paziente (anamnesi, esame obiettivo, esami ematochimici, imaging, comorbidità, interazioni farmacologiche). Per farmaci a stretto indice terapeutico (digossina, aminoglicosidi, vancomicina, antiepilettici, immunosoppressori), il TDM (Therapeutic Drug Monitoring) è OBBLIGATORIO. Consultare sempre linee guida ufficiali (AIFA/EMA/FDA), RCP (Riassunto Caratteristiche Prodotto), e letteratura peer-reviewed. In caso di dubbi, consulto specialistico (farmacologia clinica, nefrologia, pediatria) raccomandato.',
  },
};
