<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :type="type"
    :step="step"
    :label="label"
    :suffix="unit"
    outlined
    :class="inputClass"
    :rules="validationRules"
    :hint="hint"
    :readonly="readonly"
    :disable="disable"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" :color="iconColor" class="medical-input-icon" />
    </template>

    <template v-slot:append v-if="hasInfo">
      <q-btn flat dense round icon="info" color="info" size="sm" @click="showInfo = true" />
    </template>
  </q-input>

  <!-- Dialog informativo -->
  <q-dialog v-model="showInfo" v-if="hasInfo">
    <q-card class="medical-info-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ label }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="text-body2 q-mb-sm"><strong>Valori normali:</strong> {{ normalRange }}</div>
        <div class="text-body2 q-mb-sm"><strong>Descrizione:</strong> {{ description }}</div>
        <div class="text-body2" v-if="clinicalNote">
          <strong>Note cliniche:</strong> {{ clinicalNote }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  modelValue: number | string | null;
  label: string;
  icon: string;
  iconColor?: string;
  unit?: string;
  type?: 'number' | 'text';
  step?: string;
  min?: number;
  max?: number;
  required?: boolean;
  hint?: string;
  readonly?: boolean;
  disable?: boolean;
  // Info aggiuntive
  normalRange?: string;
  description?: string;
  clinicalNote?: string;
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: 'primary',
  type: 'number',
  step: '0.1',
  required: false,
  readonly: false,
  disable: false,
});

// Emits
defineEmits<{
  'update:modelValue': [value: number | string | null];
}>();

// State
const showInfo = ref(false);

// Computed
const hasInfo = computed(() => {
  return !!(props.normalRange || props.description || props.clinicalNote);
});

const inputClass = computed(() => {
  return `medical-input q-mb-md ${props.required ? 'medical-input--required' : ''}`;
});

const validationRules = computed(() => {
  const rules: ((val: number | string | null) => boolean | string)[] = [];

  if (props.required) {
    rules.push((val: number | string | null) => {
      if (val === null || val === undefined || val === '') {
        return 'Campo obbligatorio';
      }
      return true;
    });
  }

  if (props.type === 'number') {
    rules.push((val: number | string | null) => {
      if (val !== null && val !== undefined && val !== '') {
        const num = Number(val);
        if (isNaN(num)) return 'Inserire un numero valido';
        if (props.min !== undefined && num < props.min) {
          return `Valore minimo: ${props.min}`;
        }
        if (props.max !== undefined && num > props.max) {
          return `Valore massimo: ${props.max}`;
        }
      }
      return true;
    });
  }

  return rules;
});
</script>

<style scoped>
/* Medical Input Styling */
.medical-input {
  transition: all 0.3s ease;
}

.medical-input :deep(.q-field__control) {
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid #e8f4f8;
  transition: all 0.3s ease;
}

.medical-input :deep(.q-field__control:hover) {
  border-color: #2e7d8a;
  box-shadow: 0 2px 8px rgba(46, 125, 138, 0.1);
}

.medical-input :deep(.q-field--focused .q-field__control) {
  border-color: #2e7d8a;
  box-shadow: 0 0 0 2px rgba(46, 125, 138, 0.2);
}

.medical-input--required :deep(.q-field__label) {
  font-weight: 600;
}

.medical-input--required :deep(.q-field__label::after) {
  content: ' *';
  color: #e74c3c;
}

/* Icon Styling */
.medical-input-icon {
  transition: all 0.3s ease;
}

.medical-input :deep(.q-field--focused) .medical-input-icon {
  transform: scale(1.1);
}

/* Info Card */
.medical-info-card {
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(46, 125, 138, 0.2);
  border: 1px solid #e8f4f8;
  max-width: 400px;
}

/* Error State */
.medical-input :deep(.q-field--error .q-field__control) {
  border-color: #e74c3c;
  background: linear-gradient(135deg, #ffffff 0%, #fadbd8 100%);
}

/* Success State */
.medical-input :deep(.q-field--success .q-field__control) {
  border-color: #27ae60;
  background: linear-gradient(135deg, #ffffff 0%, #d5f4e6 100%);
}

/* Disabled State */
.medical-input :deep(.q-field--disabled .q-field__control) {
  background: #f5f6fa;
  opacity: 0.7;
}
</style>
