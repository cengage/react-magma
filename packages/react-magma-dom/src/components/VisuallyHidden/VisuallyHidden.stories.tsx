import React from 'react';

import { Meta } from '@storybook/react';

import { VisuallyHidden } from '.';

export default {
  component: VisuallyHidden,
  title: 'VisuallyHidden',
} as Meta;

export const Default = () => {
  return <VisuallyHidden>Sample text</VisuallyHidden>;
};
