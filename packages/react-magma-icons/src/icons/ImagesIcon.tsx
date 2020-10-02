import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 31.5 28',
  paths: [
    {
      d:
        'M29.75,3.5H28V1.75A1.76,1.76,0,0,0,26.25,0H1.75A1.76,1.76,0,0,0,0,1.75v21A1.76,1.76,0,0,0,1.75,24.5H3.5v1.75A1.76,1.76,0,0,0,5.25,28h24.5a1.76,1.76,0,0,0,1.75-1.75v-21A1.76,1.76,0,0,0,29.75,3.5ZM3.5,5.25v17.5H1.75v-21h24.5V3.5h-21A1.76,1.76,0,0,0,3.5,5.25Zm26.25,21H5.25v-21h24.5Z',
    },
    { d: 'M26.25,9.62A2.63,2.63,0,1,1,23.62,7,2.63,2.63,0,0,1,26.25,9.62Z' },
    { d: 'M28,24.5H7V21l6.12-10.5,7,8.75h1.76L28,14Z' },
  ],
};

export const ImagesIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
