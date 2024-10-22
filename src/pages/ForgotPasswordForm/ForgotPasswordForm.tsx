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
import { useTranslations } from '@hooks/useTranslations';
import { useForgotPasswordForm } from '@hooks/useForgotPasswordSchema';

interface ForgotPasswordFormData {
  email: string;
}

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const forgotPasswordSchema = useForgotPasswordForm();

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
      <h2>{t('passwordForms.passwordRecoveryForm')}</h2>
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
      <IonItem>
        <IonLabel position="floating">{t('loginForm.email')}</IonLabel>
        <IonInput type="email" {...register('email')} />
      </IonItem>
      {errors.email && (
        <IonText color="danger">
          <p>{errors.email.message}</p>
        </IonText>
      )}
      <IonLoading
        isOpen={isLoading}
        message={t('passwordForms.updatingPassword')}
      />
      <IonButton expand="full" type="submit">
        {t('common.submit')}
      </IonButton>
    </form>
  );
};
