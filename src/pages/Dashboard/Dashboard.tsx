import { PageLayout } from '@components/layout/PageLayout';
import { useTranslations } from '@hooks';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { logout } = useAuthStore();
  const history = useHistory();
  const { t } = useTranslations();

  const handleLogout = async () => {
    await logout();
    history.push('/login');
  };
  return (
    <PageLayout showBackButton={false} title={t('dashboard.title')}>
      <IonPage>
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
    </PageLayout>
  );
};

export default Dashboard;
