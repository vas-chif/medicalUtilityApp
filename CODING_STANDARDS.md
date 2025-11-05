# 📋 GitHub Copilot Coding Standards

## Medical Utility Pro - Development Guidelines

> **Last Updated**: November 5, 2025  
> **Author**: Vasile Chifeac  
> **Project**: Medical Utility Pro

---

## 🎯 General Principles

1. **Professional Code Quality** - Enterprise-grade, production-ready code
2. **Type Safety First** - Full TypeScript coverage, no `any` types
3. **Medical Accuracy** - All calculations must be clinically validated
4. **Offline-First** - App must function without internet
5. **Responsive Design** - Mobile, tablet, desktop support
6. **Accessibility** - WCAG 2.1 AA compliance

---

## 📝 Vue 3 Component Structure

### **MANDATORY FILE ORDER**

```vue
<!-- ComponentName.vue -->
<script setup lang="ts">
/**
 * @file ComponentName.vue
 * @description Detailed description of component purpose and functionality
 * @author Vasile Chifeac
 * @created 2025-11-05
 * @modified 2025-11-05
 *
 * @example
 * <ComponentName :prop="value" @event="handler" />
 *
 * @notes
 * - Important implementation details
 * - Known limitations or caveats
 * - Dependencies or requirements
 */

// ============================================================
// IMPORTS
// ============================================================
// Vue core
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// Composables
import { useSomeComposable } from 'src/composables/useSomeComposable';

// Types
import type { SomeType } from 'src/types/SomeTypes';

// Components (if any)
import SomeComponent from 'src/components/SomeComponent.vue';

// ============================================================
// PROPS & EMITS
// ============================================================
/**
 * Component props definition
 */
interface Props {
  /** Prop description */
  someProp: string;
  /** Optional prop with default */
  optionalProp?: number;
}

const props = withDefaults(defineProps<Props>(), {
  optionalProp: 0,
});

/**
 * Component events definition
 */
interface Emits {
  /** Event description */
  (event: 'someEvent', payload: string): void;
}

const emit = defineEmits<Emits>();

// ============================================================
// COMPOSABLES & ROUTER
// ============================================================
const router = useRouter();
const route = useRoute();
const { someFunction } = useSomeComposable();

// ============================================================
// STATE
// ============================================================
/** State variable description */
const someState = ref<string>('');

/** Loading state */
const isLoading = ref(false);

// ============================================================
// COMPUTED
// ============================================================
/**
 * Computed description
 * @returns Description of return value
 */
const someComputed = computed(() => {
  return someState.value.toUpperCase();
});

// ============================================================
// WATCHERS
// ============================================================
/**
 * Watch description and purpose
 */
watch(someState, (newValue, oldValue) => {
  console.log(`State changed from ${oldValue} to ${newValue}`);
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Function description
 * @param param - Parameter description
 * @returns Return value description
 */
const someFunction = (param: string): void => {
  // Implementation
};

/**
 * Async function description
 */
const asyncFunction = async (): Promise<void> => {
  try {
    isLoading.value = true;
    // Async operations
  } catch (error) {
    console.error('Error:', error);
  } finally {
    isLoading.value = false;
  }
};

// ============================================================
// LIFECYCLE HOOKS
// ============================================================
/**
 * Component mounted hook
 */
onMounted(() => {
  // Initialization logic
});
</script>

<template>
  <!-- ======================================================== -->
  <!-- COMPONENT TEMPLATE                                       -->
  <!-- ======================================================== -->

  <div class="component-container">
    <!-- Content here -->
  </div>
</template>

<style scoped>
/* ============================================================ */
/* COMPONENT STYLES                                             */
/* ============================================================ */

.component-container {
  /* Styles */
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .component-container {
    /* Mobile styles */
  }
}
</style>
```

---

## 📄 TypeScript File Structure

### **File Header Template**

