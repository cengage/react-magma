import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,0A13.91,13.91,0,0,0,0,14,13.91,13.91,0,0,0,14,28,13.91,13.91,0,0,0,28,14,13.91,13.91,0,0,0,14,0ZM12.57,14.05h.78A2.58,2.58,0,0,0,15,13.62a1.48,1.48,0,0,0,.54-1.24,1.54,1.54,0,0,0-.45-1.22,2.12,2.12,0,0,0-1.41-.39H12.57Zm5.29-1.76A3.39,3.39,0,0,1,16.75,15a4.76,4.76,0,0,1-3.17,1h-1V19.9H10.23v-11h3.53a4.75,4.75,0,0,1,3.06.86,3.18,3.18,0,0,1,1,2.58Z',
    },
  ],
};

export const PracticeIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
