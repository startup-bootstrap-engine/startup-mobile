import { create } from 'zustand';

interface LoadingStore {
  isLoading: boolean;
  activeRequests: number;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  activeRequests: 0,

  startLoading: () =>
    set((state) => {
      const newActiveRequests = state.activeRequests + 1;
      return {
        activeRequests: newActiveRequests,
        isLoading: true,
      };
    }),

  stopLoading: () =>
    set((state) => {
      const newActiveRequests = state.activeRequests - 1;
      return {
        activeRequests: newActiveRequests,
        isLoading: newActiveRequests === 0 ? false : true,
      };
    }),
}));
