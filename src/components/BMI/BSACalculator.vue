<!-- BSACalculator.vue -->
<script setup lang="ts">
/**
 * @file BSACalculator.vue
 * @description Body Surface Area Calculator con 3 formule (Mosteller, DuBois, Haycock)
 * @author Vasile Chifeac
 * @created 2025-11-16
 *
 * @notes
 * - Componente estratto da BMICalculatorPage.vue Tab 2
 * - 3 formule BSA per chemioterapia, cardiologia, pediatria
 * - Mosteller (1987): general purpose adulti
 * - DuBois (1916): ricerca metabolica
 * - Haycock (1978): pediatria preferita
 */

import { ref, computed } from 'vue';

interface BSAFormData {
  weight: number | null;
  height: number | null;
}

interface BSAResult {
  mosteller: number;
  dubois: number;
  haycock: number;
}

const initialBSAForm: BSAFormData = {
  weight: null,
  height: null,
};

const initialBSAResult: BSAResult = {
  mosteller: 0,
  dubois: 0,
  haycock: 0,
};

const bsaForm = ref<BSAFormData>({ ...initialBSAForm });
const bsaResult = ref<BSAResult>({ ...initialBSAResult });

const isBSAFormValid = computed(() => {
  return (
    bsaForm.value.weight !== null &&
    bsaForm.value.weight > 0 &&
    bsaForm.value.height !== null &&
    bsaForm.value.height > 0
  );
});

const calculateBSA = () => {
  if (!isBSAFormValid.value) return;

  const weight = bsaForm.value.weight!;
  const height = bsaForm.value.height!;

  // Mosteller (1987) - Most commonly used
  const mosteller = Math.sqrt((height * weight) / 3600);

  // DuBois & DuBois (1916) - Research standard
  const dubois = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);

  // Haycock et al. (1978) - Pediatric preferred
  const haycock = 0.024265 * Math.pow(height, 0.3964) * Math.pow(weight, 0.5378);

  bsaResult.value = {
    mosteller,
    dubois,
    haycock,
  };
};

const resetBSAForm = () => {
  bsaForm.value = { ...initialBSAForm };
  bsaResult.value = { ...initialBSAResult };
};
</script>

<template>
  <div class="row q-gutter-lg">
    <!-- Pannello Input BSA -->
    <div class="col-12 col-md-5">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">📐 Body Surface Area (BSA)</h6>
          <p class="text-caption text-grey-7 q-mb-md">
            Calcolo superficie corporea con 3 formule per applicazioni chemioterapiche e
            cardiologiche
          </p>

          <!-- Peso -->
          <q-input
            v-model.number="bsaForm.weight"
            type="number"
            step="0.1"
            label="Peso"
            suffix="kg"
            outlined
            class="q-mb-md"
            :rules="[(val) => (val > 0 && val <= 500) || 'Peso tra 1-500 kg']"
          >
            <template v-slot:prepend>
              <q-icon name="fitness_center" color="blue" />
            </template>
          </q-input>

          <!-- Altezza -->
          <q-input
            v-model.number="bsaForm.height"
            type="number"
            label="Altezza"
            suffix="cm"
            outlined
            class="q-mb-md"
            :rules="[(val) => (val > 0 && val <= 300) || 'Altezza tra 1-300 cm']"
          >
            <template v-slot:prepend>
              <q-icon name="height" color="green" />
            </template>
          </q-input>

          <!-- Bottoni -->
          <q-btn
            @click="calculateBSA"
            color="primary"
            size="lg"
            class="full-width q-mb-sm"
            icon="calculate"
            :disable="!isBSAFormValid"
          >
            Calcola BSA
          </q-btn>
          <q-btn
            @click="resetBSAForm"
            color="negative"
            size="lg"
            class="full-width"
            icon="refresh"
            outline
          >
            Reset
          </q-btn>
        </q-card-section>
      </q-card>
    </div>

    <!-- Pannello Risultati BSA -->
    <div class="col-12 col-md-6">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">📊 Risultati BSA</h6>

          <div v-if="bsaResult.mosteller > 0">
            <!-- Tabella Comparazione Formule -->
            <q-markup-table class="q-mb-md">
              <thead>
                <tr>
                  <th class="text-left">Formula</th>
                  <th class="text-right">BSA (m²)</th>
                  <th class="text-left">Applicazione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Mosteller</strong></td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ bsaResult.mosteller.toFixed(2) }}
                  </td>
                  <td class="text-caption">Adulti (general purpose)</td>
                </tr>
                <tr>
                  <td><strong>DuBois</strong></td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ bsaResult.dubois.toFixed(2) }}
                  </td>
                  <td class="text-caption">Ricerca metabolica</td>
                </tr>
                <tr>
                  <td><strong>Haycock</strong></td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ bsaResult.haycock.toFixed(2) }}
                  </td>
                  <td class="text-caption">Pediatria (&lt;15 anni)</td>
                </tr>
              </tbody>
            </q-markup-table>

            <!-- Note Cliniche BSA -->
            <q-banner class="bg-blue-1 q-mb-md" rounded>
              <template v-slot:avatar>
                <q-icon name="info" color="primary" />
              </template>
              <div class="text-caption">
                <strong>Valori Medi Adulti:</strong> Donne ~1.6 m², Uomini ~1.9 m²<br />
                <strong>Neonati a termine:</strong> ~0.25 m²
              </div>
            </q-banner>

            <!-- 6️⃣ Applicazioni Cliniche BSA -->
            <q-expansion-item
              icon="local_hospital"
              label="6️⃣ Applicazioni Cliniche BSA"
              class="q-mt-md"
              header-class="bg-purple-1 text-purple-9"
            >
              <q-card class="bg-purple-1">
                <q-card-section>
                  <ul class="text-body2 q-mb-none">
                    <li class="q-mb-sm">
                      <strong>Chemioterapia:</strong> Dosaggio farmaci antineoplastici in mg/m²
                      (cisplatino, doxorubicina, carboplatin)
                    </li>
                    <li class="q-mb-sm">
                      <strong>Cardiologia:</strong> Cardiac Index = CO / BSA (L/min/m², normale
                      2.5-4.0), Stroke Volume Index = SV / BSA
                    </li>
                    <li class="q-mb-sm">
                      <strong>Nefrologia:</strong> GFR normalizzazione a 1.73 m² per confrontabilità
                      tra pazienti
                    </li>
                    <li class="q-mb-sm">
                      <strong>Ustioni:</strong> Calcolo TBSA% per fabbisogno fluidico (formula
                      Parkland: 4mL × peso × TBSA% in 24h)
                    </li>
                  </ul>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <!-- 4️⃣ Formule BSA -->
            <q-expansion-item
              icon="functions"
              label="4️⃣ Formule BSA"
              class="q-mt-md"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="bg-cyan-1">
                <q-card-section>
                  <p class="text-body2 q-mb-sm">
                    <strong>Mosteller (1987):</strong><br />
                    BSA (m²) = √[(altezza_cm × peso_kg) / 3600]
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>DuBois & DuBois (1916):</strong><br />
                    BSA (m²) = 0.007184 × altezza_cm^0.725 × peso_kg^0.425
                  </p>
                  <p class="text-body2 q-mb-none">
                    <strong>Haycock et al. (1978):</strong><br />
                    BSA (m²) = 0.024265 × altezza_cm^0.3964 × peso_kg^0.5378
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>

          <div v-else class="text-center text-grey-6 q-pa-xl">
            <q-icon name="info" size="lg" class="q-mb-md" />
            <p class="text-body2">Inserisci peso e altezza per calcolare la BSA</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
