import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M23.9,4.1A14,14,0,0,0,4.1,23.9,14,14,0,0,0,23.9,4.1Zm.6,9.9a10.48,10.48,0,0,1-1.94,6.08L7.92,5.44A10.5,10.5,0,0,1,24.5,14Zm-21,0A10.48,10.48,0,0,1,5.44,7.92L20.08,22.56A10.5,10.5,0,0,1,3.5,14Z',
      transform: 'translate(0)'
    }
  ]
};

export const BlockedIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
