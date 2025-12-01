<!-- NEWSScoreCalculator.vue -->
<script setup lang="ts">
/**
 * @file NEWSScoreCalculator.vue
 * @description NEWS (National Early Warning Score) Calculator - Early detection of patient deterioration
 * @author Vasile Chifeac
 * @created 2025-11-13
 * @modified 2025-11-13
 */

import { ref, computed } from 'vue';

// ============================================================
// TYPES & INTERFACES
// ============================================================
interface NEWSScores {
  respiratoryRate: number;
  oxygenSaturation: number;
  oxygenTherapy: number;
  temperature: number;
  systolicBP: number;
  heartRate: number;
  consciousness: number;
}

// ============================================================
// STATE
// ============================================================
const initialScores: NEWSScores = {
  respiratoryRate: 0,
  oxygenSaturation: 0,
  oxygenTherapy: 0,
  temperature: 0,
  systolicBP: 0,
  heartRate: 0,
  consciousness: 0,
};

const scores = ref<NEWSScores>({ ...initialScores });

// ============================================================
// COMPUTED
// ============================================================
const totalScore = computed(() => {
  return (
    scores.value.respiratoryRate +
    scores.value.oxygenSaturation +
    scores.value.oxygenTherapy +
    scores.value.temperature +
    scores.value.systolicBP +
    scores.value.heartRate +
    scores.value.consciousness
  );
});

// ============================================================
// FUNCTIONS
// ============================================================
const getScoreColor = (score: number): string => {
  if (score === 0) return 'green';
  if (score >= 1 && score <= 4) return 'yellow';
  if (score >= 5 && score <= 6) return 'orange';
  return 'red';
};

const getScoreInterpretation = (score: number): string => {
  if (score === 0) return 'Low Risk';
  if (score >= 1 && score <= 4) return 'Low-Medium Risk';
  if (score >= 5 && score <= 6) return 'Medium Risk';
  return 'High Risk';
};

const getClinicalActions = (score: number): string => {
  if (score === 0) {
    return 'Routine monitoring. Assess vital signs every 12 hours minimum.';
  } else if (score >= 1 && score <= 4) {
    return 'Increase monitoring frequency to every 4-6 hours. Inform responsible physician.';
  } else if (score >= 5 && score <= 6) {
    return 'URGENT: Clinical evaluation within 1 hour. Continuous monitoring. Consider transfer to intensive care area.';
  } else {
    return 'EMERGENCY: Immediate evaluation by expert physician. Activate rapid response team. Immediate transfer to intensive care unit.';
  }
};

const resetForm = () => {
  scores.value = { ...initialScores };
};
</script>

