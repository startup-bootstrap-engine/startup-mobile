import type { IAuthState } from './types/authTypes';
import type { ITokenResponse } from './types/tokenTypes';
import { isTokenValid } from '../../../utils/jwtUtils';
import { getToken } from '../../../utils/tokenStorage';
import { refreshToken } from './refreshToken';

export const checkAuth = async (
  set: (_state: Partial<IAuthState>) => void,
): Promise<void> => {
  set({ isLoading: true });

  const tokens: ITokenResponse | null = await getToken();

  if (!tokens) {
    set({ token: null, isAuthenticated: false, isLoading: false });
    return;
  }

  // If access token is valid, use it
  if (isTokenValid(tokens.accessToken)) {
    set({ token: tokens.accessToken, isAuthenticated: true, isLoading: false });
    return;
  }

  // If access token is expired but we have refresh token, try to refresh
  if (tokens.refreshToken) {
    const newTokens = await refreshToken(tokens.refreshToken, set);
    if (newTokens) {
      set({
        token: newTokens.accessToken,
        isAuthenticated: true,
        isLoading: false,
      });
      return;
    }
  }

  // If we get here, authentication failed
  set({ token: null, isAuthenticated: false, isLoading: false });
};
