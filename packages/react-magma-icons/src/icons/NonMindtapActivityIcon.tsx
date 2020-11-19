import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,0A13.91,13.91,0,0,0,0,14,13.91,13.91,0,0,0,14,28,13.91,13.91,0,0,0,28,14,13.91,13.91,0,0,0,14,0Zm4.56,19.9h-3l-4.8-8.36h-.07c.09,1.48.14,2.53.14,3.16v5.2H8.76v-11h3l4.8,8.27h0c-.07-1.43-.11-2.45-.11-3V8.85h2.11v11Z',
    },
  ],
};

export const NonMindtapActivityIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
