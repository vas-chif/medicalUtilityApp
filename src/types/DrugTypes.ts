/**
 * @file DrugTypes.ts
 * @description Comprehensive TypeScript type definitions for the drug compatibility system.
 *              Converted from Java-based drugCompatibility system (GitHub: vas-chif/drugsCompatibility).
 *              Provides type safety for drug compatibility checking, analysis, and reporting.
 *
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-01-20
 *
 * @notes
 * - Total 201 lines of production-ready TypeScript type definitions
 * - Converted from Java drug compatibility system (ControlDrugs.java, FunctionPostgreSQL.java)
 * - Full type safety for Vue 3 Composition API implementation
 * - Supports 5 compatibility levels with enum-based type safety
 * - Includes drug categorization (11 categories: antibiotic, cardiovascular, etc.)
 * - Administration route types (IV, IM, SC, PO, SL, Topical)
 * - Warning system types (Critical, Warning, Info severity levels)
 * - Matrix-based compatibility lookup structure
 * - Multi-drug analysis result types
 *
 * @dependencies
 * - None (pure TypeScript type definitions)
 *
 * @compatibility-system
 * DrugCompatibility enum values:
 * - 'C' (COMPATIBLE): Drugs can be mixed in the same solution
 * - 'Y' (COMPATIBLE_ON_TAP): Compatible only at Y-site, not mixed in bag
 * - 'I' (INCOMPATIBLE): NEVER mix together (precipitation/degradation risk)
 * - '!' (CONFLICTING_DATA): Literature reports conflicting compatibility data
 * - '' (NO_DATA): No compatibility data available in medical literature
 *
 * @usage
 * ```typescript
 * import type { Drug, CompatibilityResult, MultiDrugAnalysis } from 'src/types/DrugTypes';
 * import { DrugCompatibility } from 'src/types/DrugTypes';
 *
 * // Type-safe drug object
 * const drug: Drug = {
 *   id: 'norepi',
 *   name: 'Norepinephrine',
 *   category: DrugCategory.VASOPRESSOR,
 *   route: AdministrationRoute.IV
 * };
 *
 * // Type-safe compatibility check
 * const compatibility: DrugCompatibility = DrugCompatibility.COMPATIBLE;
 * ```
 */

// ============================================================
// ENUMS - Drug Compatibility Levels & Categories
// ============================================================

/**
 * Drug compatibility levels based on Y-site compatibility data
 * Based on: Java ControlDrugs.java compatibility codes
 * @enum {string}
 */
export enum DrugCompatibility {
  /** C - Compatible: Farmaci compatibili */
  COMPATIBLE = 'C',

  /** Y - Compatible on Tap: Compatibili se somministrati tramite rubinetto/Y-site */
  COMPATIBLE_ON_TAP = 'Y',

  /** I - Incompatible: Farmaci incompatibili */
  INCOMPATIBLE = 'I',

  /** ! - Conflicting Data: Dati contrastanti sulla compatibilità */
  CONFLICTING_DATA = '!',

  /** '' - No Data Available: Nessun dato disponibile */
  NO_DATA = '',
}

/**
 * Interfaccia per un singolo farmaco
 */
export interface Drug {
  /** ID univoco del farmaco */
  id: string;

  /** Nome commerciale del farmaco */
  name: string;

  /** Principio attivo */
  activeIngredient?: string;

  /** Categoria farmacologica */
  category?: DrugCategory;

  /** Concentrazione standard */
  concentration?: string;

  /** Via di somministrazione preferita */
  route?: AdministrationRoute;

  /** Note cliniche */
  clinicalNotes?: string;
}

/**
 * Pharmacological drug categories for classification and filtering
 * @enum {string}
 */
