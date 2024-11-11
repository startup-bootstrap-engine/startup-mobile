import { create } from 'zustand';
import { alertController } from '@ionic/core/components';
import type { IAlertOptions, IAlertState } from './types';

declare global {
  interface HTMLIonAlertElement extends HTMLElement {
    present: () => Promise<void>;
    dismiss: () => Promise<boolean>;
  }
}

export const useAlertStore = create<IAlertState>(() => {
  let currentAlert: HTMLIonAlertElement | null = null;

  return {
    showAlert: async (
      header: string,
      message: string,
      options: IAlertOptions = {},
    ) => {
      try {
        if (currentAlert) {
          await currentAlert.dismiss();
        }

        currentAlert = await alertController.create({
          header,
          subHeader: options.subHeader,
          message,
          buttons: options.buttons || ['OK'],
          inputs: options.inputs || [],
        });

        await currentAlert.present();
      } catch (error) {
        console.error('Error showing alert:', error);
      }
    },
    closeAlert: async () => {
      try {
        if (currentAlert) {
          await currentAlert.dismiss();
          currentAlert = null;
        }
      } catch (error) {
        console.error('Error closing alert:', error);
      }
    },
  };
});
