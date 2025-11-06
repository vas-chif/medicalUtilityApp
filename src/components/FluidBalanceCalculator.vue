/**
 * @file FluidBalanceCalculator.vue
 * @description Componente calcolatore Bilancio Idrico (Fluid Balance)
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-11-06
 *
 * Fluid Balance Calculator - Track fluid intake and output for critically ill patients
 */
<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="info" color="blue" />
      </template>
      <div class="text-body2">
        <strong>{{ $t('fluidBalance.bannerTitle') }}:</strong> {{ $t('fluidBalance.bannerText') }}
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input Entrate -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md text-blue">
              <q-icon name="arrow_downward" class="q-mr-xs" />
              {{ $t('fluidBalance.fluidIntake') }} (mL)
            </div>

            <!-- Intravenous Fluids -->
            <q-input
              v-model.number="intake.iv"
              type="number"
              step="1"
              :label="$t('fluidBalance.ivFluids')"
              suffix="mL"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => val >= 0 || $t('fluidBalance.positiveValue')]"
            >
              <template v-slot:prepend>
                <q-icon name="colorize" color="blue" size="sm" />
              </template>
            </q-input>

            <!-- Oral Intake -->
            <q-input
              v-model.number="intake.oral"
              type="number"
              step="1"
              :label="$t('fluidBalance.oralIntake')"
              suffix="mL"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => val >= 0 || $t('fluidBalance.positiveValue')]"
            >
              <template v-slot:prepend>
                <q-icon name="local_drink" color="cyan" size="sm" />
              </template>
            </q-input>

            <!-- Enteral Nutrition -->
            <q-input
              v-model.number="intake.enteral"
              type="number"
              step="1"
              :label="$t('fluidBalance.enteralNutrition')"
              suffix="mL"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => val >= 0 || $t('fluidBalance.positiveValue')]"
            >
              <template v-slot:prepend>
                <q-icon name="food_bank" color="green" size="sm" />
              </template>
            </q-input>

            <!-- Medications -->
            <q-input
              v-model.number="intake.medications"
              type="number"
              step="1"
              :label="$t('fluidBalance.medications')"
              suffix="mL"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => val >= 0 || $t('fluidBalance.positiveValue')]"
            >
              <template v-slot:prepend>
                <q-icon name="medication" color="purple" size="sm" />
              </template>
            </q-input>

            <!-- Blood Products -->
            <q-input
              v-model.number="intake.blood"
              type="number"
              step="1"
              :label="$t('fluidBalance.bloodProducts')"
              suffix="mL"
              outlined
              dense
              class="q-mb-md"
              :rules="[(val: number) => val >= 0 || $t('fluidBalance.positiveValue')]"
            >
              <template v-slot:prepend>
                <q-icon name="bloodtype" color="red" size="sm" />
              </template>
            </q-input>

            <!-- Total Intake Display -->
            <q-card flat bordered class="bg-blue-1 q-pa-sm">
              <div class="row items-center justify-between">
                <div class="text-subtitle2 text-weight-bold">
                  {{ $t('fluidBalance.totalIntake') }}:
                </div>
                <div class="text-h6 text-blue">{{ totalIntake }} mL</div>
              </div>
            </q-card>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Output Uscite -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md text-red">
              <q-icon name="arrow_upward" class="q-mr-xs" />
              {{ $t('fluidBalance.fluidOutput') }} (mL)
            </div>

            <!-- Urine Output -->
            <q-input
              v-model.number="output.urine"
              type="number"
              step="1"
              :label="$t('fluidBalance.urineOutput')"
              suffix="mL"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => val >= 0 || $t('fluidBalance.positiveValue')]"
            >
              <template v-slot:prepend>
                <q-icon name="opacity" color="amber" size="sm" />
              </template>
            </q-input>

            <!-- Drainage -->
            <q-input
              v-model.number="output.drainage"
              type="number"
              step="1"
              :label="$t('fluidBalance.drainage')"
              suffix="mL"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => val >= 0 || $t('fluidBalance.positiveValue')]"
            >
              <template v-slot:prepend>
                <q-icon name="straighten" color="brown" size="sm" />
              </template>
            </q-input>

            <!-- Vomitus -->
            <q-input
              v-model.number="output.vomitus"
              type="number"
              step="1"
              :label="$t('fluidBalance.vomitus')"
              suffix="mL"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => val >= 0 || $t('fluidBalance.positiveValue')]"
            >
              <template v-slot:prepend>
                <q-icon name="sick" color="green" size="sm" />
              </template>
            </q-input>

            <!-- Stool -->
            <q-input
              v-model.number="output.stool"
              type="number"
              step="1"
              :label="$t('fluidBalance.stool')"
              suffix="mL"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val: number) => val >= 0 || $t('fluidBalance.positiveValue')]"
            >
              <template v-slot:prepend>
                <q-icon name="healing" color="brown-5" size="sm" />
              </template>
            </q-input>

            <!-- Insensible Loss -->
            <q-input
              v-model.number="output.insensible"
              type="number"
              step="1"
              :label="$t('fluidBalance.insensibleLoss')"
              suffix="mL"
              outlined
              dense
              class="q-mb-md"
              :rules="[(val: number) => val >= 0 || $t('fluidBalance.positiveValue')]"
              :hint="$t('fluidBalance.insensibleHint')"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="grey" size="sm" />
              </template>
            </q-input>

            <!-- Total Output Display -->
            <q-card flat bordered class="bg-red-1 q-pa-sm">
              <div class="row items-center justify-between">
                <div class="text-subtitle2 text-weight-bold">
                  {{ $t('fluidBalance.totalOutput') }}:
                </div>
                <div class="text-h6 text-red">{{ totalOutput }} mL</div>
              </div>
            </q-card>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="assessment" class="q-mr-xs" />
              {{ $t('common.results') }}
            </div>

            <!-- Net Balance Display -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 q-mb-sm" :class="balanceClass">
                {{ netBalance > 0 ? '+' : '' }}{{ netBalance }} mL
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>{{ $t('fluidBalance.netBalance') }}</strong>
              </div>
              <div class="text-caption text-grey-6">
                {{ $t('fluidBalance.over24Hours') }}
              </div>
            </div>

            <q-separator class="q-mb-md" />

            <!-- Balance Interpretation -->
            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">📊 {{ $t('fluidBalance.interpretation') }}:</div>
              <q-chip :color="balanceStatusColor" text-color="white" class="text-weight-bold" size="md">
                {{ balanceStatus }}
              </q-chip>
              <div class="text-body2 q-mt-sm">
                {{ balanceDescription }}
              </div>
            </div>

            <!-- Visual Balance Chart -->
            <div class="q-mb-lg">
              <div class="text-subtitle2 q-mb-sm">📈 {{ $t('fluidBalance.visualComparison') }}:</div>
              <div class="row q-gutter-sm">
                <div class="col">
                  <div class="balance-bar bg-blue-2">
                    <div class="balance-fill bg-blue" :style="{ height: intakePercentage + '%' }">
                      <span class="balance-label">{{ totalIntake }}</span>
                    </div>
                  </div>
                  <div class="text-center text-caption q-mt-xs">
                    {{ $t('fluidBalance.intake') }}
                  </div>
                </div>
                <div class="col">
                  <div class="balance-bar bg-red-2">
                    <div class="balance-fill bg-red" :style="{ height: outputPercentage + '%' }">
                      <span class="balance-label">{{ totalOutput }}</span>
                    </div>
                  </div>
                  <div class="text-center text-caption q-mt-xs">
                    {{ $t('fluidBalance.output') }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Clinical Notes -->
            <q-expansion-item
              icon="medical_services"
              :label="$t('fluidBalance.clinicalNotes')"
              class="text-primary"
            >
              <div class="q-pa-md bg-grey-1">
                <div class="text-body2">
                  {{ getClinicalNotes() }}
                </div>
              </div>
            </q-expansion-item>

            <!-- Reset Button -->
            <q-btn
              @click="resetForm"
              color="negative"
              size="md"
              class="full-width q-mt-md"
              icon="refresh"
              outline
            >
              {{ $t('common.reset') }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ============================================================
// IMPORTS
// ============================================================
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

// ============================================================
// I18N
// ============================================================
const { t: $t } = useI18n();

// ============================================================
// TYPES
// ============================================================
/**
 * Fluid intake data interface
 */
interface FluidIntake {
  /** Intravenous fluids (mL) */
  iv: number;
  /** Oral intake (mL) */
  oral: number;
  /** Enteral nutrition (mL) */
  enteral: number;
  /** Medications (mL) */
  medications: number;
  /** Blood products (mL) */
  blood: number;
}

/**
 * Fluid output data interface
 */
interface FluidOutput {
  /** Urine output (mL) */
  urine: number;
  /** Drainage (mL) */
  drainage: number;
  /** Vomitus (mL) */
  vomitus: number;
  /** Stool (mL) */
  stool: number;
  /** Insensible loss (mL) */
  insensible: number;
}

// ============================================================
// STATE
// ============================================================
/** Initial intake values */
const initialIntake: FluidIntake = {
  iv: 0,
  oral: 0,
  enteral: 0,
  medications: 0,
  blood: 0,
};

/** Initial output values */
const initialOutput: FluidOutput = {
  urine: 0,
  drainage: 0,
  vomitus: 0,
  stool: 0,
  insensible: 500, // Default insensible loss ~500 mL/24h
};

/** Fluid intake state */
const intake = ref<FluidIntake>({ ...initialIntake });

/** Fluid output state */
const output = ref<FluidOutput>({ ...initialOutput });

// ============================================================
// COMPUTED
// ============================================================
/**
 * Calculate total fluid intake
 * @returns Total intake in mL
 */
const totalIntake = computed(() => {
  return intake.value.iv + intake.value.oral + intake.value.enteral + intake.value.medications + intake.value.blood;
});

/**
 * Calculate total fluid output
 * @returns Total output in mL
 */
const totalOutput = computed(() => {
  return (
    output.value.urine +
    output.value.drainage +
    output.value.vomitus +
    output.value.stool +
    output.value.insensible
  );
});

/**
 * Calculate net fluid balance
 * @returns Net balance in mL (positive = excess, negative = deficit)
 */
const netBalance = computed(() => {
  return totalIntake.value - totalOutput.value;
});

/**
 * Get balance status based on net balance
 * @returns Balance status string
 */
const balanceStatus = computed(() => {
  const balance = netBalance.value;

  if (balance > 1000) {
    return $t('fluidBalance.positiveBalance');
  } else if (balance >= -500 && balance <= 1000) {
    return $t('fluidBalance.balancedState');
  } else {
    return $t('fluidBalance.negativeBalance');
  }
});

/**
 * Get balance status color
 * @returns Color name
 */
const balanceStatusColor = computed(() => {
  const balance = netBalance.value;

  if (balance > 1000) {
    return 'orange';
  } else if (balance >= -500 && balance <= 1000) {
    return 'green';
  } else {
    return 'red';
  }
});

/**
 * Get balance class for display
 * @returns CSS class
 */
const balanceClass = computed(() => {
  const balance = netBalance.value;

  if (balance > 1000) {
    return 'text-orange';
  } else if (balance >= -500 && balance <= 1000) {
    return 'text-green';
  } else {
    return 'text-red';
  }
});

/**
 * Get balance description
 * @returns Description string
 */
const balanceDescription = computed(() => {
  const balance = netBalance.value;

  if (balance > 1000) {
    return $t('fluidBalance.positiveBalanceDesc');
  } else if (balance >= -500 && balance <= 1000) {
    return $t('fluidBalance.balancedStateDesc');
  } else {
    return $t('fluidBalance.negativeBalanceDesc');
  }
});

/**
 * Calculate intake percentage for visual display
 * @returns Percentage (0-100)
 */
const intakePercentage = computed(() => {
  const maxValue = Math.max(totalIntake.value, totalOutput.value);
  if (maxValue === 0) return 0;
  return (totalIntake.value / maxValue) * 100;
});

/**
 * Calculate output percentage for visual display
 * @returns Percentage (0-100)
 */
const outputPercentage = computed(() => {
  const maxValue = Math.max(totalIntake.value, totalOutput.value);
  if (maxValue === 0) return 0;
  return (totalOutput.value / maxValue) * 100;
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Get clinical notes based on fluid balance
 * Reference: Vincent JL, Weil MH (2006). Fluid challenge revisited. Crit Care Med 34(5): 1333-1337
 *
 * @returns Clinical notes string
 */
const getClinicalNotes = (): string => {
  const balance = netBalance.value;
  const urineOutput = output.value.urine;

  let notes = '';

  if (balance > 2000) {
    notes = $t('fluidBalance.notes2000Plus');
  } else if (balance > 1000) {
    notes = $t('fluidBalance.notes1000Plus');
  } else if (balance >= -500 && balance <= 1000) {
    notes = $t('fluidBalance.notesBalanced');
  } else if (balance < -1000) {
    notes = $t('fluidBalance.notesMinus1000');
  } else {
    notes = $t('fluidBalance.notesMinus500');
  }

  // Add note about urine output
  if (urineOutput < 400) {
    notes += ' ' + $t('fluidBalance.oliguriaNote');
  } else if (urineOutput > 3000) {
    notes += ' ' + $t('fluidBalance.polyuriaNote');
  }

  return notes;
};

/**
 * Reset form to initial state
 */
const resetForm = () => {
  intake.value = { ...initialIntake };
  output.value = { ...initialOutput };
};
</script>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

/* Balance Bar Chart */
.balance-bar {
  height: 200px;
  width: 100%;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.balance-fill {
  width: 100%;
  border-radius: 8px 8px 0 0;
  transition: height 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
}

.balance-label {
  color: white;
  font-weight: bold;
  font-size: 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .q-pa-md {
    padding: 8px;
  }

  .balance-bar {
    height: 150px;
  }
}
</style>
