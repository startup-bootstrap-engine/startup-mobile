import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import '@tests/i18nTest';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { Dashboard } from './Dashboard';

vi.mock('@store/api/userApi/useAuthStore', () => ({
  useAuthStore: () => ({
    isAuthenticated: true,
  }),
}));

describe('Dashboard Component', () => {
  it('should render the Dashboard and handle logout', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Welcome to the dashboard.' }),
    ).toBeInTheDocument();
  });
});
