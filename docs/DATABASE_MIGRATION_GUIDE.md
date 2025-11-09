# 🏥 Guida Migrazione Database Compatibilità Farmaci

## 📋 Indice

1. [Panoramica](#panoramica)
2. [Prerequisiti](#prerequisiti)
3. [Setup Ambiente](#setup-ambiente)
4. [Metodo 1: Export CSV (Semplice)](#metodo-1-export-csv-semplice)
5. [Metodo 2: Google Sheets API (Automatico)](#metodo-2-google-sheets-api-automatico)
6. [Struttura Database PostgreSQL](#struttura-database-postgresql)
7. [Codici Compatibilità](#codici-compatibilità)
8. [Troubleshooting](#troubleshooting)

---

## 📖 Panoramica

Questo progetto migra i dati di compatibilità farmaci dal vecchio sistema PostgreSQL + Java al nuovo Medical Utility Pro (TypeScript + Vue 3 + Firebase).

**Workflow:**

```
PostgreSQL → Python Script → Google Sheets → Review → TypeScript → Firebase
```

### File Coinvolti

- **Script**: `scripts/export_compatibility_to_google_sheets.py`
- **Vecchio progetto**: https://github.com/vas-chif/drugsCompatibility
- **Google Sheets**: https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k/edit

---

## ✅ Prerequisiti

### 1. PostgreSQL Database Attivo

Verifica che il database sia ancora disponibile:

```bash
# Controlla se PostgreSQL è in esecuzione
sudo systemctl status postgresql

# Elenca database
psql -U postgres -l

# Connetti al database
psql -U postgres -d DrugsCompatibility
```

### 2. Python 3.8+

```bash
python3 --version
```

---

## 🔧 Setup Ambiente

### 1. Installa Dipendenze Python

```bash
cd /home/nyk-ai/projects/medicalUtility

# Crea virtual environment (opzionale ma consigliato)
python3 -m venv venv
source venv/bin/activate

# Installa dipendenze
pip install psycopg2-binary pandas
```

### 2. Configura Password PostgreSQL

Apri lo script e modifica la password:

```python
# scripts/export_compatibility_to_google_sheets.py

DB_CONFIG = {
    'host': 'localhost',
    'port': '5432',
    'database': 'DrugsCompatibility',
    'user': 'postgres',
    'password': 'TUA_PASSWORD_QUI'  # ⚠️ CAMBIA QUESTA
}
```

---

## 🚀 Metodo 1: Export CSV (Semplice)

Il metodo più veloce - esporta in CSV e importa manualmente in Google Sheets.

### Step 1: Esegui Script

```bash
cd /home/nyk-ai/projects/medicalUtility
python3 scripts/export_compatibility_to_google_sheets.py
```

### Step 2: Scegli Opzione

```
SCEGLI METODO EXPORT:
1. Google Sheets (automatico, richiede setup API)
2. CSV (semplice, import manuale)
3. Entrambi

Scelta (1/2/3): 2
```

### Step 3: Import Manuale in Google Sheets

1. Apri Google Sheets: https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k/edit
2. **File** → **Import**
3. **Upload** → seleziona `compatibility_matrix.csv`
4. Opzioni import:
   - **Import location**: Replace current sheet
   - **Separator type**: Comma
   - **Convert text to numbers**: No
5. Click **Import data**

✅ **FATTO!** Dati importati.

---

## 🤖 Metodo 2: Google Sheets API (Automatico)

Più complesso ma completamente automatico.

### Step 1: Setup Google Cloud

#### 1.1 Crea Progetto Google Cloud

1. Vai su: https://console.cloud.google.com/
2. Click **Select a project** → **New Project**
3. Nome: `Medical Utility Migration`
4. Click **Create**

#### 1.2 Abilita Google Sheets API

1. Nel progetto, vai a **APIs & Services** → **Library**
2. Cerca: `Google Sheets API`
3. Click **Enable**

#### 1.3 Crea Service Account

1. **APIs & Services** → **Credentials**
2. **Create Credentials** → **Service Account**
3. Nome: `drug-migration-bot`
4. Click **Create and Continue**
5. Role: **Editor**
6. Click **Continue** → **Done**

#### 1.4 Genera JSON Key

1. Click sul service account appena creato
2. Tab **Keys** → **Add Key** → **Create new key**
3. Tipo: **JSON**
4. Click **Create**
5. Salva il file JSON come: `/home/nyk-ai/projects/medicalUtility/credentials.json`

#### 1.5 Condividi Google Sheets

1. Apri il JSON e copia l'email del service account:

   ```json
   {
     "client_email": "drug-migration-bot@medical-utility-migration.iam.gserviceaccount.com"
   }
   ```

2. Apri Google Sheets: https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k/edit

3. Click **Share** (in alto a destra)

4. Aggiungi l'email del service account

5. Permessi: **Editor**

6. Click **Send**

### Step 2: Installa Dipendenze Google

```bash
pip install gspread google-auth
```

### Step 3: Esegui Script

```bash
python3 scripts/export_compatibility_to_google_sheets.py
```

### Step 4: Scegli Opzione

```
Scelta (1/2/3): 1
```

Lo script:

- Connette a PostgreSQL ✅
- Legge tutti i farmaci ✅
- Costruisce matrice compatibilità ✅
- Carica automaticamente su Google Sheets ✅
- Applica formattazione ✅

---

## 🗄️ Struttura Database PostgreSQL

Dal vecchio progetto Java:

### Tabella: `drugsCompatibility`

```sql
CREATE TABLE drugsCompatibility (
    name_of_drugs VARCHAR PRIMARY KEY,
    Amikacin VARCHAR(1),
    Ampicillin VARCHAR(1),
    Cefazolin VARCHAR(1),
    Ceftriaxone VARCHAR(1),
    -- ... una colonna per ogni farmaco
);
```

### Esempio Dati

| name_of_drugs | Amikacin | Ampicillin | Cefazolin |
| ------------- | -------- | ---------- | --------- |
| Amikacin      | C        | Y          | I         |
| Ampicillin    | Y        | C          | C         |
| Cefazolin     | I        | C          | C         |

---

## 🏷️ Codici Compatibilità

| Codice | Significato           | Descrizione                                    |
| ------ | --------------------- | ---------------------------------------------- |
| **C**  | **Compatible**        | Farmaci compatibili - possono essere mischiati |
| **Y**  | **Y-site compatible** | Compatibili tramite connettore Y               |
| **I**  | **Incompatible**      | ⚠️ **NON mischiare** - incompatibili           |
| **!**  | **Conflicting data**  | Dati contrastanti - serve revisione            |
| **''** | **No data**           | Nessun dato disponibile                        |

### Esempio Interpretazione

```
Amikacin + Ampicillin = Y
```

✅ **Compatibili tramite Y-site** (connettore a Y), ma non mischiare direttamente.

```
Amikacin + Cefazolin = I
```

❌ **Incompatibili** - NON somministrare insieme.

---

## 🛠️ Troubleshooting

### Problema: PostgreSQL non si connette

**Errore:**

```
❌ Errore connessione PostgreSQL: FATAL: password authentication failed
```

**Soluzione:**

```bash
# Resetta password postgres
sudo -u postgres psql
postgres=# ALTER USER postgres PASSWORD 'nuova_password';
postgres=# \q

# Aggiorna script con nuova password
```

---

### Problema: Database non trovato

**Errore:**

```
❌ Errore connessione PostgreSQL: database "DrugsCompatibility" does not exist
```

**Soluzione:**

```bash
# Elenca database esistenti
psql -U postgres -l

# Se il database non esiste, controlla backup o file SQL
ls ~/backup/drugsCompatibility*.sql

# Ripristina da backup
psql -U postgres -f backup.sql
```

---

### Problema: Credenziali Google Sheets non trovate

**Errore:**

```
❌ Errore connessione Google Sheets: [Errno 2] No such file or directory: 'credentials.json'
```

**Soluzione:**

1. Verifica path del file:

   ```bash
   ls -la /home/nyk-ai/projects/medicalUtility/credentials.json
   ```

2. Se non esiste, ripeti [Step 1: Setup Google Cloud](#step-1-setup-google-cloud)

3. Posiziona `credentials.json` nella root del progetto

---

### Problema: Permessi Google Sheets

**Errore:**

```
❌ gspread.exceptions.APIError: The caller does not have permission
```

**Soluzione:**

1. Apri `credentials.json`
2. Copia `client_email`
3. Condividi Google Sheets con quella email (Editor)

---

### Problema: Script lento

**Sintomo:**

```
Progresso: 100/2500 (4%)
```

**Spiegazione:**

- Il database ha 50 farmaci = 50×50 = 2500 query
- Tempo stimato: ~5-10 minuti

**Ottimizzazione:**
Modifica script per query singola:

```python
def build_compatibility_matrix_fast(conn, drugs: List[str]) -> pd.DataFrame:
    """Versione ottimizzata - una query sola"""
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {TABLE_NAME}")

    # Costruisci matrice da risultati
    columns = [desc[0] for desc in cursor.description]
    rows = cursor.fetchall()

    matrix = pd.DataFrame(rows, columns=columns)
    matrix.set_index(COLUMN_NAME, inplace=True)

    return matrix
```

---

## 📊 Output Atteso

### Console Output

```
======================================================================
🏥 EXPORT COMPATIBILITÀ FARMACI - PostgreSQL → Google Sheets
======================================================================
✅ Connesso a PostgreSQL
✅ Trovati 50 farmaci

📋 Farmaci trovati:
   1. Amikacin
   2. Ampicillin
   3. Cefazolin
   ...
   50. Vancomycin

📊 Costruendo matrice compatibilità...
   Progresso: 500/2500 (20%)
   Progresso: 1000/2500 (40%)
   Progresso: 1500/2500 (60%)
   Progresso: 2000/2500 (80%)
   Progresso: 2500/2500 (100%)
✅ Matrice completata: 50x50 celle

📤 Caricando dati su Google Sheets...
🎨 Applicando formattazione...
✅ Dati caricati con successo!
🔗 Apri: https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k/edit

======================================================================
✅ COMPLETATO!
======================================================================
```

### Google Sheets Result

Matrice 50×50 con:

- Prima riga: Nomi farmaci (header)
- Prima colonna: Nomi farmaci (index)
- Celle: Codici compatibilità (C, Y, I, !, '')

---

## 🔄 Prossimi Passi

Dopo aver completato l'export:

1. **Review Dati** - Verifica manualmente Google Sheets
2. **Correzioni** - Aggiusta dati incompleti o conflittuali
3. **Export TypeScript** - Crea script per convertire in formato TypeScript
4. **Integrazione** - Importa in Medical Utility Pro
5. **Deploy** - Pubblica su Firebase

---

## 📚 Riferimenti

- **Vecchio Progetto**: https://github.com/vas-chif/drugsCompatibility
- **Google Sheets**: https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k/edit
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Google Sheets API**: https://developers.google.com/sheets/api

---

**Autore:** Vasile Chifeac  
**Data:** 2024-11-09  
**Progetto:** Medical Utility Pro
