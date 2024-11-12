import { create } from 'zustand';
import { alertController } from '@ionic/core/components';
import type { IAlertState } from './IAlertState';
import type { IAlertOptions } from './IAlertOptions';

export const useAlertStore = create<IAlertState>(() => {
  // eslint-disable-next-line no-undef
  let currentAlert: HTMLIonAlertElement | null = null;
  const alertQueue: (() => Promise<void>)[] = [];

  const processQueue = async (): Promise<void> => {
    if (alertQueue.length === 0 || currentAlert) {
      return;
    }

    const nextAlert = alertQueue.shift();
    if (nextAlert) {
      await nextAlert();
    }
  };

  return {
    showAlert: async (
      header: string,
      message: string,
      options: IAlertOptions = {},
    ): Promise<void> => {
      const createAlert = async (): Promise<void> => {
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
          currentAlert
            .onDidDismiss()
            .then(() => {
              currentAlert = null;
              void processQueue();
            })
            .catch((error) => {
              console.error('Error dismissing alert:', error);
            });
        } catch (error) {
          console.error('Error showing alert:', error);
        }
      };

      alertQueue.push(createAlert);
      void processQueue();
    },
    closeAlert: async (): Promise<void> => {
      try {
        if (currentAlert) {
          await currentAlert.dismiss();
          currentAlert = null;
          void processQueue();
        }
      } catch (error) {
        console.error('Error closing alert:', error);
      }
    },
  };
});