```typescript
/**
 * @file fileName.ts
 * @description Detailed description of file purpose
 * @author Vasile Chifeac
 * @created 2025-11-05
 * @modified 2025-11-05
 *
 * @module ModuleName
 *
 * @example
 * import { someFunction } from 'src/path/fileName';
 * const result = someFunction(param);
 *
 * @notes
 * - Important implementation notes
 * - External dependencies
 * - Performance considerations
 */

// ============================================================
// IMPORTS
// ============================================================
import { ref, computed } from 'vue';
import type { SomeType } from './types';

// ============================================================
// TYPES & INTERFACES
// ============================================================
/**
 * Interface description
 */
export interface SomeInterface {
  /** Property description */
  property: string;
}

/**
 * Type alias description
 */
export type SomeType = string | number;

// ============================================================
// CONSTANTS
// ============================================================
/**
 * Constant description
 */
export const SOME_CONSTANT = 'value';

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Function description
 *
 * @param param1 - First parameter description
 * @param param2 - Second parameter description
 * @returns Return value description
 *
 * @example
 * const result = someFunction('value', 123);
 *
 * @throws {Error} When invalid input provided
 */
export function someFunction(param1: string, param2: number): string {
  // Implementation
  return `${param1}-${param2}`;
}

// ============================================================
// EXPORTS
// ============================================================
export default {
  someFunction,
  SOME_CONSTANT,
};
```

---

## 🎨 Naming Conventions

### Files

- **Components**: PascalCase - `BaseCalculator.vue`, `MedicalInput.vue`
- **Pages**: PascalCase with suffix - `APGARScorePage.vue`
- **Composables**: camelCase with prefix - `useDrugCompatibility.ts`
- **Types**: PascalCase - `DrugTypes.ts`, `CalculatorTypes.ts`
- **Utils**: camelCase - `formatters.ts`, `validators.ts`

### Variables & Functions

- **Variables**: camelCase - `patientWeight`, `calculationResult`
- **Constants**: UPPER_SNAKE_CASE - `MAX_DOSE`, `DEFAULT_TIMEOUT`
- **Functions**: camelCase - `calculateDose()`, `validateInput()`
- **Async Functions**: camelCase with descriptive name - `fetchDrugData()`
- **Event Handlers**: `handle` prefix - `handleSubmit()`, `handleInputChange()`

### Components

- **Props**: camelCase - `patientAge`, `drugName`
- **Events**: kebab-case - `@update-value`, `@calculation-complete`
- **Slots**: kebab-case - `<template #error-message>`

### CSS Classes

- **BEM Methodology** (Block Element Modifier)
  ```css
  .calculator-card {
  }
  .calculator-card__header {
  }
  .calculator-card__header--active {
  }
  ```

---

## 🔧 Medical Calculator Standards

### Calculation Functions

```typescript
/**
 * Calculate BMI (Body Mass Index)
 *
 * Formula: BMI = weight(kg) / height(m)²
 * Reference: WHO Technical Report Series 894
 *
 * @param weight - Patient weight in kilograms
 * @param height - Patient height in centimeters
 * @returns BMI value rounded to 1 decimal place
 *
 * @throws {Error} If weight or height are invalid
 *
 * @example
 * const bmi = calculateBMI(70, 175); // Returns 22.9
 */
export function calculateBMI(weight: number, height: number): number {
  // Input validation
  if (weight <= 0 || weight > 500) {
    throw new Error('Invalid weight: must be between 0 and 500 kg');
  }
  if (height <= 0 || height > 300) {
    throw new Error('Invalid height: must be between 0 and 300 cm');
  }

  // Convert height from cm to meters
  const heightInMeters = height / 100;

  // Calculate BMI
  const bmi = weight / heightInMeters ** 2;

  // Return rounded result
  return Math.round(bmi * 10) / 10;
}
```

### Validation Rules

