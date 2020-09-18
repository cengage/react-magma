import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 21.84 24.92',
  paths: [
    {
      d:
        'M14,6.51a9,9,0,1,1-9,9A9,9,0,0,1,14,6.51Zm0-1.89A10.92,10.92,0,1,0,24.92,15.54,10.92,10.92,0,0,0,14,4.62Z',
      transform: 'translate(-3.08 -1.54)'
    },
    { d: 'M12.39,1.54h3.22V4.76H12.39Z', transform: 'translate(-3.08 -1.54)' },
    {
      d: 'M21.62,5.64,23.9,7.92,22.76,9.05,20.48,6.78Z',
      transform: 'translate(-3.08 -1.54)'
    },
    {
      d: 'M19.47,21A7.67,7.67,0,0,0,14,8v7.56L19.47,21Z',
      transform: 'translate(-3.08 -1.54)'
    }
  ]
};

export const TimerIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
