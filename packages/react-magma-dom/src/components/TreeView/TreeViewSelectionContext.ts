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
    selectedItems: [],
    selectItem: () => undefined,
    selectable: TreeViewSelectable.single,
  });
