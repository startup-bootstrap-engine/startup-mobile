import { setToken } from '@utils/tokenStorage';
import type { IAuthState } from './types/authTypes';
import type { ITokenResponse } from './types/tokenTypes';

const apiURL = import.meta.env.VITE_API_URL;

export const refreshToken = async (
  refreshTokenStr: string,
  set: (_state: Partial<IAuthState>) => void,
): Promise<ITokenResponse | null> => {
  try {
    const response = await fetch(`${apiURL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: refreshTokenStr }),
      referrerPolicy: 'strict-origin-when-cross-origin',
    });

    if (!response.ok) {
      // If refresh token is invalid/expired, clear auth state
      if (response.status === 401) {
        set({
          token: null,
          isAuthenticated: false,
          error: 'Session expired. Please login again.',
        });
        return null;
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to refresh token');
    }

    const tokens: ITokenResponse = await response.json();
    await setToken(tokens.accessToken, tokens.refreshToken);

    set({
      token: tokens.accessToken,
      isAuthenticated: true,
      error: null,
    });

    return tokens;
  } catch (error) {
    set({
      error: error.message,
    });
    return null;
  }
};
