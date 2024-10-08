import * as React from 'react';
import { useDescendants } from '../../hooks/useDescendants';
import { TreeItemSelectedInterface, TreeViewItemInterface } from './TreeViewContext';
import { getInitialExpandedIds, getInitialItems, selectMulti, selectSingle } from './utils';
import { TreeViewSelectable } from './types';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

export interface TreeViewApi {
  selectItem({ itemId, checkedStatus }: Pick<TreeViewItemInterface, 'itemId' | 'checkedStatus'>): void;
  selectAll(): void;
  clearAll(): void;
}

export interface UseTreeViewProps {
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
   * Array list of itemIds of items that should be expanded by default.
   * For all items expanded, provide an array with all the indexes
   * @default [] (no items expanded)
   */
  initialExpandedItems?: Array<string>;
  isInverse?: boolean;
  /**
   * Array list of itemIds of items that should be selected when the component renders
   * * @default [] (no items selected)
   */
  preselectedItems?: Array<TreeItemSelectedInterface>;
  /**
   * How many items can be selected in the tree view: single, multi, off
   * @default TreeViewSelectable.single
   */
  selectable?: TreeViewSelectable;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Action that fires when an item is expanded or collapsed
   */
  onExpandedChange?: (event: React.SyntheticEvent) => void;
  /**
   * Action that fires when an item is selected
   * Return an array of objects.
   * Example: [ {itemId: 'item0', checkedStatus: IndeterminateCheckboxStatus.indeterminate}, {itemId: 'item0-child', checkedStatus: IndeterminateCheckboxStatus.checked} ]
   */
  onSelectedItemChange?: (
    selectedItems: Array<TreeItemSelectedInterface>
  ) => void;
  /**
   * Only affects if selectable mode is TreeViewSelectable.multi.
   * Determines if the parent checkbox will get selected when the user selects all its children checkboxes.
   * When checkParents is enabled, the TreeView displays the indeterminate state of the parent checkboxes too.
   * @default true
   */
  checkParents?: boolean;
  /**
   * Only affects if selectable mode is TreeViewSelectable.multi.
   * Determines if the child checkboxes get selected when the user selects parent checkbox.
   * @default true
   */
  checkChildren?: boolean;
  children?: React.ReactNode[];
  /**
   * The ref object that allows TreeView manipulation.
   * Actions available:
   * selectItem({ itemId, checkedStatus }: Pick<TreeViewItemInterface, 'itemId' | 'checkedStatus'>): void - action that allows to change item selection, 
   * selectAll(): void - action that allows to select all items, 
   * clearAll(): void - action that allows to unselect all items.
   */
  apiRef?: React.MutableRefObject<TreeViewApi>,
}

export function useTreeView(props: UseTreeViewProps) {
  const {
    selectable = TreeViewSelectable.single,
    onSelectedItemChange,
    onExpandedChange,
    initialExpandedItems: rawInitialExpandedItems,
    preselectedItems,
    checkChildren = selectable !== TreeViewSelectable.single,
    checkParents = selectable !== TreeViewSelectable.single,
    children,
    apiRef,
  } = props;

  const hasPreselectedItems = Boolean(preselectedItems);

  const [items, setItems] = React.useState(
    () => getInitialItems({ children, preselectedItems, checkParents, selectable })
  );
  const [hasIcons]  = React.useState(() => {
    const initialItems = getInitialItems({ children, preselectedItems, checkParents, selectable })

    return initialItems.some((item) => item.icon);
  });
  
  const selectedItems = React.useMemo(() => {
    return items.filter((item) => item.checkedStatus === IndeterminateCheckboxStatus.checked)
  }, [items]);

  const initialExpandedItems = React.useMemo(() => {
    return getInitialExpandedIds({ items, initialExpandedItems: rawInitialExpandedItems })
  }, [items, rawInitialExpandedItems]); 

  const itemToFocus = React.useMemo(() => {
    const [firstItem] = items;

    if (selectable === TreeViewSelectable.off) {
      const firstExpandableItem = items.find((item) => item.hasOwnTreeItems)

      return firstExpandableItem ? firstExpandableItem.itemId : firstItem?.itemId;
    }

    const firstNonUncheckedItem = items.find((item) => item.checkedStatus && item.checkedStatus !== IndeterminateCheckboxStatus.unchecked)

    if (firstNonUncheckedItem) {
      return firstNonUncheckedItem.itemId;
    }

    return firstItem?.itemId;
  }, [items]);
  
  const initializationRef = React.useRef(true);

  React.useEffect(() => {
    if (initializationRef.current && !hasPreselectedItems) {
      initializationRef.current = false;
      return;
    }
    
    if (selectable === TreeViewSelectable.off) {
      return
    }

    onSelectedItemChange && onSelectedItemChange(items.filter(({ checkedStatus }) => checkedStatus && checkedStatus !== IndeterminateCheckboxStatus.unchecked).map(({ itemId,  checkedStatus }) => ({ itemId,  checkedStatus })))
  }, [items, selectable, hasPreselectedItems])

  const selectItem = React.useCallback(({ itemId, checkedStatus }: Pick<TreeViewItemInterface, 'itemId' | 'checkedStatus'>) => {
    if(selectable === TreeViewSelectable.off) {
      return;
    }

    setItems(prevItems => {
      if(selectable === TreeViewSelectable.single) {
        return selectSingle({ items: prevItems, itemId, checkedStatus });
      }
      
      if(selectable === TreeViewSelectable.multi) {
        return selectMulti({ items: prevItems, itemId, checkedStatus, checkChildren, checkParents });
      }
      
      return prevItems;
    });
  }, [selectable, checkChildren, checkParents])

  React.useEffect(() => {
    if (apiRef) {
      apiRef.current = {
        selectItem,
        selectAll() {
          if ([TreeViewSelectable.single, TreeViewSelectable.single].includes(selectable)) {
            return;
          }

          setItems(prevItems => {
            return prevItems.map(item => ({...item, checkedStatus: IndeterminateCheckboxStatus.checked }))
          })
        },
        
        clearAll() {
          setItems(prevItems => {
            return prevItems.map(({ checkedStatus, ...itemWithoutCheckedStatus }) => itemWithoutCheckedStatus)
          })
        },
      };
    }  
  }, [selectItem])
  
  const [initialExpandedItemsNeedUpdate, setInitialExpandedItemsNeedUpdate] =
    React.useState(false);

  const [treeItemRefArray, registerTreeItem] = useDescendants();

  React.useEffect(() => {
    if (initialExpandedItems) {
      setInitialExpandedItemsNeedUpdate(true);
    }
  }, []);

  const contextValue = {
    hasIcons,
    itemToFocus,
    onSelectedItemChange,
    onExpandedChange,
    selectable,
    selectedItems,
    initialExpandedItems,
    treeItemRefArray,
    registerTreeItem,
    initialExpandedItemsNeedUpdate,
    setInitialExpandedItemsNeedUpdate,
    checkChildren,
    checkParents,
    items,
    selectItem,
  };

  return { contextValue };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>;
