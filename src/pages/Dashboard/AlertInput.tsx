import React from 'react';
import { AlertComponent } from '@components/layout/AlertComponent';

export const AlertInput: React.FC = () => {
  const handleOk = (data: { [key: string]: any }) => {
    console.log('Form data:', data);
  };

  return (
    <AlertComponent
      header="Input Alert"
      message="Please provide your information"
      inputs={[
        { name: 'name', type: 'text', placeholder: 'Name' },
        {
          name: 'nickname',
          type: 'text',
          placeholder: 'Nickname (max 8 characters)',
          attributes: { maxlength: 8 },
        },
        { name: 'age', type: 'number', placeholder: 'Age', min: 1, max: 100 },
        {
          name: 'about',
          type: 'textarea',
          placeholder: 'A little about yourself',
        },
      ]}
      buttons={[
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ]}
      buttonText="Show Input Alert"
      onOk={handleOk}
    />
  );
};
