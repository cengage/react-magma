import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 21.25 21.25',
  paths: [
    {
      d:
        'M22.25,3.38H5.74A2.36,2.36,0,0,0,3.38,5.74V22.26a2.36,2.36,0,0,0,2.36,2.36H22.26a2.36,2.36,0,0,0,2.36-2.36V5.74a2.37,2.37,0,0,0-2.37-2.36ZM10.46,19.9H8.09V11.64h2.37Zm4.72,0H12.81V8.09h2.37Zm4.72,0H17.53V15.18H19.9Z',
      transform: 'translate(-3.38 -3.38)'
    }
  ]
};

export const WidgetsIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
