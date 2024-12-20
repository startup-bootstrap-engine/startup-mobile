import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { appleLogin } from './appleLogin';
import { changePassword } from './changePassword';
import { checkAuthApi } from './checkAuth';
import { forgotPassword } from './forgotPassword';
import { getGoogleOAuthUrl } from './googleOAuth';
import { login } from './login';
import { logout } from './logout';
import { signUp } from './signUp';

interface IUseStoreAuth {
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
  isUserAuthenticated: () => Promise<boolean>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  forgotPassword: (_email: string) => Promise<void>;
  getGoogleOAuthUrl: () => Promise<void>;
  appleLogin: (
    idToken: string,
    email: string,
    authorizationCode: string,
  ) => Promise<void>;
}

export const useAuthStore = create<IUseStoreAuth>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          await login(email, password, set);
          set({ isLoading: false });
        } catch (error) {
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
        } catch (error) {
          set({
            isLoading: false,
            error: (error as Error).message,
          });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await logout(set);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false, error: (error as Error).message });
        }
      },

      isUserAuthenticated: async () => {
        try {
          set({ isLoading: true });
          const isAuthenticated = await checkAuthApi(set);
          set({ isLoading: false, isAuthenticated });
          return isAuthenticated;
        } catch (error) {
          set({
            isLoading: false,
            token: null,
            isAuthenticated: false,
            error: (error as Error).message,
          });
          return false;
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        try {
          set({ isLoading: true });
          await changePassword(currentPassword, newPassword, set);
          set({ isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: (error as Error).message,
          });
        }
      },

      forgotPassword: async (email: string) => {
        try {
          set({ isLoading: true });
          await forgotPassword(email, set);
          set({ isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: (error as Error).message,
          });
        }
      },

      getGoogleOAuthUrl: async () => {
        try {
          set({ isLoading: true });
          const googleOAuthUrl = await getGoogleOAuthUrl();
          window.location.href = googleOAuthUrl;
          set({ isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: (error as Error).message,
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
        } catch (error) {
          set({
            isLoading: false,
            error: (error as Error).message,
          });
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
