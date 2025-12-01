/**
 * @file useDrugDatabase.ts
 * @description Composable for managing drug database with i18n support.
 *              Provides centralized access to drug data, compatibility matrix,
 *              and brochure information with bilingual (IT/EN) text extraction.
 *
 * @author Vasile Chifeac
 * @created 2025-11-23
 *
 * @features
 * - Load JSON database (index.json + compatibility.json) in parallel
 * - Global cache with ref() shared state (load once, use everywhere)
 * - Lazy loading (load only when first requested)
 * - i18n support (extract IT/EN text based on locale)
 * - Helper functions: getDrug(), getCompatibility(), searchDrugs(), filterByCategory()
 * - Error handling with fallback to empty data
 *
 * @usage
 * ```typescript
 * import { useDrugDatabase } from 'src/composables/useDrugDatabase';
 *
 * const { isLoaded, loadDatabase, getDrug, searchDrugs } = useDrugDatabase();
 *
 * // Load database (call once in App.vue onMounted)
 * await loadDatabase();
 *
 * // Get drug by ID with Italian text
 * const drug = getDrug('vancomycin', 'it');
 * console.log(drug?.name); // "Vancomicina"
 *
 * // Search drugs by term
 * const results = searchDrugs('vanco', 'it');
 * console.log(results); // [{ id: 'vancomycin', name: 'Vancomicina', ... }]
 * ```
 *
 * @dependencies
 * - Vue 3 Composition API (ref, computed)
 * - DrugTypes (BilingualText, DrugDatabaseEntry, CompatibilityEntry, DrugDatabase)
 */

// ============================================================
// IMPORTS
// ============================================================
import { ref, computed } from 'vue';
import type {
  BilingualText,
  BilingualArray,
  DrugDatabaseEntry,
  CompatibilityEntry,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  BrochureData, // Imported for type documentation, used in JSDoc comments
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DrugDatabase, // Imported for type documentation, used in JSDoc comments
  DrugCompatibility,
} from 'src/types/DrugTypes';

// ============================================================
// TYPES & INTERFACES
// ============================================================

/**
 * Supported locales for i18n
 * @type LocaleType
 */
export type LocaleType = 'it' | 'en';

/**
 * Flattened drug entry with extracted bilingual text
 * Used for search/filter results with locale-specific text
 *
 * @interface FlattenedDrug
 */
export interface FlattenedDrug {
  /** Drug ID */
  id: string;
  /** Drug name (locale-extracted: "Vancomicina" or "Vancomycin") */
  name: string;
  /** Category (locale-extracted: "antibiotico" or "antibiotic") */
  category: string;
  /** Active ingredient (locale-extracted) */
  activeIngredient: string;
  /** Standard concentration (no i18n) */
  standardConcentration: string;
  /** pH range (no i18n) */
  pH?: {
    min: number;
    max: number;
  };
  /** Stability room temp (locale-extracted) */
  stabilityRoomTemp?: string;
  /** Stability refrigerated (locale-extracted) */
  stabilityRefrigerated?: string;
  /** Keywords (locale-extracted array) */
  keywords?: string[];
}

/**
 * Flattened compatibility entry with extracted bilingual note
 *
 * @interface FlattenedCompatibility
 */
export interface FlattenedCompatibility {
  /** Drug 1 ID */
  drug1: string;
  /** Drug 2 ID */
  drug2: string;
  /** Compatibility status */
  compatibility: DrugCompatibility;
  /** Clinical note (locale-extracted) */
  note?: string;
  /** Reference (no i18n) */
  reference?: string;
}

// ============================================================
// STATE - Global Cache (Shared across all components)
// ============================================================

/**
 * Global cache for drug database
 * Shared ref() ensures single source of truth across all components
 */
const drugsCache = ref<DrugDatabaseEntry[]>([]);
const compatibilityCache = ref<CompatibilityEntry[]>([]);
const isLoaded = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const loadError = ref<string | null>(null);

