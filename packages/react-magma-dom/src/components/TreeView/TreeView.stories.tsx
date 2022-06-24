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
    <TreeView isSelectable={true} hasIcons={true} {...args}>
      <TreeItem icon={<FolderIcon/>} {...args}>Home
        <TreeItem icon={<FolderIcon/>} {...args}>Bath
          <TreeItem icon={<FolderIcon/>} {...args}>Bathroom Storage
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
          </TreeItem>
          <TreeItem {...args}>Shower Curtains & Accessories
          </TreeItem>
          <TreeItem icon={<FolderIcon/>} {...args}>Bath Towels
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem icon={<FolderIcon/>} {...args}>Bedding
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
        </TreeItem>
        <TreeItem {...args}>Arts & Crafts
        </TreeItem>
        <TreeItem icon={<FolderIcon/>} {...args}>Storage & Organization
          <TreeItem {...args}>Item 1</TreeItem>
          <TreeItem {...args}>Item 2</TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem icon={<FolderIcon/>} {...args}>Furniture
        <TreeItem {...args}>Item 1</TreeItem>
        <TreeItem {...args}>Item 2</TreeItem>
      </TreeItem>
      <TreeItem {...args}>Kitchen & Dining</TreeItem>
      <TreeItem icon={<FolderIcon/>} {...args}>Patio & Garden
        <TreeItem {...args}>Item 1</TreeItem>
        <TreeItem {...args}>Item 2</TreeItem>
      </TreeItem>
    </TreeView>
  );
};

export const NoCheckboxes = (args) => {
  return (
    <TreeView isSelectable={false} hasIcons={true} {...args}>
      <TreeItem icon={<FolderIcon/>} {...args}>Home
        <TreeItem icon={<FolderIcon/>} {...args}>Bath
          <TreeItem icon={<FolderIcon/>} {...args}>Bathroom Storage
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
          </TreeItem>
          <TreeItem {...args}>Shower Curtains & Accessories
          </TreeItem>
          <TreeItem icon={<FolderIcon/>} {...args}>Bath Towels
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem icon={<FolderIcon/>} {...args}>Bedding
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
        </TreeItem>
        <TreeItem {...args}>Arts & Crafts
        </TreeItem>
        <TreeItem icon={<FolderIcon/>} {...args}>Storage & Organization
          <TreeItem {...args}>Item 1</TreeItem>
          <TreeItem {...args}>Item 2</TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem icon={<FolderIcon/>} {...args}>Furniture
        <TreeItem {...args}>Item 1</TreeItem>
        <TreeItem {...args}>Item 2</TreeItem>
      </TreeItem>
      <TreeItem {...args}>Kitchen & Dining</TreeItem>
      <TreeItem icon={<FolderIcon/>} {...args}>Patio & Garden
        <TreeItem {...args}>Item 1</TreeItem>
        <TreeItem {...args}>Item 2</TreeItem>
      </TreeItem>
    </TreeView>
  );
};
export const NoIcons = (args) => {
  return (
    <TreeView isSelectable={true} hasIcons={false} {...args}>
      <TreeItem icon={<FolderIcon/>} {...args}>Home
        <TreeItem icon={<FolderIcon/>} {...args}>Bath
          <TreeItem icon={<FolderIcon/>} {...args}>Bathroom Storage
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
          </TreeItem>
          <TreeItem {...args}>Shower Curtains & Accessories
          </TreeItem>
          <TreeItem icon={<FolderIcon/>} {...args}>Bath Towels
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem icon={<FolderIcon/>} {...args}>Bedding
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
        </TreeItem>
        <TreeItem {...args}>Arts & Crafts
        </TreeItem>
        <TreeItem icon={<FolderIcon/>} {...args}>Storage & Organization
          <TreeItem {...args}>Item 1</TreeItem>
          <TreeItem {...args}>Item 2</TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem icon={<FolderIcon/>} {...args}>Furniture
        <TreeItem {...args}>Item 1</TreeItem>
        <TreeItem {...args}>Item 2</TreeItem>
      </TreeItem>
      <TreeItem {...args}>Kitchen & Dining</TreeItem>
      <TreeItem icon={<FolderIcon/>} {...args}>Patio & Garden
        <TreeItem {...args}>Item 1</TreeItem>
        <TreeItem {...args}>Item 2</TreeItem>
      </TreeItem>
    </TreeView>
  );
};

export const NoIconsNoCheckboxes = (args) => {
  return (
    <TreeView isSelectable={false} hasIcons={false} {...args}>
      <TreeItem icon={<FolderIcon/>} {...args}>Home
        <TreeItem icon={<FolderIcon/>} {...args}>Bath
          <TreeItem icon={<FolderIcon/>} {...args}>Bathroom Storage
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
          </TreeItem>
          <TreeItem {...args}>Shower Curtains & Accessories
          </TreeItem>
          <TreeItem icon={<FolderIcon/>} {...args}>Bath Towels
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem icon={<FolderIcon/>} {...args}>Bedding
            <TreeItem {...args}>Item 1</TreeItem>
            <TreeItem {...args}>Item 2</TreeItem>
        </TreeItem>
        <TreeItem {...args}>Arts & Crafts
        </TreeItem>
        <TreeItem icon={<FolderIcon/>} {...args}>Storage & Organization
          <TreeItem {...args}>Item 1</TreeItem>
          <TreeItem {...args}>Item 2</TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem icon={<FolderIcon/>} {...args}>Furniture
        <TreeItem {...args}>Item 1</TreeItem>
        <TreeItem {...args}>Item 2</TreeItem>
      </TreeItem>
      <TreeItem {...args}>Kitchen & Dining</TreeItem>
      <TreeItem icon={<FolderIcon/>} {...args}>Patio & Garden
        <TreeItem {...args}>Item 1</TreeItem>
        <TreeItem {...args}>Item 2</TreeItem>
      </TreeItem>
    </TreeView>
  );
};
