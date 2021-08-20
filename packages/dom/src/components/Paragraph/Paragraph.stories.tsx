import React from 'react';
import { Paragraph } from '.';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: Paragraph,
  title: 'Paragraph',
};

export default meta;

export const Default = () => {
  return <Paragraph>Basic paragraph component.</Paragraph>;
};
