import React, { useState } from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonLoading,
} from '@ionic/react';
import { useAuthStore } from '../../store/api/userApi/useAuthStore';
import { changePasswordSchema } from './zodValidation';

export const ChangePasswordForm: React.FC = () => {
  const { changePassword, isLoading, error } = useAuthStore();

  // Estados locais para os campos
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Atualiza os valores dos campos
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Validação com Zod
  const validateForm = () => {
    const validation = changePasswordSchema.safeParse(formData);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFormErrors(errors);
      return false;
    }

    setFormErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { currentPassword, newPassword } = formData;
    await changePassword(currentPassword, newPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Alterar Senha</h2>

      {/* Exibe erros de alteração de senha */}
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}

      {/* Campo de Senha Atual */}
      <IonItem>
        <IonLabel position="floating">Senha Atual</IonLabel>
        <IonInput
          type="password"
          value={formData.currentPassword}
          onIonChange={(e) =>
            handleInputChange('currentPassword', e.detail.value!)
          }
        />
      </IonItem>
      {formErrors.currentPassword && (
        <IonText color="danger">
          <p>{formErrors.currentPassword}</p>
        </IonText>
      )}

      {/* Campo de Nova Senha */}
      <IonItem>
        <IonLabel position="floating">Nova Senha</IonLabel>
        <IonInput
          type="password"
          value={formData.newPassword}
          onIonChange={(e) => handleInputChange('newPassword', e.detail.value!)}
        />
      </IonItem>
      {formErrors.newPassword && (
        <IonText color="danger">
          <p>{formErrors.newPassword}</p>
        </IonText>
      )}

      {/* Campo de Confirmação de Nova Senha */}
      <IonItem>
        <IonLabel position="floating">Confirmação de Nova Senha</IonLabel>
        <IonInput
          type="password"
          value={formData.newPasswordConfirmation}
          onIonChange={(e) =>
            handleInputChange('newPasswordConfirmation', e.detail.value!)
          }
        />
      </IonItem>
      {formErrors.newPasswordConfirmation && (
        <IonText color="danger">
          <p>{formErrors.newPasswordConfirmation}</p>
        </IonText>
      )}

      {/* Exibe um spinner de carregamento enquanto a alteração está em andamento */}
      <IonLoading isOpen={isLoading} message={'Alterando senha...'} />

      {/* Botão de Alterar Senha */}
      <IonButton expand="full" type="submit">
        Alterar Senha
      </IonButton>
    </form>
  );
};
