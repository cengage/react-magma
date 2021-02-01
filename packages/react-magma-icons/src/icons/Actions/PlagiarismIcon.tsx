import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M13.17 2c.53 0 1.04.21 1.41.58l4.83 4.83c.38.38.59.89.59 1.42V20c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm.3 9.6c-1.17-.81-2.79-.81-3.95 0-1.85 1.29-2.02 3.85-.5 5.37 1.12 1.12 2.8 1.3 4.13.59l1.18 1.18c.39.39 1.02.39 1.41 0l.083-.094a.9959.9959 0 00-.083-1.316l-1.18-1.18c.81-1.51.46-3.47-1.09-4.55zM11.5 13c.8284 0 1.5.6716 1.5 1.5s-.6716 1.5-1.5 1.5-1.5-.6716-1.5-1.5.6716-1.5 1.5-1.5zM13 3.5V8c0 .55.45 1 1 1h4.5L13 3.5z',
    },
  ],
  circles: [],
};

export const PlagiarismIcon = (props: IconProps) => renderIcon(props, iconType);
