import { IAlertButton } from '@store/AlertStore/IAlertButton';
import { IAlertInput } from '@store/AlertStore/IAlertInput';
import { IFormData } from '@store/AlertStore/IFormData';

export interface IAlertComponentProps {
  header: string;
  message: string;
  inputs?: IAlertInput[];
  buttons?: (string | IAlertButton)[];
  subHeader?: string;
  buttonText: string;
  onOk?: (data: IFormData) => void; // Callback for OK button
}
