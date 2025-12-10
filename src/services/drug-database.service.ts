/**
 * Drug Database Service
 * 
 * Utility service for loading, querying, and managing the drug compatibility database
 */

import type {
  Drug,
  DrugDatabase,
  DrugSearchFilter,
  DrugSortOptions,
  CompatibilityResult
} from '../types/drug-database';
import {
  CompatibilityStatus,
  Language,
  isCritical
} from '../types/drug-database';

/**
 * Drug Database Service Class
 */
export class DrugDatabaseService {
  private database: DrugDatabase | null = null;
  private drugsById: Map<string, Drug> = new Map();
  private drugsByName: Map<string, Drug> = new Map();

  /**
   * Load database from JSON file
   */
  async loadDatabase(databasePath: string = '/scripts/output/drugs-database.min.json'): Promise<void> {
    try {
      const response = await fetch(databasePath);
      if (!response.ok) {
        throw new Error(`Failed to load database: ${response.statusText}`);
      }
      
      this.database = await response.json() as DrugDatabase;
      this.buildIndexes();
      
      console.log(`✅ Database loaded: ${this.database.metadata.totalDrugs} drugs`);
    } catch (error) {
      console.error('❌ Error loading drug database:', error);
      throw error;
    }
  }

  /**
   * Build internal indexes for fast lookups
   */
  private buildIndexes(): void {
    if (!this.database) return;
    
    this.drugsById.clear();
    this.drugsByName.clear();
    
    this.database.drugs.forEach(drug => {
      this.drugsById.set(drug.id, drug);
      this.drugsByName.set(drug.name.it.toLowerCase(), drug);
      this.drugsByName.set(drug.name.en.toLowerCase(), drug);
    });
  }

  /**
   * Check if database is loaded
   */
  isLoaded(): boolean {
    return this.database !== null;
  }

  /**
   * Get database metadata
   */
  getMetadata(): DrugDatabase['metadata'] | null {
    return this.database?.metadata ?? null;
  }

  /**
   * Get all drugs
   */
  getAllDrugs(): Drug[] {
    return this.database?.drugs ?? [];
  }

  /**
   * Get drug by ID
   */
  getDrugById(id: string): Drug | undefined {
    console.log(`[DrugDatabaseService.getDrugById] 🔍 Searching for id="${id}" (normalized: "${id.toLowerCase()}")`);
    const result = this.drugsById.get(id.toLowerCase());
    console.log(`[DrugDatabaseService.getDrugById] 📊 Found:`, result ? `${result.id} - ${result.name.it}` : 'NULL');
    
    // Se non trovato per ID, prova per nome
    if (!result) {
      console.log(`[DrugDatabaseService.getDrugById] 🔄 Not found by ID, trying by name...`);
      const byName = this.getDrugByName(id);
      if (byName) {
        console.log(`[DrugDatabaseService.getDrugById] ✅ Found by name:`, byName.name.it);
        return byName;
      }
    }
    
    return result;
  }

  /**
   * Get drug by name (case-insensitive)
   */
  getDrugByName(name: string): Drug | undefined {
    console.log(`[DrugDatabaseService.getDrugByName] 🔍 Searching for name="${name}" (normalized: "${name.toLowerCase()}")`);
    const result = this.drugsByName.get(name.toLowerCase());
    console.log(`[DrugDatabaseService.getDrugByName] 📊 Found:`, result ? `${result.id} - ${result.name.it}` : 'NULL');
    return result;
  }

  /**
   * Search drugs by filters
   */
  searchDrugs(filter: DrugSearchFilter): Drug[] {
    let results = this.getAllDrugs();

    // Text search
    if (filter.query) {
      const query = filter.query.toLowerCase();
      results = results.filter(drug =>
        drug.id.includes(query) ||
        drug.name.it.toLowerCase().includes(query) ||
        drug.name.en.toLowerCase().includes(query)
      );
    }

    // CVC filter
    if (filter.requiresCvc !== undefined) {
      results = results.filter(drug => drug.cvcRequirement.required === filter.requiresCvc);
    }

    // Photosensitive filter
    if (filter.isPhotosensitive !== undefined) {
      results = results.filter(drug => drug.isPhotosensitive === filter.isPhotosensitive);
    }

    // Compatibility filter
    if (filter.compatibleWith) {
      const targetDrugId = filter.compatibleWith.toLowerCase();
      results = results.filter(drug => {
        const compat = drug.compatibility.find(c => c.drugId === targetDrugId);
        return compat && compat.status === CompatibilityStatus.COMPATIBLE;
      });
    }

    // Exclude unknown
    if (filter.excludeUnknown) {
      results = results.filter(drug => {
        return drug.compatibility.some(c => c.status !== CompatibilityStatus.UNKNOWN);
      });
    }

    return results;
  }

