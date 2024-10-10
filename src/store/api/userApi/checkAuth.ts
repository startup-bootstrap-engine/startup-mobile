import { AuthState } from './types/authTypes';
import { getToken } from '../../../utils/tokenStorage';
import { isTokenValid } from '../../../utils/jwtUtils';
import { TokenResponse } from './types/tokenTypes';

export const checkAuth = async (
  set: (state: Partial<AuthState>) => void
): Promise<void> => {
  set({ isLoading: true });

  // Obtém o token armazenado, que inclui accessToken e refreshToken
  const token: TokenResponse | null = await getToken();

  if (token && isTokenValid(token.accessToken)) {
    set({ token: token.accessToken, isAuthenticated: true, isLoading: false });
  } else {
    set({ token: null, isAuthenticated: false, isLoading: false });
  }
};
