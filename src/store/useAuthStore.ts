import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean; // Estado calculado a partir do token
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch('https://example.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Falha ao autenticar');
      }

      const data = await response.json();
      set({ token: data.token, isLoading: false, error: null });
    } catch (error: unknown) {
      // Define que o erro será do tipo unknown
      if (error instanceof Error) {
        set({ isLoading: false, error: error.message });
      } else {
        set({ isLoading: false, error: 'An unknown error occurred' });
      }
    }
  },

  logout: () => set({ token: null }),

  // Verifica se o usuário está autenticado com base no token
  isAuthenticated: get().token !== null, // Se houver token, o usuário está autenticado
}));
