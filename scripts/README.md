# 🔧 Scripts Utility - Medical Utility Pro

Collezione di script per migrazione dati, deployment e automazione.

---

## 📜 Script Disponibili

### 1. `google-sheets-interface.gs` ⭐ AGGIORNATO v2.1 (HOTFIX)

**Scopo:** Interfaccia Google Apps Script per inserimento RAPIDO compatibilità farmaci

**HOTFIX v2.1 (09/11/2024):**
- 🔧 **FIX CRITICO:** Lettura dinamica header colonne
- ✅ Non sovrascrive più colonne FOTOSENSIBILE e VIA CENTRALE/PERIFERICA
- ✅ Compatibilità salvate nelle colonne CORRETTE
- ✅ Funziona con qualsiasi struttura foglio (flessibile)

**Funzionalità:**

✅ **Modalità BULK** - Inserisci tutte le compatibilità di 1 farmaco in una volta (10x più veloce!)  
✅ **Ricerca searchable** - Trova farmaci velocemente con input dinamico  
✅ **Gestione Via Somministrazione** - Dialog dedicato per Centrale/Periferica  
✅ **Validazione automatica** - Simmetria matrice, valori validi  
✅ **Progress tracking** - Barra progresso e statistiche  
✅ **Export JSON** - Esporta per integrazione TypeScript

**Installazione:**

```
1. Apri Google Sheets:
   https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k

2. Estensioni → Apps Script

3. Copia e incolla google-sheets-interface.gs

4. Salva (Ctrl+S)

5. Ricarica Google Sheets

6. Nuovo menu "💊 Compatibilità Farmaci" apparirà!
```

**Menu disponibili:**

```
💊 Compatibilità Farmaci
├── ⚡ Inserimento RAPIDO (Bulk)        ← 10x PIÙ VELOCE!
├── 📝 Inserisci Compatibilità Singola
├──────────────────────────────────
├── 💉 Gestisci Via Somministrazione
├──────────────────────────────────
├── ✅ Valida Tabella
├── 📊 Genera Matrice
├── 📥 Esporta JSON
├── 🔄 Importa da CSV
└── 📖 Legenda Codici
```

**Documentazione completa:** [docs/GOOGLE_SHEETS_BULK_MODE_GUIDE.md](../docs/GOOGLE_SHEETS_BULK_MODE_GUIDE.md)

---

### 2. `extract_compatibility_from_pdf.py`

**Scopo:** Estrazione automatica compatibilità da PDF tramite OCR

**Uso:**

```bash
python3 scripts/extract_compatibility_from_pdf.py input.pdf output.xlsx
```

**Prerequisiti:**

```bash
# Ubuntu/Debian
sudo apt-get install tesseract-ocr poppler-utils

# Python packages
pip install pytesseract pdf2image pillow pandas openpyxl
```

**Output:**

- `extracted_text.txt` - Testo grezzo OCR
- `drug_compatibility_extracted.xlsx` - Matrice compatibilità
- `drug_compatibility_extracted.csv` - CSV alternativo

---

### 3. `export_compatibility_to_google_sheets.py`

**Scopo:** Migrazione compatibilità farmaci da PostgreSQL a Google Sheets

**Uso:**

```bash
python3 scripts/export_compatibility_to_google_sheets.py
```

**Prerequisiti:**

- PostgreSQL con database `DrugsCompatibility`
- Python 3.8+
- Dipendenze: `pip install psycopg2-binary pandas gspread google-auth`

**Opzioni:**

1. Export CSV (semplice, import manuale)
2. Google Sheets API (automatico)
3. Entrambi

**Documentazione completa:** [docs/DATABASE_MIGRATION_GUIDE.md](../docs/DATABASE_MIGRATION_GUIDE.md)

---

### 4. `deploy.sh` (root folder)

**Scopo:** Deploy automatico su Firebase

**Uso:**

```bash
# Development
./deploy.sh dev

# Production
./deploy.sh prod
```

**Documentazione:** [docs/DEPLOYMENT_GUIDE.md](../docs/DEPLOYMENT_GUIDE.md)

---

## 📦 Setup Veloce

```bash
# 1. Crea virtual environment
python3 -m venv venv
source venv/bin/activate

# 2. Installa tutte le dipendenze
pip install -r requirements.txt

# 3. Configura credentials (se usi Google Sheets API)
# Posiziona credentials.json nella root del progetto
```

---

## 🚀 Workflow Consigliato

### Per completare database compatibilità farmaci:

```
STEP 1: Installa Google Apps Script (5 min)
→ Copia google-sheets-interface.gs in Google Sheets
→ Menu "� Compatibilità Farmaci" appare

STEP 2: Genera matrice (2 min)
→ Menu → 📊 Genera Matrice
→ Matrice NxN creata automaticamente

STEP 3: (Opzionale) Estrai da PDF (30 min)
→ python3 extract_compatibility_from_pdf.py
→ Importa Excel generato in Google Sheets

STEP 4: Completa con Bulk Mode (3-5 ore)
→ Menu → ⚡ Inserimento RAPIDO (Bulk)
→ Seleziona farmaco
→ Imposta tutte compatibilità
→ Salva
→ Ripeti per tutti i farmaci

STEP 5: Imposta vie somministrazione (10 min)
→ Menu → 💉 Gestisci Via Somministrazione
→ Imposta Centrale/Periferica per ogni farmaco
→ Salva tutte

STEP 6: Valida (5 min)
→ Menu → ✅ Valida Tabella
→ Correggi eventuali errori

STEP 7: Export (2 min)
→ Menu → 📥 Esporta JSON
→ Copia JSON in src/data/drugs.ts
```

**Tempo totale:** 4-6 ore (distribuito in 2-3 giorni)

---

## �🔗 Link Utili

- **Google Sheets Template:** https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k/edit
- **Vecchio Progetto:** https://github.com/vas-chif/drugsCompatibility
- **Firebase Console:** https://console.firebase.google.com/
- **Nurse24.it (riferimento):** https://www.nurse24.it/infermiere/utility/app-farmaci.html

---

**Autore:** Vasile Chifeac  
**Version:** 2.0.0
