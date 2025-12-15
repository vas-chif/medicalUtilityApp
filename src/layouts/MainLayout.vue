<!-- MainLayout.vue -->
<script setup lang="ts">
/**
 * @file MainLayout.vue
 * Layout principale dell'applicazione con header, drawer e pagina contenitore
 * @author Vasile Chifeac
 */

import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { MedicalTool, MenuSection } from 'src/types/MenuTypes';

// Router
const router = useRouter();
const route = useRoute();

// i18n
const { locale } = useI18n({ useScope: 'global' });

// State
const leftDrawerOpen = ref(false);
const appVersion = ref('1.0.0');
const currentLanguage = ref<'it-IT' | 'en-US'>('it-IT');

// Stato della ricerca
const searchQuery = ref('');

// Computed per mostrare ricerca solo in homepage
const showSearch = computed(() => route.path === '/');

// ============================================================
// LANGUAGE MANAGEMENT
// ============================================================

/**
 * Load saved language from localStorage
 */
onMounted(() => {
  const savedLanguage = localStorage.getItem('user-language') as 'it-IT' | 'en-US' | null;
  if (savedLanguage && (savedLanguage === 'it-IT' || savedLanguage === 'en-US')) {
    currentLanguage.value = savedLanguage;
    locale.value = savedLanguage;
  }
});

/**
 * Switch application language
 * @param lang - Language code ('it-IT' or 'en-US')
 */
const switchLanguage = (lang: 'it-IT' | 'en-US'): void => {
  currentLanguage.value = lang;
  locale.value = lang;
  localStorage.setItem('user-language', lang);
};

/**
 * Get flag icon for current language
 */
const getLanguageFlag = computed(() => {
  return currentLanguage.value === 'it-IT' ? '🇮🇹' : '🇺🇸';
});

/**
 * Get language label
 */
const getLanguageLabel = computed(() => {
  return currentLanguage.value === 'it-IT' ? 'Italiano' : 'English';
});

// ============================================================
// MENU CONFIGURATION
// ============================================================

/**
 * Menu Sections for Drawer Navigation
 */
const menuSections: MenuSection[] = [
  {
    header: '🧮 Calcolatrici Mediche',
    icon: 'calculate',
    items: [
      {
        id: 'intensive-care',
        title: 'Intensive Care Utility',
        caption: 'Mechanical Power & Quoziente Respiratorio',
        icon: 'local_hospital',
        iconColor: 'red-6',
        route: '/intensive-care',
      },
      {
        id: 'clinical-assessment',
        title: 'Clinical Assessment',
        caption: 'APGAR, GCS, NEWS, SOFA',
        icon: 'assignment',
        iconColor: 'green-6',
        route: '/clinical-assessment',
      },
      {
        id: 'bmi-calculator',
        title: 'BMI Calculator',
        caption: 'Indice massa corporea',
        icon: 'fitness_center',
        iconColor: 'orange-6',
        route: '/bmi-calculator',
      },
      {
        id: 'gfr-calculator',
        title: 'GFR Calculator',
        caption: 'Filtrato glomerulare renale',
        icon: 'water_drop',
        iconColor: 'cyan-6',
        route: '/gfr-calculator',
      },
      {
        id: 'pharmacology',
        title: 'Pharmacology',
        caption: 'Dosage, Compatibility, Dilution, Infusion',
        icon: 'medication',
        iconColor: 'red-6',
        route: '/pharmacology',
      },
      {
        id: 'drug-compatibility',
        title: 'Compatibilità Farmaci',
        caption: 'Interazioni farmacologiche IV',
        icon: 'science',
        iconColor: 'purple-6',
        route: '/drug-compatibility',
        disabled: false, // ✅ ATTIVATO - Database JSON bilingue pronto!
      },
    ],
  },
  {
    header: 'ℹ️ Informazioni',
    icon: 'info',
    items: [
      {
        id: 'about',
        title: 'About',
        caption: 'Informazioni app',
        icon: 'info',
        iconColor: 'info',
        route: '/about',
      },
      {
        id: 'help',
        title: 'Aiuto',
        caption: 'Documentazione',
        icon: 'help',
        iconColor: 'warning',
        route: '/help',
      },
    ],
  },
];

/**
 * Medical Tools for Homepage Search/Filter
 */
