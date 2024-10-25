import { useTranslations } from '@hooks/useTranslations';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import React from 'react';

export const Dashboard: React.FC = () => {
  const { logout } = useAuthStore();
  const { t } = useTranslations();

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
        <IonButton expand="full" color="danger" type="submit" onClick={logout}>
          {t('loginForm.logout')}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
