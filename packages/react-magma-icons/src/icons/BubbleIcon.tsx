import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 26.89 25.27',
  paths: [
    {
      d:
        'M24.06,1.36H4.34A3.66,3.66,0,0,0,.52,4.77V17.32a4,4,0,0,0,3.82,3.76h14l6.88,5.56v-6a3.35,3.35,0,0,0,2.15-3.31V4.77a3.24,3.24,0,0,0-3.34-3.4Z',
      transform: 'translate(-0.52 -1.36)'
    }
  ]
};

export const BubbleIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
