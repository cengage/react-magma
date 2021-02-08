import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ExpandMoreIcon } from '../Navigation/ExpandMoreIcon';
export const CircleLeftIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('CircleLeftIcon has been deprecated');
  }
  return <ExpandMoreIcon {...props} />;
};
