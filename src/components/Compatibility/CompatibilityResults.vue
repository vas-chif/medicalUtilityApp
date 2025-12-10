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
      <div class="text-h6 text-grey-7 q-mb-sm">In attesa di analisi compatibilità...</div>
      <div class="text-body2 text-grey-6">
        Seleziona almeno 2 farmaci e clicca "Analizza Compatibilità"
      </div>
    </q-card>

    <!-- ============================================================ -->
    <!-- RESULTS DISPLAY (Analysis completed)                        -->
    <!-- ============================================================ -->
    <div v-else>
      <!--
        SEZIONI WARNINGS RIMOSSE - Informazioni già presenti nella lista dettagliata sopra

      <q-banner v-if="criticalWarnings.length > 0" class="bg-negative text-white q-mb-md" rounded>
        <template #avatar>
          <q-icon name="warning" size="32px" />
        </template>
        <div class="text-h6 q-mb-sm">⚠️ CRITICAL WARNINGS - Incompatibilità Rilevate</div>
        <div v-for="(warning, index) in criticalWarnings" :key="index" class="q-mb-sm">
          <strong>{{ warning.message }}</strong>
          <div v-if="warning.drugs" class="text-caption">
            Farmaci coinvolti: {{ formatDrugList(warning.drugs) }}
          </div>
        </div>
      </q-banner>

      <q-banner v-if="normalWarnings.length > 0" class="bg-warning text-grey-9 q-mb-md" rounded>
        <template #avatar>
          <q-icon name="info" size="32px" />
        </template>
        <div class="text-h6 q-mb-sm">🟡 Attenzione - Compatibilità Limitata</div>
        <div v-for="(warning, index) in normalWarnings" :key="index" class="q-mb-sm">
          <strong>{{ warning.message }}</strong>
          <div v-if="warning.drugs" class="text-caption">
            Farmaci coinvolti: {{ formatDrugList(warning.drugs) }}
          </div>
        </div>
      </q-banner>

      <q-banner v-if="infoWarnings.length > 0" class="bg-info text-white q-mb-md" rounded>
        <template #avatar>
          <q-icon name="check_circle" size="32px" />
        </template>
        <div class="text-h6 q-mb-sm">✅ Farmaci Compatibili</div>
        <div v-for="(warning, index) in infoWarnings" :key="index" class="q-mb-sm">
          <strong>{{ warning.message }}</strong>
          <div v-if="warning.drugs" class="text-caption">
            Farmaci: {{ formatDrugList(warning.drugs) }}
          </div>
        </div>
      </q-banner>
      -->

      <!-- RECOMMENDATIONS (if enabled) -->
      <q-card
        v-if="props.showRecommendations && analysisResults.recommendations?.length > 0"
        class="bg-purple-1 q-mb-md"
      >
        <q-card-section>
          <div class="text-h6 text-purple-9">
            <q-icon name="lightbulb" class="q-mr-sm" />
            💡 Raccomandazioni Cliniche
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
