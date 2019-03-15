import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 25.6 22.04',
  paths: [
    {
      d:
        'M15.4,3a11,11,0,0,0-11,11H.82l4.42,4.42L9.66,14H6a9.4,9.4,0,0,1,8.42-9.35V7.19h2V4.65A9.42,9.42,0,0,1,24.75,13H22.21V15h2.54a9.43,9.43,0,0,1-8.38,8.38V20.81h-2V25c.32,0,.65,0,1,0a11,11,0,1,0,0-22Z',
      transform: 'translate(-0.82 -2.98)'
    },
    {
      d: 'M14.42,9.24v5.17l5.13,5.12,1.38-1.38L16.37,13.6V9.24Z',
      transform: 'translate(-0.82 -2.98)'
    }
  ]
};

export const TimedIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
