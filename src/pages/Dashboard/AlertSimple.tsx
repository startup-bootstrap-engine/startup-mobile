import React from 'react';
import { IonButton } from '@ionic/react';
import { useAlertStore } from '@store/AlertStore/useAlertStore';

export const AlertSimple: React.FC = () => {
  const showAlert = useAlertStore((state) => state.showAlert);

  const handleButtonClick = (): void => {
    showAlert('Alert Title', 'This is an alert message', {
      subHeader: 'Optional SubHeader',
      buttons: [
        { text: 'Cancel', handler: () => console.log('Cancel clicked') },
        { text: 'OK', handler: () => console.log('OK clicked') },
      ],
    });
  };

  return <IonButton onClick={handleButtonClick}>Show Alert</IonButton>;
};
