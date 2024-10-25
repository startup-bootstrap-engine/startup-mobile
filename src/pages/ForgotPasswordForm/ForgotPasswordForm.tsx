import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPasswordForm } from '@hooks/useForgotPasswordSchema';
import { useTranslations } from '@hooks/useTranslations';
import { IonButton, IonLoading, IonText } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ForgotPasswordFormData {
  email: string;
}

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const forgotPasswordSchema = useForgotPasswordForm();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const email = watch('email');

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await forgotPassword(data.email);
  };

  return (
    <PageLayout title={t('passwordForms.passwordRecoveryForm')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <FormField
          label={t('loginForm.email')}
          value={email}
          onChange={(value) => setValue('email', value)}
          type="email"
          error={errors.email?.message}
        />

        <IonLoading
          isOpen={isLoading}
          message={t('passwordForms.updatingPassword')}
        />

        <IonButton expand="full" type="submit">
          {t('common.submit')}
        </IonButton>
      </form>
    </PageLayout>
  );
};

export default ForgotPasswordForm;
