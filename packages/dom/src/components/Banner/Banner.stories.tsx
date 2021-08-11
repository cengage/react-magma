import React from 'react';
import { Banner } from '.';

import { Story, Meta } from '@storybook/react';

const meta: Meta = {
  component: Banner,
  title: 'Banner',
};

export default meta;

export const Default = () => {
  return <Banner>Default (info) banner</Banner>;
};