export enum DrugCategory {
  ANTIBIOTIC = 'antibiotic',
  ANALGESIC = 'analgesic',
  CARDIOVASCULAR = 'cardiovascular',
  ANTICOAGULANT = 'anticoagulant',
  SEDATIVE = 'sedative',
  ELECTROLYTE = 'electrolyte',
  VASOPRESSOR = 'vasopressor',
  INSULIN = 'insulin',
  DIURETIC = 'diuretic',
  ANTIARRHYTHMIC = 'antiarrhythmic',
  OTHER = 'other',
}

/**
 * Routes of drug administration
 * @enum {string}
 */
export enum AdministrationRoute {
  IV = 'intravenous',
  IM = 'intramuscular',
  SC = 'subcutaneous',
  PO = 'oral',
  SL = 'sublingual',
  TOPICAL = 'topical',
}

// ============================================================
// INTERFACES - Compatibility Results & Analysis
// ============================================================

/**
 * Result of compatibility check between one drug and a list of other drugs
 * @interface CompatibilityResult
 */
export interface CompatibilityResult {
  /** Farmaco principale analizzato */
  drug: string;

  /** Lista farmaci compatibili */
  compatible: string[];

  /** Lista farmaci compatibili solo tramite Y-site/rubinetto */
  compatibleOnTap: string[];

  /** Lista farmaci incompatibili */
  incompatible: string[];

  /** Lista farmaci con dati contrastanti */
  conflictingData: string[];

  /** Lista farmaci senza dati disponibili */
  noDataAvailable: string[];
}

/**
 * Matrice di compatibilità farmaci
 * Mappa Drug1 -> Drug2 -> Compatibility Status
 */
export type CompatibilityMatrix = Record<string, Record<string, DrugCompatibility>>;

/**
 * Interfaccia per la ricerca e filtro farmaci
 */
export interface DrugSearchFilter {
  /** Termine di ricerca */
  searchTerm: string;

  /** Categoria filtro */
  category?: DrugCategory;

  /** Via di somministrazione filtro */
  route?: AdministrationRoute;
}

/**
 * Risultato analisi interazioni multiple
 */
export interface MultiDrugAnalysis {
  /** Lista farmaci analizzati */
  drugs: string[];

  /** Matrice di compatibilità completa */
  compatibilityMatrix: CompatibilityMatrix;

  /** Risultati dettagliati per ogni farmaco */
  results: CompatibilityResult[];

  /** Warnings globali */
  warnings: CompatibilityWarning[];

  /** Raccomandazioni cliniche */
  recommendations: string[];
}

/**
 * Warning di compatibilità
 */
export interface CompatibilityWarning {
  /** Tipo di warning */
  type: 'critical' | 'warning' | 'info';

  /** Farmaci coinvolti */
  drugs: [string, string];

  /** Messaggio descrittivo */
  message: string;

  /** Azione raccomandata */
  action?: string;
}

/**
 * Configurazione database farmaci
 * Basato su IFunctionPostgreSqlPV.java
 */
export interface DrugDatabaseConfig {
  /** Host database */
  host: string;

  /** Porta database */
  port: string;

  /** Nome database */
  database: string;

  /** Username */
  username: string;

  /** Password */
  password: string;

  /** Nome tabella principale */
  tableName: string;

  /** Nome colonna farmaci */
  columnName: string;
}

/**
 * Default config (basato su Java interface)
 */
export const DEFAULT_DB_CONFIG: DrugDatabaseConfig = {
  host: 'localhost',
  port: '5432',
  database: 'DrugsCompatibility',
  username: 'postgres',
  password: 'root',
  tableName: 'drugsCompatibility',
  columnName: 'name_of_drugs',
};

// ============================================================
// INTERFACES - JSON Static Database (NEW)
// ============================================================

/**
 * Bilingual text field (Italian + English)
 * Used for i18n-ready database fields
 *
 * @interface BilingualText
 *
 * @example
 * {
 *   "it": "Vancomicina",
 *   "en": "Vancomycin"
 * }
 */
export interface BilingualText {
  /** Italian text */
  it: string;
  /** English text */
  en: string;
}

