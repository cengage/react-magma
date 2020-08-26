import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 24.5 21',
  paths: [
    {
      d:
        'M16.9,24l8.75-8.75a1.74,1.74,0,0,0,0-2.48L16.9,4a1.75,1.75,0,0,0-2.47,2.48l5.76,5.76H3.42a1.75,1.75,0,0,0,0,3.5H20.19l-5.76,5.76a1.76,1.76,0,0,0-.52,1.24A1.72,1.72,0,0,0,14.43,24,1.75,1.75,0,0,0,16.9,24Z',
      transform: 'translate(-1.67 -3.5)'
    }
  ]
};

export const ArrowRight2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
