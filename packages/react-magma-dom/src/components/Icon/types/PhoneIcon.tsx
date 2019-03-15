import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 26.25 26.25',
  paths: [
    {
      d:
        'M20.12,16.62c-1.74,1.76-1.74,3.5-3.5,3.5s-3.5-1.74-5.24-3.5-3.5-3.5-3.5-5.24,1.74-1.76,3.5-3.5-3.5-7-5.26-7S.88,6.12.88,6.12c0,3.5,3.59,10.6,7,14s10.5,7,14,7c0,0,5.24-3.5,5.24-5.24S21.88,14.88,20.12,16.62Z',
      transform: 'translate(-0.88 -0.88)'
    }
  ]
};

export const PhoneIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
