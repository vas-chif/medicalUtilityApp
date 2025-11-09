# 💊 GUIDA COMPLETAMENTO TABELLA COMPATIBILITÀ FARMACI

## 🎯 Obiettivo

Completare la tabella di compatibilità farmaci in Google Sheets con interfaccia facile e validazione automatica.

---

## 📋 TRE METODI DISPONIBILI

### Metodo 1: **Google Apps Script Interface** (⭐ CONSIGLIATO)

**Pro:** Interfaccia visuale, validazione automatica, simmetria automatica  
**Tempo:** 2-3 min setup, poi inserimento rapido

### Metodo 2: **Python PDF Extraction**

**Pro:** Estrazione automatica da PDF  
**Contro:** Richiede OCR, potrebbe non essere 100% accurato

### Metodo 3: **Manuale con Formule PostgreSQL**

**Pro:** Riprende logica del progetto Java originale  
**Contro:** Più complesso

---

## ⚡ METODO 1: GOOGLE APPS SCRIPT (VELOCE)

### STEP 1: Installa Script in Google Sheets

```
1. Apri Google Sheets:
   https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k

2. Menu: Estensioni → Apps Script

3. Cancella tutto il codice esistente

4. Copia e incolla il file:
   scripts/google-sheets-interface.gs

5. Salva: Ctrl+S (o File → Salva)

6. Chiudi editor Apps Script

7. Ricarica Google Sheets (F5)

8. Nuovo menu "💊 Compatibilità Farmaci" apparirà!
```

---

### STEP 2: Prepara Tabella

```
1. Nel menu: 💊 Compatibilità Farmaci → 📊 Genera Matrice

2. Conferma generazione matrice

3. Verrà creata matrice NxN con:
   - Riga 1: Nomi farmaci (header orizzontale)
   - Colonna A: Nomi farmaci (header verticale)
   - Celle vuote per compatibilità
```

---

### STEP 3: Inserisci Compatibilità

```
1. Menu: 💊 Compatibilità Farmaci → 📝 Inserisci Compatibilità

2. Dialog si apre con:
   ┌─────────────────────────────────┐
   │ Farmaco 1: [Dropdown]           │
   │ Farmaco 2: [Dropdown]           │
   │                                 │
   │ Compatibilità:                  │
   │ ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
   │ │ ✅ │ │ ⚠️  │ │ ❌ │ │ ❓ │       │
   │ │ C │ │ Y │ │ I │ │ - │       │
   │ └───┘ └───┘ └───┘ └───┘       │
   │                                 │
   │ Note: [Text area]              │
   │                                 │
   │ [💾 Salva] [❌ Annulla]         │
   └─────────────────────────────────┘

3. Seleziona Farmaco 1 (es: Amikacin)
4. Seleziona Farmaco 2 (es: Ampicillin)
5. Clicca sul pulsante compatibilità:
   ✅ C = Compatibile
   ⚠️ Y = Y-site
   ❌ I = Incompatibile
   ❓ - = Nessun dato

6. Aggiungi note (opzionale)

7. Clicca "Salva"

8. ✅ Compatibilità salvata in ENTRAMBE le direzioni automaticamente!
   (Amikacin→Ampicillin E Ampicillin→Amikacin)
```

---

### STEP 4: Valida Tabella

```
Menu: 💊 Compatibilità Farmaci → ✅ Valida Tabella

Mostra:
- Numero farmaci
- Compatibilità totali
- Compatibilità compilate (%)
- Compatibilità mancanti
- Errori (asimmetrie, valori non validi)
- Warning
```

---

### STEP 5: Esporta JSON per TypeScript

```
Menu: 💊 Compatibilità Farmaci → 📥 Esporta JSON

Output:
{
  "Amikacin": {
    "Ampicillin": "I",
    "Fentanyl": "C",
    ...
  },
  "Ampicillin": {
    "Amikacin": "I",
    ...
  }
}

Copia e incolla in:
src/data/drugs.ts
```

---

## 🐍 METODO 2: PYTHON PDF EXTRACTION

### STEP 1: Installa Dipendenze

```bash
# Ubuntu/Debian
sudo apt-get install tesseract-ocr poppler-utils

# Python packages
pip install pytesseract pdf2image pillow pandas openpyxl
```

---

### STEP 2: Esegui Estrazione

```bash
cd /home/nyk-ai/projects/medicalUtility/scripts

# Copia il PDF delle compatibilità qui
cp /percorso/al/pdf/compatibilita.pdf .

# Esegui estrazione
python extract_compatibility_from_pdf.py

# Output:
# - extracted_text.txt (testo grezzo OCR)
# - drug_compatibility_extracted.xlsx (matrice)
# - drug_compatibility_extracted.csv (matrice CSV)
```

---

### STEP 3: Verifica e Correggi

```
1. Apri extracted_text.txt
   - Verifica qualità OCR
   - Cerca errori di riconoscimento

2. Apri drug_compatibility_extracted.xlsx
   - Verifica compatibilità estratte
   - Correggi errori manualmente

3. Importa in Google Sheets
```

---

## 🔧 METODO 3: FUNZIONI POSTGRESQL (dal progetto Java)

### Analisi FunctionPostgreSQL.java

Dal tuo progetto originale:

