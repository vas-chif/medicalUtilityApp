# 📊 Import Compatibilità Farmaci - Guida Completa

## ✅ Stato Attuale

### 1. Google Apps Script v2.0

- ✅ **File creato**: `google-sheets-interface-v2.gs`
- ✅ **Colonne supportate**:
  - `PRINCIPIO ATTIVO` (nomi farmaci)
  - `FOTOSENSIBILE` (SÌ/NO)
  - `NECESSITÀ DI CVC` (SÌ/NO) ← **NUOVO**
  - `NOTES/CONCENTRAZIONI` (testo libero) ← **NUOVO**
  - `NOTO RISCHIO FLEBITE` (testo libero) ← **NUOVO**
  - Matrice compatibilità farmaci (C/Y/I/!/null)

- ✅ **Fix critici implementati**:
  - Rilevamento dinamico colonne speciali (regex + exact match)
  - Prima colonna farmaci calcolata DOPO tutte le colonne speciali
  - `addNewDrugInAlphabeticalOrder()` preserva compatibilità (backup → insert → restore)
  - Performance ottimizzate (batch read/write)

- ⚠️ **Da completare**: Copiare funzioni dialog da script originale
  - `showBulkCompatibilityDialog()`, `getBulkDialogHTML()`, `saveBulkCompatibilityData()`
  - `showCompatibilityDialog()`, `getDialogHTML()`, `saveCompatibilityData()`
  - `applyCellFormatting()`, `validateTable()`, `generateMatrix()`, `exportToJSON()`

### 2. Python Converter v2.0

- ✅ **File aggiornato**: `scripts/convert_sheet_to_json.py`
- ✅ **Supporto nuove colonne**:
  - Rilevamento automatico offset colonne metadata
  - Parsing `NECESSITÀ DI CVC` → campo `administrationRoute`
  - Parsing `FOTOSENSIBILE` → campo `isPhotosensitive`
  - Parsing `NOTES/CONCENTRAZIONI` → campo `concentration`
  - Parsing `NOTO RISCHIO FLEBITE` → campo `specialNotes`

- ✅ **Output JSON BilingualText**:
  - `index.json`: Array farmaci con metadata completo
  - `compatibility.json`: Matrice compatibilità simmetrica
  - Validazione simmetria automatica

---

## 🚀 Procedura Import Completa

### STEP 1: Completa Google Apps Script v2.0

**File da modificare**: `scripts/google-sheets-interface-v2.gs`

**Azione**: Copia funzioni mancanti da `google-sheets-interface.gs` (originale)

**Funzioni da copiare** (inizia da riga ~450):

```javascript
// ============================================================
// BULK COMPATIBILITY INSERT
// ============================================================
function showBulkCompatibilityDialog() { ... }
function getBulkDialogHTML() { ... }
function saveBulkCompatibilityData(data) { ... }

// ============================================================
// SINGLE COMPATIBILITY INSERT
// ============================================================
function showCompatibilityDialog() { ... }
function getDialogHTML() { ... }
function saveCompatibilityData(data) { ... }

// ============================================================
// CELL FORMATTING
// ============================================================
function applyCellFormatting(cell, value) { ... }

// ============================================================
// VALIDATION & MATRIX
// ============================================================
function validateTable() { ... }
function generateMatrix() { ... }

// ============================================================
// EXPORT
// ============================================================
function exportToJSON() { ... }

// ============================================================
// LEGEND & UTILITIES
// ============================================================
function showLegend() { ... }
function getColumnLetter(colNum) { ... }
function showAddDrugDialog() { ... }
function getAddDrugDialogHTML() { ... }
```

**⏱ Tempo stimato**: ~10 minuti

---

### STEP 2: Carica Script in Google Sheets

**Azioni**:

1. Apri Google Sheets con tabella compatibilità
2. **Estensioni** → **Apps Script**
3. **Elimina** codice esistente
4. **Copia** tutto il contenuto di `google-sheets-interface-v2.gs` (completo)
5. **Salva** (Ctrl+S o icona disco)
6. **Chiudi** Apps Script
7. **Ricarica** Google Sheets (F5)

**Verifica**:

- Menu "💊 Compatibilità Farmaci" appare
- Sottomenu visibili:
  - 📊 Genera Matrice
  - ➕ Aggiungi Nuovo Farmaco
  - 💉 Gestione NECESSITÀ DI CVC
  - ⚡ Inserimento RAPIDO (Bulk)
  - 🔍 Inserimento SINGOLO
  - ✅ Valida Tabella
  - 📤 Esporta JSON Preview
  - 📖 Legenda

