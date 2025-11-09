# ⚡ GUIDA INSERIMENTO RAPIDO BULK MODE

## 🎯 Nuove Funzionalità

### ✨ AGGIORNAMENTI v2.0

1. **⚡ Modalità BULK (Inserimento Rapido)**
   - Seleziona 1 farmaco
   - Imposta TUTTE le sue compatibilità in una volta
   - Salva tutto con 1 click
   - **10x più veloce!**

2. **🔍 Ricerca Farmaci**
   - Input searchable invece di dropdown
   - Digita per filtrare
   - Trova farmaco velocemente

3. **💉 Gestione Via Somministrazione**
   - Nuovo dialog dedicato
   - Imposta Centrale/Periferica/Entrambe
   - Salvataggio bulk di tutte le vie

---

## 📋 MENU AGGIORNATO

```
💊 Compatibilità Farmaci
├── ⚡ Inserimento RAPIDO (Bulk)        ← NUOVO! CONSIGLIATO
├── 📝 Inserisci Compatibilità Singola   (modalità vecchia)
├──────────────────────────────────
├── 💉 Gestisci Via Somministrazione    ← NUOVO!
├──────────────────────────────────
├── ✅ Valida Tabella
├── 📊 Genera Matrice
├── 📥 Esporta JSON
├── 🔄 Importa da CSV
├──────────────────────────────────
└── 📖 Legenda Codici
```

---

## ⚡ MODALITÀ BULK (CONSIGLIATO)

### Come Funziona

```
Menu: 💊 Compatibilità Farmaci → ⚡ Inserimento RAPIDO (Bulk)
```

### Interfaccia

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌────────────────┐   ┌────────────────────────────────────┐  │
│  │ SINISTRA       │   │ DESTRA                             │  │
│  │                │   │                                    │  │
│  │ 1. Seleziona   │   │ 2. Imposta Compatibilità           │  │
│  │    Farmaco     │   │                                    │  │
│  │                │   │    Farmaco: ACETILCISTEINA         │  │
│  │ 🔍 Cerca...    │   │    Compatibilità: 23 / 156         │  │
│  │ ┌────────────┐ │   │    [████░░░░░░] 15%                │  │
│  │ │ ABICIXIMAB │ │   │                                    │  │
│  │ │ACETILCISTEINA│←─┼─→│ ABICIXIMAB      [C][Y][I][-]    │  │
│  │ │ ACICLOVIR  │ │   │ ACICLOVIR       [C][Y][I][-]    │  │
│  │ │ ACIDO ASORB│ │   │ ACIDO ASCORB... [C][Y][I][-]    │  │
│  │ │ ...        │ │   │ ...                               │  │
│  │ └────────────┘ │   │                                    │  │
│  │                │   │ [💾 Salva Tutte] [❌ Annulla]      │  │
│  └────────────────┘   └────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### STEP-BY-STEP

#### STEP 1: Apri Modalità Bulk

```
1. Google Sheets aperto
2. Menu: 💊 Compatibilità Farmaci
3. Click: ⚡ Inserimento RAPIDO (Bulk)
4. Dialog si apre (1200x700px)
```

---

#### STEP 2: Seleziona Farmaco Base

```
PANNELLO SINISTRO:

1. Digita nel box ricerca: "acet"

   🔍 [acet_____________]

   Risultati filtrati:
   ┌────────────────┐
   │ ACETILCISTEINA │ ← Click qui
   └────────────────┘

2. Click sul farmaco

   → Diventa BLU (selezionato)
   → Pannello destro si popola automaticamente
```

---

#### STEP 3: Imposta Compatibilità

```
PANNELLO DESTRO:

Farmaco selezionato: ACETILCISTEINA
Compatibilità: 0 / 156
[░░░░░░░░░░] 0%

ABICIXIMAB          [C] [Y] [I] [-]  ← Click sul pulsante
ACICLOVIR           [C] [Y] [I] [-]
ACIDO ASCORBICO     [C] [Y] [I] [-]
ACIDO ETACRINICO    [C] [Y] [I] [-]
ACIDO FOLICO        [C] [Y] [I] [-]
...

Legenda:
✅ C = Compatibile
⚠️ Y = Y-site
❌ I = Incompatibile
❓ - = Nessun dato
```

