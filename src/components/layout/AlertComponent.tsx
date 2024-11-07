import React from 'react';
import { IonAlert } from '@ionic/react';
import { useAlertStore } from '@store/AlertStore/useAlertStore';

export const AlertComponent: React.FC = () => {
  const { isOpen, header, subHeader, message, buttons, inputs, closeAlert } =
    useAlertStore();

  return (
    <IonAlert
      isOpen={isOpen}
      header={header}
      subHeader={subHeader}
      message={message}
      buttons={buttons}
      inputs={inputs?.map((input) => {
        if (input.type === 'radio') {
          return {
            type: input.type,
            label: input.label,
            value: input.value,
          };
        }
        return {
          type: input.type,
          placeholder: input.placeholder,
          attributes: input.attributes,
          min: input.min,
          max: input.max,
        };
      })}
      onDidDismiss={closeAlert}
    />
  );
};
