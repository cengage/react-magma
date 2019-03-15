import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 34.65 24.5',
  paths: [
    {
      d:
        'M17.5,15.75a10.46,10.46,0,0,1,7.42,3.08L22.45,21.3a7,7,0,0,0-9.9,0l-2.47-2.47A10.46,10.46,0,0,1,17.5,15.75ZM5.13,13.88a17.48,17.48,0,0,1,24.74,0L27.4,16.35a14,14,0,0,0-19.8,0L5.13,13.88ZM27,3.68a24.29,24.29,0,0,1,7.78,5.25h0L32.35,11.4a21,21,0,0,0-29.7,0L.18,8.93A24.5,24.5,0,0,1,27,3.68ZM15.75,24.5a1.75,1.75,0,1,1,1.75,1.75A1.75,1.75,0,0,1,15.75,24.5Z',
      transform: 'translate(-0.18 -1.75)'
    }
  ]
};

export const ConnectionIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
