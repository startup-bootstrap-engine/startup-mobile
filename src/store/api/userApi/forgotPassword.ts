import { AuthState } from './types/authTypes';

const apiURL = import.meta.env.VITE_API_URL;

export const forgotPassword = async (
  email: string,
  set: (_state: Partial<AuthState>) => void,
): Promise<void> => {
  try {
    set({ isLoading: true, error: null });

    const response = await fetch(`${apiURL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    set({ isLoading: false, error: null });
  } catch (error: any) {
    set({ isLoading: false, error: error.message });
  }
};
