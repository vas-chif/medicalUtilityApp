/**
 * @file it-IT/bmi.ts
 * @description Traduzioni italiane per BMI Calculator
 * @author Vasile Chifeac
 * @created 2025-12-15
 *
 * @references
 * - WHO BMI Classification Guidelines
 * - WHO Technical Report Series 894 (2000)
 */

export default {
  // 1. TITOLI PRINCIPALI
  title: 'Indice di Massa Corporea (BMI)',
  subtitle: 'Parametri Antropometrici',

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

    ageLabel: 'Età (opzionale)',
    ageSuffix: 'anni',
    ageRule: 'Età tra 1-120 anni',
    ageIcon: 'cake',

    genderLabel: 'Sesso (opzionale)',
    genderIcon: 'person',
    genderOptions: {
      male: 'Maschio',
      female: 'Femmina',
    },
  },

  // 3. BOTTONI
  buttons: {
    calculate: 'Calcola BMI',
    reset: 'Reset Dati',
  },

  // 4. RISULTATI
  results: {
    title: 'Risultati',
    bmiValue: 'kg/m²',
    bmiSubtitle: 'Indice di Massa Corporea',

    classification: 'Classificazione WHO:',

    scaleTitle: 'Posizione nella Scala BMI:',
    scaleLabels: {
      underweight: '15',
      normal1: '18.5',
      normal2: '25',
      overweight: '30',
      obese1: '35',
      obese2: '40+',
    },

    idealWeight: 'Peso Ideale (BMI 18.5-24.9):',
    weightDifference: {
      excess: 'Eccesso:',
      deficit: 'Deficit:',
    },

    categories: {
      underweight: 'Sottopeso',
      normal: 'Normopeso',
      overweight: 'Sovrappeso',
      obese1: 'Obesità Grado I',
      obese2: 'Obesità Grado II',
      obese3: 'Obesità Grado III',
    },
  },

  // 5. SEZIONE CLASSIFICAZIONE COMPLETA
  sections: {
    classification: {
      title: 'Classificazione Completa WHO',
      icon: 'info',
      items: {
        underweight: '<strong class="text-blue">Sottopeso:</strong> &lt; 18.5',
        normal: '<strong class="text-green">Normopeso:</strong> 18.5 - 24.9',
        overweight: '<strong class="text-orange">Sovrappeso:</strong> 25.0 - 29.9',
        obese1: '<strong class="text-red">Obesità I:</strong> 30.0 - 34.9',
        obese2: '<strong class="text-deep-orange">Obesità II:</strong> 35.0 - 39.9',
        obese3: '<strong class="text-purple">Obesità III:</strong> ≥ 40.0',
      },
    },

    // 6. DEFINIZIONE E SIGNIFICATO CLINICO
    definition: {
      title: 'Definizione e Significato Clinico',
      icon: 'info',
      whatIs: {
        title: 'Definizione:',
        text: "L'Indice di Massa Corporea (BMI - Body Mass Index) è una misura indiretta dell'adiposità corporea che mette in relazione il peso e l'altezza di un individuo. È il parametro antropometrico standard riconosciuto dall'OMS per classificare lo stato ponderale e valutare il rischio sanitario associato.",
      },
      clinicalSignificance: {
        title: 'Significato Clinico:',
        intro: 'Il BMI è utilizzato per:',
        items: [
          'Screening di malnutrizione o obesità nella popolazione',
          'Valutazione del rischio cardiovascolare e metabolico',
          "Monitoraggio dell'efficacia di interventi nutrizionali",
          'Stratificazione del rischio in contesti clinici e assicurativi',
        ],
      },
    },

    // 7. FISIOLOGIA E INTERPRETAZIONE
    physiology: {
      title: 'Fisiologia e Interpretazione',
      icon: 'science',
      intro: 'Il BMI fornisce una stima della massa grassa corporea, ma non distingue tra:',
      limitations: [
        '<strong>Massa magra vs massa grassa:</strong> Atleti muscolosi possono avere BMI elevato',
        '<strong>Distribuzione del grasso:</strong> Grasso viscerale vs sottocutaneo',
        '<strong>Composizione corporea:</strong> Idratazione, densità ossea',
      ],
      conclusion: {
        title: 'Limitazioni:',
        text: 'Il BMI non tiene conto di età, sesso, etnia, massa muscolare. Per valutazioni più precise considerare: circonferenza vita, plicometria, impedenziometria, DEXA.',
      },
    },

    // 8. COME SI MISURA
    measurement: {
      title: 'Come si Misura',
      icon: 'straighten',
      weight: {
        title: 'Peso:',
        text: 'Misurare al mattino, a digiuno, senza scarpe, con abbigliamento leggero. Bilancia tarata e certificata.',
      },
      height: {
        title: 'Altezza:',
        text: 'Misurare in posizione eretta, senza scarpe, talloni e schiena contro parete, sguardo parallelo al suolo. Stadiometro calibrato.',
      },
      frequency: {
        title: 'Frequenza:',
        text: 'Monitorare periodicamente (mensile/trimestrale) per valutare trend e efficacia interventi.',
      },
    },

    // 9. FORMULA DI CALCOLO
    formula: {
      title: 'Formula di Calcolo',
      icon: 'functions',
      formulaTitle: 'Formula BMI (Quetelet Index):',
      formulaText: 'BMI = Peso (kg) / Altezza² (m²)',
      example: {
        title: 'Esempio:',
        calculation: 'Peso = 70 kg, Altezza = 1.75 m',
        result: 'BMI = 70 / (1.75)² = 70 / 3.0625 = 22.9 kg/m²',
      },
      note: "Nota: La formula di Quetelet (Adolphe Quetelet, 1832) è stata adottata dall'OMS nel 1995 come standard per la valutazione dello stato nutrizionale.",
    },

    // 10. INTERPRETAZIONE RISULTATI
    interpretation: {
      title: 'Interpretazione Risultati',
      icon: 'psychology',
      intro:
        'La classificazione WHO del BMI si basa su studi epidemiologici che correlano i valori BMI con rischio di mortalità e morbilità:',
      categories: [
        '<strong>Sottopeso (&lt;18.5):</strong> Aumentato rischio malnutrizione, osteoporosi, immunodeficienza',
        '<strong>Normopeso (18.5-24.9):</strong> Rischio minimo morbilità/mortalità',
        '<strong>Sovrappeso (25.0-29.9):</strong> Rischio moderato malattie cardiovascolari',
        '<strong>Obesità I (30.0-34.9):</strong> Rischio elevato diabete, ipertensione',
        '<strong>Obesità II (35.0-39.9):</strong> Rischio molto elevato complicanze metaboliche',
        '<strong>Obesità III (≥40.0):</strong> Rischio estremo per la salute, necessario intervento specialistico',
      ],
      note: 'Nota: I cutoff BMI possono variare per etnie asiatiche (cutoff più bassi: ≥23 sovrappeso, ≥27.5 obesità).',
    },

    // 11. APPLICAZIONI CLINICHE
    clinicalApplications: {
      title: 'Applicazioni Cliniche',
      icon: 'local_hospital',
      applications: [
        {
          title: 'Screening Popolazione:',
          text: 'Identificazione rapida soggetti a rischio nutrizionale in medicina generale, campagne screening',
        },
        {
          title: 'Valutazione Rischio Chirurgico:',
          text: 'BMI >35 aumenta rischio complicanze anestesiologiche e post-operatorie',
        },
        {
          title: 'Dosaggio Farmaci:',
          text: 'Alcuni farmaci richiedono aggiustamento dose basato su BMI (chemioterapici, anticoagulanti)',
        },
        {
          title: 'Valutazione Nutrizionale:',
          text: 'Monitoraggio longitudinale efficacia diete, programmi riabilitativi, terapia comportamentale',
        },
      ],
    },

    // 12. VALORI DI ALLERTA
    alerts: {
      title: 'Valori di Allerta e Azioni Cliniche',
      icon: 'warning',
      critical: {
        title: 'Valori Critici (Azione Immediata):',
        items: [
          '<strong>BMI &lt;16:</strong> Malnutrizione severa → Consulto nutrizionista, esami ematochimici, valutazione psichiatrica (anoressia)',
          '<strong>BMI ≥40:</strong> Obesità estrema → Valutazione bariatrica, screening complicanze metaboliche (diabete, OSAS)',
        ],
      },
      monitoring: {
        title: 'Valori di Monitoraggio:',
        items: [
          '<strong>BMI 16-18.5:</strong> Sottopeso → Follow-up nutrizionale, screening malassorbimento',
          '<strong>BMI 25-29.9:</strong> Sovrappeso → Counseling stile di vita, screening dislipidemie',
          '<strong>BMI 30-39.9:</strong> Obesità → Programma strutturato perdita peso, monitoraggio complicanze',
        ],
      },
    },

    // 13. DOCUMENTAZIONE E LINEE GUIDA
    documentation: {
      title: 'Documentazione e Linee Guida',
      icon: 'description',
      guidelines: [
        {
          title: 'OMS (2000):',
          text: 'Obesity: Preventing and Managing the Global Epidemic. WHO Technical Report Series 894.',
        },
        {
          title: 'CDC (2022):',
          text: 'Adult BMI Calculator - Standard per screening obesità USA',
        },
        {
          title: 'ESC (2021):',
          text: 'Linee guida cardiovascolari - BMI come fattore di rischio coronarico',
        },
        {
          title: 'SIO (2022):',
          text: 'Società Italiana Obesità - Standard diagnostici e terapeutici',
        },
      ],
    },

    // 14. BIBLIOGRAFIA
    bibliography: {
      title: 'Bibliografia e Riferimenti Scientifici',
      icon: 'menu_book',
      references: [
        {
          title: 'WHO. (2000)',
          text: 'Obesity: Preventing and Managing the Global Epidemic. WHO Technical Report Series 894.',
          link: 'https://www.who.int/publications/i/item/9241208945',
        },
        {
          title: 'Quetelet A. (1832)',
          text: "Recherches sur le poids de l'homme aux différents âges. Nouveaux Mémoires de l'Académie Royale des Sciences et Belles-Lettres de Bruxelles.",
          note: 'Studio originale che ha introdotto il concetto di indice peso/altezza²',
        },
        {
          title: 'Keys A, et al. (1972)',
          text: 'Indices of relative weight and obesity. Journal of Chronic Diseases, 25(6-7), 329-343.',
          doi: 'DOI: 10.1016/0021-9681(72)90027-6',
        },
        {
          title: 'WHO Expert Consultation. (2004)',
          text: 'Appropriate body-mass index for Asian populations and its implications. The Lancet, 363(9403), 157-163.',
          doi: 'DOI: 10.1016/S0140-6736(03)15268-3',
        },
      ],
    },
  },
};
