import * as React from 'react';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

interface TreeItemContextInterface {
  itemId?: string;
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
  parentItemId: string;
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
  parentItemId: null,
});