// ============================================================
// HELPER FUNCTIONS - Private (Internal Use Only)
// ============================================================

/**
 * Extract text from BilingualText field based on locale
 *
 * @param field - BilingualText object { it: string, en: string }
 * @param locale - Locale to extract ('it' or 'en')
 * @returns Extracted text for specified locale
 *
 * @example
 * const name = { it: "Vancomicina", en: "Vancomycin" };
 * getText(name, 'it'); // "Vancomicina"
 * getText(name, 'en'); // "Vancomycin"
 */
function getText(field: BilingualText | undefined, locale: LocaleType): string {
  if (!field) return '';
  return field[locale] || field.it || field.en || '';
}

/**
 * Extract array from BilingualArray field based on locale
 *
 * @param field - BilingualArray object { it: string[], en: string[] }
 * @param locale - Locale to extract ('it' or 'en')
 * @returns Extracted array for specified locale
 *
 * @example
 * const keywords = { it: ["antibiotico"], en: ["antibiotic"] };
 * getArray(keywords, 'it'); // ["antibiotico"]
 */
function getArray(field: BilingualArray | undefined, locale: LocaleType): string[] {
  if (!field) return [];
  return field[locale] || field.it || field.en || [];
}

/**
 * Flatten DrugDatabaseEntry with locale-extracted text
 *
 * @param drug - DrugDatabaseEntry with BilingualText fields
 * @param locale - Locale to extract ('it' or 'en')
 * @returns FlattenedDrug with plain string fields
 *
 * @example
 * const drug = {
 *   id: 'vancomycin',
 *   name: { it: "Vancomicina", en: "Vancomycin" },
 *   category: { it: "antibiotico", en: "antibiotic" }
 * };
 * flattenDrug(drug, 'it');
 * // { id: 'vancomycin', name: 'Vancomicina', category: 'antibiotico' }
 */
function flattenDrug(drug: DrugDatabaseEntry, locale: LocaleType): FlattenedDrug {
  const result: FlattenedDrug = {
    id: drug.id,
    name: getText(drug.name, locale),
    category: getText(drug.category, locale),
    activeIngredient: getText(drug.activeIngredient, locale),
    standardConcentration: drug.standardConcentration,
  };

  // Add optional properties explicitly to satisfy exactOptionalPropertyTypes
  if (drug.pH !== undefined) result.pH = drug.pH;
  if (drug.stability) {
    result.stabilityRoomTemp = getText(drug.stability.roomTemp, locale);
    result.stabilityRefrigerated = getText(drug.stability.refrigerated, locale);
  }
  if (drug.keywords) result.keywords = getArray(drug.keywords, locale);

  return result;
}

/**
 * Flatten CompatibilityEntry with locale-extracted note
 *
 * @param entry - CompatibilityEntry with BilingualText note
 * @param locale - Locale to extract ('it' or 'en')
 * @returns FlattenedCompatibility with plain string note
 */
function flattenCompatibility(
  entry: CompatibilityEntry,
  locale: LocaleType,
): FlattenedCompatibility {
  const result: FlattenedCompatibility = {
    drug1: entry.drug1,
    drug2: entry.drug2,
    compatibility: entry.compatibility,
  };

  // Add optional properties explicitly to satisfy exactOptionalPropertyTypes
  if (entry.note) result.note = getText(entry.note, locale);
  if (entry.reference !== undefined) result.reference = entry.reference;

  return result;
}

// ============================================================
// PUBLIC FUNCTIONS - Composable API
// ============================================================

/**
 * Load drug database from JSON files (index.json + compatibility.json)
 * Loads in parallel using Promise.all() for performance
 * Caches results in global ref() for reuse
 *
 * @returns Promise<void>
 *
 * @example
 * await loadDatabase();
 * console.log(isLoaded.value); // true
 * console.log(drugsCache.value.length); // 150
 */