  /**
   * Sort drugs by specified criteria
   */
  sortDrugs(drugs: Drug[], options: DrugSortOptions): Drug[] {
    const { field, direction, language = Language.IT } = options;
    
    return [...drugs].sort((a, b) => {
      let comparison = 0;
      
      switch (field) {
        case 'name':
          comparison = a.name[language].localeCompare(b.name[language]);
          break;
        case 'id':
          comparison = a.id.localeCompare(b.id);
          break;
        case 'cvcRequired':
          comparison = (a.cvcRequirement.required ? 1 : 0) - (b.cvcRequirement.required ? 1 : 0);
          break;
      }
      
      return direction === 'asc' ? comparison : -comparison;
    });
  }

  /**
   * Check compatibility between two drugs
   */
  checkCompatibility(drugId1: string, drugId2: string): CompatibilityResult | null {
    console.log(`[DrugDatabaseService.checkCompatibility] 🔍 Called with drugId1="${drugId1}", drugId2="${drugId2}"`);
    
    const drug1 = this.getDrugById(drugId1);
    const drug2 = this.getDrugById(drugId2);
    
    console.log(`[DrugDatabaseService.checkCompatibility] 📊 Drug1 found:`, drug1 ? drug1.name : 'NULL');
    console.log(`[DrugDatabaseService.checkCompatibility] 📊 Drug2 found:`, drug2 ? drug2.name : 'NULL');
    
    if (!drug1 || !drug2) {
      console.warn(`[DrugDatabaseService.checkCompatibility] ❌ One or both drugs not found, returning NULL`);
      return null;
    }
    
    // 🔧 FIX: Usa drug2.id (l'ID slug) invece di drugId2 (che potrebbe essere il nome)
    console.log(`[DrugDatabaseService.checkCompatibility] 🔍 Looking for compatibility with drugId="${drug2.id}"`);
    const compatEntry = drug1.compatibility.find(c => c.drugId === drug2.id);
    const status = compatEntry?.status ?? CompatibilityStatus.UNKNOWN;
    
    console.log(`[DrugDatabaseService.checkCompatibility] 📊 Compatibility entry found:`, compatEntry ? 'YES' : 'NO');
    console.log(`[DrugDatabaseService.checkCompatibility] 📊 Status:`, status);
    
    const result: CompatibilityResult = {
      drug1,
      drug2,
      status
    };
    
    // Add warning for critical statuses
    if (status === CompatibilityStatus.INCOMPATIBLE_SEVERE) {
      result.warning = `⚠️ INCOMPATIBILITÀ GRAVE tra ${drug1.name.it} e ${drug2.name.it}`;
    } else if (status === CompatibilityStatus.INCOMPATIBLE) {
      result.warning = `Incompatibilità tra ${drug1.name.it} e ${drug2.name.it}`;
    } else if (status === CompatibilityStatus.COMPATIBLE_CONDITIONAL) {
      result.warning = `Compatibilità condizionale - verificare concentrazioni`;
    }
    
    console.log(`[DrugDatabaseService.checkCompatibility] ✅ Returning result with status:`, status);
    
    return result;
  }

  /**
   * Get all compatibilities for a drug
   */
  getDrugCompatibilities(drugId: string): Array<{
    drug: Drug;
    status: CompatibilityStatus;
  }> {
    const drug = this.getDrugById(drugId);
    if (!drug) return [];
    
    return drug.compatibility
      .map(c => ({
        drug: this.getDrugById(c.drugId),
        status: c.status
      }))
      .filter((item): item is { drug: Drug; status: CompatibilityStatus } => 
        item.drug !== undefined
      );
  }

  /**
   * Get drugs with severe incompatibilities to specified drug
   */
  getSevereIncompatibilities(drugId: string): Drug[] {
    const compatibilities = this.getDrugCompatibilities(drugId);
    
    return compatibilities
      .filter(c => c.status === CompatibilityStatus.INCOMPATIBLE_SEVERE)
      .map(c => c.drug);
  }

  /**
   * Get all drugs requiring CVC
   */
  getCvcRequiredDrugs(): Drug[] {
    return this.getAllDrugs().filter(drug => drug.cvcRequirement.required);
  }

  /**
   * Get all photosensitive drugs
   */
  getPhotosensitiveDrugs(): Drug[] {
    return this.getAllDrugs().filter(drug => drug.isPhotosensitive);
  }

