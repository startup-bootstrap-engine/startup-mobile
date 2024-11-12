/**
 * Interface for alert button properties.
 */
export interface IAlertButton {
  text: string;
  role?: 'cancel' | 'destructive';
  handler?: (value?: any) => void;
}
