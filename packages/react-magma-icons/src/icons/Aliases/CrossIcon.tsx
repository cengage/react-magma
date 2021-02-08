import * as React from 'react';
import { IconProps } from '../../IconProps';
import { CloseIcon } from '../Navigation/CloseIcon';
export const CrossIcon = (props: IconProps) => {
  console.warn('CrossIcon has been deprecated');
  return <CloseIcon {...props} />;
};
