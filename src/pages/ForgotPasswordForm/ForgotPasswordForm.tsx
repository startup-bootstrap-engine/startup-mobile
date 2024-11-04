import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useForgotPasswordForm, useTranslations } from '@hooks';
import { IonButton, IonLoading, IonText } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const schema = useForgotPasswordForm();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = schema.safeParse({ email });

    if (!validation.success) {
      setFormError(
        validation.error.errors[0]?.message || t('validations.email'),
      );
      return;
    }

    try {
      await forgotPassword(email);
      history.push('/login');
    } catch {
      setFormError(t('passwordForms.error.reset'));
    }
  };

  return (
    <PageLayout title={t('passwordForms.passwordRecoveryForm')}>
      <form onSubmit={handleSubmit} className="ion-padding">
        {error && (
          <IonText color="danger" className="ion-padding-bottom">
            <p>{error}</p>
          </IonText>
        )}

        <FormField
          label={t('loginForm.email')}
          value={email}
          onChange={setEmail}
          type="email"
          error={formError}
          required
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
