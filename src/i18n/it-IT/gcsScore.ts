/**
 * @file it-IT/gcsScore.ts
 * @description Traduzioni italiane per Glasgow Coma Scale Calculator
 * @author Vasile Chifeac
 * @created 2025-12-13
 *
 * @references
 * - Teasdale G, Jennett B. (1974) "Assessment of coma and impaired consciousness" Lancet 2(7872):81-84. PMID: 4136544
 * - Marmarou A, et al. (1991) "Impact of ICP instability and hypotension on outcome" J Neurosurg 75:S59-S66
 * - MRC CRASH Trial Collaborators. (2008) "Predicting outcome after TBI" BMJ 336(7641):425-429. PMID: 18270239
 * - Reith FC, et al. (2016) "Reliability of GCS in TBI" Acta Neurochir 158:123-129
 * - MSD Manuals: Traumatic Brain Injury (professional edition)
 * - ScienceDirect Encyclopedia of the Neurological Sciences (2021): "Glasgow Coma Scale"
 */

export default {
  // Titolo principale
  title: 'Glasgow Coma Scale (GCS)',

  // Banner informativo
  banner: {
    title: 'Glasgow Coma Scale (GCS):',
    description:
      'Scala standardizzata per valutazione neurologica del livello di coscienza. Range: 3-15 (3=coma profondo, 15=completamente sveglio).',
  },

  // Parameters - 3 GCS components
  parameters: {
    eye: {
      title: 'E - Eye Opening (Apertura Occhi)',
      options: {
        score4: 'Spontanea',
        score3: 'A stimolo verbale',
        score2: 'A stimolo doloroso',
        score1: 'Assente',
      },
    },
    verbal: {
      title: 'V - Verbal Response (Risposta Verbale)',
      options: {
        score5: 'Orientato e conversa',
        score4: 'Confuso / Disorientato',
        score3: 'Parole inappropriate',
        score2: 'Suoni incomprensibili',
        score1: 'Nessuna risposta',
      },
    },
    motor: {
      title: 'M - Motor Response (Risposta Motoria)',
      options: {
        score6: 'Obbedisce ai comandi',
        score5: 'Localizza stimolo doloroso',
        score4: 'Si ritrae dal dolore',
        score3: 'Flessione anomala (decorticazione)',
        score2: 'Estensione anomala (decerebrazione)',
        score1: 'Nessuna risposta',
      },
    },
  },

  // Buttons
  buttons: {
    reset: 'Reset',
  },

  // Results
  results: {
    title: 'Risultati',
    totalScore: 'GCS Total Score / 15',
    components: 'E{eye} V{verbal} M{motor}',
  },

  // Interpretations
  interpretation: {
    mild: 'TBI Lieve - Commozione',
    moderate: 'TBI Moderato - Letargia',
    severe: 'TBI Severo - Coma',
  },

  // TBI Severity descriptions
  severity: {
    gcs15: 'GCS 15: Completamente sveglio e orientato. Nessun deficit neurologico evidente.',
    mild: 'GCS 13-15: Trauma Cranico LIEVE. Commozione cerebrale, possibile perdita memoria breve termine o difficolta concentrazione. Recupero neurologico completo atteso.',
    moderate:
      'GCS 9-12: Trauma Cranico MODERATO. Paziente letargico o stuporoso. 10-20% rischio deterioramento in coma. Necessario ricovero e monitoraggio continuo.',
    severe:
      'GCS 3-8: Trauma Cranico SEVERO (COMA). Paziente non apre occhi, non obbedisce comandi, non pronuncia parole. Alta probabilita necessita intubazione e ventilazione meccanica. Massimo rischio mortalita e morbidita.',
  },

  // Expansion Sections
  sections: {
    // Sezione: Severita TBI
    severityTBI: {
      title: 'Severita Trauma Cranico',
    },

    // Sezione 1: Definizione
    definition: {
      title: 'Definizione e Significato Clinico GCS',
      mainText:
        '<strong>Glasgow Coma Scale (GCS):</strong> Sistema di valutazione oggettiva livello di coscienza sviluppato 1974 da Teasdale & Jennett (Glasgow, Scozia). Valuta 3 componenti: <strong>Eye opening (1-4)</strong>, <strong>Verbal response (1-5)</strong>, <strong>Motor response (1-6)</strong>. Punteggio totale 3-15: 13-15 TBI lieve, 9-12 moderato, 3-8 severo/coma. Gold standard mondiale valutazione neurologica acuta (trauma, stroke, coma metabolico).',
      applications:
        '<strong>Applicazioni:</strong> Triage emergenza, decisioni intubazione, monitoraggio deterioramento neurologico ICU, prognosi outcome TBI (mortalita, disabilita), comunicazione standardizzata equipe, ricerca clinica (inclusion criteria trials).',
    },

    // Sezione 2: Fisiologia
    physiology: {
      title: 'Fisiologia della Coscienza e Funzione SNC',
      consciousness:
        '<strong>Coscienza:</strong> Stato di consapevolezza se + ambiente, richiede 2 componenti: (1) <strong>Arousal</strong> (veglia) da sistema reticolare attivante ascendente (ARAS) tronco encefalico-talamo, (2) <strong>Awareness</strong> (contenuto) da corteccia cerebrale bilaterale. Lesioni ARAS -> coma (assenza arousal). Lesioni corticali diffuse -> stato vegetativo (arousal preservato, awareness perso).',
      neuralPathways:
        '<strong>Vie Nervose GCS:</strong> Eye opening: ARAS + nuclei oculomotori tronco. Verbal: corteccia frontale Broca + temporale Wernicke + vie cortico-bulbari motorie laringe. Motor: corteccia motoria primaria + vie piramidale/extrapiramidale + midollo spinale. Lesione qualunque livello -> deficit GCS corrispondente.',
    },

    // Sezione 3: Valutazione
    evaluation: {
      title: 'Come si Valuta il GCS',
      timing:
        '<strong>Timing:</strong> Valutazione iniziale emergenza, ripetere ogni 15-30min in fase acuta, ogni 1-4h in ICU secondo stabilita. Documentare score componenti separati (E4V5M6 = 15) non solo totale.',
      stimuli:
        '<strong>Stimoli:</strong> Eye: chiamata verbale -> se no risposta, stimolo doloroso. Verbal: domande orientamento (nome, luogo, data). Motor: comando ("alza braccia") -> se no risposta, stimolo doloroso (pressione letto ungueale, sterno, sovraorbitale). Usare stimolo adeguato crescente intensita.',
      operators:
        '<strong>Operatori:</strong> Medici emergenza, infermieri ICU, paramedici pre-ospedalieri. Training: riduce variabilita inter-rater (affidabilita ?=0.75-0.85 con training vs 0.50-0.65 senza). Scale pediatrica GCS-P per &lt;2 anni modifica Verbal (pianto, vocalizzazioni).',
    },

    // Sezione 4: Formula
    formula: {
      title: 'Formula e Componenti GCS',
      mainFormula: 'GCS = Eye Opening (E) + Verbal Response (V) + Motor Response (M)',
      eye: '<strong>Eye (E 1-4):</strong> 4=spontaneo, 3=a comando verbale, 2=a dolore, 1=assente',
      verbal:
        '<strong>Verbal (V 1-5):</strong> 5=orientato, 4=confuso, 3=parole inappropriate, 2=suoni incomprensibili, 1=assente',
      motor:
        '<strong>Motor (M 1-6):</strong> 6=obbedisce comandi, 5=localizza dolore, 4=ritira a dolore (flessione normale), 3=flessione anomala decorticata, 2=estensione decerebrata, 1=assente',
      range:
        '<strong>Range:</strong> Min=3 (E1V1M1 coma profondo/morte cerebrale), Max=15 (E4V5M6 normale). Modificatori: T (intubato), C (non testabile es. edema occhi).',
    },

    // Sezione 5: Interpretazione Clinica
    clinicalInterpretation: {
      title: 'Interpretazione Clinica Dettagliata',
      gcs15:
        '<strong>GCS 15 (E4V5M6):</strong> Coscienza normale, completamente sveglio e orientato. Paziente risponde appropriatamente. Esclude grave TBI ma non lesioni minori (fratture cranio, emorragie subdurali piccole).',
      mild: '<strong>GCS 13-14 (TBI Lieve):</strong> Confusione lieve, amnesia post-traumatica possibile. CT cranio indicato se: perdita coscienza, amnesia, vomito, eta &gt;65, cefalea severa, anticoagulanti (NICE Head Injury Guidelines). Prognosi: recupero completo &gt;95% casi. Sindrome post-concussiva 10-20%: cefalea, vertigini, disturbi concentrazione persistenti 3-12 mesi.',
      moderate:
        '<strong>GCS 9-12 (TBI Moderato):</strong> Letargia, obnubilamento, confusione marcata. CT cranio obbligatorio. Indicazioni ICU: deterioramento GCS, lesioni TC (contusioni, ematomi), frattura base cranica. Monitoraggio q1-2h. Prognosi: recupero buono 60-80%, disabilita moderata 10-20%, mortalita ~5-10%.',
      severe:
        '<strong>GCS 3-8 (TBI Severo/Coma):</strong> Coma, incapacita proteggere vie aeree, riflessi compromessi. <strong>Emergenza:</strong> intubazione immediata (protezione vie aeree, controllo PaCO2 target 35-40 mmHg), TC cranio urgente, ricovero ICU neurochirurgica. Monitoraggio PIC (pressione intracranica) se GCS <=8. Prognosi: mortalita 30-50%, stato vegetativo persistente 5-10%, disabilita severa 20-30%, recupero buono solo 10-20%.',
      gcs3: '<strong>GCS 3 (E1V1M1):</strong> Coma profondissimo, prognosi infausta. Possibile morte cerebrale se assenza riflessi tronco (pupillare, corneale, oculocefalico, tosse). Test apnea e EEG per conferma morte cerebrale. Considerare limitazione cure dopo discussione famiglia se prognosi neurologica recupero &lt;1%.',
    },

    // Sezione 6: Applicazioni Cliniche
    clinicalApplications: {
      title: 'Applicazioni Cliniche del GCS',
      triage:
        '<strong>1. Triage Emergenza e Decisioni Immediate:</strong> GCS <=8 -> intubazione emergenza (protezione vie aeree, controllo ventilazione). GCS 9-12 -> osservazione stretta, TC cranio, possibile ICU. GCS >=13 -> valutazione completa, TC se indicato, possibile dimissione con istruzioni head injury.',
      monitoring:
        '<strong>2. Monitoraggio Deterioramento Neurologico:</strong> ?GCS >=2 punti in 1-2h -> ALERT deterioramento neurologico. Cause: ematoma espansivo (epidurale, subdurale), edema cerebrale, erniazione transtentoriale, ipertensione intracranica, idrocefalo acuto. Azione: TC cranio urgente, consulenza neurochirurgica, considerare craniotomia decompressiva.',
      prognosis:
        '<strong>3. Prognosi Outcome TBI:</strong> GCS 3-8h post-trauma predittore forte outcome 6-12 mesi. GCS 3-5 -> mortalita ~70%, recupero favorevole &lt;5%. GCS 6-8 -> mortalita ~40%, recupero favorevole ~20%. GCS 9-12 -> mortalita ~10%, recupero favorevole ~70%. Integrazione con eta, pupille, TC Marshall score migliora predizione.',
      research:
        '<strong>4. Ricerca e Standardizzazione:</strong> GCS e criterio inclusione/esclusione trials TBI. Classificazione standardizzata permette comparazione studi internazionali. Database CRASH (Corticosteroid Randomization After Significant Head Injury) 10.000+ pazienti usa GCS come outcome primario.',
    },

    // Sezione 7: Valori di Riferimento
    referenceValues: {
      title: 'Valori di Riferimento e Alert Critici',
      classification:
        '<strong>Classificazione TBI WHO/NIH:</strong> Lieve GCS 13-15 (80% casi TBI), Moderato GCS 9-12 (10%), Severo GCS 3-8 (10%). Mortalita: lieve &lt;1%, moderato 5-10%, severo 30-50%.',
      criticalAlerts:
        '<strong>ALERT CRITICI GCS:</strong> (1) GCS <=8 -> intubazione immediata + ventilazione, (2) ?GCS >=2 punti -> TC cranio urgente + neurochirurgia, (3) GCS 3 + pupille fisse bilaterali -> prognosi infausta, morte cerebrale imminente, (4) GCS 15 -> TC se perdita coscienza anche breve (NICE guidelines).',
      limitations:
        '<strong>Limitazioni GCS:</strong> Pazienti intubati -> Verbal score non valutabile (notare GCS_T, max=10). Sedazione/farmaci -> altera score (sospendere prima valutazione quando possibile). Edema orbitale -> Eye non valutabile (GCS_C). Afasia -> Verbal ridotto non per coma. Paralisi -> Motor ridotto. Integrazione con pupille, riflessi tronco, imaging necessaria per diagnosi completa.',
    },

    // Sezione 8: Documentazione
    documentation: {
      title: 'Documentazione e Linee Guida',
      nice: '<strong>NICE Head Injury Guidelines (2023):</strong> Raccomandazioni UK evidence-based gestione trauma cranico. Indicazioni CT cranio: GCS &lt;13 iniziale, GCS &lt;15 a 2h, sospetta frattura cranica aperta/depressa, segni frattura base cranica, crisi epilettiche post-traumatiche, deficit neurologici focali, &gt;1 episodio vomito, amnesia eventi &gt;30min pre-trauma. Anticoagulanti/antiagreganti -> CT sempre anche se GCS 15.',
      btf: '<strong>Brain Trauma Foundation Guidelines (2016):</strong> Standard gestione TBI severo USA. GCS <=8 -> monitoraggio PIC (pressione intracranica, target &lt;22 mmHg), CPP (pressione perfusione cerebrale 60-70 mmHg), mantenere PaCO2 35-40 mmHg (evitare iperventilazione prolungata -> ischemia), osmoterapia (mannitolo/salina ipertonica) se ?PIC, craniotomia decompressiva se PIC refrattaria. Evitare ipotensione (PA sistolica &gt;90 mmHg), ipossia (SatO2 &gt;90%), ipotermia (normotermia target).',
      who: '<strong>WHO Classification TBI Severity (2008):</strong> Lieve (GCS 13-15), Moderato (9-12), Severo (3-8). Include anche durata perdita coscienza (LOC) e amnesia post-traumatica (PTA) come criteri ausiliari. Lieve: LOC 0-30min, PTA &lt;24h. Moderato: LOC 30min-24h, PTA 1-7 giorni. Severo: LOC &gt;24h, PTA &gt;7 giorni.',
      atls: '<strong>American College of Surgeons ATLS (2018):</strong> Advanced Trauma Life Support. GCS componente primario triage trauma. Usare GCS motore (M) se totale non disponibile. GCS motor <=5 -> trauma center Level I/II. GCS iniziale Pre-Hospital + GCS ospedaliero a 6-12h combinati predicono meglio outcome che singola misurazione.',
    },

    // Sezione 9: Bibliografia
    bibliography: {
      title: 'Riferimenti Scientifici',
      teasdale:
        '<strong>Teasdale G, Jennett B. "Assessment of coma and impaired consciousness"</strong> (1974). Lancet 2(7872):81-84. PMID: 4136544. Studio originale GCS. Validazione su 700 pazienti coma da trauma/stroke/farmaci. Inter-rater reliability ?=0.83. Predizione outcome mortalita/disabilita.',
      marmarou:
        '<strong>Marmarou A, et al. "Impact of ICP instability and hypotension on outcome"</strong> (1991). J Neurosurg 75:S59-S66. Traumatic Coma Data Bank 1030 pazienti TBI severo. GCS <=8 + ipotensione -> mortalita x2. GCS + PIC + eta modello predittivo outcome accuratezza 80%.',
      crash:
        '<strong>MRC CRASH Trial Collaborators. "Predicting outcome after TBI"</strong> (2008). BMJ 336(7641):425-429. PMID: 18270239. 10.008 pazienti TBI 40 paesi. GCS, eta, pupille predittori indipendenti mortalita 14-giorni. Calculator prognostico online validato (crash2.lshtm.ac.uk).',
      reith:
        '<strong>Reith FC, et al. "Reliability of GCS in TBI"</strong> (2016). Acta Neurochir 158:123-129. Systematic review affidabilita GCS. Inter-rater ?=0.60-0.85 (buona). Componente Motor piu affidabile (?=0.85) vs Verbal (?=0.65). Training migliora concordanza +15-20%.',
      msd: '<strong>MSD Manuals - Professional: Traumatic Brain Injury.</strong> Capitolo gestione TBI. Include GCS, classificazione severity, imaging (CT/MRI), gestione ?PIC, prognosi, riabilitazione. Algoritmi decisione intubazione, osmoterapia, neurochirurgia.',
      sciencedirect:
        '<strong>ScienceDirect Encyclopedia of the Neurological Sciences (2021):</strong> Capitolo "Glasgow Coma Scale and Consciousness Assessment". Storia GCS, neurofisiologia coscienza (ARAS, corteccia), varianti GCS (pediatrico, semplificato AVPU), limitazioni, alternative (Full Outline UnResponsiveness FOUR score).',
    },
  },
};
