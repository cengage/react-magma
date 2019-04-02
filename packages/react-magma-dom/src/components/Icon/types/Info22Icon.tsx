import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 10 22',
  paths: [
    {
      d:
        'M10,22v2a1,1,0,0,1-1,1H1a1,1,0,0,1-.7-.3A1,1,0,0,1,0,24V22a1,1,0,0,1,.3-.7A1,1,0,0,1,1,21H2V15H1a1,1,0,0,1-.7-.3A.94.94,0,0,1,0,14V12a.94.94,0,0,1,.3-.7A1,1,0,0,1,1,11H7a1,1,0,0,1,.71.3A.93.93,0,0,1,8,12v9H9a1,1,0,0,1,1,1ZM8,4V7a.94.94,0,0,1-.29.7A1,1,0,0,1,7,8H3a1,1,0,0,1-.7-.3A1,1,0,0,1,2,7V4a1,1,0,0,1,.3-.7A1,1,0,0,1,3,3H7a1,1,0,0,1,.71.3A.93.93,0,0,1,8,4Z',
      transform: 'translate(0 -3)'
    }
  ]
};

export const Info22Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
