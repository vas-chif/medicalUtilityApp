# 🧠 Sistema di Auto-Detection - Quick Start

## 📦 **File Pronti per il Riutilizzo**

Hai bisogno del sistema di auto-detection in un nuovo progetto? **Copia questi file**:

### **Opzione 1: Sistema Completo** (Consigliato per Vue.js)

```
shared/composables/
├── useSmartEnvironment.ts       ← Sistema completo con Vue reactive
├── useSecureLogger.ts           ← Logger con GDPR compliance
└── logger.config.ts             ← Configurazione logging
```

**Caratteristiche**:
- ✅ Reactive (Vue 3)
- ✅ Logger integrato con sanitizzazione dati GDPR
- ✅ Configurazione avanzata multi-servizi
- ✅ Performance monitoring

**Uso**:
```typescript
import { useSmartEnvironment } from '@/composables/useSmartEnvironment';

const { config, isDev, shouldUseService } = useSmartEnvironment();

if (shouldUseService('enableRemoteLogging')) {
  sendToFirebase(logData);
}
```

---

### **Opzione 2: Standalone** (Universale - React, Angular, Vanilla JS)

```
docs/
└── smartEnvironment.standalone.ts  ← File singolo, zero dipendenze
```

**Caratteristiche**:
- ✅ Zero dipendenze (solo TypeScript)
- ✅ Framework-agnostic
- ✅ ~300 righe di codice ben commentato
- ✅ Facile da adattare

**Uso**:
```typescript
import { useSmartEnvironment } from './smartEnvironment.standalone';

const { config } = useSmartEnvironment();

// Auto-detection funziona immediatamente!
console.log(config.environment);  // 'development' o 'production'
console.log(config.enableRemoteLogging);  // false in dev, true in prod
```

---

## 🚀 **Setup Rapido (5 minuti)**

### **Step 1: Copia il File**

Scegli la versione che preferisci e copia nel tuo progetto:

```bash
# Opzione 1: Sistema completo Vue
cp shared/composables/useSmartEnvironment.ts ./src/composables/

# Opzione 2: Standalone
cp docs/smartEnvironment.standalone.ts ./src/utils/
```

### **Step 2: Importa e Usa**

```typescript
// Nel tuo main.ts o App.vue
import { useSmartEnvironment } from './composables/useSmartEnvironment';

const { config, isDev } = useSmartEnvironment();

if (isDev) {
  console.log('🏠 Development mode - Zero costs!');
}
```

### **Step 3: Adatta per i Tuoi Servizi**

Modifica `ISmartConfig` per includere i servizi che usi:

```typescript
export interface ISmartConfig {
  // I tuoi servizi
  enableStripePayments: boolean;
  enableTwilioSMS: boolean;
  enableSendGridEmail: boolean;
  // ...
}
```

---

## 💡 **Come Funziona**

### **Detection Multi-Layer**

```
🔍 STEP 1: Controlla Hostname
  ├─ localhost? → Development ✅
  ├─ 127.0.0.1? → Development ✅
  ├─ 192.168.x.x? → Development ✅
  └─ myapp.com? → Production 🚀

🔍 STEP 2: Controlla Environment Variables
  ├─ process.env.NODE_ENV → Webpack/Node.js
  ├─ import.meta.env.MODE → Vite
  └─ Fallback → Next step

🔍 STEP 3: Controlla URL Patterns
  ├─ staging.myapp.com? → Staging 🧪
  ├─ dev.myapp.com? → Development 🏠
  └─ Default → Production (sicuro) 🚀

✅ RISULTATO: Configurazione automatica ottimizzata!
```

### **Auto-Ottimizzazione Costi**

```typescript
// 🏠 DEVELOPMENT (localhost)
{
  enableRemoteLogging: false,     // ❌ No Firebase → €0
  enableAnalytics: false,         // ❌ No Google Analytics → €0
  cacheTTL: 60000,                // ⚡ Cache breve per test rapidi
  maxApiCalls: 1000               // 🚀 Nessun limite per testing
}

// 🚀 PRODUCTION (myapp.com)
{
  enableRemoteLogging: true,      // ✅ Firebase attivo
  enableAnalytics: true,          // ✅ Analytics attivo
  cacheTTL: 300000,               // ⚡ Cache lunga per performance
  maxApiCalls: 100                // 🛡️ Rate limiting per sicurezza
}
```

---

## 📚 **Esempi d'Uso Reali**

### **1. Logger Intelligente**

```typescript
const { config } = useSmartEnvironment();

const logger = {
  error: (msg: string, data?: any) => {
    // Sempre console (gratis)
    console.error(msg, data);

    // Firebase solo in production
    if (config.enableRemoteLogging) {
      sendToFirebase({ level: 'error', msg, data });
    }
  }
};
```

**Risparmio**: €5-15/mese (Firebase Logging in development)

### **2. Analytics Condizionali**

```typescript
const { config } = useSmartEnvironment();

function trackPageView(path: string) {
  if (config.enableAnalytics) {
    gtag('event', 'page_view', { page_path: path });
  }
}
```

**Beneficio**: Dati analytics puliti (no traffico dev)

### **3. Feature Flags Automatici**

