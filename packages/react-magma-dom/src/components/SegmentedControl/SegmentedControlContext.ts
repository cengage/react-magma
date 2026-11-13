import * as React from 'react';

import { ButtonSize } from '../Button';

export interface SegmentedControlContextInterface {
  disabled?: boolean;
  isDropdown?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  isSliding?: boolean;
  onSelect?: (event: React.SyntheticEvent, value: string) => void;
  selectedValue?: string;
  size?: ButtonSize;
  tabbableValue?: string;
}

export const SegmentedControlContext =
  React.createContext<SegmentedControlContextInterface>({});
