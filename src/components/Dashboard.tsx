import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useAuthStore } from '../store/useAuthStore';
import { useHistory } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { logout } = useAuthStore(); // Hook para realizar o logout
  const history = useHistory();

  const handleLogout = async () => {
    await logout(); // Chama a função de logout da store
    history.push('/login'); // Redireciona para a página de login após o logout
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Bem-vindo ao Dashboard!</h2>
        <p>Aqui você pode ver o conteúdo privado do usuário autenticado.</p>

        <IonButton expand="full" color="danger" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
