import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ArrowForwardIosIcon } from '../Navigation/ArrowForwardIosIcon';
export const AngleRightIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('AngleRightIcon has been deprecated');
  }
  return <ArrowForwardIosIcon {...props} />;
};
