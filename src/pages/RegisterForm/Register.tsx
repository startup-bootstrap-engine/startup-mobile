import { FormField } from '@components/forms/FormField';
import { PageLayout } from '@components/layout/PageLayout';
import { useRegistrationSchema } from '@hooks/useRegistrationSchema';
import { useTranslations } from '@hooks/useTranslations';
import { IonButton, IonText } from '@ionic/react';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const RegisterForm: React.FC = () => {
  const { t } = useTranslations();
  const history = useHistory();
  const registrationSchema = useRegistrationSchema();
  const { signUp, isLoading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = registrationSchema.safeParse(formData);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    const { name, email, password, passwordConfirmation } = formData;
    await signUp(email, password, passwordConfirmation, name);
    history.push('/login');
  };

  return (
    <PageLayout title={t('registrationForm.title')}>
      <form onSubmit={handleSubmit}>
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <FormField
          label={t('registrationForm.name')}
          value={formData.name}
          onChange={(value) => handleInputChange('name', value)}
          error={formErrors.name}
        />

        <FormField
          label={t('loginForm.email')}
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          type="email"
          error={formErrors.email}
        />

        <FormField
          label={t('loginForm.password')}
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          type="password"
          error={formErrors.password}
        />

        <FormField
          label={t('registrationForm.confirmPassword')}
          value={formData.passwordConfirmation}
          onChange={(value) => handleInputChange('passwordConfirmation', value)}
          type="password"
          error={formErrors.passwordConfirmation}
        />

        <IonButton expand="full" type="submit" disabled={isLoading}>
          {t('registrationForm.register')}
        </IonButton>

        <IonButton
          expand="full"
          fill="outline"
          onClick={() => history.push('/login')}
        >
          {t('registrationForm.existingUser')}
        </IonButton>
      </form>
    </PageLayout>
  );
};

export default RegisterForm;
