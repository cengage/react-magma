import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 23.6 28',
  paths: [
    {
      d:
        'M19.7,28c3.11-5.63,3.64-14.23-8.58-13.94V21L.62,10.5,11.12,0V6.79C25.75,6.41,27.38,19.7,19.7,28Z',
      transform: 'translate(-0.62)'
    }
  ]
};

export const ReplyIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
