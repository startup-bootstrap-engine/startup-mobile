import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthStore } from '../store/api/userApi/useAuthStore';
import { IonLoading } from '@ionic/react';
import { useTranslations } from '../hooks/useTranslations';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { t } = useTranslations();

  if (isLoading) {
    return (
      <IonLoading
        isOpen={true}
        message={t('registrationForm.authenticationVerification')}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
