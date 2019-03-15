import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 26.6 12.6',
  paths: [
    {
      d:
        'M6.3,7.7H2.1A1.32,1.32,0,0,0,.7,9.1V20.3H2.1V14.7H6.3v5.6H7.7V9.1A1.32,1.32,0,0,0,6.3,7.7Zm0,5.6H2.1V9.1H6.3Z',
      transform: 'translate(-0.7 -7.7)'
    },
    {
      d:
        'M27.3,18.9H21.7V9.1h5.6V7.7H21.7a1.32,1.32,0,0,0-1.4,1.4v9.8a1.32,1.32,0,0,0,1.4,1.4h5.6Z',
      transform: 'translate(-0.7 -7.7)'
    },
    {
      d:
        'M17.5,13V9.1a1.32,1.32,0,0,0-1.4-1.4H10.5V20.3h5.6a1.32,1.32,0,0,0,1.4-1.4V15c0-.42-.28-1-.7-1C17.22,14,17.5,13.44,17.5,13ZM16.1,18.9H11.9V14.7h4.2Zm0-5.6H11.9V9.1h4.2Z',
      transform: 'translate(-0.7 -7.7)'
    }
  ]
};

export const MTActLearnIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
