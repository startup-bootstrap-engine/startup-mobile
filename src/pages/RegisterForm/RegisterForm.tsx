import { IonButton, IonLoading, IonText } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useRegistrationSchema, useTranslations } from '@hooks';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

interface IFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const RegisterForm: React.FC = () => {
  const history = useHistory();
  const { signUp, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const registrationSchema = useRegistrationSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: IFormData): Promise<void> => {
    const { name, email, password, passwordConfirmation } = data;
    await signUp(email, password, passwordConfirmation, name);
    history.push('/login');
  };

  return (
    <PageLayout title={t('registrationForm.title')}>
      <form onSubmit={handleSubmit(onSubmit)} className="ion-padding">
        {error && (
          <IonText color="danger" className="ion-padding-bottom">
            <p>{t('registrationForm.registerError')}</p>
          </IonText>
        )}

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormField
              label={t('registrationForm.name')}
              value={field.value || ''}
              onChange={field.onChange}
              error={errors.name?.message || null}
              required={true}
              placeholder={t('registrationForm.namePlaceholder')}
            />
          )}
        />

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

        <Controller
          name="passwordConfirmation"
          control={control}
          render={({ field }) => (
            <FormField
              label={t('registrationForm.confirmPassword')}
              value={field.value || ''}
              onChange={field.onChange}
              type="password"
              error={errors.passwordConfirmation?.message || null}
              required={true}
              placeholder={t('loginForm.passwordPlaceholder')}
            />
          )}
        />

        <div className="ion-padding-top">
          <IonButton expand="block" type="submit" disabled={isLoading}>
            {t('registrationForm.register')}
          </IonButton>

          <div className="ion-text-center ion-padding-top">
            <IonButton
              fill="clear"
              size="small"
              onClick={() => history.push('/login')}
            >
              {t('registrationForm.existingUser')}
            </IonButton>
          </div>
        </div>

        <IonLoading
          isOpen={isLoading}
          message={t('registrationForm.registeringUser')}
        />
      </form>
    </PageLayout>
  );
};
