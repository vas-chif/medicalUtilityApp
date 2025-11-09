# 🧠 Sistema di Auto-Detection Universale - Guida Completa

**Autore**: ProfessioneSiCura Development Team
**Versione**: 2.0.0
**Data**: 2025-11-08
**Linguaggio**: Vue.js 3 + TypeScript (Adattabile a qualsiasi framework)

---

## 🎯 **Obiettivo del Sistema**

Creare un sistema **intelligente** che rileva **automaticamente** l'ambiente di esecuzione (development, staging, production) e **ottimizza** automaticamente:

- 💰 **Costi** (disabilita servizi costosi in development)
- 🔒 **Sicurezza** (log sensibili solo in development)
- ⚡ **Performance** (cache, API limits, ecc.)
- 📊 **Monitoring** (debug tools solo in development)

**Niente configurazione manuale!** Il sistema decide tutto da solo.

---

## 🏗️ **Architettura del Sistema**

### **3 Layer Principali**:

```
┌─────────────────────────────────────────┐
│   🧠 useSmartEnvironment.ts             │  ← Livello 1: Detection
│   - Rileva automaticamente ambiente      │
│   - Genera config ottimizzata            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│   🚀 useSmartServices.ts                │  ← Livello 2: Services
│   - Gestisce servizi costosi             │
│   - Auto-disable in development          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│   📊 useAdvancedLogger.ts               │  ← Livello 3: Logging
│   - Logger universale con auto-config    │
│   - GDPR-compliant                       │
└─────────────────────────────────────────┘
```

---

## 📂 **File Principali**

### **1. `useSmartEnvironment.ts` - Il Cuore del Sistema**

**Responsabilità**: Rilevare automaticamente dove si trova l'app

**Codice Chiave**:

```typescript
/**
 * 🧠 AUTO-DETECTION INTELLIGENTE
 */
function detectEnvironment(): EnvironmentType {
  // 🏠 STEP 1: Controlla hostname
  const hostname = window.location.hostname;

  if (hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.')) {
    return 'development';
  }

  // 🌍 STEP 2: Controlla process.env (se disponibile)
  if (typeof process !== 'undefined' && process.env) {
    const nodeEnv = process.env.NODE_ENV?.toLowerCase();
    if (nodeEnv === 'development') return 'development';
    if (nodeEnv === 'staging') return 'staging';
    if (nodeEnv === 'production') return 'production';
  }

  // 🚀 STEP 3: Controlla URL patterns
  if (hostname.includes('staging') || hostname.includes('dev.')) {
    return 'staging';
  }

  // ✅ STEP 4: Default = production (se online e non localhost)
  return 'production';
}
```

**Perché Funziona**:
1. ✅ **Multi-sorgente**: Controlla hostname, `process.env`, URL patterns
2. ✅ **Fallback sicuro**: Se non è localhost → production
3. ✅ **Framework-agnostic**: Funziona con Vue, React, Angular, vanilla JS

---

### **2. Generazione Configurazione Intelligente**

```typescript
/**
 * 💰 CONFIGURAZIONE COSTI AUTO-OTTIMIZZATA
 */
const generateCostConfig = (
  environment: EnvironmentType,
  hosting: HostingType
): ICostConfig => {
  const isDev = environment === 'development';
  const isLocalhost = hosting === 'localhost';

  return {
    // 🏠 Development/Localhost: TUTTO GRATUITO!
    enableRemoteLogging: !isDev && !isLocalhost,    // ❌ Dev = NO costi Firebase
    enableAnalytics: !isDev && !isLocalhost,        // ❌ Dev = NO costi Google Analytics
    enablePushNotifications: !isDev,                // ❌ Dev = NO push (costosi)
    enableFileUpload: true,                         // ✅ Sempre abilitato (locale)
    enableRealtimeUpdates: !isDev,                  // ❌ Dev = NO real-time (costoso)

    // ⚡ Performance ottimizzata
    cacheTTL: isDev ? 60000 : 300000,               // 1min dev, 5min prod
    maxApiCalls: isDev ? 1000 : 100                 // Più chiamate in dev
  };
};
```

