import { create } from 'zustand';

interface AlertState {
  isOpen: boolean;
  header: string;
  subHeader?: string;
  message: string;
  buttons: Array<string | { text: string; handler: () => void }>;
  showAlert: (
    header: string,
    message: string,
    subHeader?: string,
    buttons?: Array<string | { text: string; handler: () => void }>,
  ) => void;
  closeAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  isOpen: false,
  header: '',
  subHeader: undefined,
  message: '',
  buttons: ['OK'],
  showAlert: (header, message, subHeader, buttons = ['OK']) =>
    set({ isOpen: true, header, subHeader, message, buttons }),
  closeAlert: () => set({ isOpen: false }),
}));
