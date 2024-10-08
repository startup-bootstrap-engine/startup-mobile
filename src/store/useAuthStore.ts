import { create } from 'zustand';
import { getToken, removeToken, setToken } from '../utils/tokenStorage';
import { isTokenValid } from '../utils/jwtUtils';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>; // Função para verificar o estado de autenticação
}
const apiURL = import.meta.env.VITE_API_URL;
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  
  // Função de login que faz a chamada à API e armazena o token
  login: async (email, password) => {
 
    set({ isLoading: true, error: null });
    try {
      // Substitua pela sua URL de API de login
      const response = await fetch(`${apiURL}auth/login`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        referrerPolicy: 'strict-origin-when-cross-origin', // Set the referrer policy
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha no login');
      }

      const data = await response.json();
      const token = data.token;

      // Armazenar o token no Capacitor Storage (seguro)
      await setToken(token);

      set({
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      set({
        isLoading: false,
        error: 'Erro no login. Verifique suas credenciais.',
      });
    }
  },

  // Função para verificar se o usuário está autenticado (token válido)
  checkAuth: async () => {
    set({ isLoading: true });
    const token = await getToken(); // Carrega o token do Capacitor Storage
    if (token && isTokenValid(token)) {
      set({ token, isAuthenticated: true, isLoading: false });
    } else {
      set({ token: null, isAuthenticated: false, isLoading: false });
    }
  },

  // Função de logout que remove o token
  logout: async () => {
    const token = await getToken();
    if (token) {
      await fetch(`${apiURL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-Type': 'application/json',
        },
        referrerPolicy: 'strict-origin-when-cross-origin', // Set the referrer policy
      });
    }
    await removeToken();
    set({ token: null, isAuthenticated: false });
  },
}));