<!-- SOFAScoreCalculatorPage.vue -->
<script setup lang="ts">
/**
 * @file SOFAScoreCalculatorPage.vue
 * @description SOFA (Sequential Organ Failure Assessment) Score Calculator
 * @author Vasile Chifeac
 * @created 2025-11-13
 */

import { ref, computed } from 'vue';

interface SOFAScores {
  respiration: number;
  coagulation: number;
  liver: number;
  cardiovascular: number;
  cns: number;
  renal: number;
}

const initialScores: SOFAScores = {
  respiration: 0,
  coagulation: 0,
  liver: 0,
  cardiovascular: 0,
  cns: 0,
  renal: 0,
};

const scores = ref<SOFAScores>({ ...initialScores });

const totalScore = computed(() => {
  return Object.values(scores.value).reduce((sum, val) => sum + val, 0);
});

/**
 * Get color code based on SOFA severity
 * @param score - Total SOFA score (0-24)
 * @returns Quasar color name (green/orange/red)
 */
const getScoreColor = (score: number): string => {
  if (score < 6) return 'green';
  if (score < 10) return 'orange';
  return 'red';
};

/**
 * Get mortality risk description based on SOFA score
 * @param score - Total SOFA score (0-24)
 * @returns Mortality risk percentage string
 */
const getMortalityRisk = (score: number): string => {
  if (score < 2) return '<10% Mortality';
  if (score < 6) return '15-20% Mortality';
  if (score < 10) return '40-50% Mortality';
  if (score < 15) return '>80% Mortality';
  return '>90% Mortality';
};

/**
 * Reset all organ scores to initial state (0)
 */
const resetForm = () => {
  scores.value = { ...initialScores };
};
</script>

