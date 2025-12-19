<script setup lang="ts">
/**
 * @file AboutPage.vue
 * @description About page for Medical Utility Pro
 *              Pattern § 🏗️ ARCHITETTURA COMPONENTI (REGOLE_COPILOT.md lines 287-443)
 *              Page as orchestrator - Static content
 * @author Vasile Chifeac
 * @created 2025-12-19
 */

// ============================================================
// IMPORTS
// ============================================================
import { useI18n } from 'vue-i18n';

// ============================================================
// COMPOSABLES
// ============================================================
const { t } = useI18n();

// ============================================================
// CONSTANTS
// ============================================================
const APP_VERSION = '2.3.0'; // Should match package.json
const LAST_UPDATE = '2025-12-19';
</script>

<template>
  <q-page padding>
    <!-- ============================================================ -->
    <!-- PAGE HEADER                                                  -->
    <!-- ============================================================ -->
    <div class="q-mb-lg text-center">
      <q-avatar size="100px" class="q-mb-md shadow-2">
        <img src="icons/favicon-128x128.png" alt="Medical Utility Pro Logo" />
      </q-avatar>
      <h1 class="text-h4 text-weight-bold q-mb-xs text-primary">{{ t('aboutPage.title') }}</h1>
      <p class="text-subtitle1 text-grey-7">
        {{ t('aboutPage.subtitle') }}
      </p>
      <q-badge color="primary" outline class="q-mt-sm"> v{{ APP_VERSION }} </q-badge>
    </div>

    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <!-- ============================================================ -->
        <!-- MISSION SECTION                                              -->
        <!-- ============================================================ -->
        <q-card class="q-mb-md shadow-1">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-sm">
              <q-icon name="rocket" size="sm" class="q-mr-sm" />
              {{ t('aboutPage.sections.mission.title') }}
            </div>
            <p class="text-body1">
              {{ t('aboutPage.sections.mission.content') }}
            </p>
          </q-card-section>
        </q-card>

        <!-- ============================================================ -->
        <!-- FEATURES SECTION                                             -->
        <!-- ============================================================ -->
        <q-card class="q-mb-md shadow-1">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-sm">
              <q-icon name="star" size="sm" class="q-mr-sm" />
              {{ t('aboutPage.sections.features.title') }}
            </div>
            <q-list dense>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="devices" color="secondary" />
                </q-item-section>
                <q-item-section>
                  {{ t('aboutPage.sections.features.list.offline') }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="verified" color="secondary" />
                </q-item-section>
                <q-item-section>
                  {{ t('aboutPage.sections.features.list.validated') }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="security" color="secondary" />
                </q-item-section>
                <q-item-section>
                  {{ t('aboutPage.sections.features.list.secure') }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="accessibility_new" color="secondary" />
                </q-item-section>
                <q-item-section>
                  {{ t('aboutPage.sections.features.list.accessible') }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <!-- ============================================================ -->
        <!-- DISCLAIMER SECTION                                           -->
        <!-- ============================================================ -->
        <q-card class="q-mb-md bg-amber-1 text-amber-10 shadow-1" flat bordered>
          <q-card-section>
            <div class="text-h6 q-mb-sm">
              <q-icon name="warning" size="sm" class="q-mr-sm" />
              {{ t('aboutPage.sections.disclaimer.title') }}
            </div>
            <p class="text-body2 text-weight-medium">
              {{ t('aboutPage.sections.disclaimer.content') }}
            </p>
          </q-card-section>
        </q-card>

        <!-- ============================================================ -->
        <!-- FOOTER INFO                                                  -->
        <!-- ============================================================ -->
        <div class="text-center text-grey-6 q-mt-xl">
          <p class="q-mb-xs">{{ t('aboutPage.lastUpdate') }}: {{ LAST_UPDATE }}</p>
          <p class="text-caption">&copy; 2025 Medical Utility Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
h1 {
  margin-top: 0;
  line-height: 1.2;
}
</style>