  /**
   * Validate compatibility matrix symmetry
   * Returns array of asymmetric pairs for debugging
   */
  validateSymmetry(): Array<{ drug1: string; drug2: string; status1: CompatibilityStatus; status2: CompatibilityStatus }> {
    const asymmetries: Array<{ drug1: string; drug2: string; status1: CompatibilityStatus; status2: CompatibilityStatus }> = [];
    
    this.getAllDrugs().forEach(drug1 => {
      drug1.compatibility.forEach(compat => {
        const drug2 = this.getDrugById(compat.drugId);
        if (!drug2) return;
        
        const reverseCompat = drug2.compatibility.find(c => c.drugId === drug1.id);
        if (!reverseCompat) return;
        
        if (compat.status !== reverseCompat.status) {
          asymmetries.push({
            drug1: drug1.id,
            drug2: drug2.id,
            status1: compat.status,
            status2: reverseCompat.status
          });
        }
      });
    });
    
    return asymmetries;
  }

  /**
   * Get statistics about the database
   */
  getStatistics() {
    if (!this.database) return null;
    
    const drugs = this.getAllDrugs();
    const cvcDrugs = this.getCvcRequiredDrugs();
    const photoDrugs = this.getPhotosensitiveDrugs();
    
    // Count compatibility statuses
    const statusCounts: Record<CompatibilityStatus, number> = {
      [CompatibilityStatus.COMPATIBLE]: 0,
      [CompatibilityStatus.INCOMPATIBLE]: 0,
      [CompatibilityStatus.COMPATIBLE_CONDITIONAL]: 0,
      [CompatibilityStatus.INCOMPATIBLE_SEVERE]: 0,
      [CompatibilityStatus.UNKNOWN]: 0
    };
    
    drugs.forEach(drug => {
      drug.compatibility.forEach(c => {
        statusCounts[c.status]++;
      });
    });
    
    const totalCompatEntries = Object.values(statusCounts).reduce((a, b) => a + b, 0);
    const knownCompat = totalCompatEntries - statusCounts[CompatibilityStatus.UNKNOWN];
    
    return {
      totalDrugs: drugs.length,
      cvcRequiredDrugs: cvcDrugs.length,
      cvcRequiredPercent: (cvcDrugs.length / drugs.length * 100).toFixed(1),
      photosensitiveDrugs: photoDrugs.length,
      photosensitivePercent: (photoDrugs.length / drugs.length * 100).toFixed(1),
      totalCompatibilityEntries: totalCompatEntries,
      knownCompatibilities: knownCompat,
      knownPercent: (knownCompat / totalCompatEntries * 100).toFixed(1),
      statusBreakdown: statusCounts,
      version: this.database.metadata.version,
      generatedAt: this.database.metadata.generatedAt
    };
  }

  /**
   * Export filtered drugs to JSON
   */
  exportDrugs(drugs: Drug[]): string {
    return JSON.stringify({
      exported: new Date().toISOString(),
      count: drugs.length,
      drugs
    }, null, 2);
  }

  /**
   * Get autocomplete suggestions for drug names
   */
  getAutocompleteSuggestions(query: string, limit: number = 10, lang: Language = Language.IT): string[] {
    if (!query) return [];
    
    const queryLower = query.toLowerCase();
    const suggestions = this.getAllDrugs()
      .filter(drug => drug.name[lang].toLowerCase().includes(queryLower))
      .map(drug => drug.name[lang])
      .slice(0, limit);
    
    return suggestions;
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

/**
 * Singleton instance of DrugDatabaseService
 * Use this for consistent access across the application
 */
export const drugDatabaseService = new DrugDatabaseService();

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Load the drug database (convenience wrapper)
 */
export async function loadDrugDatabase(path?: string): Promise<void> {
  return drugDatabaseService.loadDatabase(path);
}

/**
 * Check if two drugs are compatible
 */
export function areDrugsCompatible(drugId1: string, drugId2: string): boolean {
  const result = drugDatabaseService.checkCompatibility(drugId1, drugId2);
  return result?.status === CompatibilityStatus.COMPATIBLE;
}

/**
 * Check if combination requires warning
 */
export function requiresCompatibilityWarning(drugId1: string, drugId2: string): boolean {
  const result = drugDatabaseService.checkCompatibility(drugId1, drugId2);
  if (!result) return false;
  
  return [
    CompatibilityStatus.INCOMPATIBLE,
    CompatibilityStatus.INCOMPATIBLE_SEVERE,
    CompatibilityStatus.COMPATIBLE_CONDITIONAL
  ].includes(result.status);
}

/**
 * Get critical warning for drug combination
 */
export function getCriticalWarning(drugId1: string, drugId2: string): string | null {
  const result = drugDatabaseService.checkCompatibility(drugId1, drugId2);
  if (!result) return null;
  
  if (isCritical(result.status)) {
    return result.warning ?? null;
  }
  
  return null;
}

export default drugDatabaseService;
