import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 26.63',
  paths: [
    {
      d:
        'M28,10.86,18.33,9.45,14,.69,9.67,9.45,0,10.86l7,6.82L5.35,27.32,14,22.77l8.65,4.55L21,17.68ZM14,20.6l0,0L14,5l3.06,6.19,6.83,1L18.94,17l1.17,6.81L14,20.61Z',
      transform: 'translate(0 -0.69)'
    }
  ]
};

export const StarHalfIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
