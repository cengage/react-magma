import * as React from 'react';
import { IconProps } from '../../IconProps';
import { SortDoubleArrowIcon } from '../Navigation/SortDoubleArrowIcon';
export const ArrowDoubleIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('ArrowDoubleIcon has been deprecated');
  }
  return <SortDoubleArrowIcon {...props} />;
};
