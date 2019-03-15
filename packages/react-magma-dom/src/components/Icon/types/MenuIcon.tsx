import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 20 14',
  paths: [
    {
      d:
        'M0.5,16.165 L19.4974999,16.165 L19.4974999,14.0541666 L0.5,14.0541666 L0.5,16.165 Z M0.5,10.8879166 L19.4974999,10.8879166 L19.4974999,8.77708332 L0.5,8.77708332 L0.5,10.8879166 Z M0.5,3.5 L0.5,5.61083333 L19.4974999,5.61083333 L19.4974999,3.5 L0.5,3.5 Z',
      transform: 'translate(0 -3)'
    }
  ]
};

export const MenuIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
