/**
 * @file usePersistedCalculator.ts
 * @description Composable per persistere dati form in localStorage
 * @author Vasile Chifeac
 * @created 2025-12-11
 */

import type { Ref } from 'vue';
import { ref, watch } from 'vue';

interface PersistedField<T> {
  value: Ref<T>;
}

function usePersistedField<T>(key: string, defaultValue: T): PersistedField<T> {
  const storedValue = localStorage.getItem(key);
  const value = ref<T>(storedValue !== null ? JSON.parse(storedValue) : defaultValue) as Ref<T>;

  watch(
    value,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`Errore salvataggio ${key}:`, error);
      }
    },
    { deep: true },
  );

  return { value };
}

export function usePersistedMechanicalPower() {
  const prefix = 'mp_';

  const rr = usePersistedField<number | null>(`${prefix}rr`, null);
  const vte = usePersistedField<number | null>(`${prefix}vte`, null);
  const picco = usePersistedField<number | null>(`${prefix}picco`, null);
  const plateau = usePersistedField<number | null>(`${prefix}plateau`, null);
  const peep = usePersistedField<number | null>(`${prefix}peep`, null);
  const result = usePersistedField<number>(`${prefix}result`, 0);

  function resetAll(): void {
    rr.value.value = null;
    vte.value.value = null;
    picco.value.value = null;
    plateau.value.value = null;
    peep.value.value = null;
    result.value.value = 0;

    // Cancella da localStorage
    localStorage.removeItem(`${prefix}rr`);
    localStorage.removeItem(`${prefix}vte`);
    localStorage.removeItem(`${prefix}picco`);
    localStorage.removeItem(`${prefix}plateau`);
    localStorage.removeItem(`${prefix}peep`);
    localStorage.removeItem(`${prefix}result`);
  }

  return {
    rr,
    vte,
    picco,
    plateau,
    peep,
    result,
    resetAll,
  };
}

export function usePersistedRespiratoryQuotient() {
  const prefix = 'rq_';

  const pvco2 = usePersistedField<number | null>(`${prefix}pvco2`, null);
  const paco2 = usePersistedField<number | null>(`${prefix}paco2`, null);
  const hb = usePersistedField<number | null>(`${prefix}hb`, null);
  const sao2 = usePersistedField<number | null>(`${prefix}sao2`, null);
  const svo2 = usePersistedField<number | null>(`${prefix}svo2`, null);
  const pao2 = usePersistedField<number | null>(`${prefix}pao2`, null);
  const pvo2 = usePersistedField<number | null>(`${prefix}pvo2`, null);
  const result = usePersistedField<number>(`${prefix}result`, 0);

  function resetAll(): void {
    pvco2.value.value = null;
    paco2.value.value = null;
    hb.value.value = null;
    sao2.value.value = null;
    svo2.value.value = null;
    pao2.value.value = null;
    pvo2.value.value = null;
    result.value.value = 0;

    // Cancella da localStorage
    ['pvco2', 'paco2', 'hb', 'sao2', 'svo2', 'pao2', 'pvo2', 'result'].forEach((key) => {
      localStorage.removeItem(`${prefix}${key}`);
    });
  }

  return {
    pvco2,
    paco2,
    hb,
    sao2,
    svo2,
    pao2,
    pvo2,
    result,
    resetAll,
  };
}
