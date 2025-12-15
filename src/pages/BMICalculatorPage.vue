<!-- BMICalculatorPage.vue -->
<script setup lang="ts">
/**
 * @file BMICalculatorPage.vue
 * @description BMI & Body Composition Calculator Page - Orchestrator per 4 calcolatori antropometrici
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-11-16
 *
 * @example
 * Route: /bmi-calculator
 * <BMICalculatorPage />
 *
 * @notes
 * - Page orchestrator con pattern § 🏗️ ARCHITETTURA COMPONENTI
 * - 4 tabs: BMI, BSA, IBW, ABW
 * - Componenti estratti in src/components/BMI/
 * - Refactoring architetturale: 2592 → 180 righe Page + 4 componenti modulari
 *
 * @dependencies
 * - BMICalculator.vue: BMI Calculator con WHO classification
 * - BSACalculator.vue: Body Surface Area (3 formule)
 * - IBWCalculator.vue: Ideal Body Weight (3 formule)
 * - ABWCalculator.vue: Adjusted Body Weight (25% correction)
 */

// ============================================================
// IMPORTS
// ============================================================
import { ref } from 'vue';

// Componenti BMI modulari
import BMICalculator from 'src/components/BMI/BMICalculator.vue';
import BSACalculator from 'src/components/BMI/BSACalculator.vue';
import IBWCalculator from 'src/components/BMI/IBWCalculator.vue';
import ABWCalculator from 'src/components/BMI/ABWCalculator.vue';

// ============================================================
// STATE
// ============================================================

/** Currently active tab */
const activeTab = ref<string>('bmi');
</script>

<template>
  <!-- ============================================================ -->
  <!-- BMI CALCULATOR PAGE - MAIN CONTAINER                         -->
  <!-- 4 Integrated Anthropometric Calculators                      -->
  <!-- ============================================================ -->
  <q-page class="q-pa-md">
    <!-- ============================================================ -->
    <!-- PAGE HEADER - Breadcrumbs & Title                            -->
    <!-- ============================================================ -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer icon-home" />
        <q-breadcrumbs-el label="BMI & Body Composition" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">⚖️ BMI & Body Composition Calculator</h4>
      <p class="text-subtitle1 text-grey-7">
        Calcolo BMI, BSA, IBW e ABW per valutazione antropometrica completa
      </p>
    </div>

    <!-- ============================================================ -->
    <!-- INFORMATION BANNER - 4 Calculators Overview                  -->
    <!-- ============================================================ -->
    <q-banner class="bg-blue-1 q-mb-md" rounded>
      <template v-slot:avatar>
        <q-icon name="info" color="primary" />
      </template>
      <div class="text-body2">
        <strong>4 Calcolatori Antropometrici Professionali:</strong>
        <ul class="q-ma-sm q-pl-md">
          <li><strong>BMI:</strong> Body Mass Index (WHO classification)</li>
          <li><strong>BSA:</strong> Body Surface Area (3 formule per chemioterapia/cardiologia)</li>
          <li><strong>IBW:</strong> Ideal Body Weight (3 formule per nutrizione/ventilazione)</li>
          <li><strong>ABW:</strong> Adjusted Body Weight (gestione obesità farmacologica)</li>
        </ul>
      </div>
    </q-banner>

    <!-- ============================================================ -->
    <!-- TAB NAVIGATION SYSTEM - 4 Calculator Tabs                    -->
    <!-- ============================================================ -->
    <q-tabs
      v-model="activeTab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="bmi" icon="calculate" label="BMI" />
      <q-tab name="bsa" icon="functions" label="BSA" />
      <q-tab name="ibw" icon="straighten" label="IBW" />
      <q-tab name="abw" icon="balance" label="ABW" />
    </q-tabs>

    <q-separator />

    <!-- ============================================================ -->
    <!-- TAB PANELS - 4 Calculator Components                         -->
    <!-- ============================================================ -->
    <q-tab-panels v-model="activeTab" animated>
      <!-- TAB 1: BMI Calculator -->
      <q-tab-panel name="bmi">
        <BMICalculator />
      </q-tab-panel>

      <!-- TAB 2: BSA Calculator -->
      <q-tab-panel name="bsa">
        <BSACalculator />
      </q-tab-panel>

      <!-- TAB 3: IBW Calculator -->
      <q-tab-panel name="ibw">
        <IBWCalculator />
      </q-tab-panel>

      <!-- TAB 4: ABW Calculator -->
      <q-tab-panel name="abw">
        <ABWCalculator />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style scoped>
/* ============================================================ */
/* PAGE-SPECIFIC STYLES                                         */
/* ============================================================ */

/* Mobile responsiveness */
@media (max-width: 768px) {
  .q-page {
    padding: 12px;
  }
}
</style>