**⏱ Tempo stimato**: ~3 minuti

---

### STEP 3: Test Script in Google Sheets

**Test 1: Aggiungi Farmaco (CRITICO)**

1. Menu → **➕ Aggiungi Nuovo Farmaco**
2. Inserisci nome: **"DOPAMINA"** (esempio)
3. Click **Aggiungi**

**Risultato atteso**:

```
✅ Farmaco "DOPAMINA" aggiunto in posizione X/Y
✅ Compatibilità preservate: Z
✅ Tempo: 1.23s
```

**Verifica**:

- Farmaco inserito in ordine alfabetico
- Compatibilità esistenti NON perse
- Diagonali riempite con "null" (grigio)

---

**Test 2: Imposta CVC**

1. Menu → **💉 Gestione NECESSITÀ DI CVC**
2. Cerca **"DOPAMINA"**
3. Click **SÌ** (richiede CVC)
4. Cerca altro farmaco (es. "AMOXICILLINA")
5. Click **NO** (periferica)
6. Click **Salva Tutto**

**Risultato atteso**:

- Colonna "NECESSITÀ DI CVC" aggiornata:
  - DOPAMINA: **SÌ** (sfondo rosso)
  - AMOXICILLINA: **NO** (sfondo verde)

---

**Test 3: Bulk Insert**

1. Menu → **⚡ Inserimento RAPIDO (Bulk)**
2. Seleziona farmaco (es. "DOPAMINA")
3. Imposta compatibilità per tutti gli altri farmaci:
   - AMOXICILLINA: **C**
   - CEFTRIAXONE: **Y**
   - VANCOMICINA: **I**
4. Click **Salva Tutte le Compatibilità**

**Risultato atteso**:

- Matrice aggiornata con tutte le compatibilità
- Simmetria automatica (DOPAMINA→AMOXICILLINA = AMOXICILLINA→DOPAMINA)
- Colori celle corretti (C=verde, Y=giallo, I=rosso)

---

**Test 4: Validazione**

1. Menu → **✅ Valida Tabella**

**Risultato atteso**:

```
📊 VALIDAZIONE TABELLA

Farmaci: X
Compatibilità totali: Y (X farmaci → X×(X-1)÷2)
Compatibilità compilate: Z (100%)
Compatibilità mancanti: 0

Errori simmetria: 0
Valori invalidi: 0

✅ Tabella valida!
```

**⏱ Tempo stimato**: ~15 minuti (tutti i test)

---

### STEP 4: Export CSV da Google Sheets

**Azioni**:

1. **File** → **Scarica** → **Valori separati da virgola (.csv)**
2. Salva come: `Copia di drugsCompatibility - compFarmaci.csv`
3. Sposta file in: `/home/nyk-ai/projects/medicalUtility/scripts/input/drugs.csv`

**Verifica CSV**:

```bash
head -n 3 scripts/input/drugs.csv
```

**Output atteso**:

```csv
PRINCIPIO ATTIVO,FOTOSENSIBILE,NECESSITÀ DI CVC,NOTES/CONCENTRAZIONI,NOTO RISCHIO FLEBITE,AMOXICILLINA,CEFTRIAXONE,DOPAMINA,VANCOMICINA
AMOXICILLINA,,NO,,,null,C,Y,I
CEFTRIAXONE,,SÌ,,,C,null,Y,C
```

**⏱ Tempo stimato**: ~2 minuti

---

### STEP 5: Run Python Converter

**Comando**:

```bash
cd /home/nyk-ai/projects/medicalUtility

python scripts/convert_sheet_to_json.py \
  --input scripts/input/drugs.csv \
  --output public/data/drugs/
```

**Output atteso**:

```
📖 Lettura CSV: scripts/input/drugs.csv
✅ CSV caricato: 50 righe, 55 colonne
📍 Prima colonna farmaci: 5 (AMOXICILLINA)
🔍 Trovati 50 farmaci nel CSV
  ✓ amoxicillin (AMOXICILLINA) - CVC:False, Foto:False
  ✓ ceftriaxone (CEFTRIAXONE) - CVC:True, Foto:False
  ... (48 farmaci)
✅ 50 farmaci estratti

🔗 Estrazione compatibilità tra 50 farmaci (offset col 5)
✅ 1225 compatibilità estratte (50×49÷2)
  C: 450 (36.7%)
  Y: 380 (31.0%)
  I: 295 (24.1%)
  !: 50 (4.1%)
  null: 50 (4.1%)

📝 Scrittura JSON files...
✅ public/data/drugs/index.json (50 farmaci)
✅ public/data/drugs/compatibility.json (1225 compatibilità)

🎉 Conversione completata con successo!
```

