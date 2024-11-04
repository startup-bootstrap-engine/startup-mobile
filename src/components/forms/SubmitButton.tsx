import { IonButton } from '@ionic/react';
import React from 'react';

interface IProps {
  loading?: boolean;
  text: string;
}

export const SubmitButton: React.FC<IProps> = ({ loading = false, text }) => {
  return (
    <IonButton
      expand="block"
      type="submit"
      disabled={loading}
      className="ion-margin-top"
    >
      {loading ? 'Loading...' : text}
    </IonButton>
  );
};
