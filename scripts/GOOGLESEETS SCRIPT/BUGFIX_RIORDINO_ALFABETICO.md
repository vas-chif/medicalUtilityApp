# 🐛 BUGFIX: Riordino Alfabetico Non Funzionante

## 📋 Problema Riscontrato

### Sintomo

```
Menu → 🔄 Riordina Alfabeticamente

Risultato:
"✅ Già Ordinato
I farmaci sono già in ordine alfabetico!
Nessuna azione necessaria."
```

**Ma i farmaci NON erano ordinati!**

Esempio:

```
CEFTRIAXONE DISODICO
COMPLESSO VITAMINICO  ← FUORI ORDINE
CIANOCOBALAMINA       ← FUORI ORDINE
CICLOFOSFAMIDE        ← FUORI ORDINE
CICLOSPORINA          ← FUORI ORDINE
CIPROFLOXACINA
```

---

## 🔍 Causa del Bug

### Codice VECCHIO (con bug):

```javascript
function getDrugsList() {
  // ...
  const drugs = drugsRange
    .getValues()
    .map((row) => row[0])
    .filter((drug) => drug && drug.toString().trim() !== '');

  return [...new Set(drugs)].sort(); // ← BUG: ordina SEMPRE!
}

function sortDrugsAlphabetically() {
  const drugs = getDrugsList(); // ← Restituisce lista GIÀ ORDINATA
  const sortedDrugs = [...drugs].sort();

  // Confronta lista ordinata con... lista ordinata!
  const isAlreadySorted = drugs.every((drug, i) => drug === sortedDrugs[i]);

  // Risultato: SEMPRE true! ❌
}
```

**Problema:**

1. `getDrugsList()` **ordina sempre** la lista prima di restituirla
2. `sortDrugsAlphabetically()` confronta lista ordinata con lista ordinata
3. Risultato: pensa sempre che sia già ordinato!

---

## ✅ Soluzione Implementata

### Codice NUOVO (corretto):

```javascript
/**
 * Ottieni lista farmaci dal foglio
 * @param {boolean} preserveOrder - Se true, mantiene l'ordine originale (default: false = ordina)
 */
function getDrugsList(preserveOrder = false) {
  // ...
  const drugs = drugsRange
    .getValues()
    .map((row) => row[0])
    .filter((drug) => drug && drug.toString().trim() !== '');

  const uniqueDrugs = [...new Set(drugs)];

  // Se preserveOrder = true, restituisce ordine originale
  // Altrimenti ordina alfabeticamente
  return preserveOrder ? uniqueDrugs : uniqueDrugs.sort();
}

function sortDrugsAlphabetically() {
  // MODIFICATO: usa preserveOrder=true per ottenere ordine ORIGINALE
  const drugs = getDrugsList(true); // ← Ordine ORIGINALE (non ordinato)
  const sortedDrugs = [...drugs].sort();

  // Confronta lista originale con lista ordinata
  const isAlreadySorted = drugs.every((drug, i) => drug === sortedDrugs[i]);

  // Conta farmaci fuori ordine (per debug)
  const outOfOrder = drugs.filter((drug, i) => drug !== sortedDrugs[i]);
  Logger.log(`📊 DEBUG: Farmaci totali: ${drugs.length}, Fuori ordine: ${outOfOrder.length}`);

  // Mostra numero farmaci fuori ordine nel messaggio
  const response = ui.alert(
    '🔄 Riordino Alfabetico',
    `Trovati ${drugs.length} farmaci (${outOfOrder.length} fuori ordine).\n\n...`,
    ui.ButtonSet.YES_NO,
  );
}
```

---

## 🧪 Test del Fix

### Prima (BUG):

