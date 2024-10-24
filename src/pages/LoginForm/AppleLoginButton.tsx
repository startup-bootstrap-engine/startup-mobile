import React from 'react';
import { IonButton } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { useTranslations } from '@hooks';

const AppleLoginButton: React.FC = () => {
  const { appleLogin } = useAuthStore();
  const { t } = useTranslations();

  const handleAppleLogin = async () => {
    const idToken = 'apple_id_token';
    const email = 'user@apple.com';
    const authorizationCode = 'apple_authorization_code';
    await appleLogin(idToken, email, authorizationCode);
  };

  return (
    <IonButton expand="full" onClick={handleAppleLogin}>
      {t('loginForm.appleLogin')}
    </IonButton>
  );
};

export default AppleLoginButton;
