import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 28 23.63',
  paths: [
    {
      d:
        'M28,16.19l-5.25-5.25V3.06h-3.5V7.44L14,2.19l-14,14v.87H3.5v8.75h8.75V20.56h3.5v5.25H24.5V17.06H28Z',
      transform: 'translate(0 -2.19)'
    }
  ]
};

export const Home32Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
