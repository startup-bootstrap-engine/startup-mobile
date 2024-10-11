import React from 'react';
import { IonButton } from '@ionic/react';
import { useAuthStore } from '../../store/api/userApi/useAuthStore';

const AppleLoginButton: React.FC = () => {
  const { appleLogin } = useAuthStore();

  const handleAppleLogin = async () => {
    // Aqui você pegaria os dados da Apple (idToken, email, authorizationCode) de algum modo, como a API da Apple
    const idToken = 'apple_id_token'; // Substituir pelos valores reais
    const email = 'user@apple.com'; // Substituir pelos valores reais
    const authorizationCode = 'apple_authorization_code'; // Substituir pelos valores reais
    await appleLogin(idToken, email, authorizationCode);
  };

  return (
    <IonButton expand="full" onClick={handleAppleLogin}>
      Login com Apple
    </IonButton>
  );
};

export default AppleLoginButton;
