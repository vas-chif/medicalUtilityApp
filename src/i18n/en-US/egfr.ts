/**
 * @file en-US/egfr.ts
 * @description English translations for eGFR Calculator (estimated Glomerular Filtration Rate)
 * @author Vasile Chifeac
 * @created 2025-12-13
 * @modified 2025-12-13
 */

export default {
  // ============================================================
  // 1. MAIN TITLES
  // ============================================================
  title: 'eGFR Calculator',
  subtitle: 'Estimated Glomerular Filtration Rate Calculation for CKD Staging',

  // ============================================================
  // 2. INPUT PANEL
  // ============================================================
  inputPanel: {
    title: 'Patient Parameters',
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
    gender: {
      label: 'Gender',
      validation: 'Select gender',
      options: {
        male: 'Male',
        female: 'Female',
      },
    },
    race: {
      label: 'Ethnicity (optional for correction)',
      options: {
        other: 'Other',
        african: 'African American',
      },
    },
    formula: {
      label: 'Calculation Formula',
      options: {
        ckdepi: 'CKD-EPI (Recommended)',
        mdrd: 'MDRD',
      },
    },
  },

  // ============================================================
  // 3. BUTTONS
  // ============================================================
  buttons: {
    calculate: 'Calculate eGFR',
    reset: 'Reset Data',
    compareFormulas: 'Compare Formulas',
  },

  // ============================================================
  // 4. RESULTS PANEL
  // ============================================================
  resultsPanel: {
    title: 'Results',
    result: {
      unit: 'mL/min/1.73m2',
      label: 'eGFR',
      formulaPrefix: 'Formula:',
    },
    ckdStageTitle: 'Chronic Kidney Disease Stage:',
    renalFunctionTitle: 'Renal Function Level:',
    comparisonTitle: 'Formula Comparison:',
  },

  // ============================================================
  // 5. CKD STAGES (KDIGO Classification)
  // ============================================================
  ckdStages: {
    stage1: {
      label: 'Stage 1',
      description: 'Normal renal function',
      range: '>=90',
    },
    stage2: {
      label: 'Stage 2',
      description: 'Mild reduction in renal function',
      range: '60-89',
    },
    stage3a: {
      label: 'Stage 3a',
      description: 'Moderate reduction in renal function',
      range: '45-59',
    },
    stage3b: {
      label: 'Stage 3b',
      description: 'Moderate-severe reduction',
      range: '30-44',
    },
    stage4: {
      label: 'Stage 4',
      description: 'Severe reduction in renal function',
      range: '15-29',
    },
    stage5: {
      label: 'Stage 5',
      description: 'End-stage renal disease',
      range: '<15',
    },
  },

  // ============================================================
  // 6. NEWS-STYLE SECTIONS (9 Mandatory Sections)
  // ============================================================
  sections: {
    // SECTION 1: DEFINITION AND CLINICAL SIGNIFICANCE
    definition: {
      title: 'Definition and Clinical Significance',
      content: {
        definitionLabel: 'Definition:',
        definition:
          '<strong>Estimated Glomerular Filtration Rate (eGFR)</strong> represents the rate at which kidneys filter blood, expressed in mL/min/1.73m2. It is the primary indicator for assessing renal function and diagnosing Chronic Kidney Disease (CKD).',
        clinicalSignificanceLabel: 'Clinical Significance:',
        clinicalSignificance: [
          '<strong>CKD Screening:</strong> Early identification of renal dysfunction before symptoms',
          '<strong>KDIGO Staging:</strong> Classifies CKD severity (Stages 1-5)',
          '<strong>Cardiovascular Prognosis:</strong> eGFR <60 increases CV event risk',
          '<strong>Therapeutic Decisions:</strong> Guides drug dosing, dialysis timing, transplant eligibility',
        ],
        note: {
          title: 'Clinical Note:',
          text: 'eGFR is <strong>normalized for body surface area</strong> (1.73m2) -> use for CKD staging. For drug dosing, prefer <strong>CrCl (Cockcroft-Gault)</strong> non-normalized.',
        },
      },
    },

    // SECTION 2: PHYSIOLOGY OF GLOMERULAR FILTRATION
    physiology: {
      title: 'Physiology of Glomerular Filtration',
      content: {
        mechanismTitle: 'Physiological Mechanism:',
        mechanismIntro:
          'Glomerular filtration is the first step of urine formation, determined by:',
        mechanisms: [
          '<strong>Glomerular Hydrostatic Pressure:</strong> Forces plasma through membrane (55-60 mmHg)',
          '<strong>Capsular Oncotic Pressure:</strong> Opposes filtration due to plasma proteins (~30 mmHg)',
          '<strong>Bowman Capsule Pressure:</strong> Opposes filtration (~15 mmHg)',
          '<strong>Membrane Permeability:</strong> Size/charge selectivity (passes water, urea, creatinine; blocks proteins >69 kDa)',
        ],
        equationLabel: 'Starling Equation (GFR):',
        equation: 'GFR = Kf x [(Pgc - Pbc) - (?gc - ?bc)]',
        equationParams: [
          'Kf = Filtration coefficient (permeability x area)',
          'Pgc = Glomerular capillary hydrostatic pressure',
          'Pbc = Bowman capsule pressure',
          '?gc = Glomerular oncotic pressure',
          '?bc = Capsular oncotic pressure',
        ],
        determinantsTitle: 'GFR Determinants:',
        determinants: [
          '<strong>Renal Plasma Flow (RPF):</strong> ?RPF -> ?GFR (autoregulation)',
          '<strong>Arteriolar Resistance:</strong> Afferent vasoconstriction ?GFR, efferent ?GFR',
          '<strong>Number of Functioning Nephrons:</strong> Declines with age (~1 mL/min/year after age 40)',
          '<strong>Hydration Status:</strong> Dehydration -> ?GFR (renal vasoconstriction)',
        ],
        note: {
          title: 'Physiology:',
          text: 'Normal GFR young adult: ~120 mL/min/1.73m2 (180 L/day filtered). Physiological decline ~0.75-1 mL/min/year after age 40. Functional reserve: residual nephrons compensate loss up to ~60% (then symptoms).',
        },
      },
    },

    // SECTION 3: HOW TO CALCULATE eGFR
    calculation: {
      title: 'How to Calculate eGFR',
      content: {
        methodsTitle: 'eGFR Estimation Methods:',
        methods: [
          '<strong>CKD-EPI (Recommended):</strong> 2021 equation without race, accurate at eGFR >60. Current KDIGO gold standard.',
          '<strong>MDRD (Historical):</strong> Overestimates eGFR reduction at low values. Less accurate in elderly/children.',
          '<strong>Schwartz (Pediatric):</strong> For children <18 years, uses height instead of age.',
          '<strong>Cystatin C (Alternative):</strong> Marker not influenced by muscle mass. Useful in sarcopenia/amputations.',
        ],
        whenToUseTitle: 'When to Use Specific Formulas:',
        whenToUse: [
          '<strong>CKD-EPI:</strong> CKD screening, progression monitoring, general clinical decisions',
          '<strong>MDRD:</strong> Only for historical compatibility (pre-2009 studies). NOT recommended KDIGO 2024.',
          '<strong>Cystatin C:</strong> Patients with abnormal muscle mass (cachexia, bodybuilders, amputees)',
          '<strong>Creatinine + Cystatin:</strong> Confirm CKD diagnosis when eGFR borderline (45-60)',
        ],
        limitationsTitle: 'Creatinine-Based eGFR Limitations:',
        limitations: [
          '<strong>Muscle Mass:</strong> ?Muscle -> ?Creatinine -> underestimates eGFR (bodybuilders)',
          '<strong>Diet:</strong> High red meat consumption -> temporary ?creatinine',
          '<strong>Drugs:</strong> Cimetidine, trimethoprim block tubular secretion -> false ?creatinine',
          '<strong>AKI:</strong> eGFR unreliable in acute kidney injury (creatinine not steady-state)',
        ],
        bestPractice: {
          title: 'Best Practice:',
          text: 'For CKD diagnosis, require <strong>2 eGFR measurements >3 months</strong> (exclude transient fluctuations). If eGFR <60 with proteinuria -> confirm CKD. If eGFR 45-60 without proteinuria -> repeat with cystatin C.',
        },
      },
    },

    // SECTION 4: MATHEMATICAL FORMULAS
    formula: {
      title: 'CKD-EPI and MDRD Formulas',
      content: {
        ckdepiTitle: 'CKD-EPI 2021 Formula (Without Race):',
        ckdepiFormula:
          'eGFR = 141 x min(SCr/?, 1)<sup>?</sup> x max(SCr/?, 1)<sup>-1.209</sup> x 0.993<sup>Age</sup> x [1.012 if female]',
        ckdepiParameters: [
          '<strong>SCr:</strong> Serum creatinine (mg/dL)',
          '<strong>?:</strong> 0.7 (female), 0.9 (male)',
          '<strong>?:</strong> -0.241 (female, SCr <=0.7), -0.302 (female, SCr >0.7), -0.302 (male, SCr <=0.9), -1.200 (male, SCr >0.9)',
          '<strong>Age:</strong> Age in years',
          '<strong>1.012:</strong> Female correction (less muscle mass)',
        ],
        ckdepiNote:
          '<strong>2021 Note:</strong> Removal of race factor (1.159 for African Americans) for health equity. Based on NEJM 2021 study (Inker et al.).',
        mdrdTitle: 'MDRD Formula (Historical):',
        mdrdFormula:
          'eGFR = 175 x SCr<sup>-1.154</sup> x Age<sup>-0.203</sup> x [0.742 if female] x [1.212 if African American]',
        mdrdParameters: [
          '<strong>175:</strong> IDMS calibration constant (isotope dilution mass spectrometry)',
          '<strong>-1.154:</strong> Creatinine exponent (inverse relationship with GFR)',
          '<strong>-0.203:</strong> Age exponent (physiological decline)',
          '<strong>0.742:</strong> Female correction (~25% less muscle mass)',
          '<strong>1.212:</strong> African American correction (greater muscle mass)',
        ],
        comparisonTitle: 'CKD-EPI vs MDRD Comparison:',
        comparison: [
          '<strong>Accuracy:</strong> CKD-EPI more accurate at eGFR >60 (MDRD overestimates reduction)',
          '<strong>Classification:</strong> CKD-EPI reduces CKD Stage 3 diagnosis by 30% vs MDRD (fewer false positives)',
          '<strong>Valid Range:</strong> CKD-EPI: 15-120 mL/min, MDRD: 15-90 mL/min',
          '<strong>Study Population:</strong> CKD-EPI: 8000 CKD + healthy patients, MDRD: CKD only',
        ],
        recommendation: {
          title: 'KDIGO 2024 Recommendation:',
          text: 'Use <strong>CKD-EPI 2021</strong> as standard for CKD screening and staging. MDRD maintained only for historical compatibility with pre-2009 clinical trials.',
        },
      },
    },

    // SECTION 5: RESULTS INTERPRETATION
    interpretation: {
      title: 'Results Interpretation and CKD Staging',
      content: {
        stagingTitle: 'KDIGO 2024 Classification (Kidney Disease: Improving Global Outcomes):',
        staging: [
          '<strong class="text-green">Stage 1 (eGFR >=90):</strong> Normal function. CKD diagnosis only if proteinuria/hematuria/imaging abnormalities present.',
          '<strong class="text-light-green">Stage 2 (eGFR 60-89):</strong> Mild reduction. Annual screening if diabetes/hypertension. Monitor progression.',
          '<strong class="text-orange">Stage 3a (eGFR 45-59):</strong> Moderate reduction. Evaluate reversible causes (dehydration, drugs). Start nephroprotectors (ACE-i/ARB).',
          '<strong class="text-deep-orange">Stage 3b (eGFR 30-44):</strong> Moderate-severe. Mandatory drug dosing for renally excreted medications. Prevent hyperkalemia (diet).',
          '<strong class="text-red">Stage 4 (eGFR 15-29):</strong> Severe. Prepare dialysis/transplant. Patient education on RRT options. Vascular access.',
          '<strong class="text-purple">Stage 5 (eGFR <15):</strong> ESRD (End-Stage Renal Disease). Immediate dialysis or transplant. Manage uremia complications.',
        ],
        albuminuriaTitle: 'Albuminuria and Prognosis (Complete Staging):',
        albuminuria: [
          '<strong>A1 (<30 mg/g):</strong> Normal. Low CV risk if eGFR >60.',
          '<strong>A2 (30-300 mg/g):</strong> Microalbuminuria. ?Risk CKD progression. Start ACE-i/ARB.',
          '<strong>A3 (>300 mg/g):</strong> Macroalbuminuria. High risk ESRD + CV events. Urgent nephrologist.',
        ],
        progressionTitle: 'CKD Progression Rate:',
        progression: [
          '<strong>Normal Decline:</strong> <1 mL/min/year (physiological aging)',
          '<strong>Slow Decline:</strong> 1-5 mL/min/year (controlled CKD, effective ACE-i)',
          '<strong>Rapid Decline:</strong> >5 mL/min/year (active nephropathy, glomerulonephritis, decompensated diabetic nephropathy)',
        ],
        alert: {
          title: 'CLINICAL ALERT:',
          text: 'If eGFR <60 + albumin >300 mg/g -> <strong>High ESRD risk</strong>. Nephrologist referral within 1 week. Start ACE-i/ARB + SGLT2-i (if diabetic). Educate on dialysis/transplant.',
        },
      },
    },

    // SECTION 6: CLINICAL APPLICATIONS
    applications: {
      title: 'Clinical Applications of eGFR',
      content: {
        screeningTitle: 'CKD Screening (At-Risk Populations):',
        screening: [
          '<strong>Type 1/2 Diabetes:</strong> Annual eGFR + albuminuria (30-40% diabetic nephropathy risk)',
          '<strong>Hypertension:</strong> eGFR every 1-2 years (hypertensive nephrosclerosis)',
          '<strong>Age >60 years:</strong> Screening every 2-3 years (accelerated physiological decline)',
          '<strong>Family History CKD:</strong> eGFR + renal ultrasound (polycystic disease, Alport)',
          '<strong>Nephrotoxic Drugs:</strong> Chronic NSAIDs, chemotherapy (cisplatin), immunosuppressants',
        ],
        drugDosingTitle: 'Drug Dosing Adjustments:',
        drugDosing: [
          '<strong>Antibiotics:</strong> Penicillins, cephalosporins, aminoglycosides, vancomycin (TDM mandatory if eGFR <30)',
          '<strong>Anticoagulants:</strong> Enoxaparin (?50% if eGFR <30), dabigatran contraindicated if eGFR <30',
          '<strong>Antidiabetics:</strong> Metformin (discontinue if eGFR <30), glyburide (?hypoglycemia risk)',
          '<strong>CV Drugs:</strong> Digoxin (?toxicity), spironolactone (?hyperkalemia risk)',
        ],
        contrastTitle: 'Iodinated Contrast (AKI Prevention):',
        contrast: [
          '<strong>eGFR >=60:</strong> No precautions (AKI risk <1%)',
          '<strong>eGFR 45-59:</strong> IV saline 0.9% hydration 1 mL/kg/h x 12h pre/post',
          '<strong>eGFR 30-44:</strong> Hydration + minimize contrast volume (<100 mL). Consider N-acetylcysteine.',
          '<strong>eGFR <30:</strong> Avoid contrast if possible (MRI without gadolinium). If urgent -> prophylactic dialysis.',
        ],
        specialPopulationsTitle: 'Special Populations:',
        specialPopulations: [
          '<strong>Elderly (>75 years):</strong> eGFR underestimates true GFR (?muscle mass). Consider cystatin C.',
          '<strong>Pregnancy:</strong> eGFR increases 40-50% (?physiological GFR). Use pregnancy reference values.',
          '<strong>Obese (BMI >30):</strong> eGFR overestimated (creatinine diluted in distribution volume). Do not normalize for BSA.',
          '<strong>Kidney Transplant:</strong> Target eGFR >40 at 1 year post-transplant. <30 -> chronic rejection/nephrotoxicity.',
        ],
      },
    },

    // SECTION 7: CRITICAL VALUES AND ALERTS
    referenceValues: {
      title: 'Critical Values and Clinical Alerts',
      content: {
        normalRangesTitle: 'Normal Ranges by Age:',
        normalRanges: [
          '<strong>20-29 years:</strong> 116 +- 20 mL/min/1.73m2 (M), 107 +- 13 (F)',
          '<strong>30-39 years:</strong> 107 +- 14 (M), 104 +- 11 (F)',
          '<strong>40-49 years:</strong> 99 +- 13 (M), 94 +- 12 (F)',
          '<strong>50-59 years:</strong> 93 +- 17 (M), 88 +- 13 (F)',
          '<strong>60-69 years:</strong> 85 +- 21 (M), 78 +- 15 (F)',
          '<strong>70+ years:</strong> 75 +- 17 (M), 67 +- 12 (F)',
        ],
        criticalThresholdsTitle: 'Critical Thresholds for Action:',
        criticalThresholds: [
          '<strong class="text-orange">eGFR <60:</strong> Confirm CKD. Request proteinuria/renal ultrasound. Start nephroprotectors.',
          '<strong class="text-deep-orange">eGFR <45:</strong> Nephrologist referral. Adjust drug dosages. Low-protein diet (0.8 g/kg).',
          '<strong class="text-red">eGFR <30:</strong> Pre-dialysis. Create vascular access (AV fistula). Vaccinate hepatitis B. RRT education.',
          '<strong class="text-purple">eGFR <15:</strong> Start dialysis or transplant. Uremia symptoms (nausea, pruritus, edema). Manage hyperkalemia.',
        ],
        rapidDeclineTitle: 'Rapid eGFR Decline (Red Flags):',
        rapidDecline: [
          '<strong>?>5 mL/min/year:</strong> Active glomerulonephritis, lupus nephropathy, ANCA+ vasculitis',
          '<strong>?>25% in 3 months:</strong> Superimposed AKI, ureteral obstruction, acute tubular necrosis',
          '<strong>?Sudden + hematuria:</strong> Rapidly progressive glomerulonephritis -> urgent renal biopsy',
        ],
        contraindicationsTitle: 'Drug Contraindications by eGFR:',
        contraindications: [
          '<strong>eGFR <30:</strong> Metformin, NSAIDs, nitrofurantoin, dabigatran, rivaroxaban',
          '<strong>eGFR <15:</strong> SGLT2-i (dapagliflozin), spironolactone (K+ >5.5 mEq/L), lithium',
          '<strong>Dialysis:</strong> Avoid gabapentin (accumulation), acyclovir (neurotoxicity), morphine (active metabolite)',
        ],
        emergencyAlert: {
          title: 'NEPHROLOGY EMERGENCY:',
          text: 'If eGFR <15 + uremia symptoms (confusion, pericarditis, pulmonary edema) -> <strong>Urgent dialysis within 24h</strong>. K+ >7 mEq/L -> immediate treatment (calcium gluconate, insulin+glucose, dialysis).',
        },
      },
    },

    // SECTION 8: CLINICAL DOCUMENTATION
    documentation: {
      title: 'Clinical Documentation of eGFR',
      content: {
        templateTitle: 'CKD Documentation Template:',
        templateExample: `<strong>eGFR (CKD-EPI 2021):</strong> [value] mL/min/1.73m2<br>
<strong>Parameters:</strong> Age [X] years, Gender [M/F], Creatinine [Y] mg/dL<br>
<strong>CKD Stage:</strong> [Stage 1-5] - [description]<br>
<strong>Albuminuria:</strong> [A1/A2/A3] - [value] mg/g<br>
<strong>eGFR Trend:</strong> [?/?/stable] [X] mL/min/year<br>
<strong>Clinical Actions:</strong><br>
<ul>
  <li>[Adjusted drugs]: [previous dose] -> [new dose]</li>
  <li>[Nephroprotectors]: ACE-i/ARB [drug name] [dose]</li>
  <li>[Follow-up]: Next eGFR + albuminuria in [X] months</li>
</ul>`,
        elementsTitle: 'Elements to Document:',
        elements: [
          'Formula used (CKD-EPI/MDRD) and calculation date',
          'eGFR trend last 6-12 months (graph if available)',
          'Presence proteinuria/hematuria/imaging abnormalities',
          'CKD diagnosis confirmed (2 measurements >3 months)',
          'Nephrotoxic drugs discontinued or adjusted',
          'Nephrologist referral (if eGFR <45 or decline >5 mL/min/year)',
          'Patient education (diet, hydration, avoid NSAIDs)',
        ],
        kdigoGuidelinesTitle: 'KDIGO Follow-Up Guidelines:',
        kdigoGuidelines: [
          '<strong>Stage 1-2:</strong> Annual reassessment (eGFR + albuminuria)',
          '<strong>Stage 3a:</strong> Every 6 months + annual renal ultrasound',
          '<strong>Stage 3b:</strong> Every 3 months + nephrologist every 6 months',
          '<strong>Stage 4:</strong> Monthly + dialysis/transplant preparation',
          '<strong>Stage 5:</strong> Weekly on dialysis, monthly if conservative',
        ],
      },
    },

    // SECTION 9: SCIENTIFIC REFERENCES
    bibliography: {
      title: 'Scientific References',
      content: {
        publicationsTitle: 'Foundational Publications:',
        publications: [
          '<strong>Levey AS, et al.</strong> (2009). A new equation to estimate glomerular filtration rate. <em>Ann Intern Med</em> 150(9):604-612. [PMID: 19414839] - Original CKD-EPI',
          '<strong>Inker LA, et al.</strong> (2021). New Creatinine- and Cystatin C-Based Equations to Estimate GFR without Race. <em>N Engl J Med</em> 385(19):1737-1749. [PMID: 34554658] - CKD-EPI 2021 without race',
          '<strong>KDIGO Guidelines.</strong> (2024). Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. <em>Kidney Int Suppl</em> 14(1):1-119. - Gold standard guidelines',
          '<strong>Stevens LA, Levey AS.</strong> (2009). Measured GFR as a confirmatory test for estimated GFR. <em>J Am Soc Nephrol</em> 20(11):2305-2313. [PMID: 19833901]',
        ],
        guidelinesTitle: 'International Guidelines:',
        guidelines: [
          '<strong>KDIGO 2024:</strong> Kidney Disease: Improving Global Outcomes - Worldwide CKD standard',
          '<strong>NKF:</strong> National Kidney Foundation - Patient education and staging',
          '<strong>ERA-EDTA:</strong> European Renal Association - European dialysis guidelines',
          '<strong>ASN:</strong> American Society of Nephrology - Nephrology research and innovation',
        ],
        calculatorsTitle: 'Validated Online Calculators:',
        calculators: [
          '<strong>NKF GFR Calculator:</strong> https://www.kidney.org/professionals/kdoqi/gfr_calculator',
          '<strong>MDRD Study:</strong> https://www.mdrd.com/',
          '<strong>QxMD:</strong> Mobile app for eGFR calculation + drug dosing',
        ],
        onlineResources: {
          title: 'Online Resources',
          kdigo: 'KDIGO Guidelines',
          nkf: 'NKF Resources',
        },
        educationalNote: {
          title: 'Educational Note:',
          content:
            'These references represent high-impact peer-reviewed publications validating eGFR formulas. CKD-EPI equations have been validated on over <strong>8000 patients</strong> in international multicenter studies, demonstrating superior accuracy to MDRD. They remain the <strong>KDIGO gold standard</strong> for CKD diagnosis and staging.',
        },
      },
    },
  },

  // ============================================================
  // 7. QUICK REFERENCE CKD STAGES
  // ============================================================
  quickReference: {
    title: 'CKD Stage Classification',
    stages: [
      '<span class="text-weight-bold text-green">Stage 1:</span> >=90 - Normal function',
      '<span class="text-weight-bold text-light-green">Stage 2:</span> 60-89 - Mild reduction',
      '<span class="text-weight-bold text-orange">Stage 3a:</span> 45-59 - Moderate reduction',
      '<span class="text-weight-bold text-deep-orange">Stage 3b:</span> 30-44 - Moderate-severe',
      '<span class="text-weight-bold text-red">Stage 4:</span> 15-29 - Severe reduction',
      '<span class="text-weight-bold text-purple">Stage 5:</span> <15 - ESRD (dialysis)',
    ],
  },

  // ============================================================
  // 8. MEDICAL DISCLAIMER
  // ============================================================
  disclaimer: {
    title: 'Medical Disclaimer:',
    text: 'This eGFR calculator is a clinical support tool. It does not replace professional medical judgment. For CKD diagnosis always request confirmation with 2 measurements >3 months + proteinuria.',
  },
};
