import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 40 40',
  paths: [
    {
      d:
        'M40,15.48 L25.62,14.24 L20,1 L14.38,14.26 L0,15.48 L10.92,24.94 L7.64,39 L20,31.54 L32.36,39 L29.1,24.94 L40,15.48 Z M20,27.8 L12.48,32.34 L14.48,23.78 L7.84,18.02 L16.6,17.26 L20,9.2 L23.42,17.28 L32.18,18.04 L25.54,23.8 L27.54,32.36 L20,27.8 Z'
    }
  ]
};

export const StarEmptyIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
