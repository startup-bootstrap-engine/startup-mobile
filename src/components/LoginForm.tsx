import React from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import { useStore } from '../hooks/useStore';
import { required } from '../validation/required';
import { minLength } from '../validation/minLength';
import { emailValidator } from '../validation/emailValidator';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  // Hook para gerenciar o campo email com regras de validação
  const emailField = useStore<LoginFormData>(
    '', // Valor inicial
    'email', // Nome do campo
    [required('Email'), emailValidator] // Regras de validação
  );

  // Hook para gerenciar o campo senha com regras de validação
  const passwordField = useStore<LoginFormData>(
    '', // Valor inicial
    'password', // Nome do campo
    [required('Senha'), minLength(6)] // Regras de validação
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailField.error && !passwordField.error) {
      console.log('Formulário enviado com sucesso');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {/* Campo de Email com Ionic */}
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          type="email"
          value={emailField.value}
          onIonChange={(e) => emailField.setValue(e.detail.value!)}
          ref={emailField.inputRef}
        />
      </IonItem>
      {emailField.error && (
        <IonText color="danger">
          <p>{emailField.error}</p>
        </IonText>
      )}

      {/* Campo de Senha com Ionic */}
      <IonItem>
        <IonLabel position="floating">Senha</IonLabel>
        <IonInput
          type="password"
          value={passwordField.value}
          onIonChange={(e) => passwordField.setValue(e.detail.value!)}
          ref={passwordField.inputRef}
        />
      </IonItem>
      {passwordField.error && (
        <IonText color="danger">
          <p>{passwordField.error}</p>
        </IonText>
      )}

      {/* Botão de Login com Ionic */}
      <IonButton expand="full" type="submit">
        Entrar
      </IonButton>
    </form>
  );
};

export default LoginForm;
