import { PageLayout } from '@components/layout/PageLayout';
import React from 'react';
import { useTranslations } from '@hooks/useTranslations';
import { IonPage } from '@ionic/react';
import { HomeTab } from '../Tabs/HomeTab';
import { SearchTab } from '../Tabs/SearchTab';
import { ProfileTab } from '../Tabs/ProfileTab';
import { TabBar, type ITabConfig } from '@components/TabBar';
import { home, search, person } from 'ionicons/icons';

export const Index: React.FC = () => {
  const { t } = useTranslations();

  const tabs: ITabConfig[] = [
    {
      route: '/index/home',
      label: t('index.home'),
      icon: home,
      component: HomeTab,
    },
    {
      route: '/index/search',
      label: t('index.search'),
      icon: search,
      component: SearchTab,
    },
    {
      route: '/index/profile',
      label: t('index.profile'),
      icon: person,
      component: ProfileTab,
    },
  ];

  return (
    <PageLayout showBackButton={false} title={t('index.title')}>
      <IonPage>
        <TabBar tabs={tabs} />
      </IonPage>
    </PageLayout>
  );
};
