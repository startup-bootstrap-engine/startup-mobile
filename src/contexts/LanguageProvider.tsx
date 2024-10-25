import React, { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTranslations } from '../hooks/useTranslations';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [storedLanguage] = useLocalStorage('i18nextLng', 'en');
  const { i18n } = useTranslations();

  useEffect(() => {
    i18n.changeLanguage(storedLanguage);
  }, [storedLanguage, i18n]);

  return <>{children}</>;
};
