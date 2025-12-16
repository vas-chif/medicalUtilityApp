/**
 * @file en-US/fluidBalance.ts
 * @description English translations for Fluid Balance Calculator (24h)
 * @author Vasile Chifeac
 * @created 2025-12-16
 *
 * @references
 * - Bouchard J, et al. (2009) "Fluid accumulation, survival and recovery of kidney function in critically ill patients with acute kidney injury"
 *   Crit Care Med 37(6):1921-1928. PMID: 19384206
 * - Malbrain ML, et al. (2014) "Fluid overload, de-resuscitation, and outcomes in critically ill or injured patients"
 *   Intensive Care Med 40(12):1849-1867. PMID: 25190178
 */

export default {
  // 1. MAIN TITLES
  title: 'Fluid Balance 24h',
  subtitle: 'Intake/Output Monitoring for Volemic Status',

  // 2. INPUT PANEL
  inputPanel: {
    title: '💧 Fluid Balance (24h)',
    intakeTitle: '➕ INTAKE (Inputs)',
    outputTitle: '➖ OUTPUT (Outputs)',
    intake: {
      oral: {
        label: 'Oral Fluids (beverages)',
        unit: 'mL',
      },
      food: {
        label: 'Water from Food',
        unit: 'mL',
      },
      iv: {
        label: 'IV Infusions',
        unit: 'mL',
      },
      total: 'Total Intake',
    },
    output: {
      urine: {
        label: 'Urine Output',
        unit: 'mL',
      },
      stool: {
        label: 'Stool',
        unit: 'mL',
      },
      insensible: {
        label: 'Insensible Loss (estimate 500-800 mL)',
        unit: 'mL',
        hint: 'Respiratory + cutaneous losses',
      },
      total: 'Total Output',
    },
  },

  // 3. BUTTONS
  buttons: {
    calculate: 'Calculate Balance',
    reset: 'Reset Data',
  },

  // 4. RESULTS PANEL
  resultsPanel: {
    title: '📊 Balance Results',
    balance: {
      label: 'mL',
      subtitle: '(Net Balance 24h)',
      formula: 'Intake - Output',
    },
    volumeStatus: {
      title: '💧 Volemic Status:',
    },
    visualization: {
      title: '📊 Balance Visualization:',
    },
  },

  // 5. INTERPRETATION
  interpretation: {
    euvolemic: 'Euvolemic (Neutral Balance)',
    mildOverload: 'Mild Volume Overload',
    significantOverload: 'Significant Volume Overload',
    mildDepletion: 'Mild Volume Depletion',
    significantDepletion: 'Significant Volume Depletion',
  },

  // 6. CLINICAL NOTES
  clinicalNotes: {
    euvolemic: 'Optimal fluid balance. Euvolemic state maintained. Continue daily monitoring.',
    mildOverload:
      'Mild positive balance. Monitor for overload signs (edema, dyspnea). Consider fluid restriction if CKD/heart failure.',
    significantOverload:
      'Volume overload. PULMONARY EDEMA RISK. Fluid restriction <1000 mL/day + diuretics (furosemide 40-80 mg IV). Daily weight. Target loss 0.5-1 kg/day.',
    mildDepletion:
      'Mild depletion. Assess causes (diuretics, fever, vomiting, diarrhea). Fluid repletion oral/IV if persistent.',
    significantDepletion:
      'Significant depletion. PRERENAL AKI RISK. Urgent IV fluid repletion (crystalloids 500-1000 mL/h until euvolemia). Monitor urine output, blood pressure, electrolytes.',
  },

  // 7. DOCUMENTATION SECTIONS
  sections: {
    // SECTION 1: Definition
    definition: {
      title: 'Definition and Clinical Significance',
      content: {
        definitionLabel: 'Definition:',
        definition:
          'Fluid balance represents the difference between intake (inputs) and output (outputs) of fluids over 24 hours. It is fundamental for assessing patient volemic status.',
        interpretationLabel: 'Interpretation:',
        interpretation: [
          '<strong>Positive Balance (+):</strong> Intake > Output → Volume overload, edema, risk of heart failure/pulmonary edema',
          '<strong>Negative Balance (-):</strong> Intake &lt; Output → Volume depletion, dehydration, prerenal AKI risk',
          '<strong>Neutral Balance (±500 mL):</strong> Euvolemia - optimal state',
        ],
        note: {
          title: 'Clinical Note:',
          text: 'Fluid balance is critical in ICU, CKD, heart failure, sepsis, post-operative care. Daily monitoring mandatory.',
        },
      },
    },

    // SECTION 2: Physiology
    physiology: {
      title: 'Fluid Balance Physiology',
      content: {
        distributionTitle: 'Body Water Distribution:',
        distribution: [
          '<strong>Total Body Water:</strong> ~60% body weight male, ~50% female (↓fat has less water)',
          '<strong>Intracellular Fluid (ICF):</strong> ~40% body weight',
          '<strong>Extracellular Fluid (ECF):</strong> ~20% body weight (plasma 5% + interstitium 15%)',
        ],
        regulationTitle: 'Balance Regulation:',
        regulation: [
          '<strong>ADH (Antidiuretic Hormone):</strong> ↑water reabsorption collecting duct (water retention)',
          '<strong>Renin-Angiotensin-Aldosterone System (RAAS):</strong> ↑Na+ reabsorption (water follows Na+)',
          '<strong>Natriuretic Peptides (ANP, BNP):</strong> ↑Na+ and water excretion (diuresis)',
        ],
      },
    },

    // SECTION 3: Measurement
    measurement: {
      title: 'How to Measure',
      content: {
        intakeTitle: 'Intake (Inputs):',
        intake: [
          '<strong>Oral Fluids:</strong> Water, juices, tea, coffee, milk',
          '<strong>Water from Food:</strong> ~700-1000 mL/day (fruits, vegetables, soups)',
          '<strong>IV Infusions:</strong> Normal saline, Ringer lactate, parenteral nutrition',
          '<strong>Metabolic Water:</strong> ~300 mL/day (carbohydrate oxidation → CO2 + H2O)',
        ],
        outputTitle: 'Output (Outputs):',
        output: [
          '<strong>Urine Output:</strong> ~1200-1500 mL/day (urinary catheter or graduated container measurement)',
          '<strong>Stool:</strong> ~100-200 mL/day (normal), >500 mL/day (diarrhea)',
          '<strong>Insensible Loss:</strong> ~500-800 mL/day (respiration 300-400 mL + sweat 200-400 mL)',
          '<strong>Fever:</strong> +13% output per °C >37°C (38°C → +13%, 39°C → +26%)',
          '<strong>Drains:</strong> Surgical, thoracic, abdominal (measure mL/day)',
          '<strong>Vomiting/NG Aspiration:</strong> Quantify volume',
        ],
        note: {
          title: 'Measurement Accuracy:',
          text: 'ICU: hourly balance with urinary catheter. Ward: 24h balance with graduated containers. ±10% error acceptable.',
        },
      },
    },

    // SECTION 4: Formula
    formula: {
      title: 'Calculation Formula',
      content: {
        mainFormulaLabel: 'Fluid Balance Formula:',
        mainFormula:
          '<strong>Fluid Balance 24h (mL) = Total Intake - Total Output</strong><br/><br/><strong>Intake:</strong> Oral fluids + Water from food + IV infusions + Metabolic water<br/><strong>Output:</strong> Urine output + Stool + Insensible loss + Drains + Vomiting',
        exampleTitle: 'Practical Example:',
        example:
          '<strong>Intake:</strong> 1000 mL oral + 700 mL food + 1500 mL IV = 3200 mL<br/><strong>Output:</strong> 1500 mL urine + 100 mL stool + 600 mL insensible = 2200 mL<br/><strong>Balance:</strong> 3200 - 2200 = +1000 mL (mild overload)',
      },
    },

    // SECTION 5: Interpretation
    clinicalInterpretation: {
      title: 'Results Interpretation',
      content: {
        euvolemicTitle: 'Neutral Balance (±500 mL):',
        euvolemic:
          '<strong>Meaning:</strong> Optimal euvolemic state. Intake = Output.<br/><strong>Management:</strong> Daily monitoring, free diet/fluids (if no contraindications).',
        mildOverloadTitle: 'Mild Overload (+500 to +1000 mL):',
        mildOverload:
          '<strong>Meaning:</strong> Initial fluid retention. Peripheral edema risk.<br/><strong>Management:</strong> Fluid restriction 1500-2000 mL/day, Na+ restriction <2 g/day, diuretics if indicated (furosemide 20-40 mg/day).',
        significantOverloadTitle: 'Significant Overload (>1000 mL):',
        significantOverload:
          '<strong>Meaning:</strong> Severe volume overload. Acute pulmonary edema risk, heart failure.<br/><strong>URGENT Management:</strong> Fluid restriction <1000 mL/day, high-dose IV diuretics (furosemide 40-80 mg IV bid/tid), daily weight monitoring (target -0.5 to -1 kg/day), consider dialysis if refractory.',
        mildDepletionTitle: 'Mild Depletion (-500 to -1000 mL):',
        mildDepletion:
          '<strong>Meaning:</strong> Initial negative balance. Mild dehydration risk.<br/><strong>Management:</strong> Identify cause (excessive diuretics, fever, diarrhea, vomiting), oral fluid repletion 2000-2500 mL/day or IV if necessary.',
        significantDepletionTitle: 'Significant Depletion (<-1000 mL):',
        significantDepletion:
          '<strong>Meaning:</strong> Severe volume depletion. Prerenal AKI risk, hypovolemic shock.<br/><strong>URGENT Management:</strong> Urgent IV fluid repletion (crystalloids 500-1000 mL/h until euvolemia), monitor hourly urine output (target >0.5 mL/kg/h), monitor BP, HR, CVP, lactate, electrolytes. Consider vasopressors if shock.',
      },
    },

    // SECTION 6: Applications
    applications: {
      title: 'Clinical Applications',
      content: {
        icuTitle: 'ICU/Intensive Care:',
        icu: 'Hourly balance mandatory. Target euvolemia within 48-72h. Fluid overload >10% baseline weight associated with ↑mortality (Bouchard 2009). Sepsis: fluid resuscitation 30 mL/kg crystalloids within 3h, then fluid restriction (de-resuscitation).',
        ckdTitle: 'Chronic Kidney Disease (CKD):',
        ckd: 'CKD stage 4-5: fluid restriction 1000-1500 mL/day + Na+ <2 g/day. Dialysis: limit fluids to maintain dry weight. Interdialytic overload >3% dry weight → ↑pulmonary edema risk.',
        heartFailureTitle: 'Heart Failure:',
        heartFailure:
          'NYHA class III-IV: fluid restriction <1500 mL/day. Daily weight mandatory. Increase >2 kg in 3 days → exacerbation, increase diuretics. BNP/NT-proBNP for risk stratification.',
        postOpTitle: 'Post-Operative:',
        postOp:
          'Major surgery: 24h balance first 3-5 days. Target euvolemia promotes wound healing. Hypovolemia → ↓tissue perfusion → complications (infections, dehiscence). Hypervolemia → edema, ↑pulmonary complications.',
      },
    },

    // SECTION 7: Critical Values
    referenceValues: {
      title: 'Critical Values and Alerts',
      content: {
        criticalValuesTitle: 'Critical Values for Intervention:',
        criticalValues: [
          '<strong class="text-red">Balance +2000 mL in 24h:</strong> Red alert. Imminent pulmonary edema risk. Furosemide IV 40-80 mg STAT + fluid restriction <500 mL/day.',
          '<strong class="text-red">Balance -2000 mL in 24h:</strong> Red alert. Prerenal AKI risk, shock. Urgent crystalloid repletion 1000 mL/h IV + intensive monitoring.',
          '<strong class="text-orange">Balance +1000-2000 mL:</strong> Orange alert. Monitor symptoms (dyspnea, edema), chest X-ray, increase diuretics.',
          '<strong class="text-orange">Balance -1000-2000 mL:</strong> Orange alert. Monitor BP, HR, urine output, lactate. IV fluid repletion 500 mL/h.',
        ],
        populationsTitle: 'High-Risk Populations:',
        populations: [
          '<strong>Elderly (>75 years):</strong> Reduced thirst sensitivity, ↓renal function, polypharmacy (diuretics, ACE-I). High dehydration risk.',
          '<strong>Neonates/Children:</strong> High body surface area → ↑insensible losses. Rapid dehydration (diarrhea, vomiting).',
          '<strong>Diabetes Insipidus:</strong> Massive polyuria (>3000 mL/day). Desmopressin mandatory + fluid repletion.',
        ],
        monitoringTitle: 'Integrated Monitoring Parameters:',
        monitoring:
          'Daily weight (↑1 kg = +1000 mL retention), edema (ankles, sacral), BP, HR, CVP, hourly urine output, BUN/creatinine, electrolytes (Na+, K+), osmolality, physical exam (skin turgor, mucous membranes).',
      },
    },

    // SECTION 8: Documentation
    documentation: {
      title: 'Clinical Documentation',
      content: {
        templateTitle: 'Fluid Balance Documentation Template:',
        templateExample: `<strong>FLUID BALANCE 24h - [Date]</strong><br/>
<strong>INTAKE:</strong>
<ul>
  <li>Oral fluids: [mL]</li>
  <li>Water from food: [mL]</li>
  <li>IV infusions: [mL] (specify type: NS, RL, TPN)</li>
  <li>TOTAL INTAKE: [mL]</li>
</ul>
<strong>OUTPUT:</strong>
<ul>
  <li>Urine output: [mL]</li>
  <li>Stool: [mL]</li>
  <li>Insensible loss: [mL]</li>
  <li>Drains: [mL] (specify type)</li>
  <li>Vomiting/NG aspiration: [mL]</li>
  <li>TOTAL OUTPUT: [mL]</li>
</ul>
<strong>NET BALANCE: [+/-] [mL]</strong><br/>
<strong>VOLEMIC STATUS:</strong> [Euvolemic/Overload/Depletion]<br/>
<strong>WEIGHT:</strong> [kg] (Δ vs yesterday: [+/-] [kg])<br/>
<strong>MANAGEMENT:</strong> [Fluid restriction/Diuretics/Fluid repletion]`,
        elementsTitle: 'Elements to Document:',
        elements: [
          'Date and time of 24h period start/end',
          'Body weight (kg) and change from previous day',
          'Cumulative 48-72h balance (trend)',
          'Interventions: diuretic modification, fluid restriction/repletion',
          'Symptoms: edema, dyspnea, oliguria, hypotension',
          'Next reassessment: daily (ICU), every 2-3 days (ward)',
        ],
      },
    },

    // SECTION 9: Bibliography
    bibliography: {
      title: 'Scientific References',
      content: {
        publicationsTitle: 'Fundamental Publications:',
        publications: [
          '<strong>Bouchard J, et al.</strong> (2009). "Fluid accumulation, survival and recovery of kidney function in critically ill patients with acute kidney injury". <em>Crit Care Med</em> 37(6):1921-1928. PMID: 19384206. Study of 618 ICU patients: fluid overload >10% associated with ↑mortality and ↓renal function recovery.',
          '<strong>Malbrain ML, et al.</strong> (2014). "Fluid overload, de-resuscitation, and outcomes in critically ill or injured patients: a systematic review with suggestions for clinical practice". <em>Intensive Care Med</em> 40(12):1849-1867. PMID: 25190178. Systematic review on fluid overload risks and de-resuscitation strategies.',
          '<strong>Vaara ST, et al.</strong> (2012). "Fluid overload is associated with an increased risk for 90-day mortality in critically ill patients with renal replacement therapy". <em>Crit Care Med</em> 40(6):1805-1811. PMID: 22487998. Each 1% increase baseline weight → +2.3% ↑90-day mortality.',
        ],
        guidelinesTitle: 'Guidelines:',
        guidelines: [
          '<strong>KDIGO 2012:</strong> Clinical Practice Guideline for Acute Kidney Injury. Fluid management, fluid balance, fluid overload prevention.',
          '<strong>Surviving Sepsis Campaign 2021:</strong> Fluid resuscitation 30 mL/kg crystalloids within 3h septic shock. Early de-resuscitation after stabilization.',
          '<strong>ESC 2021:</strong> Guidelines Heart Failure. Fluid restriction <1500 mL/day, Na+ <2 g/day, diuretics, weight monitoring.',
        ],
        onlineResources: {
          title: 'Online Resources:',
          kdigo: 'KDIGO AKI Guidelines',
          ssc: 'Surviving Sepsis Campaign',
          esc: 'ESC Heart Failure Guidelines',
        },
      },
    },
  },

  // 8. DISCLAIMER
  disclaimer: {
    title: 'Clinical Disclaimer:',
    text: 'This calculator provides estimates. Clinical decisions require comprehensive assessment (physical exam, vital signs, laboratory tests). Consult physician for critical fluid balance management.',
  },
};
