# 📋 GitHub Copilot Coding Standards

## Medical Utility Pro - Development Guidelines

> **Last Updated**: November 17, 2025  
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
7. **§ 🏗️ ARCHITETTURA COMPONENTI** - Pages as orchestrators, Components contain logic (REGOLE_COPILOT.md lines 287-443)

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

## 🏗️ Page Orchestrator Structure (§ ARCHITETTURA COMPONENTI)

### **MANDATORY PAGE TEMPLATE** (src/pages/\*Page.vue)

> **Reference**: REGOLE_COPILOT.md § 🏗️ ARCHITETTURA COMPONENTI (lines 287-443)  
> **Pattern**: Pages as orchestrators - Components contain business logic  
> **Max Size**: 180-400 lines (layout + navigation ONLY)

```vue
<!-- PageName.vue -->
<script setup lang="ts">
/**
 * @file PageName.vue
 * @description Page Orchestrator - [Brief description of page purpose]
 * @author Vasile Chifeac
 * @created YYYY-MM-DD
 * @modified YYYY-MM-DD
 *
 * @example
 * Route: /page-route
 * <PageName />
 *
 * @notes
 * - Page orchestrator con pattern § 🏗️ ARCHITETTURA COMPONENTI
 * - N tabs: [Tab1, Tab2, Tab3, ...]
 * - Componenti estratti in src/components/[PageName]/
 * - Refactoring architetturale: XXXX → YYY righe Page + N componenti modulari
 *
 * @dependencies
 * - Component1.vue: [Brief description]
 * - Component2.vue: [Brief description]
 * - Component3.vue: [Brief description]
 */

// ============================================================
// IMPORTS
// ============================================================
import { ref } from 'vue';

// Componenti modulari (Page-based folder structure)
import Component1 from 'src/components/[PageName]/Component1.vue';
import Component2 from 'src/components/[PageName]/Component2.vue';
import Component3 from 'src/components/[PageName]/Component3.vue';

// ============================================================
// STATE
// ============================================================

/** Currently active tab */
const activeTab = ref<string>('tab1');

// ============================================================
// EVENT HANDLERS (Optional - se componenti emettono eventi)
// ============================================================

/**
 * Handle calculation completed event from Component1
 * @param result - Calculation result object
 */
const handleCalculationCompleted = (result: unknown): void => {
  console.log('[PageName] Calculation completed:', result);
  // Future: Analytics tracking, Firebase logging, etc.
};
</script>

<template>
  <!-- ============================================================ -->
  <!-- PAGE NAME - MAIN CONTAINER                                   -->
  <!-- Brief description of integrated calculators/features         -->
  <!-- ============================================================ -->
  <q-page class="q-pa-md">
    <!-- ============================================================ -->
    <!-- PAGE HEADER - Breadcrumbs & Title                            -->
    <!-- ============================================================ -->
    <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" @click="$router.push('/')" class="cursor-pointer icon-home" />
        <q-breadcrumbs-el label="Page Category" />
      </q-breadcrumbs>
      <h4 class="text-h4 text-primary q-mt-md q-mb-none">🎯 Page Title</h4>
      <p class="text-subtitle1 text-grey-7">Brief subtitle describing page purpose</p>
    </div>

    <!-- ============================================================ -->
    <!-- INFORMATION BANNER - Features Overview                       -->
    <!-- ============================================================ -->
    <q-banner class="bg-blue-1 q-mb-md" rounded>
      <template v-slot:avatar>
        <q-icon name="info" color="primary" />
      </template>
      <div class="text-body2">
        <strong>N [Category] Professionali:</strong>
        <ul class="q-ma-sm q-pl-md">
          <li><strong>Feature 1:</strong> Brief description</li>
          <li><strong>Feature 2:</strong> Brief description</li>
          <li><strong>Feature 3:</strong> Brief description</li>
        </ul>
      </div>
    </q-banner>

    <!-- ============================================================ -->
    <!-- TAB NAVIGATION SYSTEM - N Calculator/Feature Tabs            -->
    <!-- ============================================================ -->
    <q-tabs
      v-model="activeTab"
      class="text-primary"
      indicator-color="primary"
      align="left"
      narrow-indicator
    >
      <q-tab name="tab1" icon="icon1" label="Tab 1" />
      <q-tab name="tab2" icon="icon2" label="Tab 2" />
      <q-tab name="tab3" icon="icon3" label="Tab 3" />
    </q-tabs>

    <q-separator />

    <!-- ============================================================ -->
    <!-- TAB PANELS - N Component Instances                           -->
    <!-- ============================================================ -->
    <q-tab-panels v-model="activeTab" animated>
      <!-- TAB 1: Component 1 -->
      <q-tab-panel name="tab1">
        <Component1 @calculated="handleCalculationCompleted" />
      </q-tab-panel>

      <!-- TAB 2: Component 2 -->
      <q-tab-panel name="tab2">
        <Component2 @calculated="handleCalculationCompleted" />
      </q-tab-panel>

      <!-- TAB 3: Component 3 -->
      <q-tab-panel name="tab3">
        <Component3 @calculated="handleCalculationCompleted" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style scoped>
/* ============================================================ */
/* PAGE-SPECIFIC STYLES                                         */
/* ============================================================ */

/* Mobile responsiveness */
@media (max-width: 768px) {
  .q-page {
    padding: 12px;
  }
}
</style>
```

