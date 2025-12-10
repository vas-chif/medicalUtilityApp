# 🎯 QUICK START - Import Compatibilità Farmaci

## ✅ Cosa È Stato Fatto

1. ✅ **Google Apps Script v2.0** creato
   - File: `scripts/google-sheets-interface-v2.gs`
   - Supporto nuove colonne: NECESSITÀ DI CVC, NOTES/CONCENTRAZIONI, NOTO RISCHIO FLEBITE
   - Fix critico: `addNewDrugInAlphabeticalOrder()` preserva compatibilità
2. ✅ **Python Converter v2.0** aggiornato
   - File: `scripts/convert_sheet_to_json.py`
   - Rilevamento automatico offset colonne metadata
   - Parsing completo nuove colonne → JSON BilingualText

3. ✅ **Guide create**:
   - `TEST_GOOGLE_APPS_SCRIPT_V2.md` - Test plan script
   - `IMPORT_COMPATIBILITY_DATABASE.md` - Procedura completa

---

## 🚀 Cosa Devi Fare ORA

### STEP 1: Completa Script v2.0 (~10 min)

**File**: `scripts/google-sheets-interface-v2.gs`

**Azione**: Aggiungi queste funzioni alla fine (riga ~450):

```javascript
// TODO: Copia queste funzioni dal tuo script originale (google-sheets-interface.gs):

// 1. BULK INSERT
function showBulkCompatibilityDialog() { ... }
function getBulkDialogHTML() { ... }
function saveBulkCompatibilityData(data) { ... }

// 2. SINGLE INSERT
function showCompatibilityDialog() { ... }
function getDialogHTML() { ... }
function saveCompatibilityData(data) { ... }

// 3. FORMATTING & VALIDATION
function applyCellFormatting(cell, value) { ... }
function validateTable() { ... }
function generateMatrix() { ... }
function exportToJSON() { ... }

// 4. UTILITIES
function showLegend() { ... }
function getColumnLetter(colNum) { ... }
function showAddDrugDialog() { ... }
function getAddDrugDialogHTML() { ... }
```

**💡 Tip**: Apri `google-sheets-interface.gs` (originale), copia tutte le funzioni DOPO `addNewDrugInAlphabeticalOrder()`, incolla in v2.0

---

### STEP 2: Testa Script in Google Sheets (~15 min)

1. **Carica script**:
   - Google Sheets → Estensioni → Apps Script
   - Copia/incolla `google-sheets-interface-v2.gs` (completo)
   - Salva (Ctrl+S)

2. **Test critico**: Aggiungi farmaco
   - Menu → ➕ Aggiungi Nuovo Farmaco
   - Inserisci: "DOPAMINA"
   - **VERIFICA**: Compatibilità esistenti preservate ✅

3. **Test CVC**:
   - Menu → 💉 Gestione NECESSITÀ DI CVC
   - Imposta SÌ/NO per alcuni farmaci

4. **Validazione**:
   - Menu → ✅ Valida Tabella
   - **VERIFICA**: 0 errori ✅

📖 **Guida completa test**: `scripts/TEST_GOOGLE_APPS_SCRIPT_V2.md`

---

### STEP 3: Export CSV (~2 min)

1. Google Sheets → File → Scarica → CSV
2. Salva come: `/home/nyk-ai/projects/medicalUtility/scripts/input/drugs.csv`

---

### STEP 4: Genera JSON Database (~1 min)

```bash
cd /home/nyk-ai/projects/medicalUtility

python scripts/convert_sheet_to_json.py \
  --input scripts/input/drugs.csv \
  --output public/data/drugs/
```

**Output**:

- ✅ `public/data/drugs/index.json` (farmaci)
- ✅ `public/data/drugs/compatibility.json` (compatibilità)

---

### STEP 5: Test in App (~10 min)

```bash
yarn dev
```

1. Vai a: http://localhost:9000
2. Click: 🧪 Drug Compatibility Checker
3. **VERIFICA**:
   - ✅ Farmaci caricati
   - ✅ Ricerca funziona
   - ✅ Analisi compatibilità OK

---

### STEP 6: Commit & Push (~2 min)

```bash
git add public/data/drugs/ scripts/
git commit -m "feat: Import complete drug compatibility database"
git push origin main
```

---

## 📊 Workflow Completo (Diagramma)

```
Google Sheets (tabella completa)
         ↓
   [Export CSV]
         ↓
scripts/input/drugs.csv
         ↓
   [Python Converter v2.0]
         ↓
public/data/drugs/
  ├── index.json (farmaci)
  └── compatibility.json (compatibilità)
         ↓
   [Test in App]
         ↓
   [Commit & Push]
         ↓
   [Deploy Firebase]
```

---

## 🔍 Checklist Veloce

Prima di procedere, verifica:

- [ ] Tabella Google Sheets completa
- [ ] Colonne header esatte:
  - PRINCIPIO ATTIVO
  - FOTOSENSIBILE
  - NECESSITÀ DI CVC
  - NOTES/CONCENTRAZIONI
  - NOTO RISCHIO FLEBITE
  - [Farmaci...]
- [ ] Matrice compatibilità compilata
- [ ] Script v2.0 completato
- [ ] Script testato in Google Sheets

---

## 🆘 Hai Problemi?

### Script non trova colonne farmaci

**Fix**: Verifica header CSV esattamente come sopra

### Compatibilità perse dopo inserimento farmaco

**Fix**: Controlla log Apps Script (View → Logs), cerca "Backup completato"

### JSON non caricati in app

**Fix**: Verifica file esistono in `public/data/drugs/`

📖 **Troubleshooting completo**: `scripts/IMPORT_COMPATIBILITY_DATABASE.md`

---

## ⏱️ Tempo Totale Stimato

| Step            | Tempo       |
| --------------- | ----------- |
| Completa script | 10 min      |
| Test script     | 15 min      |
| Export CSV      | 2 min       |
| Genera JSON     | 1 min       |
| Test app        | 10 min      |
| Commit/push     | 2 min       |
| **TOTALE**      | **~40 min** |

---

## 🎯 Obiettivo

Al termine avrai:

- ✅ Database completo farmaci (50-100 farmaci)
- ✅ Matrice compatibilità (1000+ coppie)
- ✅ App funzionante con Drug Compatibility Checker
- ✅ Script Google Sheets per aggiornamenti futuri

---

**🚀 Inizia da STEP 1!**

Per guida dettagliata: `scripts/IMPORT_COMPATIBILITY_DATABASE.md`
