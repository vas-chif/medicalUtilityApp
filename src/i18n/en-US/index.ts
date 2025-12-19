/**
 * @file en-US/index.ts
 * @description English translations for Medical Utility Pro
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-12-15
 */

import bmi from './bmi';
import bsa from './bsa';
import abw from './abw';
import gcsScore from './gcsScore';
import mechanicalPower from './mechanicalPower';
import respiratoryQuotient from './respiratoryQuotient';
import savedCalculations from './savedCalculations';
import fluidBalance from './fluidBalance';
import dosageCalculator from './dosageCalculator';
import drugDilution from './drugDilution';
import infusionRate from './infusionRate';
import mainLayout from './mainLayout';
import drugCompatibilityPage from './drugCompatibilityPage';
import drugCompatibility from './drugCompatibility';
// import ibw from './ibw';

export default {
  // Common
  common: {
    home: 'Home',
    calculate: 'Calculate',
    reset: 'Reset Data',
    result: 'Result',
    results: 'Results',
    interpretation: 'Interpretation',
    formula: 'Formula',
    clinicalApplications: 'Clinical Applications',
    parameters: 'Parameters',
    normal: 'Normal',
    attention: 'Attention',
    note: 'Note',
    warning: 'Warning',
  },

  // Navigation
  nav: {
    medicalUtility: 'Medical Utility Pro',
    calculators: 'Calculators',
    apgar: 'APGAR Score',
    bmi: 'BMI',
    dosage: 'Drug Dosage',
    gfr: 'GFR (eGFR)',
    ventilation: 'Ventilation Parameters',
    drugCompatibility: 'Drug Compatibility',
    inDevelopment: 'In Development',
  },

  // Validation messages
  validation: {
    positiveValue: 'Enter positive value',
    percentage: 'Value between 0-100%',
    required: 'Required field',
  },

  // Error messages
  errors: {
    missingParameters: 'Fill all required fields',
  },

  // BMI Calculator
  bmi,

  // BSA Calculator
  bsa,

  // ABW Calculator
  abw,

  // Glasgow Coma Scale Calculator
  gcs: gcsScore,

  // Mechanical Power Calculator
  mp: mechanicalPower,

  // Respiratory Quotient Calculator
  qr: respiratoryQuotient,

  // Saved Calculations Component
  savedCalc: savedCalculations,

  // Fluid Balance Calculator (24h)
  fluidBalance,

  // Dosage Calculator
  dosageCalculator,

  // Drug Dilution Calculator
  drugDilution,
  infusionRate,

  // Main Layout
  mainLayout,

  // Drug Compatibility Page
  drugCompatibilityPage,

  // Drug Compatibility Components
  drugCompatibility,
};
