<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface IPrivacyDetail {
  icon?: string;
  titolo?: string;
  nome?: string;
  valore: string;
}

interface IPrivacyMenuItem {
  name?: string;
  icon?: string;
  label: string;
  clickable: boolean;
  dettagli?: IPrivacyDetail[];
}

const router = useRouter();
const miniState = ref(false);
const leftDrawerOpen = ref(true);
const selectedDettaglio = ref<IPrivacyDetail[]>([]);

const goBack = (): void => {
  void router.push('/');
};

const navigateToTerms = (): void => {
  void router.push('/terms');
};

const tabsMenuPrivacy: IPrivacyMenuItem[] = [
  {
    name: 'trattamento',
    label: 'TRATTAMENTO DATI',
    clickable: false,
  },
  {
    name: 'titolare',
    icon: 'business',
    label: 'Titolare del Trattamento',
    clickable: true,
    dettagli: [
      {
        icon: 'business',
        titolo: 'Titolare del Trattamento',
        nome: 'Identità',
        valore: 'Medical Utility Pro Team',
      },
      {
        nome: 'Contatto',
        valore: 'uniqueyouagency.com@gmail.com',
      },
    ],
  },
  {
    name: 'dati',
    icon: 'folder_shared',
    label: 'Dati Trattati',
    clickable: true,
    dettagli: [
      {
        icon: 'folder_shared',
        titolo: 'Tipologia di Dati',
        nome: 'Dati Tecnici',
        valore: 'L\'applicazione non raccoglie dati personali sensibili dei pazienti. Vengono trattati solo dati tecnici necessari al funzionamento dell\'app.',
      },
      {
        nome: 'Cookie e Storage',
        valore: 'Utilizziamo LocalStorage per salvare le preferenze dell\'utente (es. lingua, tema).',
      },
    ],
  },
  {
    name: 'diritti',
    icon: 'gavel',
    label: 'Diritti dell\'Utente',
    clickable: true,
    dettagli: [
      {
        icon: 'gavel',
        titolo: 'I tuoi Diritti',
        nome: 'GDPR',
        valore: 'In conformità con il GDPR, hai diritto di accesso, rettifica, cancellazione dei tuoi dati.',
      },
    ],
  },
];

const drawerClick = (): void => {
  if (miniState.value) {
    miniState.value = false;
  }
};

const goTo = (item: { name: string; dettagli: IPrivacyDetail[] }): void => {
  if (item.dettagli) {
    selectedDettaglio.value = item.dettagli;
  }
};

// Initialize
const initialSection = tabsMenuPrivacy.find((item) => item.name === 'titolare');
if (initialSection && initialSection.dettagli) {
  selectedDettaglio.value = initialSection.dettagli;
}
</script>

<template>
  <div class="pages" aria-label="Privacy Page">
    <q-layout view="hHh lpR fFf" class="rounded-borders bg-grey-1">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />
          <q-toolbar-title>
            Privacy Policy
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

            <template v-for="(item, index) in tabsMenuPrivacy" :key="'priv-' + index">
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
            
            <q-item clickable v-ripple @click="navigateToTerms">
              <q-item-section avatar>
                <q-icon name="description" />
              </q-item-section>
              <q-item-section>
                Termini e Condizioni
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
          <div class="text-h5 q-mb-md text-primary">Privacy Policy di Medical Utility Pro</div>
          <p class="text-body1">
            Informativa sul trattamento dei dati personali ai sensi degli artt. 13-14 del Regolamento UE 2016/679 (GDPR).
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