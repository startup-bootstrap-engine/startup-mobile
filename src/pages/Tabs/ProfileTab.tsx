import {
  IonContent,
  IonPage,
  IonAvatar,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import React from 'react';

export const ProfileTab: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonItem>
          <IonAvatar slot="start">
            <IonIcon
              icon={personCircle}
              style={{ fontSize: '48px', width: '100%', height: '100%' }}
            />
          </IonAvatar>
          <IonLabel>
            <h2>User Profile</h2>
            <p>View and edit your profile information</p>
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
