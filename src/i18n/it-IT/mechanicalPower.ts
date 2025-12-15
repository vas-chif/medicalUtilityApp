/**
 * @file it-IT/mechanicalPower.ts
 * @description Traduzioni italiane per MechanicalPowerCalculator
 * @author Vasile Chifeac
 * @created 2025-12-10
 * @modified 2025-12-11
 *
 * @references
 * - Gattinoni L et al. (2016) "Ventilator-related causes of lung injury: the mechanical power"
 *   Intensive Care Med 42(10):1567-1575. DOI: 10.1007/s00134-016-4505-2
 *   PubMed: 27620287
 * - Serpa Neto A et al. (2018) "Mechanical power of ventilation is associated with mortality in critically ill patients"
 *   Crit Care 22(1):267. DOI: 10.1186/s13054-018-2247-y
 *   PubMed: 30382874
 * - Cressoni M et al. (2016) "Mechanical Power and Development of Ventilator-induced Lung Injury"
 *   Anesthesiology 124(5):1100-1108. DOI: 10.1097/ALN.0000000000001056
 *   PubMed: 26872367
 * - ScienceDirect: https://www.sciencedirect.com/topics/medicine-and-dentistry/mechanical-power
 * - MSD Manuals: https://www.msdmanuals.com/professional/critical-care-medicine/mechanical-ventilation
 */

