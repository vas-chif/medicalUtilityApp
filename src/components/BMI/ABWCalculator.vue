<!-- ABWCalculator.vue -->
<script setup lang="ts">
/**
 * @file ABWCalculator.vue
 * @description Adjusted Body Weight Calculator per gestione obesità (25% correction factor)
 * @author Vasile Chifeac
 * @created 2025-11-16
 *
 * @notes
 * - Componente estratto da BMICalculatorPage.vue Tab 4
 * - Formula: ABW = IBW + 0.25 × (Actual Weight - IBW)
 * - Applicazioni: dosaggio farmaci lipofili, nutrizione obesità
 * - Solo 25% eccesso peso è metabolicamente attivo
 */

import { ref, computed } from 'vue';

interface ABWFormData {
  actualWeight: number | null;
  ibw: number | null;
}

interface ABWResult {
  abw: number;
  excessWeight: number;
  percentActive: number;
}

const initialABWForm: ABWFormData = {
  actualWeight: null,
  ibw: null,
};

const initialABWResult: ABWResult = {
  abw: 0,
  excessWeight: 0,
  percentActive: 25,
};

const abwForm = ref<ABWFormData>({ ...initialABWForm });
const abwResult = ref<ABWResult>({ ...initialABWResult });

const isABWFormValid = computed(() => {
  return (
    abwForm.value.actualWeight !== null &&
    abwForm.value.actualWeight > 0 &&
    abwForm.value.ibw !== null &&
    abwForm.value.ibw > 0
  );
});

const calculateABW = () => {
  if (!isABWFormValid.value) return;

  const actualWeight = abwForm.value.actualWeight!;
  const ibw = abwForm.value.ibw!;

  // Calcolo eccesso di peso
  const excessWeight = actualWeight - ibw;

  // Formula ABW: IBW + 0.25 × (Actual - IBW)
  // Solo il 25% del peso in eccesso è metabolicamente attivo
  const abw = ibw + 0.25 * excessWeight;

  abwResult.value = {
    abw,
    excessWeight,
    percentActive: 25,
  };
};

const resetABWForm = () => {
  abwForm.value = { ...initialABWForm };
  abwResult.value = { ...initialABWResult };
};
</script>

