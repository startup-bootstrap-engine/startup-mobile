import React from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonLoading,
} from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePasswordSchema } from '@hooks/useChangePasswordSchema';
import { useTranslations } from '@hooks/useTranslations';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export const ChangePasswordForm: React.FC = () => {
  const { changePassword, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const changePasswordSchema = useChangePasswordSchema();

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
      <h2>{t('passwordForms.changePasswordForm')}</h2>
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
      <IonItem>
        <IonLabel position="floating">
          {t('passwordForms.currentPassword')}
        </IonLabel>
        <IonInput type="password" {...register('currentPassword')} />
      </IonItem>
      {errors.currentPassword && (
        <IonText color="danger">
          <p>{errors.currentPassword.message}</p>
        </IonText>
      )}
      <IonItem>
        <IonLabel position="floating">
          {t('passwordForms.newPassword')}
        </IonLabel>
        <IonInput type="password" {...register('newPassword')} />
      </IonItem>
      {errors.newPassword && (
        <IonText color="danger">
          <p>{errors.newPassword.message}</p>
        </IonText>
      )}
      <IonItem>
        <IonLabel position="floating">
          {t('passwordForms.confirmPassword')}
        </IonLabel>
        <IonInput type="password" {...register('newPasswordConfirmation')} />
      </IonItem>
      {errors.newPasswordConfirmation && (
        <IonText color="danger">
          <p>{errors.newPasswordConfirmation.message}</p>
        </IonText>
      )}
      <IonLoading
        isOpen={isLoading}
        message={t('passwordForms.updatingPassword')}
      />
      <IonButton expand="full" type="submit">
        {t('passwordForms.updatePassword')}
      </IonButton>
    </form>
  );
};
