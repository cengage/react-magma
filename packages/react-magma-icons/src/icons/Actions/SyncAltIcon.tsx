import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M5.15 12.86c.31-.32.85-.1.85.35V15h14c.55 0 1 .45 1 1l-.0068.1162C20.9352 16.612 20.5107 17 20 17H6v1.79c0 .45-.54.67-.86.35l-2.79-2.79c-.19-.19-.19-.51.01-.7zM18 5.21c0-.45.54-.67.86-.35l2.79 2.79c.19.19.19.51-.01.7l-2.79 2.79c-.31.32-.85.1-.85-.35V9H4c-.55 0-1-.45-1-1l.0068-.1162C3.0648 7.388 3.4893 7 4 7h14z',
    },
  ],
  circles: [],
};

export const SyncAltIcon = (props: IconProps) => renderIcon(props, iconType);
