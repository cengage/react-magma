import React from 'react';
import { TreeView, TreeItem } from '.';

import { AssignmentIcon, FolderIcon } from 'react-magma-icons';
import { ExpandInitialOptions } from './useTreeView';

export default {
  component: TreeView,
  title: 'TreeView',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    isSelectable: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
  },
};

export const Default = (args) => {
  return (
    <TreeView expandInitial={ExpandInitialOptions.All} {...args}>
      <TreeItem icon={<FolderIcon/>} {...args}>Part 1: Introduction
        <TreeItem icon={<AssignmentIcon/>} {...args}>Chapter 1: Lorem ipsum dolor sit amet
        </TreeItem>
        <TreeItem icon={<AssignmentIcon/>} {...args}>Chapter 2: Lorem ipsum dolor sit amet
        </TreeItem>
        <TreeItem icon={<AssignmentIcon/>} {...args}>Chapter 3: Lorem ipsum dolor sit amet
          <TreeItem icon={<AssignmentIcon/>} {...args}>Section 1: Lorem ipsum dolor sit amet
          </TreeItem>
          <TreeItem icon={<AssignmentIcon/>} {...args}>Section 2: Lorem ipsum dolor sit amet
          </TreeItem>
          <TreeItem icon={<AssignmentIcon/>} {...args}>Section 3: Lorem ipsum dolor sit amet
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem icon={<FolderIcon/>} {...args}>Part 2: Lorem ipsum dolor sit amet
        <TreeItem icon={<AssignmentIcon/>} {...args}>Chapter 4: Lorem ipsum dolor sit amet
        </TreeItem>
        <TreeItem icon={<AssignmentIcon/>} {...args}>Chapter 5: Lorem ipsum dolor sit amet
        </TreeItem>
        <TreeItem icon={<AssignmentIcon/>} {...args}>Chapter 6: Lorem ipsum dolor sit amet
        </TreeItem>
      </TreeItem>
      <TreeItem icon={<FolderIcon/>} {...args}>Part 3: Lorem ipsum dolor sit amet
        <TreeItem icon={<AssignmentIcon/>} {...args}>Chapter 7: Lorem ipsum dolor sit amet
        </TreeItem>
        <TreeItem icon={<AssignmentIcon/>} {...args}>Chapter 8: Lorem ipsum dolor sit amet
        </TreeItem>
        <TreeItem icon={<AssignmentIcon/>} {...args}>Chapter 9: Lorem ipsum dolor sit amet
        </TreeItem> 
        <TreeItem icon={<AssignmentIcon/>} {...args}>Chapter 10: Lorem ipsum dolor sit amet
        </TreeItem> 
      </TreeItem>
    </TreeView>
  );
};

export const DefaultCollapsed = (args) => {
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
      <TreeItem {...args}>Kitchen & Dining</TreeItem>
      <TreeItem {...args}>Patio & Garden
        <TreeItem {...args}>Item 1</TreeItem>
        <TreeItem {...args}>Item 2</TreeItem>
      </TreeItem>
    </TreeView>
  );
};