### **Page Orchestrator Rules**

#### ✅ ALLOWED in Pages

- **Layout**: Breadcrumbs, headers, banners
- **Navigation**: Tab system (`q-tabs`, `q-tab-panels`)
- **Component imports**: Import from `src/components/[PageName]/`
- **Event handling**: Simple handlers for component events (console.log, analytics)
- **State**: Only `activeTab` ref for navigation
- **Size**: 180-400 lines maximum

#### ❌ FORBIDDEN in Pages

- **Business logic**: No calculations, no formulas
- **Form markup**: No `q-input`, `q-select` (belongs in components)
- **Documentation**: No NEWS-style sections (belongs in components)
- **Complex state**: No calculation state, results, validation logic
- **Data fetching**: No API calls, database queries
- **Size**: NO pages > 500 lines (refactor required)

### **Example Page Orchestrators**

```typescript
// ✅ GOOD - Pure orchestrator (206 lines)
// src/pages/GFRCalculatorPage.vue
// - 3 tabs: eGFR, CrCl, FluidBalance
// - Imports 3 components from src/components/GFR/
// - NO business logic
// - Refactoring: 5533 → 206 lines (-96%)

// ✅ GOOD - Pure orchestrator (387 lines)
// src/pages/PharmacologyPage.vue
// - 4 tabs: Dosage, Compatibility, Dilution, Infusion
// - Imports 3 components + 1 composable
// - NO business logic
// - Refactoring: 3379 → 387 lines (-89%)

// ✅ GOOD - Pure orchestrator (91 lines)
// src/pages/ClinicalAssessmentPage.vue
// - 4 tabs: APGAR, GCS, NEWS, SOFA
// - Imports 4 components from src/components/ClinicalAssessment/
// - NO business logic
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
- **Pages**: PascalCase with suffix - `APGARScorePage.vue`, `BMICalculatorPage.vue`
- **Composables**: camelCase with prefix - `useDrugCompatibility.ts`
- **Types**: PascalCase - `DrugTypes.ts`, `CalculatorTypes.ts`
- **Utils**: camelCase - `formatters.ts`, `validators.ts`

### Folders (§ 🏗️ ARCHITETTURA COMPONENTI)

- **Page-based Components**: PascalCase matching Page name
  - Pattern: `src/components/[PageName]/ComponentName.vue`
  - Examples:
    - `src/components/GFR/eGFRCalculator.vue` → Used by GFRCalculatorPage.vue
    - `src/components/BMI/BMICalculator.vue` → Used by BMICalculatorPage.vue
    - `src/components/Pharmacology/DosageCalculator.vue` → Used by PharmacologyPage.vue
    - `src/components/ClinicalAssessment/APGARScoreCalculator.vue` → Used by ClinicalAssessmentPage.vue
- **Folder Naming Rules**:
  - ✅ MUST match Page name (remove "Page.vue" suffix): `BMICalculatorPage.vue` → `BMI/`
  - ✅ MUST use PascalCase: `GFR/`, `IntensiveCare/`, `ClinicalAssessment/`
  - ❌ NO generic folders: `calculators/`, `components/shared/`, `utils/components/`

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

## � Project Structure (§ 🏗️ ARCHITETTURA COMPONENTI)

### **Page-based Component Folders**

```
src/
├── pages/                              # Page orchestrators (180-400 lines)
│   ├── GFRCalculatorPage.vue           # 206 lines: 3 tabs (eGFR, CrCl, FluidBalance)
│   ├── PharmacologyPage.vue            # 387 lines: 4 tabs (Dosage, Compatibility, Dilution, Infusion)
│   ├── BMICalculatorPage.vue           # ~200 lines: 4 tabs (BMI, BSA, IBW, ABW)
│   ├── ClinicalAssessmentPage.vue      # 91 lines: 4 tabs (APGAR, GCS, NEWS, SOFA)
│   ├── IntensiveCareUtilityPage.vue    # 63 lines: 2 tabs (QuozienteResp, MechanicalPower)
│   ├── NEWSScoreCalculatorPage.vue     # Standalone (uses component)
│   └── SOFAScoreCalculatorPage.vue     # Standalone (uses component)
│
├── components/                         # Page-based folders (components 300-1100 lines)
│   ├── GFR/                            # GFR Calculator components
│   │   ├── eGFRCalculator.vue          # 1068 lines: MDRD/CKD-EPI formulas + 9 NEWS sections
│   │   ├── CrClCalculator.vue          # 852 lines: Cockcroft-Gault + 9 NEWS sections
│   │   └── FluidBalanceCalculator.vue  # 872 lines: Fluid Balance 24h + 9 NEWS sections
│   │
│   ├── BMI/                            # BMI Calculator components
│   │   ├── BMICalculator.vue           # ~400 lines: BMI WHO classification + NEWS docs
│   │   ├── BSACalculator.vue           # ~300 lines: 3 BSA formulas + NEWS docs
│   │   ├── IBWCalculator.vue           # ~300 lines: 3 IBW formulas + NEWS docs
│   │   └── ABWCalculator.vue           # ~300 lines: ABW obesity adjustment + NEWS docs
│   │
│   ├── Pharmacology/                   # Pharmacology components
│   │   ├── DosageCalculator.vue        # 973 lines: Drug dosing + 5 medical doc sections
│   │   ├── DrugDilution.vue            # 423 lines: IV dilution calculator
│   │   └── InfusionRate.vue            # 717 lines: Vasopressor infusion converter
│   │
│   ├── ClinicalAssessment/             # Clinical Scoring Systems
│   │   ├── APGARScoreCalculator.vue    # 686 lines: Neonatal APGAR + 9 NEWS sections
│   │   ├── GCSCalculator.vue           # 567 lines: Glasgow Coma Scale + 9 NEWS sections
│   │   ├── NEWSScoreCalculator.vue     # ~800 lines: NEWS Score (GOLD STANDARD)
│   │   └── SOFAScoreCalculator.vue     # 1937 lines: SOFA Score + 9 NEWS sections
│   │
│   ├── IntensiveCare/                  # Ventilation & ICU
│   │   ├── QuozienteRespiratorioCalculator.vue  # 1874 lines: VCO2/VO2 + 9+3 NEWS sections
│   │   └── MechanicalPowerCalculator.vue        # 2303 lines: VILI predictor + 9 NEWS sections
│   │
│   └── Compatibility/                  # Drug Compatibility (future)
│       └── DrugCompatibilityChecker.vue
│
└── composables/                        # Reusable business logic
    ├── useDrugCompatibility.ts         # Drug interaction checking
    ├── useSecureLogger.ts              # GDPR-compliant logging
    └── useCalculatorState.ts           # Shared calculator state
