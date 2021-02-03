import React from 'react';
import { Alert } from '.';

export default {
  component: Alert,
  title: 'Alert',
};

export const Default = () => {
  return (
    <Alert isDismissible toastDuration={5000}>
      Content Is Fun
    </Alert>
  );
};
