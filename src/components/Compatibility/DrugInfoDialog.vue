<script setup lang="ts">
/**
 * @file DrugInfoDialog.vue
 * @description Dialog modale per visualizzazione informazioni dettagliate farmaco BILINGUE
 *
 * FEATURES:
 * - 8 tab BILINGUE: Dosaggio, Controindicazioni, Effetti Collaterali, Interazioni, Note Cliniche, Stabilità, Compatibilità, Riferimenti
 * - Locale switcher (🇮🇹/🇬🇧) per cambio lingua
 * - Data source: public/data/drugs/info/{drugId}.json
 * - BilingualText rendering automatico via composable
 * - Loading state + error handling
 * - Responsive design (mobile/desktop)
 *
 * PATTERN:
 * - Props: drugId, modelValue (v-model dialog), locale (default 'it')
 * - Emits: update:modelValue, drug-selected
 * - Composable: useDrugDatabase per caricamento dati
 */

// ============================================================
// IMPORTS
// ============================================================
import { ref, computed, watch } from 'vue';
import type { BrochureData } from 'src/types/DrugTypes';
import type { LocaleType } from 'src/composables/useDrugDatabase';

// ============================================================
// PROPS & EMITS
// ============================================================
interface Props {
  /** ID farmaco da visualizzare */
  drugId: string;
  /** v-model per dialog visibility */
  modelValue: boolean;
  /** Locale iniziale (default: 'it') */
  locale?: LocaleType;
}

const props = withDefaults(defineProps<Props>(), {
  locale: 'it',
});

interface Emits {
  /** Emesso quando dialog viene chiuso/aperto */
  (event: 'update:modelValue', value: boolean): void;
  /** Emesso quando utente seleziona un farmaco correlato */
  (event: 'drug-selected', drugId: string): void;
}

const emit = defineEmits<Emits>();

// ============================================================
// STATE
// ============================================================
/** Locale corrente (può essere switchato dall'utente) */
const currentLocale = ref<LocaleType>(props.locale);

/** Tab attivo (default: dosage) */
const activeTab = ref<string>('dosage');

/** Dati brochure farmaco */
const drugInfo = ref<BrochureData | null>(null);

/** Loading state */
const isLoading = ref<boolean>(false);

/** Error state */
const loadError = ref<string | null>(null);

// ============================================================
// COMPUTED
// ============================================================
/**
 * Computed v-model per dialog
 */
const showDialog = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

/**
 * Icona locale switcher
 */
const localeIcon = computed(() => {
  return currentLocale.value === 'it' ? '🇮🇹' : '🇬🇧';
});

/**
 * Label locale switcher
 */
const localeLabel = computed(() => {
  return currentLocale.value === 'it' ? 'Italiano' : 'English';
});

/**
 * Helper: Estrae testo BilingualText nel locale corrente
 */
const getText = (field: { it: string; en: string } | undefined): string => {
  if (!field) return '';
  const locale = currentLocale.value as 'it' | 'en';
  return field[locale] || field.it || field.en || '';
};

/**
 * Helper: Estrae array BilingualArray nel locale corrente
 */
const getArray = (field: { it: string[]; en: string[] } | undefined): string[] => {
  if (!field) return [];
  const locale = currentLocale.value as 'it' | 'en';
  return field[locale] || field.it || field.en || [];
};

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Carica dati brochure farmaco da JSON
 */
const loadDrugInfo = async (): Promise<void> => {
  if (!props.drugId) return;

  isLoading.value = true;
  loadError.value = null;

  try {
    const response = await fetch(`/data/drugs/info/${props.drugId}.json`);

    if (!response.ok) {
      throw new Error(`Brochure non trovata per ${props.drugId}`);
    }

    drugInfo.value = await response.json();
  } catch (error) {
    console.error('[DrugInfoDialog] Errore caricamento brochure:', error);
    loadError.value =
      error instanceof Error
        ? error.message
        : 'Errore sconosciuto durante caricamento';
  } finally {
    isLoading.value = false;
  }
};

/**
 * Toggle locale (IT ↔ EN)
 */
const toggleLocale = (): void => {
  currentLocale.value = currentLocale.value === 'it' ? 'en' : 'it';
};

/**
 * Handle click su farmaco correlato (es. da tab Interazioni)
 * TODO: Implementare quando DrugSelector supporta selezione farmaco
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleDrugClick = (relatedDrugId: string): void => {
  emit('drug-selected', relatedDrugId);
};

// ============================================================
// WATCHERS
// ============================================================
/**
 * Watch drugId: Ricarica dati quando drugId cambia
 */
watch(
  () => props.drugId,
  (newDrugId) => {
    if (newDrugId && props.modelValue) {
      void loadDrugInfo();
    }
  }
);

/**
 * Watch modelValue: Carica dati quando dialog si apre
 */
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && props.drugId) {
      void loadDrugInfo();
      activeTab.value = 'dosage'; // Reset a primo tab
    }
  }
);

