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

  // eGFR Calculator
  egfr: {
    bannerTitle: 'What eGFR measures',
    bannerText: 'Estimated Glomerular Filtration Rate - main parameter to describe kidney function',
    patientParameters: 'Patient Parameters',
    creatinine: 'Serum Creatinine',
    creatinineValidation: 'Creatinine between 0.1-20 mg/dL',
    age: 'Age',
    ageValidation: 'Age between 1-120 years',
    gender: 'Gender',
    genderValidation: 'Select gender',
    race: 'Ethnicity (optional correction)',
    formula: 'Calculation Formula',
    male: 'Male',
    female: 'Female',
    caucasian: 'Caucasian/Other',
    african: 'African American',
    ckdepiFormula: 'CKD-EPI (Recommended)',
    mdrdFormula: 'MDRD (4-variables)',
    formulaLabel: 'Formula',
    ckdStage: 'CKD Stage',
    renalFunction: 'Renal Function Level',
    compareFormulas: 'Compare Formulas',
    ckdClassification: '📚 CKD Stage Classification',
    stage1: 'Stage 1',
    stage1Desc: 'Normal function',
    stage2: 'Stage 2',
    stage2Desc: 'Mild reduction',
    stage3a: 'Stage 3a',
    stage3aDesc: 'Moderate reduction',
    stage3b: 'Stage 3b',
    stage3bDesc: 'Moderate-severe reduction',
    stage4: 'Stage 4',
    stage4Desc: 'Severe reduction',
    stage5: 'Stage 5',
    stage5Desc: 'End-stage renal disease',
    clinicalNotes: '💡 Clinical Notes',
    notes90: 'Normal kidney function. Routine monitoring if risk factors present.',
    notes60: 'Mild kidney function reduction. Assess kidney damage and risk factors.',
    notes45: 'Moderate kidney function reduction. Nephrology evaluation and complication management needed.',
    notes30: 'Moderate-severe reduction. Prepare for renal replacement therapy. Monitor CKD complications.',
    notes15: 'Severe kidney function reduction. Urgent preparation for dialysis or transplant.',
    notes0: 'End-stage renal disease. Immediate renal replacement therapy required (dialysis/transplant).',
    elderlyNote: 'Note: Consider physiological decline in kidney function in elderly patients.',
  },

  // Creatinine Clearance Calculator
  crcl: {
    bannerTitle: 'What CrCl measures',
    bannerText: 'Creatinine Clearance using Cockcroft-Gault - used for drug dosing adjustments',
    patientParameters: 'Patient Parameters',
    creatinine: 'Serum Creatinine',
    creatinineValidation: 'Creatinine between 0.1-20 mg/dL',
    age: 'Age',
    ageValidation: 'Age between 1-120 years',
    weight: 'Weight',
    weightValidation: 'Weight between 1-500 kg',
    gender: 'Gender',
    genderValidation: 'Select gender',
    male: 'Male',
    female: 'Female',
    cockcroftGault: 'Cockcroft-Gault Formula',
    renalFunction: 'Renal Function',
    visualScale: 'Visual Scale',
    drugDosing: '💊 Drug Dosing Adjustment',
    classification: '📚 Renal Function Classification',
    normal: 'Normal',
    normalDesc: 'No dose adjustment needed',
    mild: 'Mild Impairment',
    mildDesc: 'May require dose adjustment for some drugs',
    moderate: 'Moderate Impairment',
    moderateDesc: 'Dose adjustment required for most renally eliminated drugs',
    severe: 'Severe Impairment',
    severeDesc: 'Significant dose reduction required, consider alternative drugs',
    esrd: 'End-Stage Renal Disease',
    esrdDesc: 'Most drugs require significant adjustment or are contraindicated',
    formulaTitle: '🧮 Formula Used',
    cockcroftGaultFormula: 'Cockcroft-Gault (1976)',
    ifFemale: 'if female',
    formulaNote: 'Note: Not normalized for body surface area. Primarily used for drug dosing.',
    dosingNormal: 'Normal kidney function. Standard drug dosing applies.',
    dosingMild: 'Mild impairment. Review drug monographs for specific adjustments.',
    dosingModerate: 'Moderate impairment. Most renally eliminated drugs require dose reduction (typically 25-50%).',
    dosingSevere: 'Severe impairment. Significant dose reduction required (50-75%). Consider alternative drugs.',
    dosingEsrd: 'End-stage renal disease. Most drugs require major adjustment or are contraindicated. Consult nephrology and clinical pharmacist.',
    positiveValue: 'Enter positive value',
  },

  // Fluid Balance Calculator
  fluidBalance: {
    bannerTitle: 'What Fluid Balance tracks',
    bannerText: 'Monitors fluid intake vs output - critical for hemodynamic management in ICU patients',
    fluidIntake: 'Fluid Intake',
    fluidOutput: 'Fluid Output',
    ivFluids: 'IV Fluids',
    oralIntake: 'Oral Intake',
    enteralNutrition: 'Enteral Nutrition',
    medications: 'Medications',
    bloodProducts: 'Blood Products',
    urineOutput: 'Urine Output',
    drainage: 'Drainage (chest tube, NG, etc)',
    vomitus: 'Vomitus',
    stool: 'Stool',
    insensibleLoss: 'Insensible Loss',
    insensibleHint: 'Typically 500-1000 mL/24h',
    totalIntake: 'Total Intake',
    totalOutput: 'Total Output',
    netBalance: 'Net Fluid Balance',
    over24Hours: 'Over 24 hours',
    interpretation: 'Interpretation',
    positiveBalance: 'Positive Balance',
    balancedState: 'Balanced',
    negativeBalance: 'Negative Balance',
    positiveBalanceDesc: 'Fluid overload - risk of pulmonary edema, increased morbidity',
    balancedStateDesc: 'Adequate fluid balance - optimal hemodynamic state',
    negativeBalanceDesc: 'Fluid deficit - risk of hypovolemia and organ hypoperfusion',
    visualComparison: 'Visual Comparison',
    intake: 'Intake',
    output: 'Output',
    clinicalNotes: '💡 Clinical Notes',
    notes2000Plus: 'Severe positive balance (>+2L/24h). Risk of fluid overload, pulmonary edema, increased mortality. Consider diuretics, fluid restriction.',
    notes1000Plus: 'Positive balance (+1-2L/24h). Monitor for signs of fluid overload. Assess volume status, lung sounds, peripheral edema.',
    notesBalanced: 'Adequate fluid balance (-500 to +1000 mL/24h). Optimal state for most patients. Continue current management.',
    notesMinus500: 'Mild negative balance (-500 to -1000 mL/24h). Monitor for signs of hypovolemia. May need fluid resuscitation.',
    notesMinus1000: 'Severe negative balance (<-1L/24h). Risk of hypovolemia, shock, acute kidney injury. Urgent fluid resuscitation required.',
    oliguriaNote: 'Oliguria detected (<400 mL/24h). Assess kidney function, perfusion, obstruction.',
    polyuriaNote: 'Polyuria detected (>3L/24h). Consider diabetes insipidus, diuretic excess, osmotic diuresis.',
    positiveValue: 'Enter positive value',
  },

  // Validation messages
  validation: {
    positiveValue: 'Enter positive value',
    percentage: 'Value between 0-100%',
    required: 'Required field',
  },
};
