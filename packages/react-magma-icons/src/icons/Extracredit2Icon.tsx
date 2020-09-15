import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28.63 15.57',
  paths: [
    {
      d: 'M14.74,9V6.22H4.44V21.67h10.3V18.89H7.22V15.33h5.54V12.55H7.22V9Z',
      transform: 'translate(-4.44 -6.22)'
    },
    {
      d:
        'M29.8,16.12a4.56,4.56,0,0,1-4.16,2.59,4.64,4.64,0,1,1,0-9.28,4.57,4.57,0,0,1,3.75,1.94h3.46a7.92,7.92,0,0,0-7.21-5,7.71,7.71,0,1,0,0,15.41,7.84,7.84,0,0,0,7.43-5.66Z',
      transform: 'translate(-4.44 -6.22)'
    }
  ]
};

export const Extracredit2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
