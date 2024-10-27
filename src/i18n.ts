import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import jaTranslations from './locales/ja.json';
import ptBrTranslations from './locales/pt-br.json';

const getDefaultLanguage = () => {
  if (typeof window !== 'undefined') {
    const storedLang = window.localStorage.getItem('i18nextLng');
    return storedLang || 'en';
  }
  return 'en';
};

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
  lng: getDefaultLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
