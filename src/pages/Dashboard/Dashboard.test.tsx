import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import '@tests/i18nTest';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { Dashboard } from './Dashboard';

vi.mock('@hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'dashboard.title': 'Dashboard',
        'dashboard.subtitle': 'Welcome to the dashboard.',
        'dashboard.description': 'This is your dashboard.',
      };
      return translations[key];
    },
  }),
}));

describe('Dashboard Component', () => {
  it('should render the Dashboard with correct title, subtitle, and description', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Welcome to the dashboard.' }),
    ).toBeInTheDocument();
    expect(screen.getByText('This is your dashboard.')).toBeInTheDocument();
  });
});
