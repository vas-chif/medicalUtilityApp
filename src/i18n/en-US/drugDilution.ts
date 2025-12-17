/**
 * @file en-US/drugDilution.ts
 * @description English translations for Drug Dilution Calculator - MINIMAL TEST VERSION
 * @author Vasile Chifeac
 * @created 2025-12-17
 */

export default {
  // 1. MAIN TITLES
  title: 'Drug Dilution Calculator',
  subtitle: 'Calculate drug dilutions, final concentrations, and volumes to withdraw',

  // 2. FORM INPUT
  form: {
    sectionTitle: 'Dilution Parameters',
    dose: {
      label: 'Drug Dose',
      unit: 'mg',
      validation: 'Dose must be greater than 0',
    },
    volume: {
      label: 'Final Volume',
      unit: 'mL',
      validation: 'Volume must be greater than 0',
    },
    stockConcentration: {
      label: 'Stock Concentration',
      unit: 'mg/mL',
      hint: 'Optional',
    },
    targetConcentration: {
      label: 'Target Concentration',
      unit: 'mg/mL',
      hint: 'Optional',
    },
  },

  // 3. BUTTONS
  buttons: {
    calculate: 'Calculate Dilution',
    reset: 'Reset',
  },

  // 4. RESULTS PANEL
  resultsPanel: {
    title: 'Dilution Results',
    finalConcentration: {
      label: 'Final Concentration',
      subtitle: 'mg/mL',
    },
    details: {
      totalDose: 'Total Dose',
      finalVolume: 'Final Volume',
      volumeToWithdraw: 'Volume to Withdraw',
      dilutionRatio: 'Dilution Ratio',
    },
  },

  // 5. EMPTY STATE
  emptyState: 'Enter parameters to see results',

  // 6. SECTIONS (MINIMAL)
  sections: {
    definition: {
      title: 'Clinical Definition',
      content: {
        mainDefinition: {
          title: 'Definition:',
          text: 'Drug dilution is the process of reducing the concentration of a medication by adding solvent (usually 0.9% NaCl saline solution or water for injections). Correctly calculating dilution is essential for safe and effective dose administration.',
        },
        principles: {
          title: 'Fundamental Principles:',
          items: [
            '<strong>Concentration = Dose / Volume:</strong> The final concentration (C) depends on the amount of drug (mg) divided by the total volume (mL).',
            '<strong>Mass Conservation:</strong> The total amount of drug remains constant during dilution (only the volume changes).',
            '<strong>Dilution Ratio:</strong> Expresses how many times the final volume is greater than the initial volume. E.g.: 1:10 means 10-fold dilution.',
            '<strong>Stock Solution:</strong> Concentrated starting solution provided by the manufacturer. E.g.: morphine ampoule 10 mg/mL.',
          ],
        },
      },
    },
    physiology: {
      title: 'Pharmacokinetics',
      content: {
        osmolarity: {
          title: 'Osmolarity and Tonicity:',
          description:
            'Osmolarity is the concentration of osmotically active particles in a solution (mOsm/L). It critically affects tissue tolerance to IV solutions.',
          ranges: [
            '<strong>Isotonic (280-320 mOsm/L):</strong> Equivalent to plasma. Ideal for peripheral IV. Examples: 0.9% NaCl (308 mOsm/L)',
            '<strong>Hypertonic (>320 mOsm/L):</strong> Risk of vein irritation, phlebitis. May require central access. Examples: 3% NaCl (1027 mOsm/L)',
            '<strong>Hypotonic (<280 mOsm/L):</strong> Risk of cell swelling and hemolysis. Examples: 0.45% NaCl (154 mOsm/L)',
          ],
        },
        concentrationDynamics: {
          title: 'Concentration Gradients:',
          principles: [
            '<strong>Dilution Effect:</strong> Lowering concentration slows infusion rate and peak plasma concentration (Cmax), reducing toxicity risk',
            '<strong>Volume of Distribution (Vd):</strong> Larger volumes may delay time to peak effect but prolong duration of action',
            '<strong>Tissue Tolerance:</strong> High concentrations (>600 mOsm/L) cause chemical phlebitis. Dilution improves tolerability',
            '<strong>Incompatibility Risk:</strong> Incorrect osmolarity or pH after dilution can cause drug precipitation or hemolysis',
          ],
        },
      },
    },
    measurement: {
      title: 'Measurement Techniques',
      content: {
        equipment: {
          title: 'Required Equipment:',
          items: [
            '<strong>Syringes:</strong> 1 mL (0.01 mL precision, pediatrics), 3-5-10 mL (standard use), 20-50 mL (large volumes). Luer-lock syringes mandatory for high-risk drugs',
            '<strong>Needles:</strong> 18-19G (vial withdrawal), 21-23G (patient injection). Filter needles (5 micron) for glass ampoules',
            '<strong>Infusion Bags:</strong> 50-100-250-500-1000 mL (PVC or EVA). EVA for lipophilic drugs that adsorb to PVC',
            '<strong>Infusion Pumps:</strong> Volumetric (precision ±5%, >5 mL/h) vs syringe (precision ±2%, <5 mL/h)',
          ],
        },
        asepticTechnique: {
          title: 'Aseptic Technique:',
          steps: [
            '<strong>Hand Hygiene:</strong> Antiseptic wash 60 sec + alcohol gel. Non-powder sterile gloves',
            '<strong>Sterile Environment:</strong> Laminar airflow hood for sterile preparations',
            '<strong>Disinfection:</strong> 70% alcohol on vial rubber cap 15 sec + complete drying',
            '<strong>Visual Control:</strong> Verify clarity, absence of particulate/precipitates before and after dilution',
          ],
        },
        dilutionProcedure: {
          title: 'Dilution Procedure:',
          procedure: [
            '<strong>Step 1 - Calculation:</strong> Calculate dose, withdrawal volume, solvent volume, final concentration',
            '<strong>Step 2 - Preparation:</strong> Assemble sterile syringe/needle, verify expiration dates',
            '<strong>Step 3 - Withdrawal:</strong> Disinfect cap, withdraw calculated volume, eliminate air bubbles',
            '<strong>Step 4 - Transfer:</strong> Inject drug into bag/syringe solvent',
            '<strong>Step 5 - Mixing:</strong> Gentle inversion 10-15 times (DO NOT shake vigorously)',
            '<strong>Step 6 - Labeling:</strong> Drug name, dose, volume, concentration, date/time, operator',
            '<strong>Step 7 - Check:</strong> Double check for ISMP high-alert drugs',
          ],
        },
      },
    },
    formula: {
      title: 'Formulas and Calculations',
      content: {
        basicFormulas: {
          title: 'Basic Formulas:',
          formulas: [
            '<strong>Final Concentration:</strong> C final = Dose (mg) / Final Volume (mL). Units: mg/mL. Example: 100 mg / 10 mL = 10 mg/mL',
            '<strong>Volume to Withdraw:</strong> V withdraw = Dose (mg) / C stock (mg/mL). Units: mL. Example: 50 mg / (10 mg/mL) = 5 mL',
            '<strong>Solvent Volume:</strong> V solvent = V final - V withdraw. Units: mL. Example: 50 mL - 5 mL = 45 mL NS 0.9%',
            '<strong>Dilution Ratio:</strong> Ratio = V final / V withdraw. Expressed as 1:X. Example: 50 mL / 5 mL = 10 → 1:10',
          ],
        },
        advancedFormulas: {
          title: 'Advanced Formulas:',
          calculations: [
            '<strong>Mass Conservation:</strong> C stock × V withdraw = C final × V final. Example: 10 mg/mL × 5 mL = 1 mg/mL × 50 mL',
            '<strong>Weight/Volume Percentage:</strong> % w/v = (grams solute / mL solution) × 100. Ex: 1% = 10 mg/mL, 0.9% = 9 mg/mL',
            '<strong>Serial Dilution:</strong> C n = C 0 / (Ratio 1 × Ratio 2 × ... × Ratio n). For homeopathic preparations',
          ],
        },
        practicalExample: {
          title: 'Practical Example:',
          scenario:
            'Prepare 50 mL morphine 1 mg/mL for PCA infusion. Available stock: morphine 10 mg/mL',
          steps: [
            '<strong>Total dose:</strong> 50 mL × 1 mg/mL = 50 mg morphine needed',
            '<strong>Volume to withdraw:</strong> 50 mg / 10 mg/mL = 5 mL from stock vial',
            '<strong>Solvent to add:</strong> 50 mL - 5 mL = 45 mL of NS 0.9%',
            '<strong>Verification:</strong> 50 mg / 50 mL = 1 mg/mL. Dilution ratio: 1:10',
          ],
        },
      },
    },
    interpretation: {
      title: 'Results Interpretation',
      content: {
        concentrationRanges: {
          title: 'Safe Concentration Ranges:',
          drugs: [
            '<strong>Morphine:</strong> 0.1-1 mg/mL (pediatrics 0.1 mg/mL, adult PCA 1 mg/mL, continuous infusion 0.5 mg/mL)',
            '<strong>Vancomycin:</strong> 2-5 mg/mL (max 5 mg/mL peripheral to avoid phlebitis). Infusion 500 mg in 100-250 mL',
            '<strong>Epinephrine:</strong> 1:1000 (1 mg/mL IM/SC), 1:10000 (0.1 mg/mL IV), 1:100000 (0.01 mg/mL infusion)',
            '<strong>Insulin:</strong> 1 unit/mL (adult standard), 0.1 unit/mL (neonates). Stock 100 units/mL diluted 1:100',
            '<strong>Potassium:</strong> Max 40 mEq/L peripheral, 60-80 mEq/L central. Concentrations > 80 mEq/L cause arrhythmias',
            '<strong>Chemotherapy:</strong> Specific ranges - Doxorubicin 2 mg/mL, Cisplatin 1 mg/mL, Carboplatin 10 mg/mL',
          ],
        },
        verificationChecks: {
          title: 'Verification Checklist:',
          checks: [
            '<strong>Correct Drug:</strong> Verify drug name, vial dosage, lot number, expiration date',
            '<strong>Double Calculation:</strong> Two independent operators for ISMP high-alert medications',
            '<strong>Final Concentration:</strong> Verify safe range for administration route (peripheral/central)',
            '<strong>Compatibility:</strong> Verify compatible solvent (NS 0.9%, D5W, sterile water)',
            '<strong>Label:</strong> Name, dose, volume, concentration, date/time, operator, expiration',
            '<strong>Infusion Rate:</strong> Calculate mL/h or drops/min. Verify minimum infusion time',
          ],
        },
        clinicalGuidance: {
          title: 'Clinical Guidelines:',
          guidance: [
            '<strong>Pediatrics:</strong> Reduced concentrations to minimize dosing errors. Neonatal morphine 0.05-0.1 mg/mL',
            '<strong>High-Alert Drugs:</strong> Standard concentrations (heparin 100 units/mL, insulin 1 unit/mL)',
            '<strong>Volume Overload:</strong> Cardiac/renal patients require maximum possible concentration',
            '<strong>Continuous Infusion:</strong> Dilutions allow precise titration (norepinephrine 16 mcg/mL)',
          ],
        },
      },
    },
    applications: {
      title: 'Clinical Applications',
      content: {
        highRiskDrugs: {
          title: 'ISMP High-Alert Medications:',
          drugs: [
            'Insulin: Stock 100 IU/mL → Dilute 1:10 for IV infusion (1 IU/mL). NEVER concentrated insulin IV',
            'Epinephrine: Stock 1:1000 → IV requires 1:10000 dilution (0.1 mg/mL). Cardiac arrest: 1 mg IV',
            'Potassium: Stock 2 mEq/mL → NEVER IV push. Peripheral MAX 40 mEq/L. Central MAX 80 mEq/L',
            'Morphine PCA: Standard 1 mg/mL (100 mg in 100 mL). Pediatrics 0.5 mg/mL, opioid-tolerant 2 mg/mL',
            'Heparin: Standard 100 units/mL (25,000 units in 250 mL). Pediatrics 50 units/mL',
            'Chemotherapy: Carboplatin 10 mg/mL max. Cisplatin 1 mg/mL. Vincristine FATAL if intrathecal',
          ],
        },
        pediatrics: {
          title: 'Pediatric Applications:',
          considerations: [
            'Small Volumes: Neonates require dilutions for measurable volumes. Morphine 0.1 mg/mL vs adult 1-2 mg/mL',
            'Safety: Lower concentrations reduce overdose risk. 0.1 mL error = 0.01 mg at 0.1 mg/mL vs 0.2 mg at 2 mg/mL',
            'Osmolarity: Neonates sensitive. Maintain 280-320 mOsm/L. KCl max 20 mEq/L vs adult 40 mEq/L',
            'Stability: Pediatric dilutions shorter stability (4-12h vs 24h) due to small volumes',
            'Weight-Based: Individual calculations. Gentamicin 5 mg/kg for 3 kg = 15 mg in 3 mL (5 mg/mL)',
          ],
        },
        criticalCare: {
          title: 'Intensive Care Unit:',
          protocols: [
            '<strong>Vasopressors:</strong> Norepinephrine 4 mg in 250 mL D5W = 16 mcg/mL. Dose 0.05-3 mcg/kg/min. Central access',
            '<strong>Sedation:</strong> Propofol 10 mg/mL DO NOT dilute. Dedicated set change 12h. PRIS risk if > 4 mg/kg/h > 48h',
            '<strong>Thrombolysis:</strong> Alteplase NO dilution. STEMI: 15 mg bolus, 50 mg in 30 min, 35 mg in 60 min',
            '<strong>Antiarrhythmics:</strong> Amiodarone 150 mg in 100 mL D5W over 10 min, then 360 mg in 6h, then 540 mg in 18h',
            '<strong>Parenteral Nutrition:</strong> 3-in-1 osmolarity 1200-1800 mOsm/L → CENTRAL only. Filter 1.2 micron',
          ],
        },
        oncology: {
          title: 'Oncology (Chemotherapy):',
          chemotherapy: [
            '<strong>Doxorubicin:</strong> Stock 2 mg/mL → 0.4 mg/mL peripheral, 2 mg/mL central. Photosensitive. Vesicant',
            '<strong>Cisplatin:</strong> 1 mg/mL → dilute in NS 0.9% only. Dose 50-100 mg/m² in 1-3 L NS over 6-8h. Nephrotoxic',
            '<strong>Carboplatin:</strong> 10 mg/mL → dilute in D5W or NS. Dose AUC-based (Calvert). Infusion 15-60 min',
            '<strong>Paclitaxel:</strong> 6 mg/mL → 0.3-1.2 mg/mL. Non-PVC set. Premedication (dexamethasone, antihistamines)',
          ],
        },
      },
    },
    alerts: {
      title: 'Safety Alerts',
      content: {
        highAlertMedications: {
          title: 'ISMP High-Alert Medications:',
          categories: [
            '<strong>Anticoagulants:</strong> Heparin, LMWH (enoxaparin, dalteparin), warfarin. Dilution errors → hemorrhage/thrombosis',
            '<strong>Insulin:</strong> Only regular insulin IV (diluted). Confusion units/mL. Severe hypoglycemia < 40 mg/dL = seizures',
            '<strong>Opioids:</strong> Morphine, fentanyl, hydromorphone. Respiratory depression. Fentanyl 100× morphine potency',
            '<strong>IV Sedatives:</strong> Propofol, midazolam. PRIS if propofol > 4 mg/kg/h > 48h: acidosis, cardiac arrest',
            '<strong>Electrolytes:</strong> KCl > 2 mEq/mL, NaCl > 0.9%, CaCl₂ 10%. NEVER direct bolus (cardiac arrest)',
            '<strong>Chemotherapy:</strong> All cytotoxic. Vesicants (extravasation = necrosis). Dosing mg/m² BSA',
            '<strong>Local Anesthetics:</strong> Bupivacaine, ropivacaine. LAST toxicity: seizures, arrhythmias. Lipid rescue',
          ],
        },
        criticalConcentrations: {
          title: 'Critical Concentrations:',
          limits: [
            '<strong>Potassium:</strong> Peripheral MAX 40 mEq/L (10 mEq/h). Central MAX 60-80 mEq/L (20 mEq/h + ECG). > 80 mEq/L = arrest',
            '<strong>Calcium:</strong> CaCl₂ 10% dilute 1:10 → 10 mg/mL. NEVER rapid bolus (bradycardia). Extravasation = necrosis',
            '<strong>Magnesium:</strong> MgSO₄ 50% dilute 1:10 → 50 mg/mL. Eclampsia 4-6 g in 15-20 min. Toxicity: hyporeflexia',
            '<strong>Bicarbonate:</strong> NaHCO₃ 8.4% dilute 1:2 pediatrics. Hyperosmolar (2000 mOsm/L). Incompatible with catecholamines',
            '<strong>Glucose:</strong> D50% dilute 1:4 → D10%. D50% central only. Pediatrics max D12.5% peripheral',
          ],
        },
        incompatibilities: {
          title: 'Major Incompatibilities:',
          combinations: [
            '<strong>Phenytoin + D5W:</strong> Precipitates (pH 12 vs pH 4). Only NS 0.9%. Max 50 mg/min (hypotension)',
            '<strong>Ceftriaxone + Calcium:</strong> Fatal precipitate (neonates). NEVER co-administer within 48h',
            '<strong>Diazepam + PVC:</strong> Adsorbs 30-50%. Use glass or polypropylene. DO NOT dilute',
            '<strong>Ampicillin + Aminoglycosides:</strong> Mutual inactivation if mixed. Administer separately',
            '<strong>Furosemide:</strong> Precipitates pH < 7 with vitamin C, dobutamine, midazolam. Flush NS between drugs',
          ],
        },
        emergencyProtocols: {
          title: 'Emergency Protocols:',
          procedures: [
            '<strong>Opioid Overdose:</strong> Naloxone 0.4-2 mg IV Q2-3min. Dilute 0.4 mg in 10 mL = 0.04 mg/mL',
            '<strong>Vesicant Extravasation:</strong> STOP infusion. Aspirate residue. Antidotes: doxorubicin → dexrazoxane',
            '<strong>Hyperkalemia:</strong> K+ > 6.5 mEq/L. Calcium gluconate 10% 10-20 mL IV. Then insulin + glucose',
            '<strong>Anesthetic Toxicity:</strong> Lipid emulsion 20% 1.5 mL/kg bolus, then 0.25 mL/kg/min. Max 12 mL/kg',
            '<strong>Contamination:</strong> STOP. Blood cultures + solution culture. Broad-spectrum antibiotics',
          ],
        },
      },
    },
    documentation: {
      title: 'Compatibility & Stability',
      content: {
        compatibility: {
          title: 'IV Solvent Compatibility Matrix:',
          solvents: [
            '<strong>Normal Saline 0.9% (NS):</strong> Most commonly used solvent. Compatible with majority of IV drugs (antibiotics, analgesics, antiemetics). Osmolarity 308 mOsm/L (isotonic). Incompatible with: Amphotericin B (precipitates), Diazepam (precipitates), Fat emulsions',
            '<strong>5% Dextrose in Water (D5W):</strong> Second-line solvent for drugs incompatible with NaCl. Osmolarity 252 mOsm/L (hypotonic but acceptable). Compatible with amphotericin B, phenytoin, chemotherapeutics. Incompatible with: Blood products, ertapenem, some cephalosporins',
            '<strong>Sterile Water for Injection (SWFI):</strong> ONLY for diluting stock concentrates or reconstituting powders. Osmolarity 0 mOsm/L (hypotonic). NEVER administer IV directly (hemolysis). Must be further diluted in NS or D5W for IV administration',
            "<strong>Lactated Ringer's Solution (LR):</strong> Contains Na+ 130 mEq/L, K+ 4 mEq/L, Ca²⁺ 3 mEq/L, Cl⁻ 109 mEq/L, Lactate 28 mEq/L. Osmolarity 273 mOsm/L (isotonic). Used for fluid resuscitation. Incompatible with: Ceftriaxone (Ca²⁺ precipitates), Amphotericin B, blood products",
            '<strong>Bacteriostatic Water (with benzyl alcohol):</strong> For multiple-dose vials. NEVER use in neonates (benzyl alcohol toxic: gasping syndrome). NEVER for intrathecal or epidural injections',
          ],
        },
        stabilityData: {
          title: 'Stability Times by Drug Class:',
          categories: [
            '<strong>24-48 hours (Refrigerated 2-8°C):</strong> Most diluted beta-lactam antibiotics (penicillins, cephalosporins except ampicillin), aminoglycosides (gentamicin, amikacin), fluoroquinolones (ciprofloxacin, levofloxacin), morphine in NS or D5W',
            '<strong>8-12 hours (Room Temperature 15-25°C):</strong> Glycopeptides (vancomycin, teicoplanin), carbapenems (meropenem, imipenem), metronidazole, fluconazole',
            '<strong>4-6 hours (Refrigerated):</strong> Ampicillin in any diluent (beta-lactam ring unstable), piperacillin-tazobactam after reconstitution',
            '<strong>Immediate Use (Use within 1 hour):</strong> Chemotherapeutics without stabilizers (cyclophosphamide, ifosfamide), photosensitive drugs (nitroprusside - cover with foil, furosemide high concentrations), rasburicase',
            '<strong>Light-Protected Storage:</strong> Nitroprusside (cover with aluminum foil - degrades to cyanide on light exposure), epoprostenol, dacarbazine, furosemide > 10 mg/mL',
          ],
        },
        labeling: {
          title: 'Mandatory Labeling Requirements:',
          requirements: [
            '<strong>Drug Name (Generic and Brand):</strong> "Morphine Sulfate" or "Morphine (MS Contin)" - avoid abbreviations (MS = morphine or magnesium sulfate?)',
            '<strong>Total Drug Amount:</strong> "100 mg" (total amount in entire syringe/bag, NOT per mL)',
            '<strong>Final Concentration:</strong> "10 mg/mL" or "10 mg per 1 mL" (concentration)',
            '<strong>Total Volume:</strong> "10 mL total volume" (total volume of solution)',
            '<strong>Date and Time of Preparation:</strong> "Prepared: 2025-01-07 14:30" (24-hour format preferred)',
            '<strong>Expiration Date and Time:</strong> "Expires: 2025-01-08 14:30" (based on stability data - 24h for morphine in NS at 2-8°C)',
            '<strong>Preparer Identification:</strong> "Prepared by: Initials JD" (for accountability and quality control)',
            '<strong>Route of Administration:</strong> "For IV use only" (prevent wrong-route errors, critical for vincristine - fatal if intrathecal)',
            '<strong>Storage Conditions:</strong> "Store refrigerated 2-8°C" or "Store at room temperature" (based on stability data)',
          ],
        },
      },
    },
    references: {
      title: 'Scientific References',
      content: {
        guidelines: {
          title: 'International Guidelines and Standards:',
          list: [
            '<strong>ISMP (Institute for Safe Medication Practices):</strong> High-Alert Medications List 2024. Identifies medications that bear heightened risk of causing significant patient harm when used in error. Includes concentrated electrolytes, insulin, heparin, chemotherapeutics. Recommends independent double checks for all dilutions',
            '<strong>ASHP Guidelines on Compounding Sterile Preparations 2022:</strong> Establishes standards for aseptic technique, environmental quality (ISO classifications), beyond-use dating, personnel training and competency assessment. Applies to all sterile compounding including dilutions',
            '<strong>USP 797 (United States Pharmacopeia):</strong> Legal standard in USA for sterile compounding. Defines risk levels (immediate use, low, medium, high risk), environmental controls (ISO Class 5/7/8), beyond-use dates, personnel qualifications. Updated 2023',
            '<strong>USP 800:</strong> Hazardous Drugs - Handling in Healthcare Settings. Standards for safe handling of chemotherapeutics and other hazardous drugs. Requires biological safety cabinets, personal protective equipment (PPE), spill management, personnel monitoring. Updated 2023',
            '<strong>Micromedex Drug Information (IBM Watson Health):</strong> Comprehensive pharmacological database with standard dilution protocols, IV compatibility charts, stability data for over 4500 drugs. Used by over 7000 hospitals worldwide',
            '<strong>Lexicomp Drug Information (Wolters Kluwer):</strong> Clinical drug database with pediatric and adult dosing, dilution protocols, IV compatibility. Integrates with electronic health records (EHR)',
          ],
        },
        research: {
          title: 'Key Research Publications:',
          articles: [
            '<strong>ISMP Medication Safety Alert (Quarterly):</strong> Case studies medication errors, root cause analyses, prevention strategies. Free subscription at www.ismp.org/newsletters',
            '<strong>ASHP American Journal of Health-System Pharmacy (Monthly):</strong> Articles on IV admixture stability, compatibilities, compounding techniques. PMID database available. Impact factor 1.9',
            '<strong>Kaushal R et al 2001:</strong> Medication errors in pediatric inpatients. JAMA 285(16):2114-2120. Dilution/calculation errors account for 28% of medication errors in pediatrics. Recommends standardized concentrations and double checks',
            '<strong>Poon EG et al 2010:</strong> Effect of bar-code technology on medication administration safety. N Engl J Med 362(18):1698-1707. Demonstrated 41% reduction in medication errors and 51% reduction in potential adverse drug events with barcode scanning',
            '<strong>Rinke ML et al 2014:</strong> Characteristics of pediatric chemotherapy medication errors. Cancer 120(18):2665-2673. Analyzed 2212 chemotherapy errors: 18% involved incorrect dose/concentration from dilution errors',
          ],
        },
        onlineTools: {
          title: 'Online Calculation Tools and Resources:',
          tools: [
            '<strong>MDCalc Medical Calculator:</strong> www.mdcalc.com - Free clinical calculators including IV drug dosing, drip rate calculators, pharmacokinetic calculators. Peer-reviewed, evidence-based',
            '<strong>ClinCalc Drug Dilution Calculator:</strong> clincalc.com/DrugDilution - Interactive calculator for drug dilutions with common drug presets, concentration verification',
            '<strong>GlobalRPh Drug Dilution Calculator:</strong> globalrph.com/medcalcs/dilution-calculator - Multiple dilution calculators including serial dilution, simple dilution, alligation',
            '<strong>King Guide to Parenteral Admixtures:</strong> www.kingguide.com - Subscription service with over 13000 IV drug monographs, compatibility data, dilution protocols. Updated quarterly',
            '<strong>Stabilis Database:</strong> www.stabilis.org - French/English. Stability data for over 1800 hospital preparations. Temperature, light, container, time. Peer-reviewed. Free access',
          ],
        },
      },
    },
  },
};
