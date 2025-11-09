# 🚀 GUIDA DEPLOYMENT FIREBASE

## 📋 Panoramica

Medical Utility Pro usa **Smart Environment Detection** per switching automatico tra configurazione development e production.

### Come funziona?

```
┌─────────────────────────────────────────────────────┐
│  1. Avvia applicazione                              │
│     ↓                                               │
│  2. useSmartEnvironment() rileva ambiente:          │
│     • localhost:9000 → DEVELOPMENT                  │
│     • *.firebaseapp.com → PRODUCTION               │
│     • *.web.app → PRODUCTION                       │
│     ↓                                               │
│  3. Carica file .env corretto:                      │
│     • Development → .env.development                │
│     • Production → .env.production                  │
│     ↓                                               │
│  4. Inizializza Firebase con config corretta        │
│     ↓                                               │
│  5. Abilita/disabilita servizi:                     │
│     • Development: Remote logging ❌ (GRATIS!)      │
│     • Production: Remote logging ✅ (monitorato)    │
└─────────────────────────────────────────────────────┘
```

---

## 🏗️ SETUP INIZIALE

### 1. Installa Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login Firebase

```bash
firebase login
```

### 3. Inizializza progetto (solo prima volta)

```bash
firebase init hosting
```

**Rispondi così:**

- **Use existing project?** ✅ YES
- **Project:** Seleziona il tuo progetto production
- **Public directory:** `dist` (Vite build output)
- **Single-page app?** ✅ YES
- **Automatic builds with GitHub?** ❌ NO (per ora)
- **Overwrite index.html?** ❌ NO

Questo genera `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 🚀 WORKFLOW DEPLOYMENT

### 🏠 DEVELOPMENT (locale)

```bash
# 1. Copia .env.development come .env
cp .env.development .env

# 2. Avvia dev server
yarn dev

# 3. Apri http://localhost:9000
# ✅ Smart environment rileva: DEVELOPMENT
# ✅ Remote logging: DISABLED (gratis!)
# ✅ Debug mode: ON
```

**Cosa succede:**

- `useSmartEnvironment()` rileva `localhost` → development
- Carica `.env.development` (Firebase dev project)
- Disabilita logging remoto (nessun costo Firebase!)
- Abilita debug mode (console logs visibili)

---

### 🚀 PRODUCTION (Firebase Hosting)

```bash
# 1. Copia .env.production come .env
cp .env.production .env

# 2. Build production
yarn build

# 3. Anteprima locale (opzionale)
firebase serve
# Apri http://localhost:5000 per testare

# 4. Deploy
firebase deploy --only hosting

# 5. Ottieni URL live
# https://<project-id>.web.app
# https://<project-id>.firebaseapp.com
```

**Cosa succede:**

- `useSmartEnvironment()` rileva `*.firebaseapp.com` → production
- Carica `.env.production` (Firebase prod project)
- Abilita remote logging (monitoraggio errori)
- Abilita analytics (tracciamento utenti)
- Disabilita debug mode

---

## 🔍 VERIFICA AUTO-DETECTION

### In Development (localhost)

Apri console browser:

```
🧠 SMART ENVIRONMENT DETECTED:
   🌍 Environment: development
   🏠 Hosting: localhost
   🔥 Firebase Project: medical-utility-dev
   💰 Remote Logging: DISABLED (free!)
   📊 Analytics: DISABLED
   🐛 Debug Mode: ON
```

### In Production (Firebase)

Console browser:

```
🧠 SMART ENVIRONMENT DETECTED:
   🌍 Environment: production
   🏠 Hosting: firebase
   🔥 Firebase Project: medical-utility-prod
   💰 Remote Logging: ENABLED (prod)
   📊 Analytics: ENABLED
   🐛 Debug Mode: OFF
```

---

## 📂 FILE STRUCTURE

```
medicalUtility/
├── .env.development          # ← Firebase dev config (locale)
├── .env.production           # ← Firebase prod config (cloud)
├── .env                      # ← Symlink a uno dei due (git-ignored)
├── firebase.json             # ← Firebase hosting config
├── .firebaserc               # ← Firebase project alias
├── dist/                     # ← Build output (generato da Vite)
└── src/
    ├── composables/
    │   └── useSmartEnvironment.ts  # ← Auto-detection
    └── firebase/
        └── firebaseInit.ts   # ← Firebase init con smart env