const medicalTools: MedicalTool[] = [
  {
    id: 'intensiveCare',
    title: 'Intensive Care Utility',
    description: 'Mechanical Power e Quoziente Respiratorio per monitoraggio ventilatorio completo',
    categories: ['ventilazione', 'terapia-intensiva', 'pneumologia'],
    keywords: [
      'ventilazione',
      'potenza',
      'meccanica',
      'respiratorio',
      'scambi',
      'gassosi',
      'ARDS',
      'CO2',
      'O2',
    ],
  },
  {
    id: 'clinicalAssessment',
    title: 'Clinical Assessment & Scoring',
    description: 'Sistemi di valutazione clinica: APGAR Score, Glasgow Coma Scale, NEWS, SOFA',
    categories: ['neonatologia', 'emergenza', 'terapia-intensiva', 'pediatria'],
    keywords: [
      'APGAR',
      'GCS',
      'Glasgow',
      'NEWS',
      'SOFA',
      'score',
      'valutazione',
      'neonato',
      'coma',
      'coscienza',
      'sepsi',
    ],
  },
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    description: "Calcolo dell'Indice di Massa Corporea con classificazione WHO",
    categories: ['nutrizione', 'medicina-generale'],
    keywords: ['BMI', 'massa', 'corporea', 'peso', 'altezza', 'obesità', 'sottopeso'],
  },
  {
    id: 'gfr-calculator',
    title: 'GFR Calculator',
    description: 'Calcolo del Filtrato Glomerulare Renale con formule MDRD e CKD-EPI',
    categories: ['nefrologia', 'funzione-renale'],
    keywords: ['GFR', 'filtrato', 'glomerulare', 'renale', 'creatinina', 'MDRD', 'CKD-EPI'],
  },
  {
    id: 'dosage-calculator',
    title: 'Dosage Calculator',
    description: 'Calcolo preciso delle dosi farmacologiche per peso, età e funzione renale',
    categories: ['farmacologia', 'posologia'],
    keywords: ['dosaggio', 'farmaci', 'dose', 'peso', 'età', 'posologia', 'medicazione'],
  },
  {
    id: 'drug-compatibility',
    title: 'Compatibilità Farmaci',
    description:
      'Controllo interazioni e incompatibilità farmacologiche per somministrazione endovenosa',
    categories: ['farmacologia', 'terapia-intensiva'],
    keywords: [
      'compatibilità',
      'farmaci',
      'interazioni',
      'incompatibilità',
      'IV',
      'endovenosa',
      'Y-site',
    ],
    disabled: false, // ✅ ATTIVATO - Database JSON bilingue pronto!
  },
];

// Computed per gli strumenti filtrati
const filteredTools = computed(() => {
  let filtered = medicalTools;

  // Filtro per ricerca testuale
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (tool) =>
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some((keyword) => keyword.toLowerCase().includes(query)),
    );
  }

  return filtered;
});

// Funzione per verificare se uno strumento è visibile
const isToolVisible = (toolId: string): boolean => {
  return filteredTools.value.some((tool) => tool.id === toolId);
};

// Funzioni per la ricerca
const filterTools = () => {
  // La ricerca è reattiva tramite computed
};

