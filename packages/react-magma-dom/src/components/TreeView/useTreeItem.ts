import * as React from "react"

import { IconProps } from 'react-magma-icons';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

import { TreeViewContext, ExpandInitialOptions } from './useTreeView';
import { TreeItem } from './TreeItem';

import { useGenerateId } from "../../utils";

export interface UseTreeItemProps extends React.HTMLAttributes<HTMLLIElement> {
  index?: number;
  treeItemIndex?: number;
  testId?: string;
  icon?: React.ReactElement<IconProps>;
  parentCheckedStatus?: IndeterminateCheckboxStatus;
  updateParentCheckStatus?: (index:number, status:IndeterminateCheckboxStatus) => void;
}

interface TreeItemContextInterface {
  itemId?: string;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  checkedStatus: IndeterminateCheckboxStatus;
  checkboxChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasOwnTreeItems: boolean;
  updateCheckedStatusFromChild: (index:number, status:IndeterminateCheckboxStatus) => void;
}

export const TreeItemContext = React.createContext<TreeItemContextInterface>({
  expanded: false,
  setExpanded: () => {},
  checkedStatus: IndeterminateCheckboxStatus.unchecked,
  checkboxChangeHandler: () => {},
  hasOwnTreeItems: false,
  updateCheckedStatusFromChild: () => {},
})

const enum StatusUpdatedByOptions {
  checkboxChange = "checkboxChange",
  parent = "parent",
  children = "children",
}


export const checkedStatusToBoolean = (status: IndeterminateCheckboxStatus):boolean =>
  status === IndeterminateCheckboxStatus.checked ? true : false;


export function useTreeItem(props: UseTreeItemProps) {
  const { children, treeItemIndex, icon, parentCheckedStatus, updateParentCheckStatus } = props;

  const { expandInitial, hasIcons, setHasIcons } = React.useContext(TreeViewContext);

  const [expanded, setExpanded] = React.useState(expandInitial === ExpandInitialOptions.all);
  const [checkedStatus, setCheckedStatus] = React.useState<IndeterminateCheckboxStatus>(IndeterminateCheckboxStatus.unchecked);
  const [statusUpdatedBy, setStatusUpdatedBy] = React.useState<StatusUpdatedByOptions|undefined>(undefined);

  const numberOfTreeItemChildren = React.Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === TreeItem
  ).length;

  const hasOwnTreeItems = numberOfTreeItemChildren > 0;

  const [childrenCheckedStatus, setChildrenCheckedStatus] = React.useState<IndeterminateCheckboxStatus[]>(
    Array(numberOfTreeItemChildren).fill(IndeterminateCheckboxStatus.unchecked)
  );

  const itemId = useGenerateId();

  React.useLayoutEffect(() => {
    if (!hasIcons && icon) {
      setHasIcons(true);
    }
  }, []);

  const updateCheckedStatusFromChild = (index:number, status:IndeterminateCheckboxStatus) => {
    const newChildrenCheckedStatus = [...childrenCheckedStatus];
    newChildrenCheckedStatus[index] = status;
    setStatusUpdatedBy(StatusUpdatedByOptions.children);
    setChildrenCheckedStatus(newChildrenCheckedStatus);
  }


  React.useEffect(() => {
    if (
      statusUpdatedBy &&
      updateParentCheckStatus
    ) {
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
        setChildrenCheckedStatus(Array(childrenCheckedStatus.length).fill(parentCheckedStatus));
      }
    }
  }, [parentCheckedStatus]);

  React.useEffect(() => {
    if (statusUpdatedBy) {
      const statusFromChildren = (childrenCheckedStatus.every(status => status === childrenCheckedStatus[0]))
        ? childrenCheckedStatus[0]
        : IndeterminateCheckboxStatus.indeterminate;
      if (checkedStatus !== statusFromChildren && statusUpdatedBy !== StatusUpdatedByOptions.parent) {
        setStatusUpdatedBy(StatusUpdatedByOptions.children);
        setCheckedStatus(statusFromChildren);
      }
    }
  }, [childrenCheckedStatus]);


  const checkboxChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const status = (event.target.checked) ? IndeterminateCheckboxStatus.checked : IndeterminateCheckboxStatus.unchecked;
    if (checkedStatus !== status) {
      setStatusUpdatedBy(StatusUpdatedByOptions.checkboxChange);
      setCheckedStatus(status);
      if (hasOwnTreeItems) {
        setChildrenCheckedStatus(Array(childrenCheckedStatus.length).fill(status));
      }
    }
  }

  const contextValue = {
    itemId,
    expanded,
    setExpanded,
    checkedStatus,
    checkboxChangeHandler,
    hasOwnTreeItems,
    updateCheckedStatusFromChild,
  };

  return { contextValue };
}

export type UseTreeItemReturn = ReturnType<typeof useTreeItem>