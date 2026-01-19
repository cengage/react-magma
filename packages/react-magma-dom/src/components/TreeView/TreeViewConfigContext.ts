import * as React from 'react';

import { TreeViewSelectable } from './types';
import { magma } from '../../theme/magma';

export interface ExpandIconInterface {
  size?: number;
  color?: string;
}

export interface TreeViewConfigContextInterface {
  hasIcons: boolean;
  selectable: TreeViewSelectable;
  checkParents: boolean;
  checkChildren: boolean;
  isTopLevelSelectable?: boolean;
  expandIconStyles?: ExpandIconInterface;
  registerTreeItem: (
    itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    itemRef: React.MutableRefObject<Element>
  ) => void;
  treeItemRefArray?: React.MutableRefObject<React.MutableRefObject<Element>[]>;
}

export const TreeViewConfigContext =
  React.createContext<TreeViewConfigContextInterface>({
    hasIcons: false,
    selectable: TreeViewSelectable.single,
    checkParents: true,
    checkChildren: true,
    isTopLevelSelectable: true,
    registerTreeItem: (elements, element) => {},
    expandIconStyles: {
      size: magma.iconSizes.medium,
      color: undefined,
    },
  });
