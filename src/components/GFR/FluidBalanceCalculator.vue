<!-- FluidBalanceCalculator.vue -->
<script setup lang="ts">
/**
 * @file FluidBalanceCalculator.vue
 * @description 24-hour Fluid Balance calculator component for volume status assessment
 *              in critically ill patients, CKD, heart failure, and ICU monitoring.
 *              Supports Italian (current) with i18n-ready props for future English translation.
 *
 * @author Vasile Chifeac
 * @created 2025-11-16
 * @modified 2025-11-16
 *
 * @example
 * <FluidBalanceCalculator
 *   calculateButtonText="Calcola Bilancio"
 *   resetButtonText="Reset Dati"
 * />
 *
 * @notes
 * - Component extracted from GFRCalculatorPage.vue (architectural refactoring)
 * - NEWS-style documentation (9 sections: Definizione→Riferimenti)
 * - 24h intake/output monitoring with automated balance calculation
 * - Clinical decision support for euvolemia, hypervolemia, hypovolemia
 * - Responsive design for mobile/tablet/desktop
 * - Full TypeScript type safety with strict mode
 *
 * @dependencies
 * - Quasar Framework components
 *
 * @medical-references
 * - Bouchard J, et al. Crit Care Med. 2009 - Fluid accumulation and outcomes in ICU
 * - Malbrain ML, et al. Intensive Care Med. 2014 - Fluid overload in critically ill
 */

// ============================================================
// IMPORTS
// ============================================================
// Vue core
import { ref, computed } from 'vue';
// Vue I18n
import { useI18n } from 'vue-i18n';

// ============================================================
// PROPS & EMITS
// ============================================================
// Setup i18n
const { t } = useI18n({ useScope: 'global' });

/**
 * Component props definition (bilingual-ready)
 */
interface Props {
  /** Calculate button text (IT: "Calcola Bilancio", EN: "Calculate Balance") */
  calculateButtonText?: string;
  /** Reset button text (IT: "Reset Dati", EN: "Reset Data") */
  resetButtonText?: string;
  /** Component title (IT: "Bilancio Idrico 24h", EN: "24h Fluid Balance") */
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  calculateButtonText: '',
  resetButtonText: '',
  title: '',
});

/**
 * Component events definition
 */
interface Emits {
  /** Emitted when calculation is performed */
  (event: 'calculated', payload: { balance: number; status: string }): void;
}

const emit = defineEmits<Emits>();

// ============================================================
// TYPES & INTERFACES
// ============================================================

/**
 * Fluid Balance - Form data interface
 */
interface FluidBalanceData {
  /** Fluid intake sources */
  intake: {
    /** Oral liquids (mL) */
    oral: number;
    /** Water from food (mL) */
    food: number;
    /** IV infusions (mL) */
    iv: number;
  };
  /** Fluid output sources */
  output: {
    /** Urine output (mL) */
    urine: number;
    /** Stool output (mL) */
    stool: number;
    /** Insensible losses - respiration + skin (mL) */
    insensible: number;
  };
}

// ============================================================
// STATE
// ============================================================
const initialFormData: FluidBalanceData = {
  intake: {
    oral: 0,
    food: 0,
    iv: 0,
  },
  output: {
    urine: 0,
    stool: 0,
    insensible: 600, // Default estimate for insensible losses
  },
};

const formData = ref<FluidBalanceData>({ ...initialFormData });

const resetForm = () => {
  formData.value = { ...initialFormData };
};

// ============================================================
// COMPUTED
// ============================================================
/**
 * Calculate total fluid intake (24h)
 */
const totalIntake = computed(() => {
  return formData.value.intake.oral + formData.value.intake.food + formData.value.intake.iv;
});

/**
 * Calculate total fluid output (24h)
 */
const totalOutput = computed(() => {
  return (
    formData.value.output.urine + formData.value.output.stool + formData.value.output.insensible
  );
});

/**
 * Calculate net fluid balance (24h)
 * Positive = Fluid overload, Negative = Depletion
 */
