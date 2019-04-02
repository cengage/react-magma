import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M17.5,7V0H5.25L0,5.25V21H10.5v7H28V7ZM5.25,2.47V5.25H2.47ZM1.75,19.25V7H7V1.75h8.75V7L10.5,12.25v7Zm14-9.77v2.77H13Zm10.5,16.77h-14V14H17.5V8.75h8.75Z'
    }
  ]
};

export const CopyIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
