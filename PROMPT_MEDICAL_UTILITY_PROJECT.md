# 🏥 PROMPT PROGETTO MEDICAL UTILITY APP - CONTINUE.DEV

## 📋 RIASSUNTO SESSIONE PRECEDENTE

**OBIETTIVO COMPLETATO:**

- ✅ Setup server NYK-AI-V1 completo (Ubuntu 24.04, Docker, Node.js, Python)
- ✅ Ollama installato con modelli Llama 3.2 3B (chat) + CodeLlama 7B (autocomplete)
- ✅ Continue.dev configurato in VS Code con Tailscale (funziona locale + remoto)
- ✅ ChromaDB con 12,222 documenti AI/ML caricati
- ✅ Progetto Quasar/TypeScript generato: `/home/nyk-ai/projects/medicalUtility`
- ✅ **Smart Environment System** - Auto-detection dev/prod con ottimizzazione costi
- ✅ **Google Apps Script v2.2.0** - Sistema gestione compatibilità farmaci con BULK mode
- ✅ **Professional Logging** - useSecureLogger + useSecureFirestore integrati

**STACK CONFIGURATO:**

- **Frontend:** Quasar Framework + Vue 3 + TypeScript + Yarn
- **AI Assistant:** Continue.dev con Ollama locale (Llama 3.2 3B + CodeLlama 7B)
- **Server:** Ubuntu 24.04 @ 192.168.1.21 (WiFi) / 100.79.173.86 (Tailscale)
- **Accesso:** SSH port 2222, VS Code Remote-SSH
- **Google Sheets:** Database compatibilità farmaci (156 drugs target) 🆕
- **Logging:** Sistema professionale GDPR-compliant integrato 🆕

---

## 🎯 PROGETTO MEDICAL UTILITY APP

### **DESCRIZIONE:**

App medica con utilities per professionisti sanitari, layout a griglia come screenshot Brave browser allegato (3x4 cards colorate con icone).

### **FUNZIONALITÀ TARGET:**

1. **Homepage:** Griglia cards responsive (3 colonne)
2. **Calcolatrici Mediche:**
   - BMI Calculator (Body Mass Index)
   - Dosaggio Farmaci (dose/peso/età)
   - GFR Calculator (filtrato glomerulare renale)
   - APGAR Score (valutazione neonatale)
   - Mechanical Power (ventilazione meccanica)
   - Quoziente Respiratorio (gas exchange)
3. **Compatibilità Farmaci:** 🆕 Sistema completo con Google Apps Script
   - **Database:** 156 farmaci IV (target finale)
   - **Google Sheets:** https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k
   - **BULK Mode:** 10x più veloce dell'inserimento singolo
   - **Compatibilità:** C (compatible), Y (Y-site), I (incompatibile), ! (dati contrastanti)
   - **Via Somministrazione:** Centrale/Periferica con note cliniche
4. **Design:** Medical theme (blu/verde/bianco), Material Design, responsive
5. **Smart Environment:** 🆕 Auto-detection dev/prod, costi €0 in development

### **STRUTTURA PROGETTO:**

```
/home/nyk-ai/projects/medicalUtility/
├── src/
│   ├── pages/           # IndexPage.vue (homepage), calcolatrici
│   ├── components/      # Cards, calcolatrici, UI components
│   ├── composables/     # 🆕 useSecureLogger, useSmartEnvironment
│   ├── firebase/        # 🆕 useSecureFirestore, firebaseInit
│   ├── layouts/         # Layout principale
│   ├── router/          # Routing Vue
│   └── stores/          # Pinia stores (dati app)
├── scripts/             # 🆕 Google Apps Script, Python tools
│   ├── google-sheets-interface.gs  # v2.2.0 - BULK mode UI
│   ├── export_compatibility_to_google_sheets.py
│   └── extract_compatibility_from_pdf.py
├── docs/                # 🆕 Documentazione completa
│   ├── DEPLOYMENT_GUIDE.md
│   ├── AUTO_DETECTION_SUMMARY.md
│   ├── GOOGLE_SHEETS_BULK_MODE_GUIDE.md
│   ├── DRUG_COMPATIBILITY_COMPLETION_GUIDE.md
│   └── CHANGELOG_GOOGLE_APPS_SCRIPT_v2.md
├── .env.development     # 🆕 Firebase dev config
├── .env.production      # 🆕 Firebase prod config
├── deploy.sh            # 🆕 Script deployment automatico
└── requirements.txt     # 🆕 Python dependencies
```

---

## 🚀 PROSSIME AZIONI

### **IMMEDIATE (ADESSO):**

1. **Apri progetto in VS Code:** `code ~/projects/medicalUtility`
2. **Testa Google Apps Script v2.2.0** con Continue.dev
3. **Completa database compatibilità farmaci** (156 drugs)
4. **Integra JSON export** in app TypeScript

### **SEQUENZA SVILUPPO:**