// Functions
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const navigateTo = async (path: string) => {
  // Controlla se il tool è disabilitato
  const tool = medicalTools.find((t) => path.includes(t.id));
  if (tool?.disabled) {
    return; // Non navigare se disabilitato
  }

  await router.push(path);
  // Chiudi drawer su mobile dopo navigazione
  if (window.innerWidth < 1024) {
    leftDrawerOpen.value = false;
  }
  // Pulisci ricerca quando si naviga
  if (path !== '/') {
    searchQuery.value = '';
  }
};
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header Medical con Ricerca -->
    <q-header elevated class="medical-header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="text-white"
        />

        <q-toolbar-title class="medical-title">
          <q-avatar size="25px" class="medical-avatar q-mb-sm" square>
            <q-img src="../assets/icon_logo.png" color="white" />
          </q-avatar>
          Medical Utility Pro
        </q-toolbar-title>

        <!-- Barra di Ricerca Compatta -->
        <div class="search-toolbar q-ml-md" v-if="showSearch">
          <q-input
            v-model="searchQuery"
            placeholder="🔍 Cerca strumento..."
            outlined
            dense
            clearable
            class="compact-search"
            style="width: 250px"
            @input="filterTools"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="white" />
            </template>
          </q-input>
        </div>

        <q-space />

        <!-- Language Selector -->
        <q-btn-dropdown
          flat
          dense
          :label="getLanguageFlag"
          :title="`Language: ${getLanguageLabel}`"
          class="q-mr-md"
          dropdown-icon="arrow_drop_down"
        >
          <q-list dense>
            <q-item
              clickable
              v-close-popup
              @click="switchLanguage('it-IT')"
              :active="currentLanguage === 'it-IT'"
            >
              <q-item-section avatar>
                <div class="text-h6">🇮🇹</div>
              </q-item-section>
              <q-item-section>
                <q-item-label>Italiano</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="switchLanguage('en-US')"
              :active="currentLanguage === 'en-US'"
            >
              <q-item-section avatar>
                <div class="text-h6">🇺🇸</div>
              </q-item-section>
              <q-item-section>
                <q-item-label>English</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <div class="text-subtitle2 text-white-7">v{{ appVersion }}</div>
      </q-toolbar>
    </q-header>

    <!-- Drawer Medical -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="medical-drawer" :width="280">
      <!-- Header Drawer -->
      <div class="drawer-header q-pa-md text-center">
        <q-avatar size="60px" class="medical-avatar q-mb-sm">
          <q-img src="../assets/icon_logo.png" color="white" />
        </q-avatar>
        <div class="text-h6 text-primary">Medical Utility</div>
        <div class="text-caption text-grey-6">Strumenti Medici Professionali</div>
      </div>

      <q-separator />

      <!-- Menu Navigation -->
      <q-list>
        <!-- Homepage -->
        <q-item
          clickable
          :active="$route.path === '/'"
          @click="navigateTo('/')"
          class="medical-menu-item"
        >
          <q-item-section avatar>
            <q-icon name="home" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Homepage</q-item-label>
            <q-item-label caption>Panoramica strumenti</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <!-- Dynamic Menu Sections -->
        <template v-for="(section, sectionIndex) in menuSections" :key="`section-${sectionIndex}`">
          <!-- Section Header -->
          <q-item-label header class="text-primary text-weight-bold">
            {{ section.header }}
          </q-item-label>

          <!-- Section Items -->
          <q-item
            v-for="item in section.items"
            :key="item.id"
            clickable
            :active="$route.path === item.route"
            @click="navigateTo(item.route)"
            :class="['medical-menu-item', item.disabled ? 'menu-item-disabled' : '']"
            :disable="item.disabled"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" :color="item.disabled ? 'grey-5' : item.iconColor" />
            </q-item-section>
            <q-item-section>
              <q-item-label :class="item.disabled ? 'text-grey-6' : ''">
                {{ item.title }}
              </q-item-label>
              <q-item-label caption :class="item.disabled ? 'text-grey-5' : ''">
                {{ item.caption }}
              </q-item-label>
            </q-item-section>
            <q-item-section side v-if="item.badge">
              <q-badge :color="item.badge.color" :label="item.badge.label" />
            </q-item-section>
          </q-item>

          <!-- Separator between sections (not after last) -->
          <q-separator v-if="sectionIndex < menuSections.length - 1" class="q-my-md" />
        </template>
      </q-list>

      <!-- Footer Drawer -->
      <div class="absolute-bottom q-pa-sm text-center">
        <div class="text-caption text-grey-6">© 2025 Medical Utility Pro</div>
        <div class="text-caption text-grey-5">
          <a
            class="created-by text-no-wrap"
            href="https://uniqueyouagency.com/#/"
            target="_blank"
            rel="noopener noreferrer"
            tabindex="6"
            aria-label="Edit by: UniqueYouAgency"
          >
            <span>Unique<span class="unique">You</span>Agency</span>
          </a>
        </div>
      </div>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container class="medical-page-container">
      <!-- Contenuto Homepage quando route è / -->
      <div v-if="$route.path === '/'" class="homepage-content">
        <!-- Hero Section -->
        <div class="hero-section q-pa-xl text-center">
          <div class="hero-content">
            <q-avatar size="120px" class="medical-avatar q-mb-sm" square>
              <q-img src="../assets/icon_logo.png" color="white" />
            </q-avatar>

            <h1 class="hero-title text-h3 q-mb-sm">Medical Utility Pro</h1>
            <p class="hero-subtitle text-h6 q-mb-lg">
              Strumenti medici professionali per calcoli clinici precisi e affidabili
            </p>
          </div>
        </div>

        <!-- Tools Grid Section -->
        <div class="tools-section q-pa-lg">
          <div class="text-center q-mb-lg">
            <h2 class="section-title text-h4 q-mb-sm">🧮 Calcolatrici Mediche</h2>
            <p class="section-subtitle text-subtitle1">
              Seleziona lo strumento di calcolo necessario
            </p>
          </div>

          <!-- Griglia delle cards -->
          <div class="tools-grid">
            <!-- Intensive Care Utility (Unified) -->
            <q-card
              v-show="isToolVisible('intensiveCare')"
              class="medical-tool-card cursor-pointer"
              @click="navigateTo('/intensive-care')"
            >
              <q-card-section class="tool-card-content">
                <div class="tool-icon-container q-mb-md">
                  <q-icon name="local_hospital" size="3rem" class="tool-icon" color="red-6" />
                </div>
                <h5 class="tool-title text-h6 q-mb-sm">Intensive Care Utility</h5>
                <p class="tool-description text-body2 q-mb-md">
                  Mechanical Power e Quoziente Respiratorio per monitoraggio metabolico e
                  ventilatorio
                </p>
                <div class="tool-tags">
                  <q-chip size="sm" color="red-1" text-color="red-8">Terapia Intensiva</q-chip>
                  <q-chip size="sm" color="blue-1" text-color="blue-8">Ventilazione</q-chip>
                </div>
              </q-card-section>
            </q-card>

            <!-- Clinical Assessment & Scoring -->
            <q-card
              v-show="isToolVisible('clinicalAssessment')"
              class="medical-tool-card cursor-pointer"
              @click="navigateTo('/clinical-assessment')"
            >
              <q-card-section class="tool-card-content">
                <div class="tool-icon-container q-mb-md">
                  <q-icon name="assignment" size="3rem" class="tool-icon" color="green-6" />
                </div>
                <h5 class="tool-title text-h6 q-mb-sm">Clinical Assessment</h5>
                <p class="tool-description text-body2 q-mb-md">
                  Sistemi di valutazione e scoring: APGAR, GCS, NEWS, SOFA
                </p>
                <div class="tool-tags">
                  <q-chip size="sm" color="green-1" text-color="green-8">Neonatologia</q-chip>
                  <q-chip size="sm" color="green-1" text-color="green-8">Emergenza</q-chip>
                  <q-chip size="sm" color="red-1" text-color="red-8">Terapia Intensiva</q-chip>
                </div>
              </q-card-section>
            </q-card>

            <!-- BMI Calculator -->
            <q-card
              v-show="isToolVisible('bmi-calculator')"
              class="medical-tool-card cursor-pointer"
              @click="navigateTo('/bmi-calculator')"
            >
              <q-card-section class="tool-card-content">
                <div class="tool-icon-container q-mb-md">
                  <q-icon name="fitness_center" size="3rem" class="tool-icon" />
                </div>
                <h5 class="tool-title text-h6 q-mb-sm">BMI Calculator</h5>
                <p class="tool-description text-body2 q-mb-md">
                  Calcolo dell'Indice di Massa Corporea con classificazione WHO
                </p>
                <div class="tool-tags">
                  <q-chip size="sm" color="orange-1" text-color="orange-8">Nutrizione</q-chip>
                  <q-chip size="sm" color="orange-1" text-color="orange-8"
                    >Medicina Generale</q-chip
                  >
                </div>
              </q-card-section>
            </q-card>

            <!-- GFR Calculator -->
            <q-card
              v-show="isToolVisible('gfr-calculator')"
              class="medical-tool-card cursor-pointer"
              @click="navigateTo('/gfr-calculator')"
            >
              <q-card-section class="tool-card-content">
                <div class="tool-icon-container q-mb-md">
                  <q-icon name="water_drop" size="3rem" class="tool-icon" />
                </div>
                <h5 class="tool-title text-h6 q-mb-sm">GFR Calculator</h5>
                <p class="tool-description text-body2 q-mb-md">
                  Calcolo del Filtrato Glomerulare Renale con formule MDRD e CKD-EPI
                </p>
                <div class="tool-tags">
                  <q-chip size="sm" color="cyan-1" text-color="cyan-8">Nefrologia</q-chip>
                  <q-chip size="sm" color="cyan-1" text-color="cyan-8">Funzione Renale</q-chip>
                </div>
              </q-card-section>
            </q-card>

            <!-- Pharmacology (unificata) -->
            <q-card
              v-show="isToolVisible('dosage-calculator')"
              class="medical-tool-card cursor-pointer"
              @click="navigateTo('/pharmacology')"
            >
              <q-card-section class="tool-card-content">
                <div class="tool-icon-container q-mb-md">
                  <q-icon name="medication" size="3rem" class="tool-icon" />
                </div>
                <h5 class="tool-title text-h6 q-mb-sm">Clinical Pharmacology</h5>
                <p class="tool-description text-body2 q-mb-md">
                  Dosaggio, compatibilità IV, diluizioni e velocità infusione farmaci
                </p>
                <div class="tool-tags">
                  <q-chip size="sm" color="red-1" text-color="red-8">Farmacologia</q-chip>
                  <q-chip size="sm" color="red-1" text-color="red-8">Posologia</q-chip>
                  <q-chip size="sm" color="purple-1" text-color="purple-8">Diluizione</q-chip>
                  <q-chip size="sm" color="purple-1" text-color="purple-8">Infusion Rate</q-chip>
                </div>
              </q-card-section>
            </q-card>

            <!-- APGAR Score -->
            <q-card
              v-show="isToolVisible('apgar-score')"
              class="medical-tool-card cursor-pointer"
              @click="navigateTo('/apgar-score')"
            >
              <q-card-section class="tool-card-content">
                <div class="tool-icon-container q-mb-md">
                  <q-icon name="child_care" size="3rem" class="tool-icon" />
                </div>
                <h5 class="tool-title text-h6 q-mb-sm">APGAR Score</h5>
                <p class="tool-description text-body2 q-mb-md">
                  Valutazione clinica completa del neonato nei primi minuti di vita
                </p>
                <div class="tool-tags">
                  <q-chip size="sm" color="pink-1" text-color="pink-8">Neonatologia</q-chip>
                  <q-chip size="sm" color="pink-1" text-color="pink-8">Pediatria</q-chip>
                </div>
              </q-card-section>
            </q-card>

            <!-- Drug Compatibility Checker -->
            <q-card
              v-show="isToolVisible('drug-compatibility')"
              class="medical-tool-card cursor-pointer"
              @click="navigateTo('/drug-compatibility')"
            >
              <q-card-section class="tool-card-content">
                <div class="tool-icon-container q-mb-md">
                  <q-icon name="science" size="3rem" class="tool-icon" color="purple-6" />
                </div>
                <h5 class="tool-title text-h6 q-mb-sm">🧪 Drug Compatibility Checker</h5>
                <p class="tool-description text-body2 q-mb-md">
                  Verifica compatibilità IV tra farmaci per somministrazione Y-site sicura
                </p>
                <div class="tool-tags">
                  <q-chip size="sm" color="purple-1" text-color="purple-8">Farmacologia</q-chip>
                  <q-chip size="sm" color="purple-1" text-color="purple-8"
                    >Terapia Intensiva</q-chip
                  >
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Nessun risultato -->
          <div v-if="searchQuery && filteredTools.length === 0" class="no-results q-mt-lg">
            <div class="text-center">
              <q-icon name="search_off" size="3rem" color="grey-5" class="q-mb-md" />
              <h6 class="text-h6 text-grey-7">Nessun risultato trovato</h6>
              <p class="text-body2 text-grey-6">Prova a cercare con termini diversi</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Router View per altre pagine -->
      <router-view v-else />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
