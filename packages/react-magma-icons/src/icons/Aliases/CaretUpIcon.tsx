import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ArrowDropUpIcon } from '../Navigation/ArrowDropUpIcon';
export const CaretUpIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('CaretUpIcon has been deprecated');
  }
  return <ArrowDropUpIcon {...props} />;
};
