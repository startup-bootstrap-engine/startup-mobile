import React from 'react';
import { IonButton } from '@ionic/react';
import { useAuthStore } from '../../store/api/userApi/useAuthStore';

export const GoogleLoginButton: React.FC = () => {
  const { getGoogleOAuthUrl } = useAuthStore();

  const handleGoogleLogin = async () => {
    await getGoogleOAuthUrl();
  };

  return (
    <IonButton expand="full" onClick={handleGoogleLogin}>
      Login com Google
    </IonButton>
  );
};
