import * as React from 'react';
import { IconProps } from 'react-magma-icons';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { TreeItem } from './TreeItem';
import { TreeViewContext } from './TreeViewContext';
import { TreeViewSelectable } from './useTreeView';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { useGenerateId, useForkedRef } from '../../utils';
import {
  // getEnabledTreeItemChildrenLength,
  areArraysEqual,
  arrayIncludesId,
  filterNullEntries,
  filterSelectedItems,
  findChildByItemId,
  findCommonItems,
  getAllChildrenEnabled,
  getAllParentIds,
  getCheckedStatus,
  getChildrenCheckedStatus,
  getChildrenItemIds,
  getChildrenItemIdsFlat,
  getChildrenItemIdsInTree,
  getMissingChildrenIds,
  getUniqueSelectedItemsArray,
  getUpdatedSelectedItems,
  findCommonItems,
  areArraysEqual,
  findChildByItemId,
  getChildrenItemIdsInTree,
  getAllParentIds,
  getChildrenItemIdsFlat,
} from './utils';

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
   * Indeterminate Checkbox status
   * @internal
   */
  parentCheckedStatus?: IndeterminateCheckboxStatus;
  /**
   * @internal
   */
  updateParentCheckStatus?: (
    index: number,
    status: IndeterminateCheckboxStatus,
    isInitialRender?: boolean
  ) => void;
  /**
   * @internal
   */
  parentDepth?: number;
  /**
   * @internal
   */
  itemDepth?: number;
  /**
   * TODO: improve functionality (issue #1305)
   * @internal
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

const enum StatusUpdatedByOptions {
  checkboxChange = 'checkboxChange',
  parent = 'parent',
  children = 'children',
  default = 'default',
}

export const checkedStatusToBoolean = (
  status: IndeterminateCheckboxStatus
): boolean => status === IndeterminateCheckboxStatus.checked;

export function useTreeItem(props: UseTreeItemProps, forwardedRef) {
  const {
    children,
    icon,
    index,
    isDisabled = false,
    itemDepth,
    itemId,
    onClick,
    parentCheckedStatus,
    parentDepth,
    topLevel,
    updateParentCheckStatus,
  } = props;

  const {
    initialExpandedItems,
    registerTreeItem,
    selectable,
    selectedItems,
    setHasIcons,
    setSelectedItems,
    treeItemRefArray,
    preselectedItemsNeedUpdate,
    setPreselectedItemsNeedUpdate,
    initialExpandedItemsNeedUpdate,
    setSelectedItemsChanged,
    selectedItemsChanged,
    checkParents,
    checkChildren,
  } = React.useContext(TreeViewContext);

  // Needs to skip sending an "onSelection" event during the initial render of items
  const [isSkipSelectedItemsUpdate, setIsSkipSelectedItemsUpdate] =
    React.useState(false);

  const [expanded, setExpanded] = React.useState(false);
  const [checkedStatus, setCheckedStatus] =
    React.useState<IndeterminateCheckboxStatus>(
      IndeterminateCheckboxStatus.unchecked
    );
  const [statusUpdatedBy, setStatusUpdatedBy] = React.useState<
    StatusUpdatedByOptions | undefined
  >(undefined);

  const treeItemChildren = React.Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === TreeItem
  );

  // TODO fix for disabled items (issue #1305)
  // const numberOfTreeItemChildren = getEnabledTreeItemChildrenLength(treeItemChildren);
  const numberOfTreeItemChildren = treeItemChildren.length;
  const hasOwnTreeItems = numberOfTreeItemChildren > 0;

  const [childrenCheckedStatus, setChildrenCheckedStatus] = React.useState<
    IndeterminateCheckboxStatus[]
  >(
    Array(numberOfTreeItemChildren).fill(IndeterminateCheckboxStatus.unchecked)
  );

  const ownRef = React.useRef<HTMLDivElement>();
  const ref = useForkedRef(forwardedRef, ownRef);
  const forceUpdate = useForceUpdate();

  const generatedId = useGenerateId();

  React.useEffect(() => {
    setTreeViewIconVisibility();

    selectedItems.map(item => {
      if (item?.itemId === itemId) {
        const newStatus = item?.checkedStatus;

        if (checkedStatus !== newStatus) {
          const childrenOfItemId = getChildrenItemIds(
            treeItemChildren,
            IndeterminateCheckboxStatus.checked
          );

          const itemIdChildrenInTree =
            getChildrenItemIdsInTree(treeItemChildren);
          const parentIds =
            itemId && itemIdChildrenInTree.length > 0
              ? getAllParentIds(itemIdChildrenInTree, itemId)
              : [];

          let additionalItems = [];
          if (newStatus === IndeterminateCheckboxStatus.checked) {
            if (parentIds && checkParents) additionalItems.push(...parentIds);
            if (hasOwnTreeItems && checkChildren)
              additionalItems.push(...childrenOfItemId);
          }

          setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
          setCheckedStatus(item?.checkedStatus);

          if (selectable === TreeViewSelectable.multi) {
            // Pass "true" as isInitialRender value to skip sending an "onSelection" event
            // Required since this useEffect handles initial rendering of the item
            updateParentCheckStatus(index, newStatus, true);
          }
          setSelectedItems(prev => {
            return getUniqueSelectedItemsArray(
              [{ itemId: itemId, checkedStatus: newStatus }],
              prev,
              additionalItems
            );
          });
        }
        return;
      }
    });

    if (!isDisabled && ownRef.current !== null) {
      registerTreeItem(treeItemRefArray, ownRef);
    }

    forceUpdate();
  }, []);

  function setTreeViewIconVisibility() {
    if (treeItemChildren.length === 0 && icon) {
      setHasIcons(true);
      return;
    }

    treeItemChildren.forEach((child: React.ReactElement<any>) => {
      if (child?.props.icon) {
        setHasIcons(true);
        return;
      }
    });
  }

  function updateSelectedItemsChanged() {
    if (topLevel && !selectedItemsChanged) {
      setSelectedItemsChanged(true);
    }
  }

  React.useEffect(() => {
    if (preselectedItemsNeedUpdate) {
      updateInitialSelected();
    }
  }, [preselectedItemsNeedUpdate]);

  React.useEffect(() => {
    if (initialExpandedItemsNeedUpdate) {
      updateInitialExpanded();
    }
  }, [initialExpandedItemsNeedUpdate]);

  React.useEffect(() => {
    if (initialExpandedItemsNeedUpdate) {
      updateInitialExpanded();
    }
  }, [initialExpandedItemsNeedUpdate]);

  const updateCheckedStatusFromChild = (
    index: number,
    status: IndeterminateCheckboxStatus,
    isInitialRender?: boolean
  ) => {
    if (checkParents) {
      // Set isSkipSelectedItemsUpdate as true if this update caused by the initial render of children during expanding
      setIsSkipSelectedItemsUpdate(Boolean(isInitialRender));
      setStatusUpdatedBy(StatusUpdatedByOptions.children);
      setChildrenCheckedStatus(prev => {
        const newChildrenCheckedStatus = [...prev];
        newChildrenCheckedStatus[index] = status;
        return newChildrenCheckedStatus;
      });
    }
  };

  const updateStatusForItem = (
    childrenItemIds,
    preselectedChildrenItems,
    itemId,
    itemIdChildren
  ) => {
    const item = preselectedChildrenItems.find(
      child => child.itemId === itemId
    );

    const itemStatus =
      item?.checkedStatus ||
      areArraysEqual(preselectedChildrenItems, childrenItemIds)
        ? IndeterminateCheckboxStatus.checked
        : IndeterminateCheckboxStatus.indeterminate;

    setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
    setCheckedStatus(itemStatus);
    updateParentCheckStatus(index, itemStatus);

    if (!item) {
      setSelectedItems(prev => {
        return getUniqueSelectedItemsArray(
          [{ itemId: itemId, checkedStatus: itemStatus }],
          preselectedChildrenItems,
          prev
        );
      });

      setSelectedItemsChanged(true);
      return;
    }

    const thisItem = itemIdChildren.find(child => child.itemId === itemId);

    if (
      thisItem?.children.length > 0 &&
      item?.checkedStatus === IndeterminateCheckboxStatus.checked
    ) {
      const itemNode = findChildByItemId(treeItemChildren, thisItem?.itemId);
      const newChildren = getChildrenItemIds(
        itemNode?.props.children,
        checkedStatus
      );

      setSelectedItems(prev => {
        return getUniqueSelectedItemsArray(
          [{ itemId: itemId, checkedStatus: itemStatus }],
          newChildren,
          prev
        );
      });

      setSelectedItemsChanged(true);
    }
  };

  const updateInitialExpanded = () => {
    if (initialExpandedItems?.length !== 0 && !isDisabled) {
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

  const updateInitialExpanded = () => {
    if (initialExpandedItems?.length !== 0 && !isDisabled) {
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

  const updateInitialSelected = () => {
    if (selectable === TreeViewSelectable.single && selectedItems) {
      const firstItemId = selectedItems?.[0]?.itemId;
      if (firstItemId && !isDisabled) {
        setSelectedItems(prev => {
          if (!arrayIncludesId(prev, firstItemId)) {
            return [
              {
                itemId: firstItemId,
                checkedStatus: IndeterminateCheckboxStatus.checked,
              },
            ];
          }
        });
        setSelectedItemsChanged(true);
      }
    } else if (selectable === TreeViewSelectable.multi && selectedItems) {
      const item = selectedItems.find(obj => obj.itemId === itemId);
      const status = item?.checkedStatus;
      const childrenItemIds = getChildrenItemIds(
        treeItemChildren,
        status || IndeterminateCheckboxStatus.checked
      );
      // Items from selectedItems that are children
      const preselectedChildrenItems = findCommonItems(
        childrenItemIds,
        selectedItems
      );

      if (
        !isDisabled &&
        (arrayIncludesId(selectedItems, itemId) ||
          childrenItemIds?.includes(itemId))
      ) {
        setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
        setCheckedStatus(status);
        updateParentCheckStatus(index, status);

        if (
          childrenItemIds.length > 0 &&
          status === IndeterminateCheckboxStatus.checked
        ) {
          const newChildrenCheckedStatus = getChildrenCheckedStatus(
            childrenItemIds,
            checkChildren && status
          );
          setChildrenCheckedStatus(newChildrenCheckedStatus);
        }
        setSelectedItems(prev => {
          const allItems = getUniqueSelectedItemsArray(
            childrenItemIds,
            selectedItems,
            prev
          );
          return allItems;
        });
        updateSelectedItemsChanged();
      } else if (
        !isDisabled &&
        preselectedChildrenItems.length > 0 &&
        checkParents
      ) {
        // Case for selectedItems that are inside a collapsed item
        const itemIdChildren = getChildrenItemIdsInTree(treeItemChildren);
        for (const i of preselectedChildrenItems) {
          const itemIdNode = findChildByItemId(treeItemChildren, i.itemId);
          const childrenOfItemId = getChildrenItemIds(
            itemIdNode?.props?.children,
            IndeterminateCheckboxStatus.checked
          );

          const parentIds = getAllParentIds(itemIdChildren, i.itemId);

          for (const p of parentIds) {
            updateStatusForItem(
              childrenOfItemId,
              preselectedChildrenItems,
              p,
              itemIdChildren
            );
          }
        }
        updateStatusForItem(
          childrenItemIds,
          preselectedChildrenItems,
          itemId,
          itemIdChildren
        );
      }
    }

    setPreselectedItemsNeedUpdate(false);
  };

  React.useEffect(() => {
    if (statusUpdatedBy && updateParentCheckStatus && !topLevel) {
      updateParentCheckStatus(index, checkedStatus);
    }
    setStatusUpdatedBy(undefined);
  }, [checkedStatus]);

  React.useEffect(() => {
    if (
      parentCheckedStatus &&
      checkChildren &&
      checkedStatus !== parentCheckedStatus &&
      parentCheckedStatus !== IndeterminateCheckboxStatus.indeterminate &&
      !topLevel &&
      !isDisabled
    ) {
      setStatusUpdatedBy(StatusUpdatedByOptions.parent);
      setCheckedStatus(parentCheckedStatus);
      if (hasOwnTreeItems) {
        if (getAllChildrenEnabled(treeItemChildren)) {
          setChildrenCheckedStatus(
            Array(numberOfTreeItemChildren).fill(parentCheckedStatus)
          );
        } else {
          const childrenIds = getChildrenItemIds(treeItemChildren);

          const newChildrenCheckedStatus = getChildrenCheckedStatus(
            childrenIds,
            parentCheckedStatus
          );
          setChildrenCheckedStatus(newChildrenCheckedStatus);
        }
      }
    }
  }, [parentCheckedStatus]);

  React.useEffect(() => {
    if (statusUpdatedBy && childrenCheckedStatus?.[0] !== undefined) {
      const statusFromChildren = childrenCheckedStatus.every(
        status => status === childrenCheckedStatus[0]
      )
        ? childrenCheckedStatus[0]
        : IndeterminateCheckboxStatus.indeterminate;
      const updateItemStatus = getUpdatedSelectedItems(
        selectedItems,
        itemId,
        statusFromChildren
      );

      const updateItemStatus = getUpdatedSelectedItems(
        selectedItems,
        itemId,
        statusFromChildren
      );

      if (
        checkedStatus !== statusFromChildren &&
        statusUpdatedBy !== StatusUpdatedByOptions.parent
      ) {
        setStatusUpdatedBy(StatusUpdatedByOptions.children);
        setCheckedStatus(statusFromChildren);

        if (
          statusFromChildren === IndeterminateCheckboxStatus.checked ||
          statusFromChildren === IndeterminateCheckboxStatus.indeterminate
        ) {
          if (itemId && !arrayIncludesId(selectedItems, itemId)) {
            setSelectedItems([
              ...selectedItems,
              { itemId, checkedStatus: statusFromChildren },
            ]);
            updateSelectedItemsChanged();
          } else {
            setSelectedItems(updateItemStatus);
            updateSelectedItemsChanged();
          }
        } else if (
          statusFromChildren === IndeterminateCheckboxStatus.unchecked
        ) {
          setSelectedItems(selectedItems.filter(obj => obj.itemId !== itemId));
          updateSelectedItemsChanged();
        }
      } else if (
        checkedStatus === statusFromChildren &&
        statusUpdatedBy !== StatusUpdatedByOptions.parent &&
        statusFromChildren === IndeterminateCheckboxStatus.indeterminate &&
        expanded
      ) {
        if (!arrayIncludesId(selectedItems, itemId)) {
          setSelectedItems([
            ...selectedItems,
            { itemId, checkedStatus: statusFromChildren },
          ]);
          updateSelectedItemsChanged();
        } else {
          const itemStatus = getCheckedStatus(itemId, selectedItems);

          if (itemStatus === parentCheckedStatus) {
            // Skip updating items if instructed to do so
            if (isSkipSelectedItemsUpdate) return;

            if (!selectedItemsChanged) {
              if (!topLevel && updateParentCheckStatus) {
                setSelectedItemsChanged(true);
              } else {
                updateSelectedItemsChanged();
              }
            }
          } else {
            updateSelectedItemsChanged();
          }
        }
      } else {
        setSelectedItems(updateItemStatus);
        if (!expanded) {
          updateSelectedItemsChanged();
        }
      } else {
        setSelectedItems(updateItemStatus);
      }
    }
  }, [childrenCheckedStatus]);

  const checkboxChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const status = event.target.checked
      ? IndeterminateCheckboxStatus.checked
      : IndeterminateCheckboxStatus.unchecked;
    if (checkedStatus !== status) {
      setCheckedStatus(status);
      setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
      updateParentCheckStatus(index, status);

      if (hasOwnTreeItems && checkChildren) {
        if (getAllChildrenEnabled(treeItemChildren)) {
          setChildrenCheckedStatus(
            Array(numberOfTreeItemChildren).fill(status)
          );
        } else {
          const childrenIds = getChildrenItemIds(treeItemChildren, 'something');

          const newChildrenCheckedStatus = getChildrenCheckedStatus(
            childrenIds,
            status
          );
          setChildrenCheckedStatus(newChildrenCheckedStatus);
        }
      }
    }
    handleClick(event, itemId);
  };

  const singleSelectChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: any
  ): void => {
    if (!arrayIncludesId(selectedItems, itemId)) {
      setSelectedItems([
        { itemId, checkedStatus: IndeterminateCheckboxStatus.checked },
      ]);
      setSelectedItemsChanged(true);
    }
  };

  const multiSelectChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!checkParents) {
      setSelectedItemsChanged(true);
    }
    if (hasOwnTreeItems && checkChildren) {
      const childrenIds = getChildrenItemIds(
        treeItemChildren,
        IndeterminateCheckboxStatus.checked
      );
      if (event.target.checked) {
        updateParentCheckStatus(index, IndeterminateCheckboxStatus.checked);
        if (!arrayIncludesId(selectedItems, itemId)) {
          setSelectedItems([
            ...selectedItems,
            ...childrenIds,
            { itemId, checkedStatus: IndeterminateCheckboxStatus.checked },
          ]);
          updateSelectedItemsChanged();
        } else {
          const missingChildren = getMissingChildrenIds(
            selectedItems,
            childrenIds
          );
          setSelectedItems([...selectedItems, ...missingChildren]);
          updateSelectedItemsChanged();
        }
      } else if (!event.target.checked) {
        const newSelectedItems = filterSelectedItems(
          selectedItems,
          childrenIds,
          { itemId, checkedStatus }
        );

        setSelectedItems(newSelectedItems);
        updateSelectedItemsChanged();
      }
    } else {
      if (event.target.checked) {
        if (!arrayIncludesId(selectedItems, itemId)) {
          setSelectedItems([
            ...selectedItems,
            { itemId, checkedStatus: IndeterminateCheckboxStatus.checked },
          ]);
          updateSelectedItemsChanged();
        }
      } else if (!event.target.checked) {
        setSelectedItems(selectedItems.filter(obj => obj.itemId !== itemId));
        updateSelectedItemsChanged();
      }
    }
  };

  const handleClick = (event, itemId) => {
    if (selectable !== TreeViewSelectable.off) {
      if (selectable === TreeViewSelectable.single) {
        singleSelectChangeHandler(event, itemId);
      } else if (selectable === TreeViewSelectable.multi) {
        multiSelectChangeHandler(event);
      }
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

    (curr?.[0].current as HTMLDivElement).focus();
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
      next.focus();
    } else {
      const nextNext = curr?.[focusIndex + 2]?.current as HTMLDivElement;
      if (nextNext) {
        nextNext.focus();
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
      itemToFocus.focus();
    }
  };

  const focusLast = () => {
    const filteredRefArray = filterNullEntries(treeItemRefArray);
    const arrLength = filteredRefArray['current'].length;

    (
      filteredRefArray['current']?.[arrLength - 1].current as HTMLDivElement
    ).focus();
  };

  const focusSelf = () => {
    const filteredRefArray = filterNullEntries(treeItemRefArray);
    const curr = filteredRefArray['current'];
    focusIndex = getFocusIndex(curr);

    (curr?.[focusIndex].current as HTMLDivElement).focus();
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

  const toggleMultiSelectItems = () => {
    const status = arrayIncludesId(selectedItems, itemId)
      ? IndeterminateCheckboxStatus.unchecked
      : IndeterminateCheckboxStatus.checked;
    setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
    setCheckedStatus(status);
    updateParentCheckStatus(index, status);

    if (hasOwnTreeItems && checkChildren) {
      const childrenIds = getChildrenItemIds(
        treeItemChildren,
        IndeterminateCheckboxStatus.checked
      );
      if (!arrayIncludesId(selectedItems, itemId)) {
        setSelectedItems([
          ...selectedItems,
          ...childrenIds,
          { itemId, checkedStatus: status },
        ]);
      } else {
        const newSelectedItems = filterSelectedItems(
          selectedItems,
          childrenIds,
          { itemId, checkedStatus }
        );
        setSelectedItems(newSelectedItems);
      }
    } else {
      if (!arrayIncludesId(selectedItems, itemId)) {
        setSelectedItems([
          ...selectedItems,
          { itemId, checkedStatus: IndeterminateCheckboxStatus.checked },
        ]);
      } else {
        setSelectedItems(selectedItems.filter(obj => obj.itemId !== itemId));
      }
    }
    updateSelectedItemsChanged();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const filteredRefArray = filterNullEntries(treeItemRefArray);
    const curr = filteredRefArray['current'];
    const arrLength = curr.length;

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
          // In single-select it selects the focused node.
          setSelectedItems([
            { itemId, checkedStatus: IndeterminateCheckboxStatus.checked },
          ]);
          setSelectedItemsChanged(true);
        } else if (selectable === TreeViewSelectable.multi) {
          // In multi-select, it toggles the selection state of the focused node.
          toggleMultiSelectItems();
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
            setSelectedItems([
              { itemId, checkedStatus: IndeterminateCheckboxStatus.checked },
            ]);
            setSelectedItemsChanged(true);
          }
        } else if (selectable === TreeViewSelectable.multi) {
          toggleMultiSelectItems();
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
    numberOfTreeItemChildren,
    parentCheckedStatus,
    parentDepth,
    ref,
    selectedItems,
    setExpanded,
    updateCheckedStatusFromChild,
    treeItemChildren,
  };

  return { contextValue, handleClick, handleKeyDown };
}

export type UseTreeItemReturn = ReturnType<typeof useTreeItem>;
