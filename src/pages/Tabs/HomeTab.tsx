import { IonContent, IonPage } from '@ionic/react';
import React from 'react';

export const HomeTab: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Welcome Home</h2>
        <p>This is the home tab content.</p>
      </IonContent>
    </IonPage>
  );
};
