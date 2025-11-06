/** * @file MechanicalPowerCalculator.vue * @description Componente calcolatore Mechanical Power
(estratto da MechanicalPowerPage) * @author Vasile Chifeac * @created 2025-11-06 * @modified
2025-01-XX (Expanded medical documentation per CODING_STANDARDS.md) * * Mechanical Power Calculator
- Energia trasferita dal ventilatore al polmone (predittore VILI) * @reference Gattinoni et al.
(2016) Intensive Care Medicine 42(10):1567-1575 * @reference Encyclopedia of Respiratory Medicine
(Second Edition), Volume 5, 2022 */
<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-orange-1 text-orange-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="warning" color="orange" />
      </template>
      <div class="text-body2">
        <strong>Mechanical Power (MP):</strong> Energia totale per minuto erogata dal ventilatore al
        parenchima polmonare. Integra pressione, volume, flusso e frequenza respiratoria in un unico
        parametro predittivo di <strong>VILI (Ventilator-Induced Lung Injury)</strong>. Target:
        &lt;17 J/min per ventilazione protettiva.
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="edit" class="q-mr-xs" />
              Parametri Ventilatori
            </div>

            <!-- RR -->
            <q-input
              v-model.number="formData.RR"
              type="number"
              label="RR (Frequenza Respiratoria)"
              suffix="atti/min"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="speed" color="blue" size="sm" />
              </template>
            </q-input>

            <!-- VTe -->
            <q-input
              v-model.number="formData.VTe"
              type="number"
              step="0.01"
              label="VTe (Volume Tidal Espiratorio)"
              suffix="litri"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="green" size="sm" />
              </template>
            </q-input>

            <!-- P.Picco -->
            <q-input
              v-model.number="formData.Picco"
              type="number"
              label="P.Picco (Pressione di Picco)"
              suffix="cmH2O"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="trending_up" color="orange" size="sm" />
              </template>
            </q-input>

            <!-- P.Plateau -->
            <q-input
              v-model.number="formData.Plateau"
              type="number"
              label="P.Plateau (Pressione di Plateau)"
              suffix="cmH2O"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="horizontal_rule" color="purple" size="sm" />
              </template>
            </q-input>

            <!-- PEEP -->
            <q-input
              v-model.number="formData.PeeP"
              type="number"
              label="PEEP (Pressione Fine Espirazione)"
              suffix="cmH2O"
              outlined
              dense
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="trending_down" color="red" size="sm" />
              </template>
            </q-input>

            <!-- Bottoni -->
            <q-btn
              @click="calculateMP"
              color="primary"
              size="md"
              class="full-width q-mb-xs"
              icon="calculate"
              :disable="!isFormValid"
            >
              Calcola MP
            </q-btn>

            <q-btn
              @click="resetForm"
              color="negative"
              size="sm"
              class="full-width"
              icon="refresh"
              outline
            >
              Reset
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pannello Risultati -->
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="speed" class="q-mr-xs" />
              Risultati
            </div>

            <!-- Risultato -->
            <div class="text-center q-mb-md">
              <div class="text-h4 text-primary">
                {{ result.toFixed(2) }}
              </div>
              <div class="text-caption text-grey-7">J/min (Joule per minuto)</div>
            </div>

            <!-- Interpretazione -->
            <div class="q-mb-sm">
              <q-chip
                :color="getInterpretationColor()"
                text-color="white"
                class="full-width text-center"
              >
                {{ getInterpretation() }}
              </q-chip>
            </div>

            <!-- 🎯 Interpretazione Clinica Dettagliata -->
            <q-expansion-item
              icon="warning"
              label="🎯 Interpretazione Clinica Dettagliata"
              dense
              default-opened
              class="text-primary text-weight-bold"
            >
              <q-list dense class="bg-grey-1">
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="green" name="check_circle" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>&lt; 17 J/min</strong> - Ventilazione Protettiva
                    </q-item-label>
                    <q-item-label caption class="text-grey-7">
                      Strategia ventilatoria ottimale. Continuare monitoraggio compliance dinamica,
                      EGA (PaO₂/FiO₂, PaCO₂), e valutazione clinica del paziente. Energia trasferita
                      al polmone è minima, riducendo stress meccanico e biotrauma.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon color="orange" name="warning" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>17-22 J/min</strong> - Zona di Attenzione (Ottimizzazione Necessaria)
                    </q-item-label>
                    <q-item-label caption class="text-grey-7">
                      Rischio intermedio di VILI. <strong>Azioni</strong>: Ridurre RR se tollerata
                      ipercapnia permissiva (pH &gt;7.20), limitare driving pressure (ΔP = Pplateau
                      - PEEP) a &lt;15 cmH₂O, rivalutare PEEP ottimale con recruiting maneuvers o
                      EIT. Monitorare marcatori infiammatori se disponibili.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon color="red" name="dangerous" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>
                      <strong>&gt; 22 J/min</strong> - Alto Rischio VILI (Intervento Urgente)
                    </q-item-label>
                    <q-item-label caption class="text-grey-7">
                      <strong>URGENTE</strong>: Energia eccessiva trasferita al polmone, alto
                      rischio di barotrauma, volutrauma, atelectrauma e biotrauma.
                      <strong>Interventi immediati</strong>: Ridurre VT a 4-6 ml/kg PBW (peso
                      ideale), abbassare RR tollerando ipercapnia (target pH &gt;7.15), rivalutare
                      PEEP, considerare posizione prona (PP) se P/F &lt;150, valutare ECMO se ARDS
                      severa persistente.
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>

            <!-- Definizione e Significato Clinico -->
            <q-expansion-item
              icon="school"
              label="Definizione e Significato Clinico"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">Cos'è il Mechanical Power?</div>
                <div class="text-caption text-grey-8 q-mb-sm">
                  Il <strong>Mechanical Power (MP)</strong> rappresenta l'<strong
                    >energia totale per minuto</strong
                  >
                  trasferita dal ventilatore meccanico al sistema respiratorio del paziente. È
                  espresso in
                  <strong>Joule per minuto (J/min)</strong> e integra in un unico parametro tutti i
                  componenti della ventilazione che contribuiscono al danno polmonare:
                </div>

                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Pressione</strong>: Pressione di picco, plateau, driving pressure
                        (ΔP)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Volume</strong>: Volume tidal (VT), capacità residua funzionale
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Flusso</strong>: Velocità di insufflazione, resistenze delle vie
                        aeree
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Frequenza respiratoria (RR)</strong>: Numero di cicli al minuto
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-sm">Perché è importante il MP?</div>
                <div class="text-caption text-grey-8">
                  I parametri tradizionali (Pplateau, VT, PEEP) valutano
                  <strong>componenti isolati</strong> della ventilazione. Il MP è un
                  <strong>parametro integrativo</strong> che riflette l'<strong
                    >energia globale</strong
                  >
                  trasferita al parenchima polmonare in ogni minuto di ventilazione meccanica.
                  Maggiore è l'energia trasferita, maggiore è il rischio di
                  <strong>VILI (Ventilator-Induced Lung Injury)</strong> attraverso quattro
                  meccanismi principali:
                </div>

                <q-list dense class="q-pl-md q-mt-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Barotrauma</strong>: Lesioni da alte pressioni (pneumotorace,
                        pneumomediastino)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Volutrauma</strong>: Sovradistensione alveolare da volumi eccessivi
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Atelectrauma</strong>: Stress da ciclico reclutamento/dereclutamento
                        alveolare
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Biotrauma</strong>: Rilascio di mediatori infiammatori (citokine
                        IL-6, IL-8, TNF-α)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-expansion-item>

            <!-- Ventilazione Protettiva vs Dannosa -->
            <q-expansion-item
              icon="compare_arrows"
              label="Ventilazione Protettiva vs Ventilazione Dannosa"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold text-positive q-mb-sm">
                  ✅ Ventilazione Protettiva (MP &lt;17 J/min)
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  Strategia che minimizza l'energia trasferita al polmone riducendo il rischio di
                  VILI:
                </div>
                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Volume Tidal basso</strong>: 4-6 ml/kg PBW (peso corporeo ideale)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Driving Pressure limitata</strong>: ΔP (Pplateau - PEEP) &lt;15
                        cmH₂O
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Pressione di Plateau</strong>: &lt;30 cmH₂O (ideale &lt;28 cmH₂O)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>PEEP ottimale</strong>: Bilanciato per reclutamento alveolare senza
                        sovradistensione
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Ipercapnia permissiva</strong>: Tollerare PaCO₂ elevata (pH
                        &gt;7.20) per ridurre VT/RR
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold text-negative q-mb-sm">
                  ❌ Ventilazione Dannosa (MP &gt;22 J/min)
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  Trasferimento eccessivo di energia che aumenta drammaticamente il rischio di VILI:
                </div>
                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Volume Tidal elevato</strong>: &gt;8 ml/kg PBW (sovradistensione
                        alveolare)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Driving Pressure eccessiva</strong>: ΔP &gt;15 cmH₂O (stress
                        meccanico intenso)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Frequenza respiratoria alta</strong>: &gt;35-40 atti/min senza
                        indicazione clinica
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>PEEP inadeguata</strong>: Troppo bassa (atelectrauma) o troppo alta
                        (sovradistensione)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="dangerous" color="negative" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Risposta infiammatoria</strong>: Aumento citokine pro-infiammatorie,
                        MODS (sindrome disfunzione multiorgano)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-caption text-grey-7">
                  <strong>💡 Concetto Chiave</strong>: Mentre parametri come Pplateau o ΔP valutano
                  singoli aspetti, il MP integra <strong>dinamicamente</strong> tutti i fattori che
                  contribuiscono al danno. Due pazienti con stesso Pplateau possono avere MP diversi
                  a seconda di RR, VT, e pattern respiratorio.
                </div>
              </div>
            </q-expansion-item>

            <!-- Come si Calcola il Mechanical Power -->
            <q-expansion-item
              icon="calculate"
              label="Come si Calcola il Mechanical Power"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">
                  Origine della Formula di Gattinoni
                </div>
                <div class="text-caption text-grey-8 q-mb-sm">
                  Il Mechanical Power deriva dall'<strong>equazione del moto respiratorio</strong>,
                  che descrive le forze necessarie per muovere aria dentro e fuori dai polmoni
                  durante la ventilazione meccanica:
                </div>

                <div class="bg-white q-pa-xs q-mb-sm">
                  <div class="text-caption text-grey-8 text-center">
                    <strong>P(t) = E × V(t) + R × Flow(t) + P₀</strong>
                  </div>
                </div>

                <div class="text-caption text-grey-8 q-mb-xs">Dove:</div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>P(t)</strong> = Pressione istantanea nelle vie aeree
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>E</strong> = Elastanza del sistema respiratorio (inverso della
                        compliance)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>V(t)</strong> = Volume istantaneo
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>R</strong> = Resistenza delle vie aeree
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Flow(t)</strong> = Flusso istantaneo
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>P₀</strong> = Pressione basale (PEEP)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-caption text-grey-8 q-mb-sm">
                  <strong>Gattinoni et al. (2016)</strong> hanno integrato questa equazione su un
                  intero ciclo respiratorio e moltiplicato per la frequenza respiratoria per
                  ottenere l'<strong>energia per minuto</strong>. La formula semplificata risultante
                  è:
                </div>

                <div class="bg-white q-pa-sm q-mb-sm">
                  <div class="text-body2 text-grey-8 text-center">
                    <strong
                      >MP = 0.098 × RR × VT<sub>e</sub> × (P<sub>picco</sub> - 0.5 × ΔP)</strong
                    >
                  </div>
                </div>

                <div class="text-caption text-grey-8 q-mb-sm">
                  Dove <strong>ΔP = P<sub>plateau</sub> - PEEP</strong> (driving pressure).
                </div>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-sm">Perché il coefficiente 0.098?</div>
                <div class="text-caption text-grey-8">
                  Il coefficiente <strong>0.098</strong> deriva dalla conversione delle unità di
                  misura. L'energia è calcolata come <strong>Lavoro = Pressione × Volume</strong>.
                  Per convertire da cmH₂O × litri a Joule (J), si usa il fattore di conversione
                  0.098:
                </div>
                <div class="bg-white q-pa-xs q-my-xs">
                  <div class="text-caption text-grey-8 text-center">
                    1 cmH₂O × 1 litro = 0.098 Joule
                  </div>
                </div>
                <div class="text-caption text-grey-8">
                  Moltiplicando per RR (cicli/min) si ottiene l'energia totale per minuto (J/min).
                </div>
              </div>
            </q-expansion-item>

            <!-- 🧮 Formula Dettagliata -->
            <q-expansion-item
              icon="functions"
              label="🧮 Formula Dettagliata e Componenti"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm text-center">Formula Completa</div>

                <div class="bg-primary text-white q-pa-sm q-mb-sm">
                  <div class="text-body1 text-center">
                    MP = 0.098 × RR × VT<sub>e</sub> × (P<sub>picco</sub> - 0.5 × ΔP)
                  </div>
                </div>

                <div class="text-caption text-grey-8 q-mb-sm">
                  <strong>Breakdown dei componenti:</strong>
                </div>

                <q-list dense class="q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="blue" text-color="white" dense>RR</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Frequenza Respiratoria</strong> (atti/min): Numero di cicli
                        respiratori al minuto. Maggiore RR = maggiore energia cumulativa trasferita
                        nell'unità di tempo.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="green" text-color="white" dense>VTe</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Volume Tidal Espiratorio</strong> (litri): Volume di aria
                        mobilizzato per ogni atto. Maggiore VT = maggiore distensione alveolare e
                        stress meccanico.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="orange" text-color="white" dense
                        >P<sub>picco</sub></q-chip
                      >
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Pressione di Picco</strong> (cmH₂O): Pressione massima raggiunta
                        durante insufflazione. Include componente elastica + resistiva del sistema
                        respiratorio.
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="purple" text-color="white" dense>ΔP</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Driving Pressure</strong> (cmH₂O): ΔP = P<sub>plateau</sub> - PEEP.
                        Rappresenta la pressione necessaria per distendere gli alveoli. È il
                        parametro più correlato a mortalità in ARDS (Amato et al., NEJM 2015).
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="grey-7" text-color="white" dense>0.098</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Coefficiente di conversione</strong>: Converte cmH₂O × litri in
                        Joule (J).
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-sm">Esempio Pratico di Calcolo</div>

                <div class="bg-white q-pa-sm q-mb-xs">
                  <div class="text-caption text-grey-8">
                    <strong>Paziente con ARDS moderata</strong>:
                  </div>
                  <q-list dense class="q-pl-md">
                    <q-item dense>
                      <q-item-section>
                        <q-item-label caption>RR = 25 atti/min</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label caption
                          >VTe = 0.40 litri (400 ml, ~6 ml/kg per 70 kg)</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label caption>P<sub>picco</sub> = 30 cmH₂O</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label caption>P<sub>plateau</sub> = 26 cmH₂O</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense>
                      <q-item-section>
                        <q-item-label caption>PEEP = 12 cmH₂O</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>

                  <div class="text-caption text-grey-8 q-mt-xs">
                    <strong>Step 1</strong>: Calcolare ΔP = 26 - 12 = <strong>14 cmH₂O</strong>
                  </div>
                  <div class="text-caption text-grey-8">
                    <strong>Step 2</strong>: MP = 0.098 × 25 × 0.40 × (30 - 0.5 × 14)
                  </div>
                  <div class="text-caption text-grey-8">
                    <strong>Step 3</strong>: MP = 0.098 × 25 × 0.40 × (30 - 7)
                  </div>
                  <div class="text-caption text-grey-8">
                    <strong>Step 4</strong>: MP = 0.098 × 25 × 0.40 × 23
                  </div>
                  <div class="text-caption text-grey-8 text-weight-bold">
                    <strong>Risultato</strong>: MP = <strong>22.54 J/min</strong> →
                    <span class="text-negative">Alto rischio VILI</span>
                  </div>
                </div>

                <div class="text-caption text-grey-7 q-mt-sm">
                  <strong>💡 Azione Clinica</strong>: Questo paziente è sopra la soglia di
                  sicurezza. Ridurre RR a 20 atti/min (tollerando ipercapnia permissiva) ridurrebbe
                  MP a ~18 J/min, entrando nella zona di attenzione.
                </div>
              </div>
            </q-expansion-item>

            <!-- 🔬 Analisi Dettagliata e Applicazioni Cliniche -->
            <q-expansion-item
              icon="science"
              label="🔬 Analisi Dettagliata e Applicazioni Cliniche"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">
                  🏥 Utilizzo Clinico del Mechanical Power
                </div>

                <!-- ARDS/ALI -->
                <div class="text-body2 text-weight-bold text-primary q-mb-xs">
                  1️⃣ ARDS/ALI (Acute Respiratory Distress Syndrome)
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Contesto</strong>: ARDS è caratterizzata da edema polmonare non
                  cardiogeno, ridotta compliance, e <strong>"baby lung"</strong> (solo piccola
                  porzione di polmone aerato). La ventilazione meccanica è salvavita ma può
                  peggiorare il danno se mal gestita.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Target MP</strong>: <strong>&lt;17 J/min</strong> associato a ridotta
                  mortalità in studi osservazionali (Gattinoni et al. 2016, Intensive Care
                  Medicine).
                </div>
                <div class="text-caption text-grey-8 q-mb-xs"><strong>Strategia</strong>:</div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        VT: 4-6 ml/kg PBW (peso corporeo ideale, non reale)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Pplateau &lt;30 cmH₂O (ideale &lt;28)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        ΔP &lt;15 cmH₂O (predittore di mortalità)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Ipercapnia permissiva (pH &gt;7.20, PaCO₂ fino a 60-70 mmHg se tollerata)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        PEEP ottimale con table ARDSnet o recruiting maneuvers
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <!-- Svezzamento -->
                <div class="text-body2 text-weight-bold text-primary q-mb-xs">
                  2️⃣ Svezzamento dalla Ventilazione Meccanica
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Contesto</strong>: Lo svezzamento è il processo di transizione dalla
                  ventilazione meccanica alla respirazione spontanea. Una riduzione progressiva del
                  MP indica miglioramento della meccanica respiratoria.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Indicatori positivi</strong>:
                </div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_down" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Riduzione MP da &gt;20 a &lt;15 J/min nel corso di 48-72h
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_down" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Riduzione RR spontanea con trial a pressione di supporto (PSV)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="trending_down" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Miglioramento compliance (riduzione ΔP per stesso VT)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="text-caption text-grey-8 q-mb-sm">
                  <strong>Protocollo</strong>: Trial di respirazione spontanea (SBT) con T-piece o
                  PSV 5-7 cmH₂O. Se paziente mantiene RR &lt;35, SpO₂ &gt;90%, FC stabile, senza
                  distress → estubazione.
                </div>

                <q-separator class="q-my-sm" />

                <!-- Monitoraggio Continuo -->
                <div class="text-body2 text-weight-bold text-primary q-mb-xs">
                  3️⃣ Monitoraggio Continuo in Terapia Intensiva
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  Il MP è un parametro dinamico che dovrebbe essere calcolato ad ogni modifica dei
                  settaggi ventilatori o deterioramento clinico del paziente.
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Quando ricalcolare MP</strong>:
                </div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Dopo ogni modifica di RR, VT, PEEP, modalità ventilatoria
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Peggioramento ossigenazione (P/F ratio ↓, SpO₂ ↓)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Aumento pressioni vie aeree (resistenze ↑, compliance ↓)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="sync" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Prima e dopo recruiting maneuvers o posizione prona
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="text-caption text-grey-8 q-mb-sm">
                  <strong>Integrazione</strong>: MP dovrebbe essere monitorato insieme a EGA
                  (emogasanalisi), compliance dinamica/statica, EtCO₂, indici ossigenazione (P/F
                  ratio, SpO₂/FiO₂).
                </div>

                <q-separator class="q-my-sm" />

                <!-- Limitazioni -->
                <div class="text-body2 text-weight-bold text-negative q-mb-xs">
                  ⚠️ Limitazioni del Mechanical Power
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  Nonostante sia un parametro promettente, il MP ha alcune limitazioni importanti:
                </div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Non normalizzato per volume polmonare aerato</strong>: In ARDS, solo
                        una frazione del polmone è ventilabile ("baby lung"). Due pazienti con
                        stesso MP ma diverso volume polmonare aerato hanno stress specifico diverso.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Assume linearità pressione-volume</strong>: La relazione P-V è in
                        realtà non lineare, con zone di collasso, zona lineare, e sovradistensione.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Non considera eterogeneità regionale</strong>: Non tiene conto di
                        aree collassate vs iperaerate nello stesso polmone (importante in ARDS
                        disomogenea).
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Thresholds empirici</strong>: I cut-off di 17 e 22 J/min derivano da
                        studi osservazionali, non RCT. Potrebbero variare per popolazione,
                        patologia, età.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-caption text-grey-7">
                  <strong>🔬 Prospettive Future</strong>: Tomografia ad impedenza elettrica (EIT)
                  può stimare il volume polmonare aerato, permettendo di normalizzare MP per
                  ottenere <strong>Specific Mechanical Power</strong> (MP/volume aerato), più
                  preciso nella predizione di VILI.
                </div>

                <q-separator class="q-my-sm" />

                <!-- Riferimenti -->
                <div class="text-body2 text-weight-bold q-mb-xs">📚 Riferimenti Scientifici</div>
                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Gattinoni L, et al.</strong> (2016). "Ventilator-related causes of
                        lung injury: the mechanical power."
                        <em>Intensive Care Medicine</em> 42(10):1567-1575.
                        <span class="text-blue">DOI: 10.1007/s00134-016-4505-2</span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Amato MB, et al.</strong> (2015). "Driving pressure and survival in
                        the acute respiratory distress syndrome."
                        <em>New England Journal of Medicine</em> 372(8):747-755.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Encyclopedia of Respiratory Medicine</strong> (2022), Second
                        Edition, Volume 5. Chapter: "Ventilator-Associated Lung Injury (VALI)."
                        Elsevier.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="article" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Garfield B, Patel BV</strong>. "Mechanical Power" in
                        <em>Encyclopedia of Respiratory Medicine</em> (2022). Discusses dynamic
                        exposure to ventilatory variables and VALI mechanisms.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useResetForm } from 'src/composables/useResetForm';

