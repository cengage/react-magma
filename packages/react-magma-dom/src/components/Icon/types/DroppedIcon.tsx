import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,0A13.91,13.91,0,0,0,0,14,13.91,13.91,0,0,0,14,28,13.91,13.91,0,0,0,28,14,13.91,13.91,0,0,0,14,0Zm4.66,14.27a5.44,5.44,0,0,1-1.55,4.17,6.34,6.34,0,0,1-4.49,1.46H9.49v-11H13a5.82,5.82,0,0,1,4.2,1.43A5.24,5.24,0,0,1,18.66,14.27Zm-2.43.06c0-2.38-1.05-3.56-3.15-3.56H11.84V18h1Q16.23,18,16.23,14.33Z'
    }
  ]
};

export const DroppedIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
