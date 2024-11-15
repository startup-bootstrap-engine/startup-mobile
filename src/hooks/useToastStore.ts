import { create } from 'zustand';

interface IToastState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
  position: 'top' | 'middle' | 'bottom';
  showToast: (options: { message: string; type?: IToastState['type'] }) => void;
  hideToast: () => void;
}

export const useToastStore = create<IToastState>((set) => {
  let timeoutId: number;

  return {
    isVisible: false,
    message: '',
    type: 'info',
    duration: 3000,
    position: 'top',
    showToast: ({ message, type = 'info' }) => {
      window.clearTimeout(timeoutId);
      set({ message, type, isVisible: true });
      timeoutId = window.setTimeout(() => {
        set({ isVisible: false });
      }, 3000);
    },
    hideToast: () => set({ isVisible: false }),
  };
});
