/**
 * @file it-IT/ibw.ts
 * @description Traduzioni italiane per IBW Calculator (Ideal Body Weight)
 * @author Vasile Chifeac
 * @created 2025-12-15
 *
 * @notes
 * - Supporta 3 formule: Hamwi (1964), Robinson (1983), PBW ARDSNet (2000)
 * - Traduzione completa 100% italiano per utenti monolingua
 * - Seguisce standard I18N_SETUP_GUIDE.md
 */

export default {
  // ============================================================
  // TITOLI PRINCIPALI
  // ============================================================
  title: 'Peso Corporeo Ideale (IBW)',
  subtitle:
    'Calcolo peso ideale con 3 formule per valutazione nutrizionale e ventilazione meccanica',

  // ============================================================
  // FORM INPUT
  // ============================================================
  form: {
    heightLabel: 'Altezza',
    heightSuffix: 'cm',
    heightRule: 'Altezza tra 1-300 cm',
    heightIcon: 'height',

    genderLabel: 'Sesso',
    genderRule: 'Sesso richiesto per calcolo IBW',
    genderIcon: 'person',
    genderOptions: {
      male: 'Maschio',
      female: 'Femmina',
    },
  },

  // ============================================================
  // BOTTONI
  // ============================================================
  buttons: {
    calculate: 'Calcola IBW',
    reset: 'Reset',
  },

  // ============================================================
  // RISULTATI
  // ============================================================
  results: {
    title: 'Risultati IBW',
    noData: "Inserisci altezza e sesso per calcolare l'IBW",
    noDataIcon: 'info',

    table: {
      formulaColumn: 'Formula',
      ibwColumn: 'IBW (kg)',
      rangeColumn: 'Range ±10%',

      hamwiLabel: 'Hamwi',
      robinsonLabel: 'Robinson',
      pbwLabel: 'PBW (ARDS)',
    },

    banner: {
      title: 'Range Accettabile:',
      rangeText: 'IBW ± 10% (variabilità costituzionale normale)',
      hamwiText: 'Hamwi & Robinson: Uso generale nutrizione clinica',
      pbwText: 'PBW: Specifico per ventilazione meccanica ARDS',
    },
  },

  // ============================================================
  // SEZIONI ESPANDIBILI
  // ============================================================
  sections: {
    // Sezione 1: Applicazioni Cliniche
    clinicalApplications: {
      title: 'Applicazioni Cliniche IBW',
      icon: 'local_hospital',

      item1Title: 'Valutazione Nutrizionale:',
      item1Text:
        'Baseline per calcolo fabbisogno calorico (25-30 kcal/kg IBW) e proteico (1,0-1,5 g/kg IBW)',

      item2Title: 'Ventilazione Meccanica:',
      item2Text: 'Volume tidale protettivo ARDS = 6 mL/kg PBW (Brower et al. 2002)',

      item3Title: 'Dosaggio Farmaci Idrofili:',
      item3Text: 'Aminoglicosidi, vancomicina dosati su IBW in pazienti obesi',

      item4Title: 'Screening Malnutrizione:',
      item4Text: 'Peso attuale/IBW &lt;90% = lieve, &lt;80% = moderata, &lt;70% = severa',
    },

    // Sezione 2: Formule IBW
    formulas: {
      title: 'Formule IBW',
      icon: 'functions',

      hamwiTitle: 'Hamwi (1964):',
      hamwiMale: 'Maschi: 48 kg + 2,7 kg × (altezza_cm - 152,4) / 2,54',
      hamwiFemale: 'Femmine: 45,5 kg + 2,25 kg × (altezza_cm - 152,4) / 2,54',

      robinsonTitle: 'Robinson (1983):',
      robinsonMale: 'Maschi: 52 kg + 1,9 kg × (altezza_inch - 60)',
      robinsonFemale: 'Femmine: 49 kg + 1,7 kg × (altezza_inch - 60)',

      pbwTitle: 'PBW - Predicted Body Weight (ARDSNet 2000):',
      pbwMale: 'Maschi: 50 + 0,91 × (altezza_cm - 152,4)',
      pbwFemale: 'Femmine: 45,5 + 0,91 × (altezza_cm - 152,4)',
    },

    // Sezione 3: Definizione e Significato Clinico
    definition: {
      title: 'Definizione e Significato Clinico',
      icon: 'description',

      whatIsTitle: "Cos'è il Peso Corporeo Ideale (IBW):",
      whatIsText:
        'Il Peso Corporeo Ideale (IBW) è il peso teorico ottimale per un individuo basato su altezza, sesso e costituzione corporea. Rappresenta il peso associato alla massima aspettativa di vita e minor rischio cardiovascolare secondo studi epidemiologici.',

      clinicalSignificanceTitle: 'Significato Clinico:',
      clinicalSignificanceText:
        'IBW è utilizzato come riferimento per: (1) Valutazione stato nutrizionale (confronto peso attuale vs IBW), (2) Calcolo fabbisogni calorici/proteici in nutrizione clinica, (3) Dosaggio farmaci in pazienti obesi/sottopeso, (4) Impostazione ventilazione meccanica protettiva (PBW per volume tidale in ARDS).',

      limitationsTitle: 'Limitazioni:',
      limitationsText:
        'Le formule IBW NON considerano: composizione corporea (massa magra vs grassa), etnia (asiatici hanno IBW inferiore), età (anziani tollerano BMI più elevato), atleticità (massa muscolare elevata). Range accettabile: IBW ±10% per variabilità costituzionale.',
    },

    // Sezione 4: Fisiopatologia
    physiology: {
      title: 'Fisiopatologia e Basi Scientifiche',
      icon: 'biotech',

      normalPhysiologyTitle: 'Fisiologia Normale:',
      normalPhysiologyText:
        'Il peso corporeo ideale correla con: (1) Altezza: Relazione lineare tra statura e peso ottimale (individui alti hanno IBW proporzionalmente maggiore), (2) Sesso: Donne hanno IBW inferiore a parità di altezza per maggior massa grassa e minor massa muscolare rispetto agli uomini, (3) Età: IBW derivato da coorti adulte giovani (20-40 anni), può non applicarsi ad anziani.',

      pathophysiologyTitle: 'Fisiopatologia Peso Anormale:',
      pathophysiologyText:
        '<strong>Sottopeso (&lt;90% IBW):</strong> Malnutrizione proteico-calorica, sarcopenia, ridotta immunità, ritardata guarigione ferite, aumentato rischio complicanze post-operatorie.<br /><strong>Sovrappeso (110-120% IBW):</strong> Aumentato rischio diabete tipo 2, ipertensione, dislipidemia, apnee notturne.<br /><strong>Obesità (&gt;120% IBW):</strong> Rischio cardiovascolare elevato, insulino-resistenza, steatosi epatica, complicanze chirurgiche.',

      formulaRationaleTitle: 'Razionale Formule:',
      formulaRationaleText:
        '<strong>Hamwi (1964):</strong> Derivata da dati assicurativi Metropolitan Life (1959), uso generale clinico.<br /><strong>Robinson (1983):</strong> Raffinamento statistico su coorti più ampie, simile a Hamwi.<br /><strong>PBW ARDSNet (2000):</strong> Specificatamente derivata per ventilazione meccanica, predice volume polmonare funzionale (capacità polmonare totale correlata con altezza).',
    },

    // Sezione 5: Interpretazione Risultati
    interpretation: {
      title: 'Interpretazione Risultati IBW',
      icon: 'analytics',

      comparisonTitle: 'Confronto Peso Attuale vs IBW:',
      comparisonText:
        '<strong>Peso Attuale/IBW × 100%:</strong><br />' +
        '• &gt;110%: Sovrappeso (considerare screening comorbidità metaboliche)<br />' +
        '• 90-110%: Range normale (peso accettabile per altezza)<br />' +
        '• 80-90%: Sottopeso lieve (valutare cause: appetito ridotto, malassorbimento, ipertiroidismo)<br />' +
        '• 70-80%: Sottopeso moderato (supplementazione nutrizionale indicata)<br />' +
        '• &lt;70%: Sottopeso severo (malnutrizione grave, supporto nutrizionale aggressivo)',

      formulaSelectionTitle: 'Selezione Formula Appropriata:',
      formulaSelectionText:
        '<strong>Hamwi/Robinson:</strong> Uso generale valutazione nutrizionale, calcolo fabbisogni, screening ambulatoriale.<br />' +
        '<strong>PBW (ARDSNet):</strong> Specifico per impostazione ventilatore in ARDS (volume tidale = 6 mL/kg PBW per ventilazione protettiva). NON usare PBW per valutazione nutrizionale generale.',

      specialPopulationsTitle: 'Popolazioni Speciali:',
      specialPopulationsText:
        '<strong>Anziani (&gt;65 anni):</strong> Tollerano BMI leggermente più elevato (25-27), IBW può sottostimare peso ottimale.<br />' +
        '<strong>Asiatici:</strong> IBW sovrastima peso ottimale (~5% inferiore per stesso rischio metabolico).<br />' +
        '<strong>Atleti:</strong> Massa muscolare elevata può dare peso &gt;IBW senza obesità (usare composizione corporea BIA/DEXA).<br />' +
        '<strong>Amputati:</strong> Correggere IBW sottraendo peso stimato arto mancante.',
    },

    // Sezione 6: Applicazioni Ventilazione Meccanica
    mechanicalVentilation: {
      title: 'Applicazioni Ventilazione Meccanica (PBW)',
      icon: 'air',

      ardsNetTitle: 'Protocollo ARDSNet (2000):',
      ardsNetText:
        '<strong>Volume Tidale Protettivo:</strong> 6 mL/kg PBW (range 4-8 mL/kg) per ridurre barotrauma/volutrauma in ARDS.<br />' +
        '<strong>Razionale:</strong> PBW predice capacità polmonare funzionale meglio del peso attuale (correlata con altezza, non massa grassa).<br />' +
        '<strong>Evidenza:</strong> Studio ARMA (2000) ha dimostrato riduzione mortalità 22% con volume tidale basso (6 mL/kg PBW) vs convenzionale (12 mL/kg) in ARDS.',

      calculationExampleTitle: 'Esempio Calcolo Impostazioni Ventilatore:',
      calculationExampleText:
        'Paziente: Maschio, 175 cm, peso attuale 95 kg (obeso)<br />' +
        '• PBW = 50 + 0,91 × (175 - 152,4) = 70,6 kg<br />' +
        '• Volume tidale target: 6 mL/kg × 70,6 kg = 424 mL<br />' +
        '• Volume tidale range: 4-8 mL/kg PBW = 282-565 mL<br />' +
        '• ⚠️ <strong>ERRORE COMUNE:</strong> Usare peso attuale (95 kg) darebbe VT = 570 mL → sovradistensione polmonare!',

      otherUsesTitle: 'Altri Usi PBW in Terapia Intensiva:',
      otherUsesText:
        '<strong>PEEP ottimale:</strong> Alcuni protocolli PEEP titration basati su PBW.<br />' +
        '<strong>Fluidoterapia ARDS:</strong> Target bilancio fluidi negativo basato su mL/kg PBW.<br />' +
        '<strong>Prone positioning:</strong> Indicazioni considerano PBW per selezionare candidati.',
    },

    // Sezione 7: Valutazione Nutrizionale
    nutritionalAssessment: {
      title: 'Applicazioni Valutazione Nutrizionale',
      icon: 'restaurant',

      caloricNeedsTitle: 'Calcolo Fabbisogno Calorico:',
      caloricNeedsText:
        '<strong>Pazienti Normopeso:</strong> 25-30 kcal/kg IBW/giorno (mantenimento).<br />' +
        '<strong>Pazienti Obesi:</strong> Usare peso corporeo aggiustato: Peso Aggiustato = IBW + 0,25 × (Peso Attuale - IBW). Previene sovralimentazione (complicanze epatiche/respiratorie).<br />' +
        '<strong>Pazienti Sottopeso:</strong> 30-35 kcal/kg peso attuale/giorno per recupero ponderale.<br />' +
        '<strong>Stress Metabolico (TI):</strong> Moltiplicare per fattore stress (1,2-1,5× in sepsi/trauma).',

      proteinNeedsTitle: 'Calcolo Fabbisogno Proteico:',
      proteinNeedsText:
        '<strong>Mantenimento:</strong> 0,8-1,0 g/kg IBW/giorno (adulti sani).<br />' +
        '<strong>Stress Catabolico:</strong> 1,2-1,5 g/kg IBW/giorno (sepsi, chirurgia maggiore).<br />' +
        '<strong>Ustioni Gravi:</strong> 1,5-2,0 g/kg IBW/giorno.<br />' +
        '<strong>Insufficienza Renale:</strong> Ridurre a 0,6-0,8 g/kg IBW/giorno (pre-dialisi) per ridurre carico azotato.',

      malnutritionScreeningTitle: 'Screening Malnutrizione:',
      malnutritionScreeningText:
        '<strong>Indice %IBW = (Peso Attuale / IBW) × 100%</strong><br />' +
        '• &gt;120%: Obesità (rischio metabolico)<br />' +
        '• 110-120%: Sovrappeso<br />' +
        '• 90-110%: Normale<br />' +
        '• 85-90%: Malnutrizione lieve<br />' +
        '• 75-85%: Malnutrizione moderata<br />' +
        '• &lt;75%: Malnutrizione severa<br />' +
        '⚠️ Combinare con altri parametri: albumina, prealbumina, linfociti, perdita peso recente.',
    },

    // Sezione 8: Dosaggio Farmaci
    drugDosing: {
      title: 'Dosaggio Farmaci Basato su IBW',
      icon: 'medication',

      hydrophilicDrugsTitle: 'Farmaci Idrofili (usare IBW in obesi):',
      hydrophilicDrugsText:
        '<strong>Aminoglicosidi (gentamicina, tobramicina):</strong> Distribuiti nel volume extracellulare (non grasso). Dosare su IBW + 40% eccesso peso: Dose = IBW + 0,4 × (Peso Attuale - IBW).<br />' +
        '<strong>Vancomicina:</strong> Dosaggio: 15-20 mg/kg IBW/dose (pazienti obesi).<br />' +
        '<strong>Farmaci neuromuscolari (succinilcolina):</strong> Basare su peso corporeo totale (rischio sottodosaggio) ma monitorare prolungamento effetto.',

      lipophilicDrugsTitle: 'Farmaci Lipofili (usare peso attuale):',
      lipophilicDrugsText:
        '<strong>Benzodiazepine, propofol, fentanyl:</strong> Distribuiti nel tessuto adiposo → dosare su peso attuale (rischio accumulo in obesi con dosi ripetute).<br />' +
        '<strong>Amiodarone:</strong> Lipofilo, dosare su peso attuale.<br />' +
        '<strong>Eparina LMW:</strong> Dosare su peso attuale (max 150 kg per obesità estrema).',

      chemotherapyTitle: 'Chemioterapia:',
      chemotherapyText:
        '<strong>Pazienti obesi:</strong> Usare peso attuale per calcolo superficie corporea (BSA). Studi recenti (ASCO 2012) raccomandano NO riduzione dose in obesi (rischio sottodosaggio).<br />' +
        '<strong>Pazienti sottopeso:</strong> Usare peso attuale, monitorare tossicità da vicino.',
    },

    // Sezione 9: Bibliografia Scientifica
    references: {
      title: 'Riferimenti Scientifici',
      icon: 'menu_book',

      reference1Author: 'Hamwi GJ. (1964)',
      reference1Title:
        '"Changing dietary concepts". In: Diabetes Mellitus: Diagnosis and Treatment',
      reference1Journal: 'American Diabetes Association, Vol 1, pp 73-78',
      reference1Description:
        '<strong>Formula Hamwi originale.</strong> Derivata da dati assicurativi Metropolitan Life (1959) per valutazione nutrizionale generale. Prima formula IBW ampiamente utilizzata in clinica.',

      reference2Author: 'Robinson JD, Lupkiewicz SM, Palenik L, et al. (1983)',
      reference2Title: '"Determination of ideal body weight for drug dosage calculations"',
      reference2Journal: '<em>American Journal of Hospital Pharmacy</em>, 40(6): 1016-1019',
      reference2Pmid: '<strong>PMID: 6869387</strong>',
      reference2Description:
        '<strong>Formula Robinson.</strong> Raffinamento statistico su 4808 pazienti. Simile a Hamwi ma più accurata per dosaggio farmaci. Ampiamente usata in farmacia clinica.',

      reference3Author: 'ARDS Network, Brower RG, Matthay MA, Morris A, et al. (2000)',
      reference3Title:
        '"Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and ARDS"',
      reference3Journal: '<em>New England Journal of Medicine</em>, 342(18): 1301-1308',
      reference3Pmid: '<strong>PMID: 10793162</strong>',
      reference3Doi: '<strong>DOI:</strong> 10.1056/NEJM200005043421801',
      reference3Description:
        '<strong>Studio ARDSNet landmark.</strong> Definizione formula PBW per ventilazione protettiva. Volume tidale 6 mL/kg PBW ridusse mortalità ARDS del 22% vs 12 mL/kg convenzionale. Base evidenza per ventilazione protettiva moderna.',

      reference4Author: 'Pai MP, Paloucek FP. (2000)',
      reference4Title: '"The origin of the "ideal" body weight equations"',
      reference4Journal: '<em>Annals of Pharmacotherapy</em>, 34(9): 1066-1069',
      reference4Pmid: '<strong>PMID: 10981254</strong>',
      reference4Description:
        '<strong>Revisione storica formule IBW.</strong> Analisi critica origini Hamwi, Devine, Robinson. Discussione limitazioni applicazione clinica moderna.',

      additionalResourcesTitle: 'Risorse Aggiuntive:',
      additionalResource1:
        '<strong>ASPEN Guidelines (2016):</strong> "Guidelines for the Provision and Assessment of Nutrition Support Therapy in Adult Critically Ill Patient". <em>JPEN</em>, raccomandazioni uso IBW per calcolo fabbisogni nutrizionali in TI.',
      additionalResource2:
        '<strong>ASCO (2012):</strong> "Appropriate chemotherapy dosing for obese adult patients with cancer". <em>Journal of Clinical Oncology</em>, 30(13): 1553-1561. Raccomandazioni dosaggio chemio in obesi.',
      additionalResource3:
        '<strong>Erstad BL. (2017):</strong> "Dosing of medications in morbidly obese patients in the intensive care unit setting". <em>Intensive Care Medicine</em>, 30(1): 18-32. Review dosaggio farmaci TI in obesi.',
    },
  },
};
