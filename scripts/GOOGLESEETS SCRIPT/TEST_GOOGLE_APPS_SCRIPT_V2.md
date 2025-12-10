# 🧪 Test Google Apps Script v2.0 - Nuove Colonne

## ✅ Modifiche Apportate

### 1. Nuove Colonne Speciali Supportate

```javascript
const SPECIAL_COLUMNS = [
  'PRINCIPIO ATTIVO',
  'FOTOSENSIBILE',
  'NECESSITÀ DI CVC', // ← NUOVO (sostituisce VIA CENTRALE/PERIFERICA)
  'NOTES/CONCENTRAZIONI', // ← NUOVO
  'NOTO RISCHIO FLEBITE', // ← NUOVO
];
```

### 2. Funzione `isSpecialColumn()` Aggiornata

- Pattern regex per matching flessibile
- Riconosce varianti maiuscole/minuscole
- Gestisce nomi simili (es. "NECESSITÀ CVC", "Necessità di CVC")

### 3. Inserimento Alfabetico Farmaci - FIX CRITICO

**PROBLEMA RISOLTO:**

- ✅ Backup COMPLETO compatibilità prima di inserire riga/colonna
- ✅ Ripristino GARANTITO dopo inserimento
- ✅ Performance ottimizzate (batch read/write)
- ✅ Logging dettagliato per debug

**ALGORITMO:**

1. Backup: Legge TUTTA la matrice compatibilità in memoria (batch)
2. Calcola posizione alfabetica del nuovo farmaco
3. Inserisce riga + colonna nella posizione corretta
4. Pulisce celle (rimuove formattazione copiata)
5. Ripristina TUTTE le compatibilità nelle nuove posizioni
6. Riempie diagonali con "null" grigio

---

## 🧪 Test Plan

### Test 1: Verifica Colonne Speciali

**Azioni:**

1. Apri Google Sheets
2. Estensioni → Apps Script
3. Copia e incolla `google-sheets-interface-v2.gs`
4. Salva (Ctrl+S)
5. Chiudi Apps Script

**Verifica:**

- Menu "💊 Compatibilità Farmaci" appare in Google Sheets
- Click "📊 Genera Matrice"
- Farmaci devono iniziare DOPO "NOTO RISCHIO FLEBITE"

**Risultato Atteso:**

```
| PRINCIPIO ATTIVO | FOTOSENSIBILE | NECESSITÀ DI CVC | NOTES/CONCENTRAZIONI | NOTO RISCHIO FLEBITE | FARMACO1 | FARMACO2 | ...
|------------------|---------------|------------------|---------------------|----------------------|----------|----------|----
| FARMACO1         |               |                  |                     |                      | null     | C        | ...
| FARMACO2         |               |                  |                     |                      | C        | null     | ...
```

---

### Test 2: Inserimento Nuovo Farmaco (CRITICO)

**Setup Iniziale:**

- Tabella con 3 farmaci: AMOXICILLINA, CEFTRIAXONE, VANCOMICINA
- Compatibilità già impostate:
  - AMOXICILLINA ↔ CEFTRIAXONE = C
  - AMOXICILLINA ↔ VANCOMICINA = I
  - CEFTRIAXONE ↔ VANCOMICINA = Y

**Azioni:**

1. Menu → ➕ Aggiungi Nuovo Farmaco
2. Inserisci: "DOPAMINA" (alfabeticamente tra CEFTRIAXONE e VANCOMICINA)
3. Click "Aggiungi"

**Risultato Atteso:**

```
ORDINE DOPO INSERIMENTO:
1. AMOXICILLINA
2. CEFTRIAXONE
3. DOPAMINA      ← NUOVO (inserito in posizione 3)
4. VANCOMICINA

COMPATIBILITÀ PRESERVATE:
✅ AMOXICILLINA ↔ CEFTRIAXONE = C (era C prima, rimane C)
✅ AMOXICILLINA ↔ VANCOMICINA = I (era I prima, rimane I)
✅ CEFTRIAXONE ↔ VANCOMICINA = Y (era Y prima, rimane Y)

NUOVE RIGHE/COLONNE:
- DOPAMINA ↔ DOPAMINA = null (diagonale grigia)
- DOPAMINA ↔ altri farmaci = vuoto (da compilare)
```

**Come Verificare:**

