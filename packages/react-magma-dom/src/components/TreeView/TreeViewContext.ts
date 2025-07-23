import * as React from 'react';

import { TreeViewSelectable } from './types';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

export interface TreeItemSelectedInterface {
  itemId?: string;
  checkedStatus: IndeterminateCheckboxStatus;
  isDisabled?: boolean;
}

export interface TreeViewItemInterface {
  itemId?: string;
  parentId?: string | null;
  icon?: React.ReactNode;
  checkedStatus: IndeterminateCheckboxStatus;
  hasOwnTreeItems: boolean;
  isDisabled?: boolean;
}

export interface TreeViewContextInterface {
  children?: React.ReactNode[];
  hasIcons: boolean;
  initialExpandedItems: Array<string>;
  onExpandedChange?: (
    event: React.SyntheticEvent,
    expandedItems: Array<string>
  ) => void;
  onSelectedItemChange?: (
    selectedItems: Array<TreeItemSelectedInterface>
  ) => void;
  registerTreeItem: (
    itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    itemRef: React.MutableRefObject<Element>
  ) => void;
  selectable: TreeViewSelectable;
  selectedItems: Array<TreeItemSelectedInterface>;
  treeItemRefArray?: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  itemToFocus?: string;
  checkParents: boolean;
  checkChildren: boolean;
  items: TreeViewItemInterface[];
  selectItem: (
    data: Pick<TreeViewItemInterface, 'itemId' | 'checkedStatus'>
  ) => void;
  handleExpandedChange: (
    event: React.SyntheticEvent,
    expandedItemId: string
  ) => void;
  expandedSet: Set<string>;
  isTopLevelSelectable?: boolean;
  expandIconSize?: number;
  expandIconColor?: string;
}

export const TreeViewContext = React.createContext<TreeViewContextInterface>({
  hasIcons: false,
  initialExpandedItems: [],
  registerTreeItem: (elements, element) => {},
  selectable: TreeViewSelectable.single,
  selectedItems: [],
  checkParents: true,
  checkChildren: true,
  items: [],
  selectItem: () => undefined,
  handleExpandedChange: () => undefined,
  isTopLevelSelectable: true,
  expandedSet: new Set<string>(),
  expandIconSize: 24,
  expandIconColor: undefined,
});
