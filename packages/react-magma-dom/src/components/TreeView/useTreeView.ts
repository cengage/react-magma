import * as React from 'react';

export enum ExpandInitialOptions {
  all = 'all',
  first = 'first',
  none = 'none',
}

export enum TreeViewSelectable {
  off = 'off',
  single = 'single',
  multi = 'multi',
}

export interface UseTreeViewProps {
  /**
   * Initial expand state
   * @default ExpandInitialOptions.none
   */
  expandInitial?: ExpandInitialOptions;
  isInverse?: boolean;
  /**
   * Type of selectable for the tree view: off, single, multi
   * @default TreeViewSelectable.off
   */
  selectable?: TreeViewSelectable;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Content of label for accessibility
   */
  // label: React.ReactNode;
  /**
   * TODO??
   */
  // singleSelectItemId?: string;
  children?: React.ReactNode | React.ReactNode[];
  /**
   * Action that fires when an item is selected
   */
  onSelectedItemChange?: () => void;
}

export interface TreeViewContextInterface {
  children?: React.ReactNode | React.ReactNode[];
  expandInitial?: ExpandInitialOptions;
  hasIcons: boolean;
  onSelectedItemChange?: () => void;
  selectable: TreeViewSelectable;
  setHasIcons: React.Dispatch<React.SetStateAction<boolean>>;
  // singleSelectItemId?: string;
  selectedItems: Array<any>;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
}

export const TreeViewContext = React.createContext<TreeViewContextInterface>({
  expandInitial: ExpandInitialOptions.none,
  selectable: TreeViewSelectable.off,
  hasIcons: false,
  setHasIcons: () => {},
  selectedItems: [],
  setSelectedItems: () => {},
});

export function useTreeView(props: UseTreeViewProps) {
  const { selectable, expandInitial, onSelectedItemChange, children } = props;
  const [hasIcons, setHasIcons] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const contextValue = {
    children,
    expandInitial,
    hasIcons,
    onSelectedItemChange,
    selectable,
    setHasIcons,
    selectedItems,
    setSelectedItems,
    // singleSelectItemId: '',
  };

  return { contextValue };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>;