/* Medical Header */
.medical-header {
  background: linear-gradient(135deg, #2e7d8a 0%, #5a9b6b 100%);
  box-shadow: 0 2px 8px rgba(46, 125, 138, 0.3);
}

.medical-title {
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Compact Search in Header */
.search-toolbar {
  flex-shrink: 0;
}

.compact-search {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}

.compact-search :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
}

.compact-search :deep(.q-field__outlined) {
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.compact-search :deep(.q-field--focused .q-field__outlined) {
  border-color: rgba(255, 255, 255, 0.6);
}

.compact-search :deep(.q-field__native) {
  color: white;
}

.compact-search :deep(.q-field__native::placeholder) {
  color: rgba(255, 255, 255, 0.7);
}

/* Medical Drawer */
.medical-drawer {
  background: #fafbfc;
  border-right: 2px solid #e8f4f8;
}

.drawer-header {
  background: linear-gradient(135deg, #ebf5ff 0%, #e8f4f8 100%);
  border-bottom: 1px solid #e0e7ea;
}

.medical-avatar {
  background: linear-gradient(135deg, #2e7d8a 0%, #5a9b6b 100%);
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(46, 125, 138, 0.2);
}

/* Menu Items */
.medical-menu-item {
  border-radius: 8px;
  margin: 4px 8px;
  transition: all 0.3s ease;
}

.medical-menu-item:hover {
  background: rgba(46, 125, 138, 0.1);
  transform: translateX(4px);
}

.medical-menu-item.q-item--active {
  background: rgba(46, 125, 138, 0.15);
  border-left: 4px solid #2e7d8a;
  font-weight: 600;
}

.menu-item-disabled {
  opacity: 0.5;
  cursor: not-allowed !important;
}

.menu-item-disabled:hover {
  background: transparent !important;
  transform: none !important;
}

/* Page Container */
.medical-page-container {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Homepage Content */
.homepage-content {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
  min-height: calc(100vh - 50px);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #2e7d8a 0%, #5a9b6b 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-icon {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.hero-title {
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 16px;
}

.hero-subtitle {
  font-weight: 300;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Sections */
.section-title {
  font-weight: 700;
  color: #2e7d8a;
  margin-bottom: 16px;
}

.section-subtitle {
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Tools Grid */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.medical-tool-card {
  border-radius: 20px;
  border: 1px solid #e8f4f8;
  box-shadow: 0 4px 16px rgba(46, 125, 138, 0.1);
  transition: all 0.4s ease;
  background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
  overflow: hidden;
  position: relative;
}

.medical-tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #2e7d8a 0%, #5a9b6b 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.medical-tool-card:hover::before {
  transform: scaleX(1);
}

.medical-tool-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(46, 125, 138, 0.2);
  border-color: #2e7d8a;
}

.tool-card-content {
  padding: 32px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tool-icon-container {
  text-align: center;
}

.tool-icon {
  background: linear-gradient(135deg, #2e7d8a 0%, #5a9b6b 100%);
  color: white;
  border-radius: 50%;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(46, 125, 138, 0.3);
  transition: all 0.3s ease;
}

.medical-tool-card:hover .tool-icon {
  transform: scale(1.1) rotate(5deg);
}

.tool-title {
  font-weight: 600;
  color: #2e7d8a;
  text-align: center;
  margin-bottom: 12px;
}

.tool-description {
  color: #5d6d7e;
  line-height: 1.6;
  text-align: center;
  flex-grow: 1;
  margin-bottom: 16px;
}

.tool-tags {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* Disabled Tool Card */
.tool-disabled {
  opacity: 0.6;
  cursor: not-allowed !important;
  filter: grayscale(40%);
}

.tool-disabled:hover {
  transform: none !important;
  box-shadow: 0 4px 16px rgba(46, 125, 138, 0.1) !important;
}

.tool-disabled .tool-icon {
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%) !important;
}

.tool-disabled:hover .tool-icon {
  transform: none !important;
}

.coming-soon-badge {
  margin-top: 12px;
  text-align: center;
}

/* No Results */
.no-results {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 40px 20px;
  border: 2px dashed #e8f4f8;
  margin: 0 auto;
  max-width: 400px;
}

/* Responsive */
@media (max-width: 1023px) {
  .medical-drawer {
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .search-toolbar {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 20px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .tools-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .tool-card-content {
    padding: 24px 20px;
  }
}

/* Animation per drawer toggle */
.q-drawer--standard .q-drawer__content {
  transition: transform 0.3s ease;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.medical-tool-card {
  animation: fadeInUp 0.6s ease-out;
}

.medical-tool-card:nth-child(1) {
  animation-delay: 0.1s;
}
.medical-tool-card:nth-child(2) {
  animation-delay: 0.2s;
}
.medical-tool-card:nth-child(3) {
  animation-delay: 0.3s;
}
.medical-tool-card:nth-child(4) {
  animation-delay: 0.4s;
}
.medical-tool-card:nth-child(5) {
  animation-delay: 0.5s;
}
.medical-tool-card:nth-child(6) {
  animation-delay: 0.6s;
}
</style>
