import * as React from 'react';

import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

interface TreeItemContextInterface {
  itemId?: string;
  expanded: boolean;
  checkedStatus: IndeterminateCheckboxStatus;
  checkboxChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasOwnTreeItems: boolean;
  parentDepth: number;
}

export const TreeItemContext = React.createContext<TreeItemContextInterface>({
  expanded: false,
  checkedStatus: IndeterminateCheckboxStatus.unchecked,
  checkboxChangeHandler: () => {},
  hasOwnTreeItems: false,
  parentDepth: 0,
});