**⏱ Tempo stimato**: ~5 secondi

---

### STEP 6: Verifica JSON Generati

**File output**:

1. `public/data/drugs/index.json` (lista farmaci)
2. `public/data/drugs/compatibility.json` (matrice compatibilità)

**Verifica index.json**:

```bash
jq '.[0]' public/data/drugs/index.json
```

**Output atteso**:

```json
{
  "id": "amoxicillin",
  "name": {
    "it": "Amoxicillina",
    "en": "Amoxicillin"
  },
  "category": {
    "it": "Antibiotici",
    "en": "Antibiotics"
  },
  "description": {
    "it": "",
    "en": ""
  },
  "administrationRoute": {
    "it": "Periferica/CVC",
    "en": "Peripheral/CVC"
  },
  "concentration": {
    "it": "Vedi scheda tecnica",
    "en": "See technical sheet"
  },
  "isPhotosensitive": false,
  "specialNotes": {
    "it": "Farmaco #1",
    "en": "Drug #1"
  }
}
```

**Verifica compatibility.json**:

```bash
jq '.[0]' public/data/drugs/compatibility.json
```

**Output atteso**:

```json
{
  "drug1Id": "amoxicillin",
  "drug2Id": "ceftriaxone",
  "compatibility": "C",
  "description": {
    "it": "Compatibile con cautela - Monitorare reazioni avverse",
    "en": "Compatible with caution - Monitor adverse reactions"
  },
  "notes": {
    "it": "",
    "en": ""
  },
  "references": []
}
```

**⏱ Tempo stimato**: ~2 minuti

---

### STEP 7: Test Database in App

**Avvia dev server**:

```bash
yarn dev
```

**Test in app**:

1. Naviga a: http://localhost:9000
2. Click su **🧪 Drug Compatibility Checker** (homepage)
3. Verifica:
   - ✅ Tutti i farmaci caricati nel DrugSelector
   - ✅ Search funziona (cerca "DOPA")
   - ✅ Seleziona 2+ farmaci
   - ✅ Click **Analizza Compatibilità**
   - ✅ Risultati mostrano compatibilità corrette
   - ✅ Warning per incompatibilità (I/!)

**Screenshot test consigliati**:

- Lista farmaci completa
- Ricerca farmaco
- Analisi compatibilità (2-3 farmaci)
- Warning incompatibilità

**⏱ Tempo stimato**: ~10 minuti

---

### STEP 8: Commit & Push

**Commit database**:

```bash
git add public/data/drugs/
git add scripts/convert_sheet_to_json.py
git add scripts/google-sheets-interface-v2.gs
git add scripts/*.md

git commit -m "feat: Import complete drug compatibility database

- ✅ 50 drugs with metadata (CVC, photosensitive, concentrations)
- ✅ 1225 compatibility entries (C/Y/I/!/null)
- ✅ Google Apps Script v2.0 (new columns support)
- ✅ Python converter v2.0 (dynamic metadata parsing)
- ✅ BilingualText format (IT/EN)
- ✅ Symmetry validation passed"

git push origin main
```

**⏱ Tempo stimato**: ~2 minuti

---

### STEP 9: Deploy to Firebase (Optional)

**Opzione 1: Deploy Locale**

```bash
yarn build
firebase deploy
```

**Opzione 2: Deploy da GitHub Actions**

1. Vai a: https://github.com/vas-chif/medicalUtilityApp/actions
2. Workflow: **Deploy to Firebase Hosting**
3. Click: **Run workflow** → Branch `main` → **Run workflow**
4. Attendi: ~3 minuti
5. Verifica: https://medical-utility.web.app

**⏱ Tempo stimato**: ~5 minuti

---

## 📋 Checklist Finale

Prima di considerare l'import completato:

