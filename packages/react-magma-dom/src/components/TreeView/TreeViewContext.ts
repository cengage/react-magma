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
  onSelectedItemChange?: (
    selectedItems: Array<TreeItemSelectedInterface>
  ) => void;
  onExpandedChange?: (event: React.SyntheticEvent) => void;
  selectable: TreeViewSelectable;
  setHasIcons: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: Array<TreeItemSelectedInterface>;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  initialExpandedItems: Array<string>;
  initialSelectedItems: Array<TreeItemSelectedInterface>;
  treeItemRefArray?: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  registerTreeItem: (
    itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    itemRef: React.MutableRefObject<Element>
  ) => void;
  initialSelectedItemsNeedUpdate: boolean;
  setInitialSelectedItemsNeedUpdate: React.Dispatch<React.SetStateAction<any>>;
  initialExpandedItemsNeedUpdate: boolean;
  setInitialExpandedItemsNeedUpdate: React.Dispatch<React.SetStateAction<any>>;
  selectedItemsChanged: boolean;
  setSelectedItemsChanged:React.Dispatch<React.SetStateAction<any>>;
  needsUpdate: boolean;
  setNeedsUpdate:React.Dispatch<React.SetStateAction<any>>;
}

export const TreeViewContext = React.createContext<TreeViewContextInterface>({
  selectable: TreeViewSelectable.single,
  hasIcons: false,
  setHasIcons: () => {},
  selectedItems: [],
  setSelectedItems: () => {},
  initialExpandedItems: [],
  initialSelectedItems: [],
  registerTreeItem: (elements, element) => {},
  initialSelectedItemsNeedUpdate: false,
  setInitialSelectedItemsNeedUpdate: () => {},
  initialExpandedItemsNeedUpdate: false,
  setInitialExpandedItemsNeedUpdate: () => {},
  selectedItemsChanged: false,
  setSelectedItemsChanged: () => {},
  needsUpdate: false,
  setNeedsUpdate: () => {},
});
