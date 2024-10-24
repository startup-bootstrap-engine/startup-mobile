import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonLoading,
} from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { useHistory } from 'react-router-dom';
import { GoogleLoginButton } from './GoogleLoginButton';
import AppleLoginButton from './AppleLoginButton';
import { useLoginSchema, useTranslations } from '@hooks';

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
    <form onSubmit={handleSubmit}>
      <h2>{t('loginForm.login')}</h2>
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
      <IonItem>
        <IonLabel position="floating">{t('loginForm.email')}</IonLabel>
        <IonInput
          type="email"
          value={user?.email}
          onIonChange={(e) => setUser({ ...user, email: e.detail.value || '' })}
        />
      </IonItem>
      {emailError && (
        <IonText color="danger">
          <p>{emailError}</p>
        </IonText>
      )}
      <IonItem>
        <IonLabel position="floating">{t('loginForm.password')}</IonLabel>
        <IonInput
          type="password"
          value={user.password}
          onIonChange={(e) =>
            setUser({ ...user, password: e.detail.value || '' })
          }
        />
      </IonItem>
      {passwordError && (
        <IonText color="danger">
          <p>{passwordError}</p>
        </IonText>
      )}
      <IonLoading isOpen={isLoading} message={t('loginForm.loggingIn')} />
      <IonButton expand="full" type="submit">
        {t('loginForm.login')}
      </IonButton>
      <GoogleLoginButton />
      <AppleLoginButton />
    </form>
  );
};