/**
 * Bilingual array field (Italian + English)
 * Used for keywords, contraindications, side effects arrays
 *
 * @interface BilingualArray
 *
 * @example
 * {
 *   "it": ["antibiotico", "gram-positivi"],
 *   "en": ["antibiotic", "gram-positive"]
 * }
 */
export interface BilingualArray {
  /** Italian array */
  it: string[];
  /** English array */
  en: string[];
}

/**
 * Drug entry in static JSON database (index.json)
 * Used for autocomplete, search, and drug selection
 * BILINGUAL READY: All user-facing text fields support it/en
 *
 * @interface DrugDatabaseEntry
 *
 * @example
 * {
 *   "id": "vancomycin",
 *   "name": { "it": "Vancomicina", "en": "Vancomycin" },
 *   "category": { "it": "antibiotico", "en": "antibiotic" },
 *   "activeIngredient": { "it": "Vancomicina cloridrato", "en": "Vancomycin hydrochloride" },
 *   "standardConcentration": "5 mg/mL",
 *   "pH": { "min": 2.5, "max": 4.5 },
 *   "stability": {
 *     "roomTemp": { "it": "14 giorni", "en": "14 days" },
 *     "refrigerated": { "it": "63 giorni", "en": "63 days" }
 *   }
 * }
 */
export interface DrugDatabaseEntry {
  /** Unique drug identifier (kebab-case: "vancomycin", "amikacin") */
  id: string;

  /** Display name (bilingual: IT "Vancomicina", EN "Vancomycin") */
  name: BilingualText;

  /** Pharmacological category (bilingual: IT "antibiotico", EN "antibiotic") */
  category: BilingualText;

  /** Active pharmaceutical ingredient (bilingual) */
  activeIngredient: BilingualText;

  /** Standard concentration for IV administration (numeric value, no i18n) */
  standardConcentration: string;

  /** pH range (numeric values, no i18n) */
  pH?: {
    min: number;
    max: number;
  };

  /** Stability at different temperatures (bilingual) */
  stability?: {
    /** Stability at room temperature (bilingual: IT "24 ore", EN "24 hours") */
    roomTemp: BilingualText;
    /** Stability when refrigerated 2-8°C (bilingual) */
    refrigerated: BilingualText;
  };

  /** Keywords for search optimization (bilingual array) */
  keywords?: BilingualArray;
}

/**
 * Compatibility entry in static JSON database (compatibility.json)
 * Represents one drug-to-drug compatibility relationship
 * BILINGUAL READY: note field supports it/en
 *
 * @interface CompatibilityEntry
 *
 * @example
 * {
 *   "drug1": "vancomycin",
 *   "drug2": "furosemide",
 *   "compatibility": "I",
 *   "note": {
 *     "it": "Incompatibili. Precipitazione per pH diverso.",
 *     "en": "Incompatible. Precipitation due to pH difference."
 *   },
 *   "reference": "Trissel's 2018, p.1234"
 * }
 */
export interface CompatibilityEntry {
  /** First drug ID (matches DrugDatabaseEntry.id) */
  drug1: string;

  /** Second drug ID (matches DrugDatabaseEntry.id) */
  drug2: string;

  /** Compatibility status between drug1 and drug2 */
  compatibility: DrugCompatibility;

  /** Clinical note (bilingual: conditions, diluents, special instructions) */
  note?: BilingualText;

  /** Literature reference (no i18n: Trissel's, Micromedex, King Guide) */
  reference?: string;
}

