# 🌍 Guida Setup i18n per Nuovi Componenti (v2.1 - Traduzione Incrementale)

## 🎯 Obiettivo: Traduzione 100% Autonoma e Completa Bilingue

Questa guida consente di tradurre **completamente** un componente medico dall'inizio alla fine **senza intervento manuale**, includendo:

- ✅ Creazione file i18n bilinguali (IT/EN) con **traduzione completa di TUTTO il contenuto**
- ✅ Namespace injection obbligatorio
- ✅ **Traduzione INCREMENTALE sezione per sezione** (evita errori e overflow)
- ✅ **Traduzione 100% bilingue**: Italiani NON conoscono inglese, inglesi NON conoscono italiano
- ✅ **Tutto il contenuto medico tradotto**: Titoli, paragrafi, liste, tabelle, sezioni espandibili complete
- ✅ Documentazione JSDoc completa
- ✅ Rimozione emoji automatizzata
- ✅ Validazione completa (lint + TypeScript + browser)

**⚠️ REGOLA FONDAMENTALE**: L'applicazione è dedicata a utenti italiani che **NON** conoscono inglese e utenti inglesi che **NON** conoscono italiano. Pertanto **TUTTO il contenuto** deve essere tradotto completamente in entrambe le lingue, inclusi tutti i testi medici nelle sezioni espandibili.

**🔥 NUOVA REGOLA v2.1**: **Traduzione INCREMENTALE** - Traduci sezione per sezione invece di tutto in una volta per evitare errori, context overflow e semplificare il debugging.

**Versione**: 2.1  
**Ultimo aggiornamento**: 2025-12-15  
**Compatibilità**: Vue 3 + Quasar 2 + TypeScript 5.0+ + Vite

---

## 📑 Indice dei Contenuti

### 🚀 Getting Started