```java
// Funzioni utilizzate:
1. insertDrug(String name, String category)
   → Inserisce nuovo farmaco

2. insertCompatibility(String drug1, String drug2, String compatibility)
   → Inserisce compatibilità (bidirezionale automatico)

3. getSymmetricCompatibilities()
   → Verifica simmetria matrice

4. getMissingCompatibilities()
   → Lista compatibilità mancanti

5. validateCompatibilityMatrix()
   → Validazione completa
```

---

### Equivalente Google Sheets Formula

```
Colonna Helper per validazione:

=IF(B2="", "MANCANTE",
   IF(B2=INDIRECT(ADDRESS(COLUMN(), ROW())), "OK",
      "ASIMMETRIA"))
```

---

## 📊 RIFERIMENTI ESTERNI

### 1. Sito nurse24.it

```
URL: https://www.nurse24.it/infermiere/utility/app-farmaci.html

Estratto manuale:
1. Apri sito
2. Cerca farmaco
3. Controlla compatibilità
4. Inserisci in Google Sheets con interfaccia
```

---

### 2. PDF Compatibilità

```
Se hai PDF con tabella:
1. Usa Python script (Metodo 2)
2. Oppure estrai manualmente pagina per pagina
3. Inserisci con interfaccia Google Sheets
```

---

## 🎯 WORKFLOW CONSIGLIATO

### Fase 1: Setup (5 min)

```
✅ Installa Google Apps Script
✅ Genera matrice vuota
✅ Prova inserire 2-3 compatibilità di test
```

---

### Fase 2: Estrazione Automatica (30 min)

```
✅ Esegui Python script su PDF
✅ Importa Excel generato in Google Sheets
✅ Valida con script (correggi errori)
```

---

### Fase 3: Completamento Manuale (2-3 ore)

```
✅ Apri sito nurse24.it in tab separata
✅ Per ogni farmaco mancante:
   - Cerca su sito
   - Inserisci con interfaccia Google Sheets
   - Valida periodicamente
✅ Export JSON finale
```

---

## 📋 CHECKLIST COMPLETAMENTO

```
□ Google Apps Script installato
□ Matrice generata
□ Python extraction completato (opzionale)
□ Prima validazione OK
□ Compatibilità principali inserite (es: antibiotici)
□ Compatibilità vasopressori inserite
□ Compatibilità sedativi inserite
□ Compatibilità analgesici inserite
□ Validazione finale: 100% compilato
□ Nessun errore asimmetria
□ Export JSON completato
□ JSON integrato in src/data/drugs.ts
□ Test app funzionante
```

---

## 🚀 ESEMPIO INSERIMENTO RAPIDO

### Scenario: Hai 10 farmaci, 45 compatibilità da inserire

```
Tempo stimato con interfaccia:
- Setup: 5 min
- Inserimento 45 compatibilità: ~15 min (20 sec/compatibilità)
- Validazione: 2 min
- Export: 1 min

TOTALE: ~25 minuti! 🚀
```

---

## 💡 SUGGERIMENTI

### 1. Ordina per Priorità

```
Alta priorità (fai prima):
✅ Farmaci vasoattivi (Dopamine, Norepinephrine)
✅ Sedativi ICU (Midazolam, Propofol, Fentanyl)
✅ Antibiotici comuni (Amikacin, Vancomycin)

Bassa priorità:
⏳ Farmaci rari
⏳ Compatibilità poco usate
```

---

### 2. Lavora per Blocchi

```
Giorno 1: Antibiotici (15 farmaci)
Giorno 2: Vasoattivi + Sedativi (10 farmaci)
Giorno 3: Altri + validazione finale
```

---

### 3. Doppio Check

```
Per compatibilità critiche (I = Incompatibile):
✅ Verifica su almeno 2 fonti
✅ Aggiungi note con riferimento
✅ Marca come "verificato"
```

---

## 📞 SUPPORTO

### Problemi Google Apps Script?

```
1. Verifica permessi:
   - Tools → Script editor permissions
   - Autorizza accesso foglio

2. Errore "google.script.run not defined":
   - Ricarica pagina
   - Apri dialog da menu (non da URL)

3. Menu non appare:
   - Ricarica foglio (F5)
   - Controlla onOpen() salvato
```

---

### Problemi Python OCR?

```
1. Tesseract non trovato:
   sudo apt-get install tesseract-ocr tesseract-ocr-ita

2. PDF2Image errore:
   sudo apt-get install poppler-utils

3. Bassa qualità OCR:
   - Aumenta DPI (300 → 600)
   - Pre-processa immagine (contrasto, luminosità)
```

---

## 🎯 RISULTATO FINALE

Al completamento avrai:

```
✅ Matrice compatibilità 100% compilata
✅ Simmetria verificata
✅ Valori validati (solo C, Y, I)
✅ JSON esportato
✅ Database TypeScript aggiornato
✅ App funzionante con compatibilità complete
```

---

**Tempo totale stimato:** 3-5 ore  
**Metodo consigliato:** Google Apps Script + inserimento manuale da nurse24.it  
**Difficoltà:** ⭐⭐☆☆☆ (Facile con interfaccia)

---

**Created by:** Vasile Chifeac  
**Version:** 1.0.0  
**Date:** 2024-11-09