**Risultato**:
- **Development**: Tutti i servizi costosi disabilitati → **€0/mese**
- **Production**: Servizi abilitati selettivamente → **Costi ottimizzati**

---

## 🚀 **Implementazione in Nuovo Progetto**

### **STEP 1: Copia i File**

Copia nella tua cartella `composables/` o `utils/`:

```
src/
├── composables/
│   ├── useSmartEnvironment.ts    ← File principale
│   ├── useSecureLogger.ts        ← Logger base
│   └── logger.config.ts          ← Config logging
```

### **STEP 2: Adatta il Codice**

**File minimo `useSmartEnvironment.ts` (standalone)**:

```typescript
// useSmartEnvironment.ts - Versione Minimale per Altri Progetti

export type EnvironmentType = 'development' | 'production' | 'staging';

export interface ISmartConfig {
  environment: EnvironmentType;
  isDevelopment: boolean;
  isProduction: boolean;
  enableRemoteLogging: boolean;
  enableAnalytics: boolean;
  cacheTTL: number;
}

/**
 * 🧠 AUTO-DETECTION UNIVERSALE
 */
export function useSmartEnvironment() {

  // 🔍 Rileva ambiente automaticamente
  const detectEnvironment = (): EnvironmentType => {
    const hostname = window.location.hostname;

    // 🏠 Localhost patterns
    if (hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.startsWith('192.168.')) {
      return 'development';
    }

    // 🌍 Process.env (Webpack/Vite)
    const nodeEnv = import.meta?.env?.MODE ||
                    process?.env?.NODE_ENV ||
                    'production';

    if (nodeEnv === 'development') return 'development';
    if (nodeEnv === 'staging') return 'staging';

    // 🚀 Default
    return 'production';
  };

  // 📊 Genera config intelligente
  const environment = detectEnvironment();
  const isDevelopment = environment === 'development';
  const isProduction = environment === 'production';

  const config: ISmartConfig = {
    environment,
    isDevelopment,
    isProduction,

    // 💰 Auto-ottimizzazione costi
    enableRemoteLogging: !isDevelopment,  // Solo in prod
    enableAnalytics: !isDevelopment,      // Solo in prod
    cacheTTL: isDevelopment ? 60000 : 300000  // 1min vs 5min
  };

  return { config };
}
```

**Uso nel tuo progetto**:

```typescript
// In qualsiasi componente
import { useSmartEnvironment } from './useSmartEnvironment';

const { config } = useSmartEnvironment();

// 🎯 Auto-ottimizzazione automatica!
if (config.enableRemoteLogging) {
  // Solo in production
  sendToFirebase(logData);
} else {
  // In development - GRATIS!
  console.log('LOCAL:', logData);
}
```

---

## 🔍 **Logica di Detection Dettagliata**

### **Metodo 1: Hostname Detection** (Più affidabile)

```typescript
const detectByHostname = () => {
  const hostname = window.location.hostname;

  // ✅ Localhost patterns (SEMPRE development)
  const localhostPatterns = [
    'localhost',
    '127.0.0.1',
    '::1',                    // IPv6 localhost
    /^192\.168\.\d+\.\d+$/,   // LAN
    /^10\.\d+\.\d+\.\d+$/,    // LAN privata
    /\.local$/                 // mDNS
  ];

  if (localhostPatterns.some(p =>
    typeof p === 'string' ? hostname === p : p.test(hostname)
  )) {
    return 'development';
  }

  // 🚀 Cloud hosting patterns
  if (hostname.includes('netlify.app')) return 'production';
  if (hostname.includes('vercel.app')) return 'production';
  if (hostname.includes('firebaseapp.com')) return 'production';

  // 🧪 Staging patterns
  if (hostname.includes('staging')) return 'staging';
  if (hostname.includes('dev.')) return 'staging';

  return 'production';
};
```

