/**
 * @file it-IT/drugCompatibility.ts
 * @description Italian translations for Drug Compatibility Components
 * @author Vasile Chifeac
 * @created 2025-12-19
 */

export default {
  // DrugSelector Component
  drugSelector: {
    selectedDrugs: 'Farmaci selezionati',
    searchPlaceholder: 'Cerca farmaco...',
    noResults: 'Nessun farmaco trovato',
    add: 'Aggiungi',
    selected: 'Selezionato',
    addDrug: 'Aggiungi farmaco',
    removeDrug: 'Rimuovi farmaco',
    clearAll: 'Cancella tutti',
    drugCount: '{count} farmaco/i selezionato/i',
  },

  // LumenAllocator Component
  lumenAllocator: {
    title: 'Lumen Allocation Optimizer',
    subtitle: 'Algoritmo greedy per ottimizzazione allocazione lumi CVC/PICC',
    optimizationRecommendations: 'Raccomandazioni Ottimizzazione',
    legend: {
      title: 'Legenda',
      photosensitive: 'Fotosensibile',
      cvcRequired: 'CVC Richiesto',
    },
    availableLumens: '💉 Lumi CVC/PICC disponibili',
    typicalConfiguration: 'Tipico CVC: 3-4 lumi | PICC: 1-2 lumi',
    sufficient: '✅ Sufficienti',
    insufficient: '❌ Insufficienti',
    needed: 'Necessari',
    available: 'Disponibili',
    lumen: 'lume',
    lumens: 'lumi',
    noDrugs: 'Nessun farmaco selezionato',
    selectDrugsHint: "Seleziona almeno 2 farmaci per visualizzare l'allocazione lumi",
    drugsAllocated: '{count} farmaco allocato/i',
    insufficientWarning: {
      title: 'Lumi Insufficienti - Rischio Allocazione',
      needed: 'Necessari {needed} lumi, disponibili {available}',
      deficit: 'Deficit: {deficit} {lume} mancante/i',
      attention: 'ATTENZIONE: Farmaci incompatibili rilevati in lume {lumenNumber}',
      incompatibleWarning: 'ATTENZIONE',
      incompatibleDetected: 'Farmaci incompatibili rilevati in {lumens}',
      recommendation: 'Raccomandazione',
      addLumens: 'Aggiungere {deficit} {lume} aggiuntivo/i per evitare incompatibilità',
    },
    notAvailable: 'NON DISPONIBILE',
    incompatibility: '⚠️ INCOMPATIBILITÀ',
    recommendations: {
      sufficient: '✅ Lumi sufficienti per tutti i farmaci selezionati',
      needed: '⚠️ Necessari {needed} lumi, disponibili {available}',
      addCvc: '💉 Aggiungi CVC multi-lumen (4-5 lumi) o PICC line aggiuntiva',
      removeIncompatible: '🔴 Considera rimozione farmaci incompatibili: {drugs}',
      sequential: '⏰ Valuta somministrazione sequenziale con flush tra farmaci',
    },
  },

  // CompatibilityResults Component
  compatibilityResults: {
    pending: 'In attesa di analisi compatibilità...',
    selectDrugsHint: 'Seleziona almeno 2 farmaci e clicca "Analizza Compatibilità"',
    optimizationTitle: 'Raccomandazioni Ottimizzazione',
    clinicalTitle: 'Raccomandazioni Cliniche',
    needsLumens: 'Necessari {needed} lumi, disponibili {available}',
    addLumens: 'Aggiungi CVC multi-lumen (4-5 lumi) o PICC line aggiuntiva',
    considerRemoval: 'Considera rimozione farmaci incompatibili',
    sequentialAdmin: 'Valuta somministrazione sequenziale con flush tra farmaci',
    criticalWarning: '⚠️ ATTENZIONE: Rilevate incompatibilità critiche. Non somministrare insieme.',
    useSeparateLines: '✓ Utilizzare linee venose separate per farmaci incompatibili',
    conflictingDataWarning: 'ATTENZIONE: Dati contrastanti per {drug1} e {drug2}',
    consultPharmacologist: 'Consultare farmacologo ospedaliero prima della somministrazione',
    ySiteCompatInfo: '{drug} compatibile con {others} solo tramite Y-site',
    useYSiteConnector: 'Utilizzare connettore Y-site/rubinetto a tre vie',
    consultPharmacy: '⚠️ Consultare il servizio di farmacia per dati contrastanti',
    noCriticalIncompatibilities: '✓ Nessuna incompatibilità critica rilevata',
    checkDilution: '✓ Verificare sempre le diluizioni e velocità di infusione corrette',
  },

  // DrugCompatibilityList Component
  compatibilityList: {
    title: 'Compatibilità Dettagliata Farmaci',
    pending: 'In attesa di analisi compatibilità...',
    selectDrugsHint: 'Seleziona almeno 2 farmaci e clicca "Analizza Compatibilità"',
    compatible: 'COMPATIBILE',
    incompatible: 'INCOMPATIBILE',
    compatibleYSite: 'COMPATIBILE AL RUBINETTO',
    noData: 'Nessun dato di compatibilità disponibile',
    selectDrugs: 'Seleziona almeno 2 farmaci per vedere la compatibilità',
  },
};
