/**
 * @file en-US/sofa.ts
 * @description English translations for SOFA Score Calculator (COMPLETE - All sections)
 * @author Vasile Chifeac
 * @created 2025-12-14
 * @completed 2025-12-14
 *
 * @references
 * - Vincent JL et al. (1996) "The SOFA score to describe organ dysfunction" ICM. PMID: 8863252
 * - Singer M et al. (2016) "Sepsis-3 Consensus Definitions" JAMA. PMID: 26903338
 */

export default {
  // === PHASE 1: BREADCRUMB AND TITLE ===
  breadcrumbs: {
    home: 'Home',
    sofaScore: 'SOFA Score',
  },

  title: 'SOFA Score Calculator',
  subtitle:
    'Sequential Organ Failure Assessment - Multi-organ dysfunction evaluation in intensive care',

  // === PHASE 2: BANNER + FORM ===
  banner: {
    title: 'SOFA Score:',
    description:
      'Prognostic system to assess severity of organ dysfunction in critically ill patients. 6 organ systems, score 0-4 each, total 0-24 points.',
  },

  form: {
    title: 'Organ Parameters',

    // Respiration
    respiration: {
      label: 'Respiration (PaO2/FiO2)',
      options: {
        ge400: 'greater than or equal to 400',
        lt400: 'less than 400',
        lt300: 'less than 300',
        lt200: 'less than 200 with respiratory support',
        lt100: 'less than 100 with respiratory support',
      },
    },

    // Coagulation
    coagulation: {
      label: 'Coagulation (Platelets x10³/microL)',
      options: {
        ge150: 'greater than or equal to 150',
        lt150: 'less than 150',
        lt100: 'less than 100',
        lt50: 'less than 50',
        lt20: 'less than 20',
      },
    },

    // Liver
    liver: {
      label: 'Liver (Bilirubin mg/dL)',
      options: {
        lt1_2: 'less than 1.2',
        range1_2_1_9: '1.2-1.9',
        range2_0_5_9: '2.0-5.9',
        range6_0_11_9: '6.0-11.9',
        ge12: 'greater than or equal to 12.0',
      },
    },

    // Cardiovascular
    cardiovascular: {
      label: 'Cardiovascular (MAP/Vasopressors)',
      options: {
        mapGe70: 'MAP greater than or equal to 70 mmHg',
        mapLt70: 'MAP less than 70 mmHg',
        dopa5Dobut: 'Dopamine less than or equal to 5 or Dobutamine any dose',
        dopa5EpiNorepi01:
          'Dopamine greater than 5 OR Epinephrine less than or equal to 0.1 OR Norepinephrine less than or equal to 0.1',
        dopa15EpiNorepi01:
          'Dopamine greater than 15 OR Epinephrine greater than 0.1 OR Norepinephrine greater than 0.1',
      },
    },

    // Central Nervous System
    cns: {
      label: 'Central Nervous System (GCS)',
      options: {
        gcs15: 'GCS 15',
        gcs13_14: 'GCS 13-14',
        gcs10_12: 'GCS 10-12',
        gcs6_9: 'GCS 6-9',
        gcsLt6: 'GCS less than 6',
      },
    },

    // Renal
    renal: {
      label: 'Renal (Creatinine mg/dL or Urine Output mL/day)',
      options: {
        lt1_2: 'less than 1.2',
        range1_2_1_9: '1.2-1.9',
        range2_0_3_4: '2.0-3.4',
        range3_5_4_9: '3.5-4.9 or less than 500 mL/day',
        ge5: 'greater than or equal to 5.0 or less than 200 mL/day',
      },
    },

    resetButton: 'Reset',
  },

  // === PHASE 3: RESULTS PANEL ===
  results: {
    title: 'SOFA Score Result',
    totalScoreLabel: 'Total Score',
    totalScoreRange: '(0-24)',

    mortalityRisk: {
      veryLow: 'Less than 10% Mortality',
      low: '15-20% Mortality',
      moderate: '40-50% Mortality',
      high: 'Greater than 80% Mortality',
      veryHigh: 'Greater than 90% Mortality',
    },

    interpretation: {
      title: 'Clinical Interpretation:',
      sofaPrefix: 'SOFA',
      mortalityRiskText: 'in-hospital mortality risk.',
      serialMonitoring:
        'Serial monitoring (every 24-48h) to assess trend. DeltaScore +2 points indicates significant deterioration.',
    },
  },

  // === PHASE 4: EXPANDABLE SECTIONS (1-3) ===
  sections: {
    // Section 1: Definition
    definition: {
      title: 'Definition and Clinical Significance',

      // Historical Origin
      historicalOriginTitle: 'Historical Origin',
      historicalOriginParagraph1:
        'The <strong>SOFA (Sequential Organ Failure Assessment) Score</strong> was developed in <strong>1996</strong> by <strong>Jean-Louis Vincent and the Sepsis-related Organ Failure Assessment Working Group</strong> at the European Society of Intensive Care Medicine consensus conference.',
      historicalOriginParagraph2:
        '<strong>Original objective:</strong> Create a simple, objective system to describe and quantify the degree of organ dysfunction over time in critically ill patients, particularly those with sepsis.',

      keyCharacteristicsTitle: '<strong>Key characteristics:</strong>',
      keyCharacteristic1: '✅ Assesses <strong>6 major organ systems</strong> independently',
      keyCharacteristic2:
        '✅ Each organ scored <strong>0-4 points</strong> based on severity of dysfunction',
      keyCharacteristic3: '✅ Total score <strong>0-24 points</strong> (higher = worse prognosis)',
      keyCharacteristic4:
        '✅ Can be calculated <strong>repeatedly</strong> to track trajectory (delta SOFA)',
      keyCharacteristic5:
        '✅ Validated predictor of <strong>ICU mortality</strong> (AUROC 0.74-0.86)',

      // Clinical Applications
      clinicalApplicationsTitle: 'Clinical Applications',
      whenToUseTitle: '<strong>When to use:</strong>',
      whenToUseItem1:
        '📊 <strong>ICU admission triage:</strong> Baseline SOFA score for severity stratification',
      whenToUseItem2:
        '📈 <strong>Serial monitoring:</strong> Daily SOFA scores to detect deterioration/improvement',
      whenToUseItem3:
        '🦠 <strong>Sepsis diagnosis (Sepsis-3):</strong> SOFA ≥2 points = organ dysfunction criterion',
      whenToUseItem4:
        '🔬 <strong>Clinical trials:</strong> Standardized severity measure and outcome predictor',
      whenToUseItem5:
        '💊 <strong>Treatment decisions:</strong> Guide escalation/de-escalation of ICU care',

      whenNotToUseTitle: '<strong>When NOT to use:</strong>',
      whenNotToUseItem1:
        '❌ <strong>Non-ICU patients:</strong> Not validated for ward/ED populations',
      whenNotToUseItem2:
        '❌ <strong>Pediatrics:</strong> Use Pediatric SOFA (pSOFA) or PELOD score instead',
      whenNotToUseItem3:
        '❌ <strong>Single time-point prognosis:</strong> Delta SOFA more predictive than baseline alone',
      whenNotToUseItem4:
        '❌ <strong>Sole treatment guide:</strong> Must integrate with clinical judgment',

      limitationsTitle: '<strong>Limitations:</strong>',
      limitationItem1:
        '⚠️ Does NOT capture <strong>all organ systems</strong> (e.g., GI, immunologic, endocrine)',
      limitationItem2:
        '⚠️ Requires <strong>accurate laboratory data</strong> (may be delayed or unavailable)',
      limitationItem3:
        '⚠️ Confounded by <strong>chronic organ dysfunction</strong> (use baseline SOFA if known)',
      limitationItem4:
        '⚠️ GCS component unreliable in <strong>sedated patients</strong> (consider sedation-free assessment)',
      limitationItem5:
        '⚠️ <strong>Not a treatment target:</strong> Improving care ≠ improving SOFA directly',
    },

    // Section 2: Organ Dysfunction
    organDysfunction: {
      title: 'Organ Dysfunction Physiology',

      pathophysiologicalMechanismsTitle: 'Pathophysiological Mechanisms',

      // Respiration
      respirationTitle: '1️⃣ Respiration (PaO₂/FiO₂ ratio):',
      respirationItem1: '<strong>Normal P/F ratio:</strong> ≥400 mmHg (intact gas exchange)',
      respirationItem2:
        '<strong>Hypoxemia mechanisms:</strong> V/Q mismatch, shunt, diffusion impairment, hypoventilation',
      respirationItem3:
        '<strong>ARDS pathophysiology:</strong> Alveolar-capillary membrane damage → pulmonary edema → surfactant dysfunction',
      respirationItem4:
        '<strong>Berlin ARDS criteria:</strong> Mild P/F 200-300, Moderate 100-200, Severe &lt; 100',
      respirationItem5:
        '<strong>Critical threshold:</strong> P/F &lt;100 with respiratory support = SOFA 4 (profound ARDS, mortality >40%)',

      // Coagulation
      coagulationTitle: '2️⃣ Coagulation (Platelets):',
      coagulationItem1: '<strong>Normal platelets:</strong> 150-400 ×10³/μL',
      coagulationItem2:
        '<strong>Thrombocytopenia causes in ICU:</strong> Consumptive coagulopathy (DIC), bone marrow suppression, dilutional, immune-mediated (HIT)',
      coagulationItem3:
        '<strong>DIC mechanisms:</strong> Systemic activation coagulation cascade → microthrombi → consumption clotting factors/platelets → bleeding + thrombosis',
      coagulationItem4:
        '<strong>Bleeding risk:</strong> Platelets &lt; 50K significant spontaneous bleeding risk, &lt;20K critical (SOFA 4)',
      coagulationItem5:
        '<strong>Sepsis-associated:</strong> Thrombocytopenia in 30-50% septic patients, marker of severity',

      // Liver
      liverTitle: '3️⃣ Liver (Bilirubin):',
      liverItem1: '<strong>Normal bilirubin:</strong> &lt;1.2 mg/dL',
      liverItem2:
        '<strong>Hyperbilirubinemia mechanisms:</strong> Hypoxic hepatitis, cholestasis, impaired conjugation/excretion',
      liverItem3:
        '<strong>Shock liver:</strong> Acute ischemic injury (Zone 3 centrilobular necrosis) → transaminase ↑↑ (>1000 IU/L) + bilirubin ↑',
      liverItem4:
        '<strong>Cholestasis:</strong> Sepsis-induced impaired bile flow → conjugated hyperbilirubinemia',
      liverItem5:
        '<strong>Hepatic failure:</strong> Bilirubin ≥12 mg/dL (SOFA 4) with coagulopathy/encephalopathy = poor prognosis',

      // Cardiovascular
      cardiovascularTitle: '4️⃣ Cardiovascular (MAP/Vasopressors):',
      cardiovascularItem1: '<strong>Normal MAP:</strong> ≥70 mmHg (adequate tissue perfusion)',
      cardiovascularItem2:
        '<strong>Shock types:</strong> Distributive (septic), cardiogenic, hypovolemic, obstructive',
      cardiovascularItem3:
        '<strong>Septic shock pathophysiology:</strong> Vasodilation (NO, cytokines) + myocardial depression + capillary leak → hypotension + ↓tissue O₂ delivery',
      cardiovascularItem4:
        '<strong>Vasopressor ladder:</strong> Norepinephrine 1st-line → +Vasopressin → +Epinephrine → High-dose (SOFA 4 = refractory shock)',
      cardiovascularItem5:
        '<strong>Critical threshold:</strong> MAP &lt;65 mmHg or high-dose vasopressors = end-organ hypoperfusion risk',

      // CNS
      cnsTitle: '5️⃣ Central Nervous System (GCS):',
      cnsItem1: '<strong>Normal consciousness:</strong> GCS 15 (fully awake, oriented)',
      cnsItem2:
        '<strong>Encephalopathy mechanisms:</strong> Hypoxia, hypoperfusion, uremic toxins, hepatic encephalopathy, sepsis-associated delirium',
      cnsItem3:
        '<strong>Sedation confounding:</strong> GCS unreliable in sedated patients (consider sedation-free assessment or exclude from SOFA)',
      cnsItem4:
        '<strong>Coma (GCS &lt;6):</strong> SOFA 4 = profound CNS dysfunction, high mortality unless reversible cause',

      // Renal
      renalTitle: '6️⃣ Renal (Creatinine/Urine Output):',
      renalItem1:
        '<strong>Normal creatinine:</strong> 0.6-1.2 mg/dL (varies by muscle mass, age, sex)',
      renalItem2:
        '<strong>AKI mechanisms:</strong> Pre-renal (hypoperfusion), intrinsic renal (ATN, GN), post-renal (obstruction)',
      renalItem3:
        '<strong>Septic AKI:</strong> Hemodynamic (hypotension) + inflammatory (cytokine-mediated tubular injury) + microvascular dysfunction',
      renalItem4:
        '<strong>KDIGO AKI stages:</strong> Stage 1 (Cr 1.5-1.9× baseline), Stage 2 (2.0-2.9×), Stage 3 (≥3× or ≥4 mg/dL or RRT)',
      renalItem5:
        '<strong>Oliguria/anuria:</strong> &lt;500 mL/day (SOFA 3), &lt;200 mL/day (SOFA 4) = severe AKI, likely RRT need',
    },

    // Section 3: How to Calculate
    howToCalculate: {
      title: 'How to Calculate SOFA Score',

      calculationStepsTitle: 'Calculation Steps',

      // Step 1
      step1Title: '<strong>Step 1: Collect Worst Values (24h window)</strong>',
      step1Item1: '📊 Use <strong>worst value</strong> for each parameter in the past 24 hours',
      step1Item2: '⏰ For serial SOFA: same time each day (e.g., 08:00 AM rounds)',
      step1Item3: '🔍 Ensure recent lab data: PaO₂, FiO₂, platelets, bilirubin, creatinine',
      step1Item4:
        '💊 Document MAP and any vasopressor doses (norepinephrine, dopamine, epinephrine)',
      step1Item5: '🧠 Assess GCS without sedation if possible (or note sedation influence)',
      step1Item6: '💧 Calculate 24h urine output (total mL/24h)',

      // Step 2
      step2Title: '<strong>Step 2: Score Each Organ (0-4 points)</strong>',
      step2Item1: '<strong>Respiration:</strong> Calculate PaO₂/FiO₂ ratio → Score 0-4',
      step2Item2: '<strong>Coagulation:</strong> Platelets count ×10³/μL → Score 0-4',
      step2Item3: '<strong>Liver:</strong> Bilirubin mg/dL → Score 0-4',
      step2Item4: '<strong>Cardiovascular:</strong> MAP and/or vasopressor doses → Score 0-4',
      step2Item5: '<strong>CNS:</strong> Best GCS in 24h → Score 0-4',
      step2Item6:
        '<strong>Renal:</strong> Creatinine mg/dL OR urine output → Score 0-4 (use worse)',

      // Step 3
      step3Title: '<strong>Step 3: Sum All 6 Organ Scores</strong>',
      step3Item1:
        '🧮 <strong>Total SOFA Score</strong> = Respiration + Coagulation + Liver + Cardiovascular + CNS + Renal',
      step3Item2: '📈 <strong>Range:</strong> 0-24 points (minimum 0, maximum 24)',
      step3Item3:
        '📝 <strong>Documentation:</strong> Record individual organ scores + total (e.g., "SOFA 12: R3 C2 L1 CV4 CNS1 Re1")',

      // Step 4
      step4Title: '<strong>Step 4: Calculate Delta SOFA (if serial measurements)</strong>',
      step4Item1: 'Δ<strong>SOFA</strong> = SOFA(current) - SOFA(baseline or previous)',
      step4Item2:
        '📊 <strong>Interpretation:</strong> ΔSOFA ≥+2 points = significant deterioration (10% ↑ mortality per point)',
      step4Item3:
        '📉 <strong>Improvement:</strong> ΔSOFA negative = organ function recovery (favorable prognosis)',
      step4Item4:
        '🦠 <strong>Sepsis-3 definition:</strong> Infection + ΔSOFA ≥2 = Sepsis (organ dysfunction)',

      // Special Considerations
      specialConsiderationsTitle: 'Special Considerations',

      respirationConsiderationsTitle: '🫁 Respiration (PaO₂/FiO₂):',
      respirationConsiderationsItem1:
        '<strong>Calculate P/F ratio:</strong> PaO₂ (mmHg) / FiO₂ (decimal, e.g., 0.40 for 40% oxygen)',
      respirationConsiderationsItem2:
        '<strong>Example:</strong> PaO₂ 80 mmHg on FiO₂ 0.50 → P/F = 80/0.50 = 160 → SOFA 3',
      respirationConsiderationsItem3:
        '<strong>Respiratory support:</strong> Score 3-4 require ventilatory support (mechanical ventilation, CPAP, high-flow)',
      respirationConsiderationsItem4:
        '<strong>If no ABG:</strong> Use SpO₂/FiO₂ ratio as surrogate (less accurate)',

      cardiovascularConsiderationsTitle: '💊 Cardiovascular (Vasopressors):',
      cardiovascularConsiderationsItem1:
        '<strong>Doses in μg/kg/min:</strong> Dopamine, dobutamine, epinephrine, norepinephrine',
      cardiovascularConsiderationsItem2:
        '<strong>Duration:</strong> Administered for ≥1 hour to count',
      cardiovascularConsiderationsItem3:
        '<strong>Combination:</strong> If multiple vasopressors → use highest scoring agent',
      cardiovascularConsiderationsItem4:
        '<strong>MAP without vasopressors:</strong> If MAP &lt;70 mmHg without drugs → SOFA 1',

      cnsConsiderationsTitle: '🧠 CNS (Glasgow Coma Scale):',
      cnsConsiderationsItem1:
        '<strong>Best GCS in 24h:</strong> Use highest GCS observed (avoid sedation periods if possible)',
      cnsConsiderationsItem2:
        '<strong>Sedation influence:</strong> If heavily sedated entire 24h → consider excluding CNS from SOFA or note limitation',
      cnsConsiderationsItem3:
        '<strong>Intubated patients:</strong> Cannot assess verbal component → use E + M only (max GCS 10)',

      renalConsiderationsTitle: '💧 Renal (Creatinine OR Urine Output):',
      renalConsiderationsItem1:
        '<strong>Use WORSE of two:</strong> Creatinine mg/dL OR urine output mL/day',
      renalConsiderationsItem2:
        '<strong>Baseline creatinine:</strong> If chronic kidney disease known → adjust interpretation (use ΔSOFA renal)',
      renalConsiderationsItem3:
        '<strong>RRT patients:</strong> On dialysis → automatically SOFA 4 for renal',
    },

    // === PHASE 5: SECTIONS 4-6 ===
    // Section 4: Formula and Scoring
    formulaScoring: {
      title: 'Formula and Scoring Tables',

      formulaTitle: 'SOFA Score Formula',
      formula: 'SOFA = Respiration + Coagulation + Liver + Cardiovascular + CNS + Renal',
      formulaSubtitle: 'Each organ scored 0-4 points → Total range 0-24 points',

      detailedTablesTitle: 'Detailed Scoring Tables',

      // Table Headers (common)
      tableHeaderScore: 'Score',
      tableHeaderInterpretation: 'Clinical Interpretation',

      // Respiration Table
      respirationTableTitle: '🫁 Respiration (PaO₂/FiO₂ mmHg):',
      respirationTableHeader: 'PaO₂/FiO₂ Ratio',
      respiration0: '≥400',
      respiration0Interp: 'Normal oxygenation',
      respiration1: '&lt;400',
      respiration1Interp: 'Mild hypoxemia',
      respiration2: '&lt;300',
      respiration2Interp: 'Moderate hypoxemia (Mild ARDS)',
      respiration3: '&lt;200 + ventilation',
      respiration3Interp: 'Severe hypoxemia (Moderate ARDS)',
      respiration4: '&lt;100 + ventilation',
      respiration4Interp: 'Profound ARDS (Severe)',

      // Coagulation Table
      coagulationTableTitle: '🩸 Coagulation (Platelets ×10³/μL):',
      coagulationTableHeader: 'Platelet Count',
      coagulation0: '≥150',
      coagulation0Interp: 'Normal coagulation',
      coagulation1: '&lt;150',
      coagulation1Interp: 'Mild thrombocytopenia',
      coagulation2: '&lt;100',
      coagulation2Interp: 'Moderate thrombocytopenia',
      coagulation3: '&lt;50',
      coagulation3Interp: 'Severe (bleeding risk)',
      coagulation4: '&lt;20',
      coagulation4Interp: 'Critical (spontaneous bleeding)',

      // Liver Table
      liverTableTitle: '🟡 Liver (Bilirubin mg/dL):',
      liverTableHeader: 'Bilirubin',
      liver0: '&lt;1.2',
      liver0Interp: 'Normal liver function',
      liver1: '1.2-1.9',
      liver1Interp: 'Mild hyperbilirubinemia',
      liver2: '2.0-5.9',
      liver2Interp: 'Moderate jaundice',
      liver3: '6.0-11.9',
      liver3Interp: 'Severe hepatic dysfunction',
      liver4: '≥12.0',
      liver4Interp: 'Hepatic failure',

      // Cardiovascular Table
      cardiovascularTableTitle: '❤️ Cardiovascular (MAP/Vasopressors):',
      cardiovascularTableHeader: 'MAP or Vasopressor Doses',
      cardiovascular0: 'MAP ≥70 mmHg',
      cardiovascular1: 'MAP &lt;70 mmHg',
      cardiovascular2: 'Dopamine ≤5 OR Dobutamine (any)',
      cardiovascular3: 'Dopamine >5 OR Epi ≤0.1 OR Norepi ≤0.1 (μg/kg/min)',
      cardiovascular4: 'Dopamine >15 OR Epi >0.1 OR Norepi >0.1 (μg/kg/min)',

      // CNS Table
      cnsTableTitle: '🧠 CNS (Glasgow Coma Scale):',
      cnsTableHeader: 'GCS',
      cns0: '15',
      cns0Interp: 'Fully awake and oriented',
      cns1: '13-14',
      cns1Interp: 'Mild altered mental status',
      cns2: '10-12',
      cns2Interp: 'Moderate confusion/drowsiness',
      cns3: '6-9',
      cns3Interp: 'Severe coma (localizes pain)',
      cns4: '&lt;6',
      cns4Interp: 'Deep coma (no response)',

      // Renal Table
      renalTableTitle: '💧 Renal (Creatinine mg/dL OR Urine Output):',
      renalTableHeader: 'Creatinine OR Urine Output',
      renal0: '&lt;1.2 mg/dL',
      renal1: '1.2-1.9 mg/dL',
      renal2: '2.0-3.4 mg/dL',
      renal3: '3.5-4.9 mg/dL OR &lt;500 mL/day',
      renal4: '≥5.0 mg/dL OR &lt;200 mL/day OR RRT',

      // Delta SOFA Section
      deltaSofaTitle: 'Delta SOFA (ΔSOFA) Calculation',
      deltaSofaFormula: 'ΔSOFA = SOFA(current) - SOFA(baseline)',
      deltaSofaItem1:
        '<strong>Baseline:</strong> First SOFA score on ICU admission OR pre-illness baseline if known',
      deltaSofaItem2:
        '<strong>ΔSOFA ≥+2:</strong> Sepsis criterion (Sepsis-3 definition), 10% increased mortality per point',
      deltaSofaItem3:
        '<strong>ΔSOFA negative:</strong> Improving organ function (favorable trajectory)',
      deltaSofaItem4:
        '<strong>ΔSOFA +3-4:</strong> Significant clinical deterioration, reassess treatment',
    },

    // Section 5: Clinical Interpretation
    clinicalInterpretation: {
      title: 'Clinical Interpretation and Mortality Prediction',

      mortalityRiskTitle: 'Mortality Risk Stratification',

      // Risk Level 1 (0-6)
      riskLevel1Chip: 'SOFA 0-6: Low Risk',
      riskLevel1Mortality: '<strong>Mortality risk:</strong> &lt;10-15% in-hospital mortality',
      riskLevel1Status:
        '<strong>Clinical status:</strong> Mild organ dysfunction or single organ involvement',
      riskLevel1Course:
        '<strong>ICU course:</strong> Typically shorter ICU stay, good recovery potential',
      riskLevel1Management:
        '<strong>Management:</strong> Standard ICU care, monitor for deterioration',

      // Risk Level 2 (7-9)
      riskLevel2Chip: 'SOFA 7-9: Moderate Risk',
      riskLevel2Mortality: '<strong>Mortality risk:</strong> 15-20% in-hospital mortality',
      riskLevel2Status: '<strong>Clinical status:</strong> Moderate multi-organ dysfunction',
      riskLevel2Course:
        '<strong>ICU course:</strong> Prolonged ICU stay likely, requires close monitoring',
      riskLevel2Management:
        '<strong>Management:</strong> Aggressive organ support, daily SOFA trending',

      // Risk Level 3 (10-12)
      riskLevel3Chip: 'SOFA 10-12: High Risk',
      riskLevel3Mortality: '<strong>Mortality risk:</strong> 40-50% in-hospital mortality',
      riskLevel3Status: '<strong>Clinical status:</strong> Severe multi-organ failure',
      riskLevel3Course: '<strong>ICU course:</strong> Very prolonged ICU stay, complex management',
      riskLevel3Management:
        '<strong>Management:</strong> Maximum organ support, consider advanced therapies (ECMO, RRT, etc.)',

      // Risk Level 4 (13-14)
      riskLevel4Chip: 'SOFA 13-14: Very High Risk',
      riskLevel4Mortality: '<strong>Mortality risk:</strong> 50-95% in-hospital mortality',
      riskLevel4Status: '<strong>Clinical status:</strong> Profound multiple organ failure',
      riskLevel4Course: '<strong>ICU course:</strong> Salvage therapy, extremely poor prognosis',
      riskLevel4Management:
        '<strong>Management:</strong> Maximum ICU resources, family discussions about goals of care',

      // Risk Level 5 (\u226515)
      riskLevel5Chip: 'SOFA \u226515: Catastrophic',
      riskLevel5Mortality: '<strong>Mortality risk:</strong> >90% in-hospital mortality',
      riskLevel5Status:
        '<strong>Clinical status:</strong> Multi-organ failure with extremely poor prognosis',
      riskLevel5Course: '<strong>ICU course:</strong> Survival extremely rare',
      riskLevel5Management:
        '<strong>Management:</strong> Palliative care discussions appropriate, withdrawal of care may be considered',

      // Delta SOFA Interpretation
      deltaSofaInterpretationTitle: 'Delta SOFA (\u0394SOFA) Interpretation',
      deltaSofaItem1:
        '<strong>\u0394SOFA +1 point:</strong> ~10% increased mortality risk per point increase',
      deltaSofaItem2:
        '<strong>\u0394SOFA \u2265+2 points (within 48h):</strong> Sepsis-3 criterion for organ dysfunction. Significant clinical deterioration. Triggers sepsis bundle protocols (antibiotics, fluid resuscitation, source control).',
      deltaSofaItem3:
        '<strong>\u0394SOFA +3-4 points:</strong> Severe deterioration, reassess diagnosis and treatment. Consider missed infection source, resistant organisms, complications.',
      deltaSofaItem4:
        '<strong>\u0394SOFA negative (decreasing):</strong> Improving organ function, favorable trajectory. Treatment effective, consider de-escalation when appropriate.',
      deltaSofaItem5:
        '<strong>\u0394SOFA plateau (unchanged):</strong> Static course, neither improving nor worsening. May indicate chronic organ dysfunction or treatment equilibrium.',

      // Sepsis-3 Integration
      sepsis3Title: 'Sepsis-3 Definition Integration',
      sepsis3Definition:
        '<strong>Sepsis (Sepsis-3):</strong> Life-threatening organ dysfunction caused by dysregulated host response to infection',
      sepsis3Criteria:
        '<strong>Criteria:</strong> Suspected or documented infection + <strong>\u0394SOFA \u22652 points</strong>',
      sepsis3Baseline:
        '<strong>Baseline SOFA:</strong> Assume 0 if no pre-existing organ dysfunction known',
      sepsis3Shock:
        '<strong>Septic Shock:</strong> Sepsis + vasopressor requirement (MAP \u226565 mmHg) + lactate >2 mmol/L despite adequate fluid resuscitation',
      sepsis3Mortality:
        '<strong>Mortality:</strong> Sepsis ~10%, Septic Shock ~40% in-hospital mortality',

      // Clinical Pearl
      clinicalPearlTitle: 'Clinical Pearl:',
      clinicalPearlText:
        'Serial SOFA trending (daily) is MORE predictive than single baseline SOFA. Worsening \u0394SOFA indicates treatment failure or complications. Improving \u0394SOFA validates treatment efficacy.',
    },

    // Section 6: Clinical Applications
    clinicalApplications: {
      title: 'Clinical Applications of the SOFA Score',

      primaryUsesTitle: 'Primary Clinical Uses',

      // 1. Sepsis Diagnosis
      use1Title: '1️⃣ Sepsis Diagnosis and Severity Stratification (Sepsis-3)',
      use1Item1:
        '<strong>Screening:</strong> qSOFA (quick SOFA) ≥2 → triggers full SOFA calculation',
      use1Item2: '<strong>Diagnosis:</strong> Infection + ΔSOFA ≥2 = Sepsis (organ dysfunction)',
      use1Item3:
        '<strong>Severity:</strong> Baseline SOFA 0-6 (less severe), 7-12 (moderate), ≥13 (severe)',
      use1Item4: '<strong>Septic shock:</strong> Sepsis + vasopressors + lactate >2 mmol/L',
      use1Item5:
        '<strong>Triggers:</strong> SOFA ≥2 → initiate sepsis bundles (1-hour bundle: blood cultures, antibiotics, fluid resuscitation)',

      // 2. ICU Triage
      use2Title: '2️⃣ ICU Admission Triage and Bed Allocation',
      use2Item1:
        '<strong>Baseline SOFA >10:</strong> High-risk patient, requires intensive monitoring and resources',
      use2Item2:
        '<strong>Resource allocation:</strong> Prioritize ICU beds for SOFA >8 during surge capacity',
      use2Item3:
        '<strong>Step-down criteria:</strong> SOFA decreasing to &lt;6 with stable trend → consider ICU discharge to step-down unit',
      use2Item4:
        '<strong>Prognosis discussion:</strong> SOFA ≥15 → poor prognosis, discuss goals of care with family',

      // 3. Serial Monitoring
      use3Title: '3️⃣ Serial Monitoring and Deterioration Detection',
      use3Item1:
        '<strong>Daily SOFA:</strong> Calculate at same time each day (e.g., morning rounds 08:00)',
      use3Item2:
        '<strong>Trend analysis:</strong> Graph SOFA over time to visualize trajectory (improving vs worsening)',
      use3Item3:
        '<strong>Alert thresholds:</strong> ΔSOFA ≥+2 in 24-48h → clinical alert, reassess treatment plan',
      use3Item4:
        '<strong>Organ-specific deterioration:</strong> Track individual organ scores to identify failing system (e.g., renal SOFA 0→3 = new AKI)',

      // 4. Clinical Trials
      use4Title: '4️⃣ Clinical Trial Endpoints and Research',
      use4Item1:
        '<strong>Inclusion criteria:</strong> Many sepsis trials require baseline SOFA ≥2 or specific organ SOFA thresholds',
      use4Item2:
        '<strong>Primary outcome:</strong> ΔSOFA at day 7 or ICU discharge used as efficacy endpoint',
      use4Item3:
        '<strong>Stratification:</strong> Randomize by baseline SOFA categories (e.g., &lt;8 vs ≥8) to balance severity',
      use4Item4:
        '<strong>Standardized measure:</strong> Allows comparison across international studies and institutions',

      // 5. Family Communication
      use5Title: '5️⃣ Prognostic Communication with Families',
      use5Item1:
        '<strong>Baseline SOFA 8-12:</strong> "Your family member has moderate organ dysfunction, 15-50% mortality risk, prolonged ICU stay expected"',
      use5Item2:
        '<strong>SOFA ≥15:</strong> "Catastrophic multi-organ failure, >90% mortality, palliative care discussions appropriate"',
      use5Item3:
        '<strong>Improving ΔSOFA:</strong> "Organ function recovering, treatment effective, favorable prognosis"',
      use5Item4:
        '<strong>Worsening ΔSOFA:</strong> "Condition deteriorating despite treatment, need to reassess goals of care"',

      // 6. Quality Metrics
      use6Title: '6️⃣ Quality Metrics and ICU Performance',
      use6Item1:
        '<strong>Severity-adjusted mortality:</strong> Compare observed vs predicted mortality (Standardized Mortality Ratio)',
      use6Item2:
        '<strong>ICU benchmarking:</strong> SOFA used in APACHE IV, SAPS 3 models for severity adjustment',
      use6Item3:
        '<strong>Length of stay prediction:</strong> Baseline SOFA correlates with ICU LOS and mechanical ventilation days',
      use6Item4:
        '<strong>Risk stratification:</strong> Report outcomes stratified by SOFA categories for quality improvement',

      // qSOFA Section
      qsofaTitle: 'qSOFA (quick SOFA) Screening Tool',
      qsofaPurpose:
        '<strong>Purpose:</strong> Rapid bedside screening for sepsis risk (ED, ward, pre-hospital)',
      qsofaItem1:
        '<strong>Criteria (1 point each):</strong> (1) Respiratory rate ≥22/min, (2) Altered mental status (GCS &lt;15), (3) Systolic BP ≤100 mmHg',
      qsofaItem2:
        '<strong>qSOFA ≥2:</strong> Positive screen → calculate full SOFA score, initiate sepsis workup',
      qsofaItem3:
        '<strong>Advantages:</strong> No lab tests required, fast bedside assessment (1 minute)',
      qsofaItem4:
        '<strong>Limitations:</strong> Lower sensitivity than full SOFA (more false negatives), not for diagnosis (screening only)',
    },

    // === PHASE 6: SECTIONS 7-9 + FOOTER ===
    // Section 7: Reference Values
    referenceValues: {
      title: 'Reference Values and Critical Alerts',

      organThresholdsTitle: 'Organ-Specific Critical Thresholds',

      // Respiration
      respirationTitle: '🫁 Respiration:',
      respirationItem1:
        '<strong>Normal P/F ratio:</strong> ≥400 mmHg (room air or minimal supplemental O₂)',
      respirationItem2: '<strong>Mild ARDS:</strong> P/F 200-300 (SOFA 2, moderate hypoxemia)',
      respirationItem3:
        '<strong>Moderate ARDS:</strong> P/F 100-200 (SOFA 3, severe hypoxemia, requires ventilation)',
      respirationItem4:
        '<strong>Severe ARDS:</strong> P/F &lt;100 (SOFA 4, refractory hypoxemia, consider ECMO, proning, recruitment maneuvers)',
      respirationItem5:
        '<strong>⚠️ ALERT:</strong> P/F &lt;100 despite optimal ventilation → rescue therapies (ECMO, prone positioning, inhaled NO)',

      // Coagulation
      coagulationTitle: '🩸 Coagulation:',
      coagulationItem1: '<strong>Normal platelets:</strong> 150-400 ×10³/μL',
      coagulationItem2:
        '<strong>Moderate thrombocytopenia:</strong> 50-100K (SOFA 2-3, monitor bleeding risk)',
      coagulationItem3:
        '<strong>Severe thrombocytopenia:</strong> &lt;50K (SOFA 3, prophylactic platelet transfusion if procedures/bleeding)',
      coagulationItem4:
        '<strong>Critical thrombocytopenia:</strong> &lt;20K (SOFA 4, spontaneous bleeding risk, urgent platelet transfusion)',
      coagulationItem5:
        '<strong>⚠️ ALERT:</strong> Platelets &lt;20K + active bleeding → emergent transfusion, consider DIC workup (PT/PTT, fibrinogen, D-dimer)',

      // Liver
      liverTitle: '🟡 Liver:',
      liverItem1: '<strong>Normal bilirubin:</strong> &lt;1.2 mg/dL',
      liverItem2:
        '<strong>Moderate hyperbilirubinemia:</strong> 2-6 mg/dL (SOFA 2, jaundice visible)',
      liverItem3:
        '<strong>Severe hepatic dysfunction:</strong> 6-12 mg/dL (SOFA 3, consider hepatic encephalopathy risk)',
      liverItem4:
        '<strong>Hepatic failure:</strong> ≥12 mg/dL (SOFA 4, check coagulation, ammonia, consider liver transplant evaluation)',
      liverItem5:
        '<strong>⚠️ ALERT:</strong> Bilirubin ≥12 + INR >2.0 + encephalopathy → acute liver failure, hepatology consult urgent',

      // Cardiovascular
      cardiovascularTitle: '❤️ Cardiovascular:',
      cardiovascularItem1: '<strong>Normal MAP:</strong> ≥70 mmHg without vasopressors',
      cardiovascularItem2:
        '<strong>Hypotension:</strong> MAP &lt;70 mmHg (SOFA 1, fluid resuscitation)',
      cardiovascularItem3:
        '<strong>Low-dose vasopressors:</strong> Dopamine ≤5 or dobutamine (SOFA 2)',
      cardiovascularItem4:
        '<strong>Moderate vasopressors:</strong> Dopamine >5 or low-dose epi/norepi (SOFA 3, septic shock)',
      cardiovascularItem5:
        '<strong>High-dose vasopressors:</strong> Dopamine >15 or high-dose epi/norepi (SOFA 4, refractory shock)',
      cardiovascularItem6:
        '<strong>⚠️ ALERT:</strong> SOFA CV 4 (refractory shock) → exclude tamponade, tension pneumothorax, PE, consider ECMO, stress-dose steroids',

      // CNS
      cnsTitle: '🧠 CNS:',
      cnsItem1: '<strong>Normal consciousness:</strong> GCS 15 (fully awake)',
      cnsItem2: '<strong>Mild AMS:</strong> GCS 13-14 (SOFA 1, confusion/disorientation)',
      cnsItem3: '<strong>Moderate AMS:</strong> GCS 10-12 (SOFA 2, drowsy but arousable)',
      cnsItem4:
        '<strong>Severe coma:</strong> GCS 6-9 (SOFA 3, localizes pain, consider intubation for airway protection)',
      cnsItem5: '<strong>Deep coma:</strong> GCS &lt;6 (SOFA 4, no response, poor prognosis)',
      cnsItem6:
        '<strong>⚠️ ALERT:</strong> GCS &lt;6 + fixed dilated pupils → brain death evaluation, CT head urgent',

      // Renal
      renalTitle: '💧 Renal:',
      renalItem1:
        '<strong>Normal creatinine:</strong> 0.6-1.2 mg/dL (varies by age/sex/muscle mass)',
      renalItem2:
        '<strong>AKI Stage 1:</strong> Cr 1.2-1.9 (SOFA 1, monitor, optimize hemodynamics)',
      renalItem3:
        '<strong>AKI Stage 2:</strong> Cr 2.0-3.4 (SOFA 2, nephrology aware, avoid nephrotoxins)',
      renalItem4:
        '<strong>AKI Stage 3:</strong> Cr 3.5-4.9 or oliguria &lt;500 mL/day (SOFA 3, consider RRT soon)',
      renalItem5:
        '<strong>Renal failure:</strong> Cr ≥5.0 or anuria &lt;200 mL/day (SOFA 4, RRT indicated)',
      renalItem6:
        '<strong>⚠️ ALERT:</strong> SOFA Renal 4 + hyperkalemia (K+ >6.5) or pulmonary edema → emergent dialysis',

      // Critical Alert Thresholds
      criticalAlertsTitle: 'Critical SOFA Alert Thresholds',
      alert1Title: 'SOFA ≥15',
      alert1Description:
        'Catastrophic multi-organ failure. >90% mortality. Palliative care discussions appropriate.',
      alert2Title: 'ΔSOFA ≥+2 in 24-48h',
      alert2Description:
        'Sepsis criterion. Significant deterioration. Reassess diagnosis, treatment, infection source control.',
      alert3Title: 'Any single organ SOFA 4',
      alert3Description:
        'Severe single organ failure. High risk. Requires aggressive organ-specific support (e.g., ECMO for respiratory SOFA 4, RRT for renal SOFA 4).',
      alert4Title: 'SOFA 10-12',
      alert4Description:
        'High risk. 40-50% mortality. Very prolonged ICU course expected. Maximum organ support indicated.',

      // Baseline and Chronic Dysfunction
      baselineTitle: 'Baseline and Chronic Organ Dysfunction',
      baselineItem1:
        '<strong>Known baseline SOFA:</strong> If chronic organ dysfunction pre-illness (e.g., ESRD, cirrhosis, COPD) → use pre-illness baseline SOFA for ΔSOFA calculation',
      baselineItem2:
        '<strong>Dialysis patients:</strong> Renal SOFA automatically 4 (on RRT) → focus on other organ scores',
      baselineItem3:
        '<strong>Elderly/frail:</strong> May have higher baseline SOFA (e.g., mild renal impairment Cr 1.5) → interpret absolute SOFA with caution, ΔSOFA more valuable',
      baselineItem4:
        '<strong>Pediatrics:</strong> SOFA not validated &lt;18 years → use Pediatric SOFA (pSOFA) or PELOD-2 score instead',
    },

    // Section 8: Documentation
    documentation: {
      title: 'Medical Documentation and Guidelines',

      guidelinesTitle: 'International Guidelines and Consensus Definitions',

      // Sepsis-3
      sepsis3GuideTitle: '📋 Sepsis-3 Consensus Definitions (2016)',
      sepsis3Item1:
        '<strong>Task Force:</strong> Society of Critical Care Medicine (SCCM) + European Society of Intensive Care Medicine (ESICM)',
      sepsis3Item2:
        '<strong>Sepsis definition:</strong> Life-threatening organ dysfunction caused by dysregulated host response to infection, operationalized as <strong>SOFA score ≥2 points</strong> from baseline',
      sepsis3Item3:
        '<strong>Septic shock definition:</strong> Sepsis + vasopressor requirement to maintain MAP ≥65 mmHg + serum lactate >2 mmol/L despite adequate fluid resuscitation',
      sepsis3Item4:
        '<strong>qSOFA screening:</strong> Respiratory rate ≥22/min, altered mental status (GCS &lt;15), systolic BP ≤100 mmHg (≥2 of 3 → positive screen)',
      sepsis3Item5:
        '<strong>Impact:</strong> Replaced SIRS criteria (Sepsis-1/2 definitions). SOFA-based definition improves prognostic accuracy and clinical relevance.',

      // Surviving Sepsis Campaign
      sscGuideTitle: '📋 Surviving Sepsis Campaign Guidelines (2021)',
      sscItem1:
        '<strong>1-Hour Bundle:</strong> Measure lactate, obtain blood cultures before antibiotics, administer broad-spectrum antibiotics, begin rapid fluid resuscitation (30 mL/kg crystalloid) if sepsis/septic shock suspected',
      sscItem2:
        '<strong>SOFA role:</strong> Used to confirm organ dysfunction (SOFA ≥2 from baseline) and guide treatment escalation',
      sscItem3:
        '<strong>Serial monitoring:</strong> Daily SOFA scores recommended to assess treatment response and guide de-escalation',
      sscItem4:
        '<strong>Vasopressor guidelines:</strong> Norepinephrine first-line, target MAP ≥65 mmHg, add vasopressin or epinephrine if refractory (aligns with SOFA cardiovascular scoring)',

      // Berlin ARDS
      ardsGuideTitle: '📋 Berlin ARDS Definition (2012)',
      ardsItem1:
        '<strong>Integration with SOFA:</strong> SOFA respiration component based on P/F ratio aligns with Berlin ARDS severity categories',
      ardsItem2: '<strong>Mild ARDS:</strong> P/F 200-300 (SOFA respiratory 2)',
      ardsItem3: '<strong>Moderate ARDS:</strong> P/F 100-200 (SOFA respiratory 3)',
      ardsItem4: '<strong>Severe ARDS:</strong> P/F &lt;100 (SOFA respiratory 4)',
      ardsItem5:
        '<strong>Ventilation requirement:</strong> SOFA 3-4 require respiratory support (mechanical ventilation, CPAP, or high-flow nasal cannula ≥10 L/min)',

      // KDIGO AKI
      kdigoAkiGuideTitle: '📋 KDIGO AKI Guidelines (2012)',
      kdigoItem1:
        '<strong>AKI staging:</strong> Stage 1 (Cr 1.5-1.9× baseline), Stage 2 (2.0-2.9×), Stage 3 (≥3× or ≥4 mg/dL or RRT) partially aligns with SOFA renal scoring',
      kdigoItem2:
        '<strong>Urine output criteria:</strong> SOFA uses &lt;500 mL/day (SOFA 3) and &lt;200 mL/day (SOFA 4), similar to KDIGO AKI UO criteria',
      kdigoItem3:
        '<strong>RRT indication:</strong> SOFA renal 4 often indicates RRT candidacy (severe AKI, oliguria/anuria)',

      // Best Practices
      bestPracticesTitle: 'Clinical Documentation Best Practices',

      templateTitle: '📝 SOFA Score Documentation Template:',
      templateContent:
        'ICU Day 3 - SOFA Score:\n\nTotal SOFA: 12 (↑ from Day 2 SOFA 10, ΔSOFA +2)\n\nIndividual Organ Scores:\n- Respiration: 3 (P/F ratio 180 mmHg on FiO₂ 0.60, intubated)\n- Coagulation: 2 (Platelets 95 ×10³/μL, ↓ from 120K)\n- Liver: 1 (Bilirubin 1.8 mg/dL)\n- Cardiovascular: 4 (Norepinephrine 0.25 μg/kg/min, MAP 68 mmHg)\n- CNS: 1 (GCS 14, sedation off for assessment)\n- Renal: 1 (Creatinine 1.7 mg/dL, UO 1200 mL/24h)\n\nClinical Interpretation:\nHigh-risk patient with severe multi-organ dysfunction.\nΔSOFA +2 indicates deterioration despite antibiotics/fluids.\n\nAction Plan:\n1. Broaden antibiotics (add antifungal coverage)\n2. Increase vasopressor support (MAP target 65-70 mmHg)\n3. CT abdomen for source control evaluation\n4. Family meeting to discuss prognosis (40-50% mortality risk)\n5. Continue daily SOFA trending',

      trendingTitle: '📊 Serial SOFA Trending Chart (recommend in EMR):',
      trendingItem1:
        '<strong>Daily total SOFA:</strong> Graph over ICU stay to visualize trajectory',
      trendingItem2:
        '<strong>Organ-specific trends:</strong> Track individual organ scores to identify specific failures (e.g., renal SOFA 0→3 = new AKI)',
      trendingItem3:
        '<strong>Color-coding:</strong> Green (SOFA 0-6), Orange (7-12), Red (≥13) for quick severity assessment',
      trendingItem4:
        '<strong>Annotations:</strong> Mark major interventions (e.g., "Day 2: Antibiotics changed", "Day 4: Source control surgery")',

      // Research Applications
      researchTitle: 'Research and Quality Improvement Applications',
      researchItem1:
        '<strong>Clinical trial stratification:</strong> Randomize by baseline SOFA (&lt;8 vs ≥8) to balance severity between arms',
      researchItem2:
        '<strong>Primary endpoints:</strong> ΔSOFA at day 7, SOFA-free days (days alive and with SOFA &lt;6), organ failure-free days',
      researchItem3:
        '<strong>Secondary endpoints:</strong> Individual organ SOFA scores (e.g., respiratory SOFA improvement in ARDS trial)',
      researchItem4:
        '<strong>ICU benchmarking:</strong> Severity-adjusted outcomes using SOFA in APACHE IV, SAPS 3 models',
      researchItem5:
        '<strong>Quality metrics:</strong> Sepsis mortality stratified by baseline SOFA for hospital quality reporting',
    },

    // Section 9: Scientific References
    scientificReferences: {
      title: 'Scientific References (PMID Citations)',
      publicationsTitle: 'Key Publications and PMID Citations',

      // Publication 1: Vincent 1996 - Original SOFA
      publication1Author: '📄 Vincent JL, Moreno R, Takala J, et al. (1996)',
      publication1Title:
        '"The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure"',
      publication1Journal: '<em>Intensive Care Medicine</em>, 22(7): 707-710',
      publication1Pmid: '<strong>PMID: 8863252</strong>',
      publication1Description:
        '<strong>Original SOFA score publication.</strong> Developed by European Society of Intensive Care Medicine working group. Validated in 1449 ICU patients. Proposed 6-organ scoring system (0-4 each, total 0-24). Demonstrated correlation with ICU mortality (SOFA ≥15 → >90% mortality). Emphasized utility for <strong>serial assessment</strong> (delta SOFA) rather than single time-point.',

      // Publication 2: Singer 2016 - Sepsis-3
      publication2Author: '📄 Singer M, Deutschman CS, Seymour CW, et al. (2016)',
      publication2Title:
        '"The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)"',
      publication2Journal: '<em>JAMA</em>, 315(8): 801-810',
      publication2Pmid: '<strong>PMID: 26903338</strong>',
      publication2Description:
        '<strong>Sepsis-3 consensus definitions.</strong> SCCM + ESICM task force. Redefined sepsis as "life-threatening organ dysfunction (SOFA ≥2 from baseline) caused by dysregulated host response to infection". Replaced SIRS criteria. Introduced qSOFA screening tool. Validated in 148,907 patients across 12 databases. SOFA ≥2 had <strong>superior predictive validity</strong> vs SIRS (AUROC 0.74 vs 0.64 for in-hospital mortality).',

      // Publication 3: Ferreira 2001 - Serial SOFA
      publication3Author: '📄 Ferreira FL, Bota DP, Bross A, et al. (2001)',
      publication3Title:
        '"Serial evaluation of the SOFA score to predict outcome in critically ill patients"',
      publication3Journal: '<em>JAMA</em>, 286(14): 1754-1758',
      publication3Pmid: '<strong>PMID: 11594901</strong>',
      publication3Description:
        '<strong>Validation of serial SOFA monitoring.</strong> Studied 352 ICU patients with serial SOFA measurements. Demonstrated that <strong>ΔSOFA during first 48h</strong> is strong predictor of mortality (ΔSOFA +1 point = ~10% ↑ mortality). Patients with SOFA ≥11 or increasing SOFA had <strong>mortality rate >80%</strong>. Concluded serial assessment superior to single admission SOFA for prognostication.',

      // Publication 4: Seymour 2016 - Sepsis-3 Validation
      publication4Author: '📄 Seymour CW, Liu VX, Iwashyna TJ, et al. (2016)',
      publication4Title:
        '"Assessment of Clinical Criteria for Sepsis: For the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)"',
      publication4Journal: '<em>JAMA</em>, 315(8): 762-774',
      publication4Pmid: '<strong>PMID: 26903335</strong>',
      publication4Description:
        '<strong>Sepsis-3 validation study.</strong> Analyzed 148,907 patients with suspected infection across 12 international datasets. Compared SOFA, SIRS, LODS, qSOFA for predicting in-hospital mortality. <strong>SOFA ≥2 points:</strong> AUROC 0.74 (95% CI 0.73-0.76), sensitivity 63%, specificity 79% for mortality. <strong>qSOFA ≥2:</strong> AUROC 0.66 outside ICU, faster bedside screening but lower sensitivity than SOFA.',

      // Publication 5: Raith 2017 - ICU Validation
      publication5Author: '📄 Raith EP, Udy AA, Bailey M, et al. (2017)',
      publication5Title:
        '"Prognostic Accuracy of the SOFA Score, SIRS Criteria, and qSOFA Score for In-Hospital Mortality Among Adults With Suspected Infection Admitted to the Intensive Care Unit"',
      publication5Journal: '<em>JAMA</em>, 317(3): 290-300',
      publication5Pmid: '<strong>PMID: 28114553</strong>',
      publication5Description:
        '<strong>Large ICU validation study.</strong> 184,875 ICU patients with suspected infection from Australia/New Zealand ICU databases. <strong>SOFA score:</strong> AUROC 0.753 for hospital mortality, superior to SIRS (AUROC 0.589) and qSOFA (AUROC 0.690). Baseline SOFA ≥2 identified 93% of ICU patients who died. Confirmed <strong>SOFA as best discriminator</strong> for organ dysfunction and mortality in ICU sepsis.',

      // Publication 6: Lambden 2019 - Comprehensive Review
      publication6Author: '📄 Lambden S, Laterre PF, Levy MM, Francois B. (2019)',
      publication6Title:
        '"The SOFA score—development, utility and challenges of accurate assessment in clinical trials"',
      publication6Journal: '<em>Critical Care</em>, 23(1): 374',
      publication6Pmid: '<strong>PMID: 31775846</strong>',
      publication6Description:
        '<strong>Comprehensive SOFA review.</strong> Historical development from 1996 inception to Sepsis-3 integration. Discusses <strong>challenges:</strong> sedation confounding CNS score, chronic organ dysfunction baseline adjustments, inter-rater variability. Provides recommendations for standardized SOFA calculation in clinical trials: worst values per 24h window, sedation-free GCS when possible, document baseline SOFA for chronic disease. Reviews validation data showing <strong>consistent AUROC 0.74-0.86</strong> across diverse ICU populations.',

      // Additional References Section
      additionalTitle: 'Additional Key References',
      additionalItem1:
        '<strong>Jones AE, Trzeciak S, Kline JA.</strong> (2009) "The Sequential Organ Failure Assessment score for predicting outcome in patients with severe sepsis and evidence of hypoperfusion at the time of emergency department presentation". <em>Critical Care Medicine</em>, 37(5): 1649-1654. <strong>PMID: 19325482</strong>. ED validation showing SOFA predicted mortality better than APACHE II in sepsis patients.',
      additionalItem2:
        '<strong>Moreno R, Vincent JL, Matos R, et al.</strong> (1999) "The use of maximum SOFA score to quantify organ dysfunction/failure in intensive care. Results of a prospective, multicentre study". <em>Intensive Care Medicine</em>, 25(7): 686-696. <strong>PMID: 10470572</strong>. Maximum SOFA during ICU stay predicts mortality (AUROC 0.86).',
      additionalItem3:
        '<strong>Rhodes A, Evans LE, Alhazzani W, et al.</strong> (2017) "Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock: 2016". <em>Intensive Care Medicine</em>, 43(3): 304-377. <strong>PMID: 28101605</strong>. Surviving Sepsis Campaign guidelines recommending SOFA for sepsis diagnosis and monitoring.',

      // Educational Note
      educationalNote:
        '<strong>Educational Note:</strong> These references represent peer-reviewed, high-impact publications validating SOFA score. PMID citations allow direct PubMed lookup. The SOFA score has been validated across >300,000 ICU patients in multiple international cohorts, consistently demonstrating AUROC 0.74-0.86 for mortality prediction. It remains the <strong>gold standard</strong> for quantifying organ dysfunction in critically ill patients.',
    },
  },

  // === DISCLAIMER FOOTER ===
  disclaimer: {
    title: 'CLINICAL DISCLAIMER:',
    text: 'SOFA Score is a prognostic tool, does not replace clinical assessment. Interpret in complete clinical context of the patient.',
  },
};
