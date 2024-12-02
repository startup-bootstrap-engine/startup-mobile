import { PageLayout } from '@components/layout/PageLayout';
import React from 'react';
import { useTranslations } from '@hooks/useTranslations';
import { IonContent, IonPage } from '@ionic/react';
import { AlertInput } from '../../components/alert/AlertInput';
import { AlertRadio } from '../../components/alert/AlertRadio';
import { AlertSimple } from '../../components/alert/AlertSimple';

export const Dashboard: React.FC = () => {
  const { t } = useTranslations();

  return (
    <PageLayout showBackButton={false} title={t('dashboard.title')}>
      <IonPage>
        <IonContent className="ion-padding">
          <h2>{t('dashboard.subtitle')}</h2>
          <p>{t('dashboard.description')}</p>
          <AlertSimple />
          <AlertInput />
          <AlertRadio />
        </IonContent>
      </IonPage>
    </PageLayout>
  );
};
