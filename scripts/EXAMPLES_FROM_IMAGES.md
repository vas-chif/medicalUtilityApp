# 📖 Quick Start Examples - Dati Estratti dalle 7 Immagini

**Fonte:** Tabella Compatibilità Farmaci - San Gerardo Hospital (Monza)  
**Autori:** Daniele Moretta, Alessia Gazzola, Stefania Poddaş, Alberto Lucchini  
**Riferimento:** Prof. Antonio Pesenti (Università Milano-Bicocca)

---

## 🔍 ESEMPIO 1: AMIODARONE

**📸 Riferimento:** Immagine 1, prima riga della tabella dopo intestazione

### Dati Completi:

```
ID:                  amiodarone
Nome Farmaco:        Amiodarone
Principio Attivo:    Amiodarone Hydrochloride
Categoria:           antiarrhythmic
Concentrazione:      > 2mg/ml CVC+ | non diluito/Dma+/ml CVC+
Via Somministrazione: intravenous
Richiede CVC:        ✅ YES (indicato "si" nella colonna VIA CENTRALE/PERIFERICA)
Fotosensibile:       ✅ YES (icona 🔒 CONSERVARE AL RIPARO DALLA LUCE)
Note Cliniche:       Class III antiarrhythmic - CVC required for concentrations > 2mg/ml.
                     PROTECT FROM LIGHT. Monitor for QT prolongation.
```

### Esempi Compatibilità dalla Matrice:

| Drug 1     | Drug 2     | Code | Colore Cella | Significato  |
| ---------- | ---------- | ---- | ------------ | ------------ |
| Amiodarone | Dobutamine | I    | 🔴 Rosso     | Incompatible |
| Amiodarone | Dopamine   | Y    | 🟡 Giallo    | Y-site only  |
| Amiodarone | Fentanyl   | C    | 🟢 Verde     | Compatible   |

💡 **Come trovare nella tabella:**  
Cerca "AMIODARONE" nella prima colonna (sinistra), poi guarda le colonne successive per concentrazione e indicazioni CVC/light.

---

## 🔍 ESEMPIO 2: DOPAMINE

**📸 Riferimento:** Immagine 4, visibile nella matrice di compatibilità

### Dati Completi:

```
ID:                  dopamine
Nome Farmaco:        Dopamine
Principio Attivo:    Dopamine Hydrochloride
Categoria:           vasopressor
Concentrazione:      40mg/mL (standard dilution 400mg/250mL)
Via Somministrazione: intravenous
Richiede CVC:        ❌ NO
Fotosensibile:       ✅ YES (proteggere dalla luce)
Note Cliniche:       Vasopressor - Dose-dependent effects:
                     • Low dose (1-5 mcg/kg/min): renal vasodilation
                     • Medium dose (5-10 mcg/kg/min): cardiac stimulation
                     • High dose (>10 mcg/kg/min): vasoconstriction
                     Light sensitive solution.
```

### Informazioni Aggiuntive:

- **Categoria ICU:** Vasopressore di prima linea
- **Effetto principale:** Aumenta contrattilità cardiaca e pressione arteriosa
- **Monitoraggio:** PA continua, ECG, diuresi
- **Compatibilità:** Generalmente compatibile con la maggior parte dei sedativi e analgesici

---

## 🔍 ESEMPIO 3: FENTANYL

**📸 Riferimento:** Immagine 3/4, analgesico comune in ICU

### Dati Completi:

```
ID:                  fentanyl
Nome Farmaco:        Fentanyl
Principio Attivo:    Fentanyl Citrate
Categoria:           analgesic
Concentrazione:      50mcg/mL
Via Somministrazione: intravenous
Richiede CVC:        ❌ NO
Fotosensibile:       ❌ NO
Note Cliniche:       Potent opioid analgesic - 100x more potent than morphine.
                     Rapid onset (1-2 min), short duration (30-60 min).
                     Watch for respiratory depression.
```

### Compatibilità Note:

💡 **Fentanyl è generalmente COMPATIBILE (C - verde) con:**

- Vasopressori: Norepinephrine, Dopamine, Dobutamine
- Sedativi: Midazolam, Propofol
- Elettroliti: Potassium Chloride, Magnesium Sulfate
- Antibiotici comuni

---

## 📝 COME USARE QUESTI ESEMPI NEL TOOL WEB

### Step-by-Step:

1. **Apri il tool web:**

   ```bash
   cd /home/nyk-ai/projects/medicalUtility/scripts
   # Se hai accesso GUI locale:
   google-chrome drug-data-entry-tool.html
   # OPPURE se lavori da remoto:
   python3 -m http.server 8080
   # Poi apri browser locale: http://YOUR_SERVER_IP:8080/drug-data-entry-tool.html
   ```

