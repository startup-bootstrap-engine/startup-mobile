export type UserSettingsState = {
  darkModeEnabled: boolean;
  notificationsEnabled: boolean;
  privacyEnabled: boolean;
  language: string;
  setDarkMode: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setPrivacyEnabled: (enabled: boolean) => void;
  setLanguage: (language: string) => void;
};
