import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 25.29 28',
  paths: [
    {
      d:
        'M1.42,0a1.28,1.28,0,0,0-.07.36v27.1a.66.66,0,0,0,.22.54L14.89,13.89,1.42,0ZM15.78,14.83l3.45,3.55-4.92,2.8s-6.25,3.55-9.69,5.53L15.78,14.83Zm.94-1,3.69,3.84,5.75-3.27c.68-.39.61-.93,0-1.22s-5.05-2.89-5.74-3.31l-3.73,4Zm-.94-.94,3.48-3.69-5-2.84L3.5.21Z',
      transform: 'translate(-1.35)'
    }
  ]
};

export const GoogleplayIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
