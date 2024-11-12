import React from 'react';
import { IonButton } from '@ionic/react';
import { useAlertStore } from '@store/AlertStore/useAlertStore';
import type { IAlertButton } from '@store/AlertStore/IAlertButton';
import type { IAlertComponentProps } from './IAlertProps';

export const AlertComponent: React.FC<IAlertComponentProps> = ({
  header,
  message,
  inputs = [],
  buttons = ['OK'],
  subHeader,
  buttonText,
  onOk,
}) => {
  const showAlert = useAlertStore((state) => state.showAlert);

  const handleShowAlert = async (): Promise<void> => {
    try {
      const okButton: IAlertButton = {
        text: 'OK',
        handler: (data) => {
          if (onOk) {
            onOk(data);
          }
        },
      };

      const finalButtons = buttons.some(
        (button) => typeof button === 'object' && button.text === 'OK',
      )
        ? buttons
        : [...buttons, okButton];

      await showAlert(header, message, {
        subHeader,
        inputs,
        buttons: finalButtons,
      });
    } catch (error) {
      console.error('Error showing alert:', error);
    }
  };

  return <IonButton onClick={handleShowAlert}>{buttonText}</IonButton>;
};
