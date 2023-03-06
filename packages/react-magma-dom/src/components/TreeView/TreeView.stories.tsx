import React from 'react';
import { TreeView, TreeItem } from '.';

import { AssignmentIcon, FolderIcon } from 'react-magma-icons';
import { ExpandInitialOptions } from './useTreeView';
import { Meta } from '@storybook/react/types-6-0';
import { Card } from '../Card';

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
    expandInitial: {
      control: {
        type: 'select',
        options: ExpandInitialOptions,
      },
      defaultValue: ExpandInitialOptions.all,
    },
  },
} as Meta;

export const Default = args => {
  return (
    <Card isInverse={args.isInverse}>
      <TreeView {...args}>
        <TreeItem icon={<FolderIcon />}>
          Part 1: Introduction
          <TreeItem icon={<AssignmentIcon />}>
            Chapter 1: Lorem ipsum dolor sit amet
          </TreeItem>
          <TreeItem icon={<AssignmentIcon />}>
            Chapter 2: Lorem ipsum dolor sit amet
          </TreeItem>
          <TreeItem icon={<AssignmentIcon />}>
            Chapter 3: Lorem ipsum dolor sit amet
            <TreeItem icon={<AssignmentIcon />}>
              Section 1: Lorem ipsum dolor sit amet
            </TreeItem>
            <TreeItem icon={<AssignmentIcon />}>
              Section 2: Lorem ipsum dolor sit amet
            </TreeItem>
            <TreeItem icon={<AssignmentIcon />}>
              Section 3: Lorem ipsum dolor sit amet
            </TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem icon={<FolderIcon />}>
          Part 2: Lorem ipsum dolor sit amet
          <TreeItem icon={<AssignmentIcon />}>
            Chapter 4: Lorem ipsum dolor sit amet
          </TreeItem>
          <TreeItem icon={<AssignmentIcon />}>
            Chapter 5: Lorem ipsum dolor sit amet
          </TreeItem>
          <TreeItem icon={<AssignmentIcon />}>
            Chapter 6: Lorem ipsum dolor sit amet
          </TreeItem>
        </TreeItem>
        <TreeItem icon={<FolderIcon />}>
          Part 3: Lorem ipsum dolor sit amet
          <TreeItem icon={<AssignmentIcon />}>
            Chapter 7: Lorem ipsum dolor sit amet
          </TreeItem>
          <TreeItem icon={<AssignmentIcon />}>
            Chapter 8: Lorem ipsum dolor sit amet
          </TreeItem>
          <TreeItem icon={<AssignmentIcon />}>
            Chapter 9: Lorem ipsum dolor sit amet
          </TreeItem>
          <TreeItem icon={<AssignmentIcon />}>
            Chapter 10: Lorem ipsum dolor sit amet
          </TreeItem>
        </TreeItem>
      </TreeView>
    </Card>
  );
};

export const DefaultCollapsed = args => {
  return (
    <Card isInverse={args.isInverse}>
      <TreeView {...args}>
        <TreeItem>
          Home
          <TreeItem>
            Bath
            <TreeItem>
              Bathroom Storage
              <TreeItem>Item 1</TreeItem>
              <TreeItem>Item 2</TreeItem>
            </TreeItem>
            <TreeItem>Shower Curtains & Accessories</TreeItem>
            <TreeItem>
              Bath Towels
              <TreeItem>Item 1</TreeItem>
              <TreeItem>Item 2</TreeItem>
            </TreeItem>
          </TreeItem>
          <TreeItem>
            Bedding
            <TreeItem>Item 1</TreeItem>
            <TreeItem>Item 2</TreeItem>
          </TreeItem>
          <TreeItem>Arts & Crafts</TreeItem>
          <TreeItem>
            Storage & Organization
            <TreeItem>Item 1</TreeItem>
            <TreeItem>Item 2</TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem>
          Furniture
          <TreeItem>Item 1</TreeItem>
          <TreeItem>Item 2</TreeItem>
        </TreeItem>
        <TreeItem>Kitchen & Dining</TreeItem>
        <TreeItem>
          Patio & Garden
          <TreeItem>Item 1</TreeItem>
          <TreeItem>Item 2</TreeItem>
        </TreeItem>
      </TreeView>
    </Card>
  );
};
