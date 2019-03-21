import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 28 12.25',
  paths: [
    {
      d:
        'M27.82,14.65c.22,1.52.36,3.59-.32,4.39-1.12,1.31-8.25,1.31-8.25-1.32,0-1.32,1.17-2.19.05-3.5S16.21,12.9,14,12.9s-4.19,0-5.3,1.32.05,2.18.05,3.5C8.75,20.35,1.63,20.35.5,19c-.68-.8-.54-2.87-.32-4.39a6.28,6.28,0,0,1,2-3.5h0c2-1.91,5.13-3.47,11.75-3.5h.22c6.62,0,9.71,1.59,11.75,3.5h0a6.28,6.28,0,0,1,2,3.5Z',
      transform: 'translate(0 -7.65)'
    }
  ]
};

export const PhoneHangUpIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
