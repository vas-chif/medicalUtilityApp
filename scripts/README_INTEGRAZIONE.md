# Database Farmaci - Guida Integrazione

## 📋 Riepilogo

Conversione completata con successo! Database JSON generato con **134 farmaci** e **17,956 record di compatibilità**.

### File Generati

```
scripts/
├── input/
│   └── drugsCompatibility - compFarmaci.csv     # CSV sorgente (134 righe)
├── output/
│   ├── drugs-database.json                       # Database leggibile (1.7 MB)
│   └── drugs-database.min.json                   # Database minificato (958 KB)
├── csv-to-json-converter.py                      # Script conversione
└── DATABASE_FORMAT_SPECIFICATION.md              # Documentazione completa

src/
├── types/
│   └── drug-database.ts                          # TypeScript interfaces
└── services/
    └── drug-database.service.ts                  # Servizio query database
```

---

## 📊 Statistiche Database

| Metrica | Valore | Note |
|---------|--------|------|
| **Farmaci totali** | 134 | ✅ Completo |
| **Compatibilità totali** | 17,956 | Matrice 134×134 |
| **Compatibili (C)** | 3,048 (17.0%) | ✅ Sicuro mescolare |
| **Incompatibili (I)** | 3,544 (19.7%) | ⚠️ Non mescolare |
| **Compatibili condizionali (Y)** | 2,362 (13.2%) | ⚠️ Dipende dalla concentrazione |
| **Incompatibilità gravi (!)** | 310 (1.7%) | 🚨 Pericolo critico |
| **Sconosciuto (null)** | 8,692 (48.4%) | ℹ️ Necessita ricerca |
| **Farmaci con CVC richiesto** | 31 (23.1%) | 💉 Catetere centrale |
| **Farmaci fotosensibili** | 0 (0.0%) | ⚠️ Da verificare |

---

## 🎯 Stati Compatibilità

### Codifica Valori CSV → JSON

| CSV | JSON | Colore | Significato | UI |
|-----|------|--------|-------------|-----|
| `C` | `compatible` | 🟢 Verde | Compatibile | ✅ OK |
| `I` | `incompatible` | 🔴 Rosso | Incompatibile | ❌ NO |
| `Y` | `compatible-conditional` | 🟡 Giallo | Dipende concentrazione | ⚠️ Condizionale |
| `!` | `incompatible-severe` | 🔴 Rosso scuro | Pericolo grave | 🚨 CRITICO |
| `null` | `unknown` | ⚫ Grigio | Sconosciuto | ❓ ? |

### Esempi Incompatibilità Critiche (`!`)

```
🚨 ACETILCISTEINA ↔ NITROGLICERINA
🚨 ACETILCISTEINA ↔ NA-NITROPRUSSIATO-ANIDRO
🚨 ACICLOVIR ↔ CEFTRIAXONE DISODICO
🚨 ACICLOVIR ↔ MORFINA CLORIDRATO
```

> **⚠️ Importante**: Mostrare sempre alert rosso per incompatibilità gravi!

---

## 🔧 Campi Metadati Implementati

### 1. NECESSITÀ DI CVC (Central Venous Catheter)

**Valori possibili nel CSV**:
- `"CVC"` → CVC richiesto (standard)
- `"CVC+C"` → CVC richiesto con accesso centrale
- `"SI"` / `"SÌ"` → Sì, richiesto
- `"SI + C"` → Sì + centrale
- `"SI + C + S"` → Sì + centrale + speciale
- `""` (vuoto) o `"NO"` → Non richiesto

**Struttura JSON**:
```json
{
  "cvcRequirement": {
    "required": true,
    "details": {
      "it": "CVC+C",
      "en": ""
    }
  }
}
```

**31 farmaci richiedono CVC**, esempi:
- ACICLOVIR (CVC+C)
- ADRENALINA (CVC)
- AMFOTERICINA B (CVC+C)

### 2. FOTOSENSIBILE

Campo booleano semplice. Attualmente **0 farmaci** marcati come fotosensibili (verificare dati sorgente).

### 3. NOTES/CONCENTRAZIONI

Note testuali sulle concentrazioni sicure:
```json
{
  "concentrationNotes": {
    "it": ">= 10 mg/ml",
    "en": ""
  }
}
```

### 4. NOTO RISCHIO FLEBITE

Informazioni sul rischio di flebite:
```json
{
  "phlebitisRisk": {
    "it": "Alto rischio con concentrazioni > X",
    "en": ""
  }
}
```

### 5. ADDITIONAL INFO (Futuro)

