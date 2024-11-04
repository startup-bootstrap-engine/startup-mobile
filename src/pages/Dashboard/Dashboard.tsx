import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useTranslations } from '@hooks';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

export const Dashboard: React.FC = () => {
  const { logout } = useAuthStore();
  const history = useHistory();
  const { t } = useTranslations();

  const handleLogout = async (): Promise<void> => {
    await logout();
    history.push('/login');
  };
  const handleChangePassword = (): void => {
    history.push('/change-password');
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('dashboard.title')}</IonTitle>
          <IonButton slot="end" onClick={handleChangePassword}>
            Change Password
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{t('dashboard.subtitle')}</h2>
        <p>{t('dashboard.description')}</p>

        <IonButton
          expand="full"
          color="danger"
          type="submit"
          onClick={handleLogout}
          className="ion-margin-top"
        >
          {t('loginForm.logout')}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
