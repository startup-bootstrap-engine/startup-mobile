import { setToken } from '../../../utils/tokenStorage';
import { AuthState } from './types/authTypes';
import { TokenResponse } from './types/tokenTypes';

const apiURL = import.meta.env.VITE_API_URL;

export const login = async (
  email: string, 
  password: string, 
  set: (state: Partial<AuthState>) => void
): Promise<void> => {
  set({ isLoading: true, error: null });
  try {
    const response = await fetch(`${apiURL}/auth/login`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      referrerPolicy: 'strict-origin-when-cross-origin',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha no login');
    }

    const { accessToken, refreshToken }: TokenResponse = await response.json();

    await setToken(accessToken, refreshToken);

    set({
      token: accessToken,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  } catch (error) {
    set({
      isLoading: false,
      error: 'Erro no login. Verifique suas credenciais.',
    });
  }
};
