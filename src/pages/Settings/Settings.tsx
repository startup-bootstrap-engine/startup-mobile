import { IonContent, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import {
  colorPaletteOutline,
  languageOutline,
  lockClosedOutline,
  notificationsOutline,
} from 'ionicons/icons';
import React from 'react';

import { PageLayout } from '../../components/layout/PageLayout';
import { useTranslations } from '../../hooks/useTranslations';

export const Settings: React.FC = () => {
  const { t } = useTranslations();

  return (
    <PageLayout title={t('settings.title')} showBackButton={true}>
      <IonContent>
        <IonList>
          <IonItem routerLink="/settings/theme">
            <IonIcon icon={colorPaletteOutline} slot="start" />
            <IonLabel>{t('settings.theme')}</IonLabel>
          </IonItem>
          <IonItem routerLink="/settings/language">
            <IonIcon icon={languageOutline} slot="start" />
            <IonLabel>{t('settings.language')}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={notificationsOutline} slot="start" />
            <IonLabel>{t('settings.notifications')}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={lockClosedOutline} slot="start" />
            <IonLabel>{t('settings.privacy')}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </PageLayout>
  );
};
