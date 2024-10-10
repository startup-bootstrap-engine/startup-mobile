import { create } from 'zustand';
import { login } from './login';
import { signUp } from './signUp';
import { logout } from './logout';
import { checkAuth } from './checkAuth';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, passwordConfirmation: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      await login(email, password, set);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: 'Erro no login. Verifique suas credenciais.' });
    }
  },

  signUp: async (email: string, password: string, passwordConfirmation: string, name: string) => {
    try {
      set({ isLoading: true, error: null });
      await signUp(email, password, passwordConfirmation, name, set);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: 'Erro no registro. Verifique suas informações.' });
    }
  },

  logout: async () => {
    try {
      await logout(set);
    } catch (error) {
      set({ error: 'Erro no logout.' });
    }
  },

  checkAuth: async () => {
    try {
      await checkAuth(set);
    } catch (error) {
      set({ token: null, isAuthenticated: false });
    }
  },
}));
