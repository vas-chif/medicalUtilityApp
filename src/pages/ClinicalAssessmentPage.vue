<!-- ClinicalAssessmentPage.vue -->
<script setup lang="ts">
/**
 * @file ClinicalAssessmentPage.vue
 * @description Unified page for Clinical Assessment & Scoring Systems: APGAR, GCS, NEWS (link), SOFA (link)
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-11-13
 */

import { ref } from 'vue';
import APGARScoreCalculator from 'src/components/ClinicalAssessment/APGARScoreCalculator.vue';
import GCSCalculator from 'src/components/ClinicalAssessment/GCSCalculator.vue';
import NEWSScoreCalculator from 'src/components/ClinicalAssessment/NEWSScoreCalculator.vue';
import SOFAScoreCalculator from 'src/components/ClinicalAssessment/SOFAScoreCalculator.vue';

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
        Clinical assessment and scoring systems - Neonatology, Emergency Medicine, Intensive Care
      </p>

      <!-- Info Banner -->
      <q-banner class="bg-green-1 text-green-9 q-mt-md" rounded>
        <template v-slot:avatar>
          <q-icon name="info" color="green" />
        </template>
        <div class="text-body2">
          <strong>Scoring Systems:</strong> Validated tools for rapid and standardized clinical
          status assessment. Essential for triage, prognosis and monitoring.
        </div>
      </q-banner>
    </div>

    <!-- Tabs per i sistemi di scoring -->
    <q-card>
      <q-tabs
        v-model="activeTab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="apgar" icon="child_care" label="APGAR Score" />
        <q-tab name="gcs" icon="psychology" label="Glasgow Coma Scale" />
        <q-tab name="news" icon="emergency" label="NEWS Score" />
        <q-tab name="sofa" icon="medical_services" label="SOFA Score" />
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

        <!-- Tab NEWS Score -->
        <q-tab-panel name="news">
          <NEWSScoreCalculator />
        </q-tab-panel>

        <!-- Tab SOFA Score -->
        <q-tab-panel name="sofa">
          <SOFAScoreCalculator />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
