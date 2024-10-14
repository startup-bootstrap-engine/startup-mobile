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
import { changePasswordSchema } from './changePassowrdSchema';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export const ChangePasswordForm: React.FC = () => {
  const { changePassword, isLoading, error } = useAuthStore();

  // Setup React Hook Form com Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    const { currentPassword, newPassword } = data;
    await changePassword(currentPassword, newPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Alterar Senha</h2>

      {/* Exibe erros de alteração de senha */}
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}

      {/* Campo de Senha Atual */}
      <IonItem>
        <IonLabel position="floating">Senha Atual</IonLabel>
        <IonInput type="password" {...register('currentPassword')} />
      </IonItem>
      {errors.currentPassword && (
        <IonText color="danger">
          <p>{errors.currentPassword.message}</p>
        </IonText>
      )}

      {/* Campo de Nova Senha */}
      <IonItem>
        <IonLabel position="floating">Nova Senha</IonLabel>
        <IonInput type="password" {...register('newPassword')} />
      </IonItem>
      {errors.newPassword && (
        <IonText color="danger">
          <p>{errors.newPassword.message}</p>
        </IonText>
      )}

      {/* Campo de Confirmação de Nova Senha */}
      <IonItem>
        <IonLabel position="floating">Confirmação de Nova Senha</IonLabel>
        <IonInput type="password" {...register('newPasswordConfirmation')} />
      </IonItem>
      {errors.newPasswordConfirmation && (
        <IonText color="danger">
          <p>{errors.newPasswordConfirmation.message}</p>
        </IonText>
      )}

      {/* Exibe um spinner de carregamento enquanto a alteração está em andamento */}
      <IonLoading isOpen={isLoading} message={'Alterando senha...'} />

      {/* Botão de Alterar Senha */}
      <IonButton expand="full" type="submit">
        Alterar Senha
      </IonButton>
    </form>
  );
};
