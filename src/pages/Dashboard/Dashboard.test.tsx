import '@tests/i18nTest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Dashboard } from './Dashboard';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const mockLogoutSpy = vi.fn();

vi.mock('@store/api/userApi/useAuthStore', () => ({
  useAuthStore: vi.fn(() => ({
    logout: mockLogoutSpy, // Make sure this is used correctly
    isAuthenticated: true,
  })),
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

    await userEvent.click(screen.getByText('Logout'));

    await waitFor(() => expect(mockLogoutSpy).toHaveBeenCalled());
  });
});
