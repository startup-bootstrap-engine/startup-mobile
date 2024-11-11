import React from 'react';
import { IonButton } from '@ionic/react';
import { useAlertStore } from '@store/AlertStore/useAlertStore';
import { IAlertButton, IAlertInput } from '@store/AlertStore/types';

interface AlertComponentProps {
  header: string;
  message: string;
  inputs?: IAlertInput[];
  buttons?: (string | IAlertButton)[];
  subHeader?: string;
  buttonText: string;
  onOk?: (data: { [key: string]: any }) => void; // Callback for OK button
}

export const AlertComponent: React.FC<AlertComponentProps> = ({
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
      await showAlert(header, message, {
        subHeader,
        inputs,
        buttons: [
          ...buttons,
          {
            text: 'OK',
            handler: (data) => {
              if (onOk) {
                onOk(data);
              }
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error showing alert:', error);
    }
  };

  return <IonButton onClick={handleShowAlert}>{buttonText}</IonButton>;
};
