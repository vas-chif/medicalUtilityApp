<!-- IntensiveCareUtilityPage.vue -->
<script setup lang="ts">
/**
 * @file IntensiveCareUtilityPage.vue
 * @description Pagina unificata per i calcoli di Intensive Care: Mechanical Power e Quoziente Respiratorio
 * @author Vasile Chifeac
 * @created 2025-01-05
 * @modified 2025-11-05
 */

import { ref } from 'vue';
import QuozienteRespiratorioCalculator from 'src/components/QuozienteRespiratorioCalculator.vue';
import MechanicalPowerCalculator from 'src/components/MechanicalPowerCalculator.vue';

// Tab attivo
const activeTab = ref('quoziente');
</script>

<template>
  <q-page class="q-pa-md">
    <!-- Header con breadcrumb -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
        <q-breadcrumbs-el label="Ventilazione" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">🫁 Parametri di Ventilazione</h4>
      <p class="text-subtitle1 text-grey-7">
        Calcoli avanzati per monitoraggio ventilatorio e metabolico
      </p>
    </div>

    <!-- Tabs per le due calcolatrici -->
    <q-card>
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="quoziente" icon="biotech" label="Quoziente Respiratorio" />
        <q-tab name="mechanical" icon="settings_suggest" label="Mechanical Power" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <!-- Tab Quoziente Respiratorio -->
        <q-tab-panel name="quoziente">
          <QuozienteRespiratorioCalculator />
        </q-tab-panel>

        <!-- Tab Mechanical Power -->
        <q-tab-panel name="mechanical">
          <MechanicalPowerCalculator />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
