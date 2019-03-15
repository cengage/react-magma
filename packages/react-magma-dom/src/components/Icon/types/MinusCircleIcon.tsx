import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M19,15V13a.94.94,0,0,0-.3-.7A1,1,0,0,0,18,12H6a1,1,0,0,0-.7.3A.94.94,0,0,0,5,13v2a.94.94,0,0,0,.3.7A1,1,0,0,0,6,16H18a1,1,0,0,0,.7-.3A.94.94,0,0,0,19,15Zm5-1a11.75,11.75,0,0,1-1.61,6A11.9,11.9,0,0,1,18,24.39,11.73,11.73,0,0,1,12,26a11.75,11.75,0,0,1-6-1.61A11.9,11.9,0,0,1,1.61,20,11.75,11.75,0,0,1,0,14,11.75,11.75,0,0,1,1.61,8,11.9,11.9,0,0,1,6,3.61,11.75,11.75,0,0,1,12,2a11.73,11.73,0,0,1,6,1.61A11.9,11.9,0,0,1,22.39,8,11.73,11.73,0,0,1,24,14Z',
      transform: 'translate(0 -2)'
    }
  ]
};

export const MinusCircleIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
