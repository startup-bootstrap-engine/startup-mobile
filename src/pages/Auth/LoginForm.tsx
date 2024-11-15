import { IonButton } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Form, type IFormField } from '@components/forms/Form';
import { useTranslatedSchema, useTranslations } from '@hooks/index';
import { useFormHandler } from '@hooks/useFormHandler';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

import { PageLayout } from '@components/layout/PageLayout';
import type { LoginSchema } from '@schemas/authSchema';
import { loginSchema } from '@schemas/authSchema';
import { AppleLoginButton } from './AppleLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const {
    login,
    isLoading,
    error,
    isUserAuthenticated: checkAuth,
  } = useAuthStore();
  const { t } = useTranslations();
  const schema = useTranslatedSchema(loginSchema);

  const form = useFormHandler<LoginSchema>({
    schema,
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async (data) => {
      await login(data.email, data.password);
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        history.push('/index/home');
      }
    },
  });

  const fields: IFormField<LoginSchema>[] = [
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
  ];

  return (
    <PageLayout title={t('loginForm.title')} showBackButton={false}>
      <Form<LoginSchema>
        fields={fields}
        onSubmit={form.onSubmit}
        isLoading={isLoading}
        error={error}
        submitText={t('loginForm.login')}
        loadingText={t('loginForm.loggingIn')}
        values={form.watch()}
        fieldErrors={form.formState.errors}
        onChange={form.setFieldValue}
      >
        <div className="ion-text-center ion-padding-vertical">
          <p>{t('common.or')}</p>
        </div>

        <GoogleLoginButton />
        <AppleLoginButton />

        <div className="ion-text-center ion-padding-top">
          <IonButton
            fill="clear"
            size="small"
            onClick={() => history.push('/forgot-password')}
          >
            {t('loginForm.forgotPassword')}
          </IonButton>
        </div>

        <div className="ion-text-center">
          <IonButton
            fill="clear"
            size="small"
            onClick={() => history.push('/register')}
          >
            {t('registrationForm.nonExistingUser')}
          </IonButton>
        </div>
      </Form>
    </PageLayout>
  );
};
