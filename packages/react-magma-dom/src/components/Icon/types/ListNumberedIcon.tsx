import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 26.25 28',
  paths: [
    {
      d:
        'M9.62,22.75h17.5v3.5H9.62Zm0-10.5h17.5v3.5H9.62Zm0-10.5h17.5v3.5H9.62ZM4.38,0V7H2.62V1.75H.88V0ZM2.62,14.38v1.37h3.5V17.5H.88v-4l3.5-1.64V10.5H.88V8.75H6.12v4Zm3.5,4.87V28H.88V26.25h3.5V24.5H.88V22.75h3.5V21H.88V19.25Z',
      transform: 'translate(-0.88)'
    }
  ]
};

export const ListNumberedIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
