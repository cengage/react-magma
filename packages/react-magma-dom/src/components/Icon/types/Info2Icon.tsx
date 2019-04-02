import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 27.3 27.3',
  paths: [
    {
      d:
        'M12.65,9.9V7.14h2.7V9.9ZM14,25A11,11,0,1,0,3,14,11,11,0,0,0,14,25ZM14,.35A13.65,13.65,0,1,1,.35,14,13.62,13.62,0,0,1,14,.35ZM12.65,20.86V12.65h2.7v8.21Z',
      transform: 'translate(-0.35 -0.35)'
    }
  ]
};

export const Info2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
