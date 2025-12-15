<!-- ABWCalculator.vue -->
<script setup lang="ts">
/**
 * @file ABWCalculator.vue
 * @description Adjusted Body Weight Calculator per gestione obesità (25% correction factor)
 * @author Vasile Chifeac
 * @created 2025-11-16
 *
 * @notes
 * - Componente estratto da BMICalculatorPage.vue Tab 4
 * - Formula: ABW = IBW + 0.25 × (Actual Weight - IBW)
 * - Applicazioni: dosaggio farmaci lipofili, nutrizione obesità
 * - Solo 25% eccesso peso è metabolicamente attivo
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

interface ABWFormData {
  actualWeight: number | null;
  ibw: number | null;
}

interface ABWResult {
  abw: number;
  excessWeight: number;
  percentActive: number;
}

const initialABWForm: ABWFormData = {
  actualWeight: null,
  ibw: null,
};

const initialABWResult: ABWResult = {
  abw: 0,
  excessWeight: 0,
  percentActive: 25,
};

const abwForm = ref<ABWFormData>({ ...initialABWForm });
const abwResult = ref<ABWResult>({ ...initialABWResult });

const isABWFormValid = computed(() => {
  return (
    abwForm.value.actualWeight !== null &&
    abwForm.value.actualWeight > 0 &&
    abwForm.value.ibw !== null &&
    abwForm.value.ibw > 0
  );
});

const calculateABW = () => {
  if (!isABWFormValid.value) return;

  const actualWeight = abwForm.value.actualWeight!;
  const ibw = abwForm.value.ibw!;

  // Calcolo eccesso di peso
  const excessWeight = actualWeight - ibw;

  // Formula ABW: IBW + 0.25 × (Actual - IBW)
  // Solo il 25% del peso in eccesso è metabolicamente attivo
  const abw = ibw + 0.25 * excessWeight;

  abwResult.value = {
    abw,
    excessWeight,
    percentActive: 25,
  };
};

const resetABWForm = () => {
  abwForm.value = { ...initialABWForm };
  abwResult.value = { ...initialABWResult };
};
</script>

<template>
  <div class="row q-gutter-lg">
    <!-- Pannello Input ABW -->
    <div class="col-12 col-md-5">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">{{ t('abw.title') }}</h6>
          <p class="text-caption text-grey-7 q-mb-md">
            {{ t('abw.description') }}
          </p>

          <!-- Peso Attuale -->
          <q-input
            v-model.number="abwForm.actualWeight"
            type="number"
            step="0.1"
            :label="t('abw.form.actualWeightLabel')"
            :suffix="t('abw.form.actualWeightSuffix')"
            outlined
            class="q-mb-md"
            :rules="[(val) => (val > 0 && val <= 500) || t('abw.form.actualWeightRule')]"
          >
            <template v-slot:prepend>
              <q-icon :name="t('abw.form.actualWeightIcon')" color="blue" />
            </template>
          </q-input>

          <!-- IBW (manual input) -->
          <q-input
            v-model.number="abwForm.ibw"
            type="number"
            step="0.1"
            :label="t('abw.form.ibwLabel')"
            :suffix="t('abw.form.ibwSuffix')"
            outlined
            class="q-mb-md"
            :hint="t('abw.form.ibwHint')"
            :rules="[(val) => (val > 0 && val <= 200) || t('abw.form.ibwRule')]"
          >
            <template v-slot:prepend>
              <q-icon :name="t('abw.form.ibwIcon')" color="green" />
            </template>
          </q-input>

          <!-- Bottoni -->
          <q-btn
            @click="calculateABW"
            color="primary"
            size="lg"
            class="full-width q-mb-sm"
            icon="calculate"
            :disable="!isABWFormValid"
          >
            {{ t('abw.buttons.calculate') }}
          </q-btn>
          <q-btn
            @click="resetABWForm"
            color="negative"
            size="lg"
            class="full-width"
            icon="refresh"
            outline
          >
            {{ t('abw.buttons.reset') }}
          </q-btn>
        </q-card-section>
      </q-card>
    </div>

    <!-- Pannello Risultati ABW -->
    <div class="col-12 col-md-6">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">{{ t('abw.results.title') }}</h6>

          <!-- Risultati Calcolo (visibili solo dopo calcolo) -->
          <div v-if="abwResult.abw > 0" class="q-mb-lg">
            <!-- Risultato Principale -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 text-primary q-mb-sm">
                {{ abwResult.abw.toFixed(1) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>{{ t('abw.results.mainValue') }}</strong> ({{ t('abw.results.mainLabel') }})
              </div>
            </div>

            <q-separator class="q-mb-md" />

            <!-- Dettagli Calcolo -->
            <div class="q-mb-md">
              <q-list bordered separator class="rounded-borders">
                <q-item>
                  <q-item-section>
                    <q-item-label overline>{{
                      t('abw.results.details.actualWeight')
                    }}</q-item-label>
                    <q-item-label class="text-h6">{{ abwForm.actualWeight }} kg</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label overline>{{ t('abw.results.details.ibw') }}</q-item-label>
                    <q-item-label class="text-h6">{{ abwForm.ibw }} kg</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label overline>{{
                      t('abw.results.details.excessWeight')
                    }}</q-item-label>
                    <q-item-label class="text-h6 text-orange">
                      {{ abwResult.excessWeight.toFixed(1) }} kg
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label overline>{{
                      t('abw.results.details.activeWeight')
                    }}</q-item-label>
                    <q-item-label class="text-h6 text-green">
                      {{ (abwResult.excessWeight * 0.25).toFixed(1) }} kg
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>

          <!-- Messaggio placeholder se nessun calcolo -->
          <div v-else class="text-center text-grey-6 q-pa-md q-mb-lg">
            <q-icon name="info" size="lg" class="q-mb-md" />
            <p class="text-body2">{{ t('abw.results.placeholder') }}</p>
          </div>

          <!-- ============================================================ -->
          <!-- SEZIONI INFORMATIVE (SEMPRE VISIBILI) -->
          <!-- ============================================================ -->

          <!-- Formula ABW -->
          <q-banner class="bg-blue-1 q-mb-md" rounded>
            <template v-slot:avatar>
              <q-icon :name="t('abw.formulaBanner.icon')" color="primary" />
            </template>
            <div class="text-body2">
              <strong>{{ t('abw.formulaBanner.title') }}</strong> {{ t('abw.formulaBanner.formula')
              }}<br />
              <span class="text-caption">
                {{ t('abw.formulaBanner.caption') }}
              </span>
            </div>
          </q-banner>

          <!-- Applicazioni Cliniche ABW -->
          <q-expansion-item
            :icon="t('abw.sections.clinicalApplications.icon')"
            :label="t('abw.sections.clinicalApplications.title')"
            class="text-primary"
          >
            <q-card class="q-pa-md">
              <ul class="text-body2 q-mb-none">
                <li class="q-mb-sm" v-for="(item, index) in 5" :key="index">
                  <strong>{{
                    t(`abw.sections.clinicalApplications.items[${index}].title`)
                  }}</strong>
                  {{ t(`abw.sections.clinicalApplications.items[${index}].text`) }}
                </li>
              </ul>
            </q-card>
          </q-expansion-item>

          <!-- Note Cliniche -->
          <q-expansion-item
            :icon="t('abw.sections.clinicalNotes.icon')"
            :label="t('abw.sections.clinicalNotes.title')"
            class="text-primary q-mt-sm"
          >
            <q-card class="q-pa-md">
              <div class="text-body2">
                <p
                  class="q-mb-sm"
                  v-for="(item, index) in 4"
                  :key="index"
                  :class="{ 'q-mb-none': index === 3 }"
                >
                  <strong>{{ t(`abw.sections.clinicalNotes.paragraphs[${index}].title`) }}</strong>
                  {{ t(`abw.sections.clinicalNotes.paragraphs[${index}].text`) }}
                </p>
              </div>
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
