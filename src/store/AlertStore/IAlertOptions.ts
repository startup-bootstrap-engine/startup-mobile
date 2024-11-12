import { IAlertInput } from './IAlertInput';
import { IAlertButton } from './IAlertButton';

/**
 * Interface for alert options.
 */
export interface IAlertOptions {
  subHeader?: string;
  buttons?: (string | IAlertButton)[];
  inputs?: IAlertInput[];
}
