import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M17.63 7H6.37C3.96 7 2 9.24 2 12s1.96 5 4.37 5h11.26c2.41 0 4.37-2.24 4.37-5s-1.96-5-4.37-5zm-6.52 3.6L7.6 14.11c-.1.1-.23.15-.35.15-.12 0-.26-.05-.35-.15l-1.86-1.86c-.2-.2-.2-.51 0-.71.2-.2.51-.2.71 0l1.51 1.51 3.16-3.16c.2-.2.51-.2.71 0 .2.2.17.51-.02.71z',
    },
  ],
  circles: [],
};

export const EditAttributesIcon = (props: IconProps) =>
  renderIcon(props, iconType);