- [Quick Reference Commands](#-quick-reference-commands)
- [Checklist Completa](#-checklist-completa-per-aggiungere-traduzioni)

### 🔥 NUOVE FUNZIONALITÀ v2.1

- [**Traduzione INCREMENTALE** (Sezione per Sezione)](#-nuova-sezione-traduzione-incrementale-v21) ⭐ **NUOVO**

### 📋 Steps Implementazione

- [STEP 1: Creare File di Traduzione](#-step-1-creare-i-file-di-traduzione)
- [STEP 1B: Rimozione Emoji (OBBLIGATORIO)](#-step-1b-rimozione-emoji-automatizzata-obbligatorio)
- [STEP 2: Aggiornare File Index](#-step-2-aggiornare-i-file-index-️-non-sufficiente)
- [STEP 3: Injection Manuale Boot File (🚨 CRITICO)](#-step-3-injection-manuale-nel-boot-file--obbligatorio)
- [STEP 4: Usare i18n nel Componente](#-step-4-usare-i18n-nel-componente--jsdoc)
- [STEP 5: Testing e Validazione](#-step-5-testing-e-validazione-completa)

### ⚡ Automation & Patterns

- [Workflow Patterns Automatizzati](#-workflow-patterns-automatizzati)
- [Best Practices Summary](#-best-practices-summary-v21---incremental-translation)
- [Quick Decision Tree](#-quick-decision-tree)

### 📖 Risorse

- [Ulteriori Risorse](#-ulteriori-risorse)
- [Final Checklist](#-final-pre-commit-checklist)

---

## 📋 Quick Reference Commands

```bash
# Emoji removal (all Vue files)
find src/components -name "*.vue" -exec sed -i 's/[0-9]️⃣ //g' {} \;

# Verify emoji removal
grep -r "️⃣" src/components --include="*.vue" | wc -l  # Must return 0

# TypeScript validation
npx vue-tsc --noEmit

# Lint validation
npm run lint

# Dev server (browser testing)
yarn dev
```

---

## 🔥 NUOVA SEZIONE: Traduzione INCREMENTALE (v2.1)

### ⚠️ Problema: Traduzione "All-in-One" Causa Errori

**Approccio SBAGLIATO** (da evitare):

```typescript
// ❌ Tradurre TUTTO il template in una singola operazione
multi_replace_string_in_file({
  replacements: [
    // 50+ sostituzioni contemporanee:
    // - Titoli, sottotitoli, form, buttons
    // - Sezione 1 (definition) completa
    // - Sezione 2 (physiology) completa
    // - Sezione 3-9 complete
    // - Banner, risultati, interpretazioni
    // TOTALE: 200-500 righe sostituite in una volta
  ],
});
```

**Problemi**:

- ❌ **Context overflow**: File troppo grandi causano token budget overflow
- ❌ **Errori di matching**: Un errore blocca TUTTE le sostituzioni
- ❌ **Debugging impossibile**: Difficile capire quale sostituzione ha fallito
- ❌ **Rollback complesso**: Se fallisce, devi rifare tutto da capo
- ❌ **TypeScript errors a cascata**: 50+ errori simultanei difficili da debuggare

### ✅ Soluzione: Traduzione INCREMENTALE Sezione per Sezione

**Approccio CORRETTO** (raccomandato):

#### Step-by-Step Incremental Translation

```typescript
// ✅ FASE 1: Traduci SOLO titoli e form (10-15 sostituzioni)
multi_replace_string_in_file({
  explanation: 'Fase 1: Traduci titoli principali, form e bottoni',
  replacements: [
    // Titolo componente
    { oldString: '<h6>Calcolatore XYZ</h6>', newString: '<h6>{{ t("xyz.title") }}</h6>' },
    // Form labels (3-5 campi)
    { oldString: 'label="Parametro 1"', newString: ':label="t(\'xyz.form.param1\')"' },
    // Bottoni (2-3 bottoni)
    { oldString: '>Calcola</q-btn>', newString: '>{{ t("xyz.buttons.calculate") }}</q-btn>' },
  ],
});

// ⏸️ CHECKPOINT 1: Verifica TypeScript + Browser test
// get_errors() → Deve ritornare 0 errori
// Browser test → Titolo/form/bottoni tradotti correttamente

// ✅ FASE 2: Traduci risultati e interpretazioni (10-15 sostituzioni)
multi_replace_string_in_file({
  explanation: 'Fase 2: Traduci pannello risultati e interpretazioni',
  replacements: [
    // Titolo risultati
    { oldString: '<h6>Risultati</h6>', newString: '<h6>{{ t("xyz.results.title") }}</h6>' },
    // Tabella risultati
    { oldString: '<th>Valore</th>', newString: '<th>{{ t("xyz.results.table.value") }}</th>' },
    // Interpretazioni
    { oldString: 'Range Normale', newString: '{{ t("xyz.interpretation.normal") }}' },
  ],
});

// ⏸️ CHECKPOINT 2: Verifica TypeScript + Browser test
// Risultati + interpretazioni tradotte correttamente

// ✅ FASE 3: Traduci Sezione 1 (Definition) - UNA sezione alla volta
replace_string_in_file({
  explanation: 'Fase 3: Traduci SOLO Sezione 1 (Definition)',
  oldString: `
            <q-expansion-item
              icon="info"
              label="Definizione e Significato Clinico"
            >
              <q-card>
                <p>Testo definizione completo...</p>
              </q-card>
            </q-expansion-item>
  `,
  newString: `
            <q-expansion-item
              icon="info"
              :label="t('xyz.sections.definition.title')"
            >
              <q-card>
                <p>{{ t('xyz.sections.definition.content') }}</p>
              </q-card>
            </q-expansion-item>
  `,
});

// ⏸️ CHECKPOINT 3: Verifica TypeScript + Browser test
// Sezione 1 tradotta correttamente, altre sezioni ancora hardcoded (OK)

// ✅ FASE 4: Traduci Sezione 2 (Physiology)
replace_string_in_file({
  explanation: 'Fase 4: Traduci SOLO Sezione 2 (Physiology)',
  // ... simile a Fase 3
});

// ⏸️ CHECKPOINT 4: Verifica TypeScript + Browser test

// ✅ FASE 5-11: Traduci Sezioni 3-9 (una alla volta)
// Ogni sezione: replace_string_in_file + checkpoint

// ✅ FASE 12 (FINALE): Verifica completa
// - TypeScript: 0 errori
// - Lint: 0 warnings
// - Browser IT: Tutte le sezioni tradotte
// - Browser EN: Tutte le sezioni tradotte
// - No hardcoded text rimanente
```

### 📊 Confronto Approcci

| Aspetto                  | All-in-One (❌)     | Incrementale (✅)   |
| ------------------------ | ------------------- | ------------------- |
| **Operazioni totali**    | 1 mega-operazione   | 8-12 micro-operazi  |
| **Context per step**     | 200-500 righe       | 20-50 righe         |
| **Probabilità errore**   | Alta (30-50%)       | Bassa (5-10%)       |
| **Debugging**            | Molto difficile     | Facile              |
| **Rollback**             | Completo            | Parziale (solo step |
| **TypeScript errors**    | 50+ simultanei      | 0-5 per step        |
| **Tempo sviluppo**       | 4-6 ore (con retry) | 3-4 ore             |
| **Confidence**           | Bassa               | Alta                |
| **Browser test interim** | No                  | Sì (dopo ogni step) |

### 🎯 Workflow Incrementale Raccomandato

#### Per Componente PICCOLO (es. BMI, IBW, ABW, BSA)

**Fasi** (~150-300 righe template):

1. **Fase 1**: Titoli + Form + Bottoni (10 min)
2. **Fase 2**: Risultati + Tabelle (10 min)
3. **Fase 3**: Banner informativi (5 min)
4. **Fase 4**: Sezioni espandibili 1-2 (15 min)
5. **Fase 5**: Sezioni espandibili 3-4 (15 min)
6. **Verifica finale**: TypeScript + Lint + Browser (10 min)

**Totale**: ~65 min (vs 2-3 ore con approccio all-in-one)

#### Per Componente MEDIO (es. NEWS, APGAR, GCS)

**Fasi** (~400-700 righe template):

1. **Fase 1**: Titoli + Form (15 min)
2. **Fase 2**: Risultati + Interpretazioni (20 min)
3. **Fase 3**: Sezione 1 (Definition) (20 min)
4. **Fase 4**: Sezione 2 (Physiology) (20 min)
5. **Fase 5**: Sezioni 3-4 (30 min)
6. **Fase 6**: Sezioni 5-6 (30 min)
7. **Fase 7**: Sezioni 7-9 (30 min)
8. **Verifica finale**: TypeScript + Lint + Browser (15 min)

**Totale**: ~3 ore (vs 6-8 ore con approccio all-in-one + retry)

#### Per Componente GRANDE (es. SOFA, APACHE)

**Fasi** (~1000-2000 righe template):

1. **Fase 1**: Titoli + Form (20 min)
2. **Fase 2**: Risultati principali (30 min)
3. **Fase 3**: Tabelle interpretazioni (30 min)
4. **Fase 4-12**: Sezioni 1-9 (una alla volta, 30-45 min ciascuna)
5. **Verifica finale**: TypeScript + Lint + Browser (30 min)

**Totale**: ~8-10 ore (vs 15-20 ore con approccio all-in-one + debug intensivo)

### ✅ Benefici Traduzione Incrementale

1. **Context Overflow Prevention**: Ogni operazione usa <5000 token
2. **Error Isolation**: Errore in Fase 3 non impatta Fasi 1-2 (già completate)
3. **Progressive Testing**: Browser test dopo ogni fase (feedback immediato)
4. **Rollback Granulare**: Se Fase 5 fallisce, Fasi 1-4 sono salve
5. **TypeScript Clarity**: Max 5-10 errori per fase (vs 50+ all-in-one)
6. **Mental Model**: Developer capisce dove si trova nel processo
7. **Pause/Resume**: Puoi fermarti dopo Fase 3 e riprendere dopo
8. **Quality Assurance**: Ogni sezione validata individualmente

### 🚨 REGOLA OBBLIGATORIA per LLM/AI

**SE stai traducendo un componente con >300 righe template**:

- ❌ **NON** usare mai multi_replace_string_in_file con >20 sostituzioni
- ✅ **USA** approccio incrementale (max 10-15 sostituzioni per fase)
- ✅ **ESEGUI** get_errors() dopo OGNI fase
- ✅ **TESTA** browser dopo OGNI fase (almeno visualmente)
- ✅ **DOCUMENTA** quale fase stai eseguendo (usa comments)

**Esempio commento nel codice**:

```typescript
// ============================================================
// TRADUZIONE INCREMENTALE - FASE 3/12
// Sezione: Definition and Clinical Significance
// Status: In progress
// Previous phases: ✅ Titles, Form, Buttons, Results (Fasi 1-2)
// Next phases: Physiology, Evaluation, Formula, ... (Fasi 4-12)
// ============================================================
```

### 📝 Checklist Fase Incrementale

Dopo OGNI fase, verifica:

- [ ] `get_errors()` → 0 errori TypeScript
- [ ] Browser aperto → Visualizza traduzioni corrette
- [ ] Console browser → 0 errori JavaScript
- [ ] Network tab → Bundle i18n caricato correttamente
- [ ] Locale switch → IT ↔ EN funziona per sezioni tradotte finora
- [ ] Template file → Salvato correttamente (no corruption)

**Solo se TUTTI i checkbox sono ✅ → Procedi alla fase successiva**

---

## 📋 Checklist Completa per Aggiungere Traduzioni

Quando crei un nuovo componente con traduzioni, segui **TUTTI** questi passi sistematicamente.

---

## ✅ STEP 1: Creare i File di Traduzione

### 1.1 Struttura Standard per Medical Calculators

Per componenti di tipo **Medical Calculator** (APGAR, GFR, Dosage, ecc.), usa questa struttura standard:

```typescript
/**
 * @file it-IT/nomeComponente.ts
 * @description Traduzioni italiane per NomeComponente
 * @author [Nome Autore]
 * @created YYYY-MM-DD
 *
 * @references (OPZIONALE - per componenti con riferimenti scientifici)
 * - Author et al. (YYYY) "Title" Journal. PMID: XXXXXXX
 * - [Altri riferimenti bibliografici]
 */

export default {
  // 1. TITOLI PRINCIPALI
  title: 'Titolo Componente',
  subtitle: 'Sottotitolo descrittivo',

  // 2. BANNER INFORMATIVO (opzionale)
  banner: {
    title: 'Titolo Banner:',
    description: 'Descrizione breve del calcolatore/tool.',
  },

  // 3. FORM INPUT
  form: {
    sectionTitle: 'Parametri di Input',
    field1Label: 'Etichetta Campo 1',
    field1Unit: 'Unità di Misura',
    field2Label: 'Etichetta Campo 2',
    field2Unit: 'kg/m²',
    // ... altri campi
  },

  // 4. BOTTONI AZIONI
  buttons: {
    calculate: 'Calcola',
    save: 'Salva Calcolo',
    reset: 'Reset',
  },

  // 5. RISULTATI
  results: {
    title: 'Risultati',
    resultLabel: 'Valore Calcolato',
    unit: 'Unità Risultato',
  },

  // 6. INTERPRETAZIONE CLINICA
  interpretation: {
    normal: 'Range Normale',
    moderate: 'Attenzione Moderata',
    severe: 'Alert Critico',
    // ... altre interpretazioni
  },

  // 7. ALERT/WARNING (opzionale)
  alerts: {
    criticalHigh: {
      title: 'ATTENZIONE:',
      text: 'Valore critico elevato. Azione richiesta.',
    },
    warning: {
      title: 'NOTA:',
      text: 'Considerare fattori clinici aggiuntivi.',
    },
  },

  // 8. SEZIONI ESPANDIBILI (9 SEZIONI STANDARD per componenti medici complessi)
  // ⚠️ IMPORTANTE: Traduci TUTTO il contenuto medico (titoli + testo completo)
  // L'app è dedicata a italiani che non conoscono inglese e viceversa
  // Ogni sezione deve avere versione IT completa e versione EN completa
  sections: {
    // Sezione 1: Definizione
    definition: {
      title: 'Definizione e Significato Clinico',
      content:
        'Testo HTML completo tradotto con <strong>markup</strong> per definizione. Include tutti i paragrafi, liste, sottosezioni tradotte in italiano.',
      mainTitle: 'Origine Storica',
      mainText:
        'Testo principale completo tradotto: Lo score SOFA fu sviluppato nel 1996 da Jean-Louis Vincent...',
      // ✅ Traduci TUTTI i sottotitoli e testi
      keyCharacteristics: {
        title: 'Caratteristiche Chiave:',
        items: [
          'Valuta 6 principali sistemi organici indipendentemente',
          'Ogni organo valutato 0-4 punti in base alla gravità',
          // ... tutte le voci tradotte
        ],
      },
      clinicalApplications: {
        title: 'Applicazioni Cliniche',
        whenToUse: {
          title: 'Quando usare:',
          items: [
            'Triage ammissione in terapia intensiva: Score SOFA basale per stratificazione gravità',
            'Monitoraggio seriale: Score SOFA giornalieri per rilevare deterioramento/miglioramento',
            // ... tutte le voci tradotte
          ],
        },
        whenNotToUse: {
          title: 'Quando NON usare:',
          items: [
            'Pazienti non in terapia intensiva: Non validato per popolazioni di reparto/PS',
            // ... tutte le voci tradotte
          ],
        },
      },
      limitations: {
        title: 'Limitazioni:',
        items: [
          'NON cattura tutti i sistemi organici (es. GI, immunologico, endocrino)',
          'Richiede dati di laboratorio accurati (possono essere ritardati o non disponibili)',
          // ... tutte le voci tradotte
        ],
      },
    },

    // Sezione 2: Fisiologia
    physiology: {
      title: 'Fisiologia della Disfunzione Multi-Organo',
      mainTitle: 'Meccanismi Fisiopatologici',
      respiratory: {
        title: 'Respiratorio (Rapporto PaO₂/FiO₂):',
        text: 'Rapporto P/F normale: ≥400 mmHg (scambio gassoso intatto). Meccanismi di ipossiemia: squilibrio V/Q, shunt, compromissione diffusione, ipoventilazione...',
        items: [
          'Rapporto P/F normale: ≥400 mmHg (scambio gassoso intatto)',
          'Meccanismi di ipossiemia: squilibrio V/Q, shunt, compromissione diffusione',
          // ... tutte le voci tradotte
        ],
      },
      coagulation: {
        title: 'Coagulazione (Piastrine):',
        text: 'Piastrine normali: 150-400 ×10³/μL. Cause di trombocitopenia in terapia intensiva: coagulopatia consumativa (CID), soppressione midollare...',
        items: [
          'Piastrine normali: 150-400 ×10³/μL',
          'Cause trombocitopenia in ICU: coagulopatia consumativa (CID), soppressione midollo osseo',
          // ... tutte le voci tradotte
        ],
      },
      // ... TUTTE le altre sottosezioni (liver, cardiovascular, cns, renal) completamente tradotte
    },

    // Sezione 3: Valutazione
    evaluation: {
      title: 'Come si Valuta',
      timing: {
        title: 'Timing:',
        text: 'Descrizione timing.',
      },
      methods: {
        title: 'Metodi:',
        text: 'Descrizione metodi.',
      },
      // ... altre sottosezioni
    },

    // Sezione 4: Formula
    formula: {
      title: 'Formula e Calcolo',
      mainFormula: 'Formula = A + B + C',
      explanation: 'Spiegazione dettagliata formula.',
    },

    // Sezione 5: Interpretazione Clinica
    clinicalInterpretation: {
      title: 'Interpretazione Clinica Dettagliata',
      normal: {
        title: 'Range Normale:',
        text: 'Descrizione range normale.',
      },
      moderate: {
        title: 'Range Moderato:',
        text: 'Descrizione range moderato.',
      },
      severe: {
        title: 'Range Severo:',
        text: 'Descrizione range severo.',
      },
    },

    // Sezione 6: Applicazioni Cliniche
    clinicalApplications: {
      title: 'Applicazioni Cliniche',
      application1: {
        title: 'Applicazione 1:',
        text: 'Descrizione.',
      },
      application2: {
        title: 'Applicazione 2:',
        text: 'Descrizione.',
      },
      // ... altre applicazioni
    },

    // Sezione 7: Valori di Riferimento
    referenceValues: {
      title: 'Valori di Riferimento e Alert',
      normalRange: {
        title: 'Range Normale:',
        text: 'Valori normali.',
      },
      criticalAlerts: {
        title: 'Alert Critici:',
        text: 'Valori critici.',
      },
      // ... altri valori
    },

    // Sezione 8: Documentazione
    documentation: {
      title: 'Documentazione e Linee Guida',
      guideline1: {
        title: 'Linea Guida 1:',
        text: 'Descrizione linea guida.',
      },
      guideline2: {
        title: 'Linea Guida 2:',
        text: 'Descrizione linea guida.',
      },
      // ... altre linee guida
    },

    // Sezione 9: Bibliografia
    bibliography: {
      title: 'Bibliografia e Riferimenti Scientifici',
      reference1: {
        title: 'Riferimento 1:',
        text: 'Citazione completa con PMID.',
      },
      reference2: {
        title: 'Riferimento 2:',
        text: 'Citazione completa con PMID.',
      },
      // ... altri riferimenti (minimo 3-5 per componenti medici)
    },
  },
};
```

### 1.2 File Italiano (`src/i18n/it-IT/nomeComponente.ts`)

✅ **MUST HAVE**:

- `export default { ... }` alla fine
- JSDoc header completo (`@file`, `@description`, `@author`, `@created`)
- Struttura gerarchica organizzata (titoli, form, bottoni, risultati, sections)
- **TRADUZIONE COMPLETA**: Tutti i titoli, testi, paragrafi, liste, sottosezioni tradotti in italiano
- Contenuto medico accurato con terminologia professionale italiana
- Markup HTML dove necessario (`<strong>`, `<em>`, ecc.)
- **App bilingue completa**: L'applicazione è dedicata a italiani che NON conoscono inglese, quindi TUTTO deve essere tradotto

⚠️ **EVITARE**:

- ❌ Emoji decorativi (es. 1️⃣, 2️⃣, 🎯) → RIMUOVERE (vedi Step 1B)
- ❌ Testo hardcoded nel template Vue
- ❌ Testi in inglese nel file IT (TUTTO deve essere tradotto in italiano)
- ❌ Inconsistenze strutturali IT/EN (le chiavi devono essere identiche, solo le traduzioni cambiano)

### 1.3 File Inglese (`src/i18n/en-US/nomeComponente.ts`)

```typescript
/**
 * @file en-US/nomeComponente.ts
 * @description English translations for NomeComponente
egi * @author [Author Name]
 * @created YYYY-MM-DD
 */

export default {
  title: 'Component Title',
  subtitle: 'Descriptive subtitle',

  banner: {
    title: 'Banner Title:',
    description: 'Brief description of the calculator/tool.',
  },

  form: {
    sectionTitle: 'Input Parameters',
    field1Label: 'Field 1 Label',
    field1Unit: 'Unit of Measure',
    // ... same structure as Italian
  },

  // ... IDENTICAL STRUCTURE to Italian file
  // COMPLETE TRANSLATION: All titles, texts, paragraphs, lists, subsections translated to English
  // Bilingual app: Application is for English speakers who do NOT know Italian, so EVERYTHING must be translated

  sections: {
    definition: {
      title: 'Definition and Clinical Significance',
      content:
        'Complete HTML text translated with <strong>markup</strong> for definition. Includes all paragraphs, lists, subsections translated in English.',
      mainTitle: 'Historical Origin',
      mainText:
        'Complete main text translated: The SOFA score was developed in 1996 by Jean-Louis Vincent...',
      // ✅ Translate ALL subtitles and texts
      keyCharacteristics: {
        title: 'Key Characteristics:',
        items: [
          'Assesses 6 major organ systems independently',
          'Each organ scored 0-4 points based on severity',
          // ... all items translated
        ],
      },
      // ... ALL other subsections completely translated
    },
    // ... ALL 9 sections completely translated
  },
};
```

✅ **CRITICAL**:

- Struttura IT/EN deve essere **identica** (stesse chiavi, stessa gerarchia)
- **TRADUZIONE COMPLETA**: Solo i valori cambiano (traduzioni complete IT ↔ EN)
- **App completamente bilingue**: Inglesi NON conoscono italiano, italiani NON conoscono inglese
- Zero testi in lingua opposta (IT file = 100% italiano, EN file = 100% inglese)

---

## ✅ STEP 1B: Rimozione Emoji Automatizzata (OBBLIGATORIO)

### 1B.1 Perché Rimuovere Emoji?

Il software medico professionale **NON deve contenere emoji decorativi** per:

- ✅ Conformità standard professionali medici (.rules-copilot-medical.md)
- ✅ Aspetto professionale per clinici/medici
- ✅ Compatibilità sistemi internazionali
- ✅ Accessibilità (screen readers possono leggere male emoji)

### 1B.2 Comando Automatizzato

```bash
# Rimuovi TUTTI gli emoji numerici (1️⃣-9️⃣) da TUTTI i file Vue
find src/components -name "*.vue" -exec sed -i 's/[0-9]️⃣ //g' {} \;

# Alternativa (se find non funziona):
sed -i 's/[0-9]️⃣ //g' src/components/**/*.vue
```

### 1B.3 Verifica Rimozione

```bash
# Conta istanze emoji rimanenti (DEVE ritornare 0)
grep -r "️⃣" src/components --include="*.vue" | wc -l

# Output atteso: 0
# Se vedi numero > 0, qualche emoji non è stato rimosso!
```

### 1B.4 Quando Eseguire

- ⏰ **DOPO** aver creato/modificato file i18n
- ⏰ **PRIMA** della validazione finale
- ⏰ Ogni volta che aggiungi nuove sezioni espandibili

---

## ⚠️ REGOLA CRITICA: Traduzione Completa Bilingue (100% IT + 100% EN)

### Perché TUTTO deve essere tradotto?

L'applicazione medica è progettata per due tipi di utenti completamente distinti:

1. **Utenti italiani** che **NON** conoscono inglese (medici/infermieri italiani)
2. **Utenti inglesi** che **NON** conoscono italiano (medici/infermieri internazionali)

### Cosa tradurre (TUTTO):

✅ **Traduci COMPLETAMENTE**:

- Titoli principali (header, banner, form)
- Etichette form e opzioni
- Bottoni e azioni
- Risultati e interpretazioni
- **TUTTO il contenuto delle sezioni espandibili**:
  - Paragrafi introduttivi completi
  - Liste puntate (ogni singola voce)
  - Sottosezioni e sottotitoli
  - Tabelle mediche (intestazioni + righe)
  - Note cliniche e disclaimer
  - Riferimenti bibliografici (titoli sezioni, non PMID)
  - Alert e warning

### Esempio CORRETTO (traduzione completa):

**File IT** (`sofa.ts`):

```typescript
sections: {
  definition: {
    title: 'Definizione e Significato Clinico',
    historicalOrigin: {
      title: 'Origine Storica',
      text: 'Lo score SOFA (Sequential Organ Failure Assessment) fu sviluppato nel 1996 da Jean-Louis Vincent e il Sepsis-related Organ Failure Assessment Working Group alla conferenza di consenso della European Society of Intensive Care Medicine.',
    },
    keyCharacteristics: {
      title: 'Caratteristiche Chiave:',
      items: [
        'Valuta 6 principali sistemi organici indipendentemente',
        'Ogni organo valutato 0-4 punti in base alla gravità della disfunzione',
        'Punteggio totale 0-24 punti (più alto = prognosi peggiore)',
        'Può essere calcolato ripetutamente per tracciare la traiettoria (delta SOFA)',
        'Predittore validato di mortalità in terapia intensiva (AUROC 0.74-0.86)',
      ],
    },
    // ... TUTTE le altre sottosezioni tradotte
  },
}
```

**File EN** (`sofa.ts`):

```typescript
sections: {
  definition: {
    title: 'Definition and Clinical Significance',
    historicalOrigin: {
      title: 'Historical Origin',
      text: 'The SOFA (Sequential Organ Failure Assessment) Score was developed in 1996 by Jean-Louis Vincent and the Sepsis-related Organ Failure Assessment Working Group at the European Society of Intensive Care Medicine consensus conference.',
    },
    keyCharacteristics: {
      title: 'Key Characteristics:',
      items: [
        'Assesses 6 major organ systems independently',
        'Each organ scored 0-4 points based on severity of dysfunction',
        'Total score 0-24 points (higher = worse prognosis)',
        'Can be calculated repeatedly to track trajectory (delta SOFA)',
        'Validated predictor of ICU mortality (AUROC 0.74-0.86)',
      ],
    },
    // ... ALL other subsections translated
  },
}
```

### ❌ ERRORE COMUNE (NON FARE):

**SBAGLIATO** - Lasciare contenuto in inglese nel template Vue:

```vue
<q-card>
  <p>The SOFA score was developed in 1996...</p>  <!-- ❌ HARDCODED INGLESE -->
</q-card>
```

**CORRETTO** - Usare t() per traduzione completa:

```vue
<q-card>
  <p>{{ t('sofa.sections.definition.historicalOrigin.text') }}</p>  <!-- ✅ TRADOTTO -->
</q-card>
```

### Workflow traduzione contenuto medico:

1. **Identifica TUTTO il testo** nel template Vue (anche paragrafi lunghi)
2. **Crea chiavi i18n** per ogni testo (nessun testo hardcoded)
3. **Traduci in IT**: Usa terminologia medica italiana professionale
4. **Traduci in EN**: Usa terminologia medica inglese standard
5. **Sostituisci nel template**: Usa `{{ t('chiave') }}` o `v-html="t('chiave')"`

### Stima lavoro traduzione completa:

| Componente    | Righe Template | Righe IT | Righe EN | Tempo Stima |
| ------------- | -------------- | -------- | -------- | ----------- |
| Piccolo (BMI) | ~200           | ~80      | ~80      | 1-2 ore     |
| Medio (NEWS)  | ~700           | ~200     | ~200     | 3-4 ore     |
| Grande (SOFA) | ~2000          | ~500     | ~500     | 8-12 ore    |

**⚠️ IMPORTANTE**: Non saltare questo passaggio! L'app DEVE essere 100% utilizzabile da utenti monolingua (solo IT o solo EN).

---

## ✅ STEP 2: Aggiornare i File Index (⚠️ NON Sufficiente!)

### ⚠️ **CRITICO**: NON Basta Aggiungere l'Export!

Aggiungere solo `componenteNuovo: componenteNuovo` nell'export **NON FUNZIONA** a causa di come Vite/Vue i18n processano i moduli.

### 2.1 File `src/i18n/it-IT/index.ts`

```typescript
import mechanicalPower from './mechanicalPower';
import respiratoryQuotient from './respiratoryQuotient';
import apgarScore from './apgarScore';
import nomeComponente from './nomeComponente'; // ✅ AGGIUNGI IMPORT

export default {
  common: {
    /* ... */
  },
  nav: {
    /* ... */
  },
  validation: {
    /* ... */
  },
  errors: {
    /* ... */
  },

  // ❌ SBAGLIATO - NON AGGIUNGERE QUI:
  // nc: nomeComponente,  // ← Questo potrebbe NON funzionare!

  // ⚠️ L'export qui NON garantisce che Vue i18n carichi il namespace
  // Serve comunque lo STEP 3 (injection manuale nel boot file)!
};
```

### 2.2 File `src/i18n/en-US/index.ts`

```typescript
// Stesso pattern del file italiano
import nomeComponente from './nomeComponente'; // ✅ IMPORT

export default {
  // ... altri contenuti
  // ❌ NON aggiungere namespace qui (non funziona!)
};
```

### 2.3 Perché NON Funziona?

**Problema**: Vite usa **tree-shaking aggressivo** durante il build. Se un modulo non è esplicitamente referenziato nel codice runtime, viene rimosso dal bundle finale.

**Soluzione**: **STEP 3** (injection manuale nel boot file) è **OBBLIGATORIO** per garantire che il namespace sia incluso nel bundle.

---

## ✅ STEP 3: **INJECTION MANUALE** nel Boot File (🚨 OBBLIGATORIO!)

### ⚠️ **PROBLEMA COMUNE**: Manca l'Injection Manuale

Il namespace **DEVE** essere iniettato manualmente nel file `src/boot/i18n.ts`. Senza questo passaggio, Vue i18n **NON caricherà** le traduzioni!

### 3.1 File `src/boot/i18n.ts` - **INJECTION OBBLIGATORIA**

```typescript
import enUS from 'src/i18n/en-US';
import itIT from 'src/i18n/it-IT';

// ✅ STEP 1: IMPORT DIRETTO dei file di traduzione (IT + EN)
import mechanicalPowerIT from 'src/i18n/it-IT/mechanicalPower';
import mechanicalPowerEN from 'src/i18n/en-US/mechanicalPower';
import respiratoryQuotientIT from 'src/i18n/it-IT/respiratoryQuotient';
import respiratoryQuotientEN from 'src/i18n/en-US/respiratoryQuotient';
import apgarScoreIT from 'src/i18n/it-IT/apgarScore';
import apgarScoreEN from 'src/i18n/en-US/apgarScore';

// ✅ AGGIUNGI IMPORT DEL NUOVO COMPONENTE
import nomeComponenteIT from 'src/i18n/it-IT/nomeComponente';
import nomeComponenteEN from 'src/i18n/en-US/nomeComponente';

// ✅ STEP 2: INJECTION MANUALE - SPREAD nel locale object
// This is REQUIRED for vue-i18n to load the translations (see I18N_SETUP_GUIDE.md)
const itITWithCalculators = {
  ...itIT,
  mp: mechanicalPowerIT,
  qr: respiratoryQuotientIT,
  apgar: apgarScoreIT,
  nc: nomeComponenteIT, // ✅ AGGIUNGI QUI IL NUOVO NAMESPACE
};

const enUSWithCalculators = {
  ...enUS,
  mp: mechanicalPowerEN,
  qr: respiratoryQuotientEN,
  apgar: apgarScoreEN,
  nc: nomeComponenteEN, // ✅ AGGIUNGI QUI IL NUOVO NAMESPACE
};

// ✅ STEP 3: CREATE messages object with injected namespaces
const messages = {
  'en-US': enUSWithCalculators,
  'it-IT': itITWithCalculators,
};

// ... resto del file (createI18n, boot function, ecc.)
```

### 3.2 Pattern Namespace

| Componente           | File IT                  | File EN                  | Namespace Key |
| -------------------- | ------------------------ | ------------------------ | ------------- |
| Mechanical Power     | `mechanicalPower.ts`     | `mechanicalPower.ts`     | `mp`          |
| Respiratory Quotient | `respiratoryQuotient.ts` | `respiratoryQuotient.ts` | `qr`          |
| APGAR Score          | `apgarScore.ts`          | `apgarScore.ts`          | `apgar`       |
| **NUOVO COMPONENTE** | `nomeComponente.ts`      | `nomeComponente.ts`      | `nc`          |

**Convenzione Namespace**:

- Usa **abbreviazioni brevi** (2-5 caratteri) per efficienza: `mp`, `qr`, `apgar`, `bmi`, `gfr`, ecc.
- Usa **camelCase** per namespace multi-parola: `apgar`, `mechanicalPower` (non `mechanical_power`)
- **Consistente** tra IT e EN (stesso namespace key per entrambe le lingue)

### 3.3 🚨 **PERCHÉ È NECESSARIO?**

#### Problema Tecnico: Vite Tree-Shaking

Vite/Rollup usa **tree-shaking** aggressivo durante build di produzione per ridurre dimensione bundle:

1. **Analisi statica**: Vite analizza imports/exports per determinare quali moduli sono "usati"
2. **Rimozione codice morto**: Moduli non esplicitamente referenziati vengono rimossi
3. **Import dinamici**: File `index.ts` con `export default { nc: nomeComponente }` possono essere visti come "non usati" se non ci sono import diretti nel codice runtime

#### Soluzione: Injection Manuale

```typescript
// ❌ NON FUNZIONA (tree-shaking può rimuoverlo):
import { nc } from 'src/i18n/it-IT'; // Import da index.ts

// ✅ FUNZIONA (import diretto garantisce inclusione):
import nomeComponenteIT from 'src/i18n/it-IT/nomeComponente'; // Import file specifico
const itITWithCalculators = { ...itIT, nc: nomeComponenteIT }; // Manual injection
```

**Risultato**: Il file `nomeComponente.ts` viene **sempre incluso** nel bundle finale, indipendentemente dal tree-shaking.

### 3.4 Verifica Injection (Debug)

Aggiungi temporaneamente nel boot file per debug:

```typescript
// Debug: verifica che namespace sia iniettato
console.log('[i18n Debug] itIT namespaces:', Object.keys(itITWithCalculators));
console.log('[i18n Debug] nc namespace exists?', 'nc' in itITWithCalculators);
console.log('[i18n Debug] nc keys:', Object.keys(itITWithCalculators.nc || {}));

// Output atteso:
// itIT namespaces: ['common', 'nav', 'mp', 'qr', 'apgar', 'nc']
// nc namespace exists? true
// nc keys: ['title', 'subtitle', 'form', 'buttons', ...]
```

**⚠️ RIMUOVI DEBUG IN PRODUZIONE!**

---

## ✅ STEP 4: Usare i18n nel Componente + JSDoc

### 4.1 Script Setup con JSDoc Completo

```vue
<script setup lang="ts">
/**
 * @file NomeComponenteCalculator.vue
 * @description [Descrizione breve del componente]
 * @author [Nome Autore]
 * @created YYYY-MM-DD
 * @modified YYYY-MM-DD (ultimo aggiornamento)
 * @description [Descrizione estesa funzionalità cliniche]
 */

import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSecureLogger } from 'src/composables/useSecureLogger';
import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';

// ============================================================
// COMPOSABLES
// ============================================================
const { t } = useI18n(); // ✅ Destructure t() function per traduzioni
const { logger } = useSecureLogger(); // ✅ GDPR-compliant logging (NO console.log!)
const { envConfig } = useSmartEnvironment(); // ✅ Environment detection

// ============================================================
// TYPES & INTERFACES (con JSDoc completo)
// ============================================================
/**
 * @interface InputData
 * @description Struttura dati input del calcolatore
 * @property {number} field1 - Descrizione campo 1 (range: X-Y, unità: Z)
 * @property {number} field2 - Descrizione campo 2
 */
interface InputData {
  field1: number;
  field2: number;
}

/**
 * @interface ResultData
 * @description Risultato calcolato
 * @property {number} value - Valore numerico calcolato
 * @property {string} interpretation - Interpretazione clinica
 */
interface ResultData {
  value: number;
  interpretation: string;
}

// ============================================================
// STATE
// ============================================================
const inputData = ref<InputData>({ field1: 0, field2: 0 });
const result = ref<ResultData | null>(null);

// ============================================================
// COMPUTED
// ============================================================
/**
 * @computed isFormValid
 * @description Valida se tutti i campi obbligatori sono compilati
 * @returns {boolean} true se form valido, false altrimenti
 */
const isFormValid = computed(() => {
  return inputData.value.field1 > 0 && inputData.value.field2 > 0;
});

// ============================================================
// FUNCTIONS (tutte con JSDoc completo)
// ============================================================

/**
 * @function calculate
 * @description Esegue calcolo principale del componente
 * @returns {void}
 * @throws {Error} Se validazione input fallisce
 *
 * @example
 * // Calcolo con valori validi
 * inputData.value = { field1: 10, field2: 20 };
 * calculate(); // result.value = { value: 30, interpretation: 'Normal' }
 *
 * @see {@link https://pmid.ncbi.nlm.nih.gov/XXXXXXX} Riferimento scientifico
 */
const calculate = (): void => {
  if (!isFormValid.value) {
    logger.warn('[NomeComponente] Calcolo interrotto: form non valido', {
      field1: inputData.value.field1,
      field2: inputData.value.field2,
    });
    return;
  }

  // Logica calcolo
  const value = inputData.value.field1 + inputData.value.field2;
  const interpretation = getInterpretation(value);

  result.value = { value, interpretation };

  logger.info('[NomeComponente] Calcolo completato', {
    input: inputData.value,
    result: result.value,
    isDevelopment: envConfig.isDevelopment,
  });
};

/**
 * @function getInterpretation
 * @description Determina interpretazione clinica basata su valore calcolato
 * @param {number} value - Valore da interpretare
 * @returns {string} Chiave i18n per interpretazione ('normal' | 'moderate' | 'severe')
 *
 * @example
 * getInterpretation(15); // 'normal'
 * getInterpretation(25); // 'moderate'
 * getInterpretation(40); // 'severe'
 */
const getInterpretation = (value: number): string => {
  if (value < 20) return 'normal';
  if (value < 35) return 'moderate';
  return 'severe';
};

/**
 * @function resetForm
 * @description Reset completo form e risultati
 * @returns {void}
 */
const resetForm = (): void => {
  inputData.value = { field1: 0, field2: 0 };
  result.value = null;

  if (envConfig.isDevelopment) {
    logger.debug('[NomeComponente] Form resettato', { timestamp: new Date() });
  }
};
</script>
```

### 4.2 JSDoc Requirements (Mandatory per .rules-copilot-medical.md)

#### 4.2.1 Requisiti Minimi JSDoc

**OBBLIGATORIO** per tutte le funzioni/metodi pubblici:

```typescript
/**
 * @function functionName
 * @description [Descrizione chiara e concisa della funzionalità]
 * @param {Type} paramName - Descrizione parametro (con range/unità se applicabile)
 * @returns {ReturnType} Descrizione valore ritornato
 *
 * @example
 * // Esempio pratico di utilizzo
 * functionName(10); // Output atteso
 *
 * @throws {ErrorType} Condizione errore (opzionale se la funzione può lanciare errori)
 * @see {@link URL} Riferimento esterno (opzionale per riferimenti scientifici PMID)
 */
```

#### 4.2.2 JSDoc per Interfaces/Types

```typescript
/**
 * @interface InterfaceName
 * @description Descrizione struttura dati
 * @property {Type} propertyName - Descrizione proprietà
 */
interface InterfaceName {
  propertyName: Type;
}
```

#### 4.2.3 JSDoc per Computed Properties

```typescript
/**
 * @computed computedName
 * @description Descrizione computed property
 * @returns {Type} Descrizione valore ritornato
 */
const computedName = computed(() => {
  // ...
});
```

#### 4.2.4 Esempio Completo da APGARScoreCalculator

```typescript
/**
 * @function saveScore
 * @description Salva valutazione APGAR corrente nella cronologia
 * Solo se form completo (tutti i 5 parametri valutati)
 * @returns {void}
 *
 * @example
 * // Salva score APGAR 1 minuto
 * scores.value = { appearance: 2, pulse: 2, grimace: 1, activity: 2, respiration: 2 };
 * currentTime.value = 1;
 * saveScore(); // Aggiunge a savedScores array con timestamp
 */
const saveScore = (): void => {
  if (!isFormComplete.value) {
    logger.warn('[APGARScore] Impossibile salvare: form incompleto', {
      currentScores: scores.value,
      totalScore: totalScore.value,
    });
    return;
  }

  savedScores.value.push({
    time: currentTime.value,
    scores: { ...scores.value },
    total: totalScore.value,
    timestamp: new Date(),
  });

  logger.info('[APGARScore] Valutazione salvata', {
    time: currentTime.value,
    score: totalScore.value,
  });

  resetCurrentScores();
};
```

### 4.3 Template con t() Calls

```vue
<template>
  <div class="q-pa-md">
    <!-- Banner Informativo -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="info" color="blue" />
      </template>
      <div class="text-body2">
        <!-- ✅ Text interpolation con t() -->
        <strong>{{ t('nc.banner.title') }}</strong> {{ t('nc.banner.description') }}
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="edit" class="q-mr-xs" />
              <!-- ✅ Simple text translation -->
              {{ t('nc.form.sectionTitle') }}
            </div>

            <!-- ✅ Attribute binding con :label -->
            <q-input
              v-model.number="inputData.field1"
              :label="t('nc.form.field1Label')"
              :suffix="t('nc.form.field1Unit')"
              type="number"
              outlined
              dense
            />

            <!-- ✅ Button con interpolazione variabili -->
            <q-btn
              @click="calculate"
              color="primary"
              class="full-width q-mt-md"
              :disable="!isFormValid"
            >
              {{ t('nc.buttons.calculate') }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <!-- ✅ HTML content con v-html (ATTENZIONE: solo per contenuti sicuri!) -->
            <div v-html="t('nc.sections.definition.content')"></div>

            <!-- ✅ Interpolazione con variabili dinamiche -->
            <q-chip>
              {{ t('nc.results.value', { value: result?.value }) }}
            </q-chip>

            <!-- ✅ Conditional rendering con traduzioni -->
            <div v-if="result">
              {{ t(`nc.interpretation.${result.interpretation}`) }}
            </div>

            <!-- ✅ Expansion sections con sottotitoli -->
            <q-expansion-item
              icon="info"
              :label="t('nc.sections.definition.title')"
              header-class="bg-blue-1 text-blue-9"
            >
              <q-card class="q-pa-md">
                <!-- ✅ Nested structure translations -->
                <div class="text-body2 q-mb-sm">
                  <strong>{{ t('nc.sections.definition.subsection1.title') }}</strong>
                  {{ t('nc.sections.definition.subsection1.text') }}
                </div>
              </q-card>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
```

### 4.4 Pattern t() Comuni

| Caso d'uso                        | Pattern                                           | Esempio                                  |
| --------------------------------- | ------------------------------------------------- | ---------------------------------------- |
| Testo semplice                    | `{{ t('key') }}`                                  | `{{ t('nc.title') }}`                    |
| Attributo HTML                    | `:attribute="t('key')"`                           | `:label="t('nc.form.field1Label')"`      |
| HTML content                      | `v-html="t('key')"`                               | `v-html="t('nc.sections.definition')"`   |
| Interpolazione variabili          | `{{ t('key', { var }) }}`                         | `{{ t('nc.buttons.save', { time: 1 })}}` |
| Conditional key                   | `{{ t(\`prefix.${variable}\`) }}`                 | `{{ t(\`nc.interp.${result}\`) }}`       |
| Loop con traduzioni               | `v-for="item in items"` + `{{ t(item.key) }}`     | Vedi esempio loop sotto                  |
| **Array i18n (PATTERN STANDARD)** | `v-for="(item, idx) in N"` + `t(\`key[${idx}]\`)` | **Vedi 4.4.1 - OBBLIGATORIO per array**  |

#### 4.4.1 🔥 Pattern Standard per Array i18n (OBBLIGATORIO)

**⚠️ REGOLA CRITICA**: Per iterare array da file i18n, usa **SEMPRE** questo pattern standard usato in tutti i componenti (BMI, BSA, IBW, eGFR, ecc.):

**✅ PATTERN CORRETTO (Standard Application-Wide)**:

```vue
<!-- Esempio: Array con 5 elementi in dosageCalculator.warnings.items -->
<ul>
  <li
    v-for="(item, index) in 5"
    :key="index"
    v-html="t(`dosageCalculator.warnings.items[${index}]`)"
  ></li>
</ul>

<!-- Esempio: Array con 7 elementi in formulas.adjustmentRules -->
<ul>
  <li
    v-for="(item, idx) in 7"
    :key="idx"
    v-html="t(`dosageCalculator.formulas.content.adjustmentRules[${idx}]`)"
  ></li>
</ul>

<!-- Esempio: Paragraphs invece di list items -->
<div>
  <p
    v-for="(item, idx) in 4"
    :key="idx"
    class="text-body2 q-mb-sm"
    v-html="t(`dosageCalculator.sections.pharmacokinetics.content.intro[${idx}]`)"
  ></p>
</div>
```

**🎯 Caratteristiche Pattern**:

1. **Loop numerico fisso**: `v-for="(item, idx) in N"` dove N è il numero di elementi nell'array i18n
2. **Template literal con indice**: `t(\`key[${idx}]\`)` accede all'elemento array tramite indice
3. **v-html per contenuti HTML**: Permette rendering di `<strong>`, `<em>`, ecc.
4. **Nessun computed**: Non servono computed properties per convertire array
5. **Nessun tm()**: Non usare `tm()` che restituisce Proxy non iterabili correttamente

**❌ PATTERN SBAGLIATO (DA EVITARE)**:

```vue
<!-- ❌ ERRORE 1: Usare tm() con computed -->
<script setup lang="ts">
const { t, tm } = useI18n();
const warningsItems = computed(() => Array.from(tm('dosageCalculator.warnings.items')));
</script>
<ul>
  <li v-for="(item, idx) in warningsItems" :key="idx" v-html="item"></li>
</ul>
<!-- PROBLEMA: tm() restituisce Proxy, Array.from() non converte correttamente, 
     Vue mostra "[object Object]" invece del contenuto -->

<!-- ❌ ERRORE 2: Iterare direttamente su tm() senza conversione -->
<ul>
  <li v-for="(item, idx) in tm('key')" :key="idx" v-html="item"></li>
</ul>
<!-- PROBLEMA: Proxy non è iterabile in modo affidabile, risultati imprevedibili -->

<!-- ❌ ERRORE 3: Usare loop con dati dinamici -->
<ul>
  <li v-for="item in dynamicArray" :key="item" v-html="t(item)"></li>
</ul>
<!-- PROBLEMA: Più complesso, può fallire con array vuoti o undefined -->
```

**📊 Confronto Approcci**:

| Aspetto            | tm() + computed (❌)          | Loop numerico + t() (✅)   |
| ------------------ | ----------------------------- | -------------------------- |
| **Complessità**    | Alta (computed, Array.from)   | Bassa (loop diretto)       |
| **Affidabilità**   | Bassa (Proxy issues)          | Alta (testato ovunque)     |
| **Performance**    | Peggiore (conversione Proxy)  | Migliore (accesso diretto) |
| **Debugging**      | Difficile (Proxy opaco)       | Facile (indice visibile)   |
| **Compatibilità**  | Fragile (dipende da vue-i18n) | Robusta (standard Vue)     |
| **Manutenibilità** | Bassa                         | Alta (pattern consistente) |

**🔍 File i18n corrispondente**:

```typescript
// src/i18n/it-IT/dosageCalculator.ts
export default {
  warnings: {
    title: 'Avvertenze Importanti',
    items: [
      // ← ARRAY con 5 elementi
      '<strong>Dosaggio stimato:</strong> Questo calcolatore fornisce...',
      '<strong>Variabilità individuale:</strong> Fattori come...',
      '<strong>TDM:</strong> Per farmaci a stretto indice...',
      '<strong>Pediatria:</strong> Dosaggi neonatali...',
      '<strong>Insufficienza renale:</strong> Aggiustamento eGFR-based...',
    ],
  },
};
```

**✅ Vantaggi Pattern Standard**:

1. **Consistenza codebase**: Stesso pattern in BMI, BSA, IBW, eGFR, Dosage → manutenibilità
2. **Semplicità**: Nessun computed, nessun tm(), solo t() con template literal
3. **Type-safe**: TypeScript controlla correttamente gli indici
4. **Debugging facile**: Indice visibile nel template, facile identificare quale elemento fallisce
5. **Performance**: Accesso diretto via t() più veloce di conversione Proxy
6. **Zero sorprese**: Nessun "[object Object]", nessun Proxy behavior imprevedibile

**🚨 REGOLA OBBLIGATORIA per LLM/AI**:

**QUANDO traduci un componente con array i18n**:

- ❌ **NON** usare mai `tm()` per array
- ❌ **NON** creare computed properties per convertire array
- ✅ **USA** sempre pattern `v-for="(item, idx) in N"` con `t(\`key[${idx}]\`)`
- ✅ **CONTA** elementi in array i18n e usa numero esatto nel v-for
- ✅ **VERIFICA** che tutti gli altri componenti usano questo pattern (consistenza)

#### 4.4.2 Esempio Loop con Traduzioni Dinamiche

```vue
<q-list>
  <q-item v-for="param in parametersList" :key="param">
    <q-item-section>
      <q-item-label>{{ t(`nc.parameters.${param}.title`) }}</q-item-label>
      <q-item-label caption>{{ t(`nc.parameters.${param}.description`) }}</q-item-label>
    </q-item-section>
  </q-item>
</q-list>
```

### 4.5 ⚠️ ERRORI COMUNI DA EVITARE

```vue
<!-- ❌ SBAGLIATO: Mostra chiave letterale invece di traduzione -->
<div>{{ 'nc.title' }}</div>

<!-- ✅ CORRETTO: Usa funzione t() -->
<div>{{ t('nc.title') }}</div>

<!-- ❌ SBAGLIATO: HTML non renderizzato -->
<div>{{ t('nc.sections.definition') }}</div>
<!-- Mostra <strong> come testo -->

<!-- ✅ CORRETTO: Usa v-html per contenuti HTML -->
<div v-html="t('nc.sections.definition')"></div>

<!-- ❌ SBAGLIATO: Interpolazione malformata -->
<q-btn>{{ t('nc.buttons.save', currentTime) }}</q-btn>
<!-- currentTime NON è oggetto -->

<!-- ✅ CORRETTO: Interpolazione con oggetto -->
<q-btn>{{ t('nc.buttons.save', { time: currentTime }) }}</q-btn>

<!-- ❌ SBAGLIATO: Array con tm() e computed -->
<script setup>
const { t, tm } = useI18n();
const items = computed(() => Array.from(tm('nc.items')));
</script>
<ul>
  <li v-for="item in items" :key="item" v-html="item"></li>
</ul>
<!-- PROBLEMA: tm() restituisce Proxy, mostra "[object Object]" -->

<!-- ✅ CORRETTO: Array con loop numerico e t() -->
<ul>
  <li 
    v-for="(item, idx) in 5" 
    :key="idx" 
    v-html="t(`nc.items[${idx}]`)"
  ></li>
</ul>
<!-- SOLUZIONE: Pattern standard usato in tutti i componenti -->

<!-- ❌ SBAGLIATO: Uso console.log (GDPR violation!) -->
console.log('Calcolo completato', result);

<!-- ✅ CORRETTO: Usa useSecureLogger -->
logger.info('[NomeComponente] Calcolo completato', { result });
```

### 4.6 🔍 Debug i18n (Opzionale - Rimuovi in Produzione)

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSecureLogger } from 'src/composables/useSecureLogger';

const { t, messages, locale } = useI18n();
const { logger } = useSecureLogger();

// Debug: Verifica namespace caricato
const currentMessages = messages.value[locale.value] as Record<string, unknown>;

if (envConfig.isDevelopment) {
  logger.debug('[NomeComponente] i18n check', {
    'namespace exists': 'nc' in currentMessages,
    'namespace keys': Object.keys((currentMessages as any).nc || {}),
    'test translation': t('nc.title'),
    locale: locale.value,
  });
}
</script>
```

**Output Atteso (Console)**:

```
[NomeComponente] i18n check {
  namespace exists: true,
  namespace keys: ['title', 'subtitle', 'form', 'buttons', 'sections', ...],
  test translation: 'Titolo Componente',
  locale: 'it-IT'
}
```

**⚠️ IMPORTANTE**: Rimuovi TUTTO il codice debug prima del commit finale!

---

## ✅ STEP 5: Testing e Validazione Completa

### 5.1 Checklist Validazione Sistematica

| #   | Validazione                | Comando                                                  | Output Atteso          | Status |
| --- | -------------------------- | -------------------------------------------------------- | ---------------------- | ------ |
| 1   | **TypeScript Strict Mode** | `npx vue-tsc --noEmit`                                   | `✓ No errors found`    | ☐      |
| 2   | **Lint (ESLint)**          | `npm run lint`                                           | `✓ No errors found`    | ☐      |
| 3   | **Emoji Removal**          | `grep -r "️⃣" src/components --include="*.vue" \| wc -l` | `0`                    | ☐      |
| 4   | **Get Errors (VS Code)**   | Use `get_errors` tool                                    | No errors              | ☐      |
| 5   | **Dev Server Start**       | `yarn dev`                                               | Server running         | ☐      |
| 6   | **Browser Test IT**        | Open `http://localhost:9000`                             | Traduzioni IT visibili | ☐      |
| 7   | **Browser Test EN**        | Switch locale in app                                     | Traduzioni EN visibili | ☐      |
| 8   | **Form Interactions**      | Fill form + Calculate                                    | Risultati corretti     | ☐      |
| 9   | **Expansion Sections**     | Expand all sections                                      | Tutti i testi tradotti | ☐      |
| 10  | **Responsive Test**        | Test mobile/tablet/desktop                               | Responsive sizing OK   | ☐      |

### 5.2 Validazione TypeScript

```bash
# Verifica TypeScript strict mode
npx vue-tsc --noEmit

# Output atteso (SUCCESS):
# ✓ No errors found

# Output atteso (FAILURE):
# src/components/NomeComponente.vue:45:12 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

**Se vedi errori**:

1. Leggi attentamente il messaggio di errore
2. Identifica il file e la linea
3. Correggi l'annotazione di tipo o il codice
4. Riesegui il comando

### 5.3 Validazione Lint (ESLint)

```bash
# Verifica lint compliance
npm run lint

# Output atteso (SUCCESS):
# ✓ No errors found

# Output atteso (FAILURE):
# /src/components/NomeComponente.vue
#   45:12  error  'variable' is assigned a value but never used  no-unused-vars
```

**Fix automatico** (quando possibile):

```bash
npm run lint -- --fix
```

### 5.4 Validazione Emoji Removal

```bash
# Conta emoji rimanenti (MUST return 0)
grep -r "️⃣" src/components --include="*.vue" | wc -l

# Output atteso: 0

# Se > 0, esegui nuovamente rimozione:
find src/components -name "*.vue" -exec sed -i 's/[0-9]️⃣ //g' {} \;
```

### 5.5 Validazione VS Code Errors (get_errors tool)

```typescript
// Use get_errors tool per file specifico
get_errors({
  filePaths: ['/home/user/project/src/components/NomeComponente.vue'],
});

// Output atteso: No errors found
```

### 5.6 Browser Testing - Italian Locale

#### 5.6.1 Start Dev Server

```bash
yarn dev

# Output atteso:
# VITE v5.x.x  ready in XXX ms
# ➜  Local:   http://localhost:9000/
# ➜  Network: use --host to expose
```

#### 5.6.2 Verifica Traduzioni IT

1. **Apri browser**: `http://localhost:9000`
2. **Naviga al componente**: Click su link/tab
3. **Verifica elementi**:
   - ✅ Titolo componente tradotto in italiano
   - ✅ Form labels in italiano
   - ✅ Button text in italiano
   - ✅ Risultati in italiano
   - ✅ Sezioni espandibili in italiano
   - ✅ **NO chiavi i18n visibili** (es. `nc.title` → ERRORE!)
   - ✅ **NO emoji numerici** (es. `1️⃣` → ERRORE!)

#### 5.6.3 Test Interpolazione Variabili

```vue
<!-- Test interpolazione: {{ t('nc.buttons.save', { time: 1 }) }} -->
<!-- Output atteso: "Salva 1 min" (IT) o "Save 1 min" (EN) -->
```

**Verifica**:

- Variabili sostituiscono placeholder `{time}`, `{value}`, ecc.
- NO placeholder visibili (es. `Salva {time} min` → ERRORE!)

### 5.7 Browser Testing - English Locale

#### 5.7.1 Switch Lingua

Metodo varia per progetto. Esempi comuni:

- **Dropdown menu** in header/toolbar
- **Settings page** con selezione lingua
- **URL parameter**: `?locale=en-US`
- **localStorage**: `localStorage.setItem('locale', 'en-US')` + refresh

#### 5.7.2 Verifica Traduzioni EN

1. **Switch locale** a `en-US`
2. **Verifica elementi**:
   - ✅ Titolo componente in inglese
   - ✅ Form labels in inglese
   - ✅ Button text in inglese
   - ✅ Risultati in inglese
   - ✅ Sezioni espandibili in inglese
   - ✅ **Struttura identica** a versione IT (stesse sezioni, stesso ordine)

#### 5.7.3 Verifica Consistenza IT/EN

| Elemento              | IT                 | EN                     | Status |
| --------------------- | ------------------ | ---------------------- | ------ |
| Titolo                | "Calcolatore Nome" | "Name Calculator"      | ☐      |
| Form label 1          | "Campo 1"          | "Field 1"              | ☐      |
| Button calculate      | "Calcola"          | "Calculate"            | ☐      |
| Result interpretation | "Normale"          | "Normal"               | ☐      |
| Section 1 title       | "Definizione"      | "Definition"           | ☐      |
| Number of sections    | 9 sections         | 9 sections (IDENTICAL) | ☐      |

### 5.8 Form Interactions Testing

#### 5.8.1 Input Validation

```
Test Case 1: Form Vuoto
- Action: Click "Calcola" senza compilare
- Expected: Button disabled OR warning message
- Result: ☐ PASS / ☐ FAIL

Test Case 2: Input Validi
- Action: Compila tutti i campi con valori validi
- Expected: Button enabled, calcolo eseguito, risultato visualizzato
- Result: ☐ PASS / ☐ FAIL

Test Case 3: Input Invalidi
- Action: Compila con valori fuori range (es. negativi)
- Expected: Validation error OR button disabled
- Result: ☐ PASS / ☐ FAIL
```

#### 5.8.2 Calculate Function

```
Test Case 4: Calcolo Corretto
- Input: [Valori specifici test]
- Expected Output: [Valore atteso]
- Actual Output: _______
- Result: ☐ PASS / ☐ FAIL

Test Case 5: Interpretazione Clinica
- Input: [Valori limite range]
- Expected: Interpretazione corretta (normal/moderate/severe)
- Actual: _______
- Result: ☐ PASS / ☐ FAIL
```

#### 5.8.3 Reset Function

```
Test Case 6: Reset Form
- Action: Compila form → Calcola → Click Reset
- Expected: Form cleared, risultati cleared
- Result: ☐ PASS / ☐ FAIL
```

### 5.9 Expansion Sections Testing

#### 5.9.1 Medical Calculator Standard (9 Sections)

```
Section 1: Definizione ..................... ☐ PASS / ☐ FAIL
Section 2: Fisiologia ...................... ☐ PASS / ☐ FAIL
Section 3: Valutazione ..................... ☐ PASS / ☐ FAIL
Section 4: Formula ......................... ☐ PASS / ☐ FAIL
Section 5: Interpretazione Clinica ......... ☐ PASS / ☐ FAIL
Section 6: Applicazioni Cliniche ........... ☐ PASS / ☐ FAIL
Section 7: Valori di Riferimento ........... ☐ PASS / ☐ FAIL
Section 8: Documentazione .................. ☐ PASS / ☐ FAIL
Section 9: Bibliografia .................... ☐ PASS / ☐ FAIL
```

**Per ogni sezione verifica**:

- ✅ Titolo tradotto correttamente
- ✅ Contenuto tradotto (NO chiavi i18n visibili)
- ✅ HTML markup renderizzato (`<strong>`, `<em>`, ecc.)
- ✅ Riferimenti scientifici (PMID) presenti in bibliografia
- ✅ NO emoji numerici nel titolo sezione

### 5.10 Responsive Testing

#### 5.10.1 Breakpoints Quasar

| Breakpoint | Width       | Device  | Test                     | Status |
| ---------- | ----------- | ------- | ------------------------ | ------ |
| `xs`       | < 600px     | Mobile  | Layout 1 colonna         | ☐      |
| `sm`       | 600-1023px  | Tablet  | Layout 1-2 colonne       | ☐      |
| `md`       | 1024-1439px | Desktop | Layout 2 colonne         | ☐      |
| `lg`       | 1440-1919px | Large   | Layout 2 colonne + space | ☐      |
| `xl`       | ≥ 1920px    | Extra   | Layout ottimizzato       | ☐      |

#### 5.10.2 Responsive Components Check

```vue
<!-- Verifica responsive sizing nei button/input -->
<q-btn :size="$q.screen.xs ? 'sm' : 'md'">{{ t('nc.buttons.calculate') }}</q-btn>

<!-- Test:
- Mobile (xs): Button size 'sm' ............. ☐ PASS / ☐ FAIL
- Desktop (md): Button size 'md' ............ ☐ PASS / ☐ FAIL
-->
```

### 5.11 Console Errors Check

#### 5.11.1 Browser Developer Tools

```
1. Apri DevTools (F12)
2. Tab "Console"
3. Verifica ZERO errori:
   ❌ [Vue warn] Missing required prop: 'xxx'
   ❌ [Vue i18n] Not found 'nc.title' key
   ❌ Uncaught TypeError: Cannot read property 'xxx'
   ✅ NO ERRORS (solo info/debug logs se in dev mode)
```

#### 5.11.2 Network Tab

```
1. Tab "Network"
2. Reload page
3. Verifica:
   ✅ i18n locale files caricati (it-IT.js, en-US.js)
   ✅ NO 404 errors per risorse mancanti
   ✅ Bundle size ragionevole (< 500KB per componente medio)
```

### 5.12 useSecureLogger Verification

```typescript
// In codice componente, verifica presenza logger calls:

// ✅ CORRETTO: useSecureLogger per logging
logger.warn('[NomeComponente] Form incompleto', { context });
logger.info('[NomeComponente] Calcolo completato', { result });
logger.debug('[NomeComponente] Debug info', { data });

// ❌ SBAGLIATO: console.log (GDPR violation!)
console.log('Calcolo completato', result); // ← RIMUOVERE!
```

**Verifica**:

```bash
# Cerca istanze console.log (deve ritornare 0 nel componente)
grep -n "console\.log" src/components/NomeComponente.vue

# Output atteso: (nessun risultato)
```

### 5.13 useSmartEnvironment Verification

```typescript
// Verifica uso envConfig.isDevelopment per debug conditional

if (envConfig.isDevelopment) {
  logger.debug('[NomeComponente] Debug info', { data });
}

// ✅ Debug logs SOLO in development, NON in production
```

### 5.14 Build Production Test (Opzionale ma Raccomandato)

```bash
# 1. Clean build
rm -rf dist/ node_modules/.vite .quasar

# 2. Build production
yarn build

# Output atteso:
# ✓ built in XXXXms
# dist/spa/index.html                XX.XX kB
# dist/spa/assets/index-XXXXX.js     XXX.XX kB / gzip: XX.XX kB
# dist/spa/assets/i18n-XXXXX.js      XX.XX kB  ← Verifica questo file

# 3. Serve build
quasar serve dist/spa
# OR
npx serve dist/spa

# 4. Apri http://localhost:XXXX e testa come Step 5.6-5.7
```

**Verifica Build**:

- ✅ i18n translations incluse nel bundle
- ✅ NO chiavi i18n visibili in produzione
- ✅ Switch IT/EN funziona in produzione
- ✅ Bundle size ragionevole (confronta prima/dopo traduzione)

---

## ✅ STEP 6: Build e Deploy

### 6.1 Clean Build

```bash
# Pulisci cache Vite e build artifacts
rm -rf dist/ node_modules/.vite .quasar

# Rebuild completo
yarn build

# Output atteso:
# vite v5.x.x building for production...
# ✓ XXX modules transformed.
# dist/spa/index.html                  X.XX kB │ gzip: X.XX kB
# dist/spa/assets/index-XXXXX.js     XXX.XX kB │ gzip: XX.XX kB
# dist/spa/assets/i18n-XXXXX.js       XX.XX kB │ gzip: XX.XX kB  ← i18n bundle
# ✓ built in XXXXms
```

### 6.2 Verifica Build Output

#### 6.2.1 Check i18n Bundle Inclusion

```bash
# Lista file assets per verificare i18n bundle
ls -lh dist/spa/assets/

# Cerca file i18n-*.js (deve esistere)
ls dist/spa/assets/ | grep i18n

# Output atteso:
# i18n-XXXXX.js  ← Questo file contiene traduzioni
```

#### 6.2.2 Inspect i18n Bundle Content

```bash
# Verifica che namespace 'nc' sia incluso nel bundle
grep -o '"nc"' dist/spa/assets/i18n-*.js | wc -l

# Output atteso: > 0 (namespace presente)

# Verifica chiavi specifiche
grep -o '"title"' dist/spa/assets/i18n-*.js | wc -l

# Output atteso: > 0
```

### 6.3 Test in Produzione Locale

```bash
# Serve build di produzione
quasar serve dist/spa

# OR (se quasar serve non disponibile)
npx serve dist/spa -p 9000

# Output:
# Serving dist/spa on http://localhost:9000
```

### 6.4 Production Testing Checklist

| Test                              | Expected Result                     | Status |
| --------------------------------- | ----------------------------------- | ------ |
| 1. Open http://localhost:9000     | App loads                           | ☐      |
| 2. Navigate to component          | Component renders                   | ☐      |
| 3. Verify Italian translations    | All text in Italian                 | ☐      |
| 4. Switch to English              | All text in English                 | ☐      |
| 5. NO i18n keys visible           | NO 'nc.title' strings               | ☐      |
| 6. Form interactions work         | Calculate/Reset functional          | ☐      |
| 7. Expansion sections work        | All 9 sections expand/collapse      | ☐      |
| 8. Console: NO errors             | Browser console clean               | ☐      |
| 9. Network: i18n loaded           | i18n-\*.js file loaded successfully | ☐      |
| 10. Responsive: Mobile/Desktop OK | Layouts adapt correctly             | ☐      |

### 6.5 Bundle Size Analysis (Opzionale)

```bash
# Analisi dimensioni bundle
yarn build --analyze

# OR usa vite-bundle-visualizer
npx vite-bundle-visualizer

# Verifica:
# - i18n bundle size ragionevole (~10-50KB per componente medio)
# - NO duplicazioni di traduzioni
# - Tree-shaking funzionante (unused code rimosso)
```

### 6.6 Deploy (Firebase/Vercel/Netlify)

#### 6.6.1 Firebase Deploy

```bash
# Installa Firebase CLI (se necessario)
npm install -g firebase-tools

# Login Firebase
firebase login

# Deploy
firebase deploy --only hosting

# Output atteso:
# ✔  Deploy complete!
# Project Console: https://console.firebase.google.com/project/YOUR_PROJECT
# Hosting URL: https://YOUR_PROJECT.web.app
```

#### 6.6.2 Vercel Deploy

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Output atteso:
# 🔗  Production: https://your-project.vercel.app
```

#### 6.6.3 Netlify Deploy

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist/spa

# Output atteso:
# ✔ Deploy is live!
# Website URL: https://your-site.netlify.app
```

### 6.7 Post-Deploy Verification

```
1. Open production URL
2. Test IT locale ................................. ☐ PASS / ☐ FAIL
3. Test EN locale ................................. ☐ PASS / ☐ FAIL
4. Test all form interactions ..................... ☐ PASS / ☐ FAIL
5. Test all expansion sections .................... ☐ PASS / ☐ FAIL
6. Test mobile responsive ......................... ☐ PASS / ☐ FAIL
7. Console errors check ........................... ☐ NO ERRORS
8. Network errors check ........................... ☐ NO ERRORS
9. Lighthouse score (Performance/Accessibility) ... ☐ > 90
10. Share with team for UAT ....................... ☐ DONE
```

---

## 📊 Riassunto Veloce

| Step | Azione                                   | Obbligatorio?  | Tempo Stimato | Nota                                                  |
| ---- | ---------------------------------------- | -------------- | ------------- | ----------------------------------------------------- |
| 1    | Crea file `it-IT/nome.ts`                | ✅ Sì          | 30-60 min     | Struttura traduzioni IT con 9 sezioni mediche         |
| 1    | Crea file `en-US/nome.ts`                | ✅ Sì          | 30-60 min     | Traduzioni EN parallele (struttura identica)          |
| 1B   | **Rimozione emoji automatizzata**        | ✅ Sì          | 1 min         | `find + sed` command, verifica con `grep`             |
| 2    | Aggiungi import in `index.ts`            | ⚠️ Non basta!  | 2 min         | Può non funzionare senza Step 3                       |
| 3    | **INJECTION in `boot/i18n.ts`**          | 🚨 **CRITICO** | 5 min         | **Senza questo NON funziona!** (tree-shaking issue)   |
| 4    | Usa `useI18n()` nel componente           | ✅ Sì          | 10 min        | Destructure `t()`, add useSecureLogger                |
| 4    | **Aggiungi JSDoc completo**              | ✅ Sì          | 20-30 min     | Tutte funzioni pubbliche + interfaces                 |
| 4    | **Traduci INCREMENTALMENTE (8-12 fasi)** | ✅ Sì          | 2-3 ore       | **Sezione per sezione** (max 10-15 sostituzioni/fase) |
| 5    | **Validazione completa**                 | ✅ Sì          | 15-20 min     | TypeScript + Lint + Browser test IT/EN                |
| 6    | Build + Test produzione                  | ✅ Sì          | 10-15 min     | Verifica bundle size + deploy                         |

**Tempo Totale Stimato (Approccio Incrementale)**:

- **Componente piccolo** (150-300 righe): 1-1.5 ore
- **Componente medio** (400-700 righe): 3-4 ore
- **Componente grande** (1000-2000 righe): 8-10 ore

**⚠️ IMPORTANTE**: Usa **traduzione incrementale** (Step 4) per componenti >300 righe per evitare context overflow e errori a cascata.

---

## ⚡ Workflow Patterns Automatizzati

### ⚠️ Pattern 0: SEMPRE Usa Approccio Incrementale (v2.1)

**REGOLA OBBLIGATORIA**: Per componenti >300 righe template, **NON** tradurre tutto in una volta.

```typescript
// ❌ SBAGLIATO: Multi-replace con 50+ sostituzioni
multi_replace_string_in_file({
  replacements: [
    // ... 50-100 sostituzioni simultanee
  ],
});
// PROBLEMA: Context overflow, errori a cascata, debug impossibile

// ✅ CORRETTO: Traduzione INCREMENTALE in 8-12 fasi
// Fase 1: Titoli + Form (10-15 sostituzioni)
multi_replace_string_in_file({
  explanation: 'Fase 1/12: Traduci titoli, form, bottoni',
  replacements: [
    /* max 10-15 sostituzioni */
  ],
});
// → get_errors() → Browser test → ✅ OK

// Fase 2: Risultati + Interpretazioni (10-15 sostituzioni)
multi_replace_string_in_file({
  explanation: 'Fase 2/12: Traduci risultati e interpretazioni',
  replacements: [
    /* max 10-15 sostituzioni */
  ],
});
// → get_errors() → Browser test → ✅ OK

// Fase 3-12: Una sezione medica alla volta
// Ogni fase: replace_string_in_file + checkpoint
```

**Vedi sezione "🔥 NUOVA SEZIONE: Traduzione INCREMENTALE (v2.1)" per dettagli completi.**

---

### Pattern 1: multi_replace_string_in_file per Micro-Batch

**Usa SOLO per micro-batch** (max 10-15 sostituzioni):

```typescript
// ✅ CORRETTO: Sostituisci 10 elementi correlati (stesso contesto)
multi_replace_string_in_file({
  explanation: 'Replace form field labels (Fase 1 - Form section)',
  replacements: [
    {
      filePath: '/path/to/Component.vue',
      oldString: `              label="Parametro 1"
              suffix="mg"`,
      newString: `              :label="t('nc.form.param1Label')"
              :suffix="t('nc.form.param1Unit')"`,
      explanation: 'Replace Param 1 label + unit',
    },
    {
      filePath: '/path/to/Component.vue',
      oldString: `              label="Parametro 2"
              suffix="kg"`,
      newString: `              :label="t('nc.form.param2Label')"
              :suffix="t('nc.form.param2Unit')"`,
      explanation: 'Replace Param 2 label + unit',
    },
    // ... max 8-10 altri campi simili
  ],
});
```

**Limiti raccomandati**:

- ✅ **Max 10-15 replacements** per chiamata
- ✅ **Stesso contesto** (es. tutti form fields, o tutti bottoni)
- ✅ **Checkpoint dopo ogni chiamata** (get_errors + browser test)

**Vantaggi micro-batch**:

- ✅ Context ridotto (<5000 token per operazione)
- ✅ Error isolation (errore non impatta altre fasi)
- ✅ Rollback granulare

### Pattern 2: grep_search per Finding Hardcoded Text

Prima di sostituire, usa `grep_search` per trovare TUTTE le istanze di testo hardcoded:

```bash
# Cerca tutti i label hardcoded in sezioni espandibili
grep_search({
  query: 'label="[0-9]️⃣.*"',
  isRegexp: true,
  includePattern: 'src/components/ClinicalAssessment/*.vue'
});

# Output: Lista completa di match con file:linea
# Usa output per creare lista replacements
```

### Pattern 3: Parallel Read Operations

Per analizzare struttura di più file tradotti, leggi in parallelo:

```typescript
// Leggi contemporaneamente IT e EN per confronto
Promise.all([
  read_file({ filePath: 'src/i18n/it-IT/component.ts', startLine: 1, endLine: 100 }),
  read_file({ filePath: 'src/i18n/en-US/component.ts', startLine: 1, endLine: 100 }),
]);
```

### Pattern 4: Template Automation - Medical Calculator Standard

```typescript
// Template base per nuovo medical calculator (copy-paste e modifica)
const medicalCalculatorTemplate = {
  title: '[Nome Calcolatore]',
  subtitle: '[Sottotitolo descrittivo]',

  banner: {
    title: '[Titolo Banner]:',
    description: '[Descrizione breve]',
  },

  form: {
    sectionTitle: 'Parametri di Input',
    // Add specific fields here
  },

  buttons: {
    calculate: 'Calcola',
    save: 'Salva Calcolo',
    reset: 'Reset',
  },

  results: {
    title: 'Risultati',
    // Add specific result fields
  },

  interpretation: {
    normal: 'Range Normale',
    moderate: 'Attenzione Moderata',
    severe: 'Alert Critico',
  },

  sections: {
    definition: { title: 'Definizione e Significato Clinico', content: '' },
    physiology: { title: 'Fisiologia e Meccanismi' /* subsections */ },
    evaluation: { title: 'Come si Valuta' /* subsections */ },
    formula: { title: 'Formula e Calcolo', mainFormula: '', explanation: '' },
    clinicalInterpretation: { title: 'Interpretazione Clinica Dettagliata' /* subsections */ },
    clinicalApplications: { title: 'Applicazioni Cliniche' /* subsections */ },
    referenceValues: { title: 'Valori di Riferimento e Alert' /* subsections */ },
    documentation: { title: 'Documentazione e Linee Guida' /* subsections */ },
    bibliography: { title: 'Bibliografia e Riferimenti Scientifici' /* references */ },
  },
};
```

### Pattern 5: Component-Specific Translation Workflow

```bash
# Step-by-step workflow per nuovo componente
# (Copy-paste questi comandi in sequenza)

# 1. Create i18n files (use template)
# 2. Add to index.ts (import)
# 3. Manual injection in boot/i18n.ts
# 4. Replace template text with grep + multi_replace
# 5. Remove emojis
find src/components -name "NewComponent.vue" -exec sed -i 's/[0-9]️⃣ //g' {} \;

# 6. Verify emoji removal
grep -r "️⃣" src/components/NewComponent.vue | wc -l  # Must be 0

# 7. Add JSDoc to all functions
# 8. Validate TypeScript
npx vue-tsc --noEmit

# 9. Validate Lint
npm run lint

# 10. Browser test (dev server)
yarn dev
```

---

## 🐛 Troubleshooting Completo

### Problema 1: Vedo `nc.title` invece di "Titolo Componente"

**Sintomo**: `t('nc.title')` ritorna `'nc.title'` invece del testo tradotto

**Diagnosi**:

```javascript
// In browser console:
import { useI18n } from 'vue-i18n';
const { messages, locale } = useI18n();
console.log('nc' in messages.value[locale.value]); // false → PROBLEMA!
```

**Causa**: Il namespace `nc` **NON è stato iniettato** nel boot file (Step 3)

**Soluzione**: Aggiungi injection manuale in `src/boot/i18n.ts`:

```typescript
import nomeComponenteIT from 'src/i18n/it-IT/nomeComponente';
import nomeComponenteEN from 'src/i18n/en-US/nomeComponente';

const itITWithCalculators = {
  ...itIT,
  // ... altri namespace
  nc: nomeComponenteIT, // ← AGGIUNGI QUESTO!
};

const enUSWithCalculators = {
  ...enUS,
  nc: nomeComponenteEN, // ← AGGIUNGI QUESTO!
};
```

---

### Problema 2: Build Fallisce con Errore TypeScript

**Sintomo**:

```
src/components/NomeComponente.vue:45:12 - error TS2345:
Argument of type 'string' is not assignable to parameter of type 'number'.
```

**Causa**: Annotazioni di tipo mancanti o errate

**Soluzione**:

1. Verifica che ogni file i18n abbia `export default { ... }`
2. Controlla import circolari
3. Aggiungi type annotations esplicite:

```typescript
// ❌ SBAGLIATO: Implicit any
const result = ref(null);

// ✅ CORRETTO: Explicit type
const result = ref<ResultData | null>(null);
```

4. Pulisci cache e ricompila:

```bash
rm -rf .quasar node_modules/.vite
npx vue-tsc --noEmit
```

---

### Problema 3: Emoji Ancora Visibili Dopo Rimozione

**Sintomo**: Vedo ancora `1️⃣`, `2️⃣` nel browser

**Diagnosi**:

```bash
# Conta emoji rimanenti
grep -r "️⃣" src/components --include="*.vue" | wc -l

# Output: > 0 (emoji ancora presenti!)
```

**Soluzione**:

```bash
# 1. Rimuovi emoji con find (più affidabile)
find src/components -name "*.vue" -exec sed -i 's/[0-9]️⃣ //g' {} \;

# 2. Verifica rimozione
grep -r "️⃣" src/components --include="*.vue" | wc -l

# 3. Se ancora presenti, verifica encoding file
file src/components/Component.vue  # Deve essere UTF-8

# 4. Se encoding diverso, converti
iconv -f ISO-8859-1 -t UTF-8 Component.vue > Component_utf8.vue
mv Component_utf8.vue Component.vue
```

---

### Problema 4: Interpolazione Non Funziona

**Sintomo**: Vedo `Salva {time} min` invece di `Salva 1 min`

**Causa**: Sintassi interpolazione errata

**Soluzione**:

```vue
<!-- ❌ SBAGLIATO: Variabile NON in oggetto -->
{{ t('nc.buttons.save', currentTime) }}

<!-- ✅ CORRETTO: Variabile in oggetto con key matching placeholder -->
{{ t('nc.buttons.save', { time: currentTime }) }}

<!-- i18n file deve avere: -->
buttons: { save: 'Salva {time} min', // ← {time} placeholder }
```

---

### Problema 5: HTML Non Renderizzato

**Sintomo**: Vedo `<strong>Testo</strong>` letteralmente invece di **Testo**

**Causa**: Uso `{{ t() }}` invece di `v-html`

**Soluzione**:

```vue
<!-- ❌ SBAGLIATO: {{ t() }} con HTML -->
<div>{{ t('nc.sections.definition') }}</div>
<!-- Output: <strong>Definizione</strong> (testo letterale) -->

<!-- ✅ CORRETTO: v-html per HTML content -->
<div v-html="t('nc.sections.definition')"></div>
<!-- Output: Definizione (bold) -->
```

**⚠️ ATTENZIONE**: Usa `v-html` SOLO per contenuti sicuri (traduzioni controllate). MAI per input utente (XSS risk).

---

### Problema 6: Switch Lingua Non Funziona

**Sintomo**: Click su switch lingua ma testi rimangono in italiano

**Diagnosi**:

```typescript
// In componente, aggiungi watcher temporaneo:
import { watch } from 'vue';
const { locale } = useI18n();

watch(locale, (newLocale) => {
  console.log('[i18n] Locale changed to:', newLocale);
  console.log('[i18n] Current messages:', messages.value[newLocale]);
});

// Verifica che locale cambi correttamente
```

**Causa Comune**: Namespace non iniettato per seconda lingua

**Soluzione**: Verifica in `boot/i18n.ts` che ENTRAMBI i locale abbiano namespace:

```typescript
const itITWithCalculators = {
  ...itIT,
  nc: nomeComponenteIT, // ← IT injection
};

const enUSWithCalculators = {
  ...enUS,
  nc: nomeComponenteEN, // ← EN injection (non dimenticare!)
};
```

---

### Problema 7: Lint Errors per Unused Variables

**Sintomo**:

```
45:12  error  'logger' is assigned a value but never used  no-unused-vars
```

**Causa**: useSecureLogger dichiarato ma non usato

**Soluzione**:

```typescript
// ❌ SBAGLIATO: Logger non usato
const { logger } = useSecureLogger();
// Nessuna chiamata logger.info/warn/debug

// ✅ CORRETTO: Rimuovi se non usi
// const { logger } = useSecureLogger();

// ✅ OPPURE: Usa logger per debug
logger.debug('[Component] Initialized', { data });
```

**Fix Automatico**:

```bash
npm run lint -- --fix
```

---

### Problema 8: Performance - Bundle Size Troppo Grande

**Sintomo**: Build output mostra `i18n-XXXXX.js` > 200KB

**Diagnosi**:

```bash
# Analizza bundle
yarn build --analyze

# Controlla dimensione singoli namespace
grep -o '"nc"' dist/spa/assets/i18n-*.js | wc -l
```

**Cause Comuni**:

1. Traduzioni duplicate (IT/EN non ottimizzate)
2. Contenuto medico troppo verboso in i18n files
3. Tree-shaking non funzionante

**Soluzione**:

1. **Lazy loading i18n** (per progetti molto grandi):

```typescript
// boot/i18n.ts - Carica namespace on-demand
const messages = {
  'it-IT': () => import('src/i18n/it-IT'),
  'en-US': () => import('src/i18n/en-US'),
};
```

2. **Split contenuti medici pesanti**:

```typescript
// Invece di mettere tutto in i18n, usa file MD esterni per documentazione lunga
sections: {
  bibliography: {
    title: 'Bibliografia',
    // ❌ EVITA: Contenuto lunghissimo inline
    // reference1: '[5000 caratteri di testo]'

    // ✅ MEGLIO: Link a file esterno
    reference1: 'See /docs/bibliography.md',
  }
}
```

---

### Problema 9: Console Warnings in Development

**Sintomo**: Browser console mostra `[Vue warn] Missing required prop`

**Causa**: Props obbligatori non passati a componenti

**Soluzione**: Verifica props in component definition:

```typescript
// Component.vue
interface Props {
  requiredProp: string; // ← Deve essere sempre passato
  optionalProp?: number; // ← Opzionale
}

const props = withDefaults(defineProps<Props>(), {
  optionalProp: 0, // Default value
});
```

**Chiamata componente**:

```vue
<NomeComponente
  :required-prop="value"  <!-- ✅ Obbligatorio -->
  :optional-prop="123"    <!-- ✅ Opzionale -->
/>
```

---

### Problema 10: Get Errors Tool Mostra Errori Dopo Validazione

**Sintomo**: `get_errors` ritorna errori anche dopo `npx vue-tsc --noEmit` passa

**Causa**: VS Code Language Server cache non aggiornato

**Soluzione**:

```bash
# 1. Restart TypeScript Language Server in VS Code
# Command Palette (Ctrl+Shift+P): "TypeScript: Restart TS Server"

# 2. Pulisci cache VS Code
rm -rf .vscode/.tsbuildinfo

# 3. Pulisci cache Vite
rm -rf node_modules/.vite

# 4. Ricompila
npx vue-tsc --noEmit
```

---

## 📚 Esempi Completi da Progetto

### Esempio 1: APGARScoreCalculator (320 righe i18n)

**Caratteristiche**:

- 5 parametri APGAR con 3 opzioni ciascuno (15 traduzioni parametri)
- 9 sezioni espandibili (Definition, Physiology, Evaluation, Formula, Interpretation, Applications, Reference Values, Documentation, Bibliography)
- Interpolazione variabili: `{{ t('apgar.buttons.save', { time: currentTime }) }}`
- 5 riferimenti PMID in bibliografia

**File**:

- i18n: `src/i18n/it-IT/apgarScore.ts` (271 righe)
- i18n: `src/i18n/en-US/apgarScore.ts` (271 righe)
- Component: `src/components/ClinicalAssessment/APGARScoreCalculator.vue` (736 righe)
- Boot injection: `src/boot/i18n.ts` (linee 6-8, 12-22)

**Pattern Usati**:

```typescript
// Interpolazione tempo valutazione
{{ t('apgar.buttons.save', { time: currentTime }) }}  // → "Salva 1 min"

// Nested structure per parametri
{{ t('apgar.parameters.appearance.title') }}  // → "A - Appearance (Colorito)"
{{ t('apgar.parameters.appearance.options.score0') }}  // → "Blu, pallido"

// HTML content in sezioni
v-html="t('apgar.sections.definition.content')"
```

---

### Esempio 2: MechanicalPowerCalculator (717 righe i18n)

**Caratteristiche**:

- Calculator ventilazione meccanica (parametri: VT, RR, Ppeak, Pplateau, PEEP, Flow)
- 9 sezioni mediche dettagliate con sottosezioni nested
- Riferimenti scientifici: Gattinoni 2016, Serpa Neto 2018, Cressoni 2016 (PMID)
- Contenuto medico complesso (VILI mechanisms, MP threshold, protective ventilation)

**File**:

- i18n: `src/i18n/it-IT/mechanicalPower.ts` (717 righe)
- Component: `src/components/IntensiveCare/MechanicalPowerCalculator.vue`
- Namespace: `mp` (abbreviazione MechanicalPower)

**Pattern Usati**:

```typescript
// Nested subsections (3 livelli)
{{ t('mp.physiology.mechanicsTitle') }}  // → "Meccanica Respiratoria Normale vs ARDS"
{{ t('mp.physiology.viliMechanisms.volutrauma.title') }}  // → "Volutrauma"
{{ t('mp.physiology.viliMechanisms.volutrauma.text') }}  // → [Long clinical text]

// Formule con HTML markup
v-html="t('mp.formula.simplifiedFormula')"
// → "MP = 0.098 × RR × VT × (P<sub>peak</sub> - ½ΔP)"
```

---

### Esempio 3: RespiratoryQuotientCalculator (652 righe i18n)

**Caratteristiche**:

- Calcolo QR (VCO2/VO2) per valutazione metabolica
- 7 parametri ematochimici (PvCO2, PaCO2, HB, SaO2, SvO2, PaO2, PvO2)
- Validazione complessa (SaO2 ≥ SvO2, PaO2 ≥ PvO2)
- Alert critici condizionali (QR > 1.2 → metabolismo anaerobico)

**File**:

- i18n: `src/i18n/it-IT/respiratoryQuotient.ts` (660 righe)
- Namespace: `qr` (abbreviazione RespiratoryQuotient)

**Pattern Usati**:

```typescript
// Validation errors con interpolazione
{{ t('qr.validationErrors.sao2Error', { sao2: sao2Value, svo2: svo2Value }) }}
// → "• SaO2 (98%) deve essere ≥ SvO2 (75%)"

// Conditional alerts
<q-banner v-if="qrValue > 1.2">
  <strong>{{ t('qr.alerts.criticalHigh.title') }}</strong>  // → "ATTENZIONE:"
  {{ t('qr.alerts.criticalHigh.text') }}  // → "QR > 1.2 → Metabolismo anaerobico"
</q-banner>

// Interpretazione dinamica
{{ t(`qr.interpretation.${getInterpretation(qrValue)}`) }}
// Se qrValue = 0.85 → t('qr.interpretation.normalRange') → "Range Normale - Dieta Mista"
```

---

## 🎯 Regola d'Oro

> **Se aggiungi un nuovo namespace i18n, DEVI aggiungerlo manualmente nel file `src/boot/i18n.ts`!**
>
> Senza l'injection manuale, Vue i18n NON caricherà le traduzioni, anche se i file esistono!

---

## ✅ Checklist Finale Pre-Commit

```bash
# Prima di fare commit, verifica TUTTI questi punti:

# 1. i18n files creati (IT + EN)
[ ] src/i18n/it-IT/nomeComponente.ts esiste
[ ] src/i18n/en-US/nomeComponente.ts esiste
[ ] Struttura IT/EN identica (stesse chiavi)
[ ] JSDoc header completo in entrambi i file

# 2. Namespace injection
[ ] Import diretto in boot/i18n.ts (IT)
[ ] Import diretto in boot/i18n.ts (EN)
[ ] Manual injection in itITWithCalculators
[ ] Manual injection in enUSWithCalculators

# 3. Component updates
[ ] useI18n() importato
[ ] useSecureLogger() importato (NO console.log!)
[ ] useSmartEnvironment() importato
[ ] Tutte funzioni hanno JSDoc completo
[ ] Template usa t() per TUTTI i testi
[ ] Interpolazioni corrette: {{ t('key', { var }) }}
[ ] HTML content usa v-html

# 4. Emoji removal
[ ] Eseguito comando find + sed
[ ] Verificato con grep (output = 0)

# 5. Validazione
[ ] npx vue-tsc --noEmit → 0 errors
[ ] npm run lint → 0 errors
[ ] get_errors tool → No errors
[ ] Browser test IT locale → OK
[ ] Browser test EN locale → OK
[ ] Tutti form interactions funzionanti
[ ] Tutte sezioni espandibili traducibili
[ ] Responsive test mobile/desktop → OK

# 6. Build production
[ ] yarn build → Success
[ ] i18n bundle incluso (grep check)
[ ] Production serve → Test OK

# 7. Documentation
[ ] README aggiornato (se necessario)
[ ] Commit message follows Conventional Commits
[ ] No debug code rimasto (console.log, debug comments)

# SE TUTTI ✅ → PRONTO PER COMMIT!
```

---

## 🎓 Best Practices Summary (v2.1 - Incremental Translation)

### ✅ DO (Raccomandato)

1. **Traduzione Incrementale**: 8-12 fasi (max 10-15 sostituzioni/fase)
2. **Checkpoint dopo ogni fase**: get_errors() + browser test
3. **Manual injection** nel boot file (Step 3 obbligatorio)
4. **JSDoc completo** per tutte le funzioni pubbliche
5. **useSecureLogger** invece di console.log (GDPR compliance)
6. **useSmartEnvironment** per environment detection
7. **Rimozione emoji** automatizzata (find + sed)
8. **Validazione completa** prima del commit (TypeScript + Lint + Browser)
9. **Struttura IT/EN identica** (solo traduzioni cambiano)
10. **Traduci TUTTO** (app bilingue al 100%)

### ❌ DON'T (Evita)

1. ❌ **Traduzione "all-in-one"** (>20 sostituzioni simultanee)
2. ❌ **Saltare injection manuale** (Step 3 → traduzione non funziona!)
3. ❌ **Testo hardcoded** nel template (usa sempre t())
4. ❌ **console.log** per logging (GDPR violation)
5. ❌ **Emoji decorativi** in testi clinici (non professionale)
6. ❌ **Testi in lingua opposta** (IT file = 100% italiano, EN file = 100% inglese)
7. ❌ **Commit senza validazione** (TypeScript + Lint obbligatori)
8. ❌ **Debug code in produzione** (rimuovi prima del commit)
9. ❌ **Struttura IT/EN diverse** (chiavi devono essere identiche)
10. ❌ **Traduzioni parziali** (TUTTO deve essere tradotto)

### 🎯 Quick Decision Tree

**Dimensione componente?**

- **<300 righe** → Traduzione in 3-5 fasi (1-1.5 ore)
- **300-700 righe** → Traduzione in 6-8 fasi (3-4 ore)
- **>1000 righe** → Traduzione in 10-12 fasi (8-10 ore)

**Quante sostituzioni per fase?**

- **Ideale**: 8-12 sostituzioni
- **Max accettabile**: 15 sostituzioni
- **⚠️ Limite critico**: 20 sostituzioni (oltre = context overflow)

**Quando usare multi_replace vs replace_string?**

- **multi_replace**: Elementi correlati (es. tutti form fields) - max 10-15
- **replace_string**: Sezione intera (es. expansion item completo) - 1 alla volta

### 📊 Metriche di Successo

**Componente tradotto correttamente se**:

- ✅ TypeScript: 0 errori (`npx vue-tsc --noEmit`)
- ✅ Lint: 0 warnings (`npm run lint`)
- ✅ Emoji: 0 istanze (`grep -r "️⃣" | wc -l` → 0)
- ✅ Browser IT: Tutte le sezioni visibili in italiano
- ✅ Browser EN: Tutte le sezioni visibili in inglese
- ✅ Locale switch: IT ↔ EN funziona istantaneamente
- ✅ Console browser: 0 errori JavaScript
- ✅ Network: i18n bundle caricato correttamente
- ✅ Build prod: Bundle size ragionevole (<500KB/componente)
- ✅ JSDoc: Tutte le funzioni documentate

### 🚀 Workflow Veloce (Copy-Paste Checklist)

```bash
# 1. Crea file i18n (IT + EN)
# 2. Aggiungi import in index.ts
# 3. Manual injection in boot/i18n.ts

# 4. Traduzione INCREMENTALE (8-12 fasi)
# Fase 1: Titoli + Form
# → get_errors() → browser test → ✅
# Fase 2: Risultati + Interpretazioni
# → get_errors() → browser test → ✅
# Fase 3-12: Sezioni mediche (una alla volta)
# → get_errors() → browser test → ✅

# 5. Rimozione emoji
find src/components -name "ComponentName.vue" -exec sed -i 's/[0-9]️⃣ //g' {} \;
grep -r "️⃣" src/components/ComponentName.vue | wc -l  # → 0

# 6. Validazione finale
npx vue-tsc --noEmit  # → 0 errors
npm run lint          # → 0 warnings
yarn dev              # → Browser test IT + EN

# 7. Build production
yarn build
quasar serve dist/spa

# 8. Commit
git add .
git commit -m "feat(i18n): add ComponentName translations (IT/EN)"
```

### 📝 Template Commit Message

```
feat(i18n): add [ComponentName] complete translations (IT/EN)

- Created it-IT/[componentName].ts (250+ lines, 9 medical sections)
- Created en-US/[componentName].ts (parallel structure)
- Manual namespace injection in boot/i18n.ts
- Template translation: [X] sections, [Y] total keys
- Added JSDoc documentation for all public functions
- useSecureLogger + useSmartEnvironment integration
- Emoji removal automation applied
- Validation: TypeScript ✅ | Lint ✅ | Browser IT/EN ✅

Closes #[issue-number]
```

---

## 📖 Ulteriori Risorse

### Documentazione Interna

- **`.rules-copilot-medical.md`**: Standard enterprise completi (810 righe)
- **`IMPLEMENTATION_GUIDE.md`**: Guida implementazione progetto
- **`I18N_SETUP_GUIDE.md`**: Questa guida (versione 2.0)

### Esempi Codice

- **`src/components/ClinicalAssessment/APGARScoreCalculator.vue`**: Esempio 320 righe i18n
- **`src/components/IntensiveCare/MechanicalPowerCalculator.vue`**: Esempio 717 righe i18n
- **`src/components/IntensiveCare/RespiratoryQuotientCalculator.vue`**: Esempio 652 righe i18n
- **`src/boot/i18n.ts`**: Pattern namespace injection

### Documentazione Esterna

- **Vue i18n v9**: https://vue-i18n.intlify.dev/
- **Quasar i18n**: https://quasar.dev/options/app-internationalization
- **Vite Tree-shaking**: https://vitejs.dev/guide/features#tree-shaking
- **TypeScript Strict Mode**: https://www.typescriptlang.org/tsconfig#strict

---

## 📝 Change Log

### v2.0 (2025-12-13)

**MAJOR UPDATE - 100% Autonomous Translation**

- ✅ Added comprehensive medical calculator structure template (9 standard sections)
- ✅ Added STEP 1B: Automated emoji removal with sed commands
- ✅ Enhanced STEP 3: Detailed tree-shaking explanation + verification debug
- ✅ Added STEP 4: Complete JSDoc requirements per .rules-copilot-medical.md
- ✅ Expanded STEP 4: 10+ t() pattern examples with error cases
- ✅ Added STEP 5: Comprehensive validation checklist (10 checkpoints)
- ✅ Enhanced troubleshooting: 10 common problems with detailed solutions
- ✅ Added workflow automation patterns (multi_replace, grep_search, parallel reads)
- ✅ Added 3 complete examples (APGAR 320L, MP 717L, QR 652L)
- ✅ Added final pre-commit checklist (40+ verification points)
- ✅ Added Quick Reference Commands section at top
- ✅ Expanded from 345 lines to 1900+ lines (5.5x more comprehensive)

**Result**: Guide now enables **100% autonomous component translation** from start to finish without user intervention.

### v1.0 (2025-12-12)

- Initial version
- 7-step basic process
- Emphasis on STEP 3 namespace injection
- 345 lines

---

**Creato**: 2025-12-12  
**Autore**: Vasile Chifeac  
**Versione**: 2.0  
**Ultimo Aggiornamento**: 2025-12-13

---

## 🚀 Ready to Translate!

Con questa guida aggiornata, puoi ora tradurre **qualsiasi componente medico al 100%** in modo autonomo, seguendo i processi consolidati da APGARScoreCalculator, MechanicalPowerCalculator e RespiratoryQuotientCalculator.

**Buona traduzione! 🌍**
