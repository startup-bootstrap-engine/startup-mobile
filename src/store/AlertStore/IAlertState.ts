import type { IAlertOptions } from './IAlertOptions';

/**
 * Interface for alert state.
 */
export interface IAlertState {
  showAlert: (
    header: string,
    message: string,
    options?: IAlertOptions,
  ) => Promise<void>;
  closeAlert: () => Promise<void>;
}
