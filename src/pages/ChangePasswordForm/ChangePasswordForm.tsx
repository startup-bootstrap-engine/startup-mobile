import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useChangePasswordSchema, useTranslations } from '@hooks';
import { IonButton, IonLoading, IonText } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ZodIssue } from 'zod';

interface IPasswordData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export const ChangePasswordForm: React.FC = () => {
  const history = useHistory();
  const { changePassword, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const changePasswordSchema = useChangePasswordSchema();

  const [formData, setFormData] = useState<IPasswordData>({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = changePasswordSchema.safeParse(formData);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err: ZodIssue) => {
        errors[err.path[0]] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    const { currentPassword, newPassword } = formData;
    await changePassword(currentPassword, newPassword);

    history.push('/login');
  };

  return (
    <PageLayout title={t('passwordForms.changePasswordForm')}>
      <form onSubmit={handleSubmit}>
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <FormField
          label={t('passwordForms.currentPassword')}
          value={formData.currentPassword}
          onChange={(value) => handleInputChange('currentPassword', value)}
          type="password"
          error={formErrors.currentPassword}
        />

        <FormField
          label={t('passwordForms.newPassword')}
          value={formData.newPassword}
          onChange={(value) => handleInputChange('newPassword', value)}
          type="password"
          error={formErrors.newPassword}
        />

        <FormField
          label={t('passwordForms.confirmPassword')}
          value={formData.newPasswordConfirmation}
          onChange={(value) =>
            handleInputChange('newPasswordConfirmation', value)
          }
          type="password"
          error={formErrors.newPasswordConfirmation}
        />

        <IonLoading
          isOpen={isLoading}
          message={t('passwordForms.updatingPassword')}
        />

        <IonButton expand="full" type="submit" disabled={isLoading}>
          {t('passwordForms.updatePassword')}
        </IonButton>
      </form>
    </PageLayout>
  );
};

export default ChangePasswordForm;
