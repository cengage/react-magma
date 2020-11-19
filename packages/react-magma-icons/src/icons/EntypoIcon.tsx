import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 25.94 26',
  paths: [
    {
      d:
        'M27,2.52V21A1.46,1.46,0,0,1,26,22.31L14.57,26.92a2.13,2.13,0,0,1-.28.06c-.12,0-.18.06-.29.06s-.18-.06-.28-.06a2.35,2.35,0,0,1-.29-.06L2,22.31A1.44,1.44,0,0,1,1,21V2.52a1.37,1.37,0,0,1,.63-1.21A1.4,1.4,0,0,1,3,1.13L14,5.58,25,1.14a1.35,1.35,0,0,1,1.33.18A1.35,1.35,0,0,1,27,2.52ZM12.56,7.88,3.34,4.2V20.34L12.56,24Zm-1.74,5.36-5.76-2.3V9l5.76,2.3Zm0,6L5.06,16.94V15l5.76,2.31Zm13.84-15L15.44,7.88V24l9.22-3.69Zm-1.72,6.74-5.77,2.3v-2L22.94,9Zm0,6-5.77,2.31v-2L22.94,15Z',
      transform: 'translate(-1.03 -1.04)',
    },
  ],
};

export const EntypoIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
