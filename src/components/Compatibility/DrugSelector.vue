<script setup lang="ts">
/**
 * @file DrugSelector.vue
 * @description Drug search & multi-selection component for IV compatibility analysis
 * @author Vasile Chifeac
 * @created 2025-11-17
 * @modified 2025-11-17
 *
 * @example
 * // Usage in DrugCompatibilityPage.vue
 * import DrugSelector from 'src/components/Compatibility/DrugSelector.vue';
 * // Template usage (see DrugCompatibilityPage.vue for full example)
 *
 * @notes
 * - Extracted from DrugCompatibilityPage.vue (lines 133-227)
 * - Component pattern § 🏗️ ARCHITETTURA COMPONENTI
 * - Uses MedicalDocumentationSection for NEWS-style docs
 * - Business logic: drug search, multi-selection, validation
 * - Size: ~350 lines (business logic + UI + docs)
 *
 * @dependencies
 * - useDrugCompatibility composable: Drug database access, filtering, selection state
 * - MedicalDocumentationSection.vue: Reusable 9-section NEWS-style documentation template
 */

// ============================================================
// IMPORTS
// ============================================================
// import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDrugCompatibility } from 'src/composables/useDrugCompatibility';
import { useDrugCompatibilityStore } from 'src/stores/drug-compatibility-store';

// ============================================================
// PROPS & EMITS
// ============================================================

/**
 * Component props interface
 */
interface Props {
  /** Button text for analyze action (i18n-ready) */
  calculateButtonText?: string;
  /** Button text for reset action (i18n-ready) */
  resetButtonText?: string;
  /** Section title (i18n-ready) */
  title?: string;
}

withDefaults(defineProps<Props>(), {
  calculateButtonText: 'Analizza Compatibilità',
  resetButtonText: 'Pulisci Selezione',
  title: '🔍 Seleziona Farmaci',
});

/**
 * Component events interface
 */
interface Emits {
  /** Emitted when user clicks analyze with selected drugs */
  (event: 'drugs-selected', drugs: string[]): void;
  /** Emitted when user clears selection */
  (event: 'selection-cleared'): void;
}

const emit = defineEmits<Emits>();

// ============================================================
// COMPOSABLES
// ============================================================

/**
 * Drug compatibility composable
 * Provides: drug database, search, filtering
 */
const { filteredDrugs, searchQuery, isLoading, getCategoryIcon } = useDrugCompatibility();

/**
 * Drug compatibility store (Pinia)
 * Provides: selectedDrugs (sorted alphabetically), add/remove with auto-reload
 * GARANTISCE DETERMINISMO: Ordine alfabetico → stessi farmaci = stesso risultato
 */
const compatibilityStore = useDrugCompatibilityStore();
const { addDrug, removeDrug } = compatibilityStore;
// storeToRefs per reactive destructuring di computed
const { sortedDrugs } = storeToRefs(compatibilityStore);
const selectedDrugs = sortedDrugs; // ComputedRef<string[]>

// ============================================================
// FUNCTIONS
// ============================================================

/**
 * Handle analyze button click
 * Emits drugs-selected event with selected drugs array (sorted)
 */
const handleAnalyze = (): void => {
  emit('drugs-selected', selectedDrugs.value); // computed ref → usa .value
};

/**
 * Handle clear selection button click
 * Clears all selected drugs via store reset and emits selection-cleared event
 */
const handleClear = (): void => {
  compatibilityStore.resetStore();
  emit('selection-cleared');
};
</script>

<template>
  <div class="drug-selector-container" style="min-width: 100%">
    <!-- =========================================================%=== -->
    <!-- BUSINESS LOGIC UI - Drug Search & Multi-Selection           -->
    <!-- ============================================================ -->
    <q-card class="medical-input-card">
      <q-card-section>
        <!-- Section Title -->
        <h6 class="text-h6 q-ma-none q-mb-md medical-section-title">{{ title }}</h6>

        <!-- Search Bar -->
        <q-input
          v-model="searchQuery"
          placeholder="Cerca farmaco..."
          outlined
          dense
          clearable
          class="q-mb-md"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="primary" />
          </template>
        </q-input>

        <!-- Available Drugs List (Scrollable) -->
        <div class="drugs-list q-mb-md">
          <q-list bordered separator>
            <q-item
              v-for="drug in filteredDrugs"
              :key="drug.id"
              clickable
              @click="addDrug(drug.name)"
              :disable="selectedDrugs.includes(drug.name)"
              class="drug-item"
            >
              <q-item-section avatar>
                <q-icon :name="getCategoryIcon(drug.category)" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ drug.name }}</q-item-label>
                <q-item-label caption>{{ drug.activeIngredient }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-chip
                  size="sm"
                  :color="selectedDrugs.includes(drug.name) ? 'positive' : 'grey-3'"
                  :text-color="selectedDrugs.includes(drug.name) ? 'white' : 'grey-7'"
                >
                  {{ selectedDrugs.includes(drug.name) ? 'Selezionato' : 'Aggiungi' }}
                </q-chip>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Selected Drugs Chips -->
        <div v-if="selectedDrugs.length > 0" class="selected-drugs q-mb-md">
          <div class="text-subtitle2 text-primary q-mb-sm">
            📋 Farmaci selezionati ({{ selectedDrugs.length }}):
          </div>
          <div class="row q-gutter-sm">
            <q-chip
              v-for="drug in selectedDrugs"
              :key="drug"
              removable
              @remove="removeDrug(drug)"
              color="primary"
              text-color="white"
              icon="medication"
            >
              {{ drug }}
            </q-chip>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="row q-gutter-sm">
          <q-btn
            @click="handleAnalyze"
            color="primary"
            size="lg"
            class="col medical-calculate-btn"
            icon="analytics"
            :disable="selectedDrugs.length < 2"
            :loading="isLoading"
          >
            {{ calculateButtonText }}
          </q-btn>
          <q-btn
            @click="handleClear"
            color="negative"
            outline
            size="lg"
            icon="clear"
            :disable="selectedDrugs.length === 0"
          >
            {{ resetButtonText }}
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

.drug-selector-container {
  width: 100%;
}

/* Scrollable drugs list */
.drugs-list {
  max-height: 400px;
  overflow-y: auto;
}

/* Drug item hover effect */
.drug-item:hover {
  background-color: rgba(25, 118, 210, 0.04);
}

/* Selected drugs section */
.selected-drugs {
  padding: 12px;
  background-color: rgba(25, 118, 210, 0.08);
  border-radius: 8px;
}

/* Medical section title */
.medical-section-title {
  color: var(--q-primary);
  font-weight: 600;
}

/* Medical calculate button */
.medical-calculate-btn {
  font-weight: 600;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .drugs-list {
    max-height: 300px;
  }

  .row.q-gutter-sm {
    flex-direction: column;
  }

  .medical-calculate-btn {
    width: 100%;
  }
}
</style>
