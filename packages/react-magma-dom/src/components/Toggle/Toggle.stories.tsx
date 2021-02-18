import React from 'react';
import { Toggle } from '.';

export default {
  component: Toggle,
  title: 'Toggle',
};

export const Default = () => {
  return (
    <div>
      <Toggle id="Toggle0" labelText="Toggle label off" />
      <Toggle checked id="Toggle1" labelText="Toggle label on" />
    </div>
  );
};
