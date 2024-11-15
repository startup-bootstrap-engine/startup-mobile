import { PageLayout } from '@components/layout/PageLayout';
import { TabBar } from '@components/TabBar';
import { home, search, person } from 'ionicons/icons';
import React from 'react';
import { HomeTab } from '../Tabs/HomeTab';
import { SearchTab } from '../Tabs/SearchTab';
import { ProfileTab } from '../Tabs/ProfileTab';
import { useTranslations } from '@hooks/useTranslations';
import { IonContent, IonPage } from '@ionic/react';
import { AlertInput } from '../../components/alert/AlertInput';
import { AlertRadio } from '../../components/alert/AlertRadio';
import { AlertSimple } from '../../components/alert/AlertSimple';

export const Dashboard: React.FC = () => {
  const { t } = useTranslations();

  const tabs = [
    {
      tab: 'dashboard/home',
      label: t('dashboard.home'),
      icon: home,
      component: HomeTab,
    },
    {
      tab: 'dashboard/search',
      label: t('dashboard.search'),
      icon: search,
      component: SearchTab,
    },
    {
      tab: 'dashboard/profile',
      label: t('dashboard.profile'),
      icon: person,
      component: ProfileTab,
    },
  ];

  return (
    <PageLayout showBackButton={false} title={t('dashboard.title')}>
      <IonPage>
        <TabBar tabs={tabs} />
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
