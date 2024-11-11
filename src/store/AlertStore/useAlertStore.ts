import { create } from 'zustand';
import { alertController } from '@ionic/core/components';

interface IAlertInput {
  name?: string;
  type: 'text' | 'number' | 'email' | 'password' | 'textarea';
  placeholder?: string;
  value?: string | number;
  min?: number;
  max?: number;
  attributes?: { [key: string]: any };
}

interface IAlertButton {
  text: string;
  role?: 'cancel' | 'destructive';
  handler?: () => void;
}

interface IAlertOptions {
  subHeader?: string;
  buttons?: (string | IAlertButton)[];
  inputs?: IAlertInput[];
}

interface IAlertState {
  showAlert: (
    header: string,
    message: string,
    options?: IAlertOptions,
  ) => Promise<void>;
  closeAlert: () => Promise<void>;
}

export const useAlertStore = create<IAlertState>((set) => {
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
