import React from 'react';
import { IonButton } from '@ionic/react';
import { useAlertStore } from '@store/AlertStore/useAlertStore';

export const AlertInput: React.FC = () => {
  const showAlert = useAlertStore((state) => state.showAlert);

  const handleShowAlert = () => {
    showAlert('Input Alert', 'Please provide your information', {
      inputs: [
        { type: 'text', placeholder: 'Name' }, // Specify type for clarity
        {
          type: 'text', // Specify type
          placeholder: 'Nickname (max 8 characters)',
          attributes: { maxlength: 8 },
        },
        { type: 'number', placeholder: 'Age', min: 1, max: 100 },
        { type: 'textarea', placeholder: 'A little about yourself' },
      ],
      buttons: ['Cancel', 'OK'],
    });
  };

  return <IonButton onClick={handleShowAlert}>Show Input Alert</IonButton>;
};
