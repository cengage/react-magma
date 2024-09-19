import * as React from 'react';
import { useDescendants } from '../../hooks/useDescendants';
import { TreeItemSelectedInterface, TreeViewItemInterface } from './TreeViewContext';
import {
  findFirstBranchNode,
  getChildrenItemIdsInTree,
  getFirstItemInTree, getInitialItems, selectMulti, selectSingle,
} from './utils';
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
   * Available the next actions:
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
    initialExpandedItems,
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
  }, [selectable])

  React.useEffect(() => {
    if (apiRef) {
      apiRef.current = {
        selectItem,
        selectAll() {
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
  const [itemToFocus, setItemToFocus] = React.useState(null);

  const [treeItemRefArray, registerTreeItem] = useDescendants();

  React.useEffect(() => {
    if (initialExpandedItems) {
      setInitialExpandedItemsNeedUpdate(true);
    }

    getItemToFocusFirst();
  }, []);

  function getItemToFocusFirst() {
    let item = null;

    if (children?.length > 0) {
      const allChildrenInTree = getChildrenItemIdsInTree(children);
      const firstBranchNode = findFirstBranchNode(children)?.props.itemId;
      const firstItemSelected = getFirstItemInTree(selectedItems, children);
      const firstNode = allChildrenInTree?.[0].itemId;

      if (selectable === TreeViewSelectable.off) {
        /*
        If there is at least one node with a branch, focus is set on the first branch node.
        If there are no nodes with branches, the first item is focused and the tree can be traversed
      */
        item = firstBranchNode || allChildrenInTree?.[0].itemId;
      } else {
        // Same behavior for Single and Multiple
        if (selectedItems.length === 0) {
          // If none of the nodes are selected before the tree receives focus, focus is set on the first node.
          item = firstNode;
        } else if (selectedItems.length > 0) {
          // If one or more nodes are selected before the tree receives focus, focus is set on the first selected node.
          item = firstItemSelected;
        }
      }
    }
    setItemToFocus(item);
  }

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
