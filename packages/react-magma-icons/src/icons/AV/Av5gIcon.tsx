import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M20 7c.55 0 1 .45 1 1l-.0068.1162C20.9352 8.612 20.5107 9 20 9h-6v6h5v-2h-1c-.55 0-1-.45-1-1l.0068-.1162C17.0648 11.388 17.4893 11 18 11h2c.55 0 1 .45 1 1v3c0 1.1-.9 2-2 2h-5c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2zM9 7c.55 0 1 .45 1 1l-.0068.1162C9.9352 8.612 9.5107 9 9 9H5v2h3c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4c-.55 0-1-.45-1-1l.0068-.1162C3.0648 15.388 3.4893 15 4 15h4v-2H4c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1z',
    },
  ],
  circles: [],
};

export const Av5gIcon = (props: IconProps) => renderIcon(props, iconType);
