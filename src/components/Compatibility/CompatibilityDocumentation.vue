<script setup lang="ts">
/**
 * @file CompatibilityDocumentation.vue
 * @description Drug Compatibility Scientific Documentation Wrapper - Static content display
 * @author Vasile Chifeac
 * @created 2025-11-21
 * @modified 2025-11-21
 * @example
 * // Usage in DrugCompatibilityPage.vue
 * import CompatibilityDocumentation from 'src/components/Compatibility/CompatibilityDocumentation.vue';
 *
 * <CompatibilityDocumentation />
 * @notes
 * - Pattern § 🏗️ ARCHITETTURA COMPONENTI
 * - MINIMAL wrapper component (no Props, no Emits, no business logic)
 * - Pure documentation display using MedicalDocumentationSection
 * - Static content only (9 NEWS-style sections on IV compatibility)
 * - Reusable scientific documentation for drug compatibility analysis
 * @dependencies
 * - MedicalDocumentationSection.vue (reusable 9-section template)
 */

// ============================================================
// IMPORTS
// ============================================================
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { MedicalSections } from 'src/components/Common/MedicalDocumentationSection.vue';

// ============================================================
// STATE
// ============================================================

const { t } = useI18n();

/**
 * Active tab name for vertical tabs
 */
const activeTab = ref<string>('definizione');

// ============================================================
// NO PROPS (static component)
// ============================================================

// ============================================================
// NO EMITS (display-only component)
// ============================================================

// ============================================================
// DOCUMENTATION (9 sections NEWS-style)
// ============================================================

/**
 * Drug compatibility scientific documentation
 * Comprehensive guide to IV drug compatibility analysis
 * Pattern: 9 sections NEWS-style (STYLE_REFACTOR_TRACKING.md)
 */
const compatibilityDocs = computed<MedicalSections>(() => ({
  definizione: {
    title: t('drugCompatibilityDocs.sections.definizione.title'),
    content: t('drugCompatibilityDocs.sections.definizione.content'),
  },
  fisiologia: {
    title: t('drugCompatibilityDocs.sections.fisiologia.title'),
    content: t('drugCompatibilityDocs.sections.fisiologia.content'),
  },
  misurazione: {
    title: t('drugCompatibilityDocs.sections.misurazione.title'),
    content: t('drugCompatibilityDocs.sections.misurazione.content'),
  },
  formula: {
    title: t('drugCompatibilityDocs.sections.formula.title'),
    content: t('drugCompatibilityDocs.sections.formula.content'),
  },
  interpretazione: {
    title: t('drugCompatibilityDocs.sections.interpretazione.title'),
    content: t('drugCompatibilityDocs.sections.interpretazione.content'),
  },
  applicazioni: {
    title: t('drugCompatibilityDocs.sections.applicazioni.title'),
    content: t('drugCompatibilityDocs.sections.applicazioni.content'),
  },
  valoriRiferimento: {
    title: t('drugCompatibilityDocs.sections.valoriRiferimento.title'),
    content: t('drugCompatibilityDocs.sections.valoriRiferimento.content'),
  },
  documentazione: {
    title: t('drugCompatibilityDocs.sections.documentazione.title'),
    content: t('drugCompatibilityDocs.sections.documentazione.content'),
  },
  riferimentiScientifici: {
    title: t('drugCompatibilityDocs.sections.riferimentiScientifici.title'),
    content: t('drugCompatibilityDocs.sections.riferimentiScientifici.content'),
  },
}));
</script>

