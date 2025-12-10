# 🆕 Guida Nuove Funzioni Script v2.1

## 📋 Cosa è stato aggiunto

### 1. 🔄 **Riordino Alfabetico Automatico**
Riordina tutti i farmaci alfabeticamente **preservando tutte le compatibilità e metadati**.

### 2. 💾 **Sistema Backup Automatico**
Crea backup automatici prima di ogni modifica importante con timestamp.

---

## 🔄 RIORDINO ALFABETICO AUTOMATICO

### Quando usarlo
- Hai aggiunto farmaci manualmente fuori ordine
- Hai importato dati non ordinati
- Vuoi verificare l'ordine alfabetico corrente

### Come funziona

1. **Menu → 🔄 Riordina Alfabeticamente**

2. **Controllo automatico:**
   - ✅ Se già ordinato → messaggio di conferma, nessuna azione
   - ❌ Se NON ordinato → procede con riordino

3. **Operazioni eseguite:**
   ```
   ✅ Crea backup automatico con timestamp
   ✅ Riordina colonna A (PRINCIPIO ATTIVO)
   ✅ Riordina riga 1 (header farmaci)
   ✅ Ricostruisce matrice compatibilità
   ✅ Preserva TUTTI i metadati (CVC, fotosensibile, ecc.)
   ✅ Riempie diagonali con "null" grigio
   ✅ Pulisce backup vecchi (mantiene ultimi 10)
   ```

4. **Risultato:**
   ```
   ✅ Riordino Completato
   
   📊 Farmaci riordinati: 103
   💾 Compatibilità preservate: 5.253
   📋 Metadati preservati: 103
   ⏱️ Tempo esecuzione: 3.2s
   
   💾 Backup salvato: "Backup_2024-12-07_14-30-15_Riordino Alfabetico"
   ```

### ⚠️ IMPORTANTE
- **NON usare** "Data → Sort range A→Z" manualmente (sposta solo colonna A, rompe compatibilità!)
- **USA SEMPRE** il menu "🔄 Riordina Alfabeticamente"
- Il backup automatico ti protegge da errori

---

## 💾 SISTEMA BACKUP AUTOMATICO

### Backup Automatico

**Quando viene creato:**
- ✅ Quando aggiungi un nuovo farmaco (`addNewDrugInAlphabeticalOrder()`)
- ✅ Quando riordini alfabeticamente (`sortDrugsAlphabetically()`)

**Formato nome:**
```
Backup_YYYY-MM-DD_HH-mm-ss_NomeOperazione

Esempi:
Backup_2024-12-07_14-30-15_Aggiungi Farmaco
Backup_2024-12-07_15-45-20_Riordino Alfabetico
```

**Caratteristiche:**
- 🔒 **Protetto** (sola lettura con warning)
- 📝 **Nota in cella A1** con dettagli operazione
- 📂 **Spostato alla fine** dei fogli
- 🗑️ **Auto-pulizia**: mantiene solo gli ultimi 10 backup

### Backup Manuale

**Menu → 💾 Crea Backup Manuale**

Utile per:
- Prima di operazioni rischiose
- Prima di export/import massivi
- Checkpoint di lavoro importanti

**Risultato:**
```
Backup_2024-12-07_16-00-00_Backup Manuale
```

---

## 📝 CHANGELOG v2.1

### Nuove Funzioni

1. **`sortDrugsAlphabetically()`**
   - Riordino alfabetico completo
   - Preserva compatibilità e metadati
   - Backup automatico integrato

2. **`createAutoBackup(operationType)`**
   - Backup automatico con timestamp
   - Protezione foglio
   - Nota con dettagli operazione

3. **`createManualBackup()`**
   - Backup manuale da menu
   - Stesso sistema di auto-backup

4. **`cleanOldBackups(keepLast)`**
   - Pulizia automatica backup vecchi
   - Default: mantiene ultimi 10

### Menu Aggiornato

```
💊 Compatibilità Farmaci
  ├── ⚡ Inserimento RAPIDO (Bulk)
  ├── 📝 Inserisci Compatibilità Singola
  ├── ───────────────────────────
  ├── ➕ Aggiungi Nuovo Farmaco  [CON BACKUP AUTO]
  ├── 💉 Gestisci NECESSITÀ DI CVC
  ├── ───────────────────────────
  ├── 🔄 Riordina Alfabeticamente  [NUOVO!]
  ├── ✅ Valida Tabella
  ├── 📊 Genera Matrice
  ├── 📥 Esporta JSON
  ├── ───────────────────────────
  ├── 💾 Crea Backup Manuale  [NUOVO!]
  └── 📖 Legenda Codici
```

---

## 🎯 WORKFLOW CONSIGLIATO

### 1. Setup Iniziale
```
1. Inserisci farmaci in colonna A (non importa l'ordine)
2. Inserisci metadati (CVC, fotosensibile, ecc.)
3. Menu → 📊 Genera Matrice
4. Menu → 🔄 Riordina Alfabeticamente
```

### 2. Inserimento Compatibilità
```
1. Menu → ⚡ Inserimento RAPIDO (Bulk)
   - Seleziona farmaco
   - Compila tutte le compatibilità in una volta
   
2. Menu → 📝 Inserisci Compatibilità Singola
   - Per singole compatibilità o correzioni
```

### 3. Aggiunta Nuovi Farmaci
```
1. Menu → ➕ Aggiungi Nuovo Farmaco
   - Inserisce in ordine alfabetico automaticamente
   - Preserva tutte le compatibilità
   - Crea backup automatico
   
2. (Opzionale) Menu → 💉 Gestisci NECESSITÀ DI CVC
   - Imposta metadati per nuovo farmaco
```

