import type { IBaseInput } from './IBaseInput';

/**
 * Interface for text input properties.
 */
export interface ITextInput extends IBaseInput {
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
