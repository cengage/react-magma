import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ExpandMoreIcon } from '../Navigation/ExpandMoreIcon';
export const CircleUpIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('CircleUpIcon has been deprecated');
  }
  return <ExpandMoreIcon {...props} />;
};
