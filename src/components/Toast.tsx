import { IonToast } from '@ionic/react';
import React from 'react';

import { useToastStore } from 'src/hooks/useToastStore';

export const Toast: React.FC = () => {
  const { isVisible, message, type, duration, position, hideToast } =
    useToastStore();

  const toastColor = {
    success: 'success',
    error: 'danger',
    warning: 'warning',
    info: 'medium',
  };

  return (
    <IonToast
      isOpen={isVisible}
      message={message}
      duration={duration}
      position={position}
      color={toastColor[type]}
      onDidDismiss={hideToast}
    />
  );
};
