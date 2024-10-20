import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react';
import { useAuthStore } from '../../store/api/userApi/useAuthStore';
import { useHistory } from 'react-router-dom';
import { useTranslations } from '../../hooks/useTranslations';

export const Dashboard: React.FC = () => {
  const { logout } = useAuthStore(); // Hook para realizar o logout
  const history = useHistory();
  const { t } = useTranslations();

  const handleLogout = async () => {
    await logout(); // Chama a função de logout da store
    history.push('/login'); // Redireciona para a página de login após o logout
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('dashboard.title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{t('dashboard.subtitle')}</h2>
        <p>{t('dashboard.description')}</p>
        <IonButton expand="full" color="danger" onClick={handleLogout}>
          {t('loginForm.logout')}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
