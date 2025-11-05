# 🏥 PROMPT PROGETTO MEDICAL UTILITY APP - CONTINUE.DEV

## 📋 RIASSUNTO SESSIONE PRECEDENTE

**OBIETTIVO COMPLETATO:**
- ✅ Setup server NYK-AI-V1 completo (Ubuntu 24.04, Docker, Node.js, Python)
- ✅ Ollama installato con modelli Llama 3.2 3B (chat) + CodeLlama 7B (autocomplete)
- ✅ Continue.dev configurato in VS Code con Tailscale (funziona locale + remoto)
- ✅ ChromaDB con 12,222 documenti AI/ML caricati
- ✅ Progetto Quasar/TypeScript generato: `/home/nyk-ai/projects/medicalUtility`

**STACK CONFIGURATO:**
- **Frontend:** Quasar Framework + Vue 3 + TypeScript + Yarn
- **AI Assistant:** Continue.dev con Ollama locale (Llama 3.2 3B + CodeLlama 7B)
- **Server:** Ubuntu 24.04 @ 192.168.1.21 (WiFi) / 100.79.173.86 (Tailscale)
- **Accesso:** SSH port 2222, VS Code Remote-SSH

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
   - Altri calcolatori medici
3. **Compatibilità Farmaci:** Database interazioni farmacologiche
4. **Design:** Medical theme (blu/verde/bianco), Material Design, responsive

### **STRUTTURA PROGETTO:**
```
/home/nyk-ai/projects/medicalUtility/
├── src/
│   ├── pages/           # IndexPage.vue (homepage), calcolatrici
│   ├── components/      # Cards, calcolatrici, UI components
│   ├── layouts/         # Layout principale
│   ├── router/          # Routing Vue
│   └── stores/          # Pinia stores (dati app)
```

---

## 🚀 PROSSIME AZIONI

### **IMMEDIATE (ADESSO):**
1. **Apri progetto in VS Code:** `code ~/projects/medicalUtility`
2. **Crea Homepage con griglia cards** usando Continue.dev
3. **Setup routing** per ogni utility
4. **Design system** medical theme

### **SEQUENZA SVILUPPO:**
1. Homepage layout + griglia cards
2. BMI Calculator (primo tool)
3. Dosaggio Farmaci calculator
4. GFR Calculator
5. APGAR Score calculator
6. Compatibilità Farmaci (database + search)
7. Testing + deployment

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
Devo creare un sistema di compatibilità farmaci:

Features:
- Search farmaci (autocomplete)
- Database interazioni
- Alert incompatibilità
- Gravità interazione (bassa/media/alta)
- Note cliniche

Tech: TypeScript interfaces, search logic, data structures.
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

1. **Analizza struttura esistente:**
```
Analizza la struttura del progetto Quasar in ~/projects/medicalUtility.
Dimmi cosa c'è in src/pages/IndexPage.vue e come posso modificarlo per creare una griglia di cards per utilities mediche.
```

2. **Crea homepage layout:**
```
Trasforma IndexPage.vue in una homepage con griglia 3x4 di cards per utilities mediche. Ogni card deve essere cliccabile e navigare a una route specifica.
```

3. **Setup routing:**
```
Aiutami a configurare il routing in src/router per le seguenti pagine:
- /bmi-calculator
- /dosage-calculator  
- /gfr-calculator
- /apgar-score
- /drug-compatibility
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

---

**READY TO CODE!** 🚀 Apri VS Code, carica il progetto, e inizia a chattare con Continue.dev!

---

**Creato:** 2025-11-05  
**Progetto:** Medical Utility App  
**Stack:** Quasar + TypeScript + Continue.dev + Ollama  
**Status:** Ready to start development