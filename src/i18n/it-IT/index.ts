/**
 * @file it-IT/index.ts
 * @description Italian translations for Medical Utility Pro
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
// import ibw from './ibw';

export default {
  // Common
  common: {
    home: 'Home',
    calculate: 'Calcola',
    reset: 'Reset Dati',
    result: 'Risultato',
    results: 'Risultati',
    interpretation: 'Interpretazione',
    formula: 'Formula',
    clinicalApplications: 'Applicazioni Cliniche',
    parameters: 'Parametri',
    normal: 'Normale',
    attention: 'Attenzione',
    note: 'Nota',
    warning: 'Avviso',
  },

  // Navigation
  nav: {
    medicalUtility: 'Medical Utility Pro',
    calculators: 'Calcolatori',
    apgar: 'Score APGAR',
    bmi: 'BMI',
    dosage: 'Dosaggio Farmaci',
    gfr: 'GFR (eGFR)',
    ventilation: 'Parametri Ventilatori',
    intensiveCare: 'Terapia Intensiva',
    drugCompatibility: 'Compatibilita Farmaci',
    inDevelopment: 'In Sviluppo',
  },

  // Validation messages
  validation: {
    positiveValue: 'Inserire valore positivo',
    percentage: 'Valore tra 0-100%',
    required: 'Campo obbligatorio',
  },

  // Error messages
  errors: {
    missingParameters: 'Compila tutti i campi obbligatori',
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
};
