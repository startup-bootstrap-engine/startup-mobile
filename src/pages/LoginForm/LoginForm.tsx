import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useLoginSchema } from '@hooks/useLoginSchema';
import { useTranslations } from '@hooks/useTranslations';
import { IonButton, IonIcon, IonLoading, IonText } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { logoApple, logoGoogle } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppleLoginButton from './AppleLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';

interface User {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const { login, isLoading, error, isAuthenticated, checkAuth } =
    useAuthStore();
  const { t } = useTranslations();
  const loginSchema = useLoginSchema();

  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateForm = () => {
    const validation = loginSchema.safeParse({
      email: user.email,
      password: user.password,
    });

    setEmailError(null);
    setPasswordError(null);

    if (!validation.success) {
      validation.error.errors.forEach((err) => {
        if (err.path[0] === 'email') {
          setEmailError(err.message);
        } else if (err.path[0] === 'password') {
          setPasswordError(err.message);
        }
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await login(user.email, user.password);
    checkAuth();
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  return (
    <PageLayout title={t('loginForm.title')} showBackButton={false}>
      <form onSubmit={handleSubmit} className="ion-padding">
        {error && (
          <IonText color="danger" className="ion-padding-bottom">
            <p>{error}</p>
          </IonText>
        )}

        <FormField
          label={t('loginForm.email')}
          value={user.email}
          onChange={(value) => setUser({ ...user, email: value })}
          type="email"
          error={emailError}
        />

        <FormField
          label={t('loginForm.password')}
          value={user.password}
          onChange={(value) => setUser({ ...user, password: value })}
          type="password"
          error={passwordError}
        />

        <div className="ion-padding-top">
          <IonButton expand="block" type="submit" disabled={isLoading}>
            {t('loginForm.login')}
          </IonButton>

          <div className="ion-text-center ion-padding-vertical">
            <IonText>
              <p>or</p>
            </IonText>
          </div>

          <IonButton
            expand="block"
            color="light"
            className="ion-margin-bottom"
            onClick={() => GoogleLoginButton}
          >
            <IonIcon slot="start" icon={logoGoogle} />
            {t('loginForm.googleLogin')}
          </IonButton>

          <IonButton
            expand="block"
            color="light"
            className="ion-margin-bottom"
            onClick={() => AppleLoginButton}
          >
            <IonIcon slot="start" icon={logoApple} />
            {t('loginForm.appleLogin')}
          </IonButton>

          <div className="ion-text-center ion-padding-top">
            <IonButton
              fill="clear"
              size="small"
              onClick={() => history.push('/forgot-password')}
            >
              {t('loginForm.forgotPassword')}
            </IonButton>
          </div>

          <div className="ion-text-center">
            <IonButton
              fill="clear"
              size="small"
              onClick={() => history.push('/register')}
            >
              {t('registrationForm.register')}
            </IonButton>
          </div>
        </div>

        <IonLoading isOpen={isLoading} message={t('loginForm.loggingIn')} />
      </form>
    </PageLayout>
  );
};

export default LoginForm;
