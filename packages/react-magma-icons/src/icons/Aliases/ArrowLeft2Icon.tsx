import * as React from 'react';
import { IconProps } from '../../IconProps';
import { WestIcon } from '../Navigation/WestIcon';
export const ArrowLeft2Icon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('ArrowLeft2Icon has been deprecated');
  }
  return <WestIcon {...props} />;
};
