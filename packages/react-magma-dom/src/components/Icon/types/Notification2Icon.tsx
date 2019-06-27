import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 40 40',
  paths: [
    {
      d:
        'M20,1 C9.512,1 1,9.512 1,20 C1,30.488 9.512,39 20,39 C30.488,39 39,30.488 39,20 C39,9.512 30.488,1 20,1 Z M21.9,29.5 L18.1,29.5 L18.1,25.7 L21.9,25.7 L21.9,29.5 Z M21.9,21.9 L18.1,21.9 L18.1,10.5 L21.9,10.5 L21.9,21.9 Z'
    }
  ]
};

export const Notification2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
