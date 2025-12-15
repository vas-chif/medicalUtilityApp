/**
 * @file useSavedCalculations.ts
 * @description Composable per gestire calcoli salvati in localStorage
 * @author Vasile Chifeac
 * @created 2025-12-11
 */

import { ref, watch } from 'vue';

export interface SavedCalculation {
  id: string;
  initials: string;
  result: number;
  date: string;
  time: string;
  timestamp: number;
}

export function useSavedCalculations(calculatorType: 'mp' | 'qr') {
  const storageKey = `saved_calculations_${calculatorType}`;
  
  // Carica da localStorage
  const savedCalculations = ref<SavedCalculation[]>([]);
  
  function loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        savedCalculations.value = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Errore caricamento calcoli salvati:', error);
      savedCalculations.value = [];
    }
  }
  
  function saveToStorage(): void {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedCalculations.value));
    } catch (error) {
      console.error('Errore salvataggio calcoli:', error);
    }
  }
  
  // Auto-save quando l'array cambia
  watch(savedCalculations, saveToStorage, { deep: true });
  
  // Carica all'inizio
  loadFromStorage();
  
  function createSavedCalculation(initials: string, result: number): SavedCalculation {
    const now = new Date();
    return {
      id: `${calculatorType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      initials: initials.trim(),
      result: Math.round(result * 100) / 100,
      date: now.toLocaleDateString('it-IT'),
      time: now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      timestamp: now.getTime(),
    };
  }
  
  function addSavedCalculation(calculation: SavedCalculation): void {
    savedCalculations.value.unshift(calculation); // Aggiungi all'inizio
  }
  
  function removeSavedCalculation(index: number): void {
    savedCalculations.value.splice(index, 1);
  }
  
  function clearAll(): void {
    savedCalculations.value = [];
  }
  
  return {
    savedCalculations,
    createSavedCalculation,
    addSavedCalculation,
    removeSavedCalculation,
    clearAll,
  };
}