async function loadDatabase(): Promise<void> {
  // Skip if already loaded or currently loading
  if (isLoaded.value || isLoading.value) {
    console.log('[useDrugDatabase] Database already loaded or loading, skipping...');
    return;
  }

  isLoading.value = true;
  loadError.value = null;

  try {
    console.log('[useDrugDatabase] Loading database...');

    // Load both JSON files in parallel for performance
    const [indexResponse, compatibilityResponse] = await Promise.all([
      fetch('/data/drugs/index.json'),
      fetch('/data/drugs/compatibility.json'),
    ]);

    // Check HTTP responses
    if (!indexResponse.ok) {
      throw new Error(`Failed to load index.json: ${indexResponse.statusText}`);
    }
    if (!compatibilityResponse.ok) {
      throw new Error(`Failed to load compatibility.json: ${compatibilityResponse.statusText}`);
    }

    // Parse JSON
    const indexData = (await indexResponse.json()) as {
      drugs: DrugDatabaseEntry[];
    };
    const compatibilityData = (await compatibilityResponse.json()) as {
      compatibility: CompatibilityEntry[];
    };

    // Populate cache
    drugsCache.value = indexData.drugs || [];
    compatibilityCache.value = compatibilityData.compatibility || [];

    isLoaded.value = true;
    console.log(
      `[useDrugDatabase] ✅ Database loaded successfully: ${drugsCache.value.length} drugs, ${compatibilityCache.value.length} compatibility pairs`,
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    loadError.value = errorMessage;
    console.error('[useDrugDatabase] ❌ Error loading database:', error);

    // Fallback to empty cache
    drugsCache.value = [];
    compatibilityCache.value = [];
    isLoaded.value = false;
  } finally {
    isLoading.value = false;
  }
}

/**
 * Get drug by ID with locale-extracted text
 *
 * @param drugId - Drug ID (e.g., 'vancomycin')
 * @param locale - Locale to extract ('it' or 'en'), default 'it'
 * @returns FlattenedDrug or undefined if not found
 *
 * @example
 * const drug = getDrug('vancomycin', 'it');
 * console.log(drug?.name); // "Vancomicina"
 *
 * const drugEN = getDrug('vancomycin', 'en');
 * console.log(drugEN?.name); // "Vancomycin"
 */
function getDrug(drugId: string, locale: LocaleType = 'it'): FlattenedDrug | undefined {
  const drug = drugsCache.value.find((d) => d.id === drugId);
  return drug ? flattenDrug(drug, locale) : undefined;
}

/**
 * Get compatibility between two drugs
 * Supports symmetric lookup (drug1↔drug2 = drug2↔drug1)
 *
 * @param drug1Id - First drug ID
 * @param drug2Id - Second drug ID
 * @param locale - Locale to extract note ('it' or 'en'), default 'it'
 * @returns FlattenedCompatibility or undefined if not found
 *
 * @example
 * const compat = getCompatibility('vancomycin', 'furosemide', 'it');
 * console.log(compat?.compatibility); // "I" (Incompatible)
 * console.log(compat?.note); // "Fisicamente incompatibili. Precipitazione..."
 */
function getCompatibility(
  drug1Id: string,
  drug2Id: string,
  locale: LocaleType = 'it',
): FlattenedCompatibility | undefined {
  // Try direct lookup (drug1 → drug2)
  let entry = compatibilityCache.value.find((c) => c.drug1 === drug1Id && c.drug2 === drug2Id);

  // Try symmetric lookup (drug2 → drug1)
  if (!entry) {
    entry = compatibilityCache.value.find((c) => c.drug1 === drug2Id && c.drug2 === drug1Id);
  }

  return entry ? flattenCompatibility(entry, locale) : undefined;
}

/**
 * Search drugs by term (name, active ingredient, keywords)
 * Case-insensitive search across multiple fields
 *
 * @param searchTerm - Search term (e.g., 'vanco', 'antibiotico')
 * @param locale - Locale to search in ('it' or 'en'), default 'it'
 * @returns Array of FlattenedDrug matching search term
 *
 * @example
 * const results = searchDrugs('vanco', 'it');
 * // [{ id: 'vancomycin', name: 'Vancomicina', ... }]
 *
 * const resultsEN = searchDrugs('antibiotic', 'en');
 * // [{ id: 'vancomycin', name: 'Vancomycin', category: 'antibiotic', ... }]
 */
function searchDrugs(searchTerm: string, locale: LocaleType = 'it'): FlattenedDrug[] {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return drugsCache.value.map((d) => flattenDrug(d, locale));
  }

  const lowerTerm = searchTerm.toLowerCase().trim();

  return drugsCache.value
    .filter((drug) => {
      const flattened = flattenDrug(drug, locale);

      // Search in name
      if (flattened.name.toLowerCase().includes(lowerTerm)) return true;

      // Search in category
      if (flattened.category.toLowerCase().includes(lowerTerm)) return true;

      // Search in active ingredient
      if (flattened.activeIngredient.toLowerCase().includes(lowerTerm)) return true;

      // Search in keywords
      if (flattened.keywords?.some((k) => k.toLowerCase().includes(lowerTerm))) return true;

      return false;
    })
    .map((d) => flattenDrug(d, locale));
}

