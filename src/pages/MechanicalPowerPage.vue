<template>
  <q-page class="q-pa-md">
    <!-- Header con breadcrumb -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer" />
        <q-breadcrumbs-el label="Mechanical Power" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">⚙️ Mechanical Power Calculator</h4>
      <p class="text-subtitle1 text-grey-7">Calcolo della potenza meccanica ventilatoria</p>
    </div>

    <div class="row q-gutter-lg">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📊 Parametri Ventilatori</h6>
            
            <!-- RR - Frequenza Respiratoria -->
            <q-input
              v-model.number="formData.RR"
              type="number"
              label="RR (Frequenza Respiratoria)"
              suffix="atti/min"
              outlined
              class="q-mb-md"
              :rules="[val => val > 0 || 'Inserire valore positivo']"
            >
              <template v-slot:prepend>
                <q-icon name="speed" color="blue" />
              </template>
            </q-input>

            <!-- VTe - Volume Tidal Espiratorio -->
            <q-input
              v-model.number="formData.VTe"
              type="number"
              step="0.01"
              label="VTe (Volume Tidal Espiratorio)"
              suffix="litri"
              outlined
              class="q-mb-md"
              :rules="[val => val > 0 || 'Inserire valore positivo']"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="green" />
              </template>
            </q-input>

            <!-- P.Picco - Pressione di Picco -->
            <q-input
              v-model.number="formData.Picco"
              type="number"
              label="P.Picco (Pressione di Picco)"
              suffix="cmH2O"
              outlined
              class="q-mb-md"
              :rules="[val => val > 0 || 'Inserire valore positivo']"
            >
              <template v-slot:prepend>
                <q-icon name="trending_up" color="orange" />
              </template>
            </q-input>

            <!-- P.Plateau - Pressione di Plateau -->
            <q-input
              v-model.number="formData.Plateau"
              type="number"
              label="P.Plateau (Pressione di Plateau)"
              suffix="cmH2O"
              outlined
              class="q-mb-md"
              :rules="[val => val > 0 || 'Inserire valore positivo']"
            >
              <template v-slot:prepend>
                <q-icon name="horizontal_rule" color="purple" />
              </template>
            </q-input>

            <!-- PeeP - Pressione Positiva di Fine Espirazione -->
            <q-input
              v-model.number="formData.PeeP"
              type="number"
              label="PEEP (Pressione Positiva Fine Espirazione)"
              suffix="cmH2O"
              outlined
              class="q-mb-md"
              :rules="[val => val >= 0 || 'Inserire valore non negativo']"
            >
              <template v-slot:prepend>
                <q-icon name="trending_down" color="red" />
              </template>
            </q-input>

            <!-- Bottone Calcola -->
            <q-btn
              @click="calculateMP"
              color="primary"
              size="lg"
              class="full-width"
              icon="calculate"
              :disable="!isFormValid"
            >
              Calcola Mechanical Power
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">📈 Risultati</h6>
            
            <!-- Risultato Principale -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 text-primary q-mb-sm">
                {{ result.toFixed(2) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>j/min</strong> (Joule per minuto)
              </div>
            </div>

            <!-- Interpretazione Clinica -->
            <q-separator class="q-mb-md" />
            
            <div class="q-mb-md">
              <div class="text-h6 q-mb-sm">🎯 Interpretazione Clinica:</div>
              <q-chip 
                :color="getInterpretationColor()" 
                text-color="white" 
                class="text-weight-bold"
              >
                {{ getInterpretation() }}
              </q-chip>
            </div>

            <!-- Linee Guida -->
            <q-expansion-item
              icon="info"
              label="📚 Valori di Riferimento"
              class="text-primary"
            >
              <div class="q-pa-md bg-grey-1">
                <ul class="q-ma-none">
                  <li><strong>&lt; 17 j/min:</strong> Ventilazione protettiva</li>
                  <li><strong>17-22 j/min:</strong> Zona di attenzione</li>
                  <li><strong>&gt; 22 j/min:</strong> Rischio aumentato VILI*</li>
                </ul>
                <p class="text-caption q-mt-sm q-mb-none">
                  *VILI = Ventilator-Induced Lung Injury
                </p>
              </div>
            </q-expansion-item>

            <!-- Formula -->
            <q-expansion-item
              icon="functions"
              label="🧮 Formula Utilizzata"
              class="text-primary q-mt-sm"
            >
              <div class="q-pa-md bg-grey-1">
                <p class="text-body2 q-ma-none">
                  <strong>MP = 0.098 × RR × VTe × (P.Picco - 0.5 × (P.Plateau - PEEP))</strong>
                </p>
                <p class="text-caption q-mt-sm q-mb-none">
                  Formula di Gattinoni et al. per il calcolo della potenza meccanica ventilatoria
                </p>
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Interfaccia per i dati del form
interface MPFormData {
  RR: number | null;      // Frequenza Respiratoria (atti/min)
  VTe: number | null;     // Volume Tidal Espiratorio (litri)
  Picco: number | null;   // Pressione di Picco (cmH2O)
  Plateau: number | null; // Pressione di Plateau (cmH2O)
  PeeP: number | null;    // PEEP (cmH2O)
}

// Dati reattivi del form
const formData = ref<MPFormData>({
  RR: null,
  VTe: null,
  Picco: null,
  Plateau: null,
  PeeP: null
});

// Risultato del calcolo
const result = ref<number>(0);

// Computed per validazione form
const isFormValid = computed(() => {
  return formData.value.RR !== null && formData.value.RR > 0 &&
         formData.value.VTe !== null && formData.value.VTe > 0 &&
         formData.value.Picco !== null && formData.value.Picco > 0 &&
         formData.value.Plateau !== null && formData.value.Plateau > 0 &&
         formData.value.PeeP !== null && formData.value.PeeP >= 0;
});

// Funzione di calcolo Mechanical Power
const calculateMP = () => {
  if (!isFormValid.value) return;

  const { RR, VTe, Picco, Plateau, PeeP } = formData.value;
  
  // Formula: MP = 0.098 × RR × VTe × (Picco - 0.5 × (Plateau - PeeP))
  result.value = 0.098 * RR! * VTe! * (Picco! - 0.5 * (Plateau! - PeeP!));
};

// Interpretazione clinica del risultato
const getInterpretation = (): string => {
  if (result.value === 0) return 'Inserire i parametri per il calcolo';
  if (result.value < 17) return 'Ventilazione Protettiva';
  if (result.value <= 22) return 'Zona di Attenzione';
  return 'Alto Rischio VILI';
};

// Colore per l'interpretazione
const getInterpretationColor = (): string => {
  if (result.value === 0) return 'grey';
  if (result.value < 17) return 'green';
  if (result.value <= 22) return 'orange';
  return 'red';
};
</script>

<style scoped>
.q-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.q-breadcrumbs-el {
  transition: color 0.3s ease;
}

.q-breadcrumbs-el:hover {
  color: var(--q-primary);
}
</style>