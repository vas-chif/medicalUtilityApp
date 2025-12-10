/**
 * Drug Database TypeScript Interfaces
 * 
 * Type definitions for the drug compatibility database used in Medical Utility app
 * Generated from drugs-database.json v1.0.0
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Possible compatibility statuses between two drugs
 */
export enum CompatibilityStatus {
  /** Drugs are compatible and can be mixed */
  COMPATIBLE = 'compatible',
  
  /** Drugs are incompatible and should not be mixed */
  INCOMPATIBLE = 'incompatible',
  
  /** Drugs may be compatible depending on concentration */
  COMPATIBLE_CONDITIONAL = 'compatible-conditional',
  
  /** Severe/dangerous incompatibility - critical warning needed */
  INCOMPATIBLE_SEVERE = 'incompatible-severe',
  
  /** Compatibility status is unknown */
  UNKNOWN = 'unknown'
}

/**
 * Supported languages
 */
export enum Language {
  IT = 'it',
  EN = 'en'
}

// ============================================================================
// INTERFACES
// ============================================================================

/**
 * Multilingual text object
 */
export interface MultilingualText {
  it: string;
  en: string;
}

/**
 * CVC (Central Venous Catheter) requirement information
 */
export interface CvcRequirement {
  /** Whether CVC is required for this drug */
  required: boolean;
  
  /** Additional details about CVC requirement (e.g., "CVC+C", "SI + C") */
  details: MultilingualText;
}

/**
 * Compatibility information between two drugs
 */
export interface DrugCompatibility {
  /** ID of the other drug */
  drugId: string;
  
  /** Compatibility status */
  status: CompatibilityStatus;
}

/**
 * Complete drug information
 */
export interface Drug {
  /** Unique identifier (lowercase, hyphenated) */
  id: string;
  
  /** Drug name in multiple languages */
  name: MultilingualText;
  
  /** Whether the drug is photosensitive */
  isPhotosensitive: boolean;
  
  /** CVC requirement information */
  cvcRequirement: CvcRequirement;
  
  /** Concentration-specific notes and warnings */
  concentrationNotes: MultilingualText;
  
  /** Phlebitis risk information */
  phlebitisRisk: MultilingualText;
  
  /** Reserved for future additional information */
  additionalInfo: Record<string, unknown>;
  
  /** List of compatibility records with other drugs */
  compatibility: DrugCompatibility[];
}

/**
 * Statistics about compatibility statuses in the database
 */
export interface CompatibilityStats {
  compatible: number;
  incompatible: number;
  'compatible-conditional': number;
  'incompatible-severe': number;
  unknown: number;
}

/**
 * Schema information
 */
export interface SchemaInfo {
  compatibilityStatuses: CompatibilityStatus[];
  multilingual: Language[];
}

/**
 * Database metadata
 */
export interface DatabaseMetadata {
  /** Database version (semantic versioning) */
  version: string;
  
  /** ISO 8601 timestamp when database was generated */
  generatedAt: string;
  
  /** Source CSV filename */
  sourceFile: string;
  
  /** Total number of drugs in database */
  totalDrugs: number;
  
  /** Total number of compatibility entries */
  totalCompatibilityEntries: number;
  
  /** Breakdown of compatibility statuses */
  compatibilityStats: CompatibilityStats;
  
  /** Schema information */
  schema: SchemaInfo;
}

/**
 * Complete drug database structure
 */
export interface DrugDatabase {
  /** Database metadata and statistics */
  metadata: DatabaseMetadata;
  
