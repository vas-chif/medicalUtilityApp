/**
 * @file it-IT/drugCompatibilityPage.ts
 * @description Italian translations for Drug Compatibility Checker Page
 * @author Vasile Chifeac
 * @created 2025-12-19
 */

export default {
  // Page Header
  title: 'Drug Compatibility Checker',
  subtitle: 'Analisi compatibilità IV farmaci + Ottimizzazione allocazione lumi CVC/PICC',

  // Breadcrumbs
  breadcrumbs: {
    home: 'Home',
    pharmacology: 'Pharmacology',
    drugCompatibility: 'Compatibilità Farmaci',
  },

  // Disclaimer Alert
  disclaimer: {
    title: 'Attenzione: Fase di Test',
    message:
      'Questa applicazione è ancora in fase di test. Fare sempre riferimento ai protocolli aziendali ufficiali. Questo è uno strumento di supporto e non sostituisce il giudizio clinico.',
  },

  // Info Banner
  banner: {
    title: 'Sistema Avanzato Compatibilità Farmaci IV',
    realTimeAnalysis: {
      label: 'Real-time Analysis',
      description: 'Analisi compatibilità 150+ farmaci IV da database Micromedex',
    },
    lumenOptimization: {
      label: 'Lumen Optimization',
      description: 'Algoritmo greedy per ottimizzazione allocazione lumi CVC/PICC',
    },
    ysiteProtocols: {
      label: 'Y-site Protocols',
      description: "Protocolli flush + Riferimenti scientifici (Trissel's, ASHP)",
    },
  },

  // DrugSelector Component
  drugSelector: {
    title: 'Selezione Farmaci IV',
    calculateButton: 'Analizza Compatibilità',
    resetButton: 'Reset Selezione',
  },
};
