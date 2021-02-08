import * as React from 'react';
import { IconProps } from '../../IconProps';
import { HelpOutlineIcon } from '../Actions/HelpOutlineIcon';
export const QuestionCircleOIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('QuestionCircleOIcon has been deprecated');
  }
  return <HelpOutlineIcon {...props} />;
};