```
Lista originale Google Sheets:
1. CALCIO GLUCONATO
2. CASPOFUNGIN
3. CEFTRIAXONE DISODICO
4. COMPLESSO VITAMINICO  ← FUORI ORDINE
5. CIANOCOBALAMINA       ← FUORI ORDINE
6. CICLOFOSFAMIDE        ← FUORI ORDINE
7. CICLOSPORINA          ← FUORI ORDINE
8. CIPROFLOXACINA

getDrugsList() restituisce (ORDINATA):
1. CALCIO GLUCONATO
2. CASPOFUNGIN
3. CEFTRIAXONE DISODICO
4. CIANOCOBALAMINA       ← ordinata!
5. CICLOFOSFAMIDE        ← ordinata!
6. CICLOSPORINA          ← ordinata!
7. CIPROFLOXACINA
8. COMPLESSO VITAMINICO  ← ordinata!

Confronto: ORDINATA vs ORDINATA
Risultato: isAlreadySorted = true ❌
Messaggio: "✅ Già Ordinato"
```

### Dopo (FIX):

```
Lista originale Google Sheets:
1. CALCIO GLUCONATO
2. CASPOFUNGIN
3. CEFTRIAXONE DISODICO
4. COMPLESSO VITAMINICO  ← FUORI ORDINE
5. CIANOCOBALAMINA       ← FUORI ORDINE
6. CICLOFOSFAMIDE        ← FUORI ORDINE
7. CICLOSPORINA          ← FUORI ORDINE
8. CIPROFLOXACINA

getDrugsList(true) restituisce (ORIGINALE):
1. CALCIO GLUCONATO
2. CASPOFUNGIN
3. CEFTRIAXONE DISODICO
4. COMPLESSO VITAMINICO  ← mantiene ordine originale!
5. CIANOCOBALAMINA       ← mantiene ordine originale!
6. CICLOFOSFAMIDE        ← mantiene ordine originale!
7. CICLOSPORINA          ← mantiene ordine originale!
8. CIPROFLOXACINA

Confronto: ORIGINALE vs ORDINATA
Risultato: isAlreadySorted = false ✅
Farmaci fuori ordine: 5
Messaggio: "🔄 Riordino Alfabetico (5 fuori ordine)"
Backup creato ✅
Riordino eseguito ✅
```

---

## 📝 Modifiche Apportate

### File: `google-sheets-interface-v2.gs`

**Linee modificate: ~95-115, ~1855-1880**

1. **Funzione `getDrugsList()`:**
   - Aggiunto parametro `preserveOrder` (default: `false`)
   - Se `preserveOrder = true`: restituisce ordine originale
   - Se `preserveOrder = false`: restituisce ordine alfabetico (comportamento precedente)

2. **Funzione `sortDrugsAlphabetically()`:**
   - Cambiato `getDrugsList()` → `getDrugsList(true)`
   - Aggiunto conteggio farmaci fuori ordine
   - Aggiunto log debug con dettagli
   - Messaggio utente mostra numero farmaci fuori ordine

3. **Retrocompatibilità:**
   - Tutte le altre funzioni che chiamano `getDrugsList()` continuano a funzionare
   - Default `preserveOrder = false` mantiene comportamento originale

---

## 🎯 Come Usare il Fix

1. **Aggiorna lo script in Google Sheets:**

   ```
   1. Estensioni → Apps Script
   2. Seleziona tutto (Ctrl+A)
   3. Incolla nuovo codice da: google-sheets-interface-v2.gs
   4. Salva (Ctrl+S)
   5. Aggiorna Google Sheets (F5)
   ```

2. **Testa la funzione:**

   ```
   Menu → 💊 Compatibilità Farmaci → 🔄 Riordina Alfabeticamente

   Messaggio atteso (se NON ordinato):
   "🔄 Riordino Alfabetico
   Trovati 103 farmaci (18 fuori ordine).

   Questa operazione:
   • Creerà un BACKUP automatico
   • Riordinerà alfabeticamente tutti i farmaci
   • Preserverà TUTTE le compatibilità

   Vuoi procedere?"

   Clicca: SÌ

   Risultato:
   ✅ Backup creato
   ✅ Riordino eseguito
   ✅ Compatibilità preservate
   ```

