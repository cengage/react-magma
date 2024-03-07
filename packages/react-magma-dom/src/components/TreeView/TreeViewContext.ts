import * as React from 'react';
import { TreeViewSelectable } from './useTreeView';

export interface TreeViewContextInterface {
  children?: React.ReactNode | React.ReactNode[];
  hasIcons: boolean;
  onSelectedItemChange?: (selectedItems: Array<Object>) => void;
  onExpandedChange?: (event: React.SyntheticEvent) => void;
  selectable: TreeViewSelectable;
  setHasIcons: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: Array<Object>;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  initialExpandedItems: Array<string>;
  initialSelectedItems: Array<Object>;
  treeItemRefArray?: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  registerTreeItem: (
    itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    itemRef: React.MutableRefObject<Element>
  ) => void;
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
});
