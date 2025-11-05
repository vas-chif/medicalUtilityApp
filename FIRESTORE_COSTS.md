# 🔥 Firebase Firestore - Analisi Costi per Medical Utility App

## 💰 Costi Firestore (Piano Spark - GRATUITO)

### ✅ **Piano GRATUITO (Spark Plan)**

Per un'app come Medical Utility, il piano gratuito è **PIÙ CHE SUFFICIENTE**:

| Risorsa                  | Quota Gratuita | Sufficiente per?             |
| ------------------------ | -------------- | ---------------------------- |
| **Documenti letti**      | 50.000/giorno  | ✅ Sì, anche con 100+ utenti |
| **Documenti scritti**    | 20.000/giorno  | ✅ Sì, più che abbastanza    |
| **Documenti cancellati** | 20.000/giorno  | ✅ Sì                        |
| **Storage**              | 1 GB           | ✅ Sì, per database farmaci  |
| **Rete in uscita**       | 10 GB/mese     | ✅ Sì                        |

### 📊 **Stima Utilizzo Medical Utility App**

#### Scenario: 50 utenti/giorno

```
Database: 10 farmaci + matrice compatibilità (10x10)
= ~110 documenti totali

Utilizzo tipico per utente:
- Carica lista farmaci: 1 lettura
- Carica matrice compatibilità: 1 lettura
- Fa 3 controlli: 3 letture

Totale per utente: 5 letture/giorno

50 utenti × 5 letture = 250 letture/giorno
```

**Risultato: 250/50.000 = 0.5% della quota gratuita** ✅

#### Scenario: 500 utenti/giorno

```
500 utenti × 5 letture = 2.500 letture/giorno
2.500/50.000 = 5% della quota gratuita ✅
```

#### Anche con 1000+ farmaci:

```
1000 farmaci + 1.000.000 interazioni nella matrice
= Storage: ~10 MB (su 1 GB gratuito) ✅
```

---

## 🎯 **Vantaggi Firestore per Medical Utility**

### ✅ **PRO:**

1. **Offline First** 🔌
   - Funziona ANCHE senza internet
   - Cache locale automatica
   - Sincronizzazione automatica quando torna online

2. **No Server Needed** 🖥️
   - Nessun backend da gestire
   - Nessun costo server
   - Nessuna manutenzione

3. **Scalabilità Automatica** 📈
   - Da 1 a 1.000.000 utenti
   - Stesso codice
   - Zero configurazione

4. **Realtime Updates** ⚡
   - Aggiornamenti istantanei
   - Tutti i client sincronizzati
   - Push automatico modifiche

5. **Sicurezza Integrata** 🔒
   - Rules per controllo accessi
   - Validazione lato server
   - Encryption automatica

6. **Backup Automatico** 💾
   - Cloud Google
   - Ridondanza geografica
   - Disaster recovery incluso

### ⚠️ **CONTRO:**

1. **Dipendenza Google**
   - Vendor lock-in
   - Necessita account Google

2. **Query Limitate**
   - Query complesse possono essere costose
   - Meglio denormalizzare i dati

---

## 💻 **Implementazione Firestore**

### Struttura Database Ottimizzata

```typescript
// Collection: drugs
drugs/{drugId}
  - id: string
  - name: string
  - activeIngredient: string
  - category: string
  - concentration: string
  - route: string
  - clinicalNotes: string

// Collection: compatibility (denormalizzata per performance)
compatibility/{drug1_drug2}
  - drug1: string
  - drug2: string
  - status: 'C' | 'Y' | 'I' | '!' | ''
  - notes: string
  - lastUpdate: timestamp

// Esempio documento:
compatibility/Fentanyl_Midazolam
  drug1: "Fentanyl"
  drug2: "Midazolam"
  status: "C"
  notes: "Compatibili"
  lastUpdate: 2025-11-05
```

### Firestore Rules (Sicurezza)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Drugs: Read-only per tutti
    match /drugs/{drugId} {
      allow read: if true;
      allow write: if false; // Solo admin via console
    }

    // Compatibility: Read-only per tutti
    match /compatibility/{compatId} {
      allow read: if true;
      allow write: if false; // Solo admin via console
    }
  }
}
```

---

## 📦 **Codice Implementazione**

### 1. Installazione

```bash
npm install firebase
```

### 2. Configurazione

```typescript
// src/boot/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'medical-utility.firebaseapp.com',
  projectId: 'medical-utility',
  storageBucket: 'medical-utility.appspot.com',
  messagingSenderId: '123456789',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Abilita persistenza offline
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Persistenza: Multiple tabs open');
  } else if (err.code === 'unimplemented') {
    console.warn('Persistenza: Browser not supported');
  }
});

export { db };
```

### 3. Composable Firestore

```typescript
// src/composables/useDrugCompatibilityFirestore.ts
import { ref } from 'vue';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/boot/firebase';

