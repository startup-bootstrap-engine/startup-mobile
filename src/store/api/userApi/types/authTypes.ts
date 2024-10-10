export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  