```

---

## 💰 OTTIMIZZAZIONE COSTI

Smart Environment ottimizza automaticamente:

| Feature                | Development | Production |
| ---------------------- | ----------- | ---------- |
| **Remote Logging**     | ❌ DISABLED | ✅ ENABLED |
| **Analytics**          | ❌ DISABLED | ✅ ENABLED |
| **Push Notifications** | ❌ DISABLED | ✅ ENABLED |
| **Realtime Updates**   | ❌ DISABLED | ✅ ENABLED |
| **Cache TTL**          | 1 minuto    | 5 minuti   |
| **API Rate Limit**     | 1000/h      | 100/h      |
| **Debug Logs**         | ✅ ON       | ❌ OFF     |

**Risultato:**

- 🏠 Development: **0€** di costi Firebase (tutto locale)
- 🚀 Production: Servizi ottimizzati (solo quando necessari)

---

## 🐛 TROUBLESHOOTING

### ❌ Errore: "Firebase configuration missing"

**Soluzione:**

```bash
# Verifica che .env esista
ls -la .env*

# Development
cp .env.development .env

# Production
cp .env.production .env

# Riavvia dev server
yarn dev
```

### ❌ Errore: "Project not found"

**Soluzione:**

```bash
# Verifica progetto Firebase
firebase projects:list

# Usa progetto corretto
firebase use <project-id>
```

### ❌ Build fallisce

**Soluzione:**

```bash
# Pulisci build cache
rm -rf dist/ node_modules/.vite

# Reinstalla dipendenze
yarn install

# Riprova build
yarn build
```

### ❌ Deploy fallisce con errore "unauthorized"

**Soluzione:**

```bash
# Re-login Firebase
firebase logout
firebase login

# Riprova deploy
firebase deploy --only hosting
```

---

## 📊 COMANDI UTILI

### Build e Deploy

```bash
# Build production
yarn build

# Preview build locale
firebase serve

# Deploy solo hosting
firebase deploy --only hosting

# Deploy tutto (hosting + functions)
firebase deploy

# Rollback ultima versione
firebase hosting:clone <source-site>:<source-version> <target-site>:live
```

### Monitoring

```bash
# Vedi log hosting
firebase hosting:channel:list

# Analytics (apri console Firebase)
firebase open hosting
```

### Testing

```bash
# Test development locale
yarn dev

# Test production build locale
yarn build && firebase serve

# Test production live
# Vai su https://<project-id>.web.app
```

---

## ✅ CHECKLIST DEPLOYMENT

Prima di fare deploy in production:

- [ ] ✅ File `.env.production` configurato correttamente
- [ ] ✅ Build senza errori (`yarn build`)
- [ ] ✅ Test locale build production (`firebase serve`)
- [ ] ✅ Verificato auto-detection ambiente (console browser)
- [ ] ✅ Testato login/logout
- [ ] ✅ Testato funzionalità principali
- [ ] ✅ Verificato Firebase project ID corretto
- [ ] ✅ Analytics configurato (se necessario)
- [ ] ✅ Backup dati esistenti (se update)

---

## 🎯 BEST PRACTICES

1. **Mai committare file .env su Git**

   ```bash
   # Già in .gitignore
   .env
   .env.local
   .env.*.local
   ```

2. **Usa .env.development per test**
   - Progetto Firebase separato
   - Dati di test, non dati reali

3. **Testa sempre build locale prima del deploy**

   ```bash
   yarn build && firebase serve
   ```

4. **Monitora costi Firebase Console**
   - Firestore reads/writes
   - Storage usage
   - Function invocations

5. **Usa versioning Firebase Hosting**
   - Ogni deploy crea una versione
   - Puoi fare rollback facilmente

---

## 🔗 LINK UTILI

- [Firebase Console](https://console.firebase.google.com)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Vite Build Docs](https://vitejs.dev/guide/build.html)

---

## 📞 SUPPORTO

Per problemi con deployment:

1. Controlla console browser (F12)
2. Verifica file `.env` corretto
3. Controlla `firebase.json` e `.firebaserc`
4. Testa `yarn build` locale
5. Verifica Firebase project ID

---

**Created by:** Vasile Chifeac  
**Version:** 1.0.0  
**Last Updated:** 2024-11-07
