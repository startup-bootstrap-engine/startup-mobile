import { create } from 'zustand';
import { UserSettingsState } from './userSettingsType';

export const useUserSettingsStore = create<UserSettingsState>((set) => ({
  darkModeEnabled: false,
  notificationsEnabled: true,
  privacyEnabled: true,
  language: 'en',

  setDarkMode: (enabled: boolean) => set({ darkModeEnabled: enabled }),
  setNotificationsEnabled: (enabled: boolean) =>
    set({ notificationsEnabled: enabled }),
  setPrivacyEnabled: (enabled: boolean) => set({ privacyEnabled: enabled }),
  setLanguage: (language: string) => set({ language }),
}));
