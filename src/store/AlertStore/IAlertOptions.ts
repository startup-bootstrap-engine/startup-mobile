import type { IAlertInput } from './IAlertInput';
import type { IAlertButton } from './IAlertButton';

/**
 * Interface for alert options.
 */
export interface IAlertOptions {
  subHeader?: string;
  buttons?: (string | IAlertButton)[];
  inputs?: IAlertInput[];
}