1. ✅ Homepage layout + griglia cards (COMPLETATO)
2. ✅ BMI Calculator (COMPLETATO)
3. ✅ GFR Calculator (COMPLETATO)
4. ✅ APGAR Score calculator (COMPLETATO)
5. ✅ Mechanical Power calculator (COMPLETATO)
6. ✅ Quoziente Respiratorio calculator (COMPLETATO)
7. 🔄 Compatibilità Farmaci - Google Sheets BULK mode (IN CORSO)
   - ✅ Google Apps Script v2.2.0 con "!" symbol + Via notes
   - ✅ BULK mode 10x più veloce
   - ⏳ Completamento 156 drugs (utente)
   - ⏳ Export JSON → TypeScript integration
8. ⏳ Testing + deployment Firebase
9. ⏳ Smart Environment production deploy

---

## 🤖 COME USARE CONTINUE.DEV

### **SETUP VERIFICATO:**

- ✅ Continue.dev installato in VS Code
- ✅ Config: `~/.continue/config.yaml` (laptop locale)
- ✅ Ollama API: `http://100.79.173.86:11434` (Tailscale)
- ✅ Modelli attivi:
  - 💬 **Llama 3.2 3B** (chat, edit, apply) - 2GB RAM
  - 💻 **CodeLlama 7B** (autocomplete) - 3.8GB RAM

### **PANNELLO CONTINUE (VS Code sinistra):**

```
🎯 CHAT TAB: Conversazione con AI
- Scrivi domande in italiano
- Chiedi codice, spiegazioni, debug
- L'AI usa la tua codebase come context

🔧 EDIT TAB: Modifica codice
- Seleziona codice da modificare
- Descrivi cambiamenti
- AI applica modifiche direttamente

💡 AUTOCOMPLETE: Attivo mentre scrivi
- CodeLlama 7B suggerisce automaticamente
- Tab per accettare suggerimenti
- Lavora in background
```

### **PROMPT EFFICACI PER MEDICAL APP:**

#### **🏠 Homepage Creation:**

```
Ciao! Sto creando una medical utility app in Quasar/TypeScript.

Devo fare l'homepage con una griglia di cards (3 colonne) per diverse utilities mediche:
- BMI Calculator
- Dosaggio Farmaci
- GFR Calculator
- APGAR Score
- Compatibilità Farmaci
- [altri 6-7 tools]

Ogni card deve avere:
- Icona colorata (medical theme)
- Titolo utility
- Sottotitolo descrizione
- Click navigation
- Hover effects

Design: Material Design, colori medical (blu/verde/bianco), responsive.

Puoi creare il componente IndexPage.vue con la griglia?
```

#### **🧮 Calculator Components:**

```
Aiutami a creare il BMI Calculator component in TypeScript:

Input:
- Peso (kg)
- Altezza (cm)
- Validazione input

Output:
- BMI value
- Categoria (sottopeso/normale/sovrappeso/obeso)
- Colori indicativi
- Chart/visual indicator

Design: Quasar form components, validazione real-time, responsive.
```

#### **💊 Drug Compatibility:**

```
Devo gestire il database compatibilità farmaci con Google Apps Script v2.2.0:

Funzionalità implementate:
- ✅ BULK Mode: inserisci TUTTE le compatibilità di un farmaco in una volta (10x più veloce)
- ✅ Searchable inputs: filtro dinamico invece di dropdown
- ✅ Cell colorization: C=verde, Y=arancione, I=rosso, !=giallo
- ✅ Via Somministrazione: gestione route con note cliniche
- ✅ Add new drug: inserimento alfabetico preservando dati
- ✅ Performance: batch operations (3-15 sec invece di 30-60 sec)

Prossimi passi:
1. Completare 156 drugs usando BULK mode
2. Export JSON da Google Sheets
3. Integrare in TypeScript app (src/data/drugs.ts)

Tech: Google Apps Script, HtmlService dialogs, TypeScript interfaces
```

#### **🧠 Smart Environment Detection:**

```
Il progetto usa auto-detection ambiente per switch automatico dev/prod:

Features:
- Auto-detect hostname (localhost vs Firebase)
- Carica .env.development o .env.production automaticamente
- Remote logging DISABLED in dev (€0 costi Firebase)
- Debug mode ON/OFF automatico
- Deploy script: ./deploy.sh dev|prod

Vantaggi:
- Development = COMPLETAMENTE GRATIS
- Production = Costi ottimizzati
- Zero configurazione manuale
- Safe fallback a production

Tech: useSmartEnvironment composable, environment detection logic
```

#### **📊 Professional Logging System:**

```
Implementato sistema logging GDPR-compliant con due livelli:

1. useSecureLogger - Per file normali:
   - Auto-sanitizzazione dati sensibili (email, phone, PHI)
   - Remote logging solo in production
   - Livelli: debug, info, warn, error, security
   - Mascheramento automatico password/token

2. useSecureFirestore - Per Firebase:
   - Logging automatico ogni operazione
   - Emoji visivi (📖 read, ✏️ write, 🗑️ delete)
   - Metadata operazione integrati
   - Zero configurazione necessaria

Esempio:
import { useSecureLogger } from 'src/composables/useSecureLogger';

const { logger } = useSecureLogger();

logger.info('User action', { userId: anonymousId });  // Auto-sanitizzato
logger.error('API failed', { endpoint });  // Sicuro

Tech: TypeScript composables, Firebase logging, GDPR compliance
```

