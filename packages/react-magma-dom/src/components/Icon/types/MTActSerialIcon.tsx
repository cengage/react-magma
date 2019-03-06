import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 28 26.6',
  paths: [
    {
      d: 'M2.94,10.5H.14v1.4h2.8v1.4H.14v4.2h4.2V16.1H1.54V14.7h2.8V10.5Z',
      transform: 'translate(0 -0.7)'
    },
    {
      d: 'M2.8,20.3H0v1.4H2.8v1.4H0v1.4H2.8v1.4H0v1.4H4.2v-7Z',
      transform: 'translate(0 -0.7)'
    },
    {
      d: 'M2.94,6.3V.7H.14V2.1h1.4V6.3H.14V7.7h4.2V6.3Z',
      transform: 'translate(0 -0.7)'
    },
    { d: 'M7,3.5H28V4.9H7Z', transform: 'translate(0 -0.7)' },
    { d: 'M7,13.3H28v1.4H7Z', transform: 'translate(0 -0.7)' },
    { d: 'M7,23.1H28v1.4H7Z', transform: 'translate(0 -0.7)' }
  ]
};

export const MTActSerialIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
