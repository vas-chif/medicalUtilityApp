/**
 * @file en-US/gcsScore.ts
 * @description English translations for Glasgow Coma Scale Calculator
 * @author Vasile Chifeac
 * @created 2025-12-13
 *
 * @references
 * - Teasdale G, Jennett B. (1974) "Assessment of coma and impaired consciousness" Lancet 2(7872):81-84. PMID: 4136544
 * - Marmarou A, et al. (1991) "Impact of ICP instability and hypotension on outcome" J Neurosurg 75:S59-S66
 * - MRC CRASH Trial Collaborators. (2008) "Predicting outcome after TBI" BMJ 336(7641):425-429. PMID: 18270239
 * - Reith FC, et al. (2016) "Reliability of GCS in TBI" Acta Neurochir 158:123-129
 * - MSD Manuals: Traumatic Brain Injury (professional edition)
 * - ScienceDirect Encyclopedia of the Neurological Sciences (2021): "Glasgow Coma Scale"
 */

export default {
  // Main Title
  title: 'Glasgow Coma Scale (GCS)',

  // Info Banner
  banner: {
    title: 'Glasgow Coma Scale (GCS):',
    description:
      'Standardized scale for neurological assessment of consciousness level. Range: 3-15 (3=deep coma, 15=fully awake).',
  },

  // Parameters - 3 GCS components
  parameters: {
    eye: {
      title: 'E - Eye Opening',
      options: {
        score4: 'Spontaneous',
        score3: 'To verbal command',
        score2: 'To painful stimulus',
        score1: 'Absent',
      },
    },
    verbal: {
      title: 'V - Verbal Response',
      options: {
        score5: 'Oriented and converses',
        score4: 'Confused / Disoriented',
        score3: 'Inappropriate words',
        score2: 'Incomprehensible sounds',
        score1: 'No response',
      },
    },
    motor: {
      title: 'M - Motor Response',
      options: {
        score6: 'Obeys commands',
        score5: 'Localizes painful stimulus',
        score4: 'Withdraws from pain',
        score3: 'Abnormal flexion (decorticate)',
        score2: 'Abnormal extension (decerebrate)',
        score1: 'No response',
      },
    },
  },

  // Buttons
  buttons: {
    reset: 'Reset',
  },

  // Results
  results: {
    title: 'Results',
    totalScore: 'GCS Total Score / 15',
    components: 'E{eye} V{verbal} M{motor}',
  },

  // Interpretations
  interpretation: {
    mild: 'Mild TBI - Concussion',
    moderate: 'Moderate TBI - Lethargy',
    severe: 'Severe TBI - Coma',
  },

  // TBI Severity descriptions
  severity: {
    gcs15: 'GCS 15: Fully awake and oriented. No evident neurological deficit.',
    mild:
      'GCS 13-15: MILD TBI. Cerebral concussion, possible short-term memory loss or concentration difficulty. Complete neurological recovery expected.',
    moderate:
      'GCS 9-12: MODERATE TBI. Patient lethargic or stuporous. 10-20% risk of deterioration to coma. Hospitalization and continuous monitoring required.',
    severe:
      'GCS 3-8: SEVERE TBI (COMA). Patient does not open eyes, does not obey commands, does not speak words. High probability of intubation and mechanical ventilation required. Maximum risk of mortality and morbidity.',
  },

  // Expansion Sections
  sections: {
    // Section: TBI Severity
    severityTBI: {
      title: 'TBI Severity',
    },

    // Section 1: Definition
    definition: {
      title: 'Definition and Clinical Significance of GCS',
      mainText:
        '<strong>Glasgow Coma Scale (GCS):</strong> Objective consciousness level assessment system developed 1974 by Teasdale & Jennett (Glasgow, Scotland). Evaluates 3 components: <strong>Eye opening (1-4)</strong>, <strong>Verbal response (1-5)</strong>, <strong>Motor response (1-6)</strong>. Total score 3-15: 13-15 mild TBI, 9-12 moderate, 3-8 severe/coma. Worldwide gold standard for acute neurological assessment (trauma, stroke, metabolic coma).',
      applications:
        '<strong>Applications:</strong> Emergency triage, intubation decisions, ICU neurological deterioration monitoring, TBI outcome prognosis (mortality, disability), standardized team communication, clinical research (trial inclusion criteria).',
    },

    // Section 2: Physiology
    physiology: {
      title: 'Physiology of Consciousness and CNS Function',
      consciousness:
        '<strong>Consciousness:</strong> State of self + environment awareness, requires 2 components: (1) <strong>Arousal</strong> (wakefulness) from ascending reticular activating system (ARAS) brainstem-thalamus, (2) <strong>Awareness</strong> (content) from bilateral cerebral cortex. ARAS lesions -> coma (absence of arousal). Diffuse cortical lesions -> vegetative state (preserved arousal, lost awareness).',
      neuralPathways:
        '<strong>GCS Neural Pathways:</strong> Eye opening: ARAS + brainstem oculomotor nuclei. Verbal: Broca frontal cortex + Wernicke temporal + corticobulbar laryngeal motor pathways. Motor: primary motor cortex + pyramidal/extrapyramidal tracts + spinal cord. Any level lesion -> corresponding GCS deficit.',
    },

    // Section 3: Evaluation
    evaluation: {
      title: 'How to Assess GCS',
      timing:
        '<strong>Timing:</strong> Initial emergency assessment, repeat every 15-30min in acute phase, every 1-4h in ICU according to stability. Document separate component scores (E4V5M6 = 15) not just total.',
      stimuli:
        '<strong>Stimuli:</strong> Eye: verbal call -> if no response, painful stimulus. Verbal: orientation questions (name, place, date). Motor: command ("raise arms") -> if no response, painful stimulus (nailbed pressure, sternum, supraorbital). Use appropriate stimulus with increasing intensity.',
      operators:
        '<strong>Operators:</strong> Emergency physicians, ICU nurses, pre-hospital paramedics. Training: reduces inter-rater variability (reliability ?=0.75-0.85 with training vs 0.50-0.65 without). Pediatric GCS-P scale for &lt;2 years modifies Verbal (crying, vocalizations).',
    },

    // Section 4: Formula
    formula: {
      title: 'Formula and GCS Components',
      mainFormula: 'GCS = Eye Opening (E) + Verbal Response (V) + Motor Response (M)',
      eye: '<strong>Eye (E 1-4):</strong> 4=spontaneous, 3=to verbal command, 2=to pain, 1=absent',
      verbal:
        '<strong>Verbal (V 1-5):</strong> 5=oriented, 4=confused, 3=inappropriate words, 2=incomprehensible sounds, 1=absent',
      motor:
        '<strong>Motor (M 1-6):</strong> 6=obeys commands, 5=localizes pain, 4=withdraws to pain (normal flexion), 3=abnormal decorticate flexion, 2=decerebrate extension, 1=absent',
      range:
        '<strong>Range:</strong> Min=3 (E1V1M1 deep coma/brain death), Max=15 (E4V5M6 normal). Modifiers: T (intubated), C (not testable e.g. eye edema).',
    },

    // Section 5: Clinical Interpretation
    clinicalInterpretation: {
      title: 'Detailed Clinical Interpretation',
      gcs15:
        '<strong>GCS 15 (E4V5M6):</strong> Normal consciousness, fully awake and oriented. Patient responds appropriately. Rules out severe TBI but not minor injuries (skull fractures, small subdural hemorrhages).',
      mild:
        '<strong>GCS 13-14 (Mild TBI):</strong> Mild confusion, possible post-traumatic amnesia. Cranial CT indicated if: loss of consciousness, amnesia, vomiting, age &gt;65, severe headache, anticoagulants (NICE Head Injury Guidelines). Prognosis: complete recovery &gt;95% cases. Post-concussion syndrome 10-20%: headache, dizziness, persistent concentration disturbances 3-12 months.',
      moderate:
        '<strong>GCS 9-12 (Moderate TBI):</strong> Lethargy, obtundation, marked confusion. Mandatory cranial CT. ICU indications: GCS deterioration, CT lesions (contusions, hematomas), skull base fracture. Monitoring q1-2h. Prognosis: good recovery 60-80%, moderate disability 10-20%, mortality ~5-10%.',
      severe:
        '<strong>GCS 3-8 (Severe TBI/Coma):</strong> Coma, inability to protect airways, compromised reflexes. <strong>Emergency:</strong> immediate intubation (airway protection, PaCO2 control target 35-40 mmHg), urgent cranial CT, neurosurgical ICU admission. ICP (intracranial pressure) monitoring if GCS <=8. Prognosis: mortality 30-50%, persistent vegetative state 5-10%, severe disability 20-30%, good recovery only 10-20%.',
      gcs3:
        '<strong>GCS 3 (E1V1M1):</strong> Deepest coma, poor prognosis. Possible brain death if absent brainstem reflexes (pupillary, corneal, oculocephalic, cough). Apnea test and EEG for brain death confirmation. Consider care limitation after family discussion if neurological recovery prognosis &lt;1%.',
    },

    // Section 6: Clinical Applications
    clinicalApplications: {
      title: 'Clinical Applications of GCS',
      triage:
        '<strong>1. Emergency Triage and Immediate Decisions:</strong> GCS <=8 -> emergency intubation (airway protection, ventilation control). GCS 9-12 -> close observation, cranial CT, possible ICU. GCS >=13 -> complete assessment, CT if indicated, possible discharge with head injury instructions.',
      monitoring:
        '<strong>2. Neurological Deterioration Monitoring:</strong> ?GCS >=2 points in 1-2h -> ALERT neurological deterioration. Causes: expanding hematoma (epidural, subdural), cerebral edema, transtentorial herniation, intracranial hypertension, acute hydrocephalus. Action: urgent cranial CT, neurosurgical consultation, consider decompressive craniotomy.',
      prognosis:
        '<strong>3. TBI Outcome Prognosis:</strong> GCS at 3-8h post-trauma strong predictor of 6-12 month outcome. GCS 3-5 -> mortality ~70%, favorable recovery &lt;5%. GCS 6-8 -> mortality ~40%, favorable recovery ~20%. GCS 9-12 -> mortality ~10%, favorable recovery ~70%. Integration with age, pupils, CT Marshall score improves prediction.',
      research:
        '<strong>4. Research and Standardization:</strong> GCS is inclusion/exclusion criteria for TBI trials. Standardized classification enables international study comparison. CRASH database (Corticosteroid Randomization After Significant Head Injury) 10,000+ patients uses GCS as primary outcome.',
    },

    // Section 7: Reference Values
    referenceValues: {
      title: 'Reference Values and Critical Alerts',
      classification:
        '<strong>WHO/NIH TBI Classification:</strong> Mild GCS 13-15 (80% TBI cases), Moderate GCS 9-12 (10%), Severe GCS 3-8 (10%). Mortality: mild &lt;1%, moderate 5-10%, severe 30-50%.',
      criticalAlerts:
        '<strong>CRITICAL GCS ALERTS:</strong> (1) GCS <=8 -> immediate intubation + ventilation, (2) ?GCS >=2 points -> urgent cranial CT + neurosurgery, (3) GCS 3 + bilateral fixed pupils -> poor prognosis, imminent brain death, (4) GCS 15 -> CT if even brief loss of consciousness (NICE guidelines).',
      limitations:
        '<strong>GCS Limitations:</strong> Intubated patients -> Verbal score not assessable (note GCS_T, max=10). Sedation/drugs -> alters score (suspend before assessment when possible). Orbital edema -> Eye not assessable (GCS_C). Aphasia -> reduced Verbal not from coma. Paralysis -> reduced Motor. Integration with pupils, brainstem reflexes, imaging necessary for complete diagnosis.',
    },

    // Section 8: Documentation
    documentation: {
      title: 'Documentation and Guidelines',
      nice:
        '<strong>NICE Head Injury Guidelines (2023):</strong> UK evidence-based recommendations for head trauma management. Cranial CT indications: GCS &lt;13 initial, GCS &lt;15 at 2h, suspected open/depressed skull fracture, signs of skull base fracture, post-traumatic seizures, focal neurological deficits, &gt;1 vomiting episode, amnesia of events &gt;30min pre-trauma. Anticoagulants/antiplatelets -> CT always even if GCS 15.',
      btf:
        '<strong>Brain Trauma Foundation Guidelines (2016):</strong> US severe TBI management standards. GCS <=8 -> ICP monitoring (intracranial pressure, target &lt;22 mmHg), CPP (cerebral perfusion pressure 60-70 mmHg), maintain PaCO2 35-40 mmHg (avoid prolonged hyperventilation -> ischemia), osmotherapy (mannitol/hypertonic saline) if ?ICP, decompressive craniotomy if refractory ICP. Avoid hypotension (systolic BP &gt;90 mmHg), hypoxia (SatO2 &gt;90%), hypothermia (normothermia target).',
      who:
        '<strong>WHO TBI Severity Classification (2008):</strong> Mild (GCS 13-15), Moderate (9-12), Severe (3-8). Also includes loss of consciousness (LOC) duration and post-traumatic amnesia (PTA) as auxiliary criteria. Mild: LOC 0-30min, PTA &lt;24h. Moderate: LOC 30min-24h, PTA 1-7 days. Severe: LOC &gt;24h, PTA &gt;7 days.',
      atls:
        '<strong>American College of Surgeons ATLS (2018):</strong> Advanced Trauma Life Support. GCS primary component of trauma triage. Use GCS motor (M) if total unavailable. GCS motor <=5 -> Level I/II trauma center. Pre-Hospital initial GCS + hospital GCS at 6-12h combined predict outcome better than single measurement.',
    },

    // Section 9: Bibliography
    bibliography: {
      title: 'Scientific References',
      teasdale:
        '<strong>Teasdale G, Jennett B. "Assessment of coma and impaired consciousness"</strong> (1974). Lancet 2(7872):81-84. PMID: 4136544. Original GCS study. Validation on 700 patients in coma from trauma/stroke/drugs. Inter-rater reliability ?=0.83. Prediction of mortality/disability outcome.',
      marmarou:
        '<strong>Marmarou A, et al. "Impact of ICP instability and hypotension on outcome"</strong> (1991). J Neurosurg 75:S59-S66. Traumatic Coma Data Bank 1030 severe TBI patients. GCS <=8 + hypotension -> mortality x2. GCS + ICP + age predictive model outcome accuracy 80%.',
      crash:
        '<strong>MRC CRASH Trial Collaborators. "Predicting outcome after TBI"</strong> (2008). BMJ 336(7641):425-429. PMID: 18270239. 10,008 TBI patients 40 countries. GCS, age, pupils independent predictors of 14-day mortality. Validated online prognostic calculator (crash2.lshtm.ac.uk).',
      reith:
        '<strong>Reith FC, et al. "Reliability of GCS in TBI"</strong> (2016). Acta Neurochir 158:123-129. Systematic review of GCS reliability. Inter-rater ?=0.60-0.85 (good). Motor component most reliable (?=0.85) vs Verbal (?=0.65). Training improves concordance +15-20%.',
      msd:
        '<strong>MSD Manuals - Professional: Traumatic Brain Injury.</strong> TBI management chapter. Includes GCS, severity classification, imaging (CT/MRI), ?ICP management, prognosis, rehabilitation. Decision algorithms for intubation, osmotherapy, neurosurgery.',
      sciencedirect:
        '<strong>ScienceDirect Encyclopedia of the Neurological Sciences (2021):</strong> Chapter "Glasgow Coma Scale and Consciousness Assessment". GCS history, consciousness neurophysiology (ARAS, cortex), GCS variants (pediatric, simplified AVPU), limitations, alternatives (Full Outline UnResponsiveness FOUR score).',
    },
  },
};
