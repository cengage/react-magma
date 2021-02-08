import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ArrowDropDownIcon } from '../Navigation/ArrowDropDownIcon';
export const CaretDownIcon = (props: IconProps) => {
  console.warn('CaretDownIcon has been deprecated');
  return <ArrowDropDownIcon {...props} />;
};
