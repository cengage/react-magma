import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 22.03 22',
  paths: [
    {
      d:
        'M21.92,4.61A.88.88,0,0,1,21.7,5.7L14,13.41V25a.93.93,0,0,1-.61.92A1.09,1.09,0,0,1,13,26a.91.91,0,0,1-.7-.3l-4-4A1,1,0,0,1,8,21V13.41L.3,5.7A.88.88,0,0,1,.08,4.61.93.93,0,0,1,1,4H21A.93.93,0,0,1,21.92,4.61Z',
      transform: 'translate(0.02 -4)',
    },
  ],
};

export const Filter2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
