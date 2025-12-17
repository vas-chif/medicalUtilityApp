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
      title: 'Definition: Pharmacokinetics and Pharmacodynamics (PK/PD)',
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

    // SECTION 5: Dosage Interpretation
    interpretation: {
      title: 'Dosage Interpretation and Therapeutic Ranges',
      content: {
        conceptsTitle: 'Fundamental TDM Principles (Therapeutic Drug Monitoring):',
        concepts: [
          '<strong>Therapeutic Index:</strong> Ratio between toxic and effective dose. Narrow TI (< 2) requires mandatory TDM (digoxin TI = 1.5, lithium TI = 2, warfarin TI = 2).',
          '<strong>Pharmacokinetic Variability:</strong> Inter-individual PK variability can be 10-20 fold (CYP2D6 poor vs extensive metabolizers). TDM compensates genetic variability, age, comorbidities, interactions.',
          '<strong>Sampling Timing:</strong> Cmin (trough, pre-dose) reflects steady state. Cmax (peak, 1-2h post-dose PO, end of IV infusion) for CDD drugs. Wrong timing → invalid interpretation.',
          '<strong>Steady State:</strong> Valid TDM only at steady state (5 half-lives). Digoxin: wait 7-10 days post-initiation. Phenytoin: wait 7-14 days.',
        ],
        rangesTitle: 'Main Therapeutic Ranges by Drug:',
        ranges: [
          '<strong>Digoxin:</strong> 0.8-2.0 ng/mL (heart failure), 0.5-1.0 ng/mL (atrial fibrillation). Toxicity > 2.5 ng/mL (nausea, arrhythmias, xanthopsia). PMID: 16470885 (JACC 2006).',
          '<strong>Vancomycin:</strong> AUC₀₋₂₄ target 400-600 mg·h/L (MRSA infections). Cmin 15-20 mg/L obsolete (nephrotoxicity). AUC-based TDM reduces AKI 30% vs Cmin-based. PMID: 32191793 (AJHP 2020).',
          '<strong>Gentamicin:</strong> Cmax 20-30 mg/L (severe infections), Cmin < 1 mg/L (nephrotoxicity prevention). Extended-interval dosing (5-7 mg/kg q24h) preferred. PMID: 9483199 (CID 1998).',
          '<strong>Phenytoin:</strong> 10-20 mg/L (adults), 8-15 mg/L (children). Toxicity > 20 mg/L (ataxia, nystagmus, sedation). Michaelis-Menten kinetics (saturable) → small dose ↑ → large concentration ↑. PMID: 29383720 (Epilepsia 2018).',
          '<strong>Lithium:</strong> 0.6-1.2 mEq/L (acute mania 0.8-1.2, maintenance 0.6-0.8). Toxicity > 1.5 mEq/L (tremor, polyuria, confusion). 12h post-dose sampling mandatory. PMID: 31046916 (Aust Prescr 2019).',
          '<strong>Theophylline:</strong> 5-15 mg/L (asthma, COPD). Toxicity > 20 mg/L (tachycardia, seizures). TDM essential (CYP1A2 interactions: smoking ↑clearance, fluoroquinolones ↓clearance). PMID: 7516885 (Ann Pharmacother 1994).',
        ],
        doseResponseTitle: 'PK/PD Dose-Response Relationships:',
        doseResponse: [
          '<strong>Linear Relationship:</strong> Most drugs. ↑dose 2x → ↑concentration 2x. Proportional dose adjustment. E.g., Amoxicillin, Acetaminophen (sub-hepatotoxic range).',
          '<strong>Saturable Kinetics (Michaelis-Menten):</strong> Phenytoin, Valproic Acid high doses, Ethanol. ↑dose → ↑↑↑concentration (non-proportional). Small dose adjustments (10-20%) mandatory. Frequent TDM required.',
          '<strong>Pro-drug Medications:</strong> Clopidogrel, Codeine, Enalapril. CYP metabolism variability (CYP2C19, CYP2D6) → variable efficacy. Genotyping useful for non-responders (clopidogrel CYP2C19*2 *3 = poor metabolizer).',
          '<strong>Tolerance/Tachyphylaxis:</strong> Nitrates (24h tolerance), Benzodiazepines (weeks tolerance). Progressive dose-escalation necessary, but dependence/toxicity risk. Drug-free windows (nocturnal nitrates) reduce tolerance.',
        ],
        steadyStateTitle: 'Time to Steady State Achievement:',
        steadyState: [
          '<strong>5 Half-Lives Rule:</strong> 97% steady state achieved after 5 × t½. Amoxicillin t½ = 1h → steady state 5h. Digoxin t½ = 40h → steady state 8-10 days.',
          '<strong>Steady State Fraction:</strong> 1 t½ = 50%, 2 t½ = 75%, 3 t½ = 87.5%, 4 t½ = 93.75%, 5 t½ = 96.875%. TDM before 5 t½ = invalid interpretation (incomplete accumulation).',
          '<strong>Loading Dose Bypass:</strong> LD skips gradual accumulation. Immediate Css achievement (1-2h post-infusion). Essential for long t½ drugs in urgent settings (digoxin rapid AF, vancomycin sepsis).',
        ],
        clinicalMonitoringTitle: 'Integrated Clinical Monitoring:',
        clinicalMonitoring: [
          "<strong>Therapeutic Efficacy:</strong> Don't base decisions solely on plasma levels. Assess clinical outcomes: infection resolution (vancomycin), rhythm control (digoxin), seizure control (phenytoin), mood stabilization (lithium).",
          '<strong>Toxicity:</strong> Toxicity symptoms often precede critical levels or occur even in therapeutic range (hypersensitivity). Digoxin: nausea, bradycardia, arrhythmias. Phenytoin: nystagmus, ataxia, diplopia. Lithium: tremor, polyuria, confusion.',
          '<strong>Comorbidity Impact:</strong> Renal insufficiency (↓clearance aminoglycosides, digoxin, lithium), hepatic insufficiency (↓clearance phenytoin, theophylline), hypoalbuminemia (↑free fraction phenytoin/valproic → toxicity even if total level in range).',
          '<strong>Drug Interactions:</strong> CYP450 inhibitors/inducers alter clearance. Nephrotoxic drugs (NSAIDs, ACE-I) potentiate aminoglycoside renal toxicity. Frequent TDM with new concomitant drugs.',
        ],
      },
    },

    // SECTION 6: Clinical Applications
    applications: {
      title: 'Clinical Applications and Special Scenarios',
      content: {
        cardiologyTitle: 'Cardiology:',
        cardiology: [
          '<strong>Digoxin (Heart Failure/AF):</strong> Dosing: 0.125-0.25 mg QD PO. Mandatory renal adjustment (60-70% renal excretion). CKD 3: 0.125 mg QD. CKD 4-5: 0.0625-0.125 mg every 48h. TDM target 0.5-1.0 ng/mL (AF), 0.8-2.0 ng/mL (HF). Loading dose: 0.5-1 mg divided over 24h (0.5 mg → 0.25 mg 4-6h → 0.25 mg 4-6h). PMID: 31324494 (ESC 2019).',
          '<strong>Beta-Blockers (Post-MI, HF):</strong> Metoprolol: 25-100 mg BID PO, target HR 55-70 bpm. Carvedilol: 3.125 mg BID, biweekly up-titration to 25 mg BID (HF). No renal adjustment needed (hepatic metabolism). Caution bradycardia/hypotension. PMID: 28304219 (JACC 2017).',
          '<strong>Oral Anticoagulants:</strong> Warfarin: target INR 2-3 (AF, DVT), 2.5-3.5 (mechanical valves). Individualized dosing (CYP2C9, VKORC1 polymorphisms). DOACs (Rivaroxaban, Apixaban, Edoxaban): CrCl-based adjustment. Rivaroxaban AF: 20 mg QD (CrCl > 50), 15 mg QD (CrCl 15-50). PMID: 29136338 (NEJM 2017).',
          '<strong>Diuretics (Edema, Hypertension):</strong> Furosemide: 20-80 mg QD-BID PO, max 600 mg/day (refractory edema). Dose-dependent response but ceiling effect (advanced CKD requires high doses). Monitor K⁺, Na⁺, Mg²⁺. Thiazides ineffective eGFR < 30 mL/min. PMID: 21073363 (Circulation 2010).',
        ],
        infectiousDiseaseTitle: 'Infectious Diseases:',
        infectiousDisease: [
          '<strong>Beta-Lactams (Pneumonia, UTI):</strong> Amoxicillin: 500-1000 mg TID PO. Amoxicillin-Clavulanate: 875/125 mg BID (community), 1000/125 mg TID (hospitalized). Piperacillin-Tazobactam: 4.5g Q6-8h IV (severe infections), extended infusion 3-4h improves T > MIC. CKD adjustment: ↓dose 25-50% or ↑interval Q12h. PMID: 30016777 (Lancet ID 2018).',
          '<strong>Vancomycin (MRSA):</strong> Dosing: 15-20 mg/kg Q8-12h IV (based on renal function). Loading dose: 25-30 mg/kg (max 3g) if sepsis/meningitis. Target AUC₀₋₂₄ 400-600 mg·h/L (calculated via Bayesian modeling). CKD: Q24-48h based on Cmin. Mandatory TDM (day 2-3). PMID: 32191793 (AJHP 2020).',
          '<strong>Aminoglycosides (Pseudomonas, MDR Gram-negatives):</strong> Gentamicin/Tobramycin: 5-7 mg/kg Q24h IV (Extended-Interval Dosing). Amikacin: 15-20 mg/kg Q24h IV. Target Cmax/MIC > 8-10, Cmin < 1 mg/L. CKD: ↓dose 30-50% + interval Q36-48h. Mandatory TDM. Reduces nephrotoxicity vs traditional Q8h dosing. PMID: 25712872 (Int J Antimicrob Agents 2015).',
          '<strong>Fluoroquinolones (Complicated Infections):</strong> Levofloxacin: 500-750 mg QD PO/IV. Ciprofloxacin: 400 mg Q8-12h IV, 500-750 mg BID PO. Moxifloxacin: 400 mg QD PO/IV (no renal adjustment, hepatic/biliary elimination). AUC/MIC > 125 efficacy target. Caution: tendinopathies, QTc-prolongation, neuropathies. PMID: 22387849 (CID 2012).',
        ],
        nephrologyTitle: 'Nephrology (CKD-Specific):',
        nephrology: [
          '<strong>Allopurinol (Hyperuricemia, Gout):</strong> CKD-adjusted dosing: eGFR > 60: 300 mg QD. eGFR 30-60: 200 mg QD. eGFR 15-30: 100 mg QD. eGFR < 15: 100 mg every 2-3 days. Active metabolite (oxypurinol) renally eliminated → accumulation. Increased DRESS syndrome risk CKD + HLA-B*5801 (Asians). PMID: 23992557 (Ann Rheum Dis 2014).',
          '<strong>Gabapentin (Neuropathic Pain):</strong> 100% renal excretion. Mandatory adjustment: eGFR > 60: 300-600 mg TID. eGFR 30-60: 300 mg BID. eGFR 15-30: 300 mg QD. eGFR < 15: 300 mg every 48h. Post-dialysis supplementation: 200-300 mg. PMID: 10348340 (Epilepsia 1999).',
          '<strong>Metformin (Type 2 Diabetes):</strong> Contraindicated eGFR < 30 mL/min (lactic acidosis risk). Caution eGFR 30-45 (quarterly renal monitoring). Max dose eGFR 30-45: 1000 mg/day. Temporarily discontinue pre-contrast imaging (AKI risk). PMID: 27585891 (Diabetes Care 2017).',
          '<strong>ACE Inhibitors/ARBs (Proteinuric CKD):</strong> Nephroprotective (↓proteinuria, ↓CKD progression). Enalapril: 5-20 mg QD. Ramipril: 2.5-10 mg QD. Expected ↑creatinine 20-30% post-initiation (acceptable). Discontinue if ↑creatinine > 30% or K⁺ > 5.5 mEq/L. Monitor creatinine/K⁺ at 1-2 weeks post-initiation. PMID: 11794185 (NEJM 2001).',
        ],
        pediatricsTitle: 'Pediatrics:',
        pediatrics: [
          '<strong>Acetaminophen (Fever, Pain):</strong> Neonates: 10-15 mg/kg Q6-8h PO/IV (max 60 mg/kg/day). Children: 15 mg/kg Q4-6h PO (max 75 mg/kg/day, absolute max 4g/day). Adolescents: 500-1000 mg Q4-6h PO (max 4g/day). Rectal route: variable absorption (↑dose 30%). Dose-dependent hepatotoxicity (↓hepatic glutathione). PMID: 25898459 (Arch Dis Child 2016).',
          '<strong>Amoxicillin (Otitis, Pharyngitis, Pneumonia):</strong> Standard dosing: 40-50 mg/kg/day divided TID PO. High doses (resistant otitis, pneumonia): 80-90 mg/kg/day divided TID (max 3g/day). Neonates: 20-30 mg/kg/day divided Q8-12h (reduced clearance). CrCl < 30 adjustment: Q12h. PMID: 23995667 (Pediatrics 2013).',
          '<strong>Ibuprofen (Fever, Pain, Inflammation):</strong> Children > 6 months: 5-10 mg/kg Q6-8h PO (max 40 mg/kg/day, absolute max 2400 mg/day). Contraindicated < 6 months, dehydration, CKD (AKI risk). Caution asthma (NSAID-induced bronchoconstriction 10-20%). PMID: 27456082 (Pediatrics 2016).',
          '<strong>Caffeine Citrate (Apnea of Prematurity):</strong> Loading dose: 20 mg/kg IV/PO (equivalent to 10 mg/kg caffeine base). Maintenance: 5-10 mg/kg QD. TDM target: 5-25 mg/L. Effects: respiratory center stimulation, ↑CO₂ sensitivity, ↓apneas. Reduced clearance in neonates (t½ 100h neonates vs 5h adults). PMID: 16818558 (Cochrane 2010).',
        ],
        specialPopulationsTitle: 'Special Populations:',
        specialPopulations: [
          '<strong>Pregnancy:</strong> FDA categories abolished 2015 → replaced by PLLR (Pregnancy Lactation Labeling Rule). Safe drugs: Acetaminophen, Amoxicillin, Methyldopa, Insulin. Contraindicated drugs: ACE-I/ARBs (renal teratogenicity), Warfarin (CNS teratogenicity), Isotretinoin (craniofacial malformations). Modified PK in pregnancy: ↑Vd (↑body water), ↑clearance (↑GFR, ↑CYP2D6/3A4 metabolism). PMID: 25629635 (Obstet Gynecol 2015).',
          '<strong>Lactation:</strong> Hale Categories (L1-L5): L1 = safe, L5 = contraindicated. Safe drugs (L1-L2): Acetaminophen, Ibuprofen, Amoxicillin, Metformin, Insulin. Drugs to avoid: Chloramphenicol, Ergotamine, Lithium (neonatal toxicity), Radiocontrast (temporary 24h suspension). Drug milk/plasma ratio drug-dependent: lipophilic, low molecular weight, non-ionized drugs concentrate in milk. PMID: 18348889 (Pediatrics 2013).',
          '<strong>Obesity (BMI > 30):</strong> Hydrophilic drugs: Total Body Weight (TBW) dosing. Lipophilic drugs: Ideal Body Weight (IBW) or Adjusted Body Weight (ABW = IBW + 0.4 × [TBW - IBW]) dosing. Vancomycin: TBW-based (15-20 mg/kg TBW). Aminoglycosides: ABW-based. Propofol: TBW-based (↑adipose Vd). Enoxaparin prophylaxis: 40 mg QD (BMI < 40), 0.5 mg/kg QD (BMI > 40). PMID: 22386834 (Obes Surg 2013).',
          '<strong>Elderly (> 65 years):</strong> ↓lean mass, ↓body water, ↑fat → ↑Vd lipophilic drugs. ↓GFR (↓1 mL/min/year post-40), ↓hepatic clearance (↓flow, ↓CYP450). ↓albumin → ↑free fraction protein-bound drugs. START/STOPP rule: start low, go slow. Polypharmacy risk: prescribing cascade, interactions, ADR. PMID: 31589804 (Age Ageing 2019).',
        ],
        emergencyTitle: 'Emergency Protocols:',
        emergency: [
          '<strong>Cardiac Arrest (ACLS):</strong> Epinephrine: 1 mg IV Q3-5min (dilute 1:10000). Amiodarone: 300 mg IV bolus (refractory VF/VT), then 150 mg IV. Atropine: 0.5-1 mg IV Q3-5min (bradycardia, max 3 mg). Lidocaine: 1-1.5 mg/kg IV bolus (stable VT), infusion 1-4 mg/min. PMID: 29114008 (Circulation 2018).',
          '<strong>Anaphylaxis:</strong> Epinephrine: 0.3-0.5 mg IM (1:1000, anterolateral thigh), repeatable Q5-15min. Pediatric: 0.01 mg/kg IM (max 0.3 mg < 30kg, 0.5 mg > 30kg). Corticosteroids: Methylprednisolone 1-2 mg/kg IV. Antihistamines: Diphenhydramine 25-50 mg IV. Bronchodilators: Albuterol 2.5-5 mg nebulized. PMID: 32492920 (JACI 2020).',
          '<strong>Status Epilepticus:</strong> Phase 1 (0-5 min): Benzodiazepines: Lorazepam 0.1 mg/kg IV (max 4 mg), or Diazepam 0.15-0.2 mg/kg IV, or Midazolam 10 mg IM. Phase 2 (5-20 min): Phenytoin 20 mg/kg IV (max 50 mg/min), or Valproate 40 mg/kg IV, or Levetiracetam 60 mg/kg IV. Phase 3 (> 20 min): General anesthesia (Propofol, Midazolam, Pentobarbital). PMID: 27980175 (Lancet 2016).',
          '<strong>Acetaminophen Overdose:</strong> N-Acetylcysteine (NAC): 21h protocol. Bolus: 150 mg/kg in 200 mL D5% IV 15-60 min. Infusion: 50 mg/kg in 500 mL D5% 4h, then 100 mg/kg in 1000 mL D5% 16h. Rumack-Matthew nomogram: treat if level > 150 μg/mL (4h post-ingestion) or > 75 μg/mL (8h). NAC effective up to 24-48h post-ingestion. PMID: 29211971 (Hepatology 2018).',
        ],
      },
    },

    // SECTION 7: Safety Alerts and Critical Values
    alerts: {
      title: 'Safety Alerts and Critical Values',
      content: {
        highAlertTitle: 'ISMP High-Alert Medications:',
        highAlert: [
          '<strong>ISMP Definition:</strong> Medications with increased risk of causing significant/fatal harm if used in error. Require double nursing check, standardized protocols, mandatory TDM.',
          '<strong>Insulin:</strong> Dosing errors (units vs mL), route (IV vs SC), timing (prandial vs basal). Severe hypoglycemia (< 40 mg/dL): seizures, coma, death. Double-check dose, use smart pumps, patient education. PMID: 25411088 (Diabetes Care 2015).',
          '<strong>Heparin/LMWH:</strong> Dosing errors (units vs mg), confusion between heparin sodium (5000 units/mL) vs heparin calcium (25000 units/5mL). Major bleeding 2-5%. Monitor aPTT (heparin), anti-Xa (LMWH in obesity/CKD), platelets (HIT). Antidote: Protamine 1 mg/100 units heparin. PMID: 28242155 (Chest 2016).',
          '<strong>Opioids:</strong> Dose-dependent respiratory depression. Fentanyl 100× more potent than morphine. Wrong opioid conversion → overdose. Naloxone available (0.4-2 mg IV/IM/SC, repeatable Q2-3min). Caution tolerance (dose escalation) vs dependence. PMID: 29121001 (Cochrane 2017).',
          '<strong>Chemotherapeutics:</strong> Route errors (intrathecal vincristine = fatal), dose (mg vs mg/m²), frequency. Hematologic (neutropenia, thrombocytopenia), hepatic, renal, cardiac toxicity. Double pharmacist-oncologist check, informed consent, adverse effects education. PMID: 31010833 (JCO 2019).',
          '<strong>IV Sedatives (Propofol, Midazolam, Dexmedetomidine):</strong> Respiratory depression, hypotension, bradycardia. Propofol: TBW-based dosing, PRIS risk (Propofol Infusion Syndrome: rhabdomyolysis, acidosis, shock) if > 4 mg/kg/h > 48h. Continuous SpO₂, ECG, BP monitoring. Antidotes: Flumazenil (benzos 0.2 mg IV), ventilatory support. PMID: 22281831 (Crit Care Med 2012).',
        ],
        contraindicationsTitle: 'Contraindications by Organ Function:',
        contraindications: [
          '<strong>Severe CKD (eGFR < 30):</strong> Contraindicated: Metformin (lactic acidosis), Thiazides (ineffective), NSAIDs (↑↑AKI), Nitrofurantoin (ineffective + neuropathy), Dabigatran (accumulation, bleeding). Caution: Digoxin (↑toxicity), Gabapentin (sedation), Enoxaparin (bleeding). PMID: 26597926 (AJKD 2016).',
          '<strong>Hepatic Insufficiency (Child-Pugh B-C):</strong> Avoid: Acetaminophen > 2g/day (hepatotoxicity), Chlorpromazine (cholestasis), Ketoconazole (hepatotoxicity). Reduce 50-75%: Propranolol, Morphine, Midazolam (↓hepatic clearance, ↑encephalopathy). Caution anticoagulants: ↓coagulation factor synthesis → elevated INR even without drugs. PMID: 23160978 (Hepatology 2014).',
          '<strong>Age Extremes (Neonates < 28 days):</strong> Avoid: Chloramphenicol (Grey Baby Syndrome: CV collapse, death), Tetracyclines (tooth discoloration), Fluoroquinolones (animal arthropathy studies, but off-label use for MDR). ↓renal/hepatic clearance → 50-75% dose reduction, ↑interval Q12-24h. PMID: 24819451 (Neonatology 2014).',
          '<strong>Elderly > 75 years (STOPP Criteria):</strong> Avoid: Benzodiazepines (falls, delirium), Anticholinergics (confusion, urinary retention), NSAIDs (GI bleeding, AKI), Antipsychotics (↑dementia mortality). Prefer: Short t½ drugs, low anticholinergic potential. Rule "start low, go slow". PMID: 25324330 (Age Ageing 2015).',
        ],
        drugInteractionsTitle: 'Major Drug Interactions:',
        drugInteractions: [
          '<strong>CYP450 Inhibitors:</strong> Ketoconazole, Erythromycin, Ritonavir, Fluconazole, Diltiazem, Grapefruit juice. ↓substrate clearance → accumulation, toxicity. E.g., Simvastatin + Ketoconazole → rhabdomyolysis (40× ↑concentration). Warfarin + Erythromycin → bleeding. Require ↓substrate dose 50% or switch drug. PMID: 21677198 (Clin Pharmacokinet 2011).',
          "<strong>CYP450 Inducers:</strong> Rifampin, Phenytoin, Carbamazepine, Phenobarbital, St. John's Wort. ↑substrate clearance → underdosing, therapeutic failure. E.g., Oral contraceptives + Rifampin → unintended pregnancies. Warfarin + Carbamazepine → ↓INR, thrombosis. Require ↑substrate dose 100-200% or switch. PMID: 12814450 (Drug Metab Rev 2003).",
          '<strong>QTc-Prolonging Drugs:</strong> Combination risks Torsades de Pointes (fatal ventricular arrhythmia). High-risk drugs: Antiarrhythmics (Amiodarone, Sotalol), Antipsychotics (Haloperidol, Ziprasidone), Antibiotics (Macrolides, Fluoroquinolones), Methadone. Avoid combination. Monitor ECG (QTc > 500 msec = high risk). Correct K⁺, Mg²⁺ (hypokalemia/hypomagnesemia worsen). PMID: 29102187 (JACC 2017).',
          "<strong>Serotonin Syndrome:</strong> Combination of serotonergic drugs: SSRIs, SNRIs, Tramadol, Linezolid, MAOIs, Triptans, Meperidine, St. John's Wort. Symptoms: agitation, tremor, hyperthermia, hypertension, myoclonus, diarrhea. Severe: rigidity, rhabdomyolysis, seizures, DIC. Treatment: drug discontinuation, Cyproheptadine (5-HT antagonist), support. Mortality 2-12%. PMID: 24994558 (CNS Drugs 2014).",
          '<strong>Synergistic Nephrotoxicity:</strong> Combinations with AKI risk: Aminoglycosides + Vancomycin (↑↑nephrotoxicity 30% vs single agent), NSAIDs + ACE-I/ARBs + Diuretics ("triple nephrotoxicity"), Amphotericin + Cyclosporine. Monitor daily creatinine in combinations. Adequate hydration, avoid hypovolemia. PMID: 27257005 (CJASN 2016).',
        ],
        overdoseTitle: 'Common Drug Overdose Management:',
        overdose: [
          '<strong>Acetaminophen:</strong> Symptoms: phase 1 (0-24h) nausea/vomiting, phase 2 (24-72h) right upper quadrant pain/↑transaminases, phase 3 (72-96h) fulminant hepatic failure. Treatment: Mandatory NAC (see 21h protocol in Applications section). Rumack-Matthew nomogram guides treatment. Dose-dependent hepatotoxicity (> 150 mg/kg = risk). Risk factors: alcoholism, CYP2E1 inducers, fasting. PMID: 29211971 (Hepatology 2018).',
          '<strong>Opioids:</strong> Symptoms: triad respiratory depression (RR < 10), pinpoint miosis, depressed consciousness (GCS < 8). Treatment: Naloxone 0.4-2 mg IV/IM/SC, repeatable Q2-3min (max 10 mg). Continuous infusion if needed (2/3 awakening dose/h). Caution: naloxone t½ (30-60 min) < opioid t½ (morphine 2-4h, methadone 15-60h) → relapse. Monitor 4-6h post-naloxone. PMID: 24598215 (Cochrane 2014).',
          '<strong>Benzodiazepines:</strong> Symptoms: sedation, confusion, ataxia, respiratory depression (rare if monotherapy). Treatment: Flumazenil 0.2 mg IV 30 sec, repeatable Q1min (max 1 mg). Caution: precipitates seizures in chronic dependents or mixed overdose (tricyclics + benzos). Prefer ventilatory support vs flumazenil in mixed overdoses. PMID: 22071849 (Cochrane 2011).',
          '<strong>Digoxin:</strong> Symptoms: GI (nausea, vomiting, anorexia), CV (bradycardia, AV block, ventricular arrhythmias, bigeminy), neurologic (confusion, xanthopsia). Treatment: Digoxin-Fab (Digibind): 1 vial (40 mg) binds 0.6 mg digoxin. Dose: (Level ng/mL × Weight kg × 5.6) / 1000 = vials. Fab indications: K⁺ > 5 mEq/L, life-threatening arrhythmias, level > 10 ng/mL. PMID: 19451409 (Heart 2009).',
          '<strong>Anticoagulants:</strong> Warfarin: Critical INR > 9 (major bleeding). Treatment: Vitamin K 10 mg slow IV (correction 12-24h), PCC (Prothrombin Complex Concentrate, immediate correction), fresh frozen plasma. DOACs (Rivaroxaban, Apixaban, Dabigatran): Specific antidotes: Idarucizumab (Dabigatran, 5g IV), Andexanet alfa (anti-Xa DOACs, 400-800 mg IV). PMID: 26095746 (NEJM 2015).',
        ],
      },
    },

    // SECTION 8: Clinical Documentation
    documentation: {
      title: 'Documentation and Guidelines',
      content: {
        internationalGuidelinesTitle: 'International Guidelines:',
        internationalGuidelines: [
          '<strong>AIFA (Italian Medicines Agency):</strong> Italian regulatory authority. Italian SPC (Summary of Product Characteristics), AIFA notes (prescribing limits), AIFA determinations (approvals/revocations). Database: <em>https://farmaci.agenziafarmaco.gov.it</em>. Mandatory reference for prescribing in Italy.',
          '<strong>EMA (European Medicines Agency):</strong> European drug agency. EPAR (European Public Assessment Report) for EU-approved drugs. Guidelines for pediatric, geriatric, CKD PK. Database: <em>https://www.ema.europa.eu</em>. EU standard for prescribing, clinical trials.',
          '<strong>FDA (Food and Drug Administration):</strong> US drug agency. Detailed Prescribing Information (PI), Black Box Warnings, Safety Communications. MedWatch (pharmacovigilance). Database: <em>https://www.fda.gov/drugs</em>. Worldwide clinical pharmacology reference.',
          '<strong>BNF (British National Formulary):</strong> UK formulary (NICE). Adult/pediatric dosing, CKD/hepatic adjustments, interactions. Database: <em>https://bnf.nice.org.uk</em>. Bimonthly updates, app available. UK prescribing standard.',
          '<strong>WHO Essential Medicines List 2023:</strong> WHO list of essential medicines (core + complementary). Criteria: proven efficacy, acceptable safety, cost-effectiveness. Guides procurement in developing countries. Database: <em>https://www.who.int/medicines/publications/essentialmedicines</em>.',
        ],
        renalDosingTitle: 'Renal Dosing Databases:',
        renalDosing: [
          '<strong>Kidney Disease Drug Database (NKF):</strong> Comprehensive CKD/dialysis adjustments database. Over 1000 drugs. eGFR-based categories. Access: <em>https://www.kidney.org/professionals/kdoqi</em>. Subscription required.',
          '<strong>GlobalRPH Renal Dosing:</strong> Free online eGFR calculators (CKD-EPI, MDRD, Cockcroft-Gault), renal adjustments. Database: <em>https://globalrph.com/medcalcs/renal-dosing-calculator</em>. Widely used clinically.',
          '<strong>Lexicomp Renal Dosing:</strong> Complete commercial database (subscription). EHR-integrated (Epic, Cerner). Real-time updates, drug interactions, IV compatibility. US hospital standard.',
          '<strong>UpToDate Drug Interactions/Dosing:</strong> Evidence-based reference. Complete drug monographs, special populations dosing. Peer-reviewed, monthly updates. Subscription required. Worldwide clinical gold standard.',
        ],
        pediatricFormulariesTitle: 'Pediatric Formularies:',
        pediatricFormularies: [
          '<strong>Harriet Lane Handbook (Johns Hopkins):</strong> Pediatric pocket manual. Age-based drug dosing (neonates, infants, children, adolescents). Clinical formulas, normal lab values. Annual edition. ISBN: 978-0323876988 (32nd ed, 2023).',
          '<strong>Pediatric Dosage Handbook (Lexicomp):</strong> Comprehensive pediatric dosing reference. Over 1000 drugs, mg/kg dosing, pediatric renal/hepatic adjustments. Annual edition. ISBN: 978-1591954071 (29th ed, 2023).',
          '<strong>Neofax (Neonatal Medications):</strong> Neonatal formulary (0-28 days). Premature/neonate dosing, IV dilutions, compatibility, ontogenetic pharmacokinetics. Annual edition. ISBN: 978-1944453565 (2023 ed).',
          '<strong>BNF for Children (BNFC):</strong> UK pediatric formulary (NICE). Age-based dosing, unlicensed uses, interactions. Online database: <em>https://bnfc.nice.org.uk</em>. Free, app available.',
        ],
        tdmProtocolsTitle: 'TDM Protocols (Therapeutic Drug Monitoring):',
        tdmProtocols: [
          '<strong>Vancomycin AUC-based TDM:</strong> ASHP/IDSA/PIDS 2020 consensus. Target AUC₀₋₂₄ 400-600 mg·h/L. Bayesian modeling (software: InsightRx, DoseMeRx). Sampling: 2 levels (1 hour post-infusion + 1 pre-dose). AUC calculation via software. Reduces nephrotoxicity 30% vs Cmin-based. PMID: 32191793.',
          '<strong>Aminoglycosides Hartford Nomogram:</strong> Extended-Interval Dosing (EID). Gentamicin/Tobramycin: 5-7 mg/kg Q24h. Amikacin: 15-20 mg/kg Q24h. Single sampling (6-14h post-dose) → Hartford nomogram → Q24/Q36/Q48h. ↓nephrotoxicity vs traditional Q8h. PMID: 9483199.',
          '<strong>Digoxin TDM:</strong> Sampling: 6-8h post-dose (steady state after 7-10 days). Target: 0.5-1.0 ng/mL (AF), 0.8-2.0 ng/mL (HF). Interpretation: consider K⁺ (hypokalemia ↑toxicity), renal function (CKD accumulation), interactions (amiodarone, verapamil, quinidine ↑levels 50-100%). PMID: 16470885.',
          '<strong>Phenytoin TDM:</strong> Sampling: Cmin (pre-dose) at steady state (7-14 days). Target: 10-20 mg/L (total), 1-2 mg/L (free). Hypoalbuminemia: measure free level (total level underestimates). Michaelis-Menten: small adjustments (25-50 mg). Dose calculation: Mullen formula. PMID: 29383720.',
          '<strong>Lithium TDM:</strong> Sampling: 12h post-dose mandatory (standardization). Target: 0.6-1.2 mEq/L (acute 0.8-1.2, maintenance 0.6-0.8). Confounding factors: dehydration, NSAIDs, ACE-I, thiazide diuretics (↑levels). Monitor creatinine, TSH (lithium-induced hypothyroidism), ECG (QTc). PMID: 31046916.',
        ],
        clinicalToolsTitle: 'Clinical Decision Support Tools:',
        clinicalTools: [
          '<strong>ClinCalc DrugStats:</strong> US prescription database (Medicare). Top drugs by category, average dosing, costs. eGFR calculators, pediatric dosing, interactions. Free: <em>https://clincalc.com</em>.',
          '<strong>Medscape Drug Interaction Checker:</strong> Free interactions database. Multiple drug input → interaction analysis (major, moderate, minor). Mechanisms (CYP450, PK/PD), management recommendations. Mobile app available: <em>https://reference.medscape.com/drug-interactionchecker</em>.',
          '<strong>Epocrates:</strong> Mobile prescribing app (iOS/Android). Adult/pediatric dosing, renal adjustments, interactions, pill identification. Free/paid versions. US mobile prescribing standard.',
          '<strong>Micromedex (IBM Watson Health):</strong> Comprehensive evidence-based database. Toxicology, TDM, interactions, adjustments. EHR-integrated. Subscription required. Worldwide hospital standard.',
          '<strong>Lexicomp:</strong> Complete drug information suite. Interactions database, IV compatibility, pediatric/adult dosing, TDM. Mobile app EHR-integrated. Subscription required. US clinical standard.',
        ],
      },
    },

    // SECTION 9: Scientific References
    bibliography: {
      title: 'Scientific References',
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
