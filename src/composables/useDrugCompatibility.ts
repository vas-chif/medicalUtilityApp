/**
 * @file useDrugCompatibility.ts
 * @description Vue 3 composable for comprehensive drug compatibility analysis and Y-site
 *              compatibility checking for intravenous medication administration. Converted
 *              from Java-based drug compatibility system (ControlDrugs.java, FunctionPostgreSQL.java).
 *
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-01-20
 *
 * @notes
 * - Total 312 lines of production-ready drug compatibility logic
 * - Converted from Java drugCompatibility system (GitHub: vas-chif/drugsCompatibility)
 * - Based on ControlDrugs.java and FunctionPostgreSQL.java architecture
 * - Supports 5 compatibility levels: Compatible (C), Y-site (Y), Incompatible (I), Conflicting (!), No Data ('')
 * - Multi-drug analysis with matrix-based compatibility lookup
 * - Real-time search and filtering of drug database
 * - Three-level warning system: Critical, Warning, Info
 * - Comprehensive report generation for clinical decision support
 * - TypeScript type safety with complete interface definitions
 * - Reactive Vue 3 Composition API implementation
 *
 * @dependencies
 * - Vue 3 Composition API (ref, computed) for reactive state management
 * - DrugTypes type definitions (Drug, CompatibilityMatrix, CompatibilityResult, etc.)
 * - drugDatabase for medication data and compatibility matrix
 *
 * @medical-references
 * - Micromedex IV Compatibility Database
 * - Trissel's Handbook on Injectable Drugs (20th Edition)
 * - ASHP Guidelines on Preventing Medication Errors
 * - Clinical Pharmacology Drug Interaction Reference
 *
 * @compatibility-levels
 * - 'C' (Compatible): Drugs can be mixed in the same solution
 * - 'Y' (Y-site): Compatible only at Y-site connection, not mixed
 * - 'I' (Incompatible): NEVER mix - causes precipitation/degradation
 * - '!' (Conflicting Data): Literature reports conflicting compatibility
 * - '' (No Data): No compatibility data available in literature
 *
 * @functions
 * - useDrugCompatibility(): Main composable hook
 * - filteredDrugs: Computed property for search filtering
 * - sortedDrugs: Alphabetically sorted drug list
 * - readCompatibility(): Matrix lookup for two-drug compatibility
 * - checkDrugCompatibility(): Single drug vs. list analysis
 * - analyzeMultipleDrugs(): Multi-drug compatibility matrix analysis
 * - formatDrugList(): String formatting for drug lists
 * - generateReport(): Clinical report generation
 * - addDrug/removeDrug(): Selection management
 * - getCategoryIcon(): UI icon mapping for drug categories
 *
 * @example
 * ```typescript
 * const {
 *   filteredDrugs,
 *   selectedDrugs,
 *   analyzeMultipleDrugs,
 *   addDrug,
 *   removeDrug
 * } = useDrugCompatibility();
 *
 * addDrug('Norepinephrine');
 * addDrug('Dobutamine');
 * const analysis = analyzeMultipleDrugs(selectedDrugs.value);
 * console.log(analysis.warnings); // Critical incompatibility warnings
 * ```
 */

import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type {
  Drug,
  CompatibilityMatrix,
  CompatibilityResult,
  MultiDrugAnalysis,
  CompatibilityWarning,
} from 'src/types/DrugTypes';
import { DrugCompatibility, DrugCategory } from 'src/types/DrugTypes';
import { drugDatabase } from 'src/data/drugs';
import { drugDatabaseService } from 'src/services/drug-database.service';
import type { Drug as NewDrug } from 'src/types/drug-database';
import { CompatibilityStatus } from 'src/types/drug-database';

// ============================================================
// COMPOSABLE HOOK - Drug Compatibility Analysis
// ============================================================

/**
 * Main composable for drug compatibility checking and analysis
 * @returns Object with drug data, analysis functions, and selection management
 */
