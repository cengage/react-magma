import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M16 11V5h4c1.1 0 2 .9 2 2v4h-6zm4 8c1.1 0 2-.9 2-2v-4h-6v6h4zM14 5v14H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h10zm-4.5 7c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z',
    },
  ],
  circles: [],
};

export const BentoIcon = (props: IconProps) => renderIcon(props, iconType);
