import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 24.73 15.11',
  paths: [
    {
      d:
        'M25.13,19.88a1.24,1.24,0,0,1-1.23-1.24,9.91,9.91,0,0,0-1.41-5.09,1.23,1.23,0,1,1,2.11-1.27,12.24,12.24,0,0,1,1.76,6.36,1.23,1.23,0,0,1-1.23,1.24Z',
      transform: 'translate(-1.63 -6.27)',
    },
    {
      d:
        'M2.87,19.88a1.25,1.25,0,0,1-1.24-1.24A12.39,12.39,0,0,1,14,6.27a1.24,1.24,0,1,1,0,2.48,9.91,9.91,0,0,0-9.9,9.89A1.24,1.24,0,0,1,2.87,19.88Z',
      transform: 'translate(-1.63 -6.27)',
    },
    {
      d:
        'M16.25,20.14h0s0,0,0,0a49.63,49.63,0,0,0,4.54-13A49.06,49.06,0,0,0,12,17.69h0s0,0,0,.06h0a2.47,2.47,0,0,0,4.3,2.43h0A.08.08,0,0,1,16.25,20.14Z',
      transform: 'translate(-1.63 -6.27)',
    },
  ],
};

export const DashboardIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
