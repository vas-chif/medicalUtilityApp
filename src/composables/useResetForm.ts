/**
 * @file useResetForm.ts
 * @description Generic composable for resetting calculator forms
 *
 * Provides a reusable pattern for resetting form data and results
 * in all calculator pages. Ensures consistency across the application.
 *
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-11-06
 *
 * @example
 * // In calculator component:
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
