import { getToken, removeToken } from '../../../utils/tokenStorage';
import { IAuthState } from './types/authTypes';

const apiURL = import.meta.env.VITE_API_URL;

export const logout = async (
  set: (_state: Partial<IAuthState>) => void,
): Promise<void> => {
  const token = await getToken();
  if (token) {
    await fetch(`${apiURL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        'content-Type': 'application/json',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
    });
  }
  await removeToken();
  set({ token: null, isAuthenticated: false });
};
