import { IonButton, IonLoading, IonText } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Form, type IFormField } from '@components/forms/Form';
import { useTranslatedSchema, useTranslations } from '@hooks/index';
import { useFormHandler } from '@hooks/useFormHandler';
import { useAuthStore } from '@store/api/userApi/useAuthStore';

import { PageLayout } from '@components/layout/PageLayout';
import type { ForgotPasswordSchema } from '@schemas/authSchema';
import { forgotPasswordSchema } from '@schemas/authSchema';

export const ForgotPasswordForm: React.FC = () => {
  const history = useHistory();
  const { forgotPassword, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const schema = useTranslatedSchema(forgotPasswordSchema);

  const form = useFormHandler<ForgotPasswordSchema>({
    schema,
    defaultValues: {
      email: '',
    },
    onSubmit: async (data) => {
      try {
        await forgotPassword(data.email);
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
      <form onSubmit={form.onSubmit} className="ion-padding">
        {error && (
          <IonText color="danger" className="ion-padding-bottom">
            <p>{error}</p>
          </IonText>
        )}

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

        <div className="ion-padding-top">
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
