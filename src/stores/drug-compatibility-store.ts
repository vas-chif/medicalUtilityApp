import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useDrugCompatibility } from 'src/composables/useDrugCompatibility';
import { DrugCompatibility } from 'src/types/DrugTypes';
import { useSecureLogger } from 'src/composables/useSecureLogger';

/**
 * Store Pinia per gestione compatibilità farmaci selezionati
 * 
 * OBIETTIVO: Garantire determinismo nell'allocazione lumi
 * - Farmaci ordinati canonicamente (alfabetico) 
 * - Reset completo su ogni modifica
 * - Cache compatibilità pre-calcolata
 * - Risultati riproducibili: stessi farmaci → stesso risultato
 * 
 * @see REGOLE_COPILOT.md - Logging GDPR-compliant
 */
export const useDrugCompatibilityStore = defineStore('drugCompatibility', () => {
  const { logger } = useSecureLogger();
  const { readCompatibility } = useDrugCompatibility();

  // ============================================================================
  // STATE
  // ============================================================================

  /**
   * Farmaci selezionati - ORDINATI ALFABETICAMENTE (determinismo)
   * Array ordinato canonicamente per garantire risultati riproducibili
   */
  const selectedDrugs = ref<string[]>([]);

  /**
   * Matrice compatibilità pre-calcolata
   * Struttura: { 'DRUG_A': { 'DRUG_B': DrugCompatibility.COMPATIBLE, ... }, ... }
   */
  const compatibilityMatrix = ref<Record<string, Record<string, DrugCompatibility>>>({});

  /**
   * Timestamp ultimo reset - per tracking cache invalidation
   */
  const lastResetTimestamp = ref<number>(Date.now());

  /**
   * Flag loading per operazioni asincrone
   */
  const isLoading = ref(false);

  // ============================================================================
  // GETTERS COMPUTED
  // ============================================================================

  /**
   * Farmaci ordinati alfabeticamente (SEMPRE deterministico)
   * Garantisce che l'ordine di selezione non influenzi il risultato
   */
  const sortedDrugs = computed(() => {
    return [...selectedDrugs.value].sort((a, b) => a.localeCompare(b, 'it-IT'));
  });

  /**
   * Count farmaci selezionati
   */
  const drugCount = computed(() => selectedDrugs.value.length);

  /**
   * Check se matrice compatibilità è valida (non vuota per farmaci presenti)
   */
  const hasCompatibilityData = computed(() => {
    return Object.keys(compatibilityMatrix.value).length > 0;
  });

  // ============================================================================
  // ACTIONS
  // ============================================================================

  /**
   * Aggiunge un farmaco alla selezione
   * Reset completo: ricarica tutti dati dal database
   * 
   * @param drugName Nome farmaco da aggiungere
   */
  const addDrug = (drugName: string) => {
    logger.info('[addDrug] Aggiunta farmaco con reset completo', { drugName });

    if (selectedDrugs.value.includes(drugName)) {
      logger.warn('[addDrug] Farmaco già selezionato - skip', { drugName });
      return;
    }

    // Aggiungi farmaco (sarà ordinato da sortedDrugs computed)
    selectedDrugs.value.push(drugName);

    // Reset completo matrice compatibilità
    resetAndReloadCompatibility();

    logger.info('[addDrug] Farmaco aggiunto e compatibilità ricaricata', {
      drugName,
      totalDrugs: drugCount.value,
      sortedDrugs: sortedDrugs.value,
    });
  };

  /**
   * Rimuove un farmaco dalla selezione
   * Reset completo: ricarica tutti dati dal database
   * 
   * @param drugName Nome farmaco da rimuovere
   */
  const removeDrug = (drugName: string) => {
    logger.info('[removeDrug] Rimozione farmaco con reset completo', { drugName });

    const index = selectedDrugs.value.indexOf(drugName);
    if (index === -1) {
      logger.warn('[removeDrug] Farmaco non trovato - skip', { drugName });
      return;
    }

    // Rimuovi farmaco
    selectedDrugs.value.splice(index, 1);

    // Reset completo matrice compatibilità
    if (selectedDrugs.value.length > 0) {
      resetAndReloadCompatibility();
    } else {
      // Nessun farmaco selezionato → reset senza reload
      compatibilityMatrix.value = {};
      lastResetTimestamp.value = Date.now();
    }

    logger.info('[removeDrug] Farmaco rimosso e compatibilità ricaricata', {
      drugName,
      totalDrugs: drugCount.value,
      sortedDrugs: sortedDrugs.value,
    });
  };

  /**
   * Reset e ricarica compatibilità dal database
   * Estrae dati SOLO per farmaci selezionati
   * Usa sortedDrugs per garantire ordine deterministico
   */
  const resetAndReloadCompatibility = () => {
    logger.debug('[resetAndReloadCompatibility] START', {
      drugsCount: drugCount.value,
      sortedDrugs: sortedDrugs.value,
    });

    isLoading.value = true;

    try {
      // Reset matrice
      compatibilityMatrix.value = {};
      lastResetTimestamp.value = Date.now();

      // Usa sortedDrugs (alfabetico) per determinismo
      const drugs = sortedDrugs.value;

      if (drugs.length === 0) {
        logger.info('[resetAndReloadCompatibility] Nessun farmaco - skip');
        return;
      }

      // Costruisci matrice simmetrica usando checkCompatibility
      const matrix: Record<string, Record<string, DrugCompatibility>> = {};

      drugs.forEach((drugA) => {
        matrix[drugA] = {};
        drugs.forEach((drugB) => {
          if (drugA === drugB) {
            // Stesso farmaco → sempre compatibile
            matrix[drugA]![drugB] = DrugCompatibility.COMPATIBLE;
          } else {
            // Estrai compatibilità usando readCompatibility
            const compat = readCompatibility(drugA, drugB);
            matrix[drugA]![drugB] = compat || DrugCompatibility.NO_DATA;
          }
        });
      });

      compatibilityMatrix.value = matrix;

      logger.info('[resetAndReloadCompatibility] SUCCESS', {
        drugsCount: drugs.length,
        matrixSize: Object.keys(matrix).length,
        timestamp: lastResetTimestamp.value,
      });
    } catch (error) {
      logger.error('[resetAndReloadCompatibility] ERRORE caricamento compatibilità', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Ottiene compatibilità tra due farmaci dalla matrice cache
   * 
   * @param drugA Nome primo farmaco
   * @param drugB Nome secondo farmaco
   * @returns DrugCompatibility enum value
   */
  const getCompatibility = (drugA: string, drugB: string): DrugCompatibility => {
    const compat = compatibilityMatrix.value[drugA]?.[drugB];

    if (!compat) {
      logger.warn('[getCompatibility] Compatibilità non trovata in cache', {
        drugA,
        drugB,
        matrixKeys: Object.keys(compatibilityMatrix.value),
      });
      return DrugCompatibility.NO_DATA;
    }

    return compat;
  };

  /**
   * Ottiene tutti risultati compatibilità per un farmaco specifico
   * Utile per componente "Compatibilità Dettagliata Farmaci"
   * 
   * @param drugName Nome farmaco
   * @returns Oggetto con liste categorizzate per tipo compatibilità
   */
  const getDrugCompatibilityDetails = (drugName: string) => {
    const drugMatrix = compatibilityMatrix.value[drugName];

    if (!drugMatrix) {
      logger.warn('[getDrugCompatibilityDetails] Farmaco non trovato in matrice', {
        drugName,
        availableDrugs: Object.keys(compatibilityMatrix.value),
      });
      return {
        compatible: [],
        compatibleOnTap: [],
        incompatible: [],
        conflictingData: [],
        noDataAvailable: [],
      };
    }

    const result = {
      compatible: [] as string[],
      compatibleOnTap: [] as string[],
      incompatible: [] as string[],
      conflictingData: [] as string[],
      noDataAvailable: [] as string[],
    };

    // Itera su farmaci ordinati (determinismo)
    sortedDrugs.value.forEach((otherDrug) => {
      if (otherDrug === drugName) return; // Skip stesso farmaco

      const compat = drugMatrix[otherDrug];

      switch (compat) {
        case DrugCompatibility.COMPATIBLE:
          result.compatible.push(otherDrug);
          break;
        case DrugCompatibility.COMPATIBLE_ON_TAP:
          result.compatibleOnTap.push(otherDrug);
          break;
        case DrugCompatibility.INCOMPATIBLE:
          result.incompatible.push(otherDrug);
          break;
        case DrugCompatibility.CONFLICTING_DATA:
          result.conflictingData.push(otherDrug);
          break;
        case DrugCompatibility.NO_DATA:
          result.noDataAvailable.push(otherDrug);
          break;
      }
    });

    logger.debug('[getDrugCompatibilityDetails] Dettagli compatibilità', {
      drugName,
      compatible: result.compatible.length,
      compatibleOnTap: result.compatibleOnTap.length,
      incompatible: result.incompatible.length,
      conflictingData: result.conflictingData.length,
      noDataAvailable: result.noDataAvailable.length,
    });

    return result;
  };

  /**
   * Reset completo store (per testing o cambio paziente)
   */
  const resetStore = () => {
    logger.info('[resetStore] Reset completo store');
    selectedDrugs.value = [];
    compatibilityMatrix.value = {};
    lastResetTimestamp.value = Date.now();
    isLoading.value = false;
  };

  // ============================================================================
  // RETURN PUBLIC API
  // ============================================================================

  return {
    // State
    selectedDrugs,
    compatibilityMatrix,
    lastResetTimestamp,
    isLoading,

    // Getters
    sortedDrugs,
    drugCount,
    hasCompatibilityData,

    // Actions
    addDrug,
    removeDrug,
    resetAndReloadCompatibility,
    getCompatibility,
    getDrugCompatibilityDetails,
    resetStore,
  };
});
