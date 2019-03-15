import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 4.67 18.67',
  paths: [
    {
      d:
        'M3,9.33A2.33,2.33,0,1,0,.66,7,2.33,2.33,0,0,0,3,9.33Zm0,2.34A2.33,2.33,0,1,0,5.33,14,2.33,2.33,0,0,0,3,11.67Zm0,7A2.33,2.33,0,1,0,5.33,21,2.33,2.33,0,0,0,3,18.67Z',
      transform: 'translate(-0.66 -4.67)'
    }
  ]
};

export const EllipsisVIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
