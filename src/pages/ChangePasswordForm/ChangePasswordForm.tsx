import { zodResolver } from '@hookform/resolvers/zod';
import { IonButton, IonLoading, IonText } from '@ionic/react';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useTranslatedSchema, useTranslations } from '@hooks/index';
import { useToastStore } from '@hooks/useToastStore';
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from '@schemas/authSchema';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

export const ChangePasswordForm: React.FC = () => {
  const history = useHistory();
  const { changePassword, isLoading, error } = useAuthStore();
  const { showToast } = useToastStore();
  const { t } = useTranslations();
  const schema = useTranslatedSchema(changePasswordSchema);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (error) {
      showToast({
        message: error,
        type: 'error',
      });
    }
  }, [error, showToast]);

  const onSubmit = async (data: ChangePasswordSchema): Promise<void> => {
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
              required={true}
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
              required={true}
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
              required={true}
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
