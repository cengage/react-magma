import React from 'react';
import { VisuallyHidden } from '.';
import { Meta } from '@storybook/react/types-6-0';

export default {
  component: VisuallyHidden,
  title: 'VisuallyHidden',
} as Meta;

export const Default = () => {
  return <VisuallyHidden>Sample text</VisuallyHidden>;
};
