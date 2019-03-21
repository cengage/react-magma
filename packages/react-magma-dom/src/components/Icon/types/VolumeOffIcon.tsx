import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 12 19',
  paths: [
    {
      d:
        'M12,5.5v17a1,1,0,0,1-.3.7,1,1,0,0,1-1.4,0L5.09,18H1a.94.94,0,0,1-.7-.3A1,1,0,0,1,0,17V11a.94.94,0,0,1,.3-.7A.94.94,0,0,1,1,10H5.09L10.3,4.8a1,1,0,0,1,1.7.7Z',
      transform: 'translate(0 -4.5)'
    }
  ]
};

export const VolumeOffIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
