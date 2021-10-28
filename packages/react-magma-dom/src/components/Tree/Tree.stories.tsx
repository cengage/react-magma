import React from 'react';
import { Tree } from '.';

export default {
  component: Tree,
  title: 'Tree',
  argTypes: {
  },
};

export const Default = (args) => {
  return <Tree {...args}>Sample text</Tree>;
};

