import { isTokenValid } from '../../../utils/jwtUtils';
import { getToken } from '../../../utils/tokenStorage';
import type { IAuthState } from './types/authTypes';
import type { ITokenResponse } from './types/tokenTypes';

export const checkAuthApi = async (
  set: (_state: Partial<IAuthState>) => void,
): Promise<boolean> => {
  set({ isLoading: true });

  const token: ITokenResponse | null = await getToken();

  if (token && isTokenValid(token.accessToken)) {
    set({ token: token.accessToken, isAuthenticated: true, isLoading: false });
    return true;
  }

  set({ token: null, isAuthenticated: false, isLoading: false });
  return false;
};
