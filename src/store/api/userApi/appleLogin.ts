import type { IAuthState } from './types/authTypes';
import { setToken } from '../../../utils/tokenStorage';

const apiURL = import.meta.env.VITE_API_URL;

export const appleLogin = async (
  idToken: string,
  email: string,
  authorizationCode: string,
  set: (_state: Partial<IAuthState>) => void,
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
      throw new Error(errorData.message || 'Apple login failed');
    }

    const data = await response.json();
    const { accessToken, refreshToken } = data;

    await setToken(accessToken, refreshToken);
    set({ token: accessToken, isAuthenticated: true, isLoading: false });
  } catch (error) {
    set({ isLoading: false, error: error.message });
    throw error;
  }
};
