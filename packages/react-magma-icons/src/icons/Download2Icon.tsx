import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 24.5',
  paths: [
    {
      d:
        'M24.5,14H20.12L14,20.12,7.88,14H3.5L0,21v1.75H28V21ZM0,24.5H28v1.75H0ZM15.75,8.75v-7h-3.5v7H6.12L14,16.62l7.88-7.87Z',
      transform: 'translate(0 -1.75)'
    }
  ]
};

export const Download2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
