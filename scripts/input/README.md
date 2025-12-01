# 📁 Input CSV Directory

Directory per i file CSV esportati da Google Sheets.

## 🔄 Workflow Export Manuale

### **STEP 1: Export da Google Sheets**
1. Apri Google Sheets: `drugsCompatibility - compFarmaci`
2. Menu: `File` → `Download` → `Comma-separated values (.csv, current sheet)`
3. Salva come: `drugsCompatibility - compFarmaci.csv`

### **STEP 2: Copia in progetto**
```bash
# Da Downloads a progetto
cp ~/Downloads/drugsCompatibility\ -\ compFarmaci.csv scripts/input/drugs.csv
```

### **STEP 3: Esegui conversione**
```bash
# Dalla root del progetto
python scripts/convert_sheet_to_json.py \
  --input scripts/input/drugs.csv \
  --output public/data/drugs/
```

### **STEP 4: Verifica output**
```bash
# Check files generati
ls -lh public/data/drugs/
cat public/data/drugs/index.json | jq '.metadata'
```

---

## 📊 Formato CSV Atteso

### **Struttura Header (Riga 1)**
```
PRINCIPIO ATTIVO:,FOTOSENSIBILE,VIA CENTRALE / PERIFERICA,DRUG1,DRUG2,DRUG3,...
```

### **Righe Dati (2+)**
```
DRUG1,Si/No,Centrale/Periferica,null,Y,C,I,...
DRUG2,Si/No,Centrale/Periferica,Y,null,I,C,...
```

### **Valori Compatibilità**
- `Y` = Compatibile
- `C` = Compatibile con cautela
- `I` = Incompatibile
- `!` = Incompatibilità grave
- `null` = Dato non disponibile

---

## ⚠️ NOTE IMPORTANTI

1. **SOVRASCRITTURA**: Lo script **SOVRASCRIVE COMPLETAMENTE** `index.json` e `compatibility.json`
2. **File info/ protetti**: NON tocca file `public/data/drugs/info/{drugId}.json` (mantiene `vancomycin.json` esistente)
3. **Campo description**: Creato vuoto, da compilare manualmente in `info/{drugId}.json`
4. **Backup**: Fai backup Git prima di eseguire lo script!

---

## 🔍 Esempio Output

### **index.json**
```json
{
  "metadata": {
    "version": "1.0.0",
    "lastUpdate": "2025-12-01T15:30:00",
    "totalDrugs": 135,
    "source": "Google Sheets CSV Export"
  },
  "drugs": [
    {
      "id": "vancomycin",
      "name": { "it": "Vancomicina", "en": "Vancomycin" },
      "category": { "it": "ANTIBIOTICI", "en": "ANTIBIOTICS" },
      "description": { "it": "", "en": "" },
      "administrationRoute": { "it": "Endovenosa", "en": "Intravenous" },
      "isPhotosensitive": false
    }
  ]
}
```

### **compatibility.json**
```json
{
  "metadata": {
    "version": "1.0.0",
    "totalPairs": 8910
  },
  "compatibility": [
    {
      "drug1Id": "vancomycin",
      "drug2Id": "furosemide",
      "compatibility": "I",
      "description": {
        "it": "Incompatibile - NON somministrare insieme",
        "en": "Incompatible - DO NOT administer together"
      }
    }
  ]
}
```

---

**Frequenza aggiornamento**: ~1 volta/mese  
**Tempo richiesto**: ~2 minuti  
**Costo**: €0 (tutto manuale, nessuna API)