2. **Per ogni farmaco (es. Amiodarone):**
   - **Nome Farmaco:** Copia "Amiodarone"
   - **Principio Attivo:** Copia "Amiodarone Hydrochloride"
   - **Categoria:** Seleziona "antiarrhythmic" dal dropdown
   - **Concentrazione:** Copia dalla tabella: "> 2mg/ml CVC+"
   - **✅ Spunta "Richiede CVC"** se vedi "si" o "CVC+" nella colonna
   - **✅ Spunta "Fotosensibile"** se vedi icona luce 🔒
   - **Note Cliniche:** Scrivi o copia note cliniche rilevanti
   - **Clicca "Aggiungi Farmaco"**

3. **Ripeti per tutti i ~180 farmaci** dalle 7 immagini

4. **Ogni 10-20 farmaci:** Clicca "Scarica JSON" per backup

5. **Alla fine:** Clicca "Genera Codice TypeScript" e copia in `src/data/drugs.ts`

---

## 📚 RIFERIMENTI RAPIDI DALLA TABELLA

### Colonna "VIA CENTRALE / PERIFERICA":

| Indicazione         | Significato                               | CVC Required |
| ------------------- | ----------------------------------------- | ------------ |
| **"si"** (verde)    | CVC sempre necessario                     | ✅ YES       |
| **"> Xmg/ml CVC+"** | CVC richiesto sopra quella concentrazione | ✅ YES       |
| **"CVC+"**          | CVC sempre richiesto                      | ✅ YES       |
| **Vuoto/NO**        | Può essere somministrato via periferica   | ❌ NO        |

### Icone Speciali:

| Icona   | Significato                                     | Light Sensitive |
| ------- | ----------------------------------------------- | --------------- |
| 🔒 solo | CONSERVARE AL RIPARO DALLA LUCE                 | ✅ YES          |
| 🔒 + ☀️ | CONSERVARE + SOMMINISTRARE AL RIPARO DALLA LUCE | ✅ YES          |

### Codici Compatibilità nella Matrice:

| Colore Cella        | Codice | Significato      | Azione                                     |
| ------------------- | ------ | ---------------- | ------------------------------------------ |
| 🟢 **Verde**        | C      | Compatible       | Farmaci possono essere miscelati           |
| 🟡 **Gialla**       | Y      | Y-site only      | Compatibili solo al raccordo, NON in sacca |
| 🔴 **Rossa**        | I      | Incompatible     | NON mischiare MAI (precipitazione)         |
| 🟠 **Arancione**    | !      | Conflicting data | Dati conflittuali in letteratura           |
| 🟩 **Verde chiaro** | si     | CVC required     | Richiede CVC centrale                      |
| ⚪ **Grigia/Vuota** | ''     | No data          | Nessuna informazione disponibile           |

---

## 🎯 WORKFLOW RACCOMANDATO PER LE 7 IMMAGINI

### Immagine 1 (Farmaci A-C):

```
Abciximab, Acetilcisteina, Acido Ascorbico, Acido Folico, Acido Tranexamico,
Adenosina, Albumina Umana, Alfentanil, Alprostadil, Alteplase, Amikacin,
Aminofillina, AMIODARONE ✅, Ampicillin, Ampicillin+Sulbactam, Atracurium,
Aztreonam, Bivalirudin, Bumetanide, Caffeina Citrato, Calcio Cloruro,
Calcio Gluconato, Caspofungin, Cefazolin, Cefepime, Cefotaxime, Ceftazidime,
Ceftriaxone, Cefuroxime, Ciprofloxacin, Cisatracurium, Clindamycin,
Colistimethate, Daptomycin, Dexamethasone, Dexmedetomidine
```

### Immagine 2 (Farmaci D-I):

```
Digoxin, Diltiazem, Dobutamine, DOPAMINE ✅, Doxycycline, Enalaprilat,
Epinephrine, Eptifibatide, Ertapenem, Erythromycin, Esmolol, Esomeprazole,
Famotidine, FENTANYL ✅, Fluconazole, Flumazenil, Foscarnet, Furosemide,
Gentamicin, Glycopyrrolate, Granisetron, Heparin, Hydralazine, Hydrocortisone,
Imipenem+Cilastatin, Insulin Regular, Isoproterenol
```

### Immagine 3 (Farmaci L-P):

```
Labetalol, Levofloxacin, Lidocaine, Linezolid, Lorazepam, Magnesium Sulfate,
Mannitol, Meropenem, Methotrexate, Methylprednisolone, Metoclopramide,
Metronidazole, Micafungin, Midazolam, Milrinone, Morphine, Moxifloxacin,
Naloxone, Nicardipine, Nitroglycerin, Nitroprusside, NOREPINEPHRINE,
Octreotide, Ondansetron, Oxacillin, Pantoprazole, Penicillin G, Phenobarbital,
Phenylephrine, Phenytoin, Piperacillin+Tazobactam, Potassium Chloride,
Potassium Phosphate, PROPOFOL
```

### Immagine 4-7 (Farmaci R-Z + Matrice Compatibilità):

```
Ranitidine, Remifentanil, Rocuronium, Sodium Bicarbonate, Sodium Phosphate,
Succinylcholine, Sufentanil, Tacrolimus, Theophylline, Thiamine, Tigecycline,
Tirofiban, Tobramycin, Trimethoprim+Sulfamethoxazole, Vancomycin, Vasopressin,
Vecuronium, Verapamil, Voriconazole, Zidovudine

+ MATRICE DI COMPATIBILITÀ COMPLETA (colori 🟢🟡🔴🟠)
```

