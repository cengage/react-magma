import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 25.11 25',
  paths: [
    {
      d:
        'M13.15,15.14a9,9,0,0,1-1.8-2.55L2.27,21.66a2.44,2.44,0,0,0,0,3.45l.86.86a2.43,2.43,0,0,0,3.44,0l9.06-9.06A9.4,9.4,0,0,1,13.15,15.14ZM4.66,23.58a1.35,1.35,0,1,1,1.91,0A1.36,1.36,0,0,1,4.66,23.58Z',
      transform: 'translate(-1.55 -1.68)'
    },
    {
      d:
        'M26.66,8.87l-5.22,3.31a2.43,2.43,0,0,1-3.36-.76l-.66-1A2.43,2.43,0,0,1,18.18,7L24,3.34a7.26,7.26,0,1,0,2.65,5.53Z',
      transform: 'translate(-1.55 -1.68)'
    }
  ]
};

export const WrenchIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
