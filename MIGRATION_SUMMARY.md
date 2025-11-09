# 📊 SUMMARY - Database Migration Setup

## ✅ Completato

Ho creato un sistema completo per migrare i dati di compatibilità farmaci dal vecchio database PostgreSQL a Google Sheets.

---

## 📦 File Creati

### 1. Script Python Principale

**File**: `scripts/export_compatibility_to_google_sheets.py`

**Funzionalità**:
- ✅ Connessione a PostgreSQL (localhost:5432/DrugsCompatibility)
- ✅ Lettura farmaci dalla tabella `drugsCompatibility`
- ✅ Costruzione matrice compatibilità completa
- ✅ Export in 2 modalità:
  - **Opzione 1**: Google Sheets API (automatico)
  - **Opzione 2**: CSV (manuale import)
- ✅ Progress tracking durante l'export
- ✅ Formattazione automatica Google Sheets

**Basato su**: Codice Java recuperato da https://github.com/vas-chif/drugsCompatibility

---

### 2. Documentazione

#### `docs/DATABASE_MIGRATION_GUIDE.md` (Guida Completa)

**Contenuto**:
- 📖 Panoramica del processo di migrazione
- ✅ Prerequisiti (PostgreSQL, Python)
- 🔧 Setup ambiente virtuale Python
- 🚀 Metodo 1: Export CSV (semplice)
- 🤖 Metodo 2: Google Sheets API (automatico)
- 🗄️ Struttura database PostgreSQL
- 🏷️ Codici compatibilità (C, Y, I, !, '')
- 🛠️ Troubleshooting completo
- 📊 Output atteso
- 🔄 Prossimi passi

#### `QUICK_START_MIGRATION.md` (Guida Rapida)

**Contenuto**:
- ⚡ Setup in 5 minuti
- 🚀 4 step veloci
- 🆘 Problemi comuni
- 🔗 Link utili

#### `scripts/README.md`

**Contenuto**:
- 📜 Lista script disponibili
- 📦 Setup veloce
- 🔗 Link utili

---

### 3. Dipendenze Python

**File**: `requirements.txt`

```
psycopg2-binary==2.9.9    # PostgreSQL
pandas==2.1.4             # Data manipulation
gspread==6.0.0            # Google Sheets API
google-auth==2.25.2       # Google authentication
```

---

### 4. Aggiornamento README.md

**Sezione aggiunta**: "🔄 Database Migration"

**Contenuto**:
- ✅ Quick start migration
- ✅ Workflow completo
- ✅ Link documentazione
- ✅ Struttura progetti aggiornata

---

## 🎯 Come Usare

### Metodo Semplice (CSV)

```bash
# 1. Installa dipendenze
cd /home/nyk-ai/projects/medicalUtility
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 2. Configura password PostgreSQL
nano scripts/export_compatibility_to_google_sheets.py
# Modifica riga 25: 'password': 'TUA_PASSWORD'

# 3. Esegui script
python3 scripts/export_compatibility_to_google_sheets.py

# 4. Scegli opzione 2 (CSV)
Scelta (1/2/3): 2

# 5. Import manuale in Google Sheets
# File → Import → Upload → compatibility_matrix.csv
```

---

### Metodo Automatico (Google Sheets API)

```bash
# 1-2. Come sopra

# 3. Setup Google Cloud
# - Vai su: https://console.cloud.google.com/
# - Crea progetto
# - Abilita Google Sheets API
# - Crea Service Account → Download credentials.json
# - Condividi Google Sheets con email service account

# 4. Installa dipendenze extra
pip install gspread google-auth

# 5. Esegui script
python3 scripts/export_compatibility_to_google_sheets.py

# 6. Scegli opzione 1 (Google Sheets)
Scelta (1/2/3): 1
```

---

## 📊 Struttura Database PostgreSQL

Dal vecchio progetto Java:

```sql
-- Tabella: drugsCompatibility
CREATE TABLE drugsCompatibility (
    name_of_drugs VARCHAR PRIMARY KEY,
    Amikacin VARCHAR(1),
    Ampicillin VARCHAR(1),
    Cefazolin VARCHAR(1),
    -- ... una colonna per ogni farmaco
);
```

**Esempio dati**:

| name_of_drugs | Amikacin | Ampicillin | Cefazolin |
|---------------|----------|------------|-----------|
| Amikacin      | C        | Y          | I         |
| Ampicillin    | Y        | C          | C         |
| Cefazolin     | I        | C          | C         |

---

## 🏷️ Codici Compatibilità

| Codice | Significato | Azione |
|--------|-------------|--------|
| **C** | Compatible | ✅ Sicuro mischiare |
| **Y** | Y-site compatible | ✅ Via connettore Y |
| **I** | Incompatible | ❌ NON mischiare |
| **!** | Conflicting data | ⚠️ Verifica fonti |
| **''** | No data | ℹ️ Dati mancanti |

