# 🚀 QUICK START - Migrazione Database Farmaci

## ⚡ Setup Rapido (5 minuti)

### 1️⃣ Installa Dipendenze

```bash
cd /home/nyk-ai/projects/medicalUtility

# Crea ambiente virtuale
python3 -m venv venv
source venv/bin/activate

# Installa tutto
pip install -r requirements.txt
```

### 2️⃣ Configura Password PostgreSQL

Apri il file:

```bash
nano scripts/export_compatibility_to_google_sheets.py
```

Modifica riga 25:

```python
'password': 'TUA_PASSWORD_POSTGRES'  # ⚠️ Cambia questa
```

Salva: `Ctrl+O`, `Enter`, `Ctrl+X`

### 3️⃣ Esegui Script

```bash
python3 scripts/export_compatibility_to_google_sheets.py
```

Scegli opzione **2** (CSV - metodo semplice):

```
Scelta (1/2/3): 2
```

### 4️⃣ Import in Google Sheets

1. Apri: https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k/edit
2. **File** → **Import** → **Upload**
3. Seleziona `compatibility_matrix.csv`
4. **Replace current sheet** → **Import data**

## ✅ FATTO!

Dati migrati su Google Sheets.

---

## 🤖 Metodo Automatico (Google Sheets API)

Se vuoi automatizzare completamente (opzionale):

### 1. Setup Google Cloud (10 minuti)

1. Vai su: https://console.cloud.google.com/
2. Crea progetto: `Medical Utility Migration`
3. Abilita **Google Sheets API**
4. Crea **Service Account** → **Create Key (JSON)**
5. Salva JSON come: `credentials.json` (nella root del progetto)

### 2. Installa dipendenze extra

```bash
pip install gspread google-auth
```

### 3. Condividi Google Sheets

1. Apri `credentials.json`
2. Copia l'email: `drug-migration-bot@...iam.gserviceaccount.com`
3. Apri Google Sheets → **Share**
4. Aggiungi email → **Editor**

### 4. Esegui script

```bash
python3 scripts/export_compatibility_to_google_sheets.py
```

Scegli opzione **1** (Google Sheets automatico)

---

## 🆘 Problemi?

### PostgreSQL non si connette

```bash
# Verifica PostgreSQL
sudo systemctl status postgresql

# Elenca database
psql -U postgres -l

# Connetti
psql -U postgres -d DrugsCompatibility
```

### Database non esiste

```bash
# Cerca backup
ls ~/backup/*.sql
ls ~/Documents/*.sql
ls ~/Downloads/*.sql
```

### Script lento

Normale se hai 50+ farmaci (50×50 = 2500 query).  
Tempo: ~5-10 minuti.

---

## 📖 Documentazione Completa

Vedi: [docs/DATABASE_MIGRATION_GUIDE.md](docs/DATABASE_MIGRATION_GUIDE.md)

---

**Autore:** Vasile Chifeac  
**Progetto:** Medical Utility Pro
