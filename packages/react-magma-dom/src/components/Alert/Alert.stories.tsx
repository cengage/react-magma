import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Alert } from './index';
import { AlertVariant } from '../AlertBase';
import { Badge } from '../Badge';
import { Button, ButtonSize } from '../Button';
import { Card, CardBody } from '../Card';
import { Hyperlink } from '../Hyperlink';

export default {
  title: 'Alert',
  component: Alert,
} as Meta;

const AdditionalBadge = (
  <>
    <Badge>Badgery</Badge>
    <Badge>More Badgery</Badge>
  </>
);
const AdditionalButton = <Button size={ButtonSize.small}>Button it up</Button>;

export const Default = () => {
  return (
    <>
      <Alert>Default</Alert>
      <Alert variant={AlertVariant.success} additionalContent={AdditionalBadge}>
        Success&nbsp;
        <Hyperlink to="#">hyperlink</Hyperlink>
      </Alert>
      <Alert
        variant={AlertVariant.warning}
        additionalContent={AdditionalButton}
      >
        Warning <Hyperlink to="#">hyperlink</Hyperlink>
      </Alert>
      <Alert variant={AlertVariant.danger}>
        Danger <Hyperlink to="#">hyperlink</Hyperlink>
      </Alert>
      <Alert isDismissible>
        Default dismissible with <Hyperlink to="#">hyperlink</Hyperlink>
      </Alert>
      <Alert
        isDismissible
        variant={AlertVariant.success}
        additionalContent={AdditionalBadge}
      >
        Success dismissible with <Hyperlink to="#">hyperlink</Hyperlink>
      </Alert>
      <Alert
        isDismissible
        variant={AlertVariant.warning}
        additionalContent={AdditionalButton}
      >
        Warning dismissible with <Hyperlink to="#">hyperlink</Hyperlink>
      </Alert>
      <Alert isDismissible variant={AlertVariant.danger}>
        Danger dismissible with <Hyperlink to="#">hyperlink</Hyperlink>
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
          Default dismissible with{' '}
          <Hyperlink to="#" isInverse>
            hyperlink
          </Hyperlink>
        </Alert>
        <Alert isInverse isDismissible variant={AlertVariant.success}>
          Success dismissible with{' '}
          <Hyperlink to="#" isInverse>
            hyperlink
          </Hyperlink>
        </Alert>
        <Alert isInverse isDismissible variant={AlertVariant.warning}>
          Warning dismissible with{' '}
          <Hyperlink to="#" isInverse>
            hyperlink
          </Hyperlink>
        </Alert>
        <Alert isInverse isDismissible variant={AlertVariant.danger}>
          Danger dismissible with{' '}
          <Hyperlink to="#" isInverse>
            hyperlink
          </Hyperlink>
        </Alert>
      </CardBody>
    </Card>
  );
};
