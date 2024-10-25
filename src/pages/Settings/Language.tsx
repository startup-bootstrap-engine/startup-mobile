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
import { useTranslations } from '../../hooks/useTranslations';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'pt-BR', name: 'Português (Brasil)' },
];

export const Language: React.FC = () => {
  const { i18n } = useTranslations();
  const [language, setLanguage] = useLocalStorage('i18nextLng', 'en');

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <PageLayout title="Language" showBackButton={true}>
      <IonContent>
        <IonList>
          <IonRadioGroup
            value={language}
            onIonChange={(e) => handleLanguageChange(e.detail.value)}
          >
            {languages.map((lang) => (
              <IonItem key={lang.code}>
                <IonLabel>{lang.name}</IonLabel>
                <IonRadio slot="start" value={lang.code} />
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonList>
      </IonContent>
    </PageLayout>
  );
};
