import { IonInput, IonItem, IonText } from '@ionic/react';
import React from 'react';

interface IProps {
  label: string;
  value: string;

  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password';
  error?: string | null;
  placeholder?: string;
  clearInput?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
}

export const FormField: React.FC<IProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  error,
  placeholder,
  clearInput = false,
  required = false,
  disabled = false,
  readonly = false,
  className,
}) => {
  return (
    <>
      <IonItem className={className}>
        <IonInput
          label={label}
          labelPlacement="floating"
          type={type}
          value={value}
          onIonChange={(e) => onChange(e.detail.value || '')}
          placeholder={placeholder}
          clearInput={clearInput}
          required={required}
          disabled={disabled}
          readonly={readonly}
          className={error ? 'ion-invalid' : ''}
        />
      </IonItem>
      {error && (
        <IonText color="danger" className="ion-padding-start">
          <small>{error}</small>
        </IonText>
      )}
    </>
  );
};
