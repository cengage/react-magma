import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 22.04 22.04',
  paths: [
    {
      d:
        'M13.62,4.6A9.4,9.4,0,1,1,4.22,14,9.41,9.41,0,0,1,13.62,4.6Zm0-1.62a11,11,0,1,0,11,11,11,11,0,0,0-11-11Z',
      transform: 'translate(-2.59 -2.98)'
    },
    {
      d: 'M9.51,8.59,18.87,14,9.51,19.41Z',
      transform: 'translate(-2.59 -2.98)'
    }
  ]
};

export const VideoIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
