import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 25.38',
  paths: [
    {
      d:
        'M0,24.94H28v1.75H0Zm28-3.5v1.75H0V21.44l3.5-7h7v3.5h7v-3.5h7ZM6.12,9.19,14,1.31l7.88,7.88H15.75v7h-3.5v-7Z',
      transform: 'translate(0 -1.31)'
    }
  ]
};

export const Upload2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