<template>
  <div class="q-mb-lg">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
      <q-breadcrumbs-el label="SOFA Score" />
    </q-breadcrumbs>
    <h4 class="text-h4 text-primary q-mt-md q-mb-none">🏥 SOFA Score Calculator</h4>
    <p class="text-subtitle1 text-grey-7">
      Sequential Organ Failure Assessment - Multi-organ dysfunction evaluation in intensive care
    </p>
  </div>

  <q-banner class="bg-blue-1 q-mb-md" rounded>
    <template v-slot:avatar>
      <q-icon name="local_hospital" color="primary" />
    </template>
    <div class="text-body2">
      <strong>SOFA Score:</strong> Prognostic system to assess severity of organ dysfunction in
      critically ill patients. 6 organ systems, score 0-4 each, total 0-24 points.
    </div>
  </q-banner>

  <div class="row q-gutter-md">
    <div class="col-12 col-md-5">
      <q-card flat bordered>
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">📝 Organ Parameters</h6>

          <!-- Respiration -->
          <div class="q-mb-md">
            <div class="text-subtitle2 text-weight-bold q-mb-xs">
              <q-icon name="air" color="cyan" size="xs" class="q-mr-xs" />
              Respiration (PaO₂/FiO₂)
            </div>
            <q-option-group
              v-model="scores.respiration"
              :options="[
                { label: '≥400', value: 0 },
                { label: '<400', value: 1 },
                { label: '<300', value: 2 },
                { label: '<200 with respiratory support', value: 3 },
                { label: '<100 with respiratory support', value: 4 },
              ]"
              color="primary"
              size="sm"
              dense
            />
          </div>

          <!-- Coagulation -->
          <div class="q-mb-md">
            <div class="text-subtitle2 text-weight-bold q-mb-xs">
              <q-icon name="bloodtype" color="red" size="xs" class="q-mr-xs" />
              Coagulation (Platelets ×10³/μL)
            </div>
            <q-option-group
              v-model="scores.coagulation"
              :options="[
                { label: '≥150', value: 0 },
                { label: '<150', value: 1 },
                { label: '<100', value: 2 },
                { label: '<50', value: 3 },
                { label: '<20', value: 4 },
              ]"
              color="primary"
              size="sm"
              dense
            />
          </div>

          <!-- Liver -->
          <div class="q-mb-md">
            <div class="text-subtitle2 text-weight-bold q-mb-xs">
              <q-icon name="spa" color="orange" size="xs" class="q-mr-xs" />
              Liver (Bilirubin mg/dL)
            </div>
            <q-option-group
              v-model="scores.liver"
              :options="[
                { label: '<1.2', value: 0 },
                { label: '1.2-1.9', value: 1 },
                { label: '2.0-5.9', value: 2 },
                { label: '6.0-11.9', value: 3 },
                { label: '≥12.0', value: 4 },
              ]"
              color="primary"
              size="sm"
              dense
            />
          </div>

          <!-- Cardiovascular -->
          <div class="q-mb-md">
            <div class="text-subtitle2 text-weight-bold q-mb-xs">
              <q-icon name="favorite" color="pink" size="xs" class="q-mr-xs" />
              Cardiovascular (MAP/Vasopressors)
            </div>
            <q-option-group
              v-model="scores.cardiovascular"
              :options="[
                { label: 'MAP ≥70 mmHg', value: 0 },
                { label: 'MAP <70 mmHg', value: 1 },
                { label: 'Dopamine ≤5 or Dobutamine any', value: 2 },
                { label: 'Dopamine >5 OR Epinephrine ≤0.1 OR Norepinephrine ≤0.1', value: 3 },
                { label: 'Dopamine >15 OR Epinephrine >0.1 OR Norepinephrine >0.1', value: 4 },
              ]"
              color="primary"
              size="sm"
              dense
            />
          </div>

          <!-- CNS -->
          <div class="q-mb-md">
            <div class="text-subtitle2 text-weight-bold q-mb-xs">
              <q-icon name="psychology" color="purple" size="xs" class="q-mr-xs" />
              Central Nervous System (GCS)
            </div>
            <q-option-group
              v-model="scores.cns"
              :options="[
                { label: 'GCS 15', value: 0 },
                { label: 'GCS 13-14', value: 1 },
                { label: 'GCS 10-12', value: 2 },
                { label: 'GCS 6-9', value: 3 },
                { label: 'GCS <6', value: 4 },
              ]"
              color="primary"
              size="sm"
              dense
            />
          </div>

          <!-- Renal -->
          <div class="q-mb-md">
            <div class="text-subtitle2 text-weight-bold q-mb-xs">
              <q-icon name="water_drop" color="blue" size="xs" class="q-mr-xs" />
              Renal (Creatinine mg/dL or Urine Output mL/day)
            </div>
            <q-option-group
              v-model="scores.renal"
              :options="[
                { label: '<1.2', value: 0 },
                { label: '1.2-1.9', value: 1 },
                { label: '2.0-3.4', value: 2 },
                { label: '3.5-4.9 or <500 mL/day', value: 3 },
                { label: '≥5.0 or <200 mL/day', value: 4 },
              ]"
              color="primary"
              size="sm"
              dense
            />
          </div>

          <q-btn
            @click="resetForm"
            color="negative"
            size="md"
            class="full-width"
            icon="refresh"
            outline
          >
            Reset
          </q-btn>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-md-6">
      <q-card flat bordered>
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">📈 SOFA Score Result</h6>

          <div class="text-center q-mb-lg">
            <div class="text-h2" :class="'text-' + getScoreColor(totalScore)">
              {{ totalScore }}
            </div>
            <div class="text-subtitle1 text-grey-7"><strong>Total Score</strong> (0-24)</div>
            <q-chip :color="getScoreColor(totalScore)" text-color="white" class="text-h6 q-mt-sm">
              {{ getMortalityRisk(totalScore) }}
            </q-chip>
          </div>

          <q-card flat bordered class="q-mb-md" :class="'bg-' + getScoreColor(totalScore) + '-1'">
            <q-card-section>
              <div class="text-subtitle2 text-weight-bold q-mb-sm">
                <q-icon name="medical_services" size="sm" class="q-mr-xs" />
                Clinical Interpretation:
              </div>
              <p class="text-body2 q-ma-none">
                SOFA {{ totalScore }}: {{ getMortalityRisk(totalScore) }} in-hospital mortality
                risk. Serial monitoring (every 24-48h) to assess trend. ΔScore +2 points indicates
                significant deterioration.
              </p>
            </q-card-section>
          </q-card>

          <!-- ======================================================== -->
          <!-- SOFA SCORE COMPLETE SCIENTIFIC DOCUMENTATION            -->
          <!-- ======================================================== -->

          <!-- 1️⃣ DEFINITION AND CLINICAL SIGNIFICANCE -->
          <q-expansion-item
            icon="info"
            color="medical-mint"
            label="Definition and Clinical Significance"
            class="q-mt-md"
            header-class="bg-blue-1 text-blue-9"
          >
            <q-card flat class="q-pa-md bg-blue-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">Historical Origin</p>
                <p>
                  The <strong>SOFA (Sequential Organ Failure Assessment) Score</strong> was
                  developed in <strong>1996</strong> by
                  <strong
                    >Jean-Louis Vincent and the Sepsis-related Organ Failure Assessment Working
                    Group</strong
                  >
                  at the European Society of Intensive Care Medicine consensus conference.
                </p>
                <p class="q-mt-md">
                  <strong>Original objective:</strong> Create a simple, objective system to describe
                  and quantify the degree of organ dysfunction over time in critically ill patients,
                  particularly those with sepsis.
                </p>
                <p class="q-mt-md">
                  <strong>Key characteristics:</strong>
                </p>
                <ul class="q-ml-md">
                  <li>✅ Assesses <strong>6 major organ systems</strong> independently</li>
                  <li>
                    ✅ Each organ scored <strong>0-4 points</strong> based on severity of
                    dysfunction
                  </li>
                  <li>✅ Total score <strong>0-24 points</strong> (higher = worse prognosis)</li>
                  <li>
                    ✅ Can be calculated <strong>repeatedly</strong> to track trajectory (delta
                    SOFA)
                  </li>
                  <li>
                    ✅ Validated predictor of <strong>ICU mortality</strong> (AUROC 0.74-0.86)
                  </li>
                </ul>
              </div>

              <q-separator class="q-my-md" />

              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">Clinical Applications</p>
                <p><strong>When to use:</strong></p>
                <ul class="q-ml-md">
                  <li>
                    � <strong>ICU admission triage:</strong> Baseline SOFA score for severity
                    stratification
                  </li>
                  <li>
                    📈 <strong>Serial monitoring:</strong> Daily SOFA scores to detect
                    deterioration/improvement
                  </li>
                  <li>
                    🦠 <strong>Sepsis diagnosis (Sepsis-3):</strong> SOFA ≥2 points = organ
                    dysfunction criterion
                  </li>
                  <li>
                    🔬 <strong>Clinical trials:</strong> Standardized severity measure and outcome
                    predictor
                  </li>
                  <li>
                    💊 <strong>Treatment decisions:</strong> Guide escalation/de-escalation of ICU
                    care
                  </li>
                </ul>

                <p class="q-mt-md"><strong>When NOT to use:</strong></p>
                <ul class="q-ml-md">
                  <li>
                    ❌ <strong>Non-ICU patients:</strong> Not validated for ward/ED populations
                  </li>
                  <li>
                    ❌ <strong>Pediatrics:</strong> Use Pediatric SOFA (pSOFA) or PELOD score
                    instead
                  </li>
                  <li>
                    ❌ <strong>Single time-point prognosis:</strong> Delta SOFA more predictive than
                    baseline alone
                  </li>
                  <li>
                    ❌ <strong>Sole treatment guide:</strong> Must integrate with clinical judgment
                  </li>
                </ul>

                <p class="q-mt-md"><strong>Limitations:</strong></p>
                <ul class="q-ml-md">
                  <li>
                    ⚠️ Does NOT capture <strong>all organ systems</strong> (e.g., GI, immunologic,
                    endocrine)
                  </li>
                  <li>
                    ⚠️ Requires <strong>accurate laboratory data</strong> (may be delayed or
                    unavailable)
                  </li>
                  <li>
                    ⚠️ Confounded by <strong>chronic organ dysfunction</strong> (use baseline SOFA
                    if known)
                  </li>
                  <li>
                    ⚠️ GCS component unreliable in <strong>sedated patients</strong> (consider
                    sedation-free assessment)
                  </li>
                  <li>
                    ⚠️ <strong>Not a treatment target:</strong> Improving care ≠ improving SOFA
                    directly
                  </li>
                </ul>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 2️⃣ ORGAN DYSFUNCTION PHYSIOLOGY -->
          <q-expansion-item
            icon="science"
            color="medical-mint"
            label="Physiology of Multi-Organ Dysfunction"
            class="q-mt-sm"
            header-class="bg-purple-1 text-purple-9"
          >
            <q-card flat class="q-pa-md bg-purple-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">Pathophysiological Mechanisms</p>

                <div class="q-mb-md">
                  <p class="text-weight-bold">1️⃣ Respiration (PaO₂/FiO₂ ratio):</p>
                  <ul class="q-ml-md">
                    <li><strong>Normal P/F ratio:</strong> ≥400 mmHg (intact gas exchange)</li>
                    <li>
                      <strong>Hypoxemia mechanisms:</strong> V/Q mismatch, shunt, diffusion
                      impairment, hypoventilation
                    </li>
                    <li>
                      <strong>ARDS pathophysiology:</strong> Alveolar-capillary membrane damage →
                      pulmonary edema → surfactant dysfunction
                    </li>
                    <li>
                      <strong>Berlin ARDS criteria:</strong> Mild P/F 200-300, Moderate 100-200,
                      Severe &lt; 100
                    </li>
                    <li>
                      <strong>Critical threshold:</strong> P/F &lt;100 with respiratory support =
                      SOFA 4 (profound ARDS, mortality >40%)
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">2️⃣ Coagulation (Platelets):</p>
                  <ul class="q-ml-md">
                    <li><strong>Normal platelets:</strong> 150-400 ×10³/μL</li>
                    <li>
                      <strong>Thrombocytopenia causes in ICU:</strong> Consumptive coagulopathy
                      (DIC), bone marrow suppression, dilutional, immune-mediated (HIT)
                    </li>
                    <li>
                      <strong>DIC mechanisms:</strong> Systemic activation coagulation cascade →
                      microthrombi → consumption clotting factors/platelets → bleeding + thrombosis
                    </li>
                    <li>
                      <strong>Bleeding risk:</strong> Platelets &lt; 50K significant spontaneous
                      bleeding risk, &lt;20K critical (SOFA 4)
                    </li>
                    <li>
                      <strong>Sepsis-associated:</strong> Thrombocytopenia in 30-50% septic
                      patients, marker of severity
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">3️⃣ Liver (Bilirubin):</p>
                  <ul class="q-ml-md">
                    <li><strong>Normal bilirubin:</strong> &lt;1.2 mg/dL</li>
                    <li>
                      <strong>Hyperbilirubinemia mechanisms:</strong> Hypoxic hepatitis,
                      cholestasis, impaired conjugation/excretion
                    </li>
                    <li>
                      <strong>Shock liver:</strong> Acute ischemic injury (Zone 3 centrilobular
                      necrosis) → transaminase ↑↑ (>1000 IU/L) + bilirubin ↑
                    </li>
                    <li>
                      <strong>Cholestasis:</strong> Sepsis-induced impaired bile flow → conjugated
                      hyperbilirubinemia
                    </li>
                    <li>
                      <strong>Hepatic failure:</strong> Bilirubin ≥12 mg/dL (SOFA 4) with
                      coagulopathy/encephalopathy = poor prognosis
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">4️⃣ Cardiovascular (MAP/Vasopressors):</p>
                  <ul class="q-ml-md">
                    <li><strong>Normal MAP:</strong> ≥70 mmHg (adequate tissue perfusion)</li>
                    <li>
                      <strong>Shock types:</strong> Distributive (septic), cardiogenic, hypovolemic,
                      obstructive
                    </li>
                    <li>
                      <strong>Septic shock pathophysiology:</strong> Vasodilation (NO, cytokines) +
                      myocardial depression + capillary leak → hypotension + ↓tissue O₂ delivery
                    </li>
                    <li>
                      <strong>Vasopressor ladder:</strong> Norepinephrine 1st-line → +Vasopressin →
                      +Epinephrine → High-dose (SOFA 4 = refractory shock)
                    </li>
                    <li>
                      <strong>Critical threshold:</strong> MAP &lt;65 mmHg or high-dose vasopressors
                      = end-organ hypoperfusion risk
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">5️⃣ Central Nervous System (GCS):</p>
                  <ul class="q-ml-md">
                    <li><strong>Normal consciousness:</strong> GCS 15 (fully awake, oriented)</li>
                    <li>
                      <strong>Encephalopathy mechanisms:</strong> Hypoxia, hypoperfusion, uremic
                      toxins, hepatic encephalopathy, sepsis-associated delirium
                    </li>
                    <li>
                      <strong>Sedation confounding:</strong> GCS unreliable in sedated patients
                      (consider sedation-free assessment or exclude from SOFA)
                    </li>
                    <li>
                      <strong>Coma (GCS &lt;6):</strong> SOFA 4 = profound CNS dysfunction, high
                      mortality unless reversible cause
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">6️⃣ Renal (Creatinine/Urine Output):</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Normal creatinine:</strong> 0.6-1.2 mg/dL (varies by muscle mass, age,
                      sex)
                    </li>
                    <li>
                      <strong>AKI mechanisms:</strong> Pre-renal (hypoperfusion), intrinsic renal
                      (ATN, GN), post-renal (obstruction)
                    </li>
                    <li>
                      <strong>Septic AKI:</strong> Hemodynamic (hypotension) + inflammatory
                      (cytokine-mediated tubular injury) + microvascular dysfunction
                    </li>
                    <li>
                      <strong>KDIGO AKI stages:</strong> Stage 1 (Cr 1.5-1.9× baseline), Stage 2
                      (2.0-2.9×), Stage 3 (≥3× or ≥4 mg/dL or RRT)
                    </li>
                    <li>
                      <strong>Oliguria/anuria:</strong> &lt;500 mL/day (SOFA 3), &lt;200 mL/day
                      (SOFA 4) = severe AKI, likely RRT need
                    </li>
                  </ul>
                </div>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 3️⃣ HOW TO CALCULATE SOFA SCORE -->
          <q-expansion-item
            icon="calculate"
            color="medical-mint"
            label="How to Calculate SOFA Score"
            class="q-mt-sm"
            header-class="bg-green-1 text-green-9"
          >
            <q-card flat class="q-pa-md bg-green-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">Calculation Steps</p>

                <p><strong>Step 1: Collect Worst Values (24h window)</strong></p>
                <ul class="q-ml-md q-mb-md">
                  <li>
                    📊 Use <strong>worst value</strong> for each parameter in the past 24 hours
                  </li>
                  <li>⏰ For serial SOFA: same time each day (e.g., 08:00 AM rounds)</li>
                  <li>🔍 Ensure recent lab data: PaO₂, FiO₂, platelets, bilirubin, creatinine</li>
                  <li>
                    💊 Document MAP and any vasopressor doses (norepinephrine, dopamine,
                    epinephrine)
                  </li>
                  <li>🧠 Assess GCS without sedation if possible (or note sedation influence)</li>
                  <li>💧 Calculate 24h urine output (total mL/24h)</li>
                </ul>

                <p><strong>Step 2: Score Each Organ (0-4 points)</strong></p>
                <ul class="q-ml-md q-mb-md">
                  <li><strong>Respiration:</strong> Calculate PaO₂/FiO₂ ratio → Score 0-4</li>
                  <li><strong>Coagulation:</strong> Platelets count ×10³/μL → Score 0-4</li>
                  <li><strong>Liver:</strong> Bilirubin mg/dL → Score 0-4</li>
                  <li><strong>Cardiovascular:</strong> MAP and/or vasopressor doses → Score 0-4</li>
                  <li><strong>CNS:</strong> Best GCS in 24h → Score 0-4</li>
                  <li>
                    <strong>Renal:</strong> Creatinine mg/dL OR urine output → Score 0-4 (use worse)
                  </li>
                </ul>

                <p><strong>Step 3: Sum All 6 Organ Scores</strong></p>
                <ul class="q-ml-md q-mb-md">
                  <li>
                    🧮 <strong>Total SOFA Score</strong> = Respiration + Coagulation + Liver +
                    Cardiovascular + CNS + Renal
                  </li>
                  <li>📈 <strong>Range:</strong> 0-24 points (minimum 0, maximum 24)</li>
                  <li>
                    📝 <strong>Documentation:</strong> Record individual organ scores + total (e.g.,
                    "SOFA 12: R3 C2 L1 CV4 CNS1 Re1")
                  </li>
                </ul>

                <p><strong>Step 4: Calculate Delta SOFA (if serial measurements)</strong></p>
                <ul class="q-ml-md q-mb-md">
                  <li>Δ<strong>SOFA</strong> = SOFA(current) - SOFA(baseline or previous)</li>
                  <li>
                    📊 <strong>Interpretation:</strong> ΔSOFA ≥+2 points = significant deterioration
                    (10% ↑ mortality per point)
                  </li>
                  <li>
                    📉 <strong>Improvement:</strong> ΔSOFA negative = organ function recovery
                    (favorable prognosis)
                  </li>
                  <li>
                    🦠 <strong>Sepsis-3 definition:</strong> Infection + ΔSOFA ≥2 = Sepsis (organ
                    dysfunction)
                  </li>
                </ul>

                <q-separator class="q-my-md" />

                <p class="text-weight-bold text-h6 q-mb-sm">Special Considerations</p>

                <div class="q-mb-md">
                  <p class="text-weight-bold">🫁 Respiration (PaO₂/FiO₂):</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Calculate P/F ratio:</strong> PaO₂ (mmHg) / FiO₂ (decimal, e.g., 0.40
                      for 40% oxygen)
                    </li>
                    <li>
                      <strong>Example:</strong> PaO₂ 80 mmHg on FiO₂ 0.50 → P/F = 80/0.50 = 160 →
                      SOFA 3
                    </li>
                    <li>
                      <strong>Respiratory support:</strong> Score 3-4 require ventilatory support
                      (mechanical ventilation, CPAP, high-flow)
                    </li>
                    <li>
                      <strong>If no ABG:</strong> Use SpO₂/FiO₂ ratio as surrogate (less accurate)
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">💊 Cardiovascular (Vasopressors):</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Doses in μg/kg/min:</strong> Dopamine, dobutamine, epinephrine,
                      norepinephrine
                    </li>
                    <li><strong>Duration:</strong> Administered for ≥1 hour to count</li>
                    <li>
                      <strong>Combination:</strong> If multiple vasopressors → use highest scoring
                      agent
                    </li>
                    <li>
                      <strong>MAP without vasopressors:</strong> If MAP &lt;70 mmHg without drugs →
                      SOFA 1
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">🧠 CNS (Glasgow Coma Scale):</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Best GCS in 24h:</strong> Use highest GCS observed (avoid sedation
                      periods if possible)
                    </li>
                    <li>
                      <strong>Sedation influence:</strong> If heavily sedated entire 24h → consider
                      excluding CNS from SOFA or note limitation
                    </li>
                    <li>
                      <strong>Intubated patients:</strong> Cannot assess verbal component → use E +
                      M only (max GCS 10)
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">💧 Renal (Creatinine OR Urine Output):</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Use WORSE of two:</strong> Creatinine mg/dL OR urine output mL/day
                    </li>
                    <li>
                      <strong>Baseline creatinine:</strong> If chronic kidney disease known → adjust
                      interpretation (use ΔSOFA renal)
                    </li>
                    <li>
                      <strong>RRT patients:</strong> On dialysis → automatically SOFA 4 for renal
                    </li>
                  </ul>
                </div>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 4️⃣ FORMULA AND SCORING TABLES -->
          <q-expansion-item
            icon="functions"
            color="medical-mint"
            label="Formula and Scoring Tables"
            class="q-mt-sm"
            header-class="bg-cyan-1 text-cyan-9"
          >
            <q-card flat class="q-pa-md bg-cyan-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm text-center">SOFA Score Formula</p>
                <p class="text-center text-h5 q-mb-md">
                  <strong
                    >SOFA = Respiration + Coagulation + Liver + Cardiovascular + CNS + Renal</strong
                  >
                </p>
                <p class="text-center text-grey-7 q-mb-lg">
                  Each organ scored 0-4 points → Total range 0-24 points
                </p>

                <q-separator class="q-my-md" />

                <p class="text-weight-bold text-h6 q-mb-sm">Detailed Scoring Tables</p>

                <!-- Respiration Table -->
                <div class="q-mb-md">
                  <p class="text-weight-bold">🫁 Respiration (PaO₂/FiO₂ mmHg):</p>
                  <q-markup-table dense flat bordered>
                    <thead>
                      <tr>
                        <th>Score</th>
                        <th>PaO₂/FiO₂ Ratio</th>
                        <th>Clinical Interpretation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>0</strong></td>
                        <td>≥400</td>
                        <td>Normal oxygenation</td>
                      </tr>
                      <tr>
                        <td><strong>1</strong></td>
                        <td>&lt;400</td>
                        <td>Mild hypoxemia</td>
                      </tr>
                      <tr>
                        <td><strong>2</strong></td>
                        <td>&lt;300</td>
                        <td>Moderate hypoxemia (Mild ARDS)</td>
                      </tr>
                      <tr>
                        <td><strong>3</strong></td>
                        <td>&lt;200 + ventilation</td>
                        <td>Severe hypoxemia (Moderate ARDS)</td>
                      </tr>
                      <tr>
                        <td><strong>4</strong></td>
                        <td>&lt;100 + ventilation</td>
                        <td>Profound ARDS (Severe)</td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>

                <!-- Coagulation Table -->
                <div class="q-mb-md">
                  <p class="text-weight-bold">🩸 Coagulation (Platelets ×10³/μL):</p>
                  <q-markup-table dense flat bordered>
                    <thead>
                      <tr>
                        <th>Score</th>
                        <th>Platelet Count</th>
                        <th>Clinical Interpretation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>0</strong></td>
                        <td>≥150</td>
                        <td>Normal coagulation</td>
                      </tr>
                      <tr>
                        <td><strong>1</strong></td>
                        <td>&lt;150</td>
                        <td>Mild thrombocytopenia</td>
                      </tr>
                      <tr>
                        <td><strong>2</strong></td>
                        <td>&lt;100</td>
                        <td>Moderate thrombocytopenia</td>
                      </tr>
                      <tr>
                        <td><strong>3</strong></td>
                        <td>&lt;50</td>
                        <td>Severe (bleeding risk)</td>
                      </tr>
                      <tr>
                        <td><strong>4</strong></td>
                        <td>&lt;20</td>
                        <td>Critical (spontaneous bleeding)</td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>

                <!-- Liver Table -->
                <div class="q-mb-md">
                  <p class="text-weight-bold">🟡 Liver (Bilirubin mg/dL):</p>
                  <q-markup-table dense flat bordered>
                    <thead>
                      <tr>
                        <th>Score</th>
                        <th>Bilirubin</th>
                        <th>Clinical Interpretation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>0</strong></td>
                        <td>&lt;1.2</td>
                        <td>Normal liver function</td>
                      </tr>
                      <tr>
                        <td><strong>1</strong></td>
                        <td>1.2-1.9</td>
                        <td>Mild hyperbilirubinemia</td>
                      </tr>
                      <tr>
                        <td><strong>2</strong></td>
                        <td>2.0-5.9</td>
                        <td>Moderate jaundice</td>
                      </tr>
                      <tr>
                        <td><strong>3</strong></td>
                        <td>6.0-11.9</td>
                        <td>Severe hepatic dysfunction</td>
                      </tr>
                      <tr>
                        <td><strong>4</strong></td>
                        <td>≥12.0</td>
                        <td>Hepatic failure</td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>

                <!-- Cardiovascular Table -->
                <div class="q-mb-md">
                  <p class="text-weight-bold">❤️ Cardiovascular (MAP/Vasopressors):</p>
                  <q-markup-table dense flat bordered>
                    <thead>
                      <tr>
                        <th>Score</th>
                        <th>MAP or Vasopressor Doses</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>0</strong></td>
                        <td>MAP ≥70 mmHg</td>
                      </tr>
                      <tr>
                        <td><strong>1</strong></td>
                        <td>MAP &lt;70 mmHg</td>
                      </tr>
                      <tr>
                        <td><strong>2</strong></td>
                        <td>Dopamine ≤5 OR Dobutamine (any)</td>
                      </tr>
                      <tr>
                        <td><strong>3</strong></td>
                        <td>Dopamine >5 OR Epi ≤0.1 OR Norepi ≤0.1 (μg/kg/min)</td>
                      </tr>
                      <tr>
                        <td><strong>4</strong></td>
                        <td>Dopamine >15 OR Epi >0.1 OR Norepi >0.1 (μg/kg/min)</td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>

                <!-- CNS Table -->
                <div class="q-mb-md">
                  <p class="text-weight-bold">🧠 CNS (Glasgow Coma Scale):</p>
                  <q-markup-table dense flat bordered>
                    <thead>
                      <tr>
                        <th>Score</th>
                        <th>GCS</th>
                        <th>Clinical Interpretation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>0</strong></td>
                        <td>15</td>
                        <td>Fully awake and oriented</td>
                      </tr>
                      <tr>
                        <td><strong>1</strong></td>
                        <td>13-14</td>
                        <td>Mild altered mental status</td>
                      </tr>
                      <tr>
                        <td><strong>2</strong></td>
                        <td>10-12</td>
                        <td>Moderate confusion/drowsiness</td>
                      </tr>
                      <tr>
                        <td><strong>3</strong></td>
                        <td>6-9</td>
                        <td>Severe coma (localizes pain)</td>
                      </tr>
                      <tr>
                        <td><strong>4</strong></td>
                        <td>&lt;6</td>
                        <td>Deep coma (no response)</td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>

                <!-- Renal Table -->
                <div class="q-mb-md">
                  <p class="text-weight-bold">💧 Renal (Creatinine mg/dL OR Urine Output):</p>
                  <q-markup-table dense flat bordered>
                    <thead>
                      <tr>
                        <th>Score</th>
                        <th>Creatinine OR Urine Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>0</strong></td>
                        <td>&lt;1.2 mg/dL</td>
                      </tr>
                      <tr>
                        <td><strong>1</strong></td>
                        <td>1.2-1.9 mg/dL</td>
                      </tr>
                      <tr>
                        <td><strong>2</strong></td>
                        <td>2.0-3.4 mg/dL</td>
                      </tr>
                      <tr>
                        <td><strong>3</strong></td>
                        <td>3.5-4.9 mg/dL OR &lt;500 mL/day</td>
                      </tr>
                      <tr>
                        <td><strong>4</strong></td>
                        <td>≥5.0 mg/dL OR &lt;200 mL/day OR RRT</td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>

                <q-separator class="q-my-md" />

                <p class="text-weight-bold text-h6 q-mb-sm">Delta SOFA (ΔSOFA) Calculation</p>
                <p class="text-center q-mb-sm">
                  <strong>ΔSOFA = SOFA(current) - SOFA(baseline)</strong>
                </p>
                <ul class="q-ml-md">
                  <li>
                    <strong>Baseline:</strong> First SOFA score on ICU admission OR pre-illness
                    baseline if known
                  </li>
                  <li>
                    <strong>ΔSOFA ≥+2:</strong> Sepsis criterion (Sepsis-3 definition), 10%
                    increased mortality per point
                  </li>
                  <li>
                    <strong>ΔSOFA negative:</strong> Improving organ function (favorable trajectory)
                  </li>
                  <li>
                    <strong>ΔSOFA +3-4:</strong> Significant clinical deterioration, reassess
                    treatment
                  </li>
                </ul>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 5️⃣ CLINICAL INTERPRETATION -->
          <q-expansion-item
            icon="psychology"
            color="medical-mint"
            label="Clinical Interpretation and Mortality Prediction"
            class="q-mt-sm"
            header-class="bg-orange-1 text-orange-9"
          >
            <q-card flat class="q-pa-md bg-orange-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">Mortality Risk Stratification</p>

                <div class="q-mb-md">
                  <q-chip color="green" text-color="white" dense class="q-mb-xs">
                    <q-icon name="check_circle" class="q-mr-xs" />
                    SOFA 0-6: Low Risk
                  </q-chip>
                  <p>
                    <strong>Mortality risk:</strong> &lt;10-15% in-hospital mortality<br />
                    <strong>Clinical status:</strong> Mild organ dysfunction or single organ
                    involvement<br />
                    <strong>ICU course:</strong> Typically shorter ICU stay, good recovery
                    potential<br />
                    <strong>Management:</strong> Standard ICU care, monitor for deterioration
                  </p>
                </div>

                <div class="q-mb-md">
                  <q-chip color="orange" text-color="white" dense class="q-mb-xs">
                    <q-icon name="warning" class="q-mr-xs" />
                    SOFA 7-9: Moderate Risk
                  </q-chip>
                  <p>
                    <strong>Mortality risk:</strong> 15-20% in-hospital mortality<br />
                    <strong>Clinical status:</strong> Moderate multi-organ dysfunction<br />
                    <strong>ICU course:</strong> Prolonged ICU stay likely, requires close
                    monitoring<br />
                    <strong>Management:</strong> Aggressive organ support, daily SOFA trending
                  </p>
                </div>

                <div class="q-mb-md">
                  <q-chip color="red" text-color="white" dense class="q-mb-xs">
                    <q-icon name="dangerous" class="q-mr-xs" />
                    SOFA 10-12: High Risk
                  </q-chip>
                  <p>
                    <strong>Mortality risk:</strong> 40-50% in-hospital mortality<br />
                    <strong>Clinical status:</strong> Severe multi-organ failure<br />
                    <strong>ICU course:</strong> Very prolonged ICU stay, complex management<br />
                    <strong>Management:</strong> Maximum organ support, consider advanced therapies
                    (ECMO, RRT, etc.)
                  </p>
                </div>

                <div class="q-mb-md">
                  <q-chip color="red-10" text-color="white" dense class="q-mb-xs">
                    <q-icon name="local_hospital" class="q-mr-xs" />
                    SOFA 13-14: Very High Risk
                  </q-chip>
                  <p>
                    <strong>Mortality risk:</strong> 50-95% in-hospital mortality<br />
                    <strong>Clinical status:</strong> Profound multiple organ failure<br />
                    <strong>ICU course:</strong> Salvage therapy, extremely poor prognosis<br />
                    <strong>Management:</strong> Maximum ICU resources, family discussions about
                    goals of care
                  </p>
                </div>

                <div class="q-mb-lg">
                  <q-chip color="red-10" text-color="white" dense class="q-mb-xs">
                    <q-icon name="report" class="q-mr-xs" />
                    SOFA ≥15: Catastrophic
                  </q-chip>
                  <p>
                    <strong>Mortality risk:</strong> >90% in-hospital mortality<br />
                    <strong>Clinical status:</strong> Multi-organ failure with extremely poor
                    prognosis<br />
                    <strong>ICU course:</strong> Survival extremely rare<br />
                    <strong>Management:</strong> Palliative care discussions appropriate, withdrawal
                    of care may be considered
                  </p>
                </div>

                <q-separator class="q-my-md" />

                <p class="text-weight-bold text-h6 q-mb-sm">Delta SOFA (ΔSOFA) Interpretation</p>

                <ul class="q-ml-md">
                  <li>
                    <strong>ΔSOFA +1 point:</strong> ~10% increased mortality risk per point
                    increase
                  </li>
                  <li>
                    <strong>ΔSOFA ≥+2 points (within 48h):</strong> Sepsis-3 criterion for organ
                    dysfunction. Significant clinical deterioration. Triggers sepsis bundle
                    protocols (antibiotics, fluid resuscitation, source control).
                  </li>
                  <li>
                    <strong>ΔSOFA +3-4 points:</strong> Severe deterioration, reassess diagnosis and
                    treatment. Consider missed infection source, resistant organisms, complications.
                  </li>
                  <li>
                    <strong>ΔSOFA negative (decreasing):</strong> Improving organ function,
                    favorable trajectory. Treatment effective, consider de-escalation when
                    appropriate.
                  </li>
                  <li>
                    <strong>ΔSOFA plateau (unchanged):</strong> Static course, neither improving nor
                    worsening. May indicate chronic organ dysfunction or treatment equilibrium.
                  </li>
                </ul>

                <q-separator class="q-my-md" />

                <p class="text-weight-bold text-h6 q-mb-sm">Sepsis-3 Definition Integration</p>
                <p>
                  <strong>Sepsis (Sepsis-3):</strong> Life-threatening organ dysfunction caused by
                  dysregulated host response to infection
                </p>
                <ul class="q-ml-md">
                  <li>
                    <strong>Criteria:</strong> Suspected or documented infection +
                    <strong>ΔSOFA ≥2 points</strong>
                  </li>
                  <li>
                    <strong>Baseline SOFA:</strong> Assume 0 if no pre-existing organ dysfunction
                    known
                  </li>
                  <li>
                    <strong>Septic Shock:</strong> Sepsis + vasopressor requirement (MAP ≥65 mmHg) +
                    lactate >2 mmol/L despite adequate fluid resuscitation
                  </li>
                  <li>
                    <strong>Mortality:</strong> Sepsis ~10%, Septic Shock ~40% in-hospital mortality
                  </li>
                </ul>

                <q-banner class="bg-orange-2 text-orange-9 q-mt-md" dense rounded>
                  <template v-slot:avatar>
                    <q-icon name="info" color="orange" />
                  </template>
                  <strong>Clinical Pearl:</strong> Serial SOFA trending (daily) is MORE predictive
                  than single baseline SOFA. Worsening ΔSOFA indicates treatment failure or
                  complications. Improving ΔSOFA validates treatment efficacy.
                </q-banner>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 6️⃣ CLINICAL APPLICATIONS -->
          <q-expansion-item
            icon="medical_services"
            color="medical-mint"
            label="Clinical Applications of SOFA Score"
            class="q-mt-sm"
            header-class="bg-teal-1 text-teal-9"
          >
            <q-card flat class="q-pa-md bg-teal-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">Primary Clinical Uses</p>

                <div class="q-mb-md">
                  <p class="text-weight-bold">
                    1️⃣ Sepsis Diagnosis and Severity Stratification (Sepsis-3)
                  </p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Screening:</strong> qSOFA (quick SOFA) ≥2 → triggers full SOFA
                      calculation
                    </li>
                    <li>
                      <strong>Diagnosis:</strong> Infection + ΔSOFA ≥2 = Sepsis (organ dysfunction)
                    </li>
                    <li>
                      <strong>Severity:</strong> Baseline SOFA 0-6 (less severe), 7-12 (moderate),
                      ≥13 (severe)
                    </li>
                    <li>
                      <strong>Septic shock:</strong> Sepsis + vasopressors + lactate >2 mmol/L
                    </li>
                    <li>
                      <strong>Triggers:</strong> SOFA ≥2 → initiate sepsis bundles (1-hour bundle:
                      blood cultures, antibiotics, fluid resuscitation)
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">2️⃣ ICU Admission Triage and Bed Allocation</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Baseline SOFA >10:</strong> High-risk patient, requires intensive
                      monitoring and resources
                    </li>
                    <li>
                      <strong>Resource allocation:</strong> Prioritize ICU beds for SOFA >8 during
                      surge capacity
                    </li>
                    <li>
                      <strong>Step-down criteria:</strong> SOFA decreasing to &lt;6 with stable
                      trend → consider ICU discharge to step-down unit
                    </li>
                    <li>
                      <strong>Prognosis discussion:</strong> SOFA ≥15 → poor prognosis, discuss
                      goals of care with family
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">3️⃣ Serial Monitoring and Deterioration Detection</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Daily SOFA:</strong> Calculate at same time each day (e.g., morning
                      rounds 08:00)
                    </li>
                    <li>
                      <strong>Trend analysis:</strong> Graph SOFA over time to visualize trajectory
                      (improving vs worsening)
                    </li>
                    <li>
                      <strong>Alert thresholds:</strong> ΔSOFA ≥+2 in 24-48h → clinical alert,
                      reassess treatment plan
                    </li>
                    <li>
                      <strong>Organ-specific deterioration:</strong> Track individual organ scores
                      to identify failing system (e.g., renal SOFA 0→3 = new AKI)
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">4️⃣ Clinical Trial Endpoints and Research</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Inclusion criteria:</strong> Many sepsis trials require baseline SOFA
                      ≥2 or specific organ SOFA thresholds
                    </li>
                    <li>
                      <strong>Primary outcome:</strong> ΔSOFA at day 7 or ICU discharge used as
                      efficacy endpoint
                    </li>
                    <li>
                      <strong>Stratification:</strong> Randomize by baseline SOFA categories (e.g.,
                      &lt;8 vs ≥8) to balance severity
                    </li>
                    <li>
                      <strong>Standardized measure:</strong> Allows comparison across international
                      studies and institutions
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">5️⃣ Prognostic Communication with Families</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Baseline SOFA 8-12:</strong> "Your family member has moderate organ
                      dysfunction, 15-50% mortality risk, prolonged ICU stay expected"
                    </li>
                    <li>
                      <strong>SOFA ≥15:</strong> "Catastrophic multi-organ failure, >90% mortality,
                      palliative care discussions appropriate"
                    </li>
                    <li>
                      <strong>Improving ΔSOFA:</strong> "Organ function recovering, treatment
                      effective, favorable prognosis"
                    </li>
                    <li>
                      <strong>Worsening ΔSOFA:</strong> "Condition deteriorating despite treatment,
                      need to reassess goals of care"
                    </li>
                  </ul>
                </div>

                <div class="q-mb-lg">
                  <p class="text-weight-bold">6️⃣ Quality Metrics and ICU Performance</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Severity-adjusted mortality:</strong> Compare observed vs predicted
                      mortality (Standardized Mortality Ratio)
                    </li>
                    <li>
                      <strong>ICU benchmarking:</strong> SOFA used in APACHE IV, SAPS 3 models for
                      severity adjustment
                    </li>
                    <li>
                      <strong>Length of stay prediction:</strong> Baseline SOFA correlates with ICU
                      LOS and mechanical ventilation days
                    </li>
                    <li>
                      <strong>Risk stratification:</strong> Report outcomes stratified by SOFA
                      categories for quality improvement
                    </li>
                  </ul>
                </div>

                <q-separator class="q-my-md" />

                <p class="text-weight-bold text-h6 q-mb-sm">qSOFA (quick SOFA) Screening Tool</p>
                <p>
                  <strong>Purpose:</strong> Rapid bedside screening for sepsis risk (ED, ward,
                  pre-hospital)
                </p>
                <ul class="q-ml-md">
                  <li>
                    <strong>Criteria (1 point each):</strong> (1) Respiratory rate ≥22/min, (2)
                    Altered mental status (GCS &lt;15), (3) Systolic BP ≤100 mmHg
                  </li>
                  <li>
                    <strong>qSOFA ≥2:</strong> Positive screen → calculate full SOFA score, initiate
                    sepsis workup
                  </li>
                  <li>
                    <strong>Advantages:</strong> No lab tests required, fast bedside assessment (1
                    minute)
                  </li>
                  <li>
                    <strong>Limitations:</strong> Lower sensitivity than full SOFA (more false
                    negatives), not for diagnosis (screening only)
                  </li>
                </ul>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 7️⃣ REFERENCE VALUES AND ALERTS -->
          <q-expansion-item
            icon="warning"
            color="medical-mint"
            label="Reference Values and Critical Alerts"
            class="q-mt-sm"
            header-class="bg-red-1 text-red-9"
          >
            <q-card flat class="q-pa-md bg-red-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">Organ-Specific Critical Thresholds</p>

                <div class="q-mb-md">
                  <p class="text-weight-bold">🫁 Respiration:</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Normal P/F ratio:</strong> ≥400 mmHg (room air or minimal supplemental
                      O₂)
                    </li>
                    <li><strong>Mild ARDS:</strong> P/F 200-300 (SOFA 2, moderate hypoxemia)</li>
                    <li>
                      <strong>Moderate ARDS:</strong> P/F 100-200 (SOFA 3, severe hypoxemia,
                      requires ventilation)
                    </li>
                    <li>
                      <strong>Severe ARDS:</strong> P/F &lt;100 (SOFA 4, refractory hypoxemia,
                      consider ECMO, proning, recruitment maneuvers)
                    </li>
                    <li>
                      <strong>⚠️ ALERT:</strong> P/F &lt;100 despite optimal ventilation → rescue
                      therapies (ECMO, prone positioning, inhaled NO)
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">🩸 Coagulation:</p>
                  <ul class="q-ml-md">
                    <li><strong>Normal platelets:</strong> 150-400 ×10³/μL</li>
                    <li>
                      <strong>Moderate thrombocytopenia:</strong> 50-100K (SOFA 2-3, monitor
                      bleeding risk)
                    </li>
                    <li>
                      <strong>Severe thrombocytopenia:</strong> &lt;50K (SOFA 3, prophylactic
                      platelet transfusion if procedures/bleeding)
                    </li>
                    <li>
                      <strong>Critical thrombocytopenia:</strong> &lt;20K (SOFA 4, spontaneous
                      bleeding risk, urgent platelet transfusion)
                    </li>
                    <li>
                      <strong>⚠️ ALERT:</strong> Platelets &lt;20K + active bleeding → emergent
                      transfusion, consider DIC workup (PT/PTT, fibrinogen, D-dimer)
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">🟡 Liver:</p>
                  <ul class="q-ml-md">
                    <li><strong>Normal bilirubin:</strong> &lt;1.2 mg/dL</li>
                    <li>
                      <strong>Moderate hyperbilirubinemia:</strong> 2-6 mg/dL (SOFA 2, jaundice
                      visible)
                    </li>
                    <li>
                      <strong>Severe hepatic dysfunction:</strong> 6-12 mg/dL (SOFA 3, consider
                      hepatic encephalopathy risk)
                    </li>
                    <li>
                      <strong>Hepatic failure:</strong> ≥12 mg/dL (SOFA 4, check coagulation,
                      ammonia, consider liver transplant evaluation)
                    </li>
                    <li>
                      <strong>⚠️ ALERT:</strong> Bilirubin ≥12 + INR >2.0 + encephalopathy → acute
                      liver failure, hepatology consult urgent
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">❤️ Cardiovascular:</p>
                  <ul class="q-ml-md">
                    <li><strong>Normal MAP:</strong> ≥70 mmHg without vasopressors</li>
                    <li>
                      <strong>Hypotension:</strong> MAP &lt;70 mmHg (SOFA 1, fluid resuscitation)
                    </li>
                    <li>
                      <strong>Low-dose vasopressors:</strong> Dopamine ≤5 or dobutamine (SOFA 2)
                    </li>
                    <li>
                      <strong>Moderate vasopressors:</strong> Dopamine >5 or low-dose epi/norepi
                      (SOFA 3, septic shock)
                    </li>
                    <li>
                      <strong>High-dose vasopressors:</strong> Dopamine >15 or high-dose epi/norepi
                      (SOFA 4, refractory shock)
                    </li>
                    <li>
                      <strong>⚠️ ALERT:</strong> SOFA CV 4 (refractory shock) → exclude tamponade,
                      tension pneumothorax, PE, consider ECMO, stress-dose steroids
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">🧠 CNS:</p>
                  <ul class="q-ml-md">
                    <li><strong>Normal consciousness:</strong> GCS 15 (fully awake)</li>
                    <li><strong>Mild AMS:</strong> GCS 13-14 (SOFA 1, confusion/disorientation)</li>
                    <li><strong>Moderate AMS:</strong> GCS 10-12 (SOFA 2, drowsy but arousable)</li>
                    <li>
                      <strong>Severe coma:</strong> GCS 6-9 (SOFA 3, localizes pain, consider
                      intubation for airway protection)
                    </li>
                    <li>
                      <strong>Deep coma:</strong> GCS &lt;6 (SOFA 4, no response, poor prognosis)
                    </li>
                    <li>
                      <strong>⚠️ ALERT:</strong> GCS &lt;6 + fixed dilated pupils → brain death
                      evaluation, CT head urgent
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">💧 Renal:</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Normal creatinine:</strong> 0.6-1.2 mg/dL (varies by age/sex/muscle
                      mass)
                    </li>
                    <li>
                      <strong>AKI Stage 1:</strong> Cr 1.2-1.9 (SOFA 1, monitor, optimize
                      hemodynamics)
                    </li>
                    <li>
                      <strong>AKI Stage 2:</strong> Cr 2.0-3.4 (SOFA 2, nephrology aware, avoid
                      nephrotoxins)
                    </li>
                    <li>
                      <strong>AKI Stage 3:</strong> Cr 3.5-4.9 or oliguria &lt;500 mL/day (SOFA 3,
                      consider RRT soon)
                    </li>
                    <li>
                      <strong>Renal failure:</strong> Cr ≥5.0 or anuria &lt;200 mL/day (SOFA 4, RRT
                      indicated)
                    </li>
                    <li>
                      <strong>⚠️ ALERT:</strong> SOFA Renal 4 + hyperkalemia (K+ >6.5) or pulmonary
                      edema → emergent dialysis
                    </li>
                  </ul>
                </div>

                <q-separator class="q-my-md" />

                <p class="text-weight-bold text-h6 q-mb-sm">Critical SOFA Alert Thresholds</p>
                <q-list dense class="bg-red-2">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="red" name="dangerous" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">SOFA ≥15</q-item-label>
                      <q-item-label caption>
                        Catastrophic multi-organ failure. >90% mortality. Palliative care
                        discussions appropriate.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="red" name="trending_up" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">ΔSOFA ≥+2 in 24-48h</q-item-label>
                      <q-item-label caption>
                        Sepsis criterion. Significant deterioration. Reassess diagnosis, treatment,
                        infection source control.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="orange" name="warning" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">Any single organ SOFA 4</q-item-label>
                      <q-item-label caption>
                        Severe single organ failure. High risk. Requires aggressive organ-specific
                        support (e.g., ECMO for respiratory SOFA 4, RRT for renal SOFA 4).
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="orange" name="speed" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">SOFA 10-12</q-item-label>
                      <q-item-label caption>
                        High risk. 40-50% mortality. Very prolonged ICU course expected. Maximum
                        organ support indicated.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-md" />

                <p class="text-weight-bold text-h6 q-mb-sm">
                  Baseline and Chronic Organ Dysfunction
                </p>
                <ul class="q-ml-md">
                  <li>
                    <strong>Known baseline SOFA:</strong> If chronic organ dysfunction pre-illness
                    (e.g., ESRD, cirrhosis, COPD) → use pre-illness baseline SOFA for ΔSOFA
                    calculation
                  </li>
                  <li>
                    <strong>Dialysis patients:</strong> Renal SOFA automatically 4 (on RRT) → focus
                    on other organ scores
                  </li>
                  <li>
                    <strong>Elderly/frail:</strong> May have higher baseline SOFA (e.g., mild renal
                    impairment Cr 1.5) → interpret absolute SOFA with caution, ΔSOFA more valuable
                  </li>
                  <li>
                    <strong>Pediatrics:</strong> SOFA not validated &lt;18 years → use Pediatric
                    SOFA (pSOFA) or PELOD-2 score instead
                  </li>
                </ul>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 8️⃣ MEDICAL DOCUMENTATION AND GUIDELINES -->
          <q-expansion-item
            icon="menu_book"
            color="medical-mint"
            label="Medical Documentation and Guidelines"
            class="q-mt-sm"
            header-class="bg-indigo-1 text-indigo-9"
          >
            <q-card flat class="q-pa-md bg-indigo-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">
                  International Guidelines and Consensus Definitions
                </p>

                <div class="q-mb-md">
                  <p class="text-weight-bold">📋 Sepsis-3 Consensus Definitions (2016)</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Task Force:</strong> Society of Critical Care Medicine (SCCM) +
                      European Society of Intensive Care Medicine (ESICM)
                    </li>
                    <li>
                      <strong>Sepsis definition:</strong> Life-threatening organ dysfunction caused
                      by dysregulated host response to infection, operationalized as
                      <strong>SOFA score ≥2 points</strong> from baseline
                    </li>
                    <li>
                      <strong>Septic shock definition:</strong> Sepsis + vasopressor requirement to
                      maintain MAP ≥65 mmHg + serum lactate >2 mmol/L despite adequate fluid
                      resuscitation
                    </li>
                    <li>
                      <strong>qSOFA screening:</strong> Respiratory rate ≥22/min, altered mental
                      status (GCS &lt;15), systolic BP ≤100 mmHg (≥2 of 3 → positive screen)
                    </li>
                    <li>
                      <strong>Impact:</strong> Replaced SIRS criteria (Sepsis-1/2 definitions).
                      SOFA-based definition improves prognostic accuracy and clinical relevance.
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">📋 Surviving Sepsis Campaign Guidelines (2021)</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>1-Hour Bundle:</strong> Measure lactate, obtain blood cultures before
                      antibiotics, administer broad-spectrum antibiotics, begin rapid fluid
                      resuscitation (30 mL/kg crystalloid) if sepsis/septic shock suspected
                    </li>
                    <li>
                      <strong>SOFA role:</strong> Used to confirm organ dysfunction (SOFA ≥2 from
                      baseline) and guide treatment escalation
                    </li>
                    <li>
                      <strong>Serial monitoring:</strong> Daily SOFA scores recommended to assess
                      treatment response and guide de-escalation
                    </li>
                    <li>
                      <strong>Vasopressor guidelines:</strong> Norepinephrine first-line, target MAP
                      ≥65 mmHg, add vasopressin or epinephrine if refractory (aligns with SOFA
                      cardiovascular scoring)
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">📋 Berlin ARDS Definition (2012)</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Integration with SOFA:</strong> SOFA respiration component based on
                      P/F ratio aligns with Berlin ARDS severity categories
                    </li>
                    <li><strong>Mild ARDS:</strong> P/F 200-300 (SOFA respiratory 2)</li>
                    <li><strong>Moderate ARDS:</strong> P/F 100-200 (SOFA respiratory 3)</li>
                    <li><strong>Severe ARDS:</strong> P/F &lt;100 (SOFA respiratory 4)</li>
                    <li>
                      <strong>Ventilation requirement:</strong> SOFA 3-4 require respiratory support
                      (mechanical ventilation, CPAP, or high-flow nasal cannula ≥10 L/min)
                    </li>
                  </ul>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">📋 KDIGO AKI Guidelines (2012)</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>AKI staging:</strong> Stage 1 (Cr 1.5-1.9× baseline), Stage 2
                      (2.0-2.9×), Stage 3 (≥3× or ≥4 mg/dL or RRT) partially aligns with SOFA renal
                      scoring
                    </li>
                    <li>
                      <strong>Urine output criteria:</strong> SOFA uses &lt;500 mL/day (SOFA 3) and
                      &lt;200 mL/day (SOFA 4), similar to KDIGO AKI UO criteria
                    </li>
                    <li>
                      <strong>RRT indication:</strong> SOFA renal 4 often indicates RRT candidacy
                      (severe AKI, oliguria/anuria)
                    </li>
                  </ul>
                </div>

                <q-separator class="q-my-md" />

                <p class="text-weight-bold text-h6 q-mb-sm">
                  Clinical Documentation Best Practices
                </p>

                <div class="q-mb-md">
                  <p class="text-weight-bold">📝 SOFA Score Documentation Template:</p>
                  <q-card flat bordered class="q-pa-sm bg-white">
                    <pre class="text-caption q-ma-none">
