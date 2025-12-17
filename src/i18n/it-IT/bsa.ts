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

  // 7. DOCUMENTATION SECTIONS (9 NEWS-STYLE SECTIONS)
  documentationSections: {
    definition: {
      title: 'Definizione Clinica BSA',
      content: {
        mainDefinition: {
          title: 'Definizione:',
          text: 'La Body Surface Area (BSA) è la misurazione della superficie totale del corpo umano espressa in metri quadrati (m²). È un parametro antropometrico fondamentale per normalizzare dosaggi farmacologici (chemioterapia), parametri emodinamici (cardiac index), clearance renale (GFR) e fabbisogni metabolici. BSA correla meglio con funzioni fisiologiche rispetto al solo peso corporeo.',
        },
        keyPrinciples: {
          title: 'Principi Fondamentali:',
          items: [
            '<strong>Normalizzazione Dosaggio Chemioterapia:</strong> Farmaci antineoplastici (cisplatino, doxorubicina, paclitaxel) dosati mg/m² BSA per ridurre tossicità interindividuale. Vd correlato a massa tissutale, non peso',
            '<strong>Cardiac Index Standardizzato:</strong> Cardiac Output / BSA = CI (L/min/m²), range normale 2.5-4.0 L/min/m². Permette confronto emodinamica tra pazienti diversa taglia',
            '<strong>GFR Normalizzato:</strong> Filtrato glomerulare riportato a 1.73 m² (BSA adulto medio). CKD-EPI, MDRD formule usano questo standard per classificazione IRC',
            '<strong>Ustioni TBSA%:</strong> Total Body Surface Area bruciata (%) per calcolo fluidico (Parkland: 4 mL × kg × TBSA% nelle prime 24h). Wallace rule of 9s per stima rapida',
          ],
        },
        clinicalImportance: {
          title: 'Importanza Clinica:',
          description:
            'BSA è critico per sicurezza dosaggio chemioterapia e precisione parametri emodinamici. Errori di calcolo BSA possono causare:',
          points: [
            '<strong>Sovradosaggio Chemioterapia:</strong> BSA sovrastimato → dose mg/m² eccessiva → mielosoppressione grave, tossicità GI/cardiaca/renale. Cisplatino >100 mg/m² nefrotossico',
            '<strong>Sottodosaggio Oncologico:</strong> BSA sottostimato → dose ridotta → inefficacia terapeutica, riduzione sopravvivenza. Dosaggio accurato critico CHOP, FOLFOX',
            '<strong>Errori Cardiac Index:</strong> CI calcolato su BSA errata → misclassificazione shock (CI <2.2), high output (CI >4.0), decisioni terapeutiche sbagliate',
            '<strong>Misinterpretazione GFR:</strong> GFR non normalizzato → classificazione IRC incorretta, dosaggio farmaci renali errato (antibiotici, anticoagulanti)',
          ],
        },
      },
    },
    physiology: {
      title: 'Fisiologia Superficie Corporea',
      content: {
        metabolicRelationship: {
          title: 'Relazione Metabolica BSA:',
          description:
            'BSA correla con tasso metabolico basale, volume sanguigno, clearance farmaci meglio del peso corporeo:',
          components: [
            '<strong>Tasso Metabolico Basale:</strong> BMR ~1000 kcal/m²/die (formula Harris-Benedict modificata). Perdita calore per irradiazione/conduzione proporzionale superficie, non massa',
            '<strong>Volume Sanguigno:</strong> ~2.5-3 L/m² BSA (adulti). Neonati ~3.5 L/m² (proporzione maggiore). Volume plasmatico ~1.5 L/m², eritrocitario ~1 L/m²',
            '<strong>Cardiac Output:</strong> ~3-3.5 L/min/m² BSA a riposo. Aumenta 500-700 mL/min/m² per ogni aumento metabolico 10% (febbre, esercizio, ipertiroidismo)',
            '<strong>Clearance Farmacologica:</strong> Clearance epatica/renale correlatə BSA. Chemioterapici Vd 10-30 L/m², clearance 10-100 mL/min/m² (metotrexate, cisplatino)',
          ],
        },
        bodyComposition: {
          title: 'Composizione Corporea e BSA:',
          points: [
            '<strong>Obesità Paradox:</strong> BSA aumenta con obesità ma non linearmente (esponente <1 nelle formule). Obesi BMI >35 → BSA sovrastimato se formula standard usata',
            '<strong>Sarcopenia:</strong> Anziani/cachettici: BSA può essere normale ma massa muscolare ridotta. FFM (fat-free mass) più accurato per chemioterapia in cachessia oncologica',
            '<strong>Edema/Ascite:</strong> Peso aumentato da fluidi extracellulari non altera BSA reale. Usare "dry weight" per calcolo, non peso con edemi massivi (scompenso, cirrosi)',
            '<strong>Amputazioni:</strong> BSA ridotto proporzionalmente: gamba intera -9%, braccio intero -4%, piede -3.5%. Considerare per dosaggio chemioterapia accurato',
          ],
        },
        thermoregulation: {
          title: 'Termoregolazione e Superficie:',
          mechanisms: [
            '<strong>Dispersione Calore Neonati:</strong> BSA/peso ratio neonato 2-3x adulto → perdita calore rapida. Neonato pretermine <1 kg necessita incubatrice termoneutrale 34-36°C',
            '<strong>Ustioni Estese:</strong> TBSA >20% → perdita calore massiva, ipermetabolismo. Fabbisogno energetico 25-40 kcal/kg/die + evaporative losses 2000-5000 mL/die',
            '<strong>Ipotermia Intraoperatoria:</strong> Pazienti piccoli (BSA <1 m²) o bambini → rischio ipotermia maggiore. Forced-air warming, fluidi riscaldati obbligatori',
          ],
        },
      },
    },
    measurement: {
      title: 'Misurazione BSA',
      content: {
        directMeasurement: {
          title: 'Misurazione Diretta BSA:',
          methods: [
            '<strong>3D Body Scanner:</strong> Laser/fotogrammetria genera mesh 3D corpo, calcola superficie poligonale. Accuratezza ±1%, gold standard ricerca. Costo elevato, non routine clinica',
            '<strong>Coating Methods:</strong> Ricopertura corpo con materiale misurabile (paper strips storici). Utilizzato per derivare formule empiriche (DuBois 1916). Obsoleto',
            '<strong>Antropometria Segmentale:</strong> Misurazione circonferenze multiple (testa, torace, addome, arti) + lunghezze. Somma superficie segmenti. Laborioso, impreciso',
          ],
        },
        formulaSelection: {
          title: 'Scelta Formula BSA:',
          guidelines: [
            '<strong>Mosteller (1987) - General Purpose:</strong> Formula semplificata √[(h×w)/3600], rapida calcolo mentale. Accuratezza ±5% adulti normopeso. PREFERITA pratica clinica standard',
            '<strong>DuBois & DuBois (1916) - Research:</strong> Formula originale 0.007184×h^0.725×w^0.425, derivata 9 soggetti. Accurata ricerca metabolica, tedious calcolo manuale',
            '<strong>Haycock (1978) - Pediatria:</strong> Formula 0.024265×h^0.3964×w^0.5378 ottimizzata bambini <15 anni. Accuratezza superiore neonati/infanti. PREFERITA oncologia pediatrica',
            '<strong>Gehan & George (1970):</strong> Formula 0.0235×h^0.42246×w^0.51456, sviluppata 401 soggetti. Accurata obesità/magrezza estrema. Usata se BMI <18 o >35',
            '<strong>Boyd (1935):</strong> Formula complessa con logaritmi, accuratezza teorica massima. Obsoleta per complessità calcolo, sostituita da Mosteller clinicamente',
          ],
        },
        practicalProtocol: {
          title: 'Protocollo Pratico Misurazione:',
          steps: [
            '<strong>Peso Accurato:</strong> Bilancia calibrata, paziente svestito/biancheria leggera, vescica vuota. ±0.1 kg precisione. NO scarpe, NO tasca telefono/portafoglio',
            '<strong>Altezza Eretta:</strong> Stadiometro a parete, paziente scalzo, talloni-glutei-scapole a contatto parete, sguardo orizzontale. ±0.5 cm precisione. NO altezza autoriferita',
            '<strong>Neonati/Lattanti:</strong> Lunghezza supina su infantometro, testa occipite fissato, ginocchia estese. Peso su bilancia pediatrica ±10 g. Formula Haycock obbligatoria',
            '<strong>Pazienti Allettati:</strong> Altezza ginocchio-tallone × 2.69 (donne) o 2.78 (uomini) per stima altezza se non misurabile eretta. Accuratezza ±3-5 cm',
          ],
        },
      },
    },
    formula: {
      title: 'Formule BSA',
      content: {
        formulaDerivation: {
          title: 'Derivazione Formule:',
          description:
            'Formule BSA derivate empiricamente da misurazioni dirette (coating methods) e regressioni potenza:',
          steps: [
            '<strong>Forma Generale:</strong> BSA = k × altezza^a × peso^b. Esponenti a,b tra 0.3-0.7, costante k calibrata. Allometria: rapporto superficie/volume scala con taglia',
            '<strong>DuBois 1916:</strong> 9 soggetti adulti, coating method. Regressione log(BSA) vs log(h) e log(w). Esponenti 0.725 (h), 0.425 (w), costante 0.007184',
            '<strong>Mosteller 1987:</strong> Semplificazione algebrica DuBois mantenendo accuratezza. Assume esponenti ≈0.5 entrambi → √(h×w). Divisore 3600 per conversione unità',
            '<strong>Validazione Moderna:</strong> 3D scanning 200+ soggetti conferma accuratezza Mosteller ±5%. Formula supera variabilità interosservatore (±10%) misurazioni dirette',
          ],
        },
        practicalExamples: {
          title: 'Esempi Pratici Calcolo:',
          examples: [
            '<strong>Adulto Standard:</strong> Donna 165 cm, 60 kg. Mosteller: √[(165×60)/3600] = √2.75 = 1.66 m². DuBois: 0.007184×165^0.725×60^0.425 = 1.64 m². Differenza 1.2%',
            '<strong>Neonato a Termine:</strong> Bambino 50 cm, 3.5 kg. Haycock: 0.024265×50^0.3964×3.5^0.5378 = 0.024265×7.21×1.81 = 0.32 m². Mosteller sovrastimerebbe',
            '<strong>Paziente Obeso:</strong> Uomo 180 cm, 120 kg. Mosteller: √[(180×120)/3600] = 2.19 m². Gehan-George: 0.0235×180^0.42246×120^0.51456 = 2.25 m². Gehan più accurato BMI >35',
          ],
        },
        clinicalVariations: {
          title: 'Variazioni Formule per Condizioni Speciali:',
          variations: [
            '<strong>BSA Cap Obesità:</strong> ASCO guidelines chemioterapia: NO capping BSA obesi. Dose piena su BSA reale <2.5 m², riduzione solo se tossicità documentata ciclo precedente',
            '<strong>BSA Neonati Pretermine:</strong> Formula specifica <37 settimane: BSA = 4.688 × peso^0.8168 × lunghezza^0.3964 (Brion 1986). Accurata 500g - 5kg',
            '<strong>BSA Amputati:</strong> Riduzione percentuale: AK amputation -6% BSA, BK -5.5%, AE -3%, BE -2.3%. Importante per chemioterapia dose-capping appropriato',
            '<strong>BSA Ustioni Pediatriche:</strong> Lund-Browder chart modifica rule of 9s per bambini (testa 18-19% neonato vs 9% adulto). Accuratezza critica fluid resuscitation',
          ],
        },
      },
    },
    interpretation: {
      title: 'Interpretazione BSA',
      content: {
        clinicalRanges: {
          title: 'Range Clinici BSA:',
          description: 'Valori BSA normali per categoria e implicazioni dosaggio:',
          ranges: [
            '<strong>Neonati a Termine (38-42 sett):</strong> BSA 0.20-0.30 m² (peso 2.5-4 kg). Chemioterapia pediatrica: dosi assolute fisse <0.5 m² (NO mg/m²), rischio sovradosaggio',
            '<strong>Bambini 1-10 anni:</strong> BSA 0.5-1.1 m². Dosaggio mg/m² standard. Attenzione obesity epidemic: 20% bambini USA BMI >95° percentile, BSA formula Haycock preferita',
            '<strong>Adolescenti 11-18 anni:</strong> BSA 1.2-1.8 m² (variabilità pubertà). Transizione dosaggio pediatrico→adulto: alcuni protocolli passano a dose adulta fissa BSA >1.5 m²',
            '<strong>Donne Adulte:</strong> BSA media 1.6 m² (range 1.4-1.9). Chemioterapia: dose piena anche anziane >70 anni se performance status ECOG 0-1, no riduzione profilattica',
            '<strong>Uomini Adulti:</strong> BSA media 1.9 m² (range 1.7-2.2). Obesità: BSA può raggiungere 2.3-2.5 m², NO capping <2.2 m² per chemioterapia (riduce efficacia)',
          ],
        },
        cardiacIndex: {
          title: 'Cardiac Index (BSA-normalizzato):',
          interpretation: [
            '<strong>CI Normale:</strong> 2.5-4.0 L/min/m² (adulti riposo). CO 5-7 L/min / BSA 1.7-2.0 m². Stroke Volume Index (SVI) = SV/BSA, normale 35-50 mL/m²',
            '<strong>Low CI (<2.2):</strong> Shock cardiogeno (IMA, insufficienza acuta), tamponamento, embolia polmonare massiva. Se SVR >1200 dyne×sec/cm⁵ → afterload eccessivo',
            '<strong>High CI (>4.5):</strong> Sepsi/shock distributivo, ipertiroidismo, anemia severa (Hb <7 g/dL), shunt AV, gravidanza. Se SVR <800 → vasoplegia, necessita vasopressori',
            '<strong>Monitoraggio CI:</strong> Swan-Ganz (termodiluizione), ecocardiografia, PiCCO, FloTrac. Target CI >2.5 in shock, >3.0 in sepsi severa (Early Goal-Directed Therapy)',
          ],
        },
        gfrNormalization: {
          title: 'GFR Normalizzato 1.73 m²:',
          significance: [
            '<strong>Standardizzazione GFR:</strong> Tutti eGFR (CKD-EPI, MDRD) riportati a 1.73 m² (BSA adulto medio caucasico). Permette classificazione IRC indipendente da taglia paziente',
            '<strong>De-normalizzazione GFR:</strong> GFR individuale = eGFR × (BSA/1.73). Critico per dosaggio chemioterapia renale (carboplatino AUC-based, metotrexate ad alte dosi)',
            '<strong>Bambini/Anziani Piccoli:</strong> BSA <1.73 m² → GFR assoluto inferiore a eGFR. Dosaggio farmaci renali su GFR assoluto, non eGFR (rischio sovradosaggio digossina, LMWH)',
            '<strong>Obesi/Atleti Grandi:</strong> BSA >1.73 m² → GFR assoluto maggiore. eGFR sottostima clearance reale, possibile sottodosaggio antibiotici tempo-dipendenti (β-lattamici)',
          ],
        },
      },
    },
    applications: {
      title: 'Applicazioni Cliniche',
      content: {
        oncologyDosing: {
          title: 'Dosaggio Chemioterapia Oncologica:',
          description: 'BSA-based dosing riduce tossicità mantenendo efficacia:',
          protocols: [
            '<strong>Chemioterapia Solida:</strong> Cisplatino 75 mg/m², doxorubicina 60 mg/m², paclitaxel 175 mg/m² q3w. Dose piena BSA reale obesi, riduzione solo se ANC <1000 ciclo precedente',
            '<strong>Linfomi (CHOP, R-CHOP):</strong> Doxorubicina 50 mg/m², vincristina 1.4 mg/m² (cap 2 mg assoluto), ciclofosfamide 750 mg/m² giorno 1. NO riduzione profilattica anziani',
            '<strong>Pediatria (ALL, Osteosarcoma):</strong> Metotrexate HD 8-12 g/m², ifosfamide 1.8 g/m²/die × 5 giorni. Dose massima assoluta per vincristina (2 mg), bleomicina (400 U totali)',
            '<strong>Carboplatino AUC-based:</strong> Dose (mg) = AUC × (GFR + 25). AUC 5-6 per solid tumors, 6-7 per linfomi. GFR da CrCl Cockcroft-Gault, NO eGFR CKD-EPI',
            '<strong>Capecitabine Orale:</strong> 1000-1250 mg/m² BID giorni 1-14 q21d. Riduzione 25% se CrCl 30-50, 50% se CrCl <30. Monitoraggio hand-foot syndrome, diarrea G3+',
          ],
        },
        cardiacAssessment: {
          title: 'Valutazione Cardiaca:',
          applications: [
            '<strong>Cardiac Index Monitoring:</strong> CI target >2.2 L/min/m² (shock), >2.5 (sepsi), >3.0 (cardiochirurgia post-op). FloTrac/PiCCO minimally invasive, no PAC routine',
            '<strong>Valvulopatie Indexed:</strong> Aortic Valve Area <0.6 cm²/m² = stenosi severa sintomatica (indicazione TAVR/AVR). Mitral Valve Area <1.0 cm²/m² = stenosi severa',
            '<strong>Ecocardiografia Stress:</strong> Dobutamine stress echo: dose 40 mcg/kg/min. Peak HR target 85% age-predicted maximum. Ischemia se nuovi wall motion abnormalities',
            '<strong>Pediatric Cardiology:</strong> Shunt Qp/Qs indexed BSA: >1.5 considerare chiusura (ASD, VSD). Fontan pressures: mean PA <15 mmHg per outcome ottimale long-term',
          ],
        },
        burnsFluidResuscitation: {
          title: 'Ustioni e Fluidoterapia:',
          protocols: [
            '<strong>Parkland Formula:</strong> 4 mL × peso (kg) × TBSA% nelle prime 24h. Metà prima 8h, metà restanti 16h. Ringer Lattato cristalloide prima scelta',
            '<strong>TBSA Estimation:</strong> Wallace Rule of 9s adulti: testa 9%, tronco ant 18%, tronco post 18%, braccia 9% ciascuno, gambe 18% ciascuna, genitali 1%. Palmo paziente = 1%',
            '<strong>Lund-Browder Chart Pediatria:</strong> Testa neonato 19% (vs 9% adulto), arti inf 13% (vs 18% adulto). Accuratezza critica <5 anni evitare under-resuscitation',
            '<strong>Inhalation Injury:</strong> +30-50% fabbisogno fluidico se inalazione fumo/CO. Fibrobroncoscopia early, intubazione se stridor/edema vie aeree. UOP target 0.5-1 mL/kg/h',
          ],
        },
      },
    },
    alerts: {
      title: 'Alert Sicurezza BSA',
      content: {
        dosingErrors: {
          title: 'Errori Dosaggio Chemioterapia:',
          description: 'Errori BSA-related comuni e conseguenze:',
          errors: [
            '<strong>Errore #1 - BSA Capping Obesi:</strong> Riduzione arbitraria dose <2.2 m² in obeso BMI >35 → sottodosaggio significativo, ridotta sopravvivenza. ASCO: dose piena sempre',
            '<strong>Errore #2 - Formula Pediatrica Errata:</strong> Uso Mosteller <10 anni invece Haycock → sovrastima BSA 5-10% → overdose chemioterapia. Haycock obbligatoria <15 anni',
            '<strong>Errore #3 - Altezza Autoriferita:</strong> Pazienti sovrastimano altezza media 2-3 cm → BSA sovrastimato → overdose cisplatino/carboplatin. Misurare sempre con stadiometro',
            '<strong>Errore #4 - Peso con Edemi:</strong> Calcolo BSA su peso con ascite/edemi → sovrastima → mielosoppressione G4. Usare "dry weight" pre-diuretico o peso pre-ascite',
            '<strong>Errore #5 - Unità Misura Sbagliate:</strong> Altezza metri invece cm (1.7 vs 170) → BSA 0.53 m² vs 1.89 m² → underdose catastrofica. Triple-check unità sempre',
          ],
        },
        toxicityRisks: {
          title: 'Rischi Tossicità:',
          warnings: [
            '<strong>Mielosoppressione Severa:</strong> Nadir ANC giorno 10-14, recovery 21-28 giorni (cisplatino, doxorubicina). G-CSF se ANC <500 o neutropenic fever. Dose reduction 25% next cycle',
            '<strong>Cardiotossicità Cumulativa:</strong> Doxorubicina dose lifetime <450-550 mg/m² (rischio CHF 3-5%). Epirubicina <900 mg/m². ECO LVEF baseline e ogni 3 cicli. Cardioprotection dexrazoxane',
            '<strong>Nefrotossicità Cisplatino:</strong> Dose >100 mg/m² o cumulative >300 mg/m² → GFR decline 25-40%. Hyper-hydration 1-2 L NS pre/post, mannitol, evitare FANS. Monitor CrCl q cycle',
            '<strong>Neurotossicità Vincristina:</strong> Dose cumulativa >6 mg (adult cap 2 mg/dose) → peripheral neuropathy irreversibile. Ridurre dose 50% se neuropathy G2, stop se G3',
          ],
        },
        specialPopulations: {
          title: 'Popolazioni Speciali:',
          considerations: [
            '<strong>Neonati <1 mese:</strong> Clearance immatura CYP3A4/CYP2D6, GFR <30 mL/min/1.73m². Dose ridotta 50-75% o dosaggi assoluti fissi. PK monitoring obbligatorio',
            '<strong>Anziani >75 anni:</strong> GFR decline 0.75 mL/min/anno dopo 40 anni. Chemioterapia dose piena se ECOG 0-1, CrCl >60. NO riduzione profilattica, aumenta mortality',
            '<strong>Cachessia Oncologica:</strong> BSA normale ma FFM ridotto -20-30% → sovradosaggio relativo farmaci idrofili. Considerare dose su LBM se disponibile impedenziometria',
            '<strong>Gravidanza Chemioterapia:</strong> BSA aumenta 10-15% 2°-3° trimestre. Dose su BSA pre-gravidanza tranne emergenze ematologiche. Evitare 1° trimestre (teratogenicità)',
          ],
        },
      },
    },
    documentation: {
      title: 'Protocolli e Documentazione',
      content: {
        clinicalGuidelines: {
          title: 'Linee Guida Internazionali:',
          guidelines: [
            '<strong>ASCO 2012:</strong> "Appropriate Chemotherapy Dosing for Obese Adult Patients". Full BSA-based dose obesi, NO capping <2.2 m², riduzione solo se tossicità G3-4 ciclo precedente',
            '<strong>NCCN Guidelines:</strong> "Chemotherapy Dose Calculation". Mosteller formula standard adulti, Haycock pediatria. GFR de-normalized per carboplatino AUC dosing',
            '<strong>ESMO 2017:</strong> "Dose Adjustments in Renal/Hepatic Impairment". Chemioterapia BSA-based + aggiustamento funzione organo. Carboplatin Calvert formula obbligatoria',
            '<strong>BCCA Cancer Drug Manual:</strong> Database 200+ farmaci con dosaggi standard mg/m², max caps, aggiustamenti funzione renale/epatica. Gold standard British Columbia',
          ],
        },
        pharmacyProtocols: {
          title: 'Protocolli Verifica Farmacia:',
          protocols: [
            '<strong>Triple Check BSA:</strong> Farmacista verifica calcolo BSA indipendente. Tolleranza ±5% tra prescrittore e farmacista. Se discrepanza >5% → contatto medico prima preparazione',
            '<strong>Height/Weight Verification:</strong> Conferma misurazioni recenti (<7 giorni). NO altezza/peso autoriferiti per chemioterapia. Alert automatico se variazione >5% ciclo precedente',
            '<strong>Dose Banding:</strong> Arrotondamento dose ±5% per standardizzare preparazioni (riduce spreco, costo). Es. cisplatino 145 mg vs 150 mg (BSA 1.93 vs 2.0 m²). Accettabile se delta <10%',
            '<strong>Pediatric Safety Checks:</strong> Verifica formula età-appropriata (Haycock <15 anni). Max dose assoluta vincristina 2 mg anche se BSA suggerirebbe maggiore. Double-check indipendente obbligatorio',
          ],
        },
        documentationRequirements: {
          title: 'Requisiti Documentazione:',
          requirements: [
            '<strong>Antropometria Documentata:</strong> Peso attuale kg, altezza cm, BSA m² (formula usata), data misurazione. NO altezze autoriferite, NO pesi con edemi non documentati',
            '<strong>Dosaggio Calcolato:</strong> Dose mg/m², BSA usata, dose assoluta mg, via somministrazione, giorno ciclo. Documentare razionale se dose ridotta (<90% standard)',
            '<strong>Funzione Organo Baseline:</strong> CrCl mL/min (Cockcroft-Gault), AST/ALT/bilirubina, ANC/piastrine. Aggiustamenti dose per insufficienza renale/epatica documentati',
            '<strong>Tossicità Cicli Precedenti:</strong> Nadir ANC/PLT, neuropathy grade, nausea/vomito, hand-foot syndrome. Riduzione dose prospettica se tossicità G3-4 non gestibile supportive care',
            '<strong>Consenso Informato:</strong> Discussione rischi/benefici, alternative, tossicità attese. Documentazione discussione fertilità preservation, cardiotossicità cumulativa, sequele long-term',
          ],
        },
      },
    },
    references: {
      title: 'Riferimenti Scientifici',
      content: {
        scientificStudies: {
          title: 'Studi Scientifici Fondamentali:',
          studies: [
            '<strong>DuBois D, DuBois EF (1916):</strong> "A formula to estimate the approximate surface area if height and weight be known". Arch Intern Med. PMID:N/A. Prima formula BSA empirica, 9 soggetti adulti',
            '<strong>Mosteller RD (1987):</strong> "Simplified calculation of body-surface area". N Engl J Med. PMID:3657876. Formula semplificata √[(h×w)/3600], gold standard clinico attuale',
            '<strong>Haycock GB et al (1978):</strong> "Geometric method for measuring BSA". J Pediatr. PMID:650346. Formula pediatrica 0.024265×h^0.3964×w^0.5378, accurata <15 anni',
            '<strong>Gehan EA, George SL (1970):</strong> "Estimation of human body surface area from height and weight". Cancer Chemother Rep. PMID:5527019. Formula accurata obesità/cachessia estrema',
            '<strong>Verbraecken J et al (2006):</strong> "Body surface area in normal-weight, overweight, and obese adults". Eur J Appl Physiol. PMID:16467962. Comparazione 9 formule, validazione 3D scanning',
          ],
        },
        clinicalGuidelinesReferences: {
          title: 'Riferimenti Linee Guida:',
          references: [
            '<strong>ASCO 2012:</strong> "Appropriate chemotherapy dosing for obese adult patients". J Clin Oncol. PMID:22641861. Full-dose BSA obesi, NO capping, riduce mortality 10-15%',
            '<strong>NCCN Chemotherapy Order Templates:</strong> Standardized dosing calculations, BSA-based vs flat-dosing, organ dysfunction adjustments. Updated annually',
            '<strong>ESMO 2017:</strong> "Chemotherapy-induced toxicity". Ann Oncol. PMID:28881917. Grading tossicità, dose modifications, supportive care guidelines',
            '<strong>Calvert Formula (1989):</strong> Carboplatin dosing AUC-based. J Clin Oncol. PMID:2915300. Dose = AUC × (GFR + 25), revolutionized platinum dosing accuracy',
            '<strong>BCCA Cancer Drug Manual:</strong> British Columbia Cancer Agency protocols. 200+ agents standardized mg/m² dosing, renal/hepatic adjustments, mixing/stability',
          ],
        },
        additionalResources: {
          title: 'Risorse Aggiuntive:',
          resources: [
            '<strong>MDCalc - BSA Calculator:</strong> Mosteller, DuBois, Haycock formulas with comparison. Chemotherapy dose calculators integrated',
            '<strong>GlobalRPh - BSA Calculators:</strong> Multiple formulas side-by-side, pediatric-specific. Cardiac index, GFR de-normalization tools',
            '<strong>Chemocare.com:</strong> Patient education chemotherapy, side effects management, BSA-based dosing explained lay terms. ASCO-affiliated resource',
            '<strong>Lexicomp/UpToDate:</strong> Drug dosing monographs, BSA-based vs flat dosing recommendations, renal/hepatic adjustments. Subscription required',
            '<strong>Cancer Therapy Advisor:</strong> Free oncology dosing resource, protocol lookup, toxicity management. Haymarket Medical Network',
          ],
        },
      },
    },
  },
};
