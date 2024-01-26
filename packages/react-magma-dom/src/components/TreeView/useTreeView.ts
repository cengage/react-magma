import * as React from 'react';

export enum TreeViewSelectable {
  off = 'off',
  single = 'single',
  multi = 'multi',
}

export interface UseTreeViewProps {
  /**
   * Array list of indexes of items that should be expanded by default.
   * For all items expanded, provide an array with all the indexes
   * @default [] (no items expanded)
   */
  initialExpandedItems?: Array<number>;
  /**
   * Array list of indexes of items that should be selected by default
   */
  initialSelectedItems?: Array<number>;
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
   * Text for aria-label attribute for the tree.
   * If there is no visible name for the element you can reference, use aria-label to provide the user with a recognizable accessible name.
   * It's required to use either `ariaLabel` OR `ariaLabelledBy`.
   */
  ariaLabel?: string;
  /**
   * Text for aria-labelledby attribute for the tree.
   * If there is visible text that labels an element, use aria-labelledby.
   * It's required to use either `ariaLabel` OR `ariaLabelledBy`.
   */
  ariaLabelledBy?: string;
  /**
   * Action that fires when an item is selected
   */
  onSelectedItemChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Action that fires when an item is expanded or collapsed
   */
  onExpandedChange?: (event: React.SyntheticEvent) => void;
}

export interface TreeViewContextInterface {
  children?: React.ReactNode | React.ReactNode[];
  hasIcons: boolean;
  onSelectedItemChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExpandedChange?: (event: React.SyntheticEvent) => void;
  selectable: TreeViewSelectable;
  setHasIcons: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: Array<any>;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  initialExpandedItems: Array<number>;
  initialSelectedItems: Array<number>;
}

export const TreeViewContext = React.createContext<TreeViewContextInterface>({
  selectable: TreeViewSelectable.off,
  hasIcons: false,
  setHasIcons: () => {},
  selectedItems: [],
  setSelectedItems: () => {},
  initialExpandedItems: [],
  initialSelectedItems: [],
});

export function useTreeView(props: UseTreeViewProps) {
  const {
    selectable,
    onSelectedItemChange,
    onExpandedChange,
    initialExpandedItems,
    initialSelectedItems,
  } = props;
  const [hasIcons, setHasIcons] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const contextValue = {
    hasIcons,
    onSelectedItemChange,
    onExpandedChange,
    selectable,
    setHasIcons,
    selectedItems,
    setSelectedItems,
    initialExpandedItems,
    initialSelectedItems,
  };

  return { contextValue };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>;
