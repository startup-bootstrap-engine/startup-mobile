import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '@store/api/userApi/useAuthStore';
import { useTranslations } from '@hooks/useTranslations';
import { useRegistrationSchema } from '@hooks/useRegistrationSchema';

export const RegisterForm: React.FC = () => {
  const history = useHistory();
  const { signUp, isLoading, error } = useAuthStore();
  const { t } = useTranslations();
  const registrationSchema = useRegistrationSchema();

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
    <form onSubmit={handleSubmit}>
      <h2>{t('registrationForm.title')}</h2>

      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}

      <IonItem>
        <IonLabel position="floating">{t('registrationForm.name')}</IonLabel>
        <IonInput
          type="text"
          value={formData.name}
          onIonChange={(e) => handleInputChange('name', e.detail.value!)}
        />
      </IonItem>
      {formErrors.name && (
        <IonText color="danger">
          <p>{formErrors.name}</p>
        </IonText>
      )}

      <IonItem>
        <IonLabel position="floating">{t('loginForm.email')}</IonLabel>
        <IonInput
          type="email"
          value={formData.email}
          onIonChange={(e) => handleInputChange('email', e.detail.value!)}
        />
      </IonItem>
      {formErrors.email && (
        <IonText color="danger">
          <p>{formErrors.email}</p>
        </IonText>
      )}

      <IonItem>
        <IonLabel position="floating">{t('loginForm.password')}</IonLabel>
        <IonInput
          type="password"
          value={formData.password}
          onIonChange={(e) => handleInputChange('password', e.detail.value!)}
        />
      </IonItem>
      {formErrors.password && (
        <IonText color="danger">
          <p>{formErrors.password}</p>
        </IonText>
      )}

      <IonItem>
        <IonLabel position="floating">
          {t('registrationForm.confirmPassword')}
        </IonLabel>
        <IonInput
          type="password"
          value={formData.passwordConfirmation}
          onIonChange={(e) =>
            handleInputChange('passwordConfirmation', e.detail.value!)
          }
        />
      </IonItem>
      {formErrors.passwordConfirmation && (
        <IonText color="danger">
          <p>{formErrors.passwordConfirmation}</p>
        </IonText>
      )}

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
  );
};