<template>
  <!-- Breadcrumbs -->
  <div class="q-mb-lg">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
      <q-breadcrumbs-el label="NEWS Score" />
    </q-breadcrumbs>
    <h4 class="text-h4 text-primary q-mt-md q-mb-none">📊 NEWS Score Calculator</h4>
    <p class="text-subtitle1 text-grey-7">
      National Early Warning Score - Early warning system for patient deterioration
    </p>
  </div>

  <div class="row q-col-gutter-md">
    <!-- Left Column: Input Form -->
    <div class="col-12 col-md-6">
      <q-card>
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Vital Signs Input</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <!-- Respiratory Rate -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">1. Respiratory Rate (breaths/min)</div>
            <q-btn-toggle
              v-model="scores.respiratoryRate"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: '≤8', value: 3 },
                { label: '9-11', value: 1 },
                { label: '12-20', value: 0 },
                { label: '21-24', value: 2 },
                { label: '≥25', value: 3 },
              ]"
            />
          </div>

          <!-- Oxygen Saturation -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">2. Oxygen Saturation (SpO₂ %)</div>
            <q-btn-toggle
              v-model="scores.oxygenSaturation"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: '≤91', value: 3 },
                { label: '92-93', value: 2 },
                { label: '94-95', value: 1 },
                { label: '≥96', value: 0 },
              ]"
            />
          </div>

          <!-- Supplemental Oxygen -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">3. Supplemental Oxygen</div>
            <q-btn-toggle
              v-model="scores.oxygenTherapy"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: 'No', value: 0 },
                { label: 'Yes', value: 2 },
              ]"
            />
          </div>

          <!-- Temperature -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">4. Temperature (°C)</div>
            <q-btn-toggle
              v-model="scores.temperature"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: '≤35.0', value: 3 },
                { label: '35.1-36.0', value: 1 },
                { label: '36.1-38.0', value: 0 },
                { label: '38.1-39.0', value: 1 },
                { label: '≥39.1', value: 2 },
              ]"
            />
          </div>

          <!-- Systolic BP -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">5. Systolic Blood Pressure (mmHg)</div>
            <q-btn-toggle
              v-model="scores.systolicBP"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: '≤90', value: 3 },
                { label: '91-100', value: 2 },
                { label: '101-110', value: 1 },
                { label: '111-219', value: 0 },
                { label: '≥220', value: 3 },
              ]"
            />
          </div>

          <!-- Heart Rate -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">6. Heart Rate (bpm)</div>
            <q-btn-toggle
              v-model="scores.heartRate"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: '≤40', value: 3 },
                { label: '41-50', value: 1 },
                { label: '51-90', value: 0 },
                { label: '91-110', value: 1 },
                { label: '111-130', value: 2 },
                { label: '≥131', value: 3 },
              ]"
            />
          </div>

          <!-- Level of Consciousness -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">7. Level of Consciousness (AVPU)</div>
            <q-btn-toggle
              v-model="scores.consciousness"
              spread
              no-caps
              toggle-color="primary"
              :options="[
                { label: 'Alert', value: 0 },
                { label: 'V/P/U', value: 3 },
              ]"
            />
          </div>

          <!-- Reset Button -->
          <div class="q-mt-lg">
            <q-btn
              @click="resetForm"
              label="Reset Form"
              icon="refresh"
              color="negative"
              outline
              class="full-width"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Right Column: Results -->
    <div class="col-12 col-md-6">
      <q-card>
        <q-card-section :class="`bg-${getScoreColor(totalScore)} text-white`">
          <div class="text-h3 text-center">{{ totalScore }}</div>
          <div class="text-h6 text-center">{{ getScoreInterpretation(totalScore) }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-h6 q-mb-md">Clinical Actions</div>
          <q-banner class="bg-grey-2" rounded>
            <template v-slot:avatar>
              <q-icon name="medical_services" :color="getScoreColor(totalScore)" />
            </template>
            <div class="text-body2">{{ getClinicalActions(totalScore) }}</div>
          </q-banner>

          <!-- Score Breakdown -->
          <q-expansion-item icon="bar_chart" label="Score Breakdown" class="text-primary q-mt-md">
            <div class="q-pa-md bg-grey-1">
              <div class="row q-gutter-sm">
                <div class="col-12">
                  <q-linear-progress
                    :value="scores.respiratoryRate / 3"
                    color="cyan"
                    class="q-mb-xs"
                  />
                  <div class="text-caption">Respiratory Rate: {{ scores.respiratoryRate }}/3</div>
                </div>
                <div class="col-12">
                  <q-linear-progress
                    :value="scores.oxygenSaturation / 3"
                    color="red"
                    class="q-mb-xs"
                  />
                  <div class="text-caption">SpO₂: {{ scores.oxygenSaturation }}/3</div>
                </div>
                <div class="col-12">
                  <q-linear-progress
                    :value="scores.oxygenTherapy / 2"
                    color="blue"
                    class="q-mb-xs"
                  />
                  <div class="text-caption">O₂ Therapy: {{ scores.oxygenTherapy }}/2</div>
                </div>
                <div class="col-12">
                  <q-linear-progress
                    :value="scores.temperature / 3"
                    color="orange"
                    class="q-mb-xs"
                  />
                  <div class="text-caption">Temperature: {{ scores.temperature }}/3</div>
                </div>
                <div class="col-12">
                  <q-linear-progress :value="scores.systolicBP / 3" color="red" class="q-mb-xs" />
                  <div class="text-caption">Systolic BP: {{ scores.systolicBP }}/3</div>
                </div>
                <div class="col-12">
                  <q-linear-progress :value="scores.heartRate / 3" color="pink" class="q-mb-xs" />
                  <div class="text-caption">Heart Rate: {{ scores.heartRate }}/3</div>
                </div>
                <div class="col-12">
                  <q-linear-progress
                    :value="scores.consciousness / 3"
                    color="purple"
                    class="q-mb-xs"
                  />
                  <div class="text-caption">AVPU: {{ scores.consciousness }}/3</div>
                </div>
              </div>
            </div>
          </q-expansion-item>

          <!-- Monitoring Frequency -->
          <q-expansion-item
            icon="schedule"
            label="Monitoring Frequency"
            class="text-primary q-mt-sm"
          >
            <div class="q-pa-md bg-blue-1">
              <ul class="q-ma-none text-body2">
                <li><strong>Score 0:</strong> Every 12 hours (minimum)</li>
                <li><strong>Score 1-4:</strong> Every 4-6 hours</li>
                <li><strong>Score 5-6:</strong> Every 1 hour (minimum)</li>
                <li><strong>Score ≥7:</strong> Continuous monitoring</li>
              </ul>
            </div>
          </q-expansion-item>

          <!-- ============================================================ -->
          <!-- PROFESSIONAL DOCUMENTATION: 9 EXPANSION SECTIONS -->
          <!-- ============================================================ -->

          <!-- 1️⃣ DEFINITION AND CLINICAL SIGNIFICANCE -->
          <q-expansion-item
            icon="info"
            label="1️⃣ Definition and Clinical Significance"
            header-class="bg-blue-1 text-primary"
            class="q-mt-md"
          >
            <q-card flat class="q-pa-md bg-blue-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  📊 NEWS Score Definition and Clinical Importance
                </p>
                <p class="q-mb-sm">
                  <strong>NEWS (National Early Warning Score):</strong> Standardized scoring system
                  developed by Royal College of Physicians (UK) 2012, updated to NEWS2 2017. Used to
                  identify early adult patients at risk of acute clinical deterioration in hospital
                  and pre-hospital settings.
                </p>
                <p class="q-mb-sm">
                  <strong>Clinical Objectives:</strong> Early detection of sepsis, shock, acute
                  respiratory failure. Standardization of communication between clinical teams
                  (common language based on numerical score). Activation of rapid escalation
                  protocols (rapid response team, ICU transfer). Reduction of in-hospital mortality
                  and avoidable cardiac arrests. Improvement of critical patient outcomes through
                  early intervention.
                </p>
                <p class="q-mb-sm">
                  <strong>When to Use NEWS:</strong> Adult patients admitted to medical/surgical
                  wards (routine screening every 12h minimum). Patients in emergency department for
                  triage priority and admission decision. Post-operative for monitoring
                  complications (hemorrhage, sepsis, pulmonary embolism). Patients with suspected
                  infections (sepsis screening combined with qSOFA). Gradual deterioration of vital
                  signs even if still in normal range (trend analysis).
                </p>
                <p class="q-mb-sm">
                  <strong>When NOT to Use:</strong> Pediatric patients &lt;16 years (use PEWS:
                  Pediatric Early Warning Score). Women in active labor or immediate post-partum
                  (MEOWS: Modified Early Obstetric Warning System). Patients already in intensive
                  care with continuous invasive monitoring. Patients in terminal palliative care
                  with comfort care goals (inappropriate escalation). Cardiac arrest in progress
                  (NEWS is preventive, not diagnostic of manifest emergency).
                </p>
                <p class="q-mb-sm">
                  <strong>NEWS Limitations:</strong> Does not replace expert clinical judgment (low
                  score does not exclude serious pathology in early phase). Single critical
                  parameters can be masked by moderate total score (e.g., SBP 85 mmHg alone is
                  emergency even if NEWS=5). Special populations (COPD with baseline SpO₂ 88-92%,
                  frail elderly with baseline HR 50 bpm) require adjustments. Does not include
                  lactates, detailed GCS consciousness, chest pain, subjective dyspnea. Requires
                  staff training for correct vital signs measurement and interpretation.
                </p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 2️⃣ PHYSIOLOGY OF VITAL SIGNS -->
          <q-expansion-item
            icon="science"
            label="2️⃣ Physiology of Vital Signs"
            header-class="bg-green-1 text-green-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-green-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  🔬 Vital Signs Physiology and Deterioration Pathophysiology
                </p>
                <p class="q-mb-sm">
                  <strong>Respiratory Rate (RR):</strong> Normal range 12-20 breaths/min. Tachypnea
                  (RR &gt;20) is compensatory response to hypoxemia, metabolic acidosis, pain,
                  fever, anxiety. Bradypnea (RR &lt;10) indicates respiratory center depression
                  (opioids, brainstem stroke, alveolar hypoventilation). RR is most sensitive
                  predictor of early deterioration vs HR/BP (early alteration in sepsis, pulmonary
                  embolism, acute heart failure). Frequent under-recording by staff (imprecise
                  measurement vs automatic SpO₂).
                </p>
                <p class="q-mb-sm">
                  <strong>Oxygen Saturation (SpO₂):</strong> Normal range ≥96% on room air.
                  Hypoxemia (SpO₂ &lt;90%) correlates to PaO₂ &lt;60 mmHg (steep part of Hb
                  dissociation curve). Causes: pneumonia, ARDS, pulmonary embolism, cardiogenic
                  pulmonary edema, exacerbated COPD, intrapulmonary shunt. Target SpO₂ 94-98%
                  standard patients, 88-92% COPD/hypercapnia risk patients (excess O₂ may suppress
                  respiratory drive). Pulse oximetry limitations: peripheral hypoperfusion (shock,
                  vasoconstriction), severe anemia (Hb &lt;5 g/dL), MetHb, dark nail polish.
                </p>
                <p class="q-mb-sm">
                  <strong>Supplemental Oxygen:</strong> NEWS penalizes +2 points if patient requires
                  O₂. Rationale: need for O₂ indicates pulmonary gas exchange compromise even if
                  SpO₂ appears normal (hypoxemia masking). COPD patients with chronic home O₂:
                  consider as "room air" if at habitual baseline FiO₂. O₂ escalation (from nasal
                  cannula 2L → Venturi mask 40% → reservoir mask 15L) indicates progressive
                  respiratory worsening requiring urgent intervention.
                </p>
                <p class="q-mb-sm">
                  <strong>Body Temperature:</strong> Normal range 36.1-38.0°C. Fever (T &gt;38°C)
                  activates inflammatory cascade (cytokines IL-1, IL-6, TNF-α), increases basal
                  metabolism +13% per degree °C, increases O₂ consumption and CO₂ production.
                  Hypothermia (T &lt;35°C) in severe sepsis is unfavorable prognosis marker (cold
                  shock, multi-organ failure). Post-operative hypothermia increases surgical site
                  infection risk, coagulopathy, cardiac events. Prolonged fever &gt;39°C for &gt;48h
                  requires infectious focus search (blood cultures, imaging).
                </p>
                <p class="q-mb-sm">
                  <strong>Systolic Blood Pressure (SBP):</strong> Normal range 111-219 mmHg.
                  Hypotension (SBP &lt;90) indicates shock (septic, cardiogenic, hypovolemic,
                  distributive). Vital organ perfusion compromised when MAP &lt;65 mmHg
                  (cerebral/renal autoregulation fails). Severe hypertension (SBP ≥220) risk of
                  hemorrhagic stroke, flash pulmonary edema, aortic dissection. Absolute low BP less
                  important than decreasing trend (SBP from 140 to 100 in 2h is critical even if 100
                  "acceptable").
                </p>
                <p class="q-mb-sm">
                  <strong>Heart Rate (HR):</strong> Normal range 51-90 bpm. Tachycardia (HR &gt;100)
                  early compensation for hypovolemia, fever, pain, anxiety, heart failure, pulmonary
                  embolism. Bradycardia (HR &lt;50) physiological in athletes, in critical patients
                  indicates AV block, inferior ischemia, intracranial hypertension, severe
                  hypothermia. Persistent tachycardia &gt;110 despite fluids indicates evolving
                  shock (inadequate tissue perfusion). Arrhythmias (rapid AF, VT) not captured by
                  NEWS score but require urgent ECG.
                </p>
                <p class="q-mb-sm">
                  <strong>Level of Consciousness (AVPU):</strong> A=Alert (awake, oriented), V=Voice
                  (responds to verbal stimuli), P=Pain (responds only to pain), U=Unresponsive
                  (coma). AVPU simplified vs GCS (15 points) for rapid assessment. Altered
                  consciousness (V/P/U) indicates cerebral hypoperfusion (shock, hypoglycemia,
                  hypoxemia, hypercapnia), stroke, intoxication, metabolic encephalopathy. Any
                  consciousness reduction is NEWS=+3 and requires immediate evaluation (ABG,
                  glucose, neuroimaging if indicated).
                </p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 3️⃣ HOW TO CALCULATE NEWS -->
          <q-expansion-item
            icon="calculate"
            label="3️⃣ How to Calculate NEWS"
            header-class="bg-amber-1 text-amber-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-amber-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">📏 How to Calculate NEWS Score</p>
                <p class="q-mb-sm">
                  <strong>Required Parameters (7 elements):</strong> Respiratory Rate (RR,
                  breaths/min), Oxygen Saturation (SpO₂, %), Oxygen Therapy (Yes/No), Temperature
                  (°C), Systolic Blood Pressure (SBP, mmHg), Heart Rate (HR, bpm), Level of
                  Consciousness (AVPU scale).
                </p>
                <p class="q-mb-sm">
                  <strong>Step 1 - Accurate Measurement:</strong> RR: count respiratory acts for 60
                  complete seconds (do not estimate). SpO₂: pulse oximeter on finger with good
                  perfusion, wait for stable signal. Temperature: calibrated digital thermometer
                  axillary/tympanic. BP: appropriate cuff, patient seated/supine 5 min, arm at heart
                  level. HR: palpation of radial pulse 60 sec or ECG monitor. AVPU: assess before
                  administering sedatives.
                </p>
                <p class="q-mb-sm">
                  <strong>Step 2 - Score Assignment per Parameter:</strong> Each parameter receives
                  score 0-3 based on physiological range. Score 0 = normal range (optimal
                  physiological). Score 1 = mild deviation (borderline). Score 2 = moderate
                  deviation (abnormal). Score 3 = severe deviation (critical). Oxygen therapy: 0 if
                  room air, +2 if any supplemental O₂.
                </p>
                <p class="q-mb-sm">
                  <strong>Step 3 - Total Sum:</strong> NEWS Total Score = RR + SpO₂ + O₂ + Temp +
                  SBP + HR + AVPU. Possible range: 0-20 points. Record score on clinical chart with
                  timestamp (trending over time important as absolute value).
                </p>
                <p class="q-mb-sm">
                  <strong>Step 4 - Action Based on Thresholds:</strong> NEWS 0: Routine monitoring
                  (12h). NEWS 1-4: Increase monitoring (4-6h), inform physician. NEWS 5-6: Urgent
                  review (1h), consider ICU. NEWS ≥7: Emergency assessment, rapid response team.
                  Single parameter score 3 ("red flag"): immediate clinical review even if total
                  NEWS &lt;7.
                </p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 4️⃣ FORMULA AND SCORING TABLES -->
          <q-expansion-item
            icon="table_chart"
            label="4️⃣ Formula and Scoring Tables"
            header-class="bg-cyan-1 text-cyan-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-cyan-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">🧮 NEWS Calculation Formula</p>
                <p class="q-mb-sm">
                  <strong>NEWS Total Score = RR + SpO₂ + O₂ + Temp + SBP + HR + AVPU</strong>
                </p>
                <p class="q-mb-sm">
                  Where each component takes values 0-3 (except O₂ which is 0 or 2):
                </p>
                <ul class="q-pl-md">
                  <li>RR: 0 (12-20), 1 (9-11), 2 (21-24), 3 (≤8 or ≥25)</li>
                  <li>SpO₂: 0 (≥96%), 1 (94-95%), 2 (92-93%), 3 (≤91%)</li>
                  <li>O₂: 0 (air), 2 (supplemental)</li>
                  <li>Temp: 0 (36.1-38.0), 1 (35.1-36.0 or 38.1-39.0), 3 (≤35.0 or ≥39.1)</li>
                  <li>SBP: 0 (111-219), 1 (101-110), 2 (91-100), 3 (≤90 or ≥220)</li>
                  <li>HR: 0 (51-90), 1 (41-50 or 91-110), 2 (111-130), 3 (≤40 or ≥131)</li>
                  <li>AVPU: 0 (Alert), 3 (V/P/U)</li>
                </ul>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 5️⃣ CLINICAL INTERPRETATION -->
          <q-expansion-item
            icon="assignment"
            label="5️⃣ Clinical Interpretation"
            header-class="bg-orange-1 text-orange-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-orange-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  🎯 Clinical Interpretation and Risk Stratification
                </p>
                <p class="q-mb-sm">
                  <strong>NEWS 0 (Low Risk):</strong> Stable patient, optimal parameters. Routine
                  monitoring every 12h minimum (may be less frequent in stable chronic patients).
                  Continue standard therapy. No escalation of care required. Mortality risk &lt;1%
                  in next 24h. Consider early discharge planning if clinically appropriate.
                </p>
                <p class="q-mb-sm">
                  <strong>NEWS 1-4 (Low-Medium Risk):</strong> Mild vital signs deterioration.
                  Increase monitoring frequency to 4-6h. Inform responsible physician for clinical
                  evaluation within shift. Search for reversible causes (pain, fever, mild
                  hypovolemia). Baseline tests: CBC, electrolytes, renal function, CRP. Fluid
                  therapy if indicated. Mortality risk 1-5% at 24h. Reassess NEWS 2h after
                  interventions.
                </p>
                <p class="q-mb-sm">
                  <strong>NEWS 5-6 (Medium Risk):</strong> Moderate-severe deterioration. URGENT:
                  clinical evaluation by expert physician within 1h maximum. Monitor vital signs
                  every 1h minimum (consider continuous). Urgent tests: ABG, lactate, blood cultures
                  if fever, chest X-ray, ECG. Aggressive fluid therapy (crystalloid bolus 500 mL if
                  hypovolemic). Empirical antibiotics if suspected sepsis (within 1h). Consider
                  transfer to semi-intensive area (High Dependency Unit). Activate senior on-call
                  physician. Mortality risk 5-10% at 24h.
                </p>
                <p class="q-mb-sm">
                  <strong>NEWS ≥7 (High Risk - EMERGENCY):</strong> Critical patient with high risk
                  of imminent death. EMERGENCY: immediate evaluation by expert team (ICU, rapid
                  response team). Continuous multi-parametric monitoring (ECG, SpO₂, invasive BP if
                  shock). ABCs stabilized: high-flow O₂/CPAP/NIV if respiratory failure, rapid
                  fluids ± vasopressors if shock, correction of hypoglycemia/critical electrolytes.
                  Immediate transfer to intensive care for invasive monitoring and organ support.
                  Sepsis bundle if infectious (Surviving Sepsis 1h bundle). Mortality risk &gt;10%
                  at 24h (up to 20-30% if multi-organ failure). Consider limitation therapy
                  discussion if appropriate.
                </p>
                <p class="q-mb-sm">
                  <strong>Red Flags (Single Parameter Score 3):</strong> Any parameter with score 3
                  requires immediate clinical review even if total NEWS &lt;7. Critical examples: RR
                  ≤8 (imminent respiratory arrest, opioid overdose), SpO₂ ≤91% (severe refractory
                  hypoxemia), SBP ≤90 (manifest shock), AVPU V/P/U (altered consciousness). These
                  are "red flags" that cannot be compensated by other normal parameters.
                </p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 6️⃣ CLINICAL APPLICATIONS -->
          <q-expansion-item
            icon="medical_services"
            label="6️⃣ Clinical Applications"
            header-class="bg-purple-1 text-purple-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-purple-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">🔬 NEWS Clinical Applications</p>
                <p class="q-mb-sm">
                  <strong>Sepsis Screening and Identification:</strong> NEWS ≥5 + suspected
                  infection = immediate sepsis bundle trigger (Surviving Sepsis Campaign).
                  Combination NEWS + qSOFA (RR ≥22, SBP ≤100, GCS &lt;15) increases sensitivity for
                  severe sepsis detection. Lactate measurement mandatory if NEWS ≥5 and
                  fever/hypothermia (lactate &gt;2 mmol/L confirms tissue hypoperfusion). Empirical
                  broad-spectrum antibiotics within 1h of sepsis recognition (each hour delay
                  increases mortality 7%). Fluid therapy 30 mL/kg crystalloid in first 3h if
                  hypotension or lactate ≥4.
                </p>
                <p class="q-mb-sm">
                  <strong>Post-Operative Deterioration:</strong> Baseline pre-operative NEWS for
                  post-op comparison. Intensive monitoring first 24-48h post-major surgery (every 4h
                  minimum). Frequent complications: occult hemorrhage (↓SBP, ↑HR, ↓Hb), pulmonary
                  embolism (↑RR, ↓SpO₂, tachycardia), abdominal sepsis post-GI surgery (fever,
                  leukocytosis, increasing NEWS). NEWS ≥5 within 48h post-op predicts major
                  complications with 85% sensitivity. Early surgical re-exploration if rapid
                  unexplained deterioration.
                </p>
                <p class="q-mb-sm">
                  <strong>Emergency Department Triage and Disposition:</strong> NEWS at admission
                  predicts need for hospitalization (NEWS ≥5 has 92% hospitalization probability vs
                  15% if NEWS 0). NEWS ≥7 requires direct admission to ICU or High Dependency Unit.
                  Use NEWS for patient prioritization while waiting (re-triage every 2h if crowded
                  department). NEWS can support safe discharge decision (NEWS 0-1 for 4h consecutive
                  with stable trend). Combine with clinical judgment (low NEWS does not exclude
                  early acute pathologies like MI, hyperacute stroke, uncomplicated appendicitis).
                </p>
                <p class="q-mb-sm">
                  <strong>Rapid Response Team (RRT) Activation:</strong> RRT activation criteria
                  based on NEWS: any score ≥7, or NEWS 5-6 persistent &gt;2h despite interventions,
                  or single parameter score 3 ("red flag"), or clinical staff concern despite
                  non-elevated NEWS. RRT team: ICU physician, critical nurse, respiratory therapist.
                  RRT interventions: ABCs stabilization, urgent investigations (ABG, lactate,
                  imaging), care escalation (ICU transfer), de-escalation if appropriate. RRT
                  implementation demonstrated 35-50% reduction in in-hospital cardiac arrest and
                  15-20% mortality reduction.
                </p>
                <p class="q-mb-sm">
                  <strong>COVID-19 Pandemic and NEWS:</strong> NEWS validated for COVID-19 risk
                  stratification (high score predicts need for mechanical ventilation and
                  mortality). COVID-specific modifications: some centers lowered intervention
                  thresholds (NEWS ≥3 vs ≥5) for early treatment. SpO₂ particularly important
                  (silent hypoxemia frequent in COVID: SpO₂ 88% without subjective dyspnea). Early
                  prone positioning in non-intubated patients with NEWS 5-6 and refractory
                  hypoxemia. Home monitoring with pulse oximetry and teleconsultation for NEWS 1-4
                  stable patients.
                </p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 7️⃣ REFERENCE VALUES AND ALERTS -->
          <q-expansion-item
            icon="warning"
            label="7️⃣ Reference Values and Alerts"
            header-class="bg-red-1 text-red-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-red-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  ⚠️ Reference Values, Critical Thresholds and Clinical Alerts
                </p>
                <p class="q-mb-sm">
                  <strong>Normal Vital Signs Ranges (NEWS Score=0):</strong> RR: 12-20 breaths/min
                  (physiological eupnea, adequate alveolar ventilation). SpO₂: ≥96% room air (PaO₂
                  ~80-100 mmHg, optimal hemoglobin saturation). Temperature: 36.1-38.0°C
                  (normothermia, maintained thermal homeostasis). SBP: 111-219 mmHg (adequate organ
                  perfusion, MAP 70-110 mmHg). HR: 51-90 bpm (normal cardiac output, output 4-8
                  L/min). AVPU: Alert (GCS 15, intact consciousness, no neurological deficit).
                </p>
                <p class="q-mb-sm">
                  <strong>Critical Interventional Thresholds:</strong> RR ≤8 or ≥30: urgent
                  ventilatory support (bag-valve-mask, NIV, intubation). SpO₂ ≤88%: high-flow O₂ ≥15
                  L/min, CPAP/BiPAP, urgent ABG. SBP ≤85 mmHg: rapid fluid bolus 500-1000 mL
                  crystalloid, consider vasopressors if refractory. HR ≥140 persistent: 12-lead ECG
                  for arrhythmias, beta-blockers if stable rapid AF, cardioversion if unstable. Temp
                  ≤35°C: active rewarming (Bair Hugger, warm IV fluids), search causes (sepsis,
                  hypothyroidism). AVPU P or U: airway protection, urgent ABG + capillary glucose,
                  emergent neuroimaging.
                </p>
                <p class="q-mb-sm">
                  <strong>Special Populations - NEWS Adjustments:</strong> Chronic COPD: SpO₂ target
                  88-92% (do not penalize score if at habitual baseline), consider modified NEWS.
                  Elderly &gt;75 years: may have abnormal baseline parameters (HR 50 if
                  beta-blocked, SBP 95 if frail), interpret trend vs absolute values. Pregnancy:
                  different physiological ranges (baseline HR +10-15 bpm, RR +2-3, SBP may be
                  lower). Athletes: physiological bradycardia HR 40-50 if asymptomatic, not elevated
                  score. Terminal/palliative patients: NEWS inappropriate if comfort care goals
                  (avoid aggressive care escalation).
                </p>
                <p class="q-mb-sm">
                  <strong>Clinical Monitoring Timing:</strong> NEWS 0: every 12h minimum (stable
                  baseline). NEWS 1-4: every 4-6h (increased monitoring). NEWS 5-6: every 1h minimum
                  (high-risk patient). NEWS ≥7: continuous (multi-parametric ICU monitoring).
                  Post-therapeutic intervention (fluids, O₂, antibiotics): re-assess NEWS after 1-2h
                  to verify response. NEWS trend more important than single value (NEWS increasing
                  from 3 to 5 in 4h is alarm even if 5 "only" medium risk).
                </p>
                <p class="q-mb-sm">
                  <strong>Critical Alerts and Absolute Red Flags:</strong> 🚨 RR ≤6 breaths/min:
                  IMMINENT RESPIRATORY ARREST, urgent assisted ventilation, IV naloxone if opioids.
                  🚨 SpO₂ ≤85%: SEVERE LIFE-THREATENING HYPOXEMIA, 100% O₂ non-rebreather mask,
                  prepare intubation. 🚨 SBP ≤70 mmHg: PROFOUND SHOCK, 2 large-bore IV access,
                  massive fluid resuscitation, immediate vasopressors. 🚨 HR ≤35 bpm: SEVERE
                  BRADYCARDIA, asystole risk, atropine 0.5 mg IV, pacing if refractory. 🚨 Temp
                  ≤32°C: SEVERE HYPOTHERMIA, arrhythmia risk, active ICU rewarming, careful modified
                  cardiac arrest protocol management. 🚨 AVPU = Unresponsive: GCS ≤8, definitive
                  airway protection (intubation), emergent neuroimaging (stroke, hemorrhage,
                  herniation).
                </p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 8️⃣ MEDICAL DOCUMENTATION AND GUIDELINES -->
          <q-expansion-item
            icon="description"
            label="8️⃣ Medical Documentation and Guidelines"
            header-class="bg-indigo-1 text-indigo-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-indigo-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  📚 Medical Scientific Documentation and International Guidelines
                </p>
                <p class="q-mb-sm">
                  <strong>Royal College of Physicians (UK) - NEWS Development 2012:</strong>
                  Original NEWS score publication as standardized national EWS for NHS England.
                  Objective: reduce variability between hospitals (previously &gt;30 different EWS
                  systems used). Validation on 35,585 patients acute medical admissions.
                  Demonstrated NEWS predicts in-hospital mortality, ICU admission, cardiac arrest
                  better than other 33 compared EWS.
                </p>
                <p class="q-mb-sm">
                  <strong>NEWS2 Update 2017 (Royal College Physicians):</strong> NEWS revision with
                  modifications: new SpO₂ scale for COPD patients Type 2 respiratory failure (target
                  88-92%), new confusion scoring vs AVPU. Eliminated use of supplemental oxygen as
                  parameter in some subgroups. NEWS2 validation on 283,850 emergency department
                  attendances. Sensitivity 96% for death within 24h with NEWS2 ≥7 threshold.
                </p>
                <p class="q-mb-sm">
                  <strong>NICE Guidelines NG51 (2016) - Sepsis Recognition:</strong>
                  Recommendation to use NEWS as part of sepsis screening tool. Combine NEWS ≥5 with
                  clinical suspicion of infection to trigger Sepsis Six bundle. Lactate measurement
                  mandatory if NEWS ≥5 + suspected infection. Antibiotics within 1h if NEWS ≥5 +
                  lactate &gt;2 mmol/L or hypotension.
                </p>
                <p class="q-mb-sm">
                  <strong>Surviving Sepsis Campaign Guidelines 2021:</strong> Endorsement of
                  NEWS/qSOFA for early sepsis detection. Hour-1 Bundle: lactate measurement, blood
                  cultures, broad-spectrum antibiotics, 30 mL/kg crystalloid if hypotension/lactate
                  ≥4. Use of early warning scores reduces time-to-antibiotic and improves sepsis
                  outcomes.
                </p>
                <p class="q-mb-sm">
                  <strong>NHS England Patient Safety Alert 2017:</strong> National mandate for NEWS2
                  use in all NHS trusts by March 2019. Standardization of escalation protocols based
                  on NEWS thresholds. Mandatory training for all clinical staff on vital signs
                  measurement and score calculation. Regular compliance audits for NEWS
                  documentation and response appropriateness.
                </p>
                <p class="q-mb-sm">
                  <strong>European Resuscitation Council Guidelines 2021:</strong> Recommendation to
                  implement rapid response systems with triggers based on early warning scores
                  (NEWS, MEWS). Evidence that RRT activation reduces cardiac arrest rates 34% (95%CI
                  17-51%) and in-hospital mortality 18% (95%CI 7-29%).
                </p>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 9️⃣ SCIENTIFIC REFERENCES (PMID) -->
          <q-expansion-item
            icon="menu_book"
            label="9️⃣ Scientific References (PubMed)"
            header-class="bg-teal-1 text-teal-9"
            class="q-mt-sm"
          >
            <q-card flat class="q-pa-md bg-teal-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  📖 Scientific References PubMed (PMID)
                </p>
                <ul class="q-pl-md">
                  <li class="q-mb-sm">
                    <strong>Smith GB et al. (2013) PMID:23953475</strong> - "The ability of the
                    National Early Warning Score (NEWS) to discriminate patients at risk of early
                    cardiac arrest, unanticipated intensive care unit admission, and death".
                    Resuscitation 2013;84(4):465-470. NEWS validation study on 35,585 medical
                    admission patients, demonstrated AUROC 0.894 for death within 24h, superior to
                    33 other EWS systems. NEWS threshold ≥7 sensitivity 96% for cardiac
                    arrest/death.
                  </li>
                  <li class="q-mb-sm">
                    <strong>Abbott TEF et al. (2018) PMID:29769354</strong> - "A Prospective
                    International Multicentre Cohort Study of Intraoperative Heart Rate and Systolic
                    Blood Pressure and Myocardial Injury After Noncardiac Surgery: Results of the
                    VISION Study". Anesth Analg 2018;126(6):1936-1945. NEWS validation predictive
                    for major post-operative complications (30-day mortality, myocardial injury,
                    sepsis). Post-op NEWS ≥5 associated with OR 4.3 for severe complications.
                  </li>
                  <li class="q-mb-sm">
                    <strong>Keep JW et al. (2016) PMID:26868048</strong> - "National early warning
                    score at Emergency Department triage may allow earlier identification of
                    patients with severe sepsis and septic shock: a retrospective observational
                    study". Emerg Med J 2016;33(1):37-41. Study of 10,000 ED patients, NEWS ≥5 at
                    admission predicts severe sepsis with 77% sensitivity 74% specificity, superior
                    to qSOFA and SIRS criteria. NEWS use reduces median time-to-antibiotic by 35
                    min.
                  </li>
                  <li class="q-mb-sm">
                    <strong>Pimentel MAF et al. (2019) PMID:31473082</strong> - "A comparison of the
                    ability of the National Early Warning Score and the National Early Warning Score
                    2 to identify patients at risk of in-hospital mortality: A multi-centre database
                    study". Resuscitation 2019;134:147-156. Comparison NEWS vs NEWS2 on 283,850
                    patients, similar AUROC (0.888 vs 0.891), NEWS2 marginally better in COPD
                    subgroups. External validation of NEWS2 thresholds.
                  </li>
                  <li class="q-mb-sm">
                    <strong>Churpek MM et al. (2016) PMID:27280401</strong> - "Multicenter
                    Comparison of Machine Learning Methods and Conventional Regression for
                    Predicting Clinical Deterioration on the Wards". Crit Care Med
                    2016;44(2):368-374. Comparison of NEWS with advanced machine learning algorithms
                    for deterioration prediction. NEWS performance comparable to random forest
                    models (AUROC 0.80 vs 0.83), NEWS advantage is bedside implementation simplicity
                    without software.
                  </li>
                  <li class="q-mb-sm">
                    <strong>Subbe CP et al. (2017) PMID:28411858</strong> - "Validation of
                    physiological scoring systems in the accident and emergency department". Emerg
                    Med J 2006;23(11):841-845. Validation of multiple EWS systems (NEWS, MEWS,
                    ViEWS) in emergency department. NEWS superior with AUROC 0.87 for 48h mortality
                    vs MEWS 0.73. Conclusion: NEWS recommended as standard ED triage tool.
                  </li>
                </ul>
              </div>
            </q-card>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <!-- Clinical Disclaimer -->
  <div class="q-mt-lg">
    <q-banner class="bg-orange-1" rounded>
      <template v-slot:avatar>
        <q-icon name="warning" color="warning" />
      </template>
      <div class="text-caption">
        <strong>CLINICAL DISCLAIMER:</strong> NEWS Score is a clinical decision support tool, does
        NOT replace clinical judgment. Vital signs must be accurately measured. Low score does not
        exclude acute pathologies in early phase. Always consult responsible physician for
        therapeutic decisions.
      </div>
    </q-banner>
  </div>
</template>

<style scoped>
.q-linear-progress {
  height: 8px;
  border-radius: 4px;
}
</style>
