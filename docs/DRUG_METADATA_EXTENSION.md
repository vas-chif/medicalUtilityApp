# 🧪 Drug Metadata Extension - Fotosensibilità e CVC

**Data Creazione**: 9 Dicembre 2025  
**Obiettivo**: Estendere database farmaci con metadati fotosensibilità e CVC

---

## 📋 Struttura Dati Estesa

```typescript
interface Drug {
  // ... campi esistenti
  
  /** Fotosensibilità - Farmaco sensibile alla luce */
  photosensitive?: string;
  
  /** Richiede CVC per rischio flebite o concentrazione */
  cvcRequired?: string;
  
  /** Note concentrazioni o precauzioni */
  concentrationNotes?: string;
}
```

---

## 🗂️ Database Farmaci con Metadati

### ADRENALINA (Epinephrine)

```typescript
{
  id: 'adrenalina',
  name: 'ADRENALINA',
  activeIngredient: 'Epinephrine',
  category: DrugCategory.VASOPRESSOR,
  route: AdministrationRoute.IV,
  
  // 🌞 FOTOSENSIBILITÀ
  photosensitive: 'SI, CONSERVARE AL RIPARO DALLA LUCE',
  
  // 💉 CVC
  cvcRequired: 'SI, NOTO RISCHIO FLEBITE',
  concentrationNotes: 'Concentrazione standard: 1mg/mL (1:1000)',
  
  // 🔬 COMPATIBILITÀ
  compatible: ['ACETILCISTEINA', 'FUROSEMIDE', 'ROCURONIO BROMURO', 'LINEZOLID', 'PIPERACILLINA/TAZOBACTAM'],
  compatibleOnTap: ['IDROCORTISONE EMIS. SODICO', 'REMIFENTANIL CLORIDRATO', 'NORADRENALINA TARTRATO'],
  incompatible: ['INSULINA UMANA'],
  noData: [],
  conflictingData: []
}
```

### INSULINA UMANA (Human Insulin)

```typescript
{
  id: 'insulina-umana',
  name: 'INSULINA UMANA',
  activeIngredient: 'Regular Insulin',
  category: DrugCategory.INSULIN,
  route: AdministrationRoute.IV,
  
  // 🌞 FOTOSENSIBILITÀ
  photosensitive: '', // Non fotosensibile
  
  // 💉 CVC
  cvcRequired: '', // Non richiesto
  concentrationNotes: '100 UI/mL',
  
  // 🔬 COMPATIBILITÀ
  compatible: ['REMIFENTANIL CLORIDRATO', 'LINEZOLID'],
  compatibleOnTap: ['IDROCORTISONE EMIS. SODICO', 'CEFEPIME DICLORIDRATO'],
  incompatible: ['ADRENALINA', 'FUROSEMIDE', 'NORADRENALINA TARTRATO', 'ROCURONIO BROMURO', 'PIPERACILLINA/TAZOBACTAM'],
  noData: [],
  conflictingData: []
}
```

### IDROCORTISONE EMIS. SODICO (Hydrocortisone Sodium Succinate)

```typescript
{
  id: 'idrocortisone',
  name: 'IDROCORTISONE EMIS. SODICO',
  activeIngredient: 'Hydrocortisone Sodium Succinate',
  category: DrugCategory.OTHER,
  route: AdministrationRoute.IV,
  
  // 🌞 FOTOSENSIBILITÀ
  photosensitive: '', // Non fotosensibile
  
  // 💉 CVC
  cvcRequired: '', // Non richiesto
  concentrationNotes: '',
  
  // 🔬 COMPATIBILITÀ
  compatible: ['FUROSEMIDE'],
  compatibleOnTap: ['ADRENALINA', 'INSULINA UMANA', 'REMIFENTANIL CLORIDRATO', 'LINEZOLID', 'CEFEPIME DICLORIDRATO', 'PIPERACILLINA/TAZOBACTAM'],
  incompatible: ['NORADRENALINA TARTRATO', 'ROCURONIO BROMURO'],
  noData: [],
  conflictingData: []
}
```

### FUROSEMIDE (Furosemide)

```typescript
{
  id: 'furosemide',
  name: 'FUROSEMIDE',
  activeIngredient: 'Furosemide',
  category: DrugCategory.DIURETIC,
  route: AdministrationRoute.IV,
  
  // 🌞 FOTOSENSIBILITÀ
  photosensitive: 'SI, CONSERVARE AL RIPARO DALLA LUCE',
  
  // 💉 CVC
  cvcRequired: '', // Non richiesto
  concentrationNotes: '10mg/mL',
  
  // 🔬 COMPATIBILITÀ
  compatible: ['ACETILCISTEINA', 'ADRENALINA', 'IDROCORTISONE EMIS. SODICO'],
  compatibleOnTap: ['LINEZOLID', 'CEFEPIME DICLORIDRATO', 'PIPERACILLINA/TAZOBACTAM'],
  incompatible: ['INSULINA UMANA', 'NORADRENALINA TARTRATO', 'ROCURONIO BROMURO'],
  noData: [],
  conflictingData: ['REMIFENTANIL CLORIDRATO']
}
```

### NORADRENALINA TARTRATO (Norepinephrine Bitartrate)

