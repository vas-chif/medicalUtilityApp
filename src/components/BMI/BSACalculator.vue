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
const { t } = useI18n();
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

          <!-- Applicazioni Cliniche BSA -->
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
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
