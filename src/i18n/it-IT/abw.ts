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
};
