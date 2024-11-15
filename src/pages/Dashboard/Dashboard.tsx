import { PageLayout } from '@components/layout/PageLayout';
import { TabBar } from '@components/TabBar';
import { useTranslations } from '@hooks';
import { IonPage } from '@ionic/react';
import { home, search, person } from 'ionicons/icons';
import React from 'react';
import { HomeTab } from '../Tabs/HomeTab';
import { SearchTab } from '../Tabs/SearchTab';
import { ProfileTab } from '../Tabs/ProfileTab';

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
      </IonPage>
    </PageLayout>
  );
};
