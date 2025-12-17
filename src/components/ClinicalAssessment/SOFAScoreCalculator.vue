<!-- SOFAScoreCalculatorPage.vue -->
<script setup lang="ts">
/**
 * @file SOFAScoreCalculatorPage.vue
 * @description SOFA (Sequential Organ Failure Assessment) Score Calculator
 * @author Vasile Chifeac
 * @created 2025-11-13
 */

import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

// ============================================================
// I18N
// ============================================================
const { t } = useI18n({ useScope: 'global' });

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
  if (score < 2) return t('sofa.results.mortalityRisk.veryLow');
  if (score < 6) return t('sofa.results.mortalityRisk.low');
  if (score < 10) return t('sofa.results.mortalityRisk.moderate');
  if (score < 15) return t('sofa.results.mortalityRisk.high');
  return t('sofa.results.mortalityRisk.veryHigh');
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
      <q-breadcrumbs-el
        :label="t('sofa.breadcrumbs.home')"
        icon="home"
        @click="$router.push('/')"
        class="cursor-pointer"
      />
      <q-breadcrumbs-el :label="t('sofa.breadcrumbs.sofaScore')" />
    </q-breadcrumbs>
    <h4 class="text-h4 text-primary q-mt-md q-mb-none">🏥 {{ t('sofa.title') }}</h4>
    <p class="text-subtitle1 text-grey-7">
      {{ t('sofa.subtitle') }}
    </p>
  </div>

  <q-banner class="bg-blue-1 q-mb-md" rounded>
    <template v-slot:avatar>
      <q-icon name="local_hospital" color="primary" />
    </template>
    <div class="text-body2">
      <strong>{{ t('sofa.banner.title') }}</strong> {{ t('sofa.banner.description') }}
    </div>
  </q-banner>

  <div class="row q-gutter-md">
    <div class="col-12 col-md-5">
      <q-card flat bordered>
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">📝 {{ t('sofa.form.title') }}</h6>

          <!-- Respiration -->
          <div class="q-mb-md">
            <div class="text-subtitle2 text-weight-bold q-mb-xs">
              <q-icon name="air" color="cyan" size="xs" class="q-mr-xs" />
              {{ t('sofa.form.respiration.label') }}
            </div>
            <q-option-group
              v-model="scores.respiration"
              :options="[
                { label: t('sofa.form.respiration.options.ge400'), value: 0 },
                { label: t('sofa.form.respiration.options.lt400'), value: 1 },
                { label: t('sofa.form.respiration.options.lt300'), value: 2 },
                { label: t('sofa.form.respiration.options.lt200'), value: 3 },
                { label: t('sofa.form.respiration.options.lt100'), value: 4 },
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
              {{ t('sofa.form.coagulation.label') }}
            </div>
            <q-option-group
              v-model="scores.coagulation"
              :options="[
                { label: t('sofa.form.coagulation.options.ge150'), value: 0 },
                { label: t('sofa.form.coagulation.options.lt150'), value: 1 },
                { label: t('sofa.form.coagulation.options.lt100'), value: 2 },
                { label: t('sofa.form.coagulation.options.lt50'), value: 3 },
                { label: t('sofa.form.coagulation.options.lt20'), value: 4 },
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
              {{ t('sofa.form.liver.label') }}
            </div>
            <q-option-group
              v-model="scores.liver"
              :options="[
                { label: t('sofa.form.liver.options.lt1_2'), value: 0 },
                { label: t('sofa.form.liver.options.range1_2_1_9'), value: 1 },
                { label: t('sofa.form.liver.options.range2_0_5_9'), value: 2 },
                { label: t('sofa.form.liver.options.range6_0_11_9'), value: 3 },
                { label: t('sofa.form.liver.options.ge12'), value: 4 },
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
              {{ t('sofa.form.cardiovascular.label') }}
            </div>
            <q-option-group
              v-model="scores.cardiovascular"
              :options="[
                { label: t('sofa.form.cardiovascular.options.mapGe70'), value: 0 },
                { label: t('sofa.form.cardiovascular.options.mapLt70'), value: 1 },
                { label: t('sofa.form.cardiovascular.options.dopa5Dobut'), value: 2 },
                { label: t('sofa.form.cardiovascular.options.dopa5EpiNorepi01'), value: 3 },
                { label: t('sofa.form.cardiovascular.options.dopa15EpiNorepi01'), value: 4 },
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
              {{ t('sofa.form.cns.label') }}
            </div>
            <q-option-group
              v-model="scores.cns"
              :options="[
                { label: t('sofa.form.cns.options.gcs15'), value: 0 },
                { label: t('sofa.form.cns.options.gcs13_14'), value: 1 },
                { label: t('sofa.form.cns.options.gcs10_12'), value: 2 },
                { label: t('sofa.form.cns.options.gcs6_9'), value: 3 },
                { label: t('sofa.form.cns.options.gcsLt6'), value: 4 },
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
              {{ t('sofa.form.renal.label') }}
            </div>
            <q-option-group
              v-model="scores.renal"
              :options="[
                { label: t('sofa.form.renal.options.lt1_2'), value: 0 },
                { label: t('sofa.form.renal.options.range1_2_1_9'), value: 1 },
                { label: t('sofa.form.renal.options.range2_0_3_4'), value: 2 },
                { label: t('sofa.form.renal.options.range3_5_4_9'), value: 3 },
                { label: t('sofa.form.renal.options.ge5'), value: 4 },
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
            {{ t('sofa.form.resetButton') }}
          </q-btn>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-md-6">
      <q-card flat bordered>
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">📈 {{ t('sofa.results.title') }}</h6>

          <div class="text-center q-mb-lg">
            <div class="text-h2" :class="'text-' + getScoreColor(totalScore)">
              {{ totalScore }}
            </div>
            <div class="text-subtitle1 text-grey-7">
              <strong>{{ t('sofa.results.totalScoreLabel') }}</strong>
              {{ t('sofa.results.totalScoreRange') }}
            </div>
            <q-chip :color="getScoreColor(totalScore)" text-color="white" class="text-h6 q-mt-sm">
              {{ getMortalityRisk(totalScore) }}
            </q-chip>
          </div>

          <q-card flat bordered class="q-mb-md" :class="'bg-' + getScoreColor(totalScore) + '-1'">
            <q-card-section>
              <div class="text-subtitle2 text-weight-bold q-mb-sm">
                <q-icon name="medical_services" size="sm" class="q-mr-xs" />
                {{ t('sofa.results.interpretation.title') }}
              </div>
              <p class="text-body2 q-ma-none">
                {{ t('sofa.results.interpretation.sofaPrefix') }} {{ totalScore }}:
                {{ getMortalityRisk(totalScore) }}
                {{ t('sofa.results.interpretation.mortalityRiskText') }}
                {{ t('sofa.results.interpretation.serialMonitoring') }}
              </p>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <!-- ======================================================== -->
  <!-- SOFA SCORE COMPLETE SCIENTIFIC DOCUMENTATION            -->
  <!-- ======================================================== -->

  <!-- 1️⃣ DEFINITION AND CLINICAL SIGNIFICANCE -->
  <q-expansion-item
    icon="info"
    color="medical-mint"
    :label="t('sofa.sections.definition.title')"
    class="q-mt-md"
    header-class="bg-blue-1 text-blue-9"
  >
    <q-card flat class="q-pa-md bg-blue-1">
      <div class="text-body2">
        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.definition.historicalOriginTitle') }}
        </p>
        <p v-html="t('sofa.sections.definition.historicalOriginParagraph1')"></p>
        <p class="q-mt-md" v-html="t('sofa.sections.definition.historicalOriginParagraph2')"></p>
        <p class="q-mt-md" v-html="t('sofa.sections.definition.keyCharacteristicsTitle')"></p>
        <ul class="q-ml-md">
          <li v-html="t('sofa.sections.definition.keyCharacteristic1')"></li>
          <li v-html="t('sofa.sections.definition.keyCharacteristic2')"></li>
          <li v-html="t('sofa.sections.definition.keyCharacteristic3')"></li>
          <li v-html="t('sofa.sections.definition.keyCharacteristic4')"></li>
          <li v-html="t('sofa.sections.definition.keyCharacteristic5')"></li>
        </ul>
      </div>

      <q-separator class="q-my-md" />

      <div class="text-body2">
        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.definition.clinicalApplicationsTitle') }}
        </p>
        <p v-html="t('sofa.sections.definition.whenToUseTitle')"></p>
        <ul class="q-ml-md">
          <li v-html="t('sofa.sections.definition.whenToUseItem1')"></li>
          <li v-html="t('sofa.sections.definition.whenToUseItem2')"></li>
          <li v-html="t('sofa.sections.definition.whenToUseItem3')"></li>
          <li v-html="t('sofa.sections.definition.whenToUseItem4')"></li>
          <li v-html="t('sofa.sections.definition.whenToUseItem5')"></li>
        </ul>

        <p class="q-mt-md" v-html="t('sofa.sections.definition.whenNotToUseTitle')"></p>
        <ul class="q-ml-md">
          <li v-html="t('sofa.sections.definition.whenNotToUseItem1')"></li>
          <li v-html="t('sofa.sections.definition.whenNotToUseItem2')"></li>
          <li v-html="t('sofa.sections.definition.whenNotToUseItem3')"></li>
          <li v-html="t('sofa.sections.definition.whenNotToUseItem4')"></li>
        </ul>

        <p class="q-mt-md" v-html="t('sofa.sections.definition.limitationsTitle')"></p>
        <ul class="q-ml-md">
          <li v-html="t('sofa.sections.definition.limitationItem1')"></li>
          <li v-html="t('sofa.sections.definition.limitationItem2')"></li>
          <li v-html="t('sofa.sections.definition.limitationItem3')"></li>
          <li v-html="t('sofa.sections.definition.limitationItem4')"></li>
          <li v-html="t('sofa.sections.definition.limitationItem5')"></li>
        </ul>
      </div>
    </q-card>
  </q-expansion-item>

  <!-- 2️⃣ ORGAN DYSFUNCTION PHYSIOLOGY -->
  <q-expansion-item
    icon="science"
    color="medical-mint"
    :label="t('sofa.sections.organDysfunction.title')"
    class="q-mt-sm"
    header-class="bg-purple-1 text-purple-9"
  >
    <q-card flat class="q-pa-md bg-purple-1">
      <div class="text-body2">
        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.organDysfunction.pathophysiologicalMechanismsTitle') }}
        </p>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.organDysfunction.respirationTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.organDysfunction.respirationItem1')"></li>
            <li v-html="t('sofa.sections.organDysfunction.respirationItem2')"></li>
            <li v-html="t('sofa.sections.organDysfunction.respirationItem3')"></li>
            <li v-html="t('sofa.sections.organDysfunction.respirationItem4')"></li>
            <li v-html="t('sofa.sections.organDysfunction.respirationItem5')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.organDysfunction.coagulationTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.organDysfunction.coagulationItem1')"></li>
            <li v-html="t('sofa.sections.organDysfunction.coagulationItem2')"></li>
            <li v-html="t('sofa.sections.organDysfunction.coagulationItem3')"></li>
            <li v-html="t('sofa.sections.organDysfunction.coagulationItem4')"></li>
            <li v-html="t('sofa.sections.organDysfunction.coagulationItem5')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold" v-html="t('sofa.sections.organDysfunction.liverTitle')"></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.organDysfunction.liverItem1')"></li>
            <li v-html="t('sofa.sections.organDysfunction.liverItem2')"></li>
            <li v-html="t('sofa.sections.organDysfunction.liverItem3')"></li>
            <li v-html="t('sofa.sections.organDysfunction.liverItem4')"></li>
            <li v-html="t('sofa.sections.organDysfunction.liverItem5')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.organDysfunction.cardiovascularTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.organDysfunction.cardiovascularItem1')"></li>
            <li v-html="t('sofa.sections.organDysfunction.cardiovascularItem2')"></li>
            <li v-html="t('sofa.sections.organDysfunction.cardiovascularItem3')"></li>
            <li v-html="t('sofa.sections.organDysfunction.cardiovascularItem4')"></li>
            <li v-html="t('sofa.sections.organDysfunction.cardiovascularItem5')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold" v-html="t('sofa.sections.organDysfunction.cnsTitle')"></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.organDysfunction.cnsItem1')"></li>
            <li v-html="t('sofa.sections.organDysfunction.cnsItem2')"></li>
            <li v-html="t('sofa.sections.organDysfunction.cnsItem3')"></li>
            <li v-html="t('sofa.sections.organDysfunction.cnsItem4')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold" v-html="t('sofa.sections.organDysfunction.renalTitle')"></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.organDysfunction.renalItem1')"></li>
            <li v-html="t('sofa.sections.organDysfunction.renalItem2')"></li>
            <li v-html="t('sofa.sections.organDysfunction.renalItem3')"></li>
            <li v-html="t('sofa.sections.organDysfunction.renalItem4')"></li>
            <li v-html="t('sofa.sections.organDysfunction.renalItem5')"></li>
          </ul>
        </div>
      </div>
    </q-card>
  </q-expansion-item>

  <!-- 3️⃣ HOW TO CALCULATE SOFA SCORE -->
  <q-expansion-item
    icon="calculate"
    color="medical-mint"
    :label="t('sofa.sections.howToCalculate.title')"
    class="q-mt-sm"
    header-class="bg-green-1 text-green-9"
  >
    <q-card flat class="q-pa-md bg-green-1">
      <div class="text-body2">
        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.howToCalculate.calculationStepsTitle') }}
        </p>

        <p v-html="t('sofa.sections.howToCalculate.step1Title')"></p>
        <ul class="q-ml-md q-mb-md">
          <li v-html="t('sofa.sections.howToCalculate.step1Item1')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step1Item2')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step1Item3')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step1Item4')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step1Item5')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step1Item6')"></li>
        </ul>

        <p v-html="t('sofa.sections.howToCalculate.step2Title')"></p>
        <ul class="q-ml-md q-mb-md">
          <li v-html="t('sofa.sections.howToCalculate.step2Item1')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step2Item2')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step2Item3')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step2Item4')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step2Item5')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step2Item6')"></li>
        </ul>

        <p v-html="t('sofa.sections.howToCalculate.step3Title')"></p>
        <ul class="q-ml-md q-mb-md">
          <li v-html="t('sofa.sections.howToCalculate.step3Item1')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step3Item2')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step3Item3')"></li>
        </ul>

        <p v-html="t('sofa.sections.howToCalculate.step4Title')"></p>
        <ul class="q-ml-md q-mb-md">
          <li v-html="t('sofa.sections.howToCalculate.step4Item1')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step4Item2')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step4Item3')"></li>
          <li v-html="t('sofa.sections.howToCalculate.step4Item4')"></li>
        </ul>

        <q-separator class="q-my-md" />

        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.howToCalculate.specialConsiderationsTitle') }}
        </p>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.howToCalculate.respirationConsiderationsTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.howToCalculate.respirationConsiderationsItem1')"></li>
            <li v-html="t('sofa.sections.howToCalculate.respirationConsiderationsItem2')"></li>
            <li v-html="t('sofa.sections.howToCalculate.respirationConsiderationsItem3')"></li>
            <li v-html="t('sofa.sections.howToCalculate.respirationConsiderationsItem4')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.howToCalculate.cardiovascularConsiderationsTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.howToCalculate.cardiovascularConsiderationsItem1')"></li>
            <li v-html="t('sofa.sections.howToCalculate.cardiovascularConsiderationsItem2')"></li>
            <li v-html="t('sofa.sections.howToCalculate.cardiovascularConsiderationsItem3')"></li>
            <li v-html="t('sofa.sections.howToCalculate.cardiovascularConsiderationsItem4')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.howToCalculate.cnsConsiderationsTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.howToCalculate.cnsConsiderationsItem1')"></li>
            <li v-html="t('sofa.sections.howToCalculate.cnsConsiderationsItem2')"></li>
            <li v-html="t('sofa.sections.howToCalculate.cnsConsiderationsItem3')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.howToCalculate.renalConsiderationsTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.howToCalculate.renalConsiderationsItem1')"></li>
            <li v-html="t('sofa.sections.howToCalculate.renalConsiderationsItem2')"></li>
            <li v-html="t('sofa.sections.howToCalculate.renalConsiderationsItem3')"></li>
          </ul>
        </div>
      </div>
    </q-card>
  </q-expansion-item>

  <!-- 4️⃣ FORMULA AND SCORING TABLES -->
  <q-expansion-item
    icon="functions"
    color="medical-mint"
    :label="t('sofa.sections.formulaScoring.title')"
    class="q-mt-sm"
    header-class="bg-cyan-1 text-cyan-9"
  >
    <q-card flat class="q-pa-md bg-cyan-1">
      <div class="text-body2">
        <p class="text-weight-bold text-h6 q-mb-sm text-center">
          {{ t('sofa.sections.formulaScoring.formulaTitle') }}
        </p>
        <p class="text-center text-h5 q-mb-md">
          <strong>{{ t('sofa.sections.formulaScoring.formula') }}</strong>
        </p>
        <p class="text-center text-grey-7 q-mb-lg">
          {{ t('sofa.sections.formulaScoring.formulaSubtitle') }}
        </p>

        <q-separator class="q-my-md" />

        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.formulaScoring.detailedTablesTitle') }}
        </p>

        <!-- Respiration Table -->
        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.formulaScoring.respirationTableTitle')"
          ></p>
          <q-markup-table dense flat bordered>
            <thead>
              <tr>
                <th>{{ t('sofa.sections.formulaScoring.tableHeaderScore') }}</th>
                <th>{{ t('sofa.sections.formulaScoring.respirationTableHeader') }}</th>
                <th>{{ t('sofa.sections.formulaScoring.tableHeaderInterpretation') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>0</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.respiration0')"></td>
                <td>{{ t('sofa.sections.formulaScoring.respiration0Interp') }}</td>
              </tr>
              <tr>
                <td><strong>1</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.respiration1')"></td>
                <td>{{ t('sofa.sections.formulaScoring.respiration1Interp') }}</td>
              </tr>
              <tr>
                <td><strong>2</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.respiration2')"></td>
                <td>{{ t('sofa.sections.formulaScoring.respiration2Interp') }}</td>
              </tr>
              <tr>
                <td><strong>3</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.respiration3')"></td>
                <td>{{ t('sofa.sections.formulaScoring.respiration3Interp') }}</td>
              </tr>
              <tr>
                <td><strong>4</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.respiration4')"></td>
                <td>{{ t('sofa.sections.formulaScoring.respiration4Interp') }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <!-- Coagulation Table -->
        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.formulaScoring.coagulationTableTitle')"
          ></p>
          <q-markup-table dense flat bordered>
            <thead>
              <tr>
                <th>{{ t('sofa.sections.formulaScoring.tableHeaderScore') }}</th>
                <th>{{ t('sofa.sections.formulaScoring.coagulationTableHeader') }}</th>
                <th>{{ t('sofa.sections.formulaScoring.tableHeaderInterpretation') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>0</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.coagulation0')"></td>
                <td>{{ t('sofa.sections.formulaScoring.coagulation0Interp') }}</td>
              </tr>
              <tr>
                <td><strong>1</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.coagulation1')"></td>
                <td>{{ t('sofa.sections.formulaScoring.coagulation1Interp') }}</td>
              </tr>
              <tr>
                <td><strong>2</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.coagulation2')"></td>
                <td>{{ t('sofa.sections.formulaScoring.coagulation2Interp') }}</td>
              </tr>
              <tr>
                <td><strong>3</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.coagulation3')"></td>
                <td>{{ t('sofa.sections.formulaScoring.coagulation3Interp') }}</td>
              </tr>
              <tr>
                <td><strong>4</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.coagulation4')"></td>
                <td>{{ t('sofa.sections.formulaScoring.coagulation4Interp') }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <!-- Liver Table -->
        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.formulaScoring.liverTableTitle')"
          ></p>
          <q-markup-table dense flat bordered>
            <thead>
              <tr>
                <th>{{ t('sofa.sections.formulaScoring.tableHeaderScore') }}</th>
                <th>{{ t('sofa.sections.formulaScoring.liverTableHeader') }}</th>
                <th>{{ t('sofa.sections.formulaScoring.tableHeaderInterpretation') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>0</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.liver0')"></td>
                <td>{{ t('sofa.sections.formulaScoring.liver0Interp') }}</td>
              </tr>
              <tr>
                <td><strong>1</strong></td>
                <td>{{ t('sofa.sections.formulaScoring.liver1') }}</td>
                <td>{{ t('sofa.sections.formulaScoring.liver1Interp') }}</td>
              </tr>
              <tr>
                <td><strong>2</strong></td>
                <td>{{ t('sofa.sections.formulaScoring.liver2') }}</td>
                <td>{{ t('sofa.sections.formulaScoring.liver2Interp') }}</td>
              </tr>
              <tr>
                <td><strong>3</strong></td>
                <td>{{ t('sofa.sections.formulaScoring.liver3') }}</td>
                <td>{{ t('sofa.sections.formulaScoring.liver3Interp') }}</td>
              </tr>
              <tr>
                <td><strong>4</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.liver4')"></td>
                <td>{{ t('sofa.sections.formulaScoring.liver4Interp') }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <!-- Cardiovascular Table -->
        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.formulaScoring.cardiovascularTableTitle')"
          ></p>
          <q-markup-table dense flat bordered>
            <thead>
              <tr>
                <th>{{ t('sofa.sections.formulaScoring.tableHeaderScore') }}</th>
                <th>{{ t('sofa.sections.formulaScoring.cardiovascularTableHeader') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>0</strong></td>
                <td>{{ t('sofa.sections.formulaScoring.cardiovascular0') }}</td>
              </tr>
              <tr>
                <td><strong>1</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.cardiovascular1')"></td>
              </tr>
              <tr>
                <td><strong>2</strong></td>
                <td>{{ t('sofa.sections.formulaScoring.cardiovascular2') }}</td>
              </tr>
              <tr>
                <td><strong>3</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.cardiovascular3')"></td>
              </tr>
              <tr>
                <td><strong>4</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.cardiovascular4')"></td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <!-- CNS Table -->
        <div class="q-mb-md">
          <p class="text-weight-bold" v-html="t('sofa.sections.formulaScoring.cnsTableTitle')"></p>
          <q-markup-table dense flat bordered>
            <thead>
              <tr>
                <th>{{ t('sofa.sections.formulaScoring.tableHeaderScore') }}</th>
                <th>{{ t('sofa.sections.formulaScoring.cnsTableHeader') }}</th>
                <th>{{ t('sofa.sections.formulaScoring.tableHeaderInterpretation') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>0</strong></td>
                <td>{{ t('sofa.sections.formulaScoring.cns0') }}</td>
                <td>{{ t('sofa.sections.formulaScoring.cns0Interp') }}</td>
              </tr>
              <tr>
                <td><strong>1</strong></td>
                <td>{{ t('sofa.sections.formulaScoring.cns1') }}</td>
                <td>{{ t('sofa.sections.formulaScoring.cns1Interp') }}</td>
              </tr>
              <tr>
                <td><strong>2</strong></td>
                <td>{{ t('sofa.sections.formulaScoring.cns2') }}</td>
                <td>{{ t('sofa.sections.formulaScoring.cns2Interp') }}</td>
              </tr>
              <tr>
                <td><strong>3</strong></td>
                <td>{{ t('sofa.sections.formulaScoring.cns3') }}</td>
                <td>{{ t('sofa.sections.formulaScoring.cns3Interp') }}</td>
              </tr>
              <tr>
                <td><strong>4</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.cns4')"></td>
                <td>{{ t('sofa.sections.formulaScoring.cns4Interp') }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <!-- Renal Table -->
        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.formulaScoring.renalTableTitle')"
          ></p>
          <q-markup-table dense flat bordered>
            <thead>
              <tr>
                <th>{{ t('sofa.sections.formulaScoring.tableHeaderScore') }}</th>
                <th>{{ t('sofa.sections.formulaScoring.renalTableHeader') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>0</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.renal0')"></td>
              </tr>
              <tr>
                <td><strong>1</strong></td>
                <td>{{ t('sofa.sections.formulaScoring.renal1') }}</td>
              </tr>
              <tr>
                <td><strong>2</strong></td>
                <td>{{ t('sofa.sections.formulaScoring.renal2') }}</td>
              </tr>
              <tr>
                <td><strong>3</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.renal3')"></td>
              </tr>
              <tr>
                <td><strong>4</strong></td>
                <td v-html="t('sofa.sections.formulaScoring.renal4')"></td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <q-separator class="q-my-md" />

        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.formulaScoring.deltaSofaTitle') }}
        </p>
        <p class="text-center q-mb-sm">
          <strong>{{ t('sofa.sections.formulaScoring.deltaSofaFormula') }}</strong>
        </p>
        <ul class="q-ml-md">
          <li v-html="t('sofa.sections.formulaScoring.deltaSofaItem1')"></li>
          <li v-html="t('sofa.sections.formulaScoring.deltaSofaItem2')"></li>
          <li v-html="t('sofa.sections.formulaScoring.deltaSofaItem3')"></li>
          <li v-html="t('sofa.sections.formulaScoring.deltaSofaItem4')"></li>
        </ul>
      </div>
    </q-card>
  </q-expansion-item>

  <!-- 5️⃣ CLINICAL INTERPRETATION -->
  <q-expansion-item
    icon="psychology"
    color="medical-mint"
    :label="t('sofa.sections.clinicalInterpretation.title')"
    class="q-mt-sm"
    header-class="bg-orange-1 text-orange-9"
  >
    <q-card flat class="q-pa-md bg-orange-1">
      <div class="text-body2">
        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.clinicalInterpretation.mortalityRiskTitle') }}
        </p>

        <div class="q-mb-md">
          <q-chip color="green" text-color="white" dense class="q-mb-xs">
            <q-icon name="check_circle" class="q-mr-xs" />
            {{ t('sofa.sections.clinicalInterpretation.riskLevel1Chip') }}
          </q-chip>
          <p>
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel1Mortality')"></span
            ><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel1Status')"></span><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel1Course')"></span><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel1Management')"></span>
          </p>
        </div>

        <div class="q-mb-md">
          <q-chip color="orange" text-color="white" dense class="q-mb-xs">
            <q-icon name="warning" class="q-mr-xs" />
            {{ t('sofa.sections.clinicalInterpretation.riskLevel2Chip') }}
          </q-chip>
          <p>
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel2Mortality')"></span
            ><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel2Status')"></span><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel2Course')"></span><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel2Management')"></span>
          </p>
        </div>

        <div class="q-mb-md">
          <q-chip color="red" text-color="white" dense class="q-mb-xs">
            <q-icon name="dangerous" class="q-mr-xs" />
            {{ t('sofa.sections.clinicalInterpretation.riskLevel3Chip') }}
          </q-chip>
          <p>
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel3Mortality')"></span
            ><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel3Status')"></span><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel3Course')"></span><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel3Management')"></span>
          </p>
        </div>

        <div class="q-mb-md">
          <q-chip color="red-10" text-color="white" dense class="q-mb-xs">
            <q-icon name="local_hospital" class="q-mr-xs" />
            {{ t('sofa.sections.clinicalInterpretation.riskLevel4Chip') }}
          </q-chip>
          <p>
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel4Mortality')"></span
            ><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel4Status')"></span><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel4Course')"></span><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel4Management')"></span>
          </p>
        </div>

        <div class="q-mb-lg">
          <q-chip color="red-10" text-color="white" dense class="q-mb-xs">
            <q-icon name="report" class="q-mr-xs" />
            {{ t('sofa.sections.clinicalInterpretation.riskLevel5Chip') }}
          </q-chip>
          <p>
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel5Mortality')"></span
            ><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel5Status')"></span><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel5Course')"></span><br />
            <span v-html="t('sofa.sections.clinicalInterpretation.riskLevel5Management')"></span>
          </p>
        </div>

        <q-separator class="q-my-md" />

        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.clinicalInterpretation.deltaSofaInterpretationTitle') }}
        </p>

        <ul class="q-ml-md">
          <li v-html="t('sofa.sections.clinicalInterpretation.deltaSofaItem1')"></li>
          <li v-html="t('sofa.sections.clinicalInterpretation.deltaSofaItem2')"></li>
          <li v-html="t('sofa.sections.clinicalInterpretation.deltaSofaItem3')"></li>
          <li v-html="t('sofa.sections.clinicalInterpretation.deltaSofaItem4')"></li>
          <li v-html="t('sofa.sections.clinicalInterpretation.deltaSofaItem5')"></li>
        </ul>

        <q-separator class="q-my-md" />

        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.clinicalInterpretation.sepsis3Title') }}
        </p>
        <p v-html="t('sofa.sections.clinicalInterpretation.sepsis3Definition')"></p>
        <ul class="q-ml-md">
          <li v-html="t('sofa.sections.clinicalInterpretation.sepsis3Criteria')"></li>
          <li v-html="t('sofa.sections.clinicalInterpretation.sepsis3Baseline')"></li>
          <li v-html="t('sofa.sections.clinicalInterpretation.sepsis3Shock')"></li>
          <li v-html="t('sofa.sections.clinicalInterpretation.sepsis3Mortality')"></li>
        </ul>

        <q-banner class="bg-orange-2 text-orange-9 q-mt-md" dense rounded>
          <template v-slot:avatar>
            <q-icon name="info" color="orange" />
          </template>
          <strong>{{ t('sofa.sections.clinicalInterpretation.clinicalPearlTitle') }}</strong>
          {{ t('sofa.sections.clinicalInterpretation.clinicalPearlText') }}
        </q-banner>
      </div>
    </q-card>
  </q-expansion-item>

  <!-- 6️⃣ CLINICAL APPLICATIONS -->
  <q-expansion-item
    icon="medical_services"
    color="medical-mint"
    :label="t('sofa.sections.clinicalApplications.title')"
    class="q-mt-sm"
    header-class="bg-teal-1 text-teal-9"
  >
    <q-card flat class="q-pa-md bg-teal-1">
      <div class="text-body2">
        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.clinicalApplications.primaryUsesTitle') }}
        </p>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.clinicalApplications.use1Title')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.clinicalApplications.use1Item1')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use1Item2')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use1Item3')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use1Item4')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use1Item5')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.clinicalApplications.use2Title')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.clinicalApplications.use2Item1')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use2Item2')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use2Item3')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use2Item4')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.clinicalApplications.use3Title')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.clinicalApplications.use3Item1')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use3Item2')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use3Item3')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use3Item4')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.clinicalApplications.use4Title')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.clinicalApplications.use4Item1')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use4Item2')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use4Item3')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use4Item4')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.clinicalApplications.use5Title')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.clinicalApplications.use5Item1')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use5Item2')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use5Item3')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use5Item4')"></li>
          </ul>
        </div>

        <div class="q-mb-lg">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.clinicalApplications.use6Title')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.clinicalApplications.use6Item1')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use6Item2')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use6Item3')"></li>
            <li v-html="t('sofa.sections.clinicalApplications.use6Item4')"></li>
          </ul>
        </div>

        <q-separator class="q-my-md" />

        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.clinicalApplications.qsofaTitle') }}
        </p>
        <p v-html="t('sofa.sections.clinicalApplications.qsofaPurpose')"></p>
        <ul class="q-ml-md">
          <li v-html="t('sofa.sections.clinicalApplications.qsofaItem1')"></li>
          <li v-html="t('sofa.sections.clinicalApplications.qsofaItem2')"></li>
          <li v-html="t('sofa.sections.clinicalApplications.qsofaItem3')"></li>
          <li v-html="t('sofa.sections.clinicalApplications.qsofaItem4')"></li>
        </ul>
      </div>
    </q-card>
  </q-expansion-item>

  <!-- 7️⃣ REFERENCE VALUES AND ALERTS -->
  <q-expansion-item
    icon="warning"
    color="medical-mint"
    :label="t('sofa.sections.referenceValues.title')"
    class="q-mt-sm"
    header-class="bg-red-1 text-red-9"
  >
    <q-card flat class="q-pa-md bg-red-1">
      <div class="text-body2">
        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.referenceValues.organThresholdsTitle') }}
        </p>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.referenceValues.respirationTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.referenceValues.respirationItem1')"></li>
            <li v-html="t('sofa.sections.referenceValues.respirationItem2')"></li>
            <li v-html="t('sofa.sections.referenceValues.respirationItem3')"></li>
            <li v-html="t('sofa.sections.referenceValues.respirationItem4')"></li>
            <li v-html="t('sofa.sections.referenceValues.respirationItem5')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.referenceValues.coagulationTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.referenceValues.coagulationItem1')"></li>
            <li v-html="t('sofa.sections.referenceValues.coagulationItem2')"></li>
            <li v-html="t('sofa.sections.referenceValues.coagulationItem3')"></li>
            <li v-html="t('sofa.sections.referenceValues.coagulationItem4')"></li>
            <li v-html="t('sofa.sections.referenceValues.coagulationItem5')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold" v-html="t('sofa.sections.referenceValues.liverTitle')"></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.referenceValues.liverItem1')"></li>
            <li v-html="t('sofa.sections.referenceValues.liverItem2')"></li>
            <li v-html="t('sofa.sections.referenceValues.liverItem3')"></li>
            <li v-html="t('sofa.sections.referenceValues.liverItem4')"></li>
            <li v-html="t('sofa.sections.referenceValues.liverItem5')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.referenceValues.cardiovascularTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.referenceValues.cardiovascularItem1')"></li>
            <li v-html="t('sofa.sections.referenceValues.cardiovascularItem2')"></li>
            <li v-html="t('sofa.sections.referenceValues.cardiovascularItem3')"></li>
            <li v-html="t('sofa.sections.referenceValues.cardiovascularItem4')"></li>
            <li v-html="t('sofa.sections.referenceValues.cardiovascularItem5')"></li>
            <li v-html="t('sofa.sections.referenceValues.cardiovascularItem6')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold" v-html="t('sofa.sections.referenceValues.cnsTitle')"></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.referenceValues.cnsItem1')"></li>
            <li v-html="t('sofa.sections.referenceValues.cnsItem2')"></li>
            <li v-html="t('sofa.sections.referenceValues.cnsItem3')"></li>
            <li v-html="t('sofa.sections.referenceValues.cnsItem4')"></li>
            <li v-html="t('sofa.sections.referenceValues.cnsItem5')"></li>
            <li v-html="t('sofa.sections.referenceValues.cnsItem6')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold" v-html="t('sofa.sections.referenceValues.renalTitle')"></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.referenceValues.renalItem1')"></li>
            <li v-html="t('sofa.sections.referenceValues.renalItem2')"></li>
            <li v-html="t('sofa.sections.referenceValues.renalItem3')"></li>
            <li v-html="t('sofa.sections.referenceValues.renalItem4')"></li>
            <li v-html="t('sofa.sections.referenceValues.renalItem5')"></li>
            <li v-html="t('sofa.sections.referenceValues.renalItem6')"></li>
          </ul>
        </div>

        <q-separator class="q-my-md" />

        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.referenceValues.criticalAlertsTitle') }}
        </p>
        <q-list dense class="bg-red-2">
          <q-item>
            <q-item-section avatar>
              <q-icon color="red" name="dangerous" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">
                {{ t('sofa.sections.referenceValues.alert1Title') }}
              </q-item-label>
              <q-item-label caption>
                {{ t('sofa.sections.referenceValues.alert1Description') }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="red" name="trending_up" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">
                {{ t('sofa.sections.referenceValues.alert2Title') }}
              </q-item-label>
              <q-item-label caption>
                {{ t('sofa.sections.referenceValues.alert2Description') }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="orange" name="warning" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">
                {{ t('sofa.sections.referenceValues.alert3Title') }}
              </q-item-label>
              <q-item-label caption>
                {{ t('sofa.sections.referenceValues.alert3Description') }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="orange" name="speed" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">
                {{ t('sofa.sections.referenceValues.alert4Title') }}
              </q-item-label>
              <q-item-label caption>
                {{ t('sofa.sections.referenceValues.alert4Description') }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator class="q-my-md" />

        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.referenceValues.baselineTitle') }}
        </p>
        <ul class="q-ml-md">
          <li v-html="t('sofa.sections.referenceValues.baselineItem1')"></li>
          <li v-html="t('sofa.sections.referenceValues.baselineItem2')"></li>
          <li v-html="t('sofa.sections.referenceValues.baselineItem3')"></li>
          <li v-html="t('sofa.sections.referenceValues.baselineItem4')"></li>
        </ul>
      </div>
    </q-card>
  </q-expansion-item>

  <!-- 8️⃣ MEDICAL DOCUMENTATION AND GUIDELINES -->
  <q-expansion-item
    icon="menu_book"
    color="medical-mint"
    :label="t('sofa.sections.documentation.title')"
    class="q-mt-sm"
    header-class="bg-indigo-1 text-indigo-9"
  >
    <q-card flat class="q-pa-md bg-indigo-1">
      <div class="text-body2">
        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.documentation.guidelinesTitle') }}
        </p>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.documentation.sepsis3GuideTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.documentation.sepsis3Item1')"></li>
            <li v-html="t('sofa.sections.documentation.sepsis3Item2')"></li>
            <li v-html="t('sofa.sections.documentation.sepsis3Item3')"></li>
            <li v-html="t('sofa.sections.documentation.sepsis3Item4')"></li>
            <li v-html="t('sofa.sections.documentation.sepsis3Item5')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold" v-html="t('sofa.sections.documentation.sscGuideTitle')"></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.documentation.sscItem1')"></li>
            <li v-html="t('sofa.sections.documentation.sscItem2')"></li>
            <li v-html="t('sofa.sections.documentation.sscItem3')"></li>
            <li v-html="t('sofa.sections.documentation.sscItem4')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold" v-html="t('sofa.sections.documentation.ardsGuideTitle')"></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.documentation.ardsItem1')"></li>
            <li v-html="t('sofa.sections.documentation.ardsItem2')"></li>
            <li v-html="t('sofa.sections.documentation.ardsItem3')"></li>
            <li v-html="t('sofa.sections.documentation.ardsItem4')"></li>
            <li v-html="t('sofa.sections.documentation.ardsItem5')"></li>
          </ul>
        </div>

        <div class="q-mb-md">
          <p
            class="text-weight-bold"
            v-html="t('sofa.sections.documentation.kdigoAkiGuideTitle')"
          ></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.documentation.kdigoItem1')"></li>
            <li v-html="t('sofa.sections.documentation.kdigoItem2')"></li>
            <li v-html="t('sofa.sections.documentation.kdigoItem3')"></li>
          </ul>
        </div>

        <q-separator class="q-my-md" />

        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.documentation.bestPracticesTitle') }}
        </p>

        <div class="q-mb-md">
          <p class="text-weight-bold" v-html="t('sofa.sections.documentation.templateTitle')"></p>
          <q-card flat bordered class="q-pa-sm bg-white">
            <pre
              class="text-caption q-ma-none"
              v-text="t('sofa.sections.documentation.templateContent')"
            ></pre>
          </q-card>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold" v-html="t('sofa.sections.documentation.trendingTitle')"></p>
          <ul class="q-ml-md">
            <li v-html="t('sofa.sections.documentation.trendingItem1')"></li>
            <li v-html="t('sofa.sections.documentation.trendingItem2')"></li>
            <li v-html="t('sofa.sections.documentation.trendingItem3')"></li>
            <li v-html="t('sofa.sections.documentation.trendingItem4')"></li>
          </ul>
        </div>

        <q-separator class="q-my-md" />

        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.documentation.researchTitle') }}
        </p>

        <ul class="q-ml-md">
          <li v-html="t('sofa.sections.documentation.researchItem1')"></li>
          <li v-html="t('sofa.sections.documentation.researchItem2')"></li>
          <li v-html="t('sofa.sections.documentation.researchItem3')"></li>
          <li v-html="t('sofa.sections.documentation.researchItem4')"></li>
          <li v-html="t('sofa.sections.documentation.researchItem5')"></li>
        </ul>
      </div>
    </q-card>
  </q-expansion-item>

  <!-- 9️⃣ SCIENTIFIC REFERENCES (PMID) -->
  <q-expansion-item
    icon="import_contacts"
    color="medical-mint"
    :label="t('sofa.sections.scientificReferences.title')"
    class="q-mt-sm"
    header-class="bg-purple-1 text-purple-9"
  >
    <q-card flat class="q-pa-md bg-purple-1">
      <div class="text-body2">
        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.scientificReferences.publicationsTitle') }}
        </p>

        <div class="q-mb-md">
          <p class="text-weight-bold">
            {{ t('sofa.sections.scientificReferences.publication1Author') }}
          </p>
          <p class="q-ml-md text-grey-8">
            {{ t('sofa.sections.scientificReferences.publication1Title') }}<br />
            <span v-html="t('sofa.sections.scientificReferences.publication1Journal')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication1Pmid')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication1Description')"></span>
          </p>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold">
            {{ t('sofa.sections.scientificReferences.publication2Author') }}
          </p>
          <p class="q-ml-md text-grey-8">
            {{ t('sofa.sections.scientificReferences.publication2Title') }}<br />
            <span v-html="t('sofa.sections.scientificReferences.publication2Journal')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication2Pmid')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication2Description')"></span>
          </p>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold">
            {{ t('sofa.sections.scientificReferences.publication3Author') }}
          </p>
          <p class="q-ml-md text-grey-8">
            {{ t('sofa.sections.scientificReferences.publication3Title') }}<br />
            <span v-html="t('sofa.sections.scientificReferences.publication3Journal')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication3Pmid')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication3Description')"></span>
          </p>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold">
            {{ t('sofa.sections.scientificReferences.publication4Author') }}
          </p>
          <p class="q-ml-md text-grey-8">
            {{ t('sofa.sections.scientificReferences.publication4Title') }}<br />
            <span v-html="t('sofa.sections.scientificReferences.publication4Journal')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication4Pmid')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication4Description')"></span>
          </p>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold">
            {{ t('sofa.sections.scientificReferences.publication5Author') }}
          </p>
          <p class="q-ml-md text-grey-8">
            {{ t('sofa.sections.scientificReferences.publication5Title') }}<br />
            <span v-html="t('sofa.sections.scientificReferences.publication5Journal')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication5Pmid')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication5Description')"></span>
          </p>
        </div>

        <div class="q-mb-md">
          <p class="text-weight-bold">
            {{ t('sofa.sections.scientificReferences.publication6Author') }}
          </p>
          <p class="q-ml-md text-grey-8">
            {{ t('sofa.sections.scientificReferences.publication6Title') }}<br />
            <span v-html="t('sofa.sections.scientificReferences.publication6Journal')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication6Pmid')"></span><br />
            <span v-html="t('sofa.sections.scientificReferences.publication6Description')"></span>
          </p>
        </div>

        <q-separator class="q-my-md" />

        <p class="text-weight-bold text-h6 q-mb-sm">
          {{ t('sofa.sections.scientificReferences.additionalTitle') }}
        </p>

        <ul class="q-ml-md">
          <li v-html="t('sofa.sections.scientificReferences.additionalItem1')"></li>
          <li v-html="t('sofa.sections.scientificReferences.additionalItem2')"></li>
          <li v-html="t('sofa.sections.scientificReferences.additionalItem3')"></li>
        </ul>

        <q-separator class="q-my-md" />

        <q-banner class="bg-blue-1 text-blue-9" dense rounded>
          <template v-slot:avatar>
            <q-icon name="school" color="blue" />
          </template>
          <span v-html="t('sofa.sections.scientificReferences.educationalNote')"></span>
        </q-banner>
      </div>
    </q-card>
  </q-expansion-item>
  <div class="q-mt-lg">
    <q-banner class="bg-orange-1" rounded>
      <template v-slot:avatar>
        <q-icon name="warning" color="warning" />
      </template>
      <div class="text-caption">
        <strong>{{ t('sofa.disclaimer.title') }}</strong> {{ t('sofa.disclaimer.text') }}
      </div>
    </q-banner>
  </div>
</template>
