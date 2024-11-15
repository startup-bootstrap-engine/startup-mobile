import {
  IonContent,
  IonPage,
  IonAvatar,
  IonItem,
  IonLabel,
} from '@ionic/react';
import React from 'react';

export const ProfileTab: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonItem>
          <IonAvatar slot="start">
            <img
              alt="Profile"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
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