/**
 * Drug brochure data (structured information from PDF extraction)
 * Stored in public/data/drugs/info/{drugId}.json
 * BILINGUAL READY: All clinical text fields support it/en
 *
 * @interface BrochureData
 *
 * @example
 * {
 *   "id": "vancomycin",
 *   "name": { "it": "Vancomicina", "en": "Vancomycin" },
 *   "activeIngredient": { "it": "Vancomicina cloridrato", "en": "Vancomycin hydrochloride" },
 *   "category": { "it": "antibiotico", "en": "antibiotic" },
 *   "dosage": {
 *     "adult": { "it": "15-20 mg/kg EV ogni 8-12h", "en": "15-20 mg/kg IV q8-12h" },
 *     "pediatric": { "it": "10-15 mg/kg EV ogni 6h", "en": "10-15 mg/kg IV q6h" },
 *     "renalAdjustment": { "it": "Aggiustare in base a CrCl", "en": "Adjust based on CrCl" }
 *   },
 *   "contraindications": {
 *     "it": ["Ipersensibilità", "Gravidanza (Categoria C)"],
 *     "en": ["Hypersensitivity", "Pregnancy (Category C)"]
 *   },
 *   "sideEffects": {
 *     "it": ["Sindrome uomo rosso", "Nefrotossicità"],
 *     "en": ["Red man syndrome", "Nephrotoxicity"]
 *   },
 *   "interactions": [
 *     {
 *       "drug": { "it": "Aminoglicosidi", "en": "Aminoglycosides" },
 *       "effect": { "it": "↑ nefrotossicità", "en": "↑ nephrotoxicity" },
 *       "recommendation": { "it": "Monitorare livelli", "en": "Monitor levels" },
 *       "severity": "critical"
 *     }
 *   ],
 *   "clinicalNotes": {
 *     "it": "Monitorare livelli trough (target 10-20 mcg/mL).",
 *     "en": "Monitor trough levels (goal: 10-20 mcg/mL)."
 *   },
 *   "references": [
 *     "Trissel's Handbook 18th ed., 2018",
 *     "Micromedex IV Compatibility, 2024"
 *   ]
 * }
 */
export interface BrochureData {
  /** Drug ID (matches DrugDatabaseEntry.id) */
  id: string;

  /** Drug display name (bilingual) */
  name: BilingualText;

  /** Active pharmaceutical ingredient (bilingual) */
  activeIngredient: BilingualText;

  /** Pharmacological category (bilingual) */
  category: BilingualText;

  /** Dosing information (bilingual) */
  dosage: {
    /** Adult dosing (bilingual: standard regimen) */
    adult: BilingualText;
    /** Pediatric dosing (bilingual) */
    pediatric: BilingualText;
    /** Renal adjustment guidelines (bilingual) */
    renalAdjustment?: BilingualText;
    /** Hepatic adjustment guidelines (bilingual) */
    hepaticAdjustment?: BilingualText;
  };

  /** Absolute contraindications (bilingual array: when NOT to use) */
  contraindications: BilingualArray;

  /** Common/serious side effects (bilingual array) */
  sideEffects: BilingualArray;

  /** Drug-drug interactions (bilingual interaction details) */
  interactions: DrugInteraction[];

  /** Clinical pearls, monitoring parameters, administration tips (bilingual) */
  clinicalNotes: BilingualText;

  /** Scientific references (no i18n: guidelines, textbooks, databases) */
  references: string[];
}

/**
 * Drug interaction detail (BILINGUAL READY)
 * @interface DrugInteraction
 */
export interface DrugInteraction {
  /** Interacting drug or drug class (bilingual) */
  drug: BilingualText;

  /** Description of interaction effect (bilingual) */
  effect: BilingualText;

  /** Clinical recommendation (bilingual: monitor, avoid, dose adjust) */
  recommendation: BilingualText;

  /** Severity level (no i18n: critical, moderate, minor) */
  severity?: 'critical' | 'moderate' | 'minor';
}

/**
 * Complete database structure (for loading/caching)
 * @interface DrugDatabase
 */
export interface DrugDatabase {
  /** List of all drugs (from index.json) */
  drugs: DrugDatabaseEntry[];

  /** Compatibility matrix (from compatibility.json) */
  compatibility: CompatibilityEntry[];

  /** Metadata (version, last update) */
  metadata: {
    version: string;
    lastUpdated: string;
    totalDrugs: number;
    totalCompatibilityPairs: number;
  };
}
