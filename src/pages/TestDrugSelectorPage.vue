/** * @file TestDrugSelectorPage.vue * @description TEST PAGE per DrugSelector.vue - Validazione
funzionale componente * @author Vasile Chifeac * @created 2025-11-17 * @modified 2025-11-17 *
@example Route: /test-drug-selector (temporanea) * @notes TEMPORARY FILE - Delete after validation *
Testa: search, selection, chips, events, MedicalDocumentationSection * @dependencies
DrugSelector.vue */

<script setup lang="ts">
import { ref } from 'vue';
import DrugSelector from 'src/components/Compatibility/DrugSelector.vue';

/**
 * State: Captured events from DrugSelector
 */
const selectedDrugsPayload = ref<string[]>([]);
const selectionCleared = ref(false);
const eventLog = ref<Array<{ timestamp: string; event: string; payload?: unknown }>>([]);

/**
 * Event handler: Captured drugs-selected event
 * @param drugs - Array of selected drug names
 */
const handleDrugsSelected = (drugs: string[]): void => {
  selectedDrugsPayload.value = drugs;
  eventLog.value.push({
    timestamp: new Date().toLocaleTimeString(),
    event: 'drugs-selected',
    payload: drugs,
  });
  console.log('✅ EVENT drugs-selected:', drugs);
};

/**
 * Event handler: Captured selection-cleared event
 */
const handleSelectionCleared = (): void => {
  selectionCleared.value = true;
  selectedDrugsPayload.value = [];
  eventLog.value.push({
    timestamp: new Date().toLocaleTimeString(),
    event: 'selection-cleared',
  });
  console.log('✅ EVENT selection-cleared');
};
</script>

