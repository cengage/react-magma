import * as React from 'react';
import { IconProps } from '../../IconProps';
import { InfoIcon } from '../Actions/InfoIcon';
export const Info2Icon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Info2Icon has been deprecated');
  }
  return <InfoIcon {...props} />;
};
