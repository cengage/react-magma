import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ExpandMoreIcon } from '../Navigation/ExpandMoreIcon';
export const CircleRightIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('CircleRightIcon has been deprecated');
  }
  return <ExpandMoreIcon {...props} />;
};
