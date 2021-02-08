import * as React from 'react';
import { IconProps } from '../../IconProps';
import { ExpandMoreIcon } from '../Navigation/ExpandMoreIcon';
export const ExternalLinkIcon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('ExternalLinkIcon has been deprecated');
  }
  return <ExpandMoreIcon {...props} />;
};
