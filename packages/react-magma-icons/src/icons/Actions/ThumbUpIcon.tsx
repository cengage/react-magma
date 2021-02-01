import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M13.12 2.06c.58-.59 1.52-.59 2.11-.01.36.36.51.87.41 1.37L14.69 8h5.65c2.15 0 3.6 2.2 2.76 4.18l-3.26 7.61C19.52 20.52 18.8 21 18 21H9c-1.1 0-2-.9-2-2V9.01c0-.53.21-1.04.58-1.41zM3 9c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8c0-1.1.9-2 2-2z',
    },
  ],
  circles: [],
};

export const ThumbUpIcon = (props: IconProps) => renderIcon(props, iconType);