export function useDrugCompatibility() {
  const { t } = useI18n();
  // State
  // ============================================================
  // STATE MANAGEMENT - Reactive drug data and selections
  // ============================================================

  // Converti i farmaci dal nuovo database al formato vecchio
  const convertNewDrugsToOldFormat = (): Drug[] => {
    const newDrugs = drugDatabaseService.getAllDrugs();
    console.log('[useDrugCompatibility] Converting drugs from new database:', newDrugs.length);

    return newDrugs.map(
      (newDrug: NewDrug) =>
        ({
          id: newDrug.id,
          name: newDrug.name.it, // Usa nome italiano
          activeIngredient: newDrug.name.en, // Usa nome inglese come principio attivo
          category: DrugCategory.OTHER, // Categoria generica per tutti i farmaci IV
          notes: newDrug.concentrationNotes?.it,
        }) as Drug,
    );
  };

  // Inizializza con il vecchio database come fallback
  const drugs = ref<Drug[]>(
    drugDatabaseService.isLoaded() ? convertNewDrugsToOldFormat() : drugDatabase.drugs,
  );

  const compatibilityMatrix = ref<CompatibilityMatrix>(
    drugDatabase.compatibilityMatrix as CompatibilityMatrix,
  );
  const selectedDrugs = ref<string[]>([]);
  const searchQuery = ref('');
  const isLoading = ref(false);

  // ============================================================
  // COMPUTED PROPERTIES - Filtered and sorted drug lists
  // ============================================================

  /**
   * Filters drugs based on search query matching name, active ingredient, or category
   * Based on: DrugFilter.java searchFilter()
   * @returns Array of drugs matching search criteria
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
   * Returns drugs sorted alphabetically by name for consistent UI display
   * Based on: DrugFilter.java drugList sorting
   * @returns Alphabetically sorted array of drugs
   */
  const sortedDrugs = computed(() => {
    return [...drugs.value].sort((a, b) => a.name.localeCompare(b.name));
  });

  // ============================================================
  // COMPATIBILITY ANALYSIS FUNCTIONS - Core drug checking logic
  // ============================================================

  /**
   * Reads compatibility status between two drugs from the compatibility matrix
   * Based on: FunctionPostgreSQL.java readSpecificDate()
   * @param drug1 - First drug name
   * @param drug2 - Second drug name
   * @returns Compatibility code: 'C' (compatible), 'Y' (Y-site), 'I' (incompatible), '!' (conflicting), '' (no data)
   */
  const readCompatibility = (drug1: string, drug2: string): DrugCompatibility => {
    console.log(`[readCompatibility] 🔍 START - Drug1: "${drug1}", Drug2: "${drug2}"`);

    // Se stesso farmaco
    if (drug1 === drug2) {
      console.log(`[readCompatibility] ✅ Same drug, returning COMPATIBLE`);
      return DrugCompatibility.COMPATIBLE;
    }

    // 🆕 PRIMA: Usa il nuovo servizio con 134 farmaci
    console.log(`[readCompatibility] 🔄 Service loaded:`, drugDatabaseService.isLoaded());

    if (drugDatabaseService.isLoaded()) {
      try {
        console.log(`[readCompatibility] 🔍 Calling checkCompatibility("${drug1}", "${drug2}")...`);
        const result = drugDatabaseService.checkCompatibility(drug1, drug2);

        console.log(`[readCompatibility] 📊 Result from service:`, result);

        // Controlla se il risultato esiste
        if (result) {
          console.log(`[readCompatibility] ✅ Got result - Status: ${result.status}`);

          // Converti il nuovo formato al vecchio usando l'enum
          switch (result.status) {
            case CompatibilityStatus.COMPATIBLE:
              console.log(
                `[readCompatibility] ✅ COMPATIBLE → Returning DrugCompatibility.COMPATIBLE`,
              );
              return DrugCompatibility.COMPATIBLE; // 'C'
            case CompatibilityStatus.COMPATIBLE_CONDITIONAL:
              console.log(
                `[readCompatibility] ⚠️ COMPATIBLE_CONDITIONAL → Returning DrugCompatibility.COMPATIBLE_ON_TAP`,
              );
              return DrugCompatibility.COMPATIBLE_ON_TAP; // 'Y'
            case CompatibilityStatus.INCOMPATIBLE:
              console.log(
                `[readCompatibility] ❌ INCOMPATIBLE → Returning DrugCompatibility.INCOMPATIBLE`,
              );
              return DrugCompatibility.INCOMPATIBLE; // 'I'
            case CompatibilityStatus.INCOMPATIBLE_SEVERE:
              // ⚠️ INCOMPATIBLE_SEVERE = dati contrastanti che indicano INCOMPATIBILITÀ
              // Trattato come INCOMPATIBLE (NON come CONFLICTING_DATA)
              console.log(
                `[readCompatibility] 🚨 INCOMPATIBLE_SEVERE → Returning DrugCompatibility.INCOMPATIBLE (NOT CONFLICTING_DATA)`,
              );
              return DrugCompatibility.INCOMPATIBLE; // 'I' (NON '!')
            case CompatibilityStatus.UNKNOWN:
            default:
              console.log(`[readCompatibility] ❓ UNKNOWN → Returning DrugCompatibility.NO_DATA`);
              return DrugCompatibility.NO_DATA; // ''
          }
        } else {
          console.warn(`[readCompatibility] ⚠️ Result is NULL - drugs not found in database`);
        }
      } catch (error) {
        console.error('[readCompatibility] ❌ Error with new service:', error);
        // Continua con fallback
      }
    } else {
      console.warn(`[readCompatibility] ⚠️ Service NOT loaded, using fallback`);
    }

    // FALLBACK: Vecchio database (solo per test/sviluppo)
    console.log(`[readCompatibility] 🔄 Checking fallback matrix for "${drug1}" vs "${drug2}"`);
    if (compatibilityMatrix.value[drug1]?.[drug2]) {
      const fallbackResult = compatibilityMatrix.value[drug1][drug2] as DrugCompatibility;
      console.log(`[readCompatibility] 📊 Fallback result:`, fallbackResult);
      return fallbackResult;
    }

    // Nessun dato disponibile
    console.warn(`[readCompatibility] ❌ NO DATA FOUND - Returning DrugCompatibility.NO_DATA`);
    return DrugCompatibility.NO_DATA;
  };

  /**
   * Checks compatibility of a single drug against a list of other drugs
   * Based on: ControlDrugs.java compatibilityController()
   * @param mainDrug - The drug to check compatibility for
   * @param drugsList - Array of drug names to check against
   * @returns CompatibilityResult object with categorized drug lists (compatible, incompatible, etc.)
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
   * Analyzes compatibility between multiple selected drugs and generates warnings/recommendations
   * Based on: ControlDrugs.java compatibilityController(DefaultListModel)
   * @param drugsList - Array of drug names to analyze together
   * @returns MultiDrugAnalysis with results, warnings (critical/warning/info), and clinical recommendations
   */
  const analyzeMultipleDrugs = (drugsList: string[]): MultiDrugAnalysis => {
    const results: CompatibilityResult[] = [];
    const warnings: CompatibilityWarning[] = [];
    const recommendations: string[] = [];

    // Costruisci matrice di compatibilità dai risultati analizzati
    const newCompatibilityMatrix: CompatibilityMatrix = {};

    // Analizza ogni farmaco
    for (const drug of drugsList) {
      const result = checkDrugCompatibility(drug, drugsList);
      results.push(result);

      // Popola la matrice di compatibilità per questo farmaco
      if (!newCompatibilityMatrix[drug]) {
        newCompatibilityMatrix[drug] = {};
      }

      // Aggiungi tutti i farmaci compatibili
      for (const compatDrug of result.compatible) {
        newCompatibilityMatrix[drug][compatDrug] = DrugCompatibility.COMPATIBLE;
      }

      // Aggiungi farmaci compatibili al rubinetto (Y-site)
      for (const tapDrug of result.compatibleOnTap) {
        newCompatibilityMatrix[drug][tapDrug] = DrugCompatibility.COMPATIBLE_ON_TAP;
      }

      // Aggiungi farmaci incompatibili
      for (const incompDrug of result.incompatible) {
        newCompatibilityMatrix[drug][incompDrug] = DrugCompatibility.INCOMPATIBLE;
      }

      // Aggiungi farmaci con dati contrastanti
      for (const conflictDrug of result.conflictingData) {
        newCompatibilityMatrix[drug][conflictDrug] = DrugCompatibility.CONFLICTING_DATA;
      }

      // Aggiungi farmaci senza dati
      for (const noDataDrug of result.noDataAvailable) {
        newCompatibilityMatrix[drug][noDataDrug] = DrugCompatibility.NO_DATA;
      }

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
            message: t('drugCompatibility.compatibilityResults.conflictingDataWarning', {
              drug1: drug,
              drug2: conflictDrug,
            }),
            action: t('drugCompatibility.compatibilityResults.consultPharmacologist'),
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
            message: t('drugCompatibility.compatibilityResults.ySiteCompatInfo', {
              drug,
              others: result.compatibleOnTap.join(', '),
            }),
            action: t('drugCompatibility.compatibilityResults.useYSiteConnector'),
          });
        }
      }
    }

    // Genera raccomandazioni
    if (warnings.some((w) => w.type === 'critical')) {
      recommendations.push(t('drugCompatibility.compatibilityResults.criticalWarning'));
      recommendations.push(t('drugCompatibility.compatibilityResults.useSeparateLines'));
    }

    if (warnings.some((w) => w.type === 'warning')) {
      recommendations.push(t('drugCompatibility.compatibilityResults.consultPharmacy'));
    }

    if (warnings.length === 0 || warnings.every((w) => w.type === 'info')) {
      recommendations.push(t('drugCompatibility.compatibilityResults.noCriticalIncompatibilities'));
      recommendations.push(t('drugCompatibility.compatibilityResults.checkDilution'));
    }

    return {
      drugs: drugsList,
      compatibilityMatrix: newCompatibilityMatrix, // USA LA NUOVA MATRICE COSTRUITA DAI RISULTATI
      results,
      warnings,
      recommendations,
    };
  };

  // ============================================================
  // UTILITY FUNCTIONS - Formatting and reporting
  // ============================================================

  /**
   * Formats an array of drug names into a semicolon-separated string
   * Based on: ControlDrugs.java reformatString()
   * @param drugsList - Array of drug names
   * @returns Formatted string (e.g., "Drug1; Drug2; Drug3") or "Nessuno" if empty
   */
  const formatDrugList = (drugsList: string[]): string => {
    if (drugsList.length === 0) return 'Nessuno';
    return drugsList.join('; ');
  };

  /**
   * Generates a formatted text report of compatibility results for a single drug
   * Based on: ControlDrugs.java output formatting
   * @param result - CompatibilityResult object to format
   * @returns Multi-line text report with emoji indicators and categorized drug lists
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

  // ============================================================
  // SELECTION MANAGEMENT - Add, remove, and clear drug selections
  // ============================================================

  /**
   * Adds a drug to the selected drugs list (prevents duplicates)
   * @param drugName - Name of drug to add to selection
   */
  const addDrug = (drugName: string) => {
    if (!selectedDrugs.value.includes(drugName)) {
      selectedDrugs.value.push(drugName);
    }
  };

  /**
   * Removes a drug from the selected drugs list
   * @param drugName - Name of drug to remove from selection
   */
  const removeDrug = (drugName: string) => {
    const index = selectedDrugs.value.indexOf(drugName);
    if (index > -1) {
      selectedDrugs.value.splice(index, 1);
    }
  };

  /**
   * Clears all selected drugs from the selection
   * Based on: DrugFilter.java clear button
   */
  const clearSelection = () => {
    selectedDrugs.value = [];
  };

  /**
   * Finds a drug object by name (case-insensitive search)
   * @param name - Drug name to search for
   * @returns Drug object if found, undefined otherwise
   */
  const findDrugByName = (name: string): Drug | undefined => {
    return drugs.value.find((drug) => drug.name.toLowerCase() === name.toLowerCase());
  };

  // ============================================================
  // UI HELPERS - Icon mapping and visual indicators
  // ============================================================

  /**
   * Maps drug category to corresponding emoji icon for UI display
   * @param category - Drug category string (antibiotic, analgesic, cardiovascular, etc.)
   * @returns Emoji icon representing the drug category
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

  // ============================================================
  // RETURN - Exposed composable API
  // ============================================================
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
