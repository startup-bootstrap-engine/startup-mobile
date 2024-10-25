import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const MainMenu: FC = () => {
  const { t } = useTranslation();

  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/settings" routerDirection="forward">
              <IonIcon icon={settingsOutline} slot="start" />
              <IonLabel>{t('settings.title')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
