/**
 * @file en-US/dosageCalculator.ts
 * @description English translations for Dosage Calculator (Weight-based & Fixed)
 * @author Vasile Chifeac
 * @created 2025-12-16
 *
 * @references
 * - Holford NHG (2013). "A pharmacokinetic standard for babies and adults"
 *   J Pharm Sci 102(9):2941-2952. PMID: 23650116
 * - Kearns GL, et al. (2003). "Developmental pharmacology - Drug disposition, action, and therapy in infants and children"
 *   N Engl J Med 349(12):1157-1167. PMID: 13679531
 * - Matzke GR, et al. (2016). "Drug Dosing Consideration in Patients with Acute and Chronic Kidney Disease"
 *   Brenner & Rector's The Kidney, 10th Edition
 */

export default {
  // 1. MAIN TITLES
  title: 'Dosage Calculator',
  subtitle: 'Drug Dosage Calculation (Weight-based & Fixed)',

  // 2. FORM INPUT
  form: {
    weight: {
      label: 'Body Weight',
      unit: 'kg',
      hint: 'Current patient weight',
    },
    age: {
      label: 'Age',
      unit: 'years',
      hint: 'Patient age for adjustments',
    },
    creatinine: {
      label: 'Serum Creatinine (optional)',
      unit: 'mg/dL',
      hint: 'For eGFR calculation (Cockcroft-Gault)',
    },
    drug: {
      label: 'Select Drug',
      placeholder: 'Choose a drug...',
    },
    dosePerKg: {
      label: 'Dose per kg',
      unit: 'mg/kg',
      hint: 'Unit dose per kg body weight',
    },
    fixedDose: {
      label: 'Dose',
      unit: 'mg',
      hint: 'Fixed dose independent of weight',
    },
    frequency: {
      label: 'Administration Frequency',
      options: {
        qd: 'Once daily',
        bid: 'Twice daily',
        tid: 'Three times daily',
        qid: 'Four times daily',
        q6h: 'Every 6 hours',
        q8h: 'Every 8 hours',
        q12h: 'Every 12 hours',
      },
    },
  },

  // 3. BUTTONS
  buttons: {
    calculate: 'Calculate Dosage',
    reset: 'Reset Data',
  },

  // 4. DRUG DATABASE
  drugs: {
    paracetamol: {
      name: 'Acetaminophen',
      class: 'Analgesic/Antipyretic',
      doseLabel: 'Dose per kg',
      doseUnit: 'mg/kg',
      indications: 'Pain and fever',
      therapeuticRange: '10-15 mg/kg every 4-6h',
      notes: 'Max 4g/day in adults, 60mg/kg/day in children',
    },
    amoxicillin: {
      name: 'Amoxicillin',
      class: 'Antibiotic (Penicillin)',
      doseLabel: 'Dose per kg',
      doseUnit: 'mg/kg',
      indications: 'Bacterial infections',
      therapeuticRange: '20-40 mg/kg every 8h',
      notes: 'Adjust in renal impairment',
    },
    furosemide: {
      name: 'Furosemide',
      class: 'Loop Diuretic',
      doseLabel: 'Dose per kg',
      doseUnit: 'mg/kg',
      indications: 'Edema, hypertension',
      therapeuticRange: '0.5-2 mg/kg',
      notes: 'Monitor electrolytes and renal function',
    },
    digoxin: {
      name: 'Digoxin',
      class: 'Cardiac Glycoside',
      doseLabel: 'Dose per kg',
      doseUnit: 'μg/kg',
      indications: 'Heart failure, atrial fibrillation',
      therapeuticRange: '8-12 μg/kg loading dose',
      notes: 'Monitor serum levels and renal function',
    },
    aspirin: {
      name: 'Aspirin',
      class: 'NSAID/Antiplatelet',
      doseLabel: 'Dose',
      doseUnit: 'mg',
      indications: 'Cardiovascular prevention',
      therapeuticRange: '75-100 mg/day',
      notes: 'Contraindicated in pediatrics (Reye Syndrome)',
    },
  },

  // 5. RESULTS PANEL
  resultsPanel: {
    title: 'Dosage Results',
    totalDose: {
      label: 'Single Dose',
      subtitle: 'per administration',
    },
    dailyDose: {
      label: 'Daily Dose',
      subtitle: 'total 24h',
    },
    frequency: {
      label: 'Frequency',
    },
    renalAdjustment: {
      label: 'Renal Adjustment',
      subtitle: 'multiplication factor',
    },
    estimatedGFR: {
      label: 'Estimated GFR',
      subtitle: '(Cockcroft-Gault)',
      unit: 'mL/min',
    },
  },

  // 6. DRUG INFORMATION
  drugInfo: {
    title: 'Drug Information',
    class: 'Pharmacological Class',
    indications: 'Clinical Indications',
    therapeuticRange: 'Therapeutic Range',
    notes: 'Clinical Notes',
  },

  // 7. WARNINGS
  warnings: {
    title: 'Important Warnings',
    items: [
      '<strong>Estimated dosage:</strong> This calculator provides an <strong>initial estimate</strong>. Always consult official guidelines (SPC/Prescribing Information) and clinical literature.',
      '<strong>Individual variability:</strong> Factors such as renal/hepatic function, drug interactions, comorbidities, extreme ages (neonates/elderly) require personalization.',
      '<strong>TDM (Therapeutic Drug Monitoring):</strong> For narrow therapeutic index drugs (digoxin, aminoglycosides, vancomycin, antiepileptics), TDM is MANDATORY.',
      '<strong>Pediatrics:</strong> Neonatal/pediatric dosing requires BSA-based calculations (Dubois/Mosteller) and ontogenetic adjustments for immature clearance.',
      '<strong>Renal impairment:</strong> eGFR-based adjustment is approximate. Cockcroft-Gault formula is preferable, but in CKD stage 4-5 consider dialysis/nephrology consultation.',
    ],
  },

  // 8. FORMULAS
  formulas: {
    title: 'Formulas Used',
    content: {
      weightBasedTitle: 'Weight-Based Dosing:',
      weightBasedFormula:
        '<strong>Single Dose (mg) = Dose per kg (mg/kg) × Weight (kg) × Adjustment Factor</strong><br/>' +
        '<strong>Daily Dose (mg) = Single Dose (mg) × Number of Administrations/day</strong>',
      fixedDoseTitle: 'Fixed Dosing:',
      fixedDoseFormula:
        '<strong>Single Dose (mg) = Prescribed Dose (mg)</strong><br/>' +
        '<strong>Daily Dose (mg) = Single Dose (mg) × Number of Administrations/day</strong>',
      egfrTitle: 'eGFR (Cockcroft-Gault):',
      egfrFormula:
        '<strong>eGFR (mL/min) = [(140 - Age) × Weight (kg)] / [72 × Creatinine (mg/dL)]</strong><br/>' +
        '<em>Note:</em> Multiply by 0.85 if female. Formula validated for adults (18-80 years).',
      adjustmentTitle: 'Adjustment Factors:',
      adjustmentRules: [
        '<strong>eGFR > 60 mL/min:</strong> Factor 1.0 (full dose)',
        '<strong>eGFR 30-60 mL/min (CKD 3):</strong> Factor 0.75 (25% reduction)',
        '<strong>eGFR 15-30 mL/min (CKD 4):</strong> Factor 0.50 (50% reduction)',
        '<strong>eGFR < 15 mL/min (CKD 5):</strong> Factor 0.25 (75% reduction)',
        '<strong>Age < 1 year (neonates):</strong> Factor 0.50 (immature renal clearance)',
        '<strong>Age 1-12 years (children):</strong> Factor 0.80 (developing clearance)',
        '<strong>Age > 65 years (elderly):</strong> Factor 0.75 (physiological decline)',
      ],
    },
  },

  // 9. DOCUMENTATION SECTIONS
  sections: {
    // SECTION 1: Pharmacokinetics and Pharmacodynamics
    pharmacokinetics: {
      title: 'Pharmacokinetics and Pharmacodynamics (PK/PD)',
      content: {
        introTitle: 'ADME Principles (Absorption, Distribution, Metabolism, Excretion):',
        intro: [
          '<strong>Absorption:</strong> Variable oral bioavailability (F = 0-100%). First-pass hepatic metabolism reduces F (morphine 30%, propranolol 25%). IV route bypasses absorption (F = 100%).',
          '<strong>Distribution:</strong> Volume of distribution (Vd) determines plasma concentration. Hydrophilic drugs (small Vd, e.g., aminoglycosides 0.25 L/kg) vs lipophilic (large Vd, e.g., amiodarone 60 L/kg).',
          '<strong>Metabolism:</strong> Hepatic clearance (CYP450, glucuronidation). Enzyme inducers (rifampin, phenytoin) ↑clearance. Inhibitors (ketoconazole, erythromycin) ↓clearance → toxicity.',
          '<strong>Excretion:</strong> Renal clearance dominant for hydrophilic drugs (penicillins, aminoglycosides, digoxin). eGFR-based adjustment mandatory in CKD.',
        ],
        pkParametersTitle: 'Key PK Parameters:',
        pkParameters: [
          '<strong>Half-life (t½):</strong> Time for ↓50% plasma concentration. Guides dosing frequency. 5 half-lives = steady state. Digoxin t½ = 36-48h → QD. Penicillin t½ = 30 min → Q4-6h.',
          '<strong>Clearance (CL):</strong> Volume of plasma completely cleared/time unit (L/h). Total CL = Renal CL + Hepatic CL. CKD → ↓Renal CL → accumulation of renally eliminated drugs.',
          '<strong>AUC (Area Under Curve):</strong> Total drug exposure. Dose = CL × AUC target. Vancomycin AUC₀₋₂₄ target 400-600 mg·h/L (vs MRSA).',
          '<strong>Cmax, Cmin:</strong> Peak and trough concentration. Aminoglycosides: Cmax/MIC > 8-10 (efficacy), Cmin < 1 mg/L (nephrotoxicity).',
        ],
        pkpdTitle: 'PK/PD Relationship:',
        pkpd: [
          '<strong>Time-dependent drugs (TDD):</strong> Beta-lactams, vancomycin. Efficacy depends on T > MIC (time above MIC). Target: T > MIC 40-70% dosing interval. Continuous/extended infusion optimal.',
          '<strong>Concentration-dependent drugs (CDD):</strong> Aminoglycosides, fluoroquinolones. Efficacy depends on Cmax/MIC or AUC/MIC. Target: Cmax/MIC > 8-10, AUC₀₋₂₄/MIC > 125. Single high-dose + long interval.',
        ],
      },
    },

    // SECTION 2: Pediatric Dosing
    pediatric: {
      title: 'Pediatric and Neonatal Dosing',
      content: {
        introTitle: 'Ontogenetic Pharmacokinetics:',
        intro: [
          '<strong>Neonates (0-28 days):</strong> Immature renal/hepatic clearance (30-50% adult). Neonatal GFR ~20-40 mL/min/1.73m². Reduced CYP450 metabolism. Prolonged t½ (gentamicin neonate t½ = 5-10h vs adult 2h). Increased Vd (↑total body water 75% vs adult 60%).',
          '<strong>Infants/Children (1 month-12 years):</strong> Progressive ↑clearance. At 6 months: GFR ~60% adult. At 1 year: GFR ~80-90% adult. CYP450 metabolism mature at 2-3 years. mg/kg dosing often > adults to compensate ↑clearance and ↑Vd.',
          '<strong>Adolescents (12-18 years):</strong> PK similar to adults, but variability with puberty (hormonal changes, body mass).',
        ],
        bsaTitle: 'BSA-Based Dosing (Body Surface Area):',
        bsa: [
          '<strong>Mosteller Formula:</strong> BSA (m²) = √[(Weight kg × Height cm) / 3600]. Preferred for simplicity.',
          '<strong>Dubois Formula:</strong> BSA (m²) = 0.007184 × Weight⁰·⁴²⁵ × Height⁰·⁷²⁵. More accurate, but complex.',
          '<strong>BSA-based indications:</strong> Chemotherapeutics (narrow therapeutic index), some high-potency antibiotics. Pediatric dose (mg) = Adult dose (mg/m²) × Patient BSA (m²).',
        ],
        ageAdjustmentsTitle: 'Age-Specific Adjustments:',
        ageAdjustments: [
          '<strong>Prematurity:</strong> 50-75% dose reduction + prolonged intervals (↓↓clearance). Mandatory TDM monitoring.',
          '<strong>Term neonates:</strong> 25-50% dose reduction. Gentamicin neonate: 2.5 mg/kg q12-18h vs adult 5 mg/kg q24h.',
          '<strong>Children (1-12 years):</strong> mg/kg dosing often similar/higher than adults. Amoxicillin child: 40-90 mg/kg/day vs adult 25-50 mg/kg/day.',
          '<strong>Adolescents:</strong> Gradual transition to adult dosing (weight > 50 kg and complete pubertal development).',
        ],
      },
    },

    // SECTION 3: Renal Impairment
    renalImpairment: {
      title: 'Dosage Adjustment in Renal Impairment (CKD)',
      content: {
        ckdStagesTitle: 'CKD Stages (KDIGO 2012):',
        ckdStages: [
          '<strong>CKD 1:</strong> eGFR ≥ 90 mL/min + kidney damage. Full dose.',
          '<strong>CKD 2:</strong> eGFR 60-89 mL/min. Full dose, monitoring.',
          '<strong>CKD 3a:</strong> eGFR 45-59 mL/min. 25% dose reduction or ↑interval.',
          '<strong>CKD 3b:</strong> eGFR 30-44 mL/min. 50% dose reduction or ↑↑interval.',
          '<strong>CKD 4:</strong> eGFR 15-29 mL/min. 50-75% dose reduction. Nephrology consultation.',
          '<strong>CKD 5:</strong> eGFR < 15 mL/min. 75% dose reduction or dialysis-based adjustment. Mandatory TDM.',
        ],
        adjustmentTitle: 'Adjustment Methods:',
        adjustment: [
          '<strong>Dose reduction, fixed interval:</strong> Maintain constant concentration. E.g., Amoxicillin adult 500 mg TID → CKD 3: 250 mg TID.',
          '<strong>Fixed dose, ↑interval:</strong> Maintain Cmax, but ↑time below MIC. E.g., Gentamicin 5 mg/kg q24h → CKD 4: 5 mg/kg q48h.',
          '<strong>Dose reduction + ↑interval:</strong> For narrow therapeutic index drugs. E.g., Digoxin 0.25 mg QD → CKD 4: 0.125 mg every 48h.',
        ],
        dialysisTitle: 'Dialysis and Supplementation:',
        dialysis: [
          '<strong>Hemodialysis (HD):</strong> Removes hydrophilic, low molecular weight, low protein-binding drugs. Aminoglycosides, vancomycin, beta-lactams → mandatory post-HD supplementation.',
          '<strong>Peritoneal dialysis (PD):</strong> Continuous but lower clearance than HD. Less frequent supplementation.',
          '<strong>CRRT (Continuous Renal Replacement Therapy):</strong> Continuous clearance similar to eGFR 20-40 mL/min. Intermediate dosing between CKD 3-4.',
        ],
        drugsExamplesTitle: 'Examples of Renally Eliminated Drugs:',
        drugsExamples:
          'Penicillins, Aminoglycosides, Vancomycin, Digoxin, Gabapentin, Metformin, Allopurinol, ACE inhibitors, Enoxaparin. All require CKD-based adjustment.',
      },
    },

    // SECTION 4: Loading vs Maintenance
    loadingMaintenance: {
      title: 'Loading Dose vs Maintenance Dose',
      content: {
        conceptsTitle: 'Fundamental Concepts:',
        concepts: [
          '<strong>Loading Dose (LD):</strong> Initial high dose to rapidly achieve therapeutic concentration (target Css). Bypass steady state time (5 half-lives).',
          '<strong>Maintenance Dose (MD):</strong> Regular dose to maintain Css. Compensates continuous clearance.',
          '<strong>Steady State (Css):</strong> Equilibrium between input (dose) and output (clearance). Achieved after 5 half-lives. Before Css: progressive accumulation.',
        ],
        formulasTitle: 'Calculation Formulas:',
        formulas: [
          '<strong>Loading Dose:</strong> LD (mg) = Vd (L/kg) × Weight (kg) × Target Css (mg/L) / Bioavailability (F).',
          '<strong>Maintenance Dose:</strong> MD (mg) = CL (L/h) × Target Css (mg/L) × τ (interval hours) / F.',
          '<strong>Steady State Time:</strong> t(ss) = 5 × t½. Digoxin t½ = 40h → t(ss) = 200h (8 days).',
        ],
        indicationsTitle: 'Loading Dose Indications:',
        indications: [
          '<strong>Long t½ drugs:</strong> Digoxin (t½ 36-48h), Amiodarone (t½ 40-60 days). Without LD: steady state weeks/months → unacceptable in emergencies.',
          '<strong>Severe infections:</strong> Vancomycin (MRSA sepsis), Aminoglycosides (Pseudomonas sepsis). Achieving target Cmax/MIC within 2-4h critical for outcome.',
          '<strong>Acute arrhythmias:</strong> Digoxin (rapid AF), Amiodarone (VT), Flecainide. Urgent rhythm control requires LD.',
          '<strong>Seizure emergencies:</strong> Phenytoin, Valproate, Levetiracetam. Status epilepticus requires rapid IV LD.',
        ],
        examplesTitle: 'Clinical Examples:',
        examples: [
          '<strong>Digoxin (acute heart failure):</strong> LD = 8-12 μg/kg (total 0.5-1 mg) over 24h (divided TID). MD = 0.125-0.25 mg QD (based on eGFR).',
          '<strong>Vancomycin (MRSA sepsis):</strong> LD = 25-30 mg/kg IV (max 3g) single dose. MD = 15-20 mg/kg q8-12h (based on eGFR). Target AUC₀₋₂₄ 400-600 mg·h/L.',
          '<strong>Phenytoin (status epilepticus):</strong> LD = 15-20 mg/kg slow IV (max 50 mg/min). MD = 4-6 mg/kg/day (divided BID/TID). Target 10-20 mg/L.',
        ],
      },
    },

    // SECTION 5: Scientific References
    bibliography: {
      title: 'Scientific References ScienceDirect',
      content: {
        publicationsTitle: 'Fundamental Publications:',
        publications: [
          '<strong>Holford NHG, Anderson BJ.</strong> (2013). "A pharmacokinetic standard for babies and adults". <em>Journal of Pharmaceutical Sciences</em> 102(9):2941-2952. PMID: 23650116. Neonatal/pediatric PK standard based on allometric maturation.',
          '<strong>Kearns GL, et al.</strong> (2003). "Developmental pharmacology—drug disposition, action, and therapy in infants and children". <em>New England Journal of Medicine</em> 349(12):1157-1167. PMID: 13679531. Comprehensive review of ontogenetic pediatric pharmacokinetics.',
          '<strong>Matzke GR, Aronoff GR, et al.</strong> (2011). "Drug dosing consideration in patients with acute and chronic kidney disease—a clinical update from Kidney Disease: Improving Global Outcomes (KDIGO)". <em>Kidney International</em> 80(11):1122-1137. PMID: 21918498. KDIGO guidelines for CKD dose adjustment.',
          '<strong>Rybak MJ, et al.</strong> (2020). "Therapeutic monitoring of vancomycin for serious methicillin-resistant Staphylococcus aureus infections: A revised consensus guideline". <em>American Journal of Health-System Pharmacy</em> 77(11):835-864. PMID: 32191793. Vancomycin TDM AUC-based consensus.',
          '<strong>Roberts JA, et al.</strong> (2014). "Individualised antibiotic dosing for patients who are critically ill: challenges and potential solutions". <em>The Lancet Infectious Diseases</em> 14(6):498-509. PMID: 24768475. PK/PD antibiotics in intensive care.',
        ],
        guidelinesTitle: 'International Guidelines:',
        guidelines: [
          '<strong>KDIGO 2012:</strong> Clinical Practice Guideline for Acute Kidney Injury. Drug dosage adjustment in AKI/CKD.',
          '<strong>FDA Guidance 2020:</strong> Pharmacokinetics in Patients with Impaired Renal Function. Regulatory standards for CKD pharmacokinetics.',
          '<strong>British National Formulary (BNF) 2023:</strong> Prescribing in Renal Impairment. Comprehensive UK renal adjustments database.',
          '<strong>Pediatric Dosage Handbook (Lexicomp) 2023:</strong> Evidence-based pediatric dosing with clinical references.',
        ],
        onlineResources: {
          title: 'Reliable Online Resources:',
          kdigo: 'KDIGO Guidelines',
          fda: 'FDA Renal Impairment Guidance',
          bnf: 'British National Formulary',
          lexicomp: 'Pediatric Dosage Handbook',
        },
      },
    },
  },

  // 9. EMPTY STATE
  emptyState: 'Enter patient and drug parameters to calculate dosage',

  // 10. DISCLAIMER
  disclaimer: {
    title: 'Medical-Legal Disclaimer:',
    text: 'This calculator provides initial estimates based on standardized formulas. Final clinical decisions require comprehensive patient assessment (history, physical exam, laboratory tests, imaging, comorbidities, drug interactions). For narrow therapeutic index drugs (digoxin, aminoglycosides, vancomycin, antiepileptics, immunosuppressants), TDM (Therapeutic Drug Monitoring) is MANDATORY. Always consult official guidelines (AIFA/EMA/FDA), SPC (Summary of Product Characteristics), and peer-reviewed literature. In case of doubts, specialist consultation (clinical pharmacology, nephrology, pediatrics) recommended.',
  },
};
