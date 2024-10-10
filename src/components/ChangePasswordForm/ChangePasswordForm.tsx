import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonText, IonLoading } from '@ionic/react';
import { useAuthStore } from '../../store/api/userApi/useAuthStore';

const ChangePasswordForm: React.FC = () => {
  const { changePassword, isLoading, error } = useAuthStore();

  // Estados locais para os campos
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validatePassword = () => {
    if (newPassword !== newPasswordConfirmation) {
      setPasswordError('As senhas não coincidem');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;

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
          value={currentPassword}
          onIonChange={(e) => setCurrentPassword(e.detail.value!)}
        />
      </IonItem>

      {/* Campo de Nova Senha */}
      <IonItem>
        <IonLabel position="floating">Nova Senha</IonLabel>
        <IonInput
          type="password"
          value={newPassword}
          onIonChange={(e) => setNewPassword(e.detail.value!)}
        />
      </IonItem>

      {/* Campo de Confirmação de Nova Senha */}
      <IonItem>
        <IonLabel position="floating">Confirmação de Nova Senha</IonLabel>
        <IonInput
          type="password"
          value={newPasswordConfirmation}
          onIonChange={(e) => setNewPasswordConfirmation(e.detail.value!)}
        />
      </IonItem>
      {passwordError && (
        <IonText color="danger">
          <p>{passwordError}</p>
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

export default ChangePasswordForm;
