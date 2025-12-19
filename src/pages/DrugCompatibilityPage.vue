<script setup lang="ts">
/**
 * @file DrugCompatibilityPage.vue
 * @description Drug Compatibility Checker Page - Orchestrator for IV drug compatibility analysis
 *              Pattern § 🏗️ ARCHITETTURA COMPONENTI (REGOLE_COPILOT.md lines 287-443)
 *              Page as orchestrator (180-400 lines) - Components contain business logic
 * @author Vasile Chifeac
 * @created 2025-11-23
 * @modified 2025-11-23
 *
 * @example
 * // Router usage
 * import DrugCompatibilityPage from 'src/pages/DrugCompatibilityPage.vue';
 *
 * @notes
 * - Page orchestrator pattern: Layout + Navigation ONLY
 * - NO business logic (calculations in components)
 * - 4 modular components integrated:
 *   1. DrugSelector: Multi-drug search & selection (489 lines)
 *   2. CompatibilityResults: Warnings display (347 lines)
 *   3. LumenAllocator: Greedy lumen optimization (725 lines)
 *   4. CompatibilityDocumentation: Scientific docs (487 lines)
 * - State management: selectedDrugsPayload, analysisResults
 * - Event-driven architecture: drugs-selected, selection-cleared
 * - Responsive grid layout (2 columns desktop, stacked mobile)
 *
 * @refactoring
 * - BEFORE: 711 lines monolithic
 * - AFTER: 234 lines Page + 270 Common + 2048 Components = 2552 TOTAL
 * - Page reduction: -67% (711 → 234 lines)
 * - Benefits: DRY -62%, Maintainability, Testability, NEW Lumen Optimizer feature
 *
 * @dependencies
 * - DrugSelector.vue (src/components/Compatibility/)
 * - CompatibilityResults.vue (src/components/Compatibility/)
 * - LumenAllocator.vue (src/components/Compatibility/)
 * - CompatibilityDocumentation.vue (src/components/Compatibility/)
 * - useDrugCompatibility composable (multi-drug analysis logic)
 * - DrugTypes (MultiDrugAnalysis type)
 */

// ============================================================
// IMPORTS
// ============================================================
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSecureLogger } from 'src/composables/useSecureLogger';

// Componenti modulari (Page-based folder structure)
import DrugSelector from 'src/components/Compatibility/DrugSelector.vue';
import CompatibilityResults from 'src/components/Compatibility/CompatibilityResults.vue';
import LumenAllocator from 'src/components/Compatibility/LumenAllocator.vue';
import CompatibilityDocumentation from 'src/components/Compatibility/CompatibilityDocumentation.vue';
import DrugCompatibilityList from 'src/components/Compatibility/DrugCompatibilityList.vue';

// Composable for multi-drug analysis
import { useDrugCompatibility } from 'src/composables/useDrugCompatibility';

// Pinia Store for deterministic drug compatibility
import { useDrugCompatibilityStore } from 'src/stores/drug-compatibility-store';

// Types
import type { MultiDrugAnalysis } from 'src/types/DrugTypes';

// ============================================================
// COMPOSABLES
// ============================================================
const { t } = useI18n();
const { logger } = useSecureLogger();
const { analyzeMultipleDrugs } = useDrugCompatibility();
const compatibilityStore = useDrugCompatibilityStore();

/**
 * Multi-drug compatibility analysis results
 * Null when no analysis performed yet
 */
const analysisResults = ref<MultiDrugAnalysis | null>(null);

// ============================================================
// EVENT HANDLERS
// ============================================================

/**
 * Handle drugs selected event from DrugSelector
 * Triggers multi-drug compatibility analysis using SORTED drugs from store
 */
const handleDrugsSelected = (): void => {
  logger.info('Drugs selected (store sorted)', {
    drugCount: compatibilityStore.sortedDrugs.length,
    drugs: compatibilityStore.sortedDrugs,
  });

  // Trigger multi-drug analysis usando sortedDrugs (alfabetico)
  analysisResults.value = analyzeMultipleDrugs(compatibilityStore.sortedDrugs);

  logger.info('Analysis completed', {
    warnings: analysisResults.value?.warnings.length,
    results: analysisResults.value?.results.length,
  });
};

/**
 * Handle selection cleared event from DrugSelector
 * Resets analysis results (selectedDrugs già resettato dallo store)
 */
const handleSelectionCleared = (): void => {
  logger.info('Selection cleared');

  // Reset analysis results (store già resettato)
  analysisResults.value = null;
};
</script>

