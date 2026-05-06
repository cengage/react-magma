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

export interface TreeViewSelectionContextInterface {
  items: TreeViewItemInterface[];
  /**
   * O(1) lookup map of items keyed by itemId.
   * Built once per items update by the TreeView and shared via context so
   * individual TreeItem instances do not have to do `items.find(...)`
   * (which is O(N) per item, i.e. O(N^2) per re-render storm).
   */
  itemsById: Map<string, TreeViewItemInterface>;
  selectedItems: Array<TreeItemSelectedInterface>;
  selectItem: (
    data: Pick<TreeViewItemInterface, 'itemId' | 'checkedStatus'>
  ) => void;
  onSelectedItemChange?: (
    selectedItems: Array<TreeItemSelectedInterface>
  ) => void;
  selectable: TreeViewSelectable;
  itemToFocus?: string;
}

export const TreeViewSelectionContext =
  React.createContext<TreeViewSelectionContextInterface>({
    items: [],
    itemsById: new Map(),
    selectedItems: [],
    selectItem: () => undefined,
    selectable: TreeViewSelectable.single,
  });
