import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 26.43 26.43',
  paths: [
    {
      d:
        'M14.1,4.41A9.59,9.59,0,1,1,4.51,14,9.6,9.6,0,0,1,14.1,4.41Zm0-3.63A13.22,13.22,0,1,0,27.31,14,13.22,13.22,0,0,0,14.1.78Z',
      transform: 'translate(-0.88 -0.78)'
    },
    {
      d: 'M19.93,14A5.84,5.84,0,1,1,14.1,8.17,5.83,5.83,0,0,1,19.93,14Z',
      transform: 'translate(-0.88 -0.78)'
    }
  ]
};

export const TargetIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
