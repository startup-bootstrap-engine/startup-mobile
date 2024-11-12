import { useToastStore } from '@hooks/useToastStore';
import { IonButton, IonLoading } from '@ionic/react';
import React, { useEffect } from 'react';
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
  fields: IFormField<T>[];
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  submitText: string;
  loadingText?: string;
  values: Record<string, any>;
  fieldErrors: Record<string, any>;
  onChange: (name: Path<T>, value: any) => void;
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
  fieldErrors,
  onChange,
  children,
}: IFormProps<T>): React.JSX.Element => {
  const { showToast } = useToastStore();

  // show toasts on error

  useEffect(() => {
    if (error) {
      showToast({
        message: error,
        type: 'error',
      });
    }
  }, [error, showToast]);

  return (
    <form onSubmit={onSubmit} className="ion-padding">
      {fields.map((field) => (
        <FormField
          key={field.name.toString()}
          label={field.label}
          value={values[field.name.toString()]}
          onChange={(value) => onChange(field.name, value)}
          type={field.type}
          error={fieldErrors[field.name.toString()]?.message}
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
