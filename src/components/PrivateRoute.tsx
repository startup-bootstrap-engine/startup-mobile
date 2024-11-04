// import { IonLoading } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthStore } from '@store/api/userApi/useAuthStore';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

export const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuthStore();
  // const { t } = useTranslations();

  // if (isLoading) {
  //   return (
  //     <IonLoading
  //       isOpen={true}
  //       message={t('registrationForm.authenticationVerification')}
  //     />
  //   );
  // }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