<template>
  <!-- ============================================================ -->
  <!-- PAGE CONTAINER                                               -->
  <!-- ============================================================ -->
  <q-page padding>
    <!-- ============================================================ -->
    <!-- PAGE HEADER                                                  -->
    <!-- ============================================================ -->
    <div class="q-mb-lg">
      <!-- Breadcrumbs -->
      <q-breadcrumbs class="q-mb-sm">
        <q-breadcrumbs-el :label="t('drugCompatibilityPage.breadcrumbs.home')" icon="home" to="/" />
        <q-breadcrumbs-el :label="t('drugCompatibilityPage.breadcrumbs.pharmacology')" />
        <q-breadcrumbs-el :label="t('drugCompatibilityPage.breadcrumbs.drugCompatibility')" />
      </q-breadcrumbs>

      <!-- Page Title -->
      <h1 class="text-h4 text-weight-bold q-mb-xs">💊 {{ t('drugCompatibilityPage.title') }}</h1>

      <!-- Page Subtitle -->
      <p class="text-subtitle1 text-grey-7">
        {{ t('drugCompatibilityPage.subtitle') }}
      </p>
    </div>

    <!-- ============================================================ -->
    <!-- DISCLAIMER ALERT                                             -->
    <!-- ============================================================ -->
    <q-banner class="bg-amber-1 text-amber-10 q-mb-md" rounded dense>
      <template #avatar>
        <q-icon name="warning" color="amber-10" />
      </template>
      <div class="text-weight-bold">{{ t('drugCompatibilityPage.disclaimer.title') }}</div>
      <div>{{ t('drugCompatibilityPage.disclaimer.message') }}</div>
    </q-banner>

    <!-- ============================================================ -->
    <!-- INFO BANNER                                                  -->
    <!-- ============================================================ -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-lg" rounded>
      <template #avatar>
        <q-icon name="info" color="blue-9" />
      </template>

      <div class="text-weight-medium">
        <strong>{{ t('drugCompatibilityPage.banner.title') }}</strong>
      </div>

      <div class="q-mt-sm">
        <ul class="q-pl-md q-my-none">
          <li>
            <strong>{{ t('drugCompatibilityPage.banner.realTimeAnalysis.label') }}:</strong>
            {{ t('drugCompatibilityPage.banner.realTimeAnalysis.description') }}
          </li>
          <li>
            <strong>{{ t('drugCompatibilityPage.banner.lumenOptimization.label') }}:</strong>
            {{ t('drugCompatibilityPage.banner.lumenOptimization.description') }}
          </li>
          <li>
            <strong>{{ t('drugCompatibilityPage.banner.ysiteProtocols.label') }}:</strong>
            {{ t('drugCompatibilityPage.banner.ysiteProtocols.description') }}
          </li>
        </ul>
      </div>
    </q-banner>

    <!-- ============================================================ -->
    <!-- MAIN LAYOUT: 2-COLUMN DESKTOP, STACKED MOBILE               -->
    <!-- Layout Responsivo:                                           -->
    <!-- - DESKTOP: Selezione + Compatibilità (sx) | Lumen + Results (dx) -->
    <!-- - MOBILE: Tutto stacked (Selezione → Lumen → Compatibilità → Results) -->
    <!-- ============================================================ -->
    <div class="row q-col-gutter-md q-mb-lg">
      <!-- LEFT COLUMN (DESKTOP): DrugSelector + Compatibilità -->
      <div class="col-12 col-md-6">
        <!-- DrugSelector -->
        <div class="q-mb-md">
          <DrugSelector
            :calculate-button-text="t('drugCompatibilityPage.drugSelector.calculateButton')"
            :reset-button-text="t('drugCompatibilityPage.drugSelector.resetButton')"
            :title="t('drugCompatibilityPage.drugSelector.title')"
            @drugs-selected="handleDrugsSelected"
            @selection-cleared="handleSelectionCleared"
          />
        </div>

        <!-- Compatibilità - SOLO DESKTOP (sotto selezione farmaci) -->
        <div class="gt-sm q-mb-md">
          <DrugCompatibilityList :analysis-results="analysisResults" />
        </div>
      </div>

      <!-- RIGHT COLUMN (DESKTOP): LumenAllocator + CompatibilityResults -->
      <div class="col-12 col-md-6">
        <!-- LumenAllocator (top of right column) -->
        <!-- NOTE: selectedDrugs rimosso - usa sortedDrugs da store (deter min istico) -->
        <div class="q-mb-md">
          <LumenAllocator
            :analysis-results="analysisResults"
            :available-lumens="3"
            @allocation-completed="
              (allocation) => logger.debug('Allocation completed', { allocation })
            "
            @insufficient-lumens="(deficit) => logger.warn('Insufficient lumens', { deficit })"
          />
        </div>

        <!-- CompatibilityResults (raccomandazioni) -->
        <div class="q-mb-md">
          <CompatibilityResults :analysis-results="analysisResults" :show-recommendations="true" />
        </div>

        <!-- Compatibilità - SOLO MOBILE (sotto raccomandazioni) -->
        <div class="lt-md">
          <DrugCompatibilityList :analysis-results="analysisResults" />
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- SCIENTIFIC DOCUMENTATION (full-width)                        -->
    <!-- ============================================================ -->
    <div>
      <CompatibilityDocumentation />
    </div>
  </q-page>
</template>

<style scoped>
/* ============================================================ */
/* PAGE-SPECIFIC STYLES                                         */
/* ============================================================ */

/* Page title spacing */
h1 {
  margin-top: 0;
  margin-bottom: 8px;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .q-page {
    padding: 16px 8px;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
