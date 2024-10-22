import { create } from 'zustand';

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  setData: (_data: Partial<T>) => void;
  fetchData: (_url: string) => Promise<void>;
}

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
