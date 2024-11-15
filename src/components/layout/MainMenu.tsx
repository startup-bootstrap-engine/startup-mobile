import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import {
  lockClosedOutline,
  logOutOutline,
  settingsOutline,
  gridOutline,
  home,
} from 'ionicons/icons';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/api/userApi/useAuthStore';

export const MainMenu: FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();

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
          {isAuthenticated && (
            <>
              <IonMenuToggle autoHide={false}>
                <IonItem routerLink="/index/home" routerDirection="none">
                  <IonIcon icon={home} slot="start" />
                  <IonLabel>{t('index.title')}</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem routerLink="/dashboard" routerDirection="none">
                  <IonIcon icon={gridOutline} slot="start" />
                  <IonLabel>{t('dashboard.title')}</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem
                  routerLink="/change-password"
                  routerDirection="forward"
                >
                  <IonIcon icon={lockClosedOutline} slot="start" />
                  <IonLabel>{t('passwordForms.changePasswordForm')}</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem routerLink="/logout" routerDirection="none">
                  <IonIcon icon={logOutOutline} slot="start" />
                  <IonLabel>{t('loginForm.logout')}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
