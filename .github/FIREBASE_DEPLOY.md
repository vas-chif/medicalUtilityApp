# 🚀 Firebase Deploy - GitHub Actions Setup

**Setup unico per tutti i progetti Firebase (ICUBoost, Medical Utility, futuri progetti)**

---

## 📋 Setup Iniziale (Una Tantum per Progetto)

### 1️⃣ Genera Token CI

```bash
# Installa Firebase CLI (se non già installato)
npm install -g firebase-tools

# Login e genera token CI
firebase login:ci --no-localhost
```

**Output:**
```
✔ Success! Use this token to login on a CI server:
1//09By5_j9RmSUo... (copia questo token)
```

### 2️⃣ Aggiungi GitHub Secret

1. **Vai su**: `https://github.com/<owner>/<repo>/settings/secrets/actions`
2. **Click**: "New repository secret"
3. **Nome**: `FIREBASE_TOKEN` (o nome personalizzato, es. `FIREBASE_TOKEN_MEDICAL_UTILITY`)
4. **Valore**: Incolla il token dal passo 1
5. **Click**: "Add secret"

### 3️⃣ Verifica `.firebaserc`

Assicurati che esista nel root del progetto:

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

---

## 🎯 Deploy Manuale da GitHub UI

1. **Vai su**: `https://github.com/<owner>/<repo>/actions`
2. **Seleziona**: "Deploy to Firebase Hosting"
3. **Click**: "Run workflow" → Branch `main` → "Run workflow"
4. **Attendi**: ~2-3 minuti
5. **Verifica**: `https://your-project.web.app`

---

## 🔄 Switch tra Account Firebase (Multi-Progetto)

```bash
# Per ICUBoost (paradosiss@gmail.com)
firebase logout
firebase login --no-localhost
# → Login con paradosiss@gmail.com

# Per Medical Utility (nykname888@gmail.com)
firebase logout
firebase login --no-localhost
# → Login con nykname888@gmail.com

# Verifica progetto corrente
firebase projects:list
# → Quello con "(current)" è attivo
```

---

## 📁 File Necessari

### `.github/workflows/firebase-deploy.yml`

```yaml
name: Deploy to Firebase Hosting

on:
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout
        uses: actions/checkout@v4

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'yarn'

      - name: 📦 Install dependencies
        run: yarn install --frozen-lockfile

      - name: 🏗️ Build
        run: npx quasar build -m spa
        env:
          NODE_ENV: production

      - name: 🚀 Deploy
        if: github.ref == 'refs/heads/main'
        run: |
          npm install -g firebase-tools
          firebase deploy --only hosting --token ${{ secrets.FIREBASE_TOKEN_MEDICAL_UTILITY }}
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN_MEDICAL_UTILITY }}
```

### `firebase.json`

```json
{
  "hosting": {
    "public": "dist/spa",
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

### `.firebaserc`

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

---

## ✅ Checklist Pre-Deploy

- [ ] Token CI generato (`firebase login:ci`)
- [ ] GitHub Secret aggiunto
- [ ] `.firebaserc` configurato con project ID corretto
- [ ] `firebase.json` esiste
- [ ] Build locale funziona: `yarn build`
- [ ] Workflow file in `.github/workflows/`

---

## 🛠️ Troubleshooting

| Errore | Soluzione |
|--------|-----------|
| `FIREBASE_TOKEN is not set` | Verifica nome secret GitHub esatto |
| `Permission denied` | Rigenera token con `firebase login:ci` |
| `Build failed` | Test con `yarn build` e risolvi errori |
| `404 dopo deploy` | Verifica `rewrites` in `firebase.json` |
| `Progetto sbagliato` | Verifica `.firebaserc` project ID |

---

## 📊 Info Progetti

| Progetto | Account | Project ID | URL |
|----------|---------|------------|-----|
| ICUBoost | paradosiss@gmail.com | icuboost | icuboost.web.app |
| Medical Utility | nykname888@gmail.com | medical-utility | medical-utility.web.app |

---

**⚡ Deploy Flow**: GitHub UI → Checkout → Node.js 22 → Install → Build → Deploy (~2-3 min)