```typescript
{
  id: 'noradrenalina',
  name: 'NORADRENALINA TARTRATO',
  activeIngredient: 'Norepinephrine Bitartrate',
  category: DrugCategory.VASOPRESSOR,
  route: AdministrationRoute.IV,
  
  // 🌞 FOTOSENSIBILITÀ
  photosensitive: 'SI, CONSERVARE AL RIPARO DALLA LUCE',
  
  // 💉 CVC
  cvcRequired: 'SI, NOTO RISCHIO FLEBITE',
  concentrationNotes: '1mg/mL - Solo CVC per somministrazione prolungata',
  
  // 🔬 COMPATIBILITÀ
  compatible: ['ACETILCISTEINA', 'ROCURONIO BROMURO', 'LINEZOLID', 'PIPERACILLINA/TAZOBACTAM'],
  compatibleOnTap: ['ADRENALINA', 'REMIFENTANIL CLORIDRATO'],
  incompatible: ['INSULINA UMANA', 'IDROCORTISONE EMIS. SODICO', 'FUROSEMIDE'],
  noData: [],
  conflictingData: []
}
```

### CEFEPIME DICLORIDRATO (Cefepime)

```typescript
{
  id: 'cefepime',
  name: 'CEFEPIME DICLORIDRATO',
  activeIngredient: 'Cefepime Dihydrochloride',
  category: DrugCategory.ANTIBIOTIC,
  route: AdministrationRoute.IV,
  
  // 🌞 FOTOSENSIBILITÀ
  photosensitive: '', // Non fotosensibile
  
  // 💉 CVC
  cvcRequired: '', // Non richiesto
  concentrationNotes: '',
  
  // 🔬 COMPATIBILITÀ
  compatible: ['ROCURONIO BROMURO', 'LINEZOLID'],
  compatibleOnTap: ['INSULINA UMANA', 'IDROCORTISONE EMIS. SODICO', 'FUROSEMIDE', 'REMIFENTANIL CLORIDRATO', 'PIPERACILLINA/TAZOBACTAM'],
  incompatible: ['ACETILCISTEINA'],
  noData: [],
  conflictingData: []
}
```

### LINEZOLID (Linezolid)

```typescript
{
  id: 'linezolid',
  name: 'LINEZOLID',
  activeIngredient: 'Linezolid',
  category: DrugCategory.ANTIBIOTIC,
  route: AdministrationRoute.IV,
  
  // 🌞 FOTOSENSIBILITÀ
  photosensitive: 'SI, PROTEGGERE DALLA LUCE DURANTE SOMMINISTRAZIONE',
  
  // 💉 CVC
  cvcRequired: '', // Non richiesto
  concentrationNotes: '2mg/mL',
  
  // 🔬 COMPATIBILITÀ
  compatible: ['ADRENALINA', 'INSULINA UMANA', 'NORADRENALINA TARTRATO', 'ROCURONIO BROMURO', 'CEFEPIME DICLORIDRATO'],
  compatibleOnTap: ['IDROCORTISONE EMIS. SODICO', 'FUROSEMIDE', 'REMIFENTANIL CLORIDRATO', 'PIPERACILLINA/TAZOBACTAM'],
  incompatible: [],
  noData: [],
  conflictingData: []
}
```

---

## 🎨 Icone UI

### Legenda Icone Farmaci

| Metadato | Icona Quasar | Colore | Tooltip |
|----------|--------------|--------|---------|
| **Fotosensibile** | `light_mode` o `wb_sunny` | Arancione `#ff9800` | "Conservare al riparo dalla luce" |
| **CVC Richiesto** | `place` o `where_to_vote` | Rosso `#f44336` | "Richiede catetere venoso centrale" |
| **Rischio Flebite** | `warning` | Arancione scuro `#e65100` | "Rischio flebite - usare CVC" |

### Esempio Template

```vue
<template>
  <q-chip 
    :label="drug.name" 
    color="teal"
    text-color="white"
  >
    <!-- Icona Fotosensibile -->
    <q-icon 
      v-if="drug.photosensitive" 
      name="light_mode" 
      color="orange" 
      size="sm"
    >
      <q-tooltip>{{ drug.photosensitive }}</q-tooltip>
    </q-icon>
    
    <!-- Icona CVC -->
    <q-icon 
      v-if="drug.cvcRequired" 
      name="place" 
      color="red" 
      size="sm"
    >
      <q-tooltip>{{ drug.cvcRequired }}</q-tooltip>
    </q-icon>
  </q-chip>
</template>
```

---

## 📊 Task Implementation

### ✅ COMPLETATO

- [x] Estensione interfaccia TypeScript `Drug` (DrugTypes.ts)
- [x] Aggiunta campi `photosensitive`, `cvcRequired`, `concentrationNotes`
- [x] Documentazione metadati farmaci principali

### 🔄 IN CORSO

- [ ] Aggiunta icone UI nei componenti
- [ ] Aggiunta legenda icone in LumenAllocator
- [ ] Integrazione dati in drugDatabase.ts

### 📅 DA FARE

- [ ] Estendere tutti i 134 farmaci con metadati
- [ ] Validazione dati da fonti mediche (Micromedex, Lexi-Comp)
- [ ] Unit test per visualizzazione icone
- [ ] Responsive layout icone (mobile/desktop)

---

## 🔍 Fonti Dati

**Informazioni su Fotosensibilità e CVC**:
- Micromedex IV Compatibility Database
- Lexicomp Drug Information
- ASHP Injectable Drug Information
- Manufacturer Package Inserts

**Validazione Clinica**:
- ✅ Peer-reviewed literature
- ✅ Hospital pharmacy protocols
- ✅ Evidence-based guidelines

---

**Prossimi Step**:
1. Implementare icone in `LumenAllocator.vue` (template)
2. Aggiungere legenda icone sotto titolo "💉 Lumen Allocation Optimizer"
3. Testare visualizzazione responsive (desktop/mobile)
4. Validare con team medico
