import React from 'react';
import { VisuallyHidden } from '.';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: VisuallyHidden,
  title: 'VisuallyHidden'
};

export default meta;

export const Default = () => {
  return <VisuallyHidden>Sample text</VisuallyHidden>;
};
