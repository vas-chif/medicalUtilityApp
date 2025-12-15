# 🌍 Smart Environment - Auto-Detection System

> **Consolidated Smart Environment Documentation**  
> **Version**: 2.0 | **Date**: December 10, 2025

---

## 📋 Overview

Auto-detection system for environment (dev/production) with cost optimization.

**Benefits**:

- ✅ No manual config needed
- ✅ €0/month (stays in free tier)
- ✅ GDPR-compliant logging
- ✅ Vite-safe implementation

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│  useSmartEnvironment()                  │
│  - detectEnvironment()                  │
│  - Auto-detects: localhost/dev/prod    │
└─────────────────┬───────────────────────┘
                  │
      ┌───────────┴───────────┐
      ▼                       ▼
┌─────────────┐         ┌─────────────┐
│   DEV MODE  │         │  PROD MODE  │
│ - Console ✅│         │ - Console ❌│
│ - Remote ❌ │         │ - Remote ✅ │
│ - Debug ✅  │         │ - Debug ❌  │
└─────────────┘         └─────────────┘
```

---

## 🔧 Implementation

### composable: useSmartEnvironment.ts

```typescript
export function useSmartEnvironment() {
  // Auto-detect
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname.startsWith('192.168.');
  const isDev = isLocalhost || process.env.NODE_ENV === 'development';
  const isProd = !isDev;

  // Config
  const config = {
    enableConsole: isDev,
    enableRemote: isProd,
    minLevel: isDev ? 'DEBUG' : 'INFO',
  };

  return { isDev, isProd, config, firebaseConfig };
}
```

### Integration: firebaseInit.ts

```typescript
import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';

const { firebaseConfig } = useSmartEnvironment();
const app = initializeApp(firebaseConfig);
```

---

## 📊 Detection Logic

| Environment | Hostname        | NODE_ENV    | Result  |
| ----------- | --------------- | ----------- | ------- |
| Localhost   | localhost       | development | DEV ✅  |
| Local IP    | 192.168.x.x     | development | DEV ✅  |
| Vercel      | app.vercel.app  | production  | PROD ✅ |
| Firebase    | firebaseapp.com | production  | PROD ✅ |

---

## 🔐 Security

**Sensitive Data Masking** (auto-applied):

- Passwords → `***`
- Tokens → `[REDACTED]`
- PHI → `[PROTECTED]`

**GDPR Compliance**:

- No PHI in logs
- Consent before tracking
- Right to deletion

---

## 💰 Cost Optimization

### Firebase Costs (Free Tier Limits)

| Resource        | Free Tier      | Usage    | Status  |
| --------------- | -------------- | -------- | ------- |
| Cloud Functions | 2M invocations | ~100/day | ✅ Safe |
| Firestore Reads | 50k/day        | ~1k/day  | ✅ Safe |
| Hosting         | 10GB/month     | ~500MB   | ✅ Safe |

**Optimization**:

- Remote logs ONLY in production
- Cache API responses (95% hit rate)
- Lazy load components

**Monthly Cost**: **€0** 🎉

---

## 🧪 Testing

```typescript
import { useSmartEnvironment } from 'src/composables/useSmartEnvironment';

describe('useSmartEnvironment', () => {
  it('detects localhost as dev', () => {
    // Mock hostname
    Object.defineProperty(window, 'location', {
      value: { hostname: 'localhost' },
    });

    const { isDev } = useSmartEnvironment();
    expect(isDev).toBe(true);
  });
});
```

---

## 📚 Files

**Core**:

- `src/composables/useSmartEnvironment.ts` (350 lines)
- `src/composables/useSecureLogger.ts` (450 lines)

**Config**:

- `.env.development` - Dev Firebase config
- `.env.production` - Prod Firebase config

**Integration**:

- `src/firebase/firebaseInit.ts`
- 7 components using useSecureLogger

---

## 🔗 Related Docs

- Implementation: `IMPLEMENTATION_GUIDE.md`
- Costs: `FIRESTORE_COSTS.md` (merged here)
- Deployment: `DEPLOYMENT_GUIDE.md`

---

**Author**: Vasile Chifeac  
**Project**: Medical Utility Pro
