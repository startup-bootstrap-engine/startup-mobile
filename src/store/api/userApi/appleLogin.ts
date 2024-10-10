import { setToken } from '../../../utils/tokenStorage';
import { AuthState } from './types/authTypes';

const apiURL = import.meta.env.VITE_API_URL;

export const appleLogin = async (
  idToken: string,
  email: string,
  authorizationCode: string,
  set: (state: Partial<AuthState>) => void,
): Promise<void> => {
  try {
    set({ isLoading: true, error: null });

    const response = await fetch(`${apiURL}/auth/apple`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken, email, authorizationCode }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao fazer login com Apple');
    }

    const data = await response.json();
    const { accessToken, refreshToken } = data;

    // Armazena o token e marca o usuário como autenticado
    await setToken(accessToken, refreshToken);
    set({ token: accessToken, isAuthenticated: true, isLoading: false });
  } catch (error: any) {
    set({ isLoading: false, error: error.message });
  }
};
