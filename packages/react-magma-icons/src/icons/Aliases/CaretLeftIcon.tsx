import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ArrowLeftIcon } from '../Navigation/ArrowLeftIcon';
export const CaretLeftIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('CaretLeftIcon has been deprecated');
  }
  return <ArrowLeftIcon {...props} />;
};
