import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/react';
import { useState } from 'react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { useTranslations } from '@hooks/useTranslations';
import { useUserSettingsStore } from '@store/userSettings/store';
import React from 'react';

export const UserSettings: React.FC = () => {
  const { t } = useTranslations();

  const {
    darkModeEnabled,
    notificationsEnabled,
    privacyEnabled,
    language,
    setDarkMode,
    setNotificationsEnabled,
    setPrivacyEnabled,
    setLanguage,
  } = useUserSettingsStore();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const { isLoading, updateUser } = useAuthStore();

  const handleSaveSettings = async () => {
    try {
      await updateUser(name, address, phone);
      console.log('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonItem>
          <IonLabel>{t('userSettings.nameInput.title')}</IonLabel>
          <IonInput
            value={name}
            placeholder={t('userSettings.nameInput.placeholder')}
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel>{t('userSettings.addressInput.title')}</IonLabel>
          <IonInput
            value={address}
            placeholder={t('userSettings.addressInput.placeholder')}
            onIonChange={(e) => setAddress(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel>{t('userSettings.phoneInput.title')}</IonLabel>
          <IonInput
            value={phone}
            placeholder={t('userSettings.phoneInput.placeholder')}
            onIonChange={(e) => setPhone(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel>{t('userSettings.notification')}</IonLabel>
          <IonToggle
            checked={notificationsEnabled}
            onIonChange={(e) => setNotificationsEnabled(e.detail.checked)}
          />
        </IonItem>

        <IonItem>
          <IonLabel>{t('userSettings.privacy')}</IonLabel>
          <IonToggle
            checked={privacyEnabled}
            onIonChange={(e) => setPrivacyEnabled(e.detail.checked)}
          />
        </IonItem>

        <IonItem>
          <IonLabel>{t('userSettings.language.title')}</IonLabel>
          <IonSelect
            value={language}
            placeholder={t('userSettings.language.placeholder')}
            onIonChange={(e) => setLanguage(e.detail.value!)}
          >
            <IonSelectOption value="en">
              {t('userSettings.language.english')}
            </IonSelectOption>
            <IonSelectOption value="pt">
              {t('userSettings.language.portuguese')}
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Dark Mode</IonLabel>
          <IonToggle
            checked={darkModeEnabled}
            onIonChange={(e) => setDarkMode(e.detail.checked)}
          />
        </IonItem>

        <IonButton expand="full" onClick={handleSaveSettings}>
          Salvar Configurações
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
