/**
 * @file en-US/bmi.ts
 * @description English translations for BMI Calculator
 * @author Vasile Chifeac
 * @created 2025-12-15
 *
 * @references
 * - WHO BMI Classification Guidelines
 * - WHO Technical Report Series 894 (2000)
 */

export default {
  // 1. MAIN TITLES
  title: 'Body Mass Index (BMI)',
  subtitle: 'Anthropometric Parameters',

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

    ageLabel: 'Age (optional)',
    ageSuffix: 'years',
    ageRule: 'Age between 1-120 years',
    ageIcon: 'cake',

    genderLabel: 'Gender (optional)',
    genderIcon: 'person',
    genderOptions: {
      male: 'Male',
      female: 'Female',
    },
  },

  // 3. BUTTONS
  buttons: {
    calculate: 'Calculate BMI',
    reset: 'Reset Data',
  },

  // 4. RESULTS
  results: {
    title: 'Results',
    bmiValue: 'kg/m²',
    bmiSubtitle: 'Body Mass Index',

    classification: 'WHO Classification:',

    scaleTitle: 'Position on BMI Scale:',
    scaleLabels: {
      underweight: '15',
      normal1: '18.5',
      normal2: '25',
      overweight: '30',
      obese1: '35',
      obese2: '40+',
    },

    idealWeight: 'Ideal Weight (BMI 18.5-24.9):',
    weightDifference: {
      excess: 'Excess:',
      deficit: 'Deficit:',
    },

    categories: {
      underweight: 'Underweight',
      normal: 'Normal Weight',
      overweight: 'Overweight',
      obese1: 'Obesity Grade I',
      obese2: 'Obesity Grade II',
      obese3: 'Obesity Grade III',
    },
  },

  // 5. COMPLETE CLASSIFICATION SECTION
  sections: {
    classification: {
      title: 'Complete WHO Classification',
      icon: 'info',
      items: {
        underweight: '<strong class="text-blue">Underweight:</strong> &lt; 18.5',
        normal: '<strong class="text-green">Normal Weight:</strong> 18.5 - 24.9',
        overweight: '<strong class="text-orange">Overweight:</strong> 25.0 - 29.9',
        obese1: '<strong class="text-red">Obesity I:</strong> 30.0 - 34.9',
        obese2: '<strong class="text-deep-orange">Obesity II:</strong> 35.0 - 39.9',
        obese3: '<strong class="text-purple">Obesity III:</strong> ≥ 40.0',
      },
    },

    // 6. DEFINITION AND CLINICAL SIGNIFICANCE
    definition: {
      title: 'Definition and Clinical Significance',
      icon: 'info',
      whatIs: {
        title: 'Definition:',
        text: "Body Mass Index (BMI) is an indirect measure of body adiposity that relates an individual's weight and height. It is the standard anthropometric parameter recognized by the WHO to classify weight status and assess associated health risk.",
      },
      clinicalSignificance: {
        title: 'Clinical Significance:',
        intro: 'BMI is used for:',
        items: [
          'Population screening for malnutrition or obesity',
          'Assessment of cardiovascular and metabolic risk',
          'Monitoring effectiveness of nutritional interventions',
          'Risk stratification in clinical and insurance contexts',
        ],
      },
    },

    // 7. PHYSIOLOGY AND INTERPRETATION
    physiology: {
      title: 'Physiology and Interpretation',
      icon: 'science',
      intro: 'BMI provides an estimate of body fat mass but does not distinguish between:',
      limitations: [
        '<strong>Lean mass vs fat mass:</strong> Muscular athletes may have elevated BMI',
        '<strong>Fat distribution:</strong> Visceral vs subcutaneous fat',
        '<strong>Body composition:</strong> Hydration, bone density',
      ],
      conclusion: {
        title: 'Limitations:',
        text: 'BMI does not account for age, sex, ethnicity, or muscle mass. For more precise assessments consider: waist circumference, skinfold measurements, bioelectrical impedance, DEXA.',
      },
    },

    // 8. HOW TO MEASURE
    measurement: {
      title: 'How to Measure',
      icon: 'straighten',
      weight: {
        title: 'Weight:',
        text: 'Measure in the morning, fasting, without shoes, in light clothing. Calibrated and certified scale.',
      },
      height: {
        title: 'Height:',
        text: 'Measure in upright position, without shoes, heels and back against wall, gaze parallel to ground. Calibrated stadiometer.',
      },
      frequency: {
        title: 'Frequency:',
        text: 'Monitor periodically (monthly/quarterly) to assess trends and intervention effectiveness.',
      },
    },

    // 9. CALCULATION FORMULA
    formula: {
      title: 'Calculation Formula',
      icon: 'functions',
      formulaTitle: 'BMI Formula (Quetelet Index):',
      formulaText: 'BMI = Weight (kg) / Height² (m²)',
      example: {
        title: 'Example:',
        calculation: 'Weight = 70 kg, Height = 1.75 m',
        result: 'BMI = 70 / (1.75)² = 70 / 3.0625 = 22.9 kg/m²',
      },
      note: 'Note: The Quetelet formula (Adolphe Quetelet, 1832) was adopted by WHO in 1995 as the standard for nutritional status assessment.',
    },

    // 10. RESULTS INTERPRETATION
    interpretation: {
      title: 'Results Interpretation',
      icon: 'psychology',
      intro:
        'WHO BMI classification is based on epidemiological studies correlating BMI values with mortality and morbidity risk:',
      categories: [
        '<strong>Underweight (&lt;18.5):</strong> Increased risk of malnutrition, osteoporosis, immunodeficiency',
        '<strong>Normal Weight (18.5-24.9):</strong> Minimal morbidity/mortality risk',
        '<strong>Overweight (25.0-29.9):</strong> Moderate cardiovascular disease risk',
        '<strong>Obesity I (30.0-34.9):</strong> High risk of diabetes, hypertension',
        '<strong>Obesity II (35.0-39.9):</strong> Very high risk of metabolic complications',
        '<strong>Obesity III (≥40.0):</strong> Extreme health risk, specialist intervention required',
      ],
      note: 'Note: BMI cutoffs may vary for Asian ethnicities (lower cutoffs: ≥23 overweight, ≥27.5 obesity).',
    },

    // 11. CLINICAL APPLICATIONS
    clinicalApplications: {
      title: 'Clinical Applications',
      icon: 'local_hospital',
      applications: [
        {
          title: 'Population Screening:',
          text: 'Rapid identification of individuals at nutritional risk in general practice, screening campaigns',
        },
        {
          title: 'Surgical Risk Assessment:',
          text: 'BMI >35 increases risk of anesthesiological and post-operative complications',
        },
        {
          title: 'Drug Dosing:',
          text: 'Some drugs require BMI-based dose adjustment (chemotherapeutics, anticoagulants)',
        },
        {
          title: 'Nutritional Assessment:',
          text: 'Longitudinal monitoring of diet effectiveness, rehabilitation programs, behavioral therapy',
        },
      ],
    },

    // 12. ALERT VALUES
    alerts: {
      title: 'Alert Values and Clinical Actions',
      icon: 'warning',
      critical: {
        title: 'Critical Values (Immediate Action):',
        items: [
          '<strong>BMI &lt;16:</strong> Severe malnutrition → Nutritionist consultation, blood tests, psychiatric assessment (anorexia)',
          '<strong>BMI ≥40:</strong> Extreme obesity → Bariatric assessment, metabolic complications screening (diabetes, OSAS)',
        ],
      },
      monitoring: {
        title: 'Monitoring Values:',
        items: [
          '<strong>BMI 16-18.5:</strong> Underweight → Nutritional follow-up, malabsorption screening',
          '<strong>BMI 25-29.9:</strong> Overweight → Lifestyle counseling, dyslipidemia screening',
          '<strong>BMI 30-39.9:</strong> Obesity → Structured weight loss program, complications monitoring',
        ],
      },
    },

    // 13. DOCUMENTATION AND GUIDELINES
    documentation: {
      title: 'Documentation and Guidelines',
      icon: 'description',
      guidelines: [
        {
          title: 'WHO (2000):',
          text: 'Obesity: Preventing and Managing the Global Epidemic. WHO Technical Report Series 894.',
        },
        {
          title: 'CDC (2022):',
          text: 'Adult BMI Calculator - Standard for obesity screening USA',
        },
        {
          title: 'ESC (2021):',
          text: 'Cardiovascular guidelines - BMI as coronary risk factor',
        },
        {
          title: 'SIO (2022):',
          text: 'Italian Obesity Society - Diagnostic and therapeutic standards',
        },
      ],
    },

    // 14. BIBLIOGRAPHY
    bibliography: {
      title: 'Bibliography and Scientific References',
      icon: 'menu_book',
      references: [
        {
          title: 'WHO. (2000)',
          text: 'Obesity: Preventing and Managing the Global Epidemic. WHO Technical Report Series 894.',
          link: 'https://www.who.int/publications/i/item/9241208945',
        },
        {
          title: 'Quetelet A. (1832)',
          text: "Recherches sur le poids de l'homme aux différents âges. Nouveaux Mémoires de l'Académie Royale des Sciences et Belles-Lettres de Bruxelles.",
          note: 'Original study that introduced the weight/height² index concept',
        },
        {
          title: 'Keys A, et al. (1972)',
          text: 'Indices of relative weight and obesity. Journal of Chronic Diseases, 25(6-7), 329-343.',
          doi: 'DOI: 10.1016/0021-9681(72)90027-6',
        },
        {
          title: 'WHO Expert Consultation. (2004)',
          text: 'Appropriate body-mass index for Asian populations and its implications. The Lancet, 363(9403), 157-163.',
          doi: 'DOI: 10.1016/S0140-6736(03)15268-3',
        },
      ],
    },
  },
};