### 4. Manutenzione
```
1. Menu → ✅ Valida Tabella
   - Controlla simmetria
   - Verifica completamento
   
2. Menu → 💾 Crea Backup Manuale
   - Prima di grandi modifiche
   - Checkpoint importanti
   
3. Eliminazione backup vecchi:
   - Automatica (mantiene ultimi 10)
   - Manuale: elimina fogli "Backup_..." non necessari
```

### 5. Export Finale
```
1. Menu → ✅ Valida Tabella  (verifica errori)
2. Menu → 💾 Crea Backup Manuale
3. File → Download → CSV (.csv)
4. Salva come: drugs.csv
5. Converti in JSON (converter Python)
```

---

## 🛡️ PROTEZIONI

### Backup Automatico
- ✅ Creato **PRIMA** di ogni modifica
- ✅ Protetto da modifiche accidentali
- ✅ Nota con dettagli operazione
- ✅ Auto-pulizia (mantiene ultimi 10)

### Riordino Alfabetico
- ✅ Controlla se già ordinato (evita operazioni inutili)
- ✅ Chiede conferma utente
- ✅ Crea backup automatico
- ✅ Preserva TUTTE le compatibilità
- ✅ Preserva TUTTI i metadati
- ✅ Riempie diagonali

### Validazione
- ✅ Controlla simmetria (drug1↔drug2 === drug2↔drug1)
- ✅ Verifica valori validi (C/Y/I/!)
- ✅ Calcola completamento %

---

## 🔧 RISOLUZIONE PROBLEMI

### "La lista non è in ordine alfabetico"

**Soluzione:**
```
Menu → 🔄 Riordina Alfabeticamente
```

**NON usare:**
```
❌ Data → Sort range A→Z  (rompe compatibilità!)
```

---

### "Ho perso compatibilità dopo riordino manuale"

**Soluzione:**
```
1. Menu → 💊 Compatibilità Farmaci
2. Cerca foglio backup più recente: "Backup_YYYY-MM-DD_HH-mm-ss_..."
3. Copia dati dal backup
4. Oppure: elimina foglio corrente e rinomina backup
```

---

### "Troppi fogli backup"

**Soluzione automatica:**
```
Lo script mantiene automaticamente solo gli ultimi 10 backup.
I più vecchi vengono eliminati automaticamente.
```

**Soluzione manuale:**
```
1. Identifica backup da mantenere (ultimi 3-5)
2. Elimina manualmente fogli "Backup_..." vecchi
3. Tasto destro sul foglio → Elimina
```

---

### "Errore durante riordino"

**Cosa succede:**
```
✅ Backup SEMPRE creato PRIMA di iniziare
✅ Foglio originale NON modificato se c'è errore
✅ Messaggio di errore dettagliato
```

**Come recuperare:**
```
1. Identifica backup più recente
2. Confronta con foglio corrente
3. Ripristina dal backup se necessario
```

---

## 📊 STATISTICHE PERFORMANCE

### Riordino Alfabetico (103 farmaci)
```
⏱️ Tempo medio: 3-5 secondi
💾 Compatibilità preservate: ~5.250
📋 Metadati preservati: 103 righe
🔒 Backup creato: 1 foglio protetto
```

### Backup Automatico
```
⏱️ Tempo creazione: 1-2 secondi
📦 Dimensione: uguale al foglio originale
🔒 Protezione: sola lettura con warning
```

---

## 🎓 BEST PRACTICES

1. **Prima di grandi modifiche:**
   ```
   Menu → 💾 Crea Backup Manuale
   ```

2. **Dopo import dati:**
   ```
   Menu → 🔄 Riordina Alfabeticamente
   Menu → ✅ Valida Tabella
   ```

3. **Prima di export CSV:**
   ```
   Menu → ✅ Valida Tabella  (verifica errori)
   Menu → 🔄 Riordina Alfabeticamente  (ordina)
   Menu → 💾 Crea Backup Manuale
   File → Download → CSV
   ```

4. **Manutenzione settimanale:**
   ```
   1. Menu → ✅ Valida Tabella
   2. Elimina backup vecchi (oltre 1 mese)
   3. Menu → 💾 Crea Backup Manuale  (checkpoint)
   ```

---

## 📞 SUPPORTO

### Log Operazioni
Tutte le operazioni sono loggate in **Apps Script**:
```
1. Estensioni → Apps Script
2. Esecuzioni (menu sinistra)
3. Visualizza log operazione
```

### Errori Comuni
- ❌ "Matrice non trovata" → Menu → 📊 Genera Matrice
- ❌ "Farmaco duplicato" → Verifica colonna A
- ❌ "Backup fallito" → Controlla permessi foglio

---

## 🔗 RIFERIMENTI

- **Script completo:** `google-sheets-interface-v2.gs`
- **Versione:** 2.1.0
- **Autore:** Vasile Chifeac
- **Data:** 7 Dicembre 2024

---

## ✅ CHECKLIST PRE-EXPORT

Prima di esportare CSV per conversione JSON:

- [ ] Menu → ✅ Valida Tabella (nessun errore)
- [ ] Menu → 🔄 Riordina Alfabeticamente (ordine corretto)
- [ ] Tutti i metadati completati (CVC, fotosensibile, ecc.)
- [ ] Diagonali riempite con "null" grigio
- [ ] Menu → 💾 Crea Backup Manuale
- [ ] File → Download → CSV (.csv)
- [ ] Salva come: `drugs.csv`
- [ ] Converti con Python: `python scripts/convert_sheet_to_json.py`
