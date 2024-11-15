import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { logoApple } from 'ionicons/icons';
import React from 'react';

import { useTranslations } from '../../hooks/useTranslations';
import { useAuthStore } from '../../store/api/userApi/useAuthStore';

export const AppleLoginButton: React.FC = () => {
  const { appleLogin, isLoading } = useAuthStore();
  const { t } = useTranslations();

  const handleAppleLogin = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    try {
      await appleLogin(
        'apple_id_token',
        'user@apple.com',
        'apple_authorization_code',
      );
    } catch (error) {
      console.error(t('loginForm.socialLogin.appleError'), error);
    }
  };

  return (
    <IonButton
      expand="block"
      color="light"
      onClick={handleAppleLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <IonSpinner name="crescent" />
      ) : (
        <IonIcon slot="start" icon={logoApple} />
      )}
      {isLoading
        ? t('loginForm.socialLogin.loading')
        : t('loginForm.socialLogin.apple')}
    </IonButton>
  );
};
