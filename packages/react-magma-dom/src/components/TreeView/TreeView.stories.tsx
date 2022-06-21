import React from 'react';
import { TreeView } from '.';

export default {
  component: TreeView,
  title: 'TreeView',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default = (args) => {
  return <TreeView {...args}>Sample text</TreeView>;
};

