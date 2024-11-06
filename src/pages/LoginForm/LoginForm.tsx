import { IonButton, IonLoading, IonText } from '@ionic/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useLoginSchema, useTranslations } from '@hooks';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

import { AppleLoginButton } from './AppleLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';

interface IUserState {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const { login, isLoading, error, isAuthenticated, checkAuth } =
    useAuthStore();
  const { t } = useTranslations();
  const loginSchema = useLoginSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserState>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: IUserState): Promise<void> => {
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
        {error && (
          <IonText color="danger" className="ion-padding-bottom">
            <p>{t('loginForm.errors.invalidCredentials')}</p>
          </IonText>
        )}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormField
              label={t('loginForm.email')}
              value={field.value || ''}
              onChange={field.onChange}
              type="email"
              error={errors.email?.message || null}
              required={true}
              clearInput={true}
              placeholder={t('loginForm.emailPlaceholder')}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormField
              label={t('loginForm.password')}
              value={field.value || ''}
              onChange={field.onChange}
              type="password"
              error={errors.password?.message || null}
              required={true}
              placeholder={t('loginForm.passwordPlaceholder')}
            />
          )}
        />

        <div className="ion-padding-top">
          <IonButton expand="block" type="submit" disabled={isLoading}>
            {t('loginForm.login')}
          </IonButton>

          <div className="ion-text-center ion-padding-vertical">
            <IonText>
              <p>{t('common.or')}</p>
            </IonText>
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
