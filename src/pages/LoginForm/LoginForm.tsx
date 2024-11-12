import { zodResolver } from '@hookform/resolvers/zod';
import { IonButton, IonLoading } from '@ionic/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useTranslatedSchema, useTranslations } from '@hooks/index';
import { useToastStore } from '@hooks/useToastStore';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

import type { LoginSchema } from '@schemas/authSchema';
import { loginSchema } from '@schemas/authSchema';
import { AppleLoginButton } from './AppleLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const { login, isLoading, error, isAuthenticated, checkAuth } =
    useAuthStore();
  const { showToast } = useToastStore();
  const { t } = useTranslations();
  const schema = useTranslatedSchema(loginSchema);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (error) {
      showToast({
        message: error,
        type: 'error',
      });
    }
  }, [error, showToast]);

  const onSubmit = async (data: LoginSchema): Promise<void> => {
    await login(data.email, data.password);
    await checkAuth();
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  return (
    <PageLayout title={t('loginForm.title')} showBackButton={false}>
      <form onSubmit={handleSubmit(onSubmit)} className="ion-padding">
        <FormField
          label={t('loginForm.email')}
          value={formValues.email}
          onChange={(value) =>
            setValue('email', value, { shouldValidate: true })
          }
          type="email"
          error={errors.email?.message}
          required={true}
          clearInput={true}
          placeholder={t('loginForm.emailPlaceholder')}
        />

        <FormField
          label={t('loginForm.password')}
          value={formValues.password}
          onChange={(value) =>
            setValue('password', value, { shouldValidate: true })
          }
          type="password"
          error={errors.password?.message}
          required={true}
          placeholder={t('loginForm.passwordPlaceholder')}
        />

        <div className="ion-padding-top">
          <IonButton expand="block" type="submit" disabled={isLoading}>
            {t('loginForm.login')}
          </IonButton>

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
              {t('registrationForm.existingUser')}
            </IonButton>
          </div>
        </div>

        <IonLoading isOpen={isLoading} message={t('loginForm.loggingIn')} />
      </form>
    </PageLayout>
  );
};
