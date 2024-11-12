import { IonButton } from '@ionic/react';
import { useAlertStore } from '@store/AlertStore/useAlertStore';
import React from 'react';

export const AlertSimple: React.FC = () => {
  const showAlert = useAlertStore((state) => state.showAlert);

  const handleButtonClick = async (): Promise<void> => {
    try {
      await showAlert('Alert Title', 'This is an alert message', {
        subHeader: 'Optional SubHeader',
        buttons: [
          { text: 'Cancel', handler: () => console.log('Cancel clicked') },
          { text: 'OK', handler: () => console.log('OK clicked') },
        ],
      });
    } catch (error) {
      console.error('Error showing alert:', error);
    }
  };

  return <IonButton onClick={handleButtonClick}>Show Alert</IonButton>;
};
