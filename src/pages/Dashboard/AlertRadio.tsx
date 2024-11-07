import React from 'react';
import { IonButton } from '@ionic/react';
import { useAlertStore } from '@store/AlertStore/useAlertStore';

export const AlertRadio: React.FC = () => {
  const showAlert = useAlertStore((state) => state.showAlert);

  const handleShowRadioAlert = () => {
    showAlert('Choose a Color', 'Please select your favorite color:', {
      inputs: [
        { label: 'Red', type: 'radio', value: 'red' },
        { label: 'Blue', type: 'radio', value: 'blue' },
        { label: 'Green', type: 'radio', value: 'green' },
      ],
      buttons: ['Cancel', 'OK'],
    });
  };

  return <IonButton onClick={handleShowRadioAlert}>Show Radio Alert</IonButton>;
};
