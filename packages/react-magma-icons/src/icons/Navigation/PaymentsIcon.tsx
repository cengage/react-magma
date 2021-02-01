import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M23 8v10c0 1.1-.9 2-2 2H5c-.55 0-1-.45-1-1s.45-1 1-1h16V8c0-.55.45-1 1-1s1 .45 1 1zm-7-4c1.66 0 3 1.34 3 3v7c0 1.1-.9 2-2 2H4c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h12zm-6 3c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
    },
  ],
  circles: [],
};

export const PaymentsIcon = (props: IconProps) => renderIcon(props, iconType);
