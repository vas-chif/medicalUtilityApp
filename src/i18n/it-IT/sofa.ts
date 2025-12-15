/**
 * @file it-IT/sofa.ts
 * @description Traduzioni italiane per SOFA Score Calculator (COMPLETO - Tutte le sezioni)
 * @author Vasile Chifeac
 * @created 2025-12-14
 * @completed 2025-12-14
 *
 * @references
 * - Vincent JL et al. (1996) "The SOFA score to describe organ dysfunction" ICM. PMID: 8863252
 * - Singer M et al. (2016) "Sepsis-3 Consensus Definitions" JAMA. PMID: 26903338
 */

export default {
  // === FASE 1: BREADCRUMB E TITOLO ===
  breadcrumbs: {
    home: 'Home',
    sofaScore: 'Score SOFA',
  },

  title: 'Calcolatore Score SOFA',
  subtitle:
    'Sequential Organ Failure Assessment - Valutazione della disfunzione multi-organo in terapia intensiva',

  // === FASE 2: BANNER + FORM ===
  banner: {
    title: 'SOFA Score:',
    description:
      "Sistema prognostico per valutare la gravita della disfunzione d'organo in pazienti critici. 6 sistemi d'organo, punteggio 0-4 ciascuno, totale 0-24 punti.",
  },

  form: {
    title: 'Parametri degli Organi',

    // Respirazione
    respiration: {
      label: 'Respirazione (PaO2/FiO2)',
      options: {
        ge400: 'maggiore o uguale a 400',
        lt400: 'minore di 400',
        lt300: 'minore di 300',
        lt200: 'minore di 200 con supporto respiratorio',
        lt100: 'minore di 100 con supporto respiratorio',
      },
    },

    // Coagulazione
    coagulation: {
      label: 'Coagulazione (Piastrine x10³/microL)',
      options: {
        ge150: 'maggiore o uguale a 150',
        lt150: 'minore di 150',
        lt100: 'minore di 100',
        lt50: 'minore di 50',
        lt20: 'minore di 20',
      },
    },

    // Fegato
    liver: {
      label: 'Fegato (Bilirubina mg/dL)',
      options: {
        lt1_2: 'minore di 1.2',
        range1_2_1_9: '1.2-1.9',
        range2_0_5_9: '2.0-5.9',
        range6_0_11_9: '6.0-11.9',
        ge12: 'maggiore o uguale a 12.0',
      },
    },

    // Cardiovascolare
    cardiovascular: {
      label: 'Cardiovascolare (MAP/Vasopressori)',
      options: {
        mapGe70: 'MAP maggiore o uguale a 70 mmHg',
        mapLt70: 'MAP minore di 70 mmHg',
        dopa5Dobut: 'Dopamina minore o uguale a 5 o Dobutamina qualsiasi dose',
        dopa5EpiNorepi01:
          'Dopamina maggiore di 5 O Epinefrina minore o uguale a 0.1 O Norepinefrina minore o uguale a 0.1',
        dopa15EpiNorepi01:
          'Dopamina maggiore di 15 O Epinefrina maggiore di 0.1 O Norepinefrina maggiore di 0.1',
      },
    },

    // Sistema Nervoso Centrale
    cns: {
      label: 'Sistema Nervoso Centrale (GCS)',
      options: {
        gcs15: 'GCS 15',
        gcs13_14: 'GCS 13-14',
        gcs10_12: 'GCS 10-12',
        gcs6_9: 'GCS 6-9',
        gcsLt6: 'GCS minore di 6',
      },
    },

    // Renale
    renal: {
      label: 'Renale (Creatinina mg/dL o Diuresi mL/giorno)',
      options: {
        lt1_2: 'minore di 1.2',
        range1_2_1_9: '1.2-1.9',
        range2_0_3_4: '2.0-3.4',
        range3_5_4_9: '3.5-4.9 o minore di 500 mL/giorno',
        ge5: 'maggiore o uguale a 5.0 o minore di 200 mL/giorno',
      },
    },

    resetButton: 'Reset',
  },

  // === FASE 3: RESULTS PANEL ===
  results: {
    title: 'Risultato Score SOFA',
    totalScoreLabel: 'Punteggio Totale',
    totalScoreRange: '(0-24)',

    mortalityRisk: {
      veryLow: 'Mortalita minore del 10%',
      low: 'Mortalita 15-20%',
      moderate: 'Mortalita 40-50%',
      high: "Mortalita maggiore dell'80%",
      veryHigh: 'Mortalita maggiore del 90%',
    },

    interpretation: {
      title: 'Interpretazione Clinica:',
      sofaPrefix: 'SOFA',
      mortalityRiskText: 'rischio di mortalita intraospedaliera.',
      serialMonitoring:
        "Monitoraggio seriale (ogni 24-48h) per valutare l'andamento. DeltaScore +2 punti indica deterioramento significativo.",
    },
  },

  // === FASE 4: SEZIONI ESPANDIBILI (1-3) ===
  sections: {
    // Sezione 1: Definition
    definition: {
      title: 'Definizione e Significato Clinico',

      // Historical Origin
      historicalOriginTitle: 'Origine Storica',
      historicalOriginParagraph1:
        'Lo <strong>Score SOFA (Sequential Organ Failure Assessment)</strong> è stato sviluppato nel <strong>1996</strong> da <strong>Jean-Louis Vincent e il Sepsis-related Organ Failure Assessment Working Group</strong> durante la conferenza di consenso della European Society of Intensive Care Medicine.',
      historicalOriginParagraph2:
        "<strong>Obiettivo originale:</strong> Creare un sistema semplice e oggettivo per descrivere e quantificare il grado di disfunzione d'organo nel tempo nei pazienti critici, in particolare quelli con sepsi.",

      keyCharacteristicsTitle: '<strong>Caratteristiche chiave:</strong>',
      keyCharacteristic1:
        "✅ Valuta <strong>6 principali sistemi d'organo</strong> indipendentemente",
      keyCharacteristic2:
        '✅ Ogni organo viene valutato <strong>0-4 punti</strong> in base alla gravità della disfunzione',
      keyCharacteristic3:
        '✅ Punteggio totale <strong>0-24 punti</strong> (maggiore = prognosi peggiore)',
      keyCharacteristic4:
        "✅ Può essere calcolato <strong>ripetutamente</strong> per monitorare l'andamento (delta SOFA)",
      keyCharacteristic5:
        '✅ Predittore validato di <strong>mortalità in terapia intensiva</strong> (AUROC 0.74-0.86)',

      // Clinical Applications
      clinicalApplicationsTitle: 'Applicazioni Cliniche',
      whenToUseTitle: '<strong>Quando usare:</strong>',
      whenToUseItem1:
        '📊 <strong>Triage in ammissione ICU:</strong> Punteggio SOFA basale per stratificazione della gravità',
      whenToUseItem2:
        '📈 <strong>Monitoraggio seriale:</strong> Punteggi SOFA giornalieri per rilevare deterioramento/miglioramento',
      whenToUseItem3:
        "🦠 <strong>Diagnosi di sepsi (Sepsis-3):</strong> SOFA ≥2 punti = criterio di disfunzione d'organo",
      whenToUseItem4:
        '🔬 <strong>Studi clinici:</strong> Misura standardizzata di gravità e predittore di outcome',
      whenToUseItem5:
        "💊 <strong>Decisioni terapeutiche:</strong> Guida per l'escalation/de-escalation delle cure intensive",

      whenNotToUseTitle: '<strong>Quando NON usare:</strong>',
      whenNotToUseItem1:
        '❌ <strong>Pazienti non in terapia intensiva:</strong> Non validato per popolazioni di reparto/PS',
      whenNotToUseItem2:
        '❌ <strong>Pediatria:</strong> Usare il Pediatric SOFA (pSOFA) o lo score PELOD invece',
      whenNotToUseItem3:
        '❌ <strong>Prognosi su singolo momento:</strong> Il Delta SOFA è più predittivo del SOFA basale da solo',
      whenNotToUseItem4:
        '❌ <strong>Unica guida terapeutica:</strong> Deve essere integrato con il giudizio clinico',

      limitationsTitle: '<strong>Limitazioni:</strong>',
      limitationItem1:
        "⚠️ NON cattura <strong>tutti i sistemi d'organo</strong> (es. gastrointestinale, immunologico, endocrino)",
      limitationItem2:
        '⚠️ Richiede <strong>dati di laboratorio accurati</strong> (possono essere ritardati o non disponibili)',
      limitationItem3:
        "⚠️ Confuso dalla <strong>disfunzione d'organo cronica</strong> (usare il SOFA basale se noto)",
      limitationItem4:
        '⚠️ Componente GCS inaffidabile in <strong>pazienti sedati</strong> (considerare valutazione senza sedazione)',
      limitationItem5:
        '⚠️ <strong>Non è un obiettivo terapeutico:</strong> Migliorare le cure ≠ migliorare direttamente il SOFA',
    },

    // Sezione 2: Organ Dysfunction
    organDysfunction: {
      title: "Fisiopatologia della Disfunzione d'Organo",

      pathophysiologicalMechanismsTitle: 'Meccanismi Fisiopatologici',

      // Respiration
      respirationTitle: '1️⃣ Respirazione (Rapporto PaO₂/FiO₂):',
      respirationItem1:
        '<strong>Rapporto P/F normale:</strong> ≥400 mmHg (scambio gassoso intatto)',
      respirationItem2:
        '<strong>Meccanismi di ipossiemia:</strong> Mismatch V/Q, shunt, alterazione della diffusione, ipoventilazione',
      respirationItem3:
        '<strong>Fisiopatologia ARDS:</strong> Danno della membrana alveolo-capillare → edema polmonare → disfunzione del surfattante',
      respirationItem4:
        '<strong>Criteri ARDS di Berlino:</strong> Lieve P/F 200-300, Moderata 100-200, Grave &lt; 100',
      respirationItem5:
        '<strong>Soglia critica:</strong> P/F &lt;100 con supporto respiratorio = SOFA 4 (ARDS profonda, mortalità >40%)',

      // Coagulation
      coagulationTitle: '2️⃣ Coagulazione (Piastrine):',
      coagulationItem1: '<strong>Piastrine normali:</strong> 150-400 ×10³/μL',
      coagulationItem2:
        '<strong>Cause di piastrinopenia in ICU:</strong> Coagulopatia da consumo (CID), soppressione midollare, diluizionale, immuno-mediata (HIT)',
      coagulationItem3:
        '<strong>Meccanismi della CID:</strong> Attivazione sistemica della cascata coagulativa → microtrombosi → consumo fattori della coagulazione/piastrine → sanguinamento + trombosi',
      coagulationItem4:
        '<strong>Rischio di sanguinamento:</strong> Piastrine &lt; 50K rischio significativo di sanguinamento spontaneo, &lt;20K critico (SOFA 4)',
      coagulationItem5:
        '<strong>Associata a sepsi:</strong> Piastrinopenia nel 30-50% dei pazienti settici, marcatore di gravità',

      // Liver
      liverTitle: '3️⃣ Fegato (Bilirubina):',
      liverItem1: '<strong>Bilirubina normale:</strong> &lt;1.2 mg/dL',
      liverItem2:
        '<strong>Meccanismi di iperbilirubinemia:</strong> Epatite ipossica, colestasi, alterata coniugazione/escrezione',
      liverItem3:
        '<strong>Fegato da shock:</strong> Danno ischemico acuto (necrosi centrilobulare Zona 3) → transaminasi ↑↑ (>1000 IU/L) + bilirubina ↑',
      liverItem4:
        '<strong>Colestasi:</strong> Alterato flusso biliare indotto da sepsi → iperbilirubinemia coniugata',
      liverItem5:
        '<strong>Insufficienza epatica:</strong> Bilirubina ≥12 mg/dL (SOFA 4) con coagulopatia/encefalopatia = prognosi infausta',

      // Cardiovascular
      cardiovascularTitle: '4️⃣ Cardiovascolare (MAP/Vasopressori):',
      cardiovascularItem1: '<strong>MAP normale:</strong> ≥70 mmHg (perfusione tissutale adeguata)',
      cardiovascularItem2:
        '<strong>Tipi di shock:</strong> Distributivo (settico), cardiogeno, ipovolemico, ostruttivo',
      cardiovascularItem3:
        '<strong>Fisiopatologia dello shock settico:</strong> Vasodilatazione (NO, citochine) + depressione miocardica + leak capillare → ipotensione + ↓apporto di O₂ ai tessuti',
      cardiovascularItem4:
        '<strong>Scala vasopressoria:</strong> Noradrenalina 1a linea → +Vasopressina → +Adrenalina → Alte dosi (SOFA 4 = shock refrattario)',
      cardiovascularItem5:
        "<strong>Soglia critica:</strong> MAP &lt;65 mmHg o vasopressori ad alte dosi = rischio di ipoperfusione d'organo",

      // CNS
      cnsTitle: '5️⃣ Sistema Nervoso Centrale (GCS):',
      cnsItem1: '<strong>Coscienza normale:</strong> GCS 15 (completamente sveglio, orientato)',
      cnsItem2:
        '<strong>Meccanismi di encefalopatia:</strong> Ipossia, ipoperfusione, tossine uremiche, encefalopatia epatica, delirium associato a sepsi',
      cnsItem3:
        '<strong>Confondimento da sedazione:</strong> GCS inaffidabile in pazienti sedati (considerare valutazione senza sedazione o escludere dal SOFA)',
      cnsItem4:
        '<strong>Coma (GCS &lt;6):</strong> SOFA 4 = disfunzione profonda del SNC, alta mortalità se non causa reversibile',

      // Renal
      renalTitle: '6️⃣ Renale (Creatinina/Diuresi):',
      renalItem1:
        '<strong>Creatinina normale:</strong> 0.6-1.2 mg/dL (varia in base a massa muscolare, età, sesso)',
      renalItem2:
        '<strong>Meccanismi di AKI:</strong> Pre-renale (ipoperfusione), renale intrinseca (NTA, GN), post-renale (ostruzione)',
      renalItem3:
        '<strong>AKI settica:</strong> Emodinamica (ipotensione) + infiammatoria (danno tubulare mediato da citochine) + disfunzione microvascolare',
      renalItem4:
        '<strong>Stadi KDIGO AKI:</strong> Stadio 1 (Cr 1.5-1.9× basale), Stadio 2 (2.0-2.9×), Stadio 3 (≥3× o ≥4 mg/dL o RRT)',
      renalItem5:
        '<strong>Oliguria/anuria:</strong> &lt;500 mL/giorno (SOFA 3), &lt;200 mL/giorno (SOFA 4) = AKI grave, probabile necessità di RRT',
    },

    // Sezione 3: How to Calculate
    howToCalculate: {
      title: 'Come Calcolare lo Score SOFA',

      calculationStepsTitle: 'Passaggi di Calcolo',

      // Step 1
      step1Title: '<strong>Passo 1: Raccogliere i Valori Peggiori (finestra 24h)</strong>',
      step1Item1:
        '📊 Usare il <strong>valore peggiore</strong> per ogni parametro nelle ultime 24 ore',
      step1Item2: '⏰ Per SOFA seriale: stessa ora ogni giorno (es. visite delle 08:00)',
      step1Item3:
        '🔍 Assicurare dati di laboratorio recenti: PaO₂, FiO₂, piastrine, bilirubina, creatinina',
      step1Item4: '💊 Documentare MAP e dosaggi vasopressori (noradrenalina, dopamina, adrenalina)',
      step1Item5:
        '🧠 Valutare GCS senza sedazione se possibile (o annotare influenza della sedazione)',
      step1Item6: '💧 Calcolare diuresi nelle 24h (totale mL/24h)',

      // Step 2
      step2Title: '<strong>Passo 2: Valutare Ogni Organo (0-4 punti)</strong>',
      step2Item1: '<strong>Respirazione:</strong> Calcolare rapporto PaO₂/FiO₂ → Punteggio 0-4',
      step2Item2: '<strong>Coagulazione:</strong> Conteggio piastrine ×10³/μL → Punteggio 0-4',
      step2Item3: '<strong>Fegato:</strong> Bilirubina mg/dL → Punteggio 0-4',
      step2Item4: '<strong>Cardiovascolare:</strong> MAP e/o dosi vasopressori → Punteggio 0-4',
      step2Item5: '<strong>SNC:</strong> Miglior GCS nelle 24h → Punteggio 0-4',
      step2Item6:
        '<strong>Renale:</strong> Creatinina mg/dL O diuresi → Punteggio 0-4 (usare il peggiore)',

      // Step 3
      step3Title: '<strong>Passo 3: Sommare Tutti i 6 Punteggi degli Organi</strong>',
      step3Item1:
        '🧮 <strong>Punteggio SOFA Totale</strong> = Respirazione + Coagulazione + Fegato + Cardiovascolare + SNC + Renale',
      step3Item2: '📈 <strong>Intervallo:</strong> 0-24 punti (minimo 0, massimo 24)',
      step3Item3:
        '📝 <strong>Documentazione:</strong> Registrare punteggi dei singoli organi + totale (es. "SOFA 12: R3 C2 L1 CV4 SNC1 Re1")',

      // Step 4
      step4Title: '<strong>Passo 4: Calcolare Delta SOFA (se misurazioni seriali)</strong>',
      step4Item1: 'Δ<strong>SOFA</strong> = SOFA(attuale) - SOFA(basale o precedente)',
      step4Item2:
        '📊 <strong>Interpretazione:</strong> ΔSOFA ≥+2 punti = deterioramento significativo (10% ↑ mortalità per punto)',
      step4Item3:
        "📉 <strong>Miglioramento:</strong> ΔSOFA negativo = recupero della funzione d'organo (prognosi favorevole)",
      step4Item4:
        "🦠 <strong>Definizione Sepsis-3:</strong> Infezione + ΔSOFA ≥2 = Sepsi (disfunzione d'organo)",

      // Special Considerations
      specialConsiderationsTitle: 'Considerazioni Speciali',

      respirationConsiderationsTitle: '🫁 Respirazione (PaO₂/FiO₂):',
      respirationConsiderationsItem1:
        '<strong>Calcolare rapporto P/F:</strong> PaO₂ (mmHg) / FiO₂ (decimale, es. 0.40 per ossigeno 40%)',
      respirationConsiderationsItem2:
        '<strong>Esempio:</strong> PaO₂ 80 mmHg con FiO₂ 0.50 → P/F = 80/0.50 = 160 → SOFA 3',
      respirationConsiderationsItem3:
        '<strong>Supporto respiratorio:</strong> Punteggi 3-4 richiedono supporto ventilatorio (ventilazione meccanica, CPAP, flusso elevato)',
      respirationConsiderationsItem4:
        '<strong>Se nessun ABG:</strong> Usare rapporto SpO₂/FiO₂ come surrogato (meno preciso)',

      cardiovascularConsiderationsTitle: '💊 Cardiovascolare (Vasopressori):',
      cardiovascularConsiderationsItem1:
        '<strong>Dosi in μg/kg/min:</strong> Dopamina, dobutamina, adrenalina, noradrenalina',
      cardiovascularConsiderationsItem2:
        '<strong>Durata:</strong> Somministrato per ≥1 ora per essere conteggiato',
      cardiovascularConsiderationsItem3:
        "<strong>Combinazione:</strong> Se multipli vasopressori → usare l'agente con punteggio più alto",
      cardiovascularConsiderationsItem4:
        '<strong>MAP senza vasopressori:</strong> Se MAP &lt;70 mmHg senza farmaci → SOFA 1',

      cnsConsiderationsTitle: '🧠 SNC (Scala del Coma di Glasgow):',
      cnsConsiderationsItem1:
        '<strong>Miglior GCS nelle 24h:</strong> Usare il GCS più alto osservato (evitare periodi di sedazione se possibile)',
      cnsConsiderationsItem2:
        '<strong>Influenza sedazione:</strong> Se pesantemente sedato per tutte le 24h → considerare esclusione SNC dal SOFA o annotare limitazione',
      cnsConsiderationsItem3:
        '<strong>Pazienti intubati:</strong> Impossibile valutare componente verbale → usare solo E + M (GCS max 10)',

      renalConsiderationsTitle: '💧 Renale (Creatinina O Diuresi):',
      renalConsiderationsItem1:
        '<strong>Usare il PEGGIORE dei due:</strong> Creatinina mg/dL O diuresi mL/giorno',
      renalConsiderationsItem2:
        '<strong>Creatinina basale:</strong> Se malattia renale cronica nota → adattare interpretazione (usare ΔSOFA renale)',
      renalConsiderationsItem3:
        '<strong>Pazienti in RRT:</strong> In dialisi → automaticamente SOFA 4 per componente renale',
    },

    // === FASE 5: SEZIONI 4-6 ===
    // Sezione 4: Formula and Scoring
    formulaScoring: {
      title: 'Formula e Tabelle di Punteggio',

      formulaTitle: 'Formula Score SOFA',
      formula: 'SOFA = Respirazione + Coagulazione + Fegato + Cardiovascolare + SNC + Renale',
      formulaSubtitle: 'Ogni organo valutato 0-4 punti → Intervallo totale 0-24 punti',

      detailedTablesTitle: 'Tabelle di Punteggio Dettagliate',

      // Table Headers (common)
      tableHeaderScore: 'Punteggio',
      tableHeaderInterpretation: 'Interpretazione Clinica',

      // Respiration Table
      respirationTableTitle: '🫁 Respirazione (PaO₂/FiO₂ mmHg):',
      respirationTableHeader: 'Rapporto PaO₂/FiO₂',
      respiration0: '≥400',
      respiration0Interp: 'Ossigenazione normale',
      respiration1: '&lt;400',
      respiration1Interp: 'Ipossiemia lieve',
      respiration2: '&lt;300',
      respiration2Interp: 'Ipossiemia moderata (ARDS Lieve)',
      respiration3: '&lt;200 + ventilazione',
      respiration3Interp: 'Ipossiemia grave (ARDS Moderata)',
      respiration4: '&lt;100 + ventilazione',
      respiration4Interp: 'ARDS Profonda (Grave)',

      // Coagulation Table
      coagulationTableTitle: '🩸 Coagulazione (Piastrine ×10³/μL):',
      coagulationTableHeader: 'Conta Piastrine',
      coagulation0: '≥150',
      coagulation0Interp: 'Coagulazione normale',
      coagulation1: '&lt;150',
      coagulation1Interp: 'Piastrinopenia lieve',
      coagulation2: '&lt;100',
      coagulation2Interp: 'Piastrinopenia moderata',
      coagulation3: '&lt;50',
      coagulation3Interp: 'Grave (rischio sanguinamento)',
      coagulation4: '&lt;20',
      coagulation4Interp: 'Critica (sanguinamento spontaneo)',

      // Liver Table
      liverTableTitle: '🟡 Fegato (Bilirubina mg/dL):',
      liverTableHeader: 'Bilirubina',
      liver0: '&lt;1.2',
      liver0Interp: 'Funzione epatica normale',
      liver1: '1.2-1.9',
      liver1Interp: 'Iperbilirubinemia lieve',
      liver2: '2.0-5.9',
      liver2Interp: 'Ittero moderato',
      liver3: '6.0-11.9',
      liver3Interp: 'Disfunzione epatica grave',
      liver4: '≥12.0',
      liver4Interp: 'Insufficienza epatica',

      // Cardiovascular Table
      cardiovascularTableTitle: '❤️ Cardiovascolare (MAP/Vasopressori):',
      cardiovascularTableHeader: 'MAP o Dosi Vasopressori',
      cardiovascular0: 'MAP ≥70 mmHg',
      cardiovascular1: 'MAP &lt;70 mmHg',
      cardiovascular2: 'Dopamina ≤5 O Dobutamina (qualsiasi)',
      cardiovascular3: 'Dopamina >5 O Epi ≤0.1 O Norepi ≤0.1 (μg/kg/min)',
      cardiovascular4: 'Dopamina >15 O Epi >0.1 O Norepi >0.1 (μg/kg/min)',

      // CNS Table
      cnsTableTitle: '🧠 SNC (Scala del Coma di Glasgow):',
      cnsTableHeader: 'GCS',
      cns0: '15',
      cns0Interp: 'Completamente sveglio e orientato',
      cns1: '13-14',
      cns1Interp: 'Alterazione lieve stato mentale',
      cns2: '10-12',
      cns2Interp: 'Confusione/sonnolenza moderata',
      cns3: '6-9',
      cns3Interp: 'Coma grave (localizza dolore)',
      cns4: '&lt;6',
      cns4Interp: 'Coma profondo (nessuna risposta)',

      // Renal Table
      renalTableTitle: '💧 Renale (Creatinina mg/dL O Diuresi):',
      renalTableHeader: 'Creatinina O Diuresi',
      renal0: '&lt;1.2 mg/dL',
      renal1: '1.2-1.9 mg/dL',
      renal2: '2.0-3.4 mg/dL',
      renal3: '3.5-4.9 mg/dL O &lt;500 mL/giorno',
      renal4: '≥5.0 mg/dL O &lt;200 mL/giorno O RRT',

      // Delta SOFA Section
      deltaSofaTitle: 'Calcolo Delta SOFA (ΔSOFA)',
      deltaSofaFormula: 'ΔSOFA = SOFA(attuale) - SOFA(basale)',
      deltaSofaItem1:
        '<strong>Basale:</strong> Primo punteggio SOFA all’ammissione in ICU O baseline pre-malattia se nota',
      deltaSofaItem2:
        '<strong>ΔSOFA ≥+2:</strong> Criterio di sepsi (definizione Sepsis-3), 10% aumento mortalità per punto',
      deltaSofaItem3:
        '<strong>ΔSOFA negativo:</strong> Miglioramento funzione d’organo (traiettoria favorevole)',
      deltaSofaItem4:
        '<strong>ΔSOFA +3-4:</strong> Deterioramento clinico significativo, rivalutare trattamento',
    },

    // Sezione 5: Clinical Interpretation
    clinicalInterpretation: {
      title: 'Interpretazione Clinica e Predizione di Mortalita',

      mortalityRiskTitle: 'Stratificazione del Rischio di Mortalit\u00e0',

      // Risk Level 1 (0-6)
      riskLevel1Chip: 'SOFA 0-6: Rischio Basso',
      riskLevel1Mortality:
        '<strong>Rischio di mortalit\u00e0:</strong> &lt;10-15% mortalit\u00e0 intraospedaliera',
      riskLevel1Status:
        "<strong>Stato clinico:</strong> Disfunzione d'organo lieve o coinvolgimento di un singolo organo",
      riskLevel1Course:
        '<strong>Decorso ICU:</strong> Tipicamente degenza ICU pi\u00f9 breve, buon potenziale di recupero',
      riskLevel1Management:
        '<strong>Gestione:</strong> Cure standard in ICU, monitorare per deterioramento',

      // Risk Level 2 (7-9)
      riskLevel2Chip: 'SOFA 7-9: Rischio Moderato',
      riskLevel2Mortality:
        '<strong>Rischio di mortalit\u00e0:</strong> 15-20% mortalit\u00e0 intraospedaliera',
      riskLevel2Status: '<strong>Stato clinico:</strong> Disfunzione multi-organo moderata',
      riskLevel2Course:
        '<strong>Decorso ICU:</strong> Degenza ICU prolungata probabile, richiede monitoraggio stretto',
      riskLevel2Management:
        '<strong>Gestione:</strong> Supporto aggressivo degli organi, monitoraggio SOFA giornaliero',

      // Risk Level 3 (10-12)
      riskLevel3Chip: 'SOFA 10-12: Rischio Alto',
      riskLevel3Mortality:
        '<strong>Rischio di mortalit\u00e0:</strong> 40-50% mortalit\u00e0 intraospedaliera',
      riskLevel3Status: '<strong>Stato clinico:</strong> Insufficienza multi-organo grave',
      riskLevel3Course:
        '<strong>Decorso ICU:</strong> Degenza ICU molto prolungata, gestione complessa',
      riskLevel3Management:
        '<strong>Gestione:</strong> Massimo supporto degli organi, considerare terapie avanzate (ECMO, RRT, ecc.)',

      // Risk Level 4 (13-14)
      riskLevel4Chip: 'SOFA 13-14: Rischio Molto Alto',
      riskLevel4Mortality:
        '<strong>Rischio di mortalit\u00e0:</strong> 50-95% mortalit\u00e0 intraospedaliera',
      riskLevel4Status: "<strong>Stato clinico:</strong> Insufficienza multipla d'organo profonda",
      riskLevel4Course:
        '<strong>Decorso ICU:</strong> Terapia di salvataggio, prognosi estremamente infausta',
      riskLevel4Management:
        '<strong>Gestione:</strong> Massime risorse ICU, discussioni familiari sugli obiettivi di cura',

      // Risk Level 5 (\u226515)
      riskLevel5Chip: 'SOFA \u226515: Catastrofico',
      riskLevel5Mortality:
        '<strong>Rischio di mortalit\u00e0:</strong> >90% mortalit\u00e0 intraospedaliera',
      riskLevel5Status:
        '<strong>Stato clinico:</strong> Insufficienza multi-organo con prognosi estremamente infausta',
      riskLevel5Course: '<strong>Decorso ICU:</strong> Sopravvivenza estremamente rara',
      riskLevel5Management:
        '<strong>Gestione:</strong> Discussioni su cure palliative appropriate, sospensione cure pu\u00f2 essere considerata',

      // Delta SOFA Interpretation
      deltaSofaInterpretationTitle: 'Interpretazione Delta SOFA (\u0394SOFA)',
      deltaSofaItem1:
        '<strong>\u0394SOFA +1 punto:</strong> ~10% aumento del rischio di mortalit\u00e0 per punto di aumento',
      deltaSofaItem2:
        "<strong>\u0394SOFA \u2265+2 punti (entro 48h):</strong> Criterio Sepsis-3 per disfunzione d'organo. Deterioramento clinico significativo. Attiva protocolli bundle sepsi (antibiotici, rianimazione con fluidi, controllo fonte).",
      deltaSofaItem3:
        '<strong>\u0394SOFA +3-4 punti:</strong> Deterioramento grave, rivalutare diagnosi e trattamento. Considerare fonte di infezione mancata, organismi resistenti, complicazioni.',
      deltaSofaItem4:
        "<strong>\u0394SOFA negativo (in diminuzione):</strong> Miglioramento della funzione d'organo, traiettoria favorevole. Trattamento efficace, considerare de-escalation quando appropriato.",
      deltaSofaItem5:
        "<strong>\u0394SOFA plateau (invariato):</strong> Decorso statico, n\u00e9 miglioramento n\u00e9 peggioramento. Pu\u00f2 indicare disfunzione d'organo cronica o equilibrio terapeutico.",

      // Sepsis-3 Integration
      sepsis3Title: 'Integrazione Definizione Sepsis-3',
      sepsis3Definition:
        "<strong>Sepsi (Sepsis-3):</strong> Disfunzione d'organo pericolosa per la vita causata da risposta disregolata dell'ospite all'infezione",
      sepsis3Criteria:
        '<strong>Criteri:</strong> Infezione sospetta o documentata + <strong>\u0394SOFA \u22652 punti</strong>',
      sepsis3Baseline:
        "<strong>SOFA basale:</strong> Assumere 0 se nessuna disfunzione d'organo preesistente nota",
      sepsis3Shock:
        '<strong>Shock settico:</strong> Sepsi + necessit\u00e0 di vasopressori (MAP \u226565 mmHg) + lattato >2 mmol/L nonostante adeguata rianimazione con fluidi',
      sepsis3Mortality:
        '<strong>Mortalit\u00e0:</strong> Sepsi ~10%, Shock settico ~40% mortalit\u00e0 intraospedaliera',

      // Clinical Pearl
      clinicalPearlTitle: 'Perla Clinica:',
      clinicalPearlText:
        "Il monitoraggio seriale SOFA (giornaliero) \u00e8 PI\u00d9 predittivo del SOFA basale singolo. Un peggioramento del \u0394SOFA indica fallimento del trattamento o complicazioni. Un miglioramento del \u0394SOFA convalida l'efficacia del trattamento.",
    },

    // Sezione 6: Clinical Applications
    clinicalApplications: {
      title: 'Applicazioni Cliniche dello Score SOFA',

      primaryUsesTitle: 'Usi Clinici Primari',

      // 1. Sepsis Diagnosis
      use1Title: '1️⃣ Diagnosi di Sepsi e Stratificazione della Gravità (Sepsis-3)',
      use1Item1: '<strong>Screening:</strong> qSOFA (quick SOFA) ≥2 → attiva calcolo SOFA completo',
      use1Item2: "<strong>Diagnosi:</strong> Infezione + ΔSOFA ≥2 = Sepsi (disfunzione d'organo)",
      use1Item3:
        '<strong>Gravità:</strong> SOFA basale 0-6 (meno grave), 7-12 (moderata), ≥13 (grave)',
      use1Item4: '<strong>Shock settico:</strong> Sepsi + vasopressori + lattato >2 mmol/L',
      use1Item5:
        '<strong>Attivazione:</strong> SOFA ≥2 → iniziare bundle sepsi (bundle 1 ora: emocolture, antibiotici, rianimazione con fluidi)',

      // 2. ICU Triage
      use2Title: '2️⃣ Triage Ammissione ICU e Allocazione Posti Letto',
      use2Item1:
        '<strong>SOFA basale >10:</strong> Paziente ad alto rischio, richiede monitoraggio intensivo e risorse',
      use2Item2:
        '<strong>Allocazione risorse:</strong> Dare priorità ai posti ICU per SOFA >8 durante capacità limitata',
      use2Item3:
        '<strong>Criteri per step-down:</strong> SOFA in diminuzione a &lt;6 con trend stabile → considerare dimissione ICU a unità sub-intensiva',
      use2Item4:
        '<strong>Discussione prognosi:</strong> SOFA ≥15 → prognosi infausta, discutere obiettivi di cura con la famiglia',

      // 3. Serial Monitoring
      use3Title: '3️⃣ Monitoraggio Seriale e Rilevamento Deterioramento',
      use3Item1:
        '<strong>SOFA giornaliero:</strong> Calcolare alla stessa ora ogni giorno (es. giro mattutino ore 08:00)',
      use3Item2:
        '<strong>Analisi trend:</strong> Grafico SOFA nel tempo per visualizzare traiettoria (miglioramento vs peggioramento)',
      use3Item3:
        '<strong>Soglie di allerta:</strong> ΔSOFA ≥+2 in 24-48h → allerta clinica, rivalutare piano terapeutico',
      use3Item4:
        '<strong>Deterioramento organo-specifico:</strong> Monitorare punteggi singoli organi per identificare sistema in fallimento (es. SOFA renale 0→3 = nuovo AKI)',

      // 4. Clinical Trials
      use4Title: '4️⃣ Endpoint Studi Clinici e Ricerca',
      use4Item1:
        '<strong>Criteri inclusione:</strong> Molti trial sulla sepsi richiedono SOFA basale ≥2 o soglie specifiche per organo',
      use4Item2:
        '<strong>Outcome primario:</strong> ΔSOFA al giorno 7 o dimissione ICU usato come endpoint di efficacia',
      use4Item3:
        '<strong>Stratificazione:</strong> Randomizzare per categorie SOFA basale (es. &lt;8 vs ≥8) per bilanciare gravità',
      use4Item4:
        '<strong>Misura standardizzata:</strong> Permette confronto tra studi e istituzioni internazionali',

      // 5. Family Communication
      use5Title: '5️⃣ Comunicazione Prognostica con le Famiglie',
      use5Item1:
        '<strong>SOFA basale 8-12:</strong> "Il suo familiare ha disfunzione d\'organo moderata, rischio mortalità 15-50%, degenza ICU prolungata prevista"',
      use5Item2:
        '<strong>SOFA ≥15:</strong> "Insufficienza multi-organo catastrofica, mortalità >90%, discussioni su cure palliative appropriate"',
      use5Item3:
        '<strong>ΔSOFA in miglioramento:</strong> "Funzione d\'organo in recupero, trattamento efficace, prognosi favorevole"',
      use5Item4:
        '<strong>ΔSOFA in peggioramento:</strong> "Condizione in deterioramento nonostante il trattamento, necessario rivalutare obiettivi di cura"',

      // 6. Quality Metrics
      use6Title: '6️⃣ Metriche di Qualità e Performance ICU',
      use6Item1:
        '<strong>Mortalità aggiustata per gravità:</strong> Confrontare mortalità osservata vs prevista (Standardized Mortality Ratio)',
      use6Item2:
        '<strong>Benchmarking ICU:</strong> SOFA usato in modelli APACHE IV, SAPS 3 per aggiustamento gravità',
      use6Item3:
        '<strong>Predizione durata degenza:</strong> SOFA basale correla con LOS ICU e giorni di ventilazione meccanica',
      use6Item4:
        '<strong>Stratificazione rischio:</strong> Riportare outcome stratificati per categorie SOFA per miglioramento qualità',

      // qSOFA Section
      qsofaTitle: 'qSOFA (quick SOFA) - Strumento di Screening',
      qsofaPurpose:
        '<strong>Scopo:</strong> Screening rapido al letto del paziente per rischio sepsi (PS, reparto, pre-ospedaliero)',
      qsofaItem1:
        '<strong>Criteri (1 punto ciascuno):</strong> (1) Frequenza respiratoria ≥22/min, (2) Alterazione stato mentale (GCS &lt;15), (3) PAS ≤100 mmHg',
      qsofaItem2:
        '<strong>qSOFA ≥2:</strong> Screening positivo → calcolare SOFA completo, iniziare workup sepsi',
      qsofaItem3:
        '<strong>Vantaggi:</strong> Nessun test di laboratorio richiesto, valutazione rapida al letto (1 minuto)',
      qsofaItem4:
        '<strong>Limitazioni:</strong> Sensibilità inferiore rispetto a SOFA completo (più falsi negativi), non per diagnosi (solo screening)',
    },

    // === FASE 6: SEZIONI 7-9 + FOOTER ===
    // Sezione 7: Reference Values
    referenceValues: {
      title: 'Valori di Riferimento e Allerte Critiche',

      organThresholdsTitle: 'Soglie Critiche Organo-Specifiche',

      // Respiration
      respirationTitle: '🫁 Respirazione:',
      respirationItem1:
        '<strong>Rapporto P/F normale:</strong> ≥400 mmHg (aria ambiente o minimo O₂ supplementare)',
      respirationItem2: '<strong>ARDS lieve:</strong> P/F 200-300 (SOFA 2, ipossiemia moderata)',
      respirationItem3:
        '<strong>ARDS moderata:</strong> P/F 100-200 (SOFA 3, ipossiemia grave, richiede ventilazione)',
      respirationItem4:
        '<strong>ARDS grave:</strong> P/F &lt;100 (SOFA 4, ipossiemia refrattaria, considerare ECMO, proning, manovre reclutamento)',
      respirationItem5:
        '<strong>⚠️ ALLERTA:</strong> P/F &lt;100 nonostante ventilazione ottimale → terapie di salvataggio (ECMO, posizione prona, NO inalato)',

      // Coagulation
      coagulationTitle: '🩸 Coagulazione:',
      coagulationItem1: '<strong>Piastrine normali:</strong> 150-400 ×10³/μL',
      coagulationItem2:
        '<strong>Trombocitopenia moderata:</strong> 50-100K (SOFA 2-3, monitorare rischio emorragico)',
      coagulationItem3:
        '<strong>Trombocitopenia grave:</strong> &lt;50K (SOFA 3, trasfusione piastrinica profilattica se procedure/sanguinamento)',
      coagulationItem4:
        '<strong>Trombocitopenia critica:</strong> &lt;20K (SOFA 4, rischio sanguinamento spontaneo, trasfusione piastrinica urgente)',
      coagulationItem5:
        '<strong>⚠️ ALLERTA:</strong> Piastrine &lt;20K + sanguinamento attivo → trasfusione emergente, considerare workup CID (PT/PTT, fibrinogeno, D-dimero)',

      // Liver
      liverTitle: '🟡 Fegato:',
      liverItem1: '<strong>Bilirubina normale:</strong> &lt;1.2 mg/dL',
      liverItem2:
        '<strong>Iperbilirubinemia moderata:</strong> 2-6 mg/dL (SOFA 2, ittero visibile)',
      liverItem3:
        '<strong>Disfunzione epatica grave:</strong> 6-12 mg/dL (SOFA 3, considerare rischio encefalopatia epatica)',
      liverItem4:
        '<strong>Insufficienza epatica:</strong> ≥12 mg/dL (SOFA 4, controllare coagulazione, ammonio, considerare valutazione trapianto fegato)',
      liverItem5:
        '<strong>⚠️ ALLERTA:</strong> Bilirubina ≥12 + INR >2.0 + encefalopatia → insufficienza epatica acuta, consulto epatologico urgente',

      // Cardiovascular
      cardiovascularTitle: '❤️ Cardiovascolare:',
      cardiovascularItem1: '<strong>MAP normale:</strong> ≥70 mmHg senza vasopressori',
      cardiovascularItem2:
        '<strong>Ipotensione:</strong> MAP &lt;70 mmHg (SOFA 1, rianimazione con fluidi)',
      cardiovascularItem3:
        '<strong>Vasopressori basso dosaggio:</strong> Dopamina ≤5 o dobutamina (SOFA 2)',
      cardiovascularItem4:
        '<strong>Vasopressori dosaggio moderato:</strong> Dopamina >5 o epi/norepi basso dosaggio (SOFA 3, shock settico)',
      cardiovascularItem5:
        '<strong>Vasopressori alto dosaggio:</strong> Dopamina >15 o epi/norepi alto dosaggio (SOFA 4, shock refrattario)',
      cardiovascularItem6:
        '<strong>⚠️ ALLERTA:</strong> SOFA CV 4 (shock refrattario) → escludere tamponamento, pneumotorace iperteso, EP, considerare ECMO, steroidi stress-dose',

      // CNS
      cnsTitle: '🧠 SNC:',
      cnsItem1: '<strong>Coscienza normale:</strong> GCS 15 (completamente sveglio)',
      cnsItem2: '<strong>AMS lieve:</strong> GCS 13-14 (SOFA 1, confusione/disorientamento)',
      cnsItem3: '<strong>AMS moderato:</strong> GCS 10-12 (SOFA 2, sonnolento ma risvegliabile)',
      cnsItem4:
        '<strong>Coma grave:</strong> GCS 6-9 (SOFA 3, localizza dolore, considerare intubazione per protezione vie aeree)',
      cnsItem5:
        '<strong>Coma profondo:</strong> GCS &lt;6 (SOFA 4, nessuna risposta, prognosi infausta)',
      cnsItem6:
        '<strong>⚠️ ALLERTA:</strong> GCS &lt;6 + pupille fisse dilatate → valutazione morte cerebrale, TC cranio urgente',

      // Renal
      renalTitle: '💧 Renale:',
      renalItem1:
        '<strong>Creatinina normale:</strong> 0.6-1.2 mg/dL (varia per età/sesso/massa muscolare)',
      renalItem2:
        '<strong>AKI Stadio 1:</strong> Cr 1.2-1.9 (SOFA 1, monitorare, ottimizzare emodinamica)',
      renalItem3:
        '<strong>AKI Stadio 2:</strong> Cr 2.0-3.4 (SOFA 2, nefrologia informata, evitare nefrotossici)',
      renalItem4:
        '<strong>AKI Stadio 3:</strong> Cr 3.5-4.9 o oliguria &lt;500 mL/die (SOFA 3, considerare RRT presto)',
      renalItem5:
        '<strong>Insufficienza renale:</strong> Cr ≥5.0 o anuria &lt;200 mL/die (SOFA 4, RRT indicata)',
      renalItem6:
        '<strong>⚠️ ALLERTA:</strong> SOFA Renale 4 + iperkaliemia (K+ >6.5) o edema polmonare → dialisi emergente',

      // Critical Alert Thresholds
      criticalAlertsTitle: 'Soglie di Allerta SOFA Critiche',
      alert1Title: 'SOFA ≥15',
      alert1Description:
        'Insufficienza multi-organo catastrofica. Mortalità >90%. Discussioni su cure palliative appropriate.',
      alert2Title: 'ΔSOFA ≥+2 in 24-48h',
      alert2Description:
        'Criterio sepsi. Deterioramento significativo. Rivalutare diagnosi, trattamento, controllo fonte infettiva.',
      alert3Title: 'Qualsiasi singolo organo SOFA 4',
      alert3Description:
        'Insufficienza grave di singolo organo. Alto rischio. Richiede supporto organo-specifico aggressivo (es. ECMO per SOFA respiratorio 4, RRT per SOFA renale 4).',
      alert4Title: 'SOFA 10-12',
      alert4Description:
        'Rischio alto. Mortalità 40-50%. Decorso ICU molto prolungato previsto. Supporto massimo degli organi indicato.',

      // Baseline and Chronic Dysfunction
      baselineTitle: "Disfunzione d'Organo Basale e Cronica",
      baselineItem1:
        "<strong>SOFA basale noto:</strong> Se disfunzione d'organo cronica pre-malattia (es. ESRD, cirrosi, BPCO) → usare SOFA basale pre-malattia per calcolo ΔSOFA",
      baselineItem2:
        '<strong>Pazienti dializzati:</strong> SOFA renale automaticamente 4 (in RRT) → focalizzarsi su punteggi altri organi',
      baselineItem3:
        '<strong>Anziani/fragili:</strong> Possono avere SOFA basale più alto (es. lieve insufficienza renale Cr 1.5) → interpretare SOFA assoluto con cautela, ΔSOFA più utile',
      baselineItem4:
        '<strong>Pediatria:</strong> SOFA non validato &lt;18 anni → usare Pediatric SOFA (pSOFA) o score PELOD-2 invece',
    },

    // Sezione 8: Documentation
    documentation: {
      title: 'Documentazione Medica e Linee Guida',

      guidelinesTitle: 'Linee Guida Internazionali e Definizioni di Consenso',

      // Sepsis-3
      sepsis3GuideTitle: '📋 Definizioni di Consenso Sepsis-3 (2016)',
      sepsis3Item1:
        '<strong>Task Force:</strong> Society of Critical Care Medicine (SCCM) + European Society of Intensive Care Medicine (ESICM)',
      sepsis3Item2:
        "<strong>Definizione sepsi:</strong> Disfunzione d'organo pericolosa per la vita causata da risposta disregolata dell'ospite all'infezione, operazionalizzata come <strong>punteggio SOFA ≥2 punti</strong> dalla baseline",
      sepsis3Item3:
        '<strong>Definizione shock settico:</strong> Sepsi + necessità di vasopressori per mantenere MAP ≥65 mmHg + lattato sierico >2 mmol/L nonostante adeguata rianimazione con fluidi',
      sepsis3Item4:
        '<strong>Screening qSOFA:</strong> Frequenza respiratoria ≥22/min, stato mentale alterato (GCS &lt;15), PA sistolica ≤100 mmHg (≥2 su 3 → screening positivo)',
      sepsis3Item5:
        '<strong>Impatto:</strong> Ha sostituito i criteri SIRS (definizioni Sepsis-1/2). La definizione basata su SOFA migliora accuratezza prognostica e rilevanza clinica.',

      // Surviving Sepsis Campaign
      sscGuideTitle: '📋 Linee Guida Surviving Sepsis Campaign (2021)',
      sscItem1:
        '<strong>Bundle 1 ora:</strong> Misurare lattato, eseguire emocolture prima degli antibiotici, somministrare antibiotici a largo spettro, iniziare rianimazione rapida con fluidi (30 mL/kg cristalloidi) se sepsi/shock settico sospetto',
      sscItem2:
        "<strong>Ruolo SOFA:</strong> Usato per confermare disfunzione d'organo (SOFA ≥2 dalla baseline) e guidare escalation terapeutica",
      sscItem3:
        '<strong>Monitoraggio seriale:</strong> Punteggi SOFA giornalieri raccomandati per valutare risposta al trattamento e guidare de-escalation',
      sscItem4:
        '<strong>Linee guida vasopressori:</strong> Noradrenalina prima linea, target MAP ≥65 mmHg, aggiungere vasopressina o adrenalina se refrattario (allineato con punteggio cardiovascolare SOFA)',

      // Berlin ARDS
      ardsGuideTitle: '📋 Definizione Berlin ARDS (2012)',
      ardsItem1:
        '<strong>Integrazione con SOFA:</strong> Il componente respiratorio SOFA basato su rapporto P/F si allinea con le categorie di gravità ARDS Berlin',
      ardsItem2: '<strong>ARDS lieve:</strong> P/F 200-300 (SOFA respiratorio 2)',
      ardsItem3: '<strong>ARDS moderata:</strong> P/F 100-200 (SOFA respiratorio 3)',
      ardsItem4: '<strong>ARDS grave:</strong> P/F &lt;100 (SOFA respiratorio 4)',
      ardsItem5:
        '<strong>Requisito ventilazione:</strong> SOFA 3-4 richiedono supporto respiratorio (ventilazione meccanica, CPAP, o cannula nasale alto flusso ≥10 L/min)',

      // KDIGO AKI
      kdigoAkiGuideTitle: '📋 Linee Guida KDIGO AKI (2012)',
      kdigoItem1:
        '<strong>Stadiazione AKI:</strong> Stadio 1 (Cr 1.5-1.9× basale), Stadio 2 (2.0-2.9×), Stadio 3 (≥3× o ≥4 mg/dL o RRT) si allinea parzialmente con punteggio renale SOFA',
      kdigoItem2:
        '<strong>Criteri diuresi:</strong> SOFA usa &lt;500 mL/die (SOFA 3) e &lt;200 mL/die (SOFA 4), simile ai criteri UO AKI KDIGO',
      kdigoItem3:
        '<strong>Indicazione RRT:</strong> SOFA renale 4 spesso indica candidatura a RRT (AKI grave, oliguria/anuria)',

      // Best Practices
      bestPracticesTitle: 'Migliori Pratiche di Documentazione Clinica',

      templateTitle: '📝 Template Documentazione Score SOFA:',
      templateContent:
        "TI Giorno 3 - Score SOFA:\n\nSOFA Totale: 12 (↑ da SOFA Giorno 2 = 10, ΔSOFA +2)\n\nPunteggi Organi Individuali:\n- Respirazione: 3 (P/F ratio 180 mmHg con FiO₂ 0,60, intubato)\n- Coagulazione: 2 (Piastrine 95 ×10³/μL, ↓ da 120K)\n- Fegato: 1 (Bilirubina 1,8 mg/dL)\n- Cardiovascolare: 4 (Noradrenalina 0,25 μg/kg/min, MAP 68 mmHg)\n- SNC: 1 (GCS 14, sedazione sospesa per valutazione)\n- Renale: 1 (Creatinina 1,7 mg/dL, DU 1200 mL/24h)\n\nInterpretazione Clinica:\nPaziente ad alto rischio con disfunzione multi-organo grave.\nΔSOFA +2 indica peggioramento nonostante antibiotici/fluidi.\n\nPiano d'Azione:\n1. Ampliare antibiotici (aggiungere copertura antimicotica)\n2. Aumentare supporto vasopressorio (target MAP 65-70 mmHg)\n3. TC addome per valutazione controllo fonte\n4. Incontro familiare per discutere prognosi (rischio mortalità 40-50%)\n5. Continuare trending SOFA giornaliero",

      trendingTitle: '📊 Grafico Trending SOFA Seriale (raccomandato in EMR):',
      trendingItem1:
        '<strong>SOFA totale giornaliero:</strong> Grafico durante degenza ICU per visualizzare traiettoria',
      trendingItem2:
        '<strong>Trend organo-specifici:</strong> Monitorare punteggi singoli organi per identificare insufficienze specifiche (es. SOFA renale 0→3 = nuovo AKI)',
      trendingItem3:
        '<strong>Codifica colori:</strong> Verde (SOFA 0-6), Arancione (7-12), Rosso (≥13) per rapida valutazione gravità',
      trendingItem4:
        '<strong>Annotazioni:</strong> Segnare interventi maggiori (es. "Giorno 2: Antibiotici modificati", "Giorno 4: Chirurgia controllo fonte")',

      // Research Applications
      researchTitle: 'Applicazioni per Ricerca e Miglioramento Qualità',
      researchItem1:
        '<strong>Stratificazione trial clinici:</strong> Randomizzare per SOFA basale (&lt;8 vs ≥8) per bilanciare gravità tra bracci',
      researchItem2:
        "<strong>Endpoint primari:</strong> ΔSOFA al giorno 7, giorni liberi da SOFA (giorni vivi e con SOFA &lt;6), giorni liberi da insufficienza d'organo",
      researchItem3:
        '<strong>Endpoint secondari:</strong> Punteggi SOFA singoli organi (es. miglioramento SOFA respiratorio in trial ARDS)',
      researchItem4:
        '<strong>Benchmarking ICU:</strong> Outcome aggiustati per gravità usando SOFA in modelli APACHE IV, SAPS 3',
      researchItem5:
        '<strong>Metriche qualità:</strong> Mortalità sepsi stratificata per SOFA basale per reporting qualità ospedaliera',
    },

    // Sezione 9: Scientific References
    scientificReferences: {
      title: 'Riferimenti Scientifici (Citazioni PMID)',
      publicationsTitle: 'Pubblicazioni Chiave e Citazioni PMID',

      // Publication 1: Vincent 1996 - Original SOFA
      publication1Author: '📄 Vincent JL, Moreno R, Takala J, et al. (1996)',
      publication1Title:
        '"The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure"',
      publication1Journal: '<em>Intensive Care Medicine</em>, 22(7): 707-710',
      publication1Pmid: '<strong>PMID: 8863252</strong>',
      publication1Description:
        '<strong>Pubblicazione originale dello Score SOFA.</strong> Sviluppato dal gruppo di lavoro della Società Europea di Medicina Intensiva. Validato su 1449 pazienti in terapia intensiva. Proposto sistema di punteggio a 6 organi (0-4 ciascuno, totale 0-24). Dimostrata correlazione con mortalità in TI (SOFA ≥15 → mortalità >90%). Enfatizzata utilità per <strong>valutazione seriale</strong> (delta SOFA) piuttosto che singolo punto temporale.',

      // Publication 2: Singer 2016 - Sepsis-3
      publication2Author: '📄 Singer M, Deutschman CS, Seymour CW, et al. (2016)',
      publication2Title:
        '"The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)"',
      publication2Journal: '<em>JAMA</em>, 315(8): 801-810',
      publication2Pmid: '<strong>PMID: 26903338</strong>',
      publication2Description:
        "<strong>Definizioni consenso Sepsis-3.</strong> Task force SCCM + ESICM. Ridefinita sepsi come \"disfunzione d'organo pericolosa per la vita (SOFA ≥2 dal basale) causata da risposta disregolata dell'ospite all'infezione\". Sostituiti criteri SIRS. Introdotto strumento screening qSOFA. Validato su 148.907 pazienti in 12 database. SOFA ≥2 ha mostrato <strong>validità predittiva superiore</strong> vs SIRS (AUROC 0,74 vs 0,64 per mortalità ospedaliera).",

      // Publication 3: Ferreira 2001 - Serial SOFA
      publication3Author: '📄 Ferreira FL, Bota DP, Bross A, et al. (2001)',
      publication3Title:
        '"Serial evaluation of the SOFA score to predict outcome in critically ill patients"',
      publication3Journal: '<em>JAMA</em>, 286(14): 1754-1758',
      publication3Pmid: '<strong>PMID: 11594901</strong>',
      publication3Description:
        "<strong>Validazione monitoraggio SOFA seriale.</strong> Studio su 352 pazienti in TI con misurazioni SOFA seriate. Dimostrato che <strong>ΔSOFA nelle prime 48h</strong> è predittore forte di mortalità (ΔSOFA +1 punto = ~10% ↑ mortalità). Pazienti con SOFA ≥11 o SOFA in aumento avevano <strong>mortalità >80%</strong>. Concluso: valutazione seriale superiore a singolo SOFA all'ammissione per prognosi.",

      // Publication 4: Seymour 2016 - Sepsis-3 Validation
      publication4Author: '📄 Seymour CW, Liu VX, Iwashyna TJ, et al. (2016)',
      publication4Title:
        '"Assessment of Clinical Criteria for Sepsis: For the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)"',
      publication4Journal: '<em>JAMA</em>, 315(8): 762-774',
      publication4Pmid: '<strong>PMID: 26903335</strong>',
      publication4Description:
        '<strong>Studio validazione Sepsis-3.</strong> Analizzati 148.907 pazienti con infezione sospetta in 12 dataset internazionali. Confrontati SOFA, SIRS, LODS, qSOFA per predire mortalità ospedaliera. <strong>SOFA ≥2 punti:</strong> AUROC 0,74 (IC95% 0,73-0,76), sensibilità 63%, specificità 79% per mortalità. <strong>qSOFA ≥2:</strong> AUROC 0,66 fuori TI, screening al letto più rapido ma sensibilità inferiore rispetto a SOFA.',

      // Publication 5: Raith 2017 - ICU Validation
      publication5Author: '📄 Raith EP, Udy AA, Bailey M, et al. (2017)',
      publication5Title:
        '"Prognostic Accuracy of the SOFA Score, SIRS Criteria, and qSOFA Score for In-Hospital Mortality Among Adults With Suspected Infection Admitted to the Intensive Care Unit"',
      publication5Journal: '<em>JAMA</em>, 317(3): 290-300',
      publication5Pmid: '<strong>PMID: 28114553</strong>',
      publication5Description:
        "<strong>Studio validazione grande TI.</strong> 184.875 pazienti in TI con infezione sospetta da database Australia/Nuova Zelanda. <strong>Score SOFA:</strong> AUROC 0,753 per mortalità ospedaliera, superiore a SIRS (AUROC 0,589) e qSOFA (AUROC 0,690). SOFA basale ≥2 ha identificato 93% dei pazienti in TI deceduti. Confermato <strong>SOFA come migliore discriminatore</strong> per disfunzione d'organo e mortalità nella sepsi in TI.",

      // Publication 6: Lambden 2019 - Comprehensive Review
      publication6Author: '📄 Lambden S, Laterre PF, Levy MM, Francois B. (2019)',
      publication6Title:
        '"The SOFA score—development, utility and challenges of accurate assessment in clinical trials"',
      publication6Journal: '<em>Critical Care</em>, 23(1): 374',
      publication6Pmid: '<strong>PMID: 31775846</strong>',
      publication6Description:
        "<strong>Revisione completa SOFA.</strong> Sviluppo storico dall'inizio nel 1996 all'integrazione in Sepsis-3. Discusse <strong>sfide:</strong> sedazione confondente punteggio SNC, aggiustamenti basale disfunzione cronica d'organo, variabilità inter-operatore. Fornite raccomandazioni per calcolo SOFA standardizzato in trial clinici: valori peggiori per finestra 24h, GCS senza sedazione quando possibile, documentare SOFA basale per malattia cronica. Revisione dati validazione mostranti <strong>AUROC consistente 0,74-0,86</strong> in diverse popolazioni TI.",

      // Additional References Section
      additionalTitle: 'Riferimenti Chiave Aggiuntivi',
      additionalItem1:
        '<strong>Jones AE, Trzeciak S, Kline JA.</strong> (2009) "The Sequential Organ Failure Assessment score for predicting outcome in patients with severe sepsis and evidence of hypoperfusion at the time of emergency department presentation". <em>Critical Care Medicine</em>, 37(5): 1649-1654. <strong>PMID: 19325482</strong>. Validazione in PS mostrante SOFA predittore mortalità migliore di APACHE II in pazienti con sepsi.',
      additionalItem2:
        '<strong>Moreno R, Vincent JL, Matos R, et al.</strong> (1999) "The use of maximum SOFA score to quantify organ dysfunction/failure in intensive care. Results of a prospective, multicentre study". <em>Intensive Care Medicine</em>, 25(7): 686-696. <strong>PMID: 10470572</strong>. SOFA massimo durante degenza TI predice mortalità (AUROC 0,86).',
      additionalItem3:
        '<strong>Rhodes A, Evans LE, Alhazzani W, et al.</strong> (2017) "Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock: 2016". <em>Intensive Care Medicine</em>, 43(3): 304-377. <strong>PMID: 28101605</strong>. Linee guida Surviving Sepsis Campaign raccomandanti SOFA per diagnosi sepsi e monitoraggio.',

      // Educational Note
      educationalNote:
        "<strong>Nota Educativa:</strong> Questi riferimenti rappresentano pubblicazioni peer-reviewed ad alto impatto che validano lo Score SOFA. Le citazioni PMID permettono ricerca diretta su PubMed. Lo Score SOFA è stato validato su >300.000 pazienti in TI in multiple coorti internazionali, dimostrando consistentemente AUROC 0,74-0,86 per predizione mortalità. Rimane il <strong>gold standard</strong> per quantificare disfunzione d'organo in pazienti critici.",
    },
  },

  // === DISCLAIMER FOOTER ===
  disclaimer: {
    title: 'DISCLAIMER CLINICO:',
    text: 'Lo Score SOFA e uno strumento prognostico, non sostituisce la valutazione clinica. Interpretare nel contesto clinico completo del paziente.',
  },
};
