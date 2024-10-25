import { useTranslations } from '@hooks/useTranslations';
import { IonButton, IonIcon } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { logoGoogle } from 'ionicons/icons';
import React from 'react';

export const GoogleLoginButton: React.FC = () => {
  const { getGoogleOAuthUrl } = useAuthStore();
  const { t } = useTranslations();

  const handleGoogleLogin = async () => {
    await getGoogleOAuthUrl();
  };

  return (
    <IonButton
      expand="block"
      color="light"
      className="ion-margin-bottom"
      onClick={handleGoogleLogin}
    >
      <IonIcon slot="start" icon={logoGoogle} />
      {t('loginForm.googleLogin')}
    </IonButton>
  );
};
