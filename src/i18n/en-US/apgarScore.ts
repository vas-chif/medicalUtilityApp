/**
 * @file en-US/apgarScore.ts
 * @description English translations for APGAR Score Calculator
 * @author Vasile Chifeac
 * @created 2025-12-12
 */

export default {
  // Main title
  title: 'APGAR Score',

  // Information banner
  banner: {
    title: 'APGAR Score:',
    description:
      'Rapid assessment of newborn clinical status at 1, 5, and 10 minutes. Acronym: Appearance, Pulse, Grimace, Activity, Respiration.',
  },

  // Form - Evaluation time
  evaluationTime: {
    label: 'Evaluation Time',
    options: {
      min1: '1 minute',
      min5: '5 minutes',
      min10: '10 minutes',
    },
  },

  // Parameters - 5 APGAR components
  parameters: {
    appearance: {
      title: 'A - Appearance (Color)',
      options: {
        score0: 'Blue, pale',
        score1: 'Pink body, blue extremities',
        score2: 'Completely pink',
      },
    },
    pulse: {
      title: 'P - Pulse (Heart Rate)',
      options: {
        score0: 'Absent',
        score1: '< 100 bpm',
        score2: '>= 100 bpm',
      },
    },
    grimace: {
      title: 'G - Grimace (Reflex Irritability)',
      options: {
        score0: 'No response',
        score1: 'Grimace',
        score2: 'Cough, sneeze, cry',
      },
    },
    activity: {
      title: 'A - Activity (Muscle Tone)',
      options: {
        score0: 'Limp',
        score1: 'Some flexion',
        score2: 'Active movement',
      },
    },
    respiration: {
      title: 'R - Respiration (Breathing)',
      options: {
        score0: 'Absent',
        score1: 'Weak, irregular',
        score2: 'Good, vigorous cry',
      },
    },
  },

  // Buttons
  buttons: {
    save: 'Save {time} min',
    reset: 'Reset',
  },

  // Results
  results: {
    title: 'Results',
    totalScore: 'Total Score / 10',
  },

  // Interpretations
  interpretation: {
    normal: 'Normal',
    moderate: 'Moderately Depressed',
    severe: 'Severely Depressed',
  },

  // Expansion Sections
  sections: {
    definition: {
      title: 'Clinical Definition and Significance',
      content:
        'The <strong>APGAR Score</strong> (Virginia Apgar, 1952) rapidly assesses newborn vitality through 5 parameters: <strong>A</strong>ppearance (color), <strong>P</strong>ulse (HR), <strong>G</strong>rimace (reflexes), <strong>A</strong>ctivity (tone), <strong>R</strong>espiration (breathing). Score 0-2 per parameter, total 0-10. Evaluated at 1min (immediate adaptation) and 5min (stabilization). Score 7-10: normal. 4-6: moderate depression. 0-3: severe depression, urgent resuscitation.',
    },

    savedEvaluations: {
      title: 'Saved Evaluations',
      timeLabel: '{time}min',
      scoreLabel: 'Score: {total}/10',
    },

    physiology: {
      title: 'Fetal-Neonatal Transition Physiology',
      respiratory: {
        title: 'Respiratory Adaptations:',
        text: 'First breath (pressure -40/-60 cmH2O) expands lungs, pulmonary fluid clearance, surfactant activation. Normal RR 40-60/min. Peripheral cyanosis (acrocyanosis) normal first 24h.',
      },
      cardiovascular: {
        title: 'Cardiovascular Adaptations:',
        text: 'Cord clamping + lung expansion -> ?pulmonary resistance, ?lung blood flow, closure foramen ovale and ductus arteriosus (10-15h). Normal HR 120-160 bpm.',
      },
      cns: {
        title: 'CNS Vulnerability:',
        text: 'Brain consumes 60% total O2. Asphyxia -> hypoxic-ischemic encephalopathy (HIE) -> risk cerebral palsy, epilepsy. Neuroprotection: therapeutic hypothermia 33-34?C x 72h reduces mortality/disability ~40%.',
      },
    },

    evaluation: {
      title: 'How to Evaluate',
      timing: {
        title: 'Timing:',
        text: '1 minute (immediate adaptation), 5 minutes (stabilization/intervention response). If score <7 at 5min -> repeat every 5min (10, 15, 20min).',
      },
      methods: {
        title: 'Methods:',
        text: 'Appearance (inspect color), Pulse (precordial auscultation 6secx10 or cord palpation), Grimace (nasopharyngeal suction), Activity (observe tone/movements), Respiration (observe RR, cry).',
      },
      operators: {
        title: 'Operators:',
        text: 'Midwife (normal deliveries), Pediatrician/Neonatologist (high-risk deliveries, resuscitation). Qualified resuscitation personnel must be available at EVERY birth (AAP/WHO standards).',
      },
    },

    formula: {
      title: 'Formula and Components',
      mainFormula: 'APGAR Score = A + P + G + A + R (0-10 total points)',
      components: {
        appearance:
          '<strong>A - Appearance:</strong> 0=cyanosis/pallor, 1=pink body blue extremities, 2=completely pink',
        pulse: '<strong>P - Pulse:</strong> 0=absent, 1=<100 bpm, 2=>=100 bpm',
        grimace: '<strong>G - Grimace:</strong> 0=no response, 1=grimace, 2=cough/sneeze/cry',
        activity: '<strong>A - Activity:</strong> 0=limp, 1=some flexion, 2=active movement',
        respiration: '<strong>R - Respiration:</strong> 0=absent, 1=weak/irregular, 2=vigorous cry',
      },
    },

    clinicalInterpretation: {
      title: 'Detailed Clinical Interpretation',
      normal: {
        title: 'Score 7-10: Normal Newborn (Vigorous Infant)',
        significance:
          '<strong>Significance:</strong> Optimal cardio-respiratory adaptation. Alert, active newborn, strong cry. Score 8-9 common (acrocyanosis = -1 Appearance).',
        action:
          '<strong>Action:</strong> Standard care: dry, skin-to-skin contact with mother, temperature monitoring, early breastfeeding within 1h. Nursery discharge after 24-48h if stable parameters.',
      },
      moderate: {
        title: 'Score 4-6: Moderate Depression (Moderately Depressed)',
        significance:
          '<strong>Significance:</strong> Transition difficulty, possible mild hypoxia, residual pulmonary fluid, mild prematurity, maternal drugs (opioids, magnesium sulfate).',
        action:
          '<strong>Action:</strong> Vigorous tactile stimulation (rub back), airway suctioning, supplemental O2 30-40% with mask/CPAP, SatO2 monitoring. Re-evaluate APGAR 5min. If improvement -> observation. If persistence -> intensify support.',
      },
      severe: {
        title: '? Score 0-3: Severe Depression (Severely Depressed)',
        significance:
          '<strong>EMERGENCY Significance:</strong> Perinatal asphyxia, apnea, bradycardia/cardiac arrest, shock. High HIE risk.',
        action:
          '<strong>IMMEDIATE Action:</strong> (1) Positive pressure ventilation (PPV) with bag-mask O2 21-30%, RR 40-60/min, (2) If HR<60 after 30sec PPV -> intubation + chest compressions 3:1 (3 compressions:1 ventilation), (3) Epinephrine IV/intraosseous 0.01-0.03 mg/kg if persistent HR<60, (4) Assess volume expansion if suspected hypovolemia/shock. APGAR 0-3 at 5min -> consider therapeutic hypothermia if HIE criteria.',
      },
    },

    clinicalApplications: {
      title: 'Clinical Applications',
      resuscitation: {
        title: '1. Resuscitation Guide:',
        text: 'APGAR 1min identifies newborns requiring immediate intervention. Golden Minute: first 60sec critical for assessment and resuscitation initiation. Resuscitation does not wait for APGAR if evident apnea/bradycardia.',
      },
      effectiveness: {
        title: '2. Intervention Effectiveness Assessment:',
        text: 'APGAR 5min measures resuscitation response. Improvement 1min->5min (e.g. 3->8) = effective resuscitation. Persistent low score <=3 at 5min = poor prognosis, high sequelae risk.',
      },
      communication: {
        title: '3. Standardized Communication:',
        text: 'Universal language for team (midwife, pediatrician, nurse). Essential medico-legal documentation. Facilitates newborn handover from delivery room to NICU (Neonatal Intensive Care Unit).',
      },
      research: {
        title: '4. Research and Audit:',
        text: 'APGAR database for perinatal outcome analysis, quality of care, international comparisons. Screening at-risk populations (gestational diabetes, pre-eclampsia, preterm delivery).',
      },
    },

    referenceValues: {
      title: 'Reference Values and Alerts',
      min1: {
        title: 'APGAR 1 minute:',
        text: '7-10 (85-90% newborns), 4-6 (8-10%), 0-3 (1-2%). Low 1min score may be transient, not always predictive of outcome.',
      },
      min5: {
        title: 'APGAR 5 minutes:',
        text: '7-10 (95-98% newborns), 4-6 (2-3%), 0-3 (<1%). <strong>Strong prognostic value:</strong> 5min score 0-3 -> neonatal mortality x20-50, cerebral palsy x10-100 vs score >=7.',
      },
      alerts: {
        title: 'CRITICAL ALERTS:',
        text: '5min score <=3 -> high HIE risk, consider therapeutic hypothermia within 6h. Persistent 0-3 score at 10-20min -> mortality ~50%, major disability 60-80% survivors.',
      },
      confounders: {
        title: 'Confounding Factors:',
        text: 'Prematurity (<37 weeks) -> lower scores normal due to CNS/lung immaturity. Maternal drugs (opioids, Mg sulfate) -> transient depression. Congenital anomalies (heart disease, diaphragmatic hernia) -> low score not from asphyxia.',
      },
    },

    documentation: {
      title: 'Documentation and Guidelines',
      aap: {
        title: 'AAP/AHA Neonatal Resuscitation Program (NRP) 2020:',
        text: 'Evidence-based neonatal resuscitation recommendations. APGAR guides intervention intensity but resuscitation starts immediately if apnea/HR<100 at birth. Critical Golden Minute: 0-60sec assessment + PPV initiation if needed.',
      },
      who: {
        title: 'WHO Essential Newborn Care (2010):',
        text: 'Global newborn care standard. APGAR Score mandatory at 1 and 5min in all births. Trained resuscitation personnel always available. Therapeutic hypothermia for moderate-severe HIE within 6h (reduces mortality/disability ~40%).',
      },
      ilcor: {
        title: 'ILCOR Consensus (2020):',
        text: 'International Liaison Committee on Resuscitation. Neonatal resuscitation algorithm: start with room air (21% O2), titrate FiO2 according to SatO2 target. Avoid hyperoxia (free radical damage).',
      },
      acog: {
        title: 'ACOG Committee Opinion (2015):',
        text: 'APGAR Score should not be used alone for asphyxia diagnosis. Additional criteria required: cord pH <7.0, base deficit >=12 mmol/L, neonatal encephalopathy, multi-organ dysfunction.',
      },
    },

    bibliography: {
      title: 'Scientific References',
      citations: {
        apgar1953: {
          title: 'Apgar V. "A proposal for a new method of evaluation of the newborn infant"',
          details:
            '(1953). Curr Res Anesth Analg 32(4):260-267. PMID: 13083014. Original study introducing score. Validated on 2096 newborns, correlation with mortality and morbidity.',
        },
        casey2001: {
          title: 'Casey BM, et al. "The continuing value of the Apgar score"',
          details:
            '(2001). N Engl J Med 344(7):467-471. PMID: 11172187. Large cohort 151,891 newborns. 5min score 0-3 strong predictor neonatal mortality (OR 146 vs score 7-10) and cerebral palsy (OR 244).',
        },
        li2019: {
          title: 'Li F, et al. "Apgar score and long-term health outcomes"',
          details:
            '(2019). Pediatrics 143(4):e20182846. Meta-analysis 6.7M newborns. 5min score <7 associated with ?risk epilepsy (RR 4.8), ADHD (RR 1.9), autism spectrum disorders (RR 1.5) in 5-10 year follow-up.',
        },
        msd: {
          title: 'MSD Manuals - Professional: Neonatal Resuscitation.',
          details:
            'Chapter on newborn assessment and resuscitation. Includes AAP/AHA algorithm, intubation indications, drugs (epinephrine, volume expanders), therapeutic hypothermia management.',
        },
        sciencedirect: {
          title: 'ScienceDirect Encyclopedia of Infant and Early Childhood Development (2020):',
          details:
            'Chapter "Apgar Score and Newborn Assessment". Comprehensive treatment of history, neonatal transition physiology, score limitations (prematurity, drugs, congenital anomalies), integration with other assessments (cord pH, lactate).',
        },
      },
    },
  },
};
