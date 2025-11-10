# 🎯 RIEPILOGO RAPIDO - Come Usare Nuovo Script

## ⚠️ VERSIONE AGGIORNATA: v2.1 (HOTFIX)

**IMPORTANTE:** Se hai già installato la v2.0, **AGGIORNA SUBITO** alla v2.1!

**Fix applicato:**
- ✅ Script ora legge **nomi colonne dall'header** (non posizioni fisse)
- ✅ Compatibilità salvate in **colonne CORRETTE** (D, E, F, ...) 
- ✅ Non sovrascrive più colonne B (FOTOSENSIBILE) e C (VIA CENTRALE/PERIFERICA)

**Dettagli:** Vedi [docs/HOTFIX_COLUMN_MAPPING_v2.1.md](docs/HOTFIX_COLUMN_MAPPING_v2.1.md)

---

## ⚡ 3 PASSI per Completare Tabella 10x PIÙ VELOCE

---

### PASSO 1️⃣: Installa Script Aggiornato (5 min)

```
1. Apri Google Sheets:
   https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k

2. Menu: Estensioni → Apps Script

3. CANCELLA tutto il codice vecchio

4. Apri file locale:
   /home/nyk-ai/projects/medicalUtility/scripts/google-sheets-interface.gs

5. COPIA TUTTO (Ctrl+A, Ctrl+C)

6. INCOLLA in Apps Script (Ctrl+V)

7. Salva (Ctrl+S)

8. Chiudi editor Apps Script

9. Ricarica Google Sheets (F5)

10. ✅ Menu "💊 Compatibilità Farmaci" aggiornato!
```

---

### PASSO 2️⃣: Imposta Vie Somministrazione (10 min)

```
1. Menu: 💊 Compatibilità Farmaci → 💉 Gestisci Via Somministrazione

2. Dialog si apre

3. Per ogni farmaco, click su:
   
   [Centrale]    = Solo accesso centrale
   [Periferica]  = Solo accesso periferico
   [Entrambe]    = Entrambi accessi OK
   [-]           = Non specificato

4. Usa ricerca per trovare farmaco velocemente:
   
   🔍 [amik___] → Trova "AMIKACINA"

5. Quando finito:
   
   [💾 Salva Tutte le Vie] ← Click

6. ✅ Dati salvati in colonna "VIA CENTRALE / PERIFERICA"
```

---

### PASSO 3️⃣: Inserisci Compatibilità (BULK MODE) ⚡

```
1. Menu: 💊 Compatibilità Farmaci → ⚡ Inserimento RAPIDO (Bulk)

2. Dialog GRANDE si apre (dual panel)

┌─────────────────────────────────────────────────────┐
│ SINISTRA              │  DESTRA                     │
│                       │                             │
│ 🔍 Cerca farmaco...   │  Farmaco: ACETILCISTEINA    │
│ [acet___________]     │  Compatibilità: 0 / 156     │
│                       │  [░░░░░░░░░░] 0%            │
│ ┌─────────────────┐   │                             │
│ │ ABICIXIMAB      │   │  ABICIXIMAB    [C][Y][I][-] │
│ │ ACETILCISTEINA  │◄──┤  ACICLOVIR     [C][Y][I][-] │
│ │ ACICLOVIR       │   │  ACIDO ASCORB. [C][Y][I][-] │
│ │ ...             │   │  ...                        │
│ └─────────────────┘   │                             │
│                       │  [💾 Salva Tutte]           │
└─────────────────────────────────────────────────────┘

3. STEP A: Selezione Farmaco (10 sec)
   
   a) Digita nel box ricerca (pannello sinistro): "acet"
   b) Click su "ACETILCISTEINA"
   c) → Pannello DESTRO si popola con TUTTI gli altri farmaci

4. STEP B: Imposta Compatibilità (5 min per farmaco)
   
   Per ogni farmaco elencato, click sul pulsante:
   
   ABICIXIMAB      [C][Y][I][-]  ← Click [I] (Incompatibile)
   ACICLOVIR       [C][Y][I][-]  ← Click [C] (Compatibile)
   ACIDO ASCORBICO [C][Y][I][-]  ← Click [Y] (Y-site)
   ACIDO ETACRINICO[C][Y][I][-]  ← Click [I] (Incompatibile)
   ...
   
   → Pulsante diventa COLORATO quando selezionato:
   
   [I] ROSSO    = Incompatibile (NON mescolare)
   [C] VERDE    = Compatibile (sicuro)
   [Y] GIALLO   = Y-site only
   [-] GRIGIO   = Nessun dato
   
   → Barra progresso si aggiorna:
   
   Compatibilità: 4 / 156
   [██░░░░░░░░] 3%

5. STEP C: Salva Tutto (5 sec)
   
   [💾 Salva Tutte le Compatibilità] ← Click
   
   → ✅ Compatibilità salvate per ACETILCISTEINA (156 compatibilità salvate)
   → Dialog si resetta automaticamente
   → Pronto per prossimo farmaco!

6. RIPETI per ogni farmaco:
   
   Farmaci prioritari (fai prima):
   ✅ Vasoattivi (Dopamine, Norepinephrine, ...)
   ✅ Sedativi (Midazolam, Propofol, Fentanyl)
   ✅ Antibiotici (Amikacin, Vancomycin, ...)
   ✅ Analgesici (Morphine, Fentanyl, ...)
```