<template>
  <!-- ============================================================ -->
  <!-- COMPATIBILITY DOCUMENTATION - VERTICAL TABS LAYOUT           -->
  <!-- ============================================================ -->
  <q-card flat bordered class="compatibility-documentation-container" style="min-width: 100%">
    <!-- Card Header -->
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ t('drugCompatibilityDocs.title') }}</div>
      <div class="text-caption">
        9 Sezioni NEWS-style: Definizione, Fisiologia, Protocolli Y-Site, Scoring, Interpretazione,
        Applicazioni, Stabilità, Database, Riferimenti
      </div>
    </q-card-section>

    <!-- Tabs + Content Layout -->
    <q-card-section class="q-pa-none">
      <!-- DESKTOP: Vertical Tabs Layout (≥768px) -->
      <div class="row no-wrap gt-sm">
        <!-- LEFT SIDEBAR: Vertical Tabs -->
        <div class="col-auto">
          <q-tabs
            v-model="activeTab"
            vertical
            class="text-primary vertical-tabs"
            active-color="primary"
            indicator-color="primary"
            align="left"
          >
            <q-tab name="definizione" icon="description" :label="t('drugCompatibilityDocs.tabs.definizione')" />
            <q-tab name="fisiologia" icon="science" :label="t('drugCompatibilityDocs.tabs.fisiologia')" />
            <q-tab name="misurazione" icon="biotech" :label="t('drugCompatibilityDocs.tabs.misurazione')" />
            <q-tab name="formula" icon="functions" :label="t('drugCompatibilityDocs.tabs.formula')" />
            <q-tab name="interpretazione" icon="warning" :label="t('drugCompatibilityDocs.tabs.interpretazione')" />
            <q-tab name="applicazioni" icon="local_hospital" :label="t('drugCompatibilityDocs.tabs.applicazioni')" />
            <q-tab name="valoriRiferimento" icon="schedule" :label="t('drugCompatibilityDocs.tabs.valoriRiferimento')" />
            <q-tab name="documentazione" icon="public" :label="t('drugCompatibilityDocs.tabs.documentazione')" />
            <q-tab name="riferimentiScientifici" icon="menu_book" :label="t('drugCompatibilityDocs.tabs.riferimentiScientifici')" />
          </q-tabs>
        </div>

        <!-- RIGHT CONTENT: Tab Panels -->
        <div class="col">
          <q-tab-panels v-model="activeTab" animated class="tab-panels-content">
            <!-- Panel 1: Definizione -->
            <q-tab-panel name="definizione">
              <div class="text-h6 text-primary q-mb-md">
                {{ compatibilityDocs.definizione.title }}
              </div>
              <div v-html="compatibilityDocs.definizione.content"></div>
            </q-tab-panel>

            <!-- Panel 2: Fisiologia -->
            <q-tab-panel name="fisiologia">
              <div class="text-h6 text-primary q-mb-md">
                {{ compatibilityDocs.fisiologia.title }}
              </div>
              <div v-html="compatibilityDocs.fisiologia.content"></div>
            </q-tab-panel>

            <!-- Panel 3: Protocolli Y-Site -->
            <q-tab-panel name="misurazione">
              <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.misurazione.title }}</div>
              <div v-html="compatibilityDocs.misurazione.content"></div>
            </q-tab-panel>

            <!-- Panel 4: Scoring System -->
            <q-tab-panel name="formula">
              <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.formula.title }}</div>
              <div v-html="compatibilityDocs.formula.content"></div>
            </q-tab-panel>

            <!-- Panel 5: Interpretazione -->
            <q-tab-panel name="interpretazione">
              <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.interpretazione.title }}</div>
              <div v-html="compatibilityDocs.interpretazione.content"></div>
            </q-tab-panel>

            <!-- Panel 6: Applicazioni -->
            <q-tab-panel name="applicazioni">
              <div class="text-h6 text-primary q-mb-md">
                {{ compatibilityDocs.applicazioni.title }}
              </div>
              <div v-html="compatibilityDocs.applicazioni.content"></div>
            </q-tab-panel>

            <!-- Panel 7: Stabilità -->
            <q-tab-panel name="valoriRiferimento">
              <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.valoriRiferimento.title }}</div>
              <div v-html="compatibilityDocs.valoriRiferimento.content"></div>
            </q-tab-panel>

            <!-- Panel 8: Database -->
            <q-tab-panel name="documentazione">
              <div class="text-h6 text-primary q-mb-md">
                {{ compatibilityDocs.documentazione.title }}
              </div>
              <div v-html="compatibilityDocs.documentazione.content"></div>
            </q-tab-panel>

            <!-- Panel 9: Riferimenti -->
            <q-tab-panel name="riferimentiScientifici">
              <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.riferimentiScientifici.title }}</div>
              <div v-html="compatibilityDocs.riferimentiScientifici.content"></div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>

      <!-- MOBILE: Horizontal Tabs Layout (<768px) -->
      <div class="lt-md">
        <!-- TOP: Horizontal Scrollable Tabs -->
        <q-tabs
          v-model="activeTab"
          class="text-primary bg-grey-2"
          active-color="primary"
          indicator-color="primary"
          align="left"
          dense
          inline-label
          mobile-arrows
        >
          <q-tab name="definizione" icon="description" :label="t('drugCompatibilityDocs.tabsShort.definizione')" />
          <q-tab name="fisiologia" icon="science" :label="t('drugCompatibilityDocs.tabsShort.fisiologia')" />
          <q-tab name="misurazione" icon="biotech" :label="t('drugCompatibilityDocs.tabsShort.misurazione')" />
          <q-tab name="formula" icon="functions" :label="t('drugCompatibilityDocs.tabsShort.formula')" />
          <q-tab name="interpretazione" icon="warning" :label="t('drugCompatibilityDocs.tabsShort.interpretazione')" />
          <q-tab name="applicazioni" icon="local_hospital" :label="t('drugCompatibilityDocs.tabsShort.applicazioni')" />
          <q-tab name="valoriRiferimento" icon="schedule" :label="t('drugCompatibilityDocs.tabsShort.valoriRiferimento')" />
          <q-tab name="documentazione" icon="public" :label="t('drugCompatibilityDocs.tabsShort.documentazione')" />
          <q-tab name="riferimentiScientifici" icon="menu_book" :label="t('drugCompatibilityDocs.tabsShort.riferimentiScientifici')" />
        </q-tabs>

        <!-- BOTTOM: Tab Panels Content -->
        <q-tab-panels v-model="activeTab" animated class="tab-panels-content">
          <!-- Panel 1: Definizione -->
          <q-tab-panel name="definizione">
            <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.definizione.title }}</div>
            <div v-html="compatibilityDocs.definizione.content"></div>
          </q-tab-panel>

          <!-- Panel 2: Fisiologia -->
          <q-tab-panel name="fisiologia">
            <div class="text-h6 text-primary q-mb-md">
              {{ compatibilityDocs.fisiologia.title }}
            </div>
            <div v-html="compatibilityDocs.fisiologia.content"></div>
          </q-tab-panel>

          <!-- Panel 3: Protocolli Y-Site -->
          <q-tab-panel name="misurazione">
            <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.misurazione.title }}</div>
            <div v-html="compatibilityDocs.misurazione.content"></div>
          </q-tab-panel>

          <!-- Panel 4: Scoring System -->
          <q-tab-panel name="formula">
            <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.formula.title }}</div>
            <div v-html="compatibilityDocs.formula.content"></div>
          </q-tab-panel>

          <!-- Panel 5: Interpretazione -->
          <q-tab-panel name="interpretazione">
            <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.interpretazione.title }}</div>
            <div v-html="compatibilityDocs.interpretazione.content"></div>
          </q-tab-panel>

          <!-- Panel 6: Applicazioni -->
          <q-tab-panel name="applicazioni">
            <div class="text-h6 text-primary q-mb-md">
              {{ compatibilityDocs.applicazioni.title }}
            </div>
            <div v-html="compatibilityDocs.applicazioni.content"></div>
          </q-tab-panel>

          <!-- Panel 7: Stabilità -->
          <q-tab-panel name="valoriRiferimento">
            <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.valoriRiferimento.title }}</div>
            <div v-html="compatibilityDocs.valoriRiferimento.content"></div>
          </q-tab-panel>

          <!-- Panel 8: Database -->
          <q-tab-panel name="documentazione">
            <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.documentazione.title }}</div>
            <div v-html="compatibilityDocs.documentazione.content"></div>
          </q-tab-panel>

          <!-- Panel 9: Riferimenti -->
          <q-tab-panel name="riferimentiScientifici">
            <div class="text-h6 text-primary q-mb-md">{{ compatibilityDocs.riferimentiScientifici.title }}</div>
            <div v-html="compatibilityDocs.riferimentiScientifici.content"></div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

.compatibility-documentation-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* DESKTOP: Vertical Tabs Sidebar (≥768px) */
.vertical-tabs {
  min-width: 200px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

/* Tab Panels Content */
.tab-panels-content {
  background: transparent;
}

/* MOBILE: Horizontal Tabs (<768px) */
@media (max-width: 767px) {
  .compatibility-documentation-container {
    padding: 0;
  }

  /* Hide desktop vertical tabs on mobile */
  .gt-sm {
    display: none !important;
  }

  /* Show mobile horizontal tabs */
  .lt-md {
    display: block !important;
  }
}

/* DESKTOP: Hide mobile tabs (≥768px) */
@media (min-width: 768px) {
  .lt-md {
    display: none !important;
  }
}
</style>
