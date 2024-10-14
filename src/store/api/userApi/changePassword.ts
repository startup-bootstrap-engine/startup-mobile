import { getToken, removeToken } from '../../../utils/tokenStorage';
import { AuthState } from './types/authTypes';
import { logout } from './logout'; // Importa a função de logout para reutilizar

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

    // Limpa os tokens e faz o logout após a troca de senha
    await removeToken(); // Remove os tokens armazenados localmente
    await logout(set); // Desloga o usuário (limpa o estado de autenticação)

    set({ isLoading: false, error: null });
  } catch (error: any) {
    set({ isLoading: false, error: error.message });
  }
};
