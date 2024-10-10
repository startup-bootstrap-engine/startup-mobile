import { getToken } from '../../../utils/tokenStorage';
import { AuthState } from './types/authTypes';

const apiURL = import.meta.env.VITE_API_URL;

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  set: (state: Partial<AuthState>) => void,
): Promise<void> => {
  try {
    set({ isLoading: true, error: null });

    const token = await getToken(); // Recupera o token de autenticação
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${apiURL}/auth/change-password`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao alterar a senha');
    }

    set({ isLoading: false, error: null });
  } catch (error: any) {
    set({ isLoading: false, error: error.message });
  }
};
