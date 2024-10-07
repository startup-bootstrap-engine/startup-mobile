import { create } from 'zustand';

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  setData: (data: Partial<T>) => void;
  fetchData: (url: string) => Promise<void>;
}

// A função `create` já retorna o hook genérico que esperamos. Não é necessário chamar `useApiStore<T>()`.
export const useApiStore = create<ApiState<any>>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),

  fetchData: async (url: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(url);
      const data = await response.json();
      set({ data, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },
}));
