import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 24 28',
  paths: [
    {
      d:
        'M22.94,5.94a3.63,3.63,0,0,1,.75,1.18A3.77,3.77,0,0,1,24,8.5v18A1.5,1.5,0,0,1,22.5,28H1.5a1.44,1.44,0,0,1-1.06-.44A1.44,1.44,0,0,1,0,26.5V1.5A1.44,1.44,0,0,1,.44.44,1.44,1.44,0,0,1,1.5,0h14a3.58,3.58,0,0,1,1.38.31,3.63,3.63,0,0,1,1.18.75ZM16,2.12V8h5.88a1.69,1.69,0,0,0-.35-.64L16.64,2.47A1.69,1.69,0,0,0,16,2.12ZM22,26V10H15.5A1.5,1.5,0,0,1,14,8.5V2H2V26Zm-2-7v5H4V21l3-3,2,2,6-6ZM7,16a2.86,2.86,0,0,1-2.12-.88,3,3,0,0,1,0-4.24A2.86,2.86,0,0,1,7,10a2.86,2.86,0,0,1,2.12.88,3,3,0,0,1,0,4.24A2.86,2.86,0,0,1,7,16Z',
      transform: 'translate(0 0)'
    }
  ]
};

export const FileImageOIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
