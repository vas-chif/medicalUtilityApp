/**
 * @file it-IT/fluidBalance.ts
 * @description Traduzioni italiane per Fluid Balance Calculator (24h)
 * @author Vasile Chifeac
 * @created 2025-12-16
 *
 * @references
 * - Bouchard J, et al. (2009) "Fluid accumulation, survival and recovery of kidney function in critically ill patients with acute kidney injury"
 *   Crit Care Med 37(6):1921-1928. PMID: 19384206
 * - Malbrain ML, et al. (2014) "Fluid overload, de-resuscitation, and outcomes in critically ill or injured patients"
 *   Intensive Care Med 40(12):1849-1867. PMID: 25190178
 */

export default {
  // 1. TITOLI PRINCIPALI
  title: 'Bilancio Idrico 24h',
  subtitle: 'Monitoraggio Entrate/Uscite per Stato Volemico',

  // 2. PANNELLO INPUT
  inputPanel: {
    title: '💧 Bilancio Idrico (24h)',
    intakeTitle: '➕ ENTRATE (Inputs)',
    outputTitle: '➖ USCITE (Outputs)',
    intake: {
      oral: {
        label: 'Liquidi Orali (bevande)',
        unit: 'mL',
      },
      food: {
        label: 'Acqua da Cibo',
        unit: 'mL',
      },
      iv: {
        label: 'Infusioni IV',
        unit: 'mL',
      },
      total: 'Totale Entrate',
    },
    output: {
      urine: {
        label: 'Diuresi',
        unit: 'mL',
      },
      stool: {
        label: 'Feci',
        unit: 'mL',
      },
      insensible: {
        label: 'Perspiratio Insensibilis (stima 500-800 mL)',
        unit: 'mL',
        hint: 'Perdite respiratorie + cutanee',
      },
      total: 'Totale Uscite',
    },
  },

  // 3. PULSANTI
  buttons: {
    calculate: 'Calcola Bilancio',
    reset: 'Reset Dati',
  },

  // 4. PANNELLO RISULTATI
  resultsPanel: {
    title: '📊 Risultati Bilancio',
    balance: {
      label: 'mL',
      subtitle: '(Bilancio Netto 24h)',
      formula: 'Entrate - Uscite',
    },
    volumeStatus: {
      title: '💧 Stato Volemico:',
    },
    visualization: {
      title: '📊 Visualizzazione Bilancio:',
    },
  },

  // 5. INTERPRETAZIONE
  interpretation: {
    euvolemic: 'Euvolemico (Bilancio Neutro)',
    mildOverload: 'Lieve Sovraccarico Volemico',
    significantOverload: 'Sovraccarico Volemico Significativo',
    mildDepletion: 'Lieve Deplezione Volemico-Idrica',
    significantDepletion: 'Deplezione Volemico-Idrica Significativa',
  },

  // 6. NOTE CLINICHE
  clinicalNotes: {
    euvolemic:
      'Bilancio idrico ottimale. Stato euvolemico mantenuto. Continuare monitoraggio giornaliero.',
    mildOverload:
      'Lieve bilancio positivo. Monitorare segni di sovraccarico (edema, dispnea). Considerare restrizione fluidi se CKD/scompenso.',
    significantOverload:
      'Sovraccarico volemico. RISCHIO EDEMA POLMONARE. Restrizione fluidi <1000 mL/die + diuretici (furosemide 40-80 mg IV). Peso giornaliero. Target perdita 0.5-1 kg/die.',
    mildDepletion:
      'Lieve deplezione. Valutare cause (diuretici, febbre, vomito, diarrea). Reintegro fluidi orali/IV se persistente.',
    significantDepletion:
      'Deplezione significativa. RISCHIO AKI PRE-RENALE. Reintegro urgente fluidi IV (cristalloidi 500-1000 mL/h fino a euvolemia). Monitorare diuresi, pressione arteriosa, elettroliti.',
  },

  // 7. SEZIONI DOCUMENTAZIONE
  sections: {
    // SEZIONE 1: Definizione
    definition: {
      title: 'Definizione e Significato Clinico',
      content: {
        definitionLabel: 'Definizione:',
        definition:
          'Il bilancio idrico rappresenta la differenza tra entrate (intake) e uscite (output) di fluidi nelle 24 ore. È fondamentale per valutare lo stato volemico del paziente.',
        interpretationLabel: 'Interpretazione:',
        interpretation: [
          '<strong>Bilancio Positivo (+):</strong> Entrate > Uscite → Sovraccarico volemico, edema, rischio insufficienza cardiaca/edema polmonare',
          '<strong>Bilancio Negativo (-):</strong> Entrate &lt; Uscite → Deplezione volemica, disidratazione, rischio AKI pre-renale',
          '<strong>Bilancio Neutro (±500 mL):</strong> Euvolemia - stato ottimale',
        ],
        note: {
          title: 'Nota Clinica:',
          text: 'Il bilancio idrico è critico in ICU, CKD, scompenso cardiaco, sepsi, post-operatorio. Monitoraggio giornaliero obbligatorio.',
        },
      },
    },

    // SEZIONE 2: Fisiologia
    physiology: {
      title: 'Fisiologia del Bilancio Idrico',
      content: {
        distributionTitle: 'Distribuzione Acqua Corporea:',
        distribution: [
          '<strong>Totale Acqua Corporea:</strong> ~60% peso corporeo uomo, ~50% donna (↓grasso ha meno acqua)',
          '<strong>Liquido Intracellulare (ICF):</strong> ~40% peso corporeo',
          '<strong>Liquido Extracellulare (ECF):</strong> ~20% peso corporeo (plasma 5% + interstizio 15%)',
        ],
        regulationTitle: 'Regolazione Bilancio:',
        regulation: [
          '<strong>ADH (Ormone Antidiuretico):</strong> ↑riassorbimento acqua tubulo collettore (ritenzione acqua)',
          '<strong>Sistema Renina-Angiotensina-Aldosterone (RAAS):</strong> ↑riassorbimento Na+ (acqua segue Na+)',
          '<strong>Peptidi Natriuretici (ANP, BNP):</strong> ↑escrezione Na+ e acqua (diuresi)',
        ],
      },
    },

    // SEZIONE 3: Misurazione
    measurement: {
      title: 'Come si Misura',
      content: {
        intakeTitle: 'Entrate (Inputs):',
        intake: [
          '<strong>Liquidi Orali:</strong> Acqua, succhi, tè, caffè, latte',
          '<strong>Acqua da Cibo:</strong> ~700-1000 mL/die (frutta, verdura, zuppe)',
          '<strong>Infusioni IV:</strong> Soluzione fisiologica, Ringer lattato, nutrizione parenterale',
          '<strong>Acqua Metabolica:</strong> ~300 mL/die (ossidazione carboidrati → CO2 + H2O)',
        ],
        outputTitle: 'Uscite (Outputs):',
        output: [
          '<strong>Diuresi:</strong> ~1200-1500 mL/die (misurazione catetere vescicale o contenitore graduato)',
          '<strong>Feci:</strong> ~100-200 mL/die (normale), >500 mL/die (diarrea)',
          '<strong>Perspiratio Insensibilis:</strong> ~500-800 mL/die (respirazione 300-400 mL + sudore 200-400 mL)',
          '<strong>Febbre:</strong> +13% uscite per ogni °C >37°C (38°C → +13%, 39°C → +26%)',
          '<strong>Drenaggi:</strong> Chirurgici, toracici, addominali (misurare mL/die)',
          '<strong>Vomito/Aspirazione NG:</strong> Quantificare volume',
        ],
        note: {
          title: 'Accuratezza Misurazione:',
          text: 'ICU: bilancio orario con catetere vescicale. Reparto: bilancio 24h con contenitori graduati. Errore ±10% accettabile.',
        },
      },
    },

    // SEZIONE 4: Formula
    formula: {
      title: 'Formula di Calcolo',
      content: {
        mainFormulaLabel: 'Formula Bilancio Idrico:',
        mainFormula:
          '<strong>Bilancio Idrico 24h (mL) = Totale Entrate - Totale Uscite</strong><br/><br/><strong>Entrate:</strong> Liquidi orali + Acqua da cibo + Infusioni IV + Acqua metabolica<br/><strong>Uscite:</strong> Diuresi + Feci + Perspiratio insensibilis + Drenaggi + Vomito',
        exampleTitle: 'Esempio Pratico:',
        example:
          '<strong>Entrate:</strong> 1000 mL orali + 700 mL cibo + 1500 mL IV = 3200 mL<br/><strong>Uscite:</strong> 1500 mL urine + 100 mL feci + 600 mL perspiratio = 2200 mL<br/><strong>Bilancio:</strong> 3200 - 2200 = +1000 mL (lieve sovraccarico)',
      },
    },

    // SEZIONE 5: Interpretazione
    clinicalInterpretation: {
      title: 'Interpretazione Risultati',
      content: {
        euvolemicTitle: 'Bilancio Neutro (±500 mL):',
        euvolemic:
          '<strong>Significato:</strong> Stato euvolemico ottimale. Entrate = Uscite.<br/><strong>Gestione:</strong> Monitoraggio giornaliero, dieta/fluidi liberi (se no controindicazioni).',
        mildOverloadTitle: 'Lieve Sovraccarico (+500 a +1000 mL):',
        mildOverload:
          '<strong>Significato:</strong> Ritenzione idrica iniziale. Rischio edema periferico.<br/><strong>Gestione:</strong> Restrizione fluidi 1500-2000 mL/die, restrizione Na+ <2 g/die, diuretici se indicato (furosemide 20-40 mg/die).',
        significantOverloadTitle: 'Sovraccarico Significativo (>1000 mL):',
        significantOverload:
          '<strong>Significato:</strong> Sovraccarico volemico grave. Rischio edema polmonare acuto, scompenso cardiaco.<br/><strong>Gestione URGENTE:</strong> Restrizione fluidi <1000 mL/die, diuretici IV ad alte dosi (furosemide 40-80 mg IV bid/tid), monitoraggio peso giornaliero (target -0.5 a -1 kg/die), valutare dialisi se refrattario.',
        mildDepletionTitle: 'Lieve Deplezione (-500 a -1000 mL):',
        mildDepletion:
          '<strong>Significato:</strong> Bilancio negativo iniziale. Rischio disidratazione lieve.<br/><strong>Gestione:</strong> Identificare causa (diuretici eccessivi, febbre, diarrea, vomito), reintegro fluidi orali 2000-2500 mL/die o IV se necessario.',
        significantDepletionTitle: 'Deplezione Significativa (<-1000 mL):',
        significantDepletion:
          '<strong>Significato:</strong> Deplezione volemica severa. Rischio AKI pre-renale, shock ipovolemico.<br/><strong>Gestione URGENTE:</strong> Reintegro fluidi IV urgente (cristalloidi 500-1000 mL/h fino a euvolemia), monitorare diuresi oraria (target >0.5 mL/kg/h), monitorare PA, FC, CVP, lattati, elettroliti. Considerare vasopressori se shock.',
      },
    },

    // SEZIONE 6: Applicazioni
    applications: {
      title: 'Applicazioni Cliniche',
      content: {
        icuTitle: 'ICU/Terapia Intensiva:',
        icu: 'Bilancio orario obbligatorio. Target euvolemia entro 48-72h. Fluid overload >10% peso basale associato a ↑mortalità (Bouchard 2009). Sepsi: fluid resuscitation 30 mL/kg cristalloidi entro 3h, poi restrizione fluidi (de-resuscitation).',
        ckdTitle: 'Insufficienza Renale Cronica (CKD):',
        ckd: 'CKD stadio 4-5: restrizione fluidi 1000-1500 mL/die + Na+ <2 g/die. Dialisi: limita fluidi per mantenere peso secco (dry weight). Sovraccarico interdialisi >3% peso secco → ↑rischio edema polmonare.',
        heartFailureTitle: 'Scompenso Cardiaco:',
        heartFailure:
          'Classe NYHA III-IV: restrizione fluidi <1500 mL/die. Peso giornaliero obbligatorio. Aumento >2 kg in 3 giorni → riacutizzazione, aumentare diuretici. BNP/NT-proBNP per stratificazione rischio.',
        postOpTitle: 'Post-Operatorio:',
        postOp:
          'Chirurgia maggiore: bilancio 24h primi 3-5 giorni. Target euvolemia favorisce guarigione ferita. Ipovolemia → ↓perfusione tessutale → complicanze (infezioni, deiscenza). Ipervolemia → edema, ↑complicanze polmonari.',
      },
    },

    // SEZIONE 7: Valori Critici
    referenceValues: {
      title: 'Valori Critici e Alert',
      content: {
        criticalValuesTitle: 'Valori Critici per Intervento:',
        criticalValues: [
          '<strong class="text-red">Bilancio +2000 mL in 24h:</strong> Alert rosso. Rischio imminente edema polmonare. Furosemide IV 40-80 mg STAT + restrizione fluidi <500 mL/die.',
          '<strong class="text-red">Bilancio -2000 mL in 24h:</strong> Alert rosso. Rischio AKI pre-renale, shock. Reintegro urgente cristalloidi 1000 mL/h IV + monitoraggio intensivo.',
          '<strong class="text-orange">Bilancio +1000-2000 mL:</strong> Alert arancione. Monitorare sintomi (dispnea, edema), radiografia torace, aumentare diuretici.',
          '<strong class="text-orange">Bilancio -1000-2000 mL:</strong> Alert arancione. Monitorare PA, FC, diuresi, lattati. Reintegro fluidi IV 500 mL/h.',
        ],
        populationsTitle: 'Popolazioni ad Alto Rischio:',
        populations: [
          '<strong>Anziani (>75 anni):</strong> Sensibilità ridotta sete, ↓funzione renale, polifarmacia (diuretici, ACE-I). Rischio disidratazione alto.',
          '<strong>Neonati/Bambini:</strong> Superficie corporea alta → ↑perdite insensibili. Disidratazione rapida (diarrea, vomito).',
          '<strong>Diabete Insipido:</strong> Poliuria massiva (>3000 mL/die). Desmopressina obbligatoria + reintegro fluidi.',
        ],
        monitoringTitle: 'Parametri Monitoraggio Integrato:',
        monitoring:
          'Peso giornaliero (↑1 kg = +1000 mL ritenzione), edema (caviglie, sacrale), PA, FC, PVC, diuresi oraria, BUN/creatinina, elettroliti (Na+, K+), osmolarita, esame obiettivo (turgore cute, mucose).',
      },
    },

    // SEZIONE 8: Documentazione
    documentation: {
      title: 'Documentazione Clinica',
      content: {
        templateTitle: 'Template Documentazione Bilancio Idrico:',
        templateExample: `<strong>BILANCIO IDRICO 24h - [Data]</strong><br/>
<strong>ENTRATE:</strong>
<ul>
  <li>Liquidi orali: [mL]</li>
  <li>Acqua da cibo: [mL]</li>
  <li>Infusioni IV: [mL] (specificare tipo: SF, RL, NPT)</li>
  <li>TOTALE ENTRATE: [mL]</li>
</ul>
<strong>USCITE:</strong>
<ul>
  <li>Diuresi: [mL]</li>
  <li>Feci: [mL]</li>
  <li>Perspiratio insensibilis: [mL]</li>
  <li>Drenaggi: [mL] (specificare tipo)</li>
  <li>Vomito/Aspirazione NG: [mL]</li>
  <li>TOTALE USCITE: [mL]</li>
</ul>
<strong>BILANCIO NETTO: [+/-] [mL]</strong><br/>
<strong>STATO VOLEMICO:</strong> [Euvolemico/Sovraccarico/Deplezione]<br/>
<strong>PESO:</strong> [kg] (Δ vs ieri: [+/-] [kg])<br/>
<strong>GESTIONE:</strong> [Restrizione fluidi/Diuretici/Reintegro fluidi]`,
        elementsTitle: 'Elementi da Documentare:',
        elements: [
          'Data e ora inizio/fine periodo 24h',
          'Peso corporeo (kg) e variazione rispetto giorno precedente',
          'Bilancio cumulativo 48-72h (trend)',
          'Interventi: modifica diuretici, restrizione/reintegro fluidi',
          'Sintomi: edema, dispnea, oliguria, ipotensione',
          'Prossima rivalutazione: giornaliera (ICU), ogni 2-3 giorni (reparto)',
        ],
      },
    },

    // SEZIONE 9: Bibliografia
    bibliography: {
      title: 'Riferimenti Scientifici',
      content: {
        publicationsTitle: 'Pubblicazioni Fondamentali:',
        publications: [
          '<strong>Bouchard J, et al.</strong> (2009). "Fluid accumulation, survival and recovery of kidney function in critically ill patients with acute kidney injury". <em>Crit Care Med</em> 37(6):1921-1928. PMID: 19384206. Studio su 618 pazienti ICU: fluid overload >10% associato a ↑mortalità e ↓recupero funzione renale.',
          '<strong>Malbrain ML, et al.</strong> (2014). "Fluid overload, de-resuscitation, and outcomes in critically ill or injured patients: a systematic review with suggestions for clinical practice". <em>Intensive Care Med</em> 40(12):1849-1867. PMID: 25190178. Review sistematica su rischi fluid overload e strategie de-resuscitation.',
          '<strong>Vaara ST, et al.</strong> (2012). "Fluid overload is associated with an increased risk for 90-day mortality in critically ill patients with renal replacement therapy". <em>Crit Care Med</em> 40(6):1805-1811. PMID: 22487998. Ogni 1% aumento peso basale → +2.3% ↑mortalità 90 giorni.',
        ],
        guidelinesTitle: 'Linee Guida:',
        guidelines: [
          '<strong>KDIGO 2012:</strong> Clinical Practice Guideline for Acute Kidney Injury. Fluid management, bilancio idrico, prevenzione fluid overload.',
          '<strong>Surviving Sepsis Campaign 2021:</strong> Fluid resuscitation 30 mL/kg cristalloidi entro 3h shock settico. Early de-resuscitation dopo stabilizzazione.',
          '<strong>ESC 2021:</strong> Guidelines Heart Failure. Restrizione fluidi <1500 mL/die, Na+ <2 g/die, diuretici, monitoraggio peso.',
        ],
        onlineResources: {
          title: 'Risorse Online:',
          kdigo: 'KDIGO AKI Guidelines',
          ssc: 'Surviving Sepsis Campaign',
          esc: 'ESC Heart Failure Guidelines',
        },
      },
    },
  },

  // 8. DISCLAIMER
  disclaimer: {
    title: 'Disclaimer Clinico:',
    text: 'Questo calcolatore fornisce stime. Decisioni cliniche richiedono valutazione completa (esame obiettivo, parametri vitali, esami). Consultare medico per gestione bilancio idrico critico.',
  },
};
