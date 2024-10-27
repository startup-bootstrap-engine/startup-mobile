import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';

interface LanguageState {
  language: string;
  // eslint-disable-next-line no-unused-vars
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang: string) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
      },
    }),
    {
      name: 'language-storage',
    },
  ),
);
