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

export interface ITabConfig {
  route: string;
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
          {tabs.map(({ route, component: Component }) => (
            <PrivateRoute
              key={`route-${route}`}
              path={route}
              component={Component}
              exact={true}
            />
          ))}
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          {tabs.map(({ route, label, icon }) => (
            <IonTabButton key={route} tab={route} href={route}>
              <IonIcon icon={icon} />
              <IonLabel>{label}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};
