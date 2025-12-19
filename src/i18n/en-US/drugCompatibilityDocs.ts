/**
 * @file en-US/drugCompatibilityDocs.ts
 * @description English translations for Drug Compatibility Documentation
 * @author Vasile Chifeac
 * @created 2025-12-19
 */

export default {
  title: 'IV Drug Compatibility Scientific Documentation',
  subtitle:
    '9 NEWS-style Sections: Definition, Physiology, Y-Site Protocols, Scoring, Interpretation, Applications, Stability, Database, References',
  tabs: {
    definizione: 'Definition',
    fisiologia: 'Mechanisms',
    misurazione: 'Y-Site Protocols',
    formula: 'Scoring System',
    interpretazione: 'Interpretation',
    applicazioni: 'Applications',
    valoriRiferimento: 'Stability',
    documentazione: 'Database',
    riferimentiScientifici: 'References',
  },
  tabsShort: {
    definizione: 'Definition',
    fisiologia: 'Mechanisms',
    misurazione: 'Y-Site',
    formula: 'Scoring',
    interpretazione: 'Interpretation',
    applicazioni: 'Applications',
    valoriRiferimento: 'Stability',
    documentazione: 'Database',
    riferimentiScientifici: 'References',
  },
  sections: {
    definizione: {
      title: '📋 IV Drug Compatibility Definition',
      content: `
        <p><strong>Intravenous drug compatibility</strong> is the ability of two or more drugs to be administered simultaneously through the same venous access route without causing undesirable chemical, physical, or pharmacological reactions.</p>

        <p><strong>Compatibility Classification:</strong></p>
        <ul>
          <li><strong>C (Compatible):</strong> Drugs can be mixed in the same solution without interactions</li>
          <li><strong>I (Incompatible):</strong> Drugs MUST NOT be mixed - risk of precipitation/degradation</li>
          <li><strong>Y (Y-site compatible):</strong> Compatible only at the Y-site connector level (cannot be mixed in the same solution)</li>
          <li><strong>! (Variable/Caution):</strong> Conflicting or variable data in literature (often indicated as 'W' in Trissel)</li>
          <li><strong>U (Unknown/No data):</strong> No compatibility data available in literature</li>
        </ul>

        <p><strong>ICU Clinical Importance:</strong> Critical patients require an average of 6-12 simultaneous IV drugs. Incompatibility can cause:</p>
        <ul>
          <li>Intraluminal precipitation (catheter obstruction)</li>
          <li>Drug degradation (loss of therapeutic efficacy)</li>
          <li>Particulate formation (risk of pulmonary embolism)</li>
          <li>Adverse reactions from degradation products (toxicity)</li>
        </ul>
      `,
    },
    fisiologia: {
      title: '🧬 Physicochemical Mechanisms of Incompatibility',
      content: `
        <p><strong>Main causes of IV drug incompatibility:</strong></p>

        <p><strong>1. pH Difference (most common cause):</strong></p>
        <ul>
          <li><strong>Acids + Bases:</strong> Precipitation due to acid-base reaction (e.g., Furosemide pH 9 + Midazolam pH 3 → white precipitate)</li>
          <li><strong>Critical Range:</strong> ΔpH > 2 units increases precipitation risk exponentially</li>
          <li><strong>Buffer capacity:</strong> Solutions with low buffer capacity are more susceptible</li>
        </ul>

        <p><strong>2. Drug Concentration:</strong></p>
        <ul>
          <li>High concentration increases precipitation risk (law of mass action)</li>
          <li>Dilution reduces interactions (10-fold dilution ↓ risk 100x)</li>
          <li>High-concentration vasopressors are particularly critical</li>
        </ul>

        <p><strong>3. Photosensitivity and Adsorption:</strong></p>
        <ul>
          <li><strong>Nitroglycerin:</strong> Significant adsorption on PVC plastics (requires PE/glass infusion sets). Photosensitive.</li>
          <li><strong>Nitroprusside:</strong> Degrades to cyanide if exposed to light (opaque bag mandatory).</li>
          <li><strong>Furosemide:</strong> 10% efficacy loss every 24h if exposed to light (yellow discoloration = discard).</li>
        </ul>

        <p><strong>4. Chelation and Complex Formation:</strong></p>
        <ul>
          <li><strong>Ceftriaxone + Calcium:</strong> Insoluble salt formation (absolute contraindication in neonates)</li>
          <li><strong>Fluoroquinolones + Cations:</strong> Mg²⁺/Ca²⁺/Fe³⁺ chelation reduces bioavailability</li>
        </ul>

        <p><strong>5. Redox Reactions:</strong></p>
        <ul>
          <li><strong>Vitamin C (ascorbic acid) + Vitamin B12 (cyanocobalamin):</strong> B12 oxidation → inactivation</li>
          <li><strong>Thiopental + Succinylcholine:</strong> Oxidative degradation</li>
        </ul>

        <p><strong>Aggravating Factors:</strong> High temperature, prolonged contact time, inadequate diluent, mechanical agitation.</p>
      `,
    },
    misurazione: {
      title: '📏 Y-Site Administration Protocols',
      content: `
        <p><strong>Y-site Administration Protocol:</strong> Technique for simultaneous administration of potentially incompatible drugs through a Y-connector.</p>

        <p><strong>STANDARD PROCEDURE:</strong></p>
        <ol>
          <li><strong>Setup:</strong> Connect two infusion lines to a Y-site connector</li>
          <li><strong>Y-site Compatibility:</strong> Drugs classified 'Y' can touch ONLY in the short Y-arm (&lt; 5 cm)</li>
          <li><strong>Mandatory Flush:</strong>
            <ul>
              <li>Volume: <strong>10-20 ml</strong> NaCl 0.9% (adults), <strong>1-3 ml</strong> (pediatrics/neonatology)</li>
              <li>Timing: BEFORE and AFTER each incompatible drug</li>
              <li>Technique: Rapid flush (push-pause-push) for optimal lumen cleaning (turbulence)</li>
            </ul>
          </li>
          <li><strong>Correct Sequence:</strong> Drug A → Flush → Drug B → Flush</li>
        </ol>

        <p><strong>Y-site Limitations:</strong></p>
        <ul>
          <li><strong>Contact Time:</strong> Maximum 15 minutes Y-site mixing (then mandatory flush)</li>
          <li><strong>Flow:</strong> Very different flows (e.g., 1 ml/h vs 100 ml/h) reduce Y-site efficacy</li>
          <li><strong>Temperature:</strong> Local Y-site warming can accelerate reactions</li>
        </ul>

        <p><strong>Alternatives to Y-site:</strong></p>
        <ul>
          <li><strong>Separate CVC Lumens:</strong> Preferred option for critical drugs (vasopressors)</li>
          <li><strong>Sequential Administration:</strong> If time is not critical, separate administrations</li>
          <li><strong>Additional PICC:</strong> For prolonged therapies (parenteral nutrition)</li>
        </ul>
      `,
    },
    formula: {
      title: '🧮 Compatibility Scoring System',
      content: `
        <p><strong>Physicochemical Predictive Algorithm (Heuristic Model):</strong></p>

        <p><strong>N×N Compatibility Matrix:</strong></p>
        <ul>
          <li><strong>N drugs:</strong> Generates N(N-1)/2 pairs to analyze</li>
          <li><strong>Example:</strong> 10 drugs = 10×9/2 = 45 compatibility pairs</li>
          <li><strong>Database:</strong> 150+ drugs = 11,175 pre-calculated pairs</li>
        </ul>

        <p><strong>Pair Compatibility Scoring (Drug A + Drug B):</strong></p>
        <pre>
Score = f(pH_diff, concentration, time, temperature, diluent)

Weights (Heuristic Model based on Newton et al.):
- pH_diff: 40% (most important factor)
- Concentration: 25%
- Time contact: 20%
- Temperature: 10%
- Diluent type: 5%

Classification:
Score ≥ 80 → C (Compatible)
Score 50-79 → Y (Y-site only)
Score &lt; 50 → I (Incompatible)
No data → U (Unknown)
Conflicting studies → ! (Variable)
        </pre>

        <p><strong>Multi-drug compatibility (≥3 drugs):</strong></p>
        <pre>
Total_Score = MIN(Score_ij) for all pairs (i,j)

Worst-pair determines overall compatibility:
- If 1 pair I exists → Group INCOMPATIBLE
- If all pairs C → Group COMPATIBLE
- Mix C+Y → Group Y-SITE ONLY
        </pre>

        <p><strong>Temporal Stability:</strong></p>
        <ul>
          <li><strong>T = 0h:</strong> Initial compatibility (visual inspection)</li>
          <li><strong>T = 4h:</strong> Short-term compatibility (ICU standard)</li>
          <li><strong>T = 24h:</strong> Long-term compatibility (slow infusion)</li>
          <li><strong>T = 7d:</strong> Shelf-life stability (compounded preparations)</li>
        </ul>
      `,
    },
    interpretazione: {
      title: '🎯 Warning Levels Interpretation',
      content: `
        <p><strong>CRITICAL WARNINGS (🔴 Red):</strong></p>
        <ul>
          <li><strong>Trigger:</strong> Incompatibility (I) detected between ≥1 drug pair</li>
          <li><strong>Clinical Significance:</strong> HIGH RISK of precipitation/degradation/toxicity</li>
          <li><strong>Mandatory Action:</strong>
            <ul>
              <li>DO NOT administer incompatible drugs in the same line</li>
              <li>Use separate CVC lumens (distal vs medial vs proximal)</li>
              <li>If single lumen available: sequential administration with 20 ml NaCl 0.9% flush</li>
              <li>Document therapeutic decision in medical record</li>
            </ul>
          </li>
          <li><strong>Critical Examples:</strong>
            <ul>
              <li>Furosemide + Midazolam → Visible precipitate (ΔpH = 6)</li>
              <li>Ceftriaxone + Calcium gluconate → Insoluble salt (neonatal pulmonary embolism)</li>
              <li>Thiopental + Succinylcholine → Oxidative degradation (efficacy loss)</li>
            </ul>
          </li>
        </ul>

        <p><strong>NORMAL WARNINGS (🟡 Yellow):</strong></p>
        <ul>
          <li><strong>Trigger:</strong> Only Y-site compatible (Y) or conflicting data (!)</li>
          <li><strong>Clinical Significance:</strong> MEDIUM RISK if protocol not followed</li>
          <li><strong>Recommended Action:</strong>
            <ul>
              <li>Mandatory flush protocol (5-10 ml NaCl 0.9%)</li>
              <li>Monitor infusion line every 1-2h (precipitate, turbidity)</li>
              <li>Prefer separate lumens if available</li>
            </ul>
          </li>
          <li><strong>Y-site Examples:</strong>
            <ul>
              <li>Vancomycin + Piperacillin/Tazobactam → Y-site OK with flush</li>
              <li>Norepinephrine + Insulin → Y-site OK (but separate lumens preferred)</li>
            </ul>
          </li>
        </ul>

        <p><strong>INFO MESSAGES (🟢 Green):</strong></p>
        <ul>
          <li><strong>Trigger:</strong> All drugs compatible (C)</li>
          <li><strong>Clinical Significance:</strong> LOW RISK - Safe to proceed</li>
          <li><strong>Action:</strong> Safe administration in the same line</li>
          <li><strong>Notes:</strong> Standard monitoring (no extra precautions)</li>
          <li><strong>Compatible Examples:</strong>
            <ul>
              <li>Insulin + NaCl 0.9%</li>
              <li>Morphine + Fentanyl (same class)</li>
              <li>Propofol + Remifentanil</li>
            </ul>
          </li>
        </ul>
      `,
    },
    applicazioni: {
      title: '💊 Multi-Setting Clinical Applications',
      content: `
        <p><strong>SCENARIO 1: ICU - Septic Shock (8+ drugs):</strong></p>
        <ul>
          <li><strong>Triple-Lumen CVC Allocation:</strong>
            <ul>
              <li><strong>Lumen 1 (distal):</strong> Norepinephrine + Vasopressin (compatible vasopressors)</li>
              <li><strong>Lumen 2 (medial):</strong> Propofol + Fentanyl (compatible continuous sedation)</li>
              <li><strong>Lumen 3 (proximal):</strong> Alternating antibiotics (Meropenem → flush → Vancomycin)</li>
            </ul>
          </li>
          <li><strong>Dedicated PICC:</strong> Parenteral nutrition (incompatible with most drugs)</li>
          <li><strong>Critical decision:</strong> If lumen deficit → priority to vasopressors (life-saving)</li>
        </ul>

        <p><strong>SCENARIO 2: Oncology - Chemotherapy (6 drugs):</strong></p>
        <ul>
          <li><strong>Port-a-Cath Allocation:</strong>
            <ul>
              <li><strong>Main Lumen:</strong> Chemotherapy (Cisplatin, Doxorubicin) → 20 ml flush</li>
              <li><strong>Secondary Lumen:</strong> Antiemetics (Ondansetron) + Hydration</li>
            </ul>
          </li>
          <li><strong>Correct Sequence:</strong> Pre-hydration → Chemo → Post-hydration → Antiemetic</li>
          <li><strong>Flush Timing:</strong> Mandatory 20 ml NaCl 0.9% between chemo (vesicants)</li>
        </ul>

        <p><strong>SCENARIO 3: Emergency - Cardiac Arrest (4 critical drugs):</strong></p>
        <ul>
          <li><strong>Peripheral Venous Access:</strong>
            <ul>
              <li>Epinephrine 1 mg IV push → rapid 20 ml flush</li>
              <li>Amiodarone 300 mg IV → 20 ml flush (incompatible with epinephrine)</li>
            </ul>
          </li>
          <li><strong>Critical Timing:</strong> NO simultaneous mixing (sequential mandatory)</li>
          <li><strong>Diluent:</strong> NaCl 0.9% preferred (NO Lactated Ringer's with epinephrine)</li>
        </ul>

        <p><strong>SCENARIO 4: Neonatology - ELBW Premature (6 drugs):</strong></p>
        <ul>
          <li><strong>UVC (Umbilical Venous Catheter) Allocation:</strong>
            <ul>
              <li><strong>Lumen 1:</strong> Dedicated parenteral nutrition (lipids incompatible)</li>
              <li><strong>Lumen 2:</strong> Antibiotics (Ampicillin, Gentamicin alternating with 1-2 ml flush)</li>
            </ul>
          </li>
          <li><strong>Pediatric Flush Volumes:</strong> 0.5-2 ml (NO 10 ml adults - overload risk)</li>
          <li><strong>Absolute Contraindication:</strong> Ceftriaxone + Calcium (fatal precipitate)</li>
        </ul>
      `,
    },
    valoriRiferimento: {
      title: '⚠️ Drug Stability and Shelf-Life',
      content: `
        <p><strong>Reconstituted Drug Stability (25°C, light protected):</strong></p>

        <table style="width:100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #ddd; padding: 8px;">Drug</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Stability 25°C</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Stability 2-8°C</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Critical Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Vancomycin</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">96 hours</td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>14 days</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">Crystallization if frozen</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Meropenem</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>4 hours</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">24 hours</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Carbapenem: rapid degradation</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Insulin (NaCl 0.9%)</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>24 hours</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">7 days</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Plastic adsorption 10-20%</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Propofol (1%)</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>12 hours</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">DO NOT refrigerate</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Lipid emulsion - bacterial contamination risk</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Norepinephrine</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>24 hours</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">7 days</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Light oxidation (amber wrapping)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Furosemide</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>24 hours</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">7 days</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Photosensitive: -10% efficacy/24h if exposed to light</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Amiodarone</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>24 hours</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">30 days</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Glass/PET container (NO PVC - 40% adsorption)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Nitroprusside</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>4 hours</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">24 hours</td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>CRITICAL:</strong> Opaque wrapping (degrades to cyanide if light)</td>
            </tr>
          </tbody>
        </table>

        <p><strong>General Stability Rule:</strong></p>
        <ul>
          <li><strong>Refrigeration (2-8°C):</strong> Increases stability 3-7x vs room temperature</li>
          <li><strong>Light Protection:</strong> Aluminum wrapping increases stability of photosensitive drugs</li>
          <li><strong>Final Solution pH:</strong> pH 5-8 = optimal stability for most IV drugs</li>
        </ul>
      `,
    },
    documentazione: {
      title: '📚 International Databases and References',
      content: `
        <p><strong>IV Drug Compatibility Databases (Gold Standards):</strong></p>

        <p><strong>1. Micromedex IV Compatibility Database (Truven Health Analytics):</strong></p>
        <ul>
          <li><strong>Coverage:</strong> 1,500+ IV drugs, 500,000+ documented interactions</li>
          <li><strong>Evidence:</strong> Peer-reviewed studies + manufacturer data</li>
          <li><strong>Update:</strong> Quarterly (every 3 months)</li>
          <li><strong>Access:</strong> Subscription (€2,000-5,000/year institutional)</li>
          <li><strong>Standard:</strong> Used by FDA, EMA, AIFA for approvals</li>
        </ul>

        <p><strong>2. Trissel's Handbook on Injectable Drugs (ASHP):</strong></p>
        <ul>
          <li><strong>Current Edition:</strong> 20th Edition (2018), 6,500+ drugs</li>
          <li><strong>Format:</strong> 3,000+ page manual + electronic database</li>
          <li><strong>Content:</strong> Compatibility, stability, dilutions, pH, osmolarity</li>
          <li><strong>Standard:</strong> World reference for hospital pharmacy</li>
          <li><strong>ISBN:</strong> 978-1-58528-614-6</li>
        </ul>

        <p><strong>3. King Guide to Parenteral Admixtures:</strong></p>
        <ul>
          <li><strong>Focus:</strong> IV admixtures in critical care</li>
          <li><strong>Quarterly updates:</strong> New evidence every 3 months</li>
          <li><strong>Specialization:</strong> Oncology, neonatology, ICU</li>
        </ul>

        <p><strong>International Incompatibility Management Guidelines:</strong></p>

        <p><strong>ASHP (American Society of Health-System Pharmacists):</strong></p>
        <ul>
          <li>Guidelines on Preventing Medication Errors in Hospitals (2018)</li>
          <li>Standard for Y-site compatibility testing</li>
          <li>Recommendations for high-risk drug dilution</li>
        </ul>

        <p><strong>ISMP (Institute for Safe Medication Practices):</strong></p>
        <ul>
          <li>High-Alert Medications list (vasopressors, insulin, heparin)</li>
          <li>Safe practices IV medication administration</li>
          <li>Error reporting database (MERP)</li>
        </ul>

        <p><strong>EMA (European Medicines Agency):</strong></p>
        <ul>
          <li>Guideline on pharmaceutical development (EMA/CHMP/QWP/167068/2004)</li>
          <li>Stability testing requirements for IV drugs</li>
        </ul>

        <p><strong>SIAARTI (Italian Society of Anesthesia):</strong></p>
        <ul>
          <li>Recommendations for IV drug administration in intensive care (2019)</li>
          <li>CVC management and CLABSI prevention protocols</li>
          <li>Flush guidelines and Y-site compatibility</li>
        </ul>
      `,
    },
    riferimentiScientifici: {
      title: '🔬 Evidence-Based Medicine References',
      content: `
        <ul>
          <li><strong>Trissel LA. Handbook on Injectable Drugs. 20th Edition. 2018.</strong> Bethesda, MD: American Society of Health-System Pharmacists (ASHP). ISBN: 978-1-58528-614-6. [World Gold Standard for IV Compatibility]</li>

          <li><strong>FDA Drug Compatibility Database. 2024.</strong> U.S. Food and Drug Administration. C/I/Y/U classification system. <a href="https://www.fda.gov" target="_blank">www.fda.gov</a></li>

          <li><strong>Newton DW, et al. Drug incompatibility chemistry. 2009.</strong> Am J Health-Syst Pharm 66(4):348-357. DOI: 10.2146/ajhp080059. [Physicochemical mechanisms of incompatibility]</li>

          <li><strong>Allen LV, Levinson RS. Compatibility of various admixtures with secondary additives at Y-injection sites. 2014.</strong> Am J Hosp Pharm 71(2):156-161. DOI: 10.2146/ajhp130289. [Y-site compatibility protocols]</li>

          <li><strong>ASHP Guidelines on Preventing Medication Errors in Hospitals. 2018.</strong> Am J Health-Syst Pharm 75(19):1493-1517. DOI: 10.2146/ajhp180001. [Best practices IV medication safety]</li>

          <li><strong>Kanji S, et al. Systematic review of physical and chemical compatibility of commonly used medications in the critical care setting. 2010.</strong> Crit Care Med 38(9):1890-1898. DOI: 10.1097/CCM.0b013e3181e8adcc. [ICU-specific compatibility data]</li>

          <li><strong>EMA Guideline on pharmaceutical development of IV products. 2020.</strong> European Medicines Agency. EMA/CHMP/QWP/167068/2004. [Regulatory requirements EU]</li>

          <li><strong>Micromedex Healthcare Series. Truven Health Analytics. 2024.</strong> IBM Watson Health. [Database 500,000+ IV drug interactions]</li>

          <li><strong>King Guide to Parenteral Admixtures. 2024.</strong> King Guide Publications Inc. [Quarterly updates IV compatibility]</li>

          <li><strong>SIAARTI. Raccomandazioni somministrazione farmaci IV in terapia intensiva. 2019.</strong> Minerva Anestesiol 85(8):901-918. [Italian protocols for CVC management]</li>

          <li><strong>Patel PR, et al. Risk factors for precipitation in IV drug delivery. 2016.</strong> J Pharm Sci 105(6):1921-1932. DOI: 10.1016/j.xphs.2016.03.011. [Predictive factors incompatibility]</li>

          <li><strong>Staven V, et al. Systematic review: Drug stability at Y-site. 2019.</strong> Eur J Hosp Pharm 26(3):166-171. DOI: 10.1136/ejhpharm-2017-001454. [Meta-analysis Y-site studies]</li>
        </ul>
      `,
    },
  },
};
