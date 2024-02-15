import * as React from 'react';
import { IconProps } from 'react-magma-icons';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { TreeViewContext, TreeViewSelectable } from './useTreeView';
import { TreeItem } from './TreeItem';

import { useGenerateId, useForkedRef } from '../../utils';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import {
  getChildrenItemIds,
  getAllChildrenEnabled,
  filterSelectedItems,
  getMissingChildrenIds,
  getChildrenCheckedStatus,
  getEnabledTreeItemChildrenLength,
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

  // private
  treeItemIndex?: number;

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

interface TreeItemContextInterface {
  itemId?: string;
  /**
   * Default expanded state
   * @default: false
   */
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  checkedStatus: IndeterminateCheckboxStatus;
  checkboxChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numberOfTreeItemChildren: number;
  hasOwnTreeItems: boolean;
  updateCheckedStatusFromChild: (
    index: number,
    status: IndeterminateCheckboxStatus
  ) => void;
  parentDepth: number;
}

export const TreeItemContext = React.createContext<TreeItemContextInterface>({
  expanded: false,
  setExpanded: () => {},
  checkedStatus: IndeterminateCheckboxStatus.unchecked,
  checkboxChangeHandler: () => {},
  hasOwnTreeItems: false,
  updateCheckedStatusFromChild: () => {},
  numberOfTreeItemChildren: 0,
  parentDepth: 0,
});

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
    parentDepth,
    index,
    parentCheckedStatus,
    updateParentCheckStatus,
    onClick,
    isDisabled = false,
    topLevel,
    itemId,
  } = props;

  const {
    setHasIcons,
    onSelectedItemChange,
    selectable,
    selectedItems,
    setSelectedItems,
    initialExpandedItems,
    initialSelectedItems,
    treeItemRefArray,
    registerTreeItem,
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
  const numberOfTreeItemChildren =
    getEnabledTreeItemChildrenLength(treeItemChildren);
  const hasOwnTreeItems = numberOfTreeItemChildren > 0;

  const itemDepth = parentDepth === 0 && topLevel ? 0 : parentDepth + 1;

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

    if (!isDisabled && ownRef.current !== null) {
      registerTreeItem(treeItemRefArray, ownRef);
    }

    forceUpdate();
  }, []);

  function setTreeViewIconVisibility() {
    treeItemChildren.forEach((child: React.ReactElement<any>) => {
      if (child?.props.icon) {
        setHasIcons(true);
        return;
      }
    });
  }

  React.useEffect(() => {
    // TODO: something weird when using both initialSelectedItems & initialExpandedItems
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
      if (initialSelectedItems?.[0]?.includes(itemId) && !isDisabled) {
        setSelectedItems([itemId]);
      }
    } else if (
      selectable === TreeViewSelectable.multi &&
      initialSelectedItems
    ) {
      const childrenItemIds = getChildrenItemIds(treeItemChildren);

      if (
        !isDisabled &&
        (initialSelectedItems?.includes(itemId) ||
          childrenItemIds?.includes(itemId))
      ) {
        const status = IndeterminateCheckboxStatus.checked;
        setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
        setCheckedStatus(status);
        updateParentCheckStatus(index, IndeterminateCheckboxStatus.checked);

        const newChildrenCheckedStatus = getChildrenCheckedStatus(
          childrenItemIds,
          status
        );
        setSelectedItems([...initialSelectedItems, ...childrenItemIds]);
        setChildrenCheckedStatus(newChildrenCheckedStatus);
      }
    }
  }, [initialSelectedItems]);

  React.useEffect(() => {
    // console.log(itemId, 'selectedItems', selectedItems);
    if (selectable !== TreeViewSelectable.off) {
      onSelectedItemChange &&
        typeof onSelectedItemChange === 'function' &&
        onSelectedItemChange(selectedItems);
    }
  }, [selectedItems]);

  const updateCheckedStatusFromChild = (
    index: number,
    status: IndeterminateCheckboxStatus
  ) => {
    // TODO: there's an issue when an item is disabled, somehow childrenCheckedStatus.length is not the same as numberOfTreeItemChildren so things get messed up

    const newChildrenCheckedStatus = [...childrenCheckedStatus];
    newChildrenCheckedStatus[index] = status;
    setStatusUpdatedBy(StatusUpdatedByOptions.children);

    setChildrenCheckedStatus(newChildrenCheckedStatus);
  };

  React.useEffect(() => {
    if (statusUpdatedBy && updateParentCheckStatus) {
      updateParentCheckStatus(index, checkedStatus);
    }
    setStatusUpdatedBy(undefined);
  }, [checkedStatus]);

  React.useEffect(() => {
    // TODO: there's a bug where when selecting index 0, all the items look selected. has something to do with statusUpdatedBy getting set initially
    if (
      parentCheckedStatus &&
      checkedStatus !== parentCheckedStatus &&
      parentCheckedStatus !== IndeterminateCheckboxStatus.indeterminate
    ) {
      setStatusUpdatedBy(StatusUpdatedByOptions.parent);
      setCheckedStatus(isDisabled ? null : parentCheckedStatus);

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
    if (statusUpdatedBy) {
      const statusFromChildren = childrenCheckedStatus.every(
        status => status === childrenCheckedStatus[0]
      )
        ? childrenCheckedStatus[0]
        : IndeterminateCheckboxStatus.indeterminate;

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
          if (itemId && !selectedItems?.includes(itemId)) {
            setSelectedItems([...selectedItems, itemId]);
          }
        } else if (
          statusFromChildren === IndeterminateCheckboxStatus.unchecked
        ) {
          setSelectedItems(selectedItems.filter(i => i !== itemId));
        }
      } else if (
        checkedStatus === statusFromChildren &&
        statusUpdatedBy !== StatusUpdatedByOptions.parent &&
        statusFromChildren === IndeterminateCheckboxStatus.indeterminate
      ) {
        if (!selectedItems?.includes(itemId)) {
          setSelectedItems([...selectedItems, itemId]);
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
    if (!selectedItems?.includes(itemId)) {
      setSelectedItems([itemId]);
    }
  };

  const multiSelectChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (hasOwnTreeItems) {
      const childrenIds = getChildrenItemIds(treeItemChildren);
      if (event.target.checked) {
        updateParentCheckStatus(index, IndeterminateCheckboxStatus.checked);

        if (!selectedItems?.includes(itemId)) {
          setSelectedItems([...selectedItems, ...childrenIds, itemId]);
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
          itemId
        );
        setSelectedItems(newSelectedItems);
      }
    } else {
      if (event.target.checked) {
        if (!selectedItems?.includes(itemId)) {
          setSelectedItems([...selectedItems, itemId]);
        }
      } else if (!event.target.checked) {
        setSelectedItems(selectedItems.filter(i => i !== itemId));
      }
    }
  };

  const handleClick = (event, itemId) => {
    if (selectable !== TreeViewSelectable.off) {
      if (selectable === TreeViewSelectable.single) {
        singleSelectChangeHandler(event, itemId);

        onClick && typeof onClick === 'function' && onClick();
      } else if (selectable === TreeViewSelectable.multi) {
        multiSelectChangeHandler(event);
      }
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
    (
      treeItemRefArray?.current?.[focusIndex + 1].current as HTMLDivElement
    ).focus();
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
    if (
      selectable === TreeViewSelectable.single ||
      selectable === TreeViewSelectable.multi
    ) {
      if (hasOwnTreeItems) {
        if (expanded) {
          focusNext();
        } else {
          setExpanded(true);
          focusSelf();
        }
        // TODO: this affects the parent too
      }
    }
  };

  const collapseFocusedNode = () => {
    if (
      selectable === TreeViewSelectable.single ||
      selectable === TreeViewSelectable.multi
    ) {
      if (hasOwnTreeItems) {
        setExpanded(false);
        focusSelf();
        // TODO: this affects the parent too
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const arrLength = treeItemRefArray.current.length;
    // console.log(focusIndex, event);

    switch (event.key) {
      case 'ArrowDown': {
        console.log('down', focusIndex, index);
        focusIndex === arrLength - 1 ? focusFirst() : focusNext();
        break;
      }
      case 'ArrowUp': {
        console.log('up', focusIndex, index);
        focusIndex === 0 ? focusLast() : focusPrev();
        break;
      }
      case 'ArrowRight': {
        // TODO open parent nodes
        console.log('right');
        expandFocusedNode();
        break;
      }
      case 'ArrowLeft': {
        // TODO close open parent nodes
        console.log('left');
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
        // In multi-select, it toggles the selection state of the focused node.
        // In single-select it selects the focused node.
        // TODO
        break;
      }
      case ' ': {
        console.log('space pressed');
        // Toggles the selection state of the focused node.

        // if (selectable === TreeViewSelectable.off && hasOwnTreeItems) {
        //   setExpanded(!expanded);
        //   // TODO: this collapses the parent
        // } else if (selectable === TreeViewSelectable.single) {
        //   if (hasOwnTreeItems) {
        //     setExpanded(!expanded);
        //     // TODO: this collapses the parent
        //   } else {
        //     setSelectedItems([itemId]);
        //   }
        // } else if (selectable === TreeViewSelectable.multi) {
        //   setSelectedItems([...selectedItems, itemId]);
        // }
        break;
      }
      default:
        return;
    }

    event.preventDefault();
  };

  const contextValue = {
    itemId: itemId || generatedId,
    expanded,
    setExpanded,
    checkedStatus,
    checkboxChangeHandler,
    hasOwnTreeItems,
    updateCheckedStatusFromChild,
    itemDepth,
    parentDepth,
    numberOfTreeItemChildren,
    selectedItems,
    parentCheckedStatus,
    ref,
  };

  return { contextValue, handleClick, handleKeyDown };
}

export type UseTreeItemReturn = ReturnType<typeof useTreeItem>;