// ============================================================
// LIFECYCLE
// ============================================================
// NO onMounted (lazy load on dialog open)
</script>

<template>
  <q-dialog v-model="showDialog" maximized transition-show="slide-up" transition-hide="slide-down">
    <q-card class="drug-info-dialog">
      <!-- ============================================================ -->
      <!-- HEADER                                                       -->
      <!-- ============================================================ -->
      <q-card-section class="row items-center q-pb-none bg-primary text-white">
        <div class="col">
          <div class="text-h5">
            {{ drugInfo ? getText(drugInfo.name) : 'Caricamento...' }}
          </div>
          <div v-if="drugInfo" class="text-caption">
            {{ getText(drugInfo.activeIngredient) }} •
            {{ getText(drugInfo.category) }}
          </div>
        </div>

        <!-- Locale Switcher -->
        <q-btn
          flat
          round
          dense
          :icon="localeIcon"
          :label="localeLabel"
          @click="toggleLocale"
          class="q-mr-sm"
        >
          <q-tooltip>Cambia lingua / Switch language</q-tooltip>
        </q-btn>

        <!-- Close Button -->
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>

      <!-- ============================================================ -->
      <!-- TABS                                                         -->
      <!-- ============================================================ -->
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="dosage" :label="currentLocale === 'it' ? '💊 Dosaggio' : '💊 Dosage'" />
        <q-tab
          name="contraindications"
          :label="currentLocale === 'it' ? '⛔ Controindicazioni' : '⛔ Contraindications'"
        />
        <q-tab
          name="sideEffects"
          :label="currentLocale === 'it' ? '⚠️ Effetti Collaterali' : '⚠️ Side Effects'"
        />
        <q-tab
          name="interactions"
          :label="currentLocale === 'it' ? '🔗 Interazioni' : '🔗 Interactions'"
        />
        <q-tab
          name="clinicalNotes"
          :label="currentLocale === 'it' ? '📝 Note Cliniche' : '📝 Clinical Notes'"
        />
        <q-tab
          name="references"
          :label="currentLocale === 'it' ? '📚 Riferimenti' : '📚 References'"
        />
      </q-tabs>

      <q-separator />

      <!-- ============================================================ -->
      <!-- TAB PANELS                                                   -->
      <!-- ============================================================ -->
      <q-tab-panels v-model="activeTab" animated class="drug-info-panels">
        <!-- ======================================================== -->
        <!-- TAB 1: DOSAGGIO                                          -->
        <!-- ======================================================== -->
        <q-tab-panel name="dosage">
          <div v-if="isLoading" class="text-center q-pa-md">
            <q-spinner color="primary" size="3em" />
            <p class="text-caption q-mt-md">Caricamento dati...</p>
          </div>

          <div v-else-if="loadError" class="text-center q-pa-md">
            <q-icon name="error" color="negative" size="3em" />
            <p class="text-negative q-mt-md">{{ loadError }}</p>
          </div>

          <div v-else-if="drugInfo && drugInfo.dosage">
            <!-- Adult Dosage -->
            <q-card flat bordered class="q-mb-md">
              <q-card-section>
                <div class="text-h6">
                  {{ currentLocale === 'it' ? '👨 Adulti' : '👨 Adults' }}
                </div>
                <p class="text-body2 q-mt-sm">
                  {{ getText(drugInfo.dosage.adult) }}
                </p>
              </q-card-section>
            </q-card>

            <!-- Pediatric Dosage -->
            <q-card flat bordered class="q-mb-md">
              <q-card-section>
                <div class="text-h6">
                  {{ currentLocale === 'it' ? '👶 Pediatrico' : '👶 Pediatric' }}
                </div>
                <p class="text-body2 q-mt-sm">
                  {{ getText(drugInfo.dosage.pediatric) }}
                </p>
              </q-card-section>
            </q-card>

            <!-- Renal Adjustment -->
            <q-card flat bordered class="q-mb-md">
              <q-card-section>
                <div class="text-h6">
                  {{
                    currentLocale === 'it'
                      ? '🩺 Insufficienza Renale'
                      : '🩺 Renal Impairment'
                  }}
                </div>
                <p class="text-body2 q-mt-sm" style="white-space: pre-line">
                  {{ getText(drugInfo.dosage.renalAdjustment) }}
                </p>
              </q-card-section>
            </q-card>

            <!-- Hepatic Adjustment (if available) -->
            <q-card
              v-if="drugInfo.dosage.hepaticAdjustment"
              flat
              bordered
              class="q-mb-md"
            >
              <q-card-section>
                <div class="text-h6">
                  {{
                    currentLocale === 'it'
                      ? '🫀 Insufficienza Epatica'
                      : '🫀 Hepatic Impairment'
                  }}
                </div>
                <p class="text-body2 q-mt-sm">
                  {{ getText(drugInfo.dosage.hepaticAdjustment) }}
                </p>
              </q-card-section>
            </q-card>
          </div>

          <div v-else class="text-center q-pa-md text-grey">
            {{ currentLocale === 'it' ? 'Nessun dato disponibile' : 'No data available' }}
          </div>
        </q-tab-panel>

        <!-- ======================================================== -->
        <!-- TAB 2: CONTROINDICAZIONI                                 -->
        <!-- ======================================================== -->
        <q-tab-panel name="contraindications">
          <div v-if="drugInfo && drugInfo.contraindications">
            <q-list bordered separator>
              <q-item
                v-for="(item, index) in getArray(drugInfo.contraindications)"
                :key="index"
              >
                <q-item-section avatar>
                  <q-icon name="error" color="negative" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body2">{{ item }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-else class="text-center q-pa-md text-grey">
            {{ currentLocale === 'it' ? 'Nessuna controindicazione' : 'No contraindications' }}
          </div>
        </q-tab-panel>

        <!-- ======================================================== -->
        <!-- TAB 3: EFFETTI COLLATERALI                               -->
        <!-- ======================================================== -->
        <q-tab-panel name="sideEffects">
          <div v-if="drugInfo && drugInfo.sideEffects">
            <q-list bordered separator>
              <q-item
                v-for="(item, index) in getArray(drugInfo.sideEffects)"
                :key="index"
              >
                <q-item-section avatar>
                  <q-icon name="warning" color="warning" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body2">{{ item }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-else class="text-center q-pa-md text-grey">
            {{ currentLocale === 'it' ? 'Nessun effetto collaterale' : 'No side effects' }}
          </div>
        </q-tab-panel>

        <!-- ======================================================== -->
        <!-- TAB 4: INTERAZIONI                                       -->
        <!-- ======================================================== -->
        <q-tab-panel name="interactions">
          <div v-if="drugInfo && drugInfo.interactions && drugInfo.interactions.length > 0">
            <q-card
              v-for="(interaction, index) in drugInfo.interactions"
              :key="index"
              flat
              bordered
              class="q-mb-md"
            >
              <q-card-section>
                <div class="row items-center">
                  <div class="col">
                    <div class="text-h6">{{ getText(interaction.drug) }}</div>
                  </div>
                  <div class="col-auto">
                    <q-badge
                      :color="interaction.severity === 'critical' ? 'negative' : 'warning'"
                      :label="
                        interaction.severity === 'critical'
                          ? currentLocale === 'it'
                            ? 'CRITICO'
                            : 'CRITICAL'
                          : currentLocale === 'it'
                            ? 'MODERATO'
                            : 'MODERATE'
                      "
                    />
                  </div>
                </div>

                <div class="q-mt-sm">
                  <p class="text-caption text-grey-7">
                    {{ currentLocale === 'it' ? 'Effetto:' : 'Effect:' }}
                  </p>
                  <p class="text-body2">{{ getText(interaction.effect) }}</p>
                </div>

                <div class="q-mt-sm">
                  <p class="text-caption text-grey-7">
                    {{ currentLocale === 'it' ? 'Raccomandazione:' : 'Recommendation:' }}
                  </p>
                  <p class="text-body2">{{ getText(interaction.recommendation) }}</p>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="text-center q-pa-md text-grey">
            {{ currentLocale === 'it' ? 'Nessuna interazione nota' : 'No known interactions' }}
          </div>
        </q-tab-panel>

        <!-- ======================================================== -->
        <!-- TAB 5: NOTE CLINICHE                                     -->
        <!-- ======================================================== -->
        <q-tab-panel name="clinicalNotes">
          <div v-if="drugInfo && drugInfo.clinicalNotes">
            <q-card flat bordered>
              <q-card-section>
                <div
                  class="text-body2"
                  style="white-space: pre-line"
                  v-html="getText(drugInfo.clinicalNotes)"
                ></div>
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="text-center q-pa-md text-grey">
            {{ currentLocale === 'it' ? 'Nessuna nota clinica' : 'No clinical notes' }}
          </div>
        </q-tab-panel>

        <!-- ======================================================== -->
        <!-- TAB 6: RIFERIMENTI                                       -->
        <!-- ======================================================== -->
        <q-tab-panel name="references">
          <div v-if="drugInfo && drugInfo.references && drugInfo.references.length > 0">
            <q-list bordered separator>
              <q-item v-for="(ref, index) in drugInfo.references" :key="index">
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" size="sm">
                    {{ index + 1 }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body2">{{ ref }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-else class="text-center q-pa-md text-grey">
            {{ currentLocale === 'it' ? 'Nessun riferimento' : 'No references' }}
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

.drug-info-dialog {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.drug-info-panels {
  flex: 1;
  overflow-y: auto;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .q-tabs {
    font-size: 0.75rem;
  }

  .text-h5 {
    font-size: 1.25rem;
  }

  .text-h6 {
    font-size: 1rem;
  }
}
</style>
