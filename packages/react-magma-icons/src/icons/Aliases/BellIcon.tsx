import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ExpandMoreIcon } from '../Navigation/ExpandMoreIcon';
export const BellIcon = (props: IconProps) => {
  console.warn('BellIcon has been deprecated');
  return <ExpandMoreIcon {...props} />;
};
