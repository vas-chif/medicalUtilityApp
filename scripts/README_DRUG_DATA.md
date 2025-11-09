# 🏥 Drug Compatibility Data Extraction Guide

Strumenti per estrarre e gestire i dati della **Tabella Compatibilità Farmaci** dall'Azienda Ospedaliera San Gerardo di Monza.

## 📋 Panoramica

Questo progetto fornisce **3 metodi** per inserire i dati della tabella di compatibilità farmaci nel database:

1. **🌐 Tool Web Interattivo** (RACCOMANDATO) - Interfaccia grafica per inserimento manuale facilitato
2. **🐍 Script Python OCR** - Estrazione automatica tramite OCR (richiede setup)
3. **✍️ Entry Manuale Terminale** - Modalità interattiva da command line

---

## 🌐 Metodo 1: Tool Web Interattivo (RACCOMANDATO)

### ✅ Vantaggi

- ✨ Interfaccia grafica moderna e user-friendly
- 📊 Statistiche in tempo reale
- 🎨 Legenda visiva con codici colore
- 📦 Generazione automatica codice TypeScript
- 💾 Export JSON immediato
- ❌ NO setup richiesto, funziona direttamente nel browser

### 🚀 Come Usarlo

1. **Apri il tool nel browser:**

   ```bash
   cd /home/nyk-ai/projects/medicalUtility/scripts
   firefox drug-data-entry-tool.html  # o chrome, edge, etc.
   ```

2. **Inserisci i dati dalla tabella:**
   - Nome farmaco (es. "Amiodarone")
   - Principio attivo (es. "Amiodarone Hydrochloride")
   - Categoria (selezione dropdown)
   - Concentrazione (es. "> 2mg/ml CVC+")
   - Note cliniche
   - Checkbox per CVC e fotosensibilità

3. **Clicca "Aggiungi Farmaco"** per ogni farmaco

4. **Quando finisci:**
   - Clicca **"Genera Codice TypeScript"** per vedere il codice da copiare in `src/data/drugs.ts`
   - Clicca **"Scarica JSON"** per salvare un backup in formato JSON

### 📸 Screenshot dei Dati dalla Tabella

**Legenda Colori (dalle immagini):**

- 🟢 **C (Verde)** = Compatible - Farmaci compatibili in soluzione
- 🟡 **Y (Giallo)** = Y-site only - Compatibili solo tramite rubinetto
- 🔴 **I (Rosso)** = Incompatible - MAI mescolare (precipitazione)
- 🟠 **! (Arancione)** = Conflicting Data - Dati contrastanti in letteratura
- 🟢 **si (Verde chiaro)** = CVC necessario - Richiede Catetere Venoso Centrale
- ⚪ **'' (Grigio)** = No Data - Nessun dato disponibile

### 📊 Esempio Compilazione

**Dalla IMMAGINE 1 (Prima riga - AMIODARONE):**

```
Nome: Amiodarone
Principio Attivo: Amiodarone Hydrochloride
Categoria: antiarrhythmic
Concentrazione: > 2mg/ml CVC+ | non diluito/Dma+/ml CVC+
✅ Richiede CVC
✅ Fotosensibile (CONSERVARE AL RIPARO DALLA LUCE)
Note: Class III antiarrhythmic - CVC required for concentrations > 2mg/ml. PROTECT FROM LIGHT
```

**Clicca "Aggiungi"** e passa al farmaco successivo.

---

## 🐍 Metodo 2: Script Python con OCR

### ⚙️ Setup (prima volta)

1. **Installa dipendenze Python:**

   ```bash
   pip install pytesseract pillow opencv-python pandas numpy
   ```

2. **Installa Tesseract OCR:**

   ```bash
   # Ubuntu/Debian
   sudo apt-get install tesseract-ocr tesseract-ocr-ita

   # macOS
   brew install tesseract tesseract-lang

   # Windows
   # Download installer: https://github.com/tesseract-ocr/tesseract/wiki
   ```

### 🚀 Uso

**Modalità OCR (estrazione automatica dalle immagini):**

```bash
cd /home/nyk-ai/projects/medicalUtility/scripts

# Salva le 7 immagini in una cartella
mkdir images
# (Copia le immagini della tabella nella cartella 'images/')

# Esegui estrazione
python extract_drug_data.py --input images/ --output drugs_extracted.json
```

**Modalità Manuale Interattiva:**

```bash
python extract_drug_data.py --manual
```

Segui le istruzioni interattive per inserire:

1. Nomi farmaci
2. Dettagli (principio attivo, concentrazione, etc.)
3. Compatibilità tra farmaci (opzionale)

Output: `drugs_manual_entry.json`

---

## ✍️ Metodo 3: Entry Manuale Diretta

### Edita direttamente il file TypeScript

Apri `/home/nyk-ai/projects/medicalUtility/src/data/drugs.ts` e segui il template esistente:

