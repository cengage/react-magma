import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M16 15c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm5 0v2h-2v-2h2zm-5-4c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm5 0v2h-2v-2h2zm-5-4c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm5 0v2h-2V7h2z',
    },
  ],
  circles: [],
};

export const TocIcon = (props: IconProps) => renderIcon(props, iconType);
