import { IonButton } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Form, type IFormField } from '@components/forms/Form';
import { PageLayout } from '@components/layout/PageLayout';
import { useTranslatedSchema, useTranslations } from '@hooks/index';
import { useFormHandler } from '@hooks/useFormHandler';
import type { RegistrationSchema } from '@schemas/authSchema';
import { registrationSchema } from '@schemas/authSchema';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

export const RegisterForm: React.FC = () => {
  const history = useHistory();
  const { signUp, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const schema = useTranslatedSchema(registrationSchema);

  const form = useFormHandler<RegistrationSchema>({
    schema,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: async (data) => {
      await signUp(
        data.email,
        data.password,
        data.passwordConfirmation,
        data.name,
      );
      history.push('/login');
    },
  });

  const fields: IFormField<RegistrationSchema>[] = [
    {
      name: 'name',
      label: t('registrationForm.name'),
      required: true,
      placeholder: t('registrationForm.namePlaceholder'),
    },
    {
      name: 'email',
      label: t('loginForm.email'),
      type: 'email',
      required: true,
      placeholder: t('loginForm.emailPlaceholder'),
    },
    {
      name: 'password',
      label: t('loginForm.password'),
      type: 'password',
      required: true,
      placeholder: t('loginForm.passwordPlaceholder'),
    },
    {
      name: 'passwordConfirmation',
      label: t('registrationForm.confirmPassword'),
      type: 'password',
      required: true,
      placeholder: t('loginForm.passwordPlaceholder'),
    },
  ];

  return (
    <PageLayout title={t('registrationForm.title')} showBackButton={false}>
      <Form<RegistrationSchema>
        fields={fields}
        onSubmit={form.onSubmit}
        isLoading={isLoading}
        error={error}
        submitText={t('registrationForm.register')}
        loadingText={t('registrationForm.registeringUser')}
        values={form.watch()}
        fieldErrors={form.formState.errors}
        onChange={form.setFieldValue}
      >
        <div className="ion-text-center ion-padding-top">
          <IonButton
            fill="clear"
            size="small"
            onClick={() => history.push('/login')}
          >
            {t('registrationForm.existingUser')}
          </IonButton>
        </div>
      </Form>
    </PageLayout>
  );
};
