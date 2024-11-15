import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import {
  logOutOutline,
  lockClosedOutline,
  settingsOutline,
} from 'ionicons/icons';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

export const MainMenu: FC = () => {
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  const history = useHistory();

  const handleLogout = async (): Promise<void> => {
    await logout();
    history.push('/login');
  };

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
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/change-password" routerDirection="forward">
              <IonIcon icon={lockClosedOutline} slot="start" />
              <IonLabel>{t('passwordForms.changePasswordForm')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem button={true} onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" />
              <IonLabel>{t('loginForm.logout')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