  /** Array of all drugs */
  drugs: Drug[];
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if a value is a valid CompatibilityStatus
 */
export function isCompatibilityStatus(value: string): value is CompatibilityStatus {
  return Object.values(CompatibilityStatus).includes(value as CompatibilityStatus);
}

/**
 * Type guard to check if an object is a valid Drug
 */
export function isDrug(obj: unknown): obj is Drug {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const drug = obj as Partial<Drug>;
  return (
    typeof drug.id === 'string' &&
    typeof drug.name === 'object' &&
    typeof drug.isPhotosensitive === 'boolean' &&
    typeof drug.cvcRequirement === 'object' &&
    Array.isArray(drug.compatibility)
  );
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Drug with only essential fields (for lists/previews)
 */
export type DrugSummary = Pick<Drug, 'id' | 'name' | 'isPhotosensitive' | 'cvcRequirement'>;

/**
 * Compatibility lookup result
 */
export interface CompatibilityResult {
  drug1: Drug;
  drug2: Drug;
  status: CompatibilityStatus;
  warning?: string;
}

/**
 * Search filter options
 */
export interface DrugSearchFilter {
  /** Search query (name, ID) */
  query?: string;
  
  /** Filter by CVC requirement */
  requiresCvc?: boolean;
  
  /** Filter by photosensitivity */
  isPhotosensitive?: boolean;
  
  /** Filter by compatibility status with specific drug */
  compatibleWith?: string;
  
  /** Exclude drugs with unknown compatibility */
  excludeUnknown?: boolean;
}

/**
 * Sort options for drug lists
 */
export interface DrugSortOptions {
  /** Field to sort by */
  field: 'name' | 'id' | 'cvcRequired';
  
  /** Sort direction */
  direction: 'asc' | 'desc';
  
  /** Language for name sorting */
  language?: Language;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Compatibility status metadata
 */
export const COMPATIBILITY_STATUS_INFO: Record<CompatibilityStatus, {
  label: MultilingualText;
  color: string;
  icon: string;
  severity: number;
}> = {
  [CompatibilityStatus.COMPATIBLE]: {
    label: { it: 'Compatibile', en: 'Compatible' },
    color: 'positive',
    icon: 'check_circle',
    severity: 0
  },
  [CompatibilityStatus.COMPATIBLE_CONDITIONAL]: {
    label: { it: 'Compatibile con condizioni', en: 'Conditional Compatibility' },
    color: 'warning',
    icon: 'warning',
    severity: 1
  },
  [CompatibilityStatus.INCOMPATIBLE]: {
    label: { it: 'Incompatibile', en: 'Incompatible' },
    color: 'negative',
    icon: 'cancel',
    severity: 2
  },
  [CompatibilityStatus.INCOMPATIBLE_SEVERE]: {
    label: { it: 'Incompatibilità Grave', en: 'Severe Incompatibility' },
    color: 'negative',
    icon: 'dangerous',
    severity: 3
  },
  [CompatibilityStatus.UNKNOWN]: {
    label: { it: 'Sconosciuto', en: 'Unknown' },
    color: 'grey',
    icon: 'help',
    severity: -1
  }
};

/**
 * Database file paths
 */
export const DATABASE_PATHS = {
  /** Full database with formatting */
  READABLE: '/scripts/output/drugs-database.json',
  
  /** Minified database for production */
  MINIFIED: '/scripts/output/drugs-database.min.json'
} as const;

/**
 * Expected database version
 */
export const EXPECTED_DATABASE_VERSION = '1.0.0';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get compatibility status severity (higher = more severe)
 */
export function getCompatibilitySeverity(status: CompatibilityStatus): number {
  return COMPATIBILITY_STATUS_INFO[status].severity;
}

/**
 * Check if compatibility status requires a warning
 */
export function requiresWarning(status: CompatibilityStatus): boolean {
  return getCompatibilitySeverity(status) >= 1;
}

/**
 * Check if compatibility status is critical
 */
export function isCritical(status: CompatibilityStatus): boolean {
  return status === CompatibilityStatus.INCOMPATIBLE_SEVERE;
}

/**
 * Get localized status label
 */
export function getStatusLabel(status: CompatibilityStatus, lang: Language = Language.IT): string {
  return COMPATIBILITY_STATUS_INFO[status].label[lang];
}

/**
 * Get status color for Quasar
 */
export function getStatusColor(status: CompatibilityStatus): string {
  return COMPATIBILITY_STATUS_INFO[status].color;
}

/**
 * Get status icon
 */
export function getStatusIcon(status: CompatibilityStatus): string {
  return COMPATIBILITY_STATUS_INFO[status].icon;
}

// ============================================================================
// EXPORT DEFAULT TYPES
// ============================================================================

export default DrugDatabase;
