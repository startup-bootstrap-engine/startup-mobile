import React from 'react';
import { IonAlert } from '@ionic/react';
import { useAlertStore } from '@store/useAlertStore';

export const AlertComponent: React.FC = () => {
  const { isOpen, header, subHeader, message, buttons, closeAlert } =
    useAlertStore();

  return (
    <IonAlert
      isOpen={isOpen}
      header={header}
      subHeader={subHeader}
      message={message}
      buttons={buttons}
      onDidDismiss={closeAlert}
    />
  );
};
