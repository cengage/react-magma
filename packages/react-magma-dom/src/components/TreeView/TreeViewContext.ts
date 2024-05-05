import * as React from 'react';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { TreeViewSelectable } from './useTreeView';

export interface TreeItemSelectedInterface {
  itemId?: string;
  checkedStatus: IndeterminateCheckboxStatus;
}

export interface TreeViewContextInterface {
  children?: React.ReactNode | React.ReactNode[];
  hasIcons: boolean;
  initialExpandedItems: Array<string>;
  onExpandedChange?: (event: React.SyntheticEvent) => void;
  onSelectedItemChange?: (
    selectedItems: Array<TreeItemSelectedInterface>
  ) => void;
  registerTreeItem: (
    itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    itemRef: React.MutableRefObject<Element>
  ) => void;
  selectable: TreeViewSelectable;
  selectedItems: Array<TreeItemSelectedInterface>;
  selectedItemsChanged: boolean;
  setHasIcons: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  setSelectedItemsChanged: React.Dispatch<React.SetStateAction<any>>;
  setUpdateInitialExpandedItems: React.Dispatch<React.SetStateAction<any>>;
  setUpdatePreselectedItems: React.Dispatch<React.SetStateAction<any>>;
  treeItemRefArray?: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  updateInitialExpandedItems: boolean;
  updatePreselectedItems: boolean;
}

export const TreeViewContext = React.createContext<TreeViewContextInterface>({
  hasIcons: false,
  initialExpandedItems: [],
  registerTreeItem: (elements, element) => {},
  selectable: TreeViewSelectable.single,
  selectedItems: [],
  selectedItemsChanged: false,
  setHasIcons: () => {},
  setSelectedItems: () => {},
  setSelectedItemsChanged: () => {},
  setUpdateInitialExpandedItems: () => {},
  setUpdatePreselectedItems: () => {},
  updateInitialExpandedItems: false,
  updatePreselectedItems: false,
});
