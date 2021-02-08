import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ErrorIcon } from '../Alert/ErrorIcon';
export const Notification2Icon = (props: IconProps) => {
  console.warn('Notification2Icon has been deprecated');
  return <ErrorIcon {...props} />;
};
