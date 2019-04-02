import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 24.34 23',
  paths: [
    {
      d:
        'M25.17,14.67a2,2,0,0,1-.57,1.41l-1.18,1.17a1.91,1.91,0,0,1-1.42.59,1.82,1.82,0,0,1-1.4-.59L16,12.67v11A1.67,1.67,0,0,1,15.42,25,2.1,2.1,0,0,1,14,25.5H12A2.07,2.07,0,0,1,10.59,25,1.67,1.67,0,0,1,10,23.67v-11L5.41,17.25A1.86,1.86,0,0,1,4,17.84a1.82,1.82,0,0,1-1.4-.59L1.42,16.08a2,2,0,0,1,0-2.83L11.6,3.08A1.82,1.82,0,0,1,13,2.5a1.91,1.91,0,0,1,1.42.58L24.6,13.25A2,2,0,0,1,25.17,14.67Z',
      transform: 'translate(-0.83 -2.5)'
    }
  ]
};

export const ArrowUp3Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