### **Metodo 2: Process.env Detection** (Webpack/Vite)

```typescript
const detectByEnv = () => {
  // Vite
  if (import.meta?.env) {
    const mode = import.meta.env.MODE;
    if (mode === 'development') return 'development';
    if (mode === 'production') return 'production';
  }

  // Webpack / Node.js
  if (typeof process !== 'undefined' && process.env) {
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === 'development') return 'development';
    if (nodeEnv === 'production') return 'production';
  }

  return null;
};
```

### **Metodo 3: URL Protocol** (Meno affidabile)

```typescript
const detectByProtocol = () => {
  const protocol = window.location.protocol;

  // ⚠️ ATTENZIONE: Non sempre affidabile!
  // Development può usare HTTPS (localhost con cert)
  if (protocol === 'http:') {
    // Probabilmente development (ma non sempre!)
    return 'development';
  }

  return 'production';
};
```

### **Strategia Combinata** (Consigliata)

```typescript
const detectEnvironment = (): EnvironmentType => {
  // 1️⃣ PRIORITY 1: Hostname (più affidabile)
  const byHostname = detectByHostname();
  if (byHostname) return byHostname;

  // 2️⃣ PRIORITY 2: Environment variables
  const byEnv = detectByEnv();
  if (byEnv) return byEnv;

  // 3️⃣ PRIORITY 3: Protocol (fallback)
  const byProtocol = detectByProtocol();
  if (byProtocol) return byProtocol;

  // 4️⃣ DEFAULT: Sicuro = production
  return 'production';
};
```

**Perché questa priorità?**
- ✅ **Hostname**: Sempre disponibile, difficile da sbagliare
- ✅ **Env variables**: Affidabile ma dipende dal bundler
- ⚠️ **Protocol**: Meno affidabile (dev può essere HTTPS)

---

## 💰 **Ottimizzazione Costi Automatica**

### **Esempio: Firebase Remote Logging**

```typescript
// ❌ SENZA auto-detection (COSTOSO!)
const logger = {
  log: (msg) => {
    console.log(msg);
    sendToFirebase(msg);  // ← SEMPRE invia! €€€
  }
};

// ✅ CON auto-detection (GRATIS in dev!)
const { config } = useSmartEnvironment();

const logger = {
  log: (msg) => {
    console.log(msg);

    if (config.enableRemoteLogging) {
      sendToFirebase(msg);  // ← Solo in production!
    }
  }
};
```

**Risparmio mensile**: ~€5-20/mese (a seconda del traffico dev)

### **Esempio: Google Analytics**

```typescript
// ✅ Auto-detection
if (config.enableAnalytics) {
  gtag('event', 'page_view');  // Solo in production
}
```

**Risparmio**:
- Analytics non inquinato da traffico dev
- Dati più accurati
- Niente falsi positivi

---

## 🔒 **Sicurezza e Privacy**

### **GDPR-Compliant Logging**

```typescript
const sanitizeSensitiveData = (data: any) => {
  const sensitive = ['email', 'phone', 'password', 'token'];
  const sanitized = { ...data };

  sensitive.forEach(key => {
    if (key in sanitized) {
      if (config.isDevelopment) {
        // 🏠 Dev: Mostra parzialmente (per debug)
        sanitized[key] = sanitized[key].substring(0, 3) + '***';
      } else {
        // 🚀 Prod: Nascondi completamente (GDPR)
        sanitized[key] = '[REDACTED]';
      }
    }
  });

  return sanitized;
};

// Uso
const userData = { email: 'user@example.com', name: 'John' };
const safe = sanitizeSensitiveData(userData);

// Dev:  { email: 'use***', name: 'John' }
// Prod: { email: '[REDACTED]', name: 'John' }
```

---

## 📊 **Monitoring e Debugging**

### **Auto-Report all'avvio**

