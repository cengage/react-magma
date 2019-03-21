import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 23.6 28',
  paths: [
    {
      d:
        'M11.12,21.21V28L.62,17.5,11.12,7v6.94C23.34,14.23,22.81,5.63,19.7,0,27.38,8.3,25.75,21.59,11.12,21.21Z',
      transform: 'translate(-0.62)'
    }
  ]
};

export const ReplyIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
