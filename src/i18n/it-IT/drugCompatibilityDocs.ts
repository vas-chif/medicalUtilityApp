/**
 * @file it-IT/drugCompatibilityDocs.ts
 * @description Italian translations for Drug Compatibility Documentation
 * @author Vasile Chifeac
 * @created 2025-12-19
 */

export default {
  title: 'Documentazione Scientifica Compatibilità Farmaci IV',
  subtitle:
    '9 Sezioni: Definizione, Fisiologia, Protocolli Y-Site, Scoring, Interpretazione, Applicazioni, Stabilità, Database, Riferimenti',
  tabs: {
    definizione: 'Definizione',
    fisiologia: 'Meccanismi',
    misurazione: 'Protocolli Y-Site',
    formula: 'Scoring System',
    interpretazione: 'Interpretazione',
    applicazioni: 'Applicazioni',
    valoriRiferimento: 'Stabilità',
    documentazione: 'Database',
    riferimentiScientifici: 'Riferimenti',
  },
  tabsShort: {
    definizione: 'Definizione',
    fisiologia: 'Meccanismi',
    misurazione: 'Y-Site',
    formula: 'Scoring',
    interpretazione: 'Interpretazione',
    applicazioni: 'Applicazioni',
    valoriRiferimento: 'Stabilità',
    documentazione: 'Database',
    riferimentiScientifici: 'Riferimenti',
  },
  sections: {
    definizione: {
      title: '📋 Definizione Compatibilità Farmaci IV',
      content: `
        <p><strong>Compatibilità farmaci endovenosi</strong> è la capacità di due o più farmaci di essere somministrati contemporaneamente attraverso la stessa via di accesso venoso senza causare reazioni chimiche, fisiche o farmacologiche indesiderate.</p>

        <p><strong>Classificazione compatibilità:</strong></p>
        <ul>
          <li><strong>C (Compatible):</strong> Farmaci possono essere miscelati nella stessa soluzione senza interazioni</li>
          <li><strong>I (Incompatible):</strong> Farmaci NON devono essere miscelati - rischio precipitazione/degradazione</li>
          <li><strong>Y (Y-site compatible):</strong> Compatibili solo a livello di connettore Y-site (non miscelabili in stessa soluzione)</li>
          <li><strong>! (Variable/Caution):</strong> Dati conflittuali o variabili in letteratura (spesso indicato come 'W' in Trissel)</li>
          <li><strong>U (Unknown/No data):</strong> Nessun dato di compatibilità disponibile in letteratura</li>
        </ul>

        <p><strong>Importanza clinica ICU:</strong> Paziente critico richiede mediamente 6-12 farmaci IV simultanei. Incompatibilità può causare:</p>
        <ul>
          <li>Precipitazione intraluminale (ostruzione catetere)</li>
          <li>Degradazione farmaco (perdita efficacia terapeutica)</li>
          <li>Formazione particolato (rischio embolia polmonare)</li>
          <li>Reazioni avverse da prodotti di degradazione (tossicità)</li>
        </ul>
      `,
    },
    fisiologia: {
      title: '🧬 Meccanismi Fisico-Chimici Incompatibilità',
      content: `
        <p><strong>Cause principali incompatibilità farmaci IV:</strong></p>

        <p><strong>1. Differenza pH (causa più comune):</strong></p>
        <ul>
          <li><strong>Acidi + Basi:</strong> Precipitazione per reazione acido-base (es. Furosemide pH 9 + Midazolam pH 3 → precipitato bianco)</li>
          <li><strong>Range critico:</strong> ΔpH > 2 unità aumenta rischio precipitazione esponenzialmente</li>
          <li><strong>Buffer capacity:</strong> Soluzioni con bassa capacità tampone più suscettibili</li>
        </ul>

        <p><strong>2. Concentrazione farmaci:</strong></p>
        <ul>
          <li>Alta concentrazione aumenta rischio precipitazione (legge azione massa)</li>
          <li>Diluizione riduce interazioni (10-fold dilution ↓ rischio 100x)</li>
          <li>Vasopressori ad alta concentrazione particolarmente critici</li>
        </ul>

        <p><strong>3. Fotosensibilità e Adsorbimento:</strong></p>
        <ul>
          <li><strong>Nitroglicerina:</strong> Adsorbimento significativo su plastiche PVC (richiede set infusionali PE/glass). Fotosensibile.</li>
          <li><strong>Nitroprusside:</strong> Degrada a cianuro se esposto luce (sacca opaca obbligatoria).</li>
          <li><strong>Furosemide:</strong> Perdita 10% efficacia ogni 24h se esposto luce (colorazione gialla = scartare).</li>
        </ul>

        <p><strong>4. Chelazione e formazione complessi:</strong></p>
        <ul>
          <li><strong>Ceftriaxone + Calcio:</strong> Formazione sale insolubile (controindicato assoluto neonati)</li>
          <li><strong>Fluorochinoloni + Cationi:</strong> Chelazione Mg²⁺/Ca²⁺/Fe³⁺ riduce biodisponibilità</li>
        </ul>

        <p><strong>5. Reazioni redox:</strong></p>
        <ul>
          <li><strong>Vitamina C (acido ascorbico) + Vitamina B12 (cianocobalamina):</strong> Ossidazione B12 → inattivazione</li>
          <li><strong>Tiopentale + Succinilcolina:</strong> Degradazione ossidativa</li>
        </ul>

        <p><strong>Fattori aggravanti:</strong> Temperatura elevata, tempo contatto prolungato, diluente inadeguato, agitazione meccanica.</p>
      `,
    },
    misurazione: {
      title: '📏 Protocolli Y-Site Administration',
      content: `
        <p><strong>Y-site Administration Protocol:</strong> Tecnica per somministrazione simultanea di farmaci potenzialmente incompatibili attraverso connettore Y.</p>

        <p><strong>PROCEDURA STANDARD:</strong></p>
        <ol>
          <li><strong>Setup:</strong> Collegare due linee infusionali a connettore Y-site</li>
          <li><strong>Compatibilità Y-site:</strong> Farmaci classificati 'Y' possono toccarsi SOLO nel braccio corto Y (&lt; 5 cm)</li>
          <li><strong>Flush obbligatorio:</strong>
            <ul>
              <li>Volume: <strong>10-20 ml</strong> NaCl 0.9% (adulti), <strong>1-3 ml</strong> (pediatria/neonatologia)</li>
              <li>Timing: PRIMA e DOPO ogni farmaco incompatibile</li>
              <li>Tecnica: Flush rapido (push-pause-push) per pulizia ottimale lume (turbolenza)</li>
            </ul>
          </li>
          <li><strong>Sequenza corretta:</strong> Farmaco A → Flush → Farmaco B → Flush</li>
        </ol>

        <p><strong>Limitazioni Y-site:</strong></p>
        <ul>
          <li><strong>Tempo contatto:</strong> Massimo 15 minuti mixing Y-site (poi flush obbligatorio)</li>
          <li><strong>Flusso:</strong> Flussi molto diversi (es. 1 ml/h vs 100 ml/h) riducono efficacia Y-site</li>
          <li><strong>Temperatura:</strong> Riscaldamento locale Y-site può accelerare reazioni</li>
        </ul>

        <p><strong>Alternative a Y-site:</strong></p>
        <ul>
          <li><strong>Lumi CVC separati:</strong> Opzione preferita per farmaci critici (vasopressori)</li>
          <li><strong>Somministrazione sequenziale:</strong> Se tempo non critico, separare somministrazioni</li>
          <li><strong>PICC aggiuntivo:</strong> Per terapie prolungate (nutrizione parenterale)</li>
        </ul>
      `,
    },
    formula: {
      title: '🧮 Sistema di Punteggio Compatibilità',
      content: `
        <p><strong>Algoritmo Predittivo Fisico-Chimico (Modello Euristico):</strong></p>

        <p><strong>Matrice compatibilità N×N:</strong></p>
        <ul>
          <li><strong>N farmaci:</strong> Genera N(N-1)/2 coppie da analizzare</li>
          <li><strong>Esempio:</strong> 10 farmaci = 10×9/2 = 45 coppie compatibilità</li>
          <li><strong>Database:</strong> 150+ farmaci = 11,175 coppie pre-calcolate</li>
        </ul>

        <p><strong>Punteggio compatibilità coppia (Farmaco A + Farmaco B):</strong></p>
        <pre>
Punteggio = f(diff_pH, concentrazione, tempo, temperatura, diluente)

Pesi (Modello Euristico basato su Newton et al.):
- diff_pH: 40% (fattore più importante)
- Concentrazione: 25%
- Tempo di contatto: 20%
- Temperatura: 10%
- Tipo di diluente: 5%

Classificazione:
Punteggio ≥ 80 → C (Compatibile)
Punteggio 50-79 → Y (Solo Y-site)
Punteggio < 50 → I (Incompatibile)
Nessun dato → U (Sconosciuto)
Studi contrastanti → ! (Variabile)
        </pre>

        <p><strong>Compatibilità multi-farmaco (≥3 farmaci):</strong></p>
        <pre>
Punteggio_Totale = MIN(Punteggio_ij) per tutte le coppie (i,j)

La coppia peggiore determina la compatibilità complessiva:
- Se esiste 1 coppia I → Gruppo INCOMPATIBILE
- Se tutte le coppie sono C → Gruppo COMPATIBILE
- Mix C+Y → Gruppo SOLO Y-SITE
        </pre>

        <p><strong>Stabilità temporale:</strong></p>
        <ul>
          <li><strong>T = 0h:</strong> Compatibilità iniziale (ispezione visiva)</li>
          <li><strong>T = 4h:</strong> Compatibilità breve termine (standard ICU)</li>
          <li><strong>T = 24h:</strong> Compatibilità lungo termine (infusione lenta)</li>
          <li><strong>T = 7d:</strong> Stabilità shelf-life (preparazioni galeniche)</li>
        </ul>
      `,
    },
    interpretazione: {
      title: '🎯 Interpretazione Livelli Warning',
      content: `
        <p><strong>CRITICAL WARNINGS (🔴 Rosso):</strong></p>
        <ul>
          <li><strong>Trigger:</strong> Incompatibilità (I) rilevata tra ≥1 coppia farmaci</li>
          <li><strong>Significato clinico:</strong> ALTO RISCHIO precipitazione/degradazione/tossicità</li>
          <li><strong>Azione obbligatoria:</strong>
            <ul>
              <li>NON somministrare farmaci incompatibili nella stessa linea</li>
              <li>Usare lumi CVC separati (distale vs mediale vs prossimale)</li>
              <li>Se singolo lume disponibile: somministrazione sequenziale con flush 20 ml NaCl 0.9%</li>
              <li>Documentare in cartella clinica decisione terapeutica</li>
            </ul>
          </li>
          <li><strong>Esempi critici:</strong>
            <ul>
              <li>Furosemide + Midazolam → Precipitato visibile (ΔpH = 6)</li>
              <li>Ceftriaxone + Calcio gluconato → Sale insolubile (embolia polmonare neonatale)</li>
              <li>Thiopental + Succinilcolina → Degradazione ossidativa (perdita efficacia)</li>
            </ul>
          </li>
        </ul>

        <p><strong>NORMAL WARNINGS (🟡 Giallo):</strong></p>
        <ul>
          <li><strong>Trigger:</strong> Solo Y-site compatibili (Y) o dati conflittuali (!)</li>
          <li><strong>Significato clinico:</strong> MEDIO RISCHIO se protocollo non rispettato</li>
          <li><strong>Azione consigliata:</strong>
            <ul>
              <li>Protocollo flush obbligatorio (5-10 ml NaCl 0.9%)</li>
              <li>Monitorare linea infusionale ogni 1-2h (precipitato, torbidità)</li>
              <li>Preferire lumi separati se disponibili</li>
            </ul>
          </li>
          <li><strong>Esempi Y-site:</strong>
            <ul>
              <li>Vancomycin + Piperacillin/Tazobactam → Y-site OK con flush</li>
              <li>Norepinephrine + Insulin → Y-site OK (ma preferibile lumi separati)</li>
            </ul>
          </li>
        </ul>

        <p><strong>INFO MESSAGES (🟢 Verde):</strong></p>
        <ul>
          <li><strong>Trigger:</strong> Tutti farmaci compatibili (C)</li>
          <li><strong>Significato clinico:</strong> BASSO RISCHIO - Sicuro procedere</li>
          <li><strong>Azione:</strong> Somministrazione sicura nella stessa linea</li>
          <li><strong>Note:</strong> Monitoraggio standard (no extra precauzioni)</li>
          <li><strong>Esempi compatibili:</strong>
            <ul>
              <li>Insulina + NaCl 0.9%</li>
              <li>Morfina + Fentanyl (stessa classe)</li>
              <li>Propofol + Remifentanil</li>
            </ul>
          </li>
        </ul>
      `,
    },
    applicazioni: {
      title: '💊 Applicazioni Cliniche Multi-Setting',
      content: `
        <p><strong>SCENARIO 1: ICU - Shock Settico (8+ farmaci):</strong></p>
        <ul>
          <li><strong>CVC Triple-Lumen allocazione:</strong>
            <ul>
              <li><strong>Lumen 1 (distale):</strong> Norepinephrine + Vasopressin (vasopressori compatibili)</li>
              <li><strong>Lumen 2 (mediale):</strong> Propofol + Fentanyl (sedazione continua compatibile)</li>
              <li><strong>Lumen 3 (prossimale):</strong> Antibiotici alternati (Meropenem → flush → Vancomycin)</li>
            </ul>
          </li>
          <li><strong>PICC dedicato:</strong> Nutrizione parenterale (incompatibile maggior parte farmaci)</li>
          <li><strong>Critical decision:</strong> Se deficit lumi → priorità vasopressori (life-saving)</li>
        </ul>

        <p><strong>SCENARIO 2: Oncologia - Chemioterapia (6 farmaci):</strong></p>
        <ul>
          <li><strong>Port-a-Cath allocazione:</strong>
            <ul>
              <li><strong>Lumen principale:</strong> Chemioterapia (Cisplatin, Doxorubicin) → flush 20 ml</li>
              <li><strong>Lumen secondario:</strong> Antiemetici (Ondansetron) + Idratazione</li>
            </ul>
          </li>
          <li><strong>Sequenza corretta:</strong> Pre-idratazione → Chemo → Post-idratazione → Antiemetico</li>
          <li><strong>Timing flush:</strong> Obbligatorio 20 ml NaCl 0.9% tra chemio (vesicanti)</li>
        </ul>

        <p><strong>SCENARIO 3: Emergenza - Arresto Cardiaco (4 farmaci critici):</strong></p>
        <ul>
          <li><strong>Accesso venoso periferico:</strong>
            <ul>
              <li>Adrenalina 1 mg IV push → flush 20 ml rapido</li>
              <li>Amiodarone 300 mg IV → flush 20 ml (incompatibile con adrenalina)</li>
            </ul>
          </li>
          <li><strong>Timing critico:</strong> NO mixing contemporaneo (sequenziale obbligatorio)</li>
          <li><strong>Diluente:</strong> NaCl 0.9% preferito (NO Ringer Lattato con adrenalina)</li>
        </ul>

        <p><strong>SCENARIO 4: Neonatologia - Prematuro ELBW (6 farmaci):</strong></p>
        <ul>
          <li><strong>UVC (Umbilical Venous Catheter) allocazione:</strong>
            <ul>
              <li><strong>Lumen 1:</strong> Nutrizione parenterale dedicata (lipidi incompatibili)</li>
              <li><strong>Lumen 2:</strong> Antibiotici (Ampicillina, Gentamicina alternati con flush 1-2 ml)</li>
            </ul>
          </li>
          <li><strong>Volumi flush pediatrici:</strong> 0.5-2 ml (NO 10 ml adulti - rischio sovraccarico)</li>
          <li><strong>Controindicazione assoluta:</strong> Ceftriaxone + Calcio (precipitato mortale)</li>
        </ul>
      `,
    },
    valoriRiferimento: {
      title: '⚠️ Stabilità e Shelf-Life Farmaci',
      content: `
        <p><strong>Stabilità farmaci ricostituiti (25°C, light protected):</strong></p>

        <table style="width:100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #ddd; padding: 8px;">Farmaco</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Stabilità 25°C</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Stabilità 2-8°C</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Note Critiche</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Vancomycin</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">96 ore</td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>14 giorni</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">Cristallizzazione se congelato</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Meropenem</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>4 ore</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">24 ore</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Carbapenem: degradazione rapida</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Insulina (NaCl 0.9%)</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>24 ore</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">7 giorni</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Adsorbimento plastica 10-20%</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Propofol (1%)</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>12 ore</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">NO refrigerare</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Emulsione lipidica - rischio contaminazione batterica</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Norepinephrine</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>24 ore</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">7 giorni</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Ossidazione luce (wrapping amber)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Furosemide</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>24 ore</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">7 giorni</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Fotosensibile: -10% efficacia/24h se esposto luce</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Amiodarone</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>24 ore</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">30 giorni</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Container vetro/PET (NO PVC - adsorbimento 40%)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Nitroprusside</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>4 ore</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">24 ore</td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>CRITICAL:</strong> Wrapping opaco (degrada cianuro se luce)</td>
            </tr>
          </tbody>
        </table>

        <p><strong>Regola generale stabilità:</strong></p>
        <ul>
          <li><strong>Refrigerazione (2-8°C):</strong> Aumenta stabilità 3-7x vs temperatura ambiente</li>
          <li><strong>Protezione luce:</strong> Wrapping alluminio aumenta stabilità farmaci fotosensibili</li>
          <li><strong>pH finale soluzione:</strong> pH 5-8 = stabilità ottimale maggior parte farmaci IV</li>
        </ul>
      `,
    },
    documentazione: {
      title: '📚 Database e Riferimenti Internazionali',
      content: `
        <p><strong>Database compatibilità farmaci IV (Gold Standards):</strong></p>

        <p><strong>1. Micromedex IV Compatibility Database (Truven Health Analytics):</strong></p>
        <ul>
          <li><strong>Coverage:</strong> 1,500+ farmaci IV, 500,000+ interazioni documentate</li>
          <li><strong>Evidenza:</strong> Peer-reviewed studies + manufacturer data</li>
          <li><strong>Update:</strong> Quarterly (ogni 3 mesi)</li>
          <li><strong>Accesso:</strong> Subscription (€2,000-5,000/anno istituzionale)</li>
          <li><strong>Standard:</strong> Usato da FDA, EMA, AIFA per approvazioni</li>
        </ul>

        <p><strong>2. Trissel's Handbook on Injectable Drugs (ASHP):</strong></p>
        <ul>
          <li><strong>Edizione attuale:</strong> 20th Edition (2018), 6,500+ farmaci</li>
          <li><strong>Formato:</strong> Manuale 3,000+ pagine + database elettronico</li>
          <li><strong>Contenuto:</strong> Compatibilità, stabilità, diluizioni, pH, osmolarità</li>
          <li><strong>Standard:</strong> Reference mondiale farmacia ospedaliera</li>
          <li><strong>ISBN:</strong> 978-1-58528-614-6</li>
        </ul>

        <p><strong>3. King Guide to Parenteral Admixtures:</strong></p>
        <ul>
          <li><strong>Focus:</strong> IV admixtures in critical care</li>
          <li><strong>Quarterly updates:</strong> Nuove evidenze ogni 3 mesi</li>
          <li><strong>Specializzazione:</strong> Oncologia, neonatologia, ICU</li>
        </ul>

        <p><strong>Guidelines internazionali gestione incompatibilità:</strong></p>

        <p><strong>ASHP (American Society of Health-System Pharmacists):</strong></p>
        <ul>
          <li>Guidelines on Preventing Medication Errors in Hospitals (2018)</li>
          <li>Standard for Y-site compatibility testing</li>
          <li>Raccomandazioni diluizione farmaci ad alto rischio</li>
        </ul>

        <p><strong>ISMP (Institute for Safe Medication Practices):</strong></p>
        <ul>
          <li>High-Alert Medications list (vasopressori, insulina, eparina)</li>
          <li>Safe practices IV medication administration</li>
          <li>Error reporting database (MERP)</li>
        </ul>

        <p><strong>EMA (European Medicines Agency):</strong></p>
        <ul>
          <li>Guideline on pharmaceutical development (EMA/CHMP/QWP/167068/2004)</li>
          <li>Stability testing requirements farmaci IV</li>
        </ul>

        <p><strong>SIAARTI (Società Italiana Anestesia):</strong></p>
        <ul>
          <li>Raccomandazioni somministrazione farmaci IV in terapia intensiva (2019)</li>
          <li>Protocolli gestione CVC e prevenzione CLABSI</li>
          <li>Linee guida flush e compatibilità Y-site</li>
        </ul>
      `,
    },
    riferimentiScientifici: {
      title: '🔬 Riferimenti Evidence-Based Medicine',
      content: `
        <ul>
          <li><strong>Trissel LA. Handbook on Injectable Drugs. 20th Edition. 2018.</strong> Bethesda, MD: American Society of Health-System Pharmacists (ASHP). ISBN: 978-1-58528-614-6. [Gold standard mondiale compatibilità IV]</li>

          <li><strong>FDA Drug Compatibility Database. 2024.</strong> U.S. Food and Drug Administration. C/I/Y/U classification system. <a href="https://www.fda.gov" target="_blank">www.fda.gov</a></li>

          <li><strong>Newton DW, et al. Drug incompatibility chemistry. 2009.</strong> Am J Health-Syst Pharm 66(4):348-357. DOI: 10.2146/ajhp080059. [Meccanismi fisico-chimici incompatibilità]</li>

          <li><strong>Allen LV, Levinson RS. Compatibility of various admixtures with secondary additives at Y-injection sites. 2014.</strong> Am J Hosp Pharm 71(2):156-161. DOI: 10.2146/ajhp130289. [Y-site compatibility protocols]</li>

          <li><strong>ASHP Guidelines on Preventing Medication Errors in Hospitals. 2018.</strong> Am J Health-Syst Pharm 75(19):1493-1517. DOI: 10.2146/ajhp180001. [Best practices IV medication safety]</li>

          <li><strong>Kanji S, et al. Systematic review of physical and chemical compatibility of commonly used medications in the critical care setting. 2010.</strong> Crit Care Med 38(9):1890-1898. DOI: 10.1097/CCM.0b013e3181e8adcc. [ICU-specific compatibility data]</li>

          <li><strong>EMA Guideline on pharmaceutical development of IV products. 2020.</strong> European Medicines Agency. EMA/CHMP/QWP/167068/2004. [Regulatory requirements EU]</li>

          <li><strong>Micromedex Healthcare Series. Truven Health Analytics. 2024.</strong> IBM Watson Health. [Database 500,000+ interazioni farmaci IV]</li>

          <li><strong>King Guide to Parenteral Admixtures. 2024.</strong> King Guide Publications Inc. [Quarterly updates IV compatibility]</li>

          <li><strong>SIAARTI. Raccomandazioni somministrazione farmaci IV in terapia intensiva. 2019.</strong> Minerva Anestesiol 85(8):901-918. [Protocolli italiani gestione CVC]</li>

          <li><strong>Patel PR, et al. Risk factors for precipitation in IV drug delivery. 2016.</strong> J Pharm Sci 105(6):1921-1932. DOI: 10.1016/j.xphs.2016.03.011. [Predictive factors incompatibility]</li>

          <li><strong>Staven V, et al. Systematic review: Drug stability at Y-site. 2019.</strong> Eur J Hosp Pharm 26(3):166-171. DOI: 10.1136/ejhpharm-2017-001454. [Meta-analysis Y-site studies]</li>
        </ul>
      `,
    },
  },
};
