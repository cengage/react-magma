import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 9.09 15.59',
  paths: [
    {
      d:
        'M9.55,7.5a.48.48,0,0,1-.16.36L3.25,14l6.14,6.14a.46.46,0,0,1,.16.36.48.48,0,0,1-.16.36l-.78.78a.47.47,0,0,1-.71,0L.61,14.36A.51.51,0,0,1,.46,14a.49.49,0,0,1,.15-.36L7.9,6.36a.47.47,0,0,1,.71,0l.78.78A.46.46,0,0,1,9.55,7.5Z',
      transform: 'translate(-0.46 -6.2)'
    }
  ]
};

export const AngleLeftIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
