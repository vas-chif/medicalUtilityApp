/**
 * @file en-US/drugCompatibilityPage.ts
 * @description English translations for Drug Compatibility Checker Page
 * @author Vasile Chifeac
 * @created 2025-12-19
 */

export default {
  // Page Header
  title: 'Drug Compatibility Checker',
  subtitle: 'IV drug compatibility analysis + CVC/PICC lumen allocation optimization',

  // Breadcrumbs
  breadcrumbs: {
    home: 'Home',
    pharmacology: 'Pharmacology',
    drugCompatibility: 'Drug Compatibility',
  },

  // Disclaimer Alert
  disclaimer: {
    title: 'Warning: Testing Phase',
    message:
      'This application is currently in testing phase. Always refer to official institutional protocols. This tool is for support purposes only and does not substitute clinical judgment.',
  },

  // Info Banner
  banner: {
    title: 'Advanced IV Drug Compatibility System',
    realTimeAnalysis: {
      label: 'Real-time Analysis',
      description: 'Compatibility analysis for 150+ IV drugs from Micromedex database',
    },
    lumenOptimization: {
      label: 'Lumen Optimization',
      description: 'Greedy algorithm for CVC/PICC lumen allocation optimization',
    },
    ysiteProtocols: {
      label: 'Y-site Protocols',
      description: "Flush protocols + Scientific references (Trissel's, ASHP)",
    },
  },

  // DrugSelector Component
  drugSelector: {
    title: 'IV Drug Selection',
    calculateButton: 'Analyze Compatibility',
    resetButton: 'Reset Selection',
  },
};
