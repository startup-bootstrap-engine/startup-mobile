import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonText, IonLoading } from '@ionic/react';
import { useAuthStore } from '../../store/api/userApi/useAuthStore';

const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Recuperar Senha</h2>

      {/* Exibe erros de recuperação de senha */}
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}

      {/* Campo de Email */}
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
      </IonItem>

      {/* Exibe um spinner de carregamento enquanto a recuperação está em andamento */}
      <IonLoading isOpen={isLoading} message={'Processando...'} />

      {/* Botão de Solicitar Senha */}
      <IonButton expand="full" type="submit">
        Enviar
      </IonButton>
    </form>
  );
};

export default ForgotPasswordForm;