<template>
  <div class="row q-gutter-lg">
    <!-- Pannello Input ABW -->
    <div class="col-12 col-md-5">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">⚖️ Adjusted Body Weight (ABW)</h6>
          <p class="text-caption text-grey-7 q-mb-md">
            Calcolo peso aggiustato per gestione obesità (farmacologica e nutrizionale)
          </p>

          <!-- Peso Attuale -->
          <q-input
            v-model.number="abwForm.actualWeight"
            type="number"
            step="0.1"
            label="Peso Attuale"
            suffix="kg"
            outlined
            class="q-mb-md"
            :rules="[(val) => (val > 0 && val <= 500) || 'Peso tra 1-500 kg']"
          >
            <template v-slot:prepend>
              <q-icon name="fitness_center" color="blue" />
            </template>
          </q-input>

          <!-- IBW (manual input) -->
          <q-input
            v-model.number="abwForm.ibw"
            type="number"
            step="0.1"
            label="Ideal Body Weight (IBW)"
            suffix="kg"
            outlined
            class="q-mb-md"
            hint="Calcolato dalla tab IBW o inserisci manualmente"
            :rules="[(val) => (val > 0 && val <= 200) || 'IBW tra 1-200 kg']"
          >
            <template v-slot:prepend>
              <q-icon name="straighten" color="green" />
            </template>
          </q-input>

          <!-- Bottoni -->
          <q-btn
            @click="calculateABW"
            color="primary"
            size="lg"
            class="full-width q-mb-sm"
            icon="calculate"
            :disable="!isABWFormValid"
          >
            Calcola ABW
          </q-btn>
          <q-btn
            @click="resetABWForm"
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

    <!-- Pannello Risultati ABW -->
    <div class="col-12 col-md-6">
      <q-card class="q-pa-md">
        <q-card-section>
          <h6 class="text-h6 q-ma-none q-mb-md">📊 Risultati ABW</h6>

          <div v-if="abwResult.abw > 0">
            <!-- Risultato Principale -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 text-primary q-mb-sm">
                {{ abwResult.abw.toFixed(1) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>kg</strong> (Adjusted Body Weight)
              </div>
            </div>

            <q-separator class="q-mb-md" />

            <!-- Dettagli Calcolo -->
            <div class="q-mb-md">
              <q-list bordered separator class="rounded-borders">
                <q-item>
                  <q-item-section>
                    <q-item-label overline>Peso Attuale</q-item-label>
                    <q-item-label class="text-h6">{{ abwForm.actualWeight }} kg</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label overline>Ideal Body Weight (IBW)</q-item-label>
                    <q-item-label class="text-h6">{{ abwForm.ibw }} kg</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label overline>Eccesso di Peso</q-item-label>
                    <q-item-label class="text-h6 text-orange">
                      {{ abwResult.excessWeight.toFixed(1) }} kg
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label overline>Peso Eccesso Metabolicamente Attivo (25%)</q-item-label>
                    <q-item-label class="text-h6 text-green">
                      {{ (abwResult.excessWeight * 0.25).toFixed(1) }} kg
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Formula ABW -->
            <q-banner class="bg-blue-1 q-mb-md" rounded>
              <template v-slot:avatar>
                <q-icon name="functions" color="primary" />
              </template>
              <div class="text-body2">
                <strong>Formula:</strong> ABW = IBW + 0.25 × (Peso Attuale - IBW)<br />
                <span class="text-caption">
                  Solo il 25% dell'eccesso di peso è metabolicamente attivo
                </span>
              </div>
            </q-banner>

            <!-- Applicazioni Cliniche ABW -->
            <q-expansion-item
              icon="local_hospital"
              label="🏥 Applicazioni Cliniche ABW"
              class="text-primary"
            >
              <q-card class="q-pa-md">
                <ul class="text-body2 q-mb-none">
                  <li class="q-mb-sm">
                    <strong>Nutrizione Obesità (BMI &gt;30):</strong> Calcolare fabbisogno calorico
                    e proteico su ABW, non su peso totale (previene sovralimentazione)
                  </li>
                  <li class="q-mb-sm">
                    <strong>Farmaci Lipofili:</strong> Propofol, benzodiazepine, amiodarone -
                    dosaggio basato su ABW (accumulo nel tessuto adiposo)
                  </li>
                  <li class="q-mb-sm">
                    <strong>Farmaci Idrofili:</strong> Aminoglicosidi, vancomicina - dosaggio basato
                    su IBW (non ABW), scarsa distribuzione nel grasso
                  </li>
                  <li class="q-mb-sm">
                    <strong>Pediatria:</strong> Formule specifiche TBW/LBW per anestesia (Samuels &
                    Sjoblom 2017)
                  </li>
                  <li class="q-mb-sm">
                    <strong>Criterio Obesità:</strong> Peso attuale &gt; 120% IBW oppure BMI &ge; 30
                    kg/m²
                  </li>
                </ul>
              </q-card>
            </q-expansion-item>

            <!-- Note Cliniche -->
            <q-expansion-item icon="info" label="💡 Note Cliniche ABW" class="text-primary q-mt-sm">
              <q-card class="q-pa-md">
                <div class="text-body2">
                  <p class="q-mb-sm">
                    <strong>Razionale Fisiologico:</strong> Il tessuto adiposo in eccesso ha una
                    massa metabolicamente attiva limitata. Solo circa il 25% del peso in eccesso
                    contribuisce al metabolismo basale e al volume di distribuzione farmacologico.
                  </p>
                  <p class="q-mb-sm">
                    <strong>Esempio Pratico:</strong> Paziente 120 kg, IBW 70 kg → Eccesso 50 kg →
                    ABW = 70 + 0.25×50 = 82.5 kg. Usare 82.5 kg per calcolo calorie/proteine, non
                    120 kg.
                  </p>
                  <p class="q-mb-sm">
                    <strong>Limitazioni:</strong> Formula empirica sviluppata per adulti. Per
                    pazienti critici o pediatria considerare metodologie più accurate (LBM, FFM).
                  </p>
                  <p class="q-mb-none">
                    <strong>Alternativa:</strong> Utilizzare FFM (fat-free mass) da impedenziometria
                    o formule specifiche quando disponibili.
                  </p>
                </div>
              </q-card>
            </q-expansion-item>
          </div>

          <div v-else class="text-center text-grey-6 q-pa-xl">
            <q-icon name="info" size="lg" class="q-mb-md" />
            <p class="text-body2">Inserisci peso attuale e IBW per calcolare l'ABW</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