```

### **Folder Structure Rules**

1. **Page-Component Mapping** (1:1 or 1:N)
   - Each Page has a dedicated folder in `components/[PageName]/`
   - Example: `GFRCalculatorPage.vue` → `components/GFR/` (3 components)
   - Example: `BMICalculatorPage.vue` → `components/BMI/` (4 components)

2. **Component Self-Containment**
   - Each component = Complete calculator (form + logic + docs)
   - Size: 300-1100 lines (NEWS-style documentation included)
   - NO cross-component dependencies (use composables for shared logic)

3. **Documentation Location**
   - ✅ NEWS-style docs IN components (9 sections: Definizione → Riferimenti)
   - ❌ NO docs in Pages (Pages are pure orchestrators)

4. **Refactoring Metrics** (Pattern Validation)
   - GFR: 5533 → 206 lines Page + 2792 lines Components = **-45.8% reduction**
   - Pharmacology: 3379 → 387 lines Page + 2113 lines Components = **-26% reduction**
   - BMI: 2592 → 200 lines Page + ~1200 lines Components = **-54% reduction** (estimated)

---

## �🔧 Medical Calculator Standards

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

### Component Creation (§ 🏗️ ARCHITETTURA Pattern)

```bash
# Create new Page orchestrator (following BMICalculatorPage.vue template)
copilot: "Create PharmacologyPage.vue orchestrator with 4 tabs following § 🏗️ ARCHITETTURA COMPONENTI pattern"

