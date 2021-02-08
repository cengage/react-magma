import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ExpandMoreIcon } from '../Navigation/ExpandMoreIcon';
export const CircleLeftIcon = (props: IconProps) => {
  console.warn('CircleLeftIcon has been deprecated');
  return <ExpandMoreIcon {...props} />;
};
