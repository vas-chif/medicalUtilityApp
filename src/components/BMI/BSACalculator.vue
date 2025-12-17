<!-- BSACalculator.vue -->
<script setup lang="ts">
/**
 * @file BSACalculator.vue
 * @description Body Surface Area Calculator con 3 formule (Mosteller, DuBois, Haycock)
 * @author Vasile Chifeac
 * @created 2025-11-16
 *
 * @notes
 * - Componente estratto da BMICalculatorPage.vue Tab 2
 * - 3 formule BSA per chemioterapia, cardiologia, pediatria
 * - Mosteller (1987): general purpose adulti
 * - DuBois (1916): ricerca metabolica
 * - Haycock (1978): pediatria preferita
 */

import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
// import { useSecureLogger } from 'src/composables/useSecureLogger';
// import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';

// ============================================================
// COMPOSABLES
// ============================================================
const { t } = useI18n({ useScope: 'global' });
// const { logger } = useSecureLogger();
// const { isDev: isDevelopment } = useSmartEnvironment();

// ============================================================
// TYPES & INTERFACES
// ============================================================

interface BSAFormData {
  weight: number | null;
  height: number | null;
}

interface BSAResult {
  mosteller: number;
  dubois: number;
  haycock: number;
}

const initialBSAForm: BSAFormData = {
  weight: null,
  height: null,
};

const initialBSAResult: BSAResult = {
  mosteller: 0,
  dubois: 0,
  haycock: 0,
};

const bsaForm = ref<BSAFormData>({ ...initialBSAForm });
const bsaResult = ref<BSAResult>({ ...initialBSAResult });

const isBSAFormValid = computed(() => {
  return (
    bsaForm.value.weight !== null &&
    bsaForm.value.weight > 0 &&
    bsaForm.value.height !== null &&
    bsaForm.value.height > 0
  );
});

const calculateBSA = () => {
  if (!isBSAFormValid.value) return;

  const weight = bsaForm.value.weight!;
  const height = bsaForm.value.height!;

  // Mosteller (1987) - Most commonly used
  const mosteller = Math.sqrt((height * weight) / 3600);

  // DuBois & DuBois (1916) - Research standard
  const dubois = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);

  // Haycock et al. (1978) - Pediatric preferred
  const haycock = 0.024265 * Math.pow(height, 0.3964) * Math.pow(weight, 0.5378);

  bsaResult.value = {
    mosteller,
    dubois,
    haycock,
  };
};

const resetBSAForm = () => {
  bsaForm.value = { ...initialBSAForm };
  bsaResult.value = { ...initialBSAResult };
};
</script>