/**
 * Filter drugs by category
 *
 * @param category - Category to filter (e.g., 'antibiotico', 'antibiotic')
 * @param locale - Locale to filter in ('it' or 'en'), default 'it'
 * @returns Array of FlattenedDrug in specified category
 *
 * @example
 * const antibiotics = filterByCategory('antibiotico', 'it');
 * // [{ id: 'vancomycin', ... }, { id: 'amikacin', ... }]
 */
function filterByCategory(category: string, locale: LocaleType = 'it'): FlattenedDrug[] {
  const lowerCategory = category.toLowerCase().trim();

  return drugsCache.value
    .filter((drug) => {
      const flattened = flattenDrug(drug, locale);
      return flattened.category.toLowerCase() === lowerCategory;
    })
    .map((d) => flattenDrug(d, locale));
}

/**
 * Get all drugs with locale-extracted text
 *
 * @param locale - Locale to extract ('it' or 'en'), default 'it'
 * @returns Array of all FlattenedDrug
 *
 * @example
 * const allDrugs = getAllDrugs('it');
 * console.log(allDrugs.length); // 150
 */
function getAllDrugs(locale: LocaleType = 'it'): FlattenedDrug[] {
  return drugsCache.value.map((d) => flattenDrug(d, locale));
}

/**
 * Get all compatibility entries with locale-extracted notes
 *
 * @param locale - Locale to extract ('it' or 'en'), default 'it'
 * @returns Array of all FlattenedCompatibility
 *
 * @example
 * const allCompat = getAllCompatibility('it');
 * console.log(allCompat.length); // 11175 (for 150 drugs)
 */
function getAllCompatibility(locale: LocaleType = 'it'): FlattenedCompatibility[] {
  return compatibilityCache.value.map((c) => flattenCompatibility(c, locale));
}

/**
 * Computed: Total drugs count
 */
const totalDrugs = computed(() => drugsCache.value.length);

/**
 * Computed: Total compatibility pairs count
 */
const totalCompatibilityPairs = computed(() => compatibilityCache.value.length);

// ============================================================
// EXPORTS - Composable API
// ============================================================

/**
 * useDrugDatabase composable
 * Provides centralized drug database access with i18n support
 *
 * @returns Composable object with state and functions
 */
export function useDrugDatabase() {
  return {
    // State
    isLoaded,
    isLoading,
    loadError,
    totalDrugs,
    totalCompatibilityPairs,

    // Functions
    loadDatabase,
    getDrug,
    getCompatibility,
    searchDrugs,
    filterByCategory,
    getAllDrugs,
    getAllCompatibility,

    // Helper types (for consumers)
    getText,
    getArray,
  };
}
