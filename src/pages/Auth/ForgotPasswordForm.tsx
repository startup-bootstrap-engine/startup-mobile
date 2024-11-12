import { zodResolver } from '@hookform/resolvers/zod';
import { IonButton, IonLoading, IonText } from '@ionic/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useTranslatedSchema, useTranslations } from '@hooks/index';
import { useToastStore } from '@hooks/useToastStore';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

import type { ForgotPasswordSchema } from '@schemas/authSchema';
import { forgotPasswordSchema } from '@schemas/authSchema';

export const ForgotPasswordForm: React.FC = () => {
  const history = useHistory();
  const { forgotPassword, isLoading, error } = useAuthStore();
  const { showToast } = useToastStore();
  const { t } = useTranslations();
  const schema = useTranslatedSchema(forgotPasswordSchema);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
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

  const onSubmit = async (data: ForgotPasswordSchema): Promise<void> => {
    try {
      await forgotPassword(data.email);
      history.push('/login');
    } catch {
      showToast({
        message: t('passwordForms.error.reset'),
        type: 'error',
      });
    }
  };

  return (
    <PageLayout title={t('passwordForms.passwordRecoveryForm')}>
      <form onSubmit={handleSubmit(onSubmit)} className="ion-padding">
        {error && (
          <IonText color="danger" className="ion-padding-bottom">
            <p>{error}</p>
          </IonText>
        )}

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

        <div className="ion-padding-top">
          <IonButton expand="block" type="submit" disabled={isLoading}>
            {t('common.submit')}
          </IonButton>

          <div className="ion-text-center ion-padding-top">
            <IonButton
              fill="clear"
              size="small"
              onClick={() => history.push('/login')}
            >
              {t('common.backToLogin')}
            </IonButton>
          </div>
        </div>

        <IonLoading
          isOpen={isLoading}
          message={t('passwordForms.updatingPassword')}
        />
      </form>
    </PageLayout>
  );
};
