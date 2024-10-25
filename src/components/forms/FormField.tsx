import { IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import React from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password';
  error?: string | null;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  error,
}) => {
  return (
    <>
      <IonItem>
        <IonLabel position="floating">{label}</IonLabel>
        <IonInput
          type={type}
          value={value}
          onIonChange={(e) => onChange(e.detail.value || '')}
        />
      </IonItem>
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
    </>
  );
};
