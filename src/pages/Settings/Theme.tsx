import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { ThemeSelector } from '../../components/layout/ThemeSelector';

export const Theme: React.FC = () => {
  return (
    <PageLayout title="Theme Settings" showBackButton={true}>
      <ThemeSelector />
    </PageLayout>
  );
};
