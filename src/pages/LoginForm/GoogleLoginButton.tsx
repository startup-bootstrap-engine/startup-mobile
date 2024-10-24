import React from 'react';
import { IonButton } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { useTranslations } from '@hooks';

export const GoogleLoginButton: React.FC = () => {
  const { getGoogleOAuthUrl } = useAuthStore();
  const { t } = useTranslations();

  const handleGoogleLogin = async () => {
    await getGoogleOAuthUrl();
  };

  return (
    <IonButton expand="full" onClick={handleGoogleLogin}>
      {t('loginForm.googleLogin')}
    </IonButton>
  );
};
