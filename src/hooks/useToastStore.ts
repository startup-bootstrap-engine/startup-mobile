import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface IToastState {
  isVisible: boolean;
  message: string;
  type: ToastType;
  duration: number;
  position: 'top' | 'middle' | 'bottom';
  showToast: (
    options: Omit<IToastState, 'isVisible' | 'showToast' | 'hideToast'>,
  ) => void;
  hideToast: () => void;
}

export const useToastStore = create<IToastState>((set: any) => ({
  isVisible: false,
  message: '',
  type: 'info',
  duration: 3000,
  position: 'bottom',
  showToast: (options: any) => set({ ...options, isVisible: true }),
  hideToast: () => set({ isVisible: false }),
}));
