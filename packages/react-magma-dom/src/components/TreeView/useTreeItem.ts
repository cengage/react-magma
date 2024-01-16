import * as React from 'react';

import { IconProps } from 'react-magma-icons';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

import { TreeViewContext, ExpandInitialOptions, TreeViewSelectable } from './useTreeView';
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
  // parentDepth?: number;
  // setParentDepth: () => void;
  // singleSelectItemId?: string;
  isDisabled?: boolean;

  /**
   * Style properties for the tree item label
   */
  labelStyle?: React.CSSProperties;
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
  itemDepth: number;
  parentDepth: number;
  setParentDepth: any; //fix
}

export const TreeItemContext = React.createContext<TreeItemContextInterface>({
  expanded: false,
  setExpanded: () => {},
  checkedStatus: IndeterminateCheckboxStatus.unchecked,
  checkboxChangeHandler: () => {},
  hasOwnTreeItems: false,
  updateCheckedStatusFromChild: () => {},
  itemDepth: 0,
  numberOfTreeItemChildren: 0,
  parentDepth: 0,
  setParentDepth: () => {}, //TODO implement this
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
    treeItemIndex,
    index,
    parentCheckedStatus,
    updateParentCheckStatus,
    onClick,
    isDisabled = false,
    // itemDepth,
  } = props;

  const { expandInitial, setHasIcons, onSelectedItemChange, selectable, selectedItems, setSelectedItems } =
    React.useContext(TreeViewContext);
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

  const [parentDepth, setParentDepth] = React.useState(treeItemIndex || 0);
  const itemDepth = typeof parentDepth === 'number' ? parentDepth : 1;

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
    if (
      isDisabled ||
      expandInitial === ExpandInitialOptions.none ||
      (expandInitial === ExpandInitialOptions.first && index !== 0)
    ) {
      setExpanded(false);
    } else if (expandInitial === ExpandInitialOptions.all) {
      setExpanded(true);
    }
  }, [expandInitial]);

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

  const handleClick = (e) => {
    console.log('handleClick')

    if (selectable === TreeViewSelectable.single) {
      singleSelectChangeHandler(e);
    } else if (selectable === TreeViewSelectable.multi) {
      multiSelectChangeHandler(e);;
    } 

    // TODO
    onSelectedItemChange && typeof onSelectedItemChange === 'function' && onSelectedItemChange();

    onClick && typeof onClick === 'function' && onClick();
  };

  // TODO
  const focusFirst = () => {
    // (buttonRefArray.current[0].current as HTMLLIElement).focus();
  };

  const focusNext = () => {
    // (buttonRefArray.current[index + 1].current as HTMLLIElement).focus();
  };

  const focusPrev = () => {
    // (buttonRefArray.current[index - 1].current as HTMLLIElement).focus();
  };

  const focusLast = () => {
    // const arrLength = buttonRefArray.current.length;
    // (
    //   buttonRefArray.current[arrLength - 1].current as HTMLLIElement
    // ).focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // console.log('handleKeyDown');

    const arrLength = buttonRefArray.current.length;
    // console.log(arrLength, buttonRefArray);

    switch (event.key) {
      case 'ArrowDown': {
        index === arrLength - 1 ? focusFirst() : focusNext();
        break;
      }
      case 'ArrowUp': {
        index === 0 ? focusLast() : focusPrev();
        break;
      }
      case 'Home': {
        focusFirst();
        break;
      }
      case 'End': {
        focusLast();
        break;
      }
      default:
        return;
    }
  };

  const isDirectChild = label => {
    let isChild = false;

    // console.log('***', treeItemChildren);
    // console.log('LABEL', label.props?.children);

    // console.log('-------');

    treeItemChildren.forEach((child: React.ReactElement<any>) => {
      // console.log(label, '++', child?.props.label.props?.children, '//' , label.props?.children);
      // console.log(child);
      // console.log(label.props?.children);

      // console.log('++');

      if (child?.props.label.props?.children == label.props?.children) {
        console.log('isChild!!!!!!!!!!!!!!!!!!!!!!!');
        isChild = true;
        return isChild;
      }
    });

    return isChild;
  };

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
    setParentDepth,
    numberOfTreeItemChildren,
    // singleSelectItemId,
    isDirectChild,
    selectedItems,
  };

  return { contextValue, handleClick, handleKeyDown };
}

export type UseTreeItemReturn = ReturnType<typeof useTreeItem>;
