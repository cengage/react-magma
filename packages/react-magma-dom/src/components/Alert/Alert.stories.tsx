import React from 'react';
import { Alert } from './index';
import { AlertVariant } from '../AlertBase';
import { Card, CardBody } from '../Card';

export default {
  title: 'Alert',
  component: Alert,
};

export const Default = () => {
  return (
    <>
      <Alert>Default</Alert>
      <Alert variant={AlertVariant.success}>Success</Alert>
      <Alert variant={AlertVariant.warning}>Warning</Alert>
      <Alert variant={AlertVariant.danger}>Danger</Alert>
      <Alert isDismissible>Default dismissible</Alert>
      <Alert isDismissible variant={AlertVariant.success}>
        Success dismissible
      </Alert>
      <Alert isDismissible variant={AlertVariant.warning}>
        Warning dismissible
      </Alert>
      <Alert isDismissible variant={AlertVariant.danger}>
        Danger dismissible
      </Alert>
    </>
  );
};

export const Inverse = () => {
  return (
    <Card isInverse>
      <CardBody>
        <Alert isInverse>Default</Alert>
        <Alert isInverse variant={AlertVariant.success}>
          Success
        </Alert>
        <Alert isInverse variant={AlertVariant.warning}>
          Warning
        </Alert>
        <Alert isInverse variant={AlertVariant.danger}>
          Danger
        </Alert>
        <Alert isInverse isDismissible>
          Default dismissible
        </Alert>
        <Alert isInverse isDismissible variant={AlertVariant.success}>
          Success dismissible
        </Alert>
        <Alert isInverse isDismissible variant={AlertVariant.warning}>
          Warning dismissible
        </Alert>
        <Alert isInverse isDismissible variant={AlertVariant.danger}>
          Danger dismissible
        </Alert>
      </CardBody>
    </Card>
  );
};
