import React from 'react';
import { Textarea } from '.';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: Textarea,
  title: 'Textarea',
};

export default meta;

export const Default = () => {
  return <Textarea labelText="Textarea" value="Some text" />;
};
