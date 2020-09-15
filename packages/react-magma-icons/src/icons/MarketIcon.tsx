import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 22.6',
  paths: [
    {
      d:
        'M24.4,4,28,9.4v.8c0,1.2-1,2-2.4,2a2.54,2.54,0,0,1-1.2-.2V25.2H4V11.8a3.77,3.77,0,0,1-1.6.4c-1.4,0-2.4-.8-2.4-2V9.4L3.8,4V3.6a1.07,1.07,0,0,1,1-1H23.2a1.07,1.07,0,0,1,1,1V4ZM6.2,5.6v3a2.48,2.48,0,0,0,2.4,2.6c1.4,0,1.8-1.2,2-2.6a24.83,24.83,0,0,1,.2-3Zm11,0c.2,1.4.6,3,.6,3,0,1.4.6,2.6,1.8,2.6A2.78,2.78,0,0,0,22,8.6a24.83,24.83,0,0,0-.2-3ZM6,11v7.2H22.6V10.6a3.14,3.14,0,0,1-2.8,1.8,2.24,2.24,0,0,1-2.4-2s.6.2.2.2h-.2c0,1-2.2,1-3.6,1s-3.4,0-3.4-1h.2c-.4,0,0-.6,0-.6.2.6-1,2-2.4,2A1.9,1.9,0,0,1,6,11Z',
      transform: 'translate(0 -2.6)'
    }
  ]
};

export const MarketIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
