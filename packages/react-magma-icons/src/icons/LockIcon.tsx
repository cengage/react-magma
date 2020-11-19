import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 17.5 26.25',
  paths: [
    {
      d:
        'M21.44,11.38H21V6.12A5.25,5.25,0,0,0,15.75.88h-3.5A5.25,5.25,0,0,0,7,6.12v5.26H6.56a1.31,1.31,0,0,0-1.31,1.31V25.81a1.32,1.32,0,0,0,1.31,1.32H21.44a1.32,1.32,0,0,0,1.31-1.32V12.69a1.31,1.31,0,0,0-1.31-1.31ZM10.5,6.12a1.74,1.74,0,0,1,1.75-1.74h3.5A1.74,1.74,0,0,1,17.5,6.12v5.26h-7Z',
      transform: 'translate(-5.25 -0.88)',
    },
  ],
};

export const LockIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
