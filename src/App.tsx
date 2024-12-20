import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import { MainMenu } from './components/layout/MainMenu';
import { PrivateRoute } from './components/PrivateRoute';
import { Toast } from './components/Toast';
import { ThemeProvider } from './contexts/ThemeProvider';
import { ChangePasswordForm } from './pages/Auth/ChangePasswordForm';
import { ForgotPasswordForm } from './pages/Auth/ForgotPasswordForm';
import { LoginForm } from './pages/Auth/LoginForm';
import { Logout } from './pages/Auth/Logout';
import { RegisterForm } from './pages/Auth/RegisterForm';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Language } from './pages/Settings/Language';
import { Settings } from './pages/Settings/Settings';
import { Theme } from './pages/Settings/Theme';
import { Index } from './pages/Index/Index';

setupIonicReact();

export const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <MainMenu />
        <Toast />
        <IonRouterOutlet id="main-content">
          <ThemeProvider>
            <Suspense
              fallback={<IonLoading isOpen={true} message="Loading..." />}
            >
              <Route path="/login" render={() => <LoginForm />} exact={true} />
              <Route
                path="/register"
                render={() => <RegisterForm />}
                exact={true}
              />
              <Route
                path="/forgot-password"
                render={() => <ForgotPasswordForm />}
                exact={true}
              />
              <Route
                path="/change-password"
                render={() => <ChangePasswordForm />}
                exact={true}
              />
              <PrivateRoute
                path="/dashboard"
                component={Dashboard}
                exact={true}
              />
              <PrivateRoute path="/index" component={Index} exact={false} />
              <PrivateRoute path="/logout" component={Logout} exact={true} />
              <Route
                path="/settings"
                render={() => <Settings />}
                exact={true}
              />
              <Route
                path="/settings/theme"
                render={() => <Theme />}
                exact={true}
              />
              <Route
                path="/settings/language"
                render={() => <Language />}
                exact={true}
              />
              <Route exact={true} path="/">
                <Redirect to="/login" />
              </Route>
            </Suspense>
          </ThemeProvider>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
