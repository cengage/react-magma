import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,2.54,25.73,25.92H2.27L14,2.54ZM14,0a2,2,0,0,0-1.66,1.22L.38,25c-.91,1.63-.13,3,1.73,3H25.89c1.86,0,2.64-1.33,1.73-3h0l-12-23.82A2,2,0,0,0,14,0Z',
      transform: 'translate(0)'
    },
    {
      d: 'M15.75,22.75A1.75,1.75,0,1,1,14,21,1.75,1.75,0,0,1,15.75,22.75Z',
      transform: 'translate(0)'
    },
    {
      d:
        'M14,19.25a1.75,1.75,0,0,1-1.75-1.75V12.25a1.75,1.75,0,0,1,3.5,0V17.5A1.75,1.75,0,0,1,14,19.25Z',
      transform: 'translate(0)'
    }
  ]
};

export const WarningIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