---

## 🔄 Workflow Completo

```
┌──────────────────┐
│   PostgreSQL     │ (vecchio database Java)
│ drugsCompatibility│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Python Script   │ export_compatibility_to_google_sheets.py
│  - readAllDrugs  │
│  - buildMatrix   │
│  - export        │
└────────┬─────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌─────┐   ┌─────────────┐
│ CSV │   │Google Sheets│ (manuale)
└──┬──┘   │    API      │ (automatico)
   │      └──────┬──────┘
   │             │
   └──────┬──────┘
          ▼
   ┌─────────────────┐
   │ Google Sheets   │ https://docs.google.com/spreadsheets/d/1J08Hz65...
   │ Review & Edit   │
   └────────┬────────┘
            │
            ▼
   ┌─────────────────┐
   │   TypeScript    │ (prossimo step)
   │ src/data/drugs  │
   └────────┬────────┘
            │
            ▼
   ┌─────────────────┐
   │    Firebase     │
   │   Firestore     │
   └─────────────────┘
```

---

## 📚 Codice Java Recuperato

Dal repository: https://github.com/vas-chif/drugsCompatibility

### File Analizzati

1. **FunctionPostgreSQL.java** (263 righe)
   - Connessione database
   - `readColumnDate()` - Legge nomi farmaci
   - `readSpecificDate()` - Legge compatibilità tra 2 farmaci
   - `readTable()` - Legge intera matrice

2. **ControlDrugs.java** (152 righe)
   - Logica controllo compatibilità
   - Switch case per codici (C, Y, I, !, '')
   - Formattazione output

3. **IFunctionPostgreSqlPV.java** (28 righe)
   - Costanti connessione:
     * host = "localhost"
     * port = "5432"
     * database = "DrugsCompatibility"
     * user = "postgres"
     * pass = "root"

---

## 🎯 Prossimi Passi

### 1. Eseguire Migrazione (TU)

```bash
python3 scripts/export_compatibility_to_google_sheets.py
```

### 2. Review Dati su Google Sheets

- Verifica completezza
- Correggi dati conflittuali (!)
- Aggiungi dati mancanti ('')
- Rimuovi duplicati

### 3. Conversione TypeScript (FUTURO)

Creare script `convert_sheets_to_typescript.py`:

```python
# Google Sheets → TypeScript
# Output: src/data/drugs.ts

interface DrugCompatibilityMatrix {
  [drugName: string]: {
    [otherDrug: string]: 'C' | 'Y' | 'I' | '!' | '';
  };
}
```

### 4. Integrazione Firebase (FUTURO)

- Upload matrice su Firestore
- Sync real-time
- Multi-device access

---

## 📊 Statistiche

**File Creati**: 5
- `export_compatibility_to_google_sheets.py` (430 righe)
- `DATABASE_MIGRATION_GUIDE.md` (~500 righe)
- `QUICK_START_MIGRATION.md` (~100 righe)
- `scripts/README.md` (~50 righe)
- `requirements.txt` (7 righe)

**File Modificati**: 1
- `README.md` (+50 righe, sezione Database Migration)

**Totale Righe Aggiunte**: ~1137 righe

**Dipendenze Python**: 4 pacchetti

**Tempo Setup Stimato**: 5-10 minuti (metodo CSV)

**Tempo Esecuzione Script**: 5-10 minuti (50 farmaci = 2500 query)

---

## 🔗 Link Utili

- **Google Sheets**: https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k/edit
- **Vecchio Progetto**: https://github.com/vas-chif/drugsCompatibility
- **Google Cloud Console**: https://console.cloud.google.com/
- **PostgreSQL Docs**: https://www.postgresql.org/docs/

---

## ✅ Checklist

Prima di eseguire lo script:

- [ ] PostgreSQL installato e in esecuzione
- [ ] Database `DrugsCompatibility` accessibile
- [ ] Python 3.8+ installato
- [ ] Password PostgreSQL conosciuta
- [ ] Dipendenze Python installate (`pip install -r requirements.txt`)
- [ ] Script configurato con password corretta
- [ ] Google Sheets accessibile (se usi API)
- [ ] Credentials.json scaricato (se usi API)
- [ ] Google Sheets condiviso con service account (se usi API)

---

## 🆘 Supporto

Se hai problemi:

1. **Verifica PostgreSQL**:
   ```bash
   sudo systemctl status postgresql
   psql -U postgres -l
   ```

2. **Verifica Python**:
   ```bash
   python3 --version
   pip list | grep -E "psycopg2|pandas|gspread"
   ```

3. **Leggi Troubleshooting**: `docs/DATABASE_MIGRATION_GUIDE.md#troubleshooting`

4. **Check logs script**: Lo script mostra errori dettagliati

---

**Autore**: Vasile Chifeac  
**Data**: 2024-11-09  
**Progetto**: Medical Utility Pro
