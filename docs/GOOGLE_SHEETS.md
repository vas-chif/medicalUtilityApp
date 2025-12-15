# 📊 Google Sheets - Bulk Mode System

> **Consolidated Google Sheets Integration Documentation**  
> **Version**: 2.1 (Hotfix) | **Date**: December 10, 2025

---

## 📋 Overview

Google Apps Script for bulk drug database import via Google Sheets.

**Features**:

- ✅ Bulk import (100+ drugs/batch)
- ✅ Column auto-mapping
- ✅ Validation rules
- ✅ Firestore sync

---

## 🏗️ Architecture

```
Google Sheet → Apps Script → Validation → Firebase Firestore
     ↓              ↓              ↓              ↓
  CSV Import    Column Map    Rules Check    drugs/{id}
```

---

## 🚀 Quick Start

### 1. Setup Script

1. Open Google Sheet
2. Extensions → Apps Script
3. Paste `bulkImport.gs`
4. Deploy as Web App

### 2. Configure Firebase

```javascript
const CONFIG = {
  projectId: 'medical-utility-pro',
  apiKey: 'YOUR_API_KEY',
  collection: 'drugs',
};
```

### 3. Prepare Sheet

| name        | category    | dose_mg | route | compatible_with         |
| ----------- | ----------- | ------- | ----- | ----------------------- |
| Epinephrine | Vasopressor | 1       | IV    | Norepinephrine,Dopamine |

**Required Columns**: `name`, `category`, `dose_mg`, `route`  
**Optional**: `compatible_with`, `incompatible_with`, `notes`

---

## 📊 Column Mapping (v2.1 Hotfix)

### Auto-Detection Rules

```javascript
const COLUMN_MAPPINGS = {
  // Name variations
  name: ['name', 'drug_name', 'farmaco', 'drug'],

  // Category variations
  category: ['category', 'categoria', 'class', 'type'],

  // Dose variations
  dose_mg: ['dose_mg', 'dose', 'dosaggio', 'mg'],

  // Route variations
  route: ['route', 'via', 'administration', 'somministrazione'],

  // Compatibility
  compatible_with: ['compatible_with', 'compatibile_con', 'compatible'],
  incompatible_with: ['incompatible_with', 'incompatibile_con', 'incompatible'],
};
```

**Hotfix v2.1** (Dec 9, 2025):

- Fixed: `compatibile_con` not mapping to `compatible_with`
- Added: Fuzzy matching for typos
- Status: ✅ Resolved

---

## ✅ Validation Rules

### Drug Object Schema

```typescript
interface Drug {
  id: string; // Auto-generated
  name: string; // Required, 2-100 chars
  category: string; // Required, enum
  dose_mg: number; // Required, >0
  route: string; // Required, enum
  compatible_with?: string[]; // Optional
  incompatible_with?: string[]; // Optional
  notes?: string; // Optional
}
```

### Categories (Enum)

```javascript
const VALID_CATEGORIES = [
  'Vasopressor',
  'Sedative',
  'Analgesic',
  'Antibiotic',
  'Electrolyte',
  'Anticoagulant',
  'Other',
];
```

### Routes (Enum)

```javascript
const VALID_ROUTES = ['IV', 'IM', 'SC', 'PO', 'Inhalation'];
```

---

## 🔧 Script Functions

### Main Functions

```javascript
// Import all rows
function bulkImportDrugs() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();

  // Skip header
  for (let i = 1; i < data.length; i++) {
    const drug = mapRowToDrug(data[i]);
    if (validateDrug(drug)) {
      uploadToFirestore(drug);
    }
  }
}

// Validate single drug
function validateDrug(drug) {
  if (!drug.name || drug.name.length < 2) return false;
  if (!VALID_CATEGORIES.includes(drug.category)) return false;
  if (!drug.dose_mg || drug.dose_mg <= 0) return false;
  if (!VALID_ROUTES.includes(drug.route)) return false;
  return true;
}

// Upload to Firestore
function uploadToFirestore(drug) {
  const url = `https://firestore.googleapis.com/v1/projects/${CONFIG.projectId}/databases/(default)/documents/drugs`;

  const payload = {
    fields: {
      name: { stringValue: drug.name },
      category: { stringValue: drug.category },
      dose_mg: { doubleValue: drug.dose_mg },
      route: { stringValue: drug.route },
      // ... other fields
    },
  };

  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    payload: JSON.stringify(payload),
  });
}
```

---

## 📈 Performance

| Metric          | Value           |
| --------------- | --------------- |
| Import Speed    | ~50 drugs/min   |
| Validation Time | ~200ms/drug     |
| Firestore Write | ~300ms/drug     |
| **Total**       | **~500ms/drug** |

**Optimization**:

- Batch writes (10 drugs/batch)
- Parallel validation
- Cache access tokens

---

## 🐛 Changelog

### v2.1 (Dec 9, 2025)

- 🐛 Fixed column mapping for `compatibile_con`
- ✨ Added fuzzy matching
- 📝 Improved error messages

### v2.0 (Nov 20, 2025)

- ✨ Initial bulk mode release
- ✅ Auto-column detection
- ✅ Firestore integration

---

## 🔗 Related Docs

- Database: `DATABASE_MIGRATION_GUIDE.md`
- Deployment: `DEPLOYMENT_GUIDE.md`
- Implementation: `IMPLEMENTATION_GUIDE.md`

---

**Author**: Vasile Chifeac  
**Project**: Medical Utility Pro
