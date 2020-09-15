import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 21 21',
  paths: [
    {
      d:
        'M3.5,24.5V3.5H7v9.62l8.75-8.74v8.74L24.5,4.38V23.62l-8.75-8.74v8.74L7,14.88V24.5Z',
      transform: 'translate(-3.5 -3.5)'
    }
  ]
};

export const FirstIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
