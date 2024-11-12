import { zodResolver } from '@hookform/resolvers/zod';
import { IonButton, IonLoading, IonText } from '@ionic/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useChangePasswordSchema } from '@hooks/useChangePasswordSchema';
import { useTranslations } from '@hooks/useTranslations';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

interface IPasswordData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export const ChangePasswordForm: React.FC = () => {
  const history = useHistory();
  const { changePassword, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const changePasswordSchema = useChangePasswordSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: IPasswordData): Promise<void> => {
    const { currentPassword, newPassword } = data;
    await changePassword(currentPassword, newPassword);
    history.push('/login');
  };

  return (
    <PageLayout title={t('passwordForms.changePasswordForm')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <FormField
              label={t('passwordForms.currentPassword')}
              value={field.value || ''}
              onChange={field.onChange}
              type="password"
              error={errors.currentPassword?.message || null}
            />
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <FormField
              label={t('passwordForms.newPassword')}
              value={field.value || ''}
              onChange={field.onChange}
              type="password"
              error={errors.newPassword?.message || null}
            />
          )}
        />

        <Controller
          name="newPasswordConfirmation"
          control={control}
          render={({ field }) => (
            <FormField
              label={t('passwordForms.confirmPassword')}
              value={field.value || ''}
              onChange={field.onChange}
              type="password"
              error={errors.newPasswordConfirmation?.message || null}
            />
          )}
        />

        <IonLoading
          isOpen={isLoading}
          message={t('passwordForms.updatingPassword')}
        />

        <IonButton expand="full" type="submit" disabled={isLoading}>
          {t('passwordForms.updatePassword')}
        </IonButton>
      </form>
    </PageLayout>
  );
};
