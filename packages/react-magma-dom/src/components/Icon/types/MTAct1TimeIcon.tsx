import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 26.6 12.6',
  paths: [
    {
      d: 'M14.7,10.5H11.9v1.4h2.8v1.4H11.9v4.2h4.2V16.1H13.3V14.7h2.8V10.5Z',
      transform: 'translate(-0.7 -7.7)'
    },
    {
      d: 'M23.1,10.5H20.3v1.4h2.8v1.4H20.3v1.4h2.8v1.4H20.3v1.4h4.2v-7Z',
      transform: 'translate(-0.7 -7.7)'
    },
    {
      d: 'M6.3,16.1V10.5H3.5v1.4H4.9v4.2H3.5v1.4H7.7V16.1Z',
      transform: 'translate(-0.7 -7.7)'
    },
    {
      d: 'M9.1,9.1v9.8h-7V9.1Zm1.4-1.4H.7V20.3h9.8Z',
      transform: 'translate(-0.7 -7.7)'
    },
    {
      d: 'M17.5,9.1v9.8h-7V9.1Zm1.4-1.4H9.1V20.3h9.8Z',
      transform: 'translate(-0.7 -7.7)'
    },
    {
      d: 'M25.9,9.1v9.8h-7V9.1Zm1.4-1.4H17.5V20.3h9.8Z',
      transform: 'translate(-0.7 -7.7)'
    }
  ]
};

export const MTAct1TimeIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
