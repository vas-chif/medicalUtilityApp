export default {
  // 1. TITLE & SUBTITLE
  title: 'Convertitore Velocità Infusione',
  subtitle: 'Conversioni velocità infusione: mcg/kg/min ↔ mL/h per vasopressori e altri farmaci',

  // 2. FORM INPUT
  form: {
    sectionTitle: 'Parametri Infusione',

    // Patient Weight
    weight: {
      label: 'Peso Corporeo',
      unit: 'kg',
      validation: 'Peso tra 1-500 kg',
    },

    // Solution Concentration
    concentration: {
      label: 'Concentrazione Soluzione',
      unit: 'mg/mL',
      hint: 'Concentrazione farmaco nella sacca/siringa',
      validation: 'Concentrazione deve essere > 0',
    },

    // Conversion Direction
    direction: {
      label: 'Direzione Conversione:',
      doseToRate: 'Dose → mL/h',
      rateToDose: 'mL/h → Dose',
    },

    // Dose Input
    dose: {
      label: 'Dose',
      validation: 'Dose deve essere > 0',
    },

    // Dose Unit Select
    doseUnit: {
      label: 'Unità Dose',
    },

    // Flow Rate Input
    flowRate: {
      label: 'Velocità Infusione',
      unit: 'mL/h',
      validation: 'Flow rate deve essere > 0',
    },

    // Dose Output Unit
    doseOutputUnit: {
      label: 'Unità Dose Output',
    },

    // Vasopressor Presets
    presets: {
      title: 'Preset Vasopressori:',
      tooltipConcentration: 'Concentrazione',
      tooltipRange: 'Range',
    },
  },

  // 3. BUTTONS
  buttons: {
    calculate: 'Calcola',
    reset: 'Reset',
  },

  // 4. RESULTS PANEL
  resultsPanel: {
    title: 'Risultati Conversione',

    // Conversion Details
    details: {
      dose: 'Dose',
      flowRate: 'Velocità Infusione',
      patientWeight: 'Peso Paziente',
      solutionConcentration: 'Concentrazione Soluzione',
    },
  },

  // 5. THERAPEUTIC WARNINGS (4 ranges)
  therapeuticWarnings: {
    veryLow: {
      title: 'Dose Bassa',
      message:
        'Dose inferiore al range terapeutico standard (0.01-0.5 mcg/kg/min). Verificare prescrizione.',
    },
    therapeutic: {
      title: 'Range Terapeutico',
      message: 'Dose nel range standard per vasopressori (0.01-0.5 mcg/kg/min).',
    },
    high: {
      title: 'Dose Elevata',
      message: 'Dose superiore al range standard. Monitoraggio emodinamico intensivo richiesto.',
    },
    veryHigh: {
      title: 'Dose Molto Elevata',
      message:
        'Dose >1 mcg/kg/min indica shock refrattario. Considerare secondo vasopressore (vasopressina/adrenalina) e corticosteroidi.',
    },
  },

  // 6. FORMULA SECTION
  formula: {
    title: 'Formula Utilizzata',

    // Dose to Rate Formulas
    doseToRate: {
      title: 'Dose → mL/h:',
      mcgKgMin: 'mL/h = (dose × peso × 60) / (concentrazione × 1000)',
      mcgMin: 'mL/h = (dose × 60) / (concentrazione × 1000)',
      mgH: 'mL/h = dose / concentrazione',
    },

    // Rate to Dose Formulas
    rateToDose: {
      title: 'mL/h → Dose:',
      mcgKgMin: 'dose = (mL/h × concentrazione × 1000) / (peso × 60)',
      mcgMin: 'dose = (mL/h × concentrazione × 1000) / 60',
      mgH: 'dose = mL/h × concentrazione',
    },
  },

  // 7. EMPTY STATE
  emptyState: 'Inserisci parametri paziente e soluzione per calcolare la velocità di infusione',

  // 8. VASOPRESSOR PRESETS DATA (for tooltips)
  vasopressors: {
    noradrenaline: {
      name: 'Norad',
      fullName: 'Noradrenalina',
    },
    epinephrine: {
      name: 'Adrenal',
      fullName: 'Adrenalina',
    },
    dopamine: {
      name: 'Dopam',
      fullName: 'Dopamina',
    },
    dobutamine: {
      name: 'Dobut',
      fullName: 'Dobutamina',
    },
  },

  // 9. SEZIONI DOCUMENTAZIONE (9 SEZIONI NEWS-STYLE)
  sections: {
    definition: {
      title: 'Definizione Clinica',
      content: {
        mainDefinition: {
          title: 'Definizione:',
          text: 'La velocità di infusione è il tasso di somministrazione di un farmaco tramite infusione endovenosa continua, espressa tipicamente in mL/h. La conversione tra dose farmacologica (mcg/kg/min, mg/h) e velocità di flusso volumetrico (mL/h) è essenziale per la gestione sicura di farmaci ad alto rischio come vasopressori, inotropi e sedativi in terapia intensiva.',
        },
        keyPrinciples: {
          title: 'Principi Fondamentali:',
          items: [
            '<strong>Conversione Bidirezionale:</strong> Dose ↔ mL/h permette flessibilità clinica (titolazione dose vs impostazione pompa)',
            '<strong>Normalizzazione Peso:</strong> mcg/kg/min compensa differenze antropometriche tra pazienti pediatrici/adulti',
            '<strong>Dipendenza Concentrazione:</strong> Stessa dose richiede velocità diverse con concentrazioni diverse (sicurezza volumi)',
            '<strong>Precision Medicine:</strong> Calcolo accurato riduce errori di somministrazione (principale causa eventi avversi ICU)',
          ],
        },
        clinicalImportance: {
          title: 'Importanza Clinica:',
          description:
            'Gli errori di calcolo nella velocità di infusione sono tra le cause più frequenti di eventi avversi prevenibili in terapia intensiva. La conversione accurata tra dose e flusso è critica per:',
          points: [
            '<strong>Vasopressori:</strong> Margine terapeutico stretto (0.01-1 mcg/kg/min), rischio ipotensione severa o ischemia periferica',
            '<strong>Sedativi/Analgesici:</strong> Titolazione precisa per mantenimento sedazione target (RASS -2/-3) evitando oversedation',
            '<strong>Insulina:</strong> Controllo glicemico rigido (80-180 mg/dL) richiede aggiustamenti frequenti dose/flusso',
            '<strong>Farmaci High-Alert ISMP:</strong> Noradrenalina, adrenalina, insulina, eparina, potassio concentrato (doppio controllo obbligatorio)',
          ],
        },
      },
    },
    physiology: {
      title: 'Farmacocinetica Infusione IV',
      content: {
        steadyState: {
          title: 'Steady-State e Cinetica Zero-Order:',
          description:
            "L'infusione IV continua segue cinetica di ordine zero (velocità costante R) mentre l'eliminazione segue cinetica di primo ordine (costante k). Il sistema raggiunge steady-state quando velocità infusione = velocità eliminazione.",
          equations: [
            '<strong>Concentrazione Steady-State:</strong> C<sub>SS</sub> = R / (V<sub>D</sub> × k) = R / Cl<sub>T</sub>',
            '<strong>Tempo per raggiungere CSS:</strong> t<sub>90%</sub> = 3.32 × t<sub>½</sub>, t<sub>99%</sub> = 6.64 × t<sub>½</sub>',
            '<strong>Dose di Carico:</strong> D<sub>L</sub> = V<sub>D</sub> × C<sub>SS</sub> = R / k (per raggiungere CSS immediatamente)',
            '<strong>Dopo Stop Infusione:</strong> C<sub>P</sub> = (R / V<sub>D</sub> × k) × (1 - e<sup>-k×t<sub>s</sub></sup>) × e<sup>-k×(t-t<sub>s</sub>)</sup>',
          ],
        },
        pharmacokinetics: {
          title: 'Parametri Farmacocinetici Rilevanti:',
          parameters: [
            '<strong>Volume Distribuzione (V<sub>D</sub>):</strong> Noradrenalina V<sub>D</sub> 2.5 L/kg (idrofilo, distribuzione extracellulare), Propofol V<sub>D</sub> 60 L/kg (lipofilo, ampia distribuzione)',
            '<strong>Clearance Totale (Cl<sub>T</sub>):</strong> Morfina Cl 15-30 mL/min/kg (metabolismo epatico glucuronidazione), Remifentanil Cl 40 mL/min/kg (esterasi plasmatiche context-insensitive)',
            '<strong>Emivita (t<sub>½</sub>):</strong> Noradrenalina t<sub>½</sub> 2-3 min (effetto rapido on/off), Midazolam t<sub>½</sub> 1.5-2.5h (accumulo con infusioni prolungate)',
            '<strong>Context-Sensitive Half-Time:</strong> Propofol CSHT 40min dopo 8h infusione (risveglio rapido), Fentanyl CSHT 200-300min dopo 8h (risveglio ritardato)',
          ],
        },
        doseResponse: {
          title: 'Relazione Dose-Risposta Vasopressori:',
          relationships: [
            '<strong>Noradrenalina:</strong> Effetto α1 predominante (vasocostrizione sistemica). Dose 0.01-3 mcg/kg/min, target MAP >65 mmHg shock settico',
            '<strong>Adrenalina:</strong> Effetto misto α1+β1 (vasocostrizione + inotropo). Dose 0.01-1 mcg/kg/min, prima linea shock anafilattico',
            '<strong>Dopamina:</strong> Effetto dose-dipendente: 2-5 mcg/kg/min dopaminergico renale, 5-10 β1 inotropo, >10 α1 vasopressore. Preferire noradrenalina (meno aritmogeno)',
            '<strong>Dobutamina:</strong> Effetto β1 selettivo (inotropo puro). Dose 2.5-20 mcg/kg/min per aumento gittata cardiaca shock cardiogeno',
          ],
        },
      },
    },
    measurement: {
      title: 'Tecnica Misurazione e Setup',
      content: {
        equipmentRequired: {
          title: 'Dispositivi Necessari:',
          items: [
            '<strong>Pompa Infusionale:</strong> Pompa volumetrica precisione ±5% (Alaris, Braun Perfusor), pompa siringa ±2% per flussi <5 mL/h (neonatologia)',
            '<strong>Set Infusione:</strong> Deflussore specifico pompa (microdrip 60 gtt/mL pediatria, macrodrip 15-20 gtt/mL adulti), linea dedicata farmaci high-alert',
            '<strong>Accesso Venoso:</strong> Periferico 18-20G per farmaci non irritanti, centrale (CVC/PICC) obbligatorio vasopressori/chemioterapici (pH estremi, osmolarità >600 mOsm/L)',
            '<strong>Filtri In-Line:</strong> Filtro 0.2 micron per soluzioni acquose, 1.2 micron per emulsioni lipidiche (nutrizione parenterale, propofol)',
          ],
        },
        preparationProtocol: {
          title: 'Protocollo Preparazione Infusione:',
          steps: [
            '<strong>Step 1 - Prescrizione:</strong> Verifica prescrizione completa: farmaco, dose, unità, concentrazione finale, via somministrazione, velocità iniziale',
            '<strong>Step 2 - Calcolo Doppio:</strong> Due operatori indipendenti calcolano dose/velocità. Obbligatorio ISMP high-alert drugs (noradrenalina, insulina, eparina)',
            '<strong>Step 3 - Preparazione Asettica:</strong> Cappa flusso laminare per farmaci sterili, tecnica no-touch, disinfezione tappi gomma alcool 70% 15 sec',
            '<strong>Step 4 - Etichettatura Completa:</strong> Nome farmaco, dose totale, concentrazione finale, volume, data/ora preparazione, scadenza, operatore',
            '<strong>Step 5 - Setup Pompa:</strong> Caricamento set infusione, purge aria (5-10 mL), impostazione parametri (mL/h, VTBI volume to be infused, limiti allarme)',
            '<strong>Step 6 - Connessione Paziente:</strong> Verifica identità paziente (braccialetto), connessione luer-lock (prevenzione disconnessioni), avvio infusione',
            '<strong>Step 7 - Monitoraggio:</strong> Parametri vitali continui (FC, PA, SpO2), controllo velocità ogni ora, verifica pervietà accesso venoso',
          ],
        },
        safetyChecks: {
          title: 'Checklist Sicurezza Infusione:',
          checks: [
            '<strong>5 Giusti:</strong> Farmaco giusto, Dose giusta, Via giusta, Paziente giusto, Orario giusto (+ concentrazione giusta per infusioni continue)',
            '<strong>Compatibilità Linee:</strong> Verificare compatibilità farmaci co-infusi stessa linea (precipitazione calcio-fosfato, incompatibilità pH)',
            '<strong>Backup Power:</strong> Pompa con batteria carica (minimo 2h autonomia), piano emergenza in caso blackout (continuità vasopressori critici)',
            '<strong>Limiti Allarme:</strong> Impostare allarmi pressione occlusione (pre-pump 300 mmHg, post-pump 150 mmHg), allarme bolla aria, near-empty',
          ],
        },
      },
    },
    formula: {
      title: 'Formule e Calcoli',
      content: {
        basicConversions: {
          title: 'Conversioni Base Dose ↔ Flusso:',
          formulas: [
            '<strong>mcg/kg/min → mL/h:</strong> mL/h = (Dose × Peso × 60) / (Concentrazione × 1000)',
            '<strong>mL/h → mcg/kg/min:</strong> Dose = (mL/h × Concentrazione × 1000) / (Peso × 60)',
            '<strong>mcg/min → mL/h:</strong> mL/h = (Dose × 60) / (Concentrazione × 1000)',
            '<strong>mg/h → mL/h:</strong> mL/h = Dose / Concentrazione (Esempio: insulina, morfina)',
          ],
        },
        practicalExample: {
          title: 'Esempio Pratico - Noradrenalina:',
          scenario:
            'Paziente 70 kg, shock settico, target 0.2 mcg/kg/min noradrenalina. Disponibile: noradrenalina 4 mg/250 mL (0.016 mg/mL)',
          steps: [
            '<strong>Concentrazione:</strong> 4 mg / 250 mL = 0.016 mg/mL',
            '<strong>Dose in mcg/min:</strong> 0.2 mcg/kg/min × 70 kg = 14 mcg/min',
            '<strong>Dose in mg/min:</strong> 14 mcg/min ÷ 1000 = 0.014 mg/min',
            '<strong>Velocità mL/h:</strong> (0.2 × 70 × 60) / (0.016 × 1000) = 840 / 16 = <strong>52.5 mL/h</strong>',
            '<strong>Verifica:</strong> 52.5 mL/h × 0.016 mg/mL = 0.84 mg/h = 14 mcg/min = 0.2 mcg/kg/min per 70 kg ✓',
          ],
        },
        concentrationCalculation: {
          title: 'Calcolo Concentrazione Standard:',
          standards: [
            '<strong>Noradrenalina:</strong> 4 mg (1 fiala) + SF 250 mL = 0.016 mg/mL (16 mcg/mL)',
            '<strong>Adrenalina:</strong> 4 mg (4 fiale 1mg) + SF 250 mL = 0.016 mg/mL',
            '<strong>Dopamina:</strong> 400 mg (1 fiala) + SF 250 mL = 1.6 mg/mL (1600 mcg/mL)',
            '<strong>Dobutamina:</strong> 250 mg (1 fiala) + SF 250 mL = 1.0 mg/mL (1000 mcg/mL)',
            '<strong>Insulina:</strong> 50 UI + SF 50 mL = 1 UI/mL (infusione protocollo DKA)',
          ],
        },
      },
    },
    interpretation: {
      title: 'Interpretazione Range Terapeutici',
      content: {
        vasopressorRanges: {
          title: 'Range Dose Vasopressori (mcg/kg/min):',
          drugs: [
            '<strong>Noradrenalina:</strong> 0.01-0.3 normale, 0.3-1.0 shock severo, >1.0 shock refrattario (considerare vasopressina aggiuntiva)',
            '<strong>Adrenalina:</strong> 0.01-0.5 shock anafilattico/cardiogeno, >0.5 arresto cardiaco/shock distributivo severo',
            '<strong>Dopamina:</strong> 2-5 effetto dopaminergico, 5-10 inotropo, 10-20 vasopressore (preferire noradrenalina, meno tachicardia)',
            '<strong>Dobutamina:</strong> 2.5-5 inotropo lieve, 5-10 moderato, 10-20 massimo (rischio tachicardia >110 bpm, ischemia miocardica)',
            '<strong>Vasopressina:</strong> 0.01-0.04 UI/min (non peso-dipendente) per shock refrattario noradrenalina >0.5 mcg/kg/min',
          ],
        },
        flowRateInterpretation: {
          title: 'Interpretazione Velocità Flusso:',
          guidelines: [
            '<strong>Flussi Bassi (<5 mL/h):</strong> Usare pompa siringa (precisione ±2%), rischio occlusione linee sottili pediatria',
            '<strong>Flussi Standard (5-100 mL/h):</strong> Pompa volumetrica standard, verificare autonomia batteria per infusioni prolungate >8h',
            '<strong>Flussi Elevati (>100 mL/h):</strong> Considerare concentrazione maggiore (ridurre volume, rischio overload fluidi), accesso venoso adeguato calibro',
            '<strong>Variazione Repentina:</strong> Aumento >50% dose (es 0.2→0.3 mcg/kg/min) = escalation terapeutica, valutare risposta emodinamica 5-10 min',
          ],
        },
        clinicalDecisions: {
          title: 'Decisioni Cliniche Basate su Dose:',
          decisions: [
            '<strong>Dose Crescente Noradrenalina:</strong> Se >0.5 mcg/kg/min, considerare: vasopressina add-on, ecocardiografia (disfunzione sistolica?), corticosteroidi (insufficienza surrenalica relativa)',
            '<strong>Dose Decrescente:</strong> Weaning graduale 0.05-0.1 mcg/kg/min ogni 15-30 min, MAP target >65 mmHg, evitare ipotensione rebound',
            '<strong>Plateau Risposta:</strong> Se MAP non aumenta con escalation dose, rivalutare: volemia (SVC collapsability >50%), contrattilità (FE <40%), resistenze vascolari (shock distributivo puro)',
            '<strong>Switch Vasopressori:</strong> Da dopamina a noradrenalina se FC >110 bpm, da noradrenalina a adrenalina se shock cardiogeno + ipotensione',
          ],
        },
      },
    },
    applications: {
      title: 'Applicazioni Cliniche',
      content: {
        criticalCare: {
          title: 'Terapia Intensiva - Shock Management:',
          applications: [
            '<strong>Shock Settico:</strong> Noradrenalina prima linea 0.05-0.3 mcg/kg/min per MAP >65 mmHg. Se refrattario >0.5: add vasopressina 0.03 UI/min',
            '<strong>Shock Cardiogeno:</strong> Dobutamina 2.5-10 mcg/kg/min (FE <40%) + noradrenalina 0.05-0.2 per mantenere perfusione. Monitorare lattati, SvO2',
            '<strong>Shock Anafilattico:</strong> Adrenalina IM 0.3-0.5 mg (primo line), se refrattario IV infusione 0.05-0.2 mcg/kg/min, supporto volumi aggressivo',
            '<strong>ECMO/VAD:</strong> Ridurre vasopressori gradualmente post-cannulazione ECMO. Target MAP 60-70 mmHg (perfusione non-pulsatile), monitoraggio flusso pompa',
          ],
        },
        perioperative: {
          title: 'Gestione Perioperatoria:',
          scenarios: [
            '<strong>Anestesia Totale IV (TIVA):</strong> Propofol 4-12 mg/kg/h + remifentanil 0.1-0.5 mcg/kg/min. TCI (target-controlled infusion) per Cp target 3-5 mcg/mL',
            '<strong>Sedazione Procedurale:</strong> Propofol 25-75 mcg/kg/min, titolare RASS -2 (sedato leggero). Ventilazione spontanea preservata, monitoraggio capnografia',
            '<strong>Analgesia Post-Op:</strong> Morfina IV infusione 0.5-1.5 mg/h + PCA bolus 1mg lockout 6min. Target NRS <4/10, monitorare depressione respiratoria',
            '<strong>Vasoplegi Post-Bypass:</strong> Noradrenalina 0.1-0.5 mcg/kg/min + vasopressina 0.03 UI/min per SVR >800 dynes×s/cm<sup>5</sup>',
          ],
        },
        emergency: {
          title: 'Medicina Emergenza - Situazioni Critiche:',
          protocols: [
            '<strong>Arresto Cardiaco ROSC:</strong> Adrenalina post-ROSC 0.1-0.5 mcg/kg/min per MAP >65 mmHg, evitare ipertensione (target SBP 150-160 mmHg prevenzione re-arrest)',
            '<strong>Anafilassi Refrattaria:</strong> Adrenalina infusione 0.1 mcg/kg/min se 3+ boli IM inefficaci, glucagone 1-5 mg/h se beta-bloccato',
            '<strong>Emorragia Massiva:</strong> Noradrenalina 0.1-0.3 mcg/kg/min temporanea durante resuscitation, priorità assoluta controllo sorgente bleeding',
            '<strong>Status Epilepticus:</strong> Midazolam 0.05-0.4 mg/kg/h, propofol 1-5 mg/kg/h, se refrattario pentobarbital 1-3 mg/kg/h (burst-suppression EEG)',
          ],
        },
      },
    },
    alerts: {
      title: 'Alert Sicurezza',
      content: {
        highAlertDrugs: {
          title: 'Farmaci High-Alert ISMP (Doppio Controllo):',
          drugs: [
            '<strong>Vasopressori/Inotropi:</strong> Noradrenalina, adrenalina, dopamina, dobutamina, vasopressina. Errore 10x può causare morte (ischemia acuta, aritmie maligne)',
            '<strong>Insulina IV:</strong> Errore calcolo ipoglicemia severa <40 mg/dL (coma, death). Protocollo obbligatorio, controllo glicemia ogni 1h',
            '<strong>Eparina IV:</strong> Errore dose emorragia maggiore (ICH, GI bleeding). Monitoraggio aPTT target 50-70 sec, antagonista protamina disponibile',
            '<strong>Oppioidi Infusione:</strong> Morfina, fentanyl, remifentanil. Depressione respiratoria, arresto. Monitoraggio SpO2, capnografia, naloxone pronto',
            '<strong>Potassio Concentrato:</strong> Max 40 mEq/L periferico, 80 mEq/L centrale. Velocità max 0.3 mEq/kg/h (aritmie fatali, arresto cardiaco se bolo rapido)',
          ],
        },
        commonErrors: {
          title: 'Errori Comuni e Prevenzione:',
          errors: [
            '<strong>Errore Unità (10x-100x):</strong> mcg vs mg, mL/h vs mL/min. PREVENZIONE: Sempre scrivere unità complete, doppio controllo',
            '<strong>Errore Concentrazione:</strong> Usare concentrazione stock invece finale (es 1 mg/mL vs 0.016 mg/mL norad). PREVENZIONE: Etichettare concentrazione finale chiara',
            '<strong>Errore Peso:</strong> Usare peso ideale vs attuale obesi, kg vs lb. PREVENZIONE: Peso in kg prominente su cartella, conversione automatica sistemi',
            '<strong>Errore Programmazione Pompa:</strong> Digitare velocità sbagliata, unità errata (mL/h vs mL/min). PREVENZIONE: Smart pump drug libraries con soft/hard limits',
            '<strong>Free-Flow:</strong> Infusione rapida incontrollata se pompa non anti-free-flow. PREVENZIONE: Pompe certificate, clamp manuale linea',
          ],
        },
        monitoringRequirements: {
          title: 'Monitoraggio Obbligatorio Durante Infusione:',
          requirements: [
            '<strong>Parametri Vitali:</strong> PA invasiva continua (vasopressori >0.2), FC, SpO2, capnografia (sedazione profonda), temperatura',
            '<strong>Livello Coscienza:</strong> RASS/SAS ogni 2-4h sedazione, GCS ogni 1h neurochirurgici, pupille/riflessi ogni 4-8h',
            '<strong>Funzione Organo:</strong> Diuresi ogni 1h (oliguria <0.5 mL/kg/h), lattati ogni 4-6h (ipoperfusione), bilancio idrico ogni 8-24h',
            '<strong>Site Venoso:</strong> Ispezione accesso ogni 2-4h (rossore, tumefazione, stravaso vasopressori). Linea dedicata farmaci high-alert, no interruzioni',
            '<strong>Device Pompa:</strong> Controllo velocità/pressione ogni 1h, replace set infusione ogni 96h standard/24h lipidi, batteria >20% sempre',
          ],
        },
      },
    },
    documentation: {
      title: 'Protocolli e Documentazione',
      content: {
        standardProtocols: {
          title: 'Protocolli Standard Internazionali:',
          protocols: [
            '<strong>Surviving Sepsis Campaign 2021:</strong> Noradrenalina vasopressore prima scelta shock settico (GRADE 1B). Target MAP ≥65 mmHg. Vasopressina 0.03 UI/min add-on se >0.25-0.5 norad',
            '<strong>ESICM Hemodynamic Monitoring:</strong> Ecocardiografia per assessment preload responsiveness prima escalation vasopressori. SVC collapsability >50% = hypovolemia',
            '<strong>ISMP Medication Safety:</strong> Smart pumps drug libraries con soft limits (alert) e hard limits (blocco). Independent double-check obbligatorio high-alert drugs',
            '<strong>NICE Guidelines Sepsis:</strong> Iniziare vasopressori se MAP <65 mmHg dopo 30 mL/kg crystalloids. Considerare inotropi se cardiac output basso (SvO2 <70%)',
            '<strong>AHA ACLS 2020:</strong> Post-ROSC adrenalina 0.1-0.5 mcg/kg/min, evitare ipertensione (SBP target 90-140 mmHg), titolare per MAP >65 + perfusione adeguata',
          ],
        },
        calculationTools: {
          title: 'Tools Calcolo e Risorse Online:',
          tools: [
            '<strong>MDCalc Infusion Rate:</strong> Calcolatore validato per noradrenalina, dopamina, dobutamina. Include concentrazioni standard, range terapeutici',
            '<strong>GlobalRPh Drip Rate:</strong> Database 200+ farmaci infusione, conversioni automatiche, compatibilità IV',
            '<strong>Medscape Drug Calculator:</strong> App mobile calcolo infusioni, interazioni farmacologiche, adjust renale/epatico',
            '<strong>ISMP List High-Alert Drugs:</strong> Lista aggiornata farmaci high-alert acute care/ambulatory, strategie prevenzione errori specifiche',
            '<strong>Lexicomp IV Compatibility:</strong> Database compatibilità Y-site 2500+ combinazioni farmaci, pH/osmolarità soluzioni',
          ],
        },
        documentationRequirements: {
          title: 'Requisiti Documentazione Clinica:',
          items: [
            '<strong>Prescrizione Completa:</strong> Farmaco (nome generico + commerciale), dose, unità, via, velocità, concentrazione finale, indicazione, medico prescrittore',
            '<strong>Record Preparazione:</strong> Data/ora, operatore, lotto farmaco, scadenza, tecnica asettica, controlli qualità (limpidezza, particolato)',
            '<strong>Somministrazione:</strong> Ora inizio/fine, velocità iniziale, modifiche successive (dose/velocità, orario, motivo clinico), site accesso venoso',
            '<strong>Monitoraggio Effetti:</strong> Parametri vitali (PA, FC, SpO2), risposta clinica (MAP, diuresi, lattati), eventi avversi (ipotensione, tachicardia, aritmie)',
            '<strong>Trasferimenti Paziente:</strong> Handover strutturato (farmaco, dose attuale, durata infusione, target terapeutico, prossima rivalutazione)',
          ],
        },
      },
    },
    references: {
      title: 'Riferimenti Scientifici',
      content: {
        guidelines: {
          title: 'Linee Guida Internazionali:',
          items: [
            '<strong>Surviving Sepsis Campaign (2021):</strong> "International Guidelines for Management of Sepsis and Septic Shock". Intensive Care Med. PMID: 34599691. Raccomandazioni evidence-based shock settico, vasopressori, monitoring',
            '<strong>ESICM Consensus (2014):</strong> "Hemodynamic Monitoring in the Critically Ill". Intensive Care Med. PMID: 25413799. Indicazioni monitoraggio invasivo, target emodinamici',
            '<strong>ISMP (2018):</strong> "ISMP List of High-Alert Medications in Acute Care Settings". Standard prevenzione errori farmaci ad alto rischio',
            '<strong>NICE NG51 (2016):</strong> "Sepsis: recognition, diagnosis and early management". Guidelines UK gestione sepsi, algoritmo resuscitation',
            '<strong>AHA ACLS (2020):</strong> "Advanced Cardiovascular Life Support Guidelines". Protocolli post-ROSC, vasopressori arresto cardiaco',
            '<strong>SCCM Guidelines (2018):</strong> "Clinical Practice Guidelines for Sustained Neuromuscular Blockade". Gestione sedazione, analgesia, infusioni continue ICU',
          ],
        },
        pharmacokinetics: {
          title: 'Farmacocinetica Infusioni IV:',
          articles: [
            '<strong>Loftsson T (2015):</strong> "Essential Pharmacokinetics - Basic Concepts of Pharmacokinetics". ScienceDirect. Equazioni steady-state, loading dose, context-sensitive half-time infusioni',
            '<strong>Holford NHG (1986):</strong> "Clinical Pharmacokinetics of Ethanol". Clin Pharmacokinet. PMID: 3542336. Modelli compartimentali infusione continua vs bolus',
            '<strong>Shafer SL (1991):</strong> "Pharmacokinetics of Fentanyl Administered by Computer-Controlled Infusion Pump". Anesthesiology. PMID: 1910784. Context-sensitive half-time oppioidi',
            '<strong>Bailey JM (2000):</strong> "Context-Sensitive Half-Times". Anesth Analg. PMID: 10910093. Impatto durata infusione su offset effetto farmacologico',
            '<strong>Minto CF (1997):</strong> "Pharmacokinetics and Pharmacodynamics of Remifentanil". Anesthesiology. PMID: 9024595. Metabolismo esterasi plasmatiche, infusione context-insensitive',
          ],
        },
        clinicalStudies: {
          title: 'Studi Clinici Rilevanti:',
          studies: [
            '<strong>De Backer D (2010):</strong> "Comparison of Dopamine and Norepinephrine in Septic Shock". N Engl J Med. PMID: 20200382. Studio randomizzato 1679 pazienti, noradrenalina superiore efficacia/sicurezza vs dopamina',
            '<strong>Gordon AC (2016):</strong> "VANISH Trial - Vasopressin versus Norepinephrine in Septic Shock". JAMA. PMID: 27533159. 421 pazienti, vasopressina early add-on riduce disfunzione renale',
            '<strong>Bellomo R (2018):</strong> "Norepinephrine in Septic Shock: Dose-Response and Outcomes". Intensive Care Med. Studio osservazionale 2849 pazienti, dose >0.5 associata mortalità 48%',
            '<strong>Russell JA (2008):</strong> "Vasopressin versus Norepinephrine in Septic Shock (VASST)". N Engl J Med. PMID: 18184957. Vasopressina riduce mortalità subset shock settico meno severo',
            '<strong>Levy B (2018):</strong> "Epinephrine versus Norepinephrine for Cardiogenic Shock After AMI". J Am Coll Cardiol. PMID: 30081948. 57 pazienti STEMI, adrenalina migliora cardiac index ma aumenta lattati',
          ],
        },
      },
    },
  },
};
