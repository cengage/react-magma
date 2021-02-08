import * as React from 'react';
import { IconProps } from '../../IconProps';
import { InfoIcon } from '../Actions/InfoIcon';
export const Info2Icon = (props: IconProps) => {
  console.warn('Info2Icon has been deprecated');
  return <InfoIcon {...props} />;
};
