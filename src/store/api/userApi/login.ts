import { setToken } from '@utils/tokenStorage';
import { fetchWithAuth } from '@utils/apiUtils';
import type { IAuthState } from './types/authTypes';
import type { ITokenResponse } from './types/tokenTypes';

export const login = async (
  email: string,
  password: string,
  set: (_state: Partial<IAuthState>) => void,
): Promise<void> => {
  set({ isLoading: true, error: null });
  try {
    const response = await fetchWithAuth(
      '/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        requiresAuth: false,
      },
      set,
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const { accessToken, refreshToken }: ITokenResponse = await response.json();

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
      error: error.message,
    });
  }
};
