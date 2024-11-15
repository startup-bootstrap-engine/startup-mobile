import { IonContent, IonPage, IonSearchbar } from '@ionic/react';
import React, { useState } from 'react';

export const SearchTab: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value ?? '')}
          placeholder="Search..."
        />
        <p>Search results will appear here</p>
      </IonContent>
    </IonPage>
  );
};
