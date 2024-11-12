import { IBaseInput } from './IBaseInput';

/**
 * Interface for radio input properties.
 */
export interface IRadioInput extends IBaseInput {
  type: 'radio';
  value: string; // Radio inputs should always have a value
}