---

## 🔍 CONFRONTO: Prima vs Ora

### ❌ PRIMA (Modalità Vecchia - v1.0)

```
Per 1 farmaco con 156 compatibilità:

1. Menu → Inserisci Compatibilità
2. Select farmaco 1
3. Select farmaco 2
4. Click compatibilità
5. Salva
6. Dialog si chiude
7. RIPETI 156 volte

Tempo: 156 × 20 sec = 52 MINUTI per farmaco ❌
```

---

### ✅ ORA (Modalità BULK - v2.0)

```
Per 1 farmaco con 156 compatibilità:

1. Menu → ⚡ Inserimento RAPIDO
2. Cerca e seleziona farmaco (10 sec)
3. Click compatibilità per TUTTI i 156 farmaci (5 min)
4. Salva TUTTO con 1 click (5 sec)
5. Prossimo farmaco!

Tempo: 5.5 MINUTI per farmaco ✅

RISPARMIO: 52 min → 5.5 min = 10x PIÙ VELOCE! 🚀
```

---

## 💡 SUGGERIMENTI

### 1. Usa Riferimenti Esterni

```
Apri in tab separata:
https://www.nurse24.it/infermiere/utility/app-farmaci.html

Cerca farmaco → Vedi compatibilità → Inserisci in bulk mode
```

---

### 2. Lavora per Blocchi

```
Giorno 1: Antibiotici (20 farmaci × 5.5 min = 2 ore)
Giorno 2: Vasoattivi + Sedativi (20 farmaci = 2 ore)
Giorno 3: Analgesici + Altri (20 farmaci = 2 ore)
...
```

---

### 3. Salva Spesso

```
Ogni 10 farmaci:
✅ Menu → ✅ Valida Tabella
✅ File → Crea copia (backup)
```

---

## 🎯 Legenda Compatibilità

```
✅ C = COMPATIBILE
   Sicuro mescolare in stessa siringa/sacca

⚠️ Y = Y-SITE COMPATIBLE
   Compatibile solo via Y-connector
   NON mescolare direttamente

❌ I = INCOMPATIBILE
   NON mescolare MAI
   Rischio precipitazione/inattivazione

❓ - = NESSUN DATO
   Informazione non disponibile
```

---

## 📊 Obiettivo Finale

```
✅ 156 farmaci catalogati
✅ 12,090 compatibilità (156 × 155 / 2)
✅ Vie somministrazione complete
✅ Database TypeScript pronto
✅ App Medical Utility funzionante

Tempo stimato: 14-16 ore (distribuito in 5 giorni)
```

---

## 📞 Se Qualcosa Non Funziona

### Menu non appare

```
1. Ricarica Google Sheets (F5)
2. Verifica: Estensioni → Apps Script → Codice salvato?
3. Riapri Google Sheets completamente
```

---

### Dialog troppo piccolo

```
Risoluzione minima: 1280x720
Consigliata: 1920x1080
Ingrandisci finestra browser
```

---

### Ricerca non filtra

```
Digita almeno 2 caratteri
Ricarica dialog (chiudi e riapri)
```

---

## 🚀 INIZIA ORA!

```
1. Installa script aggiornato (5 min)
2. Test con 1 farmaco (6 min)
3. Se funziona, continua! 🎉
```

---

**Version:** 2.0.0  
**Author:** Vasile Chifeac  
**Date:** 2024-11-09
