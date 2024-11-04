import React from 'react';

import { PageLayout } from '@components/layout/PageLayout';
import { ThemeSelector } from '@components/layout/ThemeSelector';
import { useTranslations } from '@hooks';

export const Theme: React.FC = () => {
  const { t } = useTranslations();

  return (
    <PageLayout title={t('settings.themeSettings')} showBackButton={true}>
      <ThemeSelector />
    </PageLayout>
  );
};
