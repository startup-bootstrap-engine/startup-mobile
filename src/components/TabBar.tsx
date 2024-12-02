import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import React from 'react';

export interface ITabConfig {
  route: string;
  label: string;
  icon: string;
  component: React.ComponentType;
}

interface IProps {
  tabs: ITabConfig[];
  children: React.ReactNode;
}

export const TabBar: React.FC<IProps> = ({ tabs, children }) => {
  return (
    <IonTabs>
      {children}

      <IonTabBar slot="bottom">
        {tabs.map(({ route, label, icon }) => (
          <IonTabButton key={route} tab={route} href={route}>
            <IonIcon icon={icon} />
            <IonLabel>{label}</IonLabel>
          </IonTabButton>
        ))}
      </IonTabBar>
    </IonTabs>
  );
};
