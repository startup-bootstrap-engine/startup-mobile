import { IonButton, IonLoading, IonText } from '@ionic/react';
import React from 'react';
import type { Path } from 'react-hook-form';
import { FormField } from './FormField';

export type FormFieldType = 'text' | 'email' | 'password';

export interface IFormField<T> {
  name: Path<T>;
  label: string;
  type?: FormFieldType;
  required?: boolean;
  placeholder?: string;
  clearInput?: boolean;
}

interface IFormProps<T> {
  title: string;
  fields: IFormField<T>[];
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading?: boolean;
  error: string | null;
  submitText: string;
  loadingText?: string;
  values: Record<string, any>;
  errors: Record<string, any>;
  onChange: (name: Path<T>, value: any) => void;
  showBackButton?: boolean;
  children?: React.ReactNode;
}

export const Form = <T extends Record<string, any>>({
  fields,
  onSubmit,
  isLoading,
  error,
  submitText,
  loadingText,
  values,
  errors,
  onChange,
  children,
}: IFormProps<T>): React.JSX.Element => {
  return (
    <form onSubmit={onSubmit} className="ion-padding">
      {error && (
        <IonText color="danger" className="ion-padding-bottom">
          <p>{error}</p>
        </IonText>
      )}

      {fields.map((field) => (
        <FormField
          key={field.name.toString()}
          label={field.label}
          value={values[field.name.toString()]}
          onChange={(value) => onChange(field.name, value)}
          type={field.type}
          error={errors[field.name.toString()]?.message}
          required={field.required}
          clearInput={field.clearInput}
          placeholder={field.placeholder}
        />
      ))}

      <div className="ion-padding-top">
        <IonButton expand="block" type="submit" disabled={isLoading}>
          {submitText}
        </IonButton>

        {children}
      </div>

      <IonLoading isOpen={isLoading} message={loadingText} />
    </form>
  );
};
