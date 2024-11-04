import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { i18n } from '../i18n';

interface ILanguageState {
  language: string;

  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<ILanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: async (lang: string) => {
        await i18n.changeLanguage(lang);
        set({ language: lang });
      },
    }),
    {
      name: 'language-storage',
    },
  ),
);
