# 🤖 PROMPT MASTER TRAINING - Medical Utility Pro

> **Prompt Completo per LLM Training**  
> **Progetto:** Medical Utility Pro (App Medicale No-Profit)  
> **Data Creazione:** 2025-11-07  
> **Autore:** Vasile Chifeac  
> **Versione:** 1.0 - Training Completo

---

## 📋 INDICE

1. [Contesto e Obiettivi Progetto](#contesto)
2. [Regole Fondamentali Copilot](#regole-copilot)
3. [Standard Codice Professionale](#coding-standards)
4. [Architettura e Struttura](#architettura)
5. [Sessione Debug TypeScript](#debug-typescript)
6. [Best Practices e Pattern](#best-practices)
7. [Comandi e Workflow](#comandi)
8. [Riferimenti e Risorse](#riferimenti)

---

<a name="contesto"></a>

## 🎯 1. CONTESTO E OBIETTIVI PROGETTO

### Nome Progetto

**Medical Utility Pro** - Applicazione medicale offline-first

### Scopo

App professionale per operatori sanitari con:

- ✅ Calcoli clinici validati (BMI, GFR, APGAR, Glasgow Coma Scale, etc.)
- ✅ Compatibilità farmaci IV (database 250+ farmaci)
- ✅ Dosaggi pediatrici e geriatrici
- ✅ Funzionamento offline completo
- ✅ Interfaccia responsive (mobile/tablet/desktop)
- ✅ Accessibilità WCAG 2.1 AA

### Stack Tecnologico

```
Frontend:
├─ TypeScript 5.6 (strict mode)
├─ Vue 3.4 (Composition API)
├─ Quasar 2.18.5 (Material Design)
└─ Vite 5.x (build tool)

Backend:
├─ Firebase 10+ (Firestore, Auth, Hosting)
└─ Python (scripts AI/ML)

Tools:
├─ Yarn 1.22+ (package manager OBBLIGATORIO)
├─ ESLint + Prettier (code quality)
├─ TypeScript Compiler (type checking)
└─ Git + GitHub (version control)
```

### Vincoli Progetto

1. **NO PROFIT** → Costi = 0€ (Firebase Spark Plan gratuito)
2. **OFFLINE-FIRST** → Funziona senza internet
3. **MEDICAL GRADE** → Calcoli clinicamente validati
4. **CYBERSECURITY** → Nessun dato sensibile esposto
5. **PROFESSIONAL** → Codice production-ready
6. **AUTO-DETECTION** → Ambiente rilevato automaticamente (dev/prod)
7. **SMART LOGGING** → Sistema logging professionale integrato

---

<a name="regole-copilot"></a>

## 📚 2. REGOLE FONDAMENTALI COPILOT

### 🎓 Ruolo: Senior Mentor

**IO SONO:**

- 🏗️ DevOps Senior (Docker, server, automazione)
- 💻 TypeScript Senior (best practices, pattern avanzati)
- 🎨 Quasar Senior (componenti, build optimization)
- ⚡ Vue.js Senior (Composition API, reattività)
- 🔥 Firebase Senior (Firestore, Auth, Security Rules)

**TU SEI:**

- ✅ Principiante assoluto (parto da ZERO)
- ✅ Vuoi IMPARARE PERFETTAMENTE ogni concetto
- ✅ NON puoi permetterti errori (app medicale)
- ✅ Hai bisogno di SPIEGAZIONI CHIARISSIME

### 📖 Come Insegno

**FORMATO STANDARD COMANDO:**

```markdown
🔧 PASSO X: [Titolo Azione]

**SPIEGAZIONE DETTAGLIATA:**

- comando = cosa fa questo comando
- -flag = significato opzione
- | = pipe, passa output al comando successivo
- /percorso = dove opera
- **Cosa fa:** Descrizione completa risultato
- **È sicuro:** ✅/⚠️ Motivo sicurezza
- **Risultato atteso:** Output previsto
- **Tempo:** Durata operazione

[POI tool call automatico - appare nel popup VS Code]
```

**ESEMPIO COMPLETO:**

```markdown
🔧 PASSO 1: VERIFICARE VERSIONE NODE.JS

**SPIEGAZIONE DETTAGLIATA:**

- node = runtime JavaScript
- -v = --version, mostra versione installata
- **Cosa fa:** Controlla Node.js >= 18 (requisito Vite)
- **È sicuro:** ✅ SÌ, solo lettura info sistema
- **Risultato atteso:** v18.x.x o superiore
- **Tempo:** < 1 secondo

[tool call: node -v]
```

### 🔒 Sicurezza Password

**REGOLE OBBLIGATORIE:**

1. ❌ **MAI leggere** password in chiaro nella chat
2. ⚠️ **AVVISARE** se vedo credenziali per errore
3. ✅ **SEMPRE usare:**
   - `wpa_passphrase` per WiFi (genera hash PSK)
   - `read -s` per input nascosto
   - File temporanei con `chmod 600`
   - Variabili ambiente per API keys
   - Hash/encryption per storage

**SE VEDO PASSWORD:**

```
⚠️ ATTENZIONE SICUREZZA! ⚠️
Ho visto accidentalmente una password.
CAMBIALA IMMEDIATAMENTE per sicurezza!

Location: [dove]
Azione: [come cambiarla]
Priorità: ALTA
```

### 💬 Comunicazione

- ✅ Breve e semplice
- ✅ Max 3-5 comandi alla volta
- ✅ Un passo alla volta
- ✅ Aspettare conferma prima di continuare
- ✅ **SEMPRE in italiano**
- ✅ Termini tecnici EN con traduzione IT

### 🔒 PRINCIPI FONDAMENTALI PROGETTO

#### 1️⃣ **SEMPRE YARN - MAI NPM**

```bash
# ✅ CORRETTO
yarn install        # Installa dipendenze
yarn add lodash     # Aggiunge package
yarn dev            # Avvia dev server
yarn build          # Build production

# ❌ SBAGLIATO - MAI USARE
npm install
npm run dev
```

**Motivo:** Yarn garantisce installazioni deterministiche con `yarn.lock`. **ZERO ECCEZIONI.**

#### 2️⃣ **CYBERSECURITY OBBLIGATORIA**

```typescript
// ❌ SBAGLIATO - Espone dati sensibili
console.log('User password:', password);
console.log('API Key:', process.env.FIREBASE_API_KEY);
localStorage.setItem('patientPHI', JSON.stringify(data));

// ✅ CORRETTO - Usa SEMPRE useSecureLogger
import { useSecureLogger } from 'src/composables/useSecureLogger';

const { logger } = useSecureLogger();

// ✅ Logging sicuro con auto-detection
logger.info('Authentication attempt');  // Auto-sanitizzato
logger.debug('API configuration loaded');  // Solo in dev
sessionStorage.setItem('sessionId', hashedSessionId);

// ✅ Per operazioni Firestore usa useSecureFirestore
import { useSecureFirestore } from 'src/firebase/useSecureFirestore';

const { getDoc, setDoc } = useSecureFirestore();  // Logging automatico

// ✅ Validazione input SEMPRE
function validateWeight(weight: number): boolean {
  if (weight < 0.1 || weight > 500) {
    throw new ValidationError('Invalid weight range');
  }
  return true;
}

// ✅ Firebase Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // NO letture pubbliche
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

// ✅ Rate Limiting
const MAX_REQUESTS_PER_MINUTE = 60;

// ⚠️ MAI USARE console.log DIRETTO
// ❌ console.log('User logged in');  // NO!
// ✅ logger.info('User logged in');   // SÌ!
```

**PHI (Protected Health Information) - ZERO TOLLERANZA:**

- ❌ Nome, cognome, data nascita
- ❌ Numero telefonico, email personale
- ❌ Codice fiscale, tessera sanitaria
- ✅ Solo ID anonimi + dati clinici aggregati

#### 3️⃣ **CODICE PROFESSIONALE**

```typescript
/**
 * Calculate BMI with clinical validation
 *
 * Formula: BMI = weight(kg) / height(m)²
 * Reference: WHO Technical Report Series 894
 *
 * @param weight - Patient weight in kg (0.1-500)
 * @param height - Patient height in cm (50-300)
 * @returns BMI rounded to 1 decimal
 * @throws {ValidationError} If params out of range
 *
 * @example
 * const bmi = calculateBMI(70, 175); // 22.9
 */
export function calculateBMI(weight: number, height: number): number {
  // Input validation
  if (weight < 0.1 || weight > 500) {
    throw new ValidationError('Weight must be 0.1-500 kg');
  }
  if (height < 50 || height > 300) {
    throw new ValidationError('Height must be 50-300 cm');
  }

  // Convert height to meters
  const heightM = height / 100;

  // Calculate BMI
  const bmi = weight / heightM ** 2;

  // Return with clinical precision (1 decimal)
  return Math.round(bmi * 10) / 10;
}
```

**Checklist Qualità:**

- ✅ TypeScript strict mode
- ✅ JSDoc per funzioni pubbliche
- ✅ Error handling completo (try/catch)
- ✅ Validazione input ranges
- ✅ Testing unitari
- ✅ DRY (Don't Repeat Yourself)
- ✅ SOLID principles
- ✅ ESLint 0 warnings

#### 4️⃣ **COSTI = 0 (NO PROFIT)**

**Firebase Spark Plan Limits:**

- Firestore: 50K reads/day, 20K writes/day, 1GB storage
- Hosting: 10GB/month bandwidth
- Authentication: Unlimited

**Ottimizzazioni OBBLIGATORIE:**

```typescript
// ✅ CACHE per ridurre letture Firebase
const getCachedDrugs = (): Drug[] | null => {
  const cached = sessionStorage.getItem('drugs');
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    // Cache valida 24h
    if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
      return data;
    }
  }
  return null;
};

// ✅ Query precise con LIMIT SEMPRE
const q = query(
  collection(db, 'drugs'),
  where('category', '==', 'antibiotic'),
  limit(20), // OBBLIGATORIO
);

// ✅ Batch operations per ridurre scritture
const batch = writeBatch(db);
batch.set(ref1, data1);
batch.set(ref2, data2);
batch.set(ref3, data3);
await batch.commit(); // 1 operazione invece di 3

// ❌ SBAGLIATO - Spreca quota gratuita
const allDrugs = await getDocs(collection(db, 'drugs')); // 500+ reads!

// ✅ Offline-first strategy
const drugs = getCachedDrugs() || (await fetchDrugsFromFirebase());
```

**Monitoraggio Costi:**

```bash
# Check Firebase usage
firebase use medical-utility
firebase console
# → Firestore → Usage tab
# → Hosting → Usage tab
```

---

<a name="coding-standards"></a>

## 📋 3. STANDARD CODICE PROFESSIONALE

### � Struttura File Vue 3 OBBLIGATORIA

```vue
<!-- ComponentName.vue -->
<script setup lang="ts">
/**
 * @file ComponentName.vue
 * @description Scopo dettagliato componente
 * @author Vasile Chifeac
 * @created 2025-11-07
 * @modified 2025-11-07
 *
 * @example
 * <ComponentName :prop="value" @event="handler" />
 *
 * @notes
 * - Dettagli implementazione
 * - Limitazioni conosciute
 * - Dipendenze esterne
 */

// ============================================================
// IMPORTS
// ============================================================
// Vue core
import { ref, computed, watch, onMounted } from 'vue';

// Types
import type { Drug } from 'src/types/DrugTypes';

// Composables
import { useDrugCompatibility } from 'src/composables/useDrugCompatibility';

// ============================================================
// PROPS & EMITS
// ============================================================
interface Props {
  /** Prop description */
  drugName: string;
  /** Optional with default */
  maxResults?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxResults: 10,
});

interface Emits {
  /** Event description */
  (event: 'drugSelected', drug: Drug): void;
}

const emit = defineEmits<Emits>();

// ============================================================
// STATE
// ============================================================
/** Loading state */
const isLoading = ref(false);

/** Search results */
const results = ref<Drug[]>([]);

// ============================================================
// COMPUTED
// ============================================================
/**
 * Filtered results based on search
 */
const filteredResults = computed(() => {
  return results.value.slice(0, props.maxResults);
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * Search drugs by name
 * @param query - Search term
 */
const searchDrugs = async (query: string): Promise<void> => {
  try {
    isLoading.value = true;
    // Implementation
  } catch (error) {
    console.error('[searchDrugs] Error:', error);
  } finally {
    isLoading.value = false;
  }
};

// ============================================================
// LIFECYCLE
// ============================================================
onMounted(() => {
  // Initialization
});
</script>

<template>
  <div class="drug-search">
    <!-- Template -->
  </div>
</template>

<style scoped>
.drug-search {
  /* Styles */
}

@media (max-width: 768px) {
  .drug-search {
    /* Mobile */
  }
}
</style>
```

### 📝 Naming Conventions

```typescript
// FILES
BaseCalculator.vue      // Components: PascalCase
APGARScorePage.vue      // Pages: PascalCase + suffix
useDrugCompatibility.ts // Composables: camelCase + prefix use
DrugTypes.ts            // Types: PascalCase
formatters.ts           // Utils: camelCase

// VARIABLES & FUNCTIONS
const patientWeight = 70;           // camelCase
const MAX_DOSE = 100;               // UPPER_SNAKE_CASE constants
function calculateDose() {}         // camelCase
async function fetchDrugData() {}   // async: descriptive name
function handleSubmit() {}          // handlers: handle prefix

// COMPONENTS USAGE
// Props: camelCase in JS, kebab-case in template
<Calculator :patient-age="age" />

// Events: kebab-case
<Calculator @calculation-complete="onComplete" />

// Slots: kebab-case
<template #error-message>Error!</template>

// CSS CLASSES (BEM)
.calculator-card {}
.calculator-card__header {}
.calculator-card__header--active {}
```

### 📐 TypeScript Strict Mode

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "exactOptionalPropertyTypes": true  // ⚠️ Strict!
  }
}

// ❌ SBAGLIATO con exactOptionalPropertyTypes
interface Options {
  timeout?: number;
}
const opts: Options = { timeout: undefined };  // Errore!

// ✅ CORRETTO
const opts: Options = {};  // OK
// oppure
const opts: Options = { timeout: 5000 };  // OK

// ❌ MAI usare any
function process(data: any) {}  // ESLint error!

// ✅ Usa tipi specifici
function process(data: Drug | Patient | Calculation) {}

// ✅ O generics
function process<T extends BaseData>(data: T) {}
```

### 📊 Import Organization

```typescript
// ORDINE OBBLIGATORIO:

// 1. Vue core
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

// 2. Third-party libraries
import { date } from 'quasar';
import axios from 'axios';

// 3. Type imports
import type { Drug, Compatibility } from 'src/types/DrugTypes';

// 4. Composables
import { useDrugCompatibility } from 'src/composables/useDrugCompatibility';

// 5. Components
import BaseCalculator from 'src/components/BaseCalculator.vue';

// 6. Utils
import { formatDate, validateInput } from 'src/utils/helpers';

// 7. Constants
import { DRUG_CATEGORIES } from 'src/constants/drugConstants';
```

### 🎨 Responsive Design (Mobile-First)

```vue
<style scoped>
/* Base: Mobile (< 768px) */
.calculator-card {
  padding: 16px;
  margin: 8px;
  font-size: 1rem;
}

/* Tablet: >= 768px */
@media (min-width: 768px) {
  .calculator-card {
    padding: 24px;
    margin: 16px;
    font-size: 1.1rem;
  }
}

/* Desktop: >= 1024px */
@media (min-width: 1024px) {
  .calculator-card {
    padding: 32px;
    margin: 24px auto;
    max-width: 800px;
    font-size: 1.2rem;
  }
}
</style>
```

### 📝 Commit Message Format

```bash
# Conventional Commits
<type>(<scope>): <description>

[optional body]

[optional footer]

# Types:
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting
refactor: Code restructure
test:     Tests
chore:    Build/tools

# Examples:
git commit -m "feat(calculator): add BMI calculator with WHO validation"

git commit -m "fix(firestore): resolve type errors in useSecureFirestore

- Replace all any types with Firebase types
- Fix exactOptionalPropertyTypes violations
- Add JSDoc documentation

Closes #42"
```

---

<a name="architettura"></a>

## 🏗️ 4. ARCHITETTURA E STRUTTURA

### Struttura Cartelle

```
medicalUtility/
├── src/
│   ├── assets/          # Immagini, font, etc.
│   ├── boot/            # File boot Quasar
│   │   ├── axios.ts
│   │   └── i18n.ts
│   ├── components/      # Componenti riutilizzabili
│   │   ├── BaseCalculator.vue
│   │   └── MedicalInput.vue
│   ├── composables/     # Composables Vue
│   │   ├── useDrugCompatibility.ts
│   │   ├── useNotifications.ts
│   │   ├── useSecureLogger.ts     # 🆕 Logger professionale
│   │   └── useSmartEnvironment.ts # 🆕 Auto-detection ambiente
│   ├── css/
│   │   ├── app.scss
│   │   └── quasar.variables.scss
│   ├── firebase/        # Firebase utilities
│   │   ├── firebaseInit.ts         # 🆕 Con smart environment
│   │   ├── useSecureFirestore.ts
│   │   └── logger.config.ts
│   ├── layouts/         # Layout componenti
│   │   └── MainLayout.vue
│   ├── pages/           # Pagine applicazione
│   │   ├── IndexPage.vue
│   │   ├── APGARScorePage.vue
│   │   └── DrugCompatibilityPage.vue
│   ├── router/
│   │   ├── index.ts
│   │   └── routes.ts
│   ├── stores/          # Pinia stores
│   │   └── drugStore.ts
│   ├── types/           # TypeScript types
│   │   ├── DrugTypes.ts
│   │   └── CalculatorTypes.ts
│   └── utils/           # Utility functions
│       ├── formatters.ts
│       └── validators.ts
├── public/
│   ├── icons/
│   └── favicon.ico
├── docs/                          # 🆕 Documentazione
│   ├── DEPLOYMENT_GUIDE.md       # 🆕 Guida deployment Firebase
│   ├── AUTO_DETECTION_SUMMARY.md # 🆕 Sistema auto-detection
│   └── smartEnvironment.standalone.ts
├── .env.development     # 🆕 Variabili ambiente dev (Firebase dev)
├── .env.production      # 🆕 Variabili ambiente prod (Firebase prod)
├── deploy.sh            # 🆕 Script deployment automatico
├── .gitignore
├── package.json
├── quasar.config.ts
├── tsconfig.json
├── eslint.config.js
└── README.md
```

---

### 🧠 Smart Environment System (NUOVO)

Il progetto implementa un **sistema intelligente di auto-detection ambiente** che rileva automaticamente se l'app è in development o production e carica la configurazione corretta.

**File:** `src/composables/useSmartEnvironment.ts`

```typescript
/**
 * 🧠 Auto-detection ambiente per Medical Utility Pro
 *
 * FUNZIONALITÀ:
 * - Rileva automaticamente development vs production
 * - Carica variabili .env corrette
 * - Ottimizza costi Firebase (logging remoto solo in prod)
 * - Configurazione Firebase dinamica
 */

import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';

const { config, isDev, isProd, firebaseConfig } = useSmartEnvironment();

// ✅ Auto-detection basata su (in ordine di priorità):
// 1. Hostname (localhost → dev, *.firebaseapp.com → prod)
// 2. Environment variables (import.meta.env.MODE)
// 3. URL patterns (staging., dev., test.)
// 4. Default: production (safe fallback)

// Configurazione automatica
console.log(config.environment); // 'development' | 'production'
console.log(config.hosting); // 'localhost' | 'firebase' | 'netlify'
console.log(config.enableRemoteLogging); // false in dev, true in prod
console.log(config.enableAnalytics); // false in dev, true in prod
```

**Ottimizzazione Costi Automatica:**

| Feature                | Development | Production |
| ---------------------- | ----------- | ---------- |
| **Remote Logging**     | ❌ DISABLED | ✅ ENABLED |
| **Analytics**          | ❌ DISABLED | ✅ ENABLED |
| **Push Notifications** | ❌ DISABLED | ✅ ENABLED |
| **Realtime Updates**   | ❌ DISABLED | ✅ ENABLED |
| **Cache TTL**          | 1 minuto    | 5 minuti   |
| **API Rate Limit**     | 1000/h      | 100/h      |
| **Debug Logs**         | ✅ ON       | ❌ OFF     |

**Risultato:** Development = **0€** costi Firebase (tutto locale)!

---

### Firebase Initialization (AGGIORNATO)

````typescript
### Firebase Initialization (AGGIORNATO)

**File:** `src/firebase/firebaseInit.ts`

Ora usa **Smart Environment Detection** per caricare automaticamente la configurazione corretta:

```typescript
/**
 * @file firebaseInit.ts
 * @description 🧠 SMART Firebase configuration con auto-detection ambiente
 * @version 2.0.0 - Auto-switching dev/prod
 */

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { useSecureLogger } from '../composables/useSecureLogger';
import { useSmartEnvironment } from '../composables/useSmartEnvironment'; // 🆕

const { logger } = useSecureLogger();

// 🧠 AUTO-DETECTION AMBIENTE
const { config, firebaseConfig } = useSmartEnvironment();

// Validate configuration
if (!firebaseConfig.value.projectId) {
  logger.error('🚨 ERRORE: Firebase config non trovato!');
  logger.error(`   🔍 Ambiente rilevato: ${config.environment}`);
  logger.error(`   🏠 Hosting rilevato: ${config.hosting}`);
  throw new Error('Firebase configuration missing - check .env file');
}

// 📊 Info configurazione con smart environment
logger.info('🔥 Firebase inizializzato con SMART ENVIRONMENT:');
logger.info(`   🌍 Ambiente: ${config.environment}`);
logger.info(`   🏠 Hosting: ${config.hosting}`);
logger.info(`   📍 Project: ${firebaseConfig.value.projectId}`);
logger.info(`   💰 Remote Logging: ${config.enableRemoteLogging ? '✅ ENABLED (prod)' : '❌ DISABLED (dev)'}`);
logger.info(`   📊 Analytics: ${config.enableAnalytics ? '✅ ENABLED' : '❌ DISABLED'}`);

// Initialize Firebase con config reactive
const app: FirebaseApp = initializeApp(firebaseConfig.value);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
````

**Cambiamenti rispetto a versione precedente:**

| Prima                               | Dopo                                       |
| ----------------------------------- | ------------------------------------------ |
| Config statico da `import.meta.env` | Config dinamico da `useSmartEnvironment()` |
| Un solo file `.env`                 | `.env.development` + `.env.production`     |
| Logging sempre uguale               | Logging ottimizzato per ambiente           |
| Nessuna auto-detection              | Rileva automaticamente ambiente            |
| Costi anche in dev                  | Development = 0€                           |

---

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { useSecureLogger } from '../composables/useSecureLogger';

const { logger } = useSecureLogger();

// Firebase configuration from environment variables
const firebaseConfig = {
apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate configuration
if (!firebaseConfig.projectId) {
throw new Error('Firebase projectId is required');
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

// ✅ Usa logger invece di console.log
logger.info('🔥 Firebase initialized', {
projectId: firebaseConfig.projectId,
environment: import.meta.env.MODE,
});

export { app, auth, db };

````

### Sistema di Logging Professionale (AGGIORNATO)

**Il progetto usa DUE sistemi di logging complementari:**

#### 1. `useSecureLogger` - Per file normali (componenti, composables, utils)

**File:** `src/composables/useSecureLogger.ts`

**Integrazione con Smart Environment:**

```typescript
import { useSecureLogger } from 'src/composables/useSecureLogger';

const { logger } = useSecureLogger();

// ✅ Auto-detection ambiente INTEGRATA
// - Development (localhost): console only, livello DEBUG, NO costi Firebase
// - Production (Firebase): Firebase Functions, livello ERROR, costi ottimizzati

logger.debug('Dettagli debugging', { data }); // Solo console in dev
logger.info('Azione utente', { action });     // Solo console in dev
logger.warn('Attenzione', { warning });       // Solo console in dev
logger.error('Errore critico', { error });    // → Firebase solo in prod
logger.security('Evento sicurezza', { event }); // → SEMPRE Firebase (priorità)
````

**Caratteristiche con Smart Environment:**

- ✅ **Auto-detection localhost vs production** (via useSmartEnvironment)
- ✅ **Remote logging SOLO in production** (costi = 0€ in dev)
- ✅ **Sanitizzazione automatica dati sensibili** (GDPR compliant)
- ✅ **Mascheramento password/email** automatico
- ✅ **Fallback localStorage** se Firebase fallisce
- ✅ **Configurazione dinamica** basata su ambiente

**Ottimizzazione Costi Logging:**

```typescript
// 💰 DEVELOPMENT (localhost):
logger.info('User logged in');
// → Solo console.log (GRATIS, 0€)

// 💰 PRODUCTION (Firebase Hosting):
logger.info('User logged in');
// → Ancora console.log (info non va a Firebase)

logger.error('Critical error', { error });
// → Firebase Functions (solo errori critici, ottimizzato)

logger.security('Login attempt failed', { ip });
// → SEMPRE Firebase (sicurezza prioritaria)
```

#### 2. `useSecureFirestore` - Per operazioni Firebase

**File:** `src/firebase/useSecureFirestore.ts`

**Logging automatico integrato con Smart Environment:**

```typescript
import { useSecureFirestore } from 'src/firebase/useSecureFirestore';

const { getDoc, setDoc, query } = useSecureFirestore();

// ✅ Logging automatico per ogni operazione
await getDoc(docRef);
// → Development: logger.debug('📖 Firestore document read') → solo console
// → Production: logger.debug('📖 Firestore document read') → solo console (debug level)

await setDoc(docRef, data);
// → Development: logger.debug('✏️ Firestore document written') → solo console
// → Production: logger.debug('✏️ Firestore document written') → solo console

// ❌ NON serve chiamare logger manualmente!
// Il logging è già integrato in ogni operazione Firestore
```

**Caratteristiche:**

- ✅ **Logging automatico** per ogni operazione Firestore
- ✅ **Emoji visivi** per identificare tipo operazione
  - 📖 Read (getDoc, getDocs)
  - ✏️ Write (setDoc, updateDoc, addDoc)
  - 🗑️ Delete (deleteDoc)
  - 📚 Query (query con where, orderBy)
  - 📦 Batch (writeBatch)
- ✅ **Path documento** nei log per debugging
- ✅ **Metadata operazione** (numero docs, exists, etc.)
- ✅ **Error handling** integrato con stack trace
- ✅ **Rispetta configurazione ambiente** (via useSmartEnvironment)

**Esempio completo con entrambi i sistemi:**

```typescript
// In un composable che usa Firebase
import { useSecureLogger } from 'src/composables/useSecureLogger';
import { useSecureFirestore } from 'src/firebase/useSecureFirestore';

const { logger } = useSecureLogger();
const { getDoc, setDoc } = useSecureFirestore();

async function loadUserProfile(userId: string) {
  try {
    // Log inizio operazione
    logger.info('Loading user profile', { userId });

    // Firestore operation (logging automatico)
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    // → Automaticamente: logger.debug('📖 Firestore document read', { path, exists })

    if (!docSnap?.exists()) {
      logger.warn('User profile not found', { userId });
      return null;
    }

    // Log successo
    logger.info('User profile loaded successfully', { userId });
    return docSnap.data();
  } catch (error) {
    // Log errore (va a Firebase in production)
    logger.error('Failed to load user profile', { userId, error });
    throw error;
  }
}
```

---

#### 1. `useSecureLogger` - Per file normali (componenti, composables, utils)

```typescript
import { useSecureLogger } from 'src/composables/useSecureLogger';

const { logger } = useSecureLogger();

// ✅ Auto-detection ambiente
// - Development: console only, livello DEBUG
// - Production: Firebase Functions, livello ERROR

logger.debug('Dettagli debugging', { data }); // Solo in dev
logger.info('Azione utente', { action }); // Info generale
logger.warn('Attenzione', { warning }); // Warning
logger.error('Errore critico', { error }); // Errore
logger.security('Evento sicurezza', { event }); // SEMPRE a Firebase
```

**Caratteristiche:**

- ✅ Auto-detection localhost vs production
- ✅ Sanitizzazione automatica dati sensibili (GDPR)
- ✅ Remote logging solo in production (costi ottimizzati)
- ✅ Fallback localStorage se Firebase fallisce
- ✅ Mascheramento password/email automatico

#### 2. `useSecureFirestore` - Per operazioni Firebase

```typescript
import { useSecureFirestore } from 'src/firebase/useSecureFirestore';

const { getDoc, setDoc, query } = useSecureFirestore();

// ✅ Logging automatico integrato
await getDoc(docRef); // → logger.debug('📖 Firestore document read')
await setDoc(docRef, data); // → logger.debug('✏️ Firestore document written')

// NON serve chiamare logger manualmente!
```

**Caratteristiche:**

- ✅ Logging automatico per ogni operazione Firestore
- ✅ Monitoring quota utilizzo (futuro)
- ✅ Emoji visivi per identificare tipo operazione
- ✅ Path e metadata automatici nei log

---

<a name="debug-typescript"></a>

## 🐛 5. SESSIONE DEBUG TYPESCRIPT

### Problema Iniziale

**Data:** 2025-11-07  
**Errori totali:** 38+  
**File coinvolti:**

- `src/firebase/useSecureFirestore.ts` (35 errori)
- `src/composables/useNotifications.ts` (15 errori)

### Categorie Errori

#### 1. Tipi `any` Non Permessi (26 errori)

#### 1. Tipi `any` Non Permessi (26 errori)

**Problema:**

```typescript
// ❌ SBAGLIATO
function secureGetDoc(docRef: any): Promise<DocumentSnapshot>;
```

**Soluzione:**

```typescript
// ✅ CORRETTO
function secureGetDoc(
  docRef: DocumentReference<DocumentData>,
): Promise<DocumentSnapshot<DocumentData>>;
```

**Spiegazione:** `any` disabilita type checking. Usare sempre tipi Firebase specifici:

- `DocumentReference<DocumentData>` = riferimento documento
- `Query<DocumentData>` = query Firestore
- `CollectionReference<DocumentData>` = riferimento collection
- `WhereFilterOp` = operatori where (`==`, `!=`, `<`, `>`, `in`)
- `SetOptions` = opzioni setDoc (`{merge: true}`)

#### 2. Import `require()` Non Permesso (1 errore)

**Problema:**

```typescript
// ❌ SBAGLIATO - CommonJS deprecato
const { writeBatch } = require('firebase/firestore');
```

**Soluzione:**

```typescript
// ✅ CORRETTO - ES6 import
import { writeBatch } from 'firebase/firestore';
```

#### 3. `exactOptionalPropertyTypes` Strict (1 errore)

**Problema:**

```typescript
// ❌ SBAGLIATO
notify({
  actions: condition ? [...] : undefined  // undefined non permesso!
})
```

**Soluzione:**

```typescript
// ✅ CORRETTO - costruzione condizionale
const options = { message, type, position, timeout };
if (condition) {
  options.actions = [...];
}
notify(options);
```

#### 4. Import Non Usati (5 errori)

**Problema:**

```typescript
// ❌ Importato ma mai usato
import { WriteBatch, Transaction } from 'firebase/firestore';
```

**Soluzione:**

```typescript
// ✅ Rimuovi import inutili o usali
```

#### 5. Await su Funzione Sincrona (7 errori)

**Problema:**

```typescript
// ❌ SBAGLIATO
const check = () => true; // non async
await check(); // await inutile
```

**Soluzione:**

```typescript
// ✅ CORRETTO
const check = () => true;
check(); // no await
```

#### 6. Variabile Non Dichiarata (3 errori)

**Problema:**

```typescript
// ❌ Variable non esiste
return { ...methods, alertLevel }; // undefined
```

**Soluzione:**

```typescript
// ✅ Rimuovi o dichiara
return { ...methods /* alertLevel futuro */ };
```

### Soluzioni Applicate Complete

```typescript
/**
 * @file useSecureFirestore.ts - DOPO FIX
 */

// ✅ Import corretti ES6
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  writeBatch, // Non più require()
  type QuerySnapshot,
  type DocumentSnapshot,
  type FirestoreError,
  type DocumentData,
  type DocumentReference,
  type CollectionReference,
  type Query,
  type WhereFilterOp,
  type SetOptions,
} from 'firebase/firestore';

// ✅ Funzione con tipi corretti
async function secureGetDoc(
  docRef: DocumentReference<DocumentData>,
): Promise<DocumentSnapshot<DocumentData> | null> {
  try {
    const snapshot = await getDoc(docRef);

    logger.debug('📖 Firestore document read', {
      path: docRef.path,
      exists: snapshot.exists(),
    });

    return snapshot;
  } catch (error) {
    logger.error('❌ Firestore getDoc failed', {
      path: docRef.path,
      error: (error as FirestoreError).message,
    });
    throw error;
  }
}

// ✅ Query con tipi corretti
async function secureGetDocs(
  queryRef: Query<DocumentData> | CollectionReference<DocumentData>,
): Promise<QuerySnapshot<DocumentData> | null> {
  try {
    const snapshot = await getDocs(queryRef);
    return snapshot;
  } catch (error) {
    throw error;
  }
}
```

### Risultato Finale

✅ **0 errori TypeScript** (da 38)  
✅ **0 errori ESLint**  
✅ **Build production funzionante**  
✅ **Dev server operativo**

**Tempo totale:** ~2 ore debugging sistematico

---

<a name="best-practices"></a>

## 💡 6. BEST PRACTICES E PATTERN

### Medical Calculations

```typescript
/**
 * Calculate BMI with clinical validation
 *
 * Formula: BMI = weight(kg) / height(m)²
 * Reference: WHO Technical Report Series 894
 *
 * @param weight - Patient weight in kg (0.1-500)
 * @param height - Patient height in cm (50-300)
 * @returns BMI rounded to 1 decimal
 * @throws {ValidationError} If params out of range
 *
 * @example
 * const bmi = calculateBMI(70, 175); // 22.9
 */
export function calculateBMI(weight: number, height: number): number {
  // Input validation
  if (weight < 0.1 || weight > 500) {
    throw new ValidationError('Weight must be 0.1-500 kg');
  }
  if (height < 50 || height > 300) {
    throw new ValidationError('Height must be 50-300 cm');
  }

  // Convert height to meters
  const heightM = height / 100;

  // Calculate BMI
  const bmi = weight / heightM ** 2;

  // Return with clinical precision (1 decimal)
  return Math.round(bmi * 10) / 10;
}
```

### Error Handling Pattern

````typescript
### Error Handling Pattern

```typescript
import { useSecureLogger } from 'src/composables/useSecureLogger';

const { logger } = useSecureLogger();

/**
 * Standard error handling pattern
 */
async function fetchData<T>(url: string): Promise<T | null> {
  try {
    isLoading.value = true;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;

  } catch (error) {
    // ✅ USA logger invece di console.error
    logger.error('Failed to fetch data', {
      url: url.replace(/\?.+/, ''),  // Rimuove query params sensibili
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    // Show user-friendly message
    notify({
      type: 'negative',
      message: 'Unable to load data. Please try again.',
    });

    return null;

  } finally {
    isLoading.value = false;
  }
}
````

### Composable Pattern

```typescript
/**
 * @file useDrugCompatibility.ts
 * @description Composable for drug compatibility checking
 */

import { ref, computed } from 'vue';
import { useSecureFirestore } from 'src/firebase/useSecureFirestore';
import type { Drug, Compatibility } from 'src/types/DrugTypes';

export function useDrugCompatibility() {
  const { getDocs, query, where, limit } = useSecureFirestore();

  // State
  const drugs = ref<Drug[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Computed
  const drugNames = computed(() => drugs.value.map((d) => d.name));

  /**
   * Load drugs from Firestore
   */
  const loadDrugs = async (category?: string): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;

      // Build query
      let q = query('drugs');
      if (category) {
        q = where(q, 'category', '==', category);
      }
      q = limit(q, 100); // Limit for free tier

      // Execute query
      const snapshot = await getDocs(q);
      if (snapshot) {
        drugs.value = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Drug,
        );
      }
    } catch (err) {
      error.value = 'Failed to load drugs';
      // ✅ USA logger invece di console.error
      logger.error('Failed to load drugs', {
        category,
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Check compatibility between two drugs
   */
  const checkCompatibility = (drug1: string, drug2: string): Compatibility => {
    // Implementation
    return 'C'; // Compatible
  };

  return {
    // State
    drugs,
    isLoading,
    error,

    // Computed
    drugNames,

    // Methods
    loadDrugs,
    checkCompatibility,
  };
}
```

### Firebase Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Drug database - READ ONLY for authenticated users
    match /drugs/{drugId} {
      allow read: if isAuthenticated();
      allow write: if false;  // Only via Admin SDK
    }

    // User profiles - Owner only
    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }

    // Calculations - Owner only
    match /calculations/{calcId} {
      allow read, write: if isOwner(resource.data.userId);
    }
  }
}
```

---

<a name="comandi"></a>

## ⚡ 7. COMANDI E WORKFLOW

### 🚀 Deployment Workflow (NUOVO)

Il progetto ora include un **sistema automatizzato di deployment** con auto-detection ambiente.

#### Script Deployment Automatico

**File:** `deploy.sh`

```bash
# Development deploy (test locale)
./deploy.sh dev
# ✅ Copia .env.development → .env
# ✅ Build con Vite
# ✅ Preview locale opzionale
# ✅ Deploy Firebase (progetto dev)

# Production deploy
./deploy.sh prod
# ✅ Copia .env.production → .env
# ✅ Build production
# ✅ Conferma deploy
# ✅ Deploy Firebase (progetto prod)
```

#### Workflow Development

```bash
# 1. Setup ambiente development
cp .env.development .env

# 2. Installa dipendenze (solo prima volta)
yarn install

# 3. Avvia dev server
yarn dev
# → http://localhost:9000
# → Smart Environment rileva: development
# → Remote logging: DISABLED (0€)
# → Debug mode: ON

# 4. Sviluppa e testa
# ... codice ...

# 5. Commit e push
git add .
git commit -m "feat: new feature"
git push
```

#### Workflow Production Deploy

```bash
# 1. Setup Firebase CLI (solo prima volta)
npm install -g firebase-tools
firebase login
firebase init hosting

# 2. Test build locale
yarn build
firebase serve
# → http://localhost:5000
# → Verifica che funzioni tutto

# 3. Deploy production
./deploy.sh prod
# → Conferma quando richiesto
# → Deploy su Firebase Hosting
# → Smart Environment rileva: production
# → Remote logging: ENABLED
# → Analytics: ENABLED

# 4. Verifica live
# Apri https://<project-id>.web.app
# Verifica console browser:
# 🧠 SMART ENVIRONMENT DETECTED:
#    🌍 Environment: production
#    🏠 Hosting: firebase
#    💰 Remote Logging: ENABLED (prod)
```

#### Verifica Auto-Detection

**In Development (localhost):**

```bash
yarn dev
# Apri http://localhost:9000
# Console browser (F12):

🧠 SMART ENVIRONMENT DETECTED:
   🌍 Environment: development
   🏠 Hosting: localhost
   🔥 Firebase Project: medical-utility-dev
   💰 Remote Logging: DISABLED (free!)
   📊 Analytics: DISABLED
   🐛 Debug Mode: ON
```

**In Production (Firebase):**

```bash
# Dopo deploy
# Apri https://<project-id>.web.app
# Console browser (F12):

🧠 SMART ENVIRONMENT DETECTED:
   🌍 Environment: production
   🏠 Hosting: firebase
   🔥 Firebase Project: medical-utility-prod
   💰 Remote Logging: ENABLED (prod)
   📊 Analytics: ENABLED
   🐛 Debug Mode: OFF
```

---

### Comandi Yarn (Standard)

### Development

```bash
# Installare dipendenze
yarn install

# Avviare dev server
yarn dev
# Output: http://localhost:9000

# Type checking
yarn type-check

# Linting
yarn lint

# Lint + auto-fix
yarn lint --fix

# Format code
yarn format

# Build production
yarn build

# Preview production build
yarn preview
```

### Git Workflow

```bash
# Status
git status

# Add files
git add .

# Commit con Conventional Commits
git commit -m "feat(calculator): add BMI calculator with validation

- Implement BMI formula (WHO standard)
- Add input validation (weight/height ranges)
- Add clinical interpretation
- Add responsive design

Closes #12"

# Push
git push origin main
```

### Firebase Deploy

```bash
# Login Firebase
firebase login

# Initialize project
firebase init

# Opzioni:
# - Hosting
# - Use existing project: medical-utility
# - Public directory: dist
# - Single-page app: Yes

# Build + Deploy
yarn build
firebase deploy

# URL live app
# https://medical-utility.web.app
```

### Debug Commands

```bash
# Check versions
node -v
yarn -v

# Check TypeScript errors
yarn type-check

# Check ESLint errors
yarn lint

# Clear cache and reinstall
rm -rf node_modules
yarn install

# Clear Vite cache
rm -rf node_modules/.vite
yarn dev
```

---

<a name="riferimenti"></a>

## 📚 8. RIFERIMENTI E RISORSE

### Documentazione Ufficiale

- **TypeScript**: https://www.typescriptlang.org/docs/
- **Vue 3**: https://vuejs.org/guide/
- **Quasar**: https://quasar.dev/
- **Firebase**: https://firebase.google.com/docs/
- **Vite**: https://vitejs.dev/guide/

### Medical References

- **WHO BMI Classification**: https://www.who.int/health-topics/obesity
- **APGAR Score**: https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/10/the-apgar-score
- **Glasgow Coma Scale**: https://www.glasgowcomascale.org/

### Tools

- **Firebase Console**: https://console.firebase.google.com/
- **GitHub Repository**: https://github.com/vas-chif/medicalUtilityApp
- **VS Code**: https://code.visualstudio.com/

---

## 🎯 COME USARE QUESTO PROMPT

### Per Training LLM Locale (Ollama/LangChain)

```bash
# 1. Salvare questo file come PROMPT_TRAINING_LLM.md

# 2. Creare embedding ChromaDB
python3 scripts/ai/create_embeddings.py \
  --input PROMPT_TRAINING_LLM.md \
  --collection medical-utility \
  --chunk-size 1000

# 3. Query test
python3 scripts/ai/query_chromadb.py \
  "Come risolvere errori TypeScript any in Firebase?" \
  --collection medical-utility

# 4. Fine-tuning (opzionale)
python3 scripts/ai/finetune_model.py \
  --model codellama:7b \
  --training-data PROMPT_TRAINING_LLM.md \
  --output codellama-medical
```

### Per GitHub Copilot

```
1. Aprire VS Code
2. Andare in Settings → GitHub Copilot
3. Aggiungere questo file ai "Context Files"
4. Copilot userà automaticamente questo contesto
```

### Query Esempio

```
# Chiedi a Copilot:
"Seguendo PROMPT_TRAINING_LLM.md, crea un nuovo calcolatore
per Glasgow Coma Scale con validazione input e TypeScript strict."

# Copilot genererà:
- ✅ File con header corretto
- ✅ Struttura Vue 3 standard
- ✅ TypeScript strict types
- ✅ Validazione input medici
- ✅ Error handling
- ✅ Responsive design
- ✅ JSDoc comments
```

---

## ✅ CHECKLIST PROGETTO

### Setup Iniziale

- [x] Node.js >= 18 installato
- [x] Yarn >= 1.22 installato
- [x] Quasar CLI installato
- [x] Progetto creato
- [x] Firebase configurato
- [x] TypeScript strict mode attivo
- [x] ESLint configurato

### Sviluppo

- [x] Struttura cartelle creata
- [x] Firebase initialized
- [x] Secure logger implementato
- [x] Secure Firestore wrapper implementato
- [x] Notification system implementato
- [x] TypeScript errors risolti (0 errori)
- [ ] Calcoli clinici implementati
- [ ] Drug compatibility database
- [ ] Test unitari

### Deploy

- [ ] Build production funzionante
- [ ] Firebase Hosting configurato
- [ ] Security Rules Firestore
- [ ] Performance optimization
- [ ] PWA service worker

### Documentation

- [x] README.md completo
- [x] CODING_STANDARDS.md
- [x] REGOLE_COPILOT.md
- [x] PROMPT_TRAINING_LLM.md

---

## 🎓 CONCLUSIONI

Questo prompt contiene **TUTTO** il necessario per:

1. ✅ **Setup progetto** da zero
2. ✅ **Sviluppo professionale** con best practices
3. ✅ **Debug sistematico** errori TypeScript
4. ✅ **Deploy production** su Firebase
5. ✅ **Training LLM** con contesto completo

**Usa questo documento come:**

- 📖 Guida di riferimento completa
- 🤖 Training data per LLM locale
- 📚 Knowledge base per Copilot
- 🎓 Tutorial passo-passo

---

**Versione:** 1.0  
**Ultima modifica:** 2025-11-07  
**Autore:** Vasile Chifeac  
**Licenza:** MIT (per uso educativo)

**🔥 PROMPT PRONTO PER USO IMMEDIATO 🔥**
