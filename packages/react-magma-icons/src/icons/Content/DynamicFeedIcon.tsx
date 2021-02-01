import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M3 12l.1162.0068C3.612 12.0648 4 12.4893 4 13v6h8c.55 0 1 .45 1 1l-.0068.1162C12.9352 20.612 12.5107 21 12 21H4c-1.1 0-2-.9-2-2v-6c0-.55.45-1 1-1zm4-4l.1162.0068C7.612 8.0648 8 8.4893 8 9v6h8c.55 0 1 .45 1 1l-.0068.1162C16.9352 16.612 16.5107 17 16 17H8c-1.1 0-2-.9-2-2V9c0-.55.45-1 1-1zm13-5c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm0 4h-8v3.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5V7z',
    },
  ],
  circles: [],
};

export const DynamicFeedIcon = (props: IconProps) =>
  renderIcon(props, iconType);
