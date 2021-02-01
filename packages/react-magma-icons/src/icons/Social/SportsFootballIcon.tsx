import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M3.02 15.62l5.36 5.36c-2.41.09-4.34-.32-4.69-.67-.35-.35-.75-2.27-.67-4.69zM13.08 3.28l7.63 7.63c-.42 2.33-1.35 4.78-3.18 6.62-1.83 1.84-4.28 2.77-6.62 3.18l-7.63-7.63c.42-2.33 1.35-4.78 3.18-6.62 1.83-1.84 4.29-2.76 6.62-3.18zM14.8 9.2a.9839.9839 0 00-1.4 0l-4.2 4.2c-.39.39-.39 1.01 0 1.4.39.39 1.01.39 1.4 0l4.2-4.2c.39-.39.39-1.01 0-1.4zm.82-6.18c2.41-.09 4.34.32 4.69.67.35.35.75 2.27.67 4.69z',
    },
  ],
  circles: [],
};

export const SportsFootballIcon = (props: IconProps) =>
  renderIcon(props, iconType);
