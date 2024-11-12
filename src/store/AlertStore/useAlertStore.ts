import { create } from 'zustand';
import { alertController } from '@ionic/core/components';
import { IAlertState } from './IAlertState';
import { IAlertOptions } from './IAlertOptions';

export const useAlertStore = create<IAlertState>(() => {
  // eslint-disable-next-line no-undef
  let currentAlert: HTMLIonAlertElement | null = null;
  const alertQueue: (() => Promise<void>)[] = [];

  const processQueue = async () => {
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
    ) => {
      const createAlert = async () => {
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
          currentAlert.onDidDismiss().then(() => {
            currentAlert = null;
            processQueue();
          });
        } catch (error) {
          console.error('Error showing alert:', error);
        }
      };

      alertQueue.push(createAlert);
      processQueue();
    },
    closeAlert: async () => {
      try {
        if (currentAlert) {
          await currentAlert.dismiss();
          currentAlert = null;
          processQueue();
        }
      } catch (error) {
        console.error('Error closing alert:', error);
      }
    },
  };
});