---

#### STEP 4: Riempi Velocemente

```
Esempio: ACETILCISTEINA

ABICIXIMAB          [C] [Y] [I] [-]  ← Click [I] → ROSSO
ACICLOVIR           [C] [Y] [I] [-]  ← Click [C] → VERDE
ACIDO ASCORBICO     [C] [Y] [I] [-]  ← Click [Y] → GIALLO
ACIDO ETACRINICO    [C] [Y] [I] [-]  ← Click [I] → ROSSO
ACIDO FOLICO        [C] [Y] [I] [-]  ← Click [C] → VERDE
...

Progresso:
Compatibilità: 5 / 156
[██░░░░░░░░] 3%
```

---

#### STEP 5: Salva Tutto

```
Dopo aver impostato tutte le compatibilità:

[💾 Salva Tutte le Compatibilità]  ← Click
[❌ Annulla]

→ Salvataggio in corso...
→ ✅ Compatibilità salvate per ACETILCISTEINA (156 compatibilità salvate)
→ Finestra si resetta
→ Pronto per prossimo farmaco!
```

---

## 🔍 RICERCA FARMACI

### Input Searchable

**Prima (v1.0):**

```
Farmaco 1: [Dropdown con 200 farmaci] ← Difficile trovare
```

**Ora (v2.0):**

```
🔍 [Cerca farmaco..._______________]

Digita: "amik"

Risultati filtrati:
┌─────────────────────┐
│ AMIKACINA SOLFATO   │
└─────────────────────┘

Click → Selezionato!
```

---

## 💉 GESTIONE VIA SOMMINISTRAZIONE

### Nuovo Dialog

```
Menu: 💊 Compatibilità Farmaci → 💉 Gestisci Via Somministrazione
```

### Interfaccia

```
┌────────────────────────────────────────────┐
│ 💉 Gestione Via Somministrazione           │
├────────────────────────────────────────────┤
│                                            │
│ 🔍 [Cerca farmaco...____________]          │
│                                            │
│ ABICIXIMAB       [Centrale][Periferica]   │
│                  [Entrambe][-]             │
│                                            │
│ ACETILCISTEINA   [Centrale][Periferica]   │
│                  [Entrambe][-]             │
│                                            │
│ ACICLOVIR        [Centrale][Periferica]   │
│                  [Entrambe][-]             │
│                                            │
│ ...                                        │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ 📌 Legenda:                            │ │
│ │ C = Solo Centrale                      │ │
│ │ P = Solo Periferica                    │ │
│ │ C+P = Entrambe                         │ │
│ │ - = Non specificato                    │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ [💾 Salva Tutte le Vie] [❌ Chiudi]        │
└────────────────────────────────────────────┘
```

### Come Usare

```
1. Click su pulsante per ogni farmaco

   ABICIXIMAB [Centrale][Periferica][Entrambe][-]
              └─Click─┘

   → Pulsante diventa BLU
   → Valore salvato in memoria

2. Dopo aver impostato tutti:

   [💾 Salva Tutte le Vie] ← Click

   → ✅ Vie somministrazione salvate (156 vie salvate)

3. Dati salvati in colonna "VIA CENTRALE / PERIFERICA"
```

---

## 📊 CONFRONTO VELOCITÀ

### Modalità Singola (v1.0)

```
Tempo per 1 farmaco con 156 compatibilità:

1 compatibilità = 20 secondi (select, select, click, salva)
156 compatibilità × 20 sec = 3120 sec = 52 MINUTI ❌
```

---

### Modalità BULK (v2.0)

```
Tempo per 1 farmaco con 156 compatibilità:

Setup = 10 sec (cerca, seleziona farmaco)
Click compatibilità = 156 × 2 sec = 312 sec
Salva = 5 sec

TOTALE = 327 sec = 5.5 MINUTI ✅

RISPARMIO: 52 min → 5.5 min = 10x PIÙ VELOCE! 🚀
```

---

## 🎯 WORKFLOW CONSIGLIATO

