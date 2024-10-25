import { useTranslations } from '@hooks/useTranslations';
import { IonButton, IonIcon } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { logoApple } from 'ionicons/icons';
import React from 'react';

export const AppleLoginButton: React.FC = () => {
  const appleLogin = useAuthStore((state) => state.appleLogin);
  const { t } = useTranslations();

  const handleAppleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await appleLogin(
        'apple_id_token',
        'user@apple.com',
        'apple_authorization_code',
      );
    } catch (error) {
      console.error('Apple login error:', error);
    }
  };

  return (
    <IonButton expand="block" color="light" onClick={handleAppleLogin}>
      <IonIcon slot="start" icon={logoApple} />
      {t('loginForm.appleLogin')}
    </IonButton>
  );
};
