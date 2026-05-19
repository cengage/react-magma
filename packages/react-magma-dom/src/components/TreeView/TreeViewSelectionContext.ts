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
   * O(1) item lookup map keyed by itemId. Built once per items update so
   * TreeItem instances avoid an O(N) `items.find(...)` per render.
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