Oggetto vuoto riservato per espansioni future:
```json
{
  "additionalInfo": {}
}
```

Puoi aggiungere:
- Categoria farmaco
- Vie di somministrazione
- Controindicazioni
- Riferimenti bibliografici

---

## 🚀 Quick Start - Integrazione App

### Step 1: Copia Database in Progetto

```bash
# Copia file minificato nella cartella public o assets
cp scripts/output/drugs-database.min.json public/data/drugs-database.json
```

### Step 2: Importa Tipi e Servizio

```typescript
// main.ts o boot file
import { drugDatabaseService } from 'src/services/drug-database.service';

// Carica database all'avvio app
await drugDatabaseService.loadDatabase('/data/drugs-database.json');
```

### Step 3: Usa il Servizio

```typescript
import { drugDatabaseService } from 'src/services/drug-database.service';
import { CompatibilityStatus } from 'src/types/drug-database';

// Cerca farmaci
const results = drugDatabaseService.searchDrugs({
  query: 'aciclovir',
  requiresCvc: true
});

// Verifica compatibilità
const compat = drugDatabaseService.checkCompatibility('aciclovir', 'morfina-cloridrato');

if (compat?.status === CompatibilityStatus.INCOMPATIBLE_SEVERE) {
  alert(`🚨 ${compat.warning}`);
}

// Ottieni tutti i farmaci con CVC
const cvcDrugs = drugDatabaseService.getCvcRequiredDrugs();
console.log(`${cvcDrugs.length} farmaci richiedono CVC`);

// Statistiche
const stats = drugDatabaseService.getStatistics();
console.log(stats);
```

---

## 📱 Esempi UI Quasar

### Card Farmaco con Badge

```vue
<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ drug.name.it }}</div>
      
      <!-- Badge CVC -->
      <q-badge 
        v-if="drug.cvcRequirement.required" 
        color="purple"
        class="q-mr-sm"
      >
        💉 CVC: {{ drug.cvcRequirement.details.it }}
      </q-badge>
      
      <!-- Badge Fotosensibile -->
      <q-badge 
        v-if="drug.isPhotosensitive" 
        color="orange"
      >
        ☀️ Fotosensibile
      </q-badge>
      
      <!-- Note concentrazione -->
      <div v-if="drug.concentrationNotes.it" class="text-caption q-mt-sm">
        📝 {{ drug.concentrationNotes.it }}
      </div>
      
      <!-- Rischio flebite -->
      <div v-if="drug.phlebitisRisk.it" class="text-negative text-caption">
        ⚠️ Flebite: {{ drug.phlebitisRisk.it }}
      </div>
    </q-card-section>
  </q-card>
</template>
```

### Dialog Compatibilità

```vue
<template>
  <q-dialog v-model="showDialog">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Verifica Compatibilità</div>
      </q-card-section>
      
      <q-card-section v-if="compatResult">
        <!-- Status Icon -->
        <div class="text-center q-mb-md">
          <q-icon 
            :name="getStatusIcon(compatResult.status)" 
            :color="getStatusColor(compatResult.status)"
            size="64px"
          />
        </div>
        
        <!-- Drugs -->
        <div class="text-body1 q-mb-sm">
          <strong>{{ compatResult.drug1.name.it }}</strong>
          <br>
          ↔️
          <br>
          <strong>{{ compatResult.drug2.name.it }}</strong>
        </div>
        
        <!-- Status -->
        <q-badge :color="getStatusColor(compatResult.status)">
          {{ getStatusLabel(compatResult.status) }}
        </q-badge>
        
        <!-- Warning -->
        <q-banner 
          v-if="compatResult.warning" 
          :class="isCritical(compatResult.status) ? 'bg-negative' : 'bg-warning'"
          class="text-white q-mt-md"
        >
          <template v-slot:avatar>
            <q-icon name="warning" />
          </template>
          {{ compatResult.warning }}
        </q-banner>
        
        <!-- Additional Info -->
        <div class="q-mt-md text-caption">
          <!-- CVC warnings -->
          <div v-if="compatResult.drug1.cvcRequirement.required">
            💉 {{ compatResult.drug1.name.it }}: {{ compatResult.drug1.cvcRequirement.details.it }}
          </div>
          <div v-if="compatResult.drug2.cvcRequirement.required">
            💉 {{ compatResult.drug2.name.it }}: {{ compatResult.drug2.cvcRequirement.details.it }}
          </div>
        </div>
      </q-card-section>
      
      <q-card-actions align="right">
        <q-btn flat label="Chiudi" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CompatibilityResult } from 'src/types/drug-database';
import { 
  getStatusIcon, 
  getStatusColor, 
  getStatusLabel,
  isCritical
} from 'src/types/drug-database';

const showDialog = ref(false);
const compatResult = ref<CompatibilityResult | null>(null);
</script>
```