<template>
  <q-page class="test-page">
    <!-- Page Header -->
    <div class="page-header q-pa-md bg-primary text-white">
      <h4 class="q-ma-none">🧪 TEST: DrugSelector.vue</h4>
      <p class="q-ma-none text-caption">Validazione funzionale componente</p>
    </div>

    <!-- Test Instructions Banner -->
    <q-banner class="bg-blue-1 q-ma-md" rounded>
      <template #avatar>
        <q-icon name="info" color="primary" />
      </template>
      <div class="text-subtitle2">📋 CHECKLIST TESTING:</div>
      <ul class="q-my-sm">
        <li><strong>Search Bar:</strong> Digita testo → verifica filtro drug list</li>
        <li><strong>Selection:</strong> Click su farmaco → verifica chip compare</li>
        <li><strong>Remove:</strong> Click X su chip → verifica rimozione</li>
        <li>
          <strong>Analyze:</strong> Seleziona ≥2 farmaci → click "Analizza" → verifica event log
        </li>
        <li><strong>Clear:</strong> Click "Pulisci" → verifica chips spariscono + event log</li>
        <li>
          <strong>Docs:</strong> Espandi sezioni → verifica MedicalDocumentationSection rendering
        </li>
      </ul>
    </q-banner>

    <!-- Main Test Grid -->
    <div class="row q-col-gutter-md q-pa-md">
      <!-- DrugSelector Component (order-first on mobile, order-1 on desktop) -->
      <div class="col-12 col-md-7 order-first order-md-1">
        <DrugSelector
          calculate-button-text="🧪 TEST Analizza"
          reset-button-text="🧹 TEST Pulisci"
          title="🔬 DrugSelector Testing Environment"
          @drugs-selected="handleDrugsSelected"
          @selection-cleared="handleSelectionCleared"
        />
      </div>

      <!-- Event Monitor (order-2 on mobile, order-2 on desktop) -->
      <div class="col-12 col-md-5 order-2">
        <q-card class="event-monitor">
          <q-card-section class="bg-secondary text-white">
            <h6 class="q-ma-none">📡 Event Monitor</h6>
          </q-card-section>

          <q-separator />

          <!-- Current Payload Display -->
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-sm">📦 Last Event Payload:</div>
            <div v-if="selectedDrugsPayload.length > 0" class="bg-green-1 q-pa-sm rounded-borders">
              <div class="text-caption text-weight-bold text-green-9">
                ✅ drugs-selected ({{ selectedDrugsPayload.length }} farmaci)
              </div>
              <q-chip
                v-for="(drug, idx) in selectedDrugsPayload"
                :key="idx"
                size="sm"
                color="green"
                text-color="white"
                dense
              >
                {{ drug }}
              </q-chip>
            </div>
            <div v-else-if="selectionCleared" class="bg-orange-1 q-pa-sm rounded-borders">
              <div class="text-caption text-weight-bold text-orange-9">🧹 selection-cleared</div>
            </div>
            <div v-else class="bg-grey-3 q-pa-sm rounded-borders text-center">
              <q-icon name="radio_button_unchecked" size="sm" class="text-grey-6" />
              <div class="text-caption text-grey-6">Nessun evento catturato</div>
            </div>
          </q-card-section>

          <q-separator />

          <!-- Event Log History -->
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-sm">
              📜 Event Log History ({{ eventLog.length }} events):
            </div>
            <q-scroll-area style="height: 300px" class="bg-grey-2 rounded-borders">
              <div v-if="eventLog.length === 0" class="text-center q-pa-md text-grey-6">
                <q-icon name="pending" size="lg" />
                <div class="text-caption">In attesa di eventi...</div>
              </div>
              <q-timeline v-else color="secondary" class="q-pa-sm">
                <q-timeline-entry
                  v-for="(log, idx) in eventLog.slice().reverse()"
                  :key="idx"
                  :title="log.event"
                  :subtitle="log.timestamp"
                  :icon="log.event === 'drugs-selected' ? 'check_circle' : 'clear'"
                  :color="log.event === 'drugs-selected' ? 'positive' : 'warning'"
                >
                  <div v-if="log.payload" class="text-caption">
                    Payload: {{ JSON.stringify(log.payload) }}
                  </div>
                </q-timeline-entry>
              </q-timeline>
            </q-scroll-area>
          </q-card-section>

          <q-separator />

          <!-- Validation Checklist -->
          <q-card-section class="bg-blue-1">
            <div class="text-subtitle2 text-weight-bold q-mb-sm">✅ Validation Checklist:</div>
            <q-list dense>
              <q-item>
                <q-item-section avatar>
                  <q-icon
                    :name="
                      selectedDrugsPayload.length > 0 ? 'check_circle' : 'radio_button_unchecked'
                    "
                    :color="selectedDrugsPayload.length > 0 ? 'positive' : 'grey'"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Event @drugs-selected emesso</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon
                    :name="selectionCleared ? 'check_circle' : 'radio_button_unchecked'"
                    :color="selectionCleared ? 'positive' : 'grey'"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Event @selection-cleared emesso</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon
                    :name="eventLog.length >= 2 ? 'check_circle' : 'radio_button_unchecked'"
                    :color="eventLog.length >= 2 ? 'positive' : 'grey'"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Più eventi registrati ({{ eventLog.length }})</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Testing Tips -->
    <q-card class="q-ma-md bg-amber-1">
      <q-card-section>
        <div class="text-subtitle2 text-weight-bold q-mb-sm">💡 TESTING TIPS:</div>
        <ul class="q-my-sm">
          <li>
            <strong>Browser DevTools:</strong> Apri Console (F12) → verifica console.log eventi
          </li>
          <li>
            <strong>Search Filter:</strong> Prova ricerca "mero" → dovrebbe filtrare Meropenem
          </li>
          <li><strong>Button Disable:</strong> Con 0-1 farmaci "Analizza" deve essere disabled</li>
          <li>
            <strong>Responsive:</strong> Resize browser window → verifica mobile layout (@media
            768px)
          </li>
          <li>
            <strong>Documentation:</strong> Scroll down → espandi sezioni NEWS-style (9 sections)
          </li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.test-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  border-radius: 8px 8px 0 0;
}

.event-monitor {
  position: sticky;
  top: 20px;
}

@media (max-width: 768px) {
  .event-monitor {
    position: static;
  }
}
</style>
