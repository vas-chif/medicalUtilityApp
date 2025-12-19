<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { copyToClipboard, useQuasar } from 'quasar';

interface IContactDetail {
  icon?: string;
  titolo?: string;
  nome?: string;
  valore: string;
  link?: string;
  copyable?: boolean;
}

interface IContactMenuItem {
  name?: string;
  icon?: string;
  label: string;
  clickable: boolean;
  dettagli?: IContactDetail[];
}

const router = useRouter();
const $q = useQuasar();
const miniState = ref(false);
const leftDrawerOpen = ref(true);
const selectedDettaglio = ref<IContactDetail[]>([]);

const goBack = (): void => {
  void router.push('/');
};

const handleCopy = (text: string): void => {
  copyToClipboard(text)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Copiato negli appunti',
        timeout: 2000,
      });
    })
    .catch(() => {
      $q.notify({
        type: 'negative',
        message: 'Errore durante la copia',
        timeout: 2000,
      });
    });
};

const tabsMenuContacts: IContactMenuItem[] = [
  {
    name: 'email',
    label: 'CONTATTI EMAIL',
    clickable: false,
  },
  {
    name: 'email-generale',
    icon: 'email',
    label: 'Email Supporto',
    clickable: true,
    dettagli: [
      {
        icon: 'email',
        titolo: 'Email Supporto',
        nome: 'Indirizzo',
        valore: 'uniqueyouagency.com@gmail.com',
        link: 'mailto:uniqueyouagency.com@gmail.com',
        copyable: true,
      },
      {
        nome: 'Info',
        valore: 'Per supporto tecnico, segnalazione bug o richieste di funzionalità.',
      },
    ],
  },
];

const drawerClick = (): void => {
  if (miniState.value) {
    miniState.value = false;
  }
};

const goTo = (item: { name: string; dettagli: IContactDetail[] }): void => {
  if (item.dettagli) {
    selectedDettaglio.value = item.dettagli;
  }
};

// Initialize
const initialSection = tabsMenuContacts.find((item) => item.name === 'email-generale');
if (initialSection && initialSection.dettagli) {
  selectedDettaglio.value = initialSection.dettagli;
}
</script>

<template>
  <div class="pages" aria-label="Contacts Page">
    <q-layout view="hHh lpR fFf" class="rounded-borders bg-grey-1">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />
          <q-toolbar-title> Contatti </q-toolbar-title>
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
              <q-item-section> Torna alla Home </q-item-section>
            </q-item>

            <q-separator class="q-my-md" />

            <template v-for="(item, index) in tabsMenuContacts" :key="'cont-' + index">
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
          <div class="text-h5 q-mb-md text-primary">Contatti Medical Utility Pro</div>
          <p class="text-body1">
            Siamo qui per aiutarti. Contattaci per qualsiasi domanda o segnalazione.
          </p>

          <div v-if="selectedDettaglio" class="q-mt-lg">
            <q-card
              v-for="(detail, index) in selectedDettaglio"
              :key="index"
              class="q-mb-md shadow-1"
            >
              <q-card-section>
                <div v-if="detail.titolo" class="text-h6 q-mb-sm text-primary">
                  <q-icon v-if="detail.icon" :name="detail.icon" class="q-mr-sm" />
                  {{ detail.titolo }}
                </div>
                <div class="text-subtitle1 text-weight-bold">{{ detail.nome }}</div>
                <div class="row items-center q-gutter-sm">
                  <div class="text-body2 text-grey-8">{{ detail.valore }}</div>
                  <q-btn
                    v-if="detail.copyable"
                    flat
                    round
                    dense
                    color="primary"
                    icon="content_copy"
                    size="sm"
                    @click="handleCopy(detail.valore)"
                  />
                  <q-btn
                    v-if="detail.link"
                    flat
                    round
                    dense
                    color="primary"
                    icon="open_in_new"
                    size="sm"
                    type="a"
                    :href="detail.link"
                    target="_blank"
                  />
                </div>
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
