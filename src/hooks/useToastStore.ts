import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastState {
  isVisible: boolean;
  message: string;
  type: ToastType;
  duration: number;
  position: 'top' | 'middle' | 'bottom';
  showToast: (
    // eslint-disable-next-line no-unused-vars
    options: Omit<ToastState, 'isVisible' | 'showToast' | 'hideToast'>,
  ) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set: any) => ({
  isVisible: false,
  message: '',
  type: 'info',
  duration: 3000,
  position: 'bottom',
  showToast: (options: any) => set({ ...options, isVisible: true }),
  hideToast: () => set({ isVisible: false }),
}));
