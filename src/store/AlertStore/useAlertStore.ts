import { create } from 'zustand';
import { IAlertInput } from './types';

interface IAlertState {
  isOpen: boolean;
  header: string;
  subHeader?: string;
  message: string;
  buttons: Array<string | { text: string; handler: () => void }>;
  inputs?: IAlertInput[];
  showAlert: (
    header: string,
    message: string,
    options?: {
      subHeader?: string;
      buttons?: Array<string | { text: string; handler: () => void }>;
      inputs?: IAlertInput[];
    },
  ) => void;
  closeAlert: () => void;
}

export const useAlertStore = create<IAlertState>((set) => ({
  isOpen: false,
  header: '',
  subHeader: undefined,
  message: '',
  buttons: ['OK'],
  inputs: [],
  showAlert: (header, message, options = {}) =>
    set({
      isOpen: true,
      header,
      subHeader: options.subHeader,
      message,
      buttons: options.buttons || ['OK'],
      inputs: options.inputs || [],
    }),
  closeAlert: () => set({ isOpen: false, inputs: [] }),
}));
