import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonLoading,
} from '@ionic/react';
import { useAuthStore } from '../../store/api/userApi/useAuthStore';
import { useHistory } from 'react-router-dom';
import { GoogleLoginButton } from './GoogleLoginButton';
import AppleLoginButton from './AppleLoginButton';
import { loginSchema } from './loginSchema';

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const { login, isLoading, error, isAuthenticated, checkAuth } =
    useAuthStore();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const validateForm = () => {
    const validation = loginSchema.safeParse({ email, password });

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

    await login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
      </IonItem>
      {emailError && (
        <IonText color="danger">
          <p>{emailError}</p>
        </IonText>
      )}
      <IonItem>
        <IonLabel position="floating">Senha</IonLabel>
        <IonInput
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
      </IonItem>
      {passwordError && (
        <IonText color="danger">
          <p>{passwordError}</p>
        </IonText>
      )}
      <IonLoading isOpen={isLoading} message={'Entrando...'} />
      <IonButton expand="full" type="submit">
        Entrar
      </IonButton>
      <GoogleLoginButton />
      <AppleLoginButton />
    </form>
  );
};
