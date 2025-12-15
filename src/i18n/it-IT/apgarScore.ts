/**
 * @file it-IT/apgarScore.ts
 * @description Traduzioni italiane per APGAR Score Calculator
 * @author Vasile Chifeac
 * @created 2025-12-12
 */

export default {
  // Titolo principale
  title: 'APGAR Score',

  // Banner informativo
  banner: {
    title: 'APGAR Score:',
    description:
      'Valutazione rapida dello stato clinico del neonato a 1, 5 e 10 minuti. Acronimo: Appearance, Pulse, Grimace, Activity, Respiration.',
  },

  // Form - Tempo di valutazione
  evaluationTime: {
    label: 'Tempo di Valutazione',
    options: {
      min1: '1 minuto',
      min5: '5 minuti',
      min10: '10 minuti',
    },
  },

  // Parameters - 5 APGAR components
  parameters: {
    appearance: {
      title: 'A - Appearance (Colorito)',
      options: {
        score0: 'Blu, pallido',
        score1: 'Corpo roseo, estremita blu',
        score2: 'Completamente roseo',
      },
    },
    pulse: {
      title: 'P - Pulse (Frequenza Cardiaca)',
      options: {
        score0: 'Assente',
        score1: '< 100 bpm',
        score2: '>= 100 bpm',
      },
    },
    grimace: {
      title: 'G - Grimace (Riflessi)',
      options: {
        score0: 'Nessuna risposta',
        score1: 'Smorfie',
        score2: 'Tosse, starnuto, pianto',
      },
    },
    activity: {
      title: 'A - Activity (Tono Muscolare)',
      options: {
        score0: 'Flaccido',
        score1: 'Qualche flessione',
        score2: 'Movimenti attivi',
      },
    },
    respiration: {
      title: 'R - Respiration (Respirazione)',
      options: {
        score0: 'Assente',
        score1: 'Debole, irregolare',
        score2: 'Buona, pianto vigoroso',
      },
    },
  },

  // Buttons
  buttons: {
    save: 'Salva {time} min',
    reset: 'Reset',
  },

  // Results
  results: {
    title: 'Risultati',
    totalScore: 'Score Totale / 10',
  },

  // Interpretations
  interpretation: {
    normal: 'Normale',
    moderate: 'Moderatamente Depresso',
    severe: 'Severamente Depresso',
  },

  // Expansion Sections
  sections: {
    definition: {
      title: 'Definizione e Significato Clinico',
      content:
        "L'<strong>APGAR Score</strong> (Virginia Apgar, 1952) valuta rapidamente la vitalita neonatale tramite 5 parametri: <strong>A</strong>ppearance (colorito), <strong>P</strong>ulse (FC), <strong>G</strong>rimace (riflessi), <strong>A</strong>ctivity (tono), <strong>R</strong>espiration (respirazione). Punteggio 0-2 per parametro, totale 0-10. Valutato a 1min (adattamento immediato) e 5min (stabilizzazione). Score 7-10: normale. 4-6: depressione moderata. 0-3: depressione severa, rianimazione urgente.",
    },

    savedEvaluations: {
      title: 'Valutazioni Salvate',
      timeLabel: '{time}min',
      scoreLabel: 'Score: {total}/10',
    },

    physiology: {
      title: 'Fisiologia Transizione Fetale-Neonatale',
      respiratory: {
        title: 'Adattamenti Respiratori:',
        text: 'Primo respiro (pressione -40/-60 cmH2O) espande polmoni, clearance liquido polmonare, attivazione surfactante. FR normale 40-60/min. Cianosi periferica (acrocianosi) normale prime 24h.',
      },
      cardiovascular: {
        title: 'Adattamenti Cardiovascolari:',
        text: 'Clampaggio cordone + espansione polmonare -> ?resistenza polmonare, ?flusso polmoni, chiusura forame ovale e dotto arterioso (10-15h). FC normale 120-160 bpm.',
      },
      cns: {
        title: 'Vulnerabilita SNC:',
        text: 'Cervello consuma 60% O2 totale. Asfissia -> encefalopatia ipossico-ischemica (HIE) -> rischio paralisi cerebrale, epilessia. Neuroprotection: ipotermia terapeutica 33-34?C x 72h riduce mortalita/disabilita ~40%.',
      },
    },

    evaluation: {
      title: 'Come si Valuta',
      timing: {
        title: 'Timing:',
        text: '1 minuto (adattamento immediato), 5 minuti (stabilizzazione/risposta interventi). Se score <7 a 5min -> ripetere ogni 5min (10, 15, 20min).',
      },
      methods: {
        title: 'Metodi:',
        text: 'Appearance (ispezione colorito), Pulse (auscultazione precordiale 6secx10 o palpazione cordone), Grimace (aspirazione nasofaringe), Activity (osservare tono/movimenti), Respiration (osservare FR, pianto).',
      },
      operators: {
        title: 'Operatori:',
        text: 'Ostetrica (parti normali), Pediatra/Neonatologo (parti a rischio, rianimazione). Personale competente rianimazione deve essere disponibile a OGNI nascita (AAP/WHO standards).',
      },
    },

    formula: {
      title: 'Formula e Componenti',
      mainFormula: 'Score APGAR = A + P + G + A + R (0-10 punti totali)',
      components: {
        appearance:
          '<strong>A - Appearance:</strong> 0=cianosi/pallore, 1=corpo roseo estremita blu, 2=completamente roseo',
        pulse: '<strong>P - Pulse:</strong> 0=assente, 1=<100 bpm, 2=>=100 bpm',
        grimace:
          '<strong>G - Grimace:</strong> 0=nessuna risposta, 1=smorfie, 2=tosse/starnuto/pianto',
        activity:
          '<strong>A - Activity:</strong> 0=flaccido, 1=qualche flessione, 2=movimenti attivi',
        respiration:
          '<strong>R - Respiration:</strong> 0=assente, 1=debole/irregolare, 2=pianto vigoroso',
      },
    },

    clinicalInterpretation: {
      title: 'Interpretazione Clinica Dettagliata',
      normal: {
        title: 'Score 7-10: Neonato Normale (Vigorous Infant)',
        significance:
          '<strong>Significato:</strong> Adattamento cardio-respiratorio ottimale. Neonato vigile, attivo, pianto forte. Score 8-9 comune (acrocianosi = -1 Appearance).',
        action:
          '<strong>Azione:</strong> Cure standard: asciugare, contatto pelle-pelle con madre, monitoraggio temperatura, allattamento precoce entro 1h. Dimissione nido dopo 24-48h se parametri stabili.',
      },
      moderate: {
        title: 'Score 4-6: Depressione Moderata (Moderately Depressed)',
        significance:
          '<strong>Significato:</strong> Difficolta transizione, possibile ipossia lieve, liquido polmonare residuo, prematurita lieve, farmaci materni (oppioidi, solfato magnesio).',
        action:
          '<strong>Azione:</strong> Stimolazione tattile vigorosa (strofinare schiena), aspirazione vie aeree, O2 supplementare 30-40% con maschera/CPAP, monitoraggio SatO2. Rivalutare APGAR 5min. Se miglioramento -> osservazione. Se persistenza -> intensificare supporto.',
      },
      severe: {
        title: '? Score 0-3: Depressione Severa (Severely Depressed)',
        significance:
          '<strong>Significato EMERGENZA:</strong> Asfissia perinatale, apnea, bradicardia/arresto cardiaco, shock. Rischio HIE elevato.',
        action:
          '<strong>Azione IMMEDIATA:</strong> (1) Ventilazione pressione positiva (PPV) con pallone Ambu + maschera O2 21-30%, FR 40-60/min, (2) Se FC<60 dopo 30sec PPV -> intubazione + compressioni toraciche 3:1 (3 compressioni:1 ventilazione), (3) Adrenalina IV/intraossea 0.01-0.03 mg/kg se FC<60 persistente, (4) Valutare volume expansion se sospetto ipovolemia/shock. APGAR 0-3 a 5min -> considerare ipotermia terapeutica se criterio HIE.',
      },
    },

    clinicalApplications: {
      title: 'Applicazioni Cliniche',
      resuscitation: {
        title: '1. Guida Rianimazione:',
        text: 'APGAR 1min identifica neonati che necessitano intervento immediato. Golden Minute: primi 60sec critici per valutazione e inizio rianimazione. Rianimazione non attende APGAR se apnea/bradicardia evidente.',
      },
      effectiveness: {
        title: '2. Valutazione Efficacia Interventi:',
        text: 'APGAR 5min misura risposta a rianimazione. Miglioramento 1min->5min (es. 3->8) = rianimazione efficace. Persistenza score basso <=3 a 5min = prognosi sfavorevole, alto rischio sequele.',
      },
      communication: {
        title: '3. Comunicazione Standardizzata:',
        text: 'Linguaggio universale per equipe (ostetrica, pediatra, infermiera). Documentazione medico-legale essenziale. Facilita handover neonato da sala parto a TIN (Terapia Intensiva Neonatale).',
      },
      research: {
        title: '4. Ricerca e Audit:',
        text: 'Database APGAR per analisi outcome perinatali, qualita assistenza, comparazioni internazionali. Screening popolazioni a rischio (diabete gestazionale, pre-eclampsia, parto pretermine).',
      },
    },

    referenceValues: {
      title: 'Valori di Riferimento e Alert',
      min1: {
        title: 'APGAR 1 minuto:',
        text: '7-10 (85-90% neonati), 4-6 (8-10%), 0-3 (1-2%). Score basso 1min puo essere transitorio, non sempre predice outcome.',
      },
      min5: {
        title: 'APGAR 5 minuti:',
        text: '7-10 (95-98% neonati), 4-6 (2-3%), 0-3 (<1%). <strong>Valore prognostico forte:</strong> Score 5min 0-3 -> mortalita neonatale x20-50, paralisi cerebrale x10-100 vs score >=7.',
      },
      alerts: {
        title: 'ALERT CRITICI:',
        text: 'Score 5min <=3 -> alto rischio HIE, valutare ipotermia terapeutica entro 6h. Score 0-3 persistente a 10-20min -> mortalita ~50%, disabilita maggiore 60-80% sopravviventi.',
      },
      confounders: {
        title: 'Fattori Confondenti:',
        text: 'Prematurita (<37 settimane) -> score piu bassi normali per immaturita SNC/polmoni. Farmaci materni (oppioidi, solfato Mg) -> depressione transitoria. Anomalie congenite (cardiopatie, ernia diaframmatica) -> score basso non da asfissia.',
      },
    },

    documentation: {
      title: 'Documentazione e Linee Guida',
      aap: {
        title: 'AAP/AHA Neonatal Resuscitation Program (NRP) 2020:',
        text: 'Raccomandazioni evidenze-based rianimazione neonatale. APGAR guida intensita interventi ma rianimazione inizia immediatamente se apnea/FC<100 alla nascita. Golden Minute critico: 0-60sec valutazione + inizio PPV se necessaria.',
      },
      who: {
        title: 'WHO Essential Newborn Care (2010):',
        text: 'Standard globale assistenza neonatale. APGAR Score obbligatorio a 1 e 5min in tutte nascite. Personale formato rianimazione disponibile sempre. Ipotermia terapeutica per HIE moderata-severa entro 6h (riduce mortalita/disabilita ~40%).',
      },
      ilcor: {
        title: 'ILCOR Consensus (2020):',
        text: 'International Liaison Committee on Resuscitation. Algoritmo rianimazione neonatale: iniziare con aria ambiente (21% O2), titolare FiO2 secondo SatO2 target. Evitare iperossia (danno radicali liberi).',
      },
      acog: {
        title: 'ACOG Committee Opinion (2015):',
        text: 'APGAR Score non deve essere usato da solo per diagnosi asfissia. Necessari criteri aggiuntivi: pH cordone <7.0, deficit basi >=12 mmol/L, encefalopatia neonatale, disfunzione multi-organo.',
      },
    },

    bibliography: {
      title: 'Riferimenti Scientifici',
      citations: {
        apgar1953: {
          title: 'Apgar V. "A proposal for a new method of evaluation of the newborn infant"',
          details:
            '(1953). Curr Res Anesth Analg 32(4):260-267. PMID: 13083014. Studio originale che introduce score. Validato su 2096 neonati, correlazione con mortalita e morbilita.',
        },
        casey2001: {
          title: 'Casey BM, et al. "The continuing value of the Apgar score"',
          details:
            '(2001). N Engl J Med 344(7):467-471. PMID: 11172187. Large cohort 151,891 neonati. Score 5min 0-3 predittore forte mortalita neonatale (OR 146 vs score 7-10) e paralisi cerebrale (OR 244).',
        },
        li2019: {
          title: 'Li F, et al. "Apgar score and long-term health outcomes"',
          details:
            '(2019). Pediatrics 143(4):e20182846. Meta-analisi 6.7M neonati. Score 5min <7 associato a ?rischio epilessia (RR 4.8), ADHD (RR 1.9), disturbi spettro autistico (RR 1.5) in follow-up 5-10 anni.',
        },
        msd: {
          title: 'MSD Manuals - Professional: Neonatal Resuscitation.',
          details:
            'Capitolo su valutazione e rianimazione neonato. Include algoritmo AAP/AHA, indicazioni intubazione, farmaci (adrenalina, volume expanders), gestione ipotermia terapeutica.',
        },
        sciencedirect: {
          title: 'ScienceDirect Encyclopedia of Infant and Early Childhood Development (2020):',
          details:
            'Capitolo "Apgar Score and Newborn Assessment". Trattazione completa storia, fisiologia transizione neonatale, limitazioni score (prematurita, farmaci, anomalie congenite), integrazione con altri assessment (pH cordone, lactato).',
        },
      },
    },
  },
};
