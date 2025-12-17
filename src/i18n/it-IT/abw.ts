/**
 * @file it-IT/abw.ts
 * @description Traduzioni italiane per ABW (Adjusted Body Weight) Calculator
 * @author Vasile Chifeac
 * @created 2025-12-15
 *
 * @references
 * - ABW Formula: IBW + 0.25 × (Actual Weight - IBW)
 * - Standard obesità: BMI ≥30 kg/m² oppure Peso > 120% IBW
 * - Samuels & Sjoblom (2017): Pediatric anesthesia weight formulas
 */

export default {
  // 1. TITOLI PRINCIPALI
  title: 'Adjusted Body Weight (ABW)',
  subtitle: 'Peso Corporeo Aggiustato',
  description: 'Calcolo peso aggiustato per gestione obesità (farmacologica e nutrizionale)',

  // 2. FORM INPUT
  form: {
    actualWeightLabel: 'Peso Attuale',
    actualWeightSuffix: 'kg',
    actualWeightRule: 'Peso tra 1-500 kg',
    actualWeightIcon: 'fitness_center',

    ibwLabel: 'Ideal Body Weight (IBW)',
    ibwSuffix: 'kg',
    ibwHint: 'Calcolato dalla tab IBW o inserisci manualmente',
    ibwRule: 'IBW tra 1-200 kg',
    ibwIcon: 'straighten',
  },

  // 3. BOTTONI
  buttons: {
    calculate: 'Calcola ABW',
    reset: 'Reset',
  },

  // 4. RISULTATI
  results: {
    title: 'Risultati ABW',
    placeholder: "Inserisci peso attuale e IBW per calcolare l'ABW",

    // Main result
    mainValue: 'kg',
    mainLabel: 'Adjusted Body Weight',

    // Details list
    details: {
      actualWeight: 'Peso Attuale',
      ibw: 'Ideal Body Weight (IBW)',
      excessWeight: 'Eccesso di Peso',
      activeWeight: 'Peso Eccesso Metabolicamente Attivo (25%)',
    },
  },

  // 5. BANNER FORMULA
  formulaBanner: {
    title: 'Formula:',
    formula: 'ABW = IBW + 0.25 × (Peso Attuale - IBW)',
    caption: "Solo il 25% dell'eccesso di peso è metabolicamente attivo",
    icon: 'functions',
  },

  // 6. SEZIONI ESPANDIBILI
  sections: {
    // Sezione Applicazioni Cliniche
    clinicalApplications: {
      title: 'Applicazioni Cliniche ABW',
      icon: 'local_hospital',
      items: [
        {
          title: 'Nutrizione Obesità (BMI >30):',
          text: 'Calcolare fabbisogno calorico e proteico su ABW, non su peso totale (previene sovralimentazione)',
        },
        {
          title: 'Farmaci Lipofili:',
          text: 'Propofol, benzodiazepine, amiodarone - dosaggio basato su ABW (accumulo nel tessuto adiposo)',
        },
        {
          title: 'Farmaci Idrofili:',
          text: 'Aminoglicosidi, vancomicina - dosaggio basato su IBW (non ABW), scarsa distribuzione nel grasso',
        },
        {
          title: 'Pediatria:',
          text: 'Formule specifiche TBW/LBW per anestesia (Samuels & Sjoblom 2017)',
        },
        {
          title: 'Criterio Obesità:',
          text: 'Peso attuale > 120% IBW oppure BMI ≥ 30 kg/m²',
        },
      ],
    },

    // Sezione Note Cliniche
    clinicalNotes: {
      title: 'Note Cliniche ABW',
      icon: 'info',
      paragraphs: [
        {
          title: 'Razionale Fisiologico:',
          text: 'Il tessuto adiposo in eccesso ha una massa metabolicamente attiva limitata. Solo circa il 25% del peso in eccesso contribuisce al metabolismo basale e al volume di distribuzione farmacologico.',
        },
        {
          title: 'Esempio Pratico:',
          text: 'Paziente 120 kg, IBW 70 kg → Eccesso 50 kg → ABW = 70 + 0.25×50 = 82.5 kg. Usare 82.5 kg per calcolo calorie/proteine, non 120 kg.',
        },
        {
          title: 'Limitazioni:',
          text: 'Formula empirica sviluppata per adulti. Per pazienti critici o pediatria considerare metodologie più accurate (LBM, FFM).',
        },
        {
          title: 'Alternativa:',
          text: 'Utilizzare FFM (fat-free mass) da impedenziometria o formule specifiche quando disponibili.',
        },
      ],
    },
  },

  // 7. SEZIONI DOCUMENTAZIONE (9 SEZIONI NEWS-STYLE)
  documentationSections: {
    definition: {
      title: 'Definizione Clinica',
      content: {
        mainDefinition: {
          title: 'Definizione:',
          text: "L'Adjusted Body Weight (ABW) è un metodo di correzione del peso corporeo utilizzato principalmente per pazienti obesi (BMI ≥30 kg/m²) nella gestione farmacologica e nutrizionale. Applica un fattore di correzione del 25% al peso in eccesso rispetto all'Ideal Body Weight (IBW), riflettendo il fatto che solo una frazione del tessuto adiposo in eccesso contribuisce al metabolismo e alla farmacocinetica.",
        },
        keyPrinciples: {
          title: 'Principi Fondamentali:',
          items: [
            '<strong>Fattore Correzione 25%:</strong> Formula empirica derivata da studi farmacocinetici su pazienti obesi, indica che ~25% tessuto adiposo eccesso è metabolicamente attivo',
            '<strong>Dosaggio Farmaci Lipofili:</strong> Propofol, benzodiazepine, amiodarone, fentanil - usare ABW per volume distribuzione aumentato nel grasso',
            '<strong>Dosaggio Farmaci Idrofili:</strong> Aminoglicosidi, vancomicina, NMB idrofilici - usare IBW o Lean Body Weight, NON ABW (scarsa penetrazione adiposa)',
            '<strong>Nutrizione Obesità:</strong> Calcolo fabbisogno calorico (20-25 kcal/kg ABW) e proteico (1.2-2 g/kg ABW) previene sovralimentazione',
          ],
        },
        clinicalImportance: {
          title: 'Importanza Clinica:',
          description:
            "L'uso scorretto del peso corporeo (attuale vs IBW vs ABW) è causa frequente di errori di dosaggio in pazienti obesi, con conseguenze gravi:",
          points: [
            '<strong>Sovradosaggio Farmaci:</strong> Usare peso attuale per farmaci idrofili (es. gentamicina 5 mg/kg su 150 kg = 750 mg) causa tossicità renale/ototossicità',
            '<strong>Sottodosaggio Anestetici:</strong> Usare IBW per propofol (2 mg/kg su 70 kg = 140 mg) causa sedazione inadeguata in paziente 150 kg',
            '<strong>Malnutrizione Paradossa:</strong> Pazienti obesi critici spesso sarcopenici, fabbisogno proteico alto (1.5-2 g/kg ABW) per prevenire catabolismo muscolare',
            '<strong>Ventilazione Protettiva:</strong> Tidal volume calcolato su Predicted Body Weight (PBW), non peso attuale, per prevenire VILI (6 mL/kg PBW)',
          ],
        },
      },
    },
    physiology: {
      title: 'Fisiologia Composizione Corporea',
      content: {
        bodyComposition: {
          title: 'Compartimenti Corporei e Obesità:',
          description:
            'Il corpo umano è composto da mass magra (FFM, fat-free mass) e massa grassa (FM). Obesità altera drasticamente questa proporzione:',
          components: [
            '<strong>Massa Magra (FFM):</strong> Muscoli, organi, ossa, acqua. Metabolicamente attiva, consume ~70% energia basale. Obesi: FFM aumentata +20-30% rispetto normopeso',
            '<strong>Massa Grassa (FM):</strong> Tessuto adiposo sottocutaneo/viscerale. Metabolicamente meno attivo (~10% energia basale), ma produce adipochine (leptina, adiponectina)',
            '<strong>Lean Body Mass (LBM):</strong> FFM + grasso essenziale (~3% uomini, ~12% donne). LBM = 1.1×ABW più accurato per dosaggio farmaci lipofili',
            '<strong>Total Body Water (TBW):</strong> ~60% peso normopeso, ~40-50% obesi. Volume distribuzione farmaci idrofili dipende da TBW (0.4-0.5 L/kg)',
          ],
        },
        pharmacokinetics: {
          title: 'Farmacocinetica Obesità:',
          parameters: [
            '<strong>Volume Distribuzione (Vd):</strong> Farmaci lipofili (propofol, fentanil, midazolam) Vd↑↑ 30-50% obesi. Farmaci idrofili (aminoglicosidi) Vd~ invariato',
            '<strong>Clearance Renale (Cl):</strong> GFR aumentata obesi giovani (+30-40% sopra 150 mL/min/1.73m²), ma spesso iperfiltrazione compensatoria pre-insufficienza renale',
            '<strong>Clearance Epatica:</strong> Flusso epatico aumentato, ma attività CYP variabile (CYP3A4↑, CYP2E1↑↑ steatosi, CYP1A2↓ obesità severa)',
            '<strong>Emivita (t½):</strong> Propofol t½ 3-12h obesi vs 2-4h normopeso (Vd↑), remifentanil t½ invariato (metabolismo esterasi plasmatiche, context-insensitive)',
          ],
        },
        metabolicChanges: {
          title: 'Alterazioni Metaboliche Obesità:',
          changes: [
            '<strong>Insulin Resistance:</strong> Iperinsulinemia compensatoria, clearance insulina ridotta, HbA1c target più stringenti (≤7% vs ≤8% normopeso)',
            '<strong>Inflammation Cronica:</strong> Tessuto adiposo produce IL-6, TNF-α, CRP elevata (>5 mg/L), stato pro-trombotico (rischio TEV 2-3x)',
            '<strong>Cardiac Output Aumentato:</strong> +0.1 L/min per ogni kg eccesso peso, ipertrofia ventricolare sinistra, disfunzione diastolica precoce',
            '<strong>Consumo O₂ Basale:</strong> REE (resting energy expenditure) aumentato 10-20% obesi, ma REE/kg peso attuale ridotto (25 vs 30 kcal/kg)',
          ],
        },
      },
    },
    measurement: {
      title: 'Tecnica Misurazione e Calcolo',
      content: {
        clinicalMeasurement: {
          title: 'Misurazione Clinica Parametri:',
          items: [
            '<strong>Peso Attuale:</strong> Bilancia calibrata (accuratezza ±0.1 kg), paziente svestito, post-minzione, mattina a digiuno per consistenza',
            '<strong>Altezza:</strong> Stadiometro (accuratezza ±0.5 cm), paziente scalzo, postura eretta, sguardo piano Francoforte, 3 misurazioni (media)',
            '<strong>BMI Calcolo:</strong> BMI = Peso(kg) / Altezza²(m²). Obesità: BMI ≥30 (WHO), ma cut-off etnici: Asiatici ≥27.5, Sud-Asiatici ≥25',
            '<strong>IBW Calcolo:</strong> Formule standard (Devine, Robinson, Miller). Uomini: 50 kg + 2.3 kg/inch sopra 5 ft. Donne: 45.5 kg + 2.3 kg/inch',
          ],
        },
        calculationFormulas: {
          title: 'Formule Calcolo ABW e Varianti:',
          steps: [
            '<strong>ABW Standard:</strong> ABW = IBW + 0.25 × (Peso Attuale - IBW). Fattore 0.25 validato per BMI 30-40, dosaggio farmaci lipofili',
            '<strong>ABW Modificato (BMI >40):</strong> ABW = IBW + 0.4 × (Peso Attuale - IBW). Obesità severa, fattore 0.4 più accurato per masse >40% eccesso',
            '<strong>Lean Body Mass (Boer):</strong> LBM (uomini) = 0.407×Peso + 0.267×Altezza - 19.2. LBM (donne) = 0.252×Peso + 0.473×Altezza - 48.3',
            '<strong>Lean Body Mass (James):</strong> LBM (uomini) = 1.1×Peso - 128×(Peso²/Altezza²). LBM (donne) = 1.07×Peso - 148×(Peso²/Altezza²)',
            '<strong>Predicted Body Weight (ARDSnet):</strong> PBW (uomini) = 50 + 0.91×(Altezza(cm) - 152.4). PBW (donne) = 45.5 + 0.91×(Altezza(cm) - 152.4)',
          ],
        },
        practicalProtocol: {
          title: 'Protocollo Decisionale Peso Dosaggio:',
          protocol: [
            '<strong>Step 1 - Identificare Obesità:</strong> BMI ≥30 oppure Peso > 120% IBW → Procedere con calcolo ABW, altrimenti usare peso attuale',
            '<strong>Step 2 - Classificare Farmaco:</strong> Lipofilo (Vd ↑ obesità) → ABW/LBM. Idrofilo (Vd invariato) → IBW. Incerto → Consultare farmacologo',
            '<strong>Step 3 - Calcolare Dose:</strong> Dose iniziale su ABW, monitorare TDM (therapeutic drug monitoring) se disponibile (es. vancomicina valle 10-20 mg/L)',
            '<strong>Step 4 - Aggiustare PRN:</strong> Rivalutare dopo 24-48h, TDM per farmaci a finestra stretta, considerare clearance renale aumentata (CrCl Cockcroft-Gault su ABW)',
          ],
        },
      },
    },
    formula: {
      title: 'Formule e Calcoli',
      content: {
        formulaDerivation: {
          title: 'Derivazione Formula ABW:',
          description:
            '<strong>ABW (kg) = IBW (kg) + 0.25 × [Peso Attuale (kg) - IBW (kg)]</strong><br>Dove IBW = Ideal Body Weight calcolato da formule antropometriche (Devine, Robinson). Il fattore 0.25 (25%) rappresenta la frazione metabolicamente attiva del tessuto adiposo in eccesso.',
          steps: [
            '<strong>Step 1 - IBW (Devine femmine):</strong> IBW = 45.5 + 2.3 × [(165-152.4)/2.54] = 45.5 + 2.3 × 4.96 = 45.5 + 11.4 = <strong>56.9 kg</strong>',
            '<strong>Step 2 - Eccesso Peso:</strong> Eccesso = 120 - 56.9 = <strong>63.1 kg</strong> (53% peso totale tessuto adiposo)',
            '<strong>Step 3 - ABW Calcolo:</strong> ABW = 56.9 + 0.25 × 63.1 = 56.9 + 15.8 = <strong>72.7 kg</strong>',
            '<strong>Step 4 - Dose Propofol:</strong> Induzione 1.5-2.5 mg/kg ABW = 1.5 × 72.7 = <strong>109 mg</strong> (vs 180 mg su peso attuale = sovradosaggio!)',
            '<strong>Step 5 - Infusione Mantenimento:</strong> 25-75 mcg/kg/min ABW = 50 × 72.7 = <strong>3.6 mg/min</strong> = <strong>218 mg/h</strong>',
          ],
        },
        practicalExamples: {
          title: 'Esempi Pratici:',
          examples: [
            '<strong>Esempio 1 - Propofol Obesità:</strong> Donna 165 cm, 120 kg, BMI 44 kg/m². IBW 56.9 kg → ABW = 56.9 + 0.25×(120-56.9) = 72.7 kg. Dose propofol: 1.5 mg/kg ABW = 109 mg (vs 180 mg su peso attuale)',
            '<strong>Esempio 2 - Gentamicina:</strong> Uomo 180 cm, 140 kg, BMI 43 kg/m². IBW 75 kg. Usare IBW NON ABW! Dose: 5 mg/kg IBW = 375 mg q24h (vs 700 mg su peso attuale = tossicità)',
            '<strong>Esempio 3 - Nutrizione Obesità Critica:</strong> Paziente 110 kg, ABW 78 kg. Calorie: 22 kcal/kg ABW = 1716 kcal/die. Proteine: 1.5 g/kg ABW = 117 g/die (permissive underfeeding)',
          ],
        },
        clinicalVariations: {
          title: 'Variazioni Cliniche Formula:',
          variations: [
            '<strong>Farmaci Lipofili (Propofol, Fentanil):</strong> Usare ABW o TBW (Total Body Weight). Vd aumentato, accumulo tessuto adiposo',
            '<strong>Farmaci Idrofili (Gentamicina, Vancomicina):</strong> Usare IBW o dosaggio mg/kg fisso. Vd invariato, tossicità se dose su TBW',
            '<strong>NMB Intermedi (Rocuronio, Vecuronio):</strong> Usare IBW. Onset ritardato obesi, durata invariata, evitare sovradosaggio',
            '<strong>Succinilcolina:</strong> Usare TBW (Total Body Weight). Aumentata colinesterasi plasmatica obesi, dose 1-1.5 mg/kg TBW sicura',
            '<strong>Nutrizione Enterale:</strong> Usare ABW per calorie (20-25 kcal/kg ABW) e proteine (1.2-2 g/kg ABW). Evitare overfeeding',
          ],
        },
      },
    },
    interpretation: {
      title: 'Interpretazione Range Pesi',
      content: {
        clinicalRanges: {
          title: 'Range Clinici ABW:',
          description: 'Classificazione WHO obesità e scelta peso per dosaggio farmaci/nutrizione.',
          ranges: [
            '<strong>Normopeso:</strong> BMI 18.5-24.9 kg/m². Peso Attuale ≈ IBW (±10%). Usare peso attuale per dosaggio farmaci',
            '<strong>Sovrappeso:</strong> BMI 25-29.9 kg/m². Peso Attuale 110-130% IBW. Considerare ABW per farmaci lipofili se BMI >27',
            '<strong>Obesità Classe I:</strong> BMI 30-34.9 kg/m². ABW obbligatorio, eccesso peso 30-50 kg tipico adulto 170 cm',
            '<strong>Obesità Classe II:</strong> BMI 35-39.9 kg/m² (obesità severa). ABW con fattore 0.3-0.4, consultare farmacologo clinico',
            '<strong>Obesità Classe III:</strong> BMI ≥40 kg/m² (obesità morbida). ABW fattore 0.4, considerare LBM da impedenziometria, TDM obbligatorio',
          ],
        },
        obesityCriteria: {
          title: 'Criteri Obesità:',
          criteria: [
            '<strong>Propofol Induzione:</strong> 1.5-2.5 mg/kg ABW (max 200 mg bolo). Infusione 25-75 mcg/kg/min ABW. Evitare >5 mg/kg/h (rischio PRIS)',
            '<strong>Fentanil Boli:</strong> 1-2 mcg/kg ABW. Infusione 0.5-2 mcg/kg/h ABW. Accumulo context-dependent, ridurre dopo 8h infusione',
            '<strong>Midazolam:</strong> 0.025-0.05 mg/kg ABW (max 2.5 mg bolo). Emivita prolungata obesi (4-8h vs 2-4h), ridurre dose 30-50%',
            '<strong>Rocuronio:</strong> 0.6-1.2 mg/kg IBW (NOT TBW!). Onset ritardato (90-120 sec vs 60 sec), durata invariata',
            '<strong>Gentamicina:</strong> 5-7 mg/kg IBW q24h (extended-interval). Dosaggio su TBW causa nefrotossicità. Target valle <1 mg/L',
          ],
        },
        clinicalSignificance: {
          title: 'Significato Clinico:',
          significance: [
            '<strong>Calorie Ipocalorica:</strong> 20-25 kcal/kg ABW/die (vs 25-30 kcal/kg normopeso). Paziente 120 kg ABW 72.7 kg → 1450-1820 kcal/die',
            '<strong>Proteine Elevate:</strong> 1.2-2 g/kg ABW/die (vs 1-1.2 g/kg normopeso). Prevenire sarcopenia/catabolismo. Target 87-145 g/die ABW 72.7 kg',
            '<strong>Permissive Underfeeding:</strong> 50-70% fabbisogno calorico, 100% fabbisogno proteico. Efficace obesi critici ridurre complicanze',
            '<strong>Monitoraggio:</strong> Bilancio azotato, albumina, prealbumina (↓50% indica malnutrizione), creatinina (↓ sarcopenia), handgrip strength',
          ],
        },
      },
    },
    applications: {
      title: 'Applicazioni Cliniche',
      content: {
        drugDosing: {
          title: 'Dosaggio Farmaci in Obesità:',
          description: 'Scelta peso corretto per categoria farmacologica.',
          categories: [
            '<strong>Lipofili (Propofol, Fentanil, Midazolam):</strong> Usare ABW. Vd aumentato, accumulo tessuto adiposo, sedazione/analgesia inadeguata se dose su IBW',
            '<strong>Idrofili (Aminoglicosidi, Vancomicina):</strong> Usare IBW. Vd invariato, nefrotossicità/ototossicità se dose su TBW',
            '<strong>NMB Intermedi (Rocuronio, Vecuronio):</strong> Usare IBW. Onset ritardato obesi ma durata invariata, evitare sovradosaggio',
            '<strong>Succinilcolina:</strong> Usare TBW. Colinesterasi plasmatica aumentata obesi, dose 1-1.5 mg/kg TBW sicura',
            '<strong>Antibiotici β-Lattamici:</strong> Dose standard (NO aggiustamento peso). PK/PD time-dependent, infusione estesa preferibile',
          ],
        },
        nutritionAssessment: {
          title: 'Valutazione Nutrizionale:',
          applications: [
            '<strong>Calorie Ipocalorica:</strong> 20-25 kcal/kg ABW/die (vs 25-30 normopeso). Paziente 120 kg ABW 72.7 kg → 1450-1820 kcal/die',
            '<strong>Proteine Elevate:</strong> 1.2-2 g/kg ABW/die (vs 1-1.2 normopeso). Prevenire sarcopenia. Target 87-145 g/die ABW 72.7 kg',
            '<strong>Permissive Underfeeding:</strong> 50-70% fabbisogno calorico, 100% proteico. Efficace ridurre complicanze obesi critici',
            '<strong>Monitoraggio Nutrizionale:</strong> Albumina, prealbumina (↓50% malnutrizione), bilancio azotato, handgrip strength',
          ],
        },
        anesthesiaProtocol: {
          title: 'Protocolli Anestesia:',
          protocols: [
            '<strong>Induzione Anestesia:</strong> Propofol 1.5-2.5 mg/kg ABW, fentanil 1-2 mcg/kg ABW, rocuronio 0.6-1.2 mg/kg IBW',
            '<strong>Mantenimento Sedazione:</strong> Propofol 25-75 mcg/kg/min ABW, remifentanil 0.05-0.2 mcg/kg/min ABW',
            '<strong>Ventilazione Protettiva:</strong> VT 6-8 mL/kg PBW (NON TBW!), PEEP 10-15 cmH2O, recruitment maneuvers',
            '<strong>Posizionamento Intraoperatorio:</strong> Rampa positioning, reverse Trendelenburg 25-30°, protezione punti pressione',
          ],
        },
      },
    },
    alerts: {
      title: 'Safety Alerts',
      content: {
        dosingErrors: {
          title: 'Errori Dosaggio:',
          description: "Errori comuni nell'uso ABW e rischi associati.",
          errors: [
            '<strong>Errore #1 - TBW per Farmaci Idrofili:</strong> Gentamicina 5 mg/kg su 150 kg = 750 mg (tossico!). CORRETTO: 5 mg/kg IBW 70 kg = 350 mg',
            '<strong>Errore #2 - IBW per Farmaci Lipofili:</strong> Propofol 2 mg/kg IBW 70 kg = 140 mg (sotto-sedazione). CORRETTO: 2 mg/kg ABW 90 kg = 180 mg',
            '<strong>Errore #3 - Tidal Volume su TBW:</strong> VT 8 mL/kg × 150 kg = 1200 mL (barotrauma!). CORRETTO: VT 6-8 mL/kg PBW 70 kg = 420-560 mL',
            '<strong>Errore #4 - Nutrizione su TBW:</strong> 30 kcal/kg × 150 kg = 4500 kcal (overfeeding). CORRETTO: 25 kcal/kg ABW 90 kg = 2250 kcal',
            '<strong>Errore #5 - NMB su TBW:</strong> Rocuronio 1 mg/kg × 150 kg = 150 mg (curarizzazione prolungata). CORRETTO: 1 mg/kg IBW 70 kg = 70 mg',
          ],
        },
        contraindications: {
          title: 'Controindicazioni e Precauzioni:',
          conditions: [
            '<strong>Obesità + Insufficienza Renale:</strong> CrCl Cockcroft-Gault sovrastima GFR se peso attuale usato. Usare ABW o IBW, monitorare creatinina sierica',
            '<strong>Obesità + Insufficienza Epatica:</strong> Clearance farmaci epatici imprevedibile (steatosi ↓CYP, cirrosi ↓↓). TDM obbligatorio propofol, midazolam',
            '<strong>Super-Obesità (BMI >50):</strong> Formule ABW/LBM non validate. Impedenziometria o DEXA scan per FFM, consulenza farmacologo clinico',
            '<strong>Obesità Pediatrica:</strong> Formule adulto NON applicabili. Usare formule specifiche (Traub-Johnson, Moore) o dosaggio mg fisso',
            '<strong>Gravidanza + Obesità:</strong> ABW non validato, volume distribuzione alterato, clearance aumentata. Considerare dosaggio standard + TDM',
          ],
        },
        monitoringRequirements: {
          title: 'Monitoraggio Richiesto:',
          requirements: [
            '<strong>TDM (Therapeutic Drug Monitoring):</strong> Vancomicina valle q3-4 giorni, aminoglicosidi valle+picco dopo dose 3-4, digossina valle settimanale',
            '<strong>Funzione Renale:</strong> Creatinina, BUN, CrCl Cockcroft-Gault (ABW) daily ICU. Urine output >0.5 mL/kg/h (su TBW, non ABW!)',
            '<strong>Funzione Epatica:</strong> AST, ALT, bilirubina, INR (se anticoagulazione). Steatosi comune obesi (30-90% prevalenza)',
            '<strong>Profondità Sedazione:</strong> RASS/SAS q4h, BIS monitoring se propofol >48h (target 40-60), daily sedation interruption protocollo ABC',
            '<strong>Stato Nutrizionale:</strong> Albumina baseline poi settimanale, prealbumina (t½ 2 giorni), transferrina, conta linfocitaria, bilancio azotato',
          ],
        },
      },
    },
    documentation: {
      title: 'Protocols and Documentation',
      content: {
        clinicalGuidelines: {
          title: 'Linee Guida Cliniche:',
          guidelines: [
            '<strong>ASA Practice Guidelines (2020):</strong> "Perioperative Management of Obese Patients". Raccomandazioni dosaggio farmaci, ventilazione, posizionamento',
            '<strong>ASPEN Guidelines (2016):</strong> "Nutrition Support in Critically Ill Obese Patients". Ipocalorica high-protein 1.2-2 g/kg ABW, permissive underfeeding',
            '<strong>ESPEN Guidelines (2019):</strong> "Obesity and Clinical Nutrition". ABW per calcolo fabbisogno, fattore stress 1.2-1.3 (vs 1.5-1.7 normopeso)',
            '<strong>SCCM/ASHP Guidelines (2016):</strong> "Analgesia and Sedation in Critically Ill Adults". Propofol 25-50 mcg/kg/min ABW, daily interruption',
            '<strong>ATS/IDSA Guidelines (2019):</strong> "Hospital-Acquired and Ventilator-Associated Pneumonia". Dosaggio antibiotici aggiustato peso, TDM vancomicina',
          ],
        },
        pharmacyProtocols: {
          title: 'Protocolli Farmacia:',
          protocols: [
            '<strong>Verifica Peso Dosaggio:</strong> Farmacista verifica quale peso usato per dose (TBW, IBW, ABW, LBM), congruenza con farmaco',
            '<strong>Alert Dosaggio Critico:</strong> Sistema genera alert automatico se dose >120% standard o <50% atteso, revisione farmacista necessaria',
            '<strong>TDM Protocol:</strong> Vancomicina valle pre-dose 4, aminoglicosidi valle+picco dose 3, aggiustamento nomogramma Hartford/AUC',
            '<strong>Documentazione EHR:</strong> Peso attuale, IBW, ABW, peso usato per dose documentati in cartella elettronica per ogni prescrizione',
          ],
        },
        documentationRequirements: {
          title: 'Requisiti Documentazione Clinica:',
          requirements: [
            '<strong>Peso Documentato:</strong> Peso attuale, altezza, BMI, IBW (formula usata), ABW (fattore 0.25 o 0.4), PBW se ventilato',
            '<strong>Scelta Peso Dosaggio:</strong> Documentare quale peso usato (TBW, IBW, ABW, LBM) per ogni farmaco, razionale decisione',
            '<strong>Dose Calcolata:</strong> Dose mg/kg, peso di riferimento, dose assoluta mg, via somministrazione, frequenza',
            '<strong>Monitoraggio TDM:</strong> Livelli farmaco (valle, picco), timing prelievo, target terapeutico, aggiustamenti dose conseguenti',
            '<strong>Rivalutazione Periodica:</strong> Peso settimanale, rivalutazione ABW se variazione >5 kg, aggiustamento dose PRN',
          ],
        },
      },
    },
    references: {
      title: 'Riferimenti Scientifici',
      content: {
        scientificStudies: {
          title: 'Studi Scientifici Fondamentali:',
          studies: [
            '<strong>Robinson JD et al (1983):</strong> "Determination of ideal body weight for drug dosage calculations". PMID:6606682. Formule IBW Devine validate 5000+ pazienti',
            '<strong>Pai MP, Paloucek FP (2000):</strong> "Aminoglycoside dosing in overweight and obese patients". PMID:10868820. IBW dosing previene nefrotossicità',
            '<strong>Winter MA et al (2012):</strong> "Impact of various body weights on aminoglycoside clearance". PMID:22378318. ABW fattore 0.4 ottimale gentamicina/tobramicina',
            '<strong>Janmahasatian S et al (2005):</strong> "Quantification of lean bodyweight". PMID:15730264. Formula LBM accurata predizione Vd farmaci lipofili',
            '<strong>Ingrande J, Lemmens HJ (2010):</strong> "Dose adjustment of anaesthetics in obese". PMID:21059128. Propofol/fentanil ABW, rocuronio IBW',
          ],
        },
        clinicalGuidelinesReferences: {
          title: 'Riferimenti Linee Guida:',
          references: [
            '<strong>ASPEN 2016:</strong> "Nutrition Support in Critically Ill Obese". JPEN. PMID:26825520. Ipocalorica 20-25 kcal/kg ABW + proteine 1.2-2 g/kg ABW',
            '<strong>ESPEN 2018:</strong> "Clinical nutrition in surgery". PMID:30348463. ABW calcolo fabbisogno, early enteral nutrition <24h',
            '<strong>ASA 2020:</strong> "Perioperative Management Obese Patients". Anesthesiology. Dosaggio farmaci, airway, VTE prophylaxis',
            '<strong>SCCM 2018:</strong> "Pain, Agitation, Sedation Guidelines". Crit Care Med. PMID:30113379. Propofol 25-50 mcg/kg/min ABW',
            '<strong>IDSA/ATS 2016:</strong> "Hospital/Ventilator Pneumonia". PMID:27418577. Aminoglicosidi IBW dosing, vancomicina loading TBW',
          ],
        },
        additionalResources: {
          title: 'Risorse Aggiuntive:',
          resources: [
            '<strong>MDCalc - ABW Calculator:</strong> Calcolatore validato ABW/LBM con guide dosaggio farmaci obesità',
            '<strong>GlobalRPh - IBW Calculator:</strong> Formule multiple (Devine, Robinson, Miller) con confronto risultati',
            '<strong>UIC Obesity Dosing Database:</strong> 150+ farmaci dosaggio specifico obesità, University Illinois Chicago',
            '<strong>Pharmacotherapy 2012 Review:</strong> "Drug dosing based on weight" Pai MP. PMID:22392830. Critica metodi peso-based',
            '<strong>UpToDate - Drug Dosing Obesity:</strong> Monografia aggiornata dosaggio farmaci obesità, TDM protocols',
          ],
        },
      },
    },
  },
};
