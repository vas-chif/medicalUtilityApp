# 🔧 FIX: Lettura Dinamica Header Colonne

## ❌ PROBLEMA RISOLTO

### Sintomo

Script inseriva dati nelle colonne **SBAGLIATE**:
- Compatibilità salvate in colonna B (FOTOSENSIBILE)
- Compatibilità salvate in colonna C (VIA CENTRALE/PERIFERICA)
- **Invece** di colonne D, E, F, ... dove sono i nomi farmaci

### Causa

Script usava **indici fissi** assumendo:
```javascript
// SBAGLIATO ❌
const col = drugIndex + 2; // Colonna B, C, D, ...
```

Ma la struttura reale è:
```
A: PRINCIPIO ATTIVO
B: FOTOSENSIBILE
C: VIA CENTRALE / PERIFERICA
D: ABICIXIMAB          ← Primo farmaco in header
E: ACETILCISTEINA
F: ACICLOVIR
...
```

---

## ✅ SOLUZIONE IMPLEMENTATA

### Nuove Funzioni

#### 1. `getDrugColumnMap()`

Legge **header riga 1** e crea mappa:
```javascript
{
  'ABICIXIMAB': 4,       // Colonna D
  'ACETILCISTEINA': 5,   // Colonna E
  'ACICLOVIR': 6,        // Colonna F
  ...
}
```

**Salta automaticamente** colonne speciali:
- PRINCIPIO ATTIVO
- FOTOSENSIBILE
- VIA CENTRALE / PERIFERICA

---

#### 2. `getDrugRowMap()`

Legge **colonna A** e crea mappa:
```javascript
{
  'ABICIXIMAB': 2,       // Riga 2
  'ACETILCISTEINA': 3,   // Riga 3
  'ACICLOVIR': 4,        // Riga 4
  ...
}
```

---

### Funzioni Aggiornate

#### `saveBulkCompatibilityData()`

**Prima (❌):**
```javascript
const row1 = baseDrugIndex + 2;     // Assumeva riga = indice + 2
const col1 = targetDrugIndex + 2;   // Assumeva colonna = indice + 2
```

**Ora (✅):**
```javascript
const drugColumnMap = getDrugColumnMap();
const drugRowMap = getDrugRowMap();

const baseDrugRow = drugRowMap[baseDrug];         // Legge riga reale
const targetDrugCol = drugColumnMap[targetDrug];  // Legge colonna reale

sheet.getRange(baseDrugRow, targetDrugCol).setValue(compatibility);
```

---

#### `saveCompatibilityData()`

**Prima (❌):**
```javascript
const row = drug1Index + 2;
const col = drug2Index + 2;
```

**Ora (✅):**
```javascript
const drug1Row = drugRowMap[drug1];
const drug2Col = drugColumnMap[drug2];
sheet.getRange(drug1Row, drug2Col).setValue(compatibility);
```

---

#### `validateTable()`

**Prima (❌):**
```javascript
const row = i + 2;
const col = j + 2;
const value1 = sheet.getRange(row, col).getValue();
```

**Ora (✅):**
```javascript
const row1 = drugRowMap[drug1];
const col2 = drugColumnMap[drug2];
const value1 = sheet.getRange(row1, col2).getValue();
```

---

#### `generateMatrix()`

**Prima (❌):**
```javascript
// Scriveva header da colonna B, sovrascrivendo FOTOSENSIBILE
sheet.getRange(1, i + 2).setValue(drugs[i]);
```

**Ora (✅):**
```javascript
// Trova prima colonna libera DOPO colonne speciali
let startCol = 4; // Default colonna D

// Cerca colonne FOTOSENSIBILE, VIA CENTRALE/PERIFERICA
for (let i = 0; i < headerValues.length; i++) {
  if (cellValue.includes('FOTOSENS') || cellValue.includes('VIA CENTRALE')) {
    startCol = i + 2; // Salta questa colonna
  }
}

// Scrive header da startCol in poi
sheet.getRange(1, startCol + i).setValue(drugs[i]);
```

---

#### `exportToJSON()`

**Prima (❌):**
```javascript
const value = sheet.getRange(i + 2, j + 2).getValue();
```

**Ora (✅):**
```javascript
const row = drugRowMap[drug1];
const col = drugColumnMap[drug2];
const value = sheet.getRange(row, col).getValue();
```

---

## 🎯 Benefici

### 1. Flessibilità

✅ Funziona con **qualsiasi** struttura foglio:
```
A | B           | C              | D    | E    | F    |
--|-------------|----------------|------|------|------|
  | FOTOSENSIB. | VIA CENTR./PER.| DRUG1| DRUG2| DRUG3|
```

✅ Puoi **aggiungere colonne** senza problemi:
```
A | B | C | D       | E    | F    | G    |
--|---|---|---------|------|------|------|
  |FOT|VIA|NOTE EXTRA|DRUG1|DRUG2|DRUG3|
```

Script trova automaticamente colonne farmaci!

---

### 2. Sicurezza

✅ **Validazione nomi**: Verifica che farmaco esista prima di salvare
```javascript
if (!drugRowMap[drug1] || !drugColumnMap[drug1]) {
  throw new Error(`Farmaco "${drug1}" non trovato nella tabella`);
}
```

✅ **Error reporting**: Se farmaco manca, mostra errore chiaro

