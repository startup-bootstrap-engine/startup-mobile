import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { useHistory } from 'react-router-dom';
import { useTranslations } from '@hooks';

export const Dashboard: React.FC = () => {
  const { logout } = useAuthStore();
  const history = useHistory();
  const { t } = useTranslations();

  const handleLogout = async () => {
    await logout();
    history.push('/login');
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
        <IonButton
          type="submit"
          expand="full"
          color="danger"
          onClick={handleLogout}
        >
          {t('loginForm.logout')}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
