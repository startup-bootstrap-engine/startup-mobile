import { IonButton } from '@ionic/react';
import { useAlertStore } from '@store/AlertStore/useAlertStore';
import React from 'react';

export const AlertSimple: React.FC = () => {
  const showAlert = useAlertStore((state) => state.showAlert);

  const handleButtonClick = (): void => {
    showAlert('Alert Title', 'This is an alert message', {
      subHeader: 'Optional SubHeader',
      buttons: [
        // eslint-disable-next-line no-console
        { text: 'Cancel', handler: () => console.log('Cancel clicked') },
        // eslint-disable-next-line no-console
        { text: 'OK', handler: () => console.log('OK clicked') },
      ],
    });
  };

  return <IonButton onClick={handleButtonClick}>Show Alert</IonButton>;
};
