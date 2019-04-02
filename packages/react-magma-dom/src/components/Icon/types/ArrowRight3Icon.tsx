import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 23 24.34',
  paths: [
    {
      d:
        'M23.5,14a1.91,1.91,0,0,1-.58,1.42L12.75,25.59a2,2,0,0,1-2.83,0L8.75,24.42a2,2,0,0,1,0-2.84L13.33,17h-11A1.67,1.67,0,0,1,1,16.41,2.07,2.07,0,0,1,.5,15V13A2.07,2.07,0,0,1,1,11.59,1.67,1.67,0,0,1,2.33,11h11L8.75,6.41A1.86,1.86,0,0,1,8.16,5a1.86,1.86,0,0,1,.59-1.41L9.92,2.42a2,2,0,0,1,2.83,0L22.92,12.59A1.86,1.86,0,0,1,23.5,14Z',
      transform: 'translate(-0.5 -1.83)'
    }
  ]
};

export const ArrowRight3Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
