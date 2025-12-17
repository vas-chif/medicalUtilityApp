export default {
  // 1. TITLE & SUBTITLE
  title: 'Infusion Rate Converter',
  subtitle: 'Infusion rate conversions: mcg/kg/min ↔ mL/h for vasopressors and other drugs',

  // 2. FORM INPUT
  form: {
    sectionTitle: 'Infusion Parameters',

    // Patient Weight
    weight: {
      label: 'Body Weight',
      unit: 'kg',
      validation: 'Weight between 1-500 kg',
    },

    // Solution Concentration
    concentration: {
      label: 'Solution Concentration',
      unit: 'mg/mL',
      hint: 'Drug concentration in bag/syringe',
      validation: 'Concentration must be > 0',
    },

    // Conversion Direction
    direction: {
      label: 'Conversion Direction:',
      doseToRate: 'Dose → mL/h',
      rateToDose: 'mL/h → Dose',
    },

    // Dose Input
    dose: {
      label: 'Dose',
      validation: 'Dose must be > 0',
    },

    // Dose Unit Select
    doseUnit: {
      label: 'Dose Unit',
    },

    // Flow Rate Input
    flowRate: {
      label: 'Infusion Rate',
      unit: 'mL/h',
      validation: 'Flow rate must be > 0',
    },

    // Dose Output Unit
    doseOutputUnit: {
      label: 'Output Dose Unit',
    },

    // Vasopressor Presets
    presets: {
      title: 'Vasopressor Presets:',
      tooltipConcentration: 'Concentration',
      tooltipRange: 'Range',
    },
  },

  // 3. BUTTONS
  buttons: {
    calculate: 'Calculate',
    reset: 'Reset',
  },

  // 4. RESULTS PANEL
  resultsPanel: {
    title: 'Conversion Results',

    // Conversion Details
    details: {
      dose: 'Dose',
      flowRate: 'Infusion Rate',
      patientWeight: 'Patient Weight',
      solutionConcentration: 'Solution Concentration',
    },
  },

  // 5. THERAPEUTIC WARNINGS (4 ranges)
  therapeuticWarnings: {
    veryLow: {
      title: 'Low Dose',
      message: 'Dose below standard therapeutic range (0.01-0.5 mcg/kg/min). Verify prescription.',
    },
    therapeutic: {
      title: 'Therapeutic Range',
      message: 'Dose within standard range for vasopressors (0.01-0.5 mcg/kg/min).',
    },
    high: {
      title: 'High Dose',
      message: 'Dose above standard range. Intensive hemodynamic monitoring required.',
    },
    veryHigh: {
      title: 'Very High Dose',
      message:
        'Dose >1 mcg/kg/min indicates refractory shock. Consider second vasopressor (vasopressin/epinephrine) and corticosteroids.',
    },
  },

  // 6. FORMULA SECTION
  formula: {
    title: 'Formula Used',

    // Dose to Rate Formulas
    doseToRate: {
      title: 'Dose → mL/h:',
      mcgKgMin: 'mL/h = (dose × weight × 60) / (concentration × 1000)',
      mcgMin: 'mL/h = (dose × 60) / (concentration × 1000)',
      mgH: 'mL/h = dose / concentration',
    },

    // Rate to Dose Formulas
    rateToDose: {
      title: 'mL/h → Dose:',
      mcgKgMin: 'dose = (mL/h × concentration × 1000) / (weight × 60)',
      mcgMin: 'dose = (mL/h × concentration × 1000) / 60',
      mgH: 'dose = mL/h × concentration',
    },
  },

  // 7. EMPTY STATE
  emptyState: 'Enter patient and solution parameters to calculate infusion rate',

  // 8. VASOPRESSOR PRESETS DATA (for tooltips)
  vasopressors: {
    noradrenaline: {
      name: 'Norad',
      fullName: 'Noradrenaline',
    },
    epinephrine: {
      name: 'Adrenal',
      fullName: 'Epinephrine',
    },
    dopamine: {
      name: 'Dopam',
      fullName: 'Dopamine',
    },
    dobutamine: {
      name: 'Dobut',
      fullName: 'Dobutamine',
    },
  },
};
