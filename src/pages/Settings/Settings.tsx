import { IonContent, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import {
  colorPaletteOutline,
  languageOutline,
  lockClosedOutline,
  notificationsOutline,
} from 'ionicons/icons';
import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';

export const Settings: React.FC = () => {
  return (
    <PageLayout title="Settings" showBackButton={true}>
      <IonContent>
        <IonList>
          <IonItem routerLink="/settings/theme">
            <IonIcon icon={colorPaletteOutline} slot="start" />
            <IonLabel>Theme</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={notificationsOutline} slot="start" />
            <IonLabel>Notifications</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={languageOutline} slot="start" />
            <IonLabel>Language</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={lockClosedOutline} slot="start" />
            <IonLabel>Privacy</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </PageLayout>
  );
};
