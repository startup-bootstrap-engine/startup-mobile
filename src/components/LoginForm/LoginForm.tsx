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
import { z } from 'zod';
import { loginSchema } from './loginSchema';

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const { login, isLoading, error, isAuthenticated, checkAuth } =
    useAuthStore();

  // Estados locais para os campos
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Verifica a autenticação quando o componente é montado
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Função de validação com Zod
  const validateForm = () => {
    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      // Reseta os erros
      setEmailError(null);
      setPasswordError(null);

      // Mapeia os erros
      validation.error.errors.forEach((err) => {
        if (err.path[0] === 'email') {
          setEmailError(err.message);
        } else if (err.path[0] === 'password') {
          setPasswordError(err.message);
        }
      });
      return false;
    }

    // Limpa os erros se a validação passar
    setEmailError(null);
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valida o formulário usando Zod antes de tentar o login
    if (!validateForm()) return;

    await login(email, password); // Chama o login da store
  };

  // Redireciona se autenticado
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {/* Exibe erros de login, se houver */}
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
      {/* Campo de Email com Ionic */}
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)} // Atualiza o estado local
          onBlur={() => validateForm()} // Valida ao perder o foco
        />
      </IonItem>
      {emailError && (
        <IonText color="danger">
          <p>{emailError}</p>
        </IonText>
      )}
      {/* Campo de Senha com Ionic */}
      <IonItem>
        <IonLabel position="floating">Senha</IonLabel>
        <IonInput
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)} // Atualiza o estado local
          onBlur={() => validateForm()} // Valida ao perder o foco
        />
      </IonItem>
      {passwordError && (
        <IonText color="danger">
          <p>{passwordError}</p>
        </IonText>
      )}
      {/* Exibe um spinner de carregamento enquanto o login está em andamento */}
      <IonLoading isOpen={isLoading} message={'Entrando...'} />
      {/* Botão de Login com Email/Senha */}
      <IonButton expand="full" type="submit">
        Entrar
      </IonButton>
      {/* Botão de Login com Google */}
      <GoogleLoginButton /> {/* Botão de login com Google */}
      <AppleLoginButton />
    </form>
  );
};
