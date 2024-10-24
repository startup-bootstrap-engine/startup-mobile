import { create } from 'zustand';
import { login } from './login';
import { signUp } from './signUp';
import { logout } from './logout';
import { checkAuth } from './checkAuth';
import { changePassword } from './changePassword';
import { forgotPassword } from './forgotPassword';
import { getGoogleOAuthUrl } from './googleOAuth';
import { appleLogin } from './appleLogin';
import { updateUser } from './updateUser';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (_email: string, _password: string) => Promise<void>;
  signUp: (
    _email: string,
    _password: string,
    _passwordConfirmation: string,
    _name: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  changePassword: (
    _currentPassword: string,
    _newPassword: string,
  ) => Promise<void>;
  forgotPassword: (_email: string) => Promise<void>;
  getGoogleOAuthUrl: () => Promise<void>;
  appleLogin: (
    idToken: string,
    email: string,
    authorizationCode: string,
  ) => Promise<void>;
  updateUser: (name: string, address: string, phone: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      await login(email, password, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message,
      });
    }
  },

  signUp: async (
    email: string,
    password: string,
    passwordConfirmation: string,
    name: string,
  ) => {
    try {
      set({ isLoading: true, error: null });
      await signUp(email, password, passwordConfirmation, name, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message,
      });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await logout(set);
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      await checkAuth(set);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        token: null,
        isAuthenticated: false,
        error: error.message,
      });
    }
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    try {
      set({ isLoading: true });
      await changePassword(currentPassword, newPassword, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message,
      });
    }
  },

  forgotPassword: async (email: string) => {
    try {
      set({ isLoading: true });
      await forgotPassword(email, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message,
      });
    }
  },

  getGoogleOAuthUrl: async () => {
    try {
      set({ isLoading: true });
      const googleOAuthUrl = await getGoogleOAuthUrl();
      window.location.href = googleOAuthUrl;
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message,
      });
    }
  },

  appleLogin: async (
    idToken: string,
    email: string,
    authorizationCode: string,
  ) => {
    try {
      set({ isLoading: true });
      await appleLogin(idToken, email, authorizationCode, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message,
      });
    }
  },

  updateUser: async (name: string, address: string, phone: string) => {
    try {
      set({ isLoading: true, error: null });
      await updateUser(name, address, phone, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Erro ao atualizar as informações do usuário.',
      });
    }
  },
}));
