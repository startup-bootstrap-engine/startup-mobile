import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useLoginSchema, useTranslations } from '@hooks';
import { IonButton, IonLoading, IonText } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ZodIssue } from 'zod';
import { AppleLoginButton } from './AppleLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';

interface IUserState {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const { login, isLoading, error, isAuthenticated, checkAuth } =
    useAuthStore();
  const { t } = useTranslations();
  const loginSchema = useLoginSchema();

  const [user, setUser] = useState<IUserState>({ email: '', password: '' });
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
      validation.error.errors.forEach((err: ZodIssue) => {
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
            <p>{t('loginForm.errors.invalidCredentials')}</p>
          </IonText>
        )}

        <FormField
          label={t('loginForm.email')}
          value={user.email}
          onChange={(value) => setUser({ ...user, email: value })}
          type="email"
          error={emailError}
          required
          clearInput
          placeholder={t('loginForm.emailPlaceholder')}
        />

        <FormField
          label={t('loginForm.password')}
          value={user.password}
          onChange={(value) => setUser({ ...user, password: value })}
          type="password"
          error={passwordError}
          required
          placeholder={t('loginForm.passwordPlaceholder')}
        />

        <div className="ion-padding-top">
          <IonButton expand="block" type="submit" disabled={isLoading}>
            {t('loginForm.login')}
          </IonButton>

          <div className="ion-text-center ion-padding-vertical">
            <IonText>
              <p>{t('common.or')}</p>
            </IonText>
          </div>

          <GoogleLoginButton />
          <AppleLoginButton />

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
              {t('registrationForm.existingUser')}
            </IonButton>
          </div>
        </div>

        <IonLoading isOpen={isLoading} message={t('loginForm.loggingIn')} />
      </form>
    </PageLayout>
  );
};

export default LoginForm;
