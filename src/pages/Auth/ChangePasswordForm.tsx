import React from 'react';
import { useHistory } from 'react-router-dom';

import { Form, type IFormField } from '@components/forms/Form';
import { useTranslatedSchema, useTranslations } from '@hooks/index';
import { useFormHandler } from '@hooks/useFormHandler';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

import { PageLayout } from '@components/layout/PageLayout';
import type { ChangePasswordSchema } from '@schemas/authSchema';
import { changePasswordSchema } from '@schemas/authSchema';

export const ChangePasswordForm: React.FC = () => {
  const history = useHistory();
  const { changePassword, isLoading, error } = useAuthStore();

  const { t } = useTranslations();
  const schema = useTranslatedSchema(changePasswordSchema);

  const form = useFormHandler<ChangePasswordSchema>({
    schema,
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
    onSubmit: async (data) => {
      const { currentPassword, newPassword } = data;
      await changePassword(currentPassword, newPassword);
      history.push('/login');
    },
  });

  const fields: IFormField<ChangePasswordSchema>[] = [
    {
      name: 'currentPassword',
      label: t('passwordForms.currentPassword'),
      type: 'password',
      required: true,
    },
    {
      name: 'newPassword',
      label: t('passwordForms.newPassword'),
      type: 'password',
      required: true,
    },
    {
      name: 'newPasswordConfirmation',
      label: t('passwordForms.confirmPassword'),
      type: 'password',
      required: true,
    },
  ];

  return (
    <PageLayout title={t('passwordForms.changePasswordForm')}>
      <Form<ChangePasswordSchema>
        fields={fields}
        onSubmit={form.onSubmit}
        isLoading={isLoading}
        error={error}
        submitText={t('passwordForms.updatePassword')}
        loadingText={t('passwordForms.updatingPassword')}
        values={form.watch()}
        fieldErrors={form.formState.errors}
        onChange={form.setFieldValue}
      />
    </PageLayout>
  );
};
