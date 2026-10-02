import * as React from 'react';

import { IconProps } from 'react-magma-icons';

import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { TreeItem } from './TreeItem';
import { TreeViewAnnounceContext } from './TreeViewAnnounceContext';
import { TreeViewConfigContext } from './TreeViewConfigContext';
import { TreeViewExpansionContext } from './TreeViewExpansionContext';
import { TreeViewSelectionContext } from './TreeViewSelectionContext';
import { TreeViewSelectable } from './types';
import {
  filterNullEntries,
  formatAnnouncement,
  getStringifiedLabel,
  resolveTreeViewString,
} from './utils';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { I18nContext } from '../../i18n';
import { useGenerateId, useForkedRef } from '../../utils';

export interface UseTreeItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Enables additional content within the TreeItem.
   */
  additionalContent?: React.ReactNode;
  /**
   * Tree item hover color
   * @default transparent
   */
  hoverColor?: string;
  /**
   * Icon for the tree item
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * If true, element is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Index number
   * private
   */
  index?: number;
  /**
   * @internal
   */
  itemDepth?: number;
  /**
   * Item id
   */
  itemId: string;
  /**
   * Item name
   */
  label: React.ReactNode;
  /**
   * Style properties for the tree item label
   */
  labelStyle?: React.CSSProperties;
  /**
   * Action that fires when the item is clicked
   */
  onClick?: () => void;
  /**
   * @internal
   */
  parentDepth?: number;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   * Whether this item is a top-level item (no parent)
   */
  topLevel?: boolean;
  /**
   * Style properties for the tree item
   */
  treeItemStyles?: React.CSSProperties;
  /**
   * @internal
   * Used in virtualization to indicate this item has TreeItem children.
   */
  hasTreeItemChildren?: boolean;
}

export const checkedStatusToBoolean = (
  status: IndeterminateCheckboxStatus
): boolean => status === IndeterminateCheckboxStatus.checked;