### Lista Farmaci con Filtri

```vue
<template>
  <q-page padding>
    <!-- Filtri -->
    <q-card class="q-mb-md">
      <q-card-section>
        <q-input
          v-model="searchQuery"
          label="Cerca farmaco"
          outlined
          dense
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        
        <div class="row q-mt-sm q-gutter-sm">
          <q-checkbox v-model="filterCvc" label="Solo con CVC" />
          <q-checkbox v-model="filterPhoto" label="Solo fotosensibili" />
        </div>
      </q-card-section>
    </q-card>
    
    <!-- Lista -->
    <q-list bordered separator>
      <q-item 
        v-for="drug in filteredDrugs" 
        :key="drug.id"
        clickable
        @click="selectDrug(drug)"
      >
        <q-item-section>
          <q-item-label>{{ drug.name.it }}</q-item-label>
          <q-item-label caption>{{ drug.id }}</q-item-label>
        </q-item-section>
        
        <q-item-section side>
          <div class="row q-gutter-xs">
            <q-badge 
              v-if="drug.cvcRequirement.required" 
              color="purple"
            >
              CVC
            </q-badge>
            <q-badge 
              v-if="drug.isPhotosensitive" 
              color="orange"
            >
              ☀️
            </q-badge>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { drugDatabaseService } from 'src/services/drug-database.service';

const searchQuery = ref('');
const filterCvc = ref(false);
const filterPhoto = ref(false);

const filteredDrugs = computed(() => {
  return drugDatabaseService.searchDrugs({
    query: searchQuery.value,
    requiresCvc: filterCvc.value ? true : undefined,
    isPhotosensitive: filterPhoto.value ? true : undefined
  });
});

function selectDrug(drug: Drug) {
  console.log('Selected:', drug);
}
</script>
```

---

## 🔄 Rigenerare Database

Se aggiorni il CSV:

```bash
cd /home/nyk-ai/projects/medicalUtility/scripts
python3 csv-to-json-converter.py
```

Output:
```
✅ Database creato: output/drugs-database.json
📊 Statistiche:
   • Farmaci totali: 134
   • Compatibilità totali: 17956
   • Compatible: 3048
   • Incompatible: 3544
   • Unknown: 8692
```

---

## 📚 Risorse

1. **Documentazione completa**: `scripts/DATABASE_FORMAT_SPECIFICATION.md`
2. **TypeScript types**: `src/types/drug-database.ts`
3. **Servizio database**: `src/services/drug-database.service.ts`
4. **Script conversione**: `scripts/csv-to-json-converter.py`

---

## ✅ Checklist Integrazione

- [ ] Copia `drugs-database.min.json` in `public/data/`
- [ ] Importa tipi TypeScript nel progetto
- [ ] Carica database in boot file o main.ts
- [ ] Implementa UI per ricerca farmaci
- [ ] Implementa UI per verifica compatibilità
- [ ] Mostra alert per incompatibilità gravi (!)
- [ ] Mostra badge CVC per farmaci che lo richiedono
- [ ] Test con 2-3 combinazioni critiche
- [ ] Verifica performance caricamento database

---

## 🎨 Color Palette Consigliata

```scss
// Compatibility colors
$compatible: #21ba45;           // Verde
$incompatible: #c10015;         // Rosso
$conditional: #f2c037;          // Giallo
$severe: #8b0000;               // Rosso scuro
$unknown: #9e9e9e;              // Grigio

// UI elements
$cvc-badge: #9c27b0;            // Viola
$photo-badge: #ff9800;          // Arancione
$warning-bg: #fff3cd;           // Giallo chiaro
$critical-bg: #f8d7da;          // Rosso chiaro
```

---

## 🚨 Note di Sicurezza

1. **Sempre validare**: Non fidarsi ciecamente dello stato `unknown`
2. **Alert critici**: Mostrare sempre dialog di conferma per incompatibilità gravi
3. **Log**: Tracciare tutte le verifiche di compatibilità per audit
4. **Disclaimer**: Aggiungere disclaimer legale sull'uso medico dei dati
5. **Aggiornamenti**: Prevedere sistema per aggiornare database senza reinstallare app

---

**Versione**: 1.0.0  
**Data**: 9 Dicembre 2025  
**Autore**: Medical Utility Team
