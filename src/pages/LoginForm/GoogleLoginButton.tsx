import { useTranslations } from '@hooks/useTranslations';
import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { logoGoogle } from 'ionicons/icons';
import React from 'react';

export const GoogleLoginButton: React.FC = () => {
  const { getGoogleOAuthUrl, isLoading } = useAuthStore();
  const { t } = useTranslations();

  const handleGoogleLogin = async () => {
    try {
      await getGoogleOAuthUrl();
    } catch (error) {
      console.error(t('loginForm.socialLogin.googleError'), error);
    }
  };

  return (
    <IonButton
      expand="block"
      color="light"
      className="ion-margin-bottom"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <IonSpinner name="crescent" />
      ) : (
        <IonIcon slot="start" icon={logoGoogle} />
      )}
      {isLoading
        ? t('loginForm.socialLogin.loading')
        : t('loginForm.socialLogin.google')}
    </IonButton>
  );
};
