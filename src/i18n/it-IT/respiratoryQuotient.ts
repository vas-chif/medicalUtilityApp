/**
 * @file it-IT/respiratoryQuotient.ts
 * @description Traduzioni italiane per Respiratory Quotient Calculator
 * @author Vasile Chifeac
 * @created 2025-12-12
 */

export default {
  // Titoli principali
  title: 'Quoziente Respiratorio (QR)',
  subtitle: 'VCO2/VO2 - Indicatore Metabolico',

  // Sezione Header/Banner
  header: {
    mainInfo:
      'Il <strong>Quoziente Respiratorio (QR)</strong> esprime il tipo di metabolismo in corso (aerobico o anaerobico) attraverso il rapporto tra <strong>anidride carbonica</strong> prodotta e <strong>ossigeno</strong> consumato.',
  },

  // Sezione Form di Input
  form: {
    sectionTitle: 'Parametri Ematochimici',
    pvco2Label: 'PvCO2 (CO2 Venosa)',
    pvco2Unit: 'mmHg',
    paco2Label: 'PaCO2 (CO2 Arteriosa)',
    paco2Unit: 'mmHg',
    hbLabel: 'HB (Emoglobina)',
    hbUnit: 'g/dL',
    sao2Label: 'SaO2 (Saturazione O2 Arteriosa)',
    sao2Unit: '%',
    svo2Label: 'SvO2 (Saturazione O2 Venosa)',
    svo2Unit: '%',
    pao2Label: 'PaO2 (Pressione O2 Arteriosa)',
    pao2Unit: 'mmHg',
    pvo2Label: 'PvO2 (Pressione O2 Venosa)',
    pvo2Unit: 'mmHg',
  },

  // Bottoni
  buttons: {
    calculate: 'Calcola QR',
    save: 'Salva Calcolo',
    reset: 'Reset',
  },

  // Errori di validazione
  validationErrors: {
    title: '? Errore saturazioni O2:',
    sao2Error: 'o SaO2 ({sao2}%) deve essere >= SvO2 ({svo2}%)',
    pao2Error: 'o PaO2 ({pao2}) deve essere >= PvO2 ({pvo2})',
  },

  // Risultati
  results: {
    title: 'Risultati',
    unit: 'Quoziente Respiratorio (QR)',
    rangeLabel: 'Range QR: 0.7 - 1.0 ml-O2/dL',
    noResults: 'Inserisci i valori e premi Calcola per visualizzare i risultati',
  },

  // Interpretazioni
  interpretation: {
    default: 'Inserire parametri',
    severeAnaerobic: 'Metabolismo Anaerobico Severo',
    anaerobicLipogenesis: 'Metabolismo Anaerobico / Lipogenesi',
    carbMetabolism: 'Metabolismo Carboidratico Predominante',
    normalRange: 'Range Normale - Dieta Mista',
    fatMetabolism: 'Metabolismo Lipidico Predominante',
    ketosis: 'Chetosi / Digiuno Prolungato',
    nonStandard: 'Valore Non Standard',
  },

  // Alert Critici/Banner
  alerts: {
    criticalHigh: {
      title: 'ATTENZIONE:',
      text: 'QR &gt; 1.2 -> Metabolismo anaerobico. Verificare lattato e perfusione.',
    },
    ketosisWarning: {
      title: 'NOTA:',
      text: 'QR &lt; 0.7 -> Utilizzo predominante di grassi/chetoni.',
    },
  },

  // Sezione 1: Definizione e Significato Clinico
  definition: {
    title: 'Definizione e Significato Clinico',
    mainTitle: "Cos'e il Quoziente Respiratorio (QR)?",
    mainText:
      "Il QR e il <strong>rapporto tra anidride carbonica (CO2) prodotta e ossigeno (O2) consumato</strong>, spesso calcolato come <strong>VCO2/VO2</strong>. Questo valore indica il <strong>tipo di metabolismo energetico</strong> in corso nell'organismo, fornendo <strong>informazioni indirette sul tipo di metabolismo</strong> (aerobico o anaerobico).",

    clinicalSignificanceTitle: '? Significato Clinico del QR:',
    clinicalSignificance: {
      metabolicType: {
        title: 'Tipo di substrato ossidato:',
        text: 'Carboidrati, lipidi o proteine (valori tipici 0.7-1.0)',
      },
      metabolicState: {
        title: 'Stato metabolico:',
        text: 'Aerobico (fisiologico) vs Anaerobico (patologico)',
      },
      normalRange: {
        title: 'QR Normale:',
        text: '0.7 - 1.0 in condizioni aerobiche',
      },
    },

    interpretationValuesTitle: '? Interpretazione dei Valori:',
    interpretationValues: {
      qr1_0: {
        value: 'QR = 1.0',
        meaning: 'Metabolismo prevalentemente <strong>carboidratico</strong>',
      },
      qr0_7: {
        value: 'QR = 0.7',
        meaning: 'Metabolismo prevalentemente <strong>lipidico</strong>',
      },
      qr0_8: {
        value: 'QR = 0.8',
        meaning: 'Dieta mista - valore <strong>normale a riposo</strong>',
      },
      qr0_85: {
        value: 'QR = 0.85',
        meaning: 'Metabolismo misto <strong>bilanciato</strong>',
      },
      qrAbove1: {
        value: 'QR &gt; 1.0',
        meaning: '<strong>Metabolismo anaerobico</strong> / Lipogenesi',
      },
    },
  },

  // Sezione 2: Metabolismo Aerobico vs Anaerobico
  metabolism: {
    title: 'Metabolismo Aerobico vs Anaerobico',
    aerobicTitle: '? METABOLISMO AEROBICO (QR 0.7 - 1.0):',
    aerobicText:
      "Condizione fisiologica normale dove l'ossigeno e sufficiente per ossidare completamente i substrati energetici (glucosio, acidi grassi, aminoacidi) attraverso il ciclo di Krebs e la fosforilazione ossidativa nei mitocondri.",

    anaerobicTitle: '? METABOLISMO ANAEROBICO (QR &gt; 1.0):',
    anaerobicText:
      "Condizione patologica o di stress dove l'ossigeno tissutale e insufficiente, costringendo le cellule alla glicolisi anaerobica con produzione di lattato e acidosi metabolica.",

    anaerobicConditions: {
      title: "Condizioni che portano all'anaerobiosi:",
      shock: {
        title: 'Shock',
        text: '<strong>Shock</strong> (settico, cardiogeno, ipovolemico)',
      },
      hypoxia: {
        title: 'Ipossia',
        text: '<strong>Ipossia tissutale</strong>',
      },
      stress: {
        title: 'Stress',
        text: '<strong>Stress metabolico</strong>',
      },
      oxygenLack: {
        title: 'Carenza O2',
        text: 'Insufficiente apporto di <strong>ossigeno</strong>',
      },
    },

    qrElevationMechanism:
      '<strong>Meccanismo di elevazione del QR:</strong> In anaerobiosi, la glicolisi produce lattato + H+ che vengono tamponati dal bicarbonato (HCO3? + H+ -> H2O + CO2), generando CO2 "non metabolica" aggiuntiva. Questo fa aumentare VCO2 sproporzionatamente rispetto a VO2, elevando il QR sopra 1.0.',

    clinicalCorrelation:
      "<strong>Correlazione Clinica:</strong> QR &gt; 1.2 in pazienti critici e un marker precoce di metabolismo anaerobico che puo precedere l'aumento del lattato sierico. E un segnale di allarme per insufficiente perfusione tissutale e richiede immediata valutazione emodinamica.",
  },

  // Sezione 3: Come si Misura il VCO2/VO2
  measurement: {
    title: 'Come si Misura il VCO2/VO2',
    methodsTitle: 'Metodi di Misurazione:',

    indirectCalorimetry: {
      title: '? Calorimetria Indiretta (Gold Standard):',
      text: 'Misura diretta di VO2 e VCO2 attraverso analisi dei gas respiratori (O2 consumato e CO2 espirato). Metodo piu accurato utilizzato in terapia intensiva per valutazione metabolica completa. Richiede apparecchiature dedicate (metabolic cart).',
    },

    formulaMethod: {
      title: '? Metodo con Formula (Stima da Emogasanalisi):',
      intro:
        'Calcolo approssimativo basato su differenza artero-venosa da emogasanalisi. Meno accurato della calorimetria ma utile per screening rapido quando calorimetria non disponibile.',
      vo2CalcTitle: 'Calcolo VO2:',
      vo2CalcText:
        'Ossigeno consumato dai tessuti, calcolato dalla differenza di contenuto O2 tra sangue arterioso e venoso',
      vo2Formula: 'VO2 = [HB x 1.36 x (SaO2 - SvO2)] + [(PaO2 - PvO2) x 0.003]',
      vco2CalcTitle: 'Calcolo VCO2:',
      vco2CalcText:
        'Anidride carbonica prodotta dai tessuti, calcolata dalla differenza di CO2 tra sangue venoso e arterioso',
      vco2Formula: 'VCO2 = PvCO2 - PaCO2',
    },

    practicalNote:
      '<strong>Nota Pratica:</strong> La formula fornisce una stima approssimativa. Per valutazione accurata in terapia intensiva, preferire calorimetria indiretta che misura direttamente i gas respiratori in condizioni di steady-state metabolico.',
  },

  // Sezione 4: Fisiologia del Metabolismo
  physiology: {
    title: '? Fisiologia del Metabolismo Aerobico vs Anaerobico',
    substratesTitle: 'Substrati Energetici e Rispettivi QR Teorici:',

    carbohydrates: {
      title: '1. Carboidrati (Glucosio):',
      equation: 'C6H12O6 + 6O2 -> 6CO2 + 6H2O + 38 ATP',
      rq: 'QR = 6CO2/6O2 = <strong>1.0</strong>',
      description:
        '<strong>Ossidazione completa del glucosio:</strong> Produce il massimo numero di molecole di CO2 per ogni molecola di O2 consumata. E il substrato preferenziale in condizioni di alta intensita metabolica (esercizio, periodo post-prandiale). Efficienza: 38 ATP per molecola.',
    },

    lipids: {
      title: '2. Lipidi (Acidi Grassi - es. Acido Palmitico):',
      equation: 'C16H32O2 + 23O2 -> 16CO2 + 16H2O + 129 ATP',
      rq: 'QR = 16CO2/23O2 = <strong>0.7</strong>',
      description:
        '<strong>Ossidazione acidi grassi:</strong> Richiede piu ossigeno per molecola di CO2 prodotta rispetto ai carboidrati. E il substrato dominante a riposo, durante digiuno prolungato e in esercizio a bassa intensita. Massima resa energetica: 129 ATP per acido palmitico (9 kcal/g).',
    },

    proteins: {
      title: '3. Proteine (Aminoacidi):',
      rq: 'QR medio = <strong>0.8-0.85</strong>',
      description:
        '<strong>Ossidazione proteica:</strong> Normalmente contribuisce solo 10-15% del metabolismo energetico totale. Aumenta in condizioni di catabolismo (digiuno prolungato, stress, sepsi). La deaminazione produce urea che deve essere eliminata renalmente.',
    },

    anaerobicTitle: 'Metabolismo Anaerobico (Glicolisi Anaerobica):',
    anaerobicEquation: 'Glucosio -> 2 Lattato + 2 H+ + 2 ATP (senza O2)',
    anaerobicRQ: 'QR apparente &gt; 1.0 (per buffering del lattato)',
    anaerobicMechanism: {
      lactateProduction:
        '<strong>Produzione lattato:</strong> In assenza di O2 sufficiente, il piruvato viene convertito in lattato invece di entrare nel ciclo di Krebs.',
      bufferingCO2:
        '<strong>CO2 da buffering:</strong> Gli ioni H+ prodotti vengono tamponati da HCO3?, generando CO2 "non metabolica" aggiuntiva che aumenta artificialmente il QR.',
    },

    clinicalImplication:
      '<strong>Implicazione Clinica:</strong> Un QR &gt; 1.0 in paziente critico indica produzione di CO2 in eccesso rispetto al consumo di O2, suggerendo metabolismo anaerobico da ipoperfusione tissutale. Richiede intervento urgente per migliorare il delivery di ossigeno (DO2) ai tessuti.',
  },

  // Sezione 5: Come si Misura il RQ
  rqMeasurement: {
    title: '? Come si Misura il RQ',
    directMethodsTitle: 'Metodi di Misurazione Diretta:',

    method1: {
      title: '1. Calorimetria Indiretta (Gold Standard):',
      principle: {
        label: 'Principio:',
        text: 'Misura continua gas respiratori inspiratori ed espiratori con sistema metabolic cart. Calcolo VO2 = (FiO2 x VE_insp) - (FeO2 x VE_exp), VCO2 = (FeCO2 x VE_exp) - (FiCO2 x VE_insp)',
      },
      equipment: {
        label: 'Equipaggiamento:',
        text: 'Analizzatori O2 (paramagnetico o fuel cell), analizzatore CO2 (infrarosso), pneumotacografo (misura flusso), canopy/maschera (raccolto aria espirata)',
      },
      conditions: {
        label: 'Condizioni Ottimali:',
        text: 'Paziente a riposo (30 min), digiuno >=4h, temperatura neutra, no fumo 2h prima, no esercizio 12h prima, steady-state (VO2/VCO2 stabili +-10% per 5 min)',
      },
      applications: {
        label: 'Applicazioni:',
        text: 'Calcolo REE (equazione Weir), prescrizione nutrizionale ICU, valutazione performance atleti, diagnosi disordini metabolici',
      },
    },

    method2: {
      title: '2. Stima da Emogasanalisi Artero-Venosa (Metodo Utilizzato):',
      sampling: {
        label: 'Campionamento:',
        text: 'Prelievo arterioso (a. radiale/femorale) + venoso centrale (catetere venoso centrale in atrio destro/vena cava superiore)',
      },
      parameters: {
        label: 'Parametri Misurati:',
        text: 'PaCO2, PvCO2 (pressioni parziali CO2), PaO2, PvO2 (pressioni parziali O2), SaO2, SvO2 (saturazioni O2), Hb (emoglobina)',
      },
      vco2Calc: {
        label: 'Calcolo VCO2:',
        text: 'Differenza artero-venosa PCO2 (PvCO2 - PaCO2). Normale ~5-6 mmHg',
      },
      vo2Calc: {
        label: 'Calcolo VO2:',
        text: 'Contenuto O2 arterioso - venoso. CaO2 = (Hb x 1.36 x SaO2/100) + (PaO2 x 0.003), CvO2 = (Hb x 1.36 x SvO2/100) + (PvO2 x 0.003). Differenza artero-venosa O2 normale 4-5 mL/dL',
      },
      limitations: {
        label: 'Limitazioni:',
        text: 'Stima approssimativa (non misura diretta flussi), richiede condizioni steady-state, influenzato da gittata cardiaca, shunt, spazio morto. Accuratezza +-15-20% vs calorimetria',
      },
    },

    clinicalRecommendation:
      '<strong>Raccomandazione Clinica:</strong> Per valutazione nutrizionale accurata in ICU, preferire calorimetria indiretta (misura VO2, VCO2, REE diretti). Stima da emogasanalisi utile come screening rapido o quando calorimetria non disponibile, ma validare con trend clinici (bilancio azotato, peso, albumina).',
  },

  // Sezione 6: Formula Utilizzata
  formula: {
    title: 'Formula Utilizzata',
    mainFormula: 'QR = VCO2 / VO2',
    whereTitle: 'Dove:',
    hufnerConstant:
      '<strong>Costante di Hufner:</strong> ml di O2 che 1g di emoglobina puo legare (capacita di legame O2)',
    plasmaSolubility:
      '<strong>Coefficiente di solubilita O2:</strong> ml di O2 disciolti nel plasma per mmHg di pressione parziale',
  },

  // Sezione 7: Analisi Dettagliata
  detailedAnalysis: {
    title: 'Analisi Dettagliata e Applicazioni',
    componentsTitle: 'Componenti del Calcolo:',

    vco2Production: 'Produzione CO2 (VCO2):',
    vco2Description: 'Differenza artero-venosa di CO2 (normale ~200 ml/min)',

    vo2Hemoglobin: 'Consumo O2 - Trasporto via Emoglobina:',
    vo2HemoglobinFormula: 'Formula: HB x 1.36 x (SaO2 - SvO2) / 100',

    vo2Plasma: 'Consumo O2 - Trasporto via Plasma:',
    vo2PlasmaFormula: 'Formula: (PaO2 - PvO2) x 0.003',

    clinicalApplicationsTitle: 'Applicazioni Cliniche:',
    applications: {
      calorimetry:
        '<strong>Calorimetria Indiretta:</strong> Valutazione del dispendio energetico in pazienti critici',
      nutrition:
        '<strong>Nutrizione Artificiale:</strong> Ottimizzazione del rapporto carboidrati/grassi (evitare overfeeding)',
      shock:
        '<strong>Monitoraggio Shock:</strong> Marker precoce di metabolismo anaerobico e ipoperfusione',
      weaning:
        '<strong>Weaning Ventilatorio:</strong> QR elevato puo indicare eccessiva produzione CO2 (difficolta svezzamento)',
      metabolic:
        '<strong>Valutazione Metabolica:</strong> Identificazione del substrato energetico prevalente',
    },

    limitationsTitle: 'Limiti e Considerazioni:',
    limitations: {
      systemic: 'Il QR rappresenta il rapporto VCO2/VO2 <strong>sistemico</strong>, non tissutale',
      shock: "In condizioni di shock, l'aumento del QR puo precedere l'aumento del lattato",
      accuracy: 'La misurazione accurata richiede calorimetria indiretta in condizioni stabili',
      estimation:
        'Questo calcolo e una <strong>stima approssimativa</strong> basata su emogasanalisi artero-venosa',
    },

    references:
      '<strong>Riferimenti:</strong> La formula utilizzata stima VCO2 e VO2 dalla differenza artero-venosa. Per misurazioni precise, preferire calorimetria indiretta con analisi dei gas respiratori (Encyclopedia of Respiratory Medicine, ScienceDirect Medical Literature).',
  },

  // Sezione 8: Interpretazione Clinica Dettagliata
  clinicalInterpretation: {
    title: 'Interpretazione Clinica Dettagliata',
    rangeTitle: 'Range di Valori e Significato Clinico',

    qr07: {
      title: 'QR 0.7 - Ossidazione Lipidica Pura',
      clinical: {
        label: 'Situazione clinica',
        text: 'Digiuno prolungato (>12h), esercizio fisico a bassa intensita (<50% VO2max), dieta chetogenica, fase post-assorbitiva notturna',
      },
      metabolic: {
        label: 'Significato metabolico',
        text: 'Prevalente utilizzo di acidi grassi come substrato energetico. Massima efficienza energetica da lipidi (9 kcal/g). Risparmio di glicogeno muscolare/epatico. Stato catabolico proteico-lipidico se prolungato',
      },
      action: {
        label: 'Azione clinica',
        text: 'Normale in condizioni di digiuno notturno. Se persistente in paziente ICU nutrito -> valutare adeguatezza apporto calorico e glucidico (possibile sottonutrizione)',
      },
    },

    qr0885: {
      title: 'QR 0.8-0.85 - Dieta Mista Equilibrata (TARGET ICU)',
      clinical: {
        label: 'Situazione clinica',
        text: 'Dieta bilanciata con mix carboidrati/lipidi/proteine, condizione di riposo metabolico, paziente ICU con nutrizione artificiale ottimale',
      },
      metabolic: {
        label: 'Significato metabolico',
        text: 'Ossidazione bilanciata di tutti i macronutrienti. QR medio teorico dieta europea standard ~0.82. Target ideale per nutrizione enterale/parenterale in terapia intensiva secondo linee guida ESPEN',
      },
      action: {
        label: 'Azione clinica',
        text: 'ESPEN Guidelines ICU 2019 raccomandano target QR 0.85-0.95 per nutrizione ottimale. Mantenere equilibrio macronutrienti: carboidrati 50-60%, lipidi 30-35%, proteine 15-20% delle calorie totali. Evitare sia sovralimentazione che sottonutrizione',
      },
    },

    qr0910: {
      title: 'QR 0.9-1.0 - Predominanza Carboidrati',
      clinical: {
        label: 'Situazione clinica',
        text: 'Periodo post-prandiale dopo pasto ricco di carboidrati, esercizio fisico moderato-intenso (60-85% VO2max), dieta iperglucidica (atleti pre-gara)',
      },
      metabolic: {
        label: 'Significato metabolico',
        text: "Prevalente ossidazione glucosio. Crossover point nell'esercizio fisico (switch lipidi->carboidrati). Normale risposta metabolica post-prandiale con insulina elevata che favorisce uptake glucosio",
      },
      action: {
        label: 'Azione clinica',
        text: 'Normale dopo pasti o durante esercizio. In paziente ICU con QR persistente ~1.0 -> monitorare per possibile inizio overfeeding glucidico. Se accompagnato da iperglicemia -> ottimizzare controllo glicemico',
      },
    },

    qr1012: {
      title: '? QR 1.0-1.2 - Lipogenesi de novo (Overfeeding)',
      clinical: {
        label: 'Situazione clinica',
        text: 'Eccesso di apporto glucidico rispetto al fabbisogno, nutrizione parenterale/enterale ipercalorica con alto contenuto di glucosio, lipogenesi de novo epatica da carboidrati in eccesso',
      },
      metabolic: {
        label: 'Significato metabolico',
        text: 'Conversione glucosio -> acidi grassi (lipogenesi). Processo inefficiente che produce CO2 in eccesso NON da ossidazione ma da reazioni di condensazione. QR teorico lipogenesi massima ~8.0, ma in vivo 1.0-1.2 piu comune',
      },
      problem: {
        label: '? PROBLEMA ICU CRITICO',
        text: '?VCO2 da lipogenesi -> aumento minute ventilation richiesta -> difficolta weaning dal ventilatore meccanico. Steatosi epatica, iperglicemia, aumento lavoro respiratorio',
      },
      action: {
        label: 'Azione clinica URGENTE',
        text: 'Ridurre apporto glucidico (target 3-4 g/kg/die max), aumentare quota lipidica (30-50% calorie non-proteiche), mantenere apporto proteico (1.2-1.5 g/kg/die). Rivalutare fabbisogno calorico con calorimetria indiretta. Monitorare glicemia e funzionalita epatica',
      },
    },

    qrAbove12: {
      title: '? QR >1.2 - Metabolismo Anaerobico (ALERT CRITICO)',
      clinical: {
        label: 'Situazione clinica',
        text: 'Shock settico/cardiogeno/ipovolemico, esercizio massimale sopra soglia anaerobica, insufficienza circolatoria acuta, ipoperfusione tissutale severa',
      },
      metabolic: {
        label: 'Significato metabolico',
        text: 'Glicolisi anaerobica -> produzione lattato + H+. Buffering con HCO3? -> CO2 "non metabolica" (non da ossidazione substrati). ?VCO2 sproporzionato rispetto a VO2. Marker precoce di metabolismo anaerobico che precede l\'aumento del lattato sierico',
      },
      prognostic: {
        label: '? INDICATORE PROGNOSTICO',
        text: 'QR >1.2 in shock -> predittore indipendente di mortalita. Indica insufficiente delivery O2 tissutale (DO2 < richiesta). Possibile precursore di disfunzione multi-organo (MOF)',
      },
      action: {
        label: 'Azione clinica EMERGENZA',
        text: 'Valutazione emodinamica urgente (PA, FC, CVP, ScvO2). Resuscitazione volemica guidata (fluid challenge, targeting CVP 8-12 mmHg). Supporto inotropo se necessario (noradrenalina target MAP >=65 mmHg, dobutamina se bassa gittata). Ricerca e trattamento fonte sepsi. Monitoraggio lattato arterioso (target <2 mmol/L). Considerare monitoraggio avanzato (PiCCO, Swan-Ganz) per ottimizzare DO2',
      },
    },

    clinicalNote:
      "Nota Clinica Importante: Il QR fornisce informazioni integrative ad altri parametri metabolici/emodinamici (lattato, ScvO2, gap CO2, BE). Non interpretare mai il QR isolatamente. In ICU, l'utilizzo combinato di QR + calorimetria indiretta + lattato + ScvO2 permette ottimizzazione simultanea di nutrizione artificiale e supporto emodinamico. Target ideale ICU: QR 0.85-0.95 + normoglicemia + lattato <2 mmol/L + ScvO2 >70%.",
  },

  // Sezione 9: Valori di Riferimento
  referenceValues: {
    title: 'Valori di Riferimento e Alert Critici',
    rangeTitle: 'Range di Riferimento per Condizione Fisiologica',

    restingTitle: 'Condizioni a Riposo (Post-Assorbitivo):',
    resting: {
      item1: {
        range: 'QR 0.70-0.85',
        condition: 'Riposo post-assorbitivo (digiuno notturno 8-12h)',
        description:
          'Ossidazione mista lipidi (50-70%) + carboidrati (30-50%). Normale variazione circadiana: QR piu basso al mattino (?oxidazione lipidica), piu alto sera (?carboidrati)',
      },
      item2: {
        range: 'QR 0.70-0.75',
        condition: 'Digiuno prolungato (>12-24h) o dieta chetogenica',
        description:
          'Prevalente oxidazione acidi grassi e corpi chetonici. Massimo risparmio glicogeno. Comune in pazienti con low-carb diet, diabete tipo 1 scompensato (chetoacidosi), digiuno terapeutico',
      },
    },

    postprandialTitle: '2 Stato Post-Prandiale:',
    postprandial: {
      item1: {
        range: 'QR 0.85-1.00',
        condition: 'Post-prandiale pasto misto (2-4h dopo pasto)',
        description:
          'Aumento temporaneo QR per ossidazione preferenziale glucosio post-prandiale. Insulina elevata -> uptake glucosio muscolare/adiposo. Durata: picco a 1-2h, ritorno baseline 3-4h',
      },
      item2: {
        range: 'QR 1.00-1.10',
        condition: 'Post-prandiale pasto ad alto contenuto carboidrati (pasta, pane, dolci)',
        description:
          'Ossidazione quasi esclusiva glucosio. Normale risposta metabolica a carico glicemico elevato (high glycemic load meal). Attenzione: se QR >1.05 persistente oltre 4-6h -> possibile inizio lipogenesi',
      },
    },

    exerciseTitle: '3 Durante Esercizio Fisico:',
    exercise: {
      item1: {
        range: 'QR 0.70-0.85',
        condition: 'Esercizio bassa intensita (<50% VO2max)',
        description:
          'Zona aerobica lipidica. Prevalente oxidazione acidi grassi. Frequenza cardiaca: 50-65% FCmax. Applicazioni: allenamento fat-burning, recupero attivo, sport endurance lunga durata',
      },
      item2: {
        range: 'QR 0.85-0.95',
        condition: 'Esercizio moderato (50-75% VO2max)',
        description:
          'Zona aerobica mista. Crossover point: transizione da lipidi a carboidrati come substrato preferenziale. Frequenza cardiaca: 65-80% FCmax. Zona di massima efficienza aerobica',
      },
      item3: {
        range: 'QR 0.95-1.05',
        condition: 'Esercizio intenso (75-90% VO2max)',
        description:
          'Zona aerobica glucidica. Prevalente oxidazione glucosio/glicogeno. Frequenza cardiaca: 80-90% FCmax. Vicino alla soglia anaerobica (lactate threshold). Sostenibile 20-60 minuti',
      },
      item4: {
        range: 'QR >1.05-1.15',
        condition: 'Esercizio massimale (>90% VO2max) sopra soglia anaerobica',
        description:
          'Zona anaerobica. Glicolisi anaerobica con accumulo lattato. CO2 "non-metabolica" da buffering bicarbonato. Frequenza cardiaca: >90% FCmax. Sostenibile solo 2-10 minuti. Utilizzato in test da sforzo cardiopolmonare (CPET) per determinare VO2max e soglia anaerobica',
      },
    },

    alertsTitle: '? ALERT CRITICI - Thresholds di Intervento:',
    alerts: {
      item1: {
        icon: 'warning',
        iconColor: 'orange',
        title: '? QR >1.0 persistente in paziente ICU nutrito (oltre 6-12h)',
        meaning:
          '<strong>Significato:</strong> Probabile overfeeding glucidico con lipogenesi de novo. ?VCO2 -> aumento minute ventilation -> difficolta weaning ventilatore',
        action:
          '<strong>Azione:</strong> Ridurre apporto glucosio (max 3-4 g/kg/die). Aumentare quota lipidica a 30-50% calorie non-proteiche. Rivalutare fabbisogno con calorimetria indiretta. Target QR 0.85-0.95',
      },
      item2: {
        icon: 'emergency',
        iconColor: 'red',
        title: '? QR >1.2 in paziente critico (ICU, shock, sepsi)',
        meaning:
          '<strong>Significato:</strong> Metabolismo anaerobico da ipoperfusione tissutale. Insufficiente delivery O2 (DO2 < consumo). Marker precoce di shock che precede ?lattato. Predittore indipendente di mortalita',
        action:
          '<strong>Azione URGENTE:</strong> Valutazione emodinamica completa (PA, CVP, ScvO2, lattato). Resuscitazione volemica guidata (fluid challenge). Noradrenalina target MAP >=65 mmHg. Dobutamina se bassa gittata cardiaca. Ricerca/trattamento fonte sepsi. Considerare monitoraggio invasivo (PiCCO, Swan-Ganz) per ottimizzare DO2. Target: ScvO2 >70%, lattato <2 mmol/L, QR progressivo ritorno verso 0.85-0.95',
      },
      item3: {
        icon: 'health_and_safety',
        iconColor: 'purple',
        title: 'i QR <0.70 prolungato in paziente ICU',
        meaning:
          '<strong>Significato:</strong> Possibile sottonutrizione calorica/glucidica. Eccessiva ossidazione lipidica da insufficiente apporto energetico. Rischio catabolismo proteico, perdita massa magra, ritardata guarigione',
        action:
          '<strong>Azione:</strong> Rivalutare fabbisogno calorico (target 20-25 kcal/kg/die in fase acuta, 25-30 kcal/kg/die in recovery). Aumentare apporto glucidico (min 2 g/kg/die) mantenendo quota lipidica. Monitorare bilancio azotato e marker nutrizionali (albumina, prealbumina). Target QR 0.80-0.90',
      },
    },

    variability:
      '<strong>Variabilita Individuale e Fattori Confondenti:</strong> I valori di riferimento sono indicativi e soggetti a variabilita inter-individuale (eta, sesso, composizione corporea, stato di allenamento). Fattori che influenzano il QR: temperatura corporea (febbre -> ?QR), stato acido-base (acidosi metabolica -> buffering -> ?VCO2 -> ?QR), iperventilazione (?VCO2 polmonare non riflette produzione tissutale), farmaci (catecolamine -> ?glicogenolisi -> ?QR). Per valutazione accurata: condizioni di steady-state, calorimetria indiretta con apparecchiatura calibrata, integrazione con altri parametri metabolici (glicemia, lattato, corpi chetonici, ScvO2).',
  },

  // Sezione 10: Documentazione Scientifica
  scientificDocumentation: {
    title: 'Documentazione Medica Scientifica',
    guidelinesTitle: 'Linee Guida Internazionali e Protocolli Clinici',
    guidelines: {
      espen2019: {
        title: 'ESPEN Guidelines on Nutrition in the ICU (2019)',
        recommendations:
          '<strong>Raccomandazioni:</strong> Utilizzo di calorimetria indiretta come gold standard per determinazione del fabbisogno energetico in paziente critico. Target QR ottimale 0.85-0.95 per nutrizione bilanciata. Evitare overfeeding (QR >1.0 persistente) per prevenire complicanze: iperglicemia, steatosi epatica, aumento produzione CO2 con difficolta weaning ventilatore, aumentato rischio infettivo',
        source:
          'European Society for Clinical Nutrition and Metabolism - Intensive Care Medicine Guidelines',
      },
      aspen2016: {
        title: 'ASPEN Clinical Guidelines: Nutrition Support Therapy (2016)',
        recommendations:
          '<strong>Raccomandazioni:</strong> Calorimetria indiretta preferita rispetto a formule predittive (Harris-Benedict, Penn State) per accuratezza misurazione REE (Resting Energy Expenditure). QR fornisce informazioni su substrato ossidato e adeguatezza mix macronutrienti. Evitare sottostima fabbisogno (catabolismo) e sovrastima (overfeeding lipogenesi)',
        source:
          'American Society for Parenteral and Enteral Nutrition - Guidelines for Provision and Assessment of Nutrition Support',
      },
      atsaccp2003: {
        title: 'ATS/ACCP Statement on Cardiopulmonary Exercise Testing (2003)',
        recommendations:
          '<strong>Raccomandazioni:</strong> In test da sforzo cardiopolmonare (CPET), il QR (denominato RER - Respiratory Exchange Ratio durante esercizio) e utilizzato per: determinare soglia anaerobica (RER ~1.0), confermare raggiungimento VO2max (RER >1.10-1.15 a picco sforzo), valutare compliance paziente allo sforzo massimale. Criterio validita test: RER picco >1.10',
        source:
          'American Thoracic Society / American College of Chest Physicians - Official Statement CPET',
      },
      metabolicCart: {
        title: 'Metabolic Cart Standardization and Quality Control Protocols',
        recommendations:
          '<strong>Requisiti tecnici:</strong> Calibrazione quotidiana con gas standard certificati (O2 15-21%, CO2 4-6%). Verifica linearita sensori. Test con methanol burning (combustione metanolo CH3OH -> RQ teorico 0.667 per validazione accuratezza). Condizioni di misurazione: paziente a riposo >=30 min, digiuno >=4h, steady-state metabolico (variabilita VO2/VCO2 <10% su 5 min consecutivi)',
        source:
          'International Standards for Indirect Calorimetry Measurements - Quality Assurance Protocols',
      },
      weaning: {
        title: 'Weaning from Mechanical Ventilation - Role of RQ Monitoring',
        recommendations:
          '<strong>Applicazione clinica:</strong> RQ >1.0 in paziente in weaning -> aumento produzione CO2 da overfeeding -> aumento minute ventilation richiesta -> fallimento weaning per aumentato carico respiratorio. Protocollo: misurare RQ con calorimetria indiretta prima di trial di respiro spontaneo (SBT). Se RQ >1.0 -> ottimizzare nutrizione riducendo glucosio, ripetere SBT dopo 24-48h. Target: RQ 0.80-0.95 prima di tentativo estubazione',
        source:
          'Evidence-Based Guidelines for Weaning and Discontinuing Ventilatory Support - Nutritional Optimization',
      },
    },
    clinicalNote:
      "<strong>Nota sull'Applicazione Clinica delle Linee Guida:</strong> Le raccomandazioni ESPEN/ASPEN enfatizzano che la misurazione del QR tramite calorimetria indiretta dovrebbe essere standard of care in ICU per ottimizzazione nutrizione artificiale, ma nella pratica clinica l'utilizzo rimane limitato per costi apparecchiatura e necessita personale formato. In assenza di calorimetro, utilizzo di equazioni predittive (25 kcal/kg/die fase acuta) con monitoraggio clinico: glicemia, bilancio azotato, parametri antropometrici, marker infiammatori (PCR). Il QR stimato da emogasanalisi (come in questo calcolatore) ha accuratezza inferiore (+-15-20%) ma puo fornire indicazioni orientative su stato metabolico e adeguatezza nutrizione.",
  },

  // Sezione 11: Bibliografia
  bibliography: {
    title: 'Riferimenti Scientifici e Bibliografia',
    literatureTitle: 'Letteratura Scientifica Peer-Reviewed e Risorse Autorevoli',
    citations: {
      weir1949: {
        title:
          'Weir JB. "New methods for calculating metabolic rate with special reference to protein metabolism" (1949)',
        journal: '<strong>Journal of Physiology</strong> 109(1-2):1-9 - PMID: 15394301',
        description:
          "Studio fondamentale che ha derivato l'equazione di Weir per calcolo del dispendio energetico (REE) da VO2 e VCO2: REE (kcal/die) = 1.44 x [(3.941 x VO2) + (1.106 x VCO2)]. Permette stima accurata del metabolismo basale senza necessita di analisi dell'azoto urinario. Equazione ancora oggi gold standard in calorimetria indiretta",
      },
      mcclave2016: {
        title:
          'McClave SA et al. "Guidelines for the Provision and Assessment of Nutrition Support Therapy in the Adult Critically Ill Patient" (2016)',
        journal:
          '<strong>Journal of Parenteral and Enteral Nutrition</strong> 40(2):159-211 - PMID: 26773077',
        description:
          'Linee guida ASPEN per nutrizione in ICU. Raccomandazione forte (grado A) per utilizzo di calorimetria indiretta quando disponibile, preferita rispetto a formule predittive. Target calorico: evitare sia underfeeding (?mortalita, ?infezioni) che overfeeding (QR >1.0 -> iperglicemia, steatosi, difficolta weaning). Protocollo: nutrizione enterale precoce (entro 24-48h), target calorico 80-100% fabbisogno misurato',
      },
      singer2019: {
        title:
          'Singer P et al. "ESPEN guideline on clinical nutrition in the intensive care unit" (2019)',
        journal: '<strong>Clinical Nutrition</strong> 38(1):48-79 - PMID: 30348463',
        description:
          'Linee guida ESPEN aggiornate per ICU. Enfasi su individualizzazione nutrizione tramite calorimetria indiretta. Target RQ: 0.85-0.95 indica bilanciamento ottimale macronutrienti. Evidenze: overfeeding con RQ >1.0 associato a ?durata ventilazione meccanica (studio osservazionale 203 pazienti: RQ >1.0 -> +3.2 giorni ventilazione, p<0.01). Raccomandazione: ridurre glucosio se RQ >1.0, aumentare lipidi a 30-50% calorie',
      },
      brooks1994: {
        title:
          'Brooks GA, Mercier J. "Balance of carbohydrate and lipid utilization during exercise: the crossover concept" (1994)',
        journal: '<strong>Journal of Applied Physiology</strong> 76(6):2253-2261 - PMID: 8088548',
        description:
          'Teoria del "crossover point": punto di intensita esercizio (~50-60% VO2max, RER ~0.85) in cui c\'e transizione da prevalente oxidazione lipidica (bassa intensita) a glucidica (alta intensita). Meccanismi: ?catecolamine -> ?glicogenolisi, reclutamento fibre muscolari tipo II glicolitiche, limitazione disponibilita O2 per beta-oxidazione acidi grassi. Applicazione: training zones per atleti endurance',
      },
      sciencedirect: {
        title: 'ScienceDirect - Encyclopedia of Respiratory Medicine (2006)',
        journal: 'Capitolo: "Respiratory Quotient and Gas Exchange"',
        description:
          'Trattazione completa della fisiologia del quoziente respiratorio. Include: stoichiometria reazioni di ossidazione substrati energetici (carboidrati RQ 1.0, lipidi RQ 0.7, proteine RQ 0.8, etanolo RQ 0.67), differenze tra RQ tissutale e RER polmonare, fattori che influenzano misurazione (stato acido-base, iperventilazione, febbre), applicazioni cliniche (calorimetria, nutrizione, test da sforzo)',
      },
      msdmanuals: {
        title: 'MSD Manuals - Professional Version: Metabolism Section',
        journal: 'Capitolo: "Overview of Carbohydrate, Lipid and Protein Metabolism"',
        description:
          'Manuale clinico autorevole (Merck Sharp & Dohme). Sezione metabolismo copre: pathways ossidativi macronutrienti, ciclo di Krebs, catena respiratoria, regolazione ormonale (insulina/glucagone) del substrato ossidato. RQ come indicatore funzionale del metabolismo energetico. Applicazioni diagnostiche: diabete (chetoacidosi -> ?RQ), overfeeding (lipogenesi -> ?RQ), shock (anaerobiosi -> ??RQ)',
      },
      mtaweh2018: {
        title:
          'Mtaweh H et al. "Indirect calorimetry: history, technology, and application" (2018)',
        journal: '<strong>Frontiers in Pediatrics</strong> 6:257 - PMID: 30271762',
        description:
          'Review completa su storia e applicazioni della calorimetria indiretta. Tecnologie: analyzers O2 (fuel cell, paramagnetico, elettrochimico), CO2 (infrarosso NDIR), pneumotacografi. Accuratezza: +-3-5% per VO2/VCO2 con calibrazione corretta. Limitazioni: costi (15.000-50.000EUR), necessita personale formato, condizioni di steady-state. Comparazione con formule predittive: calorimetria superiore con errore medio assoluto 10-15% vs 20-30% equazioni',
      },
      simonson1990: {
        title:
          'Simonson DC, DeFronzo RA. "Indirect calorimetry: methodological and interpretative problems" (1990)',
        journal: '<strong>American Journal of Physiology</strong> 258(3):E399-E412 - PMID: 2180318',
        description:
          'Analisi critica delle limitazioni metodologiche della calorimetria. Problemi: effetto hood vs mask vs ventilatore (differenze +-5-10% VO2), variabilita temporale (necessita misurazioni >=20-30 min), effetti termici del cibo (?REE 10-15% post-prandiale durata 3-6h), stato di allenamento (atleti: ?efficienza mitocondriale -> ?VO2 relativo). Raccomandazioni standardizzazione: condizioni controllate, riposo 30 min, digiuno 4-12h, temperatura ambiente 20-25?C',
      },
    },
    qualityNote:
      "<strong>Nota sulla Qualita delle Fonti:</strong> Tutti i riferimenti citati sono stati selezionati da letteratura peer-reviewed pubblicata su riviste scientifiche indicizzate (PubMed/MEDLINE) o da fonti autorevoli di medicina basata sull'evidenza (linee guida ESPEN/ASPEN, statement societa scientifiche ATS/ACCP, manuali clinici MSD). La gerarchia dell'evidenza include: linee guida basate su revisioni sistematiche e consensus di esperti (ESPEN/ASPEN - livello massimo), studi originali pubblicati su riviste ad alto impact factor (J Appl Physiol, Clin Nutr - evidenza primaria), review e capitoli di testo da fonti validate (Encyclopedia Respiratory Medicine, MSD Manuals - sintesi consolidata). Per approfondimenti, consultare database PubMed con PMID forniti.",
  },

  // Dialogo Salvataggio
  saveDialog: {
    title: 'Salva Calcolo',
    patientInitialsLabel: 'Iniziali Paziente',
    cancel: 'Annulla',
    save: 'Salva',
  },
};
