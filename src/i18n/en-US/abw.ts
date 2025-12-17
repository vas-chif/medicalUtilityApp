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

  // 7. DOCUMENTATION SECTIONS (9 NEWS-STYLE SECTIONS)
  documentationSections: {
    definition: {
      title: 'Clinical Definition',
      content: {
        mainDefinition: {
          title: 'Definition:',
          text: 'Adjusted Body Weight (ABW) is a body weight correction method used primarily for obese patients (BMI ≥30 kg/m²) in pharmacological and nutritional management. It applies a 25% correction factor to excess weight over Ideal Body Weight (IBW), reflecting that only a fraction of excess adipose tissue contributes to metabolism and pharmacokinetics.',
        },
        keyPrinciples: {
          title: 'Fundamental Principles:',
          items: [
            '<strong>25% Correction Factor:</strong> Empirical formula derived from pharmacokinetic studies in obese patients, indicates ~25% excess adipose tissue is metabolically active',
            '<strong>Lipophilic Drug Dosing:</strong> Propofol, benzodiazepines, amiodarone, fentanyl - use ABW for increased distribution volume in fat',
            '<strong>Hydrophilic Drug Dosing:</strong> Aminoglycosides, vancomycin, hydrophilic NMBs - use IBW or Lean Body Weight, NOT ABW (poor adipose penetration)',
            '<strong>Obesity Nutrition:</strong> Calculating caloric requirements (20-25 kcal/kg ABW) and protein (1.2-2 g/kg ABW) prevents overfeeding',
          ],
        },
        clinicalImportance: {
          title: 'Clinical Importance:',
          description:
            'Incorrect use of body weight (actual vs IBW vs ABW) is a frequent cause of dosing errors in obese patients, with serious consequences:',
          points: [
            '<strong>Drug Overdosing:</strong> Using actual weight for hydrophilic drugs (e.g., gentamicin 5 mg/kg on 150 kg = 750 mg) causes renal toxicity/ototoxicity',
            '<strong>Anesthetic Underdosing:</strong> Using IBW for propofol (2 mg/kg on 70 kg = 140 mg) causes inadequate sedation in 150 kg patient',
            '<strong>Paradoxical Malnutrition:</strong> Critically ill obese patients often sarcopenic, high protein requirement (1.5-2 g/kg ABW) to prevent muscle catabolism',
            '<strong>Protective Ventilation:</strong> Tidal volume calculated on Predicted Body Weight (PBW), not actual weight, to prevent VILI (6 mL/kg PBW)',
          ],
        },
      },
    },
    physiology: {
      title: 'Body Composition Physiology',
      content: {
        bodyComposition: {
          title: 'Body Compartments and Obesity:',
          description:
            'Human body consists of lean mass (FFM, fat-free mass) and fat mass (FM). Obesity drastically alters this proportion:',
          components: [
            '<strong>Lean Mass (FFM):</strong> Muscles, organs, bones, water. Metabolically active, consumes ~70% basal energy. Obese: FFM increased +20-30% vs normal weight',
            '<strong>Fat Mass (FM):</strong> Subcutaneous/visceral adipose tissue. Metabolically less active (~10% basal energy), but produces adipokines (leptin, adiponectin)',
            '<strong>Lean Body Mass (LBM):</strong> FFM + essential fat (~3% men, ~12% women). LBM = 1.1×ABW more accurate for lipophilic drug dosing',
            '<strong>Total Body Water (TBW):</strong> ~60% normal weight, ~40-50% obese. Hydrophilic drug distribution volume depends on TBW (0.4-0.5 L/kg)',
          ],
        },
        pharmacokinetics: {
          title: 'Obesity Pharmacokinetics:',
          parameters: [
            '<strong>Volume of Distribution (Vd):</strong> Lipophilic drugs (propofol, fentanyl, midazolam) Vd↑↑ 30-50% in obese. Hydrophilic drugs (aminoglycosides) Vd~ unchanged',
            '<strong>Renal Clearance (Cl):</strong> GFR increased in young obese (+30-40% above 150 mL/min/1.73m²), but often compensatory hyperfiltration pre-renal failure',
            '<strong>Hepatic Clearance:</strong> Hepatic flow increased, but variable CYP activity (CYP3A4↑, CYP2E1↑↑ steatosis, CYP1A2↓ severe obesity)',
            '<strong>Half-life (t½):</strong> Propofol t½ 3-12h obese vs 2-4h normal weight (Vd↑), remifentanil t½ unchanged (plasma esterase metabolism, context-insensitive)',
          ],
        },
        metabolicChanges: {
          title: 'Obesity Metabolic Alterations:',
          changes: [
            '<strong>Insulin Resistance:</strong> Compensatory hyperinsulinemia, reduced insulin clearance, stricter HbA1c targets (≤7% vs ≤8% normal weight)',
            '<strong>Chronic Inflammation:</strong> Adipose tissue produces IL-6, TNF-α, elevated CRP (>5 mg/L), prothrombotic state (VTE risk 2-3x)',
            '<strong>Increased Cardiac Output:</strong> +0.1 L/min per kg excess weight, left ventricular hypertrophy, early diastolic dysfunction',
            '<strong>Basal O₂ Consumption:</strong> REE (resting energy expenditure) increased 10-20% obese, but REE/kg actual weight reduced (25 vs 30 kcal/kg)',
          ],
        },
      },
    },
    measurement: {
      title: 'Measurement Technique and Calculation',
      content: {
        clinicalMeasurement: {
          title: 'Clinical Parameter Measurement:',
          items: [
            '<strong>Actual Weight:</strong> Calibrated scale (accuracy ±0.1 kg), undressed patient, post-void, morning fasting for consistency',
            '<strong>Height:</strong> Stadiometer (accuracy ±0.5 cm), barefoot patient, upright posture, Frankfurt plane gaze, 3 measurements (average)',
            '<strong>BMI Calculation:</strong> BMI = Weight(kg) / Height²(m²). Obesity: BMI ≥30 (WHO), but ethnic cut-offs: Asians ≥27.5, South Asians ≥25',
            '<strong>IBW Calculation:</strong> Standard formulas (Devine, Robinson, Miller). Men: 50 kg + 2.3 kg/inch above 5 ft. Women: 45.5 kg + 2.3 kg/inch',
          ],
        },
        calculationFormulas: {
          title: 'ABW Calculation Formulas and Variants:',
          steps: [
            '<strong>Standard ABW:</strong> ABW = IBW + 0.25 × (Actual Weight - IBW). Factor 0.25 validated for BMI 30-40, lipophilic drug dosing',
            '<strong>Modified ABW (BMI >40):</strong> ABW = IBW + 0.4 × (Actual Weight - IBW). Severe obesity, factor 0.4 more accurate for masses >40% excess',
            '<strong>Lean Body Mass (Boer):</strong> LBM (men) = 0.407×Weight + 0.267×Height - 19.2. LBM (women) = 0.252×Weight + 0.473×Height - 48.3',
            '<strong>Lean Body Mass (James):</strong> LBM (men) = 1.1×Weight - 128×(Weight²/Height²). LBM (women) = 1.07×Weight - 148×(Weight²/Height²)',
            '<strong>Predicted Body Weight (ARDSnet):</strong> PBW (men) = 50 + 0.91×(Height(cm) - 152.4). PBW (women) = 45.5 + 0.91×(Height(cm) - 152.4)',
          ],
        },
        practicalProtocol: {
          title: 'Weight Dosing Decision Protocol:',
          protocol: [
            '<strong>Step 1 - Identify Obesity:</strong> BMI ≥30 or Weight > 120% IBW → Proceed with ABW calculation, otherwise use actual weight',
            '<strong>Step 2 - Classify Drug:</strong> Lipophilic (Vd ↑ obesity) → ABW/LBM. Hydrophilic (Vd unchanged) → IBW. Uncertain → Consult pharmacologist',
            '<strong>Step 3 - Calculate Dose:</strong> Initial dose on ABW, monitor TDM (therapeutic drug monitoring) if available (e.g., vancomycin trough 10-20 mg/L)',
            '<strong>Step 4 - Adjust PRN:</strong> Reassess after 24-48h, TDM for narrow window drugs, consider increased renal clearance (CrCl Cockcroft-Gault on ABW)',
          ],
        },
      },
    },
    formula: {
      title: 'Formulas and Calculations',
      content: {
        formulaDerivation: {
          title: 'ABW Formula Derivation:',
          description:
            '<strong>ABW (kg) = IBW (kg) + 0.25 × [Actual Weight (kg) - IBW (kg)]</strong><br>Where IBW = Ideal Body Weight calculated from anthropometric formulas (Devine, Robinson). The 0.25 factor (25%) represents the metabolically active fraction of excess adipose tissue.',
          steps: [
            '<strong>Step 1 - IBW (Devine females):</strong> IBW = 45.5 + 2.3 × [(165-152.4)/2.54] = 45.5 + 2.3 × 4.96 = 45.5 + 11.4 = <strong>56.9 kg</strong>',
            '<strong>Step 2 - Excess Weight:</strong> Excess = 120 - 56.9 = <strong>63.1 kg</strong> (53% total weight is adipose tissue)',
            '<strong>Step 3 - ABW Calculation:</strong> ABW = 56.9 + 0.25 × 63.1 = 56.9 + 15.8 = <strong>72.7 kg</strong>',
            '<strong>Step 4 - Propofol Dose:</strong> Induction 1.5-2.5 mg/kg ABW = 1.5 × 72.7 = <strong>109 mg</strong> (vs 180 mg on actual weight = overdosing!)',
            '<strong>Step 5 - Maintenance Infusion:</strong> 25-75 mcg/kg/min ABW = 50 × 72.7 = <strong>3.6 mg/min</strong> = <strong>218 mg/h</strong>',
          ],
        },
        practicalExamples: {
          title: 'Practical Examples:',
          examples: [
            '<strong>Example 1 - Propofol Obesity:</strong> Female 165 cm, 120 kg, BMI 44 kg/m². IBW 56.9 kg → ABW = 56.9 + 0.25×(120-56.9) = 72.7 kg. Propofol dose: 1.5 mg/kg ABW = 109 mg (vs 180 mg on actual weight)',
            '<strong>Example 2 - Gentamicin:</strong> Male 180 cm, 140 kg, BMI 43 kg/m². IBW 75 kg. Use IBW NOT ABW! Dose: 5 mg/kg IBW = 375 mg q24h (vs 700 mg on actual weight = toxicity)',
            '<strong>Example 3 - Critical Obesity Nutrition:</strong> Patient 110 kg, ABW 78 kg. Calories: 22 kcal/kg ABW = 1716 kcal/day. Protein: 1.5 g/kg ABW = 117 g/day (permissive underfeeding)',
          ],
        },
        clinicalVariations: {
          title: 'Clinical Formula Variations:',
          variations: [
            '<strong>Lipophilic Drugs (Propofol, Fentanyl):</strong> Use ABW or TBW (Total Body Weight). Increased Vd, adipose tissue accumulation',
            '<strong>Hydrophilic Drugs (Gentamicin, Vancomycin):</strong> Use IBW or fixed mg/kg dosing. Unchanged Vd, toxicity if dosed on TBW',
            '<strong>Intermediate NMBs (Rocuronium, Vecuronium):</strong> Use IBW. Delayed onset in obese, unchanged duration, avoid overdosing',
            '<strong>Succinylcholine:</strong> Use TBW (Total Body Weight). Increased plasma cholinesterase in obese, 1-1.5 mg/kg TBW dose safe',
            '<strong>Enteral Nutrition:</strong> Use ABW for calories (20-25 kcal/kg ABW) and protein (1.2-2 g/kg ABW). Avoid overfeeding',
          ],
        },
      },
    },
    interpretation: {
      title: 'Weight Range Interpretation',
      content: {
        clinicalRanges: {
          title: 'Clinical ABW Ranges:',
          description: 'WHO obesity classification and weight choice for drug dosing/nutrition.',
          ranges: [
            '<strong>Normal Weight:</strong> BMI 18.5-24.9 kg/m². Actual Weight ≈ IBW (±10%). Use actual weight for drug dosing',
            '<strong>Overweight:</strong> BMI 25-29.9 kg/m². Actual Weight 110-130% IBW. Consider ABW for lipophilic drugs if BMI >27',
            '<strong>Class I Obesity:</strong> BMI 30-34.9 kg/m². ABW mandatory, typical excess weight 30-50 kg for 170 cm adult',
            '<strong>Class II Obesity:</strong> BMI 35-39.9 kg/m² (severe obesity). ABW with 0.3-0.4 factor, consult clinical pharmacologist',
            '<strong>Class III Obesity:</strong> BMI ≥40 kg/m² (morbid obesity). ABW factor 0.4, consider LBM from bioimpedance, TDM mandatory',
          ],
        },
        obesityCriteria: {
          title: 'Obesity Criteria:',
          criteria: [
            '<strong>Propofol Induction:</strong> 1.5-2.5 mg/kg ABW (max 200 mg bolus). Infusion 25-75 mcg/kg/min ABW. Avoid >5 mg/kg/h (PRIS risk)',
            '<strong>Fentanyl Boluses:</strong> 1-2 mcg/kg ABW. Infusion 0.5-2 mcg/kg/h ABW. Context-dependent accumulation, reduce after 8h infusion',
            '<strong>Midazolam:</strong> 0.025-0.05 mg/kg ABW (max 2.5 mg bolus). Prolonged half-life in obese (4-8h vs 2-4h), reduce dose 30-50%',
            '<strong>Rocuronium:</strong> 0.6-1.2 mg/kg IBW (NOT TBW!). Delayed onset (90-120 sec vs 60 sec), unchanged duration',
            '<strong>Gentamicin:</strong> 5-7 mg/kg IBW q24h (extended-interval). TBW dosing causes nephrotoxicity. Target trough <1 mg/L',
          ],
        },
        clinicalSignificance: {
          title: 'Clinical Significance:',
          significance: [
            '<strong>Hypocaloric Calories:</strong> 20-25 kcal/kg ABW/day (vs 25-30 kcal/kg normal weight). Patient 120 kg ABW 72.7 kg → 1450-1820 kcal/day',
            '<strong>High Protein:</strong> 1.2-2 g/kg ABW/day (vs 1-1.2 g/kg normal weight). Prevent sarcopenia/catabolism. Target 87-145 g/day ABW 72.7 kg',
            '<strong>Permissive Underfeeding:</strong> 50-70% caloric requirement, 100% protein requirement. Effective in critically ill obese to reduce complications',
            '<strong>Monitoring:</strong> Nitrogen balance, albumin, prealbumin (↓50% indicates malnutrition), creatinine (↓ sarcopenia), handgrip strength',
          ],
        },
      },
    },
    applications: {
      title: 'Clinical Applications',
      content: {
        drugDosing: {
          title: 'Drug Dosing in Obesity:',
          description: 'Correct weight choice for pharmacological category.',
          categories: [
            '<strong>Lipophilic (Propofol, Fentanyl, Midazolam):</strong> Use ABW. Increased Vd, adipose tissue accumulation, inadequate sedation/analgesia if dosed on IBW',
            '<strong>Hydrophilic (Aminoglycosides, Vancomycin):</strong> Use IBW. Unchanged Vd, nephrotoxicity/ototoxicity if dosed on TBW',
            '<strong>Intermediate NMBs (Rocuronium, Vecuronium):</strong> Use IBW. Delayed onset in obese but unchanged duration, avoid overdosing',
            '<strong>Succinylcholine:</strong> Use TBW. Increased plasma cholinesterase in obese, 1-1.5 mg/kg TBW dose safe',
            '<strong>β-Lactam Antibiotics:</strong> Standard dose (NO weight adjustment). Time-dependent PK/PD, extended infusion preferable',
          ],
        },
        nutritionAssessment: {
          title: 'Nutritional Assessment:',
          applications: [
            '<strong>Hypocaloric Calories:</strong> 20-25 kcal/kg ABW/day (vs 25-30 normal weight). Patient 120 kg ABW 72.7 kg → 1450-1820 kcal/day',
            '<strong>High Protein:</strong> 1.2-2 g/kg ABW/day (vs 1-1.2 normal weight). Prevent sarcopenia. Target 87-145 g/day ABW 72.7 kg',
            '<strong>Permissive Underfeeding:</strong> 50-70% caloric requirement, 100% protein. Effective reduce complications critically ill obese',
            '<strong>Nutritional Monitoring:</strong> Albumin, prealbumin (↓50% malnutrition), nitrogen balance, handgrip strength',
          ],
        },
        anesthesiaProtocol: {
          title: 'Anesthesia Protocols:',
          protocols: [
            '<strong>Anesthesia Induction:</strong> Propofol 1.5-2.5 mg/kg ABW, fentanyl 1-2 mcg/kg ABW, rocuronium 0.6-1.2 mg/kg IBW',
            '<strong>Sedation Maintenance:</strong> Propofol 25-75 mcg/kg/min ABW, remifentanil 0.05-0.2 mcg/kg/min ABW',
            '<strong>Protective Ventilation:</strong> VT 6-8 mL/kg PBW (NOT TBW!), PEEP 10-15 cmH2O, recruitment maneuvers',
            '<strong>Intraoperative Positioning:</strong> Rampa positioning, reverse Trendelenburg 25-30°, pressure point protection',
          ],
        },
      },
    },
    alerts: {
      title: 'Safety Alerts',
      content: {
        dosingErrors: {
          title: 'Dosing Errors:',
          description: 'Common errors in ABW use and associated risks.',
          errors: [
            '<strong>Error #1 - TBW for Hydrophilic Drugs:</strong> Gentamicin 5 mg/kg on 150 kg = 750 mg (toxic!). CORRECT: 5 mg/kg IBW 70 kg = 350 mg',
            '<strong>Error #2 - IBW for Lipophilic Drugs:</strong> Propofol 2 mg/kg IBW 70 kg = 140 mg (under-sedation). CORRECT: 2 mg/kg ABW 90 kg = 180 mg',
            '<strong>Error #3 - Tidal Volume on TBW:</strong> VT 8 mL/kg × 150 kg = 1200 mL (barotrauma!). CORRECT: VT 6-8 mL/kg PBW 70 kg = 420-560 mL',
            '<strong>Error #4 - Nutrition on TBW:</strong> 30 kcal/kg × 150 kg = 4500 kcal (overfeeding). CORRECT: 25 kcal/kg ABW 90 kg = 2250 kcal',
            '<strong>Error #5 - NMB on TBW:</strong> Rocuronium 1 mg/kg × 150 kg = 150 mg (prolonged curarization). CORRECT: 1 mg/kg IBW 70 kg = 70 mg',
          ],
        },
        contraindications: {
          title: 'Contraindications and Precautions:',
          conditions: [
            '<strong>Obesity + Renal Failure:</strong> CrCl Cockcroft-Gault overestimates GFR if actual weight used. Use ABW or IBW, monitor serum creatinine',
            '<strong>Obesity + Hepatic Failure:</strong> Unpredictable hepatic drug clearance (steatosis ↓CYP, cirrhosis ↓↓). TDM mandatory for propofol, midazolam',
            '<strong>Super-Obesity (BMI >50):</strong> ABW/LBM formulas not validated. Bioimpedance or DEXA scan for FFM, clinical pharmacologist consultation',
            '<strong>Pediatric Obesity:</strong> Adult formulas NOT applicable. Use specific formulas (Traub-Johnson, Moore) or fixed mg dosing',
            '<strong>Pregnancy + Obesity:</strong> ABW not validated, altered distribution volume, increased clearance. Consider standard dosing + TDM',
          ],
        },
        monitoringRequired: {
          title: 'Mandatory Monitoring:',
          monitoring: [
            '<strong>TDM (Therapeutic Drug Monitoring):</strong> Vancomycin trough q3-4 days, aminoglycosides trough+peak after dose 3-4, digoxin trough weekly',
            '<strong>Renal Function:</strong> Creatinine, BUN, CrCl Cockcroft-Gault (ABW) daily ICU. Urine output >0.5 mL/kg/h (on TBW, not ABW!)',
            '<strong>Hepatic Function:</strong> AST, ALT, bilirubin, INR (if anticoagulation). Steatosis common in obese (30-90% prevalence)',
            '<strong>Sedation Depth:</strong> RASS/SAS q4h, BIS monitoring if propofol >48h (target 40-60), daily sedation interruption ABC protocol',
            '<strong>Nutritional Status:</strong> Baseline albumin then weekly, prealbumin (t½ 2 days), transferrin, lymphocyte count, nitrogen balance',
          ],
        },
      },
    },
    documentation: {
      title: 'Protocols and Documentation',
      content: {
        clinicalGuidelines: {
          title: 'Clinical Guidelines:',
          guidelines: [
            '<strong>ASA Practice Guidelines (2020):</strong> "Perioperative Management of Obese Patients". Drug dosing recommendations, ventilation, positioning',
            '<strong>ASPEN Guidelines (2016):</strong> "Nutrition Support in Critically Ill Obese Patients". Hypocaloric high-protein 1.2-2 g/kg ABW, permissive underfeeding',
            '<strong>ESPEN Guidelines (2019):</strong> "Obesity and Clinical Nutrition". ABW for requirement calculation, stress factor 1.2-1.3 (vs 1.5-1.7 normal weight)',
            '<strong>SCCM/ASHP Guidelines (2016):</strong> "Analgesia and Sedation in Critically Ill Adults". Propofol 25-50 mcg/kg/min ABW, daily interruption',
            '<strong>ATS/IDSA Guidelines (2019):</strong> "Hospital-Acquired and Ventilator-Associated Pneumonia". Weight-adjusted antibiotic dosing, vancomycin TDM',
          ],
        },
        pharmacyProtocols: {
          title: 'Pharmacy Protocols:',
          protocols: [
            '<strong>Dosing Weight Verification:</strong> Pharmacist verifies which weight used for dose (TBW, IBW, ABW, LBM), congruence with drug',
            '<strong>Critical Dosing Alert:</strong> System generates automatic alert if dose >120% standard or <50% expected, pharmacist review required',
            '<strong>TDM Protocol:</strong> Vancomycin trough pre-dose 4, aminoglycosides trough+peak dose 3, adjustment Hartford nomogram/AUC',
            '<strong>EHR Documentation:</strong> Actual weight, IBW, ABW, weight used for dose documented in electronic health record for each prescription',
          ],
        },
        documentationRequirements: {
          title: 'Clinical Documentation Requirements:',
          requirements: [
            '<strong>Documented Weight:</strong> Actual weight, height, BMI, IBW (formula used), ABW (factor 0.25 or 0.4), PBW if ventilated',
            '<strong>Dosing Weight Choice:</strong> Document which weight used (TBW, IBW, ABW, LBM) for each drug, decision rationale',
            '<strong>Calculated Dose:</strong> Dose mg/kg, reference weight, absolute dose mg, route of administration, frequency',
            '<strong>TDM Monitoring:</strong> Drug levels (trough, peak), timing of sample, therapeutic target, consequent dose adjustments',
            '<strong>Periodic Reassessment:</strong> Weekly weight, ABW reassessment if change >5 kg, dose adjustment PRN',
          ],
        },
      },
    },
    references: {
      title: 'Scientific References',
      content: {
        scientificStudies: {
          title: 'Fundamental Scientific Studies:',
          studies: [
            '<strong>Robinson JD et al (1983):</strong> "Determination of ideal body weight for drug dosage calculations". PMID:6606682. Devine IBW formulas validated 5000+ patients',
            '<strong>Pai MP, Paloucek FP (2000):</strong> "Aminoglycoside dosing in overweight and obese patients". PMID:10868820. IBW dosing prevents nephrotoxicity',
            '<strong>Winter MA et al (2012):</strong> "Impact of various body weights on aminoglycoside clearance". PMID:22378318. ABW factor 0.4 optimal gentamicin/tobramycin',
            '<strong>Janmahasatian S et al (2005):</strong> "Quantification of lean bodyweight". PMID:15730264. LBM formula accurate Vd prediction lipophilic drugs',
            '<strong>Ingrande J, Lemmens HJ (2010):</strong> "Dose adjustment of anaesthetics in obese". PMID:21059128. Propofol/fentanyl ABW, rocuronium IBW',
          ],
        },
        clinicalGuidelinesReferences: {
          title: 'Clinical Guidelines References:',
          references: [
            '<strong>ASPEN 2016:</strong> "Nutrition Support in Critically Ill Obese". JPEN. PMID:26825520. Hypocaloric 20-25 kcal/kg ABW + protein 1.2-2 g/kg ABW',
            '<strong>ESPEN 2018:</strong> "Clinical nutrition in surgery". PMID:30348463. ABW requirement calculation, early enteral nutrition <24h',
            '<strong>ASA 2020:</strong> "Perioperative Management Obese Patients". Anesthesiology. Drug dosing, airway, VTE prophylaxis',
            '<strong>SCCM 2018:</strong> "Pain, Agitation, Sedation Guidelines". Crit Care Med. PMID:30113379. Propofol 25-50 mcg/kg/min ABW',
            '<strong>IDSA/ATS 2016:</strong> "Hospital/Ventilator Pneumonia". PMID:27418577. Aminoglycosides IBW dosing, vancomycin loading TBW',
          ],
        },
        additionalResources: {
          title: 'Additional Resources:',
          resources: [
            '<strong>MDCalc - ABW Calculator:</strong> Validated ABW/LBM calculator with obesity drug dosing guides',
            '<strong>GlobalRPh - IBW Calculator:</strong> Multiple formulas (Devine, Robinson, Miller) with results comparison',
            '<strong>UIC Obesity Dosing Database:</strong> 150+ drugs obesity-specific dosing, University Illinois Chicago',
            '<strong>Pharmacotherapy 2012 Review:</strong> "Drug dosing based on weight" Pai MP. PMID:22392830. Critique weight-based methods',
            '<strong>UpToDate - Drug Dosing Obesity:</strong> Updated monograph obesity drug dosing, TDM protocols',
          ],
        },
      },
    },
  },
};
