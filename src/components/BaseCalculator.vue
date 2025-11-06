<!-- BaseCalculator.vue -->
<script setup lang="ts">
/**
 * @file BaseCalculator.vue
 * @description Componente base per pagine di calcolatori medici
 * @author Vasile Chifeac
 * @created 2025-03-08
 * @modified 2025-11-05
 *
 * @notes
 * - Fornisce struttura comune per pagine di calcolatori medici
 * - Include header, sezioni input/risultati, stili coerenti
 */

interface Props {
  title: string;
  subtitle: string;
  icon: string;
  inputSectionTitle?: string;
  resultSectionTitle?: string;
  calculateButtonText?: string;
  isFormValid: boolean;
  calculating?: boolean;
}

withDefaults(defineProps<Props>(), {
  inputSectionTitle: 'Parametri',
  resultSectionTitle: 'Risultati',
  calculateButtonText: 'Calcola',
  calculating: false,
});

// Emits
defineEmits<{
  calculate: [];
}>();
</script>

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
        <q-breadcrumbs-el :label="title" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none medical-title">{{ icon }} {{ title }}</h4>
      <p class="text-subtitle1 text-grey-7 medical-subtitle">{{ subtitle }}</p>
    </div>

    <div class="row q-gutter-lg">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card class="medical-input-card">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md medical-section-title">
              📊 {{ inputSectionTitle }}
            </h6>

            <!-- Slot per i campi input specifici -->
            <slot name="inputs" />

            <!-- Bottone Calcola -->
            <q-btn
              @click="$emit('calculate')"
              color="primary"
              size="lg"
              class="full-width medical-calculate-btn"
              icon="calculate"
              :disable="!isFormValid"
              :loading="calculating"
            >
              {{ calculateButtonText }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12 col-md-6">
        <q-card class="medical-results-card">
          <q-card-section>
            <h6 class="text-h6 q-ma-none q-mb-md medical-section-title">
              📈 {{ resultSectionTitle }}
            </h6>

            <!-- Slot per i risultati specifici -->
            <slot name="results" />

            <!-- Slot per informazioni aggiuntive -->
            <slot name="additional-info" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Slot per contenuto extra (es. grafici, tabelle) -->
    <div v-if="$slots['extra-content']" class="q-mt-lg">
      <slot name="extra-content" />
    </div>
  </q-page>
</template>

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

.medical-calculate-btn:disabled {
  background: #bdc3c7 !important;
  color: white !important;
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 768px) {
  .medical-calculator-page {
    padding: 12px;
  }

  .medical-title {
    font-size: 1.5rem;
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
