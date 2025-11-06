/**
 * @file it-IT/index.ts
 * @description Italian translations for Medical Utility Pro
 * @author Vasile Chifeac
 * @created 2025-11-06
 * @modified 2025-11-06
 */

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
    drugCompatibility: 'Compatibilità Farmaci',
    inDevelopment: 'In Sviluppo',
  },

  // Respiratory Quotient
  rq: {
    title: 'Quoziente Respiratorio (RQ)',
    subtitle: 'VCO₂/VO₂ - Indicatore del tipo di metabolismo energetico',
    description: 'Rapporto tra anidride carbonica prodotta e ossigeno consumato',
    whatMeasures: 'Cosa misura il QR',
    whatMeasuresText: 'Indica il tipo di substrato energetico utilizzato dall\'organismo (carboidrati, grassi, proteine), NON l\'efficienza respiratoria.',
    
    // Form labels
    PvCO2: 'PvCO2 (CO2 Venosa)',
    PaCO2: 'PaCO2 (CO2 Arteriosa)',
    HB: 'HB (Emoglobina)',
    SaO2: 'SaO2 (Saturazione O2 Arteriosa)',
    SvO2: 'SvO2 (Saturazione O2 Venosa)',
    PaO2: 'PaO2 (Pressione O2 Arteriosa)',
    PvO2: 'PvO2 (Pressione O2 Venosa)',
    
    // Interpretations
    enterParameters: 'Inserire i parametri per il calcolo',
    severeAnaerobic: 'METABOLISMO ANAEROBICO SEVERO - Shock',
    anaerobicMetabolism: 'Metabolismo Anaerobico / Lipogenesi',
    carbMetabolism: 'Metabolismo Glucidico Prevalente',
    normalRange: 'Range Normale - Dieta Mista',
    fatMetabolism: 'Metabolismo Lipidico Prevalente',
    ketosis: 'Chetosi / Digiuno Prolungato',
    nonStandard: 'Valore Non Standard',
    
    // Alerts
    shockAlert: 'QR > 1.2 suggerisce metabolismo anaerobico. Verificare lattato arterioso, stato di shock e perfusione tissutale.',
    ketosisAlert: 'QR < 0.7 indica prevalente utilizzo di grassi/corpi chetonici. Valutare stato nutrizionale e glicemia.',
    
    // Sections
    definitionTitle: 'Definizione e Significato Clinico',
    metabolismTitle: 'Metabolismo Aerobico vs Anaerobico',
    measurementTitle: 'Come si Misura il VCO₂/VO₂',
    formulaTitle: '🧮 Formula Utilizzata',
    detailedAnalysisTitle: '🔬 Analisi Dettagliata e Applicazioni',
  },

  // Mechanical Power
  mp: {
    title: 'Mechanical Power',
    subtitle: 'Potenza meccanica erogata dal ventilatore',
    description: 'Energia trasferita dal ventilatore al sistema respiratorio per unità di tempo',
    
    // Coming from web research - will be populated after step 7
  },

  // Validation messages
  validation: {
    positiveValue: 'Inserire valore positivo',
    percentage: 'Valore tra 0-100%',
    required: 'Campo obbligatorio',
  },
};
