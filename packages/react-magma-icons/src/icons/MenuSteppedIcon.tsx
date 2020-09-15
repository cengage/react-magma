import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 26.8',
  paths: [
    {
      d:
        'M2.8,21.8H14a2.73,2.73,0,0,1,2.8,2.8h0A2.73,2.73,0,0,1,14,27.4H2.8A2.73,2.73,0,0,1,0,24.6H0A2.86,2.86,0,0,1,2.8,21.8Z',
      transform: 'translate(0 -0.6)'
    },
    {
      d:
        'M2.8,11.2H25.2A2.73,2.73,0,0,1,28,14h0a2.73,2.73,0,0,1-2.8,2.8H2.8A2.73,2.73,0,0,1,0,14H0A2.73,2.73,0,0,1,2.8,11.2Z',
      transform: 'translate(0 -0.6)'
    },
    {
      d:
        'M2.8.6H19.6a2.73,2.73,0,0,1,2.8,2.8h0a2.73,2.73,0,0,1-2.8,2.8H2.8A2.86,2.86,0,0,1,0,3.4H0A2.73,2.73,0,0,1,2.8.6Z',
      transform: 'translate(0 -0.6)'
    }
  ]
};

export const MenuSteppedIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
