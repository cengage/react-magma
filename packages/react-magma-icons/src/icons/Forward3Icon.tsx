import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 18.38 19.25',
  paths: [
    {
      d: 'M13.56,23.62V14.88L4.81,23.62V4.38l8.75,8.74V4.38L23.19,14Z',
      transform: 'translate(-4.81 -4.38)'
    }
  ]
};

export const Forward3Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
