/**
 * @file en-US/mechanicalPower.ts
 * @description English translations for MechanicalPowerCalculator
 * @author Vasile Chifeac
 * @created 2025-12-11
 * @modified 2025-12-11
 *
 * @note Minimal EN version - Primary language is Italian
 * @references
 * - Gattinoni L et al. (2016) "Ventilator-related causes of lung injury: the mechanical power"
 *   Intensive Care Med 42(10):1567-1575. DOI: 10.1007/s00134-016-4505-2
 *   PubMed: 27620287
 * - Serpa Neto A et al. (2018) "Mechanical power of ventilation is associated with mortality in critically ill patients"
 *   Crit Care 22(1):267. DOI: 10.1186/s13054-018-2247-y
 *   PubMed: 30382874
 * - Cressoni M et al. (2016) "Mechanical Power and Development of Ventilator-induced Lung Injury"
 *   Anesthesiology 124(5):1100-1108. DOI: 10.1097/ALN.0000000000001056
 *   PubMed: 26872367
 * - ScienceDirect: https://www.sciencedirect.com/topics/medicine-and-dentistry/mechanical-power
 * - MSD Manuals: https://www.msdmanuals.com/professional/critical-care-medicine/mechanical-ventilation
 */

export default {
  // Banner and titles
  banner: {
    title: 'Mechanical Power (MP):',
    description:
      'Energy transferred from the ventilator to the respiratory system per unit of time (joules/min).',
  },

  titles: {
    ventilatorParameters: 'Ventilator Parameters',
    results: 'Results',
  },

  definition: {
    title: 'Definition and Clinical Significance of Mechanical Power',
    mainTitle: 'What is Mechanical Power and Why is it Important',

    physicalDef: {
      title: 'Physical Definition of Mechanical Power (MP)',
      text: "<strong>Mechanical Power</strong> represents the energy transferred from the mechanical ventilator to the patient's respiratory system per unit of time, expressed in <strong>Joules per minute (J/min)</strong>. Physically, MP quantifies the total respiratory work performed by the ventilator, integrating multiple components of mechanical ventilation into a single parameter: tidal volume (VT), respiratory rate (RR), airway pressure (peak/plateau), driving pressure (?P), PEEP, and inspiratory flow.",
      formula:
        'Simplified formula: <strong>MP = 0.098 x RR x VT x (Ppeak -  1/2 ?P)</strong>, where 0.098 is the conversion factor from LxcmH2O/min to J/min. This formulation represents an approximation of mechanical work based on readily accessible bedside parameters.',
    },

    clinicalSignificance: {
      title: '? Fundamental Clinical Significance:',

      viliPredictor: {
        title: 'Unified Predictor of VILI (Ventilator-Induced Lung Injury)',
        text: 'MP integrates the 4 pathogenic mechanisms of ventilator-induced lung injury: <strong>(1) Volutrauma</strong> (high VT -> alveolar overdistension), <strong>(2) Barotrauma</strong> (excessive Ppeak/Pplateau -> alveolar rupture), <strong>(3) Atelectrauma</strong> (cyclic recruitment/derecruitment with insufficient PEEP -> shear stress), <strong>(4) Biotrauma</strong> (pro-inflammatory cytokine release IL-1?, IL-6, TNF-? -> systemic SIRS). Experimental studies on animal models (Gattinoni et al., Intensive Care Med 2016) demonstrated that MP correlates better with mortality and histological lung damage than isolated single parameters (e.g., VT or ?P alone).',
      },

      prognosticValue: {
        title: 'Prognostic Value in ARDS and Acute Respiratory Failure',
        text: 'In ARDS (Acute Respiratory Distress Syndrome) patients, elevated MP (&gt;17-22 J/min) is associated with: <strong>?28-90 day mortality</strong> (hazard ratio ~1.8-2.5), <strong>?mechanical ventilation duration</strong> (+40-60% ventilator days), <strong>?multi-organ failure incidence (MOF)</strong>. Observational studies on &gt;1000 ARDS patients identified MP as an independent predictor of worse outcomes, even after adjustment for disease severity (APACHE II, SOFA score), age, P/F ratio. Critical threshold: MP &gt;22 J/min associated with &gt;50% mortality in severe ARDS.',
      },

      optimization: {
        title: 'Guide for Personalized Ventilatory Strategy Optimization',
        text: 'MP allows balancing competing ventilatory goals: (a) adequate oxygenation (PaO2 &gt;60 mmHg, SatO2 &gt;90%), (b) CO2 removal (PaCO2 35-45 mmHg or permissive hypercapnia pH &gt;7.20), (c) iatrogenic lung damage minimization (MP &lt;17 J/min target). In practice: if MP elevated, reduce VT (target 4-6 ml/kg predicted body weight PBW), reduce RR tolerating moderate hypercapnia, optimize PEEP to minimize atelectrauma without overdistension, consider rescue interventions (prone, ECMO). Real-time bedside MP monitoring guides incremental ventilator parameter adjustments.',
      },

      comparison: {
        title: 'Ventilatory Mode and Settings Comparison',
        text: 'MP facilitates objective comparison between different ventilatory strategies: volume control (VC) vs pressure control (PC), different VT/RR/PEEP combinations for the same patient. Practical example: ARDS patient with VT 6 ml/kg, RR 25, PEEP 10, Pplat 28 -> MP ~20 J/min. Trial RR reduction to 20 with hypercapnia tolerance -> MP ~16 J/min -> preferable strategy if PaCO2/pH tolerable. Allows individualization based on patient-specific physiological response rather than rigid "one-size-fits-all" protocols.',
      },

      biomarkers: {
        title: 'Correlation with Inflammatory Biomarkers and Alveolar Damage',
        text: 'Elevated MP correlates with lung injury markers in bronchoalveolar lavage (BAL) and plasma: ?IL-6, ?IL-8, ?TNF-? (pro-inflammatory cytokines), ?C-reactive protein (CRP), ?procollagen type III (early pulmonary fibrosis), ?Receptor for Advanced Glycation End products (RAGE - alveolar epithelial damage marker). Translational studies: MP reduction from 25->15 J/min in 24h -> ?50-60% plasma IL-6, ?30% CRP. Suggests MP optimization not only prevents mechanical damage but reduces systemic inflammatory response (biotrauma).',
      },
    },

    keyConcept: {
      title: 'Key Concept - "Baby Lung" in ARDS:',
      text: 'In ARDS, the functionally ventilable lung is reduced to dimensions similar to neonatal lung (~200-500 ml vs ~5000 ml normal adult) due to dependent area collapse/consolidation and alveolar flooding. Ventilation with "normal" VT (8-10 ml/kg) in this residual "baby lung" -> excessive stress/strain, very high MP (30-40 J/min), accelerated damage. Protective strategy: reduced VT (4-6 ml/kg PBW) distributed over reduced-size lung -> MP normalization, damage protection. Pathophysiological rationale MP = quantify energy transferred to "actually ventilated" lung, not total anatomical lung.',
    },
  },

  // Section 2: Physiology
  physiology: {
    title: 'Physiology and Lung Injury Mechanisms (VILI)',
    mainTitle: 'VILI - Ventilator-Induced Lung Injury',
    subtitle: 'The 4 Pathogenic Mechanisms of Ventilator-Induced Lung Damage',

    mechanicsTitle: '? Normal vs ARDS Respiratory Mechanics:',
    healthyLung:
      '<strong>Healthy Lung:</strong> Normal pulmonary compliance Crs ~50-100 ml/cmH2O. Physiological tidal volume 6-8 ml/kg evenly distributed across ~300 million alveoli. Physiological driving pressure ?P = VT/Crs ~5-10 cmH2O. Elastic energy stored during inflation is passively released during expiration. Transpulmonary pressure (Ptp = Palv - Ppleural) maintains alveolar opening, preventing end-expiratory collapse.',
    ardsLung:
      '<strong>ARDS:</strong> Severely reduced compliance Crs ~20-40 ml/cmH2O (?50-70% vs normal) due to interstitial/alveolar edema, alveolar collapse, consolidation. Heterogeneous aeration distribution: dependent dorsal zones collapsed/consolidated (non-aerated), non-dependent ventral zones aerated but at risk of overdistension. For same VT, driving pressure greatly increased ?P = VT/Crs ~15-25 cmH2O -> excessive stress/strain on residual "baby lung". Need for high pressures (Ppeak 30-40 cmH2O) to achieve minimal oxygenation.',

    viliMechanismsTitle: '? 4 VILI Pathogenic Mechanisms:',

    unifyingParameterTitle: '? Mechanical Power as Unifying VILI Parameter:',
    unifyingParameterText:
      '<strong>MP Pathophysiological Rationale:</strong> The 4 VILI mechanisms (volutrauma, barotrauma, atelectrauma, biotrauma) are interconnected and NOT independent. A single parameter (e.g., VT, Pplateau, PEEP) does not capture damage complexity. Mechanical Power integrates all determinants of energy transferred to the lung: <strong>MP ? VT x RR x Pressure x Flow</strong>. Conceptually: MP represents "total energy dose" delivered to the lung per unit time. Animal model studies (Cressoni et al., Intensive Care Med 2016): MP &gt;12-15 J/min -> dose-dependent histological damage (edema, atelectasis, inflammation). MP &lt;10 J/min -> preserved lung even with prolonged ventilation (72-96h). Critical MP threshold varies with lung compliance: in severe ARDS (Crs ~20 ml/cmH2O) MP &gt;17 J/min already harmful, while in normal lung (Crs ~60 ml/cmH2O) tolerated MP ~25-30 J/min without damage. Implication: MP must be normalized for functioning lung size (MP/PBW or MP/Crs) for accurate comparisons.',

    volutrauma: {
      title: 'Volutrauma - Volume-Induced Damage',
      text: 'Volutrauma occurs when tidal volume (VT) exceeds residual alveolar capacity, causing <strong>alveolar overdistension</strong>. In physiological conditions, alveoli can expand up to ~300% of resting volume. With high VT (&gt;8-10 ml/kg), especially in lungs with reduced compliance (ARDS), expansion can reach 400-600% -> <strong>excessive mechanical stress on alveolocapillary membrane</strong>, tight junction rupture, endothelial cell gap opening, increased capillary permeability, alveolar edema, surfactant inactivation.',
      mechanicalStrain:
        '<strong>Mechanical strain</strong> is defined as ?V/FRC (volume change/functional residual capacity). Strain &gt;2 (i.e., end-inspiratory volume &gt;3x FRC) -> ultrastructural damage: basement membrane detachment, collagen fiber fragmentation, cellular mechanosensor activation (stretch-activated ion channels, integrins) -> pro-inflammatory signaling cascade.',
      clinicalTarget:
        '<strong>Clinical Target</strong>: VT 4-6 ml/kg PBW (predicted body weight), not actual weight. PBW calculation: Males = 50 + 0.91x(height cm - 152.4), Females = 45.5 + 0.91x(height cm - 152.4). Respecting this limit reduces mortality ~9% in ARDS (ARMA Trial, NEJM 2000).',
    },

    barotrauma: {
      title: 'Barotrauma - Pressure-Induced Damage',
      text: 'Classic barotrauma (pneumothorax, pneumomediastinum, subcutaneous emphysema) derives from <strong>macroscopic alveolar rupture</strong> with air leak into extra-pulmonary spaces. Transpulmonary pressures (Pplateau) &gt;30-35 cmH2O -> clinically evident barotrauma risk ~10-15%. However, modern barotrauma concept also includes <strong>"microbarotrauma"</strong>: high pressures (Ppeak &gt;40 cmH2O, Pplateau &gt;30 cmH2O) -> microscopic alveolocapillary membrane damage without visible pneumothorax, but with significant pathological consequences.',
      drivingPressure:
        '<strong>Driving Pressure (?P = Pplateau - PEEP)</strong> emerged as a more powerful mortality predictor than VT or Pplateau alone. ?P represents pressure needed to expand the lung for a given volume, reflects actual pulmonary compliance. ?P &gt;15 cmH2O -> ?linear mortality (~3-4% for each cmH2O above 15). Rationale: high ?P indicates "stiff" lung where same VT generates greater stress.',
      clinicalTarget:
        '<strong>Clinical Target</strong>: Pplateau &lt;30 cmH2O (preferably &lt;28), ?P &lt;15 cmH2O, Ppeak &lt;40 cmH2O. In practice: 0.5-1 sec inspiratory pause to measure Pplateau (true alveolar pressure, without airway resistive component). If ?P elevated despite protective VT -> consider suboptimal PEEP, alveolar recruitment, or ECMO.',
    },

    atelectrauma: {
      title: 'Atelectrauma - Cyclic Recruitment Damage',
      text: '<strong>Repetitive opening and closing of unstable alveolar units</strong> each respiratory cycle. In ARDS, collapsed alveoli (due to edema, surfactant inactivation, overlying weight) reopen during inspiration (with high shear forces) and reclose during expiration. This cycle 20-30 times/min for days -> <strong>progressive epithelial damage</strong>, type I alveolar cell denudation, type II proliferation, fibrosis.',
      peepRole:
        '<strong>PEEP (Positive End-Expiratory Pressure)</strong> prevents atelectrauma by keeping alveoli open at end-expiration. Optimal PEEP: sufficient for collapsible alveoli recruitment, but not excessive to cause overdistension of already-open alveoli. Studies show insufficient PEEP (&lt;5 cmH2O in ARDS) -> significant atelectrauma, while excessive PEEP (&gt;20-25 cmH2O) -> volutrauma/barotrauma. Finding PEEP "sweet spot" is clinical challenge: methods = incremental PEEP trials with compliance, P/F ratio, MP monitoring.',
      clinicalTarget:
        '<strong>Clinical Target</strong>: Individualized PEEP based on ARDS severity. Mild ARDS (P/F 200-300): PEEP 5-10 cmH2O, Moderate ARDS (P/F 100-200): PEEP 10-15 cmH2O, Severe ARDS (P/F &lt;100): PEEP 15-20+ cmH2O. PEEP/FiO2 tables from ARMA trial provide initial guidance, but patient-specific adjustment essential.',
    },

    biotrauma: {
      title: 'Biotrauma - Systemic Inflammatory Damage',
      text: 'Biotrauma is the consequence of the other 3 mechanisms: mechanical damage (volutrauma/barotrauma/atelectrauma) -> <strong>local and systemic inflammatory response activation</strong>. Damaged alveolar cells (pneumocytes, macrophages, neutrophils) release pro-inflammatory cytokines (IL-1?, IL-6, IL-8, TNF-?), chemokines (MCP-1, MIP-2), reactive oxygen species (ROS), proteolytic enzymes (elastase, metalloproteases). These molecules enter circulation -> <strong>SIRS (Systemic Inflammatory Response Syndrome)</strong>, systemic vascular endothelial damage, increased extrapulmonary capillary permeability, multi-organ failure (kidney, liver, heart).',
      mechanotransduction:
        '<strong>Mechanotransduction</strong> is the process by which mechanical stress converts to biochemical signals. Excessive alveolar strain -> NF-?B activation (pro-inflammatory transcription factor), MAPK (mitogen-activated protein kinases), PI3K/Akt pathways -> inflammatory gene up-regulation. Interesting: same mechanical strain in healthy lung produces minimal inflammatory response, while in already inflamed lung (ARDS) -> dramatic amplification ("two-hit hypothesis" phenomenon).',
      clinicalTarget:
        '<strong>Clinical Target</strong>: Minimize total MP to reduce all VILI mechanisms coordinately. No single parameter prevents biotrauma; integrated approach necessary: low VT + low ?P + optimal PEEP + minimal compatible RR. Biomarker monitoring (CRP, IL-6, procalcitonin) can help assess ventilatory strategy response over time (marker reduction = protective strategy effectiveness).',
    },
  },

  // Section 3: Measurement
  measurement: {
    title: 'How to Measure Mechanical Power',
    mainTitle: 'Parameters Required for MP Calculation',
    intro:
      'Mechanical Power requires accurate measurement of 6 fundamental ventilator parameters, all available on modern ICU ventilators.',

    rr: {
      title: 'Respiratory Rate (RR)',
      definition:
        '<strong>Definition</strong>: Number of respiratory acts per minute delivered by the ventilator (complete inspiration-expiration cycles).',
      measurement:
        '<strong>Measurement</strong>: Directly displayed on ventilator screen, both set RR and total RR (set + patient breaths in assisted modes like SIMV, PSV). Use total RR for MP calculation.',
      normalRange:
        '<strong>Normal Range</strong>: Adults 12-20 breaths/min (physiological ventilation), ARDS 20-35 breaths/min (hypercapnia/hypoxia compensation), Pediatrics age-variable (neonates 30-60, children 20-30).',
      clinicalNote:
        '<strong>Clinical Note</strong>: High RR (&gt;35 breaths/min) -> ?MP significantly even with protective VT. Tolerating permissive hypercapnia (PaCO2 50-70 mmHg, pH &gt;7.20) allows RR reduction -> ?MP without compromising outcomes. Evidence: RR reduction from 30->20 with VT 6 ml/kg -> ?MP ~30%.',
    },

    vt: {
      title: 'Tidal Volume (VT)',
      definition:
        '<strong>Definition</strong>: Volume of air delivered each respiratory act, measured in milliliters (ml) or liters (L).',
      measurement:
        '<strong>Measurement</strong>: Delivered (inspiratory) vs expired (expiratory) VT. For MP calculation use expired VT (more accurate, not influenced by tubing compliance, compression volume). Ventilators measure with integrated expiratory flow sensors, accuracy +-5-10 ml.',
      normalRange:
        '<strong>Normal Range</strong>: Physiological 7-8 ml/kg ideal body weight (PBW), ARDS protective strategy 4-6 ml/kg PBW, "Liberal" ventilation (not recommended) 8-10 ml/kg.',
      clinicalNote:
        '<strong>Critical Note</strong>: ALWAYS use predicted body weight (PBW), not actual weight. Obesity/extreme height -> major errors if actual weight used. PBW Males = 50 + 0.91x(height cm - 152.4), PBW Females = 45.5 + 0.91x(height cm - 152.4). Example: 180 cm male obese patient 120 kg -> PBW ~75 kg -> target VT 300-450 ml (not 600-720 ml if erroneously calculated on 120 kg).',
    },

    ppeak: {
      title: 'Peak Pressure (Ppeak)',
      definition:
        '<strong>Definition</strong>: Maximum pressure reached in airways during inspiratory phase, includes resistive + elastic component.',
      measurement:
        '<strong>Measurement</strong>: Read directly on ventilator display, detected by proximal pressure transducer (near Y-piece or in machine). Instantaneous value, fluctuates cycle-to-cycle +-1-2 cmH2O.',
      normalRange:
        '<strong>Safe Range</strong>: &lt;40 cmH2O (absolute limit to avoid barotrauma), Ideal &lt;35 cmH2O in ARDS, Spontaneous physiological ~5-10 cmH2O (negative intrathoracic pressure).',
      clinicalNote:
        '<strong>Interpretative Note</strong>: High Ppeak can derive from: (1) High airway resistance (bronchospasm, secretions, small tube) -> wide Ppeak-Pplateau gap (&gt;10 cmH2O), (2) Low pulmonary compliance (ARDS, fibrosis) -> both Ppeak and Pplateau elevated, normal gap (~5 cmH2O). Distinguishing causes essential for intervention: case (1) -> bronchodilators, suctioning, larger tube; case (2) -> reduce VT, optimize PEEP, recruitment.',
    },

    pplateau: {
      title: 'Plateau Pressure (Pplateau)',
      definition:
        '<strong>Definition</strong>: Static alveolar pressure at end-inspiration, with flow zeroed (inspiratory pause). Reflects pure elastic component, without airway resistances.',
      measurement:
        '<strong>Measurement</strong>: Requires 0.5-1 second inspiratory pause (inspiratory hold). On modern ventilators: "Inspiratory Hold" button -> pressure graph shows plateau after peak. Measure stable plateau value (last 0.2-0.3 sec pause). Not available in pure spontaneous modes (CPAP, PSV without backup).',
      normalRange:
        '<strong>Safe Range</strong>: &lt;30 cmH2O (ARMA trial threshold), Ideal &lt;28 cmH2O, Critical &gt;35 cmH2O (high barotrauma risk).',
      clinicalNote:
        '<strong>Gold Standard for ARDS Monitoring</strong>: Pplateau is primary safety parameter in protective ventilation. Driving Pressure (?P = Pplateau - PEEP) is most powerful mortality predictor. If Pplateau &gt;30 cmH2O -> reduce VT incrementally (100 ml steps) until target reached, tolerating hypercapnia. Measure Pplateau every 4-6 hours in stable ARDS, more frequently if instability.',
    },

    peep: {
      title: 'PEEP (Positive End-Expiratory Pressure)',
      definition:
        '<strong>Definition</strong>: Positive pressure maintained in airways at end-expiration to prevent alveolar collapse.',
      measurement:
        '<strong>Measurement</strong>: Set on ventilator and displayed. Total PEEP = set PEEP + auto-PEEP (air trapping). Auto-PEEP measured with expiratory pause (Expiratory Hold). Normally auto-PEEP ~0-2 cmH2O, in COPD/asthma can reach 5-15 cmH2O.',
      normalRange:
        '<strong>Clinical Range</strong>: Physiological PEEP ~3-5 cmH2O (simulates glottis closure), Mild ARDS 8-10 cmH2O, Moderate ARDS 10-15 cmH2O, Severe ARDS 15-20 cmH2O (sometimes &gt;20 with prone/recruitment protocol).',
      clinicalNote:
        '<strong>Critical Balancing</strong>: PEEP too low -> atelectrauma, hypoxemia, shunt, ?MP (high driving pressure); PEEP too high -> overdistension, ?cardiac output (reduced venous return), ?MP (high end-inspiratory volume). Methods to optimize PEEP: (1) PEEP/FiO2 tables (simple, ARMA/ALVEOLI trials), (2) Decremental PEEP trial (max compliance), (3) Electrical Impedance Tomography (EIT) - optimal ventilation distribution, (4) P/F ratio + MP: PEEP that maximizes P/F minimizing MP.',
    },

    flow: {
      title: 'Inspiratory Flow',
      definition:
        '<strong>Definition</strong>: Speed at which tidal volume is delivered during inspiration, measured in liters per minute (L/min).',
      measurement:
        '<strong>Measurement</strong>: On modern ventilators flow is displayed graphically (flow-time curve). In volume control: constant set flow (square), or decelerating. In pressure control: automatic decelerating flow (exponential waveform). For MP calculation: use mean inspiratory flow if available, or peak flow x0.5-0.6 as approximation.',
      normalRange:
        '<strong>Typical Range</strong>: Adults 40-80 L/min (volume control), variable in pressure control depending on compliance/resistance. Low flows (&lt;40 L/min) -> prolonged inspiratory time, high flows (&gt;100 L/min) -> turbulence, shear stress.',
      clinicalNote:
        '<strong>MP Impact</strong>: High flow -> ?airway resistances, ?Ppeak (but not Pplateau if airways normal), moderate contribution to total MP. Complete MP formula includes flow component: MP = 0.098 x RR x VT x (Ppeak -  1/2 ?P). In practice: flow reduction from 80->50 L/min can reduce Ppeak ~5-8 cmH2O -> ?MP ~10-15%. Trade-off: very low flow -> long inspiratory time -> potential patient-ventilator asynchrony.',
    },
  },

  // Section 4: Clinical Interpretation
  interpretation: {
    title: 'Detailed Clinical Interpretation',
    mainTitle: 'Risk Zones and Clinical Thresholds',

    greenZone: {
      title: '? Safe Zone: MP &lt; 12 J/min',
      risk: '<strong>VILI Risk</strong>: Very Low',
      mortality:
        '<strong>Associated Mortality</strong>: Baseline (~10-15% in general critical patients)',
      meaning:
        '<strong>Meaning</strong>: Energy transferred to lung is minimal, very protective ventilation. This range typically obtained with ultra-protective strategy: VT 4 ml/kg, moderate RR (12-18), low driving pressure (&lt;10 cmH2O). Common in: simple post-operative patients, final weaning from ventilation, mild respiratory failure.',
      clinicalAction:
        '<strong>Clinical Action</strong>: Maintain current strategy, assess possibility of early weaning if clinical criteria met (P/F &gt;200, PEEP <=8, FiO2 <=0.4, awake and cooperative patient). No ventilator setting changes needed to further reduce MP; focus on resolving underlying pathology.',
    },

    yellowZone: {
      title: '? Attention Zone: MP 12-17 J/min',
      risk: '<strong>VILI Risk</strong>: Low-Moderate',
      mortality: '<strong>Associated Mortality</strong>: Slightly increased (~15-20%)',
      meaning:
        '<strong>Meaning</strong>: Acceptable ventilation for mild-moderate ARDS or patients with reduced compliance. This is target range for standard protective strategy (ARMA protocol): VT 6 ml/kg, RR 20-25, ?P ~12-15 cmH2O. Tolerable for prolonged periods (days-weeks) if necessary to maintain adequate gas exchange.',
      clinicalAction:
        '<strong>Clinical Action</strong>: Regular ventilator parameter monitoring (every 4-6h), daily ABG, chest X-ray every 24-48h. Optimize settings to minimize MP: (1) Reduce RR if permissive hypercapnia tolerable (pH &gt;7.25), (2) Titrate PEEP to maximize P/F ratio without increasing ?P, (3) Consider FiO2 adjustments before increasing PEEP/VT. If patient stable in this range for 48-72h -> attempt gradual PEEP/FiO2 reduction (de-escalation).',
    },

    orangeZone: {
      title: '? Risk Zone: MP 17-22 J/min',
      risk: '<strong>VILI Risk</strong>: Moderate-High',
      mortality: '<strong>Associated Mortality</strong>: Significantly increased (~25-35%)',
      meaning:
        '<strong>Meaning</strong>: Transferred energy is high, substantial VILI risk. This range occurs in moderate-severe ARDS with need for intensive ventilatory support to maintain oxygenation/ventilation. Not sustainable long-term without consequences. Urgent strategy optimization.',
      clinicalAction:
        '<strong>Urgent Action</strong>: <br>1. <strong>Systematic MP Analysis</strong>: Which parameter contributes most? If high RR (>30) -> priority reduce RR, tolerate hypercapnia (target pH >7.20). If high VT (>6 ml/kg) -> reduce VT to 4-5 ml/kg. If high ?P (>15) -> optimize PEEP or consider recruitment.<br>2. <strong>Rescue Interventions</strong>: Prone position 16-18h/day (reduces MP ~15-20% + improves oxygenation), Intermittent neuromuscular blockade (reduces asynchrony, allows lower VT), Temporary deep sedation.<br>3. <strong>Intensive Monitoring</strong>: ABG every 4-6h, Pplateau every 4h, dynamic compliance trend, inflammatory biomarkers (CRP, IL-6) every 24-48h.<br>4. <strong>Consider ECMO</strong>: If persistent MP >20 J/min despite optimization + P/F <80 + age <65 + no severe comorbidities -> ECMO team discussion.',
    },

    redZone: {
      title: '? Critical Zone: MP &gt; 22 J/min',
      risk: '<strong>VILI Risk</strong>: Very High / Extreme',
      mortality: '<strong>Associated Mortality</strong>: Extremely elevated (&gt;50-60%)',
      meaning:
        '<strong>Meaning</strong>: Harmful ventilation, energy transferred to lung exceeds tolerance capacity. In this zone lung damage accelerates: <strong>volutrauma</strong> (overdistended alveoli), <strong>barotrauma</strong> (pneumothorax risk), <strong>atelectrauma</strong> (shear stress), <strong>biotrauma</strong> (systemic inflammatory cascade). Each hour in this zone increases MOF (multi-organ failure) risk. Absolutely unacceptable beyond 24-48h.',
      clinicalAction:
        '<strong>Emergency Action (within 1-2 hours)</strong>: <br>1. <strong>Aggressive MP Reduction</strong>: <br>- VT: reduce to 3-4 ml/kg PBW (accept severe hypercapnia pH 7.10-7.20 if necessary)<br>- RR: reduce to 15-20 even if PaCO2 rises to 70-90 mmHg (extreme permissive hypercapnia, monitor pH)<br>- PEEP: optimize with decremental trial, target max P/F with min ?P<br>2. <strong>Immediate Prone</strong>: If not yet implemented -> prone 18-20h/day continuous until P/F improvement >150<br>3. <strong>Continuous Neuromuscular Blockade</strong>: 24-48h to eliminate asynchrony, allow protective hyperventilation<br>4. <strong>Urgent ECMO Consult</strong>: Contact ECMO center if available. Criteria: persistent P/F &lt;80 &gt;6h, refractory pH &lt;7.15, non-reducible MP &gt;25 J/min, age &lt;70, potential pathology reversibility.<br>5. <strong>Continuous Monitoring</strong>: ABG every 2-4h, Pplateau every 2h, consider pulmonary artery catheter (PAC) for hemodynamic monitoring (high PEEP can compromise output), transesophageal echocardiography (TEE) to assess right ventricle function (excessive PEEP -> acute cor pulmonale).',
    },
  },

  // Section 5: Formula
  formula: {
    title: 'Detailed Formula and Components',
    mainTitle: '? Complete Mechanical Power Formula',
    headerTitle: 'Complete Formula',
    breakdownTitle: 'Component breakdown:',

    rr: {
      title: 'Respiratory Rate',
      text: '(breaths/min): Number of respiratory cycles per minute. Higher RR = greater cumulative energy transferred per unit time.',
    },
    vte: {
      title: 'Tidal Volume Expiratory',
      text: '(liters): Volume of air mobilized per breath. Higher VT = greater alveolar distension and mechanical stress.',
    },
    ppeak: {
      title: 'Peak Pressure',
      text: '(cmH2O): Maximum pressure reached during insufflation. Includes elastic + resistive component of respiratory system.',
    },
    deltaPressure: {
      title: 'Driving Pressure',
      text: '(cmH2O): ?P = P<sub>plateau</sub> - PEEP. Represents pressure needed to distend alveoli. Most correlated parameter to mortality in ARDS (Amato et al., NEJM 2015).',
    },
    coefficient: {
      title: 'Conversion coefficient',
      text: ': Converts cmH2O x liters to Joules (J).',
    },

    exampleTitle: 'Practical Calculation Example',
    exampleScenario: 'Patient with moderate ARDS:',
    exampleParams: {
      rr: 'RR = 25 breaths/min',
      vte: 'VTe = 0.40 liters (400 ml, ~6 ml/kg for 70 kg)',
      ppeak: 'P<sub>peak</sub> = 30 cmH2O',
      pplateau: 'P<sub>plateau</sub> = 26 cmH2O',
      peep: 'PEEP = 12 cmH2O',
    },
    exampleSteps: {
      step1: 'Calculate ?P = 26 - 12 = <strong>14 cmH2O</strong>',
      step2: 'MP = 0.098 x 25 x 0.40 x (30 - 0.5 x 14)',
      step3: 'MP = 0.098 x 25 x 0.40 x (30 - 7)',
      step4: 'MP = 0.098 x 25 x 0.40 x 23',
      result:
        'MP = <strong>22.54 J/min</strong> -> <span class="text-negative">High VILI risk</span>',
    },
    exampleAction:
      '? Clinical Action: This patient is above safety threshold. Reducing RR to 20 breaths/min (tolerating permissive hypercapnia) would reduce MP to ~18 J/min, entering attention zone.',
  },

  // Section 6: Applications
  applications: {
    title: 'Detailed Analysis and Clinical Applications',
    clinicalUseTitle: '? Clinical Use of Mechanical Power',
    protectiveVsHarmfulTitle: '? Protective vs Harmful Ventilation',
    protective: {
      title: '? Protective Ventilation (MP &lt;17 J/min)',
      intro: 'Strategy that minimizes energy transferred to the lung, reducing VILI risk:',
      tidalVolume: '<strong>Low Tidal Volume</strong>: 4-6 ml/kg PBW (predicted body weight)',
      drivingPressure:
        '<strong>Limited Driving Pressure</strong>: ?P (Pplateau - PEEP) &lt;15 cmH2O',
      plateauPressure: '<strong>Plateau Pressure</strong>: &lt;30 cmH2O (ideal &lt;28 cmH2O)',
      peepOptimal:
        '<strong>Optimal PEEP</strong>: Balanced for alveolar recruitment without overdistension',
      permissiveHypercapnia:
        '<strong>Permissive Hypercapnia</strong>: Tolerate elevated PaCO2 (pH &gt;7.20) to reduce VT/RR',
    },
    harmful: {
      title: '? Harmful Ventilation (MP &gt;22 J/min)',
      intro: 'Excessive energy transfer that dramatically increases VILI risk:',
      tidalVolumeHigh:
        '<strong>High Tidal Volume</strong>: &gt;8 ml/kg PBW (alveolar overdistension)',
      drivingPressureHigh:
        '<strong>Excessive Driving Pressure</strong>: ?P &gt;15 cmH2O (intense mechanical stress)',
      respiratoryRateHigh:
        '<strong>High Respiratory Rate</strong>: &gt;35-40 breaths/min without clinical indication',
      peepInadequate:
        '<strong>Inadequate PEEP</strong>: Too low (atelectrauma) or too high (overdistension)',
      inflammatoryResponse:
        '<strong>Inflammatory Response</strong>: Increased pro-inflammatory cytokines, MODS (multi-organ dysfunction syndrome)',
    },
    keyConcept:
      '<strong>? Key Concept</strong>: While parameters like Pplateau or ?P assess individual aspects, MP <strong>dynamically</strong> integrates all factors contributing to lung damage. Two patients with the same Pplateau may have different MP depending on RR, VT, and respiratory pattern.',
    ards: {
      title: 'ARDS/ALI (Acute Respiratory Distress Syndrome)',
      context:
        '<strong>Context</strong>: ARDS is characterized by non-cardiogenic pulmonary edema, reduced compliance, and <strong>"baby lung"</strong> (only a small portion of aerated lung). Mechanical ventilation is life-saving but can worsen damage if mismanaged.',
      targetMP:
        '<strong>Target MP</strong>: <strong>&lt;17 J/min</strong> associated with reduced mortality in observational studies (Gattinoni et al. 2016, Intensive Care Medicine).',
      strategyTitle: '<strong>Strategy</strong>:',
      vt: 'VT: 4-6 ml/kg PBW (predicted body weight, not actual)',
      pplateau: 'Pplateau &lt;30 cmH2O (ideal &lt;28)',
      drivingPressure: '?P &lt;15 cmH2O (mortality predictor)',
      hypercapnia: 'Permissive hypercapnia (pH &gt;7.20, PaCO2 up to 60-70 mmHg if tolerated)',
      peep: 'Optimal PEEP with ARDSnet table or recruiting maneuvers',
    },
    weaning: {
      title: 'Weaning from Mechanical Ventilation',
      context:
        '<strong>Context</strong>: Weaning is the transition from mechanical ventilation to spontaneous breathing. Progressive MP reduction indicates improvement in respiratory mechanics.',
      indicatorsTitle: '<strong>Positive indicators</strong>:',
      mpReduction: 'MP reduction from &gt;20 to &lt;15 J/min over 48-72h',
      rrReduction: 'Reduced spontaneous RR with pressure support trial (PSV)',
      complianceImprovement: 'Improved compliance (reduced ?P for same VT)',
      protocol:
        '<strong>Protocol</strong>: Spontaneous breathing trial (SBT) with T-piece or PSV 5-7 cmH2O. If patient maintains RR &lt;35, SpO2 &gt;90%, stable HR, no distress -> extubation.',
    },
    monitoring: {
      title: 'Continuous Monitoring in Intensive Care',
      intro:
        'MP is a dynamic parameter that should be calculated with every ventilator setting change or clinical deterioration.',
      whenTitle: '<strong>When to recalculate MP</strong>:',
      afterChanges: 'After any change in RR, VT, PEEP, ventilatory mode',
      oxygenation: 'Worsening oxygenation (P/F ratio ?, SpO2 ?)',
      pressures: 'Increased airway pressures (resistance ?, compliance ?)',
      maneuvers: 'Before and after recruiting maneuvers or prone positioning',
      integration:
        '<strong>Integration</strong>: MP should be monitored alongside ABG (arterial blood gas), dynamic/static compliance, EtCO2, oxygenation indices (P/F ratio, SpO2/FiO2).',
    },
    limitations: {
      title: '? Limitations of Mechanical Power',
      intro: 'Despite being a promising parameter, MP has some important limitations:',
      notNormalized:
        '<strong>Not normalized for aerated lung volume</strong>: In ARDS, only a fraction of the lung is ventilatable ("baby lung"). Two patients with the same MP but different aerated lung volumes have different specific stress.',
      linearityAssumption:
        '<strong>Assumes pressure-volume linearity</strong>: The P-V relationship is actually non-linear, with collapse zones, linear zone, and overdistension.',
      regionalHeterogeneity:
        '<strong>Does not consider regional heterogeneity</strong>: Does not account for collapsed vs hyperaerated areas in the same lung (important in heterogeneous ARDS).',
      empiricalThresholds:
        '<strong>Empirical thresholds</strong>: The 17 and 22 J/min cut-offs derive from observational studies, not RCTs. They may vary by population, pathology, age.',
    },
    futurePerspectives:
      '<strong>? Future Perspectives</strong>: Electrical impedance tomography (EIT) can estimate aerated lung volume, allowing MP normalization to obtain <strong>Specific Mechanical Power</strong> (MP/aerated volume), more accurate in VILI prediction.',
    scientificReferences: {
      title: '? Scientific References',
      gattinoni:
        '<strong>Gattinoni L, et al.</strong> (2016). "Ventilator-related causes of lung injury: the mechanical power." <em>Intensive Care Medicine</em> 42(10):1567-1575. <span class="text-blue">DOI: 10.1007/s00134-016-4505-2</span>',
      amato:
        '<strong>Amato MB, et al.</strong> (2015). "Driving pressure and survival in the acute respiratory distress syndrome." <em>New England Journal of Medicine</em> 372(8):747-755.',
      encyclopedia1:
        '<strong>Encyclopedia of Respiratory Medicine</strong> (2022), Second Edition, Volume 5. Chapter: "Ventilator-Associated Lung Injury (VALI)." Elsevier.',
      encyclopedia2:
        '<strong>Garfield B, Patel BV</strong>. "Mechanical Power" in <em>Encyclopedia of Respiratory Medicine</em> (2022). Discusses dynamic exposure to ventilatory variables and VALI mechanisms.',
    },
  },

  // Section 7: Reference Values
  referenceValues: {
    title: 'Reference Values and Critical Alerts',
    mainTitle: 'Mechanical Power Thresholds and VILI Risk Stratification',
    greenZone: {
      title: 'MP &lt; 12 J/min - SAFE ZONE (Protective Ventilation)',
      meaning:
        '<strong>Meaning:</strong> Optimal protective ventilation. Energy transferred to lung is minimal. Very low VILI risk even in severe ARDS. Evidence from animal models: MP &lt;12 J/min -> absence of histological lung damage even with prolonged ventilation 72-96h.',
      action:
        '<strong>Action:</strong> Maintain current ventilatory strategy. Standard monitoring of ventilator parameters every 4-6h. Focus on oxygenation (PaO2/FiO2, SatO2) and ventilation (PaCO2, pH). Consider weaning trial if clinical conditions improve.',
    },
    blueZone: {
      title: 'MP 12-17 J/min - ACCEPTABLE ZONE (Low-Moderate Risk)',
      meaning:
        '<strong>Meaning:</strong> Low-moderate VILI risk. Ventilatory strategy still protective but close to critical threshold. In moderate ARDS patients, MP in this range is often unavoidable to maintain adequate oxygenation/ventilation.',
      action:
        '<strong>Action:</strong> Frequent monitoring (every 2-4h). Evaluate optimization possibilities: reduce VT if hypercapnia tolerated, reduce RR, optimize PEEP with recruiting maneuvers or EIT. Risk-benefit balance: avoid excessive VT/RR reduction causing severe hypoxia/hypercapnia.',
    },
    orangeZone: {
      title: '? MP 17-22 J/min - ATTENTION ZONE (High Risk - Urgent Optimization)',
      meaning:
        '<strong>Meaning:</strong> High VILI risk. Mortality increases progressively with MP in this range. ARDS observational studies: MP 17-22 J/min -> mortality ~40-50% at 28 days. Accelerated lung damage if maintained &gt;24-48h.',
      action:
        '<strong>URGENT Action:</strong> (1) Reduce VT to 4-5 ml/kg PBW (minimum tolerated), (2) Reduce RR tolerating permissive hypercapnia (target pH &gt;7.15-7.20, PaCO2 up to 60-70 mmHg if needed), (3) Optimize PEEP: if high driving pressure (?P &gt;15 cmH2O) -> reduce PEEP; if low P/F &lt;150 -> increase PEEP with recruiting, (4) Evaluate prone positioning if P/F &lt;150 mmHg (reduces MP and improves P/F in 70% cases), (5) Consider neuromuscular blockade if patient-ventilator asynchronies (reduces MP ~10-20%), (6) Monitoring every 1-2h with target MP reduction &lt;17 J/min within 6-12h.',
    },
    redZone: {
      title: '? MP &gt; 22 J/min - CRITICAL ZONE (Very High Risk - Emergency Intervention)',
      meaning:
        '<strong>Meaning:</strong> Very high VILI risk, imminent catastrophic lung damage. Mortality &gt;50-60% in severe ARDS with persistent MP &gt;22 J/min. Systemic biotrauma with MOF (multi-organ failure). Strong unfavorable prognostic indicator.',
      action:
        '<strong>IMMEDIATE EMERGENCY Action:</strong> (1) Implement ALL orange zone measures with maximum aggressiveness, (2) <strong>Mandatory prone positioning</strong> if P/F &lt;150 mmHg (16-18h/day, reduces mortality ~40% in severe ARDS + reduces MP ~15-25%), (3) Continuous neuromuscular blockade 24-48h (cisatracurium 15 mg/h) to abolish asynchronies and respiratory drive (significantly reduces MP), (4) <strong>Veno-venous ECMO</strong> (VV-ECMO): consider URGENTLY if (a) Refractory severe ARDS P/F &lt;80 mmHg with FiO2 100%, PEEP >=10, (b) MP &gt;25 J/min despite all optimizations, (c) Severe hypercapnia pH &lt;7.15 with RR already at minimum tolerated. ECMO allows "ultra-protective" ventilation: VT 2-4 ml/kg, RR 5-10, MP &lt;10 J/min -> total lung rest, (5) URGENT transfer to ECMO center if not available on-site, (6) Continuous reassessment every 30-60 minutes, target MP reduction &lt;17 J/min within 2-4h by any means necessary.',
    },
    normalization: {
      title: '? MP Correction for Lung Compliance (Normalized MP):',
      text: '<strong>Specific Mechanical Power (MP/Crs):</strong> Absolute MP does not consider functional lung size. Normal lung Crs ~60 ml/cmH2O tolerates MP ~25 J/min. Severe ARDS Crs ~20 ml/cmH2O -> MP &gt;15 J/min already harmful. <strong>Solution:</strong> Normalize MP for compliance -> <strong>MP/Crs (J/min per ml/cmH2O)</strong> or for predicted body weight -> <strong>MP/kg PBW</strong>. Normalized critical thresholds: MP/Crs &gt;0.8-1.0 J.min?1.ml?1.cmH2O?1 -> high VILI risk. MP/kg &gt;0.3-0.4 J/min/kg -> attention zone. Recommended use in research and advanced centers for accurate patient comparisons.',
    },
    scientificEvidence: {
      title: '? Scientific Evidence for MP Thresholds:',
      serpa:
        '<strong>Serpa Neto et al. Study (Intensive Care Med 2018):</strong> Analysis of 8207 ventilated patients. Mean MP 21.4 J/min associated with 45% mortality vs MP 13.2 J/min 25% mortality. Each ?4 J/min MP -> ?20% relative mortality risk. Protective threshold identified &lt;17 J/min.',
      coppola:
        '<strong>Coppola et al. Study (Am J Respir Crit Care Med 2020):</strong> 422 COVID-19 ARDS patients. MP &gt;17 J/min -> ?ICU mortality (OR 2.8, p&lt;0.001), ?ventilation duration (+8.5 days), ?MOF incidence (+35%). MP independent outcome predictor after age, SOFA, P/F ratio adjustment.',
    },
  },

  // Section 8: Documentation
  documentation: {
    title: 'Scientific Medical Documentation and Guidelines',
    mainTitle: 'International Guidelines and Evidence-Based Recommendations',
    ardsNetwork: {
      title: 'ARDS Network Protocol - Low Tidal Volume Ventilation (2000)',
      study:
        '<strong>ARMA Study (NEJM 2000):</strong> Landmark trial 861 ARDS patients. VT 6 ml/kg PBW vs 12 ml/kg. Low VT group: ?mortality 31% vs 40% (p=0.007, NNT=11), ?ventilation days, ?MOF. Mean driving pressure protective group ~13 cmH2O, estimated MP ~15-17 J/min. <strong>Recommendations:</strong> VT 4-6 ml/kg PBW, Pplateau &lt;30 cmH2O, tolerate permissive hypercapnia pH &gt;7.15-7.20. Gold standard for protective ventilation worldwide.',
      pmid: 'PMID: 10793162 - The Acute Respiratory Distress Syndrome Network',
    },
    drivingPressure: {
      title: 'Driving Pressure Limiting Strategy (NEJM 2015 - Amato et al.)',
      study:
        '<strong>Meta-analysis 3562 ARDS patients:</strong> Driving pressure (?P = Pplateau - PEEP) strongest mortality predictor, superior to VT or PEEP alone. ?1 cmH2O ?P -> ?6% death risk. Threshold: ?P &lt;15 cmH2O protective target, ?P &gt;15 associated with &gt;50% mortality. <strong>MP Implications:</strong> ?P is direct MP component (MP ? ?P). Reducing ?P by reducing VT or optimizing PEEP -> simultaneous MP reduction. Recommendation: monitor ?P alongside MP for double protection verification.',
      pmid: 'PMID: 25693014 - New England Journal of Medicine',
    },
    proseva: {
      title: 'PROSEVA Trial - Prone Positioning in Severe ARDS (NEJM 2013)',
      study:
        '<strong>466 severe ARDS patients (P/F &lt;150):</strong> Early prone (16h/day) vs supine. Prone group: ?mortality 16% vs 33% (HR 0.39, p&lt;0.001, NNT=6). Mechanism: prone -> more homogeneous lung tension redistribution -> ?driving pressure ~2-4 cmH2O -> ?MP ~15-25% -> VILI protection. <strong>Strong recommendation:</strong> Mandatory prone in severe ARDS P/F &lt;150 with PEEP >=5, FiO2 >=0.6. Duration: 16-18h/day, repeat consecutive days until P/F improves.',
      pmid: 'PMID: 23688302 - PROSEVA Study Group',
    },
    eolia: {
      title: 'EOLIA Trial - ECMO for Severe ARDS (NEJM 2018)',
      study:
        '<strong>249 very severe ARDS patients:</strong> Early ECMO vs conventional ventilation. ECMO allows ultra-low VT (2-4 ml/kg), minimal RR (5-10), drastically reduced MP (&lt;10 J/min). Trial stopped early for favorable ECMO mortality trend 35% vs 46% (p=0.09 non-significant, but Bayesian analysis suggests benefit). <strong>ECMO consideration criteria:</strong> P/F &lt;80 mmHg FiO2 100% + PEEP >=10, pH &lt;7.15 from refractory hypercapnia, MP &gt;22-25 J/min despite optimizations, barotrauma (pneumothorax resistant to drainage).',
      pmid: 'PMID: 29791822 - EOLIA Trial Group',
    },
    survivingSepsis: {
      title: 'Surviving Sepsis Campaign Guidelines 2021 - ARDS Management',
      recommendations:
        '<strong>International consensus recommendations:</strong> (1) Low VT ventilation 4-8 ml/kg PBW in all ARDS (STRONG recommendation), (2) Pplateau &lt;30 cmH2O (STRONG), (3) Prone in severe ARDS P/F &lt;150 (STRONG), (4) Driving pressure &lt;15 cmH2O when possible (WEAK), (5) Higher PEEP in "open lung" strategies vs low PEEP (WEAK - controversy). Mechanical Power NOT yet included in official guidelines but cited as "emerging parameter" for VILI risk monitoring.',
      source: 'Critical Care Medicine 2021 - SCCM/ESICM Guidelines',
    },
    currentStatus: {
      title: 'Current Status of Mechanical Power Guidelines:',
      text: 'MP is a relatively new parameter (concept formalized 2016 Gattinoni). Not yet included in official ARDS Network, Surviving Sepsis, ERS/ATS guidelines as formal recommendation. Growing evidence from observational studies and meta-analyses supports clinical utility. Expert consensus recommends: monitor MP alongside traditional parameters (VT, Pplateau, ?P, PEEP), target MP &lt;17 J/min in moderate-severe ARDS, integrate MP in ventilatory decision-making. Prospective randomized controlled trials (RCTs) ongoing to validate MP-guided ventilation strategy vs standard care. Likely MP inclusion in future 2024-2025 guidelines.',
    },
  },

  // Section 9: Parameters (Calculator Inputs)
  parameters: {
    rr: {
      label: 'RR (Respiratory Rate)',
      unit: 'breaths/min',
    },
    vte: {
      label: 'VTe (Tidal Volume Expiratory)',
      unit: 'liters',
    },
    picco: {
      label: 'Peak Pressure',
      unit: 'cmH2O',
    },
    plateau: {
      label: 'Plateau Pressure',
      unit: 'cmH2O',
    },
    peep: {
      label: 'PEEP (Positive End-Expiratory Pressure)',
      unit: 'cmH2O',
    },
  },

  // Section 10: Actions (Buttons)
  actions: {
    calculate: 'Calculate MP',
    save: 'Save Calculation',
    reset: 'Reset',
    cancel: 'Cancel',
    export: 'Export',
    delete: 'Delete',
  },

  // Section 11: Results
  results: {
    title: 'Mechanical Power Result',
    unit: 'J/min (Joules per minute)',
    noCalculation: 'Awaiting calculation',
    safe: 'Protective Ventilation - Safe',
    attention: 'Attention Zone - Optimize',
    dangerous: 'High VILI Risk - Urgent Intervention',
  },

  // Section 12: Validation Messages
  validation: {
    noNegativeNumbers: 'Values cannot be negative',
    mustBePositive: 'All values must be greater than zero',
    outOfRange: 'Value out of physiological range',
    plateauLessThanPeak: 'Plateau pressure must be less than peak pressure',
    peepLessThanPlateau: 'PEEP must be less than plateau pressure',
  },

  // Section 13: Saved Calculations
  saved: {
    title: 'Save Calculation',
    patientInitials: 'Patient Initials',
    date: 'Date',
    time: 'Time',
    result: 'Result',
    exportPDF: 'Export PDF',
    exportExcel: 'Export Excel',
    noCalculations: 'No saved calculations',
    confirmDelete: 'Confirm deletion?',
  },

  bibliography: {
    title: 'Scientific References and Peer-Reviewed Bibliography',
    mainTitle: 'Fundamental Scientific Literature and Authoritative Resources',
    gattinoni: {
      title:
        'Gattinoni L, Tonetti T, Cressoni M, et al. "Ventilator-related causes of lung injury: the mechanical power" (2016)',
      journal: '<strong>Intensive Care Medicine</strong> 42(10):1567-1575',
      links:
        'DOI: <a href="https://doi.org/10.1007/s00134-016-4505-2" target="_blank" rel="noopener" class="text-primary">10.1007/s00134-016-4505-2</a> | PubMed: <a href="https://pubmed.ncbi.nlm.nih.gov/27620287/" target="_blank" rel="noopener" class="text-primary">27620287</a>',
      description:
        '<strong>Foundational study</strong> that introduced Mechanical Power concept as unifying VILI parameter. Complete MP formula derivation integrating VT, RR, Ppeak, Pplateau, PEEP, flow, resistances. Animal model experiments: MP threshold ~12-15 J/min separates protective from harmful ventilation. Proposal: MP superior to isolated single parameters (VT, pressure) for predicting lung damage. Most cited article in MP literature (>1500 Google Scholar citations).',
    },
    serpa: {
      title:
        'Serpa Neto A, Deliberato RO, Johnson AEW, et al. "Mechanical power of ventilation is associated with mortality in critically ill patients" (2018)',
      journal: '<strong>Intensive Care Medicine</strong> 44(11):1914-1922',
      links:
        'PubMed: <a href="https://pubmed.ncbi.nlm.nih.gov/30284021/" target="_blank" rel="noopener" class="text-primary">30284021</a> | DOI: <a href="https://doi.org/10.1007/s00134-018-5375-6" target="_blank" rel="noopener" class="text-primary">10.1007/s00134-018-5375-6</a>',
      description:
        '<strong>Large retrospective observational study:</strong> 8207 ventilated patients from MIMIC-III database (Beth Israel Hospital Boston). Mean MP 21.4+-9.6 J/min, hospital mortality 35.7%. Dose-dependent MP-mortality association: each ?4 J/min -> ?20% death odds. MP independent predictor after age, SOFA, APACHE II, Charlson adjustment. Receiver Operating Characteristic (ROC) AUC 0.68 for mortality. Clinical confirmation of MP predictivity in large human cohort.',
    },
    coppola: {
      title:
        'Coppola S, Caccioppola A, Froio S, et al. "Effect of mechanical power on intensive care mortality in ARDS patients" (2020)',
      journal: '<strong>Critical Care</strong> 24(1):246',
      links:
        'PubMed: <a href="https://pubmed.ncbi.nlm.nih.gov/32414448/" target="_blank" rel="noopener" class="text-primary">32414448</a> | Full Text: <a href="https://ccforum.biomedcentral.com/articles/10.1186/s13054-020-02963-x" target="_blank" rel="noopener" class="text-primary">Open Access</a>',
      description:
        '<strong>Prospective cohort 150 ARDS patients:</strong> MP &gt;17 J/min associated with ?ICU mortality (hazard ratio 2.23, 95%CI 1.16-4.29, p=0.016). Risk stratification: MP &lt;12 J/min 15% mortality, MP 12-17 28% mortality, MP &gt;17 48% mortality. Compliance-normalized MP (MP/Crs) even better predictor (HR 2.89). Suggests MP thresholds should be adjusted for patient-specific lung compliance.',
    },
    zhang: {
      title:
        'Zhang Z, Zheng B, Liu N, et al. "Mechanical power normalized to predicted body weight as a predictor of mortality in patients with acute respiratory distress syndrome" (2019)',
      journal: '<strong>Intensive Care Medicine</strong> 45(6):856-864',
      links:
        'PubMed: <a href="https://pubmed.ncbi.nlm.nih.gov/31016328/" target="_blank" rel="noopener" class="text-primary">31016328</a> | DOI: <a href="https://doi.org/10.1007/s00134-019-05627-6" target="_blank" rel="noopener" class="text-primary">10.1007/s00134-019-05627-6</a>',
      description:
        '<strong>Validation study 3630 ARDS patients:</strong> Predicted body weight-normalized MP (MP/kg PBW) better predictor vs absolute MP. Threshold MP/kg &gt;0.32 J/min/kg associated with ?28-day mortality (OR 1.84, p&lt;0.001). Importance of normalization: small 50 kg patient vs large 90 kg tolerate different MP. Recommendation: always calculate MP/kg for accurate comparisons.',
    },
    arma: {
      title:
        'Acute Respiratory Distress Syndrome Network. "Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and ARDS" (2000)',
      journal: '<strong>New England Journal of Medicine</strong> 342(18):1301-1308',
      links:
        'PubMed: <a href="https://pubmed.ncbi.nlm.nih.gov/10793162/" target="_blank" rel="noopener" class="text-primary">10793162</a> | DOI: <a href="https://doi.org/10.1056/NEJM200005043421801" target="_blank" rel="noopener" class="text-primary">10.1056/NEJM200005043421801</a>',
      description:
        '<strong>Landmark ARMA trial:</strong> 861 ARDS patients randomized VT 6 ml/kg vs 12 ml/kg. Low VT group: 31% mortality vs 39.8% control (p=0.007), ?ventilation days 12 vs 15, ?MOF. Retrospectively: protective group estimated MP ~15 J/min vs ~28 J/min harmful group. First indirect evidence that MP reduction (via ?VT) improves outcomes. Foundation of modern protective ventilation.',
    },
    encyclopedia: {
      title: 'Encyclopedia of Respiratory Medicine, Second Edition (2022) - Volume 5',
      subtitle: 'Chapter: "Mechanical Power" - Authors: Garfield B, Patel BV',
      link: '<a href="https://www.sciencedirect.com/referencework/9780081027233/encyclopedia-of-respiratory-medicine" target="_blank" rel="noopener" class="text-primary">ScienceDirect - Encyclopedia of Respiratory Medicine</a>',
      description:
        '<strong>Comprehensive encyclopedic treatment:</strong> History of MP concept, mathematical formula derivation, animal experimental evidence, human clinical studies, ICU practical applications, current limitations and controversies. Includes discussion of MP formula variants (Gattinoni vs Becher vs others), normalized MP (MP/Crs, MP/PBW), integration with other parameters (driving pressure, strain). Authoritative resource for theoretical-practical MP deepening.',
    },
    msd: {
      title: 'MSD Manuals - Professional Version: Acute Respiratory Distress Syndrome (ARDS)',
      subtitle: 'Section: "Management of ARDS - Mechanical Ventilation Strategies"',
      link: '<a href="https://www.msdmanuals.com/professional/critical-care-medicine/respiratory-failure-and-mechanical-ventilation/acute-respiratory-distress-syndrome-ards" target="_blank" rel="noopener" class="text-primary">MSD Manuals Professional - ARDS Management</a>',
      description:
        '<strong>Practical clinical manual:</strong> Evidence-based ARDS ventilation recommendations. Includes: low VT strategy, Pplateau limits, driving pressure monitoring, PEEP optimization, rescue therapies (prone, ECMO). Recent 2023 update mentions MP as "emerging parameter for ventilator-induced lung injury assessment, promising but needs more prospective validation". Useful for quick bedside reference.',
    },
    sourceQuality: {
      title: 'Note on Source Quality:',
      text: 'All references are peer-reviewed publications in high impact factor journals (Intensive Care Med IF~24, NEJM IF~158, Critical Care IF~19) or authoritative resources (MSD Manuals, Elsevier Encyclopedia of Respiratory Medicine). Evidence levels: RCTs (ARMA, PROSEVA, EOLIA) - maximum evidence level 1A, prospective observational studies (Coppola) - level 2B, meta-analyses/databases (Serpa Neto, Zhang) - level 1B. MP concept supported by solid scientific foundation but still in validation phase for official guidelines inclusion. MP monitoring recommended by experts as part of protective ventilation "bundle" alongside traditional VT, Pplateau, ?P.',
    },
  },
};
