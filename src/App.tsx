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
import { PrivateRoute } from './components/PrivateRoute';
import { MainMenu } from './components/layout/MainMenu';
import ThemeProvider from './contexts/ThemeProvider';
import { ChangePasswordForm } from './pages/ChangePasswordForm/ChangePasswordForm';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { ForgotPasswordForm } from './pages/ForgotPasswordForm/ForgotPasswordForm';
import { LoginForm } from './pages/LoginForm/LoginForm';
import { RegisterForm } from './pages/RegisterForm/RegisterForm';
import { Language } from './pages/Settings/Language';
import { Settings } from './pages/Settings/Settings';
import { Theme } from './pages/Settings/Theme';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <MainMenu />
        <IonRouterOutlet id="main-content">
          <ThemeProvider>
            <Suspense
              fallback={<IonLoading isOpen={true} message="Loading..." />}
            >
              <Route path="/login" render={() => <LoginForm />} exact />
              <Route path="/register" render={() => <RegisterForm />} exact />
              <Route
                path="/forgot-password"
                render={() => <ForgotPasswordForm />}
                exact
              />
              <Route
                path="/change-password"
                render={() => <ChangePasswordForm />}
                exact
              />
              <Route path="/dashboard" component={Dashboard} exact />
              <Route path="/settings" render={() => <Settings />} exact />
              <Route path="/settings/theme" render={() => <Theme />} exact />
              <Route
                path="/settings/language"
                render={() => <Language />}
                exact
              />
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            </Suspense>
          </ThemeProvider>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
