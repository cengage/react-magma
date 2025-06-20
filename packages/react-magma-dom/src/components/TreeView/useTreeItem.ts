import * as React from 'react';

import { IconProps } from 'react-magma-icons';

import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { TreeItem } from './TreeItem';
import { TreeViewContext } from './TreeViewContext';
import { TreeViewSelectable } from './types';
import { filterNullEntries } from './utils';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { useGenerateId, useForkedRef } from '../../utils';

export interface UseTreeItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Enables additional content within the TreeItem.
   */
  additionalContent?: React.ReactNode;
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
   * Whether this item is a top-level item (no parent)
   */
  topLevel?: boolean;
}

export const checkedStatusToBoolean = (
  status: IndeterminateCheckboxStatus
): boolean => status === IndeterminateCheckboxStatus.checked;

export function useTreeItem(props: UseTreeItemProps, forwardedRef) {
  const { children, itemDepth, itemId, onClick, parentDepth, topLevel } = props;

  const {
    registerTreeItem,
    selectable,
    selectedItems,
    treeItemRefArray,
    items,
    selectItem,
    isTopLevelSelectable,
    expandedSet,
    handleExpandedChange,
  } = React.useContext(TreeViewContext);

  const treeViewItemData = React.useMemo(() => {
    return items.find(item => item.itemId === itemId);
  }, [itemId, items]);

  const isDisabled = treeViewItemData?.isDisabled;

  const checkedStatus = React.useMemo(() => {
    if (
      selectable === TreeViewSelectable.multi &&
      topLevel &&
      !isTopLevelSelectable
    ) {
      return IndeterminateCheckboxStatus.unchecked;
    }

    return (
      treeViewItemData?.checkedStatus ?? IndeterminateCheckboxStatus.unchecked
    );
  }, [
    selectable,
    topLevel,
    isTopLevelSelectable,
    treeViewItemData?.checkedStatus,
  ]);

  const treeItemChildren = React.Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === TreeItem
  );

  const hasOwnTreeItems = React.useMemo(() => {
    return treeViewItemData?.hasOwnTreeItems || treeItemChildren.length > 0;
  }, [treeViewItemData, treeItemChildren.length]);

  const [expanded, setExpanded] = React.useState(() => {
    return expandedSet.has(itemId);
  });

  const ownRef = React.useRef<HTMLDivElement>(null);
  const ref = useForkedRef(forwardedRef, ownRef);
  const forceUpdate = useForceUpdate();

  const generatedId = useGenerateId();

  React.useEffect(() => {
    const isExpanded = expandedSet.has(itemId);
    if (isExpanded !== expanded) {
      setExpanded(isExpanded);
    }
  }, [expandedSet, itemId, expanded]);

  React.useEffect(() => {
    if (!isDisabled && ownRef.current !== null) {
      registerTreeItem(treeItemRefArray, ownRef);
    }

    forceUpdate();
  }, [forceUpdate, isDisabled, registerTreeItem, treeItemRefArray]);

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

    //If TreeViewSelectable.multi and top-level item is not selectable, skip selection logic
    if (
      selectable === TreeViewSelectable.multi &&
      topLevel &&
      !isTopLevelSelectable
    ) {
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

  const expandFocusedNode = (event: React.KeyboardEvent) => {
    if (hasOwnTreeItems) {
      if (expanded) {
        focusNext();
      } else {
        setExpanded(true);

        handleExpandedChange(event, itemId);

        focusSelf();
      }
    }
  };

  const collapseFocusedNode = (event: React.KeyboardEvent) => {
    if (hasOwnTreeItems) {
      if (expanded) {
        setExpanded(false);

        handleExpandedChange(event, itemId);

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
        expandFocusedNode(event);
        break;
      }
      case 'ArrowLeft': {
        // Close open parent nodes
        collapseFocusedNode(event);
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
          if (expanded) {
            collapseFocusedNode(event);
          } else {
            expandFocusedNode(event);
          }
          break;
        }

        // If TreeViewSelectable.multi and top-level & not selectable, only toggle expand (no selection)
        if (
          selectable === TreeViewSelectable.multi &&
          topLevel &&
          !isTopLevelSelectable
        ) {
          if (hasOwnTreeItems) {
            if (expanded) {
              collapseFocusedNode(event);
            } else {
              expandFocusedNode(event);
            }
          }
          break;
        }

        if (selectable === TreeViewSelectable.single) {
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
            checkedStatus: isChecked
              ? IndeterminateCheckboxStatus.unchecked
              : IndeterminateCheckboxStatus.checked,
          });
        }
        break;
      }
      case ' ': {
        // If selectable=off & has children, toggle expanded:
        if (selectable === TreeViewSelectable.off && hasOwnTreeItems) {
          if (expanded) {
            collapseFocusedNode(event);
          } else {
            expandFocusedNode(event);
          }
          break;
        }

        // If TreeViewSelectable.multi and top-level & not selectable, only toggle expand (no selection)
        if (
          selectable === TreeViewSelectable.multi &&
          topLevel &&
          !isTopLevelSelectable
        ) {
          if (hasOwnTreeItems) {
            if (expanded) {
              collapseFocusedNode(event);
            } else {
              expandFocusedNode(event);
            }
          }
          break;
        }

        if (selectable === TreeViewSelectable.single) {
          if (hasOwnTreeItems) {
            if (expanded) {
              collapseFocusedNode(event);
            } else {
              expandFocusedNode(event);
            }
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
