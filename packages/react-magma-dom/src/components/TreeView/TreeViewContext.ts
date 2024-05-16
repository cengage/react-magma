import * as React from 'react';
import { TreeViewSelectable } from './useTreeView';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

export interface TreeItemSelectedInterface {
  itemId?: string;
  checkedStatus: IndeterminateCheckboxStatus;
}

export interface TreeViewContextInterface {
  children?: React.ReactNode | React.ReactNode[];
  hasIcons: boolean;
  initialExpandedItems: Array<string>;
  initialExpandedItemsNeedUpdate: boolean;
  onExpandedChange?: (event: React.SyntheticEvent) => void;
  onSelectedItemChange?: (selectedItems: Array<TreeItemSelectedInterface>) => void;
  preselectedItemsNeedUpdate: boolean;
  registerTreeItem: (itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,itemRef: React.MutableRefObject<Element>) => void;
  selectable: TreeViewSelectable;
  selectedItems: Array<TreeItemSelectedInterface>;
  selectedItemsChanged: boolean;
  setHasIcons: React.Dispatch<React.SetStateAction<boolean>>;
  setInitialExpandedItemsNeedUpdate: React.Dispatch<React.SetStateAction<any>>;
  setPreselectedItemsNeedUpdate: React.Dispatch<React.SetStateAction<any>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  setSelectedItemsChanged:React.Dispatch<React.SetStateAction<any>>;
  treeItemRefArray?: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  itemToFocus?: string;
}

export const TreeViewContext = React.createContext<TreeViewContextInterface>({
  hasIcons: false,
  initialExpandedItems: [],
  initialExpandedItemsNeedUpdate: false,
  preselectedItemsNeedUpdate: false,
  registerTreeItem: (elements, element) => {},
  selectable: TreeViewSelectable.single,
  selectedItems: [],
  selectedItemsChanged: false,
  setHasIcons: () => {},
  setInitialExpandedItemsNeedUpdate: () => {},
  setPreselectedItemsNeedUpdate: () => {},
  setSelectedItems: () => {},
  setSelectedItemsChanged: () => {},
});
