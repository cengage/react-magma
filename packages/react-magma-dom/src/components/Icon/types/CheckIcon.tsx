import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 29.37 21.88',
  paths: [
    {
      d: 'M26.71,3.06,11.89,17.88,4.4,10.4.87,13.93l11,11L30.24,6.59Z',
      transform: 'translate(-0.87 -3.06)'
    }
  ]
};

export const CheckIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
