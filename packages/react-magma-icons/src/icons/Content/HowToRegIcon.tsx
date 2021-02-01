import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M21.31 13.2l.01.01c.38.39.38 1.01 0 1.39l-5.14 5.18c-.39.39-1.03.39-1.42 0l-2.07-2.09c-.38-.39-.38-1.01 0-1.39l.01-.01c.39-.39 1.02-.39 1.4 0l1.37 1.37 4.43-4.46c.39-.39 1.02-.39 1.41 0zM11 14c.32 0 .61.02 1 .06l-.84.82c-1.19 1.16-1.2 3.08-.02 4.26L12 20H3v-2c0-2.66 5.33-4 8-4zm0-10c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z',
    },
  ],
  circles: [],
};

export const HowToRegIcon = (props: IconProps) => renderIcon(props, iconType);
