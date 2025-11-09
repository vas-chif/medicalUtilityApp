# 🏥 Medical Utility Pro# medicalUtilityApp (medicalutilityapp)

> Professional medical calculation tools for clinical precision and reliabilityMobile Apps for iOS, Android, and the web with utilities for medical professionals

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)## Install the dependencies

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4-4FC08D?logo=vue.js)](https://vuejs.org/)

[![Quasar](https://img.shields.io/badge/Quasar-2.18-1976D2?logo=quasar)](https://quasar.dev/)```bash

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)yarn

# or

## 📋 Overviewnpm install

````

**Medical Utility Pro** is a comprehensive web application providing healthcare professionals with accurate and reliable medical calculators for clinical decision-making. Built with modern web technologies, it offers offline-first architecture and real-time drug compatibility checking.

### Start the app in development mode (hot-code reloading, error reporting, etc.)

### ✨ Key Features

```bash

- 🧮 **7 Medical Calculators** - Covering critical care, nephrology, pediatrics, and pharmacologyquasar dev

- 💊 **Drug Compatibility System** - Real-time IV drug interaction checking with 10+ medications```

- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

- 🔒 **Offline-First** - Functions without internet connection using local data### Lint the files

- 🚀 **High Performance** - Built with Vue 3 Composition API and TypeScript

- 🎨 **Professional UI** - Clean, medical-grade interface with Quasar components```bash

yarn lint

---# or

npm run lint

## 🧮 Available Calculators```



### 1. **Mechanical Power** 🔧### Format the files

Calculate mechanical ventilatory power for ICU patients

- **Use Case**: ARDS patients, ventilator management```bash

- **Parameters**: Tidal volume, respiratory rate, PEEP, peak pressureyarn format

- **Output**: Mechanical power (J/min), ventilation safety assessment# or

npm run format

### 2. **Respiratory Quotient** 🫁```

Evaluate pulmonary gas exchange and respiratory function

- **Use Case**: Metabolic assessment, blood gas analysis### Build the app for production

- **Parameters**: VCO₂, VO₂, FiO₂, arterial/venous gases

- **Output**: RQ ratio, metabolic interpretation```bash

quasar build

### 3. **BMI Calculator** ⚖️```

Body Mass Index calculation with WHO classification

- **Use Case**: Nutritional assessment, general medicine### Customize the configuration

- **Parameters**: Weight (kg), Height (cm)

- **Output**: BMI value, WHO category, health recommendationsSee [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).


### 4. **GFR Calculator** 💧
Glomerular Filtration Rate using MDRD and CKD-EPI formulas
- **Use Case**: Renal function assessment, drug dosing
- **Parameters**: Creatinine, age, gender, race
- **Output**: eGFR (mL/min/1.73m²), CKD stage

### 5. **Dosage Calculator** 💊
Precise drug dosage calculation by weight, age, and renal function
- **Use Case**: Pediatric dosing, renal-adjusted medications
- **Parameters**: Weight, age, creatinine clearance, drug
- **Output**: Calculated dose, administration schedule

### 6. **APGAR Score** 👶
Complete neonatal clinical assessment in first minutes of life
- **Use Case**: Delivery room, neonatal resuscitation
- **Parameters**: Appearance, pulse, grimace, activity, respiration
- **Output**: APGAR score (0-10), intervention needed

### 7. **Drug Compatibility** 🧪
IV drug interaction and incompatibility checking
- **Use Case**: ICU medication administration, Y-site compatibility
- **Database**: 10 critical care drugs (expandable)
- **Output**: Compatible (C), Y-site (Y), Incompatible (I), Conflicting (!)

---

## 🚀 Technology Stack

### Frontend Framework
- **Vue 3.4** - Progressive JavaScript framework with Composition API
- **Quasar 2.18** - High-performance UI component framework
- **TypeScript 5.6** - Type-safe development
- **Vite** - Next-generation frontend tooling

### Architecture
- **Offline-First** - LocalStorage + IndexedDB caching
- **Reactive State** - Vue 3 Composition API with refs/computed
- **Component-Based** - Reusable medical components
- **Type-Safe** - Full TypeScript coverage
- **Smart Environment** - 🆕 Auto-detection dev/prod with cost optimization
- **Professional Logging** - 🆕 Integrated secure logging system

### Data Layer
- **Local Database** - TypeScript drug database (src/data/drugs.ts)
- **Firebase Ready** - Firestore integration with auto-switching configs
- **Cache Strategy** - Browser cache for performance
- **Environment Detection** - 🆕 Automatic dev/prod configuration loading

---

## 📦 Installation

### Prerequisites
- **Node.js**: >= 18.x
- **Yarn**: >= 1.22.x (or npm >= 9.x)
- **Git**: Latest version

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/vas-chif/medicalUtilityApp.git
cd medicalUtilityApp

# Install dependencies
yarn install
# or
npm install

# Run development server
yarn dev
# or
npm run dev

# Build for production
yarn build
# or
npm run build
````

### Development Server

Access the app at: **http://localhost:9000**

---

## 🚀 Deployment

### 🧠 Smart Environment Detection

Medical Utility Pro uses **automatic environment detection** to switch between development and production configurations:

```bash
# Development (localhost)
./deploy.sh dev
# ✅ Uses .env.development
# ✅ Remote logging DISABLED (free!)
# ✅ Debug mode ON

# Production (Firebase Hosting)
./deploy.sh prod
# ✅ Uses .env.production
# ✅ Remote logging ENABLED
# ✅ Analytics ENABLED
```

### Quick Deploy

```bash
# Development deploy
./deploy.sh dev

# Production deploy
./deploy.sh prod
```

### Manual Deploy

```bash
# 1. Copy environment file
cp .env.production .env

# 2. Build
yarn build

# 3. Deploy to Firebase
firebase deploy --only hosting
```

📖 **Full documentation**: See [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)

### 🧠 How It Works

The **Smart Environment System** automatically detects your environment:

```typescript
// Automatic detection priority:
// 1. Hostname (localhost → dev, *.firebaseapp.com → prod)
// 2. Environment variables (import.meta.env.MODE)
// 3. URL patterns (staging., dev., test.)
// 4. Default: production (safe fallback)
```

**Cost Optimization:**

| Feature            | Development | Production |
| ------------------ | ----------- | ---------- |
| Remote Logging     | ❌ Disabled | ✅ Enabled |
| Analytics          | ❌ Disabled | ✅ Enabled |
| Debug Mode         | ✅ ON       | ❌ OFF     |
| **Firebase Costs** | **€0**      | Optimized  |

---

## 📁 Project Structure

```
medicalUtilityApp/
├── src/
│   ├── assets/                    # Static assets (images, PDFs)
│   ├── boot/                      # Quasar boot files (axios, i18n)
│   ├── components/                # Reusable components
│   │   ├── BaseCalculator.vue    # Base calculator wrapper
│   │   └── MedicalInput.vue      # Validated medical input
│   ├── composables/               # Vue composables (business logic)
│   │   └── useDrugCompatibility.ts
│   ├── css/                       # Global styles
│   ├── data/                      # Data layer
│   │   └── drugs.ts              # Drug database (TypeScript)
│   ├── i18n/                      # Internationalization
│   ├── layouts/                   # Layout components
│   │   └── MainLayout.vue        # Main app layout
│   ├── pages/                     # Page components (calculators)
│   │   ├── APGARScorePage.vue
│   │   ├── BMICalculatorPage.vue
│   │   ├── DosageCalculatorPage.vue
│   │   ├── DrugCompatibilityPage.vue
│   │   ├── GFRCalculatorPage.vue
│   │   ├── MechanicalPowerPage.vue
│   │   └── QuozienteRespiratorioPage.vue
│   ├── router/                    # Vue Router configuration
│   ├── stores/                    # Pinia stores
│   ├── types/                     # TypeScript type definitions
│   │   └── DrugTypes.ts
│   └── App.vue                    # Root component
├── public/                        # Static public assets
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies
├── quasar.config.ts              # Quasar configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                      # This file
```

---

## 🧪 Drug Compatibility System

### Database

The drug compatibility system is based on the [drugsCompatibility](https://github.com/vas-chif/drugsCompatibility) Java/PostgreSQL project, converted to TypeScript for offline-first web deployment.

### Current Drugs (10)

1. **Amikacin** - Aminoglycoside antibiotic
2. **Ampicillin** - Beta-lactam antibiotic
3. **Fentanyl** - Opioid analgesic
4. **Midazolam** - Benzodiazepine sedative
5. **Heparin** - Anticoagulant
6. **Dopamine** - Vasopressor
7. **Norepinephrine** - Vasopressor
8. **Insulin** - Glycemic control
9. **Furosemide** - Loop diuretic
10. **Potassium Chloride** - Electrolyte supplement

### Compatibility Codes

- **C** - Compatible: Safe to mix
- **Y** - Y-site Compatible: Safe via Y-connector/stopcock
- **I** - Incompatible: Do NOT mix (precipitation/inactivation)
- **!** - Conflicting Data: Use with caution, verify sources
- **''** - No Data: Information unavailable

### Future Expansion

The system is designed to scale to 100+ drugs via:

- Firebase Firestore integration
- PDF data extraction pipeline
- Real-time cloud synchronization

---

## 🔧 Development

### Coding Standards

#### Vue Component Structure

```vue
<!-- ComponentName.vue -->
<script setup lang="ts">
/**
 * @file ComponentName.vue
 * @description Brief description of component purpose
 * @author Vasile Chifeac
 */

// Imports
import { ref, computed } from 'vue';

// Component logic
</script>

<template>
  <!-- Template here -->
</template>

<style scoped>
/* Styles here */
</style>
```

#### TypeScript Files

```typescript
/**
 * @file fileName.ts
 * @description File purpose and functionality
 * @author Vasile Chifeac
 */

// Imports
// Types
// Implementation
```

### Commands

```bash
# Development
yarn dev              # Start dev server (hot reload)
yarn lint             # Run ESLint
yarn type-check       # Run TypeScript type checking

# Build
yarn build            # Production build
yarn preview          # Preview production build

# Testing (future)
yarn test:unit        # Run unit tests
yarn test:e2e         # Run E2E tests
```

---

## 🌐 Firebase Integration (Planned)

### Firestore Collections

```
drugs/
  ├── {drugId}/
  │   ├── name: string
  │   ├── activeIngredient: string
  │   ├── category: DrugCategory
  │   └── compatibilityMatrix: Map<string, DrugCompatibility>
```

### Cost Estimate

- **Free Tier**: 50,000 reads/day, 20,000 writes/day
- **Expected Usage**: ~5,000 reads/day
- **Monthly Cost**: **€0** (within free tier)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Vasile Chifeac**

- GitHub: [@vas-chif](https://github.com/vas-chif)
- Project: [medicalUtilityApp](https://github.com/vas-chif/medicalUtilityApp)

---

## 🙏 Acknowledgments

- **Drug Compatibility Data**: Converted from [drugsCompatibility](https://github.com/vas-chif/drugsCompatibility) (Java/PostgreSQL)
- **Medical Guidelines**: WHO, AHA, ESPEN, ERC standards
- **UI Framework**: [Quasar Framework](https://quasar.dev/)
- **Icons**: [Material Design Icons](https://fonts.google.com/icons)

---

## ⚠️ Medical Disclaimer

**IMPORTANT**: This application is intended for use by qualified healthcare professionals as a clinical decision support tool. All calculations and drug compatibility information should be verified against current medical literature and institutional protocols. The authors and contributors assume no liability for clinical decisions made using this tool.

**Always verify**:

- Drug dosages with official prescribing information
- Drug compatibilities with multiple authoritative sources
- Patient-specific factors (allergies, contraindications, organ function)
- Local institutional protocols and guidelines

---

<div align="center">

**Made with ❤️ by Vasile Chifeac**

⭐ Star this repo if you find it useful! ⭐

</div>
