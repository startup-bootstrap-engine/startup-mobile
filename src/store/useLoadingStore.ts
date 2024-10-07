import { create } from 'zustand';

interface LoadingStore {
  isLoading: boolean;
  activeRequests: number;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<LoadingStore>(set => ({
  isLoading: false,
  activeRequests: 0, // Inicializa sem requisições ativas

  startLoading: () =>
    set(state => {
      const newActiveRequests = state.activeRequests + 1;
      return {
        activeRequests: newActiveRequests,
        isLoading: true, // Define loading como true se houver ao menos uma requisição
      };
    }),

  stopLoading: () =>
    set(state => {
      const newActiveRequests = state.activeRequests - 1;
      return {
        activeRequests: newActiveRequests,
        isLoading: newActiveRequests === 0 ? false : true, // Define loading como false se não houver mais requisições
      };
    }),
}));