```javascript
// Dopo inserimento, apri Apps Script Console (View → Logs)
// Dovresti vedere:
✅ Backup completato: 3 farmaci, 6 compatibilità
📍 Nuovo farmaco "DOPAMINA" inserito in posizione 3/4
   → Riga: 4, Colonna: 7 (esempio)
🔄 Mappe aggiornate: 4 righe, 4 colonne
✅ Ripristinate 6 compatibilità
✅ Farmaco "DOPAMINA" aggiunto in posizione 3/4. Compatibilità preservate: 6. Tempo: 1.23s
```

---

### Test 3: Dialog NECESSITÀ DI CVC

**Azioni:**

1. Menu → 💉 Gestione NECESSITÀ DI CVC
2. Cerca "DOPAMINA"
3. Click "SÌ" (richiede CVC)
4. Cerca "AMOXICILLINA"
5. Click "NO" (periferica)
6. Click "Salva Tutto"

**Risultato Atteso:**

- Colonna "NECESSITÀ DI CVC" aggiornata:
  - DOPAMINA: "SÌ" (sfondo rosso)
  - AMOXICILLINA: "NO" (sfondo verde)

---

### Test 4: Bulk Insert Compatibilità

**Azioni:**

1. Menu → ⚡ Inserimento RAPIDO (Bulk)
2. Seleziona "DOPAMINA"
3. Imposta compatibilità:
   - AMOXICILLINA: C
   - CEFTRIAXONE: Y
   - VANCOMICINA: I
4. Click "Salva Tutte le Compatibilità"

**Risultato Atteso:**

- 3 compatibilità salvate
- Simmetria automatica:
  - DOPAMINA → AMOXICILLINA = C
  - AMOXICILLINA → DOPAMINA = C (simmetrico)
  - etc.

---

### Test 5: Validazione Finale

**Azioni:**

1. Menu → ✅ Valida Tabella

**Risultato Atteso:**

```
📊 VALIDAZIONE TABELLA

Farmaci: 4
Compatibilità totali: 6 (4 farmaci → 4×3÷2 = 6 coppie)
Compatibilità compilate: 6 (100%)
Compatibilità mancanti: 0

✅ Tabella valida!
```

---

## 🐛 Troubleshooting

### Errore: "Colonna NECESSITÀ DI CVC non trovata"

**Causa:** Header colonna non esattamente "NECESSITÀ DI CVC"

**Fix:** Rinomina colonna in Google Sheets esattamente:

```
NECESSITÀ DI CVC
```

---

### Errore: "Farmaci iniziano dalla colonna sbagliata"

**Causa:** `getFirstDrugColumn()` non trova colonne speciali

**Debug:**

```javascript
// Apri Apps Script → Tools → Script editor
// Aggiungi funzione debug:
function debugColumns() {
  const firstCol = getFirstDrugColumn();
  Logger.log('Prima colonna farmaci: ' + firstCol);
  Logger.log('Lettera colonna: ' + getColumnLetter(firstCol));
}
```

---

### Errore: "Compatibilità perse dopo inserimento"

**Causa:** Backup non funziona correttamente

**Fix:** Controlla Log (View → Logs):

```
✅ Backup completato: X farmaci, Y compatibilità  ← Deve essere > 0
✅ Ripristinate Z compatibilità  ← Deve essere = Y
```

Se Z < Y, c'è un problema nel ripristino.

---

## 📋 Checklist Pre-Deploy

Prima di usare lo script in produzione:

- [ ] Header colonne esatte: "PRINCIPIO ATTIVO", "FOTOSENSIBILE", "NECESSITÀ DI CVC", "NOTES/CONCENTRAZIONI", "NOTO RISCHIO FLEBITE"
- [ ] Farmaci in colonna A (ordine alfabetico)
- [ ] Matrice compatibilità generata (menu → 📊 Genera Matrice)
- [ ] Test inserimento farmaco con 3+ farmaci esistenti
- [ ] Verifica compatibilità preservate dopo inserimento
- [ ] Test dialog NECESSITÀ DI CVC funziona
- [ ] Test bulk insert funziona
- [ ] Validazione tabella senza errori

---

## ✅ Ready to Deploy!

Se tutti i test passano, lo script è pronto per:

1. **Export CSV**: Menu → File → Download → CSV
2. **Conversione JSON**: `python scripts/convert_sheet_to_json.py`
3. **Deploy database**: `public/data/drugs/`
