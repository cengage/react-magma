import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 37.63 19.25',
  paths: [
    {
      d: 'M.44,4.38h24.5V9.62H.44Zm0,7h24.5v5.24H.44Zm0,7h24.5v5.24H.44Z',
      transform: 'translate(-0.44 -4.38)'
    },
    {
      d: 'M27.56,14.88l5.25,5.24,5.25-5.24Z',
      transform: 'translate(-0.44 -4.38)'
    },
    {
      d: 'M38.06,13.12,32.81,7.88l-5.25,5.24Z',
      transform: 'translate(-0.44 -4.38)'
    }
  ]
};

export const Menu2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
