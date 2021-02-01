import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M12 2c2.63 0 5.01 1.02 6.79 2.67C15.97 5.91 14 8.72 14 12c0 3.28 1.97 6.09 4.79 7.33C17.01 20.98 14.63 22 12 22s-5.01-1.02-6.79-2.67C8.03 18.09 10 15.28 10 12c0-3.28-1.97-6.09-4.79-7.33C6.99 3.02 9.37 2 12 2zM3.81 6.28C6.23 7.05 8 9.32 8 12c0 2.68-1.77 4.95-4.19 5.72C2.67 16.1 2 14.13 2 12s.67-4.1 1.81-5.72zm16.38 0C21.33 7.9 22 9.87 22 12s-.67 4.1-1.81 5.72C17.77 16.95 16 14.68 16 12c0-2.68 1.77-4.95 4.19-5.72z',
    },
  ],
  circles: [],
};

export const SportsBaseballIcon = (props: IconProps) =>
  renderIcon(props, iconType);
