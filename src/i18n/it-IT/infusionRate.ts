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
};
