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
