/**
 * @file it-IT/bsa.ts
 * @description Traduzioni italiane per BSA Calculator
 * @author Vasile Chifeac
 * @created 2025-12-15
 *
 * @references
 * - Mosteller Formula (1987)
 * - DuBois & DuBois Formula (1916)
 * - Haycock et al. Formula (1978)
 */

export default {
  // 1. TITOLI PRINCIPALI
  title: 'Body Surface Area (BSA)',
  subtitle: 'Superficie Corporea',

  // 2. FORM INPUT
  form: {
    weightLabel: 'Peso',
    weightSuffix: 'kg',
    weightRule: 'Peso tra 1-500 kg',
    weightIcon: 'fitness_center',

    heightLabel: 'Altezza',
    heightSuffix: 'cm',
    heightRule: 'Altezza tra 1-300 cm',
    heightIcon: 'height',
  },

  // 3. BOTTONI
  buttons: {
    calculate: 'Calcola BSA',
    reset: 'Reset',
  },

  // 4. RISULTATI
  results: {
    title: 'Risultati BSA',
    placeholder: 'Inserisci peso e altezza per calcolare la BSA',
    table: {
      formula: 'Formula',
      bsa: 'BSA (m²)',
      application: 'Applicazione',
      mosteller: 'Mosteller',
      dubois: 'DuBois',
      haycock: 'Haycock',
      adultsGeneral: 'Adulti (general purpose)',
      metabolicResearch: 'Ricerca metabolica',
      pediatrics: 'Pediatria (<15 anni)',
    },
  },

  // 5. BANNER CLINICO
  clinicalBanner: {
    title: 'Note Cliniche',
    adultsAverage: 'Valori Medi Adulti:',
    adultsValues: 'Donne ~1.6 m², Uomini ~1.9 m²',
    neonates: 'Neonati a termine:',
    neonatesValue: '~0.25 m²',
  },

  // 6. SEZIONI ESPANDIBILI
  sections: {
    // Sezione Applicazioni Cliniche
    clinicalApplications: {
      title: 'Applicazioni Cliniche BSA',
      icon: 'local_hospital',
      applications: [
        {
          title: 'Chemioterapia:',
          text: 'Dosaggio farmaci antineoplastici in mg/m² (cisplatino, doxorubicina, carboplatin)',
        },
        {
          title: 'Cardiologia:',
          text: 'Cardiac Index = CO / BSA (L/min/m², normale 2.5-4.0), Stroke Volume Index = SV / BSA',
        },
        {
          title: 'Nefrologia:',
          text: 'GFR normalizzazione a 1.73 m² per confrontabilità tra pazienti',
        },
        {
          title: 'Ustioni:',
          text: 'Calcolo TBSA% per fabbisogno fluidico (formula Parkland: 4mL × peso × TBSA% in 24h)',
        },
      ],
    },

    // Sezione Formule
    formulas: {
      title: 'Formule BSA',
      icon: 'functions',
      items: [
        {
          name: 'Mosteller (1987):',
          formula: 'BSA (m²) = √[(altezza_cm × peso_kg) / 3600]',
        },
        {
          name: 'DuBois & DuBois (1916):',
          formula: 'BSA (m²) = 0.007184 × altezza_cm^0.725 × peso_kg^0.425',
        },
        {
          name: 'Haycock et al. (1978):',
          formula: 'BSA (m²) = 0.024265 × altezza_cm^0.3964 × peso_kg^0.5378',
        },
      ],
    },
  },
};