### **ALLENAMENTO LLM LOCALS:**

#### **📚 Context Training:**

- Continue.dev **impara automaticamente** dalla tua codebase
- Più codici e progetti, migliori i suggerimenti
- Usa **commenti dettagliati** in italiano per allenare il context

#### **💬 Chat Training:**

```
# Esempi prompt per allenare Continue.dev su medical domain:

"Spiegami le best practices per validazione input medici in TypeScript"

"Come gestire calcoli farmacologici precisi senza errori di floating point?"

"Crea interface TypeScript per dati paziente (privacy compliant)"

"Come strutturare routing per app medical con autorizzazioni?"
```

#### **🔄 Feedback Loop:**

1. **Chiedi codice** → Continue.dev genera
2. **Testa/correggi** → Feedback implicito
3. **Richiedi modifiche** → AI impara stile
4. **Documenta** → Context si arricchisce
5. **Ripeti** → Miglioramento continuo

---

## 🗃️ CONTESTO TECNICO

### **SERVER NYK-AI-V1:**

- **IP WiFi:** 192.168.1.21:2222 (casa)
- **IP Tailscale:** 100.79.173.86:2222 (remoto)
- **SSH:** `ssh nyk-ai` (locale) / `ssh nyk-ai-tailscale` (remoto)
- **Hardware:** i5-2500 @ 3.4GHz, 32GB DDR3, SSD 238GB + HDD 1.5TB
- **Ollama:** Porta 11434, OLLAMA_HOST=0.0.0.0 (network accessible)

### **ENVIRONMENT:**

- **Node.js:** v22.20.0 LTS
- **Yarn:** 1.22.22 (package manager)
- **Python:** 3.11.10 (pyenv)
- **VS Code:** Remote-SSH configurato

### **PROGETTO PATH:**

```bash
cd ~/projects/medicalUtility
yarn dev  # Start development server
code .    # Open in VS Code
```

---

## 🎯 PRIMO TASK

**Apri VS Code sul progetto e usa Continue.dev per:**

1. **Analizza struttura completa:**

```
Analizza la struttura del progetto Medical Utility in ~/projects/medicalUtility.
Mostrami:
- Struttura src/ completa (pages, composables, firebase)
- Google Apps Script in scripts/google-sheets-interface.gs
- Sistema Smart Environment (useSmartEnvironment)
- Sistema logging (useSecureLogger, useSecureFirestore)
```

2. **Testa Google Apps Script v2.2.0:**

```
Apri scripts/google-sheets-interface.gs e analizza:
- BULK mode implementation
- Cell colorization logic
- Via Somministrazione dialog
- Performance optimizations con batch operations

Suggerisci migliorie o best practices.
```

3. **Integra JSON export in TypeScript:**

```
Aiutami a:
1. Creare script per export JSON da Google Sheets
2. Definire TypeScript interfaces per Drug database
3. Integrare in src/data/drugs.ts
4. Usare in DrugCompatibilityPage.vue

Mostra codice TypeScript production-ready.
```

4. **Test Smart Environment:**

```
Verifica il sistema Smart Environment:
1. Controlla useSmartEnvironment.ts
2. Testa auto-detection locale (localhost)
3. Simula deploy production
4. Conferma logging optimization (dev = €0)
```

---

## 📞 SUPPORTO

**Per problemi Continue.dev:**

- Verifica che Ollama sia attivo: `curl http://100.79.173.86:11434/api/tags`
- Ricarica VS Code: `Ctrl+Shift+P` → "Reload Window"
- Check config: `~/.continue/config.yaml` deve avere Tailscale IP

**Per domande progetto:**

- Usa Continue.dev chat per tutto il coding
- Documenta decisioni in README.md
- Commit frequenti su Git
- Consulta documentazione in docs/ per:
  - DEPLOYMENT_GUIDE.md - Guida deployment completa
  - AUTO_DETECTION_SUMMARY.md - Sistema Smart Environment
  - GOOGLE_SHEETS_BULK_MODE_GUIDE.md - Workflow Google Sheets
  - DRUG_COMPATIBILITY_COMPLETION_GUIDE.md - Completamento database

---

**READY TO CODE!** 🚀 Apri VS Code, carica il progetto, e inizia a chattare con Continue.dev!

---

**Creato:** 2025-11-05  
**Aggiornato:** 2025-11-10 🆕  
**Progetto:** Medical Utility App  
**Stack:** Quasar + TypeScript + Continue.dev + Ollama + Google Apps Script 🆕  
**Status:** Core features complete, drug database in progress 🆕  
**Version:** v2.2.0 (Google Apps Script) + Smart Environment System 🆕
