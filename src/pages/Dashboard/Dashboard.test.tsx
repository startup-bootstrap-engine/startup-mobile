import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@tests/i18nTest';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Dashboard } from './Dashboard';

const mockLogoutSpy = vi.fn();

vi.mock('@store/api/userApi/useAuthStore', () => ({
  useAuthStore: () => ({
    logout: mockLogoutSpy,
    isAuthenticated: true,
  }),
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    mockLogoutSpy.mockClear();
  });

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

    await userEvent.click(screen.getByText('Sign Out'));

    await waitFor(() => expect(mockLogoutSpy).toHaveBeenCalled());
  });
});
