import { getToken } from '@utils/tokenStorage';
import { AuthState } from './types/authTypes';

const apiURL = import.meta.env.VITE_API_URL;

export const updateUser = async (
  name: string,
  address: string,
  phone: string,
  set: (state: Partial<AuthState>) => void,
): Promise<void> => {
  try {
    set({ isLoading: true, error: null });

    const token = await getToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${apiURL}/users`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ name, address, phone }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || 'Erro ao atualizar os dados do usuário',
      );
    }

    set({ isLoading: false, error: null });
  } catch (error: any) {
    set({ isLoading: false, error: error.message });
  }
};
