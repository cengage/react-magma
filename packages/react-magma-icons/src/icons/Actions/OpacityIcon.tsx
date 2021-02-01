import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M17.66 8l-4.95-4.94a.9959.9959 0 00-1.41 0L6.34 8C4.78 9.56 4 11.64 4 13.64c0 2 .78 4.11 2.34 5.67 1.56 1.56 3.61 2.35 5.66 2.35 2.05 0 4.1-.79 5.66-2.35 1.56-1.56 2.34-3.67 2.34-5.67S19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z',
    },
  ],
  circles: [],
};

export const OpacityIcon = (props: IconProps) => renderIcon(props, iconType);
