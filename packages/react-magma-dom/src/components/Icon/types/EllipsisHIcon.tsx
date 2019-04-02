import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 18.66 4.67',
  paths: [
    {
      d:
        'M15.67,14A2.34,2.34,0,1,0,18,11.67,2.33,2.33,0,0,0,15.67,14Zm-2.33,0A2.34,2.34,0,1,0,11,16.33,2.33,2.33,0,0,0,13.34,14Zm-7,0A2.34,2.34,0,1,0,4,16.33,2.33,2.33,0,0,0,6.34,14Z',
      transform: 'translate(-1.67 -11.67)'
    }
  ]
};

export const EllipsisHIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
