import * as React from 'react';
import { IconProps } from '../../IconProps';
import { NorthIcon } from '../Navigation/NorthIcon';
export const ArrowUp2Icon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('ArrowUp2Icon has been deprecated');
  }
  return <NorthIcon {...props} />;
};
