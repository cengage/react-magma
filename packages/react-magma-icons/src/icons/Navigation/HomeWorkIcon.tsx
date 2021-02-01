import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M20 3c.55 0 1 .45 1 1v16c0 .55-.45 1-1 1h-3v-2h2v-2h-2v-2h2v-2h-2v-.65c0-.85-.36-1.67-.99-2.23l-5-4.5-.01-.01V4c0-.55.45-1 1-1zM9 6.85c.24 0 .48.08.67.26l5 4.5c.21.19.33.46.33.74V20c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-4H7v4c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1v-7.65c0-.29.12-.56.33-.74l5-4.5c.19-.17.43-.26.67-.26zM19 9h-2v2h2V9zm-4-4h-2v2h2V5zm4 0h-2v2h2V5z',
    },
  ],
  circles: [],
};

export const HomeWorkIcon = (props: IconProps) => renderIcon(props, iconType);
