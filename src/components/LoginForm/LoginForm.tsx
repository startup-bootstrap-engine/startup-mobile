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
import GoogleLoginButton from './GoogleLoginButton'; // Importando o botão de login com Google
import AppleLoginButton from './AppleLoginButton';

const LoginForm: React.FC = () => {
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

  // Validação de campos
  const validateEmail = () => {
    const error = email.length === 0 ? 'Email é obrigatório' : null;
    setEmailError(error);
    return !error;
  };

  const validatePassword = () => {
    const error =
      password.length < 6 ? 'A senha deve ter no mínimo 6 caracteres' : null;
    setPasswordError(error);
    return !error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      await login(email, password); // Chama o login da store
    }
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
          value={email} // Estado local gerencia o valor
          onIonChange={(e) => setEmail(e.detail.value!)} // Atualiza o estado local
          onBlur={validateEmail} // Valida ao perder o foco
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
          value={password} // Estado local gerencia o valor
          onIonChange={(e) => setPassword(e.detail.value!)} // Atualiza o estado local
          onBlur={validatePassword} // Valida ao perder o foco
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

export default LoginForm;