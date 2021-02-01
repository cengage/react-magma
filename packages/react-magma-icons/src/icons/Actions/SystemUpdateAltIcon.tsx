import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M8.01 3c.54 0 .99.45.99 1 0 .54-.45.99-.99.99H4c-.55 0-1 .45-1 1v12.02c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V5.98c0-.55-.45-1-1-1h-4.01c-.54 0-.99-.44-.99-.99 0-.54.45-.99.99-.99H21c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zM12 3c.55 0 1 .45 1 1v8.01h1.79c.44 0 .66.54.35.85l-2.79 2.79c-.19.19-.51.19-.7-.01l-2.79-2.79c-.32-.31-.1-.85.35-.85H11V4c0-.55.45-1 1-1z',
    },
  ],
  circles: [],
};

export const SystemUpdateAltIcon = (props: IconProps) =>
  renderIcon(props, iconType);