// ============================================================
// TYPES & INTERFACES
// ============================================================
/**
 * @interface MPFormData
 * @description Dati del form per il calcolo del Mechanical Power
 */
interface MPFormData {
  RR: number | null; // Frequenza Respiratoria (atti/min)
  VTe: number | null; // Volume Tidal Espiratorio (litri)
  Picco: number | null; // Pressione di Picco (cmH2O)
  Plateau: number | null; // Pressione di Plateau (cmH2O)
  PeeP: number | null; // PEEP (cmH2O)
}

// ============================================================
// STATE
// ============================================================
const initialFormData: MPFormData = {
  RR: null,
  VTe: null,
  Picco: null,
  Plateau: null,
  PeeP: null,
};

const formData = ref<MPFormData>({ ...initialFormData });
const result = ref<number>(0);

const { resetForm } = useResetForm(formData, result, initialFormData);

// ============================================================
// COMPUTED
// ============================================================
/**
 * @computed isFormValid
 * @description Verifica che tutti i campi siano compilati con valori validi
 * @returns {boolean} true se form valido
 */
const isFormValid = computed(() => {
  return (
    formData.value.RR !== null &&
    formData.value.RR > 0 &&
    formData.value.VTe !== null &&
    formData.value.VTe > 0 &&
    formData.value.Picco !== null &&
    formData.value.Picco > 0 &&
    formData.value.Plateau !== null &&
    formData.value.Plateau > 0 &&
    formData.value.PeeP !== null &&
    formData.value.PeeP >= 0
  );
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * @function calculateMP
 * @description Calcola il Mechanical Power secondo formula di Gattinoni et al. (2016)
 * @formula MP = 0.098 × RR × VTe × (Picco - 0.5 × ΔP)
 * @returns {void}
 */
const calculateMP = (): void => {
  if (!isFormValid.value) return;

  const { RR, VTe, Picco, Plateau, PeeP } = formData.value;

  // Driving Pressure (ΔP)
  const drivingPressure = Plateau! - PeeP!;

  // Formula Gattinoni: MP = 0.098 × RR × VTe × (Picco - 0.5 × ΔP)
  result.value = 0.098 * RR! * VTe! * (Picco! - 0.5 * drivingPressure);
};

/**
 * @function getInterpretation
 * @description Restituisce interpretazione clinica basata su thresholds VILI
 * @returns {string} Interpretazione testuale
 */
const getInterpretation = (): string => {
  if (result.value === 0) return 'Inserire i parametri';
  if (result.value < 17) return 'Ventilazione Protettiva';
  if (result.value <= 22) return 'Zona di Attenzione - Ottimizzare';
  return 'Alto Rischio VILI - Intervento Urgente';
};

/**
 * @function getInterpretationColor
 * @description Restituisce colore Quasar per interpretazione
 * @returns {string} Nome colore Quasar
 */
const getInterpretationColor = (): string => {
  if (result.value === 0) return 'grey';
  if (result.value < 17) return 'green';
  if (result.value <= 22) return 'orange';
  return 'red';
};
</script>
