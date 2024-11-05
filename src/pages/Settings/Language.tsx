import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
} from '@ionic/react';
import React, { useState } from 'react';

import { PageLayout } from '../../components/layout/PageLayout';
import type { TranslationKeys } from '../../hooks/useTranslations';
import { useTranslations } from '../../hooks/useTranslations';

const languages: { code: string; name: TranslationKeys }[] = [
  { code: 'en', name: 'settings.languages.en' },
  { code: 'pt-BR', name: 'settings.languages.pt-BR' },
  { code: 'ja', name: 'settings.languages.ja' },
];

export const Language: React.FC = () => {
  const { i18n, t } = useTranslations();
  const [language, setLanguage] = useState(i18n.language || 'en');

  const handleLanguageChange = (newLanguage: string): void => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
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
