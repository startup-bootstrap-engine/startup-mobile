import React from 'react';
import { useHistory } from 'react-router-dom';

import { Form, type IFormField } from '@components/forms/Form';
import { useTranslatedSchema, useTranslations } from '@hooks/index';
import { useFormHandler } from '@hooks/useFormHandler';
import { useToastStore } from '@hooks/useToastStore';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

import { PageLayout } from '@components/layout/PageLayout';
import type { ForgotPasswordSchema } from '@schemas/authSchema';
import { forgotPasswordSchema } from '@schemas/authSchema';

export const ForgotPasswordForm: React.FC = () => {
  const history = useHistory();
  const { forgotPassword, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const schema = useTranslatedSchema(forgotPasswordSchema);
  const { showToast } = useToastStore();

  const form = useFormHandler<ForgotPasswordSchema>({
    schema,
    defaultValues: {
      email: '',
    },
    onSubmit: async (data) => {
      try {
        await forgotPassword(data.email);
        showToast({
          message: t('passwordForms.resetSuccess'),
          type: 'success',
        });
        history.push('/login');
      } catch {
        form.setError('email', { message: t('passwordForms.error.reset') });
      }
    },
  });

  const fields: IFormField<ForgotPasswordSchema>[] = [
    {
      name: 'email',
      label: t('loginForm.email'),
      type: 'email',
      required: true,
      placeholder: t('loginForm.emailPlaceholder'),
    },
  ];

  return (
    <PageLayout title={t('passwordForms.passwordRecoveryForm')}>
      <Form<ForgotPasswordSchema>
        fields={fields}
        onSubmit={form.onSubmit}
        isLoading={isLoading}
        error={error}
        submitText={t('common.submit')}
        loadingText={t('passwordForms.updatingPassword')}
        values={form.watch()}
        fieldErrors={form.formState.errors}
        onChange={form.setFieldValue}
      />
    </PageLayout>
  );
};