### Per Completare Tabella Completa

```
STEP 1: Setup Iniziale (5 min)
✅ Installa Google Apps Script aggiornato
✅ Genera matrice (se non esiste)
✅ Importa farmaci nella colonna A

STEP 2: Imposta Vie Somministrazione (10 min)
✅ Menu → 💉 Gestisci Via Somministrazione
✅ Per ogni farmaco: Centrale/Periferica/Entrambe
✅ Salva tutte le vie

STEP 3: Inserimento Compatibilità BULK (3-5 ore)
✅ Menu → ⚡ Inserimento RAPIDO (Bulk)

Per ogni farmaco (156 farmaci totali):
1. Cerca e seleziona farmaco (10 sec)
2. Imposta compatibilità (156 click × 2 sec = 5 min)
3. Salva (5 sec)

Tempo per farmaco: ~6 min
Tempo totale: 156 farmaci × 6 min = 936 min = 15.6 ore

DISTRIBUITO IN:
- Giorno 1: 30 farmaci (3 ore)
- Giorno 2: 30 farmaci (3 ore)
- Giorno 3: 30 farmaci (3 ore)
- Giorno 4: 30 farmaci (3 ore)
- Giorno 5: 36 farmaci (3.6 ore)

STEP 4: Validazione (30 min)
✅ Menu → ✅ Valida Tabella
✅ Correggi eventuali errori

STEP 5: Export (5 min)
✅ Menu → 📥 Esporta JSON
✅ Copia JSON in src/data/drugs.ts
```

---

## 💡 SUGGERIMENTI

### 1. Ordina per Priorità

```
ALTA PRIORITÀ (fai prima):
✅ Farmaci vasoattivi (Dopamine, Norepinephrine)
✅ Sedativi ICU (Midazolam, Propofol, Fentanyl)
✅ Antibiotici comuni (Amikacin, Vancomycin)
✅ Analgesici (Morphine, Fentanyl)

Motivo: Farmaci più usati in terapia intensiva
```

---

### 2. Usa Riferimenti Esterni

```
1. Apri sito nurse24.it in tab separata:
   https://www.nurse24.it/infermiere/utility/app-farmaci.html

2. Per ogni farmaco:
   - Cerca su sito
   - Confronta compatibilità
   - Inserisci in Google Sheets bulk mode

3. Doppio check per incompatibilità (I):
   - Verifica su almeno 2 fonti
   - Aggiungi note se dubbio
```

---

### 3. Salva Spesso

```
Non aspettare di compilare tutto!

Ogni 10 farmaci:
✅ Salva le compatibilità
✅ Valida tabella (check errori)
✅ Backup (File → Crea copia)

Motivo: Evita perdita dati
```

---

### 4. Pattern Recognition

```
Molti farmaci hanno pattern simili:

ANTIBIOTICI:
- Generalmente compatibili tra loro
- Incompatibili con soluzioni lipidiche
- Y-site con sedativi

SEDATIVI:
- Generalmente compatibili con analgesici
- Incompatibili con antibiotici
- Y-site con vasoattivi

→ Dopo primi 20-30 farmaci, diventa più veloce!
```

---

## 🔧 STRUTTURA FOGLIO GOOGLE

### Colonne Richieste

```
Colonna A: PRINCIPIO ATTIVO (nomi farmaci)
Colonna B: FOTOSENSIBILE (già compilata)
Colonna C: VIA CENTRALE / PERIFERICA (gestita da dialog apposito)
Colonna D+: Matrice compatibilità (farmaci in header riga 1)
```

### Esempio

```
     A                B              C                D         E         F
1  PRINCIPIO       FOTOSENSIBILE  VIA CENTRALE/  ABICIXIMAB  ACETIL... ACICLOVIR
   ATTIVO                         PERIFERICA
2  ABICIXIMAB      sì             C                           I         Y
3  ACETILCISTEINA  null           C+P             I                     C
4  ACICLOVIR       null           P               Y           C
```

---

## 📥 EXPORT FINALE

### Formato JSON

