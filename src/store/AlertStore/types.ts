interface IBaseInput {
  placeholder?: string;
  label?: string;
  type: 'text' | 'number' | 'textarea' | 'password' | 'radio';
  value?: string;
  attributes?: { [key: string]: string | number };
}

interface ITextInput extends IBaseInput {
  type: 'text' | 'number' | 'textarea' | 'password';
  min?: number;
  max?: number;
}

interface IRadioInput extends IBaseInput {
  type: 'radio';
  value: string; // Radio inputs should always have a value
}

export type IAlertInput = ITextInput | IRadioInput;