---

## 💡 TIPS PRATICI

### 1. **Priorità di Inserimento:**

Inizia con i farmaci più comuni in ICU:

- **Vasopressori:** Norepinephrine, Dopamine, Dobutamine, Epinephrine
- **Sedativi:** Midazolam, Propofol, Fentanyl, Remifentanil
- **Antibiotici comuni:** Vancomycin, Piperacillin+Tazobactam, Meropenem
- **Elettroliti:** Potassium Chloride, Magnesium Sulfate, Calcium

### 2. **Categorie Disponibili nel Tool:**

```
- analgesic (Fentanyl, Morphine, Remifentanil)
- sedative (Midazolam, Propofol, Lorazepam)
- antibiotic (Vancomycin, Meropenem, Piperacillin)
- anticoagulant (Heparin, Enoxaparin)
- vasopressor (Norepinephrine, Dopamine, Epinephrine)
- antiarrhythmic (Amiodarone, Lidocaine, Diltiazem)
- diuretic (Furosemide, Mannitol)
- electrolyte (Potassium, Calcium, Magnesium)
- antihypertensive (Enalaprilat, Hydralazine, Nicardipine)
- bronchodilator (Aminophylline, Theophylline)
- other (farmaci non classificabili)
```

### 3. **Backup Strategy:**

```bash
# Salva backup ogni 10 farmaci:
drug_backup_001.json  # Primi 10 farmaci
drug_backup_002.json  # Farmaci 11-20
drug_backup_003.json  # Farmaci 21-30
...
drug_backup_final.json  # Tutti i 180 farmaci
```

### 4. **Verifica Qualità:**

Prima di generare il codice TypeScript finale:

- ✅ Tutti i farmaci hanno categoria assegnata
- ✅ CVC e Light flags coerenti con tabella
- ✅ Concentrazioni copiate correttamente
- ✅ Note cliniche aggiunte per farmaci critici

---

## 🚀 ALTERNATIVE PER SERVER SENZA GUI

### Opzione 1: HTTP Server Locale

```bash
cd /home/nyk-ai/projects/medicalUtility/scripts
python3 -m http.server 8080
# Apri browser sul tuo computer locale:
# http://YOUR_SERVER_IP:8080/drug-data-entry-tool.html
```

### Opzione 2: Python Interactive CLI

```bash
cd /home/nyk-ai/projects/medicalUtility/scripts
python3 extract_drug_data.py --manual
# Segui i prompt interattivi per ogni farmaco
```

### Opzione 3: Copia File su Computer Locale

```bash
# Dal tuo computer locale:
scp user@server:/home/nyk-ai/projects/medicalUtility/scripts/drug-data-entry-tool.html ~/Desktop/
# Apri ~/Desktop/drug-data-entry-tool.html con browser locale
```

### Opzione 4: Excel Template (se preferisci spreadsheet)

```bash
cd /home/nyk-ai/projects/medicalUtility/scripts
python3 generate_excel_template.py --output san_gerardo_drugs.xlsx
# Scarica file Excel e compila su computer locale
```

---

## 📞 AIUTO RAPIDO

**Domanda:** Come so se un farmaco richiede CVC?  
**Risposta:** Guarda colonna "VIA CENTRALE/PERIFERICA" - se vedi "si", "CVC+" o "> Xmg/ml CVC+" → spunta checkbox CVC

**Domanda:** Come riconosco farmaci fotosensibili?  
**Risposta:** Cerca icona lucchetto 🔒 o scritte "LUCE" nella colonna note

**Domanda:** Dove trovo i codici di compatibilità?  
**Risposta:** Nelle celle colorate della matrice - Verde=C, Giallo=Y, Rosso=I, Arancione=!, Grigio=no data

**Domanda:** Quanto tempo ci vuole per 180 farmaci?  
**Risposta:** ~2-4 ore con il tool web (1-2 minuti per farmaco) + ~1 ora per matrice compatibilità

**Domanda:** Posso salvare e continuare dopo?  
**Risposta:** SÌ! Clicca "Scarica JSON" per backup, poi "Load JSON" per riprendere

---

## ✅ CHECKLIST FINALE

Prima di integrare nel codice:

- [ ] Tutti i 180 farmaci inseriti
- [ ] Categorie assegnate correttamente
- [ ] CVC/Light flags verificati
- [ ] Concentrazioni copiate dalla tabella
- [ ] Note cliniche aggiunte per farmaci critici
- [ ] Matrice compatibilità completata per farmaci comuni (almeno top 50)
- [ ] JSON backup salvato
- [ ] Codice TypeScript generato
- [ ] Test preliminare su alcuni farmaci nell'applicazione

---

**🎯 PROSSIMO STEP:** Scegli il metodo (HTTP server locale + browser / Python CLI / Excel) e inizia con i primi 10 farmaci dall'Immagine 1!
