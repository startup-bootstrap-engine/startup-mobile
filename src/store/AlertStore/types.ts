/* eslint-disable @typescript-eslint/no-explicit-any */
interface IBaseInput {
  placeholder?: string;
  label?: string;
  value?: string | number;
  attributes?: { [key: string]: string | number };
}

interface ITextInput extends IBaseInput {
  type: 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'tel';
  name: string;
  min?: number;
  max?: number;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
  step?: number;
  autocomplete?: string;
  autofocus?: boolean;
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;
}

interface IRadioInput extends IBaseInput {
  type: 'radio';
  value: string;
}

export type IAlertInput = ITextInput | IRadioInput;

export interface IAlertButton {
  text: string;
  role?: 'cancel' | 'destructive';
  handler?: (value?: any) => void;
}

export interface IAlertOptions {
  subHeader?: string;
  buttons?: (string | IAlertButton)[];
  inputs?: IAlertInput[];
}

export interface IAlertState {
  showAlert: (
    header: string,
    message: string,
    options?: IAlertOptions,
  ) => Promise<void>;
  closeAlert: () => Promise<void>;
}
