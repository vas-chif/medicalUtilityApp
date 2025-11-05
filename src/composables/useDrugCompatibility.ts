/**
 * Composable per gestione compatibilità farmaci
 * Convertito da: https://github.com/vas-chif/drugsCompatibility
 * Basato su: ControlDrugs.java, FunctionPostgreSQL.java
 */

import { ref, computed } from 'vue';
import type {
  Drug,
  CompatibilityMatrix,
  CompatibilityResult,
  MultiDrugAnalysis,
  CompatibilityWarning,
} from 'src/types/DrugTypes';
import { DrugCompatibility } from 'src/types/DrugTypes';
import { drugDatabase } from 'src/data/drugs';

export function useDrugCompatibility() {
  // State
  const drugs = ref<Drug[]>(drugDatabase.drugs);
  const compatibilityMatrix = ref<CompatibilityMatrix>(
    drugDatabase.compatibilityMatrix as CompatibilityMatrix,
  );
  const selectedDrugs = ref<string[]>([]);
  const searchQuery = ref('');
  const isLoading = ref(false);

  /**
   * Filtra farmaci per ricerca
   * Basato su: DrugFilter.java searchFilter()
   */
  const filteredDrugs = computed(() => {
    if (!searchQuery.value) return drugs.value;

    const query = searchQuery.value.toLowerCase();
    return drugs.value.filter(
      (drug) =>
        drug.name.toLowerCase().includes(query) ||
        drug.activeIngredient?.toLowerCase().includes(query) ||
        drug.category?.toLowerCase().includes(query),
    );
  });

  /**
   * Ordina farmaci alfabeticamente
   * Basato su: DrugFilter.java drugList sorting
   */
  const sortedDrugs = computed(() => {
    return [...drugs.value].sort((a, b) => a.name.localeCompare(b.name));
  });

  /**
   * Legge lo stato di compatibilità tra due farmaci
   * Basato su: FunctionPostgreSQL.java readSpecificDate()
   */
  const readCompatibility = (drug1: string, drug2: string): DrugCompatibility => {
    // Se stesso farmaco
    if (drug1 === drug2) {
      return 'C' as DrugCompatibility;
    }

    // Cerca nella matrice
    if (compatibilityMatrix.value[drug1]?.[drug2]) {
      return compatibilityMatrix.value[drug1][drug2] as DrugCompatibility;
    }

    // Nessun dato disponibile
    return '' as DrugCompatibility;
  };

  /**
   * Controlla compatibilità di un singolo farmaco con lista
   * Basato su: ControlDrugs.java compatibilityController()
   */
  const checkDrugCompatibility = (mainDrug: string, drugsList: string[]): CompatibilityResult => {
    const result: CompatibilityResult = {
      drug: mainDrug,
      compatible: [],
      compatibleOnTap: [],
      incompatible: [],
      conflictingData: [],
      noDataAvailable: [],
    };

    for (const drug of drugsList) {
      // Salta se è lo stesso farmaco
      if (drug === mainDrug) continue;

      const compatibility = readCompatibility(mainDrug, drug);

      switch (compatibility) {
        case DrugCompatibility.COMPATIBLE: // 'C' - Compatible
          result.compatible.push(drug);
          break;
        case DrugCompatibility.COMPATIBLE_ON_TAP: // 'Y' - Compatible on Tap/Y-site
          result.compatibleOnTap.push(drug);
          break;
        case DrugCompatibility.INCOMPATIBLE: // 'I' - Incompatible
          result.incompatible.push(drug);
          break;
        case DrugCompatibility.CONFLICTING_DATA: // '!' - Conflicting Data
          result.conflictingData.push(drug);
          break;
        case DrugCompatibility.NO_DATA: // '' - No Data Available
          result.noDataAvailable.push(drug);
          break;
        default:
          // Caso non previsto
          result.noDataAvailable.push(drug);
      }
    }

    return result;
  };

  /**
   * Analizza compatibilità multipla tra tutti i farmaci selezionati
   * Basato su: ControlDrugs.java compatibilityController(DefaultListModel)
   */
  const analyzeMultipleDrugs = (drugsList: string[]): MultiDrugAnalysis => {
    const results: CompatibilityResult[] = [];
    const warnings: CompatibilityWarning[] = [];
    const recommendations: string[] = [];

    // Analizza ogni farmaco
    for (const drug of drugsList) {
      const result = checkDrugCompatibility(drug, drugsList);
      results.push(result);

      // Genera warnings critici
      if (result.incompatible.length > 0) {
        for (const incompDrug of result.incompatible) {
          warnings.push({
            type: 'critical',
            drugs: [drug, incompDrug],
            message: `INCOMPATIBILITÀ: ${drug} e ${incompDrug} NON devono essere miscelati`,
            action: 'Utilizzare linee IV separate o somministrare in tempi diversi',
          });
        }
      }

      // Warnings per dati contrastanti
      if (result.conflictingData.length > 0) {
        for (const conflictDrug of result.conflictingData) {
          warnings.push({
            type: 'warning',
            drugs: [drug, conflictDrug],
            message: `ATTENZIONE: Dati contrastanti per ${drug} e ${conflictDrug}`,
            action: 'Consultare farmacologo ospedaliero prima della somministrazione',
          });
        }
      }

      // Info per compatibilità Y-site
      if (result.compatibleOnTap.length > 0) {
        const firstCompatDrug = result.compatibleOnTap[0];
        if (firstCompatDrug) {
          warnings.push({
            type: 'info',
            drugs: [drug, firstCompatDrug],
            message: `${drug} compatibile con ${result.compatibleOnTap.join(', ')} solo tramite Y-site`,
            action: 'Utilizzare connettore Y-site/rubinetto a tre vie',
          });
        }
      }
    }

    // Genera raccomandazioni
    if (warnings.some((w) => w.type === 'critical')) {
      recommendations.push(
        '⚠️ ATTENZIONE: Rilevate incompatibilità critiche. Non somministrare insieme.',
      );
      recommendations.push('✓ Utilizzare linee venose separate per farmaci incompatibili');
    }

    if (warnings.some((w) => w.type === 'warning')) {
      recommendations.push('⚠️ Consultare il servizio di farmacia per dati contrastanti');
    }

    if (warnings.length === 0 || warnings.every((w) => w.type === 'info')) {
      recommendations.push('✓ Nessuna incompatibilità critica rilevata');
      recommendations.push('✓ Verificare sempre le diluizioni e velocità di infusione corrette');
    }

    return {
      drugs: drugsList,
      compatibilityMatrix: compatibilityMatrix.value,
      results,
      warnings,
      recommendations,
    };
  };

  /**
   * Formatta lista di farmaci in stringa
   * Basato su: ControlDrugs.java reformatString()
   */
  const formatDrugList = (drugsList: string[]): string => {
    if (drugsList.length === 0) return 'Nessuno';
    return drugsList.join('; ');
  };

  /**
   * Genera report testuale dei risultati
   * Basato su: ControlDrugs.java output formatting
   */
  const generateReport = (result: CompatibilityResult): string => {
    let report = `📋 ${result.drug} è:\n`;

    if (result.compatible.length > 0) {
      report += `\n✅ Compatibile con: ${formatDrugList(result.compatible)}`;
    }

    if (result.compatibleOnTap.length > 0) {
      report += `\n🔀 Compatibile via Y-site con: ${formatDrugList(result.compatibleOnTap)}`;
    }

    if (result.incompatible.length > 0) {
      report += `\n❌ INCOMPATIBILE con: ${formatDrugList(result.incompatible)}`;
    }

    if (result.conflictingData.length > 0) {
      report += `\n⚠️  Dati contrastanti con: ${formatDrugList(result.conflictingData)}`;
    }

    if (result.noDataAvailable.length > 0) {
      report += `\n❓ Nessun dato per: ${formatDrugList(result.noDataAvailable)}`;
    }

    return report;
  };

  /**
   * Aggiunge farmaco alla selezione
   */
  const addDrug = (drugName: string) => {
    if (!selectedDrugs.value.includes(drugName)) {
      selectedDrugs.value.push(drugName);
    }
  };

  /**
   * Rimuove farmaco dalla selezione
   */
  const removeDrug = (drugName: string) => {
    const index = selectedDrugs.value.indexOf(drugName);
    if (index > -1) {
      selectedDrugs.value.splice(index, 1);
    }
  };

  /**
   * Pulisce selezione
   * Basato su: DrugFilter.java clear button
   */
  const clearSelection = () => {
    selectedDrugs.value = [];
  };

  /**
   * Cerca farmaco per nome
   */
  const findDrugByName = (name: string): Drug | undefined => {
    return drugs.value.find((drug) => drug.name.toLowerCase() === name.toLowerCase());
  };

  /**
   * Ottieni icona emoji per categoria
   */
  const getCategoryIcon = (category?: string): string => {
    const icons: Record<string, string> = {
      antibiotic: '💊',
      analgesic: '💉',
      cardiovascular: '❤️',
      anticoagulant: '🩸',
      sedative: '😴',
      electrolyte: '⚡',
      vasopressor: '🔺',
      insulin: '🍬',
      diuretic: '💧',
      antiarrhythmic: '🫀',
      other: '🔬',
    };
    return icons[category || 'other'] || '💊';
  };

  return {
    // State
    drugs,
    compatibilityMatrix,
    selectedDrugs,
    searchQuery,
    isLoading,

    // Computed
    filteredDrugs,
    sortedDrugs,

    // Methods
    readCompatibility,
    checkDrugCompatibility,
    analyzeMultipleDrugs,
    formatDrugList,
    generateReport,
    addDrug,
    removeDrug,
    clearSelection,
    findDrugByName,
    getCategoryIcon,
  };
}
