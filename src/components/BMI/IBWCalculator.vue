<!-- IBWCalculator.vue -->
<script setup lang="ts">
/**
 * @file IBWCalculator.vue
 * @description Ideal Body Weight Calculator con 3 formule (Hamwi, Robinson, PBW)
 * @author Vasile Chifeac
 * @created 2025-11-16
 * @modified 2025-12-15
 *
 * @notes
 * - Componente estratto da BMICalculatorPage.vue Tab 3
 * - Hamwi (1964): uso generale nutrizione clinica
 * - Robinson (1983): uso generale nutrizione clinica
 * - PBW (ARDSNet 2000): ventilazione meccanica ARDS
 * - Supporto bilingue completo (IT/EN) via vue-i18n
 */

// ============================================================
// IMPORTS
// ============================================================
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSecureLogger } from 'src/composables/useSecureLogger';
import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';

// ============================================================
// COMPOSABLES
// ============================================================
const { t } = useI18n();
const { logger } = useSecureLogger();
const { isDev: isDevelopment } = useSmartEnvironment();

// ============================================================
// TYPES & INTERFACES
// ============================================================

// ============================================================
// TYPES & INTERFACES
// ============================================================
/**
 * @interface IBWFormData
 * @description Form data structure for IBW calculation
 * @property {number | null} height - Patient height in cm (range: 1-300)
 * @property {'male' | 'female' | null} gender - Patient biological sex for formula selection
 */
interface IBWFormData {
  height: number | null;
  gender: 'male' | 'female' | null;
}

/**
 * @interface IBWResult
 * @description Calculation results from 3 IBW formulas
 * @property {number} hamwi - Hamwi (1964) formula result in kg
 * @property {number} robinson - Robinson (1983) formula result in kg
 * @property {number} pbw - Predicted Body Weight (ARDSNet 2000) in kg
 */
interface IBWResult {
  hamwi: number;
  robinson: number;
  pbw: number;
}

// ============================================================
// STATE
// ============================================================

// ============================================================
// STATE
// ============================================================
/** Initial empty form state */
const initialIBWForm: IBWFormData = {
  height: null,
  gender: null,
};

/** Initial empty result state (all zeros) */
const initialIBWResult: IBWResult = {
  hamwi: 0,
  robinson: 0,
  pbw: 0,
};

/** Reactive form data for IBW calculation */
const ibwForm = ref<IBWFormData>({ ...initialIBWForm });

/** Reactive calculation results */
const ibwResult = ref<IBWResult>({ ...initialIBWResult });

// ============================================================
// COMPUTED
// ============================================================
/**
 * @computed isIBWFormValid
 * @description Validates form data before calculation
 * @returns {boolean} True if height > 0 and gender selected
 */
