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

// Componenti modulari (Page-based folder structure)
import DrugSelector from 'src/components/Compatibility/DrugSelector.vue';
import CompatibilityResults from 'src/components/Compatibility/CompatibilityResults.vue';
import LumenAllocator from 'src/components/Compatibility/LumenAllocator.vue';
import CompatibilityDocumentation from 'src/components/Compatibility/CompatibilityDocumentation.vue';

// Composable for multi-drug analysis
import { useDrugCompatibility } from 'src/composables/useDrugCompatibility';

// Types
import type { MultiDrugAnalysis } from 'src/types/DrugTypes';

// ============================================================
// COMPOSABLES
// ============================================================
const { analyzeMultipleDrugs } = useDrugCompatibility();

// ============================================================
// STATE
// ============================================================

/**
 * Selected drugs payload from DrugSelector component
 * Stores list of drug names for compatibility analysis
 */
const selectedDrugsPayload = ref<string[]>([]);

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
 * Triggers multi-drug compatibility analysis
 * @param drugs Array of selected drug names
 */
const handleDrugsSelected = (drugs: string[]): void => {
  console.log('[DrugCompatibilityPage] Drugs selected:', drugs);

  // Store selected drugs
  selectedDrugsPayload.value = drugs;

  // Trigger multi-drug analysis
  analysisResults.value = analyzeMultipleDrugs(drugs);

  console.log('[DrugCompatibilityPage] Analysis completed:', analysisResults.value);
};

/**
 * Handle selection cleared event from DrugSelector
 * Resets analysis results and selected drugs
 */
const handleSelectionCleared = (): void => {
  console.log('[DrugCompatibilityPage] Selection cleared');

  // Reset state
  selectedDrugsPayload.value = [];
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
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="Pharmacology" />
        <q-breadcrumbs-el label="Drug Compatibility" />
      </q-breadcrumbs>

      <!-- Page Title -->
      <h1 class="text-h4 text-weight-bold q-mb-xs">💊 Drug Compatibility Checker</h1>

      <!-- Page Subtitle -->
      <p class="text-subtitle1 text-grey-7">
        Analisi compatibilità IV farmaci + Ottimizzazione allocazione lumi CVC/PICC
      </p>
    </div>

    <!-- ============================================================ -->
    <!-- INFO BANNER                                                  -->
    <!-- ============================================================ -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-lg" rounded>
      <template #avatar>
        <q-icon name="info" color="blue-9" />
      </template>

      <div class="text-weight-medium">
        <strong>Sistema Avanzato Compatibilità Farmaci IV</strong>
      </div>

      <div class="q-mt-sm">
        <ul class="q-pl-md q-my-none">
          <li>
            <strong>Real-time Analysis:</strong> Analisi compatibilità 150+ farmaci IV da database
            Micromedex
          </li>
          <li>
            <strong>Lumen Optimization:</strong> Algoritmo greedy per ottimizzazione allocazione
            lumi CVC/PICC
          </li>
          <li>
            <strong>Y-site Protocols:</strong> Protocolli flush + Riferimenti scientifici
            (Trissel's, ASHP)
          </li>
        </ul>
      </div>
    </q-banner>

    <!-- ============================================================ -->
    <!-- MAIN LAYOUT: 2-COLUMN DESKTOP, STACKED MOBILE               -->
    <!-- ============================================================ -->
    <div class="row q-col-gutter-md q-mb-lg">
      <!-- LEFT COLUMN: DrugSelector (always full height) -->
      <div class="col-12 col-md-6">
        <DrugSelector
          calculate-button-text="🔍 Analizza Compatibilità"
          reset-button-text="🔄 Reset Selezione"
          title="Selezione Farmaci IV"
          @drugs-selected="handleDrugsSelected"
          @selection-cleared="handleSelectionCleared"
        />
      </div>

      <!-- RIGHT COLUMN: LumenAllocator + CompatibilityResults STACKED -->
      <div class="col-12 col-md-6">
        <!-- LumenAllocator (top of right column) -->
        <div class="q-mb-md">
          <LumenAllocator
            :selected-drugs="selectedDrugsPayload"
            :analysis-results="analysisResults"
            :available-lumens="3"
            @allocation-completed="
              (allocation) =>
                console.log('[DrugCompatibilityPage] Allocation completed:', allocation)
            "
            @insufficient-lumens="
              (deficit) =>
                console.log('[DrugCompatibilityPage] Insufficient lumens, deficit:', deficit)
            "
          />
        </div>

        <!-- CompatibilityResults (bottom of right column) -->
        <div>
          <CompatibilityResults :analysis-results="analysisResults" :show-recommendations="true" />
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
