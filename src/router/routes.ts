import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'mechanical-power', component: () => import('pages/MechanicalPowerPage.vue') },
      {
        path: 'quoziente-respiratorio',
        component: () => import('pages/QuozienteRespiratorioPage.vue'),
      },
      { path: 'bmi-calculator', component: () => import('pages/BMICalculatorPage.vue') },
      { path: 'dosage-calculator', component: () => import('pages/DosageCalculatorPage.vue') },
      { path: 'gfr-calculator', component: () => import('pages/GFRCalculatorPage.vue') },
      { path: 'apgar-score', component: () => import('pages/APGARScorePage.vue') },
      { path: 'drug-compatibility', component: () => import('pages/DrugCompatibilityPage.vue') },
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