export function useDrugCompatibilityFirestore() {
  const drugs = ref([]);
  const isLoading = ref(false);

  // Carica farmaci (con cache offline)
  const loadDrugs = async () => {
    isLoading.value = true;
    try {
      const querySnapshot = await getDocs(collection(db, 'drugs'));
      drugs.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error loading drugs:', error);
    } finally {
      isLoading.value = false;
    }
  };

  // Controlla compatibilità
  const checkCompatibility = async (drug1, drug2) => {
    try {
      const compatId = [drug1, drug2].sort().join('_');
      const docRef = doc(db, 'compatibility', compatId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().status;
      }
      return ''; // No data
    } catch (error) {
      console.error('Error checking compatibility:', error);
      return '';
    }
  };

  return {
    drugs,
    isLoading,
    loadDrugs,
    checkCompatibility,
  };
}
```

---

## 🔄 **Migrazione da JSON a Firestore**

### Script di Import

```typescript
// scripts/importToFirestore.ts
import { db } from './firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import drugsData from '../src/data/drugs.json';

async function importDrugs() {
  console.log('Importing drugs...');

  for (const drug of drugsData.drugs) {
    await setDoc(doc(db, 'drugs', drug.id), drug);
    console.log(`✅ Imported: ${drug.name}`);
  }

  console.log('Importing compatibility matrix...');

  for (const [drug1, compatibilities] of Object.entries(drugsData.compatibilityMatrix)) {
    for (const [drug2, status] of Object.entries(compatibilities)) {
      const compatId = [drug1, drug2].sort().join('_');
      await setDoc(doc(db, 'compatibility', compatId), {
        drug1,
        drug2,
        status,
        lastUpdate: new Date(),
      });
      console.log(`✅ Imported: ${drug1} <-> ${drug2}`);
    }
  }

  console.log('✅ Import completed!');
}

importDrugs();
```

---

## 📊 **Confronto Soluzioni**

| Soluzione       | Costo         | Offline | Manutenzione  | Scalabilità |
| --------------- | ------------- | ------- | ------------- | ----------- |
| **JSON Locale** | €0            | ✅ Sì   | ❌ Manuale    | ⚠️ Limitata |
| **Firestore**   | €0 (gratuito) | ✅ Sì   | ✅ Automatica | ✅ Infinita |
| **PostgreSQL**  | €5-20/mese    | ❌ No   | ❌ Server     | ⚠️ Manuale  |
| **API Custom**  | €10-50/mese   | ❌ No   | ❌ Backend    | ⚠️ Manuale  |

---

## 🎯 **Raccomandazione**

### **Per Medical Utility App:**

✅ **USA FIRESTORE** perché:

1. **GRATUITO** per sempre (nei limiti)
2. **Offline-first** - funziona senza internet
3. **Zero manutenzione** - nessun server
4. **Backup automatico** - dati sicuri
5. **Scalabile** - da 10 a 10.000 utenti senza cambiare nulla

### **Architettura Ibrida Consigliata:**

```
📁 Local JSON (Fallback)
  ↓
📁 Firestore (Principale)
  ↓
📁 Cache Browser (Performance)
```

**Come funziona:**

1. App parte con JSON locale (sempre disponibile)
2. Connessione Firestore in background
3. Se disponibile, usa Firestore (aggiornamenti realtime)
4. Se offline, usa cache locale
5. JSON locale come fallback finale

---

## 🚀 **Prossimi Passi**

1. ✅ **Database JSON creato** - Fatto!
2. ⏳ **Setup Firebase** - Creare progetto
3. ⏳ **Import dati** - Migrazione JSON → Firestore
4. ⏳ **Implementa composable** - useDrugCompatibilityFirestore
5. ⏳ **Test offline** - Verificare cache locale

---

## ❓ FAQ Costi Firestore

**Q: Costa davvero €0?**  
A: Sì! Fino a 50.000 letture/giorno è GRATIS.

**Q: Se supero i limiti?**  
A: Passa a piano Blaze (pay-as-you-go), costi minimi (~€0.36/100k letture extra).

**Q: Dati sicuri anche se Google va down?**  
A: Sì! Cache locale + JSON fallback = app sempre funzionante.

**Q: Posso migrare via da Firestore in futuro?**  
A: Sì! Export JSON sempre possibile, dati non locked.

**Q: Serve carta di credito?**  
A: NO per piano gratuito! Solo se vuoi plan Blaze.

---

## 📝 Conclusione

**Firestore è PERFETTO per Medical Utility App:**

- ✅ Costo: €0
- ✅ Offline: Sì
- ✅ Manutenzione: Zero
- ✅ Backup: Automatico
- ✅ Scalabilità: Infinita

**Non ci sono costi nascosti!** 🎉
