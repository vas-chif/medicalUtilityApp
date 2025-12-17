export default {
  // 1. TITLE & SUBTITLE
  title: 'Infusion Rate Converter',
  subtitle: 'Infusion rate conversions: mcg/kg/min ↔ mL/h for vasopressors and other drugs',

  // 2. FORM INPUT
  form: {
    sectionTitle: 'Infusion Parameters',

    // Patient Weight
    weight: {
      label: 'Body Weight',
      unit: 'kg',
      validation: 'Weight between 1-500 kg',
    },

    // Solution Concentration
    concentration: {
      label: 'Solution Concentration',
      unit: 'mg/mL',
      hint: 'Drug concentration in bag/syringe',
      validation: 'Concentration must be > 0',
    },

    // Conversion Direction
    direction: {
      label: 'Conversion Direction:',
      doseToRate: 'Dose → mL/h',
      rateToDose: 'mL/h → Dose',
    },

    // Dose Input
    dose: {
      label: 'Dose',
      validation: 'Dose must be > 0',
    },

    // Dose Unit Select
    doseUnit: {
      label: 'Dose Unit',
    },

    // Flow Rate Input
    flowRate: {
      label: 'Infusion Rate',
      unit: 'mL/h',
      validation: 'Flow rate must be > 0',
    },

    // Dose Output Unit
    doseOutputUnit: {
      label: 'Output Dose Unit',
    },

    // Vasopressor Presets
    presets: {
      title: 'Vasopressor Presets:',
      tooltipConcentration: 'Concentration',
      tooltipRange: 'Range',
    },
  },

  // 3. BUTTONS
  buttons: {
    calculate: 'Calculate',
    reset: 'Reset',
  },

  // 4. RESULTS PANEL
  resultsPanel: {
    title: 'Conversion Results',

    // Conversion Details
    details: {
      dose: 'Dose',
      flowRate: 'Infusion Rate',
      patientWeight: 'Patient Weight',
      solutionConcentration: 'Solution Concentration',
    },
  },

  // 5. THERAPEUTIC WARNINGS (4 ranges)
  therapeuticWarnings: {
    veryLow: {
      title: 'Low Dose',
      message: 'Dose below standard therapeutic range (0.01-0.5 mcg/kg/min). Verify prescription.',
    },
    therapeutic: {
      title: 'Therapeutic Range',
      message: 'Dose within standard range for vasopressors (0.01-0.5 mcg/kg/min).',
    },
    high: {
      title: 'High Dose',
      message: 'Dose above standard range. Intensive hemodynamic monitoring required.',
    },
    veryHigh: {
      title: 'Very High Dose',
      message:
        'Dose >1 mcg/kg/min indicates refractory shock. Consider second vasopressor (vasopressin/epinephrine) and corticosteroids.',
    },
  },

  // 6. FORMULA SECTION
  formula: {
    title: 'Formula Used',

    // Dose to Rate Formulas
    doseToRate: {
      title: 'Dose → mL/h:',
      mcgKgMin: 'mL/h = (dose × weight × 60) / (concentration × 1000)',
      mcgMin: 'mL/h = (dose × 60) / (concentration × 1000)',
      mgH: 'mL/h = dose / concentration',
    },

    // Rate to Dose Formulas
    rateToDose: {
      title: 'mL/h → Dose:',
      mcgKgMin: 'dose = (mL/h × concentration × 1000) / (weight × 60)',
      mcgMin: 'dose = (mL/h × concentration × 1000) / 60',
      mgH: 'dose = mL/h × concentration',
    },
  },

  // 7. EMPTY STATE
  emptyState: 'Enter patient and solution parameters to calculate infusion rate',

  // 8. VASOPRESSOR PRESETS DATA (for tooltips)
  vasopressors: {
    noradrenaline: {
      name: 'Norad',
      fullName: 'Noradrenaline',
    },
    epinephrine: {
      name: 'Adrenal',
      fullName: 'Epinephrine',
    },
    dopamine: {
      name: 'Dopam',
      fullName: 'Dopamine',
    },
    dobutamine: {
      name: 'Dobut',
      fullName: 'Dobutamine',
    },
  },

  // 9. DOCUMENTATION SECTIONS (9 NEWS-STYLE SECTIONS)
  sections: {
    definition: {
      title: 'Clinical Definition',
      content: {
        mainDefinition: {
          title: 'Definition:',
          text: 'Infusion rate is the rate of drug administration via continuous intravenous infusion, typically expressed in mL/h. Conversion between pharmacological dose (mcg/kg/min, mg/h) and volumetric flow rate (mL/h) is essential for safe management of high-alert drugs such as vasopressors, inotropes, and sedatives in intensive care units.',
        },
        keyPrinciples: {
          title: 'Fundamental Principles:',
          items: [
            '<strong>Bidirectional Conversion:</strong> Dose ↔ mL/h allows clinical flexibility (dose titration vs pump setting)',
            '<strong>Weight Normalization:</strong> mcg/kg/min compensates for anthropometric differences between pediatric/adult patients',
            '<strong>Concentration Dependency:</strong> Same dose requires different rates with different concentrations (volume safety)',
            '<strong>Precision Medicine:</strong> Accurate calculation reduces medication errors (leading cause of adverse events in ICU)',
          ],
        },
        clinicalImportance: {
          title: 'Clinical Importance:',
          description:
            'Infusion rate calculation errors are among the most frequent causes of preventable adverse events in critical care. Accurate dose-flow conversion is critical for:',
          points: [
            '<strong>Vasopressors:</strong> Narrow therapeutic margin (0.01-1 mcg/kg/min), risk of severe hypotension or peripheral ischemia',
            '<strong>Sedatives/Analgesics:</strong> Precise titration to maintain target sedation (RASS -2/-3) avoiding oversedation',
            '<strong>Insulin:</strong> Tight glycemic control (80-180 mg/dL) requires frequent dose/flow adjustments',
            '<strong>ISMP High-Alert Drugs:</strong> Norepinephrine, epinephrine, insulin, heparin, concentrated potassium (double-check mandatory)',
          ],
        },
      },
    },
    physiology: {
      title: 'IV Infusion Pharmacokinetics',
      content: {
        steadyState: {
          title: 'Steady-State and Zero-Order Kinetics:',
          description:
            'Continuous IV infusion follows zero-order kinetics (constant rate R) while elimination follows first-order kinetics (constant k). The system reaches steady-state when infusion rate = elimination rate.',
          equations: [
            '<strong>Steady-State Concentration:</strong> C<sub>SS</sub> = R / (V<sub>D</sub> × k) = R / Cl<sub>T</sub>',
            '<strong>Time to Reach CSS:</strong> t<sub>90%</sub> = 3.32 × t<sub>½</sub>, t<sub>99%</sub> = 6.64 × t<sub>½</sub>',
            '<strong>Loading Dose:</strong> D<sub>L</sub> = V<sub>D</sub> × C<sub>SS</sub> = R / k (to reach CSS immediately)',
            '<strong>After Stopping Infusion:</strong> C<sub>P</sub> = (R / V<sub>D</sub> × k) × (1 - e<sup>-k×t<sub>s</sub></sup>) × e<sup>-k×(t-t<sub>s</sub>)</sup>',
          ],
        },
        pharmacokinetics: {
          title: 'Relevant Pharmacokinetic Parameters:',
          parameters: [
            '<strong>Volume of Distribution (V<sub>D</sub>):</strong> Norepinephrine V<sub>D</sub> 2.5 L/kg (hydrophilic, extracellular distribution), Propofol V<sub>D</sub> 60 L/kg (lipophilic, wide distribution)',
            '<strong>Total Clearance (Cl<sub>T</sub>):</strong> Morphine Cl 15-30 mL/min/kg (hepatic glucuronidation), Remifentanil Cl 40 mL/min/kg (plasma esterases, context-insensitive)',
            '<strong>Half-Life (t<sub>½</sub>):</strong> Norepinephrine t<sub>½</sub> 2-3 min (rapid on/off effect), Midazolam t<sub>½</sub> 1.5-2.5h (accumulation with prolonged infusions)',
            '<strong>Context-Sensitive Half-Time:</strong> Propofol CSHT 40min after 8h infusion (rapid awakening), Fentanyl CSHT 200-300min after 8h (delayed awakening)',
          ],
        },
        doseResponse: {
          title: 'Vasopressor Dose-Response Relationship:',
          relationships: [
            '<strong>Norepinephrine:</strong> Predominant α1 effect (systemic vasoconstriction). Dose 0.01-3 mcg/kg/min, target MAP >65 mmHg septic shock',
            '<strong>Epinephrine:</strong> Mixed α1+β1 effect (vasoconstriction + inotrope). Dose 0.01-1 mcg/kg/min, first-line anaphylactic shock',
            '<strong>Dopamine:</strong> Dose-dependent effect: 2-5 mcg/kg/min dopaminergic renal, 5-10 β1 inotrope, >10 α1 vasopressor. Prefer norepinephrine (less arrhythmogenic)',
            '<strong>Dobutamine:</strong> Selective β1 effect (pure inotrope). Dose 2.5-20 mcg/kg/min to increase cardiac output in cardiogenic shock',
          ],
        },
      },
    },
    measurement: {
      title: 'Measurement Technique and Setup',
      content: {
        equipmentRequired: {
          title: 'Required Devices:',
          items: [
            '<strong>Infusion Pump:</strong> Volumetric pump accuracy ±5% (Alaris, Braun Perfusor), syringe pump ±2% for flows <5 mL/h (neonatology)',
            '<strong>Infusion Set:</strong> Pump-specific tubing (microdrip 60 gtt/mL pediatrics, macrodrip 15-20 gtt/mL adults), dedicated line for high-alert drugs',
            '<strong>Venous Access:</strong> Peripheral 18-20G for non-irritating drugs, central line (CVC/PICC) mandatory for vasopressors/chemotherapeutics (extreme pH, osmolarity >600 mOsm/L)',
            '<strong>In-Line Filters:</strong> 0.2 micron filter for aqueous solutions, 1.2 micron for lipid emulsions (parenteral nutrition, propofol)',
          ],
        },
        preparationProtocol: {
          title: 'Infusion Preparation Protocol:',
          steps: [
            '<strong>Step 1 - Prescription:</strong> Verify complete prescription: drug, dose, unit, final concentration, route of administration, initial rate',
            '<strong>Step 2 - Double Check:</strong> Two independent operators calculate dose/rate. Mandatory for ISMP high-alert drugs (norepinephrine, insulin, heparin)',
            '<strong>Step 3 - Aseptic Preparation:</strong> Laminar flow hood for sterile drugs, no-touch technique, rubber stopper disinfection with 70% alcohol 15 sec',
            '<strong>Step 4 - Complete Labeling:</strong> Drug name, total dose, final concentration, volume, date/time of preparation, expiry, operator',
            '<strong>Step 5 - Pump Setup:</strong> Infusion set loading, air purge (5-10 mL), parameter setting (mL/h, VTBI volume to be infused, alarm limits)',
            '<strong>Step 6 - Patient Connection:</strong> Patient identity verification (wristband), luer-lock connection (prevent disconnections), infusion start',
            '<strong>Step 7 - Monitoring:</strong> Continuous vital signs (HR, BP, SpO2), hourly rate check, venous access patency verification',
          ],
        },
        safetyChecks: {
          title: 'Infusion Safety Checklist:',
          checks: [
            '<strong>5 Rights:</strong> Right Drug, Right Dose, Right Route, Right Patient, Right Time (+ right concentration for continuous infusions)',
            '<strong>Line Compatibility:</strong> Verify compatibility of co-infused drugs same line (calcium-phosphate precipitation, pH incompatibility)',
            '<strong>Backup Power:</strong> Pump with charged battery (minimum 2h autonomy), emergency plan for blackout (continuity of critical vasopressors)',
            '<strong>Alarm Limits:</strong> Set occlusion pressure alarms (pre-pump 300 mmHg, post-pump 150 mmHg), air bubble alarm, near-empty',
          ],
        },
      },
    },
    formula: {
      title: 'Formulas and Calculations',
      content: {
        basicConversions: {
          title: 'Basic Dose ↔ Flow Conversions:',
          formulas: [
            '<strong>mcg/kg/min → mL/h:</strong> mL/h = (Dose × Weight × 60) / (Concentration × 1000)',
            '<strong>mL/h → mcg/kg/min:</strong> Dose = (mL/h × Concentration × 1000) / (Weight × 60)',
            '<strong>mcg/min → mL/h:</strong> mL/h = (Dose × 60) / (Concentration × 1000)',
            '<strong>mg/h → mL/h:</strong> mL/h = Dose / Concentration (Example: insulin, morphine)',
          ],
        },
        practicalExample: {
          title: 'Practical Example - Norepinephrine:',
          scenario:
            'Patient 70 kg, septic shock, target 0.2 mcg/kg/min norepinephrine. Available: norepinephrine 4 mg/250 mL (0.016 mg/mL)',
          steps: [
            '<strong>Concentration:</strong> 4 mg / 250 mL = 0.016 mg/mL',
            '<strong>Dose in mcg/min:</strong> 0.2 mcg/kg/min × 70 kg = 14 mcg/min',
            '<strong>Dose in mg/min:</strong> 14 mcg/min ÷ 1000 = 0.014 mg/min',
            '<strong>Flow Rate mL/h:</strong> (0.2 × 70 × 60) / (0.016 × 1000) = 840 / 16 = <strong>52.5 mL/h</strong>',
            '<strong>Verification:</strong> 52.5 mL/h × 0.016 mg/mL = 0.84 mg/h = 14 mcg/min = 0.2 mcg/kg/min for 70 kg ✓',
          ],
        },
        concentrationCalculation: {
          title: 'Standard Concentration Calculation:',
          standards: [
            '<strong>Norepinephrine:</strong> 4 mg (1 vial) + NS 250 mL = 0.016 mg/mL (16 mcg/mL)',
            '<strong>Epinephrine:</strong> 4 mg (4 vials 1mg) + NS 250 mL = 0.016 mg/mL',
            '<strong>Dopamine:</strong> 400 mg (1 vial) + NS 250 mL = 1.6 mg/mL (1600 mcg/mL)',
            '<strong>Dobutamine:</strong> 250 mg (1 vial) + NS 250 mL = 1.0 mg/mL (1000 mcg/mL)',
            '<strong>Insulin:</strong> 50 IU + NS 50 mL = 1 IU/mL (DKA protocol infusion)',
          ],
        },
      },
    },
    interpretation: {
      title: 'Therapeutic Range Interpretation',
      content: {
        vasopressorRanges: {
          title: 'Vasopressor Dose Ranges (mcg/kg/min):',
          drugs: [
            '<strong>Norepinephrine:</strong> 0.01-0.3 normal, 0.3-1.0 severe shock, >1.0 refractory shock (consider additional vasopressin)',
            '<strong>Epinephrine:</strong> 0.01-0.5 anaphylactic/cardiogenic shock, >0.5 cardiac arrest/severe distributive shock',
            '<strong>Dopamine:</strong> 2-5 dopaminergic effect, 5-10 inotrope, 10-20 vasopressor (prefer norepinephrine, less tachycardia)',
            '<strong>Dobutamine:</strong> 2.5-5 mild inotrope, 5-10 moderate, 10-20 maximum (risk tachycardia >110 bpm, myocardial ischemia)',
            '<strong>Vasopressin:</strong> 0.01-0.04 IU/min (not weight-dependent) for refractory shock norepinephrine >0.5 mcg/kg/min',
          ],
        },
        flowRateInterpretation: {
          title: 'Flow Rate Interpretation:',
          guidelines: [
            '<strong>Low Flows (<5 mL/h):</strong> Use syringe pump (accuracy ±2%), risk of occlusion with small pediatric lines',
            '<strong>Standard Flows (5-100 mL/h):</strong> Standard volumetric pump, verify battery autonomy for prolonged infusions >8h',
            '<strong>High Flows (>100 mL/h):</strong> Consider higher concentration (reduce volume, risk fluid overload), adequate venous access caliber',
            '<strong>Sudden Variation:</strong> Dose increase >50% (e.g., 0.2→0.3 mcg/kg/min) = therapeutic escalation, assess hemodynamic response 5-10 min',
          ],
        },
        clinicalDecisions: {
          title: 'Clinical Decisions Based on Dose:',
          decisions: [
            '<strong>Increasing Norepinephrine:</strong> If >0.5 mcg/kg/min, consider: add-on vasopressin, echocardiography (systolic dysfunction?), corticosteroids (relative adrenal insufficiency)',
            '<strong>Decreasing Dose:</strong> Gradual weaning 0.05-0.1 mcg/kg/min every 15-30 min, MAP target >65 mmHg, avoid rebound hypotension',
            "<strong>Response Plateau:</strong> If MAP doesn't increase with dose escalation, reassess: volemia (SVC collapsibility >50%), contractility (EF <40%), vascular resistances (pure distributive shock)",
            '<strong>Vasopressor Switch:</strong> From dopamine to norepinephrine if HR >110 bpm, from norepinephrine to epinephrine if cardiogenic shock + hypotension',
          ],
        },
      },
    },
    applications: {
      title: 'Clinical Applications',
      content: {
        criticalCare: {
          title: 'Intensive Care - Shock Management:',
          applications: [
            '<strong>Septic Shock:</strong> Norepinephrine first-line 0.05-0.3 mcg/kg/min for MAP >65 mmHg. If refractory >0.5: add vasopressin 0.03 IU/min',
            '<strong>Cardiogenic Shock:</strong> Dobutamine 2.5-10 mcg/kg/min (EF <40%) + norepinephrine 0.05-0.2 to maintain perfusion. Monitor lactate, SvO2',
            '<strong>Anaphylactic Shock:</strong> Epinephrine IM 0.3-0.5 mg (first-line), if refractory IV infusion 0.05-0.2 mcg/kg/min, aggressive volume support',
            '<strong>ECMO/VAD:</strong> Gradually reduce vasopressors post-cannulation ECMO. Target MAP 60-70 mmHg (non-pulsatile perfusion), pump flow monitoring',
          ],
        },
        perioperative: {
          title: 'Perioperative Management:',
          scenarios: [
            '<strong>Total IV Anesthesia (TIVA):</strong> Propofol 4-12 mg/kg/h + remifentanil 0.1-0.5 mcg/kg/min. TCI (target-controlled infusion) for Cp target 3-5 mcg/mL',
            '<strong>Procedural Sedation:</strong> Propofol 25-75 mcg/kg/min, titrate RASS -2 (lightly sedated). Preserved spontaneous ventilation, capnography monitoring',
            '<strong>Post-Op Analgesia:</strong> Morphine IV infusion 0.5-1.5 mg/h + PCA bolus 1mg lockout 6min. Target NRS <4/10, monitor respiratory depression',
            '<strong>Post-Bypass Vasoplegia:</strong> Norepinephrine 0.1-0.5 mcg/kg/min + vasopressin 0.03 IU/min for SVR >800 dynes×s/cm<sup>5</sup>',
          ],
        },
        emergency: {
          title: 'Emergency Medicine - Critical Situations:',
          protocols: [
            '<strong>Cardiac Arrest ROSC:</strong> Epinephrine post-ROSC 0.1-0.5 mcg/kg/min for MAP >65 mmHg, avoid hypertension (target SBP 150-160 mmHg prevent re-arrest)',
            '<strong>Refractory Anaphylaxis:</strong> Epinephrine infusion 0.1 mcg/kg/min if 3+ IM boluses ineffective, glucagon 1-5 mg/h if beta-blocked',
            '<strong>Massive Hemorrhage:</strong> Norepinephrine 0.1-0.3 mcg/kg/min temporary during resuscitation, absolute priority bleeding source control',
            '<strong>Status Epilepticus:</strong> Midazolam 0.05-0.4 mg/kg/h, propofol 1-5 mg/kg/h, if refractory pentobarbital 1-3 mg/kg/h (burst-suppression EEG)',
          ],
        },
      },
    },
    alerts: {
      title: 'Safety Alerts',
      content: {
        highAlertDrugs: {
          title: 'ISMP High-Alert Drugs (Double-Check Required):',
          drugs: [
            '<strong>Vasopressors/Inotropes:</strong> Norepinephrine, epinephrine, dopamine, dobutamine, vasopressin. 10x error can cause death (acute ischemia, malignant arrhythmias)',
            '<strong>IV Insulin:</strong> Calculation error severe hypoglycemia <40 mg/dL (coma, death). Mandatory protocol, hourly glucose check',
            '<strong>IV Heparin:</strong> Dose error major bleeding (ICH, GI bleeding). aPTT monitoring target 50-70 sec, protamine antagonist available',
            '<strong>Opioid Infusion:</strong> Morphine, fentanyl, remifentanil. Respiratory depression, arrest. SpO2 monitoring, capnography, naloxone ready',
            '<strong>Concentrated Potassium:</strong> Max 40 mEq/L peripheral, 80 mEq/L central. Max rate 0.3 mEq/kg/h (fatal arrhythmias, cardiac arrest if rapid bolus)',
          ],
        },
        commonErrors: {
          title: 'Common Errors and Prevention:',
          errors: [
            '<strong>Unit Error (10x-100x):</strong> mcg vs mg, mL/h vs mL/min. PREVENTION: Always write complete units, double-check',
            '<strong>Concentration Error:</strong> Using stock concentration instead of final (e.g., 1 mg/mL vs 0.016 mg/mL norepinephrine). PREVENTION: Label final concentration clearly',
            '<strong>Weight Error:</strong> Using ideal vs actual weight obese, kg vs lb. PREVENTION: Weight in kg prominent on chart, automatic system conversion',
            '<strong>Pump Programming Error:</strong> Typing wrong rate, wrong unit (mL/h vs mL/min). PREVENTION: Smart pump drug libraries with soft/hard limits',
            '<strong>Free-Flow:</strong> Rapid uncontrolled infusion if pump not anti-free-flow. PREVENTION: Certified pumps, manual line clamp',
          ],
        },
        monitoringRequirements: {
          title: 'Mandatory Monitoring During Infusion:',
          requirements: [
            '<strong>Vital Signs:</strong> Continuous invasive BP (vasopressors >0.2), HR, SpO2, capnography (deep sedation), temperature',
            '<strong>Level of Consciousness:</strong> RASS/SAS every 2-4h sedation, GCS every 1h neurosurgical, pupils/reflexes every 4-8h',
            '<strong>Organ Function:</strong> Hourly urine output (oliguria <0.5 mL/kg/h), lactate every 4-6h (hypoperfusion), fluid balance every 8-24h',
            '<strong>Venous Site:</strong> Access inspection every 2-4h (redness, swelling, vasopressor extravasation). Dedicated high-alert drug line, no interruptions',
            '<strong>Pump Device:</strong> Rate/pressure check every 1h, replace infusion set every 96h standard/24h lipids, battery >20% always',
          ],
        },
      },
    },
    documentation: {
      title: 'Protocols and Documentation',
      content: {
        standardProtocols: {
          title: 'International Standard Protocols:',
          protocols: [
            '<strong>Surviving Sepsis Campaign 2021:</strong> Norepinephrine first-choice vasopressor septic shock (GRADE 1B). Target MAP ≥65 mmHg. Vasopressin 0.03 IU/min add-on if >0.25-0.5 norepinephrine',
            '<strong>ESICM Hemodynamic Monitoring:</strong> Echocardiography for preload responsiveness assessment before vasopressor escalation. SVC collapsibility >50% = hypovolemia',
            '<strong>ISMP Medication Safety:</strong> Smart pumps drug libraries with soft limits (alert) and hard limits (lock). Independent double-check mandatory high-alert drugs',
            '<strong>NICE Guidelines Sepsis:</strong> Start vasopressors if MAP <65 mmHg after 30 mL/kg crystalloids. Consider inotropes if low cardiac output (SvO2 <70%)',
            '<strong>AHA ACLS 2020:</strong> Post-ROSC epinephrine 0.1-0.5 mcg/kg/min, avoid hypertension (SBP target 90-140 mmHg), titrate for MAP >65 + adequate perfusion',
          ],
        },
        calculationTools: {
          title: 'Calculation Tools and Online Resources:',
          tools: [
            '<strong>MDCalc Infusion Rate:</strong> Validated calculator for norepinephrine, dopamine, dobutamine. Includes standard concentrations, therapeutic ranges',
            '<strong>GlobalRPh Drip Rate:</strong> Database 200+ infusion drugs, automatic conversions, IV compatibility',
            '<strong>Medscape Drug Calculator:</strong> Mobile app infusion calculation, drug interactions, renal/hepatic adjust',
            '<strong>ISMP List High-Alert Drugs:</strong> Updated list high-alert drugs acute care/ambulatory, specific error prevention strategies',
            '<strong>Lexicomp IV Compatibility:</strong> Compatibility database Y-site 2500+ drug combinations, pH/osmolarity solutions',
          ],
        },
        documentationRequirements: {
          title: 'Clinical Documentation Requirements:',
          items: [
            '<strong>Complete Prescription:</strong> Drug (generic + brand name), dose, unit, route, rate, final concentration, indication, prescriber physician',
            '<strong>Preparation Record:</strong> Date/time, operator, drug lot, expiry, aseptic technique, quality controls (clarity, particulate)',
            '<strong>Administration:</strong> Start/stop time, initial rate, subsequent modifications (dose/rate, time, clinical reason), venous access site',
            '<strong>Effect Monitoring:</strong> Vital signs (BP, HR, SpO2), clinical response (MAP, urine output, lactate), adverse events (hypotension, tachycardia, arrhythmias)',
            '<strong>Patient Transfers:</strong> Structured handover (drug, current dose, infusion duration, therapeutic target, next reassessment)',
          ],
        },
      },
    },
    references: {
      title: 'Scientific References',
      content: {
        guidelines: {
          title: 'International Guidelines:',
          items: [
            '<strong>Surviving Sepsis Campaign (2021):</strong> "International Guidelines for Management of Sepsis and Septic Shock". Intensive Care Med. PMID: 34599691. Evidence-based recommendations septic shock, vasopressors, monitoring',
            '<strong>ESICM Consensus (2014):</strong> "Hemodynamic Monitoring in the Critically Ill". Intensive Care Med. PMID: 25413799. Indications invasive monitoring, hemodynamic targets',
            '<strong>ISMP (2018):</strong> "ISMP List of High-Alert Medications in Acute Care Settings". Standard prevention errors high-risk drugs',
            '<strong>NICE NG51 (2016):</strong> "Sepsis: recognition, diagnosis and early management". UK guidelines sepsis management, resuscitation algorithm',
            '<strong>AHA ACLS (2020):</strong> "Advanced Cardiovascular Life Support Guidelines". Post-ROSC protocols, cardiac arrest vasopressors',
            '<strong>SCCM Guidelines (2018):</strong> "Clinical Practice Guidelines for Sustained Neuromuscular Blockade". ICU sedation, analgesia, continuous infusion management',
          ],
        },
        pharmacokinetics: {
          title: 'IV Infusion Pharmacokinetics:',
          articles: [
            '<strong>Loftsson T (2015):</strong> "Essential Pharmacokinetics - Basic Concepts of Pharmacokinetics". ScienceDirect. Steady-state equations, loading dose, context-sensitive half-time infusions',
            '<strong>Holford NHG (1986):</strong> "Clinical Pharmacokinetics of Ethanol". Clin Pharmacokinet. PMID: 3542336. Compartmental models continuous infusion vs bolus',
            '<strong>Shafer SL (1991):</strong> "Pharmacokinetics of Fentanyl Administered by Computer-Controlled Infusion Pump". Anesthesiology. PMID: 1910784. Context-sensitive half-time opioids',
            '<strong>Bailey JM (2000):</strong> "Context-Sensitive Half-Times". Anesth Analg. PMID: 10910093. Impact of infusion duration on drug effect offset',
            '<strong>Minto CF (1997):</strong> "Pharmacokinetics and Pharmacodynamics of Remifentanil". Anesthesiology. PMID: 9024595. Plasma esterase metabolism, context-insensitive infusion',
          ],
        },
        clinicalStudies: {
          title: 'Relevant Clinical Studies:',
          studies: [
            '<strong>De Backer D (2010):</strong> "Comparison of Dopamine and Norepinephrine in Septic Shock". N Engl J Med. PMID: 20200382. Randomized trial 1679 patients, norepinephrine superior efficacy/safety vs dopamine',
            '<strong>Gordon AC (2016):</strong> "VANISH Trial - Vasopressin versus Norepinephrine in Septic Shock". JAMA. PMID: 27533159. 421 patients, early add-on vasopressin reduces renal dysfunction',
            '<strong>Bellomo R (2018):</strong> "Norepinephrine in Septic Shock: Dose-Response and Outcomes". Intensive Care Med. Observational study 2849 patients, dose >0.5 associated with 48% mortality',
            '<strong>Russell JA (2008):</strong> "Vasopressin versus Norepinephrine in Septic Shock (VASST)". N Engl J Med. PMID: 18184957. Vasopressin reduces mortality in less severe septic shock subset',
            '<strong>Levy B (2018):</strong> "Epinephrine versus Norepinephrine for Cardiogenic Shock After AMI". J Am Coll Cardiol. PMID: 30081948. 57 STEMI patients, epinephrine improves cardiac index but increases lactate',
          ],
        },
      },
    },
  },
};
