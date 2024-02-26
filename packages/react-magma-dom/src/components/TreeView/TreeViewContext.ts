import * as React from 'react';
import { TreeViewSelectable } from '.';

export interface TreeViewContextInterface {
  children?: React.ReactNode | React.ReactNode[];
  hasIcons: boolean;
  onSelectedItemChange?: (selectedItems: any) => void;
  onExpandedChange?: (event: React.SyntheticEvent) => void;
  selectable: TreeViewSelectable;
  setHasIcons: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: Array<string>;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  initialExpandedItems: Array<string>;
  initialSelectedItems: Array<string>;
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
