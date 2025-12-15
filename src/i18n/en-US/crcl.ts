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

  // 2. FORM INPUT
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
        mainDefinition: {
          title: 'Definition:',
          text: 'Creatinine Clearance (CrCl) represents the volume of plasma completely cleared of creatinine per unit time, expressed in mL/min. It is an estimate of glomerular filtration primarily used for drug dosing.',
        },
        difference: {
          title: 'Difference between CrCl and eGFR:',
          items: [
            '<strong>CrCl (Cockcroft-Gault):</strong> NOT normalized for BSA (1.73m2), depends on body weight -> used for drug dosing',
            '<strong>eGFR (MDRD/CKD-EPI):</strong> Normalized for BSA -> used for CKD staging',
          ],
        },
        clinicalNote: {
          title: 'Clinical Note:',
          text: 'Most drugs have dosing guidelines based on CrCl (Cockcroft-Gault), not eGFR. Use CrCl for drug adjustments.',
        },
      },
    },

    // SECTION 2: Physiology
    physiology: {
      title: 'Renal Clearance Physiology',
      content: {
        mechanism: {
          title: 'Clearance Mechanism:',
          intro: 'Renal clearance of a substance is determined by three processes:',
          processes: [
            '<strong>Glomerular Filtration:</strong> Creatinine filtered freely through glomeruli (~90% of clearance)',
            '<strong>Tubular Secretion:</strong> ~10% creatinine actively secreted in proximal tubule (organic transporters OCT2)',
            '<strong>Reabsorption:</strong> Creatinine is NOT reabsorbed (unlike urea)',
          ],
        },
        equation: {
          title: 'Clearance Equation:',
          formula: 'C = (U x V) / P',
          parameters: [
            'U = Urinary creatinine concentration (mg/dL)',
            'V = Urinary volume per minute (mL/min)',
            'P = Plasma creatinine concentration (mg/dL)',
          ],
        },
        physiologyNote: {
          title: 'Physiology:',
          text: 'Tubular secretion of creatinine causes ~10-20% GFR overestimation with 24h urinary CrCl measurement. Cockcroft-Gault corrects this discrepancy using empirical equation.',
        },
      },
    },

    // SECTION 3: Evaluation
    evaluation: {
      title: 'How to Calculate CrCl',
      content: {
        methods: {
          title: 'Calculation Methods:',
          items: [
            '<strong>24h Urine Collection (Gold Standard):</strong> C = (U x V) / P - Accurate but frequent collection errors (incomplete, incorrect timing)',
            '<strong>Cockcroft-Gault (Clinical):</strong> Estimates CrCl from serum creatinine, age, weight, sex - Standard method for drug dosing',
          ],
        },
        whenToUse: {
          title: 'When to Use Cockcroft-Gault:',
          items: [
            'Dose adjustment for renally excreted drugs',
            'Elderly patients (>65 years) - more accurate than eGFR',
            'Obese patients (use ideal or adjusted body weight)',
            'Patients with reduced muscle mass (sarcopenia, amputations)',
          ],
        },
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
        classicFormula: {
          title: 'Classic Formula (1976):',
          equation:
            'CrCl (mL/min) = [(140 - Age) x Weight (kg) x (0.85 if female)] / (72 x Serum creatinine mg/dL)',
          components: [
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
        criticalValues: {
          title: 'Critical Values for Drugs:',
          alerts: [
            '<strong class="text-red">CrCl &lt;30 mL/min:</strong> Avoid NSAIDs, metformin, nitrofurantoin. ?enoxaparin dose 50%.',
            '<strong class="text-red">CrCl &lt;15 mL/min:</strong> Avoid iodinated contrast (AKI risk). Many antibiotics contraindicated.',
            '<strong class="text-orange">CrCl 30-50 mL/min:</strong> ?dose 50% for aminoglycosides, fluoroquinolones. Monitor TDM.',
          ],
        },
        highRiskDrugs: {
          title: 'High-Risk Drugs:',
          drugs: [
            '<strong>Aminoglycosides (gentamicin, tobramycin):</strong> Nephrotoxic + ototoxic. Mandatory TDM.',
            '<strong>Vancomycin:</strong> Trough levels 15-20 ug/mL (severe infection). Monitor creatinine every 2-3 days.',
            '<strong>Lithium:</strong> Narrow therapeutic range (0.6-1.2 mEq/L). Toxicity if sudden CrCl ?.',
          ],
        },
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
        template: {
          title: 'Pharmacological Documentation Template:',
          example: `<strong>CrCl (Cockcroft-Gault):</strong> [value] mL/min<br/>
<strong>Parameters:</strong> Age [X] years, Weight [Y] kg, Sex [M/F], Creatinine [Z] mg/dL<br/>
<strong>Interpretation:</strong> [Normal/Mild/Moderate/Severe reduction]<br/>
<strong>Drug Adjustments:</strong>
<ul>
  <li>[Drug]: [Adjusted dose] (from [standard dose] -> [new dose])</li>
  <li>[Discontinued drug]: Contraindicated with CrCl &lt;[threshold]</li>
</ul>`,
        },
        elementsToDocument: {
          title: 'Elements to Document:',
          items: [
            'Weight used for calculation (actual/ideal/adjusted)',
            'CrCl calculation date',
            'Adjusted or discontinued drugs',
            'Next creatinine re-evaluation (1-7 days depending on stability)',
          ],
        },
      },
    },

    // SECTION 9: Bibliography
    bibliography: {
      title: 'Scientific References',
      content: {
        keyPublications: {
          title: 'Key Publications:',
          references: [
            '<strong>Cockcroft DW, Gault MH.</strong> (1976). Prediction of creatinine clearance from serum creatinine. <em>Nephron</em> 16(1):31-41',
            '<strong>Winter MA, et al.</strong> (2012). Impact of various body weights and serum creatinine concentrations on the bias and accuracy of the Cockcroft-Gault equation. <em>Ann Pharmacother</em> 46(12):1621-1629',
            '<strong>Verhave JC, et al.</strong> (2003). The association between atherosclerotic risk factors and renal function in the general population. <em>Kidney Int</em> 64(5):1681-1687',
          ],
        },
        guidelines: {
          title: 'Dosing Guidelines:',
          items: [
            '<strong>FDA:</strong> Guidance for Industry - Pharmacokinetics in Patients with Impaired Renal Function',
            '<strong>EMA:</strong> Guideline on the evaluation of the pharmacokinetics of medicinal products in patients with decreased renal function',
            '<strong>KDIGO:</strong> Clinical Practice Guideline on Acute Kidney Injury (2012)',
          ],
        },
        onlineResources: {
          title: 'Online Resources:',
          links: [
            {
              text: 'FDA Guidance',
              url: 'https://www.fda.gov/drugs/drug-development-tool-ddt-qualification-programs',
            },
            {
              text: 'EMA Guideline',
              url: 'https://www.ema.europa.eu/en/documents/scientific-guideline/guideline-evaluation-pharmacokinetics-medicinal-products-patients-decreased-renal-function_en.pdf',
            },
          ],
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
