import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Pagina unificata terapia intensiva (Mechanical Power + Quoziente Respiratorio)
      { path: 'intensive-care', component: () => import('pages/IntensiveCareUtilityPage.vue') },

      // Pagina unificata clinical assessment (APGAR, GCS, NEWS, SOFA)
      { path: 'clinical-assessment', component: () => import('pages/ClinicalAssessmentPage.vue') },

      // Redirect vecchie route verso pagine unificate
      { path: 'intensiveCare', redirect: '/intensive-care' },
      { path: 'mechanical-power', redirect: '/intensive-care' },
      { path: 'quoziente-respiratorio', redirect: '/intensive-care' },
      { path: 'ventilazione', redirect: '/intensive-care' },
      { path: 'apgar-score', redirect: '/clinical-assessment' },

      // Altre calcolatrici
      { path: 'bmi-calculator', component: () => import('pages/BMICalculatorPage.vue') },
      { path: 'gfr-calculator', component: () => import('pages/GFRCalculatorPage.vue') },

      // Pharmacology - Pagina unificata (4 tabs: Dosage, Compatibility, Dilution, Infusion)
      { path: 'pharmacology', component: () => import('pages/PharmacologyPage.vue') },

      // Drug Compatibility - Pagina dedicata (3 tabs: Checker, Documentation, Lumen Allocator)
      { path: 'drug-compatibility', component: () => import('pages/DrugCompatibilityPage.vue') },

      // Redirect vecchie route farmacologia → nuova pagina unificata
      { path: 'dosage-calculator', redirect: '/pharmacology' },

      // 🧪 TEMPORARY TEST ROUTE - DrugSelector.vue validation (DELETE AFTER TESTING)
      { path: 'test-drug-selector', component: () => import('pages/TestDrugSelectorPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
