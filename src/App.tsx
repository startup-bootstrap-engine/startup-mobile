import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { Suspense } from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import { LoginForm } from './pages/LoginForm/LoginForm';
import { ForgotPasswordForm } from './pages/ForgotPasswordForm/ForgotPasswordForm';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { PrivateRoute } from './components/PrivateRoute';
import { RegisterForm } from './pages/RegisterForm/Register';
import { UserSettings } from './pages/UserSettings/UserSettings';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Suspense
          fallback={<IonLoading isOpen={true} message={'Loading...'} />}
        >
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/changePassoword" component={ForgotPasswordForm} />
          <PrivateRoute path="/userSettings" component={UserSettings} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Redirect exact from="/" to="/register" />
        </Suspense>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
