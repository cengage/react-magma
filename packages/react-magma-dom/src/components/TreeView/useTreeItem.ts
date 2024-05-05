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
  // areArraysEqual,
  arrayIncludesId,
  filterSelectedItems,
  // findChildByItemId,
  // findCommonItems,
  getAllChildrenEnabled,
  // getAllParentIds,
  getCheckedStatus,
  getChildrenCheckedStatus,
  getChildrenItemIds,
  getChildrenItemIdsFlat,
  // getChildrenItemIdsInTree,
  getMissingChildrenIds,
  getUniqueSelectedItemsArray,
  getUpdatedSelectedItems,
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
    selectedItemsChanged,
    setHasIcons,
    setSelectedItems,
    setSelectedItemsChanged,
    setUpdatePreselectedItems,
    treeItemRefArray,
    updateInitialExpandedItems,
    updatePreselectedItems,
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

  // TODO fix for disabled items
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

    if (selectable === TreeViewSelectable.multi && selectedItems) {
      updateSelectedItemStatus();
    }

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
    if (updatePreselectedItems) {
      updatedSelectedItems();
    }
  }, [updatePreselectedItems]);

  React.useEffect(() => {
    if (updateInitialExpandedItems) {
      updateInitialExpanded();
    }
  }, [updateInitialExpandedItems]);

  const updateCheckedStatusFromChild = (
    index: number,
    status: IndeterminateCheckboxStatus,
    isInitialRender?: boolean
  ) => {
    // Set isSkipSelectedItemsUpdate as true if this update caused by the initial render of children during expanding
    setIsSkipSelectedItemsUpdate(Boolean(isInitialRender));
    setStatusUpdatedBy(StatusUpdatedByOptions.children);
    setChildrenCheckedStatus(prev => {
      const newChildrenCheckedStatus = [...prev];
      newChildrenCheckedStatus[index] = status;
      return newChildrenCheckedStatus;
    });
  };

  // Function to select all the appropriate children and parent items from selectedItems on initial render
  function updateSelectedItemStatus() {
    selectedItems?.map(item => {
      if (item?.itemId === itemId) {
        const newStatus = item?.checkedStatus;
        if (checkedStatus !== newStatus) {
          setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
          setCheckedStatus(item?.checkedStatus);

          // Pass "true" as isInitialRender value to skip sending an "onSelection" event
          // Required since this gets called on initial rendering of the item
          updateParentCheckStatus(index, newStatus, true);
          setSelectedItems(prev => {
            return getUniqueSelectedItemsArray(
              [{ itemId: itemId, checkedStatus: newStatus }],
              prev,
              []
            );
          });
        }
        return;
      }
    });
  }

  // const updateStatusForItem = (
  //   childrenItemIds,
  //   preselectedChildrenItems,
  //   itemId,
  //   itemIdChildren
  // ) => {
  //   const item = preselectedChildrenItems.find(
  //     child => child.itemId === itemId
  //   );
  //   const parentStatus =
  //     item?.checkedStatus ||
  //     areArraysEqual(preselectedChildrenItems, childrenItemIds)
  //       ? IndeterminateCheckboxStatus.checked
  //       : IndeterminateCheckboxStatus.indeterminate;

  //   setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
  //   setCheckedStatus(parentStatus);
  //   updateParentCheckStatus(index, parentStatus);

  //   if (!item) {
  //     setSelectedItems(prev => {
  //       return getUniqueSelectedItemsArray(
  //         [{ itemId: itemId, checkedStatus: parentStatus }],
  //         preselectedChildrenItems,
  //         prev
  //       );
  //     });

  //     setSelectedItemsChanged(true);
  //     return;
  //   }

  //   const thisItem = itemIdChildren.find(child => child.itemId === itemId);

  //   if (
  //     thisItem?.children.length > 0 &&
  //     item?.checkedStatus === IndeterminateCheckboxStatus.checked
  //   ) {
  //     const itemNode = findChildByItemId(treeItemChildren, thisItem?.itemId);
  //     const newChildren = getChildrenItemIds(
  //       itemNode?.props.children,
  //       checkedStatus
  //     );

  //     setSelectedItems(prev => {
  //       return getUniqueSelectedItemsArray(
  //         [{ itemId: itemId, checkedStatus: parentStatus }],
  //         newChildren,
  //         prev
  //       );
  //     });

  //     setSelectedItemsChanged(true);
  //   }
  // };

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

  const updatedSelectedItems = () => {
    if (selectedItems && updatePreselectedItems) {
      if (selectable === TreeViewSelectable.single) {
        const firstItem = selectedItems?.[0];
        if (!firstItem) {
          setUpdatePreselectedItems(false);
          return;
        }
        const firstItemStatus = firstItem.checkedStatus;
        const newSelectedItems = firstItemStatus === IndeterminateCheckboxStatus.unchecked
          ? []
          : [{
              itemId: firstItem.itemId,
              checkedStatus: IndeterminateCheckboxStatus.checked,
            }];
        setSelectedItems(newSelectedItems);
        setSelectedItemsChanged(true);
        setUpdatePreselectedItems(false);
      } else if (selectable === TreeViewSelectable.multi) {
        let parentStatus = arrayIncludesId(selectedItems, itemId)
          ? checkedStatus
          : IndeterminateCheckboxStatus.unchecked;
        // TODO: when items are !expanded

        if (hasOwnTreeItems) {
          // TODO if it has children, it needs to check the status of them to determine if it needs an update
          // const itemIdChildrenThing = getChildrenItemIdsInTree(treeItemChildren);
          // const childrenOfItemId = getChildrenItemIds(treeItemChildren, IndeterminateCheckboxStatus.checked);
        }

        // TODO: last item doesnt call onselected

        if (checkedStatus !== parentStatus) {
          setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
          setCheckedStatus(parentStatus);
          updateParentCheckStatus(index, parentStatus);

          if (hasOwnTreeItems) {
            const childrenIds = getChildrenItemIds(
              treeItemChildren,
              IndeterminateCheckboxStatus.checked
            );
            const childrenAndParent = [
              ...childrenIds,
              { itemId, checkedStatus },
            ].map(item => item.itemId);

            setSelectedItems(
              selectedItems.filter(
                item => !childrenAndParent.includes(item.itemId)
              )
            );
            updateSelectedItemsChanged();
          }
        }
        setUpdatePreselectedItems(false);
      }
    }
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
            setSelectedItems(prev => [
              ...prev,
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

      if (hasOwnTreeItems) {
        if (getAllChildrenEnabled(treeItemChildren)) {
          setChildrenCheckedStatus(
            Array(numberOfTreeItemChildren).fill(status)
          );
        } else {
          const childrenIds = getChildrenItemIds(treeItemChildren);

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
    if (hasOwnTreeItems) {
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

  const focusIndex = treeItemRefArray?.current?.findIndex(
    ({ current: item }) => {
      if (!item || !ownRef.current) return false;
      return item === ownRef.current;
    }
  );

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
    (treeItemRefArray?.current?.[0].current as HTMLDivElement).focus();
  };

  const focusNext = () => {
    const next = treeItemRefArray?.current?.[focusIndex + 1]
      .current as HTMLDivElement;

    if (next) {
      next.focus();
    } else {
      (
        treeItemRefArray?.current?.[focusIndex + 2].current as HTMLDivElement
      ).focus();
    }
  };

  const focusPrev = () => {
    (
      treeItemRefArray?.current?.[focusIndex - 1].current as HTMLDivElement
    ).focus();
  };

  const focusLast = () => {
    const arrLength = treeItemRefArray.current.length;
    (
      treeItemRefArray?.current?.[arrLength - 1].current as HTMLDivElement
    ).focus();
  };

  const focusSelf = () => {
    (treeItemRefArray?.current?.[focusIndex].current as HTMLDivElement).focus();
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
      setExpanded(false);
      focusSelf();
    }
  };

  const toggleMultiSelectItems = () => {
    const status = arrayIncludesId(selectedItems, itemId)
      ? IndeterminateCheckboxStatus.unchecked
      : IndeterminateCheckboxStatus.checked;
    setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
    setCheckedStatus(status);
    updateParentCheckStatus(index, status);

    if (hasOwnTreeItems) {
      const childrenIds = getChildrenItemIds(treeItemChildren, status);
      if (!arrayIncludesId(selectedItems, itemId)) {
        setSelectedItems([
          ...selectedItems,
          ...childrenIds,
          { itemId, checkedStatus: status },
        ]);
        setSelectedItemsChanged(true);
      } else {
        const newSelectedItems = filterSelectedItems(
          selectedItems,
          childrenIds,
          { itemId, checkedStatus }
        );
        setSelectedItems(newSelectedItems);
        setSelectedItemsChanged(true);
      }
    } else {
      if (!arrayIncludesId(selectedItems, itemId)) {
        setSelectedItems([...selectedItems, { itemId, checkedStatus: status }]);
        setSelectedItemsChanged(true);
      } else {
        setSelectedItems(selectedItems.filter(obj => obj.itemId !== itemId));
        setSelectedItemsChanged(true);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const arrLength = treeItemRefArray.current.length;

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
            // updateSelectedItemsChanged();
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
    treeItemChildren,
    updateCheckedStatusFromChild,
  };

  return { contextValue, handleClick, handleKeyDown };
}

export type UseTreeItemReturn = ReturnType<typeof useTreeItem>;
