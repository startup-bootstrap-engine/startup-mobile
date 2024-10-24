import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '@locales/en.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: enTranslations,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
