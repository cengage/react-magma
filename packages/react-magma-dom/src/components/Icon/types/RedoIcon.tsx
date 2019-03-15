import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 28 24.5',
  paths: [
    {
      d:
        'M0,15.75a14,14,0,0,0,4.74,10.5l2.31-2.63A10.5,10.5,0,1,1,21.42,8.33L17.5,12.25H28V1.75l-4.1,4.1A14,14,0,0,0,0,15.75Z',
      transform: 'translate(0 -1.75)'
    }
  ]
};

export const RedoIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
