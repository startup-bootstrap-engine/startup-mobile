import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, it, beforeEach, MockedFunction } from 'vitest';
import { vi } from 'vitest';
import { UserSettings } from './UserSettings';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { useUserSettingsStore } from '@store/userSettings/store';
import '@tests/i18nTest';
import userEvent from '@testing-library/user-event';

// Mock das stores e hooks
vi.mock('@store/api/userApi/useAuthStore');
vi.mock('@store/userSettings/store');

describe('UserSettings Component', () => {
  beforeEach(() => {
    (
      useAuthStore as unknown as MockedFunction<typeof useAuthStore>
    ).mockReturnValue({
      updateUser: vi.fn(),
      isLoading: false,
    });

    (
      useUserSettingsStore as unknown as MockedFunction<
        typeof useUserSettingsStore
      >
    ).mockReturnValue({
      darkModeEnabled: false,
      notificationsEnabled: true,
      privacyEnabled: true,
      language: 'en',
      setDarkMode: vi.fn(),
      setNotificationsEnabled: vi.fn(),
      setPrivacyEnabled: vi.fn(),
      setLanguage: vi.fn(),
    });
  });

  it('should render the UserSettings form fields', () => {
    render(<UserSettings />);

    // Usando os textos diretamente nos selects
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Notification')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
  });

  // it('should call updateUser function on saving settings', async () => {
  //   const mockUpdateUser = vi.fn();
  //   (useAuthStore as jest.MockedFunction<typeof useAuthStore>).mockReturnValue({
  //     updateUser: mockUpdateUser,
  //     isLoading: false,
  //   });

  //   render(<UserSettings />);

  //   const nameInput = screen.getByText('Name');
  //   const addressInput = screen.getByText('Address');
  //   const phoneInput = screen.getByText('Phone');
  //   //fireEvent.input(nameInput, { target: { value: 'John Doe' } });
  //   await act(async () => {
  //       //fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  //       await userEvent.type(screen.getByText('Name'), 'John Doe' );
  //       await userEvent.type(screen.getByText('Address'), '123 Main St');
  //       await userEvent.type(screen.getByText('Phone'), '123-456-7890' );
  //   });
  //   // fireEvent.input(screen.getByLabelText('Endereço'), {
  //   //   target: { value: '123 Main St' },
  //   // });
  //   // fireEvent.input(screen.getByLabelText('Telefone'), {
  //   //   target: { value: '123-456-7890' },
  //   // });

  //   //fireEvent.click(screen.getByRole('button', { name: /Salvar Configurações/i }));

  //   await userEvent.click(screen.getByText('Salvar Configurações'));
  //   await waitFor(() => {
  //     expect(mockUpdateUser).toHaveBeenCalledWith('John Doe', '123 Main St', '123-456-7890');
  //   });
  // });

  //   it('should toggle dark mode when Dark Mode toggle is changed', () => {
  //     const mockSetDarkMode = vi.fn();
  //     (useUserSettingsStore as jest.MockedFunction<typeof useUserSettingsStore>).mockReturnValue({
  //       ...useUserSettingsStore(),
  //       setDarkMode: mockSetDarkMode,
  //       darkModeEnabled: false,
  //     });

  //     render(<UserSettings />);

  //     const darkModeToggle = screen.getByText('Dark Mode');
  //     act(() => {
  //         fireEvent.click(darkModeToggle);
  //     });

  //     expect(mockSetDarkMode).toHaveBeenCalledWith(true);
  //   });
});
