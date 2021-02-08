import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ErrorOutlineIcon } from '../Alert/ErrorOutlineIcon';
export const NotificationIcon = (props: IconProps) => {
  console.warn('NotificationIcon has been deprecated');
  return <ErrorOutlineIcon {...props} />;
};
