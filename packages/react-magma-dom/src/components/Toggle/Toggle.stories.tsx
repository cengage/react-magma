import React from 'react';
import { Toggle } from '.';
import { Card } from '../Card';
import { Meta } from '@storybook/react/types-6-0';

export default {
  component: Toggle,
  title: 'Toggle',
} as Meta;

export const Default = () => {
  return (
    <div>
      <Toggle id="Toggle0" labelText="Toggle label off" />
      <Toggle checked id="Toggle1" labelText="Toggle label on" />
      <Toggle id="Toggle2" labelText="Toggle label off disabled" disabled />
      <Toggle
        checked
        id="Toggle3"
        labelText="Toggle label on disabled"
        disabled
      />
    </div>
  );
};

export const Inverse = () => {
  return (
    <Card isInverse>
      <Toggle id="Toggle0" labelText="Toggle label off" isInverse />
      <Toggle checked id="Toggle1" labelText="Toggle label on" isInverse />
      <Toggle
        id="Toggle2"
        labelText="Toggle label off disabled"
        disabled
        isInverse
      />
      <Toggle
        checked
        id="Toggle3"
        labelText="Toggle label on disabled"
        disabled
        isInverse
      />
    </Card>
  );
};
