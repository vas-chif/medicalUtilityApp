/** * @file QuozienteRespiratorioCalculator.vue * @description Componente calcolatore Quoziente
Respiratorio (RQ = VCO₂/VO₂) * @author Vasile Chifeac * @created 2025-11-06 * @modified 2025-11-06 *
* Respiratory Quotient Calculator - Indicatore metabolico del tipo di substrato energetico
utilizzato */
<template>
  <div class="q-pa-md">
    <!-- Medical Info Banner -->
    <q-banner class="bg-blue-1 text-blue-9 q-mb-md" rounded dense>
      <template v-slot:avatar>
        <q-icon name="info" color="blue" />
      </template>
      <div class="text-body2">
        <strong>Cosa misura il QR:</strong> Indica il <strong>tipo di substrato energetico</strong>
        utilizzato (carboidrati, grassi, proteine), NON l'efficienza respiratoria.
      </div>
    </q-banner>

    <div class="row q-gutter-md">
      <!-- Pannello Input -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-md">
              <q-icon name="edit" class="q-mr-xs" />
              Parametri Ematochimici
            </div>

            <!-- PvCO2 -->
            <q-input
              v-model.number="formData.PvCO2"
              type="number"
              step="0.1"
              label="PvCO2 (CO2 Venosa)"
              suffix="mmHg"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="bloodtype" color="red" size="sm" />
              </template>
            </q-input>

            <!-- PaCO2 -->
            <q-input
              v-model.number="formData.PaCO2"
              type="number"
              step="0.1"
              label="PaCO2 (CO2 Arteriosa)"
              suffix="mmHg"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="bloodtype" color="blue" size="sm" />
              </template>
            </q-input>

            <!-- HB -->
            <q-input
              v-model.number="formData.HB"
              type="number"
              step="0.1"
              label="HB (Emoglobina)"
              suffix="g/dL"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="science" color="purple" size="sm" />
              </template>
            </q-input>

            <!-- SaO2 -->
            <q-input
              v-model.number="formData.SaO2"
              type="number"
              step="0.1"
              label="SaO2 (Saturazione O2 Arteriosa)"
              suffix="%"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val) => (val >= 0 && val <= 100) || 'Valore 0-100%']"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="green" size="sm" />
              </template>
            </q-input>

            <!-- SvO2 -->
            <q-input
              v-model.number="formData.SvO2"
              type="number"
              step="0.1"
              label="SvO2 (Saturazione O2 Venosa)"
              suffix="%"
              outlined
              dense
              class="q-mb-sm"
              :rules="[(val) => (val >= 0 && val <= 100) || 'Valore 0-100%']"
            >
              <template v-slot:prepend>
                <q-icon name="air" color="orange" size="sm" />
              </template>
            </q-input>

            <!-- PaO2 -->
            <q-input
              v-model.number="formData.PaO2"
              type="number"
              step="0.1"
              label="PaO2 (Pressione O2 Arteriosa)"
              suffix="mmHg"
              outlined
              dense
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="device_thermostat" color="cyan" size="sm" />
              </template>
            </q-input>

            <!-- PvO2 -->
            <q-input
              v-model.number="formData.PvO2"
              type="number"
              step="0.1"
              label="PvO2 (Pressione O2 Venosa)"
              suffix="mmHg"
              outlined
              dense
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="device_thermostat" color="teal" size="sm" />
              </template>
            </q-input>

            <!-- Bottoni -->
            <q-btn
              @click="calculateQR"
              color="primary"
              size="md"
              class="full-width q-mb-xs"
              icon="calculate"
              :disable="!isFormValid"
            >
              Calcola QR
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
              <q-icon name="analytics" class="q-mr-xs" />
              Risultati
            </div>

            <!-- Risultato -->
            <div class="text-center q-mb-md">
              <div class="text-h4 text-primary">
                {{ result.toFixed(3) }}
              </div>
              <div class="text-caption text-grey-7">Quoziente Respiratorio (RQ)</div>
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

            <!-- Alert critici -->
            <q-banner v-if="result > 1.2" class="bg-red-1 text-red-9 q-mb-xs" rounded dense>
              <template v-slot:avatar>
                <q-icon name="warning" color="red" size="sm" />
              </template>
              <div class="text-caption">
                <strong>ATTENZIONE:</strong> QR &gt; 1.2 → Metabolismo anaerobico. Verificare
                lattato e perfusione.
              </div>
            </q-banner>

            <q-banner
              v-if="result < 0.7 && result > 0"
              class="bg-orange-1 text-orange-9"
              rounded
              dense
            >
              <template v-slot:avatar>
                <q-icon name="info" color="orange" size="sm" />
              </template>
              <div class="text-caption">
                <strong>NOTA:</strong> QR &lt; 0.7 → Utilizzo prevalente grassi/chetoni.
              </div>
            </q-banner>

            <!-- Definizione e Significato Clinico -->
            <q-expansion-item
              icon="school"
              label="Definizione e Significato Clinico"
              dense
              default-opened
              class="q-mt-xs text-primary text-weight-bold"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">
                  Cos'è il Quoziente Respiratorio (QR)?
                </div>
                <div class="text-caption text-grey-8 q-mb-sm">
                  Il QR è il <strong>rapporto tra l'anidride carbonica (CO₂) prodotta e l'ossigeno (O₂) consumato</strong>, 
                  spesso calcolato come <strong>VCO₂/VO₂</strong>. Questo valore indica il 
                  <strong>tipo di metabolismo energetico</strong> in atto nell'organismo, fornendo informazioni 
                  <strong>indirette sul tipo di metabolismo</strong> (aerobico o anaerobico).
                </div>

                <div class="text-body2 text-weight-bold q-mb-xs">
                  📊 Valori Fisiologici Normali:
                </div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>VO₂ (consumo O₂):</strong> ~250 ml/min a riposo
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>VCO₂ (produzione CO₂):</strong> ~200 ml/min a riposo
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="chevron_right" color="primary" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>QR normale:</strong> 0.7 - 1.0 in condizioni di aerobiosi
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-xs">
                  🔬 Interpretazione dei Valori:
                </div>
                <div class="row q-gutter-xs">
                  <div class="col-12 bg-green-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">QR = 1.0</div>
                    <div class="text-caption text-grey-8">
                      Metabolismo prevalentemente <strong>glucidico</strong> (carboidrati)
                    </div>
                  </div>
                  <div class="col-12 bg-amber-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">QR = 0.7</div>
                    <div class="text-caption text-grey-8">
                      Metabolismo prevalentemente <strong>lipidico</strong> (grassi)
                    </div>
                  </div>
                  <div class="col-12 bg-blue-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">QR = 0.8</div>
                    <div class="text-caption text-grey-8">
                      Dieta mista - valore <strong>normale a riposo</strong>
                    </div>
                  </div>
                  <div class="col-12 bg-purple-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">QR = 0.85</div>
                    <div class="text-caption text-grey-8">
                      Valore medio in <strong>condizioni standard</strong>
                    </div>
                  </div>
                </div>
              </div>
            </q-expansion-item>

            <!-- Metabolismo Aerobico vs Anaerobico -->
            <q-expansion-item
              icon="biotech"
              label="Metabolismo Aerobico vs Anaerobico"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold text-positive q-mb-sm">
                  ✅ Metabolismo Aerobico (QR: 0.7 - 1.0)
                </div>
                <div class="text-caption text-grey-8 q-mb-sm">
                  In condizioni di <strong>metabolismo aerobico</strong>, l'ossidazione dei nutrienti avviene in 
                  presenza di ossigeno e il QR rimane compreso tra 0.7 e 1.0, in funzione del tipo di 
                  substrati energetici metabolizzati.
                </div>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold text-negative q-mb-sm">
                  ⚠️ Metabolismo Anaerobico (QR > 1.0)
                </div>
                <div class="text-caption text-grey-8 q-mb-xs">
                  In situazioni di <strong>metabolismo anaerobico</strong>, come in caso di:
                </div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Ipossia tissutale</strong>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Stress metabolico</strong>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Insufficiente apporto di ossigeno</strong>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Shock</strong>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-caption text-grey-8 q-mb-sm">
                  ...la produzione di energia prosegue attivando la <strong>glicolisi anaerobica</strong>, 
                  che ha come prodotti finali <strong>lattato</strong> (che ritroviamo in circolo) e <strong>H⁺</strong>. 
                  Il tamponamento del lattato genera un <strong>eccesso di CO₂</strong>, che può determinare 
                  un <strong>innalzamento del QR oltre 1.0</strong>.
                </div>

                <q-banner class="bg-red-1 text-red-9" dense rounded>
                  <template v-slot:avatar>
                    <q-icon name="warning" color="red" size="xs" />
                  </template>
                  <div class="text-caption">
                    <strong>SHOCK - Monitoraggio in Tempo Reale:</strong><br />
                    La <strong>modificazione del VCO₂/VO₂</strong> segue le variazioni di 
                    <strong>ipoperfusione tissutale</strong> in maniera più tempestiva della variazione del lattato. 
                    Il QR potrebbe quindi essere l'indicatore che consente di <strong>seguire quasi in tempo reale 
                    l'evoluzione dello shock</strong>.
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- Come si Misura il VCO2/VO2 -->
            <q-expansion-item
              icon="science"
              label="Come si Misura il VCO2/VO2"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">Metodi di Misurazione:</div>

                <div class="q-mb-sm">
                  <div class="text-body2 text-weight-bold text-positive">
                    1️⃣ Calorimetria Indiretta (Gold Standard)
                  </div>
                  <div class="text-caption text-grey-8">
                    VCO₂ e VO₂ possono essere misurati in condizioni ideali dalla 
                    <strong>calorimetria indiretta</strong>, analizzando i gas respiratori 
                    (concentrazioni di O₂ e CO₂ nell'aria inspirata ed espirata). Questo metodo fornisce 
                    misurazioni accurate del dispendio energetico basale e totale.
                  </div>
                </div>

                <q-separator class="q-my-sm" />

                <div class="q-mb-sm">
                  <div class="text-body2 text-weight-bold text-primary">
                    2️⃣ Emogasanalisi Arteriosa e Venosa Mista (Metodo Alternativo)
                  </div>
                  <div class="text-caption text-grey-8 q-mb-xs">
                    In alternativa, VCO₂ e VO₂ possono essere <strong>calcolati dall'emogasanalisi 
                    arteriosa e venosa mista</strong>. Questo è il metodo utilizzato da questo calcolatore.
                  </div>

                  <div class="bg-blue-1 q-pa-xs q-mb-xs rounded-borders">
                    <div class="text-caption text-weight-bold q-mb-xs">
                      📐 Calcolo del Consumo di Ossigeno (VO₂):
                    </div>
                    <div class="text-caption text-grey-8 q-mb-xs">
                      Il consumo di ossigeno è ricavato come la <strong>differenza</strong> tra la quantità O₂ 
                      che il sangue trasporta ai tessuti (sangue <strong>arterioso</strong>) e la quantità di O₂ 
                      presente nel sangue che ha abbandonato i tessuti (<strong>sangue venoso misto</strong> 
                      da atrio destro o arteria polmonare).
                    </div>
                    <div class="text-caption text-grey-7">
                      <strong>Formula:</strong> VO₂ = (O₂ arterioso) - (O₂ venoso misto)<br />
                      Dove O₂ = (HB × 1.36 × SatO₂/100) + (PO₂ × 0.003)
                    </div>
                  </div>

                  <div class="bg-orange-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold q-mb-xs">
                      📐 Calcolo della Produzione di CO₂ (VCO₂):
                    </div>
                    <div class="text-caption text-grey-8 q-mb-xs">
                      Analogamente, la <strong>produzione di CO₂</strong> è calcolata come differenza 
                      tra CO₂ venoso e arterioso, riflettendo metabolismo e perfusione tissutale.
                    </div>
                    <div class="text-caption text-grey-7">
                      <strong>Formula:</strong> VCO₂ = (CO₂ venoso) - (CO₂ arterioso)
                    </div>
                  </div>
                </div>

                <q-banner class="bg-amber-1 text-amber-9" dense rounded>
                  <template v-slot:avatar>
                    <q-icon name="info" color="amber" size="xs" />
                  </template>
                  <div class="text-caption">
                    <strong>Nota:</strong> Questo calcolatore utilizza il metodo dell'emogasanalisi artero-venosa. 
                    Per misurazioni precise del dispendio energetico, si raccomanda la calorimetria indiretta.
                  </div>
                </q-banner>
              </div>
            </q-expansion-item>

            <!-- Formula Utilizzata -->
            <q-expansion-item
              icon="functions"
              label="🧮 Formula Utilizzata"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="bg-primary text-white q-pa-sm q-mb-sm">
                  <div class="text-body2 text-center">
                    QR = (PvCO2 - PaCO2) / [(HB × 1.36 × (SaO2 - SvO2)) / 100 + (PaO2 - PvO2) × 0.003]
                  </div>
                </div>
                
                <div class="text-caption text-grey-8 q-mb-xs">
                  <strong>Dove:</strong>
                </div>
                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="blue" text-color="white" dense>1.36</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Costante di Hüfner - capacità di trasporto O₂ dell'emoglobina (ml O₂/g Hb)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-chip size="sm" color="orange" text-color="white" dense>0.003</q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Coefficiente di solubilità dell'O₂ nel plasma (ml/mmHg/dL)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-expansion-item>

            <!-- Analisi Dettagliata e Applicazioni Cliniche -->
            <q-expansion-item
              icon="insights"
              label="🔬 Analisi Dettagliata e Applicazioni"
              dense
              class="q-mt-xs"
            >
              <div class="bg-grey-1 q-pa-sm">
                <div class="text-body2 text-weight-bold q-mb-sm">Componenti del Calcolo:</div>
                <div class="row q-gutter-xs q-mb-sm">
                  <div class="col-12 bg-blue-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      Produzione CO₂ (VCO₂):
                      <span class="text-primary q-ml-xs">
                        {{ ((formData.PvCO2 || 0) - (formData.PaCO2 || 0)).toFixed(1) }} mmHg
                      </span>
                    </div>
                    <div class="text-caption text-grey-7">
                      Differenza artero-venosa di CO₂ (normale ~200 ml/min)
                    </div>
                  </div>
                  <div class="col-12 bg-green-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      Consumo O₂ - Trasporto via Emoglobina:
                      <span class="text-primary q-ml-xs">{{ getO2Transport().toFixed(2) }} ml/dL</span>
                    </div>
                    <div class="text-caption text-grey-7">
                      Formula: HB × 1.36 × (SaO₂ - SvO₂) / 100
                    </div>
                  </div>
                  <div class="col-12 bg-orange-1 q-pa-xs rounded-borders">
                    <div class="text-caption text-weight-bold">
                      Consumo O₂ - Trasporto via Plasma:
                      <span class="text-primary q-ml-xs">{{ getPlasmaO2().toFixed(3) }} ml/dL</span>
                    </div>
                    <div class="text-caption text-grey-7">
                      Formula: (PaO₂ - PvO₂) × 0.003
                    </div>
                  </div>
                </div>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-weight-bold q-mb-xs">📊 Applicazioni Cliniche:</div>
                <q-list dense class="q-pl-md q-mb-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Calorimetria Indiretta:</strong> Valutazione del dispendio energetico in pazienti critici
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Nutrizione Artificiale:</strong> Ottimizzazione del rapporto carboidrati/grassi (evitare overfeeding)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Monitoraggio Shock:</strong> Marker precoce di metabolismo anaerobico e ipoperfusione
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Weaning Ventilatorio:</strong> QR elevato può indicare eccessiva produzione CO₂ (difficoltà svezzamento)
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        <strong>Valutazione Metabolica:</strong> Identificazione del substrato energetico prevalente
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-body2 text-weight-bold q-mb-xs">⚠️ Limiti e Considerazioni:</div>
                <q-list dense class="q-pl-md">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Il QR rappresenta il rapporto VCO₂/VO₂ <strong>sistemico</strong>, non tissutale
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        In condizioni di shock, l'aumento del QR può precedere l'aumento del lattato
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        La misurazione accurata richiede calorimetria indiretta in condizioni stabili
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="warning" color="orange" size="xs" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-grey-8">
                        Questo calcolo è una <strong>stima approssimativa</strong> basata su emogasanalisi artero-venosa
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="text-caption text-grey-7 q-mt-sm">
                  <strong>Riferimenti:</strong> La formula utilizzata stima VCO₂ e VO₂ dalla differenza artero-venosa. 
                  Per misurazioni precise, preferire calorimetria indiretta con analisi dei gas respiratori 
                  (Encyclopedia of Respiratory Medicine, ScienceDirect Medical Literature).
                </div>
              </div>
            </q-expansion-item>

            <!-- Valori di riferimento -->
            <q-expansion-item icon="bar_chart" label="Valori di Riferimento" dense class="q-mt-xs">
              <q-list dense class="bg-grey-1">
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="purple" name="restaurant" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption><strong>0.7</strong> - Ossidazione grassi</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="green" name="check_circle" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption
                      ><strong>0.8-0.85</strong> - Dieta mista (normale)</q-item-label
                    >
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="blue" name="cake" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption
                      ><strong>1.0</strong> - Ossidazione carboidrati</q-item-label
                    >
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="red" name="dangerous" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption
                      ><strong>&gt;1.0</strong> - Metabolismo anaerobico</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-list>
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
interface QRFormData {
  PvCO2: number | null;
  PaCO2: number | null;
  HB: number | null;
  SaO2: number | null;
  SvO2: number | null;
  PaO2: number | null;
  PvO2: number | null;
}

// ============================================================
// CONSTANTS
// ============================================================
const MEDICAL_CONSTANTS = {
  HB_O2_BINDING: 1.36, // ml O₂/g Hb - Hüfner constant
  O2_SOLUBILITY: 0.003, // ml O₂/mmHg/dL
} as const;

const RQ_THRESHOLDS = {
  FAT_OXIDATION: 0.7,
  MIXED_DIET_MIN: 0.8,
  MIXED_DIET_MAX: 0.85,
  CARB_OXIDATION: 1.0,
  ANAEROBIC_THRESHOLD: 1.0,
  SHOCK_THRESHOLD: 1.2,
} as const;

// ============================================================
// STATE
// ============================================================
const initialFormData: QRFormData = {
  PvCO2: null,
  PaCO2: null,
  HB: null,
  SaO2: null,
  SvO2: null,
  PaO2: null,
  PvO2: null,
};

const formData = ref<QRFormData>({ ...initialFormData });
const result = ref<number>(0);

const { resetForm } = useResetForm(formData, result, initialFormData);

// ============================================================
// COMPUTED
// ============================================================
const isFormValid = computed(() => {
  return (
    Object.values(formData.value).every((val) => val !== null && val > 0) &&
    formData.value.SaO2! <= 100 &&
    formData.value.SvO2! <= 100
  );
});

// ============================================================
// FUNCTIONS
// ============================================================
/**
 * @function calculateQR
 * @description Calcola il Quoziente Respiratorio (RQ = VCO₂ / VO₂)
 * @returns {void}
 */
const calculateQR = (): void => {
  if (!isFormValid.value) return;

  const { PvCO2, PaCO2, HB, SaO2, SvO2, PaO2, PvO2 } = formData.value;

  // CO₂ production
  const vco2 = PvCO2! - PaCO2!;

  // O₂ consumption via hemoglobin
  const vo2_hemoglobin = (HB! * MEDICAL_CONSTANTS.HB_O2_BINDING * (SaO2! - SvO2!)) / 100;

  // O₂ consumption via plasma
  const vo2_plasma = (PaO2! - PvO2!) * MEDICAL_CONSTANTS.O2_SOLUBILITY;

  // Total VO₂
  const vo2_total = vo2_hemoglobin + vo2_plasma;

  // RQ = VCO₂ / VO₂
  result.value = vco2 / vo2_total;
};

/**
 * @function getO2Transport
 * @description Calcola il trasporto di O₂ via emoglobina
 * @returns {number} Trasporto O₂ in ml/dL
 */
const getO2Transport = (): number => {
  if (!formData.value.HB || !formData.value.SaO2 || !formData.value.SvO2) return 0;
  return (formData.value.HB * MEDICAL_CONSTANTS.HB_O2_BINDING * (formData.value.SaO2 - formData.value.SvO2)) / 100;
};

/**
 * @function getPlasmaO2
 * @description Calcola il trasporto di O₂ via plasma
 * @returns {number} Trasporto O₂ in ml/dL
 */
const getPlasmaO2 = (): number => {
  if (!formData.value.PaO2 || !formData.value.PvO2) return 0;
  return (formData.value.PaO2 - formData.value.PvO2) * MEDICAL_CONSTANTS.O2_SOLUBILITY;
};

/**
 * @function getInterpretation
 * @description Restituisce interpretazione clinica del QR
 * @returns {string} Interpretazione testuale
 */
const getInterpretation = (): string => {
  if (result.value === 0) return 'Inserire i parametri';

  if (result.value > RQ_THRESHOLDS.SHOCK_THRESHOLD) {
    return 'Metabolismo Anaerobico Severo';
  }
  if (result.value > RQ_THRESHOLDS.ANAEROBIC_THRESHOLD) {
    return 'Metabolismo Anaerobico / Lipogenesi';
  }
  if (result.value >= 0.95 && result.value <= RQ_THRESHOLDS.CARB_OXIDATION) {
    return 'Metabolismo Glucidico Prevalente';
  }
  if (result.value >= RQ_THRESHOLDS.MIXED_DIET_MIN && result.value < 0.95) {
    return 'Range Normale - Dieta Mista';
  }
  if (result.value >= RQ_THRESHOLDS.FAT_OXIDATION && result.value < RQ_THRESHOLDS.MIXED_DIET_MIN) {
    return 'Metabolismo Lipidico Prevalente';
  }
  if (result.value < RQ_THRESHOLDS.FAT_OXIDATION) {
    return 'Chetosi / Digiuno Prolungato';
  }

  return 'Valore Non Standard';
};

/**
 * @function getInterpretationColor
 * @description Restituisce colore Quasar per interpretazione
 * @returns {string} Nome colore Quasar
 */
const getInterpretationColor = (): string => {
  if (result.value === 0) return 'grey';
  if (result.value > RQ_THRESHOLDS.SHOCK_THRESHOLD) return 'red';
  if (result.value > RQ_THRESHOLDS.ANAEROBIC_THRESHOLD) return 'orange';
  if (result.value >= RQ_THRESHOLDS.MIXED_DIET_MIN && result.value <= RQ_THRESHOLDS.CARB_OXIDATION)
    return 'green';
  if (result.value >= RQ_THRESHOLDS.FAT_OXIDATION) return 'blue';
  return 'purple';
};
</script>