```typescript
export function useSmartEnvironment() {
  const config = generateConfig();

  // 📊 Log solo in development
  if (config.isDevelopment) {
    console.group('🧠 Smart Environment Detection');
    console.log('Environment:', config.environment);
    console.log('Hostname:', window.location.hostname);
    console.log('Remote Logging:', config.enableRemoteLogging ? '✅ ON' : '❌ OFF');
    console.log('Cost Status:', config.isDevelopment ? '💰 FREE' : '💸 PAID');
    console.groupEnd();
  }

  return { config };
}
```

**Output in Development**:
```
🧠 Smart Environment Detection
  Environment: development
  Hostname: localhost
  Remote Logging: ❌ OFF
  Cost Status: 💰 FREE
```

**Output in Production**: (silenzio - niente log inutili)

---

## 🧪 **Testing della Detection**

### **Test Suite Completo**

```typescript
// tests/smartEnvironment.test.ts

describe('useSmartEnvironment', () => {

  it('should detect localhost as development', () => {
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { hostname: 'localhost' }
    });

    const { config } = useSmartEnvironment();
    expect(config.environment).toBe('development');
    expect(config.enableRemoteLogging).toBe(false);
  });

  it('should detect production domain', () => {
    Object.defineProperty(window, 'location', {
      value: { hostname: 'myapp.netlify.app' }
    });

    const { config } = useSmartEnvironment();
    expect(config.environment).toBe('production');
    expect(config.enableRemoteLogging).toBe(true);
  });

  it('should detect staging environment', () => {
    Object.defineProperty(window, 'location', {
      value: { hostname: 'staging.myapp.com' }
    });

    const { config } = useSmartEnvironment();
    expect(config.environment).toBe('staging');
  });
});
```

---

## 🌐 **Compatibilità Framework**

### **Vue.js 3** (Originale)

```typescript
import { reactive, computed } from 'vue';

export function useSmartEnvironment() {
  const config = reactive(generateConfig());
  const isDev = computed(() => config.isDevelopment);

  return { config, isDev };
}
```

### **React** (Adattamento)

```typescript
import { useMemo } from 'react';

export function useSmartEnvironment() {
  const config = useMemo(() => generateConfig(), []);
  const isDev = config.isDevelopment;

  return { config, isDev };
}
```

### **Angular** (Adattamento)

```typescript
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SmartEnvironmentService {
  private config = generateConfig();

  get isDevelopment() {
    return this.config.isDevelopment;
  }
}
```

### **Vanilla JavaScript** (Zero dependencies)

```typescript
// No framework needed!
const SmartEnvironment = (() => {
  const config = generateConfig();

  return {
    config,
    isDev: config.isDevelopment
  };
})();

// Uso
if (SmartEnvironment.isDev) {
  console.log('Development mode!');
}
```

---

## 🎯 **Casi d'Uso Reali**

### **1. Firebase Analytics**

```typescript
const { config } = useSmartEnvironment();

// ✅ Analytics solo in production
if (config.enableAnalytics) {
  analytics.logEvent('page_view', {
    page_path: window.location.pathname
  });
}
```

### **2. Error Reporting (Sentry)**

```typescript
if (config.isProduction) {
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    environment: config.environment
  });
}
```

### **3. Feature Flags**

```typescript
const features = {
  betaFeatures: config.isDevelopment || config.environment === 'staging',
  debugPanel: config.isDevelopment,
  performanceMetrics: config.isDevelopment
};

// Uso
if (features.betaFeatures) {
  showBetaUI();
}
```

### **4. API Rate Limiting**

```typescript
const apiLimits = {
  maxRequestsPerHour: config.isDevelopment ? 1000 : 100,
  cacheTTL: config.isDevelopment ? 60000 : 300000
};

// Cache più lunga in production
const cachedData = await fetchWithCache(url, apiLimits.cacheTTL);
```

---

## 📋 **Checklist Implementazione**

Quando implementi in un nuovo progetto:

