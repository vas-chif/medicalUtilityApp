# Drug Database Format Specification v1.0

## Overview
This document describes the JSON format for the drug compatibility database used in the Medical Utility application.

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Total Drugs**: 134  
**Total Compatibility Entries**: 17,956

---

## File Structure

### Main Files
- `drugs-database.json` - Human-readable format with indentation (1.7 MB)
- `drugs-database.min.json` - Minified production format (958 KB)

### Database Schema

```json
{
  "metadata": { ... },
  "drugs": [ ... ]
}
```

---

## Metadata Object

```json
{
  "metadata": {
    "version": "1.0.0",
    "generatedAt": "2025-12-09T...",
    "sourceFile": "drugsCompatibility - compFarmaci.csv",
    "totalDrugs": 134,
    "totalCompatibilityEntries": 17956,
    "compatibilityStats": {
      "compatible": 3048,
      "incompatible": 3544,
      "compatible-conditional": 2362,
      "incompatible-severe": 310,
      "unknown": 8692
    },
    "schema": {
      "compatibilityStatuses": [
        "compatible",
        "incompatible",
        "compatible-conditional",
        "incompatible-severe",
        "unknown"
      ],
      "multilingual": ["it", "en"]
    }
  }
}
```

### Metadata Fields

| Field | Type | Description |
|-------|------|-------------|
| `version` | string | Database version (semantic versioning) |
| `generatedAt` | string | ISO 8601 timestamp of generation |
| `sourceFile` | string | Original CSV filename |
| `totalDrugs` | number | Total number of drugs in database |
| `totalCompatibilityEntries` | number | Total compatibility records |
| `compatibilityStats` | object | Breakdown by compatibility status |
| `schema` | object | Schema information |

---

## Drug Object Structure

```json
{
  "id": "drug-id-lowercase",
  "name": {
    "it": "NOME FARMACO",
    "en": "Drug Name"
  },
  "isPhotosensitive": false,
  "cvcRequirement": {
    "required": true,
    "details": {
      "it": "CVC+C",
      "en": ""
    }
  },
  "concentrationNotes": {
    "it": ">= 10 mg/ml",
    "en": ""
  },
  "phlebitisRisk": {
    "it": "Alto rischio",
    "en": ""
  },
  "additionalInfo": {},
  "compatibility": [
    {
      "drugId": "other-drug-id",
      "status": "compatible"
    }
  ]
}
```

### Drug Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier (lowercase, hyphenated) |
| `name` | object | ✅ | Multilingual drug name |
| `name.it` | string | ✅ | Italian name (UPPERCASE) |
| `name.en` | string | ✅ | English name (currently same as IT) |
| `isPhotosensitive` | boolean | ✅ | Whether drug is photosensitive |
| `cvcRequirement` | object | ✅ | Central Venous Catheter requirement info |
| `cvcRequirement.required` | boolean | ✅ | Whether CVC is required |
| `cvcRequirement.details` | object | ✅ | Additional CVC details |
| `cvcRequirement.details.it` | string | ✅ | Italian details (e.g., "CVC+C", "SI + C") |
| `cvcRequirement.details.en` | string | ✅ | English details (currently empty) |
| `concentrationNotes` | object | ✅ | Concentration-specific notes |
| `concentrationNotes.it` | string | ✅ | Italian notes |
| `concentrationNotes.en` | string | ✅ | English notes (currently empty) |
| `phlebitisRisk` | object | ✅ | Phlebitis risk information |
| `phlebitisRisk.it` | string | ✅ | Italian description |
| `phlebitisRisk.en` | string | ✅ | English description (currently empty) |
| `additionalInfo` | object | ✅ | Reserved for future data (currently empty) |
| `compatibility` | array | ✅ | List of compatibility records |

---

## Compatibility Status Values

### Status Definitions

| Status | Symbol | Count | Percentage | Description |
|--------|--------|-------|------------|-------------|
| `compatible` | C | 3,048 | 17.0% | Drugs are compatible |
| `incompatible` | I | 3,544 | 19.7% | Drugs are incompatible |
| `compatible-conditional` | Y | 2,362 | 13.2% | Compatible with conditions (concentration-dependent) |
| `incompatible-severe` | ! | 310 | 1.7% | Severe/dangerous incompatibility |
| `unknown` | null | 8,692 | 48.4% | Unknown compatibility |

### Compatibility Object

```json
{
  "drugId": "other-drug-id",
  "status": "compatible|incompatible|compatible-conditional|incompatible-severe|unknown"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `drugId` | string | ID of the other drug |
| `status` | enum | Compatibility status (see table above) |

---

## CVC Requirement Details

The `cvcRequirement.details.it` field contains various formats from the original data:

| Value | Interpretation |
|-------|----------------|
| `"CVC"` | Standard CVC required |
| `"CVC+C"` | CVC required with central access |
| `"SI"` or `"SI "` | Yes, CVC required |
| `"SI + C"` | Yes + central access required |
| `"SI + C + S"` | Yes + central + special requirements |
| `""` (empty) | No CVC required |

**Note**: The `cvcRequirement.required` boolean is `true` for all cases except empty strings and "NO".

---

## ID Generation Rules

Drug IDs are generated from Italian names using these rules:

1. Convert to lowercase
2. Replace spaces with hyphens
3. Remove special characters (except hyphens)

**Examples**:
- `ACICLOVIR` → `aciclovir`
- `ACIDO ASCORBICO` → `acido-ascorbico`
- `NA NITROPRUSSIATO ANIDRO` → `na-nitroprussiato-anidro`

---

## Usage Examples

### Load Database (JavaScript/TypeScript)

```typescript
import drugsDatabase from './drugs-database.min.json';

