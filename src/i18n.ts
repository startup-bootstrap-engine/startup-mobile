import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import jaTranslations from './locales/ja.json';
import ptBrTranslations from './locales/pt-br.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    'pt-BR': {
      translation: ptBrTranslations,
    },
    ja: {
      translation: jaTranslations,
    },
  },
  lng: undefined,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  },
});

export { i18n };
