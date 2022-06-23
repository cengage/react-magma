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
      <TreeItem {...args}>Home
        <TreeItem {...args}>Bath
          <TreeItem {...args}>Bathroom Storage
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
          </TreeItem>
          <TreeItem {...args}>Shower Curtains & Accessories
          </TreeItem>
          <TreeItem {...args}>Bath Towels
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem {...args}>Bedding
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
        </TreeItem>
        <TreeItem {...args}>Arts & Crafts
        </TreeItem>
        <TreeItem {...args}>Storage & Organization
          <TreeItem {...args}>Item 1</TreeItem>
          <TreeItem {...args}>Item 2</TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem {...args}>Furniture
        <TreeItem {...args}>Item 1</TreeItem>
        <TreeItem {...args}>Item 2</TreeItem>
      </TreeItem>
      <TreeItem {...args}>Kitchen & Dining
      </TreeItem>
      <TreeItem {...args}>Patio & Garden
        <TreeItem {...args}>Item 1</TreeItem>
        <TreeItem {...args}>Item 2</TreeItem>
      </TreeItem>
    </TreeView>
  );
};

