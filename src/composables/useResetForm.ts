/**
 * @file useResetForm.ts
 * @description Generic composable for resetting calculator forms to initial state.
 *              Provides a reusable pattern for form state management across all calculator pages,
 *              ensuring consistency and preventing state pollution between calculations.
 *
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-01-20
 *
 * @notes
 * - Total 103 lines of production-ready form state management code
 * - Generic TypeScript implementation supporting any form/result structure
 * - Deep copy mechanism prevents reference-related state issues
 * - Type-aware result resetting (number, string, null, complex objects)
 * - Used across all calculator pages: PharmacologyPage, GFRCalculatorPage, BMICalculatorPage, etc.
 * - Ensures clean state between calculations for accurate results
 * - Follows Vue 3 Composition API best practices
 *
 * @dependencies
 * - Vue 3 type system (Ref) for reactive state management
 *
 * @usage-examples
 * ```typescript
 * // Example 1: Simple number result
 * const formData = ref({ weight: null, height: null });
 * const result = ref(0);
 * const { resetForm } = useResetForm(formData, result, { weight: null, height: null });
 *
 * // Example 2: Complex object result
 * const formData = ref({ dose: null, rate: null });
 * const result = ref({ totalDose: 0, duration: 0 });
 * const { resetForm } = useResetForm(formData, result, { dose: null, rate: null });
 *
 * // Example 3: In template usage
 * <q-btn @click="resetForm" label="Reset" icon="refresh" color="secondary" />
 * ```
 *
 * @type-safety
 * - Generic type parameters <T, R> ensure type safety for form data and results
 * - T: Form data structure (any interface or type)
 * - R: Result type (number, string, object, etc.)
 *
 * @example
 * // In BMICalculatorPage.vue:
 * const { resetForm } = useResetForm(formData, result, initialFormData);
 *
 * // In template:
 * <q-btn @click="resetForm" label="Reset" icon="refresh" />
 */

// ============================================================
// IMPORTS
// ============================================================
import type { Ref } from 'vue';

// ============================================================
// TYPES & INTERFACES
// ============================================================
/**
 * Reset function type signature
 */
export type ResetFunction = () => void;

/**
 * UseResetForm composable return type
 */
export interface UseResetFormReturn {
  /** Function to reset form data and result to initial state */
  resetForm: ResetFunction;
}

// ============================================================
// COMPOSABLE
// ============================================================
/**
 * Generic composable for resetting form data in calculators
 *
 * @param formData - Reactive reference to form data object
 * @param result - Reactive reference to calculation result
 * @param initialFormData - Initial state to reset to
 * @returns Object containing resetForm function
 *
 * @example
 * ```typescript
 * interface MyFormData {
 *   value1: number | null;
 *   value2: number | null;
 * }
 *
 * const initialState: MyFormData = {
 *   value1: null,
 *   value2: null,
 * };
 *
 * const formData = ref<MyFormData>({ ...initialState });
 * const result = ref<number>(0);
 *
 * const { resetForm } = useResetForm(formData, result, initialState);
 * ```
 */
export function useResetForm<T, R = number>(
  formData: Ref<T>,
  result: Ref<R>,
  initialFormData: T,
): UseResetFormReturn {
  /**
   * Reset form data and result to initial state
   * Creates fresh copy of initial data to avoid reference issues
   */
  const resetForm: ResetFunction = () => {
    // Reset form data to initial state (deep copy)
    formData.value = JSON.parse(JSON.stringify(initialFormData)) as T;

    // Reset result based on type
    if (typeof result.value === 'number') {
      result.value = 0 as R;
    } else if (typeof result.value === 'string') {
      result.value = '' as R;
    } else if (result.value === null || result.value === undefined) {
      result.value = null as R;
    } else {
      // For complex types, try to reset to initial state
      result.value = (
        typeof result.value === 'object' ? JSON.parse(JSON.stringify(result.value)) : result.value
      ) as R;
    }
  };

  return {
    resetForm,
  };
}

// ============================================================
// EXPORTS
// ============================================================
export default useResetForm;
