/**
 * @file en-US/bsa.ts
 * @description English translations for BSA Calculator
 * @author Vasile Chifeac
 * @created 2025-12-15
 *
 * @references
 * - Mosteller Formula (1987)
 * - DuBois & DuBois Formula (1916)
 * - Haycock et al. Formula (1978)
 */

export default {
  // 1. MAIN TITLES
  title: 'Body Surface Area (BSA)',
  subtitle: 'Body Surface Area',

  // 2. FORM INPUT
  form: {
    weightLabel: 'Weight',
    weightSuffix: 'kg',
    weightRule: 'Weight between 1-500 kg',
    weightIcon: 'fitness_center',

    heightLabel: 'Height',
    heightSuffix: 'cm',
    heightRule: 'Height between 1-300 cm',
    heightIcon: 'height',
  },

  // 3. BUTTONS
  buttons: {
    calculate: 'Calculate BSA',
    reset: 'Reset',
  },

  // 4. RESULTS
  results: {
    title: 'BSA Results',
    placeholder: 'Enter weight and height to calculate BSA',
    table: {
      formula: 'Formula',
      bsa: 'BSA (m²)',
      application: 'Application',
      mosteller: 'Mosteller',
      dubois: 'DuBois',
      haycock: 'Haycock',
      adultsGeneral: 'Adults (general purpose)',
      metabolicResearch: 'Metabolic research',
      pediatrics: 'Pediatrics (<15 years)',
    },
  },

  // 5. CLINICAL BANNER
  clinicalBanner: {
    title: 'Clinical Notes',
    adultsAverage: 'Average Adult Values:',
    adultsValues: 'Women ~1.6 m², Men ~1.9 m²',
    neonates: 'Full-term neonates:',
    neonatesValue: '~0.25 m²',
  },

  // 6. EXPANDABLE SECTIONS
  sections: {
    // Clinical Applications Section
    clinicalApplications: {
      title: 'BSA Clinical Applications',
      icon: 'local_hospital',
      applications: [
        {
          title: 'Chemotherapy:',
          text: 'Antineoplastic drug dosing in mg/m² (cisplatin, doxorubicin, carboplatin)',
        },
        {
          title: 'Cardiology:',
          text: 'Cardiac Index = CO / BSA (L/min/m², normal 2.5-4.0), Stroke Volume Index = SV / BSA',
        },
        {
          title: 'Nephrology:',
          text: 'GFR normalization to 1.73 m² for patient comparability',
        },
        {
          title: 'Burns:',
          text: 'TBSA% calculation for fluid requirements (Parkland formula: 4mL × weight × TBSA% in 24h)',
        },
      ],
    },

    // Formulas Section
    formulas: {
      title: 'BSA Formulas',
      icon: 'functions',
      items: [
        {
          name: 'Mosteller (1987):',
          formula: 'BSA (m²) = √[(height_cm × weight_kg) / 3600]',
        },
        {
          name: 'DuBois & DuBois (1916):',
          formula: 'BSA (m²) = 0.007184 × height_cm^0.725 × weight_kg^0.425',
        },
        {
          name: 'Haycock et al. (1978):',
          formula: 'BSA (m²) = 0.024265 × height_cm^0.3964 × weight_kg^0.5378',
        },
      ],
    },
  },

  // 7. DOCUMENTATION SECTIONS (9 NEWS-STYLE SECTIONS)
  documentationSections: {
    definition: {
      title: 'Clinical Definition BSA',
      content: {
        mainDefinition: {
          title: 'Definition:',
          text: 'Body Surface Area (BSA) is the measurement of total human body surface expressed in square meters (m²). It is a fundamental anthropometric parameter for normalizing drug dosages (chemotherapy), hemodynamic parameters (cardiac index), renal clearance (GFR), and metabolic requirements. BSA correlates better with physiological functions than body weight alone.',
        },
        keyPrinciples: {
          title: 'Key Principles:',
          items: [
            '<strong>Chemotherapy Dosage Normalization:</strong> Antineoplastic drugs (cisplatin, doxorubicin, paclitaxel) dosed mg/m² BSA to reduce interindividual toxicity. Vd correlates with tissue mass, not weight',
            '<strong>Standardized Cardiac Index:</strong> Cardiac Output / BSA = CI (L/min/m²), normal range 2.5-4.0 L/min/m². Allows hemodynamic comparison between patients of different sizes',
            '<strong>Normalized GFR:</strong> Glomerular filtration rate reported to 1.73 m² (average adult BSA). CKD-EPI, MDRD formulas use this standard for CKD classification',
            '<strong>Burns TBSA%:</strong> Total Body Surface Area burned (%) for fluid calculation (Parkland: 4 mL × kg × TBSA% in first 24h). Wallace rule of 9s for rapid estimation',
          ],
        },
        clinicalImportance: {
          title: 'Clinical Importance:',
          description:
            'BSA is critical for chemotherapy dosing safety and hemodynamic parameter precision. BSA calculation errors can cause:',
          points: [
            '<strong>Chemotherapy Overdosing:</strong> Overestimated BSA → excessive mg/m² dose → severe myelosuppression, GI/cardiac/renal toxicity. Cisplatin >100 mg/m² is nephrotoxic',
            '<strong>Oncologic Underdosing:</strong> Underestimated BSA → reduced dose → therapeutic inefficacy, reduced survival. Accurate dosing critical for CHOP, FOLFOX',
            '<strong>Cardiac Index Errors:</strong> CI calculated on wrong BSA → misclassification of shock (CI <2.2), high output (CI >4.0), wrong therapeutic decisions',
            '<strong>GFR Misinterpretation:</strong> Non-normalized GFR → incorrect CKD classification, wrong renal drug dosing (antibiotics, anticoagulants)',
          ],
        },
      },
    },
    physiology: {
      title: 'Body Surface Physiology',
      content: {
        metabolicRelationship: {
          title: 'BSA Metabolic Relationship:',
          description:
            'BSA correlates with basal metabolic rate, blood volume, drug clearance better than body weight:',
          components: [
            '<strong>Basal Metabolic Rate:</strong> BMR ~1000 kcal/m²/day (modified Harris-Benedict formula). Heat loss by radiation/conduction proportional to surface, not mass',
            '<strong>Blood Volume:</strong> ~2.5-3 L/m² BSA (adults). Neonates ~3.5 L/m² (greater proportion). Plasma volume ~1.5 L/m², red cell volume ~1 L/m²',
            '<strong>Cardiac Output:</strong> ~3-3.5 L/min/m² BSA at rest. Increases 500-700 mL/min/m² for every 10% metabolic increase (fever, exercise, hyperthyroidism)',
            '<strong>Drug Clearance:</strong> Hepatic/renal clearance correlates with BSA. Chemotherapy Vd 10-30 L/m², clearance 10-100 mL/min/m² (methotrexate, cisplatin)',
          ],
        },
        bodyComposition: {
          title: 'Body Composition and BSA:',
          points: [
            '<strong>Obesity Paradox:</strong> BSA increases with obesity but not linearly (exponent <1 in formulas). Obese BMI >35 → BSA overestimated if standard formula used',
            '<strong>Sarcopenia:</strong> Elderly/cachectic: BSA may be normal but muscle mass reduced. FFM (fat-free mass) more accurate for chemotherapy in cancer cachexia',
            '<strong>Edema/Ascites:</strong> Weight increased by extracellular fluids does not alter real BSA. Use "dry weight" for calculation, not weight with massive edema (heart failure, cirrhosis)',
            '<strong>Amputations:</strong> BSA reduced proportionally: entire leg -9%, entire arm -4%, foot -3.5%. Consider for accurate chemotherapy dosing',
          ],
        },
        thermoregulation: {
          title: 'Thermoregulation and Surface:',
          mechanisms: [
            '<strong>Neonatal Heat Loss:</strong> Neonate BSA/weight ratio 2-3x adult → rapid heat loss. Preterm neonate <1 kg needs thermoneutral incubator 34-36°C',
            '<strong>Extensive Burns:</strong> TBSA >20% → massive heat loss, hypermetabolism. Energy requirement 25-40 kcal/kg/day + evaporative losses 2000-5000 mL/day',
            '<strong>Intraoperative Hypothermia:</strong> Small patients (BSA <1 m²) or children → greater hypothermia risk. Forced-air warming, heated fluids mandatory',
          ],
        },
      },
    },
    measurement: {
      title: 'BSA Measurement',
      content: {
        directMeasurement: {
          title: 'Direct BSA Measurement:',
          methods: [
            '<strong>3D Body Scanner:</strong> Laser/photogrammetry generates 3D body mesh, calculates polygonal surface. Accuracy ±1%, research gold standard. High cost, not routine clinical',
            '<strong>Coating Methods:</strong> Body coating with measurable material (historical paper strips). Used to derive empirical formulas (DuBois 1916). Obsolete',
            '<strong>Segmental Anthropometry:</strong> Multiple circumference measurements (head, chest, abdomen, limbs) + lengths. Sum of segment surfaces. Laborious, imprecise',
          ],
        },
        formulaSelection: {
          title: 'BSA Formula Selection:',
          guidelines: [
            '<strong>Mosteller (1987) - General Purpose:</strong> Simplified formula √[(h×w)/3600], rapid mental calculation. Accuracy ±5% normal-weight adults. PREFERRED standard clinical practice',
            '<strong>DuBois & DuBois (1916) - Research:</strong> Original formula 0.007184×h^0.725×w^0.425, derived from 9 subjects. Accurate for metabolic research, tedious manual calculation',
            '<strong>Haycock (1978) - Pediatrics:</strong> Formula 0.024265×h^0.3964×w^0.5378 optimized for children <15 years. Superior accuracy for neonates/infants. PREFERRED pediatric oncology',
            '<strong>Gehan & George (1970):</strong> Formula 0.0235×h^0.42246×w^0.51456, developed from 401 subjects. Accurate for extreme obesity/emaciation. Used if BMI <18 or >35',
            '<strong>Boyd (1935):</strong> Complex formula with logarithms, maximum theoretical accuracy. Obsolete due to calculation complexity, replaced by Mosteller clinically',
          ],
        },
        practicalProtocol: {
          title: 'Practical Measurement Protocol:',
          steps: [
            '<strong>Accurate Weight:</strong> Calibrated scale, patient undressed/light clothing, empty bladder. ±0.1 kg precision. NO shoes, NO phone/wallet in pockets',
            '<strong>Standing Height:</strong> Wall-mounted stadiometer, patient barefoot, heels-buttocks-scapulae touching wall, horizontal gaze. ±0.5 cm precision. NO self-reported height',
            '<strong>Neonates/Infants:</strong> Supine length on infantometer, head occipital fixed, knees extended. Weight on pediatric scale ±10 g. Haycock formula mandatory',
            '<strong>Bedridden Patients:</strong> Knee-heel height × 2.69 (women) or 2.78 (men) to estimate height if not measurable standing. Accuracy ±3-5 cm',
          ],
        },
      },
    },
    formula: {
      title: 'BSA Formulas',
      content: {
        formulaDerivation: {
          title: 'Formula Derivation:',
          description:
            'BSA formulas empirically derived from direct measurements (coating methods) and power regressions:',
          steps: [
            '<strong>General Form:</strong> BSA = k × height^a × weight^b. Exponents a,b between 0.3-0.7, constant k calibrated. Allometry: surface/volume ratio scales with size',
            '<strong>DuBois 1916:</strong> 9 adult subjects, coating method. Regression log(BSA) vs log(h) and log(w). Exponents 0.725 (h), 0.425 (w), constant 0.007184',
            '<strong>Mosteller 1987:</strong> Algebraic simplification of DuBois maintaining accuracy. Assumes exponents ≈0.5 both → √(h×w). Divisor 3600 for unit conversion',
            '<strong>Modern Validation:</strong> 3D scanning 200+ subjects confirms Mosteller accuracy ±5%. Formula exceeds interobserver variability (±10%) of direct measurements',
          ],
        },
        practicalExamples: {
          title: 'Practical Calculation Examples:',
          examples: [
            '<strong>Standard Adult:</strong> Woman 165 cm, 60 kg. Mosteller: √[(165×60)/3600] = √2.75 = 1.66 m². DuBois: 0.007184×165^0.725×60^0.425 = 1.64 m². Difference 1.2%',
            '<strong>Full-term Neonate:</strong> Child 50 cm, 3.5 kg. Haycock: 0.024265×50^0.3964×3.5^0.5378 = 0.024265×7.21×1.81 = 0.32 m². Mosteller would overestimate',
            '<strong>Obese Patient:</strong> Man 180 cm, 120 kg. Mosteller: √[(180×120)/3600] = 2.19 m². Gehan-George: 0.0235×180^0.42246×120^0.51456 = 2.25 m². Gehan more accurate BMI >35',
          ],
        },
        clinicalVariations: {
          title: 'Formula Variations for Special Conditions:',
          variations: [
            '<strong>BSA Cap Obesity:</strong> ASCO chemotherapy guidelines: NO BSA capping in obese. Full dose on actual BSA <2.5 m², reduction only if toxicity documented previous cycle',
            '<strong>Preterm Neonate BSA:</strong> Specific formula <37 weeks: BSA = 4.688 × weight^0.8168 × length^0.3964 (Brion 1986). Accurate 500g - 5kg',
            '<strong>Amputee BSA:</strong> Percentage reduction: AK amputation -6% BSA, BK -5.5%, AE -3%, BE -2.3%. Important for appropriate chemotherapy dose-capping',
            '<strong>Pediatric Burns BSA:</strong> Lund-Browder chart modifies rule of 9s for children (head 18-19% neonate vs 9% adult). Critical accuracy for fluid resuscitation',
          ],
        },
      },
    },
    interpretation: {
      title: 'BSA Interpretation',
      content: {
        clinicalRanges: {
          title: 'BSA Clinical Ranges:',
          description: 'Normal BSA values by category and dosing implications:',
          ranges: [
            '<strong>Full-term Neonates (38-42 weeks):</strong> BSA 0.20-0.30 m² (weight 2.5-4 kg). Pediatric chemotherapy: fixed absolute doses <0.5 m² (NO mg/m²), overdose risk',
            '<strong>Children 1-10 years:</strong> BSA 0.5-1.1 m². Standard mg/m² dosing. Attention to obesity epidemic: 20% US children BMI >95th percentile, Haycock formula preferred',
            '<strong>Adolescents 11-18 years:</strong> BSA 1.2-1.8 m² (puberty variability). Pediatric→adult dosing transition: some protocols switch to adult fixed dose at BSA >1.5 m²',
            '<strong>Adult Women:</strong> Average BSA 1.6 m² (range 1.4-1.9). Chemotherapy: full dose even elderly >70 years if ECOG performance status 0-1, no prophylactic reduction',
            '<strong>Adult Men:</strong> Average BSA 1.9 m² (range 1.7-2.2). Obesity: BSA can reach 2.3-2.5 m², NO capping <2.2 m² for chemotherapy (reduces efficacy)',
          ],
        },
        cardiacIndex: {
          title: 'Cardiac Index (BSA-normalized):',
          interpretation: [
            '<strong>Normal CI:</strong> 2.5-4.0 L/min/m² (resting adults). CO 5-7 L/min / BSA 1.7-2.0 m². Stroke Volume Index (SVI) = SV/BSA, normal 35-50 mL/m²',
            '<strong>Low CI (<2.2):</strong> Cardiogenic shock (MI, acute failure), tamponade, massive pulmonary embolism. If SVR >1200 dyne×sec/cm⁵ → excessive afterload',
            '<strong>High CI (>4.5):</strong> Sepsis/distributive shock, hyperthyroidism, severe anemia (Hb <7 g/dL), AV shunt, pregnancy. If SVR <800 → vasoplegiadiamond, needs vasopressors',
            '<strong>CI Monitoring:</strong> Swan-Ganz (thermodilution), echocardiography, PiCCO, FloTrac. Target CI >2.5 in shock, >3.0 in severe sepsis (Early Goal-Directed Therapy)',
          ],
        },
        gfrNormalization: {
          title: 'Normalized GFR 1.73 m²:',
          significance: [
            '<strong>GFR Standardization:</strong> All eGFR (CKD-EPI, MDRD) reported to 1.73 m² (average Caucasian adult BSA). Allows CKD classification independent of patient size',
            '<strong>GFR De-normalization:</strong> Individual GFR = eGFR × (BSA/1.73). Critical for renal chemotherapy dosing (carboplatin AUC-based, high-dose methotrexate)',
            '<strong>Small Children/Elderly:</strong> BSA <1.73 m² → absolute GFR lower than eGFR. Renal drug dosing on absolute GFR, not eGFR (digoxin, LMWH overdose risk)',
            '<strong>Obese/Large Athletes:</strong> BSA >1.73 m² → absolute GFR greater. eGFR underestimates real clearance, possible underdosing of time-dependent antibiotics (β-lactams)',
          ],
        },
      },
    },
    applications: {
      title: 'Clinical Applications',
      content: {
        oncologyDosing: {
          title: 'Oncology Chemotherapy Dosing:',
          description: 'BSA-based dosing reduces toxicity while maintaining efficacy:',
          protocols: [
            '<strong>Solid Tumor Chemotherapy:</strong> Cisplatin 75 mg/m², doxorubicin 60 mg/m², paclitaxel 175 mg/m² q3w. Full dose on actual BSA in obese, reduction only if ANC <1000 previous cycle',
            '<strong>Lymphomas (CHOP, R-CHOP):</strong> Doxorubicin 50 mg/m², vincristine 1.4 mg/m² (cap 2 mg absolute), cyclophosphamide 750 mg/m² day 1. NO prophylactic reduction in elderly',
            '<strong>Pediatrics (ALL, Osteosarcoma):</strong> High-dose methotrexate 8-12 g/m², ifosfamide 1.8 g/m²/day × 5 days. Maximum absolute dose for vincristine (2 mg), bleomycin (400 U total)',
            '<strong>Carboplatin AUC-based:</strong> Dose (mg) = AUC × (GFR + 25). AUC 5-6 for solid tumors, 6-7 for lymphomas. GFR from CrCl Cockcroft-Gault, NO eGFR CKD-EPI',
            '<strong>Oral Capecitabine:</strong> 1000-1250 mg/m² BID days 1-14 q21d. Reduction 25% if CrCl 30-50, 50% if CrCl <30. Monitor hand-foot syndrome, G3+ diarrhea',
          ],
        },
        cardiacAssessment: {
          title: 'Cardiac Assessment:',
          applications: [
            '<strong>Cardiac Index Monitoring:</strong> Target CI >2.2 L/min/m² (shock), >2.5 (sepsis), >3.0 (post-op cardiac surgery). FloTrac/PiCCO minimally invasive, no routine PAC',
            '<strong>Indexed Valvulopathies:</strong> Aortic Valve Area <0.6 cm²/m² = severe symptomatic stenosis (TAVR/AVR indication). Mitral Valve Area <1.0 cm²/m² = severe stenosis',
            '<strong>Stress Echocardiography:</strong> Dobutamine stress echo: dose 40 mcg/kg/min. Peak HR target 85% age-predicted maximum. Ischemia if new wall motion abnormalities',
            '<strong>Pediatric Cardiology:</strong> Shunt Qp/Qs indexed BSA: >1.5 consider closure (ASD, VSD). Fontan pressures: mean PA <15 mmHg for optimal long-term outcome',
          ],
        },
        burnsFluidResuscitation: {
          title: 'Burns and Fluid Resuscitation:',
          protocols: [
            '<strong>Parkland Formula:</strong> 4 mL × weight (kg) × TBSA% in first 24h. Half in first 8h, remaining half in 16h. Lactated Ringer crystalloid first choice',
            '<strong>TBSA Estimation:</strong> Wallace Rule of 9s adults: head 9%, trunk anterior 18%, trunk posterior 18%, arms 9% each, legs 18% each, genitals 1%. Patient palm = 1%',
            '<strong>Lund-Browder Chart Pediatrics:</strong> Neonate head 19% (vs 9% adult), lower limbs 13% (vs 18% adult). Critical accuracy <5 years to avoid under-resuscitation',
            '<strong>Inhalation Injury:</strong> +30-50% fluid requirement if smoke/CO inhalation. Early fiberoptic bronchoscopy, intubation if stridor/airway edema. UOP target 0.5-1 mL/kg/h',
          ],
        },
      },
    },
    alerts: {
      title: 'BSA Safety Alerts',
      content: {
        dosingErrors: {
          title: 'Chemotherapy Dosing Errors:',
          description: 'Common BSA-related errors and consequences:',
          errors: [
            '<strong>Error #1 - BSA Capping in Obese:</strong> Arbitrary dose reduction <2.2 m² in obese BMI >35 → significant underdosing, reduced survival. ASCO: always full dose',
            '<strong>Error #2 - Wrong Pediatric Formula:</strong> Using Mosteller <10 years instead of Haycock → overestimates BSA 5-10% → chemotherapy overdose. Haycock mandatory <15 years',
            '<strong>Error #3 - Self-reported Height:</strong> Patients overestimate height by average 2-3 cm → overestimated BSA → cisplatin/carboplatin overdose. Always measure with stadiometer',
            '<strong>Error #4 - Weight with Edema:</strong> BSA calculation on weight with ascites/edema → overestimation → G4 myelosuppression. Use "dry weight" pre-diuretic or pre-ascites weight',
            '<strong>Error #5 - Wrong Units:</strong> Height in meters instead of cm (1.7 vs 170) → BSA 0.53 m² vs 1.89 m² → catastrophic underdose. Triple-check units always',
          ],
        },
        toxicityRisks: {
          title: 'Toxicity Risks:',
          warnings: [
            '<strong>Severe Myelosuppression:</strong> Nadir ANC day 10-14, recovery 21-28 days (cisplatin, doxorubicin). G-CSF if ANC <500 or neutropenic fever. 25% dose reduction next cycle',
            '<strong>Cumulative Cardiotoxicity:</strong> Doxorubicin lifetime dose <450-550 mg/m² (3-5% CHF risk). Epirubicin <900 mg/m². Echo LVEF baseline and every 3 cycles. Dexrazoxane cardioprotection',
            '<strong>Cisplatin Nephrotoxicity:</strong> Dose >100 mg/m² or cumulative >300 mg/m² → 25-40% GFR decline. Hyper-hydration 1-2 L NS pre/post, mannitol, avoid NSAIDs. Monitor CrCl q cycle',
            '<strong>Vincristine Neurotoxicity:</strong> Cumulative dose >6 mg (adult cap 2 mg/dose) → irreversible peripheral neuropathy. Reduce dose 50% if G2 neuropathy, stop if G3',
          ],
        },
        specialPopulations: {
          title: 'Special Populations:',
          considerations: [
            '<strong>Neonates <1 month:</strong> Immature CYP3A4/CYP2D6 clearance, GFR <30 mL/min/1.73m². 50-75% dose reduction or fixed absolute dosing. Mandatory PK monitoring',
            '<strong>Elderly >75 years:</strong> GFR decline 0.75 mL/min/year after 40 years. Full-dose chemotherapy if ECOG 0-1, CrCl >60. NO prophylactic reduction, increases mortality',
            '<strong>Cancer Cachexia:</strong> Normal BSA but FFM reduced -20-30% → relative overdosing of hydrophilic drugs. Consider LBM-based dosing if impedance analysis available',
            '<strong>Pregnancy Chemotherapy:</strong> BSA increases 10-15% 2nd-3rd trimester. Dose on pre-pregnancy BSA except hematologic emergencies. Avoid 1st trimester (teratogenicity)',
          ],
        },
      },
    },
    documentation: {
      title: 'Protocols and Documentation',
      content: {
        clinicalGuidelines: {
          title: 'International Guidelines:',
          guidelines: [
            '<strong>ASCO 2012:</strong> "Appropriate Chemotherapy Dosing for Obese Adult Patients". Full BSA-based dose in obese, NO capping <2.2 m², reduction only if G3-4 toxicity previous cycle',
            '<strong>NCCN Guidelines:</strong> "Chemotherapy Dose Calculation". Mosteller formula standard adults, Haycock pediatrics. De-normalized GFR for carboplatin AUC dosing',
            '<strong>ESMO 2017:</strong> "Dose Adjustments in Renal/Hepatic Impairment". BSA-based chemotherapy + organ function adjustment. Carboplatin Calvert formula mandatory',
            '<strong>BCCA Cancer Drug Manual:</strong> Database 200+ drugs with standard mg/m² dosing, max caps, renal/hepatic adjustments. British Columbia gold standard',
          ],
        },
        pharmacyProtocols: {
          title: 'Pharmacy Verification Protocols:',
          protocols: [
            '<strong>Triple Check BSA:</strong> Pharmacist independent BSA calculation verification. Tolerance ±5% between prescriber and pharmacist. If discrepancy >5% → physician contact before preparation',
            '<strong>Height/Weight Verification:</strong> Confirm recent measurements (<7 days). NO self-reported height/weight for chemotherapy. Automatic alert if >5% variation previous cycle',
            '<strong>Dose Banding:</strong> Dose rounding ±5% to standardize preparations (reduces waste, cost). E.g., cisplatin 145 mg vs 150 mg (BSA 1.93 vs 2.0 m²). Acceptable if delta <10%',
            '<strong>Pediatric Safety Checks:</strong> Verify age-appropriate formula (Haycock <15 years). Max absolute dose vincristine 2 mg even if BSA suggests higher. Mandatory independent double-check',
          ],
        },
        documentationRequirements: {
          title: 'Documentation Requirements:',
          requirements: [
            '<strong>Documented Anthropometry:</strong> Current weight kg, height cm, BSA m² (formula used), measurement date. NO self-reported heights, NO undocumented edema weights',
            '<strong>Calculated Dosing:</strong> Dose mg/m², BSA used, absolute dose mg, route of administration, cycle day. Document rationale if dose reduced (<90% standard)',
            '<strong>Baseline Organ Function:</strong> CrCl mL/min (Cockcroft-Gault), AST/ALT/bilirubin, ANC/platelets. Renal/hepatic dose adjustments documented',
            '<strong>Prior Cycle Toxicities:</strong> Nadir ANC/PLT, neuropathy grade, nausea/vomiting, hand-foot syndrome. Prospective dose reduction if G3-4 toxicity not manageable with supportive care',
            '<strong>Informed Consent:</strong> Risk/benefit discussion, alternatives, expected toxicities. Documented discussion of fertility preservation, cumulative cardiotoxicity, long-term sequelae',
          ],
        },
      },
    },
    references: {
      title: 'Scientific References',
      content: {
        scientificStudies: {
          title: 'Fundamental Scientific Studies:',
          studies: [
            '<strong>DuBois D, DuBois EF (1916):</strong> "A formula to estimate the approximate surface area if height and weight be known". Arch Intern Med. PMID:N/A. First empirical BSA formula, 9 adult subjects',
            '<strong>Mosteller RD (1987):</strong> "Simplified calculation of body-surface area". N Engl J Med. PMID:3657876. Simplified formula √[(h×w)/3600], current clinical gold standard',
            '<strong>Haycock GB et al (1978):</strong> "Geometric method for measuring BSA". J Pediatr. PMID:650346. Pediatric formula 0.024265×h^0.3964×w^0.5378, accurate <15 years',
            '<strong>Gehan EA, George SL (1970):</strong> "Estimation of human body surface area from height and weight". Cancer Chemother Rep. PMID:5527019. Accurate formula for extreme obesity/cachexia',
            '<strong>Verbraecken J et al (2006):</strong> "Body surface area in normal-weight, overweight, and obese adults". Eur J Appl Physiol. PMID:16467962. Comparison of 9 formulas, 3D scanning validation',
          ],
        },
        clinicalGuidelinesReferences: {
          title: 'Guideline References:',
          references: [
            '<strong>ASCO 2012:</strong> "Appropriate chemotherapy dosing for obese adult patients". J Clin Oncol. PMID:22641861. Full-dose BSA in obese, NO capping, reduces mortality 10-15%',
            '<strong>NCCN Chemotherapy Order Templates:</strong> Standardized dosing calculations, BSA-based vs flat-dosing, organ dysfunction adjustments. Updated annually',
            '<strong>ESMO 2017:</strong> "Chemotherapy-induced toxicity". Ann Oncol. PMID:28881917. Toxicity grading, dose modifications, supportive care guidelines',
            '<strong>Calvert Formula (1989):</strong> Carboplatin AUC-based dosing. J Clin Oncol. PMID:2915300. Dose = AUC × (GFR + 25), revolutionized platinum dosing accuracy',
            '<strong>BCCA Cancer Drug Manual:</strong> British Columbia Cancer Agency protocols. 200+ agents standardized mg/m² dosing, renal/hepatic adjustments, mixing/stability',
          ],
        },
        additionalResources: {
          title: 'Additional Resources:',
          resources: [
            '<strong>MDCalc - BSA Calculator:</strong> Mosteller, DuBois, Haycock formulas with comparison. Integrated chemotherapy dose calculators',
            '<strong>GlobalRPh - BSA Calculators:</strong> Multiple formulas side-by-side, pediatric-specific. Cardiac index, GFR de-normalization tools',
            '<strong>Chemocare.com:</strong> Patient education on chemotherapy, side effects management, BSA-based dosing explained in lay terms. ASCO-affiliated resource',
            '<strong>Lexicomp/UpToDate:</strong> Drug dosing monographs, BSA-based vs flat dosing recommendations, renal/hepatic adjustments. Subscription required',
            '<strong>Cancer Therapy Advisor:</strong> Free oncology dosing resource, protocol lookup, toxicity management. Haymarket Medical Network',
          ],
        },
      },
    },
  },
};
