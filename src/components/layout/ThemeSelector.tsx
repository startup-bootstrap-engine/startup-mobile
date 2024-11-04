import { IonButton, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import React from 'react';

import { useTheme } from '@contexts/ThemeProvider';
import type { Theme } from '@utils/types';

export const ThemeSelector: React.FC = () => {
  const { theme, mode, changeTheme, toggleMode } = useTheme();

  const allThemes: Theme[] = ['lara', 'sakai', 'vela', 'soho'];

  return (
    <IonList>
      <IonItem>
        <IonLabel>Theme</IonLabel>
        <div className="ion-text-end">
          {allThemes.map((themeName) => (
            <IonButton
              key={themeName}
              fill={theme === themeName ? 'solid' : 'outline'}
              size="small"
              className="ion-margin-start"
              onClick={() => changeTheme(themeName)}
            >
              {themeName}
            </IonButton>
          ))}
        </div>
      </IonItem>
      <IonItem>
        <IonLabel>Mode</IonLabel>
        <IonButton fill="clear" onClick={toggleMode}>
          <IonIcon
            slot="icon-only"
            icon={mode === 'dark' ? sunnyOutline : moonOutline}
          />
        </IonButton>
      </IonItem>
    </IonList>
  );
};
