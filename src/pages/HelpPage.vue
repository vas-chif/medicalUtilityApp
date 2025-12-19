<script setup lang="ts">
/**
 * @file HelpPage.vue
 * @description Help and Support page
 *              Pattern § 🏗️ ARCHITETTURA COMPONENTI
 * @author Vasile Chifeac
 * @created 2025-12-19
 */

import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import emailjs from '@emailjs/browser';

const { t } = useI18n();
const $q = useQuasar();
const FAQ_COUNT = 3; // Number of items in the FAQ array

// Contact Form State
const showContactDialog = ref(false);
const acceptTerms = ref(false);
const contactForm = ref({
  name: '',
  email: '',
  message: '',
});

const openContactDialog = () => {
  showContactDialog.value = true;
};

const isValidEmail = (val: string) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || t('helpPage.contactForm.validation.email');
};

const submitContactForm = async () => {
  if (!acceptTerms.value) {
    $q.notify({
      type: 'warning',
      message: t('helpPage.contactForm.validation.terms'),
    });
    return;
  }

  try {
    // EmailJS Configuration from .env
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey || serviceID.includes('placeholder')) {
      console.warn('EmailJS not configured. Check .env file.');
      $q.notify({
        type: 'warning',
        message: 'EmailJS configuration missing in .env',
      });
      return;
    }

    const templateParams = {
      from_name: contactForm.value.name,
      from_email: contactForm.value.email,
      message: contactForm.value.message,
      to_email: 'uniqueyouagency.com@gmail.com',
    };

    await emailjs.send(serviceID, templateID, templateParams, publicKey);

    $q.notify({
      type: 'positive',
      message: t('helpPage.contactForm.success'),
    });
    showContactDialog.value = false;
    contactForm.value = { name: '', email: '', message: '' };
    acceptTerms.value = false;
  } catch (error) {
    console.error('EmailJS Error:', error);
    $q.notify({
      type: 'negative',
      message: t('helpPage.contactForm.error'),
    });
  }
};
</script>

<template>
  <q-page padding>
    <!-- Header -->
    <div class="q-mb-lg text-center">
      <q-icon name="help_outline" size="64px" color="primary" class="q-mb-sm" />
      <h1 class="text-h4 text-weight-bold q-mb-xs text-primary">{{ t('helpPage.title') }}</h1>
      <p class="text-subtitle1 text-grey-7">{{ t('helpPage.subtitle') }}</p>
    </div>

    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <!-- FAQ Section -->
        <q-card class="q-mb-lg shadow-1">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="quiz" size="sm" class="q-mr-sm" />
              {{ t('helpPage.faq.title') }}
            </div>

            <q-list separator>
              <q-expansion-item
                v-for="(item, index) in FAQ_COUNT"
                :key="index"
                :label="t(`helpPage.faq.items[${index}].q`)"
                icon="question_answer"
                header-class="text-weight-medium"
              >
                <q-card>
                  <q-card-section class="text-grey-8">
                    {{ t(`helpPage.faq.items[${index}].a`) }}
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </q-card-section>
        </q-card>

        <!-- Support Section -->
        <q-card class="bg-grey-1 shadow-1" flat bordered>
          <q-card-section class="text-center">
            <div class="text-h6 q-mb-sm">{{ t('helpPage.support.title') }}</div>
            <p>{{ t('helpPage.support.text') }}</p>
            <q-btn
              color="primary"
              icon="mail"
              :label="t('helpPage.support.action')"
              @click="openContactDialog"
              class="q-mt-sm"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Contact Dialog -->
    <q-dialog v-model="showContactDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ t('helpPage.contactForm.title') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="submitContactForm" class="q-gutter-md">
            <q-input
              filled
              v-model="contactForm.name"
              :label="t('helpPage.contactForm.name')"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || t('helpPage.contactForm.validation.required'),
              ]"
            />
            <q-input
              filled
              v-model="contactForm.email"
              :label="t('helpPage.contactForm.email')"
              type="email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || t('helpPage.contactForm.validation.required'),
                isValidEmail,
              ]"
            />
            <q-input
              filled
              v-model="contactForm.message"
              :label="t('helpPage.contactForm.message')"
              type="textarea"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || t('helpPage.contactForm.validation.required'),
              ]"
            />

            <div class="q-py-sm">
              <q-checkbox v-model="acceptTerms">
                <span class="text-caption">
                  {{ t('helpPage.contactForm.terms') }}
                  (<a href="/#/terms" target="_blank" @click.stop>Termini</a>,
                  <a href="/#/privacy" target="_blank" @click.stop>Privacy</a>)
                </span>
              </q-checkbox>
            </div>

            <div align="right">
              <q-btn flat :label="t('helpPage.contactForm.cancel')" color="primary" v-close-popup />
              <q-btn :label="t('helpPage.contactForm.send')" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style scoped>
h1 {
  margin-top: 0;
  line-height: 1.2;
}
</style>
