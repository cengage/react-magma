import React from 'react';
import { TreeView, TreeItem } from '.';

import { FolderIcon } from 'react-magma-icons';

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
  return (
    <TreeView {...args}>
      <TreeItem icon={<FolderIcon />} {...args}>Sample text</TreeItem>
    </TreeView>
  );
};

