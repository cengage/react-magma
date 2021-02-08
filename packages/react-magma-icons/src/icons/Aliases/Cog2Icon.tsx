import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ExpandMoreIcon } from '../Navigation/ExpandMoreIcon';
export const Cog2Icon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Cog2Icon has been deprecated');
  }
  return <ExpandMoreIcon {...props} />;
};
