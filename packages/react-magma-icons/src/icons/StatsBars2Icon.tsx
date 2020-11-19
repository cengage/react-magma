import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 24.5 24.5',
  paths: [
    {
      d:
        'M7.88,8.75H2.62a.87.87,0,0,0-.87.87V25.38a.87.87,0,0,0,.87.87H7.88a.87.87,0,0,0,.87-.87V9.62A.87.87,0,0,0,7.88,8.75Zm0,15.75H2.62v-7H7.88ZM16.62,5.25H11.38a.87.87,0,0,0-.88.87V25.38a.87.87,0,0,0,.88.87h5.24a.87.87,0,0,0,.88-.87V6.12A.87.87,0,0,0,16.62,5.25Zm0,19.25H11.38V15.75h5.24ZM25.38,1.75H20.12a.87.87,0,0,0-.87.87V25.38a.87.87,0,0,0,.87.87h5.26a.87.87,0,0,0,.87-.87V2.62A.87.87,0,0,0,25.38,1.75Zm0,22.75H20.12V14h5.26Z',
      transform: 'translate(-1.75 -1.75)',
    },
  ],
};

export const StatsBars2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
