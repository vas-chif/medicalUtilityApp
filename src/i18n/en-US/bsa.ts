/**
 * @file en-US/bsa.ts
 * @description English translations for BSA Calculator
 * @author Vasile Chifeac
 * @created 2025-12-15
 *
 * @references
 * - Mosteller Formula (1987)
 * - DuBois & DuBois Formula (1916)
 * - Haycock et al. Formula (1978)
 */

export default {
  // 1. MAIN TITLES
  title: 'Body Surface Area (BSA)',
  subtitle: 'Body Surface Area',

  // 2. FORM INPUT
  form: {
    weightLabel: 'Weight',
    weightSuffix: 'kg',
    weightRule: 'Weight between 1-500 kg',
    weightIcon: 'fitness_center',

    heightLabel: 'Height',
    heightSuffix: 'cm',
    heightRule: 'Height between 1-300 cm',
    heightIcon: 'height',
  },

  // 3. BUTTONS
  buttons: {
    calculate: 'Calculate BSA',
    reset: 'Reset',
  },

  // 4. RESULTS
  results: {
    title: 'BSA Results',
    placeholder: 'Enter weight and height to calculate BSA',
    table: {
      formula: 'Formula',
      bsa: 'BSA (m²)',
      application: 'Application',
      mosteller: 'Mosteller',
      dubois: 'DuBois',
      haycock: 'Haycock',
      adultsGeneral: 'Adults (general purpose)',
      metabolicResearch: 'Metabolic research',
      pediatrics: 'Pediatrics (<15 years)',
    },
  },

  // 5. CLINICAL BANNER
  clinicalBanner: {
    title: 'Clinical Notes',
    adultsAverage: 'Average Adult Values:',
    adultsValues: 'Women ~1.6 m², Men ~1.9 m²',
    neonates: 'Full-term neonates:',
    neonatesValue: '~0.25 m²',
  },

  // 6. EXPANDABLE SECTIONS
  sections: {
    // Clinical Applications Section
    clinicalApplications: {
      title: 'BSA Clinical Applications',
      icon: 'local_hospital',
      applications: [
        {
          title: 'Chemotherapy:',
          text: 'Antineoplastic drug dosing in mg/m² (cisplatin, doxorubicin, carboplatin)',
        },
        {
          title: 'Cardiology:',
          text: 'Cardiac Index = CO / BSA (L/min/m², normal 2.5-4.0), Stroke Volume Index = SV / BSA',
        },
        {
          title: 'Nephrology:',
          text: 'GFR normalization to 1.73 m² for patient comparability',
        },
        {
          title: 'Burns:',
          text: 'TBSA% calculation for fluid requirements (Parkland formula: 4mL × weight × TBSA% in 24h)',
        },
      ],
    },

    // Formulas Section
    formulas: {
      title: 'BSA Formulas',
      icon: 'functions',
      items: [
        {
          name: 'Mosteller (1987):',
          formula: 'BSA (m²) = √[(height_cm × weight_kg) / 3600]',
        },
        {
          name: 'DuBois & DuBois (1916):',
          formula: 'BSA (m²) = 0.007184 × height_cm^0.725 × weight_kg^0.425',
        },
        {
          name: 'Haycock et al. (1978):',
          formula: 'BSA (m²) = 0.024265 × height_cm^0.3964 × weight_kg^0.5378',
        },
      ],
    },
  },
};
