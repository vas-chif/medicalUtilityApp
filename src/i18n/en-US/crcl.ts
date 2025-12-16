/**
 * @file en-US/crcl.ts
 * @description English translations for Creatinine Clearance Calculator (Cockcroft-Gault)
 * @author Vasile Chifeac
 * @created 2025-12-13
 *
 * @references
 * - Cockcroft DW, Gault MH. (1976) "Prediction of creatinine clearance from serum creatinine"
 *   Nephron 16(1):31-41. PMID: 1244564
 * - Winter MA, et al. (2012) "Impact of various body weights and serum creatinine concentrations
 *   on the bias and accuracy of the Cockcroft-Gault equation" Ann Pharmacother 46(12):1621-1629. PMID: 23249725
 * - Verhave JC, et al. (2003) "The association between atherosclerotic risk factors and renal function
 *   in the general population" Kidney Int 64(5):1681-1687. PMID: 14531800
 */

export default {
  // 1. MAIN TITLES
  title: 'Creatinine Clearance (CrCl)',
  subtitle: 'Cockcroft-Gault Calculator for Drug Dosing',

  // 2. INPUT PANEL (alias for template compatibility)
  inputPanel: {
    title: 'Patient Parameters',
    description: 'Cockcroft-Gault formula for drug dosing (not BSA-normalized)',
    creatinine: {
      label: 'Serum Creatinine',
      unit: 'mg/dL',
      validation: 'Creatinine between 0.1-20 mg/dL',
    },
    age: {
      label: 'Age',
      unit: 'years',
      validation: 'Age between 1-120 years',
    },
    weight: {
      label: 'Body Weight',
      unit: 'kg',
      validation: 'Weight between 1-300 kg',
    },
    gender: {
      label: 'Sex',
      validation: 'Select sex',
      options: {
        male: 'Male',
        female: 'Female',
      },
    },
  },

  // 3. RESULTS PANEL (alias for template compatibility)
  resultsPanel: {
    title: 'Results',
    result: {
      unit: 'mL/min',
      label: 'CrCl',
      formula: 'Formula: Cockcroft-Gault',
    },
    clinicalUse: {
      title: 'Clinical Use:',
      text: 'CrCl for renally excreted drug dosing. eGFR for CKD staging.',
    },
    interpretation: {
      title: 'Drug Dosing Interpretation:',
    },
  },

  // 2. FORM INPUT (legacy)
  form: {
    sectionTitle: 'Patient Parameters',
    sectionSubtitle: 'Cockcroft-Gault formula for drug dosing (not BSA-normalized)',
    creatinineLabel: 'Serum Creatinine',
    creatinineUnit: 'mg/dL',
    creatinineRule: 'Creatinine between 0.1-20 mg/dL',
    ageLabel: 'Age',
    ageUnit: 'years',
    ageRule: 'Age between 1-120 years',
    weightLabel: 'Body Weight',
    weightUnit: 'kg',
    weightRule: 'Weight between 1-300 kg',
    genderLabel: 'Sex',
    genderRule: 'Select sex',
    genderOptions: {
      male: 'Male',
      female: 'Female',
    },
  },

  // 3. ACTION BUTTONS
  buttons: {
    calculate: 'Calculate CrCl',
    save: 'Save Calculation',
    reset: 'Reset Data',
  },

  // 4. RESULTS
  results: {
    title: 'Results',
    valueLabel: 'mL/min',
    subtitle: '(Creatinine Clearance)',
    formulaLabel: 'Formula: Cockcroft-Gault',
  },

  // 5. CLINICAL BANNER
  clinicalBanner: {
    title: 'Clinical Use:',
    text: 'CrCl for dosing renally excreted drugs. eGFR for CKD staging.',
  },

  // 6. RESULTS INTERPRETATION
  interpretation: {
    title: 'Drug Dosing Interpretation:',
    ranges: {
      normal: 'Normal Function',
      mildReduction: 'Mild Reduction',
      moderateReduction: 'Moderate Reduction',
      moderateSevereReduction: 'Moderate-Severe Reduction',
      severeReduction: 'Severe Reduction',
      renalFailure: 'Renal Failure',
    },
    clinicalNotes: {
      normal: 'Normal clearance. Standard drug dosing (verify package inserts).',
      mildReduction:
        'Mild clearance reduction. Some drugs require adjustment (aminoglycosides, vancomycin). Monitor therapeutic levels.',
      moderateReduction:
        'Moderate reduction. Reduce dose or extend intervals for nephrotoxic drugs. Pharmacological evaluation needed.',
      moderateSevereReduction:
        'Moderate-severe reduction. Significant dosing adjustment (50-75% standard dose). Avoid NSAIDs and iodinated contrast.',
      severeReduction:
        'Severe reduction. Drastic dose reduction (25-50%). Many drugs contraindicated. Nephrology consultation mandatory.',
      renalFailure:
        'End-stage renal disease. Dialysis-dependent. Dosing based on dialysis timing. Dialyzable drugs require supplemental post-treatment dose.',
    },
  },

  // 7. EXPANDABLE SECTIONS (9 COMPLETE MEDICAL SECTIONS)
  sections: {
    // SECTION 1: Definition
    definition: {
      title: 'Clinical Definition',
      content: {
        definitionLabel: 'Definition:',
        definition:
          'Creatinine Clearance (CrCl) represents the volume of plasma completely cleared of creatinine per unit time, expressed in mL/min. It is an estimate of glomerular filtration primarily used for drug dosing.',
        differenceLabel: 'Difference between CrCl and eGFR:',
        differences: [
          '<strong>CrCl (Cockcroft-Gault):</strong> NOT normalized for BSA (1.73m2), depends on body weight -> used for drug dosing',
          '<strong>eGFR (MDRD/CKD-EPI):</strong> Normalized for BSA -> used for CKD staging',
        ],
        note: {
          title: 'Clinical Note:',
          text: 'Most drugs have dosing guidelines based on CrCl (Cockcroft-Gault), not eGFR. Use CrCl for drug adjustments.',
        },
      },
    },

    // SECTION 2: Physiology
    physiology: {
      title: 'Renal Clearance Physiology',
      content: {
        mechanismTitle: 'Clearance Mechanism:',
        mechanismIntro: 'Renal clearance of a substance is determined by three processes:',
        mechanisms: [
          '<strong>Glomerular Filtration:</strong> Creatinine filtered freely through glomeruli (~90% of clearance)',
          '<strong>Tubular Secretion:</strong> ~10% creatinine actively secreted in proximal tubule (organic transporters OCT2)',
          '<strong>Reabsorption:</strong> Creatinine is NOT reabsorbed (unlike urea)',
        ],
        equationLabel: 'Clearance Equation:',
        equation: 'C = (U x V) / P',
        equationParams: [
          'U = Urinary creatinine concentration (mg/dL)',
          'V = Urinary volume per minute (mL/min)',
          'P = Plasma creatinine concentration (mg/dL)',
        ],
        note: {
          title: 'Physiology:',
          text: 'Tubular secretion of creatinine causes ~10-20% GFR overestimation with 24h urinary CrCl measurement. Cockcroft-Gault corrects this discrepancy using empirical equation.',
        },
      },
    },

    // SECTION 3: Evaluation
    evaluation: {
      title: 'How to Calculate CrCl',
      content: {
        methodsTitle: 'Calculation Methods:',
        methods: [
          '<strong>24h Urine Collection (Gold Standard):</strong> C = (U x V) / P - Accurate but frequent collection errors (incomplete, incorrect timing)',
          '<strong>Cockcroft-Gault (Clinical):</strong> Estimates CrCl from serum creatinine, age, weight, sex - Standard method for drug dosing',
        ],
        whenToUseTitle: 'When to Use Cockcroft-Gault:',
        whenToUse: [
          'Dose adjustment for renally excreted drugs',
          'Elderly patients (>65 years) - more accurate than eGFR',
          'Obese patients (use ideal or adjusted body weight)',
          'Patients with reduced muscle mass (sarcopenia, amputations)',
        ],
        bestPractice: {
          title: 'Best Practice:',
          text: 'For obese patients (BMI >30), use ideal or adjusted weight: ABW = IBW + 0.4 x (Actual Weight - IBW).',
        },
      },
    },

    // SECTION 4: Formula
    formula: {
      title: 'Cockcroft-Gault Formula',
      content: {
        classicTitle: 'Classic Formula (1976):',
        formulaText:
          'CrCl (mL/min) = [(140 - Age) x Weight (kg) x (0.85 if female)] / (72 x Serum creatinine mg/dL)',
        parameters: [
          '<strong>140 - Age:</strong> Reflects renal function decline with aging (~1 mL/min/year after age 40)',
          '<strong>Weight (kg):</strong> Muscle mass correlated with creatinine production (NOT normalized for BSA)',
          '<strong>0.85 (female):</strong> Women have ~15% less muscle mass at equal weight',
          '<strong>72:</strong> Empirical constant derived from original studies (unit conversion + physiological factors)',
        ],
      },
      limitations: {
        title: 'Formula Limitations:',
        items: [
          '<strong>Obesity:</strong> Overestimates CrCl (weight != muscle mass). Use ideal/adjusted weight',
          '<strong>Sarcopenia:</strong> Underestimates CrCl in elderly with reduced muscle mass',
          '<strong>Weight extremes:</strong> Unreliable if weight &lt;40 kg or &gt;120 kg',
          '<strong>Variable creatinine:</strong> Influenced by diet, drugs (cimetidine, trimethoprim block tubular secretion)',
        ],
      },
      recommendation: {
        title: 'Recommendation:',
        text: 'Cockcroft-Gault remains FDA/EMA standard for drug dosing, despite limitations. Newer equations (CKD-EPI) not validated for pharmacokinetics.',
      },
    },

    // SECTION 5: Clinical Interpretation
    clinicalInterpretation: {
      title: 'Results Interpretation',
      content: {
        classification: {
          title: 'Renal Function Classification for Drug Dosing:',
          ranges: [
            '<strong class="text-green">>=90 mL/min:</strong> Normal - Standard dosing',
            '<strong class="text-light-green">60-89 mL/min:</strong> Mild reduction - Some drugs require adjustment',
            '<strong class="text-orange">45-59 mL/min:</strong> Moderate - Adjustment needed for nephrotoxic drugs',
            '<strong class="text-deep-orange">30-44 mL/min:</strong> Moderate-severe - 50-75% dose adjustment',
            '<strong class="text-red">15-29 mL/min:</strong> Severe - Drastic reduction 25-50%, many drugs contraindicated',
            '<strong class="text-purple">&lt;15 mL/min:</strong> ESRD - Dialysis-based dosing',
          ],
        },
        criticalDrugs: {
          title: 'Critical Drugs to Adjust:',
          categories: [
            '<strong>Antibiotics:</strong> Aminoglycosides, vancomycin, penicillins, fluoroquinolones',
            '<strong>Anticoagulants:</strong> Enoxaparin (?dose 50% if CrCl &lt;30), dabigatran contraindicated',
            '<strong>Hypoglycemics:</strong> Metformin (avoid if CrCl &lt;30), glyburide (?hypoglycemia risk)',
            '<strong>Others:</strong> Digoxin, lithium, allopurinol, methotrexate',
          ],
        },
      },
    },

    // SECTION 6: Clinical Applications
    clinicalApplications: {
      title: 'Clinical Applications',
      content: {
        primaryUse: {
          title: 'Primary Use - Drug Dosing:',
          applications: [
            '<strong>Drug Package Inserts:</strong> Dosing based on CrCl (Cockcroft-Gault), NOT eGFR',
            '<strong>Dose Calculator Software:</strong> Lexicomp, Micromedex use CrCl for calculations',
            '<strong>Clinical Trials:</strong> Most drug trials use Cockcroft-Gault for inclusion/exclusion',
          ],
        },
        specialPopulations: {
          title: 'Special Populations:',
          populations: [
            '<strong>Elderly (&gt;75 years):</strong> CrCl may appear normal despite ?actual GFR (?muscle mass). Use caution.',
            '<strong>Obese:</strong> Use adjusted body weight (ABW) to avoid overestimation',
            '<strong>Chemotherapy:</strong> Carboplatin dose = AUC x (GFR + 25) - Calvert formula uses eGFR, not CrCl',
          ],
        },
      },
    },

    // SECTION 7: Reference Values and Alerts
    referenceValues: {
      title: 'Critical Values and Alerts',
      content: {
        criticalValuesTitle: 'Critical Values for Drugs:',
        criticalValues: [
          '<strong class="text-red">CrCl &lt;30 mL/min:</strong> Avoid NSAIDs, metformin, nitrofurantoin. ?enoxaparin dose 50%.',
          '<strong class="text-red">CrCl &lt;15 mL/min:</strong> Avoid iodinated contrast (AKI risk). Many antibiotics contraindicated.',
          '<strong class="text-orange">CrCl 30-50 mL/min:</strong> ?dose 50% for aminoglycosides, fluoroquinolones. Monitor TDM.',
        ],
        highRiskDrugsTitle: 'High-Risk Drugs:',
        highRiskDrugs: [
          '<strong>Aminoglycosides (gentamicin, tobramycin):</strong> Nephrotoxic + ototoxic. Mandatory TDM.',
          '<strong>Vancomycin:</strong> Trough levels 15-20 ug/mL (severe infection). Monitor creatinine every 2-3 days.',
          '<strong>Lithium:</strong> Narrow therapeutic range (0.6-1.2 mEq/L). Toxicity if sudden CrCl ?.',
        ],
        clinicalAlert: {
          title: 'CLINICAL ALERT:',
          text: 'If CrCl &lt;30 mL/min and patient taking metformin, STOP IMMEDIATELY (fatal lactic acidosis risk).',
        },
      },
    },

    // SECTION 8: Documentation
    documentation: {
      title: 'Clinical Documentation',
      content: {
        templateTitle: 'Pharmacological Documentation Template:',
        templateExample: `<strong>CrCl (Cockcroft-Gault):</strong> [value] mL/min<br/>
<strong>Parameters:</strong> Age [X] years, Weight [Y] kg, Sex [M/F], Creatinine [Z] mg/dL<br/>
<strong>Interpretation:</strong> [Normal/Mild/Moderate/Severe reduction]<br/>
<strong>Drug Adjustments:</strong>
<ul>
  <li>[Drug]: [Adjusted dose] (from [standard dose] -> [new dose])</li>
  <li>[Discontinued drug]: Contraindicated with CrCl &lt;[threshold]</li>
</ul>`,
        elementsTitle: 'Elements to Document:',
        elements: [
          'Weight used for calculation (actual/ideal/adjusted)',
          'CrCl calculation date',
          'Adjusted or discontinued drugs',
          'Next creatinine re-evaluation (1-7 days depending on stability)',
        ],
      },
    },

    // SECTION 9: Bibliography
    bibliography: {
      title: 'Scientific References',
      content: {
        publicationsTitle: 'Key Publications:',
        publications: [
          '<strong>Cockcroft DW, Gault MH.</strong> (1976). Prediction of creatinine clearance from serum creatinine. <em>Nephron</em> 16(1):31-41',
          '<strong>Winter MA, et al.</strong> (2012). Impact of various body weights and serum creatinine concentrations on the bias and accuracy of the Cockcroft-Gault equation. <em>Ann Pharmacother</em> 46(12):1621-1629',
          '<strong>Verhave JC, et al.</strong> (2003). The association between atherosclerotic risk factors and renal function in the general population. <em>Kidney Int</em> 64(5):1681-1687',
        ],
        guidelinesTitle: 'Dosing Guidelines:',
        guidelines: [
          '<strong>FDA:</strong> Guidance for Industry - Pharmacokinetics in Patients with Impaired Renal Function',
          '<strong>EMA:</strong> Guideline on the evaluation of the pharmacokinetics of medicinal products in patients with decreased renal function',
          '<strong>KDIGO:</strong> Clinical Practice Guideline on Acute Kidney Injury (2012)',
        ],
        onlineResources: {
          title: 'Online Resources:',
          fdaLink: 'FDA Guidance',
          emaLink: 'EMA Guideline',
        },
      },
    },

    // Aliases for template compatibility (point to existing sections with different names)
    interpretation: {
      title: 'Results Interpretation',
      content: {
        classificationTitle: 'Renal Function Classification for Drug Dosing:',
        classification: [
          '<strong class="text-green">>=90 mL/min:</strong> Normal - Standard dosing',
          '<strong class="text-light-green">60-89 mL/min:</strong> Mild reduction - Some drugs require adjustment',
          '<strong class="text-orange">45-59 mL/min:</strong> Moderate - Adjustment needed for nephrotoxic drugs',
          '<strong class="text-deep-orange">30-44 mL/min:</strong> Moderate-severe - 50-75% dose adjustment',
          '<strong class="text-red">15-29 mL/min:</strong> Severe - Drastic reduction 25-50%, many drugs contraindicated',
          '<strong class="text-purple">&lt;15 mL/min:</strong> ESRD - Dialysis-based dosing',
        ],
        criticalDrugsTitle: 'Critical Drugs to Adjust:',
        criticalDrugs: [
          '<strong>Antibiotics:</strong> Aminoglycosides, vancomycin, penicillins, fluoroquinolones',
          '<strong>Anticoagulants:</strong> Enoxaparin (?dose 50% if CrCl &lt;30), dabigatran contraindicated',
          '<strong>Hypoglycemics:</strong> Metformin (avoid if CrCl &lt;30), glyburide (?hypoglycemia risk)',
          '<strong>Others:</strong> Digoxin, lithium, allopurinol, methotrexate',
        ],
      },
    },

    applications: {
      title: 'Clinical Applications',
      content: {
        primaryUseTitle: 'Primary Use - Drug Dosing:',
        primaryUse: [
          '<strong>Drug Package Inserts:</strong> Dosing based on CrCl (Cockcroft-Gault), NOT eGFR',
          '<strong>Dose Calculator Software:</strong> Lexicomp, Micromedex use CrCl for calculations',
          '<strong>Clinical Trials:</strong> Most drug trials use Cockcroft-Gault for inclusion/exclusion',
        ],
        specialPopulationsTitle: 'Special Populations:',
        specialPopulations: [
          '<strong>Elderly (&gt;75 years):</strong> CrCl may be normal despite ?actual GFR (?muscle mass). Use caution.',
          '<strong>Obese:</strong> Use adjusted body weight (ABW) to avoid overestimation',
          '<strong>Chemotherapy:</strong> Carboplatin dose = AUC x (GFR + 25) - Calvert formula uses eGFR, not CrCl',
        ],
      },
    },

    calculation: {
      title: 'How to Calculate CrCl',
      content: {
        methodsTitle: 'Calculation Methods:',
        methods: [
          '<strong>Cockcroft-Gault Formula (1976):</strong> Widely used for drug dosing. NOT normalized for BSA.',
          '<strong>24h Urine Collection:</strong> Gold standard but impractical (requires accurate timed collection)',
        ],
        whenToUseTitle: 'When to Use CrCl vs eGFR:',
        whenToUse: [
          '<strong>Use CrCl:</strong> Drug dosing adjustments (antibiotics, anticoagulants, chemotherapy)',
          '<strong>Use eGFR:</strong> CKD staging and progression monitoring',
          '<strong>Never Mix:</strong> DO NOT use eGFR for drug dosing - package inserts reference CrCl',
          '<strong>Elderly:</strong> CrCl essential (eGFR can underestimate renal impairment in low muscle mass)',
        ],
        bestPractice: {
          title: 'Best Practice:',
          text: 'For obese patients (BMI >30), use ideal or adjusted weight: ABW = IBW + 0.4 x (Actual Weight - IBW).',
        },
      },
    },
  },

  // 8. DISCLAIMER
  disclaimer: {
    title: 'Clinical Disclaimer:',
    text: 'This calculator provides estimates. Always verify drug package inserts and consult pharmacist/nephrologist for clinical decisions.',
  },
};