# Create Page-based component folder
copilot: "Create src/components/Pharmacology/DosageCalculator.vue component with NEWS-style docs following CODING_STANDARDS.md"

# Extract existing monolithic Page into orchestrator + components
copilot: "Extract PharmacologyPage.vue (3379 lines) into orchestrator + 4 components following GFRCalculatorPage.vue pattern"

# Create composable for shared logic
copilot: "Create useDrugCompatibility.ts composable following standards"
```

### Expected Output (Page Orchestrator)

- File header with `@notes` section documenting refactoring metrics
- Proper structure: script (imports + state) → template (layout + tabs) → style
- TypeScript types for event handlers (if any)
- Professional English comments with § 🏗️ ARCHITETTURA reference
- NO business logic (calculations in components)
- Size: 180-400 lines maximum
- Breadcrumbs + Tab navigation + Component instances ONLY

### Expected Output (Calculator Component)

- File header with complete documentation
- Proper structure (script → template → style)
- TypeScript types fully defined (Props, Emits interfaces)
- Professional English comments
- Error handling included
- Responsive design
- Accessibility features
- **NEWS-style documentation** (9 sections: Definizione → Riferimenti)
- Size: 300-1100 lines (with documentation)

### Refactoring Checklist (Monolithic Page → Orchestrator + Components)

1. **Analysis Phase**
   - [ ] Read existing monolithic Page file
   - [ ] Count total lines (e.g., 3379 lines)
   - [ ] Identify tabs and business logic sections
   - [ ] Map which logic belongs to which component

2. **Extraction Phase**
   - [ ] Create `src/components/[PageName]/` folder
   - [ ] Extract each tab into separate component
   - [ ] Move business logic (calculations, state, functions) to components
   - [ ] Move NEWS-style documentation to components
   - [ ] Define Props/Emits interfaces for each component

3. **Orchestrator Phase**
   - [ ] Create new Page file with template structure (180-400 lines)
   - [ ] Import components from `src/components/[PageName]/`
   - [ ] Implement tab navigation (`q-tabs`, `q-tab-panels`)
   - [ ] Add event handlers (optional, for analytics)
   - [ ] Remove ALL business logic from Page

4. **Validation Phase**
   - [ ] Run `yarn type-check` (0 TypeScript errors)
   - [ ] Run `yarn lint` (0 ESLint errors)
   - [ ] Test all tabs render correctly
   - [ ] Verify calculations work in components
   - [ ] Backup original file: `[PageName]_OLD.vue`

5. **Metrics Documentation**
   - [ ] Document reduction: "XXXX → YYY lines Page + ZZZ lines Components"
   - [ ] Calculate percentage: `((XXXX - (YYY + ZZZ)) / XXXX) * 100`
   - [ ] Update `@notes` section with refactoring metrics

### Example Refactoring Results

```typescript
// ✅ GFRCalculatorPage.vue (COMPLETED)
// BEFORE: 5533 lines (monolithic)
// AFTER: 206 lines Page + 2792 lines Components (3 components)
// REDUCTION: -45.8% (2535 lines eliminated)

// ✅ PharmacologyPage.vue (COMPLETED)
// BEFORE: 3379 lines (monolithic)
// AFTER: 387 lines Page + 2113 lines Components (3 components + 1 composable)
// REDUCTION: -26% (879 lines eliminated)

// ✅ BMICalculatorPage.vue (IN PROGRESS)
// BEFORE: 2592 lines (monolithic)
// AFTER: ~200 lines Page + ~1200 lines Components (4 components)
// REDUCTION: ~-54% (estimated)
```

---

<div align="center">

**These standards ensure professional, maintainable, and clinically accurate code**

✅ **Follow these guidelines for every file created or modified**

## 📚 Key References

- **§ 🏗️ ARCHITETTURA COMPONENTI**: REGOLE_COPILOT.md lines 287-443
- **NEWS-style Documentation**: STYLE_REFACTOR_TRACKING.md (9-section standard)
- **Page Orchestrator Template**: BMICalculatorPage.vue (180-400 lines reference)
- **Component Template**: eGFRCalculator.vue (NEWS-style + Props/Emits reference)

**Pattern Validation**: 3 successful refactorings (GFR -45.8%, Pharmacology -26%, BMI -54% estimated)

</div>