- [ ] Script v2.0 completo (tutte le funzioni copiate)
- [ ] Script caricato in Google Sheets
- [ ] Test inserimento farmaco OK (compatibilità preservate)
- [ ] Test CVC dialog OK (colori corretti)
- [ ] Test bulk insert OK (simmetria automatica)
- [ ] Validazione tabella OK (0 errori)
- [ ] CSV esportato da Google Sheets
- [ ] Python converter eseguito con successo
- [ ] JSON generati e validati (index.json + compatibility.json)
- [ ] Test in app OK (tutti i farmaci visibili, compatibilità corrette)
- [ ] Commit & push a GitHub
- [ ] Deploy a Firebase (opzionale)

---

## 🐛 Troubleshooting

### Errore: "Prima colonna farmaci non trovata"

**Sintomo**: Converter Python non trova colonne metadata

**Fix**:

```python
# Nel converter, verifica log:
📍 Prima colonna farmaci: X (DRUG_NAME)
```

Se X ≠ 5 (per v2.0), controlla header CSV:

```bash
head -n 1 scripts/input/drugs.csv
```

Deve essere:

```
PRINCIPIO ATTIVO,FOTOSENSIBILE,NECESSITÀ DI CVC,NOTES/CONCENTRAZIONI,NOTO RISCHIO FLEBITE,DRUG1,DRUG2,...
```

---

### Errore: "Compatibilità perse dopo inserimento farmaco"

**Sintomo**: Dopo `addNewDrugInAlphabeticalOrder()`, matrice vuota

**Debug**:

1. Apps Script → **View** → **Logs**
2. Cerca:
   ```
   ✅ Backup completato: X farmaci, Y compatibilità
   ✅ Ripristinate Z compatibilità
   ```
3. Se Z < Y, controlla funzione `addNewDrugInAlphabeticalOrder()` (riga ~145)

**Fix**: Assicurati che la funzione v2.0 sia completa (backup → insert → restore pattern)

---

### Errore: "JSON non caricati in app"

**Sintomo**: DrugSelector vuoto, errore console "Failed to load drugs"

**Debug**:

1. Verifica file esistono:

   ```bash
   ls -lh public/data/drugs/
   # index.json, compatibility.json devono esistere
   ```

2. Verifica JSON validi:

   ```bash
   jq '.' public/data/drugs/index.json > /dev/null
   # Se errore, JSON malformato
   ```

3. Controlla console browser (F12):
   ```
   Failed to fetch drugs: ...
   ```

**Fix**:

- Rigenera JSON con converter
- Verifica permessi file (644)
- Riavvia dev server

---

## 📊 Metriche Attese

**Google Sheets**:

- Farmaci: ~50-100
- Compatibilità: N×(N-1)÷2 (es. 50 farmaci → 1225 coppie)
- Tempo validazione: ~5 secondi
- Tempo export CSV: ~2 secondi

**Python Converter**:

- Tempo parsing: ~1-2 secondi
- Tempo generazione JSON: ~0.5 secondi
- Dimensione index.json: ~20-50 KB (50 farmaci)
- Dimensione compatibility.json: ~100-300 KB (1225 coppie)

**App Performance**:

- Tempo load database: ~200-500 ms
- Tempo search farmaco: <50 ms
- Tempo analisi compatibilità (3 farmaci): <100 ms

---

## ✅ Success Criteria

Import considerato **COMPLETO** quando:

1. ✅ Script v2.0 funziona in Google Sheets
2. ✅ CSV esportato con nuove colonne
3. ✅ JSON generati con BilingualText
4. ✅ App carica tutti i farmaci
5. ✅ Compatibilità visualizzate correttamente
6. ✅ Warning per incompatibilità mostrati
7. ✅ Database committato su GitHub
8. ✅ (Opzionale) Deploy a Firebase OK

---

## 🎉 Next Steps

Dopo import completato:

1. **Arricchire metadata**:
   - Aggiungere descrizioni dettagliate (`description` field)
   - Creare file `info/{drugId}.json` per ogni farmaco
   - Aggiungere note cliniche (`specialNotes`)

2. **Espandere database**:
   - Aggiungere più farmaci (target: 100+)
   - Aggiungere più categorie (antiaritmici, anticonvulsivanti, etc.)
   - Aggiungere references bibliografiche

3. **Migliorare UX**:
   - Filtri per categoria farmaco
   - Export PDF report compatibilità
   - Share link compatibilità analizzata

4. **Testing**:
   - Unit test per converter Python
   - E2E test per Drug Compatibility page
   - Validazione simmetria automatica

---

**📝 Note**: Questa guida assume che l'utente abbia già completato la tabella compatibilità in Google Sheets. Se ci sono problemi, verificare prima che la tabella sia completa e valida.