```typescript
/**
 * Medical input validation rules
 */
export const VALIDATION_RULES = {
  /** Weight validation (kg) */
  weight: {
    min: 0.1,
    max: 500,
    required: true,
    message: 'Weight must be between 0.1 and 500 kg',
  },

  /** Age validation (years) */
  age: {
    min: 0,
    max: 150,
    required: true,
    message: 'Age must be between 0 and 150 years',
  },

  /** Creatinine validation (mg/dL) */
  creatinine: {
    min: 0.1,
    max: 30,
    required: true,
    message: 'Creatinine must be between 0.1 and 30 mg/dL',
  },
} as const;
```

---

## 🧪 Drug Compatibility Standards

### Database Entry

```typescript
/**
 * Drug database entry structure
 */
export interface Drug {
  /** Unique drug identifier */
  id: string;

  /** Commercial drug name */
  name: string;

  /** Active pharmaceutical ingredient */
  activeIngredient: string;

  /** Drug therapeutic category */
  category: DrugCategory;

  /** Standard concentration for IV administration */
  concentration: string;

  /** Primary route of administration */
  route: AdministrationRoute;

  /** Clinical notes and warnings */
  clinicalNotes: string;
}
```

### Compatibility Checking

```typescript
/**
 * Check drug compatibility
 *
 * @param drug1 - First drug name
 * @param drug2 - Second drug name
 * @returns Compatibility status (C, Y, I, !, or '')
 *
 * @example
 * const compatibility = checkCompatibility('Amikacin', 'Heparin');
 * // Returns 'C' (Compatible)
 */
export function checkCompatibility(drug1: string, drug2: string): DrugCompatibility {
  // Implementation
}
```

---

## ✅ Code Quality Checklist

### Before Committing

- [ ] **No TypeScript errors** - Run `yarn type-check`
- [ ] **No ESLint errors** - Run `yarn lint`
- [ ] **Formatted code** - Run `yarn format`
- [ ] **All comments in English** - Professional, clear documentation
- [ ] **File headers present** - Every file has proper header comment
- [ ] **Functions documented** - JSDoc comments for all exported functions
- [ ] **No console.logs** - Remove debug statements (use proper logging)
- [ ] **Responsive tested** - Check mobile, tablet, desktop views
- [ ] **Accessibility checked** - Keyboard navigation, screen readers
- [ ] **Clinical accuracy verified** - Medical calculations validated against references

---

## 📦 Import Organization

### Order of Imports

```typescript
// 1. Vue core
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

// 2. Third-party libraries
import { date } from 'quasar';

// 3. Type imports
import type { Drug, Compatibility } from 'src/types/DrugTypes';

// 4. Composables
import { useDrugCompatibility } from 'src/composables/useDrugCompatibility';

// 5. Components
import BaseCalculator from 'src/components/BaseCalculator.vue';
import MedicalInput from 'src/components/MedicalInput.vue';

// 6. Utils and helpers
import { formatDate, validateInput } from 'src/utils/helpers';

// 7. Constants
import { DRUG_CATEGORIES } from 'src/constants/drugConstants';
```

---

## 🎯 Commit Message Format

### Conventional Commits

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling

### Examples

```bash
feat(calculator): add GFR calculator with MDRD and CKD-EPI formulas

- Implement MDRD formula for eGFR calculation
- Add CKD-EPI formula as alternative
- Include age, gender, race adjustments
- Add clinical interpretation and CKD staging

Closes #12

---

fix(drug-compatibility): correct Amikacin-Furosemide interaction

Previous database had incorrect compatibility status.
Updated to 'I' (Incompatible) based on Micromedex reference.

Refs: Micromedex IV Compatibility Database 2025

---

docs(readme): update installation instructions for Node 18+

Added prerequisite version requirements and troubleshooting section.
```

---

## 🚨 Error Handling

### Try-Catch Pattern

```typescript
/**
 * Async operation with proper error handling
 */
const fetchDrugData = async (drugId: string): Promise<Drug | null> => {
  try {
    isLoading.value = true;

    const response = await api.getDrug(drugId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    // Log error for debugging
    console.error('[fetchDrugData] Error:', error);

    // Show user-friendly message
    showNotification({
      type: 'negative',
      message: 'Unable to fetch drug data. Please try again.',
    });

    return null;
  } finally {
    isLoading.value = false;
  }
};
```