3. **Verifica log (opzionale):**

   ```
   Estensioni → Apps Script → Esecuzioni

   Log atteso:
   📊 DEBUG: Farmaci totali: 103, Fuori ordine: 18
   📋 Farmaci fuori ordine: COMPLESSO VITAMINICO, CIANOCOBALAMINA, ...
   ✅ Backup creato: Backup_2024-12-07_16-30-00_Riordino Alfabetico
   ✅ Backup completato: 103 farmaci, 5253 compatibilità
   ...
   ```

---

## 🔧 Debugging

### Come verificare se il fix è stato applicato:

1. **Apri Apps Script** (Estensioni → Apps Script)

2. **Cerca la funzione `getDrugsList`:**

   ```javascript
   // VECCHIO (BUG):
   function getDrugsList() {
     // ...
     return [...new Set(drugs)].sort(); // ← Sempre .sort()!
   }

   // NUOVO (FIX):
   function getDrugsList(preserveOrder = false) {
     // ...
     return preserveOrder ? uniqueDrugs : uniqueDrugs.sort();
   }
   ```

3. **Cerca in `sortDrugsAlphabetically`:**

   ```javascript
   // VECCHIO (BUG):
   const drugs = getDrugsList();

   // NUOVO (FIX):
   const drugs = getDrugsList(true); // ← preserveOrder = true
   const outOfOrder = drugs.filter(...); // ← Conta fuori ordine
   Logger.log(`📊 DEBUG: Farmaci totali: ${drugs.length}, Fuori ordine: ${outOfOrder.length}`);
   ```

---

## 📊 Impatto

### Funzioni modificate:

- ✅ `getDrugsList(preserveOrder)` - Parametro opzionale aggiunto
- ✅ `sortDrugsAlphabetically()` - Usa `preserveOrder=true`

### Funzioni NON modificate (compatibilità):

- ✅ `getDrugColumnMap()` - Usa `getDrugsList()` (default: ordinato)
- ✅ `addNewDrugInAlphabeticalOrder()` - Usa `getDrugsList()` (default: ordinato)
- ✅ `showBulkCompatibilityDialog()` - Usa `getDrugsList()` (default: ordinato)
- ✅ `showCompatibilityDialog()` - Usa `getDrugsList()` (default: ordinato)
- ✅ `validateTable()` - Usa `getDrugsList()` (default: ordinato)
- ✅ `generateMatrix()` - Usa `getDrugsList()` (default: ordinato)

**Conclusione:** Il fix è **retrocompatibile al 100%**. Solo `sortDrugsAlphabetically()` usa il nuovo parametro.

---

## ✅ Checklist Post-Fix

Dopo aver applicato il fix:

- [ ] Script aggiornato in Google Sheets
- [ ] Pagina aggiornata (F5)
- [ ] Menu "🔄 Riordina Alfabeticamente" presente
- [ ] Test riordino: messaggio mostra "(X fuori ordine)"
- [ ] Backup automatico creato
- [ ] Farmaci riordinati correttamente
- [ ] Compatibilità preservate
- [ ] Log debug disponibile in Apps Script → Esecuzioni

---

## 🎓 Lezioni Apprese

1. **Non ordinare troppo presto:**
   - Mantenere dati originali il più a lungo possibile
   - Ordinare solo quando necessario

2. **Parametri opzionali per flessibilità:**
   - `preserveOrder = false` (default: retrocompatibile)
   - `preserveOrder = true` (quando serve ordine originale)

3. **Debug logging:**
   - `Logger.log()` per diagnostica
   - Mostra dettagli all'utente (es. "18 fuori ordine")

4. **Test con dati reali:**
   - Non assumere che i dati siano sempre ordinati
   - Testare con dati disordinati

---

## 📞 Supporto

Se il problema persiste:

1. Verifica che il codice contenga il fix (cerca `preserveOrder`)
2. Controlla log in: Estensioni → Apps Script → Esecuzioni
3. Verifica che `getDrugsList(true)` sia chiamato in `sortDrugsAlphabetically()`

---

**Versione:** 2.1.1 (Bugfix Riordino)  
**Data:** 7 Dicembre 2024  
**Autore:** Vasile Chifeac
