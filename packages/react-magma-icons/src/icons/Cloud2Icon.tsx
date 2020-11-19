import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 30 22',
  paths: [
    {
      d:
        'M30,19a6,6,0,0,1-6,6H7a6.71,6.71,0,0,1-4.95-2.06,7,7,0,0,1-.94-8.71A7,7,0,0,1,4,11.67c0-.29,0-.51,0-.67A7.73,7.73,0,0,1,6.34,5.34,7.72,7.72,0,0,1,12,3a7.7,7.7,0,0,1,4.47,1.38A7.9,7.9,0,0,1,19.4,8,3.78,3.78,0,0,1,22,7a4,4,0,0,1,4,4,3.87,3.87,0,0,1-.64,2.16A6,6,0,0,1,30,19Z',
      transform: 'translate(0 -3)',
    },
  ],
};

export const Cloud2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
