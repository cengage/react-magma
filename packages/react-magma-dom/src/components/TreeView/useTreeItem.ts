import * as React from 'react';

import { IconProps } from 'react-magma-icons';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

import {
  TreeViewContext,
  ExpandInitialOptions,
  TreeViewSelectable,
} from './useTreeView';
import { TreeItem } from './TreeItem';

import { useGenerateId } from '../../utils';
import { useDescendants } from '../../hooks/useDescendants';
import { useForceUpdate } from '../../hooks/useForceUpdate';

// TODO: add descriptions for all props
export interface UseTreeItemProps extends React.HTMLAttributes<HTMLLIElement> {
  index?: number;
  label: React.ReactNode;
  // private
  treeItemIndex?: number;
  testId?: string;
  /**
   * Action that fires when the item is clicked
   */
  onClick?: () => void;
  /**
   * Icon for the tree item
   */
  icon?: React.ReactElement<IconProps>;
  parentCheckedStatus?: IndeterminateCheckboxStatus;

  updateParentCheckStatus?: (
    index: number,
    status: IndeterminateCheckboxStatus
  ) => void;
  // internal
  parentDepth?: number;
  // singleSelectItemId?: string;
  isDisabled?: boolean;

  /**
   * Style properties for the tree item label
   */
  labelStyle?: React.CSSProperties;

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
  } = props;  

  const {
    expandInitial,
    setHasIcons,
    onSelectedItemChange,
    selectable,
    selectedItems,
    setSelectedItems,
    initialExpandedItems,
    initialSelectedItems, 
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

  const numberOfTreeItemChildren = treeItemChildren.length;
  const hasOwnTreeItems = numberOfTreeItemChildren > 0;

  const itemDepth = parentDepth === 0 && topLevel ? 0 : parentDepth + 1;

  const [childrenCheckedStatus, setChildrenCheckedStatus] = React.useState<
    IndeterminateCheckboxStatus[]
  >(
    Array(numberOfTreeItemChildren).fill(IndeterminateCheckboxStatus.unchecked)
  );

  const itemId = useGenerateId();

  React.useEffect(() => {
    setTreeViewIconVisibility();

  }, []);

  React.useEffect(() => {
    if (isDisabled || expandInitial === ExpandInitialOptions.none) {
      setExpanded(false);
    } else if (
      expandInitial === ExpandInitialOptions.list &&
      initialExpandedItems &&
      initialExpandedItems.includes(index)
    ) {
      setExpanded(true);
    } else if (expandInitial === ExpandInitialOptions.all) {
      setExpanded(true);
    }
  }, [expandInitial, initialExpandedItems]);

  React.useEffect(() => {
    // TODO: test
    if (initialSelectedItems?.length > 0) {
      setSelectedItems(initialSelectedItems);
    }

  }, [initialSelectedItems]);

  function setTreeViewIconVisibility() {
    treeItemChildren.forEach((child: React.ReactElement<any>) => {
      if (child?.props.icon) {
        setHasIcons(true);
        return;
      }
    });
  }

  const updateCheckedStatusFromChild = (
    index: number,
    status: IndeterminateCheckboxStatus
  ) => {
    const newChildrenCheckedStatus = [...childrenCheckedStatus];
    newChildrenCheckedStatus[index] = status;
    setStatusUpdatedBy(StatusUpdatedByOptions.children);
    setChildrenCheckedStatus(newChildrenCheckedStatus);
  };

  React.useEffect(() => {
    if (statusUpdatedBy && updateParentCheckStatus) {
      updateParentCheckStatus(index, checkedStatus);
      // updateParentCheckStatus(treeItemIndex, checkedStatus);
    }
    setStatusUpdatedBy(undefined);
  }, [checkedStatus]);

  React.useEffect(() => {
    if (
      parentCheckedStatus &&
      checkedStatus !== parentCheckedStatus &&
      parentCheckedStatus !== IndeterminateCheckboxStatus.indeterminate
    ) {
      setStatusUpdatedBy(StatusUpdatedByOptions.parent);
      setCheckedStatus(parentCheckedStatus);
      if (hasOwnTreeItems) {
        setChildrenCheckedStatus(
          Array(childrenCheckedStatus.length).fill(parentCheckedStatus)
        );
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
      setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
      setCheckedStatus(status);
      if (hasOwnTreeItems) {
        setChildrenCheckedStatus(
          Array(childrenCheckedStatus.length).fill(status)
        );
      }
    }

    handleClick(event);
  };

  const singleSelectChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedItems([event.target.id]);
  };

  const multiSelectChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // TODO: what if the parent gets clicked?
    if (event.target.checked) {
      if (!selectedItems.includes(event)) {
        setSelectedItems([...selectedItems, event.target.id]);
      }
    } else if (!event.target.checked) {
      setSelectedItems(selectedItems.filter(i => i !== event.target.id));
    }
  };

  // TODO
  const ownRef = React.useRef<HTMLDivElement>();
  const forceUpdate = useForceUpdate();
  const [buttonRefArray, registerTreeItem] = useDescendants();

  React.useEffect(() => {
    registerTreeItem(buttonRefArray, ownRef);

    forceUpdate();
  }, []);

  const handleClick = e => {
    // console.log('handleClick')

    if (selectable === TreeViewSelectable.single) {
      singleSelectChangeHandler(e);
    } else if (selectable === TreeViewSelectable.multi) {
      multiSelectChangeHandler(e);
    }

    // TODO
    onSelectedItemChange &&
      typeof onSelectedItemChange === 'function' &&
      onSelectedItemChange();

    onClick && typeof onClick === 'function' && onClick();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {};


  const contextValue = {
    itemId,
    expanded,
    setExpanded,
    checkedStatus,
    checkboxChangeHandler,
    hasOwnTreeItems,
    updateCheckedStatusFromChild,
    itemDepth,
    parentDepth,
    numberOfTreeItemChildren,
    // singleSelectItemId,
    selectedItems,
  };

  return { contextValue, handleClick, handleKeyDown };
}

export type UseTreeItemReturn = ReturnType<typeof useTreeItem>;
