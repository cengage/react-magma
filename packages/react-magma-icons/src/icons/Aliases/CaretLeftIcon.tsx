import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ArrowLeftIcon } from '../Navigation/ArrowLeftIcon';
export const CaretLeftIcon = (props: IconProps) => {
  console.warn('CaretLeftIcon has been deprecated');
  return <ArrowLeftIcon {...props} />;
};
