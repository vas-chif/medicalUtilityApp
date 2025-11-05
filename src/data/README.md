# 💊 Database Compatibilità Farmaci

## 📍 Posizioni dei Dati (NON si perdono più!)

### 1. **Database JSON Locale** ⭐ PRINCIPALE

```
📁 /home/nyk-ai/projects/medicalUtility/src/data/drugs.json
```

- ✅ Salvato nel progetto
- ✅ Versionato con Git
- ✅ Backup automatico
- ✅ Non si perde mai

### 2. **Tipi TypeScript**

```
📁 /home/nyk-ai/projects/medicalUtility/src/types/DrugTypes.ts
```

- Definizioni TypeScript per type-safety
- Enum per compatibilità (C, Y, I, !, '')
- Interfacce per Drug, CompatibilityResult, etc.

### 3. **Logica Business (Composable)**

```
📁 /home/nyk-ai/projects/medicalUtility/src/composables/useDrugCompatibility.ts
```

- Convertito da Java (vas-chif/drugsCompatibility)
- Algoritmi di compatibilità
- Gestione ricerca e filtri

---

## 🔄 Come Aggiornare il Database

### Metodo 1: Modifica diretta JSON

```bash
# Apri il file
nano /home/nyk-ai/projects/medicalUtility/src/data/drugs.json

# Aggiungi farmaci nella sezione "drugs":
{
  "id": "drug_011",
  "name": "Morphine",
  "activeIngredient": "Morphine Sulfate",
  "category": "analgesic",
  "concentration": "10mg/mL",
  "route": "intravenous"
}

# Aggiungi compatibilità nella sezione "compatibilityMatrix":
"Morphine": {
  "Fentanyl": "C",
  "Midazolam": "C",
  ...
}
```

### Metodo 2: Export da PostgreSQL (se disponibile)

```typescript
// Script per esportare da DB PostgreSQL
import { FunctionPostgreSQL } from './postgres';

const db = new FunctionPostgreSQL('localhost', '5432', 'user', 'pass', 'DrugsCompatibility');
const drugs = db.readColumnDate('drugsCompatibility', 'name_of_drugs');
// ... salva in drugs.json
```

---

## 📊 Struttura Dati

### Drug (Farmaco)

```typescript
interface Drug {
  id: string; // Univoco
  name: string; // Nome commerciale
  activeIngredient?: string; // Principio attivo
  category?: DrugCategory; // Categoria farmacologica
  concentration?: string; // Concentrazione standard
  route?: string; // Via somministrazione
  clinicalNotes?: string; // Note cliniche
}
```

### Compatibility Matrix

```typescript
{
  "DrugName1": {
    "DrugName2": "C",  // Compatible
    "DrugName3": "Y",  // Compatible on Y-site
    "DrugName4": "I",  // Incompatible
    "DrugName5": "!",  // Conflicting data
    "DrugName6": ""    // No data
  }
}
```

### Codici Compatibilità

- `C` = ✅ **Compatible** - Compatibili, possono essere miscelati
- `Y` = 🔀 **Compatible on Tap** - Compatibili solo tramite Y-site/rubinetto
- `I` = ❌ **Incompatible** - Incompatibili, NON mischiare
- `!` = ⚠️ **Conflicting Data** - Dati contrastanti, consultare farmacista
- `''` = ❓ **No Data** - Nessun dato disponibile

---

## 🔐 Backup e Sicurezza

### Backup Automatici

1. **Git**: Ogni commit salva i dati
2. **Cloud**: Se il progetto è su GitHub/GitLab
3. **Locale**: Nella cartella src/data/

### Backup Manuale

```bash
# Crea backup timestampato
cp src/data/drugs.json src/data/drugs.backup.$(date +%Y%m%d_%H%M%S).json

# Oppure esporta
cp src/data/drugs.json ~/backup/drugs_$(date +%Y%m%d).json
```

### Ripristino

```bash
# Da backup
cp src/data/drugs.backup.YYYYMMDD_HHMMSS.json src/data/drugs.json

# Da Git
git checkout src/data/drugs.json
```

---

## 🎯 Utilizzo nel Codice

```typescript
import { useDrugCompatibility } from 'src/composables/useDrugCompatibility';

const {
  drugs, // Lista farmaci
  selectedDrugs, // Farmaci selezionati
  checkDrugCompatibility, // Controlla compatibilità
  analyzeMultipleDrugs, // Analisi multipla
  formatDrugList, // Formatta output
} = useDrugCompatibility();

// Esempio: Controlla compatibilità
const result = checkDrugCompatibility('Fentanyl', ['Midazolam', 'Heparin']);
console.log(result.compatible); // ['Midazolam', 'Heparin']
console.log(result.incompatible); // []
```

---

## 📚 Riferimenti

### Repository Originale (Java)

- **GitHub**: [vas-chif/drugsCompatibility](https://github.com/vas-chif/drugsCompatibility)
- **Classi principali**:
  - `ControlDrugs.java` → `useDrugCompatibility.ts`
  - `FunctionPostgreSQL.java` → Database JSON locale
  - `DrugFilter.java` → Logica filtro e ricerca

### Standard Medici

- **Micromedex** - Database compatibilità IV
- **Trissel's Handbook** - Compatibilità farmaci parenterali
- **King Guide** - IV Admixtures

---

## 🚀 Prossimi Passi

1. ✅ **Database JSON creato** - Non si perde più!
2. ✅ **Tipi TypeScript** - Type-safe
3. ✅ **Composable Vue** - Logica business
4. ⏳ **Componente UI** - DrugCompatibilityCalculator.vue
5. ⏳ **Integrazione PDF** - Estrai dati da PDF allegato
6. ⏳ **API Integration** - Connessione a database esterni

---

## ❓ Domande Frequenti

**Q: Dove sono salvati i dati fisicamente?**  
A: In `/home/nyk-ai/projects/medicalUtility/src/data/drugs.json`

**Q: Si perdono se riavvio il computer?**  
A: NO! Sono salvati su disco, non in RAM.

**Q: Come aggiungo nuovi farmaci?**  
A: Modifica il file `drugs.json` oppure usa l'interfaccia UI (da creare).

**Q: Posso esportare i dati?**  
A: Sì, è un file JSON standard, facilmente esportabile.

**Q: E se voglio usare PostgreSQL?**  
A: Possiamo creare un adapter per sincronizzare JSON ↔ PostgreSQL.

---

## 📝 Note Importanti

⚠️ **DISCLAIMER MEDICO**: Questo database è a scopo educativo/dimostrativo. Per uso clinico verificare sempre con fonti ufficiali e consulenza farmaceutica professionale.

🔒 **PRIVACY**: Nessun dato paziente è memorizzato, solo informazioni farmacologiche pubbliche.

📅 **Ultimo aggiornamento**: 2025-11-05  
👤 **Maintainer**: Medical Utility Pro Team
