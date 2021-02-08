import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ErrorOutlineIcon } from '../Alert/ErrorOutlineIcon';
export const NotificationIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('NotificationIcon has been deprecated');
  }
  return <ErrorOutlineIcon {...props} />;
};
