import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import React from 'react';
import { PrivateRoute } from './PrivateRoute';
import { IonReactRouter } from '@ionic/react-router';

interface ITabConfig {
  tab: string;
  label: string;
  icon: string;
  component: React.ComponentType;
}

interface IProps {
  tabs: ITabConfig[];
}

export const TabBar: React.FC<IProps> = ({ tabs }) => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet id="tabs-router">
          {tabs.map(({ tab, component: Component }) => (
            <PrivateRoute
              key={`route-${tab}`}
              path={`/${tab}`}
              component={Component}
              exact={true}
            />
          ))}
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          {tabs.map(({ tab, label, icon }) => (
            <IonTabButton key={tab} tab={tab} href={`/${tab}`}>
              <IonIcon icon={icon} />
              <IonLabel>{label}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};
