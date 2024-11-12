/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { TextFieldTypes } from '@ionic/core';
import {
  IonCheckbox,
  IonDatetime,
  IonInput,
  IonItem,
  IonRadio,
  IonText,
} from '@ionic/react';
import React from 'react';

interface IProps {
  label: string;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  type?: TextFieldTypes | 'date' | 'checkbox' | 'radio';
  error?: string | null;
  placeholder?: string;
  clearInput?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
}

const FormField: React.FC<IProps> = ({
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
  const renderInput = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <IonInput
            label={label}
            labelPlacement="floating"
            type={type}
            value={value as string}
            onIonChange={(e) => onChange(e.detail.value || '')}
            placeholder={placeholder}
            clearInput={clearInput}
            required={required}
            disabled={disabled}
            readonly={readonly}
            className={error ? 'ion-invalid' : ''}
          />
        );
      case 'date':
        return (
          <IonDatetime
            value={value as string}
            onIonChange={(e) => onChange(e.detail.value as any)}
            disabled={disabled}
            readonly={readonly}
            className={error ? 'ion-invalid' : ''}
          />
        );
      case 'checkbox':
        return (
          <IonCheckbox
            labelPlacement="end"
            slot="start"
            checked={value as boolean}
            onIonChange={(e) => onChange(e.detail.checked)}
          >
            {label}
          </IonCheckbox>
        );
      case 'radio':
        return (
          <IonRadio
            labelPlacement="end"
            slot="start"
            value={value as string}
            // eslint-disable-next-line no-undef
            onChange={(e) => onChange((e.target as HTMLIonRadioElement).value!)}
          >
            {label}
          </IonRadio>
        );
      default:
        return (
          <IonInput
            label={label}
            labelPlacement="floating"
            type="text"
            value={value as string}
            onIonChange={(e) => onChange(e.detail.value || '')}
            placeholder={placeholder}
            clearInput={clearInput}
            required={required}
            disabled={disabled}
            readonly={readonly}
            className={error ? 'ion-invalid' : ''}
          />
        );
    }
  };

  return (
    <>
      <IonItem className={className}>{renderInput()}</IonItem>
      {error && (
        <IonText color="danger" className="ion-padding-start">
          <small>{error}</small>
        </IonText>
      )}
    </>
  );
};

export { FormField };
