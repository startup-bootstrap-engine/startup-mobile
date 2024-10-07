// src/store/useApiStore.ts

import { create } from 'zustand';

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  fetchData: (url: string) => Promise<void>;
}

export const useApiStore = <T>() =>
  create<ApiState<T>>(set => ({
    data: null,
    isLoading: false,
    error: null,

    fetchData: async (url: string) => {
      set({ isLoading: true, error: null });

      try {
        const response = await fetch(url);
        const data = await response.json();
        set({ data, isLoading: false });
      } catch (error: unknown) {
        // Define que o erro será do tipo unknown
        if (error instanceof Error) {
          set({ isLoading: false, error: error.message });
        } else {
          set({ isLoading: false, error: 'An unknown error occurred' });
        }
      }
    },
  }));
