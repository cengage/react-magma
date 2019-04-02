import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 21.36 21.36',
  paths: [
    {
      d:
        'M14,14A5.34,5.34,0,1,0,8.62,8.66,5.34,5.34,0,0,0,14,14Zm0,2.68c-3.57,0-10.68,1.79-10.68,5.34v2.66H24.64V22c0-3.55-7.11-5.33-10.68-5.33Z',
      transform: 'translate(-3.28 -3.32)'
    }
  ]
};

export const ProfileIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
