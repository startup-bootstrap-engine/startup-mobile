import { ITextInput } from './ITextInput';
import { IRadioInput } from './IRadioInput';

/**
 * Union type for alert inputs.
 */
export type IAlertInput = ITextInput | IRadioInput;
