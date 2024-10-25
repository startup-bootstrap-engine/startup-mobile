import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  showBackButton = true,
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {showBackButton && (
            <IonButtons slot="start">
              <IonBackButton defaultHref="/login" />
            </IonButtons>
          )}
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{children}</IonContent>
    </IonPage>
  );
};