const isIBWFormValid = computed(() => {
  const isValid =
    ibwForm.value.height !== null && ibwForm.value.height > 0 && ibwForm.value.gender !== null;

  if (isDevelopment) {
    logger.debug('[isIBWFormValid] Form validation', {
      height: ibwForm.value.height,
      gender: ibwForm.value.gender,
      isValid,
    });
  }

  return isValid;
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * @function calculateIBW
 * @description Calculates Ideal Body Weight using 3 validated formulas
 *
 * Formulas:
 * - Hamwi (1964): General clinical nutrition use
 * - Robinson (1983): General clinical nutrition use
 * - PBW (ARDSNet 2000): Mechanical ventilation in ARDS
 *
 * @throws {Error} If form validation fails (should be prevented by button disable)
 *
 * @example
 * // For 175cm male:
 * calculateIBW() → { hamwi: 70.2, robinson: 72.5, pbw: 70.5 }
 *
 * @see {@link https://pubmed.ncbi.nlm.nih.gov/10934479/ | Hamwi Formula}
 * @see {@link https://pubmed.ncbi.nlm.nih.gov/6361444/ | Robinson Formula}
 * @see {@link https://pubmed.ncbi.nlm.nih.gov/10793162/ | ARDSNet PBW}
 */
const calculateIBW = (): void => {
  if (!isIBWFormValid.value) {
    logger.warn('[calculateIBW] Form validation failed', {
      height: ibwForm.value.height,
      gender: ibwForm.value.gender,
    });
    return;
  }

  const height_cm = ibwForm.value.height!;
  const height_in = height_cm / 2.54;
  const gender = ibwForm.value.gender!;

  let hamwi = 0;
  let robinson = 0;
  let pbw = 0;

  if (gender === 'male') {
    // Hamwi (1964) - Male: 48 kg + 2.7 kg/inch over 5 feet
    hamwi = 48 + 2.7 * ((height_cm - 152.4) / 2.54);
    // Robinson (1983) - Male: 52 kg + 1.9 kg/inch over 5 feet
    robinson = 52 + 1.9 * (height_in - 60);
    // PBW ARDSNet (2000) - Male: 50 + 0.91 × (height_cm - 152.4)
    pbw = 50 + 0.91 * (height_cm - 152.4);
  } else {
    // Hamwi (1964) - Female: 45.5 kg + 2.25 kg/inch over 5 feet
    hamwi = 45.5 + 2.25 * ((height_cm - 152.4) / 2.54);
    // Robinson (1983) - Female: 49 kg + 1.7 kg/inch over 5 feet
    robinson = 49 + 1.7 * (height_in - 60);
    // PBW ARDSNet (2000) - Female: 45.5 + 0.91 × (height_cm - 152.4)
    pbw = 45.5 + 0.91 * (height_cm - 152.4);
  }

  ibwResult.value = {
    hamwi: hamwi > 0 ? hamwi : 0,
    robinson: robinson > 0 ? robinson : 0,
    pbw: pbw > 0 ? pbw : 0,
  };

  logger.info('[calculateIBW] Calculation completed', {
    input: { height_cm, gender },
    results: ibwResult.value,
  });
};

/**
 * @function resetIBWForm
 * @description Resets form and results to initial state
 */
const resetIBWForm = (): void => {
  ibwForm.value = { ...initialIBWForm };
  ibwResult.value = { ...initialIBWResult };

  logger.info('[resetIBWForm] Form reset completed');
};
</script>

<template>
  <div class="row q-gutter-lg">
    <!-- Pannello Input IBW -->
    <div class="col-12 col-md-5">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">{{ t('ibw.title') }}</h6>
          <p class="text-caption text-grey-7 q-mb-md">
            {{ t('ibw.subtitle') }}
          </p>

          <!-- Altezza -->
          <q-input
            v-model.number="ibwForm.height"
            type="number"
            :label="t('ibw.form.heightLabel')"
            :suffix="t('ibw.form.heightSuffix')"
            outlined
            class="q-mb-md"
            :rules="[(val) => (val > 0 && val <= 300) || t('ibw.form.heightRule')]"
          >
            <template v-slot:prepend>
              <q-icon :name="t('ibw.form.heightIcon')" color="green" />
            </template>
          </q-input>

          <!-- Sesso -->
          <q-select
            v-model="ibwForm.gender"
            :options="[
              { label: t('ibw.form.genderOptions.male'), value: 'male' },
              { label: t('ibw.form.genderOptions.female'), value: 'female' },
            ]"
            :label="t('ibw.form.genderLabel')"
            outlined
            class="q-mb-md"
            emit-value
            map-options
            :rules="[(val) => !!val || t('ibw.form.genderRule')]"
          >
            <template v-slot:prepend>
              <q-icon :name="t('ibw.form.genderIcon')" color="purple" />
            </template>
          </q-select>

          <!-- Bottoni -->
          <q-btn
            @click="calculateIBW"
            color="primary"
            size="lg"
            class="full-width q-mb-sm"
            icon="calculate"
            :disable="!isIBWFormValid"
          >
            {{ t('ibw.buttons.calculate') }}
          </q-btn>
          <q-btn
            @click="resetIBWForm"
            color="negative"
            size="lg"
            class="full-width"
            icon="refresh"
            outline
          >
            {{ t('ibw.buttons.reset') }}
          </q-btn>
        </q-card-section>
      </q-card>
    </div>

    <!-- Pannello Risultati IBW -->
    <div class="col-12 col-md-6">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">{{ t('ibw.results.title') }}</h6>

          <!-- Risultati Calcolo (visibili solo dopo calcolo) -->
          <div v-if="ibwResult.hamwi > 0" class="q-mb-lg">
            <!-- Tabella Comparazione Formule -->
            <q-markup-table class="q-mb-md">
              <thead>
                <tr>
                  <th class="text-left">{{ t('ibw.results.table.formulaColumn') }}</th>
                  <th class="text-right">{{ t('ibw.results.table.ibwColumn') }}</th>
                  <th class="text-right">{{ t('ibw.results.table.rangeColumn') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{{ t('ibw.results.table.hamwiLabel') }}</strong>
                  </td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ ibwResult.hamwi.toFixed(1) }}
                  </td>
                  <td class="text-right text-caption">
                    {{ (ibwResult.hamwi * 0.9).toFixed(1) }} -
                    {{ (ibwResult.hamwi * 1.1).toFixed(1) }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{{ t('ibw.results.table.robinsonLabel') }}</strong>
                  </td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ ibwResult.robinson.toFixed(1) }}
                  </td>
                  <td class="text-right text-caption">
                    {{ (ibwResult.robinson * 0.9).toFixed(1) }} -
                    {{ (ibwResult.robinson * 1.1).toFixed(1) }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{{ t('ibw.results.table.pbwLabel') }}</strong>
                  </td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ ibwResult.pbw.toFixed(1) }}
                  </td>
                  <td class="text-right text-caption">
                    {{ (ibwResult.pbw * 0.9).toFixed(1) }} -
                    {{ (ibwResult.pbw * 1.1).toFixed(1) }}
                  </td>
                </tr>
              </tbody>
            </q-markup-table>

            <!-- Note Cliniche IBW -->
            <q-banner class="bg-blue-1 q-mb-md" rounded>
              <template v-slot:avatar>
                <q-icon name="info" color="primary" />
              </template>
              <div class="text-caption">
                <strong>{{ t('ibw.results.banner.title') }}</strong>
                {{ t('ibw.results.banner.rangeText') }}<br />
                <strong>{{ t('ibw.results.banner.hamwiText').split(':')[0] }}:</strong>
                {{ t('ibw.results.banner.hamwiText').split(':')[1] }}<br />
                <strong>{{ t('ibw.results.banner.pbwText').split(':')[0] }}:</strong>
                {{ t('ibw.results.banner.pbwText').split(':')[1] }}
              </div>
            </q-banner>
          </div>

          <!-- Messaggio placeholder se nessun calcolo -->
          <div v-else class="text-center text-grey-6 q-pa-md q-mb-lg">
            <q-icon :name="t('ibw.results.noDataIcon')" size="lg" class="q-mb-md" />
            <p class="text-body2">{{ t('ibw.results.noData') }}</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div style="min-width: 100%">
      <!-- ============================================================ -->
      <!-- SEZIONI MEDICHE (SEMPRE VISIBILI) -->
      <!-- ============================================================ -->

      <!-- Applicazioni Cliniche IBW -->
      <q-expansion-item
        :icon="t('ibw.sections.clinicalApplications.icon')"
        color="medical-mint"
        :label="t('ibw.sections.clinicalApplications.title')"
        class="q-mt-md"
        header-class="bg-purple-1 text-purple-9"
      >
        <q-card class="bg-purple-1">
          <q-card-section>
            <ul class="text-body2 q-mb-none">
              <li class="q-mb-sm">
                <strong>{{ t('ibw.sections.clinicalApplications.item1Title') }}</strong>
                {{ t('ibw.sections.clinicalApplications.item1Text') }}
              </li>
              <li class="q-mb-sm">
                <strong>{{ t('ibw.sections.clinicalApplications.item2Title') }}</strong>
                {{ t('ibw.sections.clinicalApplications.item2Text') }}
              </li>
              <li class="q-mb-sm">
                <strong>{{ t('ibw.sections.clinicalApplications.item3Title') }}</strong>
                {{ t('ibw.sections.clinicalApplications.item3Text') }}
              </li>
              <li class="q-mb-sm">
                <strong>{{ t('ibw.sections.clinicalApplications.item4Title') }}</strong>
                <span v-html="t('ibw.sections.clinicalApplications.item4Text')"></span>
              </li>
            </ul>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Formule IBW -->
      <q-expansion-item
        :icon="t('ibw.sections.formulas.icon')"
        color="medical-mint"
        :label="t('ibw.sections.formulas.title')"
        class="q-mt-md"
        header-class="bg-cyan-1 text-cyan-9"
      >
        <q-card class="bg-cyan-1">
          <q-card-section>
            <p class="text-body2 q-mb-sm">
              <strong>{{ t('ibw.sections.formulas.hamwiTitle') }}</strong
              ><br />
              {{ t('ibw.sections.formulas.hamwiMale') }}<br />
              {{ t('ibw.sections.formulas.hamwiFemale') }}
            </p>
            <p class="text-body2 q-mb-sm">
              <strong>{{ t('ibw.sections.formulas.robinsonTitle') }}</strong
              ><br />
              {{ t('ibw.sections.formulas.robinsonMale') }}<br />
              {{ t('ibw.sections.formulas.robinsonFemale') }}
            </p>
            <p class="text-body2 q-mb-none">
              <strong>{{ t('ibw.sections.formulas.pbwTitle') }}</strong
              ><br />
              {{ t('ibw.sections.formulas.pbwMale') }}<br />
              {{ t('ibw.sections.formulas.pbwFemale') }}
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Sezione 3: Definizione e Significato Clinico -->
      <q-expansion-item
        :icon="t('ibw.sections.definition.icon')"
        color="medical-mint"
        :label="t('ibw.sections.definition.title')"
        class="q-mt-md"
        header-class="bg-green-1 text-green-9"
      >
        <q-card class="bg-green-1">
          <q-card-section>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.definition.whatIsTitle') }}</strong>
              <p>{{ t('ibw.sections.definition.whatIsText') }}</p>
            </div>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.definition.clinicalSignificanceTitle') }}</strong>
              <p>{{ t('ibw.sections.definition.clinicalSignificanceText') }}</p>
            </div>
            <div class="text-body2">
              <strong>{{ t('ibw.sections.definition.limitationsTitle') }}</strong>
              <p>{{ t('ibw.sections.definition.limitationsText') }}</p>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Sezione 4: Fisiopatologia -->
      <q-expansion-item
        :icon="t('ibw.sections.physiology.icon')"
        color="medical-mint"
        :label="t('ibw.sections.physiology.title')"
        class="q-mt-md"
        header-class="bg-orange-1 text-orange-9"
      >
        <q-card class="bg-orange-1">
          <q-card-section>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.physiology.normalPhysiologyTitle') }}</strong>
              <p>{{ t('ibw.sections.physiology.normalPhysiologyText') }}</p>
            </div>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.physiology.pathophysiologyTitle') }}</strong>
              <p v-html="t('ibw.sections.physiology.pathophysiologyText')"></p>
            </div>
            <div class="text-body2">
              <strong>{{ t('ibw.sections.physiology.formulaRationaleTitle') }}</strong>
              <p v-html="t('ibw.sections.physiology.formulaRationaleText')"></p>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Sezione 5: Interpretazione Risultati -->
      <q-expansion-item
        :icon="t('ibw.sections.interpretation.icon')"
        color="medical-mint"
        :label="t('ibw.sections.interpretation.title')"
        class="q-mt-md"
        header-class="bg-blue-1 text-blue-9"
      >
        <q-card class="bg-blue-1">
          <q-card-section>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.interpretation.comparisonTitle') }}</strong>
              <p v-html="t('ibw.sections.interpretation.comparisonText')"></p>
            </div>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.interpretation.formulaSelectionTitle') }}</strong>
              <p v-html="t('ibw.sections.interpretation.formulaSelectionText')"></p>
            </div>
            <div class="text-body2">
              <strong>{{ t('ibw.sections.interpretation.specialPopulationsTitle') }}</strong>
              <p v-html="t('ibw.sections.interpretation.specialPopulationsText')"></p>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Sezione 6: Ventilazione Meccanica -->
      <q-expansion-item
        :icon="t('ibw.sections.mechanicalVentilation.icon')"
        color="medical-mint"
        :label="t('ibw.sections.mechanicalVentilation.title')"
        class="q-mt-md"
        header-class="bg-teal-1 text-teal-9"
      >
        <q-card class="bg-teal-1">
          <q-card-section>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.mechanicalVentilation.ardsNetTitle') }}</strong>
              <p v-html="t('ibw.sections.mechanicalVentilation.ardsNetText')"></p>
            </div>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.mechanicalVentilation.calculationExampleTitle') }}</strong>
              <p v-html="t('ibw.sections.mechanicalVentilation.calculationExampleText')"></p>
            </div>
            <div class="text-body2">
              <strong>{{ t('ibw.sections.mechanicalVentilation.otherUsesTitle') }}</strong>
              <p v-html="t('ibw.sections.mechanicalVentilation.otherUsesText')"></p>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Sezione 7: Valutazione Nutrizionale -->
      <q-expansion-item
        :icon="t('ibw.sections.nutritionalAssessment.icon')"
        color="medical-mint"
        :label="t('ibw.sections.nutritionalAssessment.title')"
        class="q-mt-md"
        header-class="bg-amber-1 text-amber-9"
      >
        <q-card class="bg-amber-1">
          <q-card-section>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.nutritionalAssessment.caloricNeedsTitle') }}</strong>
              <p v-html="t('ibw.sections.nutritionalAssessment.caloricNeedsText')"></p>
            </div>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.nutritionalAssessment.proteinNeedsTitle') }}</strong>
              <p v-html="t('ibw.sections.nutritionalAssessment.proteinNeedsText')"></p>
            </div>
            <div class="text-body2">
              <strong>{{
                t('ibw.sections.nutritionalAssessment.malnutritionScreeningTitle')
              }}</strong>
              <p v-html="t('ibw.sections.nutritionalAssessment.malnutritionScreeningText')"></p>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Sezione 8: Dosaggio Farmaci -->
      <q-expansion-item
        :icon="t('ibw.sections.drugDosing.icon')"
        color="medical-mint"
        :label="t('ibw.sections.drugDosing.title')"
        class="q-mt-md"
        header-class="bg-pink-1 text-pink-9"
      >
        <q-card class="bg-pink-1">
          <q-card-section>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.drugDosing.hydrophilicDrugsTitle') }}</strong>
              <p v-html="t('ibw.sections.drugDosing.hydrophilicDrugsText')"></p>
            </div>
            <div class="text-body2 q-mb-md">
              <strong>{{ t('ibw.sections.drugDosing.lipophilicDrugsTitle') }}</strong>
              <p v-html="t('ibw.sections.drugDosing.lipophilicDrugsText')"></p>
            </div>
            <div class="text-body2">
              <strong>{{ t('ibw.sections.drugDosing.chemotherapyTitle') }}</strong>
              <p v-html="t('ibw.sections.drugDosing.chemotherapyText')"></p>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Sezione 9: Bibliografia Scientifica -->
      <q-expansion-item
        :icon="t('ibw.sections.references.icon')"
        color="medical-mint"
        :label="t('ibw.sections.references.title')"
        class="q-mt-md"
        header-class="bg-indigo-1 text-indigo-9"
      >
        <q-card class="bg-indigo-1">
          <q-card-section>
            <div class="q-mb-md">
              <p class="text-weight-bold">
                {{ t('ibw.sections.references.reference1Author') }}
              </p>
              <p class="q-ml-md text-body2">
                {{ t('ibw.sections.references.reference1Title') }}<br />
                <em v-html="t('ibw.sections.references.reference1Journal')"></em><br />
                <span v-html="t('ibw.sections.references.reference1Description')"></span>
              </p>
            </div>

            <div class="q-mb-md">
              <p class="text-weight-bold">
                {{ t('ibw.sections.references.reference2Author') }}
              </p>
              <p class="q-ml-md text-body2">
                {{ t('ibw.sections.references.reference2Title') }}<br />
                <span v-html="t('ibw.sections.references.reference2Journal')"></span><br />
                <span v-html="t('ibw.sections.references.reference2Pmid')"></span><br />
                <span v-html="t('ibw.sections.references.reference2Description')"></span>
              </p>
            </div>

            <div class="q-mb-md">
              <p class="text-weight-bold">
                {{ t('ibw.sections.references.reference3Author') }}
              </p>
              <p class="q-ml-md text-body2">
                {{ t('ibw.sections.references.reference3Title') }}<br />
                <span v-html="t('ibw.sections.references.reference3Journal')"></span><br />
                <span v-html="t('ibw.sections.references.reference3Pmid')"></span><br />
                <span v-html="t('ibw.sections.references.reference3Doi')"></span><br />
                <span v-html="t('ibw.sections.references.reference3Description')"></span>
              </p>
            </div>

            <div class="q-mb-md">
              <p class="text-weight-bold">
                {{ t('ibw.sections.references.reference4Author') }}
              </p>
              <p class="q-ml-md text-body2">
                {{ t('ibw.sections.references.reference4Title') }}<br />
                <span v-html="t('ibw.sections.references.reference4Journal')"></span><br />
                <span v-html="t('ibw.sections.references.reference4Pmid')"></span><br />
                <span v-html="t('ibw.sections.references.reference4Description')"></span>
              </p>
            </div>

            <q-separator class="q-my-md" />

            <p class="text-weight-bold q-mb-sm">
              {{ t('ibw.sections.references.additionalResourcesTitle') }}
            </p>
            <ul class="q-ml-md text-body2">
              <li v-html="t('ibw.sections.references.additionalResource1')"></li>
              <li v-html="t('ibw.sections.references.additionalResource2')"></li>
              <li v-html="t('ibw.sections.references.additionalResource3')"></li>
            </ul>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Fine sezioni mediche -->
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
