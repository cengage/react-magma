import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 26 26',
  paths: [
    {
      d:
        'M14,25.45,24,20V10.06L14,13.7ZM13,11.94,23.91,8,13,4,2.09,8ZM26,8V20a2,2,0,0,1-.28,1,2,2,0,0,1-.77.73l-11,6a1.93,1.93,0,0,1-1.9,0l-11-6A2,2,0,0,1,.28,21,1.94,1.94,0,0,1,0,20V8A1.93,1.93,0,0,1,.36,6.86a2,2,0,0,1,1-.74l11-4a2,2,0,0,1,1.38,0l11,4a2,2,0,0,1,.95.74A1.93,1.93,0,0,1,26,8Z',
      transform: 'translate(0 -2)',
    },
  ],
};

export const CubeIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
