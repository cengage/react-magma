import * as React from 'react';

import { IconProps } from 'react-magma-icons';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

import { TreeViewContext, ExpandInitialOptions } from './useTreeView';
import { TreeItem } from './TreeItem';

import { useGenerateId } from '../../utils';

// TODO: add descriptions for all props
export interface UseTreeItemProps extends React.HTMLAttributes<HTMLLIElement> {
  index?: number;
  label: React.ReactNode;
  treeItemIndex?: number;
  // itemDepth?: number;
  parentDepth?: number;
  testId?: string;
  /**
   * Icon for the tree item
   */
  icon?: React.ReactElement<IconProps>;
  parentCheckedStatus?: IndeterminateCheckboxStatus;
  updateParentCheckStatus?: (
    index: number,
    status: IndeterminateCheckboxStatus
  ) => void;
  singleSelectItemId?: string;
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
  numberOfDirectChildren: number;
  hasOwnTreeItems: boolean;
  updateCheckedStatusFromChild: (
    index: number,
    status: IndeterminateCheckboxStatus
  ) => void;
  itemDepth: number;
  // parentDepth: number;
}

export const TreeItemContext = React.createContext<TreeItemContextInterface>({
  expanded: false,
  setExpanded: () => {},
  checkedStatus: IndeterminateCheckboxStatus.unchecked,
  checkboxChangeHandler: () => {},
  hasOwnTreeItems: false,
  updateCheckedStatusFromChild: () => {},
  itemDepth: 0,
  numberOfDirectChildren: 0,
});

const enum StatusUpdatedByOptions {
  checkboxChange = 'checkboxChange',
  parent = 'parent',
  children = 'children',
}

export const checkedStatusToBoolean = (
  status: IndeterminateCheckboxStatus
): boolean => status === IndeterminateCheckboxStatus.checked;

export function useTreeItem(props: UseTreeItemProps) {
  const {
    children,
    treeItemIndex,
    icon,
    parentCheckedStatus,
    updateParentCheckStatus,
    // itemDepth,
    parentDepth,
  } = props;

  const { expandInitial, hasIcons, setHasIcons } =
    React.useContext(TreeViewContext);

  // TODO: ExpandInitialOptions.none does not work
  const [expanded, setExpanded] = React.useState(
    expandInitial === ExpandInitialOptions.all
  );
  const [checkedStatus, setCheckedStatus] =
    React.useState<IndeterminateCheckboxStatus>(
      IndeterminateCheckboxStatus.unchecked
    );
  const [statusUpdatedBy, setStatusUpdatedBy] = React.useState<
    StatusUpdatedByOptions | undefined
  >(undefined);

  const numberOfTreeItemChildren = React.Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === TreeItem
  ).length;
  
  const hasOwnTreeItems = numberOfTreeItemChildren > 0;
  
  const numberOfDirectChildren = React.Children.toArray(children).length;
  
  // TODO: prob needs tweaks
  const itemDepth = typeof parentDepth === 'number' ? parentDepth : 1;
    
  const [childrenCheckedStatus, setChildrenCheckedStatus] = React.useState<
    IndeterminateCheckboxStatus[]
  >(
    Array(numberOfTreeItemChildren).fill(IndeterminateCheckboxStatus.unchecked)
  );

  const itemId = useGenerateId();

  React.useLayoutEffect(() => {
    if (!hasIcons && icon) {
      setHasIcons(true);
    }
  }, []);

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
      updateParentCheckStatus(treeItemIndex, checkedStatus);
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
  };

  // TODO
  const singleSelectItemId = '';

  const contextValue = {
    itemId,
    expanded,
    setExpanded,
    checkedStatus,
    checkboxChangeHandler,
    hasOwnTreeItems,
    updateCheckedStatusFromChild,
    itemDepth,
    // parentDepth,
    numberOfDirectChildren,
    singleSelectItemId,
  };

  return { contextValue };
}

export type UseTreeItemReturn = ReturnType<typeof useTreeItem>;
