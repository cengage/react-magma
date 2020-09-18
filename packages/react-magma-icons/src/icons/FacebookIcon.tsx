import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M26.45,0a1.49,1.49,0,0,1,1.1.46A1.48,1.48,0,0,1,28,1.55v24.9A1.55,1.55,0,0,1,26.45,28H19.32V17.15H23l.55-4.22H19.32v-2.7a2.37,2.37,0,0,1,.43-1.53,2.13,2.13,0,0,1,1.67-.51l2.22,0V4.4a24,24,0,0,0-3.24-.17,5.46,5.46,0,0,0-4,1.46A5.5,5.5,0,0,0,15,9.81v3.12H11.3v4.23H15V28H1.55a1.5,1.5,0,0,1-1.09-.45A1.49,1.49,0,0,1,0,26.45V1.55A1.47,1.47,0,0,1,.46.46,1.45,1.45,0,0,1,1.55,0Z',
      transform: 'translate(0)'
    }
  ]
};

export const FacebookIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