<strong>ICU Day 3 - SOFA Score:</strong>

<strong>Total SOFA: 12</strong> (↑ from Day 2 SOFA 10, ΔSOFA +2)

<strong>Individual Organ Scores:</strong>
- Respiration: 3 (P/F ratio 180 mmHg on FiO₂ 0.60, intubated)
- Coagulation: 2 (Platelets 95 ×10³/μL, ↓ from 120K)
- Liver: 1 (Bilirubin 1.8 mg/dL)
- Cardiovascular: 4 (Norepinephrine 0.25 μg/kg/min, MAP 68 mmHg)
- CNS: 1 (GCS 14, sedation off for assessment)
- Renal: 1 (Creatinine 1.7 mg/dL, UO 1200 mL/24h)

<strong>Clinical Interpretation:</strong>
High-risk patient with severe multi-organ dysfunction.
ΔSOFA +2 indicates deterioration despite antibiotics/fluids.

<strong>Action Plan:</strong>
1. Broaden antibiotics (add antifungal coverage)
2. Increase vasopressor support (MAP target 65-70 mmHg)
3. CT abdomen for source control evaluation
4. Family meeting to discuss prognosis (40-50% mortality risk)
5. Continue daily SOFA trending
                      </pre>
                  </q-card>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">📊 Serial SOFA Trending Chart (recommend in EMR):</p>
                  <ul class="q-ml-md">
                    <li>
                      <strong>Daily total SOFA:</strong> Graph over ICU stay to visualize trajectory
                    </li>
                    <li>
                      <strong>Organ-specific trends:</strong> Track individual organ scores to
                      identify specific failures (e.g., renal SOFA 0→3 = new AKI)
                    </li>
                    <li>
                      <strong>Color-coding:</strong> Green (SOFA 0-6), Orange (7-12), Red (≥13) for
                      quick severity assessment
                    </li>
                    <li>
                      <strong>Annotations:</strong> Mark major interventions (e.g., "Day 2:
                      Antibiotics changed", "Day 4: Source control surgery")
                    </li>
                  </ul>
                </div>

                <q-separator class="q-my-md" />

                <p class="text-weight-bold text-h6 q-mb-sm">
                  Research and Quality Improvement Applications
                </p>

                <ul class="q-ml-md">
                  <li>
                    <strong>Clinical trial stratification:</strong> Randomize by baseline SOFA
                    (&lt;8 vs ≥8) to balance severity between arms
                  </li>
                  <li>
                    <strong>Primary endpoints:</strong> ΔSOFA at day 7, SOFA-free days (days alive
                    and with SOFA &lt;6), organ failure-free days
                  </li>
                  <li>
                    <strong>Secondary endpoints:</strong> Individual organ SOFA scores (e.g.,
                    respiratory SOFA improvement in ARDS trial)
                  </li>
                  <li>
                    <strong>ICU benchmarking:</strong> Severity-adjusted outcomes using SOFA in
                    APACHE IV, SAPS 3 models
                  </li>
                  <li>
                    <strong>Quality metrics:</strong> Sepsis mortality stratified by baseline SOFA
                    for hospital quality reporting
                  </li>
                </ul>
              </div>
            </q-card>
          </q-expansion-item>

          <!-- 9️⃣ SCIENTIFIC REFERENCES (PMID) -->
          <q-expansion-item
            icon="import_contacts"
            color="medical-mint"
            label="Scientific References (PMID Citations)"
            class="q-mt-sm"
            header-class="bg-purple-1 text-purple-9"
          >
            <q-card flat class="q-pa-md bg-purple-1">
              <div class="text-body2">
                <p class="text-weight-bold text-h6 q-mb-sm">Key Publications and PMID Citations</p>

                <div class="q-mb-md">
                  <p class="text-weight-bold">📄 Vincent JL, Moreno R, Takala J, et al. (1996)</p>
                  <p class="q-ml-md text-grey-8">
                    "The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ
                    dysfunction/failure"<br />
                    <em>Intensive Care Medicine</em>, 22(7): 707-710<br />
                    <strong>PMID: 8863252</strong><br />
                    <strong>Original SOFA score publication.</strong> Developed by European Society
                    of Intensive Care Medicine working group. Validated in 1449 ICU patients.
                    Proposed 6-organ scoring system (0-4 each, total 0-24). Demonstrated correlation
                    with ICU mortality (SOFA ≥15 → >90% mortality). Emphasized utility for
                    <strong>serial assessment</strong> (delta SOFA) rather than single time-point.
                  </p>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">
                    📄 Singer M, Deutschman CS, Seymour CW, et al. (2016)
                  </p>
                  <p class="q-ml-md text-grey-8">
                    "The Third International Consensus Definitions for Sepsis and Septic Shock
                    (Sepsis-3)"<br />
                    <em>JAMA</em>, 315(8): 801-810<br />
                    <strong>PMID: 26903338</strong><br />
                    <strong>Sepsis-3 consensus definitions.</strong> SCCM + ESICM task force.
                    Redefined sepsis as "life-threatening organ dysfunction (SOFA ≥2 from baseline)
                    caused by dysregulated host response to infection". Replaced SIRS criteria.
                    Introduced qSOFA screening tool. Validated in 148,907 patients across 12
                    databases. SOFA ≥2 had <strong>superior predictive validity</strong> vs SIRS
                    (AUROC 0.74 vs 0.64 for in-hospital mortality).
                  </p>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">📄 Ferreira FL, Bota DP, Bross A, et al. (2001)</p>
                  <p class="q-ml-md text-grey-8">
                    "Serial evaluation of the SOFA score to predict outcome in critically ill
                    patients"<br />
                    <em>JAMA</em>, 286(14): 1754-1758<br />
                    <strong>PMID: 11594901</strong><br />
                    <strong>Validation of serial SOFA monitoring.</strong> Studied 352 ICU patients
                    with serial SOFA measurements. Demonstrated that
                    <strong>ΔSOFA during first 48h</strong> is strong predictor of mortality (ΔSOFA
                    +1 point = ~10% ↑ mortality). Patients with SOFA ≥11 or increasing SOFA had
                    <strong>mortality rate >80%</strong>. Concluded serial assessment superior to
                    single admission SOFA for prognostication.
                  </p>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">📄 Seymour CW, Liu VX, Iwashyna TJ, et al. (2016)</p>
                  <p class="q-ml-md text-grey-8">
                    "Assessment of Clinical Criteria for Sepsis: For the Third International
                    Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)"<br />
                    <em>JAMA</em>, 315(8): 762-774<br />
                    <strong>PMID: 26903335</strong><br />
                    <strong>Sepsis-3 validation study.</strong> Analyzed 148,907 patients with
                    suspected infection across 12 international datasets. Compared SOFA, SIRS, LODS,
                    qSOFA for predicting in-hospital mortality.
                    <strong>SOFA ≥2 points:</strong> AUROC 0.74 (95% CI 0.73-0.76), sensitivity 63%,
                    specificity 79% for mortality. <strong>qSOFA ≥2:</strong> AUROC 0.66 outside
                    ICU, faster bedside screening but lower sensitivity than SOFA.
                  </p>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">📄 Raith EP, Udy AA, Bailey M, et al. (2017)</p>
                  <p class="q-ml-md text-grey-8">
                    "Prognostic Accuracy of the SOFA Score, SIRS Criteria, and qSOFA Score for
                    In-Hospital Mortality Among Adults With Suspected Infection Admitted to the
                    Intensive Care Unit"<br />
                    <em>JAMA</em>, 317(3): 290-300<br />
                    <strong>PMID: 28114553</strong><br />
                    <strong>Large ICU validation study.</strong> 184,875 ICU patients with suspected
                    infection from Australia/New Zealand ICU databases.
                    <strong>SOFA score:</strong> AUROC 0.753 for hospital mortality, superior to
                    SIRS (AUROC 0.589) and qSOFA (AUROC 0.690). Baseline SOFA ≥2 identified 93% of
                    ICU patients who died. Confirmed <strong>SOFA as best discriminator</strong> for
                    organ dysfunction and mortality in ICU sepsis.
                  </p>
                </div>

                <div class="q-mb-md">
                  <p class="text-weight-bold">
                    📄 Lambden S, Laterre PF, Levy MM, Francois B. (2019)
                  </p>
                  <p class="q-ml-md text-grey-8">
                    "The SOFA score—development, utility and challenges of accurate assessment in
                    clinical trials"<br />
                    <em>Critical Care</em>, 23(1): 374<br />
                    <strong>PMID: 31775846</strong><br />
                    <strong>Comprehensive SOFA review.</strong> Historical development from 1996
                    inception to Sepsis-3 integration. Discusses
                    <strong>challenges:</strong> sedation confounding CNS score, chronic organ
                    dysfunction baseline adjustments, inter-rater variability. Provides
                    recommendations for standardized SOFA calculation in clinical trials: worst
                    values per 24h window, sedation-free GCS when possible, document baseline SOFA
                    for chronic disease. Reviews validation data showing
                    <strong>consistent AUROC 0.74-0.86</strong> across diverse ICU populations.
                  </p>
                </div>

                <q-separator class="q-my-md" />

                <p class="text-weight-bold text-h6 q-mb-sm">Additional Key References</p>

                <ul class="q-ml-md">
                  <li>
                    <strong>Jones AE, Trzeciak S, Kline JA.</strong> (2009) "The Sequential Organ
                    Failure Assessment score for predicting outcome in patients with severe sepsis
                    and evidence of hypoperfusion at the time of emergency department presentation".
                    <em>Critical Care Medicine</em>, 37(5): 1649-1654.
                    <strong>PMID: 19325482</strong>. ED validation showing SOFA predicted mortality
                    better than APACHE II in sepsis patients.
                  </li>
                  <li>
                    <strong>Moreno R, Vincent JL, Matos R, et al.</strong> (1999) "The use of
                    maximum SOFA score to quantify organ dysfunction/failure in intensive care.
                    Results of a prospective, multicentre study". <em>Intensive Care Medicine</em>,
                    25(7): 686-696. <strong>PMID: 10470572</strong>. Maximum SOFA during ICU stay
                    predicts mortality (AUROC 0.86).
                  </li>
                  <li>
                    <strong>Rhodes A, Evans LE, Alhazzani W, et al.</strong> (2017) "Surviving
                    Sepsis Campaign: International Guidelines for Management of Sepsis and Septic
                    Shock: 2016". <em>Intensive Care Medicine</em>, 43(3): 304-377.
                    <strong>PMID: 28101605</strong>. Surviving Sepsis Campaign guidelines
                    recommending SOFA for sepsis diagnosis and monitoring.
                  </li>
                </ul>

                <q-separator class="q-my-md" />

                <q-banner class="bg-blue-1 text-blue-9" dense rounded>
                  <template v-slot:avatar>
                    <q-icon name="school" color="blue" />
                  </template>
                  <strong>Educational Note:</strong> These references represent peer-reviewed,
                  high-impact publications validating SOFA score. PMID citations allow direct PubMed
                  lookup. The SOFA score has been validated across >300,000 ICU patients in multiple
                  international cohorts, consistently demonstrating AUROC 0.74-0.86 for mortality
                  prediction. It remains the <strong>gold standard</strong> for quantifying organ
                  dysfunction in critically ill patients.
                </q-banner>
              </div>
            </q-card>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div class="q-mt-lg">
    <q-banner class="bg-orange-1" rounded>
      <template v-slot:avatar>
        <q-icon name="warning" color="warning" />
      </template>
      <div class="text-caption">
        <strong>CLINICAL DISCLAIMER:</strong> SOFA Score is a prognostic tool, does not replace
        clinical assessment. Interpret in complete clinical context of the patient.
      </div>
    </q-banner>
  </div>
</template>
