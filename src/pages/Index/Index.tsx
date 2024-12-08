import { PageLayout } from '@components/layout/PageLayout';
import { PrivateRoute } from '@components/PrivateRoute';
import { TabBar, type ITabConfig } from '@components/TabBar';
import { useTranslations } from '@hooks/useTranslations';
import { IonPage, IonRouterOutlet } from '@ionic/react';
import { home, person, search } from 'ionicons/icons';
import React from 'react';
import { HomeTab } from '../Tabs/HomeTab';
import { ProfileTab } from '../Tabs/ProfileTab';
import { SearchTab } from '../Tabs/SearchTab';

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
        <TabBar tabs={tabs}>
          <IonRouterOutlet id="tabs-router">
            {tabs.map(({ route, component: Component }) => (
              <PrivateRoute
                key={`route-${route}`}
                path={route}
                component={Component}
                exact={true}
              />
            ))}
          </IonRouterOutlet>
        </TabBar>
      </IonPage>
    </PageLayout>
  );
};
