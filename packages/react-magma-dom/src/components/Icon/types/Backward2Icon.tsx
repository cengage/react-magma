import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 18.38 19.25',
  paths: [
    {
      d: 'M14.44,4.38v8.74l8.75-8.74V23.62l-8.75-8.74v8.74L4.81,14Z',
      transform: 'translate(-4.81 -4.38)'
    }
  ]
};

export const Backward2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
