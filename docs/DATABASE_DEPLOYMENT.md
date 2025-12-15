# 🗄️ Database Migration & Deployment

> **Consolidated Database & Deployment Guide**  
> **Version**: 2.0 | **Date**: December 10, 2025

---

## 📋 Overview

Migrate drug compatibility data from PostgreSQL to Firebase + deploy to production.

---

## 🔄 Migration Workflow

```
PostgreSQL → Python Script → Google Sheets → Review → Firebase
```

### Files

- Script: `scripts/export_compatibility_to_google_sheets.py`
- Old project: `github.com/vas-chif/drugsCompatibility`
- Sheet: `docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k`

---

## 🛠️ Migration Steps

### 1. Export from PostgreSQL

```bash
# Connetti al database
psql -U postgres -d DrugsCompatibility

# Export CSV
\copy (SELECT * FROM drug_compatibility) TO '/tmp/drugs.csv' CSV HEADER;
```

### 2. Python Script

```python
import psycopg2
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Connect PostgreSQL
conn = psycopg2.connect("dbname=DrugsCompatibility user=postgres")
cur = conn.cursor()
cur.execute("SELECT drug_a, drug_b, compatibility FROM drug_compatibility")

# Write to Google Sheets
credentials = Credentials.from_service_account_file('credentials.json')
service = build('sheets', 'v4', credentials=credentials)
sheet_id = '1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k'

body = {'values': cur.fetchall()}
service.spreadsheets().values().update(
    spreadsheetId=sheet_id,
    range='Sheet1!A1',
    valueInputOption='RAW',
    body=body
).execute()
```

### 3. Compatibility Codes

| Code | Meaning      | Color    |
| ---- | ------------ | -------- |
| `C`  | Compatible   | 🟢 Green |
| `I`  | Incompatible | 🔴 Red   |
| `U`  | Unknown      | ⚪ Gray  |

### 4. Firebase Import

Use Google Sheets Bulk Mode (see `GOOGLE_SHEETS.md`)

---

## 🚀 Deployment

### 1. Setup Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

### 2. Environment Detection

Smart Environment auto-detects:

| Hostname           | Environment | Remote Logging | Cost      |
| ------------------ | ----------- | -------------- | --------- |
| localhost:9000     | DEV         | ❌             | €0        |
| \*.firebaseapp.com | PROD        | ✅             | Monitored |
| \*.web.app         | PROD        | ✅             | Monitored |

**Config Files**:

- `.env.development` - Dev Firebase keys
- `.env.production` - Prod Firebase keys

### 3. Build & Deploy

```bash
# Build
yarn build

# Preview locally
firebase serve --only hosting

# Deploy to production
firebase deploy --only hosting

# Deploy functions + hosting
firebase deploy
```

### 4. Post-Deploy Checks

```bash
# Check deployment
firebase hosting:sites:list

# View logs
firebase functions:log

# Monitor usage
open https://console.firebase.google.com/project/medical-utility-pro/overview
```

---

## 🔐 Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Drugs collection: read-only
    match /drugs/{drugId} {
      allow read: if true;
      allow write: if request.auth != null &&
                      request.auth.token.admin == true;
    }

    // User data: authenticated only
    match /users/{userId} {
      allow read, write: if request.auth != null &&
                            request.auth.uid == userId;
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
                      request.auth.uid == userId &&
                      request.resource.size < 5 * 1024 * 1024; // 5MB limit
    }
  }
}
```

---

## 📊 Monitoring

### Key Metrics

```bash
# Functions invocations
firebase functions:log --only getDrugs

# Hosting bandwidth
firebase hosting:clone

# Firestore reads
# Check Console: Database → Usage tab
```

### Alerts

Set up in Firebase Console:

- Budget alerts (>€10/month)
- Error rate >1%
- Response time >500ms

---

## 🐛 Troubleshooting

### Issue: Build fails

```bash
# Clear cache
rm -rf node_modules .quasar dist
yarn install
yarn build
```

### Issue: Wrong environment detected

```typescript
// Force environment
localStorage.setItem('forceEnv', 'production');
location.reload();
```

### Issue: Firestore rules deny access

```bash
# Test rules locally
firebase emulators:start --only firestore

# Deploy new rules
firebase deploy --only firestore:rules
```

---

## 🔗 Related Docs

- Smart Environment: `SMART_ENVIRONMENT.md`
- Google Sheets: `GOOGLE_SHEETS.md`
- Implementation: `IMPLEMENTATION_GUIDE.md`

---

**Author**: Vasile Chifeac  
**Project**: Medical Utility Pro
