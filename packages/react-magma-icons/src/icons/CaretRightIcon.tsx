import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 9 16',
  paths: [
    {
      d:
        'M9.5,14a1,1,0,0,1-.29.7l-7,7a1,1,0,0,1-.71.3,1,1,0,0,1-.7-.3A1,1,0,0,1,.5,21V7a1,1,0,0,1,.3-.7A1,1,0,0,1,1.5,6a1,1,0,0,1,.71.3l7,7A1,1,0,0,1,9.5,14Z',
      transform: 'translate(-0.5 -6)',
    },
  ],
};

export const CaretRightIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
