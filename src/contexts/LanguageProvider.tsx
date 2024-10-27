import React, { useEffect } from 'react';
import { useLanguageStore } from '../store/useLanguageStore';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { language, setLanguage } = useLanguageStore();

  useEffect(() => {
    setLanguage(language);
  }, []);

  return <>{children}</>;
};