```typescript
const { isDev, isStaging } = useSmartEnvironment();

const features = {
  betaUI: isDev || isStaging,           // Solo in dev/staging
  debugPanel: isDev,                    // Solo in dev
  realTimeUpdates: !isDev,              // Solo in prod
};

if (features.debugPanel) {
  showDevTools();
}
```

### **4. API Rate Limiting**

```typescript
const { getApiLimit, getCacheTTL } = useSmartEnvironment();

async function fetchData(url: string) {
  // Cache intelligente
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < getCacheTTL()) {
    return cached.data;
  }

  // Rate limiting
  if (apiCallCount > getApiLimit()) {
    throw new Error('Rate limit exceeded');
  }

  const data = await fetch(url).then(r => r.json());
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}
```

---

## 🧪 **Testing**

### **Unit Tests**

```typescript
import { mockEnvironment } from './smartEnvironment.standalone';

describe('Smart Environment', () => {
  it('should detect localhost as development', () => {
    const config = mockEnvironment('development');
    expect(config.environment).toBe('development');
    expect(config.enableRemoteLogging).toBe(false);
  });

  it('should enable services in production', () => {
    const config = mockEnvironment('production');
    expect(config.environment).toBe('production');
    expect(config.enableRemoteLogging).toBe(true);
  });
});
```

### **Manual Testing**

```bash
# 1. Development (localhost:3000)
npm run dev
# Aspettati: 🏠 Development mode, remote logging OFF

# 2. Production build locale
npm run build && npm run preview
# Aspettati: 🚀 Production mode, remote logging ON

# 3. Deploy su Netlify
git push
# Aspettati: 🚀 Production mode, full features
```

---

## 🎯 **Adattamento per Diversi Framework**

### **Vue 3** (Originale)

```typescript
import { reactive, computed } from 'vue';

export function useSmartEnvironment() {
  const config = reactive(generateSmartConfig());
  const isDev = computed(() => config.isDevelopment);
  return { config, isDev };
}
```

### **React**

```typescript
import { useMemo } from 'react';

export function useSmartEnvironment() {
  const config = useMemo(() => generateSmartConfig(), []);
  return { config, isDev: config.isDevelopment };
}
```

### **Angular**

```typescript
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SmartEnvironmentService {
  public readonly config = generateSmartConfig();
  get isDev() { return this.config.isDevelopment; }
}
```

### **Vanilla JS**

```typescript
const SmartEnv = (() => {
  const config = generateSmartConfig();
  return { config };
})();

// Uso
if (SmartEnv.config.isDevelopment) {
  console.log('Dev mode!');
}
```

---

## 📊 **Metriche Tipiche**

### **Risparmio Mensile Stimato**

| Servizio | Dev (con detection) | Dev (senza) | Risparmio |
|----------|---------------------|-------------|-----------|
| Firebase Logging | €0 | €8-15 | **€8-15** |
| Google Analytics | €0 (pulito) | €0 (inquinato) | **Qualità dati** |
| Sentry/Error Reporting | €0 | €10-30 | **€10-30** |
| Push Notifications | €0 | €5-10 | **€5-10** |
| **TOTALE** | **€0** | **€23-55** | **€23-55/mese** |

### **ROI**

- **Tempo setup**: 1-2 ore
- **Risparmio annuale**: €276-660
- **ROI**: Infinito (lavora per sempre)

---

## 🚨 **Errori Comuni da Evitare**

### ❌ **Errore 1: Usare solo `process.env`**

```typescript
// SBAGLIATO
const isDev = process.env.NODE_ENV === 'development';
```

**Problema**: `process` non sempre disponibile in browser

**Soluzione**: Usa multi-detection (hostname + env + fallback)

### ❌ **Errore 2: Hard-coded environment**

```typescript
// SBAGLIATO
const config = { isProduction: true };
```

**Problema**: Devi cambiare codice per ogni deploy

**Soluzione**: Auto-detection!

### ❌ **Errore 3: Assumere HTTP = Dev**

```typescript
// SBAGLIATO
const isDev = location.protocol === 'http:';
```

**Problema**: Dev può usare HTTPS, prod può usare HTTP

**Soluzione**: Usa hostname come priorità 1

---

## 📖 **Documentazione Completa**

Per approfondimenti:
- **Guida completa**: `docs/SMART-ENVIRONMENT-AUTODETECTION-GUIDE.md`
- **File originali**: `shared/composables/useSmartEnvironment.ts`
- **Esempi avanzati**: `shared/composables/useAdvancedLogger.ts`

---

## 🤝 **Contribuire**

Hai migliorato il sistema? Condividi!

1. Fork il progetto
2. Migliora `smartEnvironment.standalone.ts`
3. Aggiungi esempi
4. Pull request

---

## ✨ **Conclusione**

**Questo sistema ti permette di**:
- ✅ **Zero configurazione manuale** (tutto automatico)
- ✅ **Costi azzerati in development** (€0/mese)
- ✅ **Costi ottimizzati in production** (solo ciò che serve)
- ✅ **Codice pulito e manutenibile** (niente if annidati)
- ✅ **Framework-agnostic** (funziona ovunque)

**Copy-paste ready per qualsiasi progetto!** 🚀

---

_Domande? Controlla la guida completa o apri una issue._
