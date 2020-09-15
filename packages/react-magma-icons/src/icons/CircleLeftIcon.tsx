import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,28A14,14,0,1,0,0,14,14,14,0,0,0,14,28ZM14,2.62A11.38,11.38,0,1,1,2.62,14,11.39,11.39,0,0,1,14,2.62Z'
    },
    { d: 'M18.3,8.68,15.82,6.2,8,14l7.8,7.8,2.48-2.48L13,14Z' }
  ]
};

export const CircleLeftIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
