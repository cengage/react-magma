import * as React from 'react';
import { IconProps } from 'react-magma-icons';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { TreeItem } from './TreeItem';
import { TreeViewContext } from './TreeViewContext';
import { TreeViewSelectable } from './types';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { useGenerateId, useForkedRef } from '../../utils';
import { filterNullEntries, getChildrenItemIdsFlat } from './utils';

export interface UseTreeItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Index number
   * private
   */
  index?: number;
  /**
   * Item name
   */
  label: React.ReactNode;
  /**
   * Item id
   */
  itemId: string;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Action that fires when the item is clicked
   */
  onClick?: () => void;
  /**
   * Icon for the tree item
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * @internal
   */
  parentDepth?: number;
  /**
   * @internal
   */
  itemDepth?: number;
  /**
   * If true, element is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Style properties for the tree item label
   */
  labelStyle?: React.CSSProperties;
  /**
   * @internal
   */
  topLevel?: boolean;
}

export const checkedStatusToBoolean = (
  status: IndeterminateCheckboxStatus
): boolean => status === IndeterminateCheckboxStatus.checked;

export function useTreeItem(props: UseTreeItemProps, forwardedRef) {
  const { children, itemDepth, itemId, onClick, parentDepth, topLevel } = props;

  const {
    initialExpandedItems,
    registerTreeItem,
    selectable,
    selectedItems,
    treeItemRefArray,
    initialExpandedItemsNeedUpdate,
    items,
    selectItem,
    expandedSet,
  } = React.useContext(TreeViewContext);

  const treeViewItemData = React.useMemo(() => {
    return items.find(item => item.itemId === itemId);
  }, [itemId, items]);

  React.useEffect(() => {
    const isExpanded = treeViewItemData?.itemId
      ? expandedSet.has(treeViewItemData.itemId)
      : false;

    setExpanded(isExpanded);
  }, [expandedSet, treeViewItemData]);

  const isDisabled = treeViewItemData?.isDisabled;

  const checkedStatus = React.useMemo(() => {
    return (
      treeViewItemData?.checkedStatus ?? IndeterminateCheckboxStatus.unchecked
    );
  }, [treeViewItemData]);

  const hasOwnTreeItems = React.useMemo(() => {
    return treeViewItemData?.hasOwnTreeItems;
  }, [treeViewItemData]);

  const [expanded, setExpanded] = React.useState(false);

  const treeItemChildren = React.Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === TreeItem
  );

  const ownRef = React.useRef<HTMLDivElement>();
  const ref = useForkedRef(forwardedRef, ownRef);
  const forceUpdate = useForceUpdate();

  const generatedId = useGenerateId();

  React.useEffect(() => {
    if (!isDisabled && ownRef.current !== null) {
      registerTreeItem(treeItemRefArray, ownRef);
    }

    forceUpdate();
  }, []);

  React.useEffect(() => {
    if (initialExpandedItemsNeedUpdate) {
      updateInitialExpanded();
    }
  }, [initialExpandedItemsNeedUpdate]);

  const updateInitialExpanded = () => {
    if (initialExpandedItems?.length !== 0) {
      const childrenItemIds = getChildrenItemIdsFlat(treeItemChildren);
      const allExpanded = [...initialExpandedItems, ...childrenItemIds];
      if (allExpanded?.some(item => item === itemId)) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    } else {
      setExpanded(false);
    }
  };

  const checkboxChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleClick(event, itemId);
  };

  const handleClick = (event, itemId) => {
    const isChecked = checkedStatus === IndeterminateCheckboxStatus.checked;

    if (selectable === TreeViewSelectable.single && isChecked) {
      return;
    }

    if (selectable !== TreeViewSelectable.off) {
      selectItem({
        itemId,
        checkedStatus: isChecked
          ? IndeterminateCheckboxStatus.unchecked
          : IndeterminateCheckboxStatus.checked,
      });
      onClick && typeof onClick === 'function' && onClick();
    }
  };

  function getFocusIndex(filteredArrayCurrent) {
    return (
      itemId &&
      filteredArrayCurrent?.findIndex(({ current: item }) => {
        if (!item || !ownRef.current) return false;
        return item === ownRef.current;
      })
    );
  }

  let focusIndex = getFocusIndex(treeItemRefArray?.current);

  React.useEffect(() => {
    treeItemRefArray?.current.map(itemRef => {
      if (!itemRef.current) {
        treeItemRefArray.current = treeItemRefArray.current.filter(
          item => itemRef.current !== item.current
        );
      }
    });
  }, [treeItemRefArray]);

  const focusFirst = () => {
    const filteredRefArray = filterNullEntries(treeItemRefArray);
    const curr = filteredRefArray['current'];

    (curr?.[0].current as HTMLDivElement)
      .closest<HTMLElement>('[role=treeitem]')
      .focus();
  };

  const focusNext = () => {
    const filteredRefArray = filterNullEntries(treeItemRefArray);
    const curr = filteredRefArray['current'];
    const arrLength = curr.length;
    focusIndex = getFocusIndex(curr);

    let newIndex = focusIndex + 1;
    let next = curr?.[newIndex]?.current as HTMLDivElement;

    while (!next && newIndex < arrLength) {
      newIndex++;
      next = curr?.[newIndex]?.current as HTMLDivElement;
    }

    if (next) {
      next.closest<HTMLElement>('[role=treeitem]').focus();
    } else {
      const nextNext = curr?.[focusIndex + 2]?.current as HTMLDivElement;
      if (nextNext) {
        nextNext.closest<HTMLElement>('[role=treeitem]').focus();
      } else {
        focusFirst();
      }
    }
  };

  const focusPrev = () => {
    const filteredRefArray = filterNullEntries(treeItemRefArray);
    const curr = filteredRefArray['current'];

    focusIndex = getFocusIndex(curr);

    let newIndex = focusIndex - 1;
    let itemToFocus = curr?.[newIndex]?.current as HTMLDivElement;

    while (!itemToFocus && newIndex >= 0) {
      newIndex--;
      itemToFocus = curr?.[newIndex]?.current as HTMLDivElement;
    }

    if (itemToFocus) {
      itemToFocus.closest<HTMLElement>('[role=treeitem]').focus();
    }
  };

  const focusLast = () => {
    const filteredRefArray = filterNullEntries(treeItemRefArray);
    const arrLength = filteredRefArray['current'].length;

    (filteredRefArray['current']?.[arrLength - 1].current as HTMLDivElement)
      .closest<HTMLElement>('[role=treeitem]')
      .focus();
  };

  const focusSelf = () => {
    const filteredRefArray = filterNullEntries(treeItemRefArray);
    const curr = filteredRefArray['current'];
    focusIndex = getFocusIndex(curr);

    (curr?.[focusIndex].current as HTMLDivElement)
      .closest<HTMLElement>('[role=treeitem]')
      .focus();
  };

  const expandFocusedNode = () => {
    if (hasOwnTreeItems) {
      if (expanded) {
        focusNext();
      } else {
        setExpanded(true);
        focusSelf();
      }
    }
  };

  const collapseFocusedNode = () => {
    if (hasOwnTreeItems) {
      if (expanded) {
        setExpanded(false);
        focusSelf();
      } else {
        focusPrev();
      }
    } else {
      focusPrev();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const filteredRefArray = filterNullEntries(treeItemRefArray);
    const curr = filteredRefArray['current'];
    const arrLength = curr.length;

    if (
      [
        'ArrowDown',
        'ArrowUp',
        'ArrowRight',
        'ArrowLeft',
        'Home',
        'End',
        'Enter',
        ' ',
      ].includes(event.key)
    ) {
      event.preventDefault();
      event.stopPropagation();
    }

    const isChecked = checkedStatus === IndeterminateCheckboxStatus.checked;

    switch (event.key) {
      case 'ArrowDown': {
        // Move to the next item, or wrap to first
        focusIndex === arrLength - 1 ? focusFirst() : focusNext();
        break;
      }
      case 'ArrowUp': {
        // Move to the previous item, or wrap to last
        focusIndex === 0 ? focusLast() : focusPrev();
        break;
      }
      case 'ArrowRight': {
        // Open parent nodes
        expandFocusedNode();
        break;
      }
      case 'ArrowLeft': {
        // Close open parent nodes
        collapseFocusedNode();
        break;
      }
      case 'Home': {
        // Moves focus to the first node in the tree without opening or closing a node.
        focusFirst();
        break;
      }
      case 'End': {
        // Moves focus to the last node in the tree that is focusable without opening a node.
        focusLast();
        break;
      }
      case 'Enter': {
        // Activates a node, i.e., performs its default action.
        if (selectable === TreeViewSelectable.off && hasOwnTreeItems) {
          setExpanded(!expanded);
        } else if (selectable === TreeViewSelectable.single) {
          if (isChecked) {
            return;
          }
          // In single-select it selects the focused node.
          selectItem({
            itemId,
            checkedStatus: IndeterminateCheckboxStatus.checked,
          });
        } else if (selectable === TreeViewSelectable.multi) {
          // In multi-select, it toggles the selection state of the focused node.
          selectItem({
            itemId,
            checkedStatus:
              checkedStatus === IndeterminateCheckboxStatus.checked
                ? IndeterminateCheckboxStatus.unchecked
                : IndeterminateCheckboxStatus.checked,
          });
        }
        break;
      }
      case ' ': {
        // Toggles the selection state of the focused node.
        if (selectable === TreeViewSelectable.off && hasOwnTreeItems) {
          setExpanded(!expanded);
        } else if (selectable === TreeViewSelectable.single) {
          if (hasOwnTreeItems) {
            setExpanded(!expanded);
          } else {
            if (isChecked) {
              return;
            }
            selectItem({
              itemId,
              checkedStatus: IndeterminateCheckboxStatus.checked,
            });
          }
        } else if (selectable === TreeViewSelectable.multi) {
          selectItem({
            itemId,
            checkedStatus:
              checkedStatus === IndeterminateCheckboxStatus.checked
                ? IndeterminateCheckboxStatus.unchecked
                : IndeterminateCheckboxStatus.checked,
          });
        }
        break;
      }
      default:
        return;
    }
  };

  const contextValue = {
    checkboxChangeHandler,
    checkedStatus,
    expanded,
    hasOwnTreeItems,
    itemDepth: parentDepth === 0 && topLevel ? 0 : itemDepth + 1,
    itemId: itemId || generatedId,
    parentDepth,
    ref,
    selectedItems,
    setExpanded,
    treeItemChildren,
    isDisabled,
  };

  return { contextValue, handleClick, handleKeyDown };
}
