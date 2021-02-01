import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M21 3c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm-8 2H4c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V9h-7c-.55 0-1-.45-1-1V5z',
    },
  ],
  circles: [],
};

export const TabIcon = (props: IconProps) => renderIcon(props, iconType);