---

### 3. Manutenibilità

✅ **Indipendente da posizione**: Non serve modificare script se aggiungi colonne

✅ **Auto-adattamento**: Legge struttura reale del foglio ogni volta

---

## 📋 Testing

### Test Case 1: Salvataggio Bulk

**Setup:**
```
Header riga 1:
A: PRINCIPIO ATTIVO
B: FOTOSENSIBILE
C: VIA CENTRALE / PERIFERICA
D: ABICIXIMAB
E: ACETILCISTEINA
```

**Azione:**
```javascript
saveBulkCompatibilityData({
  baseDrug: 'ABICIXIMAB',
  compatibilities: {
    'ACETILCISTEINA': 'I'
  }
});
```

**Risultato atteso:**
```
Riga 2 (ABICIXIMAB), Colonna E (ACETILCISTEINA) = 'I' ✅
Riga 3 (ACETILCISTEINA), Colonna D (ABICIXIMAB) = 'I' ✅
```

**Risultato PRIMA del fix:**
```
Riga 2, Colonna C (VIA CENTRALE/PERIFERICA) = 'I' ❌
```

---

### Test Case 2: Header con Colonne Extra

**Setup:**
```
A: PRINCIPIO ATTIVO
B: FOTOSENSIBILE
C: VIA CENTRALE / PERIFERICA
D: NOTE CLINICHE           ← Nuova colonna aggiunta
E: ABICIXIMAB
F: ACETILCISTEINA
```

**Script trova automaticamente:**
```javascript
drugColumnMap = {
  'ABICIXIMAB': 5,        // Colonna E ✅
  'ACETILCISTEINA': 6     // Colonna F ✅
}
```

**Non confonde con:**
- Colonna D (NOTE CLINICHE) ← Ignorata
- Colonna B (FOTOSENSIBILE) ← Ignorata
- Colonna C (VIA CENTRALE/PERIFERICA) ← Ignorata

---

## 🚀 Deployment

### Step 1: Backup Foglio

```
1. Apri Google Sheets
2. File → Crea copia
3. Rinomina: "drugsCompatibility - BACKUP 09-11-2024"
```

---

### Step 2: Aggiorna Script

```
1. Estensioni → Apps Script
2. CANCELLA tutto il codice vecchio
3. Copia NUOVO codice da:
   /home/nyk-ai/projects/medicalUtility/scripts/google-sheets-interface.gs
4. Salva (Ctrl+S)
5. Chiudi editor
```

---

### Step 3: Test

```
1. Ricarica Google Sheets (F5)

2. Menu → ⚡ Inserimento RAPIDO (Bulk)

3. Seleziona farmaco test (es: ABICIXIMAB)

4. Imposta 1-2 compatibilità

5. Salva

6. VERIFICA:
   - Dati salvati in colonna CORRETTA (D, E, F, ...)
   - NON in colonna B o C ✅

7. Menu → ✅ Valida Tabella
   - Nessun errore ✅
```

---

## 📊 Esempio Pratico

### Struttura Foglio

```
     A              B            C              D         E             F
1  PRINCIPIO     FOTOSENS.  VIA CENTR./PER  ABICIXIMAB  ACETILCIST.  ACICLOVIR
   ATTIVO
2  ABICIXIMAB    sì         C                            I            Y
3  ACETILCIST.   null       C+P              I                        C
4  ACICLOVIR     null       P                Y           C
```

---

### Salvataggio: ABICIXIMAB → ACETILCISTEINA = 'I'

**Script fa:**
```javascript
// 1. Trova riga ABICIXIMAB
drugRowMap['ABICIXIMAB'] = 2

// 2. Trova colonna ACETILCISTEINA
drugColumnMap['ACETILCISTEINA'] = 5  // Colonna E

// 3. Salva in cella corretta
sheet.getRange(2, 5).setValue('I')  // Riga 2, Colonna E ✅

// 4. Salva simmetrico
drugRowMap['ACETILCISTEINA'] = 3
drugColumnMap['ABICIXIMAB'] = 4
sheet.getRange(3, 4).setValue('I')  // Riga 3, Colonna D ✅
```

---

### Risultato

```
     A              B            C              D         E             F
1  PRINCIPIO     FOTOSENS.  VIA CENTR./PER  ABICIXIMAB  ACETILCIST.  ACICLOVIR
   ATTIVO
2  ABICIXIMAB    sì         C                            I   ← ✅      Y
3  ACETILCIST.   null       C+P              I   ← ✅                  C
4  ACICLOVIR     null       P                Y           C
```

**Colonne B e C NON toccate! ✅**

---

## 🎉 Conclusione

### Prima (v2.0 - BUG)

❌ Dati salvati in colonne sbagliate  
❌ Sovrascrive FOTOSENSIBILE e VIA CENTRALE/PERIFERICA  
❌ Non funziona se aggiungi colonne  

### Ora (v2.1 - FIXED)

✅ Legge header dinamicamente  
✅ Trova colonne farmaci automaticamente  
✅ Salta colonne speciali  
✅ Funziona con qualsiasi struttura  
✅ Errori chiari se farmaco mancante  

---

**Version:** 2.1.0 (HOTFIX)  
**Date:** 2024-11-09  
**Author:** Vasile Chifeac  
**Status:** ✅ READY FOR DEPLOYMENT
