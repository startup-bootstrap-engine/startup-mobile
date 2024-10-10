import { create } from 'zustand';
import { login } from './login';
import { signUp } from './signUp';
import { logout } from './logout';
import { checkAuth } from './checkAuth';
import { changePassword } from './changePassword';
import { forgotPassword } from './forgotPassword';
import { getGoogleOAuthUrl } from './googleOAuth';
import { appleLogin } from './appleLogin'; // Importa a função de login com Apple

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    passwordConfirmation: string,
    name: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  getGoogleOAuthUrl: () => Promise<void>;
  appleLogin: (
    idToken: string,
    email: string,
    authorizationCode: string,
  ) => Promise<void>; // Adiciona a função para login com Apple
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Função de login
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      await login(email, password, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Erro no login. Verifique suas credenciais.',
      });
    }
  },

  // Função de sign up
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
        error: error.message || 'Erro no registro. Verifique suas informações.',
      });
    }
  },

  // Função de logout
  logout: async () => {
    try {
      set({ isLoading: true });
      await logout(set);
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Erro no logout.' });
    }
  },

  // Função de verificação de autenticação
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      await checkAuth(set);
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, token: null, isAuthenticated: false });
    }
  },

  // Função de troca de senha
  changePassword: async (currentPassword: string, newPassword: string) => {
    try {
      set({ isLoading: true });
      await changePassword(currentPassword, newPassword, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Erro ao alterar a senha.',
      });
    }
  },

  // Função de recuperação de senha (forgot password)
  forgotPassword: async (email: string) => {
    try {
      set({ isLoading: true });
      await forgotPassword(email, set);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Erro ao tentar recuperar a senha.',
      });
    }
  },

  // Função para obter a URL de OAuth do Google
  getGoogleOAuthUrl: async () => {
    try {
      set({ isLoading: true });
      const googleOAuthUrl = await getGoogleOAuthUrl();
      window.location.href = googleOAuthUrl; // Redireciona para a URL do Google OAuth
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Erro ao gerar URL de autenticação do Google.',
      });
    }
  },

  // Função para login com Apple
  appleLogin: async (
    idToken: string,
    email: string,
    authorizationCode: string,
  ) => {
    try {
      set({ isLoading: true });
      await appleLogin(idToken, email, authorizationCode, set); // Chama a função appleLogin
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Erro ao fazer login com Apple.',
      });
    }
  },
}));
