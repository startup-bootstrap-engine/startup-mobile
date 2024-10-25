import { IonButton } from '@ionic/react';
import React from 'react';

interface SubmitButtonProps {
  loading?: boolean;
  text: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading = false,
  text,
}) => {
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
