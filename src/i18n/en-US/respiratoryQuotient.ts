/**
 * @file en-US/respiratoryQuotient.ts
 * @description English translations for Respiratory Quotient Calculator
 * @author Vasile Chifeac
 * @created 2025-12-12
 */

export default {
  // Main titles
  title: 'Respiratory Quotient (RQ)',
  subtitle: 'VCO2/VO2 - Metabolic Indicator',

  // Header/Banner section
  header: {
    mainInfo:
      'The <strong>Respiratory Quotient (RQ)</strong> expresses the type of metabolism in progress (aerobic or anaerobic) expressed by the ratio between <strong>carbon dioxide</strong> produced and <strong>oxygen</strong> consumed.',
  },

  // Input Form section
  form: {
    sectionTitle: 'Blood Chemistry Parameters',
    pvco2Label: 'PvCO2 (Venous CO2)',
    pvco2Unit: 'mmHg',
    paco2Label: 'PaCO2 (Arterial CO2)',
    paco2Unit: 'mmHg',
    hbLabel: 'HB (Hemoglobin)',
    hbUnit: 'g/dL',
    sao2Label: 'SaO2 (Arterial O2 Saturation)',
    sao2Unit: '%',
    svo2Label: 'SvO2 (Venous O2 Saturation)',
    svo2Unit: '%',
    pao2Label: 'PaO2 (Arterial O2 Pressure)',
    pao2Unit: 'mmHg',
    pvo2Label: 'PvO2 (Venous O2 Pressure)',
    pvo2Unit: 'mmHg',
  },

  // Buttons
  buttons: {
    calculate: 'Calculate RQ',
    save: 'Save Calculation',
    reset: 'Reset',
  },

  // Results
  results: {
    title: 'Results',
    unit: 'Respiratory Quotient (RQ)',
    rangeLabel: 'RQ Range: 0.7 - 1.0 ml-O2/dL',
    noResults: 'Enter values and press Calculate to display results',
  },

  // Interpretations
  interpretation: {
    default: 'Enter parameters',
    severeAnaerobic: 'Severe Anaerobic Metabolism',
    anaerobicLipogenesis: 'Anaerobic Metabolism / Lipogenesis',
    carbMetabolism: 'Predominant Carbohydrate Metabolism',
    normalRange: 'Normal Range - Mixed Diet',
    fatMetabolism: 'Predominant Fat Metabolism',
    ketosis: 'Ketosis / Prolonged Fasting',
    nonStandard: 'Non-Standard Value',
  },

  // Critical Alerts/Banners
  alerts: {
    criticalHigh: {
      title: 'WARNING:',
      text: 'RQ &gt; 1.2 -> Anaerobic metabolism. Check lactate and perfusion.',
    },
    ketosisWarning: {
      title: 'NOTE:',
      text: 'RQ &lt; 0.7 -> Predominant use of fats/ketones.',
    },
  },

  // Section 1: Definition and Clinical Significance
  definition: {
    title: ' Definition and Clinical Significance',
    mainTitle: 'What is the Respiratory Quotient (RQ)?',
    mainText:
      'RQ is the <strong>ratio between carbon dioxide (CO2) produced and oxygen (O2) consumed</strong>, often calculated as <strong>VCO2/VO2</strong>. This value indicates the <strong>type of energy metabolism</strong> occurring in the organism, providing <strong>indirect information about metabolism type</strong> (aerobic or anaerobic).',

    clinicalSignificanceTitle: '? Clinical Significance of RQ:',
    clinicalSignificance: {
      metabolicType: {
        title: 'Type of substrate oxidized:',
        text: 'Carbohydrates, lipids or proteins (typical values 0.7-1.0)',
      },
      metabolicState: {
        title: 'Metabolic state:',
        text: 'Aerobic (physiological) vs Anaerobic (pathological)',
      },
      normalRange: {
        title: 'Normal RQ:',
        text: '0.7 - 1.0 under aerobic conditions',
      },
    },

    interpretationValuesTitle: '? Value Interpretation:',
    interpretationValues: {
      qr1_0: {
        value: 'RQ = 1.0',
        meaning: 'Predominantly <strong>carbohydrate</strong> metabolism',
      },
      qr0_7: {
        value: 'RQ = 0.7',
        meaning: 'Predominantly <strong>fat</strong> metabolism',
      },
      qr0_8: {
        value: 'RQ = 0.8',
        meaning: 'Mixed diet - <strong>normal resting</strong> value',
      },
      qr0_85: {
        value: 'RQ = 0.85',
        meaning: '<strong>Balanced mixed</strong> metabolism',
      },
      qrAbove1: {
        value: 'RQ &gt; 1.0',
        meaning: '<strong>Anaerobic metabolism</strong> / Lipogenesis',
      },
    },
  },

  // Section 2: Aerobic vs Anaerobic Metabolism
  metabolism: {
    title: 'Aerobic vs Anaerobic Metabolism',
    aerobicTitle: '? AEROBIC METABOLISM (RQ 0.7 - 1.0):',
    aerobicText:
      'Normal physiological condition where oxygen is sufficient to completely oxidize energy substrates (glucose, fatty acids, amino acids) through the Krebs cycle and oxidative phosphorylation in mitochondria.',

    anaerobicTitle: '? ANAEROBIC METABOLISM (RQ &gt; 1.0):',
    anaerobicText:
      'Pathological or stress condition where tissue oxygen is insufficient, forcing cells to anaerobic glycolysis with lactate production and metabolic acidosis.',

    anaerobicConditions: {
      title: 'Conditions leading to anaerobiosis:',
      shock: {
        title: 'Shock',
        text: '<strong>Shock</strong> (septic, cardiogenic, hypovolemic)',
      },
      hypoxia: {
        title: 'Hypoxia',
        text: '<strong>Tissue hypoxia</strong>',
      },
      stress: {
        title: 'Stress',
        text: '<strong>Metabolic stress</strong>',
      },
      oxygenLack: {
        title: 'Insufficient O2',
        text: '<strong>Insufficient oxygen supply</strong>',
      },
      lactateAccumulation: {
        title: 'Lactate',
        text: '<strong>Lactate accumulation</strong>',
      },
    },

    qrElevationMechanism:
      'RQ elevation in anaerobiosis derives from lactate buffering by bicarbonate, which produces supplementary CO2 not derived from oxidative metabolism.',
    clinicalCorrelation:
      '<strong>Clinical correlation:</strong> RQ &gt; 1.2 often associated with arterial lactate &gt; 4 mmol/L, sign of severe shock and tissue hypoperfusion. Monitor RQ and lactate together for accurate perfusion assessment.',
  },

  // Section 3: How to Measure
  measurement: {
    title: 'How to Measure VCO2/VO2',
    methodsTitle: 'Measurement Methods:',

    indirectCalorimetry: {
      title: 'Indirect Calorimetry (Gold Standard)',
      text: 'VCO2 and VO2 can be measured under ideal conditions by <strong>indirect calorimetry</strong>, analyzing respiratory gases (O2 and CO2 concentrations in inspired and expired air). This method provides accurate measurements of basal and total energy expenditure.',
    },

    formulaMethod: {
      title: 'Arterial and Mixed Venous Blood Gas Analysis (Alternative Method)',
      intro:
        'Alternatively, VCO2 and VO2 can be <strong>calculated from arterial and mixed venous blood gas analysis</strong>. This is the method used by this calculator.',
      vo2CalcTitle: 'Oxygen Consumption (VO2) Calculation:',
      vo2CalcText:
        'Oxygen consumption is derived as the <strong>difference</strong> between the amount of O2 carried to tissues by blood (<strong>arterial</strong> blood) and the amount of O2 present in blood leaving tissues (<strong>mixed venous blood</strong> from right atrium or pulmonary artery).',
      vo2Formula:
        '<strong>Formula:</strong> VO2 = (Arterial O2) - (Mixed venous O2)<br />Where O2 = (HB x 1.36 x SatO2/100) + (PO2 x 0.003)',
      vco2CalcTitle: 'CO2 Production (VCO2) Calculation:',
      vco2CalcText:
        'Similarly, <strong>CO2 production</strong> is calculated as the difference between venous and arterial CO2, reflecting metabolism and tissue perfusion.',
      vco2Formula: '<strong>Formula:</strong> VCO2 = (Venous CO2) - (Arterial CO2)',
    },

    practicalNote:
      '<strong>Note:</strong> This calculator uses the arterio-venous blood gas method. For precise energy expenditure measurements, indirect calorimetry is recommended.',
  },

  // Section 4: Physiology
  physiology: {
    title: 'Physiology: Aerobic vs Anaerobic Metabolism',

    substratesTitle: 'Energy Substrate Oxidation - Stoichiometry:',

    carbohydrates: {
      title: '1. Carbohydrate Oxidation (Glucose):',
      equation: 'C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + 686 kcal',
      rq: 'RQ = 6 CO2 / 6 O2 = 1.0',
      details:
        'o O2 consumption: 1 mole O2 per 1 mole CO2 produced<br />o Energy yield: 5.05 kcal/L O2 (maximum efficiency)<br />o Situations: Post-prandial carbohydrates, high intensity exercise (glycogenolysis), high glucose parenteral nutrition',
    },

    lipids: {
      title: '2. Lipid Oxidation (Palmitic Acid C16):',
      equation: 'C16H32O2 + 23 O2 -> 16 CO2 + 16 H2O + 2340 kcal',
      rq: 'RQ = 16 CO2 / 23 O2 = 0.7',
      details:
        'o O2 consumption: 1.44 moles O2 per 1 mole CO2 (?O2 required to oxidize H)<br />o Energy yield: 4.69 kcal/L O2 (lower efficiency but ?caloric density)<br />o Situations: Fasting, light-moderate exercise (&lt;60% VO2max), ketogenic adaptation, lipid nutrition',
    },

    proteins: {
      title: '3. Protein Oxidation (Leucine example):',
      rq: 'RQ = ~0.8',
      details:
        'o Metabolic contribution: ~10-15% REE in normal diet<br />o Situations: Catabolism (trauma, sepsis, prolonged fasting), high-protein nutrition',
    },

    anaerobicTitle: 'Anaerobic Metabolism - Anaerobic Glycolysis:',
    anaerobicEquation: 'C6H12O6 -> 2 Lactate + 2 H+ (net CO2 production from HCO3? buffering)',
    anaerobicRQ: 'RQ &gt; 1.0',

    anaerobicMechanism:
      '<strong>Elevated RQ mechanism:</strong> Lactate + acidosis -> buffering with HCO3? -> non-oxidative CO2 production (H+ + HCO3? -> H2O + CO2 ?). VCO2 includes both metabolic CO2 and buffering CO2 -> RQ overestimated',

    anaerobicClinical:
      '<strong>Clinical conditions RQ &gt;1.0:</strong> Septic/cardiogenic shock (tissue hypoperfusion), maximal exercise (&gt;85% VO2max), respiratory failure (tissue hypoxia), overfeeding (de novo lipogenesis: glucose -> lipids, RQ ~8.0 theoretical)',

    clinicalImplication:
      '<strong>Clinical Implication:</strong> In shock, RQ &gt;1.0 may precede ?lactate (early diagnostic sensitivity). In ICU, persistent RQ &gt;1.0 with adequate nutrition suggests overfeeding -> reduce carbohydrate intake (target RQ 0.85-0.95). In mechanical ventilation, RQ &gt;1.0 -> ?VCO2 -> weaning difficulty (?respiratory drive).',
  },

  // Section 5: Formula
  formula: {
    title: 'Formula Used',
    mainFormula:
      'RQ = (PvCO2 - PaCO2) / [(HB x 1.36 x (SaO2 - SvO2)) / 100 + (PaO2 - PvO2) x 0.003]',
    whereTitle: 'Where:',
    components: {
      pvco2: '<strong>PvCO2:</strong> Partial pressure of CO2 in venous blood (mmHg)',
      paco2: '<strong>PaCO2:</strong> Partial pressure of CO2 in arterial blood (mmHg)',
      hb: '<strong>HB:</strong> Hemoglobin (g/dL)',
      sao2: '<strong>SaO2:</strong> Arterial oxygen saturation (%)',
      svo2: '<strong>SvO2:</strong> Venous oxygen saturation (%)',
      pao2: '<strong>PaO2:</strong> Arterial O2 partial pressure (mmHg)',
      pvo2: '<strong>PvO2:</strong> Venous O2 partial pressure (mmHg)',
      constant1_36: '<strong>1.36:</strong> Hufner constant (ml O2/g Hb)',
      constant0_003:
        '<strong>0.003:</strong> Oxygen solubility coefficient in plasma (ml O2/mmHg/dL)',
    },
    calculationComponents: {
      title: 'Calculation Components:',
      vco2Title: 'CO2 Production (VCO2):',
      vco2Unit: 'mmHg',
      vco2Description: 'Arterio-venous CO2 difference (normal ~200 ml/min)',
      vo2HemoglobinTitle: 'O2 Consumption - Transport via Hemoglobin:',
      vo2HemoglobinUnit: 'ml/dL',
      vo2HemoglobinDescription: 'Main O2 transport modality (98-99%)',
      vo2PlasmaTitle: 'O2 Consumption - Dissolved Plasma O2:',
      vo2PlasmaUnit: 'ml/dL',
      vo2PlasmaDescription: 'Minor but important contribution in hyperbaric conditions',
      totalVO2Title: 'Total VO2:',
      totalVO2Unit: 'ml/dL',
      qrTitle: 'Final RQ:',
      qrDescription: 'VCO2 / VO2 ratio',
    },
    note: '<strong>References:</strong> The formula used estimates VCO2 and VO2 from arterio-venous difference. For precise measurements, prefer indirect calorimetry with respiratory gas analysis (Encyclopedia of Respiratory Medicine, ScienceDirect Medical Literature).',
  },

  // Section: How to Measure Respiratory Quotient
  rqMeasurement: {
    title: 'How to Measure Respiratory Quotient',
    methodsTitle: 'Direct Measurement Methods:',
    
    indirectCalorimetry: {
      title: '1. Indirect Calorimetry (Gold Standard):',
      principle: '<strong>Principle:</strong> Continuous measurement of inspired and expired respiratory gases with metabolic cart system. Calculation VO2 = (FiO2 x VE_insp) - (FeO2 x VE_exp), VCO2 = (FeCO2 x VE_exp) - (FiCO2 x VE_insp)',
      equipment: '<strong>Equipment:</strong> O2 analyzers (paramagnetic or fuel cell), CO2 analyzer (infrared), pneumotachograph (flow measurement), canopy/mask (expired air collection)',
      conditions: '<strong>Optimal Conditions:</strong> Patient at rest (30 min), fasting >=4h, neutral temperature, no smoking 2h before, no exercise 12h before, steady-state (VO2/VCO2 stable +-10% for 5 min)',
      applications: '<strong>Applications:</strong> REE calculation (Weir equation), ICU nutritional prescription, athlete performance assessment, metabolic disorder diagnosis'
    },
    
    bloodGasMethod: {
      title: '2. Arterio-Venous Blood Gas Estimation (Method Used):',
      sampling: '<strong>Sampling:</strong> Arterial draw (radial/femoral a.) + central venous (central venous catheter in right atrium/superior vena cava)',
      parameters: '<strong>Measured Parameters:</strong> PaCO2, PvCO2 (CO2 partial pressures), PaO2, PvO2 (O2 partial pressures), SaO2, SvO2 (O2 saturations), Hb (hemoglobin)',
      vco2Calc: '<strong>VCO2 Calculation:</strong> Arterio-venous PCO2 difference (PvCO2 - PaCO2). Normal ~5-6 mmHg',
      vo2Calc: '<strong>VO2 Calculation:</strong> Arterial - venous O2 content. CaO2 = (Hb x 1.36 x SaO2/100) + (PaO2 x 0.003), CvO2 = (Hb x 1.36 x SvO2/100) + (PvO2 x 0.003). Normal arterio-venous O2 difference 4-5 mL/dL',
      limitations: '<strong>Limitations:</strong> Approximate estimate (not direct flow measurement), requires steady-state conditions, influenced by cardiac output, shunt, dead space. Accuracy +-15-20% vs calorimetry'
    },
    
    clinicalRecommendation: '<strong>Clinical Recommendation:</strong> For accurate nutritional assessment in ICU, prefer indirect calorimetry (direct VO2, VCO2, REE measurement). Blood gas estimation useful as rapid screening or when calorimetry unavailable, but validate with clinical trends (nitrogen balance, weight, albumin).'
  },

  // Section: Detailed Analysis
  detailedAnalysis: {
    title: 'Detailed Analysis and Applications',
  },

  // Section: Clinical Interpretation
  clinicalInterpretation: {
    title: 'Detailed Clinical Interpretation',
  },

  // Section: Reference Values
  referenceValues: {
    title: 'Reference Values and Critical Alerts',
  },

  // Section: Scientific Documentation
  scientificDocumentation: {
    title: 'Medical Scientific Documentation',
  },

  // Section: Bibliography
  bibliography: {
    title: 'Scientific References and Bibliography',
  },

  // Save Dialog
  saveDialog: {
    title: 'Save Calculation',
    patientInitialsLabel: 'Patient Initials',
    cancel: 'Cancel',
    save: 'Save',
  },
};
