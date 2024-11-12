import { getToken, removeToken } from '../../../utils/tokenStorage';
import { logout } from './logout';
import type { IAuthState } from './types/authTypes';

const apiURL = import.meta.env.VITE_API_URL;

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  set: (_state: Partial<IAuthState>) => void,
): Promise<void> => {
  try {
    set({ isLoading: true, error: null });

    const token = await getToken();
    if (!token) {
      throw new Error(`You're not logged in. Please log in and try again.`);
    }

    const response = await fetch(`${apiURL}/auth/change-password`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    await removeToken();
    await logout(set);

    set({ isLoading: false, error: null });
  } catch (error) {
    set({ isLoading: false, error: error.message });
  }
};
