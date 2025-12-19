/**
 * @file en-US/drugCompatibility.ts
 * @description English translations for Drug Compatibility Components
 * @author Vasile Chifeac
 * @created 2025-12-19
 */

export default {
  // DrugSelector Component
  drugSelector: {
    selectedDrugs: 'Selected Drugs',
    searchPlaceholder: 'Search drug...',
    noResults: 'No drug found',
    add: 'Add',
    selected: 'Selected',
    addDrug: 'Add drug',
    removeDrug: 'Remove drug',
    clearAll: 'Clear all',
    drugCount: '{count} drug/s selected',
  },

  // LumenAllocator Component
  lumenAllocator: {
    title: 'Lumen Allocation Optimizer',
    subtitle: 'Greedy algorithm for CVC/PICC lumen allocation optimization',
    optimizationRecommendations: 'Optimization Recommendations',
    legend: {
      title: 'Legend',
      photosensitive: 'Photosensitive',
      cvcRequired: 'CVC Required',
    },
    availableLumens: '💉 Available CVC/PICC Lumens',
    typicalConfiguration: 'Typical CVC: 3-4 lumens | PICC: 1-2 lumens',
    sufficient: '✅ Sufficient',
    insufficient: '❌ Insufficient',
    needed: 'Needed',
    available: 'Available',
    lumen: 'lumen',
    lumens: 'lumens',
    noDrugs: 'No drugs selected',
    selectDrugsHint: 'Select at least 2 drugs to view lumen allocation',
    drugsAllocated: '{count} drug/s allocated',
    insufficientWarning: {
      title: 'Insufficient Lumens - Allocation Risk',
      needed: '{needed} lumens needed, {available} available',
      deficit: 'Deficit: {deficit} {lume} missing',
      attention: 'WARNING: Incompatible drugs detected in lumen {lumenNumber}',
      incompatibleWarning: 'WARNING',
      incompatibleDetected: 'Incompatible drugs detected in {lumens}',
      recommendation: 'Recommendation',
      addLumens: 'Add {deficit} additional {lume} to avoid incompatibilities',
    },
    notAvailable: 'NOT AVAILABLE',
    incompatibility: '⚠️ INCOMPATIBILITY',
    recommendations: {
      sufficient: '✅ Sufficient lumens for all selected drugs',
      needed: '⚠️ {needed} lumens needed, {available} available',
      addCvc: '💉 Add multi-lumen CVC (4-5 lumens) or additional PICC line',
      removeIncompatible: '🔴 Consider removing incompatible drugs: {drugs}',
      sequential: '⏰ Consider sequential administration with flush between drugs',
    },
  },

  // CompatibilityResults Component
  compatibilityResults: {
    pending: 'Waiting for compatibility analysis...',
    selectDrugsHint: 'Select at least 2 drugs and click "Analyze Compatibility"',
    optimizationTitle: 'Optimization Recommendations',
    clinicalTitle: 'Clinical Recommendations',
    needsLumens: '{needed} lumens needed, {available} available',
    addLumens: 'Add multi-lumen CVC (4-5 lumens) or additional PICC line',
    considerRemoval: 'Consider removing incompatible drugs',
    sequentialAdmin: 'Consider sequential administration with flush between drugs',
    criticalWarning: '⚠️ WARNING: Critical incompatibilities detected. Do not administer together.',
    useSeparateLines: '✓ Use separate venous lines for incompatible drugs',
    conflictingDataWarning: 'WARNING: Conflicting data for {drug1} and {drug2}',
    consultPharmacologist: 'Consult hospital pharmacologist before administration',
    ySiteCompatInfo: '{drug} compatible with {others} only via Y-site',
    useYSiteConnector: 'Use Y-site connector/three-way stopcock',
    consultPharmacy: '⚠️ Consult pharmacy service for conflicting data',
    noCriticalIncompatibilities: '✓ No critical incompatibilities detected',
    checkDilution: '✓ Always check correct dilutions and infusion rates',
  },

  // DrugCompatibilityList Component
  compatibilityList: {
    title: 'Detailed Drug Compatibility',
    pending: 'Waiting for compatibility analysis...',
    selectDrugsHint: 'Select at least 2 drugs and click "Analyze Compatibility"',
    compatible: 'COMPATIBLE',
    incompatible: 'INCOMPATIBLE',
    compatibleYSite: 'Y-SITE COMPATIBLE',
    noData: 'No compatibility data available',
    selectDrugs: 'Select at least 2 drugs to see compatibility',
  },
};
