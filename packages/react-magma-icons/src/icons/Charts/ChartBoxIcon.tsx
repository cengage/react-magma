import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M5 2c.5523 0 1 .4477 1 1v5h1.5a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H6v7c0 .5523-.4477 1-1 1s-1-.4477-1-1v-7H2.5a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5H4V3c0-.5523.4477-1 1-1zm7 0c.5523 0 1 .4477 1 1v3h1.5a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H13v9c0 .5523-.4477 1-1 1s-1-.4477-1-1v-9H9.5a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5H11V3c0-.5523.4477-1 1-1zm7 0c.5523 0 1 .4477 1 1v10h1.5a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H20v2c0 .5523-.4477 1-1 1s-1-.4477-1-1v-2h-1.5a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5H18V3c0-.5523.4477-1 1-1z',
    },
  ],
  circles: [],
};

export const ChartBoxIcon = (props: IconProps) => renderIcon(props, iconType);