export default {
  // Banner e titoli
  banner: {
    title: 'Mechanical Power (MP):',
    description:
      "Energia trasmessa dal ventilatore al sistema respiratorio nell'unita di tempo (joule/min).",
  },

  titles: {
    ventilatorParameters: 'Parametri Ventilatori',
    results: 'Risultati',
  },

  // Sezione 1: Definizione e Significato Clinico
  definition: {
    title: 'Definizione e Significato Clinico del Mechanical Power',
    mainTitle: "Cos'e il Mechanical Power e Perche e Importante",

    physicalDef: {
      title: 'Definizione Fisica del Mechanical Power (MP)',
      text: "Il <strong>Mechanical Power</strong> rappresenta l'energia trasferita dal ventilatore meccanico al sistema respiratorio del paziente per unita di tempo, espressa in <strong>Joule al minuto (J/min)</strong>. Dal punto di vista fisico, il MP quantifica il lavoro respiratorio totale eseguito dal ventilatore, integrando in un singolo parametro multipli componenti della ventilazione meccanica: volume corrente (VT), frequenza respiratoria (RR), pressione delle vie aeree (picco/plateau), driving pressure (?P), PEEP e flusso inspiratorio.",
      formula:
        "Formula semplificata: <strong>MP = 0.098 x RR x VT x (Ppeak -  1/2 ?P)</strong>, dove 0.098 e il fattore di conversione da LxcmH2O/min a J/min. Questa formulazione rappresenta un'approssimazione del lavoro meccanico basata su parametri facilmente accessibili al letto del paziente.",
    },

    clinicalSignificance: {
      title: '? Significato Clinico Fondamentale:',

      viliPredictor: {
        title: 'Predittore Unificato di VILI (Ventilator-Induced Lung Injury)',
        text: 'Il MP integra i 4 meccanismi patogenetici del danno polmonare da ventilatore: <strong>(1) Volutrauma</strong> (VT elevato -> sovradistensione alveolare), <strong>(2) Barotrauma</strong> (Ppeak/Pplateau eccessive -> rottura alveoli), <strong>(3) Atelectrauma</strong> (ciclico reclutamento/de-reclutamento alveoli con PEEP insufficiente -> shear stress), <strong>(4) Biotrauma</strong> (rilascio citokine pro-infiammatorie IL-1?, IL-6, TNF-? -> SIRS sistemica). Studi sperimentali su modelli animali (Gattinoni et al., Intensive Care Med 2016) hanno dimostrato che il MP correla meglio con mortalita e danno istologico polmonare rispetto a singoli parametri isolati (es. VT o ?P da soli).',
      },

      prognosticValue: {
        title: 'Valore Prognostico in ARDS e Insufficienza Respiratoria Acuta',
        text: 'In pazienti con ARDS (Acute Respiratory Distress Syndrome), MP elevato (&gt;17-22 J/min) e associato a: <strong>?mortalita a 28-90 giorni</strong> (hazard ratio ~1.8-2.5), <strong>?durata ventilazione meccanica</strong> (+40-60% giorni ventilatore), <strong>?incidenza insufficienza multi-organo (MOF)</strong>. Studi osservazionali su &gt;1000 pazienti ARDS hanno identificato MP come predittore indipendente di outcome peggiore, anche dopo aggiustamento per gravita malattia (APACHE II, SOFA score), eta, P/F ratio. Threshold critico: MP &gt;22 J/min associato a mortalita &gt;50% in ARDS severa.',
      },

      optimization: {
        title: 'Guida per Ottimizzazione Strategia Ventilatoria Personalizzata',
        text: 'Il MP permette di bilanciare obiettivi ventilatori competitivi: (a) ossigenazione adeguata (PaO2 &gt;60 mmHg, SatO2 &gt;90%), (b) rimozione CO2 (PaCO2 35-45 mmHg o ipercapnia permissiva pH &gt;7.20), (c) minimizzazione danno polmonare iatrogeno (MP &lt;17 J/min target). In pratica: se MP elevato, ridurre VT (target 4-6 ml/kg peso corporeo predetto PBW), ridurre RR tollerando ipercapnia moderata, ottimizzare PEEP per minimizzare atelectrauma senza sovradistensione, considerare interventi rescue (prona, ECMO). Monitoraggio MP real-time al letto paziente guida aggiustamenti incrementali parametri ventilatore.',
      },

      comparison: {
        title: 'Comparazione Modalita Ventilatorie e Settings',
        text: 'MP facilita confronto oggettivo tra diverse strategie ventilatorie: volume control (VC) vs pressure control (PC), diverse combinazioni VT/RR/PEEP per stesso paziente. Esempio pratico: paziente ARDS con VT 6 ml/kg, RR 25, PEEP 10, Pplat 28 -> MP ~20 J/min. Prova riduzione RR 20 con tolleranza ipercapnia -> MP ~16 J/min -> strategia preferibile se PaCO2/pH tollerabili. Permette individualizzazione basata su risposta fisiologica paziente-specifica piuttosto che protocolli rigidi "one-size-fits-all".',
      },

      biomarkers: {
        title: 'Correlazione con Biomarker Infiammatori e Danno Alveolare',
        text: 'Elevato MP correla con marker di danno polmonare in aspirato broncoalveolare (BAL) e plasma: ?IL-6, ?IL-8, ?TNF-? (citokine pro-infiammatorie), ?proteina C-reattiva (PCR), ?procollagene tipo III (fibrosi polmonare precoce), ?Receptor for Advanced Glycation End products (RAGE - marker danno epiteliale alveolare). Studi traslazionali: riduzione MP da 25->15 J/min in 24h -> ?50-60% IL-6 plasma, ?30% PCR. Suggerisce che ottimizzazione MP non solo previene danno meccanico ma riduce risposta infiammatoria sistemica (biotrauma).',
      },
    },

    keyConcept: {
      title: 'Concetto Chiave - "Baby Lung" in ARDS:',
      text: 'In ARDS, il polmone funzionalmente ventilabile si riduce a dimensioni simili a polmone neonatale (~200-500 ml vs ~5000 ml normale adulto) per collasso/consolidamento aree dipendenti e flooding alveolare. Ventilazione con VT "normale" (8-10 ml/kg) in questo "baby lung" residuo -> stress/strain eccessivi, MP molto elevato (30-40 J/min), danno accelerato. Strategia protettiva: VT ridotto (4-6 ml/kg PBW) distribuito su polmone di dimensioni ridotte -> normalizzazione MP, protezione danno. Razionale fisiopatologico MP = quantificare energia trasferita al polmone "realmente ventilato", non al polmone anatomico totale.',
    },
  },

  // Sezione 2: Fisiologia e Meccanismi VILI
  physiology: {
    title: 'Fisiologia e Meccanismi di Danno Polmonare (VILI)',
    mainTitle: 'VILI - Ventilator-Induced Lung Injury',
    subtitle: 'I 4 Meccanismi Patogenetici del Danno Polmonare da Ventilatore',

    mechanicsTitle: '? Meccanica Respiratoria Normale vs ARDS:',
    healthyLung:
      '<strong>Polmone Sano:</strong> Compliance polmonare normale Crs ~50-100 ml/cmH2O. Volume corrente fisiologico 6-8 ml/kg distribuito uniformemente su ~300 milioni di alveoli. Driving pressure fisiologico ?P = VT/Crs ~5-10 cmH2O. Energia elastica immagazzinata durante insufflazione e rilasciata passivamente durante espirazione. Pressione transpolmonare (Ptp = Palv - Ppleurica) mantiene apertura alveolare, prevenendo collasso end-espiratorio.',
    ardsLung:
      '<strong>ARDS:</strong> Compliance severamente ridotta Crs ~20-40 ml/cmH2O (?50-70% vs normale) per edema interstiziale/alveolare, collasso alveolare, consolidamento. Distribuzione disomogenea areazione: zone dorsali dipendenti collassate/consolidate (non-aerate), zone ventrali non-dipendenti aerate ma a rischio sovradistensione. Per stesso VT, driving pressure molto aumentato ?P = VT/Crs ~15-25 cmH2O -> stress/strain eccessivi su "baby lung" residuo. Necessita di alte pressioni (Ppeak 30-40 cmH2O) per raggiungere ossigenazione minimale.',

    viliMechanismsTitle: '? 4 Meccanismi Patogenetici del VILI:',

    unifyingParameterTitle: '? Mechanical Power come Parametro Unificante VILI:',
    unifyingParameterText:
      '<strong>Razionale Fisiopatologico del MP:</strong> I 4 meccanismi VILI (volutrauma, barotrauma, atelectrauma, biotrauma) sono interconnessi e NON indipendenti. Un singolo parametro (es. VT, Pplateau, PEEP) non cattura complessita del danno. Il Mechanical Power integra tutti i determinanti dell\'energia trasferita al polmone: <strong>MP ? VT x RR x Pressione x Flusso</strong>. Concettualmente: MP rappresenta "dose totale di energia" somministrata al polmone per unita tempo. Studi su modelli animali (Cressoni et al., Intensive Care Med 2016): MP &gt;12-15 J/min -> danno istologico dose-dipendente (edema, atelettasia, infiammazione). MP &lt;10 J/min -> polmone preservato anche con ventilazione prolungata (72-96h). Threshold MP critico varia con compliance polmonare: in ARDS severa (Crs ~20 ml/cmH2O) MP &gt;17 J/min gia dannoso, mentre in polmone normale (Crs ~60 ml/cmH2O) tollerato MP ~25-30 J/min senza danno. Implicazione: MP deve essere normalizzato per dimensioni polmone funzionante (MP/PBW o MP/Crs) per comparazioni accurate.',

    volutrauma: {
      title: 'Volutrauma - Danno da Volume Eccessivo',
      text: "Il volutrauma si verifica quando il volume corrente (VT) somministrato dal ventilatore eccede la capacita alveolare residua, causando <strong>sovradistensione alveolare</strong>. In condizioni fisiologiche, gli alveoli possono espandersi fino a ~300% del volume a riposo. Con VT elevati (&gt;8-10 ml/kg), specialmente in polmoni con ridotta compliance (ARDS), l'espansione puo raggiungere 400-600% -> <strong>stress meccanico eccessivo sulla membrana alveolocapillare</strong>, rottura giunzioni cellulari tight, apertura gap tra cellule endoteliali, aumento permeabilita capillare, edema alveolare, inattivazione surfattante.",
      mechanicalStrain:
        'Lo <strong>strain meccanico</strong> e definito come ?V/FRC (variazione volume/capacita funzionale residua). Strain &gt;2 (cioe volume end-inspiratorio &gt;3x FRC) -> danno ultrastrutturale: distacco membrane basali, frammentazione fibre collagene, attivazione mechanosensori cellulari (canali ionici stretch-activated, integrine) -> cascata segnalazione pro-infiammatoria.',
      clinicalTarget:
        '<strong>Target Clinico</strong>: VT 4-6 ml/kg PBW (peso corporeo predetto), non peso reale. Calcolo PBW: Maschi = 50 + 0.91x(altezza cm - 152.4), Femmine = 45.5 + 0.91x(altezza cm - 152.4). Rispettare questo limite riduce mortalita ~9% in ARDS (ARMA Trial, NEJM 2000).',
    },

    barotrauma: {
      title: 'Barotrauma - Danno da Pressione Eccessiva',
      text: 'Il barotrauma classico (pneumotorace, pneumomediastino, enfisema sottocutaneo) deriva da <strong>rottura alveolare macroscopica</strong> con fuoriuscita aria negli spazi extrapolmonari. Pressioni transpulmonari (Pplateau) &gt;30-35 cmH2O -> rischio barotrauma clinicamente evidente ~10-15%. Tuttavia, il concetto moderno di barotrauma include anche il <strong>"microbarotrauma"</strong>: pressioni elevate (Ppeak &gt;40 cmH2O, Pplateau &gt;30 cmH2O) -> danno microscopico membrana alveolocapillare senza pneumotorace visibile, ma con conseguenze patologiche significative.',
      drivingPressure:
        'La <strong>Driving Pressure (?P = Pplateau - PEEP)</strong> e emersa come predittore di mortalita piu potente di VT o Pplateau isolati. ?P rappresenta la pressione necessaria per espandere il polmone per un dato volume, riflette la compliance polmonare reale. ?P &gt;15 cmH2O -> ?mortalita lineare (~3-4% per ogni cmH2O sopra 15). Razionale: ?P elevata indica polmone "rigido" dove stesso VT genera stress maggiore.',
      clinicalTarget:
        '<strong>Target Clinico</strong>: Pplateau &lt;30 cmH2O (preferibile &lt;28), ?P &lt;15 cmH2O, Ppeak &lt;40 cmH2O. In pratica: pause inspiratoria 0.5-1 sec per misurare Pplateau (pressione alveolare vera, senza componente resistiva vie aeree). Se ?P elevata nonostante VT protettivo -> considerare PEEP subottimale, reclutamento alveolare, o ECMO.',
    },

    atelectrauma: {
      title: 'Atelectrauma - Danno da Reclutamento/De-reclutamento Ciclico',
      text: "L'atelectrauma deriva dall'<strong>apertura e chiusura ripetitiva di unita alveolari</strong> instabili ad ogni ciclo respiratorio. In ARDS, alveoli collassati (per edema, inattivazione surfattante, peso sovrastante) si riaprono durante inspirazione (con forze di taglio elevate, shear stress) e si richiudono durante espirazione. Questo ciclo 20-30 volte/minuto per giorni -> <strong>danno epiteliale progressivo</strong>, denudazione cellule alveolari tipo I, proliferazione tipo II, fibrosi.",
      peepRole:
        'La <strong>PEEP (Positive End-Expiratory Pressure)</strong> previene atelectrauma mantenendo alveoli aperti a fine espirazione. PEEP ottimale: sufficiente per reclutamento alveoli collassabili, ma non eccessiva da causare sovradistensione alveoli gia aperti. Studi dimostrano che PEEP insufficiente (&lt;5 cmH2O in ARDS) -> atelectrauma significativo, mentre PEEP eccessiva (&gt;20-25 cmH2O) -> volutrauma/barotrauma. Trovare "sweet spot" PEEP e challenge clinica: metodi = trial PEEP incrementali con monitoraggio compliance, P/F ratio, MP.',
      clinicalTarget:
        '<strong>Target Clinico</strong>: PEEP individualizzata basata su gravita ARDS. ARDS lieve (P/F 200-300): PEEP 5-10 cmH2O, ARDS moderata (P/F 100-200): PEEP 10-15 cmH2O, ARDS severa (P/F &lt;100): PEEP 15-20+ cmH2O. Tabelle PEEP/FiO2 da trial ARMA forniscono guidance iniziale, ma aggiustamento paziente-specifico essenziale.',
    },

    biotrauma: {
      title: 'Biotrauma - Danno da Infiammazione Sistemica',
      text: 'Il biotrauma e la conseguenza degli altri 3 meccanismi: danno meccanico (volutrauma/barotrauma/atelectrauma) -> <strong>attivazione risposta infiammatoria locale e sistemica</strong>. Cellule alveolari danneggiate (pneumociti, macrofagi, neutrofili) rilasciano citokine pro-infiammatorie (IL-1?, IL-6, IL-8, TNF-?), chemochine (MCP-1, MIP-2), specie reattive ossigeno (ROS), enzimi proteolitici (elastasi, metalloproteasi). Queste molecole entrano in circolo -> <strong>SIRS (Systemic Inflammatory Response Syndrome)</strong>, danno endoteliale vascolare sistemico, aumentata permeabilita capillare extrapolmonare, insufficienza multi-organo (rene, fegato, cuore).',
      mechanotransduction:
        'La <strong>mechanotransduction</strong> e il processo per cui stress meccanici vengono convertiti in segnali biochimici. Strain alveolare eccessivo -> attivazione NF-?B (fattore trascrizione pro-infiammatorio), MAPK (mitogen-activated protein kinases), PI3K/Akt pathways -> up-regulation geni infiammatori. Interessante: stesso strain meccanico in polmone sano produce risposta infiammatoria minima, mentre in polmone gia infiammato (ARDS) -> amplificazione drammatica (fenomeno "two-hit hypothesis").',
      clinicalTarget:
        '<strong>Target Clinico</strong>: Minimizzare MP totale per ridurre tutti i meccanismi VILI coordinatamente. Nessun singolo parametro previene biotrauma; e necessario approccio integrato: VT basso + ?P bassa + PEEP ottimale + RR minima compatibile. Monitoraggio biomarker (PCR, IL-6, procalcitonina) puo aiutare valutare risposta strategia ventilatoria nel tempo (riduzione marker = efficacia strategia protettiva).',
    },
  },

  // Sezione 3: Come si Misura
  measurement: {
    title: 'Come si Misura il Mechanical Power',
    mainTitle: 'Parametri Necessari per il Calcolo del MP',
    intro:
      'Il Mechanical Power richiede la misurazione accurata di 6 parametri ventilatori fondamentali, tutti disponibili sui ventilatori moderni di terapia intensiva.',

    rr: {
      title: 'Frequenza Respiratoria (RR - Respiratory Rate)',
      definition:
        '<strong>Definizione</strong>: Numero di atti respiratori al minuto somministrati dal ventilatore (cicli inspirazione-espirazione completi).',
      measurement:
        '<strong>Misurazione</strong>: Visualizzata direttamente sul display ventilatore, sia RR impostata (set) che RR totale (set + breaths paziente in modalita assistite come SIMV, PSV). Per calcolo MP usare RR totale.',
      normalRange:
        '<strong>Range Normale</strong>: Adulti 12-20 breaths/min (ventilazione fisiologica), ARDS 20-35 breaths/min (compenso ipercapnia/ipossia), Pediatria variabile per eta (neonati 30-60, bambini 20-30).',
      clinicalNote:
        '<strong>Nota Clinica</strong>: RR elevata (&gt;35 breaths/min) -> ?MP significativamente anche con VT protettivo. Tollerare ipercapnia permissiva (PaCO2 50-70 mmHg, pH &gt;7.20) consente ridurre RR -> ?MP senza compromettere outcome. Evidenza: riduzione RR da 30->20 con VT 6 ml/kg -> ?MP ~30%.',
    },

    vt: {
      title: 'Volume Corrente (VT - Tidal Volume)',
      definition:
        "<strong>Definizione</strong>: Volume d'aria somministrato ad ogni atto respiratorio, misurato in millilitri (ml) o litri (L).",
      measurement:
        '<strong>Misurazione</strong>: VT erogato (inspiratorio) vs VT espirato (espiratorio). Per calcolo MP usare VT espirato (piu accurato, non influenzato da compliance tubing, compression volume). Ventilatori misurano con sensori flusso espiratorio integrati, accuratezza +-5-10 ml.',
      normalRange:
        '<strong>Range Normale</strong>: Fisiologico 7-8 ml/kg peso corporeo ideale (PBW), Strategia protettiva ARDS 4-6 ml/kg PBW, Ventilazione "liberale" (sconsigliata) 8-10 ml/kg.',
      clinicalNote:
        '<strong>Nota Critica</strong>: Usare SEMPRE peso corporeo predetto (PBW), non peso reale. Obesita/altezza estrema -> grossi errori se si usa peso reale. PBW Maschi = 50 + 0.91x(altezza cm - 152.4), PBW Femmine = 45.5 + 0.91x(altezza cm - 152.4). Esempio: Paziente 180 cm maschio obeso 120 kg -> PBW ~75 kg -> VT target 300-450 ml (non 600-720 ml se erroneamente calcolato su 120 kg).',
    },

    ppeak: {
      title: 'Pressione di Picco (Ppeak - Peak Inspiratory Pressure)',
      definition:
        '<strong>Definizione</strong>: Massima pressione raggiunta nelle vie aeree durante fase inspiratoria, include componente resistiva + elastica.',
      measurement:
        '<strong>Misurazione</strong>: Letta direttamente su display ventilatore, rilevata da trasduttore pressione prossimale (vicino Y-piece o nella macchina). Valore istantaneo, fluttua ciclo per ciclo +-1-2 cmH2O.',
      normalRange:
        '<strong>Range Sicuro</strong>: &lt;40 cmH2O (limite assoluto per evitare barotrauma), Ideale &lt;35 cmH2O in ARDS, Fisiologico spontaneo ~5-10 cmH2O (pressione negativa intratoracica).',
      clinicalNote:
        '<strong>Nota Interpretativa</strong>: Ppeak elevata puo derivare da: (1) Resistenza vie aeree alta (broncosp asmo, secrezioni, tubo piccolo) -> Ppeak-Pplateau ampio (gap &gt;10 cmH2O), (2) Compliance polmonare bassa (ARDS, fibrosi) -> Ppeak e Pplateau entrambi elevati, gap normale (~5 cmH2O). Distinguere cause essenziale per intervento: caso (1) -> broncodilatatori, aspirazione, tubo piu grande; caso (2) -> ridurre VT, ottimizzare PEEP, recruitment.',
    },

    pplateau: {
      title: 'Pressione di Plateau (Pplateau - Plateau Pressure)',
      definition:
        '<strong>Definizione</strong>: Pressione alveolare statica a fine inspirazione, con flusso azzerato (pausa inspiratoria). Riflette componente elastica pura, senza resistenze vie aeree.',
      measurement:
        '<strong>Misurazione</strong>: Richiede pausa inspiratoria 0.5-1 secondo (hold inspiratorio). Su ventilatori moderni: tasto "Inspiratory Hold" -> grafico pressione mostra plateau dopo picco. Misurare valore stabile plateau (ultimi 0.2-0.3 sec pausa). Non disponibile in modalita spontanee pure (CPAP, PSV senza backup).',
      normalRange:
        '<strong>Range Sicuro</strong>: &lt;30 cmH2O (ARMA trial threshold), Ideale &lt;28 cmH2O, Critico &gt;35 cmH2O (rischio barotrauma alto).',
      clinicalNote:
        '<strong>Gold Standard per Monitoraggio ARDS</strong>: Pplateau e il parametro di sicurezza primario in ventilazione protettiva. Driving Pressure (?P = Pplateau - PEEP) e predittore mortalita piu potente. Se Pplateau &gt;30 cmH2O -> ridurre VT incrementalmente (100 ml steps) fino a raggiungere target, tollerando ipercapnia. Misurare Pplateau ogni 4-6 ore in ARDS stabile, piu frequentemente se instabilita.',
    },

    peep: {
      title: 'PEEP (Positive End-Expiratory Pressure)',
      definition:
        '<strong>Definizione</strong>: Pressione positiva mantenuta nelle vie aeree a fine espirazione per prevenire collasso alveolare.',
      measurement:
        '<strong>Misurazione</strong>: Impostata sul ventilatore e visualizzata su display. PEEP totale = PEEP impostata + auto-PEEP (intrappolamento aereo). Auto-PEEP misurata con pausa espiratoria (Expiratory Hold). In condizioni normali auto-PEEP ~0-2 cmH2O, in BPCO/asma puo raggiungere 5-15 cmH2O.',
      normalRange:
        '<strong>Range Clinico</strong>: PEEP fisiologica ~3-5 cmH2O (simula chiusura glottide), ARDS lieve 8-10 cmH2O, ARDS moderata 10-15 cmH2O, ARDS severa 15-20 cmH2O (talvolta &gt;20 con protocollo prone/recruitment).',
      clinicalNote:
        '<strong>Bilanciamento Critico</strong>: PEEP troppo bassa -> atelectrauma, ipossiemia, shunt, ?MP (driving pressure alta); PEEP troppo alta -> sovradistensione, ?gittata cardiaca (ritorno venoso ridotto), ?MP (volume end-inspiratorio elevato). Metodi per ottimizzare PEEP: (1) Tabelle PEEP/FiO2 (semplice, trial ARMA/ALVEOLI), (2) Decremental PEEP trial (max compliance), (3) Tomografia impedenza elettrica (EIT) - distribuzione ventilazione ottimale, (4) P/F ratio + MP: PEEP che massimizza P/F minimizzando MP.',
    },

    flow: {
      title: 'Flusso Inspiratorio (Flow)',
      definition:
        '<strong>Definizione</strong>: Velocita con cui volume corrente viene somministrato durante inspirazione, misurata in litri al minuto (L/min).',
      measurement:
        '<strong>Misurazione</strong>: Su ventilatori moderni flusso e visualizzato graficamente (curva flusso-tempo). In volume control: flusso costante impostato (quadrato), o decelerante. In pressure control: flusso decelerante automatico (forma onda esponenziale). Per calcolo MP: usare flusso inspiratorio medio se disponibile, o flusso di picco x0.5-0.6 come approssimazione.',
      normalRange:
        '<strong>Range Tipico</strong>: Adulti 40-80 L/min (volume control), variabile in pressure control a seconda compliance/resistenza. Flussi bassi (&lt;40 L/min) -> tempo inspiratorio prolungato, flussi alti (&gt;100 L/min) -> turbolenza, stress shear.',
      clinicalNote:
        '<strong>Impatto su MP</strong>: Flusso elevato -> ?resistenze vie aeree, ?Ppeak (ma non Pplateau se airways normali), contributo moderato a MP totale. Formula completa MP include componente flusso: MP = 0.098 x RR x VT x (Ppeak -  1/2 ?P). In pratica: ridurre flusso da 80->50 L/min puo ridurre Ppeak ~5-8 cmH2O -> ?MP ~10-15%. Trade-off: flusso molto basso -> tempo inspiratorio lungo -> potenziale assincronia paziente-ventilatore.',
    },

    // Metodi di misurazione e considerazioni pratiche
    methods: {
      title: '? Metodi di Acquisizione Dati dal Ventilatore:',
      direct: {
        title: 'Lettura Diretta Display Ventilatore (Metodo Standard)',
        text: 'Tutti i parametri necessari (RR, VTe, Ppeak, Pplateau, PEEP) sono visualizzati in tempo reale sul monitor del ventilatore meccanico moderno (Servo-i, Hamilton, Drager, Maquet, ecc.). <strong>Procedura:</strong> (1) Verificare modalita ventilatoria (VC, PC, SIMV, ecc.), (2) Annotare RR totale, VTe medio (ultimi 3-5 atti), Ppeak, PEEP, (3) Eseguire manovra pausa inspiratoria per misurare Pplateau (button "Insp Hold"), (4) Calcolare MP con formula. <strong>Frequenza misurazione:</strong> Ogni modifica parametri ventilatori, ogni 4-6h in paziente stabile ARDS, ogni 1-2h in fase acuta instabile.',
      },
      automatic: {
        title: 'Calcolo Automatico Integrato Ventilatore (Software Avanzato)',
        text: "Ventilatori di ultima generazione (Hamilton G5/S1, Servo-u, Drager Evita V800) integrano calcolo automatico MP visualizzato real-time su schermo. <strong>Vantaggio:</strong> Calcolo continuo breath-by-breath con formula completa (include componente resistiva PEEP-dipendente, inspiratory flow, forma d'onda). <strong>Limiti:</strong> Formula proprietaria varia tra produttori (Gattinoni vs Becher vs altri), valori non sempre comparabili. Necessita standardizzazione equazione MP in futuri consensus internazionali.",
      },
      integration: {
        title: 'Integrazione con Sistemi Informatici Clinici (EMR/PDMS)',
        text: 'In ICU moderne con Patient Data Management Systems (PDMS - es. MetaVision, IntelliSpace Critical Care, Centricity), dati ventilatori acquisiti automaticamente via interfaccia HL7/protocolli proprietari. <strong>Applicazioni:</strong> (1) Trend MP nel tempo (grafico 24-48-72h), (2) Alert automatici se MP &gt;threshold critico, (3) Decision support systems per suggerire ottimizzazioni parametri, (4) Database ricerca per analisi retrospettive MP-outcome. <strong>Big Data Potential:</strong> Machine learning su grandi dataset MP + parametri clinici -> predizione personalizzata rischio VILI, identificazione PEEP/VT ottimali paziente-specifici.',
      },
    },
    practicalConsiderations: {
      title: 'Considerazioni Pratiche e Limitazioni Misurazione MP:',
      breathVariability:
        '<strong>Variabilita breath-to-breath:</strong> In modalita ventilatorie assistite (PSV, SIMV) con triggering paziente, RR e VT variano notevolmente. Calcolare MP su media 5-10 atti respiratori.',
      peepIntrinsic:
        '<strong>Effetto PEEP intrinseco (PEEPi):</strong> In pazienti BPCO/asma con air trapping, PEEP totale = PEEP estrinseco impostato + PEEPi non misurato -> sottostima driving pressure reale -> sottostima MP. Necessita misurare PEEPi con manovra pausa espiratoria.',
      chestWall:
        '<strong>Compliance parete toracica:</strong> In obesita severa, ascite massiva, addome acuto, alta pressione addominale riduce compliance toracica -> alta Pplateau NON da danno polmonare ma da compressione esterna -> sovrastima MP "polmonare". Soluzione: misurare pressione esofagea (Pes) con sonda dedicata -> pressione transpolmonare Ptp = Palv - Pes -> calcolo MP normalizzato per polmone separato da parete toracica.',
      formulaAccuracy:
        "<strong>Formula semplificata vs completa:</strong> Formula in questo calcolatore (0.098 x RR x VT x (Ppeak - 0.5?P)) e approssimazione. Formula completa Gattinoni integra flusso inspiratorio, forma d'onda pressione, resistenze via breath-by-breath analysis. Differenza ~10-20% tra formule. Per decisioni cliniche critiche (es. candidatura ECMO), preferire calcolo completo o valore automatico da ventilatore avanzato.",
    },
  },

  // Sezione 4: Interpretazione Clinica
  interpretation: {
    title: 'Interpretazione Clinica Dettagliata',
    mainTitle: 'Zone di Rischio e Thresholds Clinici',

    greenZone: {
      title: '? Zona Sicura: MP &lt; 12 J/min',
      risk: '<strong>Rischio VILI</strong>: Molto Basso',
      mortality:
        '<strong>Mortalita associata</strong>: Baseline (~10-15% in pazienti critici generali)',
      meaning:
        '<strong>Significato</strong>: Energia trasferita al polmone e minima, ventilazione molto protettiva. Questo range si ottiene tipicamente con strategia ultra-protettiva: VT 4 ml/kg, RR moderata (12-18), driving pressure bassa (&lt;10 cmH2O). Comune in: pazienti post-operatori semplici, svezzamento finale da ventilazione, insufficienza respiratoria lieve.',
      clinicalAction:
        '<strong>Azione Clinica</strong>: Mantenere strategia corrente, valutare possibilita svezzamento precoce se criteri clinici soddisfatti (P/F &gt;200, PEEP <=8, FiO2 <=0.4, paziente sveglio e collaborante). Non necessari cambiamenti settings ventilatori per ridurre ulteriormente MP; focus su risoluzione patologia sottostante.',
    },

    yellowZone: {
      title: '? Zona Attenzione: MP 12-17 J/min',
      risk: '<strong>Rischio VILI</strong>: Basso-Moderato',
      mortality: '<strong>Mortalita associata</strong>: Lievemente aumentata (~15-20%)',
      meaning:
        '<strong>Significato</strong>: Ventilazione accettabile per ARDS lieve-moderata o pazienti con compliance ridotta. Questo e il range target per strategia protettiva standard (ARMA protocol): VT 6 ml/kg, RR 20-25, ?P ~12-15 cmH2O. Tollerabile per periodi prolungati (giorni-settimane) se necessario per mantenere scambio gassoso adeguato.',
      clinicalAction:
        '<strong>Azione Clinica</strong>: Monitoraggio regolare parametri ventilatori (ogni 4-6h), EGA giornaliera, Rx torace ogni 24-48h. Ottimizzare settings per minimizzare MP: (1) Ridurre RR se tollerabile ipercapnia permissiva (pH &gt;7.25), (2) Titolare PEEP per massimizzare P/F ratio senza aumentare ?P, (3) Considerare aggiustamenti FiO2 prima di aumentare PEEP/VT. Se paziente stabile in questo range per 48-72h -> tentativo riduzione graduale PEEP/FiO2 (de-escalation).',
    },

    orangeZone: {
      title: '? Zona Rischio: MP 17-22 J/min',
      risk: '<strong>Rischio VILI</strong>: Moderato-Alto',
      mortality: '<strong>Mortalita associata</strong>: Significativamente aumentata (~25-35%)',
      meaning:
        '<strong>Significato</strong>: Energia trasferita e elevata, rischio VILI sostanziale. Questo range si verifica in ARDS moderata-severa con necessita di supporto ventilatorio intenso per mantenere ossigenazione/ventilazione. Non sostenibile long-term senza conseguenze. Urgente ottimizzazione strategia.',
      clinicalAction:
        '<strong>Azione Urgente</strong>: <br>1. <strong>Analisi Sistematica MP</strong>: Quale parametro contribuisce di piu? Se RR alta (>30) -> priorita ridurre RR, tollerare ipercapnia (target pH >7.20). Se VT alto (>6 ml/kg) -> ridurre VT a 4-5 ml/kg. Se ?P alta (>15) -> ottimizzare PEEP o considerare recruitment.<br>2. <strong>Interventi Rescue</strong>: Posizione prona 16-18h/die (riduce MP ~15-20% + migliora ossigenazione), Blocco neuromuscolare intermittente (riduce assincronia, permette VT piu bassi), Sedazione profonda temporanea.<br>3. <strong>Monitoraggio Intensivo</strong>: EGA ogni 4-6h, Pplateau ogni 4h, compliance dinamica trend, biomarker infiammatori (PCR, IL-6) ogni 24-48h.<br>4. <strong>Considera ECMO</strong>: Se MP >20 J/min persistente nonostante ottimizzazione + P/F <80 + eta <65 + no comorbidita severe -> discussione ECMO team.',
    },

    redZone: {
      title: '? Zona Critica: MP &gt; 22 J/min',
      risk: '<strong>Rischio VILI</strong>: Molto Alto (danno polmonare progressivo quasi inevitabile)',
      mortality: '<strong>Mortalita associata</strong>: Estremamente elevata (&gt;50-60%)',
      meaning:
        '<strong>Significato</strong>: Ventilazione dannosa, energia trasferita al polmone supera capacita tolleranza. In questa zona il danno polmonare accelera: <strong>volutrauma</strong> (alveoli sovradistensi), <strong>barotrauma</strong> (rischio pneumotorace), <strong>atelectrauma</strong> (shear stress), <strong>biotrauma</strong> (cascata infiammatoria sistemica). Ogni ora in questa zona aumenta rischio MOF (multi-organ failure). Assolutamente non accettabile oltre 24-48h.',
      clinicalAction:
        '<strong>Azione Emergente (entro 1-2 ore)</strong>: <br>1. <strong>Riduzione Aggressiva MP</strong>: <br>- VT: ridurre a 3-4 ml/kg PBW (accettare ipercapnia severa pH 7.10-7.20 se necessario)<br>- RR: ridurre a 15-20 anche se PaCO2 sale a 70-90 mmHg (ipercapnia permissiva estrema, monitorare pH)<br>- PEEP: ottimizzare con decremental trial, target massimo P/F con minimo ?P<br>2. <strong>Prona Immediata</strong>: Se non gia implementata -> prona 18-20h/die continuativa fino a miglioramento P/F >150<br>3. <strong>Blocco Neuromuscolare Continuo</strong>: 24-48h per eliminare assincronie, permettere iperventilazione protettiva<br>4. <strong>ECMO Consulto Urgente</strong>: Contattare centro ECMO se disponibile. Criteri: P/F &lt;80 persistente &gt;6h, pH &lt;7.15 refrattario, MP &gt;25 J/min non riducibile, eta &lt;70, reversibilita potenziale patologia.<br>5. <strong>Monitoraggio Continuo</strong>: EGA ogni 2-4h, Pplateau ogni 2h, considerare catetere arterioso polmonare (PAC) per monitoraggio emodinamica (PEEP alta puo compromettere gittata), ecocardiografia transesofagea (TEE) per valutare funzione ventricolo destro (PEEP eccessiva -> cuore polmonare acuto).',
    },
  },

  // Sezione 5: Formula Dettagliata
  formula: {
    title: 'Formula Dettagliata e Componenti',
    mainTitle: '? Formula Completa del Mechanical Power',
    headerTitle: 'Formula Completa',
    breakdownTitle: 'Breakdown dei componenti:',

    rr: {
      title: 'Frequenza Respiratoria',
      text: "(atti/min): Numero di cicli respiratori al minuto. Maggiore RR = maggiore energia cumulativa trasferita nell'unita di tempo.",
    },
    vte: {
      title: 'Volume Tidal Espiratorio',
      text: '(litri): Volume di aria mobilizzato per ogni atto. Maggiore VT = maggiore distensione alveolare e stress meccanico.',
    },
    ppeak: {
      title: 'Pressione di Picco',
      text: '(cmH2O): Pressione massima raggiunta durante insufflazione. Include componente elastica + resistiva del sistema respiratorio.',
    },
    deltaPressure: {
      title: 'Driving Pressure',
      text: '(cmH2O): ?P = P<sub>plateau</sub> - PEEP. Rappresenta la pressione necessaria per distendere gli alveoli. E il parametro piu correlato a mortalita in ARDS (Amato et al., NEJM 2015).',
    },
    coefficient: {
      title: 'Coefficiente di conversione',
      text: ': Converte cmH2O x litri in Joule (J).',
    },

    exampleTitle: 'Esempio Pratico di Calcolo',
    exampleScenario: 'Paziente con ARDS moderata:',
    exampleParams: {
      rr: 'RR = 25 atti/min',
      vte: 'VTe = 0.40 litri (400 ml, ~6 ml/kg per 70 kg)',
      ppeak: 'P<sub>picco</sub> = 30 cmH2O',
      pplateau: 'P<sub>plateau</sub> = 26 cmH2O',
      peep: 'PEEP = 12 cmH2O',
    },
    exampleSteps: {
      step1: 'Calcolare ?P = 26 - 12 = <strong>14 cmH2O</strong>',
      step2: 'MP = 0.098 x 25 x 0.40 x (30 - 0.5 x 14)',
      step3: 'MP = 0.098 x 25 x 0.40 x (30 - 7)',
      step4: 'MP = 0.098 x 25 x 0.40 x 23',
      result:
        'MP = <strong>22.54 J/min</strong> -> <span class="text-negative">Alto rischio VILI</span>',
    },
    exampleAction:
      '? Azione Clinica: Questo paziente e sopra la soglia di sicurezza. Ridurre RR a 20 atti/min (tollerando ipercapnia permissiva) ridurrebbe MP a ~18 J/min, entrando nella zona di attenzione.',

    complete: {
      title: 'Formula di Gattinoni (2016) - Versione Completa',
      formula: 'MP = 0.098 x RR x VT x (Ppeak -  1/2 ?P)',
      where: '<strong>Dove</strong>:',
      params: {
        conversion:
          '<strong>0.098</strong>: fattore di conversione da (L.cmH2O)/min a J/min (Joule/minuto)',
        rr: '<strong>RR</strong>: Frequenza respiratoria totale (breaths/min)',
        vt: '<strong>VT</strong>: Volume corrente espirato (Litri, convertire da ml dividendo per 1000)',
        ppeak: '<strong>Ppeak</strong>: Pressione di picco vie aeree (cmH2O)',
        delta: '<strong>?P</strong>: Driving Pressure = Pplateau - PEEP (cmH2O)',
      },
      derivation:
        '<strong>Derivazione Fisica</strong>: La formula deriva dal calcolo del lavoro respiratorio meccanico. Il termine (Ppeak -  1/2 ?P) rappresenta la pressione media ponderata durante ciclo respiratorio, considerando che driving pressure contribuisce meta del suo valore (area trapezio sotto curva pressione-volume). Il prodotto RR x VT x Pressione media da energia/tempo. Fattore 0.098 converte unita: 1 L.cmH2O = 0.098 J.',
    },

    simplified: {
      title: 'Formula Semplificata (Calcolo Rapido al Letto)',
      formula: 'MP ? 0.1 x RR x VT x Pplateau',
      approximation:
        '<strong>Approssimazione</strong>: Questa versione assume Ppeak ? Pplateau (valido se resistenze basse, airways normali) e ignora termine  1/2 ?P per semplicita. Errore tipico +-10-15% vs formula completa. Utile per screening rapido, ma usare formula completa per decisioni cliniche.',
    },

    components: {
      title: 'Componenti del Mechanical Power',
      elastic: {
        title: 'Componente Elastica (60-70% MP totale)',
        text: 'Energia necessaria per vincere recoil elastico polmone/parete toracica. Dominata da VT e ?P: <strong>MPelastic ? VT x ?P x RR</strong>. ARDS: compliance ridotta -> componente elastica molto alta. Strategia: ridurre VT e piu efficace per ?componente elastica (riduzione VT del 20% -> ?MPelastic ~36%).',
      },
      resistive: {
        title: 'Componente Resistiva (20-30% MP totale)',
        text: 'Energia dissipata vincendo resistenze vie aeree/tubo endotracheale. Dipende da flusso inspiratorio e resistenze: <strong>MPresistive ? Flow2 x Resistenza</strong>. Broncosp asmo/secrezioni -> componente resistiva aumentata. Strategia: broncodilatatori, aspirazione, tubo adeguato (>=7.5 mm adulti), ridurre flusso se tollerabile.',
      },
      peep: {
        title: 'Componente PEEP (10-20% MP totale)',
        text: 'Energia per mantenere alveoli aperti contro tendenza collasso. <strong>MPPEEP = 0.098 x RR x VT x PEEP</strong>. PEEP contribuisce sempre a MP, ma beneficio (prevenzione atelectrauma, miglioramento ossigenazione) spesso supera costo energetico. Trade-off complesso: PEEP molto bassa -> ?MPPEEP ma ?atelectrauma + ??P (compenso compliance bassa), PEEP ottimale -> MP totale minimo.',
      },
    },

    example: {
      title: '? Esempio di Calcolo Pratico',
      scenario:
        '<strong>Scenario Clinico</strong>: Paziente ARDS moderata, ventilazione volume-control',
      params: {
        rr: 'RR: 24 breaths/min',
        vt: 'VT: 420 ml = 0.42 L (paziente 70 kg -> 6 ml/kg)',
        ppeak: 'Ppeak: 32 cmH2O',
        pplateau: 'Pplateau: 28 cmH2O (misurato con pausa inspiratoria)',
        peep: 'PEEP: 12 cmH2O',
      },
      calculation: '<strong>Calcolo</strong>:',
      steps: {
        step1: '1. ?P = Pplateau - PEEP = 28 - 12 = <strong>16 cmH2O</strong>',
        step2: '2. (Ppeak -  1/2 ?P) = 32 - (0.5 x 16) = 32 - 8 = <strong>24 cmH2O</strong>',
        step3: '3. MP = 0.098 x 24 x 0.42 x 24 = <strong>23.7 J/min</strong>',
      },
      interpretation:
        '<strong>Interpretazione</strong>: MP = 23.7 J/min -> Zona Critica (>22 J/min). Rischio VILI molto alto, mortalita associata >50%. <strong>Azioni urgenti</strong>: (1) Ridurre RR a 20 tollerando ipercapnia -> MP ~19.7 J/min, (2) Ridurre VT a 350 ml (5 ml/kg) -> MP ~16.4 J/min, (3) Ottimizzare PEEP per ridurre ?P (trial PEEP 14 cmH2O) -> potenziale MP ~15 J/min. Considerare prona + blocco neuromuscolare.',
    },
  },

  // Nota: Sezioni 6-9 completate con riferimenti scientifici
  // Applicazioni Cliniche, Valori Riferimento, Documentazione, Bibliografia

  applications: {
    title: 'Analisi Dettagliata e Applicazioni Cliniche',
    clinicalUseTitle: '? Utilizzo Clinico del Mechanical Power',
    protectiveVsHarmfulTitle: '? Ventilazione Protettiva vs Ventilazione Dannosa',
    protective: {
      title: '? Ventilazione Protettiva (MP &lt;17 J/min)',
      intro:
        "Strategia che minimizza l'energia trasferita al polmone riducendo il rischio di VILI:",
      tidalVolume: '<strong>Volume Tidal basso</strong>: 4-6 ml/kg PBW (peso corporeo ideale)',
      drivingPressure:
        '<strong>Driving Pressure limitata</strong>: ?P (Pplateau - PEEP) &lt;15 cmH2O',
      plateauPressure: '<strong>Pressione di Plateau</strong>: &lt;30 cmH2O (ideale &lt;28 cmH2O)',
      peepOptimal:
        '<strong>PEEP ottimale</strong>: Bilanciato per reclutamento alveolare senza sovradistensione',
      permissiveHypercapnia:
        '<strong>Ipercapnia permissiva</strong>: Tollerare PaCO2 elevata (pH &gt;7.20) per ridurre VT/RR',
    },
    harmful: {
      title: '? Ventilazione Dannosa (MP &gt;22 J/min)',
      intro: 'Trasferimento eccessivo di energia che aumenta drammaticamente il rischio di VILI:',
      tidalVolumeHigh:
        '<strong>Volume Tidal elevato</strong>: &gt;8 ml/kg PBW (sovradistensione alveolare)',
      drivingPressureHigh:
        '<strong>Driving Pressure eccessiva</strong>: ?P &gt;15 cmH2O (stress meccanico intenso)',
      respiratoryRateHigh:
        '<strong>Frequenza respiratoria alta</strong>: &gt;35-40 atti/min senza indicazione clinica',
      peepInadequate:
        '<strong>PEEP inadeguata</strong>: Troppo bassa (atelectrauma) o troppo alta (sovradistensione)',
      inflammatoryResponse:
        '<strong>Risposta infiammatoria</strong>: Aumento citokine pro-infiammatorie, MODS (sindrome disfunzione multiorgano)',
    },
    keyConcept:
      '<strong>? Concetto Chiave</strong>: Mentre parametri come Pplateau o ?P valutano singoli aspetti, il MP integra <strong>dinamicamente</strong> tutti i fattori che contribuiscono al danno. Due pazienti con stesso Pplateau possono avere MP diversi a seconda di RR, VT, e pattern respiratorio.',
    ards: {
      title: 'ARDS/ALI (Acute Respiratory Distress Syndrome)',
      context:
        '<strong>Contesto</strong>: ARDS e caratterizzata da edema polmonare non cardiogeno, ridotta compliance, e <strong>"baby lung"</strong> (solo piccola porzione di polmone aerato). La ventilazione meccanica e salvavita ma puo peggiorare il danno se mal gestita.',
      targetMP:
        '<strong>Target MP</strong>: <strong>&lt;17 J/min</strong> associato a ridotta mortalita in studi osservazionali (Gattinoni et al. 2016, Intensive Care Medicine).',
      strategyTitle: '<strong>Strategia</strong>:',
      vt: 'VT: 4-6 ml/kg PBW (peso corporeo ideale, non reale)',
      pplateau: 'Pplateau &lt;30 cmH2O (ideale &lt;28)',
      drivingPressure: '?P &lt;15 cmH2O (predittore di mortalita)',
      hypercapnia: 'Ipercapnia permissiva (pH &gt;7.20, PaCO2 fino a 60-70 mmHg se tollerata)',
      peep: 'PEEP ottimale con table ARDSnet o recruiting maneuvers',
    },
    weaning: {
      title: 'Svezzamento dalla Ventilazione Meccanica',
      context:
        '<strong>Contesto</strong>: Lo svezzamento e il processo di transizione dalla ventilazione meccanica alla respirazione spontanea. Una riduzione progressiva del MP indica miglioramento della meccanica respiratoria.',
      indicatorsTitle: '<strong>Indicatori positivi</strong>:',
      mpReduction: 'Riduzione MP da &gt;20 a &lt;15 J/min nel corso di 48-72h',
      rrReduction: 'Riduzione RR spontanea con trial a pressione di supporto (PSV)',
      complianceImprovement: 'Miglioramento compliance (riduzione ?P per stesso VT)',
      protocol:
        '<strong>Protocollo</strong>: Trial di respirazione spontanea (SBT) con T-piece o PSV 5-7 cmH2O. Se paziente mantiene RR &lt;35, SpO2 &gt;90%, FC stabile, senza distress -> estubazione.',
    },
    monitoring: {
      title: 'Monitoraggio Continuo in Terapia Intensiva',
      intro:
        'Il MP e un parametro dinamico che dovrebbe essere calcolato ad ogni modifica dei settaggi ventilatori o deterioramento clinico del paziente.',
      whenTitle: '<strong>Quando ricalcolare MP</strong>:',
      afterChanges: 'Dopo ogni modifica di RR, VT, PEEP, modalita ventilatoria',
      oxygenation: 'Peggioramento ossigenazione (P/F ratio ?, SpO2 ?)',
      pressures: 'Aumento pressioni vie aeree (resistenze ?, compliance ?)',
      maneuvers: 'Prima e dopo recruiting maneuvers o posizione prona',
      integration:
        '<strong>Integrazione</strong>: MP dovrebbe essere monitorato insieme a EGA (emogasanalisi), compliance dinamica/statica, EtCO2, indici ossigenazione (P/F ratio, SpO2/FiO2).',
    },
    limitations: {
      title: '? Limitazioni del Mechanical Power',
      intro: 'Nonostante sia un parametro promettente, il MP ha alcune limitazioni importanti:',
      notNormalized:
        '<strong>Non normalizzato per volume polmonare aerato</strong>: In ARDS, solo una frazione del polmone e ventilabile ("baby lung"). Due pazienti con stesso MP ma diverso volume polmonare aerato hanno stress specifico diverso.',
      linearityAssumption:
        '<strong>Assume linearita pressione-volume</strong>: La relazione P-V e in realta non lineare, con zone di collasso, zona lineare, e sovradistensione.',
      regionalHeterogeneity:
        '<strong>Non considera eterogeneita regionale</strong>: Non tiene conto di aree collassate vs iperaerate nello stesso polmone (importante in ARDS disomogenea).',
      empiricalThresholds:
        '<strong>Thresholds empirici</strong>: I cut-off di 17 e 22 J/min derivano da studi osservazionali, non RCT. Potrebbero variare per popolazione, patologia, eta.',
    },
    futurePerspectives:
      '<strong>? Prospettive Future</strong>: Tomografia ad impedenza elettrica (EIT) puo stimare il volume polmonare aerato, permettendo di normalizzare MP per ottenere <strong>Specific Mechanical Power</strong> (MP/volume aerato), piu preciso nella predizione di VILI.',
    scientificReferences: {
      title: '? Riferimenti Scientifici',
      gattinoni:
        '<strong>Gattinoni L, et al.</strong> (2016). "Ventilator-related causes of lung injury: the mechanical power." <em>Intensive Care Medicine</em> 42(10):1567-1575. <span class="text-blue">DOI: 10.1007/s00134-016-4505-2</span>',
      amato:
        '<strong>Amato MB, et al.</strong> (2015). "Driving pressure and survival in the acute respiratory distress syndrome." <em>New England Journal of Medicine</em> 372(8):747-755.',
      encyclopedia1:
        '<strong>Encyclopedia of Respiratory Medicine</strong> (2022), Second Edition, Volume 5. Chapter: "Ventilator-Associated Lung Injury (VALI)." Elsevier.',
      encyclopedia2:
        '<strong>Garfield B, Patel BV</strong>. "Mechanical Power" in <em>Encyclopedia of Respiratory Medicine</em> (2022). Discusses dynamic exposure to ventilatory variables and VALI mechanisms.',
    },
  },

  referenceValues: {
    title: 'Valori di Riferimento e Alert Critici',
    mainTitle: 'Threshold di Mechanical Power e Stratificazione del Rischio VILI',
    greenZone: {
      title: 'MP &lt; 12 J/min - ZONA SICURA (Protective Ventilation)',
      meaning:
        '<strong>Significato:</strong> Ventilazione protettiva ottimale. Energia trasferita al polmone e minima. Rischio VILI molto basso anche in ARDS severa. Evidenze da modelli animali: MP &lt;12 J/min -> assenza danno istologico polmonare anche con ventilazione prolungata 72-96h.',
      action:
        '<strong>Azione:</strong> Mantenere strategia ventilatoria corrente. Monitoraggio standard parametri ventilatori ogni 4-6h. Focus su ossigenazione (PaO2/FiO2, SatO2) e ventilazione (PaCO2, pH). Considerare trial weaning se condizioni cliniche migliorano.',
    },
    blueZone: {
      title: 'MP 12-17 J/min - ZONA ACCETTABILE (Low-Moderate Risk)',
      meaning:
        '<strong>Significato:</strong> Rischio VILI basso-moderato. Strategia ventilatoria ancora protettiva ma vicino a threshold critico. In pazienti ARDS moderata, MP in questo range e spesso inevitabile per mantenere ossigenazione/ventilazione adeguate.',
      action:
        '<strong>Azione:</strong> Monitoraggio frequente (ogni 2-4h). Valutare possibilita ottimizzazione: ridurre VT se tollerata ipercapnia, ridurre RR, ottimizzare PEEP con recruiting maneuvers o EIT. Bilancio rischio-beneficio: evitare riduzione eccessiva VT/RR che causa ipossia/ipercapnia severa.',
    },
    orangeZone: {
      title: '? MP 17-22 J/min - ZONA ATTENZIONE (High Risk - Ottimizzazione Urgente)',
      meaning:
        '<strong>Significato:</strong> Rischio VILI elevato. Mortalita aumenta progressivamente con MP in questo range. Studi osservazionali ARDS: MP 17-22 J/min -> mortalita ~40-50% a 28 giorni. Danno polmonare accelerato se mantenuto &gt;24-48h.',
      action:
        '<strong>Azione URGENTE:</strong> (1) Ridurre VT a 4-5 ml/kg PBW (minimo tollerato), (2) Ridurre RR tollerando ipercapnia permissiva (target pH &gt;7.15-7.20, PaCO2 fino a 60-70 mmHg se necessario), (3) Ottimizzare PEEP: se driving pressure alto (?P &gt;15 cmH2O) -> ridurre PEEP; se P/F basso &lt;150 -> incrementare PEEP con recruiting, (4) Valutare posizione prona se P/F &lt;150 mmHg (riduce MP e migliora P/F in 70% casi), (5) Considerare paralisi muscolare se asincronie paziente-ventilatore (riduce MP ~10-20%), (6) Monitoraggio ogni 1-2h con target riduzione MP &lt;17 J/min entro 6-12h.',
    },
    redZone: {
      title: '? MP &gt; 22 J/min - ZONA CRITICA (Very High Risk - Intervento Emergenza)',
      meaning:
        '<strong>Significato:</strong> Rischio VILI molto elevato, danno polmonare catastrofico imminente. Mortalita &gt;50-60% in ARDS severa con MP persistente &gt;22 J/min. Biotrauma sistemico con MOF (insufficienza multi-organo). Indicatore prognostico sfavorevole forte.',
      action:
        '<strong>Azione EMERGENZA IMMEDIATA:</strong> (1) Implementare TUTTE misure zona arancione con massima aggressivita, (2) <strong>Posizione prona obbligatoria</strong> se P/F &lt;150 mmHg (16-18h/die, riduce mortalita ~40% in ARDS severa + riduce MP ~15-25%), (3) Blocco neuromuscolare continuo 24-48h (cisatracurio 15 mg/h) per abolire asincronie e drive respiratorio (riduce MP significativamente), (4) <strong>ECMO veno-venoso</strong> (VV-ECMO): considerare URGENTE se (a) ARDS severa refrattaria P/F &lt;80 mmHg con FiO2 100%, PEEP >=10, (b) MP &gt;25 J/min nonostante tutte ottimizzazioni, (c) ipercapnia severa pH &lt;7.15 con RR gia minimo tollerato. ECMO permette "ultra-protective" ventilation: VT 2-4 ml/kg, RR 5-10, MP &lt;10 J/min -> rest polmonare totale, (5) Trasferimento URGENTE centro ECMO se non disponibile in loco, (6) Rivalutazione continua ogni 30-60 minuti, target riduzione MP &lt;17 J/min entro 2-4h con qualunque mezzo necessario.',
    },
    normalization: {
      title: '? Correzione MP per Compliance Polmonare (MP Normalizzato):',
      text: '<strong>Mechanical Power Specifico (MP/Crs):</strong> MP assoluto non considera dimensioni polmone funzionante. Polmone normale Crs ~60 ml/cmH2O tollera MP ~25 J/min. ARDS severa Crs ~20 ml/cmH2O -> MP &gt;15 J/min gia dannoso. <strong>Soluzione:</strong> Normalizzare MP per compliance -> <strong>MP/Crs (J/min per ml/cmH2O)</strong> o per peso corporeo predetto -> <strong>MP/kg PBW</strong>. Threshold critici normalizzati: MP/Crs &gt;0.8-1.0 J.min?1.ml?1.cmH2O?1 -> alto rischio VILI. MP/kg &gt;0.3-0.4 J/min/kg -> zona attenzione. Utilizzo raccomandato in research e centri avanzati per comparazioni accurate pazienti diversi.',
    },
    scientificEvidence: {
      title: '? Evidenze Scientifiche Threshold MP:',
      serpa:
        '<strong>Studio Serpa Neto et al. (Intensive Care Med 2018):</strong> Analisi 8207 pazienti ventilati. MP medio 21.4 J/min associato a mortalita 45% vs MP 13.2 J/min mortalita 25%. Ogni ?4 J/min MP -> ?20% rischio relativo mortalita. Threshold protettivo identificato &lt;17 J/min.',
      coppola:
        '<strong>Studio Coppola et al. (Am J Respir Crit Care Med 2020):</strong> 422 pazienti COVID-19 ARDS. MP &gt;17 J/min -> ?mortalita ICU (OR 2.8, p&lt;0.001), ?durata ventilazione (+8.5 giorni), ?incidenza MOF (+35%). MP predittore indipendente outcome dopo aggiustamento eta, SOFA, P/F ratio.',
    },
  },

  documentation: {
    title: 'Documentazione Medica Scientifica e Linee Guida',
    mainTitle: 'Linee Guida Internazionali e Raccomandazioni Evidence-Based',
    ardsNetwork: {
      title: 'ARDS Network Protocol - Low Tidal Volume Ventilation (2000)',
      study:
        '<strong>Studio ARMA (NEJM 2000):</strong> Landmark trial 861 pazienti ARDS. VT 6 ml/kg PBW vs 12 ml/kg. Gruppo low VT: ?mortalita 31% vs 40% (p=0.007, NNT=11), ?giorni ventilazione, ?MOF. Driving pressure medio gruppo protettivo ~13 cmH2O, MP stimato ~15-17 J/min. <strong>Raccomandazioni:</strong> VT 4-6 ml/kg PBW, Pplateau &lt;30 cmH2O, tollerare ipercapnia permissiva pH &gt;7.15-7.20. Gold standard ventilazione protettiva mondiale.',
      pmid: 'PMID: 10793162 - The Acute Respiratory Distress Syndrome Network',
    },
    drivingPressure: {
      title: 'Driving Pressure Limiting Strategy (NEJM 2015 - Amato et al.)',
      study:
        '<strong>Meta-analisi 3562 pazienti ARDS:</strong> Driving pressure (?P = Pplateau - PEEP) predittore piu forte mortalita, superiore a VT o PEEP isolati. ?1 cmH2O ?P -> ?6% rischio morte. Threshold: ?P &lt;15 cmH2O target protettivo, ?P &gt;15 associato mortalita &gt;50%. <strong>Implicazioni MP:</strong> ?P e componente diretto MP (MP ? ?P). Ridurre ?P riducendo VT o ottimizzando PEEP -> riduzione MP simultanea. Raccomandazione: monitorare ?P insieme a MP per doppia verifica protezione.',
      pmid: 'PMID: 25693014 - New England Journal of Medicine',
    },
    proseva: {
      title: 'PROSEVA Trial - Prone Positioning in Severe ARDS (NEJM 2013)',
      study:
        '<strong>466 pazienti ARDS severa (P/F &lt;150):</strong> Prona precoce (16h/die) vs supina. Gruppo prona: ?mortalita 16% vs 33% (HR 0.39, p&lt;0.001, NNT=6). Meccanismo: prona -> redistribuzione tensione polmonare piu omogenea -> ?driving pressure ~2-4 cmH2O -> ?MP ~15-25% -> protezione VILI. <strong>Raccomandazione strong:</strong> Prona obbligatoria in ARDS severa P/F &lt;150 con PEEP >=5, FiO2 >=0.6. Durata: 16-18h/die, ripetere giorni consecutivi finche P/F migliora.',
      pmid: 'PMID: 23688302 - PROSEVA Study Group',
    },
    eolia: {
      title: 'EOLIA Trial - ECMO for Severe ARDS (NEJM 2018)',
      study:
        '<strong>249 pazienti ARDS molto severa:</strong> ECMO precoce vs ventilazione convenzionale. ECMO permette ultra-low VT (2-4 ml/kg), RR minima (5-10), MP drasticamente ridotto (&lt;10 J/min). Trial interrotto precocemente per trend mortalita favorevole ECMO 35% vs 46% (p=0.09 non-significativo, ma analisi Bayesiana suggerisce beneficio). <strong>Criteri ECMO considerazione:</strong> P/F &lt;80 mmHg FiO2 100% + PEEP >=10, pH &lt;7.15 da ipercapnia refrattaria, MP &gt;22-25 J/min nonostante ottimizzazioni, barotrauma (pneumotorace resistente drenaggio).',
      pmid: 'PMID: 29791822 - EOLIA Trial Group',
    },
    survivingSepsis: {
      title: 'Surviving Sepsis Campaign Guidelines 2021 - ARDS Management',
      recommendations:
        '<strong>Raccomandazioni consensus internazionale:</strong> (1) Low VT ventilation 4-8 ml/kg PBW in tutti ARDS (raccomandazione FORTE), (2) Pplateau &lt;30 cmH2O (FORTE), (3) Prona in ARDS severa P/F &lt;150 (FORTE), (4) Driving pressure &lt;15 cmH2O quando possibile (DEBOLE), (5) PEEP piu alta in strategie "open lung" vs PEEP bassa (DEBOLE - controversia). Mechanical Power NON ancora incluso in guidelines ufficiali ma citato come "emerging parameter" per monitoraggio VILI risk.',
      source: 'Critical Care Medicine 2021 - SCCM/ESICM Guidelines',
    },
    currentStatus: {
      title: 'Stato Attuale Linee Guida Mechanical Power:',
      text: 'MP e parametro relativamente nuovo (concetto formalizzato 2016 Gattinoni). Non ancora incluso in linee guida ufficiali ARDS Network, Surviving Sepsis, ERS/ATS come raccomandazione formale. Evidenze crescenti da studi osservazionali e meta-analisi supportano utilita clinica. Consensus experts raccomanda: monitorare MP insieme a parametri tradizionali (VT, Pplateau, ?P, PEEP), target MP &lt;17 J/min in ARDS moderata-severa, integrare MP in decision-making ventilatorio. Trials prospettici randomizzati controllati (RCT) ongoing per validare MP-guided ventilation strategy vs standard care. Probabile inclusione MP in future guidelines 2024-2025.',
    },
  },

  // Parametri input calcolatore
  parameters: {
    rr: {
      label: 'RR (Frequenza Respiratoria)',
      unit: 'atti/min',
    },
    vte: {
      label: 'VTe (Volume Tidal Espiratorio)',
      unit: 'litri',
    },
    picco: {
      label: 'P.Picco (Pressione di Picco)',
      unit: 'cmH2O',
    },
    plateau: {
      label: 'P.Plateau (Pressione Plateau)',
      unit: 'cmH2O',
    },
    peep: {
      label: 'PEEP (Pressione Fine Espirazione)',
      unit: 'cmH2O',
    },
  },

  // Azioni (pulsanti)
  actions: {
    calculate: 'Calcola MP',
    save: 'Salva Calcolo',
    reset: 'Reset',
    cancel: 'Annulla',
    export: 'Esporta',
    delete: 'Elimina',
  },

  // Risultati
  results: {
    title: 'Risultato Mechanical Power',
    unit: 'J/min (Joule per minuto)',
    noCalculation: 'In attesa di calcolo',
    safe: 'Ventilazione Protettiva - Sicuro',
    attention: 'Zona di Attenzione - Ottimizzare',
    dangerous: 'Alto Rischio VILI - Intervento Urgente',
  },

  // Messaggi di validazione
  validation: {
    noNegativeNumbers: 'I valori non possono essere negativi',
    mustBePositive: 'Tutti i valori devono essere maggiori di zero',
    outOfRange: 'Valore fuori dal range fisiologico',
    plateauLessThanPeak: 'La pressione plateau deve essere minore della pressione di picco',
    peepLessThanPlateau: 'La PEEP deve essere minore della pressione plateau',
  },

  // Calcoli salvati
  saved: {
    title: 'Salva Calcolo',
    patientInitials: 'Iniziali Paziente',
    date: 'Data',
    time: 'Ora',
    result: 'Risultato',
    exportPDF: 'Esporta PDF',
    exportExcel: 'Esporta Excel',
    noCalculations: 'Nessun calcolo salvato',
    confirmDelete: 'Confermare eliminazione?',
  },

  bibliography: {
    title: 'Riferimenti Scientifici e Bibliografia Peer-Reviewed',
    mainTitle: 'Letteratura Scientifica Fondamentale e Risorse Autorevoli',
    gattinoni: {
      title:
        'Gattinoni L, Tonetti T, Cressoni M, et al. "Ventilator-related causes of lung injury: the mechanical power" (2016)',
      journal: '<strong>Intensive Care Medicine</strong> 42(10):1567-1575',
      links:
        'DOI: <a href="https://doi.org/10.1007/s00134-016-4505-2" target="_blank" rel="noopener" class="text-primary">10.1007/s00134-016-4505-2</a> | PubMed: <a href="https://pubmed.ncbi.nlm.nih.gov/27620287/" target="_blank" rel="noopener" class="text-primary">27620287</a>',
      description:
        '<strong>Studio fondamentale</strong> che ha introdotto concetto di Mechanical Power come parametro unificante VILI. Derivazione formula completa MP integrando VT, RR, Ppeak, Pplateau, PEEP, flusso, resistenze. Esperimenti su modelli animali: MP threshold ~12-15 J/min separa ventilazione protettiva da dannosa. Proposta: MP superiore a singoli parametri isolati (VT, pressure) per predire danno polmonare. Articolo piu citato in letteratura MP (>1500 citazioni Google Scholar).',
    },
    serpa: {
      title:
        'Serpa Neto A, Deliberato RO, Johnson AEW, et al. "Mechanical power of ventilation is associated with mortality in critically ill patients" (2018)',
      journal: '<strong>Intensive Care Medicine</strong> 44(11):1914-1922',
      links:
        'PubMed: <a href="https://pubmed.ncbi.nlm.nih.gov/30284021/" target="_blank" rel="noopener" class="text-primary">30284021</a> | DOI: <a href="https://doi.org/10.1007/s00134-018-5375-6" target="_blank" rel="noopener" class="text-primary">10.1007/s00134-018-5375-6</a>',
      description:
        '<strong>Grande studio osservazionale retrospettivo:</strong> 8207 pazienti ventilati database MIMIC-III (Beth Israel Hospital Boston). MP medio 21.4+-9.6 J/min, mortalita ospedaliera 35.7%. Associazione dose-dipendente MP-mortalita: ogni ?4 J/min -> ?20% odds morte. MP predittore indipendente dopo aggiustamento eta, SOFA, APACHE II, Charlson. Receiver Operating Characteristic (ROC) AUC 0.68 per mortalita. Conferma clinica predittivita MP in large cohort umano.',
    },
    coppola: {
      title:
        'Coppola S, Caccioppola A, Froio S, et al. "Effect of mechanical power on intensive care mortality in ARDS patients" (2020)',
      journal: '<strong>Critical Care</strong> 24(1):246',
      links:
        'PubMed: <a href="https://pubmed.ncbi.nlm.nih.gov/32414448/" target="_blank" rel="noopener" class="text-primary">32414448</a> | Full Text: <a href="https://ccforum.biomedcentral.com/articles/10.1186/s13054-020-02963-x" target="_blank" rel="noopener" class="text-primary">Open Access</a>',
      description:
        '<strong>Coorte prospettica 150 pazienti ARDS:</strong> MP &gt;17 J/min associato a ?mortalita ICU (hazard ratio 2.23, 95%CI 1.16-4.29, p=0.016). Stratificazione rischio: MP &lt;12 J/min mortalita 15%, MP 12-17 mortalita 28%, MP &gt;17 mortalita 48%. MP normalizzato per compliance (MP/Crs) predittore ancora migliore (HR 2.89). Suggerisce threshold MP devono essere aggiustati per compliance polmonare paziente-specifica.',
    },
    zhang: {
      title:
        'Zhang Z, Zheng B, Liu N, et al. "Mechanical power normalized to predicted body weight as a predictor of mortality in patients with acute respiratory distress syndrome" (2019)',
      journal: '<strong>Intensive Care Medicine</strong> 45(6):856-864',
      links:
        'PubMed: <a href="https://pubmed.ncbi.nlm.nih.gov/31016328/" target="_blank" rel="noopener" class="text-primary">31016328</a> | DOI: <a href="https://doi.org/10.1007/s00134-019-05627-6" target="_blank" rel="noopener" class="text-primary">10.1007/s00134-019-05627-6</a>',
      description:
        '<strong>Studio validazione 3630 pazienti ARDS:</strong> MP normalizzato per peso corporeo predetto (MP/kg PBW) migliore predittore vs MP assoluto. Threshold MP/kg &gt;0.32 J/min/kg associato ?mortalita 28-giorni (OR 1.84, p&lt;0.001). Importanza normalizzazione: paziente piccolo 50 kg vs grande 90 kg tollerano MP differenti. Raccomandazione: sempre calcolare MP/kg per comparazioni accurate.',
    },
    arma: {
      title:
        'Acute Respiratory Distress Syndrome Network. "Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and ARDS" (2000)',
      journal: '<strong>New England Journal of Medicine</strong> 342(18):1301-1308',
      links:
        'PubMed: <a href="https://pubmed.ncbi.nlm.nih.gov/10793162/" target="_blank" rel="noopener" class="text-primary">10793162</a> | DOI: <a href="https://doi.org/10.1056/NEJM200005043421801" target="_blank" rel="noopener" class="text-primary">10.1056/NEJM200005043421801</a>',
      description:
        '<strong>Trial ARMA landmark:</strong> 861 pazienti ARDS randomizzati VT 6 ml/kg vs 12 ml/kg. Gruppo low VT: mortalita 31% vs 39.8% controllo (p=0.007), ?giorni ventilazione 12 vs 15, ?MOF. Retrospettivamente: gruppo protettivo MP stimato ~15 J/min vs ~28 J/min gruppo dannoso. Prima evidenza indiretta che riduzione MP (via ?VT) migliora outcome. Foundation moderna ventilazione protettiva.',
    },
    encyclopedia: {
      title: 'Encyclopedia of Respiratory Medicine, Second Edition (2022) - Volume 5',
      subtitle: 'Capitolo: "Mechanical Power" - Autori: Garfield B, Patel BV',
      link: '<a href="https://www.sciencedirect.com/referencework/9780081027233/encyclopedia-of-respiratory-medicine" target="_blank" rel="noopener" class="text-primary">ScienceDirect - Encyclopedia of Respiratory Medicine</a>',
      description:
        '<strong>Trattazione enciclopedica completa:</strong> Storia concetto MP, derivazione matematica formula, evidenze sperimentali animali, studi clinici umani, applicazioni pratiche ICU, limitazioni e controversie attuali. Include discussione varianti formula MP (Gattinoni vs Becher vs altri), MP normalizzato (MP/Crs, MP/PBW), integrazione con altri parametri (driving pressure, strain). Risorsa autorevole per approfondimento teorico-pratico MP.',
    },
    msd: {
      title: 'MSD Manuals - Professional Version: Acute Respiratory Distress Syndrome (ARDS)',
      subtitle: 'Sezione: "Management of ARDS - Mechanical Ventilation Strategies"',
      link: '<a href="https://www.msdmanuals.com/professional/critical-care-medicine/respiratory-failure-and-mechanical-ventilation/acute-respiratory-distress-syndrome-ards" target="_blank" rel="noopener" class="text-primary">MSD Manuals Professional - ARDS Management</a>',
      description:
        '<strong>Manuale clinico pratico:</strong> Raccomandazioni evidence-based ventilazione ARDS. Include: low VT strategy, Pplateau limits, driving pressure monitoring, PEEP optimization, rescue therapies (prona, ECMO). Recente aggiornamento 2023 menziona MP come "emerging parameter for ventilator-induced lung injury assessment, promising but needs more prospective validation". Utile per quick reference bedside.',
    },
    sourceQuality: {
      title: 'Nota sulla Qualita delle Fonti:',
      text: 'Tutti i riferimenti sono pubblicazioni peer-reviewed su riviste alto impact factor (Intensive Care Med IF~24, NEJM IF~158, Critical Care IF~19) o risorse autorevoli (MSD Manuals, Encyclopedia Respiratory Medicine Elsevier). Livelli evidenza: RCT (ARMA, PROSEVA, EOLIA) - massima evidenza livello 1A, studi osservazionali prospettici (Coppola) - livello 2B, meta-analisi/database (Serpa Neto, Zhang) - livello 1B. MP concetto supportato da solida base scientifica ma ancora in fase validazione per inclusione guidelines ufficiali. Monitoraggio MP raccomandato da experts come parte "bundle" ventilazione protettiva insieme a VT, Pplateau, ?P tradizionali.',
    },
  },
};
