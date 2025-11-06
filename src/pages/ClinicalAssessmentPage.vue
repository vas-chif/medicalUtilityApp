<!-- ClinicalAssessmentPage.vue -->
<script setup lang="ts">
/**
 * @file ClinicalAssessmentPage.vue
 * @description Pagina unificata per Clinical Assessment & Scoring: APGAR, GCS, NEWS, SOFA
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-11-06
 */

import { ref } from 'vue';
import APGARScoreCalculator from 'src/components/APGARScoreCalculator.vue';
import GCSCalculator from 'src/components/GCSCalculator.vue';

// Tab attivo
const activeTab = ref('apgar');
</script>

<template>
  <q-page class="q-pa-md">
    <!-- Header con breadcrumb -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
        <q-breadcrumbs-el label="Clinical Assessment" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">
        <q-icon name="assignment" class="q-mr-sm" />
        Clinical Assessment & Scoring
      </h4>
      <p class="text-subtitle1 text-grey-7">
        Sistemi di valutazione clinica e scoring - Neonatologia, Emergenze, Terapia Intensiva
      </p>

      <!-- Info Banner -->
      <q-banner class="bg-green-1 text-green-9 q-mt-md" rounded dense>
        <template v-slot:avatar>
          <q-icon name="info" color="green" />
        </template>
        <div class="text-body2">
          <strong>Scoring Systems:</strong> Strumenti validati per la valutazione rapida e 
          standardizzata dello stato clinico. Essenziali per triage, prognosi e monitoraggio.
        </div>
      </q-banner>
    </div>

    <!-- Tabs per i sistemi di scoring -->
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
        <q-tab name="apgar" icon="child_care" label="APGAR Score" />
        <q-tab name="gcs" icon="psychology" label="Glasgow Coma Scale" />
        <q-tab name="news" icon="emergency" label="NEWS Score" disabled>
          <q-tooltip>In arrivo</q-tooltip>
        </q-tab>
        <q-tab name="sofa" icon="medical_services" label="SOFA Score" disabled>
          <q-tooltip>In arrivo</q-tooltip>
        </q-tab>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <!-- Tab APGAR Score -->
        <q-tab-panel name="apgar">
          <APGARScoreCalculator />
        </q-tab-panel>

        <!-- Tab GCS -->
        <q-tab-panel name="gcs">
          <GCSCalculator />
        </q-tab-panel>

        <!-- Tab NEWS (placeholder) -->
        <q-tab-panel name="news">
          <div class="q-pa-md text-center text-grey-6">
            <q-icon name="construction" size="xl" class="q-mb-md" />
            <div class="text-h6">National Early Warning Score</div>
            <div class="text-body2">Prossimamente disponibile</div>
          </div>
        </q-tab-panel>

        <!-- Tab SOFA (placeholder) -->
        <q-tab-panel name="sofa">
          <div class="q-pa-md text-center text-grey-6">
            <q-icon name="construction" size="xl" class="q-mb-md" />
            <div class="text-h6">Sequential Organ Failure Assessment</div>
            <div class="text-body2">Prossimamente disponibile</div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
