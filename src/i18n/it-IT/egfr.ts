/**
 * @file it-IT/egfr.ts
 * @description Traduzioni italiane per eGFR Calculator (estimated Glomerular Filtration Rate)
 * @author Vasile Chifeac
 * @created 2025-12-13
 * @modified 2025-12-13
 */

export default {
  // ============================================================
  // 1. TITOLI PRINCIPALI
  // ============================================================
  title: 'Calcolatore eGFR',
  subtitle: 'Calcolo del Filtrato Glomerulare Stimato per Staging CKD',

  // ============================================================
  // 2. INPUT PANEL
  // ============================================================
  inputPanel: {
    title: 'Parametri Paziente',
    creatinine: {
      label: 'Creatinina Sierica',
      unit: 'mg/dL',
      validation: 'Creatinina tra 0.1-20 mg/dL',
    },
    age: {
      label: 'Eta',
      unit: 'anni',
      validation: 'Eta tra 1-120 anni',
    },
    gender: {
      label: 'Sesso',
      validation: 'Selezionare il sesso',
      options: {
        male: 'Maschio',
        female: 'Femmina',
      },
    },
    race: {
      label: 'Etnia (opzionale per correzione)',
      options: {
        other: 'Altro',
        african: 'Afroamericano',
      },
    },
    formula: {
      label: 'Formula di Calcolo',
      options: {
        ckdepi: 'CKD-EPI (Raccomandato)',
        mdrd: 'MDRD',
      },
    },
  },

  // ============================================================
  // 3. BOTTONI
  // ============================================================
  buttons: {
    calculate: 'Calcola eGFR',
    reset: 'Reset Dati',
    compareFormulas: 'Confronta Formule',
  },

  // ============================================================
  // 4. RESULTS PANEL
  // ============================================================
  resultsPanel: {
    title: 'Risultati',
    result: {
      unit: 'mL/min/1.73m2',
      label: 'eGFR',
      formulaPrefix: 'Formula:',
    },
    ckdStageTitle: 'Stadio Malattia Renale Cronica:',
    renalFunctionTitle: 'Livello Funzione Renale:',
    comparisonTitle: 'Confronto Formule:',
  },

  // ============================================================
  // 5. CKD STAGES (Classificazione KDIGO)
  // ============================================================
  ckdStages: {
    stage1: {
      label: 'Stadio 1',
      description: 'Funzione renale normale',
      range: '>=90',
    },
    stage2: {
      label: 'Stadio 2',
      description: 'Lieve riduzione funzione renale',
      range: '60-89',
    },
    stage3a: {
      label: 'Stadio 3a',
      description: 'Moderata riduzione funzione renale',
      range: '45-59',
    },
    stage3b: {
      label: 'Stadio 3b',
      description: 'Moderata-severa riduzione',
      range: '30-44',
    },
    stage4: {
      label: 'Stadio 4',
      description: 'Severa riduzione funzione renale',
      range: '15-29',
    },
    stage5: {
      label: 'Stadio 5',
      description: 'Insufficienza renale terminale',
      range: '<15',
    },
  },

  // ============================================================
  // 6. SEZIONI NEWS-STYLE (9 Sezioni Obbligatorie)
  // ============================================================
  sections: {
    // SEZIONE 1: DEFINIZIONE E SIGNIFICATO CLINICO
    definition: {
      title: 'Definizione e Significato Clinico',
      content: {
        definitionLabel: 'Definizione:',
        definition:
          "Il <strong>Filtrato Glomerulare Stimato (eGFR)</strong> rappresenta la velocita con cui i reni filtrano il sangue, espressa in mL/min/1.73m2. E l'indicatore principale per valutare la funzione renale e diagnosticare la Malattia Renale Cronica (CKD).",
        clinicalSignificanceLabel: 'Significato Clinico:',
        clinicalSignificance: [
          '<strong>Screening CKD:</strong> Identifica precocemente la disfunzione renale prima dei sintomi',
          '<strong>Staging KDIGO:</strong> Classifica la severita della CKD (Stadi 1-5)',
          '<strong>Prognosi Cardiovascolare:</strong> eGFR <60 aumenta rischio eventi CV',
          '<strong>Decisioni Terapeutiche:</strong> Guida dosaggi farmaci, timing dialisi, eligibilita trapianto',
        ],
        note: {
          title: 'Nota Clinica:',
          text: 'eGFR e <strong>normalizzato per superficie corporea</strong> (1.73m2) -> usare per staging CKD. Per dosaggio farmaci, preferire <strong>CrCl (Cockcroft-Gault)</strong> non normalizzata.',
        },
      },
    },

    // SEZIONE 2: FISIOLOGIA DELLA FILTRAZIONE GLOMERULARE
    physiology: {
      title: 'Fisiologia della Filtrazione Glomerulare',
      content: {
        mechanismTitle: 'Meccanismo Fisiologico:',
        mechanismIntro:
          'La filtrazione glomerulare e il primo step della formazione urinaria, determinata da:',
        mechanisms: [
          '<strong>Pressione Idrostatica Glomerulare:</strong> Forza il plasma attraverso la membrana (55-60 mmHg)',
          '<strong>Pressione Oncotica Capsulare:</strong> Si oppone alla filtrazione per proteine plasmatiche (~30 mmHg)',
          '<strong>Pressione Capsulare Bowman:</strong> Contrasta filtrazione (~15 mmHg)',
          '<strong>Permeabilita Membrana:</strong> Selettivita per dimensione/carica (passa acqua, urea, creatinina; blocca proteine >69 kDa)',
        ],
        equationLabel: 'Equazione di Starling (GFR):',
        equation: 'GFR = Kf x [(Pgc - Pbc) - (?gc - ?bc)]',
        equationParams: [
          'Kf = Coefficiente di filtrazione (permeabilita x area)',
          'Pgc = Pressione idrostatica glomerulare capillare',
          'Pbc = Pressione capsula Bowman',
          '?gc = Pressione oncotica glomerulare',
          '?bc = Pressione oncotica capsula',
        ],
        determinantsTitle: 'Determinanti GFR:',
        determinants: [
          '<strong>Flusso Plasmatico Renale (RPF):</strong> ?RPF -> ?GFR (autoregolazione)',
          '<strong>Resistenza Arteriolare:</strong> Vasocostrizione afferente ?GFR, efferente ?GFR',
          '<strong>Numero Nefroni Funzionanti:</strong> Declino con eta (~1 mL/min/anno dopo 40 anni)',
          '<strong>Stato Idratazione:</strong> Disidratazione -> ?GFR (vasocostrizione renale)',
        ],
        note: {
          title: 'Fisiologia:',
          text: 'GFR normale giovane adulto: ~120 mL/min/1.73m2 (180 L/giorno filtrati). Declino fisiologico ~0.75-1 mL/min/anno dopo 40 anni. Riserva funzionale: nefroni residui compensano perdita fino ~60% (poi sintomi).',
        },
      },
    },

    // SEZIONE 3: COME SI CALCOLA eGFR
    calculation: {
      title: 'Come si Calcola eGFR',
      content: {
        methodsTitle: 'Metodi di Stima eGFR:',
        methods: [
          '<strong>CKD-EPI (Raccomandato):</strong> Equazione 2021 senza razza, accurata in range eGFR >60. Gold standard attuale KDIGO.',
          '<strong>MDRD (Storico):</strong> Sovrastima riduzione eGFR a valori bassi. Meno accurata in anziani/bambini.',
          '<strong>Schwartz (Pediatrico):</strong> Per bambini <18 anni, usa altezza al posto di eta.',
          '<strong>Cistatina C (Alternativa):</strong> Marcatore non influenzato da massa muscolare. Utile in sarcopenia/amputazioni.',
        ],
        whenToUseTitle: 'Quando Usare Formule Specifiche:',
        whenToUse: [
          '<strong>CKD-EPI:</strong> Screening CKD, monitoraggio progressione, decisioni cliniche generali',
          '<strong>MDRD:</strong> Solo per compatibilita storica (studi pre-2009). NON raccomandato KDIGO 2024.',
          '<strong>Cistatina C:</strong> Pazienti con massa muscolare anormale (cachessia, bodybuilder, amputati)',
          '<strong>Creatinina + Cistatina:</strong> Conferma diagnosi CKD quando eGFR borderline (45-60)',
        ],
        limitationsTitle: 'Limitazioni eGFR Basato su Creatinina:',
        limitations: [
          '<strong>Massa Muscolare:</strong> ?Muscoli -> ?Creatinina -> sottostima eGFR (bodybuilder)',
          '<strong>Dieta:</strong> Alto consumo carne rossa -> ?Creatinina temporanea',
          '<strong>Farmaci:</strong> Cimetidina, trimetoprim bloccano secrezione tubulare creatinina -> falso ?creatinina',
          '<strong>AKI:</strong> eGFR inaffidabile in danno renale acuto (creatinina non steady-state)',
        ],
        bestPractice: {
          title: 'Best Practice:',
          text: 'Per diagnosi CKD, richiedere <strong>2 misurazioni eGFR >3 mesi</strong> (escludere fluttuazioni transitorie). Se eGFR <60 con proteinuria -> conferma CKD. Se eGFR 45-60 senza proteinuria -> ripetere con cistatina C.',
        },
      },
    },

    // SEZIONE 4: FORMULE MATEMATICHE
    formula: {
      title: 'Formule CKD-EPI e MDRD',
      content: {
        ckdepiTitle: 'Formula CKD-EPI 2021 (Senza Razza):',
        ckdepiFormula:
          'eGFR = 141 x min(SCr/?, 1)<sup>?</sup> x max(SCr/?, 1)<sup>-1.209</sup> x 0.993<sup>Age</sup> x [1.012 se femmina]',
        ckdepiParameters: [
          '<strong>SCr:</strong> Creatinina sierica (mg/dL)',
          '<strong>?:</strong> 0.7 (femmina), 0.9 (maschio)',
          '<strong>?:</strong> -0.241 (femmina, SCr <=0.7), -0.302 (femmina, SCr >0.7), -0.302 (maschio, SCr <=0.9), -1.200 (maschio, SCr >0.9)',
          '<strong>Age:</strong> Eta in anni',
          '<strong>1.012:</strong> Correzione femmina (meno massa muscolare)',
        ],
        ckdepiNote:
          '<strong>Nota 2021:</strong> Rimozione fattore razza (1.159 per afroamericani) per equita sanitaria. Basata su studio NEJM 2021 (Inker et al.).',
        mdrdTitle: 'Formula MDRD (Storica):',
        mdrdFormula:
          'eGFR = 175 x SCr<sup>-1.154</sup> x Age<sup>-0.203</sup> x [0.742 se femmina] x [1.212 se afroamericano]',
        mdrdParameters: [
          '<strong>175:</strong> Costante calibrazione IDMS (isotope dilution mass spectrometry)',
          '<strong>-1.154:</strong> Esponente creatinina (relazione inversa con GFR)',
          '<strong>-0.203:</strong> Esponente eta (declino fisiologico)',
          '<strong>0.742:</strong> Correzione femmina (~25% meno massa muscolare)',
          '<strong>1.212:</strong> Correzione afroamericani (massa muscolare maggiore)',
        ],
        comparisonTitle: 'Confronto CKD-EPI vs MDRD:',
        comparison: [
          '<strong>Accuratezza:</strong> CKD-EPI piu accurata a eGFR >60 (MDRD sovrastima riduzione)',
          '<strong>Classificazione:</strong> CKD-EPI riduce del 30% diagnosi CKD Stadio 3 rispetto a MDRD (meno falsi positivi)',
          '<strong>Range Valido:</strong> CKD-EPI: 15-120 mL/min, MDRD: 15-90 mL/min',
          '<strong>Popolazione Studio:</strong> CKD-EPI: 8000 pazienti CKD + sani, MDRD: solo CKD',
        ],
        recommendation: {
          title: 'Raccomandazione KDIGO 2024:',
          text: 'Usare <strong>CKD-EPI 2021</strong> come standard per screening e staging CKD. MDRD mantenuta solo per compatibilita storica con trial clinici pre-2009.',
        },
      },
    },

    // SEZIONE 5: INTERPRETAZIONE RISULTATI
    interpretation: {
      title: 'Interpretazione Risultati e Staging CKD',
      content: {
        stagingTitle: 'Classificazione KDIGO 2024 (Kidney Disease: Improving Global Outcomes):',
        staging: [
          '<strong class="text-green">Stadio 1 (eGFR >=90):</strong> Funzione normale. Diagnosi CKD solo se proteinuria/ematuria/anomalie imaging presenti.',
          '<strong class="text-light-green">Stadio 2 (eGFR 60-89):</strong> Lieve riduzione. Screening annuale se diabete/ipertensione. Monitorare progressione.',
          '<strong class="text-orange">Stadio 3a (eGFR 45-59):</strong> Moderata riduzione. Valutare cause reversibili (disidratazione, farmaci). Iniziare nefroprotettori (ACE-i/ARB).',
          '<strong class="text-deep-orange">Stadio 3b (eGFR 30-44):</strong> Moderata-severa. Dosaggio farmaci renalmente escreti obbligatorio. Prevenire iperpotassiemia (dieta).',
          '<strong class="text-red">Stadio 4 (eGFR 15-29):</strong> Severa. Preparazione dialisi/trapianto. Educazione paziente opzioni RRT. Accesso vascolare.',
          '<strong class="text-purple">Stadio 5 (eGFR <15):</strong> ESRD (End-Stage Renal Disease). Dialisi o trapianto immediato. Gestione complicanze uremia.',
        ],
        albuminuriaTitle: 'Albuminuria e Prognosi (Staging Completo):',
        albuminuria: [
          '<strong>A1 (<30 mg/g):</strong> Normale. Rischio CV basso se eGFR >60.',
          '<strong>A2 (30-300 mg/g):</strong> Microalbuminuria. ?Rischio progressione CKD. Iniziare ACE-i/ARB.',
          '<strong>A3 (>300 mg/g):</strong> Macroalbuminuria. Alto rischio ESRD + eventi CV. Nefrologo urgente.',
        ],
        progressionTitle: 'Velocita Progressione CKD:',
        progression: [
          '<strong>Declino Normale:</strong> <1 mL/min/anno (invecchiamento fisiologico)',
          '<strong>Declino Lento:</strong> 1-5 mL/min/anno (CKD controllata, ACE-i efficace)',
          '<strong>Declino Rapido:</strong> >5 mL/min/anno (nefropatia attiva, glomerulonefrite, nefropatia diabetica scompensata)',
        ],
        alert: {
          title: 'ALERT CLINICO:',
          text: 'Se eGFR <60 + albumina >300 mg/g -> <strong>Alto rischio ESRD</strong>. Referral nefrologo entro 1 settimana. Iniziare ACE-i/ARB + SGLT2-i (se diabetico). Educare dialisi/trapianto.',
        },
      },
    },

    // SEZIONE 6: APPLICAZIONI CLINICHE
    applications: {
      title: 'Applicazioni Cliniche eGFR',
      content: {
        screeningTitle: 'Screening CKD (Popolazioni a Rischio):',
        screening: [
          '<strong>Diabete Tipo 1/2:</strong> eGFR + albuminuria annuale (rischio nefropatia diabetica 30-40%)',
          '<strong>Ipertensione:</strong> eGFR ogni 1-2 anni (nefrosclerosi ipertensiva)',
          '<strong>Eta >60 anni:</strong> Screening ogni 2-3 anni (declino fisiologico accelerato)',
          '<strong>Storia Familiare CKD:</strong> eGFR + ecografia renale (malattia policistica, Alport)',
          '<strong>Farmaci Nefrotossici:</strong> FANS cronici, chemioterapia (cisplatino), immunosoppressori',
        ],
        drugDosingTitle: 'Aggiustamento Dosaggio Farmaci:',
        drugDosing: [
          '<strong>Antibiotici:</strong> Penicilline, cefalosporine, aminoglicosidi, vancomicina (TDM obbligatorio se eGFR <30)',
          '<strong>Anticoagulanti:</strong> Enoxaparina (?50% se eGFR <30), dabigatran controindicato se eGFR <30',
          '<strong>Ipoglicemizzanti:</strong> Metformina (sospendere se eGFR <30), gliburide (?rischio ipoglicemia)',
          '<strong>Farmaci CV:</strong> Digoxina (?tossicita), spironolattone (?rischio iperpotassiemia)',
        ],
        contrastTitle: 'Contrasto Iodato (Prevenzione AKI da Contrasto):',
        contrast: [
          '<strong>eGFR >=60:</strong> Nessuna precauzione (rischio AKI <1%)',
          '<strong>eGFR 45-59:</strong> Idratazione IV salina 0.9% 1 mL/kg/h x 12h pre/post',
          '<strong>eGFR 30-44:</strong> Idratazione + minimizzare volume contrasto (<100 mL). Valutare N-acetilcisteina.',
          '<strong>eGFR <30:</strong> Evitare contrasto se possibile (RM senza gadolinio). Se urgente -> dialisi profilattica.',
        ],
        specialPopulationsTitle: 'Popolazioni Speciali:',
        specialPopulations: [
          '<strong>Anziani (>75 anni):</strong> eGFR sottostima GFR reale (?massa muscolare). Considerare cistatina C.',
          '<strong>Gravidanza:</strong> eGFR aumenta 40-50% (?GFR fisiologico). Usare valori riferimento gravidanza.',
          '<strong>Obesi (BMI >30):</strong> eGFR sovrastimata (creatinina diluita in volume distribuzione). Non normalizzare per BSA.',
          '<strong>Trapianto Renale:</strong> Target eGFR >40 a 1 anno post-trapianto. <30 -> rigetto cronico/nefrotossicita.',
        ],
      },
    },

    // SEZIONE 7: VALORI CRITICI E ALERT
    referenceValues: {
      title: 'Valori Critici e Alert Clinici',
      content: {
        normalRangesTitle: 'Range Normali per Eta:',
        normalRanges: [
          '<strong>20-29 anni:</strong> 116 +- 20 mL/min/1.73m2 (M), 107 +- 13 (F)',
          '<strong>30-39 anni:</strong> 107 +- 14 (M), 104 +- 11 (F)',
          '<strong>40-49 anni:</strong> 99 +- 13 (M), 94 +- 12 (F)',
          '<strong>50-59 anni:</strong> 93 +- 17 (M), 88 +- 13 (F)',
          '<strong>60-69 anni:</strong> 85 +- 21 (M), 78 +- 15 (F)',
          '<strong>70+ anni:</strong> 75 +- 17 (M), 67 +- 12 (F)',
        ],
        criticalThresholdsTitle: 'Soglie Critiche per Azione:',
        criticalThresholds: [
          '<strong class="text-orange">eGFR <60:</strong> Conferma CKD. Richiedere proteinuria/ecografia renale. Iniziare nefroprotettori.',
          '<strong class="text-deep-orange">eGFR <45:</strong> Referral nefrologo. Aggiustare dosaggi farmaci. Dieta ipoproteica (0.8 g/kg).',
          '<strong class="text-red">eGFR <30:</strong> Pre-dialisi. Creare accesso vascolare (fistola AV). Vaccinare epatite B. Educazione RRT.',
          '<strong class="text-purple">eGFR <15:</strong> Iniziare dialisi o trapianto. Sintomi uremia (nausea, prurito, edema). Gestione iperpotassiemia.',
        ],
        rapidDeclineTitle: 'Declino Rapido eGFR (Red Flags):',
        rapidDecline: [
          '<strong>?>5 mL/min/anno:</strong> Glomerulonefrite attiva, nefropatia lupica, vasculite ANCA+',
          '<strong>?>25% in 3 mesi:</strong> AKI sovrapposta, ostruzione ureterale, necrosi tubulare acuta',
          '<strong>?Improvviso + ematuria:</strong> Glomerulonefrite rapidamente progressiva -> biopsia renale urgente',
        ],
        contraindicationsTitle: 'Controindicazioni Farmaci per eGFR:',
        contraindications: [
          '<strong>eGFR <30:</strong> Metformina, FANS, nitrofurantoina, dabigatran, rivaroxaban',
          '<strong>eGFR <15:</strong> SGLT2-i (dapagliflozin), spironolattone (K+ >5.5 mEq/L), litio',
          '<strong>Dialisi:</strong> Evitare gabapentin (accumulo), aciclovir (neurotossicita), morfina (metabolita attivo)',
        ],
        emergencyAlert: {
          title: 'EMERGENZA NEFROLOGIA:',
          text: 'Se eGFR <15 + sintomi uremia (confusione, pericardite, edema polmonare) -> <strong>Dialisi urgente entro 24h</strong>. K+ >7 mEq/L -> trattamento immediato (calcio gluconato, insulina+glucosio, dialisi).',
        },
      },
    },

    // SEZIONE 8: DOCUMENTAZIONE CLINICA
    documentation: {
      title: 'Documentazione Clinica eGFR',
      content: {
        templateTitle: 'Template Documentazione CKD:',
        templateExample: `<strong>eGFR (CKD-EPI 2021):</strong> [valore] mL/min/1.73m2<br>
<strong>Parametri:</strong> Eta [X] anni, Sesso [M/F], Creatinina [Y] mg/dL<br>
<strong>Stadio CKD:</strong> [Stadio 1-5] - [descrizione]<br>
<strong>Albuminuria:</strong> [A1/A2/A3] - [valore] mg/g<br>
<strong>Trend eGFR:</strong> [?/?/stabile] [X] mL/min/anno<br>
<strong>Azioni Cliniche:</strong><br>
<ul>
  <li>[Farmaci aggiustati]: [dosaggio precedente] -> [nuovo dosaggio]</li>
  <li>[Nefroprotettori]: ACE-i/ARB [nome farmaco] [dose]</li>
  <li>[Follow-up]: Prossimo eGFR + albuminuria tra [X] mesi</li>
</ul>`,
        elementsTitle: 'Elementi da Documentare:',
        elements: [
          'Formula usata (CKD-EPI/MDRD) e data calcolo',
          'Trend eGFR ultimi 6-12 mesi (grafico se disponibile)',
          'Presenza proteinuria/ematuria/anomalie imaging',
          'Diagnosi CKD confermata (2 misurazioni >3 mesi)',
          'Farmaci nefrotossici sospesi o aggiustati',
          'Referral nefrologo (se eGFR <45 o declino >5 mL/min/anno)',
          'Educazione paziente (dieta, idratazione, evitare FANS)',
        ],
        kdigoGuidelinesTitle: 'Linee Guida KDIGO Follow-Up:',
        kdigoGuidelines: [
          '<strong>Stadio 1-2:</strong> Rivalutazione annuale (eGFR + albuminuria)',
          '<strong>Stadio 3a:</strong> Ogni 6 mesi + ecografia renale annuale',
          '<strong>Stadio 3b:</strong> Ogni 3 mesi + nefrologo ogni 6 mesi',
          '<strong>Stadio 4:</strong> Mensile + preparazione dialisi/trapianto',
          '<strong>Stadio 5:</strong> Settimanale in dialisi, mensile se conservativa',
        ],
      },
    },

    // SEZIONE 9: RIFERIMENTI SCIENTIFICI
    bibliography: {
      title: 'Riferimenti Scientifici',
      content: {
        publicationsTitle: 'Pubblicazioni Fondamentali:',
        publications: [
          '<strong>Levey AS, et al.</strong> (2009). A new equation to estimate glomerular filtration rate. <em>Ann Intern Med</em> 150(9):604-612. [PMID: 19414839] - CKD-EPI originale',
          '<strong>Inker LA, et al.</strong> (2021). New Creatinine- and Cystatin C-Based Equations to Estimate GFR without Race. <em>N Engl J Med</em> 385(19):1737-1749. [PMID: 34554658] - CKD-EPI 2021 senza razza',
          '<strong>KDIGO Guidelines.</strong> (2024). Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. <em>Kidney Int Suppl</em> 14(1):1-119. - Linee guida gold standard',
          '<strong>Stevens LA, Levey AS.</strong> (2009). Measured GFR as a confirmatory test for estimated GFR. <em>J Am Soc Nephrol</em> 20(11):2305-2313. [PMID: 19833901]',
        ],
        guidelinesTitle: 'Linee Guida Internazionali:',
        guidelines: [
          '<strong>KDIGO 2024:</strong> Kidney Disease: Improving Global Outcomes - Standard mondiale CKD',
          '<strong>NKF:</strong> National Kidney Foundation - Educazione paziente e staging',
          '<strong>ERA-EDTA:</strong> European Renal Association - Linee guida europee dialisi',
          '<strong>ASN:</strong> American Society of Nephrology - Ricerca e innovazione nefrologica',
        ],
        calculatorsTitle: 'Calcolatori Online Validati:',
        calculators: [
          '<strong>NKF GFR Calculator:</strong> https://www.kidney.org/professionals/kdoqi/gfr_calculator',
          '<strong>MDRD Study:</strong> https://www.mdrd.com/',
          '<strong>QxMD:</strong> App mobile per calcolo eGFR + dosaggio farmaci',
        ],
        educationalNote: {
          title: 'Nota Educativa:',
          content:
            'Questi riferimenti rappresentano pubblicazioni peer-reviewed ad alto impatto che validano le formule eGFR. Le equazioni CKD-EPI sono state validate su oltre <strong>8000 pazienti</strong> in studi multicentrici internazionali, dimostrando accuratezza superiore a MDRD. Rimangono il <strong>gold standard KDIGO</strong> per diagnosi e staging CKD.',
        },
      },
    },
  },

  // ============================================================
  // 7. QUICK REFERENCE CKD STAGES
  // ============================================================
  quickReference: {
    title: 'Classificazione Stadi CKD',
    stages: [
      '<span class="text-weight-bold text-green">Stadio 1:</span> >=90 - Funzione normale',
      '<span class="text-weight-bold text-light-green">Stadio 2:</span> 60-89 - Lieve riduzione',
      '<span class="text-weight-bold text-orange">Stadio 3a:</span> 45-59 - Moderata riduzione',
      '<span class="text-weight-bold text-deep-orange">Stadio 3b:</span> 30-44 - Moderata-severa',
      '<span class="text-weight-bold text-red">Stadio 4:</span> 15-29 - Severa riduzione',
      '<span class="text-weight-bold text-purple">Stadio 5:</span> <15 - ESRD (dialisi)',
    ],
  },

  // ============================================================
  // 8. DISCLAIMER MEDICO
  // ============================================================
  disclaimer: {
    title: 'Disclaimer Medico:',
    text: 'Questo calcolatore eGFR e uno strumento di supporto clinico. Non sostituisce il giudizio medico professionale. Per diagnosi CKD richiedere sempre conferma con 2 misurazioni >3 mesi + proteinuria.',
  },
};
