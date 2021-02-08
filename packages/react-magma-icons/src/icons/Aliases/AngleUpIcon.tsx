import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ExpandLessIcon } from '../Navigation/ExpandLessIcon';
export const AngleUpIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('AngleUpIcon has been deprecated');
  }
  return <ExpandLessIcon {...props} />;
};
