<!-- IBWCalculator.vue -->
<script setup lang="ts">
/**
 * @file IBWCalculator.vue
 * @description Ideal Body Weight Calculator con 3 formule (Hamwi, Robinson, PBW)
 * @author Vasile Chifeac
 * @created 2025-11-16
 *
 * @notes
 * - Componente estratto da BMICalculatorPage.vue Tab 3
 * - Hamwi (1964): uso generale nutrizione clinica
 * - Robinson (1983): uso generale nutrizione clinica
 * - PBW (ARDSNet 2000): ventilazione meccanica ARDS
 */

import { ref, computed } from 'vue';

interface IBWFormData {
  height: number | null;
  gender: 'male' | 'female' | null;
}

interface IBWResult {
  hamwi: number;
  robinson: number;
  pbw: number;
}

const initialIBWForm: IBWFormData = {
  height: null,
  gender: null,
};

const initialIBWResult: IBWResult = {
  hamwi: 0,
  robinson: 0,
  pbw: 0,
};

const ibwForm = ref<IBWFormData>({ ...initialIBWForm });
const ibwResult = ref<IBWResult>({ ...initialIBWResult });

const genderOptions = [
  { label: 'Maschio', value: 'male' },
  { label: 'Femmina', value: 'female' },
];

const isIBWFormValid = computed(() => {
  return ibwForm.value.height !== null && ibwForm.value.height > 0 && ibwForm.value.gender !== null;
});

const calculateIBW = () => {
  if (!isIBWFormValid.value) return;

  const height_cm = ibwForm.value.height!;
  const height_in = height_cm / 2.54;
  const gender = ibwForm.value.gender!;

  let hamwi = 0;
  let robinson = 0;
  let pbw = 0;

  if (gender === 'male') {
    // Hamwi (1964) - Male
    hamwi = 48 + 2.7 * ((height_cm - 152.4) / 2.54);
    // Robinson (1983) - Male
    robinson = 52 + 1.9 * (height_in - 60);
    // PBW ARDSNet (2000) - Male
    pbw = 50 + 0.91 * (height_cm - 152.4);
  } else {
    // Hamwi (1964) - Female
    hamwi = 45.5 + 2.25 * ((height_cm - 152.4) / 2.54);
    // Robinson (1983) - Female
    robinson = 49 + 1.7 * (height_in - 60);
    // PBW ARDSNet (2000) - Female
    pbw = 45.5 + 0.91 * (height_cm - 152.4);
  }

  ibwResult.value = {
    hamwi: hamwi > 0 ? hamwi : 0,
    robinson: robinson > 0 ? robinson : 0,
    pbw: pbw > 0 ? pbw : 0,
  };
};

const resetIBWForm = () => {
  ibwForm.value = { ...initialIBWForm };
  ibwResult.value = { ...initialIBWResult };
};
</script>

