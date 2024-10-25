import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
} from '@ionic/react';
import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TranslationKeys, useTranslations } from '../../hooks/useTranslations';

const languages: Array<{ code: string; name: TranslationKeys }> = [
  { code: 'en', name: 'settings.languages.en' },
  { code: 'pt-BR', name: 'settings.languages.pt-BR' },
];

export const Language: React.FC = () => {
  const { i18n, t } = useTranslations();
  const [language, setLanguage] = useLocalStorage('i18nextLng', 'en');

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <PageLayout title={t('settings.language')} showBackButton={true}>
      <IonContent>
        <IonList>
          <IonRadioGroup
            value={language}
            onIonChange={(e) => handleLanguageChange(e.detail.value)}
          >
            {languages.map((lang) => (
              <IonItem key={lang.code}>
                <IonLabel>{t(lang.name)}</IonLabel>
                <IonRadio slot="start" value={lang.code} />
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonList>
      </IonContent>
    </PageLayout>
  );
};
