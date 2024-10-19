import './i18nTest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const mockLogout = vi.fn();

vi.mock('../store/api/userApi/useAuthStore', () => ({
  useAuthStore: vi.fn(() => ({ logout: mockLogout })),
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    mockLogout.mockClear();
  });
  it('should render the Dashboard and handle logout', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
