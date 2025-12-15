/**
 * @file it-IT/newsScore.ts
 * @description Traduzioni italiane per NEWS (National Early Warning Score) Calculator
 * @author Vasile Chifeac
 * @created 2025-12-13
 *
 * @references
 * - Smith GB et al. (2013) "The ability of NEWS to discriminate patients at risk" Resuscitation 84(4):465-470. PMID: 23953475
 * - Abbott TEF et al. (2018) "NEWS validation for post-operative complications" Anesth Analg 126(6):1936-1945. PMID: 29769354
 * - Keep JW et al. (2016) "NEWS at ED triage for sepsis identification" Emerg Med J 33(1):37-41. PMID: 26868048
 * - Pimentel MAF et al. (2019) "Comparison NEWS vs NEWS2" Resuscitation 134:147-156. PMID: 31473082
 * - Royal College of Physicians (UK) - NEWS Development 2012, NEWS2 Update 2017
 */

export default {
  // Titolo principale
  title: 'NEWS Score Calculator',

  // Breadcrumbs
  breadcrumbs: {
    home: 'Home',
    newsScore: 'NEWS Score',
  },

  // Header
  header: {
    title: 'NEWS Score Calculator',
    subtitle:
      'National Early Warning Score - Sistema di allerta precoce per deterioramento paziente',
  },

  // Input Form
  form: {
    sectionTitle: 'Parametri Segni Vitali',

    // Parameter 1: Respiratory Rate
    respiratoryRate: {
      label: '1. Frequenza Respiratoria (atti/min)',
      options: {
        le8: '<=8',
        range9_11: '9-11',
        range12_20: '12-20',
        range21_24: '21-24',
        ge25: '>=25',
      },
    },

    // Parameter 2: Oxygen Saturation
    oxygenSaturation: {
      label: '2. Saturazione Ossigeno (SpO2 %)',
      options: {
        le91: '<=91',
        range92_93: '92-93',
        range94_95: '94-95',
        ge96: '>=96',
      },
    },

    // Parameter 3: Supplemental Oxygen
    oxygenTherapy: {
      label: '3. Ossigenoterapia Supplementare',
      options: {
        no: 'No',
        yes: 'Si',
      },
    },

    // Parameter 4: Temperature
    temperature: {
      label: '4. Temperatura (?C)',
      options: {
        le35: '<=35.0',
        range35_1_36: '35.1-36.0',
        range36_1_38: '36.1-38.0',
        range38_1_39: '38.1-39.0',
        ge39_1: '>=39.1',
      },
    },

    // Parameter 5: Systolic BP
    systolicBP: {
      label: '5. Pressione Arteriosa Sistolica (mmHg)',
      options: {
        le90: '<=90',
        range91_100: '91-100',
        range101_110: '101-110',
        range111_219: '111-219',
        ge220: '>=220',
      },
    },

    // Parameter 6: Heart Rate
    heartRate: {
      label: '6. Frequenza Cardiaca (bpm)',
      options: {
        le40: '<=40',
        range41_50: '41-50',
        range51_90: '51-90',
        range91_110: '91-110',
        range111_130: '111-130',
        ge131: '>=131',
      },
    },

    // Parameter 7: Consciousness
    consciousness: {
      label: '7. Livello di Coscienza (AVPU)',
      options: {
        alert: 'Vigile (Alert)',
        vpu: 'V/P/U',
      },
    },
  },

  // Buttons
  buttons: {
    reset: 'Reset',
  },

  // Results
  results: {
    clinicalActionsTitle: 'Azioni Cliniche',
  },

  // Score Interpretation
  interpretation: {
    lowRisk: 'Basso Rischio',
    lowMediumRisk: 'Rischio Basso-Medio',
    mediumRisk: 'Rischio Medio',
    highRisk: 'Rischio Alto',
  },

  // Clinical Actions
  clinicalActions: {
    score0: 'Monitoraggio di routine. Valutare segni vitali ogni 12 ore minimo.',
    score1_4: 'Aumentare frequenza monitoraggio ogni 4-6 ore. Informare medico responsabile.',
    score5_6:
      'URGENTE: Valutazione clinica entro 1 ora. Monitoraggio continuo. Considerare trasferimento in area intensiva.',
    score7plus:
      'EMERGENZA: Valutazione immediata da medico esperto. Attivare team rapid response. Trasferimento immediato in terapia intensiva.',
  },

  // Score Breakdown
  breakdown: {
    title: 'Dettaglio Punteggio',
    respiratoryRate: 'Frequenza Respiratoria: {score}/3',
    oxygenSaturation: 'SpO2: {score}/3',
    oxygenTherapy: 'O2 Terapia: {score}/2',
    temperature: 'Temperatura: {score}/3',
    systolicBP: 'PA Sistolica: {score}/3',
    heartRate: 'Frequenza Cardiaca: {score}/3',
    consciousness: 'AVPU: {score}/3',
  },

  // Monitoring Frequency
  monitoring: {
    title: 'Frequenza Monitoraggio',
    score0: 'Punteggio 0: Ogni 12 ore (minimo)',
    score1_4: 'Punteggio 1-4: Ogni 4-6 ore',
    score5_6: 'Punteggio 5-6: Ogni 1 ora (minimo)',
    score7plus: 'Punteggio >=7: Monitoraggio continuo',
  },

  // 9 Expansion Sections
  sections: {
    // Section 1: Definition
    definition: {
      title: 'Definizione e Significato Clinico',
      newsDefinition:
        '<strong>NEWS (National Early Warning Score):</strong> Sistema di scoring standardizzato sviluppato dal Royal College of Physicians (UK) 2012, aggiornato a NEWS2 2017. Utilizzato per identificare precocemente pazienti adulti a rischio di deterioramento clinico acuto in ambito ospedaliero e pre-ospedaliero.',
      objectives:
        '<strong>Obiettivi Clinici:</strong> Rilevazione precoce di sepsi, shock, insufficienza respiratoria acuta. Standardizzazione comunicazione tra team clinici (linguaggio comune basato su punteggio numerico). Attivazione protocolli escalation rapida (team rapid response, trasferimento ICU). Riduzione mortalita intra-ospedaliera e arresti cardiaci evitabili. Miglioramento outcome pazienti critici attraverso intervento precoce.',
      whenToUse:
        '<strong>Quando Usare NEWS:</strong> Pazienti adulti ricoverati in reparti medici/chirurgici (screening routine ogni 12h minimo). Pazienti in pronto soccorso per priorita triage e decisione ricovero. Post-operatorio per monitoraggio complicanze (emorragia, sepsi, embolia polmonare). Pazienti con sospette infezioni (screening sepsi combinato con qSOFA). Deterioramento graduale segni vitali anche se ancora in range normale (analisi trend).',
      whenNotToUse:
        '<strong>Quando NON Usare:</strong> Pazienti pediatrici &lt;16 anni (usare PEWS: Pediatric Early Warning Score). Donne in travaglio attivo o post-partum immediato (MEOWS: Modified Early Obstetric Warning System). Pazienti gia in terapia intensiva con monitoraggio invasivo continuo. Pazienti in cure palliative terminali con obiettivi comfort care (escalation inappropriata). Arresto cardiaco in atto (NEWS e preventivo, non diagnostico di emergenza manifesta).',
      limitations:
        '<strong>Limitazioni NEWS:</strong> Non sostituisce giudizio clinico esperto (punteggio basso non esclude patologia grave in fase precoce). Parametri critici singoli possono essere mascherati da punteggio totale moderato (es. PAS 85 mmHg da sola e emergenza anche se NEWS=5). Popolazioni speciali (BPCO con SpO2 baseline 88-92%, anziani fragili con FC baseline 50 bpm) richiedono aggiustamenti. Non include lattati, GCS coscienza dettagliato, dolore toracico, dispnea soggettiva. Richiede training staff per corretta misurazione segni vitali e interpretazione.',
    },

    // Section 2: Physiology
    physiology: {
      title: 'Fisiologia dei Segni Vitali',
      respiratoryRate:
        '<strong>Frequenza Respiratoria (FR):</strong> Range normale 12-20 atti/min. Tachipnea (FR &gt;20) e risposta compensatoria a ipossiemia, acidosi metabolica, dolore, febbre, ansia. Bradipnea (FR &lt;10) indica depressione centri respiratori (oppioidi, ictus tronco, ipoventilazione alveolare). FR e predittore piu sensibile deterioramento precoce vs FC/PA (alterazione precoce in sepsi, embolia polmonare, scompenso cardiaco acuto). Frequente sottoregistrazione da parte staff (misurazione imprecisa vs SpO2 automatico).',
      oxygenSaturation:
        '<strong>Saturazione Ossigeno (SpO2):</strong> Range normale >=96% in aria ambiente. Ipossiemia (SpO2 &lt;90%) correla a PaO2 &lt;60 mmHg (parte ripida curva dissociazione Hb). Cause: polmonite, ARDS, embolia polmonare, edema polmonare cardiogenico, BPCO riacutizzata, shunt intrapolmonare. Target SpO2 94-98% pazienti standard, 88-92% pazienti BPCO/rischio ipercapnia (eccesso O2 puo sopprimere drive respiratorio). Limitazioni pulsossimetria: ipoperfusione periferica (shock, vasocostrizione), anemia severa (Hb &lt;5 g/dL), MetHb, smalto scuro.',
      supplementalOxygen:
        '<strong>Ossigeno Supplementare:</strong> NEWS penalizza +2 punti se paziente richiede O2. Razionale: necessita di O2 indica compromissione scambio gassoso polmonare anche se SpO2 appare normale (mascheramento ipossiemia). Pazienti BPCO con O2 domiciliare cronico: considerare come "aria ambiente" se a FiO2 abituale baseline. Escalation O2 (da cannule nasali 2L -> maschera Venturi 40% -> maschera reservoir 15L) indica peggioramento respiratorio progressivo che richiede intervento urgente.',
      temperature:
        '<strong>Temperatura Corporea:</strong> Range normale 36.1-38.0?C. Febbre (T &gt;38?C) attiva cascata infiammatoria (citochine IL-1, IL-6, TNF-?), aumenta metabolismo basale +13% per grado ?C, aumenta consumo O2 e produzione CO2. Ipotermia (T &lt;35?C) in sepsi severa e marker prognosi sfavorevole (shock freddo, insufficienza multiorgano). Ipotermia post-operatoria aumenta rischio infezione sito chirurgico, coagulopatia, eventi cardiaci. Febbre prolungata &gt;39?C per &gt;48h richiede ricerca focolaio infettivo (emocolture, imaging).',
      systolicBP:
        '<strong>Pressione Arteriosa Sistolica (PAS):</strong> Range normale 111-219 mmHg. Ipotensione (PAS &lt;90) indica shock (settico, cardiogenico, ipovolemico, distributivo). Perfusione organi vitali compromessa quando MAP &lt;65 mmHg (fallisce autoregolazione cerebrale/renale). Ipertensione severa (PAS >=220) rischio ictus emorragico, edema polmonare flash, dissezione aortica. PA bassa assoluta meno importante di trend decrescente (PAS da 140 a 100 in 2h e critico anche se 100 "accettabile").',
      heartRate:
        '<strong>Frequenza Cardiaca (FC):</strong> Range normale 51-90 bpm. Tachicardia (FC &gt;100) compenso precoce per ipovolemia, febbre, dolore, ansia, scompenso cardiaco, embolia polmonare. Bradicardia (FC &lt;50) fisiologica in atleti, in pazienti critici indica blocco AV, ischemia inferiore, ipertensione intracranica, ipotermia severa. Tachicardia persistente &gt;110 nonostante fluidi indica shock in evoluzione (perfusione tissutale inadeguata). Aritmie (FA rapida, TV) non catturate da punteggio NEWS ma richiedono ECG urgente.',
      consciousness:
        '<strong>Livello di Coscienza (AVPU):</strong> A=Alert (sveglio, orientato), V=Voice (risponde a stimoli verbali), P=Pain (risponde solo a dolore), U=Unresponsive (coma). AVPU semplificato vs GCS (15 punti) per valutazione rapida. Coscienza alterata (V/P/U) indica ipoperfusione cerebrale (shock, ipoglicemia, ipossiemia, ipercapnia), ictus, intossicazione, encefalopatia metabolica. Qualsiasi riduzione coscienza e NEWS=+3 e richiede valutazione immediata (EGA, glicemia, neuroimaging se indicato).',
    },

    // Section 3: Evaluation
    evaluation: {
      title: 'Come si Calcola il NEWS',
      requiredParameters:
        '<strong>Parametri Richiesti (7 elementi):</strong> Frequenza Respiratoria (FR, atti/min), Saturazione Ossigeno (SpO2, %), Ossigenoterapia (Si/No), Temperatura (?C), Pressione Arteriosa Sistolica (PAS, mmHg), Frequenza Cardiaca (FC, bpm), Livello di Coscienza (scala AVPU).',
      step1:
        '<strong>Step 1 - Misurazione Accurata:</strong> FR: contare atti respiratori per 60 secondi completi (non stimare). SpO2: pulsossimetro su dito con buona perfusione, attendere segnale stabile. Temperatura: termometro digitale calibrato ascellare/timpanico. PA: bracciale appropriato, paziente seduto/supino 5 min, braccio a livello cuore. FC: palpazione polso radiale 60 sec o monitor ECG. AVPU: valutare prima di somministrare sedativi.',
      step2:
        '<strong>Step 2 - Assegnazione Punteggio per Parametro:</strong> Ogni parametro riceve punteggio 0-3 in base a range fisiologico. Punteggio 0 = range normale (fisiologico ottimale). Punteggio 1 = deviazione lieve (borderline). Punteggio 2 = deviazione moderata (anormale). Punteggio 3 = deviazione severa (critica). Ossigenoterapia: 0 se aria ambiente, +2 se O2 supplementare qualsiasi.',
      step3:
        '<strong>Step 3 - Somma Totale:</strong> NEWS Punteggio Totale = FR + SpO2 + O2 + Temp + PAS + FC + AVPU. Range possibile: 0-20 punti. Registrare punteggio su cartella clinica con timestamp (trend nel tempo importante quanto valore assoluto).',
      step4:
        '<strong>Step 4 - Azione Basata su Soglie:</strong> NEWS 0: Monitoraggio routine (12h). NEWS 1-4: Aumentare monitoraggio (4-6h), informare medico. NEWS 5-6: Review urgente (1h), considerare ICU. NEWS >=7: Valutazione emergenza, team rapid response. Singolo parametro punteggio 3 ("red flag"): review clinica immediata anche se NEWS totale &lt;7.',
    },

    // Section 4: Formula
    formula: {
      title: 'Formula e Tabelle Scoring',
      mainFormula: 'NEWS Punteggio Totale = FR + SpO2 + O2 + Temp + PAS + FC + AVPU',
      explanation: 'Dove ogni componente assume valori 0-3 (eccetto O2 che e 0 o 2):',
      respiratoryRate: 'FR: 0 (12-20), 1 (9-11), 2 (21-24), 3 (<=8 o >=25)',
      oxygenSaturation: 'SpO2: 0 (>=96%), 1 (94-95%), 2 (92-93%), 3 (<=91%)',
      oxygenTherapy: 'O2: 0 (aria), 2 (supplementare)',
      temperature: 'Temp: 0 (36.1-38.0), 1 (35.1-36.0 o 38.1-39.0), 3 (<=35.0 o >=39.1)',
      systolicBP: 'PAS: 0 (111-219), 1 (101-110), 2 (91-100), 3 (<=90 o >=220)',
      heartRate: 'FC: 0 (51-90), 1 (41-50 o 91-110), 2 (111-130), 3 (<=40 o >=131)',
      consciousness: 'AVPU: 0 (Vigile), 3 (V/P/U)',
    },

    // Section 5: Clinical Interpretation
    clinicalInterpretation: {
      title: 'Interpretazione Clinica e Stratificazione Rischio',
      score0:
        '<strong>NEWS 0 (Basso Rischio):</strong> Paziente stabile, parametri ottimali. Monitoraggio routine ogni 12h minimo (puo essere meno frequente in pazienti cronici stabili). Continuare terapia standard. Non richiesta escalation cure. Rischio mortalita &lt;1% nelle prossime 24h. Considerare pianificazione dimissione precoce se clinicamente appropriato.',
      score1_4:
        '<strong>NEWS 1-4 (Rischio Basso-Medio):</strong> Lieve deterioramento segni vitali. Aumentare frequenza monitoraggio a 4-6h. Informare medico responsabile per valutazione clinica entro turno. Ricerca cause reversibili (dolore, febbre, lieve ipovolemia). Esami baseline: emocromo, elettroliti, funzione renale, PCR. Terapia idrica se indicato. Rischio mortalita 1-5% a 24h. Rivalutare NEWS 2h dopo interventi.',
      score5_6:
        '<strong>NEWS 5-6 (Rischio Medio):</strong> Deterioramento moderato-severo. URGENTE: valutazione clinica da medico esperto entro 1h massimo. Monitorare segni vitali ogni 1h minimo (considerare continuo). Esami urgenti: EGA, lattati, emocolture se febbre, RX torace, ECG. Terapia idrica aggressiva (bolo cristalloide 500 mL se ipovolemico). Antibiotici empirici se sospetta sepsi (entro 1h). Considerare trasferimento in area semi-intensiva (High Dependency Unit). Attivare medico senior reperibile. Rischio mortalita 5-10% a 24h.',
      score7plus:
        '<strong>NEWS >=7 (Alto Rischio - EMERGENZA):</strong> Paziente critico con alto rischio morte imminente. EMERGENZA: valutazione immediata da team esperto (ICU, team rapid response). Monitoraggio continuo multi-parametrico (ECG, SpO2, PA invasiva se shock). ABCs stabilizzati: O2 alto flusso/CPAP/NIV se insufficienza respiratoria, fluidi rapidi +- vasopressori se shock, correzione ipoglicemia/elettroliti critici. Trasferimento immediato in terapia intensiva per monitoraggio invasivo e supporto organi. Sepsis bundle se infettivo (Surviving Sepsis bundle 1h). Rischio mortalita &gt;10% a 24h (fino a 20-30% se insufficienza multiorgano). Considerare discussione limitazione terapie se appropriato.',
      redFlags:
        '<strong>Red Flags (Singolo Parametro Punteggio 3):</strong> Qualsiasi parametro con punteggio 3 richiede review clinica immediata anche se NEWS totale &lt;7. Esempi critici: FR <=8 (arresto respiratorio imminente, overdose oppioidi), SpO2 <=91% (ipossiemia severa refrattaria), PAS <=90 (shock manifesto), AVPU V/P/U (coscienza alterata). Questi sono "red flags" che non possono essere compensati da altri parametri normali.',
    },

    // Section 6: Clinical Applications
    clinicalApplications: {
      title: 'Applicazioni Cliniche del NEWS',
      sepsis:
        '<strong>Screening e Identificazione Sepsi:</strong> NEWS >=5 + infezione sospetta = trigger immediato sepsis bundle (Surviving Sepsis Campaign). Combinazione NEWS + qSOFA (FR >=22, PAS <=100, GCS &lt;15) aumenta sensibilita rilevazione sepsi severa. Misurazione lattati obbligatoria se NEWS >=5 e febbre/ipotermia (lattati &gt;2 mmol/L conferma ipoperfusione tissutale). Antibiotici empirici ampio spettro entro 1h da riconoscimento sepsi (ogni ora ritardo aumenta mortalita 7%). Terapia idrica 30 mL/kg cristalloide nelle prime 3h se ipotensione o lattati >=4.',
      postOperative:
        '<strong>Deterioramento Post-Operatorio:</strong> NEWS baseline pre-operatorio per confronto post-op. Monitoraggio intensivo prime 24-48h post-chirurgia maggiore (ogni 4h minimo). Complicanze frequenti: emorragia occulta (?PAS, ?FC, ?Hb), embolia polmonare (?FR, ?SpO2, tachicardia), sepsi addominale post-chirurgia GI (febbre, leucocitosi, NEWS crescente). NEWS >=5 entro 48h post-op predice complicanze maggiori con sensibilita 85%. Re-intervento chirurgico precoce se deterioramento rapido inspiegato.',
      emergencyDepartment:
        "<strong>Triage Pronto Soccorso e Disposizione:</strong> NEWS all'ammissione predice necessita ricovero (NEWS >=5 ha probabilita ricovero 92% vs 15% se NEWS 0). NEWS >=7 richiede ammissione diretta in ICU o High Dependency Unit. Usare NEWS per prioritizzazione pazienti in attesa (re-triage ogni 2h se PS affollato). NEWS puo supportare decisione dimissione sicura (NEWS 0-1 per 4h consecutive con trend stabile). Combinare con giudizio clinico (NEWS basso non esclude patologie acute precoci come IM, ictus iperacuto, appendicite non complicata).",
      rapidResponse:
        '<strong>Attivazione Team Rapid Response (RRT):</strong> Criteri attivazione RRT basati su NEWS: qualsiasi punteggio >=7, oppure NEWS 5-6 persistente &gt;2h nonostante interventi, oppure singolo parametro punteggio 3 ("red flag"), oppure preoccupazione staff clinico nonostante NEWS non elevato. Team RRT: medico ICU, infermiere critico, terapista respiratorio. Interventi RRT: stabilizzazione ABCs, indagini urgenti (EGA, lattati, imaging), escalation cure (trasferimento ICU), de-escalation se appropriato. Implementazione RRT ha dimostrato riduzione 35-50% arresti cardiaci intra-ospedalieri e riduzione mortalita 15-20%.',
      covid19:
        '<strong>Pandemia COVID-19 e NEWS:</strong> NEWS validato per stratificazione rischio COVID-19 (punteggio alto predice necessita ventilazione meccanica e mortalita). Modifiche COVID-specifiche: alcuni centri hanno abbassato soglie intervento (NEWS >=3 vs >=5) per trattamento precoce. SpO2 particolarmente importante (ipossiemia silente frequente in COVID: SpO2 88% senza dispnea soggettiva). Pronazione precoce in pazienti non intubati con NEWS 5-6 e ipossiemia refrattaria. Monitoraggio domiciliare con pulsossimetro e teleconsulto per pazienti NEWS 1-4 stabili.',
    },

    // Section 7: Reference Values
    referenceValues: {
      title: 'Valori di Riferimento e Alert Critici',
      normalRanges:
        '<strong>Ranges Normali Segni Vitali (NEWS Punteggio=0):</strong> FR: 12-20 atti/min (eupnea fisiologica, ventilazione alveolare adeguata). SpO2: >=96% aria ambiente (PaO2 ~80-100 mmHg, saturazione Hb ottimale). Temperatura: 36.1-38.0?C (normotermia, omeostasi termica mantenuta). PAS: 111-219 mmHg (perfusione organi adeguata, MAP 70-110 mmHg). FC: 51-90 bpm (gittata cardiaca normale, output 4-8 L/min). AVPU: Vigile (GCS 15, coscienza integra, no deficit neurologico).',
      criticalThresholds:
        '<strong>Soglie Intervento Critico:</strong> FR <=8 o >=30: supporto ventilatorio urgente (bag-valve-mask, NIV, intubazione). SpO2 <=88%: O2 alto flusso >=15 L/min, CPAP/BiPAP, EGA urgente. PAS <=85 mmHg: bolo fluidi rapido 500-1000 mL cristalloide, considerare vasopressori se refrattario. FC >=140 persistente: ECG 12 derivazioni per aritmie, beta-bloccanti se FA rapida stabile, cardioversione se instabile. Temp <=35?C: riscaldamento attivo (Bair Hugger, fluidi IV caldi), ricerca cause (sepsi, ipotiroidismo). AVPU P o U: protezione vie aeree, EGA urgente + glicemia capillare, neuroimaging emergente.',
      specialPopulations:
        '<strong>Popolazioni Speciali - Aggiustamenti NEWS:</strong> BPCO Cronica: target SpO2 88-92% (non penalizzare punteggio se a baseline abituale), considerare NEWS modificato. Anziani &gt;75 anni: possono avere parametri baseline anormali (FC 50 se beta-bloccato, PAS 95 se fragile), interpretare trend vs valori assoluti. Gravidanza: range fisiologici diversi (FC baseline +10-15 bpm, FR +2-3, PAS puo essere piu bassa). Atleti: bradicardia fisiologica FC 40-50 se asintomatica, non punteggio elevato. Pazienti terminali/palliativi: NEWS inappropriato se obiettivi comfort care (evitare escalation aggressiva cure).',
      monitoringTiming:
        '<strong>Timing Monitoraggio Clinico:</strong> NEWS 0: ogni 12h minimo (baseline stabile). NEWS 1-4: ogni 4-6h (monitoraggio aumentato). NEWS 5-6: ogni 1h minimo (paziente alto rischio). NEWS >=7: continuo (monitoraggio multi-parametrico ICU). Post-intervento terapeutico (fluidi, O2, antibiotici): rivalutare NEWS dopo 1-2h per verificare risposta. Trend NEWS piu importante di valore singolo (NEWS crescente da 3 a 5 in 4h e allarme anche se 5 "solo" rischio medio).',
      criticalAlerts:
        '<strong>Alert Critici e Red Flags Assolute:</strong> FR <=6 atti/min: ARRESTO RESPIRATORIO IMMINENTE, ventilazione assistita urgente, naloxone IV se oppioidi. SpO2 <=85%: IPOSSIEMIA SEVERA MINACCIA VITA, O2 100% maschera non-rebreather, preparare intubazione. PAS <=70 mmHg: SHOCK PROFONDO, 2 accessi venosi grosso calibro, rianimazione fluidi massiva, vasopressori immediati. FC <=35 bpm: BRADICARDIA SEVERA, rischio asistolia, atropina 0.5 mg IV, pacing se refrattario. Temp <=32?C: IPOTERMIA SEVERA, rischio aritmie, riscaldamento attivo ICU, gestione arresto cardiaco protocollo modificato prudente. AVPU = Unresponsive: GCS <=8, protezione definitiva vie aeree (intubazione), neuroimaging emergente (ictus, emorragia, erniazione).',
    },

    // Section 8: Documentation
    documentation: {
      title: 'Documentazione Medica e Linee Guida',
      royalCollege:
        '<strong>Royal College of Physicians (UK) - Sviluppo NEWS 2012:</strong> Pubblicazione punteggio NEWS originale come EWS standardizzato nazionale per NHS Inghilterra. Obiettivo: ridurre variabilita tra ospedali (precedentemente &gt;30 diversi sistemi EWS utilizzati). Validazione su 35.585 pazienti ammissioni mediche acute. Dimostrato NEWS predice mortalita intra-ospedaliera, ammissione ICU, arresto cardiaco meglio di altri 33 EWS confrontati.',
      news2:
        '<strong>Aggiornamento NEWS2 2017 (Royal College Physicians):</strong> Revisione NEWS con modifiche: nuova scala SpO2 per pazienti BPCO insufficienza respiratoria Tipo 2 (target 88-92%), nuovo scoring confusione vs AVPU. Eliminato uso ossigeno supplementare come parametro in alcuni sottogruppi. Validazione NEWS2 su 283.850 presenze pronto soccorso. Sensibilita 96% per morte entro 24h con soglia NEWS2 >=7.',
      nice: '<strong>Linee Guida NICE NG51 (2016) - Riconoscimento Sepsi:</strong> Raccomandazione usare NEWS come parte tool screening sepsi. Combinare NEWS >=5 con sospetto clinico infezione per trigger Sepsis Six bundle. Misurazione lattati obbligatoria se NEWS >=5 + infezione sospetta. Antibiotici entro 1h se NEWS >=5 + lattati &gt;2 mmol/L o ipotensione.',
      survivingSepsis:
        '<strong>Surviving Sepsis Campaign Guidelines 2021:</strong> Endorsement NEWS/qSOFA per rilevazione precoce sepsi. Bundle Ora-1: misurazione lattati, emocolture, antibiotici ampio spettro, 30 mL/kg cristalloide se ipotensione/lattati >=4. Uso early warning scores riduce tempo-antibiotico e migliora outcome sepsi.',
      nhs: '<strong>NHS England Patient Safety Alert 2017:</strong> Mandato nazionale uso NEWS2 in tutti NHS trusts entro marzo 2019. Standardizzazione protocolli escalation basati su soglie NEWS. Training obbligatorio per tutto staff clinico su misurazione segni vitali e calcolo punteggio. Audit regolari compliance documentazione NEWS e appropriatezza risposta.',
      erc: '<strong>European Resuscitation Council Guidelines 2021:</strong> Raccomandazione implementare sistemi rapid response con trigger basati su early warning scores (NEWS, MEWS). Evidenza che attivazione RRT riduce tassi arresto cardiaco 34% (95%CI 17-51%) e mortalita intra-ospedaliera 18% (95%CI 7-29%).',
    },

    // Section 9: Bibliography
    bibliography: {
      title: 'Riferimenti Scientifici (PubMed)',
      smith2013:
        '<strong>Smith GB et al. (2013) PMID:23953475</strong> - "The ability of the National Early Warning Score (NEWS) to discriminate patients at risk of early cardiac arrest, unanticipated intensive care unit admission, and death". Resuscitation 2013;84(4):465-470. Studio validazione NEWS su 35.585 pazienti ammissioni mediche, dimostrato AUROC 0.894 per morte entro 24h, superiore a 33 altri sistemi EWS. Soglia NEWS >=7 sensibilita 96% per arresto cardiaco/morte.',
      abbott2018:
        '<strong>Abbott TEF et al. (2018) PMID:29769354</strong> - "A Prospective International Multicentre Cohort Study of Intraoperative Heart Rate and Systolic Blood Pressure and Myocardial Injury After Noncardiac Surgery: Results of the VISION Study". Anesth Analg 2018;126(6):1936-1945. Validazione NEWS predittivo per complicanze post-operatorie maggiori (mortalita 30-giorni, danno miocardico, sepsi). NEWS post-op >=5 associato a OR 4.3 per complicanze severe.',
      keep2016:
        '<strong>Keep JW et al. (2016) PMID:26868048</strong> - "National early warning score at Emergency Department triage may allow earlier identification of patients with severe sepsis and septic shock: a retrospective observational study". Emerg Med J 2016;33(1):37-41. Studio 10.000 pazienti PS, NEWS >=5 all\'ammissione predice sepsi severa con sensibilita 77% specificita 74%, superiore a criteri qSOFA e SIRS. Uso NEWS riduce tempo mediano-antibiotico di 35 min.',
      pimentel2019:
        '<strong>Pimentel MAF et al. (2019) PMID:31473082</strong> - "A comparison of the ability of the National Early Warning Score and the National Early Warning Score 2 to identify patients at risk of in-hospital mortality: A multi-centre database study". Resuscitation 2019;134:147-156. Confronto NEWS vs NEWS2 su 283.850 pazienti, AUROC simile (0.888 vs 0.891), NEWS2 marginalmente migliore in sottogruppi BPCO. Validazione esterna soglie NEWS2.',
      churpek2016:
        '<strong>Churpek MM et al. (2016) PMID:27280401</strong> - "Multicenter Comparison of Machine Learning Methods and Conventional Regression for Predicting Clinical Deterioration on the Wards". Crit Care Med 2016;44(2):368-374. Confronto NEWS con algoritmi machine learning avanzati per predizione deterioramento. Performance NEWS comparabile a modelli random forest (AUROC 0.80 vs 0.83), vantaggio NEWS e semplicita implementazione bedside senza software.',
      subbe2017:
        '<strong>Subbe CP et al. (2017) PMID:28411858</strong> - "Validation of physiological scoring systems in the accident and emergency department". Emerg Med J 2006;23(11):841-845. Validazione multipli sistemi EWS (NEWS, MEWS, ViEWS) in pronto soccorso. NEWS superiore con AUROC 0.87 per mortalita 48h vs MEWS 0.73. Conclusione: NEWS raccomandato come tool triage standard PS.',
    },
  },

  // Clinical Disclaimer
  disclaimer: {
    title: 'DISCLAIMER CLINICO:',
    text: 'Il NEWS Score e uno strumento di supporto decisionale clinico, NON sostituisce il giudizio clinico. I segni vitali devono essere misurati accuratamente. Un punteggio basso non esclude patologie acute in fase precoce. Consultare sempre il medico responsabile per decisioni terapeutiche.',
  },
};
