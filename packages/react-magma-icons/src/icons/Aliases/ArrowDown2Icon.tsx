import * as React from 'react';
import { IconProps } from '../../IconProps';
import { SouthIcon } from '../Navigation/SouthIcon';
export const ArrowDown2Icon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('ArrowDown2Icon has been deprecated');
  }
  return <SouthIcon {...props} />;
};
