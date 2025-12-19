<script setup lang="ts">
/**
 * @file CompatibilityResults.vue
 * @description IV Drug Compatibility Analysis Results Display (warnings only, NO lumen allocation)
 * @author Vasile Chifeac
 * @created 2025-11-18
 * @modified 2025-11-18
 * @example
 * // Usage in DrugCompatibilityPage.vue
 * import CompatibilityResults from 'src/components/Compatibility/CompatibilityResults.vue';
 *
 * <CompatibilityResults
 *   :analysis-results="analysisResults"
 *   :show-recommendations="true"
 * />
 * @notes
 * - Pattern § 🏗️ ARCHITETTURA COMPONENTI
 * - Warnings display ONLY (critical, normal, info)
 * - Lumen allocation delegated to LumenAllocator.vue component
 * - Uses MedicalDocumentationSection for NEWS-style docs
 * @dependencies
 * - MedicalDocumentationSection.vue
 * - DrugTypes (MultiDrugAnalysis type)
 */

// IMPORTS
import type { MultiDrugAnalysis } from 'src/types/DrugTypes';
import { useI18n } from 'vue-i18n';

// COMPOSABLES
const { t } = useI18n();

// PROPS INTERFACE
interface Props {
  /** Analysis results from compatibility check (null if not yet analyzed) */
  analysisResults: MultiDrugAnalysis | null;
  /** Show optimization recommendations section */
  showRecommendations?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showRecommendations: true,
});

// NO EMITS (pure display component)
</script>

<template>
  <div class="compatibility-results-container" style="min-width: 100%">
    <!-- ============================================================ -->
    <!-- PLACEHOLDER (No analysis yet)                               -->
    <!-- ============================================================ -->
    <q-card v-if="!analysisResults" class="bg-grey-3 q-pa-lg text-center">
      <q-icon name="pending" size="64px" color="grey-6" class="q-mb-md" />
      <div class="text-h6 text-grey-7 q-mb-sm">
        {{ t('drugCompatibility.compatibilityResults.pending') }}
      </div>
      <div class="text-body2 text-grey-6">
        {{ t('drugCompatibility.compatibilityResults.selectDrugsHint') }}
      </div>
    </q-card>

    <!-- ============================================================ -->
    <!-- RESULTS DISPLAY (Analysis completed)                        -->
    <!-- ============================================================ -->
    <div v-else>
      <!-- RECOMMENDATIONS (if enabled) -->
      <q-card
        v-if="props.showRecommendations && analysisResults.recommendations?.length > 0"
        class="bg-purple-1 q-mb-md"
      >
        <q-card-section>
          <div class="text-h6 text-purple-9">
            💡 {{ t('drugCompatibility.compatibilityResults.clinicalTitle') }}
          </div>
        </q-card-section>
        <q-separator />
        <q-list>
          <q-item v-for="(rec, index) in analysisResults.recommendations" :key="index">
            <q-item-section avatar>
              <q-icon name="arrow_right" color="purple" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ rec }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

.compatibility-results-container {
  max-width: 800px;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .compatibility-results-container {
    padding: 8px;
  }
}
</style>
