<template>
  <q-page class="q-pa-md medical-calculator-page">
    <!-- Header con breadcrumb -->
    <div class="q-mb-lg">
      <q-breadcrumbs class="medical-breadcrumbs">
        <q-breadcrumbs-el
          icon="home"
          @click="$router.push('/')"
          class="cursor-pointer breadcrumb-home"
        />
        <q-breadcrumbs-el label="Compatibilità Farmaci" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none medical-title">💊 Compatibilità Farmaci</h4>
      <p class="text-subtitle1 text-grey-7 medical-subtitle">
        Controllo interazioni e incompatibilità farmacologiche per somministrazione endovenosa
      </p>
    </div>

    <div class="row q-gutter-lg">
      <!-- Pannello Selezione Farmaci -->
      <div class="col-12 col-md-5">
        <q-card class="medical-input-card">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md medical-section-title">🔍 Seleziona Farmaci</h6>

            <!-- Barra di ricerca -->
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

            <!-- Lista farmaci disponibili -->
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

            <!-- Farmaci selezionati -->
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

            <!-- Bottoni azione -->
            <div class="row q-gutter-sm">
              <q-btn
                @click="analyzeCompatibility"
                color="primary"
                size="lg"
                class="col medical-calculate-btn"
                icon="analytics"
                :disable="selectedDrugs.length < 2"
                :loading="isLoading"
              >
                Analizza Compatibilità
              </q-btn>
              <q-btn
                @click="clearSelection"
                color="negative"
                outline
                size="lg"
                icon="clear"
                :disable="selectedDrugs.length === 0"
              >
                Pulisci
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12 col-md-6">
        <q-card class="medical-results-card">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md medical-section-title">📊 Risultati Analisi</h6>

            <!-- Placeholder quando nessuna analisi -->
            <div v-if="!analysisResults" class="text-center q-pa-xl">
              <q-icon name="science" size="5rem" color="grey-4" class="q-mb-md" />
              <p class="text-h6 text-grey-6">Seleziona almeno 2 farmaci</p>
              <p class="text-body2 text-grey-5">
                L'analisi mostrerà le compatibilità e incompatibilità tra i farmaci selezionati
              </p>
            </div>

            <!-- Risultati analisi -->
            <div v-else>
              <!-- Warnings Critici -->
              <template v-if="criticalWarnings.length > 0">
                <div v-for="warning in criticalWarnings" :key="warning.message" class="q-mb-md">
                  <q-banner class="bg-negative text-white" rounded>
                    <template v-slot:avatar>
                      <q-icon name="warning" size="md" />
                    </template>
                    <div class="text-weight-bold">INCOMPATIBILITÀ CRITICA</div>
                    <div class="text-body2">{{ warning.drugs[0] }} ⚠️ {{ warning.drugs[1] }}</div>
                    <div class="text-caption q-mt-sm">{{ warning.message }}</div>
                    <div class="text-caption q-mt-xs">
                      <strong>Azione:</strong> {{ warning.action }}
                    </div>
                  </q-banner>
                </div>
              </template>

              <!-- Warnings -->
              <template v-if="normalWarnings.length > 0">
                <div v-for="warning in normalWarnings" :key="warning.message" class="q-mb-md">
                  <q-banner class="bg-warning text-white" rounded>
                    <template v-slot:avatar>
                      <q-icon name="info" size="md" />
                    </template>
                    <div class="text-weight-bold">ATTENZIONE</div>
                    <div class="text-body2">{{ warning.drugs[0] }} ⚠️ {{ warning.drugs[1] }}</div>
                    <div class="text-caption q-mt-sm">{{ warning.message }}</div>
                    <div class="text-caption q-mt-xs" v-if="warning.action">
                      <strong>Azione:</strong> {{ warning.action }}
                    </div>
                  </q-banner>
                </div>
              </template>

              <!-- Info -->
              <template v-if="infoWarnings.length > 0">
                <div v-for="warning in infoWarnings" :key="warning.message" class="q-mb-md">
                  <q-banner class="bg-info text-white" rounded>
                    <template v-slot:avatar>
                      <q-icon name="check_circle" size="md" />
                    </template>
                    <div class="text-body2">{{ warning.message }}</div>
                    <div class="text-caption q-mt-xs" v-if="warning.action">
                      {{ warning.action }}
                    </div>
                  </q-banner>
                </div>
              </template>

              <!-- Raccomandazioni -->
              <div class="q-mt-lg">
                <div class="text-subtitle2 text-primary q-mb-sm">💡 Raccomandazioni:</div>
                <q-list bordered separator>
                  <q-item
                    v-for="(recommendation, index) in analysisResults.recommendations"
                    :key="index"
                  >
                    <q-item-section>
                      <q-item-label>{{ recommendation }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- Dettagli per farmaco -->
              <div class="q-mt-lg">
                <q-expansion-item
                  v-for="result in analysisResults.results"
                  :key="result.drug"
                  :label="`Dettagli ${result.drug}`"
                  icon="medication"
                  header-class="bg-grey-2"
                >
                  <q-card>
                    <q-card-section>
                      <div class="text-body2">
                        <div v-if="result.compatible.length > 0" class="q-mb-sm">
                          <strong class="text-positive">✅ Compatibile con:</strong>
                          {{ formatDrugList(result.compatible) }}
                        </div>
                        <div v-if="result.compatibleOnTap.length > 0" class="q-mb-sm">
                          <strong class="text-info">🔀 Compatibile via Y-site con:</strong>
                          {{ formatDrugList(result.compatibleOnTap) }}
                        </div>
                        <div v-if="result.incompatible.length > 0" class="q-mb-sm">
                          <strong class="text-negative">❌ Incompatibile con:</strong>
                          {{ formatDrugList(result.incompatible) }}
                        </div>
                        <div v-if="result.conflictingData.length > 0" class="q-mb-sm">
                          <strong class="text-warning">⚠️ Dati contrastanti con:</strong>
                          {{ formatDrugList(result.conflictingData) }}
                        </div>
                        <div v-if="result.noDataAvailable.length > 0">
                          <strong class="text-grey-7">❓ Nessun dato per:</strong>
                          {{ formatDrugList(result.noDataAvailable) }}
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="q-mt-lg">
      <q-banner class="bg-grey-2" rounded>
        <template v-slot:avatar>
          <q-icon name="warning_amber" color="warning" />
        </template>
        <div class="text-caption">
          <strong>DISCLAIMER MEDICO:</strong> Questo strumento è a scopo educativo/informativo. Per
          decisioni cliniche verificare sempre con fonti ufficiali (Micromedex, Trissel's Handbook)
          e consulenza farmaceutica professionale.
        </div>
      </q-banner>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDrugCompatibility } from 'src/composables/useDrugCompatibility';

// Composable
const {
  filteredDrugs,
  selectedDrugs,
  searchQuery,
  isLoading,
  analyzeMultipleDrugs,
  formatDrugList,
  addDrug,
  removeDrug,
  clearSelection,
  getCategoryIcon,
} = useDrugCompatibility();

// State
const analysisResults = ref<ReturnType<typeof analyzeMultipleDrugs> | null>(null);

// Computed
const criticalWarnings = computed(() => {
  return analysisResults.value?.warnings.filter((w) => w.type === 'critical') || [];
});

const normalWarnings = computed(() => {
  return analysisResults.value?.warnings.filter((w) => w.type === 'warning') || [];
});

const infoWarnings = computed(() => {
  return analysisResults.value?.warnings.filter((w) => w.type === 'info') || [];
});

// Methods
const analyzeCompatibility = () => {
  isLoading.value = true;

  // Simula loading
  setTimeout(() => {
    analysisResults.value = analyzeMultipleDrugs(selectedDrugs.value);
    isLoading.value = false;
  }, 500);
};
</script>

<style scoped>
/* Medical Page Base */
.medical-calculator-page {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  min-height: 100vh;
}

/* Breadcrumbs */
.medical-breadcrumbs {
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(46, 125, 138, 0.1);
}

.breadcrumb-home {
  transition: all 0.3s ease;
}

.breadcrumb-home:hover {
  color: var(--q-primary);
  transform: scale(1.1);
}

/* Titles */
.medical-title {
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #2e7d8a 0%, #5a9b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.medical-subtitle {
  font-weight: 400;
  line-height: 1.5;
}

.medical-section-title {
  color: #2e7d8a;
  font-weight: 600;
  border-bottom: 2px solid #e8f4f8;
  padding-bottom: 8px;
}

/* Cards */
.medical-input-card,
.medical-results-card {
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(46, 125, 138, 0.15);
  border: 1px solid #e8f4f8;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
}

.medical-input-card:hover,
.medical-results-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(46, 125, 138, 0.2);
}

/* Drugs List */
.drugs-list {
  max-height: 400px;
  overflow-y: auto;
}

.drug-item {
  transition: all 0.3s ease;
}

.drug-item:hover {
  background: rgba(46, 125, 138, 0.05);
}

/* Calculate Button */
.medical-calculate-btn {
  background: linear-gradient(135deg, #2e7d8a 0%, #5a9b6b 100%);
  border-radius: 12px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(46, 125, 138, 0.3);
  transition: all 0.3s ease;
}

.medical-calculate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(46, 125, 138, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .medical-calculator-page {
    padding: 12px;
  }

  .medical-title {
    font-size: 1.5rem;
  }

  .drugs-list {
    max-height: 300px;
  }
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.medical-input-card,
.medical-results-card {
  animation: fadeInUp 0.6s ease-out;
}

.medical-results-card {
  animation-delay: 0.2s;
}
</style>
