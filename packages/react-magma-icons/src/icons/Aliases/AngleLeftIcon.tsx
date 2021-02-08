import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ArrowBackIosIcon } from '../Navigation/ArrowBackIosIcon';
export const AngleLeftIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('AngleLeftIcon has been deprecated');
  }
  return <ArrowBackIosIcon {...props} />;
};
