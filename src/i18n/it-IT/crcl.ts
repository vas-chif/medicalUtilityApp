/**
 * @file it-IT/crcl.ts
 * @description Traduzioni italiane per Creatinine Clearance Calculator (Cockcroft-Gault)
 * @author Vasile Chifeac
 * @created 2025-12-13
 *
 * @references
 * - Cockcroft DW, Gault MH. (1976) "Prediction of creatinine clearance from serum creatinine"
 *   Nephron 16(1):31-41. PMID: 1244564
 * - Winter MA, et al. (2012) "Impact of various body weights and serum creatinine concentrations
 *   on the bias and accuracy of the Cockcroft-Gault equation" Ann Pharmacother 46(12):1621-1629. PMID: 23249725
 * - Verhave JC, et al. (2003) "The association between atherosclerotic risk factors and renal function
 *   in the general population" Kidney Int 64(5):1681-1687. PMID: 14531800
 */

export default {
  // 1. TITOLI PRINCIPALI
  title: 'Clearance Creatinina (CrCl)',
  subtitle: 'Calcolatore Cockcroft-Gault per Dosaggio Farmaci',

  // 2. INPUT PANEL (alias for template compatibility)
  inputPanel: {
    title: 'Parametri Paziente',
    description: 'Formula Cockcroft-Gault per dosaggio farmaci (non normalizzata per BSA)',
    creatinine: {
      label: 'Creatinina Sierica',
      unit: 'mg/dL',
      validation: 'Creatinina tra 0.1-20 mg/dL',
    },
    age: {
      label: 'Eta',
      unit: 'anni',
      validation: 'Eta tra 1-120 anni',
    },
    weight: {
      label: 'Peso Corporeo',
      unit: 'kg',
      validation: 'Peso tra 1-300 kg',
    },
    gender: {
      label: 'Sesso',
      validation: 'Selezionare il sesso',
      options: {
        male: 'Maschio',
        female: 'Femmina',
      },
    },
  },

  // 3. RESULTS PANEL (alias for template compatibility)
  resultsPanel: {
    title: 'Risultati',
    result: {
      unit: 'mL/min',
      label: 'CrCl',
      formula: 'Formula: Cockcroft-Gault',
    },
    clinicalUse: {
      title: 'Uso Clinico:',
      text: 'CrCl per dosaggio farmaci renalmente escreti. eGFR per staging CKD.',
    },
    interpretation: {
      title: 'Interpretazione Dosaggio Farmaci:',
    },
  },

  // 2. FORM INPUT (legacy)
  form: {
    sectionTitle: 'Parametri Paziente',
    sectionSubtitle: 'Formula Cockcroft-Gault per dosaggio farmaci (non normalizzata per BSA)',
    creatinineLabel: 'Creatinina Sierica',
    creatinineUnit: 'mg/dL',
    creatinineRule: 'Creatinina tra 0.1-20 mg/dL',
    ageLabel: 'Eta',
    ageUnit: 'anni',
    ageRule: 'Eta tra 1-120 anni',
    weightLabel: 'Peso Corporeo',
    weightUnit: 'kg',
    weightRule: 'Peso tra 1-300 kg',
    genderLabel: 'Sesso',
    genderRule: 'Selezionare il sesso',
    genderOptions: {
      male: 'Maschio',
      female: 'Femmina',
    },
  },

  // 3. BOTTONI AZIONI
  buttons: {
    calculate: 'Calcola CrCl',
    save: 'Salva Calcolo',
    reset: 'Reset Dati',
  },

  // 4. RISULTATI
  results: {
    title: 'Risultati',
    valueLabel: 'mL/min',
    subtitle: '(Creatinine Clearance)',
    formulaLabel: 'Formula: Cockcroft-Gault',
  },

  // 5. BANNER CLINICO
  clinicalBanner: {
    title: 'Uso Clinico:',
    text: 'CrCl per dosaggio farmaci renalmente escreti. eGFR per staging CKD.',
  },

  // 6. INTERPRETAZIONE RISULTATI
  interpretationRanges: {
    title: 'Interpretazione Dosaggio Farmaci:',
    ranges: {
      normal: 'Funzione Normale',
      mildReduction: 'Lieve Riduzione',
      moderateReduction: 'Riduzione Moderata',
      moderateSevereReduction: 'Riduzione Moderata-Severa',
      severeReduction: 'Riduzione Severa',
      renalFailure: 'Insufficienza Renale',
    },
    clinicalNotes: {
      normal: 'Clearance normale. Dosaggio farmaci standard (verificare schede tecniche).',
      mildReduction:
        'Lieve riduzione clearance. Alcuni farmaci richiedono aggiustamento (aminoglicosidi, vancomicina). Monitorare livelli terapeutici.',
      moderateReduction:
        'Riduzione moderata. Ridurre dose o prolungare intervalli per farmaci nefrotossici. Valutazione farmacologica necessaria.',
      moderateSevereReduction:
        'Riduzione moderata-severa. Aggiustamento significativo dosaggi (50-75% dose standard). Evitare FANS e contrasti iodati.',
      severeReduction:
        'Riduzione severa. Riduzione drastica dosaggi (25-50%). Molti farmaci controindicati. Consulenza nefrologica obbligatoria.',
      renalFailure:
        'Insufficienza renale terminale. Dialisi-dipendente. Dosaggi basati su timing dialisi. Farmaci eliminati con dialisi richiedono dose supplementare post-trattamento.',
    },
  },

  // 7. SEZIONI ESPANDIBILI (9 SEZIONI MEDICHE COMPLETE)
  sections: {
    // SEZIONE 1: Definizione
    definition: {
      title: 'Definizione e Significato Clinico',
      content: {
        definitionLabel: 'Definizione:',
        definition:
          'La Creatinine Clearance (CrCl) rappresenta il volume di plasma completamente depurato dalla creatinina per unita di tempo, espresso in mL/min. E una stima della filtrazione glomerulare utilizzata principalmente per il dosaggio dei farmaci.',
        differenceLabel: 'Differenza tra CrCl e eGFR:',
        differences: [
          '<strong>CrCl (Cockcroft-Gault):</strong> NON normalizzata per BSA (1.73m2), dipende dal peso corporeo -> usata per dosaggio farmaci',
          '<strong>eGFR (MDRD/CKD-EPI):</strong> Normalizzata per BSA -> usata per staging CKD',
        ],
        note: {
          title: 'Nota Clinica:',
          text: 'La maggior parte dei farmaci ha linee guida di dosaggio basate su CrCl (Cockcroft-Gault), non su eGFR. Usare CrCl per aggiustamenti farmaci.',
        },
      },
    },

    // SEZIONE 2: Fisiologia
    physiology: {
      title: 'Fisiologia della Clearance Renale',
      content: {
        mechanismTitle: 'Meccanismo Clearance:',
        mechanismIntro: 'La clearance renale di una sostanza e determinata da tre processi:',
        mechanisms: [
          '<strong>Filtrazione Glomerulare:</strong> Creatinina filtrata liberamente attraverso glomeruli (~90% della clearance)',
          '<strong>Secrezione Tubulare:</strong> ~10% creatinina secreta attivamente nel tubulo prossimale (carrier organici OCT2)',
          '<strong>Riassorbimento:</strong> Creatinina NON viene riassorbita (a differenza di urea)',
        ],
        equationLabel: 'Equazione Clearance:',
        equation: 'C = (U x V) / P',
        equationParams: [
          'U = Concentrazione urinaria creatinina (mg/dL)',
          'V = Volume urinario per minuto (mL/min)',
          'P = Concentrazione plasmatica creatinina (mg/dL)',
        ],
        note: {
          title: 'Fisiologia:',
          text: 'La secrezione tubulare di creatinina causa sovrastima del GFR di ~10-20% con misurazione CrCl urinaria 24h. Cockcroft-Gault corregge questa discrepanza usando equazione empirica.',
        },
      },
    },

    // SEZIONE 3: Calcolo (alias for template compatibility)
    calculation: {
      title: 'Come si Calcola CrCl',
      content: {
        methodsTitle: 'Metodi di Calcolo:',
        methods: [
          '<strong>Raccolta Urine 24h (Gold Standard):</strong> C = (U x V) / P - Accurato ma errori frequenti raccolta (incompleta, timing scorretto)',
          '<strong>Cockcroft-Gault (Clinico):</strong> Stima CrCl da creatinina sierica, eta, peso, sesso - Metodo standard per dosaggio farmaci',
        ],
        whenToUseTitle: 'Quando Usare Cockcroft-Gault:',
        whenToUse: [
          'Aggiustamento dose farmaci renalmente escreti',
          'Pazienti anziani (>65 anni) - piu accurata di eGFR',
          'Pazienti obesi (usare peso corporeo ideale o aggiustato)',
          'Pazienti con massa muscolare ridotta (sarcopenia, amputazioni)',
        ],
        bestPractice: {
          title: 'Best Practice:',
          text: 'Per pazienti obesi (BMI >30), usare peso ideale o aggiustato: ABW = IBW + 0.4 x (Peso Attuale - IBW).',
        },
      },
    },

    // SEZIONE 3: Valutazione (legacy)
    evaluation: {
      title: 'Come si Calcola CrCl',
      content: {
        methods: {
          title: 'Metodi di Calcolo:',
          items: [
            '<strong>Raccolta Urine 24h (Gold Standard):</strong> C = (U x V) / P - Accurato ma errori frequenti raccolta (incompleta, timing scorretto)',
            '<strong>Cockcroft-Gault (Clinico):</strong> Stima CrCl da creatinina sierica, eta, peso, sesso - Metodo standard per dosaggio farmaci',
          ],
        },
        whenToUse: {
          title: 'Quando Usare Cockcroft-Gault:',
          items: [
            'Aggiustamento dose farmaci renalmente escreti',
            'Pazienti anziani (>65 anni) - piu accurata di eGFR',
            'Pazienti obesi (usare peso corporeo ideale o aggiustato)',
            'Pazienti con massa muscolare ridotta (sarcopenia, amputazioni)',
          ],
        },
        bestPractice: {
          title: 'Best Practice:',
          text: 'Per pazienti obesi (BMI >30), usare peso ideale o aggiustato: ABW = IBW + 0.4 x (Peso Attuale - IBW).',
        },
      },
    },

    // SEZIONE 4: Formula
    formula: {
      title: 'Formula Cockcroft-Gault',
      content: {
        classicTitle: 'Formula Classica (1976):',
        formulaText:
          'CrCl (mL/min) = [(140 - Eta) x Peso (kg) x (0.85 se femmina)] / (72 x Creatinina sierica mg/dL)',
        parameters: [
          '<strong>140 - Eta:</strong> Riflette declino funzione renale con invecchiamento (~1 mL/min/anno dopo 40 anni)',
          '<strong>Peso (kg):</strong> Massa muscolare correlata a produzione creatinina (NON normalizzato per BSA)',
          '<strong>0.85 (femmina):</strong> Donne hanno ~15% meno massa muscolare a parita di peso',
          '<strong>72:</strong> Costante empirica derivata da studi originali (conversione unita + fattori fisiologici)',
        ],
      },
      limitations: {
        title: 'Limitazioni Formula:',
        items: [
          '<strong>Obesita:</strong> Sovrastima CrCl (peso != massa muscolare). Usare peso ideale/aggiustato',
          '<strong>Sarcopenia:</strong> Sottostima CrCl in anziani con ridotta massa muscolare',
          '<strong>Estremi peso:</strong> Inaffidabile se peso &lt;40 kg o &gt;120 kg',
          '<strong>Creatinina variabile:</strong> Influenzata da dieta, farmaci (cimetidina, trimetoprim bloccano secrezione tubulare)',
        ],
      },
      recommendation: {
        title: 'Raccomandazione:',
        text: 'Cockcroft-Gault rimane standard FDA/EMA per dosaggio farmaci, nonostante limitazioni. Equazioni piu recenti (CKD-EPI) non validate per farmacocinetica.',
      },
    },

    // SEZIONE 5: Interpretazione (alias for template)
    interpretation: {
      title: 'Interpretazione Risultati',
      content: {
        classificationTitle: 'Classificazione Funzione Renale per Dosaggio Farmaci:',
        classification: [
          '<strong class="text-green">>=90 mL/min:</strong> Normale - Dosaggio standard',
          '<strong class="text-light-green">60-89 mL/min:</strong> Lieve riduzione - Alcuni farmaci richiedono aggiustamento',
          '<strong class="text-orange">45-59 mL/min:</strong> Moderata - Aggiustamento necessario per farmaci nefrotossici',
          '<strong class="text-deep-orange">30-44 mL/min:</strong> Moderata-severa - Aggiustamento 50-75% dosaggio',
          '<strong class="text-red">15-29 mL/min:</strong> Severa - Riduzione drastica 25-50%, molti farmaci controindicati',
          '<strong class="text-purple">&lt;15 mL/min:</strong> ESRD - Dosaggio basato su dialisi',
        ],
        criticalDrugsTitle: 'Farmaci Critici da Aggiustare:',
        criticalDrugs: [
          '<strong>Antibiotici:</strong> Aminoglicosidi, vancomicina, penicilline, fluoroquinoloni',
          '<strong>Anticoagulanti:</strong> Enoxaparina (?dose 50% se CrCl &lt;30), dabigatran controindicato',
          '<strong>Ipoglicemizzanti:</strong> Metformina (evitare se CrCl &lt;30), gliburide (?rischio ipoglicemia)',
          '<strong>Altri:</strong> Digoxina, litio, allopurinolo, metotrexato',
        ],
      },
    },

    // SEZIONE 5: Interpretazione Clinica (legacy)
    clinicalInterpretation: {
      title: 'Interpretazione Risultati',
      content: {
        classification: {
          title: 'Classificazione Funzione Renale per Dosaggio Farmaci:',
          ranges: [
            '<strong class="text-green">>=90 mL/min:</strong> Normale - Dosaggio standard',
            '<strong class="text-light-green">60-89 mL/min:</strong> Lieve riduzione - Alcuni farmaci richiedono aggiustamento',
            '<strong class="text-orange">45-59 mL/min:</strong> Moderata - Aggiustamento necessario per farmaci nefrotossici',
            '<strong class="text-deep-orange">30-44 mL/min:</strong> Moderata-severa - Aggiustamento 50-75% dosaggio',
            '<strong class="text-red">15-29 mL/min:</strong> Severa - Riduzione drastica 25-50%, molti farmaci controindicati',
            '<strong class="text-purple">&lt;15 mL/min:</strong> ESRD - Dosaggio basato su dialisi',
          ],
        },
        criticalDrugs: {
          title: 'Farmaci Critici da Aggiustare:',
          categories: [
            '<strong>Antibiotici:</strong> Aminoglicosidi, vancomicina, penicilline, fluoroquinoloni',
            '<strong>Anticoagulanti:</strong> Enoxaparina (?dose 50% se CrCl &lt;30), dabigatran controindicato',
            '<strong>Ipoglicemizzanti:</strong> Metformina (evitare se CrCl &lt;30), gliburide (?rischio ipoglicemia)',
            '<strong>Altri:</strong> Digoxina, litio, allopurinolo, metotrexato',
          ],
        },
      },
    },

    // SEZIONE 6: Applicazioni (alias for template)
    applications: {
      title: 'Applicazioni Cliniche',
      content: {
        primaryUseTitle: 'Uso Primario - Dosaggio Farmaci:',
        primaryUse: [
          '<strong>Schede Tecniche Farmaci:</strong> Dosaggi basati su CrCl (Cockcroft-Gault), NON eGFR',
          '<strong>Software Dose Calculator:</strong> Lexicomp, Micromedex usano CrCl per calcoli',
          '<strong>Studi Clinici:</strong> Maggior parte trial farmaci usa Cockcroft-Gault per inclusione/esclusione',
        ],
        specialPopulationsTitle: 'Popolazioni Speciali:',
        specialPopulations: [
          '<strong>Anziani (&gt;75 anni):</strong> CrCl puo essere normale nonostante ?GFR reale (?massa muscolare). Usare cautela.',
          '<strong>Obesi:</strong> Usare peso corporeo aggiustato (ABW) per evitare sovrastima',
          '<strong>Chemioterapia:</strong> Carboplatin dose = AUC x (GFR + 25) - Calvert formula usa eGFR, non CrCl',
        ],
      },
    },

    // SEZIONE 6: Applicazioni Cliniche (legacy)
    clinicalApplications: {
      title: 'Applicazioni Cliniche',
      content: {
        primaryUse: {
          title: 'Uso Primario - Dosaggio Farmaci:',
          applications: [
            '<strong>Schede Tecniche Farmaci:</strong> Dosaggi basati su CrCl (Cockcroft-Gault), NON eGFR',
            '<strong>Software Dose Calculator:</strong> Lexicomp, Micromedex usano CrCl per calcoli',
            '<strong>Studi Clinici:</strong> Maggior parte trial farmaci usa Cockcroft-Gault per inclusione/esclusione',
          ],
        },
        specialPopulations: {
          title: 'Popolazioni Speciali:',
          populations: [
            '<strong>Anziani (&gt;75 anni):</strong> CrCl puo essere normale nonostante ?GFR reale (?massa muscolare). Usare cautela.',
            '<strong>Obesi:</strong> Usare peso corporeo aggiustato (ABW) per evitare sovrastima',
            '<strong>Chemioterapia:</strong> Carboplatin dose = AUC x (GFR + 25) - Calvert formula usa eGFR, non CrCl',
          ],
        },
      },
    },

    // SEZIONE 7: Reference Values (alias for template)
    referenceValues: {
      title: 'Valori Critici e Alert',
      content: {
        criticalValuesTitle: 'Valori Critici per Farmaci:',
        criticalValues: [
          '<strong class="text-red">CrCl &lt;30 mL/min:</strong> Evitare FANS, metformina, nitrofurantoina. ?dose enoxaparina 50%.',
          '<strong class="text-red">CrCl &lt;15 mL/min:</strong> Evitare contrasti iodati (rischio AKI). Molti antibiotici controindicati.',
          '<strong class="text-orange">CrCl 30-50 mL/min:</strong> ?dose 50% per aminoglicosidi, fluoroquinoloni. Monitorare TDM.',
        ],
        highRiskDrugsTitle: 'Farmaci ad Alto Rischio:',
        highRiskDrugs: [
          '<strong>Aminoglicosidi (gentamicina, tobramicina):</strong> Nefrotossici + ototossici. TDM obbligatorio.',
          '<strong>Vancomicina:</strong> Livelli trough 15-20 ug/mL (severa infezione). Monitorare creatinina ogni 2-3 giorni.',
          '<strong>Litio:</strong> Range terapeutico stretto (0.6-1.2 mEq/L). Tossicita se CrCl ?improvviso.',
        ],
        clinicalAlert: {
          title: 'ALERT CLINICO:',
          text: 'Se CrCl &lt;30 mL/min e paziente assume metformina, SOSPENDERE IMMEDIATAMENTE (rischio acidosi lattica fatale).',
        },
      },
    },

    // SEZIONE 8: Documentazione (alias for template)
    documentation: {
      title: 'Documentazione Clinica',
      content: {
        templateTitle: 'Template Documentazione Farmacologica:',
        templateExample: `<strong>CrCl (Cockcroft-Gault):</strong> [valore] mL/min<br/>
<strong>Parametri:</strong> Eta [X] anni, Peso [Y] kg, Sesso [M/F], Creatinina [Z] mg/dL<br/>
<strong>Interpretazione:</strong> [Normale/Lieve/Moderata/Severa riduzione]<br/>
<strong>Aggiustamenti Farmaci:</strong>
<ul>
  <li>[Farmaco]: [Dose aggiustata] (da [dose standard] -> [nuova dose])</li>
  <li>[Farmaco sospeso]: Controindicato con CrCl &lt;[soglia]</li>
</ul>`,
        elementsTitle: 'Elementi da Documentare:',
        elements: [
          'Peso usato per calcolo (attuale/ideale/aggiustato)',
          'Data calcolo CrCl',
          'Farmaci aggiustati o sospesi',
          'Prossima rivalutazione creatinina (1-7 giorni dipendente da stabilita)',
        ],
      },
    },

    // SEZIONE 9: Bibliografia (alias for template)
    bibliography: {
      title: 'Riferimenti Scientifici',
      content: {
        publicationsTitle: 'Pubblicazioni Fondamentali:',
        publications: [
          '<strong>Cockcroft DW, Gault MH.</strong> (1976). Prediction of creatinine clearance from serum creatinine. <em>Nephron</em> 16(1):31-41',
          '<strong>Winter MA, et al.</strong> (2012). Impact of various body weights and serum creatinine concentrations on the bias and accuracy of the Cockcroft-Gault equation. <em>Ann Pharmacother</em> 46(12):1621-1629',
          '<strong>Verhave JC, et al.</strong> (2003). The association between atherosclerotic risk factors and renal function in the general population. <em>Kidney Int</em> 64(5):1681-1687',
        ],
        guidelinesTitle: 'Linee Guida Dosaggio:',
        guidelines: [
          '<strong>FDA:</strong> Guidance for Industry - Pharmacokinetics in Patients with Impaired Renal Function',
          '<strong>EMA:</strong> Guideline on the evaluation of the pharmacokinetics of medicinal products in patients with decreased renal function',
          '<strong>KDIGO:</strong> Clinical Practice Guideline on Acute Kidney Injury (2012)',
        ],
        onlineResources: {
          title: 'Risorse Online:',
          fdaLink: 'FDA Guidance',
          emaLink: 'EMA Guideline',
        },
      },
    },
  }, // end sections

  // LEGACY STRUCTURES (for backward compatibility)

  // SEZIONE 7: Valori di Riferimento e Alert (legacy)
  referenceValuesLegacy: {
    title: 'Valori Critici e Alert',
    content: {
      criticalValues: {
        title: 'Valori Critici per Farmaci:',
        alerts: [
          '<strong class="text-red">CrCl &lt;30 mL/min:</strong> Evitare FANS, metformina, nitrofurantoina. ?dose enoxaparina 50%.',
          '<strong class="text-red">CrCl &lt;15 mL/min:</strong> Evitare contrasti iodati (rischio AKI). Molti antibiotici controindicati.',
          '<strong class="text-orange">CrCl 30-50 mL/min:</strong> ?dose 50% per aminoglicosidi, fluoroquinoloni. Monitorare TDM.',
        ],
      },
      highRiskDrugs: {
        title: 'Farmaci ad Alto Rischio:',
        drugs: [
          '<strong>Aminoglicosidi (gentamicina, tobramicina):</strong> Nefrotossici + ototossici. TDM obbligatorio.',
          '<strong>Vancomicina:</strong> Livelli trough 15-20 ug/mL (severa infezione). Monitorare creatinina ogni 2-3 giorni.',
          '<strong>Litio:</strong> Range terapeutico stretto (0.6-1.2 mEq/L). Tossicita se CrCl ?improvviso.',
        ],
      },
      clinicalAlert: {
        title: 'ALERT CLINICO:',
        text: 'Se CrCl &lt;30 mL/min e paziente assume metformina, SOSPENDERE IMMEDIATAMENTE (rischio acidosi lattica fatale).',
      },
    },
  },

  // SEZIONE 8: Documentazione (legacy)
  documentationLegacy: {
    title: 'Documentazione Clinica',
    content: {
      template: {
        title: 'Template Documentazione Farmacologica:',
        example: `<strong>CrCl (Cockcroft-Gault):</strong> [valore] mL/min<br/>
<strong>Parametri:</strong> Eta [X] anni, Peso [Y] kg, Sesso [M/F], Creatinina [Z] mg/dL<br/>
<strong>Interpretazione:</strong> [Normale/Lieve/Moderata/Severa riduzione]<br/>
<strong>Aggiustamenti Farmaci:</strong>
<ul>
  <li>[Farmaco]: [Dose aggiustata] (da [dose standard] -> [nuova dose])</li>
  <li>[Farmaco sospeso]: Controindicato con CrCl &lt;[soglia]</li>
</ul>`,
      },
      elementsToDocument: {
        title: 'Elementi da Documentare:',
        items: [
          'Peso usato per calcolo (attuale/ideale/aggiustato)',
          'Data calcolo CrCl',
          'Farmaci aggiustati o sospesi',
          'Prossima rivalutazione creatinina (1-7 giorni dipendente da stabilita)',
        ],
      },
    },
  },

  // SEZIONE 9: Bibliografia (legacy)
  bibliographyLegacy: {
    title: 'Riferimenti Scientifici',
    content: {
      keyPublications: {
        title: 'Pubblicazioni Fondamentali:',
        references: [
          '<strong>Cockcroft DW, Gault MH.</strong> (1976). Prediction of creatinine clearance from serum creatinine. <em>Nephron</em> 16(1):31-41',
          '<strong>Winter MA, et al.</strong> (2012). Impact of various body weights and serum creatinine concentrations on the bias and accuracy of the Cockcroft-Gault equation. <em>Ann Pharmacother</em> 46(12):1621-1629',
          '<strong>Verhave JC, et al.</strong> (2003). The association between atherosclerotic risk factors and renal function in the general population. <em>Kidney Int</em> 64(5):1681-1687',
        ],
      },
      guidelines: {
        title: 'Linee Guida Dosaggio:',
        items: [
          '<strong>FDA:</strong> Guidance for Industry - Pharmacokinetics in Patients with Impaired Renal Function',
          '<strong>EMA:</strong> Guideline on the evaluation of the pharmacokinetics of medicinal products in patients with decreased renal function',
          '<strong>KDIGO:</strong> Clinical Practice Guideline on Acute Kidney Injury (2012)',
        ],
      },
      onlineResources: {
        title: 'Risorse Online:',
        fdaLink: 'FDA Guidance',
        emaLink: 'EMA Guideline',
      },
    },
  }, // end sections

  // 8. DISCLAIMER
  disclaimer: {
    title: 'Disclaimer Clinico:',
    text: 'Questo calcolatore fornisce stime. Verificare sempre schede tecniche farmaci e consultare farmacista/nefrologo per decisioni cliniche.',
  },
};
