/**
 * @file en-US/ibw.ts
 * @description English translations for IBW Calculator (Ideal Body Weight)
 * @author Vasile Chifeac
 * @created 2025-12-15
 *
 * @notes
 * - Supports 3 formulas: Hamwi (1964), Robinson (1983), PBW ARDSNet (2000)
 * - Complete 100% English translation for monolingual users
 * - Follows I18N_SETUP_GUIDE.md standards
 */

export default {
  // ============================================================
  // MAIN TITLES
  // ============================================================
  title: 'Ideal Body Weight (IBW)',
  subtitle:
    'Calculate ideal weight with 3 formulas for nutritional assessment and mechanical ventilation',

  // ============================================================
  // FORM INPUT
  // ============================================================
  form: {
    heightLabel: 'Height',
    heightSuffix: 'cm',
    heightRule: 'Height between 1-300 cm',
    heightIcon: 'height',

    genderLabel: 'Gender',
    genderRule: 'Gender required for IBW calculation',
    genderIcon: 'person',
    genderOptions: {
      male: 'Male',
      female: 'Female',
    },
  },

  // ============================================================
  // BUTTONS
  // ============================================================
  buttons: {
    calculate: 'Calculate IBW',
    reset: 'Reset',
  },

  // ============================================================
  // RESULTS
  // ============================================================
  results: {
    title: 'IBW Results',
    noData: 'Enter height and gender to calculate IBW',
    noDataIcon: 'info',

    table: {
      formulaColumn: 'Formula',
      ibwColumn: 'IBW (kg)',
      rangeColumn: 'Range ±10%',

      hamwiLabel: 'Hamwi',
      robinsonLabel: 'Robinson',
      pbwLabel: 'PBW (ARDS)',
    },

    banner: {
      title: 'Acceptable Range:',
      rangeText: 'IBW ± 10% (normal constitutional variability)',
      hamwiText: 'Hamwi & Robinson: General clinical nutrition use',
      pbwText: 'PBW: Specific for ARDS mechanical ventilation',
    },
  },

  // ============================================================
  // EXPANDABLE SECTIONS
  // ============================================================
  sections: {
    // Section 1: Clinical Applications
    clinicalApplications: {
      title: 'IBW Clinical Applications',
      icon: 'local_hospital',

      item1Title: 'Nutritional Assessment:',
      item1Text:
        'Baseline for calculating caloric requirements (25-30 kcal/kg IBW) and protein needs (1.0-1.5 g/kg IBW)',

      item2Title: 'Mechanical Ventilation:',
      item2Text: 'Protective tidal volume ARDS = 6 mL/kg PBW (Brower et al. 2002)',

      item3Title: 'Hydrophilic Drug Dosing:',
      item3Text: 'Aminoglycosides, vancomycin dosed on IBW in obese patients',

      item4Title: 'Malnutrition Screening:',
      item4Text: 'Actual weight/IBW &lt;90% = mild, &lt;80% = moderate, &lt;70% = severe',
    },

    // Section 2: IBW Formulas
    formulas: {
      title: 'IBW Formulas',
      icon: 'functions',

      hamwiTitle: 'Hamwi (1964):',
      hamwiMale: 'Males: 48 kg + 2.7 kg × (height_cm - 152.4) / 2.54',
      hamwiFemale: 'Females: 45.5 kg + 2.25 kg × (height_cm - 152.4) / 2.54',

      robinsonTitle: 'Robinson (1983):',
      robinsonMale: 'Males: 52 kg + 1.9 kg × (height_inch - 60)',
      robinsonFemale: 'Females: 49 kg + 1.7 kg × (height_inch - 60)',

      pbwTitle: 'PBW - Predicted Body Weight (ARDSNet 2000):',
      pbwMale: 'Males: 50 + 0.91 × (height_cm - 152.4)',
      pbwFemale: 'Females: 45.5 + 0.91 × (height_cm - 152.4)',
    },

    // Section 3: Definition and Clinical Significance
    definition: {
      title: 'Definition and Clinical Significance',
      icon: 'description',

      whatIsTitle: 'What is Ideal Body Weight (IBW):',
      whatIsText:
        'Ideal Body Weight (IBW) is the theoretical optimal weight for an individual based on height, gender, and body constitution. It represents the weight associated with maximum life expectancy and lowest cardiovascular risk according to epidemiological studies.',

      clinicalSignificanceTitle: 'Clinical Significance:',
      clinicalSignificanceText:
        'IBW is used as reference for: (1) Nutritional status assessment (compare actual weight vs IBW), (2) Calculate caloric/protein requirements in clinical nutrition, (3) Drug dosing in obese/underweight patients, (4) Set protective mechanical ventilation (PBW for tidal volume in ARDS).',

      limitationsTitle: 'Limitations:',
      limitationsText:
        'IBW formulas DO NOT consider: body composition (lean vs fat mass), ethnicity (Asians have lower IBW), age (elderly tolerate higher BMI), athleticism (high muscle mass). Acceptable range: IBW ±10% for constitutional variability.',
    },

    // Section 4: Physiology
    physiology: {
      title: 'Pathophysiology and Scientific Basis',
      icon: 'biotech',

      normalPhysiologyTitle: 'Normal Physiology:',
      normalPhysiologyText:
        'Ideal body weight correlates with: (1) Height: Linear relationship between stature and optimal weight (taller individuals have proportionally higher IBW), (2) Gender: Women have lower IBW at same height due to higher fat mass and lower muscle mass compared to men, (3) Age: IBW derived from young adult cohorts (20-40 years), may not apply to elderly.',

      pathophysiologyTitle: 'Pathophysiology of Abnormal Weight:',
      pathophysiologyText:
        '<strong>Underweight (&lt;90% IBW):</strong> Protein-calorie malnutrition, sarcopenia, reduced immunity, delayed wound healing, increased post-operative complications.<br /><strong>Overweight (110-120% IBW):</strong> Increased risk type 2 diabetes, hypertension, dyslipidemia, sleep apnea.<br /><strong>Obesity (&gt;120% IBW):</strong> High cardiovascular risk, insulin resistance, hepatic steatosis, surgical complications.',

      formulaRationaleTitle: 'Formula Rationale:',
      formulaRationaleText:
        '<strong>Hamwi (1964):</strong> Derived from Metropolitan Life insurance data (1959), general clinical use.<br /><strong>Robinson (1983):</strong> Statistical refinement on larger cohorts, similar to Hamwi.<br /><strong>PBW ARDSNet (2000):</strong> Specifically derived for mechanical ventilation, predicts functional lung volume (total lung capacity correlates with height).',
    },

    // Section 5: Results Interpretation
    interpretation: {
      title: 'IBW Results Interpretation',
      icon: 'analytics',

      comparisonTitle: 'Actual Weight vs IBW Comparison:',
      comparisonText:
        '<strong>Actual Weight/IBW × 100%:</strong><br />' +
        '• &gt;110%: Overweight (consider screening metabolic comorbidities)<br />' +
        '• 90-110%: Normal range (acceptable weight for height)<br />' +
        '• 80-90%: Mild underweight (evaluate causes: reduced appetite, malabsorption, hyperthyroidism)<br />' +
        '• 70-80%: Moderate underweight (nutritional supplementation indicated)<br />' +
        '• &lt;70%: Severe underweight (severe malnutrition, aggressive nutritional support)',

      formulaSelectionTitle: 'Appropriate Formula Selection:',
      formulaSelectionText:
        '<strong>Hamwi/Robinson:</strong> General use nutritional assessment, requirements calculation, outpatient screening.<br />' +
        '<strong>PBW (ARDSNet):</strong> Specific for ventilator settings in ARDS (tidal volume = 6 mL/kg PBW for protective ventilation). DO NOT use PBW for general nutritional assessment.',

      specialPopulationsTitle: 'Special Populations:',
      specialPopulationsText:
        '<strong>Elderly (&gt;65 years):</strong> Tolerate slightly higher BMI (25-27), IBW may underestimate optimal weight.<br />' +
        '<strong>Asians:</strong> IBW overestimates optimal weight (~5% lower for same metabolic risk).<br />' +
        '<strong>Athletes:</strong> High muscle mass may give weight &gt;IBW without obesity (use body composition BIA/DEXA).<br />' +
        '<strong>Amputees:</strong> Correct IBW by subtracting estimated missing limb weight.',
    },

    // Section 6: Mechanical Ventilation Applications
    mechanicalVentilation: {
      title: 'Mechanical Ventilation Applications (PBW)',
      icon: 'air',

      ardsNetTitle: 'ARDSNet Protocol (2000):',
      ardsNetText:
        '<strong>Protective Tidal Volume:</strong> 6 mL/kg PBW (range 4-8 mL/kg) to reduce barotrauma/volutrauma in ARDS.<br />' +
        '<strong>Rationale:</strong> PBW predicts functional lung capacity better than actual weight (correlates with height, not fat mass).<br />' +
        '<strong>Evidence:</strong> ARMA study (2000) demonstrated 22% mortality reduction with low tidal volume (6 mL/kg PBW) vs conventional (12 mL/kg) in ARDS.',

      calculationExampleTitle: 'Ventilator Settings Calculation Example:',
      calculationExampleText:
        'Patient: Male, 175 cm, actual weight 95 kg (obese)<br />' +
        '• PBW = 50 + 0.91 × (175 - 152.4) = 70.6 kg<br />' +
        '• Target tidal volume: 6 mL/kg × 70.6 kg = 424 mL<br />' +
        '• Tidal volume range: 4-8 mL/kg PBW = 282-565 mL<br />' +
        '• ⚠️ <strong>COMMON ERROR:</strong> Using actual weight (95 kg) would give VT = 570 mL → lung overdistension!',

      otherUsesTitle: 'Other PBW Uses in ICU:',
      otherUsesText:
        '<strong>Optimal PEEP:</strong> Some PEEP titration protocols based on PBW.<br />' +
        '<strong>ARDS Fluid Therapy:</strong> Target negative fluid balance based on mL/kg PBW.<br />' +
        '<strong>Prone Positioning:</strong> Indications consider PBW for selecting candidates.',
    },

    // Section 7: Nutritional Assessment
    nutritionalAssessment: {
      title: 'Nutritional Assessment Applications',
      icon: 'restaurant',

      caloricNeedsTitle: 'Caloric Requirements Calculation:',
      caloricNeedsText:
        '<strong>Normal Weight Patients:</strong> 25-30 kcal/kg IBW/day (maintenance).<br />' +
        '<strong>Obese Patients:</strong> Use adjusted body weight: Adjusted Weight = IBW + 0.25 × (Actual Weight - IBW). Prevents overfeeding (hepatic/respiratory complications).<br />' +
        '<strong>Underweight Patients:</strong> 30-35 kcal/kg actual weight/day for weight recovery.<br />' +
        '<strong>Metabolic Stress (ICU):</strong> Multiply by stress factor (1.2-1.5× in sepsis/trauma).',

      proteinNeedsTitle: 'Protein Requirements Calculation:',
      proteinNeedsText:
        '<strong>Maintenance:</strong> 0.8-1.0 g/kg IBW/day (healthy adults).<br />' +
        '<strong>Catabolic Stress:</strong> 1.2-1.5 g/kg IBW/day (sepsis, major surgery).<br />' +
        '<strong>Severe Burns:</strong> 1.5-2.0 g/kg IBW/day.<br />' +
        '<strong>Renal Failure:</strong> Reduce to 0.6-0.8 g/kg IBW/day (pre-dialysis) to reduce nitrogen load.',

      malnutritionScreeningTitle: 'Malnutrition Screening:',
      malnutritionScreeningText:
        '<strong>%IBW Index = (Actual Weight / IBW) × 100%</strong><br />' +
        '• &gt;120%: Obesity (metabolic risk)<br />' +
        '• 110-120%: Overweight<br />' +
        '• 90-110%: Normal<br />' +
        '• 85-90%: Mild malnutrition<br />' +
        '• 75-85%: Moderate malnutrition<br />' +
        '• &lt;75%: Severe malnutrition<br />' +
        '⚠️ Combine with other parameters: albumin, prealbumin, lymphocytes, recent weight loss.',
    },

    // Section 8: Drug Dosing
    drugDosing: {
      title: 'IBW-Based Drug Dosing',
      icon: 'medication',

      hydrophilicDrugsTitle: 'Hydrophilic Drugs (use IBW in obese):',
      hydrophilicDrugsText:
        '<strong>Aminoglycosides (gentamicin, tobramycin):</strong> Distributed in extracellular volume (not fat). Dose on IBW + 40% excess weight: Dose = IBW + 0.4 × (Actual Weight - IBW).<br />' +
        '<strong>Vancomycin:</strong> Dosing: 15-20 mg/kg IBW/dose (obese patients).<br />' +
        '<strong>Neuromuscular blockers (succinylcholine):</strong> Base on total body weight (underdosing risk) but monitor prolonged effect.',

      lipophilicDrugsTitle: 'Lipophilic Drugs (use actual weight):',
      lipophilicDrugsText:
        '<strong>Benzodiazepines, propofol, fentanyl:</strong> Distributed in adipose tissue → dose on actual weight (accumulation risk in obese with repeated doses).<br />' +
        '<strong>Amiodarone:</strong> Lipophilic, dose on actual weight.<br />' +
        '<strong>LMW Heparin:</strong> Dose on actual weight (max 150 kg for extreme obesity).',

      chemotherapyTitle: 'Chemotherapy:',
      chemotherapyText:
        '<strong>Obese patients:</strong> Use actual weight for body surface area (BSA) calculation. Recent studies (ASCO 2012) recommend NO dose reduction in obese (underdosing risk).<br />' +
        '<strong>Underweight patients:</strong> Use actual weight, closely monitor toxicity.',
    },

    // Section 9: Scientific References
    references: {
      title: 'Scientific References',
      icon: 'menu_book',

      reference1Author: 'Hamwi GJ. (1964)',
      reference1Title:
        '"Changing dietary concepts". In: Diabetes Mellitus: Diagnosis and Treatment',
      reference1Journal: 'American Diabetes Association, Vol 1, pp 73-78',
      reference1Description:
        '<strong>Original Hamwi formula.</strong> Derived from Metropolitan Life insurance data (1959) for general nutritional assessment. First widely used IBW formula in clinic.',

      reference2Author: 'Robinson JD, Lupkiewicz SM, Palenik L, et al. (1983)',
      reference2Title: '"Determination of ideal body weight for drug dosage calculations"',
      reference2Journal: '<em>American Journal of Hospital Pharmacy</em>, 40(6): 1016-1019',
      reference2Pmid: '<strong>PMID: 6869387</strong>',
      reference2Description:
        '<strong>Robinson formula.</strong> Statistical refinement on 4808 patients. Similar to Hamwi but more accurate for drug dosing. Widely used in clinical pharmacy.',

      reference3Author: 'ARDS Network, Brower RG, Matthay MA, Morris A, et al. (2000)',
      reference3Title:
        '"Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and ARDS"',
      reference3Journal: '<em>New England Journal of Medicine</em>, 342(18): 1301-1308',
      reference3Pmid: '<strong>PMID: 10793162</strong>',
      reference3Doi: '<strong>DOI:</strong> 10.1056/NEJM200005043421801',
      reference3Description:
        '<strong>Landmark ARDSNet study.</strong> Defined PBW formula for protective ventilation. Tidal volume 6 mL/kg PBW reduced ARDS mortality by 22% vs 12 mL/kg conventional. Evidence base for modern protective ventilation.',

      reference4Author: 'Pai MP, Paloucek FP. (2000)',
      reference4Title: '"The origin of the "ideal" body weight equations"',
      reference4Journal: '<em>Annals of Pharmacotherapy</em>, 34(9): 1066-1069',
      reference4Pmid: '<strong>PMID: 10981254</strong>',
      reference4Description:
        '<strong>Historical review IBW formulas.</strong> Critical analysis of Hamwi, Devine, Robinson origins. Discussion of limitations in modern clinical application.',

      additionalResourcesTitle: 'Additional Resources:',
      additionalResource1:
        '<strong>ASPEN Guidelines (2016):</strong> "Guidelines for the Provision and Assessment of Nutrition Support Therapy in Adult Critically Ill Patient". <em>JPEN</em>, recommendations for IBW use in ICU nutritional requirements.',
      additionalResource2:
        '<strong>ASCO (2012):</strong> "Appropriate chemotherapy dosing for obese adult patients with cancer". <em>Journal of Clinical Oncology</em>, 30(13): 1553-1561. Chemotherapy dosing recommendations in obese.',
      additionalResource3:
        '<strong>Erstad BL. (2017):</strong> "Dosing of medications in morbidly obese patients in the intensive care unit setting". <em>Intensive Care Medicine</em>, 30(1): 18-32. Review of ICU drug dosing in obese.',
    },
  },
};
