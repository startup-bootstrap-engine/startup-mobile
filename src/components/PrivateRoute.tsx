import { useTranslations } from '@hooks';
import { IonLoading } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

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
