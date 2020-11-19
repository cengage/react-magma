import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 16 9',
  paths: [
    {
      d:
        'M16,17.5a1,1,0,0,1-1,1H1a.94.94,0,0,1-.7-.3,1,1,0,0,1,0-1.4l7-7A.94.94,0,0,1,8,9.5a1,1,0,0,1,.7.3l7,7A1,1,0,0,1,16,17.5Z',
      transform: 'translate(0 -9.5)',
    },
  ],
};

export const CaretUpIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
