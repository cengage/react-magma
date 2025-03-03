import * as React from 'react';

import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

interface TreeItemContextInterface {
  itemId?: string;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  checkedStatus: IndeterminateCheckboxStatus;
  checkboxChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasOwnTreeItems: boolean;
  parentDepth: number;
}

export const TreeItemContext = React.createContext<TreeItemContextInterface>({
  expanded: false,
  setExpanded: () => {},
  checkedStatus: IndeterminateCheckboxStatus.unchecked,
  checkboxChangeHandler: () => {},
  hasOwnTreeItems: false,
  parentDepth: 0,
});
