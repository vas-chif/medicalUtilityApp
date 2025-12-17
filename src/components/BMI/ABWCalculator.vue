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
const { t } = useI18n({ useScope: 'global' });
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
        </q-card-section>
      </q-card>
    </div>
    <div style="min-width: 100%">
      <!-- =============================================== -->
      <!-- SEZIONI DOCUMENTAZIONE (NEWS STANDARD - 9 Sezioni) -->
      <!-- =============================================== -->

      <!-- SECTION 1: DEFINIZIONE CLINICA (BG-BLUE-1) -->
      <q-expansion-item
        icon="info"
        :label="t('abw.documentationSections.definition.title')"
        header-class="bg-blue-1 text-blue-9"
        class="q-mt-md"
      >
        <q-card class="bg-blue-1 q-pa-md">
          <!-- Main Definition -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.definition.content.mainDefinition.title')"
          />
          <p
            class="text-body2 q-mb-md"
            v-html="t('abw.documentationSections.definition.content.mainDefinition.text')"
          />

          <!-- Key Principles -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.definition.content.keyPrinciples.title')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(`abw.documentationSections.definition.content.keyPrinciples.items[${idx - 1}]`)
              "
            />
          </ul>

          <!-- Clinical Importance -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.definition.content.clinicalImportance.title')"
          />
          <p
            class="text-body2"
            v-html="
              t('abw.documentationSections.definition.content.clinicalImportance.description')
            "
          />
          <ul>
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.definition.content.clinicalImportance.points[${idx - 1}]`,
                )
              "
            />
          </ul>
        </q-card>
      </q-expansion-item>

      <!-- SECTION 2: FISIOLOGIA (BG-GREEN-1) -->
      <q-expansion-item
        icon="science"
        :label="t('abw.documentationSections.physiology.title')"
        header-class="bg-green-1 text-green-9"
        class="q-mt-md"
      >
        <q-card class="bg-green-1 q-pa-md">
          <!-- Body Composition -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.physiology.content.bodyComposition.title')"
          />
          <p
            class="text-body2"
            v-html="t('abw.documentationSections.physiology.content.bodyComposition.description')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.physiology.content.bodyComposition.components[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Pharmacokinetics -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.physiology.content.pharmacokinetics.title')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.physiology.content.pharmacokinetics.parameters[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Metabolic Changes -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.physiology.content.metabolicChanges.title')"
          />
          <ul>
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.physiology.content.metabolicChanges.changes[${idx - 1}]`,
                )
              "
            />
          </ul>
        </q-card>
      </q-expansion-item>

      <!-- SECTION 3: MISURAZIONE (BG-AMBER-1) -->
      <q-expansion-item
        icon="straighten"
        :label="t('abw.documentationSections.measurement.title')"
        header-class="bg-amber-1 text-amber-9"
        class="q-mt-md"
      >
        <q-card class="bg-amber-1 q-pa-md">
          <!-- Clinical Measurement -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.measurement.content.clinicalMeasurement.title')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.measurement.content.clinicalMeasurement.items[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Calculation Formulas -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.measurement.content.calculationFormulas.title')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 5"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.measurement.content.calculationFormulas.steps[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Practical Protocol -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.measurement.content.practicalProtocol.title')"
          />
          <ul>
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.measurement.content.practicalProtocol.protocol[${idx - 1}]`,
                )
              "
            />
          </ul>
        </q-card>
      </q-expansion-item>

      <!-- SECTION 4: FORMULA (BG-CYAN-1) -->
      <q-expansion-item
        icon="functions"
        :label="t('abw.documentationSections.formula.title')"
        header-class="bg-cyan-1 text-cyan-9"
        class="q-mt-md"
      >
        <q-card class="bg-cyan-1 q-pa-md">
          <!-- Formula Derivation -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.formula.content.formulaDerivation.title')"
          />
          <p
            class="text-body2"
            v-html="t('abw.documentationSections.formula.content.formulaDerivation.description')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(`abw.documentationSections.formula.content.formulaDerivation.steps[${idx - 1}]`)
              "
            />
          </ul>

          <!-- Practical Examples -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.formula.content.practicalExamples.title')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 3"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.formula.content.practicalExamples.examples[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Clinical Variations -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.formula.content.clinicalVariations.title')"
          />
          <ul>
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.formula.content.clinicalVariations.variations[${idx - 1}]`,
                )
              "
            />
          </ul>
        </q-card>
      </q-expansion-item>

      <!-- SECTION 5: INTERPRETAZIONE (BG-ORANGE-1) -->
      <q-expansion-item
        icon="psychology"
        :label="t('abw.documentationSections.interpretation.title')"
        header-class="bg-orange-1 text-orange-9"
        class="q-mt-md"
      >
        <q-card class="bg-orange-1 q-pa-md">
          <!-- Clinical Ranges -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.interpretation.content.clinicalRanges.title')"
          />
          <p
            class="text-body2"
            v-html="
              t('abw.documentationSections.interpretation.content.clinicalRanges.description')
            "
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.interpretation.content.clinicalRanges.ranges[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Obesity Criteria -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.interpretation.content.obesityCriteria.title')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.interpretation.content.obesityCriteria.criteria[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Clinical Significance -->
          <p
            class="text-weight-bold"
            v-html="
              t('abw.documentationSections.interpretation.content.clinicalSignificance.title')
            "
          />
          <ul>
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.interpretation.content.clinicalSignificance.significance[${idx - 1}]`,
                )
              "
            />
          </ul>
        </q-card>
      </q-expansion-item>

      <!-- SECTION 6: APPLICAZIONI CLINICHE (BG-PURPLE-1) -->
      <q-expansion-item
        icon="local_hospital"
        :label="t('abw.documentationSections.applications.title')"
        header-class="bg-purple-1 text-purple-9"
        class="q-mt-md"
      >
        <q-card class="bg-purple-1 q-pa-md">
          <!-- Drug Dosing -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.applications.content.drugDosing.title')"
          />
          <p
            class="text-body2"
            v-html="t('abw.documentationSections.applications.content.drugDosing.description')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 5"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.applications.content.drugDosing.categories[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Nutrition Assessment -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.applications.content.nutritionAssessment.title')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.applications.content.nutritionAssessment.applications[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Anesthesia Protocol -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.applications.content.anesthesiaProtocol.title')"
          />
          <ul>
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.applications.content.anesthesiaProtocol.protocols[${idx - 1}]`,
                )
              "
            />
          </ul>
        </q-card>
      </q-expansion-item>

      <!-- SECTION 7: ALERT CLINICI (BG-RED-1) -->
      <q-expansion-item
        icon="warning"
        :label="t('abw.documentationSections.alerts.title')"
        header-class="bg-red-1 text-red-9"
        class="q-mt-md"
      >
        <q-card class="bg-red-1 q-pa-md">
          <!-- Dosing Errors -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.alerts.content.dosingErrors.title')"
          />
          <p
            class="text-body2"
            v-html="t('abw.documentationSections.alerts.content.dosingErrors.description')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="t(`abw.documentationSections.alerts.content.dosingErrors.errors[${idx - 1}]`)"
            />
          </ul>

          <!-- Contraindications -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.alerts.content.contraindications.title')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.alerts.content.contraindications.conditions[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Monitoring Requirements -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.alerts.content.monitoringRequirements.title')"
          />
          <ul>
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.alerts.content.monitoringRequirements.requirements[${idx - 1}]`,
                )
              "
            />
          </ul>
        </q-card>
      </q-expansion-item>

      <!-- SECTION 8: DOCUMENTAZIONE (BG-INDIGO-1) -->
      <q-expansion-item
        icon="menu_book"
        :label="t('abw.documentationSections.documentation.title')"
        header-class="bg-indigo-1 text-indigo-9"
        class="q-mt-md"
      >
        <q-card class="bg-indigo-1 q-pa-md">
          <!-- Clinical Guidelines -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.documentation.content.clinicalGuidelines.title')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.documentation.content.clinicalGuidelines.guidelines[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Pharmacy Protocols -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.documentation.content.pharmacyProtocols.title')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.documentation.content.pharmacyProtocols.protocols[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Documentation Requirements -->
          <p
            class="text-weight-bold"
            v-html="
              t('abw.documentationSections.documentation.content.documentationRequirements.title')
            "
          />
          <ul>
            <li
              v-for="idx in 4"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.documentation.content.documentationRequirements.requirements[${idx - 1}]`,
                )
              "
            />
          </ul>
        </q-card>
      </q-expansion-item>

      <!-- SECTION 9: RIFERIMENTI SCIENTIFICI (BG-TEAL-1) -->
      <q-expansion-item
        icon="science"
        :label="t('abw.documentationSections.references.title')"
        header-class="bg-teal-1 text-teal-9"
        class="q-mt-md"
      >
        <q-card class="bg-teal-1 q-pa-md">
          <!-- Scientific Studies -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.references.content.scientificStudies.title')"
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 5"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.references.content.scientificStudies.studies[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Clinical Guidelines References -->
          <p
            class="text-weight-bold"
            v-html="
              t('abw.documentationSections.references.content.clinicalGuidelinesReferences.title')
            "
          />
          <ul class="q-mb-md">
            <li
              v-for="idx in 5"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.references.content.clinicalGuidelinesReferences.references[${idx - 1}]`,
                )
              "
            />
          </ul>

          <!-- Additional Resources -->
          <p
            class="text-weight-bold"
            v-html="t('abw.documentationSections.references.content.additionalResources.title')"
          />
          <ul>
            <li
              v-for="idx in 5"
              :key="idx"
              class="text-body2"
              v-html="
                t(
                  `abw.documentationSections.references.content.additionalResources.resources[${idx - 1}]`,
                )
              "
            />
          </ul>
        </q-card>
      </q-expansion-item>

      <!-- Fine sezioni informative -->
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