<template>
  <div class="row q-gutter-lg">
    <!-- Pannello Input BSA -->
    <div class="col-12 col-md-5">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">{{ t('bsa.title') }}</h6>
          <p class="text-caption text-grey-7 q-mb-md">
            Calcolo superficie corporea con 3 formule per applicazioni chemioterapiche e
            cardiologiche
          </p>

          <!-- Peso -->
          <q-input
            v-model.number="bsaForm.weight"
            type="number"
            step="0.1"
            :label="t('bsa.form.weightLabel')"
            :suffix="t('bsa.form.weightSuffix')"
            outlined
            class="q-mb-md"
            :rules="[(val) => (val > 0 && val <= 500) || t('bsa.form.weightRule')]"
          >
            <template v-slot:prepend>
              <q-icon :name="t('bsa.form.weightIcon')" color="blue" />
            </template>
          </q-input>

          <!-- Altezza -->
          <q-input
            v-model.number="bsaForm.height"
            type="number"
            :label="t('bsa.form.heightLabel')"
            :suffix="t('bsa.form.heightSuffix')"
            outlined
            class="q-mb-md"
            :rules="[(val) => (val > 0 && val <= 300) || t('bsa.form.heightRule')]"
          >
            <template v-slot:prepend>
              <q-icon :name="t('bsa.form.heightIcon')" color="green" />
            </template>
          </q-input>

          <!-- Bottoni -->
          <q-btn
            @click="calculateBSA"
            color="primary"
            size="lg"
            class="full-width q-mb-sm"
            icon="calculate"
            :disable="!isBSAFormValid"
          >
            {{ t('bsa.buttons.calculate') }}
          </q-btn>
          <q-btn
            @click="resetBSAForm"
            color="negative"
            size="lg"
            class="full-width"
            icon="refresh"
            outline
          >
            {{ t('bsa.buttons.reset') }}
          </q-btn>
        </q-card-section>
      </q-card>
    </div>

    <!-- Pannello Risultati BSA -->
    <div class="col-12 col-md-6">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">{{ t('bsa.results.title') }}</h6>

          <!-- Risultati Calcolo (visibili solo dopo calcolo) -->
          <div v-if="bsaResult.mosteller > 0" class="q-mb-lg">
            <!-- Tabella Comparazione Formule -->
            <q-markup-table class="q-mb-md">
              <thead>
                <tr>
                  <th class="text-left">{{ t('bsa.results.table.formula') }}</th>
                  <th class="text-right">{{ t('bsa.results.table.bsa') }}</th>
                  <th class="text-left">{{ t('bsa.results.table.application') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{{ t('bsa.results.table.mosteller') }}</strong>
                  </td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ bsaResult.mosteller.toFixed(2) }}
                  </td>
                  <td class="text-caption">{{ t('bsa.results.table.adultsGeneral') }}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{{ t('bsa.results.table.dubois') }}</strong>
                  </td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ bsaResult.dubois.toFixed(2) }}
                  </td>
                  <td class="text-caption">{{ t('bsa.results.table.metabolicResearch') }}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{{ t('bsa.results.table.haycock') }}</strong>
                  </td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ bsaResult.haycock.toFixed(2) }}
                  </td>
                  <td class="text-caption">{{ t('bsa.results.table.pediatrics') }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>

          <!-- Messaggio placeholder se nessun calcolo -->
          <div v-else class="text-center text-grey-6 q-pa-md q-mb-lg">
            <q-icon name="info" size="lg" class="q-mb-md" />
            <p class="text-body2">{{ t('bsa.results.placeholder') }}</p>
          </div>

          <!-- ============================================================ -->
          <!-- SEZIONI INFORMATIVE (SEMPRE VISIBILI) -->
          <!-- ============================================================ -->

          <!-- Note Cliniche BSA -->
          <q-banner class="bg-blue-1 q-mb-md" rounded>
            <template v-slot:avatar>
              <q-icon name="info" color="primary" />
            </template>
            <div class="text-caption">
              <strong>{{ t('bsa.clinicalBanner.adultsAverage') }}</strong>
              {{ t('bsa.clinicalBanner.adultsValues') }}<br />
              <strong>{{ t('bsa.clinicalBanner.neonates') }}</strong>
              {{ t('bsa.clinicalBanner.neonatesValue') }}
            </div>
          </q-banner>
        </q-card-section>
      </q-card>
    </div>

    <!-- ============================================================ -->
    <!-- 9 SEZIONI NEWS-STYLE DOCUMENTAZIONE BSA -->
    <!-- ============================================================ -->
    <div class="col-12">
      <!-- 1️⃣ DEFINIZIONE (bg-blue-1) -->
      <q-expansion-item
        icon="info"
        :label="t('bsa.documentationSections.definition.title')"
        class="q-mt-md"
        header-class="bg-blue-1 text-blue-9"
      >
        <q-card class="bg-blue-1">
          <q-card-section>
            <!-- Main Definition -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.definition.content.mainDefinition.title')"
                ></span>
              </h6>
              <p
                class="text-body2 q-mb-none"
                v-html="t('bsa.documentationSections.definition.content.mainDefinition.text')"
              ></p>
            </div>

            <!-- Key Principles -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.definition.content.keyPrinciples.title')"
                ></span>
              </h6>
              <ul class="text-body2 OLD q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`def-principle-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.definition.content.keyPrinciples.items[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Clinical Importance -->
            <div class="q-mb-none">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t('bsa.documentationSections.definition.content.clinicalImportance.title')
                  "
                ></span>
              </h6>
              <p
                class="text-body2 q-mb-sm"
                v-html="
                  t('bsa.documentationSections.definition.content.clinicalImportance.description')
                "
              ></p>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`def-importance-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.definition.content.clinicalImportance.points[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- 2️⃣ FISIOLOGIA (bg-green-1) -->
      <q-expansion-item
        icon="science"
        :label="t('bsa.documentationSections.physiology.title')"
        class="q-mt-md"
        header-class="bg-green-1 text-green-9"
      >
        <q-card class="bg-green-1">
          <q-card-section>
            <!-- Metabolic Relationship -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t('bsa.documentationSections.physiology.content.metabolicRelationship.title')
                  "
                ></span>
              </h6>
              <p
                class="text-body2 q-mb-sm"
                v-html="
                  t(
                    'bsa.documentationSections.physiology.content.metabolicRelationship.description',
                  )
                "
              ></p>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`physio-metabolic-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.physiology.content.metabolicRelationship.components[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Body Composition -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.physiology.content.bodyComposition.title')"
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`physio-composition-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.physiology.content.bodyComposition.points[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Thermoregulation -->
            <div class="q-mb-none">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.physiology.content.thermoregulation.title')"
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 3"
                  :key="`physio-thermo-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.physiology.content.thermoregulation.mechanisms[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- 3️⃣ MISURAZIONE (bg-amber-1) -->
      <q-expansion-item
        icon="straighten"
        :label="t('bsa.documentationSections.measurement.title')"
        class="q-mt-md"
        header-class="bg-amber-1 text-amber-9"
      >
        <q-card class="bg-amber-1">
          <q-card-section>
            <!-- Direct Measurement -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t('bsa.documentationSections.measurement.content.directMeasurement.title')
                  "
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 3"
                  :key="`meas-direct-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.measurement.content.directMeasurement.methods[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Formula Selection -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.measurement.content.formulaSelection.title')"
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 5"
                  :key="`meas-formula-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.measurement.content.formulaSelection.guidelines[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Practical Protocol -->
            <div class="q-mb-none">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t('bsa.documentationSections.measurement.content.practicalProtocol.title')
                  "
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`meas-protocol-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.measurement.content.practicalProtocol.steps[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- 4️⃣ FORMULA (bg-cyan-1) -->
      <q-expansion-item
        icon="functions"
        :label="t('bsa.documentationSections.formula.title')"
        class="q-mt-md"
        header-class="bg-cyan-1 text-cyan-9"
      >
        <q-card class="bg-cyan-1">
          <q-card-section>
            <!-- Formula Derivation -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.formula.content.formulaDerivation.title')"
                ></span>
              </h6>
              <p
                class="text-body2 q-mb-sm"
                v-html="
                  t('bsa.documentationSections.formula.content.formulaDerivation.description')
                "
              ></p>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`formula-derivation-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.formula.content.formulaDerivation.steps[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Practical Examples -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.formula.content.practicalExamples.title')"
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 3"
                  :key="`formula-example-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.formula.content.practicalExamples.examples[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Clinical Variations -->
            <div class="q-mb-none">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.formula.content.clinicalVariations.title')"
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`formula-variation-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.formula.content.clinicalVariations.variations[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- 5️⃣ INTERPRETAZIONE (bg-orange-1) -->
      <q-expansion-item
        icon="psychology"
        :label="t('bsa.documentationSections.interpretation.title')"
        class="q-mt-md"
        header-class="bg-orange-1 text-orange-9"
      >
        <q-card class="bg-orange-1">
          <q-card-section>
            <!-- Clinical Ranges -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t('bsa.documentationSections.interpretation.content.clinicalRanges.title')
                  "
                ></span>
              </h6>
              <p
                class="text-body2 q-mb-sm"
                v-html="
                  t('bsa.documentationSections.interpretation.content.clinicalRanges.description')
                "
              ></p>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 5"
                  :key="`interp-range-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.interpretation.content.clinicalRanges.ranges[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Cardiac Index -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.interpretation.content.cardiacIndex.title')"
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`interp-cardiac-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.interpretation.content.cardiacIndex.interpretation[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- GFR Normalization -->
            <div class="q-mb-none">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t('bsa.documentationSections.interpretation.content.gfrNormalization.title')
                  "
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`interp-gfr-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.interpretation.content.gfrNormalization.significance[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- 6️⃣ APPLICAZIONI (bg-purple-1) -->
      <q-expansion-item
        icon="local_hospital"
        :label="t('bsa.documentationSections.applications.title')"
        class="q-mt-md"
        header-class="bg-purple-1 text-purple-9"
      >
        <q-card class="bg-purple-1">
          <q-card-section>
            <!-- Oncology Dosing -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.applications.content.oncologyDosing.title')"
                ></span>
              </h6>
              <p
                class="text-body2 q-mb-sm"
                v-html="
                  t('bsa.documentationSections.applications.content.oncologyDosing.description')
                "
              ></p>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 5"
                  :key="`app-oncology-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.applications.content.oncologyDosing.protocols[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Cardiac Assessment -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t('bsa.documentationSections.applications.content.cardiacAssessment.title')
                  "
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`app-cardiac-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.applications.content.cardiacAssessment.applications[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Burns Fluid Resuscitation -->
            <div class="q-mb-none">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t(
                      'bsa.documentationSections.applications.content.burnsFluidResuscitation.title',
                    )
                  "
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`app-burns-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.applications.content.burnsFluidResuscitation.protocols[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- 7️⃣ ALERT (bg-red-1) -->
      <q-expansion-item
        icon="warning"
        :label="t('bsa.documentationSections.alerts.title')"
        class="q-mt-md"
        header-class="bg-red-1 text-red-9"
      >
        <q-card class="bg-red-1">
          <q-card-section>
            <!-- Dosing Errors -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.alerts.content.dosingErrors.title')"
                ></span>
              </h6>
              <p
                class="text-body2 q-mb-sm"
                v-html="t('bsa.documentationSections.alerts.content.dosingErrors.description')"
              ></p>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 5"
                  :key="`alert-dosing-${idx}`"
                  v-html="
                    t(`bsa.documentationSections.alerts.content.dosingErrors.errors[${idx - 1}]`)
                  "
                ></li>
              </ul>
            </div>

            <!-- Toxicity Risks -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.alerts.content.toxicityRisks.title')"
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`alert-toxicity-${idx}`"
                  v-html="
                    t(`bsa.documentationSections.alerts.content.toxicityRisks.warnings[${idx - 1}]`)
                  "
                ></li>
              </ul>
            </div>

            <!-- Special Populations -->
            <div class="q-mb-none">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.alerts.content.specialPopulations.title')"
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`alert-special-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.alerts.content.specialPopulations.considerations[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- 8️⃣ DOCUMENTAZIONE (bg-indigo-1) -->
      <q-expansion-item
        icon="menu_book"
        :label="t('bsa.documentationSections.documentation.title')"
        class="q-mt-md"
        header-class="bg-indigo-1 text-indigo-9"
      >
        <q-card class="bg-indigo-1">
          <q-card-section>
            <!-- Clinical Guidelines -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t('bsa.documentationSections.documentation.content.clinicalGuidelines.title')
                  "
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`doc-guidelines-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.documentation.content.clinicalGuidelines.guidelines[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Pharmacy Protocols -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t('bsa.documentationSections.documentation.content.pharmacyProtocols.title')
                  "
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 4"
                  :key="`doc-pharmacy-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.documentation.content.pharmacyProtocols.protocols[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Documentation Requirements -->
            <div class="q-mb-none">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t(
                      'bsa.documentationSections.documentation.content.documentationRequirements.title',
                    )
                  "
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 5"
                  :key="`doc-requirements-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.documentation.content.documentationRequirements.requirements[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- 9️⃣ RIFERIMENTI (bg-teal-1) -->
      <q-expansion-item
        icon="science"
        :label="t('bsa.documentationSections.references.title')"
        class="q-mt-md"
        header-class="bg-teal-1 text-teal-9"
      >
        <q-card class="bg-teal-1">
          <q-card-section>
            <!-- Scientific Studies -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="t('bsa.documentationSections.references.content.scientificStudies.title')"
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 5"
                  :key="`ref-studies-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.references.content.scientificStudies.studies[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Clinical Guidelines References -->
            <div class="q-mb-md">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t(
                      'bsa.documentationSections.references.content.clinicalGuidelinesReferences.title',
                    )
                  "
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 5"
                  :key="`ref-guidelines-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.references.content.clinicalGuidelinesReferences.references[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>

            <!-- Additional Resources -->
            <div class="q-mb-none">
              <h6 class="text-subtitle2 q-ma-none q-mb-xs">
                <span
                  v-html="
                    t('bsa.documentationSections.references.content.additionalResources.title')
                  "
                ></span>
              </h6>
              <ul class="text-body2 q-mb-none">
                <li
                  class="q-mb-sm"
                  v-for="idx in 5"
                  :key="`ref-resources-${idx}`"
                  v-html="
                    t(
                      `bsa.documentationSections.references.content.additionalResources.resources[${idx - 1}]`,
                    )
                  "
                ></li>
              </ul>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <!-- OLD SECTIONS (manteniamo per backward compatibility) -->
    <div style="display: none">
      <!-- Applicazioni Cliniche BSA OLD-->
      <q-expansion-item
        :icon="t('bsa.sections.clinicalApplications.icon')"
        :label="t('bsa.sections.clinicalApplications.title')"
        class="q-mt-md"
        header-class="bg-purple-1 text-purple-9"
      >
        <q-card class="bg-purple-1">
          <q-card-section>
            <ul class="text-body2 q-mb-none">
              <li class="q-mb-sm" v-for="(app, index) in 4" :key="index">
                <strong>{{
                  t(`bsa.sections.clinicalApplications.applications[${index}].title`)
                }}</strong>
                {{ t(`bsa.sections.clinicalApplications.applications[${index}].text`) }}
              </li>
            </ul>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Formule BSA -->
      <q-expansion-item
        :icon="t('bsa.sections.formulas.icon')"
        :label="t('bsa.sections.formulas.title')"
        class="q-mt-md"
        header-class="bg-cyan-1 text-cyan-9"
      >
        <q-card class="bg-cyan-1">
          <q-card-section>
            <p class="text-body2 q-mb-sm" v-for="(item, index) in 3" :key="index">
              <strong>{{ t(`bsa.sections.formulas.items[${index}].name`) }}</strong
              ><br />
              {{ t(`bsa.sections.formulas.items[${index}].formula`) }}
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Fine sezioni informative -->
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
