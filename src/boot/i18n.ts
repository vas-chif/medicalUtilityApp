import { defineBoot } from '#q-app/wrappers';
import { createI18n } from 'vue-i18n';

import enUS from 'src/i18n/en-US';
import itIT from 'src/i18n/it-IT';
import bmiIT from 'src/i18n/it-IT/bmi';
import bmiEN from 'src/i18n/en-US/bmi';
import bsaIT from 'src/i18n/it-IT/bsa';
import bsaEN from 'src/i18n/en-US/bsa';
import abwIT from 'src/i18n/it-IT/abw';
import abwEN from 'src/i18n/en-US/abw';
import mechanicalPowerIT from 'src/i18n/it-IT/mechanicalPower';
import mechanicalPowerEN from 'src/i18n/en-US/mechanicalPower';
import respiratoryQuotientIT from 'src/i18n/it-IT/respiratoryQuotient';
import respiratoryQuotientEN from 'src/i18n/en-US/respiratoryQuotient';
import apgarScoreIT from 'src/i18n/it-IT/apgarScore';
import apgarScoreEN from 'src/i18n/en-US/apgarScore';
import gcsScoreIT from 'src/i18n/it-IT/gcsScore';
import gcsScoreEN from 'src/i18n/en-US/gcsScore';
import newsScoreIT from 'src/i18n/it-IT/newsScore';
import crclIT from 'src/i18n/it-IT/crcl';
import crclEN from 'src/i18n/en-US/crcl';
import egfrIT from 'src/i18n/it-IT/egfr';
import egfrEN from 'src/i18n/en-US/egfr';
import newsScoreEN from 'src/i18n/en-US/newsScore';
import sofaScoreIT from 'src/i18n/it-IT/sofa';
import sofaScoreEN from 'src/i18n/en-US/sofa';
import ibwIT from 'src/i18n/it-IT/ibw';
import ibwEN from 'src/i18n/en-US/ibw';

console.log(
  '[i18n boot] ✅ ALL NAMESPACES LOADED (bmi + bsa + abw + sofa COMPLETE - all 9 sections + footer + ibw)',
);

// Inject calculator namespaces manually into locales
// This is REQUIRED for vue-i18n to load the translations (see I18N_SETUP_GUIDE.md)
const itITWithCalculators = {
  ...itIT,
  bmi: bmiIT,
  bsa: bsaIT,
  abw: abwIT,
  mp: mechanicalPowerIT,
  qr: respiratoryQuotientIT,
  apgar: apgarScoreIT,
  gcs: gcsScoreIT,
  news: newsScoreIT,
  crcl: crclIT,
  egfr: egfrIT,
  sofa: sofaScoreIT,
  ibw: ibwIT,
};

const enUSWithCalculators = {
  ...enUS,
  bmi: bmiEN,
  bsa: bsaEN,
  abw: abwEN,
  mp: mechanicalPowerEN,
  qr: respiratoryQuotientEN,
  apgar: apgarScoreEN,
  gcs: gcsScoreEN,
  news: newsScoreEN,
  crcl: crclEN,
  egfr: egfrEN,
  sofa: sofaScoreEN,
  ibw: ibwEN,
};

const messages = {
  'en-US': enUSWithCalculators,
  'it-IT': itITWithCalculators,
};

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en-US'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

export default defineBoot(({ app }) => {
  console.log('[i18n boot] Starting i18n initialization...');
  console.log('[i18n boot] Messages object:', Object.keys(messages));

  try {
    const i18n = createI18n({
      locale: 'it-IT',
      fallbackLocale: 'it-IT',
      legacy: false,
      messages,
      missingWarn: false,
      fallbackWarn: false,
    });

    console.log('[i18n boot] i18n instance created successfully');

    // Set i18n instance on app
    app.use(i18n);
    console.log('[i18n boot] ✅ i18n installed on app successfully');
  } catch (error) {
    console.error('[i18n boot] ❌ Error during i18n initialization:', error);
    throw error;
  }
});