export function useTreeItem(props: UseTreeItemProps, forwardedRef) {
  const {
    children,
    itemDepth,
    itemId,
    label,
    onClick,
    parentDepth,
    topLevel,
    hasTreeItemChildren,
  } = props;

  // Consume split contexts for reduced re-render scope
  const { itemsById, selectedItems, selectItem } = React.useContext(
    TreeViewSelectionContext
  );

  const { expandedSet, handleExpandedChange } = React.useContext(
    TreeViewExpansionContext
  );

  const {
    registerTreeItem,
    selectable,
    treeItemRefArray,
    isTopLevelSelectable,
    selectParents = true,
    checkChildren,
  } = React.useContext(TreeViewConfigContext);

  // O(1) lookup via the shared id->item Map; replaces an O(N) items.find()
  // that turned re-render storms into O(N^2).
  const treeViewItemData = React.useMemo(() => {
    return itemsById.get(itemId);
  }, [itemId, itemsById]);

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
    return (
      treeViewItemData?.hasOwnTreeItems ||
      treeItemChildren.length > 0 ||
      hasTreeItemChildren
    );
  }, [treeViewItemData, treeItemChildren.length, hasTreeItemChildren]);

  const expanded = React.useMemo(() => {
    return expandedSet.has(itemId);
  }, [expandedSet, itemId]);

  const ownRef = React.useRef<HTMLDivElement>(null);
  const ref = useForkedRef(forwardedRef, ownRef);
  const forceUpdate = useForceUpdate();

  const i18n = React.useContext(I18nContext);
  const { announce } = React.useContext(TreeViewAnnounceContext);
  const { isMacOS } = useDeviceDetect();

  const stringifiedLabel = React.useMemo(
    () => getStringifiedLabel(label),
    [label]
  );

  const generatedId = useGenerateId();

  React.useEffect(() => {
    if (!isDisabled && ownRef.current !== null) {
      registerTreeItem(treeItemRefArray, ownRef);
    }

    forceUpdate();
  }, [forceUpdate, isDisabled, registerTreeItem, treeItemRefArray]);

  // Announced here rather than from the checkbox, which only sees pointer
  // input: keyboard selection fires no `change` event.
  const announceSelection = React.useCallback(
    (status: IndeterminateCheckboxStatus) => {
      // Disabling an item disables everything under it, so one enabled direct
      // subitem proves the cascade reached something.
      const hasEnabledSubitem = treeItemChildren.some(
        (child: React.ReactElement<{ itemId?: string }>) =>
          !itemsById.get(child.props?.itemId)?.isDisabled
      );
      // Single selection moves one selection and never cascades.
      const cascadedToSubitems =
        selectable === TreeViewSelectable.multi &&
        Boolean(checkChildren) &&
        hasEnabledSubitem;

      // NVDA reads `aria-checked` on the tree item, so repeating the status
      // would be heard twice. Only the cascade goes unreported.
      if (!isMacOS) {
        if (!cascadedToSubitems) {
          return;
        }

        const subitemTemplates = {
          [IndeterminateCheckboxStatus.checked]:
            i18n.indeterminateCheckbox.isCheckedAnnounce,
          [IndeterminateCheckboxStatus.indeterminate]:
            i18n.indeterminateCheckbox.isIndeterminateAnnounce,
          [IndeterminateCheckboxStatus.unchecked]:
            i18n.indeterminateCheckbox.isUncheckedAnnounce,
        };

        announce(
          formatAnnouncement(subitemTemplates[status], stringifiedLabel)
        );

        return;
      }

      const templates = {
        [IndeterminateCheckboxStatus.checked]: resolveTreeViewString(
          i18n,
          cascadedToSubitems ? 'branchSelectedAnnounce' : 'itemSelectedAnnounce'
        ),
        [IndeterminateCheckboxStatus.indeterminate]: resolveTreeViewString(
          i18n,
          'itemPartiallySelectedAnnounce'
        ),
        [IndeterminateCheckboxStatus.unchecked]: resolveTreeViewString(
          i18n,
          cascadedToSubitems
            ? 'branchDeselectedAnnounce'
            : 'itemDeselectedAnnounce'
        ),
      };

      announce(formatAnnouncement(templates[status], stringifiedLabel));
    },
    [
      announce,
      isMacOS,
      stringifiedLabel,
      treeItemChildren,
      itemsById,
      checkChildren,
      selectable,
      i18n,
    ]
  );

  // Counts the selections made on *this* item, so a cascade does not announce
  // every item it touched. A counter, not a flag: the status can repeat.
  const [selectionCount, setSelectionCount] = React.useState(0);
  const announcedSelectionCount = React.useRef(0);

  const requestSelectionAnnounce = React.useCallback(() => {
    setSelectionCount(count => count + 1);
  }, []);

  React.useEffect(() => {
    if (selectionCount === announcedSelectionCount.current) {
      return;
    }

    announcedSelectionCount.current = selectionCount;

    announceSelection(checkedStatus);
  }, [selectionCount, checkedStatus, announceSelection]);

  const handleClick = React.useCallback(
    (
      event: React.SyntheticEvent | React.ChangeEvent,
      clickedItemId: string
    ) => {
      const isChecked = checkedStatus === IndeterminateCheckboxStatus.checked;

      if (selectable === TreeViewSelectable.single && isChecked) {
        return;
      }

      // If TreeViewSelectable.multi and top-level item is not selectable,
      // skip selection logic.
      if (
        selectable === TreeViewSelectable.multi &&
        topLevel &&
        !isTopLevelSelectable
      ) {
        return;
      }

      // If selectParents is false and this is a parent item (has children),
      // skip selection logic and onClick.
      if (
        selectable === TreeViewSelectable.single &&
        !selectParents &&
        hasOwnTreeItems
      ) {
        return;
      }

      if (selectable !== TreeViewSelectable.off) {
        const nextStatus = isChecked
          ? IndeterminateCheckboxStatus.unchecked
          : IndeterminateCheckboxStatus.checked;

        selectItem({
          itemId: clickedItemId,
          checkedStatus: nextStatus,
        });
        requestSelectionAnnounce();
        if (typeof onClick === 'function') {
          onClick();
        }
      }
    },
    [
      checkedStatus,
      selectable,
      topLevel,
      isTopLevelSelectable,
      selectParents,
      hasOwnTreeItems,
      selectItem,
      onClick,
      requestSelectionAnnounce,
    ]
  );

  const checkboxChangeHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      handleClick(event, itemId);
    },
    [handleClick, itemId]
  );

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
    if (!treeItemRefArray?.current) {
      return;
    }

    treeItemRefArray.current = treeItemRefArray.current.filter(
      itemRef => itemRef.current !== null
    );
  }, [treeItemRefArray, expandedSet]);

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
        handleExpandedChange(event, itemId);

        focusSelf();
      }
    }
  };

  const collapseFocusedNode = (event: React.KeyboardEvent) => {
    if (hasOwnTreeItems) {
      if (expanded) {
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
    const focusIndex = getFocusIndex(curr);

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

        // If selectParents is false and this is a parent item, only toggle expand (no selection)
        if (
          selectable === TreeViewSelectable.single &&
          !selectParents &&
          hasOwnTreeItems
        ) {
          if (expanded) {
            collapseFocusedNode(event);
          } else {
            expandFocusedNode(event);
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
          requestSelectionAnnounce();
        } else if (selectable === TreeViewSelectable.multi) {
          // In multi-select, it toggles the selection state of the focused node.
          const nextStatus = isChecked
            ? IndeterminateCheckboxStatus.unchecked
            : IndeterminateCheckboxStatus.checked;

          selectItem({
            itemId,
            checkedStatus: nextStatus,
          });
          requestSelectionAnnounce();
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

        // If selectParents is false and this is a parent item, only toggle expand (no selection)
        if (
          selectable === TreeViewSelectable.single &&
          !selectParents &&
          hasOwnTreeItems
        ) {
          if (expanded) {
            collapseFocusedNode(event);
          } else {
            expandFocusedNode(event);
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
            requestSelectionAnnounce();
          }
        } else if (selectable === TreeViewSelectable.multi) {
          const nextStatus =
            checkedStatus === IndeterminateCheckboxStatus.checked
              ? IndeterminateCheckboxStatus.unchecked
              : IndeterminateCheckboxStatus.checked;

          selectItem({
            itemId,
            checkedStatus: nextStatus,
          });
          requestSelectionAnnounce();
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
    itemDepth: parentDepth === 0 && topLevel ? 0 : itemDepth,
    itemId: itemId || generatedId,
    parentDepth,
    ref,
    selectedItems,
    treeItemChildren,
    isDisabled,
  };

  return { contextValue, handleClick, handleKeyDown };
}
