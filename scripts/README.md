# Drug Database Scripts

Scripts per conversione e gestione database compatibilità farmaci.

## 📁 Struttura Directory

```
scripts/
├── input/
│   └── drugsCompatibility - compFarmaci.csv    # CSV sorgente (134 farmaci)
├── output/
│   ├── drugs-database.json                      # Database leggibile (1.7 MB)
│   └── drugs-database.min.json                  # Database minificato (958 KB) ⭐
├── csv-to-json-converter.py                     # Script conversione Python
├── README.md                                    # Questa guida
├── README_INTEGRAZIONE.md                       # Guida dettagliata integrazione
├── DATABASE_FORMAT_SPECIFICATION.md             # Documentazione formato JSON
└── CONVERSION_SUMMARY.md                        # Riepilogo conversione
```

## 🚀 Quick Start

### Prerequisiti

- Python 3.11+
- File CSV nella cartella `input/`

### Eseguire Conversione

```bash
cd /home/nyk-ai/projects/medicalUtility/scripts
python3 csv-to-json-converter.py
```

Output:
```
======================================================================
🔄 CSV to JSON Drug Database Converter
======================================================================

📋 Lettura CSV: input/drugsCompatibility - compFarmaci.csv
✓ Header letto: 139 colonne
✓ Farmaci nelle colonne: 134
✓ Farmaci nelle righe: 134

✅ Database creato: output/drugs-database.json

📊 Statistiche:
   • Farmaci totali: 134
   • Compatibilità totali: 17956
   • Compatible: 3048
   • Incompatible: 3544
   • Unknown: 8692
   • File minificato: output/drugs-database.min.json
   • Dimensione leggibile: 1723.5 KB
   • Dimensione minificata: 957.8 KB

🔍 Validazione database...
✅ Database validato correttamente

======================================================================
✨ Conversione completata con successo!
======================================================================
```

## 📊 Database Output

### File Generati

| File | Uso | Dimensione |
|------|-----|-----------|
| `drugs-database.json` | Debug/Sviluppo | 1.7 MB |
| `drugs-database.min.json` | **Produzione** ⭐ | 958 KB |

### Statistiche

- **134 farmaci** totali
- **17,956 record compatibilità** (matrice 134×134)
- **5 stati compatibilità**: Compatible, Incompatible, Conditional, Severe, Unknown
- **31 farmaci** richiedono CVC (23.1%)
- **4 colonne metadati**: Fotosensibile, CVC, Note concentrazione, Rischio flebite

## 🔧 Features Convertitore

### Parsing Intelligente

- ✅ Stati compatibilità avanzati (C, I, Y, !, null)
- ✅ Campo CVC multi-formato (CVC, CVC+C, SI, SI + C, etc.)
- ✅ Struttura multilingua (IT/EN ready)
- ✅ Validazione automatica
- ✅ Generazione ID univoci
- ✅ Ottimizzazione file (minificato per produzione)

### Validazioni

- [x] Campi obbligatori presenti
- [x] ID univoci
- [x] Stati compatibilità validi
- [x] Struttura multilingua corretta
- [x] Conteggi corretti

## 📖 Documentazione

### Guide Complete

1. **[README_INTEGRAZIONE.md](./README_INTEGRAZIONE.md)** (600+ righe)
   - Quick start completo
   - Esempi UI Quasar
   - Checklist integrazione
   - Best practices

2. **[DATABASE_FORMAT_SPECIFICATION.md](./DATABASE_FORMAT_SPECIFICATION.md)** (500+ righe)
   - Schema JSON dettagliato
   - Interfacce TypeScript
   - Esempi codice
   - Regole validazione

3. **[CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md)**
   - Riepilogo conversione
   - Statistiche complete
   - Roadmap future

## 🎯 Integrazione in App

### Step 1: Copia Database

```bash
cp output/drugs-database.min.json ../public/data/drugs-database.json
```

### Step 2: Usa Servizio TypeScript

```typescript
import { drugDatabaseService } from 'src/services/drug-database.service';

// Carica database
await drugDatabaseService.loadDatabase('/data/drugs-database.json');

// Verifica compatibilità
const result = drugDatabaseService.checkCompatibility('aciclovir', 'morfina-cloridrato');

if (result?.status === 'incompatible-severe') {
  alert(`🚨 ${result.warning}`);
}
```

Vedi `README_INTEGRAZIONE.md` per guida completa.

## 🔄 Aggiornare Dati

### Quando Modificare CSV

1. Aggiorna `input/drugsCompatibility - compFarmaci.csv`
2. Esegui conversione:
   ```bash
   python3 csv-to-json-converter.py
   ```
3. Verifica output
4. Copia nuovo database in app:
   ```bash
   cp output/drugs-database.min.json ../public/data/drugs-database.json
   ```

### Formato CSV Richiesto

```csv
PRINCIPIO ATTIVO:,FOTOSENSIBILE,NECESSITÀ DI CVC,NOTES/CONCENTRAZIONI,NOTO RISCHIO FLEBITE,FARMACO1,FARMACO2,...
FARMACO1,,,,,null,C,I,...
FARMACO2,,,,,I,null,Y,...
```

**Colonne richieste**:
1. PRINCIPIO ATTIVO (nome farmaco)
2. FOTOSENSIBILE (SI/NO)
3. NECESSITÀ DI CVC (vari formati supportati)
4. NOTES/CONCENTRAZIONI (testo libero)
5. NOTO RISCHIO FLEBITE (testo libero)
6-N. Compatibilità con altri farmaci (C/I/Y/!/null)

## 🧪 Testing

Test suite disponibili in:
- `../src/services/__tests__/drug-database.service.test.ts`

Esegui test:
```bash
npm run test
# oppure
npm run test:unit
```

## 📝 Codici Compatibilità

| CSV | JSON | Significato | UI |
|-----|------|-------------|-----|
| `C` | `compatible` | Compatibile | 🟢 Verde |
| `I` | `incompatible` | Incompatibile | 🔴 Rosso |
| `Y` | `compatible-conditional` | Dipende concentrazione | 🟡 Giallo |
| `!` | `incompatible-severe` | Pericolo grave | 🔴 Rosso scuro |
| `null` | `unknown` | Sconosciuto | ⚫ Grigio |

## ⚠️ Note Importanti

1. **Sempre usare file minificato** in produzione (`drugs-database.min.json`)
2. **Validare sempre** le combinazioni critiche (!)
3. **Mostrare warning** per compatibilità condizionali (Y)
4. **Log audit** per tracciare verifiche compatibilità
5. **Backup CSV** prima di modifiche

## 📞 Support

Per problemi o domande:
1. Leggi `README_INTEGRAZIONE.md`
2. Consulta `DATABASE_FORMAT_SPECIFICATION.md`
3. Verifica `CONVERSION_SUMMARY.md`

## 🛣️ Roadmap

### v1.0 (Attuale) ✅
- [x] Conversione CSV → JSON
- [x] Stati compatibilità avanzati
- [x] Campo CVC intelligente
- [x] Struttura multilingua
- [x] Validazione automatica
- [x] Documentazione completa

### v2.0 (Futuro)
- [ ] Traduzioni inglesi complete
- [ ] Metadati aggiuntivi (categoria, vie, dosaggi)
- [ ] Motivazioni incompatibilità
- [ ] Riferimenti bibliografici
- [ ] API REST per aggiornamenti

---

**Version**: 1.0.0  
**Last Update**: December 9, 2025  
**Status**: ✅ Production Ready
