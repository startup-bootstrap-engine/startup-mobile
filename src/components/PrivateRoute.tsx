import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { IonLoading } from '@ionic/react';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <IonLoading isOpen={true} message={'Verificando autenticação...'} />;
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

export default PrivateRoute;
