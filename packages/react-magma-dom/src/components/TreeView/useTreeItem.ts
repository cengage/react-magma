import * as React from 'react';
import { IconProps } from 'react-magma-icons';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { TreeViewSelectable } from './useTreeView';
import { TreeItem } from './TreeItem';
import { TreeViewContext } from './TreeViewContext';
import { useGenerateId, useForkedRef } from '../../utils';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import {
  getChildrenItemIds,
  getAllChildrenEnabled,
  filterSelectedItems,
  getMissingChildrenIds,
  getChildrenCheckedStatus,
  // getEnabledTreeItemChildrenLength,
  getUniqueSelectedItemsArray,
  selectedItemsIncludesId,
  getUpdatedSelectedItems,
  findCommonItems,
  areArraysEqual,
  findChildByItemId,
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
    status: IndeterminateCheckboxStatus
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
  updateParentItemId?: (itemId: string) => void;
  parentItemId?: string;
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
    parentItemId,
  } = props;

  const {
    initialExpandedItems,
    initialSelectedItems,
    registerTreeItem,
    selectable,
    selectedItems,
    setHasIcons,
    setSelectedItems,
    treeItemRefArray,
  } = React.useContext(TreeViewContext);

  const [expanded, setExpanded] = React.useState(isDisabled);
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

  const [parentId, setParentId] = React.useState(null);

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
    updateParentItemId(itemId);

    selectedItems.map(item => {
      if (item?.itemId === itemId) {
        const newStatus = item?.checkedStatus;
        if (checkedStatus !== newStatus) {
          setCheckedStatus(item?.checkedStatus);
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

  React.useEffect(() => {
    if (isDisabled || initialExpandedItems?.length === 0) {
      setExpanded(false);
    } else if (initialExpandedItems?.includes(itemId)) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [initialExpandedItems]);

  React.useEffect(() => {
    if (selectable === TreeViewSelectable.single && initialSelectedItems) {
      if (initialSelectedItems?.[0]?.itemId === itemId && !isDisabled) {
        setSelectedItems([
          { itemId, checkedStatus: initialSelectedItems?.[0].checkedStatus },
        ]);
      }
    } else if (
      selectable === TreeViewSelectable.multi &&
      initialSelectedItems
    ) {
      const item = initialSelectedItems.find(obj => obj.itemId === itemId);
      const status = item?.checkedStatus;

      const childrenItemIds = getChildrenItemIds(children);
      // Items from initialSelectedItems that are children
      const initialSelectedChildrenItems = findCommonItems(
        initialSelectedItems,
        childrenItemIds
      );

      if (
        !isDisabled &&
        (selectedItemsIncludesId(initialSelectedItems, itemId) ||
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
            status
          );
          setChildrenCheckedStatus(newChildrenCheckedStatus);
        }
        setSelectedItems(prev => {
          const allItems = getUniqueSelectedItemsArray(
            prev,
            initialSelectedItems,
            childrenItemIds
          );
          return allItems;
        });
      } else if (!isDisabled && initialSelectedChildrenItems.length > 0) {
        // Case for initialSelectedItems that are inside a collapsed item

        for (const i of initialSelectedChildrenItems) {
          const itemIdNode = findChildByItemId(children, i.itemId);
          const childrenOfItemId = getChildrenItemIds(
            itemIdNode?.props?.children
          );

          if (itemIdNode?.props?.children) {
            updateStatusForItem(
              childrenOfItemId,
              initialSelectedChildrenItems,
              i.itemId
            );
          }
        }

        updateStatusForItem(
          childrenItemIds,
          initialSelectedChildrenItems,
          itemId
        );
      }
    }
  }, [initialSelectedItems]);

  const updateCheckedStatusFromChild = (
    index: number,
    status: IndeterminateCheckboxStatus
  ) => {
    setStatusUpdatedBy(StatusUpdatedByOptions.children);
    setChildrenCheckedStatus(prev => {
      const newChildrenCheckedStatus = [...prev];
      newChildrenCheckedStatus[index] = status;
      return newChildrenCheckedStatus;
    });
  };

  const updateParentItemId = itemId => {
    if (hasOwnTreeItems) {
      setParentId(itemId);
    }
  };

  const updateStatusForItem = (
    childrenItemIds,
    initialSelectedChildrenItems,
    itemId
  ) => {
    const parentStatus = areArraysEqual(
      childrenItemIds,
      initialSelectedChildrenItems
    )
      ? IndeterminateCheckboxStatus.checked
      : IndeterminateCheckboxStatus.indeterminate;

    setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
    setCheckedStatus(parentStatus);
    updateParentCheckStatus(index, parentStatus);
    setSelectedItems(prev => {
      return getUniqueSelectedItemsArray(prev, initialSelectedChildrenItems, [
        { itemId: itemId, checkedStatus: parentStatus },
      ]);
    });
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
        // setSelectedItems(updateItemStatus);

        if (
          statusFromChildren === IndeterminateCheckboxStatus.checked ||
          statusFromChildren === IndeterminateCheckboxStatus.indeterminate
        ) {
          if (itemId && !selectedItemsIncludesId(selectedItems, itemId)) {
            setSelectedItems([
              ...selectedItems,
              { itemId, checkedStatus: statusFromChildren },
            ]);
          }
        } else if (
          statusFromChildren === IndeterminateCheckboxStatus.unchecked
        ) {
          setSelectedItems(selectedItems.filter(obj => obj.itemId !== itemId));
        }
      } else if (
        checkedStatus === statusFromChildren &&
        statusUpdatedBy !== StatusUpdatedByOptions.parent &&
        statusFromChildren === IndeterminateCheckboxStatus.indeterminate
      ) {
        if (!selectedItemsIncludesId(selectedItems, itemId)) {
          setSelectedItems([
            ...selectedItems,
            { itemId, checkedStatus: statusFromChildren },
          ]);
        } else {
          setSelectedItems([...selectedItems]);
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
    if (!selectedItemsIncludesId(selectedItems, itemId)) {
      setSelectedItems([
        { itemId, checkedStatus: IndeterminateCheckboxStatus.checked },
      ]);
    }
  };

  const multiSelectChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (hasOwnTreeItems) {
      const childrenIds = getChildrenItemIds(treeItemChildren);
      if (event.target.checked) {
        updateParentCheckStatus(index, IndeterminateCheckboxStatus.checked);

        if (!selectedItemsIncludesId(selectedItems, itemId)) {
          setSelectedItems([
            ...selectedItems,
            ...childrenIds,
            { itemId, checkedStatus },
          ]);
        } else {
          const missingChildren = getMissingChildrenIds(
            selectedItems,
            childrenIds
          );
          setSelectedItems([...selectedItems, ...missingChildren]);
        }
      } else if (!event.target.checked) {
        const newSelectedItems = filterSelectedItems(
          selectedItems,
          childrenIds,
          { itemId, checkedStatus }
        );

        setSelectedItems(newSelectedItems);
      }
    } else {
      if (event.target.checked) {
        if (!selectedItemsIncludesId(selectedItems, itemId)) {
          setSelectedItems([
            ...selectedItems,
            { itemId, checkedStatus: IndeterminateCheckboxStatus.checked },
          ]);
        }
      } else if (!event.target.checked) {
        setSelectedItems(selectedItems.filter(obj => obj.itemId !== itemId));
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
    const status = selectedItemsIncludesId(selectedItems, itemId)
      ? IndeterminateCheckboxStatus.unchecked
      : IndeterminateCheckboxStatus.checked;
    setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
    setCheckedStatus(status);
    updateParentCheckStatus(index, status);

    if (hasOwnTreeItems) {
      const childrenIds = getChildrenItemIds(treeItemChildren);
      if (!selectedItemsIncludesId(selectedItems, itemId)) {
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
      if (!selectedItemsIncludesId(selectedItems, itemId)) {
        setSelectedItems([...selectedItems, { itemId, checkedStatus: status }]);
      } else {
        setSelectedItems(selectedItems.filter(obj => obj.itemId !== itemId));
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
    parentItemId: parentId,
    updateParentItemId,
    ref,
    selectedItems,
    setExpanded,
    updateCheckedStatusFromChild,
    treeItemChildren,
  };

  return { contextValue, handleClick, handleKeyDown };
}

export type UseTreeItemReturn = ReturnType<typeof useTreeItem>;