const { metadata, drugs } = drugsDatabase;

// Find a drug by ID
const drug = drugs.find(d => d.id === 'aciclovir');

// Check compatibility
function checkCompatibility(drugId1: string, drugId2: string): string {
  const drug1 = drugs.find(d => d.id === drugId1);
  if (!drug1) return 'unknown';
  
  const compat = drug1.compatibility.find(c => c.drugId === drugId2);
  return compat ? compat.status : 'unknown';
}

// Get all drugs requiring CVC
const cvcDrugs = drugs.filter(d => d.cvcRequirement.required);
console.log(`${cvcDrugs.length} drugs require CVC`);
```

### Filter by Status

```typescript
// Get all severe incompatibilities
const severeIncompatibilities = [];
drugs.forEach(drug => {
  const severe = drug.compatibility.filter(c => c.status === 'incompatible-severe');
  severe.forEach(comp => {
    severeIncompatibilities.push({
      drug1: drug.name.it,
      drug2: comp.drugId,
    });
  });
});
```

### Display Drug Info (Vue/Quasar)

```vue
<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ drug.name.it }}</div>
      
      <q-badge v-if="drug.isPhotosensitive" color="orange">
        Fotosensibile
      </q-badge>
      
      <q-badge v-if="drug.cvcRequirement.required" color="purple">
        CVC: {{ drug.cvcRequirement.details.it }}
      </q-badge>
      
      <div v-if="drug.concentrationNotes.it" class="text-caption q-mt-sm">
        Note: {{ drug.concentrationNotes.it }}
      </div>
      
      <div v-if="drug.phlebitisRisk.it" class="text-caption text-negative">
        Rischio flebite: {{ drug.phlebitisRisk.it }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  drug: {
    type: Object as PropType<Drug>,
    required: true
  }
});
</script>
```

---

## Statistics

### Database Coverage

| Metric | Value | Notes |
|--------|-------|-------|
| Total drugs | 134 | Complete list |
| Total compatibility entries | 17,956 | 134 × 134 matrix |
| Known compatibilities | 9,264 (51.6%) | C + I + Y + ! |
| Unknown compatibilities | 8,692 (48.4%) | Requires research |
| CVC required drugs | 31 (23.1%) | Special handling needed |
| Photosensitive drugs | 0 (0.0%) | Data may need verification |

### Critical Compatibility Examples

Some examples of severe incompatibilities (`!` status):

- ACETILCISTEINA ↔ NITROGLICERINA
- ACETILCISTEINA ↔ NA-NITROPRUSSIATO-ANIDRO
- ACICLOVIR ↔ CEFTRIAXONE DISODICO
- ACICLOVIR ↔ MORFINA CLORIDRATO

**⚠️ Warning**: These combinations should trigger strong warnings in the application UI.

---

## Future Enhancements

### Planned Additions (v2.0)

1. **English Translations**: Complete `name.en`, `details.en`, etc.
2. **Additional Metadata**:
   - Drug class/category
   - Administration routes
   - Dosage ranges
   - Contraindications
3. **Enhanced Compatibility Info**:
   - Reason for incompatibility
   - References/sources
   - pH compatibility data
4. **Search Optimization**:
   - Aliases/alternative names
   - Search keywords
   - Phonetic matching

### additionalInfo Structure (Reserved)

```json
{
  "additionalInfo": {
    "aliases": ["nome alternativo"],
    "category": "antibiotico",
    "routes": ["IV", "IM"],
    "contraindications": [],
    "references": []
  }
}
```

---

## Validation Rules

### Required Validations

1. **Unique IDs**: All drug IDs must be unique
2. **Multilingual Completeness**: All text fields must have `it` property
3. **Valid Status**: Compatibility status must be one of 5 allowed values
4. **Self-Reference**: Each drug should have a compatibility entry for itself
5. **Symmetry Check**: If drug A is compatible with drug B, B should list A

### Recommended Checks

1. **Empty Notes**: Flag drugs with empty `concentrationNotes` and `phlebitisRisk`
2. **CVC Details**: Ensure `cvcRequirement.details.it` is not empty when `required = true`
3. **Unknown Coverage**: Monitor percentage of `unknown` statuses

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-09 | Initial release with 134 drugs |

---

## Support & Maintenance

**Converter Script**: `/scripts/csv-to-json-converter.py`  
**Source CSV**: `/scripts/input/drugsCompatibility - compFarmaci.csv`  
**Output Directory**: `/scripts/output/`

To regenerate database:
```bash
cd /home/nyk-ai/projects/medicalUtility/scripts
python3 csv-to-json-converter.py
```

---

**Document Version**: 1.0  
**Last Updated**: December 9, 2025
