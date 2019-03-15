import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 19.68 27.55',
  paths: [
    {
      d:
        'M19.9,23.61H4.16A3.94,3.94,0,0,0,8.1,27.55H19.9a3.94,3.94,0,0,0,3.94-3.94V7.45a.15.15,0,0,0-.15-.14H20.05a.15.15,0,0,0-.15.14ZM19.9,0a3.93,3.93,0,0,1,3.94,3.93H8.1V20.09a.15.15,0,0,1-.15.15H4.31a.15.15,0,0,1-.15-.15V3.93A3.93,3.93,0,0,1,8.1,0Z',
      transform: 'translate(-4.16 0)'
    }
  ]
};

export const GlassdoorIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
