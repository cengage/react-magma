import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 22.75',
  paths: [
    {
      d:
        'M0,21.88H28v3.5H0Zm3.5-7H7v5.24H3.5Zm5.25-7h3.5V20.12H8.75ZM14,13.12h3.5v7H14Zm5.25-10.5h3.5v17.5h-3.5Z',
      transform: 'translate(0 -2.63)',
    },
  ],
};

export const StatsBarsIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
