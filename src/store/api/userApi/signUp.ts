import { setToken } from '@utils/tokenStorage';

import type { IAuthState } from './types/authTypes';
import type { ITokenResponse } from './types/tokenTypes';
import type { IUser } from './types/userTypes';

const apiURL = import.meta.env.VITE_API_URL;

export const signUp = async (
  email: string,
  password: string,
  passwordConfirmation: string,
  name: string,
  set: (_state: Partial<IAuthState>) => void,
): Promise<IUser> => {
  set({ isLoading: true, error: null });
  try {
    const response = await fetch(`${apiURL}/auth/signup`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, passwordConfirmation, name }),
      referrerPolicy: 'strict-origin-when-cross-origin',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register user!');
    }

    const newUser: IUser = await response.json();

    const { accessToken, refreshToken }: ITokenResponse = {
      accessToken: newUser.refreshTokens[0]?.token,
      refreshToken: newUser.refreshTokens[0]?.token,
    };

    await setToken(accessToken, refreshToken);

    set({
      token: accessToken,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });

    return newUser;
  } catch (error) {
    set({
      isLoading: false,
      error: error.message,
    });
    throw error;
  }
};
