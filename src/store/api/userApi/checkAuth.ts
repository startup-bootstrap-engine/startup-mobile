import { isTokenValid } from '../../../utils/jwtUtils';
import { getToken } from '../../../utils/tokenStorage';
import { IAuthState } from './types/authTypes';
import { ITokenResponse } from './types/tokenTypes';

export const checkAuth = async (
  set: (_state: Partial<IAuthState>) => void,
): Promise<void> => {
  set({ isLoading: true });

  const token: ITokenResponse | null = await getToken();

  if (token && isTokenValid(token.accessToken)) {
    set({ token: token.accessToken, isAuthenticated: true, isLoading: false });
  } else {
    set({ token: null, isAuthenticated: false, isLoading: false });
  }
};
