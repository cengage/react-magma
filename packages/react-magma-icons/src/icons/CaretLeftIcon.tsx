import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 9 16',
  paths: [
    {
      d:
        'M9.5,7V21a1,1,0,0,1-1,1,1,1,0,0,1-.7-.3l-7-7a1,1,0,0,1,0-1.4l7-7A1,1,0,0,1,8.5,6a1,1,0,0,1,1,1Z',
      transform: 'translate(-0.5 -6)'
    }
  ]
};

export const CaretLeftIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
