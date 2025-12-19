<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface ITermDetail {
  icon?: string;
  titolo?: string;
  nome?: string;
  valore: string;
}

interface ITermMenuItem {
  name?: string;
  icon?: string;
  label: string;
  clickable: boolean;
  dettagli?: ITermDetail[];
}

const router = useRouter();
const miniState = ref(false);
const leftDrawerOpen = ref(true);
const selectedDettaglio = ref<ITermDetail[]>([]);

const goBack = (): void => {
  void router.push('/');
};

const navigateToPrivacy = (): void => {
  void router.push('/privacy');
};

const tabsMenuTermsGenerali: ITermMenuItem[] = [
  {
    name: 'condizioni-generali',
    label: 'CONDIZIONI GENERALI',
    clickable: false,
  },
  {
    name: 'accettazione',
    icon: 'check_circle',
    label: 'Accettazione dei Termini',
    clickable: true,
    dettagli: [
      {
        icon: 'check_circle',
        titolo: 'Accettazione dei Termini',
        nome: 'Consenso informato',
        valore: 'L\'utilizzo di Medical Utility Pro implica l\'accettazione integrale dei presenti Termini e Condizioni. L\'utente dichiara di aver letto, compreso e accettato tutti i termini prima di utilizzare l\'applicazione.',
      },
      {
        nome: 'Uso Professionale',
        valore: 'L\'applicazione è destinata esclusivamente a professionisti del settore sanitario. L\'utente si assume la piena responsabilità per l\'uso delle informazioni fornite.',
      },
    ],
  },
  {
    name: 'utilizzo',
    icon: 'medical_services',
    label: 'Condizioni d\'Utilizzo',
    clickable: true,
    dettagli: [
      {
        icon: 'medical_services',
        titolo: 'Condizioni d\'Utilizzo',
        nome: 'Finalità',
        valore: 'L\'applicazione fornisce strumenti di calcolo e consultazione per supportare la pratica clinica. Non sostituisce il giudizio professionale del medico.',
      },
      {
        nome: 'Validazione',
        valore: 'Sebbene ci impegniamo per l\'accuratezza, l\'utente deve sempre verificare i risultati dei calcoli e le informazioni sui farmaci.',
      },
    ],
  },
];

const tabsMenuTermsLegali: ITermMenuItem[] = [
  {
    name: 'legali',
    label: 'ASPETTI LEGALI',
    clickable: false,
  },
  {
    name: 'limitazione-responsabilita',
    icon: 'gavel',
    label: 'Limitazione di Responsabilità',
    clickable: true,
    dettagli: [
      {
        icon: 'gavel',
        titolo: 'Limitazione di Responsabilità',
        nome: 'Esclusione di garanzie',
        valore: 'Il software è fornito "così com\'è". Gli sviluppatori non garantiscono che l\'applicazione sia priva di errori o interruzioni.',
      },
      {
        nome: 'Danni',
        valore: 'In nessun caso gli sviluppatori saranno responsabili per danni diretti, indiretti, incidentali o consequenziali derivanti dall\'uso dell\'applicazione.',
      },
    ],
  },
  {
    name: 'contatti',
    icon: 'contact_mail',
    label: 'Contatti e Supporto',
    clickable: true,
    dettagli: [
      {
        icon: 'contact_mail',
        titolo: 'Contatti',
        nome: 'Email',
        valore: 'uniqueyouagency.com@gmail.com',
      },
    ],
  },
];

const drawerClick = (): void => {
  if (miniState.value) {
    miniState.value = false;
  }
};

const goTo = (item: { name: string; dettagli: ITermDetail[] }): void => {
  if (item.dettagli) {
    selectedDettaglio.value = item.dettagli;
  }
};

// Initialize
const accettazioneSezione = tabsMenuTermsGenerali.find((item) => item.name === 'accettazione');
if (accettazioneSezione && accettazioneSezione.dettagli) {
  selectedDettaglio.value = accettazioneSezione.dettagli;
}
</script>

<template>
  <div class="pages" aria-label="Terms Page">
    <q-layout view="hHh lpR fFf" class="rounded-borders bg-grey-1">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />
          <q-toolbar-title>
            Termini e Condizioni
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :mini="miniState"
        @click.capture="drawerClick"
        :width="280"
        :breakpoint="500"
        bordered
        class="bg-white"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple @click="goBack">
              <q-item-section avatar>
                <q-icon name="arrow_back" />
              </q-item-section>
              <q-item-section>
                Torna alla Home
              </q-item-section>
            </q-item>

            <q-separator class="q-my-md" />

            <template v-for="(item, index) in tabsMenuTermsGenerali" :key="'gen-' + index">
              <q-item-label header v-if="!item.clickable">{{ item.label }}</q-item-label>
              <q-item
                v-else
                clickable
                v-ripple
                @click="goTo(item as any)"
                :active="selectedDettaglio === item.dettagli"
              >
                <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  {{ item.label }}
                </q-item-section>
              </q-item>
            </template>

            <q-separator class="q-my-md" />

            <template v-for="(item, index) in tabsMenuTermsLegali" :key="'leg-' + index">
              <q-item-label header v-if="!item.clickable">{{ item.label }}</q-item-label>
              <q-item
                v-else
                clickable
                v-ripple
                @click="goTo(item as any)"
                :active="selectedDettaglio === item.dettagli"
              >
                <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  {{ item.label }}
                </q-item-section>
              </q-item>
            </template>
            
            <q-separator class="q-my-md" />
            
            <q-item clickable v-ripple @click="navigateToPrivacy">
              <q-item-section avatar>
                <q-icon name="privacy_tip" />
              </q-item-section>
              <q-item-section>
                Privacy Policy
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
        
        <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
          <q-btn
            dense
            round
            unelevated
            color="primary"
            icon="chevron_left"
            @click="miniState = true"
          />
        </div>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <div class="text-h5 q-mb-md text-primary">Termini e Condizioni di Medical Utility Pro</div>
          <p class="text-body1">
            Questi Termini e Condizioni regolano l'utilizzo dell'applicazione Medical Utility Pro. 
            Utilizzando l'app, accetti integralmente i presenti termini.
          </p>

          <div v-if="selectedDettaglio" class="q-mt-lg">
            <q-card v-for="(detail, index) in selectedDettaglio" :key="index" class="q-mb-md shadow-1">
              <q-card-section>
                <div v-if="detail.titolo" class="text-h6 q-mb-sm text-primary">
                  <q-icon v-if="detail.icon" :name="detail.icon" class="q-mr-sm" />
                  {{ detail.titolo }}
                </div>
                <div class="text-subtitle1 text-weight-bold">{{ detail.nome }}</div>
                <div class="text-body2 text-grey-8">{{ detail.valore }}</div>
              </q-card-section>
            </q-card>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped>
.pages {
  height: 100vh;
}
</style>