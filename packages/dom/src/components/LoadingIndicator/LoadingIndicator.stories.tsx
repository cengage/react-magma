import React from 'react';
import { LoadingIndicator } from '.';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: LoadingIndicator,
  title: 'LoadingIndicator',
};

export default meta;

export const Default = () => {
  return <LoadingIndicator />;
};
