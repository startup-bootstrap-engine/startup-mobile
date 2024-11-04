import { IonToast } from '@ionic/react';
import { useToastStore } from 'src/hooks/useToastStore';
import React from 'react';

const Toast: React.FC = () => {
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

export default Toast;
