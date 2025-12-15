/**
 * @file en-US/abw.ts
 * @description English translations for ABW (Adjusted Body Weight) Calculator
 * @author Vasile Chifeac
 * @created 2025-12-15
 *
 * @references
 * - ABW Formula: IBW + 0.25 × (Actual Weight - IBW)
 * - Obesity standard: BMI ≥30 kg/m² or Weight > 120% IBW
 * - Samuels & Sjoblom (2017): Pediatric anesthesia weight formulas
 */

export default {
  // 1. MAIN TITLES
  title: 'Adjusted Body Weight (ABW)',
  subtitle: 'Adjusted Body Weight',
  description:
    'Adjusted weight calculation for obesity management (pharmacological and nutritional)',

  // 2. FORM INPUT
  form: {
    actualWeightLabel: 'Actual Weight',
    actualWeightSuffix: 'kg',
    actualWeightRule: 'Weight between 1-500 kg',
    actualWeightIcon: 'fitness_center',

    ibwLabel: 'Ideal Body Weight (IBW)',
    ibwSuffix: 'kg',
    ibwHint: 'Calculated from IBW tab or enter manually',
    ibwRule: 'IBW between 1-200 kg',
    ibwIcon: 'straighten',
  },

  // 3. BUTTONS
  buttons: {
    calculate: 'Calculate ABW',
    reset: 'Reset',
  },

  // 4. RESULTS
  results: {
    title: 'ABW Results',
    placeholder: 'Enter actual weight and IBW to calculate ABW',

    // Main result
    mainValue: 'kg',
    mainLabel: 'Adjusted Body Weight',

    // Details list
    details: {
      actualWeight: 'Actual Weight',
      ibw: 'Ideal Body Weight (IBW)',
      excessWeight: 'Excess Weight',
      activeWeight: 'Metabolically Active Excess Weight (25%)',
    },
  },

  // 5. FORMULA BANNER
  formulaBanner: {
    title: 'Formula:',
    formula: 'ABW = IBW + 0.25 × (Actual Weight - IBW)',
    caption: 'Only 25% of excess weight is metabolically active',
    icon: 'functions',
  },

  // 6. EXPANDABLE SECTIONS
  sections: {
    // Clinical Applications Section
    clinicalApplications: {
      title: 'ABW Clinical Applications',
      icon: 'local_hospital',
      items: [
        {
          title: 'Obesity Nutrition (BMI >30):',
          text: 'Calculate caloric and protein requirements based on ABW, not total weight (prevents overfeeding)',
        },
        {
          title: 'Lipophilic Drugs:',
          text: 'Propofol, benzodiazepines, amiodarone - dosing based on ABW (accumulation in adipose tissue)',
        },
        {
          title: 'Hydrophilic Drugs:',
          text: 'Aminoglycosides, vancomycin - dosing based on IBW (not ABW), poor distribution in fat',
        },
        {
          title: 'Pediatrics:',
          text: 'Specific TBW/LBW formulas for anesthesia (Samuels & Sjoblom 2017)',
        },
        {
          title: 'Obesity Criteria:',
          text: 'Actual weight > 120% IBW or BMI ≥ 30 kg/m²',
        },
      ],
    },

    // Clinical Notes Section
    clinicalNotes: {
      title: 'ABW Clinical Notes',
      icon: 'info',
      paragraphs: [
        {
          title: 'Physiological Rationale:',
          text: 'Excess adipose tissue has limited metabolically active mass. Only about 25% of excess weight contributes to basal metabolism and pharmacological volume of distribution.',
        },
        {
          title: 'Practical Example:',
          text: 'Patient 120 kg, IBW 70 kg → Excess 50 kg → ABW = 70 + 0.25×50 = 82.5 kg. Use 82.5 kg for calorie/protein calculation, not 120 kg.',
        },
        {
          title: 'Limitations:',
          text: 'Empirical formula developed for adults. For critical patients or pediatrics consider more accurate methodologies (LBM, FFM).',
        },
        {
          title: 'Alternative:',
          text: 'Use FFM (fat-free mass) from bioimpedance or specific formulas when available.',
        },
      ],
    },
  },
};
