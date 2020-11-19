import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 21 24.5',
  paths: [
    {
      d:
        'M24,11.1,15.24,2.35a1.74,1.74,0,0,0-2.48,0L4,11.1a1.75,1.75,0,1,0,2.48,2.47l5.76-5.76V24.58a1.75,1.75,0,0,0,3.5,0V7.81l5.76,5.76a1.76,1.76,0,0,0,1.24.52A1.72,1.72,0,0,0,24,13.57,1.75,1.75,0,0,0,24,11.1Z',
      transform: 'translate(-3.5 -1.84)',
    },
  ],
};

export const ArrowUp2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
