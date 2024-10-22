import { AuthState } from './types/authTypes';
import { getToken, removeToken } from '../../../utils/tokenStorage';

const apiURL = import.meta.env.VITE_API_URL;

export const logout = async (
  set: (_state: Partial<AuthState>) => void,
): Promise<void> => {
  const token = await getToken();
  if (token) {
    await fetch(`${apiURL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-Type': 'application/json',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
    });
  }
  await removeToken();
  set({ token: null, isAuthenticated: false });
};
