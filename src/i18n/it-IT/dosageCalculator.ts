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
    // SEZIONE 1: Farmacocinetica e Farmacodinamica
    pharmacokinetics: {
      title: 'Farmacocinetica e Farmacodinamica (PK/PD)',
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

    // SEZIONE 5: Riferimenti Scientifici
    bibliography: {
      title: 'Riferimenti Scientifici ScienceDirect',
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
