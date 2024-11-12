import { useIonRouter } from '@ionic/react';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/api/userApi/useAuthStore';

export const Logout: FC = () => {
  const router = useIonRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    const performLogout = async (): Promise<void> => {
      try {
        await logout();
        router.push('/login', 'root', 'replace');
      } catch (error) {
        console.error('Logout failed:', error);
        router.push('/dashboard', 'root', 'replace');
      }
    };

    void performLogout();
  }, [logout, router]);

  return null;
};