<template>
  <div class="row q-gutter-lg">
    <!-- Pannello Input IBW -->
    <div class="col-12 col-md-5">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">📏 Ideal Body Weight (IBW)</h6>
          <p class="text-caption text-grey-7 q-mb-md">
            Calcolo peso ideale con 3 formule per valutazione nutrizionale e ventilazione meccanica
          </p>

          <!-- Altezza -->
          <q-input
            v-model.number="ibwForm.height"
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

          <!-- Sesso -->
          <q-select
            v-model="ibwForm.gender"
            :options="genderOptions"
            label="Sesso"
            outlined
            class="q-mb-md"
            emit-value
            map-options
            :rules="[(val) => !!val || 'Sesso richiesto per calcolo IBW']"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="purple" />
            </template>
          </q-select>

          <!-- Bottoni -->
          <q-btn
            @click="calculateIBW"
            color="primary"
            size="lg"
            class="full-width q-mb-sm"
            icon="calculate"
            :disable="!isIBWFormValid"
          >
            Calcola IBW
          </q-btn>
          <q-btn
            @click="resetIBWForm"
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

    <!-- Pannello Risultati IBW -->
    <div class="col-12 col-md-6">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">📊 Risultati IBW</h6>

          <div v-if="ibwResult.hamwi > 0">
            <!-- Tabella Comparazione Formule -->
            <q-markup-table class="q-mb-md">
              <thead>
                <tr>
                  <th class="text-left">Formula</th>
                  <th class="text-right">IBW (kg)</th>
                  <th class="text-right">Range ±10%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Hamwi</strong></td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ ibwResult.hamwi.toFixed(1) }}
                  </td>
                  <td class="text-right text-caption">
                    {{ (ibwResult.hamwi * 0.9).toFixed(1) }} -
                    {{ (ibwResult.hamwi * 1.1).toFixed(1) }}
                  </td>
                </tr>
                <tr>
                  <td><strong>Robinson</strong></td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ ibwResult.robinson.toFixed(1) }}
                  </td>
                  <td class="text-right text-caption">
                    {{ (ibwResult.robinson * 0.9).toFixed(1) }} -
                    {{ (ibwResult.robinson * 1.1).toFixed(1) }}
                  </td>
                </tr>
                <tr>
                  <td><strong>PBW (ARDS)</strong></td>
                  <td class="text-right text-primary text-weight-bold">
                    {{ ibwResult.pbw.toFixed(1) }}
                  </td>
                  <td class="text-right text-caption">
                    {{ (ibwResult.pbw * 0.9).toFixed(1) }} -
                    {{ (ibwResult.pbw * 1.1).toFixed(1) }}
                  </td>
                </tr>
              </tbody>
            </q-markup-table>

            <!-- Note Cliniche IBW -->
            <q-banner class="bg-blue-1 q-mb-md" rounded>
              <template v-slot:avatar>
                <q-icon name="info" color="primary" />
              </template>
              <div class="text-caption">
                <strong>Range Accettabile:</strong> IBW ± 10% (variabilità costituzionale
                normale)<br />
                <strong>Hamwi & Robinson:</strong> Uso generale nutrizione clinica<br />
                <strong>PBW:</strong> Specifico per ventilazione meccanica ARDS
              </div>
            </q-banner>

            <!-- 6️⃣ Applicazioni Cliniche IBW -->
            <q-expansion-item
              icon="local_hospital"
              label="6️⃣ Applicazioni Cliniche IBW"
              class="q-mt-md"
              header-class="bg-purple-1 text-purple-9"
            >
              <q-card class="bg-purple-1">
                <q-card-section>
                  <ul class="text-body2 q-mb-none">
                    <li class="q-mb-sm">
                      <strong>Valutazione Nutrizionale:</strong> Baseline per calcolo fabbisogno
                      calorico (25-30 kcal/kg IBW) e proteico (1.0-1.5 g/kg IBW)
                    </li>
                    <li class="q-mb-sm">
                      <strong>Ventilazione Meccanica:</strong> Volume tidale protettivo ARDS = 6
                      mL/kg PBW (Brower et al. 2002)
                    </li>
                    <li class="q-mb-sm">
                      <strong>Dosaggio Farmaci Idrofili:</strong> Aminoglicosidi, vancomicina dosati
                      su IBW in pazienti obesi
                    </li>
                    <li class="q-mb-sm">
                      <strong>Screening Malnutrizione:</strong> Peso attuale/IBW &lt;90% = lieve,
                      &lt;80% = moderata, &lt;70% = severa
                    </li>
                  </ul>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <!-- 4️⃣ Formule IBW -->
            <q-expansion-item
              icon="functions"
              label="4️⃣ Formule IBW"
              class="q-mt-md"
              header-class="bg-cyan-1 text-cyan-9"
            >
              <q-card class="bg-cyan-1">
                <q-card-section>
                  <p class="text-body2 q-mb-sm">
                    <strong>Hamwi (1964):</strong><br />
                    Maschi: 48 kg + 2.7 kg × (altezza_cm - 152.4) / 2.54<br />
                    Femmine: 45.5 kg + 2.25 kg × (altezza_cm - 152.4) / 2.54
                  </p>
                  <p class="text-body2 q-mb-sm">
                    <strong>Robinson (1983):</strong><br />
                    Maschi: 52 kg + 1.9 kg × (altezza_inch - 60)<br />
                    Femmine: 49 kg + 1.7 kg × (altezza_inch - 60)
                  </p>
                  <p class="text-body2 q-mb-none">
                    <strong>PBW - Predicted Body Weight (ARDSNet 2000):</strong><br />
                    Maschi: 50 + 0.91 × (altezza_cm - 152.4)<br />
                    Femmine: 45.5 + 0.91 × (altezza_cm - 152.4)
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>

          <div v-else class="text-center text-grey-6 q-pa-xl">
            <q-icon name="info" size="lg" class="q-mb-md" />
            <p class="text-body2">Inserisci altezza e sesso per calcolare l'IBW</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
