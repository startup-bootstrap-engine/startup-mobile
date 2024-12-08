// import { IonLoading } from '@ionic/react';
import React from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';

import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { useIonToast } from '@ionic/react';

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
  const [presentToast] = useIonToast();

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
      render={(props: RouteComponentProps) => {
        if (!isAuthenticated) {
          void presentToast({
            message: 'You need to log in to access this page.',
            duration: 3000,
            color: 'danger',
            position: 'top',
          });

          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                  error: {
                    code: 401,
                    message: 'Unauthorized access. Please log in.',
                  },
                },
              }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};
