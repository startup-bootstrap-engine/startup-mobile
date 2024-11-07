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
import { useAlertStore } from '@store/useAlertStore';

export const Dashboard: React.FC = () => {
  const { logout } = useAuthStore();
  const history = useHistory();
  const { t } = useTranslations();
  const showAlert = useAlertStore((state) => state.showAlert);

  const handleButtonClick = (): void => {
    showAlert('Alert Title', 'This is an alert message', 'Optional SubHeader', [
      { text: 'Cancel', handler: () => console.log('Cancel clicked') },
      { text: 'OK', handler: () => console.log('OK clicked') },
    ]);
  };
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
        <IonButton onClick={handleButtonClick}>Show Alert</IonButton>;
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
