/**
 * @file en-US/index.ts
 * @description English translations for Medical Utility Pro
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-11-06
 */

export default {
  // Common
  common: {
    home: 'Home',
    calculate: 'Calculate',
    reset: 'Reset Data',
    result: 'Result',
    results: 'Results',
    interpretation: 'Interpretation',
    formula: 'Formula',
    clinicalApplications: 'Clinical Applications',
    parameters: 'Parameters',
    normal: 'Normal',
    attention: 'Attention',
    note: 'Note',
    warning: 'Warning',
  },

  // Navigation
  nav: {
    medicalUtility: 'Medical Utility Pro',
    calculators: 'Calculators',
    apgar: 'APGAR Score',
    bmi: 'BMI',
    dosage: 'Drug Dosage',
    gfr: 'GFR (eGFR)',
    ventilation: 'Ventilation Parameters',
    drugCompatibility: 'Drug Compatibility',
    inDevelopment: 'In Development',
  },

  // Respiratory Quotient
  rq: {
    title: 'Respiratory Quotient (RQ)',
    subtitle: 'VCO₂/VO₂ - Metabolic Indicator',
    description: 'Ratio between carbon dioxide produced and oxygen consumed',
    whatMeasures: 'What RQ measures',
    whatMeasuresText:
      'Indicates the type of energy substrate oxidized by the organism (carbohydrates, fats, proteins), NOT respiratory efficiency.',

    // Form labels
    PvCO2: 'PvCO2 (Venous CO2)',
    PaCO2: 'PaCO2 (Arterial CO2)',
    HB: 'HB (Hemoglobin)',
    SaO2: 'SaO2 (Arterial O2 Saturation)',
    SvO2: 'SvO2 (Venous O2 Saturation)',
    PaO2: 'PaO2 (Arterial O2 Pressure)',
    PvO2: 'PvO2 (Venous O2 Pressure)',

    // Interpretations
    enterParameters: 'Enter parameters for calculation',
    severeAnaerobic: 'SEVERE ANAEROBIC METABOLISM - Shock',
    anaerobicMetabolism: 'Anaerobic Metabolism / Lipogenesis',
    carbMetabolism: 'Predominant Carbohydrate Metabolism',
    normalRange: 'Normal Range - Mixed Diet',
    fatMetabolism: 'Predominant Fat Metabolism',
    ketosis: 'Ketosis / Prolonged Fasting',
    nonStandard: 'Non-Standard Value',

    // Alerts
    shockAlert:
      'RQ > 1.2 suggests anaerobic metabolism. Check arterial lactate, shock status, and tissue perfusion.',
    ketosisAlert:
      'RQ < 0.7 indicates predominant use of fats/ketone bodies. Assess nutritional status and glycemia.',

    // Sections
    definitionTitle: 'Definition and Clinical Significance',
    metabolismTitle: 'Aerobic vs Anaerobic Metabolism',
    measurementTitle: 'How to Measure VCO₂/VO₂',
    formulaTitle: '🧮 Formula Used',
    detailedAnalysisTitle: '🔬 Detailed Analysis and Applications',
  },

  // Mechanical Power
  mp: {
    title: 'Mechanical Power',
    subtitle: 'Mechanical power delivered by the ventilator',
    description: 'Energy transferred from the ventilator to the respiratory system per unit time',

    // Coming from web research - will be populated after step 7
  },

  // Validation messages
  validation: {
    positiveValue: 'Enter positive value',
    percentage: 'Value between 0-100%',
    required: 'Required field',
  },
};
