import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dashboard } from './Dashboard';
import '@testing-library/jest-dom';
import { useAuthStore } from '../store/api/userApi/useAuthStore';
import { MemoryRouter } from 'react-router-dom';

// Create a mock function for logout
const mockLogout = vi.fn();

// Mock the useAuthStore function to return the mockLogout function
vi.mock('../store/api/userApi/useAuthStore', () => ({
  useAuthStore: vi.fn(() => ({ logout: mockLogout })),
}));

describe('Dashboard Component', () => {
  it('should render the Dashboard and handle logout', async () => {
    const mockLogout = vi.fn(); // Mock da função de logout

    // Mock do useAuthStore para retornar a função de logout
    vi.mocked(useAuthStore).mockReturnValue({ logout: mockLogout });

    // Renderizar o componente com o MemoryRouter para simular as rotas
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    // Verificar se o título "Dashboard" está no documento
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    // Verificar se o botão de logout está no documento
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();

    // Simular clique no botão de logout
    fireEvent.click(logoutButton);

    // Verificar se a função de logout foi chamada
    expect(mockLogout).toHaveBeenCalled();
  });
});