- [ ] ✅ Copia `useSmartEnvironment.ts`
- [ ] ✅ Adatta `ISmartConfig` per i tuoi servizi
- [ ] ✅ Testa su localhost → deve rilevare "development"
- [ ] ✅ Testa su staging/production → deve rilevare correttamente
- [ ] ✅ Verifica che servizi costosi siano disabilitati in dev
- [ ] ✅ Aggiungi test automatici
- [ ] ✅ Documenta configurazione custom nel README

---

## 🚨 **Errori Comuni da Evitare**

### **1. Usare solo `process.env.NODE_ENV`**

```typescript
// ❌ SBAGLIATO - Non funziona in tutti i casi
const isDev = process.env.NODE_ENV === 'development';
```

**Problema**:
- `process` non sempre disponibile (browser moderni)
- Vite usa `import.meta.env.MODE`
- Può essere undefined

**Soluzione**: Usa multi-detection (hostname + env + fallback)

### **2. Assumere che HTTP = Development**

```typescript
// ❌ SBAGLIATO
const isDev = window.location.protocol === 'http:';
```

**Problema**:
- Development può usare HTTPS (cert locale)
- Production può usare HTTP (redirect)

**Soluzione**: Usa hostname come fonte principale

### **3. Hard-coded Environment**

```typescript
// ❌ SBAGLIATO
const config = {
  isProduction: true  // ← Hard-coded!
};
```

**Problema**: Devi cambiare codice per ogni deploy

**Soluzione**: Auto-detection sempre!

---

## 📚 **Risorse Aggiuntive**

### **File del Progetto**:

1. **`shared/composables/useSmartEnvironment.ts`** - Sistema completo
2. **`shared/composables/useSecureLogger.ts`** - Logger con auto-detection
3. **`shared/composables/useAdvancedLogger.ts`** - Logger avanzato
4. **`shared/composables/useSmartServices.ts`** - Gestione servizi costosi

### **Pattern Correlati**:

- **Environment Variables Best Practices**
- **Cost Optimization Strategies**
- **GDPR-Compliant Logging**
- **Multi-Environment CI/CD**

---

## 🎓 **Lezioni Chiave per Altri Progetti**

### **1. Auto-Detection è SEMPRE meglio di Config Manuale**

**Perché?**
- ✅ Zero errori umani (dimenticare di cambiare config)
- ✅ Zero deploy accidentali in ambiente sbagliato
- ✅ Sviluppatori felici (meno configurazione)

### **2. Hostname è la Fonte Più Affidabile**

**Perché?**
- ✅ Sempre disponibile (`window.location`)
- ✅ Difficile da sbagliare (localhost è sempre localhost)
- ✅ Nessuna dipendenza da bundler

### **3. Fallback Sicuro = Production**

**Perché?**
- ✅ Se non sai dove sei → assume production
- ✅ Meglio costi extra che security breach
- ✅ Log mancanti meglio di log sensibili pubblici

### **4. Ottimizza per Costi = Ottimizza per Performance**

**Perché?**
- ✅ Meno chiamate remote = app più veloce
- ✅ Cache più lunga = meno latenza
- ✅ Log locali = meno overhead

---

## 🚀 **Prossimi Passi**

1. **Copia il sistema** nel tuo nuovo progetto
2. **Adatta `ISmartConfig`** per i tuoi servizi specifici
3. **Testa** in tutti gli ambienti (localhost, staging, prod)
4. **Monitora** i costi - dovresti vedere **€0 in development**
5. **Condividi** con il team!

---

## 💡 **Conclusione**

Questo sistema di auto-detection è:

✅ **Universale** - Funziona con qualsiasi framework
✅ **Intelligente** - Rileva automaticamente l'ambiente
✅ **Economico** - €0 in development, ottimizzato in production
✅ **Sicuro** - GDPR-compliant, privacy-first
✅ **Scalabile** - Cresce con il tuo progetto

**Investimento iniziale**: 1-2 ore di setup
**Risparmio annuale**: €60-240/anno (servizi Firebase/Analytics)
**ROI**: Infinito (lavora per sempre!)

---

**Buon coding!** 🚀

_Se hai domande, controlla i file originali nel progetto o apri una issue._
