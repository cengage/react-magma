import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ArrowRightIcon } from '../Navigation/ArrowRightIcon';
export const CaretRightIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('CaretRightIcon has been deprecated');
  }
  return <ArrowRightIcon {...props} />;
};