const fluidBalance = computed(() => {
  return totalIntake.value - totalOutput.value;
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Calculate fluid balance (automatic via computed properties)
 */
const calculateFluidBalance = () => {
  // Calculation is automatic via computed properties
  // Emit event for parent component
  emit('calculated', {
    balance: fluidBalance.value,
    status: getFluidBalanceStatus(fluidBalance.value),
  });
};

/**
 * Get color for fluid balance status
 */
const getFluidBalanceColor = (balance: number): string => {
  if (Math.abs(balance) <= 500) return 'green'; // Euvolemic
  if (balance > 500 && balance <= 1000) return 'light-blue'; // Mild overload
  if (balance > 1000) return 'red'; // Significant overload
  if (balance < -500 && balance >= -1000) return 'orange'; // Mild depletion
  return 'deep-orange'; // Significant depletion
};

/**
 * Get fluid balance status interpretation
 */
const getFluidBalanceStatus = (balance: number): string => {
  if (Math.abs(balance) <= 500) return t('fluidBalance.interpretation.euvolemic');
  if (balance > 500 && balance <= 1000) return t('fluidBalance.interpretation.mildOverload');
  if (balance > 1000) return t('fluidBalance.interpretation.significantOverload');
  if (balance < -500 && balance >= -1000) return t('fluidBalance.interpretation.mildDepletion');
  return t('fluidBalance.interpretation.significantDepletion');
};

/**
 * Get clinical notes for fluid balance value
 */
const getFluidBalanceClinicalNotes = (balance: number): string => {
  if (Math.abs(balance) <= 500) {
    return t('fluidBalance.clinicalNotes.euvolemic');
  } else if (balance > 500 && balance <= 1000) {
    return t('fluidBalance.clinicalNotes.mildOverload');
  } else if (balance > 1000) {
    return t('fluidBalance.clinicalNotes.significantOverload');
  } else if (balance < -500 && balance >= -1000) {
    return t('fluidBalance.clinicalNotes.mildDepletion');
  } else {
    return t('fluidBalance.clinicalNotes.significantDepletion');
  }
};
</script>

<template>
  <!-- ======================================================== -->
  <!-- FLUID BALANCE CALCULATOR COMPONENT                       -->
  <!-- ======================================================== -->

  <div class="fluid-balance-calculator">
    <div class="row q-gutter-lg">
      <!-- ===================================================== -->
      <!-- INPUT PANEL                                           -->
      <!-- ===================================================== -->
      <div class="col-12 col-md-5">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">{{ t('fluidBalance.inputPanel.title') }}</h6>

            <!-- ENTRATE (INPUTS) -->
            <div class="q-mb-lg">
              <div class="text-subtitle2 text-weight-bold text-green q-mb-sm">
                {{ t('fluidBalance.inputPanel.intakeTitle') }}
              </div>

              <q-input
                v-model.number="formData.intake.oral"
                type="number"
                step="10"
                :label="t('fluidBalance.inputPanel.intake.oral.label')"
                :suffix="t('fluidBalance.inputPanel.intake.oral.unit')"
                outlined
                class="q-mb-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="local_drink" color="blue" size="sm" />
                </template>
              </q-input>

              <q-input
                v-model.number="formData.intake.food"
                type="number"
                step="10"
                :label="t('fluidBalance.inputPanel.intake.food.label')"
                :suffix="t('fluidBalance.inputPanel.intake.food.unit')"
                outlined
                class="q-mb-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="restaurant" color="orange" size="sm" />
                </template>
              </q-input>

              <q-input
                v-model.number="formData.intake.iv"
                type="number"
                step="10"
                :label="t('fluidBalance.inputPanel.intake.iv.label')"
                :suffix="t('fluidBalance.inputPanel.intake.iv.unit')"
                outlined
                class="q-mb-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="medical_services" color="red" size="sm" />
                </template>
              </q-input>

              <q-separator class="q-my-sm" />

              <div class="text-body2 text-weight-bold text-green">
                {{ t('fluidBalance.inputPanel.intake.total') }}: {{ totalIntake.toFixed(0) }} mL
              </div>
            </div>

            <!-- USCITE (OUTPUTS) -->
            <div class="q-mb-lg">
              <div class="text-subtitle2 text-weight-bold text-red q-mb-sm">
                {{ t('fluidBalance.inputPanel.outputTitle') }}
              </div>

              <q-input
                v-model.number="formData.output.urine"
                type="number"
                step="10"
                :label="t('fluidBalance.inputPanel.output.urine.label')"
                :suffix="t('fluidBalance.inputPanel.output.urine.unit')"
                outlined
                class="q-mb-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="water_drop" color="cyan" size="sm" />
                </template>
              </q-input>

              <q-input
                v-model.number="formData.output.stool"
                type="number"
                step="10"
                :label="t('fluidBalance.inputPanel.output.stool.label')"
                :suffix="t('fluidBalance.inputPanel.output.stool.unit')"
                outlined
                class="q-mb-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="masks" color="brown" size="sm" />
                </template>
              </q-input>

              <q-input
                v-model.number="formData.output.insensible"
                type="number"
                step="50"
                :label="t('fluidBalance.inputPanel.output.insensible.label')"
                :suffix="t('fluidBalance.inputPanel.output.insensible.unit')"
                outlined
                class="q-mb-sm"
                :hint="t('fluidBalance.inputPanel.output.insensible.hint')"
              >
                <template v-slot:prepend>
                  <q-icon name="air" color="grey" size="sm" />
                </template>
              </q-input>

              <q-separator class="q-my-sm" />

              <div class="text-body2 text-weight-bold text-red">
                {{ t('fluidBalance.inputPanel.output.total') }}: {{ totalOutput.toFixed(0) }} mL
              </div>
            </div>

            <!-- Bottone Calcola -->
            <q-btn
              @click="calculateFluidBalance"
              color="primary"
              size="lg"
              class="full-width q-mb-sm"
              icon="calculate"
            >
              {{ props.calculateButtonText || t('fluidBalance.buttons.calculate') }}
            </q-btn>

            <!-- Bottone Reset -->
            <q-btn
              @click="resetForm"
              color="negative"
              size="md"
              class="full-width"
              icon="refresh"
              outline
            >
              {{ props.resetButtonText || t('fluidBalance.buttons.reset') }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- ===================================================== -->
      <!-- RESULTS PANEL                                         -->
      <!-- ===================================================== -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md">{{ t('fluidBalance.resultsPanel.title') }}</h6>

            <!-- Risultato Principale -->
            <div class="text-center q-mb-lg">
              <div class="text-h3 q-mb-sm" :class="fluidBalance >= 0 ? 'text-red' : 'text-orange'">
                {{ fluidBalance > 0 ? '+' : '' }}{{ fluidBalance.toFixed(0) }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                <strong>{{ t('fluidBalance.resultsPanel.balance.label') }}</strong>
                {{ t('fluidBalance.resultsPanel.balance.subtitle') }}
              </div>
              <div class="text-caption text-grey-6">
                {{ t('fluidBalance.resultsPanel.balance.formula') }}
              </div>
            </div>

            <q-separator class="q-mb-md" />

            <!-- Interpretazione -->
            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">
                {{ t('fluidBalance.resultsPanel.volumeStatus.title') }}
              </div>
              <q-chip
                :color="getFluidBalanceColor(fluidBalance)"
                text-color="white"
                class="text-weight-bold"
                size="lg"
              >
                {{ getFluidBalanceStatus(fluidBalance) }}
              </q-chip>
              <div class="text-body2 q-mt-sm text-grey-8">
                {{ getFluidBalanceClinicalNotes(fluidBalance) }}
              </div>
            </div>

            <!-- Balance Bar Visualization -->
            <div class="q-mb-lg">
              <div class="text-subtitle2 q-mb-sm">
                {{ t('fluidBalance.resultsPanel.visualization.title') }}
              </div>
              <div class="balance-bar-container">
                <div class="balance-bar">
                  <div
                    class="balance-indicator"
                    :style="{
                      width: Math.abs((fluidBalance / 3000) * 50) + '%',
                      left: fluidBalance >= 0 ? '50%' : 'auto',
                      right: fluidBalance < 0 ? '50%' : 'auto',
                      backgroundColor: fluidBalance >= 0 ? 'var(--q-negative)' : 'var(--q-warning)',
                    }"
                  ></div>
                  <div class="balance-center"></div>
                </div>
                <div class="balance-labels row justify-between q-mt-xs">
                  <span class="text-caption text-orange">-3000</span>
                  <span class="text-caption text-green">0</span>
                  <span class="text-caption text-red">+3000</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div style="min-width: 100%">
      <!-- ================================================= -->
      <!-- NEWS-STYLE DOCUMENTATION (9 SECTIONS)             -->
      <!-- ================================================= -->

      <!-- Definizione e Significato Clinico -->
      <q-expansion-item
        icon="info"
        :label="t('fluidBalance.sections.definition.title')"
        class="q-mt-sm"
        header-class="bg-blue-1 text-blue-9"
      >
        <q-card class="bg-blue-1 q-pa-md">
          <p class="text-body2 q-mb-sm">
            <strong>{{ t('fluidBalance.sections.definition.content.definitionLabel') }}</strong>
            {{ t('fluidBalance.sections.definition.content.definition') }}
          </p>
          <p class="text-body2 q-mb-sm">
            <strong>{{ t('fluidBalance.sections.definition.content.interpretationLabel') }}</strong>
          </p>
          <ul class="text-body2 q-mb-sm">
            <li v-for="idx in 3" :key="idx">
              <span
                v-html="t(`fluidBalance.sections.definition.content.interpretation[${idx - 1}]`)"
              ></span>
            </li>
          </ul>
          <q-banner class="bg-blue-2 text-blue-9 q-mt-md" rounded>
            <template v-slot:avatar>
              <q-icon name="info" color="blue" size="sm" />
            </template>
            <div class="text-caption">
              <strong>{{ t('fluidBalance.sections.definition.content.note.title') }}</strong>
              {{ t('fluidBalance.sections.definition.content.note.text') }}
            </div>
          </q-banner>
        </q-card>
      </q-expansion-item>

      <!-- Fisiologia del Bilancio Idrico -->
      <q-expansion-item
        icon="biotech"
        :label="t('fluidBalance.sections.physiology.title')"
        class="q-mt-sm"
        header-class="bg-green-1 text-green-9"
      >
        <q-card class="bg-green-1 q-pa-md">
          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.physiology.content.distributionTitle') }}
          </p>
          <ul class="text-body2 q-mb-md">
            <li v-for="idx in 3" :key="idx">
              <span
                v-html="t(`fluidBalance.sections.physiology.content.distribution[${idx - 1}]`)"
              ></span>
            </li>
          </ul>
          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.physiology.content.regulationTitle') }}
          </p>
          <ul class="text-body2">
            <li v-for="idx in 3" :key="idx">
              <span
                v-html="t(`fluidBalance.sections.physiology.content.regulation[${idx - 1}]`)"
              ></span>
            </li>
          </ul>
        </q-card>
      </q-expansion-item>

      <!-- Come si Misura -->
      <q-expansion-item
        icon="speed"
        :label="t('fluidBalance.sections.measurement.title')"
        class="q-mt-sm"
        header-class="bg-amber-1 text-amber-9"
      >
        <q-card class="bg-amber-1 q-pa-md">
          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.measurement.content.intakeTitle') }}
          </p>
          <ul class="text-body2 q-mb-md">
            <li v-for="idx in 4" :key="idx">
              <span
                v-html="t(`fluidBalance.sections.measurement.content.intake[${idx - 1}]`)"
              ></span>
            </li>
          </ul>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.measurement.content.outputTitle') }}
          </p>
          <ul class="text-body2">
            <li v-for="idx in 6" :key="idx">
              <span
                v-html="t(`fluidBalance.sections.measurement.content.output[${idx - 1}]`)"
              ></span>
            </li>
          </ul>
          <q-banner class="bg-amber-2 text-amber-9 q-mt-md" rounded>
            <template v-slot:avatar>
              <q-icon name="tips_and_updates" color="amber" size="sm" />
            </template>
            <div class="text-caption">
              <strong>{{ t('fluidBalance.sections.measurement.content.note.title') }}</strong>
              {{ t('fluidBalance.sections.measurement.content.note.text') }}
            </div>
          </q-banner>
        </q-card>
      </q-expansion-item>

      <!-- Formula di Calcolo -->
      <q-expansion-item
        icon="functions"
        :label="t('fluidBalance.sections.formula.title')"
        class="q-mt-sm"
        header-class="bg-cyan-1 text-cyan-9"
      >
        <q-card class="bg-cyan-1 q-pa-md">
          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.formula.content.mainFormulaLabel') }}
          </p>
          <p
            class="text-body2 q-mb-md"
            v-html="t('fluidBalance.sections.formula.content.mainFormula')"
          ></p>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.formula.content.exampleTitle') }}
          </p>
          <div
            class="bg-grey-2 q-pa-md rounded-borders text-body2"
            v-html="t('fluidBalance.sections.formula.content.example')"
          ></div>
        </q-card>
      </q-expansion-item>

      <!-- Interpretazione Risultati -->
      <q-expansion-item
        icon="psychology"
        :label="t('fluidBalance.sections.clinicalInterpretation.title')"
        class="q-mt-sm"
        header-class="bg-orange-1 text-orange-9"
      >
        <q-card class="bg-orange-1 q-pa-md">
          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.clinicalInterpretation.content.euvolemicTitle') }}
          </p>
          <p
            class="text-body2 q-mb-md"
            v-html="t('fluidBalance.sections.clinicalInterpretation.content.euvolemic')"
          ></p>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.clinicalInterpretation.content.mildOverloadTitle') }}
          </p>
          <p
            class="text-body2 q-mb-md"
            v-html="t('fluidBalance.sections.clinicalInterpretation.content.mildOverload')"
          ></p>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.clinicalInterpretation.content.significantOverloadTitle') }}
          </p>
          <p
            class="text-body2 q-mb-md"
            v-html="t('fluidBalance.sections.clinicalInterpretation.content.significantOverload')"
          ></p>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.clinicalInterpretation.content.mildDepletionTitle') }}
          </p>
          <p
            class="text-body2 q-mb-md"
            v-html="t('fluidBalance.sections.clinicalInterpretation.content.mildDepletion')"
          ></p>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{
              t('fluidBalance.sections.clinicalInterpretation.content.significantDepletionTitle')
            }}
          </p>
          <p
            class="text-body2"
            v-html="t('fluidBalance.sections.clinicalInterpretation.content.significantDepletion')"
          ></p>
        </q-card>
      </q-expansion-item>

      <!-- Applicazioni Cliniche -->
      <q-expansion-item
        icon="local_hospital"
        :label="t('fluidBalance.sections.applications.title')"
        class="q-mt-sm"
        header-class="bg-purple-1 text-purple-9"
      >
        <q-card class="bg-purple-1 q-pa-md">
          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.applications.content.icuTitle') }}
          </p>
          <p class="text-body2 q-mb-md">
            {{ t('fluidBalance.sections.applications.content.icu') }}
          </p>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.applications.content.ckdTitle') }}
          </p>
          <p class="text-body2 q-mb-md">
            {{ t('fluidBalance.sections.applications.content.ckd') }}
          </p>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.applications.content.heartFailureTitle') }}
          </p>
          <p class="text-body2 q-mb-md">
            {{ t('fluidBalance.sections.applications.content.heartFailure') }}
          </p>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.applications.content.postOpTitle') }}
          </p>
          <p class="text-body2">
            {{ t('fluidBalance.sections.applications.content.postOp') }}
          </p>
        </q-card>
      </q-expansion-item>

      <!-- Valori Critici e Alert -->
      <q-expansion-item
        icon="warning"
        :label="t('fluidBalance.sections.referenceValues.title')"
        class="q-mt-sm"
        header-class="bg-red-1 text-red-9"
      >
        <q-card class="bg-red-1 q-pa-md">
          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.referenceValues.content.criticalValuesTitle') }}
          </p>
          <ul class="text-body2 q-mb-md">
            <li v-for="idx in 4" :key="idx">
              <span
                v-html="
                  t(`fluidBalance.sections.referenceValues.content.criticalValues[${idx - 1}]`)
                "
              ></span>
            </li>
          </ul>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.referenceValues.content.populationsTitle') }}
          </p>
          <ul class="text-body2 q-mb-md">
            <li v-for="idx in 3" :key="idx">
              <span
                v-html="t(`fluidBalance.sections.referenceValues.content.populations[${idx - 1}]`)"
              ></span>
            </li>
          </ul>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.referenceValues.content.monitoringTitle') }}
          </p>
          <p class="text-body2">
            {{ t('fluidBalance.sections.referenceValues.content.monitoring') }}
          </p>
        </q-card>
      </q-expansion-item>

      <!-- Documentazione Clinica -->
      <q-expansion-item
        icon="menu_book"
        :label="t('fluidBalance.sections.documentation.title')"
        class="q-mt-sm"
        header-class="bg-indigo-1 text-indigo-9"
      >
        <q-card class="bg-indigo-1 q-pa-md">
          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.documentation.content.templateTitle') }}
          </p>
          <div
            class="bg-grey-2 q-pa-md rounded-borders text-body2 q-mb-md"
            v-html="t('fluidBalance.sections.documentation.content.templateExample')"
          ></div>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.documentation.content.elementsTitle') }}
          </p>
          <ul class="text-body2">
            <li v-for="idx in 6" :key="idx">
              {{ t(`fluidBalance.sections.documentation.content.elements[${idx - 1}]`) }}
            </li>
          </ul>
        </q-card>
      </q-expansion-item>

      <!-- Riferimenti Scientifici -->
      <q-expansion-item
        icon="science"
        :label="t('fluidBalance.sections.bibliography.title')"
        class="q-mt-sm"
        header-class="bg-teal-1 text-teal-9"
      >
        <q-card class="bg-teal-1 q-pa-md">
          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.bibliography.content.publicationsTitle') }}
          </p>
          <ul class="text-body2 q-mb-md">
            <li v-for="idx in 3" :key="idx">
              <span
                v-html="t(`fluidBalance.sections.bibliography.content.publications[${idx - 1}]`)"
              ></span>
            </li>
          </ul>

          <p class="text-body2 text-weight-bold q-mb-sm">
            {{ t('fluidBalance.sections.bibliography.content.guidelinesTitle') }}
          </p>
          <ul class="text-body2">
            <li v-for="idx in 3" :key="idx">
              <span
                v-html="t(`fluidBalance.sections.bibliography.content.guidelines[${idx - 1}]`)"
              ></span>
            </li>
          </ul>

          <q-banner class="bg-teal-2 text-teal-9 q-mt-md" rounded>
            <template v-slot:avatar>
              <q-icon name="link" color="teal" size="sm" />
            </template>
            <div class="text-caption">
              <strong>{{
                t('fluidBalance.sections.bibliography.content.onlineResources.title')
              }}</strong>
              <a
                href="https://www.sccm.org/SurvivingSepsisCampaign"
                target="_blank"
                class="text-teal-9"
                >{{ t('fluidBalance.sections.bibliography.content.onlineResources.ssc') }}</a
              >
              |
              <a
                href="https://kdigo.org/guidelines/acute-kidney-injury/"
                target="_blank"
                class="text-teal-9"
                >{{ t('fluidBalance.sections.bibliography.content.onlineResources.kdigo') }}</a
              >
            </div>
          </q-banner>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

.fluid-balance-calculator {
  width: 100%;
}

/* Balance Bar Visualization */
.balance-bar-container {
  width: 100%;
}

.balance-bar {
  position: relative;
  height: 30px;
  background: linear-gradient(to right, #ff9800 0%, #ff9800 50%, #f44336 50%, #f44336 100%);
  border-radius: 15px;
  overflow: hidden;
}

.balance-indicator {
  position: absolute;
  top: 0;
  height: 100%;
  transition:
    width 0.3s ease,
    left 0.3s ease,
    right 0.3s ease;
  opacity: 0.8;
}

.balance-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background-color: #4caf50;
  z-index: 2;
}

.balance-labels {
  font-size: 11px;
  color: #666;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .fluid-balance-calculator .row {
    flex-direction: column;
  }

  .balance-bar {
    height: 25px;
  }
}
</style>
