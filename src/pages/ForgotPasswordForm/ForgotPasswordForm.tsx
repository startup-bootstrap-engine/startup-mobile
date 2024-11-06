import { IonButton, IonLoading, IonText } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useForgotPasswordSchema, useTranslations } from '@hooks';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

interface IForgotPasswordData {
  email: string;
}

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const schema = useForgotPasswordSchema();
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordData>({
    resolver: zodResolver(schema),
  });

  const [formError, setFormError] = React.useState<string | null>(null);

  const onSubmit = async (data: IForgotPasswordData): Promise<void> => {
    try {
      await forgotPassword(data.email);
      history.push('/login');
    } catch (err) {
      console.error(err);
      setFormError(t('passwordForms.error.reset'));
    }
  };

  return (
    <PageLayout title={t('passwordForms.passwordRecoveryForm')}>
      <form onSubmit={handleSubmit(onSubmit)} className="ion-padding">
        {formError && (
          <IonText color="danger" className="ion-padding-bottom">
            <p>{formError}</p>
          </IonText>
        )}

        {error && (
          <IonText color="danger" className="ion-padding-bottom">
            <p>{error}</p>
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
              placeholder={t('loginForm.emailPlaceholder')}
            />
          )}
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
