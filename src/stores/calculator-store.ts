/**
 * @file calculator-store.ts
 * @description Pinia store for calculator settings (validation toggles, preferences)
 * @author Medical Utility Pro
 * @created 2025-01-09
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCalculatorStore = defineStore('calculator', () => {
  // ============================================================
  // STATE
  // ============================================================
  
  /**
   * Enable physiological validations (e.g., plateau < peak, peep < plateau)
   * @default true
   */
  const enablePhysiologicalValidations = ref(true);

  // ============================================================
  // ACTIONS
  // ============================================================
  
  /**
   * Toggle physiological validations
   */
  function togglePhysiologicalValidations(): void {
    enablePhysiologicalValidations.value = !enablePhysiologicalValidations.value;
  }

  /**
   * Reset store to default values
   */
  function $reset(): void {
    enablePhysiologicalValidations.value = true;
  }

  return {
    // State
    enablePhysiologicalValidations,
    
    // Actions
    togglePhysiologicalValidations,
    $reset,
  };
});
