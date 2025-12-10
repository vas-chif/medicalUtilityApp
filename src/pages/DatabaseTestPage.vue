<template>
  <q-page padding>
    <div class="q-gutter-md">
      <!-- Header con statistiche -->
      <q-card>
        <q-card-section>
          <div class="text-h5">Database Farmaci - Test</div>
          <div class="text-subtitle2">Verifica funzionamento database compatibilità</div>
        </q-card-section>

        <q-card-section v-if="stats">
          <div class="row q-gutter-md">
            <div class="col">
              <q-chip color="primary" text-color="white" icon="medication">
                {{ stats.totalDrugs }} Farmaci
              </q-chip>
            </div>
            <div class="col">
              <q-chip color="purple" text-color="white" icon="link">
                {{ stats.totalCompatibilityEntries }} Compatibilità
              </q-chip>
            </div>
            <div class="col">
              <q-chip color="positive" text-color="white" icon="check">
                {{ stats.statusBreakdown.compatible }} Compatibili
              </q-chip>
            </div>
            <div class="col">
              <q-chip color="negative" text-color="white" icon="cancel">
                {{ stats.statusBreakdown.incompatible }} Incompatibili
              </q-chip>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Test ricerca -->
      <q-card>
        <q-card-section>
          <div class="text-h6">Test Ricerca Farmaci</div>

          <q-input v-model="searchQuery" label="Cerca farmaco" outlined dense class="q-mt-md">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <div class="q-mt-md">
            <q-chip
              v-for="drug in searchResults.slice(0, 10)"
              :key="drug.id"
              clickable
              @click="selectedDrug1 = drug"
              :color="selectedDrug1?.id === drug.id ? 'primary' : undefined"
              :text-color="selectedDrug1?.id === drug.id ? 'white' : undefined"
            >
              {{ drug.name.it }}
              <q-badge v-if="drug.cvcRequirement.required" color="purple" floating>CVC</q-badge>
            </q-chip>
          </div>
        </q-card-section>
      </q-card>

      <!-- Test compatibilità -->
      <q-card v-if="selectedDrug1">
        <q-card-section>
          <div class="text-h6">Test Compatibilità</div>
          <div class="text-subtitle2">
            Seleziona secondo farmaco per verificare compatibilità con
            <strong>{{ selectedDrug1.name.it }}</strong>
          </div>

          <div class="q-mt-md">
            <q-select
              v-model="selectedDrug2"
              :options="allDrugs"
              option-label="name.it"
              option-value="id"
              label="Secondo farmaco"
              outlined
              dense
              use-input
              @filter="filterDrugs"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name.it }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.id }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge v-if="scope.opt.cvcRequirement.required" color="purple"> CVC </q-badge>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </q-card-section>

        <!-- Risultato compatibilità -->
        <q-card-section v-if="compatibilityResult">
          <q-separator class="q-mb-md" />

          <div class="text-center q-mb-md">
            <q-icon
              :name="getStatusIcon(compatibilityResult.status)"
              :color="getStatusColor(compatibilityResult.status)"
              size="80px"
            />
          </div>

          <div class="text-center text-h6 q-mb-sm">
            {{ getStatusLabel(compatibilityResult.status, Language.IT) }}
          </div>

          <div class="text-center text-body2 q-mb-md">
            <strong>{{ compatibilityResult.drug1.name.it }}</strong>
            <br />
            ↔️
            <br />
            <strong>{{ compatibilityResult.drug2.name.it }}</strong>
          </div>

          <!-- Warning banner -->
          <q-banner
            v-if="compatibilityResult.warning"
            :class="isCritical(compatibilityResult.status) ? 'bg-negative' : 'bg-warning'"
            class="text-white"
          >
            <template v-slot:avatar>
              <q-icon
                :name="isCritical(compatibilityResult.status) ? 'dangerous' : 'warning'"
                size="md"
              />
            </template>
            {{ compatibilityResult.warning }}
          </q-banner>

          <!-- Info aggiuntive -->
          <div class="q-mt-md">
            <!-- CVC Info Drug 1 -->
            <div v-if="compatibilityResult.drug1.cvcRequirement.required" class="q-mb-sm">
              <q-chip color="purple" text-color="white" icon="medication">
                {{ compatibilityResult.drug1.name.it }}:
                {{ compatibilityResult.drug1.cvcRequirement.details.it }}
              </q-chip>
            </div>

            <!-- CVC Info Drug 2 -->
            <div v-if="compatibilityResult.drug2.cvcRequirement.required" class="q-mb-sm">
              <q-chip color="purple" text-color="white" icon="medication">
                {{ compatibilityResult.drug2.name.it }}:
                {{ compatibilityResult.drug2.cvcRequirement.details.it }}
              </q-chip>
            </div>

            <!-- Concentration Notes Drug 1 -->
            <div
              v-if="compatibilityResult.drug1.concentrationNotes.it"
              class="text-caption q-mb-xs"
            >
              📝 <strong>{{ compatibilityResult.drug1.name.it }}</strong
              >:
              {{ compatibilityResult.drug1.concentrationNotes.it }}
            </div>

            <!-- Concentration Notes Drug 2 -->
            <div
              v-if="compatibilityResult.drug2.concentrationNotes.it"
              class="text-caption q-mb-xs"
            >
              📝 <strong>{{ compatibilityResult.drug2.name.it }}</strong
              >:
              {{ compatibilityResult.drug2.concentrationNotes.it }}
            </div>

            <!-- Phlebitis Risk Drug 1 -->
            <div
              v-if="compatibilityResult.drug1.phlebitisRisk.it"
              class="text-caption text-negative q-mb-xs"
            >
              ⚠️ <strong>{{ compatibilityResult.drug1.name.it }}</strong> - Flebite:
              {{ compatibilityResult.drug1.phlebitisRisk.it }}
            </div>

            <!-- Phlebitis Risk Drug 2 -->
            <div
              v-if="compatibilityResult.drug2.phlebitisRisk.it"
              class="text-caption text-negative"
            >
              ⚠️ <strong>{{ compatibilityResult.drug2.name.it }}</strong> - Flebite:
              {{ compatibilityResult.drug2.phlebitisRisk.it }}
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Test farmaci CVC -->
      <q-card>
        <q-card-section>
          <div class="text-h6">Farmaci con CVC Richiesto ({{ cvcDrugs.length }})</div>

          <q-list dense bordered separator class="q-mt-md">
            <q-item v-for="drug in cvcDrugs.slice(0, 10)" :key="drug.id">
              <q-item-section>
                <q-item-label>{{ drug.name.it }}</q-item-label>
                <q-item-label caption>{{ drug.id }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-badge color="purple">
                  {{ drug.cvcRequirement.details.it }}
                </q-badge>
              </q-item-section>
            </q-item>
          </q-list>

          <div v-if="cvcDrugs.length > 10" class="q-mt-sm text-caption text-grey">
            ... e altri {{ cvcDrugs.length - 10 }} farmaci
          </div>
        </q-card-section>
      </q-card>

      <!-- Test incompatibilità gravi -->
      <q-card>
        <q-card-section>
          <div class="text-h6">Incompatibilità Gravi (Prime 10)</div>

          <q-list dense bordered separator class="q-mt-md">
            <q-item v-for="(item, idx) in severeIncompatibilities.slice(0, 10)" :key="idx">
              <q-item-section avatar>
                <q-icon name="dangerous" color="negative" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.drug1Name }}</q-item-label>
                <q-item-label caption>↔️ {{ item.drug2Name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { drugDatabaseService } from 'src/services/drug-database.service';
import type { Drug, CompatibilityResult } from 'src/types/drug-database';
import {
  CompatibilityStatus,
  Language,
  getStatusIcon,
  getStatusColor,
  getStatusLabel,
  isCritical,
} from 'src/types/drug-database';

// State
const searchQuery = ref('');
const selectedDrug1 = ref<Drug | null>(null);
const selectedDrug2 = ref<Drug | null>(null);
const allDrugs = ref<Drug[]>([]);
const filteredDrugsOptions = ref<Drug[]>([]);

// Computed
const stats = computed(() => drugDatabaseService.getStatistics());

const searchResults = computed(() => {
  if (!searchQuery.value) return allDrugs.value;

  return drugDatabaseService.searchDrugs({
    query: searchQuery.value,
  });
});

const cvcDrugs = computed(() => drugDatabaseService.getCvcRequiredDrugs());

const compatibilityResult = computed<CompatibilityResult | null>(() => {
  if (!selectedDrug1.value || !selectedDrug2.value) return null;

  return drugDatabaseService.checkCompatibility(selectedDrug1.value.id, selectedDrug2.value.id);
});

const severeIncompatibilities = computed(() => {
  const result: Array<{ drug1Name: string; drug2Name: string }> = [];

  allDrugs.value.forEach((drug) => {
    drug.compatibility.forEach((compat) => {
      if (compat.status === CompatibilityStatus.INCOMPATIBLE_SEVERE) {
        const otherDrug = drugDatabaseService.getDrugById(compat.drugId);
        if (otherDrug) {
          result.push({
            drug1Name: drug.name.it,
            drug2Name: otherDrug.name.it,
          });
        }
      }
    });
  });

  return result;
});

// Methods
function filterDrugs(val: string, update: (fn: () => void) => void) {
  update(() => {
    if (val === '') {
      filteredDrugsOptions.value = allDrugs.value;
    } else {
      const needle = val.toLowerCase();
      filteredDrugsOptions.value = allDrugs.value.filter((drug) =>
        drug.name.it.toLowerCase().includes(needle),
      );
    }
  });
}

// Lifecycle
onMounted(async () => {
  try {
    // Carica database (modifica path secondo la tua struttura)
    await drugDatabaseService.loadDatabase('/data/drugs-database.json');

    allDrugs.value = drugDatabaseService.getAllDrugs();
    filteredDrugsOptions.value = allDrugs.value;

    console.log('✅ Database caricato:', stats.value);
  } catch (error) {
    console.error('❌ Errore caricamento database:', error);
  }
});
</script>

<style scoped>
.q-chip {
  margin: 4px;
}
</style>
