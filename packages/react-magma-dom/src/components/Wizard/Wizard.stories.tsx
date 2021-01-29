import React from 'react';
import { Wizard, WizardProps } from '.';
import { Input } from '../Input';
import { TabsOrientation } from '../Tabs/shared';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<WizardProps> = args => (
  <Wizard {...args}>I am an Wizard</Wizard>
);

export default {
  title: 'Wizard',
  component: Wizard,
} as Meta;

const steps = [
  {
    title: 'Step 1',
    description: 'Enter general information for the first step of this wizard.',
    children: <Input labelText="input one" />,
  },
  {
    title: 'Step 2',
    description: 'Enter more general information, we like too know everything.',
    children: <Input labelText="input two" />,
    optional: true,
  },
  {
    title: 'Step 3',
    description: 'Guess What? More info please.',
    children: <Input labelText="input three" />,
  },
];

export const Default = () => {
  return <Template steps={steps} />;
};

export const Vertical = () => {
  return <Template orientation={TabsOrientation.vertical} steps={steps} />;
};
