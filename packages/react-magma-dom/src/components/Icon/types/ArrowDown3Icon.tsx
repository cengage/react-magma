import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 24.34 23.17',
  paths: [
    {
      d:
        'M25.17,13.41a1.93,1.93,0,0,1-.57,1.41L14.42,25a2,2,0,0,1-1.42.57A1.91,1.91,0,0,1,11.6,25L1.42,14.82a1.86,1.86,0,0,1-.59-1.41A2,2,0,0,1,1.42,12l1.16-1.17A2,2,0,0,1,4,10.24a1.92,1.92,0,0,1,1.41.58L10,15.41v-11A1.89,1.89,0,0,1,10.6,3a1.89,1.89,0,0,1,1.4-.6h2a1.93,1.93,0,0,1,1.41.6A1.92,1.92,0,0,1,16,4.41v11l4.6-4.59a1.88,1.88,0,0,1,1.4-.58,2,2,0,0,1,1.42.58L24.6,12A2,2,0,0,1,25.17,13.41Z',
      transform: 'translate(-0.83 -2.41)'
    }
  ]
};

export const ArrowDown3Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
