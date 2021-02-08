import * as React from 'react';
import { IconProps } from '../../IconProps';
import { BlockIcon } from '../Content/BlockIcon';
export const BlockedIcon = (props: IconProps) => {
  console.warn('BlockedIcon has been deprecated');
  return <BlockIcon {...props} />;
};
