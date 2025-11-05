/**
 * Tipi TypeScript per il sistema di compatibilità farmaci
 * Convertiti da: https://github.com/vas-chif/drugsCompatibility
 */

/**
 * Livelli di compatibilità farmacologica
 * Basato sul codice Java ControlDrugs.java
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
 * Categorie farmacologiche
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
 * Vie di somministrazione
 */
export enum AdministrationRoute {
  IV = 'intravenous',
  IM = 'intramuscular',
  SC = 'subcutaneous',
  PO = 'oral',
  SL = 'sublingual',
  TOPICAL = 'topical',
}

/**
 * Risultato del controllo di compatibilità tra farmaci
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
