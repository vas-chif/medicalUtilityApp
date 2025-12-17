/**
 * @file it-IT/drugDilution.ts
 * @description Traduzioni italiane per Drug Dilution Calculator - VERSIONE MINIMA TEST
 * @author Vasile Chifeac
 * @created 2025-12-17
 */

export default {
  // 1. TITOLI PRINCIPALI
  title: 'Calcolatore Diluizioni Farmaci',
  subtitle: 'Calcolo diluizioni farmaci, concentrazioni finali e volumi da prelevare',

  // 2. FORM INPUT
  form: {
    sectionTitle: 'Parametri Diluizione',
    dose: {
      label: 'Dose Farmaco',
      unit: 'mg',
      validation: 'La dose deve essere maggiore di 0',
    },
    volume: {
      label: 'Volume Finale',
      unit: 'mL',
      validation: 'Il volume deve essere maggiore di 0',
    },
    stockConcentration: {
      label: 'Concentrazione Stock',
      unit: 'mg/mL',
      hint: 'Opzionale',
    },
    targetConcentration: {
      label: 'Concentrazione Desiderata',
      unit: 'mg/mL',
      hint: 'Opzionale',
    },
  },

  // 3. BUTTONS
  buttons: {
    calculate: 'Calcola Diluizione',
    reset: 'Reset',
  },

  // 4. RESULTS PANEL
  resultsPanel: {
    title: 'Risultati Diluizione',
    finalConcentration: {
      label: 'Concentrazione Finale',
      subtitle: 'mg/mL',
    },
    details: {
      totalDose: 'Dose Totale',
      finalVolume: 'Volume Finale',
      volumeToWithdraw: 'Volume da Prelevare',
      dilutionRatio: 'Rapporto Diluizione',
    },
  },

  // 5. EMPTY STATE
  emptyState: 'Inserisci i parametri per vedere i risultati',

  // 6. SECTIONS (MINIMAL)
  sections: {
    definition: {
      title: 'Definizione Clinica',
      content: {
        mainDefinition: {
          title: 'Definizione:',
          text: "La diluizione farmacologica è il processo di riduzione della concentrazione di un farmaco attraverso l'aggiunta di solvente (solitamente soluzione fisiologica 0.9% NaCl o acqua per preparazioni iniettabili). Calcolare correttamente la diluizione è essenziale per somministrare dosi sicure ed efficaci.",
        },
        principles: {
          title: 'Principi Fondamentali:',
          items: [
            '<strong>Concentrazione = Dose / Volume:</strong> La concentrazione finale (C) dipende dalla quantità di farmaco (mg) divisa per il volume totale (mL).',
            '<strong>Conservazione Massa:</strong> La quantità totale di farmaco rimane costante durante la diluizione (solo il volume cambia).',
            '<strong>Rapporto Diluizione:</strong> Esprime quante volte il volume finale è maggiore del volume iniziale. Es: 1:10 significa diluizione 10 volte.',
            '<strong>Stock Solution:</strong> Soluzione concentrata di partenza fornita dal produttore. Es: ampolla morfina 10 mg/mL.',
          ],
        },
      },
    },
    physiology: {
      title: 'Farmacocinetica',
      content: {
        pharmacokinetics: {
          title: 'Impatto Farmacocinetico:',
          principles: [
            '<strong>Assorbimento IV:</strong> Via endovenosa bypassa assorbimento (biodisponibilità F = 100%). Diluizione influenza velocità infusione ma NON quantità totale assorbita',
            '<strong>Volume Distribuzione (Vd):</strong> Farmaci idrofili (Vd piccolo 0.1-0.3 L/kg: aminoglicosidi) richiedono diluizioni maggiori per evitare picchi tossici',
            '<strong>Clearance:</strong> Diluizione NON altera clearance renale/epatica totale, ma può influenzare cinetica eliminazione',
            '<strong>Cmax e Cmin:</strong> Bolo rapido concentrato → Cmax elevato (rischio tossicità). Infusione lenta diluita → Cmax ridotto, concentrazione steady-state costante',
          ],
        },
        concentration: {
          title: 'Relazione Concentrazione-Effetto:',
          relationships: [
            '<strong>Farmaci Concentrazione-Dipendenti:</strong> Aminoglicosidi, fluorochinoloni → efficacia dipende da Cmax/MIC. Target Cmax/MIC > 8-10',
            '<strong>Farmaci Tempo-Dipendenti:</strong> Beta-lattamici, vancomicina → efficacia dipende da T > MIC. Target T > MIC 40-70% intervallo',
            '<strong>Farmaci AUC-Dipendenti:</strong> Carboplatino, vancomicina → efficacia dipende da area sotto curva. Diluizione non influenza AUC totale',
            '<strong>Finestra Terapeutica Stretta:</strong> Digossina (0.8-2.0 ng/mL), litio (0.6-1.2 mEq/L) → diluizioni errate causano facilmente sotto/sovradosaggio',
          ],
        },
        osmolarity: {
          title: 'Osmolarità e Tollerabilità:',
          considerations: [
            '<strong>Osmolarità Fisiologica:</strong> Plasma 280-320 mOsm/L. Soluzioni iperosm (> 600 mOsm/L) causano flebite/dolore',
            '<strong>Accesso Venoso:</strong> Periferico max 600 mOsm/L. Centrale tollerabilità illimitata (nutrizione parenterale fino 1800 mOsm/L)',
            '<strong>pH Soluzione:</strong> Diluizione tampona pH estremi. Farmaci irritanti richiedono velocità lenta + alta diluizione',
            '<strong>Velocità Infusione:</strong> Vancomicina, amiodarone, chemioterapici richiedono infusione lenta per ridurre reazioni avverse',
          ],
        },
      },
    },
    measurement: {
      title: 'Tecniche di Misurazione',
      content: {
        equipment: {
          title: 'Strumenti Necessari:',
          items: [
            '<strong>Siringhe:</strong> 1 mL (precisione 0.01 mL pediatria), 3-5-10 mL (uso standard), 20-50 mL (grandi volumi). Siringhe luer-lock obbligatorie per farmaci ad alto rischio',
            '<strong>Aghi:</strong> 18-19G (prelievo fiala), 21-23G (iniezione paziente). Aghi filtro (5 micron) per fiampolette vetro',
            '<strong>Sacche Infusione:</strong> 50-100-250-500-1000 mL (PVC o EVA). EVA per farmaci lipofili che adsorbono su PVC',
            '<strong>Pompe Infusione:</strong> Volumetriche (precisione ±5%, >5 mL/h) vs siringa (precisione ±2%, <5 mL/h)',
          ],
        },
        asepticTechnique: {
          title: 'Tecnica Asettica:',
          steps: [
            '<strong>Igiene Mani:</strong> Lavaggio antisettico 60 sec + gel alcolico. Guanti sterili non-powder',
            '<strong>Ambiente Sterile:</strong> Cappa flusso laminare per preparazioni sterili',
            '<strong>Disinfezione:</strong> Alcool 70% su tappo gomma fiala 15 sec + asciugatura completa',
            '<strong>Controllo Visivo:</strong> Verificare limpidezza, assenza particolato/precipitati prima e dopo diluizione',
          ],
        },
        dilutionProcedure: {
          title: 'Procedura Diluizione:',
          procedure: [
            '<strong>Step 1 - Calcolo:</strong> Calcolare dose, volume prelievo, volume solvente, concentrazione finale',
            '<strong>Step 2 - Preparazione:</strong> Assemblare siringa/ago sterili, verificare scadenze',
            '<strong>Step 3 - Prelievo:</strong> Disinfettare tappo, prelevare volume calcolato, eliminare bolle',
            '<strong>Step 4 - Trasferimento:</strong> Iniettare farmaco in sacca/siringa solvente',
            '<strong>Step 5 - Miscelazione:</strong> Inversione dolce 10-15 volte (NON agitare vigorosamente)',
            '<strong>Step 6 - Etichettatura:</strong> Nome farmaco, dose, volume, concentrazione, data/ora, operatore',
            '<strong>Step 7 - Controllo:</strong> Doppio controllo per farmaci ISMP high-alert',
          ],
        },
      },
    },
    formula: {
      title: 'Formule e Calcoli',
      content: {
        basicFormulas: {
          title: 'Formule Base:',
          formulas: [
            '<strong>Concentrazione Finale:</strong> C finale = Dose (mg) / Volume finale (mL). Unità: mg/mL. Esempio: 100 mg / 10 mL = 10 mg/mL',
            '<strong>Volume da Prelevare:</strong> V prelievo = Dose (mg) / C stock (mg/mL). Unità: mL. Esempio: 50 mg / (10 mg/mL) = 5 mL',
            '<strong>Volume Solvente:</strong> V solvente = V finale - V prelievo. Unità: mL. Esempio: 50 mL - 5 mL = 45 mL SF 0.9%',
            '<strong>Rapporto Diluizione:</strong> Ratio = V finale / V prelievo. Espresso come 1:X. Esempio: 50 mL / 5 mL = 10 → 1:10',
          ],
        },
        advancedFormulas: {
          title: 'Formule Avanzate:',
          calculations: [
            '<strong>Conservazione Massa:</strong> C stock × V prelievo = C finale × V finale. Esempio: 10 mg/mL × 5 mL = 1 mg/mL × 50 mL',
            '<strong>Percentuale Peso/Volume:</strong> % w/v = (grammi soluto / mL soluzione) × 100. Es: 1% = 10 mg/mL, 0.9% = 9 mg/mL',
            '<strong>Diluizione Seriale:</strong> C n = C 0 / (Ratio 1 × Ratio 2 × ... × Ratio n). Per preparazioni omeopatiche',
          ],
        },
        practicalExample: {
          title: 'Esempio Pratico:',
          scenario:
            'Preparare 50 mL morfina 1 mg/mL per infusione PCA. Stock disponibile: morfina 10 mg/mL',
          steps: [
            '<strong>Dose totale:</strong> 50 mL × 1 mg/mL = 50 mg di morfina necessari',
            '<strong>Volume prelievo:</strong> 50 mg / 10 mg/mL = 5 mL dalla fiala stock',
            '<strong>Solvente da aggiungere:</strong> 50 mL - 5 mL = 45 mL di SF 0.9%',
            '<strong>Verifica:</strong> 50 mg / 50 mL = 1 mg/mL. Rapporto diluizione: 1:10',
          ],
        },
      },
    },
    interpretation: {
      title: 'Interpretazione Risultati',
      content: {
        concentrationRanges: {
          title: 'Range Concentrazioni Sicure:',
          drugs: [
            '<strong>Morfina:</strong> 0.1-1 mg/mL (pediatria 0.1 mg/mL, adulti PCA 1 mg/mL, infusione continua 0.5 mg/mL)',
            '<strong>Vancomicina:</strong> 2-5 mg/mL (max 5 mg/mL periferico per evitare flebite). Infusione 500 mg in 100-250 mL',
            '<strong>Epinefrina:</strong> 1:1000 (1 mg/mL IM/SC), 1:10000 (0.1 mg/mL IV), 1:100000 (0.01 mg/mL infusione)',
            '<strong>Insulina:</strong> 1 UI/mL (standard adulti), 0.1 UI/mL (neonati). Stock 100 UI/mL diluito 1:100',
            '<strong>Potassio:</strong> Max 40 mEq/L periferico, 60-80 mEq/L centrale. Concentrazioni > 80 mEq/L causano aritmie',
            '<strong>Chemioterapici:</strong> Range specifici - Doxorubicina 2 mg/mL, Cisplatino 1 mg/mL, Carboplatino 10 mg/mL',
          ],
        },
        verificationChecks: {
          title: 'Checklist Verifica:',
          checks: [
            '<strong>Farmaco Corretto:</strong> Verificare nome farmaco, dosaggio ampolla, lotto, scadenza',
            '<strong>Calcolo Doppio:</strong> Due operatori indipendenti per farmaci ISMP high-alert',
            '<strong>Concentrazione Finale:</strong> Verificare range sicuro per via somministrazione (periferico/centrale)',
            '<strong>Compatibilità:</strong> Verificare solvente compatibile (SF 0.9%, G5%, acqua PPI)',
            '<strong>Etichetta:</strong> Nome, dose, volume, concentrazione, data/ora, operatore, scadenza',
            '<strong>Velocità Infusione:</strong> Calcolare mL/h o gocce/min. Verificare tempo infusione minimo',
          ],
        },
        clinicalGuidance: {
          title: 'Linee Guida Cliniche:',
          guidance: [
            '<strong>Pediatria:</strong> Concentrazioni ridotte per minimizzare errori dosaggio. Morfina neonati 0.05-0.1 mg/mL',
            '<strong>Farmaci High-Alert:</strong> Standard concentrations (eparina 100 units/mL, insulina 1 UI/mL)',
            '<strong>Volume Overload:</strong> Pazienti cardiopatici/nefropatici richiedono massima concentrazione possibile',
            '<strong>Infusione Continua:</strong> Diluizioni permettono titolazione precisa (norepinefrina 16 mcg/mL)',
          ],
        },
      },
    },
    applications: {
      title: 'Applicazioni Cliniche',
      content: {
        pediatrics: {
          title: 'Pediatria e Neonatologia:',
          considerations: [
            '<strong>Volumi Micro-Dosing:</strong> Neonati ricevono dosi 0.1-1 mL. Diluizioni 1:10 standard per misurabilità',
            '<strong>Osmolarità Pediatrica:</strong> Neonati sensibili iperosm. Diluizioni devono mantenere 280-320 mOsm/L',
            '<strong>Caffeina Citrato:</strong> Loading 20 mg/kg, maintenance 5-10 mg/kg QD. Stock 20 mg/mL, diluire 1:4 → 5 mg/mL',
            '<strong>Surfactante:</strong> Poractant alfa 1.5-2.5 mL/kg/dose intratracheale. NON diluire (concentrazione critica)',
            '<strong>Prostaglandina E1:</strong> 0.3 mg in 50 mL G5% = 6 mcg/mL. Dose 0.01-0.1 mcg/kg/min. Fotosensibile',
          ],
        },
        criticalCare: {
          title: 'Terapia Intensiva:',
          protocols: [
            '<strong>Vasopressori:</strong> Noradrenalina 4 mg in 250 mL G5% = 16 mcg/mL. Dose 0.05-3 mcg/kg/min. Accesso centrale',
            '<strong>Sedazione:</strong> Propofol 10 mg/mL NON diluire. Set dedicato cambio 12h. PRIS risk se > 4 mg/kg/h > 48h',
            '<strong>Trombolisi:</strong> Alteplase NO diluizione. STEMI: 15 mg bolo, 50 mg in 30 min, 35 mg in 60 min',
            '<strong>Antiaritmici:</strong> Amiodarone 150 mg in 100 mL G5% in 10 min, poi 360 mg in 6h, poi 540 mg in 18h',
            '<strong>Nutrizione Parenterale:</strong> 3-in-1 osmolarità 1200-1800 mOsm/L → SOLO centrale. Filtro 1.2 micron',
          ],
        },
        oncology: {
          title: 'Oncologia (Chemioterapia):',
          chemotherapy: [
            '<strong>Doxorubicina:</strong> Stock 2 mg/mL → 0.4 mg/mL periferico, 2 mg/mL centrale. Fotosensibile. Vesicante',
            '<strong>Cisplatino:</strong> 1 mg/mL → diluire in SF 0.9% solo. Dose 50-100 mg/m² in 1-3 L SF in 6-8h. Nefrotossico',
            '<strong>Carboplatino:</strong> 10 mg/mL → diluire in G5% o SF. Dose AUC-based (Calvert). Infusione 15-60 min',
            '<strong>Paclitaxel:</strong> 6 mg/mL → 0.3-1.2 mg/mL. Set non-PVC. Premedication (desametasone, antistaminici)',
          ],
        },
      },
    },
    alerts: {
      title: 'Alert Sicurezza',
      content: {
        highAlertMedications: {
          title: 'Farmaci ISMP High-Alert:',
          categories: [
            '<strong>Anticoagulanti:</strong> Eparina, EBPM (enoxaparina, dalteparina), warfarin. Diluizioni errate → emorragie/trombosi',
            '<strong>Insulina:</strong> Solo insulina regolare EV (diluita). Confusione UI/mL. Ipoglicemia severa < 40 mg/dL = convulsioni',
            '<strong>Oppioidi:</strong> Morfina, fentanyl, idromorfone. Depressione respiratoria. Fentanyl 100× morfina potenza',
            '<strong>Sedativi EV:</strong> Propofol, midazolam. PRIS se propofol > 4 mg/kg/h > 48h: acidosi, arresto cardiaco',
            '<strong>Elettroliti:</strong> KCl > 2 mEq/mL, NaCl > 0.9%, CaCl₂ 10%. MAI bolo diretto (arresto cardiaco)',
            '<strong>Chemioterapici:</strong> Tutti citotossici. Vesicanti (extravasazione = necrosi). Dosaggio mg/m² BSA',
            '<strong>Anestetici Locali:</strong> Bupivacaina, ropivacaina. Tossicità LAST: convulsioni, aritmie. Lipid rescue',
          ],
        },
        criticalConcentrations: {
          title: 'Concentrazioni Critiche:',
          limits: [
            '<strong>Potassio:</strong> Periferico MAX 40 mEq/L (10 mEq/h). Centrale MAX 60-80 mEq/L (20 mEq/h + ECG). > 80 mEq/L = arresto',
            '<strong>Calcio:</strong> CaCl₂ 10% diluire 1:10 → 10 mg/mL. MAI bolo rapido (bradicardia). Extravasazione = necrosi',
            '<strong>Magnesio:</strong> MgSO₄ 50% diluire 1:10 → 50 mg/mL. Eclampsia 4-6 g in 15-20 min. Tossicità: iporeflexia',
            '<strong>Bicarbonato:</strong> NaHCO₃ 8.4% diluire 1:2 pediatria. Iperosm (2000 mOsm/L). Incompatibile con catecolamine',
            '<strong>Glucosio:</strong> G50% diluire 1:4 → G10%. G50% solo centrale. Pediatria max G12.5% periferico',
          ],
        },
        incompatibilities: {
          title: 'Incompatibilità Maggiori:',
          combinations: [
            '<strong>Fenitoina + G5%:</strong> Precipita (pH 12 vs pH 4). Solo SF 0.9%. Max 50 mg/min (ipotensione)',
            '<strong>Ceftriaxone + Calcio:</strong> Precipitato fatale (neonati). MAI co-somministrare entro 48h',
            '<strong>Diazepam + PVC:</strong> Adsorbe 30-50%. Usare vetro o polipropilene. NON diluire',
            '<strong>Ampicillina + Aminoglicosidi:</strong> Inattivazione se miscelati. Somministrare separatamente',
            '<strong>Furosemide:</strong> Precipita pH < 7 con vitamina C, dobutamina, midazolam. Flush SF tra farmaci',
          ],
        },
        emergencyProtocols: {
          title: 'Protocolli Emergenza:',
          procedures: [
            '<strong>Sovradosaggio Oppioidi:</strong> Naloxone 0.4-2 mg EV Q2-3min. Diluire 0.4 mg in 10 mL = 0.04 mg/mL',
            '<strong>Extravasazione Vesicanti:</strong> STOP infusione. Aspirare residuo. Antidoti: doxorubicina → dexrazoxane',
            '<strong>Iperkaliemia:</strong> K+ > 6.5 mEq/L. Calcio gluconato 10% 10-20 mL EV. Poi insulina + glucosio',
            '<strong>Tossicità Anestetici:</strong> Lipid emulsion 20% 1.5 mL/kg bolo, poi 0.25 mL/kg/min. Max 12 mL/kg',
            '<strong>Contaminazione:</strong> STOP. Emocolture + coltura soluzione. Antibiotici broad-spectrum',
          ],
        },
      },
    },
    documentation: {
      title: 'Compatibilità e Stabilità',
      content: {
        compatibility: {
          title: 'Matrice Compatibilità Diluenti IV:',
          solvents: [
            '<strong>SF 0.9% (Soluzione Fisiologica):</strong> Diluente più usato. Compatibile con maggior parte farmaci IV (antibiotici, analgesici, antiemetici). Osmolarità 308 mOsm/L (isotonica). Incompatibile con: Amfotericina B (precipita), Diazepam (precipita), Emulsioni lipidiche',
            '<strong>G5% (Glucosio 5% in Acqua):</strong> Seconda scelta per farmaci incompatibili con NaCl. Osmolarità 252 mOsm/L (ipotonica ma accettabile). Compatibile con amfotericina B, fenitoina, chemioterapici. Incompatibile con: Emocomponenti, ertapenem, alcune cefalosporine',
            '<strong>Acqua Sterile per Preparazioni Iniettabili (API):</strong> SOLO per diluire concentrati o ricostituire polveri. Osmolarità 0 mOsm/L (ipotonica). MAI somministrare direttamente EV (emolisi). Deve essere ulteriormente diluita in SF o G5% per somministrazione IV',
            '<strong>Soluzione Ringer Lattato (RL):</strong> Contiene Na+ 130 mEq/L, K+ 4 mEq/L, Ca²⁺ 3 mEq/L, Cl⁻ 109 mEq/L, Lattato 28 mEq/L. Osmolarità 273 mOsm/L (isotonica). Usata per rianimazione volemica. Incompatibile con: Ceftriaxone (Ca²⁺ precipita), Amfotericina B, emocomponenti',
            '<strong>Acqua Batteriostatica (con alcol benzilico):</strong> Per flaconi multidose. MAI usare in neonati (alcol benzilico tossico: gasping syndrome). MAI per uso intratecale o epidurale',
          ],
        },
        stabilityData: {
          title: 'Tempi di Stabilità per Classe Farmacologica:',
          categories: [
            '<strong>24-48 ore (Refrigerato 2-8°C):</strong> Maggior parte antibiotici beta-lattamici diluiti (penicilline, cefalosporine eccetto ampicillina), aminoglicosidi (gentamicina, amikacina), fluorochinoloni (ciprofloxacina, levofloxacina), morfina in SF o G5%',
            '<strong>8-12 ore (Temperatura Ambiente 15-25°C):</strong> Glicopeptidi (vancomicina, teicoplanina), carbapenemi (meropenem, imipenem), metronidazolo, fluconazolo',
            '<strong>4-6 ore (Refrigerato):</strong> Ampicillina in qualsiasi diluente (anello beta-lattamico instabile), piperacillina-tazobactam dopo ricostituzione',
            '<strong>Uso Immediato (Usare entro 1 ora dalla preparazione):</strong> Chemioterapici senza stabilizzanti (ciclofosfamide, ifosfamide), farmaci fotosensibili (nitroprussiato - coprire con foglio, furosemide alte concentrazioni), rasburicase',
            '<strong>Conservazione Protetta dalla Luce:</strong> Nitroprussiato (coprire con foglio alluminio - degrada a cianuro con luce), epoprostenolo, dacarbazina, furosemide > 10 mg/mL',
          ],
        },
        labeling: {
          title: 'Requisiti Obbligatori Etichettatura:',
          requirements: [
            '<strong>Nome Farmaco (Generico e Commerciale):</strong> "Morfina Solfato" o "Morfina (Skenan)" - evitare abbreviazioni (MS = morfina o magnesio solfato?)',
            '<strong>Quantità Totale Farmaco:</strong> "100 mg" (quantità totale in intera siringa/sacca, NON per mL)',
            '<strong>Concentrazione Finale:</strong> "10 mg/mL" o "10 mg per 1 mL" (concentrazione)',
            '<strong>Volume Totale:</strong> "10 mL volume totale" (volume totale soluzione)',
            '<strong>Data e Ora Preparazione:</strong> "Preparato: 07/01/2025 14:30" (formato 24h preferibile)',
            '<strong>Data e Ora Scadenza:</strong> "Scade: 08/01/2025 14:30" (basato su dati stabilità - 24h per morfina in SF a 2-8°C)',
            '<strong>Identificazione Preparatore:</strong> "Preparato da: Iniziali GD" (per accountability e controllo qualità)',
            '<strong>Via di Somministrazione:</strong> "Solo per uso EV" (prevenire errori via somministrazione, critico per vincristina - fatale se intratecale)',
            '<strong>Condizioni Conservazione:</strong> "Conservare refrigerato 2-8°C" o "Conservare a temperatura ambiente" (basato su dati stabilità)',
          ],
        },
      },
    },
    references: {
      title: 'Riferimenti Scientifici',
      content: {
        guidelines: {
          title: 'Linee Guida Internazionali:',
          list: [
            '<strong>ISMP (Institute for Safe Medication Practices):</strong> Lista High-Alert Medications 2024. Identifica farmaci ad alto rischio di danno significativo. Include elettroliti concentrati, insulina, eparina, chemioterapici. Raccomanda doppio controllo indipendente per tutte le diluizioni',
            '<strong>ASHP Guidelines Compounding Sterile Preparations 2022:</strong> Standard tecnica asettica, qualità ambientale (classificazioni ISO), dating, formazione personale e valutazione competenze. Si applica a tutte preparazioni sterili incluse diluizioni',
            '<strong>USP 797 (United States Pharmacopeia):</strong> Standard legale USA per preparazioni sterili. Definisce livelli rischio (uso immediato, basso, medio, alto), controlli ambientali (ISO Classe 5/7/8), date scadenza, qualifiche personale. Aggiornato 2023',
            '<strong>USP 800:</strong> Gestione Farmaci Pericolosi in Ambito Sanitario. Standard per manipolazione sicura chemioterapici e altri farmaci pericolosi. Richiede cappe biologiche, DPI, gestione sversamenti, monitoraggio personale. Aggiornato 2023',
            '<strong>Micromedex Drug Information (IBM Watson Health):</strong> Database farmacologico completo con protocolli diluizione standard, tabelle compatibilità IV, dati stabilità per oltre 4500 farmaci. Usato da oltre 7000 ospedali nel mondo',
            '<strong>Lexicomp Drug Information (Wolters Kluwer):</strong> Database clinico farmaci con dosaggi pediatrici e adulti, protocolli diluizione, compatibilità IV. Si integra con cartelle cliniche elettroniche (EHR)',
          ],
        },
        research: {
          title: 'Pubblicazioni Scientifiche Chiave:',
          articles: [
            '<strong>ISMP Medication Safety Alert (Trimestrale):</strong> Case studies errori farmacologici, analisi causa radice, strategie prevenzione. Sottoscrizione gratuita su www.ismp.org/newsletters',
            '<strong>ASHP American Journal Health-System Pharmacy (Mensile):</strong> Articoli su stabilità miscele IV, compatibilità, tecniche preparazione. Database PMID disponibile. Impact factor 1.9',
            '<strong>Kaushal R et al 2001:</strong> Errori farmacologici in pediatria. JAMA 285(16):2114-2120. Errori diluizione/calcolo rappresentano 28% degli errori in pediatria. Raccomanda concentrazioni standardizzate e doppi controlli',
            '<strong>Poon EG et al 2010:</strong> Effetto tecnologia barcode su sicurezza somministrazione farmaci. N Engl J Med 362(18):1698-1707. Riduzione 41% errori farmacologici e 51% eventi avversi potenziali con barcode scanning',
            '<strong>Rinke ML et al 2014:</strong> Caratteristiche errori farmaci chemioterapici pediatrici. Cancer 120(18):2665-2673. Analisi 2212 errori chemioterapia: 18% coinvolgeva dose/concentrazione errata da errori diluizione',
          ],
        },
        onlineTools: {
          title: 'Strumenti Online e Risorse:',
          tools: [
            '<strong>MDCalc Medical Calculator:</strong> www.mdcalc.com - Calcolatori clinici gratuiti inclusi dosaggi farmaci IV, calcolatori velocità infusione, calcolatori farmacocinetici. Peer-reviewed, evidence-based',
            '<strong>ClinCalc Drug Dilution Calculator:</strong> clincalc.com/DrugDilution - Calcolatore interattivo per diluizioni farmaci con preset farmaci comuni, verifica concentrazione',
            '<strong>GlobalRPh Drug Dilution Calculator:</strong> globalrph.com/medcalcs/dilution-calculator - Multipli calcolatori diluizione inclusi diluizione seriale, diluizione semplice, alligazione',
            '<strong>King Guide Parenteral Admixtures:</strong> www.kingguide.com - Servizio sottoscrizione con oltre 13000 monografie farmaci IV, dati compatibilità, protocolli diluizione. Aggiornato trimestralmente',
            '<strong>Stabilis Database:</strong> www.stabilis.org - Francese/Inglese. Stabilità oltre 1800 preparazioni ospedaliere. Temperatura, luce, contenitore, tempo. Peer-reviewed. Accesso gratuito',
          ],
        },
      },
    },
  },
};
