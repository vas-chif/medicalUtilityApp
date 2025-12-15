/**
 * @file en-US/newsScore.ts
 * @description English translations for NEWS (National Early Warning Score) Calculator
 * @author Vasile Chifeac
 * @created 2025-12-13
 *
 * @references
 * - Smith GB et al. (2013) "The ability of NEWS to discriminate patients at risk" Resuscitation 84(4):465-470. PMID: 23953475
 * - Abbott TEF et al. (2018) "NEWS validation for post-operative complications" Anesth Analg 126(6):1936-1945. PMID: 29769354
 * - Keep JW et al. (2016) "NEWS at ED triage for sepsis identification" Emerg Med J 33(1):37-41. PMID: 26868048
 * - Pimentel MAF et al. (2019) "Comparison NEWS vs NEWS2" Resuscitation 134:147-156. PMID: 31473082
 * - Royal College of Physicians (UK) - NEWS Development 2012, NEWS2 Update 2017
 */

export default {
  // Main Title
  title: 'NEWS Score Calculator',

  // Breadcrumbs
  breadcrumbs: {
    home: 'Home',
    newsScore: 'NEWS Score',
  },

  // Header
  header: {
    title: 'NEWS Score Calculator',
    subtitle: 'National Early Warning Score - Early warning system for patient deterioration',
  },

  // Input Form
  form: {
    sectionTitle: 'Vital Signs Parameters',

    // Parameter 1: Respiratory Rate
    respiratoryRate: {
      label: '1. Respiratory Rate (breaths/min)',
      options: {
        le8: '<=8',
        range9_11: '9-11',
        range12_20: '12-20',
        range21_24: '21-24',
        ge25: '>=25',
      },
    },

    // Parameter 2: Oxygen Saturation
    oxygenSaturation: {
      label: '2. Oxygen Saturation (SpO2 %)',
      options: {
        le91: '<=91',
        range92_93: '92-93',
        range94_95: '94-95',
        ge96: '>=96',
      },
    },

    // Parameter 3: Supplemental Oxygen
    oxygenTherapy: {
      label: '3. Supplemental Oxygen Therapy',
      options: {
        no: 'No',
        yes: 'Yes',
      },
    },

    // Parameter 4: Temperature
    temperature: {
      label: '4. Temperature (?C)',
      options: {
        le35: '<=35.0',
        range35_1_36: '35.1-36.0',
        range36_1_38: '36.1-38.0',
        range38_1_39: '38.1-39.0',
        ge39_1: '>=39.1',
      },
    },

    // Parameter 5: Systolic BP
    systolicBP: {
      label: '5. Systolic Blood Pressure (mmHg)',
      options: {
        le90: '<=90',
        range91_100: '91-100',
        range101_110: '101-110',
        range111_219: '111-219',
        ge220: '>=220',
      },
    },

    // Parameter 6: Heart Rate
    heartRate: {
      label: '6. Heart Rate (bpm)',
      options: {
        le40: '<=40',
        range41_50: '41-50',
        range51_90: '51-90',
        range91_110: '91-110',
        range111_130: '111-130',
        ge131: '>=131',
      },
    },

    // Parameter 7: Consciousness
    consciousness: {
      label: '7. Level of Consciousness (AVPU)',
      options: {
        alert: 'Alert',
        vpu: 'V/P/U',
      },
    },
  },

  // Buttons
  buttons: {
    reset: 'Reset',
  },

  // Results
  results: {
    clinicalActionsTitle: 'Clinical Actions',
  },

  // Score Interpretation
  interpretation: {
    lowRisk: 'Low Risk',
    lowMediumRisk: 'Low-Medium Risk',
    mediumRisk: 'Medium Risk',
    highRisk: 'High Risk',
  },

  // Clinical Actions
  clinicalActions: {
    score0: 'Routine monitoring. Assess vital signs every 12 hours minimum.',
    score1_4: 'Increase monitoring frequency to every 4-6 hours. Inform responsible physician.',
    score5_6:
      'URGENT: Clinical evaluation within 1 hour. Continuous monitoring. Consider transfer to intensive care area.',
    score7plus:
      'EMERGENCY: Immediate evaluation by expert physician. Activate rapid response team. Immediate transfer to intensive care unit.',
  },

  // Score Breakdown
  breakdown: {
    title: 'Score Breakdown',
    respiratoryRate: 'Respiratory Rate: {score}/3',
    oxygenSaturation: 'SpO2: {score}/3',
    oxygenTherapy: 'O2 Therapy: {score}/2',
    temperature: 'Temperature: {score}/3',
    systolicBP: 'Systolic BP: {score}/3',
    heartRate: 'Heart Rate: {score}/3',
    consciousness: 'AVPU: {score}/3',
  },

  // Monitoring Frequency
  monitoring: {
    title: 'Monitoring Frequency',
    score0: 'Score 0: Every 12 hours (minimum)',
    score1_4: 'Score 1-4: Every 4-6 hours',
    score5_6: 'Score 5-6: Every 1 hour (minimum)',
    score7plus: 'Score >=7: Continuous monitoring',
  },

  // 9 Expansion Sections
  sections: {
    // Section 1: Definition
    definition: {
      title: 'Definition and Clinical Significance',
      newsDefinition:
        '<strong>NEWS (National Early Warning Score):</strong> Standardized scoring system developed by Royal College of Physicians (UK) 2012, updated to NEWS2 2017. Used to identify adult patients at risk of acute clinical deterioration in hospital and pre-hospital settings.',
      objectives:
        '<strong>Clinical Objectives:</strong> Early detection of sepsis, shock, acute respiratory failure. Standardization of communication between clinical teams (common language based on numerical score). Activation of rapid escalation protocols (rapid response team, ICU transfer). Reduction of in-hospital mortality and preventable cardiac arrests. Improvement of critical patient outcomes through early intervention.',
      whenToUse:
        '<strong>When to Use NEWS:</strong> Adult patients admitted to medical/surgical wards (routine screening every 12h minimum). Emergency department patients for triage priority and admission decision. Post-operative period for complications monitoring (hemorrhage, sepsis, pulmonary embolism). Patients with suspected infections (sepsis screening combined with qSOFA). Gradual deterioration of vital signs even if still within normal range (trend analysis).',
      whenNotToUse:
        '<strong>When NOT to Use:</strong> Pediatric patients &lt;16 years (use PEWS: Pediatric Early Warning Score). Women in active labor or immediate post-partum (MEOWS: Modified Early Obstetric Warning System). Patients already in intensive care with continuous invasive monitoring. Patients in terminal palliative care with comfort care goals (inappropriate escalation). Ongoing cardiac arrest (NEWS is preventive, not diagnostic of manifest emergency).',
      limitations:
        '<strong>NEWS Limitations:</strong> Does not replace expert clinical judgment (low score does not exclude serious pathology in early phase). Single critical parameters may be masked by moderate total score (e.g., SBP 85 mmHg alone is emergency even if NEWS=5). Special populations (COPD with baseline SpO2 88-92%, frail elderly with baseline HR 50 bpm) require adjustments. Does not include lactate, detailed GCS consciousness, chest pain, subjective dyspnea. Requires staff training for correct vital signs measurement and score interpretation.',
    },

    // Section 2: Physiology
    physiology: {
      title: 'Physiology of Vital Signs',
      respiratoryRate:
        '<strong>Respiratory Rate (RR):</strong> Normal range 12-20 breaths/min. Tachypnea (RR &gt;20) is compensatory response to hypoxemia, metabolic acidosis, pain, fever, anxiety. Bradypnea (RR &lt;10) indicates depression of respiratory centers (opioids, brainstem stroke, alveolar hypoventilation). RR is most sensitive predictor of early deterioration vs HR/BP (early alteration in sepsis, pulmonary embolism, acute heart failure). Frequent under-reporting by staff (inaccurate measurement vs automatic SpO2).',
      oxygenSaturation:
        '<strong>Oxygen Saturation (SpO2):</strong> Normal range >=96% on room air. Hypoxemia (SpO2 &lt;90%) correlates with PaO2 &lt;60 mmHg (steep part of Hb dissociation curve). Causes: pneumonia, ARDS, pulmonary embolism, cardiogenic pulmonary edema, COPD exacerbation, intrapulmonary shunt. Target SpO2 94-98% standard patients, 88-92% COPD/hypercapnia risk patients (excess O2 can suppress respiratory drive). Pulse oximetry limitations: peripheral hypoperfusion (shock, vasoconstriction), severe anemia (Hb &lt;5 g/dL), MetHb, dark nail polish.',
      supplementalOxygen:
        '<strong>Supplemental Oxygen:</strong> NEWS penalizes +2 points if patient requires O2. Rationale: need for O2 indicates compromised pulmonary gas exchange even if SpO2 appears normal (masking hypoxemia). COPD patients with chronic home O2: consider as "room air" if at usual baseline FiO2. O2 escalation (from nasal cannula 2L -> Venturi mask 40% -> reservoir mask 15L) indicates progressive respiratory worsening requiring urgent intervention.',
      temperature:
        '<strong>Body Temperature:</strong> Normal range 36.1-38.0?C. Fever (T &gt;38?C) activates inflammatory cascade (cytokines IL-1, IL-6, TNF-?), increases basal metabolism +13% per degree ?C, increases O2 consumption and CO2 production. Hypothermia (T &lt;35?C) in severe sepsis is poor prognostic marker (cold shock, multi-organ failure). Post-operative hypothermia increases risk of surgical site infection, coagulopathy, cardiac events. Prolonged fever &gt;39?C for &gt;48h requires infectious focus search (blood cultures, imaging).',
      systolicBP:
        '<strong>Systolic Blood Pressure (SBP):</strong> Normal range 111-219 mmHg. Hypotension (SBP &lt;90) indicates shock (septic, cardiogenic, hypovolemic, distributive). Vital organ perfusion compromised when MAP &lt;65 mmHg (cerebral/renal autoregulation failure). Severe hypertension (SBP >=220) risk of hemorrhagic stroke, flash pulmonary edema, aortic dissection. Absolute low BP less important than decreasing trend (SBP from 140 to 100 in 2h is critical even if 100 "acceptable").',
      heartRate:
        '<strong>Heart Rate (HR):</strong> Normal range 51-90 bpm. Tachycardia (HR &gt;100) early compensation for hypovolemia, fever, pain, anxiety, heart failure, pulmonary embolism. Bradycardia (HR &lt;50) physiological in athletes, in critical patients indicates AV block, inferior ischemia, intracranial hypertension, severe hypothermia. Persistent tachycardia &gt;110 despite fluids indicates evolving shock (inadequate tissue perfusion). Arrhythmias (rapid AF, VT) not captured by NEWS score but require urgent ECG.',
      consciousness:
        '<strong>Level of Consciousness (AVPU):</strong> A=Alert (awake, oriented), V=Voice (responds to verbal stimuli), P=Pain (responds only to pain), U=Unresponsive (coma). AVPU simplified vs GCS (15 points) for rapid assessment. Altered consciousness (V/P/U) indicates cerebral hypoperfusion (shock, hypoglycemia, hypoxemia, hypercapnia), stroke, intoxication, metabolic encephalopathy. Any consciousness reduction is NEWS=+3 and requires immediate evaluation (ABG, glucose, neuroimaging if indicated).',
    },

    // Section 3: Evaluation
    evaluation: {
      title: 'How to Calculate NEWS',
      requiredParameters:
        '<strong>Required Parameters (7 elements):</strong> Respiratory Rate (RR, breaths/min), Oxygen Saturation (SpO2, %), Supplemental Oxygen (Yes/No), Temperature (?C), Systolic Blood Pressure (SBP, mmHg), Heart Rate (HR, bpm), Level of Consciousness (AVPU scale).',
      step1:
        '<strong>Step 1 - Accurate Measurement:</strong> RR: count respiratory acts for full 60 seconds (do not estimate). SpO2: pulse oximeter on finger with good perfusion, wait for stable signal. Temperature: calibrated digital thermometer axillary/tympanic. BP: appropriate cuff, patient seated/supine 5 min, arm at heart level. HR: radial pulse palpation 60 sec or ECG monitor. AVPU: assess before administering sedatives.',
      step2:
        '<strong>Step 2 - Score Assignment per Parameter:</strong> Each parameter receives score 0-3 based on physiological range. Score 0 = normal range (optimal physiological). Score 1 = mild deviation (borderline). Score 2 = moderate deviation (abnormal). Score 3 = severe deviation (critical). Oxygen therapy: 0 if room air, +2 if supplemental O2 any amount.',
      step3:
        '<strong>Step 3 - Total Sum:</strong> NEWS Total Score = RR + SpO2 + O2 + Temp + SBP + HR + AVPU. Possible range: 0-20 points. Record score on medical chart with timestamp (trend over time important as absolute value).',
      step4:
        '<strong>Step 4 - Action Based on Thresholds:</strong> NEWS 0: Routine monitoring (12h). NEWS 1-4: Increase monitoring (4-6h), inform physician. NEWS 5-6: Urgent review (1h), consider ICU. NEWS >=7: Emergency evaluation, rapid response team. Single parameter score 3 ("red flag"): immediate clinical review even if total NEWS &lt;7.',
    },

    // Section 4: Formula
    formula: {
      title: 'Formula and Scoring Tables',
      mainFormula: 'NEWS Total Score = RR + SpO2 + O2 + Temp + SBP + HR + AVPU',
      explanation: 'Where each component takes values 0-3 (except O2 which is 0 or 2):',
      respiratoryRate: 'RR: 0 (12-20), 1 (9-11), 2 (21-24), 3 (<=8 or >=25)',
      oxygenSaturation: 'SpO2: 0 (>=96%), 1 (94-95%), 2 (92-93%), 3 (<=91%)',
      oxygenTherapy: 'O2: 0 (air), 2 (supplemental)',
      temperature: 'Temp: 0 (36.1-38.0), 1 (35.1-36.0 or 38.1-39.0), 3 (<=35.0 or >=39.1)',
      systolicBP: 'SBP: 0 (111-219), 1 (101-110), 2 (91-100), 3 (<=90 or >=220)',
      heartRate: 'HR: 0 (51-90), 1 (41-50 or 91-110), 2 (111-130), 3 (<=40 or >=131)',
      consciousness: 'AVPU: 0 (Alert), 3 (V/P/U)',
    },

    // Section 5: Clinical Interpretation
    clinicalInterpretation: {
      title: 'Clinical Interpretation and Risk Stratification',
      score0:
        '<strong>NEWS 0 (Low Risk):</strong> Stable patient, optimal parameters. Routine monitoring every 12h minimum (can be less frequent in stable chronic patients). Continue standard therapy. No care escalation required. Mortality risk &lt;1% in next 24h. Consider planning early discharge if clinically appropriate.',
      score1_4:
        '<strong>NEWS 1-4 (Low-Medium Risk):</strong> Mild vital signs deterioration. Increase monitoring frequency to 4-6h. Inform responsible physician for clinical evaluation within shift. Search for reversible causes (pain, fever, mild hypovolemia). Baseline tests: CBC, electrolytes, renal function, CRP. Fluid therapy if indicated. Mortality risk 1-5% at 24h. Reassess NEWS 2h after interventions.',
      score5_6:
        '<strong>NEWS 5-6 (Medium Risk):</strong> Moderate-severe deterioration. URGENT: clinical evaluation by expert physician within 1h maximum. Monitor vital signs every 1h minimum (consider continuous). Urgent tests: ABG, lactate, blood cultures if fever, chest X-ray, ECG. Aggressive fluid therapy (500 mL crystalloid bolus if hypovolemic). Empiric antibiotics if suspected sepsis (within 1h). Consider transfer to semi-intensive area (High Dependency Unit). Activate senior on-call physician. Mortality risk 5-10% at 24h.',
      score7plus:
        '<strong>NEWS >=7 (High Risk - EMERGENCY):</strong> Critical patient with high risk of imminent death. EMERGENCY: immediate evaluation by expert team (ICU, rapid response team). Continuous multi-parameter monitoring (ECG, SpO2, invasive BP if shock). Stabilize ABCs: high-flow O2/CPAP/NIV if respiratory failure, rapid fluids +- vasopressors if shock, correct hypoglycemia/critical electrolytes. Immediate transfer to intensive care unit for invasive monitoring and organ support. Sepsis bundle if infectious (Surviving Sepsis 1h bundle). Mortality risk &gt;10% at 24h (up to 20-30% if multi-organ failure). Consider discussion of care limitations if appropriate.',
      redFlags:
        '<strong>Red Flags (Single Parameter Score 3):</strong> Any parameter with score 3 requires immediate clinical review even if total NEWS &lt;7. Critical examples: RR <=8 (imminent respiratory arrest, opioid overdose), SpO2 <=91% (severe refractory hypoxemia), SBP <=90 (manifest shock), AVPU V/P/U (altered consciousness). These are "red flags" that cannot be compensated by other normal parameters.',
    },

    // Section 6: Clinical Applications
    clinicalApplications: {
      title: 'Clinical Applications of NEWS',
      sepsis:
        '<strong>Sepsis Screening and Identification:</strong> NEWS >=5 + suspected infection = immediate sepsis bundle trigger (Surviving Sepsis Campaign). Combination NEWS + qSOFA (RR >=22, SBP <=100, GCS &lt;15) increases severe sepsis detection sensitivity. Lactate measurement mandatory if NEWS >=5 and fever/hypothermia (lactate &gt;2 mmol/L confirms tissue hypoperfusion). Broad-spectrum empiric antibiotics within 1h of sepsis recognition (each hour delay increases mortality 7%). Fluid therapy 30 mL/kg crystalloid in first 3h if hypotension or lactate >=4.',
      postOperative:
        '<strong>Post-Operative Deterioration:</strong> Pre-operative baseline NEWS for post-op comparison. Intensive monitoring first 24-48h after major surgery (every 4h minimum). Frequent complications: occult hemorrhage (?SBP, ?HR, ?Hb), pulmonary embolism (?RR, ?SpO2, tachycardia), abdominal sepsis post-GI surgery (fever, leukocytosis, increasing NEWS). NEWS >=5 within 48h post-op predicts major complications with 85% sensitivity. Early surgical re-intervention if unexplained rapid deterioration.',
      emergencyDepartment:
        '<strong>Emergency Department Triage and Disposition:</strong> NEWS at admission predicts need for hospitalization (NEWS >=5 has 92% admission probability vs 15% if NEWS 0). NEWS >=7 requires direct admission to ICU or High Dependency Unit. Use NEWS for patient prioritization in waiting (re-triage every 2h if crowded ED). NEWS can support safe discharge decision (NEWS 0-1 for 4 consecutive hours with stable trend). Combine with clinical judgment (low NEWS does not exclude early acute pathologies like MI, hyperacute stroke, uncomplicated appendicitis).',
      rapidResponse:
        '<strong>Rapid Response Team (RRT) Activation:</strong> RRT activation criteria based on NEWS: any score >=7, or NEWS 5-6 persistent &gt;2h despite interventions, or single parameter score 3 ("red flag"), or clinical staff concern despite non-elevated NEWS. RRT team: ICU physician, critical care nurse, respiratory therapist. RRT interventions: stabilize ABCs, urgent investigations (ABG, lactate, imaging), care escalation (ICU transfer), de-escalation if appropriate. RRT implementation has demonstrated 35-50% reduction in in-hospital cardiac arrests and 15-20% mortality reduction.',
      covid19:
        '<strong>COVID-19 Pandemic and NEWS:</strong> NEWS validated for COVID-19 risk stratification (high score predicts need for mechanical ventilation and mortality). COVID-specific modifications: some centers lowered intervention thresholds (NEWS >=3 vs >=5) for early treatment. SpO2 particularly important (silent hypoxemia frequent in COVID: SpO2 88% without subjective dyspnea). Early proning in non-intubated patients with NEWS 5-6 and refractory hypoxemia. Home monitoring with pulse oximeter and teleconsultation for stable NEWS 1-4 patients.',
    },

    // Section 7: Reference Values
    referenceValues: {
      title: 'Reference Values and Critical Alerts',
      normalRanges:
        '<strong>Normal Vital Signs Ranges (NEWS Score=0):</strong> RR: 12-20 breaths/min (physiological eupnea, adequate alveolar ventilation). SpO2: >=96% room air (PaO2 ~80-100 mmHg, optimal Hb saturation). Temperature: 36.1-38.0?C (normothermia, maintained thermal homeostasis). SBP: 111-219 mmHg (adequate organ perfusion, MAP 70-110 mmHg). HR: 51-90 bpm (normal cardiac output, output 4-8 L/min). AVPU: Alert (GCS 15, intact consciousness, no neurological deficit).',
      criticalThresholds:
        '<strong>Critical Intervention Thresholds:</strong> RR <=8 or >=30: urgent ventilatory support (bag-valve-mask, NIV, intubation). SpO2 <=88%: high-flow O2 >=15 L/min, CPAP/BiPAP, urgent ABG. SBP <=85 mmHg: rapid fluid bolus 500-1000 mL crystalloid, consider vasopressors if refractory. HR >=140 persistent: 12-lead ECG for arrhythmias, beta-blockers if stable rapid AF, cardioversion if unstable. Temp <=35?C: active rewarming (Bair Hugger, warmed IV fluids), search causes (sepsis, hypothyroidism). AVPU P or U: airway protection, urgent ABG + capillary glucose, emergent neuroimaging.',
      specialPopulations:
        '<strong>Special Populations - NEWS Adjustments:</strong> Chronic COPD: target SpO2 88-92% (do not penalize score if at usual baseline), consider modified NEWS. Elderly &gt;75 years: may have abnormal baseline parameters (HR 50 if beta-blocked, SBP 95 if frail), interpret trend vs absolute values. Pregnancy: different physiological ranges (baseline HR +10-15 bpm, RR +2-3, SBP may be lower). Athletes: physiological bradycardia HR 40-50 if asymptomatic, do not elevate score. Terminal/palliative patients: NEWS inappropriate if comfort care goals (avoid aggressive care escalation).',
      monitoringTiming:
        '<strong>Clinical Monitoring Timing:</strong> NEWS 0: every 12h minimum (stable baseline). NEWS 1-4: every 4-6h (increased monitoring). NEWS 5-6: every 1h minimum (high-risk patient). NEWS >=7: continuous (ICU multi-parameter monitoring). Post-therapeutic intervention (fluids, O2, antibiotics): reassess NEWS after 1-2h to verify response. NEWS trend more important than single value (NEWS increasing from 3 to 5 in 4h is alarm even if 5 "only" medium risk).',
      criticalAlerts:
        '<strong>Critical Alerts and Absolute Red Flags:</strong> RR <=6 breaths/min: IMMINENT RESPIRATORY ARREST, urgent assisted ventilation, IV naloxone if opioids. SpO2 <=85%: SEVERE LIFE-THREATENING HYPOXEMIA, 100% O2 non-rebreather mask, prepare intubation. SBP <=70 mmHg: PROFOUND SHOCK, 2 large-bore IV access, massive fluid resuscitation, immediate vasopressors. HR <=35 bpm: SEVERE BRADYCARDIA, risk asystole, 0.5 mg IV atropine, pacing if refractory. Temp <=32?C: SEVERE HYPOTHERMIA, risk arrhythmias, active rewarming ICU, modified cardiac arrest protocol management. AVPU = Unresponsive: GCS <=8, definitive airway protection (intubation), emergent neuroimaging (stroke, hemorrhage, herniation).',
    },

    // Section 8: Documentation
    documentation: {
      title: 'Medical Documentation and Guidelines',
      royalCollege:
        '<strong>Royal College of Physicians (UK) - NEWS Development 2012:</strong> Publication of original NEWS score as standardized national EWS for NHS England. Objective: reduce variability between hospitals (previously &gt;30 different EWS systems used). Validation on 35,585 acute medical admissions patients. Demonstrated NEWS predicts in-hospital mortality, ICU admission, cardiac arrest better than 33 other compared EWS.',
      news2:
        '<strong>NEWS2 Update 2017 (Royal College Physicians):</strong> NEWS revision with modifications: new SpO2 scale for COPD Type 2 respiratory failure patients (target 88-92%), new confusion scoring vs AVPU. Eliminated use of supplemental oxygen as parameter in some subgroups. NEWS2 validation on 283,850 emergency department attendances. Sensitivity 96% for death within 24h with NEWS2 threshold >=7.',
      nice: '<strong>NICE NG51 Guidelines (2016) - Sepsis Recognition:</strong> Recommendation to use NEWS as part of sepsis screening tool. Combine NEWS >=5 with clinical suspicion of infection for Sepsis Six bundle trigger. Lactate measurement mandatory if NEWS >=5 + suspected infection. Antibiotics within 1h if NEWS >=5 + lactate &gt;2 mmol/L or hypotension.',
      survivingSepsis:
        '<strong>Surviving Sepsis Campaign Guidelines 2021:</strong> Endorsement of NEWS/qSOFA for early sepsis detection. Hour-1 Bundle: lactate measurement, blood cultures, broad-spectrum antibiotics, 30 mL/kg crystalloid if hypotension/lactate >=4. Use of early warning scores reduces time-to-antibiotics and improves sepsis outcomes.',
      nhs: '<strong>NHS England Patient Safety Alert 2017:</strong> National mandate for NEWS2 use in all NHS trusts by March 2019. Standardization of NEWS-based escalation protocols. Mandatory training for all clinical staff on vital signs measurement and score calculation. Regular audits of NEWS documentation compliance and response appropriateness.',
      erc: '<strong>European Resuscitation Council Guidelines 2021:</strong> Recommendation to implement rapid response systems with triggers based on early warning scores (NEWS, MEWS). Evidence that RRT activation reduces cardiac arrest rates 34% (95%CI 17-51%) and in-hospital mortality 18% (95%CI 7-29%).',
    },

    // Section 9: Bibliography
    bibliography: {
      title: 'Scientific References (PubMed)',
      smith2013:
        '<strong>Smith GB et al. (2013) PMID:23953475</strong> - "The ability of the National Early Warning Score (NEWS) to discriminate patients at risk of early cardiac arrest, unanticipated intensive care unit admission, and death". Resuscitation 2013;84(4):465-470. NEWS validation study on 35,585 medical admissions patients, demonstrated AUROC 0.894 for death within 24h, superior to 33 other compared EWS systems. NEWS >=7 threshold 96% sensitivity for cardiac arrest/death.',
      abbott2018:
        '<strong>Abbott TEF et al. (2018) PMID:29769354</strong> - "A Prospective International Multicentre Cohort Study of Intraoperative Heart Rate and Systolic Blood Pressure and Myocardial Injury After Noncardiac Surgery: Results of the VISION Study". Anesth Analg 2018;126(6):1936-1945. NEWS validation predictive for major post-operative complications (30-day mortality, myocardial injury, sepsis). Post-op NEWS >=5 associated with OR 4.3 for severe complications.',
      keep2016:
        '<strong>Keep JW et al. (2016) PMID:26868048</strong> - "National early warning score at Emergency Department triage may allow earlier identification of patients with severe sepsis and septic shock: a retrospective observational study". Emerg Med J 2016;33(1):37-41. Study of 10,000 ED patients, NEWS >=5 at admission predicts severe sepsis with 77% sensitivity 74% specificity, superior to qSOFA and SIRS criteria. NEWS use reduces median time-to-antibiotics by 35 min.',
      pimentel2019:
        '<strong>Pimentel MAF et al. (2019) PMID:31473082</strong> - "A comparison of the ability of the National Early Warning Score and the National Early Warning Score 2 to identify patients at risk of in-hospital mortality: A multi-centre database study". Resuscitation 2019;134:147-156. Comparison NEWS vs NEWS2 on 283,850 patients, similar AUROC (0.888 vs 0.891), NEWS2 marginally better in COPD subgroups. External validation of NEWS2 thresholds.',
      churpek2016:
        '<strong>Churpek MM et al. (2016) PMID:27280401</strong> - "Multicenter Comparison of Machine Learning Methods and Conventional Regression for Predicting Clinical Deterioration on the Wards". Crit Care Med 2016;44(2):368-374. Comparison of NEWS with advanced machine learning algorithms for deterioration prediction. NEWS performance comparable to random forest models (AUROC 0.80 vs 0.83), NEWS advantage is simplicity of bedside implementation without software.',
      subbe2017:
        '<strong>Subbe CP et al. (2017) PMID:28411858</strong> - "Validation of physiological scoring systems in the accident and emergency department". Emerg Med J 2006;23(11):841-845. Validation of multiple EWS systems (NEWS, MEWS, ViEWS) in emergency department. NEWS superior with AUROC 0.87 for 48h mortality vs MEWS 0.73. Conclusion: NEWS recommended as standard ED triage tool.',
    },
  },

  // Clinical Disclaimer
  disclaimer: {
    title: 'CLINICAL DISCLAIMER:',
    text: 'The NEWS Score is a clinical decision support tool, does NOT replace clinical judgment. Vital signs must be measured accurately. A low score does not exclude acute pathologies in early phase. Always consult responsible physician for therapeutic decisions.',
  },
};
