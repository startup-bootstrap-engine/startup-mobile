import { zodResolver } from '@hookform/resolvers/zod';
import { IonButton, IonLoading, IonText } from '@ionic/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useTranslatedSchema, useTranslations } from '@hooks/index';
import { useToastStore } from '@hooks/useToastStore';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

import type { RegistrationSchema } from '@schemas/authSchema';
import { registrationSchema } from '@schemas/authSchema';
import { useForm } from 'react-hook-form';

export const RegisterForm: React.FC = () => {
  const history = useHistory();
  const { signUp, isLoading, error } = useAuthStore();
  const { showToast } = useToastStore();
  const { t } = useTranslations();
  const schema = useTranslatedSchema(registrationSchema);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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

  const onSubmit = async (data: RegistrationSchema): Promise<void> => {
    await signUp(
      data.email,
      data.password,
      data.passwordConfirmation,
      data.name,
    );
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

        <FormField
          label={t('registrationForm.name')}
          value={formValues.name}
          onChange={(value) =>
            setValue('name', value, { shouldValidate: true })
          }
          error={errors.name?.message}
          required={true}
          placeholder={t('registrationForm.namePlaceholder')}
        />

        <FormField
          label={t('loginForm.email')}
          value={formValues.email}
          onChange={(value) =>
            setValue('email', value, { shouldValidate: true })
          }
          type="email"
          error={errors.email?.message}
          required={true}
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

        <FormField
          label={t('registrationForm.confirmPassword')}
          value={formValues.passwordConfirmation}
          onChange={(value) =>
            setValue('passwordConfirmation', value, { shouldValidate: true })
          }
          type="password"
          error={errors.passwordConfirmation?.message}
          required={true}
          placeholder={t('loginForm.passwordPlaceholder')}
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