```json
{
  "ABICIXIMAB": {
    "ACETILCISTEINA": "I",
    "ACICLOVIR": "Y",
    "ACIDO ASCORBICO": "C",
    ...
  },
  "ACETILCISTEINA": {
    "ABICIXIMAB": "I",
    "ACICLOVIR": "C",
    ...
  },
  ...
}
```

### Integrazione TypeScript

```typescript
// src/data/drugs.ts

export const drugs: Drug[] = [
  {
    id: 'abiciximab',
    name: 'Abiciximab',
    category: DrugCategory.ANTIPLATELET,
    photosensitive: true,
    route: 'C', // Centrale
    compatibilityMatrix: {
      acetilcisteina: DrugCompatibility.INCOMPATIBLE, // I
      aciclovir: DrugCompatibility.Y_SITE, // Y
      acidoAscorbico: DrugCompatibility.COMPATIBLE, // C
      // ...
    },
  },
  // ...
];
```

---

## 🚀 VANTAGGI BULK MODE

### ✅ PRO

```
1. ⚡ 10x più veloce (5 min vs 52 min per farmaco)
2. 🎯 Visione completa (vedi tutti i farmaci insieme)
3. 🔍 Ricerca veloce (searchable input)
4. 📊 Progresso visivo (barra percentuale)
5. 💾 Salvataggio atomico (tutto o niente)
6. 🔄 Reset automatico (pronto per prossimo farmaco)
7. ✅ Validazione integrata (simmetria automatica)
```

---

### ⚠️ CONTRO

```
1. Richiede concentrazione (molti click)
2. Schermo grande consigliato (1200px width)
3. Dati in memoria (salva prima di chiudere)
```

---

## 📞 TROUBLESHOOTING

### Problema: Dialog troppo piccolo

```
Soluzione: Ingrandisci browser
- Risoluzione minima: 1280x720
- Consigliata: 1920x1080
```

---

### Problema: Ricerca non filtra

```
Verifica:
1. Digita almeno 2 caratteri
2. Ricerca case-insensitive (funziona)
3. Ricarica pagina (F5)
```

---

### Problema: Pulsanti non cliccabili

```
Soluzione:
1. Verifica JavaScript abilitato
2. Riapri dialog
3. Ricarica Google Sheets
```

---

### Problema: Salvataggio fallisce

```
Possibili cause:
1. Colonna "VIA CENTRALE / PERIFERICA" non trovata
   → Crea colonna con header esatto

2. Farmaco non in lista
   → Verifica farmaco in colonna A

3. Timeout (troppi dati)
   → Salva meno farmaci alla volta
```

---

## 📋 CHECKLIST COMPLETAMENTO

```
SETUP
□ Google Apps Script v2.0 installato
□ Menu aggiornato visibile
□ Colonne A, B, C presenti
□ Matrice generata

VIA SOMMINISTRAZIONE
□ Dialog testato
□ Tutte le vie impostate
□ Dati salvati in colonna C

COMPATIBILITÀ
□ Dialog bulk testato
□ Primo farmaco completato (test)
□ Farmaci prioritari completati (30+)
□ Tutti i farmaci completati (156)

VALIDAZIONE
□ Nessun errore asimmetria
□ Valori validi (solo C, Y, I)
□ Percentuale completamento 100%

EXPORT
□ JSON esportato
□ JSON integrato in TypeScript
□ App testata con nuovi dati
□ Nessun errore TypeScript
```

---

## 🎯 OBIETTIVO FINALE

Al completamento avrai:

```
✅ 156 farmaci catalogati
✅ 12,090 compatibilità (156 × 155 / 2)
✅ Vie somministrazione complete
✅ Database TypeScript pronto
✅ App Medical Utility funzionante
✅ Dati validati e simmetrici
```

---

**Tempo totale stimato:** 16-20 ore (distribuito in 5 giorni)  
**Metodo consigliato:** Bulk Mode con riferimenti nurse24.it  
**Difficoltà:** ⭐⭐☆☆☆ (Facile ma ripetitivo)  
**Velocità:** 🚀 10x più veloce della modalità singola

---

**Created by:** Vasile Chifeac  
**Version:** 2.0.0  
**Date:** 2024-11-09
