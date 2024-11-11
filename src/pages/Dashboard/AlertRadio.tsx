import React from 'react';
import { AlertComponent } from '@components/layout/AlertComponent';

export const AlertRadio: React.FC = () => {
  const handleOk = (data: { [key: string]: any }): void => {
    console.log('Selected color:', data);
  };

  return (
    <AlertComponent
      header="Choose a Color"
      message="Please select your favorite color:"
      inputs={[
        { label: 'Red', type: 'radio', value: 'red' },
        { label: 'Blue', type: 'radio', value: 'blue' },
        { label: 'Green', type: 'radio', value: 'green' },
      ]}
      buttons={[
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ]}
      buttonText="Show Radio Alert"
      onOk={handleOk}
    />
  );
};