---

## 📱 Responsive Design

### Breakpoints

```scss
/* Mobile First Approach */

/* Mobile (default) */
.component {
  padding: 16px;
}

/* Tablet: >= 768px */
@media (min-width: 768px) {
  .component {
    padding: 24px;
  }
}

/* Desktop: >= 1024px */
@media (min-width: 1024px) {
  .component {
    padding: 32px;
  }
}

/* Large Desktop: >= 1440px */
@media (min-width: 1440px) {
  .component {
    padding: 40px;
  }
}
```

---

## 🔐 Security & Privacy

### Medical Data Handling

```typescript
/**
 * NEVER log sensitive patient data
 * NEVER store PHI without encryption
 * ALWAYS validate and sanitize inputs
 * ALWAYS use HTTPS in production
 */

// ❌ BAD - Logs patient data
console.log('Patient weight:', patientWeight);

// ✅ GOOD - Logs only non-sensitive info
console.log('Calculation performed for weight input');

// ❌ BAD - Stores unencrypted data
localStorage.setItem('patientData', JSON.stringify(data));

// ✅ GOOD - Uses session storage with no PHI
sessionStorage.setItem('calculationHistory', JSON.stringify(results));
```

---

## 🎯 Performance Optimization

### Vue 3 Best Practices

```vue
<script setup lang="ts">
// ✅ GOOD - Use computed for derived state
const filteredDrugs = computed(() => {
  return drugs.value.filter((drug) => drug.category === selectedCategory.value);
});

// ❌ BAD - Recalculating in template
// <div v-for="drug in drugs.filter(d => d.category === selected)">

// ✅ GOOD - Debounce expensive operations
import { debounce } from 'quasar';

const searchDrugs = debounce((query: string) => {
  // Expensive search operation
}, 300);

// ✅ GOOD - Lazy load heavy components
const DrugCompatibilityPage = defineAsyncComponent(
  () => import('src/pages/DrugCompatibilityPage.vue'),
);
</script>
```

---

## 📚 References & Resources

### Medical Guidelines

- **WHO**: World Health Organization standards
- **AHA**: American Heart Association guidelines
- **ERC**: European Resuscitation Council protocols
- **ESPEN**: European Society for Clinical Nutrition

### Technical Documentation

- **Vue 3**: https://vuejs.org/guide/
- **Quasar**: https://quasar.dev/
- **TypeScript**: https://www.typescriptlang.org/docs/

### Drug Information

- **Micromedex**: IV compatibility database
- **Lexicomp**: Drug interaction checker
- **DrugBank**: Pharmacological database

---

## 🤝 Code Review Checklist

### Reviewer Guidelines

- [ ] Code follows file structure standards
- [ ] All functions have JSDoc comments
- [ ] TypeScript types are properly defined
- [ ] No `any` types used
- [ ] Medical calculations are correct
- [ ] References provided for clinical data
- [ ] Error handling is comprehensive
- [ ] Responsive design implemented
- [ ] Accessibility features present
- [ ] Performance optimized
- [ ] Security best practices followed
- [ ] Tests provided (when applicable)

---

## ⚡ Quick Reference

### Component Creation

```bash
# Create new calculator page
copilot: "Create APGARScorePage.vue following standards"

# Create reusable component
copilot: "Create MedicalInput.vue component following standards"

# Create composable
copilot: "Create useDrugCompatibility.ts composable following standards"
```

### Expected Output

- File header with complete documentation
- Proper structure (script → template → style)
- TypeScript types fully defined
- Professional English comments
- Error handling included
- Responsive design
- Accessibility features

---

<div align="center">

**These standards ensure professional, maintainable, and clinically accurate code**

✅ **Follow these guidelines for every file created or modified**

</div>
