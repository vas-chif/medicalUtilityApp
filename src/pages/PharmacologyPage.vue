<!-- PharmacologyPage.vue -->

<script setup lang="ts">
/**
 * @file PharmacologyPage.vue
 * @description Unified pharmacology calculators orchestrator page with 3 integrated tools:
 *              1. Dosage Calculator - Weight-based & fixed dose with age/renal adjustments
 *              2. Drug Dilution - Concentration & volume calculations
 *              3. Infusion Rate - Bidirectional dose/flow rate converter
 *
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-01-XX (REFACTORED - Removed Drug Compatibility tab, now in dedicated page)
 *
 * @example
 * Route: /pharmacology
 * <PharmacologyPage />
 *
 * @notes
 * - BEFORE REFACTORING: 3379 lines (monolithic)
 * - AFTER REFACTORING: ~180 lines (orchestrator only, 3 tabs)
 * - Components extracted: DosageCalculator (1089 lines), DrugDilution (389 lines), InfusionRate (613 lines)
 * - Drug Compatibility removed: Now standalone page at /drug-compatibility (accessible from drawer & home)
 * - Total 3 tabs: Dosage, Dilution, Infusion Rate
 * - Pattern: § 🏗️ ARCHITETTURA COMPONENTI (REGOLE_COPILOT.md)
 * - Orchestrator responsibility: Layout, navigation, tab management, event handling
 * - NO business logic in Page - ALL in components
 *
 * @dependencies
 * - DosageCalculator.vue (src/components/Pharmacology/)
 * - DrugDilution.vue (src/components/Pharmacology/)
 * - InfusionRate.vue (src/components/Pharmacology/)
 *
 * @medical-references
 * - See individual components for detailed references
 */

// ============================================================
// IMPORTS
// ============================================================
import { ref } from 'vue';
import { useSecureLogger } from 'src/composables/useSecureLogger';

// Components
import DosageCalculator from 'src/components/Pharmacology/DosageCalculator.vue';
import DrugDilution from 'src/components/Pharmacology/DrugDilution.vue';
import InfusionRate from 'src/components/Pharmacology/InfusionRate.vue';

// ============================================================
// COMPOSABLES
// ============================================================
const { logger } = useSecureLogger();

// ============================================================
// STATE
// ============================================================

/** Currently active tab */
const activeTab = ref<string>('dosage');

// ============================================================
// EVENT HANDLERS
// ============================================================

/**
 * Handle Dosage Calculator calculated event
 */
const handleDosageCalculated = (payload: {
  totalDose: number;
  dailyDose: number;
  drugName: string;
}) => {
  logger.info('Dosage calculated', payload);
  // Future: Add analytics tracking, Firebase logging, etc.
};

/**
 * Handle Drug Dilution calculated event
 */
const handleDilutionCalculated = (payload: {
  finalConcentration: number;
  volumeToWithdraw: number;
  dilutionRatio: string;
}) => {
  logger.info('Dilution calculated', payload);
};

/**
 * Handle Infusion Rate calculated event
 */
const handleInfusionCalculated = (payload: {
  dose: number;
  doseUnit: string;
  flowRate: number;
  direction: string;
}) => {
  logger.info('Infusion rate calculated', payload);
};
</script>

<template>
  <q-page class="q-pa-md">
    <!-- ============================================================ -->
    <!-- PAGE HEADER - Breadcrumbs & Title                            -->
    <!-- ============================================================ -->
    <div class="q-mb-md">
      <div class="text-h4 text-primary q-mb-sm">💊 Pharmacology Calculators</div>
      <p class="text-body2 text-grey-7">
        Strumenti professionali per calcolo dosi, compatibilità farmaci, diluizioni e velocità
        infusione
      </p>
    </div>

    <!-- Tabs Navigation -->
    <q-card>
      <q-tabs
        v-model="activeTab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="dosage" icon="calculate" label="Dosage" />
        <q-tab name="dilution" icon="opacity" label="Dilution" />
        <q-tab name="infusion" icon="speed" label="Infusion Rate" />
      </q-tabs>

      <q-separator />

      <!-- Tab Panels -->
      <q-tab-panels v-model="activeTab" animated>
        <!-- ========================================================== -->
        <!-- TAB 1: DOSAGE CALCULATOR (Component)                       -->
        <!-- ========================================================== -->
        <q-tab-panel name="dosage">
          <DosageCalculator @calculated="handleDosageCalculated" />
        </q-tab-panel>

        <!-- ========================================================== -->
        <!-- TAB 3: DRUG DILUTION (Component)                           -->
        <!-- ========================================================== -->
        <q-tab-panel name="dilution">
          <DrugDilution @calculated="handleDilutionCalculated" />
        </q-tab-panel>

        <!-- ========================================================== -->
        <!-- TAB 4: INFUSION RATE (Component)                           -->
        <!-- ========================================================== -->
        <q-tab-panel name="infusion">
          <InfusionRate @calculated="handleInfusionCalculated" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<style scoped lang="scss">
.drugs-list {
  .drug-item {
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
}
</style>
