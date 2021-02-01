import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 10H6c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1z',
    },
  ],
  circles: [],
};

export const Crop169Icon = (props: IconProps) => renderIcon(props, iconType);
