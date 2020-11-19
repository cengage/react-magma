import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 24.5',
  paths: [
    {
      d:
        'M0,1.75H28v3.5H0ZM10.5,7H28v3.5H10.5Zm0,5.25H28v3.5H10.5Zm0,5.25H28V21H10.5ZM0,22.75H28v3.5H0Zm7-14v10.5L0,14Z',
      transform: 'translate(0 -1.75)',
    },
  ],
};

export const IndentDecreaseIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
