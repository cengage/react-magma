import React from 'react';
import { Toggle } from '.';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: Toggle,
  title: 'Toggle',
};

export default meta;

export const Default = () => {
  return (
    <div>
      <Toggle id="Toggle0" labelText="Toggle label off" />
      <Toggle checked id="Toggle1" labelText="Toggle label on" />
    </div>
  );
};
