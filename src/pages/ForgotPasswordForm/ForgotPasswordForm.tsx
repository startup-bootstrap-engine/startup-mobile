import React from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonLoading,
} from '@ionic/react';
import { useAuthStore } from '../../store/api/userApi/useAuthStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from './forgotPasswordSchema';

interface ForgotPasswordFormData {
  email: string;
}

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, isLoading, error } = useAuthStore();

  // Configura o React Hook Form com Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await forgotPassword(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register('email')} // Vincula o campo ao controle do React Hook Form
        />
      </IonItem>
      {errors.email && (
        <IonText color="danger">
          <p>{errors.email.message}</p>
        </IonText>
      )}

      {/* Exibe um spinner de carregamento enquanto a recuperação está em andamento */}
      <IonLoading isOpen={isLoading} message={'Processando...'} />

      {/* Botão de Solicitar Senha */}
      <IonButton expand="full" type="submit">
        Enviar
      </IonButton>
    </form>
  );
};