```typescript
export const drugsDatabase: Drug[] = [
  {
    id: 'amiodarone',
    name: 'Amiodarone',
    activeIngredient: 'Amiodarone Hydrochloride',
    category: 'antiarrhythmic' as DrugCategory,
    route: 'intravenous' as AdministrationRoute,
    concentration: '> 2mg/ml CVC+ | non diluito/Dma+/ml CVC+',
    requiresCVC: true,
    lightSensitive: true,
    clinicalNotes:
      'Class III antiarrhythmic - CVC required for concentrations > 2mg/ml. PROTECT FROM LIGHT',
  },
  // Aggiungi altri farmaci qui...
];

export const compatibilityMatrix: CompatibilityMatrix = {
  AMIODARONE: {
    DOBUTAMINE: DrugCompatibility.INCOMPATIBLE, // Rosso (I)
    DOPAMINE: DrugCompatibility.COMPATIBLE_ON_TAP, // Giallo (Y)
    FENTANYL: DrugCompatibility.COMPATIBLE, // Verde (C)
    // ... continua con altri farmaci
  },
  // Aggiungi altri farmaci qui...
};
```

---

## 📊 Struttura Dati

### Drug Object

```typescript
{
  id: string;                    // es. 'amiodarone'
  name: string;                  // es. 'Amiodarone'
  activeIngredient?: string;     // es. 'Amiodarone Hydrochloride'
  category: DrugCategory;        // antibiotic | analgesic | cardiovascular | etc.
  concentration?: string;        // es. '> 2mg/ml CVC+'
  route: AdministrationRoute;    // intravenous | intramuscular | etc.
  requiresCVC?: boolean;         // true se richiede CVC
  lightSensitive?: boolean;      // true se fotosensibile
  clinicalNotes?: string;        // Note cliniche
}
```

### Compatibility Matrix

```typescript
{
  'DRUG1': {
    'DRUG2': 'C',   // Compatible
    'DRUG3': 'Y',   // Y-site only
    'DRUG4': 'I',   // Incompatible
    'DRUG5': '!',   // Conflicting data
    'DRUG6': '',    // No data
  }
}
```

---

## 🎯 Workflow Raccomandato

### Per Compilazione Completa delle 7 Immagini:

1. **Apri il Tool Web** (`drug-data-entry-tool.html`)

2. **Per ogni immagine (1-7):**
   - Apri l'immagine in un'altra finestra per riferimento
   - Inserisci i farmaci uno per uno
   - Ogni 10-20 farmaci, clicca **"Scarica JSON"** per backup

3. **Dopo tutti i farmaci:**
   - Clicca **"Genera Codice TypeScript"**
   - Copia il codice generato
   - Incolla in `src/data/drugs.ts`

4. **Aggiungi matrice compatibilità:**
   - Ora che hai tutti i farmaci, aggiungi la matrice manualmente
   - Usa le immagini per riferimento sui codici colore
   - Segui il pattern:
     ```typescript
     'FARMACO1': {
       'FARMACO2': DrugCompatibility.COMPATIBLE,  // C (verde)
       'FARMACO3': DrugCompatibility.INCOMPATIBLE,  // I (rosso)
       // ...
     }
     ```

5. **Test nel browser:**
   ```bash
   npm run dev
   # Vai a http://localhost:9000/#/drug-compatibility
   # Testa la ricerca e l'analisi compatibilità
   ```

---

## 📚 Riferimenti

### Fonte Dati

- **Ospedale:** Azienda Ospedaliera San Gerardo - Monza
- **Dipartimento:** Terapia Intensiva Generale
- **Autori:**
  - Daniele Moretta
  - Alessia Gazzola
  - Stefania Poddaş
  - Alberto Lucchini
- **Riferimento:** Prof. Antonio Pesenti (Università degli Studi di Milano-Bicocca - Primario)

### Riferimenti Medici

- Micromedex IV Compatibility Database
- Trissel's Handbook on Injectable Drugs (20th Edition)
- ASHP Guidelines on Preventing Medication Errors
- FDA Drug Interaction Database

---

## ❓ FAQ

**Q: Quale metodo è il più veloce?**
A: Il **Tool Web Interattivo** è il più veloce e user-friendly. OCR richiede setup e può avere errori.

**Q: Come gestisco gli errori OCR?**
A: L'OCR è sperimentale. Usa sempre il Tool Web per risultati affidabili.

**Q: Posso importare un JSON esistente?**
A: Sì, modifica `src/data/drugs.ts` direttamente copiando i dati dal JSON.

**Q: Come verifico la correttezza dei dati?**
A: Esegui `npm run dev` e testa la pagina Drug Compatibility. Verifica che i farmaci appaiano e le compatibilità siano corrette.

**Q: Devo compilare TUTTE le 180 righe?**
A: Puoi iniziare con i farmaci più comuni (es. vasopressori, sedativi, antibiotici) e aggiungere gli altri progressivamente.

---

## 🚀 Quick Start

**Inizia subito con il Tool Web:**

```bash
cd /home/nyk-ai/projects/medicalUtility/scripts
firefox drug-data-entry-tool.html
```

Inserisci i primi 10 farmaci e testa il sistema! 🎉

---

## 📞 Supporto

Per problemi o domande:

1. Controlla le immagini originali per riferimento
2. Verifica il codice esistente in `src/data/drugs.ts`
3. Testa con `npm run dev` la pagina Drug Compatibility

---

**Ultima modifica:** 2025-01-20
**Versione:** 1.0.0
