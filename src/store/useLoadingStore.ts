import { create } from 'zustand';

interface ILoadingStore {
  isLoading: boolean;
  activeRequests: number;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<ILoadingStore>((set) => ({
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
